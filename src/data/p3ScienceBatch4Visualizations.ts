import { EducationalVisualization } from "../types/contentSaturation";

export const P3_SCIENCE_BATCH4_VISUALIZATIONS: Record<string, EducationalVisualization> = {
  "vis-pri-water-sanitation-health": {
    id: "vis-pri-water-sanitation-health",
    skillId: "skill-pri-water-sanitation-health",
    unitId: "unit-p3-pri-water-sanitation-health",
    title: "Multi-Barrier Water Purification & 30 m Downhill Latrine Siting",
    type: "conceptual_diagram",
    caption: "Sequential water treatment (alum flocculation → filtration → boiling/chlorination → covered tap) paired with safe >= 30 m downhill latrine siting.",
    steps: [
      { step: 1, title: "Clarify Mud First", description: "Alum and sand filtration strip suspended clay that would neutralize chlorine." },
      { step: 2, title: "Disinfect Pathogens", description: "Boil for >= 1 minute or dose 1 tablet per 20 L for 30 minutes to kill bacteria/viruses." },
      { step: 3, title: "Site Wells >= 30 m Uphill", description: "Keep pit latrines downhill and >= 30 m from boreholes." }
    ],
    takeaway: "Filtration removes visible mud; only boiling or measured chlorination kills invisible microbes.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Multi-barrier water purification steps and 30m downhill latrine siting">
  <defs>
    <marker id="washArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
    </marker>
  </defs>
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">MULTI-BARRIER POTABLE WATER &amp; 30 m DOWNHILL WASH SITING</text>
  <g transform="translate(24, 52)">
    <rect width="672" height="122" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="22" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">1. SEQUENTIAL WATER PURIFICATION BARRIERS</text>
    <rect x="20" y="38" width="136" height="66" rx="8" fill="#451a03" stroke="#f59e0b" />
    <text x="88" y="62" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#fde68a" text-anchor="middle">Alum + Settling</text>
    <text x="88" y="82" font-family="monospace" font-size="9" fill="#fef3c7" text-anchor="middle">Clumps clay flocs</text>
    <line x1="158" y1="71" x2="180" y2="71" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#washArr)" />
    <rect x="184" y="38" width="136" height="66" rx="8" fill="#0f172a" stroke="#94a3b8" />
    <text x="252" y="62" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#e2e8f0" text-anchor="middle">Sand Filtration</text>
    <text x="252" y="82" font-family="monospace" font-size="9" fill="#cbd5e1" text-anchor="middle">Removes silt ONLY</text>
    <line x1="322" y1="71" x2="344" y2="71" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#washArr)" />
    <rect x="348" y="38" width="144" height="66" rx="8" fill="#064e3b" stroke="#10b981" />
    <text x="420" y="62" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">Boil / Chlorine</text>
    <text x="420" y="82" font-family="monospace" font-size="9" fill="#ecfdf5" text-anchor="middle">1 tab / 20 L (30m)</text>
    <line x1="494" y1="71" x2="516" y2="71" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#washArr)" />
    <rect x="520" y="38" width="132" height="66" rx="8" fill="#0c4a6e" stroke="#38bdf8" />
    <text x="586" y="62" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#bae6fd" text-anchor="middle">Tap Storage</text>
    <text x="586" y="82" font-family="monospace" font-size="9" fill="#e0f2fe" text-anchor="middle">No dipped cups!</text>
  </g>
  <g transform="translate(24, 186)">
    <rect width="340" height="114" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="22" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">2. SAFE HYDROLOGICAL SITING</text>
    <path d="M 24 44 L 316 88" stroke="#64748b" stroke-width="3" />
    <rect x="36" y="32" width="54" height="22" rx="4" fill="#0284c7" />
    <text x="63" y="47" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">WELL</text>
    <rect x="242" y="64" width="60" height="22" rx="4" fill="#b45309" />
    <text x="272" y="79" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">LATRINE</text>
    <text x="170" y="102" font-family="monospace" font-size="10" font-weight="800" fill="#fde68a" text-anchor="middle">≥ 30 m apart &amp; Latrine DOWNHILL</text>
  </g>
  <g transform="translate(380, 186)">
    <rect width="316" height="114" rx="10" fill="#1e293b" stroke="#fbbf24" />
    <text x="16" y="22" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">3. EXACT ORS RATIO RULE</text>
    <text x="16" y="50" font-family="monospace" font-size="10.5" font-weight="800" fill="#f8fafc">1 Packet ORS + 1,000 mL Safe Water</text>
    <text x="16" y="72" font-family="system-ui, sans-serif" font-size="9.5" fill="#cbd5e1">Home mix: 6 tsp sugar + ½ tsp salt / 1 L</text>
    <text x="16" y="94" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#fda4af">Never mix in 500 mL (hypertonic risk!)</text>
  </g>
</svg>`
  },
  "vis-jss-ecology-biodiversity": {
    id: "vis-jss-ecology-biodiversity",
    skillId: "skill-jss-ecology-biodiversity",
    unitId: "unit-p3-jss-ecology-biodiversity",
    title: "10% Trophic Energy Pyramid vs Toxin Biomagnification & Quadrat Scaling",
    type: "conceptual_diagram",
    caption: "Energy shrinks 10× per trophic step (50,000 → 5,000 → 500 → 50 kJ) while persistent toxins biomagnify upward; quadrat sampling scales mean density to habitat area.",
    steps: [
      { step: 1, title: "Apply 10% Transfer", description: "Multiply previous level energy by 0.10 per step up." },
      { step: 2, title: "Contrast Biomagnification", description: "Fat-soluble mercury/DDT rises in concentration at top predators." },
      { step: 3, title: "Scale by Quadrat Area", description: "Divide total area by actual quadrat area (e.g., 0.5 m²), not 1 m² blindly." }
    ],
    takeaway: "Energy decreases upward (~90% lost as heat per step), whereas persistent toxins concentrate upward.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="10 percent ecological energy pyramid and quadrat population estimation formula">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">10% TROPHIC ENERGY PYRAMID &amp; QUADRAT SAMPLING MATH</text>
  <g transform="translate(24, 52)">
    <rect width="340" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">TROPHIC PYRAMID (10% PER LEVEL)</text>
    <polygon points="145,48 195,48 210,84 130,84" fill="#f43f5e" />
    <text x="170" y="70" font-family="monospace" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">L4: 50 kJ</text>
    <polygon points="122,88 218,88 238,124 102,124" fill="#f59e0b" />
    <text x="170" y="110" font-family="monospace" font-size="9.5" font-weight="800" fill="#0f172a" text-anchor="middle">L3 (2°): 500 kJ</text>
    <polygon points="94,128 246,128 270,164 70,164" fill="#38bdf8" />
    <text x="170" y="150" font-family="monospace" font-size="9.5" font-weight="800" fill="#0f172a" text-anchor="middle">L2 (1°): 5,000 kJ</text>
    <polygon points="62,168 278,168 306,206 34,206" fill="#10b981" />
    <text x="170" y="191" font-family="monospace" font-size="10" font-weight="800" fill="#0f172a" text-anchor="middle">L1 (Producers): 50,000 kJ</text>
    <text x="170" y="228" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#fda4af" text-anchor="middle">Energy ↓ upward | DDT / Hg ↑ upward (Biomagnifies)</text>
  </g>
  <g transform="translate(380, 52)">
    <rect width="316" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">QUADRAT &amp; CONSERVATION</text>
    <rect x="20" y="42" width="276" height="78" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="158" y="64" font-family="monospace" font-size="10" font-weight="800" fill="#fbbf24" text-anchor="middle">N = Mean_quad × (A_field / A_quad)</text>
    <text x="158" y="86" font-family="monospace" font-size="9.5" fill="#cbd5e1" text-anchor="middle">7 per 0.5m² × (200 / 0.5) = 2,800</text>
    <text x="158" y="106" font-family="system-ui, sans-serif" font-size="9" fill="#6ee7b7" text-anchor="middle">Convert to per-m² if quadrat ≠ 1 m²!</text>
    <rect x="20" y="132" width="276" height="94" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="30" y="154" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#6ee7b7">IN-SITU: Wild parks &amp; corridors</text>
    <text x="30" y="176" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#fde68a">EX-SITU: Seed vaults &amp; zoos</text>
    <text x="30" y="200" font-family="system-ui, sans-serif" font-size="9" fill="#ecfdf5">Biodiversity = Richness (count) + Evenness</text>
  </g>
</svg>`
  },
  "vis-jss-earth-rocks-hazards": {
    id: "vis-jss-earth-rocks-hazards",
    skillId: "skill-jss-earth-rocks-hazards",
    unitId: "unit-p3-jss-earth-rocks-hazards",
    title: "Rock Cycle Transformations & S – P Seismic Triangulation",
    type: "conceptual_diagram",
    caption: "Cooling rate dictates igneous crystal size, low-temperature burial preserves sedimentary fossils, solid-state pressure drives metamorphism, and S–P lag locates epicentres.",
    steps: [
      { step: 1, title: "Igneous Cooling Speed", description: "Intrusive magma cools slowly (coarse crystals); extrusive lava quenches fast (fine)." },
      { step: 2, title: "Sedimentary Preservation", description: "Cool burial + cementation preserves fossils and effervescent limestone." },
      { step: 3, title: "Seismic S–P Distance", description: "Solve d(1/v_S − 1/v_P) = Δt across 3 stations to pinpoint epicentre." }
    ],
    takeaway: "Metamorphism transforms rock in the solid state—complete melting restarts the igneous branch.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rock cycle transformations and S-P seismic wave lag diagram">
  <defs>
    <marker id="geoArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#fbbf24" />
    </marker>
  </defs>
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">ROCK CYCLE, MINERAL TESTS &amp; SEISMIC S–P TRIANGULATION</text>
  <g transform="translate(24, 52)">
    <rect width="340" height="244" rx="10" fill="#1e293b" stroke="#fbbf24" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">ROCK CYCLE DIAGNOSTIC MAP</text>
    <rect x="96" y="40" width="148" height="44" rx="8" fill="#7f1d1d" stroke="#f87171" />
    <text x="170" y="60" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#fecaca" text-anchor="middle">IGNEOUS (Melt Cool)</text>
    <text x="170" y="76" font-family="monospace" font-size="8.5" fill="#fee2e2" text-anchor="middle">Granite=coarse | Basalt=fine</text>
    <rect x="18" y="132" width="142" height="50" rx="8" fill="#0c4a6e" stroke="#38bdf8" />
    <text x="89" y="154" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#bae6fd" text-anchor="middle">SEDIMENTARY</text>
    <text x="89" y="170" font-family="monospace" font-size="8.5" fill="#e0f2fe" text-anchor="middle">Strata + Fossils + HCl fizz</text>
    <rect x="180" y="132" width="142" height="50" rx="8" fill="#3b0764" stroke="#c084fc" />
    <text x="251" y="154" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#e9d5ff" text-anchor="middle">METAMORPHIC</text>
    <text x="251" y="170" font-family="monospace" font-size="8.5" fill="#f3e8ff" text-anchor="middle">Solid-state Heat+Pressure</text>
    <line x1="112" y1="86" x2="88" y2="128" stroke="#fbbf24" stroke-width="2" marker-end="url(#geoArr)" />
    <line x1="164" y1="157" x2="176" y2="157" stroke="#fbbf24" stroke-width="2" marker-end="url(#geoArr)" />
    <line x1="246" y1="130" x2="226" y2="88" stroke="#fbbf24" stroke-width="2" marker-end="url(#geoArr)" />
    <text x="170" y="216" font-family="monospace" font-size="9.5" fill="#6ee7b7" text-anchor="middle">Pyrite: Mohs 6.5, dark streak ≠ Gold (2.5)</text>
  </g>
  <g transform="translate(380, 52)">
    <rect width="316" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">SEISMIC WAVES &amp; PLATE BOUNDARIES</text>
    <path d="M 24 84 L 58 84 L 64 72 L 70 96 L 76 76 L 82 88 L 160 84 L 168 50 L 176 118 L 184 54 L 192 114 L 200 84 L 290 84" fill="none" stroke="#38bdf8" stroke-width="2" />
    <text x="72" y="64" font-family="monospace" font-size="9" font-weight="800" fill="#6ee7b7" text-anchor="middle">P-wave</text>
    <text x="180" y="44" font-family="monospace" font-size="9" font-weight="800" fill="#f43f5e" text-anchor="middle">S-wave (Δt)</text>
    <rect x="18" y="132" width="280" height="94" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="158" y="154" font-family="monospace" font-size="9.5" font-weight="800" fill="#fbbf24" text-anchor="middle">d(1/v_S − 1/v_P) = Δt</text>
    <text x="158" y="176" font-family="monospace" font-size="9" fill="#cbd5e1" text-anchor="middle">d(1/4 − 1/6) = 15s ⇒ d = 180 km</text>
    <text x="158" y="200" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">Transform: Quakes only (no volcanoes)</text>
  </g>
</svg>`
  },
  "vis-jss-agric-ecology-records": {
    id: "vis-jss-agric-ecology-records",
    skillId: "skill-jss-agric-ecology-records",
    unitId: "unit-p3-jss-agric-ecology-records",
    title: "Hectare Plant-Stand Grid & Farm Gross Margin Ledger",
    type: "conceptual_diagram",
    caption: "Computing hectare stands (10,000 m² ÷ row × intra-row spacing) alongside Gross Margin vs Net Profit accounting and F₁ hybrid vigour.",
    steps: [
      { step: 1, title: "Multiply Spacing Dimensions", description: "Area per stand = inter-row (m) × intra-row (m)." },
      { step: 2, title: "Scale into 10,000 m²", description: "Divide 10,000 m² by stand area, then multiply by plants/stand." },
      { step: 3, title: "Separate Variable vs Fixed", description: "Gross Margin = Revenue − Variable Costs; deduct Fixed Costs for Net Profit." }
    ],
    takeaway: "Multiply row × intra-row spacing first, never add them; keep seasonal F₁ hybrid seed fresh each planting.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Plant stand spacing calculation and farm gross margin ledger">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">HECTARE PLANT STANDS (10,000 m²) &amp; FARM PROFIT LEDGERS</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">STANDS/HA = 10,000 ÷ (R × C)</text>
    <rect x="44" y="46" width="248" height="104" rx="6" fill="#064e3b" stroke="#10b981" stroke-dasharray="4 3" />
    <circle cx="84" cy="74" r="7" fill="#fbbf24" />
    <circle cx="168" cy="74" r="7" fill="#fbbf24" />
    <circle cx="252" cy="74" r="7" fill="#fbbf24" />
    <circle cx="84" cy="122" r="7" fill="#fbbf24" />
    <circle cx="168" cy="122" r="7" fill="#fbbf24" />
    <circle cx="252" cy="122" r="7" fill="#fbbf24" />
    <text x="126" y="66" font-family="monospace" font-size="9.5" font-weight="800" fill="#fde68a" text-anchor="middle">C = 0.5 m</text>
    <text x="58" y="102" font-family="monospace" font-size="9.5" font-weight="800" fill="#38bdf8">R=0.8m</text>
    <rect x="18" y="164" width="300" height="66" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="168" y="186" font-family="monospace" font-size="9.5" font-weight="700" fill="#f8fafc" text-anchor="middle">Area/stand = 0.8 × 0.5 = 0.40 m²</text>
    <text x="168" y="208" font-family="monospace" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">10,000 ÷ 0.40 = 25,000 stands/ha</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#fbbf24" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">LEDGER &amp; CROP IMPROVEMENT</text>
    <rect x="16" y="42" width="288" height="92" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="26" y="64" font-family="monospace" font-size="9.5" font-weight="800" fill="#38bdf8">Gross Margin = Sales − Variable</text>
    <text x="26" y="84" font-family="monospace" font-size="9.5" font-weight="800" fill="#6ee7b7">Net Profit   = Gross − Fixed</text>
    <text x="26" y="108" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1">Inventory = Tools/Stock | Diary = Daily Ops</text>
    <rect x="16" y="146" width="288" height="82" rx="6" fill="#1e1b4b" stroke="#818cf8" />
    <text x="26" y="168" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#c7d2fe">HYBRID VIGOUR (F₁ vs F₂)</text>
    <text x="26" y="190" font-family="system-ui, sans-serif" font-size="9" fill="#e0e7ff">F₁ Cross = Uniform peak yield</text>
    <text x="26" y="210" font-family="system-ui, sans-serif" font-size="9" fill="#fda4af">Saved F₂ segregates → lower yield</text>
  </g>
</svg>`
  },
  "vis-jss-soil-fertility-irrigation": {
    id: "vis-jss-soil-fertility-irrigation",
    skillId: "skill-jss-soil-fertility-irrigation",
    unitId: "unit-p3-jss-soil-fertility-irrigation",
    title: "NPK Grade Active-Ingredient Mass & Soil-Water Irrigation Thresholds",
    type: "bar_comparison",
    caption: "Translating NPK 20-10-10 bag percentages into kg active nutrients, diagnosing N/P/K leaf clues, and sizing gross pumped water by efficiency η.",
    steps: [
      { step: 1, title: "Compute Bag Active kg", description: "Multiply 50 kg bag by grade% ÷ 100 (e.g., 20% = 10 kg N)." },
      { step: 2, title: "Keep Roots in AWC Zone", description: "Irrigate between Permanent Wilting Point and Field Capacity." },
      { step: 3, title: "Divide by Efficiency η", description: "V_pumped = V_root ÷ η so drip (0.90) beats furrow (0.60)." }
    ],
    takeaway: "High-grade Urea (46% N) takes fewer bags per kg N than NPK 20-10-10; drip irrigation saves up to a third of pumped water.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="NPK 20-10-10 bag nutrient breakdown and irrigation efficiency formula">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">NPK FERTILIZER GRADE MATH &amp; IRRIGATION EFFICIENCY</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">50 kg NPK 20-10-10 BREAKDOWN</text>
    <rect x="20" y="48" width="60" height="34" fill="#10b981" />
    <rect x="80" y="48" width="30" height="34" fill="#38bdf8" />
    <rect x="110" y="48" width="30" height="34" fill="#fbbf24" />
    <rect x="140" y="48" width="176" height="34" fill="#475569" />
    <text x="50" y="69" font-family="monospace" font-size="9" font-weight="800" fill="#0f172a" text-anchor="middle">10kg N</text>
    <text x="95" y="69" font-family="monospace" font-size="8.5" font-weight="800" fill="#0f172a" text-anchor="middle">5P</text>
    <text x="125" y="69" font-family="monospace" font-size="8.5" font-weight="800" fill="#0f172a" text-anchor="middle">5K</text>
    <text x="228" y="69" font-family="monospace" font-size="9.5" font-weight="700" fill="#e2e8f0" text-anchor="middle">30 kg Carrier (60%)</text>
    <rect x="20" y="100" width="296" height="62" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="30" y="122" font-family="monospace" font-size="9.5" font-weight="800" fill="#fbbf24">Urea (46% N): 69 / 0.46 = 150 kg</text>
    <text x="30" y="144" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1">N↓: Old-leaf yellow | P↓: Purple | K↓: Scorched edge</text>
    <text x="168" y="198" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#fda4af" text-anchor="middle">Above Field Capacity = Root O₂ Suffocation</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">GROSS PUMPED VOLUME (2,400 m³ NET)</text>
    <text x="20" y="66" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#fde68a">Furrow (60%): 4,000 m³</text>
    <rect x="176" y="52" width="128" height="20" rx="4" fill="#f59e0b" />
    <text x="20" y="106" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#38bdf8">Sprinkler (75%): 3,200 m³</text>
    <rect x="176" y="92" width="102" height="20" rx="4" fill="#38bdf8" />
    <text x="20" y="146" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#6ee7b7">Drip (90%): 2,667 m³</text>
    <rect x="176" y="132" width="85" height="20" rx="4" fill="#10b981" />
    <rect x="20" y="174" width="280" height="52" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="160" y="196" font-family="monospace" font-size="10" font-weight="800" fill="#6ee7b7" text-anchor="middle">V_pumped = V_root ÷ η</text>
    <text x="160" y="214" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1" text-anchor="middle">Always DIVIDE by η (&lt; 1), never multiply!</text>
  </g>
</svg>`
  },
  "vis-sss-physics-practicals-uncertainty": {
    id: "vis-sss-physics-practicals-uncertainty",
    skillId: "skill-sss-physics-practicals-uncertainty",
    unitId: "unit-p3-sss-physics-practical-measurement-graphs",
    title: "Micrometer Zero-Error Correction, Pendulum T² Linearisation & Error Propagation",
    type: "coordinate_graph",
    caption: "Signed zero-error rules on precision gauges, extracting g = 4π²/slope from T² vs L best-fit line triangles, and exponent-weighted % uncertainty sums.",
    steps: [
      { step: 1, title: "Apply Signed Zero Error", description: "Corrected = Observed − (±e₀); negative error adds magnitude." },
      { step: 2, title: "Use Large Line Triangle", description: "Span >= 60% of the best-fit line on T² vs L to minimize slope error." },
      { step: 3, title: "Sum % Errors Strictly", description: "Multiply each fractional error by |exponent| and ALWAYS ADD." }
    ],
    takeaway: "Timing 20 continuous oscillations shrinks timing reaction error by 20×; division terms still add percentage errors.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pendulum T-squared vs L linearisation graph and error propagation rules">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">PRACTICAL PHYSICS: LINEARISED GRAPHS &amp; ERROR PROPAGATION</text>
  <g transform="translate(24, 52)">
    <rect width="340" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">LINEARISED T² vs L (SLOPE = 4π² / g)</text>
    <line x1="56" y1="204" x2="310" y2="204" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="56" y1="204" x2="56" y2="44" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="56" y1="204" x2="296" y2="54" stroke="#38bdf8" stroke-width="2.5" />
    <polygon points="96,179 256,179 256,79" fill="none" stroke="#10b981" stroke-dasharray="5 4" stroke-width="2" />
    <text x="176" y="196" font-family="monospace" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">ΔL = 1.00 m (Large Δ)</text>
    <text x="262" y="132" font-family="monospace" font-size="9.5" font-weight="800" fill="#6ee7b7">ΔT²=4.00 s²</text>
    <text x="28" y="118" font-family="monospace" font-size="10" font-weight="800" fill="#e2e8f0" text-anchor="middle">T²</text>
    <text x="296" y="224" font-family="monospace" font-size="10" font-weight="800" fill="#e2e8f0">L(m)</text>
    <text x="175" y="232" font-family="monospace" font-size="9.5" font-weight="800" fill="#fbbf24" text-anchor="middle">g = 4π² / 4.00 = 9.87 m/s²</text>
  </g>
  <g transform="translate(380, 52)">
    <rect width="316" height="244" rx="10" fill="#1e293b" stroke="#fbbf24" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">ZERO ERROR &amp; UNCERTAINTY LAWS</text>
    <rect x="18" y="42" width="280" height="84" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="28" y="64" font-family="monospace" font-size="9.5" font-weight="800" fill="#38bdf8">Corrected = Observed − (±e₀)</text>
    <text x="28" y="84" font-family="monospace" font-size="9" fill="#cbd5e1">Obs 6.69 mm, e₀ = −0.03 mm ⇒ 6.72 mm</text>
    <text x="28" y="106" font-family="system-ui, sans-serif" font-size="9" fill="#6ee7b7">Time 20T once ⇒ ΔT drops 20×</text>
    <rect x="18" y="138" width="280" height="88" rx="6" fill="#4c0519" stroke="#f43f5e" />
    <text x="28" y="160" font-family="monospace" font-size="9.5" font-weight="800" fill="#fecdd3">%Δ(L / T²) = %ΔL + 2(%ΔT)</text>
    <text x="28" y="182" font-family="monospace" font-size="9" fill="#ffe4e6">1.0% + 2(2.0%) = 5.0% total</text>
    <text x="28" y="206" font-family="system-ui, sans-serif" font-size="9" fill="#fda4af">Never subtract % uncertainties!</text>
  </g>
</svg>`
  },
  "vis-sss-chem-electrochem-kinetics": {
    id: "vis-sss-chem-electrochem-kinetics",
    skillId: "skill-sss-chem-electrochem-kinetics",
    unitId: "unit-p3-sss-chem-electrochem-kinetics",
    title: "Galvanic E°_cell, Faraday Mole Bookkeeping & Bond Enthalpy Cycle",
    type: "chemistry_structure",
    caption: "Computing unscaled galvanic E°_cell = E°_cathode − E°_anode, Faraday's Q = It = n·z·F mass calculation, and Hess ΔH = ΣE(broken) − ΣE(formed).",
    steps: [
      { step: 1, title: "Identify Cathode vs Anode", description: "Higher (more positive) E° reduces at cathode; E°_cell stays unscaled." },
      { step: 2, title: "Convert Charge to Moles e⁻", description: "n_e = (I × t) / 96,500, then divide by ion valency z." },
      { step: 3, title: "Apply Hess Bond Balance", description: "ΔH = ΣBonds Broken − ΣBonds Formed." }
    ],
    takeaway: "1 Faraday (96,500 C) carries 1 mole of electrons; divide by ion charge z before multiplying molar mass.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Galvanic cell EMF, Faraday electrolysis law, and bond enthalpy summary">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">ELECTROCHEMISTRY, FARADAY'S LAW &amp; HESS ENERGETICS</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">GALVANIC CELL &amp; FARADAY</text>
    <rect x="18" y="42" width="300" height="82" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="28" y="64" font-family="monospace" font-size="10" font-weight="800" fill="#fbbf24">E°_cell = E°_cathode − E°_anode</text>
    <text x="28" y="86" font-family="monospace" font-size="9.5" fill="#cbd5e1">+0.80 − (−2.37) = +3.17 V (No ×2!)</text>
    <text x="28" y="108" font-family="system-ui, sans-serif" font-size="9" fill="#6ee7b7">Anode = Oxidation | Cathode = Reduction</text>
    <rect x="18" y="136" width="300" height="92" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="28" y="158" font-family="monospace" font-size="10" font-weight="800" fill="#6ee7b7">m = (M · I · t) / (z · 96,500)</text>
    <text x="28" y="180" font-family="monospace" font-size="9" fill="#ecfdf5">Mg²⁺(z=2): 9,650 C = 0.05 mol = 1.2 g</text>
    <text x="28" y="204" font-family="system-ui, sans-serif" font-size="9" fill="#fde68a">Series cells share identical moles e⁻!</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#fbbf24" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">RATE ORDERS &amp; BOND ENTHALPY</text>
    <rect x="16" y="42" width="288" height="82" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="26" y="64" font-family="monospace" font-size="9.5" font-weight="800" fill="#38bdf8">Rate = k[X]²[Y] (Experimental!)</text>
    <text x="26" y="86" font-family="monospace" font-size="9" fill="#cbd5e1">2×[X] and 0.5×[Y] ⇒ (2)²(0.5) = 2× Rate</text>
    <text x="26" y="108" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8">Orders come ONLY from rate tables</text>
    <rect x="16" y="136" width="288" height="92" rx="6" fill="#451a03" stroke="#f59e0b" />
    <text x="26" y="158" font-family="monospace" font-size="10" font-weight="800" fill="#fde68a">ΔH = ΣE(Broken) − ΣE(Formed)</text>
    <text x="26" y="182" font-family="monospace" font-size="9.5" fill="#fef3c7">(436 + 242) − 2(431) = −184 kJ/mol</text>
    <text x="26" y="206" font-family="system-ui, sans-serif" font-size="9" fill="#6ee7b7">Catalyst lowers E_a, leaves ΔH unchanged</text>
  </g>
</svg>`
  },
  "vis-sss-chem-qualitative-volumetric": {
    id: "vis-sss-chem-qualitative-volumetric",
    skillId: "skill-sss-chem-qualitative-volumetric",
    unitId: "unit-p3-sss-chem-qualitative-volumetric",
    title: "Cation Excess-Reagent Decision Tree & Back-Titration Stoichiometry",
    type: "comparison_table",
    caption: "Distinguishing Zn²⁺, Al³⁺, Pb²⁺, Ca²⁺, Cu²⁺, Fe²⁺, Fe³⁺ across excess NaOH vs excess NH₃ and avoiding false-positive anion acidification errors.",
    steps: [
      { step: 1, title: "Test Excess NaOH(aq)", description: "Zn²⁺, Al³⁺, Pb²⁺ dissolve; Ca²⁺ stays white; Cu blue; Fe²⁺/Fe³⁺ green/brown." },
      { step: 2, title: "Test Excess NH₃(aq)", description: "Only Zn²⁺ dissolves colourless; Cu²⁺ dissolves deep royal blue." },
      { step: 3, title: "Acidify Anions Correctly", description: "HNO₃ before AgNO₃ (halides); HCl before BaCl₂ (sulfate)." }
    ],
    takeaway: "Use HNO₃—never HCl—before AgNO₃, and exclude rough titres outside ±0.20 cm³.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cation diagnostic table for excess NaOH and NH3 and volumetric rules">
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">QUALITATIVE SALT DIAGNOSTICS &amp; VOLUMETRIC TITRATION</text>
  <g transform="translate(24, 52)">
    <rect width="380" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">CATION EXCESS-REAGENT MATRIX</text>
    <text x="20" y="48" font-family="monospace" font-size="9.5" font-weight="800" fill="#fbbf24">Ion   | Drop/Excess NaOH | Excess NH₃</text>
    <line x1="16" y1="56" x2="364" y2="56" stroke="#475569" />
    <text x="20" y="76" font-family="monospace" font-size="9.5" fill="#6ee7b7">Zn²⁺  | White → Soluble  | Soluble (Clear)</text>
    <text x="20" y="100" font-family="monospace" font-size="9.5" fill="#e2e8f0">Al³⁺  | White → Soluble  | White Insoluble</text>
    <text x="20" y="124" font-family="monospace" font-size="9.5" fill="#fde68a">Pb²⁺  | White → Soluble  | Insoluble (+KI Yellow)</text>
    <text x="20" y="148" font-family="monospace" font-size="9.5" fill="#cbd5e1">Ca²⁺  | White Insoluble  | No Precipitate</text>
    <text x="20" y="172" font-family="monospace" font-size="9.5" fill="#38bdf8">Cu²⁺  | Blue Insoluble   | Deep Royal Blue Soln</text>
    <text x="20" y="196" font-family="monospace" font-size="9.5" fill="#a7f3d0">Fe²⁺  | Dirty Green Ppt  | Dirty Green Ppt</text>
    <text x="20" y="220" font-family="monospace" font-size="9.5" fill="#fdba74">Fe³⁺  | Red-Brown Ppt    | Red-Brown Ppt</text>
  </g>
  <g transform="translate(420, 52)">
    <rect width="276" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">ANIONS &amp; BACK-TITRATION</text>
    <rect x="16" y="42" width="244" height="86" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#fbbf24">Halides: HNO₃ + AgNO₃ (NOT HCl!)</text>
    <text x="26" y="84" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#38bdf8">Sulfate: HCl + BaCl₂ → White ppt</text>
    <text x="26" y="106" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1">Exclude Rough titre; average ±0.20 cm³</text>
    <rect x="16" y="140" width="244" height="88" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="26" y="162" font-family="monospace" font-size="9.5" font-weight="800" fill="#6ee7b7">C_A·V_A / n_A = C_B·V_B / n_B</text>
    <text x="26" y="184" font-family="monospace" font-size="9" fill="#ecfdf5">Back-Titration:</text>
    <text x="26" y="204" font-family="monospace" font-size="9" fill="#fde68a">n_reacted = n_initial − n_excess</text>
  </g>
</svg>`
  },
  "vis-sss-bio-homeostasis-immunity": {
    id: "vis-sss-bio-homeostasis-immunity",
    skillId: "skill-sss-bio-homeostasis-immunity",
    unitId: "unit-p3-sss-bio-homeostasis-immunity",
    title: "Negative Feedback Homeostasis, ADH Loop & Primary/Secondary Immunity",
    type: "biology_process",
    caption: "Comparing hypothalamic ADH collecting-duct water control against primary vs secondary clonal memory-cell antibody kinetics.",
    steps: [
      { step: 1, title: "Negative Feedback", description: "Rising body heat triggers arteriole vasodilation (not vessel movement) and sweating." },
      { step: 2, title: "Dehydration Raises ADH", description: "More ADH opens collecting-duct aquaporins → small, concentrated urine." },
      { step: 3, title: "Memory B-Cell Surge", description: "Secondary exposure triggers rapid exponential IgG production vs temporary passive serum." }
    ],
    takeaway: "Active vaccination produces memory cells for lifelong secondary surges; passive serum acts immediately without memory.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Homeostasis ADH feedback loop and primary vs secondary immune antibody curve">
  <defs>
    <marker id="immArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
    </marker>
  </defs>
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">HOMEOSTASIS (ADH / INSULIN) &amp; SECONDARY IMMUNE MEMORY</text>
  <g transform="translate(24, 52)">
    <rect width="336" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">PRIMARY vs SECONDARY ANTIBODIES</text>
    <line x1="48" y1="196" x2="310" y2="196" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="48" y1="196" x2="48" y2="48" stroke="#94a3b8" stroke-width="1.5" />
    <path d="M 48 194 L 78 194 Q 108 148 134 176 Q 168 186 196 186 Q 214 52 246 74 Q 276 96 306 112" fill="none" stroke="#38bdf8" stroke-width="2.5" />
    <text x="108" y="138" font-family="monospace" font-size="9" font-weight="800" fill="#fde68a" text-anchor="middle">1° Lag (Slow)</text>
    <text x="244" y="46" font-family="monospace" font-size="9.5" font-weight="800" fill="#6ee7b7" text-anchor="middle">2° Memory Surge (10×)</text>
    <text x="64" y="216" font-family="monospace" font-size="8.5" fill="#cbd5e1">Dose 1</text>
    <text x="196" y="216" font-family="monospace" font-size="8.5" fill="#fbbf24" text-anchor="middle">Booster</text>
    <text x="176" y="232" font-family="system-ui, sans-serif" font-size="9" fill="#fda4af" text-anchor="middle">Passive antivenom = Instant, NO memory</text>
  </g>
  <g transform="translate(376, 52)">
    <rect width="320" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">NEGATIVE FEEDBACK CONTROLS</text>
    <rect x="16" y="42" width="288" height="60" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="26" y="64" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#fbbf24">Dehydration → ↑ADH → Collecting Duct</text>
    <text x="26" y="86" font-family="system-ui, sans-serif" font-size="9" fill="#cbd5e1">↑Water reabsorbed → Small concentrated urine</text>
    <rect x="16" y="112" width="288" height="54" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="26" y="134" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7">PCT = 100% Glucose Reabsorption</text>
    <text x="26" y="152" font-family="system-ui, sans-serif" font-size="9" fill="#ecfdf5">Type 2 = Target receptor insulin resistance</text>
    <rect x="16" y="176" width="288" height="52" rx="6" fill="#4c0519" stroke="#f43f5e" />
    <text x="26" y="198" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#fecdd3">Skin Arterioles DILATE (Vasodilation)</text>
    <text x="26" y="216" font-family="system-ui, sans-serif" font-size="9" fill="#ffe4e6">Vessels widen—never migrate physically!</text>
  </g>
</svg>`
  },
  "vis-sss-bio-molecular-genetics-biotech": {
    id: "vis-sss-bio-molecular-genetics-biotech",
    skillId: "skill-sss-bio-molecular-genetics-biotech",
    unitId: "unit-p3-sss-bio-molecular-genetics-biotech",
    title: "Central Dogma (DNA → mRNA → Protein), PCR (2ⁿ) & Recombinant Plasmid",
    type: "biology_process",
    caption: "Complementary transcription (U replacing T in mRNA), frameshift vs wobble mutation contrast, exponential PCR (N₀×2ⁿ), and sticky-end recombinant DNA ligation.",
    steps: [
      { step: 1, title: "Chargaff Rule", description: "In dsDNA, %A = %T and %G = %C summing to 100%." },
      { step: 2, title: "Transcribe With Uracil", description: "Replace Thymine (T) with Uracil (U) in every mRNA transcript." },
      { step: 3, title: "Clone With Matching Cuts", description: "Cut vector & gene with SAME restriction enzyme, seal with DNA ligase." }
    ],
    takeaway: "PCR doubles copies every cycle (N₀ × 2ⁿ); 1-base indels shift reading frames while 3rd-base degeneracy can stay silent.",
    diagramSvgSnippet: `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="DNA to mRNA transcription, PCR exponential curve, and recombinant plasmid cloning">
  <defs>
    <marker id="dnaArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
    </marker>
  </defs>
  <rect width="720" height="320" rx="14" fill="#0f172a" />
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">MOLECULAR GENETICS: CENTRAL DOGMA, PCR &amp; PLASMID CLONING</text>
  <g transform="translate(24, 52)">
    <rect width="340" height="244" rx="10" fill="#1e293b" stroke="#38bdf8" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#38bdf8">TRANSCRIPTION &amp; CHARGAFF RULE</text>
    <rect x="16" y="42" width="308" height="86" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="26" y="64" font-family="monospace" font-size="9.5" font-weight="800" fill="#fbbf24">DNA 3'-TAC GGA TTC-5'</text>
    <line x1="170" y1="70" x2="170" y2="88" stroke="#38bdf8" stroke-width="2" marker-end="url(#dnaArr)" />
    <text x="26" y="106" font-family="monospace" font-size="9.5" font-weight="800" fill="#6ee7b7">mRNA 5'-AUG CCU AAG-3' (NO T!)</text>
    <rect x="16" y="140" width="308" height="88" rx="6" fill="#1e1b4b" stroke="#818cf8" />
    <text x="26" y="162" font-family="monospace" font-size="9.5" font-weight="800" fill="#c7d2fe">%G = 31% ⇒ %C = 31%, %A = %T = 19%</text>
    <text x="26" y="184" font-family="system-ui, sans-serif" font-size="9" fill="#e0e7ff">1-base deletion = Frameshift scramble</text>
    <text x="26" y="206" font-family="system-ui, sans-serif" font-size="9" fill="#6ee7b7">3rd-base wobble substitution = Silent</text>
  </g>
  <g transform="translate(380, 52)">
    <rect width="316" height="244" rx="10" fill="#1e293b" stroke="#10b981" />
    <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#6ee7b7">PCR AMPLIFICATION &amp; PLASMID</text>
    <rect x="16" y="42" width="284" height="80" rx="6" fill="#0f172a" stroke="#475569" />
    <text x="26" y="64" font-family="monospace" font-size="10" font-weight="800" fill="#fbbf24">PCR: N = N₀ × 2ⁿ (Taq Pol)</text>
    <text x="26" y="86" font-family="monospace" font-size="9.5" fill="#cbd5e1">3 copies, 6 cycles ⇒ 3 × 64 = 192</text>
    <text x="26" y="106" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8">95°C Denature → 55°C Anneal → 72°C Ext</text>
    <rect x="16" y="134" width="284" height="94" rx="6" fill="#064e3b" stroke="#10b981" />
    <text x="26" y="156" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#6ee7b7">RECOMBINANT INSULIN CLONING</text>
    <text x="26" y="178" font-family="system-ui, sans-serif" font-size="9" fill="#ecfdf5">1. Cut vector + cDNA w/ SAME enzyme</text>
    <text x="26" y="198" font-family="system-ui, sans-serif" font-size="9" fill="#ecfdf5">2. Seal sticky ends w/ DNA Ligase</text>
    <text x="26" y="216" font-family="system-ui, sans-serif" font-size="8.5" fill="#fde68a">Bioethics: Consent + Biosafety containment</text>
  </g>
</svg>`
  }
};
