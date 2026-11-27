import React, { useState, useMemo } from "react";
import {
  Layers,
  Trophy,
  CheckCircle2,
  Sparkles,
  Search,
  X,
  BookOpen,
  Play,
  Grid,
  Filter,
  ArrowRight,
  ChevronRight,
  HelpCircle,
  Eye,
  Flame,
  Star,
  Activity,
  BrainCircuit,
  Globe,
  RotateCw,
  Lightbulb,
  AlertTriangle,
  Zap,
  Check
} from "lucide-react";
import { useLearner } from "../context/LearnerContext";
import { Unit, Skill, EducationalLevel, MasteryStatus } from "../types/curriculum";
import { curriculumService } from "../services/curriculumService";
import { LEARNING_DOMAINS } from "../data/curriculumData";
import { contentSaturationService } from "../services/contentSaturationService";
import { normalizeMasteryStatus, formatMasteryStatusLabel, MASTERY_THRESHOLDS } from "../services/masteryEngine";
import {
  FlashcardCard,
  EducationalVisualization,
  InteractiveActivity,
  NigerianLanguageLocalization,
  SupportedLanguage,
  SUPPORTED_LANGUAGES
} from "../types/contentSaturation";

interface MasteryHeatmapProps {
  onLaunchSkill?: (skill: Skill, unit: Unit) => void;
  onStudyLesson?: (skill: Skill, unit: Unit) => void;
  targetLevel?: EducationalLevel | "all";
  onOpenSaturationStudio?: () => void;
}

const LEVEL_LABELS: Record<EducationalLevel, string> = {
  primary_foundations: "Primary Foundations (Pri 1-3)",
  upper_primary: "Upper Primary (Pri 4-6)",
  junior_secondary: "Junior Secondary (JSS 1-3)",
  senior_secondary: "Senior Secondary (SSS 1-3)",
  university_prep: "University Prep",
  exam_prep: "Exam Prep"
};

const LEVEL_SHORT_LABELS: Record<EducationalLevel, string> = {
  primary_foundations: "Pri 1-3",
  upper_primary: "Pri 4-6",
  junior_secondary: "JSS 1-3",
  senior_secondary: "SSS 1-3",
  university_prep: "Univ Prep",
  exam_prep: "Exam Prep"
};

export interface UnitMasterySummary {
  unit: Unit;
  domainName: string;
  totalSkills: number;
  earnedPoints: number;
  maxPoints: number;
  masteryPercentage: number;
  status: MasteryStatus;
  masteredSkills: number;
  proficientSkills: number;
  practisingSkills: number;
  introducedSkills: number;
  unstartedSkills: number;
  skillRecords: Array<{
    skill: Skill;
    points: number;
    status: MasteryStatus;
  }>;
}

export const MasteryHeatmap: React.FC<MasteryHeatmapProps> = ({
  onLaunchSkill,
  onStudyLesson,
  targetLevel: initialTargetLevel,
  onOpenSaturationStudio
}) => {
  const { profile, activeUnit } = useLearner();

  // Filters & View state
  const [selectedLevel, setSelectedLevel] = useState<EducationalLevel | "all">("all");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<MasteryStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "lanes" | "details">("grid");
  const [inspectedUnit, setInspectedUnit] = useState<UnitMasterySummary | null>(null);

  // Modal Interactive Sub-tabs & States
  const [modalTab, setModalTab] = useState<"skills" | "flashcards" | "visuals" | "activities" | "vernacular">("skills");
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [showCardHint, setShowCardHint] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>("yo");
  const [activitySelectedStep, setActivitySelectedStep] = useState<number | null>(null);
  const [activityFeedback, setActivityFeedback] = useState<string | null>(null);

  // Content Saturation Audit Data
  const saturationReport = useMemo(() => contentSaturationService.generateContentSaturationReport(), []);

  // Compute all units and their mastery summaries
  const allUnits = useMemo(() => curriculumService.getAllUnits(), []);

  const unitSummaries: UnitMasterySummary[] = useMemo(() => {
    const records = profile?.masteryRecords || {};

    return allUnits.map((unit) => {
      const skills = unit.skills || [];
      const totalSkills = skills.length;
      const maxPoints = Math.max(totalSkills * 100, 100);

      let earnedPoints = 0;
      let masteredSkills = 0;
      let proficientSkills = 0;
      let practisingSkills = 0;
      let introducedSkills = 0;
      let unstartedSkills = 0;

      const skillRecords = skills.map((skill) => {
        const rec = records[skill.id];
        const points = rec?.points || 0;
        const status = normalizeMasteryStatus(rec?.status, points);

        earnedPoints += points;
        if (status === "mastered") masteredSkills++;
        else if (status === "proficient") proficientSkills++;
        else if (status === "practising") practisingSkills++;
        else if (status === "introduced") introducedSkills++;
        else unstartedSkills++;

        return { skill, points, status };
      });

      const masteryPercentage = totalSkills > 0 ? Math.round((earnedPoints / maxPoints) * 100) : 0;

      let status: MasteryStatus = "unstarted";
      if (masteryPercentage >= MASTERY_THRESHOLDS.MASTERED_WEIGHTED_SCORE) status = "mastered";
      else if (masteryPercentage >= MASTERY_THRESHOLDS.PROFICIENT_WEIGHTED_SCORE) status = "proficient";
      else if (masteryPercentage >= MASTERY_THRESHOLDS.PRACTISING_WEIGHTED_SCORE) status = "practising";
      else if (masteryPercentage > 0 || introducedSkills + practisingSkills + proficientSkills + masteredSkills > 0) status = "introduced";

      const domain = LEARNING_DOMAINS.find((d) => d.id === unit.category) || { name: unit.category };

      return {
        unit,
        domainName: domain.name,
        totalSkills,
        earnedPoints,
        maxPoints,
        masteryPercentage,
        status,
        masteredSkills,
        proficientSkills,
        practisingSkills,
        introducedSkills,
        unstartedSkills,
        skillRecords
      };
    });
  }, [allUnits, profile?.masteryRecords]);

  // Overall Statistics across the entire curriculum
  const overallStats = useMemo(() => {
    const totalUnits = unitSummaries.length;
    const masteredUnits = unitSummaries.filter((u) => u.status === "mastered").length;
    const proficientUnits = unitSummaries.filter((u) => u.status === "proficient").length;
    const practisingUnits = unitSummaries.filter((u) => u.status === "practising").length;
    const introducedUnits = unitSummaries.filter((u) => u.status === "introduced").length;
    const unstartedUnits = unitSummaries.filter((u) => u.status === "unstarted").length;

    const totalEarnedPoints = unitSummaries.reduce((sum, u) => sum + u.earnedPoints, 0);
    const totalMaxPoints = unitSummaries.reduce((sum, u) => sum + u.maxPoints, 0);
    const overallPercentage = totalMaxPoints > 0 ? Math.round((totalEarnedPoints / totalMaxPoints) * 100) : 0;

    return {
      totalUnits,
      masteredUnits,
      proficientUnits,
      practisingUnits,
      introducedUnits,
      unstartedUnits,
      overallPercentage
    };
  }, [unitSummaries]);

  // Filtered unit summaries based on user selections
  const filteredSummaries = useMemo(() => {
    return unitSummaries.filter((item) => {
      // Level filter
      if (selectedLevel !== "all" && item.unit.level !== selectedLevel) {
        return false;
      }

      // Domain filter
      if (selectedDomain !== "all" && item.unit.category !== selectedDomain) {
        return false;
      }

      // Status filter
      if (statusFilter !== "all" && item.status !== statusFilter) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.unit.title.toLowerCase().includes(q);
        const matchesCode = item.unit.code.toLowerCase().includes(q);
        const matchesSkills = item.unit.skills.some((s) => s.title.toLowerCase().includes(q) || s.code.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCode && !matchesSkills) {
          return false;
        }
      }

      return true;
    });
  }, [unitSummaries, selectedLevel, selectedDomain, statusFilter, searchQuery]);

  // Grouped by level for Lanes View
  const groupedByLevel = useMemo(() => {
    const groups: Record<EducationalLevel, UnitMasterySummary[]> = {
      primary_foundations: [],
      upper_primary: [],
      junior_secondary: [],
      senior_secondary: [],
      university_prep: [],
      exam_prep: []
    };

    filteredSummaries.forEach((item) => {
      if (groups[item.unit.level]) {
        groups[item.unit.level].push(item);
      }
    });

    return groups;
  }, [filteredSummaries]);

  // Derived enrichment assets for inspected unit
  const inspectedFlashcards = useMemo(() => {
    if (!inspectedUnit) return [];
    const cards: FlashcardCard[] = [];
    inspectedUnit.unit.skills.forEach((s) => {
      const deck = contentSaturationService.getFlashcardDeckBySkillId(s.id);
      if (deck) cards.push(...deck.cards);
    });
    // Fallback: If no direct skill match, search related cards from all decks
    if (cards.length === 0) {
      const allDecks = contentSaturationService.getAllFlashcardDecks();
      const matchingDeck = allDecks.find(
        (d) =>
          d.unitId === inspectedUnit.unit.id ||
          d.subjectId.toLowerCase().includes(inspectedUnit.unit.category.toLowerCase()) ||
          d.title.toLowerCase().includes(inspectedUnit.unit.title.toLowerCase().slice(0, 5))
      );
      if (matchingDeck) cards.push(...matchingDeck.cards);
    }
    return cards;
  }, [inspectedUnit]);

  const inspectedVisualizations = useMemo(() => {
    if (!inspectedUnit) return [];
    const vizs: EducationalVisualization[] = [];
    inspectedUnit.unit.skills.forEach((s) => {
      const v = contentSaturationService.getVisualizationBySkillId(s.id);
      if (v) vizs.push(v);
    });
    if (vizs.length === 0) {
      const allVizs = contentSaturationService.getAllVisualizations();
      const match = allVizs.find((v) =>
        v.title.toLowerCase().includes(inspectedUnit.unit.title.toLowerCase().slice(0, 5))
      );
      if (match) vizs.push(match);
    }
    return vizs;
  }, [inspectedUnit]);

  const inspectedActivities = useMemo(() => {
    if (!inspectedUnit) return [];
    const acts: InteractiveActivity[] = [];
    inspectedUnit.unit.skills.forEach((s) => {
      const a = contentSaturationService.getActivitiesBySkillId(s.id);
      if (a && a.length > 0) acts.push(...a);
    });
    if (acts.length === 0) {
      const allActs = contentSaturationService.getAllInteractiveActivities();
      const match = allActs.find((a) =>
        a.title.toLowerCase().includes(inspectedUnit.unit.title.toLowerCase().slice(0, 5))
      );
      if (match) acts.push(match);
    }
    return acts;
  }, [inspectedUnit]);

  const inspectedVernacular = useMemo(() => {
    if (!inspectedUnit) return [];
    const locs: Array<{ skillTitle: string; local: NigerianLanguageLocalization }> = [];
    inspectedUnit.unit.skills.forEach((s) => {
      const loc = contentSaturationService.getNigerianLocalization(s.id);
      if (loc) locs.push({ skillTitle: s.title, local: loc });
    });
    if (locs.length === 0) {
      const defaultLoc = contentSaturationService.getNigerianLocalization("skill-math-quad-101");
      if (defaultLoc) locs.push({ skillTitle: "Foundational Conceptual Intuition", local: defaultLoc });
    }
    return locs;
  }, [inspectedUnit]);

  const handleInspectUnit = (summary: UnitMasterySummary) => {
    setInspectedUnit(summary);
    setModalTab("skills");
    setActiveCardIndex(0);
    setIsCardFlipped(false);
    setShowCardHint(false);
    setActivitySelectedStep(null);
    setActivityFeedback(null);
  };

  // Helper color styling for heatmap tiles
  const getTileStyles = (status: MasteryStatus, isCurrentActive: boolean) => {
    const normalized = normalizeMasteryStatus(status);
    let bg = "bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200 hover:border-slate-300";
    let badgeBg = "bg-slate-200 text-slate-700";

    if (normalized === "mastered") {
      bg = "bg-emerald-600 border-emerald-700 text-white hover:bg-emerald-700 shadow-xs";
      badgeBg = "bg-emerald-500/40 text-white";
    } else if (normalized === "proficient") {
      bg = "bg-indigo-600 border-indigo-700 text-white hover:bg-indigo-700 shadow-xs";
      badgeBg = "bg-indigo-500/40 text-white";
    } else if (normalized === "practising") {
      bg = "bg-amber-400 border-amber-500 text-amber-950 hover:bg-amber-500 shadow-xs";
      badgeBg = "bg-amber-300/60 text-amber-950 font-bold";
    } else if (normalized === "introduced") {
      bg = "bg-sky-200 border-sky-300 text-sky-950 hover:bg-sky-300 shadow-xs";
      badgeBg = "bg-sky-100 text-sky-900 font-bold";
    }

    if (isCurrentActive) {
      bg += " ring-2 ring-amber-400 ring-offset-2";
    }

    return { bg, badgeBg };
  };

  const getSkillDotColor = (status: MasteryStatus) => {
    switch (normalizeMasteryStatus(status)) {
      case "mastered": return "bg-emerald-400";
      case "proficient": return "bg-indigo-300";
      case "practising": return "bg-amber-400";
      case "introduced": return "bg-sky-400";
      default: return "bg-slate-300";
    }
  };

  return (
    <div
      id="curriculum-mastery-heatmap-container"
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6"
    >
      {/* 1. Header & Progression Analytics */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Curriculum Mastery Heatmap
                </h3>
                <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                  All {overallStats.totalUnits} Units
                </span>
                {onOpenSaturationStudio && (
                  <button
                    type="button"
                    onClick={onOpenSaturationStudio}
                    title="Open Internal Content Saturation & QA Dashboard"
                    className="text-[10px] font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200 cursor-pointer"
                  >
                    <Sparkles className="h-3 w-3 text-emerald-600" />
                    Content Depth: {saturationReport.overallIndex}% ({saturationReport.statusTier})
                    <ArrowRight className="h-2.5 w-2.5 text-emerald-600" />
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Color-coded matrix visualizing your competency growth across all educational tiers & subjects, enriched by verified pedagogical assets
              </p>
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            id="heatmap-view-matrix-btn"
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              viewMode === "grid"
                ? "bg-white text-slate-900 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Grid className="h-3.5 w-3.5" />
            <span>Matrix Grid</span>
          </button>
          <button
            type="button"
            id="heatmap-view-lanes-btn"
            onClick={() => setViewMode("lanes")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              viewMode === "lanes"
                ? "bg-white text-slate-900 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Level Lanes</span>
          </button>
          <button
            type="button"
            id="heatmap-view-details-btn"
            onClick={() => setViewMode("details")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              viewMode === "details"
                ? "bg-white text-slate-900 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Detailed</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive KPI Legend & 4-State Progression Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Overall Completion Card */}
        <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800">
              Total Mastery
            </span>
            <Sparkles className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-indigo-950">
              {overallStats.overallPercentage}%
            </span>
            <span className="text-xs text-indigo-700 font-semibold">
              of {(overallStats.totalUnits * 100).toLocaleString()} pts
            </span>
          </div>
        </div>

        {/* Mastered Pill / Filter */}
        <button
          type="button"
          id="filter-status-mastered-btn"
          onClick={() => setStatusFilter(statusFilter === "mastered" ? "all" : "mastered")}
          className={`p-3.5 rounded-2xl border text-left transition ${
            statusFilter === "mastered"
              ? "bg-emerald-600 border-emerald-700 text-white shadow-sm ring-2 ring-emerald-500/30"
              : "bg-emerald-50/70 border-emerald-200 hover:bg-emerald-100/80 text-emerald-950"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${
              statusFilter === "mastered" ? "text-emerald-100" : "text-emerald-800"
            }`}>
              Mastered (88%+)
            </span>
            <CheckCircle2 className={`h-4 w-4 ${statusFilter === "mastered" ? "text-white" : "text-emerald-600"}`} />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-black">
              {overallStats.masteredUnits}
            </span>
            <span className={`text-xs ${statusFilter === "mastered" ? "text-emerald-100" : "text-emerald-700"}`}>
              Units
            </span>
          </div>
        </button>

        {/* Proficient Pill / Filter */}
        <button
          type="button"
          id="filter-status-proficient-btn"
          onClick={() => setStatusFilter(statusFilter === "proficient" ? "all" : "proficient")}
          className={`p-3.5 rounded-2xl border text-left transition ${
            statusFilter === "proficient"
              ? "bg-indigo-600 border-indigo-700 text-white shadow-sm ring-2 ring-indigo-500/30"
              : "bg-indigo-50/70 border-indigo-200 hover:bg-indigo-100/80 text-indigo-950"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${
              statusFilter === "proficient" ? "text-indigo-100" : "text-indigo-800"
            }`}>
              Proficient (70-87%)
            </span>
            <Trophy className={`h-4 w-4 ${statusFilter === "proficient" ? "text-white" : "text-indigo-600"}`} />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-black">
              {overallStats.proficientUnits}
            </span>
            <span className={`text-xs ${statusFilter === "proficient" ? "text-indigo-100" : "text-indigo-700"}`}>
              Units
            </span>
          </div>
        </button>

        {/* Practising Pill / Filter */}
        <button
          type="button"
          id="filter-status-practising-btn"
          onClick={() => setStatusFilter(statusFilter === "practising" ? "all" : "practising")}
          className={`p-3.5 rounded-2xl border text-left transition ${
            statusFilter === "practising"
              ? "bg-amber-500 border-amber-600 text-slate-950 shadow-sm ring-2 ring-amber-400/30"
              : "bg-amber-50/70 border-amber-200 hover:bg-amber-100/80 text-amber-950"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${
              statusFilter === "practising" ? "text-amber-950 font-black" : "text-amber-800"
            }`}>
              Practising (40-69%)
            </span>
            <Flame className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-black">
              {overallStats.practisingUnits}
            </span>
            <span className="text-xs text-amber-800">
              Units
            </span>
          </div>
        </button>

        {/* Introduced Pill / Filter */}
        <button
          type="button"
          id="filter-status-introduced-btn"
          onClick={() => setStatusFilter(statusFilter === "introduced" ? "all" : "introduced")}
          className={`p-3.5 rounded-2xl border text-left transition ${
            statusFilter === "introduced"
              ? "bg-sky-600 border-sky-700 text-white shadow-sm ring-2 ring-sky-400/30"
              : "bg-sky-50/70 border-sky-200 hover:bg-sky-100/80 text-sky-950"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${
              statusFilter === "introduced" ? "text-sky-100" : "text-sky-800"
            }`}>
              Introduced (1-39%)
            </span>
            <Zap className={`h-4 w-4 ${statusFilter === "introduced" ? "text-white" : "text-sky-600"}`} />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-black">
              {overallStats.introducedUnits}
            </span>
            <span className={`text-xs ${statusFilter === "introduced" ? "text-sky-100" : "text-sky-700"}`}>
              Units
            </span>
          </div>
        </button>

        {/* Unstarted Pill / Filter */}
        <button
          type="button"
          id="filter-status-unstarted-btn"
          onClick={() => setStatusFilter(statusFilter === "unstarted" ? "all" : "unstarted")}
          className={`p-3.5 rounded-2xl border text-left transition ${
            statusFilter === "unstarted"
              ? "bg-slate-800 border-slate-900 text-white shadow-sm ring-2 ring-slate-400/30"
              : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${
              statusFilter === "unstarted" ? "text-slate-300" : "text-slate-500"
            }`}>
              Unstarted (0%)
            </span>
            <HelpCircle className={`h-4 w-4 ${statusFilter === "unstarted" ? "text-slate-300" : "text-slate-400"}`} />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-black">
              {overallStats.unstartedUnits}
            </span>
            <span className={`text-xs ${statusFilter === "unstarted" ? "text-slate-300" : "text-slate-400"}`}>
              Units
            </span>
          </div>
        </button>
      </div>

      {/* 3. Filter Bar & Search */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Level Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              type="button"
              id="heatmap-level-all"
              onClick={() => setSelectedLevel("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedLevel === "all"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Levels ({allUnits.length})
            </button>
            {(Object.keys(LEVEL_LABELS) as EducationalLevel[]).map((lvl) => {
              const count = unitSummaries.filter((u) => u.unit.level === lvl).length;
              const isSelected = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  id={`heatmap-level-${lvl}`}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition border ${
                    isSelected
                      ? "bg-indigo-600 border-indigo-700 text-white font-semibold shadow-xs"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{LEVEL_SHORT_LABELS[lvl]}</span>
                  <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              id="heatmap-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search units or topics..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-8 pr-8 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Chips */}
        {(statusFilter !== "all" || selectedDomain !== "all" || searchQuery) && (
          <div className="flex items-center gap-2 pt-1 text-xs text-slate-500 flex-wrap">
            <span className="font-semibold">Active Filters:</span>
            {statusFilter !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 font-medium">
                Status: {statusFilter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setStatusFilter("all")} />
              </span>
            )}
            {selectedLevel !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 font-medium">
                Level: {LEVEL_SHORT_LABELS[selectedLevel]}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedLevel("all")} />
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 font-medium">
                Query: "{searchQuery}"
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                setStatusFilter("all");
                setSelectedLevel("all");
                setSelectedDomain("all");
                setSearchQuery("");
              }}
              className="text-indigo-600 hover:underline font-semibold ml-2"
            >
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* 4. Heatmap Body Rendering */}
      {filteredSummaries.length === 0 ? (
        <div className="p-10 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 space-y-2">
          <Layers className="h-8 w-8 text-slate-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-700">No Units Match Selected Filter</h4>
          <p className="text-xs text-slate-500">
            Try resetting your status or level filter to explore other areas of the curriculum.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatusFilter("all");
              setSelectedLevel("all");
              setSearchQuery("");
            }}
            className="mt-2 px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition"
          >
            Show All {allUnits.length} Units
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* MATRIX GRID VIEW */
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Showing {filteredSummaries.length} curriculum units. Click any tile to inspect skills or practice.</span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Mastered
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-indigo-600" /> Proficient
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-amber-400" /> Familiar
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-slate-200" /> Unstarted
              </span>
            </div>
          </div>

          <div
            id="heatmap-matrix-grid"
            className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2"
          >
            {filteredSummaries.map((summary) => {
              const isCurrentActive = activeUnit?.id === summary.unit.id;
              const { bg, badgeBg } = getTileStyles(summary.status, isCurrentActive);

              return (
                <button
                  key={summary.unit.id}
                  id={`heatmap-tile-${summary.unit.id}`}
                  type="button"
                  onClick={() => handleInspectUnit(summary)}
                  title={`${summary.unit.code}: ${summary.unit.title} (${summary.masteryPercentage}% - ${summary.status})`}
                  className={`group relative flex flex-col justify-between p-2 rounded-xl border transition text-left cursor-pointer aspect-square ${bg}`}
                >
                  {/* Top Bar: Code & Mini percentage */}
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono font-black uppercase tracking-tight truncate">
                      {summary.unit.code.replace("UNIT-", "U")}
                    </span>
                    <span className={`text-[9px] font-bold px-1 rounded ${badgeBg}`}>
                      {summary.masteryPercentage}%
                    </span>
                  </div>

                  {/* Center: Title abbreviation */}
                  <div className="my-auto py-1">
                    <p className="text-[10px] font-bold leading-tight line-clamp-2">
                      {summary.unit.title}
                    </p>
                  </div>

                  {/* Bottom: Skill indicator dots */}
                  <div className="flex items-center gap-0.5 pt-1 w-full justify-start overflow-hidden">
                    {summary.skillRecords.map(({ skill, status }) => (
                      <span
                        key={skill.id}
                        className={`h-1.5 w-1.5 rounded-full shrink-0 ${getSkillDotColor(status)}`}
                        title={`${skill.title}: ${status}`}
                      />
                    ))}
                  </div>

                  {/* Active Unit Pulse Ring */}
                  {isCurrentActive && (
                    <span
                      className="absolute -top-1 -right-1 flex h-2.5 w-2.5"
                      title="Currently Active Focus Unit"
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : viewMode === "lanes" ? (
        /* LEVEL LANES VIEW */
        <div className="space-y-6">
          {(Object.keys(groupedByLevel) as EducationalLevel[]).map((lvl) => {
            const list = groupedByLevel[lvl];
            if (list.length === 0) return null;

            const lvlEarned = list.reduce((s, u) => s + u.earnedPoints, 0);
            const lvlMax = list.reduce((s, u) => s + u.maxPoints, 0);
            const lvlPct = lvlMax > 0 ? Math.round((lvlEarned / lvlMax) * 100) : 0;
            const lvlMastered = list.filter((u) => u.status === "mastered").length;

            return (
              <div
                key={lvl}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">
                      {LEVEL_LABELS[lvl]}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      ({list.length} Units)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-600 font-medium">
                      {lvlMastered} of {list.length} Mastered
                    </span>
                    <span className="font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full text-[11px]">
                      {lvlPct}% Mastery
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                  {list.map((summary) => {
                    const isCurrentActive = activeUnit?.id === summary.unit.id;
                    const { bg, badgeBg } = getTileStyles(summary.status, isCurrentActive);

                    return (
                      <button
                        key={summary.unit.id}
                        type="button"
                        onClick={() => handleInspectUnit(summary)}
                        className={`p-3 rounded-xl border text-left transition flex flex-col justify-between space-y-2 cursor-pointer ${bg}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold">
                            {summary.unit.code}
                          </span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${badgeBg}`}>
                            {summary.masteryPercentage}%
                          </span>
                        </div>
                        <h5 className="text-xs font-bold line-clamp-2">
                          {summary.unit.title}
                        </h5>
                        <div className="flex items-center justify-between text-[10px] pt-1 border-t border-black/10">
                          <span>{summary.totalSkills} Skills</span>
                          <span className="capitalize font-semibold">{summary.status}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* DETAILED CARDS VIEW */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredSummaries.map((summary) => {
            const isCurrentActive = activeUnit?.id === summary.unit.id;

            return (
              <div
                key={summary.unit.id}
                className={`p-4 rounded-2xl border transition bg-white space-y-3 ${
                  isCurrentActive ? "border-amber-400 ring-1 ring-amber-300 shadow-xs" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {summary.unit.code}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                      summary.status === "mastered"
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                        : summary.status === "proficient"
                        ? "bg-indigo-100 text-indigo-800 border-indigo-300"
                        : summary.status === "practising"
                        ? "bg-amber-100 text-amber-800 border-amber-300"
                        : summary.status === "introduced"
                        ? "bg-sky-100 text-sky-800 border-sky-300"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {formatMasteryStatusLabel(summary.status, summary.masteryPercentage).toUpperCase()} ({summary.masteryPercentage}%)
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {summary.unit.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {summary.unit.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                    <span>Points: {summary.earnedPoints} / {summary.maxPoints}</span>
                    <span>{summary.masteredSkills} of {summary.totalSkills} Skills Mastered</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        summary.status === "mastered"
                          ? "bg-emerald-500"
                          : summary.status === "proficient"
                          ? "bg-indigo-600"
                          : summary.status === "practising"
                          ? "bg-amber-500"
                          : summary.status === "introduced"
                          ? "bg-sky-500"
                          : "bg-slate-300"
                      }`}
                      style={{ width: `${summary.masteryPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleInspectUnit(summary)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>View All Skills</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>

                  {summary.unit.skills.length > 0 && onLaunchSkill && (
                    <button
                      type="button"
                      onClick={() => onLaunchSkill(summary.unit.skills[0], summary.unit)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1 transition shadow-2xs"
                    >
                      <span>Practice</span>
                      <Play className="h-3 w-3 fill-white" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Interactive Unit Inspection Drawer / Modal */}
      {inspectedUnit && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4"
          onClick={() => setInspectedUnit(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {inspectedUnit.unit.code}
                  </span>
                  <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {LEVEL_LABELS[inspectedUnit.unit.level]}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 uppercase">
                    {inspectedUnit.domainName}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {inspectedUnit.unit.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {inspectedUnit.unit.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setInspectedUnit(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Unit Progression Stats Banner */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700">Unit Competency Score</span>
                <span className="text-indigo-700 font-black text-sm">
                  {inspectedUnit.masteryPercentage}% ({inspectedUnit.earnedPoints} / {inspectedUnit.maxPoints} pts)
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    inspectedUnit.status === "mastered"
                      ? "bg-emerald-500"
                      : inspectedUnit.status === "proficient"
                      ? "bg-indigo-600"
                      : inspectedUnit.status === "practising"
                      ? "bg-amber-500"
                      : inspectedUnit.status === "introduced"
                      ? "bg-sky-500"
                      : "bg-slate-300"
                  }`}
                  style={{ width: `${inspectedUnit.masteryPercentage}%` }}
                />
              </div>

              <div className="grid grid-cols-5 gap-2 pt-1 text-center text-[11px]">
                <div className="rounded-lg bg-white p-1.5 border border-slate-200">
                  <div className="font-bold text-emerald-600">{inspectedUnit.masteredSkills}</div>
                  <div className="text-slate-400">Mastered</div>
                </div>
                <div className="rounded-lg bg-white p-1.5 border border-slate-200">
                  <div className="font-bold text-indigo-600">{inspectedUnit.proficientSkills}</div>
                  <div className="text-slate-400">Proficient</div>
                </div>
                <div className="rounded-lg bg-white p-1.5 border border-slate-200">
                  <div className="font-bold text-amber-600">{inspectedUnit.practisingSkills}</div>
                  <div className="text-slate-400">Practising</div>
                </div>
                <div className="rounded-lg bg-white p-1.5 border border-slate-200">
                  <div className="font-bold text-sky-600">{inspectedUnit.introducedSkills}</div>
                  <div className="text-slate-400">Introduced</div>
                </div>
                <div className="rounded-lg bg-white p-1.5 border border-slate-200">
                  <div className="font-bold text-slate-500">{inspectedUnit.unstartedSkills}</div>
                  <div className="text-slate-400">Unstarted</div>
                </div>
              </div>
            </div>

            {/* Interactive Sub-Tabs for Unit Enrichment */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-100">
              <button
                type="button"
                onClick={() => setModalTab("skills")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  modalTab === "skills"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Skills & Competencies</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  modalTab === "skills" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                }`}>
                  {inspectedUnit.unit.skills.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setModalTab("flashcards");
                  setActiveCardIndex(0);
                  setIsCardFlipped(false);
                  setShowCardHint(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  modalTab === "flashcards"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Active Flashcards</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  modalTab === "flashcards" ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-800"
                }`}>
                  {inspectedFlashcards.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab("visuals")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  modalTab === "visuals"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Activity className="h-3.5 w-3.5" />
                <span>Visualizations</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  modalTab === "visuals" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-800"
                }`}>
                  {inspectedVisualizations.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setModalTab("activities");
                  setActivitySelectedStep(null);
                  setActivityFeedback(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  modalTab === "activities"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <BrainCircuit className="h-3.5 w-3.5" />
                <span>Cognitive Tasks</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  modalTab === "activities" ? "bg-white/20 text-white" : "bg-amber-100 text-amber-800"
                }`}>
                  {inspectedActivities.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab("vernacular")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  modalTab === "vernacular"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Globe className="h-3.5 w-3.5" />
                <span>Vernacular Intuition</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  modalTab === "vernacular" ? "bg-white/20 text-white" : "bg-purple-100 text-purple-800"
                }`}>
                  {inspectedVernacular.length}
                </span>
              </button>
            </div>

            {/* TAB 1: Skills List */}
            {modalTab === "skills" && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Unit Skills & Micro-Competencies ({inspectedUnit.unit.skills.length})
                </h4>

                <div className="space-y-2.5">
                  {inspectedUnit.skillRecords.map(({ skill, points, status }) => (
                    <div
                      key={skill.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 transition space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-slate-400 font-semibold">
                            {skill.code}
                          </span>
                          <h5 className="text-xs font-bold text-slate-900">
                            {skill.title}
                          </h5>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            status === "mastered"
                              ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                              : status === "proficient"
                              ? "bg-indigo-100 text-indigo-800 border-indigo-300"
                              : status === "practising"
                              ? "bg-amber-100 text-amber-800 border-amber-300"
                              : status === "introduced"
                              ? "bg-sky-100 text-sky-800 border-sky-300"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          {formatMasteryStatusLabel(status, points).toUpperCase()} ({points} pts)
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2">
                        {skill.summary}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className="text-[11px] text-slate-400">
                          {skill.questions?.length || 0} Practice Questions Available
                        </span>

                        <div className="flex items-center gap-2">
                          {onStudyLesson && (
                            <button
                              type="button"
                              onClick={() => {
                                setInspectedUnit(null);
                                onStudyLesson(skill, inspectedUnit.unit);
                              }}
                              className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 transition"
                            >
                              <BookOpen className="h-3 w-3 text-indigo-600" />
                              <span>Study Lesson</span>
                            </button>
                          )}
                          {onLaunchSkill && (
                            <button
                              type="button"
                              onClick={() => {
                                setInspectedUnit(null);
                                onLaunchSkill(skill, inspectedUnit.unit);
                              }}
                              className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1 transition shadow-xs"
                            >
                              <span>Enter Practice</span>
                              <Play className="h-3 w-3 fill-white" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Active Recall Flashcards */}
            {modalTab === "flashcards" && (
              <div className="space-y-4">
                {inspectedFlashcards.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <Layers className="h-8 w-8 text-slate-400 mx-auto" />
                    <p className="text-xs text-slate-600 font-semibold">No specialized flashcard deck mapped directly to this unit yet.</p>
                  </div>
                ) : (
                  (() => {
                    const currentCard = inspectedFlashcards[activeCardIndex] || inspectedFlashcards[0];
                    return (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-semibold">Card {activeCardIndex + 1} of {inspectedFlashcards.length}</span>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                            {currentCard.category.replace("_", " ")}
                          </span>
                        </div>

                        {/* Flashcard container */}
                        <div
                          onClick={() => setIsCardFlipped(!isCardFlipped)}
                          className={`min-h-[220px] rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 shadow-xs flex flex-col justify-between ${
                            isCardFlipped
                              ? "border-emerald-300 bg-emerald-50/40"
                              : "border-indigo-200 bg-white hover:border-indigo-400"
                          }`}
                        >
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              {isCardFlipped ? "Answer / Explanation" : "Prompt (Click to Flip)"}
                            </span>
                            <p className="text-sm font-bold text-slate-900 leading-relaxed">
                              {isCardFlipped ? currentCard.back : currentCard.front}
                            </p>

                            {currentCard.formulaLatex && !isCardFlipped && (
                              <div className="mt-2 p-2 bg-slate-50 rounded-lg font-mono text-xs text-indigo-900 border border-slate-200 inline-block">
                                {currentCard.formulaLatex}
                              </div>
                            )}

                            {isCardFlipped && currentCard.commonTrapNote && (
                              <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                                <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                                <div>
                                  <strong>Exam Trap:</strong> {currentCard.commonTrapNote}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <span className="flex items-center gap-1 text-indigo-600 font-semibold text-[11px]">
                              <RotateCw className="h-3 w-3" /> Tap card to flip
                            </span>
                            {currentCard.hint && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowCardHint(!showCardHint);
                                }}
                                className="text-amber-700 hover:text-amber-900 font-bold text-[11px] flex items-center gap-1"
                              >
                                <Lightbulb className="h-3 w-3" />
                                {showCardHint ? currentCard.hint : "Need Hint?"}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Next/Prev Navigation */}
                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsCardFlipped(false);
                              setShowCardHint(false);
                              setActiveCardIndex((prev) => (prev - 1 + inspectedFlashcards.length) % inspectedFlashcards.length);
                            }}
                            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700"
                          >
                            Previous Card
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsCardFlipped(false);
                              setShowCardHint(false);
                              setActiveCardIndex((prev) => (prev + 1) % inspectedFlashcards.length);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-xs"
                          >
                            Next Card
                          </button>
                        </div>
                      </div>
                    );
                  })()
                )}
              </div>
            )}

            {/* TAB 3: Visualizations */}
            {modalTab === "visuals" && (
              <div className="space-y-4">
                {inspectedVisualizations.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <Activity className="h-8 w-8 text-slate-400 mx-auto" />
                    <p className="text-xs text-slate-600 font-semibold">No specialized visual diagrams mapped directly to this unit yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inspectedVisualizations.map((viz) => (
                      <div key={viz.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900">{viz.title}</h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                            {viz.type.replace("_", " ")}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">{viz.caption}</p>

                        {/* Interactive schematic rendering */}
                        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                          {viz.dataPoints && viz.dataPoints.length > 0 ? (
                            <div className="w-full space-y-2">
                              <div className="text-[11px] font-semibold text-slate-500">Coordinate Plot / Empirical Data Points</div>
                              <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                                {viz.dataPoints.map((pt, idx) => (
                                  <div key={idx} className="p-1.5 rounded bg-indigo-50 border border-indigo-100 text-center text-[10px]">
                                    <div className="font-mono text-slate-500">{pt.x}</div>
                                    <div className="font-bold text-indigo-700">{pt.y}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs text-slate-500 font-mono py-4">
                              Dynamic SVG schematic curve available in Lesson Studio
                            </div>
                          )}
                        </div>

                        {(viz.takeaway || viz.pedagogicalTakeaway) && (
                          <div className="space-y-1">
                            <span className="text-[11px] font-bold text-slate-700">Key Conceptual Takeaway:</span>
                            <p className="text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                              {viz.takeaway || viz.pedagogicalTakeaway}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: Cognitive Tasks */}
            {modalTab === "activities" && (
              <div className="space-y-4">
                {inspectedActivities.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <BrainCircuit className="h-8 w-8 text-slate-400 mx-auto" />
                    <p className="text-xs text-slate-600 font-semibold">No specialized cognitive tasks mapped to this unit yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inspectedActivities.map((act) => {
                      const stepItems = act.steps || act.stepSequenceItems || [];
                      return (
                        <div key={act.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-slate-900">{act.title}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                              {act.type.replace("_", " ")}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600">{act.instructions}</p>

                          {/* Interactive Steps / Options */}
                          {stepItems.length > 0 && (
                            <div className="space-y-2 pt-1">
                              <div className="text-[11px] font-bold text-slate-700">Select the correct sequential action:</div>
                              <div className="grid gap-1.5">
                                {stepItems.map((st, sIdx) => {
                                  const stepNum = st.correctPosition ?? st.correctOrder ?? (sIdx + 1);
                                  const stepText = st.stepText || st.text || `Action Step ${sIdx + 1}`;
                                  return (
                                    <button
                                      key={st.id || sIdx}
                                      type="button"
                                      onClick={() => {
                                        setActivitySelectedStep(stepNum);
                                        setActivityFeedback(st.explanation || "Correct step sequence intuition verified.");
                                      }}
                                      className={`p-2.5 rounded-xl border text-left text-xs transition ${
                                        activitySelectedStep === stepNum
                                          ? "bg-indigo-50 border-indigo-300 text-indigo-950 font-medium"
                                          : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800"
                                      }`}
                                    >
                                      <strong>Step {stepNum}:</strong> {stepText}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                        {activityFeedback && (
                          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                            <div>
                              <strong>Pedagogical Rationale:</strong> {activityFeedback}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: Vernacular Scaffolding */}
            {modalTab === "vernacular" && (
              <div className="space-y-4">
                {/* Language Picker */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setSelectedLanguage(lang.code)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border flex items-center gap-1.5 ${
                        selectedLanguage === lang.code
                          ? "bg-indigo-600 border-indigo-700 text-white shadow-2xs"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{lang.flagEmoji}</span>
                      <span>{lang.nativeName}</span>
                    </button>
                  ))}
                </div>

                {/* Vernacular content cards */}
                <div className="space-y-3">
                  {inspectedVernacular.map(({ skillTitle, local }, idx) => {
                    const content =
                      selectedLanguage === "yo"
                        ? local.yoruba
                        : selectedLanguage === "ig"
                        ? local.igbo
                        : selectedLanguage === "ha"
                        ? local.hausa
                        : local.pidgin;

                    return (
                      <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                        <div className="text-xs font-bold text-slate-900">{skillTitle}</div>
                        {content ? (
                          <div className="space-y-2 text-xs text-slate-700">
                            <p className="leading-relaxed font-medium">{content.intuitionHook}</p>
                            <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 text-[11px]">
                              <strong>Common Pitfall:</strong> {content.commonPitfallSummary}
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-500 italic">
                            Vernacular localization in preparation by Specialist Cultural Linguist.
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Close Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setInspectedUnit(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
