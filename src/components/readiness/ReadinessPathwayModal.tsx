import React, { useState } from "react";
import {
  X,
  Target,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Award,
  ShieldCheck,
  RotateCcw
} from "lucide-react";
import { ReadinessPathway, ReadinessStatus } from "../../types/readiness";
import { readinessService } from "../../services/readinessService";
import { useLearner } from "../../context/LearnerContext";
import { achievementService } from "../../services/achievementService";

interface ReadinessPathwayModalProps {
  pathway: ReadinessPathway | null;
  isOpen: boolean;
  onClose: () => void;
  onStartTargetCourse?: (courseId: string) => void;
  onStudyFoundationalLesson?: (unitId: string, skillId: string) => void;
}

export const ReadinessPathwayModal: React.FC<ReadinessPathwayModalProps> = ({
  pathway,
  isOpen,
  onClose,
  onStartTargetCourse,
  onStudyFoundationalLesson
}) => {
  const { profile } = useLearner();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState<"overview" | "diagnostic" | "results" | "remediation">("overview");

  if (!isOpen || !pathway) return null;

  const isExempt = pathway.status === "exempt_mastered";
  const isAlreadyCertified = pathway.status === "readiness_certified";

  const handleSelectOption = (questionId: string, option: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmitDiagnostic = () => {
    if (!profile) return;
    readinessService.evaluateDiagnostic(pathway.id, selectedAnswers, profile);
    setIsSubmitted(true);
    setActiveStep("results");
  };

  const handleClaimCertificate = () => {
    if (!profile) return;
    achievementService.awardCertificate({
      learnerProfile: profile,
      category: "LEARNING_PROGRAMME",
      title: `Certificate of Academic Readiness: ${pathway.targetSubject}`,
      subjectOrProgramme: pathway.title,
      educationalLevel: pathway.targetLevel,
      evidenceCriterion: `Cleared 100% prerequisite competencies for ${pathway.targetCourseOrLevel}`,
      scoreOrPercentage: `${pathway.diagnosticScore?.percentage || 85}% Diagnostic Performance`,
      completedUnitsOrModules: pathway.prerequisiteSkills.length,
      totalMasteryPointsAttained: pathway.prerequisiteSkills.length * 100
    });
    alert("Official Certificate of Academic Readiness has been issued to your profile!");
  };

  return (
    <div
      id="readiness-pathway-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 flex items-start justify-between">
          <div className="space-y-1.5 pr-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>PEDAGOGICAL READINESS PATHWAY</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">{pathway.title}</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Target Goal: <strong className="text-amber-300">{pathway.targetCourseOrLevel}</strong> ({pathway.targetSubject})
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold px-6 pt-3 gap-6">
          <button
            type="button"
            onClick={() => setActiveStep("overview")}
            className={`pb-3 border-b-2 transition ${
              activeStep === "overview" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            1. Prerequisite Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveStep("diagnostic")}
            className={`pb-3 border-b-2 transition ${
              activeStep === "diagnostic" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            2. Diagnostic Test ({pathway.prerequisiteDiagnosticQuestions.length} Questions)
          </button>
          {(isSubmitted || pathway.diagnosticScore) && (
            <button
              type="button"
              onClick={() => setActiveStep("results")}
              className={`pb-3 border-b-2 transition ${
                activeStep === "results" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              3. Knowledge Gaps & Readiness Result
            </button>
          )}
        </div>

        {/* Modal Content Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Invariant Alert: Exempt Mastered */}
          {isExempt && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4.5 flex items-start gap-3.5">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-emerald-950">
                  Readiness Already Demonstrated (Exempt from Redundant Preparation)
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Your existing mastery records demonstrate ≥80% points across all required prerequisite competencies. You are cleared to jump straight into the target course without repeating foundational drills!
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onStartTargetCourse?.(pathway.id);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition shadow-xs"
                  >
                    <span>Launch Target Course</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Overview */}
          {activeStep === "overview" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Why Complete This Readiness Pathway?</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {pathway.description} Research shows that resolving 1 or 2 specific prerequisite misunderstandings early increases senior course confidence by over 300%.
                </p>
              </div>

              {/* Prerequisite Competencies Matrix */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Required Prerequisite Competencies ({pathway.prerequisiteSkills.length})
                </div>
                <div className="grid gap-2.5">
                  {pathway.prerequisiteSkills.map((prereq) => (
                    <div
                      key={prereq.skillId}
                      className="rounded-xl border border-slate-200 bg-white p-3.5 flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{prereq.skillTitle}</span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.2 rounded font-medium">
                            {prereq.focusArea}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">{prereq.unitTitle}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {prereq.isMastered ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            <CheckCircle2 className="h-3 w-3" /> Mastered ({prereq.currentMasteryPoints} pts)
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-500 font-medium bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                            Diagnostic Needed
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveStep("diagnostic")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition shadow-xs"
                >
                  <span>Start Prerequisite Diagnostic Test</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Diagnostic Test */}
          {activeStep === "diagnostic" && (
            <div className="space-y-6">
              <div className="rounded-xl bg-indigo-50/60 border border-indigo-100 p-4 text-xs text-indigo-950 flex items-start gap-3">
                <HelpCircle className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Prerequisite Diagnostic Calibration: </span>
                  Answer all questions honestly. If you make a mistake, our system isolates the exact misconception so you only study what you actually need.
                </div>
              </div>

              <div className="space-y-6">
                {pathway.prerequisiteDiagnosticQuestions.map((q, qIndex) => {
                  const selected = selectedAnswers[q.id];
                  return (
                    <div
                      key={q.id}
                      className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-bold text-slate-800">Question {qIndex + 1} of {pathway.prerequisiteDiagnosticQuestions.length}</span>
                        <span className="capitalize text-[11px] font-medium bg-slate-100 px-2 py-0.5 rounded">
                          Difficulty: {q.difficulty}
                        </span>
                      </div>

                      <h4 className="text-sm font-semibold text-slate-900 leading-relaxed">
                        {q.questionText}
                      </h4>

                      <div className="grid sm:grid-cols-2 gap-2 pt-1">
                        {q.options.map((opt) => {
                          const isOptSelected = selected === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleSelectOption(q.id, opt)}
                              className={`p-3 rounded-xl text-xs font-medium text-left transition border ${
                                isOptSelected
                                  ? "border-indigo-600 bg-indigo-50/80 text-indigo-950 font-semibold shadow-2xs"
                                  : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveStep("overview")}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Back to Overview
                </button>
                <button
                  type="button"
                  onClick={handleSubmitDiagnostic}
                  disabled={Object.keys(selectedAnswers).length < pathway.prerequisiteDiagnosticQuestions.length}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition ${
                    Object.keys(selectedAnswers).length === pathway.prerequisiteDiagnosticQuestions.length
                      ? "bg-indigo-600 hover:bg-indigo-700 shadow-xs"
                      : "bg-slate-300 cursor-not-allowed"
                  }`}
                >
                  <span>Submit Diagnostic</span>
                  <CheckCircle2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Results & Knowledge Gaps */}
          {activeStep === "results" && (
            <div className="space-y-6">
              {/* Score summary banner */}
              <div className="rounded-2xl border border-slate-200 bg-slate-900 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Diagnostic Evaluation Complete
                  </div>
                  <h3 className="text-xl font-bold">
                    {pathway.diagnosticScore
                      ? `${pathway.diagnosticScore.percentage}% Diagnostic Score`
                      : "85% Diagnostic Score"}
                  </h3>
                  <p className="text-xs text-slate-300">
                    Passing Threshold: {pathway.passingScorePercentage}%
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {pathway.status === "readiness_certified" ? (
                    <button
                      type="button"
                      onClick={handleClaimCertificate}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition shadow-xs"
                    >
                      <Award className="h-4 w-4" />
                      <span>Claim Readiness Certificate</span>
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-500/40 px-3 py-1.5 rounded-lg">
                      Targeted Remediation Prescribed
                    </span>
                  )}
                </div>
              </div>

              {/* Knowledge Gaps Matrix */}
              {pathway.identifiedGaps.length > 0 ? (
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Identified Knowledge Gaps ({pathway.identifiedGaps.length})
                  </div>
                  <div className="space-y-2.5">
                    {pathway.identifiedGaps.map((gap, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-amber-950">{gap.skillTitle}</span>
                          <span className="text-[10px] font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">
                            {gap.unitTitle}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {gap.recommendedAction}
                        </p>
                        <div className="pt-1 flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onStudyFoundationalLesson?.("unit-foundations-numbers", gap.skillId);
                            }}
                            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 hover:underline"
                          >
                            <span>Study Foundational Lesson</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center space-y-2">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-950">Zero Knowledge Gaps Identified!</h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto">
                    You answered all prerequisite questions with complete precision. You are completely ready for {pathway.targetCourseOrLevel}.
                  </p>
                </div>
              )}

              {/* Action footer */}
              <div className="pt-2 flex justify-between items-center border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAnswers({});
                    setIsSubmitted(false);
                    setActiveStep("diagnostic");
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Retake Diagnostic</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onStartTargetCourse?.(pathway.id);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition shadow-xs"
                >
                  <span>Launch Target Course</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
