import React, { useState, useRef } from "react";
import {
  X,
  Download,
  Upload,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  FileJson,
  RotateCcw,
  Clock,
  Layers,
  Database,
  ArrowRight,
  Info,
  Lock,
  User,
  GraduationCap
} from "lucide-react";
import { backupService } from "../services/backupService";
import {
  AcademyBackupEnvelope,
  BackupScope,
  BackupValidationResult,
  RestorePreview,
  SafetyRestoreSnapshot
} from "../types/backup";
import { useLearner } from "../context/LearnerContext";

interface BackupRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultScope?: BackupScope;
}

export const BackupRestoreModal: React.FC<BackupRestoreModalProps> = ({
  isOpen,
  onClose,
  defaultScope = "full_academy"
}) => {
  const { profile, updateProfileInfo } = useLearner();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<"export" | "import" | "safety">("export");
  const [exportScope, setExportScope] = useState<BackupScope>(defaultScope);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string | null>(null);

  // Import State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationResult, setValidationResult] = useState<BackupValidationResult | null>(null);
  const [restorePreview, setRestorePreview] = useState<RestorePreview | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [restoreSuccessMessage, setRestoreSuccessMessage] = useState<string | null>(null);
  const [restoreErrorMessage, setRestoreErrorMessage] = useState<string | null>(null);

  // Safety Snapshot State
  const [latestSnapshot, setLatestSnapshot] = useState<SafetyRestoreSnapshot | null>(
    backupService.getLatestSafetySnapshot()
  );
  const [isRollingBack, setIsRollingBack] = useState(false);
  const [rollbackMessage, setRollbackMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);
    setExportSuccessMessage(null);
    try {
      const envelope = await backupService.createBackup(exportScope, profile.id);
      const downloadInfo = backupService.downloadBackupFile(envelope);
      setExportSuccessMessage(`Downloaded "${downloadInfo.filename}" (${(downloadInfo.sizeBytes / 1024).toFixed(1)} KB)`);
    } catch (err: any) {
      console.error("Export error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setRestoreSuccessMessage(null);
    setRestoreErrorMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    try {
      const text = await file.text();
      const val = backupService.validateBackup(text);
      setValidationResult(val);

      if (val.isValid && val.envelope) {
        const preview = backupService.generateRestorePreview(val.envelope);
        setRestorePreview(preview);
      } else {
        setRestorePreview(null);
      }
    } catch (err: any) {
      setValidationResult({
        isValid: false,
        schemaVersion: 0,
        issues: [
          {
            severity: "error",
            code: "READ_ERROR",
            field: "file",
            message: `Could not read file: ${err?.message || "Unknown error"}`
          }
        ]
      });
      setRestorePreview(null);
    }
  };

  const handleExecuteRestore = async () => {
    if (!validationResult?.envelope) return;

    setIsRestoring(true);
    setRestoreSuccessMessage(null);
    setRestoreErrorMessage(null);

    try {
      const res = await backupService.executeRestore(validationResult.envelope);
      if (res.success) {
        setRestoreSuccessMessage(res.message);
        setLatestSnapshot(backupService.getLatestSafetySnapshot());
        // Trigger a lightweight refresh of context
        await updateProfileInfo({});
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        setRestoreErrorMessage(res.message || "Failed to restore backup.");
      }
    } catch (err: any) {
      setRestoreErrorMessage(`Restore exception: ${err?.message || "Execution failed"}`);
    } finally {
      setIsRestoring(false);
    }
  };

  const handleRollback = () => {
    setIsRollingBack(true);
    setRollbackMessage(null);
    try {
      const res = backupService.restoreFromSafetySnapshot();
      if (res.success) {
        setRollbackMessage(res.message);
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        setRollbackMessage(`Rollback failed: ${res.message}`);
      }
    } catch (err: any) {
      setRollbackMessage(`Rollback error: ${err?.message || "Failed"}`);
    } finally {
      setIsRollingBack(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Local Backup, Export & Disaster Recovery</h2>
              <p className="text-xs text-slate-500">Safeguard offline learning records, teacher cohorts, and assignments</p>
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-100 bg-white">
          <button
            type="button"
            onClick={() => setActiveTab("export")}
            className={`pb-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === "export"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Backup</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("import")}
            className={`pb-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === "import"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Import & Restore</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("safety")}
            className={`pb-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === "safety"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Safety Snapshot & Integrity</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* TAB 1: EXPORT */}
          {activeTab === "export" && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-indigo-50/60 border border-indigo-100 p-4 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                  <Info className="h-4 w-4 text-indigo-600 shrink-0" />
                  <span>Deterministic Local-First Export</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Generates a versioned JSON backup package containing your locally persisted mastery records, question attempts, diagnostic assessments, and classroom curricula.
                </p>
              </div>

              {/* Scope Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">Select Export Scope</label>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setExportScope("full_academy")}
                    className={`cursor-pointer p-4 rounded-2xl border transition select-none ${
                      exportScope === "full_academy"
                        ? "border-indigo-600 bg-indigo-50/40 shadow-xs"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <Database className="h-3.5 w-3.5 text-indigo-600" />
                        Full Academy Package
                      </span>
                      {exportScope === "full_academy" && (
                        <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Exports all learner mastery, diagnostic histories, Teacher Studio classrooms, assignments, and lesson plans.
                    </p>
                  </div>

                  <div
                    onClick={() => setExportScope("learner_only")}
                    className={`cursor-pointer p-4 rounded-2xl border transition select-none ${
                      exportScope === "learner_only"
                        ? "border-indigo-600 bg-indigo-50/40 shadow-xs"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-indigo-600" />
                        Learner Profile Only
                      </span>
                      {exportScope === "learner_only" && (
                        <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Exports only personal mastery points, question attempts, CBT exam submissions, and academic settings.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Summary Chips */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Current Local Records Ready for Backup</span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-xl text-slate-700 font-medium">
                    Learner: <strong>{profile.name}</strong>
                  </span>
                  <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-xl text-slate-700 font-medium">
                    Attempts: <strong>{profile.questionAttempts?.length || 0}</strong>
                  </span>
                  <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-xl text-slate-700 font-medium">
                    Mastery Skills: <strong>{Object.keys(profile.masteryRecords || {}).length}</strong>
                  </span>
                  <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-xl text-slate-700 font-medium">
                    Streak: <strong>{profile.streakDays}d</strong>
                  </span>
                </div>
              </div>

              {/* Export Success Banner */}
              {exportSuccessMessage && (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-center gap-2 text-xs text-emerald-800 font-medium animate-in fade-in duration-150">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{exportSuccessMessage}</span>
                </div>
              )}

              {/* Export Trigger Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleExport}
                  disabled={isExporting}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-3 shadow-md shadow-indigo-600/20 transition disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  <span>{isExporting ? "Generating Backup..." : "Download Versioned JSON Backup"}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: IMPORT & RESTORE */}
          {activeTab === "import" && (
            <div className="space-y-4">
              {/* File Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-3xl p-6 text-center cursor-pointer transition bg-slate-50/50 hover:bg-indigo-50/30 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <FileJson className="h-10 w-10 text-indigo-600 mx-auto mb-2 group-hover:scale-110 transition" />
                <span className="text-xs font-bold text-slate-800 block mb-0.5">
                  {selectedFile ? selectedFile.name : "Select or Drop MOOS JSON Backup File"}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  Supports versioned .json backups (schema version 1)
                </span>
              </div>

              {/* Validation Feedback */}
              {validationResult && (
                <div className="space-y-3">
                  {!validationResult.isValid ? (
                    <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-rose-800">
                        <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                        <span>Invalid Backup Structure</span>
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-rose-700">
                        {validationResult.issues.map((iss, idx) => (
                          <li key={idx}>
                            <strong>[{iss.code}]</strong> {iss.message}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>Backup Verified & Valid (Schema v{validationResult.schemaVersion})</span>
                      </div>
                      <p className="text-emerald-700 text-[11px]">
                        Scope: <strong>{validationResult.scope?.replace("_", " ")}</strong> • Application: MOOS Academy
                      </p>
                    </div>
                  )}

                  {/* Restore Preview */}
                  {restorePreview && (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
                      <span className="text-xs font-bold text-slate-800 block">Restore Manifest Preview</span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                        <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 block">Learner</span>
                          <span className="font-bold text-slate-800 truncate block">
                            {restorePreview.learnerName || "N/A"}
                          </span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 block">Question Attempts</span>
                          <span className="font-bold text-slate-800">{restorePreview.attemptsCount}</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 block">Mastery Skills</span>
                          <span className="font-bold text-slate-800">{restorePreview.masteryCount}</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 block">Classrooms</span>
                          <span className="font-bold text-slate-800">{restorePreview.classroomsCount}</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 block">Assignments</span>
                          <span className="font-bold text-slate-800">{restorePreview.assignmentsCount}</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 block">Lesson Plans</span>
                          <span className="font-bold text-slate-800">{restorePreview.lessonPlansCount}</span>
                        </div>
                      </div>

                      {/* Warnings */}
                      {restorePreview.warnings.length > 0 && (
                        <div className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-2.5 space-y-0.5">
                          {restorePreview.warnings.map((w, idx) => (
                            <p key={idx} className="flex items-start gap-1">
                              <span className="font-bold">•</span>
                              <span>{w}</span>
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Restore Execution Button */}
                      <button
                        type="button"
                        onClick={handleExecuteRestore}
                        disabled={isRestoring}
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-3 shadow-md shadow-indigo-600/20 transition disabled:opacity-50"
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span>{isRestoring ? "Applying Restore..." : "Confirm & Restore Local Application State"}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Status Message Feedback */}
              {restoreSuccessMessage && (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-center gap-2 text-xs text-emerald-800 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{restoreSuccessMessage} Reloading app...</span>
                </div>
              )}

              {restoreErrorMessage && (
                <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3.5 flex items-center gap-2 text-xs text-rose-800 font-medium">
                  <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                  <span>{restoreErrorMessage}</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SAFETY SNAPSHOT & INTEGRITY */}
          {activeTab === "safety" && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs space-y-2">
                <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Pre-Restore Rollback Protection
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Before applying any destructive restore operation, MOOS Academy creates a safety snapshot in local storage. If a restore was applied accidentally or contains erroneous records, you can roll back instantly.
                </p>
              </div>

              {latestSnapshot ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Latest Safety Snapshot</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(latestSnapshot.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Reason: <em>{latestSnapshot.reason}</em>
                  </p>

                  <button
                    type="button"
                    onClick={handleRollback}
                    disabled={isRollingBack}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2.5 transition disabled:opacity-50"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>{isRollingBack ? "Rolling back..." : "Roll Back to Safety Snapshot"}</span>
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
                  No pre-restore safety snapshot found. Snapshots are created automatically before each restore.
                </div>
              )}

              {rollbackMessage && (
                <div className="rounded-2xl bg-indigo-50 border border-indigo-200 p-3.5 text-xs text-indigo-800 font-medium">
                  {rollbackMessage}
                </div>
              )}

              {/* Shared Device & Privacy Guidance (Phase 14) */}
              <div className="rounded-2xl bg-amber-50/60 border border-amber-200/80 p-4 text-xs space-y-1.5">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-amber-700" />
                  Shared Device Notice
                </span>
                <p className="text-amber-800 leading-relaxed text-[11px]">
                  This application operates in <strong>local-first mode</strong>. Browser local storage does not cryptographically isolate multiple users sharing the same browser profile. Use "Export Backup" to save your personal progress before switching users or clearing browser cache.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-400">
          <span>MOOS Academy • Local-First Architecture</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-white transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
