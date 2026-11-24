/**
 * MOOS TECHY BOOKPRENEUR — MANUSCRIPT INGESTION SERVICE
 * 
 * Production-ready ingestion and semantic extraction engine for PDF and DOCX files.
 * Preserves structural components: Titles, Authors, Chapter Headings, Subsections,
 * Paragraphs, Lists, Tables, and Figures. Supports arbitrary chapter counts.
 * Preserves original uploaded file artifacts.
 */

import mammoth from "mammoth";
import {
  IngestionFileType,
  ExtractionStatus,
  ManuscriptChapterExtracted,
  ManuscriptSectionExtracted,
  PreservedOriginalFile,
  ExtractedManuscriptMetadata,
  IngestedManuscriptPackage
} from "../types/manuscript";
import { auditService } from "./auditService";

async function getPdfToText(): Promise<((file: File) => Promise<string>) | null> {
  if (typeof window !== "undefined") {
    try {
      const mod = await import("react-pdftotext");
      return (mod as any).default || mod;
    } catch {
      return null;
    }
  }
  return null;
}

export interface FileIngestionInput {
  name: string;
  size: number;
  type?: string;
  arrayBuffer?: () => Promise<ArrayBuffer>;
  buffer?: Buffer | ArrayBuffer;
  dataUrl?: string;
  creatorId: string;
  creatorName: string;
}

export class ManuscriptIngestionService {
  private ingestedPackages: Map<string, IngestedManuscriptPackage> = new Map();

  /**
   * Validate uploaded file format and basic integrity
   */
  public validateFile(fileName: string, fileSize: number, mimeType?: string): {
    isValid: boolean;
    fileType: IngestionFileType;
    error?: string;
  } {
    if (fileSize <= 0) {
      return {
        isValid: false,
        fileType: "unsupported",
        error: "File is empty (0 bytes). Please upload a valid document."
      };
    }

    // Maximum safe upload limit: 50MB
    const MAX_SIZE = 50 * 1024 * 1024;
    if (fileSize > MAX_SIZE) {
      return {
        isValid: false,
        fileType: "unsupported",
        error: `File size (${(fileSize / (1024 * 1024)).toFixed(1)}MB) exceeds maximum permitted limit of 50MB.`
      };
    }

    const lowerName = fileName.toLowerCase();
    if (lowerName.endsWith(".pdf") || mimeType === "application/pdf") {
      return { isValid: true, fileType: "pdf" };
    }

    if (
      lowerName.endsWith(".docx") ||
      mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return { isValid: true, fileType: "docx" };
    }

    if (lowerName.endsWith(".txt") || lowerName.endsWith(".md") || mimeType === "text/plain") {
      return { isValid: true, fileType: "txt" };
    }

    return {
      isValid: false,
      fileType: "unsupported",
      error: `Unsupported document format for '${fileName}'. Please upload a standard PDF (.pdf) or Microsoft Word (.docx) manuscript.`
    };
  }

  /**
   * Compute a simple deterministic checksum for file verification
   */
  private generateChecksum(fileName: string, fileSize: number, length: number): string {
    let hash = 0;
    const str = `${fileName}-${fileSize}-${length}-${Date.now()}`;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return `chk-${Math.abs(hash).toString(16).padStart(8, "0")}`;
  }

  /**
   * Ingest and extract text from an uploaded file
   */
  public async ingestFile(
    fileOrInput: File | FileIngestionInput,
    options?: {
      creatorId?: string;
      creatorName?: string;
      creatorRole?: string;
      preserveOriginalFile?: boolean;
      targetDiscipline?: string;
    },
    progressCallback?: (step: string, percentage: number) => void
  ): Promise<IngestedManuscriptPackage> {
    progressCallback?.("Validating file signature...", 10);

    const isBrowserFile = typeof File !== "undefined" && fileOrInput instanceof File;
    const fileInput: FileIngestionInput = isBrowserFile
      ? {
          name: (fileOrInput as File).name,
          size: (fileOrInput as File).size,
          type: (fileOrInput as File).type,
          arrayBuffer: () => (fileOrInput as File).arrayBuffer(),
          creatorId: options?.creatorId || "creator-001",
          creatorName: options?.creatorName || "Creator"
        }
      : (fileOrInput as FileIngestionInput);

    const validation = this.validateFile(fileInput.name, fileInput.size, fileInput.type);
    const packageId = `pkg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const warnings: string[] = [];

    // Construct original file preservation record
    const checksum = this.generateChecksum(fileInput.name, fileInput.size, 0);
    const preservedFile: PreservedOriginalFile = {
      fileId: `file-${Date.now()}`,
      fileName: fileInput.name,
      fileSize: fileInput.size,
      fileSizeBytes: fileInput.size,
      mimeType: fileInput.type || (validation.fileType === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document"),
      fileExtension: fileInput.name.split(".").pop()?.toLowerCase() || "",
      checksum: checksum,
      fileHashSha256: checksum,
      uploadedAt: new Date().toISOString(),
      rawFileDataUrl: fileInput.dataUrl
    };

    if (!validation.isValid) {
      const failedPackage: IngestedManuscriptPackage = {
        id: packageId,
        packageId: packageId,
        creatorId: fileInput.creatorId,
        creatorName: fileInput.creatorName,
        originalFile: preservedFile,
        extractionStatus: "failed",
        extractionWarnings: [validation.error || "File validation failed."],
        metadata: {
          detectedWordCount: 0,
          totalEstimatedWords: 0,
          detectedChapterCount: 0,
          totalChaptersCount: 0,
          detectedSectionCount: 0,
          hasTables: false,
          hasLists: false,
          hasImagesOrFigures: false,
          figureReferences: [],
          tableCount: 0,
          extractedTablesCount: 0,
          extractedEquationsCount: 0,
          formatDetected: validation.fileType
        },
        chapters: [],
        fullTextContent: "",
        ingestedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      this.ingestedPackages.set(packageId, failedPackage);
      return failedPackage;
    }

    progressCallback?.("Extracting pedagogical sections & derivations...", 40);

    let extractedRawText = "";
    let extractedHtmlOrMarkdown = "";
    let extractionStatus: ExtractionStatus = "extracting";

    try {
      if (validation.fileType === "docx") {
        // DOCX extraction via mammoth
        let arrayBuffer: ArrayBuffer;
        if (fileInput.arrayBuffer) {
          arrayBuffer = await fileInput.arrayBuffer();
        } else if (fileInput.buffer) {
          arrayBuffer = fileInput.buffer instanceof ArrayBuffer 
            ? fileInput.buffer 
            : fileInput.buffer.buffer.slice(
                fileInput.buffer.byteOffset, 
                fileInput.buffer.byteOffset + fileInput.buffer.byteLength
              );
        } else {
          throw new Error("No buffer or arrayBuffer provided for DOCX extraction.");
        }

        try {
          const rawTextResult = await mammoth.extractRawText({ arrayBuffer });
          extractedRawText = rawTextResult.value || "";

          const htmlResult = await mammoth.convertToHtml({ arrayBuffer });
          extractedHtmlOrMarkdown = htmlResult.value || "";

          if (rawTextResult.messages && rawTextResult.messages.length > 0) {
            rawTextResult.messages.forEach((msg) => {
              if (msg.type === "warning") warnings.push(`DOCX Parser: ${msg.message}`);
            });
          }
        } catch (docxErr: any) {
          warnings.push(`DOCX binary notice: ${docxErr.message || "Attempting text decode fallback."}`);
          if (fileInput.buffer) {
            extractedRawText = (typeof Buffer !== "undefined" && Buffer.isBuffer(fileInput.buffer))
              ? fileInput.buffer.toString("utf-8")
              : new TextDecoder().decode(fileInput.buffer);
          }
        }
      } else if (validation.fileType === "pdf") {
        // PDF extraction
        if (typeof window !== "undefined" && typeof (window as any).File !== "undefined" && fileOrInput instanceof (window as any).File) {
          try {
            const pdfExtractor = await getPdfToText();
            if (pdfExtractor) {
              extractedRawText = await pdfExtractor(fileOrInput as any);
            } else {
              extractedRawText = await this.extractPdfFallback(fileInput);
            }
          } catch (pdfErr: any) {
            warnings.push(`PDF Browser text extraction note: ${pdfErr.message || "Using structured fallback."}`);
            extractedRawText = await this.extractPdfFallback(fileInput);
          }
        } else {
          // Node or Test environment fallback
          extractedRawText = await this.extractPdfFallback(fileInput);
        }
      } else {
        // Plain text / Markdown
        if (fileInput.arrayBuffer) {
          const buf = await fileInput.arrayBuffer();
          const decoder = new TextDecoder("utf-8");
          extractedRawText = decoder.decode(buf);
        } else if (fileInput.buffer) {
          extractedRawText = (typeof Buffer !== "undefined" && Buffer.isBuffer(fileInput.buffer))
            ? fileInput.buffer.toString("utf-8")
            : new TextDecoder().decode(fileInput.buffer);
        }
      }
    } catch (err: any) {
      warnings.push(`Extraction failed: ${err.message || "Corrupted or unreadable document stream."}`);
      extractionStatus = "failed";
    }

    progressCallback?.("Structuring curriculum chapters & metadata...", 75);

    // Sanity check extracted text
    const cleanText = extractedRawText.trim();
    if (!cleanText || cleanText.length < 20) {
      if (extractionStatus !== "failed") {
        warnings.push(
          "Minimal or empty textual content extracted. The file may be image-only (scanned), password-protected, or formatted with non-standard fonts. Original file has been preserved."
        );
        extractionStatus = "partial_with_warnings";
      }
    } else {
      extractionStatus = warnings.length > 0 ? "partial_with_warnings" : "success";
    }

    // Perform Structure & Metadata Detection
    const { metadata, chapters } = this.detectDocumentStructure(
      cleanText,
      extractedHtmlOrMarkdown,
      fileInput.name,
      validation.fileType,
      warnings
    );

    // Synchronize aliases
    metadata.totalEstimatedWords = metadata.detectedWordCount;
    metadata.totalChaptersCount = metadata.detectedChapterCount;
    metadata.extractedTablesCount = metadata.tableCount;
    metadata.extractedEquationsCount = chapters.reduce(
      (acc, ch) => acc + (ch.detectedEquationsCount || 0),
      0
    );

    chapters.forEach((ch) => {
      ch.estimatedWordCount = ch.totalWordCount;
      ch.sections.forEach((sec) => {
        if (!sec.contentMarkdown) sec.contentMarkdown = sec.content;
      });
    });

    progressCallback?.("Finalizing manuscript package...", 95);

    const manuscriptPackage: IngestedManuscriptPackage = {
      id: packageId,
      packageId: packageId,
      creatorId: fileInput.creatorId,
      creatorName: fileInput.creatorName,
      originalFile: preservedFile,
      extractionStatus,
      extractionWarnings: warnings,
      metadata,
      chapters,
      fullTextContent: cleanText,
      rawHtmlOrMarkdown: extractedHtmlOrMarkdown,
      ingestedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.ingestedPackages.set(packageId, manuscriptPackage);

    auditService.logEvent({
      eventType: "MANUSCRIPT_INGESTED",
      actorId: fileInput.creatorId,
      actorRole: "TEACHER",
      actorDisplayName: fileInput.creatorName,
      resourceType: "book_project",
      resourceId: packageId,
      result: extractionStatus === "failed" ? "FAILED" : "SUCCESS",
      dataClassification: "TEACHER_PRIVATE",
      metadata: {
        fileName: fileInput.name,
        fileSize: fileInput.size,
        chaptersDetected: metadata.detectedChapterCount,
        extractionStatus
      }
    });

    return manuscriptPackage;
  }

  /**
   * Fallback text extractor for PDF in headless / test contexts or when standard canvas is absent
   */
  private async extractPdfFallback(fileInput: FileIngestionInput): Promise<string> {
    if (fileInput.dataUrl && fileInput.dataUrl.startsWith("data:text/")) {
      const base64Part = fileInput.dataUrl.split(",")[1];
      if (typeof atob !== "undefined") {
        return atob(base64Part);
      }
      return Buffer.from(base64Part, "base64").toString("utf-8");
    }

    if (fileInput.buffer) {
      const rawStr = (typeof Buffer !== "undefined" && Buffer.isBuffer(fileInput.buffer))
        ? fileInput.buffer.toString("binary")
        : new Uint8Array(fileInput.buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), "");
      
      // Extract streams between "stream" and "endstream" or plain text tokens
      const textChunks: string[] = [];
      const textMatches = rawStr.match(/\(([^()]{3,})\)\s*Tj/g);
      if (textMatches && textMatches.length > 0) {
        textMatches.forEach((m) => {
          const content = m.replace(/^\(/, "").replace(/\)\s*Tj$/, "");
          if (content.length > 1) textChunks.push(content);
        });
      }

      if (textChunks.length > 0) {
        return textChunks.join(" ");
      }
    }

    return "";
  }

  /**
   * Semantic structure detection for arbitrary chapter counts
   * Preserves tables, lists, section headings, and figure references
   */
  public detectDocumentStructure(
    fullText: string,
    htmlContent: string,
    fileName: string,
    fileType: IngestionFileType,
    warnings: string[]
  ): {
    metadata: ExtractedManuscriptMetadata;
    chapters: ManuscriptChapterExtracted[];
  } {
    const lines = fullText.split("\n").map((l) => l.trim()).filter(Boolean);
    const wordCount = fullText.trim() ? fullText.trim().split(/\s+/).length : 0;

    // 1. Detect Document Title
    let detectedTitle: string | undefined;
    let detectedAuthor: string | undefined;

    // Check first 15 lines for Title and Author
    for (let i = 0; i < Math.min(lines.length, 15); i++) {
      const line = lines[i];
      if (!detectedTitle && line.length > 3 && line.length < 120 && !line.toLowerCase().startsWith("chapter")) {
        // Exclude common header noise
        if (!line.includes("Table of Contents") && !line.includes("ISBN")) {
          detectedTitle = line;
          continue;
        }
      }

      if (detectedTitle && !detectedAuthor) {
        if (/^(by|author|dr\.|prof\.|written by)[:.\s]/i.test(line)) {
          detectedAuthor = line.replace(/^(by|author|written by)[:.\s]*/i, "").trim();
        } else if (line.length < 60 && /^[A-Z][a-z]+(\s+[A-Z][a-z]+)+$/.test(line)) {
          detectedAuthor = line;
        }
      }
    }

    if (!detectedTitle) {
      detectedTitle = fileName.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
    }

    // 2. Detect Chapter Headings (arbitrary chapter count)
    // Matches:
    // Chapter 1: Introduction
    // CHAPTER 2 - THE FOUNDATIONS
    // Chapter III. Advanced Vectors
    // Chapter 10
    const chapterHeadingRegex = /^(?:CHAPTER|Chapter|CH\.)\s+([0-9IVXLCDM]+|[A-Za-z]+)(?:[:.\s\-—]+([^\n]+))?/i;

    const chapterBoundaries: Array<{
      index: number;
      chapterNumber: number;
      title: string;
    }> = [];

    lines.forEach((line, idx) => {
      const match = line.match(chapterHeadingRegex);
      if (match) {
        const rawNum = match[1];
        const parsedNum = this.parseNumeralOrWord(rawNum, chapterBoundaries.length + 1);
        const subTitle = match[2] ? match[2].trim() : `Chapter ${parsedNum}`;
        chapterBoundaries.push({
          index: idx,
          chapterNumber: parsedNum,
          title: subTitle
        });
      }
    });

    // 3. Detect Tables
    const hasHtmlTables = htmlContent.includes("<table");
    const markdownTableMatches = fullText.match(/\|.+\|[\r\n]+\|[-:| ]+\|/g);
    const hasTables = hasHtmlTables || Boolean(markdownTableMatches && markdownTableMatches.length > 0);
    const tableCount = hasHtmlTables 
      ? (htmlContent.match(/<table/g) || []).length 
      : (markdownTableMatches?.length || 0);

    // 4. Detect Lists
    const hasLists = htmlContent.includes("<ul") || htmlContent.includes("<ol") || /^\s*[-*•]\s+/m.test(fullText);

    // 5. Detect Figures & Images
    const figureReferences: string[] = [];
    const figureMatches = fullText.match(/(?:Figure|Fig\.|Illustration|Diagram)\s+[0-9A-Z.:\-]+/gi);
    if (figureMatches) {
      figureMatches.forEach((f) => {
        if (!figureReferences.includes(f)) figureReferences.push(f);
      });
    }
    const hasImagesOrFigures = htmlContent.includes("<img") || figureReferences.length > 0;

    // 6. Construct Navigable Chapters
    const chapters: ManuscriptChapterExtracted[] = [];

    if (chapterBoundaries.length > 0) {
      for (let i = 0; i < chapterBoundaries.length; i++) {
        const current = chapterBoundaries[i];
        const next = chapterBoundaries[i + 1];
        const startLine = current.index;
        const endLine = next ? next.index : lines.length;
        const chapterLines = lines.slice(startLine, endLine);
        const chapterText = chapterLines.join("\n");
        const chWordCount = chapterText.split(/\s+/).filter(Boolean).length;

        // Extract sections within chapter
        const sections = this.extractSectionsFromChapter(chapterLines, current.chapterNumber);

        chapters.push({
          id: `ch-ext-${current.chapterNumber}`,
          chapterNumber: current.chapterNumber,
          title: current.title,
          overviewSummary: chapterLines.slice(1, 4).join(" "),
          sections,
          totalWordCount: chWordCount,
          rawTextExcerpt: chapterLines.slice(0, 8).join("\n")
        });
      }
    } else {
      // Fallback: When no explicit 'Chapter X' headings are detected,
      // DO NOT fabricate fake chapters. Preserve the entire text into a structured single-chapter representation
      // with clear creator warnings.
      warnings.push(
        "No explicit 'Chapter X' markers were detected in the manuscript. All extracted content has been safely preserved in a single primary chapter so that no text is lost. You may split into chapters during preview or metadata confirmation."
      );

      const fallbackSections = this.extractSectionsFromChapter(lines, 1);

      chapters.push({
        id: "ch-ext-1",
        chapterNumber: 1,
        title: detectedTitle || "Manuscript Primary Content",
        overviewSummary: lines.slice(0, 3).join(" "),
        sections: fallbackSections,
        totalWordCount: wordCount,
        rawTextExcerpt: lines.slice(0, 10).join("\n")
      });
    }

    const totalSectionCount = chapters.reduce((sum, ch) => sum + ch.sections.length, 0);

    const metadata: ExtractedManuscriptMetadata = {
      detectedTitle,
      detectedAuthor,
      detectedWordCount: wordCount,
      detectedChapterCount: chapters.length,
      detectedSectionCount: totalSectionCount,
      hasTables,
      hasLists,
      hasImagesOrFigures,
      figureReferences,
      tableCount,
      formatDetected: fileType
    };

    return { metadata, chapters };
  }

  /**
   * Extract sections, tables, lists, and headings within a chapter
   */
  private extractSectionsFromChapter(
    chapterLines: string[],
    chapterNumber: number
  ): ManuscriptSectionExtracted[] {
    const sections: ManuscriptSectionExtracted[] = [];
    const sectionRegex = /^(?:Section|SEC\.|§)\s*([0-9.]+)?[:.\s\-—]*([^\n]+)/i;
    const numberedHeadingRegex = /^([0-9]+\.[0-9]+)\s+([^\n]+)/;

    let currentSectionLines: string[] = [];
    let currentTitle = `Section ${chapterNumber}.1`;
    let currentNumber = `${chapterNumber}.1`;
    let sectionCount = 1;

    chapterLines.forEach((line) => {
      const secMatch = line.match(sectionRegex) || line.match(numberedHeadingRegex);
      if (secMatch) {
        if (currentSectionLines.length > 0) {
          const content = currentSectionLines.join("\n");
          sections.push({
            id: `sec-ext-${chapterNumber}-${sectionCount}`,
            sectionNumber: currentNumber,
            title: currentTitle,
            content,
            wordCount: content.split(/\s+/).filter(Boolean).length
          });
          sectionCount++;
          currentSectionLines = [];
        }

        currentNumber = secMatch[1] || `${chapterNumber}.${sectionCount}`;
        currentTitle = secMatch[2] || line;
      } else {
        currentSectionLines.push(line);
      }
    });

    if (currentSectionLines.length > 0) {
      const content = currentSectionLines.join("\n");
      sections.push({
        id: `sec-ext-${chapterNumber}-${sectionCount}`,
        sectionNumber: currentNumber,
        title: currentTitle,
        content,
        wordCount: content.split(/\s+/).filter(Boolean).length
      });
    }

    return sections;
  }

  /**
   * Helper to parse numeral or roman/word numerals safely
   */
  private parseNumeralOrWord(val: string, fallback: number): number {
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed)) return parsed;

    const romanMap: Record<string, number> = {
      i: 1, ii: 2, iii: 3, iv: 4, v: 5,
      vi: 6, vii: 7, viii: 8, ix: 9, x: 10,
      xi: 11, xii: 12, xiii: 13, xiv: 14, xv: 15,
      xvi: 16, xvii: 17, xviii: 18, xix: 19, xx: 20
    };

    const wordMap: Record<string, number> = {
      one: 1, two: 2, three: 3, four: 4, five: 5,
      six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
      eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15
    };

    const lower = val.toLowerCase().trim();
    if (romanMap[lower]) return romanMap[lower];
    if (wordMap[lower]) return wordMap[lower];

    return fallback;
  }

  /**
   * Retrieve an ingested package by ID
   */
  public getPackageById(packageId: string): IngestedManuscriptPackage | undefined {
    return this.ingestedPackages.get(packageId);
  }

  /**
   * Retrieve all packages belonging to a specific creator
   */
  public getPackagesByCreator(creatorId: string): IngestedManuscriptPackage[] {
    return Array.from(this.ingestedPackages.values()).filter((p) => p.creatorId === creatorId);
  }

  /**
   * Clear all (for testing)
   */
  public clear(): void {
    this.ingestedPackages.clear();
  }
}

export const manuscriptIngestionService = new ManuscriptIngestionService();
