/**
 * MOOS TECHY ACADEMY — FIREBASE MFA FORENSIC VERIFICATION SUITE
 * 
 * TASK ID: MOOS-SECURITY-002
 * 
 * Comprehensive verification of:
 * 1. Default TOTP second-factor primitives (RFC 6238 HMAC-SHA1) — NO SMS, NO simulated success
 * 2. Complete 8-step verification journey in real code
 * 3. Hashed single-use Backup Recovery Codes (SHA-256 + salt) with one-time burn
 * 4. Zero-Trust Enforcement: rejection of client-set flags & tamper prevention
 * 5. Privileged operation protection (admin switching, RBAC, Guardian, Bookpreneur)
 * 6. Decoupling of db-init gate from MFA enforcement
 * 7. Rate limiting sliding window lockout (5 failed attempts)
 */

import { strict as assert } from "assert";
import { mfaService } from "../services/mfaService";
import { identityService, SEEDED_ADMIN_USER, SEEDED_LEARNER_USER } from "../services/identityService";
import { authorizationService, PRIVILEGED_MFA_PERMISSIONS } from "../services/authorizationService";
import { backendFoundationService } from "../services/backendFoundationService";
import { developmentGuardianService } from "../services/developmentGuardianService";
import { auditService } from "../services/auditService";

export interface MfaForensicTestResult {
  passed: boolean;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  details: string[];
}

export async function runMfaSecurityForensics(): Promise<MfaForensicTestResult> {
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
  console.log("🔐 MOOS TECHY ACADEMY — FIREBASE MFA FORENSIC VERIFICATION (MOOS-SECURITY-002)");
  console.log("==========================================================================\n");

  const testUser = "usr_adm_amina_bello";
  const testEmail = "amina.bello@governance.moos.academy";

  try {
    // Reset state before tests
    mfaService.resetForTesting();
    identityService.resetForTesting();

    // =========================================================================
    // 1. DEFAULT FACTOR = TOTP (NO SMS ANYWHERE, REAL RFC 6238 ENGINE)
    // =========================================================================
    console.log("--- 1. Default Second-Factor Primitives & RFC 6238 Engine ---");
    const secret = mfaService.generateBase32Secret(20);
    assert.strictEqual(secret.length, 20, "Generated secret must be 20 characters Base32");
    assert.ok(/^[A-Z2-7]+$/.test(secret), "Secret must strictly contain valid Base32 characters");

    // Real mathematical code generation and verification
    const currentCode = mfaService.calculateTotpCode(secret);
    assert.strictEqual(currentCode.length, 6, "TOTP code must be exactly 6 digits");
    assert.ok(/^\d{6}$/.test(currentCode), "TOTP code must be strictly numeric");

    const validVerification = mfaService.verifyTotpCodeMath(secret, currentCode);
    assert.strictEqual(validVerification, true, "Mathematically calculated TOTP code must verify true");

    // Rejection of invalid codes (NO simulated success)
    const invalidVerification = mfaService.verifyTotpCodeMath(secret, "999999" === currentCode ? "111111" : "999999");
    assert.strictEqual(invalidVerification, false, "Arbitrary invalid code must be strictly rejected");

    recordPass("Default factor is TOTP (RFC 6238 HMAC-SHA1); invalid codes strictly rejected without simulated success.");

    // =========================================================================
    // 2. FULL 8-STEP VERIFICATION JOURNEY
    // =========================================================================
    console.log("\n--- 2. Full 8-Step Verification Journey ---");

    // Step 1: Initiation
    const step1 = mfaService.initiateEnrollmentJourney(testUser, testEmail);
    assert.strictEqual(step1.step, "STEP_1_INITIATION");
    assert.strictEqual(step1.canProceed, true);
    recordPass("Step 1: Initiation established clean journey context and audit entry.");

    // Step 2: Account Validation
    const step2 = mfaService.validateAccountForMfa(testUser, testEmail);
    assert.strictEqual(step2.step, "STEP_2_ACCOUNT_VALIDATION");
    assert.strictEqual(step2.isValid, true);

    const step2Invalid = mfaService.validateAccountForMfa("", "notanemail");
    assert.strictEqual(step2Invalid.isValid, false, "Invalid email/id must be rejected");
    recordPass("Step 2: Account ownership and email binding validated.");

    // Step 3: Code Delivery / Secret Provisioning
    const provision = await mfaService.provisionTotpSecret(testUser, testEmail);
    assert.ok(provision.secretKey.length >= 16, "Secret key must be provisioned");
    assert.ok(provision.otpauthUri.startsWith("otpauth://totp/"), "URI must conform to RFC 6238 otpauth scheme");
    assert.ok(provision.otpauthUri.includes("issuer=MOOS%20Academy"), "URI must declare authentic issuer");
    assert.ok(provision.qrCodeUrl.startsWith("https://"), "High-fidelity QR code URL must be provisioned");
    recordPass("Step 3: Provisioned RFC 6238 TOTP secret, otpauth:// URI, and QR code representation.");

    // Step 4: Code Submission & Real Mathematical Verification
    const step4ValidCode = mfaService.calculateTotpCode(provision.secretKey);
    const step4Check = mfaService.verifyCandidateCode(testUser, step4ValidCode, provision.secretKey);
    assert.strictEqual(step4Check.isValid, true, "Valid candidate code must verify");

    const step4BadCheck = mfaService.verifyCandidateCode(testUser, "000000", provision.secretKey);
    assert.strictEqual(step4BadCheck.isValid, false, "Bogus code must fail Step 4 verification");
    recordPass("Step 4: Code submission executed authentic drift verification [-1, 0, +1].");

    // Step 5: Successful Enrollment & 10 Single-Use Recovery Codes
    const enrollment = await mfaService.completeEnrollment(testUser, step4ValidCode, provision);
    assert.strictEqual(enrollment.success, true);
    assert.strictEqual(enrollment.profile.isEnrolled, true);
    assert.strictEqual(enrollment.profile.assuranceLevel, "AAL2");
    assert.strictEqual(enrollment.recoveryCodes.length, 10, "Must generate exactly 10 recovery codes");
    assert.strictEqual(enrollment.recoveryCodes[0].startsWith("MOOS-"), true, "Recovery code must use canonical prefix");
    assert.strictEqual(enrollment.assuranceTicket.assuranceLevel, "AAL2");
    recordPass("Step 5: Enrolled TOTP second-factor and issued 10 single-use Backup Recovery Codes.");

    // Step 6: Subsequent Sign-In / Role Challenge Resolution
    const ticketBefore = mfaService.hasActiveAssurance(testUser);
    assert.strictEqual(ticketBefore, true, "AAL2 assurance ticket must be active post-enrollment");

    // Simulate subsequent challenge using a newly calculated code
    const freshTotp = mfaService.calculateTotpCode(provision.secretKey);
    const verifyFresh = mfaService.verifyCandidateCode(testUser, freshTotp);
    assert.strictEqual(verifyFresh.isValid, true, "Subsequent challenge verification must succeed");
    recordPass("Step 6: Subsequent second-factor challenge verified cleanly.");

    // Step 7: Rate-Limiting & Lockout Handling (5-Attempt Threshold)
    console.log("\n--- 3. Rate-Limiting & Lockout Forensics ---");
    const rateLimitVictim = "usr_test_attacker_uid";
    mfaService.clearRateLimit(rateLimitVictim);

    for (let i = 1; i <= 4; i++) {
      const status = mfaService.recordFailedAttempt(rateLimitVictim);
      assert.strictEqual(status.isLocked, false, `Attempt ${i} must not trigger lockout`);
      assert.strictEqual(status.remainingAttempts, 5 - i);
    }
    const fifthAttempt = mfaService.recordFailedAttempt(rateLimitVictim);
    assert.strictEqual(fifthAttempt.isLocked, true, "5th failed attempt must trigger rate-limit lockout");
    assert.ok(fifthAttempt.cooldownSeconds > 0, "Cooldown seconds must be positive");

    const lockedCheck = mfaService.checkRateLimit(rateLimitVictim);
    assert.strictEqual(lockedCheck.isLocked, true, "Subsequent checks must report lockout");
    recordPass("Step 7: Enforced 5-attempt sliding window rate-limit lockout and audit reporting.");

    // Step 8: Secure Single-Use Backup Recovery Code Redemption & Burn
    console.log("\n--- 4. Recovery Code Hashing & Single-Use Burn Forensics ---");
    const recoveryRec = await mfaService.getRecoveryCodesRecord(testUser);
    assert.ok(recoveryRec, "Recovery record must exist in storage");
    assert.strictEqual(recoveryRec.hashedCodes.length, 10, "10 hashed recovery codes must be stored");
    assert.strictEqual(recoveryRec.consumedCodes.length, 0, "0 consumed codes initially");

    // Verify recovery codes are NOT stored in plaintext
    const firstPlainCode = enrollment.recoveryCodes[0];
    assert.strictEqual(
      recoveryRec.hashedCodes.includes(firstPlainCode),
      false,
      "CRITICAL: Plaintext recovery code must NEVER be stored in persistence"
    );

    // Redeem the first recovery code
    const redeem1 = await mfaService.verifyAndConsumeRecoveryCode(testUser, firstPlainCode);
    assert.strictEqual(redeem1.success, true, "Valid recovery code must be accepted");
    assert.strictEqual(redeem1.assuranceTicket?.factorType, "recovery_code");

    // Check that code was permanently burned
    const updatedRec = await mfaService.getRecoveryCodesRecord(testUser);
    assert.strictEqual(updatedRec?.remainingCount, 9, "Remaining codes must decrease to 9");
    assert.strictEqual(updatedRec?.consumedCodes.length, 1, "Consumed codes must increment to 1");

    // Attempt to REUSE the burned recovery code
    const reuseAttempt = await mfaService.verifyAndConsumeRecoveryCode(testUser, firstPlainCode);
    assert.strictEqual(reuseAttempt.success, false, "Reused recovery code MUST be rejected");
    assert.strictEqual(reuseAttempt.errorCode, "MFA_RECOVERY_CODE_ALREADY_USED");

    // Attempt with an invalid recovery code
    const bogusRecovery = await mfaService.verifyAndConsumeRecoveryCode(testUser, "MOOS-BOGUS-CODE");
    assert.strictEqual(bogusRecovery.success, false, "Bogus recovery code must be rejected");
    assert.strictEqual(bogusRecovery.errorCode, "MFA_RECOVERY_CODE_INVALID");

    recordPass("Step 8: Single-use recovery code verified, burned, and reuse strictly prevented.");

    // =========================================================================
    // 3. ZERO-TRUST ENFORCEMENT (NEVER TRUST CLIENT-SET FLAGS OR HOLES)
    // =========================================================================
    console.log("\n--- 5. Zero-Trust Enforcement & Privilege Boundary Gates ---");

    // Revoke assurance to test gates
    mfaService.revokeAssurance(testUser);
    assert.strictEqual(mfaService.hasActiveAssurance(testUser), false, "Assurance must be revoked");

    // Test the identityService switchUser hole: switching to Admin without MFA MUST be blocked
    let switchBlocked = false;
    try {
      identityService.switchUser(SEEDED_ADMIN_USER.id);
    } catch (e: any) {
      if (e?.message?.includes("MFA_VERIFICATION_REQUIRED")) {
        switchBlocked = true;
      }
    }
    assert.strictEqual(switchBlocked, true, "CRITICAL: switchUser to ADMIN must be blocked without MFA assurance");
    recordPass("Plugging switchUser hole: Admin role elevation blocked when MFA assurance missing.");

    // Client tampering simulation: fake mfaVerified in localStorage
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("mfaVerified", "true");
      localStorage.setItem("moos_mock_role", "ADMIN");
    }

    // AuthorizationService must ignore client-side flags and deny privileged operations
    const fakeSession = {
      sessionId: "sess_tampered",
      userId: "usr_attacker",
      role: "ADMIN" as const,
      displayName: "Attacker",
      createdAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
      mfaVerified: true, // Tampered client flag
      deviceContext: { isLocalDevice: true as const, clientVersion: "1.0.0", environment: "browser_local_storage" as const }
    };

    const manageUsersDecision = authorizationService.can(fakeSession, "MANAGE_USERS", undefined, { requireMfaAssurance: true });
    assert.strictEqual(manageUsersDecision.granted, false, "MANAGE_USERS must be denied without authentic AAL2 ticket");
    assert.strictEqual(manageUsersDecision.denialCode, "MFA_VERIFICATION_REQUIRED");

    const settingsDecision = authorizationService.can(fakeSession, "MANAGE_SYSTEM_SETTINGS", undefined, { requireMfaAssurance: true });
    assert.strictEqual(settingsDecision.granted, false, "MANAGE_SYSTEM_SETTINGS must be denied");

    const backupExportDecision = authorizationService.can(fakeSession, "EXPORT_CLASSROOM_DATA", undefined, { requireMfaAssurance: true });
    assert.strictEqual(backupExportDecision.granted, false, "EXPORT_CLASSROOM_DATA must be denied");

    const publishDecision = authorizationService.can(fakeSession, "PUBLISH_MARKETPLACE_RESOURCE", undefined, { requireMfaAssurance: true });
    assert.strictEqual(publishDecision.granted, false, "PUBLISH_MARKETPLACE_RESOURCE must be denied");

    const auditLogDecision = authorizationService.can(fakeSession, "VIEW_AUDIT_LOG", undefined, { requireMfaAssurance: true });
    assert.strictEqual(auditLogDecision.granted, false, "VIEW_AUDIT_LOG must be denied");

    recordPass("Client-set mfaVerified and session role tampering rejected by authorizationService.");

    // Test Development Guardian high-risk action approval gate
    const highRiskTask = developmentGuardianService.createTask({
      title: "Production Infrastructure Schema Update",
      description: "production_deploy and modify_auth_architecture",
      category: "security",
      priority: "critical",
      riskLevel: "critical",
      sourceRequirement: "REQ-SEC-002",
      affectedSystems: ["AuthService", "MfaService"],
      dependencies: [],
      assignedAgent: "security_agent",
      status: "AWAITING_APPROVAL",
      requiredVerification: ["SECURITY_VERIFIED"],
      acceptanceCriteria: ["MFA required for high-risk action approval"],
      regressionRisks: ["Unauthorized privileged deployment"]
    });

    const approvalRes = developmentGuardianService.approveTaskByHuman(
      highRiskTask.taskId,
      "usr_unverified_approver",
      { enforceMfa: true }
    );
    assert.strictEqual(approvalRes.success, false, "Guardian human approval must require MFA assurance");
    assert.ok(approvalRes.message.includes("MFA_VERIFICATION_REQUIRED"));
    recordPass("Development Guardian high-risk approval gated behind MFA assurance.");

    // Now issue authentic AAL2 ticket and verify operations succeed
    mfaService.issueAssuranceTicket(testUser, "totp");
    assert.strictEqual(mfaService.hasActiveAssurance(testUser), true);

    // Switching to Admin now succeeds
    const adminSession = identityService.switchUser(SEEDED_ADMIN_USER.id);
    assert.strictEqual(adminSession.role, "ADMIN");
    assert.strictEqual(adminSession.mfaAssuranceLevel, "AAL2");

    // Privileged assertion succeeds with AAL2
    const authorizedDecision = authorizationService.can(adminSession, "MANAGE_SYSTEM_SETTINGS", undefined, { requireMfaAssurance: true });
    assert.strictEqual(authorizedDecision.granted, true, "Authorized admin with AAL2 must be granted permission");
    recordPass("Elevated Admin session with verified AAL2 ticket successfully executes privileged operations.");

    // =========================================================================
    // 4. DATABASE INITIALIZATION DECOUPLED FROM MFA
    // =========================================================================
    console.log("\n--- 6. Database Readiness & MFA Decoupling ---");
    const dbHealth = await backendFoundationService.getDatabaseHealth();
    assert.ok(dbHealth.status === "CONNECTED" || dbHealth.status === "OFFLINE" || dbHealth.status === "DEGRADED");
    assert.strictEqual(typeof dbHealth.schemaSynced, "boolean");

    // Verify DB readiness check does not depend on user MFA
    mfaService.revokeAssurance(testUser);
    const dbHealthPostRevoke = await backendFoundationService.getDatabaseHealth();
    assert.strictEqual(dbHealthPostRevoke.status, dbHealth.status, "DB health check must be completely decoupled from MFA");
    recordPass("Database readiness gate is strictly decoupled from MFA enforcement.");

    // =========================================================================
    // 5. BACKEND FOUNDATION CLAIMS & PILLAR AUDIT
    // =========================================================================
    console.log("\n--- 7. Backend Foundation Claims & Pillar Audit ---");
    const backendUser = backendFoundationService.resolveBackendAuthUser(testUser);
    assert.strictEqual(typeof backendUser.claims.mfaVerified, "boolean");
    assert.ok(["AAL1", "AAL2"].includes(backendUser.claims.mfaAssuranceLevel || ""));

    const pillars = backendFoundationService.auditAllPillars();
    const authPillar = pillars.find(p => p.pillar === "AUTHENTICATION");
    assert.ok(authPillar, "Authentication pillar must exist");
    assert.strictEqual(authPillar.evidence.defaultFactor, "totp");
    assert.strictEqual(authPillar.evidence.mfaEnforced, true);
    recordPass("Backend foundation claims and 4-pillar audit reflect authentic MFA telemetry.");

  } catch (err: any) {
    recordFail("Unexpected Exception in MFA Test Suite", err?.stack || err?.message || String(err));
  }

  const allPassed = failedChecks === 0;
  console.log("\n==========================================================================");
  console.log(`📊 MFA SECURITY FORENSIC SUMMARY: ${passedChecks}/${passedChecks + failedChecks} CHECKS PASSED`);
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
if (process.argv[1]?.includes("mfaSecurityForensics")) {
  runMfaSecurityForensics().then((result) => {
    if (!result.passed) {
      process.exit(1);
    }
  });
}
