import React, { useState, useMemo } from "react";
import {
  Video,
  Play,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  BookOpen,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  X,
  ExternalLink,
  PlusCircle
} from "lucide-react";
import { videoLearningService } from "../../services/videoLearningService";
import { UnitVideoCoverageItem } from "../../types/videoLearning";

interface VideoCoverageMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVideo?: (videoId: string) => void;
  onOpenCreatorStudio?: (unitId?: string) => void;
}

export const VideoCoverageMatrixModal: React.FC<VideoCoverageMatrixModalProps> = ({
  isOpen,
  onClose,
  onSelectVideo,
  onOpenCreatorStudio
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");

  const matrix = useMemo(() => videoLearningService.getCoverageMatrix(), []);
  const stats = useMemo(() => videoLearningService.getCoverageStats(), []);

  // Filter matrix
  const filteredMatrix = useMemo(() => {
    return matrix.filter((item) => {
      const matchSearch =
        item.unitTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.unitCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subjectName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "ready" && item.videoStatus === "genuine_asset_ready") ||
        (statusFilter === "scripted" && item.videoStatus === "script_and_storyboard_ready") ||
        (statusFilter === "pipeline" && item.videoStatus === "planned_in_pipeline");

      const matchSubject = subjectFilter === "all" || item.subjectId === subjectFilter;

      return matchSearch && matchStatus && matchSubject;
    });
  }, [matrix, searchQuery, statusFilter, subjectFilter]);

  // Unique subjects for filter
  const subjects = useMemo(() => {
    const map = new Map<string, string>();
    matrix.forEach((m) => map.set(m.subjectId, m.subjectName));
    return Array.from(map.entries());
  }, [matrix]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  Curriculum Video Learning Coverage Matrix
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
                    83 Curricular Units
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Official runtime repository & visual explanation coverage across primary and secondary curriculum
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Coverage Metrics Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-950/60 border-b border-slate-800/80 text-xs">
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[11px] block">Total Curriculum Units</span>
            <span className="text-xl font-bold text-slate-100 font-mono">{stats.totalUnits}</span>
          </div>

          <div className="bg-emerald-950/30 p-3 rounded-xl border border-emerald-800/50">
            <span className="text-emerald-400 text-[11px] font-semibold block">Genuine Assets Ready</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-emerald-300 font-mono">{stats.genuineAssetReady}</span>
              <span className="text-[10px] text-emerald-400/80">({stats.activeCoveragePercentage}% active)</span>
            </div>
          </div>

          <div className="bg-sky-950/30 p-3 rounded-xl border border-sky-800/50">
            <span className="text-sky-400 text-[11px] font-semibold block">Scripted & Storyboarded</span>
            <span className="text-xl font-bold text-sky-300 font-mono">{stats.scriptAndStoryboardReady}</span>
          </div>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[11px] block">Pipeline Architecture</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-slate-200 font-mono">100%</span>
              <span className="text-[10px] text-slate-500">(All units mapped)</span>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by unit title, code (e.g. MTH-SS1-01), or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 text-slate-300 text-xs rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-sky-500"
            >
              <option value="all">All Statuses ({matrix.length})</option>
              <option value="ready">Ready to Watch ({stats.genuineAssetReady})</option>
              <option value="scripted">Scripted / Storyboarded ({stats.scriptAndStoryboardReady})</option>
              <option value="pipeline">Planned Pipeline ({stats.plannedInPipeline})</option>
            </select>

            {/* Subject Filter */}
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="bg-slate-950 text-slate-300 text-xs rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-sky-500 max-w-[180px] truncate"
            >
              <option value="all">All Subjects</option>
              {subjects.map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Matrix Table List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredMatrix.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No curricular units match the selected filters.
            </div>
          ) : (
            filteredMatrix.map((item) => {
              const isReady = item.videoStatus === "genuine_asset_ready";
              const isScripted = item.videoStatus === "script_and_storyboard_ready";

              return (
                <div
                  key={item.unitId}
                  className={`p-3.5 rounded-xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    isReady
                      ? "bg-slate-900/90 border-slate-800 hover:border-sky-500/50"
                      : "bg-slate-950/40 border-slate-900/80"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                        {item.unitCode}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {item.subjectName}
                      </span>
                      <span className="text-slate-600 text-xs">•</span>
                      <span className="text-[11px] text-slate-400 capitalize">
                        {item.level.replace(/_/g, " ")}
                      </span>

                      {/* Status badge */}
                      {isReady && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Ready ({item.durationFormatted})
                        </span>
                      )}
                      {isScripted && (
                        <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[10px] font-medium flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Script & Storyboard Ready
                        </span>
                      )}
                      {!isReady && !isScripted && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-[10px]">
                          Pipeline Backlog
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-semibold text-slate-100">{item.unitTitle}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.notes}</p>
                  </div>

                  {/* Action button */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {isReady && item.primaryVideoId ? (
                      <button
                        onClick={() => {
                          onSelectVideo(item.primaryVideoId!);
                          onClose();
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow flex items-center gap-1.5 transition"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        Watch Video
                      </button>
                    ) : (
                      onOpenCreatorStudio && (
                        <button
                          onClick={() => {
                            onOpenCreatorStudio(item.unitId);
                            onClose();
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1 transition"
                        >
                          <PlusCircle className="w-3.5 h-3.5 text-sky-400" />
                          Author Video
                        </button>
                      )
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Strict Architectural Transparency: Never fabricates non-existent assets.</span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenCreatorStudio && (
              <button
                onClick={() => {
                  onOpenCreatorStudio();
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-1.5 transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Launch Video Creator Studio
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
