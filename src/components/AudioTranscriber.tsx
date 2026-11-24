import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  Square,
  Sparkles,
  Copy,
  Check,
  Loader2,
  Volume2,
  FileText,
  AlertCircle,
  HelpCircle,
  Clock
} from "lucide-react";
import { firebaseSyncService } from "../services/firebaseSyncService";
import { emailAllowlistService } from "../services/emailAllowlistService";

interface AudioTranscriberProps {
  onInsertTranscript?: (text: string) => void;
  onClose?: () => void;
}

export const AudioTranscriber: React.FC<AudioTranscriberProps> = ({
  onInsertTranscript,
  onClose
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    setErrorMessage(null);
    audioChunksRef.current = [];
    setRecordingSeconds(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : MediaRecorder.isTypeSupported("audio/mp4")
        ? "audio/mp4"
        : "";

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        await processRecordedAudio();
      };

      recorder.start(250);
      setIsRecording(true);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((sec) => sec + 1);
      }, 1000);
    } catch (err: any) {
      console.error("Microphone access error:", err);
      setErrorMessage(
        err.name === "NotAllowedError"
          ? "Microphone permission was denied. Please allow microphone access in your browser."
          : `Failed to access microphone: ${err.message}`
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const processRecordedAudio = async () => {
    if (audioChunksRef.current.length === 0) return;

    setIsTranscribing(true);
    setErrorMessage(null);

    try {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: audioChunksRef.current[0]?.type || "audio/webm"
      });

      const base64Data = await blobToBase64(audioBlob);

      const res = await fetch("/api/audio/transcribe", {
        method: "POST",
        headers: emailAllowlistService.getAuthHeaders(),
        body: JSON.stringify({
          audioData: base64Data,
          mimeType: audioBlob.type || "audio/webm",
          prompt: "Transcribe this spoken educational audio accurately, retaining technical vocabulary, mathematical notations, and clear punctuation."
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Audio transcription failed");
      }

      const textResult = data.transcript || "No speech detected.";
      setTranscript(textResult);

      // Save transcription record to Firestore
      firebaseSyncService.saveAudioTranscription({
        id: `transcribe-${Date.now()}`,
        transcript: textResult,
        model: "gemini-3.5-transcribe",
        durationSeconds: recordingSeconds
      }).catch(console.warn);

    } catch (err: any) {
      console.error("Transcription error:", err);
      setErrorMessage(`Transcription failed: ${err.message}`);
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleCopy = () => {
    if (!transcript) return;
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `${mins}:${remaining < 10 ? "0" : ""}${remaining}`;
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Mic className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-slate-900">Audio Transcription</h3>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">
                gemini-3.5-transcribe
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Record spoken thoughts, questions, or lectures with your microphone for instant AI speech-to-text.
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

      {/* Recording Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
        <div className="flex items-center gap-3">
          {isRecording ? (
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                Recording ({formatSeconds(recordingSeconds)})
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <Volume2 className="h-4 w-4 text-slate-400" />
              <span>Ready to record voice input</span>
            </div>
          )}
        </div>

        <div>
          {isRecording ? (
            <button
              type="button"
              onClick={stopRecording}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
            >
              <Square className="h-4 w-4 fill-current" />
              <span>Stop & Transcribe</span>
            </button>
          ) : (
            <button
              type="button"
              disabled={isTranscribing}
              onClick={startRecording}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
            >
              <Mic className="h-4 w-4" />
              <span>Start Microphone Recording</span>
            </button>
          )}
        </div>
      </div>

      {/* Transcription Processing / Output */}
      {isTranscribing && (
        <div className="p-6 rounded-2xl border border-indigo-100 bg-indigo-50/50 flex flex-col items-center justify-center gap-2 text-center">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
          <span className="text-xs font-bold text-indigo-900">
            Transcribing audio with gemini-3.5-transcribe...
          </span>
          <p className="text-[11px] text-indigo-700">
            Analyzing audio harmonics, speech cadence, and technical vocabulary.
          </p>
        </div>
      )}

      {transcript && !isTranscribing && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-emerald-600" />
              <span>Transcribed Text</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center gap-1 font-semibold transition"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? "Copied!" : "Copy Text"}</span>
              </button>

              {onInsertTranscript && (
                <button
                  type="button"
                  onClick={() => onInsertTranscript(transcript)}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-bold px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition"
                >
                  Insert into Context
                </button>
              )}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 leading-relaxed max-h-60 overflow-y-auto">
            {transcript}
          </div>
        </div>
      )}
    </div>
  );
};
