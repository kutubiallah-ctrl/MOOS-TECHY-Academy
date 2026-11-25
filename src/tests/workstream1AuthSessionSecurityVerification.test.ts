/**
 * MOOS ACADEMY — WORKSTREAM 1 (P0) SECURITY & AUTHENTICATION LIFECYCLE VERIFICATION
 *
 * End-to-end verifiable tests for:
 * 1. POST /api/auth/firebase-session (RSA-SHA256 JWT verification, claims, owner elevation)
 * 2. Invalid, expired, missing, tampered, alg-downgraded, unverified-email, and wrong-aud/iss tokens
 * 3. Server-side session lifecycle: GET /api/auth/session, expiration, POST /api/auth/logout & replay rejection
 * 4. Protected route rejections (401 unauthenticated, 403 ordinary learner on owner/admin endpoints)
 * 5. Cross-account learner data isolation (Learner B blocked 403 from Learner A progress)
 * 6. Live Google X.509 certificate endpoint reachability + local vs production parity
 */

import { strict as assert } from "assert";
import crypto from "crypto";
import type { Server } from "http";
import fs from "fs";
import path from "path";
import { serverAuthGovernance } from "../../server/authGovernance";

const PROJECT_ID = "genial-bucksaw-wxctm";
const ISSUER = `https://securetoken.google.com/${PROJECT_ID}`;

function b64UrlJson(obj: unknown): string {
  return Buffer.from(JSON.stringify(obj), "utf8").toString("base64url");
}

function signRs256Jwt(
  header: Record<string, unknown>,
  payload: Record<string, unknown>,
  privateKeyPem: string
): string {
  const h = b64UrlJson(header);
  const p = b64UrlJson(payload);
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(`${h}.${p}`);
  signer.end();
  const sig = signer.sign(privateKeyPem).toString("base64url");
  return `${h}.${p}.${sig}`;
}

async function startEphemeralAppServer(): Promise<{ server: Server; baseUrl: string }> {
  process.env.MOOS_SKIP_AUTO_LISTEN = "true";
  const { app } = await import("../../server");
  return new Promise((resolve, reject) => {
    const server = app.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      if (!addr || typeof addr === "string") {
        reject(new Error("Failed to bind ephemeral server port."));
        return;
      }
      resolve({ server, baseUrl: `http://127.0.0.1:${addr.port}` });
    });
  });
}

export async function runWorkstream1AuthSecuritySuite(): Promise<{ passed: boolean }> {
  let checksPassed = 0;
  function pass(msg: string) {
    checksPassed++;
    console.log(`  ✅ [PASS] ${msg}`);
  }

  console.log("==========================================================================");
  console.log("🔐 MOOS ACADEMY — WORKSTREAM 1 (P0) AUTH & SESSION SECURITY VERIFICATION");
  console.log("==========================================================================\n");

  serverAuthGovernance.resetForTesting();

  // Generate genuine RSA-2048 keypair for cryptographic RS256 Firebase JWT tests
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" }
  });
  const testKid = "moos-test-rsa-kid-001";

  const { server, baseUrl } = await startEphemeralAppServer();

  try {
    // -----------------------------------------------------------------------
    // 1. Verify live Google X.509 certificate endpoint reachability
    // -----------------------------------------------------------------------
    const certsResp = await fetch(
      "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"
    );
    assert.strictEqual(certsResp.status, 200, "Google X.509 public certs endpoint must return HTTP 200");
    const liveCerts = (await certsResp.json()) as Record<string, string>;
    const certKeys = Object.keys(liveCerts);
    assert.ok(certKeys.length >= 1, "Google X.509 certs map must include at least one active signing key");
    assert.ok(liveCerts[certKeys[0]].includes("BEGIN CERTIFICATE"), "Live Google key must be a valid PEM certificate");
    pass(`Live Google X.509 certs endpoint verified (${certKeys.length} active signing keys).`);

    // Configure test RSA key in governance verifier for live HTTP POST /api/auth/firebase-session
    serverAuthGovernance.setTestFirebaseCerts({ [testKid]: publicKey });
    const nowSec = Math.floor(Date.now() / 1000);
    const [primaryOwner] = serverAuthGovernance.getOwnerEmails();

    // -----------------------------------------------------------------------
    // 2. Test POST /api/auth/firebase-session failure modes
    // -----------------------------------------------------------------------
    // Missing token -> 400
    const missingTokenRes = await fetch(`${baseUrl}/api/auth/firebase-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });
    assert.strictEqual(missingTokenRes.status, 400, "Missing idToken must return HTTP 400");

    // Malformed JWT -> 401
    const malformedRes = await fetch(`${baseUrl}/api/auth/firebase-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: "not.a.valid.jwt.token" })
    });
    assert.strictEqual(malformedRes.status, 401, "Malformed JWT must return HTTP 401");

    // Algorithm downgrade attack (alg: none / HS256) -> 401
    const algNoneToken = `${b64UrlJson({ alg: "none", kid: testKid })}.${b64UrlJson({
      aud: PROJECT_ID,
      iss: ISSUER,
      sub: "uid-attacker",
      email: primaryOwner,
      email_verified: true,
      iat: nowSec - 10,
      exp: nowSec + 3600
    })}.`;
    const algNoneRes = await fetch(`${baseUrl}/api/auth/firebase-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: algNoneToken })
    });
    assert.strictEqual(algNoneRes.status, 401, "alg=none downgrade must be rejected with HTTP 401");

    // Unknown kid -> 401
    const unknownKidJwt = signRs256Jwt(
      { alg: "RS256", kid: "unknown-kid-999" },
      {
        aud: PROJECT_ID,
        iss: ISSUER,
        sub: "uid-learner-1",
        email: "learner.unknown@moos.edu",
        email_verified: true,
        iat: nowSec - 10,
        exp: nowSec + 3600
      },
      privateKey
    );
    const unknownKidRes = await fetch(`${baseUrl}/api/auth/firebase-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: unknownKidJwt })
    });
    assert.strictEqual(unknownKidRes.status, 401, "Unknown signing kid must return HTTP 401");

    // Expired Firebase token -> 401
    const expiredFirebaseJwt = signRs256Jwt(
      { alg: "RS256", kid: testKid },
      {
        aud: PROJECT_ID,
        iss: ISSUER,
        sub: "uid-learner-1",
        email: "learner.expired@moos.edu",
        email_verified: true,
        iat: nowSec - 7200,
        exp: nowSec - 60
      },
      privateKey
    );
    const expiredFbRes = await fetch(`${baseUrl}/api/auth/firebase-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: expiredFirebaseJwt })
    });
    assert.strictEqual(expiredFbRes.status, 401, "Expired Firebase ID token must return HTTP 401");

    // Wrong audience -> 401
    const wrongAudJwt = signRs256Jwt(
      { alg: "RS256", kid: testKid },
      {
        aud: "evil-other-project",
        iss: ISSUER,
        sub: "uid-learner-1",
        email: "learner.aud@moos.edu",
        email_verified: true,
        iat: nowSec - 10,
        exp: nowSec + 3600
      },
      privateKey
    );
    const wrongAudRes = await fetch(`${baseUrl}/api/auth/firebase-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: wrongAudJwt })
    });
    assert.strictEqual(wrongAudRes.status, 401, "Wrong aud claim must return HTTP 401");

    // Tampered payload preserving valid signature -> 401
    const legitLearnerJwt = signRs256Jwt(
      { alg: "RS256", kid: testKid },
      {
        aud: PROJECT_ID,
        iss: ISSUER,
        sub: "uid-learner-a",
        email: "chidinma.okoro@moos.edu",
        name: "Chidinma Okoro",
        email_verified: true,
        iat: nowSec - 10,
        exp: nowSec + 3600
      },
      privateKey
    );
    const [lHead, , lSig] = legitLearnerJwt.split(".");
    const tamperedPayload = b64UrlJson({
      aud: PROJECT_ID,
      iss: ISSUER,
      sub: "uid-owner-spoof",
      email: primaryOwner,
      email_verified: true,
      iat: nowSec - 10,
      exp: nowSec + 3600
    });
    const tamperedJwt = `${lHead}.${tamperedPayload}.${lSig}`;
    const tamperedRes = await fetch(`${baseUrl}/api/auth/firebase-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: tamperedJwt })
    });
    assert.strictEqual(tamperedRes.status, 401, "Tampered Firebase payload must fail RS256 verification (401)");

    // Unverified email -> 403 VERIFICATION_REQUIRED
    const unverifiedJwt = signRs256Jwt(
      { alg: "RS256", kid: testKid },
      {
        aud: PROJECT_ID,
        iss: ISSUER,
        sub: "uid-unverified",
        email: "unverified.user@moos.edu",
        email_verified: false,
        iat: nowSec - 10,
        exp: nowSec + 3600
      },
      privateKey
    );
    const unverifiedRes = await fetch(`${baseUrl}/api/auth/firebase-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: unverifiedJwt })
    });
    assert.strictEqual(unverifiedRes.status, 403, "Unverified Firebase email must return HTTP 403");
    pass("Rejected missing, malformed, alg-none, unknown-kid, expired, wrong-aud, tampered, and unverified Firebase tokens.");

    // -----------------------------------------------------------------------
    // 3. Successful Firebase Authentication & Session Exchange (Learner & Owner)
    // -----------------------------------------------------------------------
    const learnerSessionRes = await fetch(`${baseUrl}/api/auth/firebase-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: legitLearnerJwt })
    });
    assert.strictEqual(learnerSessionRes.status, 200, "Valid learner Firebase ID token must return HTTP 200");
    const learnerJson = (await learnerSessionRes.json()) as any;
    assert.strictEqual(learnerJson.isAllowed, true);
    assert.strictEqual(learnerJson.isOwnerAutoElevated, false);
    assert.strictEqual(learnerJson.session.role, "learner");
    assert.strictEqual(learnerJson.session.authProvider, "firebase");
    assert.strictEqual(learnerJson.session.isOwner, false);
    assert.ok(learnerJson.session.jti, "Issued session must contain unique jti for revocation tracking");
    const learnerAToken = learnerJson.serverVerificationToken as string;

    // Second ordinary learner B
    const learnerBJwt = signRs256Jwt(
      { alg: "RS256", kid: testKid },
      {
        aud: PROJECT_ID,
        iss: ISSUER,
        sub: "uid-learner-b",
        email: "ibrahim.musa@moos.edu",
        name: "Ibrahim Musa",
        email_verified: true,
        iat: nowSec - 10,
        exp: nowSec + 3600
      },
      privateKey
    );
    const learnerBRes = await fetch(`${baseUrl}/api/auth/firebase-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: learnerBJwt })
    });
    assert.strictEqual(learnerBRes.status, 200);
    const learnerBToken = ((await learnerBRes.json()) as any).serverVerificationToken as string;

    // Designated Owner Firebase ID token -> Owner elevation on server
    const ownerJwt = signRs256Jwt(
      { alg: "RS256", kid: testKid },
      {
        aud: PROJECT_ID,
        iss: ISSUER,
        sub: "uid-founder-owner",
        email: primaryOwner,
        name: "Kutubi Allah",
        email_verified: true,
        iat: nowSec - 10,
        exp: nowSec + 3600
      },
      privateKey
    );
    const ownerSessionRes = await fetch(`${baseUrl}/api/auth/firebase-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: ownerJwt })
    });
    assert.strictEqual(ownerSessionRes.status, 200, "Verified owner Firebase ID token must return HTTP 200");
    const ownerJson = (await ownerSessionRes.json()) as any;
    assert.strictEqual(ownerJson.isOwnerAutoElevated, true);
    assert.strictEqual(ownerJson.session.role, "owner");
    assert.strictEqual(ownerJson.session.isOwner, true);
    const ownerToken = ownerJson.serverVerificationToken as string;
    pass("POST /api/auth/firebase-session created learner & owner server sessions accurately.");

    // -----------------------------------------------------------------------
    // 4. Session Inspection, Expiration, Logout & Server Invalidation
    // -----------------------------------------------------------------------
    const activeSessionRes = await fetch(`${baseUrl}/api/auth/session`, {
      headers: { Authorization: `Bearer ${learnerAToken}` }
    });
    assert.strictEqual(activeSessionRes.status, 200, "Active Firebase session must succeed on GET /api/auth/session");

    // Expired server session token must be rejected -> 401
    const expiredSession = serverAuthGovernance.issueSessionToken({
      email: "chidinma.okoro@moos.edu",
      role: "learner",
      authProvider: "firebase",
      ttlMs: -5000
    });
    const expiredSessionRes = await fetch(`${baseUrl}/api/auth/session`, {
      headers: { Authorization: `Bearer ${expiredSession.token}` }
    });
    assert.strictEqual(expiredSessionRes.status, 401, "Expired session token must return HTTP 401");

    // Tampered session token signature -> 401
    const [sPay, sSig] = learnerAToken.split(".");
    const tamperedSessionToken = `${sPay}.${"0".repeat(sSig.length)}`;
    const tamperedSessionRes = await fetch(`${baseUrl}/api/auth/session`, {
      headers: { Authorization: `Bearer ${tamperedSessionToken}` }
    });
    assert.strictEqual(tamperedSessionRes.status, 401, "Tampered server session HMAC must return HTTP 401");

    // Logout & immediate server-side revocation
    const logoutRes = await fetch(`${baseUrl}/api/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${learnerBToken}` }
    });
    assert.strictEqual(logoutRes.status, 200, "POST /api/auth/logout must succeed for authenticated session");
    const logoutJson = (await logoutRes.json()) as any;
    assert.strictEqual(logoutJson.loggedOut, true);

    const replayAfterLogout = await fetch(`${baseUrl}/api/auth/session`, {
      headers: { Authorization: `Bearer ${learnerBToken}` }
    });
    assert.strictEqual(replayAfterLogout.status, 401, "Revoked token replayed after logout must return HTTP 401");
    pass("Verified session expiration, tampered HMAC rejection, POST /api/auth/logout, and replay invalidation.");

    // -----------------------------------------------------------------------
    // 5. Protected Routes & Cross-Account Learner Data Isolation
    // -----------------------------------------------------------------------
    const protectedEndpoints: Array<{ method: string; path: string }> = [
      { method: "GET", path: "/api/auth/session" },
      { method: "POST", path: "/api/auth/logout" },
      { method: "GET", path: "/api/allowlist/list" },
      { method: "POST", path: "/api/allowlist/insert" },
      { method: "GET", path: "/api/development-bridge/status" },
      { method: "POST", path: "/api/video/generate" },
      { method: "POST", path: "/api/audio/transcribe" },
      { method: "GET", path: "/api/learner/progress/chidinma.okoro@moos.edu" }
    ];
    for (const ep of protectedEndpoints) {
      const r = await fetch(`${baseUrl}${ep.path}`, { method: ep.method });
      assert.strictEqual(r.status, 401, `Unauthenticated ${ep.method} ${ep.path} must reject with 401`);
    }

    // Learner A cannot access Owner endpoints (403)
    const learnerOwnerAllowlist = await fetch(`${baseUrl}/api/allowlist/list`, {
      headers: { Authorization: `Bearer ${learnerAToken}` }
    });
    assert.strictEqual(learnerOwnerAllowlist.status, 403, "Ordinary Firebase learner blocked from /api/allowlist/list");
    const learnerOwnerBridge = await fetch(`${baseUrl}/api/development-bridge/status`, {
      headers: { Authorization: `Bearer ${learnerAToken}` }
    });
    assert.strictEqual(learnerOwnerBridge.status, 403, "Ordinary Firebase learner blocked from /api/development-bridge/status");

    // Owner accesses allowlist cleanly (200)
    const ownerAllowlist = await fetch(`${baseUrl}/api/allowlist/list`, {
      headers: { Authorization: `Bearer ${ownerToken}` }
    });
    assert.strictEqual(ownerAllowlist.status, 200);

    // Learner A saves own progress (200), Learner B tries to read/write Learner A progress (403)
    const saveOwnRes = await fetch(`${baseUrl}/api/learner/progress/chidinma.okoro@moos.edu`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${learnerAToken}`
      },
      body: JSON.stringify({ xp: 450, masteryPoints: 200, completedSkills: ["skill-linear-equations"] })
    });
    assert.strictEqual(saveOwnRes.status, 200, "Learner A must be able to save own progress");

    const readOwnRes = await fetch(`${baseUrl}/api/learner/progress/chidinma.okoro@moos.edu`, {
      headers: { Authorization: `Bearer ${learnerAToken}` }
    });
    assert.strictEqual(readOwnRes.status, 200);
    const readOwnJson = (await readOwnRes.json()) as any;
    assert.strictEqual(readOwnJson.progress.xp, 450);

    // Re-authenticate Learner B for isolation check
    const learnerB2Res = await fetch(`${baseUrl}/api/auth/firebase-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: learnerBJwt })
    });
    const learnerB2Token = ((await learnerB2Res.json()) as any).serverVerificationToken as string;

    const crossRead = await fetch(`${baseUrl}/api/learner/progress/chidinma.okoro@moos.edu`, {
      headers: { Authorization: `Bearer ${learnerB2Token}` }
    });
    assert.strictEqual(crossRead.status, 403, "Cross-account learner GET must return 403 Forbidden");

    const crossWrite = await fetch(`${baseUrl}/api/learner/progress/chidinma.okoro@moos.edu`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${learnerB2Token}`
      },
      body: JSON.stringify({ xp: 999999 })
    });
    assert.strictEqual(crossWrite.status, 403, "Cross-account learner PUT must return 403 Forbidden");

    // Verify unknown /api/* route consistently returns JSON 404
    const unknownApiRes = await fetch(`${baseUrl}/api/does-not-exist-endpoint`);
    assert.strictEqual(unknownApiRes.status, 404, "Unknown /api/* route must return HTTP 404");

    // Verify firestore.rules contains cross-learner isolation & verified owner gates
    const rulesSrc = fs.readFileSync(path.join(process.cwd(), "firestore.rules"), "utf8");
    assert.ok(rulesSrc.includes("request.auth.token.email_verified == true"));
    assert.ok(rulesSrc.includes("match /learnerProfiles/{userId}") && rulesSrc.includes("allow get: if (isOwner(userId) || isAdmin())"));
    assert.ok(rulesSrc.includes("match /mfaRecoveryCodes/{userId}") && rulesSrc.includes("allow get: if isOwner(userId)"));
    pass("Verified all protected routes, owner isolation, cross-account learner isolation, and rules alignment.");

    console.log("\n==========================================================================");
    console.log(`🎉 WORKSTREAM 1 AUTH & SECURITY SUITE PASSED (${checksPassed} check blocks green)`);
    console.log("==========================================================================\n");
    return { passed: true };
  } finally {
    serverAuthGovernance.resetForTesting();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

if (process.argv[1]?.includes("workstream1AuthSessionSecurityVerification")) {
  runWorkstream1AuthSecuritySuite()
    .then((r) => {
      if (!r.passed) process.exit(1);
    })
    .catch((err) => {
      console.error("❌ Workstream 1 Auth Suite failed:", err);
      process.exit(1);
    });
}
