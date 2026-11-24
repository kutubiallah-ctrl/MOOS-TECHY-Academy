import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  MicOff,
  Radio,
  Volume2,
  VolumeX,
  Sparkles,
  AlertCircle,
  Clock,
  Activity,
  User,
  Bot
} from "lucide-react";
import { emailAllowlistService } from "../services/emailAllowlistService";

interface LiveVoiceConversationProps {
  onClose?: () => void;
}

interface ConversationTurn {
  speaker: "user" | "tutor";
  text: string;
  timestamp: string;
}

export const LiveVoiceConversation: React.FC<LiveVoiceConversationProps> = ({ onClose }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Click 'Start Real-Time Voice Session' to connect with Tutor Moos.");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [conversationHistory, setConversationHistory] = useState<ConversationTurn[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const queuedSourcesRef = useRef<AudioBufferSourceNode[]>([]);

  useEffect(() => {
    return () => {
      disconnectLive();
    };
  }, []);

  // Helper to convert float32 audio to 16kHz PCM base64
  const pcmToBase64 = (float32Array: Float32Array): string => {
    const l = float32Array.length;
    const int16Array = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    const bytes = new Uint8Array(int16Array.buffer);
    let binary = "";
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Play incoming raw 24kHz PCM audio chunk
  const playAudioChunk = (audioContext: AudioContext, base64Audio: string) => {
    try {
      const binaryString = atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const int16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) {
        float32[i] = int16[i] / (int16[i] < 0 ? 32768 : 32767);
      }

      const audioBuffer = audioContext.createBuffer(1, float32.length, 24000);
      audioBuffer.copyToChannel(float32, 0);

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);

      const currentTime = audioContext.currentTime;
      if (nextStartTimeRef.current < currentTime) {
        nextStartTimeRef.current = currentTime + 0.05; // small buffer to avoid clicks
      }

      source.start(nextStartTimeRef.current);
      nextStartTimeRef.current += audioBuffer.duration;

      queuedSourcesRef.current.push(source);
      source.onended = () => {
        queuedSourcesRef.current = queuedSourcesRef.current.filter((s) => s !== source);
      };
    } catch (err) {
      console.error("Audio playback chunk error:", err);
    }
  };

  const stopAllQueuedAudio = () => {
    queuedSourcesRef.current.forEach((src) => {
      try {
        src.stop();
      } catch {
        // already stopped
      }
    });
    queuedSourcesRef.current = [];
    if (outputAudioCtxRef.current) {
      nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;
    }
  };

  const connectLive = async () => {
    setIsConnecting(true);
    setErrorMessage(null);
    setStatusMessage("Requesting microphone permissions and connecting to Gemini Live API...");

    try {
      // 1. Microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true
        }
      });
      micStreamRef.current = stream;

      // 2. Audio Contexts
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const inputCtx = new AudioCtx({ sampleRate: 16000 });
      const outputCtx = new AudioCtx({ sampleRate: 24000 });
      inputAudioCtxRef.current = inputCtx;
      outputAudioCtxRef.current = outputCtx;
      nextStartTimeRef.current = outputCtx.currentTime;

      // 3. Connect WebSocket to backend server's authenticated /live endpoint
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const token = emailAllowlistService.getActiveToken();
      const wsUrl = token
        ? `${protocol}//${window.location.host}/live?token=${encodeURIComponent(token)}`
        : `${protocol}//${window.location.host}/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnecting(false);
        setIsConnected(true);
        setStatusMessage("Connected! Speak into your microphone to talk with Tutor Moos in real time.");
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);

          if (msg.error) {
            setErrorMessage(`Live Session Error: ${msg.error}`);
            disconnectLive();
            return;
          }

          if (msg.interrupted) {
            stopAllQueuedAudio();
            setStatusMessage("Listening to you...");
          }

          if (msg.audio) {
            playAudioChunk(outputCtx, msg.audio);
            setStatusMessage("Tutor Moos is speaking...");
          }

          if (msg.text) {
            setConversationHistory((prev) => [
              ...prev,
              { speaker: "tutor", text: msg.text, timestamp: new Date().toLocaleTimeString() }
            ]);
          }
        } catch (err) {
          console.error("WS message parse error:", err);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsConnecting(false);
        setStatusMessage("Live voice session disconnected.");
      };

      ws.onerror = (err) => {
        console.error("WS client error:", err);
        setErrorMessage("Connection error to Live API server.");
        disconnectLive();
      };

      // 4. Capture microphone and stream PCM chunks to server
      const source = inputCtx.createMediaStreamSource(stream);
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (e) => {
        if (!isMuted && ws.readyState === WebSocket.OPEN) {
          const channelData = e.inputBuffer.getChannelData(0);
          
          // Audio level metering
          let sum = 0;
          for (let i = 0; i < channelData.length; i++) {
            sum += Math.abs(channelData[i]);
          }
          setAudioLevel(Math.min(100, Math.round((sum / channelData.length) * 500)));

          const base64Chunk = pcmToBase64(channelData);
          ws.send(JSON.stringify({ audio: base64Chunk }));
        } else {
          setAudioLevel(0);
        }
      };

      source.connect(processor);
      processor.connect(inputCtx.destination);

    } catch (err: any) {
      console.error("Live connection failure:", err);
      setIsConnecting(false);
      setIsConnected(false);
      setErrorMessage(
        err.name === "NotAllowedError"
          ? "Microphone access was denied. Please allow microphone permissions."
          : `Failed to connect: ${err.message}`
      );
    }
  };

  const disconnectLive = () => {
    stopAllQueuedAudio();

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }

    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close().catch(() => {});
      inputAudioCtxRef.current = null;
    }

    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close().catch(() => {});
      outputAudioCtxRef.current = null;
    }

    if (wsRef.current) {
      if (wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
      wsRef.current = null;
    }

    setIsConnected(false);
    setIsConnecting(false);
    setAudioLevel(0);
    setStatusMessage("Live voice session ended.");
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/20">
            <Radio className={`h-6 w-6 ${isConnected ? "animate-pulse text-amber-300" : ""}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-slate-900">Real-Time Voice Conversations</h3>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-md">
                gemini-3.8-live
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Low-latency, natural bidirectional voice dialogues with Tutor Moos powered by the Live API.
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 font-semibold"
          >
            Close
          </button>
        )}
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2.5">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Interactive Stage */}
      <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-900 text-white text-center relative overflow-hidden">
        {/* Visual Pulse Orb */}
        <div className="relative mb-6">
          <div
            className={`h-28 w-28 rounded-full flex items-center justify-center transition-all duration-150 ${
              isConnected
                ? "bg-indigo-600 shadow-2xl shadow-indigo-500/50 scale-105"
                : "bg-slate-800"
            }`}
            style={{
              transform: isConnected ? `scale(${1 + audioLevel / 150})` : undefined
            }}
          >
            <Mic className={`h-12 w-12 ${isConnected ? "text-amber-300" : "text-slate-500"}`} />
          </div>
          {isConnected && (
            <span
              className="absolute -inset-2 rounded-full border-2 border-indigo-400/40 animate-ping"
              style={{ animationDuration: "2s" }}
            />
          )}
        </div>

        {/* Status Callout */}
        <div className="space-y-1 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold">
            <span className={`h-2 w-2 rounded-full ${isConnected ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
            <span>{isConnected ? "LIVE VOICE CALL ACTIVE" : "DISCONNECTED"}</span>
          </div>
          <p className="text-xs text-slate-300 font-medium pt-2">
            {statusMessage}
          </p>
        </div>

        {/* Live Audio Meter */}
        {isConnected && (
          <div className="w-48 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-4">
            <div
              className="bg-emerald-400 h-full transition-all duration-75"
              style={{ width: `${Math.min(100, audioLevel * 2)}%` }}
            />
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-3 mt-6">
          {!isConnected ? (
            <button
              type="button"
              disabled={isConnecting}
              onClick={connectLive}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
            >
              <Radio className="h-4 w-4" />
              <span>{isConnecting ? "Connecting to Live API..." : "Start Real-Time Voice Session"}</span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleMute}
                className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 transition ${
                  isMuted
                    ? "bg-rose-600 border-rose-500 text-white"
                    : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                }`}
                title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
              >
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                <span>{isMuted ? "Muted" : "Mute"}</span>
              </button>

              <button
                type="button"
                onClick={disconnectLive}
                className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition"
              >
                End Voice Call
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Real-Time Live Transcript Preview */}
      {conversationHistory.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Live Speech Transcript
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto p-1">
            {conversationHistory.map((turn, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl text-xs flex items-start gap-2.5 ${
                  turn.speaker === "tutor"
                    ? "bg-indigo-50 border border-indigo-100 text-indigo-950"
                    : "bg-slate-50 border border-slate-200 text-slate-800"
                }`}
              >
                <div className="h-5 w-5 rounded-md bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {turn.speaker === "tutor" ? <Bot className="h-3 w-3" /> : <User className="h-3 w-3" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-0.5">
                    <span>{turn.speaker === "tutor" ? "Tutor Moos (Live Audio)" : "You (Spoken)"}</span>
                    <span>{turn.timestamp}</span>
                  </div>
                  <p className="leading-relaxed">{turn.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
