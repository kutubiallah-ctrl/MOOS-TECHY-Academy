import React, { useState, useEffect, useRef } from "react";
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
  Sparkles,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Sliders,
  Layers,
  Award,
  ChevronRight,
  Clock,
  ShieldCheck,
  Zap
} from "lucide-react";
import {
  CurriculumVideoResource,
  VideoStoryboardScene,
  VideoCheckpointQuestion,
  VideoTranscriptSegment
} from "../../types/videoLearning";
import { videoLearningService } from "../../services/videoLearningService";
import { SubjectVisualCanvas } from "./SubjectVisualCanvas";

interface CurriculumVideoPlayerProps {
  video: CurriculumVideoResource;
  onLaunchPractice?: (skillId: string) => void;
  onOpenAITutorWithContext?: (prompt: string, attempt: string) => void;
  onClose?: () => void;
}

export const CurriculumVideoPlayer: React.FC<CurriculumVideoPlayerProps> = ({
  video,
  onLaunchPractice,
  onOpenAITutorWithContext,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSeconds, setCurrentTimeSeconds] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [activeSideTab, setActiveSideTab] = useState<"transcript" | "storyboard" | "concepts">("transcript");
  const [activeCheckpoint, setActiveCheckpoint] = useState<VideoCheckpointQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [checkpointSubmitted, setCheckpointSubmitted] = useState(false);
  const [showSocraticHint, setShowSocraticHint] = useState(false);
  const [answeredCheckpoints, setAnsweredCheckpoints] = useState<Record<string, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const playTimerRef = useRef<number | null>(null);

  // Load existing progress on mount
  useEffect(() => {
    const progress = videoLearningService.getLearnerProgress(video.id);
    if (progress) {
      if (progress.currentTimeSeconds < video.durationSeconds - 5) {
        setCurrentTimeSeconds(progress.currentTimeSeconds);
      }
      setIsCompleted(progress.isCompleted);
      const answeredMap: Record<string, boolean> = {};
      Object.entries(progress.checkpointsAnswered || {}).forEach(([id, data]) => {
        answeredMap[id] = data.isCorrect;
      });
      setAnsweredCheckpoints(answeredMap);
    }
  }, [video.id, video.durationSeconds]);

  // Active scene calculation
  const currentScene: VideoStoryboardScene | undefined = video.storyboard.find((s) => {
    const end = s.startSeconds + s.durationSeconds;
    return currentTimeSeconds >= s.startSeconds && currentTimeSeconds < end;
  }) || video.storyboard[0];

  // Active transcript line
  const activeTranscriptSegment: VideoTranscriptSegment | undefined = video.transcript.find((t) => {
    return currentTimeSeconds >= t.startTimeSeconds && currentTimeSeconds <= t.endTimeSeconds;
  });

  // Playback timer tick
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = window.setInterval(() => {
        setCurrentTimeSeconds((prev) => {
          const next = prev + 1;

          // Check if a checkpoint triggers at this second and hasn't been answered
          const checkpoint = video.checkpoints.find(
            (c) => Math.floor(c.triggerTimeSeconds) === Math.floor(next)
          );
          if (checkpoint && !answeredCheckpoints[checkpoint.id]) {
            setIsPlaying(false);
            setActiveCheckpoint(checkpoint);
            setSelectedOption(null);
            setCheckpointSubmitted(false);
            setShowSocraticHint(false);
            return next;
          }

          // Check if video completed
          if (next >= video.durationSeconds) {
            setIsPlaying(false);
            setIsCompleted(true);
            videoLearningService.recordVideoCompletion(video.id, video.unitId, video.durationSeconds);
            return video.durationSeconds;
          }

          // Periodic progress save every 5 seconds
          if (next % 5 === 0) {
            videoLearningService.saveLearnerProgress({
              videoId: video.id,
              unitId: video.unitId,
              currentTimeSeconds: next,
              durationSeconds: video.durationSeconds,
              progressPercent: Math.round((next / video.durationSeconds) * 100),
              isCompleted: false,
              checkpointsAnswered: {},
              lastWatchedAt: new Date().toISOString()
            });
          }

          return next;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
      }
    }

    return () => {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, video, answeredCheckpoints]);

  // Play / Pause Toggle
  const handleTogglePlay = () => {
    if (activeCheckpoint && !checkpointSubmitted) {
      return; // Must answer checkpoint or click continue
    }
    if (currentTimeSeconds >= video.durationSeconds) {
      setCurrentTimeSeconds(0);
      setIsCompleted(false);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (secondsDelta: number) => {
    setCurrentTimeSeconds((prev) => {
      const next = Math.max(0, Math.min(video.durationSeconds, prev + secondsDelta));
      return next;
    });
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCurrentTimeSeconds(val);
  };

  const handleCheckpointSubmit = () => {
    if (selectedOption === null || !activeCheckpoint) return;
    const isCorrect = selectedOption === activeCheckpoint.correctOptionIndex;
    setCheckpointSubmitted(true);

    videoLearningService.recordCheckpointAnswer(
      video.id,
      video.unitId,
      activeCheckpoint.id,
      selectedOption,
      isCorrect
    );

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
    setIsPlaying(true);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      id={`curriculum-video-player-${video.id}`}
      className="bg-slate-900 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col"
    >
      {/* Top Video Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-bold uppercase tracking-wider">
            {video.subjectName}
          </span>
          <span className="text-slate-400 text-xs font-mono hidden sm:inline">•</span>
          <h3 className="text-sm font-semibold text-slate-100 truncate">
            {video.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Lesson
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              title="Close Player"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Player Screen + Side Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-slate-800 bg-slate-950">
        {/* Left 8 Cols: Visual Engine Canvas & Controls */}
        <div className="lg:col-span-8 flex flex-col justify-between p-4 bg-gradient-to-b from-slate-950 to-slate-900 relative">
          {/* Dynamic Subject Visual Engine */}
          <div className="relative w-full rounded-xl overflow-hidden aspect-[16/10] bg-slate-950 shadow-inner flex items-center justify-center">
            <SubjectVisualCanvas
              scene={currentScene}
              currentTimeSeconds={currentTimeSeconds}
              engineType={video.visualEngineType}
            />

            {/* Live Subtitle / Closed Caption Overlay */}
            {showCaptions && activeTranscriptSegment && (
              <div className="absolute bottom-3 left-4 right-4 bg-black/85 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-700/60 text-center shadow-lg transition-all">
                <span className="text-xs text-sky-300 font-medium leading-relaxed">
                  "{activeTranscriptSegment.text}"
                </span>
              </div>
            )}

            {/* Checkpoint In-Video Pause Overlay */}
            {activeCheckpoint && (
              <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md p-6 flex flex-col justify-between z-30 animate-in fade-in zoom-in-95">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <Zap className="w-4 h-4 text-amber-400" />
                      In-Video Checkpoint • Verify Your Intuition
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Pauses video to solidify learning
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-100 mb-2">
                    {activeCheckpoint.questionText}
                  </p>
                  {activeCheckpoint.mathExpression && (
                    <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-sky-300 mb-3">
                      {activeCheckpoint.mathExpression}
                    </div>
                  )}

                  {/* Options */}
                  <div className="space-y-2">
                    {activeCheckpoint.options.map((opt, oIdx) => {
                      const isSelected = selectedOption === oIdx;
                      const isCorrect = oIdx === activeCheckpoint.correctOptionIndex;
                      let btnClass = "border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-700";

                      if (checkpointSubmitted) {
                        if (isCorrect) {
                          btnClass = "border-emerald-500 bg-emerald-950/50 text-emerald-200 font-semibold";
                        } else if (isSelected && !isCorrect) {
                          btnClass = "border-rose-500 bg-rose-950/50 text-rose-200";
                        }
                      } else if (isSelected) {
                        btnClass = "border-sky-500 bg-sky-950/50 text-sky-200 font-semibold";
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={checkpointSubmitted}
                          onClick={() => setSelectedOption(oIdx)}
                          className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition ${btnClass}`}
                        >
                          <span>{opt}</span>
                          {checkpointSubmitted && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Socratic Hint / Tutor Prompt */}
                  {showSocraticHint && (
                    <div className="mt-3 p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200">
                      <strong>Socratic Guidance:</strong> {activeCheckpoint.socraticHint}
                    </div>
                  )}

                  {/* Result Feedback */}
                  {checkpointSubmitted && (
                    <div
                      className={`mt-3 p-3 rounded-lg border text-xs leading-relaxed ${
                        selectedOption === activeCheckpoint.correctOptionIndex
                          ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-200"
                          : "bg-rose-950/40 border-rose-800/60 text-rose-200"
                      }`}
                    >
                      <strong className="block mb-1">
                        {selectedOption === activeCheckpoint.correctOptionIndex
                          ? "✓ Excellent mathematical insight!"
                          : "Needs Review:"}
                      </strong>
                      {activeCheckpoint.explanation}
                    </div>
                  )}
                </div>

                {/* Bottom Actions for Checkpoint */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800 mt-2">
                  <div className="flex items-center gap-2">
                    {!checkpointSubmitted && (
                      <button
                        onClick={() => setShowSocraticHint(!showSocraticHint)}
                        className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        {showSocraticHint ? "Hide Hint" : "Need Socratic Hint?"}
                      </button>
                    )}
                    {onOpenAITutorWithContext && (
                      <button
                        onClick={() =>
                          onOpenAITutorWithContext(
                            `Checkpoint question: "${activeCheckpoint.questionText}"`,
                            `I'm currently at minute ${formatTime(currentTimeSeconds)} of the video explanation on ${video.title}.`
                          )
                        }
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Ask Tutor Moos
                      </button>
                    )}
                  </div>

                  <div>
                    {!checkpointSubmitted ? (
                      <button
                        disabled={selectedOption === null}
                        onClick={handleCheckpointSubmit}
                        className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-semibold shadow transition"
                      >
                        Submit Checkpoint
                      </button>
                    ) : (
                      <button
                        onClick={handleResumeAfterCheckpoint}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow transition flex items-center gap-1"
                      >
                        Continue Video
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Scrubber & Player Controls Bar */}
          <div className="mt-4 bg-slate-900/90 rounded-xl p-3 border border-slate-800">
            {/* Seek bar with checkpoint markers */}
            <div className="relative flex items-center mb-2">
              <input
                type="range"
                min={0}
                max={video.durationSeconds}
                value={currentTimeSeconds}
                onChange={handleSeek}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              {/* Checkpoint marker pings on scrub track */}
              {video.checkpoints.map((cp) => {
                const leftPercent = (cp.triggerTimeSeconds / video.durationSeconds) * 100;
                const isAnswered = answeredCheckpoints[cp.id];
                return (
                  <span
                    key={cp.id}
                    style={{ left: `${leftPercent}%` }}
                    title={`Checkpoint at ${formatTime(cp.triggerTimeSeconds)}`}
                    className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border border-slate-900 cursor-pointer pointer-events-none ${
                      isAnswered ? "bg-emerald-400" : "bg-amber-400 animate-pulse"
                    }`}
                  />
                );
              })}
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={handleTogglePlay}
                  className="w-9 h-9 rounded-full bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center shadow transition"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                </button>

                <button
                  onClick={() => handleSkip(-10)}
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
                  title="Rewind 10s"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleSkip(10)}
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
                  title="Forward 10s"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                <div className="font-mono text-slate-300 text-[11px] ml-1">
                  <span>{formatTime(currentTimeSeconds)}</span>
                  <span className="text-slate-500"> / </span>
                  <span className="text-slate-400">{video.durationFormatted}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* CC Toggle */}
                <button
                  onClick={() => setShowCaptions(!showCaptions)}
                  className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition border ${
                    showCaptions
                      ? "bg-sky-500/20 text-sky-300 border-sky-500/40"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}
                  title="Toggle Subtitles"
                >
                  CC
                </button>

                {/* Speed selector */}
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  className="bg-slate-800 text-slate-300 text-[11px] font-mono rounded px-1.5 py-1 border border-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1.0x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                </select>

                {/* Mute toggle */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Interactive Transcript & Storyboard Navigation */}
        <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col h-full max-h-[560px]">
          {/* Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-900/80">
            <button
              onClick={() => setActiveSideTab("transcript")}
              className={`flex-1 py-2.5 text-xs font-semibold text-center transition border-b-2 ${
                activeSideTab === "transcript"
                  ? "border-sky-500 text-sky-400 bg-slate-800/50"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Interactive Transcript
            </button>
            <button
              onClick={() => setActiveSideTab("storyboard")}
              className={`flex-1 py-2.5 text-xs font-semibold text-center transition border-b-2 ${
                activeSideTab === "storyboard"
                  ? "border-sky-500 text-sky-400 bg-slate-800/50"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Storyboard ({video.storyboard.length})
            </button>
            <button
              onClick={() => setActiveSideTab("concepts")}
              className={`flex-1 py-2.5 text-xs font-semibold text-center transition border-b-2 ${
                activeSideTab === "concepts"
                  ? "border-sky-500 text-sky-400 bg-slate-800/50"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Key Terms
            </button>
          </div>

          {/* Tab 1: Interactive Transcript */}
          {activeSideTab === "transcript" && (
            <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
              <div className="text-[11px] text-slate-400 pb-1 border-b border-slate-800/60 flex items-center justify-between">
                <span>Click any sentence to seek:</span>
                <span className="font-mono text-sky-400">{video.transcript.length} lines</span>
              </div>
              {video.transcript.map((seg) => {
                const isActive =
                  currentTimeSeconds >= seg.startTimeSeconds &&
                  currentTimeSeconds <= seg.endTimeSeconds;
                return (
                  <div
                    key={seg.id}
                    onClick={() => {
                      setCurrentTimeSeconds(seg.startTimeSeconds);
                      if (!isPlaying) setIsPlaying(true);
                    }}
                    className={`p-2.5 rounded-lg cursor-pointer transition border ${
                      isActive
                        ? "bg-sky-950/60 border-sky-500/80 text-sky-100 shadow-sm"
                        : "bg-slate-900/40 border-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-slate-500">
                      <span className={isActive ? "text-sky-400 font-bold" : ""}>
                        {seg.speaker}
                      </span>
                      <span>{formatTime(seg.startTimeSeconds)}</span>
                    </div>
                    <p className={`leading-relaxed ${isActive ? "font-medium" : ""}`}>
                      {seg.text}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: Storyboard Scenes */}
          {activeSideTab === "storyboard" && (
            <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
              {video.storyboard.map((sc) => {
                const isActive =
                  currentTimeSeconds >= sc.startSeconds &&
                  currentTimeSeconds < sc.startSeconds + sc.durationSeconds;
                return (
                  <div
                    key={sc.sceneNumber}
                    onClick={() => {
                      setCurrentTimeSeconds(sc.startSeconds);
                      if (!isPlaying) setIsPlaying(true);
                    }}
                    className={`p-2.5 rounded-lg cursor-pointer transition border ${
                      isActive
                        ? "bg-indigo-950/50 border-indigo-500 text-indigo-100"
                        : "bg-slate-900/40 border-slate-800/60 text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="font-semibold text-indigo-400">
                        Scene {sc.sceneNumber}: {sc.title}
                      </span>
                      <span className="font-mono text-slate-500">{sc.timeRange}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                      {sc.keyTakeaway}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 3: Key Terms */}
          {activeSideTab === "concepts" && (
            <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
              {video.keyConcepts.map((kc, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentTimeSeconds(kc.timestampSeconds)}
                  className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer"
                >
                  <div className="flex items-center justify-between text-amber-400 font-bold text-xs mb-1">
                    <span>{kc.term}</span>
                    <span className="font-mono text-[10px] text-slate-500">
                      @{formatTime(kc.timestampSeconds)}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {kc.definition}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Post-Video Next-Action Learning Pathway Banner */}
      <div className="bg-slate-950 px-6 py-4 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-bold uppercase tracking-wider mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              Integrated Learning Pathway
            </div>
            <p className="text-xs text-slate-300">
              {isCompleted
                ? "Video Masterclass Completed! Solidify your understanding in the Practice Arena."
                : "Watch → Understand → Practise → Diagnose → Remediate → Master"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onLaunchPractice && (
              <button
                onClick={() =>
                  onLaunchPractice(video.nextActionPathway.recommendedPracticeSkillId)
                }
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-950 flex items-center gap-1.5 transition"
              >
                <Award className="w-4 h-4" />
                Launch Practice Arena
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {onOpenAITutorWithContext && (
              <button
                onClick={() =>
                  onOpenAITutorWithContext(
                    `In-depth inquiry on "${video.title}"`,
                    `I have just watched the video explanation for ${video.unitTitle} and would like to review the tricky concepts.`
                  )
                }
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition"
              >
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                Discuss with Tutor Moos
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
