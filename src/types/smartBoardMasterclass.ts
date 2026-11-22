/**
 * MOOS TECHY ACADEMY — PREMIUM SMART BOARD MASTERCLASS DATA MODELS
 * 
 * Defines the dual-script synchronized architecture:
 * 1. Tutor Script (spoken narration)
 * 2. Smart Board Script (progressive writes, equations, diagrams, code, highlights, callouts)
 * 3. Intelligent Multi-Segment Continuity (e.g. 10m, 20m, 25m, 30m, 45m segmented masterclasses)
 * 4. Comprehensive 26-Resource Topic Learning Hub
 */

import { EducationalLevel, CurriculumStandard } from "./curriculum";
import { VideoEntitlementTier, VideoPublicationStatus, VideoCheckpointQuestion, VideoStoryboardScene, SubjectVisualEngineType } from "./videoLearning";

export type SmartBoardActionType =
  | "write_heading"
  | "step_by_step_working"
  | "render_formula"
  | "draw_diagram"
  | "code_editor"
  | "grammar_tree"
  | "highlight_term"
  | "callout_alert"
  | "summary_table"
  | "erase_section";

export interface SmartBoardAction {
  id: string;
  timeSeconds: number;
  actionType: SmartBoardActionType;
  title?: string;
  content: string; // Equation, code snippet, definition, or visual description
  subSteps?: string[]; // Line-by-line progressive working reveal
  detail?: string;
  highlightColor?: "cyan" | "emerald" | "amber" | "rose" | "violet" | "sky";
  zone: "main_canvas" | "left_workings" | "right_sidebar" | "bottom_bar";
  annotation?: string;
  diagramType?: string;
  // Pedagogical presentation metadata
  pedagogicalPhase?:
    | "teacher_intro"
    | "learning_goal"
    | "prior_knowledge"
    | "problem_statement"
    | "given_info"
    | "strategy_identification"
    | "formula_derivation"
    | "substitution"
    | "calculation"
    | "unit_check"
    | "verification"
    | "boxed_answer"
    | "exam_trap"
    | "diagram_focus"
    | "checkpoint_challenge"
    | "summary_synthesis"
    | "mastery_challenge";
  latexFormula?: string;
  givenInfo?: Record<string, string>;
  targetQuantity?: string;
  stepNumber?: number;
  transformationRationale?: string;
  narrationSyncCue?: string; // Explicit verbal cue triggering this board action
  activeFocusTarget?: string; // Term, variable, or line receiving teacher's spotlight
}

export interface MasterclassQualityGateScore {
  instructionalClarity: number; // 0-100
  teacherReasoning: number; // 0-100
  problemSolvingDepth: number; // 0-100
  subjectAppropriateness: number; // 0-100
  visualRelevance: number; // 0-100
  narrationBoardSync: number; // 0-100
  progressiveDisclosure: number; // 0-100
  learnerParticipation: number; // 0-100
  misconceptionHandling: number; // 0-100
  checkpointQuality: number; // 0-100
  practicalApplication: number; // 0-100
  masteryChallenge: number; // 0-100
  technicalNotation: number; // 0-100
  overallTeacherPresence: number; // 0-100
  // Interactive Smart Board Dimensions
  learnerAgency?: number; // 0-100
  interactionRelevance?: number; // 0-100
  feedbackQuality?: number; // 0-100
  adaptiveResponse?: number; // 0-100
  overallCompositeScore: number; // 0-100
  isApprovedForMasterclass: boolean; // >= 80 composite score
  qualityFeedback: string[];
}

export * from "./smartBoardInteraction";
export * from "./smartBoardTopicLock";

export interface MasterclassSegment {
  masterclassId: string;
  unitId: string;
  topicId: string;
  segmentId: string;
  segmentNumber: number; // 1, 2, 3
  totalSegments: number; // 1, 2, 3
  previousSegmentId?: string;
  nextSegmentId?: string;
  title: string;
  subtitle?: string;
  durationSeconds: number; // Max ~900s (15 min) per segment for speech stability
  durationFormatted: string; // e.g. "10:00"
  retrievalRecap?: string; // Retrieval recap of previous segment (for seg >= 2)
  tutorScript: string; // What the tutor says
  smartBoardActions: SmartBoardAction[]; // Synchronized visual timeline
  storyboard: VideoStoryboardScene[];
  checkpoints: VideoCheckpointQuestion[];
  instructionalStates?: import("./smartBoardTopicLock").MasterclassInstructionalState[];
  lessonContext?: import("./smartBoardTopicLock").SmartBoardLessonContext;
  visualEngineType: SubjectVisualEngineType;
  completionStatus: "not_started" | "in_progress" | "completed";
}

export interface MasterclassPackage {
  masterclassId: string;
  title: string;
  subtitle: string;
  description: string;
  unitId: string;
  unitTitle: string;
  unitCode: string;
  subjectId: string;
  subjectName: string;
  level: EducationalLevel;
  curriculumStandard: CurriculumStandard;
  totalEstimatedDurationMinutes: number;
  totalSegments: number;
  segments: MasterclassSegment[];
  lessonContext?: import("./smartBoardTopicLock").SmartBoardLessonContext;
  keyLearningOutcomes: string[];
  prerequisites: string[];
  entitlementTier: VideoEntitlementTier;
  qualityGate?: MasterclassQualityGateScore;
  creatorId: string;
  creatorName: string;
  creatorType: "ai_governed_specialist" | "verified_educator" | "expert_creator";
  publicationStatus: VideoPublicationStatus;
  createdAt: string;
  updatedAt: string;
}

export type TopicResourceChannelType =
  | "smart_board_masterclass"
  | "lesson_notes"
  | "concept_explanation"
  | "worked_examples"
  | "guided_practice"
  | "independent_practice"
  | "active_recall_flashcards"
  | "diagnostic_questions"
  | "hint_ladder"
  | "misconception_alerts"
  | "step_by_step_solutions"
  | "interactive_visualizations"
  | "simulations"
  | "cognitive_activities"
  | "real_world_applications"
  | "projects"
  | "revision_summary"
  | "exam_traps"
  | "topic_quiz"
  | "mastery_assessment"
  | "printable_worksheet"
  | "audio_explanation"
  | "transcript"
  | "study_guide"
  | "extension_challenge"
  | "remedial_activity"
  | "textbook_resource"
  | "qr_companion"
  | "ask_tutor_moos";

export interface TopicResourceItem {
  id: string;
  type: TopicResourceChannelType;
  title: string;
  description: string;
  category: "teaching_media" | "core_instruction" | "examples_solutions" | "practice_mastery" | "applied_differentiation";
  badge?: string;
  isAvailable: boolean;
  actionLabel: string;
}
