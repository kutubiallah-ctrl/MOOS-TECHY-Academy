/**
 * MOOS TECHY ACADEMY — PROJECT-BASED LEARNING & REAL-WORLD CASES REPOSITORY
 * 
 * Provides end-to-end applied projects and case studies:
 * - Mathematical optimization & urban logistics
 * - Community solar power microgrid design
 * - Agricultural crop yield predictive analysis
 * - Household financial budget & emergency solvency plan
 * - Mobile health symptom checker algorithm
 */

import { RealWorldCaseStudy } from "../types/contentSaturation";

export const REAL_WORLD_PROJECTS: RealWorldCaseStudy[] = [
  {
    id: "proj-lagos-traffic-optimization",
    title: "Urban Traffic Flow Optimization Using Linear Systems & Graph Theory",
    industryContext: "Urban Transportation Engineering & Smart Cities",
    problemDescription: "Lagos traffic bottlenecks at major intersections (e.g. Lekki Tollgate, Oshodi Interchange) cause significant productivity loss. Modeling traffic volume as a system of linear conservation equations allows signal timing to minimize congestion queues.",
    mathematicalOrScientificModels: [
      "Kirchhoff's Flow Conservation: Inflow = Outflow at each junction node: \\sum Q_{\\text{in}} = \\sum Q_{\\text{out}}",
      "System of Linear Equations: AX = B, solved via Gaussian Elimination or Matrix Inversion"
    ],
    stepByStepInvestigation: [
      "Map the 4 major intersections and measure average vehicle arrivals per minute during peak morning commute.",
      "Set up balance equations at each node where cars entering must equal cars exiting plus queue accumulation.",
      "Solve the linear system matrix to determine the optimal green-light phase duration for each direction.",
      "Simulate the effect of a 20% traffic surge on average commuter wait times."
    ],
    studentDeliverables: [
      "Intersectional traffic network diagram with labeled node flows",
      "Calculated matrix equation showing traffic distribution vectors",
      "Recommendations for adaptive signal timing policy"
    ],
    pedagogicalAssessmentRubric: [
      { criterion: "Mathematical Modeling", maxPoints: 30, description: "Correct translation of physical traffic flows into balanced linear equations." },
      { criterion: "Computational Execution", maxPoints: 40, description: "Accurate row reduction or matrix determinant solving." },
      { criterion: "Real-World Feasibility", maxPoints: 30, description: "Practical relevance of recommended signal timing adjustments." }
    ]
  },
  {
    id: "proj-solar-microgrid-design",
    title: "Off-Grid Solar Microgrid Design for a Rural Health Clinic",
    industryContext: "Renewable Energy & Electrical Engineering",
    problemDescription: "A primary healthcare clinic in a rural community requires uninterrupted electricity to power vaccine refrigeration (24/7), diagnostic microscopes, and LED lighting during national grid outages.",
    mathematicalOrScientificModels: [
      "Total Daily Energy Consumption: E_{\\text{total}} = \\sum (P_i \\times t_i) \\text{ Watt-hours}",
      "Solar Array Sizing: P_{\\text{array}} = \\frac{E_{\\text{total}}}{\\text{Peak Sun Hours} \\times \\eta_{\\text{system}}}",
      "Battery Bank Sizing: C_{\\text{battery}} = \\frac{E_{\\text{total}} \\times \\text{Days of Autonomy}}{\\text{System Voltage} \\times \\text{Depth of Discharge}}"
    ],
    stepByStepInvestigation: [
      "Audit daily appliance power ratings (Refrigeration: 150W × 24h; Lighting: 100W × 12h; Medical tools: 200W × 4h).",
      "Calculate total daily consumption with a 20% safety factor.",
      "Compute required photovoltaic solar panels assuming 5.0 peak sun hours daily in Northern Nigeria.",
      "Size the deep-cycle lithium battery bank for 2 days of cloudy-weather autonomy."
    ],
    studentDeliverables: [
      "Complete electrical load schedule table",
      "Single-line circuit diagram showing solar array, charge controller, battery bank, and inverter",
      "Capital cost estimate and payback period analysis against diesel generator fuel costs"
    ],
    pedagogicalAssessmentRubric: [
      { criterion: "Load Calculation Accuracy", maxPoints: 35, description: "Correct daily Watt-hour summation and inverter loss factors." },
      { criterion: "System Sizing & Safety", maxPoints: 35, description: "Appropriate battery depth of discharge and wire gauge selection." },
      { criterion: "Economic Analysis", maxPoints: 30, description: "Clear comparison with generator operational expenditure." }
    ]
  },
  {
    id: "proj-household-financial-plan",
    title: "Comprehensive Household Solvency & Financial Resilience Blueprint",
    industryContext: "Personal Financial Advisory & Wealth Management",
    problemDescription: "A family with two working adults and three school-age children seeks to eliminate revolving credit debt, build an emergency fund, and invest for tertiary university tuition.",
    mathematicalOrScientificModels: [
      "The 50/30/20 Budgeting Allocation Framework",
      "Compound Growth Equation: A = P(1 + r/n)^{nt} for university education fund",
      "Debt Snowball / Avalanche Amortization Mechanics"
    ],
    stepByStepInvestigation: [
      "Compile all net monthly cash flows and catalog existing debts by interest rate (APR).",
      "Apply the 50/30/20 rule to categorize needs, wants, and mandatory debt paydown.",
      "Calculate the accelerated debt paydown timeline using the Debt Avalanche method.",
      "Project the compound growth of an automated monthly mutual fund investment over 10 years."
    ],
    studentDeliverables: [
      "Itemized monthly budget spreadsheet",
      "Debt elimination schedule showing exact months to zero debt",
      "10-year education savings projection chart"
    ],
    pedagogicalAssessmentRubric: [
      { criterion: "Cash Flow Discipline", maxPoints: 30, description: "Strict separation of essential needs from discretionary wants." },
      { criterion: "Amortization Mathematics", maxPoints: 40, description: "Correct application of compound interest and interest-saving schedules." },
      { criterion: "Long-term Planning", maxPoints: 30, description: "Feasible education savings plan with inflation-adjusted targets." }
    ]
  },
  {
    id: "proj-water-treatment-chemistry",
    title: "Municipal Water Purification & Chemical Coagulation Engineering",
    industryContext: "Environmental Chemistry & Public Health Engineering",
    problemDescription: "A river source serving 50,000 residents suffers from high turbidity (suspended clay particulates) and microbial contamination. Students design a coagulation, flocculation, and chlorination treatment process meeting WHO drinking water standards.",
    mathematicalOrScientificModels: [
      "Alum Coagulation Hydrolysis: Al³⁺ + 3H₂O => Al(OH)₃(s) + 3H⁺ (Buffer requirement: CaCO₃ neutralization)",
      "Disinfection CT Value: Concentration (mg/L) × Time (minutes) >= WHO Target (CT = 15 mg·min/L for 99.9% pathogen reduction)",
      "Jar Test Optimization Curve: Turbidity vs Alum Dosage (mg/L)"
    ],
    stepByStepInvestigation: [
      "Collect river water samples and measure initial pH (6.4) and turbidity (120 NTU).",
      "Conduct jar test simulations with alum doses of 10, 20, 30, 40, and 50 mg/L to find the optimal isoelectric point.",
      "Calculate lime (calcium hydroxide) requirement to prevent water from turning overly acidic due to alum hydrolysis.",
      "Determine chlorine dosing rate and contact chamber retention time to guarantee 0.5 mg/L free residual chlorine at tap."
    ],
    studentDeliverables: [
      "Dosage-Turbidity response curve and recommended chemical dosing matrix",
      "Process flow engineering diagram (Intake -> Flash Mix -> Flocculator -> Clarifier -> Sand Filter -> Chlorination)",
      "Chemical consumption cost estimate per 1,000,000 liters treated"
    ],
    pedagogicalAssessmentRubric: [
      { criterion: "Chemical Principles", maxPoints: 35, description: "Accurate stoichiometric calculations of alum hydrolysis, buffering, and chlorine dosage." },
      { criterion: "Engineering Design", maxPoints: 35, description: "Sound retention time and tank dimensioning based on volumetric flow rate." },
      { criterion: "Public Health Safety", maxPoints: 30, description: "Rigorous compliance with WHO potable water parameters and residual disinfection limits." }
    ]
  },
  {
    id: "proj-crop-disease-algorithm",
    title: "Computer Vision & Rule-Based Triage for Cassava Leaf Disease",
    industryContext: "AgriTech, Machine Learning & Embedded Computing",
    problemDescription: "Cassava mosaic disease and bacterial blight devastate smallholder farming yields. Students construct a decision-tree diagnosis algorithm based on visual feature extraction (chlorosis, mosaic mottle, necrotic spots) executable on low-cost smartphones.",
    mathematicalOrScientificModels: [
      "Information Gain & Entropy: H(S) = - \\sum p_i \\log_2(p_i) for optimal symptom branch splitting",
      "Confusion Matrix Metrics: Sensitivity (Recall) = TP / (TP + FN), Precision = TP / (TP + FP)",
      "Confidence Threshold Scoring Function: S_disease = \\sum (w_i \\times f_i)"
    ],
    stepByStepInvestigation: [
      "Tabulate symptom matrices from 200 field photography cases (leaf curl, yellowing, vein clearing).",
      "Calculate entropy reduction to place the most discriminative leaf inspection question at the root node.",
      "Implement the decision tree in Python with branching rules and confidence scores.",
      "Test against 40 blind verification samples to evaluate false negative rates for quarantine-critical pathogens."
    ],
    studentDeliverables: [
      "Hierarchical decision tree diagram with symptom branching probabilities",
      "Working Python triage script accepting visual symptom inputs and outputting diagnosis + confidence interval",
      "Agricultural advisory leaflet with actionable organic and chemical countermeasures"
    ],
    pedagogicalAssessmentRubric: [
      { criterion: "Computational Logic", maxPoints: 40, description: "Correct formulation of conditional logic, entropy optimization, and scoring weights." },
      { criterion: "Biological Fidelity", maxPoints: 30, description: "Accurate symptom differentiation between cassava viral mosaic, brown streak, and blight." },
      { criterion: "Farmer Usability", maxPoints: 30, description: "Clarity of diagnosis output and low-bandwidth accessibility for rural field workers." }
    ]
  }
];
