import React, { useState } from "react";
import {
  Sparkles,
  Layers,
  BookOpen,
  Cpu,
  Atom,
  BrainCircuit,
  CheckCircle2,
  Activity,
  Compass,
  HelpCircle,
  RotateCw,
  Globe,
  Target,
  TrendingUp,
  BarChart2,
  GraduationCap,
  ShieldCheck,
  Zap,
  ArrowRight,
  Filter,
  Check,
  ChevronRight,
  FileText,
  Lightbulb,
  AlertTriangle,
  Play,
  RotateCcw
} from "lucide-react";
import { contentSaturationService } from "../services/contentSaturationService";
import { contentQualityEngine } from "../services/contentQualityEngine";
import { AGENT_REGISTRY } from "../services/agentOrchestrationService";
import {
  FlashcardDeck,
  FlashcardCard,
  EducationalVisualization,
  InteractiveActivity,
  RealWorldCaseStudy,
  CareerPathway,
  SupportedLanguage,
  SUPPORTED_LANGUAGES
} from "../types/contentSaturation";
import { PublicationStatus } from "../types/contentGovernance";

interface ContentSaturationExplorerProps {
  onSelectSkillId?: (skillId: string) => void;
}

export const ContentSaturationExplorer: React.FC<ContentSaturationExplorerProps> = ({
  onSelectSkillId
}) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "flashcards" | "visualizations" | "activities" | "projects" | "careers" | "vernacular" | "governance"
  >("overview");
  const [governanceTick, setGovernanceTick] = useState(0);
  const [governanceFeedback, setGovernanceFeedback] = useState<string | null>(null);
  const [govFilter, setGovFilter] = useState<"all" | "isolated" | "published">("all");

  // Content Service Data (re-evaluated when governanceTick changes)
  const report = React.useMemo(() => contentSaturationService.generateContentSaturationReport(), [governanceTick]);
  const flashcardDecks = contentSaturationService.getAllFlashcardDecks();
  const visualizations = contentSaturationService.getAllVisualizations();
  const activities = contentSaturationService.getAllInteractiveActivities();
  const projects = contentSaturationService.getRealWorldProjects();
  const careers = contentSaturationService.getCareerPathways();
  const agentRegistry = Object.values(AGENT_REGISTRY);
  const depth = report.elevenDepthMetrics;
  const govSummary = report.governanceSummary;

  // Flashcards state
  const [selectedDeckId, setSelectedDeckId] = useState<string>(flashcardDecks[0]?.id || "");
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [showCardHint, setShowCardHint] = useState<boolean>(false);

  const activeDeck = flashcardDecks.find((d) => d.id === selectedDeckId) || flashcardDecks[0];
  const activeCard: FlashcardCard | undefined = activeDeck?.cards[currentCardIndex];

  // Visualizations state
  const [selectedVizId, setSelectedVizId] = useState<string>(visualizations[0]?.id || "");
  const activeViz = visualizations.find((v) => v.id === selectedVizId) || visualizations[0];

  // Activities state
  const [selectedActivityId, setSelectedActivityId] = useState<string>(activities[0]?.id || "");
  const activeActivity = activities.find((a) => a.id === selectedActivityId) || activities[0];
  const [activitySelectedStep, setActivitySelectedStep] = useState<number | null>(null);
  const [activityFeedback, setActivityFeedback] = useState<string | null>(null);

  // Vernacular state
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>("yo");
  const [vernacularSkillId, setVernacularSkillId] = useState<string>("skill-math-quad-101");
  const activeVernacular = contentSaturationService.getNigerianLocalization(vernacularSkillId);

  // Handlers for flashcards
  const handleNextCard = () => {
    if (!activeDeck) return;
    setIsCardFlipped(false);
    setShowCardHint(false);
    setCurrentCardIndex((prev) => (prev + 1) % activeDeck.cards.length);
  };

  const handlePrevCard = () => {
    if (!activeDeck) return;
    setIsCardFlipped(false);
    setShowCardHint(false);
    setCurrentCardIndex((prev) => (prev - 1 + activeDeck.cards.length) % activeDeck.cards.length);
  };

  return (
    <div id="content-saturation-explorer" className="space-y-6 max-w-6xl mx-auto">
      {/* 1. Master Saturation Header */}
      <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
                Governed Content Saturation Engine
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                {report.statusTier}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Internal Content Governance & Empirical Saturation Studio
            </h1>
            <p className="text-sm text-indigo-200/80 max-w-2xl leading-relaxed">
              Live audit across {report.totalCurriculumUnits} authored units ({report.totalSkills} skills, {report.totalQuestions} questions) against {depth?.catalogSubjectsCount || 300} catalog subjects, enforced by the ≥ {govSummary?.approvalThreshold || 85}% Weighted QA Gate & learner production isolation.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xs shrink-0">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                {govSummary?.averageApprovedQualityScore ?? report.overallIndex}%
              </div>
              <div className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider mt-0.5">
                Mean Approved QA Score
              </div>
              <div className="text-[10px] text-emerald-300/80 mt-1">
                32-Dim Index: {report.overallIndex}% ({govSummary?.approvedCount ?? 0}/{govSummary?.totalAuditedCount ?? report.totalCurriculumUnits} Published)
              </div>
            </div>
          </div>
        </div>

        {/* Quick Numbers Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <div className="text-lg font-extrabold text-white">{depth?.catalogSubjectsCount ?? 300}</div>
            <div className="text-[10px] text-indigo-200 uppercase tracking-wider">Catalog Subjects</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <div className="text-lg font-extrabold text-emerald-300">{govSummary?.approvedCount ?? 0}</div>
            <div className="text-[10px] text-indigo-200 uppercase tracking-wider">Published Units</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <div className="text-lg font-extrabold text-amber-300">{govSummary?.isolatedCount ?? 0}</div>
            <div className="text-[10px] text-indigo-200 uppercase tracking-wider">Isolated Units</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <div className="text-lg font-extrabold text-white">{report.totalSkills}</div>
            <div className="text-[10px] text-indigo-200 uppercase tracking-wider">Authored Skills</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <div className="text-lg font-extrabold text-indigo-300">{report.totalQuestions}</div>
            <div className="text-[10px] text-indigo-200 uppercase tracking-wider">Verified Items</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <div className="text-lg font-extrabold text-sky-300">{depth?.totalSvgVisualizations ?? 0}</div>
            <div className="text-[10px] text-indigo-200 uppercase tracking-wider">Vector SVGs</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 col-span-2 sm:col-span-1">
            <div className="text-lg font-extrabold text-emerald-300">{depth?.skillsWithMinFiveQuestionsCount ?? 0}</div>
            <div className="text-[10px] text-indigo-200 uppercase tracking-wider">Skills ≥ 5 Qs</div>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
            activeTab === "overview"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <BarChart2 className="h-3.5 w-3.5" />
          <span>32-Dim Metrics</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("flashcards")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
            activeTab === "flashcards"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>Active Recall Flashcards ({report.totalFlashcards})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("visualizations")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
            activeTab === "visualizations"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Activity className="h-3.5 w-3.5" />
          <span>Visualizations & Curves ({visualizations.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("activities")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
            activeTab === "activities"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <BrainCircuit className="h-3.5 w-3.5" />
          <span>Interactive Tasks ({activities.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("projects")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
            activeTab === "projects"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Target className="h-3.5 w-3.5" />
          <span>Real-World Projects ({projects.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("careers")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
            activeTab === "careers"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <GraduationCap className="h-3.5 w-3.5" />
          <span>Career Pathways ({careers.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("vernacular")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
            activeTab === "vernacular"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Globe className="h-3.5 w-3.5" />
          <span>Vernacular Intuition</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("governance")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
            activeTab === "governance"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>23-Specialist Audit</span>
        </button>
      </div>

      {/* TAB 1: 11 DEPTH METRICS, 300-SUBJECT COVERAGE & 32-DIM AUDIT */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* 11 Genuine Educational Depth Metrics */}
          {depth && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>11 Empirical Educational Depth Metrics (No Synthetic Multipliers)</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-500">
                  Anti-Fake Penalties Applied: {report.auditProvenance.antiFakePenaltiesApplied}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  { label: "300-Subject Catalog", value: depth.catalogSubjectsCount },
                  { label: "Subjects w/ Published Units", value: depth.subjectsWithPublishedUnitsCount },
                  { label: "Subjects Roadmap / Isolated", value: depth.subjectsWithIsolatedOrNoUnitsCount },
                  { label: "Authored Units", value: depth.authoredUnitsCount },
                  { label: "Published & QA Approved", value: depth.approvedPublishedUnitsCount },
                  { label: "Isolated From Learners", value: depth.isolatedUnitsCount },
                  { label: "Authored Micro-Skills", value: depth.skillsCount },
                  { label: "Skills w/ ≥ 5 Questions", value: depth.skillsWithMinFiveQuestionsCount },
                  { label: "Verified Practice Questions", value: depth.totalVerifiedQuestions },
                  { label: "Worked Derivations", value: depth.totalWorkedExamples },
                  { label: "Vector SVG Diagrams", value: depth.totalSvgVisualizations }
                ].map((item) => (
                  <div key={item.label} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70">
                    <div className="text-xl font-black text-slate-900">{item.value}</div>
                    <div className="text-[11px] font-semibold text-slate-600 mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 300-Subject Catalog Stage Coverage Breakdown */}
          {report.catalogCoverage && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Compass className="h-4 w-4 text-indigo-600" />
                  <span>Expanded 300-Subject Catalog Coverage vs Planned Roadmap</span>
                </h3>
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                  {report.catalogCoverage.coveredCatalogSubjects}/{report.catalogCoverage.totalCatalogSubjects} Covered · {report.catalogCoverage.roadmapOnlySubjects} Roadmap
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {report.catalogCoverage.stageBreakdown.map((st) => (
                  <div key={st.stage} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                    <div className="text-xs font-bold text-slate-900">{st.stage}</div>
                    <div className="text-xs text-slate-600">
                      Catalog Subjects: <strong>{st.catalogCount}</strong>
                    </div>
                    <div className="text-[11px] text-emerald-700 font-semibold">
                      {st.authoredSubjectsCount} covered ({st.publishedUnitsCount} published units)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(report.metrics).map(([key, value]) => {
              const formattedKey = key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase());

              return (
                <div
                  key={key}
                  className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-2xs hover:border-indigo-300 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{formattedKey}</span>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                        value >= 85
                          ? "bg-emerald-100 text-emerald-800"
                          : value >= 70
                          ? "bg-indigo-100 text-indigo-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {value}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mt-2.5 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        value >= 85 ? "bg-emerald-500" : value >= 70 ? "bg-indigo-600" : "bg-amber-500"
                      }`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Domain Breakdown */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-600" />
              <span>Discipline Saturation Breakdown</span>
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {Object.entries(report.domainScores).map(([domain, data]) => (
                <div key={domain} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-1">
                  <div className="text-xs font-bold text-slate-900 truncate">{domain}</div>
                  <div className="text-xl font-extrabold text-indigo-700">{data.score}%</div>
                  <div className="text-[11px] text-slate-500">{data.unitsCount} Verified Units</div>
                  <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                    {data.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ACTIVE RECALL FLASHCARDS ARENA */}
      {activeTab === "flashcards" && (
        <div className="space-y-6">
          {/* Deck Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1 shrink-0">
              <Filter className="h-3.5 w-3.5 text-indigo-500" /> Deck:
            </span>
            {flashcardDecks.map((deck) => (
              <button
                key={deck.id}
                type="button"
                onClick={() => {
                  setSelectedDeckId(deck.id);
                  setCurrentCardIndex(0);
                  setIsCardFlipped(false);
                  setShowCardHint(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                  selectedDeckId === deck.id
                    ? "bg-indigo-600 border-indigo-700 text-white shadow-2xs"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{deck.title}</span>
                <span className="ml-1.5 opacity-80 text-[10px]">({deck.cards.length})</span>
              </button>
            ))}
          </div>

          {activeCard && (
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Card Container with Flip Animation */}
              <div
                id="interactive-flashcard"
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                className={`min-h-[300px] rounded-3xl p-8 border-2 cursor-pointer transition-all duration-300 shadow-md flex flex-col justify-between ${
                  isCardFlipped
                    ? "border-emerald-300 bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/20"
                    : "border-indigo-200 bg-white hover:border-indigo-400"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                        activeCard.category === "formula"
                          ? "bg-purple-100 text-purple-800"
                          : activeCard.category === "exam_trap"
                          ? "bg-rose-100 text-rose-800"
                          : activeCard.category === "misconception"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-indigo-100 text-indigo-800"
                      }`}
                    >
                      {activeCard.category.replace("_", " ")}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-400">
                      Card {currentCardIndex + 1} of {activeDeck.cards.length}
                    </span>
                  </div>

                  <div className="pt-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {isCardFlipped ? "Answer / Conceptual Explanation" : "Front Prompt"}
                    </div>
                    <div className="text-lg font-bold text-slate-900 leading-relaxed">
                      {isCardFlipped ? activeCard.back : activeCard.front}
                    </div>

                    {activeCard.formulaLatex && !isCardFlipped && (
                      <div className="mt-4 p-3 bg-slate-50 rounded-xl font-mono text-sm text-indigo-900 border border-slate-200 inline-block">
                        {activeCard.formulaLatex}
                      </div>
                    )}

                    {isCardFlipped && activeCard.commonTrapNote && (
                      <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>Common Exam Trap:</strong> {activeCard.commonTrapNote}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-indigo-600 font-semibold">
                    <RotateCw className="h-3.5 w-3.5" /> Click anywhere to flip
                  </span>
                  {activeCard.hint && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCardHint(!showCardHint);
                      }}
                      className="text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1"
                    >
                      <Lightbulb className="h-3.5 w-3.5" />
                      {showCardHint ? "Hide Hint" : "Need Hint?"}
                    </button>
                  )}
                </div>
              </div>

              {/* Hint Drawer */}
              {showCardHint && activeCard.hint && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 animate-in fade-in duration-200">
                  <span className="font-bold">Scaffolding Hint:</span> {activeCard.hint}
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handlePrevCard}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition"
                >
                  Previous Card
                </button>
                <div className="text-xs font-semibold text-slate-500">
                  Progress: {Math.round(((currentCardIndex + 1) / activeDeck.cards.length) * 100)}%
                </div>
                <button
                  type="button"
                  onClick={handleNextCard}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white transition shadow-2xs"
                >
                  Next Card
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: VISUALIZATIONS & CURVES */}
      {activeTab === "visualizations" && (
        <div className="space-y-6">
          {/* Viz Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1 shrink-0">
              <Filter className="h-3.5 w-3.5 text-indigo-500" /> Model:
            </span>
            {visualizations.map((viz) => (
              <button
                key={viz.id}
                type="button"
                onClick={() => setSelectedVizId(viz.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                  selectedVizId === viz.id
                    ? "bg-indigo-600 border-indigo-700 text-white shadow-2xs"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {viz.title}
              </button>
            ))}
          </div>

          {activeViz && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                    {activeViz.type.replace("_", " ")}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 font-mono">
                    Skill: {activeViz.skillId}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{activeViz.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  {activeViz.caption}
                </p>
              </div>

              {/* Embedded Vector SVG Diagram */}
              {activeViz.diagramSvgSnippet && (
                <div className="p-4 rounded-2xl border border-indigo-200/80 bg-white space-y-2">
                  <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Verified Vector SVG Pedagogical Diagram
                  </div>
                  <div
                    className="w-full overflow-x-auto flex justify-center rounded-xl bg-slate-50 p-3 border border-slate-200"
                    dangerouslySetInnerHTML={{ __html: activeViz.diagramSvgSnippet }}
                  />
                </div>
              )}

              {/* Data Points Visual Grid */}
              {activeViz.dataPoints && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Quantitative Model Coordinates
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {activeViz.dataPoints.map((dp, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border bg-white ${
                          dp.highlight ? "border-indigo-400 ring-2 ring-indigo-100" : "border-slate-200"
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-800">{dp.label}</div>
                        {dp.x !== undefined && dp.y !== undefined ? (
                          <div className="text-sm font-mono font-extrabold text-indigo-600 mt-1">
                            ({dp.x}, {dp.y})
                          </div>
                        ) : dp.value !== undefined ? (
                          <div className="text-sm font-mono font-extrabold text-indigo-600 mt-1">
                            {dp.value}%
                          </div>
                        ) : null}
                        {dp.description && (
                          <div className="text-[11px] text-slate-500 mt-1">{dp.description}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Steps or Curves */}
              {activeViz.steps && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Process Sequence
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {activeViz.steps.map((st, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white flex gap-3">
                        <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center justify-center shrink-0">
                          {st.step || st.stepNumber || idx + 1}
                        </div>
                        <div className="space-y-0.5">
                          <div className="text-xs font-bold text-slate-900">{st.title}</div>
                          <div className="text-xs text-slate-600 leading-snug">{st.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pedagogical Takeaway */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950 flex items-start gap-3">
                <Sparkles className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Pedagogical Synthesis:</span>{" "}
                  {activeViz.pedagogicalTakeaway || activeViz.takeaway}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: INTERACTIVE ACTIVITIES (ERROR DETECTOR, STEP SEQUENCER) */}
      {activeTab === "activities" && (
        <div className="space-y-6">
          {/* Activity Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1 shrink-0">
              <Filter className="h-3.5 w-3.5 text-indigo-500" /> Challenge:
            </span>
            {activities.map((act) => (
              <button
                key={act.id}
                type="button"
                onClick={() => {
                  setSelectedActivityId(act.id);
                  setActivitySelectedStep(null);
                  setActivityFeedback(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                  selectedActivityId === act.id
                    ? "bg-indigo-600 border-indigo-700 text-white shadow-2xs"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {act.title}
              </button>
            ))}
          </div>

          {activeActivity && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                    {activeActivity.type.replace("_", " ")}
                  </span>
                  <span className="text-xs text-slate-500">
                    +{activeActivity.pointsReward || 30} Mastery Points
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{activeActivity.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeActivity.instructions}
                </p>
              </div>

              {activeActivity.problemOrContext && (
                <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs sm:text-sm">
                  {activeActivity.problemOrContext}
                </div>
              )}

              {/* Step Sequencer / Error Detector Interaction */}
              {activeActivity.steps && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {activeActivity.type === "error_detector"
                      ? "Identify the Step with the Mathematical / Conceptual Fallacy:"
                      : "Investigation Steps:"}
                  </div>
                  <div className="space-y-2">
                    {activeActivity.steps.map((st, idx) => {
                      const isSelected = activitySelectedStep === idx;
                      const isTargetError = idx === activeActivity.errorStepIndex;

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setActivitySelectedStep(idx);
                            if (activeActivity.errorStepIndex !== undefined) {
                              if (idx === activeActivity.errorStepIndex) {
                                setActivityFeedback("✅ Brilliant catch! That step contains the exact mathematical flaw.");
                              } else {
                                setActivityFeedback("❌ That step is logically sound. Inspect the algebra and signs closely.");
                              }
                            }
                          }}
                          className={`w-full text-left p-4 rounded-2xl border transition flex items-start gap-3 ${
                            isSelected
                              ? isTargetError
                                ? "border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-200"
                                : "border-rose-300 bg-rose-50/60"
                              : "border-slate-200 hover:border-indigo-300 bg-white"
                          }`}
                        >
                          <span className="h-6 w-6 rounded-full bg-slate-100 text-slate-800 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                            {st.text || st.stepText}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {activityFeedback && (
                <div
                  className={`p-4 rounded-2xl text-xs font-semibold ${
                    activityFeedback.includes("✅")
                      ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                      : "bg-rose-50 text-rose-900 border border-rose-200"
                  }`}
                >
                  {activityFeedback}
                  {activeActivity.explanation && activityFeedback.includes("✅") && (
                    <div className="mt-2 text-[11px] font-normal text-slate-700">
                      <strong>Rigorous Explanation:</strong> {activeActivity.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: REAL-WORLD PROJECTS */}
      {activeTab === "projects" && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-5">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded">
                    {proj.industryContext}
                  </span>
                  <h4 className="text-base font-bold text-slate-900">{proj.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {proj.problemDescription}
                  </p>

                  <div className="pt-2 space-y-1">
                    <span className="text-[11px] font-bold text-slate-700">Applied Models:</span>
                    <div className="flex flex-wrap gap-1">
                      {proj.mathematicalOrScientificModels.map((m, mIdx) => (
                        <span key={mIdx} className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] font-semibold text-slate-500">
                    {proj.studentDeliverables.length} Deliverable Artifacts
                  </div>
                  <button
                    type="button"
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <span>View Project Brief & Rubric</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: CAREER PATHWAYS */}
      {activeTab === "careers" && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {careers.map((career) => (
              <div
                key={career.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded">
                      {career.domain}
                    </span>
                    <span className="text-[11px] font-bold text-slate-700">
                      {career.salaryBandOrDemand}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">{career.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {career.summary}
                  </p>

                  <div className="pt-2 space-y-1">
                    <span className="text-[11px] font-bold text-slate-700">Key Competencies:</span>
                    <div className="flex flex-wrap gap-1">
                      {career.keySkills.map((sk, sIdx) => (
                        <span key={sIdx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                  <div className="text-slate-500">
                    <strong className="text-slate-800">Target Programs:</strong>{" "}
                    {career.targetTertiaryPrograms.join(", ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: VERNACULAR INTUITION (YORUBA, IGBO, HAUSA, PIDGIN) */}
      {activeTab === "vernacular" && (
        <div className="space-y-6">
          {/* Language Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1 shrink-0">
              <Globe className="h-3.5 w-3.5 text-indigo-500" /> Language:
            </span>
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

          {/* Vernacular Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-900 px-2 py-0.5 rounded">
                Cultural & Vernacular Intuition Scaffolding
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Quadratic Equations & Roots (Ìṣiro Àwọn Àkójọ Quadratic)
              </h3>
              <p className="text-xs text-slate-600">
                Overcoming abstract mathematical anxiety by rooting algebraic mechanics in everyday domestic analogies.
              </p>
            </div>

            {activeVernacular && (
              <div className="space-y-4">
                {selectedLanguage === "yo" && activeVernacular.yoruba && (
                  <div className="space-y-3 p-5 rounded-2xl bg-amber-50/60 border border-amber-200 text-amber-950">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
                      Èdè Yorùbá — Ìtúmọ̀ àti Ẹ̀kọ́ Ìjìnlẹ̀
                    </div>
                    <p className="text-sm leading-relaxed">{activeVernacular.yoruba.intuitionHook}</p>
                    <div className="pt-2 border-t border-amber-200/60 text-xs">
                      <strong>Àṣìṣe Tí Àwọn Akẹ́kọ̀ọ́ Máa Ń Ṣe:</strong>{" "}
                      {activeVernacular.yoruba.commonPitfallSummary}
                    </div>
                  </div>
                )}

                {selectedLanguage === "ig" && activeVernacular.igbo && (
                  <div className="space-y-3 p-5 rounded-2xl bg-sky-50/60 border border-sky-200 text-sky-950">
                    <div className="text-xs font-bold uppercase tracking-wider text-sky-800">
                      Asụsụ Igbo — Nghọta na Nkọwa
                    </div>
                    <p className="text-sm leading-relaxed">{activeVernacular.igbo.intuitionHook}</p>
                    <div className="pt-2 border-t border-sky-200/60 text-xs">
                      <strong>Mmejọ A Na-enwekarị:</strong>{" "}
                      {activeVernacular.igbo.commonPitfallSummary}
                    </div>
                  </div>
                )}

                {selectedLanguage === "ha" && activeVernacular.hausa && (
                  <div className="space-y-3 p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-emerald-950">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Harshen Hausa — Fahimta da Bayani
                    </div>
                    <p className="text-sm leading-relaxed">{activeVernacular.hausa.intuitionHook}</p>
                    <div className="pt-2 border-t border-emerald-200/60 text-xs">
                      <strong>Kuskuren da Aka Saba Yi:</strong>{" "}
                      {activeVernacular.hausa.commonPitfallSummary}
                    </div>
                  </div>
                )}

                {selectedLanguage === "en" && (
                  <div className="space-y-3 p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200 text-indigo-950">
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-800">
                      Pidgin English & Local Intuition
                    </div>
                    <p className="text-sm leading-relaxed">
                      {activeVernacular.pidgin?.intuitionHook || "Quadratic formula na like universal spanner wey go unlock any ax² + bx + c = 0 quadratic equation."}
                    </p>
                    <div className="pt-2 border-t border-indigo-200/60 text-xs">
                      <strong>Common Pitfall:</strong>{" "}
                      {activeVernacular.pidgin?.commonPitfallSummary || "Make you remember say when minus sign meet minus number for -b, e go turn positive plus!"}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 8: WEIGHTED QA, ISOLATION, VERSION ROLLBACK & 23-SPECIALIST AUDIT */}
      {activeTab === "governance" && (
        <div className="space-y-6">
          {/* Weighted QA Audit & Rollback Console */}
          {govSummary && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Weighted QA Gate (≥ {govSummary.approvalThreshold}% Threshold) & Production Isolation
                  </h3>
                  <p className="text-xs text-slate-500">
                    Modules failing mathematical/answer checks, containing scratchpad leaks, or scoring below {govSummary.approvalThreshold}% are isolated from learners.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {(["all", "isolated", "published"] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setGovFilter(f)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                        govFilter === f
                          ? "bg-indigo-600 text-white border-indigo-700"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {f === "all"
                        ? `All (${govSummary.totalAuditedCount})`
                        : f === "isolated"
                        ? `Isolated (${govSummary.isolatedCount})`
                        : `Published (${govSummary.approvedCount})`}
                    </button>
                  ))}
                </div>
              </div>

              {governanceFeedback && (
                <div className="p-3 rounded-xl border border-indigo-200 bg-indigo-50 text-xs font-semibold text-indigo-900">
                  {governanceFeedback}
                </div>
              )}

              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                {govSummary.records
                  .filter((rec) =>
                    govFilter === "isolated"
                      ? !rec.approvedForLearnerProduction
                      : govFilter === "published"
                      ? rec.approvedForLearnerProduction
                      : true
                  )
                  .slice(0, 35)
                  .map((rec) => (
                    <div
                      key={rec.unitId}
                      className={`p-4 rounded-xl border space-y-2 ${
                        rec.approvedForLearnerProduction
                          ? "border-slate-200 bg-slate-50/50"
                          : "border-rose-200 bg-rose-50/40"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            {rec.title} <span className="font-mono text-slate-400">({rec.unitId})</span>
                          </div>
                          <div className="text-[11px] text-slate-500">
                            v{rec.version} · {rec.subject} · {rec.assessmentCoverage.skillsCount} skills · {rec.assessmentCoverage.totalQuestions} Qs · {rec.curriculumScope}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                              rec.qualityScore >= govSummary.approvalThreshold && rec.disqualifiers.length === 0
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            QA {rec.qualityScore}%
                          </span>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                            {rec.publicationStatus}
                          </span>
                        </div>
                      </div>

                      {rec.disqualifiers.length > 0 && (
                        <div className="p-2.5 rounded-lg bg-rose-100/70 border border-rose-200 text-[11px] text-rose-900 space-y-1">
                          <div className="font-bold flex items-center gap-1">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            Automatic Disqualifiers ({rec.disqualifiers.length}):
                          </div>
                          {rec.disqualifiers.slice(0, 3).map((dq, idx) => (
                            <div key={idx} className="font-mono text-[10px]">
                              [{dq.code}] {dq.message}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
                        <span className="text-slate-500">
                          Revisions recorded: {rec.revisionHistory.length}
                        </span>
                        <div className="flex items-center gap-2">
                          {(["flagged", "published"] as PublicationStatus[]).map((target) => (
                            <button
                              key={target}
                              type="button"
                              onClick={() => {
                                const res = contentQualityEngine.transitionPublicationStatus(
                                  rec.unitId,
                                  target,
                                  "internal-admin",
                                  `Manual governance trigger to ${target}`
                                );
                                setGovernanceFeedback(res.message);
                                setGovernanceTick((t) => t + 1);
                              }}
                              className="px-2.5 py-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-semibold transition"
                            >
                              Set {target}
                            </button>
                          ))}
                          {rec.revisionHistory.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const prev = rec.revisionHistory[rec.revisionHistory.length - 2];
                                const res = contentQualityEngine.rollbackToVersion(rec.unitId, prev.version, "internal-admin");
                                setGovernanceFeedback(res.message);
                                setGovernanceTick((t) => t + 1);
                              }}
                              className="px-2.5 py-1 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold transition flex items-center gap-1"
                            >
                              <RotateCcw className="h-3 w-3" />
                              Rollback v{rec.revisionHistory[rec.revisionHistory.length - 2].version}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  23 Specialized Agent Registry & Deterministic Tool Boundaries
                </h3>
                <p className="text-xs text-slate-500">
                  All agents operate under strict schema validation, pedagogical guidelines, and immutable audit logs.
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                23/23 Online & Governed
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {agentRegistry.map((agent) => (
                <div
                  key={agent.role}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {agent.displayName}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      {agent.permissionLevel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-snug">
                    {agent.pedagogicalPurpose}
                  </p>
                  <div className="pt-1 text-[10px] text-slate-400 font-mono">
                    Tools: {agent.allowedToolIds.slice(0, 2).join(", ")}
                    {agent.allowedToolIds.length > 2 && "..."}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
