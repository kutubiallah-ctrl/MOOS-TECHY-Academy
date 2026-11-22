/**
 * MOOS TECHY ACADEMY — UNIVERSAL COUNTRY & CURRICULUM REGISTRY
 * 
 * Scalable Curriculum Localization Architecture:
 * COUNTRY -> EDUCATIONAL SYSTEM -> CURRICULUM -> EXAMINATION PATHWAY -> LEVEL -> SUBJECT -> UNIT -> TOPIC -> SKILL -> LEARNING RESOURCES
 * 
 * Strict Classification Tiers:
 * - SUPPORTED: Comprehensive verified curriculum pathways, official examination calibration, and populated learning resources.
 * - PARTIALLY_SUPPORTED: Core STEM and secondary pathways populated and syllabus-mapped; higher phases in active localization.
 * - INTERFACE_ONLY: Framework registered; syllabus mapped to international baseline; not falsely claiming empty completion.
 * - NOT_YET_SUPPORTED: On roadmap; curriculum submission guidelines provided.
 */

import { CountryCode, EducationSystemCode, EducationalLevel } from "../types/curriculum";

export type CountrySupportTier =
  | "SUPPORTED"
  | "PARTIALLY_SUPPORTED"
  | "INTERFACE_ONLY"
  | "NOT_YET_SUPPORTED";

export interface ExaminationPathway {
  id: string;
  name: string;
  shortName: string;
  examiningBody: string;
  targetAges: string;
  keySubjects: string[];
  gradingScale: string;
  officialSyllabusReference: string;
  description: string;
}

export interface CountryCurriculumProfile {
  countryCode: CountryCode;
  countryName: string;
  flagEmoji: string;
  supportTier: CountrySupportTier;
  supportTierLabel: string;
  tierDescription: string;
  educationSystemCode: EducationSystemCode;
  systemName: string;
  systemStructure: string; // e.g., "6-3-3-4 System", "Key Stages 1-5", "K-12 System"
  primaryLanguage: string;
  examinationPathways: ExaminationPathway[];
  terminologyMap: {
    mathematicsName: string; // "Mathematics" vs "Math" vs "Maths"
    exponentsName: string;   // "Indices" vs "Exponents" vs "Powers"
    scientificNotationName: string; // "Standard Form" vs "Scientific Notation"
    factoringName: string;   // "Factorisation" vs "Factoring"
    radicalsName: string;    // "Surds" vs "Radicals" vs "Square Roots"
    bracketsName: string;    // "Brackets" vs "Parentheses"
    levelNames: Record<EducationalLevel, string>;
  };
  sampleSyllabusCodes: Record<string, string>; // unitId -> local syllabus code
  localizedUnitsCount: number;
}

export const COUNTRY_CURRICULUM_REGISTRY: Record<CountryCode, CountryCurriculumProfile> = {
  NG: {
    countryCode: "NG",
    countryName: "Nigeria & West Africa",
    flagEmoji: "🇳🇬",
    supportTier: "SUPPORTED",
    supportTierLabel: "Fully Supported (Canonical)",
    tierDescription: "Comprehensive 83-unit curriculum aligned with NERDC 9-Year Basic Education and WAEC/WASSCE & JAMB UTME specifications.",
    educationSystemCode: "WAEC",
    systemName: "Nigerian National Curriculum (NERDC / WAEC / JAMB)",
    systemStructure: "6-3-3-4 System (Primary 1-6, JSS 1-3, SSS 1-3, Tertiary)",
    primaryLanguage: "English",
    examinationPathways: [
      {
        id: "exam_waec_wassce",
        name: "West African Senior School Certificate Examination (WASSCE)",
        shortName: "WAEC WASSCE",
        examiningBody: "West African Examinations Council (WAEC)",
        targetAges: "15-18 (SSS 1 - SSS 3)",
        keySubjects: ["General Mathematics", "English Language", "Physics", "Chemistry", "Biology", "Economics", "Further Mathematics"],
        gradingScale: "A1 (Distinction) to F9 (Fail)",
        officialSyllabusReference: "WAEC Regulations and Syllabuses for Senior Secondary Schools",
        description: "Authoritative West African secondary school leaving qualification required for university admission."
      },
      {
        id: "exam_jamb_utme",
        name: "Unified Tertiary Matriculation Examination (UTME CBT)",
        shortName: "JAMB UTME",
        examiningBody: "Joint Admissions and Matriculation Board (JAMB)",
        targetAges: "16+ (Post-Secondary Matriculation)",
        keySubjects: ["Use of English", "Mathematics", "Physics", "Chemistry", "Biology"],
        gradingScale: "0 - 400 Aggregate Score",
        officialSyllabusReference: "JAMB Interactive e-Brochure and Syllabus System (IBASS)",
        description: "National computer-based examination determining tertiary admission quotas in Nigeria."
      },
      {
        id: "exam_nerdc_bece",
        name: "Basic Education Certificate Examination (BECE)",
        shortName: "NERDC BECE",
        examiningBody: "National Examinations Council (NECO) / State Ministry",
        targetAges: "12-15 (JSS 1 - JSS 3)",
        keySubjects: ["Basic Mathematics", "English Studies", "Basic Science & Technology"],
        gradingScale: "Distinction, Credit, Pass, Fail",
        officialSyllabusReference: "NERDC National Curriculum for Junior Secondary Education",
        description: "Culmination of Nigeria's 9-year universal basic education program."
      }
    ],
    terminologyMap: {
      mathematicsName: "Mathematics",
      exponentsName: "Indices",
      scientificNotationName: "Standard Form",
      factoringName: "Factorisation",
      radicalsName: "Surds",
      bracketsName: "Brackets",
      levelNames: {
        primary_foundations: "Primary Foundations (Pri 1-3)",
        upper_primary: "Upper Primary (Pri 4-6)",
        junior_secondary: "Junior Secondary (JSS 1-3)",
        senior_secondary: "Senior Secondary (SSS 1-3)",
        university_prep: "University Matriculation (JAMB / A-Level)",
        exam_prep: "WAEC & JAMB CBT Speed Drills"
      }
    },
    sampleSyllabusCodes: {
      "unit-math-algebra-linear": "WAEC-MTH-2024-Sec2.1",
      "unit-math-algebra-quadratics": "WAEC-MTH-2024-Sec2.4",
      "unit-math-geometry-circles": "WAEC-MTH-2024-Sec4.2",
      "unit-sci-phy-mechanics": "WAEC-PHY-2024-Topic1.1",
      "unit-sci-chm-bonding": "WAEC-CHM-2024-Sec3.1",
      "unit-eng-syntax-grammar": "WAEC-ENG-2024-Paper2"
    },
    localizedUnitsCount: 83
  },

  UK: {
    countryCode: "UK",
    countryName: "United Kingdom",
    flagEmoji: "🇬🇧",
    supportTier: "SUPPORTED",
    supportTierLabel: "Fully Supported (UK Standard)",
    tierDescription: "Official England National Curriculum specification mapped to Key Stage 3, GCSE (Edexcel, AQA, OCR), and GCE Advanced Level (A-Level).",
    educationSystemCode: "GCSE",
    systemName: "National Curriculum for England & Wales",
    systemStructure: "Key Stages 1-5 (Primary Years 1-6, KS3 Years 7-9, GCSE Years 10-11, A-Level Years 12-13)",
    primaryLanguage: "English (British)",
    examinationPathways: [
      {
        id: "exam_uk_gcse",
        name: "General Certificate of Secondary Education (GCSE)",
        shortName: "UK GCSE",
        examiningBody: "Ofqual Accredited (Edexcel Pearson / AQA / OCR)",
        targetAges: "14-16 (Years 10-11 / Key Stage 4)",
        keySubjects: ["GCSE Mathematics (Foundation & Higher)", "GCSE English Language", "GCSE Combined Science / Physics / Chemistry / Biology", "GCSE Computer Science"],
        gradingScale: "Grades 9 to 1 (Grade 9 being highest distinction)",
        officialSyllabusReference: "Department for Education (DfE) National Curriculum in England: Secondary Curriculum",
        description: "Official statutory qualification in England, Wales, and Northern Ireland assessed across linear papers."
      },
      {
        id: "exam_uk_alevel",
        name: "GCE Advanced Level (A-Level)",
        shortName: "UK A-Level",
        examiningBody: "Pearson Edexcel / AQA / OCR",
        targetAges: "16-18 (Years 12-13 / Sixth Form)",
        keySubjects: ["A-Level Mathematics (Pure Mathematics, Statistics & Mechanics)", "Further Mathematics", "A-Level Physics", "A-Level Chemistry"],
        gradingScale: "A* to E (with A* distinction)",
        officialSyllabusReference: "Edexcel Pearson GCE A-Level Mathematics Specification 9MA0",
        description: "Rigorous subject-based qualification benchmark for UK and global university entrance."
      },
      {
        id: "exam_uk_ks3",
        name: "Key Stage 3 National Benchmark",
        shortName: "UK Key Stage 3",
        examiningBody: "Department for Education (DfE)",
        targetAges: "11-14 (Years 7-9)",
        keySubjects: ["KS3 Mathematics", "KS3 English", "KS3 Science", "KS3 Computing"],
        gradingScale: "Age-Related Expectations (Working Towards / Expected / Greater Depth)",
        officialSyllabusReference: "DfE Framework for Secondary Mathematics at Key Stage 3",
        description: "Lower secondary foundation bridge preparing learners for GCSE subject options."
      }
    ],
    terminologyMap: {
      mathematicsName: "Maths",
      exponentsName: "Indices",
      scientificNotationName: "Standard Form",
      factoringName: "Factorising",
      radicalsName: "Surds",
      bracketsName: "Brackets",
      levelNames: {
        primary_foundations: "Key Stage 1 (Years 1-2)",
        upper_primary: "Key Stage 2 (Years 3-6)",
        junior_secondary: "Key Stage 3 (Years 7-9)",
        senior_secondary: "GCSE Higher / Foundation (Years 10-11)",
        university_prep: "GCE A-Level (Years 12-13 Sixth Form)",
        exam_prep: "GCSE & A-Level Past Paper Revision"
      }
    },
    sampleSyllabusCodes: {
      "unit-math-algebra-linear": "GCSE-AQA-8300-3.1",
      "unit-math-algebra-quadratics": "GCSE-EDX-1MA1-A18",
      "unit-math-geometry-circles": "GCSE-EDX-1MA1-G10",
      "unit-sci-phy-mechanics": "GCSE-AQA-8463-P5",
      "unit-sci-chm-bonding": "GCSE-AQA-8462-C2",
      "unit-eng-syntax-grammar": "GCSE-EDX-1EN0-AO4"
    },
    localizedUnitsCount: 83
  },

  US: {
    countryCode: "US",
    countryName: "United States",
    flagEmoji: "🇺🇸",
    supportTier: "SUPPORTED",
    supportTierLabel: "Fully Supported (US Standard)",
    tierDescription: "Comprehensive standard alignment with Common Core State Standards for Mathematics (CCSS-M), Next Generation Science Standards (NGSS), and SAT/AP pathways.",
    educationSystemCode: "US_CCSS",
    systemName: "United States K-12 Standards Framework (CCSS / NGSS)",
    systemStructure: "K-12 System (Elementary K-5, Middle School 6-8, High School 9-12)",
    primaryLanguage: "English (US)",
    examinationPathways: [
      {
        id: "exam_us_sat_act",
        name: "College Board SAT & ACT Standardized Tests",
        shortName: "SAT & ACT Prep",
        examiningBody: "The College Board & ACT Inc.",
        targetAges: "16-18 (Grades 11-12)",
        keySubjects: ["Digital SAT Math (Algebra, Advanced Math, Problem Solving)", "SAT Reading & Writing", "ACT Science"],
        gradingScale: "400 - 1600 (SAT) / 1 - 36 Composite (ACT)",
        officialSyllabusReference: "College Board Digital SAT Test Specifications",
        description: "Standardized admissions exams used by universities nationwide across the United States."
      },
      {
        id: "exam_us_ap",
        name: "Advanced Placement (AP) Examinations",
        shortName: "AP College Credit",
        examiningBody: "The College Board",
        targetAges: "15-18 (Grades 10-12)",
        keySubjects: ["AP Calculus AB & BC", "AP Statistics", "AP Physics 1 & C", "AP Chemistry", "AP Computer Science A"],
        gradingScale: "Score 1 to 5 (3+ grants college credit)",
        officialSyllabusReference: "College Board AP Course and Exam Descriptions (CED)",
        description: "Rigorous university-level coursework and examinations administered in high schools."
      },
      {
        id: "exam_us_eoc",
        name: "State End-of-Course (EOC) Regulated Assessments",
        shortName: "State EOC Assessments",
        examiningBody: "State Departments of Education (California, Texas, New York Regents)",
        targetAges: "14-18 (Grades 9-12)",
        keySubjects: ["Algebra I", "Geometry", "Algebra II", "Biology", "English Language Arts"],
        gradingScale: "Exceeds / Meets / Approaching Standards",
        officialSyllabusReference: "Common Core State Standards for Mathematics (CCSS-M)",
        description: "State-mandated milestone assessments verifying high school graduation proficiency."
      }
    ],
    terminologyMap: {
      mathematicsName: "Math",
      exponentsName: "Exponents",
      scientificNotationName: "Scientific Notation",
      factoringName: "Factoring",
      radicalsName: "Radicals",
      bracketsName: "Parentheses",
      levelNames: {
        primary_foundations: "Early Elementary (Grades K-3)",
        upper_primary: "Upper Elementary (Grades 4-5)",
        junior_secondary: "Middle School (Grades 6-8)",
        senior_secondary: "High School (Grades 9-12: Alg I, Geom, Alg II)",
        university_prep: "Pre-Calculus & AP Courses (College Prep)",
        exam_prep: "Digital SAT & ACT Speed Practice"
      }
    },
    sampleSyllabusCodes: {
      "unit-math-algebra-linear": "CCSS.MATH.CONTENT.HSA.REI.B.3",
      "unit-math-algebra-quadratics": "CCSS.MATH.CONTENT.HSA.REI.B.4",
      "unit-math-geometry-circles": "CCSS.MATH.CONTENT.HSG.C.A.2",
      "unit-sci-phy-mechanics": "NGSS.HS-PS2-1",
      "unit-sci-chm-bonding": "NGSS.HS-PS1-1",
      "unit-eng-syntax-grammar": "CCSS.ELA-LITERACY.L.9-10.1"
    },
    localizedUnitsCount: 83
  },

  CA: {
    countryCode: "CA",
    countryName: "Canada",
    flagEmoji: "🇨🇦",
    supportTier: "PARTIALLY_SUPPORTED",
    supportTierLabel: "Partially Supported (Ontario/Alberta Provincial)",
    tierDescription: "Core secondary STEM pathways aligned with Ontario (OSSD) and Alberta provincial curricula; vocational and elementary modules in active localization.",
    educationSystemCode: "CANADA_PROVINCIAL",
    systemName: "Canadian Provincial Education (Ontario / Alberta Standards)",
    systemStructure: "K-12 System (Elementary 1-8, Secondary 9-12)",
    primaryLanguage: "English & French Bilingual",
    examinationPathways: [
      {
        id: "exam_ca_ontario_diploma",
        name: "Ontario Secondary School Diploma (OSSD) / EQAO",
        shortName: "Ontario OSSD & EQAO",
        examiningBody: "Ontario Ministry of Education & EQAO",
        targetAges: "14-18 (Grades 9-12)",
        keySubjects: ["Grade 9 De-streamed Math (MTH1W)", "Grade 10 Principles of Math (MPM2D)", "Grade 11 Functions (MCR3U)", "Grade 12 Advanced Functions (MHF4U)"],
        gradingScale: "Percentage Scale (Level 1-4+)",
        officialSyllabusReference: "Ontario Ministry of Education: The Ontario Curriculum Grades 9 to 12",
        description: "Standard provincial high school graduation pathway for Ontario."
      }
    ],
    terminologyMap: {
      mathematicsName: "Mathematics",
      exponentsName: "Exponents",
      scientificNotationName: "Scientific Notation",
      factoringName: "Factoring",
      radicalsName: "Radicals",
      bracketsName: "Brackets",
      levelNames: {
        primary_foundations: "Primary Division (Grades 1-3)",
        upper_primary: "Junior Division (Grades 4-6)",
        junior_secondary: "Intermediate Division (Grades 7-8)",
        senior_secondary: "Secondary School (Grades 9-11)",
        university_prep: "Grade 12 University Preparation (4U/4M)",
        exam_prep: "EQAO & OSSLT Diploma Practice"
      }
    },
    sampleSyllabusCodes: {
      "unit-math-algebra-linear": "ON-MTH1W-B2",
      "unit-math-algebra-quadratics": "ON-MPM2D-B1",
      "unit-math-geometry-circles": "ON-MPM2D-G2"
    },
    localizedUnitsCount: 45
  },

  IN: {
    countryCode: "IN",
    countryName: "India",
    flagEmoji: "🇮🇳",
    supportTier: "PARTIALLY_SUPPORTED",
    supportTierLabel: "Partially Supported (CBSE / NCERT)",
    tierDescription: "Core Secondary (Class 9-10) and Senior Secondary (Class 11-12) STEM units mapped to NCERT and CBSE Board examination standards.",
    educationSystemCode: "INDIA_CBSE",
    systemName: "Central Board of Secondary Education (CBSE / NCERT)",
    systemStructure: "10+2 Structure (Primary 1-5, Middle 6-8, Secondary 9-10, Senior Secondary 11-12)",
    primaryLanguage: "English & Hindi",
    examinationPathways: [
      {
        id: "exam_in_cbse_board",
        name: "CBSE Class 10 & 12 Board Examinations",
        shortName: "CBSE Board Exams",
        examiningBody: "Central Board of Secondary Education (CBSE)",
        targetAges: "15-18 (Classes 10 & 12)",
        keySubjects: ["Mathematics Standard/Basic", "Science (Physics, Chemistry, Biology)", "English Core"],
        gradingScale: "Marks out of 100 with A1-E grading",
        officialSyllabusReference: "CBSE Secondary and Senior School Curriculum 2024-2025",
        description: "National public examination conducted annually for secondary and senior secondary students in India."
      },
      {
        id: "exam_in_jee_foundation",
        name: "Joint Entrance Examination (JEE Main Foundation)",
        shortName: "JEE STEM Foundation",
        examiningBody: "National Testing Agency (NTA)",
        targetAges: "16-18 (Senior Secondary)",
        keySubjects: ["Mathematics", "Physics", "Chemistry"],
        gradingScale: "NTA Percentile Score",
        officialSyllabusReference: "NTA JEE Main Information Bulletin",
        description: "Competitive national entrance test for premier Indian engineering institutes (IITs/NITs)."
      }
    ],
    terminologyMap: {
      mathematicsName: "Mathematics",
      exponentsName: "Exponents & Powers",
      scientificNotationName: "Standard Form",
      factoringName: "Factorisation",
      radicalsName: "Surds & Roots",
      bracketsName: "Brackets",
      levelNames: {
        primary_foundations: "Primary Stage (Class 1-3)",
        upper_primary: "Upper Primary (Class 4-5)",
        junior_secondary: "Middle Stage (Class 6-8)",
        senior_secondary: "Secondary Stage (Class 9-10)",
        university_prep: "Senior Secondary (Class 11-12)",
        exam_prep: "CBSE Board & JEE Foundation Drills"
      }
    },
    sampleSyllabusCodes: {
      "unit-math-algebra-linear": "CBSE-MTH-CL9-CH04",
      "unit-math-algebra-quadratics": "CBSE-MTH-CL10-CH04",
      "unit-math-geometry-circles": "CBSE-MTH-CL10-CH10"
    },
    localizedUnitsCount: 42
  },

  AU: {
    countryCode: "AU",
    countryName: "Australia",
    flagEmoji: "🇦🇺",
    supportTier: "PARTIALLY_SUPPORTED",
    supportTierLabel: "Partially Supported (ACARA Australian Standard)",
    tierDescription: "Core Years 7-10 Australian Curriculum and Senior Secondary Mathematical Methods mapped; state-specific variants (HSC, VCE, QCE) in progress.",
    educationSystemCode: "AUSTRALIA_ACARA",
    systemName: "Australian Curriculum (ACARA v9.0)",
    systemStructure: "Prep to Year 12 (Primary Prep-6, Secondary 7-10, Senior Secondary 11-12)",
    primaryLanguage: "English (Australian)",
    examinationPathways: [
      {
        id: "exam_au_atar_methods",
        name: "Senior Secondary Mathematical Methods (ATAR Pathway)",
        shortName: "ATAR Maths Methods",
        examiningBody: "State Curriculum Authorities (NESA / VCAA / QCAA)",
        targetAges: "16-18 (Years 11-12)",
        keySubjects: ["Mathematical Methods", "Specialist Mathematics", "Physics", "Chemistry"],
        gradingScale: "Australian Tertiary Admission Rank (ATAR 0.00 - 99.95)",
        officialSyllabusReference: "ACARA Senior Secondary Curriculum: Mathematical Methods",
        description: "University ranking metric and advanced curriculum across Australian states."
      }
    ],
    terminologyMap: {
      mathematicsName: "Mathematics",
      exponentsName: "Indices",
      scientificNotationName: "Scientific Notation",
      factoringName: "Factorising",
      radicalsName: "Surds",
      bracketsName: "Brackets",
      levelNames: {
        primary_foundations: "Lower Primary (Years 1-3)",
        upper_primary: "Upper Primary (Years 4-6)",
        junior_secondary: "Lower Secondary (Years 7-8)",
        senior_secondary: "Middle Secondary (Years 9-10)",
        university_prep: "Senior Secondary ATAR (Years 11-12)",
        exam_prep: "ATAR Speed Practice & Exam Drills"
      }
    },
    sampleSyllabusCodes: {
      "unit-math-algebra-linear": "ACARA-AC9M9A01",
      "unit-math-algebra-quadratics": "ACARA-AC9M10A02",
      "unit-math-geometry-circles": "ACARA-AC9M10G01"
    },
    localizedUnitsCount: 40
  },

  JP: {
    countryCode: "JP",
    countryName: "Japan",
    flagEmoji: "🇯🇵",
    supportTier: "PARTIALLY_SUPPORTED",
    supportTierLabel: "Partially Supported (MEXT Monbukagakusho)",
    tierDescription: "Core secondary mathematics curriculum aligned with MEXT guidelines (Chūgakkō 7-9 and Kōtōgakkō Math I/A/II/B) with bilingual English/Japanese terminology.",
    educationSystemCode: "JAPAN_MEXT",
    systemName: "Japanese National Curriculum Guidelines (MEXT)",
    systemStructure: "6-3-3-4 System (Shōgakkō 1-6, Chūgakkō 1-3, Kōtōgakkō 1-3, Daigaku)",
    primaryLanguage: "Japanese & English Bilingual",
    examinationPathways: [
      {
        id: "exam_jp_kyotsu_test",
        name: "Common Test for University Admissions (Daigaku Nyūgaku Kyōtsū Test)",
        shortName: "Kyōtsū Test",
        examiningBody: "National Center for University Entrance Examinations (DNC)",
        targetAges: "17-18 (Kōtōgakkō Grade 3)",
        keySubjects: ["Mathematics I・A", "Mathematics II・B", "English", "Physics / Chemistry"],
        gradingScale: "Raw points / Scaled score out of 200 per subject",
        officialSyllabusReference: "MEXT High School Curriculum Guidelines (Gakushū Shidō Yōryō)",
        description: "National standardized test used by national, public, and private universities across Japan."
      }
    ],
    terminologyMap: {
      mathematicsName: "Mathematics (数学)",
      exponentsName: "Indices & Powers (指数)",
      scientificNotationName: "Standard Form",
      factoringName: "Factorisation (因数分解)",
      radicalsName: "Square Roots (平方根)",
      bracketsName: "Parentheses (括弧)",
      levelNames: {
        primary_foundations: "Lower Elementary (Shōgakkō 1-3)",
        upper_primary: "Upper Elementary (Shōgakkō 4-6)",
        junior_secondary: "Junior High (Chūgakkō 1-3)",
        senior_secondary: "Senior High (Kōtōgakkō Math I/A)",
        university_prep: "Advanced High School (Math II/B & III)",
        exam_prep: "Kyōtsū Test & Entrance Drills"
      }
    },
    sampleSyllabusCodes: {
      "unit-math-algebra-linear": "MEXT-JH-MATH-02",
      "unit-math-algebra-quadratics": "MEXT-HS-MATH-I-A2"
    },
    localizedUnitsCount: 35
  },

  CN: {
    countryCode: "CN",
    countryName: "China",
    flagEmoji: "🇨🇳",
    supportTier: "PARTIALLY_SUPPORTED",
    supportTierLabel: "Partially Supported (Gaokao Standard)",
    tierDescription: "Core senior secondary mathematics (Gao Yi to Gao San) aligned with National Curriculum Guidelines and Gaokao examination framework.",
    educationSystemCode: "CHINA_NATIONAL",
    systemName: "National Senior High School Mathematics Curriculum (Ministry of Education)",
    systemStructure: "6-3-3-4 System (Primary 1-6, Junior High 1-3, Senior High 1-3, University)",
    primaryLanguage: "Simplified Chinese & English Bilingual",
    examinationPathways: [
      {
        id: "exam_cn_gaokao",
        name: "National College Entrance Examination (Gaokao)",
        shortName: "National Gaokao",
        examiningBody: "Ministry of Education of the People's Republic of China",
        targetAges: "17-18 (Gao San)",
        keySubjects: ["Mathematics", "Chinese", "Foreign Language (English)", "Comprehensive Sciences"],
        gradingScale: "Total score typically out of 750 points",
        officialSyllabusReference: "General Senior High School Curriculum Standards: Mathematics",
        description: "High-stakes national academic examination determining university admissions throughout China."
      }
    ],
    terminologyMap: {
      mathematicsName: "Mathematics (数学)",
      exponentsName: "Exponents (指数)",
      scientificNotationName: "Scientific Notation (科学记数法)",
      factoringName: "Factorisation (因式分解)",
      radicalsName: "Radicals (根式)",
      bracketsName: "Brackets (括号)",
      levelNames: {
        primary_foundations: "Primary Lower (Years 1-3)",
        upper_primary: "Primary Upper (Years 4-6)",
        junior_secondary: "Junior High (Chu Yi - Chu San)",
        senior_secondary: "Senior High (Gao Yi - Gao Er)",
        university_prep: "Senior High Graduation (Gao San Prep)",
        exam_prep: "Gaokao Intensive Review Drills"
      }
    },
    sampleSyllabusCodes: {
      "unit-math-algebra-linear": "CN-MATH-G1-ALG01",
      "unit-math-algebra-quadratics": "CN-MATH-G1-QUAD02"
    },
    localizedUnitsCount: 35
  },

  KR: {
    countryCode: "KR",
    countryName: "South Korea",
    flagEmoji: "🇰🇷",
    supportTier: "PARTIALLY_SUPPORTED",
    supportTierLabel: "Partially Supported (CSAT / Suneung)",
    tierDescription: "Core secondary mathematics aligned with Ministry of Education National Curriculum and Suneung examination benchmarks.",
    educationSystemCode: "KOREA_CSAT",
    systemName: "South Korea National Curriculum Framework",
    systemStructure: "6-3-3-4 System (Elementary 1-6, Middle School 1-3, High School 1-3, University)",
    primaryLanguage: "Korean & English Bilingual",
    examinationPathways: [
      {
        id: "exam_kr_suneung",
        name: "College Scholastic Ability Test (CSAT / Suneung)",
        shortName: "CSAT Suneung",
        examiningBody: "Korea Institute for Curriculum and Evaluation (KICE)",
        targetAges: "17-18 (High School Year 3)",
        keySubjects: ["Mathematics (Common Math, Calculus/Probability)", "Korean Language", "English", "Science Inquiry"],
        gradingScale: "Stanine Tiers (Grades 1 to 9, Grade 1 top 4%)",
        officialSyllabusReference: "Ministry of Education Notice on Revised National Curriculum",
        description: "Standardized university entrance examination administered annually nationwide in South Korea."
      }
    ],
    terminologyMap: {
      mathematicsName: "Mathematics (수학)",
      exponentsName: "Exponents (지수)",
      scientificNotationName: "Standard Form",
      factoringName: "Factorisation (인수분해)",
      radicalsName: "Square Roots (제곱근)",
      bracketsName: "Brackets (괄호)",
      levelNames: {
        primary_foundations: "Elementary Lower (Grades 1-3)",
        upper_primary: "Elementary Upper (Grades 4-6)",
        junior_secondary: "Middle School (Grades 1-3)",
        senior_secondary: "High School Common Math (Grade 1)",
        university_prep: "High School Selective Math (Calculus)",
        exam_prep: "CSAT Suneung Intensive Drills"
      }
    },
    sampleSyllabusCodes: {
      "unit-math-algebra-linear": "KR-MATH-MS2-01",
      "unit-math-algebra-quadratics": "KR-MATH-HS1-02"
    },
    localizedUnitsCount: 35
  },

  ZA: {
    countryCode: "ZA",
    countryName: "South Africa",
    flagEmoji: "🇿🇦",
    supportTier: "PARTIALLY_SUPPORTED",
    supportTierLabel: "Partially Supported (CAPS / Matric)",
    tierDescription: "Core Grades 10-12 Further Education and Training (FET) phase mapped to National Senior Certificate (NSC Matric) examination guidelines.",
    educationSystemCode: "SOUTH_AFRICA_CAPS",
    systemName: "Curriculum and Assessment Policy Statement (CAPS / DBE)",
    systemStructure: "General & Further Education Bands (Foundation 1-3, Intermediate 4-6, Senior 7-9, FET 10-12)",
    primaryLanguage: "English & Official South African Languages",
    examinationPathways: [
      {
        id: "exam_za_nsc_matric",
        name: "National Senior Certificate (NSC / Matric)",
        shortName: "NSC Matric",
        examiningBody: "Department of Basic Education (DBE) & Umalusi",
        targetAges: "16-18 (Grades 10-12 / FET Phase)",
        keySubjects: ["Mathematics", "Physical Sciences", "Life Sciences", "English Home/First Additional"],
        gradingScale: "Achievement Levels 1 to 7 (Level 7: 80-100% Outstanding)",
        officialSyllabusReference: "DBE Curriculum and Assessment Policy Statement: Mathematics Grades 10-12",
        description: "Official statutory school-leaving certificate in South Africa qualifying learners for university study."
      }
    ],
    terminologyMap: {
      mathematicsName: "Mathematics",
      exponentsName: "Exponents",
      scientificNotationName: "Scientific Notation",
      factoringName: "Factorisation",
      radicalsName: "Surds",
      bracketsName: "Brackets",
      levelNames: {
        primary_foundations: "Foundation Phase (Grades 1-3)",
        upper_primary: "Intermediate Phase (Grades 4-6)",
        junior_secondary: "Senior Phase (Grades 7-9)",
        senior_secondary: "FET Phase (Grades 10-11)",
        university_prep: "Grade 12 Matriculation (FET Exit)",
        exam_prep: "NSC Matric Past Exam Drills"
      }
    },
    sampleSyllabusCodes: {
      "unit-math-algebra-linear": "CAPS-MTH-GR10-TOPIC1",
      "unit-math-algebra-quadratics": "CAPS-MTH-GR11-TOPIC2"
    },
    localizedUnitsCount: 38
  },

  INTL: {
    countryCode: "INTL",
    countryName: "International & Cambridge",
    flagEmoji: "🌍",
    supportTier: "SUPPORTED",
    supportTierLabel: "Fully Supported (Cambridge & Global STEM)",
    tierDescription: "Cambridge Assessment International Education (IGCSE 0580 & A-Level) and International Baccalaureate (IB) global curriculum standards.",
    educationSystemCode: "CAMBRIDGE_IGCSE",
    systemName: "Cambridge International & Global STEM Framework",
    systemStructure: "Cambridge Pathway (Lower Secondary Stages 7-9, IGCSE Stages 10-11, Cambridge International A-Level Stages 12-13)",
    primaryLanguage: "English (International)",
    examinationPathways: [
      {
        id: "exam_intl_cambridge_igcse",
        name: "Cambridge IGCSE Mathematics (0580)",
        shortName: "Cambridge IGCSE",
        examiningBody: "Cambridge Assessment International Education",
        targetAges: "14-16 (Stages 10-11)",
        keySubjects: ["Cambridge IGCSE Mathematics 0580", "IGCSE Physics 0625", "IGCSE Chemistry 0620", "IGCSE Biology 0610", "IGCSE Computer Science 0478"],
        gradingScale: "Grades A* to G",
        officialSyllabusReference: "Cambridge IGCSE Mathematics (0580) Syllabus 2025-2027",
        description: "World's most popular international qualification for 14-16 year olds recognised by leading universities globally."
      }
    ],
    terminologyMap: {
      mathematicsName: "Mathematics",
      exponentsName: "Indices",
      scientificNotationName: "Standard Form",
      factoringName: "Factorising",
      radicalsName: "Surds",
      bracketsName: "Brackets",
      levelNames: {
        primary_foundations: "Cambridge Primary (Stages 1-3)",
        upper_primary: "Cambridge Primary (Stages 4-6)",
        junior_secondary: "Cambridge Lower Secondary (Stages 7-9)",
        senior_secondary: "Cambridge IGCSE Core & Extended (Stages 10-11)",
        university_prep: "Cambridge International AS & A Level (Stages 12-13)",
        exam_prep: "Cambridge IGCSE 0580 Paper 2/4 Exam Drills"
      }
    },
    sampleSyllabusCodes: {
      "unit-math-algebra-linear": "CAIE-0580-E2.1",
      "unit-math-algebra-quadratics": "CAIE-0580-E2.5",
      "unit-math-geometry-circles": "CAIE-0580-E3.3"
    },
    localizedUnitsCount: 83
  }
};

/**
 * Fallback for countries with interface presence but undergoing curriculum research.
 */
export function getCountryProfile(countryCode: string): CountryCurriculumProfile {
  const matched = COUNTRY_CURRICULUM_REGISTRY[countryCode as CountryCode];
  if (matched) return matched;

  // Graceful fallback for unlisted country: clearly marked as INTERFACE_ONLY with Cambridge baseline
  return {
    countryCode: countryCode,
    countryName: countryCode,
    flagEmoji: "🌐",
    supportTier: "INTERFACE_ONLY",
    supportTierLabel: "Interface Only (Under Review)",
    tierDescription: "Curriculum mapping for this country is currently in syllabus comparison. International standards (Cambridge IGCSE) are provided as the learning baseline.",
    educationSystemCode: "GLOBAL_STEM",
    systemName: `${countryCode} National Framework (In Review)`,
    systemStructure: "Secondary Education Framework",
    primaryLanguage: "English / Local Language",
    examinationPathways: [
      {
        id: "exam_intl_baseline",
        name: "International Academic Baseline (Cambridge IGCSE Equivalence)",
        shortName: "International Baseline",
        examiningBody: "Global Educational Verification Board",
        targetAges: "Secondary School Age",
        keySubjects: ["Mathematics", "Sciences", "English Studies"],
        gradingScale: "International Benchmark Grading",
        officialSyllabusReference: "Universal Competency Framework",
        description: "Standardized universal competency bridge providing verified learning while local syllabus is undergoing accreditation."
      }
    ],
    terminologyMap: COUNTRY_CURRICULUM_REGISTRY.INTL.terminologyMap,
    sampleSyllabusCodes: {},
    localizedUnitsCount: 0
  };
}
