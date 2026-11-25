import { EducationalVisualization } from "../types/contentSaturation";

export const P1_MATH_BATCH1_VISUALIZATIONS: Record<string, EducationalVisualization> = {
  "vis-pri-factors-multiples": {
    id: "vis-pri-factors-multiples",
    skillId: "skill-pri-factors-multiples",
    unitId: "unit-p1-pri-factors-multiples",
    title: "Prime Division Ladder for HCF & LCM + Product Theorem",
    type: "process_diagram",
    caption: "Repeated prime division stops at coprime quotients for HCF (12) and includes the bottom row for LCM (72).",
    steps: [
      { step: 1, title: "Divide by Common Primes", description: "Divide 24 and 36 by 2, 2, and 3 until quotients (2, 3) are coprime." },
      { step: 2, title: "Compute HCF (Left Column)", description: "Multiply left-side common primes: 2 × 2 × 3 = 12." },
      { step: 3, title: "Compute LCM (L-Shape)", description: "Multiply HCF × remaining bottom row (2 × 3) = 72." }
    ],
    takeaway: "HCF(24, 36) × LCM(24, 36) = 12 × 72 = 864 = 24 × 36.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="HCF and LCM division ladder for 24 and 36">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">FACTORS &amp; MULTIPLES: PRIME LADDER FOR HCF &amp; LCM</text>
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">COMMON DIVISION LADDER (24 &amp; 36)</text>
    <line x1="88" y1="42" x2="88" y2="178" stroke="#94a3b8" stroke-width="2" />
    <line x1="40" y1="74" x2="290" y2="74" stroke="#475569" stroke-width="1.5" />
    <line x1="40" y1="108" x2="290" y2="108" stroke="#475569" stroke-width="1.5" />
    <line x1="40" y1="142" x2="290" y2="142" stroke="#475569" stroke-width="1.5" />
    <text x="64" y="64" font-family="monospace" font-size="14" font-weight="800" fill="#fbbf24" text-anchor="middle">2</text>
    <text x="150" y="64" font-family="monospace" font-size="14" font-weight="800" fill="#f8fafc" text-anchor="middle">24</text>
    <text x="240" y="64" font-family="monospace" font-size="14" font-weight="800" fill="#f8fafc" text-anchor="middle">36</text>
    <text x="64" y="98" font-family="monospace" font-size="14" font-weight="800" fill="#fbbf24" text-anchor="middle">2</text>
    <text x="150" y="98" font-family="monospace" font-size="14" font-weight="800" fill="#cbd5e1" text-anchor="middle">12</text>
    <text x="240" y="98" font-family="monospace" font-size="14" font-weight="800" fill="#cbd5e1" text-anchor="middle">18</text>
    <text x="64" y="132" font-family="monospace" font-size="14" font-weight="800" fill="#fbbf24" text-anchor="middle">3</text>
    <text x="150" y="132" font-family="monospace" font-size="14" font-weight="800" fill="#cbd5e1" text-anchor="middle">6</text>
    <text x="240" y="132" font-family="monospace" font-size="14" font-weight="800" fill="#cbd5e1" text-anchor="middle">9</text>
    <text x="150" y="168" font-family="monospace" font-size="14" font-weight="800" fill="#6ee7b7" text-anchor="middle">2</text>
    <text x="240" y="168" font-family="monospace" font-size="14" font-weight="800" fill="#6ee7b7" text-anchor="middle">3</text>
    <text x="165" y="205" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#94a3b8" text-anchor="middle">Quotients (2, 3) share no factor &gt; 1 =&gt; Stop</text>
    <text x="165" y="226" font-family="monospace" font-size="10" font-weight="700" fill="#fbbf24" text-anchor="middle">HCF = 2 × 2 × 3 = 12</text>
  </g>
  <g transform="translate(370, 52)">
    <rect width="326" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">LCM L-SHAPE &amp; PRODUCT LAW</text>
    <rect x="16" y="42" width="294" height="58" rx="8" fill="#0f172a" stroke="#10b981" />
    <text x="28" y="64" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#6ee7b7">LCM = Left Column × Bottom Row</text>
    <text x="28" y="84" font-family="monospace" font-size="11" fill="#ecfdf5">(2 × 2 × 3) × (2 × 3) = 12 × 6 = 72</text>
    <rect x="16" y="110" width="294" height="58" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="28" y="132" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#fbbf24">IDENTITY (2 INTEGERS ONLY)</text>
    <text x="28" y="152" font-family="monospace" font-size="10.5" fill="#fde68a">HCF × LCM = 12 × 72 = 864 = 24 × 36</text>
    <rect x="16" y="178" width="294" height="50" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="163" y="200" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">Factor (&lt;= N) splits supplies (HCF)</text>
    <text x="163" y="218" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#a7f3d0" text-anchor="middle">Multiple (&gt;= N) syncs bell schedules (LCM)</text>
  </g>
</svg>`
  },
  "vis-pri-divisibility-primes": {
    id: "vis-pri-divisibility-primes",
    skillId: "skill-pri-divisibility-primes",
    unitId: "unit-p1-pri-divisibility-primes",
    title: "Divisibility X-Ray Rules & Prime Factor Decomposition Tree",
    type: "process_diagram",
    caption: "Rapid digit tests for 2, 3, 4, 6, 9 paired with the unique prime factor tree of 180 = 2² × 3² × 5.",
    steps: [
      { step: 1, title: "Units & Trailing Digits", description: "Check units digit for 2, 5, 10 and last 2 digits for 4." },
      { step: 2, title: "Digit Sum Filter", description: "Sum digits to test divisibility by 3 and 9 simultaneously." },
      { step: 3, title: "Prime Tree Leaves", description: "Circle prime leaves (2, 2, 3, 3, 5) to write index form 2² × 3² × 5." }
    ],
    takeaway: "1 is neither prime nor composite; 2 is the sole even prime.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Divisibility rules and prime factor tree for 180">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">DIVISIBILITY X-RAY &amp; PRIME FACTOR TREE (180 = 2² × 3² × 5)</text>
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">PRIME TREE: 180</text>
    <circle cx="165" cy="54" r="18" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
    <text x="165" y="59" font-family="monospace" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">180</text>
    <line x1="152" y1="68" x2="105" y2="98" stroke="#94a3b8" stroke-width="2" />
    <line x1="178" y1="68" x2="225" y2="98" stroke="#94a3b8" stroke-width="2" />
    <circle cx="100" cy="112" r="16" fill="#064e3b" stroke="#10b981" stroke-width="2" />
    <text x="100" y="117" font-family="monospace" font-size="12" font-weight="800" fill="#6ee7b7" text-anchor="middle">2</text>
    <circle cx="230" cy="112" r="16" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
    <text x="230" y="117" font-family="monospace" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">90</text>
    <line x1="218" y1="125" x2="170" y2="155" stroke="#94a3b8" stroke-width="2" />
    <line x1="242" y1="125" x2="275" y2="155" stroke="#94a3b8" stroke-width="2" />
    <circle cx="165" cy="168" r="15" fill="#064e3b" stroke="#10b981" stroke-width="2" />
    <text x="165" y="173" font-family="monospace" font-size="12" font-weight="800" fill="#6ee7b7" text-anchor="middle">2</text>
    <circle cx="280" cy="168" r="15" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
    <text x="280" y="173" font-family="monospace" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">45</text>
    <line x1="270" y1="181" x2="230" y2="210" stroke="#94a3b8" stroke-width="2" />
    <line x1="290" y1="181" x2="305" y2="210" stroke="#94a3b8" stroke-width="2" />
    <circle cx="220" cy="222" r="13" fill="#064e3b" stroke="#10b981" stroke-width="2" />
    <text x="220" y="226" font-family="monospace" font-size="11" font-weight="800" fill="#6ee7b7" text-anchor="middle">3</text>
    <circle cx="265" cy="222" r="13" fill="#064e3b" stroke="#10b981" stroke-width="2" />
    <text x="265" y="226" font-family="monospace" font-size="11" font-weight="800" fill="#6ee7b7" text-anchor="middle">3</text>
    <circle cx="306" cy="222" r="13" fill="#064e3b" stroke="#10b981" stroke-width="2" />
    <text x="306" y="226" font-family="monospace" font-size="11" font-weight="800" fill="#6ee7b7" text-anchor="middle">5</text>
    <text x="20" y="226" font-family="monospace" font-size="10.5" font-weight="800" fill="#fbbf24">Index: 2² × 3² × 5</text>
  </g>
  <g transform="translate(370, 52)">
    <rect width="326" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">MENTAL DIVISIBILITY FILTERS</text>
    <rect x="16" y="40" width="294" height="44" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="28" y="58" font-family="monospace" font-size="10" font-weight="800" fill="#38bdf8">÷ 2, 5, 10</text>
    <text x="28" y="75" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1">Inspect last digit: even (2), 0/5 (5), 0 (10)</text>
    <rect x="16" y="92" width="294" height="44" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="28" y="110" font-family="monospace" font-size="10" font-weight="800" fill="#10b981">÷ 3 &amp; ÷ 9</text>
    <text x="28" y="127" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1">Digit sum is multiple of 3 or 9 (4734 -&gt; 18)</text>
    <rect x="16" y="144" width="294" height="44" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="28" y="162" font-family="monospace" font-size="10" font-weight="800" fill="#fbbf24">÷ 4 &amp; ÷ 6</text>
    <text x="28" y="179" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1">Last 2 digits ÷ 4 (4) | Passes BOTH 2 &amp; 3 (6)</text>
    <rect x="16" y="196" width="294" height="36" rx="6" fill="#4c0519" stroke="#f43f5e" />
    <text x="163" y="218" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fda4af" text-anchor="middle">1 is NEITHER prime nor composite | 2 = only even prime</text>
  </g>
</svg>`
  },
  "vis-pri-ratios-proportions": {
    id: "vis-pri-ratios-proportions",
    skillId: "skill-pri-ratios-proportions",
    unitId: "unit-p1-pri-ratios-proportions",
    title: "Bar-Model Ratio Partition & Direct vs Inverse Scaling",
    type: "process_diagram",
    caption: "Partitioning ₦4,500 into 4 : 5 equal bar units alongside direct proportion (y = kx) vs inverse work-rate (xy = k).",
    steps: [
      { step: 1, title: "Count Total Bar Units", description: "4 parts + 5 parts = 9 equal units." },
      { step: 2, title: "Isolate 1 Unit", description: "₦4,500 ÷ 9 = ₦500 per equal block." },
      { step: 3, title: "Contrast Rate Laws", description: "Direct cost scales by ×k; inverse worker hours conserve total crew-time." }
    ],
    takeaway: "Every ratio block holds identical value before multiplying by share counts.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar model ratio sharing and direct versus inverse proportion">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">RATIO BAR MODEL (4 : 5) &amp; PROPORTIONAL SCALING</text>
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">SHARE ₦4,500 IN RATIO 4 : 5</text>
    <text x="16" y="54" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#cbd5e1">Amina (4 parts):</text>
    <rect x="16" y="62" width="46" height="28" fill="#0284c7" stroke="#e0f2fe" />
    <rect x="62" y="62" width="46" height="28" fill="#0284c7" stroke="#e0f2fe" />
    <rect x="108" y="62" width="46" height="28" fill="#0284c7" stroke="#e0f2fe" />
    <rect x="154" y="62" width="46" height="28" fill="#0284c7" stroke="#e0f2fe" />
    <text x="215" y="81" font-family="monospace" font-size="11" font-weight="800" fill="#38bdf8">= ₦2,000</text>
    <text x="16" y="116" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#cbd5e1">Tunde (5 parts):</text>
    <rect x="16" y="124" width="46" height="28" fill="#059669" stroke="#d1fae5" />
    <rect x="62" y="124" width="46" height="28" fill="#059669" stroke="#d1fae5" />
    <rect x="108" y="124" width="46" height="28" fill="#059669" stroke="#d1fae5" />
    <rect x="154" y="124" width="46" height="28" fill="#059669" stroke="#d1fae5" />
    <rect x="200" y="124" width="46" height="28" fill="#059669" stroke="#d1fae5" />
    <text x="256" y="143" font-family="monospace" font-size="11" font-weight="800" fill="#6ee7b7">= ₦2,500</text>
    <rect x="16" y="172" width="298" height="56" rx="8" fill="#0f172a" stroke="#475569" />
    <text x="165" y="194" font-family="monospace" font-size="10" font-weight="700" fill="#fbbf24" text-anchor="middle">Total Parts = 4 + 5 = 9 units</text>
    <text x="165" y="214" font-family="monospace" font-size="10" fill="#f8fafc" text-anchor="middle">1 Unit = ₦4,500 ÷ 9 = ₦500</text>
  </g>
  <g transform="translate(370, 52)">
    <rect width="326" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">DIRECT VS INVERSE PROPORTION</text>
    <rect x="16" y="42" width="294" height="86" rx="8" fill="#0f172a" stroke="#38bdf8" />
    <text x="28" y="64" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#38bdf8">DIRECT (y/x = constant)</text>
    <text x="28" y="84" font-family="monospace" font-size="10" fill="#e2e8f0">5 books -&gt; ₦1,750 (₦350 each)</text>
    <text x="28" y="104" font-family="monospace" font-size="10" fill="#6ee7b7">8 books -&gt; 8 × ₦350 = ₦2,800</text>
    <rect x="16" y="138" width="294" height="90" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="28" y="160" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#fbbf24">INVERSE (workers × hours = constant)</text>
    <text x="28" y="180" font-family="monospace" font-size="10" fill="#e2e8f0">6 painters × 10 hr = 60 painter-hr</text>
    <text x="28" y="200" font-family="monospace" font-size="10" fill="#fde68a">4 painters -&gt; 60 ÷ 4 = 15 hours</text>
  </g>
</svg>`
  },
  "vis-pri-estimation-rounding": {
    id: "vis-pri-estimation-rounding",
    skillId: "skill-pri-estimation-rounding",
    unitId: "unit-p1-pri-estimation-rounding",
    title: "Rounding Decider Rule & Measurement Error Bounds Interval",
    type: "coordinate_graph",
    caption: "Visualizing the half-precision interval [13.95, 14.05) around 14.0 cm alongside leading vs trailing significant figures.",
    steps: [
      { step: 1, title: "Target & Decider Digit", description: "Check only the immediate next digit: <5 rounds down, >=5 rounds up." },
      { step: 2, title: "Significant Figure Start", description: "Skip leading zeros (0.00...) and count from the first non-zero digit." },
      { step: 3, title: "Bounds Interval", description: "Add and subtract precision / 2 around the stated reading." }
    ],
    takeaway: "Error bounds span [value - precision/2, value + precision/2).",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rounding rules and measurement error bounds number line">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">ROUNDING PRECISION, SIGNIFICANT FIGURES &amp; ERROR BOUNDS</text>
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">ERROR INTERVAL: 14.0 cm (nearest 0.1 cm)</text>
    <line x1="30" y1="112" x2="300" y2="112" stroke="#64748b" stroke-width="2" />
    <rect x="85" y="102" width="160" height="20" fill="#10b981" fill-opacity="0.25" stroke="#10b981" />
    <circle cx="85" cy="112" r="5" fill="#10b981" />
    <circle cx="165" cy="112" r="5" fill="#38bdf8" />
    <circle cx="245" cy="112" r="5" fill="#f43f5e" stroke="#ffffff" stroke-width="1.5" />
    <text x="85" y="88" font-family="monospace" font-size="10.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">13.95</text>
    <text x="85" y="142" font-family="system-ui, sans-serif" font-size="9" fill="#6ee7b7" text-anchor="middle">Lower (Included)</text>
    <text x="165" y="88" font-family="monospace" font-size="11" font-weight="800" fill="#38bdf8" text-anchor="middle">14.0</text>
    <text x="245" y="88" font-family="monospace" font-size="10.5" font-weight="800" fill="#fda4af" text-anchor="middle">14.05</text>
    <text x="245" y="142" font-family="system-ui, sans-serif" font-size="9" fill="#fda4af" text-anchor="middle">Upper (Open)</text>
    <rect x="16" y="164" width="298" height="64" rx="8" fill="#0f172a" stroke="#475569" />
    <text x="165" y="186" font-family="monospace" font-size="10.5" font-weight="700" fill="#f8fafc" text-anchor="middle">Half Precision = 0.1 ÷ 2 = ±0.05 cm</text>
    <text x="165" y="208" font-family="monospace" font-size="10.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">13.95 cm &lt;= L &lt; 14.05 cm</text>
  </g>
  <g transform="translate(370, 52)">
    <rect width="326" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">SIGNIFICANT FIGURES &amp; 1-S.F. CHECK</text>
    <rect x="16" y="42" width="294" height="58" rx="7" fill="#0f172a" stroke="#38bdf8" />
    <text x="28" y="63" font-family="monospace" font-size="10.5" font-weight="800" fill="#38bdf8">0.004862  -&gt;  0.0049 (2 s.f.)</text>
    <text x="28" y="82" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1">Skip leading 0.00; 1st s.f.=4, 2nd=8 (decider 6 &gt;= 5)</text>
    <rect x="16" y="108" width="294" height="58" rx="7" fill="#0f172a" stroke="#10b981" />
    <text x="28" y="129" font-family="monospace" font-size="10.5" font-weight="800" fill="#6ee7b7">47,863  -&gt;  48,000 (2 s.f.)</text>
    <text x="28" y="148" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1">Keep trailing 000 placeholders to preserve magnitude</text>
    <rect x="16" y="174" width="294" height="54" rx="7" fill="#064e3b" stroke="#10b981" />
    <text x="28" y="195" font-family="monospace" font-size="10" font-weight="800" fill="#ffffff">(41.8 × 19.3) / 4.07 ≈ (40 × 20) / 4 = 200</text>
    <text x="28" y="214" font-family="system-ui, sans-serif" font-size="9.5" fill="#a7f3d0">1-s.f. estimation verifies order of magnitude fast</text>
  </g>
</svg>`
  },
  "vis-pri-perimeter-area-volume": {
    id: "vis-pri-perimeter-area-volume",
    skillId: "skill-pri-perimeter-area-volume",
    unitId: "unit-p1-pri-perimeter-area-volume",
    title: "Composite L-Shape Cutout & Cuboid Volume Capacity",
    type: "geometry_figure",
    caption: "Bounding-box subtraction for L-shape area (96 - 15 = 81 m²) and metric volume conversion (60,000 cm³ = 60 litres).",
    steps: [
      { step: 1, title: "Outer Bounding Rectangle", description: "Compute full 12 × 8 = 96 m² first." },
      { step: 2, title: "Subtract Corner Cutout", description: "Remove 5 × 3 = 15 m² corner leaving 81 m² (perimeter stays 40 m)." },
      { step: 3, title: "Convert cm³ to Litres", description: "Multiply L × W × H and divide by 1,000." }
    ],
    takeaway: "Corner cutouts reduce area while leaving outer rectilinear perimeter unchanged.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Composite L-shape area cutout and cuboid tank capacity">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">COMPOSITE L-SHAPE CUTOUT &amp; CUBOID CAPACITY (1 L = 1,000 cm³)</text>
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">L-SHAPE: OUTER (12×8) MINUS (5×3)</text>
    <polygon points="50,60 190,60 190,108 270,108 270,180 50,180" fill="#0284c7" fill-opacity="0.35" stroke="#38bdf8" stroke-width="2.5" />
    <rect x="190" y="60" width="80" height="48" fill="#4c0519" fill-opacity="0.45" stroke="#f43f5e" stroke-dasharray="4 3" stroke-width="1.5" />
    <text x="230" y="88" font-family="monospace" font-size="10" font-weight="800" fill="#fda4af" text-anchor="middle">5 × 3 = 15</text>
    <text x="160" y="198" font-family="monospace" font-size="11" font-weight="800" fill="#f8fafc" text-anchor="middle">12 m</text>
    <text x="34" y="124" font-family="monospace" font-size="11" font-weight="800" fill="#f8fafc" text-anchor="middle">8 m</text>
    <text x="120" y="54" font-family="monospace" font-size="10" font-weight="700" fill="#fbbf24" text-anchor="middle">7 m</text>
    <text x="290" y="148" font-family="monospace" font-size="10" font-weight="700" fill="#fbbf24">5 m</text>
    <text x="165" y="226" font-family="monospace" font-size="10.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">Area = 96 - 15 = 81 m² | Perimeter = 40 m</text>
  </g>
  <g transform="translate(370, 52)">
    <rect width="326" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">3D CUBOID TANK VOLUME</text>
    <polygon points="65,86 195,86 235,58 105,58" fill="#064e3b" stroke="#10b981" stroke-width="2" />
    <rect x="65" y="86" width="130" height="72" fill="#0f172a" fill-opacity="0.7" stroke="#10b981" stroke-width="2" />
    <polygon points="195,86 235,58 235,130 195,158" fill="#065f46" fill-opacity="0.7" stroke="#10b981" stroke-width="2" />
    <text x="130" y="174" font-family="monospace" font-size="10.5" font-weight="800" fill="#f8fafc" text-anchor="middle">L = 50 cm</text>
    <text x="234" y="152" font-family="monospace" font-size="10" font-weight="800" fill="#fbbf24">W=40</text>
    <text x="44" y="124" font-family="monospace" font-size="10" font-weight="800" fill="#38bdf8" text-anchor="middle">H=30</text>
    <rect x="16" y="186" width="294" height="44" rx="7" fill="#0f172a" stroke="#475569" />
    <text x="163" y="205" font-family="monospace" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">V = 50 × 40 × 30 = 60,000 cm³</text>
    <text x="163" y="222" font-family="monospace" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">Capacity = 60,000 ÷ 1,000 = 60 Litres</text>
  </g>
</svg>`
  },
  "vis-pri-angles-plane-figures": {
    id: "vis-pri-angles-plane-figures",
    skillId: "skill-pri-angles-plane-figures",
    unitId: "unit-p1-pri-angles-plane-figures",
    title: "Parallel Transversal Laws (F / Z / C) & Regular Polygon Exterior Sum",
    type: "geometry_figure",
    caption: "Corresponding (68°), alternate (68°), and co-interior (112°) transversal angles paired with triangle & regular polygon angle laws.",
    steps: [
      { step: 1, title: "Parallel Transversal Angles", description: "F (corresponding) and Z (alternate) are equal; C (co-interior) sums to 180°." },
      { step: 2, title: "Triangle Algebraic Sum", description: "Sum all three expressions to 180° before classifying acute/right/obtuse." },
      { step: 3, title: "Regular Polygon Exterior", description: "Every exterior turn around a regular n-gon equals 360° / n." }
    ],
    takeaway: "On parallel lines, every transversal angle equals θ or 180° - θ.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallel line transversal angles and polygon angle formulas">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">ANGLES: PARALLEL TRANSVERSALS (F/Z/C) &amp; POLYGON THEOREMS</text>
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">PARALLEL LINES CUT BY TRANSVERSAL</text>
    <line x1="34" y1="78" x2="296" y2="78" stroke="#38bdf8" stroke-width="2.5" />
    <line x1="34" y1="158" x2="296" y2="158" stroke="#38bdf8" stroke-width="2.5" />
    <polygon points="270,74 282,78 270,82" fill="#38bdf8" />
    <polygon points="270,154 282,158 270,162" fill="#38bdf8" />
    <line x1="100" y1="196" x2="220" y2="42" stroke="#fbbf24" stroke-width="2.5" />
    <text x="208" y="96" font-family="monospace" font-size="11" font-weight="800" fill="#6ee7b7">68°</text>
    <text x="128" y="148" font-family="monospace" font-size="11" font-weight="800" fill="#fbbf24">68° (Z)</text>
    <text x="180" y="148" font-family="monospace" font-size="11" font-weight="800" fill="#fda4af">112° (C)</text>
    <text x="148" y="176" font-family="monospace" font-size="11" font-weight="800" fill="#6ee7b7">68° (F)</text>
    <rect x="16" y="198" width="298" height="36" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="165" y="220" font-family="monospace" font-size="10" font-weight="700" fill="#f8fafc" text-anchor="middle">F &amp; Z = Equal (68°) | Co-interior C: 68° + 112° = 180°</text>
  </g>
  <g transform="translate(370, 52)">
    <rect width="326" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">TRIANGLE &amp; REGULAR POLYGON LAWS</text>
    <rect x="16" y="42" width="294" height="58" rx="7" fill="#0f172a" stroke="#38bdf8" />
    <text x="28" y="63" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8">ISOSCELES TRIANGLE</text>
    <text x="28" y="82" font-family="monospace" font-size="10" fill="#f8fafc">Base angles equal: x + x + (x+30) = 180 =&gt; 50°,50°,80°</text>
    <rect x="16" y="108" width="294" height="58" rx="7" fill="#0f172a" stroke="#10b981" />
    <text x="28" y="129" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">REGULAR OCTAGON (n = 8)</text>
    <text x="28" y="148" font-family="monospace" font-size="10" fill="#ecfdf5">Ext = 360°/8 = 45° | Int = 180° - 45° = 135°</text>
    <rect x="16" y="174" width="294" height="54" rx="7" fill="#064e3b" stroke="#10b981" />
    <text x="28" y="195" font-family="monospace" font-size="10" font-weight="800" fill="#fbbf24">Comp (90°) vs Supp (180°) vs Point (360°)</text>
    <text x="28" y="213" font-family="system-ui, sans-serif" font-size="9.5" fill="#d1fae5">Polygon Interior Sum = (n - 2) × 180°</text>
  </g>
</svg>`
  },
  "vis-pri-logical-deduction": {
    id: "vis-pri-logical-deduction",
    skillId: "skill-pri-logical-deduction",
    unitId: "unit-p1-pri-logical-deduction",
    title: "Inequality Ordering Chain & Worst-Case Pigeonhole Matrix",
    type: "process_diagram",
    caption: "Translating relational clues into transitive chains and testing truth-table consistency across suspects.",
    steps: [
      { step: 1, title: "Inequality Chain", description: "Convert 'before/after' clues into < chains and merge." },
      { step: 2, title: "Pigeonhole Worst Case", description: "Pick 1 of each distinct colour (k draws), then add +1." },
      { step: 3, title: "Truth-Table Audit", description: "Evaluate all 3 statements under each suspect to isolate the unique match." }
    ],
    takeaway: "Systematic case elimination guarantees logical certainty without guessing.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Logical ordering chain and pigeonhole worst-case matrix">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">LOGICAL DEDUCTION: ORDERING CHAINS &amp; TRUTH CONSISTENCY</text>
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">TRANSITIVE ORDERING CHAIN</text>
    <rect x="20" y="46" width="66" height="36" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="53" y="68" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">1. Dami</text>
    <text x="94" y="68" font-family="monospace" font-size="12" font-weight="800" fill="#fbbf24">&lt;</text>
    <rect x="108" y="46" width="58" height="36" rx="6" fill="#0f172a" stroke="#38bdf8" />
    <text x="137" y="68" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">2. Ada</text>
    <text x="174" y="68" font-family="monospace" font-size="12" font-weight="800" fill="#fbbf24">&lt;</text>
    <rect x="188" y="46" width="58" height="36" rx="6" fill="#0f172a" stroke="#38bdf8" />
    <text x="217" y="68" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">3. Bola</text>
    <text x="254" y="68" font-family="monospace" font-size="12" font-weight="800" fill="#fbbf24">&lt;</text>
    <rect x="268" y="46" width="50" height="36" rx="6" fill="#0f172a" stroke="#94a3b8" />
    <text x="293" y="68" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#cbd5e1" text-anchor="middle">4. Chi</text>
    <rect x="20" y="102" width="298" height="124" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="32" y="124" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#fbbf24">PIGEONHOLE PRINCIPLE (3 COLOURS)</text>
    <circle cx="54" cy="154" r="11" fill="#ef4444" />
    <circle cx="90" cy="154" r="11" fill="#3b82f6" />
    <circle cx="126" cy="154" r="11" fill="#10b981" />
    <text x="164" y="158" font-family="monospace" font-size="11" font-weight="800" fill="#f8fafc">+ 1 Draw =&gt;</text>
    <text x="256" y="158" font-family="monospace" font-size="11" font-weight="800" fill="#6ee7b7">4 GUARANTEED</text>
    <text x="32" y="192" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1">Worst case pulls 1 Red, 1 Blue, 1 Green (3 pens).</text>
    <text x="32" y="210" font-family="system-ui, sans-serif" font-size="9.5" fill="#fde68a">Draw #4 is forced to pair with an existing colour.</text>
  </g>
  <g transform="translate(370, 52)">
    <rect width="326" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">TRUTH-TABLE CASE VERIFICATION</text>
    <text x="24" y="50" font-family="monospace" font-size="10" font-weight="800" fill="#94a3b8">Suspect  | Tobi  | Uche  | Zainab | True Count</text>
    <line x1="20" y1="58" x2="306" y2="58" stroke="#475569" />
    <rect x="20" y="66" width="286" height="32" rx="5" fill="#064e3b" stroke="#10b981" />
    <text x="26" y="86" font-family="monospace" font-size="10" font-weight="800" fill="#ffffff">Tobi     |   F   |   T   |   F    | 1 TRUE  ✓</text>
    <rect x="20" y="106" width="286" height="32" rx="5" fill="#0f172a" stroke="#475569" />
    <text x="26" y="126" font-family="monospace" font-size="10" fill="#fda4af">Uche     |   T   |   F   |   T    | 2 TRUE  ✗</text>
    <rect x="20" y="146" width="286" height="32" rx="5" fill="#0f172a" stroke="#475569" />
    <text x="26" y="166" font-family="monospace" font-size="10" fill="#fda4af">Zainab   |   T   |   T   |   F    | 2 TRUE  ✗</text>
    <rect x="20" y="190" width="286" height="40" rx="6" fill="#0f172a" stroke="#38bdf8" />
    <text x="163" y="214" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="middle">Constraint: Exactly 1 truth-teller =&gt; Tobi is unique!</text>
  </g>
</svg>`
  },
  "vis-jss-indices-standard-form": {
    id: "vis-jss-indices-standard-form",
    skillId: "skill-jss-indices-standard-form",
    unitId: "unit-p1-jss-indices-standard-form",
    title: "Laws of Indices, Standard Form & Surd Extraction Matrix",
    type: "process_diagram",
    caption: "Rational/negative power conversion 27^(-2/3) = 1/9, standard form quotient exponent rules, and surd square factoring.",
    steps: [
      { step: 1, title: "Negative & Rational Power", description: "Flip reciprocal for minus sign, extract nth root first, then raise to m." },
      { step: 2, title: "Standard Form Mantissa", description: "Keep 1 <= A < 10 separate while adding/subtracting base-10 exponents." },
      { step: 3, title: "Factor Largest Squares", description: "Reduce √75 = 5√3 and √27 = 3√3 before combining coefficients." }
    ],
    takeaway: "Square roots distribute across multiplication √(ab) = √a√b, never addition.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Laws of indices, standard form, and quadratic surds">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">INDICES, SCIENTIFIC STANDARD FORM &amp; SURD REDUCTION</text>
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">INDEX LAWS &amp; FRACTIONAL POWERS</text>
    <rect x="16" y="42" width="298" height="54" rx="7" fill="#0f172a" stroke="#38bdf8" />
    <text x="28" y="63" font-family="monospace" font-size="10.5" font-weight="800" fill="#38bdf8">aᵐ × aⁿ = aᵐ⁺ⁿ  |  aᵐ ÷ aⁿ = aᵐ⁻ⁿ</text>
    <text x="28" y="82" font-family="monospace" font-size="10" fill="#cbd5e1">(aᵐ)ⁿ = aᵐⁿ   |   a⁰ = 1 (a ≠ 0)</text>
    <rect x="16" y="106" width="298" height="62" rx="7" fill="#064e3b" stroke="#10b981" />
    <text x="28" y="128" font-family="monospace" font-size="10.5" font-weight="800" fill="#6ee7b7">27^(-2/3) = 1 / (³√27)² = 1 / 3² = 1/9</text>
    <text x="28" y="149" font-family="system-ui, sans-serif" font-size="9.5" fill="#d1fae5">Order: (1) Minus -&gt; reciprocal  (2) Root  (3) Power</text>
    <rect x="16" y="176" width="298" height="54" rx="7" fill="#0f172a" stroke="#f59e0b" />
    <text x="28" y="197" font-family="monospace" font-size="10" font-weight="800" fill="#fbbf24">STANDARD FORM: (3.6 × 10⁵) ÷ (1.2 × 10⁻²)</text>
    <text x="28" y="216" font-family="monospace" font-size="10" fill="#fde68a">= 3.0 × 10^(5 - (-2)) = 3.0 × 10⁷ (1 &lt;= A &lt; 10)</text>
  </g>
  <g transform="translate(370, 52)">
    <rect width="326" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">SURD SIMPLIFICATION: √75 + √27 - √12</text>
    <rect x="16" y="42" width="294" height="44" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="28" y="68" font-family="monospace" font-size="11" fill="#38bdf8">√75 = √(25 × 3) = 5√3</text>
    <rect x="16" y="94" width="294" height="44" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="28" y="120" font-family="monospace" font-size="11" fill="#10b981">√27 = √(9 × 3)  = 3√3</text>
    <rect x="16" y="146" width="294" height="44" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="28" y="172" font-family="monospace" font-size="11" fill="#fbbf24">√12 = √(4 × 3)  = 2√3</text>
    <rect x="16" y="198" width="294" height="34" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="163" y="219" font-family="monospace" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">(5 + 3 - 2)√3 = 6√3</text>
  </g>
</svg>`
  },
  "vis-jss-inequalities-factorisation": {
    id: "vis-jss-inequalities-factorisation",
    skillId: "skill-jss-inequalities-factorisation",
    unitId: "unit-p1-jss-inequalities-factorisation",
    title: "Inequality Sign-Reversal Number Line & Bracket Factor Cancellation",
    type: "coordinate_graph",
    caption: "Closed vs open ray intervals on x <= -4 alongside factor-first cancellation of (x² - x - 12)/(x + 3).",
    steps: [
      { step: 1, title: "Isolate Variable Term", description: "Move constants cleanly before dividing by coefficient." },
      { step: 2, title: "Flip Arrow on Negative Divide", description: "-2x >= 8 reverses to x <= -4 (closed dot at -4 pointing left)." },
      { step: 3, title: "Factor Before Cancelling", description: "Split x² - x - 12 into (x - 4)(x + 3) to cancel (x + 3)." }
    ],
    takeaway: "Multiplying or dividing an inequality by a negative number flips the order direction.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Linear inequality number line and rational quadratic factorisation">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">INEQUALITY SIGN REVERSAL &amp; RATIONAL FACTORISATION</text>
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">SOLVE: 5 - 2x &gt;= 13</text>
    <text x="16" y="50" font-family="monospace" font-size="11" fill="#e2e8f0">-2x &gt;= 8</text>
    <text x="16" y="72" font-family="monospace" font-size="11" font-weight="800" fill="#fda4af">÷ (-2) FLIPS &gt;= to &lt;=  =&gt;  x &lt;= -4</text>
    <line x1="28" y1="126" x2="302" y2="126" stroke="#64748b" stroke-width="2" />
    <line x1="34" y1="126" x2="145" y2="126" stroke="#10b981" stroke-width="5" />
    <polygon points="28,126 42,119 42,133" fill="#10b981" />
    <circle cx="145" cy="126" r="6" fill="#10b981" stroke="#ffffff" stroke-width="1.5" />
    <text x="90" y="152" font-family="monospace" font-size="10" fill="#6ee7b7" text-anchor="middle">-6</text>
    <text x="145" y="152" font-family="monospace" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">-4</text>
    <text x="200" y="152" font-family="monospace" font-size="10" fill="#94a3b8" text-anchor="middle">-2</text>
    <text x="255" y="152" font-family="monospace" font-size="10" fill="#94a3b8" text-anchor="middle">0</text>
    <rect x="16" y="172" width="298" height="56" rx="7" fill="#0f172a" stroke="#475569" />
    <text x="165" y="194" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#6ee7b7" text-anchor="middle">Closed dot = Included (&lt;=, &gt;=) | Open = (&lt;, &gt;)</text>
    <text x="165" y="213" font-family="monospace" font-size="9.5" fill="#cbd5e1" text-anchor="middle">Check x=-5: 5-2(-5)=15 &gt;= 13 ✓</text>
  </g>
  <g transform="translate(370, 52)">
    <rect width="326" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">FACTORISE BEFORE CANCELLING</text>
    <rect x="16" y="42" width="294" height="56" rx="7" fill="#0f172a" stroke="#38bdf8" />
    <text x="28" y="63" font-family="monospace" font-size="10.5" font-weight="800" fill="#ffffff">x² - x - 12  (Sum = -1, Prod = -12)</text>
    <text x="28" y="83" font-family="monospace" font-size="10.5" fill="#6ee7b7">(-4) + 3 = -1  =&gt;  (x - 4)(x + 3)</text>
    <rect x="16" y="108" width="294" height="60" rx="7" fill="#064e3b" stroke="#10b981" />
    <text x="28" y="129" font-family="monospace" font-size="10.5" font-weight="800" fill="#ffffff">(x² - x - 12) / (x + 3)</text>
    <text x="28" y="150" font-family="monospace" font-size="10.5" fill="#a7f3d0">= [(x - 4)(x + 3)] / (x + 3) = x - 4</text>
    <rect x="16" y="176" width="294" height="52" rx="7" fill="#4c0519" stroke="#f43f5e" />
    <text x="163" y="198" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#fda4af" text-anchor="middle">TRAP: Never cancel individual terms across + or -</text>
    <text x="163" y="216" font-family="monospace" font-size="9.5" fill="#fecdd3" text-anchor="middle">Restrict denominator: x ≠ -3</text>
  </g>
</svg>`
  },
  "vis-jss-linear-graphs-coord": {
    id: "vis-jss-linear-graphs-coord",
    skillId: "skill-jss-linear-graphs-coord",
    unitId: "unit-p1-jss-linear-graphs-coord",
    title: "Cartesian Gradient Triangle, Midpoint & Perpendicular Lines",
    type: "coordinate_graph",
    caption: "Rise-over-run gradient triangle Δy/Δx = 8/4 = 2 joining A(1, 3) to B(5, 11) with midpoint (3, 7) and 90° slope m₁m₂ = -1.",
    steps: [
      { step: 1, title: "Right-Triangle Rise & Run", description: "Horizontal Δx = 4, vertical Δy = 8 yield m = 2 and d = √80." },
      { step: 2, title: "Midpoint Average", description: "M = ((1+5)/2, (3+11)/2) = (3, 7)." },
      { step: 3, title: "Perpendicular Line", description: "Negate and invert slope: m₂ = -1/m₁." }
    ],
    takeaway: "Every straight-line distance reduces to Pythagoras on Δx and Δy.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate geometry gradient, midpoint, and perpendicular slopes">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">COORDINATE GEOMETRY: GRADIENT, MIDPOINT &amp; PERPENDICULARS</text>
  <g transform="translate(24, 52)">
    <rect width="330" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">SEGMENT A(1,3) TO B(5,11): y = 2x + 1</text>
    <line x1="48" y1="205" x2="300" y2="205" stroke="#64748b" stroke-width="1.5" />
    <line x1="65" y1="42" x2="65" y2="220" stroke="#64748b" stroke-width="1.5" />
    <line x1="95" y1="175" x2="235" y2="175" stroke="#fbbf24" stroke-dasharray="4 3" stroke-width="2" />
    <line x1="235" y1="175" x2="235" y2="63" stroke="#10b981" stroke-dasharray="4 3" stroke-width="2" />
    <line x1="78" y1="188" x2="255" y2="48" stroke="#38bdf8" stroke-width="3" />
    <circle cx="95" cy="175" r="5" fill="#ffffff" />
    <circle cx="165" cy="119" r="5" fill="#fbbf24" />
    <circle cx="235" cy="63" r="5" fill="#6ee7b7" />
    <text x="95" y="194" font-family="monospace" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">A(1,3)</text>
    <text x="130" y="114" font-family="monospace" font-size="10" font-weight="800" fill="#fbbf24">M(3,7)</text>
    <text x="235" y="54" font-family="monospace" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">B(5,11)</text>
    <text x="165" y="191" font-family="monospace" font-size="10" font-weight="800" fill="#fbbf24" text-anchor="middle">Δx = 4</text>
    <text x="242" y="122" font-family="monospace" font-size="10" font-weight="800" fill="#6ee7b7">Δy = 8</text>
    <text x="165" y="232" font-family="monospace" font-size="10" font-weight="700" fill="#cbd5e1" text-anchor="middle">m = 8/4 = 2  |  d = √(4² + 8²) = 4√5</text>
  </g>
  <g transform="translate(370, 52)">
    <rect width="326" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">PARALLEL, PERPENDICULAR &amp; INTERSECTION</text>
    <rect x="16" y="42" width="294" height="54" rx="7" fill="#0f172a" stroke="#38bdf8" />
    <text x="28" y="63" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8">PARALLEL LINES: m₁ = m₂</text>
    <text x="28" y="82" font-family="monospace" font-size="10" fill="#f8fafc">Same gradient, distinct y-intercept c</text>
    <rect x="16" y="106" width="294" height="58" rx="7" fill="#064e3b" stroke="#10b981" />
    <text x="28" y="127" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">PERPENDICULAR (90°): m₁ × m₂ = -1</text>
    <text x="28" y="147" font-family="monospace" font-size="10" fill="#ecfdf5">m₁ = 1/3  ⇒  m₂ = -3  (Flip &amp; Negate)</text>
    <rect x="16" y="174" width="294" height="54" rx="7" fill="#0f172a" stroke="#f59e0b" />
    <text x="28" y="195" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">SIMULTANEOUS INTERSECTION</text>
    <text x="28" y="214" font-family="monospace" font-size="10" fill="#fde68a">y = 2x - 1  ∩  x + y = 8  ⇒  (3, 5)</text>
  </g>
</svg>`
  }
};
