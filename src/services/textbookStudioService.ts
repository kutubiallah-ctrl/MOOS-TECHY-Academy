/**
 * MOOS TECHY TEXTBOOK STUDIO — COMPLETE TEXTBOOK SERVICE
 * 
 * Manages full canonical textbook curricula, multi-chapter navigation,
 * granular section retrieval, search, and QR physical-to-digital resolution.
 * Textbooks are represented as complete works supporting arbitrary chapter counts.
 */

import { TextbookProject, TextbookChapter, TextbookSection } from "../types/textbookStudio";
import { SEEDED_TEXTBOOK_PROJECTS } from "../data/seededTextbooks";
import { auditService } from "./auditService";

class TextbookStudioService {
  private textbooks: TextbookProject[] = [...SEEDED_TEXTBOOK_PROJECTS];

  public getAllTextbooks(): TextbookProject[] {
    return this.textbooks;
  }

  public getAvailableTextbooks(_actor?: any): TextbookProject[] {
    return this.getAllTextbooks();
  }

  public getTextbookById(idOrActor: any, idParam?: string): TextbookProject | undefined {
    const id = typeof idOrActor === "string" ? idOrActor : idParam;
    if (!id) return undefined;
    return this.textbooks.find((tb) => tb.id === id || tb.code === id);
  }

  /**
   * Retrieve a specific chapter by number or ID from a textbook
   */
  public getChapter(bookId: string, chapterNumberOrId: number | string): TextbookChapter | undefined {
    const textbook = this.getTextbookById(bookId);
    if (!textbook) return undefined;

    if (typeof chapterNumberOrId === "number") {
      return textbook.chapters.find((ch) => ch.chapterNumber === chapterNumberOrId);
    }

    return (
      textbook.chapters.find((ch) => ch.id === chapterNumberOrId) ||
      textbook.chapters.find((ch) => ch.chapterNumber === parseInt(chapterNumberOrId, 10))
    );
  }

  public getChapterContent(actorOrBookId: any, bookIdOrNum: any, chapterNum?: number): TextbookChapter | undefined {
    if (typeof actorOrBookId === "string") {
      return this.getChapter(actorOrBookId, bookIdOrNum);
    }
    return this.getChapter(bookIdOrNum, chapterNum!);
  }

  /**
   * Get adjacent (previous and next) chapters for seamless learner navigation
   */
  public getAdjacentChapters(
    bookId: string,
    currentChapterNumber: number
  ): { prev?: TextbookChapter; next?: TextbookChapter } {
    const textbook = this.getTextbookById(bookId);
    if (!textbook) return {};

    const sorted = [...textbook.chapters].sort((a, b) => a.chapterNumber - b.chapterNumber);
    const currentIndex = sorted.findIndex((ch) => ch.chapterNumber === currentChapterNumber);

    if (currentIndex === -1) return {};

    return {
      prev: currentIndex > 0 ? sorted[currentIndex - 1] : undefined,
      next: currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : undefined
    };
  }

  /**
   * Search across all chapters in a textbook for terms in title, overview, formulas, or sections
   */
  public searchChapters(
    bookId: string,
    query: string
  ): Array<{ chapter: TextbookChapter; matchType: "title" | "summary" | "formula" | "section" }> {
    const textbook = this.getTextbookById(bookId);
    if (!textbook || !query.trim()) return [];

    const q = query.toLowerCase().trim();
    const results: Array<{ chapter: TextbookChapter; matchType: "title" | "summary" | "formula" | "section" }> = [];

    textbook.chapters.forEach((ch) => {
      if (ch.title.toLowerCase().includes(q) || (ch.subtitle && ch.subtitle.toLowerCase().includes(q))) {
        results.push({ chapter: ch, matchType: "title" });
        return;
      }

      if (ch.overviewSummary && ch.overviewSummary.toLowerCase().includes(q)) {
        results.push({ chapter: ch, matchType: "summary" });
        return;
      }

      if (ch.chapterSummaryFormulas && ch.chapterSummaryFormulas.some((f) => f.toLowerCase().includes(q))) {
        results.push({ chapter: ch, matchType: "formula" });
        return;
      }

      const matchSec = ch.sections.some(
        (sec) =>
          sec.title.toLowerCase().includes(q) ||
          sec.coreConcepts.some(
            (c) => c.title.toLowerCase().includes(q) || c.intuitiveExplanation.toLowerCase().includes(q)
          ) ||
          sec.workedExamples.some((we) => we.title.toLowerCase().includes(q) || we.problemStatement.toLowerCase().includes(q))
      );

      if (matchSec) {
        results.push({ chapter: ch, matchType: "section" });
      }
    });

    return results;
  }

  /**
   * Resolve a stable QR identifier (e.g. CEMM-CH03-SEC01-FAC) to its exact location in the textbook
   */
  public getQRResourceForSection(
    stableQRIdentifier: string
  ): { book: TextbookProject; chapter: TextbookChapter; section: TextbookSection } | undefined {
    const cleanQR = stableQRIdentifier.trim().toUpperCase();

    for (const book of this.textbooks) {
      for (const chapter of book.chapters) {
        for (const section of chapter.sections) {
          if (section.stableQRIdentifier.toUpperCase() === cleanQR) {
            return { book, chapter, section };
          }
        }
      }
    }

    return undefined;
  }

  /**
   * Update textbook metadata or contents
   */
  public updateTextbook(id: string, updates: Partial<TextbookProject>): TextbookProject | null {
    const idx = this.textbooks.findIndex((t) => t.id === id || t.code === id);
    if (idx === -1) return null;

    this.textbooks[idx] = {
      ...this.textbooks[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return this.textbooks[idx];
  }

  /**
   * Add a new chapter to a textbook (arbitrary chapter count supported)
   */
  public addChapterToTextbook(textbookId: string, chapter: TextbookChapter): boolean {
    const textbook = this.getTextbookById(textbookId);
    if (!textbook) return false;

    // Check if chapter number already exists
    const exists = textbook.chapters.some((c) => c.chapterNumber === chapter.chapterNumber);
    if (exists) {
      throw new Error(`Chapter ${chapter.chapterNumber} already exists in ${textbook.title}.`);
    }

    textbook.chapters.push(chapter);
    textbook.chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);
    textbook.updatedAt = new Date().toISOString();

    auditService.logEvent({
      eventType: "BOOK_CREATED",
      actorId: "system",
      actorRole: "ADMIN",
      actorDisplayName: "Curriculum Architect",
      resourceType: "textbook_project",
      resourceId: textbookId,
      result: "SUCCESS",
      dataClassification: "CANONICAL_PUBLIC",
      metadata: {
        chapterNumber: chapter.chapterNumber,
        chapterTitle: chapter.title
      }
    });

    return true;
  }

  public createTextbookProject(project: Partial<TextbookProject>): TextbookProject {
    const newProject: TextbookProject = {
      id: `tb-${Date.now()}`,
      code: project.code || `TB-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      title: project.title || "Untitled Educational Treatise",
      subtitle: project.subtitle || "Comprehensive Educational Treatise",
      discipline: project.discipline || "mathematics",
      targetLevel: project.targetLevel || "senior_secondary",
      curriculumStandard: project.curriculumStandard || "WAEC_WASSCE",
      curriculumMappingStatus: "draft",
      edition: project.edition || {
        editionNumber: 1,
        editionName: "First Draft Edition",
        releaseYear: 2026,
        printFormat: "digital_companion_pdf",
        totalEstimatedPages: 250
      },
      authors: project.authors || [
        {
          id: `auth-${Date.now()}`,
          name: "Educator Author",
          title: "Author & Pedagogue",
          affiliation: "MOOS ACADEMY Faculty",
          bio: "Specialist educator.",
          isLeadAuthor: true
        }
      ],
      contributors: [],
      bookBrief: project.bookBrief || {
        targetAudienceDescription: "Senior secondary learners.",
        pedagogicalPhilosophy: "Mastery-based Socratic progression.",
        differentiatingFeatures: ["Integrated QR companion resources."],
        prerequisitesRequired: ["Foundational domain concepts."]
      },
      parts: [],
      chapters: [],
      totalQRResourcesCount: 0,
      lifecycleStatus: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.textbooks.unshift(newProject);
    return newProject;
  }

  /**
   * Generates a standardized, deterministic QR identifier
   * e.g. CEMM-CH03-SEC02-EX04
   */
  public generateQRIdentifier(
    bookCode: string,
    chapterNumber: number,
    sectionNumber: string | number,
    suffix?: string
  ): string {
    const baseCode = bookCode.replace(/[^A-Z0-9]/gi, "").substring(0, 4).toUpperCase();
    const chStr = String(chapterNumber).padStart(2, "0");
    const secStr = String(sectionNumber).replace(".", "").padStart(2, "0");
    const sufStr = suffix ? `-${suffix.toUpperCase()}` : "";
    return `${baseCode}-CH${chStr}-SEC${secStr}${sufStr}`;
  }

  public updateSectionContent(
    textbookId: string,
    chapterId: string,
    sectionId: string,
    updatedSection: Partial<TextbookSection>
  ): boolean {
    const textbook = this.getTextbookById(textbookId);
    if (!textbook) return false;

    const chapter = textbook.chapters.find((c) => c.id === chapterId);
    if (!chapter) return false;

    const sectionIndex = chapter.sections.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1) return false;

    chapter.sections[sectionIndex] = {
      ...chapter.sections[sectionIndex],
      ...updatedSection
    };
    textbook.updatedAt = new Date().toISOString();
    return true;
  }

  /**
   * Reset to seeded textbooks (useful in tests)
   */
  public reset(): void {
    this.textbooks = [...SEEDED_TEXTBOOK_PROJECTS];
  }
}

export const textbookStudioService = new TextbookStudioService();
