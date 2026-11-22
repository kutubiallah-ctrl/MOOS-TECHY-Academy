/**
 * MOOS ACADEMY — MULTI-FACTOR AUTHENTICATION (MFA) MODAL
 * 
 * TASK ID: MOOS-SECURITY-002
 * 
 * Interactive UI implementing the full 8-step TOTP verification journey:
 * 1. Initiation & account context display
 * 2. Account ownership validation
 * 3. TOTP secret provisioning (QR code + Base32 manual entry)
 * 4. 6-digit code submission with real cryptographic verification
 * 5. Single-use Backup Recovery Codes delivery (10 codes, copy/download)
 * 6. Sign-in challenge / privileged role elevation challenge
 * 7. Rate limit cooldown display & error diagnostics
 * 8. Recovery code redemption fallback
 */

import React, { useState, useEffect } from "react";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Key,
  QrCode,
  Copy,
  Check,
  Download,
  AlertTriangle,
  Lock,
  ArrowRight,
  RefreshCw,
  X
} from "lucide-react";
import { mfaService } from "../../services/mfaService";
import {
  MfaProfile,
  TotpSecretProvision,
  MfaRateLimitStatus
} from "../../types/mfa";
import { auth } from "../../firebase";

export interface MfaModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUserId: string;
  targetUserEmail: string;
  mode: "ENROLL" | "CHALLENGE" | "RECOVERY" | "SETTINGS";
  onSuccess: (assuranceTicket?: any) => void;
  title?: string;
  description?: string;
}

export const MfaModal: React.FC<MfaModalProps> = ({
  isOpen,
  onClose,
  targetUserId,
  targetUserEmail,
  mode: initialMode,
  onSuccess,
  title,
  description
}) => {
  const [currentMode, setCurrentMode] = useState<"ENROLL" | "CHALLENGE" | "RECOVERY" | "SETTINGS">(initialMode);
  const [step, setStep] = useState<number>(1);
  const [provision, setProvision] = useState<TotpSecretProvision | null>(null);
  const [code, setCode] = useState<string>("");
  const [recoveryCodeInput, setRecoveryCodeInput] = useState<string>("");
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [copiedCodes, setCopiedCodes] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [rateLimit, setRateLimit] = useState<MfaRateLimitStatus>(() => mfaService.checkRateLimit(targetUserId));
  const [profile, setProfile] = useState<MfaProfile | null>(() => mfaService.getMfaProfile(targetUserId));

  useEffect(() => {
    setCurrentMode(initialMode);
    setErrorMessage(null);
    setCode("");
    setRecoveryCodeInput("");
    setRateLimit(mfaService.checkRateLimit(targetUserId));
    setProfile(mfaService.getMfaProfile(targetUserId));

    if (initialMode === "ENROLL") {
      setStep(1);
      initiateEnrollment();
    }
  }, [initialMode, targetUserId, isOpen]);

  if (!isOpen) return null;

  const initiateEnrollment = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      mfaService.initiateEnrollmentJourney(targetUserId, targetUserEmail);
      const validation = mfaService.validateAccountForMfa(targetUserId, targetUserEmail);
      if (!validation.isValid) {
        setErrorMessage(validation.reason || "Account validation failed.");
        setIsSubmitting(false);
        return;
      }

      const p = await mfaService.provisionTotpSecret(targetUserId, targetUserEmail, auth.currentUser);
      setProvision(p);
      setStep(2); // Move to QR & Secret Display
    } catch (e: any) {
      setErrorMessage(e?.message || "Failed to initiate TOTP provisioning.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyEnrollmentCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provision || !code || code.length < 6) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await mfaService.completeEnrollment(
        targetUserId,
        code,
        provision,
        auth.currentUser
      );

      setRecoveryCodes(result.recoveryCodes);
      setProfile(result.profile);
      setStep(3); // Move to Recovery Codes display
    } catch (err: any) {
      setErrorMessage(err?.message || "Verification code rejected. Please check your authenticator app.");
      setRateLimit(mfaService.checkRateLimit(targetUserId));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChallengeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.length < 6) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Check if sign-in challenge resolver is active
      const resolver = mfaService.getActiveSignInResolver();
      if (resolver) {
        const res = await mfaService.resolveSignInChallenge(code);
        if (res.success && res.assuranceTicket) {
          onSuccess(res.assuranceTicket);
          onClose();
          return;
        } else {
          setErrorMessage(res.errorMessage || "MFA Challenge Failed.");
          setRateLimit(mfaService.checkRateLimit(targetUserId));
          setIsSubmitting(false);
          return;
        }
      }

      // Local / institutional mathematical verification
      const verifyRes = mfaService.verifyCandidateCode(targetUserId, code);
      if (!verifyRes.isValid) {
        setErrorMessage(verifyRes.reason || "Invalid code.");
        setRateLimit(mfaService.checkRateLimit(targetUserId));
        setIsSubmitting(false);
        return;
      }

      const ticket = mfaService.issueAssuranceTicket(targetUserId, "totp");
      onSuccess(ticket);
      onClose();
    } catch (err: any) {
      setErrorMessage(err?.message || "MFA Verification failed.");
      setRateLimit(mfaService.checkRateLimit(targetUserId));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryCodeInput.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await mfaService.verifyAndConsumeRecoveryCode(targetUserId, recoveryCodeInput);
      if (result.success && result.assuranceTicket) {
        onSuccess(result.assuranceTicket);
        onClose();
      } else {
        setErrorMessage(result.errorMessage || "Recovery code invalid or already used.");
        setRateLimit(mfaService.checkRateLimit(targetUserId));
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Recovery code verification failed.");
      setRateLimit(mfaService.checkRateLimit(targetUserId));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySecretKey = () => {
    if (!provision) return;
    navigator.clipboard.writeText(provision.secretKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyRecoveryCodes = () => {
    const text = recoveryCodes.join("\n");
    navigator.clipboard.writeText(text);
    setCopiedCodes(true);
    setTimeout(() => setCopiedCodes(false), 2000);
  };

  const handleDownloadRecoveryCodes = () => {
    const text = [
      "===========================================================",
      "MOOS Academy — EMERGENCY MFA BACKUP RECOVERY CODES",
      "===========================================================",
      `Account: ${targetUserEmail}`,
      `User ID: ${targetUserId}`,
      `Generated: ${new Date().toISOString()}`,
      "",
      "IMPORTANT NOTICE:",
      "- Each recovery code below is SINGLE-USE only.",
      "- Store these codes in a secure password manager or offline vault.",
      "- Once a code is redeemed, it is permanently burned and invalidated.",
      "",
      "YOUR 10 BACKUP RECOVERY CODES:",
      "-----------------------------------------------------------",
      ...recoveryCodes.map((c, i) => `${(i + 1).toString().padStart(2, "0")}. ${c}`),
      "==========================================================="
    ].join("\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `moos-academy-mfa-recovery-codes-${targetUserId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-900 px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {title || (currentMode === "ENROLL" ? "Multi-Factor Authentication Setup" : "Two-Factor Verification Required")}
              </h2>
              <p className="text-xs text-slate-400">
                {description || "Authentic TOTP second-factor assurance (RFC 6238 Standard)"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Rate Limit Banner */}
        {rateLimit.isLocked && (
          <div className="bg-red-50 border-b border-red-200 px-6 py-3 flex items-center gap-3 text-red-800 text-xs">
            <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
            <div>
              <p className="font-semibold">Verification Temporarily Locked Out</p>
              <p>Too many failed attempts. Please wait {rateLimit.cooldownSeconds} seconds before trying again.</p>
            </div>
          </div>
        )}

        {/* Error Notice */}
        {errorMessage && !rateLimit.isLocked && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-center gap-3 text-amber-900 text-xs">
            <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0" />
            <p className="font-medium">{errorMessage}</p>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          {/* MODE: ENROLLMENT */}
          {currentMode === "ENROLL" && (
            <div>
              {/* Step Indicators */}
              <div className="mb-6 flex items-center justify-between">
                <div className={`flex items-center gap-2 text-xs font-semibold ${step >= 1 ? "text-amber-600" : "text-slate-400"}`}>
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs text-white ${step >= 1 ? "bg-amber-600" : "bg-slate-300"}`}>1</span>
                  Initiate
                </div>
                <div className="h-0.5 flex-1 mx-2 bg-slate-200" />
                <div className={`flex items-center gap-2 text-xs font-semibold ${step >= 2 ? "text-amber-600" : "text-slate-400"}`}>
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs text-white ${step >= 2 ? "bg-amber-600" : "bg-slate-300"}`}>2</span>
                  Scan & Verify
                </div>
                <div className="h-0.5 flex-1 mx-2 bg-slate-200" />
                <div className={`flex items-center gap-2 text-xs font-semibold ${step >= 3 ? "text-emerald-600" : "text-slate-400"}`}>
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs text-white ${step >= 3 ? "bg-emerald-600" : "bg-slate-300"}`}>3</span>
                  Recovery Codes
                </div>
              </div>

              {/* Step 1: Account Context & Initiate */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                    <p className="text-xs text-slate-500 font-medium">ACCOUNT DETAILS</p>
                    <p className="text-sm font-bold text-slate-900">{targetUserEmail}</p>
                    <p className="text-xs text-slate-500 mt-1">User Identifier: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-700">{targetUserId}</code></p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Setting up Multi-Factor Authentication (MFA) protects your administrative and academic privileges. You will use an authenticator app (such as Google Authenticator, Microsoft Authenticator, or 1Password) to generate 6-digit TOTP verification codes.
                  </p>
                  <button
                    onClick={initiateEnrollment}
                    disabled={isSubmitting || rateLimit.isLocked}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-50 transition shadow-md"
                  >
                    {isSubmitting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                    Continue with TOTP Authenticator App
                  </button>
                </div>
              )}

              {/* Step 2: QR Code & Code Submission */}
              {step === 2 && provision && (
                <form onSubmit={handleVerifyEnrollmentCode} className="space-y-4">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-inner mb-3">
                      <img
                        src={provision.qrCodeUrl}
                        alt="TOTP Enrollment QR Code"
                        className="h-48 w-48 object-contain"
                      />
                    </div>
                    <p className="text-xs font-semibold text-slate-700">Scan this QR code with your Authenticator App</p>
                    <p className="text-xs text-slate-500 mt-0.5">Or enter the secret key manually below</p>
                  </div>

                  {/* Manual Key Display */}
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 tracking-wider">MANUAL ENTRY SECRET</p>
                      <code className="text-xs font-mono font-bold text-slate-800 tracking-widest">{provision.secretKey}</code>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopySecretKey}
                      className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 hover:bg-slate-100 transition shadow-sm"
                    >
                      {copiedKey ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      {copiedKey ? "Copied" : "Copy"}
                    </button>
                  </div>

                  {/* 6-Digit Code Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ENTER 6-DIGIT VERIFICATION CODE
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      pattern="[0-9]{6}"
                      placeholder="000000"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                      className="w-full text-center text-2xl font-mono tracking-[0.5em] rounded-xl border border-slate-300 py-3 font-bold text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      required
                      autoFocus
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || code.length < 6 || rateLimit.isLocked}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-600 py-3 text-sm font-bold text-white hover:bg-amber-700 disabled:opacity-50 transition shadow-md"
                  >
                    {isSubmitting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                    Verify Code & Complete Setup
                  </button>
                </form>
              )}

              {/* Step 3: Backup Recovery Codes Display */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3 text-emerald-900">
                    <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold text-sm">TOTP Second Factor Enrolled Successfully!</p>
                      <p className="text-xs text-emerald-700">Save your single-use backup recovery codes below now.</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-900 p-4 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <Key className="h-3.5 w-3.5" /> 10 SINGLE-USE BACKUP CODES
                      </p>
                      <span className="text-[10px] text-slate-400">Owner-Only Encrypted</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 my-2">
                      {recoveryCodes.map((c, i) => (
                        <div key={i} className="font-mono text-xs bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-slate-200">
                          <span className="text-slate-500 mr-2">{i + 1}.</span>{c}
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">
                      Each code can only be used once. If you lose access to your authenticator device, you can use these to regain access.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleCopyRecoveryCodes}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                    >
                      {copiedCodes ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                      {copiedCodes ? "Codes Copied" : "Copy Codes"}
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadRecoveryCodes}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                    >
                      <Download className="h-4 w-4 text-slate-600" />
                      Download .txt
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      onSuccess();
                      onClose();
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-800 transition shadow-md"
                  >
                    Done & Return to Academy
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MODE: CHALLENGE (SIGN-IN OR ADMIN SWITCHING) */}
          {currentMode === "CHALLENGE" && (
            <form onSubmit={handleChallengeSubmit} className="space-y-4">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-xs text-slate-500 font-medium">AUTHENTICATED IDENTITY</p>
                <p className="text-sm font-bold text-slate-900">{targetUserEmail}</p>
                <p className="text-xs text-slate-500 mt-0.5">Please verify your identity using your authenticator app</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  6-DIGIT AUTHENTICATOR CODE
                </label>
                <input
                  type="text"
                  maxLength={6}
                  pattern="[0-9]{6}"
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full text-center text-2xl font-mono tracking-[0.5em] rounded-xl border border-slate-300 py-3 font-bold text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  required
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || code.length < 6 || rateLimit.isLocked}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-50 transition shadow-md"
              >
                {isSubmitting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4 text-amber-400" />}
                Confirm Second-Factor Verification
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setCurrentMode("RECOVERY")}
                  className="text-xs font-semibold text-amber-700 hover:text-amber-800 underline transition"
                >
                  Lost access to authenticator app? Use a backup recovery code
                </button>
              </div>
            </form>
          )}

          {/* MODE: RECOVERY (SINGLE-USE CODE REDEMPTION) */}
          {currentMode === "RECOVERY" && (
            <form onSubmit={handleRecoverySubmit} className="space-y-4">
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                <p className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Key className="h-4 w-4 text-amber-700" /> BACKUP RECOVERY CODE REDEMPTION
                </p>
                <p className="text-xs text-amber-800 mt-1">
                  Enter one of your 10 single-use recovery codes (e.g. MOOS-XXXX-XXXX). This code will be permanently burned upon use.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  BACKUP RECOVERY CODE
                </label>
                <input
                  type="text"
                  placeholder="MOOS-XXXX-XXXX"
                  value={recoveryCodeInput}
                  onChange={(e) => setRecoveryCodeInput(e.target.value.toUpperCase())}
                  className="w-full font-mono text-center text-lg tracking-wider rounded-xl border border-slate-300 py-3 font-bold text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  required
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !recoveryCodeInput.trim() || rateLimit.isLocked}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-600 py-3 text-sm font-bold text-white hover:bg-amber-700 disabled:opacity-50 transition shadow-md"
              >
                {isSubmitting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                Redeem Single-Use Recovery Code
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setCurrentMode("CHALLENGE")}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-800 underline transition"
                >
                  Back to standard 6-digit authenticator code
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
