/**
 * MOOS TECHY ACADEMY — CONTENT SATURATION & PEDAGOGICAL ENRICHMENT TYPES
 * 
 * Defines data structures for the 32-dimension Content Saturation Index,
 * Interactive Flashcards, Educational Visualizations, Interactive Activities,
 * Real-World Projects, Career Pathways, and Nigerian Language Localization.
 */

import { EducationalLevel, Subject } from "./curriculum";
import { AgentRole } from "./agentOrchestrator";
import { ElevenDepthMetrics, TopicGovernanceRecord } from "./contentGovernance";

export type SupportedLanguage = "en" | "yo" | "ig" | "ha";

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flagEmoji: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English (Academic Standard)", flagEmoji: "🇳🇬" },
  { code: "yo", name: "Yoruba", nativeName: "Èdè Yorùbá", flagEmoji: "🌍" },
  { code: "ig", name: "Igbo", nativeName: "Asụsụ Igbo", flagEmoji: "🌍" },
  { code: "ha", name: "Hausa", nativeName: "Harshen Hausa", flagEmoji: "🌍" }
];

export interface ConceptVernacularExplanation {
  conceptKey: string;
  conceptTitle: string;
  canonicalEnglish: string;
  yoruba: {
    title: string;
    summary: string;
    keyAnalogy: string;
    vocabularyTerms: Array<{ english: string; yoruba: string }>;
  };
  igbo: {
    title: string;
    summary: string;
    keyAnalogy: string;
    vocabularyTerms: Array<{ english: string; igbo: string }>;
  };
  hausa: {
    title: string;
    summary: string;
    keyAnalogy: string;
    vocabularyTerms: Array<{ english: string; hausa: string }>;
  };
}

export interface NigerianLanguageLocalization {
  skillId: string;
  pidgin?: {
    intuitionHook: string;
    commonPitfallSummary: string;
  };
  yoruba?: {
    intuitionHook: string;
    commonPitfallSummary: string;
  };
  igbo?: {
    intuitionHook: string;
    commonPitfallSummary: string;
  };
  hausa?: {
    intuitionHook: string;
    commonPitfallSummary: string;
  };
}

export type FlashcardCategory =
  | "concept"
  | "formula"
  | "vocabulary"
  | "definition"
  | "misconception"
  | "exam_trap"
  | "revision";

export interface FlashcardCard {
  id: string;
  skillId: string;
  front: string;
  back: string;
  category: FlashcardCategory;
  hint?: string;
  formulaLatex?: string;
  commonTrapNote?: string;
  examContext?: string; // e.g., "WAEC WASSCE 2024 Trap", "JAMB UTME High-Yield"
}

export interface FlashcardDeck {
  id: string;
  skillId: string;
  unitId: string;
  title: string;
  subjectId: string;
  level: EducationalLevel;
  cards: FlashcardCard[];
}

export type VisualizationType =
  | "bar_chart"
  | "line_chart"
  | "coordinate_graph"
  | "process_diagram"
  | "comparison_table"
  | "physics_schematic"
  | "chemistry_structure"
  | "biology_process"
  | "equilibrium_curve"
  | "flow_diagram"
  | "bar_comparison";

export interface ChartDataPoint {
  label: string;
  value?: number;
  x?: number;
  y?: number;
  description?: string;
  secondaryValue?: number;
  highlight?: boolean;
  tooltip?: string;
}

export interface VisualizationCurve {
  name: string;
  equation?: string;
  color: string;
  points: Array<{ x: number; y: number }>;
}

export interface EducationalVisualization {
  id: string;
  skillId: string;
  unitId?: string;
  title: string;
  type: VisualizationType;
  caption: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  axes?: {
    xLabel: string;
    yLabel: string;
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
  };
  dataPoints?: ChartDataPoint[];
  curves?: VisualizationCurve[];
  steps?: Array<{
    step?: number;
    stepNumber?: number;
    title: string;
    description: string;
    formulaOrKey?: string;
  }>;
  diagramSvgSnippet?: string;
  pedagogicalTakeaway?: string;
  takeaway?: string;
}

export type ActivityType =
  | "step_sequencing"
  | "step_sequencer"
  | "concept_sorting"
  | "concept_sorter"
  | "term_matching"
  | "term_matcher"
  | "error_diagnosis"
  | "error_detector"
  | "graph_interpretation";

export interface StepSequenceItem {
  id: string;
  stepText?: string;
  text?: string;
  correctPosition?: number;
  correctOrder?: number;
  explanation?: string;
}

export interface ConceptSortCategory {
  id?: string;
  name: string;
  correctItemIds?: string[];
  items?: Array<{ id: string; text: string; correctCategoryId: string; hint?: string }>;
}

export interface TermMatchPair {
  id: string;
  term: string;
  definition: string;
  context?: string;
}

export interface ErrorDiagnosisChallenge {
  id?: string;
  problemStatement?: string;
  incorrectWorkedSteps?: Array<{
    stepNumber: number;
    text: string;
    isError: boolean;
    errorExplanation?: string;
  }>;
  correctResolution?: string;
}

export interface InteractiveActivity {
  id: string;
  skillId: string;
  unitId?: string;
  title: string;
  type: ActivityType;
  instructions: string;
  timeEstimateMinutes?: number;
  pointsReward?: number;
  problemOrContext?: string;
  errorStepIndex?: number;
  explanation?: string;
  steps?: StepSequenceItem[];
  stepSequenceItems?: StepSequenceItem[];
  categories?: ConceptSortCategory[];
  conceptSortCategories?: ConceptSortCategory[];
  itemsToPlace?: Array<{ id: string; label: string }>;
  termMatchPairs?: TermMatchPair[];
  errorDiagnosis?: ErrorDiagnosisChallenge;
  rubricCriteria?: string[];
}

export interface RealWorldCaseStudy {
  id: string;
  title: string;
  industryContext: string;
  problemDescription: string;
  mathematicalOrScientificModels: string[];
  stepByStepInvestigation: string[];
  studentDeliverables: string[];
  pedagogicalAssessmentRubric: Array<{
    criterion: string;
    maxPoints: number;
    description: string;
  }>;
}

export interface PedagogicalProject {
  id: string;
  skillId: string;
  title: string;
  domain: string;
  level: EducationalLevel;
  objective: string;
  instructions: string[];
  expectedOutput: string;
  realWorldApplication: string;
  rubric: Array<{
    criterion: string;
    maxScore: number;
    excellentDescriptor: string;
  }>;
  reflectionPrompt: string;
}

export interface CareerPathway {
  id: string;
  title: string;
  iconName: string;
  summary: string;
  domain: string;
  salaryBandOrDemand: string;
  keySkills: string[];
  prerequisiteSkillIds: string[];
  recommendedCurriculumSubjects: string[];
  targetTertiaryPrograms: string[];
  milestones: Array<{
    level: string;
    objective: string;
    recommendedProject: string;
  }>;
}

export interface SchoolTenant {
  id: string;
  name: string;
  city: string;
  country: string;
  adminName: string;
  adminEmail: string;
  tier: "standard" | "professional" | "institutional";
  departmentsCount: number;
  totalTeachers: number;
  totalStudents: number;
  averageMasteryRate: number;
  activeAssessmentsCount: number;
  departments: Array<{
    id: string;
    name: string;
    headTeacher: string;
    subjects: string[];
    classesCount: number;
  }>;
}

export type SaturationClassification =
  | "EXISTS"
  | "ACCESSIBLE"
  | "USABLE"
  | "EDUCATIONALLY_ADEQUATE"
  | "DEEP"
  | "SATURATED";

export type GapSeverity =
  | "NO_GAP"
  | "LOW_PRIORITY_GAP"
  | "MODERATE_GAP"
  | "CRITICAL_GAP";

export type ActionPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export interface DimensionMetric {
  dimensionNumber: number; // 1 to 32
  id: string;
  name: string;
  measurementRule: string;
  numerator: number;
  denominator: number | null;
  score: number; // 0 to 100
  evidenceSource: string;
  classification: SaturationClassification;
  gapStatus: GapSeverity;
  priority: ActionPriority;
  recommendedSpecialistAgent: AgentRole;
  substanceDescription: string;
  verificationMethod: string;
}

export interface ContentGapItem {
  id: string;
  category: string;
  title: string;
  targetDomain: string;
  targetLevel: EducationalLevel | "all";
  targetSkillId?: string;
  deficiencyType:
    | "missing_worked_examples"
    | "low_question_density"
    | "missing_lesson_depth"
    | "missing_remediation"
    | "missing_extension"
    | "missing_flashcards"
    | "missing_visuals"
    | "missing_activities"
    | "weak_level_coverage"
    | "weak_exam_prep"
    | "weak_tertiary_prep"
    | "weak_subject_depth";
  severity: GapSeverity;
  priority: ActionPriority;
  priorityScore: number; // 1 to 100 based on 7-factor weighting
  rationale: string;
  recommendedSpecialist: AgentRole;
  status: "detected" | "assigned" | "in_generation" | "resolved";
}

export type GovernedLoopStage =
  | "SCAN_CURRICULUM"
  | "DETECT_GAPS"
  | "CLASSIFY_DEFICIENCY"
  | "PRIORITIZE"
  | "SELECT_SPECIALIST"
  | "GENERATE"
  | "VALIDATE"
  | "PEDAGOGICAL_QA"
  | "DIVERSITY_CHECK"
  | "DUPLICATION_CHECK"
  | "GOVERNANCE_GATE"
  | "STORE"
  | "EXPOSE"
  | "OBSERVE"
  | "RESCAN";

export interface GovernedLoopExecutionRecord {
  id: string;
  timestamp: string;
  stage: GovernedLoopStage;
  stageNumber: number; // 1 to 15
  agentId: AgentRole;
  actionSummary: string;
  evidenceData: Record<string, any>;
  governancePassed: boolean;
}

export interface MeaningfulEngagementPhase {
  phase: string;
  durationMinutes: number;
  resourceType: string;
  activityDescription: string;
}

export interface MeaningfulEngagementProfile {
  unitId: string;
  unitTitle: string;
  domain: string;
  level: EducationalLevel;
  totalEstimatedMinutes: number;
  hoursEquivalent: number;
  meetsTargetRange: boolean; // 3 to 5 hours (180 - 300 minutes)
  phasesBreakdown: MeaningfulEngagementPhase[];
  nonRepetitiveActivityCount: number;
}

export interface ContentSaturationMetrics {
  curriculumCoverage: number;
  lessonDepth: number;
  workedExamples: number;
  questionDensity: number;
  questionDiversity: number;
  hintQuality: number;
  misconceptionCoverage: number;
  guidedPractice: number;
  independentPractice: number;
  remediation: number;
  extension: number;
  revision: number;
  flashcards: number;
  charts: number;
  visualLearningMaterials: number;
  interactiveActivities: number;
  simulations: number;
  projects: number;
  realWorldApplications: number;
  diagnosticAssessments: number;
  unitAssessments: number;
  cumulativeAssessments: number;
  examPreparation: number;
  universityPreparation: number;
  careerPathways: number;
  teacherResources: number;
  parentResources: number;
  premiumLearnerResources: number;
  premiumTeacherResources: number;
  premiumParentResources: number;
  accessibility: number;
  nigerianLanguageAccessibility: number;
}

export interface ContentSaturationReport {
  timestamp: string;
  overallIndex: number; // 0 to 100
  previousScore: number;
  targetMet: boolean; // >= 70%
  statusTier: "Exceptional" | "Target Met" | "Needs Further Saturation";
  metrics: ContentSaturationMetrics;
  dimensions: DimensionMetric[]; // All 32 inspectable dimensions with complete telemetry
  detectedGaps: ContentGapItem[];
  governedLoopHistory: GovernedLoopExecutionRecord[];
  engagementProfiles: MeaningfulEngagementProfile[];
  domainScores: Record<string, { score: number; unitsCount: number; status: string }>;
  levelScores: Record<EducationalLevel, { score: number; unitsCount: number }>;
  flagshipCoverage: {
    mathematics: number;
    english: number;
    physics: number;
    chemistry: number;
    biology: number;
    computing: number;
    economics: number;
    financialLiteracy: number;
    examPrep: number;
    universityPrep: number;
    careerPathways: number;
  };
  totalCurriculumUnits: number;
  totalSkills: number;
  totalQuestions: number;
  totalFlashcards: number;
  totalVisualizations: number;
  totalActivities: number;
  totalProjects: number;
  elevenDepthMetrics?: ElevenDepthMetrics;
  catalogCoverage?: {
    totalCatalogSubjects: number;
    coveredCatalogSubjects: number;
    roadmapOnlySubjects: number;
    stageBreakdown: Array<{
      stage: string;
      catalogCount: number;
      authoredSubjectsCount: number;
      publishedUnitsCount: number;
    }>;
  };
  governanceSummary?: {
    approvalThreshold: number;
    approvedCount: number;
    isolatedCount: number;
    totalAuditedCount: number;
    averageApprovedQualityScore: number;
    disqualifiedUnitsCount: number;
    records: TopicGovernanceRecord[];
  };
  auditProvenance: {
    scannedUnitsCount: number;
    scannedSkillsCount: number;
    scannedQuestionsCount: number;
    scannedFlashcardsCount: number;
    scannedVisualsCount: number;
    scannedActivitiesCount: number;
    scannedProjectsCount: number;
    antiFakePenaltiesApplied: number;
    antiDuplicationFiltersApplied: number;
  };
}
