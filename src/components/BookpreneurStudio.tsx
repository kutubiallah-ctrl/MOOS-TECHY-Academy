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
  FileCheck,
  ShoppingBag,
  DollarSign,
  Star,
  Filter,
  Eye,
  Send,
  XCircle,
  SlidersHorizontal,
  QrCode,
  GraduationCap,
  Tag,
  Check,
  ShieldAlert,
  Coins
} from "lucide-react";
import { bookpreneurService } from "../services/bookpreneurService";
import {
  BookpreneurProject,
  ManuscriptChapter,
  ManuscriptSection,
  ClaimEvidenceItem,
  MarketplaceResource,
  MarketplaceFilterOptions,
  MarketplaceFormat,
  MarketplaceEducationLevel
} from "../types/bookpreneur";
import { agentOrchestrationService } from "../services/agentOrchestrationService";
import { identityService } from "../services/identityService";

interface BookpreneurStudioProps {
  onNavigateToPractice?: (skillId: string) => void;
  onNavigateToQRHub?: (code: string) => void;
}

export const BookpreneurStudio: React.FC<BookpreneurStudioProps> = ({
  onNavigateToPractice,
  onNavigateToQRHub
}) => {
  const activeSession = identityService.getActiveSession();
  const [projects] = useState<BookpreneurProject[]>(() => bookpreneurService.getAllProjects());
  const [selectedProject] = useState<BookpreneurProject>(projects[0]);
  const [selectedSection] = useState<ManuscriptSection | undefined>(
    selectedProject?.chapters?.[0]?.sections?.[0]
  );

  // Master Pillar Tabs
  const [mainPillarTab, setMainPillarTab] = useState<"marketplace" | "authoring" | "creator_hub" | "governance">("marketplace");
  const [activeAuthorTab, setActiveAuthorTab] = useState<"positioning" | "promise" | "research" | "manuscript" | "editorial">("positioning");
  const [isClassifyingClaims, setIsClassifyingClaims] = useState(false);

  // Marketplace Discovery State
  const [marketplaceFilters, setMarketplaceFilters] = useState<MarketplaceFilterOptions>({
    category: "all",
    educationLevel: "all",
    format: "all",
    priceFilter: "all",
    searchQuery: ""
  });
  const [selectedResourceModal, setSelectedResourceModal] = useState<MarketplaceResource | null>(null);
  const [statusNotification, setStatusNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Creation State
  const [showCreateResourceModal, setShowCreateResourceModal] = useState(false);
  const [newResourceForm, setNewResourceForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    subject: "Mathematics",
    educationLevel: "SSS_1_3" as MarketplaceEducationLevel,
    format: "digital_textbook" as MarketplaceFormat,
    price: 3500,
    curriculumAlignment: "math_quadratics_01"
  });

  const notify = (message: string, type: "success" | "error" = "success") => {
    setStatusNotification({ message, type });
    setTimeout(() => setStatusNotification(null), 4000);
  };

  const handleRunClaimVerification = async () => {
    setIsClassifyingClaims(true);
    try {
      const roleMapped: "learner" | "teacher" | "admin" =
        activeSession.role === "ADMIN" ? "admin" : activeSession.role === "TEACHER" ? "teacher" : "learner";
      await agentOrchestrationService.orchestrateTask(
        "research_assistant_agent",
        `Classify claims and verify citations for: ${selectedProject.title}`,
        {
          userId: activeSession.userId,
          userRole: roleMapped,
          documentId: selectedProject.id
        }
      );
      setActiveAuthorTab("manuscript");
      notify("Empirical citations audited and classified successfully.");
    } finally {
      setIsClassifyingClaims(false);
    }
  };

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = bookpreneurService.createMarketplaceResource(activeSession, {
        title: newResourceForm.title,
        subtitle: newResourceForm.subtitle,
        description: newResourceForm.description,
        subject: newResourceForm.subject,
        educationLevel: newResourceForm.educationLevel,
        format: newResourceForm.format,
        price: Number(newResourceForm.price),
        curriculumAlignment: newResourceForm.curriculumAlignment.split(",").map((s) => s.trim()),
        learningSupplyIntegration: {
          linkedSkillIds: [newResourceForm.curriculumAlignment.trim()],
          linkedUnitIds: ["unit-math-algebra-s2"],
          practiceArenaDirectSkillId: newResourceForm.curriculumAlignment.trim()
        }
      });
      setShowCreateResourceModal(false);
      notify(`Draft resource '${created.title}' created in Creator Hub.`);
    } catch (err: any) {
      notify(err.message || "Failed to create resource", "error");
    }
  };

  const handleSubmitForReview = (resourceId: string) => {
    try {
      bookpreneurService.submitResourceForReview(activeSession, resourceId);
      notify("Resource submitted for institutional editorial review.");
      const updated = bookpreneurService.getMarketplaceResourceById(resourceId);
      if (updated) setSelectedResourceModal(updated);
    } catch (err: any) {
      notify(err.message || "Submission failed", "error");
    }
  };

  const handleApprove = (resourceId: string) => {
    try {
      bookpreneurService.approveResource(activeSession, resourceId, "Passed institutional curriculum alignment.");
      notify("Resource approved for publication.");
      const updated = bookpreneurService.getMarketplaceResourceById(resourceId);
      if (updated) setSelectedResourceModal(updated);
    } catch (err: any) {
      notify(err.message || "Approval failed", "error");
    }
  };

  const handlePublish = (resourceId: string) => {
    try {
      bookpreneurService.publishResource(activeSession, resourceId);
      notify("Resource published to public Marketplace catalog.");
      const updated = bookpreneurService.getMarketplaceResourceById(resourceId);
      if (updated) setSelectedResourceModal(updated);
    } catch (err: any) {
      notify(err.message || "Publishing failed", "error");
    }
  };

  const handleSuspend = (resourceId: string) => {
    try {
      bookpreneurService.suspendResource(activeSession, resourceId, "Editorial suspension for review.");
      notify("Resource suspended from public catalog.");
      const updated = bookpreneurService.getMarketplaceResourceById(resourceId);
      if (updated) setSelectedResourceModal(updated);
    } catch (err: any) {
      notify(err.message || "Suspension failed", "error");
    }
  };

  const filteredResources = bookpreneurService.getMarketplaceResources(marketplaceFilters);
  const allResourcesForAdmin =
    activeSession.role === "ADMIN" || activeSession.role === "TEACHER"
      ? bookpreneurService.getMarketplaceResources({ publicationStatus: undefined })
      : filteredResources;

  return (
    <div id="bookpreneur-studio-container" className="space-y-6">
      {/* Studio Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
              <PenTool className="h-3.5 w-3.5" />
              MOOS TECHY BOOKPRENEUR PILLAR • AUTHORING & MARKETPLACE
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Educational Publishing, Research Rigor & Codex Marketplace
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Transition from empirical STEM research to nonfiction authoring, claim-evidence classification, peer review, and digital marketplace distribution. Connect published resources directly to Khan-style Practice Arenas and QR codices without compromising canonical curriculum immutability.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-2xl bg-purple-900/50 border border-purple-700/60 text-xs flex items-center gap-2 text-purple-200">
              <span className="font-bold">Active User:</span>
              <span className="text-white font-black">{activeSession.displayName}</span>
              <span className="px-1.5 py-0.5 rounded bg-purple-600 text-[10px] font-bold uppercase text-white">
                {activeSession.role}
              </span>
            </div>

            {mainPillarTab === "authoring" && (
              <button
                id="btn-verify-claims"
                type="button"
                onClick={handleRunClaimVerification}
                disabled={isClassifyingClaims}
                className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 flex items-center gap-2 transition disabled:opacity-50 cursor-pointer"
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
            )}

            {(activeSession.role === "TEACHER" || activeSession.role === "ADMIN") && (
              <button
                id="btn-new-resource"
                type="button"
                onClick={() => setShowCreateResourceModal(true)}
                className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Create Marketplace Resource</span>
              </button>
            )}
          </div>
        </div>

        {/* Master Pillar Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-800/80 overflow-x-auto">
          <button
            type="button"
            onClick={() => setMainPillarTab("marketplace")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
              mainPillarTab === "marketplace"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <ShoppingBag className="h-4 w-4 text-purple-300" />
            <span>Bookpreneur Marketplace ({filteredResources.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setMainPillarTab("authoring")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
              mainPillarTab === "authoring"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <PenTool className="h-4 w-4 text-purple-300" />
            <span>Nonfiction Manuscript Studio</span>
          </button>

          <button
            type="button"
            onClick={() => setMainPillarTab("creator_hub")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
              mainPillarTab === "creator_hub"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Coins className="h-4 w-4 text-amber-300" />
            <span>Creator Revenue & Royalties</span>
          </button>

          {(activeSession.role === "ADMIN" || activeSession.role === "TEACHER") && (
            <button
              type="button"
              onClick={() => setMainPillarTab("governance")}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
                mainPillarTab === "governance"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <ShieldCheck className="h-4 w-4 text-rose-300" />
              <span>Editorial Approval & Governance</span>
            </button>
          )}
        </div>
      </div>

      {/* Notification Toast */}
      {statusNotification && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center justify-between shadow-lg transition animate-fade-in ${
            statusNotification.type === "success"
              ? "bg-emerald-50 border border-emerald-300 text-emerald-900"
              : "bg-rose-50 border border-rose-300 text-rose-900"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusNotification.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
            )}
            <span>{statusNotification.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusNotification(null)}
            className="text-xs text-slate-500 hover:text-slate-900"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. BOOKPRENEUR MARKETPLACE (AMAZON-STYLE EDUCATIONAL DISCOVERY)           */}
      {/* ========================================================================= */}
      {mainPillarTab === "marketplace" && (
        <div className="space-y-6">
          {/* Discovery Filter Header */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-purple-600" />
                  <span>Educational Resource Marketplace</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Approved digital textbooks, WAEC & JAMB exam codices, CPA workbooks, and teacher resources.
                </p>
              </div>

              {/* Keyword Search */}
              <div className="relative w-full md:w-72">
                <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search titles, authors, exams..."
                  value={marketplaceFilters.searchQuery || ""}
                  onChange={(e) =>
                    setMarketplaceFilters({ ...marketplaceFilters, searchQuery: e.target.value })
                  }
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" /> Filter by:
              </span>

              {/* Education Level Filter */}
              <select
                value={marketplaceFilters.educationLevel || "all"}
                onChange={(e) =>
                  setMarketplaceFilters({
                    ...marketplaceFilters,
                    educationLevel: e.target.value as MarketplaceEducationLevel | "all"
                  })
                }
                className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium focus:outline-none"
              >
                <option value="all">All Levels</option>
                <option value="WAEC_WASSCE">WAEC / WASSCE Standard</option>
                <option value="JAMB_UTME">JAMB UTME CBT</option>
                <option value="SSS_1_3">Senior Secondary (SS1-SS3)</option>
                <option value="PRIMARY">Primary Foundations</option>
                <option value="TEACHER_CPD">Teacher Professional Dev</option>
              </select>

              {/* Format Filter */}
              <select
                value={marketplaceFilters.format || "all"}
                onChange={(e) =>
                  setMarketplaceFilters({
                    ...marketplaceFilters,
                    format: e.target.value as MarketplaceFormat | "all"
                  })
                }
                className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium focus:outline-none"
              >
                <option value="all">All Formats</option>
                <option value="digital_textbook">Digital Textbook</option>
                <option value="exam_prep_guide">Exam Prep Guide</option>
                <option value="workbook">Interactive Workbook</option>
                <option value="stem_codex">STEM Codex</option>
                <option value="teacher_resource">Teacher Resource</option>
              </select>

              {/* Price Filter */}
              <select
                value={marketplaceFilters.priceFilter || "all"}
                onChange={(e) =>
                  setMarketplaceFilters({
                    ...marketplaceFilters,
                    priceFilter: e.target.value as "all" | "free" | "paid"
                  })
                }
                className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium focus:outline-none"
              >
                <option value="all">All Prices</option>
                <option value="free">Free Open Resources</option>
                <option value="paid">Commercial Codices</option>
              </select>

              {(marketplaceFilters.educationLevel !== "all" ||
                marketplaceFilters.format !== "all" ||
                marketplaceFilters.priceFilter !== "all" ||
                marketplaceFilters.searchQuery) && (
                <button
                  type="button"
                  onClick={() =>
                    setMarketplaceFilters({
                      category: "all",
                      educationLevel: "all",
                      format: "all",
                      priceFilter: "all",
                      searchQuery: ""
                    })
                  }
                  className="text-purple-600 hover:text-purple-800 font-bold text-xs underline cursor-pointer ml-auto"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Category & Level Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      {resource.educationLevel.replace(/_/g, " ")}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {resource.format.replace(/_/g, " ")}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-slate-900 leading-snug hover:text-purple-600 transition">
                      {resource.title}
                    </h3>
                    {resource.subtitle && (
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">{resource.subtitle}</p>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                    <div className="text-slate-600">
                      <span className="text-slate-400">By </span>
                      <span className="font-bold text-slate-800">{resource.creatorName}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      <span>{resource.averageRating}</span>
                      <span className="text-slate-400 font-normal">({resource.totalRatingsCount})</span>
                    </div>
                  </div>

                  {/* Learning Supply Badges */}
                  {resource.learningSupplyIntegration && (
                    <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 flex items-center justify-between text-[11px] text-purple-900 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="h-3.5 w-3.5 text-purple-600" />
                        <span>Mapped to {resource.curriculumAlignment.length} Syllabus Skills</span>
                      </div>
                      {resource.learningSupplyIntegration.qrResourceCode && (
                        <span className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-purple-200">
                          {resource.learningSupplyIntegration.qrResourceCode}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Price</span>
                    <span className="text-base font-black text-slate-900">
                      {resource.price === 0 ? (
                        <span className="text-emerald-600">FREE OER</span>
                      ) : (
                        `₦${resource.price.toLocaleString()}`
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedResourceModal(resource)}
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Preview</span>
                    </button>

                    {resource.learningSupplyIntegration?.practiceArenaDirectSkillId && onNavigateToPractice && (
                      <button
                        type="button"
                        onClick={() =>
                          onNavigateToPractice(resource.learningSupplyIntegration!.practiceArenaDirectSkillId!)
                        }
                        className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition cursor-pointer"
                      >
                        <Compass className="h-3.5 w-3.5" />
                        <span>Practice</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CREATOR REVENUE & COMMERCIAL MODEL                                     */}
      {/* ========================================================================= */}
      {mainPillarTab === "creator_hub" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Commercial Architecture</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">Creator Economics & Royalty Projections</h2>
              <p className="text-xs text-slate-500">Transparent 70/30 creator revenue split, institutional site licensing, and print companion calculations.</p>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-slate-500 block">Creator Split</span>
              <span className="text-2xl font-black text-emerald-600">70% Creator / 30% Platform</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200/80 space-y-1">
              <span className="text-xs font-bold text-purple-900 block uppercase">Standard Digital License</span>
              <p className="text-xl font-black text-purple-950">₦4,500 <span className="text-xs font-medium text-purple-700">/ learner</span></p>
              <p className="text-[11px] text-purple-700">Creator receives ₦3,150 per direct acquisition.</p>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200/80 space-y-1">
              <span className="text-xs font-bold text-indigo-900 block uppercase">Institutional School License</span>
              <p className="text-xl font-black text-indigo-950">₦45,000 <span className="text-xs font-medium text-indigo-700">/ school / yr</span></p>
              <p className="text-[11px] text-indigo-700">Covers up to 250 learners. Creator receives ₦31,500.</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-1">
              <span className="text-xs font-bold text-emerald-900 block uppercase">Print Companion Codex</span>
              <p className="text-xl font-black text-emerald-950">₦8,500 <span className="text-xs font-medium text-emerald-700">/ bound book</span></p>
              <p className="text-[11px] text-emerald-700">Includes QR codex integration with mobile practice sync.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-sm font-black text-slate-900">Commercial Architecture Principles</h3>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>No Hidden Curriculum:</strong> Commercial books enrich learning supply but NEVER overwrite canonical syllabus datasets.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Privacy-Preserving Recommendations:</strong> Learners receiving practice recommendations based on diagnostic bottlenecks do NOT expose their personal identities or marks to external authors.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Creator Isolation:</strong> Authors cannot edit another creator's draft manuscripts or access unrelated classroom audit logs.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. EDITORIAL APPROVAL & GOVERNANCE PIPELINE                               */}
      {/* ========================================================================= */}
      {mainPillarTab === "governance" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Institutional Governance</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">Resource Editorial Review & Publication Pipeline</h2>
              <p className="text-xs text-slate-500">Authorized human review of teacher and creator educational codices before public marketplace release.</p>
            </div>

            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
              {allResourcesForAdmin.length} Managed Resources
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Resource Title</th>
                  <th className="p-3">Creator</th>
                  <th className="p-3">Level & Format</th>
                  <th className="p-3">Provenance</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allResourcesForAdmin.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3 font-black text-slate-900 max-w-xs truncate">
                      {res.title}
                    </td>
                    <td className="p-3 text-slate-600">{res.creatorName}</td>
                    <td className="p-3 text-slate-600">
                      <span className="font-semibold">{res.educationLevel}</span> • {res.format}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        res.provenance === "OFFICIAL_SYLLABUS"
                          ? "bg-blue-100 text-blue-800"
                          : res.provenance === "TEACHER_AUTHORED"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {res.provenance.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        res.publicationStatus === "PUBLISHED"
                          ? "bg-emerald-100 text-emerald-800"
                          : res.publicationStatus === "APPROVED"
                          ? "bg-blue-100 text-blue-800"
                          : res.publicationStatus === "UNDER_REVIEW"
                          ? "bg-amber-100 text-amber-800"
                          : res.publicationStatus === "SUSPENDED"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-slate-200 text-slate-700"
                      }`}>
                        {res.publicationStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedResourceModal(res)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                      >
                        Inspect
                      </button>

                      {res.publicationStatus === "UNDER_REVIEW" && (
                        <button
                          type="button"
                          onClick={() => handleApprove(res.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
                        >
                          Approve
                        </button>
                      )}

                      {res.publicationStatus === "APPROVED" && (
                        <button
                          type="button"
                          onClick={() => handlePublish(res.id)}
                          className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold cursor-pointer"
                        >
                          Publish
                        </button>
                      )}

                      {res.publicationStatus === "PUBLISHED" && (
                        <button
                          type="button"
                          onClick={() => handleSuspend(res.id)}
                          className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold cursor-pointer"
                        >
                          Suspend
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. NONFICTION MANUSCRIPT STUDIO                                           */}
      {/* ========================================================================= */}
      {mainPillarTab === "authoring" && (
        <div className="space-y-6">
          {/* Sub Tab Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto bg-slate-100 p-1.5 rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveAuthorTab("positioning")}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
                activeAuthorTab === "positioning"
                  ? "bg-white text-purple-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>Market Positioning & Thesis</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAuthorTab("promise")}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
                activeAuthorTab === "promise"
                  ? "bg-white text-purple-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Award className="h-4 w-4" />
              <span>Reader Promise Matrix</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAuthorTab("research")}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
                activeAuthorTab === "research"
                  ? "bg-white text-purple-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Search className="h-4 w-4" />
              <span>Research & Citations ({selectedProject.researchBibliography.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAuthorTab("manuscript")}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
                activeAuthorTab === "manuscript"
                  ? "bg-white text-purple-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Manuscript & Claim Rigor</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAuthorTab("editorial")}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
                activeAuthorTab === "editorial"
                  ? "bg-white text-purple-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileCheck className="h-4 w-4" />
              <span>Editorial & Publishing Prep</span>
            </button>
          </div>

          {/* Sub Tab: Positioning */}
          {activeAuthorTab === "positioning" && (
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

              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Comparable Titles & Gaps Addressed</h3>
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

          {/* Sub Tab: Reader Promise */}
          {activeAuthorTab === "promise" && (
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

          {/* Sub Tab: Research */}
          {activeAuthorTab === "research" && (
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

          {/* Sub Tab: Manuscript & Claim Rigor */}
          {activeAuthorTab === "manuscript" && selectedSection && (
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

          {/* Sub Tab: Editorial & Publishing Prep */}
          {activeAuthorTab === "editorial" && (
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
      )}

      {/* ========================================================================= */}
      {/* RESOURCE PREVIEW & DETAIL MODAL                                           */}
      {/* ========================================================================= */}
      {selectedResourceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    {selectedResourceModal.educationLevel.replace(/_/g, " ")}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {selectedResourceModal.format.replace(/_/g, " ")}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    v{selectedResourceModal.version}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mt-1">{selectedResourceModal.title}</h3>
                <p className="text-xs text-slate-500">{selectedResourceModal.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedResourceModal(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-slate-700 leading-relaxed">{selectedResourceModal.description}</p>

              {/* Excerpt Preview */}
              {selectedResourceModal.previewSections && selectedResourceModal.previewSections.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 uppercase block">Sample Excerpt</span>
                  <p className="italic text-slate-700 leading-relaxed font-serif">
                    "{selectedResourceModal.previewSections[0].contentExcerpt}"
                  </p>
                </div>
              )}

              {/* Linked Skills & Khan Practice Bridge */}
              {selectedResourceModal.learningSupplyIntegration && (
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-3">
                  <span className="font-black text-purple-950 uppercase block">Khan-Style Learning Supply Bridge</span>
                  <p className="text-purple-800 text-[11px]">
                    This educational resource provides direct practice drills and QR code scaffolding on the following syllabus competencies:
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedResourceModal.curriculumAlignment.map((skillId) => (
                      <span key={skillId} className="px-2.5 py-1 rounded-lg bg-white border border-purple-200 text-purple-900 font-bold text-[11px]">
                        {skillId}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    {selectedResourceModal.learningSupplyIntegration.practiceArenaDirectSkillId && onNavigateToPractice && (
                      <button
                        type="button"
                        onClick={() => {
                          onNavigateToPractice(selectedResourceModal.learningSupplyIntegration!.practiceArenaDirectSkillId!);
                          setSelectedResourceModal(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <Compass className="h-4 w-4" />
                        <span>Launch Skill Practice Arena</span>
                      </button>
                    )}

                    {selectedResourceModal.learningSupplyIntegration.qrResourceCode && onNavigateToQRHub && (
                      <button
                        type="button"
                        onClick={() => {
                          onNavigateToQRHub(selectedResourceModal.learningSupplyIntegration!.qrResourceCode!);
                          setSelectedResourceModal(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-purple-900 border border-purple-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <QrCode className="h-4 w-4 text-purple-600" />
                        <span>Open QR Companion</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Commercial Price & Economics */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Price</span>
                  <span className="text-xl font-black text-slate-900">
                    {selectedResourceModal.price === 0 ? "FREE OPEN RESOURCE" : `₦${selectedResourceModal.price.toLocaleString()}`}
                  </span>
                </div>

                <div className="text-right text-[11px] text-slate-500">
                  <span>Author Royalty: 70% • Platform Support: 30%</span>
                </div>
              </div>

              {/* Status & Review Pipeline Actions */}
              {(activeSession.role === "TEACHER" || activeSession.role === "ADMIN") && (
                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  {selectedResourceModal.publicationStatus === "DRAFT" && (
                    <button
                      type="button"
                      onClick={() => handleSubmitForReview(selectedResourceModal.id)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer"
                    >
                      Submit for Peer Review
                    </button>
                  )}

                  {selectedResourceModal.publicationStatus === "UNDER_REVIEW" && (
                    <button
                      type="button"
                      onClick={() => handleApprove(selectedResourceModal.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
                    >
                      Approve Resource
                    </button>
                  )}

                  {selectedResourceModal.publicationStatus === "APPROVED" && (
                    <button
                      type="button"
                      onClick={() => handlePublish(selectedResourceModal.id)}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer"
                    >
                      Publish to Marketplace
                    </button>
                  )}

                  {selectedResourceModal.publicationStatus === "PUBLISHED" && (
                    <button
                      type="button"
                      onClick={() => handleSuspend(selectedResourceModal.id)}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer"
                    >
                      Suspend Listing
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CREATE NEW MARKETPLACE RESOURCE MODAL                                     */}
      {/* ========================================================================= */}
      {showCreateResourceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateResource}
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">Create New Educational Marketplace Resource</h3>
              <button
                type="button"
                onClick={() => setShowCreateResourceModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SSS3 Pure Mathematics & Calculus Scaffolding"
                  value={newResourceForm.title}
                  onChange={(e) => setNewResourceForm({ ...newResourceForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subtitle / Transformation Promise</label>
                <input
                  type="text"
                  placeholder="e.g. 50+ Worked Derivations with Diagnostic Hint Ladders"
                  value={newResourceForm.subtitle}
                  onChange={(e) => setNewResourceForm({ ...newResourceForm, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description & Scope</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Comprehensive description of topics covered and target examination standard..."
                  value={newResourceForm.description}
                  onChange={(e) => setNewResourceForm({ ...newResourceForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Education Level</label>
                  <select
                    value={newResourceForm.educationLevel}
                    onChange={(e) =>
                      setNewResourceForm({ ...newResourceForm, educationLevel: e.target.value as MarketplaceEducationLevel })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  >
                    <option value="SSS_1_3">Senior Secondary (SS1-SS3)</option>
                    <option value="WAEC_WASSCE">WAEC / WASSCE Standard</option>
                    <option value="JAMB_UTME">JAMB UTME CBT</option>
                    <option value="PRIMARY">Primary Foundations</option>
                    <option value="TEACHER_CPD">Teacher Professional Dev</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Format</label>
                  <select
                    value={newResourceForm.format}
                    onChange={(e) =>
                      setNewResourceForm({ ...newResourceForm, format: e.target.value as MarketplaceFormat })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  >
                    <option value="digital_textbook">Digital Textbook</option>
                    <option value="exam_prep_guide">Exam Prep Guide</option>
                    <option value="workbook">Interactive Workbook</option>
                    <option value="stem_codex">STEM Codex</option>
                    <option value="teacher_resource">Teacher Resource</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price (NGN) - 0 for Free OER</label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={newResourceForm.price}
                    onChange={(e) => setNewResourceForm({ ...newResourceForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Linked Syllabus Skill ID</label>
                  <input
                    type="text"
                    value={newResourceForm.curriculumAlignment}
                    onChange={(e) => setNewResourceForm({ ...newResourceForm, curriculumAlignment: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowCreateResourceModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Create Draft Resource
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
