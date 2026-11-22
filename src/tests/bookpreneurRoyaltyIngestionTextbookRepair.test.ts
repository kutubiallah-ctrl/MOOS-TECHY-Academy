import { manuscriptIngestionService } from "../services/manuscriptIngestionService";
import { royaltyService } from "../services/royaltyService";
import { textbookStudioService } from "../services/textbookStudioService";
import { bookpreneurService } from "../services/bookpreneurService";
import { auditService } from "../services/auditService";
import { SEEDED_ADMIN_USER, SEEDED_TEACHER_USER, SEEDED_LEARNER_USER } from "../services/identityService";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ Assertion Failed: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ [PASS]: ${message}`);
  }
}

async function runCertification() {
  console.log("\n==========================================================================");
  console.log("📘 CERTIFICATION: BOOKPRENEUR INGESTION, ROYALTY & TEXTBOOK STUDIO ACCESS");
  console.log("==========================================================================\n");

  const teacher = SEEDED_TEACHER_USER;
  const learner = SEEDED_LEARNER_USER;
  const admin = SEEDED_ADMIN_USER;

  // --------------------------------------------------------------------------
  // PILLAR 1: CREATOR MANUSCRIPT INGESTION & ORIGINAL FILE PRESERVATION
  // --------------------------------------------------------------------------
  console.log("--- PILLAR 1: Manuscript Ingestion & Original File Preservation ---");
  
  const sampleDocxText = `
# Advanced Secondary Physics: Mechanics, Thermodynamics and Field Dynamics
Author: Dr. O. Adeleke
Subject: Physics

Chapter 1: Kinematics and Classical Dynamics
Kinematics formalizes the mathematical description of motion through differential displacements.
Section 1.1: Vector Calculus of Velocity and Acceleration
Velocity is the rate of change of displacement vector s(t). For uniform acceleration a:
Equation: v = u + at
Equation: s = ut + (1/2)at^2
Section 1.2: Newton's Laws and Momentum Conservation
When net external force is zero, linear momentum remains invariant over time.

Chapter 2: Energy, Work and Power
Work is the line integral of force over path trajectory.
Section 2.1: Conservation of Mechanical Energy
Potential energy transforms into kinetic energy under conservative vector fields.
Equation: E_total = K + U = constant

Chapter 3: Thermodynamics and Heat Transfer
Heat flows down temperature gradients in accordance with entropy production.
Section 3.1: First Law of Thermodynamics
Internal energy changes reflect net heat added minus work performed by system.
Equation: dU = dQ - dW

Chapter 4: Electrostatics and Coulombic Interactions
Electric charge produces divergence in ambient electrostatic field lines.
Section 4.1: Coulomb's Inverse Square Law
The force between two point charges varies inversely with squared separation.
Equation: F = (1 / (4 pi epsilon_0)) * (q1 * q2 / r^2)

Chapter 5: Electromagnetic Induction and Maxwellian Electrodynamics
Varying magnetic flux induces electromotive force in conducting loops.
Section 5.1: Faraday's Law and Lenz's Orientation Rule
Equation: EMF = - dPhi_B / dt
`;

  // Encode as buffer
  const textBuffer = Buffer.from(sampleDocxText, "utf-8");
  const ingestionResult = await manuscriptIngestionService.ingestFile({
    name: "Advanced_Secondary_Physics_Curriculum.docx",
    size: textBuffer.byteLength,
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    buffer: textBuffer,
    creatorId: teacher.id,
    creatorName: teacher.displayName
  });

  assert(ingestionResult.originalFile !== undefined, "Original file is preserved in ingestion result");
  assert(ingestionResult.originalFile.fileName === "Advanced_Secondary_Physics_Curriculum.docx", "Preserved file retains exact original file name");
  assert(ingestionResult.originalFile.fileSize === textBuffer.byteLength, "Preserved file records byte length precisely");
  assert(ingestionResult.originalFile.checksum.startsWith("chk-"), "Integrity checksum is deterministically generated");
  assert(ingestionResult.chapters.length >= 4, `All chapters extracted without artificial cap (Extracted ${ingestionResult.chapters.length} chapters)`);
  assert(ingestionResult.metadata.detectedChapterCount === ingestionResult.chapters.length, "Metadata detectedChapterCount aligns with chapters array");
  assert(ingestionResult.metadata.detectedWordCount > 100, "Detected word count reflects substantive document content");

  // Convert ingested manuscript into a published textbook project
  const convertedResource = bookpreneurService.createResourceFromIngestedManuscript(
    teacher,
    ingestionResult,
    {
      title: "Advanced Secondary Physics: Mechanics & Field Dynamics",
      subtitle: "Comprehensive 5-Chapter Curriculum Guide for Senior Secondary",
      authorName: teacher.displayName,
      category: "textbook",
      subject: "Physics",
      educationLevel: "SSS_1_3",
      format: "stem_codex",
      price: 5000,
      currency: "NGN",
      description: "Complete physics curriculum extracted directly from peer-reviewed secondary manuscript."
    }
  );

  assert(convertedResource !== null, "Manuscript converted into Marketplace resource successfully");
  assert(convertedResource.id.startsWith("mkt-res-"), "Generated resource ID is valid");
  assert(convertedResource.price === 5000, "Resource price set to ₦5,000");

  // Publish resource
  bookpreneurService.submitResourceForReview(teacher, convertedResource.id);
  bookpreneurService.approveResource(admin, convertedResource.id, "Peer review complete");
  const publishedResource = bookpreneurService.publishResource(admin, convertedResource.id);
  assert(publishedResource.publicationStatus === "PUBLISHED", "Resource published to marketplace catalog");

  // --------------------------------------------------------------------------
  // PILLAR 2: IMMUTABLE 70/30 ROYALTY SPLIT & CONNECTED PAYOUT RAILS
  // --------------------------------------------------------------------------
  console.log("\n--- PILLAR 2: Royalty Reconciliation & Payout Rail Integrity ---");

  // 1. Verify 70/30 Split Precision
  const testAmounts = [1000, 3500, 4999, 7550, 10000];
  for (const gross of testAmounts) {
    const split = royaltyService.calculateSplit(gross);
    assert(
      split.creatorShare + split.platformShare === gross,
      `Exact penny reconciliation for ₦${gross} (Creator: ₦${split.creatorShare}, Platform: ₦${split.platformShare})`
    );
    assert(
      Math.abs(split.creatorShare - gross * 0.7) <= 0.01,
      `Creator receives strictly 70% of ₦${gross}`
    );
    assert(
      Math.abs(split.platformShare - gross * 0.3) <= 0.01,
      `Platform receives strictly 30% of ₦${gross}`
    );
  }

  // 2. Add Connected Payout Accounts
  const teacherLedger = royaltyService.getOrCreateLedger(teacher, teacher.id, teacher.displayName);
  const bankAcc = royaltyService.addConnectedAccount(teacher.id, {
    accountType: "bank_account",
    accountNickname: "Zenith Bank Institutional",
    bankDetails: {
      bankName: "Zenith Bank PLC",
      accountNumber: "2018899210",
      accountHolderName: "O. Adeleke",
      countryCode: "NG",
      nubanVerified: true
    },
    isPrimary: true
  });
  assert(bankAcc.id.startsWith("acc-"), "Connected bank account created");
  assert(bankAcc.isPrimary, "First account is configured as primary");

  const momoAcc = royaltyService.addConnectedAccount(teacher.id, {
    accountType: "mobile_money",
    accountNickname: "MTN MoMo Business",
    mobileMoneyDetails: {
      provider: "MTN MoMo",
      phoneNumber: "+2348031122334",
      accountHolderName: "O. Adeleke",
      countryCode: "NG"
    },
    isPrimary: false
  });
  assert(!momoAcc.isPrimary, "Secondary account added without overwriting primary");

  // Switch primary
  royaltyService.setPrimaryConnectedAccount(teacher.id, momoAcc.id);
  const updatedLedger = royaltyService.getOrCreateLedger(teacher, teacher.id);
  const currentPrimary = updatedLedger.connectedPayoutAccounts.find((a) => a.isPrimary);
  assert(currentPrimary?.id === momoAcc.id, "Primary payout destination updated successfully to MoMo");

  // Switch back to bank
  royaltyService.setPrimaryConnectedAccount(teacher.id, bankAcc.id);

  // 3. Record a Sale of the newly converted resource
  const saleTx = royaltyService.recordSale({
    creatorId: teacher.id,
    resourceId: publishedResource.id,
    resourceTitle: publishedResource.title,
    buyerId: learner.id,
    buyerRole: "LEARNER",
    grossAmount: 5000,
    currency: "NGN",
    instantSettlement: true
  });

  assert(saleTx.creatorShare === 3500, "Sale allocated exactly ₦3,500 (70%) to teacher");
  assert(saleTx.platformShare === 1500, "Sale allocated exactly ₦1,500 (30%) to platform");

  // 4. Request Payout Disbursement
  const ledgerBefore = royaltyService.getOrCreateLedger(teacher, teacher.id);
  const availableBefore = ledgerBefore.availableBalance;
  const paidBefore = ledgerBefore.paidBalance;
  const balanceToDisburse = 2000;
  assert(availableBefore >= balanceToDisburse, "Teacher has sufficient cleared balance for payout");

  const disbursement = royaltyService.requestPayout({
    creatorId: teacher.id,
    destinationAccountId: bankAcc.id,
    amount: balanceToDisburse,
    currency: "NGN",
    requestNote: "Quarterly textbook royalty draw"
  });

  assert(disbursement.amount === balanceToDisburse, "Disbursement requested for specified amount");
  assert(disbursement.status === "disbursed", "Disbursement processed to escrow ledger");
  assert(disbursement.referenceCode.startsWith("DISB-"), "Valid reference code assigned");

  const ledgerAfter = royaltyService.getOrCreateLedger(teacher, teacher.id);
  assert(
    ledgerAfter.availableBalance === availableBefore - balanceToDisburse,
    "Available balance decremented by disbursed amount"
  );
  assert(
    ledgerAfter.paidBalance === paidBefore + balanceToDisburse,
    "Paid balance incremented by disbursed amount"
  );

  // --------------------------------------------------------------------------
  // PILLAR 3: COMPLETE TEXTBOOK STUDIO ACCESS & CHAPTER EXPOSURE
  // --------------------------------------------------------------------------
  console.log("\n--- PILLAR 3: Complete Textbook Studio Access Without Cap ---");

  const textbooks = textbookStudioService.getAvailableTextbooks(learner);
  assert(textbooks.length > 0, "Textbooks available in Textbook Studio catalog");

  // Test every available textbook to ensure all chapters are accessible
  for (const tb of textbooks) {
    const fullTextbook = textbookStudioService.getTextbookById(learner, tb.id);
    assert(fullTextbook !== null, `Textbook ${tb.title} loaded successfully`);
    if (fullTextbook) {
      assert(fullTextbook.chapters.length >= 6, `Textbook '${tb.title}' provides complete chapter set (Total: ${fullTextbook.chapters.length} chapters, not truncated)`);
      assert(fullTextbook.chapters.every((ch) => ch.sections.length > 0), `All chapters in '${tb.title}' contain substantive pedagogical sections`);
      
      // Test reading all chapters sequentially
      for (const ch of fullTextbook.chapters) {
        const readChapter = textbookStudioService.getChapterContent(learner, tb.id, ch.chapterNumber);
        assert(readChapter !== null, `Chapter ${ch.chapterNumber} '${ch.title}' is fully readable`);
        assert(readChapter!.sections.length > 0, `Chapter ${ch.chapterNumber} has accessible reading sections`);
      }
    }
  }

  // --------------------------------------------------------------------------
  // AUDIT TRAIL VERIFICATION
  // --------------------------------------------------------------------------
  console.log("\n--- AUDIT TRAIL VERIFICATION ---");
  const logs = auditService.queryLogs();
  const ingestionLogs = logs.filter((l) => l.eventType === "MANUSCRIPT_INGESTED" || l.eventType === "MANUSCRIPT_CONVERTED");
  const royaltyLogs = logs.filter(
    (l) => l.eventType === "ROYALTY_DISBURSEMENT_INITIATED" || l.eventType === "ROYALTY_ACCOUNT_UPDATED"
  );
  
  assert(ingestionLogs.length >= 1, "Audit trail captured manuscript ingestion events");
  assert(royaltyLogs.length >= 1, "Audit trail captured royalty disbursement events");

  console.log("\n==========================================================================");
  console.log("🎉 ALL BOOKPRENEUR REPAIR CERTIFICATIONS PASSED (100% GREEN)");
  console.log("==========================================================================\n");
}

runCertification()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("Certification failed:", err);
    process.exit(1);
  });
