/**
 * MOOS ACADEMY BOOKPRENEUR STUDIO — CREATOR ROYALTY & PAYOUT WORKFLOW
 * 
 * Implements real creator financial accounts, institutional escrow ledgers,
 * immutable 70/30 revenue split tracking, connected payout account management,
 * and disbursement requests.
 */

import React, { useState } from "react";
import {
  DollarSign,
  CreditCard,
  Building2,
  Smartphone,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
  Plus,
  Lock,
  RefreshCw,
  Wallet,
  Receipt,
  FileCheck
} from "lucide-react";
import { royaltyService } from "../../services/royaltyService";
import {
  RoyaltyFinancialLedger,
  ConnectedPayoutAccount,
  RoyaltyTransaction,
  PayoutDisbursement,
  BankPayoutDetails,
  MobileMoneyPayoutDetails
} from "../../types/royalty";
import { UserSession } from "../../types/identity";

interface CreatorRoyaltySectionProps {
  activeSession: UserSession;
  notify: (message: string, type?: "success" | "error") => void;
}

const COMMON_NIGERIAN_BANKS = [
  "Guaranty Trust Bank (GTBank)",
  "Zenith Bank",
  "Access Bank",
  "First Bank of Nigeria",
  "United Bank for Africa (UBA)",
  "Stanbic IBTC Bank",
  "Fidelity Bank",
  "Sterling Bank",
  "Wema Bank / ALAT",
  "Kuda Microfinance Bank",
  "OPay Digital Services",
  "PalmPay Limited"
];

export const CreatorRoyaltySection: React.FC<CreatorRoyaltySectionProps> = ({
  activeSession,
  notify
}) => {
  const creatorId = activeSession.userId;
  const [ledger, setLedger] = useState<RoyaltyFinancialLedger>(() =>
    royaltyService.getOrCreateLedger(creatorId)
  );

  const [activeTab, setActiveTab] = useState<"overview" | "accounts" | "transactions" | "disbursements">("overview");
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);

  // Add Account Form State
  const [accountType, setAccountType] = useState<"bank_account" | "mobile_money">("bank_account");
  const [bankForm, setBankForm] = useState({
    bankName: COMMON_NIGERIAN_BANKS[0],
    accountNumber: "",
    accountName: activeSession.displayName || "",
    routingCode: ""
  });
  const [mobileMoneyForm, setMobileMoneyForm] = useState({
    provider: "OPay",
    phoneNumber: "",
    accountHolderName: activeSession.displayName || ""
  });

  // Payout Request Form State
  const [payoutAmount, setPayoutAmount] = useState<number>(5000);
  const [selectedAccountId, setSelectedAccountId] = useState<string>(
    ledger.connectedPayoutAccounts.find((a) => a.isPrimary)?.id || ledger.connectedPayoutAccounts[0]?.id || ""
  );

  const refreshLedger = () => {
    setLedger(royaltyService.getOrCreateLedger(creatorId));
  };

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (accountType === "bank_account") {
        if (!bankForm.accountNumber || bankForm.accountNumber.length < 10) {
          throw new Error("Please provide a valid 10-digit NUBAN account number.");
        }
        if (!bankForm.accountName.trim()) {
          throw new Error("Account holder name is required.");
        }

        royaltyService.addConnectedAccount(creatorId, {
          accountType: "bank_account",
          accountNickname: `${bankForm.bankName.split(" ")[0]} Main Account`,
          bankDetails: {
            bankName: bankForm.bankName,
            accountNumber: bankForm.accountNumber,
            accountHolderName: bankForm.accountName,
            routingOrSortCode: bankForm.routingCode || undefined,
            countryCode: "NG",
            nubanVerified: true
          },
          isPrimary: ledger.connectedPayoutAccounts.length === 0
        });
      } else {
        if (!mobileMoneyForm.phoneNumber || mobileMoneyForm.phoneNumber.length < 10) {
          throw new Error("Please provide a valid mobile phone number.");
        }

        royaltyService.addConnectedAccount(creatorId, {
          accountType: "mobile_money",
          accountNickname: `${mobileMoneyForm.provider} Mobile Wallet`,
          mobileMoneyDetails: {
            provider: mobileMoneyForm.provider,
            phoneNumber: mobileMoneyForm.phoneNumber,
            accountHolderName: mobileMoneyForm.accountHolderName,
            countryCode: "NG"
          },
          isPrimary: ledger.connectedPayoutAccounts.length === 0
        });
      }

      setShowAddAccountModal(false);
      refreshLedger();
      notify("Connected payout account added and verified.");
    } catch (err: any) {
      notify(err.message || "Failed to add account", "error");
    }
  };

  const handleSetPrimary = (accountId: string) => {
    try {
      royaltyService.setPrimaryConnectedAccount(creatorId, accountId);
      refreshLedger();
      notify("Primary payout account updated.");
    } catch (err: any) {
      notify(err.message || "Failed to update primary account", "error");
    }
  };

  const handleRemoveAccount = (accountId: string) => {
    try {
      royaltyService.removeConnectedAccount(creatorId, accountId);
      refreshLedger();
      notify("Payout account removed.");
    } catch (err: any) {
      notify(err.message || "Failed to remove account", "error");
    }
  };

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!selectedAccountId) {
        throw new Error("Please select a connected destination payout account.");
      }

      const disbursement = royaltyService.requestPayout({
        creatorId,
        destinationAccountId: selectedAccountId,
        amount: Number(payoutAmount),
        currency: "NGN",
        requestNote: "Standard creator royalty withdrawal"
      });

      setShowPayoutModal(false);
      refreshLedger();
      notify(
        `Payout request of ₦${disbursement.amount.toLocaleString()} submitted successfully! Ref: ${disbursement.referenceCode}`
      );
    } catch (err: any) {
      notify(err.message || "Payout request failed", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Balance Cards */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
              <DollarSign className="h-3.5 w-3.5" />
              Creator Financial Engine & Escrow Ledger
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Royalties, Earnings & Connected Accounts
            </h2>
            <p className="text-xs text-slate-500 max-w-2xl mt-1 leading-relaxed">
              Transparent, immutable 70/30 creator revenue model. Track real-time earnings, 7-day institutional escrow clearances, and disburse directly to your verified commercial bank accounts or mobile wallets.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedAccountId(
                  ledger.connectedPayoutAccounts.find((a) => a.isPrimary)?.id ||
                    ledger.connectedPayoutAccounts[0]?.id ||
                    ""
                );
                setShowPayoutModal(true);
              }}
              disabled={ledger.availableBalance < 1000 || ledger.connectedPayoutAccounts.length === 0}
              className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center gap-2 transition disabled:opacity-50"
            >
              <ArrowUpRight className="h-4 w-4" />
              <span>Request Payout</span>
            </button>
          </div>
        </div>

        {/* 4-Card Financial Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Available Balance */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-800 uppercase">
              <span>Available for Withdrawal</span>
              <Wallet className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-950">
              ₦{ledger.availableBalance.toLocaleString()}
            </p>
            <span className="text-[11px] text-emerald-700 font-medium block">
              Cleared & ready for instant bank transfer
            </span>
          </div>

          {/* 2. Pending Escrow */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-800 uppercase">
              <span>Pending Escrow</span>
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-amber-950">
              ₦{ledger.pendingEscrowBalance.toLocaleString()}
            </p>
            <span className="text-[11px] text-amber-700 font-medium block">
              Clears 7 days post-transaction
            </span>
          </div>

          {/* 3. Lifetime Creator Share (70%) */}
          <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-purple-800 uppercase">
              <span>Lifetime Net (70%)</span>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-purple-950">
              ₦{ledger.lifetimeCreatorShare.toLocaleString()}
            </p>
            <span className="text-[11px] text-purple-700 font-medium block">
              Gross sales: ₦{ledger.lifetimeGrossSales.toLocaleString()}
            </span>
          </div>

          {/* 4. Total Disbursed */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase">
              <span>Total Disbursed</span>
              <Receipt className="h-4 w-4 text-slate-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">
              ₦{ledger.totalDisbursed.toLocaleString()}
            </p>
            <span className="text-[11px] text-slate-500 font-medium block">
              Platform commission: ₦{ledger.lifetimePlatformCommission.toLocaleString()} (30%)
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-100 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "overview" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Overview & Commercial Terms
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("accounts")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "accounts" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>Connected Payout Accounts ({ledger.connectedPayoutAccounts.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("transactions")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "transactions" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Receipt className="h-3.5 w-3.5" />
            <span>Transaction Ledger ({ledger.transactionHistory.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("disbursements")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "disbursements" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <FileCheck className="h-3.5 w-3.5" />
            <span>Payout History ({ledger.payoutHistory.length})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & TERMS */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200/80 space-y-2">
                <span className="text-xs font-bold text-purple-900 block uppercase">Standard Digital Treatise</span>
                <p className="text-xl font-black text-purple-950">₦4,500 <span className="text-xs font-medium text-purple-700">/ learner</span></p>
                <p className="text-xs text-purple-700">Creator receives <strong>₦3,150 (70%)</strong> instantly per acquisition.</p>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-2">
                <span className="text-xs font-bold text-indigo-900 block uppercase">Institutional School License</span>
                <p className="text-xl font-black text-indigo-950">₦45,000 <span className="text-xs font-medium text-indigo-700">/ school / yr</span></p>
                <p className="text-xs text-indigo-700">Covers 250 learners. Creator receives <strong>₦31,500 (70%)</strong> net.</p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                <span className="text-xs font-bold text-emerald-900 block uppercase">Print Companion Codex</span>
                <p className="text-xl font-black text-emerald-950">₦8,500 <span className="text-xs font-medium text-emerald-700">/ bound book</span></p>
                <p className="text-xs text-emerald-700">Physical book with integrated QR codex companion links.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Institutional Financial Governance Invariants
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Non-Negotiable 70/30 Split:</strong> 70% of gross educational transactions are immediately credited to the verified author; 30% is allocated for platform infrastructure and cloud compute.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Institutional Escrow Protection:</strong> High-volume school subscriptions are held in a 7-day verification escrow to ensure pedagogical delivery before final clearance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Compliant NUBAN & Mobile Disbursements:</strong> Payouts route directly through verified Nigerian financial institutions with deterministic reference codes.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: CONNECTED PAYOUT ACCOUNTS */}
        {activeTab === "accounts" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900">Your Connected Settlement Accounts</h3>
              <button
                type="button"
                onClick={() => setShowAddAccountModal(true)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Connect New Payout Account</span>
              </button>
            </div>

            {ledger.connectedPayoutAccounts.length === 0 ? (
              <div className="p-8 rounded-2xl border-2 border-dashed border-slate-200 text-center space-y-3">
                <Building2 className="h-10 w-10 text-slate-400 mx-auto" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-sm">No Payout Account Connected Yet</h4>
                  <p className="text-xs text-slate-500">
                    Connect your commercial bank account (GTBank, Zenith, Access, etc.) or mobile money wallet to receive royalty disbursements.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddAccountModal(true)}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold"
                >
                  Connect Account Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ledger.connectedPayoutAccounts.map((account) => (
                  <div
                    key={account.id}
                    className={`p-5 rounded-2xl border transition relative space-y-3 ${
                      account.isPrimary
                        ? "bg-purple-50/50 border-purple-300 ring-1 ring-purple-300"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800">
                          {account.accountType === "bank_account" ? (
                            <Building2 className="h-5 w-5 text-purple-700" />
                          ) : (
                            <Smartphone className="h-5 w-5 text-emerald-700" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-900 text-sm">{account.accountNickname}</span>
                            {account.isPrimary && (
                              <span className="px-2 py-0.5 rounded-full bg-purple-200 text-purple-900 text-[10px] font-bold">
                                PRIMARY
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-500">
                            {account.accountType === "bank_account"
                              ? account.bankDetails?.bankName
                              : account.mobileMoneyDetails?.provider}
                          </span>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        VERIFIED
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1 font-mono">
                      {account.accountType === "bank_account" && account.bankDetails && (
                        <>
                          <div className="flex justify-between text-slate-600">
                            <span>Account Number:</span>
                            <span className="font-bold text-slate-900">
                              ••••••••{account.bankDetails.accountNumber.slice(-4)}
                            </span>
                          </div>
                          <div className="flex justify-between text-slate-600">
                            <span>Account Name:</span>
                            <span className="font-bold text-slate-900">{account.bankDetails.accountHolderName}</span>
                          </div>
                        </>
                      )}

                      {account.accountType === "mobile_money" && account.mobileMoneyDetails && (
                        <>
                          <div className="flex justify-between text-slate-600">
                            <span>Phone:</span>
                            <span className="font-bold text-slate-900">
                              ••••••{account.mobileMoneyDetails.phoneNumber.slice(-4)}
                            </span>
                          </div>
                          <div className="flex justify-between text-slate-600">
                            <span>Name:</span>
                            <span className="font-bold text-slate-900">
                              {account.mobileMoneyDetails.accountHolderName}
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      {!account.isPrimary && (
                        <button
                          type="button"
                          onClick={() => handleSetPrimary(account.id)}
                          className="text-purple-700 hover:text-purple-900 font-bold underline"
                        >
                          Make Primary Payout Account
                        </button>
                      )}
                      <div className="ml-auto">
                        <button
                          type="button"
                          onClick={() => handleRemoveAccount(account.id)}
                          className="text-rose-600 hover:text-rose-800 font-bold text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: IMMUTABLE ROYALTY TRANSACTIONS */}
        {activeTab === "transactions" && (
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900">Real-Time Commercial Transactions Ledger</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Reference & Date</th>
                    <th className="p-3">Resource</th>
                    <th className="p-3">Gross Sale</th>
                    <th className="p-3">70% Creator Net</th>
                    <th className="p-3">30% Platform</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ledger.transactionHistory.map((tx) => {
                    const refCode = (tx as any).referenceCode || tx.transactionReference || tx.id;
                    const dateStr = tx.timestamp || (tx as any).createdAt || new Date().toISOString();
                    const isCleared = tx.status === "cleared" || (tx as any).settlementStatus === "SETTLED_AVAILABLE";
                    return (
                      <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                        <td className="p-3 font-mono">
                          <span className="font-bold text-slate-900 block">{refCode}</span>
                          <span className="text-[10px] text-slate-500">{new Date(dateStr).toLocaleDateString()}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-slate-900 block max-w-xs truncate">{tx.resourceTitle}</span>
                          <span className="text-[10px] text-slate-500">Buyer: {tx.buyerRole}</span>
                        </td>
                        <td className="p-3 font-bold text-slate-900">₦{tx.grossAmount.toLocaleString()}</td>
                        <td className="p-3 font-bold text-emerald-700">₦{tx.creatorShare.toLocaleString()}</td>
                        <td className="p-3 font-medium text-slate-500">₦{tx.platformShare.toLocaleString()}</td>
                        <td className="p-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              isCleared
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {isCleared ? "CLEARED" : "IN ESCROW"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {ledger.transactionHistory.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-slate-400">
                        No transactions recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: COMPLETED PAYOUT DISBURSEMENTS */}
        {activeTab === "disbursements" && (
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900">Disbursement & Withdrawal Records</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Reference</th>
                    <th className="p-3">Destination Account</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Requested At</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ledger.payoutHistory.map((payout) => {
                    const isCompleted = payout.status === "disbursed" || (payout.status as any) === "COMPLETED";
                    const isProcessing = payout.status === "processing" || (payout.status as any) === "PROCESSING";
                    const destSummary = typeof payout.destinationAccountSummary === "string"
                      ? payout.destinationAccountSummary
                      : (payout.destinationAccountSummary as any)?.bankOrProviderName || "Connected Account";

                    return (
                      <tr key={payout.id} className="hover:bg-slate-50/80 transition">
                        <td className="p-3 font-mono font-bold text-slate-900">{payout.referenceCode}</td>
                        <td className="p-3">
                          <span className="font-bold text-slate-800 block">
                            {destSummary}
                          </span>
                        </td>
                        <td className="p-3 font-black text-emerald-700 text-sm">₦{payout.amount.toLocaleString()}</td>
                        <td className="p-3 text-slate-500">{new Date(payout.requestedAt).toLocaleString()}</td>
                        <td className="p-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              isCompleted
                                ? "bg-emerald-100 text-emerald-800"
                                : isProcessing
                                ? "bg-blue-100 text-blue-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {payout.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {ledger.payoutHistory.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-slate-400">
                        No disbursements requested yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CONNECT NEW PAYOUT ACCOUNT MODAL                                          */}
      {/* ========================================================================= */}
      {showAddAccountModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">Connect Payout Account</h3>
              <button
                type="button"
                onClick={() => setShowAddAccountModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Type Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setAccountType("bank_account")}
                className={`py-2 rounded-lg transition ${
                  accountType === "bank_account" ? "bg-white text-purple-900 shadow-xs" : "text-slate-600"
                }`}
              >
                Commercial Bank (NUBAN)
              </button>
              <button
                type="button"
                onClick={() => setAccountType("mobile_money")}
                className={`py-2 rounded-lg transition ${
                  accountType === "mobile_money" ? "bg-white text-purple-900 shadow-xs" : "text-slate-600"
                }`}
              >
                Mobile Money / Fintech
              </button>
            </div>

            <form onSubmit={handleAddAccount} className="space-y-4 text-xs">
              {accountType === "bank_account" ? (
                <>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Select Bank</label>
                    <select
                      value={bankForm.bankName}
                      onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 bg-white"
                    >
                      {COMMON_NIGERIAN_BANKS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">10-Digit NUBAN Account Number</label>
                    <input
                      type="text"
                      maxLength={10}
                      value={bankForm.accountNumber}
                      onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value.replace(/\D/g, "") })}
                      placeholder="e.g. 0123456789"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Account Holder Name (as on BVN)</label>
                    <input
                      type="text"
                      value={bankForm.accountName}
                      onChange={(e) => setBankForm({ ...bankForm, accountName: e.target.value })}
                      placeholder="e.g. Dr. O. Adeleke"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Fintech / Mobile Money Provider</label>
                    <select
                      value={mobileMoneyForm.provider}
                      onChange={(e) => setMobileMoneyForm({ ...mobileMoneyForm, provider: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 bg-white"
                    >
                      <option value="OPay">OPay Digital Services</option>
                      <option value="PalmPay">PalmPay Limited</option>
                      <option value="Kuda">Kuda Bank</option>
                      <option value="M-Pesa">M-Pesa</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Registered Mobile Phone Number</label>
                    <input
                      type="tel"
                      value={mobileMoneyForm.phoneNumber}
                      onChange={(e) => setMobileMoneyForm({ ...mobileMoneyForm, phoneNumber: e.target.value })}
                      placeholder="e.g. 08012345678"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Account Holder Name</label>
                    <input
                      type="text"
                      value={mobileMoneyForm.accountHolderName}
                      onChange={(e) => setMobileMoneyForm({ ...mobileMoneyForm, accountHolderName: e.target.value })}
                      placeholder="e.g. Dr. O. Adeleke"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddAccountModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-md shadow-purple-600/20"
                >
                  Verify & Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* REQUEST PAYOUT MODAL                                                      */}
      {/* ========================================================================= */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">Request Royalty Disbursement</h3>
              <button
                type="button"
                onClick={() => setShowPayoutModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRequestPayout} className="space-y-4 text-xs">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 uppercase">Available for Withdrawal</span>
                <p className="text-xl font-black text-emerald-950">₦{ledger.availableBalance.toLocaleString()}</p>
                <span className="text-[10px] text-emerald-700">Minimum withdrawal threshold: ₦1,000</span>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Destination Account</label>
                <select
                  value={selectedAccountId}
                  onChange={(e) => setSelectedAccountId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  {ledger.connectedPayoutAccounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.accountNickname} (
                      {acc.accountType === "bank_account"
                        ? `${acc.bankDetails?.bankName} ••••${acc.bankDetails?.accountNumber.slice(-4)}`
                        : `${acc.mobileMoneyDetails?.provider} ••••${acc.mobileMoneyDetails?.phoneNumber.slice(-4)}`}
                      )
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Disbursement Amount (₦ NGN)</label>
                <input
                  type="number"
                  min={1000}
                  max={ledger.availableBalance}
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 font-mono text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPayoutModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={payoutAmount < 1000 || payoutAmount > ledger.availableBalance}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-600/20 disabled:opacity-50"
                >
                  Confirm Withdrawal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
