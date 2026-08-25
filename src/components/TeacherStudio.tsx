import React, { useState } from "react";
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
  BookMarked
} from "lucide-react";
import { teacherStudioService, SEEDED_LESSON_PLANS, SEEDED_INTERVENTION_PLANS, SEEDED_CLASS_ANALYTICS } from "../services/teacherStudioService";
import { TeacherLessonPlan, LearnerInterventionPlan } from "../types/teacherStudio";
import { agentOrchestrationService } from "../services/agentOrchestrationService";

interface TeacherStudioProps {
  onNavigateToTextbookStudio: () => void;
  onNavigateToQRHub?: (code: string) => void;
}

export const TeacherStudio: React.FC<TeacherStudioProps> = ({
  onNavigateToTextbookStudio,
  onNavigateToQRHub
}) => {
  const [activeTab, setActiveTab] = useState<"lessons" | "interventions" | "assessments" | "analytics">("lessons");
  const [lessonPlans, setLessonPlans] = useState<TeacherLessonPlan[]>(teacherStudioService.getLessonPlans());
  const [selectedPlan, setSelectedPlan] = useState<TeacherLessonPlan>(lessonPlans[0]);
  const [interventions] = useState<LearnerInterventionPlan[]>(teacherStudioService.getInterventions());
  const analytics = teacherStudioService.getClassAnalytics();

  const [isGeneratingLesson, setIsGeneratingLesson] = useState(false);
  const [generationObjective, setGenerationObjective] = useState("");
  const [showAiModal, setShowAiModal] = useState(false);

  const handleGenerateLessonPlan = async () => {
    if (!generationObjective.trim()) return;
    setIsGeneratingLesson(true);
    try {
      const task = await agentOrchestrationService.orchestrateTask(
        "teacher_assistant_agent",
        `Synthesize 5-phase lesson plan for: ${generationObjective}`,
        {
          userId: "user-teacher-001",
          userRole: "teacher",
          targetSubject: "Mathematics",
          targetLevel: "senior_secondary"
        }
      );

      const newPlan = teacherStudioService.createLessonPlan({
        title: generationObjective,
        subjectId: "subj-mth-senior",
        unitId: "unit-mth-gen",
        skillId: "skill-gen-01",
        targetLevel: "senior_secondary",
        durationMinutes: 45,
        learningObjectives: [
          "Establish first-principles intuitive understanding.",
          "Apply mathematical derivations to structured problems.",
          "Identify and avoid standard examiner traps."
        ],
        phases: [
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
            teacherGuidance: "Derive key algebraic principles step-by-step with LaTeX annotations.",
            studentActivity: "Record derivations in personal concept journals.",
            keyQuestionsToAsk: ["Why is this step mathematically necessary?"],
            commonStumblingBlocks: ["Sign inversion during transposition."]
          },
          {
            phaseName: "Guided Socratic Practice",
            durationMinutes: 15,
            teacherGuidance: "Circulate among students guiding step-by-step problem sets.",
            studentActivity: "Solve 2 scaffolded problems with graduated hints.",
            keyQuestionsToAsk: ["How does this compare with the standard formula?"],
            commonStumblingBlocks: ["Forgetting to verify domain constraints."]
          },
          {
            phaseName: "Collaborative Task",
            durationMinutes: 5,
            teacherGuidance: "Challenge pairs to identify a deliberate error planted in a sample solution.",
            studentActivity: "Spot the misapplied formula and provide the correct derivation.",
            keyQuestionsToAsk: ["Where exactly did the logic break down?"],
            commonStumblingBlocks: ["Overlooking denominator zero constraints."]
          },
          {
            phaseName: "Formative Exit Check",
            durationMinutes: 5,
            teacherGuidance: "Collect 1-minute diagnostic ticket to gauge cohort readiness.",
            studentActivity: "Independently answer 1 targeted question.",
            keyQuestionsToAsk: ["What is your confidence level in this solution?"],
            commonStumblingBlocks: ["Skipping intermediate algebraic working."]
          }
        ],
        homeworkOrExtension: "Complete the 4 QR companion practice problems on the digital portal.",
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

  return (
    <div id="teacher-studio-container" className="space-y-6">
      {/* Studio Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="h-3.5 w-3.5" />
              MOOS TECHY TEACHER STUDIO • INSTRUCTIONAL ENGINE
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Pedagogical Design & Cohort Mastery Studio
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Curate 5-phase Socratic lesson plans, design WAEC/JAMB CBT aligned assessments, orchestrate diagnostic student interventions, and bridge classroom instruction to physical QR textbooks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="btn-ai-lesson-copilot"
              type="button"
              onClick={() => setShowAiModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition active:scale-95"
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>AI Lesson Copilot</span>
            </button>

            <button
              id="btn-open-textbook-studio"
              type="button"
              onClick={onNavigateToTextbookStudio}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition"
            >
              <BookOpen className="h-4 w-4 text-indigo-400" />
              <span>Textbook Studio</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-800/80 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("lessons")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === "lessons"
                ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <BookMarked className="h-4 w-4" />
            <span>Lesson Scaffolding ({lessonPlans.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("interventions")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === "interventions"
                ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span>Learner Interventions ({interventions.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === "analytics"
                ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <BarChart3 className="h-4 w-4 text-emerald-400" />
            <span>Class Cohort Analytics</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === "lessons" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Lesson Index */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lesson Plans</h3>
              <span className="text-xs font-medium text-slate-400">WAEC / UTME Aligned</span>
            </div>

            <div className="space-y-2">
              {lessonPlans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-4 rounded-2xl border transition cursor-pointer ${
                    selectedPlan?.id === plan.id
                      ? "bg-white border-indigo-600 shadow-md shadow-indigo-600/10 ring-1 ring-indigo-600"
                      : "bg-white/80 border-slate-200/80 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase">
                      {plan.targetLevel.replace("_", " ")}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {plan.durationMinutes}m
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm mt-2 line-clamp-2">{plan.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{plan.learningObjectives[0]}</p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-[11px]">
                    <span className="font-medium text-indigo-600 flex items-center gap-1">
                      <QrCode className="h-3 w-3" />
                      {plan.linkedQRCompanionCode || "QR Linked"}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      {plan.lifecycleStatus.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Active Lesson Plan Detail */}
          <div className="lg:col-span-8">
            {selectedPlan && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                        Senior Secondary Mathematics
                      </span>
                      <span className="text-xs font-bold text-slate-400">•</span>
                      <span className="text-xs font-bold text-slate-500">{selectedPlan.durationMinutes} Minutes</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5">{selectedPlan.title}</h2>
                  </div>

                  {selectedPlan.linkedQRCompanionCode && (
                    <button
                      type="button"
                      onClick={() => onNavigateToQRHub?.(selectedPlan.linkedQRCompanionCode!)}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition"
                    >
                      <QrCode className="h-3.5 w-3.5 text-indigo-600" />
                      <span>{selectedPlan.linkedQRCompanionCode}</span>
                    </button>
                  )}
                </div>

                {/* Learning Objectives */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Core Learning Objectives</h4>
                  <ul className="space-y-1.5">
                    {selectedPlan.learningObjectives.map((obj, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 5-Phase Scaffolding */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">5-Phase Pedagogical Progression</h4>
                  <div className="space-y-3">
                    {selectedPlan.phases.map((phase, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-indigo-700 uppercase tracking-wider">
                            Phase {idx + 1}: {phase.phaseName}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500">{phase.durationMinutes} mins</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700 pt-1">
                          <div className="bg-white p-3 rounded-xl border border-slate-200/60 space-y-1">
                            <span className="font-bold text-slate-900 block text-[11px] uppercase">Teacher Guidance</span>
                            <p className="text-slate-600">{phase.teacherGuidance}</p>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-slate-200/60 space-y-1">
                            <span className="font-bold text-slate-900 block text-[11px] uppercase">Student Activity</span>
                            <p className="text-slate-600">{phase.studentActivity}</p>
                          </div>
                        </div>

                        {phase.commonStumblingBlocks && phase.commonStumblingBlocks.length > 0 && (
                          <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 text-[11px] text-amber-900 flex items-start gap-2">
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold">Examiner Trap / Stumbling Block: </span>
                              <span>{phase.commonStumblingBlocks.join("; ")}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Homework & Extension */}
                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-indigo-900 uppercase">Independent Practice & Extension</span>
                    <p className="text-xs text-indigo-700 mt-0.5">{selectedPlan.homeworkOrExtension}</p>
                  </div>
                  <button
                    type="button"
                    onClick={onNavigateToTextbookStudio}
                    className="px-3 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shrink-0 hover:bg-indigo-700 transition"
                  >
                    View in Textbook
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Interventions */}
      {activeTab === "interventions" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-slate-900">Active Learner Diagnostic Interventions</h3>
              <p className="text-xs text-slate-500">Automated struggle alerts calibrated from recent practice, diagnostic, and CBT exam attempts.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
              {interventions.length} Students Flagged
            </span>
          </div>

          <div className="space-y-3">
            {interventions.map((item) => (
              <div key={item.id} className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{item.learnerName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                      Struggle Area
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-indigo-700">{item.identifiedStruggleSkillName}</p>
                  <p className="text-xs text-slate-600">{item.diagnosticObservation}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Recommended Action</span>
                    <span className="text-xs font-bold text-slate-700 capitalize">{item.recommendedAction.replace("_", " ")}</span>
                  </div>
                  {item.suggestedQRResources.length > 0 && (
                    <button
                      type="button"
                      onClick={() => onNavigateToQRHub?.(item.suggestedQRResources[0])}
                      className="px-3 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-indigo-700 transition"
                    >
                      <QrCode className="h-3.5 w-3.5" />
                      <span>Launch QR Review</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Analytics */}
      {activeTab === "analytics" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">{analytics.className}</span>
              <h3 className="text-xl font-black text-slate-900 mt-1">Mastery & Examination Performance Snapshot</h3>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 text-slate-700">
              {analytics.totalEnrolled} Enrolled Learners
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1">
              <span className="text-xs font-bold text-indigo-900 uppercase">Average Mastery</span>
              <p className="text-2xl font-black text-indigo-700">{analytics.averageMasteryScore}%</p>
              <p className="text-[11px] text-indigo-600">Calculated across 28 syllabus skills</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1">
              <span className="text-xs font-bold text-emerald-900 uppercase">Recent CBT Exam Avg</span>
              <p className="text-2xl font-black text-emerald-700">{analytics.recentExamAverage}%</p>
              <p className="text-[11px] text-emerald-600">Standardized UTME Mock Score</p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1">
              <span className="text-xs font-bold text-amber-900 uppercase">Priority Interventions</span>
              <p className="text-2xl font-black text-amber-700">{analytics.priorityInterventionsCount}</p>
              <p className="text-[11px] text-amber-600">Action tickets requiring review</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-600 uppercase">Active Engagement</span>
              <p className="text-2xl font-black text-slate-800">{analytics.activeLearnersCount} / {analytics.totalEnrolled}</p>
              <p className="text-[11px] text-slate-500">Learners active in the last 48 hours</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Cohort Domain Strengths</h4>
            <div className="flex flex-wrap gap-2">
              {analytics.topStrengths.map((str, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-white border border-slate-300 text-slate-800 text-xs font-bold">
                  ✓ {str}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI Modal for Lesson Generation */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Teacher Studio AI Copilot</h3>
                <p className="text-xs text-slate-500">Synthesize objective-aligned 5-phase lesson plans with QR links.</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Lesson Topic or Learning Goal</label>
              <input
                type="text"
                value={generationObjective}
                onChange={(e) => setGenerationObjective(e.target.value)}
                placeholder="e.g. Circle Theorems: Tangents, Chords, and Angle Subtended at Center"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-xs sm:text-sm"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">Agentic Governance Note:</span>
              <p>The Teacher Assistant Agent will generate structured drafts following pedagogical boundaries. Human educator review and approval is required before publishing.</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2.5 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isGeneratingLesson || !generationObjective.trim()}
                onClick={handleGenerateLessonPlan}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs sm:text-sm hover:bg-indigo-500 disabled:opacity-50 transition flex items-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                {isGeneratingLesson ? (
                  <>
                    <Clock className="h-4 w-4 animate-spin" />
                    <span>Orchestrating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Generate Lesson Plan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
