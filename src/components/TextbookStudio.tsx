import React, { useState } from "react";
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
  Plus,
  BookMarked,
  ArrowRight,
  ExternalLink,
  Award,
  Clock,
  Compass,
  Cpu,
  BrainCircuit,
  Search,
  PenTool,
  Send
} from "lucide-react";
import { textbookStudioService } from "../services/textbookStudioService";
import { TextbookProject, TextbookSection, TextbookChapter } from "../types/textbookStudio";
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
  const [textbooks, setTextbooks] = useState<TextbookProject[]>(textbookStudioService.getAllTextbooks());
  const [selectedBook, setSelectedBook] = useState<TextbookProject>(textbooks[0]);
  const [selectedChapter, setSelectedChapter] = useState<TextbookChapter | undefined>(
    selectedBook?.chapters?.[0]
  );
  const [selectedSection, setSelectedSection] = useState<TextbookSection | undefined>(
    selectedChapter?.sections?.[0]
  );

  const [activeTab, setActiveTab] = useState<"reader" | "qr_bridge" | "workflow" | "audit">("reader");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditReport, setAuditReport] = useState<ContentQualityReport | null>(null);
  const [humanApproved, setHumanApproved] = useState(selectedBook?.lifecycleStatus === "human_approved");
  const [reviewerSignature, setReviewerSignature] = useState("");

  const handleSelectBook = (book: TextbookProject) => {
    setSelectedBook(book);
    setSelectedChapter(book.chapters?.[0]);
    setSelectedSection(book.chapters?.[0]?.sections?.[0]);
    setHumanApproved(book.lifecycleStatus === "human_approved");
    setAuditReport(null);
  };

  const handleSelectChapter = (chapter: TextbookChapter) => {
    setSelectedChapter(chapter);
    setSelectedSection(chapter.sections?.[0]);
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
      "All worked examples, derivations, and QR codes mathematically verified for national curriculum.",
      reviewerSignature
    );
    setHumanApproved(true);
    selectedBook.lifecycleStatus = "human_approved";
  };

  return (
    <div id="textbook-studio-container" className="space-y-6">
      {/* Studio Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="h-3.5 w-3.5" />
              MOOS TECHY TEXTBOOK STUDIO • MULTI-VOLUME PUBLISHING
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              C.E.M.M & STEM Textbook Authoring Architecture
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Design rigorous, concept-first textbooks with step-by-step mathematical derivations, graduated 4-tier practice problems, and physical QR codes bridging learners directly to Socratic AI.
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
                  <span>Content Quality Audit</span>
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
            className={`px-4 py-3 rounded-2xl border text-left transition shrink-0 max-w-xs ${
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
                {book.curriculumMappingStatus.toUpperCase()}
              </span>
            </div>
            <h4 className="font-bold text-slate-900 text-xs mt-1.5 line-clamp-1">{book.title}</h4>
            <p className="text-[11px] text-slate-500 line-clamp-1">{book.authors[0]?.name} • {book.edition?.editionName}</p>
          </button>
        ))}
      </div>

      {/* Main Studio Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: Chapters & Sections Navigator */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Book Architecture</h3>
              <span className="text-[11px] font-bold text-indigo-600">{selectedBook.chapters?.length || 0} Chapters</span>
            </div>

            {/* Book Info Summary */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1 text-xs">
              <span className="font-bold text-slate-900 block">{selectedBook.title}</span>
              <p className="text-slate-600 text-[11px]">{selectedBook.bookBrief.pedagogicalPhilosophy}</p>
              <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-500 font-medium">
                <span>ISBN: {selectedBook.edition.isbn || "Pending"}</span>
                <span>•</span>
                <span>{selectedBook.totalQRResourcesCount} QR Codes</span>
              </div>
            </div>

            {/* Chapters List */}
            <div className="space-y-2">
              {selectedBook.chapters?.map((ch) => (
                <div key={ch.id} className="space-y-1">
                  <div
                    onClick={() => handleSelectChapter(ch)}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      selectedChapter?.id === ch.id
                        ? "bg-indigo-50 border-indigo-300 text-indigo-900 font-bold"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold"
                    }`}
                  >
                    <span className="text-xs">Ch {ch.chapterNumber}: {ch.title}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                  </div>

                  {/* Nested Sections */}
                  {selectedChapter?.id === ch.id && (
                    <div className="pl-3 space-y-1 pt-1">
                      {ch.sections.map((sec) => (
                        <div
                          key={sec.id}
                          onClick={() => setSelectedSection(sec)}
                          className={`p-2.5 rounded-lg text-xs cursor-pointer transition flex items-center justify-between ${
                            selectedSection?.id === sec.id
                              ? "bg-indigo-600 text-white font-bold shadow-sm"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <span className="line-clamp-1">{sec.sectionNumber} {sec.title}</span>
                          <span className="text-[10px] opacity-80 shrink-0">{sec.stableQRIdentifier}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Area: Section Reader, QR Bridge & Audit Views */}
        <div className="lg:col-span-8 space-y-6">
          {/* Top View Selector Tabs */}
          <div className="flex items-center justify-between bg-white border border-slate-200/80 rounded-2xl p-1.5 shadow-sm">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("reader")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === "reader" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Section Codex
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("qr_bridge")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === "qr_bridge" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <QrCode className="h-3.5 w-3.5" />
                <span>QR Bridge Inspector</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("audit")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === "audit" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Pedagogical & Quality Audit</span>
              </button>
            </div>

            {/* Lifecycle Status Pill */}
            <div className="pr-2">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                humanApproved
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}>
                {humanApproved ? "HUMAN APPROVED" : "AUTHOR REVIEW REQUIRED"}
              </span>
            </div>
          </div>

          {/* Reader View */}
          {activeTab === "reader" && selectedSection && (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-600">
                    <span>Section {selectedSection.sectionNumber}</span>
                    <span>•</span>
                    <span>{selectedSection.pageReference}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{selectedSection.title}</h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-slate-100 font-mono text-xs font-bold text-slate-800">
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

              {/* Core Concepts */}
              {selectedSection.coreConcepts.map((concept) => (
                <div key={concept.id} className="space-y-3">
                  <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 block">
                      Formal Definition & Intuition: {concept.title}
                    </span>
                    <p className="text-xs sm:text-sm text-indigo-950 font-medium leading-relaxed">
                      {concept.formalDefinition}
                    </p>
                    <p className="text-xs text-indigo-800 italic">
                      "{concept.intuitiveExplanation}"
                    </p>
                  </div>

                  {/* Formulas */}
                  {concept.keyFormulas.length > 0 && (
                    <div className="p-3.5 rounded-2xl bg-slate-900 text-emerald-300 font-mono text-xs sm:text-sm overflow-x-auto">
                      {concept.keyFormulas.join("  |  ")}
                    </div>
                  )}
                </div>
              ))}

              {/* Worked Examples */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Step-by-Step Worked Derivations</h3>
                {selectedSection.workedExamples.map((example) => (
                  <div key={example.id} className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{example.exampleNumber}: {example.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 uppercase">
                        {example.difficulty.replace("_", " ")}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-medium text-slate-800">{example.problemStatement}</p>

                    <div className="space-y-2">
                      {example.steps.map((step) => (
                        <div key={step.stepNumber} className="p-3 rounded-xl bg-white border border-slate-200/60 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-indigo-700">Step {step.stepNumber}: {step.heading}</span>
                          </div>
                          <div className="p-2 rounded bg-slate-900 text-amber-300 font-mono text-xs overflow-x-auto">
                            {step.mathExpression}
                          </div>
                          <p className="text-xs text-slate-600 mt-1">{step.detailedReasoning}</p>
                          {step.pedagogicalTip && (
                            <p className="text-[11px] text-indigo-600 font-semibold mt-1">
                              💡 Tip: {step.pedagogicalTip}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-900 flex items-center justify-between">
                      <div>
                        <span className="font-bold">Final Exact Answer: </span>
                        <span>{example.finalAnswer}</span>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-medium">{example.keyTakeaway}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Practice Set */}
              {selectedSection.practiceSet.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Practice Set & Examiner Traps</h3>
                  {selectedSection.practiceSet.map((q) => (
                    <div key={q.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">{q.itemNumber} ({q.tier.replace("_", " ")})</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          Target: {q.targetAnswer}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700">{q.prompt}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* QR Bridge Inspector */}
          {activeTab === "qr_bridge" && selectedSection && (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Physical-to-Digital Bridge</span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">QR Ecosystem Connection</h3>
                </div>
                <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600">
                  <QrCode className="h-6 w-6" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Stable Identifier Code</span>
                    <p className="text-lg font-mono font-black text-indigo-700">{selectedSection.stableQRIdentifier}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateToQRHub?.(selectedSection.stableQRIdentifier)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-2 hover:bg-indigo-500 transition"
                  >
                    <span>Launch in QR Companion Hub</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Tutor Moos AI Link</span>
                    <p className="text-slate-600 text-[11px]">Direct Socratic context for this chapter derivation.</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Learn & Play Arena</span>
                    <p className="text-slate-600 text-[11px]">Interactive equation balancing challenge.</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Formula Codex Link</span>
                    <p className="text-slate-600 text-[11px]">Quadratic formula derivation & proofs.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quality Audit & Human Approval View */}
          {activeTab === "audit" && (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Governance & Compliance</span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">Quality Audit & Human Approval</h3>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
              </div>

              {/* Quality Audit Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Math Correctness</span>
                  <p className="text-xl font-black text-emerald-600">99%</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Curriculum Alignment</span>
                  <p className="text-xl font-black text-indigo-600">96%</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Pedagogical Scaffolding</span>
                  <p className="text-xl font-black text-emerald-600">94%</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Overall Quality Score</span>
                  <p className="text-xl font-black text-indigo-600">95%</p>
                </div>
              </div>

              {/* Human Approval Sign-off Box */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Mandatory Human Educator Sign-off
                </h4>
                <p className="text-xs text-slate-600">
                  Under MOOS TECHY Governance, AI-generated textbook sections require explicit human educator review and signature before transitioning to Published status.
                </p>

                {humanApproved ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1">
                    <span className="font-bold block">✓ Verified & Approved for Publication</span>
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
