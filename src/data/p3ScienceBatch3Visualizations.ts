import { EducationalVisualization } from "../types/contentSaturation";

export const P3_SCIENCE_BATCH3_VISUALIZATIONS: Record<string, EducationalVisualization> = {
  "vis-pri-plants-animals-ecosystems": {
    id: "vis-pri-plants-animals-ecosystems",
    skillId: "skill-pri-plants-animals-ecosystems",
    unitId: "unit-p3-pri-plants-animals-ecosystems",
    title: "Ecosystem Energy Arrows & Decomposer Mineral Cycle",
    type: "conceptual_diagram",
    caption: "Tracing one-way solar energy up food chains (arrows show 'energy flows to eater') while decomposers close the mineral soil loop.",
    steps: [
      { step: 1, title: "Capture Solar Energy", description: "Green plant producers convert sunlight, CO₂, and H₂O into glucose." },
      { step: 2, title: "Follow Arrows to Eaters", description: "Arrows always point from organism eaten into consumer." },
      { step: 3, title: "Recycle Soil Minerals", description: "Fungi and bacteria decompose waste back into root nitrates." }
    ],
    takeaway: "Energy flows one way and dissipates as heat, whereas soil minerals cycle endlessly through decomposers.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ecosystem food chain energy flow and decomposer nutrient cycle">
  <defs>
    <marker id="ecoArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#fbbf24" />
    </marker>
    <marker id="ecoLoop" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
    </marker>
  </defs>
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">ECOSYSTEM ENERGY ARROWS &amp; DECOMPOSER NUTRIENT LOOP</text>
  <g transform="translate(24, 52)">
    <rect width="672" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <!-- Nodes -->
    <rect x="24" y="64" width="110" height="58" rx="8" fill="#451a03" stroke="#fbbf24" stroke-width="2" />
    <text x="79" y="90" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fde68a" text-anchor="middle">SUNLIGHT</text>
    <text x="79" y="108" font-family="monospace" font-size="9.5" fill="#fbbf24" text-anchor="middle">Energy Source</text>

    <rect x="176" y="64" width="124" height="58" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="2" />
    <text x="238" y="90" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7" text-anchor="middle">PRODUCER</text>
    <text x="238" y="108" font-family="monospace" font-size="9.5" fill="#ecfdf5" text-anchor="middle">Grass / Maize</text>

    <rect x="342" y="64" width="132" height="58" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
    <text x="408" y="90" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8" text-anchor="middle">1° CONSUMER</text>
    <text x="408" y="108" font-family="monospace" font-size="9.5" fill="#e0f2fe" text-anchor="middle">Locust (Herbivore)</text>

    <rect x="516" y="64" width="132" height="58" rx="8" fill="#0f172a" stroke="#f43f5e" stroke-width="2" />
    <text x="582" y="90" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fda4af" text-anchor="middle">2° CONSUMER</text>
    <text x="582" y="108" font-family="monospace" font-size="9.5" fill="#ffe4e6" text-anchor="middle">Toad / Hawk</text>

    <line x1="134" y1="93" x2="172" y2="93" stroke="#fbbf24" stroke-width="2.5" marker-end="url(#ecoArrow)" />
    <line x1="300" y1="93" x2="338" y2="93" stroke="#fbbf24" stroke-width="2.5" marker-end="url(#ecoArrow)" />
    <line x1="474" y1="93" x2="512" y2="93" stroke="#fbbf24" stroke-width="2.5" marker-end="url(#ecoArrow)" />

    <text x="408" y="42" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24" text-anchor="middle">Arrows mean "ENERGY FLOWS INTO EATER" (Not "Hunts")</text>

    <!-- Decomposer loop -->
    <rect x="270" y="160" width="240" height="44" rx="8" fill="#0f172a" stroke="#a855f7" stroke-width="2" />
    <text x="390" y="180" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#d8b4fe" text-anchor="middle">DECOMPOSERS (Fungi &amp; Bacteria)</text>
    <text x="390" y="196" font-family="monospace" font-size="9" fill="#f3e8ff" text-anchor="middle">Recycle Dead Matter → Soil Nitrates</text>
    <path d="M 582 122 Q 582 182 514 182" fill="none" stroke="#38bdf8" stroke-width="2" marker-end="url(#ecoLoop)" />
    <path d="M 270 182 Q 238 182 238 126" fill="none" stroke="#38bdf8" stroke-width="2" marker-end="url(#ecoLoop)" />
    <text x="336" y="230" font-family="monospace" font-size="9.5" fill="#cbd5e1" text-anchor="middle">Mutualism (+/+) | Parasitism (+/−) | Commensalism (+/0)</text>
  </g>
</svg>`
  },
  "vis-pri-human-body-systems": {
    id: "vis-pri-human-body-systems",
    skillId: "skill-pri-human-body-systems",
    unitId: "unit-p3-pri-human-body-systems",
    title: "Digestive Absorption, Heart Circulation & Antagonistic Elbow Pair",
    type: "conceptual_diagram",
    caption: "Linking small-intestine villi absorption, alveoli O₂/CO₂ swap, arteries (Away) vs veins (Back with valves), and biceps/triceps pulling.",
    steps: [
      { step: 1, title: "Absorb via Villi", description: "Small intestine absorbs digested soluble nutrients into blood." },
      { step: 2, title: "Exchange Gas in Alveoli", description: "Lungs take in O₂ (21%→16% exhaled) and release CO₂ (0.04%→4%)." },
      { step: 3, title: "Pull via Opposing Muscles", description: "Biceps contracts while triceps relaxes to flex forearm." }
    ],
    takeaway: "Arteries carry blood away under high pressure; small intestine villi absorb nutrients; muscles only pull in antagonistic pairs.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Human digestive, circulatory, respiratory, and nutrition overview">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">HUMAN BODY SYSTEMS: DIGESTION, CIRCULATION &amp; NUTRITION</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">CIRCULATORY &amp; DIGESTIVE PATHWAYS</text>
    <rect x="16" y="42" width="304" height="58" rx="8" fill="#0f172a" stroke="#f43f5e" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fda4af">HEART → ARTERY (AWAY) → CAPILLARY → VEIN</text>
    <text x="26" y="84" font-family="monospace" font-size="9.5" fill="#ffe4e6">Artery = thick wall | Vein = one-way valves</text>
    <rect x="16" y="110" width="304" height="58" rx="8" fill="#0f172a" stroke="#10b981" />
    <text x="26" y="132" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">DIGESTIVE ABSORPTION PIPELINE</text>
    <text x="26" y="152" font-family="monospace" font-size="9.5" fill="#ecfdf5">Mouth → Stomach → Small Intestine (Villi!)</text>
    <rect x="16" y="178" width="304" height="52" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="168" y="199" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">ANTAGONISTIC MUSCLES (ONLY PULL!)</text>
    <text x="168" y="218" font-family="monospace" font-size="9.5" fill="#ecfdf5" text-anchor="middle">Bend Elbow: Biceps Contracts | Triceps Relaxes</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">RESPIRATION &amp; DEFICIENCY PREVENTION</text>
    <rect x="16" y="42" width="288" height="58" rx="8" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8">ALVEOLI BREATH COMPOSITION</text>
    <text x="26" y="84" font-family="monospace" font-size="9.5" fill="#e0f2fe">In: 21% O₂, 0.04% CO₂ → Out: 16% O₂, 4% CO₂</text>
    <rect x="16" y="110" width="288" height="120" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="132" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">KEY DEFICIENCY PREVENTION</text>
    <text x="26" y="154" font-family="monospace" font-size="9.5" fill="#fde68a">• Protein Lack     ⇒ Kwashiorkor</text>
    <text x="26" y="174" font-family="monospace" font-size="9.5" fill="#fde68a">• Ca + Vit D Lack  ⇒ Rickets (Soft bones)</text>
    <text x="26" y="194" font-family="monospace" font-size="9.5" fill="#fde68a">• Vitamin C Lack   ⇒ Scurvy (Gums)</text>
    <text x="26" y="214" font-family="monospace" font-size="9.5" fill="#fde68a">• Iron Lack        ⇒ Anaemia (Fatigue)</text>
  </g>
</svg>`
  },
  "vis-pri-earth-weather-seasons": {
    id: "vis-pri-earth-weather-seasons",
    skillId: "skill-pri-earth-weather-seasons",
    unitId: "unit-p3-pri-earth-weather-seasons",
    title: "23.5° Tilted Orbit Seasons, Water Cycle & Weather Instruments",
    type: "conceptual_diagram",
    caption: "Illustrating Earth's 23.5° axial tilt creating opposite summer/winter hemispheres alongside West African Harmattan/Monsoon winds and barometer forecasting.",
    steps: [
      { step: 1, title: "Spin vs Orbit Tilt", description: "24 h axial rotation drives day/night; 23.5° tilted orbit drives opposite seasons." },
      { step: 2, title: "Cool Rising Vapor", description: "Water evaporates invisibly, cools aloft, and condenses into cloud droplets." },
      { step: 3, title: "Read Weather Instruments", description: "Barometer (pressure), Anemometer (wind speed), Hygrometer (humidity), Wind Vane (origin)." }
    ],
    takeaway: "Distance from the Sun does NOT cause seasons—Earth's 23.5° axial tilt changes sunlight angle across opposite hemispheres.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Earth 23.5 degree axial tilt seasons and weather instruments">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">EARTH 23.5° TILTED SEASONS &amp; METEOROLOGY</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">DECEMBER SOLSTICE (WHY OPPOSITE SEASONS)</text>
    <!-- Sun center left -->
    <circle cx="96" cy="128" r="34" fill="#fbbf24" stroke="#fde68a" stroke-width="2" />
    <text x="96" y="132" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#0f172a" text-anchor="middle">SUN</text>
    <!-- Sunbeams -->
    <line x1="136" y1="112" x2="206" y2="112" stroke="#fde68a" stroke-width="1.5" stroke-dasharray="4,3" />
    <line x1="136" y1="144" x2="206" y2="144" stroke="#fde68a" stroke-width="1.5" stroke-dasharray="4,3" />
    <!-- Tilted Earth on right -->
    <g transform="translate(244, 128) rotate(23.5)">
      <circle cx="0" cy="0" r="32" fill="#2563eb" stroke="#38bdf8" stroke-width="2" />
      <line x1="-32" y1="0" x2="32" y2="0" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3,2" />
      <line x1="0" y1="-44" x2="0" y2="44" stroke="#f8fafc" stroke-width="2" />
    </g>
    <text x="256" y="76" font-family="monospace" font-size="9.5" font-weight="800" fill="#93c5fd">N (Winter)</text>
    <text x="228" y="188" font-family="monospace" font-size="9.5" font-weight="800" fill="#fbbf24">S (Summer)</text>
    <text x="168" y="226" font-family="monospace" font-size="9.5" fill="#cbd5e1" text-anchor="middle">24h Spin = Day/Night | 23.5° Tilt = Seasons</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">WEATHER INSTRUMENTS &amp; TRADE WINDS</text>
    <rect x="16" y="42" width="288" height="106" rx="8" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="64" font-family="monospace" font-size="9.5" fill="#e0f2fe">• Barometer   → Air Pressure (Fall = Storm)</text>
    <text x="26" y="84" font-family="monospace" font-size="9.5" fill="#e0f2fe">• Anemometer  → Wind Speed</text>
    <text x="26" y="104" font-family="monospace" font-size="9.5" fill="#e0f2fe">• Hygrometer  → Humidity (%)</text>
    <text x="26" y="124" font-family="monospace" font-size="9.5" fill="#e0f2fe">• Wind Vane   → Points INTO Wind Origin</text>
    <rect x="16" y="158" width="288" height="72" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="26" y="178" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7">WEST AFRICAN SEASONAL WINDS</text>
    <text x="26" y="198" font-family="monospace" font-size="9.5" fill="#ecfdf5">NE Harmattan (Sahara): Dry, Cool, Dusty</text>
    <text x="26" y="216" font-family="monospace" font-size="9.5" fill="#ecfdf5">SW Monsoon (Atlantic): Warm, Humid Rain</text>
  </g>
</svg>`
  },
  "vis-pri-crop-cycles-soil-care": {
    id: "vis-pri-crop-cycles-soil-care",
    skillId: "skill-pri-crop-cycles-soil-care",
    unitId: "unit-p3-pri-crop-cycles-soil-care",
    title: "Soil Retention Test (Sandy vs Clay vs Loam) & 3-Year Crop Rotation",
    type: "bar_comparison",
    caption: "Comparing drainage and water retention out of 100 mL across Sandy, Loam, and Clay soils alongside legume nitrogen rotation.",
    steps: [
      { step: 1, title: "Measure Water Retained", description: "Water Retained = 100 mL Poured − Drained mL in beaker." },
      { step: 2, title: "Rotate Legumes & Deep Crops", description: "Legume root nodules rebuild nitrates used by maize." },
      { step: 3, title: "Guard Topsoil & Dry Grain", description: "Use contour ridges + mulch on slopes and <13% moisture before sealed storage." }
    ],
    takeaway: "Loam soil holds optimal water without choking roots; legume rotations restore nitrogen naturally.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sandy, loam, and clay water retention comparison and 3-year crop rotation">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">SOIL TEXTURE RETENTION &amp; NITROGEN-FIXING CROP ROTATION</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">100 mL WATER TEST: RETAINED vs DRAINED</text>
    <!-- Stacked bars for Sand, Loam, Clay (width 260px = 100 mL) -->
    <text x="20" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">Sandy (Leaches)</text>
    <rect x="20" y="72" width="47" height="24" fill="#10b981" />
    <rect x="67" y="72" width="213" height="24" fill="#38bdf8" />
    <text x="43" y="88" font-family="monospace" font-size="8.5" font-weight="800" fill="#0f172a" text-anchor="middle">18</text>
    <text x="173" y="88" font-family="monospace" font-size="9.5" font-weight="800" fill="#0f172a" text-anchor="middle">82 mL Drained Fast</text>

    <text x="20" y="122" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">Loam ★ (Optimal)</text>
    <rect x="20" y="130" width="140" height="24" fill="#10b981" />
    <rect x="160" y="130" width="120" height="24" fill="#38bdf8" />
    <text x="90" y="146" font-family="monospace" font-size="9.5" font-weight="800" fill="#0f172a" text-anchor="middle">54 mL Retained</text>
    <text x="220" y="146" font-family="monospace" font-size="9.5" font-weight="800" fill="#0f172a" text-anchor="middle">46 mL Out</text>

    <text x="20" y="180" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fda4af">Clay (Waterlogged)</text>
    <rect x="20" y="188" width="224" height="24" fill="#10b981" />
    <rect x="244" y="188" width="36" height="24" fill="#38bdf8" />
    <text x="132" y="204" font-family="monospace" font-size="9.5" font-weight="800" fill="#0f172a" text-anchor="middle">86 mL Trapped</text>
    <text x="262" y="204" font-family="monospace" font-size="8" font-weight="800" fill="#0f172a" text-anchor="middle">14</text>

    <text x="168" y="232" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1" text-anchor="middle">Loam = Sand + Silt + Clay + Organic Humus</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">CROP ROTATION &amp; CONSERVATION</text>
    <rect x="16" y="42" width="288" height="62" rx="8" fill="#0f172a" stroke="#10b981" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">3-YEAR PEST-BREAKING ROTATION</text>
    <text x="26" y="84" font-family="monospace" font-size="9.5" fill="#ecfdf5">Yr1 Yam (Deep) → Yr2 Maize → Yr3 Cowpea (+N)</text>
    <rect x="16" y="114" width="288" height="54" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="136" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">SLOPE PROTECTION</text>
    <text x="26" y="156" font-family="monospace" font-size="9.5" fill="#fde68a">Contour Ridges ACROSS hill + Grass Mulch</text>
    <rect x="16" y="178" width="288" height="52" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="160" y="199" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">SAFE POSTHARVEST STORAGE</text>
    <text x="160" y="218" font-family="monospace" font-size="9.5" fill="#ecfdf5" text-anchor="middle">Dry grain &lt; 13% moisture to stop aflatoxins</text>
  </g>
</svg>`
  },
  "vis-jss-scientific-method-lab": {
    id: "vis-jss-scientific-method-lab",
    skillId: "skill-jss-scientific-method-lab",
    unitId: "unit-p3-jss-scientific-method-lab",
    title: "Controlled Fair-Test Matrix, Meniscus Eye-Level & Zero Error",
    type: "process_diagram",
    caption: "Fair-test variable isolation (1 IV changed, DV measured, controls locked) alongside eye-level bottom meniscus reading and zero-offset subtraction.",
    steps: [
      { step: 1, title: "Isolate 1 Independent Variable", description: "Vary strictly 1 input (IV) while locking all other conditions identically." },
      { step: 2, title: "Align Eye With Meniscus", description: "Read the lowest center of water's concave curve horizontally." },
      { step: 3, title: "Subtract Zero Offset", description: "True value = Reading − Zero Error; 1 g/cm³ = 1,000 kg/m³." }
    ],
    takeaway: "Confounding two changed variables invalidates causal proof; always read meniscus flat at eye level.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scientific fair test variable rules and meniscus parallax reading">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">SCIENTIFIC METHOD: VARIABLE CONTROL &amp; PARALLAX PRECISION</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">EYE-LEVEL MENISCUS (ZERO PARALLAX)</text>
    <!-- Graduated cylinder -->
    <rect x="84" y="48" width="54" height="156" fill="#0f172a" stroke="#94a3b8" stroke-width="2" />
    <path d="M 86 112 Q 111 124 136 112 L 136 202 L 86 202 Z" fill="#38bdf8" fill-opacity="0.45" />
    <path d="M 86 112 Q 111 124 136 112" fill="none" stroke="#38bdf8" stroke-width="2.5" />
    <!-- Eye line -->
    <line x1="142" y1="118" x2="274" y2="118" stroke="#10b981" stroke-width="2" stroke-dasharray="5,3" />
    <circle cx="286" cy="118" r="7" fill="#10b981" />
    <text x="220" y="108" font-family="monospace" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">Eye Level ✓</text>
    <text x="220" y="72" font-family="monospace" font-size="9.5" fill="#f43f5e" text-anchor="middle">Too High = Parallax ✗</text>
    <text x="220" y="164" font-family="monospace" font-size="9.5" fill="#f43f5e" text-anchor="middle">Too Low = Parallax ✗</text>
    <text x="168" y="228" font-family="monospace" font-size="9.5" fill="#cbd5e1" text-anchor="middle">Read bottom of concave U-curve on flat bench</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">FAIR TEST &amp; SAFETY PROTOCOL</text>
    <rect x="16" y="42" width="288" height="58" rx="8" fill="#0f172a" stroke="#10b981" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">CONTROLLED EXPERIMENT RULE</text>
    <text x="26" y="84" font-family="monospace" font-size="9.5" fill="#ecfdf5">Change 1 IV (x-axis) | Measure DV (y) | Lock All Else</text>
    <rect x="16" y="110" width="288" height="56" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="132" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">ZERO OFFSET &amp; SI DENSITY</text>
    <text x="26" y="152" font-family="monospace" font-size="9.5" fill="#fde68a">True = Reading − ZeroErr | 1 g/cm³ = 1,000 kg/m³</text>
    <rect x="16" y="176" width="288" height="54" rx="8" fill="#450a0a" stroke="#f43f5e" />
    <text x="160" y="198" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fda4af" text-anchor="middle">EXOTHERMIC DILUTION SAFETY</text>
    <text x="160" y="216" font-family="monospace" font-size="9.5" fill="#ffe4e6" text-anchor="middle">Always add ACID slowly INTO COLD WATER!</text>
  </g>
</svg>`
  },
  "vis-jss-human-bio-nutrition": {
    id: "vis-jss-human-bio-nutrition",
    skillId: "skill-jss-human-bio-nutrition",
    unitId: "unit-p3-jss-human-bio-nutrition",
    title: "Digestive Enzyme Matrix & Four Biochemical Food Tests",
    type: "conceptual_diagram",
    caption: "Mapping amylase, protease, and bile-assisted lipase across pH optima alongside Iodine, Benedict's (+heat), Biuret, and Ethanol emulsion color shifts.",
    steps: [
      { step: 1, title: "Match Enzyme Lock & Key", description: "High heat permanently denatures the folded enzyme active site." },
      { step: 2, title: "Emulsify Before Lipase", description: "Bile salts physically split fat blobs so lipase works faster." },
      { step: 3, title: "Run Correct Indicator", description: "Heat Benedict's (brick-red); run Iodine & Biuret at room temperature." }
    ],
    takeaway: "Antibiotics disrupt bacterial cell walls only (never viruses); enzymes fail permanently once denatured by boiling.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Digestive enzyme substrate chart and biochemical food tests">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">FOOD BIOCHEMISTRY TESTS, ENZYMES &amp; IMMUNITY</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#a855f7" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#d8b4fe">FOUR STANDARD BIOCHEMICAL FOOD TESTS</text>
    <rect x="16" y="42" width="304" height="40" rx="6" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="66" font-family="monospace" font-size="10" font-weight="800" fill="#e0f2fe">STARCH   + Iodine       → Blue-Black</text>
    <rect x="16" y="90" width="304" height="40" rx="6" fill="#0f172a" stroke="#f43f5e" />
    <text x="26" y="114" font-family="monospace" font-size="10" font-weight="800" fill="#fda4af">GLUCOSE  + Benedict+80° → Brick-Red</text>
    <rect x="16" y="138" width="304" height="40" rx="6" fill="#0f172a" stroke="#a855f7" />
    <text x="26" y="162" font-family="monospace" font-size="10" font-weight="800" fill="#d8b4fe">PROTEIN  + Biuret       → Lilac-Purple</text>
    <rect x="16" y="186" width="304" height="44" rx="6" fill="#0f172a" stroke="#cbd5e1" />
    <text x="26" y="212" font-family="monospace" font-size="10" font-weight="800" fill="#f8fafc">LIPIDS   + Ethanol/H₂O  → Cloudy White</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">ENZYMES, BILE &amp; IMMUNE DEFENSE</text>
    <rect x="16" y="42" width="288" height="66" rx="8" fill="#0f172a" stroke="#10b981" />
    <text x="26" y="62" font-family="monospace" font-size="9.5" fill="#ecfdf5">Amylase:  Starch  → Maltose (pH ~7)</text>
    <text x="26" y="80" font-family="monospace" font-size="9.5" fill="#ecfdf5">Protease: Protein → Amino Acids</text>
    <text x="26" y="98" font-family="monospace" font-size="9.5" fill="#ecfdf5">Lipase:   Fat(+Bile) → Fatty Acid + Glycerol</text>
    <rect x="16" y="118" width="288" height="50" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="138" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#fbbf24">BOILING / EXTREME pH DENATURATION</text>
    <text x="26" y="156" font-family="monospace" font-size="9.5" fill="#fde68a">Active site permanently loses 3D lock-key shape</text>
    <rect x="16" y="178" width="288" height="52" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="160" y="199" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">PATHOGEN TARGETING</text>
    <text x="160" y="218" font-family="monospace" font-size="9.5" fill="#ecfdf5" text-anchor="middle">Antibiotics = Bacteria ONLY | Vaccines = Memory</text>
  </g>
</svg>`
  },
  "vis-jss-mixtures-chemical-change": {
    id: "vis-jss-mixtures-chemical-change",
    skillId: "skill-jss-mixtures-chemical-change",
    unitId: "unit-p3-jss-mixtures-chemical-change",
    title: "Paper Chromatography Rf Ratio & Physical Separation Selection",
    type: "process_diagram",
    caption: "Measuring dye spot migration relative to solvent front from a pencil baseline (Rf = d_dye / d_solvent ≤ 1) alongside funnel/distillation selection.",
    steps: [
      { step: 1, title: "Draw Pencil Baseline", description: "Graphite pencil does not dissolve or smear in chromatography solvent." },
      { step: 2, title: "Compute Rf ≤ 1.0", description: "Divide spot distance by solvent front distance from baseline." },
      { step: 3, title: "Match Apparatus to Mixture", description: "Insoluble→Filter; Immiscible→Separating Funnel; Miscible→Fractional Distillation." }
    ],
    takeaway: "Always separate dry magnetic iron before adding water, and never exceed Rf = 1.0.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Paper chromatography Rf calculation and separation apparatus guide">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">CHROMATOGRAPHY (Rf RATIO) &amp; SEPARATION APPARATUS</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">PAPER CHROMATOGRAM (PENCIL ORIGIN)</text>
    <!-- Strip -->
    <rect x="88" y="42" width="120" height="170" rx="4" fill="#f8fafc" stroke="#94a3b8" stroke-width="2" />
    <!-- Solvent front -->
    <line x1="88" y1="62" x2="208" y2="62" stroke="#38bdf8" stroke-width="2" stroke-dasharray="5,3" />
    <text x="216" y="66" font-family="monospace" font-size="9.5" font-weight="800" fill="#38bdf8">Front (12.0 cm)</text>
    <!-- Pencil baseline -->
    <line x1="88" y1="182" x2="208" y2="182" stroke="#475569" stroke-width="2" />
    <text x="216" y="186" font-family="monospace" font-size="9.5" font-weight="800" fill="#cbd5e1">Pencil Base (0)</text>
    <!-- Dye spot -->
    <circle cx="148" cy="104" r="8" fill="#f59e0b" stroke="#b45309" stroke-width="1.5" />
    <text x="216" y="108" font-family="monospace" font-size="9.5" font-weight="800" fill="#fbbf24">Spot (7.8 cm)</text>
    <text x="168" y="232" font-family="monospace" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">Rf = 7.8 / 12.0 = 0.65 (Always ≤ 1.0)</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">SEPARATION &amp; CONSERVATION RULES</text>
    <rect x="16" y="42" width="288" height="114" rx="8" fill="#0f172a" stroke="#10b981" />
    <text x="26" y="64" font-family="monospace" font-size="9.5" fill="#ecfdf5">• Magnet           → Iron + Sulfur (dry)</text>
    <text x="26" y="84" font-family="monospace" font-size="9.5" fill="#ecfdf5">• Filtration       → Insoluble Sand + Water</text>
    <text x="26" y="104" font-family="monospace" font-size="9.5" fill="#ecfdf5">• Separating Funnel→ Oil + Water layers</text>
    <text x="26" y="124" font-family="monospace" font-size="9.5" fill="#ecfdf5">• Simple Distil    → Pure Water from Brine</text>
    <text x="26" y="144" font-family="monospace" font-size="9.5" fill="#ecfdf5">• Fract. Distil    → Ethanol (78°C)+H₂O(100°C)</text>
    <rect x="16" y="168" width="288" height="62" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="160" y="190" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">SEALED MASS CONSERVATION</text>
    <text x="160" y="210" font-family="monospace" font-size="9.5" fill="#ecfdf5" text-anchor="middle">Total Sealed Mass Unchanged (2Mg + O₂ → 2MgO)</text>
  </g>
</svg>`
  },
  "vis-sss-em-induction-ac": {
    id: "vis-sss-em-induction-ac",
    skillId: "skill-sss-em-induction-ac",
    unitId: "unit-p3-sss-em-induction-ac",
    title: "Step-Up Grid Loss Reduction (I²R) & AC RLC Impedance Phasor",
    type: "coordinate_graph",
    caption: "Right-triangle AC impedance phasor Z = √(R² + (X_L − X_C)²) alongside transformer voltage step-up slashing transmission I²R waste 100×.",
    steps: [
      { step: 1, title: "Compute Grid Current First", description: "Evaluate I = P / V before calculating cable heating loss P_loss = I² R." },
      { step: 2, title: "Enforce Lenz Opposition", description: "Induced EMF opposes flux change (repels approaching N pole with N face)." },
      { step: 3, title: "Build RLC Impedance Triangle", description: "Subtract X_L − X_C vertically, apply Pythagoras with R, and dissipate real power only in R." }
    ],
    takeaway: "Stepping transmission voltage up 10× cuts cable current 10× and cable heat loss 100×; transformers require changing AC flux.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="RLC impedance triangle phasor and high-voltage grid I squared R loss reduction">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">FIELDS, FARADAY-LENZ, TRANSFORMERS &amp; AC IMPEDANCE</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">SERIES RLC IMPEDANCE PHASOR TRIANGLE</text>
    <polygon points="62,180 232,180 232,74" fill="#38bdf8" fill-opacity="0.16" stroke="#38bdf8" stroke-width="2.5" />
    <rect x="218" y="166" width="14" height="14" fill="none" stroke="#94a3b8" stroke-width="1.5" />
    <text x="147" y="198" font-family="monospace" font-size="11" font-weight="800" fill="#10b981" text-anchor="middle">R = 8 Ω</text>
    <text x="240" y="132" font-family="monospace" font-size="10.5" font-weight="800" fill="#fbbf24">X_L − X_C = 6 Ω</text>
    <text x="135" y="118" font-family="monospace" font-size="11" font-weight="800" fill="#38bdf8" text-anchor="end">Z = 10 Ω</text>
    <text x="96" y="172" font-family="monospace" font-size="10.5" font-weight="800" fill="#f8fafc">φ</text>
    <text x="168" y="226" font-family="monospace" font-size="9.5" fill="#cbd5e1" text-anchor="middle">Z = √(R² + (X_L − X_C)²) | P_real = I_rms² · R</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#f59e0b" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">TRANSFORMERS &amp; INDUCTION LAWS</text>
    <rect x="16" y="42" width="288" height="58" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">FARADAY-LENZ INDUCTION (AC ONLY)</text>
    <text x="26" y="84" font-family="monospace" font-size="9.5" fill="#fde68a">|ε| = N |ΔΦ/Δt| = B·L·v  (0 for steady DC!)</text>
    <rect x="16" y="110" width="288" height="58" rx="8" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="132" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8">IDEAL TRANSFORMER &amp; GRID LOSS</text>
    <text x="26" y="152" font-family="monospace" font-size="9.5" fill="#e0f2fe">V_s/V_p = N_s/N_p = I_p/I_s | Loss = I²R</text>
    <rect x="16" y="178" width="288" height="52" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="160" y="199" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">COULOMB &amp; GRAVITY INVERSE-SQUARE</text>
    <text x="160" y="218" font-family="monospace" font-size="9.5" fill="#ecfdf5" text-anchor="middle">2× Charge, 3× Distance ⇒ F' = F · (2 / 3²) = 2F/9</text>
  </g>
</svg>`
  },
  "vis-sss-acids-bases-ionic-eq": {
    id: "vis-sss-acids-bases-ionic-eq",
    skillId: "skill-sss-acids-bases-ionic-eq",
    unitId: "unit-p3-sss-acids-bases-ionic-eq",
    title: "Ionic Equilibrium Atlas: Kc Rules, Weak-Acid/Buffer pH & Ksp",
    type: "conceptual_diagram",
    caption: "Summary of heterogeneous Kc (omit solids), strong/weak/Henderson-Hasselbalch pH formulas, and Mg(OH)₂ Ksp = 4s³ precipitation thresholds.",
    steps: [
      { step: 1, title: "Omit Pure (s)/(l) From Kc", description: "Only temperature alters numerical equilibrium constants K." },
      { step: 2, title: "Select pH Equation", description: "Strong acid/base counts ion moles (2×OH⁻ for Ba(OH)₂); buffer uses pKa + log([A⁻]/[HA])." },
      { step: 3, title: "Dilute Before Qsp Check", description: "Halve concentrations on 1:1 volume mixing; precipitate if Qsp > Ksp." }
    ],
    takeaway: "Only temperature shifts K; equal conjugate acid/base concentrations lock buffer pH directly at pKa.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Equilibrium Kc, Henderson-Hasselbalch buffer, and Ksp solubility equations">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">CHEMICAL EQUILIBRIUM (Kc), BUFFERS &amp; SOLUBILITY Ksp</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">ACID-BASE &amp; BUFFER EQUILIBRIA (25°C)</text>
    <rect x="16" y="42" width="304" height="54" rx="8" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="62" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8">WATER ION PRODUCT &amp; STRONG BASE</text>
    <text x="26" y="82" font-family="monospace" font-size="9.5" fill="#e0f2fe">pH + pOH = 14 | Ba(OH)₂ ⇒ [OH⁻] = 2·M</text>
    <rect x="16" y="106" width="304" height="54" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="126" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">WEAK ACID IONIZATION</text>
    <text x="26" y="146" font-family="monospace" font-size="9.5" fill="#fde68a">[H⁺] ≈ √(Ka · C)   ⇒   pH = −log₁₀[H⁺]</text>
    <rect x="16" y="170" width="304" height="60" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="26" y="192" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">HENDERSON-HASSELBALCH BUFFER</text>
    <text x="26" y="214" font-family="monospace" font-size="9.5" fill="#ecfdf5">pH = pKa + log₁₀([A⁻]/[HA])  (1:1 ⇒ pH = pKa)</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#a855f7" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#d8b4fe">LE CHATELIER, Kc &amp; PRECIPITATION Ksp</text>
    <rect x="16" y="42" width="288" height="58" rx="8" fill="#0f172a" stroke="#a855f7" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#d8b4fe">HETEROGENEOUS EQUILIBRIUM</text>
    <text x="26" y="84" font-family="monospace" font-size="9.5" fill="#f3e8ff">Omit (s) &amp; (l): CaCO₃(s) ⇌ CaO + CO₂ ⇒ Kc=[CO₂]</text>
    <rect x="16" y="110" width="288" height="54" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="132" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">TEMPERATURE ONLY ALTERS Kc</text>
    <text x="26" y="150" font-family="monospace" font-size="9.5" fill="#fde68a">ΔH &lt; 0 cooled ⇒ Forward Shift AND Larger Kc</text>
    <rect x="16" y="174" width="288" height="56" rx="8" fill="#0f172a" stroke="#38bdf8" />
    <text x="26" y="196" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38bdf8">SOLUBILITY PRODUCT (Qsp &gt; Ksp ⇒ SOLID)</text>
    <text x="26" y="216" font-family="monospace" font-size="9.5" fill="#e0f2fe">AB: Ksp = s²  |  Mg(OH)₂: Ksp = s(2s)² = 4s³</text>
  </g>
</svg>`
  },
  "vis-sss-biology-reproduction": {
    id: "vis-sss-biology-reproduction",
    skillId: "skill-sss-biology-reproduction",
    unitId: "unit-p3-sss-biology-reproduction",
    title: "Menstrual Endocrine Loop (LH Day-14 Surge) & Plant Double Fertilization",
    type: "process_diagram",
    caption: "Coordinated 28-day menstrual feedback (FSH → Estrogen → LH ovulation → Progesterone) paired with angiosperm 2n zygote + 3n endosperm formation.",
    steps: [
      { step: 1, title: "Halve Chromosomes via Meiosis", description: "2n divides twice into four genetically varied haploid n gametes." },
      { step: 2, title: "Double-Fertilize Angiosperms", description: "Sperm 1 + Egg = 2n embryo (ovule → seed); Sperm 2 + 2 Polar = 3n endosperm." },
      { step: 3, title: "Follow Hormonal Feedback", description: "Estrogen builds lining & triggers Day-14 LH ovulation; Progesterone maintains lining." }
    ],
    takeaway: "Maternal and fetal blood stay strictly separate across the placenta; angiosperm endosperm is triploid (3n).",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Human menstrual hormone cascade and angiosperm double fertilization">
  <defs>
    <marker id="bioArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
    </marker>
  </defs>
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">REPRODUCTION: MENSTRUAL HORMONES &amp; DOUBLE FERTILIZATION</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#f43f5e" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fda4af">28-DAY MENSTRUAL ENDOCRINE CASCADE</text>
    <rect x="20" y="42" width="132" height="44" rx="6" fill="#0f172a" stroke="#38bdf8" />
    <text x="86" y="68" font-family="monospace" font-size="10" font-weight="800" fill="#38bdf8" text-anchor="middle">1. FSH (Pituitary)</text>
    <rect x="184" y="42" width="132" height="44" rx="6" fill="#0f172a" stroke="#a855f7" />
    <text x="250" y="68" font-family="monospace" font-size="10" font-weight="800" fill="#d8b4fe" text-anchor="middle">2. Estrogen (Repair)</text>
    <line x1="152" y1="64" x2="180" y2="64" stroke="#38bdf8" stroke-width="2" marker-end="url(#bioArr)" />

    <rect x="184" y="114" width="132" height="48" rx="6" fill="#450a0a" stroke="#f43f5e" />
    <text x="250" y="136" font-family="monospace" font-size="10" font-weight="800" fill="#fda4af" text-anchor="middle">3. LH SURGE ★</text>
    <text x="250" y="152" font-family="monospace" font-size="9" fill="#ffe4e6" text-anchor="middle">Ovulation (Day 14)</text>
    <line x1="250" y1="86" x2="250" y2="110" stroke="#38bdf8" stroke-width="2" marker-end="url(#bioArr)" />

    <rect x="20" y="114" width="132" height="48" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="86" y="136" font-family="monospace" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">4. Progesterone</text>
    <text x="86" y="152" font-family="monospace" font-size="9" fill="#ecfdf5" text-anchor="middle">Sustains Lining</text>
    <line x1="184" y1="138" x2="156" y2="138" stroke="#38bdf8" stroke-width="2" marker-end="url(#bioArr)" />

    <rect x="16" y="178" width="304" height="52" rx="8" fill="#0f172a" stroke="#475569" />
    <text x="168" y="199" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#fbbf24" text-anchor="middle">PLACENTAL EXCHANGE (NO BLOOD MIXING)</text>
    <text x="168" y="218" font-family="monospace" font-size="9.5" fill="#cbd5e1" text-anchor="middle">Thin capillary diffusion: O₂/nutrients in, urea/CO₂ out</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">MEIOSIS &amp; ANGIOSPERM DOUBLE FERTILIZATION</text>
    <rect x="16" y="42" width="288" height="58" rx="8" fill="#0f172a" stroke="#10b981" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">MITOSIS vs MEIOSIS</text>
    <text x="26" y="84" font-family="monospace" font-size="9.5" fill="#ecfdf5">Mitosis: 2n → 2×2n | Meiosis: 2n → 4×n (Varied)</text>
    <rect x="16" y="110" width="288" height="62" rx="8" fill="#0f172a" stroke="#f59e0b" />
    <text x="26" y="132" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">FLOWER DOUBLE FERTILIZATION</text>
    <text x="26" y="150" font-family="monospace" font-size="9.5" fill="#fde68a">Sperm(n) + Egg(n)      = 2n Zygote (Embryo)</text>
    <text x="26" y="166" font-family="monospace" font-size="9.5" fill="#fde68a">Sperm(n) + 2 Polar(2n) = 3n Endosperm</text>
    <rect x="16" y="182" width="288" height="48" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="160" y="210" font-family="monospace" font-size="10" font-weight="800" fill="#ecfdf5" text-anchor="middle">Ovule → Seed  |  Ovary Wall → Fruit</text>
  </g>
</svg>`
  }
};
