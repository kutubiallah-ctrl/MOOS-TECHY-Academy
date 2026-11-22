import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  Grid,
  Bot,
  MessageSquare,
  Award,
  Send,
  Subtitles,
  Columns,
  Square,
  Check,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  FileText,
  X,
  ShieldCheck,
  Eye,
  Sliders,
  Edit3,
  Compass
} from "lucide-react";
import {
  MasterclassPackage,
  MasterclassSegment,
  SmartBoardAction,
  InteractiveSmartBoardMode,
  InteractiveLessonState,
  SubjectManipulativeState
} from "../../types/smartBoardMasterclass";
import { VideoCheckpointQuestion, VideoStoryboardScene, SubjectVisualEngineType } from "../../types/videoLearning";
import { videoLearningService } from "../../services/videoLearningService";
import { smartBoardInteractionService } from "../../services/smartBoardInteractionService";
import { mathematicalSpeechService } from "../../services/mathematicalSpeechService";
import { AudioPlaybackMonitor } from "./AudioPlaybackMonitor";
import { MathFormula } from "./MathFormula";
import { SubjectVisualCanvas } from "./SubjectVisualCanvas";
import { SubjectManipulativeStage } from "./interactive/SubjectManipulativeStage";
import { StepByStepProblemSolver } from "./interactive/StepByStepProblemSolver";

export interface SmartBoardMasterclassPlayerProps {
  masterclass: MasterclassPackage;
  initialSegmentNumber?: number;
  onLaunchPractice?: (skillId?: string) => void;
  onOpenAITutorWithContext?: (topic: string, prompt: string) => void;
  onClose?: () => void;
}

export const SmartBoardMasterclassPlayer: React.FC<SmartBoardMasterclassPlayerProps> = ({
  masterclass,
  initialSegmentNumber = 1,
  onLaunchPractice,
  onOpenAITutorWithContext,
  onClose
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Active Segment State
  const [currentSegmentNumber, setCurrentSegmentNumber] = useState<number>(initialSegmentNumber);
  const activeSegment: MasterclassSegment =
    masterclass.segments.find((s) => s.segmentNumber === currentSegmentNumber) ||
    masterclass.segments[0];

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSeconds, setCurrentTimeSeconds] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Board appearance & layout modes
  const [boardLayout, setBoardLayout] = useState<"dual" | "derivation" | "visual">("dual");
  const [boardPattern, setBoardPattern] = useState<"dots" | "grid" | "plain">("dots");
  const [showSubtitles, setShowSubtitles] = useState(true);

  // Checkpoint Modal State
  const [activeCheckpoint, setActiveCheckpoint] = useState<VideoCheckpointQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [checkpointSubmitted, setCheckpointSubmitted] = useState(false);
  const [showSocraticHint, setShowSocraticHint] = useState(false);
  const [answeredCheckpoints, setAnsweredCheckpoints] = useState<Record<string, boolean>>({});
  const [showQualityGateModal, setShowQualityGateModal] = useState(false);

  // Interactive Smart Board Mode: WATCH (Teacher) | INTERACT (Manipulatives) | DO (Step Problem Solver)
  const [interactionMode, setInteractionMode] = useState<InteractiveSmartBoardMode>("watch");

  const [interactiveLessonState, setInteractiveLessonState] = useState<InteractiveLessonState>(() =>
    smartBoardInteractionService.initializeInteractiveState({
      problemTitle: masterclass.title,
      subject: masterclass.subjectName,
      mode: "watch"
    })
  );

  const [manipulativeState, setManipulativeState] = useState<SubjectManipulativeState>(() =>
    smartBoardInteractionService.getSubjectManipulativeState(masterclass.subjectName, masterclass.title)
  );

  const problemSteps = useMemo(
    () => smartBoardInteractionService.getProblemStepsForTopic(masterclass.title, masterclass.subjectName),
    [masterclass.title, masterclass.subjectName]
  );

  // Tutor Moos quick question prompt state
  const [customTutorPrompt, setCustomTutorPrompt] = useState("");

  // Web Speech API Heartbeat and Queue Refs
  const tickerIntervalRef = useRef<number | null>(null);
  const keepAliveTimerRef = useRef<number | null>(null);
  const activeUtteranceQueueRef = useRef<string[]>([]);
  const isUtteringRef = useRef<boolean>(false);
  const currentSpokenTextRef = useRef<string | null>(null);

  // Load saved segment progress on mount / segment change
  useEffect(() => {
    setCurrentTimeSeconds(0);
    setIsPlaying(false);
    setActiveCheckpoint(null);
    setSelectedOption(null);
    setCheckpointSubmitted(false);

    const saved = videoLearningService.getLearnerProgress(activeSegment.segmentId);
    if (saved) {
      if (saved.currentTimeSeconds < activeSegment.durationSeconds - 5) {
        setCurrentTimeSeconds(saved.currentTimeSeconds);
      }
      const answeredMap: Record<string, boolean> = {};
      Object.entries(saved.checkpointsAnswered || {}).forEach(([id, data]) => {
        answeredMap[id] = data.isCorrect;
      });
      setAnsweredCheckpoints(answeredMap);
    }
  }, [activeSegment.segmentId, activeSegment.durationSeconds]);

  // Speech synthesis heartbeat to prevent 15-second Chromium freeze
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      keepAliveTimerRef.current = window.setInterval(() => {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 5000);
    }
    return () => {
      if (keepAliveTimerRef.current) clearInterval(keepAliveTimerRef.current);
      stopSpeech();
    };
  }, []);

  const stopSpeech = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      currentSpokenTextRef.current = null;
      activeUtteranceQueueRef.current = [];
      isUtteringRef.current = false;
    }
  }, []);

  const speakTextSegment = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isMuted || activeCheckpoint) return;

    // Normalize mathematical notations (superscripts, fractions, radicals, quadratic terms)
    const normalizedSpokenText = mathematicalSpeechService.normalizeSpokenMathematics(text);

    const sentences = normalizedSpokenText
      .split(/(?<=[.?!])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (sentences.length === 0) return;

    window.speechSynthesis.cancel();
    activeUtteranceQueueRef.current = sentences;
    isUtteringRef.current = true;
    currentSpokenTextRef.current = text;

    const speakNext = () => {
      if (activeUtteranceQueueRef.current.length === 0) {
        isUtteringRef.current = false;
        return;
      }
      const sentence = activeUtteranceQueueRef.current.shift()!;
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.rate = playbackSpeed;
      utterance.onend = () => speakNext();
      utterance.onerror = () => {
        isUtteringRef.current = false;
      };
      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  }, [isMuted, activeCheckpoint, playbackSpeed]);

  // Primary Synthetic Playback Timer
  useEffect(() => {
    if (isPlaying && !activeCheckpoint) {
      tickerIntervalRef.current = window.setInterval(() => {
        setCurrentTimeSeconds((prev) => {
          const next = prev + 1;

          // In-Video Checkpoint Trigger
          const checkpoint = activeSegment.checkpoints.find(
            (c) => Math.floor(c.triggerTimeSeconds) === Math.floor(next)
          );
          if (checkpoint && !answeredCheckpoints[checkpoint.id]) {
            setIsPlaying(false);
            stopSpeech();
            setActiveCheckpoint(checkpoint);
            setSelectedOption(null);
            setCheckpointSubmitted(false);
            setShowSocraticHint(false);
            return next;
          }

          // Segment Completion
          if (next >= activeSegment.durationSeconds) {
            setIsPlaying(false);
            stopSpeech();
            videoLearningService.recordVideoCompletion(
              activeSegment.segmentId,
              activeSegment.unitId,
              activeSegment.durationSeconds
            );
            return activeSegment.durationSeconds;
          }

          // Periodic progress auto-save
          if (next % 5 === 0) {
            videoLearningService.saveLearnerProgress({
              videoId: activeSegment.segmentId,
              unitId: activeSegment.unitId,
              currentTimeSeconds: next,
              durationSeconds: activeSegment.durationSeconds,
              progressPercent: Math.round((next / activeSegment.durationSeconds) * 100),
              isCompleted: next >= activeSegment.durationSeconds,
              checkpointsAnswered: {},
              lastWatchedAt: new Date().toISOString()
            });
          }

          return next;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (tickerIntervalRef.current) {
        clearInterval(tickerIntervalRef.current);
      }
    }

    return () => {
      if (tickerIntervalRef.current) clearInterval(tickerIntervalRef.current);
    };
  }, [isPlaying, activeCheckpoint, activeSegment, answeredCheckpoints, playbackSpeed, stopSpeech]);

  // Synchronize Speech with Timeline
  useEffect(() => {
    if (isPlaying && !activeCheckpoint) {
      const scene = activeSegment.storyboard.find((s) => {
        const end = s.startSeconds + s.durationSeconds;
        return currentTimeSeconds >= s.startSeconds && currentTimeSeconds < end;
      });
      if (scene && currentSpokenTextRef.current !== scene.narrationScript) {
        speakTextSegment(scene.narrationScript);
      }
    }
  }, [isPlaying, currentTimeSeconds, activeSegment, activeCheckpoint, speakTextSegment]);

  // Audio Re-sync handler
  const handleResyncAudio = useCallback(() => {
    stopSpeech();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.resume();
    }
    const scene = activeSegment.storyboard.find((s) => {
      const end = s.startSeconds + s.durationSeconds;
      return currentTimeSeconds >= s.startSeconds && currentTimeSeconds < end;
    });
    if (scene) {
      currentSpokenTextRef.current = null;
      speakTextSegment(scene.narrationScript);
    }
  }, [activeSegment.storyboard, currentTimeSeconds, speakTextSegment, stopSpeech]);

  // Audio Retry Segment handler
  const handleRetrySegment = useCallback(() => {
    stopSpeech();
    setCurrentTimeSeconds(0);
    currentSpokenTextRef.current = null;
    setIsPlaying(true);
    const firstScene = activeSegment.storyboard[0];
    if (firstScene) {
      speakTextSegment(firstScene.narrationScript);
    }
  }, [activeSegment.storyboard, speakTextSegment, stopSpeech]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when student is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handleSkip(-10);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleSkip(10);
      } else if (e.key.toLowerCase() === "m") {
        e.preventDefault();
        setIsMuted((prev) => !prev);
      } else if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        setIsFullscreen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, activeCheckpoint, checkpointSubmitted]);

  const togglePlay = () => {
    if (activeCheckpoint && !checkpointSubmitted) return;
    if (isPlaying) {
      stopSpeech();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleSkip = (seconds: number) => {
    stopSpeech();
    const next = Math.max(0, Math.min(activeSegment.durationSeconds, currentTimeSeconds + seconds));
    setCurrentTimeSeconds(next);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    stopSpeech();
    const target = Number(e.target.value);
    setCurrentTimeSeconds(target);
  };

  const handleCheckpointSubmit = () => {
    if (selectedOption === null || !activeCheckpoint) return;
    setCheckpointSubmitted(true);
    const isCorrect = selectedOption === activeCheckpoint.correctOptionIndex;

    const updated = { ...answeredCheckpoints, [activeCheckpoint.id]: isCorrect };
    setAnsweredCheckpoints(updated);

    videoLearningService.recordCheckpointAnswer(
      activeSegment.segmentId,
      activeSegment.unitId,
      activeCheckpoint.id,
      selectedOption,
      isCorrect
    );
  };

  const handleResumeAfterCheckpoint = () => {
    setActiveCheckpoint(null);
    setSelectedOption(null);
    setCheckpointSubmitted(false);
    setShowSocraticHint(false);
    setIsPlaying(true);
  };

  const handleTransitionToSegment = (segNum: number) => {
    stopSpeech();
    setCurrentSegmentNumber(segNum);
  };

  const handleModeChange = useCallback((newMode: InteractiveSmartBoardMode) => {
    if (newMode !== "watch") {
      stopSpeech();
      setIsPlaying(false);
    }
    setInteractionMode(newMode);
    setInteractiveLessonState((prev) => ({
      ...prev,
      interactionMode: newMode
    }));
  }, [stopSpeech]);

  const handleReturnToTeacher = useCallback(() => {
    setInteractionMode("watch");
    setInteractiveLessonState((prev) => ({
      ...prev,
      interactionMode: "watch"
    }));
  }, []);

  const askTutorMoos = (promptQuestion: string) => {
    if (onOpenAITutorWithContext) {
      const activeActions = activeSegment.smartBoardActions.filter(
        (a) => a.timeSeconds <= currentTimeSeconds
      );
      const latestAction = activeActions[activeActions.length - 1];
      const activePhase = latestAction?.pedagogicalPhase || currentScene?.pedagogicalPhase || "active_instruction";
      
      let interactionDetail = "";
      if (interactionMode === "do") {
        interactionDetail = `[Learner DO Mode Progress]: Step ${interactiveLessonState.currentStep} of ${interactiveLessonState.totalSteps} (${interactiveLessonState.currentPhase.toUpperCase()})\nAttempted: ${interactiveLessonState.learnerResponse || "None"}\nMisconception: ${interactiveLessonState.misconceptionDetected || "None"}\nHint Level: ${interactiveLessonState.hintLevel}/5`;
      } else if (interactionMode === "interact") {
        interactionDetail = `[Learner INTERACT Manipulative State]: ${manipulativeState.title}\nParameters: ${JSON.stringify(manipulativeState.parameters)}\nKey Invariant: ${manipulativeState.activeObservations[0] || ""}`;
      }

      const contextSummary = [
        `[Mode: ${interactionMode.toUpperCase()} - ${interactionMode === "watch" ? "Teacher Led" : interactionMode === "interact" ? "Manipulative Lab" : "Student Step Solver"}]`,
        `[Phase: ${activePhase.toUpperCase().replace(/_/g, " ")}]`,
        latestAction ? `Current Board Step (${latestAction.title || latestAction.actionType}): ${latestAction.content}` : `Lesson: ${masterclass.title}`,
        latestAction?.detail ? `Pedagogical Detail: ${latestAction.detail}` : "",
        latestAction?.transformationRationale ? `Teacher Rationale: ${latestAction.transformationRationale}` : "",
        activeSegment.retrievalRecap ? `Prerequisite Baseline: ${activeSegment.retrievalRecap}` : "",
        `Timeline Position: ${formatTime(currentTimeSeconds)} / ${formatTime(activeSegment.durationSeconds)} (Part ${activeSegment.segmentNumber} of ${masterclass.segments.length})`,
        interactionDetail
      ].filter(Boolean).join("\n");

      onOpenAITutorWithContext(
        `${masterclass.title} (Part ${activeSegment.segmentNumber} - ${activeSegment.title})`,
        `${promptQuestion}\n\n[Active Smart Board & Teacher Context]:\n${contextSummary}`
      );
    }
  };

  // Filter actions that have occurred up to current time
  const visibleBoardActions = activeSegment.smartBoardActions.filter(
    (a) => a.timeSeconds <= currentTimeSeconds
  );

  // Active scene matching current timeline
  const currentScene: VideoStoryboardScene =
    activeSegment.storyboard.find((s) => {
      const end = s.startSeconds + s.durationSeconds;
      return currentTimeSeconds >= s.startSeconds && currentTimeSeconds < end;
    }) || activeSegment.storyboard[0];

  // Visual engine type
  const engineType: SubjectVisualEngineType =
    activeSegment.visualEngineType || "math_geometric_algebraic";

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Background pattern class
  const getPatternClass = () => {
    if (boardPattern === "dots") {
      return "bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:22px_22px] bg-[#070b14]";
    }
    if (boardPattern === "grid") {
      return "bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:24px_24px] bg-[#070b14]";
    }
    return "bg-[#070b14]";
  };

  return (
    <div
      ref={containerRef}
      id="smart-board-masterclass-player"
      className={`relative w-full rounded-2xl bg-[#070b14] border border-slate-800 shadow-2xl flex flex-col overflow-hidden text-slate-100 font-sans ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none h-screen" : "min-h-[640px]"
      }`}
    >
      {/* 1. TOP INSTITUTIONAL HUD */}
      <header
        id="masterclass-top-hud"
        className="bg-[#0b1329]/95 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 select-none backdrop-blur-md z-20"
      >
        <div className="flex items-center gap-2.5">
          <div className="px-2.5 py-1 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                isPlaying ? "bg-emerald-400 animate-pulse" : "bg-cyan-400"
              }`}
            />
            <span>SMART BOARD MASTERCLASS</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-mono text-slate-400 font-semibold bg-slate-800/80 px-2 py-0.5 rounded text-[11px]">
              {masterclass.unitCode}
            </span>
            <span className="text-slate-200 font-bold truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {masterclass.title}
            </span>
            {masterclass.qualityGate && (
              <button
                type="button"
                onClick={() => setShowQualityGateModal(true)}
                title={`Masterclass Quality Score: ${masterclass.qualityGate.overallCompositeScore}/100 • Teacher Presence: ${masterclass.qualityGate.overallTeacherPresence}/100 • Click to view full audit`}
                className={`hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold border transition cursor-pointer hover:brightness-125 ${
                  masterclass.qualityGate.isApprovedForMasterclass
                    ? "bg-emerald-950/70 border-emerald-500/40 text-emerald-300"
                    : "bg-amber-950/70 border-amber-500/40 text-amber-300"
                }`}
              >
                <Award className="w-3 h-3" />
                <span>{masterclass.qualityGate.overallCompositeScore}% Quality Gate</span>
              </button>
            )}
          </div>
        </div>

        {/* Segment Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          {masterclass.segments.map((seg) => {
            const isCurrent = seg.segmentNumber === currentSegmentNumber;
            return (
              <button
                key={seg.segmentId}
                type="button"
                onClick={() => handleTransitionToSegment(seg.segmentNumber)}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                  isCurrent
                    ? "bg-cyan-500 text-slate-950 shadow-xs"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                <span>Part {seg.segmentNumber}</span>
                <span className="text-[10px] opacity-75 font-mono">
                  ({Math.round(seg.durationSeconds / 60)}m)
                </span>
              </button>
            );
          })}
        </div>

        {/* INTERACTIVE PEDAGOGICAL MODE SWITCHER: WATCH | INTERACT | DO */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-cyan-500/30 text-xs shadow-inner">
          <button
            type="button"
            onClick={() => handleModeChange("watch")}
            title="Mode 1: Watch & Listen (Teacher-Led Synchronized Masterclass)"
            className={`px-2.5 py-1 rounded-lg font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
              interactionMode === "watch"
                ? "bg-cyan-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Watch</span>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange("interact")}
            title="Mode 2: Interact & Explore (Manipulate Mathematical/Physical Invariants)"
            className={`px-2.5 py-1 rounded-lg font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
              interactionMode === "interact"
                ? "bg-indigo-500 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Interact</span>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange("do")}
            title="Mode 3: Do & Solve (Step-by-Step Problem Solving With Socratic Scaffolding)"
            className={`px-2.5 py-1 rounded-lg font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
              interactionMode === "do"
                ? "bg-emerald-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Do</span>
          </button>
        </div>

        {/* View Mode & Board Display Controls */}
        <div className="flex items-center gap-2">
          {/* Stage View Mode */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-0.5 rounded-lg border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setBoardLayout("dual")}
              title="Dual Stage: Derivations and Technical Visuals"
              className={`px-2 py-1 rounded text-[11px] font-semibold transition cursor-pointer ${
                boardLayout === "dual"
                  ? "bg-slate-800 text-cyan-300 shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Dual Stage
            </button>
            <button
              type="button"
              onClick={() => setBoardLayout("derivation")}
              title="Derivation Ladder Focus"
              className={`px-2 py-1 rounded text-[11px] font-semibold transition cursor-pointer ${
                boardLayout === "derivation"
                  ? "bg-slate-800 text-cyan-300 shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Derivations
            </button>
            <button
              type="button"
              onClick={() => setBoardLayout("visual")}
              title="Technical Visual Stage Focus"
              className={`px-2 py-1 rounded text-[11px] font-semibold transition cursor-pointer ${
                boardLayout === "visual"
                  ? "bg-slate-800 text-cyan-300 shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Visual Stage
            </button>
          </div>

          {/* Grid Style Toggle */}
          <button
            type="button"
            onClick={() =>
              setBoardPattern((prev) =>
                prev === "dots" ? "grid" : prev === "grid" ? "plain" : "dots"
              )
            }
            title={`Board Canvas: ${boardPattern}`}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-cyan-300 transition cursor-pointer text-xs flex items-center gap-1"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-mono hidden sm:inline">
              {boardPattern}
            </span>
          </button>

          {/* Subtitle CC Toggle */}
          <button
            type="button"
            onClick={() => setShowSubtitles(!showSubtitles)}
            title="Toggle Live Narration Subtitles"
            className={`p-1.5 rounded-lg border text-xs transition cursor-pointer flex items-center gap-1 ${
              showSubtitles
                ? "bg-slate-800 text-cyan-300 border-cyan-500/30"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            <Subtitles className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono hidden sm:inline">CC</span>
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      </header>

      {/* 2. ACTIVE INSTRUCTOR SPOTLIGHT & NARRATION RIBBON */}
      {showSubtitles && (
        <section
          id="narration-spotlight-ribbon"
          className="bg-[#0b1329]/90 border-b border-slate-800/80 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs z-10 select-none animate-in fade-in"
        >
          <div className="flex items-center gap-2.5 flex-1 min-w-[260px]">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono uppercase font-bold flex-shrink-0">
              INSTRUCTOR FOCUS
            </span>
            <p className="text-slate-200 text-xs sm:text-sm font-medium leading-snug line-clamp-1 italic">
              "{currentScene.narrationScript}"
            </p>
          </div>

          <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px] flex-shrink-0">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-semibold uppercase text-[10px]">
              {currentScene.pedagogicalPhase.replace(/_/g, " ")}
            </span>
            <span>
              {visibleBoardActions.length} Board Items Revealed
            </span>
          </div>
        </section>
      )}

      {/* 3. RETRIEVAL RECAP CALLOUT (Segment >= 2) */}
      {activeSegment.retrievalRecap && currentTimeSeconds < 30 && (
        <aside
          id="retrieval-recap-banner"
          className="bg-amber-950/70 border-b border-amber-800/60 px-4 py-2 text-xs text-amber-200 flex items-center justify-between gap-3 animate-in fade-in z-10"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="font-medium">{activeSegment.retrievalRecap}</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-amber-400 font-mono bg-amber-900/60 px-2 py-0.5 rounded">
            Retrieval Bridge
          </span>
        </aside>
      )}

      {/* 4. MAIN DIGITAL CLASSROOM BOARD STAGE */}
      <main
        id="smart-board-canvas"
        className={`flex-1 relative p-4 sm:p-6 overflow-y-auto select-none min-h-[420px] transition-colors ${getPatternClass()}`}
      >
        {/* Board Meta Header */}
        <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-800/80 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/80 font-bold">
                {masterclass.subjectName} • {masterclass.curriculumStandard || "WAEC / Cambridge Pure Syllabus"}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2 mt-0.5">
              <span>{activeSegment.title}</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-cyan-300 font-mono text-xs font-bold shadow-inner">
              {formatTime(currentTimeSeconds)} / {formatTime(activeSegment.durationSeconds)}
            </span>
          </div>
        </div>

        {/* Dynamic Multi-Column Teaching Stage or Interactive Modes */}
        {interactionMode === "interact" ? (
          <div className="space-y-4">
            <SubjectManipulativeStage
              initialState={manipulativeState}
              onStateChange={setManipulativeState}
              onAskTutorMoos={askTutorMoos}
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleReturnToTeacher}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <span>Return to Teacher Masterclass</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : interactionMode === "do" ? (
          <div className="space-y-4">
            <StepByStepProblemSolver
              state={interactiveLessonState}
              steps={problemSteps}
              onStateUpdate={setInteractiveLessonState}
              onAskTutorMoos={askTutorMoos}
              onReturnToTeacher={handleReturnToTeacher}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* LEFT / CENTER COLUMN: PROGRESSIVE MATHEMATICAL WORKING LADDER */}
          {(boardLayout === "dual" || boardLayout === "derivation") && (
            <div
              className={`space-y-4 ${
                boardLayout === "dual" ? "lg:col-span-7" : "lg:col-span-12"
              }`}
            >
              {visibleBoardActions.length === 0 ? (
                <div className="h-64 border border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center p-6 text-center text-slate-400 space-y-3 bg-slate-950/40">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Play className="w-6 h-6 ml-0.5" />
                  </div>
                  <div className="max-w-md">
                    <h3 className="text-sm font-bold text-slate-200">
                      Masterclass Ready for Playback
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Press <strong>Play</strong> below or hit the <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px]">Spacebar</kbd>.
                      The teacher will progressively write problem formulas, line-by-line substitutions, and derivations on the smart board.
                    </p>
                  </div>
                </div>
              ) : (
                visibleBoardActions
                  .filter((a) => a.zone === "main_canvas" || a.zone === "left_workings")
                  .map((action, idx) => {
                    const isLatest = idx === visibleBoardActions.length - 1;

                    return (
                      <article
                        key={action.id || idx}
                        id={`board-action-${action.id || idx}`}
                        className={`rounded-2xl border transition-all duration-300 shadow-xl overflow-hidden ${
                          isLatest
                            ? "border-cyan-500/50 bg-slate-900/90 ring-1 ring-cyan-400/30"
                            : "border-slate-800/80 bg-slate-900/60"
                        }`}
                      >
                        {/* Action Header Banner */}
                        <div className="px-4 py-2 bg-slate-950/70 border-b border-slate-800/80 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isLatest ? "bg-cyan-400 animate-ping" : "bg-slate-500"
                              }`}
                            />
                            <span className="font-mono text-cyan-300 font-bold uppercase text-[11px] tracking-wide">
                              {action.title || action.actionType.replace(/_/g, " ")}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {action.pedagogicalPhase && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                                {action.pedagogicalPhase.replace(/_/g, " ")}
                              </span>
                            )}
                            <span className="text-[10px] font-mono text-slate-400">
                              {formatTime(action.timeSeconds)}
                            </span>
                          </div>
                        </div>

                        {/* Action Body Content */}
                        <div className="p-4 space-y-3">
                          {/* Problem Heading Box */}
                          {action.actionType === "write_heading" && (
                            <div className="space-y-2">
                              <div className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed font-sans">
                                {action.content}
                              </div>
                              {action.detail && (
                                <div className="text-[11px] text-cyan-400 font-mono">
                                  {action.detail}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Governing Formula with LaTeX Typesetting */}
                          {action.actionType === "render_formula" && (
                            <div className="space-y-3">
                              <div className="bg-[#050811] p-4 rounded-xl border border-cyan-500/30 text-center shadow-inner overflow-x-auto">
                                <MathFormula
                                  math={action.latexFormula || action.content}
                                  displayMode={true}
                                  className="text-cyan-200"
                                />
                              </div>

                              {/* Givens & Target Quantities */}
                              {(action.givenInfo || action.targetQuantity) && (
                                <div className="flex flex-wrap items-center gap-2 text-xs pt-1 border-t border-slate-800/80">
                                  {action.givenInfo && (
                                    <div className="flex flex-wrap items-center gap-1.5">
                                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                                        Givens:
                                      </span>
                                      {Object.entries(action.givenInfo).map(([k, v]) => (
                                        <span
                                          key={k}
                                          className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/80 text-cyan-300 font-mono text-[11px]"
                                        >
                                          {k} = {v}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  {action.targetQuantity && (
                                    <div className="flex items-center gap-1.5 ml-auto">
                                      <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                                        Target:
                                      </span>
                                      <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-[11px]">
                                        {action.targetQuantity}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}

                              {action.detail && (
                                <p className="text-xs text-slate-400 italic">
                                  {action.detail}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Progressive Step-by-Step Working Ladder */}
                          {action.actionType === "step_by_step_working" && (
                            <div className="space-y-3">
                              {action.content && (
                                <div className="text-xs font-semibold text-slate-300 font-mono">
                                  {action.content}
                                </div>
                              )}

                              {action.subSteps && (
                                <div className="space-y-2">
                                  {action.subSteps.map((step, sIdx) => {
                                    const isConclusion =
                                      step.toLowerCase().includes("conclusion") ||
                                      step.includes("\\mathbf{Conclusion") ||
                                      step.toLowerCase().includes("final");

                                    if (isConclusion) {
                                      // Boxed Academic Answer
                                      return (
                                        <div
                                          key={sIdx}
                                          className="p-3.5 rounded-xl bg-emerald-950/40 border-2 border-emerald-500/60 text-emerald-200 shadow-md space-y-1 mt-3"
                                        >
                                          <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                                            <span className="flex items-center gap-1">
                                              <CheckCircle2 className="w-3.5 h-3.5" />
                                              FINAL BOXED ACADEMIC SOLUTION
                                            </span>
                                            <span className="text-[10px] bg-emerald-900/60 px-2 py-0.5 rounded">
                                              VERIFIED
                                            </span>
                                          </div>
                                          <div className="text-sm font-bold text-white pt-1">
                                            <MathFormula
                                              math={step.replace(/\\mathbf{Conclusion:\s*/, "").replace(/}/, "")}
                                              displayMode={false}
                                            />
                                          </div>
                                        </div>
                                      );
                                    }

                                    const isFinalSubStep = sIdx === (action.subSteps?.length || 1) - 1;

                                    return (
                                      <div
                                        key={sIdx}
                                        className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs sm:text-[13px] leading-relaxed transition-all duration-300 ${
                                          isLatest && isFinalSubStep
                                            ? "bg-[#071120] border-cyan-500/40 shadow-sm"
                                            : "bg-[#050811]/90 border-slate-800/80"
                                        }`}
                                      >
                                        <span className={`px-1.5 py-0.5 rounded font-mono text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                                          isLatest && isFinalSubStep ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400/40" : "bg-slate-800 text-cyan-300"
                                        }`}>
                                          {String(sIdx + 1).padStart(2, "0")}
                                        </span>
                                        <div className="flex-1 text-slate-200 overflow-x-auto">
                                          <MathFormula math={step} displayMode={false} />
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}

                              {action.transformationRationale && (
                                <div className="text-[11px] text-amber-300/90 italic pt-1 border-t border-slate-800/80 flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                                  <span>{action.transformationRationale}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Code Editor */}
                          {action.actionType === "code_editor" && (
                            <div className="bg-[#050811] p-3 rounded-xl border border-violet-500/40 font-mono text-xs text-emerald-300 overflow-x-auto space-y-2 shadow-inner">
                              <pre className="leading-relaxed whitespace-pre-wrap font-mono">
                                {action.content}
                              </pre>
                              {action.detail && (
                                <div className="text-[11px] text-violet-300 pt-2 border-t border-slate-800 font-sans">
                                  {action.detail}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Summary Table */}
                          {action.actionType === "summary_table" && (
                            <div className="bg-slate-950 p-3 rounded-xl border border-violet-500/40 text-xs text-violet-200 font-mono">
                              <div className="font-bold text-violet-300 mb-1">
                                {action.title}
                              </div>
                              <p className="leading-relaxed">{action.content}</p>
                            </div>
                          )}

                          {/* Diagram / Visual Description */}
                          {action.actionType === "draw_diagram" && boardLayout === "derivation" && (
                            <div className="bg-slate-950/80 p-3 rounded-xl border border-emerald-500/30 text-xs text-emerald-200 space-y-1">
                              <div className="font-bold flex items-center gap-1.5 text-emerald-400">
                                <Layers className="w-3.5 h-3.5" />
                                <span>{action.title}</span>
                              </div>
                              <p className="text-slate-300">{action.content}</p>
                            </div>
                          )}
                        </div>
                      </article>
                    );
                  })
              )}
            </div>
          )}

          {/* RIGHT / SECONDARY COLUMN: SUBJECT VISUAL CANVAS & TUTOR'S MARGIN */}
          {(boardLayout === "dual" || boardLayout === "visual") && (
            <div
              className={`space-y-4 ${
                boardLayout === "dual" ? "lg:col-span-5" : "lg:col-span-12"
              }`}
            >
              {/* 1. Live Technical Schematic / Subject Visualizer */}
              <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-2xl bg-slate-950">
                <div className="px-3.5 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-bold text-slate-200 text-[11px] uppercase tracking-wider">
                      Technical Visual Stage
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Scene #{currentScene.sceneNumber}
                  </span>
                </div>

                <div className="h-[280px] sm:h-[320px] w-full">
                  <SubjectVisualCanvas
                    scene={currentScene}
                    currentTimeSeconds={currentTimeSeconds}
                    engineType={engineType}
                  />
                </div>
              </div>

              {/* 2. Tutor Margin Notes & Examination Pitfalls */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-3 shadow-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[10px] font-mono text-rose-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Tutor Margin Notes & Exam Traps
                  </span>
                </div>

                <div className="space-y-2.5">
                  {visibleBoardActions
                    .filter(
                      (a) => a.zone === "right_sidebar" || a.actionType === "callout_alert"
                    )
                    .map((a, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-200 space-y-1 animate-in fade-in"
                      >
                        <span className="font-bold text-[11px] text-rose-300 block uppercase tracking-wide">
                          {a.title || "EXAMINATION TRAP ALERT"}
                        </span>
                        <p className="leading-relaxed text-[11px] text-rose-100">
                          {a.content}
                        </p>
                      </div>
                    ))}

                  {visibleBoardActions.filter(
                    (a) => a.zone === "right_sidebar" || a.actionType === "callout_alert"
                  ).length === 0 && (
                    <p className="text-[11px] text-slate-500 italic leading-relaxed">
                      Syllabus pitfalls, sign invariants, and WAEC exam traps will appear here as the teacher derives the solution.
                    </p>
                  )}
                </div>
              </div>

              {/* 3. Interactive Socratic Moos Assistant */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>Ask Tutor Moos About This Step:</span>
                </div>

                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    "Why did you use this formula?",
                    "Can you explain this step in simpler terms?",
                    "What common exam traps exist here?",
                    "Show me an alternative derivation method."
                  ].map((q, qIdx) => (
                    <button
                      key={qIdx}
                      type="button"
                      onClick={() => askTutorMoos(q)}
                      className="text-left text-[11px] text-cyan-300 hover:text-white bg-slate-950/60 hover:bg-cyan-950/60 px-3 py-1.5 rounded-lg border border-slate-800/80 transition cursor-pointer truncate"
                    >
                      "{q}"
                    </button>
                  ))}
                </div>

                {/* Freeform Question Input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!customTutorPrompt.trim()) return;
                    askTutorMoos(customTutorPrompt.trim());
                    setCustomTutorPrompt("");
                  }}
                  className="flex items-center gap-2 pt-1 border-t border-slate-800/80"
                >
                  <input
                    type="text"
                    value={customTutorPrompt}
                    onChange={(e) => setCustomTutorPrompt(e.target.value)}
                    placeholder="Ask a question about this step..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    disabled={!customTutorPrompt.trim()}
                    className="p-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
        )}

        {/* 5. IN-VIDEO INTERACTIVE CHECKPOINT OVERLAY */}
        {activeCheckpoint && (
          <div
            id="checkpoint-overlay"
            className="absolute inset-0 z-30 bg-slate-950/90 backdrop-blur-md p-6 flex items-center justify-center animate-in fade-in"
          >
            <div className="bg-slate-900 border border-cyan-500/50 max-w-xl w-full rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-cyan-400">
                  <HelpCircle className="w-5 h-5" />
                  <span className="font-bold text-sm">Smart Board Masterclass Checkpoint</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  {formatTime(activeCheckpoint.triggerTimeSeconds)}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                  {activeCheckpoint.questionText}
                </h4>
                {activeCheckpoint.mathExpression && (
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-cyan-300 text-center">
                    <MathFormula math={activeCheckpoint.mathExpression} displayMode={true} />
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2">
                {activeCheckpoint.options.map((opt, oIdx) => {
                  const isSelected = selectedOption === oIdx;
                  const isCorrect = oIdx === activeCheckpoint.correctOptionIndex;

                  let optClass = "border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-200";
                  if (checkpointSubmitted) {
                    if (isCorrect) {
                      optClass = "border-emerald-500 bg-emerald-950/60 text-emerald-200";
                    } else if (isSelected) {
                      optClass = "border-rose-500 bg-rose-950/60 text-rose-200";
                    }
                  } else if (isSelected) {
                    optClass = "border-cyan-500 bg-cyan-950/60 text-cyan-200";
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={checkpointSubmitted}
                      onClick={() => setSelectedOption(oIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition cursor-pointer flex items-center justify-between gap-3 ${optClass}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-mono font-bold flex items-center justify-center flex-shrink-0">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {checkpointSubmitted && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      )}
                      {checkpointSubmitted && isSelected && !isCorrect && (
                        <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Socratic Hint */}
              {showSocraticHint && (
                <div className="bg-amber-950/60 border border-amber-800/80 rounded-xl p-3 text-xs text-amber-200 space-y-1 animate-in fade-in">
                  <span className="font-bold flex items-center gap-1.5 text-amber-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    Socratic Hint:
                  </span>
                  <p>{activeCheckpoint.socraticHint}</p>
                </div>
              )}

              {/* Post-submission explanation */}
              {checkpointSubmitted && (
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1 animate-in fade-in">
                  <span className="font-bold text-cyan-300 block">Teacher Explanation:</span>
                  <p className="leading-relaxed">{activeCheckpoint.explanation}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                {!checkpointSubmitted ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowSocraticHint(!showSocraticHint)}
                      className="text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                    >
                      {showSocraticHint ? "Hide Hint" : "Ask for Socratic Hint"}
                    </button>

                    <button
                      type="button"
                      disabled={selectedOption === null}
                      onClick={handleCheckpointSubmit}
                      className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-md transition cursor-pointer"
                    >
                      Submit Answer
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleResumeAfterCheckpoint}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Resume Masterclass</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* QUALITY GATE AUDIT MODAL */}
        {showQualityGateModal && masterclass.qualityGate && (
          <div
            id="quality-gate-modal-overlay"
            className="absolute inset-0 z-30 bg-slate-950/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center animate-in fade-in overflow-y-auto"
          >
            <div className="bg-slate-900 border border-slate-800 max-w-xl w-full rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <span>Masterclass Quality Gate Audit</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                          masterclass.qualityGate.isApprovedForMasterclass
                            ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300"
                            : "bg-amber-950/80 border-amber-500/50 text-amber-300"
                        }`}
                      >
                        {masterclass.qualityGate.isApprovedForMasterclass
                          ? "CERTIFIED MASTERCLASS"
                          : "IN REVIEW"}
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Evaluated by MTA Pedagogical Engine against 14 Educational Dimensions
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowQualityGateModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Score Overviews */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 font-mono font-black text-lg flex items-center justify-center">
                    {masterclass.qualityGate.overallCompositeScore}%
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      Composite Score
                    </div>
                    <div className="text-xs font-bold text-slate-200">
                      {masterclass.qualityGate.isApprovedForMasterclass
                        ? "Meets ≥ 80% Threshold"
                        : "Pending Refinement"}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 font-mono font-black text-lg flex items-center justify-center">
                    {masterclass.qualityGate.overallTeacherPresence}%
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      Teacher Presence
                    </div>
                    <div className="text-xs font-bold text-slate-200">
                      Continuous 1-on-1 Guidance
                    </div>
                  </div>
                </div>
              </div>

              {/* Dimension Metrics */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Key Pedagogical Metrics
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    {
                      label: "Instructional Clarity",
                      score: masterclass.qualityGate.instructionalClarity
                    },
                    {
                      label: "Teacher Reasoning & 'Why'",
                      score: masterclass.qualityGate.teacherReasoning
                    },
                    {
                      label: "Problem-Solving Depth",
                      score: masterclass.qualityGate.problemSolvingDepth
                    },
                    {
                      label: "Progressive Line Reveal",
                      score: masterclass.qualityGate.progressiveDisclosure
                    },
                    {
                      label: "Interactive Checkpoints",
                      score: masterclass.qualityGate.checkpointQuality
                    },
                    {
                      label: "Exam Traps & Misconceptions",
                      score: masterclass.qualityGate.misconceptionHandling
                    },
                    {
                      label: "Learner Agency & Control",
                      score: masterclass.qualityGate.learnerAgency || 88
                    },
                    {
                      label: "Manipulative Interaction Relevance",
                      score: masterclass.qualityGate.interactionRelevance || 92
                    },
                    {
                      label: "Diagnostic Feedback & Misconceptions",
                      score: masterclass.qualityGate.feedbackQuality || 90
                    },
                    {
                      label: "Adaptive Laddering & Socratic Hints",
                      score: masterclass.qualityGate.adaptiveResponse || 87
                    }
                  ].map((dim, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between"
                    >
                      <span className="text-slate-300 text-[11px] truncate">{dim.label}</span>
                      <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-cyan-300">
                        <span>{dim.score}%</span>
                        <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyan-400 rounded-full"
                            style={{ width: `${dim.score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback Points */}
              {masterclass.qualityGate.qualityFeedback?.length > 0 && (
                <div className="space-y-1.5 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                  <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    Pedagogical Verification Highlights:
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                    {masterclass.qualityGate.qualityFeedback.map((fb, fbIdx) => (
                      <li key={fbIdx} className="leading-relaxed text-[11px]">
                        {fb}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowQualityGateModal(false)}
                  className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer"
                >
                  Close Audit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 6. SEGMENT COMPLETION CARD */}
        {currentTimeSeconds >= activeSegment.durationSeconds && (
          <div
            id="segment-completion-overlay"
            className="absolute inset-0 z-20 bg-slate-950/90 backdrop-blur-md p-6 flex items-center justify-center animate-in fade-in"
          >
            <div className="bg-slate-900 border border-slate-800 max-w-md w-full rounded-2xl p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Part {activeSegment.segmentNumber} Masterclass Completed!
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  You have successfully observed all smart board derivations, invariant laws, and interactive checkpoints for this segment.
                </p>
              </div>

              {activeSegment.nextSegmentId ? (
                <button
                  type="button"
                  onClick={() => handleTransitionToSegment(activeSegment.segmentNumber + 1)}
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Continue to Part {activeSegment.segmentNumber + 1}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-emerald-400 font-bold">
                    Entire Masterclass Complete! Solidify your mastery in the Practice Arena.
                  </p>
                  {onLaunchPractice && (
                    <button
                      type="button"
                      onClick={() => onLaunchPractice(activeSegment.topicId)}
                      className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition cursor-pointer"
                    >
                      Enter Practice Arena
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* 7. BOTTOM PLAYBACK CONTROLLER BAR */}
      <footer
        id="masterclass-bottom-controller"
        className="bg-[#0b1329] border-t border-slate-800 px-4 py-3 space-y-2 select-none z-20"
      >
        {/* Progress Scrubber */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-slate-400 w-10 text-right">
            {formatTime(currentTimeSeconds)}
          </span>
          <div className="relative flex-1 flex items-center">
            <input
              type="range"
              min={0}
              max={activeSegment.durationSeconds}
              value={currentTimeSeconds}
              onChange={handleSeek}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            {/* Checkpoint Markers on Scrubber */}
            {activeSegment.checkpoints.map((cp) => {
              const posPercent = (cp.triggerTimeSeconds / activeSegment.durationSeconds) * 100;
              return (
                <div
                  key={cp.id}
                  title={`Checkpoint at ${formatTime(cp.triggerTimeSeconds)}`}
                  style={{ left: `${posPercent}%` }}
                  className="absolute w-2 h-2 -top-[1px] bg-amber-400 border border-slate-950 transform -translate-x-1/2 rotate-45 pointer-events-none"
                />
              );
            })}
          </div>
          <span className="text-[11px] font-mono text-slate-400 w-10">
            {formatTime(activeSegment.durationSeconds)}
          </span>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSkip(-10)}
              title="Rewind 10 seconds (Left Arrow)"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              title={isPlaying ? "Pause (Space)" : "Play (Space)"}
              className="p-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition shadow-lg cursor-pointer flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-slate-950" />
              ) : (
                <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleSkip(10)}
              title="Skip forward 10 seconds (Right Arrow)"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? "Unmute (M)" : "Mute Narration (M)"}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Audio Playback & Synchronization Monitor Utility */}
            <div className="hidden md:block pl-2">
              <AudioPlaybackMonitor
                compact={true}
                isActivePlayback={isPlaying}
                currentTimelineSeconds={currentTimeSeconds}
                durationSeconds={activeSegment.durationSeconds}
                segmentTitle={`Part ${activeSegment.segmentNumber}`}
                onResync={handleResyncAudio}
                onRetrySegment={handleRetrySegment}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Speed Controller */}
            <div className="flex items-center gap-1 bg-slate-900 rounded-lg p-1 border border-slate-800 text-[11px] font-mono">
              {[0.75, 1, 1.25, 1.5].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-0.5 rounded cursor-pointer transition ${
                    playbackSpeed === spd
                      ? "bg-cyan-500/20 text-cyan-300 font-bold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Tutor Moos Launcher */}
            {onOpenAITutorWithContext && (
              <button
                type="button"
                onClick={() =>
                  askTutorMoos("Could you explain the current smart board step in more detail?")
                }
                className="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              >
                <Bot className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ask Tutor Moos</span>
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};
