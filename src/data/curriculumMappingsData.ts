/**
 * MOOS TECHY ACADEMY — UNIVERSAL CURRICULUM MAPPINGS DATA
 * 
 * Authoritative mapping bridge connecting Universal Canonical Competencies & Skills
 * to verified international curriculum standards (Nigeria, UK, US, Cambridge International).
 * 
 * Classification tiers:
 * - VERIFIED_OFFICIAL: Direct match against official government / exam board syllabus
 * - PLATFORM_MAPPING: Pedagogically verified equivalence mapped by MOOS academic lead
 * - PLATFORM_COMPETENCY: Core internal cognitive definition
 * - AI_SUGGESTED_MAPPING: Automated draft awaiting human educator audit
 * - PENDING_VERIFICATION: Draft standard awaiting formal syllabus documentation cross-check
 */

import {
  CurriculumStandardMapping,
  CanonicalCompetency,
  CountryCode,
  EducationSystemCode
} from "../types/curriculum";

export const CANONICAL_COMPETENCIES: CanonicalCompetency[] = [
  {
    id: "comp-arithmetic-foundations",
    domainId: "mathematics",
    subjectCode: "MTH",
    title: "Arithmetic & Proportional Reasoning",
    code: "COMP-MTH-01",
    description: "Computational fluency with rational numbers, fractions, percentages, ratios, and rates of change.",
    prerequisiteCompetencyIds: [],
    canonicalSkillIds: ["skill-frac-operations", "skill-percent-ratios"]
  },
  {
    id: "comp-linear-algebra",
    domainId: "mathematics",
    subjectCode: "MTH",
    title: "Linear Equations & Coordinate Systems",
    code: "COMP-MTH-02",
    description: "Solving single and multi-variable linear equations, systems of linear equations, and coordinate graphing.",
    prerequisiteCompetencyIds: ["comp-arithmetic-foundations"],
    canonicalSkillIds: ["skill-linear-equations", "skill-simultaneous-equations"]
  },
  {
    id: "comp-quadratic-algebra",
    domainId: "mathematics",
    subjectCode: "MTH",
    title: "Quadratic Equations, Factorization & Parabolas",
    code: "COMP-MTH-03",
    description: "Formulation and solution of quadratic equations by factorization, completing the square, and quadratic formula.",
    prerequisiteCompetencyIds: ["comp-linear-algebra"],
    canonicalSkillIds: ["skill-quad-01", "skill-quad-02", "skill-quad-03"]
  },
  {
    id: "comp-circle-geometry",
    domainId: "mathematics",
    subjectCode: "MTH",
    title: "Euclidean & Circle Geometry",
    code: "COMP-MTH-04",
    description: "Geometric proofs, angle relationships, cyclic quadrilaterals, tangents, and secant theorems.",
    prerequisiteCompetencyIds: ["comp-linear-algebra"],
    canonicalSkillIds: ["skill-geom-circle-01", "skill-geom-circle-02"]
  },
  {
    id: "comp-trigonometry",
    domainId: "mathematics",
    subjectCode: "MTH",
    title: "Trigonometric Functions, Triangles & Bearings",
    code: "COMP-MTH-05",
    description: "Sine and Cosine rules, navigational bearings, trigonometric identities, and right-triangle trigonometry.",
    prerequisiteCompetencyIds: ["comp-linear-algebra", "comp-circle-geometry"],
    canonicalSkillIds: ["skill-trig-01", "skill-trig-02"]
  },
  {
    id: "comp-differential-calculus",
    domainId: "mathematics",
    subjectCode: "MTH",
    title: "Differential Calculus & Rates of Change",
    code: "COMP-MTH-06",
    description: "First-principles limits, polynomial differentiation, tangent slopes, and stationary point optimization.",
    prerequisiteCompetencyIds: ["comp-quadratic-algebra"],
    canonicalSkillIds: ["skill-calc-diff-01", "skill-calc-diff-02"]
  },
  {
    id: "comp-statistics-probability",
    domainId: "mathematics",
    subjectCode: "MTH",
    title: "Descriptive Statistics & Probability Theory",
    code: "COMP-MTH-07",
    description: "Measures of central tendency, grouped frequency distributions, standard deviation, and conditional probability.",
    prerequisiteCompetencyIds: ["comp-arithmetic-foundations"],
    canonicalSkillIds: ["skill-stat-01", "skill-stat-02"]
  },
  {
    id: "comp-classical-mechanics",
    domainId: "science",
    subjectCode: "PHY",
    title: "Classical Mechanics & Newtonian Dynamics",
    code: "COMP-PHY-01",
    description: "Kinematics equations of uniform acceleration, Newton's laws of motion, momentum conservation, and mechanical energy systems.",
    prerequisiteCompetencyIds: ["comp-linear-algebra"],
    canonicalSkillIds: ["skill-phy-kinematics"]
  },
  {
    id: "comp-chemical-stoichiometry",
    domainId: "science",
    subjectCode: "CHM",
    title: "Stoichiometry, Mole Concepts & Chemical Reactions",
    code: "COMP-CHM-01",
    description: "Avogadro's number, molar mass calculations, empirical formulae, and reaction equation balancing.",
    prerequisiteCompetencyIds: ["comp-arithmetic-foundations"],
    canonicalSkillIds: ["skill-chem-mole"]
  },
  {
    id: "comp-cellular-genetics",
    domainId: "science",
    subjectCode: "BIO",
    title: "Cellular Biology, Genetics & Molecular Inheritance",
    code: "COMP-BIO-01",
    description: "Cell organelles, mitosis/meiosis division mechanisms, Mendelian inheritance ratios, and DNA replication.",
    prerequisiteCompetencyIds: [],
    canonicalSkillIds: ["skill-bio-cell"]
  },
  {
    id: "comp-computational-thinking",
    domainId: "technology",
    subjectCode: "CSC",
    title: "Algorithms, Data Structures & Python Programming",
    code: "COMP-CSC-01",
    description: "Algorithmic time complexity O(n), loops, control flow, list operations, and recursive search strategies.",
    prerequisiteCompetencyIds: ["comp-linear-algebra"],
    canonicalSkillIds: ["skill-cs-algorithms"]
  },
  {
    id: "comp-english-literary",
    domainId: "languages",
    subjectCode: "ENG",
    title: "Rhetorical Analysis, Grammar & Essay Synthesis",
    code: "COMP-ENG-01",
    description: "Grammatical syntax parsing, literary device identification (metaphor, hyperbole), and coherent thesis formulation.",
    prerequisiteCompetencyIds: [],
    canonicalSkillIds: ["skill-eng-rhetoric"]
  },
  {
    id: "comp-financial-literacy",
    domainId: "commercial",
    subjectCode: "FIN",
    title: "Compound Interest, Amortization & Financial Accounting",
    code: "COMP-FIN-01",
    description: "Time value of money, compound growth modelling, double-entry accounting balances, and cash flow forecasting.",
    prerequisiteCompetencyIds: ["comp-arithmetic-foundations"],
    canonicalSkillIds: ["skill-fin-interest"]
  }
];

export const CURRICULUM_STANDARD_MAPPINGS: CurriculumStandardMapping[] = [
  // =========================================================================
  // MULTIDISCIPLINARY SCIENCE & TECH MAPPINGS
  // =========================================================================
  {
    id: "map-ng-waec-phy-01",
    canonicalSkillId: "skill-phy-kinematics",
    country: "NG",
    jurisdiction: "West Africa / Nigeria",
    curriculumSystem: "WAEC",
    educationLevel: "Senior Secondary",
    gradeOrYear: "SS2",
    subjectCode: "PHY",
    standardIdentifier: "WAEC-PHY-SEC2.1.3",
    standardTitle: "Rectilinear Acceleration and Equations of Motion",
    expectedMasteryScore: 80,
    assessmentStyle: "multiple_choice_4opt",
    verificationStatus: "VERIFIED_OFFICIAL",
    verificationMetadata: {
      sourceTitle: "WAEC Physics Syllabus (WASSCE Senior Secondary)",
      sourceDate: "2024-2027",
      verifiedBy: "WAEC Academic Lead",
      confidence: 1.0
    }
  },
  {
    id: "map-ng-waec-chm-01",
    canonicalSkillId: "skill-chem-mole",
    country: "NG",
    jurisdiction: "West Africa / Nigeria",
    curriculumSystem: "WAEC",
    educationLevel: "Senior Secondary",
    gradeOrYear: "SS1-SS2",
    subjectCode: "CHM",
    standardIdentifier: "WAEC-CHM-SEC1.4",
    standardTitle: "The Mole Concept and Stoichiometric Calculations",
    expectedMasteryScore: 80,
    assessmentStyle: "multiple_choice_4opt",
    verificationStatus: "VERIFIED_OFFICIAL",
    verificationMetadata: {
      sourceTitle: "WAEC Chemistry Syllabus",
      sourceDate: "2024-2027",
      verifiedBy: "WAEC Academic Lead",
      confidence: 1.0
    }
  },
  {
    id: "map-ng-waec-bio-01",
    canonicalSkillId: "skill-bio-cell",
    country: "NG",
    jurisdiction: "West Africa / Nigeria",
    curriculumSystem: "WAEC",
    educationLevel: "Senior Secondary",
    gradeOrYear: "SS2",
    subjectCode: "BIO",
    standardIdentifier: "WAEC-BIO-SEC3.1",
    standardTitle: "Cellular Structure, Functions and Organelles",
    expectedMasteryScore: 85,
    assessmentStyle: "multiple_choice_4opt",
    verificationStatus: "VERIFIED_OFFICIAL",
    verificationMetadata: {
      sourceTitle: "WAEC Biology Syllabus",
      sourceDate: "2024-2027",
      verifiedBy: "WAEC Academic Lead",
      confidence: 1.0
    }
  },
  {
    id: "map-cam-igcse-cs-01",
    canonicalSkillId: "skill-cs-algorithms",
    country: "UK",
    jurisdiction: "International / UK",
    curriculumSystem: "CAMBRIDGE_IGCSE",
    educationLevel: "Lower Secondary / IGCSE",
    gradeOrYear: "Year 10-11",
    subjectCode: "CSC",
    standardIdentifier: "CIE-0478-SEC2.1",
    standardTitle: "Algorithm Design and Problem-Solving with Python",
    expectedMasteryScore: 85,
    assessmentStyle: "multiple_choice_4opt",
    verificationStatus: "VERIFIED_OFFICIAL",
    verificationMetadata: {
      sourceTitle: "Cambridge IGCSE Computer Science 0478 Syllabus",
      sourceDate: "2023-2026",
      verifiedBy: "Cambridge IGCSE Review Board",
      confidence: 1.0
    }
  },
  // =========================================================================
  // 1. NIGERIAN CURRICULUM STANDARDS (WAEC, JAMB, NERDC)
  // =========================================================================
  {
    id: "map-ng-waec-quad-01",
    canonicalSkillId: "skill-quad-01",
    country: "NG",
    jurisdiction: "West Africa / Nigeria",
    curriculumSystem: "WAEC",
    educationLevel: "Senior Secondary",
    gradeOrYear: "SS2",
    subjectCode: "MTH",
    standardIdentifier: "WAEC-MTH-SEC3.2.1",
    standardTitle: "Quadratic Equations: Factorization Method",
    expectedMasteryScore: 80,
    assessmentStyle: "multiple_choice_4opt",
    verificationStatus: "PLATFORM_MAPPING",
    verificationMetadata: {
      sourceTitle: "WAEC Regulations and Syllabuses for the West African Senior School Certificate Examination (WASSCE)",
      sourceDate: "2024-2027",
      confidence: 0.95,
      notes: "Direct match to WASSCE General Mathematics Paper 1 & 2 Section A core algebra syllabus."
    }
  },
  {
    id: "map-ng-waec-quad-02",
    canonicalSkillId: "skill-quad-02",
    country: "NG",
    jurisdiction: "West Africa / Nigeria",
    curriculumSystem: "WAEC",
    educationLevel: "Senior Secondary",
    gradeOrYear: "SS2",
    subjectCode: "MTH",
    standardIdentifier: "WAEC-MTH-SEC3.2.2",
    standardTitle: "Completing the Square and Quadratic Formula Derivation",
    expectedMasteryScore: 85,
    assessmentStyle: "stepped_written",
    verificationStatus: "PLATFORM_MAPPING",
    verificationMetadata: {
      sourceTitle: "WAEC Regulations and Syllabuses for WASSCE (General Mathematics)",
      sourceDate: "2024-2027",
      confidence: 0.95,
      notes: "Requires algebraic derivation of the quadratic formula from ax^2 + bx + c = 0."
    }
  },
  {
    id: "map-ng-jamb-quad-01",
    canonicalSkillId: "skill-quad-01",
    country: "NG",
    jurisdiction: "Federal Republic of Nigeria",
    curriculumSystem: "JAMB",
    educationLevel: "University Entrance",
    gradeOrYear: "UTME",
    subjectCode: "MTH",
    standardIdentifier: "JAMB-UTME-MTH-ALG.4",
    standardTitle: "Algebraic Equations: Polynomials & Quadratics",
    expectedMasteryScore: 75,
    assessmentStyle: "cbt_timed",
    verificationStatus: "PLATFORM_MAPPING",
    verificationMetadata: {
      sourceTitle: "JAMB Unified Tertiary Matriculation Examination (UTME) Mathematics Syllabus",
      sourceDate: "2025/2026",
      confidence: 0.92,
      notes: "Timed 40-question CBT format with emphasis on speed factorization and discriminant analysis."
    }
  },
  {
    id: "map-ng-waec-circle-01",
    canonicalSkillId: "skill-geom-circle-01",
    country: "NG",
    jurisdiction: "West Africa / Nigeria",
    curriculumSystem: "WAEC",
    educationLevel: "Senior Secondary",
    gradeOrYear: "SS2",
    subjectCode: "MTH",
    standardIdentifier: "WAEC-MTH-GEO.5.1",
    standardTitle: "Circle Theorems: Angles subtended at center and circumference",
    expectedMasteryScore: 80,
    assessmentStyle: "stepped_written",
    verificationStatus: "PLATFORM_MAPPING",
    verificationMetadata: {
      sourceTitle: "WAEC General Mathematics Syllabus Section 5 (Geometry)",
      sourceDate: "2024-2027",
      confidence: 0.95
    }
  },
  {
    id: "map-ng-waec-trig-01",
    canonicalSkillId: "skill-trig-01",
    country: "NG",
    jurisdiction: "West Africa / Nigeria",
    curriculumSystem: "WAEC",
    educationLevel: "Senior Secondary",
    gradeOrYear: "SS3",
    subjectCode: "MTH",
    standardIdentifier: "WAEC-MTH-TRIG.6.2",
    standardTitle: "Sine and Cosine Rules, Three-Figure Bearings",
    expectedMasteryScore: 80,
    assessmentStyle: "stepped_written",
    verificationStatus: "PLATFORM_MAPPING",
    verificationMetadata: {
      sourceTitle: "WAEC General Mathematics Syllabus Section 6 (Trigonometry)",
      sourceDate: "2024-2027",
      confidence: 0.95
    }
  },

  // =========================================================================
  // 2. UNITED KINGDOM (DfE / GCSE / A-LEVEL)
  // =========================================================================
  {
    id: "map-uk-gcse-quad-01",
    canonicalSkillId: "skill-quad-01",
    country: "UK",
    jurisdiction: "England & Wales (DfE / Ofqual)",
    curriculumSystem: "GCSE",
    educationLevel: "Key Stage 4",
    gradeOrYear: "Year 10/11",
    subjectCode: "8300 / 1MA1",
    standardIdentifier: "DfE-GCSE-MATH-A18",
    standardTitle: "Solve quadratic equations algebraically by factorising",
    terminologyOverrides: {
      notationStyle: "indices"
    },
    expectedMasteryScore: 80,
    assessmentStyle: "stepped_written",
    verificationStatus: "PLATFORM_MAPPING",
    verificationMetadata: {
      sourceTitle: "Department for Education (DfE) Mathematics GCSE Subject Content and Assessment Objectives",
      sourceDate: "2023 Revision",
      confidence: 0.94,
      notes: "Applies to both Foundation Tier (simple quadratics x^2 + bx + c = 0) and Higher Tier (ax^2 + bx + c = 0)."
    }
  },
  {
    id: "map-uk-gcse-quad-02",
    canonicalSkillId: "skill-quad-02",
    country: "UK",
    jurisdiction: "England & Wales (DfE / Ofqual)",
    curriculumSystem: "GCSE",
    educationLevel: "Key Stage 4",
    gradeOrYear: "Year 11",
    subjectCode: "8300 / 1MA1",
    standardIdentifier: "DfE-GCSE-MATH-A18H",
    standardTitle: "Solve quadratic equations by completing the square and using the quadratic formula (Higher Tier)",
    expectedMasteryScore: 85,
    assessmentStyle: "stepped_written",
    verificationStatus: "PLATFORM_MAPPING",
    verificationMetadata: {
      sourceTitle: "DfE GCSE Subject Content for Mathematics - Higher Tier Only",
      sourceDate: "2023 Revision",
      confidence: 0.95,
      notes: "Matches GCSE Higher Tier grades 7-9 assessment standards."
    }
  },
  {
    id: "map-uk-gcse-circle-01",
    canonicalSkillId: "skill-geom-circle-01",
    country: "UK",
    jurisdiction: "England & Wales (DfE / Ofqual)",
    curriculumSystem: "GCSE",
    educationLevel: "Key Stage 4",
    gradeOrYear: "Year 11",
    subjectCode: "8300 / 1MA1",
    standardIdentifier: "DfE-GCSE-MATH-G10",
    standardTitle: "Apply and prove circle theorems: angle at centre, cyclic quadrilaterals, alternate segment theorem",
    expectedMasteryScore: 80,
    assessmentStyle: "stepped_written",
    verificationStatus: "PLATFORM_MAPPING",
    verificationMetadata: {
      sourceTitle: "DfE Mathematics GCSE Subject Content Section G (Geometry & Measures)",
      sourceDate: "2023 Revision",
      confidence: 0.94
    }
  },
  {
    id: "map-uk-alevel-calc-01",
    canonicalSkillId: "skill-calc-diff-01",
    country: "UK",
    jurisdiction: "England & Wales (Ofqual)",
    curriculumSystem: "A_LEVEL",
    educationLevel: "Key Stage 5",
    gradeOrYear: "Year 12",
    subjectCode: "9MA0 / 7357",
    standardIdentifier: "GCE-AL-MATH-7.1",
    standardTitle: "Understand and use the derivative of f(x) as the gradient of the tangent to a curve",
    expectedMasteryScore: 85,
    assessmentStyle: "stepped_written",
    verificationStatus: "PLATFORM_MAPPING",
    verificationMetadata: {
      sourceTitle: "GCE AS and A Level Subject Criteria for Mathematics",
      sourceDate: "2023/2024",
      confidence: 0.93
    }
  },

  // =========================================================================
  // 3. UNITED STATES (Common Core State Standards / CCSS-M & State Standards)
  // =========================================================================
  {
    id: "map-us-ccss-quad-01",
    canonicalSkillId: "skill-quad-01",
    country: "US",
    jurisdiction: "National / Multi-State CCSS",
    curriculumSystem: "US_CCSS",
    educationLevel: "High School (Algebra I / Math II)",
    gradeOrYear: "Grade 9/10",
    subjectCode: "HSA",
    standardIdentifier: "CCSS.MATH.CONTENT.HSA.REI.B.4.B",
    standardTitle: "Solve quadratic equations by inspection, taking square roots, and factoring",
    terminologyOverrides: {
      notationStyle: "scientific_notation",
      skillName: "Solving Quadratic Equations by Factoring"
    },
    expectedMasteryScore: 80,
    assessmentStyle: "multiple_choice_4opt",
    verificationStatus: "PLATFORM_MAPPING",
    verificationMetadata: {
      sourceTitle: "Common Core State Standards for Mathematics - High School: Reasoning with Equations & Inequalities",
      sourceUrl: "http://www.corestandards.org/Math/Content/HSA/REI/B/4/",
      sourceDate: "2010 (Active National Benchmark)",
      confidence: 0.96,
      notes: "Core algebra standard adopted across 40+ US state jurisdictions."
    }
  },
  {
    id: "map-us-ccss-quad-02",
    canonicalSkillId: "skill-quad-02",
    country: "US",
    jurisdiction: "National / Multi-State CCSS",
    curriculumSystem: "US_CCSS",
    educationLevel: "High School (Algebra I / Algebra II)",
    gradeOrYear: "Grade 9-11",
    subjectCode: "HSA",
    standardIdentifier: "CCSS.MATH.CONTENT.HSA.REI.B.4.A",
    standardTitle: "Use the method of completing the square to transform any quadratic equation into an equation of the form (x - p)^2 = q",
    expectedMasteryScore: 85,
    assessmentStyle: "multiple_choice_4opt",
    verificationStatus: "PLATFORM_MAPPING",
    verificationMetadata: {
      sourceTitle: "Common Core State Standards for Mathematics - High School Algebra",
      sourceUrl: "http://www.corestandards.org/Math/Content/HSA/REI/B/4/a/",
      sourceDate: "2010",
      confidence: 0.96
    }
  },
  {
    id: "map-us-teks-quad-01",
    canonicalSkillId: "skill-quad-01",
    country: "US",
    jurisdiction: "Texas (TEA)",
    curriculumSystem: "US_STATE",
    educationLevel: "High School (Algebra I)",
    gradeOrYear: "Grade 9",
    subjectCode: "TEKS-ALG1",
    standardIdentifier: "TEKS.111.39.c.8A",
    standardTitle: "Solve quadratic equations having real solutions by factoring, taking square roots, and applying the quadratic formula",
    expectedMasteryScore: 80,
    assessmentStyle: "multiple_choice_4opt",
    verificationStatus: "PENDING_VERIFICATION",
    verificationMetadata: {
      sourceTitle: "Texas Essential Knowledge and Skills (TEKS) for Mathematics, Subchapter C. High School",
      sourceDate: "2024 Re-adoption",
      confidence: 0.90,
      notes: "State-specific jurisdiction standard for Texas Public Schools."
    }
  },

  // =========================================================================
  // 4. CAMBRIDGE INTERNATIONAL (CAIE IGCSE & A-LEVEL)
  // =========================================================================
  {
    id: "map-intl-caie-quad-01",
    canonicalSkillId: "skill-quad-01",
    country: "INTL",
    jurisdiction: "Cambridge Assessment International Education",
    curriculumSystem: "CAMBRIDGE_IGCSE",
    educationLevel: "Upper Secondary (IGCSE)",
    gradeOrYear: "Stage 10/11",
    subjectCode: "0580",
    standardIdentifier: "CAIE-0580-E2.5",
    standardTitle: "Factorise and solve quadratic equations ax^2 + bx + c = 0 (Core and Extended)",
    terminologyOverrides: {
      notationStyle: "standard_form"
    },
    expectedMasteryScore: 80,
    assessmentStyle: "stepped_written",
    verificationStatus: "PLATFORM_MAPPING",
    verificationMetadata: {
      sourceTitle: "Cambridge IGCSE Mathematics 0580 Syllabus for Examination in 2025, 2026 and 2027",
      sourceDate: "2025-2027",
      confidence: 0.96,
      notes: "Matches Cambridge IGCSE Paper 2 (Extended) and Paper 4 structured problem standards."
    }
  },
  {
    id: "map-intl-caie-quad-02",
    canonicalSkillId: "skill-quad-02",
    country: "INTL",
    jurisdiction: "Cambridge Assessment International Education",
    curriculumSystem: "CAMBRIDGE_IGCSE",
    educationLevel: "Upper Secondary (IGCSE)",
    gradeOrYear: "Stage 11",
    subjectCode: "0580",
    standardIdentifier: "CAIE-0580-E2.6",
    standardTitle: "Completing the square in a quadratic expression, sketching parabolas, and vertex optimization",
    expectedMasteryScore: 85,
    assessmentStyle: "stepped_written",
    verificationStatus: "PLATFORM_MAPPING",
    verificationMetadata: {
      sourceTitle: "Cambridge IGCSE Mathematics 0580 Syllabus Section 2 (Algebra and Graphs)",
      sourceDate: "2025-2027",
      confidence: 0.95
    }
  },
  {
    id: "map-intl-caie-circle-01",
    canonicalSkillId: "skill-geom-circle-01",
    country: "INTL",
    jurisdiction: "Cambridge Assessment International Education",
    curriculumSystem: "CAMBRIDGE_IGCSE",
    educationLevel: "Upper Secondary (IGCSE)",
    gradeOrYear: "Stage 10/11",
    subjectCode: "0580",
    standardIdentifier: "CAIE-0580-E3.3",
    standardTitle: "Calculate unknown angles using geometrical properties of circles (angle at centre, cyclic quad, tangent theorem)",
    expectedMasteryScore: 80,
    assessmentStyle: "stepped_written",
    verificationStatus: "PLATFORM_MAPPING",
    verificationMetadata: {
      sourceTitle: "Cambridge IGCSE Mathematics 0580 Syllabus Section 3 (Geometry)",
      sourceDate: "2025-2027",
      confidence: 0.95
    }
  }
];

export const SUPPORTED_EDUCATION_SYSTEMS: Array<{
  code: EducationSystemCode;
  country: CountryCode;
  countryName: string;
  name: string;
  shortLabel: string;
  levels: string[];
  keyExams: string[];
  defaultFlagEmoji: string;
}> = [
  {
    code: "WAEC",
    country: "NG",
    countryName: "Nigeria & West Africa",
    name: "West African Senior School Certificate (WASSCE / WAEC)",
    shortLabel: "WAEC / WASSCE",
    levels: ["Senior Secondary 1 (SS1)", "Senior Secondary 2 (SS2)", "Senior Secondary 3 (SS3)"],
    keyExams: ["WASSCE", "GCE"],
    defaultFlagEmoji: "🇳🇬"
  },
  {
    code: "JAMB",
    country: "NG",
    countryName: "Nigeria",
    name: "Joint Admissions and Matriculation Board (UTME CBT)",
    shortLabel: "JAMB UTME",
    levels: ["University Matriculation Entry"],
    keyExams: ["UTME CBT"],
    defaultFlagEmoji: "🇳🇬"
  },
  {
    code: "NERDC",
    country: "NG",
    countryName: "Nigeria",
    name: "Nigerian Educational Research & Development Council (9-Year Basic Education)",
    shortLabel: "NERDC / BECE",
    levels: ["Primary 1-6", "JSS1", "JSS2", "JSS3"],
    keyExams: ["BECE", "National Common Entrance"],
    defaultFlagEmoji: "🇳🇬"
  },
  {
    code: "GCSE",
    country: "UK",
    countryName: "United Kingdom",
    name: "England National Curriculum (GCSE / Key Stage 4)",
    shortLabel: "UK GCSE",
    levels: ["Key Stage 3 (Years 7-9)", "GCSE Foundation (Years 10-11)", "GCSE Higher (Years 10-11)"],
    keyExams: ["GCSE Mathematics (Edexcel / AQA / OCR)"],
    defaultFlagEmoji: "🇬🇧"
  },
  {
    code: "A_LEVEL",
    country: "UK",
    countryName: "United Kingdom",
    name: "General Certificate of Education (GCE Advanced Level)",
    shortLabel: "UK A-Level",
    levels: ["Year 12 (AS Level)", "Year 13 (A2 Level)"],
    keyExams: ["A-Level Pure Mathematics", "A-Level Statistics & Mechanics"],
    defaultFlagEmoji: "🇬🇧"
  },
  {
    code: "US_CCSS",
    country: "US",
    countryName: "United States",
    name: "Common Core State Standards for Mathematics (CCSS-M)",
    shortLabel: "US Common Core",
    levels: ["Middle School (Grades 6-8)", "Algebra I (Grade 9)", "Geometry (Grade 10)", "Algebra II (Grade 11)", "Pre-Calculus"],
    keyExams: ["State End-of-Course (EOC)", "SAT Math Prep", "ACT Math Prep"],
    defaultFlagEmoji: "🇺🇸"
  },
  {
    code: "CAMBRIDGE_IGCSE",
    country: "INTL",
    countryName: "Cambridge International",
    name: "Cambridge Assessment International Education (IGCSE 0580)",
    shortLabel: "Cambridge IGCSE",
    levels: ["Lower Secondary (Stages 7-9)", "IGCSE Core (Stages 10-11)", "IGCSE Extended (Stages 10-11)"],
    keyExams: ["Cambridge IGCSE 0580 Paper 2/4", "Cambridge IGCSE 0607"],
    defaultFlagEmoji: "🌍"
  }
];
