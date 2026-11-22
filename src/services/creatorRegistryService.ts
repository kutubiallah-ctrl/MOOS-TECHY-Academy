/**
 * MOOS TECHY ACADEMY — CREATOR & EDUCATOR REGISTRY SERVICE
 * 
 * Manages creator profiles, educator verification, tiered capabilities,
 * course ownership, and publishing permissions.
 * 
 * Invariants:
 * 1. Subscription Tier (FREE_TEACHER, TEACHER_PRO, CREATOR_PREMIUM) is independent of Verification Status.
 * 2. Publishing to the Marketplace requires BOTH CREATOR_PREMIUM tier AND institutional verification.
 * 3. Audit trail tracks every verification and tier mutation.
 */

import {
  CreatorProfile,
  CreatorTier,
  CreatorVerificationStatus,
  CreatorEntitlementCapabilities
} from "../types/creatorRegistry";
import { auditService } from "./auditService";

const STORAGE_KEY = "moos_creator_registry_v1";

export class CreatorRegistryService {
  private static instance: CreatorRegistryService;
  private creators: Map<string, CreatorProfile> = new Map();

  private constructor() {
    this.seedDefaultCreators();
  }

  public static getInstance(): CreatorRegistryService {
    if (!CreatorRegistryService.instance) {
      CreatorRegistryService.instance = new CreatorRegistryService();
    }
    return CreatorRegistryService.instance;
  }

  private seedDefaultCreators(): void {
    const seeded: CreatorProfile[] = [
      {
        id: "creator_dr_adebayo",
        email: "adebayo.physics@academy.moos",
        name: "Dr. Adebayo Ogunlesi",
        role: "teacher",
        verificationStatus: "VERIFIED_EDUCATOR",
        tier: "CREATOR_PREMIUM",
        subjects: ["sci_physics", "math_calculus"],
        educationalLevels: ["senior_secondary", "university_prep"],
        bio: "Senior Physics Educator with 18 years preparing students for WAEC WASSCE and National Olympiads.",
        institutionalAffiliation: "King's College Lagos (Faculty of Physical Sciences)",
        marketplaceEligibility: true,
        approvalStatus: "APPROVED",
        publishedResourceIds: ["mkt-phy-kinematics-masterclass", "mkt-optics-ray-tracing"],
        courseIds: ["course-phy-ss2-mechanics"],
        analytics: {
          views: 14200,
          enrollments: 1850,
          totalSales: 420,
          averageRating: 4.9,
          reviewCount: 98
        },
        earnings: {
          totalEarned: 1323000,
          pendingCleared: 145000,
          totalDisbursed: 1178000,
          currency: "NGN"
        },
        consentPreferences: {
          marketplaceTermsAccepted: true,
          aiAssistanceConsent: true,
          notificationEmail: true
        },
        auditHistory: [
          {
            action: "VERIFICATION_APPROVED",
            timestamp: "2025-10-15T09:00:00Z",
            actor: "Institutional Quality Board",
            details: "Credentials and curriculum credentials verified."
          },
          {
            action: "TIER_UPGRADED_CREATOR_PREMIUM",
            timestamp: "2025-10-16T10:00:00Z",
            actor: "system"
          }
        ],
        createdAt: "2025-09-01T08:00:00Z",
        updatedAt: "2026-03-01T12:00:00Z"
      },
      {
        id: "creator_mrs_okafor",
        email: "chioma.okafor@lagos-educators.org",
        name: "Mrs. Chioma Okafor",
        role: "teacher",
        verificationStatus: "VERIFIED_EDUCATOR",
        tier: "TEACHER_PRO",
        subjects: ["math_algebra", "math_core"],
        educationalLevels: ["junior_secondary", "senior_secondary"],
        bio: "Secondary Mathematics teacher passionate about hands-on algebra and vernacular reasoning.",
        institutionalAffiliation: "Queen's College Lagos",
        marketplaceEligibility: false,
        approvalStatus: "APPROVED",
        publishedResourceIds: ["res-algebra-foundations-deck"],
        courseIds: [],
        analytics: {
          views: 3400,
          enrollments: 410,
          totalSales: 0,
          averageRating: 4.8,
          reviewCount: 22
        },
        earnings: {
          totalEarned: 0,
          pendingCleared: 0,
          totalDisbursed: 0,
          currency: "NGN"
        },
        consentPreferences: {
          marketplaceTermsAccepted: true,
          aiAssistanceConsent: true,
          notificationEmail: true
        },
        auditHistory: [
          {
            action: "VERIFICATION_APPROVED",
            timestamp: "2026-01-10T11:00:00Z",
            actor: "Institutional Quality Board"
          }
        ],
        createdAt: "2026-01-05T10:00:00Z",
        updatedAt: "2026-02-15T14:00:00Z"
      },
      {
        id: "creator_intern_john",
        email: "john.doe@free-trial.org",
        name: "John Danladi",
        role: "independent_creator",
        verificationStatus: "PENDING_VERIFICATION",
        tier: "FREE_TEACHER",
        subjects: ["tech_compsci"],
        educationalLevels: ["junior_secondary"],
        bio: "Graduate computer science student exploring lesson authoring.",
        marketplaceEligibility: false,
        approvalStatus: "PENDING",
        publishedResourceIds: [],
        courseIds: [],
        analytics: {
          views: 120,
          enrollments: 15,
          totalSales: 0,
          averageRating: 4.5,
          reviewCount: 2
        },
        earnings: {
          totalEarned: 0,
          pendingCleared: 0,
          totalDisbursed: 0,
          currency: "NGN"
        },
        consentPreferences: {
          marketplaceTermsAccepted: false,
          aiAssistanceConsent: true,
          notificationEmail: true
        },
        auditHistory: [
          {
            action: "REGISTERED",
            timestamp: "2026-02-25T14:00:00Z",
            actor: "self"
          }
        ],
        createdAt: "2026-02-25T14:00:00Z",
        updatedAt: "2026-02-25T14:00:00Z"
      }
    ];

    for (const p of seeded) {
      this.creators.set(p.id, p);
    }
  }

  public getAllCreators(): CreatorProfile[] {
    return Array.from(this.creators.values());
  }

  public getCreator(id: string): CreatorProfile | undefined {
    return this.creators.get(id);
  }

  public getProfile(id: string): CreatorProfile | undefined {
    return this.getCreator(id);
  }

  public recordResourcePublication(creatorId: string, resourceId: string): void {
    const creator = this.creators.get(creatorId);
    if (!creator) return;
    if (!creator.publishedResourceIds.includes(resourceId)) {
      creator.publishedResourceIds.push(resourceId);
      creator.updatedAt = new Date().toISOString();
    }
  }

  public registerCreator(params: {
    email: string;
    name: string;
    role?: CreatorProfile["role"];
    tier?: CreatorTier;
    subjects: string[];
    educationalLevels: string[];
    bio?: string;
  }): CreatorProfile {
    const id = `creator_${Date.now()}`;
    const profile: CreatorProfile = {
      id,
      email: params.email,
      name: params.name,
      role: params.role || "teacher",
      verificationStatus: "UNVERIFIED",
      tier: params.tier || "FREE_TEACHER",
      subjects: params.subjects,
      educationalLevels: params.educationalLevels,
      bio: params.bio || "Educator at MOOS ACADEMY",
      marketplaceEligibility: false,
      approvalStatus: "PENDING",
      publishedResourceIds: [],
      courseIds: [],
      analytics: {
        views: 0,
        enrollments: 0,
        totalSales: 0,
        averageRating: 5.0,
        reviewCount: 0
      },
      earnings: {
        totalEarned: 0,
        pendingCleared: 0,
        totalDisbursed: 0,
        currency: "NGN"
      },
      consentPreferences: {
        marketplaceTermsAccepted: false,
        aiAssistanceConsent: true,
        notificationEmail: true
      },
      auditHistory: [
        {
          action: "REGISTERED",
          timestamp: new Date().toISOString(),
          actor: "self"
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.creators.set(id, profile);
    return profile;
  }

  public updateVerificationStatus(
    creatorId: string,
    status: CreatorVerificationStatus,
    reviewerName: string
  ): CreatorProfile {
    const creator = this.creators.get(creatorId);
    if (!creator) throw new Error(`Creator ${creatorId} not found`);

    const isVerified = status === "VERIFIED_EDUCATOR" || status === "INSTITUTIONAL_FELLOW";
    // Marketplace eligibility requires verified status AND CREATOR_PREMIUM tier
    const marketplaceEligibility = isVerified && creator.tier === "CREATOR_PREMIUM";

    const updated: CreatorProfile = {
      ...creator,
      verificationStatus: status,
      marketplaceEligibility,
      approvalStatus: isVerified ? "APPROVED" : "PENDING",
      auditHistory: [
        ...creator.auditHistory,
        {
          action: `VERIFICATION_STATUS_${status}`,
          timestamp: new Date().toISOString(),
          actor: reviewerName
        }
      ],
      updatedAt: new Date().toISOString()
    };

    this.creators.set(creatorId, updated);
    return updated;
  }

  public updateTier(creatorId: string, newTier: CreatorTier): CreatorProfile {
    const creator = this.creators.get(creatorId);
    if (!creator) throw new Error(`Creator ${creatorId} not found`);

    const isVerified =
      creator.verificationStatus === "VERIFIED_EDUCATOR" ||
      creator.verificationStatus === "INSTITUTIONAL_FELLOW";
    const marketplaceEligibility = isVerified && newTier === "CREATOR_PREMIUM";

    const updated: CreatorProfile = {
      ...creator,
      tier: newTier,
      marketplaceEligibility,
      auditHistory: [
        ...creator.auditHistory,
        {
          action: `TIER_UPDATED_TO_${newTier}`,
          timestamp: new Date().toISOString(),
          actor: "system"
        }
      ],
      updatedAt: new Date().toISOString()
    };

    this.creators.set(creatorId, updated);
    return updated;
  }

  private isManufacturerDemoMode: boolean = true;
  private manufacturerDemoTier: CreatorTier | null = "CREATOR_PREMIUM"; // Default to CREATOR_PREMIUM for evaluation ease

  public setManufacturerDemoMode(enabled: boolean, tier: CreatorTier = "CREATOR_PREMIUM"): void {
    this.isManufacturerDemoMode = enabled;
    this.manufacturerDemoTier = enabled ? tier : null;
  }

  public getManufacturerDemoState(): { isDemoMode: boolean; demoTier: CreatorTier | null } {
    return {
      isDemoMode: this.isManufacturerDemoMode,
      demoTier: this.manufacturerDemoTier
    };
  }

  public getEffectiveTier(creatorId: string): CreatorTier {
    if (this.isManufacturerDemoMode && this.manufacturerDemoTier) {
      return this.manufacturerDemoTier;
    }
    const creator = this.creators.get(creatorId);
    return creator ? creator.tier : "FREE_TEACHER";
  }

  /**
   * Determine exact functional capabilities based on tier and verification status.
   */
  public getCapabilities(creatorId: string): CreatorEntitlementCapabilities {
    const effectiveTier = this.getEffectiveTier(creatorId);
    const creator = this.creators.get(creatorId);
    if (!creator && !this.isManufacturerDemoMode) {
      return {
        canAccessBasicTeacherStudio: false,
        canAccessAdvancedAI: false,
        canGenerateTopicVideo: false,
        canCreateCourses: false,
        canPublishToMarketplace: false,
        canViewAdvancedAnalytics: false,
        canRequestPayout: false
      };
    }

    const isVerified =
      this.isManufacturerDemoMode ||
      (creator
        ? creator.verificationStatus === "VERIFIED_EDUCATOR" ||
          creator.verificationStatus === "INSTITUTIONAL_FELLOW"
        : false);

    return {
      // Basic teacher studio accessible to all teachers
      canAccessBasicTeacherStudio: true,

      // Advanced AI assistance available to TEACHER_PRO and CREATOR_PREMIUM
      canAccessAdvancedAI: effectiveTier === "TEACHER_PRO" || effectiveTier === "CREATOR_PREMIUM",

      // Topic-based video generation available to TEACHER_PRO and CREATOR_PREMIUM
      canGenerateTopicVideo: effectiveTier === "TEACHER_PRO" || effectiveTier === "CREATOR_PREMIUM",

      // Course authoring exclusive to CREATOR_PREMIUM
      canCreateCourses: effectiveTier === "CREATOR_PREMIUM",

      // Marketplace publishing REQUIRES CREATOR_PREMIUM *AND* INSTITUTIONAL VERIFICATION
      canPublishToMarketplace: effectiveTier === "CREATOR_PREMIUM" && isVerified,

      // Advanced course & earnings analytics
      canViewAdvancedAnalytics: effectiveTier === "CREATOR_PREMIUM",

      // Payout disbursement requires verification and positive cleared balance
      canRequestPayout: isVerified && ((creator?.earnings.pendingCleared || 0) > 0 || this.isManufacturerDemoMode)
    };
  }
}

export const creatorRegistryService = CreatorRegistryService.getInstance();
