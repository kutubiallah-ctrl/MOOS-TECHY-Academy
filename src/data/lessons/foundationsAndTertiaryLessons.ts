import { SkillLesson } from "../../types/curriculum";

export const FOUNDATIONS_TERTIARY_LESSONS: Record<string, SkillLesson> = {
  "skill-up-matter-machines": {
    id: "les-up-matter-machines",
    title: "States of Matter & Mechanical Advantage of Simple Levers",
    hookAndIntuition: "Why can a 10-year-old lift a heavy 100 kg rock using a long wooden pole? Because simple machines multiply force! Levers trade distance for effort, turning a gentle push into a massive lifting force.",
    conceptualExplanation: "Matter exists in three primary classical states: Solids (fixed shape and volume, tightly packed particles vibrating in place), Liquids (fixed volume but taking the shape of their container, particles sliding over one another), and Gases (no fixed shape or volume, particles moving rapidly at high speeds in random directions). Kinetic Particle Theory explains phase changes: Melting (solid to liquid via heating), Freezing (liquid to solid), Evaporation/Boiling (liquid to gas), and Condensation (gas to liquid). Simple Machines multiply force or change direction: A Lever consists of a rigid bar pivoting around a fixed Fulcrum (pivot), with Effort applied to move a Load. Classes of Levers: Class 1 (Fulcrum in the middle, e.g. crowbar, see-saw, scissors); Class 2 (Load in the middle, e.g. wheelbarrow, nutcracker); Class 3 (Effort in the middle, e.g. tweezers, fishing rod). Mechanical Advantage (MA) = Load / Effort; Velocity Ratio (VR) = Distance moved by Effort / Distance moved by Load.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Mechanical Advantage (MA) = Load / Effort", definition: "Factor by which a simple machine multiplies the user's input effort.", practicalExample: "Lifting a 600 N load with an effort of 150 N gives MA = 600 / 150 = 4." },
      { termOrSymbol: "Principle of Moments: Load × Load Arm = Effort × Effort Arm", definition: "Rotational equilibrium condition for balanced levers.", practicalExample: "A 40 kg child sitting 2 m from the pivot balances an 80 kg adult sitting 1 m from the pivot." },
      { termOrSymbol: "Efficiency = (MA / VR) × 100%", definition: "Percentage of input work converted into useful output work.", practicalExample: "Real machines are never 100% efficient due to friction and weight of moving parts." }
    ],
    workedExamples: [
      {
        title: "Calculating Effort Required to Lift a Rock with a Class 1 Lever",
        problemStatement: "A laborer uses a 3.0 m crowbar as a Class 1 lever to lift a heavy 900 N boulder. The fulcrum is placed 0.5 m from the boulder. Calculate: (a) the effort arm length, (b) the Velocity Ratio (VR), (c) the minimum effort required assuming 100% efficiency.",
        steps: [
          { stepNumber: 1, instruction: "Determine load arm and effort arm lengths.", reasoning: "Load arm = 0.5 m from fulcrum. Total crowbar length = 3.0 m. Effort arm = 3.0 m - 0.5 m = 2.5 m." },
          { stepNumber: 2, instruction: "Calculate Velocity Ratio (VR).", reasoning: "VR = Distance moved by Effort / Distance moved by Load = Effort Arm / Load Arm = 2.5 m / 0.5 m = 5." },
          { stepNumber: 3, instruction: "Apply Principle of Moments or MA = VR (at 100% efficiency).", reasoning: "Effort × Effort Arm = Load × Load Arm => Effort × 2.5 = 900 × 0.5 => Effort × 2.5 = 450." },
          { stepNumber: 4, instruction: "Solve for Effort.", reasoning: "Effort = 450 / 2.5 = 180 N." }
        ],
        takeawayRule: "The closer the fulcrum is placed to the load, the longer the effort arm and the less effort required."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking simple machines create free energy or reduce the total work done.", whyItIsWrong: "Work = Force × Distance. A machine reduces the required force, but you must push through a proportionally longer distance. Work input always equals (or exceeds) work output.", correctCorrection: "Machines multiply force, but they never multiply energy." }
    ],
    guidedPracticePrompt: "Classify the lever type: (a) wheelbarrow, (b) pair of scissors, (c) human arm lifting a dumbbell.",
    summaryRecap: "Matter changes state by absorbing or releasing heat. Levers multiply force (MA = Load/Effort) according to fulcrum position."
  },

  "skill-up-word-processing": {
    id: "les-up-word-processing",
    title: "Digital Literacy: Word Processing Formatting & Cyber Password Hygiene",
    hookAndIntuition: "Imagine locking your front door with a paper clip—anyone could walk in. In cyberspace, using 'password123' or your birthday is just like that paper clip! Digital literacy empowers you to communicate professionally and protect your identity online.",
    conceptualExplanation: "Word Processing transforms raw text into structured, accessible documents: (1) Typography & Hierarchy: Font families (Serif for formal print, Sans-serif for screens), Font Sizes (12pt standard body, 16–24pt headings), and Font Styles (Bold for emphasis, Italics for book titles and foreign words, Underline for hyperlinks). (2) Paragraph Formatting: Line spacing (1.15 to 1.5 standard), Text Alignment (Left-aligned for natural reading, Centered for titles, Right-aligned for dates, Justified for formal columns), and Indentations (first-line indent for paragraphs). (3) Document Elements: Page breaks, Headers/Footers with automatic page numbering, Bulleted and Numbered lists, and Tables. (4) Cyber Hygiene & Password Security: Passwords must be at least 12–16 characters combining uppercase, lowercase, numbers, and symbols. Never reuse passwords across sites. Two-Factor Authentication (2FA) adds a vital second verification layer (something you know + something you have).",
    keyTermsAndFormulas: [
      { termOrSymbol: "Entropy & Password Strength", definition: "Logarithmic measure of how many guesses a computer requires to crack a password.", practicalExample: "An 8-character lowercase password takes seconds to brute-force; a 16-character passphrase takes millions of years." },
      { termOrSymbol: "Two-Factor Authentication (2FA)", definition: "Security process requiring two independent authentication factors to verify identity.", practicalExample: "Password (knowledge) + SMS OTP or Authenticator app token (possession)." },
      { termOrSymbol: "Phishing", definition: "Fraudulent attempts to steal sensitive credentials by masquerading as a trustworthy entity.", practicalExample: "Suspicious emails urging you to 'verify your bank account immediately'." }
    ],
    workedExamples: [
      {
        title: "Auditing and Upgrading a Weak Password into a High-Entropy Passphrase",
        problemStatement: "A student uses the password 'ibrahim2012'. Analyze its security vulnerabilities and transform it into a memorable, cryptographically secure passphrase using the Diceware method.",
        steps: [
          { stepNumber: 1, instruction: "Analyze the vulnerabilities of 'ibrahim2012'.", reasoning: "Contains a common first name and a four-digit year. Highly vulnerable to dictionary attacks and social engineering." },
          { stepNumber: 2, instruction: "Apply the Passphrase / Diceware strategy.", reasoning: "Combine four random, unrelated words into a vivid mental image, interspersed with symbols and capitalization." },
          { stepNumber: 3, instruction: "Construct upgraded passphrase.", reasoning: "Example: 'Mango#Falcon9_Guitar*Lekki'." },
          { stepNumber: 4, instruction: "Evaluate strength metrics.", reasoning: "Length is 25 characters, includes uppercase, lowercase, numbers, and special characters. Resistant to quantum and brute-force cracking." }
        ],
        takeawayRule: "Length beats complexity: a long phrase of random words is both easier to remember and astronomically harder to crack."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Thinking substituting letters with numbers (like 'P@ssw0rd!') makes a password uncrackable.", whyItIsWrong: "Automated cracking tools test common leetspeak substitutions instantly. Modern crackers check 'P@ssw0rd' in milliseconds.", correctCorrection: "Use long multi-word passphrases rather than short predictable substitutions." }
    ],
    guidedPracticePrompt: "Explain the difference between Left-aligned and Justified text formatting and when each should be used.",
    summaryRecap: "Format documents with clear visual hierarchy. Create 16+ character passphrases and enable 2FA to prevent unauthorized access."
  },

  "skill-uni-rhetoric-synthesis": {
    id: "les-uni-rhetoric-synthesis",
    title: "Scholarly Synthesis, Logical Fallacies, & Formal Thesis Defense",
    hookAndIntuition: "In university academia, you do not write an essay simply to regurgitate what other scholars have said. You enter a scholarly conversation! Scholarly synthesis blends disparate, contradictory peer-reviewed sources into a coherent, original academic argument.",
    conceptualExplanation: "Higher academic writing transitions from descriptive reporting to critical argumentative synthesis: (1) Literature Synthesis: Identifying overarching themes, methodological discrepancies, and empirical gaps across academic literature using a Synthesis Matrix rather than summarizing source-by-source. (2) Formal Thesis Formulation: A robust thesis must be arguable, specific, defensible, and scoped (e.g. 'Although X proposes Y, empirical data from Z indicates that W, thereby necessitating Q'). (3) Detection of Informal Logical Fallacies: Ad Hominem (attacking author rather than argument), Straw Man (oversimplifying an opponent's claim to refute it), Post Hoc Ergo Propter Hoc (assuming causality from mere correlation), False Equivalence, and Appeal to False Authority. (4) Defense Mechanics: Anticipating objections, conceding minor caveats, presenting counter-evidence, and defending methodological validity under peer review.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Literature Synthesis Matrix", definition: "A grid mapping research questions across multiple authors to identify consensus and contradictions.", practicalExample: "Columns: Author, Methodology, Sample Size, Findings, Critique." },
      { termOrSymbol: "Straw Man Fallacy", definition: "Misrepresenting an opponent's stance to make it easier to attack.", practicalExample: "Claiming an advocate for public transit 'wants to confiscate all personal automobiles'." },
      { termOrSymbol: "Epistemic Humility", definition: "Acknowledging the boundaries and limitations of one's empirical conclusions.", practicalExample: "Stating: 'While these findings indicate a strong correlation, longitudinal studies are required to establish causality.'" }
    ],
    workedExamples: [
      {
        title: "Synthesizing Conflicting Empirical Studies in an Academic Literature Review",
        problemStatement: "Author A (2021) argues that smartphone use among secondary students impairs academic performance by 18%. Author B (2023) argues that digital devices enhance collaborative learning outcomes by 24%. Synthesize these conflicting findings into a balanced, critical thesis statement.",
        steps: [
          { stepNumber: 1, instruction: "Identify the underlying methodological variables.", reasoning: "Author A measured unstructured recreational social media use during study hours; Author B measured structured, teacher-guided educational research tasks." },
          { stepNumber: 2, instruction: "Locate the synthesis bridge.", reasoning: "The outcome is not determined by the device itself, but by pedagogical intentionality and cognitive regulation during use." },
          { stepNumber: 3, instruction: "Draft synthesizing thesis.", reasoning: "'While disparate empirical findings attribute both cognitive impairment (Author A) and scholastic enhancement (Author B) to student smartphone adoption, the divergent outcomes reflect pedagogical scaffolding rather than inherent technological determinism.'" }
        ],
        takeawayRule: "When two reputable studies disagree, identify the differing conditions, parameters, or definitions that reconcile their findings."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Writing a literature review as an annotated bibliography listing one study per paragraph.", whyItIsWrong: "An academic literature review must be organized thematically around arguments and findings, grouping multiple authors within single analytical paragraphs.", correctCorrection: "Structure paragraphs around conceptual claims, synthesizing multiple citations together." }
    ],
    guidedPracticePrompt: "Identify the logical fallacy: 'The new curriculum was implemented in September, and by November student tardiness doubled; therefore, the curriculum encourages indiscipline.'",
    summaryRecap: "Scholarly synthesis integrates multiple sources thematically. Avoid fallacies like Straw Man and Post Hoc. Defend thesis statements critically."
  },

  "skill-uni-dsa-complexity": {
    id: "les-uni-dsa-complexity",
    title: "Asymptotic Complexity (Big-O) & Binary Search Tree Invariants",
    hookAndIntuition: "If an algorithm takes 1 millisecond to process 1,000 items, how long will it take for 1,000,000 items? For an O(n) algorithm: 1 second. For an O(n²) algorithm: nearly 17 minutes! For an O(2ⁿ) algorithm: longer than the age of the universe! Asymptotic analysis predicts performance at scale.",
    conceptualExplanation: "Asymptotic notation characterizes the mathematical growth rate of an algorithm's time or space requirements as input size n tends to infinity. (1) Big-O O(g(n)): Formal upper bound. f(n) ∈ O(g(n)) iff ∃ constants c > 0, n₀ > 0 such that 0 ≤ f(n) ≤ c·g(n) ∀ n ≥ n₀. (2) Complexity Hierarchy: O(1) Constant < O(log n) Logarithmic < O(n) Linear < O(n log n) Linearithmic < O(n²) Quadratic < O(2ⁿ) Exponential < O(n!) Factorial. (3) Binary Search Tree (BST): A binary tree data structure where for every node X: all keys in X's left subtree are strictly less than X.key, and all keys in X's right subtree are strictly greater than X.key (BST Invariant). In-order traversal (Left, Root, Right) of a BST yields elements in strictly sorted ascending order! Operations (Search, Insert, Delete) execute in O(h) time, where h is tree height. For balanced trees (AVL, Red-Black), h = O(log n); for degenerate trees (skewed into a linked list), h = O(n).",
    keyTermsAndFormulas: [
      { termOrSymbol: "Formal Big-O Definition: f(n) ≤ c · g(n) for n ≥ n₀", definition: "Rigorous asymptotic upper bound formulation.", practicalExample: "3n² + 5n + 12 ∈ O(n²) with c = 4 for all n ≥ 6." },
      { termOrSymbol: "BST Invariant", definition: "Left Subtree Keys < Node Key < Right Subtree Keys for all nodes in the tree.", practicalExample: "Enables binary search pruning half of remaining nodes at each level." },
      { termOrSymbol: "In-Order Traversal (LNR)", definition: "Visit Left subtree, process Node, visit Right subtree.", practicalExample: "Guaranteed to print BST keys in strictly increasing sorted order." }
    ],
    workedExamples: [
      {
        title: "Proving Asymptotic Equivalence from First Principles",
        problemStatement: "Using the formal definition of Big-O, prove that f(n) = 5n³ + 8n² + 100 ∈ O(n³).",
        steps: [
          { stepNumber: 1, instruction: "State the formal definition.", reasoning: "We must find positive constants c and n₀ such that 5n³ + 8n² + 100 ≤ c·n³ for all n ≥ n₀." },
          { stepNumber: 2, instruction: "Bound each lower-order term for n ≥ 1.", reasoning: "For all n ≥ 1: 8n² ≤ 8n³, and 100 ≤ 100n³." },
          { stepNumber: 3, instruction: "Sum the inequalities.", reasoning: "5n³ + 8n² + 100 ≤ 5n³ + 8n³ + 100n³ = 113n³." },
          { stepNumber: 4, instruction: "Identify witness constants c and n₀.", reasoning: "Choosing c = 113 and n₀ = 1, we have 5n³ + 8n² + 100 ≤ 113n³ for all n ≥ 1." },
          { stepNumber: 5, instruction: "Conclude proof.", reasoning: "Therefore, 5n³ + 8n² + 100 ∈ O(n³) by definition." }
        ],
        takeawayRule: "In polynomials, the highest degree term strictly dominates asymptotic growth; drop lower-order terms and leading coefficients."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Assuming BST operations are ALWAYS O(log n).", whyItIsWrong: "If keys are inserted in sorted order (e.g. 1, 2, 3, 4, 5), the tree degenerates into a linear linked list of height n, making search O(n) instead of O(log n).", correctCorrection: "Standard BST worst-case is O(n); self-balancing trees (AVL, Red-Black) guarantee O(log n)." }
    ],
    guidedPracticePrompt: "Trace the in-order traversal of a BST created by inserting keys: [45, 12, 78, 23, 6, 90, 52].",
    summaryRecap: "Big-O measures upper bound scaling. O(1) < O(log n) < O(n) < O(n log n) < O(n²). BST in-order traversal yields sorted order; balanced height is O(log n)."
  },

  "skill-ep-math-drills": {
    id: "les-ep-math-drills",
    title: "Exam Mastery: High-Yield WAEC Paper 2 & JAMB CBT Speed Tactics",
    hookAndIntuition: "In JAMB CBT, you have 40 math questions in under 45 minutes—just over 60 seconds per question! High-achieving candidates do not work harder; they use rapid elimination, dimension checking, and algebraic shortcuts to secure 90%+ scores.",
    conceptualExplanation: "Standardized mathematics examinations (WAEC SSCE Paper 1 & 2, JAMB UTME, NECO, IGCSE) test mastery across two distinct formats: (1) JAMB CBT Speed & Accuracy Tactics: Back-Substitution (testing answer options into the question rather than expanding complex equations); Elimination of Absurdities (checking signs, odd/even parity, and extreme magnitude limits); Value Substitution (assigning convenient small integers like x = 0, 1, or 2 to simplify unwieldy polynomial or trigonometric identities); and Dimensional Sanity Checks. (2) WAEC Theory Presentation Strategy: WAEC awards Method Marks (M) and Accuracy Marks (A). Even if the final arithmetic value has a minor error, clear mathematical steps and stated theorem justifications ensure you capture 80–90% of available method marks. High-yield core topics recurring annually: Quadratic curves, Circle Geometry proofs, Trigonometric 3D bearings, Cumulative frequency (Ogive) median/quartile graphs, Mensuration of composite solids, and Probability tree diagrams.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Back-Substitution Tactic (CBT)", definition: "Plugging the 4 multiple choice options into the equation to instantly verify equality.", practicalExample: "If (x - 3)/(x + 2) = 1/2, testing options x = 8: (8-3)/(8+2) = 5/10 = 1/2. Verified in 10 seconds!" },
      { termOrSymbol: "Method Marks (M) vs Accuracy Marks (A)", definition: "WAEC marking scheme rubric: M marks reward correct logical formula and approach; A marks reward correct final arithmetic.", practicalExample: "Always write the initial formula before plugging numbers in to secure M marks." },
      { termOrSymbol: "Ogive Quartile Estimation: Q₁ = N / 4, Q₂ = N / 2, Q₃ = 3N / 4", definition: "Reading percentiles and median directly from cumulative frequency S-curves.", practicalExample: "For N = 120 candidates, median score is read on the curve at cumulative frequency = 60." }
    ],
    workedExamples: [
      {
        title: "Solving a Complex Trigonometric CBT Problem via Convenient Value Substitution",
        problemStatement: "Simplify for all acute angles θ: (sin θ + cos θ)² - 2 sin θ cos θ.\n(A) 0   (B) 1   (C) 2   (D) sin 2θ",
        steps: [
          { stepNumber: 1, instruction: "Method 1 (Algebraic expansion).", reasoning: "Expand (sin θ + cos θ)² = sin² θ + 2 sin θ cos θ + cos² θ. Subtract 2 sin θ cos θ: sin² θ + cos² θ = 1." },
          { stepNumber: 2, instruction: "Method 2 (CBT Value Substitution Tactic in under 15 seconds).", reasoning: "Choose convenient angle θ = 0° (or 45° or 90°). At θ = 0°: sin 0° = 0, cos 0° = 1. Expression = (0 + 1)² - 2(0)(1) = 1² - 0 = 1." },
          { stepNumber: 3, instruction: "Match with options.", reasoning: "Option (B) is 1. Solved instantly without pencil and paper!" }
        ],
        takeawayRule: "When asked to simplify an algebraic or trigonometric identity valid for all variables, test simple values like 0 or 1 to evaluate options instantly."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Spending 8 minutes solving a single stubborn theory question in WAEC.", whyItIsWrong: "All questions carry fixed mark allocations. Becoming emotionally attached to one difficult sub-question starves you of time on easy high-mark questions.", correctCorrection: "Follow the 1.5 minutes-per-mark rule: if stuck, flag it, move on, and return if time permits." }
    ],
    guidedPracticePrompt: "Use back-substitution to solve: log₂(x) + log₂(x - 2) = 3 from options: (A) 2  (B) 4  (C) 6  (D) 8.",
    summaryRecap: "Master back-substitution and value testing for CBT speed. In WAEC theory, write every step and formula to claim method marks."
  },

  "skill-ep-eng-concord-lexis": {
    id: "les-ep-eng-concord-lexis",
    title: "Exam Readiness: Standardized Grammatical Concord & Lexical Antonyms",
    hookAndIntuition: "In standardized English exams like JAMB and WAEC, test setters intentionally design questions around common spoken street errors. If you pick what 'sounds natural' in informal conversation, you fall straight into the examiner's trap! Learn the precise formal rules.",
    conceptualExplanation: "Standardized English language testing evaluates mastery of prescriptive grammar, syntactical accuracy, and lexis: (1) High-Frequency Concord Traps: 'One of the [plural noun] who [plural verb]' (e.g. 'She is one of the students who ARE top of the class'—the relative pronoun 'who' refers to 'students', not 'one'); 'More than one [singular noun] takes a singular verb' (e.g. 'More than one student WAS absent'); Mathematical sums and distances take singular verbs ('Ten million naira IS a substantial sum'); Quantifiers ('A number of students WERE' [plural] vs 'The number of students WAS' [singular]). (2) Lexis and Structure: Nearest in Meaning (Synonyms requiring nuanced contextual tone) vs Opposite in Meaning (Antonyms—beware selecting the synonym by reflex!). (3) Subjunctive Mood: Verbs of demanding, recommending, and insisting take the bare base form of the verb without 's' or 'ed' (e.g. 'The doctor recommended that he TAKE [not takes] a rest').",
    keyTermsAndFormulas: [
      { termOrSymbol: "'A Number of' vs 'The Number of'", definition: "'A number of' = plural verb (meaning many); 'The number of' = singular verb (referring to the statistical metric).", practicalExample: "A number of cars were stranded; The number of cars was forty." },
      { termOrSymbol: "Subjunctive Mood Rule", definition: "Following demand verbs (insist, demand, recommend, suggest), use base infinitive form.", practicalExample: "I insisted that he be present (not 'is' or 'was')." },
      { termOrSymbol: "Double Comparison Error", definition: "Never combine 'more' or 'most' with '-er' or '-est' adjectives.", practicalExample: "Say 'easier', never 'more easier'." }
    ],
    workedExamples: [
      {
        title: "Dissecting the 'One of the... who' Concord Examination Trap",
        problemStatement: "Choose the correct option to fill the blank:\n'Professor Ojo is one of the distinguished lecturers who ________ contributed significantly to renewable energy research in Nigeria.'\n(A) has   (B) have   (C) was   (D) is",
        steps: [
          { stepNumber: 1, instruction: "Identify the antecedent of the relative pronoun 'who'.", reasoning: "In the relative clause 'who [blank] contributed...', the relative pronoun 'who' refers back to the adjacent antecedent noun phrase 'the distinguished lecturers'." },
          { stepNumber: 2, instruction: "Determine the grammatical number of 'distinguished lecturers'.", reasoning: "'Lecturers' is a plural noun." },
          { stepNumber: 3, instruction: "Apply relative clause concord rule.", reasoning: "A verb in a relative clause agrees with the relative pronoun's antecedent. Since 'lecturers' is plural, the verb must be plural: 'have'." },
          { stepNumber: 4, instruction: "Differentiate from 'the only one of...'.", reasoning: "Notice: if the sentence had said 'the ONLY one of the lecturers who...', the antecedent would be 'only one', requiring 'has'. But without 'only', the antecedent is the plural 'lecturers'." },
          { stepNumber: 5, instruction: "State final correct choice.", reasoning: "Option (B) 'have'." }
        ],
        takeawayRule: "'One of the [plural nouns] who' takes a PLURAL verb; 'The ONLY one of the [plural nouns] who' takes a SINGULAR verb."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "In the Antonyms section, accidentally picking the word closest in meaning because your brain recognizes the synonym first.", whyItIsWrong: "This is the single most common cause of lost marks in JAMB/WAEC English! Candidates know the word's meaning and instinctively pick the synonym.", correctCorrection: "Always underline the word 'OPPOSITE' at the top of the question to maintain conscious focus." }
    ],
    guidedPracticePrompt: "Choose the correct verb: 'Neither of the suspects (has / have) confessed to the crime.'",
    summaryRecap: "'A number of' takes plural; 'The number of' takes singular. 'One of the [plurals] who' takes plural. In antonym sections, ensure you choose the opposite."
  },

  "skill-ep-stem-cbt": {
    id: "les-ep-stem-cbt",
    title: "Science CBT Strategy: Dimensional Analysis & High-Speed Physics/Chemistry Problem Solving",
    hookAndIntuition: "When looking at 4 options in a complex Physics CBT calculation, did you know you can often eliminate 2 or 3 of them without doing any long calculations at all? Dimensional analysis and order-of-magnitude estimation let you spot the right answer in seconds.",
    conceptualExplanation: "Standardized Science CBT examinations (JAMB UTME Physics, Chemistry, Biology) demand rapid problem solving and conceptual clarity: (1) Dimensional Analysis: Every physical equation must be dimensionally homogeneous. The dimensions of the left side must equal the dimensions of the right side in terms of Fundamental Dimensions: Mass [M], Length [L], and Time [T]. If an option's units do not match the required physical quantity, eliminate it immediately! (2) Order-of-Magnitude & Scientific Notation Estimation: When multiplying large and small numbers (e.g. Planck's constant 6.63 × 10⁻³⁴ J·s or Avogadro's constant 6.02 × 10²³ mol⁻¹), evaluate the powers of 10 first. The exponent alone often distinguishes the correct option. (3) Proportionality Elimination: If a question asks how Kinetic Energy changes when velocity is doubled, recall KE ∝ v²; doubling v quadruples KE (2² = 4). (4) Chemistry Reaction Stoichiometry shortcuts using molar mass ratios.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Dimensional Homogeneity: [LHS] = [RHS]", definition: "Fundamental law that physical equations must have identical base dimensions on both sides.", practicalExample: "Velocity [LT⁻¹] = Acceleration [LT⁻²] × Time [T] = [LT⁻¹]. Valid!" },
      { termOrSymbol: "Exponent-First Estimation", definition: "Separating powers of 10 from significant figures to find order of magnitude instantly.", practicalExample: "(4.5 × 10⁶) × (2.0 × 10⁻³) ≈ 9 × 10³ = 9000." },
      { termOrSymbol: "Proportional Scaling Factor: Y₂ / Y₁ = (X₂ / X₁)^k", definition: "Quickly determining effect of changing independent variable.", practicalExample: "Gravitational force F ∝ 1/r²: tripling distance divides force by 3² = 9." }
    ],
    workedExamples: [
      {
        title: "Solving a Photocell Energy Problem via Order-of-Magnitude Estimation",
        problemStatement: "Light of frequency 6.0 × 10¹⁴ Hz shines on a metal surface. Taking Planck's constant h = 6.6 × 10⁻³⁴ J·s, calculate the energy of each photon:\n(A) 3.96 × 10⁻¹⁹ J   (B) 3.96 × 10⁻²⁵ J   (C) 1.10 × 10⁴⁷ J   (D) 4.35 × 10⁻¹² J",
        steps: [
          { stepNumber: 1, instruction: "State the governing physics formula.", reasoning: "Energy of a photon E = h · f." },
          { stepNumber: 2, instruction: "Evaluate the order of magnitude (powers of 10) first.", reasoning: "10⁻³⁴ × 10¹⁴ = 10^(-34 + 14) = 10⁻²⁰." },
          { stepNumber: 3, instruction: "Multiply the mantissas.", reasoning: "6.6 × 6.0 = 39.6." },
          { stepNumber: 4, instruction: "Combine in standard scientific notation.", reasoning: "39.6 × 10⁻²⁰ = 3.96 × 10⁻¹⁹ J." },
          { stepNumber: 5, instruction: "Check options.", reasoning: "Option (A) is 3.96 × 10⁻¹⁹ J. Options B, C, and D have completely wrong powers of 10 and can be dismissed in 5 seconds." }
        ],
        takeawayRule: "Always check powers of 10 first when computing with physical constants in multiple choice exams."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Forgetting to convert non-standard units (e.g. grams to kilograms, cm to meters, or minutes to seconds).", whyItIsWrong: "Formulas like F = ma and KE = 0.5 mv² strictly require SI base units (kg, m, s). Calculating with grams produces answers off by a factor of 1,000!", correctCorrection: "Convert all quantities to standard SI units before applying formulas." }
    ],
    guidedPracticePrompt: "If the radius of a planet is doubled while its mass remains constant, by what factor does acceleration due to gravity g change?",
    summaryRecap: "Check dimensions and powers of 10 for rapid CBT answers. Use proportional scaling (e.g. v² or 1/r²). Always convert to SI units first."
  },

  "skill-ep-ict-cbt": {
    id: "les-ep-ict-cbt",
    title: "Computer Studies CBT: Logic Gates, SQL Syntax, & Networking Readiness",
    hookAndIntuition: "In Computer Studies CBT, questions on logic gates, binary conversions, and SQL queries follow strict deterministic rules. If you know the truth tables and relational operators, these questions are guaranteed full marks!",
    conceptualExplanation: "Standardized Computer Studies examinations assess technical proficiency across hardware, networking, programming logic, and databases: (1) Boolean Logic & Gate Recognition: NOT (inverter), AND (both 1), OR (at least one 1), NAND (inverse of AND), NOR (inverse of OR), and XOR (exclusive OR: 1 when inputs differ). De Morgan's Laws: NOT(A AND B) = (NOT A) OR (NOT B); NOT(A OR B) = (NOT A) AND (NOT B). (2) Number Base Conversions: Hexadecimal (base 16: 0-9, A=10, B=11, C=12, D=13, E=14, F=15) groups binary bits into 4-bit nibbles (e.g. 1011 1101_2 = BD_16). (3) Networking Fundamentals: OSI 7-Layer Reference Model (Physical, Data Link, Network, Transport, Session, Presentation, Application); IP addressing (IPv4 32-bit vs IPv6 128-bit); Port numbers (HTTP: 80, HTTPS: 443, DNS: 53). (4) SQL Querying & Relational Databases: SELECT, FROM, WHERE, GROUP BY, ORDER BY, and JOIN syntax.",
    keyTermsAndFormulas: [
      { termOrSymbol: "4-Bit Hexadecimal Grouping", definition: "Every hex digit corresponds directly to 4 binary bits (8-4-2-1 code).", practicalExample: "Binary 1100 0101 = Hex C5 (since 1100 = 12 = C, 0101 = 5)." },
      { termOrSymbol: "XOR Truth Condition: A ⊕ B", definition: "Outputs 1 if and only if inputs are different; 0 if inputs are identical.", practicalExample: "0 ⊕ 1 = 1, 1 ⊕ 0 = 1, but 1 ⊕ 1 = 0 and 0 ⊕ 0 = 0." },
      { termOrSymbol: "SQL Execution Order", definition: "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.", practicalExample: "WHERE filters rows before aggregation; HAVING filters groups after aggregation." }
    ],
    workedExamples: [
      {
        title: "Evaluating a Compound Logic Circuit Output",
        problemStatement: "Inputs A = 1 and B = 0 are fed into a 2-input NAND gate. The output of the NAND gate is then fed along with input C = 1 into a 2-input XOR gate. What is the final output X?",
        steps: [
          { stepNumber: 1, instruction: "Evaluate the first stage (NAND gate).", reasoning: "Inputs: A = 1, B = 0. AND(1, 0) = 0. NAND is the inversion of AND: NOT(0) = 1. So Stage 1 output = 1." },
          { stepNumber: 2, instruction: "Evaluate the second stage (XOR gate).", reasoning: "Inputs to XOR gate: Stage 1 output = 1, Input C = 1." },
          { stepNumber: 3, instruction: "Apply the XOR truth condition.", reasoning: "XOR outputs 1 when inputs are different, and 0 when inputs are identical. Here, both inputs are 1 (identical). Therefore, 1 ⊕ 1 = 0." },
          { stepNumber: 4, instruction: "State final result.", reasoning: "Final output X = 0." }
        ],
        takeawayRule: "Evaluate logic circuits sequentially stage-by-stage, noting intermediate Boolean values on each wire."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Using the WHERE clause to filter aggregated functions like COUNT() or AVG() in SQL.", whyItIsWrong: "WHERE filters individual rows before grouping takes place. To filter on aggregate conditions, you must use the HAVING clause.", correctCorrection: "Use WHERE for column conditions; use HAVING for aggregate conditions (e.g. HAVING COUNT(*) > 5)." }
    ],
    guidedPracticePrompt: "Convert binary 11101011_2 directly into hexadecimal notation.",
    summaryRecap: "Hexadecimal maps to 4-bit binary nibbles. XOR outputs 1 when inputs differ. SQL filters groups using HAVING, not WHERE."
  },

  "skill-eng-tenses-conditionals": {
    id: "les-eng-tenses-conditionals",
    title: "Tense Consistency, Subjunctive Mood, & Conditional Sentences",
    hookAndIntuition: "If you say 'If I was you...', you are grammatically expressing that you might actually have been that person! The English subjunctive mood requires 'If I WERE you' to signal an impossible, hypothetical condition.",
    conceptualExplanation: "Tense consistency ensures logical chronological progression across sentences. (1) Tense Aspect Matrix: Simple, Continuous/Progressive (ongoing action), Perfect (completed action with present relevance), and Perfect Continuous. (2) The Four Conditional Structures: Zero Conditional (universal scientific truths: If + Present Simple, Present Simple, e.g. 'If you heat ice, it melts'); First Conditional (real, probable future: If + Present Simple, will + base verb, e.g. 'If it rains, we will stay indoors'); Second Conditional (unreal hypothetical present/future: If + Past Simple [were], would + base verb, e.g. 'If I won the lottery, I would build a hospital'); Third Conditional (unreal past counterfactual: If + Past Perfect, would have + past participle, e.g. 'If he had listened, he would not have failed'). (3) Subjunctive Mood: Expresses wishes, demands, and hypothetical conditions contrary to fact (e.g. 'I wish I were taller'; 'The board mandated that she submit the financial audit').",
    keyTermsAndFormulas: [
      { termOrSymbol: "Third Conditional: If + had [V3], would have [V3]", definition: "Hypothetical reflection on past actions that cannot be altered.", practicalExample: "If they had arrived earlier, they would have caught the train." },
      { termOrSymbol: "Second Conditional: If + were, would [base verb]", definition: "Hypothetical condition in present/future contrary to current reality.", practicalExample: "If I were the Governor, I would invest heavily in technical colleges." },
      { termOrSymbol: "Mandative Subjunctive", definition: "Use of base verb without third-person -s after verbs of command or necessity.", practicalExample: "It is essential that every applicant attend the interview (not 'attends')." }
    ],
    workedExamples: [
      {
        title: "Correcting Mixed Conditionals and Tense Inconsistencies",
        problemStatement: "Correct the grammatical errors in: 'If Amina had studied diligently last term, she would pass the promotional examination with distinction.'",
        steps: [
          { stepNumber: 1, instruction: "Examine the 'if' condition clause.", reasoning: "'If Amina had studied diligently last term' is in the Past Perfect tense (referring to a completed event in the past)." },
          { stepNumber: 2, instruction: "Identify the conditional form.", reasoning: "An unreal past condition requires the Third Conditional: If + Past Perfect, followed by 'would have + past participle' in the main clause." },
          { stepNumber: 3, instruction: "Analyze the main clause.", reasoning: "'she would pass' is a Second Conditional result clause, creating an ungrammatical mismatch with the past perfect condition." },
          { stepNumber: 4, instruction: "Formulate the correct grammatical sentence.", reasoning: "'If Amina had studied diligently last term, she would have passed the promotional examination with distinction.'" }
        ],
        takeawayRule: "Pair 'had + V3' strictly with 'would have + V3' when expressing past unfulfilled conditions."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Writing 'would of' instead of 'would have'.", whyItIsWrong: "'Would of' is a phonetic transcription error arising from spoken contraction 'would've'. 'Of' is a preposition, never a verb auxiliary!", correctCorrection: "Always write 'would have' or 'would've'." }
    ],
    guidedPracticePrompt: "Complete the sentence: 'Had I known about the road closure, I ________ (take) the expressway.'",
    summaryRecap: "Tenses must maintain chronological logic. 2nd conditional uses 'were/would'; 3rd conditional uses 'had studied/would have passed'."
  },

  "skill-eng-roots-affixes": {
    id: "les-eng-roots-affixes",
    title: "Morphemic Analysis: Greek/Latin Roots, Prefixes, & Suffix Transformations",
    hookAndIntuition: "Why do 'autobiography', 'automobile', and 'autonomous' all begin with 'auto-'? Because in ancient Greek, 'auto' means 'self'! Learn 30 classical morphemes, and you unlock the meanings of over 3,000 advanced academic words.",
    conceptualExplanation: "Morphology is the branch of linguistics studying internal word structure and formation. A Morpheme is the smallest meaningful unit of language. (1) Free Morphemes: can stand alone as independent words (e.g. 'light', 'act'). (2) Bound Morphemes: cannot stand alone and must attach to roots as Affixes. (3) Prefixes: attached to the front of a base, changing meaning: 'ante-' (before), 'anti-' (against), 'bene-' (good), 'mal-' (bad), 'trans-' (across), 'circum-' (around), 'poly-' (many). (4) Suffixes: attached to the end of a base, primarily transforming grammatical word class: Noun-forming suffixes ('-tion', '-ment', '-ity', '-ness'); Verb-forming suffixes ('-ize', '-ify', '-ate'); Adjective-forming suffixes ('-able', '-ous', '-ful', '-ic'); Adverb-forming suffixes ('-ly', '-ward'). (5) Inflectional Affixes (marking tense, plurality, or comparison: -s, -ed, -ing, -er) vs Derivational Affixes (creating brand new words with altered meanings or parts of speech).",
    keyTermsAndFormulas: [
      { termOrSymbol: "Derivational vs Inflectional Morphology", definition: "Derivational creates new lexical items (e.g. 'read' -> 'readable'); Inflectional marks grammatical inflection ('read' -> 'reads').", practicalExample: "Nation (noun) -> National (adjective) -> Nationalize (verb) -> Nationalization (noun)." },
      { termOrSymbol: "Classical Roots: Tele, Bio, Chron, Geo", definition: "'Tele' (distance), 'Bio' (life), 'Chron' (time), 'Geo' (earth).", practicalExample: "'Chronobiology' = study of time and biological rhythms in living organisms." },
      { termOrSymbol: "Assimilation of Prefixes", definition: "Prefixes adapting to the following consonant: 'in-' becomes 'im-' before p/b/m (impossible), 'il-' before l (illogical), 'ir-' before r (irregular).", practicalExample: "In- + rational = irrational." }
    ],
    workedExamples: [
      {
        title: "Morphologically Deconstructing an Unfamiliar Scientific Term",
        problemStatement: "Deconstruct the morphological constituents of the word 'Polysomnography' and define its medical function from its roots.",
        steps: [
          { stepNumber: 1, instruction: "Isolate prefix 'poly-'.", reasoning: "Greek prefix 'poly-' means 'many' or 'multiple'." },
          { stepNumber: 2, instruction: "Isolate root 'somn-'.", reasoning: "Latin root 'somn-' means 'sleep' (as in insomnia, somnambulist)." },
          { stepNumber: 3, instruction: "Isolate suffix / root '-graphy'.", reasoning: "Greek root '-graphy' means 'the process of recording or writing' (as in radiography, biography)." },
          { stepNumber: 4, instruction: "Synthesize the composite morphological definition.", reasoning: "Polysomnography is a multi-parameter diagnostic test that records multiple physiological biometrics (brain waves, oxygen levels, heart rate) during sleep." }
        ],
        takeawayRule: "Break complex multisyllabic academic words into prefix, root, and suffix to deduce their precise meaning."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Confusing prefixes 'ante-' and 'anti-'.", whyItIsWrong: "'Ante-' with an 'e' means BEFORE (e.g. antemeridian [AM], antecedent); 'Anti-' with an 'i' means AGAINST or OPPOSITE (e.g. antibody, antibiotic).", correctCorrection: "'Ante' = before; 'Anti' = against." }
    ],
    guidedPracticePrompt: "Identify the base root and derivational affixes in 'irresponsibility'.",
    summaryRecap: "Morphemes are the building blocks of lexis. Prefixes shift semantic meaning; suffixes transform grammatical word classes."
  },

  "skill-eng-phrasal-idioms": {
    id: "les-eng-phrasal-idioms",
    title: "Phrasal Verbs, Prepositional Collocations, & Idiomatic Fluency",
    hookAndIntuition: "If you 'look up' a word, you consult a dictionary; if you 'look down on' someone, you feel superior to them; if you 'look forward to' something, you anticipate it with joy. Adding a simple preposition completely transforms the verb!",
    conceptualExplanation: "Phrasal verbs and collocations represent the natural, idiomatic pulse of English: (1) Phrasal Verbs: A compound consisting of a verb plus a preposition or adverb particle (or both). Types: Separable Transitive (object can sit between verb and particle, e.g. 'turn off the lights' or 'turn the lights off'; pronoun objects MUST be separated: 'turn them off', not 'turn off them'); Inseparable Transitive ('run into an old friend'); and Intransitive ('the plane took off'). (2) Prepositional Collocations: Strict, arbitrary pairings of adjectives, verbs, and nouns with specific prepositions: 'depend on' (not in), 'congratulate on' (not for), 'interested in' (not with), 'comply with' (not to), 'prefer X to Y' (not than). (3) Idiomatic Expressions: Figurative metaphors whose holistic meaning cannot be derived from individual dictionary definitions (e.g. 'call it a day' = stop working; 'hit the nail on the head' = state the exact truth).",
    keyTermsAndFormulas: [
      { termOrSymbol: "Collocation: 'Congratulate ON' (NOT 'FOR')", definition: "High-frequency examination preposition collocation trap in WAEC and JAMB.", practicalExample: "I congratulate you ON your outstanding examination success." },
      { termOrSymbol: "Separable vs Inseparable Phrasal Verbs", definition: "Pronouns must be placed between separable phrasal verb parts.", practicalExample: "'Pick it up', NEVER 'pick up it'." },
      { termOrSymbol: "'Prefer ... TO' (NOT 'THAN')", definition: "Standard comparative preposition pairing for the verb prefer.", practicalExample: "She prefers reading literature TO watching television." }
    ],
    workedExamples: [
      {
        title: "Correcting High-Yield Examination Preposition Errors",
        problemStatement: "Identify and correct the prepositional error in: 'The board congratulated the manager for complying to the environmental regulations.'",
        steps: [
          { stepNumber: 1, instruction: "Analyze the verb 'congratulate'.", reasoning: "In standard English grammar, one congratulates someone ON an achievement, NOT 'for' an achievement." },
          { stepNumber: 2, instruction: "Analyze the verb 'comply'.", reasoning: "The verb 'comply' strictly pairs with the preposition 'with', NOT 'to'. (Compare with 'adhere to')." },
          { stepNumber: 3, instruction: "Rewrite the corrected sentence.", reasoning: "'The board congratulated the manager ON complying WITH the environmental regulations.'" }
        ],
        takeawayRule: "Memorize governed preposition pairings: congratulate ON, comply WITH, adhere TO, accustomed TO, interested IN."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Writing 'I prefer coffee than tea'.", whyItIsWrong: "The verb 'prefer' expresses comparison using the preposition 'to', never the conjunction 'than'.", correctCorrection: "Say: 'I prefer coffee TO tea'." }
    ],
    guidedPracticePrompt: "Choose the correct preposition: 'The suspect was accused ________ (of / for / with) armed robbery.'",
    summaryRecap: "Phrasal verbs alter meaning via particles. Pronoun objects must separate separable verbs. Prepositions collocate strictly (congratulate on, comply with, prefer to)."
  },

  "skill-eng-inference-tone": {
    id: "les-eng-inference-tone",
    title: "Critical Reading: Main Idea Extraction, Inferential Deductions, & Authorial Tone",
    hookAndIntuition: "An author writes: 'The politician promised that rivers of honey would flow through every village once he was elected.' Is the author gullible, or are they being biting, sarcastic, and cynical? Determining authorial tone is the key to true comprehension.",
    conceptualExplanation: "Reading comprehension requires evaluating both semantic content and authorial intent: (1) Main Idea Extraction: The central thesis around which an entire essay pivots. Differentiate the macro-topic (e.g. 'Climate change in the Sahel') from the specific main idea (e.g. 'Deforestation accelerates desertification in the Sahel, demanding immediate communal agroforestry'). Topic sentences in the first or last lines of paragraphs often anchor the main idea. (2) Inferential Deduction: Drawing logical conclusions from implicit textual evidence without direct explicit statements. (3) Authorial Tone: The emotional and intellectual attitude conveyed through lexis and rhetorical devices: Objective/Neutral (factual, dispassionate), Critical/Indignant (expressing disapproval or moral outrage), Sarcastic/Satirical (using irony and hyperbole to ridicule), Nostalgic (longing for the past), or Pragmatic/Didactic (practical, teaching-focused). (4) Distinguishing Fact from Opinion: Facts can be independently verified; opinions express subjective judgments, signaled by value adjectives (e.g. 'magnificent', 'terrible', 'undoubtedly').",
    keyTermsAndFormulas: [
      { termOrSymbol: "Authorial Tone Spectrum", definition: "Objective, Sceptical, Indignant, Eulogistic, Sardonic, Dispassionate.", practicalExample: "Using phrases like 'alleged progress' and 'superficial veneer' signals a sceptical tone." },
      { termOrSymbol: "Textual Evidence Anchor", definition: "A specific clause or sentence directly supporting an inferential deduction.", practicalExample: "Never select an inference choice that contradicts or lacks backing from the passage." },
      { termOrSymbol: "Fact vs Value Judgment", definition: "Fact = empirical verifiability; Value judgment = normative evaluation.", practicalExample: "Fact: 'The bridge collapsed in 2024'; Opinion: 'The bridge was an architectural disaster'." }
    ],
    workedExamples: [
      {
        title: "Deducing Authorial Tone and Unstated Implications from an Editorial Excerpt",
        problemStatement: "Read the excerpt: 'Our municipal leaders celebrated the commissioning of a single solitary solar streetlamp with ten marching brass bands, ceremonial ribands, and a catered three-course luncheon costing five times the price of the lamp itself.'\nIdentify: (a) the author's tone, and (b) the implied critique.",
        steps: [
          { stepNumber: 1, instruction: "Examine word choices and imagery.", reasoning: "Words like 'single solitary solar streetlamp' contrasted with 'ten marching brass bands', 'ceremonial ribands', and 'catered luncheon costing five times the price'." },
          { stepNumber: 2, instruction: "Identify the authorial tone.", reasoning: "The deliberate juxtaposition of a tiny trivial achievement with lavish, wasteful expenditure evokes irony and ridicule. Tone: Satirical, Sarcastic, and Mocking." },
          { stepNumber: 3, instruction: "Formulate the implied critique.", reasoning: "The author is criticizing municipal authorities for prioritizing performative public relations, political vanity, and wasteful financial mismanagement over genuine public infrastructure development." }
        ],
        takeawayRule: "Look for stark contrasts between reality and pretense to identify satirical and sarcastic authorial tone."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Assuming the 'Main Idea' of a passage is simply its one-word subject.", whyItIsWrong: "A subject is 'Solar energy'; a Main Idea is what the author ASSERTS about solar energy (e.g. 'Solar energy provides the most cost-effective solution for decentralized rural electrification').", correctCorrection: "Express the main idea as a complete sentence asserting a specific claim." }
    ],
    guidedPracticePrompt: "What tone is conveyed by the sentence: 'Despite decades of lavish subsidies, the state utility corporation remains perpetually incapable of generating steady power'?",
    summaryRecap: "Main ideas make complete claims. Inferences combine textual facts with deductive logic. Lexis and irony reveal authorial tone."
  },

  "skill-eng-figures-of-speech": {
    id: "les-eng-figures-of-speech",
    title: "Literary Stylistics: Figurative Language, Tropes, & Rhetorical Schemes",
    hookAndIntuition: "Why did Shakespeare write 'All the world's a stage, and all the men and women merely players' instead of saying 'People live their lives and do various things'? Because figurative language paints vivid, unforgettable images in the theater of the human mind.",
    conceptualExplanation: "Figurative language elevates prose and poetry by conveying meaning beyond literal denotation: (1) Tropes of Comparison: Simile (explicit comparison using 'like' or 'as', e.g. 'His voice thundered like a cannon'); Metaphor (direct equation asserting identity without comparative particles, e.g. 'He is a rock in times of crisis'); Analogy (extended explanatory comparison). (2) Tropes of Association: Metonymy (substituting an attribute or associated object for the whole, e.g. 'The pen [journalism] is mightier than the sword [military force]', 'Aso Rock announced'); Synecdoche (part representing the whole, or whole representing the part, e.g. 'All hands on deck' [sailors], 'Nigeria won the match' [the football team]). (3) Tropes of Contrast & Irony: Oxymoron (adjacent contradictory words, e.g. 'deafening silence', 'cruel kindness'); Paradox (a seemingly self-contradictory statement revealing a profound deeper truth, e.g. 'The child is father of the man'); Irony (Verbal, Situational, Dramatic). (4) Tropes of Emphasis: Hyperbole (deliberate exaggeration, e.g. 'I've told you a million times'); Litotes (deliberate understatement using double negatives, e.g. 'He is no ordinary scholar'). (5) Sound Devices: Alliteration, Assonance, Onomatopoeia.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Metaphor vs Metonymy", definition: "Metaphor equates across different conceptual domains based on similarity; Metonymy substitutes based on real-world spatial/cultural association.", practicalExample: "'The Crown' for the monarch is metonymy; 'The king is a lion' is a metaphor." },
      { termOrSymbol: "Synecdoche (Part for Whole)", definition: "Using a physical constituent part to refer to the entire entity.", practicalExample: "'Counting heads' (counting people), 'new wheels' (a car)." },
      { termOrSymbol: "Litotes (Understatement via Negative)", definition: "Affirming something by negating its opposite.", practicalExample: "'She is not a bad singer' (meaning she is a very good singer)." }
    ],
    workedExamples: [
      {
        title: "Distinguishing Metonymy from Synecdoche in Examination Questions",
        problemStatement: "Identify the specific figures of speech in these two sentences:\n(1) 'The White House issued a stern press release this morning.'\n(2) 'He bought thirty head of cattle at the livestock market.'",
        steps: [
          { stepNumber: 1, instruction: "Analyze Sentence (1).", reasoning: "A physical building ('White House') is used to represent the administration and President who work inside it. This substitution is based on physical association, not part-of-a-whole. This is Metonymy." },
          { stepNumber: 2, instruction: "Analyze Sentence (2).", reasoning: "'Head' is an anatomical body part of a cow used to represent the entire individual animal. A part representing the whole is Synecdoche." },
          { stepNumber: 3, instruction: "State clear distinctions.", reasoning: "(1) Metonymy (association), (2) Synecdoche (part for whole)." }
        ],
        takeawayRule: "Synecdoche = part-to-whole relationship; Metonymy = associative connection."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Calling any comparison a metaphor even if it contains 'like' or 'as'.", whyItIsWrong: "If comparative words 'like' or 'as' are present, the figure of speech is strictly a SIMILE. A metaphor equates directly without 'like' or 'as'.", correctCorrection: "'He ran like a cheetah' = Simile; 'He is a cheetah on the track' = Metaphor." }
    ],
    guidedPracticePrompt: "Identify the figure of speech in: 'Parting is such sweet sorrow.'",
    summaryRecap: "Metaphor equates directly; simile compares with like/as. Metonymy uses association; synecdoche uses part-for-whole. Oxymoron pairs opposites."
  },

  "skill-eng-vowels-consonants": {
    id: "les-eng-vowels-consonants",
    title: "Oral English: Monophthongs, Diphthongs, & Consonant Contrasts",
    hookAndIntuition: "Why do Nigerian students sometimes find it challenging to distinguish 'cut' from 'cat', or 'live' from 'leave'? Because English has 12 pure vowels and 8 diphthongs that don't map one-to-one with indigenous vowel systems. Mastering phonetic contrasts guarantees high scores in Oral English!",
    conceptualExplanation: "Standard English phonology contains 44 phonemes: 20 vowels and 24 consonants. (1) The 12 Pure Vowels (Monophthongs): Front vowels: /iː/ (fleece), /ɪ/ (kit), /e/ (dress), /æ/ (trap). Central vowels: /ɜː/ (nurse), /ə/ (schwa, about), /ʌ/ (strut). Back vowels: /uː/ (goose), /ʊ/ (foot), /ɔː/ (thought), /ɒ/ (lot), /ɑː/ (palm). (2) The 8 Diphthongs (gliding vowel transitions): Closing diphthongs ending in /ɪ/: /eɪ/ (face), /aɪ/ (price), /ɔɪ/ (choice). Closing diphthongs ending in /ʊ/: /əʊ/ (goat), /aʊ/ (mouth). Centring diphthongs ending in /ə/: /ɪə/ (near), /eə/ (square), /ʊə/ (cure). (3) Consonant Contrasts & Minimal Pairs: Plosives (/p/, /b/, /t/, /d/, /k/, /g/), Fricatives (/f/, /v/, /θ/ [think], /ð/ [this], /s/, /z/, /ʃ/ [ship], /ʒ/ [measure], /h/), Affricates (/tʃ/ [church], /dʒ/ [judge]), Nasals (/m/, /n/, /ŋ/ [sing]), Lateral (/l/), and Approximants (/r/, /w/, /j/ [yes]). (4) Silent Consonants: 'k' in 'knee', 'w' in 'write', 'b' in 'comb' and 'doubt', 'p' in 'receipt', 'g' in 'gnaw', 't' in 'listen'.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Dental Fricatives: /θ/ vs /ð/", definition: "/θ/ is voiceless (thin, bath, author); /ð/ is voiced (then, bathe, mother).", practicalExample: "Put tongue tip between teeth; feel vocal cord vibration on /ð/ but not /θ/." },
      { termOrSymbol: "Schwa /ə/", definition: "Weak unaccented neutral vowel found in unaccented syllables.", practicalExample: "Present in 'police' /pəˈliːs/ and 'banana' /bəˈnɑːnə/." },
      { termOrSymbol: "Silent Letters Rule", definition: "Historical letters preserved in spelling but eliminated from oral articulation.", practicalExample: "'Subtle' -> /sʌtl/ (silent b); 'debris' -> /deɪbriː/ (silent s)." }
    ],
    workedExamples: [
      {
        title: "Differentiating Voiced vs Voiceless Dental Fricatives in Oral Examinations",
        problemStatement: "From the options below, choose the word that contains the same consonant sound as the underlined letters in 'clo<u>th</u>es':\n(A) cloth   (B) breathe   (C) bath   (D) tooth",
        steps: [
          { stepNumber: 1, instruction: "Determine the phonetic realization of 'th' in 'clothes'.", reasoning: "'Clothes' is pronounced /kləʊðz/ with the voiced dental fricative /ð/ (as in 'father' or 'this')." },
          { stepNumber: 2, instruction: "Analyze option (A) 'cloth'.", reasoning: "'Cloth' is pronounced /klɒθ/ with the voiceless dental fricative /θ/." },
          { stepNumber: 3, instruction: "Analyze option (B) 'breathe'.", reasoning: "'Breathe' is a verb ending in silent 'e', pronounced /briːð/ with the voiced dental fricative /ð/." },
          { stepNumber: 4, instruction: "Analyze options (C) 'bath' and (D) 'tooth'.", reasoning: "Both end in the voiceless sound /θ/: /bɑːθ/ and /tuːθ/." },
          { stepNumber: 5, instruction: "Select the correct option.", reasoning: "Option (B) 'breathe' shares the voiced /ð/ phoneme." }
        ],
        takeawayRule: "Nouns ending in 'th' (cloth, bath, breath) are typically voiceless /θ/; related verbs ending in 'the' (clothe, bathe, breathe) are voiced /ð/."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Pronouncing the 'p' in 'receipt' or 'psychology'.", whyItIsWrong: "Etymological Greek and Latin silent letters must be suppressed in oral English. 'Receipt' is /rɪˈsiːt/.", correctCorrection: "Do not pronounce silent 'p' before 't' or 's'." }
    ],
    guidedPracticePrompt: "Which of the following words contains the vowel sound /ɜː/? (A) cat  (B) bird  (C) cart  (D) cot.",
    summaryRecap: "English has 20 vowels (12 monophthongs, 8 diphthongs) and 24 consonants. Master voiceless /θ/ vs voiced /ð/ and identify silent letters."
  },

  "skill-eng-stress-intonation": {
    id: "les-eng-stress-intonation",
    title: "Oral English: Syllable Stress Patterns, Emphatic Stress, & Intonation",
    hookAndIntuition: "Say 'COM-pact' (a small car or powder case—noun). Now say 'com-PACT' (to compress tightly—verb). In English, stress changes meaning, grammatical class, and conversational intent!",
    conceptualExplanation: "Suprasegmental phonology examines sound properties across whole syllables and sentences: (1) Syllabic Stress Rules: Disyllabic words: Nouns and Adjectives stress the first syllable ('PRE-sent', 'TA-ble', 'CLE-ver'); Verbs stress the second syllable ('pre-SENT', 'de-CIDE', 're-LAX'). Suffix Rules: Suffixes that shift stress to the penultimate (second from last) syllable include '-tion', '-sion', '-ic', '-ity' (e.g. 'pho-TO-graph' -> 'pho-to-GRA-phic'; 'e-CO-no-my' -> 'e-co-NO-mic'). Suffixes that shift stress to the antepenultimate (third from last) syllable include '-ate', '-phy', '-gy', '-al' (e.g. 'de-MO-cra-cy', 'pho-TO-gra-phy'). (2) Emphatic Sentence Stress: In a spoken utterance, stressing a specific word creates a contrastive assertion that negates an incorrect presupposition. (3) Intonation Tunes: Falling Tune (↘): Used for declarative statements, commands, and WH-questions; signals completeness and finality. Rising Tune (↗): Used for polar (Yes/No) questions, polite requests, and listing items; signals non-finality or uncertainty.",
    keyTermsAndFormulas: [
      { termOrSymbol: "Noun vs Verb Stress Shift", definition: "First syllable stressed for 2-syllable nouns; second syllable stressed for 2-syllable verbs.", practicalExample: "'CON-tract' (legal document) vs 'con-TRACT' (to shrink or catch illness)." },
      { termOrSymbol: "Penultimate Rule (-ic, -tion, -sion)", definition: "Places primary syllable stress on the syllable immediately preceding the suffix.", practicalExample: "'spe-CI-fic', 'com-mu-ni-CA-tion'." },
      { termOrSymbol: "Falling Tune (↘) vs Rising Tune (↗)", definition: "Falling = statements and WH-questions; Rising = Yes/No questions.", practicalExample: "'Who is coming?' (↘ Falling); 'Is he coming?' (↗ Rising)." }
    ],
    workedExamples: [
      {
        title: "Identifying Primary Syllable Stress in Polysyllabic Examination Words",
        problemStatement: "Identify which syllable carries the primary stress in the word 'ELECTRICITY':\n(A) E-lec-tri-ci-ty   (B) e-LEC-tri-ci-ty   (C) e-lec-TRI-ci-ty   (D) e-lec-tri-CI-ty",
        steps: [
          { stepNumber: 1, instruction: "Break the word into its syllables.", reasoning: "e - lec - tri - ci - ty (5 syllables)." },
          { stepNumber: 2, instruction: "Identify the defining suffix.", reasoning: "The word ends in the nominal suffix '-ity'." },
          { stepNumber: 3, instruction: "Apply the '-ity' stress rule.", reasoning: "Words ending in '-ity' always place primary stress on the antepenultimate syllable (third syllable from the end) or the syllable directly preceding '-ity'." },
          { stepNumber: 4, instruction: "Count backwards from the end.", reasoning: "Syllable 5: '-ty'. Syllable 4: '-ci-'. Syllable 3: '-TRI-'. Syllable 2: '-lec-'. Syllable 1: 'e-'." },
          { stepNumber: 5, instruction: "Select the correct option.", reasoning: "The primary stress falls on the third syllable: e-lec-TRI-ci-ty. Option (C)." }
        ],
        takeawayRule: "Suffixes '-ity', '-ate', '-phy', and '-gy' place stress on the antepenultimate (third from last) syllable."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Assuming compound nouns stress the second word.", whyItIsWrong: "Most compound nouns place primary stress firmly on the FIRST word: 'BLACK-board' (not black-BOARD), 'TEA-cup' (not tea-CUP), 'POST-office'.", correctCorrection: "In compound nouns, stress the first word." }
    ],
    guidedPracticePrompt: "Which syllable carries primary stress in 'examination' and 'refrigerator'?",
    summaryRecap: "Stress patterns distinguish nouns from verbs. Suffixes (-tion, -ic, -ity) govern stress placement. Falling tune marks statements; rising tune marks Yes/No questions."
  },

  "skill-eng-word-classes": {
    id: "les-eng-word-classes",
    title: "Parts of Speech: Word Classes, Pronoun Cases, & Syntactic Functions",
    hookAndIntuition: "Can the single word 'round' be a noun, a verb, an adjective, an adverb, AND a preposition? Yes! 'A round of golf' (noun), 'to round a corner' (verb), 'a round table' (adjective), 'he turned round' (adverb), 'walking round the park' (preposition). Words are defined not by what they look like, but by what they DO in a sentence!",
    conceptualExplanation: "The eight classical word classes (parts of speech) divide into Open Classes (nouns, verbs, adjectives, adverbs—freely admitting new words) and Closed Classes (pronouns, prepositions, conjunctions, determiners/interjections). (1) Nouns: Common, Proper, Abstract, Concrete, Collective, Countable, and Uncountable. (2) Pronoun Cases: Subjective/Nominative (I, he, she, we, they, who); Objective/Accusative (me, him, her, us, them, whom); Possessive (my/mine, your/yours, his, her/hers, their/theirs); Reflexive/Intensive (myself, themselves). Case Rule: Pronouns following prepositions and transitive verbs MUST take the objective case ('Between you and me', NOT 'Between you and I'). (3) Adjectives: Modifying nouns, following strict order of adjectives: Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material -> Purpose (OSASCOMP). (4) Adverbs: Modifying verbs, adjectives, or other adverbs (manner, time, place, degree, frequency). (5) Prepositions showing spatial, temporal, or logical relations.",
    keyTermsAndFormulas: [
      { termOrSymbol: "OSASCOMP Adjective Order", definition: "Opinion, Size, Age, Shape, Color, Origin, Material, Purpose.", practicalExample: "'A lovely (opinion) small (size) antique (age) circular (shape) wooden (material) table'." },
      { termOrSymbol: "Prepositional Pronoun Case Rule", definition: "Objects of prepositions strictly take the objective pronoun case (me, him, her, them, us).", practicalExample: "'Divide the prize between him and me' (never 'he and I')." },
      { termOrSymbol: "Who vs Whom", definition: "'Who' functions as subjective pronoun (substitute 'he'); 'Whom' functions as objective pronoun (substitute 'him').", practicalExample: "'Whom did you invite?' (You invited him -> whom)." }
    ],
    workedExamples: [
      {
        title: "Resolving Nominative vs Objective Pronoun Cases in Compound Phrases",
        problemStatement: "Select the grammatically correct pronoun to complete the sentence:\n'The scholarship committee invited my sister and (I / me) to the annual award ceremony.'",
        steps: [
          { stepNumber: 1, instruction: "Identify the syntactic role of the pronoun phrase in the sentence.", reasoning: "'The scholarship committee' is the subject; 'invited' is the transitive finite verb; 'my sister and [pronoun]' is the direct object receiving the action of the verb." },
          { stepNumber: 2, instruction: "Isolate the pronoun from the compound phrase.", reasoning: "Remove 'my sister and' to test the pronoun in isolation: 'The committee invited I' vs 'The committee invited me'." },
          { stepNumber: 3, instruction: "Apply the objective case rule.", reasoning: "As direct object of the transitive verb 'invited', the pronoun must be in the objective case: 'me'." },
          { stepNumber: 4, instruction: "State the complete correct sentence.", reasoning: "'The scholarship committee invited my sister and ME to the annual award ceremony.'" }
        ],
        takeawayRule: "Test compound pronoun phrases by dropping the other noun: if it sounds wrong alone ('invited I'), it is wrong in the compound."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Saying 'Between you and I'.", whyItIsWrong: "'Between' is a preposition. Prepositions govern the objective case. 'I' is nominative. It must be 'Between you and me'.", correctCorrection: "Always say: 'Between you and me'." }
    ],
    guidedPracticePrompt: "Arrange in correct order: table / mahogany / circular / Nigerian / large / beautiful.",
    summaryRecap: "Word classes define syntactic function. Use OSASCOMP for adjective order. Prepositions govern objective pronouns (between you and me)."
  },

  "skill-eng-clauses-sentence-types": {
    id: "les-eng-clauses-sentence-types",
    title: "Syntax: Clause Functions, Sentence Architecture, & Voice Transformations",
    hookAndIntuition: "Why did a newspaper editor change 'A reckless driver crashed into three pedestrians' into 'Three pedestrians were struck by a vehicle'? In active voice, the driver takes the blame; in passive voice, the focus shifts to the victims. Voice and syntax determine focus, accountability, and rhetorical punch.",
    conceptualExplanation: "Syntax examines how words combine into phrases, clauses, and sentences: (1) Clause Types & Functions: Independent Clause (can stand alone as a complete sentence) vs Dependent / Subordinate Clause. Noun Clause: Acts as Subject ('What she revealed surprised us'), Object of Verb ('He knows where the treasure is hidden'), or Complement ('The truth is that we lost'). Relative / Adjectival Clause: Modifies a noun, introduced by relative pronouns who, whom, which, that, whose. Adverbial Clause: Modifies a verb or adjective, answering when (time), where (place), why (reason), how (manner), under what condition, or with what concession. (2) Structural Sentence Types: Simple (1 independent clause), Compound (2 independent clauses + coordinating conjunction), Complex (1 independent + 1+ dependent clauses), and Compound-Complex (2+ independent + 1+ dependent clauses). (3) Active vs Passive Voice: Active Voice (Subject performs action: 'The dog bit the man') vs Passive Voice (Subject receives action: 'The man was bitten by the dog': Object + auxiliary 'be' + Past Participle + [by agent]).",
    keyTermsAndFormulas: [
      { termOrSymbol: "Passive Voice Formula: Object + [be] + Past Participle + [by Agent]", definition: "Transforms focus from the agent to the patient/recipient of action.", practicalExample: "'The engineers repaired the bridge' -> 'The bridge was repaired by the engineers'." },
      { termOrSymbol: "Adverbial Clause of Concession", definition: "Introduced by 'although', 'even though', 'whereas', showing counter-expectation.", practicalExample: "'Although the exam was arduous, the students excelled'." },
      { termOrSymbol: "FANBOYS Coordinating Conjunctions", definition: "For, And, Nor, But, Or, Yet, So — used strictly to connect compound sentences.", practicalExample: "Use a comma before FANBOYS when joining two independent clauses." }
    ],
    workedExamples: [
      {
        title: "Identifying the Grammatical Name and Function of an Exam Clause",
        problemStatement: "Identify the grammatical name and state the exact function of the underlined clause:\n'The hypothesis <u>that the research team proposed</u> was validated by clinical trials.'",
        steps: [
          { stepNumber: 1, instruction: "Determine whether the clause can stand alone.", reasoning: "'that the research team proposed' cannot stand alone as a complete thought. It is a subordinate dependent clause." },
          { stepNumber: 2, instruction: "Identify the word the clause relates to in the main sentence.", reasoning: "The clause follows immediately after the noun 'hypothesis' and describes or defines which hypothesis was validated." },
          { stepNumber: 3, instruction: "Determine the grammatical name.", reasoning: "A subordinate clause that modifies a noun is an Adjectival Clause (or Relative Clause)." },
          { stepNumber: 4, instruction: "State its specific grammatical function.", reasoning: "Grammatical function: It qualifies (or modifies) the noun 'hypothesis' in the main clause." }
        ],
        takeawayRule: "In WAEC/NECO exams: Grammatical Name = Adjectival/Relative Clause; Function = 'It qualifies the noun [insert word]'."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Writing 'It modifies the subject' instead of naming the specific noun in grammatical function questions.", whyItIsWrong: "WAEC marking schemes deduct marks for vague answers. You must explicitly name the exact word: 'It qualifies the noun hypothesis'.", correctCorrection: "Always name the exact word being modified." }
    ],
    guidedPracticePrompt: "Convert to passive voice: 'The government has built three modern science laboratories in our school.'",
    summaryRecap: "Clauses contain a subject and finite verb. Noun clauses act as subjects/objects; adjectival clauses modify nouns; adverbial clauses modify verbs. Active voice highlights the doer; passive highlights the receiver."
  },

  "skill-eng-summary-condensation": {
    id: "les-eng-summary-condensation",
    title: "Summary Writing: Paraphrasing, Sentence Condensation, & Discourse Cohesion",
    hookAndIntuition: "If a company CEO has 2 minutes before a board meeting, they don't want a 20-page transcript—they want a one-paragraph executive summary containing the essential bottom line. Summary writing is the high-value skill of distilling complex information without losing meaning.",
    conceptualExplanation: "Summary writing tests your ability to extract core ideas from extraneous verbiage and restate them in clear, concise, original prose: (1) WAEC/NECO Summary Rules: Rule 1: Read the question prompt first to identify the exact target focus before reading the passage; Rule 2: Write answers in complete, grammatically sound sentences (never bullet fragments); Rule 3: Avoid mindless verbatim lifting—rephrase in your own words while retaining technical terminology; Rule 4: Eliminate all illustrative examples, anecdotes, rhetorical questions, analogies, statistics, and repetitions; Rule 5: Do not introduce extraneous outside knowledge or personal opinions not found in the passage. (2) Condensation Techniques: Subordinating clauses, replacing wordy phrases with precise single words (e.g. 'at this point in time' -> 'now'; 'in the event that' -> 'if'), and utilizing cohesive discourse markers ('Consequently', 'Furthermore', 'However').",
    keyTermsAndFormulas: [
      { termOrSymbol: "No Mindless Verbatim Lifting", definition: "WAEC penalizes copying verbatim sentences word-for-word from the passage without paraphrasing.", practicalExample: "Extract the core claim and reconstruct it using fresh syntactic architecture." },
      { termOrSymbol: "Elimination of Examples and Digressions", definition: "Examples (signaled by 'for instance', 'such as', 'like') must be completely excised from summaries.", practicalExample: "If text says 'Fruits like oranges, apples, and bananas contain vitamins', write: 'Fruits are rich in vitamins'." },
      { termOrSymbol: "Complete Sentence Criterion", definition: "Each summary point must be a grammatically complete standalone sentence beginning with a capital letter and ending with a period.", practicalExample: "Writing 'Because of water shortage' loses marks; write 'Residents suffer due to acute water scarcity'." }
    ],
    workedExamples: [
      {
        title: "Condensing a Wordy Paragraph into a Concise Single-Sentence Summary Point",
        problemStatement: "Condense the following 65-word paragraph into a single summary sentence of under 15 words explaining why youth unemployment is rising:\n'In contemporary society, thousands of ambitious young graduates pour out of tertiary institutions annually, yet employers consistently lament that these job seekers lack the critical digital programming competencies, technical aptitude, and problem-solving agility that modern 21st-century technological enterprises urgently require to maintain competitiveness.'",
        steps: [
          { stepNumber: 1, instruction: "Identify the core cause and effect.", reasoning: "Graduates lack the specific technical and digital skills required by modern employers." },
          { stepNumber: 2, instruction: "Eliminate decorative adjectives and filler phrases.", reasoning: "Excise: 'In contemporary society', 'thousands of ambitious young graduates', 'pour out of tertiary institutions annually', 'consistently lament', 'urgently require to maintain competitiveness'." },
          { stepNumber: 3, instruction: "Formulate a concise summary sentence.", reasoning: "'Youth unemployment increases because graduates lack the technical skills demanded by modern employers.' (13 words)." },
          { stepNumber: 4, instruction: "Verify against rules.", reasoning: "It is a complete sentence, accurately captures the core idea, omits filler, and does not lift verbatim." }
        ],
        takeawayRule: "Strip away all introductory flourish and qualifying adjectives to leave the core subject-verb-object message intact."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Writing summary points as phrases without finite verbs (e.g. 'Lack of clean water in rural areas').", whyItIsWrong: "Examination boards assign ZERO marks for answers that are not grammatically complete sentences with a subject and finite verb.", correctCorrection: "Write a complete sentence: 'Rural areas suffer from a lack of clean water.'" }
    ],
    guidedPracticePrompt: "Summarize in one sentence the primary benefit of renewable solar energy for rural health clinics.",
    summaryRecap: "Read prompts first. Write complete standalone sentences. Eliminate examples, statistics, and anecdotes. Paraphrase in your own words."
  },

  "skill-eng-rhetorical-writing-forms": {
    id: "les-eng-rhetorical-writing-forms",
    title: "Advanced Composition: Essay Architecture, Paragraph Cohesion, & Discursive Registers",
    hookAndIntuition: "A great essay is like a classical symphony: it begins with an overture (introduction), introduces contrasting themes (body arguments), builds to a powerful climax (refutation of counterarguments), and resolves into a memorable finale (conclusion). Cohesion and rhetorical power turn good writing into art.",
    conceptualExplanation: "Composition writing demands mastery of diverse rhetorical modes, audience registers, and structural frameworks: (1) Rhetorical Essay Modes: Narrative (chronological sensory storytelling with characterization and climax); Descriptive (vivid spatial imagery utilizing sensory details); Expository (objective, balanced explanation of processes, concepts, or phenomena); and Argumentative / Discursive (persuasive advocacy defending a claim with evidence, refuting opposing viewpoints). (2) Paragraph Cohesion (The MEAL / TEEL Method): Topic Sentence (stating the main point), Explanation (expanding the reasoning), Evidence / Example (concrete data, testimony, or illustration), and Link (connecting back to the overarching thesis). (3) Cohesive Ties & Discourse Markers: Additive ('Furthermore', 'Moreover'), Adversative / Contrastive ('Conversely', 'On the contrary', 'Notwithstanding'), Causal ('Consequently', 'Thus', 'Hence'). (4) Audience & Register Adaptation: Adjusting vocabulary and tone appropriately for letters to the editor, formal administrative petitions, articles for publication, debate speeches ('Mr. Chairman, panel of judges...'), or informal correspondence.",
    keyTermsAndFormulas: [
      { termOrSymbol: "TEEL Paragraph Structure", definition: "Topic sentence, Explanation, Evidence/Example, Link to thesis.", practicalExample: "Ensures every single body paragraph remains anchored to the central essay claim." },
      { termOrSymbol: "Debate Speech Conventions", definition: "Vocative opening salutation, direct engagement with opponents, and persuasive rhetoric.", practicalExample: "'Mr. Chairman, esteemed panel of judges, accurate timekeeper, and co-debaters...'" },
      { termOrSymbol: "Rhetorical Question", definition: "A question posed for persuasive effect without requiring an answer, prompting the audience to agree.", practicalExample: "'Can we afford to neglect our children's education in an increasingly competitive world?'" }
    ],
    workedExamples: [
      {
        title: "Constructing a Cohesive Discursive Paragraph using the TEEL Method",
        problemStatement: "Write an argumentative body paragraph defending the proposition that 'Vocational education is as valuable as university degrees' using the TEEL framework.",
        steps: [
          { stepNumber: 1, instruction: "Topic Sentence (T).", reasoning: "'First and foremost, vocational education directly equips youth with practical, highly marketable skills that generate immediate employment.'" },
          { stepNumber: 2, instruction: "Explanation (E).", reasoning: "'While university curricula frequently emphasize theoretical scholarship that may not directly translate into industry requirements, vocational apprenticeships cultivate hands-on expertise in electrical engineering, plumbing, and software coding.'" },
          { stepNumber: 3, instruction: "Evidence / Example (E).", reasoning: "'For instance, recent labor market surveys reveal that certified solar technicians in Lagos secure sustainable self-employment within six months of graduation, outperforming humanities degree holders.'" },
          { stepNumber: 4, instruction: "Link (L).", reasoning: "'Consequently, technical craftsmanship provides an indispensable catalyst for economic self-reliance, proving every bit as vital as conventional academic degrees.'" }
        ],
        takeawayRule: "Use TEEL to ensure your argument progresses logically from broad claim to deep explanation, concrete evidence, and thesis link."
      }
    ],
    commonMisconceptionsAndTraps: [
      { misconception: "Writing an entire essay as one huge unbroken block of text without paragraph breaks.", whyItIsWrong: "Unbroken text shows poor organizational thinking and loses major marks in organization and mechanical accuracy.", correctCorrection: "Indent or leave a line space between paragraphs. Limit each paragraph to one central idea." }
    ],
    guidedPracticePrompt: "Draft an opening hook and thesis statement for an essay titled 'The Role of Youth in Combating Cybercrime'.",
    summaryRecap: "Use TEEL paragraph architecture. Adapt register to the target genre (debates, formal petitions, articles). Cohesive transitions maintain logical flow."
  }
};
