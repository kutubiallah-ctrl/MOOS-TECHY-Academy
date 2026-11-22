import { QRResourceRecord, QRResolutionResult, QRBook } from "../types/qrResource";
import { REGISTERED_QR_RESOURCES, REGISTERED_QR_BOOKS } from "../data/qrResourceData";

export class QRResourceService {
  private static resources: QRResourceRecord[] = REGISTERED_QR_RESOURCES;
  private static books: QRBook[] = REGISTERED_QR_BOOKS;

  /**
   * Safely sanitize and normalize input identifier string
   */
  public static sanitizeIdentifier(rawInput: string): string {
    if (!rawInput || typeof rawInput !== "string") return "";
    // Remove query params or URL prefix if full URL was pasted/scanned
    let clean = rawInput.trim();
    if (clean.includes("?qr=")) {
      clean = clean.split("?qr=")[1].split("&")[0];
    } else if (clean.includes("/resource/")) {
      clean = clean.split("/resource/")[1].split("?")[0];
    } else if (clean.includes("/books/")) {
      const parts = clean.split("/books/")[1].split("/");
      clean = parts[parts.length - 1];
    }
    // Remove unsafe characters (allow alphanumeric and dashes/underscores)
    return clean.replace(/[^a-zA-Z0-9\-_]/g, "").toUpperCase();
  }

  /**
   * Resolves a QR code identifier to its canonical digital learning companion record
   */
  public static resolveResource(identifier: string): QRResolutionResult {
    const cleanId = this.sanitizeIdentifier(identifier);
    const now = new Date().toISOString();

    if (!cleanId) {
      return {
        isValid: false,
        resolvedAt: now,
        error: "Please enter or scan a valid MOOS Academy resource code."
      };
    }

    // Direct exact match
    const exactMatch = this.resources.find(
      (r) => r.resourceCode.toUpperCase() === cleanId
    );

    if (exactMatch) {
      return {
        isValid: true,
        resource: exactMatch,
        resolvedAt: now
      };
    }

    // Partial/Fuzzy lookup (e.g. "CH3" or "QUADRATICS" or "CEMM-3")
    const fuzzyMatch = this.resources.find((r) => {
      const codeUpper = r.resourceCode.toUpperCase();
      const chStr = `CH${r.chapterNumber}`;
      const secStr = `SEC${r.sectionNumber.replace(".", "")}`;
      return (
        codeUpper.includes(cleanId) ||
        cleanId.includes(codeUpper) ||
        cleanId.includes(chStr) ||
        cleanId.includes(r.chapterTitle.toUpperCase()) ||
        cleanId.includes(r.resourceCode.replace(/-/g, ""))
      );
    });

    if (fuzzyMatch) {
      return {
        isValid: true,
        resource: fuzzyMatch,
        resolvedAt: now
      };
    }

    return {
      isValid: false,
      resolvedAt: now,
      error: `Resource code "${identifier}" was not found in the MOOS Academy registry. Please verify the code printed in your textbook.`
    };
  }

  /**
   * Retrieve all registered publications and companion resources
   */
  public static getAllResources(): QRResourceRecord[] {
    return this.resources;
  }

  /**
   * Retrieve all registered published textbook volumes
   */
  public static getRegisteredBooks(): QRBook[] {
    return this.books;
  }

  /**
   * Get a specific textbook record by its code (e.g. "CEMM-MTH-S1")
   */
  public static getBookByCode(bookCode: string): QRBook | undefined {
    return this.books.find((b) => b.code.toUpperCase() === bookCode.toUpperCase());
  }

  /**
   * Filter books by academic domain
   */
  public static getBooksByDomain(domainId: string): QRBook[] {
    if (!domainId || domainId === "all") return this.books;
    return this.books.filter((b) => b.domainId === domainId);
  }

  /**
   * Filter resources by book code (e.g. "CEMM-MTH-S1")
   */
  public static getResourcesByBook(bookCode: string): QRResourceRecord[] {
    return this.resources.filter((r) => r.bookCode.toUpperCase() === bookCode.toUpperCase());
  }

  /**
   * Search resources across title, chapter, and learning objectives
   */
  public static searchResources(query: string): QRResourceRecord[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.resources;

    return this.resources.filter((r) =>
      r.title.toLowerCase().includes(q) ||
      r.chapterTitle.toLowerCase().includes(q) ||
      r.sectionTitle.toLowerCase().includes(q) ||
      r.resourceCode.toLowerCase().includes(q) ||
      r.bookTitle.toLowerCase().includes(q) ||
      r.learningObjectives.some((obj) => obj.toLowerCase().includes(q))
    );
  }

  /**
   * Generates a stable web URL for a given resource code
   */
  public static generateWebUrl(resourceCode: string): string {
    const cleanId = encodeURIComponent(this.sanitizeIdentifier(resourceCode));
    return `${window.location.origin}?qr=${cleanId}`;
  }
}

export const qrResourceService = QRResourceService;

