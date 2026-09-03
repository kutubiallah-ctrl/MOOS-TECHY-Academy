import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Compass,
  Play,
  RotateCcw,
  Bookmark,
  Share2,
  GraduationCap
} from "lucide-react";
import { Skill, Unit } from "../types/curriculum";

interface LessonViewerProps {
  skill: Skill | null;
  unit: Unit | null;
  onStartPractice: (skill: Skill, unit: Unit) => void;
  onOpenAITutor: (skill: Skill, unit: Unit) => void;
  onBack: () => void;
  onNavigateNextSkill?: (nextSkill: Skill, unit: Unit) => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  skill,
  unit,
  onStartPractice,
  onOpenAITutor,
  onBack,
  onNavigateNextSkill
}) => {
  const [activeTab, setActiveTab] = useState<"concept" | "examples" | "key_terms">("concept");
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  if (!skill || !unit) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <BookOpen className="h-10 w-10 text-indigo-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-800">No Lesson Selected</h3>
        <p className="text-xs text-slate-500">Please choose a unit or skill from the curriculum syllabus to begin.</p>
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 transition"
        >
          Return to Syllabus
        </button>
      </div>
    );
  }

  // Derive rich lesson content from skill or generate standard high-yield structure
  const lesson = skill.lesson || {
    id: `les-${skill.id}`,
    title: skill.title,
    hookAndIntuition: `Mastering ${skill.title} develops critical intuition across ${unit.title}. Let's examine how the underlying rules and patterns work.`,
    conceptualExplanation: skill.summary || "This topic focuses on core operational laws, systematic steps, and error-free problem execution.",
    keyTermsAndFormulas: [
      {
        termOrSymbol: skill.title,
        definition: skill.summary,
        practicalExample: "Standard curricular application"
      }
    ],
    workedExamples: skill.questions.slice(0, 2).map((q, idx) => ({
      title: `Worked Problem ${idx + 1}`,
      problemStatement: q.questionText,
      mathExpression: q.mathExpression,
      steps: q.hintLadder.map((hint, hIdx) => ({
        stepNumber: hIdx + 1,
        instruction: `Step ${hIdx + 1}`,
        reasoning: hint
      })),
      takeawayRule: q.explanation
    })),
    commonMisconceptionsAndTraps: skill.questions[0]?.misconceptionAlerts?.map((m) => ({
      misconception: `Selecting "${m.trigger}"`,
      whyItIsWrong: m.note,
      correctCorrection: "Review the governing formula and verify intermediate calculations."
    })) || [],
    guidedPracticePrompt: "Are you ready to test your understanding with guided Socratic practice?",
    summaryRecap: `You have reviewed the essential principles of ${skill.title}. Now solidify your mastery in the Practice Arena!`
  };

  // Find next skill in unit
  const currentSkillIndex = unit.skills.findIndex((s) => s.id === skill.id);
  const nextSkill = currentSkillIndex >= 0 && currentSkillIndex < unit.skills.length - 1
    ? unit.skills[currentSkillIndex + 1]
    : null;

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div id="lesson-viewer-view" className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Header Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition px-3 py-1.5 rounded-xl hover:bg-slate-100"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Syllabus</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
            {unit.level.replace("_", " ")}
          </span>
          <span className="rounded-full bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1 text-[11px] font-bold">
            {unit.code}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenAITutor(skill, unit)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs transition"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ask Tutor Moos</span>
          </button>

          <button
            type="button"
            onClick={() => onStartPractice(skill, unit)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Start Practice</span>
          </button>
        </div>
      </div>

      {/* Lesson Title & Objectives Hero Card */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-indigo-800/50 space-y-4">
        <div className="space-y-1">
          <span className="text-xs uppercase font-bold text-indigo-300 tracking-wider">
            {unit.title}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{lesson.title}</h1>
        </div>

        {/* Learning Objectives */}
        <div className="pt-3 border-t border-white/10 space-y-2">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="h-4 w-4" />
            <span>Core Learning Objectives:</span>
          </span>
          <div className="grid sm:grid-cols-2 gap-2">
            {skill.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-indigo-100 bg-white/5 rounded-xl p-2.5 border border-white/10">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("concept")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "concept"
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>Conceptual Instruction</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("examples")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "examples"
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Lightbulb className="h-3.5 w-3.5" />
          <span>Worked Step-by-Step Examples ({lesson.workedExamples?.length || 0})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("key_terms")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "key_terms"
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Compass className="h-3.5 w-3.5" />
          <span>Key Rules & Codex ({lesson.keyTermsAndFormulas?.length || 0})</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="space-y-6">
        {activeTab === "concept" && (
          <div className="space-y-6">
            {/* Real World Hook & Intuition */}
            {lesson.hookAndIntuition && (
              <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-6 space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                  <Lightbulb className="h-4 w-4 text-amber-600" />
                  <span>Intuition & Practical Hook</span>
                </div>
                <p className="text-sm font-medium text-amber-950 leading-relaxed">
                  {lesson.hookAndIntuition}
                </p>
              </div>
            )}

            {/* Deep Conceptual Text */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900">Foundational Principles & Theory</h3>
              <div className="text-sm text-slate-700 leading-relaxed space-y-3 font-normal">
                {lesson.conceptualExplanation.split("\n\n").map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Common Pitfalls & Traps */}
              {lesson.commonMisconceptionsAndTraps && lesson.commonMisconceptionsAndTraps.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Watch Out: Common Exam Pitfalls & Traps</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {lesson.commonMisconceptionsAndTraps.map((trap, i) => (
                      <div key={i} className="rounded-2xl border border-rose-100 bg-rose-50/40 p-4 space-y-1.5 text-xs">
                        <span className="font-bold text-rose-900 block">⚠️ {trap.misconception}</span>
                        <p className="text-rose-800 leading-normal">{trap.whyItIsWrong}</p>
                        <p className="text-slate-600 pt-1 font-semibold">Tip: {trap.correctCorrection}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "examples" && (
          <div className="space-y-6">
            {lesson.workedExamples && lesson.workedExamples.length > 0 ? (
              lesson.workedExamples.map((ex, exIdx) => (
                <div key={exIdx} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      {ex.title}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Step-by-Step Breakdown
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">{ex.problemStatement}</h4>

                  {ex.mathExpression && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs sm:text-sm text-indigo-900 font-bold">
                      {ex.mathExpression}
                    </div>
                  )}

                  {/* Steps */}
                  <div className="space-y-3 pt-2">
                    {ex.steps.map((st) => {
                      const isDone = Boolean(completedSteps[`${exIdx}-${st.stepNumber}`]);
                      return (
                        <div
                          key={st.stepNumber}
                          onClick={() => toggleStep(Number(`${exIdx}${st.stepNumber}`))}
                          className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3.5 ${
                            isDone ? "bg-emerald-50/60 border-emerald-200" : "bg-slate-50/70 border-slate-200 hover:bg-slate-100/80"
                          }`}
                        >
                          <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            isDone ? "bg-emerald-600 text-white" : "bg-indigo-100 text-indigo-700"
                          }`}>
                            {st.stepNumber}
                          </div>

                          <div className="space-y-1 text-xs">
                            <span className="font-bold text-slate-900 block">{st.instruction}</span>
                            <p className="text-slate-600 leading-relaxed">{st.reasoning}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Takeaway Rule */}
                  {ex.takeawayRule && (
                    <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-950 font-medium flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                      <span><strong>Key Takeaway:</strong> {ex.takeawayRule}</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-xs text-slate-500">
                No worked examples recorded for this unit yet.
              </div>
            )}
          </div>
        )}

        {activeTab === "key_terms" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {lesson.keyTermsAndFormulas && lesson.keyTermsAndFormulas.length > 0 ? (
              lesson.keyTermsAndFormulas.map((kt, i) => (
                <div key={i} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
                  <span className="text-sm font-bold text-slate-900 block">{kt.termOrSymbol}</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{kt.definition}</p>
                  {kt.practicalExample && (
                    <div className="pt-2 border-t border-slate-100 text-[11px] text-indigo-600 font-medium">
                      <strong>Example:</strong> {kt.practicalExample}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-2 p-8 text-center bg-white rounded-3xl border border-slate-200 text-xs text-slate-500">
                No key terms catalogued for this skill.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-slate-900">Ready to test your mastery?</h4>
          <p className="text-xs text-slate-500">
            Apply what you have learned with {skill.questions.length} structured Socratic questions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {nextSkill && onNavigateNextSkill && (
            <button
              type="button"
              onClick={() => onNavigateNextSkill(nextSkill, unit)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <span>Next Lesson: {nextSkill.title.slice(0, 20)}...</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => onStartPractice(skill, unit)}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition flex items-center gap-2"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>Launch Practice Arena</span>
          </button>
        </div>
      </div>
    </div>
  );
};
