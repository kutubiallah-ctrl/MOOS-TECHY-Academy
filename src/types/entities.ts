/**
 * MOOS TECHY ACADEMY — CANONICAL ENTITY MODEL
 * 
 * Unified domain models across User Roles, Academic Curricula,
 * Assessment Engines, Diagnostic Benchmarks, QR Textbook Ecosystems,
 * Gamified Learning Arenas, and Socratic AI Tutoring.
 */

import {
  EducationalLevel,
  CurriculumStandard,
  MasteryStatus,
  CountryCode,
  EducationSystemCode,
  VerificationStatus,
  CurriculumVerificationMetadata,
  CurriculumStandardMapping,
  CanonicalCompetency
} from "./curriculum";
import { UserRole, AcademicContext } from "./learner";

// ==========================================
// 1. IDENTITY & USER ENTITIES
// ==========================================

export interface BaseUser {
  id: string;
  email: string;
  name: string;
  role: UserRole | "content_manager" | "author" | "bookpreneur";
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
}

export interface LearnerUser extends BaseUser {
  role: "learner";
  targetLevel: EducationalLevel;
  curriculum: CurriculumStandard;
  assignedTeacherIds?: string[];
  linkedParentIds?: string[];
}

export interface TeacherUser extends BaseUser {
  role: "teacher";
  schoolOrOrgName?: string;
  assignedClassIds: string[];
  assignedStudentIds: string[];
  department: string;
}

export interface ParentUser extends BaseUser {
  role: "parent";
  linkedStudentIds: string[];
  phone?: string;
  notificationPreferences: {
    weeklyDigest: boolean;
    struggleAlerts: boolean;
    streakMilestones: boolean;
  };
}

export interface AdministratorUser extends BaseUser {
  role: "admin";
  permissions: Array<"manage_users" | "manage_curriculum" | "view_analytics" | "system_settings">;
}

export interface ContentManagerUser extends BaseUser {
  role: "content_manager";
  managedSubjectIds: string[];
  canPublish: boolean;
}

export interface AuthorUser extends BaseUser {
  role: "author";
  authorCode: string;
  discipline: string;
  assignedTextbookIds: string[];
  bio: string;
}

export interface BookpreneurUser extends BaseUser {
  role: "bookpreneur";
  publishingFocus: string;
  projectIds: string[];
}

export type AppUser =
  | LearnerUser
  | TeacherUser
  | ParentUser
  | AuthorUser
  | BookpreneurUser
  | AdministratorUser
  | ContentManagerUser;

// ==========================================
// 2. CURRICULUM & CONTENT HIERARCHY ENTITIES
// ==========================================

export interface CanonicalDomain {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  accentColor: string;
  isFlagship: boolean;
  status: "active" | "expanding" | "roadmap";
  order: number;
}

export interface CanonicalSubject {
  id: string;
  domainId: string;
  title: string;
  code: string;
  description: string;
  iconName: string;
  levels: EducationalLevel[];
  curricula: CurriculumStandard[];
  order: number;
}

export interface CanonicalCourse {
  id: string;
  subjectId: string;
  level: EducationalLevel;
  curriculum: CurriculumStandard;
  title: string;
  code: string;
  description: string;
  unitIds: string[];
}

export interface CanonicalUnit {
  id: string;
  subjectId: string;
  level: EducationalLevel;
  title: string;
  code: string;
  description: string;
  order: number;
  category: "core" | "applied" | "exam_focus";
  skillIds: string[];
}

export interface CanonicalTopic {
  id: string;
  unitId: string;
  title: string;
  code: string;
  description?: string;
  order: number;
  skillIds: string[];
}

export interface CanonicalSkill {
  id: string;
  unitId: string;
  topicId?: string;
  title: string;
  code: string;
  summary: string;
  objectives: string[];
  difficulty: "foundational" | "intermediate" | "advanced";
  masteryPointsRequired: number;
  prerequisiteSkillIds?: string[];
  questionIds: string[];
  lessonIds?: string[];
}

export interface CanonicalLearningObjective {
  id: string;
  skillId: string;
  statement: string;
  bloomTaxonomyLevel: "remember" | "understand" | "apply" | "analyze" | "evaluate" | "create";
}

export interface CanonicalLesson {
  id: string;
  skillId: string;
  title: string;
  summary: string;
  contentMarkdown: string;
  formulaReferences?: string[];
  workedExampleIds?: string[];
  estimatedReadingMinutes: number;
}

export interface CanonicalQuestion {
  id: string;
  skillId: string;
  type: "multiple_choice" | "numeric_input" | "step_by_step";
  difficulty: "easy" | "medium" | "hard";
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
  curriculumStandard?: CurriculumStandard;
  authorId?: string;
}

export type {
  CountryCode,
  EducationSystemCode,
  VerificationStatus,
  CurriculumVerificationMetadata,
  CurriculumStandardMapping,
  CanonicalCompetency,
  AcademicContext
};

// ==========================================
// 3. LEARNER PROGRESSION & ATTEMPTS ENTITIES
// ==========================================

export interface CanonicalPracticeAttempt {
  id: string;
  learnerId: string;
  questionId: string;
  skillId: string;
  unitId: string;
  selectedOption: string;
  isCorrect: boolean;
  hintsUsedCount: number;
  timeSpentSeconds: number;
  misconceptionTriggered?: string;
  timestamp: string;
}

export interface CanonicalMasteryRecord {
  learnerId: string;
  skillId: string;
  status: MasteryStatus;
  points: number; // 0 to 100
  attempts: number;
  correctCount: number;
  lastPracticedAt: string;
}

export interface CanonicalDiagnosticResult {
  id: string;
  learnerId: string;
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

export interface CanonicalExamAttempt {
  id: string;
  learnerId: string;
  examId: string;
  examTitle: string;
  examType: string;
  submittedAt: string;
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  passingScore: number;
  passed: boolean;
  timeSpentSeconds: number;
  answers: Record<string, string>;
  topicBreakdown?: Array<{
    topic: string;
    correct: number;
    total: number;
  }>;
}

export interface CanonicalAchievement {
  id: string;
  code: string;
  title: string;
  description: string;
  iconName: string;
  category: "mastery" | "streak" | "exam" | "diagnostic" | "ai_collaboration" | "play";
  criteria: {
    type: "points" | "streak_days" | "skills_mastered" | "exam_passed";
    threshold: number;
  };
}

export interface CanonicalRecommendation {
  id: string;
  learnerId: string;
  type: "new_skill" | "remediation" | "revision" | "extension";
  skillId: string;
  unitId: string;
  reason: string;
  prerequisiteGap?: string;
  urgency: "high" | "medium" | "low";
  generatedAt: string;
}

export interface CanonicalLearningActivity {
  id: string;
  learnerId: string;
  type: "practice" | "diagnostic" | "exam" | "ai_tutor" | "formula_review" | "streak_milestone" | "play_arena" | "qr_companion";
  title: string;
  description: string;
  timestamp: string;
  pointsEarned: number;
  xpEarned: number;
  metadata?: {
    skillId?: string;
    unitId?: string;
    scorePercentage?: number;
    durationSeconds?: number;
    resourceCode?: string;
    playActivityId?: string;
  };
}

// ==========================================
// 4. QR TEXTBOOK ECOSYSTEM ENTITIES
// ==========================================

export interface CanonicalBook {
  id: string;
  code: string; // e.g. "CEMM-MTH-S1"
  title: string;
  subjectId: string;
  curriculumStandard: CurriculumStandard;
  edition: string;
  isbn?: string;
  authors: string[];
  publishedYear: number;
  chapterCount: number;
}

export interface CanonicalChapter {
  id: string;
  bookId: string;
  chapterNumber: number;
  title: string;
  summary: string;
}

export interface CanonicalSection {
  id: string;
  chapterId: string;
  sectionNumber: string; // e.g. "3.2"
  title: string;
  pageReference: string;
  skillId?: string;
}

export interface CanonicalQRResource {
  id: string;
  resourceCode: string; // "CEMM-CH3-SEC2-EX4"
  bookId: string;
  chapterId: string;
  sectionId?: string;
  pageReference: string;
  resourceType: "worked_example" | "exercise_companion" | "concept_deep_dive" | "learn_and_play" | "formula_reference" | "revision_checkpoint";
  title: string;
  subtitle: string;
  targetSkillId: string;
  targetUnitId: string;
  associatedPlayActivityId?: string;
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
  usageCount: number;
}

// ==========================================
// 5. SOCRATIC AI TUTOR & NOTIFICATION ENTITIES
// ==========================================

export interface CanonicalTutorSession {
  id: string;
  learnerId: string;
  subjectId: string;
  unitId?: string;
  skillId?: string;
  questionContext?: string;
  startedAt: string;
  endedAt?: string;
  messages: Array<{
    id: string;
    sender: "learner" | "tutor_moos";
    content: string;
    timestamp: string;
    socraticPedagogyType?: "hint" | "probing_question" | "misconception_correction" | "encouragement";
  }>;
}

export interface CanonicalNotification {
  id: string;
  recipientUserId: string;
  type: "streak_alert" | "mastery_unlocked" | "teacher_intervention" | "weekly_report";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}
