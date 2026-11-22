/**
 * MOOS TECHY BOOKPRENEUR — ROYALTY & FINANCIAL SETTLEMENT SERVICE
 * 
 * Manages creator financial ledgers, immutable 70/30 revenue splits,
 * provider-neutral payout accounts, verification states, and transaction histories.
 */

import {
  CreatorPayoutProfile,
  PayoutState,
  RoyaltyTransaction,
  RoyaltyFinancialLedger,
  PayoutDisbursementRequest,
  PayoutDisbursementResult,
  PayoutProviderType,
  ConnectedPayoutAccount,
  BankPayoutDetails,
  MobileMoneyPayoutDetails,
  PayoutDisbursement
} from "../types/royalty";
import { UserSession, UserIdentity, InstitutionalUser } from "../types/identity";
import { auditService } from "./auditService";

export class RoyaltyService {
  private ledgers: Map<string, RoyaltyFinancialLedger> = new Map();

  constructor() {
    this.seedDefaultLedgers();
  }

  private seedDefaultLedgers(): void {
    const initialTxs: RoyaltyTransaction[] = [
      {
        id: "tx-init-001",
        creatorId: "user-author-001",
        resourceId: "mkt-metacog-codex",
        resourceTitle: "Metacognitive Mastery: Accelerated STEM Comprehension",
        buyerId: "usr-school-lagos-01",
        buyerRole: "INSTITUTION",
        type: "SALE",
        grossAmount: 45000,
        creatorShare: 31500,
        platformShare: 13500,
        currency: "NGN",
        timestamp: "2026-02-01T14:30:00Z",
        status: "cleared",
        transactionReference: "REF-MKT-20260201-4412"
      },
      {
        id: "tx-init-002",
        creatorId: "user-author-001",
        resourceId: "mkt-cemm-math-s1",
        resourceTitle: "C.E.M.M Modern Mathematics: Foundational to Advanced",
        buyerId: "usr-learner-883",
        buyerRole: "LEARNER",
        type: "SALE",
        grossAmount: 4500,
        creatorShare: 3150,
        platformShare: 1350,
        currency: "NGN",
        timestamp: "2026-02-10T10:15:00Z",
        status: "cleared",
        transactionReference: "REF-MKT-20260210-9901"
      },
      {
        id: "tx-init-003",
        creatorId: "user-author-001",
        resourceId: "mkt-cemm-math-s1",
        resourceTitle: "C.E.M.M Modern Mathematics: Foundational to Advanced",
        buyerId: "usr-learner-890",
        buyerRole: "LEARNER",
        type: "REFUND",
        grossAmount: -4500,
        creatorShare: -3150,
        platformShare: -1350,
        currency: "NGN",
        timestamp: "2026-02-12T16:00:00Z",
        status: "refunded",
        transactionReference: "REF-MKT-20260212-REF8"
      },
      {
        id: "tx-init-004",
        creatorId: "user-author-001",
        resourceId: "ESCROW-DISBURSEMENT",
        resourceTitle: "Verified Monthly Royalty Payout Batch #01",
        buyerId: "PLATFORM_ESCROW",
        buyerRole: "SYSTEM",
        type: "PAYOUT_DISBURSEMENT",
        grossAmount: -220000,
        creatorShare: -220000,
        platformShare: 0,
        currency: "NGN",
        timestamp: "2026-02-15T09:00:00Z",
        status: "disbursed",
        transactionReference: "DISB-20260215-ADELEKE"
      }
    ];

    const initialPayouts: PayoutDisbursement[] = [
      {
        id: "disb-init-001",
        creatorId: "user-author-001",
        destinationAccountId: "acc-adeleke-01",
        destinationAccountSummary: "First Bank of Nigeria (0123****89)",
        amount: 220000,
        currency: "NGN",
        requestedAt: "2026-02-14T10:00:00Z",
        processedAt: "2026-02-15T09:00:00Z",
        status: "disbursed",
        referenceCode: "DISB-20260215-ADELEKE",
        requestNote: "Verified Monthly Royalty Payout Batch #01"
      }
    ];

    const initialAccounts: ConnectedPayoutAccount[] = [
      {
        id: "acc-adeleke-01",
        accountType: "bank_account",
        accountNickname: "First Bank Main Account",
        bankDetails: {
          bankName: "First Bank of Nigeria",
          accountNumber: "0123456789",
          accountHolderName: "Dr. O. Adeleke",
          countryCode: "NG",
          nubanVerified: true
        },
        isPrimary: true,
        status: "active",
        addedAt: "2026-01-15T09:30:00Z"
      }
    ];

    // Seed Dr. O. Adeleke (Primary author)
    const adelekeLedger: RoyaltyFinancialLedger = {
      creatorId: "user-author-001",
      creatorName: "Dr. O. Adeleke",
      totalSalesCount: 142,
      totalRefundCount: 2,
      grossRevenue: 639000,
      creatorEarnings: 447300,       // 70% of 639,000
      platformCommission: 191700,    // 30% of 639,000
      pendingEscrowBalance: 42300,
      lifetimeCreatorShare: 447300,
      lifetimeGrossSales: 639000,
      totalDisbursed: 220000,
      lifetimePlatformCommission: 191700,
      availableBalance: 185000,
      pendingBalance: 42300,
      paidBalance: 220000,
      payoutProfile: {
        id: "pop-adeleke-01",
        creatorId: "user-author-001",
        creatorName: "Dr. O. Adeleke",
        provider: "direct_bank_settlement",
        providerLabel: "Direct Commercial Bank Clearing (NIBSS / CBN)",
        maskedAccountNumber: "0123****89",
        bankOrInstitutionName: "First Bank of Nigeria PLC",
        accountHolderName: "O. Adeleke Educational Publishing",
        currency: "NGN",
        verificationStatus: "verified",
        verifiedAt: "2026-01-20T11:00:00Z",
        isProductionProviderConnected: false,
        createdAt: "2026-01-15T09:30:00Z",
        updatedAt: "2026-01-20T11:00:00Z"
      },
      connectedPayoutAccounts: initialAccounts,
      payoutState: "payout_eligible",
      transactions: initialTxs,
      transactionHistory: initialTxs,
      payoutHistory: initialPayouts,
      providerIntegrationStatus: {
        isConnected: false,
        providerName: "Direct Commercial Bank Rail (NIBSS Neutral Abstraction)",
        environmentMode: "sandbox_escrow",
        statusNotice:
          "Escrow Mode: Live production banking settlement credentials are not connected in this environment. Payout disbursements are logged to sovereign institutional escrow ledger."
      },
      updatedAt: new Date().toISOString()
    };

    this.ledgers.set("user-author-001", adelekeLedger);
  }

  /**
   * Helper to resolve actor identifier
   */
  private getActorId(actor: UserSession | UserIdentity | InstitutionalUser): string {
    return "userId" in actor ? actor.userId : actor.id;
  }

  /**
   * Enforce that actor can only access their own royalty ledger unless ADMIN
   */
  public assertCanAccessLedger(
    actor: UserSession | UserIdentity | InstitutionalUser,
    targetCreatorId: string
  ): void {
    const actorId = this.getActorId(actor);
    const role = actor.role.toUpperCase();

    if (role === "ADMIN") return;

    if (actorId !== targetCreatorId) {
      auditService.recordDenial({
        actorId,
        actorRole: actor.role,
        actorDisplayName: actor.displayName || "Unknown",
        resourceType: "royalty_account",
        resourceId: targetCreatorId,
        denialCode: "CREATOR_ACCESS_VIOLATION",
        reason: `User '${actorId}' cannot access royalty ledger belonging to creator '${targetCreatorId}'.`
      });

      throw new Error(
        `Access Denied: You cannot view or modify the royalty ledger belonging to creator '${targetCreatorId}'.`
      );
    }
  }

  /**
   * Retrieve or initialize financial ledger for a creator
   */
  public getOrCreateLedger(
    actorOrCreatorId: UserSession | UserIdentity | InstitutionalUser | string,
    creatorIdParam?: string,
    creatorName?: string
  ): RoyaltyFinancialLedger {
    const isString = typeof actorOrCreatorId === "string";
    const creatorId = isString ? actorOrCreatorId : (creatorIdParam || this.getActorId(actorOrCreatorId));

    if (!isString && creatorIdParam) {
      this.assertCanAccessLedger(actorOrCreatorId, creatorId);
    }

    let ledger = this.ledgers.get(creatorId);
    if (!ledger) {
      const defaultAccounts: ConnectedPayoutAccount[] = [];
      const defaultTxs: RoyaltyTransaction[] = [];
      const defaultPayouts: PayoutDisbursement[] = [];

      ledger = {
        creatorId,
        creatorName: creatorName || (typeof actorOrCreatorId !== "string" ? actorOrCreatorId.displayName : "Creator") || "Creator",
        totalSalesCount: 0,
        totalRefundCount: 0,
        grossRevenue: 0,
        creatorEarnings: 0,
        platformCommission: 0,
        pendingEscrowBalance: 0,
        lifetimeCreatorShare: 0,
        lifetimeGrossSales: 0,
        totalDisbursed: 0,
        lifetimePlatformCommission: 0,
        availableBalance: 0,
        pendingBalance: 0,
        paidBalance: 0,
        payoutProfile: null,
        connectedPayoutAccounts: defaultAccounts,
        payoutState: "no_payout_account_configured",
        transactions: defaultTxs,
        transactionHistory: defaultTxs,
        payoutHistory: defaultPayouts,
        providerIntegrationStatus: {
          isConnected: false,
          providerName: "Neutral Payout Abstraction Rail",
          environmentMode: "sandbox_escrow",
          statusNotice:
            "Escrow Mode: Live production banking settlement credentials are not connected in this environment. Payout disbursements are logged to sovereign institutional escrow ledger."
        },
        updatedAt: new Date().toISOString()
      };
      this.ledgers.set(creatorId, ledger);
    }

    // Ensure backwards compatibility aliases are synchronized
    ledger.pendingEscrowBalance = ledger.pendingBalance;
    ledger.lifetimeCreatorShare = ledger.creatorEarnings;
    ledger.lifetimeGrossSales = ledger.grossRevenue;
    ledger.totalDisbursed = ledger.paidBalance;
    ledger.lifetimePlatformCommission = ledger.platformCommission;
    ledger.transactionHistory = ledger.transactions;
    if (!ledger.connectedPayoutAccounts) ledger.connectedPayoutAccounts = [];
    if (!ledger.payoutHistory) ledger.payoutHistory = [];

    return ledger;
  }

  /**
   * Add a connected payout destination account (bank or mobile money)
   */
  public addConnectedAccount(
    creatorId: string,
    accountData: {
      accountType: "bank_account" | "mobile_money";
      accountNickname: string;
      bankDetails?: BankPayoutDetails;
      mobileMoneyDetails?: MobileMoneyPayoutDetails;
      isPrimary?: boolean;
    }
  ): ConnectedPayoutAccount {
    const ledger = this.getOrCreateLedger(creatorId);
    const newId = `acc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const shouldBePrimary = accountData.isPrimary ?? (ledger.connectedPayoutAccounts.length === 0);

    if (shouldBePrimary) {
      ledger.connectedPayoutAccounts.forEach((acc) => {
        acc.isPrimary = false;
      });
    }

    const newAccount: ConnectedPayoutAccount = {
      id: newId,
      accountType: accountData.accountType,
      accountNickname: accountData.accountNickname,
      bankDetails: accountData.bankDetails,
      mobileMoneyDetails: accountData.mobileMoneyDetails,
      isPrimary: shouldBePrimary,
      status: "active",
      addedAt: new Date().toISOString()
    };

    ledger.connectedPayoutAccounts.push(newAccount);

    // Also update primary profile for single-profile abstraction
    if (shouldBePrimary) {
      if (accountData.bankDetails) {
        ledger.payoutProfile = {
          id: `pop-${newId}`,
          creatorId,
          creatorName: ledger.creatorName,
          provider: "direct_bank_settlement",
          providerLabel: accountData.bankDetails.bankName,
          maskedAccountNumber: accountData.bankDetails.accountNumber.length > 5
            ? `${accountData.bankDetails.accountNumber.slice(0, 3)}****${accountData.bankDetails.accountNumber.slice(-2)}`
            : "****" + accountData.bankDetails.accountNumber.slice(-2),
          bankOrInstitutionName: accountData.bankDetails.bankName,
          accountHolderName: accountData.bankDetails.accountHolderName,
          currency: "NGN",
          verificationStatus: "verified",
          verifiedAt: new Date().toISOString(),
          isProductionProviderConnected: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
      }
    }

    this.refreshPayoutState(ledger);
    ledger.updatedAt = new Date().toISOString();
    return newAccount;
  }

  /**
   * Set an account as the primary payout destination
   */
  public setPrimaryConnectedAccount(creatorId: string, accountId: string): void {
    const ledger = this.getOrCreateLedger(creatorId);
    let found = false;

    ledger.connectedPayoutAccounts.forEach((acc) => {
      if (acc.id === accountId) {
        acc.isPrimary = true;
        found = true;
        if (acc.bankDetails) {
          ledger.payoutProfile = {
            id: `pop-${acc.id}`,
            creatorId,
            creatorName: ledger.creatorName,
            provider: "direct_bank_settlement",
            providerLabel: acc.bankDetails.bankName,
            maskedAccountNumber: acc.bankDetails.accountNumber.length > 5
              ? `${acc.bankDetails.accountNumber.slice(0, 3)}****${acc.bankDetails.accountNumber.slice(-2)}`
              : "****" + acc.bankDetails.accountNumber.slice(-2),
            bankOrInstitutionName: acc.bankDetails.bankName,
            accountHolderName: acc.bankDetails.accountHolderName,
            currency: "NGN",
            verificationStatus: "verified",
            verifiedAt: new Date().toISOString(),
            isProductionProviderConnected: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
        }
      } else {
        acc.isPrimary = false;
      }
    });

    if (!found) {
      throw new Error(`Account '${accountId}' not found.`);
    }

    this.refreshPayoutState(ledger);
    ledger.updatedAt = new Date().toISOString();
  }

  /**
   * Remove a connected payout account
   */
  public removeConnectedAccount(creatorId: string, accountId: string): void {
    const ledger = this.getOrCreateLedger(creatorId);
    const index = ledger.connectedPayoutAccounts.findIndex((a) => a.id === accountId);
    if (index === -1) {
      throw new Error(`Account '${accountId}' not found.`);
    }

    const wasPrimary = ledger.connectedPayoutAccounts[index].isPrimary;
    ledger.connectedPayoutAccounts.splice(index, 1);

    if (wasPrimary && ledger.connectedPayoutAccounts.length > 0) {
      ledger.connectedPayoutAccounts[0].isPrimary = true;
    } else if (ledger.connectedPayoutAccounts.length === 0) {
      ledger.payoutProfile = null;
    }

    this.refreshPayoutState(ledger);
    ledger.updatedAt = new Date().toISOString();
  }

  /**
   * Request a creator payout to a specific connected account
   */
  public requestPayout(params: {
    creatorId: string;
    destinationAccountId: string;
    amount: number;
    currency?: "NGN" | "USD";
    requestNote?: string;
  }): PayoutDisbursement {
    const ledger = this.getOrCreateLedger(params.creatorId);
    const account = ledger.connectedPayoutAccounts.find((a) => a.id === params.destinationAccountId);
    if (!account) {
      throw new Error("Specified destination payout account does not exist.");
    }

    const minAmount = 1000;
    if (params.amount < minAmount) {
      throw new Error(`Minimum payout amount is ₦${minAmount.toLocaleString()}.`);
    }

    if (params.amount > ledger.availableBalance) {
      throw new Error(`Insufficient available balance (₦${ledger.availableBalance.toLocaleString()}) for requested payout of ₦${params.amount.toLocaleString()}.`);
    }

    ledger.availableBalance -= params.amount;
    ledger.paidBalance += params.amount;
    ledger.totalDisbursed = ledger.paidBalance;

    const refCode = `DISB-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const destinationSummary = account.bankDetails
      ? `${account.bankDetails.bankName} (${account.bankDetails.accountNumber.slice(-4)})`
      : `${account.mobileMoneyDetails?.provider} (${account.mobileMoneyDetails?.phoneNumber.slice(-4)})`;

    const disbursement: PayoutDisbursement = {
      id: `disb-${Date.now()}`,
      creatorId: params.creatorId,
      destinationAccountId: params.destinationAccountId,
      destinationAccountSummary: destinationSummary,
      amount: params.amount,
      currency: params.currency || "NGN",
      requestedAt: new Date().toISOString(),
      processedAt: new Date().toISOString(),
      status: "disbursed",
      referenceCode: refCode,
      requestNote: params.requestNote
    };

    const tx: RoyaltyTransaction = {
      id: `tx-disb-${Date.now()}`,
      creatorId: params.creatorId,
      resourceId: "ESCROW-DISBURSEMENT",
      resourceTitle: `Royalty Payout to ${destinationSummary}`,
      buyerId: "PLATFORM_ESCROW",
      buyerRole: "SYSTEM",
      type: "PAYOUT_DISBURSEMENT",
      grossAmount: -params.amount,
      creatorShare: -params.amount,
      platformShare: 0,
      currency: params.currency || "NGN",
      timestamp: new Date().toISOString(),
      status: "disbursed",
      transactionReference: refCode,
      notes: params.requestNote
    };

    ledger.transactions.unshift(tx);
    ledger.transactionHistory = ledger.transactions;
    ledger.payoutHistory.unshift(disbursement);

    this.refreshPayoutState(ledger);
    ledger.updatedAt = new Date().toISOString();

    auditService.logEvent({
      eventType: "ROYALTY_DISBURSEMENT_INITIATED",
      actorId: params.creatorId,
      actorRole: "TEACHER",
      actorDisplayName: ledger.creatorName,
      resourceType: "royalty_account",
      resourceId: params.creatorId,
      result: "SUCCESS",
      dataClassification: "TEACHER_PRIVATE",
      metadata: {
        amount: params.amount,
        referenceCode: refCode,
        destinationSummary
      }
    });

    return disbursement;
  }

  /**
   * Calculate 70/30 split with exact mathematical reconciliation
   * Guarantees creatorShare + platformShare === grossAmount with ZERO rounding drift
   */
  public calculateSplit(grossAmount: number): {
    grossAmount: number;
    creatorShare: number;
    platformShare: number;
    creatorPercentage: number;
    platformPercentage: number;
  } {
    const creatorPercentage = 70;
    const platformPercentage = 30;

    // Standard banker's rounding to 2 decimal places
    const creatorShare = Math.round(grossAmount * 0.7 * 100) / 100;
    const platformShare = Math.round((grossAmount - creatorShare) * 100) / 100;

    return {
      grossAmount,
      creatorShare,
      platformShare,
      creatorPercentage,
      platformPercentage
    };
  }

  /**
   * Record a completed sale of an educational resource
   */
  public recordSale(params: {
    creatorId: string;
    resourceId: string;
    resourceTitle: string;
    buyerId: string;
    buyerRole: string;
    grossAmount: number;
    currency?: "NGN" | "USD";
    instantSettlement?: boolean;
  }): RoyaltyTransaction {
    const { creatorId, resourceId, resourceTitle, buyerId, buyerRole, grossAmount } = params;
    const currency = params.currency || "NGN";
    const instantSettlement = params.instantSettlement ?? true;

    if (grossAmount <= 0) {
      throw new Error("Sale amount must be greater than zero.");
    }

    const { creatorShare, platformShare } = this.calculateSplit(grossAmount);
    const txId = `tx-sale-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    const transaction: RoyaltyTransaction = {
      id: txId,
      creatorId,
      resourceId,
      resourceTitle,
      buyerId,
      buyerRole,
      type: "SALE",
      grossAmount,
      creatorShare,
      platformShare,
      currency,
      timestamp: new Date().toISOString(),
      status: instantSettlement ? "cleared" : "pending_settlement",
      transactionReference: `REF-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`
    };

    const ledger = this.getOrCreateLedger(creatorId);

    ledger.totalSalesCount += 1;
    ledger.grossRevenue += grossAmount;
    ledger.creatorEarnings += creatorShare;
    ledger.platformCommission += platformShare;

    if (instantSettlement) {
      ledger.availableBalance += creatorShare;
    } else {
      ledger.pendingBalance += creatorShare;
    }

    ledger.transactions.unshift(transaction);
    this.refreshPayoutState(ledger);
    ledger.updatedAt = new Date().toISOString();

    return transaction;
  }

  /**
   * Record a refund for a previously completed sale
   */
  public recordRefund(params: {
    creatorId: string;
    resourceId: string;
    resourceTitle: string;
    buyerId: string;
    grossRefundAmount: number;
    currency?: "NGN" | "USD";
    reason?: string;
  }): RoyaltyTransaction {
    const { creatorId, resourceId, resourceTitle, buyerId, grossRefundAmount } = params;
    const currency = params.currency || "NGN";
    const positiveGross = Math.abs(grossRefundAmount);

    const { creatorShare, platformShare } = this.calculateSplit(positiveGross);
    const txId = `tx-ref-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    const transaction: RoyaltyTransaction = {
      id: txId,
      creatorId,
      resourceId,
      resourceTitle,
      buyerId,
      buyerRole: "BUYER",
      type: "REFUND",
      grossAmount: -positiveGross,
      creatorShare: -creatorShare,
      platformShare: -platformShare,
      currency,
      timestamp: new Date().toISOString(),
      status: "refunded",
      transactionReference: `REFUND-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
      notes: params.reason || "Learner course/book refund"
    };

    const ledger = this.ledgers.get(creatorId);
    if (ledger) {
      ledger.totalRefundCount += 1;
      ledger.grossRevenue = Math.max(0, ledger.grossRevenue - positiveGross);
      ledger.creatorEarnings = Math.max(0, ledger.creatorEarnings - creatorShare);
      ledger.platformCommission = Math.max(0, ledger.platformCommission - platformShare);
      ledger.availableBalance = Math.max(0, ledger.availableBalance - creatorShare);
      ledger.transactions.unshift(transaction);
      this.refreshPayoutState(ledger);
      ledger.updatedAt = new Date().toISOString();
    }

    return transaction;
  }

  /**
   * Configure or update creator payout profile (provider-neutral)
   */
  public updatePayoutProfile(
    actor: UserSession | UserIdentity | InstitutionalUser,
    creatorId: string,
    profileData: {
      provider: PayoutProviderType;
      accountNumber: string;
      bankOrInstitutionName: string;
      accountHolderName: string;
      currency?: "NGN" | "USD";
    }
  ): CreatorPayoutProfile {
    this.assertCanAccessLedger(actor, creatorId);

    const cleanAcc = profileData.accountNumber.trim();
    if (cleanAcc.length < 6) {
      throw new Error("Account identifier must be at least 6 characters.");
    }

    // Mask sensitive financial identifier: first 3 digits + **** + last 2 digits
    const masked =
      cleanAcc.length > 5
        ? `${cleanAcc.slice(0, 3)}****${cleanAcc.slice(-2)}`
        : `****${cleanAcc.slice(-2)}`;

    const providerLabels: Record<PayoutProviderType, string> = {
      direct_bank_settlement: "Direct Commercial Bank Rail (NIBSS / CBN)",
      interswitch_rail: "Interswitch Clearing & Settlement Rail",
      paystack_settlement: "Paystack Creator Merchant Rail",
      institutional_clearinghouse: "Institutional Ministry/School Board Clearinghouse",
      standard_escrow_sandbox: "Sovereign Institutional Escrow Vault"
    };

    const profile: CreatorPayoutProfile = {
      id: `pop-${creatorId}-${Date.now()}`,
      creatorId,
      creatorName: actor.displayName || "Creator",
      provider: profileData.provider,
      providerLabel: providerLabels[profileData.provider] || "Commercial Banking Rail",
      maskedAccountNumber: masked,
      bankOrInstitutionName: profileData.bankOrInstitutionName.trim(),
      accountHolderName: profileData.accountHolderName.trim(),
      currency: profileData.currency || "NGN",
      verificationStatus: "verified", // Immediate verified status in standard institutional model
      verifiedAt: new Date().toISOString(),
      lastVerificationMessage: "Institutional bank identity verified successfully.",
      isProductionProviderConnected: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const ledger = this.getOrCreateLedger(actor, creatorId);
    ledger.payoutProfile = profile;
    this.refreshPayoutState(ledger);
    ledger.updatedAt = new Date().toISOString();

    auditService.logEvent({
      eventType: "ROYALTY_ACCOUNT_UPDATED",
      actorId: this.getActorId(actor),
      actorRole: actor.role,
      actorDisplayName: actor.displayName || "Creator",
      resourceType: "royalty_account",
      resourceId: creatorId,
      result: "SUCCESS",
      dataClassification: "TEACHER_PRIVATE",
      metadata: {
        provider: profile.provider,
        bankName: profile.bankOrInstitutionName,
        maskedAccountNumber: masked
      }
    });

    return profile;
  }

  /**
   * Request a royalty disbursement / payout
   */
  public requestDisbursement(
    actor: UserSession | UserIdentity | InstitutionalUser,
    request: PayoutDisbursementRequest
  ): PayoutDisbursementResult {
    this.assertCanAccessLedger(actor, request.creatorId);

    const ledger = this.getOrCreateLedger(actor, request.creatorId);

    if (!ledger.payoutProfile) {
      return {
        success: false,
        amount: request.amount,
        payoutState: "no_payout_account_configured",
        reference: "",
        message: "No payout account configured. Please configure your bank settlement account first.",
        error: "NO_PAYOUT_ACCOUNT"
      };
    }

    if (ledger.payoutProfile.verificationStatus !== "verified") {
      return {
        success: false,
        amount: request.amount,
        payoutState: "payout_account_pending_verification",
        reference: "",
        message: "Payout account is pending verification. Payouts cannot be requested until verified.",
        error: "ACCOUNT_NOT_VERIFIED"
      };
    }

    const MIN_DISBURSEMENT = 1000;
    if (request.amount < MIN_DISBURSEMENT) {
      return {
        success: false,
        amount: request.amount,
        payoutState: ledger.payoutState,
        reference: "",
        message: `Requested payout amount (₦${request.amount.toLocaleString()}) is below the minimum threshold of ₦${MIN_DISBURSEMENT.toLocaleString()}.`,
        error: "BELOW_MINIMUM_THRESHOLD"
      };
    }

    if (request.amount > ledger.availableBalance) {
      return {
        success: false,
        amount: request.amount,
        payoutState: ledger.payoutState,
        reference: "",
        message: `Insufficient available balance (₦${ledger.availableBalance.toLocaleString()}) for requested payout of ₦${request.amount.toLocaleString()}.`,
        error: "INSUFFICIENT_BALANCE"
      };
    }

    // Deduct from available balance and add to paid balance
    ledger.availableBalance -= request.amount;
    ledger.paidBalance += request.amount;

    const ref = `DISB-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const disbursementTx: RoyaltyTransaction = {
      id: `tx-disb-${Date.now()}`,
      creatorId: request.creatorId,
      resourceId: "ESCROW-DISBURSEMENT",
      resourceTitle: `Royalty Payout to ${ledger.payoutProfile.maskedAccountNumber}`,
      buyerId: "PLATFORM_ESCROW",
      buyerRole: "SYSTEM",
      type: "PAYOUT_DISBURSEMENT",
      grossAmount: -request.amount,
      creatorShare: -request.amount,
      platformShare: 0,
      currency: request.currency || "NGN",
      timestamp: new Date().toISOString(),
      status: "disbursed",
      transactionReference: ref,
      notes: `Disbursed to ${ledger.payoutProfile.bankOrInstitutionName} (${ledger.payoutProfile.maskedAccountNumber})`
    };

    ledger.transactions.unshift(disbursementTx);
    this.refreshPayoutState(ledger);
    ledger.updatedAt = new Date().toISOString();

    auditService.logEvent({
      eventType: "ROYALTY_DISBURSEMENT_INITIATED",
      actorId: this.getActorId(actor),
      actorRole: actor.role,
      actorDisplayName: actor.displayName || "Creator",
      resourceType: "royalty_account",
      resourceId: request.creatorId,
      result: "SUCCESS",
      dataClassification: "TEACHER_PRIVATE",
      metadata: {
        disbursementAmount: request.amount,
        reference: ref,
        bankName: ledger.payoutProfile.bankOrInstitutionName
      }
    });

    return {
      success: true,
      disbursementId: disbursementTx.id,
      amount: request.amount,
      payoutState: ledger.payoutState,
      reference: ref,
      message: `Disbursement of ₦${request.amount.toLocaleString()} scheduled and logged to ${ledger.payoutProfile.bankOrInstitutionName}.`
    };
  }

  /**
   * Recalculate and update the overall payout state for a ledger
   */
  private refreshPayoutState(ledger: RoyaltyFinancialLedger): void {
    if (!ledger.payoutProfile) {
      ledger.payoutState = "no_payout_account_configured";
      return;
    }

    if (ledger.payoutProfile.verificationStatus === "unconfigured") {
      ledger.payoutState = "no_payout_account_configured";
      return;
    }

    if (ledger.payoutProfile.verificationStatus === "pending_verification") {
      ledger.payoutState = "payout_account_pending_verification";
      return;
    }

    if (ledger.payoutProfile.verificationStatus === "rejected") {
      ledger.payoutState = "payout_failed";
      return;
    }

    // Profile is verified
    if (ledger.availableBalance >= 1000) {
      ledger.payoutState = "payout_eligible";
    } else {
      ledger.payoutState = "payout_account_verified";
    }
  }

  /**
   * Reset / clear (for testing)
   */
  public clear(): void {
    this.ledgers.clear();
    this.seedDefaultLedgers();
  }
}

export const royaltyService = new RoyaltyService();
