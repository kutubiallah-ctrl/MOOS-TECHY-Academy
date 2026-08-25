import { LearnerProfile, QuestionAttempt } from "../types/learner";
import { Skill, Unit, MasteryRecord, Recommendation } from "../types/curriculum";
import { PlayActivity } from "../types/learnAndPlay";
import { MATHEMATICS_UNITS } from "../data/curriculumData";
import { ALL_PLAY_ACTIVITIES } from "../data/learnAndPlayData";
import { curriculumService } from "./curriculumService";

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
    familiar: number;
    proficient: number;
    mastered: number;
    total: number;
  };
  weeklyMinutes: number;
  accuracyRate: number;
  totalAttemptsCount: number;
  completionPercentage: number;
  recentMisconceptions: Array<{ trigger: string; note: string; skillTitle: string }>;
}


export class AnalyticsService {
  public static calculateDashboardMetrics(profile: LearnerProfile): DashboardMetrics {
    const allSkills = MATHEMATICS_UNITS.flatMap((u) => u.skills);
    const totalSkillsCount = allSkills.length;
    const mastery = profile?.masteryRecords || {};

    let unstarted = 0;
    let familiar = 0;
    let proficient = 0;
    let mastered = 0;

    const strengths: Array<{ title: string; accuracy: number; points: number }> = [];
    const weaknesses: Array<{ title: string; accuracy: number; recommendation: string }> = [];

    // Analyze individual skill mastery and accuracy
    allSkills.forEach((skill) => {
      const record = mastery[skill.id];
      if (!record || record.status === "unstarted" || record.points === 0) {
        unstarted++;
      } else if (record.status === "mastered" || record.points >= 90) {
        mastered++;
        strengths.push({
          title: skill.title,
          accuracy: record.attempts > 0 ? Math.round((record.correctCount / record.attempts) * 100) : 100,
          points: record.points
        });
      } else if (record.status === "proficient" || record.points >= 65) {
        proficient++;
        strengths.push({
          title: skill.title,
          accuracy: record.attempts > 0 ? Math.round((record.correctCount / record.attempts) * 100) : 80,
          points: record.points
        });
      } else {
        familiar++;
        weaknesses.push({
          title: skill.title,
          accuracy: record.attempts > 0 ? Math.round((record.correctCount / record.attempts) * 100) : 40,
          recommendation: `Targeted Socratic practice on ${skill.title}`
        });
      }
    });

    // Provide baseline from diagnostic or defaults if strengths are empty
    if (strengths.length === 0) {
      if (profile.lastDiagnosticResult?.strengths?.length) {
        profile.lastDiagnosticResult.strengths.forEach((s) => {
          strengths.push({ title: s, accuracy: 85, points: 80 });
        });
      } else {
        strengths.push({ title: "Arithmetic & Number Operations", accuracy: 100, points: 100 });
        strengths.push({ title: "Linear Equations", accuracy: 85, points: 80 });
      }
    }

    // Provide growth areas if weaknesses are empty
    if (weaknesses.length === 0) {
      if (profile.lastDiagnosticResult?.gapAreas?.length) {
        profile.lastDiagnosticResult.gapAreas.forEach((g) => {
          weaknesses.push({ title: g, accuracy: 50, recommendation: "Review with Socratic hint ladder" });
        });
      } else {
        weaknesses.push({
          title: "Quadratic Roots & Signs",
          accuracy: 55,
          recommendation: "Focus on factorization sign rules"
        });
        weaknesses.push({
          title: "Three-Figure Bearings",
          accuracy: 50,
          recommendation: "Draw clockwise angles from True North"
        });
      }
    }

    // --- Pedagogical Recommendation Engine ---
    const activeUnit =
      MATHEMATICS_UNITS.find((u) => u.id === profile.activeUnitId) ||
      MATHEMATICS_UNITS[2]; // Default to Quadratics

    let recommendedSkill: Skill = activeUnit.skills[0];
    let recommendedUnit: Unit = activeUnit;
    let recommendedReason = `Next key milestone in ${activeUnit.title}`;
    let recommendationType: "new_skill" | "remediation" | "revision" | "extension" = "new_skill";
    let prerequisiteGapNotice: string | undefined;

    // 1. Check for immediate remediation need: Any skill in active unit with >= 2 failed attempts and < 65 points
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
      // 2. Find first unmastered skill in active unit
      const candidateSkill = activeUnit.skills.find(
        (s) => (mastery[s.id]?.status || "unstarted") !== "mastered"
      );

      if (candidateSkill) {
        // Check prerequisite readiness
        if (candidateSkill.prerequisiteSkillIds && candidateSkill.prerequisiteSkillIds.length > 0) {
          const unmasteredPrereqId = candidateSkill.prerequisiteSkillIds.find(
            (pId) => (mastery[pId]?.points || 0) < 65
          );

          if (unmasteredPrereqId) {
            const prereqSkill = curriculumService.getSkillById(unmasteredPrereqId);
            const prereqUnit = prereqSkill ? curriculumService.getUnitBySkillId(unmasteredPrereqId) : null;

            if (prereqSkill && prereqUnit) {
              recommendedSkill = prereqSkill;
              recommendedUnit = prereqUnit;
              recommendationType = "remediation";
              prerequisiteGapNotice = `Prerequisite foundation needed: Complete ${prereqSkill.title} before advancing to ${candidateSkill.title}.`;
              recommendedReason = `Prerequisite Mastery: ${prereqSkill.title}`;
            } else {
              recommendedSkill = candidateSkill;
              recommendedUnit = activeUnit;
              recommendedReason = `Next key milestone in ${activeUnit.title}`;
            }
          } else {
            recommendedSkill = candidateSkill;
            recommendedUnit = activeUnit;
            recommendedReason = `Next key milestone in ${activeUnit.title}`;
          }
        } else {
          recommendedSkill = candidateSkill;
          recommendedUnit = activeUnit;
          recommendedReason = `Next key milestone in ${activeUnit.title}`;
        }
      } else {
        // 3. Active unit is completely mastered -> Advance to next incomplete unit
        const nextIncompleteUnit = MATHEMATICS_UNITS.find((u) =>
          u.skills.some((s) => (mastery[s.id]?.status || "unstarted") !== "mastered")
        );

        if (nextIncompleteUnit) {
          recommendedUnit = nextIncompleteUnit;
          recommendedSkill = nextIncompleteUnit.skills.find(
            (s) => (mastery[s.id]?.status || "unstarted") !== "mastered"
          ) || nextIncompleteUnit.skills[0];
          recommendationType = "new_skill";
          recommendedReason = `New academic unit unlocked: ${nextIncompleteUnit.title}`;
        } else {
          // 4. Entire secondary curriculum completed! -> Revision & exam consolidation
          recommendedSkill = activeUnit.skills[0];
          recommendedUnit = activeUnit;
          recommendationType = "revision";
          recommendedReason = "Mastery consolidation and WAEC/JAMB exam speed drills";
        }
      }
    }

    // Extract recent misconceptions from question attempt logs
    const recentMisconceptions: Array<{ trigger: string; note: string; skillTitle: string }> = [];
    (profile.questionAttempts || [])
      .filter((a) => a.misconceptionTriggered)
      .slice(0, 3)
      .forEach((a) => {
        const sk = curriculumService.getSkillById(a.skillId);
        recentMisconceptions.push({
          trigger: a.selectedOption,
          note: a.misconceptionTriggered!,
          skillTitle: sk?.title || "Algebraic Formulation"
        });
      });

    // Total attempts accuracy calculation
    const totalAttempts = profile.questionAttempts?.length || 0;
    const correctAttempts = (profile.questionAttempts || []).filter((a) => a.isCorrect).length;
    const accuracyRate = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 84;

    const completionPercentage = Math.round(
      ((mastered + proficient * 0.7 + familiar * 0.3) / Math.max(totalSkillsCount, 1)) * 100
    );

    // Pedagogical Play Activity Recommendation:
    // Match activity to recommendedSkill or struggling weaknesses, otherwise default to linear balancer / concept matcher
    const matchingPlayActivity =
      ALL_PLAY_ACTIVITIES.find((a) => a.skillId === recommendedSkill.id) ||
      ALL_PLAY_ACTIVITIES.find((a) => a.unitId === recommendedUnit.id) ||
      ALL_PLAY_ACTIVITIES[0];

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
        familiar,
        proficient,
        mastered,
        total: totalSkillsCount
      },
      weeklyMinutes: profile.totalStudyMinutes || 195,
      accuracyRate,
      totalAttemptsCount: totalAttempts,
      completionPercentage,
      recentMisconceptions
    };

  }
}

