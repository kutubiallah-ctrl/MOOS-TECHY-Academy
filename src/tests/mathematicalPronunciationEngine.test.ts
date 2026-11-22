/**
 * MOOS TECHY ACADEMY — MATHEMATICAL PRONUNCIATION & VOICE ENGINE TEST SUITE
 * 
 * Phase 19: Mathematical Speech Architecture & Semantic Invariants Verification
 */

import { mathematicalSpeechService } from "../services/mathematicalSpeechService";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`[ASSERTION_FAILURE] ${message}`);
  }
}

export function runMathematicalPronunciationTests(): void {
  console.log("\n==========================================================================");
  console.log("🗣️  PHASE 19: MATHEMATICAL NOTATION & SPEECH ENGINE VERIFICATION");
  console.log("==========================================================================\n");

  const normalize = (text: string) => mathematicalSpeechService.normalizeSpokenMathematics(text);

  // 1. Critical Quadratic Bug Case: 2s² + 7s − 6
  console.log("--- Test 1: Critical Quadratic Bug Case (2s² + 7s − 6) ---");
  const quadS = normalize("2s² + 7s − 6");
  console.log(`Input: "2s² + 7s − 6"  ->  Spoken: "${quadS}"`);
  assert(!quadS.toLowerCase().includes("subscript s"), "Must NEVER pronounce superscript ² as subscript s");
  assert(!quadS.toLowerCase().includes("subscript 2"), "Must NEVER pronounce superscript ² as subscript 2");
  assert(quadS.includes("2 s squared"), `Expected '2 s squared', got: '${quadS}'`);
  assert(quadS.includes("7 s"), `Expected '7 s', got: '${quadS}'`);
  assert(quadS.includes("minus 6"), `Expected 'minus 6', got: '${quadS}'`);
  console.log("✅ [PASS] Critical 2s² quadratic expression spoken with exact mathematical power meaning");

  // 2. Superscript Powers Invariants
  console.log("\n--- Test 2: Superscript Powers Invariants ---");
  const x2 = normalize("x²");
  assert(x2.includes("x squared"), `Expected 'x squared', got: '${x2}'`);

  const x3 = normalize("x³");
  assert(x3.includes("x cubed"), `Expected 'x cubed', got: '${x3}'`);

  const x4 = normalize("x⁴");
  assert(x4.includes("x to the fourth power"), `Expected 'x to the fourth power', got: '${x4}'`);

  const xn = normalize("xⁿ");
  assert(xn.includes("x to the n power"), `Expected 'x to the n power', got: '${xn}'`);

  const x2y2 = normalize("x² + y²");
  assert(x2y2.includes("x squared plus y squared"), `Expected 'x squared plus y squared', got: '${x2y2}'`);

  // LaTeX superscripts
  const latexPow = normalize("3x^2 - 5x + 2 = 0");
  assert(latexPow.includes("3 x squared minus 5 x plus 2 equals zero"), `Expected '3 x squared minus 5 x plus 2 equals zero', got: '${latexPow}'`);
  console.log("✅ [PASS] Superscript powers (x², x³, x⁴, xⁿ, x² + y², 3x² - 5x + 2 = 0) verified");

  // 3. Subscript Distinguishability Invariant: x² vs x₂
  console.log("\n--- Test 3: Subscript vs Superscript Invariant ---");
  const xSub1 = normalize("x₁");
  assert(xSub1.includes("x subscript 1"), `Expected 'x subscript 1', got: '${xSub1}'`);

  const xSub2 = normalize("x₂");
  assert(xSub2.includes("x subscript 2"), `Expected 'x subscript 2', got: '${xSub2}'`);

  const a1 = normalize("a₁");
  assert(a1.includes("a subscript 1"), `Expected 'a subscript 1', got: '${a1}'`);

  const a2 = normalize("a₂");
  assert(a2.includes("a subscript 2"), `Expected 'a subscript 2', got: '${a2}'`);

  // Subscript MUST NOT equal superscript
  assert(x2 !== xSub2, "Mathematical invariant failure: x² and x₂ must have distinctly different spoken representations");
  console.log("✅ [PASS] Subscripts (x₁, x₂, a₁, a₂) clearly distinguished from superscripts");

  // 4. Fractions & Grouping Preservation
  console.log("\n--- Test 4: Fractions & Grouping Preservation ---");
  const half = normalize("1/2");
  assert(half.includes("one half"), `Expected 'one half', got: '${half}'`);

  const algFrac = normalize("(x + 1)/3");
  assert(algFrac.includes("x plus 1 over 3"), `Expected 'x plus 1 over 3', got: '${algFrac}'`);

  const latexFrac = normalize("\\frac{a + b}{c + d}");
  assert(latexFrac.includes("a plus b over c plus d"), `Expected 'a plus b over c plus d', got: '${latexFrac}'`);
  console.log("✅ [PASS] Fractions and grouping (1/2, (x+1)/3, (a+b)/(c+d)) preserved");

  // 5. Radicals & Roots
  console.log("\n--- Test 5: Radicals & Roots ---");
  const rootX = normalize("√x");
  assert(rootX.includes("square root of x"), `Expected 'square root of x', got: '${rootX}'`);

  const rootComplex = normalize("√(x + 2)");
  assert(rootComplex.includes("square root of x plus 2"), `Expected 'square root of x plus 2', got: '${rootComplex}'`);

  const latexRoot = normalize("\\sqrt{a^2 + b^2}");
  assert(latexRoot.includes("square root of a squared plus b squared"), `Expected 'square root of a squared plus b squared', got: '${latexRoot}'`);
  console.log("✅ [PASS] Roots and radicals (√x, √(x+2), √(a²+b²)) verified");

  // 6. Trigonometric Powers, Logarithms & Greek Symbols
  console.log("\n--- Test 6: Trigonometric Powers, Logarithms & Greek Symbols ---");
  const trig = normalize("sin²θ");
  assert(trig.includes("sine squared theta"), `Expected 'sine squared theta', got: '${trig}'`);

  const log2 = normalize("log₂x");
  assert(log2.includes("log base 2 of x"), `Expected 'log base 2 of x', got: '${log2}'`);

  const deltaX = normalize("Δx");
  assert(deltaX.includes("delta x"), `Expected 'delta x', got: '${deltaX}'`);
  console.log("✅ [PASS] Trigonometric powers (sin²θ), logarithms (log₂x), and Greek symbols (Δx) verified");

  // 7. Full Algebraic Equation with Factored Grouping
  console.log("\n--- Test 7: Full Algebraic Equation & Factored Grouping ---");
  const factored = normalize("(x + 2)(x − 3)");
  assert(factored.includes("open parenthesis x plus 2 close parenthesis times open parenthesis x minus 3 close parenthesis"), `Got: '${factored}'`);

  const fullQuadEq = normalize("2x² + 7x − 6 = 0");
  assert(fullQuadEq.includes("2 x squared plus 7 x minus 6 equals zero"), `Expected '2 x squared plus 7 x minus 6 equals zero', got: '${fullQuadEq}'`);
  console.log("✅ [PASS] Full algebraic equations and factored grouping verified");

  // 8. Physics & Chemistry Expressions
  console.log("\n--- Test 8: Physics & Chemistry Multidisciplinary Expressions ---");
  const physicsKin = normalize("v² = u² + 2as");
  assert(physicsKin.includes("v squared equals u squared plus 2 a s"), `Got: '${physicsKin}'`);

  const chemOrb = normalize("1s² 2s² 2p⁶");
  assert(chemOrb.includes("1 s squared 2 s squared 2 p to the sixth power"), `Got: '${chemOrb}'`);
  console.log("✅ [PASS] Physics and Chemistry expressions verified");

  console.log("\n==========================================================================");
  console.log("🎉 ALL MATHEMATICAL PRONUNCIATION ENGINE INVARIANTS VERIFIED (100% GREEN)!");
  console.log("==========================================================================\n");
}

// Self-execution for CLI runner
runMathematicalPronunciationTests();
