import React, { useState, useEffect } from "react";
import {
  Video,
  Film,
  Sparkles,
  Play,
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Layers,
  Ratio
} from "lucide-react";
import { firebaseSyncService } from "../services/firebaseSyncService";
import { emailAllowlistService } from "../services/emailAllowlistService";

interface VideoGeneratorStudioProps {
  onClose?: () => void;
}

interface VideoRecord {
  id: string;
  prompt: string;
  aspectRatio: "16:9" | "9:16";
  operationName: string;
  status: "queued" | "processing" | "ready" | "failed";
  videoUrl?: string;
  createdAt: string;
  error?: string;
}

export const VideoGeneratorStudio: React.FC<VideoGeneratorStudioProps> = ({ onClose }) => {
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeJob, setActiveJob] = useState<VideoRecord | null>(null);
  const [recentVideos, setRecentVideos] = useState<VideoRecord[]>(() => {
    try {
      const saved = localStorage.getItem("moos_veo_videos_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [pollingStatusMsg, setPollingStatusMsg] = useState("");

  const samplePrompts = [
    "A 3D photorealistic cinematic visualization of the human heart showing blood flow through valves in the left and right ventricles, with educational annotations, 4k detail.",
    "A glowing holographic simulation of a projectile launched at 30 degrees, tracing a parabolic trajectory with velocity vector arrows and gravitational acceleration markers.",
    "A microscopic visualization of DNA double helix unwinding during replication with DNA polymerase enzyme synthesizing new complementary strands.",
    "A dramatic cinematic demonstration of a simple beam deflecting under a central point load, showing internal shear forces and bending moment contours in color gradients."
  ];

  useEffect(() => {
    try {
      localStorage.setItem("moos_veo_videos_history", JSON.stringify(recentVideos));
    } catch (e) {
      console.warn("Could not save video history:", e);
    }
  }, [recentVideos]);

  // Polling loop for active job
  useEffect(() => {
    if (!activeJob || activeJob.status === "ready" || activeJob.status === "failed") {
      return;
    }

    let isMounted = true;
    const interval = setInterval(async () => {
      try {
        setPollingStatusMsg("Checking generation status with Google Veo 3 engine...");
        const res = await fetch("/api/video/status", {
          method: "POST",
          headers: emailAllowlistService.getAuthHeaders(),
          body: JSON.stringify({ operationName: activeJob.operationName })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to poll status");
        }

        const data = await res.json();

        if (data.done) {
          clearInterval(interval);
          if (!isMounted) return;

          setPollingStatusMsg("Generation finished! Downloading video stream...");
          // Request download
          const dlRes = await fetch("/api/video/download", {
            method: "POST",
            headers: emailAllowlistService.getAuthHeaders(),
            body: JSON.stringify({ operationName: activeJob.operationName })
          });

          if (!dlRes.ok) {
            throw new Error("Failed to stream video result");
          }

          const blob = await dlRes.blob();
          const videoUrl = URL.createObjectURL(blob);

          const readyJob: VideoRecord = {
            ...activeJob,
            status: "ready",
            videoUrl
          };

          setActiveJob(readyJob);
          setRecentVideos((prev) => [readyJob, ...prev.filter((v) => v.id !== readyJob.id)]);
          setIsGenerating(false);
          setPollingStatusMsg("Video ready for playback and download!");

          // Persist to Firestore
          firebaseSyncService.saveGeneratedVideoMetadata({
            id: readyJob.id,
            prompt: readyJob.prompt,
            aspectRatio: readyJob.aspectRatio,
            model: "veo-3.1-fast-generate-preview",
            status: "ready",
            operationName: readyJob.operationName
          }).catch(console.warn);
        } else {
          setPollingStatusMsg("Rendering high-definition physics & visual simulation frames...");
        }
      } catch (err: any) {
        console.error("Polling error:", err);
        if (isMounted) {
          setPollingStatusMsg(`Generation status notice: ${err.message}`);
        }
      }
    }, 8000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [activeJob]);

  const handleStartGeneration = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setPollingStatusMsg("Initiating Veo 3 video generation operation (veo-3.1-fast-generate-preview)...");

    try {
      const res = await fetch("/api/video/generate", {
        method: "POST",
        headers: emailAllowlistService.getAuthHeaders(),
        body: JSON.stringify({
          prompt: prompt.trim(),
          aspectRatio
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Video generation could not be initiated");
      }

      const newJob: VideoRecord = {
        id: `veo-${Date.now()}`,
        prompt: prompt.trim(),
        aspectRatio,
        operationName: data.operationName,
        status: "processing",
        createdAt: new Date().toISOString()
      };

      setActiveJob(newJob);
      setRecentVideos((prev) => [newJob, ...prev]);

      firebaseSyncService.saveGeneratedVideoMetadata({
        id: newJob.id,
        prompt: newJob.prompt,
        aspectRatio: newJob.aspectRatio,
        model: "veo-3.1-fast-generate-preview",
        status: "processing",
        operationName: newJob.operationName
      }).catch(console.warn);

    } catch (err: any) {
      console.error("Video initiation error:", err);
      setIsGenerating(false);
      setPollingStatusMsg(`Error: ${err.message}`);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shadow-inner">
            <Video className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black tracking-tight">Veo 3 Educational Video Studio</h2>
              <span className="text-[10px] uppercase font-extrabold tracking-wider bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full border border-indigo-400/30">
                veo-3.1-fast-generate-preview
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Generate photorealistic scientific animations, engineering models, and pedagogical videos directly from text.
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold"
          >
            Close Studio
          </button>
        )}
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Generator Form */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Scientific or Pedagogical Video Prompt
            </label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to visualize (e.g. cellular division, magnetic fields, projectile arc, organic chemistry reaction)..."
              className="w-full p-3.5 text-sm rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition resize-none text-slate-900"
            />
          </div>

          {/* Aspect Ratio Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Aspect Ratio (veo-3.1-fast-generate-preview)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAspectRatio("16:9")}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition ${
                  aspectRatio === "16:9"
                    ? "border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold shadow-xs"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="h-7 w-12 rounded border-2 border-current flex items-center justify-center text-[10px] font-bold">
                  16:9
                </div>
                <div>
                  <span className="text-xs block font-bold">Landscape (16:9)</span>
                  <span className="text-[10px] text-slate-500">Smart board, monitor & desktop</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAspectRatio("9:16")}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition ${
                  aspectRatio === "9:16"
                    ? "border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold shadow-xs"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="h-10 w-6 rounded border-2 border-current flex items-center justify-center text-[10px] font-bold">
                  9:16
                </div>
                <div>
                  <span className="text-xs block font-bold">Portrait (9:16)</span>
                  <span className="text-[10px] text-slate-500">Mobile companion & reels</span>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Prompts */}
          <div>
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Sample Disciplinary Inspiration
            </span>
            <div className="space-y-1.5">
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(p)}
                  className="w-full text-left text-xs p-2.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 text-slate-600 hover:text-indigo-900 transition flex items-start gap-2"
                >
                  <Sparkles className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{p}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="button"
              disabled={isGenerating || !prompt.trim()}
              onClick={handleStartGeneration}
              className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating Video with Veo 3...</span>
                </>
              ) : (
                <>
                  <Film className="h-4 w-4" />
                  <span>Generate Veo 3 Video ({aspectRatio})</span>
                </>
              )}
            </button>
          </div>

          {pollingStatusMsg && (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2.5">
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin text-indigo-600 shrink-0" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              )}
              <span className="font-medium">{pollingStatusMsg}</span>
            </div>
          )}
        </div>

        {/* Right Column: Active Video Playback & History */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 rounded-2xl p-4 text-white">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Play className="h-3.5 w-3.5 text-indigo-400" />
              <span>Video Display Arena</span>
            </h3>

            {activeJob && activeJob.videoUrl ? (
              <div className="space-y-3">
                <div className={`overflow-hidden rounded-xl bg-black flex items-center justify-center ${activeJob.aspectRatio === "9:16" ? "max-h-96" : "aspect-video"}`}>
                  <video
                    src={activeJob.videoUrl}
                    controls
                    autoPlay
                    loop
                    className="max-h-96 w-full rounded-xl object-contain"
                  />
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  <p className="line-clamp-2 italic">"{activeJob.prompt}"</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    <span>Aspect Ratio: {activeJob.aspectRatio}</span>
                    <a
                      href={activeJob.videoUrl}
                      download={`veo-video-${activeJob.id}.mp4`}
                      className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      <span>Download MP4</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : isGenerating ? (
              <div className="h-56 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-center p-6 gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
                <span className="text-xs font-bold text-slate-200">Synthesizing Video Frames...</span>
                <p className="text-[11px] text-slate-400 max-w-xs">
                  Veo 3 model veo-3.1-fast-generate-preview is computing scene lighting, movement physics, and resolution.
                </p>
              </div>
            ) : (
              <div className="h-56 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center p-6 text-slate-400 gap-2">
                <Film className="h-8 w-8 text-slate-600" />
                <span className="text-xs font-semibold">No video rendered yet</span>
                <p className="text-[10px] text-slate-500">
                  Select an aspect ratio (16:9 or 9:16) and enter a prompt to generate educational video.
                </p>
              </div>
            )}
          </div>

          {/* Recent Videos History */}
          {recentVideos.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Recent Generation History ({recentVideos.length})
              </h4>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {recentVideos.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.videoUrl) setActiveJob(item);
                    }}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                      activeJob?.id === item.id
                        ? "border-indigo-500 bg-indigo-50/50"
                        : "border-slate-200 bg-slate-50/60 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-800 mb-1">
                      <span className="uppercase text-[9px] px-1.5 py-0.5 rounded bg-slate-200">
                        {item.aspectRatio}
                      </span>
                      <span className="text-slate-400 font-normal">
                        {new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-slate-600 line-clamp-1 font-medium">{item.prompt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
