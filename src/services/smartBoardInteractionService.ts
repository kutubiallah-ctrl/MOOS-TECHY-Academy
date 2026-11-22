/**
 * MOOS ACADEMY — INTERACTIVE SMART BOARD INTERACTION SERVICE
 * 
 * Orchestrates:
 * 1. Mode transitions: WATCH -> INTERACT -> DO -> WATCH (seamless resume)
 * 2. Problem-solving stage progressions (Strategy -> Formula -> Substitution -> Calculation -> Verification -> Interpretation)
 * 3. 5-Level Socratic Hint Ladder
 * 4. Misconception diagnostic engine with pedagogical remediation
 * 5. Subject-specific interactive manipulatives for Math, Physics, Chem, Bio, CS, English, Engineering
 * 6. Telemetry and immutable audit logging for educational forensics
 */

import { auditService } from "./auditService";
import {
  InteractiveLessonState,
  InteractiveSmartBoardMode,
  ProblemSolvingPhase,
  InteractiveProblemStep,
  SmartBoardMisconceptionType,
  EvaluationOutcome,
  AdaptiveNextAction,
  SubjectManipulativeState,
  SocraticHintLevel
} from "../types/smartBoardInteraction";
import { smartBoardTopicLockService } from "./smartBoardTopicLockService";
import { SmartBoardLessonContext } from "../types/smartBoardTopicLock";

export class SmartBoardInteractionService {
  private static instance: SmartBoardInteractionService;

  public static getInstance(): SmartBoardInteractionService {
    if (!SmartBoardInteractionService.instance) {
      SmartBoardInteractionService.instance = new SmartBoardInteractionService();
    }
    return SmartBoardInteractionService.instance;
  }

  /**
   * Generates curriculum-aligned interactive problem steps for DO mode
   */
  public getProblemStepsForTopic(arg1: string, arg2: string, context?: SmartBoardLessonContext): InteractiveProblemStep[] {
    const text = `${arg1} ${arg2}`.toLowerCase();
    const tLower = text;
    const sLower = text;

    // Normalizing args: determine if arg1 is subject or arg2 is subject
    let subject = arg2;
    let topic = arg1;
    if (
      arg1.toLowerCase().includes("math") ||
      arg1.toLowerCase().includes("phys") ||
      arg1.toLowerCase().includes("chem") ||
      arg1.toLowerCase().includes("bio") ||
      arg1.toLowerCase().includes("comp") ||
      arg1.toLowerCase().includes("eng") ||
      arg1.toLowerCase().includes("econ")
    ) {
      subject = arg1;
      topic = arg2;
    }
    const category = smartBoardTopicLockService.determineSubjectCategory(subject, topic);

    // 0A. ACADEMIC ENGLISH & RHETORICAL DISCOURSE (Checked FIRST to prevent cross-contamination)
    if (category === "academic_english_discourse") {
      return [
        {
          id: "step-acad-1",
          phase: "strategy",
          title: "Step 1: Distinguish Defensible Academic Claim from Assertion",
          instruction: "Analyze the propositions below regarding technological integration in higher education. Identify the formulation that satisfies the criteria of an academic claim with calibrated epistemic hedging and empirical grounding.",
          availableOptions: [
            {
              id: "claim-hedged-optimal",
              label: "While automated analytics expand predictive retention insights, student success correlates predominantly with proactive faculty mentorship.",
              isCorrect: true,
              explanation: "Optimal academic claim: Couples a concessive clause ('While automated analytics...'), bounds scope, avoids absolutism, and establishes a clear correlation with faculty mentorship."
            },
            {
              id: "claim-unhedged-assertion",
              label: "Artificial intelligence will instantly solve all student retention failures across every university globally.",
              isCorrect: false,
              misconception: "invalid_strategy_choice",
              explanation: "Unhedged assertion trap: Uses absolutist words ('instantly solve all... every') without empirical qualification or boundary conditions."
            },
            {
              id: "claim-colloquial-informal",
              label: "Using computers on campus is super helpful and makes professors' jobs way easier.",
              isCorrect: false,
              misconception: "invalid_strategy_choice",
              explanation: "Informal register trap: Employs colloquial hyperbole ('super helpful', 'way easier') unsuitable for formal academic discourse."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Calibrated Modality", description: "Look for nuance", revealedContent: "Academic discourse favors calibrated modality (e.g. 'correlates', 'tends to', 'suggests') over categorical certainty ('always', 'never')." },
            { level: 2, title: "Hint 2: Dialectical Tension", description: "Concession", revealedContent: "Notice which option acknowledges an existing benefit before pivoting to its primary causal factor." },
            { level: 3, title: "Hint 3: Epistemic Hedging", description: "Scope delimitation", revealedContent: "Academic claims define their boundary conditions rather than asserting universal omnipotence." },
            { level: 4, title: "Hint 4: Register & Lexicon", description: "Disciplinary precision", revealedContent: "Look for disciplined terminology: 'automated analytics', 'predictive retention', 'proactive faculty mentorship'." },
            { level: 5, title: "Hint 5: Full Solution", description: "Optimal sentence", revealedContent: "Select the sentence beginning with 'While automated analytics expand...'." }
          ],
          workedSolution: "Defensible Academic Claim: 'While automated analytics expand predictive retention insights, student success correlates predominantly with proactive faculty mentorship.'"
        },
        {
          id: "step-acad-2",
          phase: "formula",
          title: "Step 2: Deconstruct Informal Fallacy & Causal Warrant",
          instruction: "An institutional report concludes: 'Because campus laptop distribution was implemented in September, the 12% rise in student graduation recorded in June is wholly caused by hardware provision.' Which informal fallacy invalidates this causal warrant?",
          availableOptions: [
            {
              id: "fallacy-post-hoc",
              label: "Post Hoc Ergo Propter Hoc (falsely equating chronological succession with exclusive causality)",
              isCorrect: true,
              explanation: "Correct fallacy diagnosis: Simply because laptop distribution preceded graduation gains does not prove causation; confounding factors (tutoring, curriculum overhauls) were not controlled."
            },
            {
              id: "fallacy-ad-hominem",
              label: "Argumentum Ad Hominem (attacking the character of the researcher)",
              isCorrect: false,
              misconception: "formula_misapplication",
              explanation: "Incorrect fallacy: No personal insults or attacks on character were made in the report."
            },
            {
              id: "fallacy-straw-man",
              label: "Straw Man Fallacy (caricaturing the counter-argument)",
              isCorrect: false,
              misconception: "formula_misapplication",
              explanation: "Incorrect fallacy: The claim did not misrepresent an opposing position; it committed an error of temporal causation."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Chronological Trap", description: "Time vs Cause", revealedContent: "The argument assumes that because Event B occurred after Event A, Event A must be the sole cause." },
            { level: 2, title: "Hint 2: Confounding Variables", description: "Alternative causes", revealedContent: "What other educational interventions might have occurred between September and June?" },
            { level: 3, title: "Hint 3: Latin Etymology", description: "Post hoc meaning", revealedContent: "'Post hoc ergo propter hoc' translates to 'After this, therefore because of this'." },
            { level: 4, title: "Hint 4: Epistemic Warrant", description: "Warrant testing", revealedContent: "A valid causal warrant requires isolating extraneous variables via control groups." },
            { level: 5, title: "Hint 5: Answer", description: "Post Hoc", revealedContent: "Choose 'Post Hoc Ergo Propter Hoc'." }
          ],
          workedSolution: "Fallacy: Post Hoc Ergo Propter Hoc. Chronological sequence does not substantiate exclusive causation without controlling for confounding educational variables."
        },
        {
          id: "step-acad-3",
          phase: "substitution",
          title: "Step 3: Dialectical Multi-Source Synthesis",
          instruction: "Source A (Adeyemi 2023) demonstrates 28% productivity gains from automated grading. Source B (Kowalski 2024) identifies significant reductions in nuanced qualitative feedback. Which formulation synthesizes both findings dialectically?",
          availableOptions: [
            {
              id: "synth-dialectical-balanced",
              label: "Whereas Adeyemi (2023) documents substantial throughput efficiencies in automated assessment, Kowalski's (2024) findings on diminished qualitative feedback suggest that automated scoring must be integrated with dialogic teacher commentary.",
              isCorrect: true,
              explanation: "Rigorous scholarly synthesis: Contrasts the two empirical perspectives using concessive syntax ('Whereas...') and constructs a higher-order pedagogical resolution."
            },
            {
              id: "synth-linear-listing",
              label: "Adeyemi (2023) says tech is good for grading. Also, Kowalski (2024) says feedback gets worse.",
              isCorrect: false,
              misconception: "substitution_sign_error",
              explanation: "Additive listing trap: Placing two summaries side by side with 'Also' does not constitute critical synthesis; it fails to reconcile theoretical tension."
            },
            {
              id: "synth-unsubstantiated-dismissal",
              label: "Because Kowalski disagreed with Adeyemi, both studies are entirely unscientific and should be discarded.",
              isCorrect: false,
              misconception: "substitution_sign_error",
              explanation: "False dichotomy trap: Disagreement between empirical researchers represents dialectical nuance, not immediate methodological invalidity."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Transcending Summary", description: "Synthesis vs Summary", revealedContent: "Synthesis is not simply listing Author A and Author B; it is discovering the higher-order reconciliation." },
            { level: 2, title: "Hint 2: Concessive Connectors", description: "Signposting", revealedContent: "Words like 'Whereas', 'Notwithstanding', and 'While' signal dialectical relationship between sources." },
            { level: 3, title: "Hint 3: Practical Resolution", description: "Theoretical bridge", revealedContent: "Look for an outcome that addresses both efficiency and qualitative depth simultaneously." },
            { level: 4, title: "Hint 4: Scholarly Ethos", description: "Academic tone", revealedContent: "Evaluate which option reads like a peer-reviewed literature review." },
            { level: 5, title: "Hint 5: Full Selection", description: "Synthesis sentence", revealedContent: "Select the option beginning with 'Whereas Adeyemi (2023) documents substantial throughput efficiencies...'." }
          ],
          workedSolution: "Scholarly Synthesis: 'Whereas Adeyemi (2023) documents substantial throughput efficiencies in automated assessment, Kowalski's (2024) findings on diminished qualitative feedback suggest that automated scoring must be integrated with dialogic teacher commentary.'"
        },
        {
          id: "step-acad-4",
          phase: "verification",
          title: "Step 4: Academic Register & Nominalization Verification",
          instruction: "Transform the colloquial observation: 'When universities put big money into digital libraries, students get much higher grades on their term papers' into disciplined academic prose using grammatical nominalization.",
          availableOptions: [
            {
              id: "reg-nominalized-optimal",
              label: "Institutional capital allocation toward digital repository infrastructure correlates significantly with elevated scholarly achievement in undergraduate research writing.",
              isCorrect: true,
              explanation: "Exemplary academic register: Nominalizes actions ('put big money' -> 'capital allocation'; 'get higher grades' -> 'elevated scholarly achievement') and maintains objective modality."
            },
            {
              id: "reg-hyperbolic",
              label: "Pouring massive funds into e-libraries miraculously turns all undergraduates into brilliant master writers.",
              isCorrect: false,
              misconception: "verification_tolerance_failure",
              explanation: "Hyperbolic trap: Words like 'pouring massive funds' and 'miraculously turns' violate objective academic register."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Nominalization", description: "Verbs to nouns", revealedContent: "Academic prose packages dynamic processes into abstract noun phrases (e.g. 'capital allocation')." },
            { level: 2, title: "Hint 2: Objectivity", description: "Impartiality", revealedContent: "Avoid sensationalist verbs like 'pouring' or 'miraculously'." },
            { level: 3, title: "Hint 3: Disciplinary Precision", description: "Scholarly lexicon", revealedContent: "'Undergraduate research writing' is more precise than 'term papers'." },
            { level: 4, title: "Hint 4: Modality", description: "Correlation", revealedContent: "'Correlates significantly' captures statistical association responsibly." },
            { level: 5, title: "Hint 5: Final Option", description: "Selection", revealedContent: "Select the option with 'Institutional capital allocation...'." }
          ],
          workedSolution: "Academic Transformation: 'Institutional capital allocation toward digital repository infrastructure correlates significantly with elevated scholarly achievement in undergraduate research writing.'"
        }
      ];
    }

    // 0B. LITERATURE & TEXTUAL ANALYSIS
    if (category === "literature") {
      return [
        {
          id: "step-lit-1",
          phase: "strategy",
          title: "Step 1: Textual Grounding & Critical Framework Selection",
          instruction: "In conducting a formalist close reading of a dramatic soliloquy, what is the mandatory primary step before drawing thematic conclusions?",
          availableOptions: [
            {
              id: "lit-strat-close-reading",
              label: "Isolate precise lexical choices, syntactical rhythms, and figurative devices within the text itself.",
              isCorrect: true,
              explanation: "Formalist close reading mandates establishing empirical textual evidence (diction, meter, rhetoric) before speculating on authorial biography or external themes."
            },
            {
              id: "lit-strat-biography-first",
              label: "Assume the character is an exact autobiographical reflection of the playwright's personal childhood.",
              isCorrect: false,
              misconception: "invalid_strategy_choice",
              explanation: "Biographical fallacy trap: Conflating dramatic persona with authorial autobiography ignores dramatic craft and convention."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Primacy of Text", description: "Focus on words", revealedContent: "Good literary analysis begins with the specific words chosen by the writer." },
            { level: 2, title: "Hint 2: Craft over Speculation", description: "Evidence", revealedContent: "Identify poetic meter, juxtaposition, and diction before making broad claims." },
            { level: 3, title: "Hint 3: Formalist Principle", description: "New Criticism", revealedContent: "The text itself contains the primary aesthetic and structural evidence." },
            { level: 4, title: "Hint 4: Technique", description: "Diction & syntax", revealedContent: "Look for lexical and syntactical isolation." },
            { level: 5, title: "Hint 5: Selection", description: "Direct answer", revealedContent: "Select 'Isolate precise lexical choices, syntactical rhythms, and figurative devices...'." }
          ],
          workedSolution: "Literary Strategy: Isolate internal lexical and syntactic evidence before formulating critical hypotheses."
        },
        {
          id: "step-lit-2",
          phase: "formula",
          title: "Step 2: Rhetorical & Figurative Craft Deconstruction",
          instruction: "Examine the dramatic line: 'I must be cruel only to be kind: Thus bad begins and worse remains behind.' (Hamlet, 3.4). Identify the primary figurative device and its dramatic function.",
          availableOptions: [
            {
              id: "lit-dev-paradox",
              label: "Oxymoron and Paradox ('cruel only to be kind') dramatizing the protagonist's profound ethical ambivalence.",
              isCorrect: true,
              explanation: "Correct deconstruction: The contradictory juxtaposition of 'cruel' and 'kind' encapsulates Hamlet's agonizing justification of filial duty against moral transgression."
            },
            {
              id: "lit-dev-hyperbole",
              label: "Simple hyperbole used purely for comedic entertainment of the groundlings.",
              isCorrect: false,
              misconception: "formula_misapplication",
              explanation: "Misconception: The line is tragic and philosophical, not comedic slapstick."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Apparent Contradiction", description: "Opposites", revealedContent: "How can someone be 'cruel' in order to be 'kind'? These are semantic antonyms." },
            { level: 2, title: "Hint 2: Literary Figure", description: "Paradox", revealedContent: "A statement that seems self-contradictory but reveals a deeper truth is a paradox." },
            { level: 3, title: "Hint 3: Character Motivation", description: "Hamlet's burden", revealedContent: "Hamlet believes he must chastise his mother to rescue her soul from spiritual damnation." },
            { level: 4, title: "Hint 4: Dramatic Function", description: "Ethical conflict", revealedContent: "The phrase exposes the internal schism between revenge and morality." },
            { level: 5, title: "Hint 5: Selection", description: "Answer", revealedContent: "Choose 'Oxymoron and Paradox ('cruel only to be kind')...'." }
          ],
          workedSolution: "Figurative Analysis: Oxymoron and Paradox ('cruel only to be kind') articulating ethical conflict."
        }
      ];
    }

    // 1. MATHEMATICS: Quadratic Equations / Algebra
    if (sLower.includes("math") || tLower.includes("quad") || tLower.includes("factor")) {
      return [
        {
          id: "step-math-1",
          phase: "strategy",
          title: "Step 1: Select Optimal Solution Strategy",
          instruction: "Examine the quadratic equation: 2x² + 7x + 3 = 0. Identify the most robust mathematical strategy to solve for x.",
          availableOptions: [
            {
              id: "strat-factoring",
              label: "Factoring by Splitting the Middle Term (ac = 6, b = 7)",
              isCorrect: true,
              explanation: "Optimal and exact: The product ac = (2)(3) = 6, and factors 6 and 1 sum to 7. This allows rational factorization."
            },
            {
              id: "strat-quadratic-formula",
              label: "Standard Quadratic Formula: x = (-b ± √(b² - 4ac)) / (2a)",
              isCorrect: true,
              explanation: "Universally valid for all quadratics: Guarantees exact real roots without ambiguity."
            },
            {
              id: "strat-linear-isolate",
              label: "Isolate x directly by subtracting 3 and dividing by 7",
              isCorrect: false,
              misconception: "concept_confusion",
              explanation: "Incorrect strategy: Direct isolation only works on linear equations ax + b = 0. Quadratic terms (x²) cannot be isolated linearly."
            },
            {
              id: "strat-ignore-a",
              label: "Factor as (x + 3)(x + 1) by ignoring the leading coefficient a = 2",
              isCorrect: false,
              misconception: "variable_substitution_error",
              explanation: "Incorrect: Ignoring the leading coefficient a = 2 yields x² + 4x + 3, which fundamentally changes the polynomial."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Reconsider Reasoning", description: "Look at the degree of the equation.", revealedContent: "The highest power is x², making this a second-degree polynomial." },
            { level: 2, title: "Hint 2: Conceptual Clue", description: "Check if ac has factor pairs.", revealedContent: "Product ac = (2)(3) = 6. Can you find two integers that multiply to 6 and add to 7?" },
            { level: 3, title: "Hint 3: Governing Principle", description: "Governing Law", revealedContent: "For ax² + bx + c = 0, either factor if b² - 4ac is a perfect square, or apply the quadratic formula." },
            { level: 4, title: "Hint 4: Intermediate Step", description: "Test factor pairs", revealedContent: "Factors of 6: 1 × 6. 1 + 6 = 7. Both factoring and quadratic formula are valid." },
            { level: 5, title: "Hint 5: Complete Guidance", description: "Worked selection", revealedContent: "Select either Factoring or the Quadratic Formula to proceed." }
          ],
          workedSolution: "Selected Strategy: Factoring or Quadratic Formula. ac = 6, sum = 7 -> split middle term as 6x + x."
        },
        {
          id: "step-math-2",
          phase: "formula",
          title: "Step 2: State Governing Equation",
          instruction: "Select the correct formula to compute the discriminant and determine the nature of the roots.",
          availableOptions: [
            {
              id: "form-disc",
              label: "Δ = b² - 4ac",
              latex: "\\Delta = b^2 - 4ac",
              isCorrect: true,
              explanation: "Correct: The discriminant Δ determines if the roots are real, repeated, or complex."
            },
            {
              id: "form-wrong-disc",
              label: "Δ = b² + 4ac",
              latex: "\\Delta = b^2 + 4ac",
              isCorrect: false,
              misconception: "sign_error",
              explanation: "Sign error: The standard formula subtracts 4ac, not adds."
            },
            {
              id: "form-no-square",
              label: "Δ = 2b - 4ac",
              latex: "\\Delta = 2b - 4ac",
              isCorrect: false,
              misconception: "formula_selection_error",
              explanation: "Formula error: b must be squared (b²), not multiplied by 2."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Sign Check", description: "Look at the sign inside the square root.", revealedContent: "Recall standard form ax² + bx + c = 0." },
            { level: 2, title: "Hint 2: Conceptual Clue", description: "Discriminant definition", revealedContent: "The discriminant is the expression under the radical in the quadratic formula." },
            { level: 3, title: "Hint 3: Formula Law", description: "Formula", revealedContent: "Δ = b² - 4ac" },
            { level: 4, title: "Hint 4: Values", description: "Substitute", revealedContent: "a = 2, b = 7, c = 3" },
            { level: 5, title: "Hint 5: Full Statement", description: "Answer", revealedContent: "Δ = 7² - 4(2)(3) = 49 - 24 = 25" }
          ],
          workedSolution: "Governing Formula: Δ = b² - 4ac"
        },
        {
          id: "step-math-3",
          phase: "substitution",
          title: "Step 3: Parameter Substitution",
          instruction: "Substitute a = 2, b = 7, c = 3 accurately into the Quadratic Formula: x = (-b ± √(b² - 4ac)) / (2a).",
          availableOptions: [
            {
              id: "sub-correct",
              label: "x = (-(7) ± √((7)² - 4(2)(3))) / (2(2))",
              latex: "x = \\frac{-(7) \\pm \\sqrt{7^2 - 4(2)(3)}}{2(2)}",
              isCorrect: true,
              explanation: "Flawless substitution: All signs and parenthetical values preserve their mathematical identity."
            },
            {
              id: "sub-sign-fail",
              label: "x = (7 ± √((7)² - 4(2)(3))) / (2(2))",
              latex: "x = \\frac{7 \\pm \\sqrt{7^2 - 4(2)(3)}}{2(2)}",
              isCorrect: false,
              misconception: "sign_error",
              explanation: "Sign error on leading term: The formula prescribes -b. Since b = 7, this must evaluate to -7, not +7."
            },
            {
              id: "sub-denom-fail",
              label: "x = (-(7) ± √((7)² - 4(2)(3))) / 2",
              latex: "x = \\frac{-(7) \\pm \\sqrt{7^2 - 4(2)(3)}}{2}",
              isCorrect: false,
              misconception: "variable_substitution_error",
              explanation: "Denominator substitution error: The denominator is 2a = 2(2) = 4, not simply 2."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Sign Invariant", description: "Check the sign of -b", revealedContent: "If b = +7, what is -b?" },
            { level: 2, title: "Hint 2: Denominator Check", description: "Check 2a", revealedContent: "Since a = 2, the denominator is 2 × 2." },
            { level: 3, title: "Hint 3: Full Setup", description: "Setup", revealedContent: "x = (-7 ± √(49 - 24)) / 4" },
            { level: 4, title: "Hint 4: Radical evaluation", description: "Radical", revealedContent: "√(25) = 5" },
            { level: 5, title: "Hint 5: Full Working", description: "Final", revealedContent: "x = (-7 ± 5) / 4" }
          ],
          workedSolution: "x = (-7 ± √(49 - 24)) / 4 = (-7 ± 5) / 4"
        },
        {
          id: "step-math-4",
          phase: "calculation",
          title: "Step 4: Algebraic Evaluation",
          instruction: "Compute both branches: x₁ = (-7 + 5) / 4 and x₂ = (-7 - 5) / 4.",
          availableOptions: [
            {
              id: "calc-correct",
              label: "x₁ = -2/4 = -1/2 (-0.5), and x₂ = -12/4 = -3",
              latex: "x_1 = -\\frac{1}{2}, \\quad x_2 = -3",
              isCorrect: true,
              explanation: "Accurate arithmetic: Both branches evaluated and reduced to lowest terms."
            },
            {
              id: "calc-sign-swap",
              label: "x₁ = +1/2, and x₂ = +3",
              latex: "x_1 = \\frac{1}{2}, \\quad x_2 = 3",
              isCorrect: false,
              misconception: "sign_error",
              explanation: "Sign inversion: You forgot that -7 is negative; -7 + 5 is -2, so -2/4 = -1/2."
            },
            {
              id: "calc-arithmetic",
              label: "x₁ = -1, and x₂ = -4",
              latex: "x_1 = -1, \\quad x_2 = -4",
              isCorrect: false,
              misconception: "wrong_operation_order",
              explanation: "Arithmetic division error: -2/4 is -0.5, not -1."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Numerator Addition", description: "Add -7 and 5", revealedContent: "-7 + 5 = -2" },
            { level: 2, title: "Hint 2: Numerator Subtraction", description: "Subtract 5 from -7", revealedContent: "-7 - 5 = -12" },
            { level: 3, title: "Hint 3: Divide by 4", description: "Divide", revealedContent: "-2/4 = -0.5 and -12/4 = -3" },
            { level: 4, title: "Hint 4: Decimal and Fraction", description: "Forms", revealedContent: "x = -1/2 or x = -3" },
            { level: 5, title: "Hint 5: Final roots", description: "Roots", revealedContent: "x ∈ {-0.5, -3}" }
          ],
          workedSolution: "x₁ = -0.5, x₂ = -3"
        },
        {
          id: "step-math-5",
          phase: "verification",
          title: "Step 5: Rigorous Verification",
          instruction: "Verify the root x = -3 by substituting back into original LHS: 2(-3)² + 7(-3) + 3.",
          availableOptions: [
            {
              id: "ver-correct",
              label: "2(9) + 7(-3) + 3 = 18 - 21 + 3 = 0 (LHS = RHS = 0, verified!)",
              isCorrect: true,
              explanation: "Exact verification: 18 - 21 + 3 = 0 identically matches the RHS."
            },
            {
              id: "ver-square-neg",
              label: "2(-9) - 21 + 3 = -18 - 21 + 3 = -36 ≠ 0",
              isCorrect: false,
              misconception: "sign_error",
              explanation: "Sign error: (-3)² is +9, because a negative multiplied by a negative is positive."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Square rule", description: "Square of negative", revealedContent: "Remember (-3)² = +9." },
            { level: 2, title: "Hint 2: Product rule", description: "Multiply", revealedContent: "2 × 9 = 18 and 7 × (-3) = -21." },
            { level: 3, title: "Hint 3: Sum", description: "Combine", revealedContent: "18 - 21 + 3 = 0." },
            { level: 4, title: "Hint 4: Identity", description: "Equality", revealedContent: "LHS = RHS." },
            { level: 5, title: "Hint 5: Full statement", description: "Complete", revealedContent: "Roots are verified." }
          ],
          workedSolution: "2(-3)² + 7(-3) + 3 = 18 - 21 + 3 = 0 (Verified)"
        },
        {
          id: "step-math-6",
          phase: "interpretation",
          title: "Step 6: Boxed Academic Conclusion",
          instruction: "State the final solution set according to WAEC / Cambridge examination standards.",
          availableOptions: [
            {
              id: "concl-correct",
              label: "Solution set: x ∈ {-3, -1/2}. The parabola intersects the x-axis at (-3, 0) and (-0.5, 0).",
              isCorrect: true,
              explanation: "Full marks: Clear solution set with geometric interpretation."
            },
            {
              id: "concl-incomplete",
              label: "x = -3 only, discarding the fractional root",
              isCorrect: false,
              misconception: "concept_confusion",
              explanation: "Incomplete: Fractional roots are completely valid real numbers. Quadratics have two roots unless Δ = 0."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Fundamental Theorem", description: "Degree 2", revealedContent: "A degree 2 polynomial has 2 roots." },
            { level: 2, title: "Hint 2: Form", description: "Set notation", revealedContent: "x ∈ {-3, -0.5}" },
            { level: 3, title: "Hint 3: Both roots", description: "Complete", revealedContent: "Include both rational roots." },
            { level: 4, title: "Hint 4: Coordinate form", description: "Roots", revealedContent: "x = -3 and x = -0.5" },
            { level: 5, title: "Hint 5: Final statement", description: "Full marks", revealedContent: "x ∈ {-3, -1/2}" }
          ],
          workedSolution: "x ∈ {-3, -1/2}"
        }
      ];
    }

    // 2. PHYSICS: Kinematics / Projectiles
    if (sLower.includes("phys") || tLower.includes("projectile") || tLower.includes("motion") || tLower.includes("vector")) {
      return [
        {
          id: "step-phys-1",
          phase: "strategy",
          title: "Step 1: Coordinate Decomposition Strategy",
          instruction: "A projectile is launched at speed u = 20 m/s at angle θ = 30° above the horizontal (g = 9.8 m/s²). Select the correct physics strategy.",
          availableOptions: [
            {
              id: "phys-strat-2d",
              label: "Decompose into independent orthogonal motions: Horizontal (constant velocity) and Vertical (uniform acceleration -g)",
              isCorrect: true,
              explanation: "Correct Galileo principle: Horizontal and vertical motions are completely independent."
            },
            {
              id: "phys-strat-1d",
              label: "Treat entire motion as 1D linear acceleration using v = u + at directly along the trajectory arc",
              isCorrect: false,
              misconception: "concept_confusion",
              explanation: "Violation of vector mechanics: Acceleration due to gravity acts strictly vertically, not along the curved path."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Vector Independence", description: "Orthogonal axes", revealedContent: "Does gravity affect horizontal motion?" },
            { level: 2, title: "Hint 2: Forces", description: "Gravity direction", revealedContent: "Gravity acts strictly vertically downward." },
            { level: 3, title: "Hint 3: 2D Motion", description: "Components", revealedContent: "ax = 0, ay = -g" },
            { level: 4, title: "Hint 4: Velocities", description: "Split", revealedContent: "vx = u cos θ, vy = u sin θ - gt" },
            { level: 5, title: "Hint 5: Decision", description: "Solution", revealedContent: "Always decompose into horizontal and vertical components." }
          ],
          workedSolution: "Decompose into orthogonal axes: ax = 0, ay = -g."
        },
        {
          id: "step-phys-2",
          phase: "formula",
          title: "Step 2: Maximum Height Governing Law",
          instruction: "Select the formula for the maximum height H attained by the projectile where vertical velocity vy = 0.",
          availableOptions: [
            {
              id: "phys-form-h",
              label: "H = (u² sin²θ) / (2g)",
              latex: "H = \\frac{u^2 \\sin^2\\theta}{2g}",
              isCorrect: true,
              explanation: "Correct: Derived from v_y² = u_y² - 2gH with v_y = 0."
            },
            {
              id: "phys-form-wrong-h",
              label: "H = (u sinθ) / g",
              latex: "H = \\frac{u \\sin\\theta}{g}",
              isCorrect: false,
              misconception: "formula_selection_error",
              explanation: "Dimension error: (u sinθ)/g has dimensions of time (seconds), which is the time to reach maximum height, not the height itself."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Dimension Check", description: "Units", revealedContent: "Height must be in meters (m), not seconds." },
            { level: 2, title: "Hint 2: Energy Law", description: "Potential energy", revealedContent: "mgh = 1/2 m (u_y)²." },
            { level: 3, title: "Hint 3: Formula", description: "Law", revealedContent: "H = (u² sin²θ) / (2g)" },
            { level: 4, title: "Hint 4: Substitution ready", description: "Values", revealedContent: "u = 20, θ = 30°, g = 9.8" },
            { level: 5, title: "Hint 5: Full Formula", description: "Selected", revealedContent: "H = (u² sin²θ) / (2g)" }
          ],
          workedSolution: "H = (u² sin²θ) / (2g)"
        },
        {
          id: "step-phys-3",
          phase: "calculation",
          title: "Step 3: Substitution & Calculation",
          instruction: "Evaluate H with u = 20 m/s, θ = 30° (sin 30° = 0.5), and g = 9.8 m/s².",
          availableOptions: [
            {
              id: "phys-calc-correct",
              label: "H = (20² × 0.5²) / (2 × 9.8) = (400 × 0.25) / 19.6 = 100 / 19.6 ≈ 5.10 m",
              isCorrect: true,
              explanation: "Exact calculation: (100) / 19.6 = 5.102 m."
            },
            {
              id: "phys-calc-forgot-square",
              label: "H = (20 × 0.5) / 19.6 = 10 / 19.6 ≈ 0.51 m",
              isCorrect: false,
              misconception: "wrong_operation_order",
              explanation: "Forgot to square the initial velocity u: 20² is 400, not 20."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Square term", description: "20²", revealedContent: "20² = 400" },
            { level: 2, title: "Hint 2: Trig value", description: "sin 30°", revealedContent: "sin 30° = 0.5, so 0.5² = 0.25" },
            { level: 3, title: "Hint 3: Numerator", description: "Product", revealedContent: "400 × 0.25 = 100" },
            { level: 4, title: "Hint 4: Denominator", description: "2g", revealedContent: "2 × 9.8 = 19.6" },
            { level: 5, title: "Hint 5: Quotient", description: "Division", revealedContent: "100 / 19.6 = 5.10 m" }
          ],
          workedSolution: "H ≈ 5.10 m"
        }
      ];
    }

    // 3. CHEMISTRY: Stoichiometry / Acid-Base Titration
    if (sLower.includes("chem") || tLower.includes("titrat") || tLower.includes("stoich")) {
      return [
        {
          id: "step-chem-1",
          phase: "strategy",
          title: "Step 1: Stoichiometric Molar Ratio",
          instruction: "In a titration of H₂SO₄ with NaOH: H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. What is the molar stoichiometric ratio of acid to base (n_a : n_b)?",
          availableOptions: [
            {
              id: "chem-ratio-1-2",
              label: "1 mole H₂SO₄ reacts with 2 moles NaOH (n_a = 1, n_b = 2)",
              isCorrect: true,
              explanation: "Correct: Sulfuric acid is diprotic; each mole releases 2 protons (H⁺), requiring 2 moles of hydroxide (OH⁻)."
            },
            {
              id: "chem-ratio-1-1",
              label: "1 : 1 equimolar ratio assuming all acid-base titrations are 1:1",
              isCorrect: false,
              misconception: "concept_confusion",
              explanation: "Diprotic error: H₂SO₄ produces 2 H⁺ ions, so it requires 2 equivalents of NaOH. Assuming 1:1 loses 50% of marks."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Stoichiometric Coefficients", description: "Check equation", revealedContent: "Look at the coefficient in front of NaOH in the balanced equation." },
            { level: 2, title: "Hint 2: Protons", description: "Basicity of acid", revealedContent: "H₂SO₄ has two replaceable hydrogen atoms." },
            { level: 3, title: "Hint 3: Ratio", description: "Mole Ratio", revealedContent: "n_a / n_b = 1 / 2" },
            { level: 4, title: "Hint 4: Titration formula", description: "Formula", revealedContent: "(C_a V_a) / (C_b V_b) = n_a / n_b" },
            { level: 5, title: "Hint 5: Final", description: "Result", revealedContent: "n_a = 1, n_b = 2" }
          ],
          workedSolution: "Molar ratio: n_a = 1, n_b = 2"
        },
        {
          id: "step-chem-2",
          phase: "formula",
          title: "Step 2: Titration Concentration Formula",
          instruction: "Select the correct formula to calculate unknown base concentration C_b given C_a, V_a, and V_b.",
          availableOptions: [
            {
              id: "chem-form-correct",
              label: "C_b = (C_a × V_a × n_b) / (V_b × n_a)",
              latex: "C_b = \\frac{C_a V_a n_b}{V_b n_a}",
              isCorrect: true,
              explanation: "Correct: Derived from (C_a V_a) / (C_b V_b) = n_a / n_b."
            },
            {
              id: "chem-form-flipped",
              label: "C_b = (C_a × V_a × n_a) / (V_b × n_b)",
              isCorrect: false,
              misconception: "variable_substitution_error",
              explanation: "Inverted mole ratio: Cross multiplication places n_b with C_a V_a."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Cross multiply", description: "Proportion", revealedContent: "C_a V_a n_b = C_b V_b n_a" },
            { level: 2, title: "Hint 2: Isolate C_b", description: "Divide", revealedContent: "Divide both sides by V_b n_a." },
            { level: 3, title: "Hint 3: Formula", description: "Expression", revealedContent: "C_b = (C_a V_a n_b) / (V_b n_a)" },
            { level: 4, title: "Hint 4: Values", description: "Prepare", revealedContent: "Substitute given titration volumes." },
            { level: 5, title: "Hint 5: Full Formula", description: "Complete", revealedContent: "C_b = (C_a V_a n_b) / (V_b n_a)" }
          ],
          workedSolution: "C_b = (C_a V_a n_b) / (V_b n_a)"
        },
        {
          id: "step-chem-3",
          phase: "calculation",
          title: "Step 3: Quantitative Concentration Calculation",
          instruction: "Calculate C_b when 25.0 cm³ of 0.10 M H₂SO₄ completely neutralizes 20.0 cm³ of NaOH solution.",
          availableOptions: [
            {
              id: "chem-calc-correct",
              label: "C_b = (0.10 × 25.0 × 2) / (20.0 × 1) = 5.0 / 20.0 = 0.25 M",
              isCorrect: true,
              explanation: "Correct calculation: Concentration of NaOH is 0.25 mol/dm³."
            },
            {
              id: "chem-calc-wrong-ratio",
              label: "C_b = (0.10 × 25.0 × 1) / (20.0 × 2) = 2.5 / 40.0 = 0.0625 M",
              isCorrect: false,
              misconception: "variable_substitution_error",
              explanation: "Inverted stoichiometric ratio error."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Numerator", description: "Values", revealedContent: "C_a × V_a × n_b = 0.1 × 25 × 2 = 5.0" },
            { level: 2, title: "Hint 2: Denominator", description: "Values", revealedContent: "V_b × n_a = 20 × 1 = 20.0" },
            { level: 3, title: "Hint 3: Division", description: "Quotient", revealedContent: "5.0 / 20.0 = 0.25" },
            { level: 4, title: "Hint 4: Units", description: "Concentration", revealedContent: "mol/dm³ or Molar (M)" },
            { level: 5, title: "Hint 5: Full Solution", description: "Complete", revealedContent: "C_b = 0.25 M" }
          ],
          workedSolution: "C_b = 0.25 mol/dm³"
        }
      ];
    }

    // 4. BIOLOGY: Mitosis / Cell Division
    if (sLower.includes("bio") || tLower.includes("mitos") || tLower.includes("cell")) {
      return [
        {
          id: "step-bio-1",
          phase: "strategy",
          title: "Step 1: Sequence Cell Division Stages",
          instruction: "Arrange the chronological order of somatic nuclear division (Mitosis).",
          availableOptions: [
            {
              id: "bio-order-pmat",
              label: "Prophase → Metaphase → Anaphase → Telophase (PMAT)",
              isCorrect: true,
              explanation: "Correct: Condensation (P), equatorial alignment (M), sister chromatid disjunction (A), and nuclear envelope reformation (T)."
            },
            {
              id: "bio-order-wrong",
              label: "Metaphase → Prophase → Telophase → Anaphase",
              isCorrect: false,
              misconception: "concept_confusion",
              explanation: "Incorrect chronological sequence: Chromosomes cannot align at the equator before condensing in prophase."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Mnemonic", description: "PMAT", revealedContent: "Remember the classical acronym PMAT." },
            { level: 2, title: "Hint 2: Alignment", description: "Metaphase", revealedContent: "Meta = Middle. Chromosomes align at the equatorial plate in Metaphase." },
            { level: 3, title: "Hint 3: Separation", description: "Anaphase", revealedContent: "Ana = Away. Sister chromatids move to opposite poles in Anaphase." },
            { level: 4, title: "Hint 4: Telophase", description: "End", revealedContent: "Telo = End. Two nuclei reform." },
            { level: 5, title: "Hint 5: Full Sequence", description: "Complete", revealedContent: "Prophase -> Metaphase -> Anaphase -> Telophase" }
          ],
          workedSolution: "Sequence: Prophase -> Metaphase -> Anaphase -> Telophase"
        },
        {
          id: "step-bio-2",
          phase: "interpretation",
          title: "Step 2: Ploidy Invariance",
          instruction: "If a human somatic parent cell has 46 chromosomes (2n = 46), what is the chromosome count in each daughter cell following mitosis?",
          availableOptions: [
            {
              id: "bio-ploidy-46",
              label: "46 chromosomes (2n, genetically identical diploid daughter cells)",
              isCorrect: true,
              explanation: "Correct: Mitosis is equational division. It preserves diploid chromosome number exactly."
            },
            {
              id: "bio-ploidy-23",
              label: "23 chromosomes (n, haploid)",
              isCorrect: false,
              misconception: "concept_confusion",
              explanation: "Meiosis confusion: Halving chromosome number (reduction division) occurs in meiosis during gametogenesis, not mitosis."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Cell Type", description: "Somatic vs Gamete", revealedContent: "Is this somatic growth or gamete formation?" },
            { level: 2, title: "Hint 2: Equational Division", description: "Conservation", revealedContent: "Mitosis preserves exact genetic copies." },
            { level: 3, title: "Hint 3: Ploidy", description: "2n", revealedContent: "Diploid (2n) remains Diploid (2n)." },
            { level: 4, title: "Hint 4: Human number", description: "Total", revealedContent: "2n = 46" },
            { level: 5, title: "Hint 5: Result", description: "Complete", revealedContent: "Each daughter cell contains 46 chromosomes." }
          ],
          workedSolution: "Ploidy: 2n = 46 (Equational division)"
        }
      ];
    }

    // 5. COMPUTER SCIENCE: Binary Search / Algorithms
    if (sLower.includes("comp") || sLower.includes("ict") || tLower.includes("search") || tLower.includes("algo")) {
      return [
        {
          id: "step-cs-1",
          phase: "strategy",
          title: "Step 1: Algorithmic Invariant Prerequisite",
          instruction: "Before applying Binary Search on an array of n items, what critical prerequisite invariant must be satisfied?",
          availableOptions: [
            {
              id: "cs-prereq-sorted",
              label: "The array must be strictly ordered/sorted in ascending or descending sequence",
              isCorrect: true,
              explanation: "Essential invariant: Binary search relies on monotonicity to eliminate half the search space at each comparison O(log n)."
            },
            {
              id: "cs-prereq-power2",
              label: "The array size n must be an exact power of 2",
              isCorrect: false,
              misconception: "algorithmic_reasoning_error",
              explanation: "False requirement: Binary search works on any array size n via integer division ⌊(low + high)/2⌋."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Order", description: "Arrangement", revealedContent: "Can you eliminate half of unsorted numbers?" },
            { level: 2, title: "Hint 2: Decision rule", description: "Comparison", revealedContent: "If target > arr[mid], where does target reside?" },
            { level: 3, title: "Hint 3: Prerequisite", description: "Ordering", revealedContent: "The collection must be sorted." },
            { level: 4, title: "Hint 4: Complexity", description: "Efficiency", revealedContent: "O(log n) requires monotonic ordering." },
            { level: 5, title: "Hint 5: Final", description: "Requirement", revealedContent: "Sorted array is mandatory." }
          ],
          workedSolution: "Array must be sorted."
        },
        {
          id: "step-cs-2",
          phase: "calculation",
          title: "Step 2: Midpoint Calculation & Pointer Update",
          instruction: "In array of size 10 (indices 0..9), low = 0, high = 9. If target (23) > arr[mid] (16 where mid = 4), how are pointers updated for the next iteration?",
          availableOptions: [
            {
              id: "cs-ptr-correct",
              label: "low = mid + 1 = 5, high remains 9",
              isCorrect: true,
              explanation: "Correct pointer update: Since arr[mid] is smaller than target, target must lie in upper half [5..9]."
            },
            {
              id: "cs-ptr-infinite-loop",
              label: "low = mid = 4, high remains 9",
              isCorrect: false,
              misconception: "algorithmic_reasoning_error",
              explanation: "Off-by-one infinite loop bug: Failing to advance low to mid + 1 causes infinite loops when high - low = 1."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Exclude mid", description: "Eliminate checked index", revealedContent: "We already know arr[mid] != target." },
            { level: 2, title: "Hint 2: Upper boundary", description: "Next start", revealedContent: "Start search at mid + 1." },
            { level: 3, title: "Hint 3: Pointers", description: "Assignment", revealedContent: "low = mid + 1" },
            { level: 4, title: "Hint 4: Values", description: "Indices", revealedContent: "low = 4 + 1 = 5, high = 9" },
            { level: 5, title: "Hint 5: Final", description: "State", revealedContent: "Search space is now indices [5..9]." }
          ],
          workedSolution: "low = mid + 1 = 5, high = 9"
        }
      ];
    }

    // 6. ENGLISH: Concord & Grammar
    if ((sLower.includes("english") || sLower === "eng" || tLower.includes("grammar") || tLower.includes("concord") || tLower.includes("syntax")) && !sLower.includes("engineer")) {
      return [
        {
          id: "step-eng-1",
          phase: "strategy",
          title: "Step 1: Grammatical Subject Isolation",
          instruction: "Identify the true grammatical subject in: 'The quality of these educational textbooks [is / are] outstanding.'",
          availableOptions: [
            {
              id: "eng-subj-quality",
              label: "'quality' (singular head noun phrase)",
              isCorrect: true,
              explanation: "Correct syntax: 'of these educational textbooks' is an intervening prepositional post-modifier. The head noun is singular 'quality'."
            },
            {
              id: "eng-subj-textbooks",
              label: "'textbooks' (plural noun nearest to the verb)",
              isCorrect: false,
              misconception: "grammar_proximity_error",
              explanation: "Proximity Concord Trap: The verb must agree with the head noun of the subject, NOT with the noun inside the prepositional phrase."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Prepositional Phrase", description: "Filter modifiers", revealedContent: "Ignore the prepositional phrase 'of these educational textbooks'." },
            { level: 2, title: "Hint 2: Head Noun", description: "Find subject core", revealedContent: "What is outstanding? The quality." },
            { level: 3, title: "Hint 3: Number Agreement", description: "Singular", revealedContent: "'Quality' is singular." },
            { level: 4, title: "Hint 4: Verb selection", description: "Agreement", revealedContent: "Singular subject takes singular verb 'is'." },
            { level: 5, title: "Hint 5: Final", description: "Full Rule", revealedContent: "The subject is 'quality' -> 'is'." }
          ],
          workedSolution: "Subject: 'quality' (singular)"
        },
        {
          id: "step-eng-2",
          phase: "substitution",
          title: "Step 2: Correct Verb Inflection",
          instruction: "Choose the grammatically correct auxiliary verb.",
          availableOptions: [
            {
              id: "eng-verb-is",
              label: "is ('The quality of these educational textbooks IS outstanding.')",
              isCorrect: true,
              explanation: "Concord rule verified: Singular subject 'quality' requires singular 3rd person singular verb 'is'."
            },
            {
              id: "eng-verb-are",
              label: "are ('The quality of these educational textbooks ARE outstanding.')",
              isCorrect: false,
              misconception: "grammar_proximity_error",
              explanation: "Concord error: 'Are' incorrectly agrees with plural 'textbooks', violating standard English syntax rules."
            }
          ],
          hints: [
            { level: 1, title: "Hint 1: Number", description: "Singular verb", revealedContent: "Subject is singular." },
            { level: 2, title: "Hint 2: Choice", description: "is vs are", revealedContent: "Singular takes 'is'." },
            { level: 3, title: "Hint 3: Test", description: "Substitution", revealedContent: "'It is outstanding', not 'It are outstanding'." },
            { level: 4, title: "Hint 4: Full sentence", description: "Sentence", revealedContent: "'The quality... is outstanding.'" },
            { level: 5, title: "Hint 5: Complete", description: "Answer", revealedContent: "Use 'is'." }
          ],
          workedSolution: "'is' (Singular concord)"
        }
      ];
    }

    // 7. ENGINEERING: Statics / Mechanics of Materials
    return [
      {
        id: "step-engr-1",
        phase: "strategy",
        title: "Step 1: Equilibrium Equations Strategy",
        instruction: "For a simply supported beam of span L with central point load P, state the equilibrium condition for static rest.",
        availableOptions: [
          {
            id: "engr-strat-equil",
            label: "ΣFx = 0, ΣFy = 0, and ΣM = 0 (Newton's 1st Law in 2D statics)",
            isCorrect: true,
            explanation: "Complete static equilibrium: Net forces in both axes and net moment about any pivot must equal zero."
          },
          {
            id: "engr-strat-incomplete",
            label: "ΣFy = 0 only, without considering rotational moment equilibrium",
            isCorrect: false,
            misconception: "concept_confusion",
            explanation: "Rotational failure: A structure can have zero net vertical force yet experience angular acceleration if moments do not balance."
          }
        ],
        hints: [
          { level: 1, title: "Hint 1: Degrees of freedom", description: "Translation and rotation", revealedContent: "Must resist both translation and rotation." },
          { level: 2, title: "Hint 2: Moment", description: "Torque equilibrium", revealedContent: "ΣM = 0 is required." },
          { level: 3, title: "Hint 3: Statics laws", description: "Three equations", revealedContent: "ΣFx = 0, ΣFy = 0, ΣM = 0." },
          { level: 4, title: "Hint 4: Symmetry", description: "Reactions", revealedContent: "Due to central loading, R_A = R_B = P/2." },
          { level: 5, title: "Hint 5: Complete", description: "Answer", revealedContent: "Three static equilibrium equations." }
        ],
        workedSolution: "Equilibrium: ΣFx = 0, ΣFy = 0, ΣM = 0"
      },
      {
        id: "step-engr-2",
        phase: "calculation",
        title: "Step 2: Maximum Bending Moment",
        instruction: "Given span L = 6 m and point load P = 10 kN at midspan, calculate maximum bending moment M_max = (P × L) / 4.",
        availableOptions: [
          {
            id: "engr-m-correct",
            label: "M_max = (10 kN × 6 m) / 4 = 60 / 4 = 15 kN·m",
            isCorrect: true,
            explanation: "Exact static moment: M_max occurs at midspan beneath the concentrated load."
          },
          {
            id: "engr-m-forgot-div4",
            label: "M_max = 10 × 6 = 60 kN·m",
            isCorrect: false,
            misconception: "formula_selection_error",
            explanation: "Formula error: 60 kN·m is P × L without the simply-supported factor of 1/4."
          }
        ],
        hints: [
          { level: 1, title: "Hint 1: Formula", description: "Simply supported midspan", revealedContent: "M_max = (P × L) / 4" },
          { level: 2, title: "Hint 2: Product", description: "P × L", revealedContent: "10 × 6 = 60" },
          { level: 3, title: "Hint 3: Division", description: "Divide by 4", revealedContent: "60 / 4 = 15" },
          { level: 4, title: "Hint 4: Units", description: "Moment units", revealedContent: "kiloNewton-meters (kN·m)" },
          { level: 5, title: "Hint 5: Result", description: "Complete", revealedContent: "M_max = 15 kN·m" }
        ],
        workedSolution: "M_max = 15 kN·m"
      }
    ];
  }

  /**
   * Initializes subject-specific interactive manipulative state for INTERACT mode
   */
  public getSubjectManipulativeState(subject: string, topic: string): SubjectManipulativeState {
    const text = `${subject} ${topic}`.toLowerCase();
    const sLower = text;
    const tLower = text;
    const category = smartBoardTopicLockService.determineSubjectCategory(subject, topic);

    // 0A. ACADEMIC ENGLISH & RHETORICAL DISCOURSE
    if (category === "academic_english_discourse") {
      return {
        subject: "english",
        title: "Scholarly Rhetoric & Dialectical Synthesis Workbench",
        conceptName: "Multi-Source Literature Synthesis & Fallacy Deconstruction Lab",
        parameters: {
          dialecticMode: "concession_synthesis",
          sourceAWeight: 50,
          sourceBWeight: 50,
          hedgingIntensity: "calibrated"
        },
        computedOutputs: {
          thesisStatement: "While automated analytics expand research velocity, methodological rigor requires proactive human peer evaluation.",
          concessiveClause: "Whereas quantitative analytics accelerate empirical ingestion by 34%...",
          counterWarrant: "...uncalibrated automated heuristics introduce systematic sampling bias.",
          synthesizedImplication: "Consequently, scholarly validity demands integrating computational speed with disciplined epistemic oversight.",
          fallacyAudit: "Zero informal fallacies detected. Causal warrants empirically substantiated with p < 0.01.",
          cohesionIndex: "High (Dialectical transitions: 'Whereas', 'Consequently', 'Notwithstanding')"
        },
        activeObservations: [
          "Dialectical synthesis balances competing empirical claims into an integrated, defensible scholarly position.",
          "Concessive framing ('Whereas...') prevents absolutist assertions and establishes high academic credibility (ethos).",
          "Nominalization transforms active verbal actions into dense scholarly concept phrases."
        ],
        pedagogicalTakeaway: "In academic discourse, true synthesis is not alternating summaries of Source A and Source B; it is articulating the theoretical tension and discovering the higher-order reconciliation.",
        predictionPrompt: "What happens to the academic credibility of a literature review if the author removes all epistemic hedging (e.g. changes 'suggests' to 'proves beyond all doubt')?",
        predictionOptions: [
          {
            id: "pred-overconfidence-trap",
            label: "Scholarly credibility drops because absolute claims ignore empirical boundary conditions and confounding variables.",
            isCorrect: true,
            explanation: "Accurate: Academic peer reviewers reject unhedged overgeneralizations that claim absolute certainty without universally replicated proof."
          },
          {
            id: "pred-stronger-paper",
            label: "The paper becomes much stronger because academic examiners prefer total confidence.",
            isCorrect: false,
            explanation: "Misconception: Academic discourse values nuance, humility, and calibrated hedging over aggressive assertions."
          }
        ]
      };
    }

    // 0B. LITERATURE & TEXTUAL ANALYSIS
    if (category === "literature") {
      return {
        subject: "english",
        title: "Literary Close Reading & Textual Evidence Workbench",
        conceptName: "Authorial Craft, Motif & Figurative Language Lab",
        parameters: {
          analyticalLens: "historicist_formalist",
          symbolicDepth: "high"
        },
        computedOutputs: {
          selectedPassage: "'I must be cruel only to be kind: Thus bad begins and worse remains behind.' (Hamlet, 3.4)",
          figurativeDevice: "Oxymoron and Paradox ('cruel only to be kind')",
          subtextualMotif: "Moral corruption, fatalism, and the corruption of the Danish court",
          thematicSynthesis: "Shakespeare deploys semantic paradox to dramatize Hamlet's fractured ethical dilemma between filial duty and spiritual damnation.",
          criticalMethodology: "Formalist close reading contextualized within Jacobean revenge tragedy conventions"
        },
        activeObservations: [
          "Close reading extracts subtext from lexical choices, poetic meter, and paradoxical rhetoric.",
          "Figurative language serves thematic architecture rather than merely ornamental decoration."
        ],
        pedagogicalTakeaway: "Literary analysis requires synthesizing micro-level lexical craft (words, meter, figures of speech) with macro-level socio-historical themes.",
        predictionPrompt: "Why does Shakespeare pair 'cruel' with 'kind' in Hamlet's soliloquy to Gertrude?",
        predictionOptions: [
          {
            id: "pred-paradox-correct",
            label: "To expose the ethical paradox that Hamlet believes hurting his mother is the only way to save her soul.",
            isCorrect: true,
            explanation: "Correct: The paradox captures the central psychological tension of the scene."
          },
          {
            id: "pred-contradiction-error",
            label: "It is an accidental grammatical mistake by the playwright.",
            isCorrect: false,
            explanation: "Misconception: Paradox is a deliberate rhetorical device used to reveal complex moral realities."
          }
        ]
      };
    }

    // 1. MATHEMATICS: Interactive Parabola Explorer
    if (sLower.includes("math") || tLower.includes("quad") || tLower.includes("factor")) {
      const a = 2, b = 7, c = 3;
      const discriminant = b * b - 4 * a * c;
      const vertexX = -b / (2 * a);
      const vertexY = a * vertexX * vertexX + b * vertexX + c;

      return {
        subject: "mathematics",
        title: "Quadratic Function & Roots Manipulative",
        conceptName: "Parabola y = ax² + bx + c Parameter Lab",
        parameters: { a, b, c },
        computedOutputs: {
          discriminant,
          hasRealRoots: discriminant >= 0,
          rootCount: discriminant > 0 ? 2 : discriminant === 0 ? 1 : 0,
          vertexX: Number(vertexX.toFixed(2)),
          vertexY: Number(vertexY.toFixed(2)),
          root1: Number(((-b + Math.sqrt(Math.max(0, discriminant))) / (2 * a)).toFixed(2)),
          root2: Number(((-b - Math.sqrt(Math.max(0, discriminant))) / (2 * a)).toFixed(2))
        },
        activeObservations: [
          `Leading coefficient a = ${a} > 0: Parabola opens upward (concave up).`,
          `Discriminant Δ = b² - 4ac = ${discriminant} > 0: Two distinct real roots exist.`,
          `Vertex located at (${vertexX.toFixed(2)}, ${vertexY.toFixed(2)}).`
        ],
        pedagogicalTakeaway: "Notice how increasing 'c' shifts the curve vertically without changing its width. When Δ < 0, the curve lifts entirely off the x-axis, creating complex conjugate roots.",
        predictionPrompt: "What happens to the roots if you increase 'c' from 3 to 10 while keeping a=2 and b=7?",
        predictionOptions: [
          { id: "pred-complex", label: "Δ becomes negative (49 - 80 = -31), so the curve no longer crosses the x-axis (no real roots).", isCorrect: true, explanation: "Accurate: Δ = 49 - 4(2)(10) = -31 < 0." },
          { id: "pred-more-roots", label: "The parabola will have 4 real roots instead.", isCorrect: false, explanation: "Impossible: A quadratic curve has at most 2 real roots." }
        ]
      };
    }

    // 2. PHYSICS: Interactive Projectile Motion Simulator
    if (sLower.includes("phys") || tLower.includes("projectile") || tLower.includes("motion") || tLower.includes("vector")) {
      const u = 20; // m/s
      const thetaDeg = 30; // degrees
      const g = 9.8;
      const thetaRad = (thetaDeg * Math.PI) / 180;
      const vx = u * Math.cos(thetaRad);
      const vy = u * Math.sin(thetaRad);
      const flightTime = (2 * vy) / g;
      const maxHeight = (vy * vy) / (2 * g);
      const range = vx * flightTime;

      return {
        subject: "physics",
        title: "Orthogonal Kinematics & Trajectory Manipulative",
        conceptName: "2D Projectile Vector Mechanics Lab",
        parameters: { u, thetaDeg, g },
        computedOutputs: {
          vx: Number(vx.toFixed(2)),
          vy: Number(vy.toFixed(2)),
          flightTime: Number(flightTime.toFixed(2)),
          maxHeight: Number(maxHeight.toFixed(2)),
          range: Number(range.toFixed(2))
        },
        activeObservations: [
          `Horizontal velocity component vx = ${vx.toFixed(1)} m/s remains constant throughout flight (ax = 0).`,
          `Vertical velocity component vy = ${vy.toFixed(1)} m/s decreases by 9.8 m/s every second.`,
          `Maximum height H = ${maxHeight.toFixed(2)} m occurs when vy = 0 at t = ${(flightTime / 2).toFixed(2)} s.`
        ],
        pedagogicalTakeaway: "Observe that launch angle θ = 45° maximizes horizontal range on level ground because sin(2θ) reaches its mathematical peak of 1.0.",
        predictionPrompt: "If you double launch speed u from 20 m/s to 40 m/s at the same 30° angle, what happens to maximum height H?",
        predictionOptions: [
          { id: "pred-quad-h", label: "Height quadruples (4x) because H is proportional to u².", isCorrect: true, explanation: "Correct: H = (u² sin²θ)/(2g). Doubling u squares the effect (2² = 4)." },
          { id: "pred-double-h", label: "Height merely doubles (2x).", isCorrect: false, explanation: "Incorrect: Kinetic energy and vertical displacement scale quadratically with initial velocity." }
        ]
      };
    }

    // 3. CHEMISTRY: Stoichiometry & Titration
    if (sLower.includes("chem") || tLower.includes("titrat") || tLower.includes("stoich")) {
      const Ca = 0.1; // mol/dm3
      const Va = 25.0; // cm3
      const Vb = 20.0; // cm3
      const na = 1;
      const nb = 2; // H2SO4 + 2NaOH
      const Cb = (Ca * Va * nb) / (Vb * na);

      return {
        subject: "chemistry",
        title: "Acid-Base Stoichiometry & Equivalence Manipulative",
        conceptName: "Titration Neutralization Reactor",
        parameters: { Ca, Va, Vb, na, nb },
        computedOutputs: {
          Cb: Number(Cb.toFixed(3)),
          molesAcid: Number(((Ca * Va) / 1000).toFixed(4)),
          molesBaseRequired: Number((((Ca * Va * nb) / na) / 1000).toFixed(4)),
          equivalenceRatio: "1 : 2 (Diprotic)"
        },
        activeObservations: [
          `Diprotic acid H₂SO₄ yields 2 moles H⁺ for every 1 mole of acid dissolved.`,
          `At equivalence, moles of OH⁻ added = moles of H⁺ neutralized.`,
          `Calculated sodium hydroxide concentration Cb = ${Cb.toFixed(3)} mol/dm³.`
        ],
        pedagogicalTakeaway: "Notice that changing acid basicity (from monoprotic HCl to diprotic H₂SO₄) doubles the required volume of alkaline titrant.",
        predictionPrompt: "If you used monoprotic HCl (na = 1, nb = 1) instead of H₂SO₄ with the same volumes, what would happen to calculated Cb?",
        predictionOptions: [
          { id: "pred-half-cb", label: "Cb would be halved (0.125 mol/dm³) because each acid mole supplies only 1 H⁺.", isCorrect: true, explanation: "Correct: Monoprotic acid requires half as many base equivalents." },
          { id: "pred-same-cb", label: "Cb would remain identical.", isCorrect: false, explanation: "Incorrect: Stoichiometric ratio directly scales the concentration." }
        ]
      };
    }

    // 4. BIOLOGY: Mitosis PMAT Phases
    if (sLower.includes("bio") || tLower.includes("mitos") || tLower.includes("cell")) {
      const currentPhase = "Metaphase";
      return {
        subject: "biology",
        title: "Cell Cycle & Mitosis Stage Manipulative",
        conceptName: "Equational Nuclear Division Stage Explorer",
        parameters: { phaseIndex: 1, diploidCount: 46 },
        computedOutputs: {
          phaseName: currentPhase,
          chromosomeState: "Duplicated chromosomes (each with 2 sister chromatids)",
          spindleState: "Spindle fibers attached to kinetochores at centromeres",
          nuclearEnvelope: "Completely disassembled",
          equatorialAlignment: "Aligned along the metaphase plate",
          resultingPloidy: "2n = 46 (Diploid conserved)"
        },
        activeObservations: [
          "Metaphase checkpoint ensures all kinetochores are under bipolar spindle tension before anaphase triggering.",
          "Sister chromatids remain held together at the centromere by cohesin protein complexes.",
          "Centrosomes have reached opposite cellular poles."
        ],
        pedagogicalTakeaway: "The metaphase-to-anaphase transition is irreversible, controlled by the Anaphase-Promoting Complex (APC/C) degrading securin.",
        predictionPrompt: "If spindle fibers fail to attach to one chromosome pair during Metaphase, what error occurs in daughter cells?",
        predictionOptions: [
          { id: "pred-nondisjunction", label: "Nondisjunction occurs, leading to aneuploidy (e.g. 47 or 45 chromosomes).", isCorrect: true, explanation: "Correct: Failure to attach leads to unequal chromatid segregation." },
          { id: "pred-no-change", label: "The cell automatically creates an extra chromosome copy.", isCorrect: false, explanation: "Incorrect: Mechanical segregation failure results in aneuploidy." }
        ]
      };
    }

    // 5. COMPUTER SCIENCE: Binary Search
    if (sLower.includes("comp") || sLower.includes("ict") || tLower.includes("search") || tLower.includes("algo")) {
      const array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
      const target = 23;
      const low = 0;
      const high = 9;
      const mid = Math.floor((low + high) / 2); // 4 -> arr[4] = 16

      return {
        subject: "computer_science",
        title: "Binary Search Algorithmic Trace Manipulative",
        conceptName: "Logarithmic Search Space Halving Lab",
        parameters: { low, high, target, arrayLength: array.length },
        computedOutputs: {
          currentMid: mid,
          midValue: array[mid],
          targetValue: target,
          comparison: "arr[mid] (16) < target (23) -> target must be in right subarray",
          nextLow: mid + 1,
          nextHigh: high,
          remainingElements: high - (mid + 1) + 1,
          maxComparisonsTotal: Math.ceil(Math.log2(array.length))
        },
        activeObservations: [
          `Search interval reduced from 10 elements to 5 elements in a single comparison.`,
          `Midpoint evaluated at index 4 (value 16). Since 16 < 23, left subarray [0..4] is discarded.`,
          `Next inspection will examine index 7: ⌊(5 + 9)/2⌋ = 7 (value 56).`
        ],
        pedagogicalTakeaway: "Binary search achieves O(log n) efficiency by cutting the search domain in half at every step. For 1,000,000 items, at most 20 comparisons are required.",
        predictionPrompt: "How many maximum comparisons does Binary Search need for an array of 1,024 sorted items?",
        predictionOptions: [
          { id: "pred-10-steps", label: "10 comparisons (since 2¹⁰ = 1024).", isCorrect: true, explanation: "Correct: log₂(1024) = 10 comparisons." },
          { id: "pred-512-steps", label: "512 comparisons.", isCorrect: false, explanation: "Incorrect: 512 would be linear search average, not binary search." }
        ]
      };
    }

    // 6. ENGLISH: Concord & Syntax
    if ((sLower.includes("english") || sLower === "eng" || tLower.includes("grammar") || tLower.includes("concord") || tLower.includes("syntax")) && !sLower.includes("engineer")) {
      return {
        subject: "english",
        title: "Subject-Verb Concord & Syntax Manipulative",
        conceptName: "Proximity Trap & Head Noun Transformer",
        parameters: { isPluralModifier: true, subjectSingular: true },
        computedOutputs: {
          headNoun: "quality (singular)",
          interveningModifier: "of these textbooks (prepositional phrase)",
          nearestNoun: "textbooks (plural)",
          correctAuxiliary: "is (singular agreement)",
          incorrectTrap: "are (false proximity agreement)",
          ruleName: "Grammatical Concord takes precedence over Proximity Concord"
        },
        activeObservations: [
          "Prepositional post-modifiers do not alter the grammatical number of the subject head noun.",
          "'The quality... is outstanding' maintains standard English subject-verb agreement.",
          "Common Cambridge / WAEC examination trap: Placing a plural noun immediately before the verb slot."
        ],
        pedagogicalTakeaway: "Always isolate the head noun by mentally bracketing out all intervening prepositional phrases before selecting the verb.",
        predictionPrompt: "In the sentence: 'A bouquet of yellow roses [was / were] presented to the speaker', which verb is correct?",
        predictionOptions: [
          { id: "pred-was", label: "'was', because the subject head noun is singular 'bouquet'.", isCorrect: true, explanation: "Correct: 'of yellow roses' is a prepositional modifier; the subject is singular 'bouquet'." },
          { id: "pred-were", label: "'were', because 'roses' is plural.", isCorrect: false, explanation: "Proximity trap: 'roses' is the object of the preposition, not the subject." }
        ]
      };
    }

    // 7. ENGINEERING: Statics Beam Manipulative
    const L = 6; // m
    const P = 10; // kN
    const Ra = P / 2;
    const Rb = P / 2;
    const Mmax = (P * L) / 4;

    return {
      subject: "engineering",
      title: "Simply Supported Beam Equilibrium Manipulative",
      conceptName: "Shear Force & Bending Moment Statics Lab",
      parameters: { spanL: L, loadP: P },
      computedOutputs: {
        reactionA: `${Ra.toFixed(1)} kN`,
        reactionB: `${Rb.toFixed(1)} kN`,
        maxBendingMoment: `${Mmax.toFixed(1)} kN·m`,
        momentLocation: "Midspan (x = 3.0 m)",
        shearForceLeft: `+${Ra.toFixed(1)} kN`,
        shearForceRight: `-${Rb.toFixed(1)} kN`
      },
      activeObservations: [
        `Static vertical equilibrium ΣFy = 0: Ra + Rb = ${P} kN.`,
        `Due to central symmetry, support reactions share the load equally: Ra = Rb = ${Ra} kN.`,
        `Maximum bending moment M_max = (P × L)/4 = ${Mmax} kN·m occurs directly beneath the load where shear force crosses zero.`
      ],
      pedagogicalTakeaway: "In structural mechanics, maximum bending moment always occurs where the shear force diagram crosses the zero axis (dM/dx = V = 0).",
      predictionPrompt: "If the span length L is increased from 6 m to 12 m while maintaining P = 10 kN, what happens to M_max?",
      predictionOptions: [
        { id: "pred-double-moment", label: "M_max doubles to 30 kN·m because moment is linearly proportional to span L.", isCorrect: true, explanation: "Correct: M_max = PL/4. Doubling L doubles the bending moment." },
        { id: "pred-half-moment", label: "M_max is halved.", isCorrect: false, explanation: "Incorrect: Longer spans produce greater lever arms and higher internal moments." }
      ]
    };
  }

  /**
   * Initializes clean interactive lesson state for a given topic
   */
  public initializeInteractiveState(params: {
    problemTitle: string;
    subject: string;
    mode: InteractiveSmartBoardMode;
  }): InteractiveLessonState {
    const steps = this.getProblemStepsForTopic(params.problemTitle, params.subject);
    const initialStep = steps[0];
    const category = smartBoardTopicLockService.determineSubjectCategory(params.subject, params.problemTitle);

    let target = "Solve step-by-step with verified pedagogical reasoning";
    let teacherExplanationState = "The teacher has outlined the problem on the board. You are in control of the solution path.";
    let givenInformation: Record<string, string> = {
      "Standard": "WAEC / Cambridge Curriculum Syllabus",
      "Subject": params.subject,
      "Status": "Active Interactive Digital Classroom"
    };

    if (category === "academic_english_discourse") {
      target = "Formulate a defensible academic claim, deconstruct rhetorical fallacies, and synthesize competing empirical sources";
      teacherExplanationState = "The professor has established the scholarly discourse context on the board. You are in control of dialectical synthesis and rhetorical analysis.";
      givenInformation = {
        "Discipline": "Academic Discourse, Rhetoric & Critical Synthesis",
        "Genre": "Peer-Reviewed Scholarly Dialectic",
        "Empirical Corpus": "Adeyemi (2023) & Kowalski (2024)",
        "Hedging Modality": "Calibrated Epistemic Stance"
      };
    } else if (category === "literature") {
      target = "Deconstruct authorial craft, analyze figurative subtext, and formulate an evidence-based critical thesis";
      teacherExplanationState = "The text has been annotated on the digital board. You are leading the close reading and thematic interpretation.";
      givenInformation = {
        "Discipline": "Literature in English",
        "Analytical Lens": "Historicist-Formalist Close Reading",
        "Textual Object": "Dramatic Soliloquy & Verse"
      };
    } else if (category === "english_language_esl") {
      target = "Isolate grammatical head nouns and verify syntactic concord";
      teacherExplanationState = "The grammatical sentence is displayed on the board. You are analyzing the syntactic structure.";
    }

    const state: InteractiveLessonState = {
      currentPhase: initialStep ? initialStep.phase : "problem",
      currentStep: 1,
      totalSteps: steps.length,
      currentProblem: params.problemTitle,
      givenInformation,
      target,
      attemptCount: 0,
      hintLevel: 0,
      misconceptionDetected: null,
      confidenceSignal: "high",
      masterySignal: "developing",
      teacherExplanationState,
      boardObjectState: {},
      interactionMode: params.mode,
      nextRecommendedAction: "continue",
      completedPhases: [],
      history: []
    };

    // Record audit event
    this.recordInteractiveEvent("SMARTBOARD_SESSION_STARTED", {
      problemTitle: params.problemTitle,
      subject: params.subject,
      mode: params.mode
    });

    return state;
  }

  /**
   * Alias for getSubjectManipulativeState
   */
  public getDefaultManipulativeForTopic(subjectOrTopic: string, topicOrSubject?: string): SubjectManipulativeState {
    return this.getSubjectManipulativeState(subjectOrTopic, topicOrSubject || "");
  }

  /**
   * Helper to create an initial state for testing or direct step evaluation
   */
  public createInitialState(totalSteps: number = 6): InteractiveLessonState {
    return {
      currentPhase: "strategy",
      currentStep: 1,
      totalSteps,
      currentProblem: "Interactive Problem",
      givenInformation: {
        "Status": "Active Interactive Digital Classroom"
      },
      target: "Solve step-by-step with verified pedagogical reasoning",
      attemptCount: 0,
      hintLevel: 0,
      misconceptionDetected: null,
      confidenceSignal: "high",
      masterySignal: "developing",
      teacherExplanationState: "Ready for learner input.",
      boardObjectState: {},
      interactionMode: "do",
      nextRecommendedAction: "continue",
      completedPhases: [],
      history: []
    };
  }

  /**
   * Comprehensive Mathematical & Scientific Equivalence Evaluator
   *
   * Understands mathematical equivalence across alternative notations:
   * - Fractions vs decimals (e.g., -1/2 == -0.5, -2/4 == -0.5, 100/19.6 == 5.102)
   * - Set permutations (e.g., {-3, -0.5} == {-0.5, -3} == {-3, -1/2})
   * - Unit variants (e.g., 5.1 m == 5.10m, 15 kN*m == 15 kNm, 0.25 M == 0.25 mol/dm3)
   * - Specific diagnostic misconceptions detected directly from typed input
   */
  public evaluateMathematicalEquivalence(
    rawInput: string,
    step: InteractiveProblemStep
  ): {
    isCorrect: boolean;
    misconception: SmartBoardMisconceptionType | null;
    explanation: string;
    matchedForm?: string;
  } {
    const clean = rawInput.trim().toLowerCase()
      .replace(/[−–]/g, "-")
      .replace(/[\*×]/g, "*")
      .replace(/[²]/g, "^2")
      .replace(/[\(\)\[\]\{\}]/g, " ");

    // 1. Direct acceptable answers match
    if (step.acceptableAnswers && step.acceptableAnswers.length > 0) {
      const match = step.acceptableAnswers.find(
        (ans) => ans.toLowerCase().trim() === clean || ans.toLowerCase().trim() === rawInput.trim().toLowerCase()
      );
      if (match) {
        return {
          isCorrect: true,
          misconception: null,
          explanation: `Mathematically equivalent solution accepted: "${rawInput}" is valid.`,
          matchedForm: match
        };
      }
    }

    // 2. Misconception Pattern Detection
    // Sign inversion check in quadratic roots
    if (
      (clean.includes("0.5") || clean.includes("1/2")) &&
      !clean.includes("-0.5") &&
      !clean.includes("-1/2") &&
      (step.id.includes("math-4") || step.id.includes("math-6"))
    ) {
      return {
        isCorrect: false,
        misconception: "sign_error",
        explanation: "Sign inversion error: In the numerator, -7 + 5 = -2, so -2/4 = -0.5 (-1/2), not +0.5."
      };
    }

    // Projectile motion squaring check (0.51 indicates 20 / 39.2 instead of 400 / 39.2)
    if (clean.includes("0.51") && (step.id.includes("phys-3") || step.title.toLowerCase().includes("height"))) {
      return {
        isCorrect: false,
        misconception: "wrong_operation_order",
        explanation: "Order of operations error: You forgot to square the initial velocity u. (20)² = 400, giving H_max = 400 × 0.25 / 19.6 ≈ 5.10 m."
      };
    }

    // Beam bending moment formula error (60 indicates P * L without dividing by 4)
    if (clean.includes("60") && !clean.includes("15") && (step.id.includes("engr-2") || step.title.toLowerCase().includes("moment"))) {
      return {
        isCorrect: false,
        misconception: "formula_selection_error",
        explanation: "Formula selection error: 60 kN·m is P × L without dividing by 4. For a simply supported beam with a central load, M_max = PL/4 = (10 × 6)/4 = 15 kN·m."
      };
    }

    // English concord false proximity
    if (clean.includes("are") && (step.id.includes("eng-2") || step.title.toLowerCase().includes("concord") || step.title.toLowerCase().includes("verb"))) {
      return {
        isCorrect: false,
        misconception: "grammar_proximity_error",
        explanation: "Proximity concord error: 'textbooks' is inside an intervening prepositional modifier ('of these textbooks'). The governing subject is singular 'quality', requiring the singular verb 'is'."
      };
    }

    if (clean.includes("textbook") && step.id.includes("eng-1")) {
      return {
        isCorrect: false,
        misconception: "grammar_proximity_error",
        explanation: "The noun 'textbooks' is part of the prepositional post-modifier phrase. The head noun of the subject noun phrase is 'quality'."
      };
    }

    // Chemistry diprotic stoichiometric error
    if ((clean === "1" || clean === "1:1" || clean === "1/1") && step.id.includes("chem-1")) {
      return {
        isCorrect: false,
        misconception: "concept_confusion",
        explanation: "Stoichiometry error: Sulfuric acid (H₂SO₄) is diprotic (donating 2 H⁺ ions), so 1 mole of H₂SO₄ reacts with 2 moles of NaOH (1:2 ratio)."
      };
    }

    // Biology mitosis vs meiosis error
    if (clean.includes("23") && !clean.includes("46") && (step.id.includes("bio-2") || step.title.toLowerCase().includes("chromosome"))) {
      return {
        isCorrect: false,
        misconception: "concept_confusion",
        explanation: "Meiosis vs Mitosis confusion: Mitosis is equational somatic cell division that preserves the full diploid complement (46 chromosomes)."
      };
    }

    // Computer Science binary search boundary error
    if ((clean.includes("low = 4") || clean === "4") && step.id.includes("cs-2")) {
      return {
        isCorrect: false,
        misconception: "algorithmic_reasoning_error",
        explanation: "Boundary violation: Since arr[mid] (16) < target (23), low must advance strictly past mid to mid + 1 = 5 to prevent an infinite loop."
      };
    }

    // 3. Numerical / Fraction / Multi-value Extractor
    const parseNumberOrFraction = (str: string): number | null => {
      const fracMatch = str.match(/(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)/);
      if (fracMatch) {
        const num = parseFloat(fracMatch[1]);
        const den = parseFloat(fracMatch[2]);
        if (den !== 0) return num / den;
      }
      const numMatch = str.match(/-?\d+(?:\.\d+)?/);
      if (numMatch) return parseFloat(numMatch[0]);
      return null;
    };

    // Extract all numbers/fractions from input
    const normalizedSlash = clean.replace(/\s*\/\s*/g, "/");
    const tokens = normalizedSlash.split(/[,;\s]+/).filter(Boolean);
    const extractedNumbers: number[] = [];
    for (const t of tokens) {
      const val = parseNumberOrFraction(t);
      if (val !== null && !isNaN(val)) {
        // avoid duplicating if part of something like 'x=1'
        extractedNumbers.push(Math.round(val * 1000) / 1000);
      }
    }

    // Subject Step 4 Math: Roots {-3, -0.5} or {-0.5, -3}
    if (step.id.includes("math-4") || step.id.includes("math-6")) {
      const expectedRoots = [-3, -0.5].sort((a, b) => a - b);
      const userRoots = [...new Set(extractedNumbers)].sort((a, b) => a - b);
      if (
        userRoots.length === 2 &&
        Math.abs(userRoots[0] - expectedRoots[0]) < 0.05 &&
        Math.abs(userRoots[1] - expectedRoots[1]) < 0.05
      ) {
        return {
          isCorrect: true,
          misconception: null,
          explanation: "Mathematically equivalent roots verified: {-3, -0.5} (or {-3, -1/2}). Valid solution set."
        };
      }
    }

    // Physics Step 3: Max height = 5.10 m (or 100/19.6)
    if (step.id.includes("phys-3") || step.title.toLowerCase().includes("height")) {
      for (const val of extractedNumbers) {
        if (Math.abs(val - 5.102) < 0.1 || Math.abs(val - 5.1) < 0.1) {
          return {
            isCorrect: true,
            misconception: null,
            explanation: "Physical calculation verified: H_max = 5.10 m (100 / 19.6 m). Precise to standard tolerance."
          };
        }
      }
    }

    // Engineering Step 2: Bending moment = 15 kN*m (or 60/4)
    if (step.id.includes("engr-2") || step.title.toLowerCase().includes("moment")) {
      for (const val of extractedNumbers) {
        if (Math.abs(val - 15) < 0.1) {
          return {
            isCorrect: true,
            misconception: null,
            explanation: "Structural moment verified: M_max = 15 kN·m (PL/4). Precise equilibrium value."
          };
        }
      }
    }

    // Chemistry Step 3: Concentration = 0.25 mol/dm3 (or 1/4)
    if (step.id.includes("chem-3") || step.title.toLowerCase().includes("concentration")) {
      for (const val of extractedNumbers) {
        if (Math.abs(val - 0.25) < 0.05) {
          return {
            isCorrect: true,
            misconception: null,
            explanation: "Concentration verified: C_b = 0.25 mol/dm³ (0.25 M). Accurate stoichiometric result."
          };
        }
      }
    }

    // Biology Step 2: Chromosomes = 46 (2n)
    if (step.id.includes("bio-2") || step.title.toLowerCase().includes("chromosome")) {
      for (const val of extractedNumbers) {
        if (val === 46) {
          return {
            isCorrect: true,
            misconception: null,
            explanation: "Biological invariance verified: 46 chromosomes (2n diploid) preserved across mitotic division."
          };
        }
      }
    }

    // English Step 1 & 2: Text matching
    if (step.id.includes("eng-1") && clean.includes("quality")) {
      return {
        isCorrect: true,
        misconception: null,
        explanation: "Correct head noun identified: 'quality' is the singular head of the subject noun phrase."
      };
    }
    if (step.id.includes("eng-2") && (clean === "is" || clean.includes("is outstanding") || clean.includes("verb is"))) {
      return {
        isCorrect: true,
        misconception: null,
        explanation: "Correct singular agreement verified: 'is' accords with the singular head noun 'quality'."
      };
    }

    // Computer Science Step 1 & 2
    if (step.id.includes("cs-1") && (clean.includes("sorted") || clean.includes("ordered") || clean.includes("monotonic"))) {
      return {
        isCorrect: true,
        misconception: null,
        explanation: "Prerequisite verified: Binary search strictly requires the array to be sorted."
      };
    }
    if (step.id.includes("cs-2") && (clean.includes("5") || clean.includes("mid + 1") || clean.includes("[5..9]"))) {
      return {
        isCorrect: true,
        misconception: null,
        explanation: "Search boundary verified: low advances to mid + 1 = 5, narrowing the range to [5..9]."
      };
    }

    // 4. Fallback option matching
    if (step.availableOptions) {
      for (const opt of step.availableOptions) {
        if (clean.includes(opt.label.toLowerCase().slice(0, 15))) {
          return {
            isCorrect: opt.isCorrect,
            misconception: opt.misconception || null,
            explanation: opt.explanation
          };
        }
      }
    }

    return {
      isCorrect: false,
      misconception: null,
      explanation: `Could not verify "${rawInput}". Please check your arithmetic/syntax or select an instructional option below.`
    };
  }

  /**
   * Evaluates learner's response at the current step
   */
  public evaluateStepResponse(params: {
    state: InteractiveLessonState;
    step: InteractiveProblemStep;
    selectedOptionId?: string | null;
    freeformInput?: string | null;
  }): {
    updatedState: InteractiveLessonState;
    isCorrect: boolean;
    outcome: EvaluationOutcome;
    feedbackMessage: string;
    misconception: SmartBoardMisconceptionType | null;
    nextAction: AdaptiveNextAction;
  } {
    const { state, step, selectedOptionId, freeformInput } = params;
    let isCorrect = false;
    let misconception: SmartBoardMisconceptionType | null = null;
    let feedbackMessage = "";
    let recordedResponse = "";

    if (freeformInput && freeformInput.trim().length > 0) {
      // Evaluate using Mathematical Equivalence Engine
      const equiv = this.evaluateMathematicalEquivalence(freeformInput, step);
      isCorrect = equiv.isCorrect;
      misconception = equiv.misconception;
      feedbackMessage = equiv.explanation;
      recordedResponse = freeformInput.trim();
    } else if (selectedOptionId) {
      const option = step.availableOptions?.find(o => o.id === selectedOptionId);
      isCorrect = !!option?.isCorrect;
      misconception = option?.misconception || null;
      feedbackMessage = option?.explanation || (isCorrect ? "Step verified successfully." : "Check your reasoning.");
      recordedResponse = option?.label || selectedOptionId;
    } else {
      feedbackMessage = "Please choose an option or enter your step solution.";
      return {
        updatedState: state,
        isCorrect: false,
        outcome: "INCORRECT",
        feedbackMessage,
        misconception: null,
        nextAction: "retry"
      };
    }

    const attemptCount = state.attemptCount + 1;

    let outcome: EvaluationOutcome = isCorrect ? "CORRECT" : "INCORRECT";
    if (misconception) {
      outcome = "MISCONCEPTION_DETECTED";
    }

    let nextAction: AdaptiveNextAction = "continue";
    if (isCorrect) {
      nextAction = state.currentStep < state.totalSteps ? "advance" : "continue";
    } else {
      nextAction = attemptCount >= 2 ? "hint" : "retry";
    }

    // Update history
    const historyEntry = {
      step: state.currentStep,
      phase: step.phase,
      response: recordedResponse,
      isCorrect,
      misconception,
      timestamp: Date.now()
    };

    const completedPhases = [...state.completedPhases];
    if (isCorrect && !completedPhases.includes(step.phase)) {
      completedPhases.push(step.phase);
    }

    const updatedState: InteractiveLessonState = {
      ...state,
      attemptCount,
      evaluationResult: outcome,
      feedbackMessage,
      misconceptionDetected: misconception,
      learnerResponse: recordedResponse,
      expectedResponse: step.workedSolution,
      completedPhases,
      nextRecommendedAction: nextAction,
      masterySignal: isCorrect ? (completedPhases.length === state.totalSteps ? "mastered" : "proficient") : (attemptCount > 2 ? "needs_prerequisite" : "developing"),
      history: [...state.history.slice(-15), historyEntry] // keep bounded at 15
    };

    // Telemetry
    if (isCorrect) {
      this.recordInteractiveEvent("SMARTBOARD_STEP_CORRECT", {
        step: state.currentStep,
        phase: step.phase,
        attempts: attemptCount
      });
    } else {
      this.recordInteractiveEvent("SMARTBOARD_STEP_INCORRECT", {
        step: state.currentStep,
        phase: step.phase,
        misconception
      });
      if (misconception) {
        this.recordInteractiveEvent("SMARTBOARD_MISCONCEPTION_DETECTED", {
          step: state.currentStep,
          misconception,
          explanation: feedbackMessage
        });
      }
    }

    return {
      updatedState,
      isCorrect,
      outcome,
      feedbackMessage,
      misconception,
      nextAction
    };
  }

  /**
   * Advances state to the next structured step
   */
  public advanceToNextStep(
    state: InteractiveLessonState,
    steps: InteractiveProblemStep[]
  ): InteractiveLessonState {
    const nextStepNum = state.currentStep + 1;
    const nextStep = steps[nextStepNum - 1];

    if (!nextStep) {
      return {
        ...state,
        masterySignal: "mastered",
        nextRecommendedAction: "continue",
        feedbackMessage: "Excellent! You have successfully completed all instructional steps with pedagogical rigor."
      };
    }

    return {
      ...state,
      currentStep: nextStepNum,
      currentPhase: nextStep.phase,
      attemptCount: 0,
      hintLevel: 0,
      misconceptionDetected: null,
      evaluationResult: undefined,
      feedbackMessage: undefined,
      learnerResponse: undefined,
      nextRecommendedAction: "continue"
    };
  }

  /**
   * Reveals the next level on the Socratic Hint Ladder
   */
  public revealNextHint(
    state: InteractiveLessonState,
    step: InteractiveProblemStep
  ): { updatedState: InteractiveLessonState; revealedHint: SocraticHintLevel | null } {
    const nextHintLevel = Math.min(5, state.hintLevel + 1) as 1 | 2 | 3 | 4 | 5;
    const hint = step.hints.find(h => h.level === nextHintLevel) || null;

    const updatedState: InteractiveLessonState = {
      ...state,
      hintLevel: nextHintLevel,
      nextRecommendedAction: nextHintLevel >= 4 ? "remediate" : "retry"
    };

    this.recordInteractiveEvent("SMARTBOARD_HINT_REQUESTED", {
      step: state.currentStep,
      phase: step.phase,
      hintLevel: nextHintLevel
    });

    return { updatedState, revealedHint: hint };
  }

  /**
   * Appends bounded telemetry events to the institutional audit log
   */
  private recordInteractiveEvent(
    eventType:
      | "SMARTBOARD_SESSION_STARTED"
      | "SMARTBOARD_INTERACTION_STARTED"
      | "SMARTBOARD_STEP_ATTEMPTED"
      | "SMARTBOARD_STEP_CORRECT"
      | "SMARTBOARD_STEP_INCORRECT"
      | "SMARTBOARD_HINT_REQUESTED"
      | "SMARTBOARD_MISCONCEPTION_DETECTED"
      | "SMARTBOARD_REMEDIATION_TRIGGERED"
      | "SMARTBOARD_MASTERCLASS_RESUMED",
    metadata: Record<string, any>
  ): void {
    try {
      auditService.recordEvent({
        eventType: eventType as any,
        actorId: "learner-active-session",
        actorRole: "LEARNER",
        resourceType: "smart_board_masterclass",
        result: "SUCCESS",
        dataClassification: "LEARNER_PRIVATE",
        metadata
      });
    } catch {
      // Safe non-blocking telemetry fallback
    }
  }
}

export const smartBoardInteractionService = SmartBoardInteractionService.getInstance();
