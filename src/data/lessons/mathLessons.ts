import { SkillLesson } from "../../types/curriculum";

export const MATH_LESSONS: Record<string, SkillLesson> = {
  "skill-frac-operations": {
    id: "les-frac-operations",
    title: "Fraction Operations: Adding, Subtracting, Multiplying & Dividing",
    hookAndIntuition: "Imagine slicing a large pizza into 8 slices. 3 slices represent 3/8. If a friend brings another pizza cut into 4 quarters and gives you 1 slice (1/4), how much pizza do you have? You cannot simply add 3 + 1 and 8 + 4; you must cut the pizzas into pieces of equal size—finding a common denominator!",
    conceptualExplanation: "Fractions represent parts of a whole (numerator/denominator). (1) Addition and Subtraction: You can only add or subtract fractions when denominators are identical. Find the Lowest Common Multiple (LCM) of the denominators to create equivalent fractions, add or subtract numerators, and keep the common denominator: a/c + b/c = (a+b)/c. (2) Multiplication: Multiply numerators together and denominators together directly: (a/b) × (c/d) = (ac)/(bd). You may cross-simplify factors before multiplying. (3) Division: Dividing by a fraction is equivalent to multiplying by its reciprocal (flip the second fraction): (a/b) ÷ (c/d) = (a/b) × (d/c) = (ad)/(bc). Always express final answers in lowest terms or as proper mixed numbers.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Lowest Common Denominator (LCD)", definition: "The smallest common multiple of two or more denominators.", practicalExample: "For 1/4 and 1/6, the LCM of 4 and 6 is 12: 3/12 and 2/12." },
      { termOrSymbol: "Reciprocal: (c / d)⁻¹ = d / c", definition: "The multiplicative inverse of a fraction obtained by inverting numerator and denominator.", practicalExample: "The reciprocal of 3/4 is 4/3." },
      { termOrSymbol: "Keep, Change, Flip (KCF)", definition: "Mnemonic rule for fraction division: Keep first fraction, Change ÷ to ×, Flip divisor.", practicalExample: "2/3 ÷ 5/7 = 2/3 × 7/5 = 14/15." }
    ],
    workedExamples: [
      {
        title: "Evaluating Mixed Operations with Unlike Fractions",
        problemStatement: "Evaluate 2 1/3 - 1 3/4 + 5/6, giving your answer as a simplified mixed fraction.",
        steps: [
          { stepNumber: 1, instruction: "Convert mixed numbers to improper fractions.", reasoning: "2 1/3 = (2×3 + 1)/3 = 7/3. 1 3/4 = (1×4 + 3)/4 = 7/4. Expression: 7/3 - 7/4 + 5/6." },
          { stepNumber: 2, instruction: "Find the Lowest Common Denominator (LCD) of 3, 4, and 6.", reasoning: "Multiples of 3: 3, 6, 9, 12... Multiples of 4: 4, 8, 12... Multiples of 6: 6, 12... LCD is 12." },
          { stepNumber: 3, instruction: "Convert each fraction to an equivalent fraction with denominator 12.", reasoning: "7/3 = 28/12; 7/4 = 21/12; 5/6 = 10/12." },
          { stepNumber: 4, instruction: "Combine numerators over the common denominator.", reasoning: "28/12 - 21/12 + 10/12 = (28 - 21 + 10) / 12 = 17/12." },
          { stepNumber: 5, instruction: "Convert improper fraction back to mixed number.", reasoning: "17 ÷ 12 = 1 remainder 5 => 1 5/12." }
        ],
        takeawayRule: "Always convert mixed numbers to improper fractions before applying LCD additions and subtractions."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Adding both numerators and denominators: a/b + c/d = (a+c)/(b+d).", whyItIsWrong: "Adding denominators changes the size of the fractional unit. 1/2 + 1/2 = 2/2 = 1 whole pizza, NOT 2/4 = 1/2 pizza!", correctCorrection: "Never add denominators; find a common denominator first." }
    ],
    guidedPracticePrompt: "Calculate: (3/5) ÷ (9/10) × (3/4).",
    summaryRecap: "Find common denominators for addition/subtraction. Multiply across numerators and denominators. Invert and multiply for division."
  },

  "skill-percent-ratios": {
    id: "les-percent-ratios",
    title: "Percentages, Percentage Change, & Proportional Ratios",
    hookAndIntuition: "A retail shop announces a '20% off sale'. When business booms, they raise the discounted price by 20%. Did the item return to its original price? No! A 20% increase on a smaller base does not cancel a 20% drop. Percentages always depend on the base quantity.",
    conceptualExplanation: "A percentage expresses a dimensionless ratio as a fraction of 100 (% = /100). (1) Percentage of a quantity: P% of X = (P/100) × X. (2) Percentage Change: % Change = ((New - Original) / Original) × 100. If New > Original, it is a percentage increase; if New < Original, it is a percentage decrease (e.g. discount or depreciation). (3) Reverse Percentages: If a price after a 15% VAT tax is ₦13,800, the original pre-tax price was ₦13,800 / (1 + 0.15) = ₦12,000. (4) Ratios: A ratio a : b divides a total sum into (a + b) equal parts, where the first share is (a / (a + b)) × Total.",
    keyTermsAndFormulas: [
      { termOrSymbol: "% Change = (Change / Original) × 100", definition: "Formula for relative percentage increase or decrease relative to initial baseline.", practicalExample: "Salary rises from ₦50,000 to ₦65,000: % Change = (15,000 / 50,000) × 100 = 30%." },
      { termOrSymbol: "Multiplier Method", definition: "Multiplying by (1 + r/100) for increase and (1 - r/100) for decrease.", practicalExample: "A 12% discount uses multiplier (1 - 0.12) = 0.88: ₦500 × 0.88 = ₦440." },
      { termOrSymbol: "Proportional Part = (Ratio Share / Total Parts) × Quantity", definition: "Dividing a quantity into given ratio components.", practicalExample: "Dividing ₦70,000 in ratio 3 : 4: Total parts = 7. Share 1 = (3/7) × 70,000 = ₦30,000." }
    ],
    workedExamples: [
      {
        title: "Calculating Reverse Percentage on Discounted Merchandise",
        problemStatement: "A smartphone is sold for ₦84,000 after a 20% discount was applied during a clearance promotion. What was the original retail price before the discount?",
        steps: [
          { stepNumber: 1, instruction: "Express the discounted price as a percentage of the original.", reasoning: "Original price = 100%. After 20% discount, sale price = 100% - 20% = 80% of original price." },
          { stepNumber: 2, instruction: "Set up the algebraic relationship.", reasoning: "0.80 × Original Price = ₦84,000." },
          { stepNumber: 3, instruction: "Solve for the original price.", reasoning: "Original Price = 84,000 / 0.80 = 840,000 / 8 = ₦105,000." },
          { stepNumber: 4, instruction: "Check your answer.", reasoning: "20% of ₦105,000 = 0.20 × 105,000 = ₦21,000. ₦105,000 - ₦21,000 = ₦84,000. Confirmed!" }
        ],
        takeawayRule: "In reverse percentage problems, never calculate the percentage of the final price; divide by the decimal percentage multiplier."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Trying to find the original price by adding 20% of the sale price.", whyItIsWrong: "20% of ₦84,000 is ₦16,800, giving ₦100,800, which is wrong! The 20% was deducted from the LARGER original price, not the discounted price.", correctCorrection: "Always divide by (1 - discount rate): Original = Sale / (1 - 0.20)." }
    ],
    guidedPracticePrompt: "Three business partners share profit in the ratio 2 : 3 : 5. If the total profit is ₦1,200,000, how much does the largest shareholder receive?",
    summaryRecap: "% Change = (Change / Original) × 100. Use multipliers for fast calculations. In reverse percentages, divide by (1 ± rate)."
  },

  "skill-linear-equations": {
    id: "les-linear-equations",
    title: "Solving Single-Variable Linear Equations & Word Problems",
    hookAndIntuition: "Think of a mechanical balance beam in a market stall: whatever mass you place on or lift from the left pan must be matched identically on the right pan to preserve level equilibrium. Every algebraic step when solving an equation is a reversible equilibrium-preserving operation isolating x.",
    conceptualExplanation: "CORE SYLLABUS (NERDC JSS2–JSS3 / BECE): A linear equation in one unknown x has the canonical form ax + b = c (a ≠ 0). By the Balancing Axioms of Equality, adding/subtracting the same constant or multiplying/dividing by the same non-zero constant preserves the solution set identically. Systematic Programme: (1) Clear grouping brackets using the Distributive Law: a(bx + c) = abx + ac, paying strict attention to negative multipliers: -(x + 1) = -x - 1. (2) Clear all fractional denominators in one clean step by multiplying every term on both sides by the Lowest Common Multiple (LCM) of all denominators. (3) Transpose variable terms to one side and constants to the other using inverse operations. (4) Divide by the coefficient of x to obtain x = (c - b)/a, then back-substitute into the original equation to verify LHS = RHS. ADVANCED ENRICHMENT: When a = 0 and b = c, the identity holds for all real x (infinite solutions); when a = 0 and b ≠ c, the equation is an inconsistent contradiction (zero solutions).",
    conceptualModel: "Reversible Equilibrium Balance Scale: each equation transformation maps x identically forward and backward without altering the root.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Canonical Linear Form: ax + b = c (a ≠ 0)", definition: "First-degree algebraic equation yielding unique root x = (c - b) / a.", practicalExample: "If 5x - 15 = 20, then 5x = 35 and x = 7." },
      { termOrSymbol: "Distributive Axiom: k(u - v) = ku - kv", definition: "Multiplying a signed factor across every inner term inside brackets.", practicalExample: "-4(y - 1) = -4y + 4 (double-negative product is positive)." },
      { termOrSymbol: "Fraction Clearing via LCM", definition: "Multiplying every term by LCM eliminates denominators identically.", practicalExample: "For (2y + 2)/4 - (y - 1)/3 = 2, multiply all terms by LCM(4,3)=12: 3(2y + 2) - 4(y - 1) = 24." }
    ],
    workedExamples: [
      {
        title: "Stroud Frame 1: Clearing Signed Algebraic Fractions via LCM",
        problemStatement: "Solve cleanly and verify by back-substitution: (2y + 2)/4 - (y - 1)/3 = 2.",
        steps: [
          { stepNumber: 1, instruction: "Determine the Lowest Common Multiple (LCM) of all denominators.", reasoning: "The denominators are 4, 3, and 1. Their LCM is 12." },
          { stepNumber: 2, instruction: "Multiply EVERY term across both sides by 12, protecting numerators with brackets.", reasoning: "12 × [(2y + 2)/4] - 12 × [(y - 1)/3] = 12 × 2, which simplifies cleanly to 3(2y + 2) - 4(y - 1) = 24." },
          { stepNumber: 3, instruction: "Apply the distributive law carefully on both brackets.", reasoning: "3(2y + 2) = 6y + 6, and -4(y - 1) = -4y + 4. Thus: 6y + 6 - 4y + 4 = 24." },
          { stepNumber: 4, instruction: "Collect like terms and isolate the unknown y.", reasoning: "2y + 10 = 24 => subtract 10 from both sides => 2y = 14 => divide by 2 => y = 7." },
          { stepNumber: 5, instruction: "Verify LHS = RHS in the original equation.", reasoning: "Substitute y = 7: LHS = (14 + 2)/4 - (7 - 1)/3 = 16/4 - 6/3 = 4 - 2 = 2 = RHS. Verified!" }
        ],
        takeawayRule: "Always enclose compound numerators in brackets before multiplying by the LCM so negative signs distribute safely."
      },
      {
        title: "Stroud Frame 2: Modelling Commercial Utility & Service Tariffs",
        problemStatement: "An Ibadan solar technician charges a flat diagnostic fee of ₦6,000 plus ₦4,500 per hour on site. A clinic pays ₦24,000 in total. Model the linear equation and solve for hours worked (h).",
        steps: [
          { stepNumber: 1, instruction: "Define the unknown and translate words into algebraic terms.", reasoning: "Let h = hours of technical work. Total cost = variable hourly cost + fixed fee = 4500h + 6000." },
          { stepNumber: 2, instruction: "Equate the algebraic model to the invoice amount.", reasoning: "4500h + 6000 = 24000." },
          { stepNumber: 3, instruction: "Subtract the fixed term from both sides.", reasoning: "4500h = 24000 - 6000 => 4500h = 18000." },
          { stepNumber: 4, instruction: "Divide by the hourly rate and interpret.", reasoning: "h = 18000 / 4500 = 4 hours. Check: 4500(4) + 6000 = 18000 + 6000 = 24000." }
        ],
        takeawayRule: "In real-world rate problems, separate fixed flat fees (y-intercept) from variable per-unit rates (gradient)."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Writing -4(y - 1) = -4y - 4 during fraction clearing.", whyItIsWrong: "A negative coefficient multiplied by a negative constant produces a positive product: (-4) × (-1) = +4.", correctCorrection: "Wrap every compound numerator in brackets first and distribute signed factors explicitly." },
      { misconception: "Multiplying fractional terms by the LCM while forgetting to multiply standalone integers on the RHS.", whyItIsWrong: "Equality holds only when EVERY additive term on both sides is scaled by the same LCM.", correctCorrection: "Write 12 × (...) explicitly beside every term, including whole numbers on the RHS." }
    ],
    guidedPracticePrompt: "Solve step-by-step and verify by substitution: 4(2y - 1) - 3(y - 2) = 22.",
    independentPracticePrompt: "Solve: (3x - 1)/5 - (x + 2)/2 = -1, then verify LHS = RHS.",
    diagnosticSelfCheck: "If substituting your solution yields LHS ≠ RHS, trace back line-by-line looking for bracket sign flips.",
    transferApplication: "Calibrating utility tariffs, electrical Ohm's-law circuit branches, and retail profit break-even points across Nigeria.",
    masteryAssessment: "Solve 5 multi-step and fractional linear equations including 1 word model with 100% verified substitution checks.",
    extensionActivity: "Investigate when ax + b = cx + d has zero solutions (parallel) versus infinitely many solutions (identity).",
    summaryRecap: "Clear brackets carefully, scale all terms by the LCM to remove fractions, gather variable terms on one side, divide cleanly, and verify LHS = RHS.",
    estimatedMinutes: 120
  },

  "skill-simultaneous-eq": {
    id: "les-simultaneous-eq",
    title: "Simultaneous Linear Equations: Elimination, Substitution, & Graphing",
    hookAndIntuition: "Suppose two traders visit Kano market: Trader A pays ₦1,200 for 2 books and 3 pens; Trader B pays ₦1,550 for 3 books and 2 pens. Neither receipt reveals the unit price by itself—yet combining both linear relationships uniquely locks in the exact price of one book and one pen!",
    conceptualExplanation: "CORE SYLLABUS (NERDC JSS3 / WAEC / JAMB): A simultaneous linear system a₁x + b₁y = c₁ and a₂x + b₂y = c₂ asks for the single coordinate pair (x, y) satisfying both equations concurrently—geometrically, the intersection point of two straight lines in the Cartesian plane. Three Solution Methods: (1) Elimination Method: Scale one or both equations so the coefficients of one variable have equal magnitude. Add the equations if the signs are opposite, or subtract if the signs are identical, reducing the system to one linear equation in one variable. (2) Substitution Method: Express one variable explicitly from the simpler equation (e.g. x = y + 2) and substitute that expression into the second equation. (3) Graphical Intersection Method: Plot both lines; their intersection (x*, y*) gives the solution. ADVANCED ENRICHMENT (Cramer's Determinant Condition): A 2×2 system has a unique intersection iff Δ = a₁b₂ - a₂b₁ ≠ 0. If Δ = 0, the lines are parallel (inconsistent, 0 solutions) or coincident (dependent, infinitely many solutions).",
    conceptualModel: "Intersecting Straight-Line Geometry: the algebraic solution (x*, y*) is the exact geometric point where both constraints cross.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Elimination Rule (Same Signs -> Subtract; Opposite Signs -> Add)", definition: "Balances a target variable's coefficients across both equations to cancel it cleanly.", practicalExample: "In 4b + 6p = 2400 and 9b + 6p = 4650, coefficients of p match (+6p), so subtract: 5b = 2250." },
      { termOrSymbol: "Substitution Identity", definition: "Isolating one variable as an algebraic expression and inserting it into the companion equation.", practicalExample: "If x - y = 2, then x = y + 2 replaces x in 2x + 3y = 19." },
      { termOrSymbol: "Consistency Condition: a₁/a₂ = b₁/b₂ ≠ c₁/c₂", definition: "Signals parallel lines with identical slope and distinct intercepts (no solution).", practicalExample: "2x - 3y = 7 and 6x - 9y = 15 are parallel and never intersect." }
    ],
    workedExamples: [
      {
        title: "Stroud Frame 1: Elimination Applied to Real Market Pricing",
        problemStatement: "Two books and three pens cost ₦1,200. Three books and two pens cost ₦1,550. Find the exact unit price of one book (b) and one pen (p).",
        steps: [
          { stepNumber: 1, instruction: "Formulate the two simultaneous linear equations.", reasoning: "(1) 2b + 3p = 1200; (2) 3b + 2p = 1550." },
          { stepNumber: 2, instruction: "Equalize the coefficients of p by scaling Eq (1) by 2 and Eq (2) by 3.", reasoning: "Eq (3): 4b + 6p = 2400. Eq (4): 9b + 6p = 4650." },
          { stepNumber: 3, instruction: "Subtract Eq (3) from Eq (4) to eliminate 6p.", reasoning: "(9b - 4b) + (6p - 6p) = 4650 - 2400 => 5b = 2250 => b = ₦450 per book." },
          { stepNumber: 4, instruction: "Back-substitute b = 450 into Eq (1) to solve for p, then verify in Eq (2).", reasoning: "2(450) + 3p = 1200 => 3p = 300 => p = ₦100 per pen. Check in Eq (2): 3(450) + 2(100) = 1350 + 200 = 1550. Confirmed!" }
        ],
        takeawayRule: "Always back-substitute BOTH values into the unused original equation to guarantee arithmetic accuracy."
      },
      {
        title: "Stroud Frame 2: Graphical Intersection via Substitution",
        problemStatement: "Find the intersection point of the lines 2x + 3y = 19 and x - y = 2.",
        steps: [
          { stepNumber: 1, instruction: "Isolate x from the simpler linear constraint.", reasoning: "From x - y = 2, write x = y + 2." },
          { stepNumber: 2, instruction: "Substitute x = y + 2 into 2x + 3y = 19.", reasoning: "2(y + 2) + 3y = 19 => 2y + 4 + 3y = 19." },
          { stepNumber: 3, instruction: "Solve for y.", reasoning: "5y = 15 => y = 3." },
          { stepNumber: 4, instruction: "Determine x and write the intersection coordinate.", reasoning: "x = 3 + 2 = 5. Unique intersection coordinate is (5, 3)." }
        ],
        takeawayRule: "Substitution is fastest whenever one variable already carries coefficient +1 or -1."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Scaling only the left-hand side of an equation when balancing coefficients.", whyItIsWrong: "Multiplying only 3x + 2y without scaling 16 destroys equality and shifts the line off its true locus.", correctCorrection: "Multiply EVERY term across LHS and RHS by the scaling factor." },
      { misconception: "Sign error when subtracting a negative term: writing 2y - (-4y) = -2y.", whyItIsWrong: "Subtracting a negative adds its magnitude: 2y - (-4y) = 2y + 4y = 6y.", correctCorrection: "Write parentheses around subtracted negative expressions before simplifying." }
    ],
    guidedPracticePrompt: "Solve using elimination: 3x + 2y = 16 and 3x - 4y = -2.",
    independentPracticePrompt: "A Lagos ferry carries 140 passengers across standard (₦500) and VIP (₦1,200) cabins, collecting ₦91,000. How many VIP passengers boarded?",
    diagnosticSelfCheck: "Does your ordered pair (x, y) satisfy BOTH original equations simultaneously?",
    transferApplication: "Engineering mesh-current analysis (Kirchhoff's Laws), supply-demand market equilibrium, and chemical mixture balancing.",
    masteryAssessment: "Accurately solve 5 simultaneous systems spanning elimination, substitution, parallel inconsistency, and word modelling.",
    extensionActivity: "Derive Cramer's Rule x = (c₁b₂ - c₂b₁)/(a₁b₂ - a₂b₁) for general 2×2 systems.",
    summaryRecap: "Elimination cancels matched coefficients; substitution replaces an isolated variable; both locate the Cartesian intersection (x*, y*).",
    estimatedMinutes: 120
  },

  "skill-quad-factoring": {
    id: "les-quad-factoring",
    title: "Quadratic Equations: Factoring, Completing the Square, & Quadratic Formula",
    hookAndIntuition: "Kick a football across an Abuja pitch or aim a satellite dish toward geostationary orbit: gravity and optics sculpt every path into a symmetric parabola y = ax² + bx + c. Understanding where that curve meets the ground—its roots—and where it peaks—its vertex—is the heart of quadratic mastery.",
    conceptualExplanation: "CORE SYLLABUS (NERDC SSS / WAEC / NECO / JAMB): A quadratic equation takes the canonical form ax² + bx + c = 0 (a ≠ 0). Three interlocking methods solve any quadratic: (1) Factorization by ac-Splitting: Find integers p, q such that p·q = a·c and p + q = b, split bx = px + qx, factor by grouping, and invoke the Zero-Product Property (AB = 0 => A = 0 or B = 0). (2) Completing the Square (Vertex Form): Rewrite ax² + bx + c as a(x + b/(2a))² - (b² - 4ac)/(4a), exposing the turning vertex (h, k) directly. (3) Universal Quadratic Formula (Stroud Derivation): Divide ax² + bx + c = 0 by a: x² + (b/a)x = -c/a. Add (b/(2a))² to both sides: (x + b/(2a))² = (b² - 4ac)/(4a²). Taking square roots yields x = (-b ± √(b² - 4ac)) / (2a). Discriminant Δ = b² - 4ac classifies roots: Δ > 0 gives two distinct real roots; Δ = 0 gives one repeated real root tangent at vertex; Δ < 0 gives complex conjugate roots with no x-intercept. ADVANCED ENRICHMENT: By Vieta's Formulas, the sum of roots α + β = -b/a and product αβ = c/a.",
    conceptualModel: "Parabolic Symmetry Model: roots sit symmetrically at x = -b/(2a) ± √Δ/(2a) around the vertical axis of symmetry x = -b/(2a).",
    keyTermsAndFormulas: [
      { termOrSymbol: "Quadratic Formula: x = (-b ± √(b² - 4ac)) / (2a)", definition: "Universal closed-form solver derived by completing the square on ax² + bx + c = 0.", practicalExample: "For 2x² + 5x - 12 = 0: x = (-5 ± √(25 + 96))/4 = (-5 ± 11)/4 => x = 3/2 or -4." },
      { termOrSymbol: "Discriminant: Δ = b² - 4ac", definition: "Governs root reality and parabolic x-axis intersections.", practicalExample: "Δ = 0 implies the parabola touches the x-axis at exactly one tangent vertex." },
      { termOrSymbol: "Vertex Form: a(x - h)² + k", definition: "Exposes axis of symmetry x = h = -b/(2a) and extremum value k directly.", practicalExample: "x² - 6x + 5 = (x - 3)² - 4 has minimum vertex (3, -4)." }
    ],
    workedExamples: [
      {
        title: "Stroud Frame 1: Deriving Roots by Completing the Square & Checking Vertex",
        problemStatement: "Express y = x² - 4x + 3 in completed-square vertex form, locate its vertex, axis of symmetry, and both x-intercepts.",
        steps: [
          { stepNumber: 1, instruction: "Group the quadratic and linear x terms.", reasoning: "y = (x² - 4x) + 3." },
          { stepNumber: 2, instruction: "Take half the coefficient of x (-4/2 = -2), square it ((-2)² = 4), and add/subtract 4.", reasoning: "y = (x² - 4x + 4) - 4 + 3 = (x - 2)² - 1." },
          { stepNumber: 3, instruction: "Read the vertex and axis of symmetry directly.", reasoning: "Since (x - 2)² >= 0, the minimum value is y = -1 at x = 2. Vertex = (2, -1); axis of symmetry x = 2." },
          { stepNumber: 4, instruction: "Set y = 0 to solve for the real roots.", reasoning: "(x - 2)² - 1 = 0 => (x - 2)² = 1 => x - 2 = ±1 => x = 3 or x = 1. Roots: (1, 0) and (3, 0)." }
        ],
        takeawayRule: "Completing the square simultaneously reveals the extremum vertex (h, k) AND solves for both roots cleanly."
      },
      {
        title: "Stroud Frame 2: Non-Monic Factorization & Discriminant Classification",
        problemStatement: "Solve 2x² + 5x - 12 = 0 by ac-splitting, then test Δ = b² - 4ac on 3x² - 4x + 5 = 0.",
        steps: [
          { stepNumber: 1, instruction: "Compute product ac and target sum b for 2x² + 5x - 12 = 0.", reasoning: "ac = 2 × (-12) = -24; b = +5. Factor pair summing to +5 is +8 and -3." },
          { stepNumber: 2, instruction: "Split middle term and factor in pairs.", reasoning: "2x² + 8x - 3x - 12 = 2x(x + 4) - 3(x + 4) = (2x - 3)(x + 4) = 0." },
          { stepNumber: 3, instruction: "Apply Zero-Product Property.", reasoning: "2x - 3 = 0 => x = 3/2, or x + 4 = 0 => x = -4." },
          { stepNumber: 4, instruction: "Compute discriminant Δ for 3x² - 4x + 5 = 0.", reasoning: "Δ = (-4)² - 4(3)(5) = 16 - 60 = -44 < 0, proving no real roots exist." }
        ],
        takeawayRule: "Always check signs when solving linear factors: (px - q) = 0 gives +q/p."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Canceling variable x from both sides of x² = 5x to conclude x = 5.", whyItIsWrong: "Dividing by x silently discards the valid root x = 0.", correctCorrection: "Move all terms to one side and factor: x(x - 5) = 0 => x = 0 or x = 5." },
      { misconception: "Writing the vertex of y = (x - 3)² - 4 as (-3, -4).", whyItIsWrong: "The squared bracket vanishes when x - 3 = 0, which occurs at x = +3.", correctCorrection: "Flip the sign inside (x - h) to read h: vertex is (+3, -4)." }
    ],
    guidedPracticePrompt: "Complete the square on y = x² - 6x + 5 to find its vertex and roots.",
    independentPracticePrompt: "Find k > 0 such that x² + kx + 16 = 0 has exactly one repeated root, and solve for that root.",
    diagnosticSelfCheck: "Can you derive x = (-b ± √(b² - 4ac)) / (2a) from ax² + bx + c = 0 from scratch without looking at notes?",
    transferApplication: "Optimizing projectile trajectories, structural parabolic arch spans, and business revenue-maximization curves.",
    masteryAssessment: "Factor non-monic quadratics, complete the square to locate vertices, and classify discriminants across 5 WAEC/JAMB items.",
    extensionActivity: "Express the sum and product of roots of 2x² - 7x + 4 = 0 without solving for the roots explicitly (Vieta's formulas).",
    summaryRecap: "Quadratics solve via ac-factoring, completing the square a(x - h)² + k, or formula (-b ± √Δ)/(2a), with Δ classifying real vs complex roots.",
    estimatedMinutes: 145
  },

  "skill-sine-cosine-rule": {
    id: "les-sine-cosine-rule",
    title: "Trigonometry: Sine Rule, Cosine Rule, & 3D Bearings",
    hookAndIntuition: "How do maritime captains navigate across vast open oceans, or civil engineers measure the height of a mountain without climbing it? Trigonometry extends right-angle triangle ratios to any arbitrary triangle on Earth using the Sine and Cosine Rules.",
    conceptualExplanation: "CORE SYLLABUS (NERDC SSS / WAEC / NECO / JAMB): For any general triangle ABC with side lengths a, b, c opposite interior angles A, B, C: (1) The Sine Rule: a / sin A = b / sin B = c / sin C = 2R (where R is the circumradius). Select Sine Rule when given two angles and one side (AAS/ASA) or two sides and a non-included angle (SSA—checking for an obtuse supplement when sin B < 1). (2) The Cosine Rule: c² = a² + b² - 2ab cos C (reducing to Pythagoras when C = 90°). Rearranged for finding angles from three sides: cos C = (a² + b² - c²) / (2ab). Select Cosine Rule when given two sides and their included angle (SAS) or all three sides (SSS). (3) Trigonometric Triangle Area: Area = (1/2)ab sin C. (4) Three-Figure Navigational Bearings: Bearings are always measured clockwise from True North (000° to 360°) using three digits. Back Bearing rule: if forward bearing θ < 180°, Back Bearing = θ + 180°; if θ >= 180°, Back Bearing = θ - 180°.",
    conceptualModel: "Triangle Solver Decision Tree: SAS / SSS -> Cosine Rule; ASA / AAS / SSA -> Sine Rule; Area -> 0.5 ab sin C; North-Line Parallelism -> Bearings.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Sine Rule: a / sin A = b / sin B = c / sin C", definition: "Ratio of any side length to the sine of its opposite interior angle is invariant in a triangle.", practicalExample: "If A = 30°, B = 45°, a = 10 cm: b = 10 × (sin 45° / sin 30°) = 10√2 ≈ 14.14 cm." },
      { termOrSymbol: "Cosine Rule: c² = a² + b² - 2ab cos C", definition: "Solves triangles with two sides and included angle (SAS) or three sides (SSS).", practicalExample: "If a = 5, b = 8, C = 60°: c² = 25 + 64 - 2(5)(8)(0.5) = 89 - 40 = 49 => c = 7." },
      { termOrSymbol: "Three-Figure Bearings", definition: "Direction measured clockwise from True North (000°–360°) using three digits.", practicalExample: "Forward bearing 060° gives back bearing 060° + 180° = 240°." }
    ],
    workedExamples: [
      {
        title: "Worked Analysis 1: Applying the Cosine Rule to a Bearing Triangle",
        problemStatement: "A ship sails 12 km from port P on a bearing of 060° to point Q, then turns and sails 18 km on a bearing of 150° to point R. Find the direct straight-line distance from port P to point R.",
        steps: [
          { stepNumber: 1, instruction: "Draw North lines at P and Q to determine the interior angle ∠PQR.", reasoning: "Back-bearing from Q to P is 060° + 180° = 240°. Forward bearing from Q to R is 150°. Interior angle ∠PQR = 240° - 150° = 90°." },
          { stepNumber: 2, instruction: "Identify the triangle known configuration.", reasoning: "In triangle PQR we know two sides (PQ = 12 km, QR = 18 km) and their included angle (90°): SAS case." },
          { stepNumber: 3, instruction: "Apply the Cosine Rule for PR.", reasoning: "PR² = 12² + 18² - 2(12)(18) cos 90° = 144 + 324 - 0 = 468." },
          { stepNumber: 4, instruction: "Extract the positive square root.", reasoning: "PR = √468 = 6√13 ≈ 21.63 km." }
        ],
        takeawayRule: "Draw vertical North lines at every turning point; parallel North lines give alternate and co-interior angles that unlock the triangle's interior angles."
      },
      {
        title: "Worked Analysis 2: Using the Sine Rule for AAS Triangles",
        problemStatement: "In triangle PQR, ∠P = 30°, ∠Q = 45°, and side p = 10 cm opposite ∠P. Find the exact length of side q opposite ∠Q.",
        steps: [
          { stepNumber: 1, instruction: "Verify the given data configuration.", reasoning: "We have two angles (30°, 45°) and one opposite side (p = 10 cm): AAS case -> use Sine Rule." },
          { stepNumber: 2, instruction: "Write the Sine Rule proportion linking p and q.", reasoning: "q / sin Q = p / sin P => q / sin 45° = 10 / sin 30°." },
          { stepNumber: 3, instruction: "Substitute exact special-angle values.", reasoning: "sin 45° = √2 / 2 and sin 30° = 1 / 2." },
          { stepNumber: 4, instruction: "Solve algebraically for q.", reasoning: "q = 10 × (√2 / 2) / (1 / 2) = 10√2 ≈ 14.14 cm." }
        ],
        takeawayRule: "Keep special angles (30°, 45°, 60°) in exact surd form until the final rounding step to preserve WAEC/JAMB precision."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Applying the Sine Rule directly to SAS (two sides and the included angle).", whyItIsWrong: "In SAS, no angle is paired with a known opposite side, leaving two unknowns in every Sine Rule fraction.", correctCorrection: "Always use the Cosine Rule first for SAS or SSS." },
      { misconception: "Finding a back bearing by subtracting from 180° (e.g., 180° - 060° = 120°).", whyItIsWrong: "Reversing a vector rotates its direction by a straight angle (+180° or -180°), never taking a supplement.", correctCorrection: "Add 180° when forward bearing < 180°; subtract 180° when forward bearing >= 180°." }
    ],
    guidedPracticePrompt: "Calculate the exact area of a triangle with sides a = 10 cm, b = 12 cm, and included angle C = 30°.",
    independentPracticePrompt: "A surveyor walks 5 km on a bearing of 040° then 8 km on a bearing of 160°. Sketch both North lines, prove the included angle is 60°, and compute the closing distance.",
    diagnosticSelfCheck: "Before touching your calculator, can you classify whether a given triangle problem is SAS, SSS, ASA, or SSA?",
    transferApplication: "Maritime dead-reckoning, civil land surveying, structural roof-truss engineering, and aviation crosswind navigation.",
    masteryAssessment: "Achieve >= 85% across 5 tiered trigonometry and bearing problems covering Cosine Rule, Sine Rule, area, and three-figure navigation.",
    extensionActivity: "Investigate the ambiguous SSA case: when a < b sin A (0 triangles), a = b sin A (1 right triangle), and b sin A < a < b (2 valid triangles).",
    summaryRecap: "Cosine Rule solves SAS and SSS; Sine Rule solves AAS/ASA/SSA; Area = 0.5 ab sin C; Bearings measure clockwise from True North.",
    estimatedMinutes: 130
  },

  "skill-logarithms": {
    id: "les-logarithms",
    title: "Laws of Indices, Logarithms, & Change of Base",
    hookAndIntuition: "How does the Richter scale measure earthquake tremors, or the decibel scale measure sound? A magnitude 7 earthquake is not one-sixth stronger than magnitude 6—it carries 10 times the wave amplitude! Logarithms convert multiplicative leaps into manageable linear addition.",
    conceptualExplanation: "CORE SYLLABUS (NERDC SSS / WAEC / NECO / JAMB): A logarithm is the exact inverse of exponentiation: b^y = x <=> log_b(x) = y (for base b > 0, b ≠ 1, and strictly positive argument x > 0). Five Fundamental Laws: (1) Product Law: log_b(xy) = log_b(x) + log_b(y). (2) Quotient Law: log_b(x/y) = log_b(x) - log_b(y). (3) Power Law: log_b(x^k) = k · log_b(x). (4) Identity Laws: log_b(b) = 1 and log_b(1) = 0. (5) Change of Base Formula: log_b(a) = log_c(a) / log_c(b). Laws of Indices: x^a · x^b = x^(a+b), x^a / x^b = x^(a-b), (x^a)^b = x^(ab), x^0 = 1, x^(-a) = 1/x^a, and fractional exponent x^(m/n) = (ⁿ√x)^m. Always check logarithmic solutions against the strict domain requirement x > 0 to reject extraneous roots.",
    conceptualModel: "Exponent-Logarithm Isomorphism: Multiplication in argument space <==> Addition in logarithm space; Exponentiation <==> Scalar Scaling.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Product & Quotient Laws: log(xy) = log x + log y; log(x/y) = log x - log y", definition: "Transforms products into sums and quotients into differences under the same base.", practicalExample: "log₂(80) - log₂(5) = log₂(80/5) = log₂(16) = 4." },
      { termOrSymbol: "Power Law: log_b(x^k) = k · log_b(x)", definition: "Brings exponents down as multipliers, unlocking exponential equations.", practicalExample: "2^x = 50 => x = log(50) / log(2) ≈ 5.64." },
      { termOrSymbol: "Fractional & Negative Indices: x^(-m/n) = 1 / (ⁿ√x)^m", definition: "Denominator specifies root order; numerator specifies power; minus takes reciprocal.", practicalExample: "27^(2/3) × 4^(-1/2) = 3² × (1/2) = 4.5." }
    ],
    workedExamples: [
      {
        title: "Worked Analysis 1: Solving an Exponential Equation Using Base Equivalence & Logarithms",
        problemStatement: "Solve for x: 3^(2x - 1) = 45 (give answer to 3 significant figures), and verify with an exact integer-power case 3^(2x - 1) = 27.",
        steps: [
          { stepNumber: 1, instruction: "Take the common logarithm (base 10) of both sides of 3^(2x - 1) = 45.", reasoning: "log₁₀(3^(2x - 1)) = log₁₀(45)." },
          { stepNumber: 2, instruction: "Apply the Power Law to extract the linear exponent.", reasoning: "(2x - 1) · log₁₀(3) = log₁₀(45)." },
          { stepNumber: 3, instruction: "Divide by log₁₀(3).", reasoning: "2x - 1 = 1.6532 / 0.4771 = 3.465." },
          { stepNumber: 4, instruction: "Isolate x and verify exact integer-power intuition.", reasoning: "2x = 4.465 => x ≈ 2.23 (3 s.f.). When RHS = 27 = 3³, equating powers directly gives 2x - 1 = 3 => x = 2." }
        ],
        takeawayRule: "Convert to common prime bases when possible; otherwise take logarithms of both sides and apply the Power Law."
      },
      {
        title: "Worked Analysis 2: Solving a Logarithmic Equation & Screening Extraneous Roots",
        problemStatement: "Solve for x: log₃(x + 2) + log₃(x) = 1.",
        steps: [
          { stepNumber: 1, instruction: "Combine left-hand logarithms via the Product Law.", reasoning: "log₃[x(x + 2)] = 1." },
          { stepNumber: 2, instruction: "Convert from logarithmic form to exponential form.", reasoning: "x(x + 2) = 3¹ => x² + 2x - 3 = 0." },
          { stepNumber: 3, instruction: "Factor the resulting quadratic equation.", reasoning: "(x + 3)(x - 1) = 0 => x = 1 or x = -3." },
          { stepNumber: 4, instruction: "Test both roots against log domain x > 0.", reasoning: "At x = -3, log₃(-3) is undefined over the reals (extraneous). At x = 1, log₃(3) + log₃(1) = 1 + 0 = 1. Unique valid root: x = 1." }
        ],
        takeawayRule: "Always substitute candidate roots back into the original log expressions to reject negative or zero arguments."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Expanding log(x + y) as log(x) + log(y).", whyItIsWrong: "Logarithms never distribute over addition! Only log(x · y) equals log(x) + log(y).", correctCorrection: "Use the Product Law solely on products: log(xy) = log x + log y." },
      { misconception: "Keeping negative algebraic roots inside logarithmic equations without checking domains.", whyItIsWrong: "In real arithmetic, log_b(u) exists only when u > 0.", correctCorrection: "Verify every candidate root satisfies all original argument inequalities." }
    ],
    guidedPracticePrompt: "Given log₁₀(2) ≈ 0.3010 and log₁₀(3) ≈ 0.4771, compute log₁₀(18) without a calculator.",
    independentPracticePrompt: "Simplify 64^(2/3) × 16^(-1/2) completely without a calculator, then solve log₂(x) + log₂(x - 2) = 3.",
    diagnosticSelfCheck: "Can you move seamlessly between b^y = x and log_b(x) = y, simplify fractional negative indices, and screen extraneous log roots?",
    transferApplication: "Richter earthquake scaling, acoustic decibel engineering, chemical pH acidity calculations, and compound growth half-life analysis.",
    masteryAssessment: "Achieve >= 85% across 5 indices and logarithm items spanning laws, fractional powers, numerical evaluation, and domain-checked equations.",
    extensionActivity: "Derive the Change-of-Base theorem log_b(a) = log_c(a) / log_c(b) from the substitution y = log_b(a) <=> b^y = a.",
    summaryRecap: "b^y = x <=> log_b(x) = y. Product -> sum, Quotient -> difference, Exponent -> multiplier. Always reject non-positive log arguments.",
    estimatedMinutes: 120
  },

  "skill-arithmetic-progression": {
    id: "les-arithmetic-progression",
    title: "Arithmetic (AP) & Geometric (GP) Sequences and Series",
    hookAndIntuition: "Save ₦1,000 in week 1, ₦1,500 in week 2, ₦2,000 in week 3—or double an investment every cycle. How do you compute the 52nd term and total accumulated wealth without tedious manual addition? Arithmetic and geometric progressions yield exact closed-form laws.",
    conceptualExplanation: "CORE SYLLABUS (NERDC SSS / WAEC / NECO / JAMB): (1) Arithmetic Progression (AP): Consecutive terms differ by a constant common difference d = T_k - T_(k-1). General n-th term: T_n = a + (n - 1)d (first term a). Partial sum of first n terms: S_n = (n/2)[2a + (n - 1)d] = (n/2)(a + l) where l = T_n. Arithmetic mean of x and y is (x + y)/2. (2) Geometric Progression (GP): Consecutive terms multiply by a constant common ratio r = T_k / T_(k-1). General n-th term: T_n = a · r^(n - 1). Partial sum: S_n = a(r^n - 1)/(r - 1) for r ≠ 1 (or a(1 - r^n)/(1 - r)). Geometric mean of positive x, y is √(xy). (3) Infinite Convergence: Only when |r| < 1 (-1 < r < 1) does r^n -> 0 as n -> ∞, yielding Sum to Infinity S_∞ = a / (1 - r).",
    conceptualModel: "Discrete Dynamics Contrast: AP grows linearly by constant additive step +d; GP grows exponentially by constant multiplicative factor ×r.",
    keyTermsAndFormulas: [
      { termOrSymbol: "AP Terms & Sums: T_n = a + (n-1)d; S_n = (n/2)[2a + (n-1)d]", definition: "Closed-form formulas for linear sequences with common difference d.", practicalExample: "For 3, 7, 11... (a=3, d=4): S₂₀ = 10[6 + 19(4)] = 820." },
      { termOrSymbol: "GP Terms & Finite Sums: T_n = a r^(n-1); S_n = a(r^n - 1)/(r - 1)", definition: "Closed-form formulas for exponential sequences with common ratio r ≠ 1.", practicalExample: "a=3, r=2, S_n=189 => 3(2^n - 1) = 189 => 2^n = 64 => n = 6." },
      { termOrSymbol: "GP Sum to Infinity: S_∞ = a / (1 - r)", definition: "Convergent infinite geometric series limit valid strictly when -1 < r < 1.", practicalExample: "a=64, r=1/2 => S_∞ = 64 / 0.5 = 128." }
    ],
    workedExamples: [
      {
        title: "Worked Analysis 1: Reconstructing an AP from Two Known Terms",
        problemStatement: "The 4th term of an Arithmetic Progression is 18 and the 9th term is 38. Find: (a) a and d, (b) T₂₀, and (c) S₂₀.",
        steps: [
          { stepNumber: 1, instruction: "Translate T₄ and T₉ into linear equations using T_n = a + (n - 1)d.", reasoning: "T₄ = a + 3d = 18 (Eq 1) and T₉ = a + 8d = 38 (Eq 2)." },
          { stepNumber: 2, instruction: "Subtract Eq 1 from Eq 2 to eliminate a.", reasoning: "5d = 38 - 18 = 20 => d = 4." },
          { stepNumber: 3, instruction: "Back-substitute d = 4 into Eq 1.", reasoning: "a + 12 = 18 => a = 6." },
          { stepNumber: 4, instruction: "Compute T₂₀ and S₂₀.", reasoning: "T₂₀ = 6 + 19(4) = 82. S₂₀ = (20/2)(6 + 82) = 10 × 88 = 880." }
        ],
        takeawayRule: "The difference T_p - T_q in any AP equals (p - q)d, immediately isolating d."
      },
      {
        title: "Worked Analysis 2: Solving for Term Count n in a Finite GP Series",
        problemStatement: "In a Geometric Progression with first term a = 3 and common ratio r = 2, how many terms are needed for the partial sum S_n to reach 189?",
        steps: [
          { stepNumber: 1, instruction: "Write the GP partial sum formula for r > 1.", reasoning: "S_n = a(r^n - 1) / (r - 1)." },
          { stepNumber: 2, instruction: "Substitute S_n = 189, a = 3, r = 2.", reasoning: "189 = 3(2^n - 1) / (2 - 1) = 3(2^n - 1)." },
          { stepNumber: 3, instruction: "Divide by 3 and add 1.", reasoning: "2^n - 1 = 63 => 2^n = 64." },
          { stepNumber: 4, instruction: "Match exponential powers and verify by listing terms.", reasoning: "Since 64 = 2⁶, n = 6. Check: 3 + 6 + 12 + 24 + 48 + 96 = 189." }
        ],
        takeawayRule: "Use index matching or logarithms when the unknown n sits in the exponent of a GP sum."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Using T_n = a + nd instead of a + (n - 1)d.", whyItIsWrong: "The first term a already occupies index 1 with zero steps added, so the n-th term takes (n - 1) steps.", correctCorrection: "Verify at n = 1: a + (1 - 1)d = a." },
      { misconception: "Applying S_∞ = a / (1 - r) when |r| >= 1.", whyItIsWrong: "If r = 2, terms explode without bound and the series diverges; the formula returns a nonsensical negative value.", correctCorrection: "Confirm -1 < r < 1 before evaluating an infinite sum." }
    ],
    guidedPracticePrompt: "The 3rd term of an AP is 14 and the 8th term is 39. Find the first term a and common difference d.",
    independentPracticePrompt: "A ball rebounds to 3/4 of its previous height on each bounce after dropping from 16 meters. Compute the total vertical distance traveled (down + up after first drop).",
    diagnosticSelfCheck: "Can you distinguish additive AP differences from multiplicative GP ratios and verify |r| < 1 before summing to infinity?",
    transferApplication: "Sinking-fund annuity schedules, compound loan amortization, radioactive decay modeling, and recursive algorithm complexity.",
    masteryAssessment: "Achieve >= 85% across 5 AP/GP items covering n-th terms, partial sums, two-term reconstruction, and convergent infinite series.",
    extensionActivity: "Prove Gauss's pairing method for S_n = (n/2)(a + l) by writing the AP sum forward and backward and adding termwise.",
    summaryRecap: "AP: T_n = a + (n-1)d, S_n = (n/2)[2a + (n-1)d]. GP: T_n = ar^(n-1), S_n = a(r^n - 1)/(r - 1), S_∞ = a/(1 - r) iff |r| < 1.",
    estimatedMinutes: 120
  },

  "skill-line-gradients": {
    id: "les-line-gradients",
    title: "Coordinate Geometry: Gradients, Midpoints, & Linear Equations",
    hookAndIntuition: "Look at a mountain highway marked '12% incline' or a civil engineer grading a drainage pipe. Coordinate geometry turns geometric lines, right angles, and distances into exact algebraic equations on the Cartesian plane.",
    conceptualExplanation: "CORE SYLLABUS (NERDC SSS / WAEC / NECO / JAMB): Given points A(x₁, y₁) and B(x₂, y₂) on the Cartesian plane: (1) Euclidean Distance: d = √[(x₂ - x₁)² + (y₂ - y₁)²]. (2) Midpoint M: M = ((x₁ + x₂)/2, (y₁ + y₂)/2). (3) Gradient / Slope m: m = Δy / Δx = (y₂ - y₁) / (x₂ - x₁) = tan θ (inclination angle θ to positive x-axis). Horizontal lines have m = 0; vertical lines have undefined gradient. (4) Parallel & Perpendicular Conditions: Non-vertical lines are parallel iff m₁ = m₂; they are perpendicular (90°) iff m₁ · m₂ = -1 (m₂ = -1/m₁). (5) Line Equations: Slope-intercept y = mx + c, Point-slope y - y₁ = m(x - x₁), and General form ax + by + c = 0. A perpendicular bisector of AB passes through Midpoint M with gradient -1/m_AB.",
    conceptualModel: "Cartesian Vector-Algebra Bridge: Every geometric line relationship (parallel, orthogonal, bisector) maps cleanly to an algebraic invariant on gradient m and midpoint M.",
    keyTermsAndFormulas: [
      { termOrSymbol: "m = (y₂ - y₁) / (x₂ - x₁)", definition: "Gradient measuring vertical rise per unit horizontal run.", practicalExample: "Through (2, 4) and (6, 12): m = (12 - 4)/(6 - 2) = 2." },
      { termOrSymbol: "Distance d = √[(Δx)² + (Δy)²] | Midpoint M = ((x₁+x₂)/2, (y₁+y₂)/2)", definition: "Metric length and exact center coordinates of a segment.", practicalExample: "Midpoint of (-4, 7) and (10, -3) is (3, 2)." },
      { termOrSymbol: "Perpendicularity: m₁ · m₂ = -1", definition: "Two non-axis lines meet at 90° iff their slopes are negative reciprocals.", practicalExample: "Perpendicular to m = 1/2 has m_perp = -2." }
    ],
    workedExamples: [
      {
        title: "Worked Analysis 1: Deriving a Perpendicular Bisector in Standard Form",
        problemStatement: "Find the equation of the perpendicular bisector of the line segment joining A(2, 4) and B(6, 12).",
        steps: [
          { stepNumber: 1, instruction: "Compute the midpoint M of segment AB.", reasoning: "M = ((2 + 6)/2, (4 + 12)/2) = (4, 8)." },
          { stepNumber: 2, instruction: "Compute gradient m_AB of segment AB.", reasoning: "m_AB = (12 - 4)/(6 - 2) = 8/4 = 2." },
          { stepNumber: 3, instruction: "Take the negative reciprocal for perpendicular gradient.", reasoning: "m_perp = -1 / 2." },
          { stepNumber: 4, instruction: "Apply point-slope through M(4, 8) and clear fractions.", reasoning: "y - 8 = (-1/2)(x - 4) => 2y - 16 = -x + 4 => x + 2y - 20 = 0." }
        ],
        takeawayRule: "Every perpendicular bisector needs two ingredients: the Midpoint M and the negative reciprocal slope -1/m_AB."
      },
      {
        title: "Worked Analysis 2: Extracting Parallel Line Equations from General Form",
        problemStatement: "Find the equation of the straight line passing through P(2, 5) that is parallel to 3x - y = 7.",
        steps: [
          { stepNumber: 1, instruction: "Convert 3x - y = 7 to slope-intercept form y = mx + c.", reasoning: "y = 3x - 7, so its gradient is m = 3." },
          { stepNumber: 2, instruction: "Apply the parallel gradient invariant.", reasoning: "A parallel line keeps identical gradient m = 3." },
          { stepNumber: 3, instruction: "Substitute m = 3 and point (2, 5) into point-slope form.", reasoning: "y - 5 = 3(x - 2) => y = 3x - 6 + 5 => y = 3x - 1." },
          { stepNumber: 4, instruction: "Verify point membership.", reasoning: "At x = 2: y = 3(2) - 1 = 5 (confirmed)." }
        ],
        takeawayRule: "Rearrange general form ax + by = k into y = (-a/b)x + k/b before reading off the gradient."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Reversing coordinate subtraction order between numerator and denominator: (y₂ - y₁)/(x₁ - x₂).", whyItIsWrong: "Flipping the subtraction order in only one coordinate negates the gradient sign.", correctCorrection: "Keep consistent point order: (y₂ - y₁)/(x₂ - x₁)." },
      { misconception: "Treating a negative reciprocal as just a reciprocal (1/m) or just a negative (-m).", whyItIsWrong: "Perpendicular slopes require BOTH negation and inversion: m₂ = -1/m₁.", correctCorrection: "Check product m₁ · m₂ = -1 every time." }
    ],
    guidedPracticePrompt: "Find the midpoint of P(-4, 7) and Q(10, -3), and calculate the distance between A(2, -3) and B(6, 1).",
    independentPracticePrompt: "Determine the equation of the perpendicular bisector of the segment joining A(1, 2) and B(5, 10) in ax + by = c form.",
    diagnosticSelfCheck: "Can you read a gradient immediately from 2x - 4y = 8 and compute its perpendicular negative reciprocal without sign errors?",
    transferApplication: "CAD drafting, robotics path planning, linear regression trendlines, and GIS road gradient surveying.",
    masteryAssessment: "Achieve >= 85% across 5 coordinate geometry problems covering distance, midpoint, parallel lines, and perpendicular bisectors.",
    extensionActivity: "Show using congruent right triangles on the coordinate grid why rotating a slope vector (dx, dy) by +90° gives (-dy, dx), proving m₁m₂ = -1.",
    summaryRecap: "d = √((Δx)² + (Δy)²); M = ((x₁+x₂)/2, (y₁+y₂)/2); m = Δy/Δx. Parallel: m₁ = m₂; Perpendicular: m₁m₂ = -1.",
    estimatedMinutes: 115
  },

  "skill-circle-theorems": {
    id: "les-circle-theorems",
    title: "Circle Theorems, Subtended Angles, & Cyclic Quadrilaterals",
    hookAndIntuition: "Why does every seat along a circular stadium tier share the exact same viewing angle of the pitch? Classical Euclidean geometry proves that angles subtended by a fixed chord anywhere in the same circular segment are strictly invariant.",
    conceptualExplanation: "CORE SYLLABUS (NERDC SSS / WAEC / NECO / JAMB): Seven Essential Circle Theorems: (1) Angle at Center Theorem: Angle subtended by an arc at center O is twice the angle subtended at any point on the remaining circumference (∠AOB = 2∠ACB). (2) Angle in a Semicircle: Any angle subtended by a diameter at the circumference equals 90°. (3) Angles in the Same Segment: Angles subtended by the same chord in the same arc segment are equal. (4) Cyclic Quadrilateral Theorem: Opposite angles of a quadrilateral with all four vertices on a circle sum to 180° (A + C = 180°); an exterior angle equals the opposite interior angle. (5) Tangent-Radius Perpendicularity: A tangent meets the radius at the point of tangency at 90°, forming right triangles with external center segments OP. (6) Equal Tangents from an External Point: Two tangents drawn from an external point P to points T₁, T₂ satisfy PT₁ = PT₂. (7) Alternate Segment Theorem: The angle between a tangent and a chord through the contact point equals any angle subtended by that chord in the alternate segment.",
    conceptualModel: "Circular Angle Invariants: Track which chord/arc generates an angle, whether vertices touch center O vs circumference, and whether tangents introduce 90° radii.",
    keyTermsAndFormulas: [
      { termOrSymbol: "∠Center = 2 × ∠Circumference", definition: "Central angle is double any circumference angle standing on the same arc.", practicalExample: "Arc subtending 110° at center subtends 55° at the major circumference." },
      { termOrSymbol: "Cyclic Quadrilateral: A + C = 180°", definition: "Opposite vertices of an inscribed four-sided polygon are supplementary.", practicalExample: "If ∠A = (3x+10)° and opposite ∠C = (2x+20)°, 5x + 30 = 180 => x = 30°." },
      { termOrSymbol: "Tangent-Radius (90°) & Alternate Segment Theorem", definition: "Radius ⊥ tangent at contact; tangent-chord angle equals angle in opposite segment.", practicalExample: "With radius 5 cm and center-external distance 13 cm, tangent length = √(13² - 5²) = 12 cm." }
    ],
    workedExamples: [
      {
        title: "Worked Analysis 1: Combining Angle at Center and Cyclic Quadrilateral Theorems",
        problemStatement: "In a circle with center O, points A, B, C, D lie sequentially on the circumference. If reflex/minor central angle ∠AOC = 140° (on the minor arc side facing B), find: (a) ∠ADC and (b) ∠ABC.",
        steps: [
          { stepNumber: 1, instruction: "Apply the Angle at Center theorem for point D on the major arc.", reasoning: "Minor arc AC subtends 140° at center O and ∠ADC on the major circumference: ∠ADC = 140° / 2 = 70°." },
          { stepNumber: 2, instruction: "Identify cyclic quadrilateral ABCD.", reasoning: "All four vertices A, B, C, D lie directly on the circle's circumference." },
          { stepNumber: 3, instruction: "Apply the supplementary opposite-angle rule.", reasoning: "∠ABC + ∠ADC = 180° => ∠ABC = 180° - 70° = 110°." },
          { stepNumber: 4, instruction: "Cross-check via reflex angle at center.", reasoning: "Reflex ∠AOC = 360° - 140° = 220°; half of 220° = 110° = ∠ABC (verified)." }
        ],
        takeawayRule: "Always identify whether an angle faces the minor or major arc before halving the central angle."
      },
      {
        title: "Worked Analysis 2: Tangent-Radius Right Triangle & Alternate Segment Theorem",
        problemStatement: "From external point P, tangent PT touches a circle of center O and radius OT = 5 cm at T. Given OP = 13 cm, find PT. Also, if chord AB meets tangent AT at 62°, find ∠ACB in the alternate segment.",
        steps: [
          { stepNumber: 1, instruction: "Establish right angle at tangency point T.", reasoning: "By Tangent-Radius theorem, OT ⊥ PT, so ∠OTP = 90°." },
          { stepNumber: 2, instruction: "Apply Pythagoras with hypotenuse OP = 13 cm.", reasoning: "PT² + OT² = OP² => PT² = 13² - 5² = 169 - 25 = 144." },
          { stepNumber: 3, instruction: "Take the positive length.", reasoning: "PT = √144 = 12 cm." },
          { stepNumber: 4, instruction: "Apply Alternate Segment theorem to chord AB.", reasoning: "The angle ∠ACB subtended by chord AB in the alternate segment equals tangent-chord angle ∠TAB = 62°." }
        ],
        takeawayRule: "In tangent-distance problems, the center-to-external segment OP is always the hypotenuse because the 90° angle sits at the tangent contact point."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Treating a quadrilateral with one vertex at center O (like AOCB) as a cyclic quadrilateral.", whyItIsWrong: "A quadrilateral is cyclic ONLY when ALL FOUR vertices lie on the circumference.", correctCorrection: "Inspect every vertex: center O is never on the circumference." },
      { misconception: "Assuming the tangent segment PT is the hypotenuse instead of OP.", whyItIsWrong: "The right angle sits between radius OT and tangent PT, making OP opposite the 90° angle.", correctCorrection: "OP² = OT² + PT² always." }
    ],
    guidedPracticePrompt: "In a circle with diameter AB, C lies on the circumference. If ∠CAB = 34°, calculate ∠ABC.",
    independentPracticePrompt: "Prove algebraically using the Angle at Center theorem around a full 360° point why opposite angles A and C of a cyclic quadrilateral must sum to 180°.",
    diagnosticSelfCheck: "Can you name and cite the exact circle theorem justifying each angle step in a WAEC/NECO geometry proof?",
    transferApplication: "Optical lens design, satellite horizon line-of-sight geometry, mechanical cam-gear clearances, and surveying triangulation.",
    masteryAssessment: "Achieve >= 85% across 5 geometry items testing cyclic quadrilaterals, central angles, semicircle right angles, alternate segments, and tangent lengths.",
    extensionActivity: "Construct a proof of the Alternate Segment Theorem using a diameter through the point of tangency and the Angle in a Semicircle theorem.",
    summaryRecap: "∠Center = 2∠Circumference; ∠Semicircle = 90°; Cyclic quad opposite ∠ sum = 180°; Radius ⊥ Tangent (90°); Tangent-chord = alternate segment angle.",
    estimatedMinutes: 120
  },

  "skill-stats-dispersion": {
    id: "les-stats-dispersion",
    title: "Measures of Dispersion: Variance, Standard Deviation, & Probability",
    hookAndIntuition: "Two investment portfolios both average 10% annual return, yet one stays within 9%–11% while the other swings from -40% to +60%. Averages alone hide volatility—measures of dispersion and probability rules quantify spread, outliers, and risk.",
    conceptualExplanation: "CORE SYLLABUS (NERDC SSS / WAEC / NECO / JAMB): (1) Measures of Central Tendency: Mean x̄ = Σx / n (or Σfx / Σf for grouped frequency data), Median (middle value Q₂), Mode. (2) Spread & Quartiles: Range = Max - Min (outlier-sensitive). Interquartile Range (IQR) = Q₃ - Q₁ captures the middle 50% spread cleanly. Outlier threshold: below Q₁ - 1.5·IQR or above Q₃ + 1.5·IQR. (3) Variance & Standard Deviation: Variance σ² = Σ(x - x̄)² / n = (Σx² / n) - x̄². Standard Deviation σ = √σ² restores original data units. (4) Theoretical & Complement Probability: P(E) = n(E) / n(S) with 0 <= P(E) <= 1. Complement rule: P(not E) = 1 - P(E). For independent events A and B: P(A and B) = P(A) × P(B). For mutually exclusive events: P(A or B) = P(A) + P(B).",
    conceptualModel: "Center-Spread-Chance Triad: Locate center (x̄ / Q₂), measure squared/quartile spread (σ / IQR), and enumerate exact sample space outcomes n(S).",
    keyTermsAndFormulas: [
      { termOrSymbol: "Variance & Standard Deviation: σ² = Σ(x - x̄)² / n; σ = √σ²", definition: "Root-mean-square deviation from the arithmetic mean.", practicalExample: "For 2, 4, 6, 8, 10 (mean 6): Σ(x - 6)² = 16+4+0+4+16 = 40 => σ² = 8 => σ = 2√2." },
      { termOrSymbol: "IQR = Q₃ - Q₁", definition: "Middle 50% spread unaffected by extreme outliers.", practicalExample: "For 11, 14, 17, 20, 23, 27, 31: Q₁ = 14, Q₃ = 27 => IQR = 13." },
      { termOrSymbol: "Complement & Sample-Space Rules: P(E') = 1 - P(E)", definition: "Simplifies 'not' or 'at least one' probabilities cleanly.", practicalExample: "Two fair dice: 6 out of 36 pairs sum > 9 => P(sum > 9) = 6/36 = 1/6." }
    ],
    workedExamples: [
      {
        title: "Worked Analysis 1: Computing Mean, Variance, and Standard Deviation",
        problemStatement: "Calculate the mean, variance, and standard deviation of the dataset: 4, 7, 8, 11, 15.",
        steps: [
          { stepNumber: 1, instruction: "Find the arithmetic mean x̄.", reasoning: "n = 5. Sum = 4 + 7 + 8 + 11 + 15 = 45 => x̄ = 45 / 5 = 9." },
          { stepNumber: 2, instruction: "Compute signed deviations (x - x̄) and verify their sum is zero.", reasoning: "-5, -2, -1, +2, +6 (sum = 0, arithmetic check passed)." },
          { stepNumber: 3, instruction: "Square each deviation and sum.", reasoning: "25 + 4 + 1 + 4 + 36 = 70." },
          { stepNumber: 4, instruction: "Divide by n = 5 for variance and take principal square root.", reasoning: "σ² = 70 / 5 = 14.0; standard deviation σ = √14 ≈ 3.74." }
        ],
        takeawayRule: "Signed deviations from the mean always sum to zero—use that as a quick arithmetic checkpoint before squaring."
      },
      {
        title: "Worked Analysis 2: Interquartile Range & Two-Dice Probability Space",
        problemStatement: "(a) Find Q₁, Q₃, and IQR of 11, 14, 17, 20, 23, 27, 31. (b) Find the probability that two fair dice sum strictly above 9.",
        steps: [
          { stepNumber: 1, instruction: "Locate the median Q₂ of the 7 ordered values.", reasoning: "The 4th term is median Q₂ = 20." },
          { stepNumber: 2, instruction: "Extract lower and upper halves excluding Q₂.", reasoning: "Lower half: [11, 14, 17] -> Q₁ = 14. Upper half: [23, 27, 31] -> Q₃ = 27. IQR = 27 - 14 = 13." },
          { stepNumber: 3, instruction: "List all ordered pairs summing strictly > 9 (10, 11, 12).", reasoning: "Sum 10: (4,6), (5,5), (6,4) [3]; Sum 11: (5,6), (6,5) [2]; Sum 12: (6,6) [1]." },
          { stepNumber: 4, instruction: "Divide favorable outcomes by 6 × 6 = 36 total outcomes.", reasoning: "P(sum > 9) = (3 + 2 + 1) / 36 = 6 / 36 = 1/6." }
        ],
        takeawayRule: "Always distinguish ordered pairs (4,6) and (6,4) on two distinct dice when counting equally likely outcomes out of 36."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Claiming standard deviation can be negative when values fall below the mean.", whyItIsWrong: "Squared deviations are always >= 0, and standard deviation is the non-negative principal square root.", correctCorrection: "Standard deviation is strictly >= 0 (0 only when every data value is identical)." },
      { misconception: "Treating (5, 6) and (6, 5) as a single outcome in two-dice probability.", whyItIsWrong: "Die 1 showing 5 and Die 2 showing 6 is physically distinct from Die 1 showing 6 and Die 2 showing 5.", correctCorrection: "Use the 6 × 6 = 36 ordered outcome grid consistently." }
    ],
    guidedPracticePrompt: "Compute the population standard deviation of 2, 4, 6, 8, 10 without a calculator.",
    independentPracticePrompt: "If a single extreme typo changes 31 to 310 in [11, 14, 17, 20, 23, 27, 31], calculate how much the Mean changes versus the IQR.",
    diagnosticSelfCheck: "Can you verify that Σ(x - x̄) = 0, separate Q₁/Q₃ cleanly, and list all 36 ordered outcomes in two-dice probability?",
    transferApplication: "Financial portfolio volatility modeling, manufacturing quality-control sigma limits, actuarial risk underwriting, and clinical trial statistics.",
    masteryAssessment: "Achieve >= 85% across 5 statistics and probability items spanning mean, standard deviation, IQR, complement probability, and sample spaces.",
    extensionActivity: "Prove the computational shortcut identity Σ(x - x̄)² / n = (Σx² / n) - x̄² used on scientific calculators.",
    summaryRecap: "Mean locates balance; IQR = Q₃ - Q₁ resists outliers; σ = √[Σ(x-x̄)²/n] measures spread; P(E') = 1 - P(E).",
    estimatedMinutes: 120
  },

  "skill-matrix-operations": {
    id: "les-matrix-operations",
    title: "Matrices, Determinants, & 2D Linear Transformations",
    hookAndIntuition: "Every 3D graphics frame, engineering structural mesh, and neural-network layer executes millions of matrix multiplications per second. Matrices encode linear systems and geometric transformations in compact algebraic tables.",
    conceptualExplanation: "CORE SYLLABUS (NERDC SSS / WAEC Further Math / UTME / Year-1 Engineering): An m × n matrix has m rows and n columns. (1) Addition & Scalar Multiplication: Only conformable matrices of identical shape add entrywise. (2) Matrix Multiplication (AB): Defined iff cols(A) = rows(B); entry (i, j) is the dot product of Row i of A with Column j of B. Multiplication is associative (AB)C = A(BC) but NOT commutative (AB ≠ BA in general). (3) 2×2 Determinant: For A = [[a, b], [c, d]], det(A) = |A| = ad - bc (geometric area scaling factor). A matrix is Singular iff det(A) = 0 (no inverse exists; linear system has zero or infinite solutions). (4) Inverse Matrix: For non-singular A, A⁻¹ = (1 / det(A)) · [[d, -b], [-c, a]], satisfying AA⁻¹ = I. Solving linear system AX = B yields X = A⁻¹B. (5) Orthogonal Vectors: 2D vectors u = (u₁, u₂) and v = (v₁, v₂) are perpendicular iff their dot product u · v = u₁v₁ + u₂v₂ = 0.",
    conceptualModel: "Row-Column Operator Pipeline: Matrix multiplication chains linear maps right-to-left; det(A) tracks signed area scaling; det = 0 collapses 2D space onto a line or point.",
    keyTermsAndFormulas: [
      { termOrSymbol: "det(A) = ad - bc | Singular <=> ad - bc = 0", definition: "2×2 determinant; zero determinant signals non-invertible (singular) transformation.", practicalExample: "[[k, 6], [2, 3]] is singular when 3k - 12 = 0 => k = 4." },
      { termOrSymbol: "A⁻¹ = (1 / (ad - bc)) · [[d, -b], [-c, a]]", definition: "Exact inverse swapping main diagonal and negating off-diagonal entries.", practicalExample: "If M = [[4, 3], [1, 1]], det = 1, so M⁻¹ = [[1, -3], [-1, 4]]." },
      { termOrSymbol: "Dot Product Orthogonality: u · v = u₁v₁ + u₂v₂ = 0", definition: "Condition for two nonzero vectors to meet at 90°.", practicalExample: "(3, -4) · (8, k) = 24 - 4k = 0 => k = 6." }
    ],
    workedExamples: [
      {
        title: "Worked Analysis 1: Solving a 2×2 Linear System Using Matrix Inversion",
        problemStatement: "Use matrix inversion to solve the simultaneous system: 3x + 2y = 8 and 4x + 3y = 11.",
        steps: [
          { stepNumber: 1, instruction: "Write the system in matrix equation form AX = B.", reasoning: "A = [[3, 2], [4, 3]], X = [[x], [y]], B = [[8], [11]]." },
          { stepNumber: 2, instruction: "Evaluate det(A) to confirm invertibility.", reasoning: "det(A) = (3)(3) - (2)(4) = 9 - 8 = 1 ≠ 0, so A⁻¹ exists." },
          { stepNumber: 3, instruction: "Form adjoint and divide by det(A).", reasoning: "Swap 3 and 3, negate 2 and 4: A⁻¹ = [[3, -2], [-4, 3]]." },
          { stepNumber: 4, instruction: "Left-multiply B by A⁻¹ via row-by-column dot products.", reasoning: "x = 3(8) + (-2)(11) = 24 - 22 = 2; y = -4(8) + 3(11) = -32 + 33 = 1." }
        ],
        takeawayRule: "Always left-multiply B as X = A⁻¹B (never BA⁻¹), because matrix multiplication is non-commutative."
      },
      {
        title: "Worked Analysis 2: Matrix Product AB and Vector Orthogonality",
        problemStatement: "(a) Multiply A = [[2, 1], [0, 3]] by B = [[4, -1], [2, 5]]. (b) Find k so vectors u = (3, -4) and v = (8, k) are perpendicular.",
        steps: [
          { stepNumber: 1, instruction: "Compute Row 1 of AB from Row 1 of A [2, 1] and columns of B.", reasoning: "(1,1): 2(4) + 1(2) = 10; (1,2): 2(-1) + 1(5) = 3." },
          { stepNumber: 2, instruction: "Compute Row 2 of AB from Row 2 of A [0, 3] and columns of B.", reasoning: "(2,1): 0(4) + 3(2) = 6; (2,2): 0(-1) + 3(5) = 15. Thus AB = [[10, 3], [6, 15]]." },
          { stepNumber: 3, instruction: "Set up dot product equation for perpendicular vectors.", reasoning: "u · v = 3(8) + (-4)(k) = 24 - 4k = 0." },
          { stepNumber: 4, instruction: "Solve for k.", reasoning: "4k = 24 => k = 6." }
        ],
        takeawayRule: "Each entry (i, j) in AB is the dot product of Row i of A with Column j of B."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Multiplying matrices entry-by-entry (Hadamard style) instead of row-by-column.", whyItIsWrong: "True linear transformation composition maps Row i of the left matrix across Column j of the right matrix.", correctCorrection: "Trace Row i horizontally and Column j vertically for each entry (i, j)." },
      { misconception: "Forgetting to swap main diagonal entries a and d when forming the 2×2 adjoint.", whyItIsWrong: "Negating b and c alone without swapping a and d fails A · A⁻¹ = I.", correctCorrection: "Swap main diagonal (d, a), negate off-diagonal (-b, -c), divide by ad - bc." }
    ],
    guidedPracticePrompt: "Find the value of k that makes [[k, 6], [2, 3]] singular (non-invertible).",
    independentPracticePrompt: "Verify by explicit row-by-column multiplication that [[3, 2], [4, 3]] · [[3, -2], [-4, 3]] equals the 2×2 identity matrix I.",
    diagnosticSelfCheck: "Can you multiply 2×2 matrices, test singularity via det = 0, invert non-singular matrices, and apply u · v = 0?",
    transferApplication: "3D computer graphics pipelines, structural finite-element stiffness matrices, electrical mesh analysis, and machine-learning linear layers.",
    masteryAssessment: "Achieve >= 85% across 5 matrix and vector problems covering determinants, inverses, row-by-column products, singularity, and dot products.",
    extensionActivity: "Check geometrically why the rotation matrix R(90°) = [[0, -1], [1, 0]] satisfies det(R) = 1 and R⁻¹ = Rᵀ.",
    summaryRecap: "AB multiplies rows by columns (AB ≠ BA). det(A) = ad - bc. Singular iff det = 0. A⁻¹ = (1/det)[[d, -b], [-c, a]]. Orthogonal iff u · v = 0.",
    estimatedMinutes: 125
  },

  "skill-derivatives": {
    id: "les-derivatives",
    title: "Differential Calculus: First Principles, Power Rule, & Optimization",
    hookAndIntuition: "When a police radar gun tracks a speeding car, it does not measure how far the car drove over an hour—it measures instantaneous velocity at that exact microsecond. Differential calculus is the mathematics of instantaneous change, finding the slope of curved functions at any single point.",
    conceptualExplanation: "The derivative of a function y = f(x), denoted dy/dx or f'(x), represents the instantaneous rate of change of y with respect to x. From First Principles, the derivative is the limit of the secant slope as the interval h approaches zero: f'(x) = lim_{h->0} [f(x + h) - f(x)] / h. Fundamental Rules of Differentiation: (1) Power Rule: d/dx(x^n) = n x^(n-1). (2) Constant Multiple: d/dx(k f(x)) = k f'(x). (3) Sum/Difference Rule: d/dx(u ± v) = du/dx ± dv/dx. (4) Product Rule: d/dx(uv) = u (dv/dx) + v (du/dx). (5) Quotient Rule: d/dx(u/v) = (v du/dx - u dv/dx) / v². (6) Chain Rule: dy/dx = (dy/du) · (du/dx) for composite functions. Optimization: Stationary (turning) points occur where dy/dx = 0. The Second Derivative d²y/dx² determines concavity: if d²y/dx² > 0, the curve is concave up (Local Minimum); if d²y/dx² < 0, the curve is concave down (Local Maximum); if d²y/dx² = 0, test for a point of inflection.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Power Rule: d/dx(x^n) = n x^(n-1)", definition: "Fundamental derivative formula for algebraic powers.", practicalExample: "d/dx(3x⁴ - 5x² + 7) = 12x³ - 10x." },
      { termOrSymbol: "Stationary Point Condition: dy / dx = 0", definition: "Horizontal tangent condition finding maximum and minimum turning values.", practicalExample: "Profit maximization occurs where marginal profit dP/dx = 0." },
      { termOrSymbol: "Second Derivative Test: d²y / dx²", definition: "Concavity test: d²y/dx² > 0 indicates local minimum; d²y/dx² < 0 indicates local maximum.", practicalExample: "For y = x²: dy/dx = 2x = 0 at x = 0; d²y/dx² = +2 > 0, confirming a minimum." }
    ],
    workedExamples: [
      {
        title: "Maximizing the Volume of an Open-Top Rectangular Box",
        problemStatement: "A square sheet of tin of side 12 cm has equal squares of side x cm cut from each of its four corners. The sides are folded up to form an open box. Find: (a) an expression for volume V in terms of x, (b) the value of x that maximizes volume, (c) the maximum volume.",
        steps: [
          { stepNumber: 1, instruction: "Set up the geometric dimensions of the folded box.", reasoning: "Base length = 12 - 2x; Base width = 12 - 2x; Height = x. Volume V(x) = length × width × height = x(12 - 2x)²." },
          { stepNumber: 2, instruction: "Expand the volume function.", reasoning: "V(x) = x(144 - 48x + 4x²) = 4x³ - 48x² + 144x." },
          { stepNumber: 3, instruction: "Differentiate V(x) with respect to x.", reasoning: "dV/dx = 12x² - 96x + 144." },
          { stepNumber: 4, instruction: "Set dV/dx = 0 to find stationary points.", reasoning: "12(x² - 8x + 12) = 0 => 12(x - 2)(x - 6) = 0 => x = 2 or x = 6." },
          { stepNumber: 5, instruction: "Apply physical constraints and second derivative test.", reasoning: "If x = 6 cm, base length is 12 - 2(6) = 0 (impossible). So x = 2. d²V/dx² = 24x - 96. At x = 2: 24(2) - 96 = -48 < 0 (concave down, confirms Maximum)." },
          { stepNumber: 6, instruction: "Calculate maximum volume.", reasoning: "V(2) = 2(12 - 4)² = 2(8)² = 2 × 64 = 128 cm³." }
        ],
        takeawayRule: "In optimization problems: express target variable as a single function, set derivative to zero, and verify with the second derivative test."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Assuming d/dx(uv) = (du/dx) × (dv/dx).", whyItIsWrong: "Derivatives of products do not multiply! The Product Rule must be applied: d/dx(uv) = u v' + v u'.", correctCorrection: "Always use the Product Rule: u(dv/dx) + v(du/dx)." }
    ],
    guidedPracticePrompt: "Differentiate y = (2x + 3)⁵ using the Chain Rule.",
    summaryRecap: "Derivatives measure instantaneous slopes. Power rule: d/dx(x^n) = n x^(n-1). Setting dy/dx = 0 finds stationary points; d²y/dx² tests max/min."
  },

  "skill-indefinite-definite-integration": {
    id: "les-indefinite-definite-integration",
    title: "Integral Calculus: Antiderivatives, Definite Integrals, & Area Under Curves",
    hookAndIntuition: "If differentiation tells you a sports car's speed at every second, how do you determine the total distance it covered over its entire journey? Integration reverse-engineers the derivative: summing infinitesimal slices to calculate total accumulated area, volume, and distance.",
    conceptualExplanation: "Integration is the inverse operation of differentiation (antiderivative). (1) Indefinite Integral: ∫ f(x) dx = F(x) + C, where F'(x) = f(x) and C is the arbitrary constant of integration. Power Rule for Integration: ∫ x^n dx = (x^(n+1))/(n + 1) + C (valid for all n ≠ -1; for n = -1, ∫ 1/x dx = ln|x| + C). (2) Fundamental Theorem of Calculus: If f is continuous on [a, b], then the Definite Integral evaluates the net accumulated area under the curve between bounds a and b: ∫_a^b f(x) dx = [F(x)]_a^b = F(b) - F(a) (the constant C cancels out). (3) Area Between Curves: Area enclosed between an upper curve y₁ and a lower curve y₂ from x = a to x = b is Area = ∫_a^b (y₁ - y₂) dx.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Power Rule: ∫ x^n dx = (x^(n+1)) / (n + 1) + C", definition: "Reverse power rule for integration (add 1 to power, divide by new power).", practicalExample: "∫ 6x² dx = 6(x³/3) + C = 2x³ + C." },
      { termOrSymbol: "Fundamental Theorem: ∫_a^b f(x) dx = F(b) - F(a)", definition: "Connects antiderivatives to exact bounded geometric areas.", practicalExample: "∫₀³ 2x dx = [x²]₀³ = 3² - 0² = 9." },
      { termOrSymbol: "Constant of Integration (+C)", definition: "Essential constant in indefinite integrals accounting for constant terms lost during differentiation.", practicalExample: "d/dx(x² + 5) = 2x and d/dx(x² + 100) = 2x; thus ∫ 2x dx = x² + C." }
    ],
    workedExamples: [
      {
        title: "Calculating the Enclosed Area Under a Parabolic Curve",
        problemStatement: "Calculate the exact area of the region bounded by the parabola y = 6x - x² and the x-axis.",
        steps: [
          { stepNumber: 1, instruction: "Find the x-intercepts to determine integration limits a and b.", reasoning: "Set y = 0: 6x - x² = 0 => x(6 - x) = 0 => x = 0 (lower limit a) and x = 6 (upper limit b)." },
          { stepNumber: 2, instruction: "Set up the definite integral for area.", reasoning: "Area = ∫₀⁶ (6x - x²) dx." },
          { stepNumber: 3, instruction: "Find the antiderivative F(x).", reasoning: "∫ 6x dx = 6(x²/2) = 3x²; ∫ x² dx = x³/3. Antiderivative F(x) = [3x² - x³/3]₀⁶." },
          { stepNumber: 4, instruction: "Evaluate F(6) - F(0).", reasoning: "F(6) = 3(6²) - (6³)/3 = 3(36) - 216/3 = 108 - 72 = 36. F(0) = 0 - 0 = 0." },
          { stepNumber: 5, instruction: "State final area.", reasoning: "Area = 36 - 0 = 36 square units." }
        ],
        takeawayRule: "To find area bounded by a curve and the x-axis: find the roots to establish limits of integration, then evaluate the definite integral."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Forgetting '+ C' in indefinite integrals.", whyItIsWrong: "Without + C, you are specifying only one particular curve out of an infinite family of parallel vertical shifts, losing marks in examinations.", correctCorrection: "Always write '+ C' at the end of every indefinite integral." }
    ],
    guidedPracticePrompt: "Evaluate the definite integral: ∫₁⁴ (3x² - 4x + 1) dx.",
    summaryRecap: "Integration is antiderivation: ∫ x^n dx = x^(n+1)/(n+1) + C. Definite integral ∫_a^b f(x) dx = F(b) - F(a) calculates exact area under curves."
  },

  "skill-prime-factorization-hcf-lcm": {
    id: "les-prime-factorization-hcf-lcm",
    title: "Prime Factorization, HCF, & LCM Problem Solving",
    hookAndIntuition: "Atoms are the indivisible building blocks of chemistry. In mathematics, prime numbers are the atomic elements of all integers! By breaking numbers down into their prime factorizations, finding Highest Common Factors (HCF) and Lowest Common Multiples (LCM) becomes fast and effortless.",
    conceptualExplanation: "The Fundamental Theorem of Arithmetic states that every integer greater than 1 is either a prime number itself or can be represented as the unique product of prime numbers (up to the order of factors). Prime numbers (2, 3, 5, 7, 11, 13, 17, 19, 23...) have exactly two distinct factors: 1 and themselves. To find HCF and LCM using Prime Factor Trees: (1) Express each number in index notation (e.g. 72 = 2³ × 3²). (2) Highest Common Factor (HCF / GCD): Take the lowest power of all common prime factors. (3) Lowest Common Multiple (LCM): Take the highest power of all prime factors present in either number. Universal Property: For any two positive integers a and b, HCF(a, b) × LCM(a, b) = a × b.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Fundamental Theorem of Arithmetic", definition: "Every composite integer has a unique prime factorization.", practicalExample: "360 = 2³ × 3² × 5." },
      { termOrSymbol: "HCF = Product of Lowest Powers of Common Primes", definition: "Finds greatest factor dividing all numbers without remainder.", practicalExample: "For 24 (2³ × 3) and 36 (2² × 3²): HCF = 2² × 3 = 12." },
      { termOrSymbol: "LCM = Product of Highest Powers of All Primes", definition: "Finds smallest number divisible by all numbers.", practicalExample: "For 24 and 36: LCM = 2³ × 3² = 8 × 9 = 72." }
    ],
    workedExamples: [
      {
        title: "Synchronizing Flashing Beacons using LCM",
        problemStatement: "Three navigation harbor beacons flash at regular intervals of 12 seconds, 18 seconds, and 30 seconds respectively. If they flash simultaneously at 12:00 noon, at what time will they next flash together?",
        steps: [
          { stepNumber: 1, instruction: "Express each interval in prime factor index notation.", reasoning: "12 = 2² × 3; 18 = 2 × 3²; 30 = 2 × 3 × 5." },
          { stepNumber: 2, instruction: "Calculate the LCM by taking the highest power of each prime factor (2, 3, 5).", reasoning: "Highest power of 2 is 2². Highest power of 3 is 3². Highest power of 5 is 5¹." },
          { stepNumber: 3, instruction: "Multiply to find the LCM.", reasoning: "LCM = 2² × 3² × 5 = 4 × 9 × 5 = 180 seconds." },
          { stepNumber: 4, instruction: "Convert seconds to minutes.", reasoning: "180 seconds / 60 seconds/min = 3 minutes." },
          { stepNumber: 5, instruction: "Add elapsed time to initial time.", reasoning: "12:00 noon + 3 minutes = 12:03 PM." }
        ],
        takeawayRule: "Repetitive synchronization problems (beacons flashing, bells tolling, runners on a track) are solved by finding the LCM."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Classifying the number 1 as a prime number.", whyItIsWrong: "By definition, a prime number must have EXACTLY two distinct positive divisors. 1 has only one divisor (itself). Classifying 1 as prime would violate unique prime factorization.", correctCorrection: "1 is neither prime nor composite; 2 is the only even prime number." }
    ],
    guidedPracticePrompt: "Find the HCF and LCM of 84 and 126 using prime factor trees.",
    summaryRecap: "Prime factorization breaks numbers into unique primes. HCF takes lowest powers of common primes; LCM takes highest powers of all primes. HCF × LCM = a × b."
  },

  "skill-ratio-rates-proportions": {
    id: "les-ratio-rates-proportions",
    title: "Ratio, Direct & Inverse Proportions, & Compound Rates",
    hookAndIntuition: "If 4 bricklayers build a wall in 6 days, how long will 8 bricklayers take? More workers means LESS time—they will finish in 3 days! This is Inverse Proportion. Recognizing whether quantities rise together (direct) or pull in opposite directions (inverse) is essential in engineering and economics.",
    conceptualExplanation: "A ratio compares quantities of the same kind. A rate compares quantities of different kinds (e.g. speed = distance/time in km/h; density = mass/volume). (1) Direct Proportion (y ∝ x): y = kx, where k = y/x is the constant of proportionality. As x doubles, y doubles. Graph is a straight line through the origin (0, 0). (2) Inverse / Indirect Proportion (y ∝ 1/x): y = k/x (or xy = k). As x doubles, y halves. Graph is a rectangular hyperbola. (3) Joint Proportion: y varies directly as x and inversely as z: y = kx/z.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Direct Proportion: y = kx", definition: "Constant ratio: y₁ / x₁ = y₂ / x₂.", practicalExample: "Cost is directly proportional to quantity: 5 books cost ₦2,500, 8 books cost ₦4,000." },
      { termOrSymbol: "Inverse Proportion: xy = k", definition: "Constant product: x₁ y₁ = x₂ y₂.", practicalExample: "Workers and completion time: 3 workers × 8 hours = 6 workers × 4 hours = 24 worker-hours." },
      { termOrSymbol: "Average Speed = Total Distance / Total Time", definition: "Compound rate for multi-stage journeys.", practicalExample: "Driving 100 km at 50 km/h (2h) and 100 km at 100 km/h (1h): Avg speed = 200 km / 3 h = 66.7 km/h." }
    ],
    workedExamples: [
      {
        title: "Solving an Inverse Proportion Problem with Food Rations",
        problemStatement: "A military camp has enough food rations to sustain 60 soldiers for 28 days. If 20 additional soldiers join the camp, how many days will the same rations last?",
        steps: [
          { stepNumber: 1, instruction: "Determine the type of proportion.", reasoning: "More soldiers consume food faster, so days remaining decreases. This is an Inverse Proportion: Soldiers × Days = Total Man-Days (constant k)." },
          { stepNumber: 2, instruction: "Calculate constant total ration capacity k.", reasoning: "k = 60 soldiers × 28 days = 1,680 soldier-days of food." },
          { stepNumber: 3, instruction: "Determine new total soldier count.", reasoning: "New soldiers = 60 + 20 = 80 soldiers." },
          { stepNumber: 4, instruction: "Calculate new duration in days.", reasoning: "Days = k / 80 = 1,680 / 80 = 21 days." }
        ],
        takeawayRule: "In inverse proportion problems, the product of the variables remains constant: x₁y₁ = x₂y₂."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Calculating average speed of a round trip by simply averaging the two speeds: (v₁ + v₂)/2.", whyItIsWrong: "You spend more time traveling at the slower speed, weighting the average downward. Average speed is strictly Total Distance / Total Time.", correctCorrection: "Always divide Total Distance by Total Time to calculate average speed." }
    ],
    guidedPracticePrompt: "If y varies inversely as the square of x, and y = 8 when x = 3, find y when x = 6.",
    summaryRecap: "Direct proportion has constant ratio (y = kx); inverse proportion has constant product (xy = k). Average speed = Total Distance / Total Time."
  },

  "skill-algebraic-expansion-factorization": {
    id: "les-algebraic-expansion-factorization",
    title: "Algebraic Expansion, Factorization, & Difference of Two Squares",
    hookAndIntuition: "Imagine an architect calculating the area of a square courtyard of side x. If the courtyard is enlarged by 3 meters in length and width, the new area is (x + 3)². Algebraic expansion and factoring give us the tools to expand and factorize expressions fluently.",
    conceptualExplanation: "Algebraic expansion transforms product expressions into polynomial sums using the Distributive Law: a(b + c) = ab + ac, and FOIL (First, Outer, Inner, Last) for binomials: (a + b)(c + d) = ac + ad + bc + bd. Special Algebraic Products: (1) Perfect Squares: (a + b)² = a² + 2ab + b²; (a - b)² = a² - 2ab + b². (2) Difference of Two Squares (DOTS): a² - b² = (a - b)(a + b). Factorization is the reverse process, decomposing sums into products: (1) Common factor extraction, (2) Grouping in pairs, (3) Difference of two squares, and (4) Quadratic trinomial factoring.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Difference of Two Squares: a² - b² = (a - b)(a + b)", definition: "Instant factorization pattern whenever two squared terms are separated by a minus.", practicalExample: "x² - 49 = (x - 7)(x + 7); 4x² - 25y² = (2x - 5y)(2x + 5y)." },
      { termOrSymbol: "Perfect Square Trinomials", definition: "(a ± b)² = a² ± 2ab + b².", practicalExample: "x² + 6x + 9 = (x + 3)²." },
      { termOrSymbol: "Factoring by Grouping", definition: "Grouping 4 terms into pairs to factor common binomials.", practicalExample: "ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y)." }
    ],
    workedExamples: [
      {
        title: "Evaluating Numerical Arithmetic using Difference of Two Squares",
        problemStatement: "Evaluate without using a calculator: 105² - 95².",
        steps: [
          { stepNumber: 1, instruction: "Identify the algebraic form.", reasoning: "105² - 95² is in the form a² - b² with a = 105 and b = 95." },
          { stepNumber: 2, instruction: "Apply the Difference of Two Squares identity: a² - b² = (a - b)(a + b).", reasoning: "105² - 95² = (105 - 95)(105 + 95)." },
          { stepNumber: 3, instruction: "Evaluate the two bracketed terms.", reasoning: "(105 - 95) = 10; (105 + 95) = 200." },
          { stepNumber: 4, instruction: "Multiply the simplified terms.", reasoning: "10 × 200 = 2,000. Solved in seconds!" }
        ],
        takeawayRule: "Algebraic identities can turn cumbersome multi-digit arithmetic into simple mental calculations."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Claiming (a + b)² = a² + b².", whyItIsWrong: "This skips the middle cross-term 2ab! (3 + 4)² = 7² = 49, whereas 3² + 4² = 9 + 16 = 25 ≠ 49.", correctCorrection: "Always include the middle term: (a + b)² = a² + 2ab + b²." }
    ],
    guidedPracticePrompt: "Factorize completely: 3x³ - 12x.",
    summaryRecap: "(a+b)² = a² + 2ab + b². Difference of two squares: a² - b² = (a-b)(a+b). Factoring reverses expansion."
  },

  "skill-linear-inequalities-1d": {
    id: "les-linear-inequalities-1d",
    title: "Linear Inequalities, Number Line Graphs, & Boundary Conditions",
    hookAndIntuition: "When a bridge has a sign reading 'Maximum Weight Limit ≤ 20 Tons', it does not mean trucks must weigh exactly 20 tons—they can weigh 5 tons, 12 tons, or 19.9 tons! Inequalities define continuous ranges of acceptable solutions rather than single isolated values.",
    conceptualExplanation: "An inequality compares unequal expressions using: < (less than), > (greater than), ≤ (less than or equal to), and ≥ (greater than or equal to). Solving linear inequalities follows the exact same rules as linear equations, with ONE CRITICAL EXCEPTION: Multiplying or dividing both sides by a NEGATIVE number reverses the direction of the inequality sign! For example, if -2x < 6, dividing by -2 flips < to >, giving x > -3. Graphical representation on a Number Line: Open circle (○) represents strict inequalities (< or >), where the boundary value is excluded; Solid closed circle (●) represents inclusive inequalities (≤ or ≥), where the boundary value is included.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Negative Sign Reversal Rule", definition: "Multiplying or dividing by a negative number inverts the inequality symbol (< becomes >, ≤ becomes ≥).", practicalExample: "-3x ≥ 12 => x ≤ -4." },
      { termOrSymbol: "Compound Inequalities: a < x ≤ b", definition: "Simultaneous boundaries bounding x between two values.", practicalExample: "-2 ≤ x < 5 represents all values from -2 inclusive up to 5 exclusive." },
      { termOrSymbol: "Number Line Notation", definition: "Open circle ○ = strict (<, >); Closed circle ● = inclusive (≤, ≥).", practicalExample: "x > 3 has open circle at 3 with arrow pointing right." }
    ],
    workedExamples: [
      {
        title: "Solving a Compound Linear Inequality and Representing on a Number Line",
        problemStatement: "Solve the compound inequality: -5 ≤ 2x + 3 < 11, and find the integer solution set.",
        steps: [
          { stepNumber: 1, instruction: "Subtract 3 from all three parts of the compound inequality.", reasoning: "-5 - 3 ≤ 2x < 11 - 3 => -8 ≤ 2x < 8." },
          { stepNumber: 2, instruction: "Divide all parts by positive coefficient 2 (sign does not change).", reasoning: "-8 / 2 ≤ x < 8 / 2 => -4 ≤ x < 4." },
          { stepNumber: 3, instruction: "Interpret on a number line.", reasoning: "Solid circle at -4, open circle at 4, with line segment shading all real numbers between them." },
          { stepNumber: 4, instruction: "List integer solutions x ∈ ℤ.", reasoning: "x ∈ {-4, -3, -2, -1, 0, 1, 2, 3} (note: 4 is excluded because of strict <)." }
        ],
        takeawayRule: "When solving compound inequalities, whatever operation you perform must be applied to all three sections."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Forgetting to flip the inequality sign when dividing by a negative number.", whyItIsWrong: "Consider 2 < 5. If we multiply both sides by -1: -2 is GREATER than -5 (-2 > -5). Failing to reverse the sign produces a false statement.", correctCorrection: "Always flip the inequality sign when multiplying or dividing by a negative number." }
    ],
    guidedPracticePrompt: "Solve for x: 5 - 3x ≥ 14.",
    summaryRecap: "Inequalities define solution ranges. Multiplying/dividing by a negative reverses the symbol. Open circle is strict; closed circle is inclusive."
  },

  "skill-functions-mapping-graphs": {
    id: "les-functions-mapping-graphs",
    title: "Functions, Domain, Range, & Inverse Function Mapping",
    hookAndIntuition: "Think of a vending machine: you press button 'B4' (input), and a cold soda drops down (output). If pressing 'B4' unpredictably dropped a soda one time and a chocolate bar the next, the machine would be broken! A mathematical function must produce exactly one unambiguous output for every input.",
    conceptualExplanation: "A relation is a mapping between a set of inputs (Domain) and a set of outputs (Range / Codomain). A Function f: X -> Y is a special relation where every element in the domain maps to EXACTLY ONE element in the codomain. Vertical Line Test: a curve on a Cartesian graph is a function if and only if no vertical line intersects the graph at more than one point. Composite Functions: (f ∘ g)(x) = f(g(x)) means evaluating g(x) first, then feeding that result into f. Inverse Functions: f⁻¹(x) reverses the mapping of f, satisfying f(f⁻¹(x)) = x. An inverse function exists if and only if the function is Bijective (one-to-one and onto, passing the Horizontal Line Test). Graphically, f⁻¹(x) is the reflection of f(x) across the line y = x.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Domain and Range", definition: "Domain = set of all valid inputs x; Range = set of all resulting outputs y.", practicalExample: "For f(x) = √x, Domain is x ≥ 0 and Range is y ≥ 0." },
      { termOrSymbol: "Composite Function: f(g(x))", definition: "Applying function f to the output of function g.", practicalExample: "If f(x) = 2x and g(x) = x + 3: f(g(x)) = 2(x + 3) = 2x + 6." },
      { termOrSymbol: "Inverse Function: f⁻¹(x)", definition: "Interchanging x and y and solving for y.", practicalExample: "If y = 3x - 5: x = 3y - 5 => 3y = x + 5 => f⁻¹(x) = (x + 5)/3." }
    ],
    workedExamples: [
      {
        title: "Finding the Inverse of a Rational Function",
        problemStatement: "Given the rational function f(x) = (2x + 1) / (x - 3) for x ≠ 3, find the inverse function f⁻¹(x).",
        steps: [
          { stepNumber: 1, instruction: "Set y = f(x).", reasoning: "y = (2x + 1) / (x - 3)." },
          { stepNumber: 2, instruction: "Swap variables x and y to prepare for inversion.", reasoning: "x = (2y + 1) / (y - 3)." },
          { stepNumber: 3, instruction: "Cross-multiply to clear the fraction.", reasoning: "x(y - 3) = 2y + 1 => xy - 3x = 2y + 1." },
          { stepNumber: 4, instruction: "Collect all terms containing y on one side.", reasoning: "xy - 2y = 3x + 1." },
          { stepNumber: 5, instruction: "Factor out y and solve.", reasoning: "y(x - 2) = 3x + 1 => y = (3x + 1) / (x - 2)." },
          { stepNumber: 6, instruction: "State f⁻¹(x).", reasoning: "f⁻¹(x) = (3x + 1) / (x - 2) for x ≠ 2." }
        ],
        takeawayRule: "To find f⁻¹(x): replace f(x) with y, swap x and y, and solve for the new y."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Confusing the inverse function f⁻¹(x) with the reciprocal 1 / f(x).", whyItIsWrong: "The exponent -1 in f⁻¹ denotes functional inversion (undoing operations), NOT an algebraic power. f⁻¹(x) ≠ 1 / f(x).", correctCorrection: "f⁻¹(x) is the inverse mapping; (f(x))⁻¹ is the reciprocal." }
    ],
    guidedPracticePrompt: "If f(x) = x² + 2 and g(x) = 3x - 1, find f(g(2)) and g(f(2)).",
    summaryRecap: "Functions map each domain input to exactly one output. Composite f(g(x)) chains functions. Inverse f⁻¹(x) reflects across y = x."
  },

  "skill-angles-triangles-polygons": {
    id: "les-angles-triangles-polygons",
    title: "Plane Geometry: Angles, Parallel Lines, Triangles, & Polygons",
    hookAndIntuition: "Whether designing hexagonal honeycomb beehives or geodesic dome stadiums, the geometric laws governing polygons ensure structural rigidity. Triangles are the most rigid shapes in engineering because their side lengths fix their angles immutably.",
    conceptualExplanation: "Geometric proofs rely on fundamental angular relationships: (1) Lines and Intersections: Angles on a straight line sum to 180°; vertically opposite angles are equal; angles at a point sum to 360°. (2) Parallel Lines with Transversal: Alternate angles form a 'Z' shape and are equal; Corresponding angles form an 'F' shape and are equal; Co-interior / Allied angles form a 'C' or 'U' shape and are supplementary (sum to 180°). (3) Triangles: Interior angles sum to 180°; an Exterior angle of a triangle equals the sum of its two interior opposite angles. Congruence criteria (SSS, SAS, ASA, RHS). Similarity criteria (AA, SAS). (4) Polygons with n sides: Sum of interior angles = (n - 2) × 180°; Sum of exterior angles = 360° (for ANY convex polygon). For a regular n-gon: each exterior angle = 360° / n; each interior angle = 180° - (360° / n).",
    keyTermsAndFormulas: [
      { termOrSymbol: "Interior Angles Sum = (n - 2) × 180°", definition: "Formula for total interior angle sum of any n-sided polygon.", practicalExample: "Pentagon (n = 5): Sum = (5 - 2) × 180° = 3 × 180° = 540°." },
      { termOrSymbol: "Exterior Angle of Regular n-gon = 360° / n", definition: "Angle turned at each vertex of regular polygon; interior + exterior = 180°.", practicalExample: "Regular octagon (n = 8): Exterior angle = 360 / 8 = 45°; Interior angle = 180 - 45 = 135°." },
      { termOrSymbol: "Exterior Angle of Triangle Theorem", definition: "Exterior angle equals the sum of two non-adjacent interior angles.", practicalExample: "If two interior angles are 40° and 70°, the exterior angle at the third vertex is 110°." }
    ],
    workedExamples: [
      {
        title: "Finding the Number of Sides of a Regular Polygon",
        problemStatement: "Each interior angle of a regular polygon measures 156°. Calculate: (a) the measure of each exterior angle, (b) the number of sides n of the polygon.",
        steps: [
          { stepNumber: 1, instruction: "Calculate the exterior angle using the supplementary line property.", reasoning: "Interior angle + Exterior angle = 180°. Exterior angle = 180° - 156° = 24°." },
          { stepNumber: 2, instruction: "Use the exterior angle formula: Exterior angle = 360° / n.", reasoning: "24° = 360° / n." },
          { stepNumber: 3, instruction: "Solve for number of sides n.", reasoning: "n = 360° / 24° = 15 sides." }
        ],
        takeawayRule: "Always calculate the exterior angle first when dealing with regular polygons; it makes finding side count n much simpler than using interior angles."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking the sum of exterior angles increases as the number of sides n increases.", whyItIsWrong: "No matter how many sides a convex polygon has (triangle, decagon, or 1000-gon), walking around its perimeter completes exactly one full 360° turn. The sum of exterior angles is ALWAYS 360°.", correctCorrection: "Sum of exterior angles is always 360° for any convex polygon." }
    ],
    guidedPracticePrompt: "What is the size of each interior angle of a regular 12-sided polygon (dodecagon)?",
    summaryRecap: "Interior sum = (n - 2) × 180°. Exterior sum = 360°. Regular n-gon exterior = 360°/n. Triangle exterior angle = sum of two opposite interior angles."
  },

  "skill-mensuration-2d-3d": {
    id: "les-mensuration-2d-3d",
    title: "Mensuration: Perimeters, Areas, Surface Areas, & Volumes of Solids",
    hookAndIntuition: "If a farmer doubles the perimeter of a circular pen by doubling its radius, how much more grazing grass do the cows get? Not double—FOUR times as much grass! Area scales with the square of linear dimensions, and volume scales with the cube.",
    conceptualExplanation: "Mensuration measures lengths, areas, and volumes of geometric figures. (1) 2D Figures: Circle Area A = πr², Circumference C = 2πr; Arc Length s = (θ/360) × 2πr; Sector Area A = (θ/360) × πr²; Trapezium Area A = 0.5(a + b)h. (2) 3D Solids: Cylinder: Volume V = πr²h, Curved Surface Area CSA = 2πrh, Total Surface Area TSA = 2πrh + 2πr²; Cone: Volume V = (1/3)πr²h, CSA = πrl (where slant height l = √(r² + h²)), TSA = πrl + πr²; Sphere: Volume V = (4/3)πr³, Surface Area A = 4πr²; Hemisphere: Volume V = (2/3)πr³, TSA (solid) = 3πr²; Frustum of Cone: sliced off cone volume V = V_large - V_small. Linear, Area, and Volume Scale Factor Ratios: Linear ratio k, Area ratio k², Volume ratio k³.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Cylinder: V = πr²h, TSA = 2πr(h + r)", definition: "Formulas for circular cylinder volume and total surface area.", practicalExample: "Cylinder r = 7 cm, h = 10 cm: V = (22/7) × 49 × 10 = 1540 cm³." },
      { termOrSymbol: "Cone: V = (1/3)πr²h, CSA = πrl", definition: "Formulas for circular cone volume and curved surface area.", practicalExample: "Cone r = 3, h = 4: slant height l = √(9 + 16) = 5 cm; CSA = π(3)(5) = 15π cm²." },
      { termOrSymbol: "Sphere: V = (4/3)πr³, Area = 4πr²", definition: "Formulas for spherical volume and surface area.", practicalExample: "Sphere r = 3 cm: Area = 4π(9) = 36π cm²." }
    ],
    workedExamples: [
      {
        title: "Calculating Volume and Total Surface Area of a Solid Cone",
        problemStatement: "A solid wooden cone has base radius r = 6 cm and vertical height h = 8 cm. Taking π = 3.142, calculate: (a) the slant height l, (b) the total surface area TSA, (c) the volume V.",
        steps: [
          { stepNumber: 1, instruction: "Calculate slant height l using Pythagoras.", reasoning: "l = √(r² + h²) = √(6² + 8²) = √(36 + 64) = √100 = 10 cm." },
          { stepNumber: 2, instruction: "Calculate Total Surface Area (circular base + curved surface).", reasoning: "TSA = πr² + πrl = πr(r + l) = 3.142 × 6 × (6 + 10) = 3.142 × 6 × 16 = 301.63 cm²." },
          { stepNumber: 3, instruction: "Calculate Volume using V = (1/3)πr²h.", reasoning: "V = (1/3) × 3.142 × 6² × 8 = (1/3) × 3.142 × 36 × 8 = 3.142 × 12 × 8 = 301.63 cm³." }
        ],
        takeawayRule: "In cone problems, distinguish vertical height h (used for volume) from slant height l (used for curved surface area)."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Using vertical height h instead of slant height l when calculating cone curved surface area.", whyItIsWrong: "The curved surface wraps around the sloping edge of the cone, which has length l = √(r² + h²), not vertical height h.", correctCorrection: "CSA = πrl requires slant height l; Volume = (1/3)πr²h requires vertical height h." }
    ],
    guidedPracticePrompt: "A sphere has radius 7 cm. Calculate its volume and surface area using π = 22/7.",
    summaryRecap: "Cylinder V = πr²h; Cone V = (1/3)πr²h, CSA = πrl; Sphere V = (4/3)πr³, Area = 4πr². Area scales as k², volume as k³."
  },

  "skill-fin-compound-interest": {
    id: "les-fin-compound-interest",
    title: "Financial Mathematics: Compound Interest, Depreciation, & Annuities",
    hookAndIntuition: "Albert Einstein allegedly called compound interest 'the eighth wonder of the world: he who understands it, earns it; he who doesn't, pays it.' Why? Because compound interest generates exponential growth—you earn interest not just on your initial capital, but on the interest itself!",
    conceptualExplanation: "Simple interest I = (P · R · T) / 100 calculates interest strictly on the initial principal P, resulting in linear growth. Compound Interest reinvests accumulated interest at the end of each compounding period: Future Amount A = P (1 + r/n)^(nt), where P is principal, r is annual nominal interest rate (as a decimal), n is compounding frequency per year (1 for annually, 2 for semi-annually, 4 for quarterly, 12 for monthly), and t is time in years. Compound Interest earned is CI = A - P. For assets that lose value over time (vehicles, machinery), Reducing Balance Depreciation uses the decay formula: A = P (1 - r)^t. Annual Percentage Rate (APR) vs Effective Annual Rate (EAR): EAR = (1 + r/n)^n - 1 reflects the true annual yield taking compounding into account.",
    keyTermsAndFormulas: [
      { termOrSymbol: "A = P (1 + r / n)^(nt)", definition: "Master compound interest formula for n compounding periods per year.", practicalExample: "₦100,000 at 10% compounded quarterly for 2 years: A = 100,000(1 + 0.10/4)^(4×2) = ₦121,840." },
      { termOrSymbol: "Depreciation: Book Value = P (1 - r)^t", definition: "Asset value reduction model over time t.", practicalExample: "A ₦2,000,000 delivery van depreciating at 15% annually after 3 years: A = 2,000,000(0.85)³ = ₦1,228,250." },
      { termOrSymbol: "Rule of 72", definition: "Heuristic approximation: Doubling time in years ≈ 72 / (Interest Rate %).", practicalExample: "At 8% annual return, an investment doubles in roughly 72 / 8 = 9 years." }
    ],
    workedExamples: [
      {
        title: "Comparing Semi-Annual Compounding vs Simple Interest",
        problemStatement: "An entrepreneur invests ₦500,000 in a fixed deposit yield fund at 12% per annum for 3 years. Calculate: (a) the total amount under Simple Interest, (b) the total amount under Compound Interest compounded semi-annually, (c) the additional profit gained from compounding.",
        steps: [
          { stepNumber: 1, instruction: "Calculate total amount under Simple Interest.", reasoning: "Interest I = (P × R × T) / 100 = (500,000 × 12 × 3) / 100 = ₦180,000. Total A_simple = 500,000 + 180,000 = ₦680,000." },
          { stepNumber: 2, instruction: "Calculate total amount under Compound Interest compounded semi-annually.", reasoning: "P = 500,000, r = 0.12, n = 2 (semi-annual), t = 3. nt = 2 × 3 = 6 compounding periods. r/n = 0.12 / 2 = 0.06." },
          { stepNumber: 3, instruction: "Evaluate A = P(1 + r/n)^(nt).", reasoning: "A = 500,000 × (1.06)⁶ = 500,000 × 1.418519 = ₦709,259.55." },
          { stepNumber: 4, instruction: "Calculate the additional profit gained from compound interest.", reasoning: "Difference = ₦709,259.55 - ₦680,000 = ₦29,259.55 additional interest earned." }
        ],
        takeawayRule: "Higher compounding frequency n yields greater accumulated returns over time due to accelerated interest-on-interest."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Using annual rate r directly when compounding quarterly or monthly without dividing by n.", whyItIsWrong: "A 12% annual rate compounded monthly applies 1% (12%/12) per month for 12 months, not 12% per month! Forgetting to divide by n produces astronomically false amounts.", correctCorrection: "Always divide annual rate r by compounding frequency n, and multiply years t by n." }
    ],
    guidedPracticePrompt: "How long will it take ₦250,000 to double at 9% compound interest compounded annually? (Use Rule of 72 and verify with logs).",
    summaryRecap: "Simple interest is linear: I = PRT/100. Compound interest is exponential: A = P(1 + r/n)^(nt). Depreciation reduces value via A = P(1 - r)^t."
  }
};
