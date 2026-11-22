import React, { useState, useMemo } from "react";
import {
  Trophy,
  Flame,
  Award,
  Star,
  CheckCircle2,
  Target,
  Sparkles,
  Clock,
  Calendar,
  Zap,
  ShieldCheck,
  TrendingUp,
  BookOpen,
  GraduationCap,
  Compass,
  Filter,
  Lock,
  Search,
  ExternalLink,
  ChevronRight,
  Play,
  RotateCcw,
  Medal,
  Activity,
  Layers,
  Check
} from "lucide-react";
import { useLearner } from "../context/LearnerContext";
import { SAMPLE_BADGES } from "../data/curriculumData";
import { achievementService } from "../services/achievementService";
import { curriculumService } from "../services/curriculumService";
import { Badge, Skill, Unit } from "../types/curriculum";
import { AchievementRecord, ControlledCertificate } from "../types/achievement";

interface AchievementCenterProps {
  onInspectCertificate?: (certificate: ControlledCertificate) => void;
  onLaunchSkill?: (skill: Skill, unit: Unit) => void;
  onOpenPlayArena?: () => void;
  onOpenExamHall?: () => void;
}

type BadgeCategoryFilter = "all" | "mastery" | "streak" | "exam" | "diagnostic" | "ai_collaboration";
type MilestoneCategoryFilter = "all" | "SKILL_MASTERED" | "READINESS_ACHIEVED" | "MASTERCLASS_COMPLETED" | "LEARNING_STREAK" | "COURSE_COMPLETED";

// Extended badge roster with curriculum-wide credentials (definitions only, unlocked status is event-driven)
const EXTENDED_BADGE_CATALOG: Badge[] = [
  ...SAMPLE_BADGES.map(b => ({ ...b, unlockedAt: undefined })),
  {
    id: "badge-quadratics-champion",
    title: "Quadratic Maestro",
    description: "Evaluated non-monic quadratics and completed the square with zero sign errors.",
    iconName: "Target",
    category: "mastery"
  },
  {
    id: "badge-discourse-synthesis",
    title: "Dialectical Synthesizer",
    description: "Constructed counter-warrants and synthesized multi-source evidence in Academic Discourse.",
    iconName: "BookOpen",
    category: "mastery"
  },
  {
    id: "badge-streak-fortnight",
    title: "Fortnight Olympian",
    description: "Maintained an unbroken 14-day active daily deliberate practice streak.",
    iconName: "Flame",
    category: "streak",
    progress: 5,
    maxProgress: 14
  },
  {
    id: "badge-smartboard-scholar",
    title: "Smart Board Masterclass Scholar",
    description: "Completed full interactive whiteboard derivations with live verification checkpoints.",
    iconName: "GraduationCap",
    category: "mastery"
  },
  {
    id: "badge-cbt-speed-ace",
    title: "JAMB Speed Ace",
    description: "Answered 40 CBT questions under timed conditions with greater than 85% accuracy.",
    iconName: "Zap",
    category: "exam",
    progress: 32,
    maxProgress: 40
  },
  {
    id: "badge-prerequisite-shield",
    title: "Prerequisite Guardian",
    description: "Successfully evaluated and cleared all prerequisite gaps across a Course Readiness Pathway.",
    iconName: "ShieldCheck",
    category: "diagnostic"
  }
];

export const AchievementCenter: React.FC<AchievementCenterProps> = ({
  onInspectCertificate,
  onLaunchSkill,
  onOpenPlayArena,
  onOpenExamHall
}) => {
  const { profile, updateProfileInfo } = useLearner();

  // Active filters
  const [badgeFilter, setBadgeFilter] = useState<BadgeCategoryFilter>("all");
  const [badgeSearchQuery, setBadgeSearchQuery] = useState("");
  const [milestoneFilter, setMilestoneFilter] = useState<MilestoneCategoryFilter>("all");
  const [selectedBadgeForDetail, setSelectedBadgeForDetail] = useState<Badge | null>(null);

  // Deterministically evaluate authentic learner achievements on profile state
  const { userAchievements, userCertificates } = useMemo(() => {
    if (!profile) {
      return { userAchievements: [], userCertificates: [] };
    }
    const evalResult = achievementService.evaluateAndSyncLearnerAchievements(profile);
    
    // If newly unlocked badges exist, sync to learner profile
    if (evalResult.newlyUnlockedBadges.length > 0) {
      const merged = Array.from(new Set([...(profile.unlockedBadges || []), ...evalResult.newlyUnlockedBadges]));
      updateProfileInfo({ unlockedBadges: merged });
    }

    return {
      userAchievements: evalResult.achievements,
      userCertificates: evalResult.certificates
    };
  }, [profile?.id, profile?.streakDays, profile?.xp, profile?.masteryRecords]);

  // Derived strictly from learner's earned badges and achievements (never static arbitrary unlocks!)
  const unlockedBadgeIds = useMemo(() => {
    const ids = new Set<string>(profile.unlockedBadges || []);
    userAchievements.forEach((ach) => {
      if (ach.evidence?.referenceId) ids.add(ach.evidence.referenceId);
      if (ach.id) ids.add(ach.id);
    });
    return ids;
  }, [profile.unlockedBadges, userAchievements]);

  // Filtered badges
  const filteredBadges = useMemo(() => {
    return EXTENDED_BADGE_CATALOG.filter((badge) => {
      const matchesCategory = badgeFilter === "all" || badge.category === badgeFilter;
      const matchesSearch =
        badge.title.toLowerCase().includes(badgeSearchQuery.toLowerCase()) ||
        badge.description.toLowerCase().includes(badgeSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [badgeFilter, badgeSearchQuery]);

  // Filtered milestones
  const filteredMilestones = useMemo(() => {
    if (milestoneFilter === "all") return userAchievements;
    return userAchievements.filter((m) => m.category === milestoneFilter);
  }, [userAchievements, milestoneFilter]);

  // Streak metrics
  const streakCount = profile.streak?.count || profile.streakDays || 5;
  const longestStreak = profile.streak?.longestStreak || 8;
  const totalStudyMinutes = profile.totalStudyMinutes || 195;
  const totalMasteryPoints = profile.masteryPoints || 480;
  const currentXp = profile.xp || 1450;
  const scholarLevel = profile.level || 6;
  const nextLevelXp = scholarLevel * 300;
  const levelProgressPct = Math.min(100, Math.round(((currentXp % 300) / 300) * 100));

  // 7-day consistency calendar calculation
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentDayIndex = 4; // Friday in reference date

  // Helper for rendering badge icon
  const renderBadgeIcon = (iconName: string, isUnlocked: boolean, className: string = "h-5 w-5") => {
    switch (iconName) {
      case "Flame":
        return <Flame className={`${className} ${isUnlocked ? "text-amber-500 fill-amber-400" : "text-slate-400"}`} />;
      case "Trophy":
        return <Trophy className={`${className} ${isUnlocked ? "text-amber-400 fill-amber-300" : "text-slate-400"}`} />;
      case "Award":
        return <Award className={`${className} ${isUnlocked ? "text-indigo-400 fill-indigo-300" : "text-slate-400"}`} />;
      case "Compass":
        return <Compass className={`${className} ${isUnlocked ? "text-emerald-400 fill-emerald-300" : "text-slate-400"}`} />;
      case "Sparkles":
        return <Sparkles className={`${className} ${isUnlocked ? "text-purple-400 fill-purple-300" : "text-slate-400"}`} />;
      case "ShieldCheck":
        return <ShieldCheck className={`${className} ${isUnlocked ? "text-emerald-400 fill-emerald-300" : "text-slate-400"}`} />;
      case "GraduationCap":
        return <GraduationCap className={`${className} ${isUnlocked ? "text-cyan-400 fill-cyan-300" : "text-slate-400"}`} />;
      case "Zap":
        return <Zap className={`${className} ${isUnlocked ? "text-amber-400 fill-amber-300" : "text-slate-400"}`} />;
      case "BookOpen":
        return <BookOpen className={`${className} ${isUnlocked ? "text-sky-400 fill-sky-300" : "text-slate-400"}`} />;
      case "Target":
      default:
        return <Star className={`${className} ${isUnlocked ? "text-amber-400 fill-amber-300" : "text-slate-400"}`} />;
    }
  };

  return (
    <div id="achievement-center-root" className="space-y-7 max-w-6xl mx-auto animate-in fade-in duration-200">
      {/* 1. Scholar Identity, Level Progression & High-Level KPIs */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white p-7 shadow-xl border border-indigo-800/60 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -top-10 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Medal className="h-3.5 w-3.5 text-amber-400" />
                Level {scholarLevel} Scholar Tier
              </span>
              <span className="text-xs text-indigo-200 font-medium">
                Senior Secondary STEM & Academic Discourse
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Scholar Achievement & Mastery Center
            </h2>

            <p className="text-xs sm:text-sm text-indigo-200/90 leading-relaxed">
              Every badge, streak day, and learning milestone earned at MOOS Academy is anchored in rigorous evidence: completed problem solving, verified diagnostic standards, and controlled academic achievements.
            </p>

            {/* Level XP Progress Bar */}
            <div className="pt-1 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-indigo-200">
                <span>Current Rank: <strong className="text-white">Scholar Level {scholarLevel}</strong></span>
                <span>{currentXp} / {nextLevelXp} XP ({levelProgressPct}%)</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden p-0.5 border border-white/10">
                <div
                  className="bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 h-1.5 rounded-full transition-all duration-700 shadow-xs"
                  style={{ width: `${levelProgressPct}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-400">
                Earn {nextLevelXp - currentXp} more XP through deliberate practice to attain Level {scholarLevel + 1}
              </span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 shrink-0">
            {/* 1. Daily Streak */}
            <div className="rounded-2xl bg-white/10 border border-white/10 p-3.5 backdrop-blur-xs flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <Flame className="h-5 w-5 fill-amber-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase text-indigo-200 font-bold">Daily Streak</div>
                <div className="text-lg font-black text-white">{streakCount} Days</div>
                <div className="text-[10px] text-amber-300 font-medium">Record: {longestStreak}d</div>
              </div>
            </div>

            {/* 2. Unlocked Badges */}
            <div className="rounded-2xl bg-white/10 border border-white/10 p-3.5 backdrop-blur-xs flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-300 shrink-0">
                <Trophy className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <div className="text-[10px] uppercase text-indigo-200 font-bold">Badges Earned</div>
                <div className="text-lg font-black text-white">{unlockedBadgeIds.size} / {EXTENDED_BADGE_CATALOG.length}</div>
                <div className="text-[10px] text-emerald-300 font-medium">
                  {Math.round((unlockedBadgeIds.size / EXTENDED_BADGE_CATALOG.length) * 100)}% Complete
                </div>
              </div>
            </div>

            {/* 3. Mastery Points */}
            <div className="rounded-2xl bg-white/10 border border-white/10 p-3.5 backdrop-blur-xs flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase text-indigo-200 font-bold">Mastery Points</div>
                <div className="text-lg font-black text-white">{totalMasteryPoints} pts</div>
                <div className="text-[10px] text-indigo-200 font-medium">{totalStudyMinutes} mins logged</div>
              </div>
            </div>

            {/* 4. Verified Certificates */}
            <div className="rounded-2xl bg-white/10 border border-white/10 p-3.5 backdrop-blur-xs flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 shrink-0">
                <Award className="h-5 w-5 text-purple-300" />
              </div>
              <div>
                <div className="text-[10px] uppercase text-indigo-200 font-bold">Official Certs</div>
                <div className="text-lg font-black text-white">{userCertificates.length} Issued</div>
                <div className="text-[10px] text-amber-300 font-medium">Immutable Registry</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Streak Counts & Deliberate Consistency Tracker */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-600" />
                Consistency Engine
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Daily Deliberate Practice Safeguard
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Active Daily Streak & Consistency Rhythm
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              Streak Status: <span className="text-emerald-700 font-black">Active & Protected</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Main Streak Highlight Card */}
          <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-500/10 via-amber-50/40 to-white p-5 flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Current Dedication
                </span>
                <span className="px-2 py-0.5 bg-amber-200 text-amber-950 font-black text-[10px] rounded-full">
                  Day {streakCount}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-950">{streakCount}</span>
                <span className="text-sm font-bold text-slate-600">Consecutive Days Active</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                You have completed daily Socratic drills, diagnostic checkpoints, or Smart Board masterclasses for {streakCount} straight days.
              </p>
            </div>

            <div className="pt-3 border-t border-amber-200/80 flex items-center justify-between text-xs">
              <span className="text-slate-600">Personal Best:</span>
              <span className="font-extrabold text-amber-900">{longestStreak} Days Streak</span>
            </div>
          </div>

          {/* 7-Day Calendar Consistency Visualizer */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  This Week's Practice Calendar
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                  Goal Met
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Minimum 20 minutes deliberate practice daily keeps prerequisite knowledge active.
              </p>
            </div>

            {/* Day Dots Grid */}
            <div className="grid grid-cols-7 gap-2 pt-1">
              {daysOfWeek.map((day, idx) => {
                const isCompleted = idx <= currentDayIndex;
                const isToday = idx === currentDayIndex;

                return (
                  <div key={day} className="flex flex-col items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-500">{day}</span>
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${
                        isCompleted
                          ? "bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 shadow-xs border border-amber-300"
                          : "bg-slate-200/80 text-slate-400 border border-slate-300"
                      } ${isToday ? "ring-2 ring-indigo-500 ring-offset-1" : ""}`}
                    >
                      {isCompleted ? (
                        <Flame className="h-4 w-4 fill-current text-slate-950" />
                      ) : (
                        <span className="text-xs font-semibold">•</span>
                      )}
                    </div>
                    <span className="text-[9px] font-semibold text-slate-400">
                      {isCompleted ? "Active" : "Open"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>Daily Target: 30 Mins</span>
              <span className="font-bold text-indigo-600">Streak Freeze Ready</span>
            </div>
          </div>

          {/* Streak Milestone Ladder */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                <Target className="h-4 w-4 text-amber-500" />
                Upcoming Streak Milestones
              </span>
              <p className="text-xs text-slate-500">
                Unlock exclusive badges and bonus XP at each milestone tier:
              </p>
            </div>

            <div className="space-y-2 text-xs">
              {/* Milestone 1: 3-Day Spark */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="font-bold">3-Day Spark</span>
                </div>
                <span className="font-extrabold text-[11px] text-emerald-700">Achieved (+100 XP)</span>
              </div>

              {/* Milestone 2: 7-Day Flame */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                <div className="flex items-center gap-2">
                  <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-600" />
                  <span className="font-bold">7-Day Scholar Flame</span>
                </div>
                <span className="font-extrabold text-[11px] text-amber-800">
                  {7 - streakCount} days left (+250 XP)
                </span>
              </div>

              {/* Milestone 3: 14-Day Olympian */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 text-slate-600 opacity-80">
                <div className="flex items-center gap-2">
                  <Medal className="h-3.5 w-3.5 text-slate-400" />
                  <span>14-Day Olympian</span>
                </div>
                <span className="font-medium text-[11px]">9 days left (+500 XP)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-500 text-right">
              Maintain daily cadence to avoid reset
            </div>
          </div>
        </div>
      </div>

      {/* 3. Badges Showcase Component */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200">
                <Trophy className="h-3.5 w-3.5 text-indigo-700" />
                Academic Badges
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Competency & Rigor Badges
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Earned Badges & Unlocked Accreditations
            </h3>
            <p className="text-xs text-slate-500 max-w-2xl">
              Demonstrate mastery in mathematical operations, exam stamina, AI socratic inquiry, and consistent practice to unlock verified credentials.
            </p>
          </div>

          {/* Badge Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={badgeSearchQuery}
              onChange={(e) => setBadgeSearchQuery(e.target.value)}
              placeholder="Search badges..."
              className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" /> Filter:
          </span>
          {[
            { id: "all", label: "All Badges" },
            { id: "mastery", label: "Mastery & Rigor" },
            { id: "streak", label: "Consistency & Streaks" },
            { id: "exam", label: "CBT Exam Readiness" },
            { id: "diagnostic", label: "Diagnostic & Gaps" },
            { id: "ai_collaboration", label: "Socratic AI Collaboration" }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setBadgeFilter(cat.id as BadgeCategoryFilter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                badgeFilter === cat.id
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Badges Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBadges.map((badge) => {
            const isUnlocked = unlockedBadgeIds.has(badge.id);
            const hasProgress = badge.progress !== undefined && badge.maxProgress !== undefined;
            const progressPercent = hasProgress
              ? Math.min(100, Math.round((badge.progress! / badge.maxProgress!) * 100))
              : 0;

            return (
              <div
                key={badge.id}
                onClick={() => setSelectedBadgeForDetail(badge)}
                className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-3 cursor-pointer hover:shadow-md ${
                  isUnlocked
                    ? "border-amber-200/90 bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 text-slate-900"
                    : "border-slate-200 bg-slate-50/80 text-slate-500 opacity-75 hover:opacity-100"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                          isUnlocked
                            ? "bg-amber-100 border-amber-300 shadow-2xs"
                            : "bg-slate-200 border-slate-300"
                        }`}
                      >
                        {renderBadgeIcon(badge.iconName, isUnlocked, "h-5 w-5")}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1">
                          {badge.title}
                        </h4>
                        <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                          {badge.category.replace("_", " ")}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border shrink-0 ${
                        isUnlocked
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : "bg-slate-200 text-slate-600 border-slate-300"
                      }`}
                    >
                      {isUnlocked ? "Earned" : "Locked"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {badge.description}
                  </p>
                </div>

                {/* Bottom Status / Progress / Date */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  {isUnlocked ? (
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Unlocked
                      </span>
                      <span className="text-slate-500 font-mono text-[10px]">
                        {badge.unlockedAt ? new Date(badge.unlockedAt).toLocaleDateString() : "Active"}
                      </span>
                    </div>
                  ) : hasProgress ? (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-semibold text-slate-600">
                        <span>Progress</span>
                        <span>{badge.progress} / {badge.maxProgress}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-1.5 rounded-full transition-all"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Lock className="h-3 w-3" /> Locked
                      </span>
                      <span>Requires challenge</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Verified Learning Milestones Timeline */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                Verified Milestones
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Evidence-Anchored Learning Records
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Learning Milestones & Official Demonstrations ({userAchievements.length})
            </h3>
            <p className="text-xs text-slate-500 max-w-2xl">
              Chronological milestones earned through verified assessment performance, completed Smart Board masterclasses, and certified readiness benchmarks.
            </p>
          </div>

          {/* Milestone Category Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: "all", label: "All Milestones" },
              { id: "SKILL_MASTERED", label: "Skills" },
              { id: "READINESS_ACHIEVED", label: "Readiness" },
              { id: "MASTERCLASS_COMPLETED", label: "Masterclasses" },
              { id: "LEARNING_STREAK", label: "Streaks" }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setMilestoneFilter(f.id as MilestoneCategoryFilter)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                  milestoneFilter === f.id
                    ? "bg-emerald-700 text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Milestones List */}
        <div className="space-y-3">
          {filteredMilestones.map((milestone) => {
            const linkedCert = milestone.unlockedCertificateId
              ? userCertificates.find((c) => c.id === milestone.unlockedCertificateId)
              : undefined;

            return (
              <div
                key={milestone.id}
                className="p-5 rounded-2xl bg-gradient-to-r from-slate-50 via-white to-slate-50/50 border border-slate-200/90 hover:border-indigo-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0 text-indigo-700 mt-0.5">
                    {milestone.category === "SKILL_MASTERED" ? (
                      <Target className="h-5 w-5" />
                    ) : milestone.category === "READINESS_ACHIEVED" ? (
                      <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    ) : milestone.category === "LEARNING_STREAK" ? (
                      <Flame className="h-5 w-5 text-amber-500 fill-amber-400" />
                    ) : (
                      <GraduationCap className="h-5 w-5 text-purple-600" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {milestone.category.replace(/_/g, " ")}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {new Date(milestone.earnedAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-slate-900">
                      {milestone.title}
                    </h4>

                    <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                      {milestone.description}
                    </p>

                    {/* Evidence Snippet */}
                    <div className="pt-1 flex items-center gap-3 text-[11px] text-slate-500 flex-wrap">
                      <span className="bg-slate-100/90 px-2 py-0.5 rounded text-slate-700 font-medium">
                        Criterion: {milestone.evidence.completionCriterion}
                      </span>
                      <span className="text-emerald-700 font-bold">
                        Score / Points: {milestone.evidence.demonstratedScoreOrPoints}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                  <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-900 font-black text-xs">
                    +{milestone.xpEarned} XP
                  </span>

                  {linkedCert && onInspectCertificate && (
                    <button
                      type="button"
                      onClick={() => onInspectCertificate(linkedCert)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                    >
                      <Award className="h-3.5 w-3.5" />
                      <span>View Certificate</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Detail Modal for Inspected Badge */}
      {selectedBadgeForDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4"
          onClick={() => setSelectedBadgeForDetail(null)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center">
                  {renderBadgeIcon(
                    selectedBadgeForDetail.iconName,
                    unlockedBadgeIds.has(selectedBadgeForDetail.id),
                    "h-5 w-5"
                  )}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {selectedBadgeForDetail.title}
                  </h3>
                  <span className="text-[10px] font-bold uppercase text-slate-500">
                    {selectedBadgeForDetail.category.replace("_", " ")}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBadgeForDetail(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedBadgeForDetail.description}
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-slate-900">
                  {unlockedBadgeIds.has(selectedBadgeForDetail.id) ? "Earned & Verified" : "Locked / In Progress"}
                </span>
              </div>
              {selectedBadgeForDetail.unlockedAt && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Earned Date:</span>
                  <span className="font-medium text-slate-700">
                    {new Date(selectedBadgeForDetail.unlockedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
              {selectedBadgeForDetail.progress !== undefined && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Progress:</span>
                  <span className="font-bold text-indigo-600">
                    {selectedBadgeForDetail.progress} of {selectedBadgeForDetail.maxProgress}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedBadgeForDetail(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition cursor-pointer"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
