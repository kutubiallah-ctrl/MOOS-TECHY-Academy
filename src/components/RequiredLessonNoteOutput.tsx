import React, { useState, useEffect } from "react";
import {
  FileText,
  Printer,
  Copy,
  Volume2,
  VolumeX,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Target,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  QrCode,
  Clock,
  Layers,
  GraduationCap,
  X,
  ArrowRight,
  Lightbulb
} from "lucide-react";
import { RequiredLessonNote } from "../services/lessonNoteService";
import { mathematicalSpeechService } from "../services/mathematicalSpeechService";
import { Skill, Unit } from "../types/curriculum";

interface RequiredLessonNoteOutputProps {
  note: RequiredLessonNote;
  onClose?: () => void;
  onStudyLesson?: (skill: Skill, unit: Unit) => void;
  onSelectSkill?: (skill: Skill, unit: Unit) => void;
  matchedSkill?: Skill;
  matchedUnit?: Unit;
}

export const RequiredLessonNoteOutput: React.FC<RequiredLessonNoteOutputProps> = ({
  note,
  onClose,
  onStudyLesson,
  onSelectSkill,
  matchedSkill,
  matchedUnit
}) => {
  const [activeTab, setActiveTab] = useState<"full_note" | "student_chalkboard" | "exit_slip">("full_note");
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechElementId, setSpeechElementId] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const hasSpeech = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [note.id]);

  const handleSpeak = (text: string, elementId: string = "main") => {
    if (!hasSpeech) return;
    if (isSpeaking && speechElementId === elementId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeechElementId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const spokenText = mathematicalSpeechService.normalizeSpokenMathematics(text);
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeechElementId(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeechElementId(null);
    };
    setIsSpeaking(true);
    setSpeechElementId(elementId);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(note.fullFormattedMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="required-lesson-note-channel"
      className="rounded-2xl border-2 border-indigo-200 bg-white shadow-md overflow-hidden transition-all duration-300"
      role="region"
      aria-label="Output Result of Required Lesson Note"
    >
      {/* Top Channel Banner */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/60">
                Instructional Channel
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Output Result of Required Lesson Note
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">{note.title}</h3>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {hasSpeech && (
            <button
              type="button"
              id="btn-tts-lesson-note"
              onClick={() =>
                handleSpeak(
                  `${note.title}. Objectives: ${note.instructionalObjectives.join(". ")}. Theoretical Foundation: ${note.theoreticalExposition.slice(0, 300)}...`,
                  "main"
                )
              }
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                isSpeaking
                  ? "bg-amber-500 border-amber-400 text-slate-950 animate-pulse"
                  : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200"
              }`}
              title={isSpeaking ? "Pause/Stop Voice Narration" : "Listen to Lesson Note Read Aloud"}
            >
              {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-indigo-400" />}
              <span>{isSpeaking ? "Stop Narration" : "Listen (TTS)"}</span>
            </button>
          )}

          <button
            type="button"
            id="btn-copy-lesson-note"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition"
            title="Copy formatted lesson note to clipboard"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-indigo-400" />}
            <span>{copied ? "Copied Note!" : "Copy Note"}</span>
          </button>

          <button
            type="button"
            id="btn-print-lesson-note"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition"
            title="Print or Export PDF"
          >
            <Printer className="h-3.5 w-3.5 text-indigo-400" />
            <span>Print / PDF</span>
          </button>

          <button
            type="button"
            id="btn-toggle-minimize-note"
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title={isMinimized ? "Expand Lesson Note" : "Minimize"}
          >
            {isMinimized ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </button>

          {onClose && (
            <button
              type="button"
              id="btn-close-lesson-note"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Close Lesson Note"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Collapsed State Summary */}
      {isMinimized ? (
        <div className="p-4 bg-indigo-50/50 flex items-center justify-between text-xs text-slate-700">
          <div className="flex items-center gap-3">
            <span className="font-bold text-indigo-900">{note.topic}</span>
            <span className="text-slate-400">•</span>
            <span>{note.levelLabel}</span>
            <span className="text-slate-400">•</span>
            <span>{note.curriculumStandard}</span>
          </div>
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            className="font-bold text-indigo-600 hover:underline flex items-center gap-1"
          >
            Expand Lesson Note <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <div className="p-5 sm:p-6 space-y-6">
          {/* Metadata Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs">
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400">Subject / Domain</span>
              <span className="font-bold text-slate-800">{note.subject}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400">Educational Level</span>
              <span className="font-bold text-indigo-700">{note.levelLabel}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400">Official Standard</span>
              <span className="font-semibold text-slate-800 truncate block" title={note.curriculumStandard}>
                {note.curriculumStandard}
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400">Companion Practice QR</span>
              <span className="font-mono font-bold text-emerald-700 flex items-center gap-1">
                <QrCode className="h-3 w-3" /> {note.companionQRCode}
              </span>
            </div>
          </div>

          {/* Sub-channel Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              type="button"
              id="tab-full-note"
              onClick={() => setActiveTab("full_note")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "full_note"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Full Official Lesson Note</span>
            </button>

            <button
              type="button"
              id="tab-student-chalkboard"
              onClick={() => setActiveTab("student_chalkboard")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "student_chalkboard"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Student Chalkboard / Notebook Copy</span>
            </button>

            <button
              type="button"
              id="tab-exit-slip"
              onClick={() => setActiveTab("exit_slip")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "exit_slip"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Target className="h-3.5 w-3.5" />
              <span>Diagnostic Exit Slip (2 Mins)</span>
            </button>

            {/* Quick action triggers if skill is linked */}
            {matchedSkill && matchedUnit && (
              <div className="ml-auto flex items-center gap-2">
                {onStudyLesson && (
                  <button
                    type="button"
                    onClick={() => onStudyLesson(matchedSkill, matchedUnit)}
                    className="hidden sm:flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-lg border border-indigo-200 transition"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
                    <span>Study Studio</span>
                  </button>
                )}
                {onSelectSkill && (
                  <button
                    type="button"
                    onClick={() => onSelectSkill(matchedSkill, matchedUnit)}
                    className="hidden sm:flex items-center gap-1 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-2.5 py-1.5 rounded-lg transition"
                  >
                    <span>Practice Drill</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* TAB 1: FULL OFFICIAL LESSON NOTE */}
          {activeTab === "full_note" && (
            <article className="space-y-6 text-slate-800">
              {/* Section I: Behavioral Learning Objectives */}
              <section id="section-objectives" className="rounded-xl border border-indigo-100 bg-indigo-50/30 p-4 space-y-2">
                <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                  <Target className="h-4 w-4 text-indigo-600" />
                  <h4>I. Behavioral Learning Objectives</h4>
                </div>
                <p className="text-xs text-slate-600 italic">
                  By the end of this instructional period, learners should be able to:
                </p>
                <div className="space-y-1.5 pl-1">
                  {note.instructionalObjectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-medium text-slate-800">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 font-bold text-[10px] shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{obj}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section II & III: Entry Behavior & Instructional Materials */}
              <div className="grid md:grid-cols-2 gap-4">
                <section id="section-entry-behavior" className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                    <GraduationCap className="h-3.5 w-3.5 text-indigo-600" />
                    <h4>II. Entry Behavior & Prerequisites</h4>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-700 list-disc pl-4">
                    {note.prerequisiteKnowledge.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="section-instructional-materials" className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                    <Layers className="h-3.5 w-3.5 text-indigo-600" />
                    <h4>III. Teaching Aids & Resources</h4>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-700 list-disc pl-4">
                    {note.instructionalMaterials.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Section IV: Step-by-Step Instructional Procedure */}
              <section id="section-procedure" className="space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Clock className="h-4 w-4 text-indigo-600" />
                  <h4>IV. Step-by-Step Instructional Procedure</h4>
                </div>
                <div className="space-y-3">
                  {note.instructionalProcedure.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 hover:border-indigo-200 transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-indigo-900 flex items-center gap-1.5">
                          <span className="bg-indigo-600 text-white rounded-md px-1.5 py-0.5 text-[10px]">
                            Step {step.stepNumber}
                          </span>
                          {step.title}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {step.durationMinutes} Minutes
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs">
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <span className="font-bold text-indigo-800 text-[11px] block mb-1">
                            Teacher Activity:
                          </span>
                          <p className="text-slate-700 leading-relaxed">{step.teacherActivity}</p>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <span className="font-bold text-slate-800 text-[11px] block mb-1">
                            Student Activity:
                          </span>
                          <p className="text-slate-700 leading-relaxed">{step.studentActivity}</p>
                        </div>
                      </div>

                      {step.keyPoints && step.keyPoints.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {step.keyPoints.map((kp, kIdx) => (
                            <span
                              key={kIdx}
                              className="text-[10px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded"
                            >
                              ✓ {kp}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Section V: Formal Theoretical Exposition & Rules */}
              <section id="section-theoretical-exposition" className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <BookOpen className="h-4 w-4 text-indigo-600" />
                    <h4>V. Formal Theoretical Exposition & Lesson Content</h4>
                  </div>
                  {hasSpeech && (
                    <button
                      type="button"
                      onClick={() => handleSpeak(note.theoreticalExposition, "theory")}
                      className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                    >
                      <Volume2 className="h-3 w-3" /> Read Section
                    </button>
                  )}
                </div>
                <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-slate-50/70 p-4 rounded-xl border border-slate-100 text-slate-800">
                  {note.theoreticalExposition}
                </div>
              </section>

              {/* Section VI: Teacher's Step-by-Step Worked Demonstrations */}
              <section id="section-worked-demonstrations" className="space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <h4>VI. Step-by-Step Worked Demonstrations (Teacher Modeling)</h4>
                </div>
                <div className="space-y-4">
                  {note.workedDemonstrations.map((demo, dIdx) => (
                    <div
                      key={dIdx}
                      className="rounded-xl border border-amber-200/80 bg-amber-50/20 p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold text-slate-900">{demo.title}</h5>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                          Model Solution
                        </span>
                      </div>

                      <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-800 font-medium">
                        <span className="font-bold text-slate-900 block mb-1">Problem Statement:</span>
                        {demo.problem}
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <span className="font-bold text-indigo-900 block">Step-by-Step Resolution:</span>
                        {demo.stepByStepSolution.map((step, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-2 bg-white/80 p-2 rounded border border-slate-100 text-slate-800">
                            <span className="font-bold text-indigo-600 shrink-0">✓</span>
                            <span className="leading-relaxed">{step}</span>
                          </div>
                        ))}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-2 text-xs pt-1">
                        <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-emerald-900">
                          <span className="font-bold block text-[10px] uppercase tracking-wider mb-0.5">
                            Key Principle:
                          </span>
                          {demo.keyPrinciple}
                        </div>
                        <div className="bg-indigo-50 p-2.5 rounded-lg border border-indigo-200 text-indigo-900">
                          <span className="font-bold block text-[10px] uppercase tracking-wider mb-0.5">
                            Examiner Advice:
                          </span>
                          {demo.examinerTip}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section VII: Key Terms, Symbols & Formula Codex */}
              <section id="section-key-terms" className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <ShieldCheck className="h-4 w-4 text-indigo-600" />
                  <h4>VII. Key Terms, Symbols & Formula Codex</h4>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {note.keyTermsAndFormulas.map((term, tIdx) => (
                    <div
                      key={tIdx}
                      className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-col justify-between text-xs space-y-1.5"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-xs">{term.termOrSymbol}</span>
                          {hasSpeech && (
                            <button
                              type="button"
                              onClick={() => handleSpeak(`${term.termOrSymbol}. ${term.definition}`, `term-${tIdx}`)}
                              className="text-slate-400 hover:text-indigo-600 p-0.5"
                              title="Pronounce"
                            >
                              <Volume2 className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed mt-1">{term.definition}</p>
                      </div>
                      {term.practicalExample && (
                        <span className="text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-mono block truncate">
                          {term.practicalExample}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Section VIII: Common Misconceptions & Examiner Traps */}
              <section id="section-misconceptions" className="rounded-xl border border-rose-200 bg-rose-50/30 p-4 space-y-3">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                  <AlertTriangle className="h-4 w-4 text-rose-600" />
                  <h4>VIII. Common Misconceptions & Examiner Traps</h4>
                </div>
                <div className="space-y-2.5">
                  {note.commonMisconceptions.map((misc, mIdx) => (
                    <div key={mIdx} className="bg-white p-3.5 rounded-lg border border-rose-200/80 text-xs space-y-1">
                      <div className="font-bold text-rose-800 flex items-center gap-1.5">
                        <span className="bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded text-[10px]">
                          Flawed Thinking:
                        </span>
                        <span>{misc.flawedThinking}</span>
                      </div>
                      <div className="text-slate-600 pl-4 border-l-2 border-rose-300 space-y-0.5 mt-1">
                        <p><strong className="text-slate-700">Why it fails:</strong> {misc.whyItsWrong}</p>
                        <p className="text-emerald-700 font-semibold"><strong className="text-emerald-800">Remedial Correction:</strong> {misc.remedialGuidance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section IX: Formative Evaluation Questions */}
              <section id="section-evaluation" className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <HelpCircle className="h-4 w-4 text-indigo-600" />
                  <h4>IX. Formative Evaluation Questions (Class Work)</h4>
                </div>
                <div className="space-y-3">
                  {note.evaluationQuestions.map((q, qIdx) => (
                    <div key={qIdx} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Question {qIdx + 1}</span>
                        <div className="flex items-center gap-2">
                          {q.bloomLevel && (
                            <span className="text-[10px] text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded">
                              {q.bloomLevel}
                            </span>
                          )}
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              q.tier === "Foundational"
                                ? "bg-emerald-100 text-emerald-800"
                                : q.tier === "Core Standard"
                                ? "bg-indigo-100 text-indigo-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {q.tier}
                          </span>
                        </div>
                      </div>
                      <p className="text-slate-800 font-medium leading-relaxed">{q.question}</p>
                      <div className="p-2.5 bg-white rounded border border-slate-200 text-slate-700 text-[11px] leading-relaxed">
                        <span className="font-bold text-emerald-700 block mb-0.5">Teacher Marking Guidance:</span>
                        {q.expectedAnswer}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section X: Diagnostic Exit Ticket & Homework */}
              <div className="grid md:grid-cols-2 gap-4">
                <section id="section-exit-ticket" className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-indigo-900 font-bold text-xs uppercase tracking-wider">
                      <Target className="h-3.5 w-3.5 text-indigo-600" />
                      <h4>X. Diagnostic Exit Ticket</h4>
                    </div>
                    <span className="text-[10px] font-bold bg-indigo-200 text-indigo-900 px-2 py-0.5 rounded">
                      {note.exitTicket.timeLimitMinutes} Mins
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900 leading-relaxed bg-white p-3 rounded border border-indigo-100">
                    {note.exitTicket.prompt}
                  </p>
                  <p className="text-[11px] text-slate-600 italic">
                    <strong className="text-indigo-900">Success Criteria:</strong> {note.exitTicket.successCriteria}
                  </p>
                </section>

                <section id="section-homework" className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs uppercase tracking-wider">
                    <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
                    <h4>XI. Homework & Extension</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {note.assignmentHomework.map((hw, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-1.5 leading-relaxed">
                        <span className="font-bold text-indigo-600">{hIdx + 1}.</span>
                        <span>{hw}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </article>
          )}

          {/* TAB 2: STUDENT CHALKBOARD / NOTEBOOK COPY */}
          {activeTab === "student_chalkboard" && (
            <div id="student-chalkboard-view" className="space-y-4">
              <div className="p-4 bg-slate-900 text-emerald-300 font-mono rounded-2xl border-4 border-slate-800 shadow-inner space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                  <span className="text-slate-400 font-sans font-bold">CHALKBOARD / NOTEBOOK COPY:</span>
                  <span className="text-indigo-400 font-sans">{note.levelLabel} • {note.subject}</span>
                </div>
                <div className="space-y-2 text-xs leading-relaxed">
                  {note.chalkboardSummary.map((line, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">›</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Companion QR: {note.companionQRCode}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy()}
                    className="text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <Copy className="h-3 w-3" /> Copy Chalkboard Notes
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic text-center">
                This condensed summary reflects the standardized board notes learners must copy into their notebooks.
              </p>
            </div>
          )}

          {/* TAB 3: DIAGNOSTIC EXIT SLIP */}
          {activeTab === "exit_slip" && (
            <div id="diagnostic-exit-slip-view" className="max-w-xl mx-auto space-y-4">
              <div className="p-6 rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50/40 space-y-4">
                <div className="flex items-center justify-between border-b border-indigo-200 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block">
                      MOOS Academy
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">Diagnostic Exit Slip (2 Minutes)</h4>
                  </div>
                  <span className="text-xs font-mono font-bold bg-white px-2 py-1 rounded border border-indigo-200 text-indigo-900">
                    {note.companionQRCode}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-800">
                  <div>
                    <span className="font-bold block text-slate-900 mb-1">Exit Prompt:</span>
                    <p className="bg-white p-3 rounded-lg border border-slate-200 leading-relaxed font-medium">
                      {note.exitTicket.prompt}
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="font-bold block text-slate-900 mb-1">Student Answer Box:</span>
                    <div className="h-28 bg-white rounded-lg border border-slate-300 p-3 text-slate-400 italic text-xs">
                      Write your independent solution, formula, and explanation here...
                    </div>
                  </div>
                  <div className="pt-1 text-[11px] text-slate-600">
                    <strong className="text-indigo-900">Success Rubric:</strong> {note.exitTicket.successCriteria}
                  </div>
                </div>

                <div className="pt-2 border-t border-indigo-200 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Learner Name: _____________________</span>
                  <span>Date: _________________</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
