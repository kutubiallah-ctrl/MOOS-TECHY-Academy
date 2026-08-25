import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Clock,
  Award,
  CheckCircle2,
  AlertCircle,
  Flag,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Sparkles,
  Trophy
} from "lucide-react";
import { EXAM_SIMULATIONS } from "../data/curriculumData";
import { ExamSimulation, PracticeQuestion } from "../types/curriculum";
import { useLearner } from "../context/LearnerContext";
import { evaluateMathematicalAnswer } from "../utils/mathEvaluator";

interface ExamHallProps {
  onBackToDashboard: () => void;
}

export const ExamHall: React.FC<ExamHallProps> = ({ onBackToDashboard }) => {
  const { recordExamResult } = useLearner();
  const [selectedExam, setSelectedExam] = useState<ExamSimulation | null>(null);
  const [isExamActive, setIsExamActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isExamActive && !isSubmitted && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isExamActive, isSubmitted, secondsRemaining]);

  const handleStartExam = (exam: ExamSimulation) => {
    setSelectedExam(exam);
    setIsExamActive(true);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setSecondsRemaining(exam.timeLimitMinutes * 60);
    setIsSubmitted(false);
  };

  const handleSelectAnswer = (option: string) => {
    if (!selectedExam || isSubmitted) return;
    const currentQ = selectedExam.questions[currentQuestionIndex];
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: option
    }));
  };

  const toggleFlagQuestion = () => {
    if (!selectedExam) return;
    const currentQ = selectedExam.questions[currentQuestionIndex];
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    setIsExamActive(false);

    if (selectedExam) {
      const correctCount = selectedExam.questions.filter((q) => {
        const userAns = userAnswers[q.id];
        if (!userAns) return false;
        return evaluateMathematicalAnswer(userAns, q.correctAnswer).isEquivalent;
      }).length;
      const scorePercentage = Math.round((correctCount / selectedExam.questions.length) * 100);
      const passed = scorePercentage >= selectedExam.passingScore;
      const timeSpent = selectedExam.timeLimitMinutes * 60 - secondsRemaining;

      recordExamResult({
        examId: selectedExam.id,
        examTitle: selectedExam.title,
        examType: selectedExam.type,
        totalQuestions: selectedExam.questions.length,
        correctCount,
        scorePercentage,
        passingScore: selectedExam.passingScore,
        passed,
        timeSpentSeconds: Math.max(1, timeSpent),
        answers: userAnswers
      });

      if (passed) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Exam Selection Arena Screen
  if (!selectedExam || (!isExamActive && !isSubmitted)) {
    return (
      <div id="exam-hall-selection" className="space-y-6 max-w-5xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-7 shadow-xl border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300">
              <Award className="h-7 w-7" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                CBT Examination Hall
              </span>
              <h1 className="text-2xl font-bold">Standardized National & International Exam Simulations</h1>
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Practice under authentic timed computer-based testing (CBT) conditions with past paper standards from WAEC WASSCE, JAMB UTME, NCEE Common Entrance, and Cambridge IGCSE.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {EXAM_SIMULATIONS.map((exam) => (
            <div
              key={exam.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wide bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                    {exam.type.replace("_", " ")}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{exam.timeLimitMinutes} Mins</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">{exam.title}</h3>
                <p className="text-xs text-slate-500">{exam.subtitle}</p>

                <div className="space-y-1.5 pt-2 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Questions Count:</span>
                    <span className="font-bold text-slate-800">{exam.questions.length} Items</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Passing Benchmark:</span>
                    <span className="font-bold text-emerald-600">{exam.passingScore}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  id={`start-exam-${exam.id}`}
                  type="button"
                  onClick={() => handleStartExam(exam)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition shadow-xs"
                >
                  <span>Launch CBT Simulation</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Active Exam or Results View
  const currentQ = selectedExam.questions[currentQuestionIndex];
  const correctCount = selectedExam.questions.filter(
    (q) => userAnswers[q.id]?.trim() === q.correctAnswer.trim()
  ).length;
  const scorePct = Math.round((correctCount / selectedExam.questions.length) * 100);
  const hasPassed = scorePct >= selectedExam.passingScore;

  return (
    <div id="exam-hall-active" className="space-y-6 max-w-5xl mx-auto">
      {/* Exam Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white border border-slate-200 p-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
              {selectedExam.title}
            </span>
          </div>
          <h2 className="text-sm font-semibold text-slate-800">
            {isSubmitted ? "Exam Performance Report" : `Question ${currentQuestionIndex + 1} of ${selectedExam.questions.length}`}
          </h2>
        </div>

        {!isSubmitted ? (
          <div className="flex items-center gap-3">
            {/* Timer countdown */}
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-sm font-bold border ${
                secondsRemaining < 180
                  ? "bg-rose-50 border-rose-200 text-rose-600 animate-pulse"
                  : "bg-slate-50 border-slate-200 text-slate-800"
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            <button
              id="flag-question-btn"
              type="button"
              onClick={toggleFlagQuestion}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border transition ${
                flaggedQuestions[currentQ.id]
                  ? "bg-amber-500 text-white border-amber-500 shadow-xs"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Flag className="h-3.5 w-3.5" />
              <span>{flaggedQuestions[currentQ.id] ? "Flagged" : "Flag for Review"}</span>
            </button>

            <button
              id="submit-exam-btn"
              type="button"
              onClick={handleSubmitExam}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-xs"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Submit Test</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setSelectedExam(null);
              setIsSubmitted(false);
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Return to Exam Hall</span>
          </button>
        )}
      </div>

      {/* Post-Exam Score Summary Card */}
      {isSubmitted && (
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-2xl ${
                  hasPassed ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                }`}
              >
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Examination Result
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {hasPassed ? "Congratulations! Benchmark Achieved" : "Good Effort — Mastery Review Required"}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-[10px] uppercase text-slate-400 font-semibold">Passing Target</div>
                <div className="text-sm font-bold text-slate-700">{selectedExam.passingScore}%</div>
              </div>
              <div
                className={`text-3xl font-black px-4 py-1.5 rounded-2xl border ${
                  hasPassed
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}
              >
                {scorePct}%
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div className="rounded-xl bg-slate-50 p-3 text-center border border-slate-100">
              <div className="text-slate-400 font-medium">Total Questions</div>
              <div className="text-base font-bold text-slate-800">{selectedExam.questions.length}</div>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-center border border-emerald-100 text-emerald-900">
              <div className="opacity-75 font-medium">Correct Answers</div>
              <div className="text-base font-bold">{correctCount}</div>
            </div>
            <div className="rounded-xl bg-rose-50 p-3 text-center border border-rose-100 text-rose-900">
              <div className="opacity-75 font-medium">Incorrect / Skipped</div>
              <div className="text-base font-bold">{selectedExam.questions.length - correctCount}</div>
            </div>
          </div>
        </div>
      )}

      {/* Active Question & Question Navigation Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Question Card */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
              <span>Item #{currentQuestionIndex + 1}</span>
              <span className="font-mono">{currentQ.skillId}</span>
            </div>

            <div className="text-sm font-semibold text-slate-900 leading-relaxed">
              {currentQ.questionText}
            </div>

            {currentQ.mathExpression && (
              <div className="rounded-xl bg-slate-900 py-3 px-5 text-center">
                <span className="font-mono text-base text-amber-300 font-bold">
                  {currentQ.mathExpression}
                </span>
              </div>
            )}

            {/* Options */}
            {currentQ.options && (
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = userAnswers[currentQ.id] === opt;
                  let optStyle =
                    "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50 text-slate-800";

                  if (isSubmitted) {
                    if (opt.trim() === currentQ.correctAnswer.trim()) {
                      optStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold";
                    } else if (isSelected) {
                      optStyle = "border-rose-400 bg-rose-50 text-rose-950";
                    } else {
                      optStyle = "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60";
                    }
                  } else if (isSelected) {
                    optStyle = "border-indigo-600 bg-indigo-50/70 text-indigo-950 font-medium ring-2 ring-indigo-500/20";
                  }

                  return (
                    <button
                      key={idx}
                      id={`exam-opt-${idx}`}
                      type="button"
                      onClick={() => handleSelectAnswer(opt)}
                      disabled={isSubmitted}
                      className={`w-full flex items-center justify-between rounded-xl border p-3.5 text-left text-xs sm:text-sm transition ${optStyle}`}
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
                        <span className="font-mono">{opt}</span>
                      </div>
                      {isSubmitted && opt.trim() === currentQ.correctAnswer.trim() && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* In Review Mode, Show Explanations */}
            {isSubmitted && (
              <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-800">
                <span className="font-bold text-indigo-900 block mb-1">Official Solution Method:</span>
                <p className="leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}

            {/* Question Paging Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setCurrentQuestionIndex((prev) =>
                    Math.min(selectedExam.questions.length - 1, prev + 1)
                  )
                }
                disabled={currentQuestionIndex === selectedExam.questions.length - 1}
                className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Question Palette / Navigator */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Question Palette
            </h4>

            <div className="grid grid-cols-5 gap-2">
              {selectedExam.questions.map((q, idx) => {
                const isAnswered = !!userAnswers[q.id];
                const isFlagged = !!flaggedQuestions[q.id];
                const isCurrent = currentQuestionIndex === idx;

                let paletteColor = "bg-slate-100 text-slate-600 border-slate-200";
                if (isSubmitted) {
                  const isRight = userAnswers[q.id]?.trim() === q.correctAnswer.trim();
                  paletteColor = isRight
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-rose-500 text-white border-rose-500";
                } else if (isCurrent) {
                  paletteColor = "bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-300";
                } else if (isFlagged) {
                  paletteColor = "bg-amber-500 text-white border-amber-500";
                } else if (isAnswered) {
                  paletteColor = "bg-indigo-100 text-indigo-800 border-indigo-200";
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-9 w-full rounded-xl border text-xs font-bold transition flex items-center justify-center ${paletteColor}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-100 border border-indigo-300" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span>Flagged for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-100 border border-slate-300" />
                <span>Unanswered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
