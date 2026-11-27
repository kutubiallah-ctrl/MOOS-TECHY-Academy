import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  HelpCircle,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Trophy,
  PenTool,
  Brain,
  Lightbulb,
  Award,
  Maximize2,
  Shuffle,
  ShieldCheck,
  Cpu,
  ClipboardList
} from "lucide-react";
import { PracticeQuestion, Skill, MasteryRecord } from "../types/curriculum";
import { useLearner } from "../context/LearnerContext";
import { MathScratchpad } from "./MathScratchpad";
import { evaluateMathematicalAnswer } from "../utils/mathEvaluator";
import { learningSupplyService } from "../services/learningSupplyService";
import { VariationEngine } from "../services/variationEngine";
import { curriculumService } from "../services/curriculumService";
import { teacherStudioService } from "../services/teacherStudioService";
import { formatMasteryStatusLabel, normalizeMasteryStatus } from "../services/masteryEngine";

interface PracticeArenaProps {
  skill: Skill;
  assignmentId?: string;
  onSkillComplete?: (updatedPoints: number) => void;
  onOpenAITutorWithContext?: (question: PracticeQuestion, attempt: string) => void;
  onBackToNavigator?: () => void;
  currentMasteryRecord?: MasteryRecord;
}

export const PracticeArena: React.FC<PracticeArenaProps> = ({
  skill,
  assignmentId,
  onSkillComplete,
  onOpenAITutorWithContext,
  onBackToNavigator,
  currentMasteryRecord
}) => {
  const { profile, recordQuestionAttempt, recordPracticeCompletion } = useLearner();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [revealedHintsCount, setRevealedHintsCount] = useState(0);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(true);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isGeneratingCustom, setIsGeneratingCustom] = useState(false);
  const [customGeneratedQuestions, setCustomGeneratedQuestions] = useState<PracticeQuestion[]>([]);
  const [activeMisconception, setActiveMisconception] = useState<string | null>(null);
  const [supplyMessage, setSupplyMessage] = useState<string | null>(null);
  const [detectedMisconceptions, setDetectedMisconceptions] = useState<string[]>([]);

  const fallbackSkill: Skill = {
    id: skill?.id || "fallback-skill",
    unitId: skill?.unitId || "unit-mth-ss1-03",
    title: skill?.title || "Quadratic Equations Practice",
    code: skill?.code || "MTH-SS-QUAD",
    summary: skill?.summary || "Practice problem sets with Socratic guidance.",
    objectives: skill?.objectives || ["Apply algebraic techniques accurately"],
    difficulty: skill?.difficulty || "intermediate",
    masteryPointsRequired: skill?.masteryPointsRequired || 100,
    questions: (skill?.questions && skill.questions.length > 0) ? skill.questions : [
      {
        id: "fb-q-1",
        type: "multiple_choice",
        questionText: "Solve the quadratic equation: x² - 5x + 6 = 0",
        mathExpression: "x^2 - 5x + 6 = 0",
        options: ["x = 2 or x = 3", "x = -2 or x = -3", "x = 1 or x = 6", "x = -1 or x = -6"],
        correctAnswer: "x = 2 or x = 3",
        explanation: "Factor as (x - 2)(x - 3) = 0, giving roots x = 2 and x = 3.",
        hintLadder: [
          "Look for two numbers that multiply to +6 and add to -5.",
          "The factors of +6 are (-2) and (-3).",
          "Set each factor equal to zero: (x - 2) = 0 or (x - 3) = 0."
        ],
        skillId: skill?.id || "fallback-skill",
        difficulty: "medium"
      }
    ]
  };

  const effectiveSkill = skill && skill.questions ? skill : fallbackSkill;

  // Find linked assignment if any
  const activeAssignment = assignmentId
    ? teacherStudioService.getAssignmentById(assignmentId)
    : teacherStudioService.getAssignments().find(
        (a) => a.skillId === effectiveSkill.id && a.status === "active" && (!a.targetLearnerIds.length || a.targetLearnerIds.includes(profile.id))
      );

  useEffect(() => {
    if (activeAssignment) {
      teacherStudioService.updateLearnerProgress(activeAssignment.id, profile.id, {
        status: "started",
        startedAt: new Date().toISOString()
      });
    }
  }, [activeAssignment?.id, profile.id]);

  const parentUnit = curriculumService.getUnitBySkillId(effectiveSkill.id) || {
    id: effectiveSkill.unitId,
    subjectId: "math_core",
    level: "senior_secondary" as const,
    title: "Curriculum Unit",
    code: "UNIT",
    description: "",
    order: 1,
    category: "core" as const,
    skills: [effectiveSkill]
  };

  const allQuestions = [...effectiveSkill.questions, ...customGeneratedQuestions];
  const activeQuestion = allQuestions[currentQuestionIndex] || effectiveSkill.questions[0];

  const currentAttemptValue = selectedOption || typedAnswer;

  const handleOptionSelect = (option: string) => {
    if (hasSubmitted) return;
    setSelectedOption(option);
    setTypedAnswer(option);
    setActiveMisconception(null);
  };

  const handleCheckAnswer = () => {
    const userAns = currentAttemptValue.trim();
    if (!userAns || hasSubmitted) return;
    setHasSubmitted(true);
    setAnsweredCount((prev) => prev + 1);

    const evalResult = evaluateMathematicalAnswer(userAns, activeQuestion.correctAnswer);
    const isCorrect = evalResult.isEquivalent;

    // Check for specific known misconception
    let triggeredMisconception: string | undefined;
    if (!isCorrect) {
      const misconception = activeQuestion.misconceptionAlerts?.find(
        (m) => evaluateMathematicalAnswer(userAns, m.trigger).isEquivalent || m.trigger.trim() === userAns
      );
      if (misconception) {
        triggeredMisconception = misconception.note;
        setActiveMisconception(misconception.note);
        setDetectedMisconceptions((prev) => Array.from(new Set([...prev, misconception.note])));
      }
    }

    // Determine provenance metadata
    const isVar = activeQuestion.id.startsWith("var-");
    const isAi = activeQuestion.id.startsWith("gen-");
    const provenance = isVar ? "PLATFORM_CONTENT" : isAi ? "AI_GENERATED_DRAFT" : "OFFICIAL_SYLLABUS";
    const generatorAgent = isVar ? "variation_engine" : isAi ? "practice_agent" : undefined;

    // Record persistent attempt
    recordQuestionAttempt({
      questionId: activeQuestion.id,
      skillId: effectiveSkill.id,
      selectedOption: userAns,
      isCorrect,
      hintsUsedCount: revealedHintsCount,
      timeSpentSeconds: 45 + revealedHintsCount * 15,
      misconceptionTriggered: triggeredMisconception,
      provenance,
      isAiGenerated: isAi,
      generatorAgent
    });

    if (isCorrect) {
      setScore((prev) => prev + 1);
      // Trigger confetti celebration
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleNextQuestion = async () => {
    setSelectedOption(null);
    setTypedAnswer("");
    setHasSubmitted(false);
    setRevealedHintsCount(0);
    setActiveMisconception(null);
    setSupplyMessage(null);

    if (currentQuestionIndex + 1 < allQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const scorePct = Math.round((score / Math.max(1, allQuestions.length)) * 100);

      // Recalculate persistent evidence-based mastery without completion inflation
      await recordPracticeCompletion(effectiveSkill.id, 0, score > 0);

      // Synchronize with active classroom assignment if present
      if (activeAssignment) {
        teacherStudioService.completeAssignment(
          activeAssignment.id,
          profile.id,
          scorePct,
          revealedHintsCount,
          detectedMisconceptions
        );
      }

      if (onSkillComplete) {
        const verifiedPoints =
          profile.masteryRecords?.[effectiveSkill.id]?.points ?? currentMasteryRecord?.points ?? 0;
        onSkillComplete(verifiedPoints);
      }
    }
  };

  const handleRevealNextHint = () => {
    if (revealedHintsCount < activeQuestion.hintLadder.length) {
      setRevealedHintsCount((prev) => prev + 1);
    }
  };

  // Generate Parametric Variation (Infinite local replayability)
  const handleGenerateVariation = () => {
    setIsGeneratingCustom(true);
    try {
      const variantIndex = customGeneratedQuestions.length + effectiveSkill.questions.length + 1;
      const variationResource = VariationEngine.generateVariation({
        baseQuestion: activeQuestion,
        skill: effectiveSkill,
        unit: parentUnit,
        variantIndex
      });

      const newQ: PracticeQuestion = {
        id: variationResource.id,
        type: variationResource.questionType === "numeric_input" ? "numeric_input" : "multiple_choice",
        questionText: variationResource.questionText || "",
        mathExpression: variationResource.mathExpression,
        options: variationResource.options,
        correctAnswer: variationResource.correctAnswer || "",
        explanation: variationResource.explanation,
        hintLadder: variationResource.hintLadder,
        misconceptionAlerts: variationResource.misconceptionTargets,
        skillId: effectiveSkill.id,
        difficulty: variationResource.difficulty === "hard" ? "hard" : variationResource.difficulty === "easy" ? "easy" : "medium"
      };

      setCustomGeneratedQuestions((prev) => [...prev, newQ]);
      setCurrentQuestionIndex(allQuestions.length);
      setSelectedOption(null);
      setTypedAnswer("");
      setHasSubmitted(false);
      setRevealedHintsCount(0);
      setSupplyMessage(`Generated Parametric Practice Variant #${variantIndex} (Concept Preserved).`);
    } catch (err) {
      console.error("Variation generation error:", err);
    } finally {
      setIsGeneratingCustom(false);
    }
  };

  // Generate Governed AI Question
  const handleGenerateAIQuestion = async () => {
    setIsGeneratingCustom(true);
    try {
      const delivery = await learningSupplyService.getLearningResources({
        learnerProfile: profile,
        targetSkillId: effectiveSkill.id,
        allowAiGeneration: true,
        allowParametricVariations: true
      });

      if (delivery.resources.length > 0) {
        const res = delivery.resources[0];
        const newQ: PracticeQuestion = {
          id: res.id,
          type: res.questionType === "numeric_input" ? "numeric_input" : "multiple_choice",
          questionText: res.questionText || "",
          mathExpression: res.mathExpression,
          options: res.options,
          correctAnswer: res.correctAnswer || "",
          explanation: res.explanation,
          hintLadder: res.hintLadder,
          misconceptionAlerts: res.misconceptionTargets,
          skillId: effectiveSkill.id,
          difficulty: res.difficulty === "hard" ? "hard" : res.difficulty === "easy" ? "easy" : "medium"
        };

        setCustomGeneratedQuestions((prev) => [...prev, newQ]);
        setCurrentQuestionIndex(allQuestions.length);
        setSelectedOption(null);
        setTypedAnswer("");
        setHasSubmitted(false);
        setRevealedHintsCount(0);
        setSupplyMessage(delivery.message || "Synthesized Governed AI Practice Problem.");
      }
    } catch (e) {
      console.error("Failed to generate custom AI problem", e);
    } finally {
      setIsGeneratingCustom(false);
    }
  };

  const isCurrentCorrect = evaluateMathematicalAnswer(
    currentAttemptValue,
    activeQuestion.correctAnswer
  ).isEquivalent;
  const isFinishedSet = hasSubmitted && currentQuestionIndex + 1 >= allQuestions.length;

  const isGenerated = activeQuestion.id.startsWith("var-") || activeQuestion.id.startsWith("gen-");
  const isVariation = activeQuestion.id.startsWith("var-");

  return (
    <div id="practice-arena-view" className="space-y-6 max-w-6xl mx-auto">
      {/* Skill Practice Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-5 border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <BookOpen className="h-4 w-4" />
            <span>Mastery Practice Arena</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-mono">{effectiveSkill.code}</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">{effectiveSkill.title}</h2>
          <p className="text-sm text-slate-500 max-w-2xl mt-0.5">{effectiveSkill.summary}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress tracker */}
          <div className="text-right">
            <div className="text-xs text-slate-500 font-medium">Question Progress</div>
            <div className="text-sm font-bold text-slate-800">
              {currentQuestionIndex + 1} of {allQuestions.length}
            </div>
          </div>
          {/* Mastery points badge */}
          <div className="flex items-center gap-1.5 rounded-xl bg-indigo-50 border border-indigo-100 px-3.5 py-2">
            <Trophy className="h-4 w-4 text-amber-500" />
            <div>
              <div className="text-[10px] text-indigo-600 uppercase font-semibold">
                {formatMasteryStatusLabel(
                  normalizeMasteryStatus(currentMasteryRecord?.status, currentMasteryRecord?.points),
                  currentMasteryRecord?.points
                )}
              </div>
              <div className="text-sm font-bold text-indigo-900">
                {currentMasteryRecord?.points || 0} / 100 pts
              </div>
            </div>
          </div>

          <button
            id="toggle-scratchpad-btn"
            type="button"
            onClick={() => setIsScratchpadOpen(!isScratchpadOpen)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border transition ${
              isScratchpadOpen
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <PenTool className="h-3.5 w-3.5 text-indigo-400" />
            <span>{isScratchpadOpen ? "Hide Scratchpad" : "Show Scratchpad"}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Supply Notification Bar */}
      {supplyMessage && (
        <div className="flex items-center justify-between rounded-xl bg-indigo-50 border border-indigo-200 px-4 py-2.5 text-xs text-indigo-900 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-600 shrink-0" />
            <span>{supplyMessage}</span>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider bg-indigo-200/70 text-indigo-800 px-2 py-0.5 rounded-full">
            Dynamic Supply Active
          </span>
        </div>
      )}

      {/* Linked Classroom Assignment Banner */}
      {activeAssignment && (
        <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs text-emerald-950 shadow-xs">
          <div className="flex items-center gap-2.5">
            <ClipboardList className="h-4 w-4 text-emerald-600 shrink-0" />
            <div>
              <span className="font-semibold text-emerald-900">Assigned Task: {activeAssignment.title}</span>
              <span className="text-emerald-700 ml-2 text-[11px]">(Due {activeAssignment.dueDate})</span>
            </div>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-200/80 text-emerald-900 px-2.5 py-0.5 rounded-full">
            Classroom Sync Active
          </span>
        </div>
      )}

      {/* Main Grid: Problem Panel + Scratchpad / Socratic Support */}
      <div className={`grid gap-6 ${isScratchpadOpen ? "lg:grid-cols-12" : "grid-cols-1"}`}>
        {/* Left / Main Question Arena */}
        <div className={`space-y-6 ${isScratchpadOpen ? "lg:col-span-7" : "w-full"}`}>
          {/* Question Card */}
          <div
            id="active-question-card"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs relative overflow-hidden"
          >
            {/* Header info with Provenance Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4 gap-2 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  Question {currentQuestionIndex + 1} • {activeQuestion.difficulty.toUpperCase()}
                </span>

                {/* Content Provenance Badge */}
                {isVariation ? (
                  <span className="flex items-center gap-1 rounded-full bg-cyan-50 border border-cyan-200 px-2.5 py-0.5 text-[11px] font-medium text-cyan-800">
                    <Shuffle className="h-3 w-3 text-cyan-600" />
                    <span>Parametric Variant</span>
                  </span>
                ) : isGenerated ? (
                  <span className="flex items-center gap-1 rounded-full bg-purple-50 border border-purple-200 px-2.5 py-0.5 text-[11px] font-medium text-purple-800">
                    <Cpu className="h-3 w-3 text-purple-600" />
                    <span>Governed AI Draft</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800">
                    <ShieldCheck className="h-3 w-3 text-emerald-600" />
                    <span>Official Syllabus Item</span>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  onOpenAITutorWithContext &&
                  onOpenAITutorWithContext(activeQuestion, selectedOption || "")
                }
                className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition bg-indigo-50/80 px-3 py-1 rounded-full border border-indigo-100"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>Ask Tutor Moos Socratic Hint</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="text-base text-slate-900 font-medium leading-relaxed">
              {activeQuestion.questionText}
            </div>

            {/* LaTeX Math Expression Hero Block */}
            {activeQuestion.mathExpression && (
              <div className="my-5 rounded-xl bg-slate-900 px-5 py-4 text-center shadow-inner">
                <div className="font-mono text-lg font-semibold tracking-wide text-amber-300">
                  {activeQuestion.mathExpression}
                </div>
              </div>
            )}

            {/* Multiple Choice Options */}
            {activeQuestion.options && (
              <div className="mt-5 space-y-2.5">
                {activeQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === option;
                  let optionStyle =
                    "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30 text-slate-800";

                  if (hasSubmitted) {
                    if (option.trim() === activeQuestion.correctAnswer.trim()) {
                      optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold";
                    } else if (isSelected) {
                      optionStyle = "border-rose-400 bg-rose-50 text-rose-950";
                    } else {
                      optionStyle = "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60";
                    }
                  } else if (isSelected) {
                    optionStyle = "border-indigo-600 bg-indigo-50/60 text-indigo-950 font-medium ring-2 ring-indigo-500/20";
                  }

                  return (
                    <button
                      key={idx}
                      id={`practice-option-${idx}`}
                      type="button"
                      onClick={() => handleOptionSelect(option)}
                      disabled={hasSubmitted}
                      className={`w-full flex items-center justify-between rounded-xl border p-3.5 text-left text-sm transition ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-xs font-semibold ${
                            isSelected
                              ? "border-indigo-600 bg-indigo-600 text-white"
                              : "border-slate-300 bg-slate-100 text-slate-600"
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="font-mono text-sm">{option}</span>
                      </div>

                      {hasSubmitted && option.trim() === activeQuestion.correctAnswer.trim() && (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                      )}
                      {hasSubmitted && isSelected && option.trim() !== activeQuestion.correctAnswer.trim() && (
                        <AlertCircle className="h-5 w-5 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Misconception Diagnostic Alert */}
            {activeMisconception && (
              <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Concept Misconception Alert:</span>
                  <p>{activeMisconception}</p>
                </div>
              </div>
            )}

            {/* Answer Feedback & Explanation Card */}
            {hasSubmitted && (
              <div
                className={`mt-5 rounded-xl border p-4 text-sm ${
                  isCurrentCorrect
                    ? "border-emerald-200 bg-emerald-50/70 text-emerald-900"
                    : "border-slate-200 bg-slate-50 text-slate-800"
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-sm mb-1">
                  {isCurrentCorrect ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Outstanding Reasoning! Correct.</span>
                    </>
                  ) : (
                    <>
                      <HelpCircle className="h-4 w-4 text-indigo-600" />
                      <span>Solution Breakdown:</span>
                    </>
                  )}
                </div>
                <p className="text-xs leading-relaxed opacity-90">{activeQuestion.explanation}</p>
              </div>
            )}

            {/* Footer Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              {/* Socratic Hint Ladder Trigger */}
              <button
                id="reveal-hint-btn"
                type="button"
                onClick={handleRevealNextHint}
                disabled={revealedHintsCount >= activeQuestion.hintLadder.length}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 disabled:opacity-40 transition py-2 px-3 rounded-lg hover:bg-slate-100"
              >
                <Lightbulb className="h-4 w-4 text-amber-500" />
                <span>
                  {revealedHintsCount === 0
                    ? "Need a Hint? (3 Steps Available)"
                    : revealedHintsCount < activeQuestion.hintLadder.length
                    ? `Reveal Step ${revealedHintsCount + 1} of ${activeQuestion.hintLadder.length}`
                    : "All Pedagogical Hints Revealed"}
                </span>
              </button>

              <div className="flex items-center gap-2">
                {!hasSubmitted ? (
                  <button
                    id="check-answer-btn"
                    type="button"
                    onClick={handleCheckAnswer}
                    disabled={!selectedOption}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-40 transition"
                  >
                    <span>Check Answer</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    id="next-question-btn"
                    type="button"
                    onClick={handleNextQuestion}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition"
                  >
                    <span>{isFinishedSet ? "Complete Skill Session" : "Next Problem"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Hint Ladder Container (Progressively Revealed) */}
          {revealedHintsCount > 0 && (
            <div className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-5 space-y-3">
              <div className="flex items-center gap-2 font-semibold text-xs text-amber-900 uppercase tracking-wide">
                <Lightbulb className="h-4 w-4 text-amber-600" />
                <span>Socratic Step-by-Step Hint Ladder</span>
              </div>
              <div className="space-y-2">
                {activeQuestion.hintLadder.slice(0, revealedHintsCount).map((hint, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-amber-200 bg-white p-3 text-xs text-slate-800 flex items-start gap-2.5 shadow-xs"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{hint}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Learning Supply: Infinite Variations & AI Problem Scaffolding */}
          <div className="grid sm:grid-cols-2 gap-3">
            {/* Parametric Variation Trigger */}
            <div className="flex items-center justify-between rounded-xl border border-cyan-200/80 bg-cyan-50/50 p-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-950">
                  <Shuffle className="h-3.5 w-3.5 text-cyan-600" />
                  <span>Parametric Variation</span>
                </div>
                <p className="text-[11px] text-cyan-800">Permute numbers & context (preserved skill).</p>
              </div>
              <button
                id="generate-variation-btn"
                type="button"
                onClick={handleGenerateVariation}
                disabled={isGeneratingCustom}
                className="flex items-center gap-1 rounded-lg bg-white border border-cyan-300 px-3 py-1.5 text-xs font-semibold text-cyan-700 hover:bg-cyan-600 hover:text-white transition shadow-xs disabled:opacity-50"
              >
                <span>+1 Variant</span>
              </button>
            </div>

            {/* AI Custom Problem Trigger */}
            <div className="flex items-center justify-between rounded-xl border border-indigo-200/80 bg-indigo-50/50 p-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-950">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Governed AI Synthesis</span>
                </div>
                <p className="text-[11px] text-indigo-800">Scaffold a new difficulty level.</p>
              </div>
              <button
                id="generate-ai-practice-btn"
                type="button"
                onClick={handleGenerateAIQuestion}
                disabled={isGeneratingCustom}
                className="flex items-center gap-1 rounded-lg bg-white border border-indigo-300 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-600 hover:text-white transition shadow-xs disabled:opacity-50"
              >
                <Brain className="h-3.5 w-3.5" />
                <span>{isGeneratingCustom ? "Synthesizing..." : "+1 AI Problem"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right / Scratchpad Column */}
        {isScratchpadOpen && (
          <div className="lg:col-span-5 space-y-4">
            <MathScratchpad />
            
            {/* Quick Socratic Prompt Cards */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <Brain className="h-4 w-4 text-indigo-600" />
                <span>Pedagogical Reasoning Tips</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4 leading-relaxed">
                <li>Write down your known values and unknown target variable before calculating.</li>
                <li>Draw diagrams for geometric or bearing problems on the scratchpad above.</li>
                <li>Verify your answer by substituting it back into the original equation.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
