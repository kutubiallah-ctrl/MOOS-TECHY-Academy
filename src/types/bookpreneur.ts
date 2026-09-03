/**
 * MOOS TECHY BOOKPRENEUR STUDIO — NONFICTION AUTHORING & PUBLISHING ARCHITECTURE
 * 
 * Formal data models for serious nonfiction authoring, market positioning,
 * reader promise formulation, research planning, claim-evidence tagging,
 * and editorial quality review.
 */

import { ContentLifecycleStatus, ClaimClassification, SourceVerificationStatus } from "./agentOrchestrator";

export type BookpreneurCategory =
  | "education_pedagogy"
  | "business_entrepreneurship"
  | "personal_development"
  | "psychology_cognition"
  | "health_education"
  | "technology_ai"
  | "leadership_management"
  | "finance_wealth"
  | "history_civilization"
  | "biography_memoir"
  | "research_nonfiction"
  | "professional_development";

export interface ReaderPromise {
  primaryTransformation: string; // "What change will occur in the reader's understanding or capability?"
  targetOutcomes: string[];
  audienceArchetype: string;
  readerPainPoints: string[];
  readerFalseBeliefsToDispel: string[];
}

export interface MarketPositioning {
  coreThesis: string;
  uniqueAngle: string;
  categoryName: BookpreneurCategory;
  comparableBooks: Array<{
    title: string;
    author: string;
    gapAddressedByThisBook: string;
  }>;
  targetDemographic: string;
  estimatedWordCount: number;
}

export interface ResearchSourceItem {
  id: string;
  citationTitle: string;
  sourceType: "peer_reviewed_paper" | "academic_book" | "industry_report" | "primary_archive" | "author_interview" | "case_study";
  doiOrUrl?: string;
  keyFindingsExtracted: string;
  verificationStatus: SourceVerificationStatus;
  notes: string;
}

export interface ClaimEvidenceItem {
  id: string;
  statement: string;
  classification: ClaimClassification;
  sourceCitationId?: string;
  sourceTextExcerpt?: string;
  authorReasoning?: string;
  verificationStatus: SourceVerificationStatus;
  editorialReviewNote?: string;
}

export interface ManuscriptSection {
  id: string;
  sectionNumber: string;
  title: string;
  subheading?: string;
  coreArgument: string;
  contentMarkdown: string;
  claims: ClaimEvidenceItem[];
  caseStudies: Array<{
    title: string;
    organizationOrSubject: string;
    keyTakeaway: string;
  }>;
  wordCount: number;
  lifecycleStatus: ContentLifecycleStatus;
}

export interface ManuscriptChapter {
  id: string;
  chapterNumber: number;
  title: string;
  chapterHook: string;
  readerTakeaway: string;
  sections: ManuscriptSection[];
  chapterSummary: string;
  totalWordCount: number;
  lifecycleStatus: ContentLifecycleStatus;
}

export interface EditorialReviewItem {
  id: string;
  chapterId: string;
  sectionId?: string;
  reviewerType: "ai_quality_agent" | "human_editor" | "peer_reviewer" | "subject_expert";
  reviewerName: string;
  reviewDate: string;
  category: "structure" | "clarity" | "evidence_rigor" | "tone_voice" | "reader_engagement";
  feedbackNote: string;
  status: "open" | "addressed" | "dismissed";
}

export interface BookpreneurProject {
  id: string;
  title: string;
  subtitle: string;
  workingSubtitle: string;
  authorName: string;
  authorAffiliation?: string;
  category: BookpreneurCategory;
  positioning: MarketPositioning;
  readerPromise: ReaderPromise;
  researchBibliography: ResearchSourceItem[];
  chapters: ManuscriptChapter[];
  editorialReviews: EditorialReviewItem[];
  publishingPrep: {
    frontMatterReady: boolean;
    tableOfContentsFinalized: boolean;
    bibliographyCompiled: boolean;
    indexTermsGenerated: boolean;
    backCoverCopy: string;
    authorBioSummary: string;
    isbnAssigned?: string;
  };
  lifecycleStatus: ContentLifecycleStatus;
  createdAt: string;
  updatedAt: string;
}

// =========================================================================
// BOOKPRENEUR MARKETPLACE DOMAIN MODELS
// =========================================================================

export type MarketplacePublicationStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "PUBLISHED"
  | "SUSPENDED"
  | "ARCHIVED";

export type MarketplaceFormat =
  | "digital_textbook"
  | "workbook"
  | "exam_prep_guide"
  | "stem_codex"
  | "teacher_resource"
  | "print_companion"
  | "revision_manual";

export type MarketplaceEducationLevel =
  | "PRIMARY"
  | "JSS_1_3"
  | "SSS_1_3"
  | "WAEC_WASSCE"
  | "JAMB_UTME"
  | "TERTIARY"
  | "TEACHER_CPD"
  | "GENERAL_PUBLIC";

export interface MarketplaceReview {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerRole: "EDUCATOR" | "LEARNER" | "ADMIN" | "BUYER";
  rating: number; // 1-5
  reviewTitle: string;
  reviewComment: string;
  createdAt: string;
  verifiedPurchase: boolean;
}

export interface MarketplaceResource {
  id: string;
  bookProjectId?: string;
  title: string;
  subtitle?: string;
  description: string;
  creatorId: string;
  creatorName: string;
  creatorAffiliation?: string;
  creatorRole: "TEACHER" | "ADMIN" | "CREATOR";
  category: BookpreneurCategory;
  subject: string;
  educationLevel: MarketplaceEducationLevel;
  curriculumAlignment: string[]; // Mapped skill IDs or unit IDs
  targetAgeRange?: string;
  format: MarketplaceFormat;
  price: number; // 0 for free open educational resource
  currency: "NGN" | "USD";
  publicationStatus: MarketplacePublicationStatus;
  provenance: "OFFICIAL_SYLLABUS" | "TEACHER_AUTHORED" | "CREATOR_AUTHORED" | "PUBLISHED_RESOURCE" | "AI_GENERATED_DRAFT";
  version: string;
  averageRating: number;
  totalRatingsCount: number;
  reviews: MarketplaceReview[];
  previewSections?: Array<{
    title: string;
    contentExcerpt: string;
    pageNumber?: number;
  }>;
  learningSupplyIntegration?: {
    linkedSkillIds: string[];
    linkedUnitIds: string[];
    qrResourceCode?: string;
    practiceArenaDirectSkillId?: string;
  };
  commercialModel?: {
    creatorRoyaltyPercentage: number; // e.g. 70
    platformCommissionPercentage: number; // e.g. 30
    institutionalLicenseAvailable: boolean;
    institutionalLicensePrice?: number;
    printCompanionAvailable: boolean;
    printCompanionPrice?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MarketplaceFilterOptions {
  searchQuery?: string;
  category?: BookpreneurCategory | "all";
  subject?: string;
  educationLevel?: MarketplaceEducationLevel | "all";
  format?: MarketplaceFormat | "all";
  priceFilter?: "all" | "free" | "paid";
  minRating?: number;
  curriculumSkillId?: string;
  publicationStatus?: MarketplacePublicationStatus;
}
