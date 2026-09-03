/**
 * MOOS TECHY ACADEMY — AI TEACHER COPILOT STUDIO
 * 
 * Primary Teacher Productivity Interface:
 * - Natural language request parsing & minimal clarification
 * - Quick access to 14 educational material types
 * - One-click "Prepare My Lesson" synchronized package synthesis
 * - Split/Responsive Desktop & Mobile preview and inline editing
 * - Human review certification & provenance governance
 * - Material transformation (Plan -> Note -> Worksheet -> Quiz -> Exit Ticket)
 * - Direct assignment distribution & duplicate/reuse across cohorts
 */

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  BookOpen,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Layers,
  Send,
  Plus,
  Copy,
  Edit3,
  Save,
  Check,
  ShieldCheck,
  Zap,
  HelpCircle,
  QrCode,
  ArrowRight,
  Filter,
  Search,
  BookMarked,
  Sliders,
  ChevronDown,
  Trash2,
  Printer,
  FileCheck
} from "lucide-react";
import {
  EducationalMaterialType,
  TeacherEducationalMaterial,
  PreparedLessonPackage,
  StructuredMaterialQuestion
} from "../types/aiTeacherCopilot";
import { EducationalLevel } from "../types/curriculum";
import { TeacherClassroom } from "../types/teacherStudio";
import { aiTeacherCopilotService } from "../services/aiTeacherCopilotService";
import { curriculumService } from "../services/curriculumService";

interface TeacherCopilotStudioProps {
  classrooms: TeacherClassroom[];
  selectedClassId: string;
  onSelectClassId: (classId: string) => void;
  onNavigateToQRHub?: (code: string) => void;
  onAssignmentCreated?: () => void;
}

const MATERIAL_TYPE_LABELS: Record<EducationalMaterialType, { label: string; icon: string }> = {
  lesson_plan: { label: "Lesson Plan", icon: "📋" },
  lesson_note: { label: "Lesson Note", icon: "📝" },
  worksheet: { label: "Worksheet", icon: "📄" },
  quiz: { label: "Quiz", icon: "❓" },
  assignment: { label: "Assignment", icon: "📚" },
  class_test: { label: "Class Test", icon: "⏱️" },
  revision_material: { label: "Revision Material", icon: "🔄" },
  homework: { label: "Homework", icon: "🏠" },
  remedial_activity: { label: "Remedial Activity", icon: "🩹" },
  extension_activity: { label: "Extension Activity", icon: "🚀" },
  answer_key: { label: "Answer Key", icon: "🔑" },
  marking_scheme: { label: "Marking Scheme", icon: "📐" },
  exit_ticket: { label: "Exit Ticket", icon: "🎟️" },
  study_guide: { label: "Study Guide", icon: "💡" }
};

const SUGGESTED_PROMPTS = [
  "Prepare a 40 minute SS1 Mathematics lesson on quadratic equations.",
  "I need a JSS2 English worksheet on subject verb agreement for learners who are struggling.",
  "Create a Primary 6 science revision activity on electricity.",
  "Prepare an ICT quiz for SS2 on database normalization.",
  "Turn this lesson plan into a comprehensive teaching note."
];

export const TeacherCopilotStudio: React.FC<TeacherCopilotStudioProps> = ({
  classrooms,
  selectedClassId,
  onSelectClassId,
  onNavigateToQRHub,
  onAssignmentCreated
}) => {
  const [materials, setMaterials] = useState<TeacherEducationalMaterial[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<TeacherEducationalMaterial | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterGovernance, setFilterGovernance] = useState<string>("all");

  // Input & Generation State
  const [promptInput, setPromptInput] = useState("");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [clarificationNeeded, setClarificationNeeded] = useState<string | null>(null);
  const [selectedTypePill, setSelectedTypePill] = useState<EducationalMaterialType>("lesson_plan");

  // Editing & Review State
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editObjectives, setEditObjectives] = useState<string[]>([]);
  const [editContent, setEditContent] = useState("");
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalNotes, setApprovalNotes] = useState("");
  const [showTransformMenu, setShowTransformMenu] = useState(false);
  const [showDispatchSuccess, setShowDispatchSuccess] = useState(false);
  const [activeMaterialTab, setActiveMaterialTab] = useState<"sections" | "questions" | "differentiation" | "remedial" | "exitTicket" | "governance">("sections");

  // One-click package state
  const [preparedPackage, setPreparedPackage] = useState<PreparedLessonPackage | null>(null);
  const [showPackageModal, setShowPackageModal] = useState(false);

  useEffect(() => {
    reloadMaterials();
  }, [selectedClassId]);

  const reloadMaterials = () => {
    const all = aiTeacherCopilotService.getAllMaterials();
    setMaterials(all);
    if (all.length > 0 && !selectedMaterial) {
      setSelectedMaterial(all[0]);
    }
  };

  const activeClass = classrooms.find((c) => c.id === selectedClassId) || classrooms[0];

  // Start Generation
  const handleSynthesize = async (overridePrompt?: string, overrideType?: EducationalMaterialType) => {
    const rawPrompt = overridePrompt || promptInput;
    if (!rawPrompt.trim() && !overrideType) return;

    // Check minimal clarification
    const parsed = aiTeacherCopilotService.parsePrompt(rawPrompt, {
      classroomId: activeClass?.id,
      level: activeClass?.gradeLevel,
      subjectId: activeClass?.subjectId
    });

    if (parsed.missingEssentialField && !overridePrompt) {
      setClarificationNeeded(parsed.clarificationPrompt || "Which topic should I prepare this for?");
      return;
    }

    setClarificationNeeded(null);
    setIsSynthesizing(true);
    try {
      const newMat = await aiTeacherCopilotService.generateMaterial({
        rawPrompt,
        materialType: overrideType || selectedTypePill,
        classroomId: activeClass?.id,
        level: activeClass?.gradeLevel,
        subjectId: activeClass?.subjectId
      });

      reloadMaterials();
      setSelectedMaterial(newMat);
      setPromptInput("");
      setActiveMaterialTab("sections");
    } catch (err) {
      console.error("Material synthesis error", err);
    } finally {
      setIsSynthesizing(false);
    }
  };

  // One-Click "Prepare My Lesson"
  const handlePrepareMyLesson = async () => {
    if (!activeClass) return;
    setIsSynthesizing(true);
    try {
      const pkg = await aiTeacherCopilotService.prepareMyLessonPackage(activeClass.id);
      setPreparedPackage(pkg);
      setShowPackageModal(true);
      reloadMaterials();
      setSelectedMaterial(pkg.lessonPlan);
    } catch (err) {
      console.error("Lesson package synthesis error", err);
    } finally {
      setIsSynthesizing(false);
    }
  };

  // Transform Material
  const handleTransform = async (targetType: EducationalMaterialType) => {
    if (!selectedMaterial) return;
    setShowTransformMenu(false);
    setIsSynthesizing(true);
    try {
      const transformed = await aiTeacherCopilotService.transformMaterial(selectedMaterial.id, targetType);
      reloadMaterials();
      setSelectedMaterial(transformed);
      setActiveMaterialTab("sections");
    } catch (err) {
      console.error("Transformation error", err);
    } finally {
      setIsSynthesizing(false);
    }
  };

  // Approve & Certify
  const handleApprove = () => {
    if (!selectedMaterial) return;
    const approved = aiTeacherCopilotService.approveMaterial(
      selectedMaterial.id,
      "usr_tch_babatunde_ojo",
      "Babatunde Ojo",
      approvalNotes || "Certified compliant with academic curriculum guidelines."
    );
    setSelectedMaterial(approved);
    setShowApprovalModal(false);
    setApprovalNotes("");
    reloadMaterials();
  };

  // Enter Edit Mode
  const startEditing = () => {
    if (!selectedMaterial) return;
    setEditTitle(selectedMaterial.title);
    setEditObjectives([...selectedMaterial.learningObjectives]);
    setEditContent(selectedMaterial.sections.map((s) => `### ${s.heading}\n${s.content}`).join("\n\n"));
    setIsEditing(true);
  };

  // Save Edits
  const saveEdits = () => {
    if (!selectedMaterial) return;
    const updated = aiTeacherCopilotService.updateMaterial(selectedMaterial.id, {
      title: editTitle,
      learningObjectives: editObjectives
    });
    setSelectedMaterial(updated);
    setIsEditing(false);
    reloadMaterials();
  };

  // Duplicate Material
  const handleDuplicate = () => {
    if (!selectedMaterial) return;
    const duplicated = aiTeacherCopilotService.duplicateMaterial(selectedMaterial.id, activeClass?.id);
    reloadMaterials();
    setSelectedMaterial(duplicated);
  };

  // Delete Material
  const handleDelete = () => {
    if (!selectedMaterial) return;
    if (confirm(`Delete educational material '${selectedMaterial.title}'?`)) {
      aiTeacherCopilotService.deleteMaterial(selectedMaterial.id);
      reloadMaterials();
      const remaining = aiTeacherCopilotService.getAllMaterials();
      setSelectedMaterial(remaining.length > 0 ? remaining[0] : null);
    }
  };

  // Dispatch to Class
  const handleDispatch = () => {
    if (!selectedMaterial || !activeClass) return;
    aiTeacherCopilotService.dispatchMaterialAsAssignment(selectedMaterial.id, activeClass.id);
    setShowDispatchSuccess(true);
    if (onAssignmentCreated) onAssignmentCreated();
    setTimeout(() => setShowDispatchSuccess(false), 3500);
  };

  // Filtered Materials List
  const filteredMaterials = materials.filter((m) => {
    const matchSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subjectName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchType = filterType === "all" || m.materialType === filterType;
    const matchGov =
      filterGovernance === "all" ||
      (filterGovernance === "approved" && m.provenance === "TEACHER_APPROVED") ||
      (filterGovernance === "draft" && m.provenance !== "TEACHER_APPROVED");

    return matchSearch && matchType && matchGov;
  });

  return (
    <div className="space-y-6" id="ai-teacher-copilot-studio">
      {/* COPILOT HEADER BANNER & NATURAL LANGUAGE COMMAND BAR */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              AI TEACHER COPILOT • HIGH-PRODUCTIVITY INSTRUCTIONAL ENGINE
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Create Educational Material
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Synthesize curriculum-grounded lesson plans, teaching notes, differentiated worksheets, quizzes, and exit tickets in ordinary natural language. Context-aware, human-certified, and ready to teach.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {/* Quick 1-Click "Prepare My Lesson" Button */}
            <button
              id="btn-prepare-my-lesson"
              type="button"
              onClick={handlePrepareMyLesson}
              disabled={isSynthesizing}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Zap className="h-4 w-4 fill-slate-950" />
              <span>Prepare My Lesson (1-Click Package)</span>
            </button>
          </div>
        </div>

        {/* Natural Language Prompt Box */}
        <div className="space-y-3 pt-2">
          <div className="relative">
            <input
              id="input-ai-copilot-prompt"
              type="text"
              value={promptInput}
              onChange={(e) => {
                setPromptInput(e.target.value);
                if (clarificationNeeded) setClarificationNeeded(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSynthesize();
              }}
              placeholder="e.g. 'Prepare a 40 minute SS1 Mathematics lesson on quadratic equations' or 'Create a JSS2 English worksheet on subject verb agreement'..."
              className="w-full pl-5 pr-36 py-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
            />
            <button
              type="button"
              onClick={() => handleSynthesize()}
              disabled={isSynthesizing || !promptInput.trim()}
              className="absolute right-2 top-2 bottom-2 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition disabled:opacity-50 cursor-pointer"
            >
              {isSynthesizing ? (
                <>
                  <Clock className="h-4 w-4 animate-spin text-amber-300" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>Generate</span>
                </>
              )}
            </button>
          </div>

          {/* Minimal Clarification Alert if essential context was omitted */}
          {clarificationNeeded && (
            <div className="p-3.5 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs flex items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-amber-300 shrink-0" />
                <span>
                  <strong>Quick Clarification:</strong> {clarificationNeeded}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    handleSynthesize(`Prepare a ${selectedTypePill.replace(/_/g, " ")} on Quadratic Equations for ${activeClass?.name || "SS1"}`);
                  }}
                  className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-bold text-[11px] hover:bg-amber-300 transition cursor-pointer"
                >
                  Use {activeClass?.name} Default
                </button>
              </div>
            </div>
          )}

          {/* Suggested Prompt Chips (Demonstration Scenarios) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px]">
            <span className="text-slate-400 font-bold shrink-0">Try scenario:</span>
            {SUGGESTED_PROMPTS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPromptInput(sample);
                  handleSynthesize(sample);
                }}
                className="px-3 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/80 hover:text-white transition whitespace-nowrap cursor-pointer shrink-0"
              >
                {sample.substring(0, 48)}...
              </button>
            ))}
          </div>
        </div>

        {/* 14 Material Type Pills Carousel */}
        <div className="pt-2 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>Or Choose Target Material Type:</span>
            <span className="text-[11px] text-indigo-400 font-normal">Active Cohort: {activeClass?.name}</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {(Object.keys(MATERIAL_TYPE_LABELS) as EducationalMaterialType[]).map((typeKey) => {
              const info = MATERIAL_TYPE_LABELS[typeKey];
              const isSelected = selectedTypePill === typeKey;
              return (
                <button
                  key={typeKey}
                  type="button"
                  onClick={() => {
                    setSelectedTypePill(typeKey);
                    if (promptInput.trim()) {
                      handleSynthesize(promptInput, typeKey);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400"
                      : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <span>{info.icon}</span>
                  <span>{info.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* DISPATCH SUCCESS TOAST */}
      {showDispatchSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between shadow-md animate-fadeIn">
          <div className="flex items-center gap-2 text-xs font-bold">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Material successfully converted into live assignment and dispatched to {activeClass?.name}!</span>
          </div>
          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
            Active Assignment
          </span>
        </div>
      )}

      {/* MAIN TWO-COLUMN WORKSPACE: LEFT LIST & RIGHT ACTIVE MATERIAL STUDIO */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: MATERIALS REPOSITORY (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">Instructional Materials</h3>
                <p className="text-xs text-slate-500">
                  {materials.length} total • {materials.filter((m) => m.provenance === "TEACHER_APPROVED").length} Certified
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPromptInput("");
                  document.getElementById("input-ai-copilot-prompt")?.focus();
                }}
                className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition cursor-pointer"
                title="Create New Material"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Search and Filters */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="h-3.5 w-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter materials or topic..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none bg-slate-50"
                >
                  <option value="all">All Types</option>
                  {(Object.keys(MATERIAL_TYPE_LABELS) as EducationalMaterialType[]).map((t) => (
                    <option key={t} value={t}>
                      {MATERIAL_TYPE_LABELS[t].label}
                    </option>
                  ))}
                </select>

                <select
                  value={filterGovernance}
                  onChange={(e) => setFilterGovernance(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none bg-slate-50"
                >
                  <option value="all">All Statuses</option>
                  <option value="approved">Certified Approved</option>
                  <option value="draft">AI / Teacher Drafts</option>
                </select>
              </div>
            </div>

            {/* Materials List */}
            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredMaterials.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">
                  No materials match your query. Type a topic above to synthesize.
                </div>
              ) : (
                filteredMaterials.map((mat) => {
                  const isSelected = selectedMaterial?.id === mat.id;
                  const isApproved = mat.provenance === "TEACHER_APPROVED";
                  const typeInfo = MATERIAL_TYPE_LABELS[mat.materialType] || { label: mat.materialType, icon: "📄" };

                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => {
                        setSelectedMaterial(mat);
                        setIsEditing(false);
                      }}
                      className={`w-full text-left p-4 rounded-2xl border transition cursor-pointer space-y-2 ${
                        isSelected
                          ? "bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500 shadow-sm"
                          : "bg-slate-50/70 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-800 flex items-center gap-1">
                          <span>{typeInfo.icon}</span>
                          <span>{typeInfo.label}</span>
                        </span>

                        {isApproved ? (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3" /> Certified
                          </span>
                        ) : (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Draft
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                        {mat.title}
                      </h4>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                        <span>{mat.subjectName}</span>
                        <span>{mat.durationMinutes} mins</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE MATERIAL STUDIO & GOVERNANCE VIEW (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          {selectedMaterial ? (
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              {/* Material Header & Provenance Strip */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-200">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                      {selectedMaterial.materialType.replace(/_/g, " ")}
                    </span>

                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {selectedMaterial.targetLevel.replace(/_/g, " ")}
                    </span>

                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {selectedMaterial.curriculumStandard}
                    </span>

                    {selectedMaterial.provenance === "TEACHER_APPROVED" ? (
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Human Approved & Certified
                      </span>
                    ) : selectedMaterial.provenance === "TEACHER_EDITED_DRAFT" ? (
                      <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                        <Edit3 className="h-3 w-3" /> Teacher Edited Draft
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> AI Generated Draft (Review Required)
                      </span>
                    )}
                  </div>

                  {isEditing ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full text-xl font-black text-slate-900 border border-indigo-400 rounded-xl px-3 py-1.5 focus:outline-none"
                    />
                  ) : (
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                      {selectedMaterial.title}
                    </h3>
                  )}

                  <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                    <span>
                      Subject: <strong className="text-slate-700">{selectedMaterial.subjectName}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Topic: <strong className="text-slate-700">{selectedMaterial.topic}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Pacing: <strong className="text-slate-700">{selectedMaterial.durationMinutes} Minutes</strong>
                    </span>
                    {selectedMaterial.linkedQRCompanionCode && onNavigateToQRHub && (
                      <button
                        type="button"
                        onClick={() => onNavigateToQRHub(selectedMaterial.linkedQRCompanionCode!)}
                        className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <QrCode className="h-3.5 w-3.5" />
                        <span>QR: {selectedMaterial.linkedQRCompanionCode}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Top Action Toolbar */}
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  {isEditing ? (
                    <button
                      type="button"
                      onClick={saveEdits}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                    >
                      <Save className="h-3.5 w-3.5" />
                      <span>Save Changes</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={startEditing}
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>Edit Material</span>
                    </button>
                  )}

                  {selectedMaterial.provenance !== "TEACHER_APPROVED" && (
                    <button
                      type="button"
                      onClick={() => setShowApprovalModal(true)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                    >
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Approve & Certify</span>
                    </button>
                  )}

                  {/* Material Transformation Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowTransformMenu(!showTransformMenu)}
                      className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Layers className="h-3.5 w-3.5" />
                      <span>Transform ▾</span>
                    </button>

                    {showTransformMenu && (
                      <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-20 space-y-1 animate-fadeIn">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block">
                          Transform into:
                        </span>
                        {[
                          { type: "lesson_note" as EducationalMaterialType, label: "Lesson Note" },
                          { type: "worksheet" as EducationalMaterialType, label: "Student Worksheet" },
                          { type: "quiz" as EducationalMaterialType, label: "Diagnostic Quiz" },
                          { type: "assignment" as EducationalMaterialType, label: "Homework Assignment" },
                          { type: "remedial_activity" as EducationalMaterialType, label: "Remedial Sheet" },
                          { type: "exit_ticket" as EducationalMaterialType, label: "Exit Ticket" }
                        ].map((t) => (
                          <button
                            key={t.type}
                            type="button"
                            onClick={() => handleTransform(t.type)}
                            className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition cursor-pointer"
                          >
                            → {t.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Dispatch to Cohort */}
                  <button
                    type="button"
                    onClick={handleDispatch}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                    title={`Dispatch directly to ${activeClass?.name}`}
                  >
                    <Send className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Dispatch to Cohort</span>
                  </button>

                  {/* Duplicate */}
                  <button
                    type="button"
                    onClick={handleDuplicate}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                    title="Duplicate material for another cohort"
                  >
                    <Copy className="h-4 w-4" />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition cursor-pointer"
                    title="Delete material"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Sub-Tabs: Sections / Questions / Differentiation / Remedial / Exit Ticket / Governance */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveMaterialTab("sections")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    activeMaterialTab === "sections"
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Content & Phases ({selectedMaterial.sections.length})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMaterialTab("questions")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    activeMaterialTab === "questions"
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Questions & Solutions ({selectedMaterial.questions.length})
                </button>

                {selectedMaterial.differentiationTiers && (
                  <button
                    type="button"
                    onClick={() => setActiveMaterialTab("differentiation")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                      activeMaterialTab === "differentiation"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Tiered Differentiation ({selectedMaterial.differentiationTiers.length} Tiers)
                  </button>
                )}

                {selectedMaterial.remedialSupport && (
                  <button
                    type="button"
                    onClick={() => setActiveMaterialTab("remedial")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                      activeMaterialTab === "remedial"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Remedial & Misconceptions
                  </button>
                )}

                {selectedMaterial.exitTicket && (
                  <button
                    type="button"
                    onClick={() => setActiveMaterialTab("exitTicket")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                      activeMaterialTab === "exitTicket"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Exit Ticket
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setActiveMaterialTab("governance")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    activeMaterialTab === "governance"
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Audit & Certification
                </button>
              </div>

              {/* TAB 1: SECTIONS / PHASES VIEW */}
              {activeMaterialTab === "sections" && (
                <div className="space-y-6">
                  {/* Learning Objectives & Prerequisites Card */}
                  <div className="grid md:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs">
                    <div className="space-y-2">
                      <span className="font-black text-indigo-900 uppercase tracking-wider block">
                        Target Learning Objectives
                      </span>
                      <ul className="space-y-1 list-disc list-inside text-slate-700">
                        {selectedMaterial.learningObjectives.map((obj, i) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <span className="font-black text-slate-700 uppercase tracking-wider block">
                        Prerequisite Knowledge Grounding
                      </span>
                      <ul className="space-y-1 list-disc list-inside text-slate-600">
                        {selectedMaterial.prerequisiteKnowledge.map((pre, i) => (
                          <li key={i}>{pre}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Sections List */}
                  <div className="space-y-5">
                    {selectedMaterial.sections.map((sec, idx) => (
                      <div
                        key={sec.id || idx}
                        className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-4 hover:border-slate-300 transition shadow-xs"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-black uppercase text-indigo-600">
                              Section {idx + 1}
                            </span>
                            <h4 className="text-base font-black text-slate-900">{sec.heading}</h4>
                            {sec.subheading && <p className="text-xs text-slate-500">{sec.subheading}</p>}
                          </div>
                          {sec.durationMinutes && (
                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                              {sec.durationMinutes} Mins
                            </span>
                          )}
                        </div>

                        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                          {sec.content}
                        </div>

                        {/* Teacher Guidance & Student Activity split if present */}
                        {(sec.teacherGuidance || sec.studentActivity) && (
                          <div className="grid sm:grid-cols-2 gap-3 text-xs">
                            {sec.teacherGuidance && (
                              <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100">
                                <span className="font-bold text-indigo-900 block mb-1">Teacher Guidance:</span>
                                <p className="text-slate-600 leading-relaxed">{sec.teacherGuidance}</p>
                              </div>
                            )}
                            {sec.studentActivity && (
                              <div className="p-3 rounded-xl bg-slate-100/70 border border-slate-200">
                                <span className="font-bold text-slate-900 block mb-1">Student Activity:</span>
                                <p className="text-slate-600 leading-relaxed">{sec.studentActivity}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Worked Exemplars */}
                        {sec.workedExamples && sec.workedExamples.length > 0 && (
                          <div className="space-y-3 pt-2">
                            <span className="text-xs font-black uppercase text-slate-700 block">
                              Worked Exemplars with Step-by-Step Derivations:
                            </span>
                            {sec.workedExamples.map((ex, exIdx) => (
                              <div
                                key={exIdx}
                                className="p-4 rounded-xl bg-slate-900 text-white text-xs space-y-3 font-mono"
                              >
                                <div className="flex items-center justify-between text-indigo-300 font-sans font-bold">
                                  <span>{ex.title}</span>
                                  {ex.examinerTip && (
                                    <span className="text-amber-300 text-[11px] font-sans">
                                      Tip: {ex.examinerTip}
                                    </span>
                                  )}
                                </div>
                                <div className="text-amber-200 font-sans font-semibold">
                                  Problem: {ex.problem}
                                </div>
                                <div className="space-y-1.5 pl-3 border-l-2 border-indigo-500 text-slate-200">
                                  {ex.stepByStepSolution.map((step, sIdx) => (
                                    <div key={sIdx} className="leading-relaxed">
                                      {step}
                                    </div>
                                  ))}
                                </div>
                                <div className="text-[11px] font-sans text-slate-400 pt-2 border-t border-slate-800">
                                  Key Principle: <span className="text-white">{ex.keyPrinciple}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Misconceptions */}
                        {sec.commonMisconceptions && sec.commonMisconceptions.length > 0 && (
                          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1.5">
                            <span className="font-bold text-amber-900 flex items-center gap-1.5">
                              <AlertCircle className="h-4 w-4 text-amber-600" />
                              Common Cognitive Trap & Examiner Misconception:
                            </span>
                            {sec.commonMisconceptions.map((misc, mIdx) => (
                              <div key={mIdx} className="text-amber-800 space-y-1">
                                <p><strong>Trap:</strong> {misc.misconception}</p>
                                <p className="text-[11px] text-amber-700"><strong>Correction Tip:</strong> {misc.correctionTip}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: QUESTIONS VIEW */}
              {activeMaterialTab === "questions" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      Curriculum-Grounded Question Bank ({selectedMaterial.questions.length} Items)
                    </span>
                    {selectedMaterial.markingScheme && (
                      <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                        Total Marks: {selectedMaterial.markingScheme.totalMarks}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    {selectedMaterial.questions.map((q, idx) => (
                      <div
                        key={q.id || idx}
                        className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3 hover:border-slate-300 transition"
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-xs font-black text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-lg">
                            Question {q.questionNumber || idx + 1} • {q.points} Marks
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                              {q.bloomTaxonomy}
                            </span>
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                              {q.difficulty}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm font-bold text-slate-900 leading-snug">{q.stem}</p>

                        {/* Multiple Choice Options if applicable */}
                        {q.options && q.options.length > 0 && (
                          <div className="grid sm:grid-cols-2 gap-2 text-xs pt-1">
                            {q.options.map((opt, optIdx) => {
                              const isCorrect = q.correctIndex === optIdx;
                              return (
                                <div
                                  key={optIdx}
                                  className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                                    isCorrect
                                      ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold"
                                      : "bg-white border-slate-200 text-slate-700"
                                  }`}
                                >
                                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                                    {String.fromCharCode(65 + optIdx)}
                                  </span>
                                  <span>{opt}</span>
                                  {isCorrect && <Check className="h-3.5 w-3.5 text-emerald-600 ml-auto shrink-0" />}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Verified Answer Key & Pedagogical Reasoning */}
                        <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1.5">
                          <div className="flex items-center justify-between text-indigo-900 font-bold">
                            <span>Master Answer Key: {q.answerKey}</span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">
                            <strong>Worked Explanation:</strong> {q.stepByStepExplanation}
                          </p>
                          {q.misconceptionTrap && (
                            <p className="text-amber-800 text-[11px] pt-1 border-t border-slate-100">
                              <strong>Misconception Alert:</strong> {q.misconceptionTrap}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: DIFFERENTIATION TIERS VIEW */}
              {activeMaterialTab === "differentiation" && selectedMaterial.differentiationTiers && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900">
                    <strong>Dynamic Learning Supply:</strong> This material is differentiated into 3 calibrated tiers targeting foundational repair, core syllabus mastery, and advanced problem-solving acceleration.
                  </div>

                  <div className="space-y-4">
                    {selectedMaterial.differentiationTiers.map((tier, idx) => (
                      <div
                        key={idx}
                        className={`p-5 rounded-2xl border space-y-3 ${
                          tier.tier === "foundation"
                            ? "bg-amber-50/50 border-amber-200"
                            : tier.tier === "extension"
                            ? "bg-indigo-50/50 border-indigo-200"
                            : "bg-slate-50 border-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black uppercase text-slate-900">
                            {tier.label}
                          </span>
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white border text-slate-700">
                            {tier.questions.length} Items
                          </span>
                        </div>

                        <p className="text-xs text-slate-600">
                          <strong>Target Audience:</strong> {tier.targetAudience}
                        </p>
                        <p className="text-xs text-slate-600">
                          <strong>Scaffolding Strategy:</strong> {tier.guidance}
                        </p>

                        <div className="space-y-2 pt-2">
                          {tier.questions.map((q, qIdx) => (
                            <div key={qIdx} className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                              <span className="font-bold text-slate-900 block">{q.stem}</span>
                              <span className="text-[11px] text-indigo-600 block">Answer: {q.answerKey}</span>
                              {q.remedialHint && (
                                <span className="text-[11px] text-amber-700 block">Hint: {q.remedialHint}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: REMEDIAL & MISCONCEPTIONS VIEW */}
              {activeMaterialTab === "remedial" && selectedMaterial.remedialSupport && (
                <div className="space-y-5">
                  <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3 text-xs">
                    <h4 className="font-black text-amber-900 text-sm flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4 text-amber-700" />
                      Target Learning Gaps & Prerequisite Blockers
                    </h4>
                    <ul className="space-y-1.5 list-disc list-inside text-amber-800">
                      {selectedMaterial.remedialSupport.targetGaps.map((gap, gIdx) => (
                        <li key={gIdx}>{gap}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs">
                    <h4 className="font-black text-slate-900 text-sm">Guided Socratic Prompts</h4>
                    <p className="text-slate-600">Use these guided prompts when circulating or leading targeted breakout tables:</p>
                    <div className="space-y-2">
                      {selectedMaterial.remedialSupport.guidedPrompts.map((prompt, pIdx) => (
                        <div key={pIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-semibold flex items-center gap-2">
                          <ArrowRight className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                          <span>"{prompt}"</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: EXIT TICKET VIEW */}
              {activeMaterialTab === "exitTicket" && selectedMaterial.exitTicket && (
                <div className="space-y-5">
                  <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                        1-Minute Formative Exit Ticket
                      </span>
                      <span className="text-xs font-bold text-slate-400">Plenary Check</span>
                    </div>

                    <p className="text-base sm:text-lg font-bold leading-relaxed text-slate-100">
                      {selectedMaterial.exitTicket.prompt}
                    </p>

                    <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-xs space-y-2">
                      <span className="text-indigo-300 font-bold block">Sample Correct Response:</span>
                      <p className="text-slate-200 font-mono">{selectedMaterial.exitTicket.sampleCorrectResponse}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20 text-xs space-y-1.5 text-amber-200">
                      <span className="font-bold text-amber-300 block">Common Student Errors to Flag:</span>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedMaterial.exitTicket.commonErrorsToLookFor.map((err, eIdx) => (
                          <li key={eIdx}>{err}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      <strong>Remedial Next Step:</strong> {selectedMaterial.exitTicket.remedialNextStep}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: GOVERNANCE & PROVENANCE AUDIT VIEW */}
              {activeMaterialTab === "governance" && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                    <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      Institutional Provenance & Audit Verification
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3 text-slate-700">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Provenance Status:</span>
                        <strong className="text-slate-900 font-mono">{selectedMaterial.provenance}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Lifecycle Gate:</span>
                        <strong className="text-slate-900 font-mono">{selectedMaterial.lifecycleStatus}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Human Review Decision:</span>
                        <strong className="text-slate-900">{selectedMaterial.humanReviewDecision.toUpperCase()}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Certified Reviewer:</span>
                        <strong className="text-slate-900">{selectedMaterial.reviewedBy || "Pending Review"}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Author / Reviewer Signature:</span>
                        <strong className="text-slate-900 font-serif italic">{selectedMaterial.authorSignature || "Not signed yet"}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Synthesized Date:</span>
                        <strong className="text-slate-900">{new Date(selectedMaterial.createdAt).toLocaleString()}</strong>
                      </div>
                    </div>

                    {selectedMaterial.sourcePrompt && (
                      <div className="pt-2 border-t border-slate-200 text-slate-600">
                        <span className="text-slate-400 block text-[11px]">Original Request Prompt:</span>
                        <p className="italic">"{selectedMaterial.sourcePrompt}"</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-400 space-y-3">
              <Sparkles className="h-10 w-10 mx-auto text-indigo-400" />
              <h3 className="text-base font-bold text-slate-700">No Material Selected</h3>
              <p className="text-xs max-w-sm mx-auto">
                Select an instructional material from the left repository or describe a new lesson in the prompt bar above.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: HUMAN APPROVAL & CERTIFICATION */}
      {showApprovalModal && selectedMaterial && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Approve & Certify Material</h3>
                <p className="text-xs text-slate-500">Formally certify this AI-generated draft for classroom instruction.</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                As a certified educator, by approving <strong>{selectedMaterial.title}</strong> you verify that:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Mathematical equations and derivations are verified.</li>
                <li>Content conforms to the syllabus standard ({selectedMaterial.curriculumStandard}).</li>
                <li>Pacing and pedagogical steps are age-appropriate for {selectedMaterial.targetLevel.replace(/_/g, " ")}.</li>
              </ul>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Reviewer Certification Notes</label>
              <textarea
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                placeholder="e.g. Verified mathematical derivation; approved for SS1 WAEC preparation cohort."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none h-20"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowApprovalModal(false)}
                className="px-4 py-2 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApprove}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md cursor-pointer"
              >
                Certify & Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PREPARED 1-CLICK LESSON PACKAGE */}
      {showPackageModal && preparedPackage && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">
                    One-Click Complete Teaching Package
                  </span>
                  <h3 className="text-xl font-black text-slate-900">{preparedPackage.title}</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPackageModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              AI Teacher Copilot has synchronized and synthesized four coordinated instructional assets grounded in your active classroom syllabus:
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              <div
                onClick={() => {
                  setSelectedMaterial(preparedPackage.lessonPlan);
                  setShowPackageModal(false);
                }}
                className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1.5 hover:border-indigo-400 cursor-pointer transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-indigo-700">1. Lesson Plan</span>
                  <span className="text-[10px] font-bold text-slate-500">{preparedPackage.lessonPlan.durationMinutes}m</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{preparedPackage.lessonPlan.title}</h4>
                <p className="text-[11px] text-slate-500">5-Phase flow, timings, and teacher guidance.</p>
              </div>

              <div
                onClick={() => {
                  setSelectedMaterial(preparedPackage.lessonNote);
                  setShowPackageModal(false);
                }}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-slate-400 cursor-pointer transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-slate-700">2. Lesson Note</span>
                  <span className="text-[10px] font-bold text-slate-500">{preparedPackage.lessonNote.durationMinutes}m</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{preparedPackage.lessonNote.title}</h4>
                <p className="text-[11px] text-slate-500">Theoretical exposition & fully worked derivations.</p>
              </div>

              <div
                onClick={() => {
                  setSelectedMaterial(preparedPackage.worksheet);
                  setShowPackageModal(false);
                }}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-slate-400 cursor-pointer transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-slate-700">3. Student Worksheet</span>
                  <span className="text-[10px] font-bold text-slate-500">3 Tiers</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{preparedPackage.worksheet.title}</h4>
                <p className="text-[11px] text-slate-500">Differentiated scaffolding with answer key.</p>
              </div>

              <div
                onClick={() => {
                  setSelectedMaterial(preparedPackage.exitTicket);
                  setShowPackageModal(false);
                }}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-slate-400 cursor-pointer transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-slate-700">4. Formative Exit Ticket</span>
                  <span className="text-[10px] font-bold text-slate-500">5m</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{preparedPackage.exitTicket.title}</h4>
                <p className="text-[11px] text-slate-500">1-Minute diagnostic check & misconception detector.</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPackageModal(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
              >
                Close & Review Package
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
