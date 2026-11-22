/**
 * MOOS TECHY ACADEMY — LEARNER ACHIEVEMENT & CONTROLLED CERTIFICATE MODEL
 * 
 * Strict Evidence-Based Recognition:
 * Never awarded just for clicking through content!
 * Every certificate and achievement must link directly to verified demonstration:
 * - 100% unit completion or >= 80% mastery
 * - Verified assessment performance
 * - Co-curricular STEM / Club project completion
 * - Readiness pathway certification
 */

export type AchievementCategory =
  | "TOPIC_COMPLETED"
  | "UNIT_COMPLETED"
  | "COURSE_COMPLETED"
  | "SKILL_MASTERED"
  | "READINESS_ACHIEVED"
  | "REVISION_MILESTONE"
  | "PROBLEM_SOLVING"
  | "STEM_PROJECT"
  | "CODING_PROJECT"
  | "CLUB_PROJECT"
  | "MASTERCLASS_COMPLETED"
  | "ASSESSMENT_ACHIEVEMENT"
  | "LEARNING_STREAK";

export type CertificateCategory =
  | "COURSE_COMPLETION"
  | "SKILL_MASTERY"
  | "PROJECT_COMPLETION"
  | "CLUB_ACHIEVEMENT"
  | "MASTERCLASS_COMPLETION"
  | "LEARNING_PROGRAMME";

export interface AchievementRecord {
  id: string;
  learnerId: string;
  category: AchievementCategory;
  title: string;
  description: string;
  iconName: string;
  badgeColor: string;
  earnedAt: string;
  evidence: {
    referenceType: "skill" | "unit" | "course" | "readiness" | "club" | "exam" | "streak";
    referenceId: string;
    demonstratedScoreOrPoints: number;
    completionCriterion: string;
  };
  xpEarned: number;
  unlockedCertificateId?: string;
}

export interface ControlledCertificate {
  id: string; // e.g. "MOOS-CERT-2026-8831"
  verificationCode: string; // e.g. "MOOS-VERIF-9B2F-7A1C"
  learnerId: string;
  learnerName: string;
  category: CertificateCategory;
  title: string;
  subjectOrProgramme: string;
  educationalLevel: string;
  issuer: string; // "MOOS TECHY ACADEMY — Academic Council & Standards Board"
  jurisdiction: string; // e.g. "West African & International STEM Framework"
  issuedAt: string;
  status: "ISSUED" | "VERIFIED" | "HONOR_ROLL";
  evidenceSummary: {
    criterion: string;
    scoreOrPercentage: string;
    completedUnitsOrModules: number;
    totalMasteryPointsAttained: number;
  };
  signatories: Array<{
    name: string;
    title: string;
    department: string;
  }>;
}
