import {
  EducationalLevel,
  CurriculumStandard,
  PracticeQuestion,
  Skill,
  Unit,
  MasteryRecord
} from "./curriculum";
import { LearnerProfile, QuestionAttempt } from "./learner";

export type LearningResourceType =
  | "LESSON"
  | "PRACTICE_QUESTION"
  | "DIAGNOSTIC_ITEM"
  | "EXAM_ITEM"
  | "HINT"
  | "WORKED_EXAMPLE"
  | "MICRO_LESSON"
  | "REVISION"
  | "CHALLENGE"
  | "FORMULA"
  | "INTERACTIVE_ACTIVITY"
  | "QR_RESOURCE"
  | "VIDEO_RESOURCE"
  | "IMAGE_RESOURCE"
  | "AI_EXPLANATION"
  | "TUTOR_PROMPT";

export type ResourceProvenance =
  | "VERIFIED_FACT"
  | "EMPIRICAL_CITATION"
  | "OFFICIAL_SYLLABUS"
  | "PLATFORM_CONTENT"
  | "PLATFORM_MAPPING"
  | "PLATFORM_COMPETENCY"
  | "AI_SUGGESTION"
  | "AI_GENERATED_DRAFT"
  | "HUMAN_APPROVED";

export type ResourceValidationStatus =
  | "VALIDATED_CANONICAL"
  | "HUMAN_REVIEWED"
  | "SYNTHESIZED_SANDBOXED"
  | "PENDING_REVIEW";

export interface GenerationMetadata {
  isAiGenerated: boolean;
  generatorAgent: string; // e.g. "practice_agent", "variation_engine", "tutor_agent"
  baseResourceId?: string;
  variantIndex?: number;
  parameterSeed?: number | string;
  generatedAt: string;
  confidenceScore: number; // 0.0 to 1.0
  variationType?:
    | "numeric_permutation"
    | "context_shift"
    | "distractor_rebalance"
    | "socratic_expansion"
    | "deep_ai_synthesis";
}

export interface LearningResource {
  id: string;
  resourceType: LearningResourceType;
  title: string;
  skillId: string;
  unitId: string;
  subjectId: string;
  domainId: string;
  level: EducationalLevel;
  difficulty: "foundational" | "intermediate" | "advanced" | "easy" | "medium" | "hard";
  learningObjective: string;
  curriculumContext?: string;
  
  // Assessment & Delivery payload
  questionType?: "multiple_choice" | "numeric_input" | "step_by_step" | "fill_in_blank" | "proof_scaffold";
  answerType?: "single_choice" | "multi_choice" | "algebraic_string" | "numeric_exact" | "text_explanation";
  questionText?: string;
  mathExpression?: string;
  contextText?: string;
  diagramSvg?: string;
  options?: string[];
  correctAnswer?: string;
  solution?: string;
  explanation: string;
  hintLadder: string[];
  misconceptionTargets?: Array<{
    trigger: string;
    note: string;
    misconceptionId?: string;
  }>;
  
  // Governance & Integrity
  provenance: ResourceProvenance;
  validationStatus: ResourceValidationStatus;
  generationMetadata?: GenerationMetadata;
  
  // Extension payloads
  interactiveConfig?: Record<string, any>;
  qrAnchor?: {
    bookTitle: string;
    chapterNumber: number;
    sectionNumber: number;
    pageNumber: number;
  };
  
  createdAt: string;
  updatedAt?: string;
}

export type RecommendationReason =
  | "lowest_mastery"
  | "misconception_remediation"
  | "approaching_mastery"
  | "spaced_review_decay"
  | "unattempted_skill"
  | "exam_focus"
  | "prerequisite_remedy";

export interface SupplyRecommendation {
  priorityScore: number; // 0 to 100
  reason: RecommendationReason;
  reasonDescription: string;
  resource: LearningResource;
  skill: Skill;
  unit: Unit;
  estimatedMinutes: number;
  xpReward: number;
}

export interface SupplyQueryContext {
  learnerProfile: LearnerProfile;
  targetSubjectId?: string;
  targetUnitId?: string;
  targetSkillId?: string;
  preferredResourceType?: LearningResourceType;
  maxItems?: number;
  allowAiGeneration?: boolean;
  allowParametricVariations?: boolean;
}

export interface SupplyDeliveryResult {
  status: "AVAILABLE" | "GENERATED" | "UNAVAILABLE";
  resources: LearningResource[];
  message?: string;
  diagnosticLogs?: string[];
}

export interface ResourceAttemptRecord {
  resourceId: string;
  variantId?: string;
  skillId: string;
  timestamp: string;
  result: "correct" | "incorrect" | "abandoned";
  userAnswer: string;
  timeSpentSeconds: number;
  hintsUsedCount: number;
  masteryEffectDelta: number;
  difficulty: string;
  source: ResourceProvenance;
}
