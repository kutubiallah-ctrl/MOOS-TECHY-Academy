import React, { useState } from "react";
import {
  Users,
  Compass,
  Award,
  ChevronRight,
  CheckCircle2,
  Trophy,
  Sparkles,
  BookOpen,
  Wrench,
  Flame,
  X,
  Share2,
  Target
} from "lucide-react";
import { ClubDefinition, ClubId, ClubCycleStage, CLUB_CYCLE_STAGES } from "../types/clubs";
import { clubsService } from "../services/clubsService";

interface ClubsModalProps {
  isOpen: boolean;
  onClose: () => void;
  learnerId: string;
}

export const ClubsModal: React.FC<ClubsModalProps> = ({ isOpen, onClose, learnerId }) => {
  const allClubs = clubsService.getAllClubs();
  const [selectedClubId, setSelectedClubId] = useState<ClubId>(allClubs[0].id);
  const [reflectionInput, setReflectionInput] = useState("");
  const [projectTitleInput, setProjectTitleInput] = useState("");
  const [projectNotesInput, setProjectNotesInput] = useState("");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  if (!isOpen) return null;

  const currentClub = allClubs.find((c) => c.id === selectedClubId) || allClubs[0];
  const progress = clubsService.getLearnerProgress(learnerId, currentClub.id);

  const isJoined = Boolean(progress);
  const currentStage: ClubCycleStage = progress ? progress.currentStage : "JOIN";
  const currentStageIndex = CLUB_CYCLE_STAGES.indexOf(currentStage);

  const handleJoin = () => {
    clubsService.joinClub(learnerId, currentClub.id);
    setRefreshKey((k) => k + 1);
  };

  const handleAdvance = () => {
    clubsService.advanceStage(
      learnerId,
      currentClub.id,
      undefined,
      reflectionInput || undefined
    );
    setReflectionInput("");
    setRefreshKey((k) => k + 1);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitleInput) return;

    clubsService.submitProject(learnerId, currentClub.id, {
      projectId: currentClub.activeProjects[0]?.id || "proj_generic",
      submissionTitle: projectTitleInput,
      submissionContent: projectNotesInput
    });

    setProjectTitleInput("");
    setProjectNotesInput("");
    setShowSubmitModal(false);
    setRefreshKey((k) => k + 1);
  };

  const handleEnterCompetition = (compId: string) => {
    clubsService.enterCompetition(learnerId, currentClub.id, compId);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">
                MOOS Academy • Co-Curricular Clubs
              </span>
              <h2 className="text-lg font-bold text-white">Active Co-Curricular & Skills Life Cycle</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Club Selector Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-4 overflow-x-auto gap-2 py-2">
          {allClubs.map((club) => {
            const isSelected = club.id === selectedClubId;
            const clubProgress = clubsService.getLearnerProgress(learnerId, club.id);
            return (
              <button
                key={club.id}
                type="button"
                onClick={() => setSelectedClubId(club.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <span>{club.name.split(" ")[0]}</span>
                {clubProgress && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/30 font-semibold">
                    {clubProgress.currentStage}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Club Hero Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {currentClub.category}
                </span>
                <h3 className="text-xl font-black text-white mt-1.5">{currentClub.name}</h3>
                <p className="text-xs text-amber-300 italic font-medium mt-0.5">"{currentClub.motto}"</p>
              </div>

              {!isJoined ? (
                <button
                  type="button"
                  onClick={handleJoin}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-600/30 flex items-center gap-2 transition cursor-pointer self-start sm:self-auto"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Enlist in Club (Stage 1: JOIN)</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-2 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Active Member • Stage: {currentStage}</span>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{currentClub.description}</p>
            <div className="flex flex-wrap gap-4 pt-1 text-[11px] text-slate-400 border-t border-slate-800/80">
              <span>
                <strong className="text-slate-300">Patron Lead:</strong> {currentClub.patronTeacherName}
              </span>
              <span>
                <strong className="text-slate-300">Active Students:</strong> {currentClub.membersCount}
              </span>
              <span>
                <strong className="text-slate-300">Aligned Domains:</strong>{" "}
                {currentClub.curriculumDomains.join(", ")}
              </span>
            </div>
          </div>

          {/* 9-Stage Cycle Pipeline */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-400" />
                <span>9-Stage Active Learner Co-Curricular Cycle</span>
              </h4>
              <span className="text-[11px] text-slate-400">
                Stage {currentStageIndex + 1} of 9: <strong className="text-amber-400">{currentStage}</strong>
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5 bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
              {CLUB_CYCLE_STAGES.map((st, idx) => {
                const isPassed = progress?.completedStages.includes(st);
                const isCurrent = progress?.currentStage === st;
                return (
                  <div
                    key={st}
                    className={`p-2 rounded-xl text-center border transition flex flex-col items-center justify-center min-h-[56px] ${
                      isCurrent
                        ? "bg-amber-500/20 border-amber-500 text-amber-300 font-black shadow-sm"
                        : isPassed
                        ? "bg-emerald-950/40 border-emerald-800 text-emerald-300 font-bold"
                        : "bg-slate-900/40 border-slate-800 text-slate-500"
                    }`}
                  >
                    <span className="text-[9px] block opacity-75">{idx + 1}</span>
                    <span className="text-[10px] uppercase tracking-tight">{st}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Stage Interactive Card */}
          {isJoined && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Flame className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="text-[10px] text-amber-400 uppercase font-bold block">Current Active Mission</span>
                    <h4 className="text-sm font-bold text-white">
                      {currentClub.stageGuidance[currentStage]?.title || currentStage}
                    </h4>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAdvance}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-amber-600/20"
                >
                  <span>{currentClub.stageGuidance[currentStage]?.actionLabel || "Advance Stage"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                {currentClub.stageGuidance[currentStage]?.prompt}
              </p>

              {/* Reflection & Project Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="text"
                  placeholder="Optional: Record engineering / observational debrief note..."
                  value={reflectionInput}
                  onChange={(e) => setReflectionInput(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 text-xs rounded-xl p-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />

                <button
                  type="button"
                  onClick={() => setShowSubmitModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
                >
                  <Wrench className="w-3.5 h-3.5 text-amber-400" />
                  <span>Submit Project Artifact</span>
                </button>
              </div>
            </div>
          )}

          {/* Active Projects & Competitions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Active Project Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-sky-400" />
                  <span>Featured Club Project</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                  {currentClub.activeProjects[0]?.deliverableType}
                </span>
              </div>

              {currentClub.activeProjects[0] && (
                <div className="space-y-2">
                  <h5 className="text-sm font-bold text-white">{currentClub.activeProjects[0].title}</h5>
                  <p className="text-xs text-slate-400">{currentClub.activeProjects[0].description}</p>
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Required Milestones:</span>
                    {currentClub.activeProjects[0].milestones.map((m, i) => (
                      <div key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Active Competition Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Championship / Olympiad</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                  {currentClub.activeCompetitions[0]?.status}
                </span>
              </div>

              {currentClub.activeCompetitions[0] && (
                <div className="space-y-2">
                  <h5 className="text-sm font-bold text-white">{currentClub.activeCompetitions[0].title}</h5>
                  <p className="text-xs text-slate-400">{currentClub.activeCompetitions[0].description}</p>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-amber-300">
                    <strong>Award:</strong> {currentClub.activeCompetitions[0].awardTier}
                  </div>
                  {isJoined && (
                    <button
                      type="button"
                      onClick={() => handleEnterCompetition(currentClub.activeCompetitions[0].id)}
                      className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Target className="w-3.5 h-3.5" />
                      <span>
                        {progress?.competitionsEntered.includes(currentClub.activeCompetitions[0].id)
                          ? "Registered for Arena"
                          : "Register for Competition"}
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Project Submission Submodal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl max-w-md w-full space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">Submit Project Artifact</h4>
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleProjectSubmit} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Artifact Title:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Solar LED Emergency Lamp v1"
                    value={projectTitleInput}
                    onChange={(e) => setProjectTitleInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Specifications & Working Notes:</label>
                  <textarea
                    rows={4}
                    placeholder="Document schematics, measured battery voltage, lumen test, or GitHub repository URL..."
                    value={projectNotesInput}
                    onChange={(e) => setProjectNotesInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md"
                  >
                    Submit for Patron Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
