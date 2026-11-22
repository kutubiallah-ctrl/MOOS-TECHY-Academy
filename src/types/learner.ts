import {
  EducationalLevel,
  CurriculumStandard,
  MasteryRecord,
  DiagnosticResult,
  PracticeQuestion,
  CountryCode,
  EducationSystemCode
} from "./curriculum";
import { ResourceProvenance } from "./learningSupply";

export type UserRole = "learner" | "teacher" | "parent" | "admin";

export interface AcademicContext {
  country: CountryCode;
  educationSystem: EducationSystemCode;
  gradeOrYear: string;
  targetExamPathway?: string;
  jurisdiction?: string;
  interfaceLanguage?: string;
  learningLanguage?: string;
  localHeritageLanguage?: string;
  onboardingCompleted?: boolean;
}

export interface QuestionAttempt {
  id: string;
  questionId: string;
  skillId: string;
  selectedOption: string;
  isCorrect: boolean;
  hintsUsedCount: number;
  timeSpentSeconds: number;
  misconceptionTriggered?: string;
  provenance?: ResourceProvenance;
  isAiGenerated?: boolean;
  generatorAgent?: string;
  timestamp: string;
}

export interface LearnerActivity {
  id: string;
  type: "practice" | "diagnostic" | "exam" | "ai_tutor" | "formula_review" | "streak_milestone";
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
  };
}

export interface ExamSubmissionRecord {
  id: string;
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

export interface LearnerStreak {
  count: number;
  lastActiveDate: string; // YYYY-MM-DD
  longestStreak: number;
}

export interface LearnerPreferences {
  socraticMode: "guided" | "direct" | "challenging";
  highContrast: boolean;
  soundEffects: boolean;
  dailyGoalMinutes: number;
}

export interface LearnerProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarSeed?: string;
  targetLevel: EducationalLevel;
  curriculum: CurriculumStandard;
  academicContext?: AcademicContext;
  selectedSubjectIds: string[];
  activeSubjectId: string;
  activeUnitId: string;
  learningGoals: string[];
  targetExamDate?: string;
  
  // Analytics & Progression
  streak: LearnerStreak;
  streakDays: number;
  masteryPoints: number;
  xp: number;
  level: number;
  totalStudyMinutes: number;
  
  // Diagnostic State
  diagnosticsCompleted: boolean;
  lastDiagnosticResult?: DiagnosticResult;
  diagnosticHistory: DiagnosticResult[];
  
  // Mastery & Attempts
  masteryRecords: Record<string, MasteryRecord>;
  questionAttempts: QuestionAttempt[];
  activityHistory: LearnerActivity[];
  examHistory: ExamSubmissionRecord[];
  unlockedBadges: string[];
  
  // Settings
  preferences: LearnerPreferences;
  createdAt: string;
  updatedAt: string;
}

// Canonical alias for complete backward compatibility
export type ExtendedLearnerProfile = LearnerProfile;

