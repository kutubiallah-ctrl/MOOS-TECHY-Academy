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
    takeaway: "The axis of symmetry lies midway between the roots at x = 2. The sign of 'a' (+1) determines that the parabola opens upward.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parabola y = x squared minus 4x plus 3 with vertex, axis of symmetry, and discriminant classification">
  <rect width="720" height="340" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">PARABOLIC GEOMETRY &amp; DISCRIMINANT: y = x² - 4x + 3 = (x - 2)² - 1</text>
  <!-- Grid & Axes -->
  <g transform="translate(40, 52)">
    <rect width="380" height="250" rx="10" fill="#1e293b" stroke="#334155" />
    <!-- Axes lines -->
    <line x1="25" y1="185" x2="360" y2="185" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="75" y1="20" x2="75" y2="235" stroke="#94a3b8" stroke-width="1.5" />
    <text x="364" y="189" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#cbd5e1">x</text>
    <text x="71" y="15" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#cbd5e1">y</text>
    <!-- Axis of symmetry x = 2 (pixel x = 195) -->
    <line x1="195" y1="22" x2="195" y2="235" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5,4" />
    <text x="202" y="34" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fbbf24">Axis x = -b/(2a) = 2</text>
    <!-- Parabola curve passing through (0,3)->(75,65), (1,0)->(135,185), (2,-1)->(195,225), (3,0)->(255,185), (4,3)->(315,65) -->
    <path d="M 55 28 Q 195 422 335 28" fill="none" stroke="#38bdf8" stroke-width="3.5" />
    <!-- Key points -->
    <circle cx="75" cy="65" r="5" fill="#a855f7" stroke="#ffffff" stroke-width="1.5" />
    <text x="84" y="68" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#e9d5ff">y-int (0, 3)</text>
    <circle cx="135" cy="185" r="6" fill="#22c55e" stroke="#ffffff" stroke-width="1.5" />
    <text x="108" y="173" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#86efac">Root (1, 0)</text>
    <circle cx="255" cy="185" r="6" fill="#22c55e" stroke="#ffffff" stroke-width="1.5" />
    <text x="242" y="173" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#86efac">Root (3, 0)</text>
    <circle cx="195" cy="225" r="6" fill="#f43f5e" stroke="#ffffff" stroke-width="1.5" />
    <text x="195" y="243" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fda4af" text-anchor="middle">Vertex Minimum (2, -1)</text>
  </g>
  <!-- Right Discriminant Reference Panel -->
  <g transform="translate(442, 52)">
    <rect width="254" height="250" rx="10" fill="#1e293b" stroke="#334155" />
    <text x="16" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#38bdf8">DISCRIMINANT CASES (Δ = b² - 4ac)</text>
    <rect x="14" y="42" width="226" height="58" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="24" y="62" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">Δ &gt; 0 : Two Distinct Real Roots</text>
    <text x="24" y="80" font-family="system-ui, sans-serif" font-size="10" fill="#d1fae5">Crosses x-axis twice (here Δ = 16 - 12 = 4)</text>
    <rect x="14" y="112" width="226" height="58" rx="8" fill="#78350f" stroke="#f59e0b" />
    <text x="24" y="132" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fde68a">Δ = 0 : One Repeated Real Root</text>
    <text x="24" y="150" font-family="system-ui, sans-serif" font-size="10" fill="#fef3c7">Tangent vertex touches x-axis at x = -b/(2a)</text>
    <rect x="14" y="182" width="226" height="58" rx="8" fill="#4c0519" stroke="#f43f5e" />
    <text x="24" y="202" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fda4af">Δ &lt; 0 : Complex Conjugate Roots</text>
    <text x="24" y="220" font-family="system-ui, sans-serif" font-size="10" fill="#ffe4e6">Parabola stays strictly above/below x-axis</text>
  </g>
</svg>`
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
  },
  "vis-linear-balance": {
    id: "vis-linear-balance",
    skillId: "skill-linear-equations",
    unitId: "unit-jss-algebra-linear",
    title: "Algebraic Balance Scale & Fraction-Clearing Pipeline",
    type: "process_diagram",
    caption: "Step-by-step equilibrium-preserving transformation solving (2y + 2)/4 - (y - 1)/3 = 2 cleanly to y = 7.",
    steps: [
      { step: 1, title: "Clear Denominators (× LCM 12)", description: "Scale both sides identically by 12 -> 3(2y + 2) - 4(y - 1) = 24." },
      { step: 2, title: "Distribute Signed Brackets", description: "Expand 6y + 6 - 4y + 4 = 24, guarding the double negative -4(-1) = +4." },
      { step: 3, title: "Isolate Variable & Verify", description: "2y + 10 = 24 -> 2y = 14 -> y = 7. Verification: (16/4) - (6/3) = 4 - 2 = 2." }
    ],
    takeaway: "Every valid equation transformation preserves horizontal beam equilibrium between Left-Hand Side and Right-Hand Side.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Linear equation balance beam and step transformation diagram">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">ALGEBRAIC BALANCE AXIOM: PRESERVING LHS = RHS THROUGH REVERSIBLE STEPS</text>
  <!-- Balance Scale Graphic -->
  <g transform="translate(30, 56)">
    <rect width="310" height="236" rx="10" fill="#1e293b" stroke="#334155" />
    <text x="155" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8" text-anchor="middle">EQUILIBRIUM BEAM: 3(2y + 2) - 4(y - 1) = 24</text>
    <!-- Fulcrum -->
    <polygon points="155,152 135,200 175,200" fill="#475569" stroke="#94a3b8" stroke-width="1.5" />
    <rect x="115" y="200" width="80" height="10" rx="3" fill="#64748b" />
    <!-- Beam -->
    <line x1="45" y1="150" x2="265" y2="150" stroke="#facc15" stroke-width="4" />
    <circle cx="155" cy="150" r="6" fill="#facc15" />
    <!-- Left Pan -->
    <line x1="55" y1="150" x2="55" y2="122" stroke="#94a3b8" stroke-width="1.5" />
    <rect x="16" y="72" width="110" height="50" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
    <text x="71" y="94" font-family="monospace" font-size="12" font-weight="800" fill="#ecfdf5" text-anchor="middle">LHS: 2y + 10</text>
    <text x="71" y="112" font-family="system-ui, sans-serif" font-size="9.5" fill="#6ee7b7" text-anchor="middle">At y=7: 14 + 10 = 24</text>
    <!-- Right Pan -->
    <line x1="255" y1="150" x2="255" y2="122" stroke="#94a3b8" stroke-width="1.5" />
    <rect x="184" y="72" width="110" height="50" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1.5" />
    <text x="239" y="94" font-family="monospace" font-size="12" font-weight="800" fill="#eff6ff" text-anchor="middle">RHS: 24</text>
    <text x="239" y="112" font-family="system-ui, sans-serif" font-size="9.5" fill="#93c5fd" text-anchor="middle">Scaled 2 × LCM(12)</text>
    <text x="155" y="226" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fde047" text-anchor="middle">Apply identical inverse operations to both pans</text>
  </g>
  <!-- Right Pipeline Steps -->
  <g transform="translate(360, 56)">
    <rect width="330" height="236" rx="10" fill="#1e293b" stroke="#334155" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#f8fafc">STROUD TRANSFORMATION SEQUENCE</text>
    <rect x="16" y="38" width="298" height="38" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="26" y="54" font-family="monospace" font-size="10.5" font-weight="700" fill="#38bdf8">1. × 12 : 3(2y + 2) - 4(y - 1) = 24</text>
    <text x="26" y="69" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8">Clear fractions using LCM(4, 3) = 12</text>
    <rect x="16" y="84" width="298" height="38" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="26" y="100" font-family="monospace" font-size="10.5" font-weight="700" fill="#fbbf24">2. Expand: 6y + 6 - 4y + 4 = 24</text>
    <text x="26" y="115" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8">Guard double-negative: (-4)(-1) = +4</text>
    <rect x="16" y="130" width="298" height="38" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="26" y="146" font-family="monospace" font-size="10.5" font-weight="700" fill="#a78bfa">3. Solve : 2y = 14  ⇒  y = 7</text>
    <text x="26" y="161" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8">Subtract 10 from both pans, divide by 2</text>
    <rect x="16" y="176" width="298" height="44" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="26" y="194" font-family="monospace" font-size="10.5" font-weight="800" fill="#6ee7b7">4. Check : (14+2)/4 - (7-1)/3 = 4 - 2 = 2</text>
    <text x="26" y="210" font-family="system-ui, sans-serif" font-size="9" fill="#d1fae5">Identity LHS = RHS verified on original equation</text>
  </g>
</svg>`
  },
  "vis-simultaneous-intersection": {
    id: "vis-simultaneous-intersection",
    skillId: "skill-simultaneous-eq",
    unitId: "unit-jss-algebra-linear",
    title: "Simultaneous Linear Intersection: (5, 3)",
    type: "coordinate_graph",
    caption: "Intersection of 2x + 3y = 19 (blue) and x - y = 2 (emerald) at unique coordinates (5, 3).",
    axes: {
      xLabel: "x",
      yLabel: "y",
      xMin: 0,
      xMax: 9,
      yMin: -1,
      yMax: 8
    },
    dataPoints: [
      { label: "Intersection", x: 5, y: 3, highlight: true, description: "Unique common solution (x = 5, y = 3)" },
      { label: "Line 1 y-int", x: 0, y: 6.33, description: "2x + 3y = 19 at x = 0" },
      { label: "Line 2 x-int", x: 2, y: 0, description: "x - y = 2 at y = 0" }
    ],
    takeaway: "A unique solution exists iff the two straight lines have non-equal gradients (a₁b₂ - a₂b₁ ≠ 0).",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Simultaneous linear intersection graph showing 2x+3y=19 meeting x-y=2 at (5,3)">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">GEOMETRIC MEANING OF SIMULTANEOUS SOLUTIONS: INTERSECTION AT (5, 3)</text>
  <g transform="translate(30, 50)">
    <rect width="400" height="245" rx="10" fill="#1e293b" stroke="#334155" />
    <!-- Axes -->
    <line x1="45" y1="205" x2="375" y2="205" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="45" y1="20" x2="45" y2="228" stroke="#94a3b8" stroke-width="1.5" />
    <text x="380" y="209" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#cbd5e1">x</text>
    <text x="41" y="15" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#cbd5e1">y</text>
    <!-- Scale: x: 0 at 45, 35px per unit; y: 0 at 205, 24px per unit -->
    <!-- Line 1: 2x+3y=19 => (0,6.33)->(45,53) to (8,1)->(325,181) -->
    <line x1="45" y1="53" x2="345" y2="197" stroke="#38bdf8" stroke-width="3" />
    <text x="72" y="50" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#7dd3fc">2x + 3y = 19</text>
    <!-- Line 2: x-y=2 => (1,-1)->(80,229) to (8,6)->(325,61) -->
    <line x1="80" y1="229" x2="325" y2="61" stroke="#10b981" stroke-width="3" />
    <text x="275" y="54" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#6ee7b7">x - y = 2</text>
    <!-- Intersection (5,3) => (220, 133) -->
    <line x1="220" y1="133" x2="220" y2="205" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="4,3" />
    <line x1="45" y1="133" x2="220" y2="133" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="4,3" />
    <circle cx="220" cy="133" r="6.5" fill="#f43f5e" stroke="#ffffff" stroke-width="2" />
    <rect x="230" y="114" width="125" height="24" rx="5" fill="#881337" stroke="#f43f5e" />
    <text x="292" y="130" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#ffffff" text-anchor="middle">Solution (5, 3)</text>
    <text x="220" y="220" font-family="system-ui, sans-serif" font-size="9.5" fill="#fbbf24" text-anchor="middle">x = 5</text>
    <text x="28" y="136" font-family="system-ui, sans-serif" font-size="9.5" fill="#fbbf24">y = 3</text>
  </g>
  <g transform="translate(448, 50)">
    <rect width="242" height="245" rx="10" fill="#1e293b" stroke="#334155" />
    <text x="14" y="26" font-family="system-ui, sans-serif" font-size="11.5" font-weight="800" fill="#f8fafc">SYSTEM CLASSIFICATION</text>
    <rect x="14" y="42" width="214" height="58" rx="7" fill="#064e3b" stroke="#10b981" />
    <text x="22" y="60" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#6ee7b7">1. Unique Intersection</text>
    <text x="22" y="77" font-family="system-ui, sans-serif" font-size="9.5" fill="#d1fae5">m₁ ≠ m₂  (a₁b₂ - a₂b₁ ≠ 0)</text>
    <text x="22" y="91" font-family="system-ui, sans-serif" font-size="9" fill="#a7f3d0">Consistent &amp; Independent</text>
    <rect x="14" y="108" width="214" height="58" rx="7" fill="#4c0519" stroke="#f43f5e" />
    <text x="22" y="126" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#fda4af">2. Parallel Lines (No Sol.)</text>
    <text x="22" y="143" font-family="system-ui, sans-serif" font-size="9.5" fill="#ffe4e6">m₁ = m₂ but intercepts differ</text>
    <text x="22" y="157" font-family="system-ui, sans-serif" font-size="9" fill="#fecdd3">Inconsistent system</text>
    <rect x="14" y="174" width="214" height="58" rx="7" fill="#1e3a8a" stroke="#3b82f6" />
    <text x="22" y="192" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#93c5fd">3. Coincident Lines (∞ Sol.)</text>
    <text x="22" y="209" font-family="system-ui, sans-serif" font-size="9.5" fill="#dbeafe">One equation is a scalar multiple</text>
    <text x="22" y="223" font-family="system-ui, sans-serif" font-size="9" fill="#bfdbfe">Every point on line satisfies both</text>
  </g>
</svg>`
  },
  "vis-concord-syntax-tree": {
    id: "vis-concord-syntax-tree",
    skillId: "skill-eng-concord",
    unitId: "unit-eng-concord-syntax",
    title: "Subject-Verb Concord Syntax Tree & Proximity Contrast",
    type: "flow_diagram",
    caption: "Structural parsing contrasting Head-Noun Agreement (bypassing parenthetical/prepositional modifiers) against Either/Neither Proximity Agreement.",
    steps: [
      { step: 1, title: "Locate Head Noun", description: "Isolate the primary subject head noun outside 'of...' or comma-delimited parentheticals." },
      { step: 2, title: "Distinguish Correlatives", description: "For 'either...or' / 'neither...nor', inspect the constituent closest to the verb blank." },
      { step: 3, title: "Verify Indefinite & Collective Cues", description: "'Every one / each' is strictly singular; collective nouns follow unitary vs divided cues." }
    ],
    takeaway: "Verbs bind to syntactic head nouns rather than adjacent nouns inside embedded prepositional phrases.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="English Subject-Verb Concord syntax tree showing head noun agreement vs proximity rule">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
    </marker>
  </defs>
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">SYNTACTIC CONCORD ARCHITECTURE: HEAD-NOUN LOCK VS PROXIMITY</text>
  <!-- Left Card: Head Noun Bypass -->
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11.5" font-weight="800" fill="#38bdf8">RULE 1: HEAD-NOUN PERCOLATION (IGNORE INTERVENERS)</text>
    <rect x="16" y="42" width="106" height="44" rx="7" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
    <text x="69" y="61" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#ffffff" text-anchor="middle">The principal</text>
    <text x="69" y="76" font-family="system-ui, sans-serif" font-size="9" fill="#6ee7b7" text-anchor="middle">HEAD NOUN (SG.)</text>
    <rect x="132" y="42" width="182" height="44" rx="7" fill="#334155" stroke="#64748b" stroke-dasharray="4,3" />
    <text x="223" y="61" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1" text-anchor="middle">, together with the teachers,</text>
    <text x="223" y="76" font-family="system-ui, sans-serif" font-size="8.5" fill="#94a3b8" text-anchor="middle">PARENTHETICAL MODIFIER (BYPASS)</text>
    <!-- Arc jumping over modifier -->
    <path d="M 69 88 Q 165 148 258 148" fill="none" stroke="#10b981" stroke-width="2.5" marker-end="url(#arrow)" />
    <rect x="195" y="128" width="118" height="42" rx="7" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
    <text x="254" y="146" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">IS attending</text>
    <text x="254" y="161" font-family="system-ui, sans-serif" font-size="9" fill="#6ee7b7" text-anchor="middle">SINGULAR VERB LOCK</text>
    <rect x="16" y="186" width="298" height="44" rx="7" fill="#0f172a" stroke="#475569" />
    <text x="26" y="204" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#fde047">Same Rule Applies To:</text>
    <text x="26" y="220" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1">'Every one of the applicants IS...'  |  'A herd of elephants WAS...'</text>
  </g>
  <!-- Right Card: Correlative Proximity -->
  <g transform="translate(368, 52)">
    <rect width="328" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.2" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11.5" font-weight="800" fill="#fbbf24">RULE 2: CORRELATIVE PROXIMITY (NEITHER / NOR)</text>
    <rect x="16" y="42" width="138" height="44" rx="7" fill="#334155" stroke="#64748b" />
    <text x="85" y="61" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Neither the prefect</text>
    <text x="85" y="76" font-family="system-ui, sans-serif" font-size="8.5" fill="#94a3b8" text-anchor="middle">DISTANT SUBJECT (IGNORED)</text>
    <rect x="166" y="42" width="146" height="44" rx="7" fill="#78350f" stroke="#f59e0b" stroke-width="1.5" />
    <text x="239" y="61" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#ffffff" text-anchor="middle">nor the delegates</text>
    <text x="239" y="76" font-family="system-ui, sans-serif" font-size="9" fill="#fde68a" text-anchor="middle">NEAREST NOUN (PLURAL)</text>
    <line x1="239" y1="88" x2="239" y2="125" stroke="#f59e0b" stroke-width="2.5" />
    <rect x="166" y="128" width="146" height="42" rx="7" fill="#78350f" stroke="#f59e0b" stroke-width="1.5" />
    <text x="239" y="146" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">WERE convinced</text>
    <text x="239" y="161" font-family="system-ui, sans-serif" font-size="9" fill="#fde68a" text-anchor="middle">PROXIMITY PLURAL VERB</text>
    <rect x="16" y="186" width="296" height="44" rx="7" fill="#0f172a" stroke="#475569" />
    <text x="26" y="204" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#fda4af">Notional Concord Trap:</text>
    <text x="26" y="220" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1">'The jury IS unanimous' (1 unit) vs 'The jury ARE divided in their views'</text>
  </g>
</svg>`
  },
  "vis-conditional-timeline": {
    id: "vis-conditional-timeline",
    skillId: "skill-eng-tenses-conditionals",
    unitId: "unit-eng-concord-syntax",
    title: "Conditional Tense Matrix & Mandative Subjunctive",
    type: "process_diagram",
    caption: "Timeline mapping Type 1/2/3 Conditional pairs, formal Type 3 inversion ('Had...'), and bare-infinitive Mandative Subjunctive clauses.",
    steps: [
      { step: 1, title: "Type 2 Unreal Present", description: "If + Past / were  ==>  would / could + base verb." },
      { step: 2, title: "Type 3 Unreal Past", description: "If + had + past participle  ==>  would / could + have + past participle." },
      { step: 3, title: "Mandative Subjunctive", description: "Recommend / demand / insist + that + Subject + bare infinitive (e.g. 'submit')." }
    ],
    takeaway: "Matching protasis (If-clause) and apodosis (result clause) tense morphology prevents unreal timeline contradictions.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="English Conditionals and Subjunctive Mood tense matrix diagram">
  <rect width="720" height="300" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">TEMPORAL MATRIX: CONDITIONALS (TYPES 1–3), INVERSION &amp; SUBJUNCTIVE</text>
  <!-- Timeline axis -->
  <line x1="36" y1="62" x2="684" y2="62" stroke="#64748b" stroke-width="2" />
  <circle cx="150" cy="62" r="5" fill="#f43f5e" />
  <text x="150" y="50" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fda4af" text-anchor="middle">ANTERIOR / UNREAL PAST</text>
  <circle cx="370" cy="62" r="5" fill="#f59e0b" />
  <text x="370" y="50" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fde68a" text-anchor="middle">UNREAL PRESENT</text>
  <circle cx="585" cy="62" r="5" fill="#10b981" />
  <text x="585" y="50" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">REAL CONTINGENCY / DEMAND</text>
  <!-- 3 Cards -->
  <g transform="translate(24, 82)">
    <rect width="214" height="196" rx="10" fill="#1e293b" stroke="#f43f5e" stroke-width="1.2" />
    <text x="14" y="24" font-family="system-ui, sans-serif" font-size="11.5" font-weight="800" fill="#fda4af">TYPE 3: UNREAL PAST</text>
    <text x="14" y="46" font-family="monospace" font-size="10" fill="#f8fafc">If + had + V-en</text>
    <text x="14" y="64" font-family="monospace" font-size="10" fill="#38bdf8">=&gt; would have + V-en</text>
    <text x="14" y="92" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1">'If team had calibrated,</text>
    <text x="14" y="106" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1">fault would have been prevented.'</text>
    <rect x="12" y="124" width="190" height="58" rx="6" fill="#4c0519" stroke="#f43f5e" />
    <text x="20" y="142" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#fecdd3">FORMAL INVERSION (NO 'IF'):</text>
    <text x="20" y="158" font-family="system-ui, sans-serif" font-size="9" fill="#ffffff">'Had the meteorologist issued</text>
    <text x="20" y="171" font-family="system-ui, sans-serif" font-size="9" fill="#ffffff">the alert, residents would have...'</text>
  </g>
  <g transform="translate(253, 82)">
    <rect width="214" height="196" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.2" />
    <text x="14" y="24" font-family="system-ui, sans-serif" font-size="11.5" font-weight="800" fill="#fde68a">TYPE 2: UNREAL PRESENT</text>
    <text x="14" y="46" font-family="monospace" font-size="10" fill="#f8fafc">If + Past / WERE</text>
    <text x="14" y="64" font-family="monospace" font-size="10" fill="#38bdf8">=&gt; would / could + V</text>
    <text x="14" y="92" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1">'If our lab WERE equipped,</text>
    <text x="14" y="106" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1">we could inspect capsids.'</text>
    <rect x="12" y="124" width="190" height="58" rx="6" fill="#78350f" stroke="#f59e0b" />
    <text x="20" y="142" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#fef3c7">PAST PERFECT SEQUENCE:</text>
    <text x="20" y="158" font-family="system-ui, sans-serif" font-size="9" fill="#ffffff">'By the time speaker arrived,</text>
    <text x="20" y="171" font-family="system-ui, sans-serif" font-size="9" fill="#ffffff">organizers HAD concluded...'</text>
  </g>
  <g transform="translate(482, 82)">
    <rect width="214" height="196" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.2" />
    <text x="14" y="24" font-family="system-ui, sans-serif" font-size="11.5" font-weight="800" fill="#6ee7b7">MANDATIVE SUBJUNCTIVE</text>
    <text x="14" y="46" font-family="monospace" font-size="9.5" fill="#f8fafc">recommend / insist + that</text>
    <text x="14" y="64" font-family="monospace" font-size="10" fill="#38bdf8">+ Subject + BARE VERB</text>
    <text x="14" y="92" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1">'The board recommended that</text>
    <text x="14" y="106" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1">each candidate SUBMIT a file.'</text>
    <rect x="12" y="124" width="190" height="58" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="20" y="142" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#d1fae5">ZERO -S INFLECTION RULE:</text>
    <text x="20" y="158" font-family="system-ui, sans-serif" font-size="9" fill="#ffffff">Never inflect with -s or -ed;</text>
    <text x="20" y="171" font-family="system-ui, sans-serif" font-size="9" fill="#ffffff">use bare infinitive ('submit', 'be').</text>
  </g>
</svg>`
  },
  "vis-pri-ict-ipo-cycle": {
    id: "vis-pri-ict-ipo-cycle",
    skillId: "skill-pf-computer-parts",
    unitId: "unit-pri-found-ict-1",
    title: "Computer Hardware Input-Process-Output (IPO) Pipeline",
    type: "flow_diagram",
    caption: "Information flows from Input peripherals (keyboard, mouse, mic) into the CPU & RAM for processing, then out to Monitor/Printer or Secondary Storage.",
    steps: [
      { step: 1, title: "Input Stage", description: "Keyboard, mouse, scanner, and microphone convert human actions into binary data." },
      { step: 2, title: "CPU Processing & RAM", description: "The CPU executes instructions using volatile RAM while permanently saving work to SSD/HDD storage." },
      { step: 3, title: "Output Stage", description: "Monitor screens, printers, and speakers present processed results to the user." }
    ],
    takeaway: "Every digital device follows the Input -> Processing + Memory -> Output architecture.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Computer hardware Input Process Output and Storage architecture diagram">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">DIGITAL ARCHITECTURE: INPUT → PROCESS (CPU) → OUTPUT &amp; STORAGE</text>
  <!-- Input -->
  <g transform="translate(24, 62)">
    <rect width="175" height="156" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" />
    <text x="87" y="24" font-family="system-ui, sans-serif" font-size="11.5" font-weight="800" fill="#38bdf8" text-anchor="middle">1. INPUT DEVICES</text>
    <rect x="16" y="38" width="143" height="28" rx="6" fill="#0c4a6e" />
    <text x="87" y="56" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#e0f2fe" text-anchor="middle">Keyboard &amp; Mouse</text>
    <rect x="16" y="74" width="143" height="28" rx="6" fill="#0c4a6e" />
    <text x="87" y="92" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#e0f2fe" text-anchor="middle">Scanner &amp; Webcam</text>
    <rect x="16" y="110" width="143" height="28" rx="6" fill="#0c4a6e" />
    <text x="87" y="128" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#e0f2fe" text-anchor="middle">Microphone (Audio In)</text>
  </g>
  <!-- Arrow 1 -->
  <line x1="205" y1="140" x2="245" y2="140" stroke="#38bdf8" stroke-width="3" />
  <polygon points="245,134 257,140 245,146" fill="#38bdf8" />
  <!-- CPU + Memory -->
  <g transform="translate(262, 54)">
    <rect width="196" height="172" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" />
    <text x="98" y="24" font-family="system-ui, sans-serif" font-size="11.5" font-weight="800" fill="#fbbf24" text-anchor="middle">2. SYSTEM UNIT (CPU)</text>
    <rect x="16" y="36" width="164" height="44" rx="7" fill="#78350f" stroke="#fbbf24" />
    <text x="98" y="55" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#ffffff" text-anchor="middle">ALU + Control Unit</text>
    <text x="98" y="70" font-family="system-ui, sans-serif" font-size="8.5" fill="#fde68a" text-anchor="middle">Fetch • Decode • Execute</text>
    <rect x="16" y="88" width="164" height="32" rx="6" fill="#312e81" stroke="#818cf8" />
    <text x="98" y="108" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#e0e7ff" text-anchor="middle">RAM (Fast Volatile Memory)</text>
    <rect x="16" y="128" width="164" height="32" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="98" y="148" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#d1fae5" text-anchor="middle">SSD / HDD (Permanent)</text>
  </g>
  <!-- Arrow 2 -->
  <line x1="464" y1="140" x2="504" y2="140" stroke="#10b981" stroke-width="3" />
  <polygon points="504,134 516,140 504,146" fill="#10b981" />
  <!-- Output -->
  <g transform="translate(521, 62)">
    <rect width="175" height="156" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5" />
    <text x="87" y="24" font-family="system-ui, sans-serif" font-size="11.5" font-weight="800" fill="#34d399" text-anchor="middle">3. OUTPUT DEVICES</text>
    <rect x="16" y="38" width="143" height="28" rx="6" fill="#064e3b" />
    <text x="87" y="56" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#ecfdf5" text-anchor="middle">Monitor (Visual Display)</text>
    <rect x="16" y="74" width="143" height="28" rx="6" fill="#064e3b" />
    <text x="87" y="92" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#ecfdf5" text-anchor="middle">Printer (Paper Copy)</text>
    <rect x="16" y="110" width="143" height="28" rx="6" fill="#064e3b" />
    <text x="87" y="128" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#ecfdf5" text-anchor="middle">Speakers (Audio Out)</text>
  </g>
  <!-- Bottom Care Banner -->
  <rect x="24" y="244" width="672" height="54" rx="8" fill="#1e293b" stroke="#475569" />
  <text x="40" y="266" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#fde047">SAFE WORKSTATION &amp; MEMORY RULE:</text>
  <text x="40" y="284" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1">Save documents to SSD/HDD before power-off because RAM clears when electricity stops; keep liquids and dust clear of vents.</text>
</svg>`
  },
  "vis-jss-energy-conservation": {
    id: "vis-jss-energy-conservation",
    skillId: "skill-js-energy-conversion",
    unitId: "unit-jss-stem-energy",
    title: "Law of Conservation of Energy & Power Efficiency Flow",
    type: "physics_schematic",
    caption: "Energy transforms between Gravitational Potential (mgh) and Kinetic (0.5mv²) while Power P = E/t and Efficiency = (Useful/Total) × 100%.",
    steps: [
      { step: 1, title: "Gravitational Potential", description: "At maximum height h, PE = mgh and KE = 0." },
      { step: 2, title: "Mid-Fall Exchange", description: "Total Mechanical Energy E_total = PE + KE remains constant without friction." },
      { step: 3, title: "Efficiency & Power", description: "Real systems lose thermal energy; Useful Output + Waste Heat = Total Input Energy." }
    ],
    takeaway: "Energy cannot be created or destroyed; total input energy always equals useful output plus dissipated waste.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Energy conservation conversion between PE and KE plus Sankey efficiency diagram">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">CONSERVATION OF ENERGY: PE ↔ KE EXCHANGE &amp; MOTOR EFFICIENCY</text>
  <!-- Left: Pendulum / Drop Tower -->
  <g transform="translate(24, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">MECHANICAL ENERGY SWAP (TOTAL = 200 J)</text>
    <!-- Top Mass -->
    <circle cx="72" cy="64" r="14" fill="#f59e0b" stroke="#fef3c7" stroke-width="2" />
    <text x="72" y="68" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#0f172a" text-anchor="middle">2kg</text>
    <text x="102" y="58" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fbbf24">Top (h = 10 m, v = 0)</text>
    <text x="102" y="74" font-family="monospace" font-size="9.5" fill="#fde68a">PE = 200 J | KE = 0 J</text>
    <!-- Fall arrow -->
    <line x1="72" y1="84" x2="72" y2="178" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,3" />
    <polygon points="67,174 72,184 77,174" fill="#94a3b8" />
    <!-- Midpoint -->
    <circle cx="72" cy="130" r="10" fill="#38bdf8" />
    <text x="102" y="126" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#7dd3fc">Mid-Fall (h = 5 m)</text>
    <text x="102" y="142" font-family="monospace" font-size="9.5" fill="#e0f2fe">PE = 100 J | KE = 100 J</text>
    <!-- Ground -->
    <line x1="30" y1="204" x2="296" y2="204" stroke="#10b981" stroke-width="3" />
    <circle cx="72" cy="190" r="12" fill="#10b981" />
    <text x="102" y="186" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#34d399">Ground Impact (h = 0 m)</text>
    <text x="102" y="200" font-family="monospace" font-size="9.5" fill="#d1fae5">PE = 0 J | KE = 200 J (v = √200)</text>
    <text x="160" y="230" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#cbd5e1" text-anchor="middle">PE + KE = mgh + ½mv² = Constant (No Friction)</text>
  </g>
  <!-- Right: Sankey Flow & Formulas -->
  <g transform="translate(362, 52)">
    <rect width="334" height="244" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.2" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#34d399">SANKEY ENERGY TRANSFER &amp; POWER (P = E/t)</text>
    <!-- Input bar -->
    <rect x="20" y="54" width="110" height="58" rx="4" fill="#3b82f6" />
    <text x="75" y="79" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">Electrical Input</text>
    <text x="75" y="96" font-family="monospace" font-size="10.5" font-weight="800" fill="#dbeafe" text-anchor="middle">1000 J</text>
    <!-- Useful output -->
    <path d="M 130 54 L 220 54 L 220 96 L 130 96 Z" fill="#10b981" />
    <polygon points="220,46 244,75 220,104" fill="#10b981" />
    <text x="252" y="71" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">Useful: 750 J</text>
    <text x="252" y="87" font-family="system-ui, sans-serif" font-size="9" fill="#d1fae5">(75% Efficiency)</text>
    <!-- Waste heat -->
    <path d="M 130 96 Q 170 112 185 138 L 210 138 Q 185 104 130 112 Z" fill="#f43f5e" />
    <text x="216" y="144" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#fda4af">Waste Heat: 250 J</text>
    <!-- Formulas -->
    <rect x="16" y="164" width="302" height="66" rx="8" fill="#0f172a" stroke="#475569" />
    <text x="26" y="184" font-family="monospace" font-size="10" font-weight="700" fill="#fde047">Power: P = Work / time = (F × d) / t  [Watts]</text>
    <text x="26" y="202" font-family="monospace" font-size="10" font-weight="700" fill="#38bdf8">η = (Useful Out / Total In) × 100%</text>
    <text x="26" y="219" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8">Example: 60 W bulb over 10 s uses 60 × 10 = 600 J</text>
  </g>
</svg>`
  },
  "vis-jss-binary-logic": {
    id: "vis-jss-binary-logic",
    skillId: "skill-js-binary-logic",
    unitId: "unit-jss-ict-architecture",
    title: "Binary Place Values & Fundamental Logic Gates (AND, OR, NOT)",
    type: "process_diagram",
    caption: "Positional base-2 place weights (2^7 down to 2^0) convert 10110₂ to 22₁₀ alongside truth-table behavior for AND, OR, and NOT gates.",
    steps: [
      { step: 1, title: "Base-2 Positional Weights", description: "Each binary bit carries power-of-two weight 2ⁿ (..., 16, 8, 4, 2, 1)." },
      { step: 2, title: "Division-by-2 Remainder", description: "Repeatedly divide decimal by 2 and read remainders bottom-to-top." },
      { step: 3, title: "Logic Gate Algebra", description: "AND outputs 1 iff both inputs are 1; OR outputs 1 if either is 1; NOT inverts." }
    ],
    takeaway: "Every byte (8 bits) encodes numbers 0–255 in binary, while Boolean gates combine 0/1 voltage levels inside CPU circuits.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Binary positional weights conversion and AND OR NOT logic gate diagram">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">BINARY POSITIONAL WEIGHTS (BASE-2) &amp; BOOLEAN LOGIC GATES</text>
  <!-- Top: Binary Place Values for 10110_2 = 22 -->
  <g transform="translate(24, 48)">
    <rect width="672" height="106" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2" />
    <text x="16" y="22" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">BINARY TO DECIMAL: 10110₂ = (1×16) + (0×8) + (1×4) + (1×2) + (0×1) = 22₁₀</text>
    <!-- 5 bit boxes -->
    <g transform="translate(36, 36)">
      <rect x="0" y="0" width="96" height="56" rx="7" fill="#0c4a6e" stroke="#38bdf8" />
      <text x="48" y="18" font-family="monospace" font-size="10" fill="#7dd3fc" text-anchor="middle">2⁴ = 16</text>
      <text x="48" y="42" font-family="monospace" font-size="18" font-weight="800" fill="#ffffff" text-anchor="middle">1</text>

      <rect x="116" y="0" width="96" height="56" rx="7" fill="#334155" stroke="#64748b" />
      <text x="164" y="18" font-family="monospace" font-size="10" fill="#cbd5e1" text-anchor="middle">2³ = 8</text>
      <text x="164" y="42" font-family="monospace" font-size="18" font-weight="800" fill="#94a3b8" text-anchor="middle">0</text>

      <rect x="232" y="0" width="96" height="56" rx="7" fill="#0c4a6e" stroke="#38bdf8" />
      <text x="280" y="18" font-family="monospace" font-size="10" fill="#7dd3fc" text-anchor="middle">2² = 4</text>
      <text x="280" y="42" font-family="monospace" font-size="18" font-weight="800" fill="#ffffff" text-anchor="middle">1</text>

      <rect x="348" y="0" width="96" height="56" rx="7" fill="#0c4a6e" stroke="#38bdf8" />
      <text x="396" y="18" font-family="monospace" font-size="10" fill="#7dd3fc" text-anchor="middle">2¹ = 2</text>
      <text x="396" y="42" font-family="monospace" font-size="18" font-weight="800" fill="#ffffff" text-anchor="middle">1</text>

      <rect x="464" y="0" width="96" height="56" rx="7" fill="#334155" stroke="#64748b" />
      <text x="512" y="18" font-family="monospace" font-size="10" fill="#cbd5e1" text-anchor="middle">2⁰ = 1</text>
      <text x="512" y="42" font-family="monospace" font-size="18" font-weight="800" fill="#94a3b8" text-anchor="middle">0</text>
    </g>
  </g>
  <!-- Bottom: 3 Gate Cards -->
  <g transform="translate(24, 170)">
    <rect width="214" height="128" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="107" y="22" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#34d399" text-anchor="middle">AND GATE (A · B)</text>
    <path d="M 62 38 L 94 38 A 20 20 0 0 1 94 78 L 62 78 Z" fill="#064e3b" stroke="#10b981" stroke-width="2" />
    <line x1="36" y1="48" x2="62" y2="48" stroke="#94a3b8" stroke-width="2" />
    <line x1="36" y1="68" x2="62" y2="68" stroke="#94a3b8" stroke-width="2" />
    <line x1="114" y1="58" x2="146" y2="58" stroke="#10b981" stroke-width="2" />
    <text x="107" y="102" font-family="monospace" font-size="9.5" fill="#d1fae5" text-anchor="middle">1 AND 1 = 1 (else 0)</text>
    <text x="107" y="117" font-family="system-ui, sans-serif" font-size="8.5" fill="#94a3b8" text-anchor="middle">Output HIGH iff BOTH HIGH</text>
  </g>
  <g transform="translate(253, 170)">
    <rect width="214" height="128" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="107" y="22" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24" text-anchor="middle">OR GATE (A + B)</text>
    <path d="M 60 38 Q 76 58 60 78 Q 98 78 118 58 Q 98 38 60 38 Z" fill="#78350f" stroke="#f59e0b" stroke-width="2" />
    <line x1="36" y1="48" x2="64" y2="48" stroke="#94a3b8" stroke-width="2" />
    <line x1="36" y1="68" x2="64" y2="68" stroke="#94a3b8" stroke-width="2" />
    <line x1="118" y1="58" x2="146" y2="58" stroke="#f59e0b" stroke-width="2" />
    <text x="107" y="102" font-family="monospace" font-size="9.5" fill="#fef3c7" text-anchor="middle">0 OR 0 = 0 (else 1)</text>
    <text x="107" y="117" font-family="system-ui, sans-serif" font-size="8.5" fill="#94a3b8" text-anchor="middle">Output HIGH if ANY HIGH</text>
  </g>
  <g transform="translate(482, 170)">
    <rect width="214" height="128" rx="10" fill="#1e293b" stroke="#f43f5e" />
    <text x="107" y="22" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fda4af" text-anchor="middle">NOT GATE (Inverter Ā)</text>
    <polygon points="66,38 66,78 106,58" fill="#4c0519" stroke="#f43f5e" stroke-width="2" />
    <circle cx="111" cy="58" r="5" fill="#0f172a" stroke="#f43f5e" stroke-width="2" />
    <line x1="38" y1="58" x2="66" y2="58" stroke="#94a3b8" stroke-width="2" />
    <line x1="116" y1="58" x2="146" y2="58" stroke="#f43f5e" stroke-width="2" />
    <text x="107" y="102" font-family="monospace" font-size="9.5" fill="#ffe4e6" text-anchor="middle">NOT 1 = 0 | NOT 0 = 1</text>
    <text x="107" y="117" font-family="system-ui, sans-serif" font-size="8.5" fill="#94a3b8" text-anchor="middle">1 Byte = 8 Bits (0–255)</text>
  </g>
</svg>`
  },
  "vis-trig-bearings": {
    id: "vis-trig-bearings",
    skillId: "skill-sine-cosine-rule",
    unitId: "unit-sss-trig-bearings",
    title: "Sine/Cosine Rules & Three-Figure Navigational Bearings",
    type: "coordinate_graph",
    caption: "Vector navigation triangle BCD demonstrating North-line parallel angles (bearing 040° to C, back-bearing 220°, turn 160° -> interior 60°) and Cosine Rule BD = 7 km.",
    steps: [
      { step: 1, title: "Parallel North Lines", description: "Draw vertical True North arrows at every turning point (B, C)." },
      { step: 2, title: "Interior Angle Deduction", description: "Back bearing 040° + 180° = 220° minus forward bearing 160° = 60°." },
      { step: 3, title: "Cosine Rule Closure", description: "BD² = 5² + 8² - 2(5)(8)cos(60°) = 49 => BD = 7 km." }
    ],
    takeaway: "SAS triangles use Cosine Rule; AAS/ASA triangles use Sine Rule; Bearings always sweep clockwise from True North.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three-figure bearing navigation triangle showing Cosine Rule BD equals 7 km">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">NAVIGATIONAL BEARINGS &amp; GENERAL TRIANGLE SOLVER (SINE / COSINE RULES)</text>
  <!-- Left Triangle Diagram -->
  <g transform="translate(24, 52)">
    <rect width="380" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <!-- North Line at B -->
    <line x1="76" y1="196" x2="76" y2="56" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3" />
    <text x="76" y="48" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#cbd5e1" text-anchor="middle">N</text>
    <!-- North Line at C -->
    <line x1="168" y1="210" x2="168" y2="30" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3" />
    <text x="168" y="22" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#cbd5e1" text-anchor="middle">N</text>
    <!-- Triangle B(76,196) -> C(168,78) -> D(292,196) -->
    <polygon points="76,196 168,78 292,196" fill="rgba(56,189,248,0.12)" stroke="#38bdf8" stroke-width="2.5" />
    <line x1="76" y1="196" x2="292" y2="196" stroke="#10b981" stroke-width="3" />
    <circle cx="76" cy="196" r="5" fill="#fbbf24" />
    <circle cx="168" cy="78" r="5" fill="#fbbf24" />
    <circle cx="292" cy="196" r="5" fill="#10b981" />
    <text x="58" y="210" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fde047">B</text>
    <text x="178" y="72" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fde047">C (∠60°)</text>
    <text x="298" y="210" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#34d399">D</text>
    <!-- Bearing arcs & labels -->
    <path d="M 76 154 A 42 42 0 0 1 102 162" fill="none" stroke="#f59e0b" stroke-width="2" />
    <text x="90" y="142" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#fbbf24">040°</text>
    <text x="104" y="114" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#7dd3fc">5 km</text>
    <text x="238" y="132" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#7dd3fc">8 km</text>
    <text x="206" y="102" font-family="system-ui, sans-serif" font-size="9" fill="#fda4af">Bearing 160°</text>
    <text x="184" y="214" font-family="monospace" font-size="11" font-weight="800" fill="#6ee7b7" text-anchor="middle">BD = 7 km</text>
  </g>
  <!-- Right Decision Matrix -->
  <g transform="translate(420, 52)">
    <rect width="276" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="14" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#34d399">FORMULA SELECTION GUIDE</text>
    <rect x="14" y="38" width="248" height="60" rx="7" fill="#0f172a" stroke="#38bdf8" />
    <text x="22" y="56" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8">Cosine Rule (SAS / SSS):</text>
    <text x="22" y="74" font-family="monospace" font-size="9.5" fill="#f8fafc">c² = a² + b² - 2ab cos(C)</text>
    <text x="22" y="90" font-family="monospace" font-size="9" fill="#94a3b8">BD² = 25 + 64 - 80(0.5) = 49</text>
    <rect x="14" y="106" width="248" height="58" rx="7" fill="#0f172a" stroke="#f59e0b" />
    <text x="22" y="124" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">Sine Rule (AAS / ASA / SSA):</text>
    <text x="22" y="142" font-family="monospace" font-size="9.5" fill="#f8fafc">a / sin A = b / sin B = c / sin C</text>
    <text x="22" y="156" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8">Needs at least 1 opposite (side, angle)</text>
    <rect x="14" y="172" width="248" height="58" rx="7" fill="#064e3b" stroke="#10b981" />
    <text x="22" y="190" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">Back Bearing &amp; Area:</text>
    <text x="22" y="207" font-family="monospace" font-size="9.5" fill="#ecfdf5">Back = Forward ± 180° (0..360°)</text>
    <text x="22" y="222" font-family="monospace" font-size="9.5" fill="#ecfdf5">Area = ½ ab sin C</text>
  </g>
</svg>`
  },
  "vis-indices-logarithms": {
    id: "vis-indices-logarithms",
    skillId: "skill-logarithms",
    unitId: "unit-indices-logs",
    title: "Inverse Reflection: Exponential y = 2^x vs Logarithmic y = log₂(x)",
    type: "coordinate_graph",
    caption: "Graphs of y = 2^x and y = log₂(x) reflected across symmetry axis y = x, showing domain restriction x > 0 for real logarithms.",
    steps: [
      { step: 1, title: "Exponential Growth", description: "y = 2^x passes through (0, 1), (1, 2), (2, 4) for all real x." },
      { step: 2, title: "Mirror Symmetry y = x", description: "Swapping (x, y) -> (y, x) maps b^y = x directly to y = log_b(x)." },
      { step: 3, title: "Strict Domain x > 0", description: "y = log₂(x) passes through (1, 0), (2, 1), (4, 2) and never touches x <= 0." }
    ],
    takeaway: "Because log_b(x) inverts b^y, its domain is strictly x > 0—always reject extraneous negative roots.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Reflection of exponential y equals 2 to the x and logarithm y equals log base 2 of x across y equals x">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">EXPONENTIAL–LOGARITHMIC INVERSE SYMMETRY &amp; INDEX LAWS</text>
  <!-- Left Coordinate Graph -->
  <g transform="translate(24, 52)">
    <rect width="366" height="244" rx="10" fill="#1e293b" stroke="#334155" />
    <!-- Axes: origin at (120, 175), 34px/unit -->
    <line x1="25" y1="175" x2="345" y2="175" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="120" y1="18" x2="120" y2="230" stroke="#94a3b8" stroke-width="1.5" />
    <text x="348" y="179" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1">x</text>
    <text x="115" y="14" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1">y</text>
    <!-- Mirror line y = x -->
    <line x1="70" y1="225" x2="275" y2="20" stroke="#64748b" stroke-width="1.5" stroke-dasharray="5,4" />
    <text x="255" y="38" font-family="system-ui, sans-serif" font-size="9.5" fill="#94a3b8">y = x</text>
    <!-- Exponential y = 2^x -->
    <path d="M 35 172 Q 95 168 120 141 Q 154 107 188 39" fill="none" stroke="#38bdf8" stroke-width="3" />
    <circle cx="120" cy="141" r="4.5" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5" />
    <text x="72" y="135" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#7dd3fc">(0,1)</text>
    <text x="155" y="36" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8">y = 2ˣ</text>
    <!-- Log y = log2(x) -->
    <path d="M 124 228 Q 134 190 154 175 Q 188 141 256 107" fill="none" stroke="#10b981" stroke-width="3" />
    <circle cx="154" cy="175" r="4.5" fill="#10b981" stroke="#ffffff" stroke-width="1.5" />
    <text x="158" y="191" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#6ee7b7">(1,0)</text>
    <circle cx="256" cy="107" r="4.5" fill="#fbbf24" stroke="#ffffff" stroke-width="1.5" />
    <text x="262" y="106" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#fde047">(4,2)</text>
    <text x="225" y="135" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#34d399">y = log₂(x)</text>
    <text x="183" y="236" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#fda4af" text-anchor="middle">Domain restriction: log_b(x) requires x &gt; 0</text>
  </g>
  <!-- Right Laws Summary -->
  <g transform="translate(406, 52)">
    <rect width="290" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="14" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">FIVE CORE LOG &amp; INDEX IDENTITIES</text>
    <rect x="14" y="38" width="262" height="36" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="24" y="54" font-family="monospace" font-size="10" font-weight="700" fill="#34d399">log(xy) = log x + log y</text>
    <text x="24" y="68" font-family="system-ui, sans-serif" font-size="8.5" fill="#94a3b8">Product law (NEVER log(x+y))</text>
    <rect x="14" y="82" width="262" height="36" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="24" y="98" font-family="monospace" font-size="10" font-weight="700" fill="#38bdf8">log(x/y) = log x - log y</text>
    <text x="24" y="112" font-family="system-ui, sans-serif" font-size="8.5" fill="#94a3b8">log₂(80) - log₂(5) = log₂(16) = 4</text>
    <rect x="14" y="126" width="262" height="36" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="24" y="142" font-family="monospace" font-size="10" font-weight="700" fill="#fbbf24">log_b(xᵏ) = k · log_b(x)</text>
    <text x="24" y="156" font-family="system-ui, sans-serif" font-size="8.5" fill="#94a3b8">Power law solves 3^(2x-1) = 45</text>
    <rect x="14" y="170" width="262" height="60" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="24" y="188" font-family="monospace" font-size="10" font-weight="700" fill="#ecfdf5">log_b(a) = log₁₀(a) / log₁₀(b)</text>
    <text x="24" y="206" font-family="monospace" font-size="9.5" fill="#d1fae5">x^(-m/n) = 1 / (ⁿ√x)ᵐ</text>
    <text x="24" y="221" font-family="system-ui, sans-serif" font-size="8.5" fill="#a7f3d0">27^(2/3) × 4^(-1/2) = 9 × ½ = 9/2</text>
  </g>
</svg>`
  },
  "vis-sequences-ap-gp": {
    id: "vis-sequences-ap-gp",
    skillId: "skill-arithmetic-progression",
    unitId: "unit-sequences-series",
    title: "Linear AP Growth vs Convergent GP Partial Sums",
    type: "bar_chart",
    caption: "Comparing constant additive step (+d) in Arithmetic Progressions with multiplicative scaling (×r) and convergent infinite sum S_∞ = a/(1-r) for |r| < 1.",
    steps: [
      { step: 1, title: "AP Constant Difference", description: "Each term rises by +d: T_n = a + (n-1)d, forming a straight line." },
      { step: 2, title: "GP Constant Ratio", description: "Each term scales by ×r: T_n = a r^(n-1)." },
      { step: 3, title: "Infinite Convergence", description: "When |r| < 1, terms decay to 0 and S_n approaches ceiling a/(1-r)." }
    ],
    takeaway: "AP adds d at every step; GP multiplies by r and converges infinitely strictly when -1 < r < 1.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comparison of Arithmetic Progression linear bars versus convergent Geometric Progression bars">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">SEQUENCES &amp; SERIES: ARITHMETIC (+d) VS CONVERGENT GEOMETRIC (×r)</text>
  <!-- Left: AP Linear Steps -->
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">AP: 3, 7, 11, 15, 19  (a = 3, d = +4)</text>
    <!-- Axis -->
    <line x1="34" y1="178" x2="306" y2="178" stroke="#94a3b8" stroke-width="1.5" />
    <!-- Bars: heights 21, 49, 77, 105, 133 -->
    <rect x="46" y="157" width="36" height="21" rx="3" fill="#0284c7" />
    <text x="64" y="151" font-family="monospace" font-size="9.5" fill="#e0f2fe" text-anchor="middle">3</text>
    <rect x="98" y="129" width="36" height="49" rx="3" fill="#0284c7" />
    <text x="116" y="123" font-family="monospace" font-size="9.5" fill="#e0f2fe" text-anchor="middle">7</text>
    <rect x="150" y="101" width="36" height="77" rx="3" fill="#0ea5e9" />
    <text x="168" y="95" font-family="monospace" font-size="9.5" fill="#e0f2fe" text-anchor="middle">11</text>
    <rect x="202" y="73" width="36" height="105" rx="3" fill="#0ea5e9" />
    <text x="220" y="67" font-family="monospace" font-size="9.5" fill="#e0f2fe" text-anchor="middle">15</text>
    <rect x="254" y="45" width="36" height="133" rx="3" fill="#38bdf8" />
    <text x="272" y="39" font-family="monospace" font-size="9.5" fill="#ffffff" text-anchor="middle">19</text>
    <line x1="64" y1="157" x2="272" y2="45" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4,3" />
    <text x="165" y="198" font-family="monospace" font-size="10" font-weight="700" fill="#fde047" text-anchor="middle">Tₙ = a + (n - 1)d</text>
    <text x="165" y="216" font-family="monospace" font-size="10" font-weight="700" fill="#7dd3fc" text-anchor="middle">Sₙ = (n/2)[2a + (n - 1)d]</text>
    <text x="165" y="232" font-family="system-ui, sans-serif" font-size="8.5" fill="#94a3b8" text-anchor="middle">T_p - T_q = (p - q)d</text>
  </g>
  <!-- Right: Convergent GP -->
  <g transform="translate(368, 52)">
    <rect width="328" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#34d399">GP: 64, 32, 16, 8, 4... (r = ½, |r| &lt; 1)</text>
    <!-- Ceiling line S_inf = 128 -->
    <line x1="28" y1="54" x2="302" y2="54" stroke="#f43f5e" stroke-width="2" stroke-dasharray="5,3" />
    <text x="165" y="47" font-family="monospace" font-size="9.5" font-weight="800" fill="#fda4af" text-anchor="middle">Convergent Limit S∞ = a/(1-r) = 128</text>
    <!-- Stacked sum blocks reaching 128 -->
    <rect x="42" y="114" width="110" height="64" rx="4" fill="#065f46" stroke="#10b981" />
    <text x="97" y="150" font-family="monospace" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">T₁ = 64</text>
    <rect x="42" y="82" width="110" height="32" rx="4" fill="#047857" stroke="#34d399" />
    <text x="97" y="102" font-family="monospace" font-size="9.5" font-weight="700" fill="#ecfdf5" text-anchor="middle">+32 (96)</text>
    <rect x="42" y="66" width="110" height="16" rx="3" fill="#059669" />
    <text x="97" y="77" font-family="monospace" font-size="8.5" fill="#ffffff" text-anchor="middle">+16 (112)</text>
    <rect x="42" y="57" width="110" height="9" rx="2" fill="#10b981" />
    <!-- Formulas -->
    <rect x="168" y="66" width="144" height="112" rx="8" fill="#0f172a" stroke="#475569" />
    <text x="178" y="86" font-family="monospace" font-size="9.5" font-weight="700" fill="#6ee7b7">Tₙ = a · rⁿ⁻¹</text>
    <text x="178" y="110" font-family="monospace" font-size="9" fill="#f8fafc">Sₙ = a(rⁿ - 1)/(r - 1)</text>
    <text x="178" y="134" font-family="monospace" font-size="9.5" font-weight="700" fill="#fda4af">S∞ = a / (1 - r)</text>
    <text x="178" y="152" font-family="system-ui, sans-serif" font-size="8.5" fill="#cbd5e1">Valid ONLY if</text>
    <text x="178" y="166" font-family="monospace" font-size="9" font-weight="700" fill="#fde047">-1 &lt; r &lt; 1</text>
    <text x="164" y="210" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1" text-anchor="middle">Finite example (a=3, r=2): 3(2⁶ - 1) = 189</text>
    <text x="164" y="228" font-family="system-ui, sans-serif" font-size="8.5" fill="#94a3b8" text-anchor="middle">If |r| &gt;= 1, infinite series diverges to ∞</text>
  </g>
</svg>`
  },
  "vis-coord-perpendicular-bisector": {
    id: "vis-coord-perpendicular-bisector",
    skillId: "skill-line-gradients",
    unitId: "unit-coord-geometry",
    title: "Perpendicular Bisector, Midpoint & Negative Reciprocal Gradient",
    type: "coordinate_graph",
    caption: "Cartesian plot of segment AB from A(2, 4) to B(6, 12) showing Midpoint M(4, 8) and orthogonal bisector x + 2y = 20 (m₁ · m₂ = 2 × (-1/2) = -1).",
    steps: [
      { step: 1, title: "Locate Midpoint M", description: "Average coordinates: M = ((2+6)/2, (4+12)/2) = (4, 8)." },
      { step: 2, title: "Compute Segment Gradient", description: "m_AB = (12 - 4)/(6 - 2) = +2." },
      { step: 3, title: "Apply Orthogonal Slope", description: "m_perp = -1/m_AB = -1/2 through (4, 8) => x + 2y = 20." }
    ],
    takeaway: "Every point on the perpendicular bisector lies equidistant from A and B and satisfies m₁ · m₂ = -1.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate geometry perpendicular bisector of AB passing through midpoint (4,8) with right angle marker">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">COORDINATE GEOMETRY: MIDPOINT, DISTANCE &amp; PERPENDICULAR BISECTOR</text>
  <!-- Left Cartesian Plot -->
  <g transform="translate(24, 52)">
    <rect width="380" height="244" rx="10" fill="#1e293b" stroke="#334155" />
    <line x1="48" y1="210" x2="355" y2="210" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="48" y1="20" x2="48" y2="225" stroke="#94a3b8" stroke-width="1.5" />
    <text x="360" y="214" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1">x</text>
    <text x="43" y="15" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1">y</text>
    <!-- Segment AB: A(2,4)->(108,162), M(4,8)->(168,114), B(6,12)->(228,66) -->
    <line x1="108" y1="162" x2="228" y2="66" stroke="#38bdf8" stroke-width="3" />
    <!-- Perpendicular bisector through (168,114) slope -0.5 in screen coords: dx=90 => dy=+56? Wait screen y down: segment slope screen = -96/+120 = -0.8, perp = +1.25 -->
    <line x1="88" y1="50" x2="278" y2="202" stroke="#10b981" stroke-width="3" />
    <!-- Right angle square at M(168,114) -->
    <polygon points="168,114 178,106 186,116 176,124" fill="rgba(251,191,36,0.3)" stroke="#fbbf24" stroke-width="1.5" />
    <circle cx="108" cy="162" r="5" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5" />
    <text x="72" y="178" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#7dd3fc">A(2, 4)</text>
    <circle cx="228" cy="66" r="5" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5" />
    <text x="234" y="64" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#7dd3fc">B(6, 12)</text>
    <circle cx="168" cy="114" r="5.5" fill="#f43f5e" stroke="#ffffff" stroke-width="1.5" />
    <text x="180" y="102" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fda4af">Midpoint M(4, 8)</text>
    <text x="240" y="160" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#6ee7b7">x + 2y = 20</text>
    <text x="240" y="174" font-family="monospace" font-size="9" fill="#a7f3d0">m₂ = -½ (90°)</text>
  </g>
  <!-- Right Formulas -->
  <g transform="translate(420, 52)">
    <rect width="276" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="14" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#34d399">CORE COORDINATE LAWS</text>
    <rect x="14" y="38" width="248" height="44" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="22" y="56" font-family="monospace" font-size="10" font-weight="700" fill="#38bdf8">m = (y₂ - y₁) / (x₂ - x₁)</text>
    <text x="22" y="72" font-family="system-ui, sans-serif" font-size="8.5" fill="#94a3b8">m_AB = (12 - 4)/(6 - 2) = +2</text>
    <rect x="14" y="90" width="248" height="44" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="22" y="108" font-family="monospace" font-size="10" font-weight="700" fill="#fbbf24">M = ((x₁+x₂)/2, (y₁+y₂)/2)</text>
    <text x="22" y="124" font-family="system-ui, sans-serif" font-size="8.5" fill="#94a3b8">d = √[(x₂ - x₁)² + (y₂ - y₁)²]</text>
    <rect x="14" y="142" width="248" height="88" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="22" y="160" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">Parallel vs Perpendicular:</text>
    <text x="22" y="178" font-family="monospace" font-size="9.5" fill="#ecfdf5">Parallel: m₁ = m₂</text>
    <text x="22" y="196" font-family="monospace" font-size="9.5" fill="#ecfdf5">Perpendicular: m₁ · m₂ = -1</text>
    <text x="22" y="216" font-family="monospace" font-size="9.5" fill="#fde68a">Line: y - y₁ = m(x - x₁)</text>
  </g>
</svg>`
  },
  "vis-circle-theorems-geometry": {
    id: "vis-circle-theorems-geometry",
    skillId: "skill-circle-theorems",
    unitId: "unit-sss-circle-theorems",
    title: "Circle Theorems: Central Angle, Cyclic Quad & Tangent-Radius",
    type: "physics_schematic",
    caption: "Visual proof summary of ∠Center = 2∠Circumference (140° vs 70°), Cyclic Quadrilateral opposite sum (70° + 110° = 180°), and Radius ⊥ Tangent (90°).",
    steps: [
      { step: 1, title: "Angle at Center", description: "Arc AC subtends 140° at center O and 70° at circumference D." },
      { step: 2, title: "Cyclic Quadrilateral", description: "Inscribed ABCD satisfies ∠ABC + ∠ADC = 180°." },
      { step: 3, title: "Tangent-Radius & Alternate Segment", description: "OT ⊥ PT (90°); tangent-chord angle equals opposite segment angle." }
    ],
    takeaway: "Every circle theorem links chord/arc geometry to exact invariants (×2, 90°, 180°, or equal alternate angles).",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Circle theorems diagram showing central angle 2x, cyclic quadrilateral 180 degrees, and 90 degree tangent radius">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">CIRCLE THEOREMS: CENTRAL ANGLE, CYCLIC QUADRILATERAL &amp; TANGENT</text>
  <!-- Left Circle: Central Angle & Cyclic Quad -->
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="165" y="22" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#38bdf8" text-anchor="middle">CENTER = 2×CIRC &amp; CYCLIC QUAD (180°)</text>
    <circle cx="165" cy="134" r="82" fill="none" stroke="#64748b" stroke-width="2" />
    <circle cx="165" cy="134" r="4" fill="#fbbf24" />
    <text x="172" y="138" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#fbbf24">O</text>
    <!-- Points A(94,175), C(236,175), D(165,52), B(165,216) -->
    <!-- Chord/radii from O to A and C -->
    <line x1="165" y1="134" x2="94" y2="175" stroke="#fbbf24" stroke-width="2" />
    <line x1="165" y1="134" x2="236" y2="175" stroke="#fbbf24" stroke-width="2" />
    <text x="165" y="162" font-family="monospace" font-size="9.5" font-weight="800" fill="#fde047" text-anchor="middle">140°</text>
    <!-- Inscribed D(165,52) to A, C -->
    <polygon points="165,52 94,175 165,216 236,175" fill="rgba(16,185,129,0.12)" stroke="#10b981" stroke-width="2" />
    <circle cx="94" cy="175" r="4" fill="#ffffff" />
    <text x="78" y="182" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#e2e8f0">A</text>
    <circle cx="236" cy="175" r="4" fill="#ffffff" />
    <text x="244" y="182" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#e2e8f0">C</text>
    <circle cx="165" cy="52" r="4" fill="#38bdf8" />
    <text x="165" y="44" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#7dd3fc" text-anchor="middle">D (70°)</text>
    <circle cx="165" cy="216" r="4" fill="#34d399" />
    <text x="165" y="232" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">B (110°) — Opp ∠ Sum = 180°</text>
  </g>
  <!-- Right Circle: Tangent-Radius & Alternate Segment -->
  <g transform="translate(368, 52)">
    <rect width="328" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="164" y="22" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#fbbf24" text-anchor="middle">RADIUS ⊥ TANGENT (90°) &amp; ALT. SEGMENT</text>
    <circle cx="122" cy="126" r="66" fill="none" stroke="#64748b" stroke-width="2" />
    <circle cx="122" cy="126" r="4" fill="#fbbf24" />
    <text x="112" y="122" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#fbbf24">O</text>
    <!-- Tangent point T(122,192), External P(278,192) -->
    <line x1="36" y1="192" x2="296" y2="192" stroke="#10b981" stroke-width="2.5" />
    <line x1="122" y1="126" x2="122" y2="192" stroke="#38bdf8" stroke-width="2.5" />
    <line x1="122" y1="126" x2="278" y2="192" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4,3" />
    <rect x="122" y="180" width="12" height="12" fill="none" stroke="#fbbf24" stroke-width="1.5" />
    <circle cx="122" cy="192" r="4" fill="#ffffff" />
    <text x="118" y="208" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#ffffff">T</text>
    <circle cx="278" cy="192" r="4" fill="#f43f5e" />
    <text x="278" y="208" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#fda4af">P</text>
    <text x="104" y="164" font-family="monospace" font-size="9" fill="#7dd3fc">5</text>
    <text x="206" y="150" font-family="monospace" font-size="9" fill="#fda4af">OP = 13</text>
    <text x="200" y="208" font-family="monospace" font-size="9.5" font-weight="800" fill="#6ee7b7">PT = 12</text>
    <!-- Chord and alternate segment note -->
    <text x="164" y="230" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#fde68a" text-anchor="middle">Angle in Semicircle = 90° | Tangent-Chord = Alt. Segment</text>
  </g>
</svg>`
  },
  "vis-stats-dispersion-box": {
    id: "vis-stats-dispersion-box",
    skillId: "skill-stats-dispersion",
    unitId: "unit-statistics-probability",
    title: "Box-and-Whisker Five-Number Summary & Standard Deviation Spread",
    type: "bar_comparison",
    caption: "Visualizing Min, Q₁ = 14, Median Q₂ = 20, Q₃ = 27, Max (IQR = 13) alongside squared deviation bars for standard deviation σ = √[Σ(x-x̄)²/n].",
    steps: [
      { step: 1, title: "Locate Five-Number Summary", description: "Sort data ascending to split 25% quartiles: Q₁, Median Q₂, Q₃." },
      { step: 2, title: "Compute IQR Spread", description: "IQR = Q₃ - Q₁ isolates the central 50% immune to outliers." },
      { step: 3, title: "Evaluate Standard Deviation", description: "Square deviations from mean x̄, average, and take principal square root." }
    ],
    takeaway: "Use IQR + Median for skewed/outlier data, and Standard Deviation + Mean for symmetric distributions.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Five number summary box plot showing Q1, median Q2, Q3, IQR and standard deviation formula">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">MEASURES OF DISPERSION: BOX PLOT (IQR) &amp; STANDARD DEVIATION (σ)</text>
  <!-- Top: Box Plot for 11, 14, 17, 20, 23, 27, 31 -->
  <g transform="translate(24, 52)">
    <rect width="672" height="122" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="22" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">FIVE-NUMBER SUMMARY &amp; BOX PLOT: [11, 14, 17, 20, 23, 27, 31]</text>
    <!-- Scale line x=60 (val 10) to x=620 (val 32) => ~25px/unit -->
    <line x1="60" y1="96" x2="620" y2="96" stroke="#64748b" stroke-width="1.5" />
    <!-- Min 11 -> x=85, Q1 14 -> x=160, Q2 20 -> x=310, Q3 27 -> x=485, Max 31 -> x=585 -->
    <line x1="85" y1="62" x2="160" y2="62" stroke="#94a3b8" stroke-width="2.5" />
    <line x1="85" y1="48" x2="85" y2="76" stroke="#94a3b8" stroke-width="2.5" />
    <rect x="160" y="42" width="325" height="40" rx="4" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2" />
    <line x1="310" y1="42" x2="310" y2="82" stroke="#fbbf24" stroke-width="3" />
    <line x1="485" y1="62" x2="585" y2="62" stroke="#94a3b8" stroke-width="2.5" />
    <line x1="585" y1="48" x2="585" y2="76" stroke="#94a3b8" stroke-width="2.5" />
    <!-- Labels -->
    <text x="85" y="112" font-family="monospace" font-size="9.5" fill="#cbd5e1" text-anchor="middle">Min=11</text>
    <text x="160" y="112" font-family="monospace" font-size="9.5" font-weight="800" fill="#7dd3fc" text-anchor="middle">Q₁=14</text>
    <text x="310" y="112" font-family="monospace" font-size="9.5" font-weight="800" fill="#fde047" text-anchor="middle">Q₂=20</text>
    <text x="485" y="112" font-family="monospace" font-size="9.5" font-weight="800" fill="#7dd3fc" text-anchor="middle">Q₃=27</text>
    <text x="585" y="112" font-family="monospace" font-size="9.5" fill="#cbd5e1" text-anchor="middle">Max=31</text>
    <text x="398" y="66" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#ecfdf5" text-anchor="middle">IQR = Q₃ - Q₁ = 27 - 14 = 13</text>
  </g>
  <!-- Bottom Two Cards: SD and Probability -->
  <g transform="translate(24, 188)">
    <rect width="328" height="110" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="14" y="22" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#34d399">STANDARD DEVIATION: 2, 4, 6, 8, 10</text>
    <text x="14" y="44" font-family="monospace" font-size="9.5" fill="#f8fafc">Mean x̄ = 6  |  Deviations: -4, -2, 0, +2, +4</text>
    <text x="14" y="64" font-family="monospace" font-size="9.5" fill="#6ee7b7">σ² = (16+4+0+4+16)/5 = 40/5 = 8</text>
    <text x="14" y="86" font-family="monospace" font-size="10" font-weight="800" fill="#fde047">σ = √8 = 2√2 ≈ 2.83 (same units)</text>
  </g>
  <g transform="translate(368, 188)">
    <rect width="328" height="110" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="14" y="22" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#fbbf24">COMPLEMENT &amp; TWO-DICE PROBABILITY</text>
    <text x="14" y="44" font-family="monospace" font-size="9.5" fill="#f8fafc">Complement: P(Not E) = 1 - P(E)</text>
    <text x="14" y="64" font-family="monospace" font-size="9.5" fill="#fef3c7">Two Dice Outcomes: 6 × 6 = 36 pairs</text>
    <text x="14" y="86" font-family="monospace" font-size="9.5" font-weight="700" fill="#7dd3fc">P(Sum &gt; 9) = 6/36 = 1/6</text>
  </g>
</svg>`
  },
  "vis-matrices-determinant": {
    id: "vis-matrices-determinant",
    skillId: "skill-matrix-operations",
    unitId: "unit-vectors-matrices",
    title: "2×2 Matrix Inverse, Determinant Scaling & Dot-Product Orthogonality",
    type: "process_diagram",
    caption: "Visualizing det(A) = ad - bc as signed area scale, swapping diagonal & negating off-diagonal entries for A⁻¹, and dot product u · v = 0 for 90° vectors.",
    steps: [
      { step: 1, title: "Row-by-Column Product", description: "Entry (i, j) of AB equals Row i of A dotted with Column j of B (AB ≠ BA)." },
      { step: 2, title: "Determinant & Singularity", description: "det(A) = ad - bc; if det = 0, space collapses and A⁻¹ does not exist." },
      { step: 3, title: "Orthogonal Dot Product", description: "Vectors u and v meet at 90° iff u₁v₁ + u₂v₂ = 0." }
    ],
    takeaway: "Use A⁻¹ = (1/(ad-bc))[[d, -b], [-c, a]] to solve AX = B as X = A⁻¹B whenever ad - bc ≠ 0.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="2x2 Matrix determinant, inverse formula, and orthogonal vector dot product diagram">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">MATRICES, DETERMINANTS, INVERSES &amp; VECTOR ORTHOGONALITY</text>
  <!-- Left Card: 2x2 Matrix Inverse -->
  <g transform="translate(24, 52)">
    <rect width="346" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">2×2 MATRIX DETERMINANT &amp; INVERSE</text>
    <rect x="20" y="42" width="110" height="72" rx="8" fill="#0f172a" stroke="#64748b" />
    <text x="75" y="68" font-family="monospace" font-size="14" font-weight="800" fill="#fde047" text-anchor="middle">[ a   b ]</text>
    <text x="75" y="96" font-family="monospace" font-size="14" font-weight="800" fill="#7dd3fc" text-anchor="middle">[ c   d ]</text>
    <line x1="138" y1="78" x2="178" y2="78" stroke="#10b981" stroke-width="2.5" />
    <polygon points="178,72 190,78 178,84" fill="#10b981" />
    <rect x="196" y="42" width="130" height="72" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="261" y="62" font-family="monospace" font-size="10.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">1 / (ad - bc) ×</text>
    <text x="261" y="84" font-family="monospace" font-size="13" font-weight="800" fill="#ffffff" text-anchor="middle">[  d  -b ]</text>
    <text x="261" y="104" font-family="monospace" font-size="13" font-weight="800" fill="#ffffff" text-anchor="middle">[ -c   a ]</text>
    <rect x="16" y="128" width="314" height="100" rx="8" fill="#0f172a" stroke="#475569" />
    <text x="26" y="148" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fda4af">SINGULAR MATRIX CONDITION:</text>
    <text x="26" y="166" font-family="monospace" font-size="9.5" fill="#f8fafc">det(P) = ad - bc = 0  =&gt;  NO INVERSE</text>
    <text x="26" y="186" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">ROW × COLUMN MULTIPLICATION:</text>
    <text x="26" y="204" font-family="monospace" font-size="9" fill="#cbd5e1">(AB)_ij = (Row i of A) · (Col j of B)</text>
    <text x="26" y="220" font-family="system-ui, sans-serif" font-size="8.5" fill="#94a3b8">Warning: Generally AB ≠ BA</text>
  </g>
  <!-- Right Card: Orthogonal Vectors & Area Scaling -->
  <g transform="translate(386, 52)">
    <rect width="310" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#34d399">ORTHOGONAL VECTORS (u · v = 0)</text>
    <!-- Axes at (80, 128) -->
    <line x1="36" y1="128" x2="275" y2="128" stroke="#475569" stroke-width="1.2" />
    <line x1="80" y1="42" x2="80" y2="188" stroke="#475569" stroke-width="1.2" />
    <!-- Vector u = (3,-4) scaled -> (134,178); v = (8,6) -> (224,62) -->
    <line x1="80" y1="128" x2="134" y2="178" stroke="#38bdf8" stroke-width="3" />
    <polygon points="130,182 140,184 137,173" fill="#38bdf8" />
    <text x="144" y="182" font-family="monospace" font-size="10" font-weight="800" fill="#7dd3fc">u = (3, -4)</text>
    <line x1="80" y1="128" x2="210" y2="68" stroke="#fbbf24" stroke-width="3" />
    <polygon points="207,63 218,64 212,74" fill="#fbbf24" />
    <text x="218" y="64" font-family="monospace" font-size="10" font-weight="800" fill="#fde047">v = (8, 6)</text>
    <!-- 90° box -->
    <polygon points="80,128 92,122 98,133 86,139" fill="rgba(16,185,129,0.28)" stroke="#10b981" stroke-width="1.5" />
    <text x="112" y="142" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7">90°</text>
    <rect x="16" y="192" width="278" height="40" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="155" y="210" font-family="monospace" font-size="9.5" font-weight="700" fill="#ecfdf5" text-anchor="middle">u · v = 3(8) + (-4)(6) = 24 - 24 = 0</text>
    <text x="155" y="224" font-family="system-ui, sans-serif" font-size="8.5" fill="#94a3b8" text-anchor="middle">Area Scale Factor = |det(A)|</text>
  </g>
</svg>`
  },
  "vis-esl-collocations-matrix": {
    id: "vis-esl-collocations-matrix",
    skillId: "skill-esl-verb-noun-collocations",
    unitId: "unit-esl-collocations-vocabulary",
    title: "Lexical Collocation Pairing Matrix (Make vs Do & AWL)",
    type: "flow_diagram",
    caption: "Mapping canonical verb-noun and intensifier-noun chunks ('make an effort', 'conduct research', 'heavy rain', 'bitterly disappointed') against L1 interference traps.",
    steps: [
      { step: 1, title: "Make = Creation/Outcome", description: "Use 'make' for decisions, choices, mistakes, complaints, and progress." },
      { step: 2, title: "Do/Conduct = Duty/Inquiry", description: "Use 'do' for chores/homework and 'conduct' for formal research or investigations." },
      { step: 3, title: "Fixed Intensifiers", description: "Pair 'heavy' with rain/traffic, 'strong' with wind, and 'bitterly' with disappointed." }
    ],
    takeaway: "Memorize nouns together with their fixed English verb and intensifier partners rather than translating word-for-word.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ESL collocation matrix contrasting Make, Do, Conduct, and natural intensifiers">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">ESL COLLOCATION MATRIX: NATURAL WORD PARTNERSHIPS VS L1 TRAPS</text>
  <!-- Column 1: MAKE -->
  <g transform="translate(24, 52)">
    <rect width="214" height="190" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="107" y="24" font-family="system-ui, sans-serif" font-size="11.5" font-weight="800" fill="#38bdf8" text-anchor="middle">MAKE (Outcome / Choice)</text>
    <rect x="14" y="38" width="186" height="30" rx="6" fill="#0c4a6e" />
    <text x="107" y="57" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">make a decision / choice</text>
    <rect x="14" y="74" width="186" height="30" rx="6" fill="#0c4a6e" />
    <text x="107" y="93" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">make an effort / progress</text>
    <rect x="14" y="110" width="186" height="30" rx="6" fill="#0c4a6e" />
    <text x="107" y="129" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">make a mistake / complaint</text>
    <text x="107" y="168" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#fda4af" text-anchor="middle">Avoid: 'do a mistake'</text>
  </g>
  <!-- Column 2: DO / CONDUCT -->
  <g transform="translate(253, 52)">
    <rect width="214" height="190" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="107" y="24" font-family="system-ui, sans-serif" font-size="11.5" font-weight="800" fill="#34d399" text-anchor="middle">DO / CONDUCT (Inquiry)</text>
    <rect x="14" y="38" width="186" height="30" rx="6" fill="#064e3b" />
    <text x="107" y="57" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">conduct an investigation</text>
    <rect x="14" y="74" width="186" height="30" rx="6" fill="#064e3b" />
    <text x="107" y="93" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">do research / homework</text>
    <rect x="14" y="110" width="186" height="30" rx="6" fill="#064e3b" />
    <text x="107" y="129" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">draw a conclusion (AWL)</text>
    <text x="107" y="168" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#fda4af" text-anchor="middle">Avoid: 'make research / pull'</text>
  </g>
  <!-- Column 3: INTENSIFIERS -->
  <g transform="translate(482, 52)">
    <rect width="214" height="190" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="107" y="24" font-family="system-ui, sans-serif" font-size="11.5" font-weight="800" fill="#fbbf24" text-anchor="middle">FIXED INTENSIFIERS</text>
    <rect x="14" y="38" width="186" height="30" rx="6" fill="#78350f" />
    <text x="107" y="57" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">heavy rain / heavy traffic</text>
    <rect x="14" y="74" width="186" height="30" rx="6" fill="#78350f" />
    <text x="107" y="93" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">strong wind / strong coffee</text>
    <rect x="14" y="110" width="186" height="30" rx="6" fill="#78350f" />
    <text x="107" y="129" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">bitterly disappointed</text>
    <text x="107" y="168" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#fda4af" text-anchor="middle">Avoid: 'strong rain / sourly'</text>
  </g>
  <!-- Bottom Rule -->
  <rect x="24" y="256" width="672" height="44" rx="8" fill="#0f172a" stroke="#475569" />
  <text x="360" y="282" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fde047" text-anchor="middle">FALSE FRIEND GUARD: 'attend a seminar' (be present) ≠ 'assist a colleague' (help someone)</text>
</svg>`
  },
  "vis-esl-discourse-cohesion": {
    id: "vis-esl-discourse-cohesion",
    skillId: "skill-esl-cohesive-transitions",
    unitId: "unit-esl-academic-discourse-writing",
    title: "Academic Discourse Linking: Concession, Semicolons & Hedging",
    type: "flow_diagram",
    caption: "Structural blueprint distinguishing Subordinators (Although + Clause, no 'but'), Prepositions (Despite/Notwithstanding + NP, no 'of'), and Conjunctive Adverbs ('; however,').",
    steps: [
      { step: 1, title: "Concessive Subordinator", description: "Although + [Subject + Verb], [Main Clause] — never follow with 'but'." },
      { step: 2, title: "Concessive Preposition", description: "Despite / Notwithstanding + [Noun Phrase] — never insert 'of' after Despite." },
      { step: 3, title: "Conjunctive Adverb & Hedging", description: "Use semicolon before '; however,' / '; consequently,' and hedge via 'may / suggests'." }
    ],
    takeaway: "Matching connector word class (subordinator vs preposition vs adverb) eliminates double conjunctions and comma splices.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ESL academic discourse linking blueprint showing concession, semicolon punctuation, and epistemic hedging">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">C1 ACADEMIC COHESION: CONCESSION, PUNCTUATION &amp; EPISTEMIC HEDGING</text>
  <!-- Card 1 -->
  <g transform="translate(24, 52)">
    <rect width="214" height="190" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="107" y="24" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#38bdf8" text-anchor="middle">1. SUBORDINATOR + CLAUSE</text>
    <text x="16" y="50" font-family="monospace" font-size="10" font-weight="700" fill="#ffffff">Although + [S + V],</text>
    <text x="16" y="68" font-family="monospace" font-size="10" font-weight="700" fill="#6ee7b7">[Main S + V].</text>
    <rect x="14" y="88" width="186" height="44" rx="6" fill="#064e3b" />
    <text x="22" y="106" font-family="system-ui, sans-serif" font-size="9" fill="#ecfdf5">'Although sample size was</text>
    <text x="22" y="120" font-family="system-ui, sans-serif" font-size="9" fill="#ecfdf5">small, the model converged.'</text>
    <text x="107" y="160" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#fda4af" text-anchor="middle">NEVER write 'Although... but...'</text>
  </g>
  <!-- Card 2 -->
  <g transform="translate(253, 52)">
    <rect width="214" height="190" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="107" y="24" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#34d399" text-anchor="middle">2. PREPOSITION + NOUN PHRASE</text>
    <text x="16" y="50" font-family="monospace" font-size="10" font-weight="700" fill="#ffffff">Despite / Notwithstanding</text>
    <text x="16" y="68" font-family="monospace" font-size="10" font-weight="700" fill="#6ee7b7">+ [Noun Phrase], [Main]</text>
    <rect x="14" y="88" width="186" height="44" rx="6" fill="#0c4a6e" />
    <text x="22" y="106" font-family="system-ui, sans-serif" font-size="9" fill="#e0f2fe">'Notwithstanding budget limits,</text>
    <text x="22" y="120" font-family="system-ui, sans-serif" font-size="9" fill="#e0f2fe">clinics stayed operational.'</text>
    <text x="107" y="160" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#fda4af" text-anchor="middle">NEVER write 'Despite of...'</text>
  </g>
  <!-- Card 3 -->
  <g transform="translate(482, 52)">
    <rect width="214" height="190" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="107" y="24" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#fbbf24" text-anchor="middle">3. CONJUNCTIVE ADVERB</text>
    <text x="16" y="50" font-family="monospace" font-size="10" font-weight="700" fill="#ffffff">[Clause 1]; however,</text>
    <text x="16" y="68" font-family="monospace" font-size="10" font-weight="700" fill="#fde68a">[Clause 2].</text>
    <rect x="14" y="88" width="186" height="44" rx="6" fill="#78350f" />
    <text x="22" y="106" font-family="system-ui, sans-serif" font-size="9" fill="#fef3c7">'Costs fell 42%, thereby</text>
    <text x="22" y="120" font-family="system-ui, sans-serif" font-size="9" fill="#fef3c7">accelerating rural access.'</text>
    <text x="107" y="160" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#fda4af" text-anchor="middle">Use semicolon before ; however,</text>
  </g>
  <!-- Hedging Footer -->
  <rect x="24" y="256" width="672" height="44" rx="8" fill="#0f172a" stroke="#475569" />
  <text x="360" y="282" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="middle">EPISTEMIC HEDGING: Replace absolute 'This proves...' with calibrated 'Empirical findings suggest / may indicate...'</text>
</svg>`
  },
  "vis-econ-macro-policy": {
    id: "vis-econ-macro-policy",
    skillId: "skill-econ-gdp-inflation-cbn",
    unitId: "unit-econ-macro-policy",
    title: "Macroeconomic Circular Flow, GDP Identity & CBN Policy Transmission",
    type: "equilibrium_curve",
    caption: "Expenditure GDP identity Y = C + I + G + (X - M) linked to CBN Monetary Policy Rate (MPR) and Cash Reserve Ratio (CRR) inflation control.",
    steps: [
      { step: 1, title: "Expenditure Identity", description: "Sum Household C, Investment I, Government G, and Net Exports (X - M)." },
      { step: 2, title: "Real vs Nominal GDP", description: "Deflate price rises: Real GDP = (Nominal GDP / Deflator) × 100." },
      { step: 3, title: "CBN Contractionary Policy", description: "Raising MPR and CRR tightens bank lending to curb demand-pull inflation." }
    ],
    takeaway: "Contractionary monetary policy (higher MPR/CRR) cools inflation by raising borrowing costs and shrinking excess liquidity.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Macroeconomic GDP formula Y=C+I+G+(X-M) and CBN Monetary Policy transmission diagram">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">MACROECONOMICS: GDP EXPENDITURE IDENTITY &amp; CBN MONETARY TRANSMISSION</text>
  <!-- Left: GDP Expenditure Stack -->
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">GDP = C + I + G + (X - M)</text>
    <rect x="20" y="40" width="290" height="30" rx="6" fill="#0c4a6e" />
    <text x="30" y="59" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#e0f2fe">C = Household Consumption (₦60T)</text>
    <rect x="20" y="76" width="290" height="30" rx="6" fill="#064e3b" />
    <text x="30" y="95" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#d1fae5">I = Gross Private Investment (₦18T)</text>
    <rect x="20" y="112" width="290" height="30" rx="6" fill="#312e81" />
    <text x="30" y="131" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#e0e7ff">G = Government Purchases (₦15T)</text>
    <rect x="20" y="148" width="290" height="30" rx="6" fill="#78350f" />
    <text x="30" y="167" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fef3c7">X - M = Net Exports (₦20T - ₦13T = +₦7T)</text>
    <rect x="20" y="188" width="290" height="44" rx="6" fill="#0f172a" stroke="#10b981" />
    <text x="165" y="206" font-family="monospace" font-size="10" font-weight="800" fill="#34d399" text-anchor="middle">Total Nominal GDP = ₦100T</text>
    <text x="165" y="222" font-family="monospace" font-size="9" fill="#fde047" text-anchor="middle">Real GDP = (Nominal / Deflator) × 100</text>
  </g>
  <!-- Right: CBN Policy -->
  <g transform="translate(368, 52)">
    <rect width="328" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">CBN ANTI-INFLATION MONETARY CHAIN</text>
    <rect x="20" y="40" width="288" height="38" rx="7" fill="#4c0519" stroke="#f43f5e" />
    <text x="164" y="63" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">CBN Raises MPR &amp; Cash Reserve Ratio (CRR)</text>
    <line x1="164" y1="78" x2="164" y2="96" stroke="#fbbf24" stroke-width="2" />
    <rect x="20" y="96" width="288" height="38" rx="7" fill="#78350f" stroke="#f59e0b" />
    <text x="164" y="119" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#fef3c7" text-anchor="middle">Commercial Loan Rates ↑ &amp; Bank Liquidity ↓</text>
    <line x1="164" y1="134" x2="164" y2="152" stroke="#10b981" stroke-width="2" />
    <rect x="20" y="152" width="288" height="38" rx="7" fill="#064e3b" stroke="#10b981" />
    <text x="164" y="175" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#d1fae5" text-anchor="middle">Aggregate Demand Cools → Inflation Eases</text>
    <text x="164" y="212" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1" text-anchor="middle">Fiscal Deflation: Cut Govt Spending (G↓) + Raise Taxes (T↑)</text>
    <text x="164" y="228" font-family="system-ui, sans-serif" font-size="8.5" fill="#94a3b8" text-anchor="middle">Cost-Push Inflation stems from rising input/energy/FX costs</text>
  </g>
</svg>`
  },
  "vis-fin-fraud-defense": {
    id: "vis-fin-fraud-defense",
    skillId: "skill-fin-fraud-prevention",
    unitId: "unit-fin-digital-fraud-safety",
    title: "Digital Banking Defense-in-Depth & Scam Red Flags",
    type: "flow_diagram",
    caption: "Layered authentication (Password + Hardware/App MFA) alongside Rule-of-72 inflation erosion and immutable rules protecting OTP, PIN, BVN, and CVV.",
    steps: [
      { step: 1, title: "Out-of-Band Verification", description: "Confirm urgent bank/payroll requests directly via verified official channels." },
      { step: 2, title: "Zero Secret Sharing", description: "Never read an OTP, PIN, CVV, or BVN token to any caller or unverified link." },
      { step: 3, title: "Inflation Purchasing Power", description: "Cash earning below inflation (e.g. 0% vs 18%) loses half its value in ~72/18 = 4 years." }
    ],
    takeaway: "Verify domains before signing in, never share OTP/PIN/BVN, and beat inflation with diversified regulated returns.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Digital banking defense-in-depth and OTP phishing protection diagram">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">DIGITAL BANKING SECURITY: PHISHING DEFENSE &amp; INFLATION EROSION</text>
  <!-- Left: Threat vs Defense -->
  <g transform="translate(24, 52)">
    <rect width="380" height="244" rx="10" fill="#1e293b" stroke="#f43f5e" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fda4af">FOUR SOCIAL-ENGINEERING ATTACK VECTORS</text>
    <rect x="16" y="38" width="348" height="42" rx="6" fill="#4c0519" stroke="#f43f5e" />
    <text x="26" y="56" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#ffffff">1. Fake Bank Caller Asking for OTP / PIN / BVN</text>
    <text x="26" y="71" font-family="system-ui, sans-serif" font-size="8.5" fill="#fecdd3">Rule: Legitimate bank staff NEVER ask for OTP, PIN, or CVV</text>
    <rect x="16" y="88" width="348" height="42" rx="6" fill="#78350f" stroke="#f59e0b" />
    <text x="26" y="106" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#ffffff">2. Look-Alike URLs (e.g. zenithb4nk-verify.com)</text>
    <text x="26" y="121" font-family="system-ui, sans-serif" font-size="8.5" fill="#fef3c7">Rule: Inspect root domain &amp; HTTPS; navigate via official app</text>
    <rect x="16" y="138" width="348" height="42" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="26" y="156" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#ffffff">3. Phishing-Resistant 2FA (App / Hardware Key)</text>
    <text x="26" y="171" font-family="system-ui, sans-serif" font-size="8.5" fill="#d1fae5">Protects account even if password leaks or SIM swaps occur</text>
    <rect x="16" y="188" width="348" height="42" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
    <text x="26" y="206" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#ffffff">4. Guaranteed 20% Monthly Ponzi Schemes</text>
    <text x="26" y="221" font-family="system-ui, sans-serif" font-size="8.5" fill="#e0f2fe">Risk-free exponential return claims signal illegal Ponzi fraud</text>
  </g>
  <!-- Right: Purchasing Power -->
  <g transform="translate(420, 52)">
    <rect width="276" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#34d399">REAL RETURN &amp; RULE OF 72</text>
    <rect x="16" y="42" width="244" height="58" rx="7" fill="#0f172a" stroke="#475569" />
    <text x="26" y="62" font-family="monospace" font-size="10" font-weight="700" fill="#fde047">Real ≈ Nominal - Inflation</text>
    <text x="26" y="82" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1">0% Cash at 18% Inflation = -18% Real/yr</text>
    <rect x="16" y="110" width="244" height="58" rx="7" fill="#0f172a" stroke="#475569" />
    <text x="26" y="130" font-family="monospace" font-size="10" font-weight="700" fill="#38bdf8">Halving Time ≈ 72 / Inflation%</text>
    <text x="26" y="150" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1">72 / 18 = 4 Years to Lose Half Value</text>
    <rect x="16" y="178" width="244" height="52" rx="7" fill="#064e3b" stroke="#10b981" />
    <text x="138" y="199" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#ecfdf5" text-anchor="middle">EMERGENCY PROTOCOL:</text>
    <text x="138" y="216" font-family="system-ui, sans-serif" font-size="9" fill="#d1fae5" text-anchor="middle">Freeze card via USSD/App &amp; notify bank</text>
  </g>
</svg>`
  },
  "vis-uni-lhopital-partials": {
    id: "vis-uni-lhopital-partials",
    skillId: "skill-uni-lhopital-partials",
    unitId: "unit-uni-limits-continuity",
    title: "Epsilon-Delta Limits, L'Hôpital's Rule & Tangent-Plane Partials",
    type: "coordinate_graph",
    caption: "Removable singularity lim_{x->0} sin(x)/x = 1 via L'Hôpital differentiation alongside directional slices ∂f/∂x and ∂f/∂y on a 3D surface.",
    steps: [
      { step: 1, title: "Verify Indeterminate 0/0 or ∞/∞", description: "Never differentiate numerator/denominator unless direct limit yields 0/0 or ±∞/±∞." },
      { step: 2, title: "Differentiate Top & Bottom Separately", description: "Compute lim f'(x)/g'(x) rather than the quotient rule." },
      { step: 3, title: "Partial Derivatives & Clairaut Symmetry", description: "Hold orthogonal variables constant for ∂f/∂x and check f_xy = f_yx." }
    ],
    takeaway: "L'Hôpital applies strictly to 0/0 or ∞/∞; partial derivatives slice multivariable surfaces along coordinate directions.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="University calculus sinc(x) limit hole at (0,1) and partial derivative tangent plane slice">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">MULTIVARIABLE CALCULUS: L'HÔPITAL'S RULE &amp; PARTIAL DERIVATIVES</text>
  <!-- Left: sin(x)/x limit hole -->
  <g transform="translate(24, 52)">
    <rect width="346" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">LIM_{x→0} sin(x)/x = 1  (0/0 TYPE)</text>
    <line x1="28" y1="158" x2="318" y2="158" stroke="#64748b" stroke-width="1.5" />
    <line x1="173" y1="40" x2="173" y2="188" stroke="#64748b" stroke-width="1.5" />
    <!-- Curve sin(x)/x -->
    <path d="M 38 158 Q 75 180 112 130 Q 145 72 173 72 Q 201 72 234 130 Q 271 180 308 158" fill="none" stroke="#10b981" stroke-width="3" />
    <!-- Open hole at (173, 72) -->
    <circle cx="173" cy="72" r="5.5" fill="#1e293b" stroke="#f43f5e" stroke-width="2.5" />
    <text x="192" y="64" font-family="monospace" font-size="10" font-weight="800" fill="#fda4af">(0, 1) Limit = 1</text>
    <rect x="16" y="194" width="314" height="38" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="173" y="211" font-family="monospace" font-size="9.5" font-weight="700" fill="#6ee7b7" text-anchor="middle">d/dx(sin x) / d/dx(x) = cos(0)/1 = 1</text>
    <text x="173" y="225" font-family="system-ui, sans-serif" font-size="8.5" fill="#94a3b8" text-anchor="middle">Check 0/0 or ∞/∞ BEFORE differentiating!</text>
  </g>
  <!-- Right: Partials & Clairaut -->
  <g transform="translate(386, 52)">
    <rect width="310" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">PARTIAL DERIVATIVES &amp; GRADIENT ∇f</text>
    <rect x="16" y="40" width="278" height="48" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="26" y="59" font-family="monospace" font-size="10" font-weight="700" fill="#38bdf8">∂f/∂x : hold y constant</text>
    <text x="26" y="77" font-family="monospace" font-size="9.5" fill="#cbd5e1">f = x²y + e^(xy) ⇒ f_x = 2xy + y·e^(xy)</text>
    <rect x="16" y="96" width="278" height="48" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="26" y="115" font-family="monospace" font-size="10" font-weight="700" fill="#fbbf24">Tangent Plane at (a, b):</text>
    <text x="26" y="133" font-family="monospace" font-size="9" fill="#fde68a">z = f(a,b) + f_x(x-a) + f_y(y-b)</text>
    <rect x="16" y="152" width="278" height="78" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="26" y="172" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">CLAIRAUT'S THEOREM &amp; EXPONENTIAL e:</text>
    <text x="26" y="191" font-family="monospace" font-size="9.5" fill="#ecfdf5">f_xy = f_yx (continuous 2nd partials)</text>
    <text x="26" y="210" font-family="monospace" font-size="9.5" fill="#ecfdf5">lim_{n→∞} (1 + k/n)ⁿ = eᵏ</text>
  </g>
</svg>`
  },
  "vis-pri-number-patterns": {
    id: "vis-pri-number-patterns",
    skillId: "skill-pri-number-patterns-rules",
    unitId: "unit-p1-pri-number-patterns",
    title: "First-Difference Ladder & Triangular Figurate Pattern Matrix",
    type: "process_diagram",
    caption: "Visualizing linear first-difference steps (+d), figurate triangular arrays n(n+1)/2, and input-output rule machines.",
    steps: [
      { step: 1, title: "Compute First Differences", description: "Subtract consecutive terms to check for constant +d or growing figurate steps." },
      { step: 2, title: "Inspect Second Differences", description: "Constant +1 or +2 second differences point immediately to triangular or square numbers." },
      { step: 3, title: "Decode Input-Output Rule", description: "Slope Δy/Δx yields multiplier a, then substitute x = 1 to isolate offset b." }
    ],
    takeaway: "Every number pattern encodes either a constant step, constant ratio, or second-order figurate law.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number patterns first-difference table and triangular dot arrays">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">NUMBER PATTERNS: DIFFERENCE LADDER &amp; FIGURATE DOT ARRAYS</text>
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">GROWING DIFFERENCES: T_n = n² + 1</text>
    <rect x="20" y="48" width="44" height="34" rx="6" fill="#0f172a" stroke="#38bdf8" />
    <text x="42" y="70" font-family="monospace" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">2</text>
    <rect x="82" y="48" width="44" height="34" rx="6" fill="#0f172a" stroke="#38bdf8" />
    <text x="104" y="70" font-family="monospace" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">5</text>
    <rect x="144" y="48" width="44" height="34" rx="6" fill="#0f172a" stroke="#38bdf8" />
    <text x="166" y="70" font-family="monospace" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">10</text>
    <rect x="206" y="48" width="44" height="34" rx="6" fill="#0f172a" stroke="#38bdf8" />
    <text x="228" y="70" font-family="monospace" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">17</text>
    <rect x="268" y="48" width="44" height="34" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="290" y="70" font-family="monospace" font-size="12" font-weight="800" fill="#6ee7b7" text-anchor="middle">26</text>
    <text x="73" y="108" font-family="monospace" font-size="10.5" font-weight="700" fill="#fbbf24" text-anchor="middle">+3</text>
    <text x="135" y="108" font-family="monospace" font-size="10.5" font-weight="700" fill="#fbbf24" text-anchor="middle">+5</text>
    <text x="197" y="108" font-family="monospace" font-size="10.5" font-weight="700" fill="#fbbf24" text-anchor="middle">+7</text>
    <text x="259" y="108" font-family="monospace" font-size="10.5" font-weight="700" fill="#fbbf24" text-anchor="middle">+9</text>
    <text x="104" y="138" font-family="monospace" font-size="10" font-weight="800" fill="#10b981" text-anchor="middle">+2</text>
    <text x="166" y="138" font-family="monospace" font-size="10" font-weight="800" fill="#10b981" text-anchor="middle">+2</text>
    <text x="228" y="138" font-family="monospace" font-size="10" font-weight="800" fill="#10b981" text-anchor="middle">+2</text>
    <rect x="20" y="162" width="292" height="62" rx="8" fill="#0f172a" stroke="#475569" />
    <text x="166" y="184" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#e2e8f0" text-anchor="middle">2nd Difference = +2 (Constant)</text>
    <text x="166" y="205" font-family="monospace" font-size="10" fill="#38bdf8" text-anchor="middle">Next Step = +11  =&gt;  T_6 = 26 + 11 = 37</text>
  </g>
  <g transform="translate(370, 52)">
    <rect width="326" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">TRIANGULAR NUMBERS: T_n = n(n+1)/2</text>
    <circle cx="48" cy="112" r="7" fill="#fbbf24" />
    <text x="48" y="140" font-family="monospace" font-size="10" fill="#f8fafc" text-anchor="middle">T1=1</text>
    <circle cx="115" cy="92" r="7" fill="#fbbf24" />
    <circle cx="105" cy="112" r="7" fill="#38bdf8" />
    <circle cx="125" cy="112" r="7" fill="#38bdf8" />
    <text x="115" y="140" font-family="monospace" font-size="10" fill="#f8fafc" text-anchor="middle">T2=3</text>
    <circle cx="195" cy="72" r="7" fill="#fbbf24" />
    <circle cx="185" cy="92" r="7" fill="#38bdf8" />
    <circle cx="205" cy="92" r="7" fill="#38bdf8" />
    <circle cx="175" cy="112" r="7" fill="#10b981" />
    <circle cx="195" cy="112" r="7" fill="#10b981" />
    <circle cx="215" cy="112" r="7" fill="#10b981" />
    <text x="195" y="140" font-family="monospace" font-size="10" fill="#f8fafc" text-anchor="middle">T3=6</text>
    <circle cx="275" cy="52" r="6" fill="#fbbf24" />
    <circle cx="265" cy="72" r="6" fill="#38bdf8" />
    <circle cx="285" cy="72" r="6" fill="#38bdf8" />
    <circle cx="255" cy="92" r="6" fill="#10b981" />
    <circle cx="275" cy="92" r="6" fill="#10b981" />
    <circle cx="295" cy="92" r="6" fill="#10b981" />
    <circle cx="245" cy="112" r="6" fill="#f43f5e" />
    <circle cx="265" cy="112" r="6" fill="#f43f5e" />
    <circle cx="285" cy="112" r="6" fill="#f43f5e" />
    <circle cx="305" cy="112" r="6" fill="#f43f5e" />
    <text x="275" y="140" font-family="monospace" font-size="10" fill="#f8fafc" text-anchor="middle">T4=10</text>
    <rect x="16" y="162" width="294" height="62" rx="8" fill="#0f172a" stroke="#475569" />
    <text x="163" y="184" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#6ee7b7" text-anchor="middle">FUNCTION MACHINE: y = 3x + 1</text>
    <text x="163" y="205" font-family="monospace" font-size="9.5" fill="#cbd5e1" text-anchor="middle">x=2 ⇒ 7 | x=3 ⇒ 10 | x=4 ⇒ 13 (+3/step)</text>
  </g>
</svg>`
  },
  "vis-jss-algebra-area-grid": {
    id: "vis-jss-algebra-area-grid",
    skillId: "skill-jss-algebraic-expansion-factoring",
    unitId: "unit-p1-jss-algebra-expressions",
    title: "Binomial Expansion Area Grid & Difference of Two Squares",
    type: "process_diagram",
    caption: "Geometric distributive box model for (2x - 3)(x + 5) paired with HCF + difference-of-squares factorisation.",
    steps: [
      { step: 1, title: "Fill All 4 Distributive Tiles", description: "Multiply row header by column header to keep cross-terms (+10x and -3x) visible." },
      { step: 2, title: "Extract HCF First", description: "Factor out common constant/variable before testing A² - B²." },
      { step: 3, title: "Apply A² - B² = (A - B)(A + B)", description: "Verify zero middle term when conjugate brackets expand." }
    ],
    takeaway: "The area-box model prevents omitting middle linear cross-terms when expanding brackets.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Algebraic binomial area grid and factorisation flowchart">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">ALGEBRAIC EXPANSION AREA GRID &amp; FACTORISATION PATHWAY</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">EXPAND: (2x - 3)(x + 5)</text>
    <text x="148" y="48" font-family="monospace" font-size="11" font-weight="800" fill="#f8fafc" text-anchor="middle">x</text>
    <text x="258" y="48" font-family="monospace" font-size="11" font-weight="800" fill="#10b981" text-anchor="middle">+5</text>
    <text x="58" y="92" font-family="monospace" font-size="11" font-weight="800" fill="#f8fafc" text-anchor="middle">2x</text>
    <text x="58" y="156" font-family="monospace" font-size="11" font-weight="800" fill="#f43f5e" text-anchor="middle">-3</text>
    <rect x="94" y="60" width="108" height="58" fill="#0f172a" stroke="#38bdf8" />
    <text x="148" y="94" font-family="monospace" font-size="13" font-weight="800" fill="#38bdf8" text-anchor="middle">2x²</text>
    <rect x="206" y="60" width="108" height="58" fill="#064e3b" stroke="#10b981" />
    <text x="260" y="94" font-family="monospace" font-size="13" font-weight="800" fill="#6ee7b7" text-anchor="middle">+10x</text>
    <rect x="94" y="122" width="108" height="58" fill="#4c0519" stroke="#f43f5e" />
    <text x="148" y="156" font-family="monospace" font-size="13" font-weight="800" fill="#fda4af" text-anchor="middle">-3x</text>
    <rect x="206" y="122" width="108" height="58" fill="#78350f" stroke="#f59e0b" />
    <text x="260" y="156" font-family="monospace" font-size="13" font-weight="800" fill="#fde68a" text-anchor="middle">-15</text>
    <rect x="20" y="194" width="294" height="36" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="167" y="216" font-family="monospace" font-size="10.5" font-weight="700" fill="#ffffff" text-anchor="middle">Sum = 2x² + (10x - 3x) - 15 = 2x² + 7x - 15</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">TWO-STAGE FACTORISATION CHECKLIST</text>
    <rect x="16" y="42" width="288" height="54" rx="7" fill="#0f172a" stroke="#38bdf8" />
    <text x="28" y="63" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8">STEP 1: EXTRACT FULL HCF FIRST</text>
    <text x="28" y="82" font-family="monospace" font-size="10" fill="#f8fafc">5x² - 45y²  ⇒  5(x² - 9y²)</text>
    <rect x="16" y="106" width="288" height="58" rx="7" fill="#064e3b" stroke="#10b981" />
    <text x="28" y="127" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">STEP 2: DIFFERENCE OF SQUARES A² - B²</text>
    <text x="28" y="147" font-family="monospace" font-size="10" fill="#ecfdf5">5[(x)² - (3y)²] = 5(x - 3y)(x + 3y)</text>
    <rect x="16" y="174" width="288" height="56" rx="7" fill="#4c0519" stroke="#f43f5e" />
    <text x="28" y="195" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#fda4af">TRAP: (x - 5)² ≠ x² - 25</text>
    <text x="28" y="214" font-family="monospace" font-size="9.5" fill="#fecdd3">Exact: (a - b)² = a² - 2ab + b²</text>
  </g>
</svg>`
  },
  "vis-jss-pythagoras-cone": {
    id: "vis-jss-pythagoras-cone",
    skillId: "skill-jss-pythagoras-mensuration",
    unitId: "unit-p1-jss-geometry-mensuration",
    title: "Pythagorean Cone Triangle (r, h, l) & 1/3 Solid Volume Ratio",
    type: "physics_schematic",
    caption: "Right-triangle link l² = r² + h² inside a right circular cone alongside V_cone = (1/3)V_cylinder.",
    steps: [
      { step: 1, title: "Locate Embedded Right Triangle", description: "Base radius r and vertical height h meet at 90°, forming slant height hypotenuse l." },
      { step: 2, title: "Distinguish h from l", description: "Volume uses perpendicular height h; Curved Surface Area πrl uses slant height l." },
      { step: 3, title: "Apply Tapered 1/3 Factor", description: "Any cone/pyramid holds exactly 1/3 the volume of its enclosing cylinder/prism." }
    ],
    takeaway: "Pythagoras connects 2D triangle legs directly to 3D cone slant heights and surface areas.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right circular cone geometry showing radius r, vertical height h, slant height l and volume ratio">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">GEOMETRY &amp; MENSURATION: PYTHAGORAS IN 3D CONES &amp; SOLIDS</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">RIGHT CONE: 6-8-10 RIGHT TRIANGLE</text>
    <!-- Cone outline -->
    <ellipse cx="165" cy="186" rx="84" ry="22" fill="#0f172a" stroke="#64748b" stroke-width="2" />
    <line x1="81" y1="186" x2="165" y2="54" stroke="#94a3b8" stroke-width="2" />
    <line x1="249" y1="186" x2="165" y2="54" stroke="#f59e0b" stroke-width="3" />
    <!-- Vertical h and radius r -->
    <line x1="165" y1="54" x2="165" y2="186" stroke="#10b981" stroke-width="2.5" stroke-dasharray="5,4" />
    <line x1="165" y1="186" x2="249" y2="186" stroke="#38bdf8" stroke-width="2.5" />
    <rect x="165" y="174" width="12" height="12" fill="none" stroke="#ffffff" stroke-width="1.5" />
    <text x="148" y="125" font-family="monospace" font-size="11" font-weight="800" fill="#6ee7b7" text-anchor="end">h = 8</text>
    <text x="208" y="180" font-family="monospace" font-size="11" font-weight="800" fill="#38bdf8" text-anchor="middle">r = 6</text>
    <text x="225" y="114" font-family="monospace" font-size="11" font-weight="800" fill="#fbbf24">l = 10</text>
    <text x="168" y="230" font-family="monospace" font-size="10" font-weight="700" fill="#f8fafc" text-anchor="middle">l = √(r² + h²) = √(36 + 64) = 10</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">UNIFORM VS TAPERED VOLUME LAWS</text>
    <rect x="16" y="42" width="288" height="58" rx="7" fill="#0f172a" stroke="#38bdf8" />
    <text x="28" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8">CYLINDER (UNIFORM PRISM):</text>
    <text x="28" y="84" font-family="monospace" font-size="10.5" fill="#ffffff">V = π r² h   |   CSA = 2 π r h</text>
    <rect x="16" y="110" width="288" height="58" rx="7" fill="#064e3b" stroke="#10b981" />
    <text x="28" y="132" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">CONE (1/3 TAPERED RATIO):</text>
    <text x="28" y="152" font-family="monospace" font-size="10.5" fill="#ecfdf5">V = (1/3) π r² h   |   CSA = π r l</text>
    <rect x="16" y="178" width="288" height="52" rx="7" fill="#0f172a" stroke="#f59e0b" />
    <text x="28" y="198" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#fbbf24">POLYGON ANGLE INVARIANT:</text>
    <text x="28" y="216" font-family="monospace" font-size="9.5" fill="#fde68a">n = 360° / exterior  |  int + ext = 180°</text>
  </g>
</svg>`
  },
  "vis-jss-pie-frequency": {
    id: "vis-jss-pie-frequency",
    skillId: "skill-jss-central-tendency-charts",
    unitId: "unit-p1-jss-statistics-probability",
    title: "Frequency-Weighted Mean & 360° Pie Sector Calibration",
    type: "bar_chart",
    caption: "Mapping discrete category counts f onto proportional 360° pie sectors alongside weighted mean Σ(fx)/Σf and probability complements.",
    steps: [
      { step: 1, title: "Total Observations N = Σf", description: "Sum every category frequency before computing weighted mean or sector angles." },
      { step: 2, title: "Map Frequency to 360°", description: "Central angle θ = (f / N) × 360°; reverse via f = (θ / 360°) × N." },
      { step: 3, title: "Locate Cumulative Median", description: "Read the ((N + 1)/2)th item from the running cumulative frequency column." }
    ],
    takeaway: "Every pie sector angle and frequency average scales directly off the true sample total N = Σf.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pie chart 360 degree sector proportions and frequency mean chart">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">STATISTICS &amp; PROBABILITY: PIE SECTORS (360°) &amp; WEIGHTED MEAN</text>
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">SURVEY SAMPLE N = 120 STUDENTS</text>
    <!-- Pie chart centered at (110, 134) r=70 -->
    <circle cx="110" cy="134" r="70" fill="#10b981" stroke="#0f172a" stroke-width="2" />
    <!-- Walk 90 deg quadrant top-right -->
    <path d="M 110 134 L 110 64 A 70 70 0 0 1 180 134 Z" fill="#f59e0b" stroke="#0f172a" stroke-width="2" />
    <!-- Bus 144 deg bottom-right/left -->
    <path d="M 110 134 L 180 134 A 70 70 0 0 1 53 175 Z" fill="#38bdf8" stroke="#0f172a" stroke-width="2" />
    <text x="136" y="106" font-family="monospace" font-size="10" font-weight="800" fill="#0f172a">90°</text>
    <text x="124" y="176" font-family="monospace" font-size="10" font-weight="800" fill="#0f172a">144°</text>
    <text x="72" y="114" font-family="monospace" font-size="10" font-weight="800" fill="#0f172a">126°</text>
    <!-- Legend -->
    <rect x="200" y="72" width="114" height="32" rx="5" fill="#0f172a" stroke="#f59e0b" />
    <text x="208" y="92" font-family="monospace" font-size="9.5" fill="#fde68a">Walk: 90° (30)</text>
    <rect x="200" y="116" width="114" height="32" rx="5" fill="#0f172a" stroke="#38bdf8" />
    <text x="208" y="136" font-family="monospace" font-size="9.5" fill="#7dd3fc">Bus: 144° (48)</text>
    <rect x="200" y="160" width="114" height="32" rx="5" fill="#0f172a" stroke="#10b981" />
    <text x="208" y="180" font-family="monospace" font-size="9.5" fill="#6ee7b7">Bike: 126° (42)</text>
    <text x="165" y="226" font-family="monospace" font-size="9.5" fill="#cbd5e1" text-anchor="middle">Angle θ = (f / N) × 360°  |  Σθ = 360°</text>
  </g>
  <g transform="translate(370, 52)">
    <rect width="326" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">FREQUENCY TABLE &amp; PROBABILITY</text>
    <rect x="16" y="42" width="294" height="62" rx="7" fill="#0f172a" stroke="#475569" />
    <text x="26" y="63" font-family="monospace" font-size="10" font-weight="700" fill="#38bdf8">Weighted Mean: x̄ = Σ(fx) / Σf</text>
    <text x="26" y="84" font-family="monospace" font-size="9.5" fill="#cbd5e1">Never divide Σ(fx) by row count!</text>
    <rect x="16" y="114" width="294" height="54" rx="7" fill="#064e3b" stroke="#10b981" />
    <text x="26" y="134" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">MEDIAN RANK = (N + 1) / 2</text>
    <text x="26" y="153" font-family="monospace" font-size="9.5" fill="#ecfdf5">N = 15 ⇒ 8th item in cumulative f</text>
    <rect x="16" y="178" width="294" height="52" rx="7" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="199" font-family="monospace" font-size="10" font-weight="700" fill="#fde68a">P(E) = n(E) / n(S),  P(E') = 1 - P(E)</text>
    <text x="26" y="218" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1">Prime on fair die = {2, 3, 5} (1 is NOT prime)</text>
  </g>
</svg>`
  },
  "vis-sss-variation-inequalities": {
    id: "vis-sss-variation-inequalities",
    skillId: "skill-sss-variation-inequalities",
    unitId: "unit-p1-sss-general-math-variation",
    title: "Quadratic Inequality Sign Intervals & Partial Variation Graph",
    type: "coordinate_graph",
    caption: "Parabola sign-chart regions separating (x - α)(x - β) < 0 (interior) from > 0 (outer wings), paired with partial variation y = a + bx.",
    steps: [
      { step: 1, title: "Locate Critical Roots α, β", description: "Solve ax² + bx + c = 0 to partition the real line into three regions." },
      { step: 2, title: "Select Interior vs Outer Wings", description: "Upward parabolas dip < 0 strictly between roots and rise > 0 outside roots." },
      { step: 3, title: "Check Two-Constant Partial Model", description: "y = a + bx has y-intercept 'a' (fixed cost) and slope 'b' (variable rate)." }
    ],
    takeaway: "Visualizing the parabolic curve immediately resolves whether an inequality holds between or outside its roots.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Quadratic inequality sign region plot and partial variation intercept graph">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">GENERAL MATH: QUADRATIC INEQUALITIES &amp; PARTIAL VARIATION</text>
  <g transform="translate(24, 52)">
    <rect width="340" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">PARABOLA SIGN INTERVALS: (x-2)(x-5) &lt; 0</text>
    <line x1="30" y1="128" x2="310" y2="128" stroke="#94a3b8" stroke-width="1.8" />
    <!-- Highlight interior interval between 2 and 5 -->
    <line x1="115" y1="128" x2="225" y2="128" stroke="#10b981" stroke-width="6" />
    <path d="M 75 56 Q 170 232 265 56" fill="none" stroke="#38bdf8" stroke-width="2.5" />
    <circle cx="115" cy="128" r="5" fill="#1e293b" stroke="#10b981" stroke-width="2.5" />
    <circle cx="225" cy="128" r="5" fill="#1e293b" stroke="#10b981" stroke-width="2.5" />
    <text x="115" y="148" font-family="monospace" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">x=2</text>
    <text x="225" y="148" font-family="monospace" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">x=5</text>
    <text x="170" y="188" font-family="monospace" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">NEGATIVE (&lt;0): 2 &lt; x &lt; 5</text>
    <text x="72" y="72" font-family="monospace" font-size="9.5" fill="#fbbf24">&gt;0</text>
    <text x="262" y="72" font-family="monospace" font-size="9.5" fill="#fbbf24">&gt;0</text>
    <rect x="16" y="198" width="308" height="34" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="170" y="219" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1" text-anchor="middle">Outer wings x &lt; 2 or x &gt; 5 satisfy &gt; 0</text>
  </g>
  <g transform="translate(380, 52)">
    <rect width="316" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">PARTIAL VARIATION: C = a + bn</text>
    <line x1="50" y1="176" x2="288" y2="176" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="50" y1="50" x2="50" y2="176" stroke="#94a3b8" stroke-width="1.5" />
    <!-- Line starting at y-intercept a > 0 -->
    <line x1="50" y1="138" x2="275" y2="62" stroke="#f59e0b" stroke-width="3" />
    <circle cx="50" cy="138" r="4.5" fill="#f43f5e" />
    <text x="58" y="142" font-family="monospace" font-size="9.5" font-weight="800" fill="#fda4af">Fixed Base (0, a)</text>
    <text x="195" y="114" font-family="monospace" font-size="9.5" font-weight="800" fill="#fde68a">Slope = b</text>
    <rect x="16" y="186" width="284" height="46" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="158" y="205" font-family="monospace" font-size="9.5" fill="#38bdf8" text-anchor="middle">Direct: y = kx  |  Joint: y = kx/z</text>
    <text x="158" y="222" font-family="monospace" font-size="9.5" fill="#6ee7b7" text-anchor="middle">Partial: y = a + bx (2 constants!)</text>
  </g>
</svg>`
  },
  "vis-fm-separable-ode": {
    id: "vis-fm-separable-ode",
    skillId: "skill-fm-first-order-ode",
    unitId: "unit-p1-sss-further-math-diffeq",
    title: "Separable ODE Solution Family & Particular Curve Pinning",
    type: "coordinate_graph",
    caption: "Slope field integral family y(x) = 3 + Ae^{-2x} showing how boundary condition y(0) = 5 pins the unique particular trajectory.",
    steps: [
      { step: 1, title: "Factor & Separate Variables", description: "Isolate all y terms with dy and all x terms with dx." },
      { step: 2, title: "Apply Partial Fractions If Needed", description: "Split quadratic denominators into linear A/(x-a) + B/(x-b) before integrating." },
      { step: 3, title: "Pin Constant With Initial Value", description: "Substitute (x₀, y₀) to select the unique particular curve from the general family." }
    ],
    takeaway: "Integrating yields a family of curves parametrized by C; initial values select one unique curve.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Separable differential equation solution curves and initial condition selection">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">FURTHER MATH: SEPARABLE ODEs &amp; INITIAL VALUE SELECTION</text>
  <g transform="translate(24, 52)">
    <rect width="346" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">FAMILY y = 3 + A·e⁻²ˣ  (ASYMPTOTE y=3)</text>
    <line x1="46" y1="184" x2="318" y2="184" stroke="#64748b" stroke-width="1.5" />
    <line x1="46" y1="42" x2="46" y2="196" stroke="#64748b" stroke-width="1.5" />
    <!-- Asymptote y=3 -->
    <line x1="46" y1="126" x2="314" y2="126" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,4" />
    <text x="292" y="120" font-family="monospace" font-size="9" fill="#cbd5e1">y=3</text>
    <!-- Other family curves -->
    <path d="M 46 56 Q 115 118 310 125" fill="none" stroke="#475569" stroke-width="1.5" />
    <path d="M 46 170 Q 115 130 310 127" fill="none" stroke="#475569" stroke-width="1.5" />
    <!-- Particular curve y(0)=5 -> A=2 -->
    <path d="M 46 82 Q 115 121 310 126" fill="none" stroke="#10b981" stroke-width="3" />
    <circle cx="46" cy="82" r="5" fill="#f43f5e" stroke="#ffffff" stroke-width="1.5" />
    <text x="60" y="78" font-family="monospace" font-size="10" font-weight="800" fill="#fda4af">(0, 5) ⇒ A = 2</text>
    <rect x="16" y="198" width="314" height="34" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="173" y="219" font-family="monospace" font-size="9.5" fill="#6ee7b7" text-anchor="middle">dy/dx = -2(y - 3) ⇒ y = 3 + 2e⁻²ˣ</text>
  </g>
  <g transform="translate(386, 52)">
    <rect width="310" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">4-STEP SEPARABLE WORKFLOW</text>
    <rect x="16" y="40" width="278" height="42" rx="6" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="65" font-family="monospace" font-size="9.5" fill="#ffffff">1. Separate: [1/g(y)] dy = f(x) dx</text>
    <rect x="16" y="88" width="278" height="44" rx="6" fill="#0f172a" stroke="#10b981" />
    <text x="26" y="108" font-family="monospace" font-size="9.5" fill="#6ee7b7">2. Partial Fractions (if quadratic):</text>
    <text x="26" y="124" font-family="monospace" font-size="9" fill="#cbd5e1">   5/[(x-1)(x+4)] = 1/(x-1) - 1/(x+4)</text>
    <rect x="16" y="138" width="278" height="44" rx="6" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="158" font-family="monospace" font-size="9.5" fill="#fde68a">3. Integrate &amp; Keep +C Before Exponent</text>
    <text x="26" y="174" font-family="monospace" font-size="9" fill="#cbd5e1">   ln|y| = kx + C ⇒ y = A·eᵏˣ (A=eᶜ)</text>
    <rect x="16" y="188" width="278" height="44" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="26" y="214" font-family="monospace" font-size="9.5" font-weight="800" fill="#ecfdf5">4. Apply Initial Value (x₀, y₀) ⇒ Solve A</text>
  </g>
</svg>`
  },
  "vis-eng-statics-beam": {
    id: "vis-eng-statics-beam",
    skillId: "skill-eng-statics-equilibrium",
    unitId: "unit-p1-hall-engineering-statics",
    title: "Simply Supported Beam Free-Body Diagram & Torque Balance",
    type: "physics_schematic",
    caption: "Free-body force and moment equilibrium diagram for a loaded uniform beam resolving R_A, R_B, and ΣM_A = 0.",
    steps: [
      { step: 1, title: "Draw Complete Free-Body Diagram", description: "Include self-weight W_beam at midpoint L/2 alongside all point loads." },
      { step: 2, title: "Pivot at Unknown Support A", description: "Taking ΣM_A = 0 eliminates R_A immediately because its lever arm is zero." },
      { step: 3, title: "Enforce ΣF_y = 0 & Cross-Check", description: "Solve R_A = ΣDownward - R_B and verify ΣM_B = 0 independently." }
    ],
    takeaway: "Choosing the moment pivot directly through an unknown support reaction decouples the two reactions instantly.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Free body diagram of simply supported beam with point load and self weight">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">ENGINEERING STATICS: BEAM FREE-BODY &amp; MOMENT EQUILIBRIUM</text>
  <g transform="translate(24, 52)">
    <rect width="672" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="20" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">UNIFORM 8 m BEAM (200 N SELF-WEIGHT AT 4 m) + 600 N LOAD AT 2 m</text>
    <!-- Beam bar -->
    <rect x="80" y="106" width="512" height="16" rx="3" fill="#475569" stroke="#cbd5e1" stroke-width="1.5" />
    <!-- Support A triangle -->
    <polygon points="80,122 64,152 96,152" fill="#10b981" />
    <text x="80" y="172" font-family="monospace" font-size="11" font-weight="800" fill="#6ee7b7" text-anchor="middle">R_A = 550 N ↑</text>
    <!-- Support B triangle -->
    <polygon points="592,122 576,152 608,152" fill="#10b981" />
    <text x="592" y="172" font-family="monospace" font-size="11" font-weight="800" fill="#6ee7b7" text-anchor="middle">R_B = 250 N ↑</text>
    <!-- 600 N Load at 2m (x = 80 + 128 = 208) -->
    <line x1="208" y1="48" x2="208" y2="104" stroke="#f43f5e" stroke-width="3.5" />
    <polygon points="208,106 201,94 215,94" fill="#f43f5e" />
    <text x="208" y="42" font-family="monospace" font-size="11" font-weight="800" fill="#fda4af" text-anchor="middle">600 N (x=2m)</text>
    <!-- 200 N Self weight at 4m (x = 336) -->
    <line x1="336" y1="58" x2="336" y2="104" stroke="#f59e0b" stroke-width="3" />
    <polygon points="336,106 329,94 343,94" fill="#f59e0b" />
    <text x="336" y="50" font-family="monospace" font-size="11" font-weight="800" fill="#fde68a" text-anchor="middle">W_beam = 200 N (x=4m)</text>
    <!-- Equation summary box -->
    <rect x="24" y="186" width="624" height="44" rx="7" fill="#0f172a" stroke="#475569" />
    <text x="336" y="205" font-family="monospace" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="middle">ΣM_A = 0  ⇒  8 R_B = 600(2) + 200(4) = 2000  ⇒  R_B = 250 N</text>
    <text x="336" y="222" font-family="monospace" font-size="10" font-weight="700" fill="#6ee7b7" text-anchor="middle">ΣF_y = 0  ⇒  R_A = (600 + 200) - 250 = 550 N   |   ΣF_x = 0</text>
  </g>
</svg>`
  },
  "vis-jss-density-separation": {
    id: "vis-jss-density-separation",
    skillId: "skill-jss-matter-separation-density",
    unitId: "unit-p3-jss-basic-science",
    title: "Density Buoyancy Column & Mixture Separation Matrix",
    type: "process_diagram",
    caption: "Comparing liquid/solid density stacking (oil < water < iron < mercury) alongside laboratory separation selection.",
    steps: [
      { step: 1, title: "Measure ρ = m / V", description: "Compare specimen density against fluid density (water = 1.0 g/cm³)." },
      { step: 2, title: "Exploit Physical Differences", description: "Match insoluble solids, miscible boiling points, or immiscible layers to apparatus." },
      { step: 3, title: "Keep vs Discard Solvent", description: "Use simple distillation with a condenser whenever pure water must be recovered." }
    ],
    takeaway: "Substances float wherever ρ_object < ρ_fluid, and physical separations never break chemical bonds.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Density buoyancy cylinder and laboratory separation methods diagram">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">BASIC SCIENCE: DENSITY BUOYANCY STACK &amp; SEPARATION MATRIX</text>
  <g transform="translate(24, 52)">
    <rect width="290" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">DENSITY COLUMN (g/cm³)</text>
    <rect x="44" y="44" width="110" height="44" fill="#f59e0b" fill-opacity="0.75" stroke="#fbbf24" />
    <text x="99" y="70" font-family="monospace" font-size="10" font-weight="800" fill="#0f172a" text-anchor="middle">Oil (0.85)</text>
    <rect x="44" y="88" width="110" height="58" fill="#0284c7" fill-opacity="0.8" stroke="#38bdf8" />
    <text x="99" y="120" font-family="monospace" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">Water (1.0)</text>
    <rect x="44" y="146" width="110" height="58" fill="#64748b" stroke="#cbd5e1" />
    <text x="99" y="179" font-family="monospace" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">Hg (13.6)</text>
    <!-- Iron cube floating on Hg -->
    <rect x="83" y="130" width="32" height="26" fill="#0f172a" stroke="#f43f5e" stroke-width="2" />
    <text x="218" y="146" font-family="monospace" font-size="9.5" font-weight="800" fill="#fda4af" text-anchor="middle">Iron (7.8)</text>
    <text x="218" y="162" font-family="system-ui, sans-serif" font-size="8.5" fill="#cbd5e1" text-anchor="middle">Sinks in H₂O,</text>
    <text x="218" y="175" font-family="system-ui, sans-serif" font-size="8.5" fill="#6ee7b7" text-anchor="middle">Floats on Hg!</text>
    <text x="145" y="226" font-family="monospace" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="middle">ρ = m / V  (1 g/cm³ = 1000 kg/m³)</text>
  </g>
  <g transform="translate(330, 52)">
    <rect width="366" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">MIXTURE SEPARATION SELECTION</text>
    <rect x="16" y="42" width="334" height="42" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="26" y="67" font-family="system-ui, sans-serif" font-size="9.5" fill="#f8fafc">Insoluble solid + water  ⇒  <tspan fill="#38bdf8" font-weight="700">Filtration (Residue + Filtrate)</tspan></text>
    <rect x="16" y="92" width="334" height="42" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="26" y="117" font-family="system-ui, sans-serif" font-size="9.5" fill="#f8fafc">Immiscible liquids (Oil/H₂O) ⇒ <tspan fill="#fbbf24" font-weight="700">Separating Funnel</tspan></text>
    <rect x="16" y="142" width="334" height="42" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="26" y="167" font-family="system-ui, sans-serif" font-size="9.5" fill="#f8fafc">Recover pure water from brine ⇒ <tspan fill="#6ee7b7" font-weight="700">Simple Distillation</tspan></text>
    <rect x="16" y="192" width="334" height="42" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="26" y="217" font-family="monospace" font-size="9.5" fill="#ecfdf5">Soluble dyes: Chromatography R_f = d_solute / d_solvent</text>
  </g>
</svg>`
  },
  "vis-jss-soil-rotation": {
    id: "vis-jss-soil-rotation",
    skillId: "skill-jss-soil-crop-husbandry",
    unitId: "unit-p3-jss-agric-science",
    title: "Ideal Loam Composition & 4-Year Legume Crop Rotation Cycle",
    type: "process_diagram",
    caption: "Balanced soil volume fractions (45% mineral, 25% air, 25% water, 5% humus) and Rhizobium nitrogen-restoration crop rotation.",
    steps: [
      { step: 1, title: "Balance Air & Capillary Water", description: "Productive loam holds ~25% soil air for root respiration alongside ~25% capillary moisture." },
      { step: 2, title: "Insert Legume Before Cereals", description: "Cowpea/groundnut root nodules host Rhizobium fixing atmospheric N₂ into nitrates." },
      { step: 3, title: "Separate Same-Family Crops", description: "Never plant tubers back-to-back so soil-borne nematodes and pests starve out." }
    ],
    takeaway: "Legume crop rotation naturally recharges soil nitrates while breaking monoculture pest cycles.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Soil composition fractions and four-year crop rotation diagram">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">AGRICULTURAL SCIENCE: SOIL FRACTIONS &amp; 4-YEAR ROTATION CYCLE</text>
  <g transform="translate(24, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">IDEAL LOAMY SOIL VOLUME (100%)</text>
    <!-- Horizontal stacked bar -->
    <rect x="20" y="52" width="126" height="36" fill="#d97706" stroke="#0f172a" />
    <text x="83" y="75" font-family="monospace" font-size="9.5" font-weight="800" fill="#ffffff" text-anchor="middle">45% Mineral</text>
    <rect x="146" y="52" width="70" height="36" fill="#0284c7" stroke="#0f172a" />
    <text x="181" y="75" font-family="monospace" font-size="9.5" font-weight="800" fill="#ffffff" text-anchor="middle">25% H₂O</text>
    <rect x="216" y="52" width="70" height="36" fill="#64748b" stroke="#0f172a" />
    <text x="251" y="75" font-family="monospace" font-size="9.5" font-weight="800" fill="#ffffff" text-anchor="middle">25% Air</text>
    <rect x="286" y="52" width="16" height="36" fill="#10b981" stroke="#0f172a" />
    <text x="280" y="104" font-family="monospace" font-size="8.5" fill="#6ee7b7" text-anchor="end">5% Humus</text>
    <rect x="16" y="118" width="288" height="112" rx="7" fill="#0f172a" stroke="#475569" />
    <text x="28" y="138" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#38bdf8">HORIZON A (TOPSOIL): Rich Humus &amp; Roots</text>
    <text x="28" y="160" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1">Sand: Large pores ⇒ fast drainage, leaches fast</text>
    <text x="28" y="180" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1">Clay: Tiny pores ⇒ waterlogs, low root O₂</text>
    <text x="28" y="200" font-family="system-ui, sans-serif" font-size="9" fill="#6ee7b7">Loam: Optimal drainage + capillary retention</text>
    <text x="28" y="220" font-family="system-ui, sans-serif" font-size="8.5" fill="#fde68a">IPM: Biological Predators + Rotation &gt; Heavy Sprays</text>
  </g>
  <g transform="translate(360, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">RESTORATIVE 4-COURSE ROTATION</text>
    <rect x="24" y="48" width="132" height="46" rx="7" fill="#0f172a" stroke="#f59e0b" />
    <text x="90" y="68" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24" text-anchor="middle">Yr 1: YAM (Deep)</text>
    <text x="90" y="84" font-family="system-ui, sans-serif" font-size="8.5" fill="#cbd5e1" text-anchor="middle">Heavy K⁺ feeder</text>
    <rect x="180" y="48" width="132" height="46" rx="7" fill="#064e3b" stroke="#10b981" />
    <text x="246" y="68" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">Yr 2: COWPEA</text>
    <text x="246" y="84" font-family="system-ui, sans-serif" font-size="8.5" fill="#d1fae5" text-anchor="middle">Rhizobium fixes N₂</text>
    <rect x="180" y="130" width="132" height="46" rx="7" fill="#0f172a" stroke="#38bdf8" />
    <text x="246" y="150" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8" text-anchor="middle">Yr 3: MAIZE</text>
    <text x="246" y="166" font-family="system-ui, sans-serif" font-size="8.5" fill="#cbd5e1" text-anchor="middle">Uses fixed nitrates</text>
    <rect x="24" y="130" width="132" height="46" rx="7" fill="#0f172a" stroke="#a855f7" />
    <text x="90" y="150" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#d8b4fe" text-anchor="middle">Yr 4: CASSAVA</text>
    <text x="90" y="166" font-family="system-ui, sans-serif" font-size="8.5" fill="#cbd5e1" text-anchor="middle">Deep subsoil cycle</text>
    <line x1="156" y1="71" x2="178" y2="71" stroke="#10b981" stroke-width="2.5" />
    <line x1="246" y1="94" x2="246" y2="128" stroke="#10b981" stroke-width="2.5" />
    <line x1="180" y1="153" x2="158" y2="153" stroke="#10b981" stroke-width="2.5" />
    <line x1="90" y1="130" x2="90" y2="96" stroke="#10b981" stroke-width="2.5" />
    <text x="168" y="216" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#ecfdf5" text-anchor="middle">Legumes ALWAYS precede high-N cereals!</text>
  </g>
</svg>`
  },
  "vis-sss-elasticity-calorimetry": {
    id: "vis-sss-elasticity-calorimetry",
    skillId: "skill-sss-elasticity-calorimetry",
    unitId: "unit-p3-sss-physics-mechanics-heat",
    title: "Hooke's Law Stress-Strain & Isothermal Latent Heating Curve",
    type: "line_chart",
    caption: "Elastic strain energy area U = 0.5 Fe under Hooke's linear curve paired with 0 °C / 100 °C latent heat plateaus.",
    steps: [
      { step: 1, title: "Compute Young's Modulus E = FL/(Ae)", description: "Convert mm² to m² (×10⁻⁶) before dividing tensile stress by strain." },
      { step: 2, title: "Read Triangular Elastic Energy", description: "Strain energy equals half the force-extension rectangle: 0.5 Fe." },
      { step: 3, title: "Track Sensible vs Latent Steps", description: "Sloped segments absorb mcΔθ; flat 0 °C and 100 °C plateaus absorb mL." }
    ],
    takeaway: "Flat phase-change plateaus consume latent heat solely to break intermolecular bonds at fixed temperature.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hookes law force extension triangle and water heating phase change curve">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">PHYSICS: HOOKE'S ELASTICITY, UPTHRUST &amp; PHASE CALORIMETRY</text>
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">ELASTIC ENERGY AREA: U = ½ F e</text>
    <line x1="46" y1="178" x2="292" y2="178" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="46" y1="48" x2="46" y2="178" stroke="#94a3b8" stroke-width="1.5" />
    <!-- Shaded triangle -->
    <polygon points="46,178 232,178 232,74" fill="#0284c7" fill-opacity="0.35" stroke="#38bdf8" stroke-width="2.5" />
    <text x="164" y="150" font-family="monospace" font-size="10.5" font-weight="800" fill="#7dd3fc" text-anchor="middle">Area = ½Fe</text>
    <text x="232" y="194" font-family="monospace" font-size="9.5" fill="#cbd5e1" text-anchor="middle">e (m)</text>
    <text x="34" y="78" font-family="monospace" font-size="9.5" fill="#cbd5e1" text-anchor="end">F</text>
    <rect x="16" y="202" width="298" height="30" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="165" y="221" font-family="monospace" font-size="9.5" fill="#6ee7b7" text-anchor="middle">E = FL/(Ae)  |  Upthrust U = ρ_f V_sub g</text>
  </g>
  <g transform="translate(370, 52)">
    <rect width="326" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">HEATING CURVE: SENSIBLE vs LATENT</text>
    <line x1="46" y1="184" x2="302" y2="184" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="46" y1="48" x2="46" y2="184" stroke="#94a3b8" stroke-width="1.5" />
    <!-- Curve: ice up to 0, melt flat, water up to 100, boil flat, steam up -->
    <polyline points="46,176 74,152 126,152 186,84 268,84 298,54" fill="none" stroke="#f59e0b" stroke-width="3" />
    <text x="100" y="144" font-family="monospace" font-size="9" font-weight="800" fill="#38bdf8" text-anchor="middle">mL_f (0°C)</text>
    <text x="227" y="76" font-family="monospace" font-size="9" font-weight="800" fill="#fda4af" text-anchor="middle">mL_v (100°C)</text>
    <text x="164" y="124" font-family="monospace" font-size="9" font-weight="700" fill="#6ee7b7">mcΔθ</text>
    <rect x="16" y="198" width="294" height="34" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="163" y="219" font-family="monospace" font-size="9.5" fill="#fde68a" text-anchor="middle">Heat Lost = Heat Gained (ΔT = T_hi - T_lo)</text>
  </g>
</svg>`
  },
  "vis-sss-optics-circuits": {
    id: "vis-sss-optics-circuits",
    skillId: "skill-sss-optics-circuits-induction",
    unitId: "unit-p3-sss-physics-waves-em",
    title: "Converging Lens Ray Diagram & Series-Parallel Battery Network",
    type: "physics_schematic",
    caption: "Principal ray convergence through focal length f alongside series-parallel DC resistor reduction with battery internal resistance r.",
    steps: [
      { step: 1, title: "Trace Principal Lens Rays", description: "Parallel ray refracts through focal point F; optical-centre ray passes undeviated." },
      { step: 2, title: "Invert Final Fraction 1/v", description: "Compute 1/v = 1/f - 1/u and take the reciprocal to obtain image distance v." },
      { step: 3, title: "Collapse Parallel Loops First", description: "Verify R_p < min(R_branch), add series R, then compute I = E/(R_ext + r)." }
    ],
    takeaway: "Always invert 1/v for lens distances and reduce inner parallel resistor branches before summing total loop EMF.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Converging lens focal diagram and series parallel battery circuit schematic">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">OPTICS &amp; CIRCUITS: THIN LENS IMAGING &amp; INTERNAL RESISTANCE</text>
  <g transform="translate(24, 52)">
    <rect width="340" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">CONVERGING LENS: 1/f = 1/u + 1/v</text>
    <!-- Principal axis -->
    <line x1="20" y1="130" x2="320" y2="130" stroke="#94a3b8" stroke-width="1.5" />
    <!-- Lens -->
    <ellipse cx="165" cy="130" rx="10" ry="74" fill="#0284c7" fill-opacity="0.35" stroke="#38bdf8" stroke-width="2" />
    <!-- Object arrow -->
    <line x1="65" y1="130" x2="65" y2="82" stroke="#10b981" stroke-width="3" />
    <text x="65" y="146" font-family="monospace" font-size="9.5" fill="#6ee7b7" text-anchor="middle">u</text>
    <!-- Rays -->
    <polyline points="65,82 165,82 285,162" fill="none" stroke="#fbbf24" stroke-width="2" />
    <line x1="65" y1="82" x2="285" y2="162" stroke="#f43f5e" stroke-width="2" />
    <!-- Inverted image -->
    <line x1="248" y1="130" x2="248" y2="148" stroke="#fda4af" stroke-width="3" />
    <circle cx="215" cy="130" r="3" fill="#fbbf24" />
    <text x="215" y="122" font-family="monospace" font-size="9" fill="#fbbf24" text-anchor="middle">F</text>
    <text x="255" y="118" font-family="monospace" font-size="9.5" fill="#fda4af">Real v &gt; 0</text>
    <rect x="16" y="196" width="308" height="36" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="170" y="218" font-family="monospace" font-size="9.5" fill="#fde68a" text-anchor="middle">m = v/u  |  Snell: n₁ sin i = n₂ sin r</text>
  </g>
  <g transform="translate(380, 52)">
    <rect width="316" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">SERIES-PARALLEL DC NETWORK</text>
    <!-- Loop frame -->
    <rect x="44" y="64" width="228" height="96" fill="none" stroke="#94a3b8" stroke-width="2" />
    <!-- Series resistor 2 ohm -->
    <rect x="74" y="54" width="54" height="20" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" />
    <text x="101" y="68" font-family="monospace" font-size="9.5" font-weight="800" fill="#38bdf8" text-anchor="middle">2.0 Ω</text>
    <!-- Parallel branches 6 and 3 ohm -->
    <rect x="168" y="42" width="64" height="20" rx="3" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
    <text x="200" y="56" font-family="monospace" font-size="9" font-weight="800" fill="#6ee7b7" text-anchor="middle">6 Ω // 3 Ω</text>
    <text x="200" y="80" font-family="monospace" font-size="9" fill="#a7f3d0" text-anchor="middle">R_p = 2.0 Ω</text>
    <!-- Battery E=12V, r=1 ohm at bottom -->
    <rect x="108" y="148" width="102" height="24" rx="5" fill="#4c0519" stroke="#f43f5e" />
    <text x="159" y="164" font-family="monospace" font-size="9.5" font-weight="800" fill="#fda4af" text-anchor="middle">E=12V, r=1Ω</text>
    <rect x="16" y="186" width="284" height="46" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="158" y="205" font-family="monospace" font-size="9.5" fill="#6ee7b7" text-anchor="middle">I = E / (R_ext + r) = 12 / (4 + 1) = 2.4 A</text>
    <text x="158" y="222" font-family="monospace" font-size="9.5" fill="#fde68a" text-anchor="middle">Terminal V = E - Ir = 9.6 V</text>
  </g>
</svg>`
  },
  "vis-sss-kinetics-equilibrium": {
    id: "vis-sss-kinetics-equilibrium",
    skillId: "skill-sss-kinetics-equilibrium-ph",
    unitId: "unit-p3-sss-chem-physical",
    title: "Catalysed Activation Barrier E_a & Logarithmic pH Ladder",
    type: "equilibrium_curve",
    caption: "Reaction enthalpy profile showing lowered catalysed activation energy (unchanged ΔH/K_c) paired with 10× [H⁺] pH intervals.",
    steps: [
      { step: 1, title: "Compare Catalysed vs Uncatalysed Paths", description: "Catalyst lowers E_a equally forward and reverse without shifting ΔH or equilibrium yield." },
      { step: 2, title: "Apply Le Chatelier Stress Rules", description: "Higher pressure shifts toward fewer gas moles; heating favors endothermic (+ΔH)." },
      { step: 3, title: "Convert [H⁺] to pH via Base-10 Logs", description: "pH = -log₁₀[H⁺] and pH + pOH = 14 at 25 °C." }
    ],
    takeaway: "Every 1-unit drop in pH multiplies hydrogen ion concentration tenfold, while catalysts speed equilibrium symmetrically.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Catalyst activation energy profile and logarithmic pH concentration scale">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">PHYSICAL CHEMISTRY: ACTIVATION BARRIER E_a &amp; LOG pH SCALE</text>
  <g transform="translate(24, 52)">
    <rect width="340" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">CATALYST LOWERS E_a (SAME ΔH &amp; YIELD)</text>
    <line x1="42" y1="184" x2="314" y2="184" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="42" y1="48" x2="42" y2="184" stroke="#94a3b8" stroke-width="1.5" />
    <!-- Reactant & Product plateaus -->
    <line x1="48" y1="126" x2="108" y2="126" stroke="#cbd5e1" stroke-width="2.5" />
    <line x1="230" y1="158" x2="296" y2="158" stroke="#cbd5e1" stroke-width="2.5" />
    <!-- Uncatalysed curve -->
    <path d="M 108 126 Q 168 24 230 158" fill="none" stroke="#f43f5e" stroke-width="2.5" stroke-dasharray="5,3" />
    <!-- Catalysed curve -->
    <path d="M 108 126 Q 168 68 230 158" fill="none" stroke="#10b981" stroke-width="3" />
    <text x="168" y="64" font-family="monospace" font-size="9.5" font-weight="800" fill="#fda4af" text-anchor="middle">Uncatalysed E_a</text>
    <text x="168" y="106" font-family="monospace" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">Catalysed E_a'</text>
    <text x="266" y="144" font-family="monospace" font-size="9" fill="#fde68a" text-anchor="middle">ΔH &lt; 0</text>
    <rect x="16" y="196" width="308" height="36" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="170" y="218" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1" text-anchor="middle">Catalyst speeds BOTH directions equally (K_c fixed)</text>
  </g>
  <g transform="translate(380, 52)">
    <rect width="316" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">LOGARITHMIC pH &amp; LE CHATELIER</text>
    <rect x="16" y="42" width="284" height="58" rx="6" fill="#0f172a" stroke="#f43f5e" />
    <text x="26" y="63" font-family="monospace" font-size="10" font-weight="800" fill="#fda4af">pH = -log₁₀[H⁺]  |  pH + pOH = 14</text>
    <text x="26" y="84" font-family="monospace" font-size="9.5" fill="#cbd5e1">pH 3 (10⁻³M) is 1,000× denser than pH 6</text>
    <rect x="16" y="110" width="284" height="56" rx="6" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="131" font-family="monospace" font-size="10" font-weight="800" fill="#38bdf8">Diprotic H₂SO₄: [H⁺] = 2 × Molarity</text>
    <text x="26" y="151" font-family="monospace" font-size="9.5" fill="#cbd5e1">0.01 M NaOH ⇒ pOH=2 ⇒ pH = 14 - 2 = 12</text>
    <rect x="16" y="176" width="284" height="56" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="26" y="196" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7">HABER: N₂ + 3H₂ ⇌ 2NH₃ (ΔH = -92 kJ)</text>
    <text x="26" y="216" font-family="monospace" font-size="9" fill="#ecfdf5">↑Pressure ⇒ Right (4→2 mol) | ↓Temp ⇒ Right</text>
  </g>
</svg>`
  },
  "vis-sss-organic-functional": {
    id: "vis-sss-organic-functional",
    skillId: "skill-sss-hydrocarbons-functional-groups",
    unitId: "unit-p3-sss-chem-organic",
    title: "Homologous Hydrocarbons, IUPAC Numbering & Esterification",
    type: "chemistry_structure",
    caption: "Structural contrast across alkanes/alkenes/alkynes, lowest-locant numbering of 4-methylpent-2-ene, and Fisher esterification.",
    steps: [
      { step: 1, title: "Identify Principal Group First", description: "Give C=C, C≡C, or -OH the lowest possible carbon locant ahead of alkyl branches." },
      { step: 2, title: "Test Unsaturation With Br₂", description: "Alkenes rapidly decolourise orange bromine water via electrophilic addition." },
      { step: 3, title: "Name Esters [Alcohol-yl] [Acid-oate]", description: "Trace the -O-R' chain from alcohol first and C=O carboxylate second." }
    ],
    takeaway: "Functional-group locant priority and bromine addition immediately distinguish organic reaction classes.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Organic chemistry homologous series, IUPAC numbering and esterification blueprint">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">ORGANIC CHEMISTRY: HOMOLOGOUS SERIES, IUPAC LOCANTS &amp; ESTERS</text>
  <g transform="translate(24, 52)">
    <rect width="340" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">IUPAC LOWEST-LOCANT PRIORITY (C=C FIRST)</text>
    <!-- Carbon chain 5..1 right-to-left -->
    <text x="58" y="88" font-family="monospace" font-size="13" font-weight="800" fill="#cbd5e1" text-anchor="middle">CH₃</text>
    <line x1="78" y1="84" x2="104" y2="84" stroke="#94a3b8" stroke-width="2" />
    <text x="122" y="88" font-family="monospace" font-size="13" font-weight="800" fill="#f59e0b" text-anchor="middle">CH</text>
    <line x1="122" y1="96" x2="122" y2="120" stroke="#f59e0b" stroke-width="2" />
    <text x="122" y="136" font-family="monospace" font-size="12" font-weight="800" fill="#fbbf24" text-anchor="middle">CH₃</text>
    <line x1="138" y1="84" x2="164" y2="84" stroke="#94a3b8" stroke-width="2" />
    <text x="180" y="88" font-family="monospace" font-size="13" font-weight="800" fill="#10b981" text-anchor="middle">CH</text>
    <line x1="196" y1="81" x2="222" y2="81" stroke="#10b981" stroke-width="2.5" />
    <line x1="196" y1="87" x2="222" y2="87" stroke="#10b981" stroke-width="2.5" />
    <text x="238" y="88" font-family="monospace" font-size="13" font-weight="800" fill="#10b981" text-anchor="middle">CH</text>
    <line x1="254" y1="84" x2="278" y2="84" stroke="#94a3b8" stroke-width="2" />
    <text x="296" y="88" font-family="monospace" font-size="13" font-weight="800" fill="#38bdf8" text-anchor="middle">CH₃</text>
    <!-- Carbon numbers -->
    <text x="58" y="60" font-family="monospace" font-size="10" fill="#94a3b8" text-anchor="middle">C5</text>
    <text x="122" y="60" font-family="monospace" font-size="10" fill="#fbbf24" text-anchor="middle">C4</text>
    <text x="180" y="60" font-family="monospace" font-size="10" fill="#6ee7b7" text-anchor="middle">C3</text>
    <text x="238" y="60" font-family="monospace" font-size="10" fill="#6ee7b7" text-anchor="middle">C2</text>
    <text x="296" y="60" font-family="monospace" font-size="10" fill="#38bdf8" text-anchor="middle">C1</text>
    <rect x="16" y="160" width="308" height="68" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="170" y="182" font-family="monospace" font-size="10.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">4-methylpent-2-ene (C=C at C2!)</text>
    <text x="170" y="203" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1" text-anchor="middle">Decolourises orange Br₂ water in the dark</text>
    <text x="170" y="218" font-family="monospace" font-size="9" fill="#94a3b8" text-anchor="middle">Alkanes C_nH_{2n+2} | Alkenes C_nH_{2n}</text>
  </g>
  <g transform="translate(380, 52)">
    <rect width="316" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">ESTERIFICATION &amp; POLYMERS</text>
    <rect x="16" y="42" width="284" height="64" rx="6" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="62" font-family="monospace" font-size="9.5" font-weight="800" fill="#fde68a">R-COOH  +  R'-OH  ⇌  R-COO-R' + H₂O</text>
    <text x="26" y="82" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1">Conc. H₂SO₄ catalyst + dehydrating agent</text>
    <text x="26" y="98" font-family="monospace" font-size="9" fill="#6ee7b7">Name: [R'-yl (alcohol)] [R-oate (acid)]</text>
    <rect x="16" y="116" width="284" height="54" rx="6" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="136" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#38bdf8">ADDITION POLYMER (100% Atom Economy)</text>
    <text x="26" y="156" font-family="monospace" font-size="9" fill="#cbd5e1">n CH₂=CH₂  ⇒  -[-CH₂-CH₂-]-_n (Polyethene)</text>
    <rect x="16" y="180" width="284" height="52" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="26" y="200" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7">CONDENSATION POLYMER (Splits H₂O)</text>
    <text x="26" y="218" font-family="monospace" font-size="9" fill="#ecfdf5">Diamine + Diacid ⇒ Nylon-6,6 + H₂O</text>
  </g>
</svg>`
  },
  "vis-sss-bio-enzymes-heart": {
    id: "vis-sss-bio-enzymes-heart",
    skillId: "skill-sss-enzymes-osmosis-transport",
    unitId: "unit-p3-sss-bio-cytology-physiology",
    title: "Enzyme Thermal Denaturation Curve & Double Cardiac Circulation",
    type: "biology_process",
    caption: "Asymmetric enzyme activity curve (reversible cold slowdown vs irreversible denaturation) alongside pulmonary & systemic blood loops.",
    steps: [
      { step: 1, title: "Distinguish 0 °C vs 70 °C", description: "Cold slows collisions reversibly; heat above optimum unfolds the 3D active site irreversibly." },
      { step: 2, title: "Trace Double Circuit Chambers", description: "Right Ventricle pumps deoxygenated blood to lungs; thick Left Ventricle pumps to body." },
      { step: 3, title: "Compare Tonicity Responses", description: "Animal cells burst in pure water; plant cell walls build turgor against bursting." }
    ],
    takeaway: "Enzyme active-site geometry governs rate peaks, while left ventricular wall thickness powers systemic circulation.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Enzyme temperature activity curve and mammalian double circulation schematic">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">BIOLOGY: ENZYME DENATURATION &amp; MAMMALIAN DOUBLE CIRCULATION</text>
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">ENZYME RATE VS TEMPERATURE (°C)</text>
    <line x1="42" y1="184" x2="306" y2="184" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="42" y1="48" x2="42" y2="184" stroke="#94a3b8" stroke-width="1.5" />
    <!-- Asymmetric bell curve peaking near 37 C -->
    <path d="M 46 176 Q 118 140 168 58 Q 204 72 222 184" fill="none" stroke="#10b981" stroke-width="3" />
    <line x1="168" y1="58" x2="168" y2="184" stroke="#38bdf8" stroke-dasharray="4,3" />
    <text x="168" y="198" font-family="monospace" font-size="9.5" font-weight="800" fill="#38bdf8" text-anchor="middle">Optimum ~37°C</text>
    <text x="92" y="102" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1" text-anchor="middle">Cold: Dormant</text>
    <text x="92" y="114" font-family="system-ui, sans-serif" font-size="8.5" fill="#6ee7b7" text-anchor="middle">(Reversible)</text>
    <text x="256" y="104" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#fda4af" text-anchor="middle">Denatured</text>
    <text x="256" y="117" font-family="system-ui, sans-serif" font-size="8.5" fill="#fda4af" text-anchor="middle">(Irreversible)</text>
    <rect x="16" y="206" width="298" height="28" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="165" y="224" font-family="system-ui, sans-serif" font-size="9" fill="#fde68a" text-anchor="middle">Plant Cell: Turgid in H₂O | Red Blood Cell: Lyses!</text>
  </g>
  <g transform="translate(370, 52)">
    <rect width="326" height="244" rx="10" fill="#1e293b" stroke="#f43f5e" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fda4af">DOUBLE CIRCULATION CIRCUIT</text>
    <rect x="96" y="38" width="134" height="32" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="163" y="58" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">LUNGS (O₂ In, CO₂ Out)</text>
    <!-- Right heart (deoxygenated blue) -->
    <rect x="24" y="96" width="124" height="66" rx="7" fill="#1e3a8a" stroke="#38bdf8" />
    <text x="86" y="118" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#ffffff" text-anchor="middle">RA → RV</text>
    <text x="86" y="136" font-family="system-ui, sans-serif" font-size="8.5" fill="#93c5fd" text-anchor="middle">Thinner wall</text>
    <text x="86" y="150" font-family="system-ui, sans-serif" font-size="8.5" fill="#93c5fd" text-anchor="middle">(to lungs)</text>
    <!-- Left heart (oxygenated red) -->
    <rect x="178" y="96" width="124" height="66" rx="7" fill="#7f1d1d" stroke="#f43f5e" stroke-width="2.5" />
    <text x="240" y="118" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#ffffff" text-anchor="middle">LA → LV</text>
    <text x="240" y="136" font-family="system-ui, sans-serif" font-size="8.5" fill="#fecdd3" text-anchor="middle">3× Thicker Wall</text>
    <text x="240" y="150" font-family="system-ui, sans-serif" font-size="8.5" fill="#fecdd3" text-anchor="middle">(Aorta → Body)</text>
    <rect x="96" y="182" width="134" height="32" rx="6" fill="#0f172a" stroke="#94a3b8" />
    <text x="163" y="202" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#e2e8f0" text-anchor="middle">SYSTEMIC BODY CELLS</text>
    <text x="163" y="232" font-family="monospace" font-size="8.5" fill="#cbd5e1" text-anchor="middle">Pulm. Artery=Deoxy | Pulm. Vein=Oxy</text>
  </g>
</svg>`
  },
  "vis-sss-bio-genetics-trophic": {
    id: "vis-sss-bio-genetics-trophic",
    skillId: "skill-sss-mendelian-dna-ecosystems",
    unitId: "unit-p3-sss-bio-genetics-ecology",
    title: "X-Linked Punnett Grid, DNA->mRNA Transcription & 10% Energy Pyramid",
    type: "biology_process",
    caption: "2×2 sex-linked Punnett probability split alongside DNA-to-mRNA Uracil transcription and 10% trophic energy attenuation.",
    steps: [
      { step: 1, title: "Map Gametes Across Axes", description: "Separate X^H / X^h maternal gametes against X^H / Y paternal gametes." },
      { step: 2, title: "Pair DNA A with RNA U", description: "Every DNA Adenine transcribes to mRNA Uracil (zero Thymine in RNA)." },
      { step: 3, title: "Attenuate by 10% Per Tier", description: "Respiration dissipates ~90% of chemical energy at each consumer transfer." }
    ],
    takeaway: "Energy pyramids can never invert because ~90% of energy is lost as respiratory heat at every step.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="X-linked Punnett square and 10 percent ecological energy pyramid diagram">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">GENETICS &amp; ECOLOGY: X-LINKED PUNNETT, mRNA &amp; 10% PYRAMID</text>
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">CARRIER CROSS: XᴴXʰ × XᴴY</text>
    <text x="148" y="48" font-family="monospace" font-size="11" font-weight="800" fill="#6ee7b7" text-anchor="middle">Xᴴ</text>
    <text x="248" y="48" font-family="monospace" font-size="11" font-weight="800" fill="#fbbf24" text-anchor="middle">Y</text>
    <text x="58" y="88" font-family="monospace" font-size="11" font-weight="800" fill="#6ee7b7" text-anchor="middle">Xᴴ</text>
    <text x="58" y="138" font-family="monospace" font-size="11" font-weight="800" fill="#fda4af" text-anchor="middle">Xʰ</text>
    <rect x="98" y="58" width="98" height="46" fill="#064e3b" stroke="#10b981" />
    <text x="147" y="85" font-family="monospace" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">XᴴXᴴ (Normal)</text>
    <rect x="200" y="58" width="98" height="46" fill="#064e3b" stroke="#10b981" />
    <text x="249" y="85" font-family="monospace" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">XᴴY (Normal)</text>
    <rect x="98" y="108" width="98" height="46" fill="#78350f" stroke="#f59e0b" />
    <text x="147" y="135" font-family="monospace" font-size="10.5" font-weight="800" fill="#fde68a" text-anchor="middle">XᴴXʰ Carrier</text>
    <rect x="200" y="108" width="98" height="46" fill="#7f1d1d" stroke="#f43f5e" />
    <text x="249" y="135" font-family="monospace" font-size="10.5" font-weight="800" fill="#fecdd3" text-anchor="middle">XʰY Affected</text>
    <rect x="16" y="168" width="298" height="64" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="165" y="188" font-family="monospace" font-size="9.5" font-weight="700" fill="#fda4af" text-anchor="middle">50% of SONS affected | 25% of ALL children</text>
    <text x="165" y="212" font-family="monospace" font-size="9.5" fill="#38bdf8" text-anchor="middle">DNA 3'-TAC-5'  →  mRNA 5'-AUG-3' (A→U)</text>
  </g>
  <g transform="translate(370, 52)">
    <rect width="326" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">10% TROPHIC ENERGY PYRAMID</text>
    <!-- Pyramid tiers centered at x=163 -->
    <rect x="131" y="46" width="64" height="28" rx="4" fill="#f43f5e" stroke="#ffffff" />
    <text x="163" y="64" font-family="monospace" font-size="9.5" font-weight="800" fill="#ffffff" text-anchor="middle">80 kJ</text>
    <rect x="103" y="80" width="120" height="30" rx="4" fill="#f59e0b" stroke="#ffffff" />
    <text x="163" y="99" font-family="monospace" font-size="9.5" font-weight="800" fill="#0f172a" text-anchor="middle">Toad: 800 kJ</text>
    <rect x="65" y="116" width="196" height="32" rx="4" fill="#38bdf8" stroke="#ffffff" />
    <text x="163" y="136" font-family="monospace" font-size="10" font-weight="800" fill="#0f172a" text-anchor="middle">Grasshopper: 8,000 kJ</text>
    <rect x="26" y="154" width="274" height="34" rx="4" fill="#10b981" stroke="#ffffff" />
    <text x="163" y="175" font-family="monospace" font-size="10.5" font-weight="800" fill="#0f172a" text-anchor="middle">Producers (Grass): 80,000 kJ</text>
    <rect x="16" y="198" width="294" height="34" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="163" y="219" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1" text-anchor="middle">~90% lost as respiration heat per step (never inverts)</text>
  </g>
</svg>`
  },
  "vis-sss-agric-npk-cec": {
    id: "vis-sss-agric-npk-cec",
    skillId: "skill-sss-soil-ph-cation-irrigation",
    unitId: "unit-p3-sss-agric-soil-chemistry",
    title: "NPK 50 kg Bag Breakdown, CEC Colloid Exchange & Irrigation Efficiency",
    type: "bar_comparison",
    caption: "Visualizing active nutrient weights in NPK 15-15-15 bags, CaCO₃ soil pH liming, and drip vs furrow irrigation efficiency.",
    steps: [
      { step: 1, title: "Multiply Grade % × Bag Weight", description: "A 50 kg bag of NPK 15-15-15 holds 7.5 kg N + 7.5 kg P₂O₅ + 7.5 kg K₂O + 27.5 kg carrier." },
      { step: 2, title: "Neutralize Acid Soils With CaCO₃", description: "Lime displaces acidic H⁺/Al³⁺ ions on clay-humus colloids toward pH 6.5." },
      { step: 3, title: "Divide Root Demand by Efficiency", description: "V_pumped = V_root / η maximizes precision under 90%-efficient drip systems." }
    ],
    takeaway: "Grade numbers are percentages, not absolute kilograms per 50 kg sack; drip irrigation slashes evaporative waste.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="NPK 50kg bag active nutrient composition and soil cation exchange capacity diagram">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">AGRO-ENGINEERING: NPK 50 kg COMPOSITION, CEC &amp; DRIP IRRIGATION</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">50 kg BAG OF NPK 15-15-15 BREAKDOWN</text>
    <rect x="24" y="50" width="288" height="36" fill="#334155" stroke="#94a3b8" />
    <rect x="24" y="50" width="43" height="36" fill="#38bdf8" />
    <rect x="67" y="50" width="43" height="36" fill="#f59e0b" />
    <rect x="110" y="50" width="43" height="36" fill="#10b981" />
    <text x="45" y="72" font-family="monospace" font-size="9" font-weight="800" fill="#0f172a" text-anchor="middle">N</text>
    <text x="88" y="72" font-family="monospace" font-size="9" font-weight="800" fill="#0f172a" text-anchor="middle">P₂O₅</text>
    <text x="131" y="72" font-family="monospace" font-size="9" font-weight="800" fill="#0f172a" text-anchor="middle">K₂O</text>
    <text x="232" y="72" font-family="monospace" font-size="9.5" font-weight="800" fill="#e2e8f0" text-anchor="middle">27.5 kg Carrier (55%)</text>
    <rect x="16" y="102" width="304" height="62" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="26" y="122" font-family="monospace" font-size="9.5" font-weight="700" fill="#38bdf8">15% × 50 kg = 7.5 kg EACH (22.5 kg Active)</text>
    <text x="26" y="142" font-family="monospace" font-size="9.5" fill="#cbd5e1">45 kg N/ha target ⇒ 45 / 7.5 = 6 Bags/ha</text>
    <rect x="16" y="174" width="304" height="58" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="26" y="196" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7">LIMING ACIDIC SOIL (pH 4.7 → 6.5):</text>
    <text x="26" y="216" font-family="monospace" font-size="9.5" fill="#ecfdf5">CaCO₃ + 2H⁺ → Ca²⁺ + CO₂ + H₂O (CEC)</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">IRRIGATION APPLICATION EFFICIENCY (η)</text>
    <!-- Efficiency bars -->
    <text x="22" y="64" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#fde68a">Furrow (55%)</text>
    <rect x="120" y="50" width="99" height="20" rx="4" fill="#f59e0b" />
    <text x="22" y="102" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#38bdf8">Sprinkler (75%)</text>
    <rect x="120" y="88" width="135" height="20" rx="4" fill="#38bdf8" />
    <text x="22" y="140" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#6ee7b7">Drip (90%)</text>
    <rect x="120" y="126" width="162" height="20" rx="4" fill="#10b981" />
    <rect x="16" y="168" width="288" height="64" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="160" y="190" font-family="monospace" font-size="9.5" font-weight="700" fill="#6ee7b7" text-anchor="middle">V_pumped = V_root / η</text>
    <text x="160" y="210" font-family="monospace" font-size="9.5" fill="#cbd5e1" text-anchor="middle">3,600 m³ / 0.90 = 4,000 m³</text>
  </g>
</svg>`
  }
};
