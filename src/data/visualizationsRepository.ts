/**
 * MOOS TECHY ACADEMY — EDUCATIONAL VISUALIZATIONS REPOSITORY
 * 
 * Provides interactive coordinate graphs, curves, biological diagrams,
 * and economic equilibrium models for visual conceptual grounding.
 */

import { EducationalVisualization } from "../types/contentSaturation";

export const VISUALIZATION_REPOSITORY: Record<string, EducationalVisualization> = {
  "vis-quadratic-parabola": {
    id: "vis-quadratic-parabola",
    skillId: "skill-quad-factoring",
    unitId: "unit-sss-quadratics",
    title: "Parabolic Trajectory & Vertex Visualization",
    type: "coordinate_graph",
    caption: "Graph of y = x² - 4x + 3 showing real roots at x = 1 and x = 3, with vertex minimum at (2, -1).",
    axes: {
      xLabel: "Horizontal Distance (x)",
      yLabel: "Height / Output (y)",
      xMin: -1,
      xMax: 5,
      yMin: -2,
      yMax: 6
    },
    dataPoints: [
      { label: "Root 1", x: 1, y: 0, description: "First x-intercept (1, 0)" },
      { label: "Vertex", x: 2, y: -1, description: "Local minimum at x = -b/(2a) = 2" },
      { label: "Root 2", x: 3, y: 0, description: "Second x-intercept (3, 0)" },
      { label: "y-intercept", x: 0, y: 3, description: "Constant c value (0, 3)" },
      { label: "Point", x: 4, y: 3, description: "Symmetric point (4, 3)" }
    ],
    curves: [
      {
        name: "y = x² - 4x + 3",
        equation: "f(x) = x^2 - 4x + 3",
        color: "#2563eb",
        points: [
          { x: -0.5, y: 5.25 },
          { x: 0, y: 3 },
          { x: 0.5, y: 1.25 },
          { x: 1, y: 0 },
          { x: 1.5, y: -0.75 },
          { x: 2, y: -1 },
          { x: 2.5, y: -0.75 },
          { x: 3, y: 0 },
          { x: 3.5, y: 1.25 },
          { x: 4, y: 3 },
          { x: 4.5, y: 5.25 }
        ]
      }
    ],
    takeaway: "The axis of symmetry lies midway between the roots at x = 2. The sign of 'a' (+1) determines that the parabola opens upward."
  },
  "vis-econ-equilibrium": {
    id: "vis-econ-equilibrium",
    skillId: "skill-econ-equilibrium-shifts",
    unitId: "unit-econ-demand-supply",
    title: "Market Supply & Demand Clearing Equilibrium",
    type: "equilibrium_curve",
    caption: "Equilibrium at intersection of Qd = 180 - 4P and Qs = 30 + 6P, yielding P* = ₦15 and Q* = 120 units.",
    axes: {
      xLabel: "Quantity (Q in thousands)",
      yLabel: "Price (P in ₦)",
      xMin: 0,
      xMax: 200,
      yMin: 0,
      yMax: 30
    },
    dataPoints: [
      { label: "Equilibrium (E*)", x: 120, y: 15, description: "Clearing point: Qd = Qs = 120 at P = ₦15" },
      { label: "Surplus Zone", x: 80, y: 22, description: "Price > P* creates excess supply (surplus)" },
      { label: "Shortage Zone", x: 150, y: 8, description: "Price < P* creates excess demand (shortage)" }
    ],
    curves: [
      {
        name: "Demand Curve (Downward Sloping)",
        equation: "P = 45 - 0.25Q",
        color: "#dc2626",
        points: [
          { x: 40, y: 25 },
          { x: 80, y: 20 },
          { x: 120, y: 15 },
          { x: 160, y: 10 },
          { x: 180, y: 5 }
        ]
      },
      {
        name: "Supply Curve (Upward Sloping)",
        equation: "P = -5 + 0.167Q",
        color: "#16a34a",
        points: [
          { x: 60, y: 5 },
          { x: 90, y: 10 },
          { x: 120, y: 15 },
          { x: 150, y: 20 },
          { x: 180, y: 25 }
        ]
      }
    ],
    takeaway: "Prices naturally gravitate toward the equilibrium price where quantity supplied equals quantity demanded, eliminating shortages and surpluses."
  },
  "vis-econ-ppf": {
    id: "vis-econ-ppf",
    skillId: "skill-econ-scarcity-ppc",
    unitId: "unit-econ-scarcity-choice",
    title: "Production Possibility Frontier (PPF)",
    type: "equilibrium_curve",
    caption: "Concave PPF curve between Agricultural Food and Industrial Capital Goods.",
    axes: {
      xLabel: "Food Production (metric tons)",
      yLabel: "Manufactured Goods (units)",
      xMin: 0,
      xMax: 550,
      yMin: 0,
      yMax: 400
    },
    dataPoints: [
      { label: "Point A (Efficient)", x: 200, y: 320, description: "On the curve: full resource employment" },
      { label: "Point B (Inefficient)", x: 150, y: 180, description: "Inside the curve: unemployment/idle capacity" },
      { label: "Point C (Unattainable)", x: 420, y: 350, description: "Outside the curve: unattainable with current technology" }
    ],
    curves: [
      {
        name: "PPF Frontier (Concave)",
        equation: "PPF",
        color: "#7c3aed",
        points: [
          { x: 0, y: 360 },
          { x: 100, y: 350 },
          { x: 200, y: 320 },
          { x: 300, y: 260 },
          { x: 400, y: 160 },
          { x: 500, y: 0 }
        ]
      }
    ],
    takeaway: "The outward bowing of the curve illustrates the Law of Increasing Opportunity Cost."
  },
  "vis-budget-distribution": {
    id: "vis-budget-distribution",
    skillId: "skill-fin-50-30-20-budgeting",
    unitId: "unit-fin-budgeting-cashflow",
    title: "50/30/20 Budgeting Ratio & Cash Flow Breakdown",
    type: "bar_comparison",
    caption: "Ideal structural distribution of net monthly take-home income.",
    axes: {
      xLabel: "Spending & Asset Bucket",
      yLabel: "Percentage of Net Income (%)",
      xMin: 0,
      xMax: 4,
      yMin: 0,
      yMax: 60
    },
    dataPoints: [
      { label: "Needs (Essential)", x: 1, y: 50, description: "Rent, utilities, basic food, transport, medicine" },
      { label: "Wants (Discretionary)", x: 2, y: 30, description: "Dining out, entertainment, subscriptions, hobbies" },
      { label: "Savings & Debt", x: 3, y: 20, description: "Emergency fund, retirement, debt payoff, investing" }
    ],
    takeaway: "Capping essential needs at 50% ensures resilient cash flow to build a 3-6 month emergency fund and long-term assets."
  },
  "vis-dna-ladder": {
    id: "vis-dna-ladder",
    skillId: "skill-bio-dihybrid-sex-linkage-dna",
    unitId: "unit-bio-genetics-inheritance-biotech",
    title: "DNA Double Helix Complementary Base Pairing",
    type: "flow_diagram",
    caption: "Antiparallel strands connected by hydrogen bonds between complementary nitrogenous bases.",
    steps: [
      { step: 1, title: "Sugar-Phosphate Backbone", description: "Alternating deoxyribose sugar and phosphate groups running 5' to 3' and 3' to 5'." },
      { step: 2, title: "Adenine & Thymine Pair", description: "Adenine (purine) pairs strictly with Thymine (pyrimidine) via 2 hydrogen bonds." },
      { step: 3, title: "Guanine & Cytosine Pair", description: "Guanine (purine) pairs strictly with Cytosine (pyrimidine) via 3 hydrogen bonds." },
      { step: 4, title: "Helical Twisting", description: "Right-handed double helix with major and minor grooves facilitating transcription enzymes." }
    ],
    takeaway: "The strict complementary pairing (A=T, G≡C) enables faithful semi-conservative replication of genetic information."
  },
  "vis-newton-dynamics": {
    id: "vis-newton-dynamics",
    skillId: "skill-phy-newtons-laws",
    unitId: "unit-phy-dynamics-energy",
    title: "Free Body Diagram & Newton's Second Law Dynamics",
    type: "flow_diagram",
    caption: "Forces acting on an object on an inclined plane: Gravity, Normal Force, Friction, and Applied Force.",
    steps: [
      { step: 1, title: "Gravitational Weight (W = mg)", description: "Acts vertically downward toward the center of the Earth." },
      { step: 2, title: "Normal Reaction Force (N)", description: "Acts perpendicular to the contact surface supporting the object." },
      { step: 3, title: "Friction Force (f_k)", description: "Opposes relative sliding motion along the plane surface: f = μN." },
      { step: 4, title: "Net Resultant Vector (F_net = ma)", description: "The vector sum of all forces dictates the object's acceleration vector." }
    ],
    takeaway: "Resolving forces into perpendicular components (parallel and normal to the plane) simplifies multi-dimensional acceleration calculation."
  },
  "vis-circuits-resistors": {
    id: "vis-circuits-resistors",
    skillId: "skill-phy-circuits-ohms-law",
    unitId: "unit-phy-electricity-magnetism",
    title: "Ohm's Law: Voltage vs Current & Resistance Slopes",
    type: "coordinate_graph",
    caption: "Linear V-I characteristic curves for ohmic resistors showing higher slope for larger resistance (R = ΔV/ΔI).",
    axes: {
      xLabel: "Current (I in Amperes)",
      yLabel: "Voltage (V in Volts)",
      xMin: 0,
      xMax: 5,
      yMin: 0,
      yMax: 25
    },
    dataPoints: [
      { label: "Operating Point A", x: 2, y: 10, description: "5Ω resistor carrying 2A at 10V" },
      { label: "Operating Point B", x: 4, y: 20, description: "5Ω resistor carrying 4A at 20V" },
      { label: "High-R Point", x: 1, y: 15, description: "15Ω resistor: steep slope requiring higher voltage for same current" }
    ],
    curves: [
      {
        name: "5Ω Ohmic Resistor (V = 5I)",
        equation: "V = 5I",
        color: "#2563eb",
        points: [
          { x: 0, y: 0 },
          { x: 1, y: 5 },
          { x: 2, y: 10 },
          { x: 3, y: 15 },
          { x: 4, y: 20 },
          { x: 5, y: 25 }
        ]
      },
      {
        name: "2.5Ω Low-Resistance Parallel Network",
        equation: "V = 2.5I",
        color: "#16a34a",
        points: [
          { x: 0, y: 0 },
          { x: 2, y: 5 },
          { x: 4, y: 10 }
        ]
      }
    ],
    takeaway: "The reciprocal of resistance (1/R) represents electrical conductance. Parallel combinations always produce an equivalent resistance smaller than the smallest branch resistor."
  },
  "vis-chem-activation-energy": {
    id: "vis-chem-activation-energy",
    skillId: "skill-chm-enthalpy-hess-calorimetry",
    unitId: "unit-chm-energetics-thermochemistry",
    title: "Exothermic Reaction Coordinate & Catalyst Activation Barrier",
    type: "coordinate_graph",
    caption: "Reaction energy profile comparing uncatalyzed activation energy (Ea) with catalyzed pathway lowering the transition barrier.",
    axes: {
      xLabel: "Reaction Coordinate (Progress of Reaction)",
      yLabel: "Potential Energy (kJ/mol)",
      xMin: 0,
      xMax: 10,
      yMin: 0,
      yMax: 100
    },
    dataPoints: [
      { label: "Reactants", x: 1, y: 40, description: "Initial potential energy of reactants (40 kJ/mol)" },
      { label: "Uncatalyzed Peak", x: 5, y: 90, description: "High transition state barrier (Ea = +50 kJ/mol)" },
      { label: "Catalyzed Peak", x: 5, y: 65, description: "Lowered transition state via alternate catalytic mechanism (Ea = +25 kJ/mol)" },
      { label: "Products", x: 9, y: 20, description: "Stable products (ΔH = 20 - 40 = -20 kJ/mol exothermic)" }
    ],
    curves: [
      {
        name: "Uncatalyzed Pathway",
        equation: "E_potential(x)",
        color: "#dc2626",
        points: [
          { x: 0, y: 40 },
          { x: 2, y: 45 },
          { x: 4, y: 80 },
          { x: 5, y: 90 },
          { x: 6, y: 80 },
          { x: 8, y: 30 },
          { x: 10, y: 20 }
        ]
      },
      {
        name: "Catalyzed Pathway",
        equation: "E_catalyzed(x)",
        color: "#2563eb",
        points: [
          { x: 0, y: 40 },
          { x: 3, y: 52 },
          { x: 5, y: 65 },
          { x: 7, y: 45 },
          { x: 10, y: 20 }
        ]
      }
    ],
    takeaway: "Catalysts accelerate reactions by providing an alternate reaction pathway with lower activation energy without changing the overall enthalpy change (ΔH)."
  },
  "vis-fin-compound-growth": {
    id: "vis-fin-compound-growth",
    skillId: "skill-fin-compound-interest",
    unitId: "unit-fin-interest-accounting",
    title: "Exponential Compound Growth vs Linear Simple Savings",
    type: "coordinate_graph",
    caption: "20-year projection of ₦20,000 monthly investment compounding at 12% annual return vs cash under the mattress.",
    axes: {
      xLabel: "Elapsed Time (Years)",
      yLabel: "Portfolio Value (Millions ₦)",
      xMin: 0,
      xMax: 20,
      yMin: 0,
      yMax: 22
    },
    dataPoints: [
      { label: "Year 5 Compounded", x: 5, y: 1.64, description: "₦1.64M (₦1.2M contributed)" },
      { label: "Year 10 Compounded", x: 10, y: 4.64, description: "₦4.64M (₦2.4M contributed)" },
      { label: "Year 20 Compounded", x: 20, y: 19.98, description: "₦19.98M (₦4.8M contributed; ₦15.18M interest!)" }
    ],
    curves: [
      {
        name: "Compounded at 12% Annually",
        equation: "FV = P × [((1+r)^n - 1) / r]",
        color: "#16a34a",
        points: [
          { x: 0, y: 0 },
          { x: 5, y: 1.64 },
          { x: 10, y: 4.64 },
          { x: 15, y: 10.09 },
          { x: 20, y: 19.98 }
        ]
      },
      {
        name: "Linear Cash Under Mattress (0% Return)",
        equation: "Total Contributions",
        color: "#94a3b8",
        points: [
          { x: 0, y: 0 },
          { x: 5, y: 1.2 },
          { x: 10, y: 2.4 },
          { x: 15, y: 3.6 },
          { x: 20, y: 4.8 }
        ]
      }
    ],
    takeaway: "Time in the market is the primary driver of wealth creation. More than 75% of the total 20-year portfolio originates purely from compounding interest, not principal deposits."
  },
  "vis-comp-binary-tree": {
    id: "vis-comp-binary-tree",
    skillId: "skill-uni-dsa-complexity",
    unitId: "unit-uni-ict-dsa",
    title: "Binary Search Tree Traversal & Search Complexity Curves",
    type: "flow_diagram",
    caption: "Binary Search Tree organization ensuring left child < parent < right child, achieving O(log n) search.",
    steps: [
      { step: 1, title: "Root Node Evaluation", description: "Compare target key against Root (Value 50). If target < 50 go left; if target > 50 go right." },
      { step: 2, title: "Branch Pruning", description: "Each binary decision eliminates half of the remaining candidate search space." },
      { step: 3, title: "Subtree Traversal", description: "Recursively descend into Left Subtree (e.g. Node 30) or Right Subtree (Node 70)." },
      { step: 4, title: "Leaf Termination", description: "Target key is matched in at most log₂(N) comparisons or concluded absent." }
    ],
    takeaway: "In a balanced BST with 1,000,000 nodes, search completes in at most 20 comparisons (log₂ 10⁶ ≈ 20), whereas linear scan takes 1,000,000 checks."
  },
  "vis-uni-derivative-slope": {
    id: "vis-uni-derivative-slope",
    skillId: "skill-derivatives",
    unitId: "unit-adv-calculus",
    title: "The Calculus Derivative: Secant Line Limiting to Tangent Slope",
    type: "coordinate_graph",
    caption: "As interval h approaches 0, the secant slope [f(x+h) - f(x)]/h converges to the exact instantaneous derivative f'(x).",
    axes: {
      xLabel: "Input (x)",
      yLabel: "Output f(x) = x²",
      xMin: 0,
      xMax: 4,
      yMin: 0,
      yMax: 16
    },
    dataPoints: [
      { label: "Point of Tangency P(2, 4)", x: 2, y: 4, description: "Instantaneous slope f'(2) = 2(2) = 4" },
      { label: "Secant Point Q(3, 9)", x: 3, y: 9, description: "Secant slope with h=1: (9-4)/(3-2) = 5" },
      { label: "Closer Secant Q'(2.2, 4.84)", x: 2.2, y: 4.84, description: "Secant slope with h=0.2: (4.84-4)/0.2 = 4.2" }
    ],
    curves: [
      {
        name: "f(x) = x²",
        equation: "f(x) = x^2",
        color: "#2563eb",
        points: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 4 },
          { x: 3, y: 9 },
          { x: 4, y: 16 }
        ]
      },
      {
        name: "Tangent Line at x = 2 (y = 4x - 4)",
        equation: "y = 4x - 4",
        color: "#dc2626",
        points: [
          { x: 1, y: 0 },
          { x: 2, y: 4 },
          { x: 3, y: 8 },
          { x: 4, y: 12 }
        ]
      }
    ],
    takeaway: "The derivative at a point is mathematically defined as the limit of average rates of change over arbitrarily small intervals: lim(h->0) [f(x+h)-f(x)]/h."
  },
  "vis-pri-science-mrs-nerg": {
    id: "vis-pri-science-mrs-nerg",
    skillId: "skill-pri-science-living",
    unitId: "unit-pri-science-01",
    title: "The 7 Criteria of Life (MRS NERG) vs Inanimate Matter",
    type: "biology_process",
    caption: "Comparative biological process architecture detailing the seven universal criteria of life (Movement, Respiration, Sensitivity, Nutrition, Excretion, Reproduction, Growth) contrasting cellular organisms with inanimate matter.",
    pedagogicalTakeaway: "An entity is biologically classified as living ONLY when all seven MRS NERG processes are functionally inherent. Non-living objects may mimic one or two features (such as an automobile burning fuel and moving), but lack cellular metabolism, internal growth, and autonomous biological reproduction.",
    diagramSvgSnippet: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 480" className="w-full h-auto max-w-full select-none">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b132b" />
      <stop offset="100%" stop-color="#1c2541" />
    </linearGradient>
    <linearGradient id="lifeNodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#064e3b" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Canvas Background -->
  <rect width="760" height="480" rx="16" fill="url(#bgGrad)" stroke="#334155" stroke-width="1.5" />

  <!-- Top Banner -->
  <rect x="24" y="16" width="712" height="46" rx="10" fill="#1e293b" stroke="#475569" stroke-width="1" />
  <circle cx="48" cy="39" r="10" fill="#10b981" />
  <text x="48" y="43" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">✓</text>
  <text x="70" y="36" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">FIGURE 1: THE 7 CRITERIA OF LIFE (MRS NERG) vs INANIMATE MATTER</text>
  <text x="70" y="52" font-family="system-ui, sans-serif" font-size="10.5" font-weight="500" fill="#94a3b8">Biological Classification Framework • Primary Foundations &amp; Science Curriculum Standard</text>
  <rect x="618" y="26" width="104" height="24" rx="6" fill="#047857" />
  <text x="670" y="42" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#ecfdf5" text-anchor="middle">OFFICIAL MODEL</text>

  <!-- Flow Connector Lines to Central Organism -->
  <g stroke="#34d399" stroke-width="2" stroke-dasharray="4,3" opacity="0.6">
    <line x1="280" y1="240" x2="140" y2="115" />
    <line x1="280" y1="240" x2="280" y2="105" />
    <line x1="280" y1="240" x2="420" y2="115" />
    <line x1="280" y1="240" x2="105" y2="240" />
    <line x1="280" y1="240" x2="445" y2="240" />
    <line x1="280" y1="240" x2="155" y2="365" />
    <line x1="280" y1="240" x2="350" y2="365" />
  </g>

  <!-- Central Node: LIVING ORGANISM -->
  <circle cx="280" cy="240" r="62" fill="url(#lifeNodeGrad)" stroke="#34d399" stroke-width="3" filter="url(#glow)" />
  <circle cx="280" cy="240" r="54" fill="none" stroke="#6ee7b7" stroke-width="1.2" stroke-dasharray="6,4" />
  <text x="280" y="226" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#a7f3d0" text-anchor="middle" letter-spacing="1">LIVING</text>
  <text x="280" y="244" font-family="system-ui, sans-serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1.5">ORGANISM</text>
  <rect x="238" y="254" width="84" height="18" rx="5" fill="#065f46" />
  <text x="280" y="267" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#6ee7b7" text-anchor="middle">Cellular System</text>

  <!-- 1. Movement -->
  <g transform="translate(60, 80)">
    <rect width="150" height="58" rx="8" fill="url(#cardGrad)" stroke="#38bdf8" stroke-width="1.5" />
    <circle cx="22" cy="22" r="12" fill="#0284c7" />
    <text x="22" y="27" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">M</text>
    <text x="42" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#e0f2fe">Movement</text>
    <text x="12" y="44" font-family="system-ui, sans-serif" font-size="9.5" fill="#94a3b8">Locomotion &amp; Phototropism</text>
  </g>

  <!-- 2. Respiration -->
  <g transform="translate(220, 70)">
    <rect width="155" height="58" rx="8" fill="url(#cardGrad)" stroke="#a855f7" stroke-width="1.5" />
    <circle cx="22" cy="22" r="12" fill="#7e22ce" />
    <text x="22" y="27" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">R</text>
    <text x="42" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#f3e8ff">Respiration</text>
    <text x="12" y="44" font-family="system-ui, sans-serif" font-size="9.5" fill="#94a3b8">Glucose + O₂ → ATP Energy</text>
  </g>

  <!-- 3. Sensitivity -->
  <g transform="translate(365, 80)">
    <rect width="145" height="58" rx="8" fill="url(#cardGrad)" stroke="#f59e0b" stroke-width="1.5" />
    <circle cx="22" cy="22" r="12" fill="#d97706" />
    <text x="22" y="27" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">S</text>
    <text x="42" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fef3c7">Sensitivity</text>
    <text x="12" y="44" font-family="system-ui, sans-serif" font-size="9.5" fill="#94a3b8">Detects Environmental Cues</text>
  </g>

  <!-- 4. Nutrition -->
  <g transform="translate(24, 210)">
    <rect width="145" height="58" rx="8" fill="url(#cardGrad)" stroke="#10b981" stroke-width="1.5" />
    <circle cx="22" cy="22" r="12" fill="#059669" />
    <text x="22" y="27" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">N</text>
    <text x="42" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#d1fae5">Nutrition</text>
    <text x="12" y="44" font-family="system-ui, sans-serif" font-size="9.5" fill="#94a3b8">Autotrophic / Ingestion</text>
  </g>

  <!-- 5. Excretion -->
  <g transform="translate(385, 210)">
    <rect width="135" height="58" rx="8" fill="url(#cardGrad)" stroke="#ec4899" stroke-width="1.5" />
    <circle cx="22" cy="22" r="12" fill="#be185d" />
    <text x="22" y="27" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">E</text>
    <text x="42" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#fce7f3">Excretion</text>
    <text x="12" y="44" font-family="system-ui, sans-serif" font-size="9.5" fill="#94a3b8">Removal of Toxic Wastes</text>
  </g>

  <!-- 6. Reproduction -->
  <g transform="translate(65, 335)">
    <rect width="155" height="58" rx="8" fill="url(#cardGrad)" stroke="#14b8a6" stroke-width="1.5" />
    <circle cx="22" cy="22" r="12" fill="#0f766e" />
    <text x="22" y="27" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">R</text>
    <text x="42" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#ccfbf1">Reproduction</text>
    <text x="12" y="44" font-family="system-ui, sans-serif" font-size="9.5" fill="#94a3b8">Seeds &amp; Offspring Creation</text>
  </g>

  <!-- 7. Growth -->
  <g transform="translate(255, 335)">
    <rect width="145" height="58" rx="8" fill="url(#cardGrad)" stroke="#84cc16" stroke-width="1.5" />
    <circle cx="22" cy="22" r="12" fill="#65a30d" />
    <text x="22" y="27" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">G</text>
    <text x="42" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#ecfccb">Growth</text>
    <text x="12" y="44" font-family="system-ui, sans-serif" font-size="9.5" fill="#94a3b8">Internal Cell Multiplication</text>
  </g>

  <!-- RIGHT CONTRAST PANEL: NON-LIVING INANIMATE OBJECTS -->
  <g transform="translate(535, 78)">
    <rect width="200" height="325" rx="12" fill="#1e1b2e" stroke="#f43f5e" stroke-width="2" />
    <rect x="0" y="0" width="200" height="36" rx="10" fill="#be123c" />
    <text x="100" y="23" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">NON-LIVING MATTER</text>

    <!-- Contrast points -->
    <g transform="translate(14, 52)">
      <circle cx="8" cy="8" r="7" fill="#881337" />
      <text x="8" y="12" font-family="system-ui, sans-serif" font-size="10" font-weight="900" fill="#f43f5e" text-anchor="middle">✕</text>
      <text x="24" y="11" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fecdd3">No Living Cells</text>
      <text x="24" y="25" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8">Lacks cellular biology</text>
    </g>

    <g transform="translate(14, 105)">
      <circle cx="8" cy="8" r="7" fill="#881337" />
      <text x="8" y="12" font-family="system-ui, sans-serif" font-size="10" font-weight="900" fill="#f43f5e" text-anchor="middle">✕</text>
      <text x="24" y="11" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fecdd3">Passive Motion</text>
      <text x="24" y="25" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8">Cars/Wind driven externally</text>
    </g>

    <g transform="translate(14, 158)">
      <circle cx="8" cy="8" r="7" fill="#881337" />
      <text x="8" y="12" font-family="system-ui, sans-serif" font-size="10" font-weight="900" fill="#f43f5e" text-anchor="middle">✕</text>
      <text x="24" y="11" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fecdd3">No True Respiration</text>
      <text x="24" y="25" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8">Fuel combustion is not ATP</text>
    </g>

    <g transform="translate(14, 211)">
      <circle cx="8" cy="8" r="7" fill="#881337" />
      <text x="8" y="12" font-family="system-ui, sans-serif" font-size="10" font-weight="900" fill="#f43f5e" text-anchor="middle">✕</text>
      <text x="24" y="11" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#fecdd3">No Reproduction</text>
      <text x="24" y="25" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8">Stones cannot spawn stones</text>
    </g>

    <rect x="12" y="260" width="176" height="52" rx="8" fill="#0f172a" stroke="#334155" />
    <text x="18" y="278" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#cbd5e1">Examples: Stone, Metal, Glass,</text>
    <text x="18" y="293" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#cbd5e1">Water, and Inanimate Plastic.</text>
    <text x="18" y="306" font-family="system-ui, sans-serif" font-size="8.5" fill="#f43f5e">(Also dead timber &amp; fossils)</text>
  </g>

  <!-- Bottom Invariant Summary Banner -->
  <rect x="24" y="420" width="712" height="44" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="1.2" />
  <circle cx="44" cy="442" r="9" fill="#065f46" stroke="#10b981" />
  <text x="44" y="446" font-family="system-ui, sans-serif" font-size="11" font-weight="900" fill="#34d399" text-anchor="middle">★</text>
  <text x="62" y="438" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#ecfdf5">PEDAGOGICAL INVARIANT (ALL 7 CRITERIA REQUIRED):</text>
  <text x="62" y="454" font-family="system-ui, sans-serif" font-size="9.5" font-weight="500" fill="#94a3b8">An entity is alive ONLY if all 7 criteria are functionally inherent. Partial mimicry (e.g., toy robot dog or burning flame) is strictly non-living.</text>
</svg>`
  },
  "vis-pri-civic-coat-of-arms-flag": {
    id: "vis-pri-civic-coat-of-arms-flag",
    skillId: "skill-pri-civic-nationalsymbols",
    unitId: "unit-pri-civic-01",
    title: "Heraldic Architecture of the Nigerian Coat of Arms & National Flag",
    type: "process_diagram",
    caption: "Architectural heraldic deconstruction of Nigeria's sovereign emblems detailing the Eagle (Strength), White Horses (Dignity), Black Shield (Fertile Soil), Silver Pall 'Y' (Niger-Benue Confluence), Costus Spectabilis (Flora), and National Flag dimensions.",
    pedagogicalTakeaway: "National symbols are not arbitrary decorative art; each heraldic component embodies an essential constitutional pillar of Nigeria's geographic identity, moral ethos, and sovereign dignity.",
    diagramSvgSnippet: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 500" className="w-full h-auto max-w-full select-none">
  <defs>
    <linearGradient id="civicBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#071520" />
      <stop offset="100%" stop-color="#0f2438" />
    </linearGradient>
    <linearGradient id="flagGreenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#007a48" />
      <stop offset="100%" stop-color="#008751" />
    </linearGradient>
    <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>
    <linearGradient id="goldBannerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#b45309" />
      <stop offset="50%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <filter id="civicGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="780" height="500" rx="16" fill="url(#civicBgGrad)" stroke="#1e3a5f" stroke-width="1.5" />

  <!-- Top Header Banner -->
  <rect x="20" y="16" width="740" height="46" rx="10" fill="#0c1d2e" stroke="#334155" stroke-width="1" />
  <circle cx="45" cy="39" r="11" fill="#008751" stroke="#ffffff" stroke-width="1.5" />
  <text x="45" y="44" font-family="system-ui, sans-serif" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">₦</text>
  <text x="68" y="36" font-family="system-ui, sans-serif" font-size="13.5" font-weight="800" fill="#f8fafc">FIGURE 1: HERALDIC ARCHITECTURE OF THE NIGERIAN COAT OF ARMS &amp; NATIONAL FLAG</text>
  <text x="68" y="52" font-family="system-ui, sans-serif" font-size="10" font-weight="500" fill="#94a3b8">Sovereign State Emblems &amp; Constitutional Identity • Primary Foundations Civic Standard</text>
  <rect x="650" y="26" width="96" height="24" rx="6" fill="#008751" />
  <text x="698" y="42" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#ffffff" text-anchor="middle">OFFICIAL HERALDRY</text>

  <!-- LEFT PANEL: THE NATIONAL FLAG -->
  <g transform="translate(20, 72)">
    <rect width="250" height="348" rx="12" fill="#0b1b2b" stroke="#008751" stroke-width="1.5" />
    
    <!-- Title -->
    <rect x="0" y="0" width="250" height="34" rx="10" fill="#047857" />
    <text x="125" y="22" font-family="system-ui, sans-serif" font-size="11.5" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">THE NATIONAL FLAG (1:2 RATIO)</text>

    <!-- Flag Graphic -->
    <g transform="translate(30, 48)">
      <!-- Flagstaff -->
      <rect x="0" y="0" width="6" height="110" rx="3" fill="#64748b" />
      <circle cx="3" cy="2" r="5" fill="#f59e0b" />
      <!-- Flag Body (Green - White - Green) -->
      <rect x="6" y="8" width="56" height="74" fill="url(#flagGreenGrad)" />
      <rect x="62" y="8" width="56" height="74" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.5" />
      <rect x="118" y="8" width="56" height="74" fill="url(#flagGreenGrad)" />
      <rect x="6" y="8" width="168" height="74" fill="none" stroke="#334155" stroke-width="1" />
      <text x="34" y="50" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#ecfdf5" text-anchor="middle">GREEN</text>
      <text x="90" y="50" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#0f172a" text-anchor="middle">WHITE</text>
      <text x="146" y="50" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#ecfdf5" text-anchor="middle">GREEN</text>
    </g>

    <!-- Flag Meaning Cards -->
    <g transform="translate(14, 172)">
      <rect width="222" height="48" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1" />
      <circle cx="16" cy="16" r="6" fill="#10b981" />
      <text x="30" y="19" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#ecfdf5">TWO GREEN STRIPES</text>
      <text x="14" y="38" font-family="system-ui, sans-serif" font-size="9" fill="#a7f3d0">Rich Agriculture, Fertile Soil &amp; Forests</text>
    </g>

    <g transform="translate(14, 226)">
      <rect width="222" height="48" rx="8" fill="#1e293b" stroke="#cbd5e1" stroke-width="1" />
      <circle cx="16" cy="16" r="6" fill="#ffffff" />
      <text x="30" y="19" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#f8fafc">CENTRAL WHITE STRIPE</text>
      <text x="14" y="38" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8">Peace, National Unity &amp; Harmony</text>
    </g>

    <!-- Provenance Note -->
    <rect x="14" y="280" width="222" height="56" rx="8" fill="#082f49" stroke="#0284c7" stroke-width="0.8" />
    <text x="22" y="298" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#bae6fd">Designer: Pa Michael T. Akinkunmi (1959)</text>
    <text x="22" y="313" font-family="system-ui, sans-serif" font-size="8.5" fill="#e0f2fe">First hoisted: October 1, 1960 (Independence)</text>
    <text x="22" y="327" font-family="system-ui, sans-serif" font-size="8" fill="#7dd3fc">Protocol: Hoist briskly at dawn, lower at sunset</text>
  </g>

  <!-- RIGHT PANEL: THE COAT OF ARMS HERALDRY -->
  <g transform="translate(285, 72)">
    <rect width="475" height="348" rx="12" fill="#0b1b2b" stroke="#3b82f6" stroke-width="1.5" />

    <!-- Title -->
    <rect x="0" y="0" width="475" height="34" rx="10" fill="#1d4ed8" />
    <text x="237" y="22" font-family="system-ui, sans-serif" font-size="11.5" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">THE SOVEREIGN COAT OF ARMS &amp; HERALDIC PILLARS</text>

    <!-- Diagram Center - Heraldic Crest Graphic -->
    <g transform="translate(145, 46)">
      <!-- Red Eagle (Crest) -->
      <g transform="translate(80, 10)">
        <polygon points="15,0 0,22 10,22 5,32 25,32 20,22 30,22" fill="#ef4444" />
        <circle cx="15" cy="6" r="6" fill="#b91c1c" />
        <circle cx="13" cy="5" r="1.5" fill="#ffffff" />
      </g>
      <!-- Wreath (Green & White Torsade) -->
      <rect x="80" y="44" width="30" height="8" rx="3" fill="#008751" stroke="#ffffff" stroke-width="1" />

      <!-- Left White Stallion Horse -->
      <g transform="translate(20, 50)">
        <ellipse cx="25" cy="45" rx="18" ry="28" fill="#f8fafc" stroke="#94a3b8" stroke-width="1" />
        <circle cx="20" cy="18" r="12" fill="#f8fafc" stroke="#94a3b8" stroke-width="1" />
        <rect x="15" y="65" width="6" height="38" rx="2" fill="#f8fafc" />
        <rect x="28" y="65" width="6" height="38" rx="2" fill="#f8fafc" />
        <text x="25" y="118" font-family="system-ui, sans-serif" font-size="7.5" font-weight="700" fill="#cbd5e1" text-anchor="middle">CHARGER</text>
      </g>

      <!-- Right White Stallion Horse -->
      <g transform="translate(135, 50)">
        <ellipse cx="25" cy="45" rx="18" ry="28" fill="#f8fafc" stroke="#94a3b8" stroke-width="1" />
        <circle cx="30" cy="18" r="12" fill="#f8fafc" stroke="#94a3b8" stroke-width="1" />
        <rect x="16" y="65" width="6" height="38" rx="2" fill="#f8fafc" />
        <rect x="29" y="65" width="6" height="38" rx="2" fill="#f8fafc" />
        <text x="25" y="118" font-family="system-ui, sans-serif" font-size="7.5" font-weight="700" fill="#cbd5e1" text-anchor="middle">CHARGER</text>
      </g>

      <!-- Black Shield with White Pall "Y" -->
      <g transform="translate(68, 54)">
        <!-- Shield Body -->
        <path d="M 0 0 L 54 0 C 54 35 48 60 27 75 C 6 60 0 35 0 0 Z" fill="url(#shieldGrad)" stroke="#e2e8f0" stroke-width="1.8" />
        <!-- White/Silver Pall "Y" -->
        <path d="M 0 0 L 14 0 L 27 25 L 40 0 L 54 0 L 33 34 L 33 72 L 21 72 L 21 34 Z" fill="#ffffff" />
        <path d="M 3 0 L 14 0 L 27 23 L 40 0 L 51 0 L 31 32 L 31 70 L 23 70 L 23 32 Z" fill="#38bdf8" opacity="0.6" />
      </g>

      <!-- Base Meadow with Costus Spectabilis Flowers -->
      <rect x="15" y="132" width="160" height="12" rx="4" fill="#15803d" />
      <circle cx="35" cy="138" r="3" fill="#facc15" />
      <circle cx="65" cy="138" r="3" fill="#facc15" />
      <circle cx="95" cy="138" r="3" fill="#facc15" />
      <circle cx="125" cy="138" r="3" fill="#facc15" />
      <circle cx="155" cy="138" r="3" fill="#facc15" />

      <!-- National Motto Scroll -->
      <g transform="translate(0, 148)">
        <rect x="0" y="0" width="190" height="20" rx="4" fill="#0f172a" stroke="url(#goldBannerGrad)" stroke-width="1.5" />
        <text x="95" y="14" font-family="system-ui, sans-serif" font-size="8.5" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="0.5">UNITY AND FAITH, PEACE AND PROGRESS</text>
      </g>
    </g>

    <!-- Heraldic Annotations Cards (Left & Right of Center) -->
    <!-- Annotation 1: Red Eagle -->
    <g transform="translate(12, 44)">
      <rect width="125" height="52" rx="6" fill="#1e1b2e" stroke="#ef4444" stroke-width="1" />
      <text x="10" y="17" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#fca5a5">1. RED EAGLE (CREST)</text>
      <text x="10" y="32" font-family="system-ui, sans-serif" font-size="8.5" font-weight="600" fill="#ffffff">National Strength</text>
      <text x="10" y="44" font-family="system-ui, sans-serif" font-size="7.5" fill="#94a3b8">&amp; sovereign vision</text>
    </g>

    <!-- Annotation 2: Two Horses -->
    <g transform="translate(12, 102)">
      <rect width="125" height="52" rx="6" fill="#1e293b" stroke="#cbd5e1" stroke-width="1" />
      <text x="10" y="17" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#f8fafc">2. TWO WHITE HORSES</text>
      <text x="10" y="32" font-family="system-ui, sans-serif" font-size="8.5" font-weight="600" fill="#ffffff">Dignity, Stature</text>
      <text x="10" y="44" font-family="system-ui, sans-serif" font-size="7.5" fill="#94a3b8">&amp; majestic honour</text>
    </g>

    <!-- Annotation 3: Black Shield -->
    <g transform="translate(12, 160)">
      <rect width="125" height="52" rx="6" fill="#0f172a" stroke="#475569" stroke-width="1" />
      <text x="10" y="17" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#e2e8f0">3. BLACK SHIELD</text>
      <text x="10" y="32" font-family="system-ui, sans-serif" font-size="8.5" font-weight="600" fill="#ffffff">Fertile Soil of Nigeria</text>
      <text x="10" y="44" font-family="system-ui, sans-serif" font-size="7.5" fill="#94a3b8">&amp; mineral richness</text>
    </g>

    <!-- Annotation 4: Silver Pall "Y" -->
    <g transform="translate(338, 44)">
      <rect width="125" height="52" rx="6" fill="#082f49" stroke="#38bdf8" stroke-width="1" />
      <text x="10" y="17" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#7dd3fc">4. WHITE "Y" PALL</text>
      <text x="10" y="32" font-family="system-ui, sans-serif" font-size="8.5" font-weight="600" fill="#ffffff">Confluence of Rivers</text>
      <text x="10" y="44" font-family="system-ui, sans-serif" font-size="7.5" fill="#bae6fd">Niger &amp; Benue at Lokoja</text>
    </g>

    <!-- Annotation 5: Costus Spectabilis -->
    <g transform="translate(338, 102)">
      <rect width="125" height="52" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="1" />
      <text x="10" y="17" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#bbf7d0">5. YELLOW FLORA</text>
      <text x="10" y="32" font-family="system-ui, sans-serif" font-size="8.5" font-weight="600" fill="#ffffff">Costus Spectabilis</text>
      <text x="10" y="44" font-family="system-ui, sans-serif" font-size="7.5" fill="#86efac">National wild flower</text>
    </g>

    <!-- Annotation 6: Motto Scroll -->
    <g transform="translate(338, 160)">
      <rect width="125" height="52" rx="6" fill="#312e81" stroke="#818cf8" stroke-width="1" />
      <text x="10" y="17" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#c7d2fe">6. NATIONAL MOTTO</text>
      <text x="10" y="32" font-family="system-ui, sans-serif" font-size="8.5" font-weight="600" fill="#ffffff">Unity &amp; Faith,</text>
      <text x="10" y="44" font-family="system-ui, sans-serif" font-size="7.5" fill="#a5b4fc">Peace &amp; Progress</text>
    </g>

    <!-- Bottom summary row in right panel -->
    <rect x="12" y="222" width="451" height="114" rx="8" fill="#0f172a" stroke="#334155" />
    <text x="24" y="242" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#38bdf8">HERALDIC CONSTITUTIONAL SIGNIFICANCE:</text>
    <text x="24" y="260" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1">• The Black Shield represents the nation's fertile agricultural land.</text>
    <text x="24" y="276" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1">• The Silver Pall 'Y' commemorates the confluence where the River Benue joins the River Niger at Lokoja.</text>
    <text x="24" y="292" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1">• The two white stallions represent national dignity and stature.</text>
    <text x="24" y="308" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1">• The red eagle represents federal strength, vision, and unyielding patriotic courage.</text>
    <text x="24" y="324" font-family="system-ui, sans-serif" font-size="9" fill="#facc15">• The floral base displays Costus Spectabilis, Nigeria's indigenous yellow wild flower.</text>
  </g>

  <!-- Bottom Invariant Banner -->
  <rect x="20" y="430" width="740" height="54" rx="8" fill="#0c1d2e" stroke="#10b981" stroke-width="1.2" />
  <circle cx="42" cy="457" r="9" fill="#065f46" stroke="#10b981" />
  <text x="42" y="461" font-family="system-ui, sans-serif" font-size="11" font-weight="900" fill="#34d399" text-anchor="middle">★</text>
  <text x="62" y="449" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#ecfdf5">CIVIC INVARIANT (CONSTITUTIONAL EMBLEMS PROTOCOL):</text>
  <text x="62" y="466" font-family="system-ui, sans-serif" font-size="9" font-weight="500" fill="#94a3b8">The Coat of Arms is the supreme seal of state sovereignty. Every citizen must show solemn reverence to national emblems; flying a defaced, frayed, or altered flag is an offense against national dignity.</text>
</svg>`
  }
};
