import React, { useState } from "react";
import {
  Sparkles,
  Trophy,
  Flame,
  Award,
  ArrowRight,
  Compass,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Clock,
  BookOpen,
  Calendar,
  Layers,
  Star,
  Target,
  Play,
  RotateCcw,
  Settings,
  Brain,
  Zap,
  GraduationCap,
  Gamepad2,
  QrCode,
  ShieldCheck,
  ClipboardList,
  Heart,
  Video,
  ExternalLink,
  Check,
  CheckCheck,
  FileCheck,
  Radio,
  Mic
} from "lucide-react";
import { useLearner } from "../context/LearnerContext";
import { Skill, Unit } from "../types/curriculum";
import { SAMPLE_BADGES } from "../data/curriculumData";
import { curriculumService } from "../services/curriculumService";
import { videoLearningService } from "../services/videoLearningService";
import { teacherStudioService } from "../services/teacherStudioService";
import { readinessService } from "../services/readinessService";
import { achievementService } from "../services/achievementService";
import { ReadinessPathway } from "../types/readiness";
import { ControlledCertificate } from "../types/achievement";
import { ReadinessPathwayModal } from "./readiness/ReadinessPathwayModal";
import { CertificateModal } from "./certificates/CertificateModal";
import { LearnerProfileModal } from "./LearnerProfileModal";
import { MasteryHeatmap } from "./MasteryHeatmap";
import { AchievementCenter } from "./AchievementCenter";

interface LearnerDashboardProps {
  onLaunchSkill: (skill: Skill, unit: Unit, assignmentId?: string) => void;
  onStudyLesson?: (skill: Skill, unit: Unit) => void;
  onRetakeDiagnostic: () => void;
  onOpenExamHall: () => void;
  onOpenAITutor: () => void;
  onOpenPlayArena?: () => void;
  onOpenQRHub?: () => void;
  onOpenParentPortal?: () => void;
  onOpenSaturationStudio?: () => void;
  onNavigateToCurriculum?: () => void;
  onOpenVideoStudio?: () => void;
  onOpenLiveVoice?: () => void;
  onOpenTranscribe?: () => void;
}

export const LearnerDashboard: React.FC<LearnerDashboardProps> = ({
  onLaunchSkill,
  onStudyLesson,
  onRetakeDiagnostic,
  onOpenExamHall,
  onOpenAITutor,
  onOpenPlayArena,
  onOpenQRHub,
  onOpenParentPortal,
  onOpenSaturationStudio,
  onNavigateToCurriculum,
  onOpenVideoStudio,
  onOpenLiveVoice,
  onOpenTranscribe
}) => {
  const { profile, metrics, activeUnit } = useLearner();
  const [activeTab, setActiveTab] = useState<"overview" | "achievements">("overview");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedPathway, setSelectedPathway] = useState<ReadinessPathway | null>(null);
  const [isReadinessModalOpen, setIsReadinessModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<ControlledCertificate | null>(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  const readinessPathways = readinessService.getAllPathways();
  const certificates = achievementService.getUserCertificates(profile?.id || "usr_lrn_chidi_okonkwo");

  const classroomAssignments = (teacherStudioService.getAssignments() || []).filter(
    (a) =>
      a &&
      a.status === "active" &&
      (!a.targetLearnerIds ||
        !a.targetLearnerIds.length ||
        a.targetLearnerIds.includes(profile?.id) ||
        a.targetLearnerIds.includes("demo-learner-01"))
  );

  const formatLevel = (level: string) => {
    switch (level) {
      case "primary_foundations": return "Primary Foundations (Pri 1-3)";
      case "upper_primary": return "Upper Primary (Pri 4-6)";
      case "junior_secondary": return "Junior Secondary (JSS 1-3 / BECE)";
      case "senior_secondary": return "Senior Secondary (SSS 1-3 / WAEC)";
      case "university_prep": return "University STEM Foundation";
      default: return level.replace("_", " ");
    }
  };

  const formatCurriculum = (curriculum: string) => {
    switch (curriculum) {
      case "WAEC_WASSCE": return "WAEC / WASSCE & JAMB UTME";
      case "JAMB_UTME": return "JAMB UTME CBT Standard";
      case "NERDC_NIGERIAN": return "NERDC Nigerian Standard";
      case "CAMBRIDGE_IGCSE": return "Cambridge IGCSE Extended";
      case "COMMON_ENTRANCE": return "National Common Entrance (NCEE)";
      default: return curriculum;
    }
  };

  return (
    <div id="learner-dashboard-view" className="space-y-6 max-w-6xl mx-auto">
      {/* Top Learner Identity & Progress Milestone Card */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white p-7 shadow-xl border border-indigo-800/60 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                MOOS Academy • Personalized Learning State
              </span>
              <span className="text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
                Level {profile.level || 1} Scholar
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {profile.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-indigo-200/90 max-w-xl">
              <span>Target Level: <strong className="text-white">{formatLevel(profile.targetLevel)}</strong></span>
              <span>•</span>
              <span>Curriculum: <strong className="text-amber-300">{formatCurriculum(profile.curriculum)}</strong></span>
              {profile.academicContext && (
                <>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setIsProfileModalOpen(true)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/30 hover:bg-indigo-500/50 border border-indigo-300/30 text-white font-medium text-xs transition"
                    title="Click to switch Academic Context & Jurisdiction"
                  >
                    <span>
                      {profile.academicContext.country === "NG" ? "🇳🇬" :
                       profile.academicContext.country === "UK" ? "🇬🇧" :
                       profile.academicContext.country === "US" ? "🇺🇸" : "🌍"}
                    </span>
                    <span className="text-amber-200 font-bold">{profile.academicContext.educationSystem}</span>
                    <span className="text-indigo-200 text-[11px]">({profile.academicContext.gradeOrYear})</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Quick Stats Pills */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Daily Streak */}
            <button
              type="button"
              onClick={() => setActiveTab("achievements")}
              className="flex items-center gap-2.5 rounded-2xl bg-white/10 hover:bg-white/20 px-4 py-2.5 backdrop-blur-xs border border-white/10 hover:border-amber-400/50 transition cursor-pointer text-left"
              title="Open Streak & Consistency Center"
            >
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Flame className="h-5 w-5 fill-amber-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase text-indigo-200 font-semibold">Daily Streak</div>
                <div className="text-base font-bold text-white">{profile.streak?.count || 1} Days</div>
              </div>
            </button>

            {/* Total Mastery Points */}
            <button
              type="button"
              onClick={() => setActiveTab("achievements")}
              className="flex items-center gap-2.5 rounded-2xl bg-white/10 hover:bg-white/20 px-4 py-2.5 backdrop-blur-xs border border-white/10 hover:border-amber-400/50 transition cursor-pointer text-left"
              title="Open Badges & Mastery Achievements"
            >
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
                <Trophy className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <div className="text-[10px] uppercase text-indigo-200 font-semibold">Mastery Points</div>
                <div className="text-base font-bold text-white">{profile.masteryPoints || 0} pts</div>
              </div>
            </button>

            {/* Socratic AI Tutor Quick Connect */}
            <button
              id="dash-open-tutor-btn"
              type="button"
              onClick={onOpenAITutor}
              className="flex items-center gap-2 rounded-2xl bg-amber-400 px-4 py-3 text-xs font-bold text-indigo-950 shadow-md hover:bg-amber-300 transition cursor-pointer"
            >
              <Sparkles className="h-4 w-4 fill-indigo-950" />
              <span>Talk with Tutor Moos</span>
            </button>

            {/* Parent Oversight Portal */}
            {onOpenParentPortal && (
              <button
                id="dash-open-parent-portal-btn"
                type="button"
                onClick={onOpenParentPortal}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-rose-300 hover:text-rose-200 transition border border-white/10 cursor-pointer"
                title="Parent Learning Oversight & Transparency"
              >
                <Heart className="h-5 w-5" />
              </button>
            )}

            {/* Achievement Center Direct Shortcut */}
            <button
              id="dash-open-achievements-btn"
              type="button"
              onClick={() => setActiveTab("achievements")}
              className={`p-3 rounded-2xl transition border cursor-pointer ${
                activeTab === "achievements"
                  ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md"
                  : "bg-white/10 hover:bg-white/20 text-amber-300 border-white/10"
              }`}
              title="Achievement Center: Badges, Streaks & Milestones"
            >
              <Trophy className="h-5 w-5" />
            </button>

            {/* Profile Settings */}
            <button
              id="dash-open-settings-btn"
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition border border-white/10 cursor-pointer"
              title="Academic Settings & Targets"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Main View Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            id="tab-btn-overview"
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition cursor-pointer ${
              activeTab === "overview"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>Learning Roadmap & Overview</span>
          </button>

          <button
            id="tab-btn-achievements"
            type="button"
            onClick={() => setActiveTab("achievements")}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition cursor-pointer ${
              activeTab === "achievements"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            <Trophy className="h-4 w-4 text-amber-400" />
            <span>Achievement Center</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeTab === "achievements"
                  ? "bg-white/20 text-white"
                  : "bg-amber-100 text-amber-900 border border-amber-200"
              }`}
            >
              {profile.unlockedBadges?.length || 2} Badges • {profile.streak?.count || 1}d Streak
            </span>
          </button>
        </div>

        {activeTab === "overview" ? (
          <button
            type="button"
            onClick={() => setActiveTab("achievements")}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer self-end sm:self-auto"
          >
            <span>Explore Badges & Milestones</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-800 transition cursor-pointer self-end sm:self-auto"
          >
            <span>← Back to Learning Overview</span>
          </button>
        )}
      </div>

      {activeTab === "achievements" ? (
        <AchievementCenter
          onInspectCertificate={(cert) => {
            setSelectedCertificate(cert);
            setIsCertificateModalOpen(true);
          }}
          onLaunchSkill={onLaunchSkill}
          onOpenPlayArena={onOpenPlayArena}
          onOpenExamHall={onOpenExamHall}
        />
      ) : (
        <>

      {/* Prioritized Single Next Useful Action Banner */}
      <div className="rounded-3xl border-2 border-indigo-500/30 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider flex items-center gap-1">
              <Zap className="h-3 w-3 fill-current" /> Priority Next Step
            </span>
            <span className="text-xs font-semibold text-indigo-200">
              {classroomAssignments.length > 0 ? "Classroom Submission Due" : "Recommended Syllabus Advancement"}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            {classroomAssignments.length > 0
              ? `Complete Assignment: ${classroomAssignments[0].title}`
              : `Target Mastery: ${metrics.recommendedSkill?.title || "Algebraic Foundations"}`}
          </h2>

          <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
            {classroomAssignments.length > 0
              ? `Teacher-assigned task. Due ${classroomAssignments[0].dueDate}. Est. 15 mins.`
              : "Address identified prerequisite links to unlock advanced multi-step WAEC/WASSCE & JAMB problem solving."}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => {
              const defaultPathway = readinessPathways[0];
              if (defaultPathway) {
                setSelectedPathway(defaultPathway);
                setIsReadinessModalOpen(true);
              }
            }}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Check Course Readiness</span>
          </button>

          {classroomAssignments.length > 0 ? (
            <button
              type="button"
              onClick={() => {
                const asg = classroomAssignments[0];
                const allUnits = curriculumService.getAllUnits();
                const unit = (asg.unitId ? curriculumService.getUnitById(asg.unitId) : undefined) || allUnits[0];
                const skill = (asg.skillId ? unit?.skills.find((s) => s.id === asg.skillId) : undefined) || unit?.skills[0];
                onLaunchSkill(skill, unit, asg.id);
              }}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md flex items-center gap-2 transition cursor-pointer active:scale-95"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Resume Assignment</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onLaunchSkill(metrics.recommendedSkill, metrics.recommendedUnit)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md flex items-center gap-2 transition cursor-pointer active:scale-95"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Start Recommended Skill</span>
            </button>
          )}
        </div>
      </div>

      {/* 6 Core Pedagogical Questions Grid */}
      <div className="grid md:grid-cols-3 gap-5">
        {/* 1. What am I learning & Why? */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wide">
              <Target className="h-4 w-4" />
              <span>What & Why am I Learning?</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{activeUnit.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Why:</strong> {activeUnit.description} Essential for WAEC/WASSCE Section B multi-step questions and STEM degree pathways.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-mono text-[11px]">{activeUnit.code}</span>
            <span className="text-indigo-600 font-semibold">Active Unit</span>
          </div>
        </div>

        {/* 2. What do I already know? */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wide">
              <CheckCircle2 className="h-4 w-4" />
              <span>What do I already know?</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              {metrics.masteryDistribution.mastered + metrics.masteryDistribution.proficient} Verified Strengths
            </h3>
            <div className="space-y-1.5 text-xs text-slate-600">
              {metrics.strengths.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="truncate max-w-[75%]">{item.title}</span>
                  <span className="font-bold text-emerald-600">{item.points} pts</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Diagnostic Benchmark</span>
            <span className="text-emerald-700 font-semibold">
              Tier: {profile.lastDiagnosticResult?.tier || "Proficient"}
            </span>
          </div>
        </div>

        {/* 3. What do I need to improve? */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wide">
              <TrendingUp className="h-4 w-4" />
              <span>What do I need to improve?</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Target Skill Growth</h3>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {metrics.weaknesses.slice(0, 2).map((item, idx) => (
                <li key={idx} className="leading-snug">
                  <strong className="text-slate-800">{item.title}:</strong> {item.recommendation}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={onRetakeDiagnostic}
              className="text-indigo-600 font-semibold hover:underline flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Calibrate Diagnostic</span>
            </button>
            <span className="text-slate-400">Adaptive State</span>
          </div>
        </div>
      </div>

      {/* Recommended Next Action Hero Card (What should I do next?) */}
      <div className="rounded-3xl border border-indigo-200 bg-gradient-to-r from-indigo-50 via-white to-indigo-50/40 p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>Recommended Immediate Activity</span>
            </div>
            {metrics.sessionPhase && (
              <span className="text-[11px] font-bold bg-indigo-600 text-white px-2.5 py-0.5 rounded-full">
                Phase: {metrics.sessionPhase.phaseTitle}
              </span>
            )}
            {metrics.recommendationType === "remediation" && (
              <span className="text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
                Remediation Target
              </span>
            )}
            {metrics.recommendationType === "new_skill" && (
              <span className="text-[11px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 px-2 py-0.5 rounded-full">
                Sequential Milestone
              </span>
            )}
            {metrics.recommendationType === "revision" && (
              <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                Mastery Revision & Speed Drill
              </span>
            )}
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Practice: {metrics.recommendedSkill.title}
          </h2>
          <p className="text-xs text-slate-600 max-w-xl">
            {metrics.recommendedReason}. {metrics.recommendedSkill.summary} Guided practice includes step hints, interactive math scratchpad, and Tutor Moos reasoning.
          </p>
          {metrics.prerequisiteGapNotice && (
            <div className="mt-2 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5 font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
              <span>{metrics.prerequisiteGapNotice}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {(() => {
            const recVideo =
              videoLearningService.getVideoByUnitId(metrics.recommendedUnit.id) ||
              videoLearningService.getVideoBySkillId(metrics.recommendedSkill.id);
            if (!recVideo || !onStudyLesson) return null;
            return (
              <button
                id="watch-recommended-video-btn"
                type="button"
                onClick={() => onStudyLesson(metrics.recommendedSkill, metrics.recommendedUnit)}
                className="flex items-center gap-1.5 rounded-xl border border-sky-300 bg-sky-50 px-4 py-3 text-sm font-bold text-sky-800 hover:bg-sky-100 transition cursor-pointer shadow-2xs"
                title={`Watch visual explanation masterclass (${recVideo.durationFormatted})`}
              >
                <Video className="h-4 w-4 text-sky-600" />
                <span>Watch Video ({recVideo.durationFormatted})</span>
              </button>
            );
          })()}

          {onStudyLesson && (
            <button
              id="study-recommended-lesson-btn"
              type="button"
              onClick={() => onStudyLesson(metrics.recommendedSkill, metrics.recommendedUnit)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-2xs"
            >
              <BookOpen className="h-4 w-4 text-indigo-600" />
              <span>Read Lesson</span>
            </button>
          )}
          <button
            id="launch-recommended-practice-btn"
            type="button"
            onClick={() => onLaunchSkill(metrics.recommendedSkill, metrics.recommendedUnit)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-indigo-700 transition cursor-pointer"
          >
            <Play className="h-4 w-4 fill-white" />
            <span>Start Practice Arena</span>
          </button>
        </div>
      </div>

      {/* Mastery Heatmap — Visualizing Learner Progression across All Curriculum Units */}
      <MasteryHeatmap
        onLaunchSkill={onLaunchSkill}
        onStudyLesson={onStudyLesson}
        targetLevel={profile.targetLevel || "all"}
        onOpenSaturationStudio={onOpenSaturationStudio}
      />

      {/* Institutional Classroom Assignments (If Any) */}
      {classroomAssignments.length > 0 && (
        <div className="rounded-3xl border border-indigo-200 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-md">
                <ClipboardList className="h-3.5 w-3.5 text-indigo-600" />
                Assigned by Classroom Teacher
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {classroomAssignments.length} Active Tasks
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 pt-1">
            {classroomAssignments.map((asg) => {
              const allUnits = curriculumService.getAllUnits();
              const unit = (asg.unitId ? curriculumService.getUnitById(asg.unitId) : undefined) || allUnits[0];
              const skill = (asg.skillId ? unit?.skills.find((s) => s.id === asg.skillId) : undefined) || unit?.skills[0];
              const isCompleted = Boolean(
                asg.completedLearnerIds?.includes(profile?.id) ||
                asg.completedLearnerIds?.includes("demo-learner-01")
              );

              return (
                <div
                  key={asg.id}
                  className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                        {asg.assignmentType.replace("_", " ")}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Due {asg.dueDate}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{asg.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2">{asg.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                    <span className="text-[11px] font-semibold text-slate-500">
                      {isCompleted ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                        </span>
                      ) : (
                        "Pending Submission"
                      )}
                    </span>

                    <button
                      type="button"
                      onClick={() => onLaunchSkill(skill, unit, asg.id)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition cursor-pointer"
                    >
                      <span>{isCompleted ? "Review Skill" : "Start Task"}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Exam Readiness & Retrieval Independence Intelligence Strip */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Exam Readiness Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
                WAEC / JAMB / IGCSE Readiness
              </span>
              <span className="text-xs font-extrabold text-indigo-700">
                Score: {metrics.examReadiness.readinessScore}/100
              </span>
            </div>
            <h3 className="text-sm font-extrabold text-slate-900">
              {metrics.examReadiness.headline}
            </h3>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Syllabus Coverage</span>
                <span className="font-bold">{metrics.examReadiness.syllabusCoveragePercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${metrics.examReadiness.syllabusCoveragePercentage}%` }}
                />
              </div>
            </div>
            {metrics.examReadiness.unresolvedBlockers.length > 0 && (
              <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200 font-medium">
                {metrics.examReadiness.unresolvedBlockers[0]}
              </p>
            )}
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {metrics.examReadiness.proficientOrMasteredCount} of {metrics.examReadiness.totalSyllabusSkillsCount} Core Skills Mastered
            </span>
            <button
              type="button"
              onClick={onOpenExamHall}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>CBT Exam Hall</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Retrieval Independence & Scaffolding Ratio Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
                <Clock className="h-3.5 w-3.5 text-emerald-600" />
                Retrieval Independence Ratio
              </span>
              <span className="text-xs font-bold text-emerald-700">
                {metrics.hintDependency.independentAccuracyRate}% Independent
              </span>
            </div>
            <h3 className="text-sm font-extrabold text-slate-900">
              {metrics.hintDependency.interpretation === "high_independence"
                ? "High Cognitive Independence"
                : metrics.hintDependency.interpretation === "balanced_scaffolding"
                ? "Balanced Scaffolding & Hint Adoption"
                : "Active Scaffolding Required"}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {metrics.hintDependency.interpretation === "high_independence"
                ? "Solves mathematical problems with zero step-hint assistance, exhibiting unprompted conceptual recall."
                : "Frequently leverages graduated Socratic hints to verify algebra steps and sign logic."}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {metrics.hintDependency.attemptsWithHints} of {metrics.hintDependency.totalAttempts} Attempts Used Hints
            </span>
            <button
              type="button"
              onClick={() => onLaunchSkill(metrics.recommendedSkill, metrics.recommendedUnit)}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Practice Arena</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Flagship Academic Capabilities: Learn & Play + QR Companion Hub */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Card 1: Learn & Play Arena */}
        <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/20 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
                <Gamepad2 className="h-3.5 w-3.5 text-amber-600" />
                Learn & Play Arena
              </span>
              <span className="text-xs text-slate-400 font-medium">Equation Balancer • Speed Grid</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              Interactive Mathematics Challenges
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore physical balance scales for algebraic operations and rapid identity matching matrices. Earn verified mastery points and climb Scholar tiers through interactive play.
            </p>
          </div>

          <div className="pt-3 border-t border-amber-100 flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700">+35 Mastery Pts & XP</span>
            {onOpenPlayArena && (
              <button
                id="dash-open-play-arena-btn"
                type="button"
                onClick={onOpenPlayArena}
                className="flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2 shadow-xs transition cursor-pointer"
              >
                <span>Launch Challenges</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Card 2: C.E.M.M QR Resource System */}
        <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/50 via-white to-indigo-50/20 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded-md">
                <QrCode className="h-3.5 w-3.5 text-indigo-600" />
                QR Resource Companion
              </span>
              <span className="text-xs text-slate-400 font-medium">Textbook Companion Ecosystem</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              Physical Textbook to Digital Codex
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bridge printed textbooks (such as C.E.M.M) with step-by-step worked solutions, mathematical reasoning, formula quick-references, and direct Socratic AI guidance.
            </p>
          </div>

          <div className="pt-3 border-t border-indigo-100 flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700">Scan or Enter Resource Codes</span>
            {onOpenQRHub && (
              <button
                id="dash-open-qr-hub-btn"
                type="button"
                onClick={onOpenQRHub}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 shadow-xs transition cursor-pointer"
              >
                <span>Open Digital Hub</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Multimodal AI Studios: Veo 3 Video, Live Voice & Audio Transcription */}
      <div className="grid md:grid-cols-3 gap-5">
        {/* Veo 3 Video Studio */}
        <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/70 via-white to-indigo-50/30 p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-md">
                <Video className="h-3.5 w-3.5 text-indigo-600" />
                Veo 3 Video
              </span>
              <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded font-black">
                16:9 / 9:16
              </span>
            </div>
            <h3 className="text-sm font-extrabold text-slate-900">
              Educational Video Generator
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Generate pedagogical concept animations and science simulations using Google's veo-3.1-fast-generate-preview.
            </p>
          </div>

          <div className="pt-2 border-t border-indigo-100">
            {onOpenVideoStudio && (
              <button
                type="button"
                onClick={onOpenVideoStudio}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 shadow-xs transition cursor-pointer"
              >
                <Video className="h-3.5 w-3.5" />
                <span>Open Video Studio</span>
              </button>
            )}
          </div>
        </div>

        {/* Gemini 3.8 Live Voice */}
        <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                <Radio className="h-3.5 w-3.5 text-amber-600" />
                Live API Voice
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-black">
                gemini-3.8-live
              </span>
            </div>
            <h3 className="text-sm font-extrabold text-slate-900">
              Real-Time Voice Call
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Low-latency, natural bidirectional oral dialogues with Tutor Moos using live WebSockets audio streaming.
            </p>
          </div>

          <div className="pt-2 border-t border-amber-100">
            {onOpenLiveVoice && (
              <button
                type="button"
                onClick={onOpenLiveVoice}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2 shadow-xs transition cursor-pointer"
              >
                <Radio className="h-3.5 w-3.5" />
                <span>Start Live Voice Call</span>
              </button>
            )}
          </div>
        </div>

        {/* Audio Speech Transcriber */}
        <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                <Mic className="h-3.5 w-3.5 text-emerald-600" />
                Transcribe Audio
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-black">
                gemini-3.5-transcribe
              </span>
            </div>
            <h3 className="text-sm font-extrabold text-slate-900">
              Audio Speech-to-Text
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Record classroom lectures, study notes, or questions with instant high-accuracy speech transcription.
            </p>
          </div>

          <div className="pt-2 border-t border-emerald-100">
            {onOpenTranscribe && (
              <button
                type="button"
                onClick={onOpenTranscribe}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 shadow-xs transition cursor-pointer"
              >
                <Mic className="h-3.5 w-3.5" />
                <span>Open Transcriber</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Examination Simulation & Achievements Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Exam Simulation Hall Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 text-sm">Examination Simulation Hall</h3>
              </div>
              <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                Timed CBT
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Test your speed, stamina, and accuracy under real WAEC / JAMB UTME / Common Entrance exam conditions.
            </p>
          </div>

          <button
            id="dash-launch-exam-btn"
            type="button"
            onClick={onOpenExamHall}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition shadow-xs cursor-pointer"
          >
            <span>Enter Exam Simulation Arena</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Badges & Achievements Showcase */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <h3 className="font-bold text-slate-900 text-sm">Earned Achievements</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {profile.unlockedBadges?.length || 2} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {SAMPLE_BADGES.map((badge) => {
              const isUnlocked = profile.unlockedBadges?.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`rounded-xl border p-3 text-left transition ${
                    isUnlocked
                      ? "border-amber-200 bg-amber-50/40 text-slate-900 shadow-2xs"
                      : "border-slate-100 bg-slate-50 text-slate-400 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Star
                      className={`h-4 w-4 ${
                        isUnlocked ? "text-amber-500 fill-amber-400" : "text-slate-300"
                      }`}
                    />
                    <span className="font-bold text-xs line-clamp-1">{badge.title}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setActiveTab("achievements")}
            className="w-full py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer border border-indigo-200/60"
          >
            <Trophy className="h-3.5 w-3.5 text-amber-500" />
            <span>Open Achievement Center</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Course Readiness Pathways ("Get Ready" Architecture) */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5" /> Prerequisite Diagnostics
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Pedagogical Readiness Framework
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Course Readiness Pathways ("Get Ready" Bridge)
            </h3>
            <p className="text-xs text-slate-500 max-w-2xl">
              Target course preparation: identify prerequisite knowledge gaps, study focused foundational lessons, and verify conceptual fluency before entering new academic levels.
            </p>
          </div>

          {onNavigateToCurriculum && (
            <button
              type="button"
              onClick={onNavigateToCurriculum}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
            >
              <span>Explore Course Catalog</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {readinessPathways.map((pathway) => {
            const isCertified = pathway.status === "readiness_certified" || pathway.status === "exempt_mastered";
            const isDiagnosticPending = pathway.status === "not_started" || pathway.status === "evaluating";
            const gapCount = pathway.identifiedGaps?.length || 0;

            return (
              <div
                key={pathway.id}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-indigo-300 transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                        isCertified
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : isDiagnosticPending
                          ? "bg-amber-100 text-amber-800 border-amber-200"
                          : "bg-rose-100 text-rose-800 border-rose-200"
                      }`}
                    >
                      {pathway.status.replace("_", " ").toUpperCase()}
                    </span>

                    <span className="text-[11px] font-bold text-slate-500">
                      {pathway.prerequisiteSkills?.length || 0} Prerequisites
                    </span>
                  </div>

                  <h4 className="text-base font-black text-slate-900 leading-snug">
                    {pathway.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {pathway.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-500">
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-medium">
                      Target: {pathway.targetCourseOrLevel}
                    </span>
                    {gapCount > 0 ? (
                      <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-bold">
                        {gapCount} Gaps Identified
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                        Gaps Cleared
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">
                    {pathway.prerequisiteDiagnosticQuestions?.length || 0} Diagnostic Items
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPathway(pathway);
                      setIsReadinessModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                  >
                    <span>{isCertified ? "Review Pathway" : "Launch Diagnostic"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Verified Certificates & Credential Registry */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                <Award className="h-3.5 w-3.5 text-amber-700" /> Evidence-Anchored Credentials
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Controlled Academic Recognition
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Official Certificates & Competency Verifications ({certificates.length})
            </h3>
            <p className="text-xs text-slate-500 max-w-2xl">
              Authentic credentials earned through verified mastery milestones and examination achievements. Each certificate includes an immutable verification seal.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-2xl bg-gradient-to-br from-amber-50/30 via-white to-slate-50 border border-amber-200/80 hover:border-amber-300 transition flex flex-col justify-between space-y-4 shadow-2xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-black text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-200">
                    {cert.verificationCode}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {cert.status}
                  </span>
                </div>

                <h4 className="text-base font-black text-slate-900 leading-snug">
                  {cert.title}
                </h4>

                <p className="text-xs text-slate-600">
                  {cert.evidenceSummary.criterion}
                </p>

                <div className="p-2.5 rounded-xl bg-amber-100/40 border border-amber-200/60 text-xs text-slate-700 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-600">Attained Metric:</span>
                    <span className="font-black text-amber-900">{cert.evidenceSummary.scoreOrPercentage}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-600">Issued On:</span>
                    <span className="text-slate-700">{new Date(cert.issuedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-amber-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {cert.issuer}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCertificate(cert);
                    setIsCertificateModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                >
                  <Award className="h-3.5 w-3.5" />
                  <span>Inspect Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </>
      )}

      {/* Learner Profile & Academic Target Settings Modal */}
      <LearnerProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Readiness Pathway Modal */}
      <ReadinessPathwayModal
        pathway={selectedPathway}
        isOpen={isReadinessModalOpen}
        onClose={() => setIsReadinessModalOpen(false)}
        onStudyFoundationalLesson={(unitId, skillId) => {
          setIsReadinessModalOpen(false);
          const allUnits = curriculumService.getAllUnits();
          const u = curriculumService.getUnitById(unitId) || allUnits[0];
          const s = u?.skills.find((sk) => sk.id === skillId) || u?.skills[0];
          if (s && u && onStudyLesson) {
            onStudyLesson(s, u);
          }
        }}
      />

      {/* Official Certificate Verification Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
      />
    </div>
  );
};
