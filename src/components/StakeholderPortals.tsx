import React, { useState } from "react";
import {
  Users,
  Heart,
  AlertCircle,
  CheckCircle2,
  Send,
  Sparkles,
  TrendingUp,
  Clock,
  Award,
  BookOpen,
  Calendar,
  Layers,
  Flame,
  ShieldCheck
} from "lucide-react";
import { TEACHER_INTERVENTIONS } from "../data/curriculumData";
import { TeacherIntervention } from "../types/curriculum";
import { useLearner } from "../context/LearnerContext";

interface StakeholderPortalsProps {
  activeTab: "teacher" | "parent";
  onSwitchTab: (tab: "teacher" | "parent") => void;
}

export const StakeholderPortals: React.FC<StakeholderPortalsProps> = ({
  activeTab,
  onSwitchTab
}) => {
  const { profile, metrics, activeUnit } = useLearner();
  const [interventions, setInterventions] = useState<TeacherIntervention[]>(TEACHER_INTERVENTIONS);
  const [parentEncouragement, setParentEncouragement] = useState("");
  const [sentEncouragement, setSentEncouragement] = useState(false);
  const [selectedClass, setSelectedClass] = useState("SSS 2 Science & Math (Set A)");

  const handleResolveIntervention = (studentId: string) => {
    setInterventions((prev) =>
      prev.map((item) =>
        item.studentId === studentId
          ? { ...item, status: item.status === "pending" ? "addressed" : "pending" }
          : item
      )
    );
  };

  const handleSendEncouragement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentEncouragement.trim()) return;
    setSentEncouragement(true);
    setParentEncouragement("");
    setTimeout(() => setSentEncouragement(false), 3500);
  };

  return (
    <div id="stakeholder-portals-view" className="space-y-6 max-w-6xl mx-auto">
      {/* Portal Switcher Tabs */}
      <div className="flex items-center justify-center">
        <div className="inline-flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200">
          <button
            id="tab-teacher-portal"
            type="button"
            onClick={() => onSwitchTab("teacher")}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "teacher"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Teacher & Instructor Portal</span>
          </button>
          <button
            id="tab-parent-portal"
            type="button"
            onClick={() => onSwitchTab("parent")}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "parent"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Heart className="h-4 w-4 text-rose-400" />
            <span>Parent Oversight & Visibility</span>
          </button>
        </div>
      </div>

      {/* TEACHER PORTAL */}
      {activeTab === "teacher" && (
        <div className="space-y-6">
          {/* Teacher Banner */}
          <div className="rounded-3xl bg-slate-900 text-white p-7 shadow-xl border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">
                  Instructor Command Center
                </span>
                <h2 className="text-2xl font-bold">Class Analytics & Diagnostic Interventions</h2>
                <p className="text-xs text-slate-300">
                  Active Class: <strong className="text-white">{selectedClass}</strong> • 34 Enrolled Students
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 px-4 py-2 text-center backdrop-blur-xs">
                  <div className="text-[10px] text-indigo-200 uppercase font-semibold">Class Avg Mastery</div>
                  <div className="text-lg font-bold text-amber-300">76% Proficient</div>
                </div>
                <div className="rounded-2xl bg-white/10 px-4 py-2 text-center backdrop-blur-xs">
                  <div className="text-[10px] text-indigo-200 uppercase font-semibold">Active Alerts</div>
                  <div className="text-lg font-bold text-rose-400">
                    {interventions.filter((i) => i.status === "pending").length} Needs Action
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnostic Intervention Alerts Table */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-rose-500" />
                <h3 className="font-bold text-slate-900 text-base">
                  Targeted Student Diagnostic Interventions
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                AI Detected Misconceptions & Low-Accuracy Trends
              </span>
            </div>

            <div className="space-y-3">
              {interventions.map((item) => (
                <div
                  key={item.studentId}
                  className={`rounded-xl border p-4 transition flex flex-wrap items-center justify-between gap-4 ${
                    item.status === "pending"
                      ? "border-rose-200 bg-rose-50/40"
                      : "border-emerald-200 bg-emerald-50/30 opacity-75"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{item.studentName}</span>
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {item.unitName}
                      </span>
                    </div>
                    <div className="text-xs text-slate-700">
                      <strong>Identified Weakness:</strong> {item.strugglingSkill} (Accuracy: {item.accuracyRate}%)
                    </div>
                    <div className="text-xs text-indigo-700 font-medium">
                      💡 <strong>Pedagogical Advice:</strong> {item.suggestedAction}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleResolveIntervention(item.studentId)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border transition ${
                      item.status === "pending"
                        ? "bg-white border-rose-300 text-rose-700 hover:bg-rose-100"
                        : "bg-emerald-600 text-white border-emerald-600"
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{item.status === "pending" ? "Mark Intervened" : "Resolved"}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Curriculum Assigner */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-base">Quick Skill Assignment Dispatched</h3>
            </div>
            <p className="text-xs text-slate-500">
              Assign targeted Socratic exercises to your class roster with automatic mastery grading.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <select className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:outline-none">
                <option>Quadratic Factorization & Roots (10 Questions)</option>
                <option>Trigonometry & Three-Figure Bearings (8 Questions)</option>
                <option>Fraction Operations & Reciprocals (5 Questions)</option>
              </select>
              <button
                type="button"
                onClick={() => alert("Assigned module to SSS 2 Math Class with automated diagnostic tracking!")}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition"
              >
                Dispatch to 34 Students
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PARENT PORTAL */}
      {activeTab === "parent" && (
        <div className="space-y-6">
          {/* Parent Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white p-7 shadow-xl border border-indigo-800/60">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                  Parent Learning Oversight
                </span>
                <h2 className="text-2xl font-bold">
                  Progress Report for {profile.name}
                </h2>
                <p className="text-xs text-indigo-200">
                  Target: {profile.targetLevel.replace("_", " ")} • Real-time curriculum transparency & safety
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3.5 py-1.5 text-xs text-emerald-300 font-semibold">
                <ShieldCheck className="h-4 w-4" />
                <span>Pedagogical Safety Verified</span>
              </div>
            </div>
          </div>

          {/* Weekly Vital Metrics */}
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase">
                <Clock className="h-4 w-4 text-indigo-600" />
                <span>Weekly Time</span>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2">
                {metrics.weeklyMinutes} mins
              </div>
              <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
                Active study logged
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase">
                <Award className="h-4 w-4 text-amber-500" />
                <span>Mastered Skills</span>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2">
                {metrics.masteryDistribution.mastered} Concepts
              </div>
              <div className="text-[11px] text-indigo-600 font-medium mt-0.5">
                100% verified mastery
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase">
                <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span>Study Streak</span>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2">
                {profile.streak?.count || 1} Days
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                Unbroken daily habit
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <span>Pacing Status</span>
              </div>
              <div className="text-2xl font-black text-emerald-700 mt-2">
                {metrics.completionPercentage > 50 ? "Ahead of Schedule" : "On Track"}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                Target: {profile.curriculum}
              </div>
            </div>
          </div>

          {/* Socratic AI Quality Assurance & Encouragement Notes */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* AI Tutor Quality Transparency */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-950">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span>AI Tutor Interaction Quality Check</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tutor Moos operates strictly under the <strong>Socratic Method</strong>. It prompts your child with guided sub-steps and questions rather than revealing final answers, developing critical thinking and resilience.
              </p>
              <div className="rounded-xl bg-white p-3 border border-indigo-100 text-xs text-indigo-900">
                <strong>Status:</strong> Active & Calibrated for {profile.targetLevel.replace("_", " ")}
              </div>
            </div>

            {/* Send Encouragement Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Heart className="h-4 w-4 text-rose-500" />
                <span>Send Encouragement Note to {profile.name}</span>
              </div>

              {sentEncouragement ? (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Encouragement delivered to your child's learning dashboard!</span>
                </div>
              ) : (
                <form onSubmit={handleSendEncouragement} className="space-y-3">
                  <input
                    type="text"
                    value={parentEncouragement}
                    onChange={(e) => setParentEncouragement(e.target.value)}
                    placeholder="e.g. So proud of your math streak! Keep up the great work!"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Note</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
