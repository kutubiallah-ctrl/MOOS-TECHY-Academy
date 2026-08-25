import React, { useState } from "react";
import {
  PenTool,
  BookOpen,
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ShieldCheck,
  ChevronRight,
  Plus,
  BookMarked,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  HelpCircle,
  Clock,
  Compass,
  FileCheck
} from "lucide-react";
import { bookpreneurService } from "../services/bookpreneurService";
import { BookpreneurProject, ManuscriptChapter, ManuscriptSection, ClaimEvidenceItem } from "../types/bookpreneur";
import { agentOrchestrationService } from "../services/agentOrchestrationService";

export const BookpreneurStudio: React.FC = () => {
  const [projects, setProjects] = useState<BookpreneurProject[]>(bookpreneurService.getAllProjects());
  const [selectedProject, setSelectedProject] = useState<BookpreneurProject>(projects[0]);
  const [selectedChapter, setSelectedChapter] = useState<ManuscriptChapter | undefined>(
    selectedProject?.chapters?.[0]
  );
  const [selectedSection, setSelectedSection] = useState<ManuscriptSection | undefined>(
    selectedProject?.chapters?.[0]?.sections?.[0]
  );

  const [activeTab, setActiveTab] = useState<"positioning" | "promise" | "research" | "manuscript" | "editorial">("positioning");
  const [isClassifyingClaims, setIsClassifyingClaims] = useState(false);

  const handleRunClaimVerification = async () => {
    setIsClassifyingClaims(true);
    try {
      await agentOrchestrationService.orchestrateTask(
        "research_assistant_agent",
        `Classify claims and verify citations for: ${selectedProject.title}`,
        {
          userId: "user-bookpreneur-001",
          userRole: "bookpreneur",
          documentId: selectedProject.id
        }
      );
      setActiveTab("manuscript");
    } finally {
      setIsClassifyingClaims(false);
    }
  };

  return (
    <div id="bookpreneur-studio-container" className="space-y-6">
      {/* Studio Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
              <PenTool className="h-3.5 w-3.5" />
              MOOS TECHY BOOKPRENEUR STUDIO • NONFICTION PUBLISHING
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Serious Nonfiction Book Architecture & Rigor
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Move seamlessly from core problem to market positioning, research planning, claim verification, and publishing preparation. Differentiate facts, empirical citations, hypotheses, and author interpretations with complete transparency.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="btn-verify-claims"
              type="button"
              onClick={handleRunClaimVerification}
              disabled={isClassifyingClaims}
              className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 flex items-center gap-2 transition disabled:opacity-50"
            >
              {isClassifyingClaims ? (
                <>
                  <Clock className="h-4 w-4 animate-spin" />
                  <span>Auditing Citations...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4 text-emerald-300" />
                  <span>Verify Claims & Citations</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-800/80 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("positioning")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === "positioning"
                ? "bg-purple-500 text-white shadow-md shadow-purple-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Market Positioning & Thesis</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("promise")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === "promise"
                ? "bg-purple-500 text-white shadow-md shadow-purple-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Award className="h-4 w-4" />
            <span>Reader Promise Matrix</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("research")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === "research"
                ? "bg-purple-500 text-white shadow-md shadow-purple-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Search className="h-4 w-4" />
            <span>Research & Evidence ({selectedProject.researchBibliography.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("manuscript")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === "manuscript"
                ? "bg-purple-500 text-white shadow-md shadow-purple-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Manuscript & Claim Rigor</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("editorial")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === "editorial"
                ? "bg-purple-500 text-white shadow-md shadow-purple-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <FileCheck className="h-4 w-4" />
            <span>Editorial & Publishing Prep</span>
          </button>
        </div>
      </div>

      {/* Tab: Positioning */}
      {activeTab === "positioning" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Strategic Positioning</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{selectedProject.title}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{selectedProject.subtitle}</p>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold capitalize border border-purple-200">
              {selectedProject.category.replace("_", " ")}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-900 block">Core Thesis</span>
            <p className="text-xs sm:text-sm text-purple-950 font-medium leading-relaxed">
              {selectedProject.positioning.coreThesis}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block uppercase">Unique Angle & Differentiator</span>
              <p className="text-slate-600 leading-relaxed">{selectedProject.positioning.uniqueAngle}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block uppercase">Target Demographic & Readership</span>
              <p className="text-slate-600 leading-relaxed">{selectedProject.positioning.targetDemographic}</p>
            </div>
          </div>

          {/* Comparable Books & Gaps */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Comparable Titles & Specific Gaps Addressed</h3>
            <div className="space-y-2">
              {selectedProject.positioning.comparableBooks.map((comp, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{comp.title}</span>
                    <span className="text-slate-500 font-medium">By {comp.author}</span>
                  </div>
                  <p className="text-purple-700 font-medium mt-1">
                    <span className="font-bold">Gap Addressed: </span>
                    {comp.gapAddressedByThisBook}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Reader Promise */}
      {activeTab === "promise" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="pb-4 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Reader Transformation</span>
            <h3 className="text-xl font-black text-slate-900 mt-1">Reader Promise & Capability Framework</h3>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-900 block">Primary Transformation</span>
            <p className="text-xs sm:text-sm text-purple-950 font-medium leading-relaxed">
              {selectedProject.readerPromise.primaryTransformation}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Target Outcomes */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-900 block uppercase">Target Tangible Outcomes</span>
              <ul className="space-y-1.5">
                {selectedProject.readerPromise.targetOutcomes.map((out, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* False Beliefs to Dispel */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-900 block uppercase">False Beliefs Dispelled</span>
              <ul className="space-y-1.5">
                {selectedProject.readerPromise.readerFalseBeliefsToDispel.map((myth, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{myth}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Research */}
      {activeTab === "research" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Empirical Rigor</span>
              <h3 className="text-xl font-black text-slate-900 mt-1">Research Bibliography & Evidence Base</h3>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Verified Academic Citations
            </span>
          </div>

          <div className="space-y-3">
            {selectedProject.researchBibliography.map((src) => (
              <div key={src.id} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-slate-900 text-sm">{src.citationTitle}</span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                    {src.verificationStatus.replace("_", " ")}
                  </span>
                </div>

                <p className="text-slate-700 font-medium">
                  <span className="font-bold text-slate-900">Key Extracted Finding: </span>
                  {src.keyFindingsExtracted}
                </p>

                <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
                  <span>Type: {src.sourceType.replace("_", " ")}</span>
                  {src.doiOrUrl && (
                    <a href={src.doiOrUrl} target="_blank" rel="noreferrer" className="text-purple-600 underline font-medium">
                      DOI / Source Link
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Manuscript & Claim Rigor */}
      {activeTab === "manuscript" && selectedSection && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-purple-600">
                <span>Chapter 1: The Illusion of Fluency</span>
                <span>•</span>
                <span>Section {selectedSection.sectionNumber}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{selectedSection.title}</h2>
            </div>
            <span className="text-xs font-bold text-slate-500">{selectedSection.wordCount} Words</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Core Section Argument</span>
            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              {selectedSection.coreArgument}
            </p>
          </div>

          <div className="prose prose-sm max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed p-4 rounded-2xl bg-white border border-slate-100">
            {selectedSection.contentMarkdown}
          </div>

          {/* Claim Classification Ledger */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Claim & Evidence Classification Ledger
            </h3>
            <div className="space-y-2">
              {selectedSection.claims.map((claim) => (
                <div key={claim.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">"{claim.statement}"</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      claim.classification === "fact"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {claim.classification.replace("_", " ")}
                    </span>
                  </div>
                  {claim.sourceTextExcerpt && (
                    <p className="text-[11px] text-slate-500 italic mt-0.5">
                      Source Excerpt: "{claim.sourceTextExcerpt}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Editorial & Publishing Prep */}
      {activeTab === "editorial" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="pb-4 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Publishing Compliance</span>
            <h3 className="text-xl font-black text-slate-900 mt-1">Pre-Publication Readiness Checklist</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="font-bold text-slate-800">Front Matter & Dedication</span>
              <span className="text-emerald-700 font-bold">✓ Ready</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="font-bold text-slate-800">Table of Contents Architecture</span>
              <span className="text-emerald-700 font-bold">✓ Finalized</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="font-bold text-slate-800">Academic Bibliography Compiled</span>
              <span className="text-emerald-700 font-bold">✓ Verified</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="font-bold text-slate-800">ISBN Registration</span>
              <span className="text-indigo-700 font-mono font-bold">{selectedProject.publishingPrep.isbnAssigned || "Assigned"}</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <span className="font-bold text-slate-900 uppercase block">Back Cover Marketing Copy</span>
            <p className="text-slate-700 leading-relaxed italic">"{selectedProject.publishingPrep.backCoverCopy}"</p>
          </div>
        </div>
      )}
    </div>
  );
};
