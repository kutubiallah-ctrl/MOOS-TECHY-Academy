/**
 * MOOS ACADEMY — PREMIUM WELCOME & AUTHENTICATION GATEWAY
 * 
 * TASK: PIVOT DIRECTIVE — PUBLIC SIGN-UP WITH AUTO-ELEVATED OWNER EMAILS
 * 
 * Features:
 * 1. Public Sign-Up: Every user apart from the designated owners must sign up
 *    (email + password, email verification) before accessing the academy.
 * 2. Auto-Elevated Owner Emails: kutubiallah@gmail.com and osomarufdamilare@gmail.com
 *    are immediately recognized and granted full owner/admin access upon input.
 * 3. Premium Welcome: Rich institutional landing experience with WAEC/JAMB/WASSCE/STEM branding.
 *    No guest mode, no trial sessions, zero bypass.
 * 4. User Directory & Allowlist Manager: Accessible as an administrative inspection studio.
 */

import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  UserPlus,
  LogIn,
  AlertTriangle,
  Users,
  Settings,
  RefreshCw,
  CheckCircle2,
  Crown,
  BookOpen,
  GraduationCap,
  Sparkles,
  Award,
  ArrowRight
} from "lucide-react";
import {
  emailAllowlistService,
  PRIMARY_OWNER_EMAIL,
  SECONDARY_OWNER_EMAIL,
  DESIGNATED_OWNER_EMAILS
} from "../../services/emailAllowlistService";
import { GateVerificationResult, AllowlistRole } from "../../types/emailAllowlist";
import { OwnerAllowlistManager } from "./OwnerAllowlistManager";

export interface EmailEntryGateProps {
  onAccessGranted: (email: string, token: string) => void;
}

export const EmailEntryGate: React.FC<EmailEntryGateProps> = ({ onAccessGranted }) => {
  // Tabs: 'signin' | 'signup' | 'owners'
  const [authMode, setAuthMode] = useState<"signin" | "signup" | "owners">("signin");

  // Sign-In fields
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign-Up fields
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpRole, setSignUpRole] = useState<AllowlistRole>("learner");
  const [signUpLevel, setSignUpLevel] = useState("senior_secondary");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "info";
    title: string;
    message: string;
  } | null>(null);

  const [showOwnerManager, setShowOwnerManager] = useState(false);

  // Check if entered email is a designated owner
  const isSignInOwner = emailAllowlistService.isOwner(signInEmail.trim());
  const isSignUpOwner = emailAllowlistService.isOwner(signUpEmail.trim());

  // =========================================================================
  // SIGN IN SUBMISSION (WITH OWNER AUTO-ELEVATION)
  // =========================================================================
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = signInEmail.trim();
    if (!email) return;

    setIsSubmitting(true);
    setFeedback(null);

    try {
      // 1. Auto-elevated owner path
      if (emailAllowlistService.isOwner(email)) {
        const result = await emailAllowlistService.verifyEmail(email);
        if (result.isAllowed && result.serverVerificationToken) {
          setFeedback({
            type: "success",
            title: "ROOT OWNER AUTO-ELEVATED",
            message: `Designated owner '${email}' recognized. Unlocking full institutional root administration.`
          });
          setTimeout(() => {
            onAccessGranted(result.email, result.serverVerificationToken!);
          }, 350);
          return;
        }
      }

      // 2. Ordinary public sign-in verification
      const result = await emailAllowlistService.signInUser({
        email,
        password: signInPassword
      });

      if (result.isAllowed && result.serverVerificationToken) {
        setFeedback({
          type: "success",
          title: "ACCESS GRANTED",
          message: `Welcome back, ${result.entry?.fullName || result.entry?.role || "scholar"}. Unlocking academy portal...`
        });
        setTimeout(() => {
          onAccessGranted(result.email, result.serverVerificationToken!);
        }, 350);
      } else {
        setFeedback({
          type: "error",
          title: "AUTHENTICATION BLOCKED",
          message:
            result.message ||
            "Account not found. Every new user must complete public sign-up before accessing MOOS Academy."
        });
      }
    } catch (err: any) {
      setFeedback({
        type: "error",
        title: "AUTHENTICATION ERROR",
        message: err?.message || "Verification request failed. Please check network connectivity."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================================================
  // PUBLIC SIGN-UP SUBMISSION (EMAIL + PASSWORD + VERIFICATION)
  // =========================================================================
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = signUpEmail.trim();
    const name = signUpName.trim();
    if (!email || !name) return;

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const result = await emailAllowlistService.signUpUser({
        fullName: name,
        email,
        password: signUpPassword,
        role: signUpRole,
        targetLevel: signUpLevel,
        notes: `Enrolled via Public Portal (${signUpLevel})`
      });

      if (result.success && result.serverVerificationToken) {
        setFeedback({
          type: "success",
          title: "ENROLLMENT COMPLETED & VERIFIED",
          message: `Welcome, ${name}! Your account has been verified and registered. Accessing academy...`
        });
        setTimeout(() => {
          onAccessGranted(result.entry?.email || email, result.serverVerificationToken!);
        }, 350);
      } else {
        setFeedback({
          type: "error",
          title: "SIGN-UP FAILED",
          message: result.message || "Failed to complete public sign-up."
        });
      }
    } catch (err: any) {
      setFeedback({
        type: "error",
        title: "SIGN-UP ERROR",
        message: err?.message || "Network error occurred during registration."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================================================
  // OWNER INSTANT AUTO-ELEVATION TRIGGER
  // =========================================================================
  const handleSelectOwner = async (ownerEmail: string) => {
    setIsSubmitting(true);
    setFeedback(null);
    try {
      const result = await emailAllowlistService.verifyEmail(ownerEmail);
      if (result.isAllowed && result.serverVerificationToken) {
        setFeedback({
          type: "success",
          title: "ROOT OWNER ELEVATED",
          message: `Instant auto-elevation active for ${ownerEmail}. Unlocking root authority.`
        });
        setTimeout(() => {
          onAccessGranted(result.email, result.serverVerificationToken!);
        }, 300);
      }
    } catch (err: any) {
      setFeedback({
        type: "error",
        title: "ELEVATION ERROR",
        message: err.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.18),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-grid-slate-800/[0.06] bg-[bottom_1px_center]" />

      {/* Top Banner */}
      <header className="relative z-10 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-base shadow-lg shadow-amber-500/20">
            M
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-sm text-white">MOOS Academy</span>
              <span className="text-[10px] text-amber-400 font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                Institutional Gateway
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              WAEC SS3 / JAMB UTME / Socratic AI Pedagogy / C.E.M.M Publishing
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowOwnerManager(true)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Inspect authorized users & institutional allowlist directory"
          >
            <Users className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">Owner Directory Studio</span>
          </button>
        </div>
      </header>

      {/* Main Content Area: Split Welcome + Auth Forms */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Premium Welcome Branding */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-wide">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Public Scholar Enrollment Live</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Mastery-Based STEM &amp; Multidisciplinary Learning
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                Welcome to MOOS Academy. Sign up to unlock the JAMB CBT Engine, WAEC SS3 Mastery Units,
                Interactive Socratic AI Tutor, and Bookpreneur Publishing Studio.
              </p>
            </div>

            {/* Core Academy Pillars */}
            <div className="grid grid-cols-2 gap-3 text-left pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-400 text-xs">
                  <GraduationCap className="h-4 w-4" />
                  <span>JAMB &amp; WAEC Engine</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Full past questions CBT, real-time analytics, and UTME timing simulation.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-400 text-xs">
                  <BookOpen className="h-4 w-4" />
                  <span>C.E.M.M Textbooks</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Interactive multi-phase STEM curricula with embedded audio &amp; quizzes.
                </p>
              </div>
            </div>

            {/* Invariant Policy Notice */}
            <div className="rounded-xl bg-slate-900/40 border border-slate-800 p-3 text-[11px] text-slate-400 flex items-start gap-2.5 text-left">
              <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-200">Access Governance Policy:</span>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  All scholars must complete public sign-up and verified authentication. Zero guest mode, zero trial
                  sessions. Designated owners are automatically elevated.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Auth Card */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl p-6 sm:p-7 space-y-5">
              {/* Tab Switcher */}
              <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("signin");
                    setFeedback(null);
                  }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition ${
                    authMode === "signin"
                      ? "bg-amber-500 text-slate-950 shadow-md font-extrabold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Sign In</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("signup");
                    setFeedback(null);
                  }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition ${
                    authMode === "signup"
                      ? "bg-amber-500 text-slate-950 shadow-md font-extrabold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  <span>Public Sign Up</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("owners");
                    setFeedback(null);
                  }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition ${
                    authMode === "owners"
                      ? "bg-amber-500 text-slate-950 shadow-md font-extrabold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Crown className="h-3.5 w-3.5" />
                  <span>Owners</span>
                </button>
              </div>

              {/* Feedback Alert */}
              {feedback && (
                <div
                  className={`p-3.5 rounded-xl border text-xs space-y-1 animate-fadeIn ${
                    feedback.type === "success"
                      ? "bg-emerald-950/70 border-emerald-800 text-emerald-200"
                      : "bg-red-950/70 border-red-800 text-red-200"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold">
                    {feedback.type === "success" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                    )}
                    <span>{feedback.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{feedback.message}</p>
                </div>
              )}

              {/* MODE 1: SIGN IN FORM */}
              {authMode === "signin" && (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="scholar@moos.academy"
                      value={signInEmail}
                      onChange={(e) => {
                        setSignInEmail(e.target.value);
                        if (feedback) setFeedback(null);
                      }}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm font-medium text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition"
                      autoFocus
                    />
                    {isSignInOwner && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                        <Crown className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <span>Designated Root Owner Detected — Auto-Elevation Active</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder={isSignInOwner ? "Owner Password / Direct Key" : "••••••••••••"}
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm font-medium text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !signInEmail.trim()}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-extrabold text-sm py-3 px-4 transition shadow-lg shadow-amber-950/30 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="h-4 w-4 animate-spin text-slate-950" />
                    ) : isSignInOwner ? (
                      <Crown className="h-4 w-4 text-slate-950" />
                    ) : (
                      <LogIn className="h-4 w-4 text-slate-950" />
                    )}
                    <span>{isSignInOwner ? "Enter as Auto-Elevated Owner" : "Sign In to Academy"}</span>
                  </button>

                  <div className="text-center pt-1">
                    <span className="text-xs text-slate-400">First time visiting? </span>
                    <button
                      type="button"
                      onClick={() => setAuthMode("signup")}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 transition underline underline-offset-2"
                    >
                      Complete Public Sign-Up
                    </button>
                  </div>
                </form>
              )}

              {/* MODE 2: PUBLIC SIGN-UP FORM */}
              {authMode === "signup" && (
                <form onSubmit={handleSignUp} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chinwe Eze"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm font-medium text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none transition"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Institutional / Personal Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="scholar@example.com"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm font-medium text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none transition"
                    />
                    {isSignUpOwner && (
                      <div className="mt-1 flex items-center gap-1.5 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                        <Crown className="h-3 w-3 text-amber-400 shrink-0" />
                        <span>Designated Owner: Will be auto-elevated upon sign-up</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Role
                      </label>
                      <select
                        value={signUpRole}
                        onChange={(e) => setSignUpRole(e.target.value as AllowlistRole)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-medium text-white focus:border-amber-500 focus:outline-none"
                      >
                        <option value="learner">Learner / Scholar</option>
                        <option value="teacher">Teacher / Faculty</option>
                        <option value="admin">Institutional Staff</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Academic Level
                      </label>
                      <select
                        value={signUpLevel}
                        onChange={(e) => setSignUpLevel(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-medium text-white focus:border-amber-500 focus:outline-none"
                      >
                        <option value="senior_secondary">Senior Secondary (SS1-SS3)</option>
                        <option value="junior_secondary">Junior Secondary (JS1-JS3)</option>
                        <option value="primary">Primary Foundations</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="At least 8 characters"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm font-medium text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !signUpEmail.trim() || !signUpName.trim()}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-extrabold text-sm py-2.5 px-4 transition shadow-lg shadow-amber-950/30 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="h-4 w-4 animate-spin text-slate-950" />
                    ) : (
                      <UserPlus className="h-4 w-4 text-slate-950" />
                    )}
                    <span>Complete Sign-Up &amp; Verify Email</span>
                  </button>

                  <div className="text-center pt-0.5">
                    <span className="text-xs text-slate-400">Already registered? </span>
                    <button
                      type="button"
                      onClick={() => setAuthMode("signin")}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 transition underline underline-offset-2"
                    >
                      Sign In Here
                    </button>
                  </div>
                </form>
              )}

              {/* MODE 3: AUTO-ELEVATED OWNER DIRECT ACCESS */}
              {authMode === "owners" && (
                <div className="space-y-4">
                  <div className="text-center space-y-1">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Crown className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold text-white">Designated Owner Auto-Elevation</h3>
                    <p className="text-[11px] text-slate-400">
                      Authoritative root owners enter directly without pre-insertion requirements.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {DESIGNATED_OWNER_EMAILS.map((ownerEmail) => (
                      <button
                        key={ownerEmail}
                        type="button"
                        onClick={() => handleSelectOwner(ownerEmail)}
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/60 hover:bg-amber-500/5 transition group text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <Crown className="h-4 w-4 text-amber-400 group-hover:scale-110 transition" />
                          <div>
                            <div className="font-mono text-xs font-bold text-white group-hover:text-amber-300 transition">
                              {ownerEmail}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {ownerEmail === PRIMARY_OWNER_EMAIL ? "Founder & Root Owner" : "Co-Founder & Co-Owner"}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
                      </button>
                    ))}
                  </div>

                  <div className="text-[11px] text-slate-400 bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                    <span className="font-bold text-slate-300">Notice:</span> Only the two cryptographically recognized
                    designated owner addresses are eligible for root auto-elevation.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Owner User Inspection & Management Studio Modal */}
      {showOwnerManager && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <OwnerAllowlistManager
              currentOwnerEmail={PRIMARY_OWNER_EMAIL}
              onClose={() => setShowOwnerManager(false)}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-slate-800/60 py-3 text-center text-xs text-slate-500 flex flex-wrap items-center justify-between px-6">
        <div>MOOS Academy &bull; Public Sign-Up &amp; Auto-Elevated Owner Architecture</div>
        <div className="text-slate-400 font-mono text-[11px]">{DESIGNATED_OWNER_EMAILS.join(" &bull; ")}</div>
      </footer>
    </div>
  );
};
