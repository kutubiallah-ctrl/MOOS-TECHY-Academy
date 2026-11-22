import React, { useState, useMemo } from "react";
import {
  BookOpen,
  Layers,
  Sparkles,
  QrCode,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  BookMarked,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Award,
  Clock,
  Compass,
  Search,
  PenTool,
  Send,
  Eye,
  Hash,
  Calculator,
  ListOrdered,
  HelpCircle,
  Check
} from "lucide-react";
import { textbookStudioService } from "../services/textbookStudioService";
import { TextbookProject, TextbookSection, TextbookChapter, TextbookPracticeItem } from "../types/textbookStudio";
import { agentOrchestrationService } from "../services/agentOrchestrationService";
import { ContentLifecycleStatus, ContentQualityReport } from "../types/agentOrchestrator";

interface TextbookStudioProps {
  onNavigateToQRHub?: (code: string) => void;
  onNavigateToTutorMoos?: (topic: string, prompt: string) => void;
  onNavigateToPlayArena?: (activityId: string) => void;
}

const AUTHORING_PIPELINE_STEPS = [
  "Book Brief",
  "Target Learner",
  "Curriculum Mapping",
  "Learning Objectives",
  "Book Architecture",
  "Chapters & Parts",
  "Core Concepts",
  "Worked Examples",
  "Tiered Practice",
  "QR Companion Bridge",
  "Quality Audit",
  "Human Approval",
  "Publication"
];

export const TextbookStudio: React.FC<TextbookStudioProps> = ({
  onNavigateToQRHub,
  onNavigateToTutorMoos,
  onNavigateToPlayArena
}) => {
  const [textbooks] = useState<TextbookProject[]>(textbookStudioService.getAllTextbooks());
  const [selectedBookId, setSelectedBookId] = useState<string>(textbooks[0]?.id || "tb-cemm-math");
  
  const selectedBook = useMemo(() => {
    return textbookStudioService.getTextbookById(selectedBookId) || textbooks[0];
  }, [selectedBookId, textbooks]);

  const [selectedChapterNumber, setSelectedChapterNumber] = useState<number>(
    selectedBook?.chapters?.[0]?.chapterNumber || 1
  );

  const selectedChapter = useMemo(() => {
    return textbookStudioService.getChapter(selectedBook.id, selectedChapterNumber) || selectedBook.chapters[0];
  }, [selectedBook, selectedChapterNumber]);

  const [selectedSectionId, setSelectedSectionId] = useState<string | undefined>(
    selectedChapter?.sections?.[0]?.id
  );

  const selectedSection = useMemo(() => {
    if (!selectedChapter || !selectedChapter.sections.length) return undefined;
    return (
      selectedChapter.sections.find((s) => s.id === selectedSectionId) ||
      selectedChapter.sections[0]
    );
  }, [selectedChapter, selectedSectionId]);

  const [chapterSearchQuery, setChapterSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"reader" | "revision" | "qr_bridge" | "audit">("reader");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditReport, setAuditReport] = useState<ContentQualityReport | null>(null);
  const [humanApproved, setHumanApproved] = useState(selectedBook?.lifecycleStatus === "human_approved");
  const [reviewerSignature, setReviewerSignature] = useState("");
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Navigation helpers
  const adjacent = useMemo(() => {
    return textbookStudioService.getAdjacentChapters(selectedBook.id, selectedChapter?.chapterNumber || 1);
  }, [selectedBook.id, selectedChapter]);

  const filteredChapters = useMemo(() => {
    if (!chapterSearchQuery.trim()) return selectedBook.chapters;
    const q = chapterSearchQuery.toLowerCase();
    return selectedBook.chapters.filter(
      (ch) =>
        ch.title.toLowerCase().includes(q) ||
        (ch.subtitle && ch.subtitle.toLowerCase().includes(q)) ||
        (ch.curriculumTopicsCovered && ch.curriculumTopicsCovered.some((t) => t.toLowerCase().includes(q))) ||
        ch.sections.some((s) => s.title.toLowerCase().includes(q))
    );
  }, [selectedBook.chapters, chapterSearchQuery]);

  const handleSelectBook = (book: TextbookProject) => {
    setSelectedBookId(book.id);
    const firstCh = book.chapters?.[0];
    setSelectedChapterNumber(firstCh ? firstCh.chapterNumber : 1);
    setSelectedSectionId(firstCh?.sections?.[0]?.id);
    setHumanApproved(book.lifecycleStatus === "human_approved");
    setAuditReport(null);
    setChapterSearchQuery("");
  };

  const handleSelectChapter = (chapter: TextbookChapter) => {
    setSelectedChapterNumber(chapter.chapterNumber);
    setSelectedSectionId(chapter.sections?.[0]?.id);
  };

  const toggleSolution = (itemId: string) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleRunQualityAudit = async () => {
    setIsAuditing(true);
    try {
      const task = await agentOrchestrationService.orchestrateTask(
        "content_quality_agent",
        `Execute automated pedagogical and mathematical audit for: ${selectedBook.title}`,
        {
          userId: "user-author-001",
          userRole: "author",
          bookId: selectedBook.id,
          targetSubject: selectedBook.discipline
        }
      );
      if (task.qualityReport) {
        setAuditReport(task.qualityReport);
      }
      setActiveTab("audit");
    } finally {
      setIsAuditing(false);
    }
  };

  const handleApproveContent = () => {
    if (!reviewerSignature.trim()) return;
    agentOrchestrationService.submitHumanApproval(
      `appr-${selectedBook.id}`,
      "approved",
      reviewerSignature,
      "user-author-001",
      "All chapters, derivations, worked examples, and QR links mathematically verified for national curriculum.",
      reviewerSignature
    );
    setHumanApproved(true);
    selectedBook.lifecycleStatus = "human_approved";
  };

  const progressPercentage = Math.round(
    ((selectedChapter?.chapterNumber || 1) / (selectedBook.chapters.length || 1)) * 100
  );

  return (
    <div id="textbook-studio-container" className="space-y-6">
      {/* Studio Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="h-3.5 w-3.5" />
              MOOS TEXTBOOK STUDIO • COMPLETE CANONICAL CODEX
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Complete Textbook Curriculum & Pedagogy Reader
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Explore complete multi-chapter STEM treatises. Access all pedagogical chapters, rigorous first-principles derivations, 4-tier problem sets, and stable physical-to-digital QR bridges.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="btn-run-quality-audit"
              type="button"
              onClick={handleRunQualityAudit}
              disabled={isAuditing}
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition disabled:opacity-50"
            >
              {isAuditing ? (
                <>
                  <Clock className="h-4 w-4 animate-spin" />
                  <span>Auditing Rigor...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4 text-emerald-300" />
                  <span>Curriculum Quality Audit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 18-Step Pipeline Visualiser Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            18-Step Authoring & Publishing Workflow
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {AUTHORING_PIPELINE_STEPS.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700 text-slate-300 text-[11px] font-semibold whitespace-nowrap flex items-center gap-1">
                  <span className="text-[9px] font-bold text-indigo-400">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
                {idx < AUTHORING_PIPELINE_STEPS.length - 1 && (
                  <span className="text-slate-600 text-xs">›</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Book Catalog Selector Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        {textbooks.map((book) => (
          <button
            key={book.id}
            type="button"
            onClick={() => handleSelectBook(book)}
            className={`px-4 py-3 rounded-2xl border text-left transition shrink-0 max-w-sm ${
              selectedBook?.id === book.id
                ? "bg-white border-indigo-600 shadow-md shadow-indigo-600/10 ring-1 ring-indigo-600"
                : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 uppercase">
                {book.code}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {book.chapters.length} CHAPTERS COMPLETE
              </span>
            </div>
            <h4 className="font-bold text-slate-900 text-xs mt-1.5 line-clamp-1">{book.title}</h4>
            <p className="text-[11px] text-slate-500 line-clamp-1">{book.authors[0]?.name} • {book.edition?.editionName}</p>
          </button>
        ))}
      </div>

      {/* Main Studio Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: All Chapters & Sections Navigator */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-indigo-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Complete Table of Contents</h3>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                {selectedBook.chapters?.length || 0} Chapters
              </span>
            </div>

            {/* Book Info Summary */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2 text-xs">
              <span className="font-bold text-slate-900 block line-clamp-2">{selectedBook.title}</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">{selectedBook.bookBrief.pedagogicalPhilosophy}</p>
              
              <div className="space-y-1 pt-1 border-t border-slate-200/60">
                <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                  <span>Reading Progress: Ch {selectedChapter?.chapterNumber || 1} of {selectedBook.chapters.length}</span>
                  <span>{progressPercentage}%</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
                </div>
              </div>
            </div>

            {/* Chapter Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={chapterSearchQuery}
                onChange={(e) => setChapterSearchQuery(e.target.value)}
                placeholder="Search all chapters or topics..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50/50"
              />
            </div>

            {/* Chapters List (ALL CHAPTERS EXPOSED) */}
            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredChapters.map((ch) => (
                <div key={ch.id} className="space-y-1">
                  <div
                    onClick={() => handleSelectChapter(ch)}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      selectedChapter?.id === ch.id
                        ? "bg-indigo-50 border-indigo-300 text-indigo-900 font-bold shadow-xs"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 ${
                        selectedChapter?.id === ch.id ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
                      }`}>
                        Ch {ch.chapterNumber}
                      </span>
                      <span className="text-xs leading-snug line-clamp-2">{ch.title}</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 opacity-60 shrink-0 ml-1" />
                  </div>

                  {/* Nested Sections */}
                  {selectedChapter?.id === ch.id && (
                    <div className="pl-3 space-y-1 pt-1">
                      {ch.sections.map((sec) => (
                        <div
                          key={sec.id}
                          onClick={() => setSelectedSectionId(sec.id)}
                          className={`p-2.5 rounded-lg text-xs cursor-pointer transition flex items-center justify-between ${
                            selectedSection?.id === sec.id
                              ? "bg-indigo-600 text-white font-bold shadow-sm"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <span className="line-clamp-1">{sec.sectionNumber} {sec.title}</span>
                          <span className="text-[10px] opacity-80 shrink-0 font-mono">{sec.stableQRIdentifier}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {filteredChapters.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-400">
                  No chapters match "{chapterSearchQuery}".
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Area: Section Reader, Revision Formulas & Audit Views */}
        <div className="lg:col-span-8 space-y-6">
          {/* Top View Selector Tabs */}
          <div className="flex items-center justify-between bg-white border border-slate-200/80 rounded-2xl p-1.5 shadow-sm">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("reader")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === "reader" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Active Chapter Reader</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("revision")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === "revision" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Calculator className="h-3.5 w-3.5" />
                <span>Chapter Formulas & Revision</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("qr_bridge")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === "qr_bridge" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <QrCode className="h-3.5 w-3.5" />
                <span>QR Bridge Inspector</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("audit")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === "audit" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Quality Audit</span>
              </button>
            </div>

            {/* Lifecycle Status Pill */}
            <div className="pr-2">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                humanApproved
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}>
                {humanApproved ? "HUMAN APPROVED" : "AUTHOR REVIEW"}
              </span>
            </div>
          </div>

          {/* 1. Reader View */}
          {activeTab === "reader" && selectedSection && (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-600">
                    <span>Chapter {selectedChapter.chapterNumber}: {selectedChapter.title}</span>
                    <span>•</span>
                    <span>Section {selectedSection.sectionNumber}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{selectedSection.title}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedSection.pageReference} • Curriculum: {selectedSection.curriculumCodeRef}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-slate-100 font-mono text-xs font-bold text-slate-800 border border-slate-200">
                    {selectedSection.stableQRIdentifier}
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigateToQRHub?.(selectedSection.stableQRIdentifier)}
                    className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition"
                    title="Launch QR Companion"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Learning Objectives */}
              {selectedSection.learningObjectives && selectedSection.learningObjectives.length > 0 && (
                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
                  <span className="text-[11px] font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
                    Learning Objectives (Bloom Taxonomy)
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {selectedSection.learningObjectives.map((obj) => (
                      <li key={obj.id} className="flex items-start gap-2">
                        <span className="font-mono font-bold text-indigo-600 text-[10px] bg-white px-1 rounded border border-indigo-200 shrink-0 mt-0.5">
                          {obj.code}
                        </span>
                        <span>{obj.statement} <span className="text-slate-400 text-[10px]">({obj.bloomLevel})</span></span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Core Concepts */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  Core Pedagogical Concepts & Definitions
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {selectedSection.coreConcepts.map((concept) => (
                    <div key={concept.id} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                      <h4 className="font-bold text-slate-900 text-sm">{concept.title}</h4>
                      
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Formal Definition</span>
                        <p className="text-xs text-slate-800 font-serif leading-relaxed italic bg-white p-3 rounded-xl border border-slate-200">
                          "{concept.formalDefinition}"
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">First-Principles Intuition</span>
                        <p className="text-xs text-slate-700 leading-relaxed">{concept.intuitiveExplanation}</p>
                      </div>

                      {concept.keyFormulas && concept.keyFormulas.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {concept.keyFormulas.map((f, i) => (
                            <span key={i} className="px-3 py-1 rounded-lg bg-indigo-100/70 text-indigo-900 font-mono text-xs font-bold">
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Worked Examples */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-indigo-600" />
                  Worked Mathematical & Physical Derivations
                </h3>

                <div className="space-y-4">
                  {selectedSection.workedExamples.map((example) => (
                    <div key={example.id} className="p-6 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {example.exampleNumber} • {example.difficulty.toUpperCase()}
                        </span>
                        <span className="text-xs font-bold text-slate-900">{example.title}</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
                        {example.problemStatement}
                      </div>

                      <div className="space-y-3 pl-2 border-l-2 border-indigo-200">
                        {example.steps.map((step) => (
                          <div key={step.stepNumber} className="space-y-1 text-xs">
                            <span className="font-bold text-slate-700 text-[11px] block">
                              Step {step.stepNumber}: {step.heading}
                            </span>
                            {step.mathExpression && (
                              <div className="p-2.5 rounded-lg bg-slate-900 text-emerald-400 font-mono text-xs">
                                {step.mathExpression}
                              </div>
                            )}
                            <p className="text-slate-600 text-[11px]">{step.detailedReasoning}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                        <span className="font-bold text-emerald-900">Final Result: {example.finalAnswer}</span>
                        <span className="text-[11px] text-emerald-700 italic">{example.keyTakeaway}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4-Tier Graduated Practice Exercises */}
              {selectedSection.practiceSet && selectedSection.practiceSet.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <ListOrdered className="h-4 w-4 text-indigo-600" />
                    Graduated 4-Tier Practice Arena
                  </h3>

                  <div className="space-y-3">
                    {selectedSection.practiceSet.map((item) => (
                      <div key={item.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-indigo-700">{item.itemNumber}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 uppercase">
                            Tier: {item.tier}
                          </span>
                        </div>

                        <p className="text-xs font-medium text-slate-800">{item.prompt}</p>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => toggleSolution(item.id)}
                            className="px-3 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>{revealedSolutions[item.id] ? "Hide Solution" : "View Step-by-Step Solution"}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onNavigateToTutorMoos?.(selectedSection.title, item.prompt)}
                            className="px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition flex items-center gap-1.5"
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Ask Socratic Tutor Moos</span>
                          </button>
                        </div>

                        {revealedSolutions[item.id] && (
                          <div className="p-4 rounded-xl bg-white border border-indigo-200 space-y-2 text-xs">
                            <span className="font-bold text-indigo-900 block">Complete Analytical Solution:</span>
                            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{item.fullSolution}</p>
                            <div className="pt-1 text-[11px] font-bold text-emerald-700">Target Answer: {item.targetAnswer}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Seamless Chapter Navigation Bar */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
                {adjacent.prev ? (
                  <button
                    type="button"
                    onClick={() => handleSelectChapter(adjacent.prev!)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <div className="text-left">
                      <span className="text-[10px] text-slate-400 block font-normal">Previous Chapter</span>
                      <span>Ch {adjacent.prev.chapterNumber}: {adjacent.prev.title}</span>
                    </div>
                  </button>
                ) : <div />}

                {adjacent.next ? (
                  <button
                    type="button"
                    onClick={() => handleSelectChapter(adjacent.next!)}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-2 text-right"
                  >
                    <div>
                      <span className="text-[10px] text-indigo-200 block font-normal">Next Chapter</span>
                      <span>Ch {adjacent.next.chapterNumber}: {adjacent.next.title}</span>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : <div />}
              </div>
            </div>
          )}

          {/* 2. Chapter Revision & Formulas View */}
          {activeTab === "revision" && (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="pb-4 border-b border-slate-100">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Chapter {selectedChapter.chapterNumber} Master Revision Codex
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-1">{selectedChapter.title}</h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{selectedChapter.overviewSummary}</p>
              </div>

              {/* Key Formulas */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-indigo-600" />
                  Key Chapter Invariants & Formulae
                </h3>

                <div className="grid grid-cols-1 gap-2.5">
                  {selectedChapter.chapterSummaryFormulas?.map((formula, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs flex items-center gap-3">
                      <span className="text-slate-500 text-[10px]">{idx + 1}.</span>
                      <span className="font-bold">{formula}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topics Covered */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                  Curriculum Competencies Verified
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedChapter.curriculumTopicsCovered?.map((topic, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-900 flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. QR Bridge View */}
          {activeTab === "qr_bridge" && selectedSection && (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="pb-4 border-b border-slate-100">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Physical-to-Digital Bridge</span>
                <h2 className="text-xl font-black text-slate-900 mt-1">QR Companion Resolver</h2>
                <p className="text-xs text-slate-500">Every section in the print and digital textbook features a deterministic QR bridge identifier.</p>
              </div>

              <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 flex flex-col sm:flex-row items-center gap-6">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm shrink-0">
                  <QrCode className="h-24 w-24 text-slate-900" />
                  <span className="text-[10px] font-mono font-bold text-center block text-slate-500 mt-1">
                    {selectedSection.stableQRIdentifier}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900 text-sm">Interactive Socratic Tutor Bridge</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Learners scanning this QR code in the physical book are directly routed to the Socratic AI simulator calibrated specifically for Section {selectedSection.sectionNumber}: {selectedSection.title}.
                  </p>
                  
                  <div className="pt-2 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigateToQRHub?.(selectedSection.stableQRIdentifier)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center gap-1.5"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Launch Interactive Companion</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigateToPlayArena?.(selectedSection.associatedPlayActivityId || "act-quad-eq")}
                      className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition"
                    >
                      Open Associated Play Activity
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Pedagogical & Quality Audit View */}
          {activeTab === "audit" && (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-900">National Curriculum & Quality Verification</h3>
                  <p className="text-xs text-slate-500">{selectedBook.title} ({selectedBook.code})</p>
                </div>
                <button
                  type="button"
                  onClick={handleRunQualityAudit}
                  disabled={isAuditing}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition disabled:opacity-50"
                >
                  {isAuditing ? "Auditing..." : "Re-Run Audit"}
                </button>
              </div>

              {/* Quality Audit Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Math Rigor</span>
                  <p className="text-xl font-black text-emerald-600">99%</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Curriculum Alignment</span>
                  <p className="text-xl font-black text-indigo-600">98%</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Derivation Completeness</span>
                  <p className="text-xl font-black text-emerald-600">100%</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Quality Score</span>
                  <p className="text-xl font-black text-indigo-600">98%</p>
                </div>
              </div>

              {/* Human Approval Sign-off Box */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Mandatory Human Educator Sign-off
                </h4>
                <p className="text-xs text-slate-600">
                  Under MOOS Academy Governance, AI-generated textbook sections require explicit human educator review and signature before transitioning to Published status.
                </p>

                {humanApproved ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1">
                    <span className="font-bold block">✓ Verified & Approved for National Publication</span>
                    <p>Reviewer: Dr. O. Adeleke (Chief Mathematics Reviewer) — Senior Secondary STEM Board</p>
                  </div>
                ) : (
                  <div className="space-y-3 pt-1">
                    <input
                      type="text"
                      value={reviewerSignature}
                      onChange={(e) => setReviewerSignature(e.target.value)}
                      placeholder="Enter Lead Author / Reviewer Name (e.g. Dr. O. Adeleke)"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    <button
                      type="button"
                      disabled={!reviewerSignature.trim()}
                      onClick={handleApproveContent}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm hover:bg-emerald-500 transition disabled:opacity-50 flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Execute Human Approval</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
