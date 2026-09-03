/**
 * MOOS TECHY ACADEMY — CANONICAL VERSIONED BACKUP & RESTORE SCHEMA
 * 
 * Versioned, deterministic schema contracts for local application export,
 * safe import, safety snapshots, and offline disaster recovery.
 */

import { ExtendedLearnerProfile, QuestionAttempt, ExamSubmissionRecord, LearnerActivity } from "./learner";
import { DiagnosticResult, MasteryRecord } from "./curriculum";
import { CanonicalTutorSession } from "./entities";
import {
  TeacherClassroom,
  ClassroomAssignment,
  TeacherLessonPlan,
  LearnerInterventionPlan,
  TeacherInterventionRecommendation,
  ClassAnalyticsSnapshot
} from "./teacherStudio";

export const BACKUP_APPLICATION_ID = "moos-techy-academy";
export const CURRENT_BACKUP_SCHEMA_VERSION = 1;
export const PRE_RESTORE_SNAPSHOT_STORAGE_KEY = "moos_academy_pre_restore_snapshot_v1";

export type BackupScope = "full_academy" | "learner_only" | "teacher_only";

export interface BackupEntityCounts {
  learners: number;
  classrooms: number;
  assignments: number;
  lessonPlans: number;
  interventions: number;
  attempts: number;
  masteryRecords: number;
  diagnosticResults: number;
  examSubmissions: number;
  tutorSessions: number;
}

export interface BackupMetadata {
  schemaVersion: number;
  applicationId: string; // Must strictly equal "moos-techy-academy"
  backupId: string;
  exportedAt: string; // ISO 8601 string
  scope: BackupScope;
  appName: string;
  appVersion: string;
  sourceEnvironment: "browser_local_storage" | "cloud_relay_staging";
  entityCounts: BackupEntityCounts;
}

export interface BackupLearnerPayload {
  profile: ExtendedLearnerProfile;
  tutorSessions?: CanonicalTutorSession[];
}

export interface BackupTeacherPayload {
  teacherId: string;
  classrooms: TeacherClassroom[];
  assignments: ClassroomAssignment[];
  lessonPlans: TeacherLessonPlan[];
  interventions: LearnerInterventionPlan[];
  teacherInterventions: TeacherInterventionRecommendation[];
  classAnalytics?: ClassAnalyticsSnapshot;
}

export interface AcademyBackupPayload {
  learner?: BackupLearnerPayload;
  teacher?: BackupTeacherPayload;
}

export interface AcademyBackupEnvelope {
  schemaVersion: number;
  applicationId: typeof BACKUP_APPLICATION_ID;
  backupId: string;
  exportedAt: string;
  metadata: BackupMetadata;
  payload: AcademyBackupPayload;
  integrity: {
    signatureAlgorithm: "none_local_checksum" | "sha256_staging";
    payloadHash: string;
    isEncrypted: false;
  };
}

export interface ValidationIssue {
  severity: "error" | "warning";
  code: string;
  field: string;
  message: string;
}

export interface BackupValidationResult {
  isValid: boolean;
  schemaVersion: number;
  scope?: BackupScope;
  issues: ValidationIssue[];
  envelope?: AcademyBackupEnvelope;
  entityCounts?: BackupEntityCounts;
}

export interface RestorePreview {
  backupId: string;
  exportedAt: string;
  schemaVersion: number;
  scope: BackupScope;
  learnerName?: string;
  learnerEmail?: string;
  classroomsCount: number;
  assignmentsCount: number;
  attemptsCount: number;
  masteryCount: number;
  lessonPlansCount: number;
  warnings: string[];
  requiresConfirmation: boolean;
}

export interface SafetyRestoreSnapshot {
  snapshotId: string;
  createdAt: string;
  reason: string;
  state: {
    learnerStorageRaw: string | null;
    teacherStorageRaw: string | null;
    tutorSessionsRaw?: Record<string, string | null>;
  };
}

export interface RestoreResult {
  success: boolean;
  message: string;
  restoredScope: BackupScope;
  snapshotId?: string;
  restoredCounts: BackupEntityCounts;
  errors?: string[];
}
