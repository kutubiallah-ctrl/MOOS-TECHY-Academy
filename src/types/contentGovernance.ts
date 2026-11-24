/**
 * MOOS ACADEMY — CONTENT GOVERNANCE, VERSIONING & QA TYPES
 *
 * Canonical metadata, 8-state publication lifecycle, weighted 8-dimension
 * quality scoring rubric (approval threshold: >= 85%), automatic disqualifiers,
 * and immutable snapshot revision history with deterministic rollback.
 */

import { EducationalLevel, Unit } from "./curriculum";

export const APPROVAL_QUALITY_THRESHOLD = 85;

export type PublicationStatus =
  | "draft"
  | "under_review"
  | "qa_pending"
  | "qa_failed"
  | "approved"
  | "published"
  | "archived"
  | "flagged";

export type CurriculumScope = "CORE_SYLLABUS" | "ADVANCED_ENRICHMENT";

export type GovernanceDisqualifierCode =
  | "SCRATCHPAD_LEAK"
  | "DUPLICATE_QUESTION_STEM"
  | "INVALID_ANSWER_KEY"
  | "BROKEN_MATH_OR_LOGIC"
  | "MISSING_WORKED_DERIVATION"
  | "MISSING_ALIGNMENT_OR_PREREQ"
  | "INSUFFICIENT_ASSESSMENT_COVERAGE"
  | "UNVERIFIED_MODULE";

export interface GovernanceDisqualifier {
  code: GovernanceDisqualifierCode;
  severity: "CRITICAL" | "BLOCKING";
  skillId?: string;
  questionId?: string;
  message: string;
}

export interface QADimensionScores {
  mathematicalAndFactualAccuracy: number;   // Weight 20%
  syllabusAndPrerequisiteAlignment: number; // Weight 15%
  workedDerivationDepth: number;            // Weight 15%
  assessmentCoverage: number;               // Weight 15%
  visualAndDiagramFidelity: number;         // Weight 10%
  misconceptionAndHintRigor: number;        // Weight 10%
  antiDuplicationAndCleanProse: number;     // Weight 10%
  pedagogicalFlowAndRevision: number;       // Weight 5%
}

export const QA_DIMENSION_WEIGHTS: Record<keyof QADimensionScores, number> = {
  mathematicalAndFactualAccuracy: 0.20,
  syllabusAndPrerequisiteAlignment: 0.15,
  workedDerivationDepth: 0.15,
  assessmentCoverage: 0.15,
  visualAndDiagramFidelity: 0.10,
  misconceptionAndHintRigor: 0.10,
  antiDuplicationAndCleanProse: 0.10,
  pedagogicalFlowAndRevision: 0.05
};

export interface ContentRevisionSnapshot {
  version: string;
  timestamp: string;
  author: string;
  summary: string;
  publicationStatus: PublicationStatus;
  qualityScore: number;
  unitSnapshot: Unit;
}

export interface AssessmentCoverageSummary {
  totalQuestions: number;
  skillsCount: number;
  minQuestionsPerSkill: number;
  avgQuestionsPerSkill: number;
  hasAllDifficultyTiers: boolean;
}

export interface TopicGovernanceRecord {
  topicId: string;
  unitId: string;
  title: string;
  subject: string;
  level: EducationalLevel;
  curriculum: string[];
  curriculumScope: CurriculumScope;
  prerequisites: string[];
  version: string;
  revisionHistory: ContentRevisionSnapshot[];
  qualityScore: number;
  dimensionScores: QADimensionScores;
  disqualifiers: GovernanceDisqualifier[];
  verificationStatus: "VERIFIED_OFFICIAL" | "PLATFORM_VERIFIED" | "PENDING_REVIEW" | "REJECTED";
  publicationStatus: PublicationStatus;
  assessmentCoverage: AssessmentCoverageSummary;
  lastVerificationDate: string;
  visualCount: number;
  workedExampleCount: number;
  approvedForLearnerProduction: boolean;
}

export interface ElevenDepthMetrics {
  catalogSubjectsCount: number;
  subjectsWithPublishedUnitsCount: number;
  subjectsWithIsolatedOrNoUnitsCount: number;
  authoredUnitsCount: number;
  approvedPublishedUnitsCount: number;
  isolatedUnitsCount: number;
  skillsCount: number;
  skillsWithMinFiveQuestionsCount: number;
  totalVerifiedQuestions: number;
  totalWorkedExamples: number;
  totalSvgVisualizations: number;
  averageApprovedQualityScore: number;
}
