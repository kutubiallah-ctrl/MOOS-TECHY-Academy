/**
 * MOOS TECHY TEACHER STUDIO — CANONICAL DATA MODEL
 * 
 * Formal data models for educators and curriculum planners, enabling
 * syllabus planning, lesson scaffolding, diagnostic intervention,
 * formative/summative assessment creation, and QR companion linking.
 */

import { CurriculumStandard, EducationalLevel, Subject, Unit, Skill, PracticeQuestion, AssignmentCompletionState, Assignment as CanonicalAssignment } from "./curriculum";
import { ContentLifecycleStatus } from "./agentOrchestrator";

export type { AssignmentCompletionState };

export interface TeacherLessonPlan {
  id: string;
  teacherId: string;
  title: string;
  subjectId: string;
  unitId: string;
  skillId: string;
  targetLevel: EducationalLevel;
  durationMinutes: number;
  learningObjectives: string[];
  prerequisites: string[];
  materialsAndTools: string[];
  phases: Array<{
    phaseName: "Hook & Warmup" | "Direct Instruction" | "Guided Socratic Practice" | "Collaborative Task" | "Formative Exit Check" | string;
    durationMinutes: number;
    teacherGuidance: string;
    studentActivity: string;
    keyQuestionsToAsk: string[];
    commonStumblingBlocks: string[];
  }>;
  suggestedPracticeQuestions: PracticeQuestion[];
  homeworkOrExtension: string;
  linkedQRCompanionCode?: string;
  lifecycleStatus: ContentLifecycleStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherAssessmentBlueprint {
  id: string;
  teacherId: string;
  title: string;
  assessmentType: "diagnostic_quiz" | "unit_test" | "term_examination" | "mock_utme_cbt" | "wassce_prep";
  subjectId: string;
  targetLevel: EducationalLevel;
  curriculumStandard: CurriculumStandard;
  durationMinutes: number;
  totalMarks: number;
  sections: Array<{
    sectionName: string;
    instructions: string;
    questionIds: string[];
    weightagePercentage: number;
  }>;
  rubricCriteria: Array<{
    criterion: string;
    maxScore: number;
    descriptors: {
      excellent: string;
      competent: string;
      developing: string;
    };
  }>;
  lifecycleStatus: ContentLifecycleStatus;
}

export interface LearnerInterventionPlan {
  id: string;
  learnerId: string;
  learnerName: string;
  identifiedStruggleSkillId: string;
  identifiedStruggleSkillName: string;
  diagnosticObservation: string;
  recommendedAction: "remedial_scaffolding" | "formula_codex_review" | "tutor_moos_session" | "peer_collaboration";
  suggestedQRResources: string[];
  followUpDueDate: string;
  status: "open" | "in_progress" | "resolved";
}

export interface TeacherClassroom {
  id: string;
  name: string;
  gradeLevel: EducationalLevel;
  subjectId: string;
  standard: CurriculumStandard;
  roomCode: string;
  enrolledLearnerIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ClassroomRosterStudent {
  learnerId: string;
  name: string;
  email: string;
  joinedAt: string;
  masteryScore: number;
  attemptsCount: number;
  lastActiveAt: string;
  strugglingSkills: string[];
  prerequisiteBlockers: string[];
  recurringMisconceptions: string[];
  retrievalIndependenceRate: number;
  examReadinessScore: number;
  pendingAssignmentsCount: number;
}

export type AssignmentLifecycleStatus = "draft" | "published" | "active" | "completed" | "archived" | "closed";

export type LearnerTaskLifecycleStatus =
  | "assigned"
  | "started"
  | "in_progress"
  | "completed"
  | "abandoned"
  | "expired"
  | "reviewed"
  | "mastered"
  | "not_mastered"
  | "intervention_required";

export type AssignmentEffectivenessVerdict =
  | "improvement_observed"
  | "performance_increased"
  | "mastery_evidence_strengthened"
  | "remediation_remains_unresolved"
  | "insufficient_evidence";

export interface LearnerAssignmentProgress {
  learnerId: string;
  learnerName: string;
  status: LearnerTaskLifecycleStatus;
  completionState?: AssignmentCompletionState;
  openedAt?: string;
  startedAt?: string;
  completedAt?: string;
  scorePercentage?: number;
  attemptsCount: number;
  hintsRequestedCount: number;
  retrievalIndependenceRate: number;
  preAssignmentMastery?: number;
  postAssignmentMastery?: number;
  identifiedMisconceptions: string[];
  effectivenessVerdict?: AssignmentEffectivenessVerdict;
}

export interface AssignmentDifferentiationConfig {
  adaptiveDifficulty: boolean;
  prerequisiteWarmupEnabled: boolean;
  hintScaffoldingIntensity: "standard" | "high" | "minimal";
  learnerDifficultyOverrides?: Record<string, "introductory" | "standard" | "advanced">;
}

export interface ClassroomAssignment {
  id: string;
  teacherId: string;
  classroomId: string;
  title: string;
  description: string;
  unitId: string;
  skillId: string;
  assignmentType: "practice" | "guided_remediation" | "exam_prep" | "challenge" | "diagnostic";
  targetLearnerIds: string[]; // empty array denotes entire class
  dueDate: string;
  status: AssignmentLifecycleStatus;
  provenance: "OFFICIAL_SYLLABUS" | "PLATFORM_CONTENT" | "AI_GENERATED_DRAFT";
  createdAt: string;
  completedLearnerIds: string[];
  learnerProgress?: Record<string, LearnerAssignmentProgress>;
  differentiationConfig?: AssignmentDifferentiationConfig;
}

export type TeacherInterventionStatus =
  | "recommended"
  | "reviewed"
  | "accepted"
  | "rejected"
  | "assigned"
  | "in_progress"
  | "completed"
  | "resolved"
  | "unresolved";

export interface TeacherInterventionRecommendation {
  id: string;
  classroomId: string;
  type: "REMEDIATE_PREREQUISITE" | "ADDRESS_MISCONCEPTION" | "ASSIGN_GUIDED_PRACTICE" | "SCHEDULE_REVISION" | "PROVIDE_CHALLENGE" | "REASSESS";
  priority: "high" | "medium" | "low";
  status: TeacherInterventionStatus;
  targetSkillId: string;
  targetSkillTitle: string;
  affectedLearnerIds: string[];
  affectedLearnerNames: string[];
  evidenceRationale: string;
  evidenceType: "diagnostic_gap" | "prerequisite_blocker" | "recurring_misconception" | "retention_decay" | "hint_overreliance" | "mastery_acceleration";
  evidenceData?: {
    blockerSkillId?: string;
    blockerSkillTitle?: string;
    misconceptionPattern?: string;
    decayIntervalDays?: number;
    averageIndependence?: number;
  };
  recommendedActionTitle: string;
  suggestedResourceType: "practice" | "socratic_tutor" | "formula_codex" | "qr_textbook";
  suggestedResourceRef?: string;
  reviewedAt?: string;
  resolvedAt?: string;
}

export type AdaptiveGroupCategory =
  | "foundational_remediation"
  | "emerging_mastery"
  | "mastery_consolidation"
  | "challenge_ready"
  | "prerequisite_blocked"
  | "misconception_cluster"
  | "hint_dependent"
  | "spaced_review_decay"
  | "cbt_exam_focus";

export interface ClassroomAdaptiveGroup {
  id: string;
  classroomId: string;
  name: string;
  category: AdaptiveGroupCategory;
  learnerIds: string[];
  learnerNames: string[];
  rationale: string;
  recommendedAction: string;
  recommendedSkillId?: string;
  recommendedUnitId?: string;
  recommendedAssignmentType: "practice" | "guided_remediation" | "exam_prep" | "challenge" | "diagnostic";
}

export interface PrerequisiteBottleneckCluster {
  blockerSkillId: string;
  blockerSkillTitle: string;
  dependentSkillId: string;
  dependentSkillTitle: string;
  affectedLearnerCount: number;
  affectedLearnerIds: string[];
  affectedLearnerNames: string[];
  severity: "critical" | "moderate" | "low";
  suggestedRemediationUnitId: string;
}

export interface MisconceptionCluster {
  misconceptionId: string;
  trigger: string;
  note: string;
  affectedSkillId: string;
  affectedSkillTitle: string;
  affectedLearnerCount: number;
  affectedLearnerIds: string[];
  affectedLearnerNames: string[];
  sampleDistractorExplanation?: string;
  recommendedRemediationAction: string;
}

export interface ClassroomNextBestAction {
  id: string;
  classroomId: string;
  priorityScore: number; // 1-100
  category: "prerequisite_bottleneck" | "critical_misconception" | "struggling_learner_group" | "stagnation_intervention" | "retention_review" | "challenge_escalation";
  title: string;
  rationale: string;
  targetAudience: "individual" | "group" | "whole_class";
  targetIds: string[];
  targetNames: string[];
  suggestedAction: string;
  suggestedSkillId?: string;
  suggestedUnitId?: string;
  assignmentType: "practice" | "guided_remediation" | "exam_prep" | "challenge" | "diagnostic";
}

export interface ClassAnalyticsSnapshot {
  classId: string;
  className: string;
  gradeLevel: EducationalLevel;
  totalEnrolled: number;
  averageMasteryScore: number; // 0-100
  topStrengths: string[];
  priorityInterventionsCount: number;
  activeLearnersCount: number;
  recentExamAverage: number;
  assignmentCompletionRate: number;
  retrievalIndependenceAverage: number;
  commonMisconceptions: Array<{ trigger: string; note: string; count: number }>;
}
