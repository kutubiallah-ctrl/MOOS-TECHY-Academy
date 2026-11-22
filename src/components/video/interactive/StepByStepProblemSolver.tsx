import React, { useState } from "react";
import {
  InteractiveLessonState,
  InteractiveProblemStep,
  ProblemSolvingPhase,
  SmartBoardMisconceptionType
} from "../../../types/smartBoardInteraction";
import { smartBoardInteractionService } from "../../../services/smartBoardInteractionService";
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Bot,
  Brain,
  ShieldCheck,
  Award,
  ChevronRight,
  BookOpen
} from "lucide-react";

interface StepByStepProblemSolverProps {
  state: InteractiveLessonState;
  steps: InteractiveProblemStep[];
  onStateUpdate: (newState: InteractiveLessonState) => void;
  onAskTutorMoos: (question: string) => void;
  onReturnToTeacher: () => void;
}

const PHASES: Array<{ id: ProblemSolvingPhase; label: string }> = [
  { id: "strategy", label: "1. Strategy" },
  { id: "formula", label: "2. Formula" },
  { id: "substitution", label: "3. Substitution" },
  { id: "calculation", label: "4. Calculation" },
  { id: "verification", label: "5. Verification" },
  { id: "interpretation", label: "6. Conclusion" }
];

export const StepByStepProblemSolver: React.FC<StepByStepProblemSolverProps> = ({
  state,
  steps,
  onStateUpdate,
  onAskTutorMoos,
  onReturnToTeacher
}) => {
  const currentStep = steps[state.currentStep - 1] || steps[0];
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [entryMode, setEntryMode] = useState<"guided" | "direct">("guided");
  const [freeformText, setFreeformText] = useState<string>("");

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
  };

  const handleAppendSymbol = (symbol: string) => {
    setFreeformText((prev) => prev + symbol);
  };

  const handleSubmitStep = () => {
    if (!currentStep) return;

    const evaluation = smartBoardInteractionService.evaluateStepResponse({
      state,
      step: currentStep,
      selectedOptionId: entryMode === "guided" ? selectedOptionId : null,
      freeformInput: entryMode === "direct" ? freeformText : null
    });

    onStateUpdate(evaluation.updatedState);
  };

  const handleAdvanceStep = () => {
    const nextState = smartBoardInteractionService.advanceToNextStep(state, steps);
    setSelectedOptionId(null);
    setFreeformText("");
    onStateUpdate(nextState);
  };

  const handleRequestHint = () => {
    if (!currentStep) return;
    const { updatedState } = smartBoardInteractionService.revealNextHint(state, currentStep);
    onStateUpdate(updatedState);
  };

  const getMisconceptionName = (m: SmartBoardMisconceptionType | null | undefined): string => {
    if (!m) return "";
    switch (m) {
      case "sign_error":
        return "Sign Inversion Error (Negative/Positive Handling)";
      case "wrong_operation_order":
        return "Operation Precedence Error (PEMDAS/BODMAS)";
      case "formula_selection_error":
        return "Governing Formula Selection Mismatch";
      case "unit_inconsistency":
        return "Dimensional Unit Inconsistency";
      case "concept_confusion":
        return "Fundamental Concept / Theorem Confusion";
      case "variable_substitution_error":
        return "Parameter Substitution Inversion";
      case "grammar_proximity_error":
        return "False Proximity Concord Trap";
      case "algorithmic_reasoning_error":
        return "Algorithmic Invariant / Boundary Violation";
      default:
        return "Reasoning Error";
    }
  };

  const isCompleted = state.currentStep >= state.totalSteps && state.evaluationResult === "CORRECT";

  const isDiscourseOrLiterature =
    state.currentProblem.toLowerCase().includes("academic discourse") ||
    state.currentProblem.toLowerCase().includes("rhetoric") ||
    state.currentProblem.toLowerCase().includes("literature") ||
    state.currentProblem.toLowerCase().includes("synthesis") ||
    Boolean(
      state.givenInformation?.["Discipline"]?.includes("Academic Discourse") ||
      state.givenInformation?.["Discipline"]?.includes("Literature") ||
      state.givenInformation?.["Subject"]?.toLowerCase().includes("lang")
    );

  const getPhaseLabel = (phase: ProblemSolvingPhase, index: number): string => {
    if (isDiscourseOrLiterature) {
      switch (phase) {
        case "strategy":
          return `${index + 1}. Claim Selection`;
        case "formula":
          return `${index + 1}. Fallacy Analysis`;
        case "substitution":
          return `${index + 1}. Synthesis`;
        case "calculation":
          return `${index + 1}. Rhetorical Craft`;
        case "verification":
          return `${index + 1}. Register Check`;
        case "interpretation":
          return `${index + 1}. Critical Thesis`;
        default:
          return `${index + 1}. ${phase}`;
      }
    }
    switch (phase) {
      case "strategy":
        return `${index + 1}. Strategy`;
      case "formula":
        return `${index + 1}. Formula`;
      case "substitution":
        return `${index + 1}. Substitution`;
      case "calculation":
        return `${index + 1}. Working`;
      case "verification":
        return `${index + 1}. Verification`;
      case "interpretation":
        return `${index + 1}. Conclusion`;
      default:
        return `${index + 1}. ${phase}`;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-5 animate-in fade-in select-none">
      {/* Header & Phase Progress Bar */}
      <div className="space-y-3 border-b border-slate-800 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
              {isDiscourseOrLiterature
                ? "MODE 3 • DO (SCHOLARLY RHETORIC & SYNTHESIS CONTROL)"
                : "MODE 3 • DO (STUDENT STEP-BY-STEP CONTROL)"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">
              Step {state.currentStep} of {state.totalSteps}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                state.masterySignal === "mastered"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : state.masterySignal === "proficient"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              }`}
            >
              {state.masterySignal}
            </span>
          </div>
        </div>

        {/* Phase Pills Navigation */}
        <div className={`grid gap-1.5 pt-1 ${steps.length <= 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3 sm:grid-cols-6"}`}>
          {steps.map((p, idx) => {
            const isCurrent = state.currentStep === idx + 1;
            const isDone = state.completedPhases.includes(p.phase) || state.currentStep > idx + 1;
            const label = getPhaseLabel(p.phase, idx);

            return (
              <div
                key={p.id || idx}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-mono font-bold text-center transition flex items-center justify-center gap-1 ${
                  isCurrent
                    ? "bg-cyan-500 text-slate-950 shadow-md ring-1 ring-cyan-300"
                    : isDone
                    ? "bg-emerald-950/60 border border-emerald-600/40 text-emerald-300"
                    : "bg-slate-950 border border-slate-800 text-slate-500"
                }`}
              >
                {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />}
                <span className="truncate">{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Problem Givens & Targets Card */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="font-bold text-slate-100 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            {state.currentProblem}
          </span>
          <span className="text-[10px] font-mono text-slate-500">Target: {state.target}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/60">
          {Object.entries(state.givenInformation).map(([k, v]) => (
            <span
              key={k}
              className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
            >
              <strong className="text-slate-400">{k}:</strong> {v}
            </span>
          ))}
        </div>
      </div>

      {/* Step Instruction Card */}
      {currentStep && (
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              {currentStep.title}
            </span>
            <h4 className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
              {currentStep.instruction}
            </h4>
          </div>

          {/* Input Method Toggle */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              type="button"
              onClick={() => setEntryMode("guided")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                entryMode === "guided"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>Guided Options</span>
            </button>
            <button
              type="button"
              onClick={() => setEntryMode("direct")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                entryMode === "direct"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>{isDiscourseOrLiterature ? "Direct Text Entry" : "Direct Input Entry"}</span>
              <span className="px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 rounded text-[9px]">
                {isDiscourseOrLiterature ? "Scholarly Engine" : "Equivalence Engine"}
              </span>
            </button>
          </div>

          {/* 1. GUIDED OPTIONS VIEW */}
          {entryMode === "guided" && (
            <div className="space-y-2">
              {currentStep.availableOptions?.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const hasEvaluated = state.evaluationResult !== undefined;
                const isCorrectOpt = opt.isCorrect;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={hasEvaluated && state.evaluationResult === "CORRECT"}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition cursor-pointer flex items-start gap-3 ${
                      hasEvaluated && isSelected && isCorrectOpt
                        ? "bg-emerald-950/60 border-emerald-500/60 text-emerald-200"
                        : hasEvaluated && isSelected && !isCorrectOpt
                        ? "bg-rose-950/60 border-rose-500/60 text-rose-200"
                        : isSelected
                        ? "bg-cyan-950/60 border-cyan-500/70 text-cyan-100 ring-1 ring-cyan-500/50"
                        : "bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-850 hover:border-slate-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border mt-0.5 flex-shrink-0 flex items-center justify-center ${
                        isSelected ? "border-cyan-400 bg-cyan-400 text-slate-950" : "border-slate-600"
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                    </div>

                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-relaxed">{opt.label}</p>
                      {opt.latex && (
                        <p className="text-[11px] font-mono text-cyan-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800 inline-block">
                          {opt.latex}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* 2. DIRECT ALGEBRAIC & SCIENTIFIC INPUT VIEW */}
          {entryMode === "direct" && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  {isDiscourseOrLiterature
                    ? "Enter Scholarly Formulation or Analysis:"
                    : "Enter Step Solution or Calculation:"}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {isDiscourseOrLiterature
                    ? "Accepts dialectical syntheses, citations, and claim formulations"
                    : "Accepts equivalent forms (fractions, decimals, sets, units)"}
                </span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={freeformText}
                  onChange={(e) => setFreeformText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && freeformText.trim()) {
                      handleSubmitStep();
                    }
                  }}
                  placeholder={
                    isDiscourseOrLiterature
                      ? "e.g., Post Hoc Ergo Propter Hoc, or Whereas Adeyemi (2023)..."
                      : "e.g., -0.5, -3 or -1/2, -3 or 5.1 m or 15 kN*m..."
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-cyan-200 font-mono focus:outline-none focus:border-cyan-400 placeholder:text-slate-600"
                />
              </div>

              {/* Quick Symbol or Rhetorical Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-mono text-slate-500 mr-1">
                  {isDiscourseOrLiterature ? "Signposts:" : "Symbols:"}
                </span>
                {(isDiscourseOrLiterature
                  ? ["Whereas", "Notwithstanding", "Post Hoc", "Nominalization", "Correlation", "Paradox", "Ethos", "Claim"]
                  : ["±", "√", "²", "Δ", "Σ", "x₁", "x₂", "π", " / ", "∈", "{", "}"]
                ).map((sym) => (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => handleAppendSymbol(sym + (isDiscourseOrLiterature ? " " : ""))}
                    className="px-2 py-0.5 rounded bg-slate-850 hover:bg-slate-800 border border-slate-700 text-[11px] font-mono text-cyan-300 transition cursor-pointer"
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Evaluation Feedback Banner */}
          {state.evaluationResult && (
            <div
              className={`p-3.5 rounded-xl border text-xs space-y-2 animate-in fade-in ${
                state.evaluationResult === "CORRECT"
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                  : state.evaluationResult === "MISCONCEPTION_DETECTED"
                  ? "bg-amber-950/40 border-amber-500/40 text-amber-200"
                  : "bg-rose-950/40 border-rose-500/40 text-rose-200"
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {state.evaluationResult === "CORRECT" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Rigorous Reasoning Verified!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>
                      {state.misconceptionDetected
                        ? getMisconceptionName(state.misconceptionDetected)
                        : "Reasoning Incomplete"}
                    </span>
                  </>
                )}
              </div>

              <p className="leading-relaxed">{state.feedbackMessage}</p>
            </div>
          )}

          {/* Socratic Hint Ladder Section */}
          {state.hintLevel > 0 && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5" />
                  Socratic Hint Ladder (Level {state.hintLevel} of 5)
                </span>
                <span className="text-[10px] font-mono text-indigo-400">Paced Guidance</span>
              </div>

              <div className="space-y-1.5 text-xs">
                {currentStep.hints.slice(0, state.hintLevel).map((h) => (
                  <div key={h.level} className="p-2 rounded-lg bg-indigo-950/40 border border-indigo-900/60">
                    <strong className="text-indigo-200 block text-[11px]">{h.title}</strong>
                    <p className="text-slate-300 text-[11px] leading-relaxed mt-0.5">
                      {h.revealedContent}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              {/* Socratic Hint Button */}
              {state.hintLevel < 5 && state.evaluationResult !== "CORRECT" && (
                <button
                  type="button"
                  onClick={handleRequestHint}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-slate-700"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Reveal Next Hint ({state.hintLevel + 1}/5)</span>
                </button>
              )}

              {/* Ask Tutor Moos With Full Active Context */}
              <button
                type="button"
                onClick={() =>
                  onAskTutorMoos(
                    `In Step ${state.currentStep} (${currentStep.title}), I'm working on: "${currentStep.instruction}". Can you explain why the correct step holds?`
                  )
                }
                className="px-3 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Ask Tutor Moos</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Submit or Advance */}
              {state.evaluationResult !== "CORRECT" ? (
                <button
                  type="button"
                  disabled={entryMode === "guided" ? !selectedOptionId : !freeformText.trim()}
                  onClick={handleSubmitStep}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 text-xs font-bold transition shadow-lg cursor-pointer flex items-center gap-1.5"
                >
                  <span>Verify Step Solution</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : isCompleted ? (
                <button
                  type="button"
                  onClick={onReturnToTeacher}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow-lg cursor-pointer flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>Mastery Achieved • Return to Teacher</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleAdvanceStep}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition shadow-lg cursor-pointer flex items-center gap-1.5"
                >
                  <span>Advance to Step {state.currentStep + 1}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
