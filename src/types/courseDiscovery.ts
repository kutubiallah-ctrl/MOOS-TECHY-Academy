/**
 * MOOS TECHY ACADEMY — PREMIUM COURSE DISCOVERY & CATALOGUE MODEL
 * 
 * Scalable Course Discovery Chain:
 * COUNTRY -> EDUCATIONAL SYSTEM -> CURRICULUM -> EDUCATIONAL LEVEL -> SUBJECT -> COURSE -> UNIT -> TOPIC -> SKILL -> LEARNING RESOURCES
 * 
 * Fully represents all 19 Educational Categories.
 * Provides authentic, honest resource availability checks.
 */

import { EducationalLevel, CurriculumStandard, CountryCode, EducationSystemCode } from "./curriculum";

export type SubjectCategoryCode =
  | "mathematics"
  | "english_language"
  | "physics"
  | "chemistry"
  | "biology"
  | "computer_science"
  | "economics"
  | "government_civics"
  | "history"
  | "geography"
  | "literature"
  | "business_accounting"
  | "financial_literacy"
  | "agriculture"
  | "arts_humanities"
  | "exam_prep"
  | "university_prep"
  | "career_skills"
  | "clubs_projects"
  | (string & {});

export interface SubjectCategoryDefinition {
  code: SubjectCategoryCode;
  name: string;
  shortTitle: string;
  tagline: string;
  description: string;
  iconName: string;
  accentColor: string;
  isFlagship: boolean;
  activeLevels: EducationalLevel[];
  courseCount: number;
  keywords?: string[];
  stage?: "primary" | "secondary" | "advanced" | "all";
}

export interface CourseCatalogItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  subjectCategory: SubjectCategoryCode;
  level: EducationalLevel;
  curricula: CurriculumStandard[];
  description: string;
  estimatedWeeks: number;
  totalUnits: number;
  totalSkills: number;
  totalMasteryPoints: number;
  unitIds: string[];
  prerequisites: string[];
  readinessPathwayId?: string;
  masterclassCount: number;
  videoLessonsCount: number;
  hasInteractiveWorksheets: boolean;
  hasDiagnostic: boolean;
  hasTextbookQR: boolean;
  bannerGradient: string;
}

export interface TopicResourceAvailability {
  topicId: string;
  topicTitle: string;
  unitId: string;
  hasLessonGuide: boolean;
  hasWorkedExamples: boolean;
  hasGuidedPractice: boolean;
  hasFlashcards: boolean;
  hasVisualization: boolean;
  hasInteractiveActivity: boolean;
  hasVideoLesson: boolean;
  hasSmartBoardMasterclass: boolean;
  hasTutorMoosGuidance: boolean;
  hasDiagnosticAssessment: boolean;
  hasRemediationDrills: boolean;
  hasExtensionChallenges: boolean;
  hasTextbookQRCompanion: boolean;
  hasProjectOrLab: boolean;
  availableChannelsCount: number;
  totalChannelsCount: number;
}
