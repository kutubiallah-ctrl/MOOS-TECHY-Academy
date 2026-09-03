/**
 * MOOS TECHY ACADEMY — FUTURE HYBRID SYNCHRONIZATION CONTRACTS
 * 
 * Abstract interface definitions preparing the local-first repository architecture
 * for optional future multi-device synchronization without introducing remote databases,
 * external authentication, or cloud lock-in.
 * 
 * Architectural Rules:
 * 1. QuestionAttempt & ExamSubmissionRecord are strictly append-only time series.
 * 2. MasteryRecord is deterministically recomputable from question attempt evidence.
 * 3. ClassroomAssignment is teacher-authoritative.
 * 4. LearnerAssignmentProgress is mergeable by highest attempts/timestamp.
 * 5. Canonical curriculum is strictly read-only and never synchronized via user mutations.
 */

import { ExtendedLearnerProfile, QuestionAttempt, ExamSubmissionRecord } from "../../types/learner";
import { ClassroomAssignment, TeacherClassroom } from "../../types/teacherStudio";

export type SyncEntityType =
  | "learner_profile"
  | "question_attempt"
  | "mastery_record"
  | "diagnostic_result"
  | "exam_submission"
  | "classroom"
  | "classroom_assignment"
  | "learner_progress"
  | "teacher_intervention"
  | "lesson_plan";

export type SyncOperation = "INSERT" | "UPDATE" | "MERGE" | "DELETE_ARCHIVE";

export type SyncConflictStrategy =
  | "APPEND_ONLY"               // For attempts and exam logs — duplicates disallowed, new timestamps appended
  | "CLIENT_WINS"                // For local scratchpad preferences
  | "SERVER_AUTHORITATIVE"       // For teacher-assigned curriculum tasks
  | "DETERMINISTIC_RECOMPUTE"    // For learner mastery points (derived from validated attempts)
  | "TIMESTAMP_LATEST";          // For user profile metadata

export interface SyncChangeRecord<T = unknown> {
  entityType: SyncEntityType;
  entityId: string;
  operation: SyncOperation;
  timestamp: string; // ISO 8601
  clientVersion: number;
  payload: T;
  provenance: "LOCAL_DEVICE" | "CLOUD_RELAY_STAGING" | "TEACHER_STUDIO";
}

export interface SyncStatus {
  lastSyncTimestamp: string | null;
  pendingLocalChangesCount: number;
  isOnline: boolean;
  syncState: "idle" | "syncing" | "offline_mode" | "conflict_detected" | "error";
  lastError?: string;
}

/**
 * Abstract Sync Adapter interface for optional future relay integration.
 * In current local-first mode, this remains a dormant contract.
 */
export interface ISyncAdapter {
  getSyncStatus(): Promise<SyncStatus>;
  enqueueLocalChange<T>(change: Omit<SyncChangeRecord<T>, "timestamp">): Promise<void>;
  pullRemoteChanges(sinceTimestamp: string): Promise<SyncChangeRecord[]>;
  pushPendingChanges(): Promise<{ synchedCount: number; conflictsCount: number }>;
  resolveConflict(entityId: string, strategy: SyncConflictStrategy): Promise<void>;
}
