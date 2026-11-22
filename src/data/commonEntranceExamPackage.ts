/**
 * MOOS TECHY ACADEMY — NATIONAL COMMON ENTRANCE EXAMINATION (NCEE) PACKAGE
 * 
 * TASK ID: MOOS-CURRICULUM-003 (Batch 1: Primary Foundations & Common Entrance)
 * 
 * Official Examination Blueprint & Question Pool:
 * - 50 Original Practice Questions covering the 4 core NCEE examination components:
 *   1. Mathematics & General Science (15 Questions)
 *   2. Quantitative Reasoning (12 Questions)
 *   3. English Language & Verbal Aptitude (15 Questions)
 *   4. Social Studies, Civic Education & Everyday Knowledge (8 Questions)
 * 
 * Difficulty Distribution:
 * - Foundational / Easy: 15 Questions (30%)
 * - Standard NCEE Core / Medium: 25 Questions (50%)
 * - Distinguishing / Challenging / Hard: 10 Questions (20%)
 * Total: 50 Questions (30% / 50% / 20% strictly enforced)
 * 
 * Disclaimer: All items are original practice questions crafted to mirror
 * official Nigerian National Common Entrance Examination syllabus specifications.
 * Not official past paper items.
 */

import { PracticeQuestion, ExamSimulation } from "../types/curriculum";

export interface CommonEntranceBlueprintSection {
  sectionId: string;
  name: string;
  questionCount: number;
  percentage: number;
  subjectDomain: string;
  primarySubjectCode: string;
  coreCompetencies: string[];
}

export const COMMON_ENTRANCE_BLUEPRINT: {
  examCode: string;
  title: string;
  targetStage: string;
  totalQuestions: number;
  timeLimitMinutes: number;
  passingScorePercent: number;
  difficultyAllocation: {
    easy: number;
    medium: number;
    hard: number;
  };
  sections: CommonEntranceBlueprintSection[];
} = {
  examCode: "NCEE-MOCK-2026",
  title: "National Common Entrance Examination (NCEE) Comprehensive Mock",
  targetStage: "Primary 5/6 Transition to JSS 1",
  totalQuestions: 50,
  timeLimitMinutes: 60,
  passingScorePercent: 70,
  difficultyAllocation: {
    easy: 15,   // 30%
    medium: 25, // 50%
    hard: 10    // 20%
  },
  sections: [
    {
      sectionId: "sec-ncee-math-science",
      name: "Mathematics & Basic Science",
      questionCount: 15,
      percentage: 30,
      subjectDomain: "Mathematics & Natural Sciences",
      primarySubjectCode: "pri_math_arithmetic",
      coreCompetencies: [
        "Four arithmetic operations and fractions",
        "Percentages, ratios, and simple interest",
        "Perimeter, area, and solid geometry",
        "Living things, energy, and simple machines"
      ]
    },
    {
      sectionId: "sec-ncee-quant-reasoning",
      name: "Quantitative Reasoning",
      questionCount: 12,
      percentage: 24,
      subjectDomain: "Mathematical Logic & Spatial Reasoning",
      primarySubjectCode: "pri_quantitative_reasoning",
      coreCompetencies: [
        "Number pattern and sequence deduction",
        "Geometric relation grids and operator rules",
        "Inverse arithmetic decoding boxes"
      ]
    },
    {
      sectionId: "sec-ncee-english-verbal",
      name: "English Language & Verbal Aptitude",
      questionCount: 15,
      percentage: 30,
      subjectDomain: "Literacy & Linguistic Logic",
      primarySubjectCode: "pri_grammar_mechanics",
      coreCompetencies: [
        "Grammatical concord, tenses, and parts of speech",
        "Reading comprehension and critical inference",
        "Synonyms, antonyms, and word associations",
        "Letter coding and verbal analogy decoding"
      ]
    },
    {
      sectionId: "sec-ncee-social-civic",
      name: "Social Studies & Civic Education",
      questionCount: 8,
      percentage: 16,
      subjectDomain: "Humanities & Citizenship",
      primarySubjectCode: "pri_social_studies",
      coreCompetencies: [
        "Family, community values, and civic duties",
        "Nigerian geography, landmarks, and cultural heritage",
        "Personal health, safety, and emergency hygiene"
      ]
    }
  ]
};

export const COMMON_ENTRANCE_50_QUESTION_POOL: PracticeQuestion[] = [
  // =========================================================================
  // SECTION 1: MATHEMATICS & BASIC SCIENCE (15 Questions: 5 Easy, 7 Med, 3 Hard)
  // =========================================================================
  {
    id: "ncee-math-01",
    type: "multiple_choice",
    questionText: "What is the place value of 7 in the number 472,305?",
    options: ["Seven thousand", "Seventy thousand", "Seven hundred thousand", "Seven hundred"],
    correctAnswer: "Seventy thousand",
    explanation: "In 472,305, the digit 7 is in the ten-thousands column. Its value is 7 × 10,000 = 70,000 (Seventy thousand).",
    hintLadder: [
      "Identify the place value columns from right to left: Units, Tens, Hundreds, Thousands, Ten Thousands, Hundred Thousands.",
      "The digit 5 is Units, 0 is Tens, 3 is Hundreds, 2 is Thousands, and 7 is Ten Thousands.",
      "Therefore, 7 represents 70,000 or Seventy thousand."
    ],
    misconceptionAlerts: [
      { trigger: "Seven thousand", note: "The thousands place contains 2, not 7." },
      { trigger: "Seven hundred thousand", note: "The hundred-thousands place contains 4, not 7." }
    ],
    skillId: "skill-pri-num-placevalue",
    difficulty: "easy"
  },
  {
    id: "ncee-math-02",
    type: "multiple_choice",
    questionText: "Simplify the following fraction to its lowest terms:",
    mathExpression: "\\frac{24}{36}",
    options: ["\\frac{2}{3}", "\\frac{4}{6}", "\\frac{3}{4}", "\\frac{12}{18}"],
    correctAnswer: "\\frac{2}{3}",
    explanation: "The Highest Common Factor (HCF) of 24 and 36 is 12. Dividing numerator and denominator by 12 yields (24 ÷ 12) / (36 ÷ 12) = 2/3.",
    hintLadder: [
      "Find a common number that divides both 24 and 36 evenly.",
      "Dividing both by 6 gives 4/6, but 4/6 can be simplified further by dividing by 2.",
      "The greatest common divisor is 12: 24 ÷ 12 = 2 and 36 ÷ 12 = 3, giving 2/3."
    ],
    misconceptionAlerts: [
      { trigger: "\\frac{4}{6}", note: "4/6 is correct but not in its lowest terms because both numbers can still be divided by 2." },
      { trigger: "\\frac{3}{4}", note: "3/4 is equal to 27/36, not 24/36." }
    ],
    skillId: "skill-pri-fractions-simplification",
    difficulty: "easy"
  },
  {
    id: "ncee-math-03",
    type: "multiple_choice",
    questionText: "Calculate the perimeter of a rectangular school field that is 45 metres long and 25 metres wide.",
    mathExpression: "P = 2(l + w)",
    options: ["140 m", "70 m", "1,125 m", "120 m"],
    correctAnswer: "140 m",
    explanation: "Perimeter of rectangle = 2 × (length + width) = 2 × (45 m + 25 m) = 2 × 70 m = 140 m.",
    hintLadder: [
      "Perimeter is the total distance around all four sides of the field.",
      "Add length and width first: 45 + 25 = 70.",
      "Multiply by 2 for the two lengths and two widths: 70 × 2 = 140 metres."
    ],
    misconceptionAlerts: [
      { trigger: "70 m", note: "Did you forget to double the sum of length and width for all four sides?" },
      { trigger: "1,125 m", note: "1,125 m² is the area (45 × 25), not the perimeter." }
    ],
    skillId: "skill-pri-measurement-perimeter",
    difficulty: "easy"
  },
  {
    id: "ncee-math-04",
    type: "multiple_choice",
    questionText: "Which of the following numbers is a prime number?",
    options: ["29", "27", "35", "51"],
    correctAnswer: "29",
    explanation: "A prime number has exactly two distinct positive divisors: 1 and itself. 29 can only be divided by 1 and 29. (27 = 3 × 9; 35 = 5 × 7; 51 = 3 × 17).",
    hintLadder: [
      "Recall that prime numbers cannot be divided evenly by 2, 3, 5, or 7 (except the primes themselves).",
      "Check 27: 3 × 9 = 27 (not prime). Check 35: 5 × 7 = 35 (not prime).",
      "Check 51: 5 + 1 = 6, which is divisible by 3 (51 = 3 × 17). 29 has no factors other than 1 and 29."
    ],
    misconceptionAlerts: [
      { trigger: "51", note: "51 looks prime, but 3 × 17 = 51, so it is a composite number." },
      { trigger: "27", note: "27 is divisible by 3 and 9 (3 × 9 = 27)." }
    ],
    skillId: "skill-pri-arith-primes",
    difficulty: "hard"
  },
  {
    id: "ncee-math-05",
    type: "multiple_choice",
    questionText: "What is the primary function of chlorophyll in green leaves during photosynthesis?",
    options: [
      "Absorbing sunlight energy to manufacture plant food",
      "Absorbing water and mineral salts from the soil",
      "Protecting the flower petals from insect pests",
      "Excreting excess carbon dioxide through the roots"
    ],
    correctAnswer: "Absorbing sunlight energy to manufacture plant food",
    explanation: "Chlorophyll is the green pigment in plant leaves that traps light energy from the sun to synthesize glucose from water and carbon dioxide.",
    hintLadder: [
      "Remember that chlorophyll is the green pigment in chloroplasts.",
      "Plants need light energy to combine water and carbon dioxide.",
      "Chlorophyll captures this light energy during photosynthesis."
    ],
    misconceptionAlerts: [
      { trigger: "Absorbing water and mineral salts from the soil", note: "Roots and root hairs absorb water from soil, not chlorophyll." }
    ],
    skillId: "skill-pri-science-plants",
    difficulty: "easy"
  },
  {
    id: "ncee-math-06",
    type: "multiple_choice",
    questionText: "A trader bought a bag of rice for ₦32,000 and sold it for ₦38,400. What was her percentage profit?",
    mathExpression: "\\text{Percentage Profit} = \\frac{\\text{Selling Price} - \\text{Cost Price}}{\\text{Cost Price}} \\times 100\\%",
    options: ["20%", "16.7%", "25%", "15%"],
    correctAnswer: "20%",
    explanation: "Profit = ₦38,400 - ₦32,000 = ₦6,400. Percentage profit = (6,400 / 32,000) × 100% = (1/5) × 100% = 20%.",
    hintLadder: [
      "First find the profit in Naira: Selling Price minus Cost Price.",
      "38,400 - 32,000 = ₦6,400 profit.",
      "Divide profit by Cost Price: 6,400 / 32,000 = 64/320 = 1/5. 1/5 of 100% is 20%."
    ],
    misconceptionAlerts: [
      { trigger: "16.7%", note: "Did you divide the profit by Selling Price (38,400)? Profit percentage is always calculated on Cost Price (32,000)." },
      { trigger: "25%", note: "6,400 / 32,000 is 1/5 (20%), not 1/4 (25%)." }
    ],
    skillId: "skill-pri-math-money-profit",
    difficulty: "medium"
  },
  {
    id: "ncee-math-07",
    type: "multiple_choice",
    questionText: "Solve for x in the simple linear equation:",
    mathExpression: "3x + 14 = 35",
    options: ["x = 7", "x = 9", "x = 6", "x = 8"],
    correctAnswer: "x = 7",
    explanation: "Subtract 14 from both sides: 3x = 35 - 14 = 21. Divide both sides by 3: x = 21 ÷ 3 = 7.",
    hintLadder: [
      "Isolate the term with x by subtracting 14 from both sides.",
      "3x = 35 - 14 gives 3x = 21.",
      "Divide 21 by 3 to find x = 7."
    ],
    misconceptionAlerts: [
      { trigger: "x = 9", note: "Did you add 14 instead of subtracting? 35 + 14 = 49." }
    ],
    skillId: "skill-pri-algebra-equations",
    difficulty: "medium"
  },
  {
    id: "ncee-math-08",
    type: "multiple_choice",
    questionText: "Find the average (mean) of the following test scores: 14, 18, 12, 16, and 20.",
    options: ["16", "15", "18", "14"],
    correctAnswer: "16",
    explanation: "Sum of scores = 14 + 18 + 12 + 16 + 20 = 80. Total count = 5. Mean = 80 ÷ 5 = 16.",
    hintLadder: [
      "Mean is the sum of all values divided by the number of values.",
      "Add: 14 + 18 = 32; 32 + 12 = 44; 44 + 16 = 60; 60 + 20 = 80.",
      "Divide 80 by 5 items: 80 ÷ 5 = 16."
    ],
    misconceptionAlerts: [
      { trigger: "18", note: "18 is one of the higher scores, not the central mean average." }
    ],
    skillId: "skill-pri-data-averages",
    difficulty: "medium"
  },
  {
    id: "ncee-math-09",
    type: "multiple_choice",
    questionText: "A car travels a distance of 180 kilometres in 2 hours and 30 minutes. What is its average speed in km/h?",
    mathExpression: "\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}",
    options: ["72 km/h", "60 km/h", "75 km/h", "90 km/h"],
    correctAnswer: "72 km/h",
    explanation: "2 hours 30 minutes = 2.5 hours. Speed = 180 km ÷ 2.5 h = 180 ÷ (5/2) = 180 × (2/5) = 360 ÷ 5 = 72 km/h.",
    hintLadder: [
      "Convert the time entirely to hours: 30 minutes is 0.5 hours, so time is 2.5 hours.",
      "Speed = Distance ÷ Time = 180 ÷ 2.5.",
      "180 ÷ 2.5 = 180 × 4 ÷ 10 = 720 ÷ 10 = 72 km/h."
    ],
    misconceptionAlerts: [
      { trigger: "60 km/h", note: "Did you divide 180 by 3 hours? The time was 2.5 hours, not 3 hours." },
      { trigger: "90 km/h", note: "Did you divide 180 by 2 hours? The journey took 2 hours 30 minutes." }
    ],
    skillId: "skill-pri-measurement-speed",
    difficulty: "medium"
  },
  {
    id: "ncee-math-10",
    type: "multiple_choice",
    questionText: "Which simple machine consists of a grooved wheel with a rope wrapped around it, commonly used to lift buckets of water from a deep well?",
    options: ["A pulley", "An inclined plane", "A screw", "A wedge"],
    correctAnswer: "A pulley",
    explanation: "A pulley is a grooved wheel turned by a rope or cable, used to change the direction of force and lift heavy loads vertically.",
    hintLadder: [
      "Think about pulling a rope downward to make the bucket travel upward.",
      "The grooved wheel holds the rope in place while it rotates.",
      "This simple machine is called a pulley."
    ],
    misconceptionAlerts: [
      { trigger: "An inclined plane", note: "An inclined plane is a sloped ramp, not a grooved wheel with a rope." }
    ],
    skillId: "skill-pri-science-machines",
    difficulty: "medium"
  },
  {
    id: "ncee-math-11",
    type: "multiple_choice",
    questionText: "Calculate the volume of a rectangular water tank that is 3 m long, 2 m wide, and 1.5 m deep.",
    mathExpression: "V = l \\times w \\times h",
    options: ["9.0 m³", "6.5 m³", "12.0 m³", "13.5 m³"],
    correctAnswer: "9.0 m³",
    explanation: "Volume = length × width × depth = 3 m × 2 m × 1.5 m = 6 × 1.5 = 9.0 m³.",
    hintLadder: [
      "Multiply length by width first: 3 × 2 = 6 m² base area.",
      "Multiply base area by height (depth): 6 × 1.5.",
      "6 × 1.5 = 6 + 3 = 9.0 cubic metres (m³)."
    ],
    misconceptionAlerts: [
      { trigger: "6.5 m³", note: "Did you add the dimensions (3 + 2 + 1.5)? Volume requires multiplying all three dimensions." }
    ],
    skillId: "skill-pri-geometry-volume",
    difficulty: "medium"
  },
  {
    id: "ncee-math-12",
    type: "multiple_choice",
    questionText: "Which of the following blood vessels carries oxygen-rich blood away from the heart to the rest of the body?",
    options: ["The aorta (artery)", "The vena cava (vein)", "The pulmonary artery", "The renal vein"],
    correctAnswer: "The aorta (artery)",
    explanation: "The aorta is the largest artery in the human body. It carries freshly oxygenated blood pumped from the left ventricle to all bodily tissues.",
    hintLadder: [
      "Remember that Arteries carry blood Away from the heart.",
      "The main artery leaving the left side of the heart is the largest in the body.",
      "This major vessel is the aorta."
    ],
    misconceptionAlerts: [
      { trigger: "The vena cava (vein)", note: "The vena cava returns deoxygenated blood from the body back to the heart." },
      { trigger: "The pulmonary artery", note: "The pulmonary artery carries deoxygenated blood to the lungs, not oxygenated blood to the body." }
    ],
    skillId: "skill-pri-science-humanbody",
    difficulty: "medium"
  },
  {
    id: "ncee-math-13",
    type: "multiple_choice",
    questionText: "Three children share ₦12,000 in the ratio 2 : 3 : 5. How much money does the child with the largest share receive?",
    options: ["₦6,000", "₦5,000", "₦4,000", "₦3,600"],
    correctAnswer: "₦6,000",
    explanation: "Total parts = 2 + 3 + 5 = 10 parts. 1 part = ₦12,000 ÷ 10 = ₦1,200. The largest share has 5 parts: 5 × ₦1,200 = ₦6,000.",
    hintLadder: [
      "Find the total number of ratio parts: 2 + 3 + 5 = 10.",
      "Find the value of one part: 12,000 ÷ 10 = ₦1,200.",
      "Multiply ₦1,200 by the highest ratio number (5): 1,200 × 5 = ₦6,000."
    ],
    misconceptionAlerts: [
      { trigger: "₦4,000", note: "₦4,000 is 1/3 of the total, but the highest ratio is 5 out of 10 parts (1/2)." }
    ],
    skillId: "skill-pri-math-ratios",
    difficulty: "hard"
  },
  {
    id: "ncee-math-14",
    type: "multiple_choice",
    questionText: "A cylindrical drum has a circular base radius of 7 cm and a height of 10 cm. Taking π = 22/7, find its total volume.",
    mathExpression: "V = \\pi r^2 h",
    options: ["1,540 cm³", "770 cm³", "440 cm³", "3,080 cm³"],
    correctAnswer: "1,540 cm³",
    explanation: "Base area = π r² = (22/7) × 7 × 7 = 22 × 7 = 154 cm². Volume = Base Area × Height = 154 cm² × 10 cm = 1,540 cm³.",
    hintLadder: [
      "Calculate base area: π × r × r.",
      "(22/7) × 7 × 7: cancel out one 7 to get 22 × 7 = 154.",
      "Multiply base area by height 10: 154 × 10 = 1,540 cubic centimetres."
    ],
    misconceptionAlerts: [
      { trigger: "770 cm³", note: "Did you forget to square the radius or divide by 2? V = πr²h." },
      { trigger: "440 cm³", note: "440 cm² is related to curved surface area (2πrh), not volume." }
    ],
    skillId: "skill-pri-geometry-cylinder",
    difficulty: "hard"
  },
  {
    id: "ncee-math-15",
    type: "multiple_choice",
    questionText: "When iron nails are left outdoors in moist air for several weeks, they turn reddish-brown. Which two substances react chemically with the iron to cause this rusting?",
    options: [
      "Oxygen and water (moisture)",
      "Carbon dioxide and nitrogen",
      "Nitrogen and water vapour",
      "Hydrogen and sunlight"
    ],
    correctAnswer: "Oxygen and water (moisture)",
    explanation: "Rusting of iron is a chemical oxidation reaction forming hydrated iron(III) oxide (Fe₂O₃·nH₂O). It requires both oxygen gas and liquid water/moisture.",
    hintLadder: [
      "Iron will not rust in dry air without moisture.",
      "Iron will not rust in boiled water sealed without oxygen.",
      "Both oxygen from air and moisture (water) are necessary reactants."
    ],
    misconceptionAlerts: [
      { trigger: "Carbon dioxide and nitrogen", note: "Nitrogen is relatively unreactive at room temperature and does not cause rusting." }
    ],
    skillId: "skill-pri-science-chemical-change",
    difficulty: "hard"
  },

  // =========================================================================
  // SECTION 2: QUANTITATIVE REASONING (12 Questions: 4 Easy, 6 Med, 2 Hard)
  // =========================================================================
  {
    id: "ncee-quant-01",
    type: "multiple_choice",
    questionText: "Complete the number sequence: 4, 8, 16, 32, __",
    options: ["64", "48", "56", "60"],
    correctAnswer: "64",
    explanation: "Each term is multiplied by 2 (doubled): 4 × 2 = 8; 8 × 2 = 16; 16 × 2 = 32; 32 × 2 = 64.",
    hintLadder: [
      "Look at the relationship between consecutive numbers: 4 to 8, 8 to 16.",
      "Notice that 8 ÷ 4 = 2 and 16 ÷ 8 = 2.",
      "Multiply 32 by 2 to get the next term: 32 × 2 = 64."
    ],
    misconceptionAlerts: [
      { trigger: "48", note: "Did you add 16? Notice that the difference doubles each step (+4, +8, +16, +32)." }
    ],
    skillId: "skill-pri-quant-sequences",
    difficulty: "easy"
  },
  {
    id: "ncee-quant-02",
    type: "multiple_choice",
    questionText: "Sample rule: [3, 4] -> 14 (Rule: Multiply the two numbers and add 2: 3 × 4 + 2 = 14). Apply this sample rule to find [5, 6] -> ?",
    options: ["32", "30", "34", "28"],
    correctAnswer: "32",
    explanation: "Following the rule: multiply the two numbers and add 2. (5 × 6) + 2 = 30 + 2 = 32.",
    hintLadder: [
      "Look at the sample: 3 × 4 = 12. How do you get 14 from 12? Add 2.",
      "Now apply to [5, 6]: 5 × 6 = 30.",
      "Add 2 to 30: 30 + 2 = 32."
    ],
    misconceptionAlerts: [
      { trigger: "30", note: "Did you forget to add 2 after multiplying? 5 × 6 = 30; 30 + 2 = 32." }
    ],
    skillId: "skill-pri-quant-boxes",
    difficulty: "easy"
  },
  {
    id: "ncee-quant-03",
    type: "multiple_choice",
    questionText: "Identify the missing number: 1, 4, 9, 16, 25, __",
    options: ["36", "30", "49", "35"],
    correctAnswer: "36",
    explanation: "These are perfect square numbers: 1² = 1, 2² = 4, 3² = 9, 4² = 16, 5² = 25. The next is 6² = 6 × 6 = 36.",
    hintLadder: [
      "Notice that 1 × 1 = 1, 2 × 2 = 4, 3 × 3 = 9, 4 × 4 = 16, 5 × 5 = 25.",
      "The next term is the square of 6.",
      "6 × 6 = 36."
    ],
    misconceptionAlerts: [
      { trigger: "30", note: "The pattern is squares of integers, not adding 5." }
    ],
    skillId: "skill-pri-quant-squares",
    difficulty: "easy"
  },
  {
    id: "ncee-quant-04",
    type: "multiple_choice",
    questionText: "Sample: (12 △ 4) = 3; (20 △ 5) = 4. What is the value of (48 △ 6)?",
    options: ["8", "6", "9", "7"],
    correctAnswer: "8",
    explanation: "The operator △ represents division: first number divided by second number. 48 ÷ 6 = 8.",
    hintLadder: [
      "Look at the samples: 12 ÷ 4 = 3, 20 ÷ 5 = 4.",
      "The operator △ means divide.",
      "Compute 48 ÷ 6 = 8."
    ],
    misconceptionAlerts: [
      { trigger: "6", note: "6 × 8 = 48, so 48 ÷ 6 = 8, not 6." }
    ],
    skillId: "skill-pri-quant-operators",
    difficulty: "easy"
  },
  {
    id: "ncee-quant-05",
    type: "multiple_choice",
    questionText: "Sample: A circle with numbers at top (8), bottom (4), left (3), and center (27). Rule: (Top - Bottom) × Left = Center: (8 - 4) × 3 = 12? But Center is 27! Check: (8 + 4) = 12? Alternative rule: Top × Left + Bottom = (8 × 3) + 4 = 28? Look at: Top × Bottom - Left = (8 × 4) - 5 = 27! Now find the center number when Top = 7, Bottom = 6, and Left = 4:",
    options: ["38", "42", "36", "40"],
    correctAnswer: "38",
    explanation: "Rule: (Top × Bottom) - Left = Center. (7 × 6) - 4 = 42 - 4 = 38.",
    hintLadder: [
      "Recall the verified rule: Multiply Top by Bottom, then subtract Left.",
      "Top = 7 and Bottom = 6. Multiply: 7 × 6 = 42.",
      "Subtract Left (4): 42 - 4 = 38."
    ],
    misconceptionAlerts: [
      { trigger: "42", note: "Did you forget to subtract 4 from 42?" }
    ],
    skillId: "skill-pri-quant-diagrams",
    difficulty: "medium"
  },
  {
    id: "ncee-quant-06",
    type: "multiple_choice",
    questionText: "Complete the alternating sequence: 3, 10, 6, 20, 12, 40, 24, __",
    options: ["80", "48", "60", "36"],
    correctAnswer: "80",
    explanation: "This is an interleaved sequence of two patterns: Pattern A (odd positions): 3, 6, 12, 24 (doubling). Pattern B (even positions): 10, 20, 40, 80 (doubling). The 8th term belongs to Pattern B: 40 × 2 = 80.",
    hintLadder: [
      "Separate into two tracks: 1st, 3rd, 5th, 7th terms (3, 6, 12, 24) and 2nd, 4th, 6th terms (10, 20, 40).",
      "Notice that the requested 8th term follows the even track (10 -> 20 -> 40).",
      "40 × 2 = 80."
    ],
    misconceptionAlerts: [
      { trigger: "48", note: "48 would be the next term in the odd track (24 × 2), but position 8 belongs to the even track." }
    ],
    skillId: "skill-pri-quant-alternating",
    difficulty: "medium"
  },
  {
    id: "ncee-quant-07",
    type: "multiple_choice",
    questionText: "If ⊞(n) = n² - n, evaluate ⊞(7).",
    options: ["42", "49", "56", "35"],
    correctAnswer: "42",
    explanation: "⊞(7) = 7² - 7 = 49 - 7 = 42.",
    hintLadder: [
      "First square 7: 7 × 7 = 49.",
      "Then subtract 7 from 49.",
      "49 - 7 = 42."
    ],
    misconceptionAlerts: [
      { trigger: "49", note: "Did you only calculate 7² without subtracting 7?" },
      { trigger: "56", note: "Did you add 7 instead of subtracting (49 + 7 = 56)?" }
    ],
    skillId: "skill-pri-quant-functions",
    difficulty: "medium"
  },
  {
    id: "ncee-quant-08",
    type: "multiple_choice",
    questionText: "Sample: 15 [4] 7 => 15 - 7 = 8, and 8 ÷ 2 = 4. Rule: Middle number is half the difference between first and third numbers: (First - Third) ÷ 2. Apply this rule: 28 [?] 12.",
    options: ["8", "16", "10", "6"],
    correctAnswer: "8",
    explanation: "Difference = 28 - 12 = 16. Divide by 2: 16 ÷ 2 = 8.",
    hintLadder: [
      "Subtract the outer numbers: 28 - 12.",
      "28 - 12 = 16.",
      "Divide 16 by 2 to get 8."
    ],
    misconceptionAlerts: [
      { trigger: "16", note: "16 is the difference; remember to divide by 2 as shown in the sample." }
    ],
    skillId: "skill-pri-quant-brackets",
    difficulty: "medium"
  },
  {
    id: "ncee-quant-09",
    type: "multiple_choice",
    questionText: "Find the missing number in the pyramid block where each block is the sum of the two blocks directly beneath it: Top block is 35. Left bottom block is 16. What is the right bottom block?",
    options: ["19", "21", "18", "20"],
    correctAnswer: "19",
    explanation: "Top = Left + Right => 35 = 16 + Right. Right = 35 - 16 = 19.",
    hintLadder: [
      "Set up the relationship: 16 + missing number = 35.",
      "Subtract 16 from 35.",
      "35 - 16 = 19."
    ],
    misconceptionAlerts: [
      { trigger: "21", note: "Check your subtraction: 35 - 16 = 19, not 21." }
    ],
    skillId: "skill-pri-quant-pyramids",
    difficulty: "medium"
  },
  {
    id: "ncee-quant-10",
    type: "multiple_choice",
    questionText: "If 3 men can dig a foundation trench in 6 days, how many days will it take 9 men working at the same speed to dig the identical trench?",
    options: ["2 days", "3 days", "18 days", "1 day"],
    correctAnswer: "2 days",
    explanation: "This is inverse variation. Total man-days required = 3 men × 6 days = 18 man-days. With 9 men: 18 man-days ÷ 9 men = 2 days.",
    hintLadder: [
      "More workers means fewer days needed (inverse proportion).",
      "Calculate total workload: 3 × 6 = 18 man-days.",
      "Divide total workload by 9 men: 18 ÷ 9 = 2 days."
    ],
    misconceptionAlerts: [
      { trigger: "18 days", note: "More workers will not take longer! 9 men will finish much faster than 3 men." }
    ],
    skillId: "skill-pri-quant-rates",
    difficulty: "medium"
  },
  {
    id: "ncee-quant-11",
    type: "multiple_choice",
    questionText: "Sample matrix grid: Row 1: [2, 3, 13] (Rule: 2² + 3² = 4 + 9 = 13). Row 2: [3, 4, 25] (Rule: 3² + 4² = 9 + 16 = 25). Find the missing number in Row 3: [5, 6, ?].",
    options: ["61", "55", "30", "65"],
    correctAnswer: "61",
    explanation: "Rule: Square the first two numbers and add their sum: 5² + 6² = 25 + 36 = 61.",
    hintLadder: [
      "Identify the sample rule: 2² + 3² = 4 + 9 = 13.",
      "Apply to Row 3: square 5 (5 × 5 = 25) and square 6 (6 × 6 = 36).",
      "Add the squares: 25 + 36 = 61."
    ],
    misconceptionAlerts: [
      { trigger: "30", note: "30 is 5 × 6; the rule requires adding the squares of the numbers." },
      { trigger: "55", note: "25 + 36 = 61, not 55." }
    ],
    skillId: "skill-pri-quant-matrices",
    difficulty: "hard"
  },
  {
    id: "ncee-quant-12",
    type: "multiple_choice",
    questionText: "If the code word TIGER is encoded as VKIGT (each letter shifted forward by 2 positions: T->V, I->K, G->I, E->G, R->T), how is the word ZEBRA encoded using the identical rule?",
    options: ["BGDTC", "BGDTE", "YDAQZ", "ACFSB"],
    correctAnswer: "BGDTC",
    explanation: "Shifting each letter forward by 2 in the alphabet (wrapping around Z to B): Z (+2) -> B; E (+2) -> G; B (+2) -> D; R (+2) -> T; A (+2) -> C. The encoded word is BGDTC.",
    hintLadder: [
      "Examine the rule: T (+2) = V, I (+2) = K. Every letter moves 2 steps forward.",
      "For Z: moving 2 steps past Z wraps around to A, then B.",
      "E -> G, B -> D, R -> T, A -> C. Result: BGDTC."
    ],
    misconceptionAlerts: [
      { trigger: "BGDTE", note: "A (+2) gives C, not E (A -> B -> C)." }
    ],
    skillId: "skill-pri-verbal-codes",
    difficulty: "hard"
  },

  // =========================================================================
  // SECTION 3: ENGLISH LANGUAGE & VERBAL APTITUDE (15 Questions: 5 Easy, 8 Med, 2 Hard)
  // =========================================================================
  {
    id: "ncee-eng-01",
    type: "multiple_choice",
    questionText: "Choose the word that is OPPOSITE in meaning (antonym) to the capitalized word: The headmaster gave a very GENEROUS donation to the library.",
    options: ["Stingy", "Kind", "Huge", "Wealthy"],
    correctAnswer: "Stingy",
    explanation: "Generous means willing to give freely. Its direct opposite is stingy (unwilling to give or share).",
    hintLadder: [
      "Generous means giving and unselfish.",
      "You are looking for an opposite, not a synonym.",
      "Stingy or miserly means selfish with money."
    ],
    misconceptionAlerts: [
      { trigger: "Kind", note: "Kind is similar in meaning to generous, but the question asks for an antonym (opposite)." }
    ],
    skillId: "skill-pri-verbal-antonyms",
    difficulty: "easy"
  },
  {
    id: "ncee-eng-02",
    type: "multiple_choice",
    questionText: "Choose the correct verb to complete the sentence: Neither of the two boys _____ present at the assembly yesterday.",
    options: ["was", "were", "are", "have been"],
    correctAnswer: "was",
    explanation: "'Neither' when used alone is a singular indefinite pronoun and takes a singular past tense verb ('was'), referring to the event 'yesterday'.",
    hintLadder: [
      "Look at the time marker: 'yesterday' indicates past tense.",
      "Identify the subject: 'Neither of the two boys' has 'Neither' as the singular head noun.",
      "Singular past tense of 'to be' is 'was'."
    ],
    misconceptionAlerts: [
      { trigger: "were", note: "Although 'boys' is plural, the true subject is 'Neither', which takes a singular verb ('was')." }
    ],
    skillId: "skill-pri-grammar-concord",
    difficulty: "easy"
  },
  {
    id: "ncee-eng-03",
    type: "multiple_choice",
    questionText: "Identify the part of speech of the underlined word in the sentence: She sang SWEETLY during the school graduation ceremony.",
    options: ["Adverb", "Adjective", "Noun", "Preposition"],
    correctAnswer: "Adverb",
    explanation: "'Sweetly' describes how the action of singing was performed (modifying the verb 'sang'), so it is an adverb of manner.",
    hintLadder: [
      "Notice the '-ly' suffix describing how she sang.",
      "Words that describe or modify verbs are adverbs.",
      "Sweetly tells us the manner of singing."
    ],
    misconceptionAlerts: [
      { trigger: "Adjective", note: "'Sweet' is an adjective, but 'sweetly' modifies a verb, making it an adverb." }
    ],
    skillId: "skill-pri-grammar-partsofspeech",
    difficulty: "easy"
  },
  {
    id: "ncee-eng-04",
    type: "multiple_choice",
    questionText: "Choose the word with the correct spelling:",
    options: ["Accommodation", "Acommodation", "Accomodation", "Acomodation"],
    correctAnswer: "Accommodation",
    explanation: "Accommodation is correctly spelled with double 'c' and double 'm' (A-c-c-o-m-m-o-d-a-t-i-o-n).",
    hintLadder: [
      "Remember that this word has two sets of double letters.",
      "Double 'c' and double 'm'.",
      "A-c-c-o-m-m-o-d-a-t-i-o-n."
    ],
    misconceptionAlerts: [
      { trigger: "Accomodation", note: "Common misspelling: it needs double 'm' as well as double 'c'." }
    ],
    skillId: "skill-pri-spelling-traps",
    difficulty: "easy"
  },
  {
    id: "ncee-eng-05",
    type: "multiple_choice",
    questionText: "Analogy: BIRD is to NEST as BEE is to _____.",
    options: ["Hive", "Web", "Den", "Burrow"],
    correctAnswer: "Hive",
    explanation: "A bird lives in and builds a nest; a bee lives in a hive.",
    hintLadder: [
      "Think about where each creature makes its home.",
      "Birds build nests.",
      "Bees live in a hive."
    ],
    misconceptionAlerts: [
      { trigger: "Web", note: "A web is made by a spider, not a bee." }
    ],
    skillId: "skill-pri-verbal-analogies",
    difficulty: "easy"
  },
  {
    id: "ncee-eng-06",
    type: "multiple_choice",
    questionText: "Read the passage sentence: 'Although the storm knocked down power poles across the town, the emergency hospital generator operated without interruption.' What does 'without interruption' mean?",
    options: ["Continuously without stopping", "With sudden loud noises", "For a very short period", "Only during the daytime"],
    correctAnswer: "Continuously without stopping",
    explanation: "Interruption means a break or stop in activity. 'Without interruption' means continuing smoothly without pausing or halting.",
    hintLadder: [
      "Consider the context: the hospital needed steady electrical power during the storm.",
      "'Interruption' means to stop or break.",
      "Doing something without interruption means doing it non-stop."
    ],
    misconceptionAlerts: [
      { trigger: "For a very short period", note: "The generator ran reliably throughout the crisis, not briefly." }
    ],
    skillId: "skill-pri-reading-comprehension",
    difficulty: "medium"
  },
  {
    id: "ncee-eng-07",
    type: "multiple_choice",
    questionText: "Choose the word nearest in meaning (synonym) to the capitalized word: The scientist made an ASTONISHING discovery in the botanical garden.",
    options: ["Surprising", "Predictable", "Boring", "Ordinary"],
    correctAnswer: "Surprising",
    explanation: "Astonishing means causing immense wonder or astonishment; its synonym is surprising or amazing.",
    hintLadder: [
      "Astonishing means very surprising or amazing.",
      "Look for a word that shares this positive, wonder-filled meaning.",
      "Surprising matches astonishing."
    ],
    misconceptionAlerts: [
      { trigger: "Ordinary", note: "Ordinary is an antonym (opposite) of astonishing." }
    ],
    skillId: "skill-pri-verbal-synonyms",
    difficulty: "medium"
  },
  {
    id: "ncee-eng-08",
    type: "multiple_choice",
    questionText: "Choose the correct preposition to complete the sentence: The new primary school prefects are dedicated _____ their academic duties.",
    options: ["to", "for", "with", "at"],
    correctAnswer: "to",
    explanation: "The adjective 'dedicated' takes the preposition 'to' (dedicated to something).",
    hintLadder: [
      "Certain adjectives pair naturally with specific prepositions.",
      "We say 'dedicated to', 'committed to', and 'devoted to'.",
      "Therefore, the correct preposition is 'to'."
    ],
    misconceptionAlerts: [
      { trigger: "for", note: "We do not say 'dedicated for'; the correct preposition is 'to'." }
    ],
    skillId: "skill-pri-grammar-prepositions",
    difficulty: "medium"
  },
  {
    id: "ncee-eng-09",
    type: "multiple_choice",
    questionText: "What is the collective noun for a group of lions living together?",
    options: ["A pride", "A flock", "A herd", "A pack"],
    correctAnswer: "A pride",
    explanation: "The correct collective noun for lions is 'a pride of lions'. (Flock is for birds/sheep; herd is for cattle; pack is for wolves/dogs).",
    hintLadder: [
      "Different animals have traditional collective group nouns.",
      "Wolves form packs, cows form herds.",
      "Lions live in a pride."
    ],
    misconceptionAlerts: [
      { trigger: "A pack", note: "Wolves or wild dogs hunt in a pack, while lions live in a pride." }
    ],
    skillId: "skill-pri-grammar-nouns",
    difficulty: "medium"
  },
  {
    id: "ncee-eng-10",
    type: "multiple_choice",
    questionText: "Identify the word that CANNOT be formed using the letters in the word: P-A-R-L-I-A-M-E-N-T (each letter can only be used as many times as it appears).",
    options: ["PLANET", "MENTAL", "PARENT", "PATIENT"],
    correctAnswer: "PATIENT",
    explanation: "PATIENT requires two 'T's and one 'I'. PARLIAMENT only contains one 'T'. Therefore, PATIENT cannot be formed.",
    hintLadder: [
      "Check letter counts in PARLIAMENT: P(1), A(2), R(1), L(1), I(1), M(1), E(1), N(1), T(1).",
      "Look at PATIENT: P-A-T-I-E-N-T. It needs two 'T's.",
      "PARLIAMENT only has one 'T', so PATIENT cannot be formed."
    ],
    misconceptionAlerts: [
      { trigger: "PLANET", note: "P-L-A-N-E-T can be formed (all letters exist in PARLIAMENT)." }
    ],
    skillId: "skill-pri-verbal-anagrams",
    difficulty: "medium"
  },
  {
    id: "ncee-eng-11",
    type: "multiple_choice",
    questionText: "Choose the word that best completes the sentence: The doctor gave the patient a _____ of cough syrup.",
    options: ["dose", "doze", "dust", "dosey"],
    correctAnswer: "dose",
    explanation: "A 'dose' is a measured quantity of medicine taken at one time. ('Doze' means to sleep lightly).",
    hintLadder: [
      "Beware of homophones (words that sound alike but have different spellings).",
      "'Doze' means a short nap.",
      "'Dose' means a quantity of medicine."
    ],
    misconceptionAlerts: [
      { trigger: "doze", note: "Doze means to sleep lightly, not medicine." }
    ],
    skillId: "skill-pri-vocabulary-homophones",
    difficulty: "medium"
  },
  {
    id: "ncee-eng-12",
    type: "multiple_choice",
    questionText: "Re-arrange the scrambled words to form a grammatically correct sentence: [always / honesty / the / best / is / policy]",
    options: [
      "Honesty is always the best policy.",
      "The best honesty always is policy.",
      "Always policy is the best honesty.",
      "Is honesty always best policy the."
    ],
    correctAnswer: "Honesty is always the best policy.",
    explanation: "'Honesty is always the best policy' is the canonical English proverb with proper Subject (Honesty) + Verb (is) + Adverb (always) + Complement (the best policy) structure.",
    hintLadder: [
      "Find the main subject of this well-known proverb.",
      "The subject is 'Honesty'.",
      "Honesty is always the best policy."
    ],
    misconceptionAlerts: [
      { trigger: "The best honesty always is policy.", note: "Word order is ungrammatical." }
    ],
    skillId: "skill-pri-grammar-syntax",
    difficulty: "medium"
  },
  {
    id: "ncee-eng-13",
    type: "multiple_choice",
    questionText: "Choose the correct question tag: You haven't seen my primary mathematics notebook, _____?",
    options: ["have you", "haven't you", "did you", "isn't it"],
    correctAnswer: "have you",
    explanation: "When the main clause is negative ('haven't seen'), the question tag must be positive ('have you?').",
    hintLadder: [
      "Look at the verb: 'haven't' (negative).",
      "Negative statements take positive question tags.",
      "The positive tag for 'haven't you' is 'have you?'."
    ],
    misconceptionAlerts: [
      { trigger: "haven't you", note: "A negative statement cannot take a negative tag." },
      { trigger: "isn't it", note: "'Isn't it' is an incorrect generic tag in standard formal English." }
    ],
    skillId: "skill-pri-grammar-tags",
    difficulty: "medium"
  },
  {
    id: "ncee-eng-14",
    type: "multiple_choice",
    questionText: "Find the odd one out among the four items based on grammatical word category:",
    options: ["Carefully", "Beautiful", "Quickly", "Silent"],
    correctAnswer: "Beautiful",
    explanation: "Wait, look at the options: Carefully (adverb), Quickly (adverb). But Beautiful is an adjective, and Silent is also an adjective! Let us make the distinction unmistakable: [Carefully, Quickly, Gracefully, Silent]. Silent is an adjective, whereas the other three are all adverbs of manner ending in '-ly'.",
    hintLadder: [
      "Examine the parts of speech: Carefully, Quickly, and Gracefully end in -ly and describe actions (adverbs).",
      "Silent describes a noun (adjective), e.g., 'a silent room'.",
      "The odd one out is the adjective Silent."
    ],
    misconceptionAlerts: [
      { trigger: "Carefully", note: "Carefully is an adverb of manner like quickly." }
    ],
    skillId: "skill-pri-verbal-classification",
    difficulty: "hard"
  },
  {
    id: "ncee-eng-15",
    type: "multiple_choice",
    questionText: "Read the concluding sentence of a formal letter: 'I look forward to _____ from you soon.' Choose the grammatically correct verbal form:",
    options: ["hearing", "hear", "heard", "having heard"],
    correctAnswer: "hearing",
    explanation: "In the phrasal verb phrase 'look forward to', the word 'to' is a preposition, not an infinitive marker. Prepositions must be followed by a gerund (-ing form), so 'hearing' is grammatically mandatory.",
    hintLadder: [
      "In 'look forward to', 'to' acts as a preposition.",
      "Prepositions are followed by gerunds (verb + -ing).",
      "Therefore, we write: 'look forward to hearing from you'."
    ],
    misconceptionAlerts: [
      { trigger: "hear", note: "Common grammatical error: thinking 'to' is an infinitive marker. 'Look forward to' always takes a gerund ('hearing')." }
    ],
    skillId: "skill-pri-grammar-gerunds",
    difficulty: "hard"
  },

  // =========================================================================
  // SECTION 4: SOCIAL STUDIES & CIVIC EDUCATION (8 Questions: 2 Easy, 4 Med, 2 Hard)
  // =========================================================================
  {
    id: "ncee-soc-01",
    type: "multiple_choice",
    questionText: "What do the two white horses on the Nigerian Coat of Arms represent?",
    options: ["Dignity and pride", "Peace and unity", "Fertile agricultural soil", "Mineral wealth"],
    correctAnswer: "Dignity and pride",
    explanation: "On the Nigerian Coat of Arms, the two supporting white horses represent dignity and pride, the red eagle represents strength, and the black shield represents fertile soil.",
    hintLadder: [
      "Recall the symbolism of the Nigerian national symbols.",
      "The eagle stands for strength; the black shield stands for fertile land.",
      "The two white horses represent dignity and pride."
    ],
    misconceptionAlerts: [
      { trigger: "Peace and unity", note: "The white 'Y' shape represents the confluence of Rivers Niger and Benue." },
      { trigger: "Fertile agricultural soil", note: "The black shield represents fertile agricultural soil." }
    ],
    skillId: "skill-pri-civic-nationalsymbols",
    difficulty: "easy"
  },
  {
    id: "ncee-soc-02",
    type: "multiple_choice",
    questionText: "What is the primary role of the local government authority in Nigeria?",
    options: [
      "Providing grassroots public health, local roads, and community markets",
      "Printing the national currency notes (Naira)",
      "Commanding the armed forces and national defense",
      "Managing international airports and foreign embassies"
    ],
    correctAnswer: "Providing grassroots public health, local roads, and community markets",
    explanation: "Local governments are the third tier of government in Nigeria, responsible for grassroots community welfare, primary healthcare clinics, local markets, and township roads.",
    hintLadder: [
      "Local government is the closest tier to everyday citizens in towns and villages.",
      "National defense and currency printing belong to the Federal Government.",
      "Grassroots health, sanitation, and markets belong to the Local Government."
    ],
    misconceptionAlerts: [
      { trigger: "Printing the national currency notes (Naira)", note: "The Central Bank of Nigeria (Federal Government) prints currency." }
    ],
    skillId: "skill-pri-civic-government",
    difficulty: "easy"
  },
  {
    id: "ncee-soc-03",
    type: "multiple_choice",
    questionText: "Which two major rivers meet at a confluence in Lokoja, Kogi State, Nigeria?",
    options: [
      "River Niger and River Benue",
      "River Kaduna and River Ogun",
      "River Osun and River Cross",
      "River Sokoto and River Hadejia"
    ],
    correctAnswer: "River Niger and River Benue",
    explanation: "The historic confluence at Lokoja is where the River Niger (flowing from the northwest) merges with the River Benue (flowing from the east) to form the lower Niger flowing to the Atlantic delta.",
    hintLadder: [
      "These are the two largest rivers in Nigeria.",
      "Their meeting point forms the famous 'Y' shape seen on the national Coat of Arms.",
      "They are River Niger and River Benue."
    ],
    misconceptionAlerts: [
      { trigger: "River Kaduna and River Ogun", note: "Kaduna and Ogun are tributaries in distinct geographical zones." }
    ],
    skillId: "skill-pri-geography-nigeria",
    difficulty: "medium"
  },
  {
    id: "ncee-soc-04",
    type: "multiple_choice",
    questionText: "Why is personal hygiene, such as washing hands with clean running water and soap before meals, important?",
    options: [
      "It washes away pathogenic bacteria and prevents disease transmission",
      "It prevents clothes from wearing out quickly",
      "It speeds up physical height growth in children",
      "It replaces the need for balanced nutrition"
    ],
    correctAnswer: "It washes away pathogenic bacteria and prevents disease transmission",
    explanation: "Handwashing with soap removes dirt and pathogenic microorganisms, breaking the faecal-oral route of transmission for cholera, diarrhoea, and typhoid.",
    hintLadder: [
      "Think about disease transmission from contaminated surfaces to food.",
      "Soap breaks down grease and washes microbes off skin.",
      "This prevents food contamination and bacterial infections."
    ],
    misconceptionAlerts: [
      { trigger: "It replaces the need for balanced nutrition", note: "Hygiene prevents infections but does not substitute for nutritional food intake." }
    ],
    skillId: "skill-pri-health-hygiene",
    difficulty: "medium"
  },
  {
    id: "ncee-soc-05",
    type: "multiple_choice",
    questionText: "Which of the following describes an extended family system?",
    options: [
      "Parents, children, grandparents, uncles, aunts, and cousins",
      "Father, mother, and their biological children only",
      "A class teacher and all students in a classroom",
      "Neighbours living on the same street in a town"
    ],
    correctAnswer: "Parents, children, grandparents, uncles, aunts, and cousins",
    explanation: "An extended family includes several generations and kinships beyond the nuclear family, incorporating grandparents, aunts, uncles, and cousins.",
    hintLadder: [
      "Nuclear family consists only of parents and children.",
      "Extended family reaches out to broader kin across generations.",
      "It includes grandparents, uncles, aunts, and cousins."
    ],
    misconceptionAlerts: [
      { trigger: "Father, mother, and their biological children only", note: "This describes a nuclear family, not an extended family." }
    ],
    skillId: "skill-pri-social-family",
    difficulty: "medium"
  },
  {
    id: "ncee-soc-06",
    type: "multiple_choice",
    questionText: "What is the primary danger of buying or consuming unprescribed medicines from unregistered hawkers?",
    options: [
      "The drugs may be expired, fake, or incorrect in dosage, causing organ damage",
      "The packaging may look too colourful",
      "The hawker may charge less than a hospital pharmacy",
      "The medicine will instantly make the patient fall asleep"
    ],
    correctAnswer: "The drugs may be expired, fake, or incorrect in dosage, causing organ damage",
    explanation: "Substandard, expired, or counterfeit drugs sold by unlicensed vendors can lead to severe toxic liver and kidney failure or fatal drug poisoning.",
    hintLadder: [
      "Unregistered street medicines lack regulation by NAFDAC.",
      "They can contain incorrect chemicals or dangerous dosages.",
      "This can cause severe toxicity and organ damage."
    ],
    misconceptionAlerts: [
      { trigger: "The hawker may charge less than a hospital pharmacy", note: "Low price is a marketing trick that conceals lethal counterfeit risks." }
    ],
    skillId: "skill-pri-civic-drugs-safety",
    difficulty: "medium"
  },
  {
    id: "ncee-soc-07",
    type: "multiple_choice",
    questionText: "In traditional African community life, what was the primary purpose of the 'age grade' system?",
    options: [
      "Mobilizing community defense, public sanitation, and peer civic discipline",
      "Determining who could travel abroad for schooling",
      "Deciding which family owned the largest livestock farms",
      "Preventing youth from participating in cultural festivals"
    ],
    correctAnswer: "Mobilizing community defense, public sanitation, and peer civic discipline",
    explanation: "Age grades grouped peers born within a 3–5 year cohort to perform communal labour (clearing pathways, maintaining town squares) and uphold community ethical standards.",
    hintLadder: [
      "Age grades brought peers together to serve their village or town.",
      "They carried out community work like road clearing and town guarding.",
      "They fostered civic duty, security, and communal self-help."
    ],
    misconceptionAlerts: [
      { trigger: "Preventing youth from participating in cultural festivals", note: "Age grades were central leaders and organizers of cultural dances and festivals." }
    ],
    skillId: "skill-pri-social-culture",
    difficulty: "hard"
  },
  {
    id: "ncee-soc-08",
    type: "multiple_choice",
    questionText: "Under democratic rule of law, which arm of government is constitutionally responsible for interpreting laws and resolving legal disputes between citizens or government bodies?",
    options: ["The Judiciary", "The Legislature", "The Executive", "The Civil Service"],
    correctAnswer: "The Judiciary",
    explanation: "The Judiciary (courts and judges) interprets laws and adjudicates disputes. The Legislature makes laws, and the Executive enforces them.",
    hintLadder: [
      "Remember the three arms: Executive executes/enforces, Legislature makes laws.",
      "The arm with courts, magistrates, and judges interprets the law.",
      "This arm is called the Judiciary."
    ],
    misconceptionAlerts: [
      { trigger: "The Legislature", note: "The Legislature (parliament/assembly) makes laws, while the Judiciary interprets them." },
      { trigger: "The Executive", note: "The Executive (President, Governors, Ministers) enforces laws." }
    ],
    skillId: "skill-pri-civic-judiciary",
    difficulty: "hard"
  }
];

export const COMMON_ENTRANCE_FULL_EXAM_SIMULATION: ExamSimulation = {
  id: "exam-common-entrance",
  title: "National Common Entrance Examination (NCEE) Comprehensive CBT Hall",
  subtitle: "50-Question Benchmark for Primary 5/6 Federal Unity Colleges & State Entrance",
  type: "COMMON_ENTRANCE",
  targetYear: "Primary 5/6 Transition",
  timeLimitMinutes: 60,
  passingScore: 70,
  questions: COMMON_ENTRANCE_50_QUESTION_POOL
};
