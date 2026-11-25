import { EducationalVisualization } from "../types/contentSaturation";

export const P1_MATH_BATCH2_JSS_VISUALIZATIONS: Record<string, EducationalVisualization> = {
  "vis-jss-ratio-rates-variation": {
    id: "vis-jss-ratio-rates-variation",
    skillId: "skill-jss-ratio-rates-variation",
    unitId: "unit-p1-jss-ratio-rates-variation",
    title: "Direct, Inverse-Square & Partial Variation Curves",
    type: "coordinate_graph",
    caption: "Comparing direct linear scaling (y = kx), inverse-square decay (y = k/x²), and partial variation with fixed baseline (C = a + bn).",
    steps: [
      { step: 1, title: "Write Symbolic Law", description: "Convert 'varies as' into an explicit equation with constant k." },
      { step: 2, title: "Solve Constant k", description: "Substitute known pair to lock k (or eliminate fixed a in partial variation)." },
      { step: 3, title: "Predict New State", description: "Evaluate target variables cleanly without guessing." }
    ],
    takeaway: "Always compute k (and fixed intercept a if partial) before evaluating the new output.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Direct, inverse-square, and partial variation comparison">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">ALGEBRAIC VARIATION LAWS &amp; COMBINED WORK RATES</text>
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">DIRECT vs PARTIAL vs INVERSE GRAPH</text>
    <line x1="42" y1="205" x2="305" y2="205" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="42" y1="45" x2="42" y2="205" stroke="#94a3b8" stroke-width="1.5" />
    <!-- Direct y = kx -->
    <line x1="42" y1="205" x2="290" y2="65" stroke="#10b981" stroke-width="2.5" />
    <text x="225" y="75" font-family="monospace" font-size="9.5" font-weight="800" fill="#6ee7b7">y = kx (Origin)</text>
    <!-- Partial C = a + bx -->
    <line x1="42" y1="158" x2="290" y2="95" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="6,3" />
    <circle cx="42" cy="158" r="4" fill="#f59e0b" />
    <text x="48" y="150" font-family="monospace" font-size="9.5" font-weight="800" fill="#fbbf24">a (Fixed)</text>
    <text x="180" y="138" font-family="monospace" font-size="9.5" font-weight="800" fill="#fde68a">C = a + bx</text>
    <!-- Inverse hyperbola -->
    <path d="M 65 55 Q 110 155 295 194" fill="none" stroke="#38bdf8" stroke-width="2.5" />
    <text x="185" y="182" font-family="monospace" font-size="9.5" font-weight="800" fill="#38bdf8">y = k/x² (Decays)</text>
    <text x="172" y="228" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1" text-anchor="middle">Notice partial variation begins at y = a, never 0</text>
  </g>
  <g transform="translate(370, 52)">
    <rect width="326" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">WORK &amp; JOINT VARIATION TOOLKIT</text>
    <rect x="16" y="42" width="294" height="58" rx="8" fill="#0f172a" stroke="#10b981" />
    <text x="28" y="64" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#6ee7b7">ADDITIVE WORK RATES</text>
    <text x="28" y="84" font-family="monospace" font-size="10.5" fill="#ecfdf5">1/T_total = 1/10 + 1/15 = 5/30 ⇒ T = 6 h</text>
    <rect x="16" y="110" width="294" height="58" rx="8" fill="#0f172a" stroke="#38bdf8" />
    <text x="28" y="132" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#38bdf8">JOINT VARIATION: y ∝ x / √z</text>
    <text x="28" y="152" font-family="monospace" font-size="10.5" fill="#e0f2fe">y = kx / √z ⇒ Solve k first, then plug target</text>
    <rect x="16" y="178" width="294" height="52" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="163" y="200" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">PARTIAL VARIATION SOLVER</text>
    <text x="163" y="218" font-family="monospace" font-size="10" fill="#ecfdf5" text-anchor="middle">b = ΔC / Δn, then a = C₁ − b·n₁</text>
  </g>
</svg>`
  },
  "vis-jss-sets-venn-logic": {
    id: "vis-jss-sets-venn-logic",
    skillId: "skill-jss-sets-venn-logic",
    unitId: "unit-p1-jss-sets-venn-logic",
    title: "Venn Inclusion-Exclusion Regions & De Morgan Equivalence",
    type: "conceptual_diagram",
    caption: "Partitioning universal set U = 50 into four disjoint Venn regions (Biology only, Both, Chemistry only, Neither) plus contrapositive logic.",
    steps: [
      { step: 1, title: "Exclude Neither First", description: "Compute n(B ∪ C) = n(U) − n((B ∪ C)')." },
      { step: 2, title: "Extract Intersection x", description: "Apply x = n(B) + n(C) − n(B ∪ C) to lock center." },
      { step: 3, title: "Subtract Inside-Out", description: "Find strict crescents: B only = n(B) − x, C only = n(C) − x." }
    ],
    takeaway: "Fill Venn diagrams from the center overlap outward and verify all four disjoint parts sum to n(U).",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram of 50 students and De Morgan logic card">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">VENN INCLUSION-EXCLUSION &amp; LOGICAL CONTRAPOSITIVE</text>
  <g transform="translate(24, 52)">
    <rect width="340" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="14" y="22" font-family="monospace" font-size="11" font-weight="800" fill="#e2e8f0">U (n = 50)</text>
    <circle cx="132" cy="128" r="72" fill="#38bdf8" fill-opacity="0.22" stroke="#38bdf8" stroke-width="2.5" />
    <circle cx="208" cy="128" r="72" fill="#10b981" fill-opacity="0.22" stroke="#10b981" stroke-width="2.5" />
    <text x="92" y="84" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8" text-anchor="middle">Bio (32)</text>
    <text x="248" y="84" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7" text-anchor="middle">Chem (27)</text>
    <text x="96" y="134" font-family="monospace" font-size="15" font-weight="800" fill="#f8fafc" text-anchor="middle">18</text>
    <text x="96" y="150" font-family="system-ui, sans-serif" font-size="8.5" fill="#94a3b8" text-anchor="middle">B ∩ C'</text>
    <text x="170" y="134" font-family="monospace" font-size="16" font-weight="800" fill="#fbbf24" text-anchor="middle">14</text>
    <text x="170" y="150" font-family="system-ui, sans-serif" font-size="8.5" fill="#fde68a" text-anchor="middle">B ∩ C</text>
    <text x="244" y="134" font-family="monospace" font-size="15" font-weight="800" fill="#f8fafc" text-anchor="middle">13</text>
    <text x="244" y="150" font-family="system-ui, sans-serif" font-size="8.5" fill="#94a3b8" text-anchor="middle">B' ∩ C</text>
    <text x="292" y="220" font-family="monospace" font-size="11" font-weight="800" fill="#f43f5e" text-anchor="end">(B∪C)' = 5</text>
    <text x="16" y="220" font-family="monospace" font-size="10" fill="#cbd5e1">18 + 14 + 13 + 5 = 50</text>
  </g>
  <g transform="translate(380, 52)">
    <rect width="316" height="244" rx="10" fill="#1e293b" stroke="#a855f7" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#d8b4fe">SET LAWS &amp; PROPOSITIONAL LOGIC</text>
    <rect x="16" y="42" width="284" height="58" rx="8" fill="#0f172a" stroke="#a855f7" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#d8b4fe">DE MORGAN'S LAWS</text>
    <text x="26" y="84" font-family="monospace" font-size="10.5" fill="#f3e8ff">(A ∪ B)' = A' ∩ B'   |   (A ∩ B)' = A' ∪ B'</text>
    <rect x="16" y="110" width="284" height="56" rx="8" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="132" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#38bdf8">POWER SET SUBSETS</text>
    <text x="26" y="152" font-family="monospace" font-size="10.5" fill="#e0f2fe">Total Subsets = 2ⁿ  |  Proper = 2ⁿ − 1</text>
    <rect x="16" y="176" width="284" height="54" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="158" y="198" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">CONTRAPOSITIVE EQUIVALENCE</text>
    <text x="158" y="216" font-family="monospace" font-size="10" fill="#ecfdf5" text-anchor="middle">(p → q) ≡ (¬q → ¬p) ALWAYS TRUE</text>
  </g>
</svg>`
  },
  "vis-jss-transformations-loci": {
    id: "vis-jss-transformations-loci",
    skillId: "skill-jss-transformations-loci",
    unitId: "unit-p1-jss-transformations-loci",
    title: "Coordinate Transformations & Intersecting Geometric Loci",
    type: "geometry_diagram",
    caption: "Visualizing 90° CCW rotation (x, y) → (−y, x), reflection across y = x, enlargement scaling k², and intersecting perpendicular bisector + circle loci.",
    steps: [
      { step: 1, title: "Map Coordinates", description: "Rotate 90° CCW → (−y, x); reflect y = x → (y, x); enlarge P' = C + k(P − C)." },
      { step: 2, title: "Construct Locus 1", description: "Draw perpendicular bisector of AB for equidistant points." },
      { step: 3, title: "Intersect Locus 2", description: "Draw circle of radius r around W to locate exact valid intersections." }
    ],
    takeaway: "Linear lengths scale by |k|, areas by k², and intersecting loci isolate exact geometric coordinates.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate transformations and intersecting geometric loci diagram">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">COORDINATE TRANSFORMATIONS &amp; INTERSECTING LOCI</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">LOCUS INTERSECTION: BISECTOR ∩ CIRCLE</text>
    <!-- Points X and Y + Perp Bisector -->
    <line x1="65" y1="165" x2="270" y2="165" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5,4" />
    <circle cx="65" cy="165" r="5" fill="#f59e0b" />
    <circle cx="270" cy="165" r="5" fill="#f59e0b" />
    <text x="56" y="185" font-family="monospace" font-size="11" font-weight="800" fill="#fbbf24">X</text>
    <text x="266" y="185" font-family="monospace" font-size="11" font-weight="800" fill="#fbbf24">Y</text>
    <line x1="168" y1="45" x2="168" y2="215" stroke="#10b981" stroke-width="2.5" />
    <text x="176" y="60" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7">Perp. Bisector (PX = PY)</text>
    <!-- Circle centered at W(138, 125) r = 56 -->
    <circle cx="138" cy="125" r="56" fill="#38bdf8" fill-opacity="0.14" stroke="#38bdf8" stroke-width="2" />
    <circle cx="138" cy="125" r="4" fill="#38bdf8" />
    <text x="122" y="128" font-family="monospace" font-size="11" font-weight="800" fill="#38bdf8">W</text>
    <!-- Two intersections -->
    <circle cx="168" cy="78" r="5" fill="#f43f5e" />
    <circle cx="168" cy="172" r="5" fill="#f43f5e" />
    <text x="178" y="83" font-family="monospace" font-size="9.5" font-weight="800" fill="#fda4af">Site 1</text>
    <text x="178" y="177" font-family="monospace" font-size="9.5" font-weight="800" fill="#fda4af">Site 2</text>
    <text x="168" y="232" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1" text-anchor="middle">d(W, L) &lt; r ⇒ 2 valid borehole solutions</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">COORDINATE MAPPING RULES</text>
    <rect x="16" y="40" width="288" height="44" rx="6" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="58" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#38bdf8">REFLECTIONS</text>
    <text x="26" y="74" font-family="monospace" font-size="9.5" fill="#e0f2fe">x-axis: (x,−y) | y-axis: (−x,y) | y=x: (y,x)</text>
    <rect x="16" y="92" width="288" height="44" rx="6" fill="#0f172a" stroke="#a855f7" />
    <text x="26" y="110" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#d8b4fe">ROTATIONS ABOUT ORIGIN (0,0)</text>
    <text x="26" y="126" font-family="monospace" font-size="9.5" fill="#f3e8ff">90° CCW: (−y,x) | 90° CW: (y,−x) | 180°: (−x,−y)</text>
    <rect x="16" y="144" width="288" height="86" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="26" y="164" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">ENLARGEMENT FROM CENTER C(c₁, c₂)</text>
    <text x="26" y="186" font-family="monospace" font-size="10.5" fill="#ecfdf5">P' = C + k(P − C)</text>
    <text x="26" y="208" font-family="monospace" font-size="10" fill="#a7f3d0">Length × |k|  |  Area × k²  |  Vol × |k|³</text>
  </g>
</svg>`
  },
  "vis-jss-pythagoras-similarity": {
    id: "vis-jss-pythagoras-similarity",
    skillId: "skill-jss-pythagoras-similarity",
    unitId: "unit-p1-jss-pythagoras-similarity",
    title: "Pythagoras 3D Diagonal, Congruence & k / k² / k³ Scaling",
    type: "geometry_diagram",
    caption: "Nested AA-similar triangles (full AB = AD + DB), 3D cuboid space diagonal √(l²+w²+h²), and volume/area scaling cube.",
    steps: [
      { step: 1, title: "Right-Triangle Proof", description: "Add squares for hypotenuse; subtract c² − b² for a leg." },
      { step: 2, title: "Similarity Full Side", description: "Sum AD + DB to form full side AB before taking ratio AB/AD." },
      { step: 3, title: "Bridge k ↔ k² ↔ k³", description: "Extract linear k = ∛(V₂/V₁), then square to find area ratio." }
    ],
    takeaway: "Use full triangle sides in nested similarity and step through k whenever converting between volume and area.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nested similar triangles and k k-squared k-cubed scaling">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">PYTHAGORAS, NESTED SIMILARITY &amp; k / k² / k³ SCALING</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">NESTED SIMILAR TRIANGLES (ΔADE ~ ΔABC)</text>
    <polygon points="168,46 66,204 270,204" fill="#10b981" fill-opacity="0.14" stroke="#10b981" stroke-width="2.5" />
    <line x1="107" y1="141" x2="229" y2="141" stroke="#38bdf8" stroke-width="2.5" />
    <text x="168" y="40" font-family="monospace" font-size="11" font-weight="800" fill="#f8fafc" text-anchor="middle">A</text>
    <text x="95" y="142" font-family="monospace" font-size="11" font-weight="800" fill="#38bdf8" text-anchor="end">D</text>
    <text x="241" y="142" font-family="monospace" font-size="11" font-weight="800" fill="#38bdf8">E</text>
    <text x="56" y="208" font-family="monospace" font-size="11" font-weight="800" fill="#6ee7b7" text-anchor="end">B</text>
    <text x="280" y="208" font-family="monospace" font-size="11" font-weight="800" fill="#6ee7b7">C</text>
    <text x="122" y="102" font-family="monospace" font-size="10" font-weight="800" fill="#fbbf24" text-anchor="end">6</text>
    <text x="74" y="176" font-family="monospace" font-size="10" font-weight="800" fill="#f43f5e" text-anchor="end">3</text>
    <text x="168" y="135" font-family="monospace" font-size="10" font-weight="800" fill="#38bdf8" text-anchor="middle">ST = 8 cm</text>
    <text x="168" y="198" font-family="monospace" font-size="10.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">QR = 12 cm</text>
    <text x="168" y="230" font-family="monospace" font-size="9.5" fill="#cbd5e1" text-anchor="middle">Full side AB = 6 + 3 = 9 ⇒ k = 9/6 = 1.5</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">3D PYTHAGORAS &amp; SIMILARITY CHAIN</text>
    <rect x="16" y="42" width="288" height="58" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">3D CUBOID SPACE DIAGONAL</text>
    <text x="26" y="84" font-family="monospace" font-size="10.5" fill="#fde68a">D = √(3² + 4² + 12²) = √(25 + 144) = 13</text>
    <rect x="16" y="110" width="288" height="58" rx="8" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="132" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8">SIMILARITY RATIO CONVERTER</text>
    <text x="26" y="152" font-family="monospace" font-size="10" fill="#e0f2fe">A₂/A₁ = 4 ⇒ k = √4 = 2 ⇒ V₂/V₁ = 2³ = 8</text>
    <rect x="16" y="178" width="288" height="52" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="160" y="199" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">VALID CONGRUENCE TESTS ONLY</text>
    <text x="160" y="218" font-family="monospace" font-size="9.5" fill="#ecfdf5" text-anchor="middle">SSS | SAS | ASA | RHS (AAA = Similar only!)</text>
  </g>
</svg>`
  },
  "vis-jss-trig-bearings": {
    id: "vis-jss-trig-bearings",
    skillId: "skill-jss-trig-bearings",
    unitId: "unit-p1-jss-trig-bearings",
    title: "SOH-CAH-TOA Right Triangle & 3-Figure North Bearings",
    type: "geometry_diagram",
    caption: "Relating Opposite/Adjacent/Hypotenuse via sin/cos/tan alongside clockwise 3-figure forward (068°) and back (248°) bearings.",
    steps: [
      { step: 1, title: "Label O, A, H", description: "Opposite sits across from θ; Adjacent sits beside θ; Hypotenuse faces 90°." },
      { step: 2, title: "Select SOH-CAH-TOA", description: "Pick the ratio linking the known side and unknown side." },
      { step: 3, title: "Anchor North at 'From'", description: "Turn clockwise from 000°; add/subtract 180° for back-bearing." }
    ],
    takeaway: "Elevation equals depression from horizontal sightlines, and back-bearing differs from forward bearing by 180°.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SOH-CAH-TOA triangle and 3-figure forward/back bearings">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">TRIGONOMETRY (SOH-CAH-TOA) &amp; 3-FIGURE BEARINGS</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">SOH-CAH-TOA &amp; SPECIAL ANGLES</text>
    <polygon points="48,176 238,176 238,66" fill="#38bdf8" fill-opacity="0.14" stroke="#38bdf8" stroke-width="2.5" />
    <rect x="224" y="162" width="14" height="14" fill="none" stroke="#94a3b8" stroke-width="1.5" />
    <text x="88" y="168" font-family="monospace" font-size="12" font-weight="800" fill="#fbbf24">θ</text>
    <text x="143" y="194" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#10b981" text-anchor="middle">Adjacent (A)</text>
    <text x="246" y="126" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#f43f5e">Opposite (O)</text>
    <text x="128" y="110" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#38bdf8" text-anchor="end">Hyp (H)</text>
    <rect x="16" y="202" width="304" height="32" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="168" y="222" font-family="monospace" font-size="9.5" font-weight="700" fill="#fde68a" text-anchor="middle">sin30°=½ | tan45°=1 | cos30°=sin60°=√3/2</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">FORWARD (068°) &amp; BACK BEARING (248°)</text>
    <!-- Station A -->
    <line x1="88" y1="168" x2="88" y2="95" stroke="#94a3b8" stroke-width="2" />
    <text x="88" y="88" font-family="monospace" font-size="10" font-weight="800" fill="#cbd5e1" text-anchor="middle">N</text>
    <circle cx="88" cy="168" r="4" fill="#fbbf24" />
    <text x="74" y="182" font-family="monospace" font-size="11" font-weight="800" fill="#fbbf24">A</text>
    <!-- Station B -->
    <line x1="230" y1="110" x2="230" y2="42" stroke="#94a3b8" stroke-width="2" />
    <text x="230" y="36" font-family="monospace" font-size="10" font-weight="800" fill="#cbd5e1" text-anchor="middle">N</text>
    <circle cx="230" cy="110" r="4" fill="#10b981" />
    <text x="242" y="114" font-family="monospace" font-size="11" font-weight="800" fill="#6ee7b7">B</text>
    <!-- Vector A to B -->
    <line x1="88" y1="168" x2="230" y2="110" stroke="#38bdf8" stroke-width="2.5" />
    <text x="116" y="138" font-family="monospace" font-size="10" font-weight="800" fill="#fbbf24">068°</text>
    <path d="M 230 78 A 32 32 0 1 1 200 122" fill="none" stroke="#f43f5e" stroke-width="2" />
    <text x="255" y="148" font-family="monospace" font-size="10" font-weight="800" fill="#fda4af">248°</text>
    <rect x="16" y="196" width="288" height="38" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="160" y="219" font-family="monospace" font-size="9.5" font-weight="800" fill="#ecfdf5" text-anchor="middle">Back Bearing = 068° + 180° = 248°</text>
  </g>
</svg>`
  },
  "vis-jss-surface-area-volume-3d": {
    id: "vis-jss-surface-area-volume-3d",
    skillId: "skill-jss-surface-area-volume-3d",
    unitId: "unit-p1-jss-surface-area-volume-3d",
    title: "3D Solids Reference: Cylinder, Cone (h vs l) & Solid Hemisphere",
    type: "geometry_diagram",
    caption: "Comparing uniform prism/cylinder extrusions (V = Ah) against tapered cones (V = ⅓πr²h, l² = r² + h²) and solid hemisphere TSA = 3πr².",
    steps: [
      { step: 1, title: "Extract Vertical Height h", description: "For cones and pyramids, solve h = √(l² − r²) before computing volume." },
      { step: 2, title: "Count Exposed Faces", description: "Open cylinder omits one circle; solid hemisphere adds flat circle πr² to 2πr²." },
      { step: 3, title: "Cancel π Symbolically", description: "Keep π exact in melting/recasting equations until division." }
    ],
    takeaway: "Cone volume requires perpendicular height h, while cone curved surface area πrl uses slant height l.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cone h vs l triangle and 3D solid volume/surface area formulas">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">3D MENSURATION: CONE (h vs l), CYLINDER &amp; HEMISPHERE</text>
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">RIGHT CONE INTERNAL TRIANGLE (l² = r² + h²)</text>
    <ellipse cx="165" cy="176" rx="88" ry="20" fill="#f59e0b" fill-opacity="0.16" stroke="#f59e0b" stroke-width="2" />
    <line x1="77" y1="176" x2="165" y2="54" stroke="#f59e0b" stroke-width="2.5" />
    <line x1="253" y1="176" x2="165" y2="54" stroke="#f59e0b" stroke-width="2.5" />
    <line x1="165" y1="54" x2="165" y2="176" stroke="#38bdf8" stroke-width="2" stroke-dasharray="5,3" />
    <line x1="165" y1="176" x2="253" y2="176" stroke="#10b981" stroke-width="2" />
    <text x="155" y="122" font-family="monospace" font-size="11" font-weight="800" fill="#38bdf8" text-anchor="end">h = 8</text>
    <text x="209" y="194" font-family="monospace" font-size="11" font-weight="800" fill="#6ee7b7" text-anchor="middle">r = 6</text>
    <text x="220" y="110" font-family="monospace" font-size="11" font-weight="800" fill="#fbbf24">l = 10</text>
    <text x="165" y="226" font-family="monospace" font-size="9.5" fill="#fde68a" text-anchor="middle">V = ⅓πr²h = 96π  |  CSA = πrl = 60π</text>
  </g>
  <g transform="translate(370, 52)">
    <rect width="326" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">UNIFIED 3D SURFACE AREA &amp; VOLUME FORMULAS</text>
    <rect x="16" y="42" width="294" height="54" rx="8" fill="#0f172a" stroke="#10b981" />
    <text x="26" y="62" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">UNIFORM PRISMS &amp; CYLINDERS</text>
    <text x="26" y="82" font-family="monospace" font-size="10" fill="#ecfdf5">V = A_base · h   |   TSA_cyl = 2πrh + 2πr²</text>
    <rect x="16" y="106" width="294" height="54" rx="8" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="126" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8">SPHERE &amp; SOLID HEMISPHERE</text>
    <text x="26" y="146" font-family="monospace" font-size="10" fill="#e0f2fe">V_sph = ⁴⁄₃πr³ | A_sph = 4πr² | TSA_hemi = 3πr²</text>
    <rect x="16" y="170" width="294" height="60" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="163" y="194" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">MELT &amp; RECAST CONSERVATION</text>
    <text x="163" y="214" font-family="monospace" font-size="10" fill="#ecfdf5" text-anchor="middle">V_sphere = V_cylinder ⇒ π cancels cleanly</text>
  </g>
</svg>`
  },
  "vis-jss-probability-trees": {
    id: "vis-jss-probability-trees",
    skillId: "skill-jss-probability-trees",
    unitId: "unit-p1-jss-probability-trees",
    title: "Weighted Probability Tree Diagram Without Replacement",
    type: "process_diagram",
    caption: "Two-stage tree for 5 Green and 3 Yellow marbles without replacement, showing denominator shift (8 → 7) and path multiplication.",
    steps: [
      { step: 1, title: "Assign Stage 1 Weights", description: "Start from total 8: P(G₁) = 5/8 and P(Y₁) = 3/8 (sum = 1)." },
      { step: 2, title: "Shift Denominator to 7", description: "Without replacement leaves 7 marbles on Stage 2 branches." },
      { step: 3, title: "Multiply & Add Paths", description: "P(different) = P(G₁,Y₂) + P(Y₁,G₂) = 15/56 + 15/56 = 15/28." }
    ],
    takeaway: "Multiply along branches for AND events, add valid end-nodes for OR events, and decrement denominators when drawing without replacement.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Probability tree diagram without replacement for 5 green and 3 yellow marbles">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">PROBABILITY TREE DIAGRAM (5 GREEN, 3 YELLOW — NO REPLACEMENT)</text>
  <g transform="translate(24, 52)">
    <rect width="672" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <!-- Root node -->
    <circle cx="44" cy="122" r="7" fill="#f8fafc" />
    <!-- Stage 1 lines -->
    <line x1="51" y1="120" x2="188" y2="70" stroke="#10b981" stroke-width="2.5" />
    <line x1="51" y1="124" x2="188" y2="174" stroke="#f59e0b" stroke-width="2.5" />
    <text x="108" y="84" font-family="monospace" font-size="11" font-weight="800" fill="#6ee7b7">5/8</text>
    <text x="108" y="168" font-family="monospace" font-size="11" font-weight="800" fill="#fbbf24">3/8</text>
    <circle cx="195" cy="70" r="14" fill="#064e3b" stroke="#10b981" stroke-width="2" />
    <text x="195" y="74" font-family="monospace" font-size="11" font-weight="800" fill="#ecfdf5" text-anchor="middle">G₁</text>
    <circle cx="195" cy="174" r="14" fill="#451a03" stroke="#f59e0b" stroke-width="2" />
    <text x="195" y="178" font-family="monospace" font-size="11" font-weight="800" fill="#fde68a" text-anchor="middle">Y₁</text>
    <!-- Stage 2 from G1 -->
    <line x1="209" y1="68" x2="368" y2="42" stroke="#10b981" stroke-width="2" />
    <line x1="209" y1="72" x2="368" y2="98" stroke="#f59e0b" stroke-width="2" />
    <text x="288" y="48" font-family="monospace" font-size="10.5" font-weight="800" fill="#6ee7b7">4/7</text>
    <text x="288" y="96" font-family="monospace" font-size="10.5" font-weight="800" fill="#fbbf24">3/7</text>
    <!-- Stage 2 from Y1 -->
    <line x1="209" y1="172" x2="368" y2="146" stroke="#10b981" stroke-width="2" />
    <line x1="209" y1="176" x2="368" y2="202" stroke="#f59e0b" stroke-width="2" />
    <text x="288" y="152" font-family="monospace" font-size="10.5" font-weight="800" fill="#6ee7b7">5/7</text>
    <text x="288" y="200" font-family="monospace" font-size="10.5" font-weight="800" fill="#fbbf24">2/7</text>
    <!-- Outcomes -->
    <text x="380" y="46" font-family="monospace" font-size="11" font-weight="800" fill="#cbd5e1">G₁G₂ = (5/8)(4/7) = 20/56</text>
    <text x="380" y="102" font-family="monospace" font-size="11" font-weight="800" fill="#38bdf8">G₁Y₂ = (5/8)(3/7) = 15/56 ★</text>
    <text x="380" y="150" font-family="monospace" font-size="11" font-weight="800" fill="#38bdf8">Y₁G₂ = (3/8)(5/7) = 15/56 ★</text>
    <text x="380" y="206" font-family="monospace" font-size="11" font-weight="800" fill="#cbd5e1">Y₁Y₂ = (3/8)(2/7) =  6/56</text>
    <rect x="20" y="216" width="632" height="22" rx="4" fill="#0f172a" />
    <text x="336" y="231" font-family="monospace" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">P(One of each ★) = 15/56 + 15/56 = 30/56 = 15/28  |  All 4 sum to 56/56 = 1</text>
  </g>
</svg>`
  },
  "vis-jss-data-sampling-stats": {
    id: "vis-jss-data-sampling-stats",
    skillId: "skill-jss-data-sampling-stats",
    unitId: "unit-p1-jss-data-sampling-stats",
    title: "Unequal-Width Histogram Frequency Density & Stratified Sampling",
    type: "bar_comparison",
    caption: "Illustrating frequency density = f / width on an unequal-width histogram alongside grouped mean Σ(f·x_mid)/Σf and stratified sampling.",
    steps: [
      { step: 1, title: "Compute Class Midpoint", description: "x_m = (lower + upper) / 2 estimates each interval's average score." },
      { step: 2, title: "Divide Σfx by Σf", description: "Sum products f·x_m and divide by total observations Σf." },
      { step: 3, title: "Scale Unequal Bars by Width", description: "Plot height = Frequency Density (f / width) so bar area equals frequency." }
    ],
    takeaway: "Histogram area represents frequency; stratified sampling protects every subgroup proportionally.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Histogram frequency density and stratified sampling formulas">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">SAMPLING DESIGN, GROUPED MEAN &amp; HISTOGRAM DENSITY</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">UNEQUAL-WIDTH HISTOGRAM (HEIGHT = f / WIDTH)</text>
    <line x1="48" y1="196" x2="310" y2="196" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="48" y1="48" x2="48" y2="196" stroke="#94a3b8" stroke-width="1.5" />
    <!-- Bar 10-20 (width 10 -> 50px, f=30 -> density 3.0 -> height 120px) -->
    <rect x="65" y="76" width="54" height="120" fill="#38bdf8" fill-opacity="0.7" stroke="#f8fafc" stroke-width="1.5" />
    <text x="92" y="138" font-family="monospace" font-size="9.5" font-weight="800" fill="#0f172a" text-anchor="middle">f=30</text>
    <text x="92" y="68" font-family="monospace" font-size="9.5" font-weight="800" fill="#38bdf8" text-anchor="middle">d=3.0</text>
    <!-- Bar 20-45 (width 25 -> 135px, f=50 -> density 2.0 -> height 80px) -->
    <rect x="119" y="116" width="135" height="80" fill="#10b981" fill-opacity="0.7" stroke="#f8fafc" stroke-width="1.5" />
    <text x="186" y="158" font-family="monospace" font-size="9.5" font-weight="800" fill="#0f172a" text-anchor="middle">f=50 (wider!)</text>
    <text x="186" y="108" font-family="monospace" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">d=2.0</text>
    <text x="65" y="212" font-family="monospace" font-size="9" fill="#cbd5e1" text-anchor="middle">10</text>
    <text x="119" y="212" font-family="monospace" font-size="9" fill="#cbd5e1" text-anchor="middle">20</text>
    <text x="254" y="212" font-family="monospace" font-size="9" fill="#cbd5e1" text-anchor="middle">45</text>
    <text x="172" y="232" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">Area = width × density = true frequency</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">STATISTICAL FORMULAS &amp; SAMPLING</text>
    <rect x="16" y="42" width="288" height="56" rx="8" fill="#0f172a" stroke="#10b981" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">STRATIFIED SAMPLE SIZE</text>
    <text x="26" y="84" font-family="monospace" font-size="10" fill="#ecfdf5">n_stratum = (N_stratum / N_total) × n_sample</text>
    <rect x="16" y="108" width="288" height="56" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="130" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">GROUPED FREQUENCY MEAN</text>
    <text x="26" y="150" font-family="monospace" font-size="10" fill="#fde68a">x̄ = Σ(f · x_mid) / Σf  (Divide by Σf!)</text>
    <rect x="16" y="174" width="288" height="56" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="26" y="196" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">PIE CHART ANGLE CONVERSION</text>
    <text x="26" y="216" font-family="monospace" font-size="10" fill="#ecfdf5">Sector Angle θ = (f / Σf) × 360°</text>
  </g>
</svg>`
  }
};
