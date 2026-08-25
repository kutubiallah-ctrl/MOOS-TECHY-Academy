import React, { useState, useEffect } from "react";
import {
  QrCode,
  BookOpen,
  Sparkles,
  Play,
  Brain,
  CheckCircle2,
  AlertCircle,
  Search,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Copy,
  Check,
  RotateCcw,
  ArrowRight,
  Layers,
  FileText,
  Bookmark,
  Library,
  Atom,
  Binary,
  DollarSign,
  GraduationCap
} from "lucide-react";
import { QRResourceRecord, QRResolutionResult, QRBook } from "../types/qrResource";
import { qrResourceService } from "../services/qrResourceService";
import { REGISTERED_QR_RESOURCES, REGISTERED_QR_BOOKS } from "../data/qrResourceData";
import { Skill, Unit } from "../types/curriculum";
import { curriculumService } from "../services/curriculumService";

interface QRCompanionHubProps {
  initialResourceCode?: string;
  onLaunchPractice: (skill: Skill, unit: Unit) => void;
  onLaunchPlayActivity: (activityId: string) => void;
  onOpenAITutorWithContext: (questionText: string, contextPrompt: string) => void;
  onBackToDashboard: () => void;
}

export const QRCompanionHub: React.FC<QRCompanionHubProps> = ({
  initialResourceCode,
  onLaunchPractice,
  onLaunchPlayActivity,
  onOpenAITutorWithContext,
  onBackToDashboard
}) => {
  const [viewMode, setViewMode] = useState<"companion_reader" | "books_catalogue">("companion_reader");
  const [inputCode, setInputCode] = useState(initialResourceCode || "CEMM-CH3-SEC2-EX4");
  const [activeResource, setActiveResource] = useState<QRResourceRecord>(() => {
    const res = qrResourceService.resolveResource(initialResourceCode || "CEMM-CH3-SEC2-EX4");
    return res.resource || REGISTERED_QR_RESOURCES[0];
  });
  const [selectedBook, setSelectedBook] = useState<QRBook>(() => {
    return REGISTERED_QR_BOOKS[0];
  });
  const [expandedChapter, setExpandedChapter] = useState<number | null>(3);
  const [resolutionError, setResolutionError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<"walkthrough" | "formulas" | "misconceptions">("walkthrough");

  // Check URL query parameters for ?qr=CODE on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qrParam = params.get("qr");
    if (qrParam) {
      const res = qrResourceService.resolveResource(qrParam);
      if (res.isValid && res.resource) {
        setActiveResource(res.resource);
        setInputCode(res.resource.resourceCode);
        const parentBook = qrResourceService.getBookByCode(res.resource.bookCode);
        if (parentBook) {
          setSelectedBook(parentBook);
          setExpandedChapter(res.resource.chapterNumber);
        }
      }
    }
  }, []);

  const handleResolve = (codeToResolve: string) => {
    setResolutionError(null);
    const result: QRResolutionResult = qrResourceService.resolveResource(codeToResolve);
    if (result.isValid && result.resource) {
      setActiveResource(result.resource);
      setInputCode(result.resource.resourceCode);
      const parentBook = qrResourceService.getBookByCode(result.resource.bookCode);
      if (parentBook) {
        setSelectedBook(parentBook);
        setExpandedChapter(result.resource.chapterNumber);
      }
      setViewMode("companion_reader");
    } else {
      setResolutionError(result.error || "Resource not found.");
    }
  };

  const handleSelectBook = (book: QRBook) => {
    setSelectedBook(book);
    const firstChapter = book.chapters[0]?.chapterNumber || null;
    setExpandedChapter(firstChapter);

    // If book has resources, switch to the first one
    const bookResources = qrResourceService.getResourcesByBook(book.code);
    if (bookResources.length > 0) {
      setActiveResource(bookResources[0]);
      setInputCode(bookResources[0].resourceCode);
    }
  };

  const handleSelectSectionResource = (resourceCode?: string) => {
    if (resourceCode) {
      handleResolve(resourceCode);
    }
  };

  const handleCopyLink = () => {
    const url = qrResourceService.generateWebUrl(activeResource.resourceCode);
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleLaunchPracticeArena = () => {
    const unit = curriculumService.getUnitById(activeResource.targetUnitId);
    const skill = curriculumService.getSkillById(activeResource.targetSkillId);
    if (skill && unit) {
      onLaunchPractice(skill, unit);
    }
  };

  return (
    <div id="qr-companion-hub" className="space-y-6">
      {/* Hero Header: Physical Book to Digital Academy Connection */}
      <div className="rounded-3xl border border-indigo-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                <QrCode className="h-3.5 w-3.5" />
                MOOS TECHY QR Textbook Ecosystem
              </span>
              <span className="text-xs text-slate-300 font-medium">
                • Multi-Volume STEM & Humanities Catalog
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Physical Textbook Companion & Worked Solutions
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Scan or enter any chapter QR code from official MOOS TECHY publications to access interactive derivations, digital models, and step-by-step Socratic assistance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-800/90 rounded-xl p-1 border border-slate-700">
              <button
                type="button"
                onClick={() => setViewMode("companion_reader")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  viewMode === "companion_reader"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Digital Reader
              </button>
              <button
                type="button"
                onClick={() => setViewMode("books_catalogue")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  viewMode === "books_catalogue"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Textbook Catalog ({REGISTERED_QR_BOOKS.length})
              </button>
            </div>

            <button
              id="qr-hub-back-btn"
              type="button"
              onClick={onBackToDashboard}
              className="rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700 transition cursor-pointer"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Resolver & Search Bar */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-auto flex-1">
            <label htmlFor="qr-code-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Enter or Scan Textbook QR Code Identifier:
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <QrCode className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="qr-code-input"
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleResolve(inputCode)}
                  placeholder="e.g. CEMM-CH3-SEC2-EX4, CEMM-PHY-CH2-SEC1-VEC, or CEMM-Q32"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                id="resolve-qr-btn"
                type="button"
                onClick={() => handleResolve(inputCode)}
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition shrink-0 cursor-pointer"
              >
                Resolve Companion
              </button>
            </div>
            {resolutionError && (
              <p className="mt-2 text-xs font-medium text-rose-600 flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{resolutionError}</span>
              </p>
            )}
          </div>

          {/* Quick Textbook Chapter Switcher Chips */}
          <div className="w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4 space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Quick Multidisciplinary Seeds:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {REGISTERED_QR_RESOURCES.slice(0, 5).map((r) => (
                <button
                  key={r.resourceCode}
                  type="button"
                  onClick={() => {
                    setInputCode(r.resourceCode);
                    handleResolve(r.resourceCode);
                  }}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition border cursor-pointer ${
                    activeResource.resourceCode === r.resourceCode
                      ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {r.bookCode.split("-")[1] || "MTH"} Ch{r.chapterNumber}: {r.sectionTitle.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: BOOKS CATALOGUE */}
      {viewMode === "books_catalogue" ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Library className="h-5 w-5 text-indigo-600" />
              Registered MOOS TECHY Textbook Volumes
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              National STEM & Senior Secondary Curriculum Standards
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGISTERED_QR_BOOKS.map((book) => {
              const isSelected = selectedBook.code === book.code;
              return (
                <div
                  key={book.code}
                  className={`rounded-3xl border p-6 flex flex-col justify-between gap-4 transition cursor-pointer ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50/30 ring-2 ring-indigo-600/20 shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-300 shadow-xs"
                  }`}
                  onClick={() => handleSelectBook(book)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-100/80 px-2.5 py-0.5 rounded-md">
                        {book.code}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {book.edition}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                        {book.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">{book.author}</p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {book.description}
                    </p>

                    <div className="rounded-xl bg-slate-50 p-3 text-xs space-y-1 border border-slate-100">
                      <div className="flex justify-between text-slate-600">
                        <span>Chapters:</span>
                        <span className="font-bold text-slate-900">{book.totalChapters}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Standard:</span>
                        <span className="font-bold text-slate-900">{book.curriculumStandard}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600">
                      {book.chapters.length} Chapters Available
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectBook(book);
                        setViewMode("companion_reader");
                      }}
                      className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition cursor-pointer"
                    >
                      Open Companion
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: ACTIVE RESOURCE COMPANION LANDING EXPERIENCE */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Physical Textbook Origin & Academic Links (1 col) */}
          <div className="space-y-6">
            {/* Textbook Metadata Card */}
            <div className="rounded-3xl border border-indigo-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                    Physical Publication
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    {activeResource.bookTitle}
                  </h3>
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-medium">Chapter {activeResource.chapterNumber}:</span>
                  <span className="font-bold text-slate-900">{activeResource.chapterTitle}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-medium">Section {activeResource.sectionNumber}:</span>
                  <span className="font-bold text-slate-900">{activeResource.sectionTitle}</span>
                </div>
                {activeResource.exerciseNumber && (
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="font-medium">Exercise:</span>
                    <span className="font-bold text-indigo-700">{activeResource.exerciseNumber}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-medium">Page Reference:</span>
                  <span className="font-semibold text-slate-700">{activeResource.pageReference}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-medium">Resource Code:</span>
                  <span className="font-mono font-bold text-indigo-900 bg-slate-100 px-2 py-0.5 rounded">
                    {activeResource.resourceCode}
                  </span>
                </div>
              </div>

              {/* Direct Copy Stable Link */}
              <button
                id="copy-qr-link-btn"
                type="button"
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Digital URL Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-500" />
                    <span>Copy Companion Web Link</span>
                  </>
                )}
              </button>
            </div>

            {/* Book Chapter Navigator Accordion */}
            {selectedBook && (
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  {selectedBook.shortTitle} Chapter Guide
                </span>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {selectedBook.chapters.map((ch) => {
                    const isExpanded = expandedChapter === ch.chapterNumber;
                    return (
                      <div key={ch.chapterNumber} className="rounded-xl border border-slate-100 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setExpandedChapter(isExpanded ? null : ch.chapterNumber)}
                          className="w-full p-2.5 text-left text-xs font-bold text-slate-800 bg-slate-50 hover:bg-slate-100 flex items-center justify-between cursor-pointer"
                        >
                          <span>Ch {ch.chapterNumber}: {ch.chapterTitle}</span>
                          {isExpanded ? <ChevronDown className="h-3.5 w-3.5 text-slate-400" /> : <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
                        </button>
                        {isExpanded && (
                          <div className="p-2.5 bg-white space-y-1.5 text-xs">
                            {ch.sections.map((sec) => (
                              <button
                                key={sec.sectionNumber}
                                type="button"
                                onClick={() => handleSelectSectionResource(sec.primaryResourceCode)}
                                className="w-full text-left p-1.5 rounded-lg hover:bg-indigo-50 text-[11px] text-slate-600 hover:text-indigo-700 transition flex items-center justify-between cursor-pointer"
                              >
                                <span>Sec {sec.sectionNumber}: {sec.sectionTitle}</span>
                                {sec.primaryResourceCode && (
                                  <QrCode className="h-3 w-3 text-indigo-500 shrink-0" />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Action Launchers Bento */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Integrated Academy Actions
              </span>

              {/* Launch Practice */}
              <button
                id="qr-launch-practice-btn"
                type="button"
                onClick={handleLaunchPracticeArena}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-indigo-500 hover:bg-indigo-50/40 transition text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Brain className="h-5 w-5 text-indigo-600 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Practice Chapter Skills</span>
                    <span className="text-[11px] text-slate-500">Interactive questions & scratchpad</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </button>

              {/* Launch Play Activity if available */}
              {activeResource.associatedPlayActivityId && (
                <button
                  id="qr-launch-play-btn"
                  type="button"
                  onClick={() => onLaunchPlayActivity(activeResource.associatedPlayActivityId!)}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-amber-200 bg-amber-50/50 hover:bg-amber-100/60 transition text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Play className="h-5 w-5 text-amber-600 fill-amber-600 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Learn & Play Challenge</span>
                      <span className="text-[11px] text-amber-800">Direct interactive concept simulator</span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-amber-600" />
                </button>
              )}

              {/* Launch Socratic AI Tutor */}
              <button
                id="qr-launch-tutor-btn"
                type="button"
                onClick={() =>
                  onOpenAITutorWithContext(
                    `${activeResource.bookTitle} - ${activeResource.chapterTitle}`,
                    activeResource.tutorStarterPrompt
                  )
                }
                className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-white hover:from-indigo-100 transition text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-indigo-600 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Ask Tutor Moos AI</span>
                    <span className="text-[11px] text-indigo-700">Guided textbook exercise reasoning</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-indigo-600" />
              </button>
            </div>
          </div>

          {/* Right Columns: Digital Companion Content & Worked Solutions (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
              {/* Companion Title and Overview */}
              <div className="space-y-2 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                    {activeResource.resourceType.replace("_", " ").toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-400">
                    Standard: {activeResource.curriculumStandard}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {activeResource.title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeResource.digitalExplanation.overview}
                </p>
              </div>

              {/* Learning Objectives Pill List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Targeted Academic Competencies:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeResource.learningObjectives.map((obj, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 border border-slate-100 p-2.5 rounded-xl"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Tabs for Companion Breakdown */}
              <div className="flex border-b border-slate-200 gap-6 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab("walkthrough")}
                  className={`pb-3 transition border-b-2 cursor-pointer ${
                    activeTab === "walkthrough"
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Step-by-Step Worked Solutions
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("formulas")}
                  className={`pb-3 transition border-b-2 cursor-pointer ${
                    activeTab === "formulas"
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Key Theorems & Formulas ({activeResource.digitalExplanation.keyFormulas.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("misconceptions")}
                  className={`pb-3 transition border-b-2 cursor-pointer ${
                    activeTab === "misconceptions"
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Examiner Traps & Misconceptions
                </button>
              </div>

              {/* Tab 1: Worked Solution Steps */}
              {activeTab === "walkthrough" && (
                <div className="space-y-4">
                  {activeResource.digitalExplanation.workedSolutionSteps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xs">
                          {step.stepNumber}
                        </span>
                        <span className="text-xs font-bold text-slate-900">{step.instruction}</span>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
                        <code className="text-sm sm:text-base font-bold text-indigo-900 font-mono">
                          {step.mathExpression}
                        </code>
                      </div>

                      <p className="text-xs text-slate-600 bg-indigo-50/40 p-2.5 rounded-xl border border-indigo-100/60 leading-relaxed">
                        <strong className="text-indigo-900 font-semibold">Mathematical / Scientific Reasoning:</strong>{" "}
                        {step.reasoning}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Key Formulas */}
              {activeTab === "formulas" && (
                <div className="space-y-3">
                  {activeResource.digitalExplanation.keyFormulas.map((formula, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-indigo-100 bg-indigo-50/30 p-4 flex items-center justify-between"
                    >
                      <span className="text-xs font-mono font-bold text-indigo-950">{formula}</span>
                      <Bookmark className="h-4 w-4 text-indigo-400" />
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Common Misconceptions */}
              {activeTab === "misconceptions" && (
                <div className="space-y-3">
                  {activeResource.digitalExplanation.commonMisconceptions.map((misc, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 text-xs text-amber-900 flex items-start gap-3"
                    >
                      <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{misc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
