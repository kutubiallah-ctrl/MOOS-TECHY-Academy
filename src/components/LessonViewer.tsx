import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
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
  GraduationCap,
  Volume2,
  VolumeX,
  Layers,
  Activity,
  BrainCircuit,
  Globe,
  Check,
  ChevronRight,
  HelpCircle,
  TrendingUp,
  Sparkle,
  Video,
  Film
} from "lucide-react";
import { Skill, Unit } from "../types/curriculum";
import { contentSaturationService } from "../services/contentSaturationService";
import { videoLearningService } from "../services/videoLearningService";
import { smartBoardMasterclassService } from "../services/smartBoardMasterclassService";
import { mathematicalSpeechService } from "../services/mathematicalSpeechService";
import { CurriculumVideoPlayer } from "./video/CurriculumVideoPlayer";
import { VideoExplanationPlayer } from "./VideoExplanationPlayer";
import { VideoCoverageMatrixModal } from "./video/VideoCoverageMatrixModal";
import { VideoCreatorStudioModal } from "./video/VideoCreatorStudioModal";
import { SmartBoardMasterclassPlayer } from "./video/SmartBoardMasterclassPlayer";
import { AudioPlaybackMonitor } from "./video/AudioPlaybackMonitor";
import { TopicResourceHub } from "./TopicResourceHub";
import {
  SUPPORTED_LANGUAGES,
  EducationalVisualization,
  FlashcardCard,
  InteractiveActivity,
  NigerianLanguageLocalization
} from "../types/contentSaturation";

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
  const [activeTab, setActiveTab] = useState<
    "concept" | "video" | "resource_hub" | "examples" | "key_terms" | "flashcards" | "visualizer" | "activities" | "vernacular"
  >("concept");
  const [videoPlaybackMode, setVideoPlaybackMode] = useState<"smart_board" | "interactive_studio">("smart_board");
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingElementId, setSpeakingElementId] = useState<string | null>(null);

  // Video learning modals state
  const [showCoverageModal, setShowCoverageModal] = useState(false);
  const [showCreatorStudioModal, setShowCreatorStudioModal] = useState(false);
  
  // Flashcard state
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Activity state
  const [selectedActivityStep, setSelectedActivityStep] = useState<number | null>(null);
  const [activityFeedback, setActivityFeedback] = useState<string | null>(null);

  // Vernacular state
  const [selectedLanguage, setSelectedLanguage] = useState<"yo" | "ha" | "ig" | "pcm">("pcm");

  // Diagnostic self-check reveal state
  const [showSelfCheckHint, setShowSelfCheckHint] = useState(false);

  const hasSpeech = typeof window !== "undefined" && "speechSynthesis" in window;
  const lastSpokenTextRef = useRef<{ text: string; elementId: string } | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Reset tab and card states when skill changes
  useEffect(() => {
    setActiveCardIndex(0);
    setIsCardFlipped(false);
    setSelectedActivityStep(null);
    setActivityFeedback(null);
    setShowSelfCheckHint(false);
    setCompletedSteps({});
  }, [skill?.id]);

  const handleSpeak = (text: string, elementId: string = "main") => {
    if (!hasSpeech) return;
    if (isSpeaking && speakingElementId === elementId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingElementId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const spokenText = mathematicalSpeechService.normalizeSpokenMathematics(text);
    lastSpokenTextRef.current = { text: spokenText, elementId };
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingElementId(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingElementId(null);
    };
    setIsSpeaking(true);
    setSpeakingElementId(elementId);
    window.speechSynthesis.speak(utterance);
  };

  // Re-synchronize Audio utility for LessonViewer
  const handleLessonAudioResync = useCallback(() => {
    if (activeTab === "video") {
      window.dispatchEvent(new CustomEvent("moos:audio-resync"));
    } else if (lastSpokenTextRef.current) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();
      }
      const { text, elementId } = lastSpokenTextRef.current;
      handleSpeak(text, elementId);
    }
  }, [activeTab]);

  // Retry Segment utility for LessonViewer
  const handleLessonAudioRetrySegment = useCallback(() => {
    if (activeTab === "video") {
      window.dispatchEvent(new CustomEvent("moos:audio-retry-segment"));
    } else if (lastSpokenTextRef.current) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();
      }
      const { text, elementId } = lastSpokenTextRef.current;
      handleSpeak(text, elementId);
    }
  }, [activeTab]);

  // Associated learning resources
  const flashcardDeck = useMemo(() => {
    if (!skill) return undefined;
    return (
      contentSaturationService.getFlashcardDeckBySkillId(skill.id) ||
      (unit ? contentSaturationService.getFlashcardDecksByUnitId(unit.id)[0] : undefined)
    );
  }, [skill, unit]);

  const visualization = useMemo(() => {
    if (!skill) return undefined;
    return (
      contentSaturationService.getVisualizationBySkillId(skill.id) ||
      (unit ? contentSaturationService.getVisualizationsByUnitId(unit.id)[0] : undefined)
    );
  }, [skill, unit]);

  const activities = useMemo(() => {
    if (!skill) return [];
    const skillActs = contentSaturationService.getActivitiesBySkillId(skill.id);
    if (skillActs.length > 0) return skillActs;
    return unit ? contentSaturationService.getActivitiesByUnitId(unit.id) : [];
  }, [skill, unit]);

  const localization = useMemo(() => {
    if (!skill) return undefined;
    return contentSaturationService.getNigerianLocalization(skill.id);
  }, [skill]);

  // Video explanation resource lookup for current unit or skill
  const videoResource = useMemo(() => {
    if (!unit) return undefined;
    return (
      videoLearningService.getVideoByUnitId(unit.id) ||
      (skill ? videoLearningService.getVideoBySkillId(skill.id) : undefined)
    );
  }, [unit, skill]);

  // Masterclass package with segmented smart board actions & dual-script
  const masterclassPackage = useMemo(() => {
    if (!unit) return null;
    if (skill) {
      return smartBoardMasterclassService.getOrCreateMasterclassForSkill(skill, unit);
    }
    return smartBoardMasterclassService.getOrCreateMasterclassForUnit(unit);
  }, [unit, skill]);

  if (!skill || !unit) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <BookOpen className="h-10 w-10 text-indigo-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-800">No Lesson Selected</h3>
        <p className="text-xs text-slate-500">Please choose a unit or skill from the curriculum syllabus to begin.</p>
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 transition cursor-pointer"
        >
          Return to Syllabus
        </button>
      </div>
    );
  }

  // Derive rich lesson content preserving all enriched fields
  const lesson = {
    id: skill.lesson?.id || `les-${skill.id}`,
    title: skill.lesson?.title || skill.title,
    hookAndIntuition:
      skill.lesson?.hookAndIntuition ||
      `Mastering ${skill.title} develops critical intuition across ${unit.title}. Let's examine how the underlying rules and patterns work.`,
    conceptualExplanation:
      skill.lesson?.conceptualExplanation ||
      skill.summary ||
      "This topic focuses on core operational laws, systematic steps, and error-free problem execution.",
    keyTermsAndFormulas:
      skill.lesson?.keyTermsAndFormulas && skill.lesson.keyTermsAndFormulas.length > 0
        ? skill.lesson.keyTermsAndFormulas
        : [
            {
              termOrSymbol: skill.title,
              definition: skill.summary,
              practicalExample: "Standard curricular application"
            }
          ],
    workedExamples:
      skill.lesson?.workedExamples && skill.lesson.workedExamples.length > 0
        ? skill.lesson.workedExamples
        : skill.questions.slice(0, 2).map((q, idx) => ({
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
    commonMisconceptionsAndTraps:
      skill.lesson?.commonMisconceptionsAndTraps &&
      skill.lesson.commonMisconceptionsAndTraps.length > 0
        ? skill.lesson.commonMisconceptionsAndTraps
        : skill.questions
            .flatMap((q) => q.misconceptionAlerts || [])
            .map((m) => ({
              misconception: `Selecting "${m.trigger}"`,
              whyItIsWrong: m.note,
              correctCorrection: "Review the governing formula and verify intermediate calculations."
            })),
    guidedPracticePrompt:
      skill.lesson?.guidedPracticePrompt ||
      "Are you ready to test your understanding with guided Socratic practice?",
    diagnosticSelfCheck: skill.lesson?.diagnosticSelfCheck,
    summaryRecap:
      skill.lesson?.summaryRecap ||
      `You have reviewed the essential principles of ${skill.title}. Now solidify your mastery in the Practice Arena!`
  };

  // Find next skill in unit
  const currentSkillIndex = unit.skills.findIndex((s) => s.id === skill.id);
  const nextSkill =
    currentSkillIndex >= 0 && currentSkillIndex < unit.skills.length - 1
      ? unit.skills[currentSkillIndex + 1]
      : null;

  const toggleStep = (stepKey: string) => {
    setCompletedSteps((prev) => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  return (
    <div id="lesson-viewer-view" className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Header Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition px-3 py-1.5 rounded-xl hover:bg-slate-100 cursor-pointer"
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
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Skill {currentSkillIndex + 1} of {unit.skills.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {hasSpeech && (
            <button
              type="button"
              onClick={() =>
                handleSpeak(
                  `${lesson.title}. ${lesson.hookAndIntuition}. ${lesson.conceptualExplanation}`,
                  "main-lesson"
                )
              }
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                isSpeaking && speakingElementId === "main-lesson"
                  ? "bg-amber-100 text-amber-900 border-amber-300"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
              }`}
              title="Listen to lesson narration"
            >
              {isSpeaking && speakingElementId === "main-lesson" ? (
                <>
                  <VolumeX className="h-3.5 w-3.5 text-amber-700" />
                  <span>Stop</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Listen</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => onOpenAITutor(skill, unit)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs transition cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ask Tutor Moos</span>
          </button>

          <button
            type="button"
            onClick={() => onStartPractice(skill, unit)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Start Practice</span>
          </button>
        </div>
      </div>

      {/* Lesson Title & Objectives Hero Card */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-indigo-800/50 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold text-indigo-300 tracking-wider">
              {unit.title}
            </span>
            <span className="text-[11px] font-semibold text-indigo-400">·</span>
            <span className="text-xs font-semibold text-indigo-300">{skill.code}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{lesson.title}</h1>
        </div>

        {/* Learning Objectives */}
        <div className="pt-3 border-t border-white/10 space-y-2">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="h-4 w-4" />
            <span>Core Competencies & Learning Objectives:</span>
          </span>
          <div className="grid sm:grid-cols-2 gap-2">
            {skill.objectives.map((obj, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs text-indigo-100 bg-white/5 rounded-xl p-2.5 border border-white/10"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Video Learning Pathway Hero Banner */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 flex-shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-sky-200">
                  {videoResource ? "Curriculum Video Explanation Active" : "Video Production Pipeline Mapped"}
                </span>
                {videoResource && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                    {videoResource.durationFormatted}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-300">
                {videoResource
                  ? `Instructional visual reasoning synced with dynamic canvas, transcript & checkpoints.`
                  : `Structured 5-scene pedagogical script ready. Explore 83-unit matrix or author in Studio.`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {videoResource ? (
              <button
                type="button"
                onClick={() => setActiveTab("video")}
                className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow transition flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch Video</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActiveTab("video")}
                className="px-3 py-1.5 rounded-xl bg-indigo-500/30 hover:bg-indigo-500/40 text-indigo-200 border border-indigo-400/30 font-medium text-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <Film className="w-3.5 h-3.5 text-indigo-300" />
                <span>View Roadmap</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowCoverageModal(true)}
              className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs border border-white/10 transition cursor-pointer"
              title="View 83-Unit Coverage Matrix"
            >
              83-Unit Matrix
            </button>

            {/* Header Audio Playback Monitor */}
            <div className="hidden lg:block pl-1 border-l border-white/10">
              <AudioPlaybackMonitor
                compact={true}
                isActivePlayback={isSpeaking || activeTab === "video"}
                segmentTitle={skill?.title || unit.title}
                onResync={handleLessonAudioResync}
                onRetrySegment={handleLessonAudioRetrySegment}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab("concept")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === "concept"
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>Instruction & Theory</span>
        </button>

        {/* Dedicated Video Explanation Sub-Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("video")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === "video"
              ? "bg-sky-600 text-white shadow-xs"
              : videoResource
              ? "text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Video className="h-3.5 w-3.5" />
          <span>
            {videoResource ? `Video Masterclass (${videoResource.durationFormatted})` : "Video Explanation"}
          </span>
          {videoResource && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
          )}
        </button>

        {/* Dedicated 26-Channel Resource Hub Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("resource_hub")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === "resource_hub"
              ? "bg-rose-600 text-white shadow-xs"
              : "text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200"
          }`}
        >
          <Sparkle className="h-3.5 w-3.5 text-rose-500" />
          <span>Resource Hub (26)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("examples")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === "examples"
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Lightbulb className="h-3.5 w-3.5" />
          <span>Worked Examples ({lesson.workedExamples?.length || 0})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("key_terms")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === "key_terms"
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Compass className="h-3.5 w-3.5" />
          <span>Key Rules & Codex ({lesson.keyTermsAndFormulas?.length || 0})</span>
        </button>

        {flashcardDeck && (
          <button
            type="button"
            onClick={() => setActiveTab("flashcards")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === "flashcards"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Active Recall ({flashcardDeck.cards.length})</span>
          </button>
        )}

        {visualization && (
          <button
            type="button"
            onClick={() => setActiveTab("visualizer")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === "visualizer"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            <span>Visualization</span>
          </button>
        )}

        {activities.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab("activities")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === "activities"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <BrainCircuit className="h-3.5 w-3.5" />
            <span>Cognitive Task ({activities.length})</span>
          </button>
        )}

        {localization && (
          <button
            type="button"
            onClick={() => setActiveTab("vernacular")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === "vernacular"
                ? "bg-teal-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            <span>Vernacular (4)</span>
          </button>
        )}
      </div>

      {/* Main Tab Content */}
      <div className="space-y-6">
        {/* Active Speech Playback Monitor for Lesson Notes */}
        {isSpeaking && activeTab !== "video" && (
          <AudioPlaybackMonitor
            isActivePlayback={true}
            segmentTitle={`Lesson Reading: ${speakingElementId || "Current Concept"}`}
            onResync={handleLessonAudioResync}
            onRetrySegment={handleLessonAudioRetrySegment}
          />
        )}

        {/* TAB: Dedicated Video Explanation / Smart Board Masterclass */}
        {activeTab === "video" && (
          <div className="space-y-6 animate-in fade-in">
            {/* View Switcher: Smart Board Masterclass vs Standard Studio */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-3.5 rounded-2xl border border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold uppercase">
                  Masterclass Engine
                </span>
                <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                  Synchronized Tutor Voice & Digital Smart Board
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => setVideoPlaybackMode("smart_board")}
                    className={`px-3 py-1 rounded-lg font-bold text-xs transition cursor-pointer ${
                      videoPlaybackMode === "smart_board"
                        ? "bg-cyan-600 text-white shadow-xs"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Smart Board Player
                  </button>
                  <button
                    type="button"
                    onClick={() => setVideoPlaybackMode("interactive_studio")}
                    className={`px-3 py-1 rounded-lg font-bold text-xs transition cursor-pointer ${
                      videoPlaybackMode === "interactive_studio"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Interactive Canvas Studio
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCreatorStudioModal(true)}
                  className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
                >
                  Creator Studio
                </button>
              </div>
            </div>

            {/* Audio Playback & Synchronization Monitor for Masterclass */}
            <AudioPlaybackMonitor
              isActivePlayback={videoPlaybackMode === "smart_board"}
              segmentTitle={masterclassPackage ? `${masterclassPackage.title} (Dual-Script Voice Track)` : unit.title}
              onResync={handleLessonAudioResync}
              onRetrySegment={handleLessonAudioRetrySegment}
            />

            {videoPlaybackMode === "smart_board" && masterclassPackage ? (
              <SmartBoardMasterclassPlayer
                masterclass={masterclassPackage}
                onLaunchPractice={() => onStartPractice(skill, unit)}
                onOpenAITutorWithContext={() => onOpenAITutor(skill, unit)}
              />
            ) : videoResource ? (
              <div className="space-y-4">
                {/* Full Interactive Curriculum Video Player */}
                <CurriculumVideoPlayer
                  video={videoResource}
                  onLaunchPractice={() => onStartPractice(skill, unit)}
                  onOpenAITutorWithContext={() => onOpenAITutor(skill, unit)}
                />

                {/* Video Hub Auxiliary Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">Video Pipeline Operations:</span>
                    <span className="text-slate-400">All 83 curricular units mapped</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCoverageModal(true)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold border border-slate-200 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Video className="w-3.5 h-3.5 text-sky-600" />
                      Browse 83-Unit Video Matrix
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowCreatorStudioModal(true)}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold border border-indigo-200 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Film className="w-3.5 h-3.5 text-indigo-600" />
                      Open Creator Studio
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* TAB: 26-Channel Topic Resource Hub */}
        {activeTab === "resource_hub" && (
          <div className="space-y-4 animate-in fade-in">
            <TopicResourceHub
              unit={unit}
              skill={skill}
              onOpenMasterclass={() => {
                setVideoPlaybackMode("smart_board");
                setActiveTab("video");
              }}
              onLaunchPractice={() => onStartPractice(skill, unit)}
              onOpenAITutorWithContext={() => onOpenAITutor(skill, unit)}
              onOpenFlashcards={() => setActiveTab("flashcards")}
              onOpenQuiz={() => onStartPractice(skill, unit)}
            />
          </div>
        )}

        {/* TAB 1: Conceptual Instruction */}
        {activeTab === "concept" && (
          <div className="space-y-6">
            {/* Prominent Video Explanation Player above Text-based Lesson Content */}
            {videoResource && (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-800 uppercase tracking-wider">
                    <Video className="w-4 h-4 text-sky-600" />
                    <span>Curriculum Video Explanation • Visual Masterclass</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                    Watch visual explanation or read foundational theory below
                  </span>
                </div>
                <VideoExplanationPlayer
                  videoResource={videoResource}
                  title={videoResource.title}
                  subjectName={videoResource.subjectName}
                  transcript={videoResource.transcript}
                  checkpoints={videoResource.checkpoints}
                  onLaunchPractice={() => onStartPractice(skill, unit)}
                  onOpenAITutorWithContext={(t, p) => onOpenAITutor(skill, unit)}
                />
              </div>
            )}

            {/* Real World Hook & Intuition */}
            {lesson.hookAndIntuition && (
              <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-6 space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                    <Lightbulb className="h-4 w-4 text-amber-600" />
                    <span>Real-World Intuition & Practical Hook</span>
                  </div>
                  {hasSpeech && (
                    <button
                      type="button"
                      onClick={() => handleSpeak(lesson.hookAndIntuition, "hook")}
                      className={`p-1.5 rounded-lg border transition cursor-pointer ${
                        isSpeaking && speakingElementId === "hook"
                          ? "bg-amber-200 text-amber-900 border-amber-400"
                          : "bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300"
                      }`}
                      title="Listen to Hook"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <p className="text-sm font-medium text-amber-950 leading-relaxed">
                  {lesson.hookAndIntuition}
                </p>
              </div>
            )}

            {/* Deep Conceptual Text */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Foundational Principles & Theory</h3>
                {hasSpeech && (
                  <button
                    type="button"
                    onClick={() => handleSpeak(lesson.conceptualExplanation, "concept-body")}
                    className={`p-1.5 rounded-lg border transition cursor-pointer ${
                      isSpeaking && speakingElementId === "concept-body"
                        ? "bg-indigo-100 text-indigo-900 border-indigo-300"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200"
                    }`}
                    title="Listen to Conceptual Explanation"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <div className="text-sm text-slate-700 leading-relaxed space-y-3 font-normal">
                {lesson.conceptualExplanation.split("\n\n").map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Authentic Vector Scientific Diagram / Conceptual Model */}
              {visualization?.diagramSvgSnippet && (
                <div className="my-6 rounded-2xl border border-slate-200 overflow-hidden bg-slate-900 shadow-sm">
                  <div className="px-4 py-2.5 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkle className="h-3.5 w-3.5 text-emerald-400" />
                      Visual Model &amp; Pedagogical Architecture
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {visualization.type.replace("_", " ")}
                    </span>
                  </div>
                  <div
                    className="p-3 sm:p-5 flex justify-center items-center overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: visualization.diagramSvgSnippet }}
                  />
                  <div className="px-4 py-3 bg-slate-950/80 border-t border-slate-800 text-xs text-slate-300">
                    <span className="font-semibold text-slate-200">Caption: </span>
                    {visualization.caption}
                  </div>
                </div>
              )}

              {/* Common Pitfalls & Exam Traps */}
              {lesson.commonMisconceptionsAndTraps && lesson.commonMisconceptionsAndTraps.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Watch Out: Common Exam Pitfalls & Cognitive Traps</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {lesson.commonMisconceptionsAndTraps.map((trap, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-rose-100 bg-rose-50/40 p-4 space-y-1.5 text-xs"
                      >
                        <span className="font-bold text-rose-900 block">⚠️ {trap.misconception}</span>
                        <p className="text-rose-800 leading-normal">{trap.whyItIsWrong}</p>
                        <p className="text-slate-700 pt-1 font-semibold">
                          💡 Correction: {trap.correctCorrection}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Diagnostic Self-Check Prompt */}
              {lesson.diagnosticSelfCheck && (
                <div className="mt-6 pt-6 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wider">
                      <HelpCircle className="h-4 w-4 text-indigo-600" />
                      <span>Quick Diagnostic Self-Check</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowSelfCheckHint(!showSelfCheckHint)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition cursor-pointer"
                    >
                      {showSelfCheckHint ? "Hide Strategy" : "Show Strategy Hint"}
                    </button>
                  </div>
                  <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-950 space-y-2">
                    <p className="font-medium">{lesson.diagnosticSelfCheck}</p>
                    {showSelfCheckHint && (
                      <p className="pt-2 border-t border-indigo-200/60 text-slate-700">
                        <strong>Guidance:</strong> Break down the problem by writing down all knowns and
                        unknowns first, identify the governing equation, and compute with verified units.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Summary Recap */}
              {lesson.summaryRecap && (
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Sparkle className="h-4 w-4 text-amber-500 shrink-0" />
                    <span>{lesson.summaryRecap}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onStartPractice(skill, unit)}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <span>Launch Practice Arena</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Worked Examples */}
        {activeTab === "examples" && (
          <div className="space-y-6">
            {lesson.workedExamples && lesson.workedExamples.length > 0 ? (
              lesson.workedExamples.map((ex, exIdx) => (
                <div
                  key={exIdx}
                  className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      {ex.title}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Step-by-Step Pedagogical Breakdown
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">{ex.problemStatement}</h4>

                  {ex.mathExpression && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs sm:text-sm text-indigo-900 font-bold">
                      {ex.mathExpression}
                    </div>
                  )}

                  {/* Steps with Interactive Checkpoints */}
                  <div className="space-y-3 pt-2">
                    {ex.steps.map((st) => {
                      const stepKey = `${exIdx}-${st.stepNumber}`;
                      const isDone = Boolean(completedSteps[stepKey]);
                      return (
                        <div
                          key={st.stepNumber}
                          onClick={() => toggleStep(stepKey)}
                          className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3.5 ${
                            isDone
                              ? "bg-emerald-50/60 border-emerald-200"
                              : "bg-slate-50/70 border-slate-200 hover:bg-slate-100/80"
                          }`}
                        >
                          <div
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                              isDone ? "bg-emerald-600 text-white" : "bg-indigo-100 text-indigo-700"
                            }`}
                          >
                            {isDone ? <Check className="h-3.5 w-3.5" /> : st.stepNumber}
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
                      <span>
                        <strong>Key Takeaway:</strong> {ex.takeawayRule}
                      </span>
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

        {/* TAB 3: Key Rules & Codex */}
        {activeTab === "key_terms" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {lesson.keyTermsAndFormulas && lesson.keyTermsAndFormulas.length > 0 ? (
              lesson.keyTermsAndFormulas.map((kt, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900 block">
                        {kt.termOrSymbol}
                      </span>
                      {hasSpeech && (
                        <button
                          type="button"
                          onClick={() =>
                            handleSpeak(`${kt.termOrSymbol}. Definition: ${kt.definition}`, `kt-${i}`)
                          }
                          className={`p-1.5 rounded-lg border transition cursor-pointer ${
                            isSpeaking && speakingElementId === `kt-${i}`
                              ? "bg-amber-100 text-amber-800 border-amber-300"
                              : "bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-indigo-600 border-slate-200"
                          }`}
                          title={`Listen to pronunciation of ${kt.termOrSymbol}`}
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{kt.definition}</p>
                  </div>
                  {kt.practicalExample && (
                    <div className="pt-2 border-t border-slate-100 text-[11px] text-indigo-600 font-medium">
                      <strong>Curricular Application:</strong> {kt.practicalExample}
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

        {/* TAB 4: Active Recall Flashcards */}
        {activeTab === "flashcards" && flashcardDeck && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div>
                  <span className="font-bold text-slate-800">{flashcardDeck.title}</span>
                  <span className="text-slate-400 ml-2">
                    Card {activeCardIndex + 1} of {flashcardDeck.cards.length}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                  {flashcardDeck.cards[activeCardIndex]?.category.replace("_", " ")}
                </span>
              </div>

              {/* Flashcard container */}
              {(() => {
                const currentCard = flashcardDeck.cards[activeCardIndex] || flashcardDeck.cards[0];
                if (!currentCard) return null;
                return (
                  <div
                    onClick={() => setIsCardFlipped(!isCardFlipped)}
                    className={`min-h-[220px] rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 shadow-xs flex flex-col justify-between ${
                      isCardFlipped
                        ? "border-emerald-300 bg-emerald-50/40"
                        : "border-indigo-200 bg-white hover:border-indigo-400"
                    }`}
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {isCardFlipped ? "Answer / Conceptual Explanation" : "Recall Prompt (Click to Flip)"}
                      </span>
                      <p className="text-sm font-bold text-slate-900 leading-relaxed">
                        {isCardFlipped ? currentCard.back : currentCard.front}
                      </p>

                      {currentCard.formulaLatex && !isCardFlipped && (
                        <div className="mt-2 p-2 bg-slate-50 rounded-lg font-mono text-xs text-indigo-900 border border-slate-200 inline-block">
                          {currentCard.formulaLatex}
                        </div>
                      )}

                      {isCardFlipped && currentCard.commonTrapNote && (
                        <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <strong>Exam Trap:</strong> {currentCard.commonTrapNote}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
                      <span>Click card anywhere to toggle prompt / answer</span>
                      <span className="font-semibold text-indigo-600">
                        {isCardFlipped ? "Showing Solution" : "Testing Recall"}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCardFlipped(false);
                    setActiveCardIndex(
                      (prev) => (prev - 1 + flashcardDeck.cards.length) % flashcardDeck.cards.length
                    );
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition cursor-pointer"
                >
                  ← Previous Card
                </button>

                <button
                  type="button"
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                  className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition cursor-pointer"
                >
                  {isCardFlipped ? "Show Prompt" : "Reveal Answer"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsCardFlipped(false);
                    setActiveCardIndex((prev) => (prev + 1) % flashcardDeck.cards.length);
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition cursor-pointer"
                >
                  Next Card →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Educational Visualization */}
        {activeTab === "visualizer" && visualization && (
          <div className="p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">
                  Interactive Conceptual Visualization
                </span>
                <h4 className="text-base font-bold text-slate-900">{visualization.title}</h4>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
                {visualization.type.replace("_", " ")}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{visualization.caption}</p>

            {/* Visual Diagram or Coordinate / Schema preview container */}
            {visualization.diagramSvgSnippet ? (
              <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden p-3 sm:p-5 flex justify-center items-center">
                <div
                  className="w-full max-w-4xl overflow-x-auto flex justify-center"
                  dangerouslySetInnerHTML={{ __html: visualization.diagramSvgSnippet }}
                />
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between text-slate-400 text-[11px] border-b border-slate-800 pb-2">
                  <span>Domain / Axis: {visualization.xAxisLabel || "X"} vs {visualization.yAxisLabel || "Y"}</span>
                  <span>Type: {visualization.type}</span>
                </div>

                {visualization.dataPoints && visualization.dataPoints.length > 0 ? (
                  <div className="space-y-2 py-2">
                    <div className="text-[11px] text-slate-400">Sample Trajectory Points:</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {visualization.dataPoints.slice(0, 4).map((pt, idx) => (
                        <div key={idx} className="p-2 rounded bg-slate-800 border border-slate-700 text-center">
                          <div className="text-amber-400 font-bold">({pt.x ?? pt.value ?? 0}, {pt.y ?? 0})</div>
                          {pt.label && <div className="text-[10px] text-slate-400">{pt.label}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-center text-slate-400">
                    Interactive schematic diagram ready for exploratory study
                  </div>
                )}
              </div>
            )}

            {visualization.pedagogicalTakeaway && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                <span className="font-bold text-emerald-900 block">Key Conceptual Takeaway:</span>
                <p className="leading-relaxed">{visualization.pedagogicalTakeaway}</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: Cognitive Tasks */}
        {activeTab === "activities" && activities.length > 0 && (
          <div className="space-y-4">
            {activities.map((act) => {
              const stepItems = act.steps || [];
              return (
                <div key={act.id} className="p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">
                        Active Cognitive Task
                      </span>
                      <h4 className="text-base font-bold text-slate-900">{act.title}</h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      {act.type.replace("_", " ")}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{act.instructions}</p>

                  {act.problemOrContext && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono whitespace-pre-line">
                      {act.problemOrContext}
                    </div>
                  )}

                  {/* Interactive Steps */}
                  {stepItems.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <div className="text-xs font-bold text-slate-700">
                        Select the correct sequential action:
                      </div>
                      <div className="grid gap-2">
                        {stepItems.map((st, sIdx) => {
                          const stepNum = st.correctOrder ?? sIdx + 1;
                          const stepText = st.text || `Action Step ${sIdx + 1}`;
                          return (
                            <button
                              key={st.id || sIdx}
                              type="button"
                              onClick={() => {
                                setSelectedActivityStep(stepNum);
                                setActivityFeedback(
                                  `Verified order: Step ${stepNum}. High-yield sequence logic confirmed.`
                                );
                              }}
                              className={`p-3 rounded-xl border text-left text-xs transition cursor-pointer ${
                                selectedActivityStep === stepNum
                                  ? "bg-indigo-50 border-indigo-300 text-indigo-950 font-medium"
                                  : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800"
                              }`}
                            >
                              <strong>Step {stepNum}:</strong> {stepText}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Concept Sorter Items */}
                  {act.categories && act.itemsToPlace && (
                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-bold text-slate-700">Categories & Buckets:</div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {act.categories.map((cat, cIdx) => (
                          <div key={cIdx} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                            <span className="text-xs font-bold text-indigo-900 block">{cat.name}</span>
                            <div className="text-[11px] text-slate-500">
                              Matches {cat.correctItemIds.length} benchmark items
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activityFeedback && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Pedagogical Rationale:</strong> {activityFeedback}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 7: Vernacular Scaffolding */}
        {activeTab === "vernacular" && localization && (
          <div className="p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-600 tracking-wider">
                  Multilingual Vernacular Scaffolding
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  Concept in Nigerian National Languages
                </h4>
              </div>
            </div>

            {/* Language Picker */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setSelectedLanguage(lang.code as "yo" | "ha" | "ig" | "pcm")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedLanguage === lang.code
                      ? "bg-teal-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {lang.name} ({lang.nativeName})
                </button>
              ))}
            </div>

            {/* Selected Language Content */}
            {(() => {
              const langData = localization[selectedLanguage];
              if (!langData) return null;
              return (
                <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-900 uppercase tracking-wider">
                      Intuitive Vernacular Breakdown
                    </span>
                    {hasSpeech && (
                      <button
                        type="button"
                        onClick={() =>
                          handleSpeak(
                            `${langData.conceptualSummary}. Analogy: ${langData.culturalAnalogy}`,
                            "vernacular"
                          )
                        }
                        className={`p-1.5 rounded-lg border transition cursor-pointer ${
                          isSpeaking && speakingElementId === "vernacular"
                            ? "bg-teal-200 text-teal-900 border-teal-400"
                            : "bg-teal-100 hover:bg-teal-200 text-teal-800 border-teal-300"
                        }`}
                        title="Listen to Vernacular Explanation"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-900">Summary:</span>
                    <p className="text-xs text-slate-800 leading-relaxed">
                      {langData.conceptualSummary}
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-teal-200/60">
                    <span className="text-xs font-bold text-teal-900">Cultural Analogy:</span>
                    <p className="text-xs text-teal-950 font-medium leading-relaxed">
                      {langData.culturalAnalogy}
                    </p>
                  </div>
                </div>
              );
            })()}
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
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next Lesson: {nextSkill.title.slice(0, 20)}...</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => onStartPractice(skill, unit)}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition flex items-center gap-2 cursor-pointer"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>Launch Practice Arena</span>
          </button>
        </div>
      </div>

      {/* Video Coverage Matrix Modal */}
      <VideoCoverageMatrixModal
        isOpen={showCoverageModal}
        onClose={() => setShowCoverageModal(false)}
        onSelectVideo={(videoId) => {
          setActiveTab("video");
        }}
        onOpenCreatorStudio={(targetUnitId) => {
          setShowCreatorStudioModal(true);
        }}
      />

      {/* Video Creator Studio Modal */}
      <VideoCreatorStudioModal
        isOpen={showCreatorStudioModal}
        onClose={() => setShowCreatorStudioModal(false)}
        preselectedUnitId={unit?.id}
      />
    </div>
  );
};
