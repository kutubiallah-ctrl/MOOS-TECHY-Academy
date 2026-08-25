/**
 * MOOS TECHY TEXTBOOK STUDIO — CANONICAL DATA MODEL
 * 
 * Formal architecture for multi-volume STEM and Humanities textbooks
 * supporting physical-to-digital QR bridging, pedagogical scaffolding,
 * worked examples, practice tiers, and human-supervised publication.
 */

import { CurriculumStandard, EducationalLevel } from "./curriculum";
import { ContentLifecycleStatus } from "./agentOrchestrator";

export type TextbookDiscipline =
  | "mathematics"
  | "physics"
  | "chemistry"
  | "biology"
  | "computer_science"
  | "ict"
  | "english_language"
  | "literature"
  | "financial_literacy"
  | "economics"
  | "business_studies"
  | "integrated_stem";

export type CurriculumMappingStatus =
  | "verified"
  | "draft"
  | "unverified"
  | "author_supplied"
  | "placeholder";

export interface BookAuthor {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  bio: string;
  isLeadAuthor: boolean;
}

export interface BookContributor {
  id: string;
  name: string;
  role: "reviewer" | "pedagogical_editor" | "technical_illustrator" | "mathematician" | "curriculum_consultant";
  institution: string;
}

export interface BookEdition {
  editionNumber: number;
  editionName: string; // e.g. "First Comprehensive Edition"
  releaseYear: number;
  isbn?: string;
  printFormat: "hardcover" | "paperback" | "digital_companion_pdf";
  totalEstimatedPages: number;
}

export interface TextbookLearningObjective {
  id: string;
  code: string;
  statement: string;
  bloomLevel: "remember" | "understand" | "apply" | "analyze" | "evaluate" | "create";
  curriculumRef?: string;
}

export interface TextbookConcept {
  id: string;
  title: string;
  formalDefinition: string;
  intuitiveExplanation: string;
  keyFormulas: string[];
  visualDiagramDescription?: string;
  commonMisconceptions: string[];
  realWorldApplications: string[];
}

export interface TextbookWorkedExampleStep {
  stepNumber: number;
  heading: string;
  mathExpression: string;
  detailedReasoning: string;
  pedagogicalTip?: string;
}

export interface TextbookWorkedExample {
  id: string;
  exampleNumber: string; // e.g. "Example 3.4"
  title: string;
  problemStatement: string;
  difficulty: "foundational" | "standard" | "exam_mastery" | "olympiad_challenge";
  steps: TextbookWorkedExampleStep[];
  finalAnswer: string;
  keyTakeaway: string;
}

export interface TextbookPracticeItem {
  id: string;
  itemNumber: string; // e.g. "Q 3.2.4"
  tier: "drill" | "conceptual" | "applied_problem" | "exam_style";
  prompt: string;
  mathExpression?: string;
  hints: string[];
  fullSolution: string;
  targetAnswer: string;
  qrCodeLink?: string;
}

export interface TextbookSection {
  id: string;
  chapterId: string;
  sectionNumber: string; // e.g. "3.2"
  title: string;
  pageReference: string;
  curriculumStatus: CurriculumMappingStatus;
  curriculumCodeRef?: string;
  learningObjectives: TextbookLearningObjective[];
  coreConcepts: TextbookConcept[];
  workedExamples: TextbookWorkedExample[];
  practiceSet: TextbookPracticeItem[];
  teacherNotes: string[];
  stableQRIdentifier: string; // e.g. "CEMM-CH03-SEC02-EX04"
  associatedPlayActivityId?: string;
  lifecycleStatus: ContentLifecycleStatus;
}

export interface TextbookChapter {
  id: string;
  partId?: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  overviewSummary: string;
  curriculumTopicsCovered: string[];
  sections: TextbookSection[];
  chapterReviewQuestions: TextbookPracticeItem[];
  chapterSummaryFormulas: string[];
  lifecycleStatus: ContentLifecycleStatus;
}

export interface TextbookPart {
  id: string;
  partNumber: number;
  title: string; // e.g. "Part I: Foundational Pure Mathematics & Functions"
  description: string;
  chapterIds: string[];
}

export interface TextbookProject {
  id: string;
  code: string; // e.g. "CEMM-MTH-ADV"
  title: string;
  subtitle: string;
  discipline: TextbookDiscipline;
  targetLevel: EducationalLevel;
  curriculumStandard: CurriculumStandard;
  curriculumMappingStatus: CurriculumMappingStatus;
  edition: BookEdition;
  authors: BookAuthor[];
  contributors: BookContributor[];
  bookBrief: {
    targetAudienceDescription: string;
    pedagogicalPhilosophy: string;
    differentiatingFeatures: string[];
    prerequisitesRequired: string[];
  };
  parts: TextbookPart[];
  chapters: TextbookChapter[];
  totalQRResourcesCount: number;
  lifecycleStatus: ContentLifecycleStatus;
  createdAt: string;
  updatedAt: string;
  lastQualityScore?: number;
}
