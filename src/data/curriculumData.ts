import {
  EducationalLevel,
  LearningDomain,
  Subject,
  Unit,
  Badge,
  PracticeQuestion,
  LearnerProfile,
  ExamSimulation,
  TeacherIntervention,
  ParentChildSummary
} from "../types/curriculum";
import { ExtendedLearnerProfile } from "../types/learner";
import {
  ALL_CURRICULUM_UNITS,
  ENRICHED_MATHEMATICS_UNITS
} from "./extendedCurriculumUnits";
import { EXPANDED_151_SUBJECT_CATEGORIES, TOTAL_EXPANDED_SUBJECT_COUNT } from "./expandedSubjectCategories";
import { COMMON_ENTRANCE_FULL_EXAM_SIMULATION } from "./commonEntranceExamPackage";

export const LEARNING_DOMAINS: LearningDomain[] = [
  {
    id: "mathematics",
    name: "Mathematics",
    tagline: "The Universal Language of Logic & Problem Solving",
    description: "From arithmetic foundations to differential calculus, coordinate geometry, and competitive examination mastery.",
    iconName: "Binary",
    accentColor: "indigo",
    isFlagship: true,
    status: "active",
    subjectsCount: 17
  },
  {
    id: "science",
    name: "Natural & Applied Sciences",
    tagline: "Physics, Chemistry, Biology & Earth Sciences",
    description: "Understand the physical cosmos, molecular mechanisms, genetics, mechanics, agriculture, health, and laboratory inquiry.",
    iconName: "Atom",
    accentColor: "teal",
    isFlagship: true,
    status: "active",
    subjectsCount: 26
  },
  {
    id: "computing_ai",
    name: "Computer Science & AI",
    tagline: "Algorithms, Python, Software & Machine Intelligence",
    description: "Computational thinking, structured programming, web architecture, robotics, technical drafting, and applied neural networks.",
    iconName: "Cpu",
    accentColor: "cyan",
    isFlagship: true,
    status: "active",
    subjectsCount: 25
  },
  {
    id: "business_finance",
    name: "Economics & Financial Literacy",
    tagline: "Markets, Accounting, Wealth Building & Enterprise",
    description: "Microeconomics, balance sheets, corporate accounting, personal investment models, commerce, and entrepreneurial skills.",
    iconName: "TrendingUp",
    accentColor: "emerald",
    isFlagship: false,
    status: "expanding",
    subjectsCount: 15
  },
  {
    id: "language_comm",
    name: "English & Communication",
    tagline: "Rhetoric, Critical Reading, Academic & Professional Writing",
    description: "Grammar mastery, comprehension synthesis, literature, national and foreign languages, and verbal reasoning.",
    iconName: "BookOpen",
    accentColor: "amber",
    isFlagship: true,
    status: "active",
    subjectsCount: 23
  },
  {
    id: "career_uni_prep",
    name: "University & Career Pathways",
    tagline: "WAEC, JAMB, SAT, Professional Portfolios, Humanities & Clubs",
    description: "Targeted examination simulations, academic scholarship prep, research methodology, social studies, civics, and innovation clubs.",
    iconName: "GraduationCap",
    accentColor: "rose",
    isFlagship: false,
    status: "active",
    subjectsCount: 55
  }
];

export function getDomainIdForCategory(code: string): string {
  if (
    code.startsWith("pri_math") ||
    code.startsWith("pri_quantitative") ||
    code.startsWith("jss_math") ||
    code.startsWith("sss_general_math") ||
    code.startsWith("sss_further_math") ||
    code.includes("actuarial_math") ||
    code.includes("number_patterns") ||
    code === "hall_engineering_gate_prep" ||
    code.includes("algebraic") ||
    code.includes("trigonometry") ||
    code.includes("linear_graphs") ||
    code.includes("sets_venn")
  ) {
    return "mathematics";
  }

  if (
    code.includes("comp") ||
    code.includes("coding") ||
    code.includes("robot") ||
    code.includes("data_processing") ||
    code.includes("technical_drawing") ||
    code.includes("applied_electricity") ||
    code.includes("auto_mechanics") ||
    code.includes("building_construction") ||
    code.includes("woodwork") ||
    code.includes("metalwork") ||
    code.includes("electronics") ||
    code.includes("telecommunication") ||
    code.includes("basic_technology") ||
    (!code.includes("agric") && code.includes("engineering")) ||
    code.includes("maker")
  ) {
    return "computing_ai";
  }

  if (
    code.includes("science") ||
    code.includes("physics") ||
    code.includes("chemistry") ||
    code.includes("biology") ||
    code.includes("agric") ||
    code.includes("animal_husbandry") ||
    code.includes("fisheries") ||
    code.includes("food_nutrition") ||
    code.includes("mining_geology") ||
    code.includes("geography") ||
    code.includes("health") ||
    code.includes("home_economics") ||
    code.includes("mcat") ||
    code.includes("olympiad")
  ) {
    return "science";
  }

  if (
    code.includes("business") ||
    code.includes("accounting") ||
    code.includes("commerce") ||
    code.includes("economics") ||
    code.includes("marketing") ||
    code.includes("office") ||
    code.includes("store") ||
    code.includes("banking") ||
    code.includes("insurance") ||
    code.includes("entrepreneurship") ||
    code.includes("financial") ||
    code.includes("investment")
  ) {
    return "business_finance";
  }

  if (
    code.includes("english") ||
    code.includes("phonics") ||
    code.includes("spelling") ||
    code.includes("handwriting") ||
    code.includes("verbal_reasoning") ||
    code.includes("creative_writing") ||
    code.includes("french") ||
    code.includes("arabic") ||
    code.includes("yoruba") ||
    code.includes("igbo") ||
    code.includes("hausa") ||
    code.includes("literature") ||
    code.includes("public_speaking") ||
    code.includes("academic_research") ||
    code.includes("nonfiction") ||
    code.includes("ielts")
  ) {
    return "language_comm";
  }

  return "career_uni_prep";
}

export const CANONICAL_CORE_SUBJECTS: Subject[] = [
  {
    id: "math_core",
    domainId: "mathematics",
    title: "Comprehensive Mathematics",
    code: "MTH-100",
    description: "Foundational arithmetic through upper-secondary calculus and analytical geometry.",
    iconName: "Calculator",
    levels: ["primary_foundations", "upper_primary", "junior_secondary", "senior_secondary", "university_prep", "exam_prep"],
    curricula: ["NERDC_NIGERIAN", "WAEC_WASSCE", "JAMB_UTME", "CAMBRIDGE_IGCSE", "COMMON_ENTRANCE"],
    unitsCount: 8,
    totalMasteryPoints: 2400
  },
  {
    id: "math_algebra",
    domainId: "mathematics",
    title: "Algebraic Mastery & Functions",
    code: "MTH-ALG",
    description: "Linear systems, quadratic factorization, exponential growth, and polynomials.",
    iconName: "Variable",
    levels: ["junior_secondary", "senior_secondary", "university_prep"],
    curricula: ["WAEC_WASSCE", "JAMB_UTME", "CAMBRIDGE_IGCSE"],
    unitsCount: 6,
    totalMasteryPoints: 1800
  },
  {
    id: "math_geom_trig",
    domainId: "mathematics",
    title: "Geometry, Trigonometry & Vectors",
    code: "MTH-GEO",
    description: "Euclidean geometry, circle theorems, sine/cosine laws, bearings, and coordinate planes.",
    iconName: "Compass",
    levels: ["junior_secondary", "senior_secondary", "university_prep"],
    curricula: ["WAEC_WASSCE", "JAMB_UTME"],
    unitsCount: 5,
    totalMasteryPoints: 1500
  },
  {
    id: "math_calculus",
    domainId: "mathematics",
    title: "Calculus & Advanced Analysis",
    code: "MTH-CALC",
    description: "Limits, differential rates of change, integration techniques, and applications in physics.",
    iconName: "Activity",
    levels: ["senior_secondary", "university_prep"],
    curricula: ["WAEC_WASSCE", "JAMB_UTME", "CAMBRIDGE_IGCSE"],
    unitsCount: 4,
    totalMasteryPoints: 1200
  },
  {
    id: "sci_physics",
    domainId: "science",
    title: "Physics: Mechanics, Waves & Modern Systems",
    code: "PHY-200",
    description: "Kinematics, Newton's laws, energy conversion, electromagnetic wave optics, and atomic physics.",
    iconName: "Zap",
    levels: ["primary_foundations", "upper_primary", "junior_secondary", "senior_secondary", "university_prep", "exam_prep"],
    curricula: ["NERDC_NIGERIAN", "WAEC_WASSCE", "JAMB_UTME", "CAMBRIDGE_IGCSE"],
    unitsCount: 6,
    totalMasteryPoints: 2000
  },
  {
    id: "sci_chemistry",
    domainId: "science",
    title: "Chemistry: Molecular Systems & Stoichiometry",
    code: "CHM-200",
    description: "Atomic structure, periodic trends, quantitative stoichiometry, chemical bonding, and redox processes.",
    iconName: "FlaskConical",
    levels: ["senior_secondary", "university_prep", "exam_prep"],
    curricula: ["NERDC_NIGERIAN", "WAEC_WASSCE", "JAMB_UTME", "CAMBRIDGE_IGCSE"],
    unitsCount: 4,
    totalMasteryPoints: 1600
  },
  {
    id: "sci_biology",
    domainId: "science",
    title: "Biology: Cellular Dynamics, Genetics & Ecology",
    code: "BIO-200",
    description: "Cell biology, organelle function, Mendelian genetics, DNA replication, and ecological homeostasis.",
    iconName: "Dna",
    levels: ["senior_secondary", "university_prep", "exam_prep"],
    curricula: ["NERDC_NIGERIAN", "WAEC_WASSCE", "JAMB_UTME", "CAMBRIDGE_IGCSE"],
    unitsCount: 3,
    totalMasteryPoints: 1200
  },
  {
    id: "tech_compsci",
    domainId: "computing_ai",
    title: "Computer Science, Data & Computational Logic",
    code: "CSC-101",
    description: "Number systems, Boolean algebra, algorithm design, pseudocode, and Python programming foundations.",
    iconName: "Cpu",
    levels: ["primary_foundations", "upper_primary", "junior_secondary", "senior_secondary", "university_prep", "exam_prep"],
    curricula: ["NERDC_NIGERIAN", "WAEC_WASSCE", "CAMBRIDGE_IGCSE"],
    unitsCount: 5,
    totalMasteryPoints: 1600
  },
  {
    id: "lang_english",
    domainId: "language_comm",
    title: "English Language & ESL (English as a Second Language)",
    code: "ENG-ESL-101",
    description: "CEFR-aligned ESL pedagogy: phonetics, minimal pairs, contextual collocations, progressive grammar, listening, speaking, reading, and academic writing.",
    iconName: "BookOpen",
    levels: ["primary_foundations", "upper_primary", "junior_secondary", "senior_secondary", "university_prep", "exam_prep"],
    curricula: ["NERDC_NIGERIAN", "WAEC_WASSCE", "JAMB_UTME", "CAMBRIDGE_IGCSE"],
    unitsCount: 8,
    totalMasteryPoints: 2400
  },
  {
    id: "comm_financial_lit",
    domainId: "business_finance",
    title: "Financial Literacy, Accounting & Wealth Building",
    code: "FIN-101",
    description: "Simple/compound interest models, depreciation, double-entry balance sheets, and cash flow analysis.",
    iconName: "TrendingUp",
    levels: ["senior_secondary", "university_prep"],
    curricula: ["NERDC_NIGERIAN", "WAEC_WASSCE", "COMMON_ENTRANCE"],
    unitsCount: 2,
    totalMasteryPoints: 800
  }
];

export const EXPANDED_151_SUBJECTS: Subject[] = EXPANDED_151_SUBJECT_CATEGORIES.map((cat) => ({
  id: cat.code,
  domainId: getDomainIdForCategory(cat.code),
  title: cat.name,
  code: cat.code.toUpperCase().replace(/_/g, "-"),
  description: cat.description,
  tagline: cat.tagline,
  iconName: cat.iconName,
  levels: cat.activeLevels,
  curricula: [
    "NERDC_NIGERIAN",
    "WAEC_WASSCE",
    "JAMB_UTME",
    "CAMBRIDGE_IGCSE",
    "COMMON_ENTRANCE"
  ],
  unitsCount: cat.courseCount * 2 || 4,
  totalMasteryPoints: (cat.courseCount * 2 || 4) * 300,
  stage: cat.stage,
  keywords: cat.keywords,
  courseCount: cat.courseCount
}));

/**
 * Complete, verified catalogue of all 151 multidisciplinary subject definitions
 * spanning Primary Foundations, Junior Secondary, Senior Secondary (Science, Tech,
 * Commercial, Arts), and Advanced University & Standardized Exam Hall pathways.
 */
export const COMPLETE_151_SUBJECT_DEFINITIONS: Subject[] = EXPANDED_151_SUBJECTS;

export const SUBJECTS: Subject[] = [
  ...CANONICAL_CORE_SUBJECTS,
  ...EXPANDED_151_SUBJECTS
];

/**
 * Fast lookup for a subject by its identifier or formatted code
 */
export function getSubjectByCode(code: string): Subject | undefined {
  const normalized = code.toLowerCase().trim();
  return SUBJECTS.find(
    (s) =>
      s.id.toLowerCase() === normalized ||
      s.code.toLowerCase() === normalized ||
      s.code.toLowerCase().replace(/-/g, "_") === normalized
  );
}

/**
 * Retrieves subjects filtered by academic stage
 */
export function getSubjectsByStage(
  stage: "all" | "primary" | "secondary" | "advanced"
): Subject[] {
  if (stage === "all") return SUBJECTS;
  return SUBJECTS.filter((s) => s.stage === stage);
}

/**
 * Searches curriculum subjects across 151 definitions by name, code, tagline, or keyword
 */
export function searchCurriculumSubjects(
  query: string,
  options?: {
    stage?: "all" | "primary" | "secondary" | "advanced";
    domainId?: string;
    level?: EducationalLevel;
  }
): Subject[] {
  const q = query.toLowerCase().trim();
  return SUBJECTS.filter((s) => {
    if (options?.stage && options.stage !== "all" && s.stage !== options.stage) {
      return false;
    }
    if (options?.domainId && s.domainId !== options.domainId) {
      return false;
    }
    if (options?.level && !s.levels.includes(options.level)) {
      return false;
    }
    if (!q) return true;
    return (
      s.title.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q) ||
      (s.tagline && s.tagline.toLowerCase().includes(q)) ||
      s.description.toLowerCase().includes(q) ||
      (s.keywords && s.keywords.some((k) => k.toLowerCase().includes(q)))
    );
  });
}

export const MATHEMATICS_UNITS: Unit[] = [
  {
    id: "unit-foundations-numbers",
    subjectId: "math_core",
    level: "upper_primary",
    title: "Fractions, Decimals & Percentages",
    code: "UNIT-01",
    description: "Develop effortless computational agility across mixed fractions, decimal conversions, and ratio applications.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-frac-operations",
        unitId: "unit-foundations-numbers",
        title: "Fraction Operations & Reciprocals",
        code: "SKL-FRAC-101",
        summary: "Adding, subtracting, multiplying and dividing fractions with unlike denominators.",
        objectives: [
          "Find Lowest Common Multiple (LCM) for unlike denominators",
          "Perform fraction division by multiplying by the reciprocal",
          "Convert improper fractions to simplified mixed numerals"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-frac-1",
            type: "multiple_choice",
            questionText: "Calculate the exact value of the following fraction operation in simplest form:",
            mathExpression: "\\frac{3}{4} \\div \\frac{2}{5}",
            options: ["1 \\frac{7}{8}", "\\frac{6}{20}", "\\frac{3}{10}", "1 \\frac{1}{2}"],
            correctAnswer: "1 \\frac{7}{8}",
            explanation: "To divide by 2/5, multiply by its reciprocal 5/2: (3/4) × (5/2) = 15/8 = 1 7/8.",
            hintLadder: [
              "Recall the fraction division rule: keep the first fraction, change division to multiplication, and flip the second fraction.",
              "Multiply 3/4 by 5/2 to obtain (3 × 5) / (4 × 2) = 15/8.",
              "Convert the improper fraction 15/8 into a mixed number: 15 ÷ 8 = 1 remainder 7, giving 1 7/8."
            ],
            misconceptionAlerts: [
              { trigger: "\\frac{6}{20}", note: "Did you multiply straight across without inverting the divisor (2/5)?" },
              { trigger: "\\frac{3}{10}", note: "Check your numerator: 3 × 5 = 15, not 3." }
            ],
            skillId: "skill-frac-operations",
            difficulty: "easy"
          },
          {
            id: "q-frac-2",
            type: "multiple_choice",
            questionText: "Evaluate the expression with mixed numbers:",
            mathExpression: "2\\frac{1}{3} + 1\\frac{3}{4}",
            options: ["4\\frac{1}{12}", "3\\frac{4}{7}", "4\\frac{1}{6}", "3\\frac{1}{12}"],
            correctAnswer: "4\\frac{1}{12}",
            explanation: "Convert to common denominator 12: 2 4/12 + 1 9/12 = 3 13/12 = 4 1/12.",
            hintLadder: [
              "First add whole numbers: 2 + 1 = 3.",
              "Find common denominator for 1/3 and 3/4. LCM(3, 4) = 12.",
              "1/3 = 4/12 and 3/4 = 9/12. 4/12 + 9/12 = 13/12 = 1 1/12. Combined: 3 + 1 1/12 = 4 1/12."
            ],
            misconceptionAlerts: [
              { trigger: "3\\frac{4}{7}", note: "Never add numerators and denominators straight across without a common denominator!" }
            ],
            skillId: "skill-frac-operations",
            difficulty: "medium"
          }
        ]
      },
      {
        id: "skill-percent-ratios",
        unitId: "unit-foundations-numbers",
        title: "Percentages & Ratio Division",
        code: "SKL-RATIO-102",
        summary: "Solving sharing in ratios, percentage profit/loss, and real-world commercial math.",
        objectives: [
          "Divide a quantity into a given ratio a:b:c",
          "Compute percentage increase and decrease accurately",
          "Apply ratios to scale drawings and recipe conversions"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-ratio-1",
            type: "multiple_choice",
            questionText: "Share ₦45,000 between Amina and Chidi in the ratio 4 : 5. How much does Chidi receive?",
            mathExpression: "45,000 \\text{ in ratio } 4 : 5",
            options: ["₦25,000", "₦20,000", "₦22,500", "₦30,000"],
            correctAnswer: "₦25,000",
            explanation: "Total parts = 4 + 5 = 9. Value of 1 part = 45,000 / 9 = 5,000. Chidi's share (5 parts) = 5 × 5,000 = ₦25,000.",
            hintLadder: [
              "Step 1: Calculate the total number of equal parts (4 + 5 = 9).",
              "Step 2: Find the value of one single part by dividing ₦45,000 by 9.",
              "Step 3: Multiply the 1-part value by Chidi's share of 5 parts."
            ],
            misconceptionAlerts: [
              { trigger: "₦20,000", note: "₦20,000 is Amina's share (4 parts). The question asked for Chidi's share." }
            ],
            skillId: "skill-percent-ratios",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-jss-algebra-linear",
    subjectId: "math_algebra",
    level: "junior_secondary",
    title: "Linear Equations & Algebraic Expansion",
    code: "UNIT-02",
    description: "Master unknown variable isolation, expansion of binomials, and simultaneous linear systems.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-linear-equations",
        unitId: "unit-jss-algebra-linear",
        title: "Solving Multi-Step Linear Equations",
        code: "SKL-LIN-201",
        summary: "Balancing equations with grouping symbols, fractions, and variables on both sides.",
        objectives: [
          "Expand brackets using the distributive law a(b + c) = ab + ac",
          "Collect like terms and isolate variable x",
          "Verify solutions by substitution"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-lin-1",
            type: "multiple_choice",
            questionText: "Solve the linear equation for x:",
            mathExpression: "3(2x - 4) = 4x + 10",
            options: ["x = 11", "x = 7", "x = 8", "x = -1"],
            correctAnswer: "x = 11",
            explanation: "Expand left side: 6x - 12 = 4x + 10. Subtract 4x: 2x - 12 = 10. Add 12: 2x = 22. Divide by 2: x = 11.",
            hintLadder: [
              "Apply distributive law: multiply 3 by both 2x and -4 on the left side.",
              "You will get 6x - 12 = 4x + 10.",
              "Subtract 4x from both sides to gather terms: 2x - 12 = 10, then add 12 to get 2x = 22."
            ],
            misconceptionAlerts: [
              { trigger: "x = 7", note: "Did you forget to multiply 3 by -4, writing 6x - 4 instead of 6x - 12?" }
            ],
            skillId: "skill-linear-equations",
            difficulty: "medium"
          },
          {
            id: "q-lin-2",
            type: "multiple_choice",
            questionText: "Find the value of y that satisfies:",
            mathExpression: "\\frac{y + 3}{4} = \\frac{2y - 1}{5}",
            options: ["y = \\frac{19}{3}", "y = 6", "y = 7", "y = -\\frac{19}{3}"],
            correctAnswer: "y = \\frac{19}{3}",
            explanation: "Cross-multiply: 5(y + 3) = 4(2y - 1) => 5y + 15 = 8y - 4 => 15 + 4 = 8y - 5y => 19 = 3y => y = 19/3 (or 6 1/3).",
            hintLadder: [
              "Cross-multiply the denominators: 5 × (y + 3) = 4 × (2y - 1).",
              "Expand both brackets: 5y + 15 = 8y - 4.",
              "Isolate the y term: 19 = 3y, therefore y = 19/3."
            ],
            misconceptionAlerts: [
              { trigger: "y = 6", note: "Check the arithmetic: 19 / 3 is 6 1/3, not 6." }
            ],
            skillId: "skill-linear-equations",
            difficulty: "medium"
          }
        ]
      },
      {
        id: "skill-simultaneous-eq",
        unitId: "unit-jss-algebra-linear",
        title: "Simultaneous Linear Equations",
        code: "SKL-SIM-202",
        summary: "Solving systems of two linear equations using substitution and elimination methods.",
        objectives: [
          "Apply the elimination method by equalizing coefficients",
          "Apply the substitution method by expressing one variable in terms of another",
          "Solve word problems involving two unknown quantities"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-sim-1",
            type: "multiple_choice",
            questionText: "Solve the simultaneous equations for x and y:",
            mathExpression: "\\begin{cases} 2x + y = 11 \\\\ 3x - y = 9 \\end{cases}",
            options: ["x = 4,\\, y = 3", "x = 3,\\, y = 5", "x = 5,\\, y = 1", "x = 2,\\, y = 7"],
            correctAnswer: "x = 4,\\, y = 3",
            explanation: "Add both equations to eliminate y: (2x + 3x) + (y - y) = 11 + 9 => 5x = 20 => x = 4. Substitute into Eq 1: 2(4) + y = 11 => 8 + y = 11 => y = 3.",
            hintLadder: [
              "Notice the coefficients of y are +1 and -1. Adding the equations will immediately eliminate y.",
              "(2x + y) + (3x - y) = 11 + 9 gives 5x = 20.",
              "Once you find x = 4, plug it into 2(4) + y = 11 to solve for y."
            ],
            misconceptionAlerts: [
              { trigger: "x = 3,\\, y = 5", note: "Substituting x = 3 into 3x - y = 9 gives 9 - 5 = 4, which does not equal 9." }
            ],
            skillId: "skill-simultaneous-eq",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-sss-quadratics",
    subjectId: "math_algebra",
    level: "senior_secondary",
    title: "Quadratic Equations & Polynomials",
    code: "UNIT-03",
    description: "Deep dive into factorization by grouping, completing the square, quadratic formula, and discriminant analysis.",
    order: 3,
    category: "core",
    skills: [
      {
        id: "skill-quad-factoring",
        unitId: "unit-sss-quadratics",
        title: "Factorization & Roots of Quadratics",
        code: "SKL-QUAD-301",
        summary: "Finding real roots of ax² + bx + c = 0 using factor pairs and zero product property.",
        objectives: [
          "Identify product (ac) and sum (b) factor pairs",
          "Apply the Zero-Product Property (if ab = 0, then a = 0 or b = 0)",
          "Recognize difference of two squares: a² - b² = (a - b)(a + b)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-quad-1",
            type: "multiple_choice",
            questionText: "Find the real roots of the quadratic equation:",
            mathExpression: "x^2 - 7x + 12 = 0",
            options: ["x = 3 \\text{ or } x = 4", "x = -3 \\text{ or } x = -4", "x = 2 \\text{ or } x = 6", "x = 1 \\text{ or } x = 12"],
            correctAnswer: "x = 3 \\text{ or } x = 4",
            explanation: "We need two numbers that multiply to +12 and sum to -7. These are -3 and -4. So (x - 3)(x - 4) = 0, which yields roots x = 3 and x = 4.",
            hintLadder: [
              "Think of factors of 12: (1, 12), (2, 6), (3, 4), and their negatives.",
              "Which pair adds up to -7? (-3) + (-4) = -7.",
              "Write in factored form: (x - 3)(x - 4) = 0. Set each factor to 0."
            ],
            misconceptionAlerts: [
              { trigger: "x = -3 \\text{ or } x = -4", note: "Remember that if (x - 3) = 0, solving for x gives +3, not -3." }
            ],
            skillId: "skill-quad-factoring",
            difficulty: "medium"
          },
          {
            id: "q-quad-2",
            type: "multiple_choice",
            questionText: "Solve by using the quadratic formula for non-integer roots:",
            mathExpression: "2x^2 + 5x - 3 = 0",
            options: ["x = \\frac{1}{2} \\text{ or } x = -3", "x = -\\frac{1}{2} \\text{ or } x = 3", "x = 1 \\text{ or } x = -3", "x = 2 \\text{ or } x = -1.5"],
            correctAnswer: "x = \\frac{1}{2} \\text{ or } x = -3",
            explanation: "Using formula with a=2, b=5, c=-3: Discriminant = 5^2 - 4(2)(-3) = 25 + 24 = 49. Roots: (-5 ± 7) / 4 => (-5+7)/4 = 2/4 = 1/2, and (-5-7)/4 = -12/4 = -3.",
            hintLadder: [
              "Calculate the discriminant Δ = b² - 4ac. Here: 5² - 4(2)(-3) = 25 + 24 = 49.",
              "The square root of 49 is 7.",
              "Apply formula: x = (-5 ± 7) / (2 × 2) = (-5 ± 7) / 4."
            ],
            misconceptionAlerts: [
              { trigger: "x = -\\frac{1}{2} \\text{ or } x = 3", note: "Watch the negative sign in the quadratic formula numerator: -b = -5." }
            ],
            skillId: "skill-quad-factoring",
            difficulty: "hard"
          }
        ]
      }
    ]
  },
  {
    id: "unit-sss-trig-bearings",
    subjectId: "math_geom_trig",
    level: "senior_secondary",
    title: "Trigonometry & Three-Figure Bearings",
    code: "UNIT-04",
    description: "Sine and Cosine rules for non-right angled triangles, angle of elevation/depression, and navigational bearings.",
    order: 4,
    category: "core",
    skills: [
      {
        id: "skill-sine-cosine-rule",
        unitId: "unit-sss-trig-bearings",
        title: "Sine & Cosine Rules in General Triangles",
        code: "SKL-TRIG-302",
        summary: "Calculating unknown sides and angles when triangles are not right-angled.",
        objectives: [
          "Identify when to use the Sine Rule (a/sin A = b/sin B)",
          "Apply the Cosine Rule (a² = b² + c² - 2bc cos A)",
          "Calculate triangle areas using Area = 0.5 ab sin C"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-trig-1",
            type: "multiple_choice",
            questionText: "In triangle ABC, side b = 8 cm, side c = 6 cm, and angle A = 60°. Calculate the length of side a (to 1 decimal place).",
            mathExpression: "a^2 = b^2 + c^2 - 2bc\\cos(A)",
            options: ["a = 7.2 \\text{ cm}", "a = 8.5 \\text{ cm}", "a = 6.8 \\text{ cm}", "a = 9.1 \\text{ cm}"],
            correctAnswer: "a = 7.2 \\text{ cm}",
            explanation: "Apply Cosine rule: a² = 8² + 6² - 2(8)(6)cos(60°) = 64 + 36 - 96(0.5) = 100 - 48 = 52. a = √52 ≈ 7.21 cm.",
            hintLadder: [
              "We have two sides (8 and 6) and the included angle (60°). This is the standard Cosine Rule setup.",
              "Recall that cos(60°) = 0.5.",
              "a² = 64 + 36 - 2(8)(6)(0.5) = 100 - 48 = 52. Take the square root of 52."
            ],
            misconceptionAlerts: [
              { trigger: "a = 8.5 \\text{ cm}", note: "Did you add the 2bc cos A term instead of subtracting it in the formula?" }
            ],
            skillId: "skill-sine-cosine-rule",
            difficulty: "hard"
          }
        ]
      }
    ]
  },
  {
    id: "unit-indices-logs",
    subjectId: "math_algebra",
    level: "senior_secondary",
    title: "Indices, Logarithms & Exponential Equations",
    code: "UNIT-05",
    description: "Laws of indices, fractional exponents, logarithmic change of base, and solving exponential equations.",
    order: 5,
    category: "core",
    skills: [
      {
        id: "skill-laws-indices",
        unitId: "unit-indices-logs",
        title: "Laws of Indices & Power Equations",
        code: "SKL-IND-301",
        summary: "Product, quotient, power of power, negative and fractional index rules.",
        objectives: [
          "Apply fractional index rule: a^(m/n) = (ⁿ√a)ᵐ",
          "Solve exponential equations of the form a^x = b",
          "Simplify expressions with negative powers: a^(-n) = 1 / a^n"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-ind-1",
            type: "multiple_choice",
            questionText: "Simplify the exponential expression and find the exact value of x:",
            mathExpression: "2^{3x - 1} = 32",
            options: ["x = 2", "x = 3", "x = 1.5", "x = 5"],
            correctAnswer: "x = 2",
            explanation: "Express 32 as a power of 2: 32 = 2^5. Equating exponents: 3x - 1 = 5 => 3x = 6 => x = 2.",
            hintLadder: [
              "Express both sides with the same base (base 2).",
              "32 = 2 × 2 × 2 × 2 × 2 = 2^5.",
              "Set the exponents equal: 3x - 1 = 5, then solve for x."
            ],
            misconceptionAlerts: [
              { trigger: "x = 3", note: "Check your exponent equation: 3x - 1 = 5 gives 3x = 6, not 3x = 9." }
            ],
            skillId: "skill-laws-indices",
            difficulty: "easy"
          }
        ]
      },
      {
        id: "skill-logarithms",
        unitId: "unit-indices-logs",
        title: "Logarithmic Laws & Base Conversions",
        code: "SKL-LOG-302",
        summary: "Logarithm addition/subtraction rules, power theorem, and natural logarithms.",
        objectives: [
          "Apply log(xy) = log x + log y and log(x/y) = log x - log y",
          "Use the change of base theorem log_b(a) = log_c(a) / log_c(b)",
          "Evaluate log expressions without calculators"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-log-1",
            type: "multiple_choice",
            questionText: "Evaluate without tables: \\log_2(80) - \\log_2(5)",
            mathExpression: "\\log_2(80) - \\log_2(5)",
            options: ["4", "16", "8", "3.2"],
            correctAnswer: "4",
            explanation: "Using the quotient rule: log_2(80 / 5) = log_2(16). Since 2^4 = 16, log_2(16) = 4.",
            hintLadder: [
              "Apply the logarithm subtraction rule: log_b(M) - log_b(N) = log_b(M/N).",
              "Compute 80 / 5 = 16.",
              "Ask: What power must 2 be raised to in order to get 16? 2^4 = 16, so the answer is 4."
            ],
            misconceptionAlerts: [
              { trigger: "16", note: "16 is the argument inside the log: log_2(16). The final answer is the exponent 4." }
            ],
            skillId: "skill-logarithms",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-sequences-series",
    subjectId: "math_algebra",
    level: "senior_secondary",
    title: "Sequences & Series (A.P. & G.P.)",
    code: "UNIT-06",
    description: "Arithmetic progressions, geometric progressions, sum of n terms, and sum to infinity.",
    order: 6,
    category: "core",
    skills: [
      {
        id: "skill-arithmetic-progression",
        unitId: "unit-sequences-series",
        title: "Arithmetic Progression (A.P.) Formulas",
        code: "SKL-AP-301",
        summary: "Finding the nth term T_n = a + (n-1)d and sum of n terms S_n.",
        objectives: [
          "Compute the common difference d = T_k - T_(k-1)",
          "Calculate any specified term T_n",
          "Determine the sum of the first n terms S_n = n/2 [2a + (n-1)d]"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-ap-1",
            type: "multiple_choice",
            questionText: "Find the sum of the first 20 terms of the A.P.: 3, 7, 11, 15, ...",
            mathExpression: "S_{20} = \\frac{20}{2}[2(3) + (20 - 1)(4)]",
            options: ["820", "780", "840", "410"],
            correctAnswer: "820",
            explanation: "Here a = 3, d = 4, n = 20. S_20 = 10 × [2(3) + 19(4)] = 10 × [6 + 76] = 10 × 82 = 820.",
            hintLadder: [
              "Identify a = 3 and common difference d = 7 - 3 = 4.",
              "Use S_n = (n/2)[2a + (n - 1)d].",
              "S_20 = (20/2)[2(3) + 19(4)] = 10[6 + 76] = 10 × 82 = 820."
            ],
            misconceptionAlerts: [
              { trigger: "410", note: "Did you forget to multiply by 10 (which is 20/2)?" }
            ],
            skillId: "skill-arithmetic-progression",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-coord-geometry",
    subjectId: "math_geom_trig",
    level: "senior_secondary",
    title: "Coordinate Geometry & Straight Lines",
    code: "UNIT-07",
    description: "Gradients of lines, midpoints, distance between coordinates, parallel/perpendicular lines, and circle equations.",
    order: 7,
    category: "core",
    skills: [
      {
        id: "skill-line-gradients",
        unitId: "unit-coord-geometry",
        title: "Gradients & Equations of Straight Lines",
        code: "SKL-GEO-301",
        summary: "Finding slope m = (y2 - y1)/(x2 - x1) and point-slope equations y - y1 = m(x - x1).",
        objectives: [
          "Calculate gradient between any two points",
          "Apply perpendicular gradients rule: m1 * m2 = -1",
          "Convert between slope-intercept form y = mx + c and general form ax + by + c = 0"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-geo-1",
            type: "multiple_choice",
            questionText: "Find the gradient of a line that is perpendicular to the line with equation 2x - 4y = 8.",
            mathExpression: "m_{\\perp} = -\\frac{1}{m}",
            options: ["-2", "\\frac{1}{2}", "2", "-\\frac{1}{2}"],
            correctAnswer: "-2",
            explanation: "Rewrite in y = mx + c: 4y = 2x - 8 => y = (1/2)x - 2. Gradient m = 1/2. Perpendicular gradient m_perp = -1 / (1/2) = -2.",
            hintLadder: [
              "Rearrange 2x - 4y = 8 into standard form y = mx + c.",
              "4y = 2x - 8 gives y = (1/2)x - 2, so m1 = 1/2.",
              "Perpendicular condition: m1 × m2 = -1 => (1/2) × m2 = -1 => m2 = -2."
            ],
            misconceptionAlerts: [
              { trigger: "\\frac{1}{2}", note: "1/2 is the gradient of a PARALLEL line, not a perpendicular one." }
            ],
            skillId: "skill-line-gradients",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-statistics-probability",
    subjectId: "math_core",
    level: "senior_secondary",
    title: "Statistics & Theoretical Probability",
    code: "UNIT-08",
    description: "Measures of central tendency (mean, median, mode), standard deviation, cumulative frequency curves (ogives), and independent probability.",
    order: 8,
    category: "applied",
    skills: [
      {
        id: "skill-stats-dispersion",
        unitId: "unit-statistics-probability",
        title: "Measures of Central Tendency & Dispersion",
        code: "SKL-STAT-301",
        summary: "Grouped data mean, standard deviation, variance, and interquartile range.",
        objectives: [
          "Compute the mean of grouped frequency distributions \\bar{x} = \\sum(fx) / \\sum f",
          "Calculate the variance and sample standard deviation",
          "Interpret histograms and cumulative frequency ogives"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-stat-1",
            type: "multiple_choice",
            questionText: "A bag contains 5 red balls, 4 blue balls, and 3 green balls. If one ball is drawn at random, what is the probability that it is NOT blue?",
            mathExpression: "P(\\text{Not Blue}) = 1 - P(\\text{Blue})",
            options: ["\\frac{2}{3}", "\\frac{1}{3}", "\\frac{3}{4}", "\\frac{5}{12}"],
            correctAnswer: "\\frac{2}{3}",
            explanation: "Total balls = 5 + 4 + 3 = 12. Non-blue balls = 5 red + 3 green = 8. Probability = 8/12 = 2/3.",
            hintLadder: [
              "Find the total number of sample outcomes: 5 + 4 + 3 = 12.",
              "Count the outcomes that satisfy 'Not Blue': 5 red + 3 green = 8.",
              "Simplify the fraction 8/12 by dividing numerator and denominator by 4: 2/3."
            ],
            misconceptionAlerts: [
              { trigger: "\\frac{1}{3}", note: "1/3 (4/12) is the probability of drawing a blue ball. The question asks for NOT blue." }
            ],
            skillId: "skill-stats-dispersion",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-vectors-matrices",
    subjectId: "math_algebra",
    level: "university_prep",
    title: "Matrices, Determinants & Vectors",
    code: "UNIT-09",
    description: "Matrix multiplication, 2x2 and 3x3 determinants, inverse matrices, vector dot products, and geometric transformations.",
    order: 9,
    category: "applied",
    skills: [
      {
        id: "skill-matrix-operations",
        unitId: "unit-vectors-matrices",
        title: "Matrix Multiplication & Inverses",
        code: "SKL-MAT-401",
        summary: "Row-by-column multiplication, finding adjoints and 2x2 matrix inverses.",
        objectives: [
          "Multiply conformable matrices A(m×k) and B(k×n)",
          "Calculate determinant |A| = ad - bc",
          "Compute the inverse matrix A^(-1) = (1/|A|) * adj(A)"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-mat-1",
            type: "multiple_choice",
            questionText: "If matrix A = [[3, 2], [1, 4]], find the determinant \\det(A).",
            mathExpression: "\\det(A) = (3)(4) - (2)(1)",
            options: ["10", "14", "12", "8"],
            correctAnswer: "10",
            explanation: "det(A) = (3 × 4) - (2 × 1) = 12 - 2 = 10.",
            hintLadder: [
              "For matrix [[a, b], [c, d]], the determinant is ad - bc.",
              "a = 3, d = 4 => ad = 12.",
              "b = 2, c = 1 => bc = 2. 12 - 2 = 10."
            ],
            misconceptionAlerts: [
              { trigger: "14", note: "Remember to subtract bc, not add it: ad - bc = 12 - 2 = 10." }
            ],
            skillId: "skill-matrix-operations",
            difficulty: "easy"
          }
        ]
      }
    ]
  },
  {
    id: "unit-adv-calculus",
    subjectId: "math_calculus",
    level: "university_prep",
    title: "Differential & Integral Calculus",
    code: "UNIT-10",
    description: "First-principles differentiation, power rule, product/quotient/chain rules, and fundamental theorem of integration.",
    order: 10,
    category: "applied",
    skills: [
      {
        id: "skill-derivatives",
        unitId: "unit-adv-calculus",
        title: "Differentiation & Rates of Change",
        code: "SKL-CALC-401",
        summary: "Finding tangents, gradients of curves, and turning points (maxima/minima).",
        objectives: [
          "Apply the power rule: d/dx [x^n] = n x^(n-1)",
          "Find coordinates of stationary points and classify as maximum or minimum",
          "Determine instantaneous velocity from displacement equations"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        questions: [
          {
            id: "q-calc-1",
            type: "multiple_choice",
            questionText: "Find the derivative with respect to x of the function:",
            mathExpression: "f(x) = 4x^3 - 5x^2 + 7x - 9",
            options: ["12x^2 - 10x + 7", "12x^2 - 10x", "4x^2 - 5x + 7", "12x^3 - 10x^2 + 7x"],
            correctAnswer: "12x^2 - 10x + 7",
            explanation: "Differentiating term-by-term: d/dx(4x^3) = 12x^2, d/dx(-5x^2) = -10x, d/dx(7x) = 7, d/dx(-9) = 0. Result: 12x^2 - 10x + 7.",
            hintLadder: [
              "Multiply each coefficient by its current exponent, then reduce the exponent by 1.",
              "For 4x³, 4 × 3 = 12, power becomes 2: 12x².",
              "The derivative of a linear term 7x is 7, and derivative of constant -9 is 0."
            ],
            misconceptionAlerts: [
              { trigger: "12x^2 - 10x", note: "Don't forget the derivative of the 7x term, which equals 7." }
            ],
            skillId: "skill-derivatives",
            difficulty: "medium"
          }
        ]
      }
    ]
  }
];

export const DIAGNOSTIC_ASSESSMENT_QUESTIONS: PracticeQuestion[] = [
  {
    id: "diag-q1",
    type: "multiple_choice",
    questionText: "Diagnostic 1 of 6 [Number Properties]: What is the value of:",
    mathExpression: "-15 - (-24) + (-8)",
    options: ["1", "-47", "-1", "17"],
    correctAnswer: "1",
    explanation: "-15 - (-24) = -15 + 24 = 9. Then 9 + (-8) = 9 - 8 = 1.",
    hintLadder: [
      "Two minus signs in -(-24) simplify to addition: +24.",
      "-15 + 24 = +9.",
      "9 + (-8) = 9 - 8 = 1."
    ],
    skillId: "skill-frac-operations",
    difficulty: "easy"
  },
  {
    id: "diag-q2",
    type: "multiple_choice",
    questionText: "Diagnostic 2 of 6 [Fractions & Ratios]: A recipe requires 3/4 cup of sugar for 12 cookies. How much sugar is needed for 36 cookies?",
    mathExpression: "\\frac{3}{4} \\times 3",
    options: ["2\\frac{1}{4} \\text{ cups}", "1\\frac{1}{2} \\text{ cups}", "3 \\text{ cups}", "2\\frac{3}{4} \\text{ cups}"],
    correctAnswer: "2\\frac{1}{4} \\text{ cups}",
    explanation: "36 cookies is 3 times 12. So sugar = 3 × 3/4 = 9/4 = 2 1/4 cups.",
    hintLadder: [
      "Determine the multiplier: 36 / 12 = 3.",
      "Multiply 3/4 by 3 = 9/4.",
      "9/4 as a mixed number is 2 1/4."
    ],
    skillId: "skill-percent-ratios",
    difficulty: "easy"
  },
  {
    id: "diag-q3",
    type: "multiple_choice",
    questionText: "Diagnostic 3 of 6 [Linear Equations]: Solve for m in the equation:",
    mathExpression: "5m - 14 = 2m + 7",
    options: ["m = 7", "m = 3", "m = -7", "m = 21"],
    correctAnswer: "m = 7",
    explanation: "5m - 2m = 7 + 14 => 3m = 21 => m = 7.",
    hintLadder: [
      "Subtract 2m from both sides: 3m - 14 = 7.",
      "Add 14 to both sides: 3m = 21.",
      "Divide by 3 to find m = 7."
    ],
    skillId: "skill-linear-equations",
    difficulty: "medium"
  },
  {
    id: "diag-q4",
    type: "multiple_choice",
    questionText: "Diagnostic 4 of 6 [Quadratics]: What are the solutions to:",
    mathExpression: "x^2 - 9x + 20 = 0",
    options: ["x = 4 \\text{ and } x = 5", "x = -4 \\text{ and } x = -5", "x = 2 \\text{ and } x = 10", "x = -2 \\text{ and } x = -10"],
    correctAnswer: "x = 4 \\text{ and } x = 5",
    explanation: "(x - 4)(x - 5) = 0 gives roots 4 and 5.",
    hintLadder: [
      "Find two numbers whose product is 20 and sum is -9: -4 and -5.",
      "(x - 4)(x - 5) = 0.",
      "x = 4 or x = 5."
    ],
    skillId: "skill-quad-factoring",
    difficulty: "medium"
  },
  {
    id: "diag-q5",
    type: "multiple_choice",
    questionText: "Diagnostic 5 of 6 [Trigonometry]: In a right-angled triangle with hypotenuse 10 cm and opposite side 6 cm, what is the value of \\sin(\\theta)?",
    mathExpression: "\\sin(\\theta) = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}",
    options: ["0.6", "0.8", "0.75", "1.66"],
    correctAnswer: "0.6",
    explanation: "sin(θ) = Opposite / Hypotenuse = 6 / 10 = 0.6.",
    hintLadder: [
      "Recall definition of sine in SOH-CAH-TOA: Sine = Opposite / Hypotenuse.",
      "Substitute 6 / 10.",
      "6 / 10 = 0.6."
    ],
    skillId: "skill-sine-cosine-rule",
    difficulty: "easy"
  },
  {
    id: "diag-q6",
    type: "multiple_choice",
    questionText: "Diagnostic 6 of 6 [Calculus / Gradient]: What is the slope of the tangent line to the curve y = x² - 3x at the point where x = 4?",
    mathExpression: "\\frac{dy}{dx} = 2x - 3",
    options: ["5", "8", "4", "1"],
    correctAnswer: "5",
    explanation: "dy/dx = 2x - 3. At x = 4, dy/dx = 2(4) - 3 = 8 - 3 = 5.",
    hintLadder: [
      "Find derivative dy/dx: d/dx(x²) = 2x, d/dx(-3x) = -3.",
      "Substitute x = 4 into 2x - 3.",
      "2(4) - 3 = 8 - 3 = 5."
    ],
    skillId: "skill-derivatives",
    difficulty: "hard"
  }
];

export const EXAM_SIMULATIONS: ExamSimulation[] = [
  {
    id: "exam-waec-2025",
    title: "WASSCE / WAEC Mathematics Master Mock",
    subtitle: "West African Examinations Council Senior School Certificate Standard",
    type: "WASSCE_WAEC",
    targetYear: "2025 / 2026 Examination Series",
    timeLimitMinutes: 20,
    passingScore: 70,
    questions: [
      {
        id: "w-q1",
        type: "multiple_choice",
        questionText: "If \\log_{10}(2) = 0.3010 and \\log_{10}(3) = 0.4771, calculate the value of \\log_{10}(18) without using logarithm tables.",
        mathExpression: "\\log_{10}(18) = \\log_{10}(2 \\times 3^2)",
        options: ["1.2552", "0.7781", "1.5562", "2.1030"],
        correctAnswer: "1.2552",
        explanation: "log(18) = log(2 × 3²) = log(2) + 2·log(3) = 0.3010 + 2(0.4771) = 0.3010 + 0.9542 = 1.2552.",
        hintLadder: [
          "Factor 18 as 2 × 3².",
          "Use log rules: log(ab) = log a + log b and log(b^k) = k log b.",
          "log(18) = log(2) + 2 log(3) = 0.3010 + 2(0.4771)."
        ],
        skillId: "skill-linear-equations",
        difficulty: "medium"
      },
      {
        id: "w-q2",
        type: "multiple_choice",
        questionText: "The 3rd term of an Arithmetic Progression (A.P.) is 10 and the 8th term is 25. Find the common difference (d) and the first term (a).",
        mathExpression: "T_n = a + (n - 1)d",
        options: ["d = 3,\\, a = 4", "d = 3,\\, a = 1", "d = 5,\\, a = 0", "d = 4,\\, a = 2"],
        correctAnswer: "d = 3,\\, a = 4",
        explanation: "T_8 - T_3 = (a + 7d) - (a + 2d) = 5d = 25 - 10 = 15 => d = 3. Then a + 2(3) = 10 => a + 6 = 10 => a = 4.",
        hintLadder: [
          "Write equations: a + 2d = 10 and a + 7d = 25.",
          "Subtract the first from the second: 5d = 15 => d = 3.",
          "Substitute d = 3 back: a + 2(3) = 10 => a = 4."
        ],
        skillId: "skill-linear-equations",
        difficulty: "medium"
      },
      {
        id: "w-q3",
        type: "multiple_choice",
        questionText: "A ladder of length 13m leans against a vertical wall. If the foot of the ladder is 5m away from the wall on level ground, how high up the wall does the ladder reach?",
        mathExpression: "h^2 + 5^2 = 13^2",
        options: ["12 m", "11.5 m", "14 m", "8 m"],
        correctAnswer: "12 m",
        explanation: "By Pythagoras Theorem: h² + 5² = 13² => h² + 25 = 169 => h² = 144 => h = 12 m.",
        hintLadder: [
          "Identify the right triangle: hypotenuse = 13, base = 5, vertical height = h.",
          "h² = 13² - 5² = 169 - 25 = 144.",
          "√144 = 12."
        ],
        skillId: "skill-sine-cosine-rule",
        difficulty: "easy"
      }
    ]
  },
  {
    id: "exam-jamb-utme-2025",
    title: "JAMB UTME Mathematics Speed Drill",
    subtitle: "Joint Admissions and Matriculation Board CBT Simulation",
    type: "JAMB_UTME",
    targetYear: "2025 / 2026 Examination Series",
    timeLimitMinutes: 15,
    passingScore: 75,
    questions: [
      {
        id: "j-q1",
        type: "multiple_choice",
        questionText: "Evaluate without a calculator: 27^(2/3) × 16^(-1/4)",
        mathExpression: "27^{\\frac{2}{3}} \\times 16^{-\\frac{1}{4}}",
        options: ["4.5 (or 9/2)", "3", "6", "1.5"],
        correctAnswer: "4.5 (or 9/2)",
        explanation: "27^(2/3) = (∛27)² = 3² = 9. 16^(-1/4) = 1 / ⁴√16 = 1/2. Product = 9 × 1/2 = 4.5.",
        hintLadder: [
          "Take cube root of 27 first: ∛27 = 3, then square it = 9.",
          "Take fourth root of 16: ⁴√16 = 2. The negative power gives 1/2.",
          "Multiply 9 × 1/2 = 9/2 = 4.5."
        ],
        skillId: "skill-frac-operations",
        difficulty: "medium"
      },
      {
        id: "j-q2",
        type: "multiple_choice",
        questionText: "If the determinant of the 2x2 matrix |[2x, 4], [3, 5]| is equal to 18, find the value of x.",
        mathExpression: "\\det = (2x)(5) - (4)(3) = 18",
        options: ["x = 3", "x = 4", "x = 2.5", "x = 5"],
        correctAnswer: "x = 3",
        explanation: "Determinant = (2x × 5) - (4 × 3) = 10x - 12 = 18 => 10x = 30 => x = 3.",
        hintLadder: [
          "Recall determinant of [[a, b], [c, d]] is ad - bc.",
          "ad = 2x × 5 = 10x. bc = 4 × 3 = 12.",
          "10x - 12 = 18 => 10x = 30 => x = 3."
        ],
        skillId: "skill-linear-equations",
        difficulty: "medium"
      }
    ]
  },
  COMMON_ENTRANCE_FULL_EXAM_SIMULATION
];

export const SAMPLE_BADGES: Badge[] = [
  {
    id: "badge-math-pioneer",
    title: "Foundations Pioneer",
    description: "Completed your first diagnostic assessment and established your personalized learning pathway.",
    iconName: "Compass",
    category: "diagnostic",
    unlockedAt: "2026-08-18T10:00:00Z"
  },
  {
    id: "badge-fraction-master",
    title: "Fraction Luminary",
    description: "Achieved 100% mastery points in Fraction Operations and Reciprocal Division.",
    iconName: "PieChart",
    category: "mastery",
    unlockedAt: "2026-08-19T08:30:00Z"
  },
  {
    id: "badge-algebra-conqueror",
    title: "Algebraic Alchemist",
    description: "Solved 10 consecutive linear and quadratic systems without requesting full solution reveals.",
    iconName: "Variable",
    category: "mastery"
  },
  {
    id: "badge-socratic-explorer",
    title: "Socratic Reasoner",
    description: "Engaged Tutor Moos for guided step discovery across 5 different problem types.",
    iconName: "Sparkles",
    category: "ai_collaboration"
  },
  {
    id: "badge-streak-flame",
    title: "Consistency Flame",
    description: "Maintained an unbroken 7-day active daily practice streak.",
    iconName: "Flame",
    category: "streak",
    progress: 5,
    maxProgress: 7
  },
  {
    id: "badge-waec-ready",
    title: "WAEC Vanguard",
    description: "Scored over 80% on a timed WASSCE Mock Examination.",
    iconName: "Award",
    category: "exam"
  }
];

export const DEFAULT_LEARNER_PROFILE: LearnerProfile = {
  id: "learner-001",
  name: "Toluwani Adeyemi",
  email: "toluwani.learner@moos.academy",
  role: "learner",
  targetLevel: "senior_secondary",
  curriculum: "WAEC_WASSCE",
  selectedSubjectIds: ["math_core", "math_algebra", "math_geom_trig", "math_calculus"],
  activeSubjectId: "math_core",
  learningGoals: [
    "Score A1 in WASSCE Mathematics",
    "Score 80+ in JAMB UTME Mathematics",
    "Master Differential Calculus & Proofs"
  ],
  targetExamDate: "2027-05-15",
  masteryPoints: 480,
  streak: {
    count: 5,
    lastActiveDate: "2026-08-20",
    longestStreak: 8
  },
  streakDays: 5,
  xp: 1450,
  level: 6,
  totalStudyMinutes: 195,
  activeUnitId: "unit-sss-quadratics",
  diagnosticsCompleted: true,
  lastDiagnosticResult: {
    completedAt: "2026-08-18T14:20:00Z",
    score: 5,
    total: 6,
    percentage: 83,
    tier: "Proficient",
    summary: "Solid algebraic foundations and arithmetic agility. Ready for advanced quadratic factorization and trigonometric proof models.",
    strengths: [
      "Linear Equation Formulation & Isolation",
      "Directed Integer Operations",
      "SOH-CAH-TOA Trigonometric Ratios"
    ],
    gapAreas: [
      "Non-integer quadratic formula root extraction",
      "Three-figure bearings with obtuse angle conversions"
    ],
    recommendedStartingUnit: "Quadratic Equations & Polynomials",
    pathwaySteps: [
      { order: 1, unitName: "Quadratic Equations: Factorization & Roots", focusReason: "Core Senior Secondary milestone", estimatedDays: 3 },
      { order: 2, unitName: "Trigonometry & Three-Figure Bearings", focusReason: "High-yield WAEC Paper 2 section", estimatedDays: 4 },
      { order: 3, unitName: "Differential Calculus & Rates of Change", focusReason: "University STEM preparation", estimatedDays: 5 }
    ]
  },
  diagnosticHistory: [
    {
      completedAt: "2026-08-18T14:20:00Z",
      score: 5,
      total: 6,
      percentage: 83,
      tier: "Proficient",
      summary: "Solid algebraic foundations and arithmetic agility.",
      strengths: ["Linear Equations", "Arithmetic Fluency"],
      gapAreas: ["Quadratic Factoring"],
      recommendedStartingUnit: "Quadratic Equations & Polynomials",
      pathwaySteps: []
    }
  ],
  masteryRecords: {
    "skill-frac-operations": {
      skillId: "skill-frac-operations",
      status: "mastered",
      points: 100,
      attempts: 8,
      correctCount: 8,
      lastPracticedAt: "2026-08-19T01:30:00Z"
    },
    "skill-percent-ratios": {
      skillId: "skill-percent-ratios",
      status: "proficient",
      points: 80,
      attempts: 6,
      correctCount: 5,
      lastPracticedAt: "2026-08-18T18:00:00Z"
    },
    "skill-linear-equations": {
      skillId: "skill-linear-equations",
      status: "proficient",
      points: 75,
      attempts: 7,
      correctCount: 6,
      lastPracticedAt: "2026-08-18T20:15:00Z"
    },
    "skill-simultaneous-eq": {
      skillId: "skill-simultaneous-eq",
      status: "familiar",
      points: 50,
      attempts: 4,
      correctCount: 2,
      lastPracticedAt: "2026-08-17T12:00:00Z"
    },
    "skill-quad-factoring": {
      skillId: "skill-quad-factoring",
      status: "familiar",
      points: 40,
      attempts: 3,
      correctCount: 2,
      lastPracticedAt: "2026-08-18T22:00:00Z"
    },
    "skill-sine-cosine-rule": {
      skillId: "skill-sine-cosine-rule",
      status: "unstarted",
      points: 0,
      attempts: 0,
      correctCount: 0,
      lastPracticedAt: ""
    },
    "skill-derivatives": {
      skillId: "skill-derivatives",
      status: "unstarted",
      points: 0,
      attempts: 0,
      correctCount: 0,
      lastPracticedAt: ""
    }
  },
  questionAttempts: [
    {
      id: "att-1",
      questionId: "q-frac-1",
      skillId: "skill-frac-operations",
      selectedOption: "17/12",
      isCorrect: true,
      hintsUsedCount: 0,
      timeSpentSeconds: 45,
      timestamp: "2026-08-19T01:30:00Z"
    },
    {
      id: "att-2",
      questionId: "q-lin-1",
      skillId: "skill-linear-equations",
      selectedOption: "x = 4",
      isCorrect: true,
      hintsUsedCount: 1,
      timeSpentSeconds: 62,
      timestamp: "2026-08-18T20:15:00Z"
    },
    {
      id: "att-3",
      questionId: "q-quad-1",
      skillId: "skill-quad-factoring",
      selectedOption: "x = 3 or x = 4",
      isCorrect: true,
      hintsUsedCount: 2,
      timeSpentSeconds: 90,
      timestamp: "2026-08-18T22:00:00Z"
    }
  ],
  activityHistory: [
    {
      id: "act-init-1",
      type: "practice",
      title: "Completed Practice Arena",
      description: "Mastered Fraction Operations (100 pts) with 0 hints requested",
      timestamp: "2026-08-19T01:30:00Z",
      pointsEarned: 40,
      xpEarned: 50,
      metadata: { skillId: "skill-frac-operations", durationSeconds: 320 }
    },
    {
      id: "act-init-2",
      type: "diagnostic",
      title: "Diagnostic Assessment Calibration",
      description: "Established Senior Secondary baseline with 83% score",
      timestamp: "2026-08-18T14:20:00Z",
      pointsEarned: 83,
      xpEarned: 150
    },
    {
      id: "act-init-3",
      type: "ai_tutor",
      title: "Socratic Guided Discovery Session",
      description: "Explored quadratic factorization sign patterns with Tutor Moos",
      timestamp: "2026-08-18T22:15:00Z",
      pointsEarned: 20,
      xpEarned: 40
    }
  ],
  examHistory: [],
  unlockedBadges: ["badge-math-pioneer", "badge-fraction-master"],
  preferences: {
    socraticMode: "guided",
    highContrast: false,
    soundEffects: true,
    dailyGoalMinutes: 30
  },
  createdAt: "2026-08-10T10:00:00Z",
  updatedAt: "2026-08-20T11:00:00Z"
};

export const DEFAULT_EXTENDED_LEARNER_PROFILE: ExtendedLearnerProfile = DEFAULT_LEARNER_PROFILE;

export const TEACHER_INTERVENTIONS: TeacherIntervention[] = [
  {
    studentId: "std-04",
    studentName: "Emeka Okafor",
    strugglingSkill: "Quadratic Formula with Negative Discriminants",
    unitName: "Quadratic Equations",
    accuracyRate: 42,
    suggestedAction: "Assign 3 Socratic scaffolding exercises on square roots of negative values / complex indicators.",
    status: "pending"
  },
  {
    studentId: "std-12",
    studentName: "Zainab Bello",
    strugglingSkill: "Three-Figure Bearings (Back Bearing Calculations)",
    unitName: "Trigonometry & Bearings",
    accuracyRate: 48,
    suggestedAction: "Review angle addition theorem when bearing exceeds 180°.",
    status: "pending"
  },
  {
    studentId: "std-09",
    studentName: "David Mensah",
    strugglingSkill: "Fraction Division by Reciprocals",
    unitName: "Fractions & Decimals",
    accuracyRate: 55,
    suggestedAction: "Recommend visual area model practice in Scratchpad.",
    status: "addressed"
  }
];

export const PARENT_CHILD_SUMMARY: ParentChildSummary = {
  childName: "Toluwani Adeyemi",
  gradeLevel: "Senior Secondary 2 (SSS 2)",
  weeklyMinutes: 195,
  masteredSkillsCount: 7,
  currentFocusUnit: "Quadratic Equations & Polynomials",
  streakDays: 5,
  recentAchievements: [
    "Mastered Fraction Operations with 100% accuracy",
    "Completed WAEC Diagnostic benchmark with 83% score",
    "Maintained a 5-day continuous learning streak"
  ],
  curriculumPacing: "Ahead",
  aiAssistanceFrequency: "Healthy - Uses Socratic hints appropriately"
};
