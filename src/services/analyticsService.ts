import { LearnerProfile, QuestionAttempt } from "../types/learner";
import { Skill, Unit, MasteryRecord, Recommendation } from "../types/curriculum";
import { PlayActivity } from "../types/learnAndPlay";
import { MATHEMATICS_UNITS } from "../data/curriculumData";
import { ALL_PLAY_ACTIVITIES } from "../data/learnAndPlayData";
import { curriculumService } from "./curriculumService";

export type ExamReadinessCategory =
  | "not_ready"
  | "developing_readiness"
  | "approaching_readiness"
  | "ready"
  | "strong_readiness";

export interface ExamReadinessResult {
  readinessCategory: ExamReadinessCategory;
  readinessScore: number; // 0 to 100
  headline: string;
  syllabusCoveragePercentage: number;
  proficientOrMasteredCount: number;
  totalSyllabusSkillsCount: number;
  recentExamAverageScore?: number;
  unresolvedBlockers: string[];
  recommendations: string[];
}

export interface HintDependencyMetrics {
  totalAttempts: number;
  attemptsWithHints: number;
  hintDependencyRate: number; // 0 to 100 percentage
  independentAccuracyRate: number; // 0 to 100 percentage
  interpretation: "high_independence" | "balanced_scaffolding" | "heavy_hint_reliance";
}

export type SessionPhase =
  | "diagnose"
  | "remediation"
  | "guided_practice"
  | "independent_practice"
  | "retrieval"
  | "challenge"
  | "exam_prep";

export interface SessionPhaseRecommendation {
  phase: SessionPhase;
  phaseTitle: string;
  rationale: string;
  suggestedAction: string;
}

export interface DashboardMetrics {
  strengths: Array<{ title: string; accuracy: number; points: number }>;
  weaknesses: Array<{ title: string; accuracy: number; recommendation: string }>;
  recommendedSkill: Skill;
  recommendedUnit: Unit;
  recommendedReason: string;
  recommendationType: "new_skill" | "remediation" | "revision" | "extension";
  recommendedPlayActivity?: PlayActivity;
  prerequisiteGapNotice?: string;
  masteryDistribution: {
    unstarted: number;
    familiar: number;
    proficient: number;
    mastered: number;
    total: number;
  };
  weeklyMinutes: number;
  accuracyRate: number;
  totalAttemptsCount: number;
  completionPercentage: number;
  recentMisconceptions: Array<{ trigger: string; note: string; skillTitle: string }>;
  examReadiness: ExamReadinessResult;
  hintDependency: HintDependencyMetrics;
  sessionPhase: SessionPhaseRecommendation;
}


export class AnalyticsService {
  public static calculateDashboardMetrics(profile: LearnerProfile): DashboardMetrics {
    const allUnits = curriculumService.getAllUnits();
    const targetLevel = profile?.targetLevel || "senior_secondary";
    const levelUnits = allUnits.filter((u) => u.level === targetLevel);
    const relevantUnits = levelUnits.length > 0 ? levelUnits : allUnits;
    const allSkills = relevantUnits.flatMap((u) => u.skills);
    const totalSkillsCount = allSkills.length;
    const mastery = profile?.masteryRecords || {};

    let unstarted = 0;
    let familiar = 0;
    let proficient = 0;
    let mastered = 0;

    const strengths: Array<{ title: string; accuracy: number; points: number }> = [];
    const weaknesses: Array<{ title: string; accuracy: number; recommendation: string }> = [];

    // Analyze individual skill mastery and accuracy
    allSkills.forEach((skill) => {
      const record = mastery[skill.id];
      if (!record || record.status === "unstarted" || record.points === 0) {
        unstarted++;
      } else if (record.status === "mastered" || record.points >= 90) {
        mastered++;
        strengths.push({
          title: skill.title,
          accuracy: record.attempts > 0 ? Math.round((record.correctCount / record.attempts) * 100) : 100,
          points: record.points
        });
      } else if (record.status === "proficient" || record.points >= 65) {
        proficient++;
        strengths.push({
          title: skill.title,
          accuracy: record.attempts > 0 ? Math.round((record.correctCount / record.attempts) * 100) : 80,
          points: record.points
        });
      } else {
        familiar++;
        weaknesses.push({
          title: skill.title,
          accuracy: record.attempts > 0 ? Math.round((record.correctCount / record.attempts) * 100) : 40,
          recommendation: `Targeted Socratic practice on ${skill.title}`
        });
      }
    });

    // Also account for completed skills in profile.masteryRecords outside current target level
    const levelSkillIdSet = new Set(allSkills.map((s) => s.id));
    let externalMasteredCount = 0;
    Object.entries(mastery).forEach(([skillId, record]) => {
      if (levelSkillIdSet.has(skillId) || !record) return;
      if (record.status === "mastered" || record.points >= 90) {
        mastered++;
        externalMasteredCount++;
        const extSkill = curriculumService.getSkillById(skillId);
        strengths.push({
          title: extSkill?.title || skillId,
          accuracy: record.attempts > 0 ? Math.round((record.correctCount / record.attempts) * 100) : 100,
          points: record.points
        });
      } else if (record.status === "proficient" || record.points >= 65) {
        proficient++;
        externalMasteredCount++;
      } else if (record.status === "familiar") {
        familiar++;
        externalMasteredCount++;
      }
    });

    // Provide baseline from diagnostic or defaults if strengths are empty
    if (strengths.length === 0) {
      if (profile.lastDiagnosticResult?.strengths?.length) {
        profile.lastDiagnosticResult.strengths.forEach((s) => {
          strengths.push({ title: s, accuracy: 85, points: 80 });
        });
      } else {
        strengths.push({ title: "Arithmetic & Number Operations", accuracy: 100, points: 100 });
        strengths.push({ title: "Linear Equations", accuracy: 85, points: 80 });
      }
    }

    // Provide growth areas if weaknesses are empty
    if (weaknesses.length === 0) {
      if (profile.lastDiagnosticResult?.gapAreas?.length) {
        profile.lastDiagnosticResult.gapAreas.forEach((g) => {
          weaknesses.push({ title: g, accuracy: 50, recommendation: "Review with Socratic hint ladder" });
        });
      } else {
        weaknesses.push({
          title: "Quadratic Roots & Signs",
          accuracy: 55,
          recommendation: "Focus on factorization sign rules"
        });
        weaknesses.push({
          title: "Three-Figure Bearings",
          accuracy: 50,
          recommendation: "Draw clockwise angles from True North"
        });
      }
    }

    // --- Pedagogical Recommendation Engine ---
    const activeUnit =
      levelUnits.find((u) => u.id === profile.activeUnitId) ||
      levelUnits[0] ||
      allUnits.find((u) => u.id === profile.activeUnitId) ||
      allUnits[0];

    let recommendedSkill: Skill = activeUnit.skills[0];
    let recommendedUnit: Unit = activeUnit;
    let recommendedReason = `Next key milestone in ${activeUnit.title}`;
    let recommendationType: "new_skill" | "remediation" | "revision" | "extension" = "new_skill";
    let prerequisiteGapNotice: string | undefined;

    // 1. Check for immediate remediation need: Any skill in active unit with >= 2 failed attempts and < 65 points
    const strugglingSkill = activeUnit.skills.find((s) => {
      const rec = mastery[s.id];
      return rec && rec.attempts >= 2 && rec.points < 60;
    });

    if (strugglingSkill) {
      recommendedSkill = strugglingSkill;
      recommendedUnit = activeUnit;
      recommendationType = "remediation";
      recommendedReason = `Remediation: Strengthen ${strugglingSkill.title} with step-by-step Socratic hints`;
    } else {
      // 2. Find first unmastered skill in active unit
      const candidateSkill = activeUnit.skills.find(
        (s) => (mastery[s.id]?.status || "unstarted") !== "mastered"
      );

      if (candidateSkill) {
        // Check prerequisite readiness across recursive chain
        const prereqChain = curriculumService.getPrerequisiteChain(candidateSkill.id);
        const unmasteredPrereq = prereqChain.find((p) => (mastery[p.id]?.points || 0) < 65);

        if (unmasteredPrereq) {
          const prereqUnit = curriculumService.getUnitBySkillId(unmasteredPrereq.id);
          if (prereqUnit && prereqUnit.level === targetLevel) {
            recommendedSkill = unmasteredPrereq;
            recommendedUnit = prereqUnit;
            recommendationType = "remediation";
            prerequisiteGapNotice = `Prerequisite foundation needed: Complete ${unmasteredPrereq.title} before advancing to ${candidateSkill.title}.`;
            recommendedReason = `Prerequisite Foundation: ${unmasteredPrereq.title}`;
          } else {
            recommendedSkill = candidateSkill;
            recommendedUnit = activeUnit;
            recommendedReason = `Next key milestone in ${activeUnit.title}`;
            if (prereqUnit) {
              prerequisiteGapNotice = `Helpful foundation refresher: ${unmasteredPrereq.title} (${prereqUnit.title}).`;
            }
          }
        } else {
          recommendedSkill = candidateSkill;
          recommendedUnit = activeUnit;
          recommendedReason = `Next key milestone in ${activeUnit.title}`;
        }
      } else {
        // 3. Active unit is completely mastered -> Advance to next incomplete unit
        const nextIncompleteUnit = relevantUnits.find((u) =>
          u.skills.some((s) => (mastery[s.id]?.status || "unstarted") !== "mastered")
        ) || allUnits.find((u) =>
          u.skills.some((s) => (mastery[s.id]?.status || "unstarted") !== "mastered")
        );

        if (nextIncompleteUnit) {
          recommendedUnit = nextIncompleteUnit;
          recommendedSkill = nextIncompleteUnit.skills.find(
            (s) => (mastery[s.id]?.status || "unstarted") !== "mastered"
          ) || nextIncompleteUnit.skills[0];
          recommendationType = "new_skill";
          recommendedReason = `New academic unit unlocked: ${nextIncompleteUnit.title}`;
        } else {
          // 4. Entire secondary curriculum completed! -> Revision & exam consolidation
          recommendedSkill = activeUnit.skills[0];
          recommendedUnit = activeUnit;
          recommendationType = "revision";
          recommendedReason = "Mastery consolidation and WAEC/JAMB exam speed drills";
        }
      }
    }

    // Extract recent misconceptions from question attempt logs
    const recentMisconceptions: Array<{ trigger: string; note: string; skillTitle: string }> = [];
    (profile.questionAttempts || [])
      .filter((a) => a.misconceptionTriggered)
      .slice(0, 3)
      .forEach((a) => {
        const sk = curriculumService.getSkillById(a.skillId);
        recentMisconceptions.push({
          trigger: a.selectedOption,
          note: a.misconceptionTriggered!,
          skillTitle: sk?.title || "Algebraic Formulation"
        });
      });

    // Total attempts accuracy calculation
    const totalAttempts = profile.questionAttempts?.length || 0;
    const correctAttempts = (profile.questionAttempts || []).filter((a) => a.isCorrect).length;
    const accuracyRate = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 84;

    const completionPercentage = Math.round(
      ((mastered + proficient * 0.7 + familiar * 0.3) / Math.max(totalSkillsCount, 1)) * 100
    );

    // Pedagogical Play Activity Recommendation:
    // Match activity to recommendedSkill or struggling weaknesses, otherwise default to linear balancer / concept matcher
    const matchingPlayActivity =
      ALL_PLAY_ACTIVITIES.find((a) => a.skillId === recommendedSkill.id) ||
      ALL_PLAY_ACTIVITIES.find((a) => a.unitId === recommendedUnit.id) ||
      ALL_PLAY_ACTIVITIES[0];

    const examReadiness = AnalyticsService.calculateExamReadiness(profile);
    const hintDependency = AnalyticsService.calculateHintDependency(profile.questionAttempts || []);
    const sessionPhase = AnalyticsService.determineSessionPhase(profile);

    return {
      strengths: strengths.slice(0, 4),
      weaknesses: weaknesses.slice(0, 4),
      recommendedSkill,
      recommendedUnit,
      recommendedReason,
      recommendationType,
      recommendedPlayActivity: matchingPlayActivity,
      prerequisiteGapNotice,
      masteryDistribution: {
        unstarted,
        familiar,
        proficient,
        mastered,
        total: totalSkillsCount + externalMasteredCount
      },
      weeklyMinutes: profile.totalStudyMinutes || 195,
      accuracyRate,
      totalAttemptsCount: totalAttempts,
      completionPercentage,
      recentMisconceptions,
      examReadiness,
      hintDependency,
      sessionPhase
    };
  }

  /**
   * Evaluates syllabus coverage, diagnostic benchmarks, attempt accuracy,
   * and CBT exam performance to produce an explainable readiness assessment.
   */
  public static calculateExamReadiness(profile: LearnerProfile): ExamReadinessResult {
    const allSkills = MATHEMATICS_UNITS.flatMap((u) => u.skills);
    const totalSkillsCount = allSkills.length;
    const mastery = profile?.masteryRecords || {};

    let proficientOrMasteredCount = 0;
    const unmasteredHighStakes: string[] = [];

    allSkills.forEach((skill) => {
      const rec = mastery[skill.id];
      if (rec && rec.points >= 65) {
        proficientOrMasteredCount++;
      } else {
        if (skill.difficulty === "intermediate" || skill.difficulty === "advanced") {
          unmasteredHighStakes.push(skill.title);
        }
      }
    });

    const syllabusCoveragePercentage = Math.round(
      (proficientOrMasteredCount / Math.max(totalSkillsCount, 1)) * 100
    );

    // Exam history examination
    const examAttempts = profile.examHistory || [];
    let recentExamAverageScore: number | undefined;
    if (examAttempts.length > 0) {
      const totalScore = examAttempts.reduce((sum, e) => sum + (e.scorePercentage || 0), 0);
      recentExamAverageScore = Math.round(totalScore / examAttempts.length);
    }

    // Base score components (Deterministic)
    let score = syllabusCoveragePercentage * 0.6; // 60% weight on curriculum coverage
    if (recentExamAverageScore !== undefined) {
      score += recentExamAverageScore * 0.3; // 30% weight on exam results
    } else {
      // Diagnostic baseline weight if no formal CBT taken yet
      const diagScore = profile.lastDiagnosticResult?.percentage || profile.lastDiagnosticResult?.score || 60;
      score += diagScore * 0.3;
    }

    // Streak / Consistency bonus (up to 10%)
    const streakBonus = Math.min((profile.streak?.count || 1) * 2, 10);
    score += streakBonus;
    score = Math.min(Math.max(Math.round(score), 10), 100);

    let readinessCategory: ExamReadinessCategory = "not_ready";
    let headline = "Foundational Curriculum Stage";
    const unresolvedBlockers: string[] = [];
    const recommendations: string[] = [];

    if (score >= 85 && syllabusCoveragePercentage >= 80) {
      readinessCategory = "strong_readiness";
      headline = "High Exam Confidence — WAEC / JAMB / IGCSE Distinction Ready";
      recommendations.push("Maintain timed full-length CBT mock drills under exam conditions.");
      recommendations.push("Review high-speed shortcuts in Trigonometry and Quadratic roots.");
    } else if (score >= 70 && syllabusCoveragePercentage >= 60) {
      readinessCategory = "ready";
      headline = "Substantial Syllabus Coverage — Ready for Timed CBT Mock Drills";
      recommendations.push("Target remaining intermediate topics in Coordinate Geometry.");
      recommendations.push("Take at least 2 full-length timed CBT practice papers in Exam Hall.");
    } else if (score >= 55) {
      readinessCategory = "approaching_readiness";
      headline = "Emerging Proficiency — Core Topic Foundations Active";
      if (unmasteredHighStakes.length > 0) {
        unresolvedBlockers.push(`Prerequisite mastery needed in: ${unmasteredHighStakes.slice(0, 2).join(", ")}.`);
      }
      recommendations.push("Focus on resolving sign errors in Quadratic equations and factorisation.");
      recommendations.push("Complete guided Socratic practice on unmastered units before full exams.");
    } else if (score >= 35) {
      readinessCategory = "developing_readiness";
      headline = "Developing Foundational Core Competencies";
      unresolvedBlockers.push("Syllabus coverage currently below 50%.");
      recommendations.push("Follow the recommended sequential learning supply roadmap in the Practice Arena.");
    } else {
      readinessCategory = "not_ready";
      headline = "Early Diagnostic Stage — Complete Curriculum Onboarding";
      unresolvedBlockers.push("Baseline diagnostic assessment or unit practice required.");
      recommendations.push("Complete baseline diagnostic assessment to calibrate personalized learning.");
    }

    return {
      readinessCategory,
      readinessScore: score,
      headline,
      syllabusCoveragePercentage,
      proficientOrMasteredCount,
      totalSyllabusSkillsCount: totalSkillsCount,
      recentExamAverageScore,
      unresolvedBlockers,
      recommendations
    };
  }

  /**
   * Analyzes hint dependency to distinguish independent retrieval mastery
   * from scaffold-dependent correctness.
   */
  public static calculateHintDependency(attempts: QuestionAttempt[]): HintDependencyMetrics {
    const total = attempts.length;
    if (total === 0) {
      return {
        totalAttempts: 0,
        attemptsWithHints: 0,
        hintDependencyRate: 0,
        independentAccuracyRate: 100,
        interpretation: "high_independence"
      };
    }

    const attemptsWithHints = attempts.filter((a) => (a.hintsUsedCount || 0) > 0).length;
    const independentCorrect = attempts.filter((a) => (a.hintsUsedCount || 0) === 0 && a.isCorrect).length;

    const hintDependencyRate = Math.round((attemptsWithHints / total) * 100);
    const independentAccuracyRate = Math.round((independentCorrect / total) * 100);

    let interpretation: "high_independence" | "balanced_scaffolding" | "heavy_hint_reliance" = "high_independence";
    if (hintDependencyRate > 50) {
      interpretation = "heavy_hint_reliance";
    } else if (hintDependencyRate > 20) {
      interpretation = "balanced_scaffolding";
    }

    return {
      totalAttempts: total,
      attemptsWithHints,
      hintDependencyRate,
      independentAccuracyRate,
      interpretation
    };
  }

  /**
   * Determines the learner's current adaptive session phase.
   */
  public static determineSessionPhase(profile: LearnerProfile): SessionPhaseRecommendation {
    if (!profile.diagnosticsCompleted) {
      return {
        phase: "diagnose",
        phaseTitle: "Calibrate Diagnostic Baseline",
        rationale: "Initial diagnostic assessment is needed to map personal strengths and knowledge frontiers.",
        suggestedAction: "Launch Diagnostic Engine"
      };
    }

    const mastery = profile.masteryRecords || {};
    const struggling = Object.values(mastery).some((m) => m.attempts >= 2 && m.points < 50);
    if (struggling) {
      return {
        phase: "remediation",
        phaseTitle: "Targeted Remediation & Prerequisite Repair",
        rationale: "Recent attempts show persistent stumbling blocks that require first-principles scaffolding.",
        suggestedAction: "Launch Socratic Guided Practice"
      };
    }

    const attempts = profile.questionAttempts || [];
    const recentAttempts = attempts.slice(-5);
    const recentAccuracy = recentAttempts.length > 0
      ? (recentAttempts.filter((a) => a.isCorrect).length / recentAttempts.length)
      : 1;

    if (recentAttempts.length >= 3 && recentAccuracy >= 0.8) {
      return {
        phase: "challenge",
        phaseTitle: "High-Confidence Milestone Challenge",
        rationale: "Strong consecutive accuracy indicates readiness for multi-step non-routine problem solving.",
        suggestedAction: "Enter Challenge Arena"
      };
    }

    return {
      phase: "guided_practice",
      phaseTitle: "Sequential Scaffolded Practice",
      rationale: "Building solid conceptual and procedural fluency on active curriculum objectives.",
      suggestedAction: "Continue Practice Arena"
    };
  }
}

