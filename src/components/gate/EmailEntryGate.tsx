/**
 * MOOS ACADEMY — WELCOME & AUTHENTICATION GATEWAY
 *
 * Security Hardening (Strategic Development Directive 002):
 * - Zero hardcoded owner emails, zero one-click owner tabs, zero pre-auth directory buttons.
 * - Zero passwordless login or auto-elevation indicators on the public entry screen.
 * - Requires real server-verified email + password OR verified Firebase Authentication.
 * - Public registration is strictly limited to Learner and Teacher accounts.
 */

import React, { useState } from "react";
import {
  ShieldAlert,
  UserPlus,
  LogIn,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Sparkles,
  Lock
} from "lucide-react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { emailAllowlistService } from "../../services/emailAllowlistService";
import { VerifiedAuthSession } from "../../types/emailAllowlist";

export interface EmailEntryGateProps {
  onAccessGranted: (email: string, token: string, session?: VerifiedAuthSession | null) => void;
}

export const EmailEntryGate: React.FC<EmailEntryGateProps> = ({ onAccessGranted }) => {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  // Sign-In fields
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign-Up fields
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpRole, setSignUpRole] = useState<"learner" | "teacher">("learner");
  const [signUpLevel, setSignUpLevel] = useState("senior_secondary");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "info";
    title: string;
    message: string;
  } | null>(null);

  // =========================================================================
  // VERIFIED EMAIL + PASSWORD SIGN-IN (FIREBASE AUTH + SERVER CREDENTIAL CHECK)
  // =========================================================================
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = signInEmail.trim();
    if (!email || !signInPassword) return;

    setIsSubmitting(true);
    setFeedback(null);

    try {
      // 1. Try server credential sign-in first (scrypt-verified password records)
      const serverResult = await emailAllowlistService.signInUser({
        email,
        password: signInPassword
      });

      if (serverResult.isAllowed && serverResult.serverVerificationToken) {
        setFeedback({
          type: "success",
          title: "ACCESS GRANTED",
          message: `Welcome back, ${serverResult.entry?.fullName || "scholar"}. Opening MOOS Academy portal...`
        });
        setTimeout(() => {
          onAccessGranted(
            serverResult.email,
            serverResult.serverVerificationToken!,
            serverResult.session || emailAllowlistService.getActiveSession()
          );
        }, 250);
        return;
      }

      // 2. Fallback to Firebase Auth Email + Password (for Firebase-registered accounts)
      try {
        const cred = await signInWithEmailAndPassword(auth, email, signInPassword);
        if (!cred.user.emailVerified) {
          await sendEmailVerification(cred.user).catch(() => {});
          setFeedback({
            type: "error",
            title: "EMAIL VERIFICATION REQUIRED",
            message:
              "Please verify your email address via the confirmation link sent to your inbox before signing in."
          });
          return;
        }
        const idToken = await cred.user.getIdToken(true);
        const exchange = await emailAllowlistService.exchangeFirebaseIdToken(idToken);
        if (exchange.isAllowed && exchange.serverVerificationToken) {
          setFeedback({
            type: "success",
            title: "ACCESS GRANTED",
            message: `Welcome back, ${cred.user.displayName || exchange.email}. Unlocking academy portal...`
          });
          setTimeout(() => {
            onAccessGranted(
              exchange.email,
              exchange.serverVerificationToken!,
              exchange.session || emailAllowlistService.getActiveSession()
            );
          }, 250);
          return;
        }
      } catch {
        // Fall through cleanly to unified invalid credentials notice
      }

      setFeedback({
        type: "error",
        title: "AUTHENTICATION FAILED",
        message: serverResult.message || "Invalid email or password. Please verify your credentials."
      });
    } catch (err: any) {
      setFeedback({
        type: "error",
        title: "AUTHENTICATION ERROR",
        message: err?.message || "Unable to complete sign-in. Please check your network connection."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================================================
  // VERIFIED GOOGLE / FIREBASE SIGN-IN (SERVER JWT VERIFICATION)
  // =========================================================================
  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setFeedback(null);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      if (!cred.user.emailVerified) {
        setFeedback({
          type: "error",
          title: "EMAIL VERIFICATION REQUIRED",
          message: "Your identity provider account must have a verified email address."
        });
        return;
      }
      const idToken = await cred.user.getIdToken(true);
      const exchange = await emailAllowlistService.exchangeFirebaseIdToken(idToken);
      if (exchange.isAllowed && exchange.serverVerificationToken) {
        setFeedback({
          type: "success",
          title: "AUTHENTICATED",
          message: `Signed in as ${exchange.email}. Loading workspace...`
        });
        setTimeout(() => {
          onAccessGranted(
            exchange.email,
            exchange.serverVerificationToken!,
            exchange.session || emailAllowlistService.getActiveSession()
          );
        }, 250);
      } else {
        setFeedback({
          type: "error",
          title: "AUTHENTICATION DENIED",
          message: exchange.message || "Unable to verify session with server."
        });
      }
    } catch (err: any) {
      if (err?.code !== "auth/popup-closed-by-user" && err?.code !== "auth/cancelled-popup-request") {
        setFeedback({
          type: "error",
          title: "SIGN-IN NOTICE",
          message:
            err?.code === "auth/popup-blocked"
              ? "Popup window was blocked by the browser. Please allow popups or sign in with email and password."
              : err?.message || "Federated sign-in did not complete."
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================================================
  // PUBLIC SIGN-UP SUBMISSION (LEARNER / TEACHER ONLY, PASSWORD REQUIRED)
  // =========================================================================
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = signUpEmail.trim();
    const name = signUpName.trim();
    if (!email || !name) return;

    if (signUpPassword.length < 8) {
      setFeedback({
        type: "error",
        title: "PASSWORD TOO SHORT",
        message: "Please choose a strong password with at least 8 characters."
      });
      return;
    }

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

      // Optionally create matching Firebase Auth user & trigger email verification asynchronously
      try {
        const fbCred = await createUserWithEmailAndPassword(auth, email, signUpPassword);
        await updateProfile(fbCred.user, { displayName: name });
        await sendEmailVerification(fbCred.user);
      } catch {
        // Account registration completed via Academy backend; Firebase sync remains optional
      }

      if (result.success && result.serverVerificationToken) {
        setFeedback({
          type: "success",
          title: "ENROLLMENT COMPLETED",
          message: `Welcome, ${name}! Your scholar account has been created. Entering MOOS Academy...`
        });
        setTimeout(() => {
          onAccessGranted(
            result.entry?.email || email,
            result.serverVerificationToken!,
            result.session || emailAllowlistService.getActiveSession()
          );
        }, 250);
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

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden">
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
                Academic Portal
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              WAEC SS3 / JAMB UTME / Socratic AI Pedagogy / Rigorous STEM Mastery
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Lock className="h-3.5 w-3.5 text-amber-400" />
          <span className="hidden sm:inline">Authenticated Scholar Access</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Welcome Branding */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-wide">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Public Scholar Enrollment Live</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Mastery-Based STEM &amp; Multidisciplinary Learning
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                Welcome to MOOS Academy. Sign in or create a verified scholar account to unlock structured
                programmed derivations, WAEC/NECO/JAMB Mastery Units, and Interactive Socratic AI Tutoring.
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
                  Full syllabus mastery, worked derivations, and exam-calibrated assessments.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-400 text-xs">
                  <BookOpen className="h-4 w-4" />
                  <span>Programmed Rigor</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Step-by-step explanations, diagnostic hints, and visual diagrams for deep retention.
                </p>
              </div>
            </div>

            {/* Security Policy Notice */}
            <div className="rounded-xl bg-slate-900/40 border border-slate-800 p-3 text-[11px] text-slate-400 flex items-start gap-2.5 text-left">
              <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-200">Verified Access Policy:</span>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  All accounts require password verification or federated authentication before entering
                  academic workspaces. Role privileges are enforced server-side.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Auth Card */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl p-6 sm:p-7 space-y-5">
              {/* Two-Tab Switcher Only: Sign In | Public Sign Up */}
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
              </div>

              {/* Feedback Alert */}
              {feedback && (
                <div
                  className={`p-3.5 rounded-xl border text-xs space-y-1 ${
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
                <div className="space-y-4">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="scholar@example.com"
                        value={signInEmail}
                        onChange={(e) => {
                          setSignInEmail(e.target.value);
                          if (feedback) setFeedback(null);
                        }}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm font-medium text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition"
                        autoFocus
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Password
                      </label>
                      <input
                        type="password"
                        required
                        minLength={8}
                        placeholder="••••••••••••"
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm font-medium text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !signInEmail.trim() || !signInPassword}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-extrabold text-sm py-3 px-4 transition shadow-lg shadow-amber-950/30 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <RefreshCw className="h-4 w-4 animate-spin text-slate-950" />
                      ) : (
                        <LogIn className="h-4 w-4 text-slate-950" />
                      )}
                      <span>Sign In to Academy</span>
                    </button>
                  </form>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-slate-800"></div>
                    <span className="flex-shrink mx-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                      Or Federated Auth
                    </span>
                    <div className="flex-grow border-t border-slate-800"></div>
                  </div>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950 hover:bg-slate-800 text-slate-100 font-bold text-xs py-2.5 px-4 transition"
                  >
                    <span>Continue with Google (Firebase Auth)</span>
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
                </div>
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
                      minLength={2}
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
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Role
                      </label>
                      <select
                        value={signUpRole}
                        onChange={(e) => setSignUpRole(e.target.value === "teacher" ? "teacher" : "learner")}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-medium text-white focus:border-amber-500 focus:outline-none"
                      >
                        <option value="learner">Learner / Scholar</option>
                        <option value="teacher">Teacher / Faculty</option>
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
                      minLength={8}
                      placeholder="At least 8 characters"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm font-medium text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !signUpEmail.trim() || !signUpName.trim() || signUpPassword.length < 8}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-extrabold text-sm py-2.5 px-4 transition shadow-lg shadow-amber-950/30 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="h-4 w-4 animate-spin text-slate-950" />
                    ) : (
                      <UserPlus className="h-4 w-4 text-slate-950" />
                    )}
                    <span>Complete Sign-Up</span>
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
            </div>
          </div>
        </div>
      </main>

      {/* Public Footer — Zero Owner Emails Exposed */}
      <footer className="relative z-10 w-full border-t border-slate-800/60 py-3 text-center text-xs text-slate-500 flex flex-wrap items-center justify-between px-6">
        <div>MOOS Academy &bull; Academic Mastery &amp; Verified Learning Architecture</div>
        <div className="text-slate-400 font-mono text-[11px]">NERDC / WAEC / NECO / JAMB Aligned</div>
      </footer>
    </div>
  );
};
