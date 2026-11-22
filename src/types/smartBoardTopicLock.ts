/**
 * MOOS ACADEMY — SMART BOARD TOPIC LOCKING & INSTRUCTIONAL FIDELITY DATA MODELS
 *
 * Establishes immutable instructional context objects, subject categorization schemas,
 * template compatibility validation rules, and the 20-to-30 stage pedagogical state architecture.
 */

import { SmartBoardActionType } from "./smartBoardMasterclass";
import { VideoCheckpointQuestion } from "./videoLearning";

export type SubjectCategory =
  | "academic_english_discourse"
  | "literature"
  | "english_language_esl"
  | "mathematics"
  | "physics"
  | "chemistry"
  | "biology"
  | "computer_science"
  | "engineering"
  | "economics"
  | "financial_literacy";

export type MasterclassPedagogicalPhaseArc =
  | "FOUNDATION"
  | "UNDERSTANDING"
  | "GUIDED_PRACTICE"
  | "APPLICATION"
  | "ANALYSIS"
  | "SYNTHESIS"
  | "INDEPENDENT_PERFORMANCE"
  | "MASTERY";

/**
 * Immutable instructional context object for active Smart Board lessons
 */
export interface SmartBoardLessonContext {
  country: string;
  curriculum: string;
  educationalSystem: string;
  level: string;
  subject: string;
  course: string;
  unit: string;
  topic: string;
  skills: string[];
  learningObjectives: string[];
  lessonType: string;
  difficulty: string;
  pedagogicalMode: string;
  instructionalGoals: string[];
  currentPhase: string;
  currentStep: number;
  currentConcept?: string;
  currentExample?: string;
  currentActivity?: string;
  activeLessonId: string;
  activeTopicId: string;
  activeCourseId: string;
  activeUnitId: string;
  activeSubjectId: string;
  activeCurriculumId: string;
  activeSessionId: string;
}

/**
 * Detailed 20-to-30 stage instructional script state architecture
 */
export interface MasterclassInstructionalState {
  scriptId: string;
  stageNumber: number; // 1 to 30
  phase: MasterclassPedagogicalPhaseArc;
  instructionalPurpose: string;
  teacherNarration: string;
  boardAction: SmartBoardActionType;
  boardTitle: string;
  boardContent: string;
  boardSubSteps?: string[];
  boardDetail?: string;
  highlightColor?: "cyan" | "emerald" | "amber" | "rose" | "violet" | "sky";
  zone: "main_canvas" | "left_workings" | "right_sidebar" | "bottom_bar";
  visualType: string;
  learnerFocus: string;
  example?: string;
  interaction?: {
    type: string;
    prompt: string;
    options?: Array<{ id: string; label: string; isCorrect: boolean; explanation: string }>;
  };
  checkpoint?: VideoCheckpointQuestion;
  expectedResponse?: string;
  feedback?: string;
  nextStep?: string;
  estimatedDurationSeconds: number;
}

/**
 * Quality Gate Mismatch Detection Types
 */
export type QualityGateViolationType =
  | "SUBJECT_MISMATCH"
  | "TOPIC_MISMATCH"
  | "COURSE_MISMATCH"
  | "UNIT_MISMATCH"
  | "CURRICULUM_MISMATCH"
  | "STALE_SESSION_STATE"
  | "STALE_SCRIPT_STATE"
  | "STALE_BOARD_STATE"
  | "INSTRUCTIONAL_PHASE_MISMATCH"
  | "BOARD_NARRATION_DESYNCHRONIZATION"
  | "INAPPROPRIATE_TEMPLATE"
  | "GENERIC_CHECKPOINT"
  | "GENERIC_EXAMPLE"
  | "INSUFFICIENT_CONTENT_DEPTH"
  | "REPETITIVE_SCRIPT"
  | "ARTIFICIAL_DURATION_PADDING"
  | "MISSING_BEGINNER_FOUNDATION"
  | "MISSING_GUIDED_PRACTICE"
  | "MISSING_APPLICATION"
  | "MISSING_ADVANCED_CHALLENGE"
  | "MISSING_MASTERY"
  | "SUBJECT_INAPPROPRIATE_INTERACTION";

export interface QualityGateAuditFinding {
  code: QualityGateViolationType;
  severity: "CRITICAL" | "WARNING" | "INFO";
  message: string;
  detectedIn: string;
}
