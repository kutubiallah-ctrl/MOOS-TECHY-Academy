/**
 * MOOS TECHY ACADEMY — ASSIGNMENT & MASTERY LIFECYCLE SERVICE
 * 
 * Deterministic calculation engine for assignment completion states,
 * pre/post-assignment mastery progression deltas, retrieval independence rates,
 * and pedagogical effectiveness verdicts.
 */

import {
  Assignment,
  AssignmentCompletionState,
  AssignmentProgressRecord
} from "../types/curriculum";

export interface PrePostMasteryData {
  preAssignmentMastery: number; // 0 - 100
  postAssignmentMastery: number; // 0 - 100
  scorePercentage?: number; // 0 - 100
  attemptsCount?: number;
  hintsRequestedCount?: number;
  isCompleted?: boolean;
  isStarted?: boolean;
  dueDate?: string;
  identifiedMisconceptions?: string[];
}

export interface AssignmentOutcomeEvaluation {
  state: AssignmentCompletionState;
  masteryDelta: number;
  retrievalIndependenceRate: number;
  effectivenessVerdict:
    | "improvement_observed"
    | "performance_increased"
    | "mastery_evidence_strengthened"
    | "remediation_remains_unresolved"
    | "insufficient_evidence";
  pedagogicalRecommendation: string;
}

/**
 * Pure deterministic helper function to calculate the exact AssignmentCompletionState
 * from pre/post assignment mastery metrics and session telemetry.
 */
export function calculateAssignmentCompletionState(data: PrePostMasteryData): AssignmentCompletionState {
  const {
    preAssignmentMastery,
    postAssignmentMastery,
    scorePercentage = 0,
    attemptsCount = 0,
    hintsRequestedCount = 0,
    isCompleted = false,
    isStarted = false,
    dueDate
  } = data;

  // 1. Not started state check
  if (!isStarted && !isCompleted && attemptsCount === 0) {
    if (dueDate) {
      const now = new Date();
      const due = new Date(dueDate);
      if (due < now) {
        return "expired";
      }
    }
    return "unstarted";
  }

  // 2. In-progress or abandoned check (not yet finalized as completed)
  if (!isCompleted) {
    if (dueDate) {
      const now = new Date();
      const due = new Date(dueDate);
      if (due < now) {
        return attemptsCount > 0 ? "abandoned" : "expired";
      }
    }
    return attemptsCount > 0 ? "in_progress" : "started";
  }

  // 3. Completed state evaluation based on pre/post mastery delta
  const masteryDelta = postAssignmentMastery - preAssignmentMastery;

  // A. Clear negative delta indicates concept regression or confusion
  if (masteryDelta < 0) {
    return "mastery_regressed";
  }

  // B. Zero delta (no score change)
  if (masteryDelta === 0) {
    // High pre-existing mastery that was successfully preserved
    if (postAssignmentMastery >= 80) {
      return "completed_mastery_retained";
    }

    // Low pre-existing mastery with low score and high hints
    if (scorePercentage < 50 || hintsRequestedCount >= 3) {
      return "intervention_required";
    }

    // Default neutral completion
    return "completed_stagnant";
  }

  // C. Significant positive growth or score-driven mastery uplift
  if (masteryDelta > 0 || scorePercentage >= 70) {
    // If student achieved improvement but required extreme hints, flag for intervention
    if (hintsRequestedCount >= 4 && scorePercentage < 60) {
      return "intervention_required";
    }
    return "completed_with_improvement";
  }

  return "completed_with_improvement";
}

/**
 * Calculates learner retrieval independence percentage (0-100%)
 * based on question attempts and hint reveals.
 */
export function calculateRetrievalIndependence(
  attemptsCount: number,
  hintsRequestedCount: number,
  scorePercentage: number = 0
): number {
  if (attemptsCount === 0) return 100;
  const hintPenalty = Math.min(60, hintsRequestedCount * 15);
  const accuracyContribution = Math.round(scorePercentage * 0.4);
  const independence = Math.max(10, Math.min(100, 100 - hintPenalty + accuracyContribution - 40));
  return independence;
}

/**
 * Evaluates comprehensive pedagogical outcome from pre/post assignment mastery.
 */
export function evaluateAssignmentOutcome(data: PrePostMasteryData): AssignmentOutcomeEvaluation {
  const state = calculateAssignmentCompletionState(data);
  const masteryDelta = data.postAssignmentMastery - data.preAssignmentMastery;
  const independence = calculateRetrievalIndependence(
    data.attemptsCount || 1,
    data.hintsRequestedCount || 0,
    data.scorePercentage || 0
  );

  let effectivenessVerdict: AssignmentOutcomeEvaluation["effectivenessVerdict"] = "insufficient_evidence";
  let pedagogicalRecommendation = "Continue regular curriculum progression.";

  switch (state) {
    case "completed_with_improvement":
      effectivenessVerdict = masteryDelta >= 15 ? "mastery_evidence_strengthened" : "improvement_observed";
      pedagogicalRecommendation = "Advance to subsequent syllabus objective or next difficulty tier.";
      break;

    case "completed_mastery_retained":
      effectivenessVerdict = "mastery_evidence_strengthened";
      pedagogicalRecommendation = "Mastery consolidated at target standard. Schedule periodic spaced review in 14 days.";
      break;

    case "mastery_regressed":
      effectivenessVerdict = "remediation_remains_unresolved";
      pedagogicalRecommendation = "Prerequisite gap detected. Assign targeted socratic walkthrough on foundational components.";
      break;

    case "intervention_required":
    case "completed_stagnant":
      effectivenessVerdict = "remediation_remains_unresolved";
      pedagogicalRecommendation = "High hint reliance or stalled progression observed. Schedule educator 1-on-1 or peer pairing.";
      break;

    case "in_progress":
    case "started":
      effectivenessVerdict = "insufficient_evidence";
      pedagogicalRecommendation = "Assignment in progress. Encourage completion before due date.";
      break;

    default:
      effectivenessVerdict = "insufficient_evidence";
      pedagogicalRecommendation = "Task pending learner engagement.";
      break;
  }

  return {
    state,
    masteryDelta,
    retrievalIndependenceRate: independence,
    effectivenessVerdict,
    pedagogicalRecommendation
  };
}

/**
 * Service for assignment lifecycle tracking and analytics.
 */
export class AssignmentService {
  /**
   * Evaluates and builds an AssignmentProgressRecord for a learner.
   */
  public evaluateLearnerRecord(
    learnerId: string,
    learnerName: string,
    data: PrePostMasteryData
  ): AssignmentProgressRecord {
    const evaluation = evaluateAssignmentOutcome(data);
    return {
      learnerId,
      learnerName,
      state: evaluation.state,
      preAssignmentMastery: data.preAssignmentMastery,
      postAssignmentMastery: data.postAssignmentMastery,
      masteryDelta: evaluation.masteryDelta,
      scorePercentage: data.scorePercentage,
      attemptsCount: data.attemptsCount || 0,
      hintsRequestedCount: data.hintsRequestedCount || 0,
      retrievalIndependenceRate: evaluation.retrievalIndependenceRate,
      startedAt: data.isStarted ? new Date().toISOString() : undefined,
      completedAt: data.isCompleted ? new Date().toISOString() : undefined,
      identifiedMisconceptions: data.identifiedMisconceptions || [],
      effectivenessVerdict: evaluation.effectivenessVerdict
    };
  }

  /**
   * Helper function to calculate completion states directly.
   */
  public calculateState(data: PrePostMasteryData): AssignmentCompletionState {
    return calculateAssignmentCompletionState(data);
  }

  /**
   * Calculates aggregated cohort statistics for an assignment.
   */
  public calculateCohortMetrics(assignment: Assignment): {
    totalEnrolled: number;
    completedCount: number;
    improvedCount: number;
    regressedCount: number;
    averageDelta: number;
    averageScore: number;
    averageIndependence: number;
  } {
    const progressRecords = Object.values(assignment.learnerProgress || {});
    if (!progressRecords.length) {
      return {
        totalEnrolled: assignment.targetLearnerIds.length || 0,
        completedCount: assignment.completedLearnerIds.length,
        improvedCount: 0,
        regressedCount: 0,
        averageDelta: 0,
        averageScore: 0,
        averageIndependence: 100
      };
    }

    const completed = progressRecords.filter((r) => r.state.startsWith("completed") || r.state === "mastery_regressed");
    const improved = progressRecords.filter((r) => r.state === "completed_with_improvement");
    const regressed = progressRecords.filter((r) => r.state === "mastery_regressed");

    const totalDelta = completed.reduce((sum, r) => sum + r.masteryDelta, 0);
    const totalScore = completed.reduce((sum, r) => sum + (r.scorePercentage || 0), 0);
    const totalIndep = completed.reduce((sum, r) => sum + (r.retrievalIndependenceRate || 100), 0);

    return {
      totalEnrolled: assignment.targetLearnerIds.length || progressRecords.length,
      completedCount: completed.length,
      improvedCount: improved.length,
      regressedCount: regressed.length,
      averageDelta: completed.length > 0 ? Math.round(totalDelta / completed.length) : 0,
      averageScore: completed.length > 0 ? Math.round(totalScore / completed.length) : 0,
      averageIndependence: completed.length > 0 ? Math.round(totalIndep / completed.length) : 100
    };
  }
}

export const assignmentService = new AssignmentService();
