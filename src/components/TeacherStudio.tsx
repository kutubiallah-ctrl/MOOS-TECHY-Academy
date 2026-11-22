import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Layers,
  FileCheck2,
  Users,
  AlertTriangle,
  Sparkles,
  QrCode,
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
  Database,
  ShieldAlert,
  FileText,
  Lock,
  Video,
  Film
} from "lucide-react";
import {
  teacherStudioService,
  SEEDED_LESSON_PLANS,
  SEEDED_INTERVENTION_PLANS,
  SEEDED_CLASS_ANALYTICS,
  SEEDED_CLASSROOMS,
  SEEDED_ASSIGNMENTS,
  SEEDED_ROSTER
} from "../services/teacherStudioService";
import { auditService } from "../services/auditService";
import { identityService } from "../services/identityService";
import { AuditEvent, AuditEventType } from "../types/audit";
import {
  TeacherLessonPlan,
  LearnerInterventionPlan,
  TeacherClassroom,
  ClassroomRosterStudent,
  ClassroomAssignment,
  TeacherInterventionRecommendation,
  ClassroomAdaptiveGroup,
  PrerequisiteBottleneckCluster,
  MisconceptionCluster,
  ClassroomNextBestAction,
  AssignmentLifecycleStatus,
  LearnerAssignmentProgress,
  TeacherInterventionStatus
} from "../types/teacherStudio";
import { agentOrchestrationService } from "../services/agentOrchestrationService";
import { curriculumService } from "../services/curriculumService";
import { useLearner } from "../context/LearnerContext";
import { EducationalLevel } from "../types/curriculum";
import { BackupRestoreModal } from "./BackupRestoreModal";
import { TeacherCopilotStudio } from "./TeacherCopilotStudio";
import { VideoCoverageMatrixModal } from "./video/VideoCoverageMatrixModal";
import { VideoCreatorStudioModal } from "./video/VideoCreatorStudioModal";
import { TeacherProductivityWorkbench } from "./teacher/TeacherProductivityWorkbench";

interface TeacherStudioProps {
  onNavigateToTextbookStudio: () => void;
  onNavigateToQRHub?: (code: string) => void;
}

export const TeacherStudio: React.FC<TeacherStudioProps> = ({
  onNavigateToTextbookStudio,
  onNavigateToQRHub
}) => {
  const { profile } = useLearner();
  const [activeTab, setActiveTab] = useState<"cockpit" | "workbench" | "copilot" | "classrooms" | "assignments" | "interventions" | "lessons" | "analytics" | "governance">("workbench");

  // State
  const [classrooms, setClassrooms] = useState<TeacherClassroom[]>(teacherStudioService.getClassrooms());
  const [selectedClassId, setSelectedClassId] = useState<string>(classrooms[0]?.id || "cls-ss2-sci-a");
  const selectedClass = classrooms.find((c) => c.id === selectedClassId) || classrooms[0];

  const [roster, setRoster] = useState<ClassroomRosterStudent[]>([]);
  const [assignments, setAssignments] = useState<ClassroomAssignment[]>([]);
  const [interventions, setInterventions] = useState<TeacherInterventionRecommendation[]>([]);
  const [adaptiveGroups, setAdaptiveGroups] = useState<ClassroomAdaptiveGroup[]>([]);
  const [bottlenecks, setBottlenecks] = useState<PrerequisiteBottleneckCluster[]>([]);
  const [misconceptions, setMisconceptions] = useState<MisconceptionCluster[]>([]);
  const [nextBestActions, setNextBestActions] = useState<ClassroomNextBestAction[]>([]);
  const [lessonPlans, setLessonPlans] = useState<TeacherLessonPlan[]>(teacherStudioService.getLessonPlans());
  const [selectedPlan, setSelectedPlan] = useState<TeacherLessonPlan>(lessonPlans[0]);
  const [analytics, setAnalytics] = useState(teacherStudioService.getClassAnalytics(selectedClassId));
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(() => auditService.getEvents());
  const [auditFilterType, setAuditFilterType] = useState<string>("ALL");
  const [auditFilterResult, setAuditFilterResult] = useState<string>("ALL");
  const [auditSearchQuery, setAuditSearchQuery] = useState("");
  const [selectedAuditEvent, setSelectedAuditEvent] = useState<AuditEvent | null>(null);

  // Search & Filters
  const [rosterSearch, setRosterSearch] = useState("");
  const [rosterSubView, setRosterSubView] = useState<"roster" | "groups">("roster");
  const [assignmentFilter, setAssignmentFilter] = useState<"all" | "active" | "completed">("all");
  const [copiedCode, setCopiedCode] = useState(false);

  // Modals & Selected Inspection
  const [showNewAssignmentModal, setShowNewAssignmentModal] = useState(false);
  const [showNewClassModal, setShowNewClassModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showVideoMatrixModal, setShowVideoMatrixModal] = useState(false);
  const [showVideoCreatorModal, setShowVideoCreatorModal] = useState(false);
  const [isGeneratingLesson, setIsGeneratingLesson] = useState(false);
  const [generationObjective, setGenerationObjective] = useState("");
  const [generationSubject, setGenerationSubject] = useState("Mathematics");
  const [generationLevel, setGenerationLevel] = useState<EducationalLevel>("senior_secondary");
  const [generationMaterialType, setGenerationMaterialType] = useState<"lesson_plan" | "teaching_notes" | "worksheet" | "intervention_guide">("lesson_plan");
  const [inspectingAssignment, setInspectingAssignment] = useState<ClassroomAssignment | null>(null);

  // New Assignment Form State
  const [newAsgTitle, setNewAsgTitle] = useState("");
  const [newAsgDescription, setNewAsgDescription] = useState("");
  const [newAsgUnitId, setNewAsgUnitId] = useState(() => curriculumService.getAllUnits()[0]?.id || "unit-foundations-numbers");
  const [newAsgSkillId, setNewAsgSkillId] = useState(() => curriculumService.getAllUnits()[0]?.skills[0]?.id || "skill-frac-operations");
  const [newAsgType, setNewAsgType] = useState<"practice" | "guided_remediation" | "exam_prep" | "challenge" | "diagnostic">("practice");
  const [newAsgDueDate, setNewAsgDueDate] = useState("2026-09-08");
  const [newAsgTargetGroup, setNewAsgTargetGroup] = useState<"all" | "struggling" | "custom">("all");
  const [newAsgCustomIds, setNewAsgCustomIds] = useState<string[]>([]);
  const [adaptiveDifficultyEnabled, setAdaptiveDifficultyEnabled] = useState(true);
  const [prereqWarmupEnabled, setPrereqWarmupEnabled] = useState(true);
  const [hintIntensity, setHintIntensity] = useState<"standard" | "high" | "minimal">("standard");

  // New Class Form State
  const [newClassName, setNewClassName] = useState("");
  const [newClassLevel, setNewClassLevel] = useState<EducationalLevel>("senior_secondary");

  // Reload data on class change
  const reloadClassData = () => {
    if (selectedClassId) {
      setRoster(teacherStudioService.getRoster(selectedClassId, profile));
      setAssignments(teacherStudioService.getAssignments(selectedClassId));
      setInterventions(teacherStudioService.getTeacherInterventions(selectedClassId));
      setAdaptiveGroups(teacherStudioService.getAdaptiveGroups(selectedClassId, profile));
      setBottlenecks(teacherStudioService.getPrerequisiteBottlenecks(selectedClassId, profile));
      setMisconceptions(teacherStudioService.getMisconceptionClusters(selectedClassId, profile));
      setNextBestActions(teacherStudioService.getNextBestActions(selectedClassId, profile));
      setAnalytics(teacherStudioService.getClassAnalytics(selectedClassId, profile));
    }
  };

  useEffect(() => {
    reloadClassData();
  }, [selectedClassId, profile]);

  const handleCopyRoomCode = () => {
    if (selectedClass?.roomCode) {
      navigator.clipboard?.writeText(selectedClass.roomCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleOpenAssignmentModalWithParams = (params: {
    title: string;
    description?: string;
    unitId?: string;
    skillId?: string;
    type?: "practice" | "guided_remediation" | "exam_prep" | "challenge" | "diagnostic";
    targetIds?: string[];
  }) => {
    setNewAsgTitle(params.title);
    setNewAsgDescription(params.description || "Work through personalized problems calibrated for your level.");
    if (params.unitId) setNewAsgUnitId(params.unitId);
    if (params.skillId) setNewAsgSkillId(params.skillId);
    if (params.type) setNewAsgType(params.type);
    if (params.targetIds && params.targetIds.length > 0) {
      setNewAsgTargetGroup("custom");
      setNewAsgCustomIds(params.targetIds);
    } else {
      setNewAsgTargetGroup("all");
      setNewAsgCustomIds([]);
    }
    setShowNewAssignmentModal(true);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsgTitle.trim()) return;

    let targetLearnerIds: string[] = [];
    if (newAsgTargetGroup === "struggling") {
      targetLearnerIds = roster.filter((r) => r.masteryScore < 65).map((r) => r.learnerId);
    } else if (newAsgTargetGroup === "custom") {
      targetLearnerIds = newAsgCustomIds;
    }

    teacherStudioService.createAssignment({
      classroomId: selectedClassId,
      title: newAsgTitle.trim(),
      description: newAsgDescription.trim() || "Work through assigned problems with step hints.",
      unitId: newAsgUnitId,
      skillId: newAsgSkillId,
      assignmentType: newAsgType,
      targetLearnerIds,
      dueDate: newAsgDueDate,
      provenance: "OFFICIAL_SYLLABUS",
      differentiationConfig: {
        adaptiveDifficulty: adaptiveDifficultyEnabled,
        prerequisiteWarmupEnabled: prereqWarmupEnabled,
        hintScaffoldingIntensity: hintIntensity
      }
    });

    reloadClassData();
    setShowNewAssignmentModal(false);
    setNewAsgTitle("");
    setNewAsgDescription("");
    setNewAsgCustomIds([]);
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    const standardMap: Record<string, any> = {
      primary_foundations: "COMMON_ENTRANCE",
      upper_primary: "COMMON_ENTRANCE",
      junior_secondary: "NERDC_NIGERIAN",
      senior_secondary: "WAEC_WASSCE",
      university_prep: "JAMB_UTME",
      exam_prep: "WAEC_WASSCE"
    };

    const subjectMap: Record<string, string> = {
      primary_foundations: "subj-mth-primary",
      upper_primary: "subj-mth-upper-primary",
      junior_secondary: "subj-mth-junior",
      senior_secondary: "subj-mth-senior",
      university_prep: "subj-mth-uni-prep",
      exam_prep: "subj-mth-exam-prep"
    };

    const created = teacherStudioService.createClassroom({
      name: newClassName.trim(),
      gradeLevel: newClassLevel,
      subjectId: subjectMap[newClassLevel] || "subj-mth-senior",
      standard: standardMap[newClassLevel] || "WAEC_WASSCE"
    });

    const updated = teacherStudioService.getClassrooms();
    setClassrooms(updated);
    setSelectedClassId(created.id);
    setShowNewClassModal(false);
    setNewClassName("");
  };

  const handleUpdateIntervention = (interventionId: string, status: TeacherInterventionStatus) => {
    teacherStudioService.updateInterventionStatus(interventionId, status);
    reloadClassData();
  };

  const handleCreateInterventionFromOutcome = (assignmentId: string, learnerId: string) => {
    try {
      teacherStudioService.createInterventionFromAssignmentOutcome(assignmentId, learnerId);
      reloadClassData();
    } catch (err) {
      console.warn("Could not create intervention from outcome", err);
    }
  };

  const handleGenerateLessonPlan = async () => {
    if (!generationObjective.trim()) return;
    setIsGeneratingLesson(true);
    try {
      const typeLabel =
        generationMaterialType === "teaching_notes"
          ? "Teaching Notes"
          : generationMaterialType === "worksheet"
          ? "Student Worksheet"
          : generationMaterialType === "intervention_guide"
          ? "Remedial Guide"
          : "5-Phase Lesson Plan";

      await agentOrchestrationService.orchestrateTask(
        "teacher_assistant_agent",
        `Synthesize ${typeLabel} for: ${generationObjective}`,
        {
          userId: "user-teacher-001",
          userRole: "teacher",
          targetSubject: generationSubject,
          targetLevel: generationLevel
        }
      );

      const subjectIdMap: Record<string, string> = {
        "Mathematics": "subj-mth-senior",
        "English Language": "subj-eng-senior",
        "Science & STEM": "subj-stem-physics",
        "Computer Science & ICT": "subj-ict-computing",
        "Economics": "subj-econ-senior"
      };

      const isEnglish = generationSubject.includes("English");
      const isSTEM = generationSubject.includes("STEM") || generationSubject.includes("Science");
      const isICT = generationSubject.includes("Computer") || generationSubject.includes("ICT");

      const learningObjectives = isEnglish
        ? [
            "Demonstrate mastery of core textual conventions and rhetorical structures.",
            "Analyze and synthesize key arguments with textual evidence.",
            "Apply precise grammatical syntax and domain vocabulary."
          ]
        : isSTEM
        ? [
            "Establish qualitative first-principles intuition for the physical phenomenon.",
            "Apply fundamental conservation laws and dimensional analysis to model problems.",
            "Interpret empirical data and avoid unit conversion traps."
          ]
        : isICT
        ? [
            "Decompose the computational problem into structured algorithmic sub-routines.",
            "Trace execution state, time/space complexity, and boundary conditions.",
            "Implement safe, maintainable patterns avoiding common logic faults."
          ]
        : [
            "Establish first-principles intuitive understanding of the core theorems.",
            "Apply mathematical derivations and transformations to structured problems.",
            "Identify and avoid standard examiner traps and algebraic blindspots."
          ];

      const phases =
        generationMaterialType === "worksheet"
          ? [
              {
                phaseName: "Section A: Conceptual Foundation & Key Terms",
                durationMinutes: 10,
                teacherGuidance: "Review fundamental vocabulary and definitions before proceeding to calculation.",
                studentActivity: "Complete 4 concept-check matching and fill-in items.",
                keyQuestionsToAsk: ["What is the essential definition?"],
                commonStumblingBlocks: ["Confusing similar terms."]
              },
              {
                phaseName: "Section B: Scaffolded Core Problems",
                durationMinutes: 15,
                teacherGuidance: "Students complete tiered questions with step hints provided.",
                studentActivity: "Solve 3 graduated problems showing all intermediate workings.",
                keyQuestionsToAsk: ["Which principle applies directly here?"],
                commonStumblingBlocks: ["Skipping intermediate algebraic lines."]
              },
              {
                phaseName: "Section C: Challenge & Exam-Style Application",
                durationMinutes: 15,
                teacherGuidance: "Encourage independent problem-solving without immediate scaffolding.",
                studentActivity: "Tackle 2 multi-step examination standard scenarios.",
                keyQuestionsToAsk: ["How do we break this compound question into parts?"],
                commonStumblingBlocks: ["Rushing without reading edge constraints."]
              },
              {
                phaseName: "Section D: Examiner Trap Analysis",
                durationMinutes: 5,
                teacherGuidance: "Display an authentic sample solution containing an intentional error.",
                studentActivity: "Identify and annotate the exact flaw.",
                keyQuestionsToAsk: ["Why would a student make this specific mistake?"],
                commonStumblingBlocks: ["Overlooking subtle condition prerequisites."]
              }
            ]
          : generationMaterialType === "teaching_notes"
          ? [
              {
                phaseName: "1. Syllabus Standard & Big-Picture Context",
                durationMinutes: 8,
                teacherGuidance: "Frame how this topic connects to real-world applications and previous foundational units.",
                studentActivity: "Record essential overview mind-map.",
                keyQuestionsToAsk: ["Why does this concept exist in the world?"],
                commonStumblingBlocks: ["Viewing the topic as isolated formulas."]
              },
              {
                phaseName: "2. Rigorous Theoretical Exposition",
                durationMinutes: 15,
                teacherGuidance: "Present step-by-step mathematical or conceptual derivations with crystal-clear board notes.",
                studentActivity: "Transcribe derivations into subject journals.",
                keyQuestionsToAsk: ["What is the mathematical justification for this leap?"],
                commonStumblingBlocks: ["Assuming shortcuts without understanding origin."]
              },
              {
                phaseName: "3. Worked Exemplars (Graduated Difficulty)",
                durationMinutes: 12,
                teacherGuidance: "Model two complete problem solutions thinking aloud each pedagogical step.",
                studentActivity: "Follow and annotate teacher commentary.",
                keyQuestionsToAsk: ["What clue in the question triggered this method?"],
                commonStumblingBlocks: ["Choosing inefficient solution paths."]
              },
              {
                phaseName: "4. Pedagogical Traps & Rubric Highlights",
                durationMinutes: 10,
                teacherGuidance: "Highlight where students routinely lose marks on official WAEC/JAMB rubrics.",
                studentActivity: "Highlight trap alerts in personal notes.",
                keyQuestionsToAsk: ["What must be written explicitly for full marks?"],
                commonStumblingBlocks: ["Omitting units or closing statements."]
              }
            ]
          : [
              {
                phaseName: "Hook & Warmup",
                durationMinutes: 8,
                teacherGuidance: "Present a relatable real-world physical paradox to activate curiosity.",
                studentActivity: "Engage in paired discussion to hypothesise potential solutions.",
                keyQuestionsToAsk: ["What patterns do you observe here?"],
                commonStumblingBlocks: ["Rushing to arithmetic calculation before recognizing the structural form."]
              },
              {
                phaseName: "Direct Instruction",
                durationMinutes: 12,
                teacherGuidance: "Derive key principles step-by-step with structured annotations.",
                studentActivity: "Record derivations in personal concept journals.",
                keyQuestionsToAsk: ["Why is this step mathematically/logically necessary?"],
                commonStumblingBlocks: ["Sign inversion or grammatical syntax confusion."]
              },
              {
                phaseName: "Guided Socratic Practice",
                durationMinutes: 15,
                teacherGuidance: "Circulate among students guiding step-by-step problem sets.",
                studentActivity: "Solve 2 scaffolded problems with graduated hints.",
                keyQuestionsToAsk: ["How does this compare with the standard formula/rule?"],
                commonStumblingBlocks: ["Forgetting to verify domain constraints."]
              },
              {
                phaseName: "Collaborative Task",
                durationMinutes: 5,
                teacherGuidance: "Challenge pairs to identify a deliberate error planted in a sample solution.",
                studentActivity: "Spot the misapplied concept and provide the correct derivation.",
                keyQuestionsToAsk: ["Where exactly did the logic break down?"],
                commonStumblingBlocks: ["Overlooking edge conditions."]
              },
              {
                phaseName: "Formative Exit Check",
                durationMinutes: 5,
                teacherGuidance: "Collect 1-minute diagnostic ticket to gauge cohort readiness.",
                studentActivity: "Independently answer 1 targeted question.",
                keyQuestionsToAsk: ["What is your confidence level in this solution?"],
                commonStumblingBlocks: ["Skipping intermediate reasoning steps."]
              }
            ];

      const newPlan = teacherStudioService.createLessonPlan({
        title: `${typeLabel}: ${generationObjective}`,
        subjectId: subjectIdMap[generationSubject] || (selectedClass?.subjectId || "subj-mth-senior"),
        unitId: "unit-gen-curr",
        skillId: "skill-gen-curr",
        targetLevel: generationLevel,
        durationMinutes: generationMaterialType === "teaching_notes" ? 50 : 45,
        learningObjectives,
        phases,
        homeworkOrExtension: `Review the companion QR interactive questions and complete the practice exercises on the student portal.`,
        linkedQRCompanionCode: "CEMM-CH03-SEC02-EX04"
      });

      setLessonPlans(teacherStudioService.getLessonPlans());
      setSelectedPlan(newPlan);
      setShowAiModal(false);
      setGenerationObjective("");
    } finally {
      setIsGeneratingLesson(false);
    }
  };

  const filteredRoster = roster.filter(
    (s) =>
      s.name.toLowerCase().includes(rosterSearch.toLowerCase()) ||
      s.email.toLowerCase().includes(rosterSearch.toLowerCase())
  );

  const selectedUnitSkills = curriculumService.getUnitById(newAsgUnitId)?.skills || [];

  return (
    <div id="teacher-studio-container" className="space-y-6">
      {/* Studio Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="h-3.5 w-3.5" />
              MOOS TEACHER STUDIO • INSTITUTIONAL COHORT INTELLIGENCE
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Teacher Decision Support & Institutional Classroom Intelligence
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Evidence-grounded decision intelligence: resolve prerequisite bottlenecks, target recurring misconception clusters, track assignment lifecycles, and orchestrate differentiated syllabus mastery for WAEC & UTME excellence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="btn-distribute-assignment"
              type="button"
              onClick={() => {
                setNewAsgTargetGroup("all");
                setNewAsgCustomIds([]);
                setShowNewAssignmentModal(true);
              }}
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition active:scale-95 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Distribute Assignment</span>
            </button>

            <button
              id="btn-ai-teacher-copilot"
              type="button"
              onClick={() => setActiveTab("copilot")}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <Sparkles className="h-4 w-4 fill-slate-950 text-slate-950" />
              <span>Create Educational Material (AI Copilot)</span>
            </button>

            <button
              id="btn-open-textbook-studio"
              type="button"
              onClick={onNavigateToTextbookStudio}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-indigo-400" />
              <span>Textbook Studio</span>
            </button>

            <button
              id="btn-open-video-studio"
              type="button"
              onClick={() => setShowVideoCreatorModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-sky-900/60 hover:bg-sky-800/80 text-sky-200 border border-sky-600/40 font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-sm"
              title="Open Video Creator Studio for agentic video authoring"
            >
              <Video className="h-4 w-4 text-sky-400" />
              <span>Video Creator Studio</span>
            </button>

            <button
              id="btn-backup-restore-studio"
              type="button"
              onClick={() => setShowBackupModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/40 font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-sm"
            >
              <Database className="h-4 w-4 text-emerald-400" />
              <span>Backup & Restore</span>
            </button>
          </div>
        </div>

        {/* Cohort Selector & Metadata Strip */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Cohort:</span>
            <select
              id="cohort-selector"
              aria-label="Select classroom cohort"
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {classrooms.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.standard})
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setShowNewClassModal(true)}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition cursor-pointer"
            >
              <Plus className="h-3 w-3" />
              <span>New Cohort</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400">
              Room Code: <strong className="text-white font-mono">{selectedClass?.roomCode}</strong>
            </span>
            <button
              type="button"
              onClick={handleCopyRoomCode}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-semibold flex items-center gap-1 transition cursor-pointer"
            >
              {copiedCode ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span>{copiedCode ? "Copied!" : "Share Code"}</span>
            </button>
          </div>
        </div>

        {/* Studio Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("cockpit")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "cockpit"
                ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Activity className="h-4 w-4 text-emerald-400" />
            <span>Decision Cockpit ({nextBestActions.length})</span>
          </button>

          <button
            id="tab-btn-teacher-workbench"
            type="button"
            onClick={() => setActiveTab("workbench")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "workbench"
                ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-black shadow-md shadow-indigo-500/25"
                : "text-indigo-300 hover:text-indigo-200 hover:bg-slate-800/60 font-bold"
            }`}
          >
            <Sliders className="h-4 w-4 text-indigo-400" />
            <span>Productivity Workbench (Plan • Create • Assess)</span>
          </button>

          <button
            id="tab-btn-ai-teacher-copilot"
            type="button"
            onClick={() => setActiveTab("copilot")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "copilot"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/25"
                : "text-amber-300 hover:text-amber-200 hover:bg-slate-800/60 font-bold"
            }`}
          >
            <Sparkles className="h-4 w-4 fill-current" />
            <span>AI Teacher Copilot & Materials</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("classrooms")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "classrooms"
                ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Roster & Adaptive Groups ({adaptiveGroups.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("assignments")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "assignments"
                ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <ClipboardList className="h-4 w-4" />
            <span>Assignments & Lifecycle ({assignments.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("interventions")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "interventions"
                ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <BrainCircuit className="h-4 w-4 text-amber-400" />
            <span>Diagnostic Interventions ({interventions.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("lessons")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "lessons"
                ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <BookMarked className="h-4 w-4" />
            <span>5-Phase Lesson Scaffolds ({lessonPlans.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "analytics"
                ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <BarChart3 className="h-4 w-4 text-emerald-400" />
            <span>Cohort Mastery & Trajectory</span>
          </button>

          <button
            id="tab-btn-audit-governance"
            type="button"
            onClick={() => {
              setAuditEvents(auditService.getEvents());
              setActiveTab("governance");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "governance"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <ShieldCheck className="h-4 w-4 text-rose-400" />
            <span>Audit & Governance Trail ({auditEvents.length})</span>
          </button>
        </div>
      </div>

      {/* TAB: TEACHER PRODUCTIVITY WORKBENCH */}
      {activeTab === "workbench" && (
        <TeacherProductivityWorkbench
          classrooms={classrooms}
          selectedClassId={selectedClassId}
          onSelectClassId={setSelectedClassId}
          onDispatchAssignment={(material) => {
            handleOpenAssignmentModalWithParams({
              title: material.title,
              description: (material.body || material.sections?.[0]?.content || material.title).slice(0, 150)
            });
          }}
          onNavigateToQRHub={onNavigateToQRHub}
        />
      )}

      {/* TAB: AI TEACHER COPILOT & EDUCATIONAL MATERIALS */}
      {activeTab === "copilot" && (
        <TeacherCopilotStudio
          classrooms={classrooms}
          selectedClassId={selectedClassId}
          onSelectClassId={setSelectedClassId}
          onNavigateToQRHub={onNavigateToQRHub}
          onAssignmentCreated={reloadClassData}
        />
      )}

      {/* TAB 0: DECISION COCKPIT (Next Best Actions, Prerequisite Bottlenecks, Misconception Clusters) */}
      {activeTab === "cockpit" && (
        <div className="space-y-6">
          {/* Priority Next Best Actions Feed */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <Zap className="h-3.5 w-3.5" /> High Impact Priority Feed
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Classroom Action Recommendations
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Classroom Next Best Actions (Evidence-Grounded)
                </h3>
                <p className="text-xs text-slate-500">
                  Deterministic priority rank synthesizing prerequisite blockers, misconception clusters, stagnation alerts, and challenge readiness.
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-slate-700 block">Classroom Health Index</span>
                <span className="text-xl font-black text-indigo-700">{analytics.averageMasteryScore}% Mastery</span>
              </div>
            </div>

            <div className="grid gap-4">
              {nextBestActions.map((action, idx) => (
                <div
                  key={action.id}
                  className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-indigo-300 transition"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-600 text-white">
                        Priority #{idx + 1} • Score: {action.priorityScore}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                        {action.category ? action.category.replace(/_/g, " ") : "Action"}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        Target: {action.targetNames.join(", ")}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-slate-900">{action.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{action.rationale}</p>

                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-indigo-900 font-semibold flex items-center gap-2">
                      <Target className="h-4 w-4 text-indigo-600 shrink-0" />
                      <span>Recommended Move: {action.suggestedAction}</span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenAssignmentModalWithParams({
                          title: action.title,
                          description: action.suggestedAction,
                          unitId: action.suggestedUnitId,
                          skillId: action.suggestedSkillId,
                          type: action.assignmentType,
                          targetIds: action.targetIds
                        })
                      }
                      className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
                    >
                      <span>Dispatch Assignment</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisite Bottlenecks & Misconceptions Matrix */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Prerequisite Bottlenecks */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">Classroom Prerequisite Bottlenecks</h4>
                    <p className="text-[11px] text-slate-500">Foundational skills holding back advanced syllabus units</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  {bottlenecks.length} Blockers Detected
                </span>
              </div>

              <div className="space-y-3">
                {bottlenecks.map((b, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200/80 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                        {b.severity} Bottleneck
                      </span>
                      <span className="text-xs font-bold text-rose-700">
                        {b.affectedLearnerCount} learners blocked
                      </span>
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="font-bold text-slate-800 flex items-center gap-1">
                        <span className="text-rose-600 font-extrabold">Blocker:</span> {b.blockerSkillTitle}
                      </div>
                      <div className="text-slate-600 flex items-center gap-1">
                        <ArrowRight className="h-3 w-3 text-slate-400" />
                        <span className="font-semibold text-slate-700">Impacting:</span> {b.dependentSkillTitle}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Affected Students: <span className="font-medium text-slate-800">{b.affectedLearnerNames.join(", ")}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleOpenAssignmentModalWithParams({
                          title: `Remedial Drill: ${b.blockerSkillTitle}`,
                          description: "Foundational prerequisite reinforcement to clear conceptual blockers.",
                          unitId: b.suggestedRemediationUnitId,
                          skillId: b.blockerSkillId,
                          type: "guided_remediation",
                          targetIds: b.affectedLearnerIds
                        })
                      }
                      className="w-full py-1.5 rounded-xl bg-white hover:bg-rose-100 text-rose-800 border border-rose-300 font-bold text-[11px] flex items-center justify-center gap-1 transition cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                      <span>Assign Prerequisite Repair Drill</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Misconception Matrix */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                    <BrainCircuit className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">Misconception Intelligence Matrix</h4>
                    <p className="text-[11px] text-slate-500">Recurring distractor traps & procedural confusion</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  {misconceptions.length} Clusters
                </span>
              </div>

              <div className="space-y-3">
                {misconceptions.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{m.trigger}</span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                        {m.affectedLearnerCount} students
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600">{m.note}</p>

                    {m.sampleDistractorExplanation && (
                      <div className="p-2 rounded-lg bg-white border border-amber-200/80 text-[10px] text-amber-900 italic">
                        {m.sampleDistractorExplanation}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-500 font-medium truncate max-w-[60%]">
                        {m.affectedLearnerNames.join(", ")}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenAssignmentModalWithParams({
                            title: `Misconception Fix: ${m.trigger}`,
                            description: m.recommendedRemediationAction,
                            skillId: m.affectedSkillId,
                            type: "practice",
                            targetIds: m.affectedLearnerIds
                          })
                        }
                        className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-[10px] transition cursor-pointer"
                      >
                        Remediate Cluster
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: ROSTER & ADAPTIVE GROUPS */}
      {activeTab === "classrooms" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          {/* Sub-view toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-black text-slate-900">Classroom Roster & Adaptive Segmentation</h3>
              <p className="text-xs text-slate-500">
                Diagnostic monitoring across individual student profiles and automated competency-based groupings.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-1 bg-slate-100 rounded-2xl flex items-center">
                <button
                  type="button"
                  onClick={() => setRosterSubView("roster")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    rosterSubView === "roster"
                      ? "bg-white text-indigo-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  All Students ({roster.length})
                </button>
                <button
                  type="button"
                  onClick={() => setRosterSubView("groups")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    rosterSubView === "groups"
                      ? "bg-white text-indigo-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Adaptive Groups ({adaptiveGroups.length})
                </button>
              </div>
            </div>
          </div>

          {/* Sub-View A: Traditional Roster */}
          {rosterSubView === "roster" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative">
                  <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={rosterSearch}
                    onChange={(e) => setRosterSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 w-full sm:w-64"
                  />
                </div>
                <span className="text-xs text-slate-400 font-semibold">{filteredRoster.length} active learners</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="pb-3 px-3">Learner Name</th>
                      <th className="pb-3 px-3">Mastery Avg</th>
                      <th className="pb-3 px-3">Retrieval Indep.</th>
                      <th className="pb-3 px-3">Exam Readiness</th>
                      <th className="pb-3 px-3">Identified Blockers / Misconceptions</th>
                      <th className="pb-3 px-3">Pending Tasks</th>
                      <th className="pb-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredRoster.map((student) => (
                      <tr key={student.learnerId} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-slate-900">{student.name}</div>
                          <div className="text-[11px] text-slate-400">{student.email}</div>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-black text-xs ${
                                student.masteryScore >= 80
                                  ? "text-emerald-600"
                                  : student.masteryScore >= 60
                                  ? "text-indigo-600"
                                  : "text-rose-600"
                              }`}
                            >
                              {student.masteryScore}%
                            </span>
                            <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  student.masteryScore >= 80
                                    ? "bg-emerald-500"
                                    : student.masteryScore >= 60
                                    ? "bg-indigo-500"
                                    : "bg-rose-500"
                                }`}
                                style={{ width: `${student.masteryScore}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className="font-bold text-slate-700">{student.retrievalIndependenceRate}%</span>
                          <span className="text-[10px] text-slate-400 block">unassisted answers</span>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {student.examReadinessScore} / 100
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="space-y-1 max-w-xs">
                            {student.prerequisiteBlockers.length > 0 && (
                              <div className="text-[10px] font-semibold text-rose-700 flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3 shrink-0" />
                                <span>Prereq: {student.prerequisiteBlockers.join(", ")}</span>
                              </div>
                            )}
                            {student.recurringMisconceptions.length > 0 ? (
                              <div className="text-[10px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                {student.recurringMisconceptions[0]}
                              </div>
                            ) : (
                              <span className="text-[10px] text-emerald-600 font-semibold">✓ Steady Progression</span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                            {student.pendingAssignmentsCount} pending
                          </span>
                        </td>

                        <td className="py-3.5 px-3 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenAssignmentModalWithParams({
                                title: `Targeted Scaffold for ${student.name}`,
                                targetIds: [student.learnerId]
                              })
                            }
                            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-bold text-[11px] transition cursor-pointer"
                          >
                            Assign Task
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sub-View B: Automatic Adaptive Groups */}
          {rosterSubView === "groups" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {adaptiveGroups.map((grp) => (
                <div
                  key={grp.id}
                  className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between space-y-4 hover:shadow-xs transition"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                        {grp.category ? grp.category.replace(/_/g, " ") : "Group"}
                      </span>
                      <span className="text-xs font-bold text-slate-500">{grp.learnerIds.length} Students</span>
                    </div>

                    <h4 className="text-sm font-black text-slate-900">{grp.name}</h4>
                    <p className="text-xs text-slate-600">{grp.rationale}</p>

                    <div className="pt-2">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Members:</span>
                      <div className="flex flex-wrap gap-1">
                        {grp.learnerNames.map((name, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] text-slate-700 font-medium">
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenAssignmentModalWithParams({
                          title: `Group Task: ${grp.name}`,
                          description: grp.recommendedAction,
                          unitId: grp.recommendedUnitId,
                          skillId: grp.recommendedSkillId,
                          type: grp.recommendedAssignmentType,
                          targetIds: grp.learnerIds
                        })
                      }
                      className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Dispatch Assignment to Group</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ASSIGNMENTS & LIFECYCLE TRACKER */}
      {activeTab === "assignments" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-slate-900">Classroom Assignments & Lifecycle Tracking</h3>
              <p className="text-xs text-slate-500">
                Monitor student submissions, retrieval independence rates, and deterministic learning effectiveness.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-1 bg-slate-100 rounded-xl flex items-center text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setAssignmentFilter("all")}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    assignmentFilter === "all" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-600"
                  }`}
                >
                  All ({assignments.length})
                </button>
                <button
                  type="button"
                  onClick={() => setAssignmentFilter("active")}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    assignmentFilter === "active" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-600"
                  }`}
                >
                  Active
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setNewAsgTargetGroup("all");
                  setNewAsgCustomIds([]);
                  setShowNewAssignmentModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>New Assignment</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {assignments
              .filter((asg) => (assignmentFilter === "all" ? true : asg.status === assignmentFilter))
              .map((asg) => {
                const totalTarget = (asg.targetLearnerIds?.length || 0) > 0 ? asg.targetLearnerIds.length : roster.length;
                const completedCount = asg.completedLearnerIds?.length || 0;
                const progressPct = totalTarget > 0 ? Math.round((completedCount / totalTarget) * 100) : 0;

                return (
                  <div
                    key={asg.id}
                    className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:border-indigo-300 transition"
                  >
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                          {asg.assignmentType ? asg.assignmentType.replace("_", " ") : "Assignment"}
                        </span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                          {asg.status.toUpperCase()}
                        </span>
                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          Due {asg.dueDate}
                        </span>
                      </div>

                      <h4 className="text-base font-black text-slate-900">{asg.title}</h4>
                      <p className="text-xs text-slate-600">{asg.description}</p>

                      <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium">
                        <span>
                          Audience:{" "}
                          <strong className="text-slate-800">
                            {(asg.targetLearnerIds?.length || 0) > 0 ? `${asg.targetLearnerIds.length} Targeted Students` : "Entire Class"}
                          </strong>
                        </span>
                        {asg.differentiationConfig && (
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <Sliders className="h-3 w-3" /> Adaptive Differentiation Active
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
                      <div className="space-y-1.5 w-44">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-600">Completion</span>
                          <span className="text-indigo-600">{progressPct}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: `${progressPct}%` }} />
                        </div>
                        <span className="text-[10px] text-slate-400 block text-right">
                          {completedCount} of {totalTarget} submitted
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setInspectingAssignment(asg)}
                        className="px-3.5 py-2 rounded-xl bg-white hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Inspect Progress</span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* TAB 3: DIAGNOSTIC INTERVENTIONS */}
      {activeTab === "interventions" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-slate-900">Diagnostic Teacher Interventions</h3>
              <p className="text-xs text-slate-500">
                Prioritized intervention queue with full lifecycle progression (Recommended → Reviewed → Assigned → Resolved).
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {interventions.filter((i) => i.status === "recommended").length} Pending Actions
            </span>
          </div>

          <div className="space-y-4">
            {interventions.map((rec) => (
              <div
                key={rec.id}
                className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-slate-300 transition"
              >
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                        rec.priority === "high"
                          ? "bg-rose-100 text-rose-800 border border-rose-200"
                          : "bg-amber-100 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {rec.priority} Priority
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                      {rec.type ? rec.type.replace(/_/g, " ") : "Recommendation"}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800">
                      STATUS: {rec.status.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="text-base font-black text-slate-900">{rec.targetSkillTitle}</h4>
                  <p className="text-xs text-slate-600">{rec.evidenceRationale}</p>

                  <div className="text-[11px] text-slate-500">
                    Affected Learners: <strong className="text-slate-800">{rec.affectedLearnerNames.join(", ")}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  {rec.status === "recommended" && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleUpdateIntervention(rec.id, "reviewed")}
                        className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition cursor-pointer"
                      >
                        Mark Reviewed
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleUpdateIntervention(rec.id, "assigned");
                          handleOpenAssignmentModalWithParams({
                            title: rec.recommendedActionTitle,
                            description: rec.evidenceRationale,
                            skillId: rec.targetSkillId,
                            type: "guided_remediation",
                            targetIds: rec.affectedLearnerIds
                          });
                        }}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Accept & Assign</span>
                      </button>
                    </>
                  )}

                  {rec.status === "assigned" && (
                    <button
                      type="button"
                      onClick={() => handleUpdateIntervention(rec.id, "resolved")}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Mark Resolved</span>
                    </button>
                  )}

                  {rec.status === "resolved" && (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Resolved
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: 5-PHASE LESSON SCAFFOLDING */}
      {activeTab === "lessons" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-slate-900">5-Phase Pedagogical Lesson Scaffolding</h3>
              <p className="text-xs text-slate-500">
                Hook & Warmup → Direct Instruction → Guided Socratic Practice → Collaborative Task → Formative Exit Check.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAiModal(true)}
              className="px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs flex items-center gap-2 transition cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Draft New Lesson with AI</span>
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Lesson Plans</span>
              {lessonPlans.map((lp) => (
                <button
                  key={lp.id}
                  type="button"
                  onClick={() => setSelectedPlan(lp)}
                  className={`w-full text-left p-4 rounded-2xl border transition cursor-pointer ${
                    selectedPlan?.id === lp.id
                      ? "bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500 shadow-xs"
                      : "bg-slate-50/60 border-slate-200 hover:bg-slate-100/80"
                  }`}
                >
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                    {lp.durationMinutes} Mins • {lp.targetLevel ? lp.targetLevel.replace("_", " ") : "All Levels"}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1.5">{lp.title}</h4>
                  {lp.linkedQRCompanionCode && (
                    <div className="mt-2 text-[10px] text-indigo-600 font-semibold flex items-center gap-1">
                      <QrCode className="h-3 w-3" />
                      <span>QR: {lp.linkedQRCompanionCode}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {selectedPlan && (
              <div className="lg:col-span-2 space-y-5 bg-slate-50/50 p-6 rounded-3xl border border-slate-200">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600 uppercase">Lesson Specification</span>
                    {selectedPlan.linkedQRCompanionCode && onNavigateToQRHub && (
                      <button
                        type="button"
                        onClick={() => onNavigateToQRHub(selectedPlan.linkedQRCompanionCode!)}
                        className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <QrCode className="h-3.5 w-3.5" />
                        <span>Launch QR Textbook Code</span>
                      </button>
                    )}
                  </div>
                  <h3 className="text-xl font-black text-slate-900">{selectedPlan.title}</h3>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase text-slate-500">5-Phase Flow Structure</span>
                  <div className="space-y-3">
                    {selectedPlan.phases.map((phase, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-xs text-indigo-700">
                            Phase {idx + 1}: {phase.phaseName}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400">{phase.durationMinutes} mins</span>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                            <span className="font-bold text-slate-800 block mb-1">Teacher Guidance:</span>
                            <p className="text-slate-600">{phase.teacherGuidance}</p>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                            <span className="font-bold text-slate-800 block mb-1">Student Activity:</span>
                            <p className="text-slate-600">{phase.studentActivity}</p>
                          </div>
                        </div>
                        {phase.commonStumblingBlocks && phase.commonStumblingBlocks.length > 0 && (
                          <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-center gap-1.5">
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                            <span>Trap: {phase.commonStumblingBlocks.join("; ")}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: COHORT ANALYTICS */}
      {activeTab === "analytics" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">{analytics.className}</span>
              <h3 className="text-xl font-black text-slate-900 mt-1">Mastery & Examination Performance Snapshot</h3>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 text-slate-700">
              {roster.length} Enrolled Learners
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1">
              <span className="text-xs font-bold text-indigo-900 uppercase">Average Mastery</span>
              <p className="text-2xl font-black text-indigo-700">{analytics.averageMasteryScore}%</p>
              <p className="text-[11px] text-indigo-600">Aggregated across all curriculum units</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1">
              <span className="text-xs font-bold text-emerald-900 uppercase">Recent CBT Exam Avg</span>
              <p className="text-2xl font-black text-emerald-700">{analytics.recentExamAverage}%</p>
              <p className="text-[11px] text-emerald-600">Standardized UTME Mock Score</p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1">
              <span className="text-xs font-bold text-amber-900 uppercase">Retrieval Independence</span>
              <p className="text-2xl font-black text-amber-700">{analytics.retrievalIndependenceAverage}%</p>
              <p className="text-[11px] text-amber-600">Unassisted problem solving rate</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-600 uppercase">Assignment Completion</span>
              <p className="text-2xl font-black text-slate-800">{analytics.assignmentCompletionRate}%</p>
              <p className="text-[11px] text-slate-500">Cohort active submission rate</p>
            </div>
          </div>

          {/* Common Misconceptions */}
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Top Cohort Misconception Clusters
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {analytics.commonMisconceptions.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white border border-amber-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{m.trigger}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800">
                      {m.count} students
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">{m.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: INSTITUTIONAL AUDIT TRAIL & SECURITY GOVERNANCE */}
      {activeTab === "governance" && (
        <div className="space-y-6">
          {/* Header & Metrics Strip */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                    <ShieldCheck className="h-3.5 w-3.5 text-rose-600" /> Tamper-Evident Security Log
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Append-Only Local Audit Trail
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  Institutional Security & Governance Inspector
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Forensic audit trail of all role switches, assignment dispatches, curriculum access boundaries, backup lifecycles, and authorization enforcement decisions.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditEvents, null, 2));
                    const downloadAnchor = document.createElement("a");
                    downloadAnchor.setAttribute("href", dataStr);
                    downloadAnchor.setAttribute("download", `moos_academy_audit_trail_${Date.now()}.json`);
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5 text-indigo-300" />
                  <span>Export Audit JSON</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAuditEvents(auditService.getEvents())}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Activity className="h-3.5 w-3.5 text-slate-500" />
                  <span>Refresh Log</span>
                </button>
              </div>
            </div>

            {/* Audit Summary Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Total Logged Events</span>
                <p className="text-2xl font-black text-slate-900 mt-0.5">{auditEvents.length}</p>
                <span className="text-[10px] text-slate-500">Append-only local log</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">Authorized Actions</span>
                <p className="text-2xl font-black text-emerald-800 mt-0.5">
                  {auditEvents.filter((e) => e.result === "SUCCESS").length}
                </p>
                <span className="text-[10px] text-emerald-600">Compliant operations</span>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700">Security Denials</span>
                <p className="text-2xl font-black text-rose-800 mt-0.5">
                  {auditEvents.filter((e) => e.result === "DENIED").length}
                </p>
                <span className="text-[10px] text-rose-600">Access policy violations</span>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700">Integrity State</span>
                <p className="text-base font-black text-indigo-900 mt-1 flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>VERIFIED</span>
                </p>
                <span className="text-[10px] text-indigo-600">Zero remote exfiltration</span>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by Actor, Resource ID, Denial reason, or event type..."
                    value={auditSearchQuery}
                    onChange={(e) => setAuditSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={auditFilterType}
                  onChange={(e) => setAuditFilterType(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="ALL">All Event Types</option>
                  <option value="AUTHORIZATION_DENIED">Security Denials (AUTHORIZATION_DENIED)</option>
                  <option value="USER_SWITCHED">Role Switches (USER_SWITCHED)</option>
                  <option value="ASSIGNMENT">Assignment Events</option>
                  <option value="BACKUP">Backup & Recovery</option>
                  <option value="INTERVENTION">Interventions</option>
                </select>

                <select
                  value={auditFilterResult}
                  onChange={(e) => setAuditFilterResult(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="ALL">All Outcomes</option>
                  <option value="SUCCESS">SUCCESS</option>
                  <option value="DENIED">DENIED</option>
                  <option value="FAILED">FAILED</option>
                </select>
              </div>
            </div>

            {/* Audit Log Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Outcome</th>
                    <th className="py-3 px-4">Event Type</th>
                    <th className="py-3 px-4">Actor</th>
                    <th className="py-3 px-4">Resource Target</th>
                    <th className="py-3 px-4">Forensic Reason & Context</th>
                    <th className="py-3 px-4 text-right">Inspection</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditEvents
                    .filter((ev) => {
                      if (auditFilterType !== "ALL") {
                        if (auditFilterType === "ASSIGNMENT" && !ev.eventType.startsWith("ASSIGNMENT")) return false;
                        if (auditFilterType === "BACKUP" && !ev.eventType.startsWith("BACKUP")) return false;
                        if (auditFilterType === "INTERVENTION" && !ev.eventType.startsWith("INTERVENTION")) return false;
                        if (auditFilterType === "AUTHORIZATION_DENIED" && ev.eventType !== "AUTHORIZATION_DENIED") return false;
                        if (auditFilterType === "USER_SWITCHED" && ev.eventType !== "USER_SWITCHED") return false;
                      }
                      if (auditFilterResult !== "ALL" && ev.result !== auditFilterResult) return false;
                      if (auditSearchQuery.trim()) {
                        const q = auditSearchQuery.toLowerCase();
                        const match =
                          ev.actorId.toLowerCase().includes(q) ||
                          ev.eventType.toLowerCase().includes(q) ||
                          (ev.actorDisplayName || "").toLowerCase().includes(q) ||
                          (ev.reason || "").toLowerCase().includes(q) ||
                          (ev.resourceId || "").toLowerCase().includes(q);
                        if (!match) return false;
                      }
                      return true;
                    })
                    .slice()
                    .reverse()
                    .map((ev) => (
                      <tr key={ev.eventId} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                          {new Date(ev.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                          <span className="block text-[9px] text-slate-400">
                            {new Date(ev.timestamp).toLocaleDateString()}
                          </span>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded-md font-extrabold text-[10px] uppercase tracking-wider ${
                              ev.result === "SUCCESS"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : ev.result === "DENIED"
                                ? "bg-rose-100 text-rose-800 border border-rose-200"
                                : "bg-amber-100 text-amber-800 border border-amber-200"
                            }`}
                          >
                            {ev.result}
                          </span>
                        </td>

                        <td className="py-3 px-4 font-mono text-slate-900 font-bold text-[11px] whitespace-nowrap">
                          {ev.eventType}
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase ${
                                ev.actorRole === "ADMIN"
                                  ? "bg-rose-100 text-rose-800"
                                  : ev.actorRole === "TEACHER"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-indigo-100 text-indigo-800"
                              }`}
                            >
                              {ev.actorRole}
                            </span>
                            <span className="font-semibold text-slate-700">{ev.actorDisplayName || ev.actorId}</span>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                          {ev.resourceType}
                          {ev.resourceId ? `:${ev.resourceId.substring(0, 15)}` : ""}
                        </td>

                        <td className="py-3 px-4 text-slate-600 max-w-xs truncate text-[11px]">
                          {ev.reason || "—"}
                        </td>

                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => setSelectedAuditEvent(ev)}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition cursor-pointer"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {auditEvents.length === 0 && (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No audit events recorded yet. Actions will populate here deterministically.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: INSPECT AUDIT EVENT FORENSIC DETAILS */}
      {selectedAuditEvent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      selectedAuditEvent.result === "SUCCESS"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {selectedAuditEvent.result}
                  </span>
                  <span className="font-mono text-xs text-slate-400">{selectedAuditEvent.eventId}</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">{selectedAuditEvent.eventType}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAuditEvent(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Actor Role & ID</span>
                <p className="font-bold text-slate-800 mt-0.5">{selectedAuditEvent.actorDisplayName || selectedAuditEvent.actorId}</p>
                <span className="font-mono text-[10px] text-slate-500">[{selectedAuditEvent.actorRole}] {selectedAuditEvent.actorId}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Timestamp</span>
                <p className="font-bold text-slate-800 mt-0.5">{new Date(selectedAuditEvent.timestamp).toLocaleString()}</p>
                <span className="font-mono text-[10px] text-slate-500">{selectedAuditEvent.timestamp}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Forensic Justification / Reason</span>
              <p className="text-slate-800 font-medium">{selectedAuditEvent.reason || "No explicit reason specified."}</p>
              {selectedAuditEvent.metadata?.denialCode && (
                <div className="pt-1">
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-mono text-[10px] font-bold">
                    DENIAL_CODE: {selectedAuditEvent.metadata.denialCode}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Raw Audit Event Envelope</span>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(JSON.stringify(selectedAuditEvent, null, 2))}
                  className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                >
                  Copy JSON
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto max-h-48">
                {JSON.stringify(selectedAuditEvent, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: INSPECT ASSIGNMENT LIFECYCLE & EFFECTIVENESS */}
      {inspectingAssignment && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                  {inspectingAssignment.assignmentType ? inspectingAssignment.assignmentType.replace("_", " ") : "Assignment"}
                </span>
                <h3 className="text-lg font-black text-slate-900">{inspectingAssignment.title}</h3>
                <p className="text-xs text-slate-500">{inspectingAssignment.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setInspectingAssignment(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
                Student-by-Student Lifecycle & Effectiveness Evidence
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase">
                      <th className="py-2 px-2">Student</th>
                      <th className="py-2 px-2">Status</th>
                      <th className="py-2 px-2">Score</th>
                      <th className="py-2 px-2">Retrieval Indep.</th>
                      <th className="py-2 px-2">Pre / Post Mastery</th>
                      <th className="py-2 px-2">Effectiveness Verdict</th>
                      <th className="py-2 px-2 text-right">Remediation Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {Object.values(inspectingAssignment.learnerProgress || {}).map((prog) => (
                      <tr key={prog.learnerId} className="hover:bg-slate-50">
                        <td className="py-3 px-2 font-bold text-slate-800">{prog.learnerName}</td>
                        <td className="py-3 px-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                              prog.status === "completed"
                                ? "bg-emerald-100 text-emerald-800"
                                : prog.status === "in_progress"
                                ? "bg-indigo-100 text-indigo-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {prog.status ? prog.status.replace("_", " ") : "Assigned"}
                          </span>
                        </td>
                        <td className="py-3 px-2 font-semibold text-slate-700">
                          {prog.scorePercentage !== undefined ? `${prog.scorePercentage}%` : "—"}
                        </td>
                        <td className="py-3 px-2 font-semibold text-slate-700">
                          {prog.retrievalIndependenceRate}%
                        </td>
                        <td className="py-3 px-2 font-medium text-slate-600">
                          {prog.preAssignmentMastery ?? 70}% → {prog.postAssignmentMastery ?? prog.preAssignmentMastery ?? 70}%
                        </td>
                        <td className="py-3 px-2">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              prog.effectivenessVerdict === "improvement_observed" || prog.effectivenessVerdict === "mastery_evidence_strengthened"
                                ? "bg-emerald-100 text-emerald-800"
                                : prog.effectivenessVerdict === "remediation_remains_unresolved"
                                ? "bg-rose-100 text-rose-800"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {prog.effectivenessVerdict?.replace(/_/g, " ") || "insufficient evidence"}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <button
                            type="button"
                            onClick={() => handleCreateInterventionFromOutcome(inspectingAssignment.id, prog.learnerId)}
                            className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[10px] transition cursor-pointer"
                          >
                            Dispatch Remediation
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="button"
                onClick={() => setInspectingAssignment(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE NEW ASSIGNMENT */}
      {showNewAssignmentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Distribute New Assignment</h3>
                <p className="text-xs text-slate-500">Configure differentiated task parameters for {selectedClass?.name}</p>
              </div>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Assignment Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Quadratic Discriminant Mastery Drill"
                  value={newAsgTitle}
                  onChange={(e) => setNewAsgTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Curriculum Unit</label>
                  <select
                    value={newAsgUnitId}
                    onChange={(e) => {
                      setNewAsgUnitId(e.target.value);
                      const u = curriculumService.getUnitById(e.target.value);
                      if (u && u.skills[0]) setNewAsgSkillId(u.skills[0].id);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  >
                    {curriculumService.getAllUnits().map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Target Skill</label>
                  <select
                    value={newAsgSkillId}
                    onChange={(e) => setNewAsgSkillId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  >
                    {selectedUnitSkills.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Assignment Type</label>
                  <select
                    value={newAsgType}
                    onChange={(e) => setNewAsgType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  >
                    <option value="practice">Standard Formative Practice</option>
                    <option value="guided_remediation">Guided Remediation</option>
                    <option value="exam_prep">WAEC/JAMB CBT Exam Prep</option>
                    <option value="challenge">Advanced Challenge</option>
                    <option value="diagnostic">Diagnostic Assessment</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Due Date</label>
                  <input
                    type="date"
                    value={newAsgDueDate}
                    onChange={(e) => setNewAsgDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Differentiation Options */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-black uppercase text-indigo-900 block">
                  Dynamic Learning Supply Differentiation
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={adaptiveDifficultyEnabled}
                      onChange={(e) => setAdaptiveDifficultyEnabled(e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    <span className="font-semibold text-slate-700">Adaptive Difficulty</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prereqWarmupEnabled}
                      onChange={(e) => setPrereqWarmupEnabled(e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    <span className="font-semibold text-slate-700">Prereq Warm-Up</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Target Audience</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setNewAsgTargetGroup("all");
                      setNewAsgCustomIds([]);
                    }}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border text-center transition cursor-pointer ${
                      newAsgTargetGroup === "all"
                        ? "bg-indigo-50 border-indigo-600 text-indigo-700 ring-1 ring-indigo-600"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    Entire Class
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNewAsgTargetGroup("struggling");
                      setNewAsgCustomIds([]);
                    }}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border text-center transition cursor-pointer ${
                      newAsgTargetGroup === "struggling"
                        ? "bg-indigo-50 border-indigo-600 text-indigo-700 ring-1 ring-indigo-600"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    Struggling
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewAsgTargetGroup("custom")}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border text-center transition cursor-pointer ${
                      newAsgTargetGroup === "custom"
                        ? "bg-indigo-50 border-indigo-600 text-indigo-700 ring-1 ring-indigo-600"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    Targeted ({newAsgCustomIds.length})
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewAssignmentModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition shadow-md cursor-pointer"
                >
                  Distribute to Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE NEW CLASS */}
      {showNewClassModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Create New Cohort</h3>
                <p className="text-xs text-slate-500">Initialize a classroom roster and room code.</p>
              </div>
            </div>

            <form onSubmit={handleCreateClass} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Cohort Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SS3 Science — Advanced Math"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Education Level</label>
                <select
                  value={newClassLevel}
                  onChange={(e) => setNewClassLevel(e.target.value as EducationalLevel)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                >
                  <option value="primary_foundations">Primary Foundations (Grades 1-3)</option>
                  <option value="upper_primary">Upper Primary (Grades 4-6 / Common Entrance)</option>
                  <option value="junior_secondary">Junior Secondary (NERDC / BECE / JSS 1-3)</option>
                  <option value="senior_secondary">Senior Secondary (WAEC / WASSCE / SS 1-3)</option>
                  <option value="university_prep">University Prep (JAMB / UTME / Advanced)</option>
                  <option value="exam_prep">Exam Prep Intensive (WAEC / NECO / GCSE)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewClassModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition shadow-md cursor-pointer"
                >
                  Create Cohort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: AI LESSON & MATERIAL COPILOT */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Teacher Studio AI Copilot</h3>
                <p className="text-xs text-slate-500">Synthesize curriculum-grounded lesson plans, notes, and differentiated worksheets across all domains.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1 sm:col-span-3">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Document Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "lesson_plan", label: "Lesson Plan" },
                    { id: "teaching_notes", label: "Class Notes" },
                    { id: "worksheet", label: "Worksheet" },
                    { id: "intervention_guide", label: "Remedial Guide" }
                  ].map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setGenerationMaterialType(doc.id as any)}
                      className={`px-2.5 py-2 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                        generationMaterialType === doc.id
                          ? "bg-indigo-50 border-indigo-600 text-indigo-700 ring-1 ring-indigo-600"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {doc.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 sm:col-span-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Subject Domain</label>
                <select
                  value={generationSubject}
                  onChange={(e) => setGenerationSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="English Language">English Language</option>
                  <option value="Science & STEM">Science & STEM</option>
                  <option value="Computer Science & ICT">Computer Science & ICT</option>
                  <option value="Economics">Economics</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Educational Level</label>
                <select
                  value={generationLevel}
                  onChange={(e) => setGenerationLevel(e.target.value as EducationalLevel)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                >
                  <option value="primary_foundations">Primary Foundations (Grades 1-3)</option>
                  <option value="upper_primary">Upper Primary (Grades 4-6)</option>
                  <option value="junior_secondary">Junior Secondary (JSS 1-3)</option>
                  <option value="senior_secondary">Senior Secondary (SSS 1-3)</option>
                  <option value="university_prep">University Prep (JAMB / UTME)</option>
                  <option value="exam_prep">Exam Prep Intensive</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Lesson Topic or Learning Goal</label>
              <input
                type="text"
                value={generationObjective}
                onChange={(e) => setGenerationObjective(e.target.value)}
                placeholder="e.g. Circle Theorems, Formal Letter Writing, Newton's Laws, or Binary Trees"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-xs sm:text-sm"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">Agentic Governance Note:</span>
              <p>The Teacher Assistant Agent synthesizes pedagogically grounded, differentiated materials aligned to official curricula and QR companion resources.</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2.5 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isGeneratingLesson || !generationObjective.trim()}
                onClick={handleGenerateLessonPlan}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs sm:text-sm hover:bg-indigo-500 disabled:opacity-50 transition flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
              >
                {isGeneratingLesson ? (
                  <>
                    <Clock className="h-4 w-4 animate-spin" />
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Generate Document</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Institutional Backup & Restore Modal */}
      <BackupRestoreModal
        isOpen={showBackupModal}
        onClose={() => setShowBackupModal(false)}
        defaultScope="full_academy"
      />

      {/* Video Coverage Matrix Modal */}
      <VideoCoverageMatrixModal
        isOpen={showVideoMatrixModal}
        onClose={() => setShowVideoMatrixModal(false)}
        onOpenCreatorStudio={() => {
          setShowVideoMatrixModal(false);
          setShowVideoCreatorModal(true);
        }}
      />

      {/* Video Creator Studio Modal */}
      <VideoCreatorStudioModal
        isOpen={showVideoCreatorModal}
        onClose={() => setShowVideoCreatorModal(false)}
      />
    </div>
  );
};
