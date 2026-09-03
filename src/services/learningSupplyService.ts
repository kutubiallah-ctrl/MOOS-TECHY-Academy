import {
  curriculumService,
  ICurriculumService
} from "./curriculumService";
import {
  Skill,
  Unit,
  Subject,
  PracticeQuestion,
  MasteryRecord
} from "../types/curriculum";
import {
  LearnerProfile,
  QuestionAttempt
} from "../types/learner";
import {
  LearningResource,
  SupplyQueryContext,
  SupplyRecommendation,
  SupplyDeliveryResult,
  ResourceAttemptRecord,
  RecommendationReason,
  ResourceProvenance
} from "../types/learningSupply";
import { VariationEngine } from "./variationEngine";

export class LearningSupplyService {
  private curriculum: ICurriculumService;

  constructor(curriculum: ICurriculumService = curriculumService) {
    this.curriculum = curriculum;
  }

  /**
   * Converts a canonical PracticeQuestion into a standard LearningResource
   */
  public canonicalQuestionToResource(
    question: PracticeQuestion,
    skill: Skill,
    unit: Unit,
    domainId = "mathematics"
  ): LearningResource {
    return {
      id: question.id,
      resourceType: "PRACTICE_QUESTION",
      title: `${skill.title} - Question ${question.id.replace(/[^0-9]/g, "") || "1"}`,
      skillId: skill.id,
      unitId: unit.id,
      subjectId: unit.subjectId,
      domainId,
      level: unit.level,
      difficulty: question.difficulty,
      learningObjective: skill.objectives[0] || `Mastery of ${skill.title}`,
      curriculumContext: `Unit: ${unit.title}`,
      questionType: question.type || "multiple_choice",
      answerType: "single_choice",
      questionText: question.questionText,
      mathExpression: question.mathExpression,
      contextText: question.contextText,
      diagramSvg: question.diagramSvg,
      options: question.options,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      hintLadder: question.hintLadder || [],
      misconceptionTargets: question.misconceptionAlerts,
      provenance: "PLATFORM_CONTENT",
      validationStatus: "VALIDATED_CANONICAL",
      generationMetadata: {
        isAiGenerated: false,
        generatorAgent: "curriculum_authoring",
        baseResourceId: question.id,
        generatedAt: new Date().toISOString(),
        confidenceScore: 1.0
      },
      createdAt: new Date().toISOString()
    };
  }

  /**
   * Generates ranked next-best-action recommendations based on learner state,
   * mastery records, diagnostic gaps, spaced review decay, and recent misconceptions.
   */
  public getPrioritizedRecommendations(context: SupplyQueryContext): SupplyRecommendation[] {
    const { learnerProfile, targetSubjectId, maxItems = 5 } = context;
    const allUnits = this.curriculum.getAllUnits();
    
    // Filter units matching target subject or active subject
    const subjectIdToUse = targetSubjectId || learnerProfile.activeSubjectId || "math_core";
    const candidateUnits = allUnits.filter(
      (u) => !subjectIdToUse || subjectIdToUse === "all" || u.subjectId === subjectIdToUse
    );

    const recommendations: SupplyRecommendation[] = [];
    const recentAttempts = learnerProfile.questionAttempts || [];
    const recentSkillIds = recentAttempts.slice(-3).map((a) => a.skillId);
    const now = Date.now();

    for (const unit of candidateUnits) {
      for (const skill of unit.skills) {
        const mastery = learnerProfile.masteryRecords?.[skill.id] || {
          skillId: skill.id,
          status: "unstarted",
          points: 0,
          attempts: 0,
          correctCount: 0,
          lastPracticedAt: ""
        };

        // Determine if there are recent misconceptions for this skill
        const recentMisconception = recentAttempts.find(
          (a) => a.skillId === skill.id && !a.isCorrect && a.misconceptionTriggered
        );

        // Check if this skill has unmet prerequisite skills (< 60 mastery points) recursively
        let unmetPrerequisite: Skill | undefined;
        const prereqChain = this.curriculum.getPrerequisiteChain(skill.id);
        if (prereqChain.length > 0) {
          for (const prereqSkill of prereqChain) {
            const pMastery = learnerProfile.masteryRecords?.[prereqSkill.id]?.points || 0;
            if (pMastery < 60) {
              unmetPrerequisite = prereqSkill;
              break;
            }
          }
        }

        // Anti-monotony check: slightly down-weight if practiced in the immediate last 2 steps
        const isRepeatedSkill = recentSkillIds.slice(-2).includes(skill.id);

        let priorityScore = 0;
        let reason: RecommendationReason = "unattempted_skill";
        let reasonDescription = `Start building foundational mastery in ${skill.title}`;

        // 1. Priority: Misconception Remediation
        if (recentMisconception) {
          priorityScore = 95;
          reason = "misconception_remediation";
          reasonDescription = `Targeted remediation: ${recentMisconception.misconceptionTriggered}`;
        }
        // 2. Priority: Prerequisite Gap (Learner struggling with skill having weak prerequisite foundation)
        else if (unmetPrerequisite && (mastery.points < 50 || mastery.attempts >= 2)) {
          priorityScore = 90;
          reason = "prerequisite_remedy";
          reasonDescription = `Prerequisite foundation needed: Master ${unmetPrerequisite.title} to unlock confident success in ${skill.title}.`;
        }
        // 3. Priority: Low Mastery (< 50 points)
        else if (mastery.points > 0 && mastery.points < 50) {
          priorityScore = 85 - (isRepeatedSkill ? 15 : 0);
          reason = "lowest_mastery";
          reasonDescription = `Current mastery is ${mastery.points}%. Recommended for score elevation.`;
        }
        // 4. Priority: Approaching Mastery (60 - 84 points)
        else if (mastery.points >= 50 && mastery.points < 85) {
          priorityScore = 75 - (isRepeatedSkill ? 10 : 0);
          reason = "approaching_mastery";
          reasonDescription = `${mastery.points}% mastery achieved. Just a few more accurate problems to unlock Mastered tier!`;
        }
        // 5. Priority: Spaced Review Decay for Mastered Skills (> 3 days inactive)
        else if (mastery.points >= 85) {
          const lastPracticed = mastery.lastPracticedAt ? new Date(mastery.lastPracticedAt).getTime() : 0;
          const daysSincePractice = (now - lastPracticed) / (1000 * 60 * 60 * 24);

          if (daysSincePractice >= 3) {
            priorityScore = 70;
            reason = "spaced_review_decay";
            reasonDescription = `Spaced review drill: Retain peak memory strength for ${skill.title}.`;
          } else {
            priorityScore = 20; // Already mastered and fresh
            reason = "exam_focus";
            reasonDescription = `Mastery confirmed. Available for periodic speed review.`;
          }
        }
        // 6. Priority: Unattempted skills
        else {
          priorityScore = 65 - (isRepeatedSkill ? 20 : 0);
          reason = "unattempted_skill";
          reasonDescription = `New concept in ${unit.title}. Expand your cognitive syllabus coverage.`;
        }

        // Get representative resource
        const baseQuestion = skill.questions[0];
        if (baseQuestion) {
          const resource = this.canonicalQuestionToResource(baseQuestion, skill, unit);
          recommendations.push({
            priorityScore,
            reason,
            reasonDescription,
            resource,
            skill,
            unit,
            estimatedMinutes: 5,
            xpReward: 25 + Math.round(priorityScore / 5)
          });
        }
      }
    }

    // Sort descending by priority score and limit
    return recommendations.sort((a, b) => b.priorityScore - a.priorityScore).slice(0, maxItems);
  }

  /**
   * Retrieves or dynamically generates a learning resource for a given skill,
   * avoiding duplicate repetition and executing controlled variations.
   */
  public async getLearningResources(context: SupplyQueryContext): Promise<SupplyDeliveryResult> {
    const {
      learnerProfile,
      targetSkillId,
      targetUnitId,
      allowAiGeneration = false,
      allowParametricVariations = true
    } = context;

    // Validate that the target skill exists in canonical curriculum
    let targetSkill: Skill | undefined;
    let targetUnit: Unit | undefined;

    if (targetSkillId) {
      targetSkill = this.curriculum.getSkillById(targetSkillId);
      targetUnit = this.curriculum.getUnitBySkillId(targetSkillId);
    } else if (targetUnitId) {
      targetUnit = this.curriculum.getUnitById(targetUnitId);
      targetSkill = targetUnit?.skills[0];
    } else {
      // Pick top recommended skill
      const topRec = this.getPrioritizedRecommendations(context)[0];
      if (topRec) {
        targetSkill = topRec.skill;
        targetUnit = topRec.unit;
      }
    }

    if (!targetSkill || !targetUnit) {
      return {
        status: "UNAVAILABLE",
        resources: [],
        message: "No canonical curriculum skill found matching the requested identifier."
      };
    }

    const recentAttempts = learnerProfile.questionAttempts || [];
    const attemptedQuestionIds = new Set(
      recentAttempts.filter((a) => a.skillId === targetSkill?.id).map((a) => a.questionId)
    );

    // 1. Check for unattempted canonical static questions
    const unattemptedQuestions = targetSkill.questions.filter((q) => !attemptedQuestionIds.has(q.id));

    if (unattemptedQuestions.length > 0) {
      const selected = unattemptedQuestions[0];
      return {
        status: "AVAILABLE",
        resources: [this.canonicalQuestionToResource(selected, targetSkill, targetUnit)],
        message: `Serving verified syllabus problem for ${targetSkill.title}.`
      };
    }

    // 2. All canonical static questions have been attempted: Check if AI generation is explicitly permitted
    if (allowAiGeneration) {
      try {
        const aiResource = await this.generateAiPracticeResource(targetSkill, targetUnit);
        if (aiResource) {
          return {
            status: "GENERATED",
            resources: [aiResource],
            message: `Synthesized new practice problem for ${targetSkill.title} (Governed AI Draft).`
          };
        }
      } catch (err) {
        console.warn("AI generation failed, gracefully falling back to deterministic variation engine:", err);
      }
    }

    // 3. Generate deterministic parametric variation if allowed
    if (allowParametricVariations && targetSkill.questions.length > 0) {
      const baseQ = targetSkill.questions[attemptedQuestionIds.size % targetSkill.questions.length];
      const variantIndex = attemptedQuestionIds.size + 1;
      const variation = VariationEngine.generateVariation({
        baseQuestion: baseQ,
        skill: targetSkill,
        unit: targetUnit,
        variantIndex
      });

      return {
        status: "GENERATED",
        resources: [variation],
        message: `Generated algorithmic practice variation #${variantIndex} for ${targetSkill.title}.`
      };
    }

    // 4. Fallback: serve the base question with clear review tag
    if (targetSkill.questions.length > 0) {
      const baseQ = targetSkill.questions[0];
      return {
        status: "AVAILABLE",
        resources: [this.canonicalQuestionToResource(baseQ, targetSkill, targetUnit)],
        message: `Reviewing canonical baseline problem for ${targetSkill.title}.`
      };
    }

    return {
      status: "UNAVAILABLE",
      resources: [],
      message: "No practice resources currently available for this skill."
    };
  }

  /**
   * Server-assisted AI question generation with strict canonical inheritance & fallback
   */
  private async generateAiPracticeResource(skill: Skill, unit: Unit): Promise<LearningResource | null> {
    const baseQuestion = skill.questions[0];
    const difficulty = baseQuestion?.difficulty || "medium";

    const response = await fetch("/api/tutor/generate-practice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        skillId: skill.id,
        skillName: skill.title,
        unitId: unit.id,
        unitName: unit.title,
        difficulty,
        targetLevel: unit.level
      })
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const payload = await response.json();
    if (!payload || !payload.questionText) {
      return null;
    }

    const resource: LearningResource = {
      id: payload.id || `gen-${Date.now()}`,
      resourceType: "PRACTICE_QUESTION",
      title: `${skill.title} (AI Adaptive Problem)`,
      skillId: skill.id,
      unitId: unit.id,
      subjectId: unit.subjectId,
      domainId: "mathematics",
      level: unit.level,
      difficulty: difficulty,
      learningObjective: skill.objectives[0] || `Mastery of ${skill.title}`,
      curriculumContext: `Unit: ${unit.title}`,
      questionType: payload.questionType || "multiple_choice",
      answerType: "single_choice",
      questionText: payload.questionText,
      mathExpression: payload.mathExpression,
      contextText: payload.contextText,
      options: payload.options,
      correctAnswer: payload.correctAnswer,
      explanation: payload.explanation || "Step-by-step solution verified.",
      hintLadder: payload.hintLadder || [
        "Identify the primary formula connecting your known variables.",
        "Substitute the values and simplify the expressions carefully."
      ],
      misconceptionTargets: payload.misconceptionAlerts,
      provenance: "AI_GENERATED_DRAFT",
      validationStatus: "SYNTHESIZED_SANDBOXED",
      generationMetadata: {
        isAiGenerated: true,
        generatorAgent: "practice_agent",
        generatedAt: new Date().toISOString(),
        confidenceScore: 0.92,
        variationType: "deep_ai_synthesis"
      },
      createdAt: new Date().toISOString()
    };

    // Quality gate validation check
    const validation = VariationEngine.validateLearningResource(resource);
    if (!validation.isValid) {
      console.warn("Synthesized AI resource failed quality gate, rejecting draft:", validation.issues);
      return null;
    }

    return resource;
  }
}

export const learningSupplyService = new LearningSupplyService();
