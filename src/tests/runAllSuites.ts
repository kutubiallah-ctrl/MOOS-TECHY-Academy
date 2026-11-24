/**
 * MOOS TECHY ACADEMY — UNIFIED TEST SUITE RUNNER
 *
 * Runs all 19 canonical test suites across all pillars.
 * Non-brittle execution: executes all suites and aggregates results.
 * Reports PASS, FAIL, SKIPPED, ERROR metrics and overall summary.
 */

import { spawnSync } from "child_process";
import path from "path";

interface SuiteResult {
  file: string;
  name: string;
  status: "PASS" | "FAIL" | "SKIPPED" | "ERROR";
  durationMs: number;
  outputSnippet?: string;
}

export interface CanonicalSuiteDefinition {
  path: string;
  name: string;
}

export const CANONICAL_TEST_SUITES: CanonicalSuiteDefinition[] = [
  { path: "src/tests/institutionalSecurityForensics.test.ts", name: "institutionalSecurityForensics" },
  { path: "src/tests/backupRestoreForensics.test.ts", name: "backupRestoreForensics" },
  { path: "src/tests/teacherStudioIntelligence.test.ts", name: "teacherStudioIntelligence" },
  { path: "src/tests/educationalInvariantsAndResilience.test.ts", name: "educationalInvariantsAndResilience" },
  { path: "src/tests/bookpreneurMarketplaceWorkflow.test.ts", name: "bookpreneurMarketplaceWorkflow" },
  { path: "src/tests/bookpreneurRoyaltyIngestionTextbookRepair.test.ts", name: "bookpreneurRoyaltyIngestionTextbookRepair" },
  { path: "src/tests/crossPillarIntegrationVerification.test.ts", name: "crossPillarIntegrationVerification" },
  { path: "src/tests/runtimeStabilityAndDataContractForensics.test.ts", name: "runtimeStabilityAndDataContractForensics" },
  { path: "src/tests/auditAndBackupVerification.test.ts", name: "auditAndBackupVerification" },
  { path: "src/tests/flagshipContentSaturation.test.ts", name: "flagshipContentSaturation" },
  { path: "src/tests/flagshipDomainEndToEndFunctionalCertification.test.ts", name: "flagshipDomainEndToEndFunctionalCertification" },
  { path: "src/tests/flagshipScenarioVerification.test.ts", name: "flagshipScenarioVerification" },
  { path: "src/tests/realUserAcceptanceJourneys.test.ts", name: "realUserAcceptanceJourneys" },
  { path: "src/tests/aiTeacherCopilotForensics.test.ts", name: "aiTeacherCopilotForensics" },
  { path: "src/tests/independentVerificationEngine.test.ts", name: "independentVerificationEngine" },
  { path: "src/tests/interactiveSmartBoardRealityStressTest.test.ts", name: "interactiveSmartBoardRealityStressTest" },
  { path: "src/tests/mathematicalPronunciationEngine.test.ts", name: "mathematicalPronunciationEngine" },
  { path: "src/tests/eslPedagogicalArchitecture.test.ts", name: "eslPedagogicalArchitecture" },
  { path: "src/tests/postFirebaseHardeningAndMultimodalRegression.test.ts", name: "postFirebaseHardeningAndMultimodalRegression" },
  { path: "src/tests/mfaSecurityForensics.test.ts", name: "mfaSecurityForensics" },
  { path: "src/tests/emailEntryGateForensics.test.ts", name: "emailEntryGateForensics" },
  { path: "src/tests/directive002HardeningAndContentQA.test.ts", name: "directive002HardeningAndContentQA" }
];

export const TEST_SUITES = CANONICAL_TEST_SUITES.map((s) => s.path);

async function runAll() {
  console.log("==========================================================================");
  console.log(`🏛️  MOOS ACADEMY — COMPLETE VERIFICATION HARNESS (${TEST_SUITES.length} SUITES)`);
  console.log("==========================================================================\n");

  const results: SuiteResult[] = [];
  const startTime = Date.now();

  for (let i = 0; i < TEST_SUITES.length; i++) {
    const suitePath = TEST_SUITES[i];
    const suiteName = path.basename(suitePath, ".test.ts");
    process.stdout.write(`[${i + 1}/${TEST_SUITES.length}] Executing ${suiteName}... `);

    const suiteStart = Date.now();
    try {
      const child = spawnSync("npx", ["tsx", suitePath], {
        encoding: "utf-8",
        timeout: 60000,
        env: { ...process.env, NODE_ENV: "test" }
      });

      const durationMs = Date.now() - suiteStart;

      if (child.error) {
        console.log("❌ ERROR");
        results.push({
          file: suitePath,
          name: suiteName,
          status: "ERROR",
          durationMs,
          outputSnippet: child.error.message
        });
      } else if (child.status === 0) {
        console.log(`✅ PASS (${(durationMs / 1000).toFixed(2)}s)`);
        results.push({
          file: suitePath,
          name: suiteName,
          status: "PASS",
          durationMs
        });
      } else {
        console.log("❌ FAIL");
        results.push({
          file: suitePath,
          name: suiteName,
          status: "FAIL",
          durationMs,
          outputSnippet: (child.stderr || child.stdout || "").slice(-400)
        });
      }
    } catch (err: any) {
      console.log("❌ EXCEPTION");
      results.push({
        file: suitePath,
        name: suiteName,
        status: "ERROR",
        durationMs: Date.now() - suiteStart,
        outputSnippet: err.message
      });
    }
  }

  const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);
  const passed = results.filter((r) => r.status === "PASS").length;
  const failed = results.filter((r) => r.status === "FAIL").length;
  const errors = results.filter((r) => r.status === "ERROR").length;
  const skipped = results.filter((r) => r.status === "SKIPPED").length;

  console.log("\n==========================================================================");
  console.log("📊 COMPLETE TEST EXECUTION SUMMARY REPORT");
  console.log("==========================================================================");
  console.log(`Total Suites Executed: ${results.length}`);
  console.log(`PASS:    ${passed}`);
  console.log(`FAIL:    ${failed}`);
  console.log(`ERROR:   ${errors}`);
  console.log(`SKIPPED: ${skipped}`);
  console.log(`Duration: ${totalDuration}s`);
  console.log("--------------------------------------------------------------------------");

  results.forEach((r, idx) => {
    const icon = r.status === "PASS" ? "✅" : r.status === "FAIL" ? "❌" : "⚠️";
    console.log(`${icon} [${r.status.padEnd(5)}] ${(idx + 1).toString().padStart(2)}. ${r.name.padEnd(48)} (${(r.durationMs / 1000).toFixed(2)}s)`);
    if (r.outputSnippet && r.status !== "PASS") {
      console.log(`   Output: ${r.outputSnippet.trim()}`);
    }
  });
  console.log("==========================================================================");

  if (failed > 0 || errors > 0) {
    console.error(`\n🚨 Verification failed with ${failed} failure(s) and ${errors} error(s).`);
    process.exit(1);
  } else {
    console.log(`\n🎉 ALL ${passed} CANONICAL TEST SUITES PASSED FLAWLESSLY (100% GREEN)!`);
    process.exit(0);
  }
}

if (process.argv[1]?.includes("runAllSuites")) {
  runAll();
}
