import React, { useState, useEffect } from "react";
import {
  Video,
  Sparkles,
  Layers,
  Plus,
  Save,
  CheckCircle2,
  Clock,
  BookOpen,
  Film,
  HelpCircle,
  X,
  AlertCircle,
  Eye,
  Send,
  Trash2,
  Info,
  ShieldCheck,
  Zap,
  Play
} from "lucide-react";
import {
  VideoCreatorProject,
  VideoStoryboardScene,
  VideoCheckpointQuestion,
  VideoEntitlementTier,
  SubjectVisualEngineType
} from "../../types/videoLearning";
import { videoLearningService } from "../../services/videoLearningService";
import { creatorRegistryService } from "../../services/creatorRegistryService";
import { smartBoardMasterclassService } from "../../services/smartBoardMasterclassService";
import { SmartBoardMasterclassPlayer } from "./SmartBoardMasterclassPlayer";
import { ALL_CURRICULUM_UNITS } from "../../data/extendedCurriculumUnits";
import { CreatorTier } from "../../types/creatorRegistry";
import { MasterclassPackage } from "../../types/smartBoardMasterclass";

interface VideoCreatorStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedUnitId?: string;
  onPreviewCreatedVideo?: (videoId: string) => void;
}

export const VideoCreatorStudioModal: React.FC<VideoCreatorStudioModalProps> = ({
  isOpen,
  onClose,
  preselectedUnitId
}) => {
  const [projects, setProjects] = useState<VideoCreatorProject[]>([]);
  const [activeProject, setActiveProject] = useState<VideoCreatorProject | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"script" | "storyboard" | "checkpoints">("script");
  const [promptTopic, setPromptTopic] = useState("");
  const [selectedUnitId, setSelectedUnitId] = useState(preselectedUnitId || "unit-phy-fluids-hydrostatics");
  const [durationTargetMinutes, setDurationTargetMinutes] = useState<number>(20);

  // Safe Manufacturer Demo Mode State
  const [demoTier, setDemoTier] = useState<CreatorTier>(
    creatorRegistryService.getManufacturerDemoState().demoTier || "CREATOR_PREMIUM"
  );

  // In-Studio Learner Preview State
  const [previewMasterclass, setPreviewMasterclass] = useState<MasterclassPackage | null>(null);

  const activeCreator =
    creatorRegistryService.getProfile("creator_dr_adebayo") ||
    creatorRegistryService.getAllCreators()[0];

  useEffect(() => {
    if (isOpen) {
      const projs = videoLearningService.getAllCreatorProjects();
      setProjects(projs);
      if (projs.length > 0 && !activeProject) {
        setActiveProject(projs[0]);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleDemoTier = (tier: CreatorTier) => {
    creatorRegistryService.setManufacturerDemoMode(true, tier);
    setDemoTier(tier);
    setStatusMessage(`Manufacturer Demo Mode switched to: ${tier}. Evaluator permissions granted immediately.`);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleAgenticSynthesize = async () => {
    if (!promptTopic) return;
    setIsSynthesizing(true);
    setStatusMessage("Agentic Masterclass Orchestrator: Synthesizing segmented tutor dialogue, smart board actions and checkpoints...");

    const unit = ALL_CURRICULUM_UNITS.find((u) => u.id === selectedUnitId) || ALL_CURRICULUM_UNITS[0];

    try {
      const generatedProject = await videoLearningService.synthesizeVideoPackage({
        title: `Visual Mastery: ${promptTopic}`,
        topic: promptTopic,
        unitId: unit.id,
        subjectId: unit.subjectId,
        level: unit.level,
        durationMinutes: durationTargetMinutes,
        creatorName: activeCreator ? activeCreator.name : "Teacher Studio Copilot"
      });

      setProjects(videoLearningService.getAllCreatorProjects());
      setActiveProject(generatedProject);
      setStatusMessage(`Synthesized ${durationTargetMinutes}-minute Masterclass with progressive smart board scripts & checkpoints!`);
      setTimeout(() => setStatusMessage(null), 4000);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleSaveProject = () => {
    if (!activeProject) return;
    videoLearningService.saveCreatorProject(activeProject);
    setProjects(videoLearningService.getAllCreatorProjects());
    setStatusMessage("Smart Board Masterclass saved to studio draft repository.");
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handlePublishProject = () => {
    if (!activeProject) return;
    const updated: VideoCreatorProject = {
      ...activeProject,
      status: "published"
    };
    videoLearningService.saveCreatorProject(updated);
    if (activeCreator) {
      creatorRegistryService.recordResourcePublication(activeCreator.id, updated.id);
    }
    setActiveProject(updated);
    setProjects(videoLearningService.getAllCreatorProjects());
    setStatusMessage("Masterclass approved and published to Academy Curriculum repository!");
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleOpenLearnerPreview = () => {
    if (!activeProject) return;
    const unit = ALL_CURRICULUM_UNITS.find((u) => u.id === activeProject.unitId) || ALL_CURRICULUM_UNITS[0];
    const pkg = smartBoardMasterclassService.synthesizeMasterclass(
      unit,
      undefined,
      activeProject.durationTargetMinutes || durationTargetMinutes
    );
    // Override title and scripts with creator's active edits
    pkg.title = activeProject.title;
    if (pkg.segments[0]) {
      pkg.segments[0].tutorScript = activeProject.fullNarrationScript;
      pkg.segments[0].checkpoints = activeProject.checkpoints;
    }
    setPreviewMasterclass(pkg);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-5xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                Educator Video & Smart Board Creator Studio
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[11px] font-mono">
                  Agentic & Dual-Script Authoring
                </span>
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span>Author progressive blackboard equations, synchronized tutor narration, and checkpoints</span>
              </div>
            </div>
          </div>

          {/* Safe Manufacturer Demo Mode Evaluator Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-900 border border-amber-500/40 p-1 rounded-xl text-xs">
              <span className="text-[10px] uppercase font-bold text-amber-400 px-1.5 font-mono">
                Evaluator Override:
              </span>
              {(["FREE_TEACHER", "TEACHER_PRO", "CREATOR_PREMIUM"] as CreatorTier[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleToggleDemoTier(t)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                    demoTier === t
                      ? "bg-amber-500 text-slate-950 shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {t.replace(/_/g, " ")}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Prominent Demo Mode Transparency Ribbon */}
        <div className="bg-amber-950/70 border-b border-amber-800/80 px-4 py-1.5 text-[11px] text-amber-300 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="font-bold tracking-wide">
              DEMO MODE • NO REAL PAYMENT • NO REAL FINANCIAL TRANSACTION
            </span>
          </div>
          <span className="text-[10px] font-mono text-amber-400 bg-amber-900/60 px-2 py-0.5 rounded">
            Tier Active: {demoTier}
          </span>
        </div>

        {/* Status banner */}
        {statusMessage && (
          <div className="bg-emerald-950/80 border-b border-emerald-800/80 px-4 py-2 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Body Layout: Left Projects List, Right Project Editor */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Left Column: Projects & Synthesis Launcher */}
          <div className="md:col-span-4 border-r border-slate-800 bg-slate-950/60 p-4 flex flex-col justify-between overflow-y-auto space-y-4">
            {/* Agentic Video Synthesizer Widget */}
            <div className="bg-indigo-950/30 p-3.5 rounded-xl border border-indigo-800/50 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                AI Smart Board Synthesizer
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Generate dual scripts (spoken tutor + smart board equations) and segmented parts for any curriculum unit.
              </p>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Target Curricular Unit:</label>
                <select
                  value={selectedUnitId}
                  onChange={(e) => setSelectedUnitId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-xs rounded-lg p-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  {ALL_CURRICULUM_UNITS.map((u) => (
                    <option key={u.id} value={u.id}>
                      [{u.code}] {u.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Core Topic / Concept:</label>
                <input
                  type="text"
                  placeholder="e.g. Kinematics uniformly accelerated motion"
                  value={promptTopic}
                  onChange={(e) => setPromptTopic(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-xs rounded-lg p-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Masterclass Duration Selector with Intelligent Segmentation */}
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">
                  Masterclass Duration & Segmentation:
                </label>
                <div className="grid grid-cols-5 gap-1 text-[10px] font-mono">
                  {[
                    { mins: 5, label: "5m (Micro)" },
                    { mins: 10, label: "10m (Micro)" },
                    { mins: 20, label: "20m (Std)" },
                    { mins: 30, label: "30m (Deep)" },
                    { mins: 45, label: "45m (Deep)" }
                  ].map((d) => (
                    <button
                      key={d.mins}
                      type="button"
                      onClick={() => setDurationTargetMinutes(d.mins)}
                      className={`py-1.5 rounded-lg border text-center font-bold transition cursor-pointer ${
                        durationTargetMinutes === d.mins
                          ? "bg-indigo-600 text-white border-indigo-500"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={isSynthesizing || !promptTopic}
                onClick={handleAgenticSynthesize}
                className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold shadow flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSynthesizing ? "Synthesizing Masterclass..." : "Synthesize Masterclass Package"}</span>
              </button>
            </div>

            {/* Saved Studio Projects List */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Studio Projects ({projects.length})
              </span>
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProject(proj)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition cursor-pointer flex items-center justify-between ${
                      activeProject?.id === proj.id
                        ? "bg-slate-800 border-indigo-500 text-white shadow-xs"
                        : "bg-slate-900/80 border-slate-800/80 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="truncate pr-2">
                      <span className="font-semibold block truncate text-slate-200">{proj.title}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {proj.durationTargetMinutes || 6}m • {proj.status.toUpperCase()}
                      </span>
                    </div>
                    {proj.status === "published" && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dual-Script & Checkpoint Editor */}
          <div className="md:col-span-8 flex flex-col justify-between overflow-hidden bg-slate-900/40">
            {activeProject ? (
              <>
                {/* Editor Header */}
                <div className="p-4 border-b border-slate-800 bg-slate-950/40 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">{activeProject.title}</h3>
                    <p className="text-xs text-slate-400">
                      Unit: {activeProject.unitId} • Target Duration: {activeProject.durationTargetMinutes || 6} mins
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* In-Studio Preview Button */}
                    <button
                      type="button"
                      onClick={handleOpenLearnerPreview}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Preview as Learner</span>
                    </button>

                    <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
                      <button
                        onClick={() => setActiveTab("script")}
                        className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                          activeTab === "script" ? "bg-indigo-600 text-white" : "text-slate-400"
                        }`}
                      >
                        Tutor Script
                      </button>
                      <button
                        onClick={() => setActiveTab("storyboard")}
                        className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                          activeTab === "storyboard" ? "bg-indigo-600 text-white" : "text-slate-400"
                        }`}
                      >
                        Smart Board Actions
                      </button>
                      <button
                        onClick={() => setActiveTab("checkpoints")}
                        className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                          activeTab === "checkpoints" ? "bg-indigo-600 text-white" : "text-slate-400"
                        }`}
                      >
                        Checkpoints ({activeProject.checkpoints.length})
                      </button>
                    </div>
                  </div>
                </div>

                {/* Editor Tab Content */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {activeTab === "script" && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">
                          Spoken Tutor Narration Script:
                        </label>
                        <p className="text-[11px] text-slate-500 mb-2">
                          This script is synthesized by the speech engine in real-time during masterclass playback.
                        </p>
                        <textarea
                          rows={12}
                          value={activeProject.fullNarrationScript}
                          onChange={(e) =>
                            setActiveProject({
                              ...activeProject,
                              fullNarrationScript: e.target.value
                            })
                          }
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 font-sans text-xs leading-relaxed focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "storyboard" && (
                    <div className="space-y-3">
                      <span className="text-xs text-slate-400 block mb-1">
                        Pedagogical Stages & Progressive Board Visual Strategies:
                      </span>
                      {activeProject.storyboardScenes.map((sc) => (
                        <div
                          key={sc.sceneNumber}
                          className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold text-[10px] uppercase">
                              Scene {sc.sceneNumber}: {sc.pedagogicalPhase.replace(/_/g, " ")}
                            </span>
                            <span className="font-mono text-slate-400 text-[11px]">
                              {sc.timeRange} ({sc.durationSeconds}s)
                            </span>
                          </div>

                          <h5 className="font-semibold text-slate-100">{sc.title}</h5>
                          <p className="text-slate-300 leading-relaxed text-xs">{sc.narrationScript}</p>

                          <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-xs text-cyan-300">
                            <strong>Smart Board Strategy:</strong> {sc.visualDescription}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "checkpoints" && (
                    <div className="space-y-3">
                      {activeProject.checkpoints.map((cp, idx) => (
                        <div
                          key={cp.id}
                          className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-amber-400 font-bold">
                              Checkpoint #{idx + 1} (At {cp.triggerTimeSeconds}s mark)
                            </span>
                            <span className="text-slate-500 text-[10px]">In-Lesson Checkpoint</span>
                          </div>

                          <p className="font-semibold text-slate-100 text-xs">{cp.questionText}</p>

                          <div className="space-y-1">
                            {cp.options.map((opt, oIdx) => (
                              <div
                                key={oIdx}
                                className={`p-2 rounded text-xs flex items-center justify-between ${
                                  oIdx === cp.correctOptionIndex
                                    ? "bg-emerald-950/50 text-emerald-200 border border-emerald-800/60"
                                    : "bg-slate-900 text-slate-400"
                                }`}
                              >
                                <span>{opt}</span>
                                {oIdx === cp.correctOptionIndex && (
                                  <span className="text-[10px] font-bold text-emerald-400">CORRECT</span>
                                )}
                              </div>
                            ))}
                          </div>

                          <p className="text-slate-400 text-[11px] pt-1">
                            <strong>Explanation:</strong> {cp.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Editor Footer Actions */}
                <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleSaveProject}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Draft
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePublishProject}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approve & Publish Masterclass
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
                Select or generate a project from the left panel.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* In-Studio Learner Preview Modal */}
      {previewMasterclass && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="max-w-4xl w-full">
            <SmartBoardMasterclassPlayer
              masterclass={previewMasterclass}
              onClose={() => setPreviewMasterclass(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
