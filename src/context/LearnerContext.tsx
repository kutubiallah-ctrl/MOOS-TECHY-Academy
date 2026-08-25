import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import {
  ExtendedLearnerProfile,
  LearnerActivity,
  QuestionAttempt,
  ExamSubmissionRecord,
  AcademicContext
} from "../types/learner";
import {
  Skill,
  Unit,
  DiagnosticResult,
  PracticeQuestion,
  EducationalLevel,
  CurriculumStandard,
  EducationSystemCode,
  CountryCode
} from "../types/curriculum";
import { storageService } from "../services/storageService";
import { AnalyticsService, DashboardMetrics } from "../services/analyticsService";
import { curriculumService } from "../services/curriculumService";
import { MATHEMATICS_UNITS } from "../data/curriculumData";

interface LearnerContextType {
  profile: ExtendedLearnerProfile;
  metrics: DashboardMetrics;
  isLoading: boolean;
  activeUnit: Unit;
  activeSkill: Skill;
  setActiveSkillAndUnit: (skill: Skill, unit: Unit) => void;
  updateProfileInfo: (updates: Partial<ExtendedLearnerProfile>) => Promise<void>;
  switchAcademicContext: (context: AcademicContext) => Promise<void>;
  recordQuestionAttempt: (attempt: Omit<QuestionAttempt, "id" | "timestamp">) => Promise<void>;
  recordPracticeCompletion: (skillId: string, deltaPoints: number, isCorrect: boolean) => Promise<void>;
  recordDiagnosticResult: (result: DiagnosticResult) => Promise<void>;
  recordExamResult: (submission: Omit<ExamSubmissionRecord, "id" | "submittedAt">) => Promise<void>;
  recordPlayCompletion: (activityTitle: string, skillId: string, score: number, maxScore: number, pointsDelta: number, xpDelta: number, timeSpentSeconds: number) => Promise<void>;
  resetToDefaultProfile: () => Promise<void>;
}

const LearnerContext = createContext<LearnerContextType | undefined>(undefined);

export const LearnerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ExtendedLearnerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Active navigation selection
  const defaultUnit = MATHEMATICS_UNITS[2]; // Quadratics
  const defaultSkill = defaultUnit.skills[0];

  const [activeUnit, setActiveUnit] = useState<Unit>(defaultUnit);
  const [activeSkill, setActiveSkill] = useState<Skill>(defaultSkill);

  // Initialize from storage service on mount
  useEffect(() => {
    async function init() {
      try {
        const loadedProfile = await storageService.getProfile();
        setProfile(loadedProfile);

        // Match initial active unit with profile's activeUnitId if present
        if (loadedProfile.activeUnitId) {
          const matchingUnit = curriculumService.getUnitById(loadedProfile.activeUnitId);
          if (matchingUnit) {
            setActiveUnit(matchingUnit);
            setActiveSkill(matchingUnit.skills[0]);
          }
        }
      } catch (err) {
        console.error("Failed to load initial learner profile:", err);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  const setActiveSkillAndUnit = (skill: Skill, unit: Unit) => {
    setActiveSkill(skill);
    setActiveUnit(unit);
    if (profile && profile.activeUnitId !== unit.id) {
      updateProfileInfo({ activeUnitId: unit.id });
    }
  };

  const updateProfileInfo = async (updates: Partial<ExtendedLearnerProfile>) => {
    if (!profile) return;
    const updated = { ...profile, ...updates };
    const saved = await storageService.saveProfile(updated);
    setProfile(saved);
  };

  const switchAcademicContext = async (context: AcademicContext) => {
    if (!profile) return;
    const updated: ExtendedLearnerProfile = {
      ...profile,
      academicContext: context,
      updatedAt: new Date().toISOString()
    };
    const saved = await storageService.saveProfile(updated);
    setProfile(saved);
  };

  const recordQuestionAttempt = async (attemptData: Omit<QuestionAttempt, "id" | "timestamp">) => {
    if (!profile) return;
    const updated = await storageService.recordQuestionAttempt(attemptData);
    setProfile(updated);
  };

  const recordPracticeCompletion = async (skillId: string, deltaPoints: number, isCorrect: boolean) => {
    if (!profile) return;
    
    // Update mastery in storage
    const updated = await storageService.updateMastery(skillId, deltaPoints, isCorrect);
    
    // Log practice activity
    const skill = curriculumService.getSkillById(skillId);
    const skillTitle = skill?.title || "Mathematical Skill";

    const afterActivity = await storageService.recordActivity({
      type: "practice",
      title: `Practiced ${skillTitle}`,
      description: `Gained +${deltaPoints} Mastery Pts. Status: ${isCorrect ? "Correct Solution" : "Reviewed with Socratic Hints"}`,
      pointsEarned: deltaPoints,
      xpEarned: isCorrect ? 50 : 20,
      metadata: {
        skillId
      }
    });

    setProfile(afterActivity);
  };

  const recordDiagnosticResult = async (result: DiagnosticResult) => {
    if (!profile) return;
    const updated = await storageService.recordDiagnostic(result);
    setProfile(updated);
  };

  const recordExamResult = async (submission: Omit<ExamSubmissionRecord, "id" | "submittedAt">) => {
    if (!profile) return;
    const updated = await storageService.recordExamSubmission(submission);
    setProfile(updated);
  };

  const recordPlayCompletion = async (
    activityTitle: string,
    skillId: string,
    score: number,
    maxScore: number,
    pointsDelta: number,
    xpDelta: number,
    timeSpentSeconds: number
  ) => {
    if (!profile) return;
    const updated = await storageService.recordPlayCompletion(
      activityTitle,
      skillId,
      score,
      maxScore,
      pointsDelta,
      xpDelta,
      timeSpentSeconds
    );
    setProfile(updated);
  };

  const resetToDefaultProfile = async () => {
    const fresh = await storageService.resetToInitial();
    setProfile(fresh);
    const u = MATHEMATICS_UNITS[2];
    setActiveUnit(u);
    setActiveSkill(u.skills[0]);
  };

  const metrics = useMemo(() => {
    if (!profile) {
      return AnalyticsService.calculateDashboardMetrics({
        ...storageService as any
      });
    }
    return AnalyticsService.calculateDashboardMetrics(profile);
  }, [profile]);

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
          <span className="text-sm font-semibold tracking-wider uppercase text-slate-300">
            Initializing MOOS TECHY ACADEMY...
          </span>
        </div>
      </div>
    );
  }

  return (
    <LearnerContext.Provider
      value={{
        profile,
        metrics,
        isLoading,
        activeUnit,
        activeSkill,
        setActiveSkillAndUnit,
        updateProfileInfo,
        switchAcademicContext,
        recordQuestionAttempt,
        recordPracticeCompletion,
        recordDiagnosticResult,
        recordExamResult,
        recordPlayCompletion,
        resetToDefaultProfile
      }}
    >
      {children}
    </LearnerContext.Provider>
  );
};

export const useLearner = (): LearnerContextType => {
  const context = useContext(LearnerContext);
  if (!context) {
    throw new Error("useLearner must be used within a LearnerProvider");
  }
  return context;
};
