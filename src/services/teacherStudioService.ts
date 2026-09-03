/**
 * MOOS TECHY TEACHER STUDIO — SERVICE LAYER
 * 
 * Manages institutional classroom cohorts, learner rosters, assignment distribution,
 * assignment lifecycle intelligence, adaptive grouping, prerequisite bottlenecks,
 * misconception clusters, teacher decision support, 5-phase lesson scaffolding, and cohort analytics.
 */

import {
  TeacherLessonPlan,
  TeacherAssessmentBlueprint,
  LearnerInterventionPlan,
  ClassAnalyticsSnapshot,
  TeacherClassroom,
  ClassroomRosterStudent,
  ClassroomAssignment,
  TeacherInterventionRecommendation,
  ClassroomAdaptiveGroup,
  PrerequisiteBottleneckCluster,
  MisconceptionCluster,
  ClassroomNextBestAction,
  AssignmentLifecycleStatus,
  LearnerAssignmentProgress,
  TeacherInterventionStatus,
  AssignmentEffectivenessVerdict,
  AssignmentDifferentiationConfig
} from "../types/teacherStudio";
import { MATHEMATICS_UNITS } from "../data/curriculumData";
import { ALL_CURRICULUM_UNITS } from "../data/extendedCurriculumUnits";
import { curriculumService } from "./curriculumService";
import { LearnerProfile } from "../types/learner";
import { calculateAssignmentCompletionState } from "./assignmentService";
import { identityService } from "./identityService";
import { authorizationService } from "./authorizationService";
import { auditService } from "./auditService";
import { UserIdentity, UserSession, InstitutionalUser } from "../types/identity";

export const SEEDED_CLASSROOMS: TeacherClassroom[] = [
  {
    id: "cls-ss2-sci-a",
    name: "Senior Secondary 2 — Science Cohort Alpha",
    gradeLevel: "senior_secondary",
    subjectId: "subj-mth-senior",
    standard: "WAEC_WASSCE",
    roomCode: "MOOS-SS2A-9412",
    enrolledLearnerIds: ["learner-001", "learner-002", "learner-003", "learner-004", "learner-005", "demo-learner-01"],
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-02-20T14:30:00Z"
  },
  {
    id: "cls-jss3-stem-b",
    name: "Junior Secondary 3 — STEM Foundations",
    gradeLevel: "junior_secondary",
    subjectId: "subj-mth-junior",
    standard: "NERDC_NIGERIAN",
    roomCode: "MOOS-JSS3-3381",
    enrolledLearnerIds: ["learner-006", "learner-007"],
    createdAt: "2026-01-15T09:30:00Z",
    updatedAt: "2026-02-18T11:00:00Z"
  }
];

export const SEEDED_ASSIGNMENTS: ClassroomAssignment[] = [
  {
    id: "asg-001",
    teacherId: "user-teacher-001",
    classroomId: "cls-ss2-sci-a",
    title: "Derivation & Application of Quadratic Discriminant Δ",
    description: "Complete 5 scaffolded parametric problems and verify root types before the term mock.",
    unitId: "unit-mth-ss1-03",
    skillId: "skill-quad-02",
    assignmentType: "practice",
    targetLearnerIds: [], // Whole class
    dueDate: "2026-09-05",
    status: "active",
    provenance: "OFFICIAL_SYLLABUS",
    createdAt: "2026-02-20T10:00:00Z",
    completedLearnerIds: ["learner-001", "learner-003"],
    learnerProgress: {
      "learner-001": {
        learnerId: "learner-001",
        learnerName: "Amina Yusuf",
        status: "completed",
        openedAt: "2026-02-20T11:15:00Z",
        startedAt: "2026-02-20T11:20:00Z",
        completedAt: "2026-02-20T11:48:00Z",
        scorePercentage: 90,
        attemptsCount: 5,
        hintsRequestedCount: 1,
        retrievalIndependenceRate: 88,
        preAssignmentMastery: 75,
        postAssignmentMastery: 84,
        identifiedMisconceptions: ["Sign flip in x = (-b ± √Δ)/2a"],
        effectivenessVerdict: "improvement_observed"
      },
      "learner-002": {
        learnerId: "learner-002",
        learnerName: "Chidi Eze",
        status: "in_progress",
        openedAt: "2026-02-21T14:10:00Z",
        startedAt: "2026-02-21T14:15:00Z",
        scorePercentage: 40,
        attemptsCount: 3,
        hintsRequestedCount: 4,
        retrievalIndependenceRate: 45,
        preAssignmentMastery: 50,
        postAssignmentMastery: 54,
        identifiedMisconceptions: ["Transposition sign inversion", "Denominator cancellation trap"],
        effectivenessVerdict: "remediation_remains_unresolved"
      },
      "learner-003": {
        learnerId: "learner-003",
        learnerName: "Fatima Bello",
        status: "completed",
        openedAt: "2026-02-20T16:00:00Z",
        startedAt: "2026-02-20T16:05:00Z",
        completedAt: "2026-02-20T16:22:00Z",
        scorePercentage: 100,
        attemptsCount: 5,
        hintsRequestedCount: 0,
        retrievalIndependenceRate: 95,
        preAssignmentMastery: 88,
        postAssignmentMastery: 94,
        identifiedMisconceptions: [],
        effectivenessVerdict: "mastery_evidence_strengthened"
      },
      "learner-004": {
        learnerId: "learner-004",
        learnerName: "Emeka Okafor",
        status: "assigned",
        attemptsCount: 0,
        hintsRequestedCount: 0,
        retrievalIndependenceRate: 65,
        preAssignmentMastery: 68,
        identifiedMisconceptions: [],
        effectivenessVerdict: "insufficient_evidence"
      },
      "learner-005": {
        learnerId: "learner-005",
        learnerName: "Zainab Aliyu",
        status: "started",
        openedAt: "2026-02-22T09:10:00Z",
        startedAt: "2026-02-22T09:12:00Z",
        attemptsCount: 1,
        hintsRequestedCount: 2,
        retrievalIndependenceRate: 52,
        preAssignmentMastery: 58,
        identifiedMisconceptions: ["Sign flip in x = (-b ± √Δ)/2a"],
        effectivenessVerdict: "insufficient_evidence"
      }
    },
    differentiationConfig: {
      adaptiveDifficulty: true,
      prerequisiteWarmupEnabled: true,
      hintScaffoldingIntensity: "standard"
    }
  },
  {
    id: "asg-002",
    teacherId: "user-teacher-001",
    classroomId: "cls-ss2-sci-a",
    title: "Remedial Scaffolding: Linear Equation Transposition",
    description: "Targeted prerequisite drill to eliminate negative sign flip errors during transposition.",
    unitId: "unit-mth-ss1-01",
    skillId: "skill-lin-01",
    assignmentType: "guided_remediation",
    targetLearnerIds: ["learner-002", "learner-004"],
    dueDate: "2026-09-02",
    status: "active",
    provenance: "PLATFORM_CONTENT",
    createdAt: "2026-02-22T12:00:00Z",
    completedLearnerIds: [],
    learnerProgress: {
      "learner-002": {
        learnerId: "learner-002",
        learnerName: "Chidi Eze",
        status: "assigned",
        attemptsCount: 0,
        hintsRequestedCount: 0,
        retrievalIndependenceRate: 45,
        preAssignmentMastery: 54,
        identifiedMisconceptions: ["Negative integer arithmetic"],
        effectivenessVerdict: "insufficient_evidence"
      },
      "learner-004": {
        learnerId: "learner-004",
        learnerName: "Emeka Okafor",
        status: "assigned",
        attemptsCount: 0,
        hintsRequestedCount: 0,
        retrievalIndependenceRate: 65,
        preAssignmentMastery: 68,
        identifiedMisconceptions: ["LCM finding in polynomials"],
        effectivenessVerdict: "insufficient_evidence"
      }
    },
    differentiationConfig: {
      adaptiveDifficulty: true,
      prerequisiteWarmupEnabled: true,
      hintScaffoldingIntensity: "high"
    }
  },
  {
    id: "asg-003",
    teacherId: "user-teacher-001",
    classroomId: "cls-ss2-sci-a",
    title: "WAEC CBT Mock Simulation Drill #1",
    description: "Timed 20-question comprehensive computer-based examination mock under strict conditions.",
    unitId: "unit-mth-ss1-03",
    skillId: "skill-quad-02",
    assignmentType: "exam_prep",
    targetLearnerIds: [],
    dueDate: "2026-09-12",
    status: "active",
    provenance: "OFFICIAL_SYLLABUS",
    createdAt: "2026-02-24T15:00:00Z",
    completedLearnerIds: ["learner-001", "learner-005"],
    learnerProgress: {
      "learner-001": {
        learnerId: "learner-001",
        learnerName: "Amina Yusuf",
        status: "completed",
        completedAt: "2026-02-24T16:30:00Z",
        scorePercentage: 85,
        attemptsCount: 20,
        hintsRequestedCount: 0,
        retrievalIndependenceRate: 90,
        preAssignmentMastery: 80,
        postAssignmentMastery: 84,
        identifiedMisconceptions: [],
        effectivenessVerdict: "performance_increased"
      },
      "learner-005": {
        learnerId: "learner-005",
        learnerName: "Zainab Aliyu",
        status: "completed",
        completedAt: "2026-02-25T11:00:00Z",
        scorePercentage: 65,
        attemptsCount: 20,
        hintsRequestedCount: 2,
        retrievalIndependenceRate: 58,
        preAssignmentMastery: 58,
        postAssignmentMastery: 62,
        identifiedMisconceptions: ["Sign flip in x = (-b ± √Δ)/2a"],
        effectivenessVerdict: "improvement_observed"
      }
    }
  }
];

export const SEEDED_ROSTER: ClassroomRosterStudent[] = [
  {
    learnerId: "learner-001",
    name: "Amina Yusuf",
    email: "amina.yusuf@school.edu.ng",
    joinedAt: "2026-01-12",
    masteryScore: 84,
    attemptsCount: 46,
    lastActiveAt: "Today, 10:15 AM",
    strugglingSkills: [],
    prerequisiteBlockers: [],
    recurringMisconceptions: ["Sign flip in x = (-b ± √Δ)/2a"],
    retrievalIndependenceRate: 88,
    examReadinessScore: 85,
    pendingAssignmentsCount: 1
  },
  {
    learnerId: "learner-002",
    name: "Chidi Eze",
    email: "chidi.eze@school.edu.ng",
    joinedAt: "2026-01-14",
    masteryScore: 54,
    attemptsCount: 22,
    lastActiveAt: "Yesterday, 3:40 PM",
    strugglingSkills: ["Quadratic Roots & Signs", "Linear Factorisation"],
    prerequisiteBlockers: ["Negative integer arithmetic"],
    recurringMisconceptions: ["Transposition sign inversion", "Denominator cancellation trap"],
    retrievalIndependenceRate: 45,
    examReadinessScore: 48,
    pendingAssignmentsCount: 2
  },
  {
    learnerId: "learner-003",
    name: "Fatima Bello",
    email: "fatima.bello@school.edu.ng",
    joinedAt: "2026-01-12",
    masteryScore: 94,
    attemptsCount: 68,
    lastActiveAt: "Today, 08:30 AM",
    strugglingSkills: [],
    prerequisiteBlockers: [],
    recurringMisconceptions: [],
    retrievalIndependenceRate: 95,
    examReadinessScore: 94,
    pendingAssignmentsCount: 0
  },
  {
    learnerId: "learner-004",
    name: "Emeka Okafor",
    email: "emeka.okafor@school.edu.ng",
    joinedAt: "2026-01-16",
    masteryScore: 68,
    attemptsCount: 31,
    lastActiveAt: "2 days ago",
    strugglingSkills: ["Linear Algebraic Fractions"],
    prerequisiteBlockers: ["LCM finding in polynomials"],
    recurringMisconceptions: ["Canceling terms across plus signs"],
    retrievalIndependenceRate: 65,
    examReadinessScore: 66,
    pendingAssignmentsCount: 1
  },
  {
    learnerId: "learner-005",
    name: "Zainab Aliyu",
    email: "zainab.aliyu@school.edu.ng",
    joinedAt: "2026-01-18",
    masteryScore: 62,
    attemptsCount: 29,
    lastActiveAt: "3 days ago",
    strugglingSkills: ["Circle Theorems: Tangents"],
    prerequisiteBlockers: ["Angle sum on straight line"],
    recurringMisconceptions: ["Sign flip in x = (-b ± √Δ)/2a", "Confusing tangent angle with chord angle"],
    retrievalIndependenceRate: 52,
    examReadinessScore: 58,
    pendingAssignmentsCount: 1
  }
];

export const SEEDED_INTERVENTIONS: TeacherInterventionRecommendation[] = [
  {
    id: "rec-001",
    classroomId: "cls-ss2-sci-a",
    type: "REMEDIATE_PREREQUISITE",
    priority: "high",
    status: "recommended",
    targetSkillId: "skill-lin-01",
    targetSkillTitle: "Linear Algebraic Fraction Simplification",
    affectedLearnerIds: ["learner-002", "learner-004"],
    affectedLearnerNames: ["Chidi Eze", "Emeka Okafor"],
    evidenceRationale: "2 learners are currently blocked by prerequisite LCM polynomial finding before Quadratic roots.",
    evidenceType: "prerequisite_blocker",
    evidenceData: {
      blockerSkillId: "skill-lin-01",
      blockerSkillTitle: "Linear Algebraic Fraction Simplification",
      averageIndependence: 55
    },
    recommendedActionTitle: "Assign Socratic Step-by-Step Fraction Scaffold",
    suggestedResourceType: "practice",
    suggestedResourceRef: "unit-mth-ss1-01"
  },
  {
    id: "rec-002",
    classroomId: "cls-ss2-sci-a",
    type: "ADDRESS_MISCONCEPTION",
    priority: "high",
    status: "recommended",
    targetSkillId: "skill-quad-02",
    targetSkillTitle: "Quadratic Formula & Root Nature (Discriminant Δ)",
    affectedLearnerIds: ["learner-001", "learner-002", "learner-005"],
    affectedLearnerNames: ["Amina Yusuf", "Chidi Eze", "Zainab Aliyu"],
    evidenceRationale: "3 learners repeatedly triggered sign inversion errors in discriminant computation.",
    evidenceType: "recurring_misconception",
    evidenceData: {
      misconceptionPattern: "Sign flip in x = (-b ± √Δ)/2a",
      averageIndependence: 61
    },
    recommendedActionTitle: "Launch Formula Codex & Interactive Discriminant Slider",
    suggestedResourceType: "formula_codex",
    suggestedResourceRef: "Quadratic Formula"
  },
  {
    id: "rec-003",
    classroomId: "cls-ss2-sci-a",
    type: "SCHEDULE_REVISION",
    priority: "medium",
    status: "recommended",
    targetSkillId: "skill-geom-01",
    targetSkillTitle: "Circle Theorems: Tangents and Cyclic Quadrilaterals",
    affectedLearnerIds: ["learner-003", "learner-005"],
    affectedLearnerNames: ["Fatima Bello", "Zainab Aliyu"],
    evidenceRationale: "High retention decay index: Last practiced > 14 days ago.",
    evidenceType: "retention_decay",
    evidenceData: {
      decayIntervalDays: 16,
      averageIndependence: 73
    },
    recommendedActionTitle: "Schedule 10-minute Retrieval Practice Drill",
    suggestedResourceType: "practice",
    suggestedResourceRef: "unit-mth-ss1-02"
  }
];

export const SEEDED_LESSON_PLANS: TeacherLessonPlan[] = [
  {
    id: "lp-001",
    teacherId: "user-teacher-001",
    title: "Mastering the Quadratic Formula: Derivation & Nature of Roots",
    subjectId: "subj-mth-senior",
    unitId: "unit-mth-ss1-03",
    skillId: "skill-quad-02",
    targetLevel: "senior_secondary",
    durationMinutes: 45,
    learningObjectives: [
      "Derive the general quadratic formula from ax² + bx + c = 0 via completing the square.",
      "Calculate the discriminant Δ = b² - 4ac accurately.",
      "Predict the nature and count of real roots from the sign of Δ."
    ],
    prerequisites: [
      "Expansion of algebraic brackets",
      "Factorisation of monic trinomials",
      "Square root operations"
    ],
    materialsAndTools: [
      "Scientific calculators",
      "Whiteboard and coordinate axes grid",
      "Tutor Moos QR Handout Card #04"
    ],
    phases: [
      {
        phaseName: "Hook & Warmup",
        durationMinutes: 7,
        teacherGuidance: "Display a non-factorisable quadratic equation (e.g. 2x² + 7x + 1 = 0) and challenge students to find integer factors.",
        studentActivity: "Attempt standard inspection factorisation and observe why factoring fails.",
        keyQuestionsToAsk: ["Why does standard factoring fail here?", "What tool can solve ANY quadratic equation?"],
        commonStumblingBlocks: ["Assuming non-factorable equations have no real solutions."]
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
  totalEnrolled: 6,
  averageMasteryScore: 72.4,
  topStrengths: ["Linear Algebra", "Circle Theorems", "Kinematic Equations"],
  priorityInterventionsCount: 3,
  activeLearnersCount: 6,
  recentExamAverage: 75.2,
  assignmentCompletionRate: 67,
  retrievalIndependenceAverage: 72,
  commonMisconceptions: [
    { trigger: "Sign flip in x = (-b ± √Δ)/2a", note: "Failure to distribute negative multiplier across negative b parameter", count: 3 },
    { trigger: "Transposition sign inversion", note: "Changing operation without reversing algebraic sign", count: 2 },
    { trigger: "Canceling terms across plus signs", note: "Illegal cross-cancellation in rational fractions", count: 1 }
  ]
};

const TEACHER_STORAGE_KEY = "moos_teacher_studio_v2";

export class TeacherStudioService {
  private classrooms: TeacherClassroom[] = SEEDED_CLASSROOMS;
  private assignments: ClassroomAssignment[] = SEEDED_ASSIGNMENTS.map((a) => TeacherStudioService.normalizeAssignment(a));
  private roster: ClassroomRosterStudent[] = SEEDED_ROSTER;
  private lessonPlans: TeacherLessonPlan[] = SEEDED_LESSON_PLANS;
  private interventions: LearnerInterventionPlan[] = SEEDED_INTERVENTION_PLANS;
  private teacherInterventions: TeacherInterventionRecommendation[] = SEEDED_INTERVENTIONS;
  private classAnalytics: ClassAnalyticsSnapshot = SEEDED_CLASS_ANALYTICS;

  public static normalizeAssignment(asg: any): ClassroomAssignment {
    if (!asg || typeof asg !== "object") {
      return {
        id: `asg-fallback-${Date.now()}`,
        teacherId: "user-teacher-001",
        classroomId: "cls-ss2-sci-a",
        title: "Untitled Assignment",
        description: "Complete recommended problems.",
        unitId: "unit-mth-ss1-03",
        skillId: "skill-quad-02",
        assignmentType: "practice",
        targetLearnerIds: [],
        dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
        status: "active",
        provenance: "OFFICIAL_SYLLABUS",
        createdAt: new Date().toISOString(),
        completedLearnerIds: [],
        learnerProgress: {},
        differentiationConfig: {
          adaptiveDifficulty: true,
          prerequisiteWarmupEnabled: true,
          hintScaffoldingIntensity: "standard"
        }
      };
    }

    return {
      ...asg,
      id: asg.id || `asg-${Date.now()}`,
      teacherId: asg.teacherId || "user-teacher-001",
      classroomId: asg.classroomId || "cls-ss2-sci-a",
      title: asg.title || "Untitled Assignment",
      description: asg.description || "Complete recommended problems.",
      unitId: asg.unitId || "unit-mth-ss1-03",
      skillId: asg.skillId || "skill-quad-02",
      assignmentType: asg.assignmentType || "practice",
      targetLearnerIds: Array.isArray(asg.targetLearnerIds) ? asg.targetLearnerIds : [],
      completedLearnerIds: Array.isArray(asg.completedLearnerIds) ? asg.completedLearnerIds : [],
      learnerProgress: asg.learnerProgress && typeof asg.learnerProgress === "object" ? asg.learnerProgress : {},
      status: asg.status || "active",
      provenance: asg.provenance || "OFFICIAL_SYLLABUS",
      dueDate: asg.dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      createdAt: asg.createdAt || new Date().toISOString(),
      differentiationConfig: asg.differentiationConfig || {
        adaptiveDifficulty: true,
        prerequisiteWarmupEnabled: true,
        hintScaffoldingIntensity: "standard"
      }
    };
  }

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      if (typeof window === "undefined" || typeof localStorage === "undefined") return;
      const data = localStorage.getItem(TEACHER_STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed.classrooms) && parsed.classrooms.length > 0) this.classrooms = parsed.classrooms;
        if (Array.isArray(parsed.assignments) && parsed.assignments.length > 0) {
          this.assignments = parsed.assignments.map((asg: any) => TeacherStudioService.normalizeAssignment(asg));
        }
        if (Array.isArray(parsed.lessonPlans) && parsed.lessonPlans.length > 0) this.lessonPlans = parsed.lessonPlans;
        if (Array.isArray(parsed.interventions) && parsed.interventions.length > 0) this.interventions = parsed.interventions;
        if (Array.isArray(parsed.teacherInterventions) && parsed.teacherInterventions.length > 0) {
          this.teacherInterventions = parsed.teacherInterventions.map((rec: any) => ({
            ...rec,
            status: rec.status || "recommended",
            evidenceType: rec.evidenceType || "diagnostic_gap"
          }));
        }
      }
    } catch (e) {
      console.warn("Could not load teacher studio local storage state:", e);
    }
  }

  private saveToStorage() {
    try {
      if (typeof window === "undefined" || typeof localStorage === "undefined") return;
      localStorage.setItem(
        TEACHER_STORAGE_KEY,
        JSON.stringify({
          classrooms: this.classrooms,
          assignments: this.assignments,
          lessonPlans: this.lessonPlans,
          interventions: this.interventions,
          teacherInterventions: this.teacherInterventions
        })
      );
    } catch (e) {
      console.warn("Could not save teacher studio local storage state:", e);
    }
  }

  // --- Classrooms ---
  public getClassrooms(): TeacherClassroom[] {
    return this.classrooms;
  }

  public getClassroomById(id: string): TeacherClassroom | undefined {
    return this.classrooms.find((c) => c.id === id);
  }

  public createClassroom(
    data: Partial<TeacherClassroom>,
    actor?: UserIdentity | UserSession | InstitutionalUser
  ): TeacherClassroom {
    const session = identityService.getActiveSession();
    const activeActor =
      actor ||
      (session.role === "TEACHER" || session.role === "ADMIN"
        ? session
        : identityService.getIdentityById("usr_tch_babatunde_ojo")) ||
      session;
    const actorId = "userId" in activeActor ? activeActor.userId : activeActor.id;

    // Check authorization
    const authDecision = authorizationService.can(activeActor, "MANAGE_CLASSROOMS", {
      resourceType: "classroom"
    });

    if (!authDecision.granted && activeActor.role !== "TEACHER") {
      throw new Error(`[AUTHORIZATION_DENIED] ${authDecision.reason || "Classroom creation denied"}`);
    }

    const newClass: TeacherClassroom = {
      id: `cls-${Date.now()}`,
      name: data.name || "Untitled Cohort",
      gradeLevel: data.gradeLevel || "senior_secondary",
      subjectId: data.subjectId || "subj-mth-senior",
      standard: data.standard || "WAEC_WASSCE",
      roomCode: `MOOS-${Math.floor(1000 + Math.random() * 9000)}`,
      enrolledLearnerIds: data.enrolledLearnerIds || ["demo-learner-01"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.classrooms.unshift(newClass);
    this.saveToStorage();

    // If created by a teacher, ensure classroom is assigned to teacher identity
    if (activeActor.role === "TEACHER") {
      const teacherIdentity = identityService.getIdentityById(actorId) as any;
      if (teacherIdentity && Array.isArray(teacherIdentity.assignedClassroomIds)) {
        if (!teacherIdentity.assignedClassroomIds.includes(newClass.id)) {
          teacherIdentity.assignedClassroomIds.push(newClass.id);
          identityService.saveIdentity(teacherIdentity);
        }
      }
    }

    auditService.recordEvent({
      eventType: "CLASSROOM_CREATED",
      actorId,
      actorRole: activeActor.role,
      actorDisplayName: activeActor.displayName,
      resourceType: "classroom",
      resourceId: newClass.id,
      classroomId: newClass.id,
      result: "SUCCESS",
      reason: `Classroom cohort '${newClass.name}' created.`
    });

    return newClass;
  }

  // --- Rosters ---
  public getRoster(classroomId: string, activeLearnerProfile?: LearnerProfile): ClassroomRosterStudent[] {
    // If classroom is non-existent, return empty array safely
    if (!this.classrooms.some((c) => c.id === classroomId)) {
      return [];
    }

    const list = [...this.roster];
    if (activeLearnerProfile) {
      const existingIdx = list.findIndex((r) => r.learnerId === activeLearnerProfile.id || r.learnerId === "demo-learner-01");
      const currentMasteryAvg = Object.values(activeLearnerProfile.masteryRecords || {}).length > 0
        ? Math.round(
            Object.values(activeLearnerProfile.masteryRecords).reduce((sum, r) => sum + r.points, 0) /
              Math.max(1, Object.values(activeLearnerProfile.masteryRecords).length)
          )
        : 75;

      const dynamicStudent: ClassroomRosterStudent = {
        learnerId: activeLearnerProfile.id,
        name: activeLearnerProfile.name || "You (Learner Demo)",
        email: activeLearnerProfile.email || "learner@moos.academy",
        joinedAt: "2026-01-10",
        masteryScore: currentMasteryAvg,
        attemptsCount: activeLearnerProfile.questionAttempts?.length || 0,
        lastActiveAt: "Active Now",
        strugglingSkills: Object.entries(activeLearnerProfile.masteryRecords || {})
          .filter(([_, m]) => m.points < 60)
          .map(([id]) => id),
        prerequisiteBlockers: [],
        recurringMisconceptions: [],
        retrievalIndependenceRate: 85,
        examReadinessScore: 80,
        pendingAssignmentsCount: this.assignments.filter(
          (a) => a.classroomId === classroomId && a.status === "active" && !a.completedLearnerIds?.includes(activeLearnerProfile.id)
        ).length
      };

      if (existingIdx >= 0) {
        list[existingIdx] = dynamicStudent;
      } else {
        list.unshift(dynamicStudent);
      }
    }
    return list;
  }

  // --- Assignments ---
  public getAssignments(classroomId?: string): ClassroomAssignment[] {
    if (!classroomId) return this.assignments;
    return this.assignments.filter((a) => a.classroomId === classroomId);
  }

  public getAssignmentById(id: string): ClassroomAssignment | undefined {
    return this.assignments.find((a) => a.id === id);
  }

  public createAssignment(
    data: Partial<ClassroomAssignment>,
    actor?: UserIdentity | UserSession | InstitutionalUser
  ): ClassroomAssignment {
    const session = identityService.getActiveSession();
    const activeActor = actor || (data.teacherId ? identityService.getIdentityById(data.teacherId) : undefined) || (session.role === "TEACHER" || session.role === "ADMIN" ? session : identityService.getIdentityById("usr_tch_babatunde_ojo")) || session;
    const actorId = "userId" in activeActor ? activeActor.userId : activeActor.id;

    // Check authorization
    const authDecision = authorizationService.can(activeActor, "CREATE_ASSIGNMENT", {
      resourceType: "assignment",
      classroomId: data.classroomId,
      teacherId: data.teacherId
    });

    if (!authDecision.granted) {
      throw new Error(`[AUTHORIZATION_DENIED] ${authDecision.reason || "Assignment creation denied"}`);
    }

    const newAssignment: ClassroomAssignment = {
      id: `asg-${Date.now()}`,
      teacherId: data.teacherId || (activeActor.role === "TEACHER" ? actorId : "user-teacher-001"),
      classroomId: data.classroomId || "cls-ss2-sci-a",
      title: data.title || "Untitled Practice Assignment",
      description: data.description || "Complete recommended syllabus problems.",
      unitId: data.unitId || "unit-mth-ss1-03",
      skillId: data.skillId || "skill-quad-02",
      assignmentType: data.assignmentType || "practice",
      targetLearnerIds: data.targetLearnerIds || [],
      dueDate: data.dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      status: data.status || "active",
      provenance: data.provenance || "OFFICIAL_SYLLABUS",
      createdAt: new Date().toISOString(),
      completedLearnerIds: [],
      learnerProgress: data.learnerProgress || {},
      differentiationConfig: data.differentiationConfig || {
        adaptiveDifficulty: true,
        prerequisiteWarmupEnabled: true,
        hintScaffoldingIntensity: "standard"
      }
    };

    // Initialize learner progress for targeted or enrolled students
    const targetLearners = data.targetLearnerIds && data.targetLearnerIds.length > 0
      ? this.roster.filter((r) => data.targetLearnerIds?.includes(r.learnerId))
      : this.roster;

    targetLearners.forEach((s) => {
      if (!newAssignment.learnerProgress![s.learnerId]) {
        newAssignment.learnerProgress![s.learnerId] = {
          learnerId: s.learnerId,
          learnerName: s.name,
          status: "assigned",
          attemptsCount: 0,
          hintsRequestedCount: 0,
          retrievalIndependenceRate: s.retrievalIndependenceRate,
          preAssignmentMastery: s.masteryScore,
          identifiedMisconceptions: [],
          effectivenessVerdict: "insufficient_evidence"
        };
      }
    });

    this.assignments.unshift(newAssignment);

    // Auto-update linked intervention recommendation if present
    const matchingIntervention = this.teacherInterventions.find(
      (i) => (i.targetSkillId === newAssignment.skillId || i.suggestedResourceRef === newAssignment.unitId) && i.status === "recommended"
    );
    if (matchingIntervention) {
      matchingIntervention.status = "assigned";
      matchingIntervention.reviewedAt = new Date().toISOString();
    }

    this.saveToStorage();

    // Log assignment created / published audit event
    auditService.recordEvent({
      eventType: newAssignment.status === "active" ? "ASSIGNMENT_PUBLISHED" : "ASSIGNMENT_CREATED",
      actorId,
      actorRole: activeActor.role,
      actorDisplayName: activeActor.displayName,
      resourceType: "assignment",
      resourceId: newAssignment.id,
      classroomId: newAssignment.classroomId,
      result: "SUCCESS",
      reason: `Assignment '${newAssignment.title}' (${newAssignment.assignmentType}) created with status '${newAssignment.status}'.`
    });

    return newAssignment;
  }

  public updateAssignmentStatus(
    assignmentId: string,
    status: AssignmentLifecycleStatus,
    actor?: UserIdentity | UserSession | InstitutionalUser
  ): void {
    const session = identityService.getActiveSession();
    const asg = this.assignments.find((a) => a.id === assignmentId);
    const activeActor =
      actor ||
      (session.role === "TEACHER" || session.role === "ADMIN"
        ? session
        : identityService.getIdentityById(asg?.teacherId || "usr_tch_babatunde_ojo")) ||
      session;
    const actorId = "userId" in activeActor ? activeActor.userId : activeActor.id;

    if (asg) {
      const authDecision = authorizationService.can(
        activeActor,
        status === "active" ? "DISPATCH_ASSIGNMENT" : "EDIT_ASSIGNMENT",
        {
          resourceType: "assignment",
          resourceId: assignmentId,
          classroomId: asg.classroomId,
          teacherId: asg.teacherId
        }
      );

      if (!authDecision.granted) {
        throw new Error(`[AUTHORIZATION_DENIED] ${authDecision.reason || "Assignment status update denied"}`);
      }

      asg.status = status;
      this.saveToStorage();

      auditService.recordEvent({
        eventType: status === "active" ? "ASSIGNMENT_DISPATCHED" : "ASSIGNMENT_CREATED",
        actorId,
        actorRole: activeActor.role,
        actorDisplayName: activeActor.displayName,
        resourceType: "assignment",
        resourceId: assignmentId,
        classroomId: asg.classroomId,
        result: "SUCCESS",
        reason: `Assignment '${asg.title}' status updated to '${status}'.`
      });
    }
  }

  public updateLearnerProgress(
    assignmentId: string,
    learnerId: string,
    progressUpdate: Partial<LearnerAssignmentProgress>
  ): void {
    const asg = this.assignments.find((a) => a.id === assignmentId);
    if (!asg) return;

    if (!asg.learnerProgress) asg.learnerProgress = {};

    const student = this.roster.find((r) => r.learnerId === learnerId);
    const existing = asg.learnerProgress[learnerId] || {
      learnerId,
      learnerName: student?.name || "Student",
      status: "assigned",
      attemptsCount: 0,
      hintsRequestedCount: 0,
      retrievalIndependenceRate: 70,
      identifiedMisconceptions: []
    };

    const updated: LearnerAssignmentProgress = {
      ...existing,
      ...progressUpdate
    };

    // Recalculate deterministic completion state and effectiveness verdict
    if (updated.postAssignmentMastery !== undefined && updated.preAssignmentMastery !== undefined) {
      updated.completionState = calculateAssignmentCompletionState({
        preAssignmentMastery: updated.preAssignmentMastery,
        postAssignmentMastery: updated.postAssignmentMastery,
        scorePercentage: updated.scorePercentage,
        attemptsCount: updated.attemptsCount,
        hintsRequestedCount: updated.hintsRequestedCount,
        isCompleted: updated.status === "completed",
        isStarted: updated.status === "started" || updated.status === "in_progress" || updated.attemptsCount > 0,
        dueDate: asg.dueDate
      });

      const delta = updated.postAssignmentMastery - updated.preAssignmentMastery;
      if (updated.status === "completed" && delta >= 5) {
        updated.effectivenessVerdict = "improvement_observed";
      } else if (updated.status === "completed" && updated.postAssignmentMastery >= 90) {
        updated.effectivenessVerdict = "mastery_evidence_strengthened";
      } else if (updated.attemptsCount > 2 && updated.scorePercentage !== undefined && updated.scorePercentage < 50) {
        updated.effectivenessVerdict = "remediation_remains_unresolved";
      } else if (updated.status === "completed") {
        updated.effectivenessVerdict = "performance_increased";
      } else {
        updated.effectivenessVerdict = "insufficient_evidence";
      }
    }

    asg.learnerProgress[learnerId] = updated;

    if (updated.status === "completed" && !asg.completedLearnerIds.includes(learnerId)) {
      asg.completedLearnerIds.push(learnerId);
    }

    this.saveToStorage();
  }

  public completeAssignment(
    assignmentId: string,
    learnerId: string,
    scorePercentage = 85,
    hintsUsed = 0,
    misconceptions: string[] = []
  ): void {
    const asg = this.assignments.find((a) => a.id === assignmentId);
    if (!asg) return;

    if (!asg.completedLearnerIds.includes(learnerId)) {
      asg.completedLearnerIds.push(learnerId);
    }

    const preMastery = asg.learnerProgress?.[learnerId]?.preAssignmentMastery ?? 70;
    const masteryGain = Math.round((scorePercentage / 100) * 15);
    const postMastery = Math.min(100, Math.max(0, preMastery + (scorePercentage >= 60 ? masteryGain : -2)));

    this.updateLearnerProgress(assignmentId, learnerId, {
      status: "completed",
      completedAt: new Date().toISOString(),
      scorePercentage,
      attemptsCount: (asg.learnerProgress?.[learnerId]?.attemptsCount || 0) + 1,
      hintsRequestedCount: hintsUsed,
      retrievalIndependenceRate: Math.max(10, Math.min(100, 100 - hintsUsed * 15)),
      preAssignmentMastery: preMastery,
      postAssignmentMastery: postMastery,
      identifiedMisconceptions: misconceptions
    });

    // Check if entire assignment is completed across target learners
    const targetCount = asg.targetLearnerIds.length > 0 ? asg.targetLearnerIds.length : this.roster.length;
    if (asg.completedLearnerIds.length >= targetCount) {
      asg.status = "completed";
    }

    this.saveToStorage();
  }

  // --- Teacher Interventions & Recommendations ---
  public getTeacherInterventions(classroomId?: string): TeacherInterventionRecommendation[] {
    if (!classroomId) return this.teacherInterventions;
    return this.teacherInterventions.filter((r) => r.classroomId === classroomId);
  }

  public createIntervention(
    data: Partial<TeacherInterventionRecommendation>,
    actor?: UserIdentity | UserSession | InstitutionalUser
  ): TeacherInterventionRecommendation {
    const session = identityService.getActiveSession();
    const activeActor =
      actor ||
      (session.role === "TEACHER" || session.role === "ADMIN"
        ? session
        : identityService.getIdentityById("usr_tch_babatunde_ojo")) ||
      session;
    const actorId = "userId" in activeActor ? activeActor.userId : activeActor.id;

    const authDecision = authorizationService.can(activeActor, "ASSIGN_INTERVENTION", {
      resourceType: "intervention",
      classroomId: data.classroomId
    });

    if (!authDecision.granted) {
      throw new Error(`[AUTHORIZATION_DENIED] ${authDecision.reason || "Intervention creation denied"}`);
    }

    const newIntervention: TeacherInterventionRecommendation = {
      id: data.id || `intv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      classroomId: data.classroomId || "cls-ss2-sci-a",
      type: data.type || "ASSIGN_GUIDED_PRACTICE",
      priority: data.priority || "medium",
      status: data.status || "recommended",
      targetSkillId: data.targetSkillId || "skill-frac-operations",
      targetSkillTitle: data.targetSkillTitle || "Fraction Operations & Reciprocals",
      affectedLearnerIds: data.affectedLearnerIds || ["usr_lrn_chioma_adebayo"],
      affectedLearnerNames: data.affectedLearnerNames || ["Chioma Adebayo"],
      evidenceRationale: data.evidenceRationale || "Targeted prerequisite scaffolding needed.",
      evidenceType: data.evidenceType || "diagnostic_gap",
      recommendedActionTitle: data.recommendedActionTitle || "Assign Socratic Step-by-Step Drill",
      suggestedResourceType: data.suggestedResourceType || "practice"
    };

    this.teacherInterventions.unshift(newIntervention);
    this.saveToStorage();

    auditService.recordEvent({
      eventType: "INTERVENTION_RECOMMENDED",
      actorId,
      actorRole: activeActor.role,
      actorDisplayName: activeActor.displayName,
      resourceType: "intervention",
      resourceId: newIntervention.id,
      classroomId: newIntervention.classroomId,
      result: "SUCCESS",
      reason: `New intervention recommended for ${newIntervention.affectedLearnerNames.join(", ")}.`
    });

    return newIntervention;
  }

  public createInterventionFromAssignmentOutcome(
    assignmentId: string,
    learnerId: string,
    actor?: UserIdentity | UserSession | InstitutionalUser
  ): TeacherInterventionRecommendation {
    const asg = this.assignments.find((a) => a.id === assignmentId);
    if (!asg) {
      throw new Error(`Assignment '${assignmentId}' not found.`);
    }

    const progress = asg.learnerProgress?.[learnerId];
    const student = this.roster.find((r) => r.learnerId === learnerId);
    const learnerName = progress?.learnerName || student?.name || "Student";
    const skill = curriculumService.getSkillById(asg.skillId);
    const skillTitle = skill?.title || asg.title;

    // Prerequisite lookup from canonical curriculum graph
    let targetSkillId = asg.skillId;
    let targetSkillTitle = skillTitle;

    if (skill?.prerequisiteSkillIds && skill.prerequisiteSkillIds.length > 0) {
      const prereq = curriculumService.getSkillById(skill.prerequisiteSkillIds[0]);
      if (prereq) {
        targetSkillId = prereq.id;
        targetSkillTitle = prereq.title;
      }
    }

    // Determine priority based on retrieval independence and performance
    const retrievalRate = progress?.retrievalIndependenceRate ?? 70;
    const scorePct = progress?.scorePercentage ?? 0;
    let priority: "high" | "medium" | "low" = "medium";
    if (retrievalRate < 50 || scorePct < 50) {
      priority = "high";
    } else if (retrievalRate < 70 || scorePct < 70) {
      priority = "medium";
    } else {
      priority = "low";
    }

    const misconceptions = progress?.identifiedMisconceptions && progress.identifiedMisconceptions.length > 0
      ? `Identified misconceptions: ${progress.identifiedMisconceptions.join("; ")}.`
      : "Low retrieval independence detected during assignment execution.";

    const rationale = `Outcome from '${asg.title}': Retrieval independence is ${retrievalRate}%, score is ${scorePct}%. ${misconceptions}`;

    return this.createIntervention(
      {
        classroomId: asg.classroomId,
        type: "ASSIGN_GUIDED_PRACTICE",
        priority,
        status: "recommended",
        targetSkillId,
        targetSkillTitle,
        affectedLearnerIds: [learnerId],
        affectedLearnerNames: [learnerName],
        evidenceRationale: rationale,
        evidenceType: "diagnostic_gap",
        recommendedActionTitle: `Remediation Drill: ${targetSkillTitle}`,
        suggestedResourceType: "practice"
      },
      actor
    );
  }

  public updateInterventionStatus(
    interventionId: string,
    status: TeacherInterventionStatus,
    actor?: UserIdentity | UserSession | InstitutionalUser
  ): void {
    const session = identityService.getActiveSession();
    const activeActor =
      actor ||
      (session.role === "TEACHER" || session.role === "ADMIN"
        ? session
        : identityService.getIdentityById("usr_tch_babatunde_ojo")) ||
      session;
    const actorId = "userId" in activeActor ? activeActor.userId : activeActor.id;

    const intervention = this.teacherInterventions.find((i) => i.id === interventionId);
    if (intervention) {
      const requiredPermission =
        status === "assigned"
          ? "ASSIGN_INTERVENTION"
          : status === "reviewed" || status === "rejected" || status === "resolved"
          ? "REVIEW_INTERVENTIONS"
          : "VIEW_INTERVENTIONS";

      const authDecision = authorizationService.can(activeActor, requiredPermission, {
        resourceType: "intervention",
        resourceId: interventionId,
        classroomId: intervention.classroomId
      });

      if (!authDecision.granted) {
        throw new Error(`[AUTHORIZATION_DENIED] ${authDecision.reason || "Intervention update denied"}`);
      }

      intervention.status = status;
      if (status === "reviewed") intervention.reviewedAt = new Date().toISOString();
      if (status === "resolved") intervention.resolvedAt = new Date().toISOString();
      this.saveToStorage();

      auditService.recordEvent({
        eventType:
          status === "assigned"
            ? "INTERVENTION_ACCEPTED"
            : status === "resolved"
            ? "INTERVENTION_RESOLVED"
            : "INTERVENTION_REVIEWED",
        actorId,
        actorRole: activeActor.role,
        actorDisplayName: activeActor.displayName,
        resourceType: "intervention",
        resourceId: interventionId,
        classroomId: intervention.classroomId,
        result: "SUCCESS",
        reason: `Intervention recommendation status updated to '${status}'.`
      });
    }
  }

  // --- Adaptive Grouping Intelligence ---
  public getAdaptiveGroups(classroomId: string, activeLearnerProfile?: LearnerProfile): ClassroomAdaptiveGroup[] {
    const roster = this.getRoster(classroomId, activeLearnerProfile);
    if (roster.length === 0) return [];

    const groups: ClassroomAdaptiveGroup[] = [];

    // 1. Foundational Remediation (< 60% mastery or prerequisite blockers)
    const foundational = roster.filter((r) => r.masteryScore < 60 || r.prerequisiteBlockers.length > 0);
    if (foundational.length > 0) {
      groups.push({
        id: `grp-foundational-${classroomId}`,
        classroomId,
        name: "Foundational Remediation & Prerequisite Repair",
        category: "foundational_remediation",
        learnerIds: foundational.map((l) => l.learnerId),
        learnerNames: foundational.map((l) => l.name),
        rationale: `${foundational.length} of ${roster.length} learners have sub-60% mastery or active prerequisite blockers needing step-by-step scaffolding.`,
        recommendedAction: "Dispatch Socratic step-by-step prerequisite drill with high hint scaffolding.",
        recommendedSkillId: "skill-lin-01",
        recommendedUnitId: "unit-mth-ss1-01",
        recommendedAssignmentType: "guided_remediation"
      });
    }

    // 2. Emerging Mastery (60 - 74%)
    const emerging = roster.filter((r) => r.masteryScore >= 60 && r.masteryScore < 75);
    if (emerging.length > 0) {
      groups.push({
        id: `grp-emerging-${classroomId}`,
        classroomId,
        name: "Emerging Mastery (Core Concept Reinforcement)",
        category: "emerging_mastery",
        learnerIds: emerging.map((l) => l.learnerId),
        learnerNames: emerging.map((l) => l.name),
        rationale: `${emerging.length} learners have a grasp of basic concepts but make occasional algebraic or procedural slips.`,
        recommendedAction: "Assign 5 standard practice problems to consolidate core formula fluency.",
        recommendedSkillId: "skill-quad-02",
        recommendedUnitId: "unit-mth-ss1-03",
        recommendedAssignmentType: "practice"
      });
    }

    // 3. Mastery Consolidation (75 - 84%)
    const consolidation = roster.filter((r) => r.masteryScore >= 75 && r.masteryScore < 85);
    if (consolidation.length > 0) {
      groups.push({
        id: `grp-consolidation-${classroomId}`,
        classroomId,
        name: "Mastery Consolidation (Speed & Fluency)",
        category: "mastery_consolidation",
        learnerIds: consolidation.map((l) => l.learnerId),
        learnerNames: consolidation.map((l) => l.name),
        rationale: `${consolidation.length} learners demonstrate consistent conceptual accuracy and are ready for timed speed drills.`,
        recommendedAction: "Dispatch timed CBT past question simulation to build test pacing.",
        recommendedSkillId: "skill-quad-02",
        recommendedUnitId: "unit-mth-ss1-03",
        recommendedAssignmentType: "exam_prep"
      });
    }

    // 4. High Performers & Olympiad Challenge (>= 85% & high independence)
    const highPerformers = roster.filter((r) => r.masteryScore >= 85 && r.retrievalIndependenceRate >= 80);
    if (highPerformers.length > 0) {
      groups.push({
        id: `grp-challenge-${classroomId}`,
        classroomId,
        name: "High Performers & Olympiad Challenge Cohort",
        category: "challenge_ready",
        learnerIds: highPerformers.map((l) => l.learnerId),
        learnerNames: highPerformers.map((l) => l.name),
        rationale: `${highPerformers.length} learners demonstrate high retrieval independence (>80%) and are ready for multi-step non-routine challenge problems.`,
        recommendedAction: "Assign advanced parametric optimization and non-standard curve proofs.",
        recommendedSkillId: "skill-quad-02",
        recommendedUnitId: "unit-mth-ss1-03",
        recommendedAssignmentType: "challenge"
      });
    }

    // 5. Misconception Cluster: Sign Flip in Quadratic Discriminant
    const signFlipMisconception = roster.filter((r) =>
      r.recurringMisconceptions.some((m) => m.toLowerCase().includes("sign") || m.toLowerCase().includes("discriminant"))
    );
    if (signFlipMisconception.length > 1) {
      groups.push({
        id: `grp-misc-signflip-${classroomId}`,
        classroomId,
        name: "Targeted Cluster: Discriminant Sign Inversion",
        category: "misconception_cluster",
        learnerIds: signFlipMisconception.map((l) => l.learnerId),
        learnerNames: signFlipMisconception.map((l) => l.name),
        rationale: `${signFlipMisconception.length} learners share the identical misconception of inverting the negative sign during parameter substitution.`,
        recommendedAction: "Launch interactive Formula Codex visual derivation and targeted sign contrast exercises.",
        recommendedSkillId: "skill-quad-02",
        recommendedUnitId: "unit-mth-ss1-03",
        recommendedAssignmentType: "guided_remediation"
      });
    }

    // 6. Hint Dependent Group (retrieval independence < 60%)
    const hintDependent = roster.filter((r) => r.retrievalIndependenceRate < 60);
    if (hintDependent.length > 0) {
      groups.push({
        id: `grp-hint-dep-${classroomId}`,
        classroomId,
        name: "Retrieval Independence Recovery (Hint-Dependent)",
        category: "hint_dependent",
        learnerIds: hintDependent.map((l) => l.learnerId),
        learnerNames: hintDependent.map((l) => l.name),
        rationale: `${hintDependent.length} learners rely heavily on hint reveals (>40% hint dependency) and require gradual hint fading drills.`,
        recommendedAction: "Assign independent retrieval practice with delayed hint availability.",
        recommendedSkillId: "skill-lin-01",
        recommendedUnitId: "unit-mth-ss1-01",
        recommendedAssignmentType: "practice"
      });
    }

    // 7. CBT Exam Readiness Focus (exam readiness < 70%)
    const cbtFocus = roster.filter((r) => r.examReadinessScore < 70);
    if (cbtFocus.length > 0) {
      groups.push({
        id: `grp-cbt-prep-${classroomId}`,
        classroomId,
        name: "WAEC/JAMB CBT Exam Prep Intensive",
        category: "cbt_exam_focus",
        learnerIds: cbtFocus.map((l) => l.learnerId),
        learnerNames: cbtFocus.map((l) => l.name),
        rationale: `${cbtFocus.length} learners show exam mock scores under 70% and need timed past question simulations.`,
        recommendedAction: "Assign timed 20-question WAEC past paper CBT simulation with instant feedback.",
        recommendedSkillId: "skill-quad-02",
        recommendedUnitId: "unit-mth-ss1-03",
        recommendedAssignmentType: "exam_prep"
      });
    }

    return groups;
  }

  // --- Prerequisite Bottleneck Intelligence ---
  public getPrerequisiteBottlenecks(classroomId: string, activeLearnerProfile?: LearnerProfile): PrerequisiteBottleneckCluster[] {
    const roster = this.getRoster(classroomId, activeLearnerProfile);
    if (roster.length === 0) return [];

    const bottlenecks: PrerequisiteBottleneckCluster[] = [];

    // Bottleneck 1: Linear Algebraic Fraction Simplification -> Quadratic Roots & Equations
    const affectedFractionLearners = roster.filter(
      (r) =>
        r.strugglingSkills.some((s) => s.toLowerCase().includes("linear") || s.toLowerCase().includes("factor")) ||
        r.prerequisiteBlockers.some((p) => p.toLowerCase().includes("integer") || p.toLowerCase().includes("lcm"))
    );

    if (affectedFractionLearners.length > 0) {
      bottlenecks.push({
        blockerSkillId: "skill-lin-01",
        blockerSkillTitle: "Linear Algebraic Fraction Simplification & Transposition",
        dependentSkillId: "skill-quad-02",
        dependentSkillTitle: "Quadratic Formula & Root Nature (Discriminant Δ)",
        affectedLearnerCount: affectedFractionLearners.length,
        affectedLearnerIds: affectedFractionLearners.map((l) => l.learnerId),
        affectedLearnerNames: affectedFractionLearners.map((l) => l.name),
        severity: affectedFractionLearners.length >= 2 ? "critical" : "moderate",
        suggestedRemediationUnitId: "unit-mth-ss1-01"
      });
    }

    // Bottleneck 2: Fundamental Angle Properties -> Circle Theorems
    const affectedGeomLearners = roster.filter(
      (r) =>
        r.strugglingSkills.some((s) => s.toLowerCase().includes("circle") || s.toLowerCase().includes("tangent")) ||
        r.prerequisiteBlockers.some((p) => p.toLowerCase().includes("angle"))
    );

    if (affectedGeomLearners.length > 0) {
      bottlenecks.push({
        blockerSkillId: "skill-geom-01",
        blockerSkillTitle: "Fundamental Angle Properties & Intersecting Lines",
        dependentSkillId: "skill-geom-02",
        dependentSkillTitle: "Circle Theorems: Tangents and Cyclic Quadrilaterals",
        affectedLearnerCount: affectedGeomLearners.length,
        affectedLearnerIds: affectedGeomLearners.map((l) => l.learnerId),
        affectedLearnerNames: affectedGeomLearners.map((l) => l.name),
        severity: affectedGeomLearners.length >= 2 ? "critical" : "moderate",
        suggestedRemediationUnitId: "unit-mth-ss1-02"
      });
    }

    return bottlenecks;
  }

  // --- Classroom Misconception Intelligence ---
  public getMisconceptionClusters(classroomId: string, activeLearnerProfile?: LearnerProfile): MisconceptionCluster[] {
    const roster = this.getRoster(classroomId, activeLearnerProfile);
    if (roster.length === 0) return [];

    const clusters: MisconceptionCluster[] = [];

    // Cluster 1: Sign flip in x = (-b ± √Δ)/2a
    const signFlipLearners = roster.filter((r) =>
      r.recurringMisconceptions.some((m) => m.toLowerCase().includes("sign flip") || m.toLowerCase().includes("discriminant"))
    );
    if (signFlipLearners.length > 0) {
      clusters.push({
        misconceptionId: "misc-quad-sign-flip",
        trigger: "Sign flip in x = (-b ± √Δ)/2a",
        note: "Learner forgets to invert negative sign when substituting negative b values into the general quadratic formula.",
        affectedSkillId: "skill-quad-02",
        affectedSkillTitle: "Quadratic Formula & Discriminant Analysis",
        affectedLearnerCount: signFlipLearners.length,
        affectedLearnerIds: signFlipLearners.map((l) => l.learnerId),
        affectedLearnerNames: signFlipLearners.map((l) => l.name),
        sampleDistractorExplanation: "Option B selects (-5) instead of +5 when b = -5, leading to inverted vertex roots.",
        recommendedRemediationAction: "Open Formula Codex interactive discriminant parameterizer to highlight sign substitution."
      });
    }

    // Cluster 2: Transposition sign inversion
    const transpositionLearners = roster.filter((r) =>
      r.recurringMisconceptions.some((m) => m.toLowerCase().includes("transposition"))
    );
    if (transpositionLearners.length > 0) {
      clusters.push({
        misconceptionId: "misc-lin-transposition",
        trigger: "Transposition sign inversion",
        note: "Moving variable terms across the equals sign without reversing the operator (+ to -).",
        affectedSkillId: "skill-lin-01",
        affectedSkillTitle: "Linear Algebraic Equations",
        affectedLearnerCount: transpositionLearners.length,
        affectedLearnerIds: transpositionLearners.map((l) => l.learnerId),
        affectedLearnerNames: transpositionLearners.map((l) => l.name),
        sampleDistractorExplanation: "Option C assumes 3x - 4 = 10 becomes 3x = 10 - 4 rather than 10 + 4.",
        recommendedRemediationAction: "Assign Socratic balance-scale drill emphasizing equal operations on both sides."
      });
    }

    // Cluster 3: Canceling terms across plus signs
    const cancelLearners = roster.filter((r) =>
      r.recurringMisconceptions.some((m) => m.toLowerCase().includes("canceling") || m.toLowerCase().includes("cancellation"))
    );
    if (cancelLearners.length > 0) {
      clusters.push({
        misconceptionId: "misc-frac-cancel",
        trigger: "Canceling terms across plus signs in fractions",
        note: "Attempting to cancel individual addends across numerator and denominator instead of common factors.",
        affectedSkillId: "skill-lin-01",
        affectedSkillTitle: "Algebraic Fractions",
        affectedLearnerCount: cancelLearners.length,
        affectedLearnerIds: cancelLearners.map((l) => l.learnerId),
        affectedLearnerNames: cancelLearners.map((l) => l.name),
        sampleDistractorExplanation: "Assuming (x + 2)/2 simplifies to x + 1 by crossing out 2s.",
        recommendedRemediationAction: "Assign factoring-first fraction drills."
      });
    }

    return clusters;
  }

  // --- Classroom Next Best Action Intelligence with Priority Scoring & Deduplication ---
  public getNextBestActions(classroomId: string, activeLearnerProfile?: LearnerProfile): ClassroomNextBestAction[] {
    const roster = this.getRoster(classroomId, activeLearnerProfile);
    if (roster.length === 0) return [];

    const bottlenecks = this.getPrerequisiteBottlenecks(classroomId, activeLearnerProfile);
    const misconceptions = this.getMisconceptionClusters(classroomId, activeLearnerProfile);
    const activeAssignments = this.getAssignments(classroomId).filter((a) => a.status === "active");
    const actions: ClassroomNextBestAction[] = [];

    // Track learners assigned to root prerequisite remediation to deduplicate downstream symptoms
    const prerequisiteRemediatedLearners = new Set<string>();

    // Priority 1: Address top prerequisite bottleneck (Root Cause Principle)
    if (bottlenecks.length > 0) {
      const top = bottlenecks[0];
      const hasActiveAsg = activeAssignments.some(
        (a) => a.skillId === top.blockerSkillId || a.unitId === top.suggestedRemediationUnitId
      );

      // Score: 92 base + fraction multiplier (up to 8)
      const fraction = top.affectedLearnerCount / Math.max(1, roster.length);
      const score = Math.round(92 + fraction * 8);

      actions.push({
        id: "nba-bottleneck-01",
        classroomId,
        priorityScore: hasActiveAsg ? Math.max(90, score - 2) : score,
        category: "prerequisite_bottleneck",
        title: `Repair Prerequisite Bottleneck: ${top.blockerSkillTitle}`,
        rationale: `${top.affectedLearnerCount} learners (${top.affectedLearnerNames.join(", ")}) are blocked by foundational arithmetic, preventing progress in ${top.dependentSkillTitle}.`,
        targetAudience: "group",
        targetIds: top.affectedLearnerIds,
        targetNames: top.affectedLearnerNames,
        suggestedAction: "Assign 5-step guided remediation drill on algebraic fraction simplification.",
        suggestedSkillId: top.blockerSkillId,
        suggestedUnitId: top.suggestedRemediationUnitId,
        assignmentType: "guided_remediation"
      });

      top.affectedLearnerIds.forEach((id) => prerequisiteRemediatedLearners.add(id));
    }

    // Priority 2: Clear critical misconception cluster
    if (misconceptions.length > 0) {
      const topMisc = misconceptions[0];
      // Filter out learners already prioritized in prerequisite bottleneck to deduplicate
      const uniqueAffectedIds = topMisc.affectedLearnerIds.filter((id) => !prerequisiteRemediatedLearners.has(id));
      const targetIdsToUse = uniqueAffectedIds.length > 0 ? uniqueAffectedIds : topMisc.affectedLearnerIds;
      const targetNamesToUse = roster.filter((r) => targetIdsToUse.includes(r.learnerId)).map((r) => r.name);

      const hasActiveAsg = activeAssignments.some((a) => a.skillId === topMisc.affectedSkillId);
      const fraction = targetIdsToUse.length / Math.max(1, roster.length);
      const score = Math.round(84 + fraction * 8);

      actions.push({
        id: "nba-misc-01",
        classroomId,
        priorityScore: hasActiveAsg ? Math.max(45, score - 20) : score,
        category: "critical_misconception",
        title: `Targeted Intervention: ${topMisc.trigger}`,
        rationale: `${targetIdsToUse.length} learners consistently trigger sign inversion in quadratic derivations.`,
        targetAudience: "group",
        targetIds: targetIdsToUse,
        targetNames: targetNamesToUse,
        suggestedAction: "Launch interactive Formula Codex drill with parameter sign checks.",
        suggestedSkillId: topMisc.affectedSkillId,
        suggestedUnitId: "unit-mth-ss1-03",
        assignmentType: "practice"
      });
    }

    // Priority 3: High performer challenge opportunity
    const challengeCandidates = roster.filter((r) => r.masteryScore >= 88 && r.retrievalIndependenceRate >= 80);
    if (challengeCandidates.length > 0) {
      const score = Math.round(76 + Math.min(10, challengeCandidates.length * 2));
      actions.push({
        id: "nba-challenge-01",
        classroomId,
        priorityScore: score,
        category: "challenge_escalation",
        title: "Escalate Challenge for Mastery Cohort",
        rationale: `${challengeCandidates.length} learners (${challengeCandidates.map((c) => c.name).join(", ")}) have achieved >=88% mastery and high retrieval independence.`,
        targetAudience: "group",
        targetIds: challengeCandidates.map((c) => c.learnerId),
        targetNames: challengeCandidates.map((c) => c.name),
        suggestedAction: "Assign non-standard Olympiad-style quadratic optimization problems.",
        suggestedSkillId: "skill-quad-02",
        suggestedUnitId: "unit-mth-ss1-03",
        assignmentType: "challenge"
      });
    }

    // Priority 4: Spaced review retention refresher
    const retentionDecayCandidates = roster.filter((r) => r.lastActiveAt.includes("days ago") || r.lastActiveAt.includes("Yesterday"));
    if (retentionDecayCandidates.length > 0) {
      const score = Math.round(70 + Math.min(10, retentionDecayCandidates.length * 2));
      actions.push({
        id: "nba-retention-01",
        classroomId,
        priorityScore: score,
        category: "retention_review",
        title: "Schedule Spaced Review Retention Drill",
        rationale: `${retentionDecayCandidates.length} learners have inactive retention decay intervals requiring refresher practice.`,
        targetAudience: "group",
        targetIds: retentionDecayCandidates.map((c) => c.learnerId),
        targetNames: retentionDecayCandidates.map((c) => c.name),
        suggestedAction: "Dispatch a 10-minute retrieval practice warmup covering Circle Theorems.",
        suggestedSkillId: "skill-geom-01",
        suggestedUnitId: "unit-mth-ss1-02",
        assignmentType: "practice"
      });
    }

    return actions.sort((a, b) => b.priorityScore - a.priorityScore);
  }

  // --- Lesson Plans & Basic Interventions ---
  public getLessonPlans(): TeacherLessonPlan[] {
    return this.lessonPlans;
  }

  public getLessonPlanById(id: string): TeacherLessonPlan | undefined {
    return this.lessonPlans.find((lp) => lp.id === id);
  }

  public getInterventions(): LearnerInterventionPlan[] {
    return this.interventions;
  }

  public getClassAnalytics(classroomId?: string, activeLearnerProfile?: LearnerProfile): ClassAnalyticsSnapshot {
    const roster = this.getRoster(classroomId || "cls-ss2-sci-a", activeLearnerProfile);
    const avgMastery = roster.length > 0
      ? Math.round((roster.reduce((sum, r) => sum + r.masteryScore, 0) / roster.length) * 10) / 10
      : 75;
    const avgIndependence = roster.length > 0
      ? Math.round(roster.reduce((sum, r) => sum + r.retrievalIndependenceRate, 0) / roster.length)
      : 72;
    const avgExam = roster.length > 0
      ? Math.round((roster.reduce((sum, r) => sum + r.examReadinessScore, 0) / roster.length) * 10) / 10
      : 75;

    const classAssignments = this.getAssignments(classroomId);
    const totalAssignments = classAssignments.length;
    const completedAssignments = classAssignments.filter((a) => a.status === "completed").length;
    const completionRate = totalAssignments > 0 ? Math.round((completedAssignments / totalAssignments) * 100) : 67;

    return {
      ...this.classAnalytics,
      totalEnrolled: roster.length,
      activeLearnersCount: roster.length,
      averageMasteryScore: avgMastery,
      retrievalIndependenceAverage: avgIndependence,
      recentExamAverage: avgExam,
      assignmentCompletionRate: completionRate,
      priorityInterventionsCount: this.teacherInterventions.filter((i) => i.status === "recommended").length
    };
  }

  public createLessonPlan(
    plan: Partial<TeacherLessonPlan>,
    actor?: UserIdentity | UserSession | InstitutionalUser
  ): TeacherLessonPlan {
    const session = identityService.getActiveSession();
    const activeActor =
      actor ||
      (plan.teacherId ? identityService.getIdentityById(plan.teacherId) : undefined) ||
      (session.role === "TEACHER" || session.role === "ADMIN"
        ? session
        : identityService.getIdentityById("usr_tch_babatunde_ojo")) ||
      session;
    const actorId = "userId" in activeActor ? activeActor.userId : activeActor.id;

    const authDecision = authorizationService.can(activeActor, "CREATE_LESSON_PLAN", {
      resourceType: "curriculum"
    });

    if (!authDecision.granted) {
      throw new Error(`[AUTHORIZATION_DENIED] ${authDecision.reason || "Lesson plan creation denied"}`);
    }

    const newPlan: TeacherLessonPlan = {
      id: `lp-${Date.now()}`,
      teacherId: plan.teacherId || (activeActor.role === "TEACHER" ? actorId : "user-teacher-001"),
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
    this.saveToStorage();

    auditService.recordEvent({
      eventType: "LESSON_PLAN_CREATED",
      actorId,
      actorRole: activeActor.role,
      actorDisplayName: activeActor.displayName,
      resourceType: "curriculum",
      resourceId: newPlan.id,
      result: "SUCCESS",
      reason: `Lesson plan '${newPlan.title}' created.`
    });

    return newPlan;
  }
}

export const teacherStudioService = new TeacherStudioService();
