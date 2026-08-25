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
  QrCode
} from "lucide-react";
import { useLearner } from "../context/LearnerContext";
import { Skill, Unit } from "../types/curriculum";
import { MATHEMATICS_UNITS, SAMPLE_BADGES } from "../data/curriculumData";
import { LearnerProfileModal } from "./LearnerProfileModal";

interface LearnerDashboardProps {
  onLaunchSkill: (skill: Skill, unit: Unit) => void;
  onRetakeDiagnostic: () => void;
  onOpenExamHall: () => void;
  onOpenAITutor: () => void;
  onOpenPlayArena?: () => void;
  onOpenQRHub?: () => void;
}

export const LearnerDashboard: React.FC<LearnerDashboardProps> = ({
  onLaunchSkill,
  onRetakeDiagnostic,
  onOpenExamHall,
  onOpenAITutor,
  onOpenPlayArena,
  onOpenQRHub
}) => {
  const { profile, metrics, activeUnit } = useLearner();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

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
                MOOS TECHY ACADEMY • Personalized Learning State
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
            <div className="flex items-center gap-2.5 rounded-2xl bg-white/10 px-4 py-2.5 backdrop-blur-xs border border-white/10">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Flame className="h-5 w-5 fill-amber-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase text-indigo-200 font-semibold">Daily Streak</div>
                <div className="text-base font-bold text-white">{profile.streak?.count || 1} Days</div>
              </div>
            </div>

            {/* Total Mastery Points */}
            <div className="flex items-center gap-2.5 rounded-2xl bg-white/10 px-4 py-2.5 backdrop-blur-xs border border-white/10">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
                <Trophy className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <div className="text-[10px] uppercase text-indigo-200 font-semibold">Mastery Points</div>
                <div className="text-base font-bold text-white">{profile.masteryPoints || 0} pts</div>
              </div>
            </div>

            {/* Socratic AI Tutor Quick Connect */}
            <button
              id="dash-open-tutor-btn"
              type="button"
              onClick={onOpenAITutor}
              className="flex items-center gap-2 rounded-2xl bg-amber-400 px-4 py-3 text-xs font-bold text-indigo-950 shadow-md hover:bg-amber-300 transition"
            >
              <Sparkles className="h-4 w-4 fill-indigo-950" />
              <span>Talk with Tutor Moos</span>
            </button>

            {/* Profile Settings */}
            <button
              id="dash-open-settings-btn"
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition border border-white/10"
              title="Academic Settings & Targets"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
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

        <div className="flex items-center gap-3">
          <button
            id="launch-recommended-practice-btn"
            type="button"
            onClick={() => onLaunchSkill(metrics.recommendedSkill, metrics.recommendedUnit)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-indigo-700 transition cursor-pointer"
          >
            <Play className="h-4 w-4 fill-white" />
            <span>Start Practice Arena</span>
          </button>
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
                className="flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2 shadow-xs transition"
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
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 shadow-xs transition"
              >
                <span>Open Digital Hub</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mastery Progress Heatmap & Achievements Section */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Mastery Heatmap / Progress Bar */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Curriculum Mastery Breakdown
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {metrics.masteryDistribution.mastered} of {metrics.masteryDistribution.total} Skills Mastered
            </span>
          </div>

          {/* Mastery status legend */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
              <div className="font-bold text-slate-700">{metrics.masteryDistribution.unstarted}</div>
              <div className="text-[11px] text-slate-400">Unstarted</div>
            </div>
            <div className="rounded-xl border border-amber-100 bg-amber-50 p-2.5">
              <div className="font-bold text-amber-700">{metrics.masteryDistribution.familiar}</div>
              <div className="text-[11px] text-amber-600">Familiar</div>
            </div>
            <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-2.5">
              <div className="font-bold text-indigo-700">{metrics.masteryDistribution.proficient}</div>
              <div className="text-[11px] text-indigo-600">Proficient</div>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-2.5">
              <div className="font-bold text-emerald-700">{metrics.masteryDistribution.mastered}</div>
              <div className="text-[11px] text-emerald-600">Mastered</div>
            </div>
          </div>

          {/* Skill Mastery Sliders */}
          <div className="space-y-3.5 pt-1">
            {MATHEMATICS_UNITS.flatMap((u) => u.skills).map((skill) => {
              const record = (profile?.masteryRecords || {})[skill.id];
              const points = record?.points || 0;
              const status = record?.status || "unstarted";

              let barColor = "bg-slate-200";
              if (status === "mastered") barColor = "bg-emerald-500";
              else if (status === "proficient") barColor = "bg-indigo-600";
              else if (status === "familiar") barColor = "bg-amber-500";

              return (
                <div key={skill.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800 truncate max-w-[70%]">
                      {skill.title}
                    </span>
                    <span className="font-bold text-slate-600">{points} / 100 pts</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                      style={{ width: `${points}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges & Exam Hall Quick Launch */}
        <div className="lg:col-span-5 space-y-6">
          {/* Exam Simulation Hall Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
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

            <button
              id="dash-launch-exam-btn"
              type="button"
              onClick={onOpenExamHall}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition shadow-xs"
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
          </div>
        </div>
      </div>

      {/* Learner Profile & Academic Target Settings Modal */}
      <LearnerProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
};
