import { LearnerProfile, QuestionAttempt } from "../types/learner";
import { Skill, Unit, Recommendation } from "../types/curriculum";
import { PlayActivity } from "../types/learnAndPlay";
import { ALL_PLAY_ACTIVITIES } from "../data/learnAndPlayData";
import { curriculumService } from "./curriculumService";
import { computeHintCredit, normalizeMasteryStatus } from "./masteryEngine";

export type ExamReadinessCategory =
  | "insufficient_data"
  | "not_ready"
  | "developing_readiness"
  | "approaching_readiness"
  | "ready"
  | "strong_readiness";

export interface ExamReadinessResult {
  readinessCategory: ExamReadinessCategory;
  hasSufficientEvidence: boolean;
  readinessScore: number; // 0 to 100
  headline: string;
  syllabusCoveragePercentage: number;
  proficientOrMasteredCount: number;
  totalSyllabusSkillsCount: number;
  assessedSkillsCount: number;
  evaluatedSubjects: string[];
  recentExamAverageScore?: number;
  weightedAttemptAccuracy?: number;
  unresolvedBlockers: string[];
  recommendations: string[];
}

export interface HintDependencyMetrics {
  totalAttempts: number;
  attemptsWithHints: number;
  hintDependencyRate: number; // 0 to 100 percentage
  independentAccuracyRate: number; // 0 to 100 percentage
  interpretation: "high_independence" | "balanced_scaffolding" | "heavy_hint_reliance";
}

export type SessionPhase =
  | "diagnose"
  | "remediation"
  | "guided_practice"
  | "independent_practice"
  | "retrieval"
  | "challenge"
  | "exam_prep";

export interface SessionPhaseRecommendation {
  phase: SessionPhase;
  phaseTitle: string;
  rationale: string;
  suggestedAction: string;
}

export interface DashboardMetrics {
  strengths: Array<{ title: string; accuracy: number; points: number }>;
  weaknesses: Array<{ title: string; accuracy: number; recommendation: string }>;
  recommendedSkill: Skill;
  recommendedUnit: Unit;
  recommendedReason: string;
  recommendationType: "new_skill" | "remediation" | "revision" | "extension";
  recommendedPlayActivity?: PlayActivity;
  prerequisiteGapNotice?: string;
  masteryDistribution: {
    unstarted: number;
    introduced: number;
    practising: number;
    familiar: number;
    proficient: number;
    mastered: number;
    total: number;
  };
  weeklyMinutes: number;
  accuracyRate: number;
  hasAccuracyEvidence: boolean;
  totalAttemptsCount: number;
  completionPercentage: number;
  recentMisconceptions: Array<{ trigger: string; note: string; skillTitle: string }>;
  examReadiness: ExamReadinessResult;
  hintDependency: HintDependencyMetrics;
  sessionPhase: SessionPhaseRecommendation;
}

function resolveRelevantUnitsForProfile(profile: LearnerProfile): {
  units: Unit[];
  activeSubjectIds: string[];
} {
  const allUnits = curriculumService.getAllUnits();
  const targetLevel = profile?.targetLevel;
  const activeSubjectIds = Array.from(
    new Set([
      ...(Array.isArray(profile?.selectedSubjectIds) ? profile.selectedSubjectIds : []),
      ...(profile?.activeSubjectId ? [profile.activeSubjectId] : [])
    ])
  ).filter(Boolean);

  if (activeSubjectIds.length > 0) {
    const selectedSet = new Set(activeSubjectIds);
    const matchingSubjectAndLevel = allUnits.filter(
      (u) => selectedSet.has(u.subjectId) && (!targetLevel || u.level === targetLevel)
    );

    // For any selected subject with no units at targetLevel, include its units at all levels
    const coveredSubjects = new Set(matchingSubjectAndLevel.map((u) => u.subjectId));
    const missingSubjectsUnits = allUnits.filter(
      (u) => selectedSet.has(u.subjectId) && !coveredSubjects.has(u.subjectId)
    );

    const combined = [...matchingSubjectAndLevel, ...missingSubjectsUnits];
    if (combined.length > 0) {
      return { units: combined, activeSubjectIds };
    }
  }

  const levelUnits = targetLevel ? allUnits.filter((u) => u.level === targetLevel) : allUnits;
  const units = levelUnits.length > 0 ? levelUnits : allUnits;
  return {
    units,
    activeSubjectIds: Array.from(new Set(units.map((u) => u.subjectId)))
  };
}

export class AnalyticsService {
  public static calculateDashboardMetrics(profile: LearnerProfile): DashboardMetrics {
    const allUnits = curriculumService.getAllUnits();
    const targetLevel = profile?.targetLevel || "senior_secondary";
    const { units: relevantUnits } = resolveRelevantUnitsForProfile(profile);
    const levelUnits = allUnits.filter((u) => u.level === targetLevel);
    const allSkills = relevantUnits.flatMap((u) => u.skills);
    const totalSkillsCount = allSkills.length;
    const mastery = profile?.masteryRecords || {};

    let unstarted = 0;
    let introduced = 0;
    let practising = 0;
    let proficient = 0;
    let mastered = 0;

    const strengths: Array<{ title: string; accuracy: number; points: number }> = [];
    const weaknesses: Array<{ title: string; accuracy: number; recommendation: string }> = [];

    const classifySkill = (skill: Skill, rec: typeof mastery[string]) => {
      if (!rec || rec.status === "unstarted" || (rec.attempts === 0 && rec.points === 0)) {
        return "unstarted" as const;
      }
      return normalizeMasteryStatus(rec.status, rec.points);
    };

    // Analyze individual skill mastery and accuracy from real records only
    allSkills.forEach((skill) => {
      const record = mastery[skill.id];
      const state = classifySkill(skill, record);
      const accuracy =
        record && record.attempts > 0
          ? Math.round((record.correctCount / record.attempts) * 100)
          : 0;

      if (state === "unstarted") {
        unstarted++;
      } else if (state === "mastered") {
        mastered++;
        strengths.push({ title: skill.title, accuracy, points: record.points });
      } else if (state === "proficient") {
        proficient++;
        strengths.push({ title: skill.title, accuracy, points: record.points });
      } else if (state === "practising") {
        practising++;
        if (record.attempts >= 2 && accuracy < 75) {
          weaknesses.push({
            title: skill.title,
            accuracy,
            recommendation: `Build independent recall in ${skill.title} without hints`
          });
        }
      } else {
        introduced++;
        if (record.attempts >= 1 && accuracy < 70) {
          weaknesses.push({
            title: skill.title,
            accuracy,
            recommendation: `Targeted Socratic practice on ${skill.title}`
          });
        }
      }
    });

    // Also include practiced skills outside active unit list without fabricating unstarted counts
    const levelSkillIdSet = new Set(allSkills.map((s) => s.id));
    let externalAssessedCount = 0;
    Object.entries(mastery).forEach(([skillId, record]) => {
      if (levelSkillIdSet.has(skillId) || !record) return;
      const state = normalizeMasteryStatus(record.status, record.points);
      if (state === "unstarted") return;
      externalAssessedCount++;
      const accuracy =
        record.attempts > 0 ? Math.round((record.correctCount / record.attempts) * 100) : 0;
      const extSkill = curriculumService.getSkillById(skillId);
      const label = extSkill?.title || skillId;

      if (state === "mastered") {
        mastered++;
        strengths.push({ title: label, accuracy, points: record.points });
      } else if (state === "proficient") {
        proficient++;
        strengths.push({ title: label, accuracy, points: record.points });
      } else if (state === "practising") {
        practising++;
      } else {
        introduced++;
        if (record.attempts >= 1 && accuracy < 70) {
          weaknesses.push({
            title: label,
            accuracy,
            recommendation: `Targeted Socratic practice on ${label}`
          });
        }
      }
    });

    // Sort real strengths descending by points, weaknesses ascending by accuracy
    strengths.sort((a, b) => b.points - a.points || b.accuracy - a.accuracy);
    weaknesses.sort((a, b) => a.accuracy - b.accuracy);

    // Only supplement from real completed diagnostic results if still empty (never fake fallbacks!)
    if (strengths.length === 0 && profile.diagnosticsCompleted && profile.lastDiagnosticResult?.strengths?.length) {
      profile.lastDiagnosticResult.strengths.forEach((s) => {
        strengths.push({
          title: s,
          accuracy: profile.lastDiagnosticResult?.percentage || 0,
          points: profile.lastDiagnosticResult?.percentage || 0
        });
      });
    }
    if (weaknesses.length === 0 && profile.diagnosticsCompleted && profile.lastDiagnosticResult?.gapAreas?.length) {
      profile.lastDiagnosticResult.gapAreas.forEach((g) => {
        weaknesses.push({
          title: g,
          accuracy: profile.lastDiagnosticResult?.percentage || 0,
          recommendation: "Review diagnostic gap with Socratic hint ladder"
        });
      });
    }

    // --- Pedagogical Recommendation Engine ---
    const levelRelevantUnits = relevantUnits.filter((u) => u.level === targetLevel);
    const activeUnit =
      levelRelevantUnits.find((u) => u.id === profile.activeUnitId) ||
      levelUnits.find((u) => u.id === profile.activeUnitId) ||
      levelRelevantUnits[0] ||
      levelUnits[0] ||
      relevantUnits.find((u) => u.id === profile.activeUnitId) ||
      relevantUnits[0] ||
      allUnits.find((u) => u.id === profile.activeUnitId) ||
      allUnits[0];

    let recommendedSkill: Skill = activeUnit.skills[0];
    let recommendedUnit: Unit = activeUnit;
    let recommendedReason = `Next key milestone in ${activeUnit.title}`;
    let recommendationType: Recommendation["type"] = "new_skill";
    let prerequisiteGapNotice: string | undefined;

    const strugglingSkill = activeUnit.skills.find((s) => {
      const rec = mastery[s.id];
      return rec && rec.attempts >= 2 && rec.points < 60;
    });

    if (strugglingSkill) {
      recommendedSkill = strugglingSkill;
      recommendedUnit = activeUnit;
      recommendationType = "remediation";
      recommendedReason = `Remediation: Strengthen ${strugglingSkill.title} with step-by-step Socratic hints`;
    } else {
      const candidateSkill = activeUnit.skills.find(
        (s) => normalizeMasteryStatus(mastery[s.id]?.status, mastery[s.id]?.points) !== "mastered"
      );

      if (candidateSkill) {
        const prereqChain = curriculumService.getPrerequisiteChain(candidateSkill.id);
        const unmasteredPrereq = prereqChain.find((p) => (mastery[p.id]?.points || 0) < 70);

        if (unmasteredPrereq) {
          const prereqUnit = curriculumService.getUnitBySkillId(unmasteredPrereq.id);
          if (prereqUnit && prereqUnit.level === targetLevel) {
            recommendedSkill = unmasteredPrereq;
            recommendedUnit = prereqUnit;
            recommendationType = "remediation";
            prerequisiteGapNotice = `Prerequisite foundation needed: Complete ${unmasteredPrereq.title} before advancing to ${candidateSkill.title}.`;
            recommendedReason = `Prerequisite Foundation: ${unmasteredPrereq.title}`;
          } else {
            recommendedSkill = candidateSkill;
            recommendedUnit = activeUnit;
            recommendedReason = `Next key milestone in ${activeUnit.title}`;
            if (prereqUnit) {
              prerequisiteGapNotice = `Helpful foundation refresher: ${unmasteredPrereq.title} (${prereqUnit.title}).`;
            }
          }
        } else {
          recommendedSkill = candidateSkill;
          recommendedUnit = activeUnit;
          recommendedReason = `Next key milestone in ${activeUnit.title}`;
        }
      } else {
        const nextIncompleteUnit =
          relevantUnits.find((u) =>
            u.skills.some((s) => normalizeMasteryStatus(mastery[s.id]?.status, mastery[s.id]?.points) !== "mastered")
          ) ||
          allUnits.find((u) =>
            u.skills.some((s) => normalizeMasteryStatus(mastery[s.id]?.status, mastery[s.id]?.points) !== "mastered")
          );

        if (nextIncompleteUnit) {
          recommendedUnit = nextIncompleteUnit;
          recommendedSkill =
            nextIncompleteUnit.skills.find(
              (s) => normalizeMasteryStatus(mastery[s.id]?.status, mastery[s.id]?.points) !== "mastered"
            ) || nextIncompleteUnit.skills[0];
          recommendationType = "new_skill";
          recommendedReason = `New academic unit unlocked: ${nextIncompleteUnit.title}`;
        } else {
          recommendedSkill = activeUnit.skills[0];
          recommendedUnit = activeUnit;
          recommendationType = "revision";
          recommendedReason = "Mastery consolidation and timed CBT exam drills";
        }
      }
    }

    const recentMisconceptions: Array<{ trigger: string; note: string; skillTitle: string }> = [];
    (profile.questionAttempts || [])
      .filter((a) => a.misconceptionTriggered)
      .slice(0, 3)
      .forEach((a) => {
        const sk = curriculumService.getSkillById(a.skillId);
        recentMisconceptions.push({
          trigger: a.selectedOption,
          note: a.misconceptionTriggered!,
          skillTitle: sk?.title || a.skillId
        });
      });

    // Honest attempt accuracy calculation (zero fake 84% fallback)
    const attemptsList = profile.questionAttempts || [];
    const totalAttempts = attemptsList.length;
    const correctAttempts = attemptsList.filter((a) => a.isCorrect).length;
    const recordAttempts = Object.values(mastery).reduce((s, r) => s + (r?.attempts || 0), 0);
    const recordCorrect = Object.values(mastery).reduce((s, r) => s + (r?.correctCount || 0), 0);
    const hasAccuracyEvidence = totalAttempts > 0 || recordAttempts > 0;
    const accuracyRate =
      totalAttempts > 0
        ? Math.round((correctAttempts / totalAttempts) * 100)
        : recordAttempts > 0
        ? Math.round((recordCorrect / recordAttempts) * 100)
        : 0;

    const familiar = introduced + practising;
    const completionPercentage = Math.round(
      ((mastered + proficient * 0.75 + practising * 0.4 + introduced * 0.15) /
        Math.max(totalSkillsCount, 1)) *
        100
    );

    const matchingPlayActivity =
      ALL_PLAY_ACTIVITIES.find((a) => a.skillId === recommendedSkill.id) ||
      ALL_PLAY_ACTIVITIES.find((a) => a.unitId === recommendedUnit.id) ||
      ALL_PLAY_ACTIVITIES[0];

    const examReadiness = AnalyticsService.calculateExamReadiness(profile);
    const hintDependency = AnalyticsService.calculateHintDependency(attemptsList);
    const sessionPhase = AnalyticsService.determineSessionPhase(profile);

    return {
      strengths: strengths.slice(0, 4),
      weaknesses: weaknesses.slice(0, 4),
      recommendedSkill,
      recommendedUnit,
      recommendedReason,
      recommendationType,
      recommendedPlayActivity: matchingPlayActivity,
      prerequisiteGapNotice,
      masteryDistribution: {
        unstarted,
        introduced,
        practising,
        familiar,
        proficient,
        mastered,
        total: totalSkillsCount + externalAssessedCount
      },
      weeklyMinutes: profile.totalStudyMinutes || 0,
      accuracyRate,
      hasAccuracyEvidence,
      totalAttemptsCount: totalAttempts,
      completionPercentage,
      recentMisconceptions,
      examReadiness,
      hintDependency,
      sessionPhase
    };
  }

  /**
   * Genuine examination readiness engine (Directive 006 WS2):
   * - Evaluates ALL active curriculum subjects from ALL_CURRICULUM_UNITS filtered by learner's active subjects & level.
   * - Requires real assessment evidence; returns explicit "insufficient_data" state when sparse/unassessed.
   * - Uses zero synthetic fallback baselines or hardcoded topic lists.
   */
  public static calculateExamReadiness(profile: LearnerProfile): ExamReadinessResult {
    const { units: relevantUnits, activeSubjectIds } = resolveRelevantUnitsForProfile(profile);
    const relevantSkills = relevantUnits.flatMap((u) => u.skills);
    const totalSkillsCount = relevantSkills.length;
    const relevantSkillIds = new Set(relevantSkills.map((s) => s.id));
    const mastery = profile?.masteryRecords || {};

    let proficientOrMasteredCount = 0;
    let partialCreditPoints = 0;
    let assessedSkillsCount = 0;
    let totalRecordedAttemptsInScope = 0;
    let totalRecordedCorrectInScope = 0;

    const weakAssessedSkills: Array<{ title: string; accuracy: number }> = [];
    const unmasteredSkills: string[] = [];

    relevantSkills.forEach((skill) => {
      const rec = mastery[skill.id];
      const state = normalizeMasteryStatus(rec?.status, rec?.points);
      if (rec && (rec.attempts > 0 || rec.points > 0)) {
        assessedSkillsCount++;
        totalRecordedAttemptsInScope += rec.attempts || 0;
        totalRecordedCorrectInScope += rec.correctCount || 0;
      }

      if (state === "mastered" || state === "proficient") {
        proficientOrMasteredCount++;
        partialCreditPoints += 1;
      } else {
        if (state === "practising") {
          partialCreditPoints += 0.35;
        } else if (state === "introduced" && (rec?.points || 0) > 0) {
          partialCreditPoints += 0.1;
        }

        if (rec && rec.attempts >= 1) {
          const acc = Math.round(((rec.correctCount || 0) / Math.max(1, rec.attempts)) * 100);
          if (acc < 70) {
            weakAssessedSkills.push({ title: skill.title, accuracy: acc });
          }
        }
        unmasteredSkills.push(skill.title);
      }
    });

    const attemptsInScope = (profile.questionAttempts || []).filter((a) =>
      relevantSkillIds.has(a.skillId)
    );
    const allAttemptsCount = (profile.questionAttempts || []).length;
    const examAttempts = profile.examHistory || [];
    const hasCompletedDiagnostic = Boolean(
      profile.diagnosticsCompleted && profile.lastDiagnosticResult
    );

    const syllabusCoveragePercentage = Math.round(
      (proficientOrMasteredCount / Math.max(totalSkillsCount, 1)) * 100
    );

    let recentExamAverageScore: number | undefined;
    if (examAttempts.length > 0) {
      const totalScore = examAttempts.reduce((sum, e) => sum + (e.scorePercentage || 0), 0);
      recentExamAverageScore = Math.round(totalScore / examAttempts.length);
    }

    // Weighted independent+assisted attempt accuracy across active scope (fallback to all attempts if cross-unit)
    const activeAttemptPool =
      attemptsInScope.length > 0 ? attemptsInScope : profile.questionAttempts || [];
    let weightedAttemptAccuracy: number | undefined;
    if (activeAttemptPool.length > 0) {
      const creditSum = activeAttemptPool.reduce(
        (sum, a) => sum + computeHintCredit(Boolean(a.isCorrect), a.hintsUsedCount),
        0
      );
      weightedAttemptAccuracy = Math.round((creditSum / activeAttemptPool.length) * 100);
    } else if (totalRecordedAttemptsInScope > 0) {
      weightedAttemptAccuracy = Math.round(
        (totalRecordedCorrectInScope / totalRecordedAttemptsInScope) * 100
      );
    }

    // Insufficient evidence guard: do NOT synthesize readiness score when assessment evidence is sparse
    const hasSufficientEvidence =
      assessedSkillsCount >= 3 ||
      attemptsInScope.length >= 3 ||
      allAttemptsCount >= 5 ||
      examAttempts.length >= 1 ||
      (hasCompletedDiagnostic && assessedSkillsCount >= 1);

    if (!hasSufficientEvidence) {
      return {
        readinessCategory: "insufficient_data",
        hasSufficientEvidence: false,
        readinessScore: 0,
        headline: "Insufficient Assessment Evidence — Complete Practice or Diagnostic",
        syllabusCoveragePercentage,
        proficientOrMasteredCount,
        totalSyllabusSkillsCount: totalSkillsCount,
        assessedSkillsCount,
        evaluatedSubjects: activeSubjectIds,
        recentExamAverageScore,
        weightedAttemptAccuracy,
        unresolvedBlockers: [
          `Only ${assessedSkillsCount} skill(s) and ${attemptsInScope.length} active-subject attempt(s) recorded. Complete at least 3 skill assessments or a mock exam to unlock a reliable readiness rating.`
        ],
        recommendations: [
          "Complete practice sets across your selected subjects to build verified mastery evidence.",
          "Take the baseline Diagnostic Assessment or a timed CBT paper in Exam Hall."
        ]
      };
    }

    // Compute genuine deterministic readiness score strictly from verified evidence
    const effectiveCoveragePct = Math.min(
      100,
      Math.round((partialCreditPoints / Math.max(totalSkillsCount, 1)) * 100)
    );
    const coverageComponent = effectiveCoveragePct * 0.55; // 55% weight on active syllabus coverage

    let performanceMetric = 0;
    if (recentExamAverageScore !== undefined && weightedAttemptAccuracy !== undefined) {
      performanceMetric = recentExamAverageScore * 0.65 + weightedAttemptAccuracy * 0.35;
    } else if (recentExamAverageScore !== undefined) {
      performanceMetric = recentExamAverageScore;
    } else if (weightedAttemptAccuracy !== undefined) {
      const diagPct = hasCompletedDiagnostic ? profile.lastDiagnosticResult!.percentage : weightedAttemptAccuracy;
      performanceMetric = weightedAttemptAccuracy * 0.75 + diagPct * 0.25;
    } else if (hasCompletedDiagnostic) {
      performanceMetric = profile.lastDiagnosticResult!.percentage || 0;
    }

    const performanceComponent = performanceMetric * 0.40; // 40% weight on real assessment accuracy
    const streakDays = profile.streak?.count || 0;
    const consistencyBonus = assessedSkillsCount >= 3 && streakDays >= 2 ? Math.min(streakDays, 5) : 0; // up to 5%

    const rawScore = Math.round(coverageComponent + performanceComponent + consistencyBonus);
    const score = Math.min(100, Math.max(0, rawScore));

    let readinessCategory: ExamReadinessCategory = "not_ready";
    let headline = "Early Curriculum Progress — Build Foundational Mastery";
    const unresolvedBlockers: string[] = [];
    const recommendations: string[] = [];

    if (weakAssessedSkills.length > 0) {
      weakAssessedSkills.sort((a, b) => a.accuracy - b.accuracy);
      unresolvedBlockers.push(
        `Low accuracy detected in: ${weakAssessedSkills
          .slice(0, 3)
          .map((w) => `${w.title} (${w.accuracy}%)`)
          .join(", ")}.`
      );
    }

    if (score >= 85 && syllabusCoveragePercentage >= 75) {
      readinessCategory = "strong_readiness";
      headline = "Strong Exam Readiness — High Mastery & Independent Accuracy";
      recommendations.push("Maintain peak precision with timed full-length CBT mock papers in Exam Hall.");
    } else if (score >= 70 && syllabusCoveragePercentage >= 50) {
      readinessCategory = "ready";
      headline = "Ready for Timed Examination Simulations";
      if (unmasteredSkills.length > 0) {
        recommendations.push(
          `Close remaining syllabus gaps in: ${unmasteredSkills.slice(0, 2).join(", ")}.`
        );
      }
      recommendations.push("Complete timed CBT practice papers to verify exam pacing.");
    } else if (score >= 50) {
      readinessCategory = "approaching_readiness";
      headline = "Approaching Readiness — Active Competencies Developing";
      if (unmasteredSkills.length > 0 && unresolvedBlockers.length === 0) {
        unresolvedBlockers.push(
          `Further independent mastery needed in: ${unmasteredSkills.slice(0, 3).join(", ")}.`
        );
      }
      recommendations.push("Practice unmastered skills without hint assistance before full timed exams.");
    } else if (score >= 25) {
      readinessCategory = "developing_readiness";
      headline = "Developing Core Syllabus Competencies";
      unresolvedBlockers.push(
        `Active syllabus coverage is ${syllabusCoveragePercentage}% (${proficientOrMasteredCount}/${totalSkillsCount} proficient or mastered skills).`
      );
      recommendations.push("Work sequentially through core unit lessons and guided practice sets.");
    } else {
      readinessCategory = "not_ready";
      headline = "Foundational Practice Required Before Examination";
      unresolvedBlockers.push(
        "Demonstrated mastery and assessment accuracy remain below examination threshold."
      );
      recommendations.push("Review concept lessons and complete step-by-step practice in weaker topics.");
    }

    return {
      readinessCategory,
      hasSufficientEvidence: true,
      readinessScore: score,
      headline,
      syllabusCoveragePercentage,
      proficientOrMasteredCount,
      totalSyllabusSkillsCount: totalSkillsCount,
      assessedSkillsCount,
      evaluatedSubjects: activeSubjectIds,
      recentExamAverageScore,
      weightedAttemptAccuracy,
      unresolvedBlockers,
      recommendations
    };
  }

  /**
   * Analyzes hint dependency to distinguish independent retrieval mastery
   * from scaffold-dependent correctness.
   */
  public static calculateHintDependency(attempts: QuestionAttempt[]): HintDependencyMetrics {
    const total = attempts.length;
    if (total === 0) {
      return {
        totalAttempts: 0,
        attemptsWithHints: 0,
        hintDependencyRate: 0,
        independentAccuracyRate: 0,
        interpretation: "high_independence"
      };
    }

    const attemptsWithHints = attempts.filter((a) => (a.hintsUsedCount || 0) > 0).length;
    const independentCorrect = attempts.filter((a) => (a.hintsUsedCount || 0) === 0 && a.isCorrect).length;

    const hintDependencyRate = Math.round((attemptsWithHints / total) * 100);
    const independentAccuracyRate = Math.round((independentCorrect / total) * 100);

    let interpretation: "high_independence" | "balanced_scaffolding" | "heavy_hint_reliance" =
      "high_independence";
    if (hintDependencyRate > 50) {
      interpretation = "heavy_hint_reliance";
    } else if (hintDependencyRate > 20) {
      interpretation = "balanced_scaffolding";
    }

    return {
      totalAttempts: total,
      attemptsWithHints,
      hintDependencyRate,
      independentAccuracyRate,
      interpretation
    };
  }

  /**
   * Determines the learner's current adaptive session phase.
   */
  public static determineSessionPhase(profile: LearnerProfile): SessionPhaseRecommendation {
    if (!profile.diagnosticsCompleted && (profile.questionAttempts || []).length === 0) {
      return {
        phase: "diagnose",
        phaseTitle: "Calibrate Diagnostic Baseline",
        rationale: "Initial diagnostic assessment or initial practice is needed to map personal strengths and knowledge frontiers.",
        suggestedAction: "Launch Diagnostic Engine"
      };
    }

    const mastery = profile.masteryRecords || {};
    const struggling = Object.values(mastery).some((m) => m.attempts >= 2 && m.points < 50);
    if (struggling) {
      return {
        phase: "remediation",
        phaseTitle: "Targeted Remediation & Prerequisite Repair",
        rationale: "Recent attempts show persistent stumbling blocks that require first-principles scaffolding.",
        suggestedAction: "Launch Socratic Guided Practice"
      };
    }

    const attempts = profile.questionAttempts || [];
    const recentAttempts = attempts.slice(0, 5);
    const recentAccuracy =
      recentAttempts.length > 0
        ? recentAttempts.filter((a) => a.isCorrect).length / recentAttempts.length
        : 0;

    if (recentAttempts.length >= 3 && recentAccuracy >= 0.8) {
      return {
        phase: "challenge",
        phaseTitle: "High-Confidence Milestone Challenge",
        rationale: "Strong consecutive accuracy indicates readiness for multi-step non-routine problem solving.",
        suggestedAction: "Enter Challenge Arena"
      };
    }

    return {
      phase: "guided_practice",
      phaseTitle: "Sequential Scaffolded Practice",
      rationale: "Building solid conceptual and procedural fluency on active curriculum objectives.",
      suggestedAction: "Continue Practice Arena"
    };
  }
}
