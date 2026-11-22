/**
 * MOOS TECHY ACADEMY — CANONICAL CURRICULUM VIDEO LEARNING ARCHITECTURE
 * 
 * Formal data models for:
 * 1. Unit Video Explanations (subject-specific visual pedagogy)
 * 2. In-Video Interactive Checkpoints & Tutor Moos Integration
 * 3. Timestamped Captions & Interactive Transcript
 * 4. Pedagogical Visual Storyboards (Math, Physics, Chemistry, Biology, English, CS)
 * 5. Video Creator Studio Projects & Editorial Governance
 * 6. Premium Entitlement Tiers & Marketplace Linkages
 * 7. 83-Unit Curriculum Video Coverage Matrix
 */

import { EducationalLevel, CurriculumStandard } from "./curriculum";
import { ResourceProvenance, ResourceValidationStatus } from "./learningSupply";
import { AgentRole } from "./agentOrchestrator";

export type VideoEntitlementTier =
  | "FREE"
  | "STANDARD"
  | "PREMIUM"
  | "CREATOR_PREMIUM";

export type VideoPublicationStatus =
  | "draft"
  | "scripted"
  | "storyboarded"
  | "in_production"
  | "awaiting_qa"
  | "awaiting_human_approval"
  | "approved"
  | "published"
  | "archived";

export type SubjectVisualEngineType =
  | "math_geometric_algebraic"
  | "physics_kinematic_vectors"
  | "chemistry_molecular_reaction"
  | "biology_cellular_system"
  | "english_syntax_tree"
  | "compsci_algorithm_visualizer"
  | "economics_market_equilibrium"
  | "engineering_technical_schematic"
  | "general_pedagogical_canvas";

export interface VideoTranscriptSegment {
  id: string;
  startTimeSeconds: number;
  endTimeSeconds: number;
  speaker: string; // e.g. "Lead Instructor", "Visual AI Tutor", "Dr. Moos"
  text: string;
  visualCue?: string;
  keyTerm?: string;
}

export interface VideoCheckpointQuestion {
  id: string;
  triggerTimeSeconds: number; // Video pauses here
  questionText: string;
  mathExpression?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  socraticHint: string;
  targetSkillId?: string;
  remedialNextStep?: string;
}

export interface VideoStoryboardScene {
  sceneNumber: number;
  timeRange: string; // e.g. "00:00 - 01:15"
  startSeconds: number;
  durationSeconds: number;
  pedagogicalPhase:
    | "topic_hook_intuition"
    | "learning_objectives"
    | "conceptual_derivation"
    | "visual_demonstration"
    | "worked_example_breakdown"
    | "misconception_alert"
    | "real_world_application"
    | "learner_checkpoint"
    | "synthesis_and_next_steps";
  title: string;
  narrationScript: string;
  visualDescription: string;
  visualCanvasType: SubjectVisualEngineType;
  diagramData?: {
    type: string;
    labels: string[];
    values?: number[];
    equations?: string[];
    animationKeyframes?: Array<{
      step: number;
      actionDescription: string;
      activeElementId: string;
    }>;
  };
  keyTakeaway: string;
}

export interface CurriculumVideoResource {
  id: string;
  videoId: string;
  unitId: string;
  unitTitle: string;
  unitCode: string;
  skillId?: string;
  skillTitle?: string;
  subjectId: string;
  subjectName: string;
  level: EducationalLevel;
  curriculumStandard: CurriculumStandard;
  title: string;
  subtitle: string;
  description: string;
  learningObjectives: string[];
  durationSeconds: number;
  durationFormatted: string; // e.g. "12:45"
  thumbnailUrl: string;
  assetUrl?: string; // HTML5 playable video stream URL
  
  // Visual & Narration Architecture
  visualEngineType: SubjectVisualEngineType;
  storyboard: VideoStoryboardScene[];
  transcript: VideoTranscriptSegment[];
  checkpoints: VideoCheckpointQuestion[];
  keyConcepts: Array<{
    term: string;
    definition: string;
    timestampSeconds: number;
  }>;

  // Integrated Next-Action Pathway
  nextActionPathway: {
    recommendedPracticeSkillId: string;
    recommendedFlashcardDeckId?: string;
    recommendedVisualizationId?: string;
    recommendedActivityId?: string;
    recommendedDiagnosticUnitId?: string;
  };

  // Textbook & QR Anchor
  textbookAnchor?: {
    bookTitle: string;
    bookCode: string;
    chapterNumber: number;
    sectionNumber: string;
    qrResourceCode: string;
  };

  // Authorship, Governance & Provenance
  creatorId: string;
  creatorName: string;
  creatorType: "ai_governed_specialist" | "verified_educator" | "expert_creator" | "partner_institution";
  provenance: ResourceProvenance;
  validationStatus: ResourceValidationStatus;
  isAiGenerated: boolean;
  generatingAgents?: AgentRole[];
  humanReviewerName?: string;
  humanReviewedAt?: string;
  publicationStatus: VideoPublicationStatus;
  entitlementTier: VideoEntitlementTier;
  version: string;
  createdAt: string;
  updatedAt: string;
  
  // Analytics baseline
  analytics: {
    viewsCount: number;
    completionCount: number;
    averageWatchTimeSeconds: number;
    checkpointAccuracyRate: number;
  };
}

export interface VideoCreatorProject {
  id: string;
  title: string;
  subjectId: string;
  level: EducationalLevel;
  unitId: string;
  skillId?: string;
  durationTargetMinutes: number;
  entitlementTier: VideoEntitlementTier;
  creatorId: string;
  creatorName: string;
  status: VideoPublicationStatus;
  scriptOutline: string;
  fullNarrationScript: string;
  storyboardScenes: VideoStoryboardScene[];
  checkpoints: VideoCheckpointQuestion[];
  learningObjectives: string[];
  editorialFeedbackNotes?: string[];
  assignedQAReviewer?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UnitVideoCoverageItem {
  unitId: string;
  unitCode: string;
  unitTitle: string;
  subjectId: string;
  subjectName: string;
  level: EducationalLevel;
  totalSkillsCount: number;
  videoStatus: "genuine_asset_ready" | "script_and_storyboard_ready" | "planned_in_pipeline" | "pending";
  hasScript: boolean;
  hasStoryboard: boolean;
  hasInteractiveCheckpoints: boolean;
  hasTranscript: boolean;
  primaryVideoId?: string;
  durationFormatted?: string;
  entitlementTier: VideoEntitlementTier;
  provenance: ResourceProvenance;
  publicationStatus: VideoPublicationStatus;
  notes?: string;
}

export interface VideoLearnerProgress {
  videoId: string;
  unitId: string;
  currentTimeSeconds: number;
  durationSeconds: number;
  progressPercent: number; // 0 - 100
  isCompleted: boolean;
  completedAt?: string;
  checkpointsAnswered: Record<string, {
    selectedOptionIndex: number;
    isCorrect: boolean;
    answeredAt: string;
  }>;
  lastWatchedAt: string;
}
