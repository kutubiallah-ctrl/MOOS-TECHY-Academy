/**
 * MOOS TECHY ACADEMY — MATHEMATICAL SPEECH NORMALIZATION & PRONUNCIATION ENGINE
 * 
 * Phase 19: Mathematical Speech Architecture
 * 
 * Flow:
 *   MATHEMATICAL EXPRESSION
 *          ↓
 *   NOTATION PARSER
 *          ↓
 *   SEMANTIC MATHEMATICAL REPRESENTATION
 *          ↓
 *   SPOKEN MATHEMATICS NORMALIZER
 *          ↓
 *   NATURAL LANGUAGE PRONUNCIATION
 *          ↓
 *   TTS / AUDIO ADAPTER
 * 
 * Strictly enforces:
 * - Superscript vs Subscript mathematical invariants (x² = "x squared" vs x₂ = "x subscript 2")
 * - 2s² + 7s − 6 = "2 s squared plus 7 s minus 6" (Never "subscript s 2")
 * - Fraction grouping preservation (1/2 = "one half", (x + 1)/3 = "x plus 1 over 3")
 * - Radicals, Greek symbols, trigonometric powers, logarithms, and set notation
 */

export interface MathPronunciationOptions {
  preserveParenthesesSpeech?: boolean;
  expandFractionsVerbal?: boolean;
  spellOutVariables?: boolean;
}

export interface SemanticMathToken {
  type:
    | "number"
    | "variable"
    | "superscript"
    | "subscript"
    | "operator"
    | "fraction"
    | "radical"
    | "greek"
    | "function"
    | "grouping"
    | "relation"
    | "text";
  raw: string;
  spoken: string;
}

export class MathematicalSpeechService {
  private static instance: MathematicalSpeechService;

  public static getInstance(): MathematicalSpeechService {
    if (!MathematicalSpeechService.instance) {
      MathematicalSpeechService.instance = new MathematicalSpeechService();
    }
    return MathematicalSpeechService.instance;
  }

  /**
   * Main entry point: converts any text containing mathematical formulas,
   * LaTeX, unicode exponents, fractions, or algebraic equations into fluent,
   * mathematically accurate natural language for SpeechSynthesis.
   */
  public normalizeSpokenMathematics(text: string, options: MathPronunciationOptions = {}): string {
    if (!text || typeof text !== "string") return "";

    let speech = text;

    // 1. Pre-process LaTeX delimiters & math blocks: $...$, $$...$$, \(...\), \[...\]
    speech = speech.replace(/\$\$([\s\S]+?)\$\$/g, (_, eq) => ` ${this.convertEquationToSpeech(eq, options)} `);
    speech = speech.replace(/\\\[([\s\S]+?)\\\]/g, (_, eq) => ` ${this.convertEquationToSpeech(eq, options)} `);
    speech = speech.replace(/\$([^$]+?)\$/g, (_, eq) => ` ${this.convertEquationToSpeech(eq, options)} `);
    speech = speech.replace(/\\\((.+?)\\\)/g, (_, eq) => ` ${this.convertEquationToSpeech(eq, options)} `);

    // 2. Normalize standalone and embedded mathematical expressions
    speech = this.convertEquationToSpeech(speech, options);

    // 3. Final cleaning: collapse whitespace and punctuation
    speech = speech
      .replace(/\s+/g, " ")
      .replace(/\s+([.,!?;:])/g, "$1")
      .trim();

    return speech;
  }

  /**
   * Translates a mathematical formula, expression, or algebraic clause into natural spoken mathematics
   */
  public convertEquationToSpeech(expr: string, options: MathPronunciationOptions = {}): string {
    if (!expr) return "";

    let s = expr;

    // --- PHASE A: LaTeX Commands & Macro Normalization ---
    // LaTeX fractions: \frac{num}{den} or \dfrac{num}{den}
    s = s.replace(/\\(?:d)?frac\{([^{}]+)\}\{([^{}]+)\}/g, (_, num, den) => {
      return this.formatFractionSpeech(num, den, options);
    });
    // Nested fraction support (depth 2)
    s = s.replace(/\\(?:d)?frac\{([^{}]+)\}\{([^{}]+)\}/g, (_, num, den) => {
      return this.formatFractionSpeech(num, den, options);
    });

    // LaTeX radicals: \sqrt[n]{x} and \sqrt{x}
    s = s.replace(/\\sqrt\[3\]\{([^{}]+)\}/g, (_, inner) => `cube root of ${this.convertEquationToSpeech(inner, options)}`);
    s = s.replace(/\\sqrt\[(\w+)\]\{([^{}]+)\}/g, (_, n, inner) => `${n}-th root of ${this.convertEquationToSpeech(inner, options)}`);
    s = s.replace(/\\sqrt\{([^{}]+)\}/g, (_, inner) => `square root of ${this.convertEquationToSpeech(inner, options)}`);

    // Special LaTeX symbols & sets
    s = s.replace(/\\mathbb\{R\}|\\Re/g, "real numbers");
    s = s.replace(/\\mathbb\{Z\}/g, "integers");
    s = s.replace(/\\mathbb\{N\}/g, "natural numbers");
    s = s.replace(/\\mathbb\{C\}/g, "complex numbers");
    s = s.replace(/\\infty/g, "infinity");
    s = s.replace(/\\Delta/g, "delta");
    s = s.replace(/\\delta/g, "delta");
    s = s.replace(/\\theta/g, "theta");
    s = s.replace(/\\pi/g, "pi");
    s = s.replace(/\\alpha/g, "alpha");
    s = s.replace(/\\beta/g, "beta");
    s = s.replace(/\\gamma/g, "gamma");
    s = s.replace(/\\lambda/g, "lambda");
    s = s.replace(/\\mu/g, "mu");
    s = s.replace(/\\sigma/g, "sigma");
    s = s.replace(/\\omega/g, "omega");
    s = s.replace(/\\sum/g, "sum");
    s = s.replace(/\\lim_\{([^}]+)\}/g, "limit as $1");
    s = s.replace(/\\lim/g, "limit");
    s = s.replace(/\\to|\\rightarrow/g, " approaches ");
    s = s.replace(/\\implies|\\Rightarrow/g, " implies ");
    s = s.replace(/\\equiv/g, " is equivalent to ");
    s = s.replace(/\\in/g, " in ");
    s = s.replace(/\\pm/g, " plus or minus ");
    s = s.replace(/\\mp/g, " minus or plus ");
    s = s.replace(/\\times|\\cdot/g, " times ");
    s = s.replace(/\\div/g, " divided by ");
    s = s.replace(/\\leq|\\le/g, " is less than or equal to ");
    s = s.replace(/\\geq|\\ge/g, " is greater than or equal to ");
    s = s.replace(/\\neq|\\ne/g, " is not equal to ");
    s = s.replace(/\\approx/g, " is approximately equal to ");
    s = s.replace(/\\quad|\\qquad|\\,/g, " ");

    // LaTeX Functions with powers like \sin^2\theta, \cos^2 x
    s = s.replace(/\\sin\^2(?:\s*\{?(\w+)\}?|\s*(\w+))/g, "sine squared $1$2");
    s = s.replace(/\\cos\^2(?:\s*\{?(\w+)\}?|\s*(\w+))/g, "cosine squared $1$2");
    s = s.replace(/\\tan\^2(?:\s*\{?(\w+)\}?|\s*(\w+))/g, "tangent squared $1$2");

    // Standard LaTeX function names
    s = s.replace(/\\sin/g, "sine");
    s = s.replace(/\\cos/g, "cosine");
    s = s.replace(/\\tan/g, "tangent");
    s = s.replace(/\\ln/g, "natural log");
    s = s.replace(/\\log_2(?:\s*\{?(\w+)\}?)/g, "log base 2 of $1");
    s = s.replace(/\\log_\{?(\w+)\}?(?:\s*\{?(\w+)\}?)/g, "log base $1 of $2");
    s = s.replace(/\\log/g, "log");

    // LaTeX Subscripts: x_1, x_{1}, a_1, u_x, x_{12}
    // Subscripts MUST be spoken as "subscript N" to clearly differentiate from powers!
    s = s.replace(/([a-zA-Z])_\{([a-zA-Z0-9]+)\}/g, "$1 subscript $2");
    s = s.replace(/([a-zA-Z])_([a-zA-Z0-9])/g, "$1 subscript $2");

    // LaTeX Superscripts: x^2, x^{2}, s^2, x^3, x^n
    s = s.replace(/([a-zA-Z0-9\)])\^\{2\}/g, "$1 squared");
    s = s.replace(/([a-zA-Z0-9\)])\^2(?![0-9])/g, "$1 squared");
    s = s.replace(/([a-zA-Z0-9\)])\^\{3\}/g, "$1 cubed");
    s = s.replace(/([a-zA-Z0-9\)])\^3(?![0-9])/g, "$1 cubed");
    s = s.replace(/([a-zA-Z0-9\)])\^\{4\}/g, "$1 to the fourth power");
    s = s.replace(/([a-zA-Z0-9\)])\^4(?![0-9])/g, "$1 to the fourth power");
    s = s.replace(/([a-zA-Z0-9\)])\^\{5\}/g, "$1 to the fifth power");
    s = s.replace(/([a-zA-Z0-9\)])\^5(?![0-9])/g, "$1 to the fifth power");
    s = s.replace(/([a-zA-Z0-9\)])\^\{([a-zA-Z0-9]+)\}/g, "$1 to the $2 power");
    s = s.replace(/([a-zA-Z0-9\)])\^([a-zA-Z])/g, "$1 to the $2 power");

    // Clean remaining LaTeX braces or formatting commands like \mathbf{...}, \text{...}
    s = s.replace(/\\mathbf\{([^{}]+)\}/g, "$1");
    s = s.replace(/\\text\{([^{}]+)\}/g, "$1");
    s = s.replace(/\\left|\\right/g, "");

    // --- PHASE B: Unicode Mathematical Symbols & Radicals ---
    // Radicals with unicode
    s = s.replace(/∛\s*\(([^)]+)\)/g, (_, inner) => `cube root of ${this.convertEquationToSpeech(inner, options)}`);
    s = s.replace(/∛\s*([a-zA-Z0-9]+)/g, (_, inner) => `cube root of ${inner}`);
    s = s.replace(/√\s*\(([^)]+)\)/g, (_, inner) => `square root of ${this.convertEquationToSpeech(inner, options)}`);
    s = s.replace(/√\s*([a-zA-Z0-9]+)/g, (_, inner) => `square root of ${inner}`);

    // Unicode Greek letters
    s = s.replace(/π/g, " pi ");
    s = s.replace(/θ/g, " theta ");
    s = s.replace(/Δ\s*([a-zA-Z])/g, " delta $1 ");
    s = s.replace(/Δ/g, " delta ");
    s = s.replace(/Σ/g, " sum ");
    s = s.replace(/∞/g, " infinity ");
    s = s.replace(/∈/g, " in ");
    s = s.replace(/ℝ/g, " real numbers ");
    s = s.replace(/⇒/g, " implies ");
    s = s.replace(/≡/g, " is equivalent to ");

    // Unicode Logarithms: log₂x, log₁₀x (must be matched before general subscripts)
    s = s.replace(/\blog₂\s*([a-zA-Z0-9]+)/gi, "log base 2 of $1");
    s = s.replace(/\blog₁₀\s*([a-zA-Z0-9]+)/gi, "log base 10 of $1");

    // Special Trig Powers with unicode: sin²θ, cos²θ, tan²θ
    s = s.replace(/\bsin²\s*(?:θ|theta)/gi, "sine squared theta");
    s = s.replace(/\bcos²\s*(?:θ|theta)/gi, "cosine squared theta");
    s = s.replace(/\btan²\s*(?:θ|theta)/gi, "tangent squared theta");
    s = s.replace(/\bsin²\s*([a-zA-Z])/gi, "sine squared $1");
    s = s.replace(/\bcos²\s*([a-zA-Z])/gi, "cosine squared $1");
    s = s.replace(/\btan²\s*([a-zA-Z])/gi, "tangent squared $1");

    // Unicode Subscripts: ₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉
    // Distinguish explicitly as "subscript"
    s = s.replace(/([a-zA-Z])([₀₁₂₃₄₅₆₇₈₉]+)/g, (_, base, subChars) => {
      const subNumber = Array.from(subChars as string)
        .map((c: string) => {
          const map: Record<string, string> = {
            "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4",
            "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9"
          };
          return map[c] || c;
        })
        .join("");
      return `${base} subscript ${subNumber}`;
    });

    // Unicode Superscripts (Powers): ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ ⁿ
    // Explicitly spoken as mathematical powers (NEVER subscript!)
    s = s.replace(/([a-zA-Z0-9\)])²/g, "$1 squared");
    s = s.replace(/([a-zA-Z0-9\)])³/g, "$1 cubed");
    s = s.replace(/([a-zA-Z0-9\)])⁴/g, "$1 to the fourth power");
    s = s.replace(/([a-zA-Z0-9\)])⁵/g, "$1 to the fifth power");
    s = s.replace(/([a-zA-Z0-9\)])⁶/g, "$1 to the sixth power");
    s = s.replace(/([a-zA-Z0-9\)])⁷/g, "$1 to the seventh power");
    s = s.replace(/([a-zA-Z0-9\)])⁸/g, "$1 to the eighth power");
    s = s.replace(/([a-zA-Z0-9\)])⁹/g, "$1 to the ninth power");
    s = s.replace(/([a-zA-Z0-9\)])ⁿ/g, "$1 to the n power");
    s = s.replace(/([a-zA-Z0-9\)])⁰/g, "$1 to the zero power");
    s = s.replace(/([a-zA-Z0-9\)])¹/g, "$1 to the first power");

    // Unicode Logarithms: log₂x, log₁₀x
    s = s.replace(/\blog₂\s*([a-zA-Z0-9]+)/gi, "log base 2 of $1");
    s = s.replace(/\blog₁₀\s*([a-zA-Z0-9]+)/gi, "log base 10 of $1");

    // Standard Math operators and relations
    s = s.replace(/±/g, " plus or minus ");
    s = s.replace(/≤/g, " is less than or equal to ");
    s = s.replace(/≥/g, " is greater than or equal to ");
    s = s.replace(/≠/g, " is not equal to ");
    s = s.replace(/≈/g, " is approximately equal to ");
    s = s.replace(/×/g, " times ");
    s = s.replace(/÷/g, " divided by ");

    // Minus signs: U+2212 (mathematical minus) and hyphen-minus
    s = s.replace(/−/g, " - ");

    // --- PHASE C: Algebraic Tokenization & Spacing ---
    // Separate coefficients from variables so TTS doesn't slur them:
    // e.g. "2s squared" -> "2 s squared", "2as" -> "2 a s", "4ac" -> "4 a c", "7s" -> "7 s"
    s = s.replace(/\b([0-9]+)([a-zA-Z]{1,4})\b/g, (_, num, letters) => {
      // Do not split common metric unit abbreviations if preceded by space in non-math, but in algebra split:
      return `${num} ${Array.from(letters).join(" ")}`;
    });

    // Parenthesized polynomial products: (x + 2)(x - 3)
    s = s.replace(/\(([^)]+)\)\s*\(([^)]+)\)/g, (match, p1, p2) => {
      const sp1 = this.convertEquationToSpeech(p1, options);
      const sp2 = this.convertEquationToSpeech(p2, options);
      return `open parenthesis ${sp1} close parenthesis times open parenthesis ${sp2} close parenthesis`;
    });

    // Parenthesized fractions: (x + 1)/3 or (a + b)/(c + d)
    s = s.replace(/\(([^)]+)\)\s*\/\s*\(([^)]+)\)/g, (_, num, den) => {
      const sNum = this.convertEquationToSpeech(num, options);
      const sDen = this.convertEquationToSpeech(den, options);
      return `${sNum} over ${sDen}`;
    });
    s = s.replace(/\(([^)]+)\)\s*\/\s*([a-zA-Z0-9]+)/g, (_, num, den) => {
      const sNum = this.convertEquationToSpeech(num, options);
      return `${sNum} over ${den}`;
    });

    // Standalone numerical fractions: 1/2, 1/3, 1/4, 3/4
    s = s.replace(/\b1\/2\b/g, "one half");
    s = s.replace(/\b1\/3\b/g, "one third");
    s = s.replace(/\b1\/4\b/g, "one fourth");
    s = s.replace(/\b2\/3\b/g, "two thirds");
    s = s.replace(/\b3\/4\b/g, "three fourths");
    s = s.replace(/\b([a-zA-Z0-9]+)\s*\/\s*([a-zA-Z0-9]+)\b/g, "$1 over $2");

    // Operators in algebraic sentences
    s = s.replace(/\s*\+\s*/g, " plus ");
    // Minus as binary operator vs negative leading term
    s = s.replace(/\s*-\s*/g, " minus ");
    s = s.replace(/\s*=\s*/g, " equals ");
    s = s.replace(/\s*<\s*/g, " is less than ");
    s = s.replace(/\s*>\s*/g, " is greater than ");

    // Handle "minus 0" -> "minus zero", "equals 0" -> "equals zero"
    s = s.replace(/\bequals\s+0\b/g, "equals zero");
    s = s.replace(/\bto\s+0\b/g, "to zero");

    // Clean up negative signs that got turned into "minus" at the start of expressions or clauses
    s = s.replace(/(?:^|\b(?:equals|is|plus|times|over)\s+)minus\s+([0-9a-zA-Z])/g, "$1negative $2");

    // Clean up double spaces
    s = s.replace(/\s+/g, " ").trim();

    return s;
  }

  /**
   * Translates fractions into clear spoken language
   */
  private formatFractionSpeech(num: string, den: string, options: MathPronunciationOptions): string {
    const cleanNum = num.trim();
    const cleanDen = den.trim();

    if (cleanNum === "1" && cleanDen === "2") return "one half";
    if (cleanNum === "1" && cleanDen === "3") return "one third";
    if (cleanNum === "1" && cleanDen === "4") return "one fourth";
    if (cleanNum === "2" && cleanDen === "3") return "two thirds";
    if (cleanNum === "3" && cleanDen === "4") return "three fourths";

    const spokenNum = this.convertEquationToSpeech(cleanNum, options);
    const spokenDen = this.convertEquationToSpeech(cleanDen, options);

    // If numerator or denominator is complex, group clearly
    const isNumComplex = cleanNum.includes("+") || cleanNum.includes("-") || cleanNum.includes("\\pm");
    const isDenComplex = cleanDen.includes("+") || cleanDen.includes("-") || cleanDen.includes("\\pm");

    if (isNumComplex || isDenComplex) {
      return `${spokenNum} over ${spokenDen}`;
    }

    return `${spokenNum} over ${spokenDen}`;
  }

  /**
   * Helper to create an utterance with normalized mathematical speech
   */
  public createSpeechUtterance(text: string, options: { rate?: number; volume?: number; pitch?: number } = {}): SpeechSynthesisUtterance | null {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !window.SpeechSynthesisUtterance) {
      return null;
    }

    const normalizedText = this.normalizeSpokenMathematics(text);
    const utterance = new SpeechSynthesisUtterance(normalizedText);
    if (options.rate !== undefined) utterance.rate = options.rate;
    if (options.volume !== undefined) utterance.volume = options.volume;
    if (options.pitch !== undefined) utterance.pitch = options.pitch;
    return utterance;
  }
}

export const mathematicalSpeechService = MathematicalSpeechService.getInstance();
