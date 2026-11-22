/**
 * MOOS TECHY ACADEMY — READINESS PATHWAYS ("GET READY") SERVICE
 * 
 * Implements the complete pedagogical pathway:
 * TARGET COURSE -> PREREQUISITE DIAGNOSTIC -> KNOWLEDGE GAPS -> FOUNDATIONAL LESSONS -> GUIDED PRACTICE -> REMEDIATION -> READINESS CHECK -> TARGET COURSE
 * 
 * Invariants:
 * 1. If a learner already demonstrates mastery (points >= 80% on prerequisite competencies),
 *    readiness is immediately certified ("Exempt Mastered") without forcing redundant remediation.
 * 2. Prerequisite gaps pinpoint exact misconception triggers and link to foundational skills.
 */

import {
  ReadinessPathway,
  ReadinessStatus,
  ReadinessEvaluationResult,
  ReadinessKnowledgeGap,
  ReadinessPrerequisiteSkill
} from "../types/readiness";
import { ExtendedLearnerProfile } from "../types/learner";
import { curriculumService } from "./curriculumService";
import { PracticeQuestion, EducationalLevel } from "../types/curriculum";

const READINESS_STORAGE_KEY = "moos_readiness_pathways_v1";

export class ReadinessService {
  private static instance: ReadinessService;
  private pathways: Map<string, ReadinessPathway> = new Map();

  private constructor() {
    this.seedDefaultPathways();
    this.loadStateFromStorage();
  }

  public static getInstance(): ReadinessService {
    if (!ReadinessService.instance) {
      ReadinessService.instance = new ReadinessService();
    }
    return ReadinessService.instance;
  }

  private loadStateFromStorage(): void {
    try {
      const raw = localStorage.getItem(READINESS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, Partial<ReadinessPathway>>;
        Object.entries(parsed).forEach(([id, state]) => {
          const existing = this.pathways.get(id);
          if (existing) {
            this.pathways.set(id, { ...existing, ...state });
          }
        });
      }
    } catch (e) {
      console.error("Failed to load readiness state from storage:", e);
    }
  }

  private persistState(): void {
    try {
      const toSave: Record<string, any> = {};
      this.pathways.forEach((p, id) => {
        toSave[id] = {
          status: p.status,
          lastEvaluatedAt: p.lastEvaluatedAt,
          diagnosticScore: p.diagnosticScore,
          identifiedGaps: p.identifiedGaps
        };
      });
      localStorage.setItem(READINESS_STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.error("Failed to persist readiness state:", e);
    }
  }

  private seedDefaultPathways(): void {
    const list: ReadinessPathway[] = [
      {
        id: "ready-ss1-math",
        code: "RDY-SS1-MTH",
        title: "Get Ready for Senior Secondary (SS1) Mathematics",
        targetCourseOrLevel: "Senior Secondary (SS1) Mathematics",
        targetSubject: "Mathematics",
        targetLevel: "senior_secondary",
        description: "Diagnose and bridge essential BECE prerequisites: directed numbers, bracket expansions, linear equations, and simple ratios before starting quadratic algebra.",
        iconName: "Calculator",
        estimatedHours: 6,
        passingScorePercentage: 75,
        status: "not_started",
        completionCertificateEligible: true,
        identifiedGaps: [],
        prerequisiteSkills: [
          {
            skillId: "skill-frac-operations",
            unitId: "unit-foundations-numbers",
            skillTitle: "Fraction Operations & Reciprocals",
            unitTitle: "Fractions, Decimals & Percentages",
            level: "upper_primary",
            focusArea: "Arithmetic Foundations",
            importanceWeight: "essential",
            currentMasteryPoints: 0,
            isMastered: false
          },
          {
            skillId: "skill-linear-eval",
            unitId: "unit-jss-math-1",
            skillTitle: "Linear Equation Solving & Balancing",
            unitTitle: "Junior Secondary Algebra Foundations",
            level: "junior_secondary",
            focusArea: "Algebraic Balancing",
            importanceWeight: "essential",
            currentMasteryPoints: 0,
            isMastered: false
          },
          {
            skillId: "skill-directed-numbers",
            unitId: "unit-jss-math-2",
            skillTitle: "Operations with Directed Positive and Negative Numbers",
            unitTitle: "Number Systems & Directed Numbers",
            level: "junior_secondary",
            focusArea: "Sign Rules & Integer Agility",
            importanceWeight: "essential",
            currentMasteryPoints: 0,
            isMastered: false
          }
        ],
        prerequisiteDiagnosticQuestions: [
          {
            id: "diag-ss1-1",
            type: "multiple_choice",
            questionText: "Simplify the directed number expression: (-7) - (-12) + (-3)",
            options: ["2", "-22", "8", "-8"],
            correctAnswer: "2",
            explanation: "Subtracting a negative number is equivalent to adding: -7 + 12 = 5. Then 5 + (-3) = 2.",
            hintLadder: ["Recall that subtracting a negative number is the same as adding a positive."],
            skillId: "skill-directed-numbers",
            difficulty: "medium"
          },
          {
            id: "diag-ss1-2",
            type: "multiple_choice",
            questionText: "Solve for x in the linear equation: 3(2x - 4) = 18",
            options: ["x = 5", "x = 3", "x = 7", "x = 11"],
            correctAnswer: "x = 5",
            explanation: "Expand brackets: 6x - 12 = 18. Add 12 to both sides: 6x = 30. Divide by 6: x = 5.",
            hintLadder: ["First expand 3 × 2x and 3 × (-4), or divide both sides by 3 first."],
            skillId: "skill-linear-eval",
            difficulty: "medium"
          },
          {
            id: "diag-ss1-3",
            type: "multiple_choice",
            questionText: "Evaluate: (2/3) ÷ (4/9)",
            options: ["1 1/2", "8/27", "2/3", "3/4"],
            correctAnswer: "1 1/2",
            explanation: "(2/3) × (9/4) = 18/12 = 3/2 = 1 1/2.",
            hintLadder: ["Invert the divisor fraction (4/9 becomes 9/4) and multiply."],
            skillId: "skill-frac-operations",
            difficulty: "easy"
          }
        ]
      },
      {
        id: "ready-algebra",
        code: "RDY-ALG-01",
        title: "Get Ready for Algebra & Functions",
        targetCourseOrLevel: "Algebraic Mastery & Functions (MTH-ALG)",
        targetSubject: "Mathematics",
        targetLevel: "senior_secondary",
        description: "Ensure computational confidence with negative numbers, variable substitution, like terms, and reciprocal fractions.",
        iconName: "Variable",
        estimatedHours: 5,
        passingScorePercentage: 75,
        status: "not_started",
        completionCertificateEligible: true,
        identifiedGaps: [],
        prerequisiteSkills: [
          {
            skillId: "skill-frac-operations",
            unitId: "unit-foundations-numbers",
            skillTitle: "Fraction Operations & Reciprocals",
            unitTitle: "Fractions, Decimals & Percentages",
            level: "upper_primary",
            focusArea: "Rational Coefficients",
            importanceWeight: "essential",
            currentMasteryPoints: 0,
            isMastered: false
          }
        ],
        prerequisiteDiagnosticQuestions: [
          {
            id: "diag-alg-1",
            type: "multiple_choice",
            questionText: "If y = -3, what is the value of 2y² - 5y + 4?",
            options: ["37", "7", "1", "49"],
            correctAnswer: "37",
            explanation: "2(-3)² - 5(-3) + 4 = 2(9) + 15 + 4 = 18 + 15 + 4 = 37.",
            hintLadder: ["Notice that (-3)² = +9, and (-5) × (-3) = +15."],
            skillId: "skill-frac-operations",
            difficulty: "medium"
          }
        ]
      },
      {
        id: "ready-geometry",
        code: "RDY-GEO-01",
        title: "Get Ready for Geometry, Circle Theorems & Bearings",
        targetCourseOrLevel: "Geometry, Trigonometry & Vectors",
        targetSubject: "Mathematics",
        targetLevel: "senior_secondary",
        description: "Consolidate angle properties of intersecting lines, parallel transversals, isosceles triangles, and Pythagoras theorem.",
        iconName: "Compass",
        estimatedHours: 5,
        passingScorePercentage: 75,
        status: "not_started",
        completionCertificateEligible: true,
        identifiedGaps: [],
        prerequisiteSkills: [
          {
            skillId: "skill-pythagoras-found",
            unitId: "unit-jss-math-geom",
            skillTitle: "Pythagorean Theorem & Right-Angled Triangles",
            unitTitle: "Introductory Geometry",
            level: "junior_secondary",
            focusArea: "Right-Angle Trigonometry",
            importanceWeight: "essential",
            currentMasteryPoints: 0,
            isMastered: false
          }
        ],
        prerequisiteDiagnosticQuestions: [
          {
            id: "diag-geo-1",
            type: "multiple_choice",
            questionText: "In a right-angled triangle, if the two legs measure 6 cm and 8 cm, what is the hypotenuse?",
            options: ["10 cm", "14 cm", "12 cm", "9 cm"],
            correctAnswer: "10 cm",
            explanation: "c² = a² + b² = 6² + 8² = 36 + 64 = 100. c = √100 = 10 cm.",
            hintLadder: ["Use the Pythagorean theorem: a² + b² = c²."],
            skillId: "skill-pythagoras-found",
            difficulty: "easy"
          }
        ]
      },
      {
        id: "ready-calculus",
        code: "RDY-CALC-01",
        title: "Get Ready for Differential Calculus",
        targetCourseOrLevel: "Calculus & Advanced Analysis",
        targetSubject: "Mathematics",
        targetLevel: "university_prep",
        description: "Master gradient calculations, slopes of secant lines, negative and fractional indices, and polynomial expansion.",
        iconName: "Activity",
        estimatedHours: 8,
        passingScorePercentage: 80,
        status: "not_started",
        completionCertificateEligible: true,
        identifiedGaps: [],
        prerequisiteSkills: [
          {
            skillId: "skill-quad-expansion",
            unitId: "unit-algebra-quadratics",
            skillTitle: "Polynomial Factorization & Function Notation",
            unitTitle: "Quadratic Equations & Roots",
            level: "senior_secondary",
            focusArea: "Algebraic Agility",
            importanceWeight: "essential",
            currentMasteryPoints: 0,
            isMastered: false
          }
        ],
        prerequisiteDiagnosticQuestions: [
          {
            id: "diag-calc-1",
            type: "multiple_choice",
            questionText: "What is the slope of the line passing through points (2, 3) and (6, 11)?",
            options: ["2", "4", "1/2", "8"],
            correctAnswer: "2",
            explanation: "Slope m = (y₂ - y₁) / (x₂ - x₁) = (11 - 3) / (6 - 2) = 8 / 4 = 2.",
            hintLadder: ["Slope formula is (change in y) / (change in x)."],
            skillId: "skill-quad-expansion",
            difficulty: "easy"
          }
        ]
      },
      {
        id: "ready-physics",
        code: "RDY-PHY-01",
        title: "Get Ready for Senior Secondary Physics",
        targetCourseOrLevel: "Physics: Mechanics, Waves & Modern Systems",
        targetSubject: "Physics",
        targetLevel: "senior_secondary",
        description: "Check readiness in scientific notation, unit conversion (SI units), algebraic rearrangement of formulas, and basic vector arithmetic.",
        iconName: "Zap",
        estimatedHours: 6,
        passingScorePercentage: 75,
        status: "not_started",
        completionCertificateEligible: true,
        identifiedGaps: [],
        prerequisiteSkills: [
          {
            skillId: "skill-std-form",
            unitId: "unit-foundations-numbers",
            skillTitle: "Standard Form & Powers of Ten",
            unitTitle: "Fractions, Decimals & Percentages",
            level: "upper_primary",
            focusArea: "Scientific Notation & Units",
            importanceWeight: "essential",
            currentMasteryPoints: 0,
            isMastered: false
          }
        ],
        prerequisiteDiagnosticQuestions: [
          {
            id: "diag-phy-1",
            type: "multiple_choice",
            questionText: "Rearrange the formula v² = u² + 2as to make acceleration 'a' the subject:",
            options: ["a = (v² - u²) / (2s)", "a = (v² + u²) / 2s", "a = (v - u) / 2s", "a = 2s(v² - u²)"],
            correctAnswer: "a = (v² - u²) / (2s)",
            explanation: "Subtract u² from both sides: v² - u² = 2as. Divide both sides by 2s: a = (v² - u²) / (2s).",
            hintLadder: ["Isolate 2as first by subtracting u² from both sides."],
            skillId: "skill-std-form",
            difficulty: "medium"
          }
        ]
      },
      {
        id: "ready-chemistry",
        code: "RDY-CHM-01",
        title: "Get Ready for Senior Secondary Chemistry",
        targetCourseOrLevel: "Chemistry: Molecular Systems & Stoichiometry",
        targetSubject: "Chemistry",
        targetLevel: "senior_secondary",
        description: "Ensure solid footing in the periodic table, chemical symbols, atomic mass numbers, and proportional ratios.",
        iconName: "FlaskConical",
        estimatedHours: 5,
        passingScorePercentage: 75,
        status: "not_started",
        completionCertificateEligible: true,
        identifiedGaps: [],
        prerequisiteSkills: [
          {
            skillId: "skill-ratios-chm",
            unitId: "unit-foundations-numbers",
            skillTitle: "Direct Proportion & Unit Ratios",
            unitTitle: "Fractions, Decimals & Percentages",
            level: "upper_primary",
            focusArea: "Quantitative Ratios",
            importanceWeight: "essential",
            currentMasteryPoints: 0,
            isMastered: false
          }
        ],
        prerequisiteDiagnosticQuestions: [
          {
            id: "diag-chm-1",
            type: "multiple_choice",
            questionText: "If 2 moles of Hydrogen react with 1 mole of Oxygen to produce 2 moles of Water, how many moles of Oxygen are required to react completely with 6 moles of Hydrogen?",
            options: ["3 moles", "6 moles", "2 moles", "1.5 moles"],
            correctAnswer: "3 moles",
            explanation: "The ratio of H₂ to O₂ is 2 : 1. For 6 moles of H₂, required O₂ = 6 / 2 = 3 moles.",
            hintLadder: ["Use the stoichiometric ratio 2 : 1."],
            skillId: "skill-ratios-chm",
            difficulty: "easy"
          }
        ]
      },
      {
        id: "ready-compsci",
        code: "RDY-CSC-01",
        title: "Get Ready for Computer Science & Python",
        targetCourseOrLevel: "Computer Science: Python & Algorithmic Thinking",
        targetSubject: "Computer Science",
        targetLevel: "senior_secondary",
        description: "Check readiness in binary counting, logic statements (AND/OR/NOT), order of operations, and step-by-step algorithms.",
        iconName: "Cpu",
        estimatedHours: 4,
        passingScorePercentage: 75,
        status: "not_started",
        completionCertificateEligible: true,
        identifiedGaps: [],
        prerequisiteSkills: [
          {
            skillId: "skill-logic-boolean",
            unitId: "unit-csc-prog-1",
            skillTitle: "Computational Logic & Sequences",
            unitTitle: "Computer Science Foundations",
            level: "junior_secondary",
            focusArea: "Conditional Reasoning",
            importanceWeight: "essential",
            currentMasteryPoints: 0,
            isMastered: false
          }
        ],
        prerequisiteDiagnosticQuestions: [
          {
            id: "diag-csc-1",
            type: "multiple_choice",
            questionText: "If A is TRUE and B is FALSE, what is the boolean value of (A AND (NOT B))?",
            options: ["TRUE", "FALSE", "Undefined", "Null"],
            correctAnswer: "TRUE",
            explanation: "NOT B is NOT FALSE = TRUE. So (A AND TRUE) = (TRUE AND TRUE) = TRUE.",
            hintLadder: ["Evaluate NOT B first, then check the AND condition."],
            skillId: "skill-logic-boolean",
            difficulty: "easy"
          }
        ]
      },
      {
        id: "ready-exam-wassce",
        code: "RDY-WASSCE-01",
        title: "Get Ready for WAEC WASSCE Examination Hall",
        targetCourseOrLevel: "WAEC WASSCE Standardized Exam Prep",
        targetSubject: "Exam Prep",
        targetLevel: "exam_prep",
        description: "Comprehensive diagnostic covering high-frequency core WASSCE paper 1 and paper 2 questions to isolate urgent revision topics.",
        iconName: "GraduationCap",
        estimatedHours: 8,
        passingScorePercentage: 70,
        status: "not_started",
        completionCertificateEligible: true,
        identifiedGaps: [],
        prerequisiteSkills: [
          {
            skillId: "skill-frac-operations",
            unitId: "unit-foundations-numbers",
            skillTitle: "Essential Computational Numeracy",
            unitTitle: "Core Mathematics Foundations",
            level: "senior_secondary",
            focusArea: "Speed & Accuracy",
            importanceWeight: "essential",
            currentMasteryPoints: 0,
            isMastered: false
          }
        ],
        prerequisiteDiagnosticQuestions: [
          {
            id: "diag-wassce-1",
            type: "multiple_choice",
            questionText: "Find the sum of the roots of the quadratic equation: 2x² - 8x + 3 = 0",
            options: ["4", "-4", "1.5", "-1.5"],
            correctAnswer: "4",
            explanation: "For ax² + bx + c = 0, sum of roots = -b/a = -(-8)/2 = 8/2 = 4.",
            hintLadder: ["Use the relation: sum of roots = -b/a."],
            skillId: "skill-frac-operations",
            difficulty: "medium"
          }
        ]
      }
    ];

    list.forEach((p) => this.pathways.set(p.id, p));
  }

  public getAllPathways(learnerProfile?: ExtendedLearnerProfile): ReadinessPathway[] {
    const pathways = Array.from(this.pathways.values());
    if (!learnerProfile) return pathways;

    // Refresh mastery state based on learner's live records
    return pathways.map((p) => {
      const refreshedPrereqs: ReadinessPrerequisiteSkill[] = p.prerequisiteSkills.map((prereq) => {
        const record = learnerProfile.masteryRecords[prereq.skillId];
        const points = record?.points || 0;
        return {
          ...prereq,
          currentMasteryPoints: points,
          isMastered: points >= 80
        };
      });

      // INVARIANT: Check if learner already demonstrates comprehensive mastery
      const allEssentialMastered = refreshedPrereqs
        .filter((pr) => pr.importanceWeight === "essential")
        .every((pr) => pr.isMastered);

      let effectiveStatus = p.status;
      if (allEssentialMastered && p.status === "not_started") {
        effectiveStatus = "exempt_mastered";
      }

      return {
        ...p,
        prerequisiteSkills: refreshedPrereqs,
        status: effectiveStatus
      };
    });
  }

  public getPathwayById(id: string, learnerProfile?: ExtendedLearnerProfile): ReadinessPathway | undefined {
    const list = this.getAllPathways(learnerProfile);
    return list.find((p) => p.id === id);
  }

  /**
   * Evaluates a completed prerequisite diagnostic test.
   * If learner passes >= threshold, certifies readiness immediately!
   * If gaps are identified, isolates them for focused remediation.
   */
  public evaluateDiagnostic(
    pathwayId: string,
    answers: Record<string, string>,
    learnerProfile: ExtendedLearnerProfile
  ): ReadinessEvaluationResult {
    const pathway = this.pathways.get(pathwayId);
    if (!pathway) {
      throw new Error(`Readiness pathway '${pathwayId}' not found.`);
    }

    let correctCount = 0;
    const gaps: ReadinessKnowledgeGap[] = [];
    const questions = pathway.prerequisiteDiagnosticQuestions;

    questions.forEach((q) => {
      const selected = answers[q.id];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) {
        correctCount++;
      } else {
        const prereq = pathway.prerequisiteSkills.find((p) => p.skillId === q.skillId);
        gaps.push({
          skillId: q.skillId,
          skillTitle: prereq?.skillTitle || "Prerequisite Skill",
          unitTitle: prereq?.unitTitle || "Foundational Unit",
          missedConcepts: [q.questionText],
          observedMisconceptions: [q.explanation],
          recommendedAction: `Review worked examples and practice foundational exercises for ${prereq?.skillTitle || "this skill"}.`,
          priority: "high"
        });
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const isReady = percentage >= pathway.passingScorePercentage;

    const newStatus: ReadinessStatus = isReady ? "readiness_certified" : "gaps_identified";

    pathway.status = newStatus;
    pathway.lastEvaluatedAt = new Date().toISOString();
    pathway.diagnosticScore = {
      totalQuestions: questions.length,
      correctCount,
      percentage
    };
    pathway.identifiedGaps = gaps;

    this.persistState();

    return {
      pathwayId,
      status: newStatus,
      scorePercentage: percentage,
      isReadyForTargetCourse: isReady,
      exemptMastered: false,
      gaps,
      prescribedSkillsToRemediate: gaps.map((g) => g.skillId),
      summaryNote: isReady
        ? `Congratulations! You scored ${percentage}% on the prerequisite diagnostic. You have demonstrated solid foundational readiness for ${pathway.targetCourseOrLevel}.`
        : `Diagnostic complete: ${percentage}%. We identified ${gaps.length} foundational knowledge gap(s). Complete the recommended foundational lessons below to get fully ready.`
    };
  }

  /**
   * Certifies that a learner has completed required remediation for a pathway.
   */
  public certifyReadiness(pathwayId: string): ReadinessPathway {
    const pathway = this.pathways.get(pathwayId);
    if (!pathway) throw new Error(`Pathway '${pathwayId}' not found`);

    pathway.status = "readiness_certified";
    pathway.lastEvaluatedAt = new Date().toISOString();
    this.persistState();
    return pathway;
  }
}

export const readinessService = ReadinessService.getInstance();
