import { Unit } from "../types/curriculum";

export const P3_SCIENCE_BATCH4_UNITS_A: Unit[] = [
  // =========================================================================
  // 1. pri_177_water_sanitation_community_health
  // =========================================================================
  {
    id: "unit-p3-pri-water-sanitation-health",
    subjectId: "pri_177_water_sanitation_community_health",
    level: "upper_primary",
    title: "Water Treatment, WASH Sanitation & Community Disease Prevention",
    code: "PRI-WASH-177",
    description:
      "Master potable water treatment stages (coagulation, sedimentation, filtration, chlorination/boiling), safe borehole-latrine siting distances, and oral rehydration solution (ORS) preparation.",
    order: 2,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:PRI5-PHE-WASH-01",
      "COMMON_ENTRANCE:SCI-WASH-177",
      "WHO_WASH:SCHOOL-HYGIENE-01"
    ],
    skills: [
      {
        id: "skill-pri-water-sanitation-health",
        unitId: "unit-p3-pri-water-sanitation-health",
        title: "Potable Water Purification, Sanitation Barriers & ORS Therapy",
        code: "SKL-PRI-WASH-177",
        summary:
          "Sequence the four stages of municipal and household water purification, calculate chlorine dosing and ORS ratios, and eliminate faecal-oral F-diagram transmission pathways.",
        objectives: [
          "Explain why filtration clears turbidity while boiling or chlorination is required to kill microscopic pathogens",
          "Apply the WHO 30-metre minimum separation rule and uphill siting between boreholes and pit latrines",
          "Calculate safe household chlorine dosing and exact 1-litre Oral Rehydration Solution (ORS) proportions"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-science-living", "skill-pri-env-pollution-3rs"],
        lesson: {
          id: "les-pri-water-sanitation-health",
          title: "Water Purification, Safe Sanitation & Community Hygiene",
          hookAndIntuition:
            "Clear water in a glass can still harbour millions of invisible cholera or typhoid bacteria—true safety demands removing both suspended mud AND living pathogens.",
          conceptualExplanation:
            "Community water safety rests on two linked pillars: (1) turning raw river or well water into POTABLE (safe-to-drink) water through sequential barriers, and (2) breaking the '5 Fs' faecal-oral route (Fluids, Fingers, Flies, Fields, Food).\n\nMunicipal and household purification follows four ordered steps:\n1. COAGULATION & SEDIMENTATION: Adding alum causes fine clay particles to clump into heavy flocs that sink to the bottom.\n2. FILTRATION: Passing clear top water through sand, gravel, and charcoal traps suspended silt and parasite eggs—but microscopic bacteria and viruses still pass through sand pores!\n3. DISINFECTION (Boiling at 100 °C for >= 1 minute, or adding measured chlorine / WaterGuard, or SODIS UV): Kills living pathogens and leaves protective residual protection.\n4. SAFE STORAGE: Keeping treated water in narrow-necked covered containers with taps rather than dipping shared cups.\n\nFor sanitation engineering, pit latrines must be placed AT LEAST 30 METRES away and DOWNHILL from any borehole or well so groundwater seepage never contaminates drinking supplies. When diarrhoeal illness occurs, Oral Rehydration Solution (ORS) restores lost sodium and glucose through intestinal co-transport: dissolve 1 standard WHO ORS sachet in 1 litre (1,000 mL) of boiled or chlorinated water—never concentrated in half a litre, which causes dangerous hypernatremia.",
          conceptualModel:
            "Turbid Water → Alum Clumping + Settling → Sand/Charcoal Filter (removes solids) → Boil / Chlorine (kills germs) → Covered Tap Storage.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Filtration vs Disinfection",
              definition: "Filtration removes visible suspended solids and turbidity; disinfection (boiling/chlorine) destroys invisible bacteria, viruses, and protozoa.",
              practicalExample: "Crystal-clear filtered spring water must still be boiled or chlorinated before drinking during flood outbreaks."
            },
            {
              termOrSymbol: "30 m Downhill Siting Rule",
              definition: "Pit latrines and septic soakaways must sit >= 30 m away and lower in elevation than drinking-water wells.",
              practicalExample: "If a well sits at 120 m elevation and a latrine sits 10 m uphill at 124 m, rainwater leaches sewage straight into the well."
            },
            {
              termOrSymbol: "ORS Rehydration Ratio",
              definition: "Dissolve 1 standard ORS packet strictly in 1,000 mL (1 L) clean water; home emergency mix = 6 level teaspoons sugar + 1/2 level teaspoon salt in 1 L clean water.",
              practicalExample: "Making ORS with 2 L instead of 1 L makes it too weak; making it with 0.5 L draws water out of body cells."
            }
          ],
          workedExamples: [
            {
              title: "Household Chlorination Dosing for Flood-Emergency Jerrycans",
              problemStatement: "A clinic guideline states that 1 standard chlorine tablet (aquatab) purifies 20 litres of clear filtered water after a 30-minute contact wait. How many tablets are needed for three 20-litre jerrycans and one 40-litre drum, and why must muddy water be settled/filtered first?",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute total water volume across all containers.",
                  reasoning: "Total volume = (3 × 20 L) + 40 L = 60 L + 40 L = 100 litres."
                },
                {
                  stepNumber: 2,
                  instruction: "Divide total volume by 20 litres per tablet.",
                  reasoning: "100 L ÷ 20 L/tablet = 5 tablets total (1 per 20-L jerrycan, 2 in the 40-L drum)."
                },
                {
                  stepNumber: 3,
                  instruction: "Explain why muddy water must be filtered before chlorination.",
                  reasoning: "Organic mud reacts with and consumes active chlorine, leaving too little residual chlorine to kill bacteria."
                },
                {
                  stepNumber: 4,
                  instruction: "Verify safe waiting period before drinking.",
                  reasoning: "Wait the full 30 minutes after mixing in covered containers so pathogens are completely inactivated."
                }
              ],
              takeawayRule: "Always clarify turbid water before chlorinating, dose strictly by volume, and allow full 30-minute contact time."
            },
            {
              title: "Diagnosing Borehole Contamination & Breaking the 5-F Pathway",
              problemStatement: "A school borehole 14 metres downhill from a leaking septic tank tests positive for faecal coliforms despite clear water. Identify the dual engineering and hygiene fixes.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compare the borehole siting against the 30 m downhill standard.",
                  reasoning: "14 m violates the >= 30 m buffer AND being downhill causes gravity-driven sewage infiltration."
                },
                {
                  stepNumber: 2,
                  instruction: "Specify the structural sanitation remediation.",
                  reasoning: "Decommission the leaking pit/septic or relocate new boreholes >= 30 m uphill with concrete apron lining and drainage."
                },
                {
                  stepNumber: 3,
                  instruction: "Provide immediate interim drinking-water safety.",
                  reasoning: "Filter and chlorinate or boil all school water to 100 °C before filling covered tap dispensers."
                },
                {
                  stepNumber: 4,
                  instruction: "Reinforce handwashing barriers at critical times.",
                  reasoning: "Install soap + running-water tippy-taps outside latrines to block the 'Fingers' and 'Food' routes."
                }
              ],
              takeawayRule: "Clear water is not automatically safe water; enforce >= 30 m uphill well siting plus disinfection and soap handwashing."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Believing a cloth or sand filter alone makes river water completely safe to drink.",
              whyItIsWrong: "Bacteria (0.5–2 micrometres) and viruses are far smaller than pores between sand grains or cloth fibres.",
              correctCorrection: "Filtration removes turbidity and guinea-worm/helminth larvae, then boiling or chlorination kills microscopic microbes."
            },
            {
              misconception: "Mixing an ORS sachet in less water (e.g., 500 mL) to make it 'stronger and faster'.",
              whyItIsWrong: "Double-strength salt solution pulls water out of intestinal cells by osmosis and worsens dehydration.",
              correctCorrection: "Always measure exactly 1 litre (1,000 mL) of safe water per standard ORS packet."
            }
          ],
          guidedPracticePrompt: "List the 4 stages of water purification in exact order from river intake to covered tap storage.",
          independentPracticePrompt: "If a community uses 160 L of filtered water per day and 1 chlorine drop treats 0.5 L (or 1 tablet per 20 L), calculate daily tablets required.",
          extensionActivity: "Build a classroom 3-layer demonstration filter (gravel, fine sand, activated charcoal) and measure turbidity reduction before noting why boiling is still mandatory.",
          diagnosticSelfCheck: "Why must a pit latrine always sit downhill and at least 30 metres from a drinking well?",
          transferApplication: "Design a school WASH audit checklist covering latrine distance, covered storage taps, soap stations, and safe food handling.",
          masteryAssessment: "Calculate tablets needed for 240 L of filtered water (1 tablet/20 L) and state why clarity alone does not prove microbial safety.",
          summaryRecap: "Filter first to clear mud, disinfect by boiling or dosing chlorine to kill microbes, store with taps, site latrines >= 30 m downhill, and mix ORS strictly 1 packet per 1 L.",
          estimatedMinutes: 80
        },
        questions: [
          {
            id: "q-pri-wash-1",
            type: "multiple_choice",
            questionText: "Why can clear water coming out of a clean-sand household filter still cause cholera or typhoid if drunk unboiled?",
            options: [
              "Microscopic bacteria and viruses pass right through sand pores and require boiling or chlorine to kill",
              "Sand grains dissolve into toxic cholera bacteria when mixed with water",
              "Filtration removes oxygen and turns harmless water acidic",
              "Clear water only needs alum after filtration to become sterile"
            ],
            correctAnswer: "Microscopic bacteria and viruses pass right through sand pores and require boiling or chlorine to kill",
            explanation: "Sand filtration traps suspended silt and large parasite cysts, but bacteria and viruses are far smaller than sand pores and require thermal or chemical disinfection.",
            hintLadder: [
              "Compare the size of mud grains vs single-celled bacteria.",
              "Filtration handles physical solids; disinfection handles living pathogens."
            ],
            misconceptionAlerts: [
              { trigger: "Sand grains dissolve into toxic cholera bacteria when mixed with water", note: "Pathogens enter from raw faecal contamination and pass through coarse pores—they are not made by sand." }
            ],
            skillId: "skill-pri-water-sanitation-health",
            difficulty: "easy"
          },
          {
            id: "q-pri-wash-2",
            type: "multiple_choice",
            questionText: "According to safe WASH engineering guidelines, where must a school pit latrine be sited relative to a hand-dug drinking well?",
            options: [
              "At least 30 metres away and downhill from the drinking well",
              "At most 5 metres away and uphill so rain flushes waste away",
              "Directly beside the well pump so students can wash hands easily",
              "Distance does not matter as long as the latrine has a roof"
            ],
            correctAnswer: "At least 30 metres away and downhill from the drinking well",
            explanation: "A >= 30 m horizontal buffer downhill prevents underground leachate from draining along hydraulic gradients into the well.",
            hintLadder: [
              "Think about which direction rainwater moves underground: downhill or uphill?",
              "Keep sewage downhill and at least 30 metres away from potable water."
            ],
            misconceptionAlerts: [
              { trigger: "At most 5 metres away and uphill so rain flushes waste away", note: "Uphill waste flushes directly INTO the downhill well." }
            ],
            skillId: "skill-pri-water-sanitation-health",
            difficulty: "easy"
          },
          {
            id: "q-pri-wash-3",
            type: "multiple_choice",
            questionText: "One chlorine purification tablet safely disinfects 20 litres of pre-filtered water. How many tablets are required to treat 140 litres of filtered water for a school tank?",
            mathExpression: "\\text{Tablets} = \\frac{140\\text{ L}}{20\\text{ L/tablet}}",
            options: ["7", "2800", "14", "70"],
            correctAnswer: "7",
            explanation: "140 litres ÷ 20 litres per tablet = 7 tablets, mixed thoroughly and held for 30 minutes before drinking.",
            hintLadder: [
              "Divide total water volume (140 L) by the capacity of one tablet (20 L).",
              "140 ÷ 20 = 7."
            ],
            misconceptionAlerts: [
              { trigger: "2800", note: "Divide total litres by 20 L/tablet rather than multiplying 140 × 20." }
            ],
            skillId: "skill-pri-water-sanitation-health",
            difficulty: "medium"
          },
          {
            id: "q-pri-wash-4",
            type: "multiple_choice",
            questionText: "What happens if a caregiver dissolves a full 1-litre ORS packet in only 500 mL (half a litre) of water for a child with diarrhoea?",
            options: [
              "The solution becomes dangerously hypertonic (too salty), drawing more water out of body cells",
              "It heals dehydration twice as fast with zero medical risk",
              "The excess salt evaporates harmlessly within 5 minutes",
              "Glucose stops dissolving unless chilled with ice"
            ],
            correctAnswer: "The solution becomes dangerously hypertonic (too salty), drawing more water out of body cells",
            explanation: "Concentrated ORS creates excessive osmotic pressure in the gut and raises blood sodium dangerously instead of rehydrating tissues.",
            hintLadder: [
              "Remember how high salt concentration affects cells by osmosis.",
              "Half the water means double the salt concentration—hypertonic shock!"
            ],
            misconceptionAlerts: [
              { trigger: "It heals dehydration twice as fast with zero medical risk", note: "Never concentrate ORS; exact 1,000 mL dilution matches intestinal osmotic balance." }
            ],
            skillId: "skill-pri-water-sanitation-health",
            difficulty: "medium"
          },
          {
            id: "q-pri-wash-5",
            type: "multiple_choice",
            questionText: "During heavy rains, a family scoops muddy river water. What is the correct order of steps before drinking?",
            options: [
              "Alum coagulation & settling → Sand/cloth filtration → 30-min chlorination (or 1-min rolling boil) → Covered tap storage",
              "30-min chlorination → Dip open cup immediately → Filter mud last",
              "Dip open cup → Store in open bucket → Add alum after drinking",
              "Filter mud → Leave uncovered outdoors → Drink immediately without heat or chlorine"
            ],
            correctAnswer: "Alum coagulation & settling → Sand/cloth filtration → 30-min chlorination (or 1-min rolling boil) → Covered tap storage",
            explanation: "Removing suspended mud first stops organic solids from neutralizing chlorine or shielding microbes, and covered tap storage prevents recontamination by dipped hands.",
            hintLadder: [
              "Mud neutralizes chlorine, so physical clearing must come BEFORE chemical disinfection.",
              "Final storage must prevent hands/cups from dipping into the treated water."
            ],
            misconceptionAlerts: [
              { trigger: "30-min chlorination → Dip open cup immediately → Filter mud last", note: "Suspended mud consumes chlorine before it can kill bacteria." }
            ],
            skillId: "skill-pri-water-sanitation-health",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. jss_217_ecology_biodiversity_conservation_pr
  // =========================================================================
  {
    id: "unit-p3-jss-ecology-biodiversity",
    subjectId: "jss_217_ecology_biodiversity_conservation_pr",
    level: "junior_secondary",
    title: "Ecology, Trophic Pyramids, Quadrat Sampling & Biodiversity Conservation",
    code: "JSS-ECO-217",
    description:
      "Master the 10% trophic energy transfer law, quadrat population estimation, Simpson-style species richness vs evenness, and in-situ vs ex-situ conservation strategies.",
    order: 3,
    category: "core",
    estimatedHours: 4.5,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS3-SCI-ECO-03",
      "BECE:SCI-ECO-217",
      "CAMBRIDGE_LOWER:BIO-ECOL-SAMPLING"
    ],
    skills: [
      {
        id: "skill-jss-ecology-biodiversity",
        unitId: "unit-p3-jss-ecology-biodiversity",
        title: "10% Energy Law, Quadrat Estimation & Conservation Design",
        code: "SKL-JSS-ECO-217",
        summary:
          "Apply the ~10% trophic energy transfer rule, estimate field population sizes using random quadrat averages, diagnose bioaccumulation in top predators, and plan conservation reserves.",
        objectives: [
          "Compute energy remaining across trophic levels using the ~10% assimilation transfer rule",
          "Estimate total habitat population from mean count per m² quadrat multiplied by total area",
          "Distinguish in-situ conservation (national parks, mangrove reserves) from ex-situ conservation (seed banks, zoos)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-plants-animals-ecosystems", "skill-jss-cell-organization"],
        lesson: {
          id: "les-jss-ecology-biodiversity",
          title: "Ecological Energetics, Population Sampling & Biodiversity Conservation",
          hookAndIntuition:
            "Why are lions and eagles rare while grasses cover entire savannas? Only about 10% of stored energy survives each bite up the food chain—the other 90% leaves as heat, movement, and waste.",
          conceptualExplanation:
            "Ecology quantifies how populations survive, interact, and persist within habitats.\n\n1. TROPHIC PYRAMIDS & THE 10% LAW: Producers (trophic level 1) fix solar energy as chemical biomass. When herbivores (level 2) eat plants, roughly 90% of that energy is lost through cellular respiration (heat), movement, and undigested faeces—only ~10% builds herbivore tissue available to carnivores (level 3). Across four trophic levels: 10,000 kJ → 1,000 kJ → 100 kJ → 10 kJ! This explains why food chains rarely exceed 4–5 steps and why persistent fat-soluble toxins (DDT, mercury) BIOMAGNIFY to lethal concentrations in top predators.\n\n2. RANDOM QUADRAT SAMPLING: Ecologists cannot count every grass tussock or snail in a 500 m² savanna plot. Instead, they toss a 1 m × 1 m quadrat frame randomly at N locations, calculate mean organisms per m², and scale up: Estimated Total = Mean per Quadrat × (Total Habitat Area ÷ Quadrat Area). For moving animals, capture–mark–recapture (Lincoln index: N = (M × C) / R) estimates population without counting every individual.\n\n3. CONSERVATION PRACTICE: Biodiversity covers genetic, species, and ecosystem variety. IN-SITU conservation protects species in their natural habitat (e.g., Yankari Game Reserve, Cross River National Park, mangrove buffer zones), maintaining co-evolved food webs. EX-SITU conservation preserves endangered germplasm outside nature (seed banks, botanical gardens, captive breeding) as an insurance backup against extinction.",
          conceptualModel:
            "Energy: 100% Producer → 10% Primary → 1% Secondary → 0.1% Tertiary | Population: N_est = Mean_quadrat × (Area_total / Area_quadrat).",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "10% Trophic Transfer Rule",
              definition: "Energy at trophic level (n + 1) ≈ 0.10 × Energy at trophic level n; 90% dissipates as respiratory heat and waste.",
              practicalExample: "If guinea grass holds 50,000 kJ, secondary-consumer snakes receive 50,000 × 0.1 × 0.1 = 500 kJ."
            },
            {
              termOrSymbol: "Quadrat Population Formula",
              definition: "N_total = (Sum of counts / Number of quadrats) × (Habitat Area / Single Quadrat Area).",
              practicalExample: "Mean = 6 plants in 0.5 m² quadrat over 200 m² field ⇒ density 12/m² × 200 = 2,400 plants."
            },
            {
              termOrSymbol: "In-Situ vs Ex-Situ + Wildlife Corridors",
              definition: "In-situ protects wild ecosystems intact; ex-situ safeguards seeds/specimens off-site; corridors reconnect fragmented reserves.",
              practicalExample: "Connecting two forest fragments prevents inbreeding depression in isolated chimpanzee or elephant herds."
            }
          ],
          workedExamples: [
            {
              title: "Calculating 10% Energy Loss Across Four Trophic Levels",
              problemStatement: "A wetland algae mat captures 80,000 kJ of chemical energy in a week. Calculate the energy available to (a) tilapia (primary consumer), (b) tigerfish (secondary consumer), and (c) fish eagles (tertiary consumer) under the 10% rule.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Set Trophic Level 1 (Producers = Algae) = 80,000 kJ.",
                  reasoning: "Only 10% transfers upward at each feeding step."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute Level 2 (Tilapia).",
                  reasoning: "80,000 kJ × 0.10 = 8,000 kJ assimilated by tilapia."
                },
                {
                  stepNumber: 3,
                  instruction: "Compute Level 3 (Tigerfish).",
                  reasoning: "8,000 kJ × 0.10 = 800 kJ assimilated by tigerfish."
                },
                {
                  stepNumber: 4,
                  instruction: "Compute Level 4 (Fish Eagles) and interpret.",
                  reasoning: "800 kJ × 0.10 = 80 kJ—only 0.1% of the original plant energy remains, explaining small eagle populations."
                }
              ],
              takeawayRule: "Multiply by 0.10 for each feeding step up the pyramid; by level 4, 99.9% of energy has dissipated."
            },
            {
              title: "Estimating Field Population Using Unequal Quadrat Area",
              problemStatement: "An ecology class tosses ten 0.5 m² quadrats randomly across a 400 m² school meadow and counts 180 speargrass shoots in total. Estimate the total speargrass shoots in the meadow.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Calculate mean shoots per quadrat.",
                  reasoning: "Mean per 0.5 m² quadrat = 180 ÷ 10 = 18 shoots per 0.5 m²."
                },
                {
                  stepNumber: 2,
                  instruction: "Convert quadrat mean into density per 1 m² (or divide total area by 0.5 m²).",
                  reasoning: "Number of 0.5 m² quadrats fitting in 400 m² = 400 ÷ 0.5 = 800 quadrats (equivalent to 36 shoots/m²)."
                },
                {
                  stepNumber: 3,
                  instruction: "Multiply mean per quadrat by total quadrat slots.",
                  reasoning: "Estimated total = 18 × 800 = 14,400 speargrass shoots."
                },
                {
                  stepNumber: 4,
                  instruction: "Verify random sampling bias control.",
                  reasoning: "Random coordinate placement prevents overcounting dense green patches near shade."
                }
              ],
              takeawayRule: "Always divide habitat area by the ACTUAL quadrat area (e.g., 0.5 m² or 0.25 m²)—do not assume every quadrat is 1 m²!"
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Multiplying mean count per 0.25 m² quadrat directly by habitat area in m².",
              whyItIsWrong: "A 0.25 m² quadrat is only one-quarter of a square metre, so you would underestimate the true population 4-fold!",
              correctCorrection: "Convert count to per-m² first (multiply by 4 for 0.25 m²), or use Total = Mean × (Area_habitat / Area_quadrat)."
            },
            {
              misconception: "Confusing energy pyramids with toxin biomagnification.",
              whyItIsWrong: "Available energy SHRINKS 10× per level because it is burned for heat, whereas non-biodegradable toxins (DDT, mercury) are stored in fat and CONCENTRATE upward.",
              correctCorrection: "Energy decreases upward (~10% rule); persistent fat-soluble pollutants increase in concentration upward."
            }
          ],
          guidedPracticePrompt: "If producers store 25,000 kJ, how much energy reaches a tertiary consumer (Level 4)?",
          independentPracticePrompt: "Eight 0.25 m² quadrats in a 100 m² lawn contain 64 dandelions total. Estimate total dandelions in the lawn.",
          extensionActivity: "Compare two forest plots with the same 100 trees: Plot A (97 teak + 1 each of 3 species) vs Plot B (25 each of 4 species) to explain species richness vs evenness.",
          diagnosticSelfCheck: "Why must quadrats be placed randomly rather than deliberately dropped on the lushest patch?",
          transferApplication: "Explain how building an overpass wildlife corridor across a highway protects isolated forest primates.",
          masteryAssessment: "Compute population from 5 quadrats (0.5 m² each) totalling 45 ferns across 300 m², and explain why mercury peaks in sharks rather than plankton.",
          summaryRecap: "Only ~10% of energy advances per trophic level while persistent toxins biomagnify; quadrat estimates scale mean density by (Habitat Area / Quadrat Area); in-situ and ex-situ reserves guard biodiversity.",
          estimatedMinutes: 85
        },
        questions: [
          {
            id: "q-jss-eco-1",
            type: "multiple_choice",
            questionText: "Meadow grass captures 50,000 kJ of energy. Following the 10% trophic transfer rule, how many kilojoules (kJ) reach secondary consumers (snakes that eat grasshoppers)?",
            mathExpression: "E_3 = 50{,}000 \\times 0.10 \\times 0.10",
            options: ["500", "5000", "50", "5"],
            correctAnswer: "500",
            explanation: "Primary consumers (grasshoppers) assimilate 50,000 × 0.10 = 5,000 kJ; secondary consumers (snakes) assimilate 5,000 × 0.10 = 500 kJ.",
            hintLadder: [
              "Grass = level 1 (50,000 kJ), grasshoppers = level 2, snakes = level 3.",
              "Multiply by 0.10 twice: 50,000 → 5,000 → 500."
            ],
            misconceptionAlerts: [
              { trigger: "5000", note: "5,000 kJ is at primary consumers (level 2); snakes are secondary consumers (level 3)." }
            ],
            skillId: "skill-jss-ecology-biodiversity",
            difficulty: "easy"
          },
          {
            id: "q-jss-eco-2",
            type: "multiple_choice",
            questionText: "Which conservation action is an example of IN-SITU biodiversity conservation?",
            options: [
              "Protecting wild elephants and savanna woodland inside Yankari Game Reserve",
              "Storing endangered yam seeds inside a sub-zero university vault",
              "Breeding rare parrots inside an urban zoological aviary",
              "Freezing fish sperm samples in liquid nitrogen tanks"
            ],
            correctAnswer: "Protecting wild elephants and savanna woodland inside Yankari Game Reserve",
            explanation: "In-situ ('on-site') conservation preserves species inside their natural functioning ecosystems; seed banks, zoos, and cryovaults are ex-situ ('off-site').",
            hintLadder: [
              "'In-situ' means 'in original place/habitat'; 'ex-situ' means 'outside natural habitat'.",
              "Only the national reserve protects organisms inside their living wild ecosystem."
            ],
            misconceptionAlerts: [
              { trigger: "Storing endangered yam seeds inside a sub-zero university vault", note: "Seed vaults remove genetic material off-site, making them ex-situ conservation." }
            ],
            skillId: "skill-jss-ecology-biodiversity",
            difficulty: "easy"
          },
          {
            id: "q-jss-eco-3",
            type: "multiple_choice",
            questionText: "Students place 5 random quadrats of area 0.5 m² each in a 200 m² pasture and count a total of 35 wildflowers across the 5 quadrats. Estimate the total wildflowers in the 200 m² pasture.",
            mathExpression: "\\text{Total} = \\left(\\frac{35}{5}\\right) \\times \\left(\\frac{200}{0.5}\\right)",
            options: ["2800", "1400", "700", "5600"],
            correctAnswer: "2800",
            explanation: "Mean = 35 ÷ 5 = 7 flowers per 0.5 m² quadrat (which equals 14 flowers/m²). Multiplying 14/m² × 200 m² = 2,800 flowers.",
            hintLadder: [
              "First find the mean count per quadrat: 35 ÷ 5 = 7.",
              "Each quadrat is 0.5 m², so 200 ÷ 0.5 = 400 quadrats fit in the field. Multiply 7 × 400."
            ],
            misconceptionAlerts: [
              { trigger: "1400", note: "Remember the quadrat is 0.5 m², NOT 1 m²—you must double the per-quadrat count to get density per m²!" }
            ],
            skillId: "skill-jss-ecology-biodiversity",
            difficulty: "medium"
          },
          {
            id: "q-jss-eco-4",
            type: "multiple_choice",
            questionText: "Why does the concentration of mercury or DDT increase sharply in fish eagles compared to the lake plankton at the bottom of the food chain?",
            options: [
              "Persistent fat-soluble toxins are not excreted, so each predator accumulates toxins from hundreds of prey over time (biomagnification)",
              "Fish eagles breathe more oxygen directly from water than plankton",
              "Mercury multiplies faster inside warm bird feathers by photosynthesis",
              "Plankton destroy mercury using chlorophyll while eagles manufacture it"
            ],
            correctAnswer: "Persistent fat-soluble toxins are not excreted, so each predator accumulates toxins from hundreds of prey over time (biomagnification)",
            explanation: "Because predators consume huge biomass of lower-trophic prey while persistent toxins resist breakdown and excretion, tissue concentration amplifies up the food chain.",
            hintLadder: [
              "Notice that biomass shrinks 10× per level while stored fat-soluble toxins stay behind.",
              "Eating many contaminated fish concentrates their lifetime toxins into one predator."
            ],
            misconceptionAlerts: [
              { trigger: "Plankton destroy mercury using chlorophyll while eagles manufacture it", note: "Living organisms do not manufacture elemental mercury; they accumulate it from water and prey." }
            ],
            skillId: "skill-jss-ecology-biodiversity",
            difficulty: "medium"
          },
          {
            id: "q-jss-eco-5",
            type: "multiple_choice",
            questionText: "Forest A and Forest B each have 4 tree species and 100 total trees. Forest A has (97, 1, 1, 1) trees while Forest B has (25, 25, 25, 25). Why does Forest B have higher true biodiversity?",
            options: [
              "Both share the same species richness (4), but Forest B has far higher species evenness",
              "Forest B has higher species richness (8 vs 4)",
              "Forest A lacks any photosynthetic producers",
              "Equal populations always guarantee lower genetic resilience"
            ],
            correctAnswer: "Both share the same species richness (4), but Forest B has far higher species evenness",
            explanation: "Species richness is simply the count of distinct species (4 in both), whereas species evenness measures how balanced their abundances are—Forest B resists single-species blight.",
            hintLadder: [
              "Count how many distinct species exist in Forest A vs Forest B first.",
              "Both have 4 species, so compare how evenly the 100 trees are distributed."
            ],
            misconceptionAlerts: [
              { trigger: "Forest B has higher species richness (8 vs 4)", note: "Richness is the count of species present (4 in both); balance across abundances is called evenness." }
            ],
            skillId: "skill-jss-ecology-biodiversity",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. jss_220_earth_science_rocks_minerals_natural
  // =========================================================================
  {
    id: "unit-p3-jss-earth-rocks-hazards",
    subjectId: "jss_220_earth_science_rocks_minerals_natural",
    level: "junior_secondary",
    title: "Earth Science: Rock Cycle, Mineral Identification & Tectonic Natural Hazards",
    code: "JSS-GEO-220",
    description:
      "Master the three rock classes and rock cycle transformations, cooling rate vs crystal grain size, physical vs chemical weathering, and convergent/divergent/transform plate hazards.",
    order: 3,
    category: "core",
    estimatedHours: 4.5,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS2-GEO-ROCK-01",
      "BECE:SCI-GEO-220",
      "CAMBRIDGE_LOWER:GEO-EARTH-HAZARDS"
    ],
    skills: [
      {
        id: "skill-jss-earth-rocks-hazards",
        unitId: "unit-p3-jss-earth-rocks-hazards",
        title: "Rock Cycle Processes, Mineral Testing & Plate Hazard Mechanics",
        code: "SKL-JSS-GEO-220",
        summary:
          "Classify igneous, sedimentary, and metamorphic rocks by formation process and texture, apply Mohs scratch hardness and acid-effervescence tests, and predict earthquake/volcano plate boundaries.",
        objectives: [
          "Distinguish intrusive (slow-cooled, coarse crystals) vs extrusive (fast-cooled, fine/glassy) igneous rocks",
          "Explain why fossils survive exclusively in sedimentary strata and deform/destroy during metamorphism or melting",
          "Relate P-wave vs S-wave arrival gaps to earthquake epicentre distance and identify hazards at tectonic boundaries"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-geo-cardinal-continents", "skill-jss-matter-separation-density"],
        lesson: {
          id: "les-jss-earth-rocks-hazards",
          title: "The Rock Cycle, Mineral Properties & Earth Hazards",
          hookAndIntuition:
            "Every pebble in a streambed is a recycled time capsule—once molten magma, later layered mudstone trapping ancient shells, or squeezed deep underground into banded gneiss.",
          conceptualExplanation:
            "Earth's crust continuously recycles rock across three major classes:\n1. IGNEOUS ROCKS form when molten rock solidifies. Magma cooling SLOWLY deep underground forms large, visible interlocking crystals (intrusive granite); lava cooling RAPIDLY at the surface forms tiny crystals or glass (extrusive basalt, obsidian).\n2. SEDIMENTARY ROCKS form at Earth's surface via Weathering → Erosion → Deposition → Compaction → Cementation. Because layers settle gently in rivers, lakes, and seas without extreme heat, sedimentary rocks (sandstone, limestone, shale) are the ONLY major class preserving delicate fossils and layered strata.\n3. METAMORPHIC ROCKS form when existing rock undergoes intense HEAT and PRESSURE WITHOUT melting (limestone → marble; shale → slate; granite → gneiss), producing dense interlocking grains or foliated bands.\n\nMINERAL DIAGNOSTICS: Geologists identify minerals reliably using Mohs scratch hardness (1 talc to 10 diamond; fingernail ≈ 2.5, steel nail ≈ 5.5), powder streak colour on unglazed porcelain, cleavage planes, and dilute HCl acid fizz (calcite/limestone releases CO₂ bubbles).\n\nTECTONIC HAZARDS: Divergent boundaries (plates pull apart) create mid-ocean ridges and mild magma eruptions; convergent subduction boundaries drive explosive volcanoes, deep trenches, and megathrust earthquakes; transform faults (plates slide past horizontally) generate intense shallow earthquakes without volcanoes. During an earthquake, fast longitudinal P-waves arrive before slower transverse S-waves—the S–P lag time directly measures epicentre distance!",
          conceptualModel:
            "Igneous (Cooling Melt) ↔ Sedimentary (Weather + Cement) ↔ Metamorphic (Heat + Pressure, Solid State).",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Cooling Rate ↔ Crystal Size",
              definition: "Slow underground cooling allows ions to migrate into large crystals (granite); rapid surface quenching freezes fine grains (basalt).",
              practicalExample: "Granite shows visible pink feldspar and quartz crystals; basalt looks uniformly dark and fine-grained."
            },
            {
              termOrSymbol: "S – P Seismic Distance Formula",
              definition: "Distance d = Δt × (v_P · v_S) / (v_P − v_S), where Δt is the arrival delay between faster P-waves and slower S-waves.",
              practicalExample: "A longer S–P gap on a seismogram proves the earthquake occurred farther from the recording station."
            },
            {
              termOrSymbol: "Mohs Scratch & Acid Effervescence",
              definition: "A harder mineral scratches a softer one; carbonate minerals (calcite/limestone/marble) fizz CO₂ in dilute HCl.",
              practicalExample: "Quartz (Mohs 7) scratches steel (5.5) and glass; calcite (Mohs 3) scratches a fingernail (2.5) and fizzes in acid."
            }
          ],
          workedExamples: [
            {
              title: "Inferring Rock Class & Cooling History from Field Evidence",
              problemStatement: "Sample X contains visible fossil shells in horizontal beds and fizzes vigorously in dilute HCl. Sample Y shows 4 mm interlocking crystals with zero fossils or layers. Sample Z has sparkling distorted foliation bands and fizzes weakly. Identify all three rocks and their origins.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Analyze Sample X (fossils + layers + strong acid fizz).",
                  reasoning: "Fossils and strata prove sedimentary origin; strong CO₂ effervescence identifies calcium carbonate → LIMESTONE (sedimentary)."
                },
                {
                  stepNumber: 2,
                  instruction: "Analyze Sample Y (coarse 4 mm interlocking crystals, no layers/fossils).",
                  reasoning: "Large interlocking crystals require slow cooling from magma deep underground → INTRUSIVE IGNEOUS (e.g., Granite)."
                },
                {
                  stepNumber: 3,
                  instruction: "Analyze Sample Z (foliated wavy bands formed without melting).",
                  reasoning: "Aligned mineral bands under directional heat and pressure mark solid-state recrystallization → METAMORPHIC (e.g., Gneiss/Schist or carbonate-bearing marble if non-foliated)."
                },
                {
                  stepNumber: 4,
                  instruction: "Verify why Sample Y cannot preserve fossils.",
                  reasoning: "Temperatures of molten magma (~700–1,200 °C) completely incinerate organic shells."
                }
              ],
              takeawayRule: "Fossils + beds = Sedimentary; random interlocking crystals = Igneous (coarse = slow/intrusive, fine = fast/extrusive); aligned foliation or baked recrystallization = Metamorphic."
            },
            {
              title: "Calculating Earthquake Epicentre Distance from S – P Lag",
              problemStatement: "At a monitoring station, primary P-waves travel at 6.0 km/s and secondary S-waves travel at 3.5 km/s. If the S-wave arrives 25 seconds after the P-wave, find the distance to the earthquake epicentre.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Write travel-time equations for distance d.",
                  reasoning: "t_S − t_P = d/v_S − d/v_P = 25 s."
                },
                {
                  stepNumber: 2,
                  instruction: "Substitute v_P = 6.0 km/s and v_S = 3.5 km/s.",
                  reasoning: "d(1/3.5 − 1/6.0) = d(6.0 − 3.5)/(3.5 × 6.0) = d(2.5 / 21.0) = 25."
                },
                {
                  stepNumber: 3,
                  instruction: "Solve for d.",
                  reasoning: "d = 25 × (21.0 / 2.5) = 25 × 8.4 = 210 km."
                },
                {
                  stepNumber: 4,
                  instruction: "Explain how seismologists pinpoint exact location.",
                  reasoning: "Draw distance circles of radius d from at least 3 stations; their single intersection is the epicentre (triangulation)."
                }
              ],
              takeawayRule: "Longer S − P time lag means greater distance; 3 stations triangulate the unique epicentre."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking metamorphic rocks melt completely before hardening.",
              whyItIsWrong: "If a rock melts completely and then cools, it becomes an IGNEOUS rock—metamorphism MUST occur in the solid state!",
              correctCorrection: "Metamorphism alters mineral crystals via heat, pressure, and hot fluids while keeping the rock solid."
            },
            {
              misconception: "Using surface colour alone to identify minerals (e.g., claiming all yellow metallic grains are gold).",
              whyItIsWrong: "Trace impurities change quartz from clear to purple or pink, while pyrite ('fool's gold') mimics gold's colour.",
              correctCorrection: "Test streak (pyrite leaves greenish-black powder; gold leaves gold streak), Mohs hardness, and cleavage."
            }
          ],
          guidedPracticePrompt: "Explain why granite has much larger mineral crystals than basalt even though both are igneous rocks.",
          independentPracticePrompt: "If Mineral A scratches Mineral B, and Mineral C scratches Mineral A, list A, B, C from softest to hardest.",
          extensionActivity: "Drop dilute vinegar onto chalk/limestone, sandstone, and granite chips to observe carbonate fizz vs silicate resistance.",
          diagnosticSelfCheck: "Why do transform faults cause severe earthquakes but rarely build volcanic mountain chains?",
          transferApplication: "Compare flood-hazard vs landslide-hazard mitigation after heavy deforestation on steep shale slopes.",
          masteryAssessment: "Compute epicentre distance when v_P = 6 km/s, v_S = 4 km/s, and Δt = 12 s, and explain why fossils are absent from basalt.",
          summaryRecap: "Cooling speed controls igneous crystal size; deposition + compaction preserves sedimentary fossils; solid-state heat/pressure drives metamorphism; S–P lag triangulates earthquakes.",
          estimatedMinutes: 85
        },
        questions: [
          {
            id: "q-jss-geo-1",
            type: "multiple_choice",
            questionText: "Why does granite contain large visible crystals while basalt formed from lava is fine-grained with tiny crystals?",
            options: [
              "Granite cooled slowly deep underground, giving mineral ions time to grow large crystals; basalt quenched rapidly at the surface",
              "Basalt is sedimentary whereas granite is formed from ocean shells",
              "Granite dissolved in rainwater and precipitated crystals",
              "Lava lacks any silicate minerals compared to underground magma"
            ],
            correctAnswer: "Granite cooled slowly deep underground, giving mineral ions time to grow large crystals; basalt quenched rapidly at the surface",
            explanation: "Crystal size in igneous rocks depends primarily on cooling rate: insulated underground magma cools over millennia (coarse/phaneritic), while surface lava cools in hours/days (fine/aphanitic).",
            hintLadder: [
              "Granite is intrusive (underground); basalt is extrusive (surface lava).",
              "Slower cooling gives atoms longer to arrange into big crystals."
            ],
            misconceptionAlerts: [
              { trigger: "Basalt is sedimentary whereas granite is formed from ocean shells", note: "Both granite and basalt are igneous rocks formed from cooling molten silicate rock." }
            ],
            skillId: "skill-jss-earth-rocks-hazards",
            difficulty: "easy"
          },
          {
            id: "q-jss-geo-2",
            type: "multiple_choice",
            questionText: "In which rock type are intact dinosaur bones or marine clam fossils most likely to be preserved?",
            options: [
              "Sedimentary rocks such as limestone and shale",
              "Extrusive igneous obsidian formed from glowing lava",
              "Intrusive igneous gabbro formed inside magma chambers",
              "High-grade gneiss recrystallized deep in mountain roots"
            ],
            correctAnswer: "Sedimentary rocks such as limestone and shale",
            explanation: "Sedimentary deposition gently buries remains under mud/sand and cements them at low temperatures, whereas igneous melts burn them and intense metamorphism crushes/deforms them.",
            hintLadder: [
              "Which rock forms layer by layer in cool lakes, rivers, and seabeds?",
              "Extreme heat melts or destroys organic fossils."
            ],
            misconceptionAlerts: [
              { trigger: "High-grade gneiss recrystallized deep in mountain roots", note: "Intense metamorphic pressure and temperature destroy delicate fossils." }
            ],
            skillId: "skill-jss-earth-rocks-hazards",
            difficulty: "easy"
          },
          {
            id: "q-jss-geo-3",
            type: "multiple_choice",
            questionText: "A prospector finds a shiny yellow mineral. It scratches glass (Mohs 5.5), leaves a greenish-black streak on porcelain, and shatters rather than bending. What is it?",
            options: [
              "Pyrite ('fool's gold', Mohs ~6.5, brittle, dark streak), NOT true gold",
              "Pure native gold (Mohs 2.5, gold streak, malleable)",
              "Gypsum (Mohs 2, white streak)",
              "Diamond (Mohs 10)"
            ],
            correctAnswer: "Pyrite ('fool's gold', Mohs ~6.5, brittle, dark streak), NOT true gold",
            explanation: "True gold is soft (Mohs 2.5, cannot scratch glass), malleable, and leaves a golden-yellow streak; pyrite is harder than glass and leaves a greenish-black powder streak.",
            hintLadder: [
              "Gold is soft enough to scratch with a copper coin (Mohs 2.5) and leaves a gold streak.",
              "A brittle yellow crystal scratching glass with a dark streak is pyrite."
            ],
            misconceptionAlerts: [
              { trigger: "Pure native gold (Mohs 2.5, gold streak, malleable)", note: "Gold cannot scratch glass (Mohs 5.5) and does not leave a black streak." }
            ],
            skillId: "skill-jss-earth-rocks-hazards",
            difficulty: "medium"
          },
          {
            id: "q-jss-geo-4",
            type: "multiple_choice",
            questionText: "At a seismic station, P-waves travel at 6 km/s and S-waves travel at 4 km/s. If the S-wave arrives 15 seconds after the P-wave, how many kilometres (km) away is the epicentre?",
            mathExpression: "d\\left(\\frac{1}{4} - \\frac{1}{6}\\right) = 15",
            options: ["180", "30", "90", "360"],
            correctAnswer: "180",
            explanation: "d(1/4 − 1/6) = d(1/12) = 15 ⇒ d = 15 × 12 = 180 km.",
            hintLadder: [
              "Difference in travel time = d/4 − d/6 = d/12.",
              "Set d/12 = 15 seconds and solve for d."
            ],
            misconceptionAlerts: [
              { trigger: "30", note: "Do not multiply 15 × (6 − 4); solve d/v_S − d/v_P = 15 directly." }
            ],
            skillId: "skill-jss-earth-rocks-hazards",
            difficulty: "hard"
          },
          {
            id: "q-jss-geo-5",
            type: "multiple_choice",
            questionText: "Why do transform plate boundaries (such as the San Andreas Fault) trigger devastating shallow earthquakes while producing almost no volcanic eruptions?",
            options: [
              "Plates grind sideways horizontally past each other, building shear stress without subducting wet crust or pulling open mantle rifts",
              "Transform faults happen exclusively in soft sediment above the crust",
              "Cold ocean water extinguishes volcanoes inside continental rocks",
              "Plates melt downward faster than magma can rise"
            ],
            correctAnswer: "Plates grind sideways horizontally past each other, building shear stress without subducting wet crust or pulling open mantle rifts",
            explanation: "Volcanism requires decompression melting (divergent rifts) or flux melting of a sinking slab (convergent subduction); horizontal transform sliding locks and snaps crust without magma generation.",
            hintLadder: [
              "Compare how magma forms at divergent or convergent subduction boundaries.",
              "Sliding sideways builds frictional shear stress—no slab sinks and no rift opens."
            ],
            misconceptionAlerts: [
              { trigger: "Plates melt downward faster than magma can rise", note: "Transform plates move horizontally rather than subducting downward." }
            ],
            skillId: "skill-jss-earth-rocks-hazards",
            difficulty: "medium"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 4. jss_230_agricultural_ecology_farm_records_cr
  // =========================================================================
  {
    id: "unit-p3-jss-agric-ecology-records",
    subjectId: "jss_230_agricultural_ecology_farm_records_cr",
    level: "junior_secondary",
    title: "Agricultural Ecology, Farm Records & Crop Yield Improvement",
    code: "JSS-AGR-230",
    description:
      "Master climatic/edaphic ecological factors in farming, gross margin & farm inventory accounting, plant population spacing calculations, and Mendelian/selection crop improvement.",
    order: 3,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS3-AGR-ECO-01",
      "BECE:AGR-REC-230",
      "WEST_AFRICA_AGR:FARM-RECORDS-YIELD"
    ],
    skills: [
      {
        id: "skill-jss-agric-ecology-records",
        unitId: "unit-p3-jss-agric-ecology-records",
        title: "Agro-Ecological Zoning, Farm Financial Records & Plant Spacing",
        code: "SKL-JSS-AGR-230",
        summary:
          "Evaluate biotic and climatic agro-ecological constraints, compute profit/gross-margin from production and sales records, calculate optimal plant stands per hectare, and distinguish hybridization from mass selection.",
        objectives: [
          "Calculate plant stand populations on rectangular plots and per hectare (10,000 m²) from row-by-intra-row spacing",
          "Distinguish farm inventory, input, production, and sales records to compute net profit and gross margin",
          "Explain agro-ecological symbiosis (legume Rhizobium intercropping) and hybrid vigour in crop improvement"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-agr-crops-soils", "skill-jss-soil-crop-husbandry"],
        lesson: {
          id: "les-jss-agric-ecology-records",
          title: "Agricultural Ecology, Farm Records & Crop Improvement",
          hookAndIntuition:
            "A farmer who forgets seed costs or sows maize too tightly wastes money and starves plants of sunlight—smart farming combines ecology, spacing geometry, and exact ledgers.",
          conceptualExplanation:
            "Agricultural ecology examines how crops and livestock interact with abiotic climatic factors (rainfall distribution, photoperiod, temperature), edaphic soil conditions, and biotic partners (pollinators, Rhizobium bacteria, pests, weeds).\n\n1. PLANT POPULATION & SPACING MATH: Every crop needs balanced spacing to avoid root/light competition. Since 1 hectare = 10,000 m², if maize is planted at inter-row spacing R metres and intra-row spacing C metres with S seeds per stand, total stands per hectare = 10,000 / (R × C). For example, 0.75 m × 0.25 m gives area per stand = 0.1875 m² ⇒ 10,000 / 0.1875 = 53,333 stands/ha!\n\n2. FARM RECORDS & PROFIT ACCOUNTING: Essential records include Farm Diary (daily operations), Farm Inventory (tools/assets value), Input/Consumption Record (seed, NPK, labour), Production Record (kg harvested), and Sales/Cash Ledger. Profit = Total Revenue − Total Explicit Costs; Gross Margin = Total Revenue − Variable Costs (ignoring fixed tractor/land rent to compare enterprise efficiency).\n\n3. CROP IMPROVEMENT: Farmers raise yield, drought tolerance, and pest resistance through (a) Introduction (bringing adapted cultivars), (b) Mass Selection (saving seeds from best-performing plants), and (c) Crossbreeding / Hybridization (crossing two pure lines A × B to gain F₁ HYBRID VIGOUR / heterosis—higher yield than either parent, though saved F₂ seed loses uniformity!). Legume-cereal intercropping (Maize + Cowpea) adds natural biological nitrogen while suppressing weeds.",
          conceptualModel:
            "Stands/ha = 10,000 ÷ (Row_m × IntraRow_m) | Profit = Revenue − Total Costs | Intercrop = Cereal + Legume (N₂ Fixation).",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Plant Stand Formula (1 ha = 10,000 m²)",
              definition: "Total Stands = Area (m²) ÷ (Inter-row spacing × Intra-row spacing); Plants = Stands × Plants per stand.",
              practicalExample: "At 0.8 m × 0.5 m on 1 ha (10,000 m²): area/stand = 0.40 m² ⇒ 10,000 ÷ 0.40 = 25,000 stands."
            },
            {
              termOrSymbol: "Gross Margin vs Net Farm Profit",
              definition: "Gross Margin = Total Sales Value − Variable Costs (seeds, fertilizer, casual labour); Net Profit further subtracts Fixed Costs (rent, depreciation).",
              practicalExample: "Comparing cassava vs maize gross margins tells a farmer which crop returns more per naira of seasonal inputs."
            },
            {
              termOrSymbol: "F₁ Hybrid Vigour (Heterosis)",
              definition: "Crossing two genetically distinct inbred parent lines boosts F₁ yield and resilience; replanting F₂ seeds splits traits and lowers yield.",
              practicalExample: "Commercial hybrid maize must be purchased fresh each season to preserve uniform F₁ performance."
            }
          ],
          workedExamples: [
            {
              title: "Computing Plant Population & Seed Weight for 1 Hectare",
              problemStatement: "An extension officer recommends planting cowpea at 0.50 m between rows and 0.20 m within rows, thinning to 2 plants per stand. Calculate (a) total stands in 1 hectare (10,000 m²) and (b) total cowpea plants.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute ground area occupied by one stand.",
                  reasoning: "Area per stand = 0.50 m × 0.20 m = 0.10 m²."
                },
                {
                  stepNumber: 2,
                  instruction: "Divide 1 hectare (10,000 m²) by area per stand.",
                  reasoning: "Stands/ha = 10,000 ÷ 0.10 = 100,000 stands per hectare."
                },
                {
                  stepNumber: 3,
                  instruction: "Multiply stands by 2 plants per stand.",
                  reasoning: "Total plants = 100,000 × 2 = 200,000 cowpea plants/ha."
                },
                {
                  stepNumber: 4,
                  instruction: "Explain agronomic benefit of legume intercropping.",
                  reasoning: "Root-nodule Rhizobium bacteria fix atmospheric N₂ into ammonium, enriching soil for a following maize crop."
                }
              ],
              takeawayRule: "Convert all spacing to metres first, compute (R × C), divide into 10,000 m² for stands/ha, then multiply by plants/stand."
            },
            {
              title: "Calculating Farm Gross Margin & Net Profit from Ledgers",
              problemStatement: "A cassava plot yields 12 tonnes sold at ₦80,000/tonne. Variable costs are: stems ₦90,000, fertilizer/weeding ₦210,000, harvest labour ₦120,000. Fixed annual land rent + tool depreciation total ₦140,000. Find Total Revenue, Gross Margin, and Net Profit.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute Total Revenue.",
                  reasoning: "Revenue = 12 tonnes × ₦80,000 = ₦960,000."
                },
                {
                  stepNumber: 2,
                  instruction: "Sum Variable Costs and compute Gross Margin.",
                  reasoning: "Variable Costs = 90,000 + 210,000 + 120,000 = ₦420,000; Gross Margin = 960,000 − 420,000 = ₦540,000."
                },
                {
                  stepNumber: 3,
                  instruction: "Subtract Fixed Costs for Net Profit.",
                  reasoning: "Net Profit = 540,000 − 140,000 = ₦400,000."
                },
                {
                  stepNumber: 4,
                  instruction: "Identify which record tracks tool value loss.",
                  reasoning: "The Farm Inventory record tracks opening/closing asset values and depreciation."
                }
              ],
              takeawayRule: "Gross Margin ignores fixed overhead; Net Profit subtracts BOTH variable and fixed costs from revenue."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Adding row spacing and within-row spacing (e.g., 0.8 m + 0.5 m) instead of multiplying.",
              whyItIsWrong: "Each stand occupies a 2D rectangle of area (row × intra-row), not a sum of lengths.",
              correctCorrection: "Always multiply inter-row × intra-row in metres before dividing into 10,000 m²."
            },
            {
              misconception: "Saving seed from high-yielding F₁ hybrid maize expecting identical F₂ yield.",
              whyItIsWrong: "In F₂ segregation, recessive traits re-emerge and plants grow uneven in height, maturity, and cob size.",
              correctCorrection: "Save seeds only from open-pollinated varieties; purchase fresh certified F₁ seed each season for hybrids."
            }
          ],
          guidedPracticePrompt: "Calculate stands per hectare for yam planted at 1.0 m × 1.0 m spacing.",
          independentPracticePrompt: "Distinguish a Farm Diary from a Farm Inventory record with one concrete entry for each.",
          extensionActivity: "Draft a 1-term school garden profit ledger tracking seed input costs, harvest weights, and market sales.",
          diagnosticSelfCheck: "Why does intercropping maize with cowpea improve long-term agro-ecological nitrogen balance?",
          transferApplication: "Diagnose why doubling maize planting density beyond recommended spacing can lower grain yield per hectare.",
          masteryAssessment: "Find total plants on 1 hectare at 0.8 m × 0.5 m with 2 plants/stand, and compute Gross Margin if sales = ₦500,000 and variable costs = ₦185,000.",
          summaryRecap: "Stands/ha = 10,000 ÷ (R × C); Gross Margin = Revenue − Variable Costs while Net Profit also deducts Fixed Costs; F₁ hybrids outperform parents but segregate in F₂.",
          estimatedMinutes: 80
        },
        questions: [
          {
            id: "q-jss-agr-1",
            type: "multiple_choice",
            questionText: "A crop is planted at an inter-row spacing of 0.8 m and intra-row spacing of 0.5 m across 1 hectare (10,000 m²), with 1 plant per stand. How many plant stands are in the 1-hectare field?",
            mathExpression: "\\text{Stands} = \\frac{10{,}000}{0.8 \\times 0.5}",
            options: ["25000", "4000", "12500", "50000"],
            correctAnswer: "25000",
            explanation: "Area per stand = 0.8 × 0.5 = 0.4 m². Stands/ha = 10,000 ÷ 0.4 = 25,000 stands.",
            hintLadder: [
              "Multiply 0.8 m × 0.5 m to find the area per stand.",
              "Divide 10,000 m² by 0.4 m²."
            ],
            misconceptionAlerts: [
              { trigger: "4000", note: "Divide 10,000 by 0.4 rather than multiplying 10,000 × 0.4!" }
            ],
            skillId: "skill-jss-agric-ecology-records",
            difficulty: "easy"
          },
          {
            id: "q-jss-agr-2",
            type: "multiple_choice",
            questionText: "Which farm record logs tools, machinery, livestock numbers, and depreciated asset values at the start and end of the farming year?",
            options: [
              "Farm Inventory",
              "Farm Diary",
              "Sales Ledger",
              "Weather Log"
            ],
            correctAnswer: "Farm Inventory",
            explanation: "The Farm Inventory records physical assets, quantities, and valuation for depreciation/net-worth tracking; the Diary logs daily events.",
            hintLadder: [
              "Think of counting stock and equipment owned by the farm.",
              "Daily tasks go in the Diary; physical assets and tools go in the Inventory."
            ],
            misconceptionAlerts: [
              { trigger: "Farm Diary", note: "A Farm Diary records daily chronological work events, whereas Farm Inventory lists physical assets and values." }
            ],
            skillId: "skill-jss-agric-ecology-records",
            difficulty: "easy"
          },
          {
            id: "q-jss-agr-3",
            type: "multiple_choice",
            questionText: "A tomato enterprise earns ₦650,000 in sales, spends ₦280,000 on variable inputs (seedlings, fertilizer, labour), and pays ₦95,000 in fixed annual land rent. What is its Gross Margin in naira?",
            mathExpression: "\\text{Gross Margin} = 650{,}000 - 280{,}000",
            options: ["370000", "275000", "465000", "555000"],
            correctAnswer: "370000",
            explanation: "Gross Margin = Total Revenue − Variable Costs = 650,000 − 280,000 = ₦370,000 (Fixed rent is only deducted for Net Profit = ₦275,000).",
            hintLadder: [
              "Gross Margin deducts ONLY variable costs from revenue.",
              "Subtract 280,000 from 650,000."
            ],
            misconceptionAlerts: [
              { trigger: "275000", note: "₦275,000 is the Net Profit (after fixed rent); Gross Margin subtracts variable costs only." }
            ],
            skillId: "skill-jss-agric-ecology-records",
            difficulty: "medium"
          },
          {
            id: "q-jss-agr-4",
            type: "multiple_choice",
            questionText: "Why do agricultural officers advise farmers NOT to replant grains harvested from an F₁ hybrid maize crop?",
            options: [
              "F₂ offspring segregate genetically, losing uniform height, maturity, and hybrid vigour yield",
              "F₁ hybrid maize seeds are 100% sterile and can never germinate",
              "Hybrid maize poisons soil nitrogen on the second planting",
              "Open pollination turns maize into sorghum"
            ],
            correctAnswer: "F₂ offspring segregate genetically, losing uniform height, maturity, and hybrid vigour yield",
            explanation: "F₁ seeds are viable and germinate, but genetic segregation in F₂ breaks up the complementary heterozygous combination that produced heterosis.",
            hintLadder: [
              "Recall Mendel's ratios when heterozygous F₁ plants interbreed to make F₂.",
              "Traits split apart (segregate), reducing both yield and field uniformity."
            ],
            misconceptionAlerts: [
              { trigger: "F₁ hybrid maize seeds are 100% sterile and can never germinate", note: "F₂ seeds DO germinate, but they suffer genetic segregation and sharp yield drop." }
            ],
            skillId: "skill-jss-agric-ecology-records",
            difficulty: "medium"
          },
          {
            id: "q-jss-agr-5",
            type: "multiple_choice",
            questionText: "A plot measures 40 m by 25 m. Cowpea is sown at 0.5 m × 0.25 m with 2 plants kept per stand after thinning. How many cowpea plants grow on the plot?",
            mathExpression: "\\text{Plants} = \\frac{40 \\times 25}{0.5 \\times 0.25} \\times 2",
            options: ["16000", "8000", "4000", "32000"],
            correctAnswer: "16000",
            explanation: "Plot area = 40 × 25 = 1,000 m². Area per stand = 0.5 × 0.25 = 0.125 m². Stands = 1,000 ÷ 0.125 = 8,000. Multiply by 2 plants/stand = 16,000 plants.",
            hintLadder: [
              "Find plot area (40 × 25 = 1,000 m²) and stand area (0.5 × 0.25 = 0.125 m²).",
              "Divide to get 8,000 stands, then multiply by 2 plants per stand."
            ],
            misconceptionAlerts: [
              { trigger: "8000", note: "8,000 is the number of STANDS; each stand holds 2 plants, giving 16,000 plants." }
            ],
            skillId: "skill-jss-agric-ecology-records",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 5. jss_231_soil_fertility_irrigation_water_mana
  // =========================================================================
  {
    id: "unit-p3-jss-soil-fertility-irrigation",
    subjectId: "jss_231_soil_fertility_irrigation_water_mana",
    level: "junior_secondary",
    title: "Soil Fertility Maintenance, Macronutrients & Irrigation Water Management",
    code: "JSS-AGR-231",
    description:
      "Master N-P-K deficiency symptoms and fertilizer active-ingredient math, soil organic matter & green manuring, field capacity vs wilting point, and surface/sprinkler/drip irrigation scheduling.",
    order: 3,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS3-AGR-SOIL-02",
      "BECE:AGR-IRR-231",
      "FAO_IRRIGATION:SOIL-WATER-01"
    ],
    skills: [
      {
        id: "skill-jss-soil-fertility-irrigation",
        unitId: "unit-p3-jss-soil-fertility-irrigation",
        title: "N-P-K Nutrient Diagnostics, Fertilizer Dosing & Irrigation Balance",
        code: "SKL-JSS-AGR-231",
        summary:
          "Diagnose N, P, K deficiency symptoms, calculate fertilizer bag requirements from N-P-K grade percentages, distinguish field capacity from permanent wilting point, and schedule drip vs furrow water delivery.",
        objectives: [
          "Match N (older-leaf chlorosis), P (purple leaf undersides/weak roots), and K (scorched leaf margins) deficiencies",
          "Calculate kg of commercial fertilizer (e.g., Urea 46-0-0 or NPK 15-15-15) required to supply a target kg N/ha",
          "Compute net irrigation depth from Available Water Capacity (AWC = Field Capacity − Wilting Point) and application efficiency"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-jss-soil-crop-husbandry", "skill-jss-ratio-rates-variation"],
        lesson: {
          id: "les-jss-soil-fertility-irrigation",
          title: "Soil Fertility, Fertilizer Calculations & Irrigation Scheduling",
          hookAndIntuition:
            "A 50 kg bag of NPK 15-15-15 does NOT hold 50 kg of nitrogen—only 7.5 kg is nitrogen! Knowing fertilizer grades and soil water thresholds stops crop burn and saves irrigation fuel.",
          conceptualExplanation:
            "Productive soils balance chemical nutrients, living humus structure, and root-zone moisture.\n\n1. PRIMARY MACRONUTRIENTS (N-P-K):\n• NITROGEN (N): Builds chlorophyll and leaf proteins; deficiency causes uniform yellowing (chlorosis) starting on OLDER bottom leaves.\n• PHOSPHORUS (P): Drives ATP energy transfer and early root establishment; deficiency yields stunted roots and reddish-purple leaf tints.\n• POTASSIUM (K): Regulates stomatal opening and drought/disease resistance; deficiency scorches leaf edges (marginal necrosis).\n\n2. FERTILIZER GRADE ARITHMETIC: An NPK label such as 20-10-10 means 20% N, 10% P₂O₅, and 10% K₂O by mass. To deliver a target N_req kg of elemental nitrogen using a fertilizer of percentage grade G%: Mass_fertilizer = N_req / (G / 100). Thus 46 kg N/ha using Urea (46% N) needs exactly 46 / 0.46 = 100 kg Urea (= two 50-kg bags).\n\n3. SOIL WATER & IRRIGATION EFFICIENCY: After drainage stops, soil holds FIELD CAPACITY (FC); when roots can extract no more, it reaches PERMANENT WILTING POINT (PWP). Available Water Capacity AWC = FC − PWP. Gross irrigation volume pumped = Net crop water need ÷ Efficiency (η): drip (~90%) wastes far less to evaporation/runoff than furrow (~55%).",
          conceptualModel:
            "Fertilizer Mass = Target Nutrient ÷ Grade Fraction | Pumped Water = Crop Need ÷ Efficiency η.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Fertilizer Grade Formula",
              definition: "Active Nutrient (kg) = Bag Mass (kg) × (Grade% / 100); Bag Mass needed = Target kg ÷ (Grade% / 100).",
              practicalExample: "A 50 kg bag of NPK 15-15-15 holds 50 × 0.15 = 7.5 kg N, 7.5 kg P₂O₅, and 7.5 kg K₂O."
            },
            {
              termOrSymbol: "Field Capacity vs Permanent Wilting Point",
              definition: "Plant-available water lies strictly between Field Capacity (after excess gravity water drains) and Wilting Point.",
              practicalExample: "Watering above Field Capacity waterlogs roots, drowning oxygen respiration and leaching nitrates."
            },
            {
              termOrSymbol: "Irrigation Efficiency (V_gross = V_net / η)",
              definition: "Furrow η ≈ 55–60%, Sprinkler η ≈ 75%, Drip η ≈ 90%; lower efficiency demands larger pumped volume.",
              practicalExample: "Delivering 1,800 m³ to roots takes 1,800 / 0.90 = 2,000 m³ by drip vs 1,800 / 0.60 = 3,000 m³ by furrow."
            }
          ],
          workedExamples: [
            {
              title: "Calculating Urea (46-0-0) & NPK (15-15-15) Application Rates",
              problemStatement: "A maize field needs 92 kg of nitrogen (N) per hectare. Compare how many 50-kg bags per hectare are needed using (a) Urea (46% N) vs (b) NPK 20-10-10 (20% N).",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute nitrogen mass inside one 50-kg bag of Urea (46% N).",
                  reasoning: "50 kg × 0.46 = 23 kg N per bag of Urea."
                },
                {
                  stepNumber: 2,
                  instruction: "Find bags of Urea required for 92 kg N.",
                  reasoning: "92 kg ÷ 23 kg/bag = 4 bags of Urea (200 kg/ha)."
                },
                {
                  stepNumber: 3,
                  instruction: "Compute nitrogen mass inside one 50-kg bag of NPK 20-10-10.",
                  reasoning: "50 kg × 0.20 = 10 kg N per bag."
                },
                {
                  stepNumber: 4,
                  instruction: "Divide 92 kg N by 10 kg/bag (or interpret split top-dressing).",
                  reasoning: "92 ÷ 10 = 9.2 bags of NPK 20-10-10 (typically apply 4 bags NPK 20-10-10 at planting for 40 kg N + P/K, then ~2.2 bags Urea at 4 weeks!)."
                }
              ],
              takeawayRule: "Multiply 50 kg by the nutrient percentage first to get active kg per bag, then divide into the field target."
            },
            {
              title: "Scheduling Drip vs Furrow Pump Volume from Crop Water Demand",
              problemStatement: "A vegetable greenhouse requires 2,700 m³ of water in the root zone over a dry season. Compare total pumped water under (a) Drip (90% efficiency) and (b) Unlined Furrow (60% efficiency), and compute water saved.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute gross pumped volume for Drip (η = 0.90).",
                  reasoning: "V_drip = 2,700 ÷ 0.90 = 3,000 m³."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute gross pumped volume for Furrow (η = 0.60).",
                  reasoning: "V_furrow = 2,700 ÷ 0.60 = 4,500 m³."
                },
                {
                  stepNumber: 3,
                  instruction: "Calculate seasonal water saved by Drip.",
                  reasoning: "Water saved = 4,500 − 3,000 = 1,500 m³ (a 33.3% pump reduction)."
                },
                {
                  stepNumber: 4,
                  instruction: "Note salt-buildup management.",
                  reasoning: "Flush periodic small leaching fractions and mulch surface soil to curb evaporation."
                }
              ],
              takeawayRule: "Always DIVIDE net crop demand by efficiency (< 1) so gross pumped volume is larger than root-zone need."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Multiplying crop water need by efficiency (2,700 × 0.90) instead of dividing.",
              whyItIsWrong: "Multiplying predicts you need to pump LESS water than actually reaches the roots, violating conservation of water!",
              correctCorrection: "Losses require pumping MORE water at the source: V_pumped = V_root ÷ efficiency."
            },
            {
              misconception: "Assuming a yellow maize field always lacks water rather than checking older-leaf nitrogen chlorosis.",
              whyItIsWrong: "Over-watering a nitrogen-starved crop leaches remaining nitrate even deeper below roots.",
              correctCorrection: "Inspect lower-leaf yellowing (mobile N moves to new shoots) and distinguish drought wilting from N deficiency."
            }
          ],
          guidedPracticePrompt: "How many kilograms of active N, P₂O₅, and K₂O are inside one 50-kg bag of NPK 20-10-10?",
          independentPracticePrompt: "A crop needs 1,500 m³ net water using a 75% efficient sprinkler system. Calculate gross water pumped.",
          extensionActivity: "Set up two potted bean seedlings—one mulched with dry grass, one bare—to track soil moisture retention days between watering.",
          diagnosticSelfCheck: "Why does watering beyond Field Capacity harm plant roots instead of helping them grow faster?",
          transferApplication: "Compare organic compost + cover-crop green manuring with synthetic Urea for sandy soils prone to rapid leaching.",
          masteryAssessment: "Compute kg of Urea (46% N) needed for 69 kg N, and compute gross water pumped when net = 1,800 m³ at 60% furrow efficiency.",
          summaryRecap: "NPK grade % gives active nutrient mass per bag; N yellows older leaves, P purples roots/stems, K scorches margins; V_pumped = V_root ÷ η with drip reaching ~90% efficiency.",
          estimatedMinutes: 80
        },
        questions: [
          {
            id: "q-jss-irr-1",
            type: "multiple_choice",
            questionText: "How many kilograms (kg) of elemental nitrogen (N) are contained inside one 50-kg bag of NPK 20-10-10 fertilizer?",
            mathExpression: "\\text{Mass N} = 50 \\times 0.20",
            options: ["10", "20", "5", "40"],
            correctAnswer: "10",
            explanation: "The first number (20) gives % N: 50 kg × (20 / 100) = 10 kg N (plus 5 kg P₂O₅ and 5 kg K₂O).",
            hintLadder: [
              "In NPK 20-10-10, the first number is the percentage of Nitrogen.",
              "Find 20% of 50 kg."
            ],
            misconceptionAlerts: [
              { trigger: "20", note: "20 is the percentage (20%), not the mass inside a 50-kg bag (which is half of 100 kg)." }
            ],
            skillId: "skill-jss-soil-fertility-irrigation",
            difficulty: "easy"
          },
          {
            id: "q-jss-irr-2",
            type: "multiple_choice",
            questionText: "Older bottom leaves on a maize plot turn pale yellow in a V-shape along the midrib while young top leaves stay green. Which nutrient is deficient?",
            options: [
              "Nitrogen (N), which plants relocate from old leaves to new shoots",
              "Calcium, which only affects root caps",
              "Excess water saturation",
              "Iron toxicity in top shoots"
            ],
            correctAnswer: "Nitrogen (N), which plants relocate from old leaves to new shoots",
            explanation: "Nitrogen is mobile inside phloem sap, so when soil N runs low, the plant strips chlorophyll nitrogen from old lower leaves to feed growing upper tips.",
            hintLadder: [
              "Which macronutrient forms the core of chlorophyll and moves out of older leaves first?",
              "Uniform/V-shaped chlorosis starting on older lower leaves is the classic Nitrogen signal."
            ],
            misconceptionAlerts: [
              { trigger: "Calcium, which only affects root caps", note: "Calcium is immobile and shows deficiency in young growing tips, not older bottom leaves." }
            ],
            skillId: "skill-jss-soil-fertility-irrigation",
            difficulty: "easy"
          },
          {
            id: "q-jss-irr-3",
            type: "multiple_choice",
            questionText: "An agronomist prescribes 69 kg of nitrogen per hectare using Urea (46-0-0, i.e., 46% N). How many kilograms (kg) of Urea fertilizer must be applied per hectare?",
            mathExpression: "\\text{Mass Urea} = \\frac{69}{0.46}",
            options: ["150", "31.74", "100", "200"],
            correctAnswer: "150",
            explanation: "Mass of Urea = 69 ÷ 0.46 = 150 kg (= three 50-kg bags).",
            hintLadder: [
              "Each 100 kg of Urea delivers 46 kg N (and 50 kg delivers 23 kg N).",
              "69 kg ÷ 0.46 = 150 kg."
            ],
            misconceptionAlerts: [
              { trigger: "31.74", note: "Divide target N by 0.46 instead of multiplying 69 × 0.46!" }
            ],
            skillId: "skill-jss-soil-fertility-irrigation",
            difficulty: "medium"
          },
          {
            id: "q-jss-irr-4",
            type: "multiple_choice",
            questionText: "An onion field needs 2,400 m³ of water delivered into its root zone. Using a sprinkler system operating at 75% application efficiency, how many cubic metres (m³) must be pumped?",
            mathExpression: "V_{\\text{pumped}} = \\frac{2{,}400}{0.75}",
            options: ["3200", "1800", "2400", "3600"],
            correctAnswer: "3200",
            explanation: "V_pumped = V_root ÷ η = 2,400 ÷ 0.75 = 3,200 m³ (since 25% is lost to wind drift and evaporation).",
            hintLadder: [
              "Gross pumped volume must be larger than 2,400 m³ to cover 25% spray losses.",
              "Divide 2,400 by 0.75 (3/4)."
            ],
            misconceptionAlerts: [
              { trigger: "1800", note: "1,800 m³ is LESS than the crop needs; divide by 0.75 instead of multiplying." }
            ],
            skillId: "skill-jss-soil-fertility-irrigation",
            difficulty: "medium"
          },
          {
            id: "q-jss-irr-5",
            type: "multiple_choice",
            questionText: "Why does prolonged flooding above soil Field Capacity stunt upland crops even though water is abundant?",
            options: [
              "Water fills all soil air pores, starving roots of O₂ needed for aerobic respiration and active mineral uptake",
              "Roots absorb too much nitrogen gas directly from standing puddles",
              "Field Capacity permanently turns clay into solid granite",
              "Cold puddle water freezes root xylem in tropical temperatures"
            ],
            correctAnswer: "Water fills all soil air pores, starving roots of O₂ needed for aerobic respiration and active mineral uptake",
            explanation: "Healthy roots respire aerobically to generate ATP for active ion transport; waterlogged pores displace oxygen, halting nutrient uptake and causing root rot.",
            hintLadder: [
              "What gas do roots absorb from soil air spaces between soil crumbs?",
              "Without oxygen, root respiration and ATP-driven mineral absorption stall."
            ],
            misconceptionAlerts: [
              { trigger: "Roots absorb too much nitrogen gas directly from standing puddles", note: "Roots cannot absorb N₂ gas directly and suffer oxygen suffocation in waterlogged soil." }
            ],
            skillId: "skill-jss-soil-fertility-irrigation",
            difficulty: "hard"
          }
        ]
      }
    ]
  }
];
