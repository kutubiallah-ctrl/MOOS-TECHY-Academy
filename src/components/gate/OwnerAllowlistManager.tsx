/**
 * MOOS ACADEMY — OWNER ALLOWLIST MANAGER (AUTHENTICATED OWNER-ONLY VIEW)
 *
 * Strictly protected behind server-verified Owner Bearer Token authentication.
 * Zero owner emails or directory data are embedded in client bundles.
 */

import React, { useEffect, useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  UserPlus,
  Trash2,
  Power,
  RefreshCw,
  Search,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { emailAllowlistService } from "../../services/emailAllowlistService";
import { AllowlistEntry, AllowlistRole, AllowlistStatus } from "../../types/emailAllowlist";

export interface OwnerAllowlistManagerProps {
  currentOwnerEmail: string;
  onClose?: () => void;
}

export const OwnerAllowlistManager: React.FC<OwnerAllowlistManagerProps> = ({
  currentOwnerEmail,
  onClose
}) => {
  const [entries, setEntries] = useState<AllowlistEntry[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<AllowlistRole>("learner");
  const [newNotes, setNewNotes] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [pendingRemoveEmail, setPendingRemoveEmail] = useState<string | null>(null);

  const isOwner = emailAllowlistService.isActiveSessionOwner();

  const handleRefresh = async () => {
    if (!isOwner) return;
    setIsLoading(true);
    const res = await emailAllowlistService.fetchDirectoryEntries();
    if (res.success && res.entries) {
      setEntries(res.entries);
    } else if (!res.success) {
      setFeedback({ type: "error", message: res.message });
    }
    setPendingRemoveEmail(null);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOwner) {
      handleRefresh();
    }
  }, [isOwner]);

  if (!isOwner) {
    return (
      <div className="rounded-2xl bg-white border border-red-200 shadow-sm p-8 text-center space-y-3">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-200">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900">403 — Restricted Institutional Governance</h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Directory management and account governance require an active server-verified Academy Owner session.
        </p>
      </div>
    );
  }

  const handleInsertEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const result = await emailAllowlistService.insertEmailRemote(newEmail, newRole, newNotes);
    if (result.success) {
      setFeedback({ type: "success", message: result.message });
      setNewEmail("");
      setNewNotes("");
      await handleRefresh();
    } else {
      setFeedback({ type: "error", message: result.message });
    }
  };

  const handleToggleStatus = async (targetEmail: string, currentStatus: AllowlistStatus) => {
    const nextStatus: AllowlistStatus = currentStatus === "ENABLED" ? "DISABLED" : "ENABLED";
    const result = await emailAllowlistService.setStatusRemote(targetEmail, nextStatus);
    if (result.success) {
      setFeedback({ type: "success", message: result.message });
      await handleRefresh();
    } else {
      setFeedback({ type: "error", message: result.message });
    }
  };

  const handleRemoveEmail = async (targetEmail: string) => {
    const result = await emailAllowlistService.removeEmailRemote(targetEmail);
    if (result.success) {
      setFeedback({ type: "success", message: result.message });
      setPendingRemoveEmail(null);
      await handleRefresh();
    } else {
      setFeedback({ type: "error", message: result.message });
    }
  };

  const filteredEntries = entries.filter(
    (e) =>
      e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.notes && e.notes.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Owner User Directory &amp; Governance</h3>
            <p className="text-xs text-slate-500">
              Server-verified account directory and access status governance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
            Signed in: <code className="font-mono text-slate-900 font-bold">{currentOwnerEmail}</code>
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {feedback && (
        <div
          className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <form onSubmit={handleInsertEmail} className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
          <UserPlus className="h-4 w-4 text-amber-600" />
          <span>AUTHORIZE INSTITUTIONAL ACCOUNT</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6">
            <input
              type="email"
              placeholder="user@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as AllowlistRole)}
              className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            >
              <option value="learner">Role: Learner</option>
              <option value="teacher">Role: Teacher</option>
              <option value="admin">Role: Admin</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold py-2 px-3 hover:bg-slate-800 transition shadow-sm"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>Authorize Email</span>
            </button>
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Optional notes (e.g. Grade 11 STEM Scholar, Faculty Lead)"
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
            className="w-full text-xs rounded-lg border border-slate-200 px-3 py-1.5 text-slate-700 bg-white focus:outline-none focus:border-amber-400"
          />
        </div>
      </form>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search directory by email or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
          >
            <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-2.5">Email Address</th>
                <th className="px-4 py-2.5">Role</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5">Notes</th>
                <th className="px-4 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEntries.map((entry) => {
                const isDesignatedOwner = entry.role === "owner";
                return (
                  <tr key={entry.normalizedEmail} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span>{entry.email}</span>
                        {isDesignatedOwner && (
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                            Owner
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize text-slate-700 font-medium">{entry.role}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          entry.status === "ENABLED"
                            ? "bg-emerald-100 text-emerald-800"
                            : entry.status === "DISABLED"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-[11px] max-w-xs truncate">
                      {entry.notes || "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {!isDesignatedOwner && (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleToggleStatus(entry.normalizedEmail, entry.status)}
                            title={entry.status === "ENABLED" ? "Disable Access" : "Enable Access"}
                            className={`p-1.5 rounded-lg border transition ${
                              entry.status === "ENABLED"
                                ? "text-amber-600 border-amber-200 hover:bg-amber-50"
                                : "text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                            }`}
                          >
                            <Power className="h-3.5 w-3.5" />
                          </button>
                          {pendingRemoveEmail === entry.normalizedEmail ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleRemoveEmail(entry.normalizedEmail)}
                                className="px-2 py-1 text-[11px] font-bold rounded bg-red-600 text-white hover:bg-red-700 transition"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setPendingRemoveEmail(null)}
                                className="px-2 py-1 text-[11px] font-semibold rounded bg-slate-200 text-slate-700 hover:bg-slate-300 transition"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setPendingRemoveEmail(entry.normalizedEmail)}
                              title="Remove from Directory"
                              className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
