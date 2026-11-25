import { EducationalVisualization } from "../types/contentSaturation";

export const P1_MATH_BATCH2_SSS_VISUALIZATIONS: Record<string, EducationalVisualization> = {
  "vis-sss-calculus-vectors-ode": {
    id: "vis-sss-calculus-vectors-ode",
    skillId: "skill-sss-calculus-vectors-ode",
    unitId: "unit-p1-sss-calculus-vectors-ode",
    title: "3D Orthogonal Dot Product, Chain Rule & Separable Exponential ODE",
    type: "coordinate_graph",
    caption: "Illustrating orthogonal vectors (a · b = 0), chain differentiation f'(g(x))g'(x), and exponential ODE trajectories y = y₀e^(kx).",
    steps: [
      { step: 1, title: "Multiply Outer × Inner", description: "Chain rule multiplies outer derivative f'(g(x)) by inner derivative g'(x)." },
      { step: 2, title: "Test a · b = 0", description: "Dot product zero confirms 90° perpendicularity in 3D space." },
      { step: 3, title: "Separate Differentials", description: "Move all y-terms to dy and x-terms to dx before integrating and fitting C." }
    ],
    takeaway: "Always multiply by inner derivative g'(x) and fit constant C from initial conditions before rearranging.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="3D orthogonal vectors and separable ODE solution curves">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">CALCULUS, 3D VECTOR ORTHOGONALITY &amp; SEPARABLE ODEs</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">SEPARABLE ODE: dy/dx = 3x²y (y(0) = 4)</text>
    <line x1="48" y1="202" x2="306" y2="202" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="88" y1="44" x2="88" y2="212" stroke="#94a3b8" stroke-width="1.5" />
    <path d="M 48 192 Q 95 180 155 150 T 255 58" fill="none" stroke="#10b981" stroke-width="2.5" />
    <circle cx="88" cy="180" r="5" fill="#fbbf24" />
    <text x="98" y="182" font-family="monospace" font-size="10" font-weight="800" fill="#fbbf24">(0, 4) Initial Value</text>
    <text x="168" y="96" font-family="monospace" font-size="10.5" font-weight="800" fill="#6ee7b7">y = 4e^(x³)</text>
    <text x="168" y="228" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1" text-anchor="middle">∫(1/y)dy = ∫3x²dx ⇒ ln|y| = x³ + C</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">VECTOR &amp; DERIVATIVE CORE RULES</text>
    <rect x="16" y="42" width="288" height="58" rx="8" fill="#0f172a" stroke="#10b981" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">3D DOT PRODUCT &amp; UNIT VECTOR</text>
    <text x="26" y="84" font-family="monospace" font-size="9.5" fill="#ecfdf5">a·b = Σaᵢbᵢ = 0 (⊥)  |  û = u / |u|</text>
    <rect x="16" y="110" width="288" height="58" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="132" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">CHAIN &amp; PRODUCT DIFFERENTIATION</text>
    <text x="26" y="152" font-family="monospace" font-size="9.5" fill="#fde68a">[f(g)]' = f'(g)·g'  |  (uv)' = u'v + uv'</text>
    <rect x="16" y="178" width="288" height="52" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="160" y="199" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">FUNDAMENTAL DEFINITE INTEGRAL</text>
    <text x="160" y="218" font-family="monospace" font-size="10" fill="#ecfdf5" text-anchor="middle">∫ₐᵇ f(x) dx = F(b) − F(a)</text>
  </g>
</svg>`
  },
  "vis-sss-matrices-linear-transforms": {
    id: "vis-sss-matrices-linear-transforms",
    skillId: "skill-sss-matrices-linear-transforms",
    unitId: "unit-p1-sss-matrices-linear-transforms",
    title: "2D Matrix Basis Mapping, Area Determinant |det T| & Inversion",
    type: "geometry_diagram",
    caption: "Mapping unit square basis vectors e₁=(1,0) and e₂=(0,1) to matrix columns with area scaling |det T| and inverse formula A⁻¹.",
    steps: [
      { step: 1, title: "Read Basis Columns", description: "Column 1 = T(1, 0) and Column 2 = T(0, 1)." },
      { step: 2, title: "Multiply Right-to-Left", description: "Transform S followed by R composes as R · S." },
      { step: 3, title: "Scale Area by |det T|", description: "Determinant zero marks a singular (collapsed, non-invertible) matrix." }
    ],
    takeaway: "Every 2×2 matrix transforms the unit square into a parallelogram of area |ad − bc|.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="2x2 linear transformation matrix basis mapping and inverse">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">MATRIX INVERSES, DETERMINANTS &amp; LINEAR TRANSFORMATIONS</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">BASIS UNIT SQUARE → PARALLELOGRAM</text>
    <line x1="48" y1="195" x2="296" y2="195" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="60" y1="50" x2="60" y2="205" stroke="#94a3b8" stroke-width="1.5" />
    <!-- Unit square -->
    <rect x="60" y="145" width="50" height="50" fill="#f59e0b" fill-opacity="0.22" stroke="#f59e0b" stroke-width="2" />
    <text x="85" y="174" font-family="monospace" font-size="9.5" font-weight="800" fill="#fbbf24" text-anchor="middle">A = 1</text>
    <!-- Transformed parallelogram [[3,1],[1,2]] scaled -->
    <polygon points="60,195 210,145 260,45 110,95" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="2.5" />
    <text x="165" y="124" font-family="monospace" font-size="11" font-weight="800" fill="#6ee7b7" text-anchor="middle">Area' = |det T| = 5</text>
    <text x="168" y="226" font-family="monospace" font-size="9.5" fill="#cbd5e1" text-anchor="middle">Col 1 = T(1,0) = (3,1) | Col 2 = T(0,1) = (1,2)</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#a855f7" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#d8b4fe">2×2 INVERSE &amp; SYSTEM SOLVER</text>
    <rect x="16" y="42" width="288" height="58" rx="8" fill="#0f172a" stroke="#a855f7" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#d8b4fe">DETERMINANT &amp; SINGULARITY</text>
    <text x="26" y="84" font-family="monospace" font-size="10" fill="#f3e8ff">Δ = ad − bc  (Δ = 0 ⇔ Singular / No Inverse)</text>
    <rect x="16" y="110" width="288" height="58" rx="8" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="132" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8">ADJOINT INVERSION FORMULA</text>
    <text x="26" y="152" font-family="monospace" font-size="10" fill="#e0f2fe">A⁻¹ = (1/Δ) [[d, −b], [−c, a]] ⇒ X = A⁻¹B</text>
    <rect x="16" y="178" width="288" height="52" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="160" y="199" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">COMPOSITION ORDER (RIGHT-TO-LEFT)</text>
    <text x="160" y="218" font-family="monospace" font-size="10" fill="#ecfdf5" text-anchor="middle">'T₁ then T₂' ⇒ Matrix Product = T₂ · T₁</text>
  </g>
</svg>`
  },
  "vis-sss-complex-sequences-series": {
    id: "vis-sss-complex-sequences-series",
    skillId: "skill-sss-complex-sequences-series",
    unitId: "unit-p1-sss-complex-sequences-series",
    title: "Argand Polar Plane, De Moivre Powers & Convergent GP S_∞",
    type: "coordinate_graph",
    caption: "Plotting z = a + bi on the Argand plane with modulus r = √(a² + b²), De Moivre rotation nθ, and convergent geometric series S_∞ = a/(1−r).",
    steps: [
      { step: 1, title: "Rationalize Quotients", description: "Multiply top and bottom by denominator conjugate z̄ = a − bi so denominator becomes a² + b²." },
      { step: 2, title: "Rotate by De Moivre", description: "Raise r to n and multiply argument θ by n." },
      { step: 3, title: "Verify |r| < 1", description: "Evaluate infinite GP sum S_∞ = a / (1 − r) strictly inside |r| < 1." }
    ],
    takeaway: "Multiplying complex numbers stretches magnitudes and adds angles; infinite GPs converge only when |r| < 1.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Argand complex plane polar form and infinite GP convergence">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">ARGAND PLANE (r∠θ), DE MOIVRE &amp; CONVERGENT SERIES</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">ARGAND PLANE &amp; POLAR ROTATION</text>
    <line x1="48" y1="168" x2="302" y2="168" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="120" y1="45" x2="120" y2="215" stroke="#94a3b8" stroke-width="1.5" />
    <text x="290" y="182" font-family="monospace" font-size="9.5" fill="#cbd5e1">Re(z)</text>
    <text x="128" y="54" font-family="monospace" font-size="9.5" fill="#cbd5e1">Im(z)</text>
    <line x1="120" y1="168" x2="232" y2="86" stroke="#fbbf24" stroke-width="2.5" />
    <line x1="232" y1="86" x2="232" y2="168" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3" />
    <circle cx="232" cy="86" r="5" fill="#fbbf24" />
    <text x="238" y="82" font-family="monospace" font-size="10.5" font-weight="800" fill="#fbbf24">z = a + bi</text>
    <text x="164" y="114" font-family="monospace" font-size="10" font-weight="800" fill="#38bdf8">r = √(a²+b²)</text>
    <text x="150" y="160" font-family="monospace" font-size="10" font-weight="800" fill="#6ee7b7">θ</text>
    <text x="168" y="230" font-family="monospace" font-size="9.5" fill="#fde68a" text-anchor="middle">zⁿ = rⁿ(cos nθ + i sin nθ)  |  i⁴ = 1</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">CONJUGATE DIVISION &amp; INFINITE GP</text>
    <rect x="16" y="42" width="288" height="58" rx="8" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8">COMPLEX CONJUGATE QUOTIENT</text>
    <text x="26" y="84" font-family="monospace" font-size="10" fill="#e0f2fe">z₁/z₂ = (z₁·z̄₂)/(a²+b²)  [i² = −1]</text>
    <rect x="16" y="110" width="288" height="58" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="132" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">ARITHMETIC &amp; GEOMETRIC SUMS</text>
    <text x="26" y="152" font-family="monospace" font-size="9.5" fill="#fde68a">AP: (n/2)[2a+(n−1)d] | GP: a(1−rⁿ)/(1−r)</text>
    <rect x="16" y="178" width="288" height="52" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="160" y="199" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">CONVERGENT INFINITE SERIES (|r| &lt; 1)</text>
    <text x="160" y="218" font-family="monospace" font-size="10.5" fill="#ecfdf5" text-anchor="middle">S_∞ = a / (1 − r)</text>
  </g>
</svg>`
  },
  "vis-sss-coordinate-conics": {
    id: "vis-sss-coordinate-conics",
    skillId: "skill-sss-coordinate-conics",
    unitId: "unit-p1-sss-coordinate-conics",
    title: "Conic Sections Atlas: Circle Tangent, Parabola, Ellipse & Hyperbola",
    type: "geometry_diagram",
    caption: "Comparing conic focal equations and eccentricity e: circle (e=0), ellipse (c²=a²−b², e<1), parabola (e=1), and hyperbola (c²=a²+b², asymptotes ±(b/a)x).",
    steps: [
      { step: 1, title: "Complete Circle Squares", description: "Center is (−g, −f) and tangent gradient is −1 / m_radius." },
      { step: 2, title: "Locate Conic Foci c", description: "Ellipse uses c² = a² − b²; Hyperbola uses c² = a² + b²." },
      { step: 3, title: "Classify by Eccentricity", description: "e = 1 parabola, 0 < e < 1 ellipse, e > 1 hyperbola." }
    ],
    takeaway: "Ellipse subtracts semi-axes (c² = a² − b²) inside the oval; hyperbola adds them (c² = a² + b²) outside.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ellipse, parabola, hyperbola, and circle tangent conic summary">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">CONIC SECTIONS &amp; ANALYTIC CIRCLE TANGENTS</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">ELLIPSE x²/a² + y²/b² = 1 (FOCI ±c, 0)</text>
    <line x1="36" y1="128" x2="300" y2="128" stroke="#64748b" stroke-width="1.5" />
    <line x1="168" y1="46" x2="168" y2="210" stroke="#64748b" stroke-width="1.5" />
    <ellipse cx="168" cy="128" rx="112" ry="64" fill="#38bdf8" fill-opacity="0.14" stroke="#38bdf8" stroke-width="2.5" />
    <circle cx="88" cy="128" r="4.5" fill="#fbbf24" />
    <circle cx="248" cy="128" r="4.5" fill="#fbbf24" />
    <text x="88" y="148" font-family="monospace" font-size="9.5" font-weight="800" fill="#fbbf24" text-anchor="middle">F₁(-c,0)</text>
    <text x="248" y="148" font-family="monospace" font-size="9.5" font-weight="800" fill="#fbbf24" text-anchor="middle">F₂(c,0)</text>
    <text x="284" y="120" font-family="monospace" font-size="10" font-weight="800" fill="#6ee7b7">a</text>
    <text x="176" y="76" font-family="monospace" font-size="10" font-weight="800" fill="#6ee7b7">b</text>
    <text x="168" y="228" font-family="monospace" font-size="10" fill="#cbd5e1" text-anchor="middle">c² = a² − b²  |  e = c/a &lt; 1</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">CIRCLE TANGENT, PARABOLA &amp; HYPERBOLA</text>
    <rect x="16" y="42" width="288" height="58" rx="8" fill="#0f172a" stroke="#10b981" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">CIRCLE CENTER &amp; TANGENT</text>
    <text x="26" y="84" font-family="monospace" font-size="9.5" fill="#ecfdf5">C=(−g,−f), r=√(g²+f²−c) | m_tan = −1/m_rad</text>
    <rect x="16" y="110" width="288" height="56" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="132" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">PARABOLA y² = 4ax (e = 1)</text>
    <text x="26" y="152" font-family="monospace" font-size="9.5" fill="#fde68a">Focus (a, 0) | Directrix x = −a | Latus = 4a</text>
    <rect x="16" y="176" width="288" height="54" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="26" y="198" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">HYPERBOLA x²/a² − y²/b² = 1 (e &gt; 1)</text>
    <text x="26" y="218" font-family="monospace" font-size="9.5" fill="#ecfdf5">c² = a² + b² | Asymptotes y = ±(b/a)x</text>
  </g>
</svg>`
  },
  "vis-sss-linear-programming": {
    id: "vis-sss-linear-programming",
    skillId: "skill-sss-linear-programming",
    unitId: "unit-p1-sss-linear-programming",
    title: "Convex Feasible Region Polygon & Corner-Point Optimization",
    type: "coordinate_graph",
    caption: "Shaded feasible polygon for x + 2y ≤ 16 and 2x + y ≤ 14 showing optimal profit vertex (4, 6) via the Corner-Point Theorem.",
    steps: [
      { step: 1, title: "Plot Boundary Lines", description: "Connect x- and y-intercepts and test (0, 0) for feasible half-planes." },
      { step: 2, title: "Filter Valid Vertices", description: "Solve line intersections and drop any intercepts outside other constraints." },
      { step: 3, title: "Evaluate Z at All Corners", description: "Compute objective ax + by at every feasible vertex to lock max/min." }
    ],
    takeaway: "Every linear objective reaches its optimum at a feasible polygon corner.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Linear programming feasible polygon with vertex (4, 6)">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">LINEAR PROGRAMMING: CONVEX FEASIBLE REGION &amp; OPTIMAL VERTEX</text>
  <g transform="translate(24, 52)">
    <rect width="346" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">BOUNDED FEASIBLE POLYGON (x, y ≥ 0)</text>
    <line x1="48" y1="205" x2="310" y2="205" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="48" y1="45" x2="48" y2="205" stroke="#94a3b8" stroke-width="1.5" />
    <!-- Feasible polygon (0,0)->(7,0)->(4,6)->(0,8) scaled x*15, y*12 from (48, 205) -->
    <polygon points="48,205 153,205 108,133 48,109" fill="#10b981" fill-opacity="0.28" stroke="#10b981" stroke-width="2.5" />
    <!-- Constraint lines -->
    <line x1="48" y1="109" x2="288" y2="205" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="5,3" />
    <line x1="48" y1="37" x2="153" y2="205" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="5,3" />
    <!-- Corner dots -->
    <circle cx="48" cy="205" r="4" fill="#cbd5e1" />
    <circle cx="153" cy="205" r="4" fill="#fbbf24" />
    <circle cx="48" cy="109" r="4" fill="#38bdf8" />
    <circle cx="108" cy="133" r="6" fill="#f43f5e" stroke="#ffffff" stroke-width="1.5" />
    <text x="118" y="129" font-family="monospace" font-size="10.5" font-weight="800" fill="#fda4af">★ (4, 6) Optimal</text>
    <text x="153" y="220" font-family="monospace" font-size="9.5" fill="#fbbf24" text-anchor="middle">(7,0)</text>
    <text x="288" y="220" font-family="monospace" font-size="9" fill="#64748b" text-anchor="middle">(16,0) Cut</text>
    <text x="180" y="236" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1" text-anchor="middle">Shaded polygon satisfies BOTH constraints</text>
  </g>
  <g transform="translate(386, 52)">
    <rect width="310" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">CORNER-POINT EVALUATION TABLE</text>
    <rect x="16" y="42" width="278" height="122" rx="8" fill="#0f172a" stroke="#475569" />
    <text x="28" y="64" font-family="monospace" font-size="10" font-weight="800" fill="#94a3b8">Vertex   | P = 4,000x + 7,000y</text>
    <line x1="26" y1="72" x2="282" y2="72" stroke="#334155" />
    <text x="28" y="92" font-family="monospace" font-size="10" fill="#cbd5e1">(0, 0)   | ₦0</text>
    <text x="28" y="112" font-family="monospace" font-size="10" fill="#fbbf24">(7, 0)   | ₦28,000</text>
    <text x="28" y="132" font-family="monospace" font-size="10" fill="#38bdf8">(0, 8)   | ₦56,000</text>
    <text x="28" y="152" font-family="monospace" font-size="10.5" font-weight="800" fill="#6ee7b7">(4, 6)   | ₦58,000 ★ MAX</text>
    <rect x="16" y="176" width="278" height="54" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="155" y="198" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">WORDING GUARDRAIL</text>
    <text x="155" y="216" font-family="monospace" font-size="9.5" fill="#ecfdf5" text-anchor="middle">"At least 3x loaves (x) as cakes (y)" ⇒ x ≥ 3y</text>
  </g>
</svg>`
  },
  "vis-sss-numerical-methods": {
    id: "vis-sss-numerical-methods",
    skillId: "skill-sss-numerical-methods",
    unitId: "unit-p1-sss-numerical-methods",
    title: "Newton-Raphson Tangent Convergence & Simpson's 1/3 Quadrature",
    type: "coordinate_graph",
    caption: "Visualizing tangent-line Newton-Raphson root projection x_{n+1} = x_n − f(x_n)/f'(x_n), error quotient bounds, and Simpson 1-4-2-4-1 rule.",
    steps: [
      { step: 1, title: "Bracket Sign Flip", description: "Check f(a)·f(b) < 0 across a continuous interval." },
      { step: 2, title: "Project Tangent Line", description: "Newton-Raphson jumps from (x_n, f(x_n)) down tangent to x_{n+1}." },
      { step: 3, title: "Apply Even-n Quadrature", description: "Use Simpson weights (1, 4, 2, 4, ..., 1) with even strips n." }
    ],
    takeaway: "Maximize quotients via Top_max/Bot_min, refine roots with Newton-Raphson, and integrate cubics exactly using Simpson's Rule.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Newton-Raphson tangent root finder and numerical integration weights">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">NUMERICAL METHODS: NEWTON-RAPHSON, SIMPSON &amp; ERROR BOUNDS</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">NEWTON-RAPHSON TANGENT CONVERGENCE</text>
    <line x1="36" y1="184" x2="306" y2="184" stroke="#94a3b8" stroke-width="1.5" />
    <path d="M 60 198 Q 165 182 268 62" fill="none" stroke="#10b981" stroke-width="2.5" />
    <line x1="242" y1="92" x2="242" y2="184" stroke="#94a3b8" stroke-dasharray="4,3" />
    <circle cx="242" cy="92" r="4.5" fill="#fbbf24" />
    <!-- Tangent line -->
    <line x1="158" y1="184" x2="262" y2="70" stroke="#f59e0b" stroke-width="2" />
    <circle cx="158" cy="184" r="4.5" fill="#f59e0b" />
    <circle cx="114" cy="184" r="4.5" fill="#38bdf8" />
    <text x="242" y="200" font-family="monospace" font-size="10" font-weight="800" fill="#fbbf24" text-anchor="middle">x₀</text>
    <text x="158" y="200" font-family="monospace" font-size="10" font-weight="800" fill="#f59e0b" text-anchor="middle">x₁</text>
    <text x="114" y="200" font-family="monospace" font-size="10" font-weight="800" fill="#38bdf8" text-anchor="middle">Root</text>
    <text x="168" y="228" font-family="monospace" font-size="10" fill="#cbd5e1" text-anchor="middle">x_{n+1} = x_n − f(x_n) / f'(x_n)</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">QUADRATURE &amp; PROPAGATION BOUNDS</text>
    <rect x="16" y="42" width="288" height="58" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">QUOTIENT &amp; % ERROR BOUNDS</text>
    <text x="26" y="84" font-family="monospace" font-size="9.5" fill="#fde68a">Max(M/V) = M_max / V_min | %Err = |Δ|/True</text>
    <rect x="16" y="110" width="288" height="58" rx="8" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="132" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8">SIMPSON'S 1/3 RULE (EVEN n)</text>
    <text x="26" y="152" font-family="monospace" font-size="9.5" fill="#e0f2fe">(h/3)[y₀ + y_n + 4(y₁+y₃+..) + 2(y₂+y₄+..)]</text>
    <rect x="16" y="178" width="288" height="52" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="160" y="199" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">TRAPEZIUM RULE (ANY n)</text>
    <text x="160" y="218" font-family="monospace" font-size="9.5" fill="#ecfdf5" text-anchor="middle">(h/2)[y₀ + y_n + 2(y₁ + y₂ + ... + y_{n−1})]</text>
  </g>
</svg>`
  },
  "vis-univ-calculus-mechanics-design": {
    id: "vis-univ-calculus-mechanics-design",
    skillId: "skill-univ-calculus-mechanics-design",
    unitId: "unit-p1-univ-calculus-mechanics-design",
    title: "Simply Supported Beam Equilibrium & Constrained Vessel Optimization",
    type: "geometry_diagram",
    caption: "Loaded beam free-body diagram showing point load, midpoint self-weight, and support reactions alongside open/closed tank optima.",
    steps: [
      { step: 1, title: "Place Beam Self-Weight", description: "Always draw uniform girder weight at L/2." },
      { step: 2, title: "Sum Moments About Support A", description: "Eliminate R_A directly to solve R_B, then use ΣF_y = 0." },
      { step: 3, title: "Optimize Material Area", description: "Eliminate secondary dimension h from volume V before setting dS/dx = 0." }
    ],
    takeaway: "Static equilibrium requires both ΣF = 0 and ΣM = 0; constrained area minimization requires substituting V first.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Simply supported steel beam free-body diagram and constrained calculus optimization">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">ENGINEERING DESIGN: BEAM STATICS (ΣM = 0) &amp; OPTIMIZATION</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">UNIFORM 10 m BEAM FREE-BODY DIAGRAM</text>
    <!-- Beam -->
    <rect x="44" y="114" width="248" height="14" fill="#94a3b8" stroke="#f8fafc" />
    <!-- Supports A and B -->
    <polygon points="44,128 34,150 54,150" fill="#10b981" />
    <polygon points="292,128 282,150 302,150" fill="#10b981" />
    <text x="44" y="170" font-family="monospace" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">R_A=680N</text>
    <text x="292" y="170" font-family="monospace" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">R_B=320N</text>
    <!-- Loads down -->
    <line x1="94" y1="62" x2="94" y2="112" stroke="#f43f5e" stroke-width="2.5" />
    <polygon points="94,114 89,104 99,104" fill="#f43f5e" />
    <text x="94" y="54" font-family="monospace" font-size="9.5" font-weight="800" fill="#fda4af" text-anchor="middle">600N (2m)</text>
    <line x1="168" y1="72" x2="168" y2="112" stroke="#fbbf24" stroke-width="2.5" />
    <polygon points="168,114 163,104 173,104" fill="#fbbf24" />
    <text x="168" y="64" font-family="monospace" font-size="9.5" font-weight="800" fill="#fde68a" text-anchor="middle">W=400N (5m)</text>
    <text x="168" y="206" font-family="monospace" font-size="9.5" fill="#cbd5e1" text-anchor="middle">ΣM_A: 10·R_B = 600(2) + 400(5) = 3,200</text>
    <text x="168" y="226" font-family="monospace" font-size="9.5" fill="#6ee7b7" text-anchor="middle">ΣF_y: R_A + R_B = 1,000 N</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">CALCULUS DESIGN &amp; KINEMATICS CHAIN</text>
    <rect x="16" y="42" width="288" height="58" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">VARIABLE-ACCELERATION KINEMATICS</text>
    <text x="26" y="84" font-family="monospace" font-size="9.5" fill="#fde68a">a(t) ──∫──▶ v(t) ──∫──▶ s(t)  [d/dt reverses]</text>
    <rect x="16" y="110" width="288" height="58" rx="8" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="132" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8">CLOSED CAN MIN SURFACE AREA</text>
    <text x="26" y="152" font-family="monospace" font-size="9.5" fill="#e0f2fe">V = πr²h fixed ⇒ min S when h = 2r (S'' &gt; 0)</text>
    <rect x="16" y="178" width="288" height="52" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="160" y="199" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">3-SIDED FENCE MAX AREA (2x + y = L)</text>
    <text x="160" y="218" font-family="monospace" font-size="9.5" fill="#ecfdf5" text-anchor="middle">Optimal Rectangle: x = L/4, y = L/2</text>
  </g>
</svg>`
  },
  "vis-sss-data-analytics-stats": {
    id: "vis-sss-data-analytics-stats",
    skillId: "skill-sss-data-analytics-stats",
    unitId: "unit-p1-sss-data-analytics-stats",
    title: "Normal Z-Score Curve & Least-Squares Regression Centroid",
    type: "coordinate_graph",
    caption: "Empirical 68-95-99.7 Normal Z-score intervals alongside least-squares regression ŷ = a + bx anchored at centroid (x̄, ȳ).",
    steps: [
      { step: 1, title: "Standardize via Z", description: "Convert raw scores with Z = (x − μ) / σ to compare different scales." },
      { step: 2, title: "Anchor Regression at (x̄, ȳ)", description: "Compute b = S_xy / S_xx and intercept a = ȳ − b x̄." },
      { step: 3, title: "Interpret R² = r²", description: "R² gives fraction of y-variation explained linearly; beware extrapolation." }
    ],
    takeaway: "Shifting by +c leaves SD unchanged, multiplying by a scales SD by |a|, and every regression passes through (x̄, ȳ).",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Normal curve 68-95-99.7 and least squares regression scatter plot">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">STATISTICAL ANALYTICS: Z-SCORES &amp; LEAST-SQUARES REGRESSION</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">NORMAL DISTRIBUTION (68 – 95 – 99.7 RULE)</text>
    <line x1="28" y1="178" x2="308" y2="178" stroke="#94a3b8" stroke-width="1.5" />
    <path d="M 34 176 C 85 174 125 56 168 56 C 211 56 251 174 302 176" fill="#38bdf8" fill-opacity="0.18" stroke="#38bdf8" stroke-width="2.5" />
    <line x1="168" y1="56" x2="168" y2="178" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3" />
    <line x1="126" y1="98" x2="126" y2="178" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3,3" />
    <line x1="210" y1="98" x2="210" y2="178" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3,3" />
    <text x="168" y="195" font-family="monospace" font-size="9.5" font-weight="800" fill="#fbbf24" text-anchor="middle">μ (Z=0)</text>
    <text x="126" y="195" font-family="monospace" font-size="9" fill="#6ee7b7" text-anchor="middle">-1σ</text>
    <text x="210" y="195" font-family="monospace" font-size="9" fill="#6ee7b7" text-anchor="middle">+1σ</text>
    <text x="168" y="142" font-family="monospace" font-size="10.5" font-weight="800" fill="#f8fafc" text-anchor="middle">68%</text>
    <text x="168" y="226" font-family="monospace" font-size="10" fill="#cbd5e1" text-anchor="middle">Z = (x − μ) / σ  |  Var(aX + b) = a² Var(X)</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">OLS REGRESSION: ŷ = a + bx</text>
    <line x1="42" y1="184" x2="292" y2="184" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="42" y1="48" x2="42" y2="184" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="56" y1="168" x2="278" y2="68" stroke="#10b981" stroke-width="2.5" />
    <circle cx="88" cy="144" r="4" fill="#38bdf8" />
    <circle cx="122" cy="148" r="4" fill="#38bdf8" />
    <circle cx="167" cy="118" r="6" fill="#f43f5e" stroke="#ffffff" stroke-width="1.5" />
    <circle cx="212" cy="88" r="4" fill="#38bdf8" />
    <circle cx="250" cy="92" r="4" fill="#38bdf8" />
    <text x="178" y="132" font-family="monospace" font-size="10" font-weight="800" fill="#fda4af">(x̄, ȳ) Centroid</text>
    <text x="160" y="210" font-family="monospace" font-size="9.5" fill="#ecfdf5" text-anchor="middle">b = S_xy / S_xx   |   a = ȳ − b·x̄</text>
    <text x="160" y="228" font-family="monospace" font-size="9.5" fill="#fde68a" text-anchor="middle">Explained Variation: R² = r² × 100%</text>
  </g>
</svg>`
  },
  "vis-sss-engineering-math-mechanics": {
    id: "vis-sss-engineering-math-mechanics",
    skillId: "skill-sss-engineering-math-mechanics",
    unitId: "unit-p1-sss-engineering-math-mechanics",
    title: "Inclined Plane Friction, Force Resolution & Gear Velocity Ratio",
    type: "geometry_diagram",
    caption: "Resolving weight components mg sin θ and mg cos θ on an inclined plane alongside gear train ratios (N₁z₁ = N₂z₂) and machine efficiency η = MA/VR.",
    steps: [
      { step: 1, title: "Resolve Gravity on Slope", description: "Parallel pull = mg sin θ; normal reaction N = mg cos θ." },
      { step: 2, title: "Relate Gear Teeth & RPM", description: "Larger driven gear rotates slower (N₂ = N₁·z₁/z₂) with multiplied torque." },
      { step: 3, title: "Convert RPM to rad/s", description: "Use ω = 2πN/60 before multiplying shaft torque τ in P = τω." }
    ],
    takeaway: "Static friction limit on slope angle θ satisfies μ_s ≥ tan θ; machine efficiency η = (MA / VR) × 100%.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Inclined plane force resolution and gear efficiency diagram">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">APPLIED MECHANICS: INCLINED PLANE, GEARS &amp; TORQUE POWER</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">ROUGH INCLINED PLANE (μ_s ≥ tan θ)</text>
    <polygon points="44,194 288,194 288,78" fill="#334155" stroke="#94a3b8" stroke-width="2" />
    <text x="86" y="186" font-family="monospace" font-size="10.5" font-weight="800" fill="#fbbf24">θ = 30°</text>
    <!-- Block on slope -->
    <g transform="translate(178, 128) rotate(-25.4)">
      <rect x="-24" y="-26" width="48" height="26" rx="3" fill="#38bdf8" stroke="#f8fafc" stroke-width="1.5" />
      <!-- Normal N up -->
      <line x1="0" y1="-13" x2="0" y2="-62" stroke="#10b981" stroke-width="2.5" />
      <text x="8" y="-54" font-family="monospace" font-size="9.5" font-weight="800" fill="#6ee7b7">N=mg cosθ</text>
      <!-- Friction up slope -->
      <line x1="24" y1="-13" x2="72" y2="-13" stroke="#fbbf24" stroke-width="2.5" />
      <text x="36" y="-20" font-family="monospace" font-size="9.5" font-weight="800" fill="#fde68a">f=μN</text>
      <!-- Downslope gravity component -->
      <line x1="-24" y1="-13" x2="-74" y2="-13" stroke="#f43f5e" stroke-width="2.5" />
      <text x="-78" y="-20" font-family="monospace" font-size="9.5" font-weight="800" fill="#fda4af">mg sinθ</text>
    </g>
    <text x="168" y="226" font-family="monospace" font-size="10" fill="#cbd5e1" text-anchor="middle">Equilibrium Slip Limit: μ_s = tan 30° = 1/√3</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">GEAR TRAINS, EFFICIENCY &amp; SHAFT POWER</text>
    <rect x="16" y="42" width="288" height="58" rx="8" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8">MESHING GEAR SPEED &amp; TORQUE</text>
    <text x="26" y="84" font-family="monospace" font-size="10" fill="#e0f2fe">N₁ z₁ = N₂ z₂  |  VR = z_driven / z_driver</text>
    <rect x="16" y="110" width="288" height="58" rx="8" fill="#0f172a" stroke="#10b981" />
    <text x="26" y="132" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">MACHINE EFFICIENCY</text>
    <text x="26" y="152" font-family="monospace" font-size="10" fill="#ecfdf5">MA = Load / Effort  |  η = (MA / VR) × 100%</text>
    <rect x="16" y="178" width="288" height="52" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="160" y="199" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">ROTATIONAL SHAFT POWER</text>
    <text x="160" y="218" font-family="monospace" font-size="10" fill="#ecfdf5" text-anchor="middle">ω = 2πN / 60 rad/s   ⇒   P = τ · ω (Watts)</text>
  </g>
</svg>`
  },
  "vis-hall-actuarial-math-finance": {
    id: "vis-hall-actuarial-math-finance",
    skillId: "skill-hall-actuarial-math-finance",
    unitId: "unit-p1-hall-actuarial-math-finance",
    title: "Time-Value Cashflow Timeline: Annuities, Deferred Perpetuities & Force δ",
    type: "process_diagram",
    caption: "Actuarial cashflow timeline showing deferred perpetuity discounting (t=3 first payout lands at t=2 before discounting v²) and continuous force e^δ = 1+i.",
    steps: [
      { step: 1, title: "Map Cashflow Dates", description: "Mark exact payment times t = 1, 2, 3... on a horizontal timeline." },
      { step: 2, title: "Anchor PMT/i at t_first − 1", description: "Immediate annuity/perpetuity formulas value cashflows 1 period before the first payout." },
      { step: 3, title: "Discount to t = 0", description: "Multiply lump value by v^(t_first − 1) to bring it cleanly to present day." }
    ],
    takeaway: "Always draw a cashflow timeline so you discount deferred annuities by (t_first − 1), never t_first.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Actuarial deferred perpetuity cashflow timeline and discounting formulas">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">ACTUARIAL FINANCE: CASHFLOW TIMELINE &amp; FORCE OF INTEREST</text>
  <g transform="translate(24, 52)">
    <rect width="346" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">DEFERRED PERPETUITY TIMELINE (1st AT t=3)</text>
    <line x1="36" y1="120" x2="318" y2="120" stroke="#94a3b8" stroke-width="2" />
    <!-- Ticks -->
    <circle cx="56" cy="120" r="5" fill="#f43f5e" />
    <circle cx="112" cy="120" r="4" fill="#64748b" />
    <circle cx="168" cy="120" r="5" fill="#fbbf24" />
    <circle cx="224" cy="120" r="5" fill="#38bdf8" />
    <circle cx="280" cy="120" r="5" fill="#38bdf8" />
    <text x="56" y="142" font-family="monospace" font-size="10" font-weight="800" fill="#fda4af" text-anchor="middle">t=0</text>
    <text x="112" y="142" font-family="monospace" font-size="10" fill="#94a3b8" text-anchor="middle">t=1</text>
    <text x="168" y="142" font-family="monospace" font-size="10" font-weight="800" fill="#fbbf24" text-anchor="middle">t=2</text>
    <text x="224" y="142" font-family="monospace" font-size="10" font-weight="800" fill="#38bdf8" text-anchor="middle">t=3</text>
    <text x="280" y="142" font-family="monospace" font-size="10" font-weight="800" fill="#38bdf8" text-anchor="middle">t=4...</text>
    <text x="224" y="96" font-family="monospace" font-size="9.5" font-weight="800" fill="#e0f2fe" text-anchor="middle">PMT</text>
    <text x="280" y="96" font-family="monospace" font-size="9.5" font-weight="800" fill="#e0f2fe" text-anchor="middle">PMT</text>
    <!-- Arc t=2 back to t=0 -->
    <path d="M 168 156 Q 112 192 56 156" fill="none" stroke="#10b981" stroke-width="2" />
    <text x="112" y="194" font-family="monospace" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">× (1+i)⁻²</text>
    <text x="168" y="66" font-family="monospace" font-size="9.5" font-weight="800" fill="#fbbf24" text-anchor="middle">PV₂ = PMT / i</text>
    <text x="173" y="226" font-family="monospace" font-size="9.5" fill="#cbd5e1" text-anchor="middle">PMT/i always lands 1 period BEFORE first PMT</text>
  </g>
  <g transform="translate(386, 52)">
    <rect width="310" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">INTEREST &amp; ANNUITY IDENTITIES</text>
    <rect x="16" y="42" width="278" height="58" rx="8" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8">NOMINAL vs FORCE OF INTEREST</text>
    <text x="26" y="84" font-family="monospace" font-size="9.5" fill="#e0f2fe">1 + i = (1 + i^(m)/m)^m = e^δ</text>
    <rect x="16" y="110" width="278" height="58" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="132" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">LEVEL ANNUITY IMMEDIATE &amp; DUE</text>
    <text x="26" y="152" font-family="monospace" font-size="9.5" fill="#fde68a">a_{n|i} = (1−vⁿ)/i | ä_{n|i} = (1+i)a_{n|i}</text>
    <rect x="16" y="178" width="278" height="52" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="155" y="199" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">CLAIM VARIANCE</text>
    <text x="155" y="218" font-family="monospace" font-size="9.5" fill="#ecfdf5" text-anchor="middle">Var(X) = E[X²] − (E[X])²</text>
  </g>
</svg>`
  },
  "vis-sss-insurance-actuarial-risk": {
    id: "vis-sss-insurance-actuarial-risk",
    skillId: "skill-sss-insurance-actuarial-risk",
    unitId: "unit-p1-sss-insurance-actuarial-risk",
    title: "Claim Waterfall (Deductible → Coinsurance → Limit) & √n Risk Pooling",
    type: "bar_comparison",
    caption: "Visualizing policyholder vs insurer claim sharing across deductible d and coinsurance c, gross premium loading, and 1/√n risk pooling.",
    steps: [
      { step: 1, title: "Subtract Deductible d", description: "Policyholder covers the first d before insurer coinsurance applies." },
      { step: 2, title: "Apply Coinsurance & Cap", description: "Multiply excess (Loss − d) by c%, then cap at policy limit L." },
      { step: 3, title: "Divide Loading Share", description: "Gross Premium G = Pure Premium / (1 − Expense% − Margin%)." }
    ],
    takeaway: "Risk pooling shrinks per-policy volatility by 1/√n, while deductibles + expense loading protect solvency.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Insurance deductible coinsurance waterfall and risk pooling curve">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">INSURANCE ANALYTICS: DEDUCTIBLE SHARING &amp; POOLING (σ/√n)</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">CLAIM SPLIT ON ₦600k LOSS (d=₦100k, c=80%)</text>
    <!-- Stacked horizontal bar -->
    <rect x="24" y="64" width="48" height="44" fill="#f43f5e" />
    <rect x="72" y="64" width="48" height="44" fill="#f59e0b" />
    <rect x="120" y="64" width="192" height="44" fill="#10b981" />
    <text x="48" y="90" font-family="monospace" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">100k</text>
    <text x="96" y="90" font-family="monospace" font-size="9" font-weight="800" fill="#0f172a" text-anchor="middle">100k</text>
    <text x="216" y="90" font-family="monospace" font-size="10.5" font-weight="800" fill="#0f172a" text-anchor="middle">Insurer Pays: ₦400k (80%)</text>
    <text x="48" y="126" font-family="system-ui, sans-serif" font-size="8.5" fill="#fda4af" text-anchor="middle">Deduct.</text>
    <text x="96" y="126" font-family="system-ui, sans-serif" font-size="8.5" fill="#fde68a" text-anchor="middle">20% Coin</text>
    <text x="216" y="126" font-family="system-ui, sans-serif" font-size="8.5" fill="#6ee7b7" text-anchor="middle">Capped at Policy Limit</text>
    <rect x="16" y="150" width="304" height="78" rx="8" fill="#0f172a" stroke="#475569" />
    <text x="168" y="174" font-family="monospace" font-size="10" font-weight="800" fill="#fde68a" text-anchor="middle">1. Subtract Deductible: 600k − 100k = 500k</text>
    <text x="168" y="196" font-family="monospace" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">2. Apply 80% Share: 0.80 × 500k = ₦400k</text>
    <text x="168" y="216" font-family="monospace" font-size="9.5" fill="#cbd5e1" text-anchor="middle">3. Apply Limit: min(Limit, Payout)</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">ACTUARIAL PRICING &amp; SOLVENCY RATIOS</text>
    <rect x="16" y="42" width="288" height="58" rx="8" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8">PURE &amp; GROSS PREMIUM</text>
    <text x="26" y="84" font-family="monospace" font-size="9.5" fill="#e0f2fe">Pure = Freq×Sev | G = Pure / (1 − Exp% − Prof%)</text>
    <rect x="16" y="110" width="288" height="58" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="132" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">UNDERWRITING COMBINED RATIO</text>
    <text x="26" y="152" font-family="monospace" font-size="9.5" fill="#fde68a">Combined = Loss% + Expense% (&lt;100% Profit)</text>
    <rect x="16" y="178" width="288" height="52" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="160" y="199" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">LAW OF LARGE NUMBERS RISK POOLING</text>
    <text x="160" y="218" font-family="monospace" font-size="9.5" fill="#ecfdf5" text-anchor="middle">16× More Policies ⇒ SD/Policy Falls by √16 = 4×</text>
  </g>
</svg>`
  }
};
