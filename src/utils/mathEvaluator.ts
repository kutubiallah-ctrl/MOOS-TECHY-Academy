/**
 * MOOS TECHY ACADEMY — Mathematical Evaluation Engine
 * Handles normalization and mathematical equivalence testing for numbers,
 * fractions, mixed numbers, percentages, and simple algebraic equations.
 */

export interface EvaluationResult {
  isEquivalent: boolean;
  normalizedUser: string;
  normalizedExpected: string;
  feedback?: string;
}

/**
 * Strips formatting noise: trims, removes extra spaces, LaTeX delimiters, currency symbols, and units.
 */
export function sanitizeMathString(input: string): string {
  if (!input) return "";
  return input
    .trim()
    .replace(/\\text\{([^}]+)\}/g, "$1") // Strip \text{}
    .replace(/[₦$€£%]/g, "") // Strip currency/percent symbols
    .replace(/\s+/g, " ")
    .replace(/\\,/g, "")
    .replace(/\\cdot/g, "*")
    .replace(/\\times/g, "*")
    .replace(/\\div/g, "/")
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "($1)/($2)")
    .trim();
}

/**
 * Attempts to parse numerical values including integers, decimals, simple fractions (a/b),
 * and mixed numerals (a b/c).
 */
export function parseNumericValue(input: string): number | null {
  const clean = sanitizeMathString(input).replace(/[a-zA-Z=]/g, "").trim();
  if (!clean) return null;

  // Mixed numeral pattern: e.g. "1 7/8" or "2 1/4" or "1-7/8"
  const mixedMatch = clean.match(/^(-?\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    const whole = parseFloat(mixedMatch[1]);
    const num = parseFloat(mixedMatch[2]);
    const den = parseFloat(mixedMatch[3]);
    if (den === 0) return null;
    const fraction = num / den;
    return whole >= 0 ? whole + fraction : whole - fraction;
  }

  // Fraction pattern: e.g. "15/8" or "-3/4" or "(3)/(4)"
  const fractionMatch = clean.match(/^\(?(-?\d+(?:\.\d+)?)\)?\/\(?(-?\d+(?:\.\d+)?)\)?$/);
  if (fractionMatch) {
    const num = parseFloat(fractionMatch[1]);
    const den = parseFloat(fractionMatch[2]);
    if (den === 0) return null;
    return num / den;
  }

  // Standard float
  const parsed = parseFloat(clean);
  return isNaN(parsed) ? null : parsed;
}

/**
 * Compares variable equations: e.g. "x = 4" vs "4" vs "x=4"
 */
export function compareAlgebraicAnswers(user: string, expected: string): boolean {
  const sUser = sanitizeMathString(user).toLowerCase().replace(/\s+/g, "");
  const sExpected = sanitizeMathString(expected).toLowerCase().replace(/\s+/g, "");

  if (sUser === sExpected) return true;

  // Extract variable and value: e.g. x = 4 => value = 4
  const extractVal = (str: string) => {
    const match = str.match(/^[a-z]\s*=\s*(.+)$/i);
    return match ? match[1] : str;
  };

  const userVal = extractVal(sUser);
  const expVal = extractVal(sExpected);

  if (userVal === expVal) return true;

  // Test numeric equivalence of the extracted values
  const numUser = parseNumericValue(userVal);
  const numExp = parseNumericValue(expVal);

  if (numUser !== null && numExp !== null) {
    return Math.abs(numUser - numExp) < 0.0001;
  }

  return false;
}

/**
 * Main evaluation entry point
 */
export function evaluateMathematicalAnswer(userAnswer: string, correctAnswer: string): EvaluationResult {
  const rawUser = userAnswer?.trim() || "";
  const rawExpected = correctAnswer?.trim() || "";

  // 1. Direct match
  if (rawUser.toLowerCase() === rawExpected.toLowerCase()) {
    return {
      isEquivalent: true,
      normalizedUser: rawUser,
      normalizedExpected: rawExpected
    };
  }

  // 2. Algebraic comparison
  if (compareAlgebraicAnswers(rawUser, rawExpected)) {
    return {
      isEquivalent: true,
      normalizedUser: rawUser,
      normalizedExpected: rawExpected
    };
  }

  // 3. Pure numeric equivalence (e.g. 1 7/8 vs 15/8 vs 1.875)
  const numUser = parseNumericValue(rawUser);
  const numExp = parseNumericValue(rawExpected);

  if (numUser !== null && numExp !== null && Math.abs(numUser - numExp) < 0.0001) {
    return {
      isEquivalent: true,
      normalizedUser: rawUser,
      normalizedExpected: rawExpected
    };
  }

  // 4. Multiple roots check: e.g., "x = 3 or x = 4" vs "x = 4 or x = 3"
  const normalizeRootSet = (str: string) => {
    return str
      .toLowerCase()
      .replace(/\\text\{or\}/g, "or")
      .replace(/and/g, "or")
      .replace(/,/g, "or")
      .split("or")
      .map((part) => sanitizeMathString(part).replace(/\s+/g, ""))
      .filter(Boolean)
      .sort();
  };

  const userRoots = normalizeRootSet(rawUser);
  const expRoots = normalizeRootSet(rawExpected);

  if (userRoots.length > 1 && userRoots.length === expRoots.length) {
    const allMatch = userRoots.every((root, idx) => compareAlgebraicAnswers(root, expRoots[idx]));
    if (allMatch) {
      return {
        isEquivalent: true,
        normalizedUser: rawUser,
        normalizedExpected: rawExpected
      };
    }
  }

  return {
    isEquivalent: false,
    normalizedUser: rawUser,
    normalizedExpected: rawExpected
  };
}
