import React, { useState } from "react";
import {
  X,
  User,
  GraduationCap,
  BookOpen,
  Award,
  Calendar,
  History,
  RotateCcw,
  Save,
  CheckCircle2,
  Sparkles,
  Flame,
  Clock,
  Target,
  Globe,
  Database
} from "lucide-react";
import { useLearner } from "../context/LearnerContext";
import {
  EducationalLevel,
  CurriculumStandard,
  CountryCode,
  EducationSystemCode
} from "../types/curriculum";
import { AcademicContext } from "../types/learner";
import { curriculumService } from "../services/curriculumService";
import { BackupRestoreModal } from "./BackupRestoreModal";

interface LearnerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LearnerProfileModal: React.FC<LearnerProfileModalProps> = ({
  isOpen,
  onClose
}) => {
  const { profile, updateProfileInfo, resetToDefaultProfile } = useLearner();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [targetLevel, setTargetLevel] = useState<EducationalLevel>(profile.targetLevel);
  const [curriculum, setCurriculum] = useState<CurriculumStandard>(profile.curriculum);
  const [country, setCountry] = useState<CountryCode>(profile.academicContext?.country || "NG");
  const [educationSystem, setEducationSystem] = useState<EducationSystemCode>(
    profile.academicContext?.educationSystem || "WAEC"
  );
  const [gradeOrYear, setGradeOrYear] = useState<string>(
    profile.academicContext?.gradeOrYear || "SSS 2"
  );
  const [activeTab, setActiveTab] = useState<"settings" | "activity" | "attempts">("settings");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);

  const supportedSystems = curriculumService.getSupportedEducationSystems();

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedContext: AcademicContext = {
      country,
      educationSystem,
      gradeOrYear,
      targetExamPathway: profile.academicContext?.targetExamPathway || "WAEC WASSCE & JAMB UTME",
      jurisdiction: profile.academicContext?.jurisdiction || "Federal/National"
    };

    await updateProfileInfo({
      name,
      email,
      targetLevel,
      curriculum,
      academicContext: updatedContext
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handleReset = async () => {
    if (confirm("Reset learner state back to default demonstration benchmark?")) {
      await resetToDefaultProfile();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white font-bold">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Learner Profile & Academic Settings</h2>
              <p className="text-xs text-slate-500">Manage academic pathway, target exams, and review history</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-100 bg-white">
          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`pb-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === "settings"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Target className="h-3.5 w-3.5" />
            <span>Academic Target & Details</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("activity")}
            className={`pb-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === "activity"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <History className="h-3.5 w-3.5" />
            <span>Activity Log ({profile.activityHistory?.length || 0})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("attempts")}
            className={`pb-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === "attempts"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            <span>Question Attempts ({profile.questionAttempts?.length || 0})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === "settings" && (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Learner Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Educational Level</label>
                  <select
                    value={targetLevel}
                    onChange={(e) => setTargetLevel(e.target.value as EducationalLevel)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none"
                  >
                    <option value="primary_foundations">Primary Foundations (Pri 1-3)</option>
                    <option value="upper_primary">Upper Primary (Pri 4-6 / NCEE)</option>
                    <option value="junior_secondary">Junior Secondary (JSS 1-3 / BECE)</option>
                    <option value="senior_secondary">Senior Secondary (SSS 1-3 / WAEC / JAMB)</option>
                    <option value="university_prep">University & Advanced STEM Prep</option>
                    <option value="exam_prep">Exam Prep Intensive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary Exam Target</label>
                  <select
                    value={curriculum}
                    onChange={(e) => setCurriculum(e.target.value as CurriculumStandard)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none"
                  >
                    <option value="WAEC_WASSCE">WAEC / WASSCE Standard</option>
                    <option value="JAMB_UTME">JAMB UTME CBT Standard</option>
                    <option value="NERDC_NIGERIAN">NERDC Nigerian National Curriculum</option>
                    <option value="CAMBRIDGE_IGCSE">Cambridge IGCSE Extended Math</option>
                    <option value="COMMON_ENTRANCE">National Common Entrance (NCEE)</option>
                    <option value="GLOBAL_STEM">Global STEM Advanced</option>
                  </select>
                </div>
              </div>

              {/* International Academic Context */}
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-indigo-600" />
                  <span className="text-xs font-bold text-slate-900">
                    Universal Curriculum & Jurisdiction Alignment
                  </span>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Country Jurisdiction</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value as CountryCode)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
                    >
                      <option value="NG">🇳🇬 Nigeria (Federal & States)</option>
                      <option value="GB">🇬🇧 United Kingdom (England & Wales)</option>
                      <option value="US">🇺🇸 United States (CCSS)</option>
                      <option value="INTL">🌍 International / Cambridge</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Curriculum System</label>
                    <select
                      value={educationSystem}
                      onChange={(e) => setEducationSystem(e.target.value as EducationSystemCode)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
                    >
                      {supportedSystems.map((s) => (
                        <option key={s.code} value={s.code}>
                          {s.defaultFlagEmoji} {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Academic Grade / Form</label>
                    <input
                      type="text"
                      value={gradeOrYear}
                      onChange={(e) => setGradeOrYear(e.target.value)}
                      placeholder="e.g. SSS 2, Year 11, Grade 10"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Learning Goals */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 space-y-2">
                <span className="text-xs font-bold text-slate-800 block">Active Learning Goals</span>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  {profile.learningGoals?.map((goal, idx) => (
                    <li key={idx}>{goal}</li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-800 transition"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset Demo State</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsBackupModalOpen(true)}
                    className="flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl border border-indigo-200/80 transition"
                  >
                    <Database className="h-3.5 w-3.5 text-indigo-600" />
                    <span>Backup & Export Data</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {saveSuccess && (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Updated Profile!</span>
                    </span>
                  )}
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs transition"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Academic Settings</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeTab === "activity" && (
            <div className="space-y-3">
              {profile.activityHistory && profile.activityHistory.length > 0 ? (
                profile.activityHistory.map((act) => (
                  <div
                    key={act.id}
                    className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{act.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(act.timestamp).toLocaleDateString()} {new Date(act.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{act.description}</p>
                    <div className="flex items-center gap-2 text-[10px] text-indigo-700 font-semibold pt-1">
                      <span>+{act.pointsEarned} Mastery Pts</span>
                      <span>•</span>
                      <span>+{act.xpEarned} XP</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">No activity logged yet.</div>
              )}
            </div>
          )}

          {activeTab === "attempts" && (
            <div className="space-y-3">
              {profile.questionAttempts && profile.questionAttempts.length > 0 ? (
                profile.questionAttempts.map((att) => (
                  <div
                    key={att.id}
                    className={`rounded-xl border p-3.5 text-xs space-y-1 ${
                      att.isCorrect
                        ? "border-emerald-200 bg-emerald-50/30"
                        : "border-rose-200 bg-rose-50/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">
                        {att.isCorrect ? "Correct Solution" : "Incorrect Attempt"} • {att.skillId}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(att.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <div className="text-slate-600">
                      Chosen: <strong className="font-mono text-slate-800">{att.selectedOption}</strong> • Hints Used: {att.hintsUsedCount} • Time: {att.timeSpentSeconds}s
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">No question attempts recorded yet.</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Backup & Export Modal */}
      <BackupRestoreModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        defaultScope="learner_only"
      />
    </div>
  );
};
