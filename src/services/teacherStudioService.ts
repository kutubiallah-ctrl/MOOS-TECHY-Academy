/**
 * MOOS TECHY TEACHER STUDIO — SERVICE LAYER
 * 
 * Manages instructional planning, 5-phase lesson scaffolding,
 * assessment blueprint creation, and learner struggle interventions.
 */

import {
  TeacherLessonPlan,
  TeacherAssessmentBlueprint,
  LearnerInterventionPlan,
  ClassAnalyticsSnapshot
} from "../types/teacherStudio";

export const SEEDED_LESSON_PLANS: TeacherLessonPlan[] = [
  {
    id: "lp-mth-quad-3-2",
    teacherId: "user-teacher-001",
    title: "Derivation of Quadratic Formula via Completing the Square",
    subjectId: "subj-mth-senior",
    unitId: "unit-mth-ss1-03",
    skillId: "skill-quad-02",
    targetLevel: "senior_secondary",
    durationMinutes: 45,
    learningObjectives: [
      "Derive the general quadratic formula from ax² + bx + c = 0 from first principles.",
      "Interpret the geometric and algebraic significance of adding (b/2a)².",
      "Evaluate the discriminant to predict root character."
    ],
    prerequisites: ["Perfect square trinomial recognition", "Basic algebraic manipulation of rational expressions"],
    materialsAndTools: ["Graphing board / digital simulator", "Physical C.E.M.M Mathematics Textbook pp. 84-95", "QR code scanner"],
    phases: [
      {
        phaseName: "Hook & Warmup",
        durationMinutes: 7,
        teacherGuidance: "Present a quadratic equation that cannot be easily factored with integers: 2x² + 5x - 1 = 0.",
        studentActivity: "Attempt factorisation and discover why rational integer splitting fails.",
        keyQuestionsToAsk: ["Why does factoring by inspection reach a dead end here?"],
        commonStumblingBlocks: ["Assuming non-factorable quadratics have no solutions."]
      },
      {
        phaseName: "Direct Instruction",
        durationMinutes: 12,
        teacherGuidance: "Demonstrate completing the square geometrically on the whiteboard, dividing first by a.",
        studentActivity: "Follow along on personal scratchpads, recording the derivation step-by-step.",
        keyQuestionsToAsk: ["Why MUST we divide by a before adding the square term?"],
        commonStumblingBlocks: ["Adding (b/2)² instead of (b/2a)²."]
      },
      {
        phaseName: "Guided Socratic Practice",
        durationMinutes: 14,
        teacherGuidance: "Walk the class through applying the derived formula to 3x² - 5x - 2 = 0.",
        studentActivity: "Identify a, b, c, compute discriminant Δ, and calculate roots with a partner.",
        keyQuestionsToAsk: ["What is the numerical value of the discriminant?", "What does Δ = 49 tell us about the roots?"],
        commonStumblingBlocks: ["Sign errors when substituting negative b values: -(-5) = +5."]
      },
      {
        phaseName: "Collaborative Task",
        durationMinutes: 7,
        teacherGuidance: "Assign paired exploration of discriminant cases: Δ > 0, Δ = 0, and Δ < 0.",
        studentActivity: "Match 3 example equations to their respective parabolic curve sketches.",
        keyQuestionsToAsk: ["Where does the parabola cross the x-axis when Δ = 0?"],
        commonStumblingBlocks: ["Confusing y-intercept with x-intercepts."]
      },
      {
        phaseName: "Formative Exit Check",
        durationMinutes: 5,
        teacherGuidance: "Administer 1-question exit ticket via mobile or paper slip.",
        studentActivity: "Compute the discriminant of x² - 6x + 9 = 0 and state the number of distinct real roots.",
        keyQuestionsToAsk: ["What is Δ?", "How many distinct real roots exist?"],
        commonStumblingBlocks: ["Stating two distinct roots when Δ = 0."]
      }
    ],
    suggestedPracticeQuestions: [],
    homeworkOrExtension: "Scan QR code CEMM-CH03-SEC02-EX04 on page 88 to complete 5 interactive extension problems on Tutor Moos.",
    linkedQRCompanionCode: "CEMM-CH03-SEC02-EX04",
    lifecycleStatus: "human_approved",
    createdAt: "2026-02-01T09:00:00Z",
    updatedAt: "2026-02-16T11:20:00Z"
  }
];

export const SEEDED_INTERVENTION_PLANS: LearnerInterventionPlan[] = [
  {
    id: "int-001",
    learnerId: "learner-001",
    learnerName: "Amina Yusuf",
    identifiedStruggleSkillId: "skill-quad-02",
    identifiedStruggleSkillName: "Quadratic Formula & Discriminant Analysis",
    diagnosticObservation: "Frequent sign inversion when substituting negative b values into x = (-b ± √Δ)/2a.",
    recommendedAction: "tutor_moos_session",
    suggestedQRResources: ["CEMM-CH03-SEC02-EX04"],
    followUpDueDate: "2026-03-01",
    status: "in_progress"
  },
  {
    id: "int-002",
    learnerId: "learner-002",
    learnerName: "Chidi Eze",
    identifiedStruggleSkillId: "skill-phy-vec-01",
    identifiedStruggleSkillName: "Vector Resolution & Resultant Components",
    diagnosticObservation: "Difficulty resolving 2D force vectors into perpendicular components F_x = F cos θ and F_y = F sin θ.",
    recommendedAction: "formula_codex_review",
    suggestedQRResources: ["CEMP-PHY-CH2-SEC1-VEC"],
    followUpDueDate: "2026-03-03",
    status: "open"
  }
];

export const SEEDED_CLASS_ANALYTICS: ClassAnalyticsSnapshot = {
  classId: "cls-ss2-sci-a",
  className: "Senior Secondary 2 — Science Cohort Alpha",
  gradeLevel: "senior_secondary",
  totalEnrolled: 38,
  averageMasteryScore: 78.4,
  topStrengths: ["Linear Algebra", "Circle Theorems", "Kinematic Equations"],
  priorityInterventionsCount: 5,
  activeLearnersCount: 36,
  recentExamAverage: 82.1
};

class TeacherStudioService {
  private lessonPlans: TeacherLessonPlan[] = [...SEEDED_LESSON_PLANS];
  private interventions: LearnerInterventionPlan[] = [...SEEDED_INTERVENTION_PLANS];
  private classAnalytics: ClassAnalyticsSnapshot = SEEDED_CLASS_ANALYTICS;

  public getLessonPlans(): TeacherLessonPlan[] {
    return this.lessonPlans;
  }

  public getLessonPlanById(id: string): TeacherLessonPlan | undefined {
    return this.lessonPlans.find((lp) => lp.id === id);
  }

  public getInterventions(): LearnerInterventionPlan[] {
    return this.interventions;
  }

  public getClassAnalytics(): ClassAnalyticsSnapshot {
    return this.classAnalytics;
  }

  public createLessonPlan(plan: Partial<TeacherLessonPlan>): TeacherLessonPlan {
    const newPlan: TeacherLessonPlan = {
      id: `lp-${Date.now()}`,
      teacherId: plan.teacherId || "user-teacher-001",
      title: plan.title || "Untitled Instructional Plan",
      subjectId: plan.subjectId || "subj-mth-senior",
      unitId: plan.unitId || "unit-01",
      skillId: plan.skillId || "skill-01",
      targetLevel: plan.targetLevel || "senior_secondary",
      durationMinutes: plan.durationMinutes || 45,
      learningObjectives: plan.learningObjectives || ["Understand fundamental concepts."],
      prerequisites: plan.prerequisites || [],
      materialsAndTools: plan.materialsAndTools || ["Textbook and digital companion."],
      phases: plan.phases || [],
      suggestedPracticeQuestions: [],
      homeworkOrExtension: plan.homeworkOrExtension || "Review chapter concepts.",
      linkedQRCompanionCode: plan.linkedQRCompanionCode,
      lifecycleStatus: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.lessonPlans.unshift(newPlan);
    return newPlan;
  }
}

export const teacherStudioService = new TeacherStudioService();
