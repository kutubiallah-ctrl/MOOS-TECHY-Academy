/**
 * MOOS TECHY BOOKPRENEUR — ROYALTY & PROVIDER-NEUTRAL PAYOUT ARCHITECTURE
 * 
 * Formal data models for creator revenue reconciliation, 70/30 immutable splits,
 * provider-neutral payout abstraction, transaction history, and settlement states.
 */

export type PayoutProviderType =
  | "direct_bank_settlement"
  | "interswitch_rail"
  | "paystack_settlement"
  | "institutional_clearinghouse"
  | "standard_escrow_sandbox";

export type PayoutAccountVerificationStatus =
  | "unconfigured"
  | "pending_verification"
  | "verified"
  | "rejected";

export type PayoutState =
  | "no_payout_account_configured"
  | "payout_account_pending_verification"
  | "payout_account_verified"
  | "payout_eligible"
  | "payout_processing"
  | "payout_completed"
  | "payout_failed";

export type RoyaltyTransactionType =
  | "SALE"
  | "REFUND"
  | "PAYOUT_DISBURSEMENT"
  | "PLATFORM_FEE_ADJUSTMENT";

export type RoyaltyTransactionStatus =
  | "cleared"
  | "pending_settlement"
  | "refunded"
  | "disbursed"
  | "failed";

export interface CreatorPayoutProfile {
  id: string;
  creatorId: string;
  creatorName: string;
  provider: PayoutProviderType;
  providerLabel: string;
  
  // Sensitive identifiers are masked (e.g. "0123****89")
  maskedAccountNumber: string;
  bankOrInstitutionName: string;
  bankCode?: string;
  accountHolderName: string;
  routingOrSortCode?: string;
  currency: "NGN" | "USD";
  
  verificationStatus: PayoutAccountVerificationStatus;
  verifiedAt?: string;
  lastVerificationMessage?: string;
  isProductionProviderConnected: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RoyaltyTransaction {
  id: string;
  creatorId: string;
  resourceId: string;
  resourceTitle: string;
  buyerId: string;
  buyerRole: string;
  type: RoyaltyTransactionType;
  grossAmount: number;
  creatorShare: number;      // Exactly 70% of gross
  platformShare: number;     // Exactly 30% of gross
  currency: "NGN" | "USD";
  timestamp: string;
  status: RoyaltyTransactionStatus;
  transactionReference: string;
  payoutBatchId?: string;
  notes?: string;
}

export interface BankPayoutDetails {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  routingOrSortCode?: string;
  countryCode?: string;
  nubanVerified?: boolean;
}

export interface MobileMoneyPayoutDetails {
  provider: string;
  phoneNumber: string;
  accountHolderName: string;
  countryCode?: string;
}

export interface ConnectedPayoutAccount {
  id: string;
  accountType: "bank_account" | "mobile_money";
  accountNickname: string;
  bankDetails?: BankPayoutDetails;
  mobileMoneyDetails?: MobileMoneyPayoutDetails;
  isPrimary: boolean;
  status: "active" | "pending_verification" | "suspended";
  addedAt: string;
}

export interface PayoutDisbursement {
  id: string;
  creatorId: string;
  destinationAccountId: string;
  destinationAccountSummary: string;
  amount: number;
  currency: "NGN" | "USD";
  requestedAt: string;
  processedAt?: string;
  status: "pending" | "processing" | "disbursed" | "failed";
  referenceCode: string;
  requestNote?: string;
}

export interface RoyaltyFinancialLedger {
  creatorId: string;
  creatorName: string;
  
  // High-level Metrics
  totalSalesCount: number;
  totalRefundCount: number;
  grossRevenue: number;
  creatorEarnings: number;       // Gross * 70%
  platformCommission: number;    // Gross * 30%
  
  // Aliases for historical compatibility
  pendingEscrowBalance: number;
  lifetimeCreatorShare: number;
  lifetimeGrossSales: number;
  totalDisbursed: number;
  lifetimePlatformCommission: number;
  
  // Balances
  availableBalance: number;      // Cleared earnings ready for payout
  pendingBalance: number;        // Sales in escrow settlement window (e.g. 7-day refund hold)
  paidBalance: number;           // Verified disbursed payouts
  
  // Payout Account State
  payoutProfile: CreatorPayoutProfile | null;
  connectedPayoutAccounts: ConnectedPayoutAccount[];
  payoutState: PayoutState;
  
  // Transaction History
  transactions: RoyaltyTransaction[];
  transactionHistory: RoyaltyTransaction[];
  payoutHistory: PayoutDisbursement[];
  
  // Environment Connectivity
  providerIntegrationStatus: {
    isConnected: boolean;
    providerName: string;
    environmentMode: "sandbox_escrow" | "live_production";
    statusNotice: string;
  };
  
  updatedAt: string;
}

export interface PayoutDisbursementRequest {
  creatorId: string;
  amount: number;
  currency: "NGN" | "USD";
  requestedAt: string;
  actorId: string;
}

export interface PayoutDisbursementResult {
  success: boolean;
  disbursementId?: string;
  amount: number;
  payoutState: PayoutState;
  reference: string;
  message: string;
  error?: string;
}
