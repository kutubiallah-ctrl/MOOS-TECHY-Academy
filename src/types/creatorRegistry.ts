/**
 * MOOS TECHY ACADEMY — CREATOR & EDUCATOR REGISTRY DATA MODEL
 * 
 * Formal architecture defining educator and creator identities, subscription tiers,
 * institutional verification states, content ownership, and marketplace eligibility.
 * 
 * Strictly separates subscription status from verification status as mandated by institutional governance.
 */

export type CreatorTier = "FREE_TEACHER" | "TEACHER_PRO" | "CREATOR_PREMIUM";

export type CreatorVerificationStatus = 
  | "UNVERIFIED" 
  | "PENDING_VERIFICATION" 
  | "VERIFIED_EDUCATOR" 
  | "INSTITUTIONAL_FELLOW";

export interface CreatorAnalyticsSummary {
  views: number;
  enrollments: number;
  totalSales: number;
  averageRating: number;
  reviewCount: number;
}

export interface CreatorEarningsSummary {
  totalEarned: number;
  pendingCleared: number;
  totalDisbursed: number;
  currency: string;
}

export interface CreatorConsentPreferences {
  marketplaceTermsAccepted: boolean;
  aiAssistanceConsent: boolean;
  notificationEmail: boolean;
}

export interface CreatorAuditEntry {
  action: string;
  timestamp: string;
  actor: string;
  details?: string;
}

export interface CreatorProfile {
  id: string;
  email: string;
  name: string;
  role: "teacher" | "curriculum_lead" | "independent_creator" | "institutional_author";
  verificationStatus: CreatorVerificationStatus;
  tier: CreatorTier;
  subjects: string[];
  educationalLevels: string[];
  bio: string;
  institutionalAffiliation?: string;
  marketplaceEligibility: boolean;
  approvalStatus: "APPROVED" | "PENDING" | "RESTRICTED";
  publishedResourceIds: string[];
  courseIds: string[];
  analytics: CreatorAnalyticsSummary;
  earnings: CreatorEarningsSummary;
  consentPreferences: CreatorConsentPreferences;
  auditHistory: CreatorAuditEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatorEntitlementCapabilities {
  canAccessBasicTeacherStudio: boolean;
  canAccessAdvancedAI: boolean;
  canGenerateTopicVideo: boolean;
  canCreateCourses: boolean;
  canPublishToMarketplace: boolean;
  canViewAdvancedAnalytics: boolean;
  canRequestPayout: boolean;
}
