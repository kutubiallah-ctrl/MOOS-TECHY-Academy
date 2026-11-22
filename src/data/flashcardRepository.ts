/**
 * MOOS TECHY ACADEMY — FLASHCARD DECK REPOSITORY
 * 
 * Provides high-yield active recall flashcards across flagship curricula:
 * - Concepts, Formulas, Vocabulary, Definitions
 * - Misconception Alerts & High-Stakes Exam Traps (WAEC, JAMB)
 */

import { FlashcardDeck } from "../types/contentSaturation";

export const FLASHCARD_DECKS: Record<string, FlashcardDeck> = {
  "deck-quadratic-equations": {
    id: "deck-quadratic-equations",
    skillId: "skill-quad-factoring",
    unitId: "unit-sss-quadratics",
    title: "Quadratic Equations & Parabolic Roots Deck",
    subjectId: "math_algebra",
    level: "senior_secondary",
    cards: [
      {
        id: "fc-quad-1",
        skillId: "skill-quad-factoring",
        category: "formula",
        front: "What is the general Quadratic Formula for solving ax² + bx + c = 0?",
        back: "x = (-b ± √(b² - 4ac)) / (2a)",
        formulaLatex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
        hint: "Remember the radical contains the discriminant."
      },
      {
        id: "fc-quad-2",
        skillId: "skill-quad-factoring",
        category: "concept",
        front: "What does the Discriminant Δ = b² - 4ac reveal about the roots?",
        back: "Δ > 0: Two distinct real roots\nΔ = 0: One repeated real root (tangent to x-axis)\nΔ < 0: No real roots (two complex conjugate roots)",
        examContext: "WAEC WASSCE Theory High-Yield"
      },
      {
        id: "fc-quad-3",
        skillId: "skill-quad-factoring",
        category: "exam_trap",
        front: "EXAM TRAP: When solving x² = 25, why is x = 5 incomplete?",
        back: "Both (+5)² = 25 and (-5)² = 25. The full solution is x = ±5. Failing to write ± loses 50% of marks in WAEC/NECO.",
        commonTrapNote: "Always include positive and negative roots when taking square roots of both sides."
      },
      {
        id: "fc-quad-4",
        skillId: "skill-quad-factoring",
        category: "misconception",
        front: "Can you factor (x + 3)(x - 2) = 12 by setting x + 3 = 12 or x - 2 = 12?",
        back: "NO! The Zero Product Property ONLY holds when the product equals ZERO. You must expand first: x² + x - 6 = 12 => x² + x - 18 = 0.",
        commonTrapNote: "Never apply the zero product property to non-zero constants."
      },
      {
        id: "fc-quad-5",
        skillId: "skill-quad-factoring",
        category: "revision",
        front: "What are the coordinates of the vertex of the parabola y = ax² + bx + c?",
        back: "x_v = -b / (2a), and y_v = f(-b / (2a)) = c - (b² / 4a).",
        formulaLatex: "x_v = -\\frac{b}{2a}"
      }
    ]
  },
  "deck-newton-mechanics": {
    id: "deck-newton-mechanics",
    skillId: "skill-phy-newtons-laws",
    unitId: "unit-phy-dynamics-energy",
    title: "Newton's Laws of Motion & Momentum Deck",
    subjectId: "sci_physics",
    level: "senior_secondary",
    cards: [
      {
        id: "fc-newton-1",
        skillId: "skill-phy-newtons-laws",
        category: "formula",
        front: "State Newton's Second Law in terms of momentum and constant mass:",
        back: "F_net = dp/dt. For constant mass m: F_net = ma.",
        formulaLatex: "\\vec{F}_{\\text{net}} = m \\vec{a}",
        hint: "Force is the time rate of change of linear momentum."
      },
      {
        id: "fc-newton-2",
        skillId: "skill-phy-newtons-laws",
        category: "misconception",
        front: "An object is moving at constant velocity in deep space. Does it require a continuous forward force?",
        back: "NO! Newton's First Law (Inertia) states an object maintains constant velocity unless acted upon by a net external force. Force causes acceleration, not motion itself.",
        commonTrapNote: "Aristotelian fallacy: confusing velocity with acceleration."
      },
      {
        id: "fc-newton-3",
        skillId: "skill-phy-newtons-laws",
        category: "concept",
        front: "What constitutes a true Newton's Third Law action-reaction pair?",
        back: "Two forces of equal magnitude and opposite direction acting on TWO DIFFERENT BODIES. (e.g. Earth pulls moon; moon pulls Earth).",
        examContext: "JAMB UTME Trap: Weight and normal force acting on the same book are NOT an action-reaction pair."
      },
      {
        id: "fc-newton-4",
        skillId: "skill-phy-newtons-laws",
        category: "definition",
        front: "Define Linear Impulse (J) and state the Impulse-Momentum Theorem:",
        back: "Impulse is the product of average force and time duration: J = F_avg × Δt. It equals the change in momentum: J = Δp = m(v - u).",
        formulaLatex: "J = F \\Delta t = \\Delta p"
      }
    ]
  },
  "deck-stoichiometry-mole": {
    id: "deck-stoichiometry-mole",
    skillId: "skill-chm-mole-stoichiometry",
    unitId: "unit-chm-stoichiometry",
    title: "Chemical Stoichiometry & The Mole Concept Deck",
    subjectId: "sci_chemistry",
    level: "senior_secondary",
    cards: [
      {
        id: "fc-chem-1",
        skillId: "skill-chm-mole-stoichiometry",
        category: "formula",
        front: "What are the 3 fundamental formulas for number of moles (n)?",
        back: "1. Mass: n = m / M (mass / molar mass)\n2. Particles: n = N / N_A (particles / 6.022 × 10²³)\n3. Gas at STP: n = V / 22.4 dm³",
        formulaLatex: "n = \\frac{m}{M} = \\frac{N}{N_A} = \\frac{V}{22.4}",
        hint: "Molar volume of ideal gas at STP = 22.4 L/mol."
      },
      {
        id: "fc-chem-2",
        skillId: "skill-chm-mole-stoichiometry",
        category: "exam_trap",
        front: "EXAM TRAP: Does 1 mole of O₂ gas have the same mass as 1 mole of O atoms?",
        back: "NO! 1 mole of O atoms = 16.0 g. 1 mole of diatomic O₂ molecules = 32.0 g. Always check whether the problem specifies atomic or molecular species.",
        commonTrapNote: "Diatomic gases (H₂, N₂, O₂, F₂, Cl₂, Br₂, I₂) have twice the atomic mass."
      },
      {
        id: "fc-chem-3",
        skillId: "skill-chm-mole-stoichiometry",
        category: "concept",
        front: "What is a Limiting Reactant?",
        back: "The reactant that is completely consumed first in a chemical reaction, thereby determining the maximum theoretical yield of products.",
        examContext: "WAEC WASSCE Practical Chemistry Calculation"
      }
    ]
  },
  "deck-dna-genetics": {
    id: "deck-dna-genetics",
    skillId: "skill-bio-dihybrid-sex-linkage-dna",
    unitId: "unit-bio-genetics-inheritance-biotech",
    title: "Genetics, DNA & Mendelian Crosses Deck",
    subjectId: "sci_biology",
    level: "senior_secondary",
    cards: [
      {
        id: "fc-bio-1",
        skillId: "skill-bio-dihybrid-sex-linkage-dna",
        category: "concept",
        front: "State the complementary base pairing rule in DNA double helix:",
        back: "Adenine (A) pairs with Thymine (T) via 2 hydrogen bonds. Guanine (G) pairs with Cytosine (C) via 3 hydrogen bonds.",
        formulaLatex: "A = T, \\quad G \\equiv C"
      },
      {
        id: "fc-bio-2",
        skillId: "skill-bio-dihybrid-sex-linkage-dna",
        category: "vocabulary",
        front: "Distinguish Phenotype from Genotype:",
        back: "Genotype: The genetic allele makeup of an organism (e.g. Bb, BB, bb).\nPhenotype: The observable physical or biochemical characteristic (e.g. Brown eyes, Sickle cell trait).",
        hint: "Genotype is in the DNA; phenotype is what is expressed."
      },
      {
        id: "fc-bio-3",
        skillId: "skill-bio-dihybrid-sex-linkage-dna",
        category: "exam_trap",
        front: "If two carrier parents for Sickle Cell Trait (AS × AS) have children, what is the probability of a child having Sickle Cell Anemia (SS)?",
        back: "1/4 or 25%. Cross: AA (25%), AS (50%), SS (25%).",
        commonTrapNote: "Each pregnancy has an independent 25% probability; previous children's genotypes do not change subsequent odds."
      }
    ]
  },
  "deck-economics-demand-supply": {
    id: "deck-economics-demand-supply",
    skillId: "skill-econ-equilibrium-shifts",
    unitId: "unit-econ-demand-supply",
    title: "Demand, Supply & Market Equilibrium Deck",
    subjectId: "comm_financial_lit",
    level: "senior_secondary",
    cards: [
      {
        id: "fc-econ-1",
        skillId: "skill-econ-equilibrium-shifts",
        category: "concept",
        front: "What is the difference between a change in Quantity Demanded and a change in Demand?",
        back: "Change in Quantity Demanded: Movement along existing curve caused SOLELY by price change.\nChange in Demand: Entire curve shifts left or right caused by non-price factors (income, preferences, substitutes).",
        examContext: "Universal Economics Examination Standard"
      },
      {
        id: "fc-econ-2",
        skillId: "skill-econ-equilibrium-shifts",
        category: "formula",
        front: "What is the formula for Price Elasticity of Demand (PED)?",
        back: "PED = (% Change in Quantity Demanded) / (% Change in Price) = (ΔQ/Q) / (ΔP/P).",
        formulaLatex: "\\text{PED} = \\frac{\\% \\Delta Q_d}{\\% \\Delta P} = \\frac{\\Delta Q / Q}{\\Delta P / P}",
        hint: "Values > 1 are price elastic; values < 1 are price inelastic."
      },
      {
        id: "fc-econ-3",
        skillId: "skill-econ-equilibrium-shifts",
        category: "misconception",
        front: "If the price of a good is set ABOVE the equilibrium clearing price, does a shortage or a surplus occur?",
        back: "A SURPLUS occurs! At higher prices, suppliers produce more (Qs rises) while consumers buy less (Qd drops), resulting in excess unsold inventory.",
        commonTrapNote: "Price above equilibrium = Surplus. Price below equilibrium = Shortage."
      }
    ]
  },
  "deck-financial-literacy-503020": {
    id: "deck-financial-literacy-503020",
    skillId: "skill-fin-50-30-20-budgeting",
    unitId: "unit-fin-budgeting-cashflow",
    title: "Personal Budgeting & Wealth Architecture Deck",
    subjectId: "comm_financial_lit",
    level: "senior_secondary",
    cards: [
      {
        id: "fc-fin-1",
        skillId: "skill-fin-50-30-20-budgeting",
        category: "concept",
        front: "State the percentage targets of the 50/30/20 Budgeting Rule:",
        back: "50% Needs: Essential living costs (rent, food, transport, medicine)\n30% Wants: Discretionary lifestyle (dining, entertainment, hobbies)\n20% Savings: Emergency fund, debt elimination, investments."
      },
      {
        id: "fc-fin-2",
        skillId: "skill-fin-50-30-20-budgeting",
        category: "definition",
        front: "What is the recommended size of an Emergency Fund?",
        back: "3 to 6 months of essential living expenses (Needs), held in a liquid, low-risk account.",
        hint: "Calculate 3 to 6 times monthly non-negotiable living costs."
      },
      {
        id: "fc-fin-3",
        skillId: "skill-fin-50-30-20-budgeting",
        category: "exam_trap",
        front: "Why is high-interest unsecured debt (e.g. 15% monthly predatory loan apps) considered toxic?",
        back: "At 15% compounded monthly, debt doubles in under 5 months. Paying interest on compounding interest erodes future earnings and prevents capital accumulation.",
        commonTrapNote: "Rule of 72: Doubling time ≈ 72 / Interest Rate."
      }
    ]
  },
  "deck-linear-algebra-matrices": {
    id: "deck-linear-algebra-matrices",
    skillId: "skill-uni-matrix-determinants",
    unitId: "unit-uni-linear-algebra",
    title: "Linear Algebra & Matrix Operations Deck",
    subjectId: "math_calculus",
    level: "university_prep",
    cards: [
      {
        id: "fc-mat-1",
        skillId: "skill-uni-matrix-determinants",
        category: "formula",
        front: "What is the determinant of a 2x2 matrix [[a, b], [c, d]]?",
        back: "det(A) = ad - bc. If det(A) = 0, the matrix is singular and has no inverse.",
        formulaLatex: "\\det(A) = ad - bc"
      },
      {
        id: "fc-mat-2",
        skillId: "skill-uni-matrix-determinants",
        category: "concept",
        front: "When is the matrix product AB defined?",
        back: "AB is defined if and only if the number of COLUMNS in A equals the number of ROWS in B (A has dimension m×k and B has dimension k×n). The product has dimension m×n.",
        hint: "Inner dimensions must match."
      },
      {
        id: "fc-mat-3",
        skillId: "skill-uni-matrix-determinants",
        category: "definition",
        front: "What is the Identity Matrix I?",
        back: "A square matrix with 1s on the main diagonal and 0s elsewhere. For any compatible matrix A: AI = IA = A.",
        formulaLatex: "I = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}"
      }
    ]
  },
  "deck-circle-geometry": {
    id: "deck-circle-geometry",
    skillId: "skill-circle-theorems",
    unitId: "unit-sss-circle-theorems",
    title: "Circle Theorems, Tangents & Cyclic Quadrilaterals Deck",
    subjectId: "math_geometry",
    level: "senior_secondary",
    cards: [
      {
        id: "fc-geo-1",
        skillId: "skill-circle-theorems",
        category: "concept",
        front: "State the relationship between angle subtended at center vs circumference:",
        back: "The angle subtended by an arc at the center of a circle is twice the angle subtended by the same arc at any point on the remaining circumference (θ_center = 2 × θ_circ).",
        examContext: "WAEC WASSCE Theory High-Yield"
      },
      {
        id: "fc-geo-2",
        skillId: "skill-circle-theorems",
        category: "exam_trap",
        front: "EXAM TRAP: What is the sum of opposite angles in a Cyclic Quadrilateral?",
        back: "Opposite angles sum to 180° (supplementary): ∠A + ∠C = 180° and ∠B + ∠D = 180°. Do NOT confuse this with adjacent angles.",
        commonTrapNote: "Only vertices that all touch the circle circumference qualify as a cyclic quadrilateral."
      },
      {
        id: "fc-geo-3",
        skillId: "skill-circle-theorems",
        category: "formula",
        front: "What is the Alternate Segment Theorem?",
        back: "The angle between a tangent and a chord through the point of contact equals the angle subtended by the chord in the alternate segment.",
        hint: "Look for the triangle inscribed inside the circle with one vertex at the tangent point."
      }
    ]
  },
  "deck-english-concord": {
    id: "deck-english-concord",
    skillId: "skill-eng-concord",
    unitId: "unit-eng-concord-syntax",
    title: "English Concord, Tenses & Subject-Verb Agreement Deck",
    subjectId: "lang_english",
    level: "senior_secondary",
    cards: [
      {
        id: "fc-eng-1",
        skillId: "skill-eng-concord",
        category: "concept",
        front: "How does the 'Rule of Proximity' apply to subjects joined by 'Neither... nor' or 'Either... or'?",
        back: "The verb agrees in number with the SUBJECT CLOSEST TO IT. Example: 'Neither the teacher nor the students were present', but 'Neither the students nor the teacher was present'.",
        examContext: "JAMB UTME English High-Frequency Trap"
      },
      {
        id: "fc-eng-2",
        skillId: "skill-eng-concord",
        category: "misconception",
        front: "Do intervening parenthetical phrases ('as well as', 'together with', 'accompanied by') change the verb number?",
        back: "NO! Parenthetical phrases do NOT change subject number. 'The captain, as well as his crew, was (not were) commended'. The grammatical subject remains the singular 'captain'.",
        commonTrapNote: "Ignore phrases between commas when identifying the true grammatical subject."
      },
      {
        id: "fc-eng-3",
        skillId: "skill-eng-concord",
        category: "exam_trap",
        front: "Is 'Each of the boys have a textbook' grammatically sound?",
        back: "NO! 'Each', 'Every', 'Either', and 'Neither' are grammatically SINGULAR when followed by 'of'. The correct sentence is: 'Each of the boys has a textbook'.",
        examContext: "WAEC Lexis & Structure Standard"
      }
    ]
  },
  "deck-chemistry-acids-bases": {
    id: "deck-chemistry-acids-bases",
    skillId: "skill-chm-ph-titrations",
    unitId: "unit-chm-acids-bases",
    title: "Acids, Bases, pH & Titration Stoichiometry Deck",
    subjectId: "sci_chemistry",
    level: "senior_secondary",
    cards: [
      {
        id: "fc-acid-1",
        skillId: "skill-chm-ph-titrations",
        category: "formula",
        front: "State the mathematical definitions of pH and pOH:",
        back: "pH = -log₁₀[H⁺] and pOH = -log₁₀[OH⁻]. At 25°C, pH + pOH = 14.0.",
        formulaLatex: "\\text{pH} = -\\log_{10}[\\text{H}^+], \\quad \\text{pH} + \\text{pOH} = 14",
        hint: "A solution with [H⁺] = 10⁻³ M has a pH of 3."
      },
      {
        id: "fc-acid-2",
        skillId: "skill-chm-ph-titrations",
        category: "concept",
        front: "What is the titration formula linking acid and base volumes and molarities?",
        back: "(C_a × V_a) / (C_b × V_b) = n_a / n_b, where n_a and n_b are the stoichiometric mole coefficients from the balanced chemical equation.",
        formulaLatex: "\\frac{C_a V_a}{C_b V_b} = \\frac{n_a}{n_b}",
        examContext: "WAEC Practical Chemistry Core"
      },
      {
        id: "fc-acid-3",
        skillId: "skill-chm-ph-titrations",
        category: "exam_trap",
        front: "EXAM TRAP: Does a neutral salt always produce a solution with pH = 7 in water?",
        back: "NO! Salts of strong acids + weak bases (e.g. NH₄Cl) undergo cationic hydrolysis to yield acidic solutions (pH < 7). Salts of weak acids + strong bases (e.g. CH₃COONa) yield basic solutions (pH > 7).",
        commonTrapNote: "Salt hydrolysis depends on the relative strength of parent acid and base."
      }
    ]
  },
  "deck-physics-circuits": {
    id: "deck-physics-circuits",
    skillId: "skill-phy-circuits-ohms-law",
    unitId: "unit-phy-electricity-magnetism",
    title: "Electric Current, Ohm's Law & Circuit Analysis Deck",
    subjectId: "sci_physics",
    level: "senior_secondary",
    cards: [
      {
        id: "fc-circ-1",
        skillId: "skill-phy-circuits-ohms-law",
        category: "formula",
        front: "State Ohm's Law and equivalent resistance formulas for Series and Parallel circuits:",
        back: "Ohm's Law: V = IR.\nSeries: R_total = R₁ + R₂ + ... + R_n.\nParallel: 1/R_total = 1/R₁ + 1/R₂ + ... + 1/R_n.",
        formulaLatex: "V = IR, \\quad R_{\\text{parallel}} = \\frac{R_1 R_2}{R_1 + R_2}"
      },
      {
        id: "fc-circ-2",
        skillId: "skill-phy-circuits-ohms-law",
        category: "concept",
        front: "State Kirchhoff's Current Law (KCL) and Voltage Law (KVL):",
        back: "KCL (Conservation of Charge): The algebraic sum of currents entering any circuit junction is zero (Σ I_in = Σ I_out).\nKVL (Conservation of Energy): The algebraic sum of all potential differences around any closed loop is zero (Σ V = 0).",
        examContext: "JAMB UTME Physics High-Yield"
      },
      {
        id: "fc-circ-3",
        skillId: "skill-phy-circuits-ohms-law",
        category: "misconception",
        front: "Does electric current get 'used up' as it flows through a light bulb?",
        back: "NO! Charge is conserved—the exact same amount of current leaves the bulb as enters it. What is transformed is electrical potential energy into heat and radiant light energy.",
        commonTrapNote: "Current is the rate of charge flow, not the energy consumed."
      }
    ]
  },
  "deck-biology-respiration": {
    id: "deck-biology-respiration",
    skillId: "skill-bio-enzymes-respiration",
    unitId: "unit-bio-physiology",
    title: "Cellular Respiration, Glycolysis & ATP Synthesis Deck",
    subjectId: "sci_biology",
    level: "senior_secondary",
    cards: [
      {
        id: "fc-resp-1",
        skillId: "skill-bio-enzymes-respiration",
        category: "concept",
        front: "What is the overall balanced equation for Aerobic Cellular Respiration?",
        back: "C₆H₁₂O₆ + 6O₂ => 6CO₂ + 6H₂O + 36-38 ATP.",
        formulaLatex: "\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\longrightarrow 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + 36\\text{ ATP}"
      },
      {
        id: "fc-resp-2",
        skillId: "skill-bio-enzymes-respiration",
        category: "definition",
        front: "Where do the 3 stages of aerobic respiration occur in eukaryotic cells?",
        back: "1. Glycolysis: Cytoplasm (anaerobic, produces 2 ATP net)\n2. Krebs (Citric Acid) Cycle: Mitochondrial matrix (produces 2 ATP, NADH, FADH₂)\n3. Electron Transport Chain & Chemiosmosis: Inner mitochondrial membrane / cristae (produces ~32-34 ATP).",
        hint: "Glycolysis does NOT require oxygen and occurs outside the mitochondria."
      },
      {
        id: "fc-resp-3",
        skillId: "skill-bio-enzymes-respiration",
        category: "exam_trap",
        front: "In human muscles under intense anaerobic exertion, what is pyruvate converted into?",
        back: "Lactic Acid (Lactate), regenerating NAD⁺ so glycolysis can continue producing ATP briefly. In yeast, anaerobic fermentation produces Ethanol and CO₂ instead.",
        commonTrapNote: "Human muscle cells NEVER produce ethanol during anaerobic respiration."
      }
    ]
  },
  "deck-computing-dsa": {
    id: "deck-computing-dsa",
    skillId: "skill-cs-stacks-queues-arrays",
    unitId: "unit-cs-data-structures-abstract-types",
    title: "Linear Data Structures: Stacks, Queues & Hash Maps Deck",
    subjectId: "comp_programming",
    level: "senior_secondary",
    cards: [
      {
        id: "fc-dsa-1",
        skillId: "skill-cs-stacks-queues-arrays",
        category: "concept",
        front: "Distinguish LIFO vs FIFO execution in Stacks and Queues:",
        back: "Stack: LIFO (Last-In, First-Out). Push and Pop operations happen at top. Used in call stacks, undo mechanisms, and parenthesis matching.\nQueue: FIFO (First-In, First-Out). Enqueue at rear, Dequeue from front. Used in print spoolers and CPU task scheduling.",
        hint: "Think of a stack of plates vs a line of people waiting for a bus."
      },
      {
        id: "fc-dsa-2",
        skillId: "skill-cs-stacks-queues-arrays",
        category: "formula",
        front: "What are the time complexities for push/pop in a Stack and lookup in a Hash Table?",
        back: "Stack push/pop: O(1) constant time.\nHash Table lookup/insertion: O(1) average time, O(n) worst case under severe hash collisions.",
        formulaLatex: "T(n) = O(1) \\quad \\text{(average)}"
      },
      {
        id: "fc-dsa-3",
        skillId: "skill-cs-stacks-queues-arrays",
        category: "exam_trap",
        front: "Why does array-based queue shifting cause an O(n) performance bottleneck?",
        back: "When the front element is removed from a standard array (shift), all subsequent n-1 elements must shift one memory slot forward. Using a Circular Buffer or Linked List maintains O(1) dequeue.",
        commonTrapNote: "Never use unshifted array slices for high-throughput queue processing."
      }
    ]
  },
  "deck-primary-fractions": {
    id: "deck-primary-fractions",
    skillId: "skill-frac-operations",
    unitId: "unit-foundations-numbers",
    title: "Primary Fractions, Decimals & Equivalence Deck",
    subjectId: "math_core",
    level: "upper_primary",
    cards: [
      {
        id: "fc-pf-1",
        skillId: "skill-frac-operations",
        category: "concept",
        front: "What do the Numerator and Denominator of a fraction represent?",
        back: "Denominator (bottom number): The total number of equal parts the whole is divided into.\nNumerator (top number): How many of those equal parts you actually have.",
        hint: "Denominator names the fraction family (like quarters or thirds)."
      },
      {
        id: "fc-pf-2",
        skillId: "skill-frac-operations",
        category: "exam_trap",
        front: "Can you add fractions with different denominators like 1/2 + 1/3 by adding 1+1 and 2+3?",
        back: "NO! Never add denominators! 1/2 + 1/3 does NOT equal 2/5. You must first find a common denominator (6): 3/6 + 2/6 = 5/6.",
        commonTrapNote: "Adding across denominators is the #1 primary mathematics error."
      },
      {
        id: "fc-pf-3",
        skillId: "skill-frac-operations",
        category: "definition",
        front: "Convert 3/4 into a Decimal and a Percentage:",
        back: "3/4 = 0.75 = 75%.",
        formulaLatex: "\\frac{3}{4} = 0.75 = 75\\%"
      }
    ]
  },
  "deck-pf-addition-regrouping": {
    id: "deck-pf-addition-regrouping",
    skillId: "skill-pf-addition-regrouping",
    unitId: "unit-pri-found-math-regrouping",
    title: "Primary Regrouping & Place Value Deck",
    subjectId: "math_core",
    level: "primary_foundations",
    cards: [
      {
        id: "fc-add-1",
        skillId: "skill-pf-addition-regrouping",
        category: "concept",
        front: "What is 'Regrouping' in two-digit addition?",
        back: "Regrouping means trading 10 single units for 1 ten, carrying the ten over into the Tens column when the units sum is 10 or more.",
        hint: "Think: 10 units = 1 ten bundle."
      },
      {
        id: "fc-add-2",
        skillId: "skill-pf-addition-regrouping",
        category: "exam_trap",
        front: "COMMON MISTAKE: Why is 27 + 35 NOT equal to 512?",
        back: "Because 7 + 5 = 12 cannot be written in the single units column. You must write 2 in the units place and carry 1 ten over to the tens column (1 + 2 + 3 = 6 tens, giving 62).",
        commonTrapNote: "Each column can only hold one digit (0–9)."
      },
      {
        id: "fc-add-3",
        skillId: "skill-pf-addition-regrouping",
        category: "formula",
        front: "In what direction must you ALWAYS add columns of numbers?",
        back: "Always add from RIGHT to LEFT, starting with the Units column first, then moving left to the Tens.",
        hint: "Right (Units) -> Left (Tens)."
      }
    ]
  },
  "deck-pf-forces-motion": {
    id: "deck-pf-forces-motion",
    skillId: "skill-pf-forces-motion",
    unitId: "unit-pri-found-stem-forces",
    title: "Forces, Gravity & Magnets Deck",
    subjectId: "sci_physics",
    level: "primary_foundations",
    cards: [
      {
        id: "fc-frc-1",
        skillId: "skill-pf-forces-motion",
        category: "definition",
        front: "What is a Force in simple science terms?",
        back: "A force is a PUSH or a PULL that can make an object move, speed up, slow down, stop, or change direction.",
        hint: "Push moves away; pull moves closer."
      },
      {
        id: "fc-frc-2",
        skillId: "skill-pf-forces-motion",
        category: "concept",
        front: "What does Gravity do to all objects on Earth?",
        back: "Gravity is an invisible pulling force that pulls all objects straight down toward the center of the Earth.",
        hint: "Why do dropped fruits fall to the ground?"
      },
      {
        id: "fc-frc-3",
        skillId: "skill-pf-forces-motion",
        category: "exam_trap",
        front: "Do magnets attract all metals like copper, gold, and aluminum?",
        back: "NO! Magnets only attract magnetic metals like IRON and STEEL. They do NOT attract aluminum cans, gold rings, or plastic.",
        commonTrapNote: "Not all metals are magnetic; only ferromagnetic metals like iron are attracted."
      }
    ]
  },
  "deck-jss-materials-safety": {
    id: "deck-jss-materials-safety",
    skillId: "skill-jss-materials-safety",
    unitId: "unit-jss-basic-tech-materials",
    title: "Basic Tech Materials & Workshop Safety Deck",
    subjectId: "tech_compsci",
    level: "junior_secondary",
    cards: [
      {
        id: "fc-mat-1",
        skillId: "skill-jss-materials-safety",
        category: "definition",
        front: "What is the defining difference between Ferrous and Non-Ferrous metals?",
        back: "Ferrous metals contain iron as their main constituent (magnetic, prone to rust). Non-ferrous metals contain NO iron (copper, aluminum, brass; non-magnetic, corrosion-resistant).",
        hint: "Latin 'ferrum' = iron."
      },
      {
        id: "fc-mat-2",
        skillId: "skill-jss-materials-safety",
        category: "exam_trap",
        front: "Is Balsa wood botanically a Hardwood or a Softwood?",
        back: "Botanically, Balsa is a HARDWOOD because it comes from a broad-leaved flowering angiosperm tree, even though its wood is physically very soft.",
        commonTrapNote: "Hardwood/Softwood is a botanical leaf/seed classification, not a measure of hardness."
      },
      {
        id: "fc-mat-3",
        skillId: "skill-jss-materials-safety",
        category: "concept",
        front: "What does PPE stand for and what are 3 essential workshop examples?",
        back: "Personal Protective Equipment: (1) Polycarbonate safety goggles for eyes, (2) Steel-toe boots for feet, (3) Heavy-duty aprons for torso protection.",
        hint: "PPE protects against flying swarf and dropped tools."
      }
    ]
  },
  "deck-jss-cell-organization": {
    id: "deck-jss-cell-organization",
    skillId: "skill-jss-cell-organization",
    unitId: "unit-jss-basic-science-cells",
    title: "Living Cells & Microorganisms Deck",
    subjectId: "sci_biology",
    level: "junior_secondary",
    cards: [
      {
        id: "fc-cel-1",
        skillId: "skill-jss-cell-organization",
        category: "concept",
        front: "What 3 structural organelles are found in Plant Cells but NOT in Animal Cells?",
        back: "(1) Rigid Cellulose Cell Wall, (2) Chloroplasts containing chlorophyll for photosynthesis, (3) Large Permanent Central Vacuole.",
        hint: "Plants need support without bones and make their own food."
      },
      {
        id: "fc-cel-2",
        skillId: "skill-jss-cell-organization",
        category: "definition",
        front: "What is the biological definition of a Disease Vector?",
        back: "A vector is a living organism (e.g. female Anopheles mosquito, tsetse fly) that carries and transmits an infectious pathogen from one host to another.",
        hint: "The vector transports the disease agent."
      },
      {
        id: "fc-cel-3",
        skillId: "skill-jss-cell-organization",
        category: "exam_trap",
        front: "Does the mosquito directly synthesize or 'cause' the malaria disease?",
        back: "NO! Malaria is caused by a protozoan parasite called Plasmodium. The female Anopheles mosquito is solely the transmission vector.",
        commonTrapNote: "Never confuse the biological pathogen (Plasmodium) with the insect vector (mosquito)."
      }
    ]
  }
};

