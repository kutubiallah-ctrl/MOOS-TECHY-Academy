import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Award,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  BookOpen
} from "lucide-react";
import {
  CurriculumVideoResource,
  VideoCheckpointQuestion,
  VideoTranscriptSegment,
  SubjectVisualEngineType
} from "../types/videoLearning";
import { videoLearningService } from "../services/videoLearningService";
import { mathematicalSpeechService } from "../services/mathematicalSpeechService";
import { SubjectVisualCanvas } from "./video/SubjectVisualCanvas";

export interface VideoExplanationPlayerProps {
  src?: string;
  videoResource?: CurriculumVideoResource;
  title?: string;
  subjectName?: string;
  transcript?: VideoTranscriptSegment[];
  checkpoints?: VideoCheckpointQuestion[];
  onLaunchPractice?: () => void;
  onOpenAITutorWithContext?: (topic: string, prompt: string) => void;
  onClose?: () => void;
}

export const VideoExplanationPlayer: React.FC<VideoExplanationPlayerProps> = ({
  src,
  videoResource,
  title,
  subjectName,
  transcript,
  checkpoints,
  onLaunchPractice,
  onOpenAITutorWithContext,
  onClose
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Derive consolidated metadata
  const effectiveTitle = title || videoResource?.title || "Curriculum Visual Explanation";
  const effectiveSubject = subjectName || videoResource?.subjectName || "MOOS Academy";
  const effectiveTranscript = transcript || videoResource?.transcript || [];
  const effectiveCheckpoints = checkpoints || videoResource?.checkpoints || [];
  const effectiveVideoId = videoResource?.id || "custom-video-stream";
  const totalDurationFallback = videoResource?.durationSeconds || 360;

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(totalDurationFallback);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  // Checkpoint modal state
  const [activeCheckpoint, setActiveCheckpoint] = useState<VideoCheckpointQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [checkpointSubmitted, setCheckpointSubmitted] = useState(false);
  const [showSocraticHint, setShowSocraticHint] = useState(false);
  const [answeredCheckpoints, setAnsweredCheckpoints] = useState<Record<string, boolean>>({});

  // Synthetic animation timer fallback when no video media stream exists
  const syntheticTimerRef = useRef<number | null>(null);
  const lastWallClockTimeRef = useRef<number | null>(null);
  const keepAliveTimerRef = useRef<number | null>(null);
  const activeUtteranceQueueRef = useRef<string[]>([]);
  const isUtteringRef = useRef<boolean>(false);
  const currentSpokenTextRef = useRef<string | null>(null);
  const hasRealSrc = Boolean(src || videoResource?.assetUrl);

  // Load saved progress on mount
  useEffect(() => {
    if (videoResource?.id) {
      const savedProgress = videoLearningService.getLearnerProgress(videoResource.id);
      if (savedProgress) {
        if (savedProgress.currentTimeSeconds < (videoResource.durationSeconds - 5)) {
          setCurrentTime(savedProgress.currentTimeSeconds);
          if (videoRef.current) {
            videoRef.current.currentTime = savedProgress.currentTimeSeconds;
          }
        }
        setIsCompleted(savedProgress.isCompleted);
        const answeredMap: Record<string, boolean> = {};
        Object.entries(savedProgress.checkpointsAnswered || {}).forEach(([id, data]) => {
          answeredMap[id] = data.isCorrect;
        });
        setAnsweredCheckpoints(answeredMap);
      }
    }
  }, [videoResource?.id]);

  // Robust keepalive heartbeat to prevent speech synthesis freeze in long-running videos (>4 mins)
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      keepAliveTimerRef.current = window.setInterval(() => {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 6000);
    }
    return () => {
      if (keepAliveTimerRef.current) {
        clearInterval(keepAliveTimerRef.current);
      }
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

  const speakSegmentText = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (!isPlaying || isMuted || hasRealSrc || activeCheckpoint) return;

    // Normalize mathematical notations (superscripts, fractions, radicals, quadratic terms)
    const normalizedSpokenText = mathematicalSpeechService.normalizeSpokenMathematics(text);

    // Break text into clean sentence units so utterance never exceeds browser watchdog buffer
    const sentences = normalizedSpokenText
      .split(/(?<=[.?!])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (sentences.length === 0) return;

    window.speechSynthesis.cancel();
    activeUtteranceQueueRef.current = sentences;
    isUtteringRef.current = true;
    currentSpokenTextRef.current = text;

    const speakNextChunk = () => {
      if (!isUtteringRef.current) return;
      if (activeUtteranceQueueRef.current.length === 0) {
        isUtteringRef.current = false;
        return;
      }

      const nextChunk = activeUtteranceQueueRef.current.shift();
      if (!nextChunk) return;

      const utterance = new SpeechSynthesisUtterance(nextChunk);
      utterance.rate = Math.max(0.85, Math.min(1.4, playbackRate));
      utterance.volume = volume;
      utterance.onend = () => {
        speakNextChunk();
      };
      utterance.onerror = (e) => {
        if (e.error !== "interrupted") {
          speakNextChunk();
        } else {
          isUtteringRef.current = false;
        }
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNextChunk();
  }, [isPlaying, isMuted, hasRealSrc, activeCheckpoint, playbackRate, volume]);

  // Spoken narration audio synchronization for synthetic masterclass mode
  useEffect(() => {
    if (!isPlaying || isMuted || hasRealSrc || activeCheckpoint) {
      stopSpeech();
      return;
    }

    const activeSeg = effectiveTranscript.find(
      (t) => currentTime >= t.startTimeSeconds && currentTime <= t.endTimeSeconds
    );

    if (activeSeg && activeSeg.text && activeSeg.text !== currentSpokenTextRef.current) {
      speakSegmentText(activeSeg.text);
    }
  }, [currentTime, isPlaying, isMuted, hasRealSrc, activeCheckpoint, effectiveTranscript, speakSegmentText, stopSpeech]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
      if (keepAliveTimerRef.current) clearInterval(keepAliveTimerRef.current);
    };
  }, [stopSpeech]);

  // Check if a checkpoint should trigger at the given second
  const checkCheckpointsAtTime = useCallback((timeInSeconds: number) => {
    const matchedCheckpoint = effectiveCheckpoints.find(
      (c) => Math.floor(c.triggerTimeSeconds) === Math.floor(timeInSeconds)
    );

    if (matchedCheckpoint && !answeredCheckpoints[matchedCheckpoint.id]) {
      // Pause HTML5 video element immediately
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
      stopSpeech();
      setIsPlaying(false);
      setActiveCheckpoint(matchedCheckpoint);
      setSelectedOption(null);
      setCheckpointSubmitted(false);
      setShowSocraticHint(false);
    }
  }, [effectiveCheckpoints, answeredCheckpoints, stopSpeech]);

  // Precision drift-free runner for diagram animation when real video file is offline
  useEffect(() => {
    if (!hasRealSrc && isPlaying && !activeCheckpoint) {
      lastWallClockTimeRef.current = performance.now();

      const intervalId = window.setInterval(() => {
        const now = performance.now();
        const deltaSeconds = ((now - (lastWallClockTimeRef.current || now)) / 1000) * playbackRate;
        lastWallClockTimeRef.current = now;

        setCurrentTime((prev) => {
          const next = prev + deltaSeconds;
          checkCheckpointsAtTime(next);
          if (next >= duration) {
            setIsPlaying(false);
            setIsCompleted(true);
            stopSpeech();
            if (videoResource) {
              videoLearningService.recordVideoCompletion(videoResource.id, videoResource.unitId, duration);
            }
            return duration;
          }
          return next;
        });
      }, 100);

      syntheticTimerRef.current = intervalId;
      return () => {
        clearInterval(intervalId);
      };
    } else {
      lastWallClockTimeRef.current = null;
      if (syntheticTimerRef.current) {
        clearInterval(syntheticTimerRef.current);
      }
    }
  }, [hasRealSrc, isPlaying, activeCheckpoint, playbackRate, duration, videoResource, checkCheckpointsAtTime, stopSpeech]);

  // HTML5 Video event handlers
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    setCurrentTime(cur);
    checkCheckpointsAtTime(cur);

    // Save progress periodically
    if (Math.floor(cur) % 5 === 0 && videoResource) {
      videoLearningService.saveLearnerProgress({
        videoId: videoResource.id,
        unitId: videoResource.unitId,
        currentTimeSeconds: Math.floor(cur),
        durationSeconds: Math.floor(duration),
        progressPercent: Math.round((cur / duration) * 100),
        isCompleted: false,
        checkpointsAnswered: {},
        lastWatchedAt: new Date().toISOString()
      });
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsCompleted(true);
    if (videoResource) {
      videoLearningService.recordVideoCompletion(
        videoResource.id,
        videoResource.unitId,
        Math.floor(duration)
      );
    }
  };

  // Play / Pause toggle
  const togglePlay = () => {
    if (activeCheckpoint && !checkpointSubmitted) return;

    if (currentTime >= duration) {
      setCurrentTime(0);
      if (videoRef.current) videoRef.current.currentTime = 0;
      setIsCompleted(false);
    }

    if (hasRealSrc && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      if (isPlaying) {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel();
          currentSpokenTextRef.current = null;
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSkip = (seconds: number) => {
    const next = Math.max(0, Math.min(duration, currentTime + seconds));
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      currentSpokenTextRef.current = null;
    }
    setCurrentTime(next);
    if (videoRef.current) {
      videoRef.current.currentTime = next;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      currentSpokenTextRef.current = null;
    }
    setCurrentTime(val);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      currentSpokenTextRef.current = null;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    if (!isMuted && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      currentSpokenTextRef.current = null;
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
    setIsMuted(val === 0);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Checkpoint submission
  const handleCheckpointSubmit = () => {
    if (selectedOption === null || !activeCheckpoint) return;
    const isCorrect = selectedOption === activeCheckpoint.correctOptionIndex;
    setCheckpointSubmitted(true);

    if (videoResource) {
      videoLearningService.recordCheckpointAnswer(
        videoResource.id,
        videoResource.unitId,
        activeCheckpoint.id,
        selectedOption,
        isCorrect
      );
    }

    if (isCorrect) {
      setAnsweredCheckpoints((prev) => ({ ...prev, [activeCheckpoint.id]: true }));
    }
  };

  const handleResumeAfterCheckpoint = () => {
    if (activeCheckpoint) {
      setAnsweredCheckpoints((prev) => ({ ...prev, [activeCheckpoint.id]: true }));
    }
    setActiveCheckpoint(null);
    setCheckpointSubmitted(false);

    // Resume video playback
    if (hasRealSrc && videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      setIsPlaying(true);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Find currently active transcript segment
  const activeTranscript = effectiveTranscript.find(
    (t) => currentTime >= t.startTimeSeconds && currentTime <= t.endTimeSeconds
  );

  return (
    <div
      ref={containerRef}
      id={`video-explanation-player-${effectiveVideoId}`}
      className="bg-slate-950 text-slate-100 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col my-4"
    >
      {/* Top Header Bar */}
      <div className="bg-slate-900/90 px-4 sm:px-6 py-3 border-b border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
            {effectiveSubject}
          </span>
          <span className="text-slate-500 text-xs hidden sm:inline">•</span>
          <h3 className="text-sm font-semibold text-slate-100 truncate">
            {effectiveTitle}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowTranscript(!showTranscript)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 cursor-pointer ${
              showTranscript
                ? "bg-sky-600 text-white border-sky-500 shadow-sm"
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Transcript</span>
            <span className="text-[10px] font-mono opacity-80">({effectiveTranscript.length})</span>
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Close video"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Video Presentation Stage */}
      <div className="flex flex-col lg:flex-row flex-1 bg-black relative">
        {/* Video Canvas Stage */}
        <div className="flex-1 relative aspect-video flex items-center justify-center bg-slate-950 overflow-hidden">
          {hasRealSrc ? (
            <video
              ref={videoRef}
              src={src || videoResource?.assetUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-contain"
              playsInline
            />
          ) : (
            /* Rich Pedagogical Interactive Graphic Canvas */
            <div className="w-full h-full relative flex items-center justify-center bg-slate-950 overflow-hidden">
              <SubjectVisualCanvas
                scene={
                  videoResource?.storyboard?.find(
                    (s) => currentTime >= s.startSeconds && currentTime < (s.startSeconds + s.durationSeconds)
                  ) || videoResource?.storyboard?.[0]
                }
                currentTimeSeconds={currentTime}
                engineType={
                  videoResource?.visualEngineType ||
                  (videoResource?.subjectId === "mathematics" ? "math_geometric_algebraic" :
                   videoResource?.subjectId === "physics" ? "physics_kinematic_vectors" :
                   videoResource?.subjectId === "chemistry" ? "chemistry_molecular_reaction" :
                   videoResource?.subjectId === "biology" ? "biology_cellular_system" :
                   videoResource?.subjectId === "english" ? "english_syntax_tree" :
                   videoResource?.subjectId === "computer_science" ? "compsci_algorithm_visualizer" :
                   "math_geometric_algebraic")
                }
              />

              {/* Active Transcript Line Subtitle Display */}
              {activeTranscript && (
                <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none flex justify-center">
                  <div className="bg-slate-950/90 backdrop-blur-md border border-sky-500/40 rounded-xl px-4 py-2 shadow-2xl max-w-xl text-center animate-in fade-in">
                    <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-0.5">
                      {activeTranscript.speaker}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                      "{activeTranscript.text}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CHECKPOINT INTERACTIVE OVERLAY / MODAL */}
          {activeCheckpoint && (
            <div className="absolute inset-0 z-30 bg-black/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center animate-in fade-in">
              <div className="bg-slate-900 border border-indigo-500/50 rounded-2xl p-5 sm:p-6 max-w-lg w-full shadow-2xl space-y-4 text-slate-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Active Recall Checkpoint</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Paused at {formatTime(activeCheckpoint.triggerTimeSeconds)}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {activeCheckpoint.questionText}
                  </h4>
                  {activeCheckpoint.mathExpression && (
                    <div className="p-2.5 rounded-lg bg-slate-950 font-mono text-amber-300 text-xs border border-slate-800">
                      {activeCheckpoint.mathExpression}
                    </div>
                  )}
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-2">
                  {activeCheckpoint.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === activeCheckpoint.correctOptionIndex;
                    let optionStyle = "bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200";

                    if (checkpointSubmitted) {
                      if (isCorrect) {
                        optionStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200";
                      } else if (isSelected && !isCorrect) {
                        optionStyle = "bg-rose-950/60 border-rose-500 text-rose-200";
                      } else {
                        optionStyle = "bg-slate-800/40 border-slate-800 text-slate-500";
                      }
                    } else if (isSelected) {
                      optionStyle = "bg-indigo-900/60 border-indigo-500 text-indigo-100 shadow-md";
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={checkpointSubmitted}
                        onClick={() => setSelectedOption(idx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] font-bold font-mono">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt}</span>
                        </span>
                        {checkpointSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {checkpointSubmitted && isSelected && !isCorrect && (
                          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Socratic Hint Drawer */}
                {activeCheckpoint.socraticHint && (
                  <div>
                    {!showSocraticHint ? (
                      <button
                        type="button"
                        onClick={() => setShowSocraticHint(true)}
                        className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        Ask Tutor Moos for a Socratic Hint
                      </button>
                    ) : (
                      <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/30 text-xs text-sky-200 leading-relaxed">
                        <span className="font-bold text-sky-300 block mb-0.5">Tutor Moos Hint:</span>
                        {activeCheckpoint.socraticHint}
                      </div>
                    )}
                  </div>
                )}

                {/* Post Submission Explanation */}
                {checkpointSubmitted && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-slate-200 block">Explanation:</span>
                    <p>{activeCheckpoint.explanation}</p>
                  </div>
                )}

                {/* Checkpoint Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  {!checkpointSubmitted ? (
                    <button
                      type="button"
                      disabled={selectedOption === null}
                      onClick={handleCheckpointSubmit}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Submit Answer</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResumeAfterCheckpoint}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Resume Masterclass</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Side Transcript Drawer (Collapsible) */}
        {showTranscript && (
          <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/95 flex flex-col max-h-80 lg:max-h-[480px]">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-300 bg-slate-950/60">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                Interactive Transcript
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Click line to jump
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
              {effectiveTranscript.length > 0 ? (
                effectiveTranscript.map((seg) => {
                  const isActive = currentTime >= seg.startTimeSeconds && currentTime <= seg.endTimeSeconds;
                  return (
                    <button
                      key={seg.id}
                      type="button"
                      onClick={() => {
                        setCurrentTime(seg.startTimeSeconds);
                        if (videoRef.current) {
                          videoRef.current.currentTime = seg.startTimeSeconds;
                        }
                        if (!isPlaying) {
                          if (hasRealSrc && videoRef.current) {
                            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
                          } else {
                            setIsPlaying(true);
                          }
                        }
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition border cursor-pointer ${
                        isActive
                          ? "bg-sky-950/80 border-sky-500/80 text-sky-100 shadow-sm"
                          : "bg-slate-900/50 border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-slate-500">
                        <span className={isActive ? "text-sky-400 font-bold" : ""}>
                          {seg.speaker}
                        </span>
                        <span>{formatTime(seg.startTimeSeconds)}</span>
                      </div>
                      <p className={`leading-relaxed ${isActive ? "font-medium text-slate-100" : ""}`}>
                        {seg.text}
                      </p>
                    </button>
                  );
                })
              ) : (
                <div className="p-4 text-center text-slate-500 text-xs">
                  No transcript lines available for this video.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Media Controller Bar */}
      <div className="bg-slate-900 px-4 py-3 border-t border-slate-800 space-y-2">
        {/* Scrubber Bar with Checkpoint Markers */}
        <div className="relative flex items-center">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.5}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />

          {/* Checkpoint Indicators on Scrubber */}
          {effectiveCheckpoints.map((cp) => {
            const pct = (cp.triggerTimeSeconds / duration) * 100;
            const isAnswered = answeredCheckpoints[cp.id];
            return (
              <div
                key={cp.id}
                title={`Checkpoint at ${formatTime(cp.triggerTimeSeconds)}`}
                onClick={() => {
                  setCurrentTime(cp.triggerTimeSeconds);
                  if (videoRef.current) videoRef.current.currentTime = cp.triggerTimeSeconds;
                }}
                style={{ left: `${Math.min(99, Math.max(1, pct))}%` }}
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border cursor-pointer transition ${
                  isAnswered
                    ? "bg-emerald-400 border-emerald-300"
                    : "bg-amber-400 border-amber-200 animate-pulse"
                }`}
              />
            );
          })}
        </div>

        {/* Controller Buttons and Stats */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="p-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition cursor-pointer shadow-md"
              title={isPlaying ? "Pause (Space)" : "Play (Space)"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              type="button"
              onClick={() => handleSkip(-10)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Rewind 10s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => handleSkip(10)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Forward 10s"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <div className="font-mono text-slate-300 text-xs px-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Speed Selector */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              {[0.75, 1, 1.25, 1.5].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => handleSpeedChange(spd)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition cursor-pointer ${
                    playbackRate === spd
                      ? "bg-sky-600 text-white font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Volume Control */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                type="button"
                onClick={toggleMute}
                className="text-slate-400 hover:text-white transition cursor-pointer"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-slate-700 rounded appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Integrated Next-Action Pathway Footer */}
      <div className="bg-slate-950 px-4 sm:px-6 py-3 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            {isCompleted
              ? "Masterclass completed! Transition to practice to test conceptual mastery."
              : "Active Lesson Pathway: Watch Visual Explanation → Answer Checkpoints → Master in Practice"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onLaunchPractice && (
            <button
              type="button"
              onClick={onLaunchPractice}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Launch Practice Arena</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {onOpenAITutorWithContext && (
            <button
              type="button"
              onClick={() =>
                onOpenAITutorWithContext(
                  `Video masterclass inquiry: ${effectiveTitle}`,
                  `I watched the video explanation for ${effectiveTitle} and would like to ask Tutor Moos for further clarification.`
                )
              }
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
              <span>Ask Tutor Moos</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
