import { MasteryRecord, MasteryStatus } from "../types/curriculum";
import { QuestionAttempt } from "../types/learner";

export type CanonicalLearnerMasteryState =
  | "unstarted"
  | "introduced"
  | "practising"
  | "proficient"
  | "mastered";

export const CANONICAL_MASTERY_STATES: readonly CanonicalLearnerMasteryState[] = [
  "introduced",
  "practising",
  "proficient",
  "mastered"
] as const;

export const MASTERY_THRESHOLDS = {
  // Minimum evidence guards
  MIN_ATTEMPTS_FOR_PRACTISING: 2,
  MIN_ATTEMPTS_FOR_PROFICIENT: 4,
  MIN_INDEPENDENT_CORRECT_FOR_PROFICIENT: 2,
  MIN_DISTINCT_QUESTIONS_FOR_PROFICIENT: 2,

  MIN_ATTEMPTS_FOR_MASTERED: 6,
  MIN_INDEPENDENT_CORRECT_FOR_MASTERED: 4,
  MIN_DISTINCT_QUESTIONS_FOR_MASTERED: 3,

  // Weighted & rolling accuracy gates (0..100 or 0..1)
  PRACTISING_WEIGHTED_SCORE: 38,
  PROFICIENT_WEIGHTED_SCORE: 72,
  PROFICIENT_RECENT_WEIGHTED_SCORE: 68,
  PROFICIENT_RECENT_RAW_ACCURACY: 0.70,

  MASTERED_WEIGHTED_SCORE: 88,
  MASTERED_RECENT_WEIGHTED_SCORE: 85,
  MASTERED_RECENT_RAW_ACCURACY: 0.80,
  MASTERED_INDEPENDENT_SHARE_OF_CORRECT: 0.70,

  // Hint weights
  HINT_CREDIT_0: 1.0,
  HINT_CREDIT_1: 0.72,
  HINT_CREDIT_2: 0.50,
  HINT_CREDIT_3_PLUS: 0.35,

  // Recency decay parameters
  INDEX_DECAY_FACTOR: 0.82,
  HALF_LIFE_DAYS: 45,
  RECENT_WINDOW_SIZE: 5
} as const;

/**
 * Normalizes legacy statuses (such as "familiar") into the canonical 4-state learner model.
 */
export function normalizeMasteryStatus(
  status?: MasteryStatus | string,
  points: number = 0
): CanonicalLearnerMasteryState {
  switch (status) {
    case "mastered":
      return "mastered";
    case "proficient":
      return "proficient";
    case "practising":
      return "practising";
    case "introduced":
      return "introduced";
    case "familiar":
      return points >= 40 ? "practising" : "introduced";
    case "unstarted":
    default:
      return points > 0 ? "introduced" : "unstarted";
  }
}

export function formatMasteryStatusLabel(
  status?: MasteryStatus | string,
  points: number = 0
): string {
  const normalized = normalizeMasteryStatus(status, points);
  switch (normalized) {
    case "mastered":
      return "Mastered";
    case "proficient":
      return "Proficient";
    case "practising":
      return "Practising";
    case "introduced":
      return "Introduced";
    case "unstarted":
    default:
      return "Unstarted";
  }
}

/**
 * Hint weighting reduces the mastery credit of assisted correctness without
 * turning honest scaffolded practice into negative penalty.
 */
export function computeHintCredit(isCorrect: boolean, hintsUsedCount: number = 0): number {
  if (!isCorrect) return 0;
  const hints = Math.max(0, Number(hintsUsedCount) || 0);
  if (hints === 0) return MASTERY_THRESHOLDS.HINT_CREDIT_0;
  if (hints === 1) return MASTERY_THRESHOLDS.HINT_CREDIT_1;
  if (hints === 2) return MASTERY_THRESHOLDS.HINT_CREDIT_2;
  return MASTERY_THRESHOLDS.HINT_CREDIT_3_PLUS;
}

/**
 * Canonical single source of truth for profile.masteryPoints: always equals
 * the sum of skill points in masteryRecords (eliminates activity double-counting).
 */
export function computeTotalMasteryPoints(
  masteryRecords?: Record<string, MasteryRecord>
): number {
  if (!masteryRecords) return 0;
  return Object.values(masteryRecords).reduce(
    (sum, rec) => sum + (Number.isFinite(rec?.points) ? Math.max(0, Math.min(100, rec.points)) : 0),
    0
  );
}

export interface EvaluateSkillMasteryInput {
  skillId: string;
  attempts: QuestionAttempt[];
  existingRecord?: MasteryRecord;
  nowMs?: number;
}

/**
 * Authoritative authentic mastery evaluator shared across PracticeArena,
 * LocalLearnerRepository, and AnalyticsService.
 *
 * Properties enforced:
 * 1. Completion without accuracy yields zero proficiency progression.
 * 2. Assisted performance (hints > 0) is weighted down and capped below Proficient/Mastered.
 * 3. Recency decay ensures newer failures reversibly downgrade Proficient/Mastered status.
 * 4. Minimum evidence guards block premature proficiency or mastery from 1-3 items.
 */
export function evaluateSkillMastery(input: EvaluateSkillMasteryInput): MasteryRecord {
  const nowMs = input.nowMs ?? Date.now();
  const matching = (input.attempts || [])
    .filter((a) => a && a.skillId === input.skillId)
    .map((a, idx) => ({
      attempt: a,
      originalIndex: idx,
      tsMs: a.timestamp ? new Date(a.timestamp).getTime() : 0
    }));

  // Sort newest first; preserve array index order for identical timestamps
  // (since recordQuestionAttempt prepends newest items at index 0).
  matching.sort((a, b) => {
    const aValid = Number.isFinite(a.tsMs) ? a.tsMs : 0;
    const bValid = Number.isFinite(b.tsMs) ? b.tsMs : 0;
    if (bValid !== aValid) return bValid - aValid;
    return a.originalIndex - b.originalIndex;
  });

  if (matching.length === 0) {
    return (
      input.existingRecord || {
        skillId: input.skillId,
        status: "unstarted",
        points: 0,
        attempts: 0,
        correctCount: 0,
        lastPracticedAt: ""
      }
    );
  }

  let totalWeight = 0;
  let weightedCreditSum = 0;
  let correctCount = 0;
  let independentAttemptsCount = 0;
  let independentCorrectCount = 0;
  let assistedCorrectCount = 0;
  const distinctQuestions = new Set<string>();

  matching.forEach((entry, rank) => {
    const att = entry.attempt;
    const hints = Math.max(0, Number(att.hintsUsedCount) || 0);
    const credit = computeHintCredit(Boolean(att.isCorrect), hints);

    if (att.isCorrect) {
      correctCount++;
      if (hints === 0) {
        independentCorrectCount++;
      } else {
        assistedCorrectCount++;
      }
    }
    if (hints === 0) {
      independentAttemptsCount++;
    }

    distinctQuestions.add(att.questionId || att.id);

    const ageDays =
      entry.tsMs > 0 && nowMs > entry.tsMs
        ? (nowMs - entry.tsMs) / (1000 * 60 * 60 * 24)
        : 0;
    const indexDecay = Math.pow(MASTERY_THRESHOLDS.INDEX_DECAY_FACTOR, rank);
    const timeDecay = Math.pow(0.5, ageDays / MASTERY_THRESHOLDS.HALF_LIFE_DAYS);
    const weight = Math.max(0.05, indexDecay * timeDecay);

    totalWeight += weight;
    weightedCreditSum += credit * weight;
  });

  const totalAttempts = matching.length;
  const weightedScore = totalWeight > 0 ? (weightedCreditSum / totalWeight) * 100 : 0;

  // Rolling recent window (up to 5 most recent attempts)
  const recentSlice = matching.slice(0, MASTERY_THRESHOLDS.RECENT_WINDOW_SIZE);
  let recentWeightSum = 0;
  let recentCreditSum = 0;
  let recentCorrect = 0;

  recentSlice.forEach((entry, idx) => {
    const att = entry.attempt;
    const credit = computeHintCredit(Boolean(att.isCorrect), att.hintsUsedCount);
    if (att.isCorrect) recentCorrect++;
    const w = Math.pow(0.88, idx);
    recentWeightSum += w;
    recentCreditSum += credit * w;
  });

  const recentWeightedScore = recentWeightSum > 0 ? (recentCreditSum / recentWeightSum) * 100 : 0;
  const recentRawAccuracy = recentSlice.length > 0 ? recentCorrect / recentSlice.length : 0;
  const independentAccuracy =
    independentAttemptsCount > 0
      ? Math.round((independentCorrectCount / independentAttemptsCount) * 100)
      : 0;
  const distinctQuestionsCount = distinctQuestions.size;
  const independentShareOfCorrect =
    correctCount > 0 ? independentCorrectCount / correctCount : 0;

  let status: CanonicalLearnerMasteryState = "introduced";
  let points = 0;
  let reason = "";

  if (correctCount === 0) {
    // 0% accuracy never yields proficiency or inflated mastery points regardless of completion count.
    status = "introduced";
    points = 0;
    reason = `Concept introduced across ${totalAttempts} attempt(s), 0% accuracy — no mastery credit awarded yet.`;
  } else if (totalAttempts === 1) {
    // Insufficient evidence guard: 1 attempt cannot reach Practising/Proficient/Mastered.
    status = "introduced";
    points = Math.min(35, Math.max(10, Math.round(weightedScore * 0.35)));
    reason = `Introduced (${totalAttempts} attempt): insufficient assessment evidence for proficiency.`;
  } else if (totalAttempts < MASTERY_THRESHOLDS.MIN_ATTEMPTS_FOR_PROFICIENT) {
    // 2-3 attempts: can reach Practising, guarded from Proficient/Mastered.
    const combined = weightedScore * 0.6 + recentWeightedScore * 0.4;
    if (combined >= MASTERY_THRESHOLDS.PRACTISING_WEIGHTED_SCORE) {
      status = "practising";
      points = Math.min(68, Math.max(40, Math.round(combined * 0.68)));
      reason = `Practising (${totalAttempts} attempts, ${Math.round(combined)}% weighted score); more independent evidence needed for Proficient.`;
    } else {
      status = "introduced";
      points = Math.min(39, Math.max(5, Math.round(combined * 0.45)));
      reason = `Introduced (${totalAttempts} attempts, ${Math.round(combined)}% weighted score).`;
    }
  } else {
    // >= 4 attempts: check Mastered -> Proficient -> Practising -> Introduced (fully reversible)
    const meetsMastered =
      totalAttempts >= MASTERY_THRESHOLDS.MIN_ATTEMPTS_FOR_MASTERED &&
      independentCorrectCount >= MASTERY_THRESHOLDS.MIN_INDEPENDENT_CORRECT_FOR_MASTERED &&
      distinctQuestionsCount >= MASTERY_THRESHOLDS.MIN_DISTINCT_QUESTIONS_FOR_MASTERED &&
      weightedScore >= MASTERY_THRESHOLDS.MASTERED_WEIGHTED_SCORE &&
      recentWeightedScore >= MASTERY_THRESHOLDS.MASTERED_RECENT_WEIGHTED_SCORE &&
      recentRawAccuracy >= MASTERY_THRESHOLDS.MASTERED_RECENT_RAW_ACCURACY &&
      independentShareOfCorrect >= MASTERY_THRESHOLDS.MASTERED_INDEPENDENT_SHARE_OF_CORRECT;

    const meetsProficient =
      totalAttempts >= MASTERY_THRESHOLDS.MIN_ATTEMPTS_FOR_PROFICIENT &&
      independentCorrectCount >= MASTERY_THRESHOLDS.MIN_INDEPENDENT_CORRECT_FOR_PROFICIENT &&
      distinctQuestionsCount >= MASTERY_THRESHOLDS.MIN_DISTINCT_QUESTIONS_FOR_PROFICIENT &&
      weightedScore >= MASTERY_THRESHOLDS.PROFICIENT_WEIGHTED_SCORE &&
      recentWeightedScore >= MASTERY_THRESHOLDS.PROFICIENT_RECENT_WEIGHTED_SCORE &&
      recentRawAccuracy >= MASTERY_THRESHOLDS.PROFICIENT_RECENT_RAW_ACCURACY;

    const combinedScore = weightedScore * 0.6 + recentWeightedScore * 0.4;

    if (meetsMastered) {
      status = "mastered";
      points = Math.min(100, Math.max(90, Math.round(weightedScore * 0.65 + recentWeightedScore * 0.35)));
      reason = `Mastered across ${totalAttempts} attempts (${distinctQuestionsCount} distinct items, ${independentCorrectCount} independent correct).`;
    } else if (meetsProficient) {
      status = "proficient";
      points = Math.min(89, Math.max(70, Math.round(combinedScore)));
      reason = `Proficient with ${independentCorrectCount} independent correct out of ${totalAttempts} attempts.`;
    } else if (
      combinedScore >= MASTERY_THRESHOLDS.PRACTISING_WEIGHTED_SCORE ||
      recentWeightedScore >= 45
    ) {
      status = "practising";
      const assistedCap = independentCorrectCount < MASTERY_THRESHOLDS.MIN_INDEPENDENT_CORRECT_FOR_PROFICIENT ? 59 : 69;
      points = Math.min(assistedCap, Math.max(40, Math.round(combinedScore * 0.72)));
      reason =
        independentCorrectCount === 0
          ? `Practising (assisted accuracy only — independent unassisted solves required to advance to Proficient).`
          : `Practising (${Math.round(recentWeightedScore)}% recent weighted score across ${totalAttempts} attempts).`;
    } else {
      status = "introduced";
      points = Math.min(39, Math.max(0, Math.round(combinedScore * 0.55)));
      reason = `Introduced / needs consolidation (recent accuracy ${Math.round(recentRawAccuracy * 100)}%).`;
    }
  }

  const latestTs = matching[0].attempt.timestamp || new Date(nowMs).toISOString();

  return {
    skillId: input.skillId,
    status,
    points,
    attempts: totalAttempts,
    correctCount,
    lastPracticedAt: latestTs,
    independentCorrectCount,
    assistedCorrectCount,
    independentAccuracy,
    weightedAccuracy: Math.round(weightedScore),
    recentAccuracy: Math.round(recentWeightedScore),
    distinctQuestionsCount,
    masteryStateReason: reason
  };
}

/**
 * Fallback evaluator for direct legacy repository calls where no QuestionAttempt rows
 * exist yet for the skillId. Preserves positive test increments while strictly blocking
 * unearned proficiency and supporting downward reversibility on wrong answers.
 */
export function evaluateDirectMasteryUpdate(
  existingRecord: MasteryRecord | undefined,
  skillId: string,
  deltaPoints: number,
  isCorrect: boolean
): MasteryRecord {
  const prev = existingRecord || {
    skillId,
    status: "unstarted" as MasteryStatus,
    points: 0,
    attempts: 0,
    correctCount: 0,
    lastPracticedAt: new Date().toISOString()
  };

  const newAttempts = prev.attempts + 1;
  const newCorrect = isCorrect ? prev.correctCount + 1 : prev.correctCount;
  const accuracy = newCorrect / Math.max(1, newAttempts);

  let newPoints: number;
  if (isCorrect) {
    newPoints = Math.min(100, Math.max(0, prev.points + Math.max(0, deltaPoints)));
  } else {
    const penalty = Math.max(12, Math.abs(deltaPoints || 15));
    newPoints = Math.max(0, prev.points - penalty);
  }

  // Enforce 4-state evidence guards
  let newStatus: CanonicalLearnerMasteryState = "introduced";
  if (newCorrect === 0) {
    newPoints = 0;
    newStatus = "introduced";
  } else if (newAttempts < 2) {
    newStatus = "introduced";
  } else if (newAttempts < 4 || accuracy < 0.7 || newPoints < 70) {
    if (newPoints >= 40 && accuracy >= 0.4) {
      newStatus = "practising";
      if (newAttempts < 4) {
        newPoints = Math.min(newPoints, 69);
      }
    } else {
      newStatus = "introduced";
      newPoints = Math.min(newPoints, 39);
    }
  } else if (newAttempts >= 6 && accuracy >= 0.85 && newPoints >= 90 && isCorrect) {
    newStatus = "mastered";
  } else {
    newStatus = "proficient";
    newPoints = Math.min(89, Math.max(70, newPoints));
  }

  return {
    ...prev,
    skillId,
    points: newPoints,
    status: newStatus,
    attempts: newAttempts,
    correctCount: newCorrect,
    lastPracticedAt: new Date().toISOString()
  };
}
