/**
 * MOOS TECHY ACADEMY — CAREER & SKILLS PATHWAY REPOSITORY
 * 
 * Maps educational curricula to professional and tertiary careers:
 * - Software Engineering & Cloud Systems
 * - Data Science & Artificial Intelligence
 * - Mechanical & Electrical Engineering
 * - Biomedical Sciences & Clinical Research
 * - Financial Analysis & Investment Banking
 * - Teaching & Pedagogical Leadership
 * - Digital Enterprise & Technology Entrepreneurship
 * - Scientific Research & Applied Physics
 */

import { CareerPathway } from "../types/contentSaturation";

export const CAREER_PATHWAYS: CareerPathway[] = [
  {
    id: "path-software-engineering",
    title: "Software Engineering & Distributed Systems",
    iconName: "Code2",
    summary: "Architecting reliable, scalable software applications, cloud services, and interactive digital experiences.",
    domain: "Computer Science & AI",
    salaryBandOrDemand: "High Global Demand • High Growth",
    keySkills: [
      "Algorithmic Problem Solving",
      "Python, TypeScript & Systems Programming",
      "Data Structures (Trees, Graphs, Hash Maps)",
      "Database Modeling & SQL Optimization",
      "API Architecture & Cloud Deployment"
    ],
    prerequisiteSkillIds: [
      "skill-py-functions-data",
      "skill-dsa-stacks-queues",
      "skill-sql-joins-indexing"
    ],
    recommendedCurriculumSubjects: [
      "comp_programming",
      "comp_systems_networks",
      "math_algebra",
      "math_calculus"
    ],
    targetTertiaryPrograms: [
      "B.Sc. Computer Science",
      "B.Eng. Software Engineering",
      "B.Sc. Information Technology",
      "Computer Engineering"
    ],
    milestones: [
      {
        level: "Junior Secondary",
        objective: "Master conditional logic, computational thinking, and visual block/Python fundamentals",
        recommendedProject: "Build an interactive automated text adventure game in Python"
      },
      {
        level: "Senior Secondary",
        objective: "Implement linear data structures, relational databases, and full web application prototypes",
        recommendedProject: "Build a student results management portal with SQLite and Flask"
      },
      {
        level: "University Prep",
        objective: "Analyze Big-O time/space complexity and architect distributed RESTful microservices",
        recommendedProject: "Deploy an authenticated cloud API with caching and load balancing"
      }
    ]
  },
  {
    id: "path-data-science-ai",
    title: "Data Science, Machine Learning & AI",
    iconName: "Brain",
    summary: "Deriving mathematical insights from massive datasets, building predictive machine learning models, and applied neural networks.",
    domain: "Computer Science & Mathematics",
    salaryBandOrDemand: "Very High Demand • Frontier Technology",
    keySkills: [
      "Multivariable Calculus & Gradient Descent",
      "Linear Algebra & Matrix Operations",
      "Probability & Statistical Distributions",
      "Data Analysis with Pandas & NumPy",
      "Supervised & Unsupervised Machine Learning"
    ],
    prerequisiteSkillIds: [
      "skill-uni-matrix-determinants",
      "skill-uni-lhopital-partials",
      "skill-py-functions-data"
    ],
    recommendedCurriculumSubjects: [
      "math_calculus",
      "math_core",
      "comp_programming"
    ],
    targetTertiaryPrograms: [
      "B.Sc. Data Science & Analytics",
      "B.Sc. Artificial Intelligence",
      "B.Sc. Mathematics & Statistics",
      "Computational Science"
    ],
    milestones: [
      {
        level: "Senior Secondary",
        objective: "Master bivariate linear regression, standard deviation, and dataset cleaning in Python",
        recommendedProject: "Analyze and visualize historical weather patterns across 6 Nigerian geopolitical zones"
      },
      {
        level: "University Prep",
        objective: "Implement gradient descent optimization, matrix covariance, and classification models",
        recommendedProject: "Train a neural network classifier to detect plant leaf diseases from agricultural imagery"
      }
    ]
  },
  {
    id: "path-mechanical-electrical-eng",
    title: "Engineering: Robotics, Renewable Energy & Electromagnetism",
    iconName: "Cpu",
    summary: "Designing mechanical mechanisms, electrical power systems, microcontrollers, and sustainable energy grids.",
    domain: "Natural Sciences & Mathematics",
    salaryBandOrDemand: "High National Infrastructure Demand",
    keySkills: [
      "Newtonian Dynamics & Mechanical Equilibrium",
      "Electromagnetic Induction & DC/AC Circuits",
      "Calculus-based Kinematics & Work-Energy Theorem",
      "Circuit Analysis (Ohm's & Kirchhoff's Laws)",
      "Technical Diagramming & CAD Principles"
    ],
    prerequisiteSkillIds: [
      "skill-phy-mech-newton",
      "skill-phy-elec-circuits",
      "skill-indefinite-definite-integration"
    ],
    recommendedCurriculumSubjects: [
      "sci_physics",
      "math_calculus",
      "math_geom_trig"
    ],
    targetTertiaryPrograms: [
      "B.Eng. Electrical & Electronics Engineering",
      "B.Eng. Mechanical Engineering",
      "B.Eng. Mechatronics Engineering",
      "Renewable Energy Systems"
    ],
    milestones: [
      {
        level: "Senior Secondary",
        objective: "Analyze series-parallel resistor networks and electromagnetic generators under Faraday's Law",
        recommendedProject: "Design and build a solar-powered phone charging circuit with voltage regulation"
      },
      {
        level: "University Prep",
        objective: "Formulate differential equations for damped harmonic oscillation and RLC circuit transients",
        recommendedProject: "Simulate a two-degree-of-freedom robotic arm trajectory using matrix transformations"
      }
    ]
  },
  {
    id: "path-biomedical-sciences",
    title: "Biomedical Science, Medicine & Genetics",
    iconName: "HeartPulse",
    summary: "Investigating cellular mechanisms, genetics, infectious diseases, and developing medical interventions.",
    domain: "Natural Sciences (Biology & Chemistry)",
    salaryBandOrDemand: "Essential Social & Clinical Demand",
    keySkills: [
      "Cell Biology & Molecular Genetics",
      "Chemical Stoichiometry & Organic Reaction Mechanisms",
      "Human Physiology (Cardiovascular & Renal Systems)",
      "Mendelian Inheritance & Probability Crosses",
      "Laboratory Biosafety & Empirical Protocols"
    ],
    prerequisiteSkillIds: [
      "skill-bio-cell-organelles",
      "skill-bio-genetics-dna",
      "skill-chem-stoichiometry-mole"
    ],
    recommendedCurriculumSubjects: [
      "sci_biology",
      "sci_chemistry",
      "math_core"
    ],
    targetTertiaryPrograms: [
      "MBBS Medicine & Surgery",
      "B.Sc. Biochemistry",
      "B.Sc. Microbiology",
      "B.Pharm. Pharmacy"
    ],
    milestones: [
      {
        level: "Senior Secondary",
        objective: "Perform dihybrid genetics crosses, calculate mole ratios, and map circulatory pathways",
        recommendedProject: "Investigate the chemical inhibition of catalase enzyme activity under varying pH and temperature"
      },
      {
        level: "University Prep",
        objective: "Analyze DNA sequencing techniques, antibiotic resistance kinetics, and equilibrium acid-base buffers",
        recommendedProject: "Model malaria transmission epidemiology and vector control interventions mathematically"
      }
    ]
  },
  {
    id: "path-economics-finance",
    title: "Economics, Investment Banking & Fintech",
    iconName: "TrendingUp",
    summary: "Analyzing capital markets, national macroeconomic policy, corporate valuation, and financial technology innovations.",
    domain: "Business & Financial Literacy",
    salaryBandOrDemand: "High Commercial & Corporate Demand",
    keySkills: [
      "Market Equilibrium & Price Elasticity Analysis",
      "Macroeconomic Policy (Central Bank MPR & Fiscal Tools)",
      "Compound Interest, Net Present Value (NPV) & Amortization",
      "Financial Accounting & Balance Sheet Reconciliation",
      "Risk Modeling & Portfolio Diversification"
    ],
    prerequisiteSkillIds: [
      "skill-econ-equilibrium-shifts",
      "skill-econ-gdp-inflation-cbn",
      "skill-fin-compound-interest"
    ],
    recommendedCurriculumSubjects: [
      "comm_financial_lit",
      "math_core",
      "comp_programming"
    ],
    targetTertiaryPrograms: [
      "B.Sc. Economics",
      "B.Sc. Finance & Banking",
      "B.Sc. Accounting",
      "Actuarial Science"
    ],
    milestones: [
      {
        level: "Senior Secondary",
        objective: "Construct personal 50/30/20 budgets, calculate real vs nominal GDP, and evaluate inflation trends",
        recommendedProject: "Conduct an empirical pricing survey of staple foods in local markets and compute price elasticity"
      },
      {
        level: "University Prep",
        objective: "Model discounted cash flows, interest rate transmission channels, and foreign exchange movements",
        recommendedProject: "Draft a comprehensive investment memo evaluating the valuation of a Nigerian fintech startup"
      }
    ]
  }
];
