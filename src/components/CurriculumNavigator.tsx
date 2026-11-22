import React, { useState, useMemo } from "react";
import {
  BookOpen,
  CheckCircle2,
  Lock,
  ChevronRight,
  Layers,
  Sparkles,
  Trophy,
  Filter,
  Search,
  Binary,
  Atom,
  Cpu,
  TrendingUp,
  GraduationCap,
  Calculator,
  Compass,
  Variable,
  Activity,
  Globe,
  CheckCheck,
  Info,
  ShieldCheck,
  FlaskConical,
  Dna,
  Zap,
  FileText,
  X,
  ArrowRight,
  HelpCircle,
  Tag,
  Video,
  Target,
  ExternalLink,
  BookMarked,
  Check,
  PieChart,
  Clock,
  Brain,
  Sprout,
  Heart,
  Shield,
  Landmark,
  Palette,
  Music,
  Coins,
  Briefcase,
  Award,
  Crosshair,
  Radio,
  Database,
  Wrench,
  Sun,
  Copy,
  Hash,
  ListFilter,
  SlidersHorizontal
} from "lucide-react";
import { LEARNING_DOMAINS, SUBJECTS } from "../data/curriculumData";
import {
  EducationalLevel,
  CurriculumStandard,
  Skill,
  Unit,
  MasteryRecord,
  CurriculumStandardMapping
} from "../types/curriculum";
import { curriculumService } from "../services/curriculumService";
import { videoLearningService } from "../services/videoLearningService";
import { lessonNoteService, RequiredLessonNote } from "../services/lessonNoteService";
import { RequiredLessonNoteOutput } from "./RequiredLessonNoteOutput";
import { courseDiscoveryService } from "../services/courseDiscoveryService";
import {
  CourseCatalogItem,
  SubjectCategoryCode,
  SubjectCategoryDefinition
} from "../types/courseDiscovery";
import { readinessService } from "../services/readinessService";
import { ReadinessPathway } from "../types/readiness";
import { ReadinessPathwayModal } from "./readiness/ReadinessPathwayModal";

interface CurriculumNavigatorProps {
  onSelectSkill: (skill: Skill, unit: Unit) => void;
  onStudyLesson?: (skill: Skill, unit: Unit) => void;
  masteryRecords: Record<string, MasteryRecord>;
  currentLevel: EducationalLevel | "all";
  onLevelChange: (level: EducationalLevel | "all") => void;
  countryCode?: string;
}

const LEVEL_NAMES: Record<EducationalLevel, string> = {
  primary_foundations: "Primary Foundations",
  upper_primary: "Upper Primary",
  junior_secondary: "Junior Secondary",
  senior_secondary: "Senior Secondary",
  university_prep: "University Prep",
  exam_prep: "Exam Prep"
};

const LEVEL_COLORS: Record<EducationalLevel, { badge: string; border: string }> = {
  primary_foundations: { badge: "bg-amber-100 text-amber-900 border-amber-300", border: "border-amber-200" },
  upper_primary: { badge: "bg-emerald-100 text-emerald-900 border-emerald-300", border: "border-emerald-200" },
  junior_secondary: { badge: "bg-sky-100 text-sky-900 border-sky-300", border: "border-sky-200" },
  senior_secondary: { badge: "bg-indigo-100 text-indigo-900 border-indigo-300", border: "border-indigo-200" },
  university_prep: { badge: "bg-purple-100 text-purple-900 border-purple-300", border: "border-purple-200" },
  exam_prep: { badge: "bg-rose-100 text-rose-900 border-rose-300", border: "border-rose-200" }
};

export const CurriculumNavigator: React.FC<CurriculumNavigatorProps> = ({
  onSelectSkill,
  onStudyLesson,
  masteryRecords,
  currentLevel,
  onLevelChange,
  countryCode = "NG"
}) => {
  const [selectedDomainId, setSelectedDomainId] = useState<string>("mathematics");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLevelFilter, setSearchLevelFilter] = useState<EducationalLevel | "all">("all");
  const [selectedStandard, setSelectedStandard] = useState<string>("ALL");
  const [inspectedMapping, setInspectedMapping] = useState<CurriculumStandardMapping | null>(null);

  // Lesson Note Output Channel State
  const [activeLessonNote, setActiveLessonNote] = useState<RequiredLessonNote | null>(null);
  const [selectedSkillForNote, setSelectedSkillForNote] = useState<Skill | null>(null);
  const [selectedUnitForNote, setSelectedUnitForNote] = useState<Unit | null>(null);

  // Course Discovery & Readiness State
  const [navigatorMode, setNavigatorMode] = useState<"catalog" | "expanded-subjects" | "units">("catalog");
  const [selectedCategoryCode, setSelectedCategoryCode] = useState<string>("all");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [readinessModalPathway, setReadinessModalPathway] = useState<ReadinessPathway | null>(null);
  const [isReadinessModalOpen, setIsReadinessModalOpen] = useState(false);

  // Global Expanded 151-Subject Search & Navigation State
  const [subjectSearchQuery, setSubjectSearchQuery] = useState<string>("");
  const [subjectStageFilter, setSubjectStageFilter] = useState<"all" | "primary" | "secondary" | "advanced">("all");
  const [searchResultTab, setSearchResultTab] = useState<"all" | "subjects" | "units">("all");
  const [catalogCategoryTab, setCatalogCategoryTab] = useState<"canonical19" | "expanded151">("canonical19");
  const [copiedSubjectCode, setCopiedSubjectCode] = useState<string | null>(null);

  const subjectCategories = useMemo(() => {
    return courseDiscoveryService.getSubjectCategories();
  }, []);

  const expandedSubjects = useMemo(() => {
    return courseDiscoveryService.getExpandedSubjectCategories();
  }, []);

  const allCourses = useMemo(() => {
    return courseDiscoveryService.getCourseCatalog();
  }, []);

  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const matchCat =
        selectedCategoryCode === "all" ||
        course.subjectCategory === selectedCategoryCode ||
        (selectedCategoryCode.startsWith("pri_math") && course.subjectCategory === "mathematics") ||
        (selectedCategoryCode.startsWith("sec_math") && course.subjectCategory === "mathematics") ||
        (selectedCategoryCode.startsWith("sec_phy") && course.subjectCategory === "physics") ||
        (selectedCategoryCode.startsWith("sec_chem") && course.subjectCategory === "chemistry") ||
        (selectedCategoryCode.startsWith("sec_bio") && course.subjectCategory === "biology") ||
        (selectedCategoryCode.startsWith("pri_eng") && course.subjectCategory === "english_language") ||
        (selectedCategoryCode.startsWith("sec_eng") && course.subjectCategory === "english_language") ||
        (selectedCategoryCode.startsWith("exam_") && course.subjectCategory === "exam_prep");
      const matchLvl = currentLevel === "all" || course.level === currentLevel;
      return matchCat && matchLvl;
    });
  }, [allCourses, selectedCategoryCode, currentLevel]);

  // Stage Breakdown Counts across all 151 proposed subjects
  const stageCounts = useMemo(() => {
    const counts = { all: expandedSubjects.length, primary: 0, secondary: 0, advanced: 0, clubs: 0 };
    expandedSubjects.forEach((s) => {
      if (s.stage === "primary") counts.primary++;
      else if (s.stage === "secondary") counts.secondary++;
      else if (s.stage === "advanced") counts.advanced++;
      else if (s.stage === "all") counts.clubs++;
    });
    return counts;
  }, [expandedSubjects]);

  // Filtered 151-Subject List for the Dedicated Directory and Navigator
  const filteredExpandedSubjects = useMemo(() => {
    return courseDiscoveryService.searchExpandedSubjects(subjectSearchQuery, {
      stage: subjectStageFilter,
      level: currentLevel
    });
  }, [subjectSearchQuery, subjectStageFilter, currentLevel]);

  const handleCopyCode = (code: string) => {
    try {
      navigator.clipboard?.writeText(code);
      setCopiedSubjectCode(code);
      setTimeout(() => setCopiedSubjectCode(null), 2000);
    } catch {
      // Fallback
      setCopiedSubjectCode(code);
      setTimeout(() => setCopiedSubjectCode(null), 2000);
    }
  };

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case "Calculator": return <Calculator className="h-4 w-4" />;
      case "PieChart": return <PieChart className="h-4 w-4" />;
      case "Clock": return <Clock className="h-4 w-4" />;
      case "Compass": return <Compass className="h-4 w-4" />;
      case "Brain": return <Brain className="h-4 w-4" />;
      case "Zap": return <Zap className="h-4 w-4" />;
      case "Atom": return <Atom className="h-4 w-4" />;
      case "Cpu": return <Cpu className="h-4 w-4" />;
      case "Sprout": return <Sprout className="h-4 w-4" />;
      case "Heart": return <Heart className="h-4 w-4" />;
      case "Activity": return <Activity className="h-4 w-4" />;
      case "Shield": return <Shield className="h-4 w-4" />;
      case "Landmark": return <Landmark className="h-4 w-4" />;
      case "Palette": return <Palette className="h-4 w-4" />;
      case "Music": return <Music className="h-4 w-4" />;
      case "Coins": return <Coins className="h-4 w-4" />;
      case "Briefcase": return <Briefcase className="h-4 w-4" />;
      case "Award": return <Award className="h-4 w-4" />;
      case "Crosshair": return <Crosshair className="h-4 w-4" />;
      case "Radio": return <Radio className="h-4 w-4" />;
      case "Database": return <Database className="h-4 w-4" />;
      case "Wrench": return <Wrench className="h-4 w-4" />;
      case "Sun": return <Sun className="h-4 w-4" />;
      case "FlaskConical": return <FlaskConical className="h-4 w-4" />;
      case "Dna": return <Dna className="h-4 w-4" />;
      case "GraduationCap": return <GraduationCap className="h-4 w-4" />;
      case "TrendingUp": return <TrendingUp className="h-4 w-4" />;
      case "Binary": return <Binary className="h-4 w-4" />;
      case "Variable": return <Variable className="h-4 w-4" />;
      case "Globe": return <Globe className="h-4 w-4" />;
      case "Sparkles": return <Sparkles className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getSearchMatchReason = (
    subj: SubjectCategoryDefinition,
    query: string
  ): { type: "code" | "name" | "keyword" | "content"; detail: string } | null => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return null;
    if (subj.code.toLowerCase().includes(q)) {
      return { type: "code", detail: subj.code };
    }
    if (subj.name.toLowerCase().includes(q) || subj.shortTitle.toLowerCase().includes(q)) {
      return { type: "name", detail: subj.shortTitle || subj.name };
    }
    const matchedKw = subj.keywords?.find((k) => k.toLowerCase().includes(q));
    if (matchedKw) {
      return { type: "keyword", detail: matchedKw };
    }
    if (subj.tagline.toLowerCase().includes(q) || subj.description.toLowerCase().includes(q)) {
      return { type: "content", detail: subj.tagline };
    }
    return null;
  };

  const selectedCourse = useMemo(() => {
    if (!selectedCourseId) return null;
    return allCourses.find((c) => c.id === selectedCourseId) || null;
  }, [allCourses, selectedCourseId]);

  const levelOptions: { id: EducationalLevel | "all"; label: string }[] = [
    { id: "all", label: "All Levels" },
    { id: "primary_foundations", label: "Primary Foundations (Pri 1-3)" },
    { id: "upper_primary", label: "Upper Primary (Pri 4-6)" },
    { id: "junior_secondary", label: "Junior Secondary (JSS 1-3)" },
    { id: "senior_secondary", label: "Senior Secondary (SSS 1-3)" },
    { id: "university_prep", label: "University & Advanced Prep" },
    { id: "exam_prep", label: "Exam Prep (WAEC / JAMB CBT)" }
  ];

  const supportedSystems = curriculumService.getSupportedEducationSystems();
  const standards = [
    { id: "ALL", label: "All Curricula", icon: "🌍" },
    ...supportedSystems.map((s) => ({
      id: s.code,
      label: s.shortLabel,
      icon: s.defaultFlagEmoji
    }))
  ];

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case "Binary": return <Binary className="h-4 w-4" />;
      case "Atom": return <Atom className="h-4 w-4" />;
      case "Cpu": return <Cpu className="h-4 w-4" />;
      case "TrendingUp": return <TrendingUp className="h-4 w-4" />;
      case "BookOpen": return <BookOpen className="h-4 w-4" />;
      case "GraduationCap": return <GraduationCap className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const allUnits = useMemo(() => {
    const code = selectedStandard === "ALL" ? (countryCode || "NG") : selectedStandard;
    return curriculumService.getLocalizedUnits(code);
  }, [selectedStandard, countryCode]);

  // Handle generation of Required Lesson Note for a verified skill
  const handleGenerateLessonNote = (skill: Skill, unit: Unit) => {
    const note = lessonNoteService.createLessonNoteForSkill(skill, unit);
    setActiveLessonNote(note);
    setSelectedSkillForNote(skill);
    setSelectedUnitForNote(unit);
    setTimeout(() => {
      document.getElementById("required-lesson-note-channel-anchor")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  // Handle generation of Required Lesson Note for custom topic/keyword across any level
  const handleGenerateCustomTopicNote = (topic: string, level?: EducationalLevel) => {
    const targetLevel = level || (currentLevel === "all" ? "senior_secondary" : currentLevel);
    const note = lessonNoteService.createLessonNoteForCustomTopic(topic, targetLevel);
    setActiveLessonNote(note);
    setSelectedSkillForNote(null);
    setSelectedUnitForNote(null);
    setTimeout(() => {
      document.getElementById("required-lesson-note-channel-anchor")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  // Global Omnilevel Search Filter
  const isSearchActive = searchQuery.trim().length > 0;

  // Global search filtering across proposed 151-Subject List by name, code, or keyword
  const omnilevelSubjectMatches = useMemo(() => {
    if (!isSearchActive) return [];
    return courseDiscoveryService.searchExpandedSubjects(searchQuery, {
      stage: subjectStageFilter,
      level: searchLevelFilter
    });
  }, [searchQuery, searchLevelFilter, subjectStageFilter, isSearchActive]);

  const omnilevelSearchResults = useMemo(() => {
    if (!isSearchActive) return [];
    const q = searchQuery.toLowerCase().trim();

    const results: Array<{
      unit: Unit;
      skill: Skill;
      domainName: string;
      levelBadge: string;
    }> = [];

    allUnits.forEach((unit) => {
      // Check level filter
      if (searchLevelFilter !== "all" && unit.level !== searchLevelFilter) {
        return;
      }

      const domain = LEARNING_DOMAINS.find((d) => d.id === unit.category) || { name: unit.category };

      unit.skills.forEach((skill) => {
        const matchesSkill =
          skill.title.toLowerCase().includes(q) ||
          skill.code.toLowerCase().includes(q) ||
          skill.summary.toLowerCase().includes(q) ||
          skill.objectives.some((obj) => obj.toLowerCase().includes(q));

        const matchesUnit =
          unit.title.toLowerCase().includes(q) ||
          unit.code.toLowerCase().includes(q) ||
          (unit.description && unit.description.toLowerCase().includes(q));

        if (matchesSkill || matchesUnit) {
          results.push({
            unit,
            skill,
            domainName: domain.name,
            levelBadge: LEVEL_NAMES[unit.level] || unit.level
          });
        }
      });
    });

    return results;
  }, [allUnits, searchQuery, searchLevelFilter, isSearchActive]);

  // Level breakdown of search results
  const searchLevelCounts = useMemo(() => {
    if (!isSearchActive) return {};
    const counts: Record<string, number> = {};
    omnilevelSearchResults.forEach((r) => {
      counts[r.unit.level] = (counts[r.unit.level] || 0) + 1;
    });
    return counts;
  }, [omnilevelSearchResults, isSearchActive]);

  // Standard browsing filtering (when search is not active)
  const domainSubjects = curriculumService.getSubjects(selectedDomainId);
  const domainSubjectIds = new Set(domainSubjects.map((s) => s.id));

  const availableUnits = allUnits.filter((unit) => {
    if (selectedSubjectId !== "all") {
      return unit.subjectId === selectedSubjectId;
    }
    return domainSubjectIds.has(unit.subjectId);
  });

  const filteredUnits = availableUnits.filter((unit) => {
    const matchesLevel = currentLevel === "all" ? true : unit.level === currentLevel;

    // Filter by standard if selected
    if (selectedStandard !== "ALL") {
      const unitHasMappedSkill = unit.skills.some((s) => {
        const mappings = curriculumService.getCompetencyMappings(s.id);
        return mappings.some((m) => m.curriculumSystem === selectedStandard);
      });
      if (!unitHasMappedSkill) return false;
    }

    return matchesLevel;
  });

  const handleDomainChange = (domainId: string) => {
    setSelectedDomainId(domainId);
    setSelectedSubjectId("all");
  };

  const activeDomain = LEARNING_DOMAINS.find((d) => d.id === selectedDomainId);

  return (
    <div id="curriculum-navigator-view" className="space-y-6 max-w-6xl mx-auto">
      {/* 1. Dedicated Global Omnilevel Search & Lesson Note Synthesis Bar */}
      <div className="rounded-2xl border-2 border-indigo-200 bg-white p-4 sm:p-5 shadow-xs space-y-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Omnilevel Curriculum Search & Lesson Note Synthesis
              </span>
              <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                All 6 Levels & 76 Units
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Filter verified skills and units across all educational levels, or promptly generate the official Required Lesson Note for any topic.
            </p>
          </div>

          {/* Search Bar Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              id="curriculum-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills, units or topics (e.g. quadratic, fractions, concord, photosynthesis, database)..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50/70 pl-10 pr-9 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                id="btn-clear-curriculum-search"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 p-0.5 text-slate-400 hover:text-slate-700 transition rounded-full hover:bg-slate-200"
                title="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Omnilevel Filter Pills */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3 text-indigo-500" /> Level:
          </span>
          <button
            type="button"
            onClick={() => {
              setSearchLevelFilter("all");
              onLevelChange("all");
            }}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
              searchLevelFilter === "all"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Educational Levels ({allUnits.length} Units)
          </button>
          {levelOptions.filter((l) => l.id !== "all").map((lvl) => {
            const count = searchLevelCounts[lvl.id] || 0;
            const isSelected = searchLevelFilter === lvl.id;
            return (
              <button
                key={lvl.id}
                type="button"
                onClick={() => {
                  setSearchLevelFilter(lvl.id);
                  onLevelChange(lvl.id);
                }}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium whitespace-nowrap transition border ${
                  isSelected
                    ? "bg-indigo-600 border-indigo-700 text-white font-semibold shadow-xs"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <span>{lvl.label}</span>
                {isSearchActive && count > 0 && (
                  <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-800"
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Stage Filter Pills for Omnilevel 151-Subject Search & Discovery */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Layers className="h-3 w-3 text-indigo-500" /> Academic Stage:
          </span>
          <button
            type="button"
            id="search-stage-all"
            onClick={() => setSubjectStageFilter("all")}
            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
              subjectStageFilter === "all"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Stages (151 Subjects)
          </button>
          <button
            type="button"
            id="search-stage-primary"
            onClick={() => setSubjectStageFilter("primary")}
            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition cursor-pointer border ${
              subjectStageFilter === "primary"
                ? "bg-emerald-600 border-emerald-700 text-white shadow-xs"
                : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            Primary Foundations & Upper Primary (51)
          </button>
          <button
            type="button"
            id="search-stage-secondary"
            onClick={() => setSubjectStageFilter("secondary")}
            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition cursor-pointer border ${
              subjectStageFilter === "secondary"
                ? "bg-sky-600 border-sky-700 text-white shadow-xs"
                : "bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100"
            }`}
          >
            Junior & Senior Secondary (55)
          </button>
          <button
            type="button"
            id="search-stage-advanced"
            onClick={() => setSubjectStageFilter("advanced")}
            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition cursor-pointer border ${
              subjectStageFilter === "advanced"
                ? "bg-purple-600 border-purple-700 text-white shadow-xs"
                : "bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100"
            }`}
          >
            Advanced & Exam Hall (35)
          </button>
        </div>

        {/* Instant Topic Generator Prompt when query is typed */}
        {isSearchActive && (
          <div className="pt-3 border-t border-indigo-100 bg-indigo-50/50 -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 p-3.5 sm:p-4 rounded-b-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-600 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-indigo-900">
                  ⚡ Promptly Create Output Result of Required Lesson Note
                </span>
                <span className="text-slate-600 block sm:inline sm:ml-1">
                  for <strong className="text-slate-900 font-semibold">"{searchQuery}"</strong> across any level:
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                id="btn-gen-note-sss"
                onClick={() => handleGenerateCustomTopicNote(searchQuery, "senior_secondary")}
                className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition shadow-2xs"
              >
                Senior Sec (SSS)
              </button>
              <button
                type="button"
                id="btn-gen-note-jss"
                onClick={() => handleGenerateCustomTopicNote(searchQuery, "junior_secondary")}
                className="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition shadow-2xs"
              >
                Junior Sec (JSS)
              </button>
              <button
                type="button"
                id="btn-gen-note-pri"
                onClick={() => handleGenerateCustomTopicNote(searchQuery, "upper_primary")}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition shadow-2xs"
              >
                Primary (Pri 4-6)
              </button>
              <button
                type="button"
                id="btn-gen-note-univ"
                onClick={() => handleGenerateCustomTopicNote(searchQuery, "university_prep")}
                className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition shadow-2xs"
              >
                University Prep
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. DEDICATED CHANNEL / SPACE: Output Result of Required Lesson Note */}
      <div id="required-lesson-note-channel-anchor">
        {activeLessonNote && (
          <RequiredLessonNoteOutput
            note={activeLessonNote}
            onClose={() => setActiveLessonNote(null)}
            onStudyLesson={onStudyLesson}
            onSelectSkill={onSelectSkill}
            matchedSkill={selectedSkillForNote || undefined}
            matchedUnit={selectedUnitForNote || undefined}
          />
        )}
      </div>

      {/* 3. CONDITIONAL BODY: SEARCH RESULTS VS BROWSE VIEW */}
      {isSearchActive ? (
        <div id="omnilevel-search-results-space" className="space-y-5">
          {/* Header & Results Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                id="search-tab-all"
                onClick={() => setSearchResultTab("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  searchResultTab === "all"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Search className="h-3.5 w-3.5" />
                <span>All Matches ({omnilevelSubjectMatches.length + omnilevelSearchResults.length})</span>
              </button>

              <button
                type="button"
                id="search-tab-subjects"
                onClick={() => setSearchResultTab("subjects")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  searchResultTab === "subjects"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>151-Subject List ({omnilevelSubjectMatches.length})</span>
              </button>

              <button
                type="button"
                id="search-tab-units"
                onClick={() => setSearchResultTab("units")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  searchResultTab === "units"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Layers className="h-3.5 w-3.5 text-sky-500" />
                <span>Units & Skills ({omnilevelSearchResults.length})</span>
              </button>
            </div>

            <button
              type="button"
              id="btn-clear-search-view"
              onClick={() => setSearchQuery("")}
              className="text-xs text-indigo-600 hover:underline font-semibold flex items-center gap-1"
            >
              <X className="h-3.5 w-3.5" />
              <span>Clear Search & Browse Full Curriculum</span>
            </button>
          </div>

          {/* Active Search Stage Quick Filter */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-slate-600 flex items-center gap-1">
                <Filter className="h-3 w-3 text-indigo-500" /> Filter Stage:
              </span>
              <button
                type="button"
                id="search-res-stage-all"
                onClick={() => setSubjectStageFilter("all")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  subjectStageFilter === "all"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All
              </button>
              <button
                type="button"
                id="search-res-stage-primary"
                onClick={() => setSubjectStageFilter("primary")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  subjectStageFilter === "primary"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
                }`}
              >
                Primary (Grades 1-6)
              </button>
              <button
                type="button"
                id="search-res-stage-secondary"
                onClick={() => setSubjectStageFilter("secondary")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  subjectStageFilter === "secondary"
                    ? "bg-sky-600 text-white shadow-xs"
                    : "bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200"
                }`}
              >
                Secondary (JSS & SSS)
              </button>
              <button
                type="button"
                id="search-res-stage-advanced"
                onClick={() => setSubjectStageFilter("advanced")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  subjectStageFilter === "advanced"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200"
                }`}
              >
                Advanced & Exam Prep
              </button>
            </div>

            {subjectStageFilter !== "all" && (
              <button
                type="button"
                id="btn-reset-search-stage"
                onClick={() => setSubjectStageFilter("all")}
                className="text-xs text-indigo-600 font-semibold hover:underline"
              >
                Reset Stage Filter
              </button>
            )}
          </div>

          {/* Zero Results Across Both Subjects & Units */}
          {omnilevelSubjectMatches.length === 0 && omnilevelSearchResults.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center space-y-3">
              <Sparkles className="h-8 w-8 text-indigo-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">
                No Exact Matches for "{searchQuery}"
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No verified subject category or curriculum skill currently matches this term, but you can promptly synthesize the official Required Lesson Note for this topic below!
              </p>
              <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleGenerateCustomTopicNote(searchQuery, "senior_secondary")}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition cursor-pointer"
                >
                  Create Required Lesson Note for "{searchQuery}"
                </button>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition cursor-pointer"
                >
                  Reset Search
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* SECTION A: MATCHING SUBJECTS FROM THE PROPOSED 151-SUBJECT LIST */}
              {searchResultTab !== "units" && omnilevelSubjectMatches.length > 0 && (
                <div id="search-151-subjects-section" className="space-y-3.5">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-indigo-600" />
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Matching Proposed Subject Categories ({omnilevelSubjectMatches.length} of 151)
                      </h3>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Filtered by name, code, or keyword
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {omnilevelSubjectMatches.map((subj) => {
                      const matchReason = getSearchMatchReason(subj, searchQuery);
                      const stageConfig =
                        subj.stage === "primary"
                          ? { badge: "bg-emerald-100 text-emerald-900 border-emerald-300", label: "Primary (Grades 1-6)" }
                          : subj.stage === "secondary"
                          ? { badge: "bg-sky-100 text-sky-900 border-sky-300", label: "Secondary (JSS & SSS)" }
                          : subj.stage === "advanced"
                          ? { badge: "bg-purple-100 text-purple-900 border-purple-300", label: "Advanced Prep" }
                          : { badge: "bg-amber-100 text-amber-900 border-amber-300", label: "Co-Curricular Clubs" };

                      return (
                        <div
                          key={`search-subj-${subj.code}`}
                          id={`subject-card-${subj.code}`}
                          className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-2xs hover:border-indigo-300 hover:shadow-xs transition flex flex-col justify-between space-y-3.5"
                        >
                          <div className="space-y-2.5">
                            {/* Top Badges */}
                            <div className="flex items-center justify-between gap-1.5 flex-wrap">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${stageConfig.badge}`}>
                                {stageConfig.label}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyCode(subj.code)}
                                className="inline-flex items-center gap-1 font-mono text-[10px] text-slate-500 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded border border-slate-200 cursor-pointer transition"
                                title="Click to copy subject code"
                              >
                                <span>{subj.code}</span>
                                {copiedSubjectCode === subj.code ? (
                                  <Check className="h-3 w-3 text-emerald-600" />
                                ) : (
                                  <Copy className="h-3 w-3 text-slate-400" />
                                )}
                              </button>
                            </div>

                            {/* Title & Icon */}
                            <div className="flex items-start gap-2.5">
                              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 shrink-0 border border-indigo-100 mt-0.5">
                                {getSubjectIcon(subj.iconName)}
                              </div>
                              <div className="space-y-0.5">
                                <h4 className="text-sm font-black text-slate-900 leading-snug">
                                  {subj.name}
                                </h4>
                                <p className="text-[11px] font-semibold text-indigo-700">
                                  {subj.tagline}
                                </p>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                              {subj.description}
                            </p>

                            {/* Match Explanation Badge */}
                            {matchReason && (
                              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-semibold">
                                <span>Matched by {matchReason.type}:</span>
                                <strong className="underline decoration-amber-400 font-bold">{matchReason.detail}</strong>
                              </div>
                            )}

                            {/* Keywords Chips */}
                            {subj.keywords && subj.keywords.length > 0 && (
                              <div className="flex flex-wrap gap-1 pt-1">
                                {subj.keywords.slice(0, 4).map((kw) => {
                                  const isKeywordMatch = kw.toLowerCase().includes(searchQuery.toLowerCase().trim());
                                  return (
                                    <span
                                      key={kw}
                                      className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                                        isKeywordMatch
                                          ? "bg-indigo-100 text-indigo-900 border border-indigo-300 font-bold"
                                          : "bg-slate-100 text-slate-600"
                                      }`}
                                    >
                                      #{kw}
                                    </span>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5 flex-wrap">
                            <button
                              type="button"
                              onClick={() =>
                                handleGenerateCustomTopicNote(
                                  subj.name,
                                  subj.activeLevels[0] || "senior_secondary"
                                )
                              }
                              className="flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded-lg border border-indigo-200 transition cursor-pointer"
                              title="Synthesize official 5-phase lesson note"
                            >
                              <FileText className="h-3 w-3" />
                              <span>Lesson Note</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setNavigatorMode("expanded-subjects");
                                setSubjectSearchQuery(subj.code);
                              }}
                              className="flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg transition cursor-pointer"
                            >
                              <span>Explore In 151 Directory</span>
                              <ChevronRight className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION B: MATCHING CURRICULUM UNITS & COMPETENCIES */}
              {searchResultTab !== "subjects" && omnilevelSearchResults.length > 0 && (
                <div id="search-units-skills-section" className="space-y-3.5">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-indigo-600" />
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Matching Curriculum Units & Verified Skills ({omnilevelSearchResults.length})
                      </h3>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {omnilevelSearchResults.map(({ unit, skill, domainName, levelBadge }) => {
                      const colorConfig = LEVEL_COLORS[unit.level] || {
                        badge: "bg-indigo-100 text-indigo-900 border-indigo-200",
                        border: "border-indigo-100"
                      };

                      return (
                        <div
                          key={`${unit.id}-${skill.id}`}
                          id={`search-result-skill-${skill.id}`}
                          className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4.5 shadow-2xs hover:border-indigo-300 hover:shadow-xs transition"
                        >
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center justify-between gap-1.5">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colorConfig.badge}`}>
                                {levelBadge}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                                {domainName}
                              </span>
                            </div>

                            <div>
                              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                                <span>{unit.code}</span>
                                <span>•</span>
                                <span>{skill.code}</span>
                              </div>
                              <h4 className="text-sm font-bold text-slate-900 mt-0.5">{skill.title}</h4>
                              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                                {skill.summary}
                              </p>
                            </div>

                            {/* Objectives Preview */}
                            {skill.objectives && skill.objectives.length > 0 && (
                              <div className="pt-1.5 space-y-1">
                                {skill.objectives.slice(0, 2).map((obj, oIdx) => (
                                  <div key={oIdx} className="flex items-start gap-1.5 text-[11px] text-slate-500">
                                    <span className="h-1 w-1 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                    <span className="line-clamp-1">{obj}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                            <span className="text-[11px] text-slate-400">
                              {skill.questions.length} Practice Items
                            </span>

                            <div className="flex items-center gap-1.5 flex-wrap justify-end">
                              <button
                                type="button"
                                id={`btn-search-note-${skill.id}`}
                                onClick={() => handleGenerateLessonNote(skill, unit)}
                                className="flex items-center gap-1 text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 transition py-1 px-2.5 rounded-lg border border-indigo-200 shadow-2xs cursor-pointer"
                                title="Promptly output the required lesson note for this topic"
                              >
                                <FileText className="h-3.5 w-3.5 text-indigo-600" />
                                <span>Output Required Lesson Note</span>
                              </button>

                              {onStudyLesson && (
                                <button
                                  type="button"
                                  onClick={() => onStudyLesson(skill, unit)}
                                  className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-indigo-700 transition py-1 px-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
                                >
                                  <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
                                  <span>Study</span>
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => onSelectSkill(skill, unit)}
                                className="flex items-center gap-1 text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition py-1 px-2.5 rounded-lg shadow-2xs cursor-pointer"
                              >
                                <span>Practice</span>
                                <ChevronRight className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* STANDARD BROWSE VIEW (Course Discovery Catalog vs Units & Competency Explorer) */
        <div className="space-y-6">
          {/* Mode Switcher Ribbon */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                id="tab-mode-catalog"
                onClick={() => {
                  setNavigatorMode("catalog");
                  setSelectedCourseId(null);
                }}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  navigatorMode === "catalog"
                    ? "bg-indigo-600 text-white shadow-xs ring-1 ring-indigo-500/30"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Course Discovery Catalogue ({allCourses.length})</span>
              </button>

              <button
                type="button"
                id="tab-mode-expanded-subjects"
                onClick={() => {
                  setNavigatorMode("expanded-subjects");
                  setSelectedCourseId(null);
                }}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  navigatorMode === "expanded-subjects"
                    ? "bg-indigo-600 text-white shadow-xs ring-1 ring-indigo-500/30"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>151 Proposed Subjects</span>
                <span
                  className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                    navigatorMode === "expanded-subjects"
                      ? "bg-white/20 text-white"
                      : "bg-amber-100 text-amber-900 border border-amber-300"
                  }`}
                >
                  151
                </span>
              </button>

              <button
                type="button"
                id="tab-mode-units"
                onClick={() => setNavigatorMode("units")}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  navigatorMode === "units"
                    ? "bg-indigo-600 text-white shadow-xs ring-1 ring-indigo-500/30"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>Units & Competency Explorer ({filteredUnits.length})</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold px-2 w-full sm:w-auto justify-end">
              <Globe className="h-3.5 w-3.5 text-slate-400" />
              <span>Level Filter:</span>
              <select
                value={currentLevel}
                onChange={(e) => onLevelChange(e.target.value as EducationalLevel | "all")}
                className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800"
              >
                {levelOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {navigatorMode === "catalog" ? (
            /* COURSE DISCOVERY CATALOGUE VIEW */
            <div className="space-y-6">
              {selectedCourse ? (
                /* EXPANDED COURSE SYLLABUS & TOPIC RESOURCE HUB */
                <div className="space-y-5">
                  {/* Back Navigation Bar */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedCourseId(null)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                      <span>Back to Course Catalogue</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-500">
                        {selectedCourse.unitIds.length} Verified Units
                      </span>
                    </div>
                  </div>

                  {/* Course Header Hero Card */}
                  <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white p-6 shadow-md space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 font-bold text-[10px] uppercase">
                          {selectedCourse.subjectCategory.replace("_", " ")}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-semibold text-[10px]">
                          {selectedCourse.level.replace("_", " ").toUpperCase()}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
                        <Video className="h-3.5 w-3.5" />
                        <span>Smart Board Masterclass Supported</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-2xl font-black text-white">
                        {selectedCourse.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed max-w-3xl">
                        {selectedCourse.description}
                      </p>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-indigo-800/80">
                      <div className="flex items-center gap-4 text-xs text-indigo-200 font-medium">
                        <span>Duration: <strong>{selectedCourse.estimatedWeeks} Weeks</strong></span>
                        <span>Units: <strong>{selectedCourse.unitIds.length}</strong></span>
                        <span>Official Standards: <strong>{selectedCourse.curricula.join(", ")}</strong></span>
                      </div>

                      {selectedCourse.readinessPathwayId && (
                        <button
                          type="button"
                          onClick={() => {
                            const pathway = readinessService.getPathwayById(selectedCourse.readinessPathwayId!);
                            if (pathway) {
                              setReadinessModalPathway(pathway);
                              setIsReadinessModalOpen(true);
                            }
                          }}
                          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                        >
                          <ShieldCheck className="h-4 w-4" />
                          <span>Check Prerequisites ("Get Ready")</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Course Units & Topic Resource Availability */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <BookMarked className="h-4 w-4 text-indigo-600" />
                        <span>Course Syllabus & Topic Resource Hub</span>
                      </h3>
                      <span className="text-xs text-slate-500">
                        Audited genuine instructional materials
                      </span>
                    </div>

                    <div className="space-y-4">
                      {selectedCourse.unitIds.map((unitId, uIdx) => {
                        const unit = allUnits.find((u) => u.id === unitId) || curriculumService.getUnitById(unitId);
                        if (!unit) return null;

                        return (
                          <div
                            key={unit.id}
                            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono font-bold text-[11px] border border-indigo-200">
                                    Unit {uIdx + 1} • {unit.code}
                                  </span>
                                  <span className="text-xs text-slate-400 font-medium">
                                    {unit.skills.length} Competencies
                                  </span>
                                  {unit.isDeepSaturated && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                      <Sparkles className="w-3 h-3 text-emerald-600" />
                                      Deep-Saturated ({unit.estimatedHours}h • Gates A-F Certified)
                                    </span>
                                  )}
                                </div>
                                <h4 className="text-base font-black text-slate-900">
                                  {unit.title}
                                </h4>
                              </div>

                              <p className="text-xs text-slate-500 max-w-md line-clamp-2">
                                {unit.description}
                              </p>
                            </div>

                            {/* Topics & Skills in this Unit */}
                            <div className="grid gap-3">
                              {unit.skills.map((skill) => {
                                const resourceAudit = courseDiscoveryService.getTopicResourceAvailability(skill.title, unit.id);
                                const userMastery = masteryRecords[skill.id];

                                return (
                                  <div
                                    key={skill.id}
                                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                                  >
                                    <div className="space-y-2 max-w-xl">
                                      <div className="flex items-center gap-2">
                                        <h5 className="font-bold text-slate-900 text-sm">
                                          {skill.title}
                                        </h5>
                                        {userMastery && (
                                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                                            {userMastery.status} ({userMastery.points} pts)
                                          </span>
                                        )}
                                      </div>

                                      <p className="text-xs text-slate-600">
                                        {skill.summary}
                                      </p>

                                      {/* Honest Resource Checklist */}
                                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-medium">
                                          <Video className="h-3 w-3" /> Smart Board Masterclass
                                        </span>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-medium">
                                          <Target className="h-3 w-3" /> Practice Arena ({resourceAudit.availableChannelsCount} channels)
                                        </span>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                                          <BookOpen className="h-3 w-3" /> Textbook Chapter
                                        </span>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                                          <FileText className="h-3 w-3" /> 5-Phase Lesson Note
                                        </span>
                                      </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2 flex-wrap shrink-0">
                                      <button
                                        type="button"
                                        onClick={() => handleGenerateLessonNote(skill, unit)}
                                        className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-indigo-700 border border-slate-200 font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                                        title="Output official lesson note"
                                      >
                                        <FileText className="h-3.5 w-3.5" />
                                        <span>Lesson Note</span>
                                      </button>

                                      {onStudyLesson && (
                                        <button
                                          type="button"
                                          onClick={() => onStudyLesson(skill, unit)}
                                          className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                                        >
                                          <Video className="h-3.5 w-3.5" />
                                          <span>Masterclass</span>
                                        </button>
                                      )}

                                      <button
                                        type="button"
                                        onClick={() => onSelectSkill(skill, unit)}
                                        className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1 transition shadow-xs cursor-pointer"
                                      >
                                        <span>Practice</span>
                                        <ChevronRight className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                /* MAIN CATALOGUE GRID & CATEGORY FILTERS */
                <div className="space-y-6">
                  {/* Subject Categories Ribbon */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-indigo-600" />
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Subject Categories & Disciplines
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-[11px] font-bold">
                          <button
                            type="button"
                            id="catalog-cat-tab-19"
                            onClick={() => setCatalogCategoryTab("canonical19")}
                            className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                              catalogCategoryTab === "canonical19"
                                ? "bg-white text-slate-900 shadow-xs"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            19 Flagships
                          </button>
                          <button
                            type="button"
                            id="catalog-cat-tab-151"
                            onClick={() => setCatalogCategoryTab("expanded151")}
                            className={`px-2.5 py-1 rounded-md transition cursor-pointer flex items-center gap-1 ${
                              catalogCategoryTab === "expanded151"
                                ? "bg-white text-slate-900 shadow-xs"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            <span>151 Proposed</span>
                            <span className="text-[10px] bg-amber-100 text-amber-900 px-1 py-0.2 rounded-full font-black">
                              151
                            </span>
                          </button>
                        </div>
                        <button
                          type="button"
                          id="btn-open-151-dir"
                          onClick={() => setNavigatorMode("expanded-subjects")}
                          className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200 transition"
                        >
                          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                          <span>Open 151 Directory</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {catalogCategoryTab === "canonical19" ? (
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedCategoryCode("all")}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                            selectedCategoryCode === "all"
                              ? "bg-indigo-600 text-white shadow-xs"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          <span>All Categories</span>
                          <span className="text-[10px] opacity-80">({allCourses.length})</span>
                        </button>

                        {subjectCategories.map((cat) => {
                          const isSelected = selectedCategoryCode === cat.code;
                          return (
                            <button
                              key={cat.code}
                              type="button"
                              onClick={() => setSelectedCategoryCode(cat.code)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                                isSelected
                                  ? "bg-indigo-600 text-white shadow-xs"
                                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                              }`}
                            >
                              <span>{cat.shortTitle || cat.name}</span>
                              <span className="text-[10px] opacity-75">({cat.courseCount})</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                          <input
                            type="text"
                            value={subjectSearchQuery}
                            onChange={(e) => setSubjectSearchQuery(e.target.value)}
                            placeholder="Filter 151 subjects by name, code, or keyword..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-8.5 pr-8 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-indigo-500"
                          />
                          {subjectSearchQuery && (
                            <button
                              type="button"
                              onClick={() => setSubjectSearchQuery("")}
                              className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>

                        {/* Stage Filter Buttons in Expanded Category Ribbon */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                          <span className="text-[11px] font-semibold text-slate-500 mr-0.5">Stage:</span>
                          <button
                            type="button"
                            onClick={() => setSubjectStageFilter("all")}
                            className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                              subjectStageFilter === "all"
                                ? "bg-indigo-600 text-white shadow-xs"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            All Stages
                          </button>
                          <button
                            type="button"
                            onClick={() => setSubjectStageFilter("primary")}
                            className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition cursor-pointer border ${
                              subjectStageFilter === "primary"
                                ? "bg-emerald-600 text-white shadow-xs"
                                : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                            }`}
                          >
                            Primary (51)
                          </button>
                          <button
                            type="button"
                            onClick={() => setSubjectStageFilter("secondary")}
                            className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition cursor-pointer border ${
                              subjectStageFilter === "secondary"
                                ? "bg-sky-600 text-white shadow-xs"
                                : "bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100"
                            }`}
                          >
                            Secondary (55)
                          </button>
                          <button
                            type="button"
                            onClick={() => setSubjectStageFilter("advanced")}
                            className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition cursor-pointer border ${
                              subjectStageFilter === "advanced"
                                ? "bg-purple-600 text-white shadow-xs"
                                : "bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100"
                            }`}
                          >
                            Advanced (35)
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
                          <button
                            type="button"
                            onClick={() => setSelectedCategoryCode("all")}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                              selectedCategoryCode === "all"
                                ? "bg-indigo-600 text-white shadow-xs"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            All ({expandedSubjects.length})
                          </button>
                          {filteredExpandedSubjects.slice(0, 45).map((subj) => {
                            const isSelected = selectedCategoryCode === subj.code;
                            return (
                              <button
                                key={subj.code}
                                type="button"
                                onClick={() => setSelectedCategoryCode(subj.code)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer border ${
                                  isSelected
                                    ? "bg-indigo-600 text-white border-indigo-700 font-bold"
                                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                                }`}
                              >
                                <span>{subj.shortTitle || subj.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Course Cards Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredCourses.map((course) => (
                      <div
                        key={course.id}
                        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md hover:border-indigo-300 transition flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                              {course.subjectCategory.replace("_", " ")}
                            </span>
                            <span className="text-[11px] font-bold text-slate-500">
                              {course.estimatedWeeks} Weeks
                            </span>
                          </div>

                          <h3 className="text-base font-black text-slate-900 leading-snug">
                            {course.title}
                          </h3>

                          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                            {course.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                              <Video className="h-3 w-3" /> Smart Board Masterclasses
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                              {course.unitIds.length} Units
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          {course.readinessPathwayId ? (
                            <button
                              type="button"
                              onClick={() => {
                                const pathway = readinessService.getPathwayById(course.readinessPathwayId!);
                                if (pathway) {
                                  setReadinessModalPathway(pathway);
                                  setIsReadinessModalOpen(true);
                                }
                              }}
                              className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                              title="Check prerequisite readiness"
                            >
                              <ShieldCheck className="h-3.5 w-3.5" />
                              <span>Get Ready</span>
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-400 font-medium">Core Syllabus</span>
                          )}

                          <button
                            type="button"
                            onClick={() => setSelectedCourseId(course.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                          >
                            <span>Explore Course</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : navigatorMode === "expanded-subjects" ? (
            /* PROPOSED EXPANDED 151-SUBJECT DIRECTORY & GLOBAL SEARCH VIEW */
            <div id="expanded-151-subjects-directory-view" className="space-y-6">
              {/* Hero Banner Card */}
              <div className="rounded-3xl border border-indigo-300 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-6 sm:p-7 shadow-lg space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Proposed Expanded 151-Subject List</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-semibold">
                      Primary & Secondary Focus
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 bg-emerald-400/10 border border-emerald-400/30 px-3 py-1 rounded-full">
                    <CheckCheck className="h-3.5 w-3.5" />
                    <span>Global Search Ready (Name, Code & Keywords)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    Expanded 151-Subject Curriculum Catalogue
                  </h2>
                  <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed max-w-4xl">
                    Expanding MOOS Academy's scope from the foundational 19 flagship disciplines to a complete 151-subject institutional taxonomy. Spans 41 Primary Foundations subjects (arithmetic, fractions, literacy, STEM, civic morals), 90 Junior & Senior Secondary disciplines (STEM, Commercial, Arts, Vocational/Technical), 14 Advanced Tertiary & Standardized Exam Preparations (WAEC, JAMB CBT, IGCSE), and 6 Co-Curricular Innovation Clubs.
                  </p>
                </div>

                {/* Key Metrics Stats Bar */}
                <div className="pt-3 border-t border-indigo-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-xl sm:text-2xl font-black text-white">{stageCounts.all}</div>
                    <div className="text-[11px] font-semibold text-indigo-200 uppercase tracking-wider">Total Subjects</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-xl sm:text-2xl font-black text-emerald-300">{stageCounts.primary}</div>
                    <div className="text-[11px] font-semibold text-indigo-200 uppercase tracking-wider">Primary Foundations</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-xl sm:text-2xl font-black text-sky-300">{stageCounts.secondary}</div>
                    <div className="text-[11px] font-semibold text-indigo-200 uppercase tracking-wider">Junior & Senior Secondary</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-xl sm:text-2xl font-black text-purple-300">{stageCounts.advanced + stageCounts.clubs}</div>
                    <div className="text-[11px] font-semibold text-indigo-200 uppercase tracking-wider">Advanced & Co-Curricular</div>
                  </div>
                </div>
              </div>

              {/* DEDICATED GLOBAL SEARCH BAR FOR 151 SUBJECTS */}
              <div
                id="global-151-subject-search-bar"
                className="rounded-2xl border-2 border-indigo-200 bg-white p-4 sm:p-5 shadow-xs space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-indigo-600" />
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Global 151-Subject Search Filter
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Filter the 151 subject catalogue instantaneously by subject name, code, or associated curriculum keywords.
                    </p>
                  </div>

                  {/* Search Input */}
                  <div className="relative flex-1 max-w-lg">
                    <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      id="global-151-subject-search-input"
                      value={subjectSearchQuery}
                      onChange={(e) => setSubjectSearchQuery(e.target.value)}
                      placeholder="Search 151 subjects by name, code, or keyword (e.g. pri_math, biology, fractions, cell, accounting, waec, jamb, woodwork, robotics)..."
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/70 pl-10 pr-9 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none shadow-inner font-medium"
                    />
                    {subjectSearchQuery && (
                      <button
                        type="button"
                        id="btn-clear-151-search"
                        onClick={() => setSubjectSearchQuery("")}
                        className="absolute right-3 top-2.5 p-0.5 text-slate-400 hover:text-slate-700 transition rounded-full hover:bg-slate-200 cursor-pointer"
                        title="Clear subject search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Stage Filter Buttons */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-600 flex items-center gap-1 mr-1">
                    <Filter className="h-3 w-3 text-indigo-600" /> Stage:
                  </span>

                  <button
                    type="button"
                    id="stage-filter-all"
                    onClick={() => setSubjectStageFilter("all")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      subjectStageFilter === "all"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <span>All Stages</span>
                    <span className="ml-1.5 text-[10px] opacity-80">({stageCounts.all})</span>
                  </button>

                  <button
                    type="button"
                    id="stage-filter-primary"
                    onClick={() => setSubjectStageFilter("primary")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      subjectStageFilter === "primary"
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
                    }`}
                  >
                    <span>Primary Foundations & Upper Primary</span>
                    <span className="text-[10px] font-black">({stageCounts.primary})</span>
                  </button>

                  <button
                    type="button"
                    id="stage-filter-secondary"
                    onClick={() => setSubjectStageFilter("secondary")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      subjectStageFilter === "secondary"
                        ? "bg-sky-600 text-white shadow-xs"
                        : "bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200"
                    }`}
                  >
                    <span>Junior & Senior Secondary</span>
                    <span className="text-[10px] font-black">({stageCounts.secondary})</span>
                  </button>

                  <button
                    type="button"
                    id="stage-filter-advanced"
                    onClick={() => setSubjectStageFilter("advanced")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      subjectStageFilter === "advanced"
                        ? "bg-purple-600 text-white shadow-xs"
                        : "bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200"
                    }`}
                  >
                    <span>Advanced & Exam Hall</span>
                    <span className="text-[10px] font-black">({stageCounts.advanced})</span>
                  </button>
                </div>

                {/* Popular Keywords Quick Suggestions */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  <span className="text-slate-400 font-semibold shrink-0 pr-1 flex items-center gap-1">
                    <Tag className="h-3 w-3 text-indigo-500" /> Quick Keywords:
                  </span>
                  {[
                    "fractions",
                    "arithmetic",
                    "geometry",
                    "algebra",
                    "organic chemistry",
                    "genetics",
                    "mechanics",
                    "computer science",
                    "accounting",
                    "civics",
                    "economics",
                    "agriculture",
                    "literature",
                    "waec",
                    "jamb",
                    "robotics",
                    "chess"
                  ].map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => setSubjectSearchQuery(kw)}
                      className={`px-2.5 py-0.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition cursor-pointer ${
                        subjectSearchQuery.toLowerCase() === kw.toLowerCase()
                          ? "bg-indigo-600 text-white font-bold"
                          : "bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600"
                      }`}
                    >
                      #{kw}
                    </button>
                  ))}
                </div>

                {/* Search Count Status Bar */}
                <div className="flex items-center justify-between px-1 pt-1 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">
                      Showing {filteredExpandedSubjects.length} of {expandedSubjects.length} Subjects
                    </span>
                    {subjectSearchQuery && (
                      <span className="text-indigo-600 font-semibold">
                        matching "{subjectSearchQuery}"
                      </span>
                    )}
                    {subjectStageFilter !== "all" && (
                      <span className="text-slate-500">
                        in stage: <strong>{subjectStageFilter}</strong>
                      </span>
                    )}
                  </div>

                  {(subjectSearchQuery || subjectStageFilter !== "all") && (
                    <button
                      type="button"
                      onClick={() => {
                        setSubjectSearchQuery("");
                        setSubjectStageFilter("all");
                      }}
                      className="text-indigo-600 hover:underline font-bold cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  )}
                </div>
              </div>

              {/* SUBJECT CARDS GRID */}
              {filteredExpandedSubjects.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-3">
                  <Sparkles className="h-8 w-8 text-indigo-600 mx-auto" />
                  <h3 className="text-base font-bold text-slate-900">
                    No Subjects Found Matching "{subjectSearchQuery}"
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Try searching by a broader subject name (e.g. "Math", "Chemistry", "English"), a subject code prefix (e.g. "pri_math", "sec_bio"), or common keywords like "fractions", "algebra", "waec", "accounting".
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSubjectSearchQuery("");
                        setSubjectStageFilter("all");
                      }}
                      className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition cursor-pointer"
                    >
                      Clear Search & Show All 151 Subjects
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4.5">
                  {filteredExpandedSubjects.map((subj) => {
                    const matchReason = getSearchMatchReason(subj, subjectSearchQuery);
                    const stageConfig =
                      subj.stage === "primary"
                        ? { badge: "bg-emerald-100 text-emerald-900 border-emerald-300", label: "Primary (Grades 1-6)" }
                        : subj.stage === "secondary"
                        ? { badge: "bg-sky-100 text-sky-900 border-sky-300", label: "Secondary (JSS & SSS)" }
                        : subj.stage === "advanced"
                        ? { badge: "bg-purple-100 text-purple-900 border-purple-300", label: "Advanced & Exam Prep" }
                        : { badge: "bg-amber-100 text-amber-900 border-amber-300", label: "Co-Curricular Clubs" };

                    return (
                      <div
                        key={subj.code}
                        id={`151-card-${subj.code}`}
                        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xs hover:shadow-md hover:border-indigo-300 transition flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-3">
                          {/* Card Header Badges */}
                          <div className="flex items-center justify-between gap-1.5 flex-wrap">
                            <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${stageConfig.badge}`}>
                              {stageConfig.label}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyCode(subj.code)}
                              className="inline-flex items-center gap-1 font-mono text-[10px] text-slate-500 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded border border-slate-200 cursor-pointer transition"
                              title="Click to copy subject code"
                            >
                              <Hash className="h-2.5 w-2.5 text-slate-400" />
                              <span>{subj.code}</span>
                              {copiedSubjectCode === subj.code ? (
                                <Check className="h-3 w-3 text-emerald-600" />
                              ) : (
                                <Copy className="h-3 w-3 text-slate-400" />
                              )}
                            </button>
                          </div>

                          {/* Title & Icon */}
                          <div className="flex items-start gap-3">
                            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-700 shrink-0 border border-indigo-100 mt-0.5 shadow-2xs">
                              {getSubjectIcon(subj.iconName)}
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-base font-black text-slate-900 leading-snug">
                                {subj.name}
                              </h3>
                              <p className="text-xs font-bold text-indigo-700">
                                {subj.tagline}
                              </p>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                            {subj.description}
                          </p>

                          {/* Match Reason Tag */}
                          {matchReason && (
                            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-semibold">
                              <span>Matched by {matchReason.type}:</span>
                              <strong className="underline decoration-amber-400 font-bold">{matchReason.detail}</strong>
                            </div>
                          )}

                          {/* Active Educational Levels Tags */}
                          <div className="flex flex-wrap gap-1 pt-1">
                            {subj.activeLevels.map((lvl) => (
                              <span
                                key={lvl}
                                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/80"
                              >
                                {LEVEL_NAMES[lvl] || lvl}
                              </span>
                            ))}
                          </div>

                          {/* Keywords Chips */}
                          {subj.keywords && subj.keywords.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {subj.keywords.map((kw) => {
                                const isKeywordMatch =
                                  subjectSearchQuery &&
                                  kw.toLowerCase().includes(subjectSearchQuery.toLowerCase().trim());
                                return (
                                  <button
                                    key={kw}
                                    type="button"
                                    onClick={() => setSubjectSearchQuery(kw)}
                                    className={`text-[10px] px-2 py-0.5 rounded-md font-medium transition cursor-pointer ${
                                      isKeywordMatch
                                        ? "bg-indigo-100 text-indigo-900 border border-indigo-300 font-bold"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100"
                                    }`}
                                  >
                                    #{kw}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5 flex-wrap">
                          <button
                            type="button"
                            onClick={() =>
                              handleGenerateCustomTopicNote(
                                subj.name,
                                subj.activeLevels[0] || "senior_secondary"
                              )
                            }
                            className="flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-xl border border-indigo-200 transition cursor-pointer"
                            title="Synthesize official 5-phase lesson note"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            <span>Lesson Note</span>
                          </button>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCategoryCode(subj.code);
                                setNavigatorMode("catalog");
                              }}
                              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 transition px-2 py-1 rounded-lg hover:bg-slate-50 cursor-pointer"
                            >
                              Filter Catalog
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setNavigatorMode("units");
                                setSearchQuery(subj.shortTitle || subj.name);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1 transition cursor-pointer shadow-2xs"
                            >
                              <span>Explore Units</span>
                              <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* UNITS & COMPETENCY EXPLORER VIEW (Deep Unit Breakdown) */
            <div className="space-y-6">
          {/* Domain Switcher Ribbon (Extensible Multidisciplinary Architecture) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Multidisciplinary Learning Domains
                </span>
              </div>
              <span className="text-xs text-slate-400">Extensible Global Taxonomy</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {LEARNING_DOMAINS.map((domain) => {
                const isSelected = selectedDomainId === domain.id;
                return (
                  <button
                    key={domain.id}
                    id={`domain-tab-${domain.id}`}
                    type="button"
                    onClick={() => handleDomainChange(domain.id)}
                    className={`flex flex-col items-start p-3 rounded-xl border text-left transition ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/70 shadow-xs ring-1 ring-indigo-500/20"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <div
                        className={`p-1.5 rounded-lg ${
                          isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {getDomainIcon(domain.iconName)}
                      </div>
                      {domain.isFlagship && (
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">
                          Flagship
                        </span>
                      )}
                      {!domain.isFlagship && domain.status === "expanding" && (
                        <span className="text-[10px] font-medium bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded-full">
                          Expanding
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-xs text-slate-900 line-clamp-1">{domain.name}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{domain.subjectsCount} Subjects</div>
                  </button>
                );
              })}
            </div>

            {/* Subject Filter Pills (When domain has multiple subjects) */}
            {domainSubjects.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1">
                <span className="text-xs font-semibold text-slate-500 shrink-0 pr-1">Subject Focus:</span>
                <button
                  type="button"
                  id="subject-pill-all"
                  onClick={() => setSelectedSubjectId("all")}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    selectedSubjectId === "all"
                      ? "bg-slate-900 text-white font-semibold shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  All Subjects ({domainSubjects.length})
                </button>
                {domainSubjects.map((subj) => (
                  <button
                    key={subj.id}
                    id={`subject-pill-${subj.id}`}
                    type="button"
                    onClick={() => setSelectedSubjectId(subj.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition border ${
                      selectedSubjectId === subj.id
                        ? "bg-indigo-50 border-indigo-400 text-indigo-900 font-semibold shadow-xs"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    {subj.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Level & Standard Filter Bar */}
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Level Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {levelOptions.map((lvl) => (
                  <button
                    key={lvl.id}
                    id={`level-filter-${lvl.id}`}
                    type="button"
                    onClick={() => onLevelChange(lvl.id)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                      currentLevel === lvl.id
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* International Curriculum Pathway Tabs */}
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium shrink-0 pr-1">
                <Globe className="h-3.5 w-3.5 text-indigo-600" />
                <span>Curriculum:</span>
              </div>
              {standards.map((std) => {
                const isSelected = selectedStandard === std.id;
                return (
                  <button
                    key={std.id}
                    type="button"
                    onClick={() => setSelectedStandard(std.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition border ${
                      isSelected
                        ? "bg-indigo-50 border-indigo-300 text-indigo-900 font-semibold shadow-xs"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    <span>{std.icon}</span>
                    <span>{std.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Domain Header Description */}
          {activeDomain && (
            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/70 via-white to-slate-50 p-4 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
                    {activeDomain.name}
                  </span>
                  {activeDomain.isFlagship && (
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                      Flagship Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {activeDomain.tagline} — {activeDomain.description}
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500 shrink-0">
                {filteredUnits.length} Units Available
              </span>
            </div>
          )}

          {/* Empty State when no units match */}
          {filteredUnits.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center space-y-3">
              <Sparkles className="h-8 w-8 text-indigo-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">
                No Units Found for Current Level/Standard Filter
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try switching to "All Levels" or Senior Secondary level, or selecting "All Curricula".
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStandard("ALL");
                    setSelectedSubjectId("all");
                    onLevelChange("all");
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition"
                >
                  Reset Filters
                </button>
                {selectedDomainId !== "mathematics" && (
                  <button
                    type="button"
                    onClick={() => handleDomainChange("mathematics")}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition"
                  >
                    View Mathematics Flagship
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Units & Skills Grid */}
          <div className="space-y-6">
            {filteredUnits.map((unit) => (
              <div
                key={unit.id}
                id={`unit-card-${unit.id}`}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-slate-300"
              >
                {/* Unit Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 font-bold font-mono text-xs border border-indigo-100">
                      {unit.code.replace("UNIT-", "U")}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-slate-900">{unit.title}</h3>
                        {unit.isDeepSaturated && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            Deep-Saturated ({unit.estimatedHours}h • Gates A-F Certified)
                          </span>
                        )}
                        {(() => {
                          const unitVideo = videoLearningService.getVideoByUnitId(unit.id);
                          if (!unitVideo) return null;
                          return (
                            <button
                              type="button"
                              onClick={() => {
                                if (unit.skills[0] && onStudyLesson) {
                                  onStudyLesson(unit.skills[0], unit);
                                }
                              }}
                              className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 text-[10px] font-bold flex items-center gap-1 transition cursor-pointer"
                              title={`Watch Video Masterclass (${unitVideo.durationFormatted})`}
                            >
                              <Video className="w-3 h-3 text-sky-600" />
                              <span>Video ({unitVideo.durationFormatted})</span>
                            </button>
                          );
                        })()}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{unit.description}</p>
                    </div>
                  </div>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 uppercase">
                    {unit.category.replace("_", " ")}
                  </span>
                </div>

                {/* Skills in this Unit */}
                <div className="mt-4 grid md:grid-cols-2 gap-3.5">
                  {unit.skills.map((skill) => {
                    const record = (masteryRecords || {})[skill.id];
                    const points = record?.points || 0;
                    const status = record?.status || "unstarted";

                    let statusBadge = (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
                        Unstarted
                      </span>
                    );

                    if (status === "mastered") {
                      statusBadge = (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          <span>Mastered (100 pts)</span>
                        </span>
                      );
                    } else if (status === "proficient") {
                      statusBadge = (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                          <Trophy className="h-3 w-3 text-indigo-600" />
                          <span>Proficient ({points} pts)</span>
                        </span>
                      );
                    } else if (status === "familiar") {
                      statusBadge = (
                        <span className="flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          <span>Familiar ({points} pts)</span>
                        </span>
                      );
                    }

                    return (
                      <div
                        key={skill.id}
                        id={`skill-card-${skill.id}`}
                        className="flex flex-col justify-between rounded-xl border border-slate-100 bg-slate-50/40 p-4 transition hover:border-indigo-300 hover:bg-indigo-50/20"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono text-slate-400 font-semibold">
                              {skill.code}
                            </span>
                            {statusBadge}
                          </div>

                          <h4 className="text-sm font-bold text-slate-900">{skill.title}</h4>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {skill.summary}
                          </p>

                          {/* Learning objectives preview */}
                          <div className="mt-3 space-y-1">
                            {skill.objectives.slice(0, 2).map((obj, oIdx) => (
                              <div key={oIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                                <span className="h-1 w-1 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                <span className="line-clamp-1">{obj}</span>
                              </div>
                            ))}
                          </div>

                          {/* Standard Mappings (Universal Curriculum Layer) */}
                          {(() => {
                            const mappings = curriculumService.getCompetencyMappings(skill.id);
                            if (mappings.length === 0) return null;
                            return (
                              <div className="mt-3 pt-2.5 border-t border-slate-200/50">
                                <div className="flex items-center gap-1 mb-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                  <ShieldCheck className="h-3 w-3 text-indigo-500" />
                                  <span>Verified Curriculum Standards</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {mappings.map((m) => {
                                    const flag =
                                      m.country === "NG" ? "🇳🇬" :
                                      m.country === "UK" || m.country === "GB" ? "🇬🇧" :
                                      m.country === "US" ? "🇺🇸" :
                                      m.country === "INTL" ? "🌍" : "🌐";
                                    return (
                                      <button
                                        key={m.id}
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setInspectedMapping(m);
                                        }}
                                        title={`Click to view verified syllabus details for ${m.curriculumSystem} (${m.standardIdentifier})`}
                                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-[10px] font-medium text-slate-700 hover:text-indigo-900 transition shadow-2xs"
                                      >
                                        <span>{flag}</span>
                                        <span className="font-semibold text-slate-800">{m.curriculumSystem.replace("_", " ")}:</span>
                                        <span className="font-mono text-slate-500 text-[9px]">{m.standardIdentifier}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })()}
                        </div>

                        {/* Action Buttons: Lesson Note, Study Lesson & Enter Practice */}
                        <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-[11px] text-slate-400">
                            {skill.questions.length} Questions
                          </span>
                          <div className="flex items-center gap-1.5 flex-wrap justify-end">
                            <button
                              type="button"
                              id={`btn-lesson-note-${skill.id}`}
                              onClick={() => handleGenerateLessonNote(skill, unit)}
                              className="flex items-center gap-1 text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50/80 hover:bg-indigo-100 transition py-1 px-2.5 rounded-lg border border-indigo-200 shadow-2xs"
                              title="Promptly output the required lesson note for this topic"
                            >
                              <FileText className="h-3.5 w-3.5 text-indigo-600" />
                              <span>Required Lesson Note</span>
                            </button>

                            {onStudyLesson && (
                              <button
                                type="button"
                                onClick={() => onStudyLesson(skill, unit)}
                                className="flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-indigo-700 transition py-1 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-50"
                              >
                                <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
                                <span>Study Lesson</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => onSelectSkill(skill, unit)}
                              className="flex items-center gap-1 text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition py-1 px-2.5 rounded-lg shadow-2xs"
                            >
                              <span>Enter Practice</span>
                              <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
          )}
        </div>
      )}

      {/* Course Readiness Diagnostic Modal */}
      <ReadinessPathwayModal
        pathway={readinessModalPathway}
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

      {/* Inspected Mapping Modal (Non-breaking Verified Syllabus Citations) */}
      {inspectedMapping && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4"
          onClick={() => setInspectedMapping(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-base">
                  {inspectedMapping.country === "NG" ? "🇳🇬" :
                   inspectedMapping.country === "UK" || inspectedMapping.country === "GB" ? "🇬🇧" :
                   inspectedMapping.country === "US" ? "🇺🇸" : "🌍"}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {inspectedMapping.curriculumSystem.replace("_", " ")} Standard Mapping
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Official Code: {inspectedMapping.standardIdentifier}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                {inspectedMapping.verificationStatus.replace("_", " ")}
              </span>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl text-xs text-slate-700 border border-slate-100">
              <div>
                <span className="font-semibold text-slate-900 block mb-0.5">Official Standard Title / Objective:</span>
                <p className="italic text-slate-800">"{inspectedMapping.standardTitle}"</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Grade / Target Level</span>
                  <span className="font-medium text-slate-800">{inspectedMapping.gradeOrYear}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Alignment Confidence</span>
                  <span className="font-medium text-indigo-700">{Math.round(inspectedMapping.verificationMetadata.confidence * 100)}% Exact Match</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Official Source & Citation</span>
                <span className="font-medium text-slate-800">{inspectedMapping.verificationMetadata.sourceTitle} ({inspectedMapping.verificationMetadata.sourceDate || "2024"})</span>
              </div>

              {inspectedMapping.verificationMetadata.notes && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Curriculum Notes</span>
                  <p className="text-slate-600 text-[11px] mt-0.5">{inspectedMapping.verificationMetadata.notes}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setInspectedMapping(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition"
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
