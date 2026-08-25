import { CurriculumStandard, EducationalLevel } from "./curriculum";

export type QRResourceType =
  | "worked_example"
  | "exercise_companion"
  | "concept_deep_dive"
  | "learn_and_play"
  | "formula_reference"
  | "revision_checkpoint";

export interface QRBookChapterSection {
  sectionNumber: string;
  sectionTitle: string;
  pageReference: string;
  primaryResourceCode?: string;
}

export interface QRBookChapter {
  chapterNumber: number;
  chapterTitle: string;
  description: string;
  sections: QRBookChapterSection[];
}

export interface QRBook {
  code: string; // e.g. "CEMM-MTH-S1", "CEMM-PHY-S1", "CEMM-CHM-S1", "CEMM-ENG-S1", "CEMM-BIO-S1", "CEMM-ICT-S1"
  title: string;
  shortTitle: string;
  edition: string;
  domainId: string;
  subjectId: string;
  level: EducationalLevel;
  curriculumStandard: CurriculumStandard;
  author: string;
  publicationYear: number;
  coverAccent: string;
  totalChapters: number;
  qrResourcesCount: number;
  status: "published_flagship" | "expanding_catalogue" | "upcoming_release";
  description: string;
  chapters: QRBookChapter[];
}

export interface QRResourceRecord {
  resourceCode: string; // e.g. "CEMM-CH3-SEC2-EX4" or short "CEMM-Q32"
  bookCode: string; // e.g. "CEMM-MTH-S1"
  bookTitle: string; // "Comprehensive Essential Modern Mathematics (C.E.M.M)"
  bookEdition: string;
  chapterNumber: number;
  chapterTitle: string;
  sectionNumber: string;
  sectionTitle: string;
  exerciseNumber?: string;
  pageReference: string;
  resourceType: QRResourceType;
  title: string;
  subtitle: string;
  curriculumStandard: CurriculumStandard;
  
  // Academic linkage to Core Curriculum Engine
  targetUnitId: string;
  targetSkillId: string;
  associatedPlayActivityId?: string;
  
  learningObjectives: string[];
  
  digitalExplanation: {
    overview: string;
    keyFormulas: string[];
    commonMisconceptions: string[];
    workedSolutionSteps: Array<{
      stepNumber: number;
      instruction: string;
      mathExpression: string;
      reasoning: string;
    }>;
  };

  additionalPracticeQuestionIds: string[];
  tutorStarterPrompt: string;
}

export interface QRResolutionResult {
  isValid: boolean;
  resource?: QRResourceRecord;
  resolvedAt: string;
  error?: string;
}

