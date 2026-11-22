export type EducationalLevel =
  | "primary_foundations"
  | "upper_primary"
  | "junior_secondary"
  | "senior_secondary"
  | "university_prep"
  | "exam_prep";

export type CurriculumStandard =
  | "NERDC_NIGERIAN"
  | "WAEC_WASSCE"
  | "JAMB_UTME"
  | "CAMBRIDGE_IGCSE"
  | "IB_DIPLOMA"
  | "IJMB_NIGERIA"
  | "JUPEB_NIGERIA"
  | "CAMBRIDGE_AS_A_LEVEL"
  | "UNIVERSITY_PREPARATION"
  | "COMMON_ENTRANCE"
  | "GLOBAL_STEM";

export type CountryCode = "NG" | "UK" | "US" | "CA" | "JP" | "CN" | "KR" | "IN" | "AU" | "ZA" | "INTL" | string;

export type EducationSystemCode =
  | "NERDC"
  | "WAEC"
  | "JAMB"
  | "UK_NATIONAL"
  | "GCSE"
  | "A_LEVEL"
  | "US_CCSS"
  | "US_STATE"
  | "CAMBRIDGE_LOWER_SEC"
  | "CAMBRIDGE_IGCSE"
  | "CAMBRIDGE_AS_LEVEL"
  | "CAMBRIDGE_A_LEVEL"
  | "IB"
  | "IJMB"
  | "JUPEB"
  | "UNIVERSITY_PREP"
  | "CANADA_PROVINCIAL"
  | "JAPAN_MEXT"
  | "CHINA_NATIONAL"
  | "KOREA_CSAT"
  | "INDIA_CBSE"
  | "AUSTRALIA_ACARA"
  | "SOUTH_AFRICA_CAPS"
  | "GLOBAL_STEM";

export interface CurriculumVersionRecord {
  curriculumId: string;
  curriculumVersion: string;
  effectiveDate: string; // ISO date format (YYYY-MM-DD)
  country: CountryCode;
  educationalSystem: EducationSystemCode;
  qualification: string;
  subject: string;
  level: EducationalLevel;
  status: "ACTIVE" | "ARCHIVED" | "DRAFT" | "DEPRECATED";
  syllabusDocumentHash: string;
  progressionRules: string[];
}

export type VerificationStatus =
  | "VERIFIED_OFFICIAL"      // Direct 1:1 match verified against official government/board syllabus
  | "PLATFORM_MAPPING"        // Verified by internal academic lead for pedagogical equivalence
  | "PLATFORM_COMPETENCY"     // MOOS Academy core cognitive skill definition
  | "AI_SUGGESTED_MAPPING"    // Machine-inferred mapping pending human supervisor sign-off
  | "PENDING_VERIFICATION";   // Drafted standard awaiting syllabus document comparison

export interface CurriculumVerificationMetadata {
  sourceTitle: string;        // Official syllabus or regulatory document title
  sourceUrl?: string;         // Link to official source document
  sourceDate?: string;        // Publication/revision year of syllabus
  lastVerifiedAt?: string;    // ISO timestamp of last manual audit
  verifiedBy?: string;       // Human supervisor or educator ID
  confidence: number;        // Confidence rating between 0.0 and 1.0
  notes?: string;
}

export interface CurriculumStandardMapping {
  id: string;
  canonicalSkillId: string;
  country: CountryCode;
  jurisdiction?: string;      // e.g. "England", "Federal/NERDC", "California", "Texas"
  curriculumSystem: EducationSystemCode;
  educationLevel: string;     // e.g. "Senior Secondary", "Key Stage 4", "High School"
  gradeOrYear: string;        // e.g. "SS2", "Year 11", "Grade 10"
  subjectCode: string;        // e.g. "MTH", "0580", "MAT"
  standardIdentifier: string; // Official syllabus code, e.g. "WAEC-MTH-2024-3.2", "CCSS.MATH.CONTENT.HSA.REI.B.4.B"
  standardTitle: string;      // Official title from syllabus document
  terminologyOverrides?: {
    topicName?: string;
    skillName?: string;
    notationStyle?: "standard_form" | "scientific_notation" | "indices";
  };
  expectedMasteryScore: number;
  assessmentStyle: "multiple_choice_4opt" | "multiple_choice_5opt" | "stepped_written" | "cbt_timed";
  verificationStatus: VerificationStatus;
  verificationMetadata: CurriculumVerificationMetadata;
}

export interface CanonicalCompetency {
  id: string;
  domainId: string;
  subjectCode: string;
  title: string;
  code: string;
  description: string;
  prerequisiteCompetencyIds: string[];
  canonicalSkillIds: string[];
}

export type MasteryStatus = "unstarted" | "familiar" | "proficient" | "mastered";

export interface LearningDomain {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  accentColor: string;
  isFlagship: boolean;
  status: "active" | "expanding" | "roadmap";
  subjectsCount: number;
}

export interface Subject {
  id: string;
  domainId: string;
  title: string;
  code: string;
  description: string;
  iconName: string;
  levels: EducationalLevel[];
  curricula: CurriculumStandard[];
  unitsCount: number;
  totalMasteryPoints: number;
  stage?: "primary" | "secondary" | "advanced" | "all";
  keywords?: string[];
  tagline?: string;
  courseCount?: number;
}

export interface Topic {
  id: string;
  unitId: string;
  title: string;
  code: string;
  description?: string;
  order: number;
}

export interface PracticeQuestion {
  id: string;
  type: "multiple_choice" | "numeric_input" | "step_by_step";
  questionText: string;
  mathExpression?: string;
  contextText?: string;
  diagramSvg?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hintLadder: string[];
  misconceptionAlerts?: Array<{
    trigger: string;
    note: string;
  }>;
  skillId: string;
  difficulty: "easy" | "medium" | "hard";
  curriculumStandard?: CurriculumStandard;
}

export interface SkillLesson {
  id: string;
  title: string;
  hookAndIntuition: string;
  conceptualExplanation: string;
  conceptualModel?: string;
  keyTermsAndFormulas?: Array<{
    termOrSymbol: string;
    definition: string;
    practicalExample?: string;
  }>;
  workedExamples: Array<{
    title: string;
    problemStatement: string;
    mathExpression?: string;
    steps: Array<{
      stepNumber: number;
      instruction: string;
      reasoning: string;
    }>;
    takeawayRule: string;
  }>;
  commonMisconceptionsAndTraps?: Array<{
    misconception: string;
    whyItIsWrong: string;
    correctCorrection: string;
  }>;
  guidedPracticePrompt?: string;
  independentPracticePrompt?: string;
  diagnosticSelfCheck?: string;
  transferApplication?: string;
  masteryAssessment?: string;
  reflectionPrompt?: string;
  extensionActivity?: string;
  summaryRecap?: string;
  estimatedMinutes?: number;
}

export interface Skill {
  id: string;
  unitId: string;
  topicId?: string;
  title: string;
  code: string;
  summary: string;
  objectives: string[];
  difficulty: "foundational" | "intermediate" | "advanced";
  masteryPointsRequired: number;
  questions: PracticeQuestion[];
  prerequisiteSkillIds?: string[];
  lesson?: SkillLesson;
}

export interface Unit {
  id: string;
  subjectId: string;
  level: EducationalLevel;
  title: string;
  code: string;
  description: string;
  order: number;
  category: "core" | "applied" | "exam_focus";
  skills: Skill[];
  estimatedHours?: number;
  estimationMethod?: string;
  provenanceVersion?: string;
  isDeepSaturated?: boolean;
  curriculumStandardMappings?: string[];
}

export interface MasteryRecord {
  skillId: string;
  status: MasteryStatus;
  points: number; // 0 to 100
  attempts: number;
  correctCount: number;
  lastPracticedAt: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: "mastery" | "streak" | "exam" | "diagnostic" | "ai_collaboration";
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export interface DiagnosticResult {
  completedAt: string;
  score: number;
  total: number;
  percentage: number;
  tier: "Foundational" | "Emerging" | "Proficient" | "Advanced";
  summary: string;
  strengths: string[];
  gapAreas: string[];
  recommendedStartingUnit: string;
  pathwaySteps: Array<{
    order: number;
    unitName: string;
    focusReason: string;
    estimatedDays: number;
  }>;
}

export interface Recommendation {
  id: string;
  type: "new_skill" | "remediation" | "revision" | "extension";
  skill: Skill;
  unit: Unit;
  reason: string;
  prerequisiteGap?: string;
  urgency: "high" | "medium" | "low";
}

export interface ExamSimulation {
  id: string;
  title: string;
  subtitle: string;
  type: "COMMON_ENTRANCE" | "BECE_JUNIOR_WAEC" | "WASSCE_WAEC" | "JAMB_UTME" | "IGCSE_MATH";
  targetYear: string;
  timeLimitMinutes: number;
  questions: PracticeQuestion[];
  passingScore: number;
}

export interface TeacherIntervention {
  studentId: string;
  studentName: string;
  strugglingSkill: string;
  unitName: string;
  accuracyRate: number;
  suggestedAction: string;
  status: "pending" | "addressed";
}

export interface ParentChildSummary {
  childName: string;
  gradeLevel: string;
  weeklyMinutes: number;
  masteredSkillsCount: number;
  currentFocusUnit: string;
  streakDays: number;
  recentAchievements: string[];
  curriculumPacing: "On Track" | "Ahead" | "Needs Practice";
  aiAssistanceFrequency: string;
}

// ---------------------------------------------------------------------------
// DETERMINISTIC ASSIGNMENT & MASTERY PROGRESSION CANONICAL TYPES
// ---------------------------------------------------------------------------

export type AssignmentCompletionState =
  | "unstarted"
  | "started"
  | "in_progress"
  | "completed_with_improvement"
  | "completed_mastery_retained"
  | "completed_stagnant"
  | "mastery_regressed"
  | "intervention_required"
  | "abandoned"
  | "expired";

export interface AssignmentProgressRecord {
  learnerId: string;
  learnerName?: string;
  state: AssignmentCompletionState;
  preAssignmentMastery: number;
  postAssignmentMastery: number;
  masteryDelta: number;
  scorePercentage?: number;
  attemptsCount: number;
  hintsRequestedCount: number;
  retrievalIndependenceRate?: number;
  startedAt?: string;
  completedAt?: string;
  identifiedMisconceptions?: string[];
  effectivenessVerdict?:
    | "improvement_observed"
    | "performance_increased"
    | "mastery_evidence_strengthened"
    | "remediation_remains_unresolved"
    | "insufficient_evidence";
}

export interface Assignment {
  id: string;
  teacherId?: string;
  classroomId?: string;
  title: string;
  description?: string;
  unitId: string;
  skillId: string;
  assignmentType: "practice" | "guided_remediation" | "exam_prep" | "challenge" | "diagnostic";
  targetLearnerIds: string[]; // empty array denotes all learners in classroom
  dueDate: string;
  status: "draft" | "published" | "active" | "completed" | "archived" | "closed";
  completionState?: AssignmentCompletionState;
  provenance?: "OFFICIAL_SYLLABUS" | "PLATFORM_CONTENT" | "AI_GENERATED_DRAFT";
  createdAt: string;
  completedLearnerIds: string[];
  learnerProgress?: Record<string, AssignmentProgressRecord>;
  differentiationConfig?: {
    adaptiveDifficulty?: boolean;
    prerequisiteWarmupEnabled?: boolean;
    hintScaffoldingIntensity?: "standard" | "high" | "minimal";
    learnerDifficultyOverrides?: Record<string, "introductory" | "standard" | "advanced">;
  };
}

// Re-export canonical profile from learner module
export type { LearnerProfile, ExtendedLearnerProfile } from "./learner";

