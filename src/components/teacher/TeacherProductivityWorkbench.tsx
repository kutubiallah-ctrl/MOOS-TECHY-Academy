import React, { useState } from "react";
import {
  Calendar,
  Layers,
  FileCheck2,
  Users,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  ShieldCheck,
  ChevronRight,
  BarChart3,
  Search,
  BookMarked,
  Send,
  ClipboardList,
  Target,
  UserCheck,
  BrainCircuit,
  Filter,
  Check,
  Copy,
  FolderOpen,
  HelpCircle,
  TrendingUp,
  Activity,
  Flame,
  Zap,
  Eye,
  Sliders,
  CheckSquare,
  XCircle,
  Play,
  Printer,
  Edit3,
  Save,
  Trash2,
  Share2,
  Award,
  Lock,
  RefreshCw,
  Compass,
  FileText
} from "lucide-react";
import { EducationalMaterialType, TeacherEducationalMaterial } from "../../types/aiTeacherCopilot";
import { aiTeacherCopilotService } from "../../services/aiTeacherCopilotService";
import { curriculumService } from "../../services/curriculumService";
import { TeacherClassroom } from "../../types/teacherStudio";
import { EducationalLevel } from "../../types/curriculum";

export type TeacherWorkbenchCategory =
  | "plan"
  | "create"
  | "assess"
  | "differentiate"
  | "support"
  | "analyse";

const getMaterialTypeString = (m: TeacherEducationalMaterial | null | undefined): string => {
  if (!m) return "material";
  const rawType = m.materialType || m.type || "material";
  return String(rawType).replace(/_/g, " ");
};

const getMaterialBody = (m: TeacherEducationalMaterial | null | undefined): string => {
  if (!m) return "";
  if (m.body && m.body.trim()) return m.body;

  const parts: string[] = [];
  if (m.learningObjectives?.length) {
    parts.push(`## LEARNING OBJECTIVES\n` + m.learningObjectives.map((o) => `• ${o}`).join("\n"));
  }
  if (m.prerequisiteKnowledge?.length) {
    parts.push(`## PREREQUISITE KNOWLEDGE\n` + m.prerequisiteKnowledge.map((p) => `• ${p}`).join("\n"));
  }
  if (m.instructionalMaterials?.length) {
    parts.push(`## INSTRUCTIONAL MATERIALS\n` + m.instructionalMaterials.map((item) => `• ${item}`).join("\n"));
  }
  if (m.sections?.length) {
    parts.push(
      m.sections
        .map(
          (s) =>
            `### ${s.heading}${s.subheading ? ` — ${s.subheading}` : ""}\n${s.content}${
              s.teacherGuidance ? `\n\n*Teacher Guidance:* ${s.teacherGuidance}` : ""
            }`
        )
        .join("\n\n")
    );
  }
  if (m.questions?.length) {
    parts.push(
      `## ASSESSMENT & EXERCISE QUESTIONS\n` +
        m.questions
          .map(
            (q, idx) =>
              `${idx + 1}. ${q.stem}${
                q.options ? `\n   ${q.options.map((opt, oi) => `${String.fromCharCode(65 + oi)}) ${opt}`).join("\n   ")}` : ""
              }\n\n   *Answer:* ${q.answerKey}\n   *Explanation:* ${q.stepByStepExplanation}`
          )
          .join("\n\n")
    );
  }
  if (m.exitTicket) {
    parts.push(`## EXIT TICKET\nPrompt: ${m.exitTicket.prompt}\nSample Response: ${m.exitTicket.sampleCorrectResponse}`);
  }

  return parts.length > 0 ? parts.join("\n\n---\n\n") : "Instructional material content is being prepared.";
};

interface TeacherProductivityWorkbenchProps {
  classrooms: TeacherClassroom[];
  selectedClassId: string;
  onSelectClassId: (id: string) => void;
  onDispatchAssignment?: (material: TeacherEducationalMaterial) => void;
  onNavigateToQRHub?: (code: string) => void;
}

export const TeacherProductivityWorkbench: React.FC<TeacherProductivityWorkbenchProps> = ({
  classrooms,
  selectedClassId,
  onSelectClassId,
  onDispatchAssignment,
  onNavigateToQRHub
}) => {
  const [activeCategory, setActiveCategory] = useState<TeacherWorkbenchCategory>("plan");
  const [materials, setMaterials] = useState<TeacherEducationalMaterial[]>(() =>
    aiTeacherCopilotService.getMaterials()
  );
  const [selectedMaterial, setSelectedMaterial] = useState<TeacherEducationalMaterial | null>(
    () => aiTeacherCopilotService.getMaterials()[0] || null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(() => (selectedMaterial ? selectedMaterial.title : ""));
  const [editedContent, setEditedContent] = useState(() => (selectedMaterial ? getMaterialBody(selectedMaterial) : ""));
  const [naturalLanguageInput, setNaturalLanguageInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [selectedLevel, setSelectedLevel] = useState<EducationalLevel>("senior_secondary");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Entitlement Simulation state (Free vs Pro vs Creator Premium)
  const [entitlementTier, setEntitlementTier] = useState<"FREE_TEACHER" | "TEACHER_PRO" | "CREATOR_PREMIUM">("TEACHER_PRO");
  const [isSafeDemoMode, setIsSafeDemoMode] = useState(false);

  const QUICK_PROMPTS = [
    {
      label: "SS1 Quadratic Lesson",
      prompt: "Prepare a 40 minute SS1 Mathematics lesson on quadratic equations.",
      category: "plan" as TeacherWorkbenchCategory,
      type: "lesson_plan" as EducationalMaterialType
    },
    {
      label: "Differentiated Simultaneous Equations",
      prompt: "Create a differentiated worksheet on simultaneous equations.",
      category: "differentiate" as TeacherWorkbenchCategory,
      type: "worksheet" as EducationalMaterialType
    },
    {
      label: "JSS2 English Concord Assessment",
      prompt: "Create a JSS2 English concord assessment.",
      category: "assess" as TeacherWorkbenchCategory,
      type: "quiz" as EducationalMaterialType
    },
    {
      label: "Physics Vectors Revision",
      prompt: "Prepare a Physics revision lesson on vectors.",
      category: "plan" as TeacherWorkbenchCategory,
      type: "revision_material" as EducationalMaterialType
    },
    {
      label: "Algebra 1 Diagnostic",
      prompt: "Create a diagnostic test for learners preparing for Algebra 1.",
      category: "assess" as TeacherWorkbenchCategory,
      type: "quiz" as EducationalMaterialType
    }
  ];

  const handleSelectMaterial = (m: TeacherEducationalMaterial) => {
    setSelectedMaterial(m);
    setEditedTitle(m.title);
    setEditedContent(getMaterialBody(m));
    setIsEditing(false);
  };

  const handleRunPrompt = async (promptText: string, materialType?: EducationalMaterialType) => {
    setIsGenerating(true);
    setNaturalLanguageInput(promptText);

    try {
      const pkg = await aiTeacherCopilotService.prepareSynchronizedLessonPackage({
        subject: selectedSubject,
        topic: promptText.slice(0, 60),
        level: selectedLevel,
        durationMinutes: 40,
        cohortId: selectedClassId,
        specialInstructions: promptText
      });

      const updated = aiTeacherCopilotService.getMaterials();
      setMaterials(updated);

      if (materialType) {
        const found = updated.find((m) => (m.materialType || m.type) === materialType);
        if (found) handleSelectMaterial(found);
      } else if (pkg.materials && pkg.materials[0]) {
        handleSelectMaterial(pkg.materials[0]);
      } else if (pkg.lessonPlan) {
        handleSelectMaterial(pkg.lessonPlan);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApproveMaterial = (materialId: string) => {
    const updated = aiTeacherCopilotService.approveMaterial(materialId, "usr_teacher_lead", "Lead Subject Master");
    if (updated) {
      setMaterials(aiTeacherCopilotService.getMaterials());
      setSelectedMaterial(updated);
    }
  };

  const handleSaveEdit = () => {
    if (!selectedMaterial) return;
    const updated = aiTeacherCopilotService.updateMaterial(selectedMaterial.id, {
      title: editedTitle,
      body: editedContent
    });
    if (updated) {
      setMaterials(aiTeacherCopilotService.getMaterials());
      setSelectedMaterial(updated);
      setIsEditing(false);
    }
  };

  const handleDuplicate = () => {
    if (!selectedMaterial) return;
    const copy = aiTeacherCopilotService.duplicateMaterial(selectedMaterial.id);
    setMaterials(aiTeacherCopilotService.getMaterials());
    handleSelectMaterial(copy);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="teacher-productivity-workbench" className="space-y-6">
      {/* 1. Header with Entitlement Badge & Demo Mode Toggle */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              Teacher Productivity Workbench
            </span>
            {isSafeDemoMode && (
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                Safe Demo Mode Active
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Professional Instructional Studio & Copilot
          </h2>
          <p className="text-xs text-slate-500">
            Organised across purposeful pedagogical areas: Plan, Create, Assess, Differentiate, Support, and Analyse.
          </p>
        </div>

        {/* Entitlement Tiers & Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-medium">
            <button
              type="button"
              onClick={() => setEntitlementTier("FREE_TEACHER")}
              className={`px-3 py-1 rounded-lg transition ${
                entitlementTier === "FREE_TEACHER"
                  ? "bg-white text-slate-900 font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Free Teacher
            </button>
            <button
              type="button"
              onClick={() => setEntitlementTier("TEACHER_PRO")}
              className={`px-3 py-1 rounded-lg transition ${
                entitlementTier === "TEACHER_PRO"
                  ? "bg-indigo-600 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Teacher Pro ★
            </button>
            <button
              type="button"
              onClick={() => setEntitlementTier("CREATOR_PREMIUM")}
              className={`px-3 py-1 rounded-lg transition ${
                entitlementTier === "CREATOR_PREMIUM"
                  ? "bg-amber-600 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Creator Premium 👑
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsSafeDemoMode(!isSafeDemoMode)}
            className={`text-xs px-3 py-1.5 rounded-xl border font-semibold transition ${
              isSafeDemoMode
                ? "bg-amber-50 border-amber-300 text-amber-900"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {isSafeDemoMode ? "Exit Demo" : "Manufacturer Demo Mode"}
          </button>
        </div>
      </div>

      {/* 2. Natural Language Prompt Runner */}
      <div className="rounded-2xl border-2 border-indigo-200 bg-white p-5 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              AI Teacher Copilot Natural Language Generator
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Human-Review Governance Enforced
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={naturalLanguageInput}
            onChange={(e) => setNaturalLanguageInput(e.target.value)}
            placeholder="e.g. Prepare a 40 minute SS1 Mathematics lesson on quadratic equations..."
            className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => handleRunPrompt(naturalLanguageInput || QUICK_PROMPTS[0].prompt)}
            disabled={isGenerating}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition shadow-xs disabled:bg-slate-300"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                <span>Generate Resource</span>
              </>
            )}
          </button>
        </div>

        {/* Suggested Quick Prompts */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-[11px] font-semibold text-slate-400">Quick Prompts:</span>
          {QUICK_PROMPTS.map((qp, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleRunPrompt(qp.prompt, qp.type)}
              className="text-[11px] font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition"
            >
              {qp.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. The 6 Workbench Task Area Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        <button
          type="button"
          id="tab-workbench-plan"
          onClick={() => setActiveCategory("plan")}
          className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeCategory === "plan"
              ? "border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold shadow-xs"
              : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider">1. PLAN</span>
            <Calendar className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Lesson Plans, Notes, Scheme of Work</p>
        </button>

        <button
          type="button"
          id="tab-workbench-create"
          onClick={() => setActiveCategory("create")}
          className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeCategory === "create"
              ? "border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold shadow-xs"
              : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider">2. CREATE</span>
            <FileText className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Worksheets, Quizzes, Flashcards</p>
        </button>

        <button
          type="button"
          id="tab-workbench-assess"
          onClick={() => setActiveCategory("assess")}
          className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeCategory === "assess"
              ? "border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold shadow-xs"
              : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider">3. ASSESS</span>
            <ClipboardList className="h-4 w-4 text-rose-600" />
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Diagnostics, Tests, Rubrics</p>
        </button>

        <button
          type="button"
          id="tab-workbench-differentiate"
          onClick={() => setActiveCategory("differentiate")}
          className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeCategory === "differentiate"
              ? "border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold shadow-xs"
              : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider">4. DIFFERENTIATE</span>
            <Sliders className="h-4 w-4 text-purple-600" />
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Foundations, Remedial, Extension</p>
        </button>

        <button
          type="button"
          id="tab-workbench-support"
          onClick={() => setActiveCategory("support")}
          className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeCategory === "support"
              ? "border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold shadow-xs"
              : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider">5. SUPPORT</span>
            <Users className="h-4 w-4 text-amber-600" />
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Parent Messages, Feedback</p>
        </button>

        <button
          type="button"
          id="tab-workbench-analyse"
          onClick={() => setActiveCategory("analyse")}
          className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeCategory === "analyse"
              ? "border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold shadow-xs"
              : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider">6. ANALYSE</span>
            <BarChart3 className="h-4 w-4 text-sky-600" />
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Mastery Heatmaps, Bottlenecks</p>
        </button>
      </div>

      {/* 4. Main Two-Column Teacher Workspace: Material Drawer & Rich Inspector */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left: Material List / Task Area Explorer */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Instructional Materials ({materials.length})
              </span>
              <button
                type="button"
                onClick={() => handleRunPrompt("Prepare a 40 minute SS1 Mathematics lesson on quadratic equations.")}
                className="text-xs font-semibold text-indigo-600 hover:underline inline-flex items-center gap-1"
              >
                <Plus className="h-3 w-3" /> New
              </button>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {materials.map((mat) => {
                const isSelected = selectedMaterial?.id === mat.id;
                const isApproved =
                  mat.lifecycleStatus === "approved" ||
                  mat.status === "approved" ||
                  mat.humanReviewDecision === "approved";

                return (
                  <div
                    key={mat.id}
                    onClick={() => handleSelectMaterial(mat)}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer space-y-1.5 ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/50 shadow-2xs"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold uppercase tracking-wider text-indigo-700">
                        {getMaterialTypeString(mat)}
                      </span>
                      {isApproved ? (
                        <span className="inline-flex items-center gap-0.5 text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 text-[10px]">
                          <CheckCircle2 className="h-3 w-3" /> Approved
                        </span>
                      ) : (
                        <span className="text-amber-800 font-medium bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 text-[10px]">
                          AI Draft
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{mat.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{getMaterialBody(mat)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Dedicated Teacher Workspace (View, Edit, Save, Approve, Dispatch, Print, Duplicate) */}
        <div className="lg:col-span-8">
          {selectedMaterial ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
              {/* Workspace Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded">
                      {getMaterialTypeString(selectedMaterial)}
                    </span>
                    {selectedMaterial.lifecycleStatus === "approved" ||
                    selectedMaterial.status === "approved" ||
                    selectedMaterial.humanReviewDecision === "approved" ? (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Approved by{" "}
                        {typeof selectedMaterial.approvedBy === "string"
                          ? selectedMaterial.approvedBy
                          : selectedMaterial.reviewedBy ||
                            selectedMaterial.teacherDisplayName ||
                            "Lead Educator"}
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Pending Teacher Certification
                      </span>
                    )}
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="text-base font-bold text-slate-900 border border-indigo-400 rounded-lg px-2 py-1 w-full"
                    />
                  ) : (
                    <h3 className="text-lg font-bold text-slate-900">{selectedMaterial.title}</h3>
                  )}
                </div>

                {/* Workspace Action Buttons */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {isEditing ? (
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition"
                    >
                      <Save className="h-3.5 w-3.5" />
                      <span>Save Changes</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleDuplicate}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                    title="Duplicate material"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>Duplicate</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                    title="Print material"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>Print</span>
                  </button>

                  {selectedMaterial.lifecycleStatus !== "approved" &&
                    selectedMaterial.status !== "approved" &&
                    selectedMaterial.humanReviewDecision !== "approved" && (
                      <button
                        type="button"
                        onClick={() => handleApproveMaterial(selectedMaterial.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition shadow-2xs"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Approve Resource</span>
                      </button>
                    )}

                  {onDispatchAssignment && (
                    <button
                      type="button"
                      onClick={() => onDispatchAssignment(selectedMaterial)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition shadow-2xs"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Dispatch to Class</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Workspace Content Display */}
              <div className="space-y-4">
                {isEditing ? (
                  <textarea
                    rows={14}
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full font-mono text-xs text-slate-800 p-4 border border-slate-300 rounded-xl focus:border-indigo-600 focus:outline-none"
                  />
                ) : (
                  <div className="prose prose-slate max-w-none text-xs leading-relaxed whitespace-pre-wrap font-sans bg-slate-50/50 p-5 rounded-2xl border border-slate-200">
                    {getMaterialBody(selectedMaterial)}
                  </div>
                )}
              </div>

              {/* Provenance and Governance Note */}
              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-[11px] text-slate-600 flex items-center justify-between">
                <span>
                  Author:{" "}
                  <strong className="text-slate-800">
                    {selectedMaterial.authorName ||
                      selectedMaterial.teacherDisplayName ||
                      "Certified Educator"}
                  </strong>{" "}
                  • Target:{" "}
                  {selectedMaterial.targetAudience ||
                    (selectedMaterial.targetLevel
                      ? String(selectedMaterial.targetLevel).replace(/_/g, " ")
                      : "General Secondary")}
                </span>
                <span className="font-mono text-slate-400">
                  ID: {selectedMaterial.id}
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500">
              Select or generate a material to open the workspace.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
