import { Unit } from "../types/curriculum";

export const P3_SCIENCE_EXPANSION_UNITS: Unit[] = [
  {
    id: "unit-p3-jss-basic-science",
    subjectId: "jss_basic_science",
    level: "junior_secondary",
    title: "Matter, Density, Separation Techniques & Physical-Chemical Change",
    code: "JSS-SCI-201",
    description:
      "Kinetic particle model of solids, liquids, and gases; density and flotation; physical versus chemical transformations; and mixture separation protocols.",
    order: 2,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS2-BSCI-MAT-01",
      "CAMBRIDGE_IGCSE:LOWER-SCI-MAT",
      "WAEC_WASSCE:BECE-SCI-201"
    ],
    skills: [
      {
        id: "skill-jss-matter-separation-density",
        unitId: "unit-p3-jss-basic-science",
        title: "States of Matter, Density & Mixture Separation",
        code: "SKL-JSS-SCI-201",
        summary:
          "Explain phase transitions via kinetic particle spacing, compute mass-volume density for buoyancy predictions, and select exact laboratory separation techniques.",
        objectives: [
          "Compute density ρ = m / V and predict sinking or floating relative to water (1.0 g/cm³)",
          "Match mixture types (immiscible liquids, dissolved solids, dyes, magnetic alloys) to optimal separation apparatus",
          "Distinguish reversible physical state changes from irreversible chemical bond rearrangements"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-percent-ratios"],
        lesson: {
          id: "les-jss-matter-separation-density",
          title: "Particle Architecture, Buoyant Density & Laboratory Separation",
          hookAndIntuition:
            "Why does a steel paperclip sink immediately while cooking oil floats cleanly atop water, and how do chemists rescue pure drinking water from salty brine or separate black ink into rainbow bands?",
          conceptualExplanation:
            "All matter consists of microscopic particles in perpetual motion. In solids, strong intermolecular forces lock particles in fixed vibrational lattices; in liquids, particles slide over neighbours while maintaining constant volume; in gases, rapid collisions fill any container volume. Density ρ = m / V measures mass packed per unit volume. Objects denser than water (ρ > 1.0 g/cm³) sink, whereas less dense substances (ρ < 1.0 g/cm³) float. Separating mixtures relies strictly on exploiting differing physical properties without breaking chemical bonds: filtration captures insoluble solids, simple/fractional distillation separates liquids by boiling point differences, a separating funnel drains denser immiscible liquids, and paper chromatography separates soluble pigments by differential solubility and capillary adsorption.",
          conceptualModel:
            "Separation Decision Tree: Insoluble Solid -> Filtration | Dissolved Solid (keep solvent) -> Distillation | Immiscible Liquids -> Separating Funnel | Soluble Pigments -> Chromatography.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "ρ = m / V  (SI: kg/m³ or g/cm³)",
              definition: "Mass per unit volume; pure liquid water has ρ = 1.0 g/cm³ = 1000 kg/m³.",
              practicalExample: "An 81 g aluminium block of volume 30 cm³ has ρ = 81/30 = 2.7 g/cm³ (sinks in water)."
            },
            {
              termOrSymbol: "R_f = Distance moved by solute / Distance moved by solvent front",
              definition: "Retention factor identifying pure pigments on a chromatogram.",
              practicalExample: "Dye travels 3.6 cm while solvent advances 6.0 cm: R_f = 3.6/6.0 = 0.60."
            },
            {
              termOrSymbol: "Physical vs Chemical Change",
              definition: "Physical change alters state or shape with no new substance; chemical change forms new molecular bonds.",
              practicalExample: "Boiling water is physical; rusting iron (4Fe + 3O₂ -> 2Fe₂O₃) is chemical."
            }
          ],
          workedExamples: [
            {
              title: "Calculating Unknown Metal Density & Flotation Prediction",
              problemStatement: "An irregular mineral sample has mass 156 g. Dropped into a measuring cylinder holding 40.0 cm³ of water, the water meniscus rises to 60.0 cm³. Calculate its density and state whether it floats in mercury (ρ = 13.6 g/cm³).",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Find displaced water volume equal to the submerged mineral's volume.",
                  reasoning: "V = V_final - V_initial = 60.0 cm³ - 40.0 cm³ = 20.0 cm³."
                },
                {
                  stepNumber: 2,
                  instruction: "Divide mass by displaced volume to compute density ρ.",
                  reasoning: "ρ = m / V = 156 g / 20.0 cm³ = 7.8 g/cm³ (consistent with iron/steel)."
                },
                {
                  stepNumber: 3,
                  instruction: "Compare sample density with water (1.0 g/cm³) and mercury (13.6 g/cm³).",
                  reasoning: "7.8 > 1.0 so it sinks in water, yet 7.8 < 13.6 so it floats in liquid mercury."
                },
                {
                  stepNumber: 4,
                  instruction: "Convert 7.8 g/cm³ to SI units kg/m³ for laboratory reporting.",
                  reasoning: "Multiply g/cm³ by 1000: 7.8 × 1000 = 7800 kg/m³."
                }
              ],
              takeawayRule: "Flotation is strictly relative: a dense metal like iron sinks in water yet floats effortlessly on denser liquid mercury."
            },
            {
              title: "Multi-Step Mixture Separation Sequence",
              problemStatement: "Design the exact sequential laboratory procedure to recover pure dry sand, dry salt crystals, and pure liquid water from a single mixture of sand, sodium chloride, and water.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Pour the slurry through filter paper inside a funnel.",
                  reasoning: "Insoluble sand stays behind as the residue; aqueous salt solution passes through as the filtrate."
                },
                {
                  stepNumber: 2,
                  instruction: "Wash the sand residue with distilled water and oven-dry it.",
                  reasoning: "Removes trapped brine so pure dry sand is recovered."
                },
                {
                  stepNumber: 3,
                  instruction: "Heat the salt-water filtrate inside a distillation flask fitted with a Liebig condenser.",
                  reasoning: "Pure water vaporizes at 100 °C, condenses in the cooled Liebig jacket, and collects as pure distillate."
                },
                {
                  stepNumber: 4,
                  instruction: "Concentrate the remaining brine and allow controlled cooling crystallization.",
                  reasoning: "Avoid overheating to dryness if large hydrated crystals are desired; dry pure sodium chloride crystals remain."
                }
              ],
              takeawayRule: "Always distinguish whether you want to SAVE the solvent (use distillation) or discard the vapour (use evaporation)."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking heavy objects always sink and light objects always float regardless of volume.",
              whyItIsWrong: "A hollow 10,000-tonne steel ship floats because its total enclosed volume keeps average density below 1.0 g/cm³.",
              correctCorrection: "Compare average density (mass / total volume) against fluid density, never total mass alone."
            },
            {
              misconception: "Using simple evaporation instead of distillation when pure water must be collected.",
              whyItIsWrong: "Open evaporation vents pure water vapour into the laboratory air, losing the solvent permanently.",
              correctCorrection: "Attach a Liebig condenser (simple distillation) whenever the liquid solvent is needed."
            }
          ],
          guidedPracticePrompt: "If 250 cm³ of palm oil has mass 225 g, calculate its density and explain how a separating funnel isolates it from water.",
          independentPracticePrompt: "Determine R_f when an ink component moves 4.2 cm and the water solvent front reaches 7.0 cm.",
          extensionActivity: "Explain why ethanol (b.p. 78 °C) and water (b.p. 100 °C) require fractional distillation with glass beads rather than simple distillation.",
          diagnosticSelfCheck: "Why does the temperature plateau at 100 °C while water boils despite continuous heating?",
          transferApplication: "Explain how municipal water treatment uses coagulation, sedimentation, sand filtration, and chlorination sequentially.",
          masteryAssessment: "Compute the mass of a gold ingot (ρ = 19.3 g/cm³) measuring 10 cm × 5 cm × 2 cm.",
          summaryRecap: "Apply ρ = m/V to predict buoyancy, differentiate physical from chemical transformations, and select separation techniques matched to particle solubility and boiling points.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-p3-jss-sci-1",
            type: "multiple_choice",
            questionText: "A rectangular stone block of volume 40 cm³ has a mass of 108 g. What is its density, and will it float or sink in pure water?",
            mathExpression: "\\rho = \\frac{m}{V}",
            options: ["2.7 g/cm³ (sinks)", "2.7 g/cm³ (floats)", "0.37 g/cm³ (floats)", "4320 g/cm³ (sinks)"],
            correctAnswer: "2.7 g/cm³ (sinks)",
            explanation: "ρ = 108 / 40 = 2.7 g/cm³. Because 2.7 g/cm³ > 1.0 g/cm³ (water), the stone sinks.",
            hintLadder: [
              "Divide mass 108 g by volume 40 cm³.",
              "Compare your value to water's density 1.0 g/cm³.",
              "Substances denser than water sink."
            ],
            misconceptionAlerts: [
              { trigger: "0.37 g/cm³ (floats)", note: "40/108 inverts the formula; density is always mass divided by volume." }
            ],
            skillId: "skill-jss-matter-separation-density",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p3-jss-sci-2",
            type: "multiple_choice",
            questionText: "Which laboratory apparatus is specifically designed to separate two immiscible liquids of different densities, such as kerosene and water?",
            options: ["Separating funnel", "Paper chromatogram", "Liebig condenser", "Sublimation dish"],
            correctAnswer: "Separating funnel",
            explanation: "Immiscible liquids form two distinct layers based on density; opening the tap of a separating funnel drains the denser bottom layer cleanly.",
            hintLadder: [
              "Immiscible means the liquids do not dissolve in each other and form layers.",
              "Which apparatus has a bottom stopcock tap to drain the lower layer?",
              "Chromatography and condensers rely on solubility or boiling points instead."
            ],
            misconceptionAlerts: [
              { trigger: "Liebig condenser", note: "Condensers are used in distillation for miscible liquids with distinct boiling points." }
            ],
            skillId: "skill-jss-matter-separation-density",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p3-jss-sci-3",
            type: "multiple_choice",
            questionText: "During paper chromatography, a green food dye travels 4.5 cm from the baseline while the solvent front travels 7.5 cm. Calculate the R_f value of the dye.",
            mathExpression: "R_f = \\frac{d_{\\text{solute}}}{d_{\\text{solvent}}}",
            options: ["0.60", "1.67", "0.30", "3.00"],
            correctAnswer: "0.60",
            explanation: "R_f = 4.5 cm / 7.5 cm = 45 / 75 = 3 / 5 = 0.60. By definition, R_f never exceeds 1.0.",
            hintLadder: [
              "Remember R_f is always less than or equal to 1.",
              "Divide solute travel distance (4.5) by solvent front travel distance (7.5).",
              "Simplify 45/75 = 3/5."
            ],
            misconceptionAlerts: [
              { trigger: "1.67", note: "A retention factor greater than 1.0 is physically impossible because the dye cannot overtake the solvent front." }
            ],
            skillId: "skill-jss-matter-separation-density",
            difficulty: "medium",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          },
          {
            id: "q-p3-jss-sci-4",
            type: "multiple_choice",
            questionText: "Which of the following processes represents an irreversible CHEMICAL change rather than a physical change?",
            options: [
              "Burning magnesium ribbon in air to form white magnesium oxide ash",
              "Subliming solid iodine crystals into violet iodine vapour",
              "Dissolving crystalline sugar completely into warm water",
              "Melting solid paraffin wax over a Bunsen flame"
            ],
            correctAnswer: "Burning magnesium ribbon in air to form white magnesium oxide ash",
            explanation: "Combustion reacts magnesium chemically with oxygen (2Mg + O₂ -> 2MgO) creating a new compound with distinct properties.",
            hintLadder: [
              "State changes (melting, subliming) and dissolving remain chemically the same substance.",
              "Look for combustion or formation of a brand-new chemical compound.",
              "Magnesium oxide is a new ionic compound, not metallic magnesium."
            ],
            misconceptionAlerts: [
              { trigger: "Subliming solid iodine crystals into violet iodine vapour", note: "Sublimation only changes solid I₂ directly into gaseous I₂; no new chemical substance forms." }
            ],
            skillId: "skill-jss-matter-separation-density",
            difficulty: "medium",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p3-jss-sci-5",
            type: "multiple_choice",
            questionText: "A sealed metal container holds 200 cm³ of a gas at room temperature. If a piston compresses the gas to 100 cm³ without changing its mass, what happens to the gas density and particle collision rate?",
            options: [
              "Density doubles and particle collisions per second against walls increase",
              "Density halves and particle speed immediately drops to zero",
              "Density stays constant because gas mass did not change",
              "Particle mass doubles while container volume halves"
            ],
            correctAnswer: "Density doubles and particle collisions per second against walls increase",
            explanation: "Since ρ = m / V and mass m is fixed, halving V doubles density (2m / V). Packing the same particles into half the space increases wall collision frequency.",
            hintLadder: [
              "Mass m is constant inside a sealed container.",
              "If V decreases to V/2 in ρ = m/V, how does ρ change?",
              "More crowded molecules strike container walls more frequently."
            ],
            misconceptionAlerts: [
              { trigger: "Density stays constant because gas mass did not change", note: "Density depends on BOTH mass and volume (m/V), not mass alone." }
            ],
            skillId: "skill-jss-matter-separation-density",
            difficulty: "hard",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          }
        ]
      }
    ]
  },
  {
    id: "unit-p3-jss-agric-science",
    subjectId: "jss_agric_science",
    level: "junior_secondary",
    title: "Soil Composition, Crop Rotation & Integrated Pest Management",
    code: "JSS-AGR-202",
    description:
      "Soil horizons and sand-silt-clay mineral fractions, biological nitrogen fixation via four-year crop rotation, and integrated pest management.",
    order: 2,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS2-AGR-SOIL-01",
      "WAEC_WASSCE:BECE-AGR-202"
    ],
    skills: [
      {
        id: "skill-jss-soil-crop-husbandry",
        unitId: "unit-p3-jss-agric-science",
        title: "Soil Profiles, Legume Rotation & Pest Control",
        code: "SKL-JSS-AGR-202",
        summary:
          "Evaluate soil water retention across sand, clay, and loam, design restorative crop rotations with legumes, and balance biological vs chemical pest control.",
        objectives: [
          "Compare drainage, aeration, and nutrient retention across sandy, clay, and loamy soils",
          "Design four-course crop rotations pairing deep-rooted tubers, cereals, and nitrogen-fixing legumes",
          "Apply Integrated Pest Management (IPM) combining cultural, biological, and selective chemical controls"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-percent-ratios"],
        lesson: {
          id: "les-jss-soil-crop-husbandry",
          title: "Agronomic Soil Science, Rotation Cycles & Integrated Pest Control",
          hookAndIntuition:
            "Planting maize on the exact same plot every single season silently drains nitrogen until yields collapse—yet alternating maize with cowpea or groundnut invites root bacteria that pull free nitrogen straight from the air!",
          conceptualExplanation:
            "Productive agricultural soil comprises roughly 45% weathered mineral particles, 25% soil air, 25% capillary soil water, and 5% organic humus. Sandy soils have large pore spaces causing rapid drainage and poor nutrient holding; heavy clay soils pack fine particles tightly, causing waterlogging and poor root aeration; loam balances sand, silt, clay, and humus for optimal fertility. Crop rotation prevents monoculture nutrient depletion and breaks host-specific pest cycles: deep-rooted crops (cassava/yam) follow shallow-rooted cereals (maize/millet), followed by legumes (cowpea/soybean) hosting Rhizobium bacteria in root nodules that fix atmospheric N₂ into usable nitrates.",
          conceptualModel:
            "4-Course Rotation Cycle: Yam (Deep Feeder) -> Maize (Shallow Cereal) -> Cowpea (N₂-Fixing Legume) -> Fallow / Leafy Cover Crop.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Loamy Soil Ideal Profile (45% Mineral, 25% Air, 25% Water, 5% Humus)",
              definition: "Balanced agricultural medium combining high aeration, capillary moisture retention, and humic cation exchange.",
              practicalExample: "Adding compost humus to sandy soil improves both moisture holding and mineral fertility."
            },
            {
              termOrSymbol: "Rhizobium Legume Symbiosis",
              definition: "Mutualistic bacteria inside legume root nodules converting atmospheric N₂ into soluble ammonium/nitrate.",
              practicalExample: "Rotating cowpea before maize supplies natural nitrogen for the next cereal harvest."
            },
            {
              termOrSymbol: "Integrated Pest Management (IPM)",
              definition: "Coordinated suppression of pests below economic injury level using resistant varieties, predators, rotation, and targeted sprays.",
              practicalExample: "Releasing ladybird beetles to control aphids before considering narrow-spectrum insecticides."
            }
          ],
          workedExamples: [
            {
              title: "Evaluating Soil Texture & Water Retention Laboratory Results",
              problemStatement: "Three equal 100 g dry soil samples (X, Y, Z) receive 100 mL of water poured into funnels. After 30 minutes, drained water collected is: X = 78 mL, Y = 18 mL, Z = 48 mL. Classify X, Y, Z and recommend one for vegetable farming.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute water retained inside each 100 g sample (100 mL - drained volume).",
                  reasoning: "X retains 22 mL; Y retains 82 mL; Z retains 52 mL."
                },
                {
                  stepNumber: 2,
                  instruction: "Match extreme drainage (X) and waterlogging (Y) to particle sizes.",
                  reasoning: "Large sand grains drain rapidly -> X is Sandy. Microscopic clay platelets trap water -> Y is Clay."
                },
                {
                  stepNumber: 3,
                  instruction: "Identify the balanced middle sample Z.",
                  reasoning: "Z holds 52 mL moisture while draining 48 mL excess for oxygen aeration -> Z is Loam."
                },
                {
                  stepNumber: 4,
                  instruction: "Select the optimal soil for vegetable cropping and justify.",
                  reasoning: "Recommend Z (Loam), because roots require simultaneous access to dissolved nutrients and oxygen gas without rotting."
                }
              ],
              takeawayRule: "High water drainage means large sandy pores; excessive retention means fine clay; balanced retention plus drainage defines productive loam."
            },
            {
              title: "Designing a Restorative Four-Year Crop Rotation",
              problemStatement: "A farmer must grow Yam, Maize, Cassava, and Groundnut across 4 plots over 4 years without exhausting soil nitrogen or multiplying yam beetles.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Avoid placing two tubers (Yam and Cassava) or two cereals consecutively.",
                  reasoning: "Consecutive deep tubers strip potassium and concentrate tuber pests."
                },
                {
                  stepNumber: 2,
                  instruction: "Insert the legume (Groundnut) immediately preceding high-nitrogen Maize.",
                  reasoning: "Rhizobium nodules on Groundnut replenish soil nitrates needed by Maize."
                },
                {
                  stepNumber: 3,
                  instruction: "Arrange the 4-year cycle cleanly: Year 1 Yam -> Year 2 Groundnut -> Year 3 Maize -> Year 4 Cassava.",
                  reasoning: "Alternates deep root -> shallow legume fixer -> shallow cereal -> deep tuber."
                },
                {
                  stepNumber: 4,
                  instruction: "Shift the cycle across Plots A-D so all four crops are harvested every year.",
                  reasoning: "Plot A starts Year 1 on Yam, Plot B on Groundnut, Plot C on Maize, Plot D on Cassava—maintaining annual food diversity."
                }
              ],
              takeawayRule: "Place nitrogen-fixing legumes directly ahead of heavy nitrogen-feeding cereals, and separate morphologically similar crops."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking clay soil is best for crops simply because it holds the most water.",
              whyItIsWrong: "Saturated clay expels soil air, suffocating plant roots and encouraging anaerobic root rot.",
              correctCorrection: "Roots require both water AND oxygen pores; balanced loam outperforms pure clay."
            },
            {
              misconception: "Believing crop rotation means abandoning the land completely every second year.",
              whyItIsWrong: "Crop rotation keeps every plot productive every season by rotating botanically distinct crop families.",
              correctCorrection: "Distinguish active multi-family crop rotation from idle bush fallowing."
            }
          ],
          guidedPracticePrompt: "Explain why earthworms (soil macro-organisms) improve heavy clay soil structure.",
          independentPracticePrompt: "Arrange Spinach, Cowpea, and Sorghum into a 3-year sequence and justify the placement of Cowpea.",
          extensionActivity: "Compare broad-spectrum organophosphate pesticides with biological Integrated Pest Management in terms of pollinator survival.",
          diagnosticSelfCheck: "Which soil horizon (A, B, or C) holds the richest humus and why?",
          transferApplication: "Calculate drainage percentage if 120 mL water poured onto 150 g soil yields 36 mL filtrate.",
          masteryAssessment: "Diagnose a farm suffering severe stem-borer infestation after 5 continuous years of maize monoculture and propose a two-pronged fix.",
          summaryRecap: "Loam balances drainage and aeration; legume rotation restores nitrates biologically; IPM protects yield while preserving beneficial ecology.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-p3-jss-agr-1",
            type: "multiple_choice",
            questionText: "Which soil type combines balanced sand, silt, clay, and organic humus to provide optimal aeration and water retention for most crops?",
            options: ["Loamy soil", "Coarse sandy soil", "Pure kaolin clay", "Gravelly subsoil"],
            correctAnswer: "Loamy soil",
            explanation: "Loam contains intermediate fractions of sand (for drainage/aeration), silt/clay (for mineral and moisture retention), and humus.",
            hintLadder: [
              "Extreme sand dries too fast; extreme clay waterlogs.",
              "Look for the balanced mixture containing humus.",
              "Vegetables and arable crops thrive best in loam."
            ],
            misconceptionAlerts: [
              { trigger: "Pure kaolin clay", note: "Pure clay drains poorly and suffocates aerobic root respiration." }
            ],
            skillId: "skill-jss-soil-crop-husbandry",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p3-jss-agr-2",
            type: "multiple_choice",
            questionText: "Why are leguminous crops such as cowpea or groundnut deliberately included in a multi-year crop rotation?",
            options: [
              "Symbiotic Rhizobium bacteria in their root nodules fix atmospheric nitrogen into soil nitrates",
              "Their deep taproots pull metallic iron ore up from bedrock",
              "They sterilize the soil completely so no soil microbes survive",
              "They double the acidity of alkaline soils within one week"
            ],
            correctAnswer: "Symbiotic Rhizobium bacteria in their root nodules fix atmospheric nitrogen into soil nitrates",
            explanation: "Rhizobium bacteria convert inert atmospheric N₂ gas into ammonia/nitrate compounds usable by subsequent cereal crops.",
            hintLadder: [
              "Think about what nutrient cereals (like maize) deplete most heavily.",
              "Inspect legume root nodules for beneficial bacteria.",
              "Rhizobium fixes nitrogen gas."
            ],
            misconceptionAlerts: [
              { trigger: "They sterilize the soil completely so no soil microbes survive", note: "Legumes enrich beneficial soil microbial life rather than sterilizing it." }
            ],
            skillId: "skill-jss-soil-crop-husbandry",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p3-jss-agr-3",
            type: "multiple_choice",
            questionText: "In a soil drainage test, 100 mL of water is poured onto 80 g of Soil S, and 72 mL drains out within 15 minutes. What percentage of water was RETAINED by Soil S?",
            options: ["28%", "72%", "90%", "18%"],
            correctAnswer: "28%",
            explanation: "Water retained = 100 mL - 72 mL = 28 mL. Percentage retained = (28 / 100) × 100% = 28% (characteristic of sandy soil).",
            hintLadder: [
              "Subtract the drained volume (72 mL) from the initial added volume (100 mL).",
              "Retained water = 28 mL.",
              "Express 28 mL out of 100 mL as a percentage."
            ],
            misconceptionAlerts: [
              { trigger: "72%", note: "72% is the percentage DRAINED, whereas the question asks for water RETAINED." }
            ],
            skillId: "skill-jss-soil-crop-husbandry",
            difficulty: "medium",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p3-jss-agr-4",
            type: "multiple_choice",
            questionText: "Which vertical soil horizon contains the highest concentration of decayed organic humus and active plant feeder roots?",
            options: ["Horizon A (Topsoil)", "Horizon C (Weathered parent rock)", "Horizon R (Unweathered bedrock)", "Impervious hardpan"],
            correctAnswer: "Horizon A (Topsoil)",
            explanation: "Topsoil (Horizon A) is dark, biologically active, and rich in humus formed from decomposed plant and animal litter.",
            hintLadder: [
              "Organic litter falls on the uppermost soil surface.",
              "Horizon A is the dark topsoil layer supporting root uptake.",
              "Horizons C and R lie deepest near unweathered rock."
            ],
            misconceptionAlerts: [
              { trigger: "Horizon C (Weathered parent rock)", note: "Horizon C consists mainly of fractured mineral fragments lacking organic humus." }
            ],
            skillId: "skill-jss-soil-crop-husbandry",
            difficulty: "medium",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p3-jss-agr-5",
            type: "multiple_choice",
            questionText: "A farm adopting Integrated Pest Management (IPM) introduces parasitic wasps to suppress cassava mealybugs while alternating crops and removing infected stalks. Which statement best describes this strategy?",
            options: [
              "It integrates biological predators with cultural sanitation to keep pests below economic damage thresholds sustainably",
              "It relies exclusively on maximum-dose synthetic spraying every 48 hours",
              "It aims to eradicate every insect species including pollinating honeybees",
              "It abandons pest monitoring until 90% of the harvest is destroyed"
            ],
            correctAnswer: "It integrates biological predators with cultural sanitation to keep pests below economic damage thresholds sustainably",
            explanation: "IPM prioritizes biological control (natural enemies) and cultural methods (rotation, sanitation), reserving selective chemical intervention only if thresholds are breached.",
            hintLadder: [
              "Identify the two methods used: parasitic wasps (biological) + crop rotation/sanitation (cultural).",
              "IPM manages pests below economic injury thresholds without wiping out beneficial pollinators.",
              "Select the option describing multi-tactic ecological suppression."
            ],
            misconceptionAlerts: [
              { trigger: "It relies exclusively on maximum-dose synthetic spraying every 48 hours", note: "Routine heavy spraying breeds pesticide resistance and harms beneficial predators." }
            ],
            skillId: "skill-jss-soil-crop-husbandry",
            difficulty: "hard",
            curriculumStandard: "WAEC_WASSCE"
          }
        ]
      }
    ]
  },
  {
    id: "unit-p3-sss-physics-mechanics-heat",
    subjectId: "sss_physics_mechanics",
    level: "senior_secondary",
    title: "Elasticity, Fluid Statics & Thermal Calorimetry",
    code: "PHY-MECH-302",
    description:
      "Hooke's law and Young's modulus of solids, Pascal pressure and Archimedes' upthrust in fluids, and specific/latent heat energy balances.",
    order: 2,
    category: "core",
    estimatedHours: 5.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:SSS-PHY-ELAST-HEAT",
      "JAMB_UTME:PHY-MATTER-THERM",
      "CAMBRIDGE_IGCSE:0625-THERM-MAT"
    ],
    skills: [
      {
        id: "skill-sss-elasticity-calorimetry",
        unitId: "unit-p3-sss-physics-mechanics-heat",
        title: "Hooke's Law, Upthrust & Heat Calorimetry",
        code: "SKL-PHY-MECH-302",
        summary:
          "Compute tensile stress-strain Young's modulus, fluid buoyancy upthrust, and multi-phase thermal equilibrium mixtures using Q = mcΔθ + mL.",
        objectives: [
          "Calculate Young's modulus E = (FL)/(Ae) and elastic strain energy U = 0.5 Fe within Hooke's limit",
          "Apply Archimedes' Principle (Upthrust = Weight of displaced fluid = ρVg) to submerged and floating bodies",
          "Solve calorimetry mixtures combining specific heat capacity mcΔθ and latent heat mL"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-phy-kinematics", "skill-phy-work-energy"],
        lesson: {
          id: "les-sss-elasticity-calorimetry",
          title: "Mechanics of Solids, Fluid Upthrust & Phase-Change Calorimetry",
          hookAndIntuition:
            "Why does a steel crane cable stretch predictably up to its elastic limit, why do icebergs float with 90% submerged, and why does 100 °C steam scald far more severely than 100 °C water?",
          conceptualExplanation:
            "Hooke's Law states that below the proportional limit, extension e is directly proportional to stretching force F: F = ke. Normalizing force by cross-sectional area A gives Stress σ = F/A (N/m²), and normalizing extension by original length L gives dimensionless Strain ε = e/L. Their ratio is Young's Modulus E = σ/ε = FL/(Ae), an intrinsic material stiffness constant. In fluids, hydrostatic pressure increases with depth h as P = ρgh, generating upward buoyant Upthrust U = ρ_fluid V_sub g equal to the weight of displaced fluid (Archimedes' Principle). In thermal physics, raising temperature requires sensible heat Q = mcΔθ, while melting or boiling at constant temperature requires latent heat Q = mL to break intermolecular bonds without raising kinetic temperature.",
          conceptualModel:
            "Solids: E = (F/A)/(e/L)  |  Fluids: Upthrust = ρ_fluid V_sub g  |  Thermal: Heat Lost = Heat Gained => Σ(mcΔθ + mL) = 0.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "E = (F L) / (A e),   U_elastic = (1/2) F e = (1/2) k e^2",
              definition: "Young's modulus (Pa) and elastic potential energy stored under tensile deformation.",
              practicalExample: "F = 200 N stretching wire by e = 4 mm stores 0.5 × 200 × 0.004 = 0.40 J."
            },
            {
              termOrSymbol: "U = ρ_fluid · V_sub · g",
              definition: "Archimedes' buoyant force equals weight of displaced fluid.",
              practicalExample: "0.002 m³ iron block in water (1000 kg/m³) loses apparent weight 1000×0.002×10 = 20 N."
            },
            {
              termOrSymbol: "Q = m c Δθ  (sensible)   |   Q = m L  (latent phase change)",
              definition: "Energy balances for temperature rise and isothermal melting/vaporization.",
              practicalExample: "Melting 0.5 kg ice at 0 °C absorbs 0.5 × 3.36×10⁵ = 1.68×10⁵ J."
            }
          ],
          workedExamples: [
            {
              title: "Young's Modulus & Elastic Potential Energy in a Structural Steel Wire",
              problemStatement: "A steel wire of original length 2.5 m and cross-sectional area 2.0 × 10⁻⁶ m² supports a load of 400 N. Given E_steel = 2.0 × 10¹¹ Pa, find the extension e and stored elastic strain energy.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Rearrange E = (FL)/(Ae) to solve for extension e.",
                  reasoning: "e = (F L) / (A E)."
                },
                {
                  stepNumber: 2,
                  instruction: "Substitute consistent SI values carefully.",
                  reasoning: "e = (400 × 2.5) / (2.0 × 10⁻⁶ × 2.0 × 10¹¹) = 1000 / (4.0 × 10⁵) = 2.5 × 10⁻³ m = 2.5 mm."
                },
                {
                  stepNumber: 3,
                  instruction: "Compute tensile stress σ = F/A as an engineering check against yield limits.",
                  reasoning: "σ = 400 / (2.0 × 10⁻⁶) = 2.0 × 10⁸ Pa = 200 MPa (safely elastic for high-tensile steel)."
                },
                {
                  stepNumber: 4,
                  instruction: "Calculate elastic potential energy stored in the wire.",
                  reasoning: "U = (1/2) F e = 0.5 × 400 × (2.5 × 10⁻³) = 0.50 J."
                }
              ],
              takeawayRule: "Convert mm² to m² (×10⁻⁶) and mm to m (×10⁻³) before substituting into Young's modulus equations."
            },
            {
              title: "Phase-Change Calorimetry: Cooling Steam into Liquid Mixture",
              problemStatement: "Calculate the final equilibrium temperature when 0.20 kg of water at 80 °C is mixed with 0.60 kg of water at 20 °C in an insulated vessel (c_water = 4200 J kg⁻¹ K⁻¹).",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Let T be the common equilibrium temperature between 20 °C and 80 °C.",
                  reasoning: "Hot water cools from 80 °C to T; cold water warms from 20 °C to T."
                },
                {
                  stepNumber: 2,
                  instruction: "Set Heat Lost by hot water equal to Heat Gained by cold water.",
                  reasoning: "m_hot c (80 - T) = m_cold c (T - 20)."
                },
                {
                  stepNumber: 3,
                  instruction: "Cancel identical specific heat capacity c on both sides and substitute masses.",
                  reasoning: "0.20(80 - T) = 0.60(T - 20)  ==>  16 - 0.20T = 0.60T - 12."
                },
                {
                  stepNumber: 4,
                  instruction: "Solve linearly for equilibrium temperature T.",
                  reasoning: "28 = 0.80T  ==>  T = 28 / 0.80 = 35 °C."
                }
              ],
              takeawayRule: "Always write temperature differences Δθ as (T_high - T_low) > 0 on both sides so Heat Lost = Heat Gained never flips signs."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Forgetting the 1/2 factor in elastic strain energy, writing W = F × e.",
              whyItIsWrong: "Force increases linearly from 0 to F during stretching, so the average force is (1/2)F, not constant F.",
              correctCorrection: "Use the triangular area under the F-e graph: Strain Energy = 0.5 F e."
            },
            {
              misconception: "Confusing apparent submerged weight with buoyant upthrust.",
              whyItIsWrong: "Apparent weight is W_air - U; Upthrust U alone equals the weight of displaced fluid.",
              correctCorrection: "Read spring-balance loss in water directly as Upthrust: U = W_air - W_water."
            }
          ],
          guidedPracticePrompt: "A spring extends by 3 cm under 15 N. What total extension occurs under 25 N, and what elastic energy is stored?",
          independentPracticePrompt: "A brass block weighs 12 N in air and 10.5 N when fully immersed in water (ρ = 1000 kg/m³). Find its volume.",
          extensionActivity: "Explain why ice of density 0.92 g/cm³ floats in seawater (1.03 g/cm³) with ~89.3% submerged.",
          diagnosticSelfCheck: "Why does temperature stay flat at 0 °C while an ice cube melts?",
          transferApplication: "Size an electric kettle heating coil (2000 W) to heat 1.5 kg of water from 25 °C to 100 °C.",
          masteryAssessment: "Compute how much heat is released when 0.05 kg of steam at 100 °C condenses to water at 100 °C (L_v = 2.26 × 10⁶ J/kg).",
          summaryRecap: "Normalize material elasticity via Stress/Strain = E, equate fluid upthrust to displaced fluid weight, and balance sensible + latent heat transfers cleanly.",
          estimatedMinutes: 115
        },
        questions: [
          {
            id: "q-p3-phy-m-1",
            type: "multiple_choice",
            questionText: "A helical spring obeys Hooke's law and stretches by 4.0 cm when a 12 N mass hangs from it. How much elastic potential energy is stored in the stretched spring?",
            mathExpression: "U = \\frac{1}{2} F e",
            options: ["0.24 J", "0.48 J", "24 J", "48 J"],
            correctAnswer: "0.24 J",
            explanation: "Convert e = 4.0 cm = 0.04 m. Elastic energy U = 0.5 × 12 N × 0.04 m = 0.24 J.",
            hintLadder: [
              "Convert extension from cm to metres (0.04 m).",
              "Use elastic energy U = 0.5 × F × e.",
              "Compute 0.5 × 12 × 0.04."
            ],
            misconceptionAlerts: [
              { trigger: "0.48 J", note: "0.48 J forgets the 1/2 triangle factor for linearly increasing spring force." }
            ],
            skillId: "skill-sss-elasticity-calorimetry",
            difficulty: "easy",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p3-phy-m-2",
            type: "multiple_choice",
            questionText: "An aluminium cylinder weighs 27 N in air and 17 N when completely submerged in water (g = 10 m/s²). What is the buoyant upthrust acting on it?",
            options: ["10 N", "17 N", "27 N", "44 N"],
            correctAnswer: "10 N",
            explanation: "By Archimedes' principle, Upthrust = Weight in air - Apparent weight in fluid = 27 N - 17 N = 10 N.",
            hintLadder: [
              "Upthrust reduces the reading on the spring balance.",
              "Subtract apparent submerged weight from weight in air.",
              "27 N - 17 N = 10 N."
            ],
            misconceptionAlerts: [
              { trigger: "17 N", note: "17 N is the remaining apparent weight (tension in the balance), not the upthrust." }
            ],
            skillId: "skill-sss-elasticity-calorimetry",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p3-phy-m-3",
            type: "multiple_choice",
            questionText: "How much thermal energy is needed to melt 0.25 kg of ice at 0 °C completely into liquid water at 0 °C? (Specific latent heat of fusion L_f = 3.36 × 10⁵ J/kg)",
            mathExpression: "Q = m L_f",
            options: ["8.4 × 10⁴ J", "1.34 × 10⁶ J", "8.4 × 10⁵ J", "3.36 × 10⁵ J"],
            correctAnswer: "8.4 × 10⁴ J",
            explanation: "Q = m L_f = 0.25 × 3.36 × 10⁵ = 0.84 × 10⁵ = 8.4 × 10⁴ J.",
            hintLadder: [
              "Since temperature remains 0 °C, use latent heat Q = mL_f.",
              "Multiply 0.25 (one quarter) by 3.36 × 10⁵.",
              "3.36 / 4 = 0.84, so 0.84 × 10⁵ = 8.4 × 10⁴ J."
            ],
            misconceptionAlerts: [
              { trigger: "1.34 × 10⁶ J", note: "Dividing L_f by 0.25 instead of multiplying increases the answer 16-fold." }
            ],
            skillId: "skill-sss-elasticity-calorimetry",
            difficulty: "medium",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p3-phy-m-4",
            type: "multiple_choice",
            questionText: "A copper wire of length 2.0 m and cross-sectional area 1.0 × 10⁻⁶ m² experiences a tensile force of 55 N. If Young's modulus for copper is 1.1 × 10¹¹ Pa, calculate the extension e.",
            mathExpression: "E = \\frac{FL}{Ae}",
            options: ["1.0 mm", "0.5 mm", "2.0 mm", "10 mm"],
            correctAnswer: "1.0 mm",
            explanation: "e = FL / (AE) = (55 × 2.0) / (1.0 × 10⁻⁶ × 1.1 × 10¹¹) = 110 / (1.1 × 10⁵) = 1.0 × 10⁻³ m = 1.0 mm.",
            hintLadder: [
              "Rearrange Young's modulus: e = FL / (AE).",
              "Compute numerator: 55 × 2.0 = 110 N·m.",
              "Divide by denominator 1.1 × 10⁵ and convert metres to mm."
            ],
            misconceptionAlerts: [
              { trigger: "10 mm", note: "Watch powers of 10 carefully: 10⁻⁶ × 10¹¹ = 10⁵, and 110 / 110,000 = 0.001 m = 1.0 mm." }
            ],
            skillId: "skill-sss-elasticity-calorimetry",
            difficulty: "medium",
            curriculumStandard: "JAMB_UTME"
          },
          {
            id: "q-p3-phy-m-5",
            type: "multiple_choice",
            questionText: "A solid wooden cube of relative density 0.75 floats upright in pure water (ρ = 1000 kg/m³). What fraction of its total height emerges ABOVE the waterline?",
            options: ["1/4 (25%)", "3/4 (75%)", "1/3 (33%)", "1/2 (50%)"],
            correctAnswer: "1/4 (25%)",
            explanation: "Floating equilibrium balances weight against upthrust: ρ_wood V g = ρ_water V_sub g => V_sub / V = 0.75 (75% submerged), leaving 1 - 0.75 = 0.25 (25%) above water.",
            hintLadder: [
              "Equate total weight ρ_obj V g to displaced water weight ρ_w V_sub g.",
              "Fraction submerged = ρ_obj / ρ_w = 0.75.",
              "The question asks for the fraction ABOVE water: 1 - 0.75."
            ],
            misconceptionAlerts: [
              { trigger: "3/4 (75%)", note: "75% is the fraction SUBMERGED below water; 25% remains exposed above." }
            ],
            skillId: "skill-sss-elasticity-calorimetry",
            difficulty: "hard",
            curriculumStandard: "JAMB_UTME"
          }
        ]
      }
    ]
  },
  {
    id: "unit-p3-sss-physics-waves-em",
    subjectId: "sss_physics_waves_electromagnetism",
    level: "senior_secondary",
    title: "Wave Optics, Thin Lenses & Electric Circuits",
    code: "PHY-OPT-303",
    description:
      "Wave speed-frequency relation, Snell's refraction law and total internal reflection, thin-lens imaging equations, and series-parallel DC circuits.",
    order: 2,
    category: "core",
    estimatedHours: 5.5,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:SSS-PHY-WAV-ELEC",
      "JAMB_UTME:PHY-OPTICS-DC",
      "CAMBRIDGE_IGCSE:0625-WAVES-ELEC"
    ],
    skills: [
      {
        id: "skill-sss-optics-circuits-induction",
        unitId: "unit-p3-sss-physics-waves-em",
        title: "Refraction, Lens Equations & Series-Parallel DC Circuits",
        code: "SKL-PHY-OPT-303",
        summary:
          "Apply v = fλ, Snell's law n = sin i / sin r, the Gaussian thin-lens sign convention, and Ohm/Kirchhoff circuit analysis.",
        objectives: [
          "Solve Snell's refraction and critical-angle total internal reflection sin c = 1/n problems",
          "Apply the thin-lens equation 1/f = 1/u + 1/v and magnification m = v/u using Real-is-Positive conventions",
          "Calculate equivalent resistance, branch currents, and terminal potential difference E = I(R + r) in DC networks"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-phy-work-energy", "skill-linear-equations"],
        lesson: {
          id: "les-sss-optics-circuits-induction",
          title: "Wave Optics, Lens Imaging & Electrodynamic Circuit Analysis",
          hookAndIntuition:
            "Every optical fibre carrying trans-oceanic internet flashes relies on total internal reflection, while every microchip power rail obeys Kirchhoff's voltage-current conservation across series and parallel resistor meshes.",
          conceptualExplanation:
            "All progressive waves obey v = fλ. When light crosses from air (n_1 ≈ 1) into glass (n_2 = n), frequency f stays invariant while speed and wavelength drop by factor n, bending the ray toward the normal via Snell's law: n_1 sin θ_1 = n_2 sin θ_2. Travelling from dense to rare medium beyond critical angle θ_c = arcsin(1/n) triggers Total Internal Reflection. Converging lenses (f > 0) obey 1/f = 1/u + 1/v (Real-is-Positive convention: real image v > 0, virtual image v < 0). In DC electricity, series resistors add directly (R_s = R_1 + R_2) with shared current I, whereas parallel branches share identical voltage V and satisfy 1/R_p = 1/R_1 + 1/R_2. A real battery with EMF E and internal resistance r delivers terminal voltage V = E - Ir = IR.",
          conceptualModel:
            "Optics: n₁ sin θ₁ = n₂ sin θ₂  &  1/f = 1/u + 1/v  |  Circuits: Series (Same I, ΣR) vs Parallel (Same V, Σ 1/R) & E = I(R + r).",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "n₁ sin i = n₂ sin r,   sin θ_c = 1 / n",
              definition: "Snell's law of refraction and critical angle condition for glass-to-air boundary.",
              practicalExample: "For diamond n = 2.42, sin θ_c = 1/2.42 => θ_c ≈ 24.4° (intense sparkle)."
            },
            {
              termOrSymbol: "1/f = 1/u + 1/v,   m = v / u",
              definition: "Gaussian thin-lens formula and linear magnification ratio.",
              practicalExample: "f = 10 cm, u = 15 cm => 1/v = 1/10 - 1/15 = 1/30 => v = +30 cm (real inverted, m = 2)."
            },
            {
              termOrSymbol: "R_p = (R₁ R₂)/(R₁ + R₂),   E = I(R + r)",
              definition: "Two-branch parallel resistance and complete battery loop EMF equation.",
              practicalExample: "6 Ω in parallel with 3 Ω gives (6×3)/(6+3) = 2 Ω."
            }
          ],
          workedExamples: [
            {
              title: "Thin Converging Lens Image Position & Magnification",
              problemStatement: "An illuminated object is placed 20 cm in front of a thin converging lens of focal length 15 cm. Determine the image position v, magnification, and nature of the image.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Assign signs using Real-is-Positive convention.",
                  reasoning: "Converging lens f = +15 cm; real object distance u = +20 cm."
                },
                {
                  stepNumber: 2,
                  instruction: "Substitute into 1/f = 1/u + 1/v and isolate 1/v.",
                  reasoning: "1/15 = 1/20 + 1/v  ==>  1/v = 1/15 - 1/20 = (4 - 3)/60 = 1/60."
                },
                {
                  stepNumber: 3,
                  instruction: "Invert carefully to solve for v.",
                  reasoning: "v = +60 cm. Because v > 0, the image is real and formed 60 cm behind the lens."
                },
                {
                  stepNumber: 4,
                  instruction: "Calculate linear magnification m = v / u and state image orientation.",
                  reasoning: "m = 60 / 20 = 3.0. Every real single-lens image is inverted and 3× magnified."
                }
              ],
              takeawayRule: "In 1/f = 1/u + 1/v, always invert the final combined fraction! Stopping at 1/60 is the single most common exam error."
            },
            {
              title: "Combined Series-Parallel Circuit with Battery Internal Resistance",
              problemStatement: "A cell of EMF 12 V and internal resistance r = 1.0 Ω drives a 2.0 Ω resistor in series with a parallel pair of 6.0 Ω and 3.0 Ω resistors. Find total circuit current and terminal PD.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Collapse the parallel 6.0 Ω and 3.0 Ω branch first.",
                  reasoning: "R_parallel = (6.0 × 3.0)/(6.0 + 3.0) = 18 / 9 = 2.0 Ω."
                },
                {
                  stepNumber: 2,
                  instruction: "Add the external series resistor to obtain total external resistance R_ext.",
                  reasoning: "R_ext = 2.0 Ω + 2.0 Ω = 4.0 Ω."
                },
                {
                  stepNumber: 3,
                  instruction: "Include internal resistance r to find total current I = E / (R_ext + r).",
                  reasoning: "I = 12 V / (4.0 Ω + 1.0 Ω) = 12 / 5.0 = 2.4 A."
                },
                {
                  stepNumber: 4,
                  instruction: "Compute external terminal potential difference V = I R_ext = E - Ir.",
                  reasoning: "V = 2.4 A × 4.0 Ω = 9.6 V (check: 12 - 2.4(1.0) = 9.6 V)."
                }
              ],
              takeawayRule: "Reduce circuits from the innermost parallel loops outward to total R_ext before dividing EMF by (R_ext + r)."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Adding parallel resistances directly as R_1 + R_2 instead of reciprocals.",
              whyItIsWrong: "Adding a parallel path opens a second highway for current, which strictly DECREASES total resistance below the smallest branch.",
              correctCorrection: "Verify R_parallel < min(R_1, R_2) on every parallel reduction."
            },
            {
              misconception: "Forgetting that wave frequency f stays constant during refraction.",
              whyItIsWrong: "Wavefronts cannot pile up or vanish at an interface, so f_medium = f_air while wavelength λ shrinks to λ/n.",
              correctCorrection: "Hold f fixed across boundaries; only wave speed v and wavelength λ scale by 1/n."
            }
          ],
          guidedPracticePrompt: "If glass has refractive index n = 1.50, calculate its critical angle θ_c in air.",
          independentPracticePrompt: "Find the total resistance of 4 Ω, 12 Ω, and 6 Ω connected in parallel.",
          extensionActivity: "Explain how Faraday's law e = -N dΦ/dt powers AC transformers via step-up turn ratios V_s/V_p = N_s/N_p.",
          diagnosticSelfCheck: "Why does placing an object inside the focal length (u < f) of a magnifying glass produce a negative v?",
          transferApplication: "Compute electrical energy consumed in kWh by a 1.5 kW air conditioner running 4 hours daily for 10 days.",
          masteryAssessment: "A light wave of frequency 5.0 × 10¹⁴ Hz travels at 3.0 × 10⁸ m/s in vacuum. Find its wavelength inside water (n = 1.33).",
          summaryRecap: "Keep frequency invariant across refracting media, invert 1/v cleanly in lens problems, and collapse parallel branches inward-outward before applying E = I(R + r).",
          estimatedMinutes: 120
        },
        questions: [
          {
            id: "q-p3-phy-o-1",
            type: "multiple_choice",
            questionText: "A sound wave of frequency 680 Hz travels through air at 340 m/s. Calculate its wavelength λ.",
            mathExpression: "v = f \\lambda",
            options: ["0.50 m", "2.0 m", "1020 m", "0.25 m"],
            correctAnswer: "0.50 m",
            explanation: "λ = v / f = 340 / 680 = 0.50 m.",
            hintLadder: [
              "Use the universal wave equation v = fλ.",
              "Rearrange for wavelength: λ = v / f.",
              "Divide 340 by 680."
            ],
            misconceptionAlerts: [
              { trigger: "2.0 m", note: "680 / 340 = 2.0 inverts the formula (f / v instead of v / f)." }
            ],
            skillId: "skill-sss-optics-circuits-induction",
            difficulty: "easy",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p3-phy-o-2",
            type: "multiple_choice",
            questionText: "Two resistors of 12 Ω and 4 Ω are connected in parallel across a 12 V battery of negligible internal resistance. What is their combined equivalent resistance?",
            mathExpression: "\\frac{1}{R_p} = \\frac{1}{12} + \\frac{1}{4}",
            options: ["3.0 Ω", "16.0 Ω", "8.0 Ω", "4.0 Ω"],
            correctAnswer: "3.0 Ω",
            explanation: "R_p = (12 × 4) / (12 + 4) = 48 / 16 = 3.0 Ω (note: strictly less than the smallest 4 Ω branch).",
            hintLadder: [
              "Use product-over-sum for two parallel resistors: (R₁R₂)/(R₁+R₂).",
              "Compute (12 × 4) / (12 + 4) = 48 / 16.",
              "Check that R_p is smaller than 4 Ω."
            ],
            misconceptionAlerts: [
              { trigger: "16.0 Ω", note: "16 Ω is the SERIES combination (12 + 4), not parallel." }
            ],
            skillId: "skill-sss-optics-circuits-induction",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p3-phy-o-3",
            type: "multiple_choice",
            questionText: "An object sits 30 cm from a converging lens of focal length 10 cm. Where does the real image form, and what is its linear magnification?",
            mathExpression: "\\frac{1}{10} = \\frac{1}{30} + \\frac{1}{v}",
            options: ["v = 15 cm, m = 0.5", "v = 15 cm, m = 2.0", "v = 30 cm, m = 1.0", "v = 7.5 cm, m = 0.25"],
            correctAnswer: "v = 15 cm, m = 0.5",
            explanation: "1/v = 1/10 - 1/30 = (3 - 1)/30 = 2/30 = 1/15 => v = 15 cm. Magnification m = v/u = 15/30 = 0.5 (diminished).",
            hintLadder: [
              "Subtract 1/30 from 1/10 using common denominator 30.",
              "Invert 2/30 = 1/15 to get v = 15 cm.",
              "Compute magnification m = v / u = 15 / 30."
            ],
            misconceptionAlerts: [
              { trigger: "v = 15 cm, m = 2.0", note: "Magnification is image distance divided by object distance (v/u = 15/30 = 0.5), not u/v." }
            ],
            skillId: "skill-sss-optics-circuits-induction",
            difficulty: "medium",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p3-phy-o-4",
            type: "multiple_choice",
            questionText: "Light enters a transparent crystal from air (n_air = 1.0) at an angle of incidence 30° (sin 30° = 0.50) and refracts at an angle whose sine is 0.25. What is the refractive index of the crystal?",
            mathExpression: "n = \\frac{\\sin i}{\\sin r}",
            options: ["2.0", "0.50", "1.50", "1.33"],
            correctAnswer: "2.0",
            explanation: "By Snell's law, n = sin i / sin r = 0.50 / 0.25 = 2.0.",
            hintLadder: [
              "Apply Snell's law from air into crystal: n = sin i / sin r.",
              "Substitute sin i = 0.50 and sin r = 0.25.",
              "Divide 0.50 by 0.25."
            ],
            misconceptionAlerts: [
              { trigger: "0.50", note: "Refractive index of any dense optical medium relative to vacuum/air is always > 1." }
            ],
            skillId: "skill-sss-optics-circuits-induction",
            difficulty: "medium",
            curriculumStandard: "JAMB_UTME"
          },
          {
            id: "q-p3-phy-o-5",
            type: "multiple_choice",
            questionText: "A battery of EMF 9.0 V and internal resistance 0.5 Ω delivers current to an external 4.0 Ω load resistor. What is the terminal potential difference across the 4.0 Ω load?",
            mathExpression: "E = I(R + r), \\quad V = IR",
            options: ["8.0 V", "9.0 V", "7.2 V", "1.0 V"],
            correctAnswer: "8.0 V",
            explanation: "Total resistance = 4.0 + 0.5 = 4.5 Ω. Current I = 9.0 / 4.5 = 2.0 A. Terminal PD = IR = 2.0 × 4.0 = 8.0 V (lost volts Ir = 1.0 V).",
            hintLadder: [
              "Find total loop resistance R_total = R + r = 4.5 Ω.",
              "Calculate circuit current I = EMF / R_total = 9.0 / 4.5 = 2.0 A.",
              "Multiply current I by external load R = 4.0 Ω."
            ],
            misconceptionAlerts: [
              { trigger: "1.0 V", note: "1.0 V is the 'lost volts' dissipated internally across r = 0.5 Ω; terminal voltage across R is 9.0 - 1.0 = 8.0 V." }
            ],
            skillId: "skill-sss-optics-circuits-induction",
            difficulty: "hard",
            curriculumStandard: "WAEC_WASSCE"
          }
        ]
      }
    ]
  },
  {
    id: "unit-p3-sss-chem-physical",
    subjectId: "sss_chemistry_inorganic_physical",
    level: "senior_secondary",
    title: "Chemical Kinetics, Equilibrium Shifts & Aqueous pH",
    code: "CHM-PHY-302",
    description:
      "Collision theory and activation energy catalysis, Le Chatelier's principle in industrial Haber/Contact processes, equilibrium constants K_c, and logarithmic pH.",
    order: 2,
    category: "core",
    estimatedHours: 5.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:SSS-CHM-KIN-EQ",
      "JAMB_UTME:CHM-PHYS-PH",
      "CAMBRIDGE_IGCSE:0620-RATES-EQ"
    ],
    skills: [
      {
        id: "skill-sss-kinetics-equilibrium-ph",
        unitId: "unit-p3-sss-chem-physical",
        title: "Reaction Rates, Le Chatelier Equilibria & pH Scales",
        code: "SKL-CHM-PHY-302",
        summary:
          "Predict rate changes from temperature/surface-area/catalysts, direction of equilibrium shift under stress, and calculate strong acid/base pH.",
        objectives: [
          "Explain rate enhancements via collision frequency and lowered activation energy E_a pathways",
          "Apply Le Chatelier's Principle for pressure, temperature (ΔH), and concentration perturbations",
          "Compute pH = -log₁₀[H⁺] and pOH = 14 - pH for strong monoprotic/diprotic aqueous solutions"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-logarithms", "skill-percent-ratios"],
        lesson: {
          id: "les-sss-kinetics-equilibrium-ph",
          title: "Kinetics, Dynamic Chemical Equilibrium & Logarithmic pH",
          hookAndIntuition:
            "Why does powdered chalk fizz violently in acid compared to a marble chip, why does high pressure boost ammonia yield in the Haber process, and why does a drop of 1 pH unit mean ten times more acid ions?",
          conceptualExplanation:
            "Chemical reactions occur when reactant particles collide with energy >= Activation Energy (E_a) and proper orientation. Raising temperature, concentration, or surface area speeds reactions by raising effective collision frequency; a catalyst speeds BOTH forward and reverse rates equally by providing an alternative pathway of lower E_a—so catalysts NEVER alter the final equilibrium position! Dynamic equilibrium holds when forward rate equals reverse rate in a closed vessel. Under Le Chatelier's Principle, increasing pressure shifts toward FEWER gas moles; raising temperature favors the ENDOTHERMIC (+ΔH) direction. In aqueous solution at 25 °C, [H⁺][OH⁻] = 1.0 × 10⁻¹⁴, giving pH = -log₁₀[H⁺] and pH + pOH = 14.",
          conceptualModel:
            "Catalyst -> Lowers E_a (Faster, same yield)  |  High Pressure -> Fewer Gas Moles  |  High Temp -> Endothermic (+ΔH)  |  pH = -log₁₀[H⁺].",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "K_c = ([C]^c [D]^d) / ([A]^a [B]^b)",
              definition: "Equilibrium constant expression for aA + bB ⇌ cC + dD (aqueous/gaseous concentrations).",
              practicalExample: "Only temperature changes the numerical value of K_c."
            },
            {
              termOrSymbol: "pH = -log₁₀[H⁺],   pH + pOH = 14  (at 25 °C)",
              definition: "Base-10 logarithmic acidity scale where each 1-unit drop equals a 10× rise in [H⁺].",
              practicalExample: "0.001 M HCl has [H⁺] = 10⁻³ M, so pH = 3.0."
            },
            {
              termOrSymbol: "Le Chatelier's Principle",
              definition: "A closed system at equilibrium shifts in the direction that opposes an imposed change in conditions.",
              practicalExample: "In N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (ΔH = -92 kJ), high pressure shifts right (4 -> 2 gas moles)."
            }
          ],
          workedExamples: [
            {
              title: "Optimizing Haber Ammonia Yield via Le Chatelier Analysis",
              problemStatement: "Consider N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH = -92 kJ mol⁻¹. Analyze how (a) increasing pressure, (b) raising temperature, and (c) adding finely divided Fe catalyst affect yield and rate.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Count gaseous moles on reactant vs product sides for pressure sensitivity.",
                  reasoning: "Left: 1 + 3 = 4 gas moles; Right: 2 gas moles. Increasing pressure shifts equilibrium right toward fewer moles -> higher NH₃ yield."
                },
                {
                  stepNumber: 2,
                  instruction: "Inspect ΔH sign to determine thermal shift.",
                  reasoning: "ΔH = -92 kJ < 0 means forward reaction is exothermic. Raising temperature favors the reverse endothermic direction -> lowers equilibrium NH₃ yield (though speeding rate)."
                },
                {
                  stepNumber: 3,
                  instruction: "Evaluate the role of the finely divided iron catalyst.",
                  reasoning: "Iron lowers activation energy E_a for BOTH forward and reverse steps equally -> equilibrium is reached faster, with ZERO shift in final yield."
                },
                {
                  stepNumber: 4,
                  instruction: "Explain the industrial compromise (~450 °C, 200 atm, Fe catalyst).",
                  reasoning: "Moderate 450 °C + Fe catalyst ensures fast economic rate while 200 atm pressure drives equilibrium yield favorably."
                }
              ],
              takeawayRule: "Catalysts affect kinetics (time to equilibrium) only; temperature changes K_eq; pressure shifts gas-mole imbalances."
            },
            {
              title: "Computing pH of Strong Acid and Strong Base Solutions",
              problemStatement: "Calculate the pH at 25 °C of: (a) 0.005 mol dm⁻³ H₂SO₄ (assuming full dissociation), and (b) 0.01 mol dm⁻³ NaOH.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Determine [H⁺] from diprotic H₂SO₄ stoichiometry.",
                  reasoning: "Each H₂SO₄ yields 2 H⁺ ions: [H⁺] = 2 × 0.005 = 0.010 = 10⁻² mol dm⁻³."
                },
                {
                  stepNumber: 2,
                  instruction: "Apply pH = -log₁₀[H⁺] to part (a).",
                  reasoning: "pH = -log₁₀(10⁻²) = 2.0."
                },
                {
                  stepNumber: 3,
                  instruction: "Find pOH from [OH⁻] = 0.01 = 10⁻² mol dm⁻³ for NaOH.",
                  reasoning: "pOH = -log₁₀(10⁻²) = 2.0."
                },
                {
                  stepNumber: 4,
                  instruction: "Convert pOH to pH using pH + pOH = 14.",
                  reasoning: "pH = 14 - 2.0 = 12.0 (strongly alkaline)."
                }
              ],
              takeawayRule: "Check acid/base basicity (monoprotic HCl vs diprotic H₂SO₄) before computing pH, and never confuse pOH with pH for alkalis."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking a catalyst increases equilibrium percentage yield.",
              whyItIsWrong: "A catalyst lowers the barrier identically from left-to-right and right-to-left, leaving K_c and equilibrium composition untouched.",
              correctCorrection: "Catalysts shorten time-to-equilibrium; only temperature, pressure (when Δn ≠ 0), or concentration alters position."
            },
            {
              misconception: "Reporting pOH = 2 directly as pH = 2 for a 0.01 M NaOH solution.",
              whyItIsWrong: "NaOH is alkaline (pH > 7); reporting pH = 2 labels caustic soda as battery acid!",
              correctCorrection: "Compute pOH = -log₁₀[OH⁻], then subtract from 14 to obtain pH."
            }
          ],
          guidedPracticePrompt: "Predict the equilibrium shift when pressure is doubled on H₂(g) + I₂(g) ⇌ 2HI(g).",
          independentPracticePrompt: "How many times more acidic is a solution at pH 2 compared to pH 5?",
          extensionActivity: "Use Hess's Law to compute ΔH_reaction from standard enthalpies of formation ΣΔH_f(products) - ΣΔH_f(reactants).",
          diagnosticSelfCheck: "Why does grinding CaCO₃ into fine powder raise initial CO₂ evolution rate without raising final gas volume?",
          transferApplication: "Explain why catalytic converters in car exhausts use high-surface-area honeycomb platinum/rhodium meshes.",
          masteryAssessment: "Given 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), ΔH = -196 kJ, state two changes that shift equilibrium to produce more SO₃.",
          summaryRecap: "Link collision theory to activation barriers, apply Le Chatelier accurately across gas moles and ΔH, and convert [H⁺]/[OH⁻] via base-10 logs.",
          estimatedMinutes: 115
        },
        questions: [
          {
            id: "q-p3-chm-p-1",
            type: "multiple_choice",
            questionText: "What is the pH at 25 °C of a 0.001 mol dm⁻³ solution of strong monoprotic hydrochloric acid (HCl)?",
            mathExpression: "\\text{pH} = -\\log_{10}[\\text{H}^+]",
            options: ["3.0", "1.0", "11.0", "0.001"],
            correctAnswer: "3.0",
            explanation: "[H⁺] = 0.001 = 10⁻³ mol dm⁻³, therefore pH = -log₁₀(10⁻³) = 3.0.",
            hintLadder: [
              "Express 0.001 as a power of 10: 10⁻³.",
              "Apply pH = -log₁₀(10⁻³).",
              "Log base 10 of 10⁻³ is -3, and the minus sign gives +3."
            ],
            misconceptionAlerts: [
              { trigger: "11.0", note: "pH 11 is strongly basic; HCl is an acid with pH < 7." }
            ],
            skillId: "skill-sss-kinetics-equilibrium-ph",
            difficulty: "easy",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p3-chm-p-2",
            type: "multiple_choice",
            questionText: "Which statement accurately describes the effect of adding a positive catalyst to a reversible reaction already at dynamic equilibrium?",
            options: [
              "It speeds up forward and reverse reactions equally without changing the equilibrium position",
              "It shifts equilibrium strictly toward the products to boost percentage yield",
              "It increases the overall enthalpy change ΔH of the reaction",
              "It freezes the reverse reaction while accelerating only the forward step"
            ],
            correctAnswer: "It speeds up forward and reverse reactions equally without changing the equilibrium position",
            explanation: "A catalyst lowers activation energy E_a symmetrically for both directions, helping the system reach equilibrium faster without changing K_c or yield.",
            hintLadder: [
              "Inspect an energy profile diagram with and without a catalyst.",
              "Both forward and reverse barriers drop by the exact same ΔE_a.",
              "Thus rates rise equally and equilibrium composition remains unchanged."
            ],
            misconceptionAlerts: [
              { trigger: "It shifts equilibrium strictly toward the products to boost percentage yield", note: "A catalyst CANNOT shift an already equilibrated composition." }
            ],
            skillId: "skill-sss-kinetics-equilibrium-ph",
            difficulty: "easy",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          },
          {
            id: "q-p3-chm-p-3",
            type: "multiple_choice",
            questionText: "For the exothermic equilibrium 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), ΔH = -196 kJ mol⁻¹, which change increases the equilibrium concentration of SO₃?",
            options: [
              "Increasing total pressure and decreasing temperature",
              "Decreasing total pressure and increasing temperature",
              "Removing O₂ gas continuously from the reactor",
              "Adding an inert gas at constant volume"
            ],
            correctAnswer: "Increasing total pressure and decreasing temperature",
            explanation: "Reactants have 3 gas moles vs 2 product gas moles, so higher pressure shifts right. Forward reaction is exothermic, so cooling also shifts right.",
            hintLadder: [
              "Count gas moles: 2 + 1 = 3 on left vs 2 on right.",
              "Higher pressure favors the side with fewer gas moles (right).",
              "Since ΔH < 0 (heat is a product), removing heat (cooling) drives forward."
            ],
            misconceptionAlerts: [
              { trigger: "Decreasing total pressure and increasing temperature", note: "Both changes push equilibrium back toward reactants (SO₂ and O₂)." }
            ],
            skillId: "skill-sss-kinetics-equilibrium-ph",
            difficulty: "medium",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p3-chm-p-4",
            type: "multiple_choice",
            questionText: "Calculate the pH at 25 °C of a 0.01 mol dm⁻³ solution of strong base NaOH.",
            mathExpression: "\\text{pOH} = -\\log_{10}[\\text{OH}^-], \\quad \\text{pH} = 14 - \\text{pOH}",
            options: ["12.0", "2.0", "13.0", "7.0"],
            correctAnswer: "12.0",
            explanation: "[OH⁻] = 10⁻² M => pOH = 2.0. At 25 °C, pH = 14 - 2.0 = 12.0.",
            hintLadder: [
              "Find pOH from [OH⁻] = 0.01 = 10⁻² M.",
              "pOH = 2.0.",
              "Subtract pOH from 14 to obtain pH."
            ],
            misconceptionAlerts: [
              { trigger: "2.0", note: "2.0 is pOH, not pH! A strong NaOH base must have pH > 7." }
            ],
            skillId: "skill-sss-kinetics-equilibrium-ph",
            difficulty: "medium",
            curriculumStandard: "JAMB_UTME"
          },
          {
            id: "q-p3-chm-p-5",
            type: "multiple_choice",
            questionText: "Solution X has pH 3 and Solution Y has pH 6. How does the hydrogen ion concentration [H⁺] of X compare to that of Y?",
            options: [
              "Solution X has 1,000 times higher [H⁺] than Solution Y",
              "Solution X has 2 times higher [H⁺] than Solution Y",
              "Solution X has 3 times lower [H⁺] than Solution Y",
              "Solution X has 100 times higher [H⁺] than Solution Y"
            ],
            correctAnswer: "Solution X has 1,000 times higher [H⁺] than Solution Y",
            explanation: "[H⁺]_X = 10⁻³ M and [H⁺]_Y = 10⁻⁶ M. Ratio = 10⁻³ / 10⁻⁶ = 10³ = 1,000 times greater.",
            hintLadder: [
              "Convert each pH back to [H⁺] = 10^{-pH}.",
              "[H⁺]_X = 10⁻³, [H⁺]_Y = 10⁻⁶.",
              "Compute 10⁻³ / 10⁻⁶ = 10³."
            ],
            misconceptionAlerts: [
              { trigger: "Solution X has 2 times higher [H⁺] than Solution Y", note: "The pH scale is logarithmic (powers of 10), not linear." }
            ],
            skillId: "skill-sss-kinetics-equilibrium-ph",
            difficulty: "hard",
            curriculumStandard: "WAEC_WASSCE"
          }
        ]
      }
    ]
  },
  {
    id: "unit-p3-sss-chem-organic",
    subjectId: "sss_chemistry_organic_industrial",
    level: "senior_secondary",
    title: "Organic Homologous Series, Isomerism & Polymerisation",
    code: "CHM-ORG-303",
    description:
      "IUPAC nomenclature and general formulas of alkanes, alkenes, alkynes, alkanols, and alkanoic acids; structural isomerism; esterification; and polymerisation.",
    order: 2,
    category: "core",
    estimatedHours: 5.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:SSS-CHM-ORG-01",
      "JAMB_UTME:CHM-ORG-IUPAC",
      "CAMBRIDGE_IGCSE:0620-ORGANIC"
    ],
    skills: [
      {
        id: "skill-sss-hydrocarbons-functional-groups",
        unitId: "unit-p3-sss-chem-organic",
        title: "IUPAC Hydrocarbons, Functional Groups & Esterification",
        code: "SKL-CHM-ORG-303",
        summary:
          "Name branched organic chains by IUPAC lowest-locant rules, distinguish saturated vs unsaturated tests, and balance esterification and polymerisation reactions.",
        objectives: [
          "Apply homologous general formulas (C_nH_{2n+2}, C_nH_{2n}, C_nH_{2n-2}) and IUPAC lowest-locant numbering",
          "Distinguish alkanes from alkenes chemically via bromine water decolourisation and structural isomerism",
          "Formulate acid-catalysed esterification (alkanol + alkanoic acid) and addition vs condensation polymers"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-percent-ratios"],
        lesson: {
          id: "les-sss-hydrocarbons-functional-groups",
          title: "Carbon Chains, Homologous Functional Chemistry & Polymers",
          hookAndIntuition:
            "Every fragrance in ripe pineapples, every polyethylene grocery bag, and every drop of high-octane petrol is built from the exact same tetravalent carbon skeleton tuned by functional groups.",
          conceptualExplanation:
            "Carbon's ability to catenate (form four covalent bonds into chains and rings) organizes millions of organic molecules into homologous series sharing a functional group and successive -CH₂- mass steps (+14 g/mol). Saturated alkanes (C_nH_{2n+2}) undergo free-radical substitution with chlorine under UV light, whereas unsaturated alkenes (C_nH_{2n}, containing C=C) undergo rapid electrophilic addition, decolourising orange bromine water without UV light. IUPAC naming locates the longest continuous carbon chain containing the principal functional group and numbers from whichever end assigns the lowest locant number. Heating a carboxylic acid (RCOOH) with an alcohol (R'OH) and concentrated H₂SO₄ catalyst removes water to form a sweet-smelling ester (RCOOR'), named [alkyl from alcohol] [alkanoate from acid].",
          conceptualModel:
            "Alkane (C_nH_{2n+2}, single) -> Substitution | Alkene (C_nH_{2n}, C=C) -> Addition (Decolourises Br₂) | Acid + Alcohol ⇌ Ester + H₂O.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Alkanes C_nH_{2n+2}  |  Alkenes C_nH_{2n}  |  Alkynes C_nH_{2n-2}",
              definition: "General molecular formulas distinguishing saturation and pi-bond unsaturation.",
              practicalExample: "C₄H₈ fits C_nH_{2n} -> 1-butene or 2-butene (or cycloalkane isomer)."
            },
            {
              termOrSymbol: "RCOOH + R'OH  ⇌  RCOOR' + H₂O  (conc. H₂SO₄)",
              definition: "Reversible Fisher esterification forming fruity esters; conc. H₂SO₄ acts as catalyst and dehydrating agent.",
              practicalExample: "Ethanoic acid + Propanol -> Propyl ethanoate + Water."
            },
            {
              termOrSymbol: "Addition vs Condensation Polymerisation",
              definition: "Addition links C=C monomers with 100% atom economy (polyethene); condensation eliminates small H₂O/HCl (nylon, terylene).",
              practicalExample: "n CH₂=CH₂ -> -[-CH₂-CH₂-]-_n."
            }
          ],
          workedExamples: [
            {
              title: "IUPAC Naming of a Branched Alkene Using Lowest-Locant Priority",
              problemStatement: "Determine the correct IUPAC name of CH₃-CH(CH₃)-CH=CH-CH₃.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Identify the principal functional group and longest chain containing it.",
                  reasoning: "Principal group is the C=C double bond inside a 5-carbon continuous chain -> pentene root."
                },
                {
                  stepNumber: 2,
                  instruction: "Number the chain from the end giving the C=C double bond the lowest locant.",
                  reasoning: "Right-to-left assigns C=C at C2 (pent-2-ene); left-to-right assigns C3. Hence number right-to-left: C1=CH₃, C2=CH, C3=CH, C4=CH(CH₃), C5=CH₃."
                },
                {
                  stepNumber: 3,
                  instruction: "Locate substituent side branches along the chosen numbering.",
                  reasoning: "A methyl group (-CH₃) attaches at carbon C4."
                },
                {
                  stepNumber: 4,
                  instruction: "Assemble prefix + root + locant suffix cleanly.",
                  reasoning: "4-methylpent-2-ene (note: double-bond locant 2 takes priority over methyl branch locant 2)."
                }
              ],
              takeawayRule: "In alkenes, alkynes, and alcohols, ALWAYS minimize the functional group's locant BEFORE considering alkyl branch numbers."
            },
            {
              title: "Predicting Ester Structure & Alkaline Hydrolysis (Saponification)",
              problemStatement: "Propan-1-ol reacts with methanoic acid under warm conc. H₂SO₄ to form Ester E. Name Ester E and state the products when E is boiled with aqueous NaOH.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Identify the alkyl prefix from the alcohol (propan-1-ol) and carboxylate root from the acid (methanoic acid).",
                  reasoning: "Alcohol contributes 'propyl'; acid contributes 'methanoate'."
                },
                {
                  stepNumber: 2,
                  instruction: "Write the balanced esterification equation.",
                  reasoning: "HCOOH + CH₃CH₂CH₂OH ⇌ HCOOCH₂CH₂CH₃ + H₂O. Ester E is propyl methanoate."
                },
                {
                  stepNumber: 3,
                  instruction: "Predict products under alkaline hydrolysis (NaOH heat).",
                  reasoning: "Base hydrolysis splits the ester into the sodium salt of the acid plus the original alcohol irreversibly."
                },
                {
                  stepNumber: 4,
                  instruction: "Name the two hydrolysis products cleanly.",
                  reasoning: "Sodium methanoate (HCOONa) + Propan-1-ol (CH₃CH₂CH₂OH)."
                }
              ],
              takeawayRule: "Name every ester strictly as [alcohol-yl] [acid-oate]—NEVER flip the order to acid-yl alcohol-oate."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Reversing ester naming by putting the acid part first (e.g. calling CH₃COOCH₂CH₃ 'ethanoic ethyl').",
              whyItIsWrong: "By IUPAC convention, the alcohol-derived O-alkyl group always comes first, followed by the acyl -oate.",
              correctCorrection: "Trace the -O-R' oxygen-attached alkyl chain first (ethyl) and the C=O chain second (ethanoate) -> ethyl ethanoate."
            },
            {
              misconception: "Numbering an alkene chain from the end nearest a methyl branch instead of the C=C bond.",
              whyItIsWrong: "Principal unsaturation/functional groups strictly outrank alkyl substituents in IUPAC priority.",
              correctCorrection: "Give the C=C, C≡C, or -OH group the lowest possible carbon number first."
            }
          ],
          guidedPracticePrompt: "Draw and name all structural isomers of butane (C₄H₁₀) and state which has the lower boiling point.",
          independentPracticePrompt: "Write the equation for complete addition reaction of ethene with bromine water.",
          extensionActivity: "Explain why acidified K₂Cr₂O₇ turns from orange to green with ethanol (1° alcohol) yet fails with 2-methylpropan-2-ol (3° alcohol).",
          diagnosticSelfCheck: "Why does ethyne (C₂H₂) burn with a much sootier flame than ethane (C₂H₆)?",
          transferApplication: "Explain why alkaline hydrolysis of natural triglycerides with NaOH produces soap (sodium carboxylates) plus glycerol.",
          masteryAssessment: "Identify the repeating monomer of poly(chloroethene) (PVC) and classify its polymerisation type.",
          summaryRecap: "Master general homologous formulas, prioritize functional groups in IUPAC locants, test C=C unsaturation with bromine, and name esters [alkyl] [alkanoate].",
          estimatedMinutes: 115
        },
        questions: [
          {
            id: "q-p3-chm-o-1",
            type: "multiple_choice",
            questionText: "Which reagent rapidly decolourises at room temperature in the dark when shaken with propene (C₃H₆), distinguishing it from propane (C₃H₈)?",
            options: ["Aqueous bromine water (orange-brown to colourless)", "Aqueous sodium hydroxide", "Dilute hydrochloric acid", "Limewater"],
            correctAnswer: "Aqueous bromine water (orange-brown to colourless)",
            explanation: "Propene contains a reactive C=C double bond that undergoes rapid electrophilic addition with Br₂, discharging the orange colour without UV light.",
            hintLadder: [
              "Propene is an unsaturated alkene; propane is a saturated alkane.",
              "Which standard lab test detects a C=C double bond via addition?",
              "Orange-brown bromine water turns colourless upon addition."
            ],
            misconceptionAlerts: [
              { trigger: "Limewater", note: "Limewater tests for carbon dioxide gas (CO₂), not C=C unsaturation." }
            ],
            skillId: "skill-sss-hydrocarbons-functional-groups",
            difficulty: "easy",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p3-chm-o-2",
            type: "multiple_choice",
            questionText: "Name the organic ester formed when ethanol reacts with propanoic acid in the presence of warm concentrated H₂SO₄.",
            mathExpression: "\\text{CH}_3\\text{CH}_2\\text{COOH} + \\text{CH}_3\\text{CH}_2\\text{OH} \\rightleftharpoons \\text{Ester} + \\text{H}_2\\text{O}",
            options: ["Ethyl propanoate", "Propyl ethanoate", "Ethyl ethanoate", "Propyl propanoate"],
            correctAnswer: "Ethyl propanoate",
            explanation: "The alcohol (ethanol) supplies the 'ethyl' alkyl group, and the carboxylic acid (propanoic acid) supplies the 'propanoate' root -> Ethyl propanoate.",
            hintLadder: [
              "Take the alkyl prefix from the alcohol (ethanol -> ethyl).",
              "Take the -oate suffix from the carboxylic acid (propanoic acid -> propanoate).",
              "Combine them: [alcohol-yl] [acid-oate]."
            ],
            misconceptionAlerts: [
              { trigger: "Propyl ethanoate", note: "You reversed alcohol and acid sources; check which molecule carries -OH vs -COOH." }
            ],
            skillId: "skill-sss-hydrocarbons-functional-groups",
            difficulty: "easy",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          },
          {
            id: "q-p3-chm-o-3",
            type: "multiple_choice",
            questionText: "What is the correct IUPAC name for the branched saturated hydrocarbon CH₃-CH(CH₃)-CH₂-CH₂-CH₃?",
            options: ["2-methylpentane", "4-methylpentane", "2-methylbutane", "3-methylpentane"],
            correctAnswer: "2-methylpentane",
            explanation: "Longest continuous chain has 5 carbons (pentane). Numbering from the left places the methyl substituent at C2 (lower than C4 from the right).",
            hintLadder: [
              "Count carbons in the longest continuous chain: 5 carbons = pentane.",
              "Number from the end closest to the methyl branch.",
              "C2 beats C4 by the lowest-locant rule."
            ],
            misconceptionAlerts: [
              { trigger: "4-methylpentane", note: "4-methylpentane numbers from the wrong end, violating the lowest-locant rule." }
            ],
            skillId: "skill-sss-hydrocarbons-functional-groups",
            difficulty: "medium",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p3-chm-o-4",
            type: "multiple_choice",
            questionText: "How many distinct structural isomers exist for the alkane molecular formula C₅H₁₂?",
            options: ["3 isomers", "2 isomers", "4 isomers", "5 isomers"],
            correctAnswer: "3 isomers",
            explanation: "C₅H₁₂ has exactly 3 constitutional isomers: pentane (straight 5-C chain), 2-methylbutane (4-C chain + 1 methyl), and 2,2-dimethylpropane (3-C chain + 2 methyls).",
            hintLadder: [
              "Start with the unbranched 5-carbon skeleton (pentane).",
              "Shorten main chain to 4 carbons and place 1 methyl branch -> 2-methylbutane.",
              "Shorten main chain to 3 carbons and place 2 methyl branches on C2 -> 2,2-dimethylpropane."
            ],
            misconceptionAlerts: [
              { trigger: "4 isomers", note: "3-methylbutane is identical to 2-methylbutane simply rotated end-for-end." }
            ],
            skillId: "skill-sss-hydrocarbons-functional-groups",
            difficulty: "medium",
            curriculumStandard: "JAMB_UTME"
          },
          {
            id: "q-p3-chm-o-5",
            type: "multiple_choice",
            questionText: "Which of the following synthetic polymers is formed via CONDENSATION polymerisation with elimination of a small molecule (such as H₂O or HCl), rather than addition polymerisation?",
            options: [
              "Nylon-6,6 (formed from hexane-1,6-diamine and hexanedioic acid)",
              "Poly(ethene) formed from ethene monomers",
              "Poly(propene) formed from propene monomers",
              "Poly(chloroethene) (PVC) formed from vinyl chloride"
            ],
            correctAnswer: "Nylon-6,6 (formed from hexane-1,6-diamine and hexanedioic acid)",
            explanation: "Polyamides like Nylon-6,6 link amine (-NH₂) and carboxylic acid (-COOH) groups by eliminating H₂O per amide linkage, defining condensation polymerisation.",
            hintLadder: [
              "Addition polymers form by opening C=C double bonds with no lost atoms.",
              "Condensation polymers join two difunctional monomers and split off H₂O.",
              "Polyethene, polypropene, and PVC all originate from C=C alkenes."
            ],
            misconceptionAlerts: [
              { trigger: "Poly(chloroethene) (PVC) formed from vinyl chloride", note: "PVC comes from opening the C=C bond of CH₂=CHCl without eliminating any by-product." }
            ],
            skillId: "skill-sss-hydrocarbons-functional-groups",
            difficulty: "hard",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          }
        ]
      }
    ]
  },
  {
    id: "unit-p3-sss-bio-cytology-physiology",
    subjectId: "sss_biology_cytology_physiology",
    level: "senior_secondary",
    title: "Cellular Transport, Enzyme Kinetics & Mammalian Circulation",
    code: "BIO-CYT-302",
    description:
      "Osmotic tonicity in plant vs animal cells, enzyme active-site kinetics (temperature and pH denaturation), and double-circuit mammalian cardiac transport.",
    order: 2,
    category: "core",
    estimatedHours: 5.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:SSS-BIO-CYT-PHY",
      "JAMB_UTME:BIO-CELL-ENZYM",
      "CAMBRIDGE_IGCSE:0610-ENZYM-TRANS"
    ],
    skills: [
      {
        id: "skill-sss-enzymes-osmosis-transport",
        unitId: "unit-p3-sss-bio-cytology-physiology",
        title: "Osmosis, Enzyme Kinetics & Double Circulation",
        code: "SKL-BIO-CYT-302",
        summary:
          "Predict osmotic cell turgidity/plasmolysis/lysis, analyze bell-shaped enzyme activity curves, and trace oxygenated vs deoxygenated blood through four heart chambers.",
        objectives: [
          "Explain water potential osmosis in hypertonic, isotonic, and hypotonic solutions across plant and animal cells",
          "Interpret enzyme temperature/pH curves distinguishing kinetic collision rise from active-site denaturation",
          "Trace pulmonary and systemic double circulation contrasting ventricle wall thickness and valve direction"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-percent-ratios"],
        lesson: {
          id: "les-sss-enzymes-osmosis-transport",
          title: "Membrane Osmosis, Biocatalyst Kinetics & Mammalian Double Circulation",
          hookAndIntuition:
            "Put fresh red blood cells in distilled water and they burst open, yet plant root cells swell firmly without exploding; meanwhile, a 43 °C high fever is lethal because heat warps the 3D shape of vital brain enzymes.",
          conceptualExplanation:
            "Osmosis is the net passive movement of water molecules from higher water potential (dilute, hypotonic) to lower water potential (concentrated, hypertonic) across a partially permeable membrane. Animal cells lack rigid cellulose walls so they undergo osmotic lysis in pure water and crenation in concentrated brine; plant cells become turgid in water (resisted by cell wall turgor pressure) and plasmolyse in hypertonic salt. Enzymes are globular protein catalysts whose complementary 3D active site lowers reaction activation energy. Rising temperature speeds substrate-enzyme collisions up to an optimum (~37 °C in humans); beyond this peak, thermal vibration breaks hydrogen/ionic bonds, denaturing the active site irreversibly. Mammalian double circulation pumps deoxygenated blood from the Right Ventricle to lungs (low-pressure pulmonary loop) and oxygenated blood from the thick muscular Left Ventricle to the entire body (high-pressure systemic loop).",
          conceptualModel:
            "Water Potential High -> Low (Osmosis)  |  Enzyme Peak = Optimum -> Above Optimum = Active-Site Denaturation  |  RV -> Lungs -> LA -> LV -> Body.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Turgid vs Plasmolysed (Plant)  |  Lysed vs Crenated (Animal)",
              definition: "Structural responses to hypotonic (pure water) versus hypertonic (high solute) external solutions.",
              practicalExample: "Onion epidermis in 1.0 M sucrose loses water, pulling cytoplasm away from the cell wall (plasmolysis)."
            },
            {
              termOrSymbol: "Enzyme Denaturation (Non-Reversible Structural Unfolding)",
              definition: "Loss of 3D tertiary active-site complementarity due to excessive heat or extreme pH.",
              practicalExample: "Stomach pepsin peaks at pH 2.0, whereas pancreatic amylase peaks at pH 7.5."
            },
            {
              termOrSymbol: "Left Ventricle Wall > Right Ventricle Wall",
              definition: "Left ventricle myocardium is ~3× thicker to overcome systemic arterial resistance to head and limbs.",
              practicalExample: "Pulmonary artery carries deoxygenated blood away from the Right Ventricle."
            }
          ],
          workedExamples: [
            {
              title: "Interpreting Potato Cylinder Osmosis Mass-Change Data",
              problemStatement: "Identical 5.00 g potato cylinders are immersed for 1 hour in sucrose solutions of 0.0 M, 0.2 M, 0.4 M, and 0.8 M. Final masses are 5.65 g, 5.20 g, 4.98 g, and 4.35 g respectively. Estimate the cell sap molarity and classify 0.8 M.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute percentage change in mass Δm% = ((m_final - m_initial)/m_initial) × 100%.",
                  reasoning: "0.0 M: +13.0%;  0.2 M: +4.0%;  0.4 M: -0.4%;  0.8 M: -13.0%."
                },
                {
                  stepNumber: 2,
                  instruction: "Locate the isotonic zero-change point where net osmotic flux is zero.",
                  reasoning: "At 0.4 M mass change is almost zero (-0.4%), so cell sap water potential matches ~0.38 M sucrose."
                },
                {
                  stepNumber: 3,
                  instruction: "Explain water direction in 0.0 M (pure water).",
                  reasoning: "0.0 M is hypotonic relative to potato sap; water enters vacuole by osmosis, making cells firm/turgid (+13%)."
                },
                {
                  stepNumber: 4,
                  instruction: "Classify 0.8 M sucrose and describe cellular state.",
                  reasoning: "0.8 M is strongly hypertonic; water exits cells, dropping turgor and causing incipient/full plasmolysis (-13%)."
                }
              ],
              takeawayRule: "The isotonic concentration corresponds exactly to the x-intercept (0% mass change) on a sucrose concentration vs mass-change curve."
            },
            {
              title: "Tracing Cardiac Flow & Diagnosing Enzyme Temperature Inhibition",
              problemStatement: "Compare why an amylase reaction stalls at 0 °C versus at 75 °C, and trace blood from the vena cava back to the aorta.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Contrast molecular state at 0 °C against 75 °C.",
                  reasoning: "At 0 °C, low kinetic energy limits collisions (reversible—cooling does NOT destroy the active site); at 75 °C, hydrogen bonds break and the active site denatures permanently."
                },
                {
                  stepNumber: 2,
                  instruction: "Trace deoxygenated systemic return through the right heart.",
                  reasoning: "Vena cava -> Right Atrium -> Tricuspid Valve -> Right Ventricle -> Pulmonary Artery -> Lungs (gas exchange)."
                },
                {
                  stepNumber: 3,
                  instruction: "Trace oxygenated blood return through the left heart.",
                  reasoning: "Pulmonary Vein -> Left Atrium -> Bicuspid (Mitral) Valve -> Left Ventricle -> Semilunar Valve -> Aorta."
                },
                {
                  stepNumber: 4,
                  instruction: "Verify why arteries always carry blood AWAY from ventricles.",
                  reasoning: "Pulmonary ARTERY carries deoxygenated blood (away to lungs); Pulmonary VEIN carries oxygenated blood (back to heart)."
                }
              ],
              takeawayRule: "Arteries always lead AWAY from the heart and veins always return TO the heart—regardless of oxygen content."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Saying enzymes are 'killed' at 70 °C or claiming freezing at 0 °C denatures enzymes.",
              whyItIsWrong: "Enzymes are non-living protein molecules (cannot be 'killed'), and 0 °C merely slows collisions reversibly without unfolding the active site.",
              correctCorrection: "Use 'denatured' for high-heat/extreme-pH active-site distortion and 'inactive/dormant' at freezing temperatures."
            },
            {
              misconception: "Assuming ALL arteries carry oxygenated blood and ALL veins carry deoxygenated blood.",
              whyItIsWrong: "In the pulmonary circuit, the pulmonary artery carries deoxygenated blood and the pulmonary vein carries oxygenated blood.",
              correctCorrection: "Define arteries by blood flow direction (away from heart under high pressure) and veins by return to heart with valves."
            }
          ],
          guidedPracticePrompt: "Predict what happens to a red blood cell versus an onion cell placed in distilled water.",
          independentPracticePrompt: "Why does stomach pepsin stop digesting protein once chyme enters the alkaline duodenum (pH 8)?",
          extensionActivity: "Explain why double circulation maintains higher oxygen delivery pressure to active skeletal muscles than single-loop fish circulation.",
          diagnosticSelfCheck: "Why does active transport require ATP mitochondria while osmosis does not?",
          transferApplication: "Explain how oral rehydration salt (ORS) therapy exploits sodium-glucose cotransport to reverse osmotic water loss during cholera.",
          masteryAssessment: "Identify which heart valve prevents backflow from the aorta into the left ventricle during ventricular diastole.",
          summaryRecap: "Distinguish wall-protected plant turgor from animal osmotic lysis, separate kinetic cold slowdown from thermal denaturation, and trace double circulation cleanly.",
          estimatedMinutes: 115
        },
        questions: [
          {
            id: "q-p3-bio-c-1",
            type: "multiple_choice",
            questionText: "What occurs when human red blood cells are placed into pure distilled water (hypotonic medium)?",
            options: [
              "Water enters rapidly by osmosis until the cells swell and burst (haemolysis)",
              "Water exits rapidly by osmosis until the cells shrivel (crenation)",
              "Rigid cellulose cell walls prevent any expansion",
              "Zero net water movement occurs across the plasma membrane"
            ],
            correctAnswer: "Water enters rapidly by osmosis until the cells swell and burst (haemolysis)",
            explanation: "Distilled water has higher water potential than red cell cytoplasm; lacking a rigid cell wall, the cell swells until its membrane ruptures.",
            hintLadder: [
              "Water moves by osmosis from higher water potential (pure water) into concentrated cytoplasm.",
              "Do animal cells possess a rigid cellulose cell wall?",
              "Without a cell wall, excessive water intake ruptures the membrane."
            ],
            misconceptionAlerts: [
              { trigger: "Rigid cellulose cell walls prevent any expansion", note: "Cellulose cell walls belong to plants, algae, and fungi—never animal erythrocytes." }
            ],
            skillId: "skill-sss-enzymes-osmosis-transport",
            difficulty: "easy",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p3-bio-c-2",
            type: "multiple_choice",
            questionText: "Which blood vessel returns OXYGENATED blood directly from the lungs into the left atrium of the mammalian heart?",
            options: ["Pulmonary vein", "Pulmonary artery", "Superior vena cava", "Aorta"],
            correctAnswer: "Pulmonary vein",
            explanation: "Blood vessels returning to the heart are veins; the pulmonary vein brings freshly oxygenated blood from pulmonary capillaries into the left atrium.",
            hintLadder: [
              "Blood flowing TO the heart travels in a vein.",
              "Blood coming FROM the lungs is named 'pulmonary'.",
              "Combine these: pulmonary vein."
            ],
            misconceptionAlerts: [
              { trigger: "Pulmonary artery", note: "The pulmonary artery carries deoxygenated blood AWAY from the right ventricle to the lungs." }
            ],
            skillId: "skill-sss-enzymes-osmosis-transport",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p3-bio-c-3",
            type: "multiple_choice",
            questionText: "Salivary amylase has an optimal temperature near 37 °C. What happens if an amylase sample is cooled to 2 °C versus boiled at 85 °C, and then both are returned to 37 °C with starch?",
            options: [
              "The 2 °C sample regains full activity at 37 °C; the 85 °C sample remains permanently inactive due to denaturation",
              "Both samples permanently denature and never digest starch again",
              "The 85 °C sample digests starch fastest because heat broke down starch beforehand",
              "The 2 °C sample is permanently killed while the 85 °C sample recovers"
            ],
            correctAnswer: "The 2 °C sample regains full activity at 37 °C; the 85 °C sample remains permanently inactive due to denaturation",
            explanation: "Cold temperature merely lowers molecular kinetic energy without damaging 3D protein folding; 85 °C permanently unfolds (denatures) the active site.",
            hintLadder: [
              "Does freezing break covalent/hydrogen bonds inside the active site?",
              "Does boiling at 85 °C irreversibly warp the 3D active site?",
              "Only the cooled enzyme retains its intact active-site geometry."
            ],
            misconceptionAlerts: [
              { trigger: "Both samples permanently denature and never digest starch again", note: "Cold slows collisions reversibly without denaturing proteins." }
            ],
            skillId: "skill-sss-enzymes-osmosis-transport",
            difficulty: "medium",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          },
          {
            id: "q-p3-bio-c-4",
            type: "multiple_choice",
            questionText: "Why is the muscular wall (myocardium) of the mammalian Left Ventricle approximately three times thicker than that of the Right Ventricle?",
            options: [
              "It must generate high pressure to pump blood throughout the entire systemic body loop, whereas the right ventricle pumps only to nearby lungs",
              "It holds three times greater blood volume per beat than the right ventricle",
              "It pumps blood upward into the brain against higher carbon dioxide levels",
              "The right ventricle contains no cardiac muscle cells"
            ],
            correctAnswer: "It must generate high pressure to pump blood throughout the entire systemic body loop, whereas the right ventricle pumps only to nearby lungs",
            explanation: "Both ventricles eject equal stroke volumes (~70 mL), but systemic resistance across the whole body requires ~120 mmHg pressure vs ~25 mmHg in delicate lung capillaries.",
            hintLadder: [
              "Where does the right ventricle send blood compared to the left ventricle?",
              "Delicate lung capillaries would rupture under high systemic pressure.",
              "Systemic circulation spans the whole body against high resistance."
            ],
            misconceptionAlerts: [
              { trigger: "It holds three times greater blood volume per beat than the right ventricle", note: "Stroke volumes of left and right ventricles are equal; only ejection PRESSURE differs." }
            ],
            skillId: "skill-sss-enzymes-osmosis-transport",
            difficulty: "medium",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p3-bio-c-5",
            type: "multiple_choice",
            questionText: "Plant leaf cells are submerged in 0.9 M concentrated NaCl solution. Which sequence correctly describes the osmotic outcome?",
            options: [
              "Water leaves the vacuole by osmosis down a water potential gradient, shrinking the protoplast away from the cell wall (plasmolysis)",
              "Water enters the cell rapidly until the rigid cellulose wall bursts",
              "Sodium ions pump water inward by active transport so cells swell",
              "Chloroplasts convert NaCl directly into starch grains"
            ],
            correctAnswer: "Water leaves the vacuole by osmosis down a water potential gradient, shrinking the protoplast away from the cell wall (plasmolysis)",
            explanation: "0.9 M NaCl is strongly hypertonic (lower water potential than vacuolar sap), drawing water out of the vacuole so the plasma membrane pulls inward from the wall.",
            hintLadder: [
              "Compare water potential inside cell sap vs concentrated 0.9 M NaCl.",
              "Water moves from higher water potential (sap) out into 0.9 M brine.",
              "When vacuole volume drops, the membrane detaches from the rigid cell wall."
            ],
            misconceptionAlerts: [
              { trigger: "Water enters the cell rapidly until the rigid cellulose wall bursts", note: "Concentrated salt draws water OUT, and plant cell walls resist bursting even in pure water." }
            ],
            skillId: "skill-sss-enzymes-osmosis-transport",
            difficulty: "hard",
            curriculumStandard: "JAMB_UTME"
          }
        ]
      }
    ]
  },
  {
    id: "unit-p3-sss-bio-genetics-ecology",
    subjectId: "sss_biology_genetics_ecology",
    level: "senior_secondary",
    title: "Mendelian Genetics, DNA Transcription & Ecological Energy Flow",
    code: "BIO-GEN-303",
    description:
      "Monohybrid and sex-linked Punnett predictions, complementary DNA->mRNA base pairing, and trophic energy transfer efficiency pyramids.",
    order: 2,
    category: "core",
    estimatedHours: 5.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:SSS-BIO-GEN-ECO",
      "JAMB_UTME:BIO-MENDEL-ECO",
      "CAMBRIDGE_IGCSE:0610-INHERIT-ECO"
    ],
    skills: [
      {
        id: "skill-sss-mendelian-dna-ecosystems",
        unitId: "unit-p3-sss-bio-genetics-ecology",
        title: "Mendelian Inheritance, Nucleic Acids & Trophic Pyramids",
        code: "SKL-BIO-GEN-303",
        summary:
          "Resolve dominant/recessive and X-linked genetic crosses via Punnett grids, transcribe complementary DNA-to-mRNA sequences, and compute 10% trophic energy transfer.",
        objectives: [
          "Predict F1/F2 genotype and phenotype ratios for monohybrid (3:1), test-cross (1:1), and X-linked carrier crosses",
          "Apply Chargaff base pairing (DNA A-T, C-G; mRNA A-U, T-A, C-G) and triplet codon translation logic",
          "Calculate biomass/energy transfer efficiency (~10% per trophic level) explaining food-chain length limits"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-percent-ratios"],
        lesson: {
          id: "les-sss-mendelian-dna-ecosystems",
          title: "Classical Genetics, Central Dogma Base-Pairing & Ecosystem Energetics",
          hookAndIntuition:
            "Why can two healthy brown-eyed parents have a blue-eyed child, how does a single letter swap in DNA cause sickle-cell anaemia, and why are apex eagles thousands of times rarer than savanna grass?",
          conceptualExplanation:
            "Genes reside at specific chromosomal loci as alternative alleles (dominant T vs recessive t). Crossing two heterozygotes (Tt × Tt) yields genotypic ratio 1 TT : 2 Tt : 1 tt and phenotypic ratio 3 tall : 1 dwarf. Crossing an unknown dominant phenotype against a homozygous recessive tester (tt) distinguishes TT (100% dominant) from Tt (1:1 split). In X-linked recessive disorders (like haemophilia X^h), mothers can be asymptomatic carriers (X^H X^h) who pass X^h to 50% of sons (expressing the trait since males carry only one X chromosome). Molecularly, DNA (double-stranded A=T, G≡C) is transcribed into single-stranded mRNA replacing Thymine (T) with Uracil (U). Ecologically, sunlight captured by producers passes upward with only ~10% efficiency per trophic step—90% is lost via cellular respiration heat, movement, and undigested waste—capping food chains at 4-5 levels.",
          conceptualModel:
            "Tt × Tt -> 1:2:1 Genotype (3:1 Phenotype)  |  DNA(A,T,G,C) -> mRNA(U,A,C,G)  |  Trophic Energy: E_{n+1} ≈ 0.10 E_n.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Monohybrid F2: 1 AA : 2 Aa : 1 aa  (3 : 1 phenotype)",
              definition: "Standard Punnett distribution when two heterozygous carriers interbreed.",
              practicalExample: "Hb^A Hb^S × Hb^A Hb^S yields 25% Hb^A Hb^A, 50% Hb^A Hb^S (trait), 25% Hb^S Hb^S."
            },
            {
              termOrSymbol: "Transcription Base Pairing: DNA A -> mRNA U; T -> A; G <-> C",
              definition: "RNA polymerase synthesizes mRNA complementary to the 3'->5' DNA template strand using Uracil.",
              practicalExample: "DNA template 3'-TAC GGA-5' transcribes to mRNA 5'-AUG CCU-3'."
            },
            {
              termOrSymbol: "Trophic Transfer Efficiency ≈ 10%",
              definition: "Fraction of assimilated energy converted into new consumer biomass at the next trophic level.",
              practicalExample: "20,000 kJ producer -> 2,000 kJ herbivore -> 200 kJ primary carnivore -> 20 kJ apex."
            }
          ],
          workedExamples: [
            {
              title: "X-Linked Recessive Pedigree & Carrier Risk Analysis",
              problemStatement: "Haemophilia (h) is X-linked recessive relative to normal clotting (H). A carrier woman (X^H X^h) marries a normal man (X^H Y). Find the probability that (a) a son is haemophilic, and (b) any child is haemophilic.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "List gametes from each parent.",
                  reasoning: "Mother produces X^H (50%) and X^h (50%). Father produces X^H (50%) and Y (50%)."
                },
                {
                  stepNumber: 2,
                  instruction: "Construct the 2×2 Punnett grid of offspring genotypes.",
                  reasoning: "Daughters: X^H X^H (normal), X^H X^h (normal carrier). Sons: X^H Y (normal), X^h Y (haemophilic)."
                },
                {
                  stepNumber: 3,
                  instruction: "Compute probability specifically among sons.",
                  reasoning: "Out of the two male outcomes (X^H Y and X^h Y), 1/2 = 50% of sons express haemophilia."
                },
                {
                  stepNumber: 4,
                  instruction: "Compute probability across ALL children.",
                  reasoning: "Out of all 4 equally likely genotypes, only X^h Y (1/4 = 25%) expresses the disorder."
                }
              ],
              takeawayRule: "Always read genetic probability questions carefully to check whether the denominator is 'all offspring' (1/4) or 'all sons' (1/2)."
            },
            {
              title: "Transcribing DNA Template Sequence & Calculating Trophic Pyramid Energy",
              problemStatement: "Transcribe the DNA template strand 3'-TAC-GCA-ATT-5' into mRNA, and determine how much energy reaches tertiary consumers if producers capture 50,000 kJ at 10% transfer efficiency per step.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Pair each DNA nucleotide with its complementary RNA nucleotide (A->U, T->A, C->G, G->C).",
                  reasoning: "TAC -> AUG;  GCA -> CGU;  ATT -> UAA (stop codon)."
                },
                {
                  stepNumber: 2,
                  instruction: "Check that NO Thymine (T) appears in the mRNA strand.",
                  reasoning: "Resulting mRNA: 5'-AUG-CGU-UAA-3' (start codon AUG + Arg codon CGU + stop codon UAA)."
                },
                {
                  stepNumber: 3,
                  instruction: "Track energy through each trophic transfer (Producer -> Primary -> Secondary -> Tertiary).",
                  reasoning: "Producer = 50,000 kJ -> Primary consumer (10%) = 5,000 kJ -> Secondary consumer = 500 kJ."
                },
                {
                  stepNumber: 4,
                  instruction: "Compute the final 10% step to Tertiary Consumers.",
                  reasoning: "Tertiary consumer = 10% of 500 kJ = 50 kJ (99.9% of initial energy lost across 3 steps!)."
                }
              ],
              takeawayRule: "Every RNA molecule substitutes Uracil (U) for Thymine (T), and every trophic link sheds roughly 90% of incoming energy."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Leaving Thymine (T) in an mRNA sequence when transcribing from DNA.",
              whyItIsWrong: "RNA incorporates Uracil (U) complementary to DNA Adenine (A); Thymine is exclusive to DNA.",
              correctCorrection: "Replace every T in an RNA transcript with U (A_DNA -> U_RNA)."
            },
            {
              misconception: "Claiming energy is 'recycled' through ecosystems like carbon or nitrogen atoms.",
              whyItIsWrong: "Nutrients (C, N, P) cycle infinitely via decomposers, whereas solar energy flows ONE WAY and dissipates irrecoverably as metabolic heat.",
              correctCorrection: "Matter cycles; energy flows unidirectionally and requires continuous sunlight input."
            }
          ],
          guidedPracticePrompt: "Two carriers for sickle-cell trait (Hb^A Hb^S) marry. What percentage of their children are expected to inherit sickle-cell disease (Hb^S Hb^S)?",
          independentPracticePrompt: "Transcribe DNA template 3'-ATG-CCC-TGA-5' into complementary mRNA.",
          extensionActivity: "Distinguish between pyramid of numbers (can invert on a single huge oak tree supporting thousands of aphids) and pyramid of energy (never inverts).",
          diagnosticSelfCheck: "Why can a human father NEVER pass an X-linked trait directly to his son?",
          transferApplication: "Explain how selective breeding and genetic DNA markers accelerate drought-tolerant maize development.",
          masteryAssessment: "Compute the maximum number of primary consumers (needing 400 kJ each) supportable by 120,000 kJ of grass at 10% efficiency.",
          summaryRecap: "Resolve Punnett genotypes carefully, enforce A->U RNA base pairing during transcription, and account for 90% respiratory losses across ecological trophic pyramids.",
          estimatedMinutes: 115
        },
        questions: [
          {
            id: "q-p3-bio-g-1",
            type: "multiple_choice",
            questionText: "In garden peas, purple flower allele (P) is dominant over white allele (p). If two heterozygous purple plants (Pp × Pp) are crossed, what fraction of offspring are expected to bear WHITE flowers?",
            options: ["1/4 (25%)", "1/2 (50%)", "3/4 (75%)", "0%"],
            correctAnswer: "1/4 (25%)",
            explanation: "Pp × Pp yields genotypes 1 PP : 2 Pp : 1 pp. Only homozygous recessive pp (1/4 = 25%) expresses white flowers.",
            hintLadder: [
              "Draw the 2×2 Punnett square for P, p crossed with P, p.",
              "Only the 'pp' square expresses the recessive white phenotype.",
              "1 out of 4 squares is pp = 25%."
            ],
            misconceptionAlerts: [
              { trigger: "3/4 (75%)", note: "75% (PP + Pp + Pp) express the dominant purple phenotype, not white." }
            ],
            skillId: "skill-sss-mendelian-dna-ecosystems",
            difficulty: "easy",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p3-bio-g-2",
            type: "multiple_choice",
            questionText: "What complementary mRNA sequence is transcribed from the DNA template strand 3'-T-A-C-G-A-T-5'?",
            options: ["5'-A-U-G-C-U-A-3'", "5'-A-T-G-C-T-A-3'", "5'-U-A-C-G-A-U-3'", "5'-A-U-G-C-T-A-3'"],
            correctAnswer: "5'-A-U-G-C-U-A-3'",
            explanation: "Base pairing DNA->mRNA maps T->A, A->U, C->G, G->C, A->U, T->A, yielding 5'-A-U-G-C-U-A-3'.",
            hintLadder: [
              "Pair DNA T->A, C->G, G->C.",
              "Pair DNA A with RNA Uracil (U), never Thymine (T).",
              "Verify zero 'T' letters appear in the RNA option."
            ],
            misconceptionAlerts: [
              { trigger: "5'-A-T-G-C-T-A-3'", note: "Thymine (T) is absent from mRNA; DNA Adenine pairs with RNA Uracil (U)." }
            ],
            skillId: "skill-sss-mendelian-dna-ecosystems",
            difficulty: "easy",
            curriculumStandard: "CAMBRIDGE_IGCSE"
          },
          {
            id: "q-p3-bio-g-3",
            type: "multiple_choice",
            questionText: "In a grassland food chain (Grass -> Grasshopper -> Toad -> Hawk), grass fixes 80,000 kJ of chemical energy. Assuming 10% energy transfer efficiency at each trophic step, how much energy reaches the Hawks?",
            options: ["80 kJ", "800 kJ", "8,000 kJ", "8 kJ"],
            correctAnswer: "80 kJ",
            explanation: "Grass (80,000) -> Grasshopper (8,000) -> Toad (800) -> Hawk (80 kJ).",
            hintLadder: [
              "Count the transfer steps: Grass -> Grasshopper -> Toad -> Hawk (3 transfers).",
              "Divide by 10 three times: 80,000 -> 8,000 -> 800 -> 80 kJ.",
              "Check units carefully."
            ],
            misconceptionAlerts: [
              { trigger: "800 kJ", note: "800 kJ is the energy level at the Toad (secondary consumer), one step before Hawk." }
            ],
            skillId: "skill-sss-mendelian-dna-ecosystems",
            difficulty: "medium",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p3-bio-g-4",
            type: "multiple_choice",
            questionText: "Why does the pyramid of ENERGY in any stable ecosystem NEVER appear inverted, unlike a pyramid of numbers?",
            options: [
              "Roughly 90% of assimilated energy is lost as respiratory heat and waste at every trophic transfer",
              "Top predators always weigh less individually than bacteria",
              "Energy is continuously created from nothing at the highest trophic tier",
              "Producers respire zero energy during the night"
            ],
            correctAnswer: "Roughly 90% of assimilated energy is lost as respiratory heat and waste at every trophic transfer",
            explanation: "By the Second Law of Thermodynamics, each consumer level loses ~90% of incoming energy via respiration, excretion, and unassimilated tissues, guaranteeing strictly smaller energy bars upward.",
            hintLadder: [
              "Think about thermodynamics: can consumers store more energy than they eat?",
              "Respiration, movement, and faeces drain ~90% per step.",
              "Energy available always decreases strictly up the chain."
            ],
            misconceptionAlerts: [
              { trigger: "Energy is continuously created from nothing at the highest trophic tier", note: "Energy cannot be created (First Law of Thermodynamics); it enters via photosynthesis and dissipates as heat." }
            ],
            skillId: "skill-sss-mendelian-dna-ecosystems",
            difficulty: "medium",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p3-bio-g-5",
            type: "multiple_choice",
            questionText: "Red-green colour blindness is X-linked recessive (X^b). A woman with normal vision whose father was colour-blind (making her X^B X^b) has a son with a normal-vision man (X^B Y). What is the probability that their SON will be colour-blind?",
            options: ["50% (1/2)", "25% (1/4)", "100%", "0%"],
            correctAnswer: "50% (1/2)",
            explanation: "The son inherits Y from his father and either X^B (50%) or X^b (50%) from his mother. Thus a son has a 50% probability of being X^b Y.",
            hintLadder: [
              "A son receives Y from his father, so his X chromosome comes solely from his mother.",
              "The carrier mother has genotype X^B X^b (50% X^B, 50% X^b).",
              "Therefore 1 out of 2 possible son genotypes (X^b Y) is affected."
            ],
            misconceptionAlerts: [
              { trigger: "25% (1/4)", note: "25% is the probability across ALL children (boys + girls combined); given the child is a SON, the risk is 50%." }
            ],
            skillId: "skill-sss-mendelian-dna-ecosystems",
            difficulty: "hard",
            curriculumStandard: "JAMB_UTME"
          }
        ]
      }
    ]
  },
  {
    id: "unit-p3-sss-agric-soil-chemistry",
    subjectId: "sss_agricultural_engineering",
    level: "senior_secondary",
    title: "Soil pH Chemistry, Cation Exchange, NPK Dosage & Irrigation",
    code: "AGR-ENG-304",
    description:
      "Cation Exchange Capacity (CEC) and calcium liming stoichiometry, NPK 15-15-15 fertilizer nutrient computation, and drip vs furrow irrigation efficiency.",
    order: 2,
    category: "applied",
    estimatedHours: 4.5,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:SSS-AGR-SOIL-CHM",
      "NERDC_NIGERIAN:SS2-AGR-FERT",
      "GLOBAL_STEM:AGRO-IRRIGATION"
    ],
    skills: [
      {
        id: "skill-sss-soil-ph-cation-irrigation",
        unitId: "unit-p3-sss-agric-soil-chemistry",
        title: "Soil pH Liming, NPK Stoichiometry & Irrigation Engineering",
        code: "SKL-AGR-ENG-304",
        summary:
          "Manage acidic soil pH via agricultural liming, compute exact elemental N, P₂O₅, and K₂O mass from NPK fertilizer bags, and evaluate irrigation water-use efficiency.",
        objectives: [
          "Explain clay-humus Cation Exchange Capacity (CEC) and calculate lime neutralization effects on acidic soils",
          "Compute active elemental nitrogen, phosphorus, and potassium mass inside compound NPK fertilizer bags",
          "Evaluate conveyance efficiency and root-zone delivery across surface furrow, sprinkler, and drip irrigation"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-percent-ratios", "skill-jss-soil-crop-husbandry"],
        lesson: {
          id: "les-sss-soil-ph-cation-irrigation",
          title: "Soil Colloid Chemistry, NPK Nutrient Budgeting & Precision Irrigation",
          hookAndIntuition:
            "A 50 kg bag stamped 'NPK 15-15-15' does not contain 50 kg of plant food—only 45% of its weight is active N, P₂O₅, and K₂O, and if soil pH drops below 5.0, phosphorus locks up chemically before roots can drink a drop.",
          conceptualExplanation:
            "Negatively charged clay platelets and humic colloids attract positively charged cations (Ca²⁺, Mg²⁺, K⁺, NH₄⁺) against leaching—this buffering reservoir is Cation Exchange Capacity (CEC). Heavy tropical rainfall leaches basic Ca²⁺/Mg²⁺ ions and leaves excess H⁺ and Al³⁺ ions, driving soil acidity (pH < 5.5) that precipitates phosphate and starves Rhizobium bacteria. Applying agricultural lime (CaCO₃ or CaO) neutralizes H⁺ ions via CaCO₃ + 2H⁺ -> Ca²⁺ + H₂O + CO₂, restoring target pH 6.0–6.8. On compound fertilizer labels such as NPK 20-10-10, the three percentages indicate active N, P₂O₅, and K₂O by mass (total active = 40%, leaving 60% inert carrier). In irrigation engineering, Application Efficiency η = (Water stored in root zone / Water delivered) × 100%, peaking near 90–95% under subsurface drip emitters.",
          conceptualModel:
            "Humus/Clay Colloid(-) holds Ca²⁺, Mg²⁺, K⁺ (CEC)  |  NPK x-y-z => x% N, y% P₂O₅, z% K₂O  |  Drip Efficiency (~90%) >> Furrow (~55%).",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Active Nutrient Mass = (Grade% / 100) × Bag Mass",
              definition: "Calculates actual kg of N, P₂O₅, or K₂O supplied by a compound fertilizer grade.",
              practicalExample: "One 50 kg bag of NPK 20-10-10 supplies 10 kg N, 5 kg P₂O₅, and 5 kg K₂O (20 kg total)."
            },
            {
              termOrSymbol: "CaCO₃ + 2H⁺  ->  Ca²⁺ + CO₂ + H₂O",
              definition: "Agricultural liming reaction replacing exchangeable acid H⁺ on soil colloids with Ca²⁺.",
              practicalExample: "Raises acidic pH 4.8 soil into optimal nutrient-availability band pH 6.5."
            },
            {
              termOrSymbol: "Irrigation Efficiency η = (V_rootzone / V_applied) × 100%",
              definition: "Ratio of water beneficially stored in the crop root zone to total volume pumped.",
              practicalExample: "Drip systems deliver 90 L to roots per 100 L pumped (η = 90%)."
            }
          ],
          workedExamples: [
            {
              title: "Computing NPK Fertilizer Bag Requirements per Hectare",
              problemStatement: "An agronomist recommends 60 kg/ha of Nitrogen (N) for hybrid maize using 50 kg bags of NPK 15-15-15. How many bags are needed per hectare, and how much carrier filler is in each bag?",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Calculate the mass of elemental Nitrogen inside ONE 50 kg bag of NPK 15-15-15.",
                  reasoning: "15% of 50 kg = 0.15 × 50 = 7.5 kg of N per bag."
                },
                {
                  stepNumber: 2,
                  instruction: "Divide target 60 kg/ha Nitrogen by 7.5 kg N/bag.",
                  reasoning: "Bags needed = 60 / 7.5 = 8 bags per hectare (total 400 kg fertilizer)."
                },
                {
                  stepNumber: 3,
                  instruction: "Verify corresponding P₂O₅ and K₂O delivered alongside the Nitrogen.",
                  reasoning: "Since P₂O₅ and K₂O are also 15%, 8 bags supply 60 kg P₂O₅ and 60 kg K₂O simultaneously."
                },
                {
                  stepNumber: 4,
                  instruction: "Calculate total active nutrient percentage and inert filler mass per 50 kg bag.",
                  reasoning: "Active sum = 15% + 15% + 15% = 45% (22.5 kg active). Inert carrier filler = 55% of 50 kg = 27.5 kg."
                }
              ],
              takeawayRule: "Always calculate kg of nutrient PER BAG first ((Grade%/100) × Bag Weight), then divide total target kg/ha by that per-bag yield."
            },
            {
              title: "Diagnosing Acid Soil Toxicity & Selecting Precision Irrigation",
              problemStatement: "A leached rainforest soil tests at pH 4.6 with stunted legumes and phosphorus deficiency symptoms, while dry-season tomato plots lose 45% of pumped canal water. Propose a chemical and hydraulic solution.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Explain why pH 4.6 causes simultaneous legume failure and phosphorus lock-up.",
                  reasoning: "Below pH 5.0, Rhizobium bacteria fail to nodulate and soluble Al³⁺/Fe³⁺ ions precipitate phosphate into insoluble minerals."
                },
                {
                  stepNumber: 2,
                  instruction: "Prescribe agricultural liming stoichiometry.",
                  reasoning: "Incorporate finely ground limestone (CaCO₃) or dolomite (CaMg(CO₃)₂) to neutralize H⁺ and raise pH to 6.2–6.5."
                },
                {
                  stepNumber: 3,
                  instruction: "Analyze the 45% water loss under open surface canal/furrow irrigation.",
                  reasoning: "Open channels suffer deep percolation and evaporation (η ≈ 55%)."
                },
                {
                  stepNumber: 4,
                  instruction: "Prescribe drip irrigation and quantify water savings.",
                  reasoning: "Drip emitters deliver water slowly directly to root zones (η ≈ 90%), cutting pumping volume by nearly 39% for the same crop water uptake."
                }
              ],
              takeawayRule: "Liming restores both microbial N₂ fixation and phosphate solubility; drip irrigation slashes evaporative loss in arid/dry seasons."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Assuming a 50 kg bag of NPK 15-15-15 contains 15 kg of Nitrogen.",
              whyItIsWrong: "The numbers 15-15-15 are PERCENTAGES (15 kg per 100 kg), so a 50 kg bag holds half that: 7.5 kg of Nitrogen.",
              correctCorrection: "Multiply the percentage grade by the actual bag weight (e.g. 0.15 × 50 kg = 7.5 kg)."
            },
            {
              misconception: "Applying elemental sulphur to fix overly acidic soil.",
              whyItIsWrong: "Elemental sulphur oxidizes to sulphuric acid, pushing pH even LOWER (for alkaline soils only).",
              correctCorrection: "Use basic limestone (CaCO₃) or quicklime (CaO) to RAISE acidic soil pH; use sulphur/gypsum only to lower high-pH alkaline soils."
            }
          ],
          guidedPracticePrompt: "How many kg of Nitrogen are inside four 50 kg bags of Urea (46-0-0)?",
          independentPracticePrompt: "Why does adding organic compost alongside clay boost soil Cation Exchange Capacity (CEC)?",
          extensionActivity: "Compare fertigation efficiency in greenhouse drip systems against broadcast granular fertilization.",
          diagnosticSelfCheck: "Why are 55% of the mass of an NPK 15-15-15 bag non-nutrient carrier materials?",
          transferApplication: "Design a water budget for 1 hectare needing 4,500 m³ crop ET using 90%-efficient drip vs 50%-efficient furrow irrigation.",
          masteryAssessment: "Compute the total bags of NPK 20-10-10 (50 kg each) required to supply 80 kg/ha of Nitrogen.",
          summaryRecap: "Buffer acidic soils via CaCO₃ liming, compute exact active nutrient weights from NPK grade percentages, and select drip systems for maximum water-use efficiency.",
          estimatedMinutes: 105
        },
        questions: [
          {
            id: "q-p3-agr-e-1",
            type: "multiple_choice",
            questionText: "How many kilograms of elemental Nitrogen (N) are contained in ONE 50 kg bag of compound fertilizer labeled NPK 20-10-10?",
            options: ["10 kg", "20 kg", "5 kg", "40 kg"],
            correctAnswer: "10 kg",
            explanation: "NPK 20-10-10 contains 20% Nitrogen by mass. Therefore 20% of 50 kg = 0.20 × 50 = 10 kg N.",
            hintLadder: [
              "The first number (20) represents % Nitrogen.",
              "Multiply 20% (0.20) by the 50 kg bag weight.",
              "0.20 × 50 = 10 kg."
            ],
            misconceptionAlerts: [
              { trigger: "20 kg", note: "20 kg would be true for a 100 kg sack, whereas this bag weighs 50 kg." }
            ],
            skillId: "skill-sss-soil-ph-cation-irrigation",
            difficulty: "easy",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p3-agr-e-2",
            type: "multiple_choice",
            questionText: "Which agricultural amendment is applied to an overly acidic rainforest soil (pH 4.7) to raise its pH toward the optimal 6.0–6.8 crop range?",
            options: [
              "Finely ground agricultural limestone (CaCO₃)",
              "Elemental sulphur powder",
              "Ammonium sulphate fertilizer",
              "Concentrated phosphoric acid"
            ],
            correctAnswer: "Finely ground agricultural limestone (CaCO₃)",
            explanation: "Calcium carbonate neutralizes excess H⁺ ions and supplies exchangeable Ca²⁺ on clay-humus colloids, raising soil pH safely.",
            hintLadder: [
              "Soil pH 4.7 is acidic and needs a basic (alkaline) neutralizing carbonate.",
              "Sulphur and ammonium sulphate make soil MORE acidic.",
              "Agricultural limestone (CaCO₃) neutralizes acidity."
            ],
            misconceptionAlerts: [
              { trigger: "Elemental sulphur powder", note: "Sulphur oxidizes to sulphuric acid and is used to LOWER alkaline pH, not raise acidic pH." }
            ],
            skillId: "skill-sss-soil-ph-cation-irrigation",
            difficulty: "easy",
            curriculumStandard: "NERDC_NIGERIAN"
          },
          {
            id: "q-p3-agr-e-3",
            type: "multiple_choice",
            questionText: "A tomato farmer needs to apply 45 kg of Nitrogen per hectare using 50 kg bags of NPK 15-15-15. How many bags must be purchased per hectare?",
            options: ["6 bags", "3 bags", "9 bags", "15 bags"],
            correctAnswer: "6 bags",
            explanation: "Each 50 kg bag yields 15% of 50 = 7.5 kg N. Bags needed = 45 / 7.5 = 6 bags.",
            hintLadder: [
              "Find N per 50 kg bag: 0.15 × 50 = 7.5 kg.",
              "Divide target 45 kg N by 7.5 kg/bag.",
              "45 / 7.5 = 6 bags."
            ],
            misconceptionAlerts: [
              { trigger: "3 bags", note: "3 bags only supply 22.5 kg N (mistaking % for kg per 50 kg bag)." }
            ],
            skillId: "skill-sss-soil-ph-cation-irrigation",
            difficulty: "medium",
            curriculumStandard: "WAEC_WASSCE"
          },
          {
            id: "q-p3-agr-e-4",
            type: "multiple_choice",
            questionText: "A crop requires 3,600 m³ of water stored directly in its root zone over a dry season. How much total water must be pumped if a precision drip system operates at 90% application efficiency?",
            mathExpression: "\\eta = \\frac{V_{\\text{root}}}{V_{\\text{pumped}}} = 0.90",
            options: ["4,000 m³", "3,240 m³", "4,500 m³", "3,690 m³"],
            correctAnswer: "4,000 m³",
            explanation: "V_pumped = V_root / η = 3,600 / 0.90 = 4,000 m³.",
            hintLadder: [
              "You always pump slightly MORE water than reaches the roots due to minor losses.",
              "Divide root-zone need (3,600 m³) by efficiency (0.90).",
              "Check: 90% of 4,000 = 3,600 m³."
            ],
            misconceptionAlerts: [
              { trigger: "3,240 m³", note: "Multiplying 3,600 × 0.90 yields LESS pumped water than the crop requires." }
            ],
            skillId: "skill-sss-soil-ph-cation-irrigation",
            difficulty: "medium",
            curriculumStandard: "GLOBAL_STEM"
          },
          {
            id: "q-p3-agr-e-5",
            type: "multiple_choice",
            questionText: "Why does adding decomposed humic organic matter dramatically improve fertilizer retention in sandy tropical soils?",
            options: [
              "Negatively charged humus surfaces boost Cation Exchange Capacity (CEC), electrostatically holding Ca²⁺, K⁺, and NH₄⁺ against rainfall leaching",
              "Humus melts sand grains together into impermeable concrete",
              "Humus repels all water molecules so nutrients never dissolve",
              "Humus converts K⁺ ions into volatile potassium gas"
            ],
            correctAnswer: "Negatively charged humus surfaces boost Cation Exchange Capacity (CEC), electrostatically holding Ca²⁺, K⁺, and NH₄⁺ against rainfall leaching",
            explanation: "Carboxyl and phenolic hydroxyl groups on humus carry negative surface charges that adsorb nutrient cations reversibly, raising CEC far above pure quartz sand.",
            hintLadder: [
              "Nutrient minerals such as K⁺, Ca²⁺, and NH₄⁺ carry positive charges.",
              "What charge must soil colloids carry to attract and hold positive cations?",
              "Humus provides high-surface-area negative exchange sites (high CEC)."
            ],
            misconceptionAlerts: [
              { trigger: "Humus repels all water molecules so nutrients never dissolve", note: "Humus actually absorbs many times its weight in capillary water while holding cations electrostatically." }
            ],
            skillId: "skill-sss-soil-ph-cation-irrigation",
            difficulty: "hard",
            curriculumStandard: "WAEC_WASSCE"
          }
        ]
      }
    ]
  }
];
