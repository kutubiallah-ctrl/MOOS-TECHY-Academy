/**
 * MOOS ACADEMY — MFA SETTINGS CARD COMPONENT
 * 
 * TASK ID: MOOS-SECURITY-002
 * 
 * Displays current user MFA enrollment status, AAL level, remaining single-use
 * backup recovery codes, and buttons to reconfigure or regenerate recovery keys.
 */

import React, { useState } from "react";
import { Shield, ShieldCheck, ShieldAlert, Key, QrCode, RefreshCw } from "lucide-react";
import { mfaService } from "../../services/mfaService";
import { MfaProfile } from "../../types/mfa";
import { MfaModal } from "./MfaModal";

export interface MfaSettingsCardProps {
  userId: string;
  userEmail: string;
}

export const MfaSettingsCard: React.FC<MfaSettingsCardProps> = ({ userId, userEmail }) => {
  const [profile, setProfile] = useState<MfaProfile | null>(() => mfaService.getMfaProfile(userId));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"ENROLL" | "CHALLENGE" | "RECOVERY">("ENROLL");

  const hasAssurance = mfaService.hasActiveAssurance(userId);

  const handleOpenEnrollment = () => {
    setModalMode("ENROLL");
    setIsModalOpen(true);
  };

  const handleOpenChallenge = () => {
    setModalMode("CHALLENGE");
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setProfile(mfaService.getMfaProfile(userId));
    setIsModalOpen(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
            profile?.isEnrolled
              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
              : "bg-amber-50 text-amber-600 border border-amber-200"
          }`}>
            {profile?.isEnrolled ? <ShieldCheck className="h-6 w-6" /> : <Shield className="h-6 w-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">Multi-Factor Authentication (MFA)</h3>
              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                profile?.isEnrolled
                  ? hasAssurance
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}>
                {profile?.isEnrolled ? (hasAssurance ? "AAL2 Active" : "Enrolled (Standby)") : "Not Configured"}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Default Second Factor: RFC 6238 Standard TOTP (Google Authenticator / Authy / Microsoft)
            </p>
          </div>
        </div>

        {profile?.isEnrolled ? (
          <button
            onClick={handleOpenEnrollment}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reconfigure TOTP
          </button>
        ) : (
          <button
            onClick={handleOpenEnrollment}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition shadow-sm"
          >
            <QrCode className="h-3.5 w-3.5 text-amber-400" />
            Set Up Authenticator
          </button>
        )}
      </div>

      {profile?.isEnrolled && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-100 pt-4">
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
            <span className="text-[10px] font-bold uppercase text-slate-400">Factor Type</span>
            <p className="text-xs font-bold text-slate-800 mt-0.5">TOTP Authenticator App</p>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
            <span className="text-[10px] font-bold uppercase text-slate-400">Assurance Level</span>
            <p className="text-xs font-bold text-slate-800 mt-0.5">{hasAssurance ? "AAL2 Verified" : "AAL1 Session"}</p>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
            <span className="text-[10px] font-bold uppercase text-slate-400">Single-Use Backup Codes</span>
            <p className="text-xs font-bold text-slate-800 mt-0.5 flex items-center gap-1">
              <Key className="h-3.5 w-3.5 text-amber-500" />
              {profile.remainingRecoveryCodes ?? 10} codes remaining
            </p>
          </div>
        </div>
      )}

      {isModalOpen && (
        <MfaModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          targetUserId={userId}
          targetUserEmail={userEmail}
          mode={modalMode}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};
