import { MasteryRecord } from "../types/curriculum";
import {
  ExamSubmissionRecord,
  ExtendedLearnerProfile,
  LearnerActivity,
  QuestionAttempt
} from "../types/learner";
import { computeTotalMasteryPoints } from "./masteryEngine";

const MAX_QUESTION_ATTEMPTS = 300;
const MAX_ACTIVITY_HISTORY = 100;
const MAX_EXAM_HISTORY = 50;
const MAX_DIAGNOSTIC_HISTORY = 30;

function toEpochMs(isoOrAny: unknown): number {
  if (typeof isoOrAny !== "string" || !isoOrAny) return 0;
  const ms = Date.parse(isoOrAny);
  return Number.isFinite(ms) ? ms : 0;
}

export function deduplicateById<T extends { id?: string }>(
  primary: T[] = [],
  secondary: T[] = [],
  timestampSelector: (item: T) => string | undefined,
  maxItems: number
): T[] {
  const byId = new Map<string, T>();
  const addAll = (list: T[]) => {
    for (const item of list) {
      if (!item || typeof item !== "object") continue;
      const key =
        item.id ||
        `${timestampSelector(item) || ""}-${JSON.stringify(item).slice(0, 64)}`;
      if (!byId.has(key)) {
        byId.set(key, item);
      }
    }
  };

  addAll(primary);
  addAll(secondary);

  return Array.from(byId.values())
    .sort((a, b) => toEpochMs(timestampSelector(b)) - toEpochMs(timestampSelector(a)))
    .slice(0, maxItems);
}

export function mergeMasteryRecords(
  baseRecords: Record<string, MasteryRecord> = {},
  incomingRecords: Record<string, MasteryRecord> = {}
): Record<string, MasteryRecord> {
  const merged: Record<string, MasteryRecord> = { ...baseRecords };

  for (const [skillId, inc] of Object.entries(incomingRecords || {})) {
    if (!inc || typeof inc !== "object") continue;
    const prev = merged[skillId];
    if (!prev) {
      merged[skillId] = inc;
      continue;
    }

    const prevTs = toEpochMs(prev.lastPracticedAt);
    const incTs = toEpochMs(inc.lastPracticedAt);

    if (incTs > prevTs) {
      merged[skillId] = inc;
    } else if (incTs === prevTs) {
      merged[skillId] = (inc.attempts || 0) >= (prev.attempts || 0) ? inc : prev;
    } else {
      merged[skillId] = prev;
    }
  }

  return merged;
}

export interface ProgressMergeResult {
  merged: Record<string, any>;
  staleWriteProtected: boolean;
  conflictResolved: boolean;
}

/**
 * Deterministic, idempotent, conflict-safe merge for LearnerProfile / server progress payloads.
 * - Deduplicates attempts, activities, exams, diagnostics, and badges.
 * - Merges masteryRecords per-skill by newest practice timestamp / evidence count.
 * - Protects newer scalar profile fields from being overwritten by concurrent stale snapshots.
 * - Recomputes masteryPoints canonically from merged masteryRecords when available.
 */
export function mergeLearnerProgressPayloads(
  existing: Record<string, any> | null | undefined,
  incoming: Record<string, any> | null | undefined
): ProgressMergeResult {
  const base = existing && typeof existing === "object" ? existing : {};
  const next = incoming && typeof incoming === "object" ? incoming : {};

  const existingTime = toEpochMs(base.updatedAt);
  const incomingTime = toEpochMs(next.updatedAt);
  const existingRevision = typeof base.syncRevision === "number" ? base.syncRevision : 0;
  const incomingRevision = typeof next.syncRevision === "number" ? next.syncRevision : 0;

  const isStrictlyOlderTimestamp =
    existingTime > 0 && incomingTime > 0 && incomingTime < existingTime;
  const isStaleBaseRevision =
    typeof next.baseRevision === "number" &&
    existingRevision > 0 &&
    next.baseRevision < existingRevision;

  const staleWriteProtected = isStrictlyOlderTimestamp || isStaleBaseRevision;
  const conflictResolved = staleWriteProtected;

  // Newer wins for scalar configuration fields; stale payloads still contribute array/skill unions
  const newerSource = staleWriteProtected ? base : next;
  const olderSource = staleWriteProtected ? next : base;

  const existingAttempts: QuestionAttempt[] = Array.isArray(base.questionAttempts)
    ? base.questionAttempts
    : [];
  const incomingAttempts: QuestionAttempt[] = Array.isArray(next.questionAttempts)
    ? next.questionAttempts
    : [];
  const mergedAttempts = deduplicateById(
    newerSource === next ? incomingAttempts : existingAttempts,
    olderSource === next ? incomingAttempts : existingAttempts,
    (a) => a.timestamp,
    MAX_QUESTION_ATTEMPTS
  );

  const existingActivities: LearnerActivity[] = Array.isArray(base.activityHistory)
    ? base.activityHistory
    : Array.isArray(base.recentActivities)
    ? base.recentActivities
    : [];
  const incomingActivities: LearnerActivity[] = Array.isArray(next.activityHistory)
    ? next.activityHistory
    : Array.isArray(next.recentActivities)
    ? next.recentActivities
    : [];
  const mergedActivities = deduplicateById(
    newerSource === next ? incomingActivities : existingActivities,
    olderSource === next ? incomingActivities : existingActivities,
    (a) => a.timestamp,
    MAX_ACTIVITY_HISTORY
  );

  const existingExams: ExamSubmissionRecord[] = Array.isArray(base.examHistory)
    ? base.examHistory
    : [];
  const incomingExams: ExamSubmissionRecord[] = Array.isArray(next.examHistory)
    ? next.examHistory
    : [];
  const mergedExams = deduplicateById(
    newerSource === next ? incomingExams : existingExams,
    olderSource === next ? incomingExams : existingExams,
    (e) => e.submittedAt,
    MAX_EXAM_HISTORY
  );

  const existingDiagnostics = Array.isArray(base.diagnosticHistory)
    ? base.diagnosticHistory
    : [];
  const incomingDiagnostics = Array.isArray(next.diagnosticHistory)
    ? next.diagnosticHistory
    : [];
  const diagMap = new Map<string, any>();
  for (const d of [...incomingDiagnostics, ...existingDiagnostics]) {
    if (d && typeof d === "object") {
      const key = d.completedAt || JSON.stringify(d).slice(0, 64);
      if (!diagMap.has(key)) diagMap.set(key, d);
    }
  }
  const mergedDiagnostics = Array.from(diagMap.values())
    .sort((a, b) => toEpochMs(b.completedAt) - toEpochMs(a.completedAt))
    .slice(0, MAX_DIAGNOSTIC_HISTORY);

  const mergedBadges = Array.from(
    new Set([
      ...(Array.isArray(base.unlockedBadges) ? base.unlockedBadges : []),
      ...(Array.isArray(next.unlockedBadges) ? next.unlockedBadges : [])
    ])
  );

  const mergedMasteryRecords = mergeMasteryRecords(
    base.masteryRecords || {},
    next.masteryRecords || {}
  );

  const hasMasteryRecords = Object.keys(mergedMasteryRecords).length > 0;
  const canonicalMasteryPoints = hasMasteryRecords
    ? computeTotalMasteryPoints(mergedMasteryRecords)
    : Number.isFinite(newerSource.masteryPoints)
    ? newerSource.masteryPoints
    : Number.isFinite(olderSource.masteryPoints)
    ? olderSource.masteryPoints
    : 0;

  // Monotonic XP and study minutes across concurrent edits when same user progresses offline
  const mergedXp = staleWriteProtected
    ? Math.max(Number(base.xp) || 0, Number(next.xp) || 0)
    : next.xp ?? base.xp ?? 0;

  const mergedMinutes = Math.max(
    Number(base.totalStudyMinutes ?? base.totalMinutesStudied ?? 0) || 0,
    Number(next.totalStudyMinutes ?? next.totalMinutesStudied ?? 0) || 0
  );

  const mergedRevision = Math.max(existingRevision, incomingRevision) + 1;
  const nowIso = new Date().toISOString();
  const effectiveUpdatedAt =
    staleWriteProtected && existingTime > 0
      ? base.updatedAt
      : next.updatedAt || base.updatedAt || nowIso;

  const merged: Record<string, any> = {
    ...base,
    ...next,
    // Ensure scalar fields from newer source aren't clobbered by older concurrent writes
    name: newerSource.name ?? olderSource.name,
    targetLevel: newerSource.targetLevel ?? olderSource.targetLevel,
    curriculum: newerSource.curriculum ?? olderSource.curriculum,
    academicContext: newerSource.academicContext ?? olderSource.academicContext,
    selectedSubjectIds:
      Array.isArray(newerSource.selectedSubjectIds) && newerSource.selectedSubjectIds.length > 0
        ? newerSource.selectedSubjectIds
        : olderSource.selectedSubjectIds,
    activeSubjectId: newerSource.activeSubjectId ?? olderSource.activeSubjectId,
    activeUnitId: newerSource.activeUnitId ?? olderSource.activeUnitId,
    streak: newerSource.streak ?? olderSource.streak,
    streakDays: newerSource.streakDays ?? olderSource.streakDays,
    preferences: newerSource.preferences ?? olderSource.preferences,
    diagnosticsCompleted: Boolean(base.diagnosticsCompleted || next.diagnosticsCompleted),
    lastDiagnosticResult:
      mergedDiagnostics[0] || newerSource.lastDiagnosticResult || olderSource.lastDiagnosticResult,
    diagnosticHistory: mergedDiagnostics,
    masteryRecords: mergedMasteryRecords,
    masteryPoints: canonicalMasteryPoints,
    xp: mergedXp,
    level: Math.floor((Number(mergedXp) || 0) / 250) + 1,
    totalStudyMinutes: mergedMinutes,
    questionAttempts: mergedAttempts,
    activityHistory: mergedActivities,
    examHistory: mergedExams,
    unlockedBadges: mergedBadges,
    completedSkills: Object.keys(mergedMasteryRecords),
    syncRevision: mergedRevision,
    updatedAt: effectiveUpdatedAt
  };

  // Strip control-only fields
  delete merged.baseRevision;
  delete merged.strictConflictCheck;

  return {
    merged,
    staleWriteProtected,
    conflictResolved
  };
}

export function mergeLearnerProfiles(
  localProfile: ExtendedLearnerProfile,
  remoteData: Partial<ExtendedLearnerProfile> | Record<string, any>
): ExtendedLearnerProfile {
  const result = mergeLearnerProgressPayloads(localProfile, remoteData);
  return {
    ...localProfile,
    ...(result.merged as Partial<ExtendedLearnerProfile>),
    id: localProfile.id
  };
}
