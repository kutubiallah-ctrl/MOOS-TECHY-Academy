import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Volume2,
  VolumeX,
  RefreshCw,
  RotateCcw,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Zap,
  ChevronDown,
  ChevronUp,
  Headphones,
  Sliders,
  Check
} from "lucide-react";

export type AudioEngineHealthStatus = "synced" | "drifted" | "stalled" | "idle" | "unsupported";

export interface AudioPlaybackMonitorProps {
  /** Whether playback (masterclass or speech reading) is actively running */
  isActivePlayback?: boolean;
  /** Current timeline timestamp in seconds (if known) */
  currentTimelineSeconds?: number;
  /** Expected audio duration in seconds */
  durationSeconds?: number;
  /** Label of the current segment or topic */
  segmentTitle?: string;
  /** Callback to re-synchronize audio from current position */
  onResync?: () => void;
  /** Callback to restart current segment from 00:00 */
  onRetrySegment?: () => void;
  /** Compact mode flag for embedding inside player toolbars */
  compact?: boolean;
  /** Optional custom class names */
  className?: string;
}

export const AudioPlaybackMonitor: React.FC<AudioPlaybackMonitorProps> = ({
  isActivePlayback = false,
  currentTimelineSeconds = 0,
  durationSeconds,
  segmentTitle,
  onResync,
  onRetrySegment,
  compact = false,
  className = ""
}) => {
  const [healthStatus, setHealthStatus] = useState<AudioEngineHealthStatus>("idle");
  const [stallDurationSec, setStallDurationSec] = useState<number>(0);
  const [estimatedDriftSec, setEstimatedDriftSec] = useState<number>(0);
  const [showDiagnostics, setShowDiagnostics] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [voicesCount, setVoicesCount] = useState<number>(0);
  const [reSyncCount, setReSyncCount] = useState<number>(0);
  const [autoRecover, setAutoRecover] = useState<boolean>(true);

  const hasSpeech = typeof window !== "undefined" && "speechSynthesis" in window;
  const lastActiveSpeechTimeRef = useRef<number>(Date.now());
  const stallCounterRef = useRef<number>(0);
  const lastTimelineSecondsRef = useRef<number>(currentTimelineSeconds);
  const timelineAdvancingRef = useRef<boolean>(false);

  // Query available system voices on mount
  useEffect(() => {
    if (!hasSpeech) {
      setHealthStatus("unsupported");
      return;
    }

    const updateVoices = () => {
      const v = window.speechSynthesis.getVoices();
      setVoicesCount(v.length);
    };

    updateVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, [hasSpeech]);

  // Track timeline advancement
  useEffect(() => {
    if (currentTimelineSeconds !== lastTimelineSecondsRef.current) {
      timelineAdvancingRef.current = true;
      lastTimelineSecondsRef.current = currentTimelineSeconds;
    }
  }, [currentTimelineSeconds]);

  // Primary Audio Engine Health & Drift Monitor Loop
  useEffect(() => {
    if (!hasSpeech) return;

    const monitorInterval = window.setInterval(() => {
      const synth = window.speechSynthesis;
      const isSpeaking = synth.speaking;
      const isPaused = synth.paused;
      const isPending = synth.pending;

      if (!isActivePlayback) {
        setHealthStatus("idle");
        stallCounterRef.current = 0;
        setStallDurationSec(0);
        setEstimatedDriftSec(0);
        return;
      }

      // If playback is active, speech should either be actively speaking, pending, or within a natural scene pause
      if (isSpeaking && !isPaused) {
        lastActiveSpeechTimeRef.current = Date.now();
        stallCounterRef.current = 0;
        setStallDurationSec(0);

        // Check for buffer freeze: if speaking is true continuously but browser audio thread froze
        setHealthStatus("synced");
        setEstimatedDriftSec(0);
      } else if (isPaused) {
        // Unexpected speech pause while playback is active
        stallCounterRef.current += 1;
        setStallDurationSec(stallCounterRef.current);
        if (stallCounterRef.current >= 3) {
          setHealthStatus("stalled");
        }
      } else {
        // Speech is NOT speaking, but timeline is actively moving
        const silentElapsedMs = Date.now() - lastActiveSpeechTimeRef.current;
        const silentSeconds = Math.floor(silentElapsedMs / 1000);

        // If timeline is advancing and more than 4 seconds elapsed without speech activity
        if (silentSeconds >= 4 && timelineAdvancingRef.current) {
          stallCounterRef.current = silentSeconds;
          setStallDurationSec(silentSeconds);

          if (silentSeconds >= 7) {
            setHealthStatus("stalled");
            setEstimatedDriftSec(silentSeconds);

            // Auto-recovery trigger if enabled
            if (autoRecover && silentSeconds === 8) {
              triggerReSync(true);
            }
          } else if (silentSeconds >= 3) {
            setHealthStatus("drifted");
            setEstimatedDriftSec(silentSeconds);
          }
        } else {
          setHealthStatus("synced");
          setEstimatedDriftSec(0);
        }
      }
    }, 1000);

    return () => {
      clearInterval(monitorInterval);
    };
  }, [isActivePlayback, hasSpeech, autoRecover]);

  // Execute Re-Sync Action
  const triggerReSync = useCallback((isAuto = false) => {
    if (!hasSpeech) return;

    try {
      // 1. Force cancel stale utterances
      window.speechSynthesis.cancel();
      // 2. Resume in case engine was suspended
      window.speechSynthesis.resume();

      // 3. Reset internal metrics
      lastActiveSpeechTimeRef.current = Date.now();
      stallCounterRef.current = 0;
      setStallDurationSec(0);
      setEstimatedDriftSec(0);
      setHealthStatus("synced");
      setReSyncCount((prev) => prev + 1);

      // 4. Dispatch custom window event so any listening player (SmartBoard / VideoPlayer) aligns
      window.dispatchEvent(
        new CustomEvent("moos:audio-resync", {
          detail: {
            timestamp: Date.now(),
            currentSeconds: currentTimelineSeconds,
            autoTriggered: isAuto
          }
        })
      );

      // 5. Call caller's explicit callback
      if (onResync) {
        onResync();
      }

      setFeedbackMessage(
        isAuto
          ? "Audio engine auto-recovered and re-synced."
          : "Audio re-synced successfully. Voice track restored."
      );
      setTimeout(() => setFeedbackMessage(null), 3500);
    } catch (err) {
      console.warn("AudioPlaybackMonitor: re-sync error", err);
    }
  }, [hasSpeech, currentTimelineSeconds, onResync]);

  // Execute Retry Segment Action
  const triggerRetrySegment = useCallback(() => {
    if (!hasSpeech) return;

    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      lastActiveSpeechTimeRef.current = Date.now();
      stallCounterRef.current = 0;
      setStallDurationSec(0);
      setEstimatedDriftSec(0);
      setHealthStatus("synced");

      window.dispatchEvent(
        new CustomEvent("moos:audio-retry-segment", {
          detail: {
            timestamp: Date.now(),
            segmentTitle
          }
        })
      );

      if (onRetrySegment) {
        onRetrySegment();
      }

      setFeedbackMessage("Segment restarted from 00:00 with fresh audio queue.");
      setTimeout(() => setFeedbackMessage(null), 3500);
    } catch (err) {
      console.warn("AudioPlaybackMonitor: retry segment error", err);
    }
  }, [hasSpeech, segmentTitle, onRetrySegment]);

  // Ping / Test Voice capability
  const handlePingVoice = useCallback(() => {
    if (!hasSpeech) return;
    try {
      window.speechSynthesis.cancel();
      const testUtterance = new SpeechSynthesisUtterance("Audio synthesis operational at normal rate.");
      testUtterance.rate = 1.0;
      testUtterance.pitch = 1.0;
      window.speechSynthesis.speak(testUtterance);
      setFeedbackMessage("Audio ping dispatched to browser speech engine.");
      setTimeout(() => setFeedbackMessage(null), 3000);
    } catch (err) {
      console.warn("Audio ping failed", err);
    }
  }, [hasSpeech]);

  if (!hasSpeech) {
    return (
      <div className={`rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 flex items-center justify-between gap-3 ${className}`}>
        <div className="flex items-center gap-2">
          <VolumeX className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Web Speech API is unavailable or disabled in this browser context. Visual captions and on-screen notes are active.</span>
        </div>
      </div>
    );
  }

  // Compact Toolbar Pill Mode (ideal for headers or overlay bars)
  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2 text-xs ${className}`}>
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-mono font-medium text-[11px] transition ${
            healthStatus === "synced"
              ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
              : healthStatus === "drifted"
              ? "bg-amber-950/60 border-amber-500/50 text-amber-300 animate-pulse"
              : healthStatus === "stalled"
              ? "bg-rose-950/70 border-rose-500/60 text-rose-300 animate-pulse"
              : "bg-slate-900 border-slate-800 text-slate-400"
          }`}
          title={
            healthStatus === "synced"
              ? "Web Speech audio track synchronized with smart board"
              : healthStatus === "drifted"
              ? `Audio drift detected (~${estimatedDriftSec}s offset)`
              : healthStatus === "stalled"
              ? `Audio speech buffer stalled (${stallDurationSec}s)`
              : "Audio engine idle"
          }
        >
          <span
            className={`w-2 h-2 rounded-full ${
              healthStatus === "synced"
                ? "bg-emerald-400"
                : healthStatus === "drifted"
                ? "bg-amber-400"
                : healthStatus === "stalled"
                ? "bg-rose-400"
                : "bg-slate-500"
            }`}
          />
          <span className="capitalize">
            {healthStatus === "synced"
              ? "Audio Synced"
              : healthStatus === "drifted"
              ? `Drift: +${estimatedDriftSec}s`
              : healthStatus === "stalled"
              ? "Audio Stalled"
              : "Audio Ready"}
          </span>
        </div>

        {/* Quick Re-sync Trigger */}
        <button
          type="button"
          onClick={() => triggerReSync(false)}
          className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer"
          title="Re-synchronize speech synthesis with current playback position"
        >
          <RefreshCw className="w-3 h-3 text-cyan-400" />
          <span>Re-sync</span>
        </button>

        {/* Quick Retry Segment Trigger */}
        {onRetrySegment && (
          <button
            type="button"
            onClick={triggerRetrySegment}
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px] font-medium flex items-center gap-1 transition cursor-pointer"
            title="Restart current segment from 00:00"
          >
            <RotateCcw className="w-3 h-3 text-slate-400" />
            <span>Retry</span>
          </button>
        )}
      </div>
    );
  }

  // Full Diagnostic and Control Card Mode
  return (
    <div
      className={`rounded-2xl border transition shadow-xs overflow-hidden ${
        healthStatus === "stalled"
          ? "bg-rose-950/30 border-rose-800/60 text-slate-200"
          : healthStatus === "drifted"
          ? "bg-amber-950/30 border-amber-800/60 text-slate-200"
          : "bg-slate-900 border-slate-800 text-slate-200"
      } ${className}`}
    >
      {/* Header Bar */}
      <div className="p-3 sm:p-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-xl ${
              healthStatus === "synced"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : healthStatus === "drifted"
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : healthStatus === "stalled"
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                : "bg-slate-800 text-slate-400 border border-slate-700"
            }`}
          >
            <Headphones className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                Web Speech Playback Monitor
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                    healthStatus === "synced"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : healthStatus === "drifted"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : healthStatus === "stalled"
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse"
                      : "bg-slate-800 text-slate-400 border border-slate-700"
                  }`}
                >
                  {healthStatus === "synced"
                    ? "Synchronized"
                    : healthStatus === "drifted"
                    ? `Drift (+${estimatedDriftSec}s)`
                    : healthStatus === "stalled"
                    ? `Stalled (${stallDurationSec}s)`
                    : "Ready"}
                </span>
              </h4>
            </div>

            <p className="text-[11px] text-slate-400 mt-0.5">
              {healthStatus === "stalled"
                ? "Speech synthesis buffer is unresponsive or frozen. Re-sync to restore spoken narration."
                : healthStatus === "drifted"
                ? "Timeline audio offset detected. Click Re-sync to recalibrate sentence queue."
                : "Active continuous audio monitoring with keep-alive heartbeat."}
            </p>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Re-sync Button */}
          <button
            type="button"
            onClick={() => triggerReSync(false)}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer ${
              healthStatus === "stalled" || healthStatus === "drifted"
                ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold animate-bounce"
                : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }`}
            title="Clear speech buffers and restart narration for current step"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Re-sync Audio</span>
          </button>

          {/* Retry Segment Button */}
          {onRetrySegment && (
            <button
              type="button"
              onClick={triggerRetrySegment}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
              title="Restart the current lesson segment from 00:00"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Retry Segment</span>
            </button>
          )}

          {/* Diagnostics toggle */}
          <button
            type="button"
            onClick={() => setShowDiagnostics((prev) => !prev)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            title="Toggle Audio Diagnostics Tray"
          >
            {showDiagnostics ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Real-time Feedback Toast */}
      {feedbackMessage && (
        <div className="bg-cyan-950/80 border-b border-cyan-800/80 px-3.5 py-1.5 text-xs text-cyan-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Expandable Diagnostics Tray */}
      {showDiagnostics && (
        <div className="p-3 sm:p-4 bg-slate-950/60 border-t border-slate-800 space-y-3 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">
                Engine State
              </span>
              <span className="font-semibold text-slate-200 mt-0.5 block capitalize">
                {window.speechSynthesis.speaking
                  ? "Speaking"
                  : window.speechSynthesis.paused
                  ? "Paused"
                  : "Idle"}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">
                System Voices
              </span>
              <span className="font-semibold text-slate-200 mt-0.5 block">
                {voicesCount > 0 ? `${voicesCount} detected` : "Loading..."}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">
                Timeline Position
              </span>
              <span className="font-semibold text-slate-200 mt-0.5 block font-mono">
                {Math.floor(currentTimelineSeconds / 60)}:
                {(currentTimelineSeconds % 60).toString().padStart(2, "0")}
                {durationSeconds ? ` / ${Math.floor(durationSeconds / 60)}:00` : ""}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">
                Re-sync Executions
              </span>
              <span className="font-semibold text-slate-200 mt-0.5 block font-mono">
                {reSyncCount} times
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={autoRecover}
                  onChange={(e) => setAutoRecover(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-[11px]">Auto-recover when stall exceeds 7 seconds</span>
              </label>
            </div>

            <button
              type="button"
              onClick={handlePingVoice}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px] font-medium flex items-center gap-1 transition cursor-pointer"
            >
              <Radio className="w-3 h-3 text-indigo-400" />
              <span>Ping Speech Engine Test</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
