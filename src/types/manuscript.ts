/**
 * MOOS TECHY BOOKPRENEUR — MANUSCRIPT INGESTION & EXTRACTION DATA MODELS
 * 
 * Supports PDF and DOCX document ingestion, semantic extraction,
 * structure detection (arbitrary chapter counts), original file preservation,
 * and creator preview before editorial drafting.
 */

import { MarketplaceFormat, MarketplaceEducationLevel, BookpreneurCategory } from "./bookpreneur";

export type IngestionFileType = "pdf" | "docx" | "txt" | "unsupported";

export type ExtractionStatus = 
  | "idle" 
  | "validating" 
  | "extracting" 
  | "success" 
  | "partial_with_warnings" 
  | "failed";

export interface ManuscriptSectionExtracted {
  id: string;
  sectionNumber?: string;
  title: string;
  content: string;
  contentMarkdown?: string;
  wordCount: number;
  equations?: string[];
  tables?: Array<{
    headers: string[];
    rows: string[][];
    caption?: string;
  }>;
  lists?: string[][];
  pageReference?: string;
  hasFormulasOrMath?: boolean;
}

export interface ManuscriptChapterExtracted {
  id: string;
  chapterNumber: number;
  title: string;
  overviewSummary?: string;
  sections: ManuscriptSectionExtracted[];
  totalWordCount: number;
  estimatedWordCount?: number;
  rawTextExcerpt: string;
  pageStart?: number;
  pageEnd?: number;
  detectedTablesCount?: number;
  detectedEquationsCount?: number;
}

export interface PreservedOriginalFile {
  fileId?: string;
  fileName: string;
  fileSize: number;
  fileSizeBytes?: number;
  mimeType: string;
  fileExtension: string;
  checksum: string;
  fileHashSha256?: string;
  uploadedAt: string;
  rawFileDataUrl?: string; // Base64 representation preserved in local repository
  storagePath?: string;
}

export interface ExtractedManuscriptMetadata {
  detectedTitle?: string;
  detectedAuthor?: string;
  detectedSubtitle?: string;
  detectedSubject?: string;
  detectedWordCount: number;
  totalEstimatedWords?: number;
  detectedPageCount?: number;
  detectedChapterCount: number;
  totalChaptersCount?: number;
  detectedSectionCount: number;
  hasTables: boolean;
  hasLists: boolean;
  hasImagesOrFigures: boolean;
  figureReferences: string[];
  tableCount: number;
  extractedTablesCount?: number;
  extractedEquationsCount?: number;
  formatDetected: IngestionFileType;
}

export interface IngestedManuscriptPackage {
  id: string;
  packageId?: string;
  creatorId: string;
  creatorName: string;
  originalFile: PreservedOriginalFile;
  extractionStatus: ExtractionStatus;
  extractionWarnings: string[];
  metadata: ExtractedManuscriptMetadata;
  chapters: ManuscriptChapterExtracted[];
  fullTextContent: string;
  rawHtmlOrMarkdown?: string;
  ingestedAt?: string;
  
  // Creator Confirmation & Resource Target
  confirmedResourceMetadata?: {
    title: string;
    subtitle?: string;
    authorName: string;
    category: BookpreneurCategory;
    subject: string;
    educationLevel: MarketplaceEducationLevel;
    format: MarketplaceFormat;
    price: number;
    currency: "NGN" | "USD";
    description: string;
  };
  
  savedResourceId?: string;
  createdAt: string;
  updatedAt: string;
}
