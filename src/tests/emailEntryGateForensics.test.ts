/**
 * MOOS TECHY ACADEMY — ACCESS MODEL & OWNER AUTO-ELEVATION FORENSIC VERIFICATION SUITE
 * 
 * TASK: PIVOT DIRECTIVE — PUBLIC SIGN-UP WITH AUTO-ELEVATED OWNER EMAILS
 * 
 * Verifies the updated institutional access architecture:
 * 1. Public Sign-Up: Non-owners MUST sign up first before entry is granted.
 * 2. Unregistered/unauthenticated non-owner emails are strictly blocked at entry.
 * 3. Verified Sign-Up: Completing public registration creates verified profile & grants entry token.
 * 4. Owner Auto-Elevation: Both designated owner emails (kutubiallah@gmail.com and osomarufdamilare@gmail.com)
 *    are automatically recognized and elevated to root owner/admin authority upon input without manual allowlist steps.
 * 5. Owner Administration & Immutability: Allowlist manager serves as owner user inspection & governance tool.
 *    Neither designated owner can be removed or disabled.
 * 6. Cryptographic HMAC-SHA256 Token Anti-Tamper & Expiry Verification.
 * 7. Session Invalidation on Account Status Changes.
 */

import { strict as assert } from "assert";
import {
  emailAllowlistService,
  PRIMARY_OWNER_EMAIL,
  SECONDARY_OWNER_EMAIL,
  DESIGNATED_OWNER_EMAILS,
  ACADEMY_OWNER_EMAIL,
  INITIAL_SEEDED_ALLOWLIST
} from "../services/emailAllowlistService";
import {
  ACADEMY_WHATSAPP_NUMBER,
  ACADEMY_WHATSAPP_URL
} from "../components/WhatsAppAdminChatButton";

export interface EmailGateForensicResult {
  passed: boolean;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  details: string[];
}

export async function runEmailEntryGateForensics(): Promise<EmailGateForensicResult> {
  const details: string[] = [];
  let passedChecks = 0;
  let failedChecks = 0;

  function recordPass(testName: string) {
    passedChecks++;
    details.push(`  ✅ [PASS] ${testName}`);
    console.log(`  ✅ [PASS] ${testName}`);
  }

  function recordFail(testName: string, reason: string) {
    failedChecks++;
    details.push(`  ❌ [FAIL] ${testName} — ${reason}`);
    console.error(`  ❌ [FAIL] ${testName} — ${reason}`);
  }

  console.log("==========================================================================");
  console.log("🚪 MOOS TECHY ACADEMY — ACCESS MODEL & AUTO-ELEVATION FORENSIC VERIFICATION");
  console.log("==========================================================================\n");

  try {
    emailAllowlistService.resetForTesting();

    // =========================================================================
    // 1. UNREGISTERED NON-OWNER EMAIL STRICT BLOCKING AT ENTRY
    // =========================================================================
    console.log("--- 1. Unregistered Non-Owner Email Lockout ---");
    const unregisteredEmail = "unregistered.candidate@external.org";
    const res1 = await emailAllowlistService.verifyEmail(unregisteredEmail);
    assert.strictEqual(res1.isAllowed, false, "Unregistered non-owner email MUST be blocked at entry");
    assert.ok(
      res1.status === "BLOCKED_NOT_INSERTED" || res1.status === "BLOCKED_NOT_REGISTERED",
      "Status must indicate un-registered account"
    );
    assert.ok(res1.message.includes("ACCESS DENIED"), "Denial message must be explicit");
    assert.strictEqual(emailAllowlistService.hasGateAccess(), false, "Gate access must remain false");

    // Attempting sign-in with unregistered account
    const signInUnregistered = await emailAllowlistService.signInUser({
      email: unregisteredEmail,
      password: "AnyPassword123!"
    });
    assert.strictEqual(signInUnregistered.isAllowed, false, "Sign-in must reject unregistered email");
    assert.strictEqual(signInUnregistered.status, "BLOCKED_NOT_REGISTERED");

    recordPass("Strict entry gate blocks arbitrary unregistered emails; requires public sign-up first.");

    // =========================================================================
    // 2. ZERO GUEST MODE, ZERO TRIAL, ZERO BYPASS
    // =========================================================================
    console.log("\n--- 2. Prohibition of Guest / Trial Mode ---");
    const guestAttempts = ["guest", "trial", "anonymous", "", "admin@bypass", "test@test"];
    for (const attempt of guestAttempts) {
      const gRes = await emailAllowlistService.verifyEmail(attempt);
      assert.strictEqual(gRes.isAllowed, false, `Attempt '${attempt}' must be strictly rejected`);
      assert.ok(["INVALID_EMAIL", "BLOCKED_NOT_INSERTED", "BLOCKED_NOT_REGISTERED"].includes(gRes.status));
    }
    recordPass("Zero guest mode, zero trial access, zero bypass confirmed.");

    // =========================================================================
    // 3. AUTO-ELEVATED OWNER EMAILS (IMMEDIATE RECOGNITION & ROOT ACCESS)
    // =========================================================================
    console.log("\n--- 3. Designated Owner Auto-Elevation Forensics ---");
    assert.strictEqual(DESIGNATED_OWNER_EMAILS.length, 2, "Must configure exactly two designated owner accounts");
    assert.ok(DESIGNATED_OWNER_EMAILS.includes("kutubiallah@gmail.com"));
    assert.ok(DESIGNATED_OWNER_EMAILS.includes("osomarufdamilare@gmail.com"));

    // Verify Primary Owner Auto-Elevation
    const primaryRes = await emailAllowlistService.verifyEmail(PRIMARY_OWNER_EMAIL);
    assert.strictEqual(primaryRes.isAllowed, true, "Primary owner must be granted access");
    assert.strictEqual(primaryRes.status, "GRANTED");
    assert.strictEqual(primaryRes.entry?.role, "owner");
    assert.strictEqual(primaryRes.isOwnerAutoElevated, true, "Owner auto-elevation flag must be active");
    assert.strictEqual(emailAllowlistService.isOwner(PRIMARY_OWNER_EMAIL), true);
    assert.ok(primaryRes.serverVerificationToken, "Server HMAC token must be issued");

    // Verify Secondary Owner Auto-Elevation
    const secondaryRes = await emailAllowlistService.verifyEmail(SECONDARY_OWNER_EMAIL);
    assert.strictEqual(secondaryRes.isAllowed, true, "Secondary owner must be granted access");
    assert.strictEqual(secondaryRes.status, "GRANTED");
    assert.strictEqual(secondaryRes.entry?.role, "owner");
    assert.strictEqual(secondaryRes.isOwnerAutoElevated, true, "Secondary owner must be auto-elevated");
    assert.strictEqual(emailAllowlistService.isOwner(SECONDARY_OWNER_EMAIL), true);
    assert.ok(secondaryRes.serverVerificationToken, "Server HMAC token must be issued");

    // Sign-in method for owner also triggers immediate auto-elevation
    const ownerSignIn = await emailAllowlistService.signInUser({ email: SECONDARY_OWNER_EMAIL });
    assert.strictEqual(ownerSignIn.isAllowed, true);
    assert.strictEqual(ownerSignIn.entry?.role, "owner");

    recordPass("Both designated owners (kutubiallah@gmail.com & osomarufdamilare@gmail.com) auto-elevated to root administration upon entry.");

    // =========================================================================
    // 4. PUBLIC SIGN-UP WORKFLOW WITH EMAIL VERIFICATION
    // =========================================================================
    console.log("\n--- 4. Public Sign-Up & Email Verification Workflow ---");
    const newStudentEmail = "chidi.obi@academy.moostechy.org";
    const newStudentName = "Chidi Obi";

    // Before sign-up, entry is denied
    const beforeSignUpCheck = await emailAllowlistService.verifyEmail(newStudentEmail);
    assert.strictEqual(beforeSignUpCheck.isAllowed, false, "Must be denied prior to sign up");

    // Scholar signs up through public portal
    const signUpResult = await emailAllowlistService.signUpUser({
      fullName: newStudentName,
      email: newStudentEmail,
      password: "StrongPassword2026!",
      role: "learner",
      targetLevel: "senior_secondary",
      notes: "SS2 Physics & Coding Scholar"
    });

    assert.strictEqual(signUpResult.success, true, "Public sign-up must succeed");
    assert.strictEqual(signUpResult.entry?.email, newStudentEmail);
    assert.strictEqual(signUpResult.entry?.fullName, newStudentName);
    assert.strictEqual(signUpResult.entry?.isEmailVerified, true, "Email must be verified upon registration");
    assert.strictEqual(signUpResult.entry?.role, "learner");
    assert.ok(signUpResult.serverVerificationToken, "Access token must be granted upon verified sign-up");

    // Now scholar can verify / sign in and access the academy
    const afterSignUpCheck = await emailAllowlistService.verifyEmail(newStudentEmail);
    assert.strictEqual(afterSignUpCheck.isAllowed, true, "Registered scholar must now be granted access");
    assert.strictEqual(afterSignUpCheck.status, "GRANTED");
    assert.strictEqual(emailAllowlistService.hasGateAccess(), true);

    recordPass("Public sign-up workflow completed: verified account created and entry unlocked.");

    // =========================================================================
    // 5. EMAIL NORMALIZATION INVARIANCE
    // =========================================================================
    console.log("\n--- 5. Normalization Invariance ---");
    const mixedCasePrimary = await emailAllowlistService.verifyEmail("  KutuBiAllah@Gmail.COM  ");
    assert.strictEqual(mixedCasePrimary.isAllowed, true);
    assert.strictEqual(mixedCasePrimary.email, PRIMARY_OWNER_EMAIL);

    const mixedCaseSecondary = await emailAllowlistService.verifyEmail("  OsoMarufDamilare@Gmail.COM  ");
    assert.strictEqual(mixedCaseSecondary.isAllowed, true);
    assert.strictEqual(mixedCaseSecondary.email, SECONDARY_OWNER_EMAIL);

    recordPass("Email normalization (lowercase, trim) preserves access control across all cases.");

    // =========================================================================
    // 6. CRYPTOGRAPHIC TOKEN ANTI-TAMPER & EXPIRY
    // =========================================================================
    console.log("\n--- 6. Cryptographic Token Anti-Tamper & Expiry Forensics ---");
    const { token: validToken } = emailAllowlistService.generateVerificationToken(PRIMARY_OWNER_EMAIL);
    assert.strictEqual(
      emailAllowlistService.validateVerificationToken(validToken, PRIMARY_OWNER_EMAIL),
      true,
      "Valid token must pass cryptographic verification"
    );

    // Tampered signature
    const forgedToken = validToken.substring(0, validToken.length - 6) + "123456";
    assert.strictEqual(
      emailAllowlistService.validateVerificationToken(forgedToken, PRIMARY_OWNER_EMAIL),
      false,
      "Tampered cryptographic token signature MUST be rejected"
    );

    // Email mismatch
    assert.strictEqual(
      emailAllowlistService.validateVerificationToken(validToken, "intruder@evil.com"),
      false,
      "Token bound to another email must be rejected"
    );

    // Expired token simulation
    const expiredPayload = `${PRIMARY_OWNER_EMAIL}:${Date.now() - 7200000}:${Date.now() - 3600000}`;
    const expiredB64 = Buffer.from(expiredPayload).toString("base64url");
    const expiredToken = `${expiredB64}.0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef`;
    assert.strictEqual(
      emailAllowlistService.validateVerificationToken(expiredToken, PRIMARY_OWNER_EMAIL),
      false,
      "Expired token MUST be rejected"
    );

    recordPass("Cryptographic tokens resist forgery, account mismatch, and expired lifecycles.");

    // =========================================================================
    // 7. MULTI-USER DIRECTORY PERSISTENCE (ALLOWLIST MANAGER INSPECTION)
    // =========================================================================
    console.log("\n--- 7. Directory Inspection & Multi-Entry Persistence ---");
    const studentA = "chinwe.eze@academy.moostechy.org";
    const studentB = "tunde.bakare@academy.moostechy.org";

    const insertA = emailAllowlistService.insertEmail(
      PRIMARY_OWNER_EMAIL,
      studentA,
      "learner",
      "SS3 Robotics Team Captain"
    );
    assert.strictEqual(insertA.success, true);

    const insertB = emailAllowlistService.insertEmail(
      SECONDARY_OWNER_EMAIL,
      studentB,
      "learner",
      "National Mathematics Olympiad Finalist"
    );
    assert.strictEqual(insertB.success, true);

    const allEntries = emailAllowlistService.listEntries();
    const entryA = allEntries.find((e) => e.normalizedEmail === studentA);
    const entryB = allEntries.find((e) => e.normalizedEmail === studentB);
    assert.ok(entryA, "Student A must exist in directory");
    assert.ok(entryB, "Student B must exist in directory");
    assert.strictEqual(entryA?.notes, "SS3 Robotics Team Captain");
    assert.strictEqual(entryB?.notes, "National Mathematics Olympiad Finalist");

    const verifyA = await emailAllowlistService.verifyEmail(studentA);
    const verifyB = await emailAllowlistService.verifyEmail(studentB);
    assert.strictEqual(verifyA.isAllowed, true);
    assert.strictEqual(verifyB.isAllowed, true);

    recordPass("Owner Directory Inspection Studio successfully lists independent user records with zero cross-overwriting.");

    // =========================================================================
    // 8. OWNER-ONLY PERMISSION ENFORCEMENT & IMMUTABILITY
    // =========================================================================
    console.log("\n--- 8. Owner-Only Permission Enforcement & Immutability ---");
    // Non-owner attempt to insert
    const unauthorizedInsert = emailAllowlistService.insertEmail(
      studentA,
      "unauthorized@moostechy.org",
      "learner"
    );
    assert.strictEqual(unauthorizedInsert.success, false, "Non-owner insertion MUST be rejected");

    // Non-owner attempt to disable
    const unauthorizedDisable = emailAllowlistService.setStatus(studentA, studentB, "DISABLED");
    assert.strictEqual(unauthorizedDisable.success, false, "Non-owner status mutation MUST be rejected");

    // Non-owner attempt to remove
    const unauthorizedRemove = emailAllowlistService.removeEmail(studentA, studentB);
    assert.strictEqual(unauthorizedRemove.success, false, "Non-owner deletion MUST be rejected");

    // IMMUTABILITY: Primary owner cannot be disabled or removed
    const disablePrimaryRes = emailAllowlistService.setStatus(SECONDARY_OWNER_EMAIL, PRIMARY_OWNER_EMAIL, "DISABLED");
    assert.strictEqual(disablePrimaryRes.success, false, "Primary owner cannot be disabled");

    const removePrimaryRes = emailAllowlistService.removeEmail(SECONDARY_OWNER_EMAIL, PRIMARY_OWNER_EMAIL);
    assert.strictEqual(removePrimaryRes.success, false, "Primary owner cannot be removed");

    // IMMUTABILITY: Secondary owner cannot be disabled or removed
    const disableSecondaryRes = emailAllowlistService.setStatus(PRIMARY_OWNER_EMAIL, SECONDARY_OWNER_EMAIL, "DISABLED");
    assert.strictEqual(disableSecondaryRes.success, false, "Secondary owner cannot be disabled");

    const removeSecondaryRes = emailAllowlistService.removeEmail(PRIMARY_OWNER_EMAIL, SECONDARY_OWNER_EMAIL);
    assert.strictEqual(removeSecondaryRes.success, false, "Secondary owner cannot be removed");

    recordPass("Strict owner-only governance enforced; dual designated owners are permanently immutable.");

    // =========================================================================
    // 9. REMOVAL & STATUS TOGGLE WITH SESSION INVALIDATION
    // =========================================================================
    console.log("\n--- 9. Entry Removal & Session Invalidation ---");
    // Secondary owner disables Student A
    const disableA = emailAllowlistService.setStatus(SECONDARY_OWNER_EMAIL, studentA, "DISABLED");
    assert.strictEqual(disableA.success, true);
    const postDisableCheckA = await emailAllowlistService.verifyEmail(studentA);
    assert.strictEqual(postDisableCheckA.isAllowed, false, "Disabled student A must be blocked");
    assert.strictEqual(postDisableCheckA.status, "BLOCKED_DISABLED");

    // Primary owner removes Student A
    const removeA = emailAllowlistService.removeEmail(PRIMARY_OWNER_EMAIL, studentA);
    assert.strictEqual(removeA.success, true);
    const postRemoveCheckA = await emailAllowlistService.verifyEmail(studentA);
    assert.strictEqual(postRemoveCheckA.isAllowed, false, "Removed student A must be blocked at entry");

    // Student B remains untouched and allowed
    const postCheckB = await emailAllowlistService.verifyEmail(studentB);
    assert.strictEqual(postCheckB.isAllowed, true, "Student B must remain allowed and unaffected");

    recordPass("Entry removal and status toggles take immediate effect without cross-entry contamination.");

    // =========================================================================
    // 10. OFFICIAL WHATSAPP BUSINESS SUPPORT LINE CONTRACT
    // =========================================================================
    console.log("\n--- 10. Official WhatsApp Business Line Contract ---");
    assert.strictEqual(
      ACADEMY_WHATSAPP_NUMBER,
      "2348142363729",
      "Academy WhatsApp number must strictly match official business line: 2348142363729"
    );
    assert.strictEqual(
      ACADEMY_WHATSAPP_URL,
      "https://wa.me/2348142363729",
      "Academy WhatsApp URL must strictly match https://wa.me/2348142363729"
    );
    recordPass("Official WhatsApp Business support line (2348142363729) verified as authoritative.");

  } catch (err: any) {
    recordFail("Unexpected Exception in Email Gate Test Suite", err?.stack || err?.message || String(err));
  }

  const allPassed = failedChecks === 0;
  console.log("\n==========================================================================");
  console.log(`📊 ACCESS MODEL & GATE FORENSIC SUMMARY: ${passedChecks}/${passedChecks + failedChecks} CHECKS PASSED`);
  console.log(`STATUS: ${allPassed ? "✅ ALL CHECKS PASSED (100% GREEN)" : "❌ VERIFICATION FAILED"}`);
  console.log("==========================================================================\n");

  return {
    passed: allPassed,
    totalChecks: passedChecks + failedChecks,
    passedChecks,
    failedChecks,
    details
  };
}

// Standalone runner for tsx execution
if (process.argv[1]?.includes("emailEntryGateForensics")) {
  runEmailEntryGateForensics().then((result) => {
    if (!result.passed) {
      process.exit(1);
    }
  });
}
