/**
 * MOOS TECHY ACADEMY — AI TEACHER COPILOT & INSTRUCTIONAL MATERIAL DATA CONTRACTS
 * 
 * Formal domain models for:
 * 1. 14 Educational Material Types
 * 2. Strict Human Governance & Provenance
 * 3. Natural Language Request Parsing & Context Extraction
 * 4. Multi-tier Differentiation & Misconception Remediation
 * 5. Material Transformation & One-Click Lesson Preparation
 */

import { EducationalLevel, CurriculumStandard, PracticeQuestion } from "./curriculum";

export type EducationalMaterialType =
  | "lesson_plan"
  | "lesson_note"
  | "worksheet"
  | "quiz"
  | "assignment"
  | "class_test"
  | "revision_material"
  | "homework"
  | "remedial_activity"
  | "extension_activity"
  | "answer_key"
  | "marking_scheme"
  | "exit_ticket"
  | "study_guide"
  | "video_lesson_script"
  | "video_explanation_package";

export type MaterialProvenance =
  | "CANONICAL_CURRICULUM"
  | "AI_GENERATED_DRAFT"
  | "TEACHER_EDITED_DRAFT"
  | "TEACHER_APPROVED"
  | "PUBLISHED";

export type MaterialLifecycleStatus =
  | "draft"
  | "ai_generated"
  | "awaiting_human_approval"
  | "approved"
  | "published";

export type MaterialDifficulty =
  | "introductory"
  | "standard"
  | "advanced"
  | "differentiated";

export interface ParsedTeacherPrompt {
  rawPrompt: string;
  detectedType: EducationalMaterialType;
  targetLevel: EducationalLevel;
  targetDomain: string;
  targetSubjectId: string;
  targetSubjectName: string;
  targetUnitId?: string;
  targetSkillId?: string;
  topic: string;
  durationMinutes: number;
  difficulty: MaterialDifficulty;
  questionCount: number;
  isRemedial: boolean;
  isDifferentiated: boolean;
  targetAudienceDescription?: string;
  missingEssentialField?: "level" | "subject" | "topic";
  clarificationPrompt?: string;
  confidenceScore: number;
}

export interface StructuredInstructionalSection {
  id: string;
  heading: string;
  subheading?: string;
  content: string;
  teacherGuidance?: string;
  studentActivity?: string;
  durationMinutes?: number;
  keyPrinciples?: string[];
  workedExamples?: Array<{
    title: string;
    problem: string;
    stepByStepSolution: string[];
    explanation: string;
    keyPrinciple: string;
    examinerTip?: string;
  }>;
  commonMisconceptions?: Array<{
    misconception: string;
    whyStudentsStumble: string;
    correctionTip: string;
  }>;
}

export interface StructuredMaterialQuestion {
  id: string;
  questionNumber: number;
  stem: string;
  questionType: "multiple_choice" | "short_answer" | "worked_solution" | "diagnostic_trap";
  options?: string[];
  correctIndex?: number;
  answerKey: string;
  stepByStepExplanation: string;
  misconceptionTrap?: string;
  difficulty: "introductory" | "standard" | "advanced";
  bloomTaxonomy: "recall" | "comprehension" | "application" | "analysis" | "evaluation";
  points: number;
  remedialHint?: string;
}

export interface StructuredDifferentiationTier {
  tier: "foundation" | "core" | "extension";
  label: string;
  targetAudience: string;
  guidance: string;
  questions: StructuredMaterialQuestion[];
}

export interface TeacherEducationalMaterial {
  id: string;
  teacherId: string;
  teacherDisplayName: string;
  classroomId: string;
  classroomName: string;
  title: string;
  materialType: EducationalMaterialType;
  targetLevel: EducationalLevel;
  curriculumStandard: CurriculumStandard;
  domainId: string;
  subjectId: string;
  subjectName: string;
  topic: string;
  unitId: string;
  unitTitle: string;
  skillId: string;
  skillTitle: string;
  durationMinutes: number;
  difficulty: MaterialDifficulty;
  isRemedial?: boolean;
  isDifferentiated?: boolean;
  learningObjectives: string[];
  prerequisiteKnowledge: string[];
  instructionalMaterials: string[];
  sections: StructuredInstructionalSection[];
  questions: StructuredMaterialQuestion[];
  differentiationTiers?: StructuredDifferentiationTier[];
  remedialSupport?: {
    targetGaps: string[];
    scaffoldingStrategy: string;
    guidedPrompts: string[];
  };
  exitTicket?: {
    prompt: string;
    sampleCorrectResponse: string;
    commonErrorsToLookFor: string[];
    remedialNextStep: string;
  };
  markingScheme?: {
    totalMarks: number;
    breakdown: Array<{ section: string; marks: number; guidance: string }>;
  };
  provenance: MaterialProvenance;
  lifecycleStatus: MaterialLifecycleStatus;
  humanReviewDecision: "pending" | "approved" | "rejected" | "revision_requested";
  reviewedBy?: string;
  reviewedAt?: string;
  reviewerNotes?: string;
  teacherNotes?: string;
  authorSignature?: string;
  linkedQRCompanionCode?: string;
  derivedFromMaterialId?: string;
  sourcePrompt?: string;
  createdAt: string;
  updatedAt: string;
  // Compatibility & convenience aliases
  body?: string;
  type?: EducationalMaterialType;
  status?: MaterialLifecycleStatus;
  approvedBy?: string;
  authorName?: string;
  targetAudience?: string;
}

export interface TeacherCopilotDefaults {
  teacherId: string;
  defaultClassroomId: string;
  defaultSubjectId: string;
  defaultLevel: EducationalLevel;
  typicalLessonDurationMinutes: number;
  preferredQuestionQuantity: number;
  preferredDifficulty: MaterialDifficulty;
}

export interface PreparedLessonPackage {
  id: string;
  title: string;
  topic: string;
  classroomId: string;
  generatedAt: string;
  lessonPlan: TeacherEducationalMaterial;
  lessonNote: TeacherEducationalMaterial;
  worksheet: TeacherEducationalMaterial;
  exitTicket: TeacherEducationalMaterial;
  materials?: TeacherEducationalMaterial[];
}
