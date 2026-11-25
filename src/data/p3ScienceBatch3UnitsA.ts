import { Unit } from "../types/curriculum";

export const P3_SCIENCE_BATCH3_UNITS_A: Unit[] = [
  // =========================================================================
  // 1. pri_171_plants_animals_ecosystem_relationshi
  // =========================================================================
  {
    id: "unit-p3-pri-plants-animals-ecosystems",
    subjectId: "pri_171_plants_animals_ecosystem_relationshi",
    level: "upper_primary",
    title: "Plants, Animals, Food Webs & Ecosystem Interdependence",
    code: "PRI-ECO-171",
    description:
      "Master photosynthesis vs respiration, food chains and energy direction arrows, herbivore/carnivore/omnivore/decomposer roles, structural adaptations, and mutualism/parasitism.",
    order: 2,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:PRI5-SCI-ECO-01",
      "COMMON_ENTRANCE:SCI-ECO-171",
      "CAMBRIDGE_PRIMARY:SCI-HAB-ECO"
    ],
    skills: [
      {
        id: "skill-pri-plants-animals-ecosystems",
        unitId: "unit-p3-pri-plants-animals-ecosystems",
        title: "Producers, Food Webs, Adaptations & Symbiotic Relationships",
        code: "SKL-PRI-ECO-171",
        summary:
          "Trace solar energy flow from green plant producers through consumers and decomposers, interpret food-web disruptions, and classify organism adaptations.",
        objectives: [
          "Distinguish producers (photosynthesis), primary/secondary consumers, and nutrient-recycling decomposers",
          "Read food chain arrows strictly as 'energy flows from eaten organism → eater'",
          "Predict population ripple effects across food webs and identify mutualistic vs parasitic symbiosis"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-science-living", "skill-pri-env-pollution-3rs"],
        lesson: {
          id: "les-pri-plants-animals-ecosystems",
          title: "Plants, Animals & Ecosystem Relationships",
          hookAndIntuition:
            "Every bite of food on your plate runs on captured sunlight: green leaves trap solar energy first, passing it up food webs before fungi and bacteria return nutrients back to the soil.",
          conceptualExplanation:
            "An ecosystem unites living communities (biotic: plants, animals, microbes) with non-living conditions (abiotic: sunlight, water, temperature, soil minerals). Green plants are PRODUCERS because chlorophyll inside leaves uses sunlight, water, and carbon dioxide (CO₂) to build glucose sugar and release oxygen (O₂). Animals are CONSUMERS: herbivores eat plants directly, carnivores eat animals, and omnivores eat both. When organisms die or shed waste, DECOMPOSERS (fungi and soil bacteria) break down organic matter into mineral nitrates returned to plant roots.\n\nIn every food chain diagram (e.g., Maize → Grasshopper → Toad → Hawk), arrows NEVER point toward who gets eaten—every arrow shows ENERGY FLOW from the organism being eaten into the eater. Organisms thrive in specific habitats through adaptations (cactus thick stems store water; duck webbed feet push water). Species living closely together form symbiosis: mutualism benefits both (bee + flower), commensalism benefits one without harming the other, and parasitism harms the host (tick + dog).",
          conceptualModel:
            "Sun → Producer (Plant) → Primary Consumer (Herbivore) → Secondary Consumer (Carnivore) ──▶ Decomposers → Soil Minerals → Plants.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Food Chain Arrow (A → B)",
              definition: "Reads 'A provides energy to B' (B eats A), always beginning with a photosynthetic producer.",
              practicalExample: "Waterweed → Tilapia → Kingfisher shows energy flowing from waterweed to tilapia to kingfisher."
            },
            {
              termOrSymbol: "Decomposers (Fungi & Bacteria)",
              definition: "Recyclers converting dead leaves and animal waste back into fertile soil minerals.",
              practicalExample: "Without decomposers, fallen forest leaves would pile up and soils would run out of nitrates."
            },
            {
              termOrSymbol: "Mutualism (+ / +) vs Parasitism (+ / −)",
              definition: "Mutualism helps both partners; parasitism feeds one partner at the host's expense.",
              practicalExample: "Nitrogen-fixing Rhizobium bacteria in cowpea roots = mutualism; malaria Plasmodium in humans = parasitism."
            }
          ],
          workedExamples: [
            {
              title: "Predicting Food Web Ripple Effects When One Species Drops",
              problemStatement: "In the food chain Grass → Rabbit → Fox → Eagle, a disease kills most of the Foxes. Predict what happens to the Rabbit and Grass populations in the next season.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Identify which organism directly feeds on Foxes and which organism Foxes eat.",
                  reasoning: "Foxes eat Rabbits (predator of Rabbit) and are eaten by Eagles."
                },
                {
                  stepNumber: 2,
                  instruction: "Trace the immediate effect on Rabbits after losing their predator.",
                  reasoning: "With fewer Foxes hunting them, the Rabbit population INCREASES sharply."
                },
                {
                  stepNumber: 3,
                  instruction: "Trace the downstream effect on Grass eaten by Rabbits.",
                  reasoning: "More Rabbits overgraze the pasture, causing the Grass population to DECREASE."
                },
                {
                  stepNumber: 4,
                  instruction: "Trace the upward effect on Eagles.",
                  reasoning: "With fewer Foxes available as food, Eagles decline unless they switch prey."
                }
              ],
              takeawayRule: "Removing a predator first boosts its prey population, which then reduces the plant producers below."
            },
            {
              title: "Matching Structural Adaptations to Habitat Challenges",
              problemStatement: "Explain why a savanna Baobab tree and a desert Cactus share swollen stems yet differ in leaf shape from a rainforest Mahogany tree.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Identify the limiting abiotic factor in savanna/desert vs rainforest.",
                  reasoning: "Dry biomes lack steady rainfall; wet rainforests have abundant water but fierce competition for sunlight."
                },
                {
                  stepNumber: 2,
                  instruction: "Match cactus spines and thick waxy stems to water conservation.",
                  reasoning: "Tiny spines cut transpiration water loss and deter herbivores, while fleshy stems store water."
                },
                {
                  stepNumber: 3,
                  instruction: "Contrast with broad rainforest drip-tip leaves.",
                  reasoning: "Broad leaves catch scarce shaded light under the canopy, and drip-tips shed heavy rain to stop fungal rot."
                },
                {
                  stepNumber: 4,
                  instruction: "Summarize adaptive principle.",
                  reasoning: "Physical structures always match the habitat's main survival bottleneck (water vs sunlight)."
                }
              ],
              takeawayRule: "In dry habitats leaves shrink (spines) to conserve water; in shaded wet forests leaves broaden to maximize sunlight capture."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Drawing food chain arrows from predator to prey (Lion → Zebra because lion hunts zebra).",
              whyItIsWrong: "Food chain arrows track energy transfer from food source INTO the consumer, not hunting direction.",
              correctCorrection: "Point every arrow from the organism being eaten TO the eater: Grass → Zebra → Lion."
            },
            {
              misconception: "Thinking plants only produce oxygen and do NOT respire.",
              whyItIsWrong: "Plant cells are alive 24 hours a day and carry out cellular respiration continuously, though daytime photosynthesis makes more O₂ than they consume.",
              correctCorrection: "Photosynthesis runs in light; cellular respiration runs day and night in both plants and animals."
            }
          ],
          guidedPracticePrompt: "Write a 4-step pond food chain starting with microscopic algae and identify the primary and secondary consumers.",
          independentPracticePrompt: "Explain why bees visiting hibiscus flowers illustrate mutualism rather than commensalism.",
          extensionActivity: "Observe compost leaves over 2 weeks to document fungi/earthworm decomposition turning waste into humus.",
          diagnosticSelfCheck: "What abiotic factor supplies the original energy entering almost every Earth food web?",
          transferApplication: "Explain how over-spraying broad-spectrum insecticides can accidentally starve insect-eating songbirds.",
          masteryAssessment: "Given Algae → Tadpole → Pike → Heron, if Pike disappear, what happens to Tadpoles and Algae?",
          summaryRecap: "Producers capture sunlight, arrows trace energy from prey to predator, decomposers close the mineral loop, and adaptations solve habitat bottlenecks.",
          estimatedMinutes: 85
        },
        questions: [
          {
            id: "q-pri-eco-1",
            type: "multiple_choice",
            questionText: "In the food chain Maize → Weaver Bird → Hawk, what does the arrow between Weaver Bird and Hawk represent?",
            mathExpression: "\\text{Maize} \\longrightarrow \\text{Weaver Bird} \\longrightarrow \\text{Hawk}",
            options: [
              "Energy transfers from the Weaver Bird to the Hawk when the Hawk eats it",
              "The Weaver Bird hunts and consumes the Hawk",
              "Sunlight flows backward from the Hawk to the Maize",
              "Both birds compete for the exact same prey"
            ],
            correctAnswer: "Energy transfers from the Weaver Bird to the Hawk when the Hawk eats it",
            explanation: "Food chain arrows always show the direction of energy flow from the organism eaten into the consumer.",
            hintLadder: [
              "Think about who eats whom in nature: Hawks are predators of smaller birds.",
              "Arrows never mean 'eats'; they mean 'is eaten by' (energy moves into the eater).",
              "Therefore energy flows from Weaver Bird into Hawk."
            ],
            misconceptionAlerts: [
              { trigger: "The Weaver Bird hunts and consumes the Hawk", note: "Remember food chain arrows show energy direction, not predation direction." }
            ],
            skillId: "skill-pri-plants-animals-ecosystems",
            difficulty: "easy"
          },
          {
            id: "q-pri-eco-2",
            type: "multiple_choice",
            questionText: "Which group of organisms breaks down dead logs, fallen leaves, and animal waste to return mineral nutrients to the soil?",
            mathExpression: "\\text{Dead Organic Matter} \\longrightarrow \\text{Soil Minerals}",
            options: [
              "Decomposers such as fungi and soil bacteria",
              "Primary producers such as grasses",
              "Apex carnivores such as eagles",
              "Pollinators such as honeybees"
            ],
            correctAnswer: "Decomposers such as fungi and soil bacteria",
            explanation: "Fungi and saprophytic bacteria decompose dead organic matter into inorganic nitrates and minerals usable again by plant roots.",
            hintLadder: [
              "Producers make sugar from sunlight; consumers eat plants or animals.",
              "Look for organisms that digest dead organic waste to recycle soil nutrients.",
              "Mushrooms (fungi) and bacteria perform decomposition."
            ],
            misconceptionAlerts: [
              { trigger: "Primary producers such as grasses", note: "Grasses absorb dissolved minerals rather than breaking down dead logs." }
            ],
            skillId: "skill-pri-plants-animals-ecosystems",
            difficulty: "easy"
          },
          {
            id: "q-pri-eco-3",
            type: "multiple_choice",
            questionText: "Honeybees drink sweet nectar from mango blossoms while brushing pollen between flowers to help the tree reproduce. What relationship is this?",
            mathExpression: "\\text{Bee } (+) \\longleftrightarrow \\text{Mango Flower } (+)",
            options: ["Mutualism", "Parasitism", "Predation", "Commensalism"],
            correctAnswer: "Mutualism",
            explanation: "Both organisms gain clear survival benefits (+/+): the bee gets food (nectar/pollen) and the tree achieves cross-pollination.",
            hintLadder: [
              "Ask whether each partner gains (+), loses (−), or is unaffected (0).",
              "Bee gains nectar (+); mango tree gets pollinated to produce fruit (+).",
              "+/+ cooperation is mutualism."
            ],
            misconceptionAlerts: [
              { trigger: "Commensalism", note: "Commensalism is (+/0) where one partner receives zero benefit, unlike pollination." }
            ],
            skillId: "skill-pri-plants-animals-ecosystems",
            difficulty: "medium"
          },
          {
            id: "q-pri-eco-4",
            type: "multiple_choice",
            questionText: "Why do desert cacti possess sharp spines instead of broad flat leaves, alongside thick waxy green stems?",
            mathExpression: "\\text{Small Surface Area} \\implies \\text{Low Transpiration}",
            options: [
              "To cut evaporative water loss in dry air while storing water and photosynthesizing in the stem",
              "To absorb rainwater directly through the sharp tips",
              "To sink deeper beneath shifting sand dunes",
              "To trap maximum shade inside dense dark forests"
            ],
            correctAnswer: "To cut evaporative water loss in dry air while storing water and photosynthesizing in the stem",
            explanation: "Broad leaves lose water rapidly through open stomata; reducing leaves to spines slashes evaporation and deters thirsty animals while the waxy green stem stores water and runs photosynthesis.",
            hintLadder: [
              "What is the scarcest abiotic resource in a desert biome?",
              "Water! Large flat leaves lose huge amounts of water vapor.",
              "Spines minimize surface area and waxy stems lock moisture inside."
            ],
            misconceptionAlerts: [
              { trigger: "To absorb rainwater directly through the sharp tips", note: "Cacti absorb rainwater via wide shallow roots, not spines." }
            ],
            skillId: "skill-pri-plants-animals-ecosystems",
            difficulty: "medium"
          },
          {
            id: "q-pri-eco-5",
            type: "multiple_choice",
            questionText: "In the grassland web Grass → Locust → Toad → Snake, a pesticide wipes out nearly all Toads. What is the most likely immediate double effect on Locusts and Grass?",
            mathExpression: "\\text{Toad } \\downarrow\\downarrow \\implies \\text{Locust } ?,\\; \\text{Grass } ?",
            options: [
              "Locust population surges upward, causing Grass quantity to fall",
              "Both Locust and Grass populations fall immediately",
              "Locust population falls while Grass grows unchecked",
              "Snakes multiply rapidly from eating extra Grass"
            ],
            correctAnswer: "Locust population surges upward, causing Grass quantity to fall",
            explanation: "Removing Toads releases Locusts from predation so Locust numbers rise, which over-consumes and reduces the Grass population.",
            hintLadder: [
              "Toads eat Locusts; with Toads gone, fewer Locusts get eaten.",
              "More Locusts survive and reproduce.",
              "What happens to Grass when far more Locusts graze on it?"
            ],
            misconceptionAlerts: [
              { trigger: "Locust population falls while Grass grows unchecked", note: "Toads are predators of Locusts, not food for Locusts." }
            ],
            skillId: "skill-pri-plants-animals-ecosystems",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. pri_172_human_body_systems_healthy_growth
  // =========================================================================
  {
    id: "unit-p3-pri-human-body-systems",
    subjectId: "pri_172_human_body_systems_healthy_growth",
    level: "upper_primary",
    title: "Human Body Organ Systems, Balanced Nutrition & Healthy Growth",
    code: "PRI-BOD-172",
    description:
      "Master digestive pathway and nutrient roles, respiratory gas exchange (O₂ in / CO₂ out), heart double-circulation (arteries vs veins), skeletal/muscular joints, and deficiency prevention.",
    order: 3,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:PRI5-SCI-HUM-01",
      "COMMON_ENTRANCE:SCI-BOD-172",
      "CAMBRIDGE_PRIMARY:SCI-HUM-ORG"
    ],
    skills: [
      {
        id: "skill-pri-human-body-systems",
        unitId: "unit-p3-pri-human-body-systems",
        title: "Digestive, Circulatory, Respiratory & Skeletal Systems",
        code: "SKL-PRI-BOD-172",
        summary:
          "Trace food breakdown, gas exchange in lung alveoli, arterial/venous blood transport, antagonistic muscle pairs, and macronutrient/vitamin growth needs.",
        objectives: [
          "Sequence digestion organs cleanly from mouth and stomach to small-intestine nutrient absorption",
          "Distinguish arteries (carry blood AWAY from heart) from veins (carry blood BACK to heart with valves)",
          "Match carbohydrates, proteins, calcium/vitamin D, vitamin C, and iron to body growth and deficiency diseases"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-hlt-handwashing-teeth", "skill-pri-science-living"],
        lesson: {
          id: "les-pri-human-body-systems",
          title: "Human Body Systems & Healthy Growth",
          hookAndIntuition:
            "Your body operates like a 24-hour city: digestion breaks down fuel deliveries, lungs swap oxygen for exhaust carbon dioxide, and the four-chamber heart pumps supplies through 96,000 km of vessels.",
          conceptualExplanation:
            "Healthy human growth depends on coordinated organ systems. The DIGESTIVE SYSTEM breaks large food molecules mechanically (teeth) and chemically (enzymes) through mouth → gullet (oesophagus) → stomach (acid + protein digestion) → small intestine (most chemical digestion AND absorption into blood via villi) → large intestine (water reabsorption).\n\nThe RESPIRATORY SYSTEM pulls air down windpipe (trachea) and bronchi into spongy ALVEOLI air sacs, where oxygen diffuses into blood and waste carbon dioxide diffuses out. The CIRCULATORY SYSTEM uses the muscular heart to pump oxygen-rich blood through thick-walled ARTERIES away from the heart, through microscopic CAPILLARIES to feed cells, and back through valved VEINS. Meanwhile, the SKELETAL-MUSCULAR SYSTEM protects organs (skull/ribcage) and moves joints via antagonistic pairs (biceps contracts while triceps relaxes to bend the elbow). Balanced meals supply carbohydrates (energy), proteins (tissue growth/repair; deficiency causes kwashiorkor), vitamin D/calcium (bones; deficiency causes rickets), vitamin C (gums/immunity; scurvy), and iron (red-blood-cell haemoglobin).",
          conceptualModel:
            "Digest: Mouth → Stomach → Small Intestine (absorb) → Large Intestine (water) | Heart: Artery (Away) → Capillary (Swap) → Vein (Back).",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Arteries vs Veins (Direction Rule)",
              definition: "Arteries carry blood AWAY from the heart (thick elastic walls); Veins carry blood BACK toward the heart (one-way valves).",
              practicalExample: "Tip: 'A for Away' (Artery); most veins carry low-oxygen blood except pulmonary vein from lungs."
            },
            {
              termOrSymbol: "Small Intestine Villi",
              definition: "Millions of finger-like folds maximizing surface area for digested glucose and amino acids to enter blood.",
              practicalExample: "After proteins break into amino acids, villi absorb them into capillaries to build muscle."
            },
            {
              termOrSymbol: "Antagonistic Muscle Pairs",
              definition: "Muscles can only PULL (contract), never push—so bones require opposing pairs like biceps and triceps.",
              practicalExample: "Bending forearm: biceps contracts/shortens while triceps relaxes/lengthens."
            }
          ],
          workedExamples: [
            {
              title: "Tracing One Oxygen Molecule From Nostril to Leg Muscle Cell",
              problemStatement: "List the exact sequential pathway taken by oxygen inhaled during sprinting from the air into a contracting quadriceps muscle cell.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Enter airways down to lung gas-exchange sacs.",
                  reasoning: "Nasal cavity → pharynx/larynx → trachea (windpipe) → bronchi → bronchioles → alveoli."
                },
                {
                  stepNumber: 2,
                  instruction: "Cross alveolar wall into pulmonary capillary red blood cells.",
                  reasoning: "Oxygen diffuses into haemoglobin inside red blood cells and travels via pulmonary vein to the heart's left atrium and left ventricle."
                },
                {
                  stepNumber: 3,
                  instruction: "Pump outward through systemic arteries to the leg.",
                  reasoning: "Left ventricle pumps blood out the aorta → leg arteries → muscle capillaries."
                },
                {
                  stepNumber: 4,
                  instruction: "Release oxygen to release energy inside muscle cells.",
                  reasoning: "Oxygen diffuses into muscle mitochondria to oxidize glucose for ATP sprint energy."
                }
              ],
              takeawayRule: "Respiratory alveoli hand oxygen to blood, and the left side of the heart powers high-pressure delivery throughout the body."
            },
            {
              title: "Diagnosing Nutritional Deficiencies From Growth Symptoms",
              problemStatement: "Match each child's symptom to the missing nutrient: (A) Weak bowed leg bones; (B) Swollen belly and thin stunted hair/muscles; (C) Bleeding gums; (D) Constant fatigue and pale eyelids.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Identify bone mineralization nutrient for Symptom (A).",
                  reasoning: "Bowed soft bones (rickets) result from lacking Vitamin D and/or Calcium."
                },
                {
                  stepNumber: 2,
                  instruction: "Identify growth/tissue-repair macronutrient for Symptom (B).",
                  reasoning: "Swollen belly and wasted muscle (kwashiorkor) come from severe Protein deficiency."
                },
                {
                  stepNumber: 3,
                  instruction: "Identify tissue-collagen vitamin for Symptom (C).",
                  reasoning: "Bleeding gums and poor wound healing (scurvy) result from lacking Vitamin C (found in oranges/tomatoes)."
                },
                {
                  stepNumber: 4,
                  instruction: "Identify haemoglobin mineral for Symptom (D).",
                  reasoning: "Pale eyelids and breathlessness (anaemia) result from Iron deficiency limiting oxygen transport."
                }
              ],
              takeawayRule: "Proteins build cells, Calcium + Vit D harden bones, Iron carries oxygen, and Vit C protects gums and immunity."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking food nutrients are mainly absorbed into the bloodstream inside the stomach.",
              whyItIsWrong: "The stomach churns food with acid and begins protein breakdown; almost all nutrient absorption happens across the small intestine's villi.",
              correctCorrection: "Stomach = acid churning; Small Intestine = major digestion + nutrient absorption; Large Intestine = water recovery."
            },
            {
              misconception: "Thinking breathing exhales pure CO₂ with 0% oxygen, or inhales 100% pure oxygen.",
              whyItIsWrong: "Inhaled air is ~21% O₂ and 0.04% CO₂; exhaled air still contains ~16% O₂ alongside ~4% CO₂.",
              correctCorrection: "Lungs extract part of inhaled O₂ (~5%) and add waste CO₂ (~4%)."
            }
          ],
          guidedPracticePrompt: "Explain why veins need one-way valves while thick-walled arteries do not.",
          independentPracticePrompt: "State the exact joint movement when your triceps contracts and biceps relaxes.",
          extensionActivity: "Count your resting pulse for 30 s, double it for BPM, then re-measure right after 20 jumping jacks to observe heart rate adaptation.",
          diagnosticSelfCheck: "Which digestive organ absorbs most water from undigested waste before egestion?",
          transferApplication: "Design a balanced ₦1,500 Nigerian school lunch combining yam/rice (carbs), beans/egg/fish (protein), spinach (iron), and orange (Vit C).",
          masteryAssessment: "Trace what happens to carbon dioxide produced inside a foot muscle back out through the nose.",
          summaryRecap: "Digestive villi absorb food, alveoli swap O₂/CO₂, arteries carry away and veins return with valves, opposing muscles pull bones, and diverse nutrients prevent deficiencies.",
          estimatedMinutes: 85
        },
        questions: [
          {
            id: "q-pri-bod-1",
            type: "multiple_choice",
            questionText: "In which human digestive organ are digested nutrients (glucose, amino acids, fatty acids) primarily absorbed into the bloodstream?",
            mathExpression: "\\text{Mouth} \\to \\text{Stomach} \\to ? \\to \\text{Large Intestine}",
            options: ["Small intestine", "Stomach", "Oesophagus (gullet)", "Large intestine"],
            correctAnswer: "Small intestine",
            explanation: "The small intestine finishes chemical digestion and uses millions of folded villi to absorb soluble nutrients directly into blood capillaries.",
            hintLadder: [
              "Oesophagus only pushes food down; stomach mixes food with acid.",
              "Look for the long coiled organ lined with absorptive villi.",
              "Large intestine mainly absorbs water afterward."
            ],
            misconceptionAlerts: [
              { trigger: "Stomach", note: "The stomach mainly churns food with hydrochloric acid; absorption happens in the small intestine." }
            ],
            skillId: "skill-pri-human-body-systems",
            difficulty: "easy"
          },
          {
            id: "q-pri-bod-2",
            type: "multiple_choice",
            questionText: "Which blood vessels carry blood AWAY from the heart under high pressure using thick, muscular elastic walls?",
            mathExpression: "\\text{Heart} \\xrightarrow{?} \\text{Body Tissues}",
            options: ["Arteries", "Veins", "Capillaries", "Bronchioles"],
            correctAnswer: "Arteries",
            explanation: "Arteries (remember 'A for Away') withstand high ventricular pumping pressure using thick muscular walls.",
            hintLadder: [
              "Recall the 'A = Away' memory cue.",
              "High pumping pressure requires thick elastic walls rather than thin one-cell capillary walls.",
              "Veins return lower-pressure blood back to the heart using valves."
            ],
            misconceptionAlerts: [
              { trigger: "Veins", note: "Veins carry low-pressure blood BACK to the heart, not away from it." }
            ],
            skillId: "skill-pri-human-body-systems",
            difficulty: "easy"
          },
          {
            id: "q-pri-bod-3",
            type: "multiple_choice",
            questionText: "Which nutritional deficiency is directly linked to soft, bowed leg bones (rickets) in growing children?",
            mathExpression: "\\text{Rickets} \\longleftarrow \\text{Missing Bone Mineral/Vitamin}",
            options: [
              "Vitamin D and Calcium",
              "Vitamin C",
              "Dietary Fibre",
              "Carbohydrates"
            ],
            correctAnswer: "Vitamin D and Calcium",
            explanation: "Calcium builds hard bone mineral matrix, and sunlight-activated Vitamin D enables the intestine to absorb calcium properly.",
            hintLadder: [
              "Rickets weakens hard bone tissue under body weight.",
              "Which mineral hardens bones and teeth, paired with the sunlight vitamin?",
              "Vitamin C causes scurvy (gums), whereas bones need Calcium + Vitamin D."
            ],
            misconceptionAlerts: [
              { trigger: "Vitamin C", note: "Vitamin C deficiency causes scurvy (bleeding gums), not bowed bones." }
            ],
            skillId: "skill-pri-human-body-systems",
            difficulty: "medium"
          },
          {
            id: "q-pri-bod-4",
            type: "multiple_choice",
            questionText: "When you bend (flex) your forearm upward at the elbow to lift a heavy textbook, what happens to your upper-arm biceps and triceps muscles?",
            mathExpression: "\\text{Antagonistic Pair Action}",
            options: [
              "The biceps contracts and shortens while the triceps relaxes and lengthens",
              "Both biceps and triceps push upward simultaneously",
              "The triceps contracts and shortens while the biceps relaxes",
              "Neither muscle changes length because elbow joints move passively"
            ],
            correctAnswer: "The biceps contracts and shortens while the triceps relaxes and lengthens",
            explanation: "Muscles only pull when contracting: raising the forearm requires the front biceps to contract while the rear opposing triceps relaxes.",
            hintLadder: [
              "Feel the front of your upper arm while curling your hand toward your shoulder—it tightens and bulges.",
              "Because muscles cannot push, the opposing back muscle must relax.",
              "Biceps contracts; triceps relaxes."
            ],
            misconceptionAlerts: [
              { trigger: "The triceps contracts and shortens while the biceps relaxes", note: "Contracting the rear triceps straightens (extends) the arm downward instead." }
            ],
            skillId: "skill-pri-human-body-systems",
            difficulty: "medium"
          },
          {
            id: "q-pri-bod-5",
            type: "multiple_choice",
            questionText: "A runner takes a deep breath before a race. Compared to the air inhaled, how does the composition of the air they EXHALE change?",
            mathExpression: "\\text{Inhaled: } 21\\%\\text{ O}_2,\\; 0.04\\%\\text{ CO}_2 \\to \\text{Exhaled: ?}",
            options: [
              "Oxygen drops (from ~21% to ~16%) while carbon dioxide rises (from ~0.04% to ~4%)",
              "Oxygen drops to 0% because the lungs absorb every oxygen molecule",
              "Nitrogen drops sharply because muscles burn nitrogen gas for energy",
              "Carbon dioxide decreases while oxygen increases"
            ],
            correctAnswer: "Oxygen drops (from ~21% to ~16%) while carbon dioxide rises (from ~0.04% to ~4%)",
            explanation: "Alveoli extract roughly a quarter of inhaled oxygen (~21% → 16%) into blood and release cellular respiration waste CO₂ (~0.04% → 4%); nitrogen remains ~78% unchanged.",
            hintLadder: [
              "Respiration consumes some O₂ and releases waste CO₂.",
              "However, rescue breathing (CPR) still works because exhaled air keeps ~16% O₂, not 0%.",
              "Nitrogen gas (~78%) is neither consumed nor produced by cells."
            ],
            misconceptionAlerts: [
              { trigger: "Oxygen drops to 0% because the lungs absorb every oxygen molecule", note: "Only part of inhaled oxygen crosses into blood; ~16% O₂ remains in exhaled breath." }
            ],
            skillId: "skill-pri-human-body-systems",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. pri_176_earth_weather_seasonal_patterns
  // =========================================================================
  {
    id: "unit-p3-pri-earth-weather-seasons",
    subjectId: "pri_176_earth_weather_seasonal_patterns",
    level: "upper_primary",
    title: "Earth Rotation/Orbit, Weather Instruments, Water Cycle & Seasonal Patterns",
    code: "PRI-EAR-176",
    description:
      "Master Earth's 24-hour spin (day/night) vs 23.5° tilted 365-day orbit (seasons), weather instruments (barometer, anemometer, hygrometer), water cycle phase changes, and Harmattan vs rainy monsoon.",
    order: 4,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:PRI5-SCI-EAR-01",
      "COMMON_ENTRANCE:SCI-WTH-176",
      "CAMBRIDGE_PRIMARY:SCI-EAR-SPA"
    ],
    skills: [
      {
        id: "skill-pri-earth-weather-seasons",
        unitId: "unit-p3-pri-earth-weather-seasons",
        title: "Planetary Cycles, Water Phase Changes & Weather Forecasting",
        code: "SKL-PRI-EAR-176",
        summary:
          "Distinguish Earth rotation from tilted orbital revolution, match meteorological instruments to variables, and track evaporation, condensation, and precipitation.",
        objectives: [
          "Explain why Earth's 23.5° axial tilt (NOT distance from the Sun) creates opposing hemisphere seasons",
          "Match thermometer, barometer, anemometer, wind vane, hygrometer, and rain gauge to exact measurements",
          "Distinguish dry dusty Harmattan NE Trade winds from moist SW Monsoon rain-bearing winds"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-geo-cardinal-continents", "skill-pri-env-pollution-3rs"],
        lesson: {
          id: "les-pri-earth-weather-seasons",
          title: "Earth Systems, Weather Instruments & Seasons",
          hookAndIntuition:
            "When Lagos welcomes cool dusty Harmattan mornings in December while London shivers in short winter days and Sydney hits summer beaches, one 23.5° axial tilt and shifting trade winds explain it all.",
          conceptualExplanation:
            "Earth executes two motions simultaneously: ROTATION on its axis every ~24 hours produces day and night (appearing as sunrise East → sunset West), while REVOLUTION around the Sun every 365¼ days combined with Earth's fixed 23.5° AXIAL TILT produces seasons. Because the North Pole tilts toward the Sun in June, the Northern Hemisphere receives more concentrated sunlight and longer days (summer) while the Southern Hemisphere experiences winter simultaneously.\n\nMeteorologists distinguish daily WEATHER (today's temperature, pressure, rainfall) from multi-decade CLIMATE averages using six instruments: Thermometer (temperature °C), Barometer (air pressure — falling pressure warns of storms), Anemometer (wind speed), Wind Vane (wind direction — points INTO the wind origin), Hygrometer (humidity), and Rain Gauge (millimetres rainfall). Across West Africa, warm moist South-West Monsoon winds off the Atlantic drive the Wet Season (April–October), while cool dry North-East Trade winds off the Sahara bring Harmattan dust (November–February).",
          conceptualModel:
            "Spin (24 h) = Day/Night | Tilt (23.5°) + Orbit (365.25 d) = Seasons | Water Cycle: Sun → Evaporation → Condensation (Clouds) → Precipitation → Runoff.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "23.5° Axial Tilt (Season Cause)",
              definition: "Tilted hemisphere receives steeper direct sunbeams and longer daylight hours.",
              practicalExample: "Earth is actually closest to the Sun in early January (Northern winter!)—proving distance is NOT the cause."
            },
            {
              termOrSymbol: "Weather Instrument Quartet",
              definition: "Barometer = Air Pressure | Anemometer = Wind Speed | Hygrometer = Humidity | Wind Vane = Wind Origin Direction.",
              practicalExample: "A wind vane pointing North-East indicates a North-East wind blowing FROM NE toward SW."
            },
            {
              termOrSymbol: "Evaporation vs Condensation",
              definition: "Evaporation turns liquid water → invisible vapor (absorbs heat); Condensation cools vapor → visible cloud/fog droplets.",
              practicalExample: "Morning dew forms when moist night air cools and condenses on chilly blades of grass."
            }
          ],
          workedExamples: [
            {
              title: "Forecasting Upcoming Weather From Station Instrument Readings",
              problemStatement: "A coastal weather station records rapidly dropping barometer pressure, rising hygrometer humidity (92%), and strengthening South-West wind vane readings. What forecast should it issue?",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Interpret dropping barometer pressure.",
                  reasoning: "Low/falling atmospheric pressure signals rising unstable air that cools aloft and forms thick storm clouds."
                },
                {
                  stepNumber: 2,
                  instruction: "Interpret 92% relative humidity on the hygrometer.",
                  reasoning: "Air is nearly saturated with water vapor ready to condense into heavy rain."
                },
                {
                  stepNumber: 3,
                  instruction: "Interpret South-West wind origin on coastal West Africa.",
                  reasoning: "Winds blowing from the SW Atlantic Ocean bring continuous moist maritime air inland."
                },
                {
                  stepNumber: 4,
                  instruction: "Synthesize forecast.",
                  reasoning: "Expect overcast storm clouds, gusty winds, and imminent heavy rainfall."
                }
              ],
              takeawayRule: "Falling barometer + rising humidity + onshore ocean winds = approaching rainstorm."
            },
            {
              title: "Explaining Cloud & Rain Formation in the Water Cycle",
              problemStatement: "Trace water vapor evaporating from a warm river through condensation up to mountain rainfall.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Solar heating drives liquid evaporation and plant transpiration.",
                  reasoning: "Sunlight warms surface water into invisible rising water-vapor gas."
                },
                {
                  stepNumber: 2,
                  instruction: "Moist air rises and expands/cools at higher altitude.",
                  reasoning: "Higher in the troposphere, colder temperatures reduce how much vapor air can hold."
                },
                {
                  stepNumber: 3,
                  instruction: "Vapor condenses onto tiny dust particles into liquid cloud droplets.",
                  reasoning: "Clouds are billions of microscopic liquid water droplets or ice crystals, NOT invisible gas."
                },
                {
                  stepNumber: 4,
                  instruction: "Droplets collide and fall as precipitation when too heavy for updrafts.",
                  reasoning: "Rainwater returns to soil, aquifers, and rivers via infiltration and surface runoff."
                }
              ],
              takeawayRule: "Visible clouds and kettle steam are tiny LIQUID droplets from condensation—pure water vapor gas is completely invisible."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Believing summer happens because Earth orbits closer to the Sun in July.",
              whyItIsWrong: "If distance caused seasons, both Northern and Southern hemispheres would have summer at the same time—yet Australia has winter in July!",
              correctCorrection: "Seasons result strictly from Earth's 23.5° axial tilt changing Sun angle and day length as it orbits."
            },
            {
              misconception: "Reading a wind vane arrow as the direction the wind is going TO instead of coming FROM.",
              whyItIsWrong: "Meteorological wind vanes swivel to face directly INTO the oncoming wind.",
              correctCorrection: "A 'North-East wind' blows FROM the North-East toward the South-West."
            }
          ],
          guidedPracticePrompt: "Explain why a metal rain gauge should be placed in an open field away from tall trees and buildings.",
          independentPracticePrompt: "Contrast the source and humidity of Harmattan vs Monsoon winds across West Africa.",
          extensionActivity: "Check why drops of water form on the OUTSIDE of an ice-cold glass on a humid afternoon (condensation, not leakage!).",
          diagnosticSelfCheck: "If it takes Earth 24 hours to spin 360°, how many degrees does Earth rotate in 1 hour?",
          transferApplication: "Interpret falling barometric trends before coastal fishing boats depart harbor.",
          masteryAssessment: "Identify the exact instrument measuring (a) air pressure, (b) wind speed, and (c) atmospheric moisture.",
          summaryRecap: "24 h spin drives day/night, 23.5° tilt drives opposing seasons, cooling vapor condenses into clouds, and weather instruments measure pressure, wind, moisture, and rain.",
          estimatedMinutes: 85
        },
        questions: [
          {
            id: "q-pri-ear-1",
            type: "multiple_choice",
            questionText: "What causes the regular 24-hour cycle of day and night on Earth?",
            mathExpression: "360^{\\circ} / 24\\text{ h} = 15^{\\circ}/\\text{h}",
            options: [
              "Earth spinning (rotating) on its own axis once every 24 hours",
              "Earth revolving completely around the Sun every 24 hours",
              "The Moon blocking sunlight every evening",
              "Seasonal tilting of the North Pole toward Jupiter"
            ],
            correctAnswer: "Earth spinning (rotating) on its own axis once every 24 hours",
            explanation: "Earth's 24-hour axial rotation continually sweeps each longitude into sunlight (day) and shadow (night).",
            hintLadder: [
              "Distinguish rotation (spinning in place = 24 hours) from revolution (orbiting the Sun = 365 days).",
              "Half of Earth faces the Sun at any instant.",
              "As Earth rotates on its axis, each city experiences sunrise and sunset."
            ],
            misconceptionAlerts: [
              { trigger: "Earth revolving completely around the Sun every 24 hours", note: "Orbiting the Sun takes 1 full year (365¼ days), not 24 hours." }
            ],
            skillId: "skill-pri-earth-weather-seasons",
            difficulty: "easy"
          },
          {
            id: "q-pri-ear-2",
            type: "multiple_choice",
            questionText: "Which weather instrument measures atmospheric air pressure to warn forecasters of approaching storms?",
            mathExpression: "\\text{Atmospheric Pressure } (\\text{hPa / mb})",
            options: ["Barometer", "Anemometer", "Hygrometer", "Rain gauge"],
            correctAnswer: "Barometer",
            explanation: "A barometer measures atmospheric pressure; falling pressure indicates rising unstable air and approaching storms.",
            hintLadder: [
              "Anemometer measures wind speed; hygrometer measures humidity.",
              "Recall the Greek root 'baros' (weight/pressure).",
              "A barometer tracks air column pressure."
            ],
            misconceptionAlerts: [
              { trigger: "Anemometer", note: "An anemometer has spinning cups to measure wind speed, not air pressure." }
            ],
            skillId: "skill-pri-earth-weather-seasons",
            difficulty: "easy"
          },
          {
            id: "q-pri-ear-3",
            type: "multiple_choice",
            questionText: "During the water cycle, what phase change transforms rising invisible water vapor high in the cold sky into visible white clouds?",
            mathExpression: "\\text{Water Vapor (gas)} \\xrightarrow{\\text{cooling}} \\text{Cloud Droplets (liquid)}",
            options: ["Condensation", "Evaporation", "Transpiration", "Precipitation"],
            correctAnswer: "Condensation",
            explanation: "As warm moist air rises and cools aloft, gaseous water vapor loses heat and condenses onto dust nuclei into visible liquid cloud droplets.",
            hintLadder: [
              "Evaporation turns liquid into gas; we want gas turning back into tiny liquid droplets.",
              "Cooling gas into liquid is condensation.",
              "Precipitation is only when heavy droplets actually fall as rain/snow."
            ],
            misconceptionAlerts: [
              { trigger: "Evaporation", note: "Evaporation turns surface liquid into rising invisible gas, the reverse of cloud droplet formation." }
            ],
            skillId: "skill-pri-earth-weather-seasons",
            difficulty: "medium"
          },
          {
            id: "q-pri-ear-4",
            type: "multiple_choice",
            questionText: "Why does the Southern Hemisphere (such as Australia and South Africa) experience Summer in December while Europe and North America experience Winter?",
            mathExpression: "\\text{Axial Tilt} = 23.5^{\\circ}",
            options: [
              "Earth's 23.5° tilted axis leans the Southern Hemisphere toward the Sun in December for steeper sunbeams and longer days",
              "The Southern Hemisphere is 50 million km closer to the Sun than the Northern Hemisphere",
              "Ocean currents reverse Earth's spin direction every six months",
              "Sunlight only shines below the Equator during December"
            ],
            correctAnswer: "Earth's 23.5° tilted axis leans the Southern Hemisphere toward the Sun in December for steeper sunbeams and longer days",
            explanation: "Earth's constant 23.5° axial tilt causes opposite hemispheres to tilt toward or away from the Sun at opposite sides of the orbit.",
            hintLadder: [
              "Both hemispheres are essentially the same distance from the Sun.",
              "A tilted globe leans one hemisphere closer to direct overhead sunlight while tilting the other away.",
              "Opposite hemispheres therefore experience opposite seasons simultaneously."
            ],
            misconceptionAlerts: [
              { trigger: "The Southern Hemisphere is 50 million km closer to the Sun than the Northern Hemisphere", note: "Earth's diameter is only ~12,742 km—tiny compared to the 150 million km Sun distance." }
            ],
            skillId: "skill-pri-earth-weather-seasons",
            difficulty: "medium"
          },
          {
            id: "q-pri-ear-5",
            type: "multiple_choice",
            questionText: "Which wind pattern explains why Nigeria and Ghana experience cool, dry, dusty Harmattan mornings from December to February?",
            mathExpression: "\\text{Sahara Desert (NE)} \\longrightarrow \\text{West Africa (SW)}",
            options: [
              "Dry North-East Trade winds blowing overland across the Sahara Desert",
              "Warm moist South-West Monsoon winds rising off the Atlantic Ocean",
              "Polar blizzards sweeping southward from Greenland",
              "Local evaporation rising off coastal mangrove lagoons"
            ],
            correctAnswer: "Dry North-East Trade winds blowing overland across the Sahara Desert",
            explanation: "During Northern winter, high pressure over the Sahara drives dry North-East Trade winds carrying fine desert dust southwestward across West Africa (Harmattan).",
            hintLadder: [
              "Ask where dry dusty air originates north-east of West Africa.",
              "The Sahara Desert lies to the North-East, whereas the Atlantic Ocean lies to the South-West.",
              "Moist SW Monsoon winds bring April–October rain; dry NE Sahara winds bring Harmattan."
            ],
            misconceptionAlerts: [
              { trigger: "Warm moist South-West Monsoon winds rising off the Atlantic Ocean", note: "SW Monsoon winds off the Atlantic bring humid rainfall (wet season), not dry Harmattan haze." }
            ],
            skillId: "skill-pri-earth-weather-seasons",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 4. pri_182_food_production_crop_cycles_soil_car
  // =========================================================================
  {
    id: "unit-p3-pri-crop-cycles-soil-care",
    subjectId: "pri_182_food_production_crop_cycles_soil_car",
    level: "upper_primary",
    title: "Food Production, Loam Soil Horizons, Crop Rotation & Postharvest Storage",
    code: "PRI-AGR-182",
    description:
      "Master sandy vs clay vs loam drainage/retention, topsoil organic humus, nitrogen-fixing legume crop rotation, soil erosion prevention, and safe dry postharvest storage.",
    order: 5,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:PRI5-AGR-01",
      "COMMON_ENTRANCE:AGR-182",
      "CAMBRIDGE_PRIMARY:AGR-SOIL-CRP"
    ],
    skills: [
      {
        id: "skill-pri-crop-cycles-soil-care",
        unitId: "unit-p3-pri-crop-cycles-soil-care",
        title: "Soil Texture, Crop Rotation, Soil Conservation & Storage",
        code: "SKL-PRI-AGR-182",
        summary:
          "Compare sandy/clay/loam soils, design 4-year nitrogen-replenishing crop rotations, stop erosion with contour ridging and mulching, and prevent postharvest spoilage.",
        objectives: [
          "Compare particle size, aeration, water retention, and fertility across sandy, clay, and loam soils",
          "Explain why rotating deep-rooted yams, cereals (maize), and nitrogen-fixing legumes (cowpea/groundnut) prevents nutrient exhaustion and pest buildup",
          "Select mulching, terracing/contour ridges, cover crops, and dry ventilated storage cribs to protect harvests"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-agr-crops-soils", "skill-pri-env-pollution-3rs"],
        lesson: {
          id: "les-pri-crop-cycles-soil-care",
          title: "Food Production, Crop Cycles & Soil Care",
          hookAndIntuition:
            "Planting maize on the exact same plot every year starves soil nitrogen and multiplies stem borers—whereas smart farmers rotate legumes, mulch topsoil, and dry grain safely before storage.",
          conceptualExplanation:
            "Fertile TOPSOIL mixes weathered rock particles, dark decayed organic HUMUS, water, air spaces, and soil life (earthworms/bacteria). Coarse SANDY soil drains too fast and leaches nutrients; tiny-grained CLAY soil traps water until roots suffocate (waterlogging); balanced LOAM (sand + silt + clay + rich humus) holds moisture while staying airy—making loam ideal for most crops.\n\nInstead of monocropping one plant year after year, CROP ROTATION sequences heavy nitrogen-users (maize/sorghum), deep-rooted tubers (yam/cassava), and nitrogen-fixing LEGUMES (cowpea, soybean, groundnut) whose root-nodule bacteria turn air nitrogen into natural soil fertilizer while starving species-specific pests. Farmers protect topsoil from wind and rain erosion via MULCHING (covering bare soil with dry grass to retain moisture and stop splash erosion), CONTOUR PLOUGHING across hill slopes, and WINDBREAK trees. After harvest, drying grains below ~12–13% moisture in airtight/ventilated silos stops mould toxins and weevil infestation.",
          conceptualModel:
            "Loam = Sand + Silt + Clay + Humus | Rotation: Maize (Shallow) → Cowpea (Adds N) → Cassava (Deep) | Care: Mulch + Contour Ridges + Dry Storage.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Sandy vs Clay vs Loam Drainage",
              definition: "Sand = large pores (fast drain, dry); Clay = tiny pores (waterlogged); Loam = balanced drainage + humus fertility.",
              practicalExample: "In a school funnel test pouring 100 mL water: Sand leaks 80 mL fast, Clay leaks 15 mL slowly, Loam leaks ~45 mL."
            },
            {
              termOrSymbol: "Legume Nitrogen Fixation",
              definition: "Root-nodule bacteria on cowpea, beans, and groundnuts convert atmospheric N₂ into soluble soil nitrates.",
              practicalExample: "Planting cowpeas after maize replenishes depleted soil nitrogen naturally without costly urea."
            },
            {
              termOrSymbol: "Mulching & Contour Ridging",
              definition: "Mulch blankets topsoil against evaporation/weeds; contour ridges follow level elevation lines to slow downhill rainwater runoff.",
              practicalExample: "Ploughing UP-AND-DOWN a hill turns furrows into erosion gullies; ploughing ACROSS contours dams water gently."
            }
          ],
          workedExamples: [
            {
              title: "Interpreting a 3-Funnel Soil Water Retention Lab",
              problemStatement: "Three equal funnels hold 100 g each of dry Soil A, Soil B, and Soil C. After pouring 100 mL water into each, water drained out is: Soil A = 82 mL, Soil B = 18 mL, Soil C = 46 mL. Identify each soil and choose the best for tomatoes.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Subtract drained water from 100 mL to find water retained by each sample.",
                  reasoning: "Soil A retained 18 mL; Soil B retained 82 mL; Soil C retained 54 mL."
                },
                {
                  stepNumber: 2,
                  instruction: "Match fast drainage / low retention (Soil A) and slow drainage / high retention (Soil B).",
                  reasoning: "Soil A has large coarse pores (Sandy); Soil B holds 82 mL tightly in tiny pores (Clay)."
                },
                {
                  stepNumber: 3,
                  instruction: "Match balanced retention and drainage to Soil C.",
                  reasoning: "Soil C retains 54 mL while letting excess drain—characteristic of fertile Loam."
                },
                {
                  stepNumber: 4,
                  instruction: "Select the optimal tomato growing medium.",
                  reasoning: "Soil C (Loam) avoids drought stress (A) and root-rotting waterlogging (B)."
                }
              ],
              takeawayRule: "Water Retained = Water Poured − Water Drained; loam always sits cleanly between sandy leaching and clay waterlogging."
            },
            {
              title: "Designing a 3-Year Pest-Breaking Crop Rotation Plan",
              problemStatement: "Arrange Maize (shallow feeder, high nitrogen demand), Groundnut (legume), and Yam (deep-rooted tuber) across 3 years on Plot 1, explaining why.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Start Year 1 with Yam (deep-rooted tuber) on freshly tilled soil.",
                  reasoning: "Yam draws potassium and deeper moisture without exhausting shallow surface nitrogen."
                },
                {
                  stepNumber: 2,
                  instruction: "Follow in Year 2 with Maize (shallow cereal feeder).",
                  reasoning: "Maize taps unused shallow topsoil nutrients and breaks yam-beetle pest cycles."
                },
                {
                  stepNumber: 3,
                  instruction: "Plant Groundnut (legume) in Year 3 to rebuild depleted nitrogen.",
                  reasoning: "Root-nodule bacteria replenish topsoil nitrates consumed by Maize while starving cereal stem borers."
                },
                {
                  stepNumber: 4,
                  instruction: "Note weed suppression and organic residue incorporation.",
                  reasoning: "Turning groundnut haulms back into the soil adds organic humus before restarting Year 4."
                }
              ],
              takeawayRule: "Effective crop rotation alternates rooting depths (shallow vs deep) and pairs heavy feeders with nitrogen-fixing legumes."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Ploughing furrows straight up and down a hillside to 'help excess rainwater drain faster'.",
              whyItIsWrong: "Straight downhill channels accelerate runoff water speed, carving deep gullies that wash away fertile topsoil.",
              correctCorrection: "Always build contour ridges ACROSS the slope so water pools slowly and soaks into soil."
            },
            {
              misconception: "Storing freshly harvested maize immediately in sealed plastic sacks while still damp.",
              whyItIsWrong: "Warm damp grain breeds fungi (toxic aflatoxins) and heats up, ruining the entire harvest.",
              correctCorrection: "Sun-dry or air-dry grains thoroughly before sealing in cool, dry, pest-proof silos."
            }
          ],
          guidedPracticePrompt: "List two benefits of spreading dry grass mulch around newly transplanted vegetable seedlings.",
          independentPracticePrompt: "Explain why earthworms living inside loam soil boost plant growth (two mechanisms).",
          extensionActivity: "Mix soil + water in a clear jar, shake, and observe heavy sand settling first, silt second, clay third, and floating humus on top.",
          diagnosticSelfCheck: "Why does rotating beans/cowpeas after maize cut fertilizer bills?",
          transferApplication: "Diagnose yellow stunted leaves on waterlogged clay beds and propose adding compost + sand ridges.",
          masteryAssessment: "Given drainage volumes 85 mL, 12 mL, and 44 mL from 100 mL poured, match Sandy, Clay, and Loam.",
          summaryRecap: "Loam balances air, moisture, and humus; legume rotations rebuild nitrogen and break pest cycles; contour ridges, mulching, and dry storage safeguard yields.",
          estimatedMinutes: 85
        },
        questions: [
          {
            id: "q-pri-agr-1",
            type: "multiple_choice",
            questionText: "Which soil type combines sand, silt, clay, and decayed organic humus to provide balanced water retention and good root aeration for most crops?",
            mathExpression: "\\text{Optimal Garden Soil}",
            options: ["Loam soil", "Pure coarse sandy soil", "Pure heavy clay soil", "Crushed gravel bedrock"],
            correctAnswer: "Loam soil",
            explanation: "Loam balances medium drainage, air spaces, mineral clay retention, and rich organic humus.",
            hintLadder: [
              "Sandy soil dries out too quickly; clay soil gets waterlogged and hard when dry.",
              "Look for the balanced mixture containing organic humus.",
              "Loam is the gold-standard agricultural topsoil."
            ],
            misconceptionAlerts: [
              { trigger: "Pure coarse sandy soil", note: "Pure sand drains too rapidly and loses dissolved nutrients by leaching." }
            ],
            skillId: "skill-pri-crop-cycles-soil-care",
            difficulty: "easy"
          },
          {
            id: "q-pri-agr-2",
            type: "multiple_choice",
            questionText: "Why do farmers rotate maize with leguminous crops such as cowpea or groundnut instead of planting maize continuously on the same plot?",
            mathExpression: "\\text{Maize (uses N)} \\longrightarrow \\text{Cowpea (fixes N}_2\\text{)}",
            options: [
              "Legume root-nodule bacteria replenish soil nitrogen while breaking maize pest and disease cycles",
              "Legumes drain excess water into underground aquifers faster than drains",
              "Continuous maize turns sandy soil into solid granite within two seasons",
              "Cowpeas block all sunlight from reaching soil bacteria"
            ],
            correctAnswer: "Legume root-nodule bacteria replenish soil nitrogen while breaking maize pest and disease cycles",
            explanation: "Symbiotic Rhizobium bacteria in legume root nodules convert atmospheric nitrogen into soil nitrates, while changing host plant species starves specialist maize pests.",
            hintLadder: [
              "Think about what maize removes heavily from topsoil (nitrogen).",
              "Legumes host nitrogen-fixing bacteria in root nodules.",
              "Alternating plant families also disrupts crop-specific pests."
            ],
            misconceptionAlerts: [
              { trigger: "Cowpeas block all sunlight from reaching soil bacteria", note: "Root-nodule bacteria benefit soil health rather than being harmed." }
            ],
            skillId: "skill-pri-crop-cycles-soil-care",
            difficulty: "easy"
          },
          {
            id: "q-pri-agr-3",
            type: "multiple_choice",
            questionText: "A student pours 100 mL of water through 100 g of dry soil in a funnel, collecting 14 mL of drained water in the beaker after 10 minutes. Which soil is most likely being tested?",
            mathExpression: "\\text{Water Retained} = 100 - 14 = 86\\text{ mL}",
            options: [
              "Clay soil (tiny pores trap water strongly)",
              "Coarse beach sand (drains ~85 mL rapidly)",
              "Crushed marble chips",
              "Loose dry sawdust"
            ],
            correctAnswer: "Clay soil (tiny pores trap water strongly)",
            explanation: "Retaining 86 mL out of 100 mL with minimal drainage indicates microscopic pore spaces tightly binding water—classic heavy clay.",
            hintLadder: [
              "Subtract drained water (14 mL) from poured water (100 mL) = 86 mL retained.",
              "High retention and slow dripping point to tiny tightly packed grains.",
              "Clay has the smallest particles and highest water retention."
            ],
            misconceptionAlerts: [
              { trigger: "Coarse beach sand (drains ~85 mL rapidly)", note: "Coarse sand would drain ~85 mL OUT into the beaker rather than retaining 86 mL." }
            ],
            skillId: "skill-pri-crop-cycles-soil-care",
            difficulty: "medium"
          },
          {
            id: "q-pri-agr-4",
            type: "multiple_choice",
            questionText: "On a gently sloping hillside farm in heavy rainy season, which practice MOST effectively prevents rainwater from washing away fertile topsoil?",
            mathExpression: "\\text{Slope Soil Conservation}",
            options: [
              "Contour ridging across the slope paired with grass mulching",
              "Ploughing straight channels vertically downhill",
              "Burning all crop residues and clearing every boundary bush",
              "Compacting bare soil with heavy rollers before storms"
            ],
            correctAnswer: "Contour ridging across the slope paired with grass mulching",
            explanation: "Contour ridges perpendicular to the slope slow runoff so water infiltrates gently, while mulch cushions raindrops against splash erosion.",
            hintLadder: [
              "Rainwater washing downhill removes loose topsoil fastest when channels run down the slope.",
              "Across-slope ridges act like tiny mini-dams holding rainwater in place.",
              "Mulch absorbs raindrop impact."
            ],
            misconceptionAlerts: [
              { trigger: "Ploughing straight channels vertically downhill", note: "Downhill furrows speed up water flow and create deep erosion gullies." }
            ],
            skillId: "skill-pri-crop-cycles-soil-care",
            difficulty: "medium"
          },
          {
            id: "q-pri-agr-5",
            type: "multiple_choice",
            questionText: "Why MUST harvested maize cobs and cowpeas be thoroughly sun-dried to low moisture (<13%) before being sealed inside storage silos or airtight drums?",
            mathExpression: "\\text{High Moisture + Sealed Warmth} \\implies \\text{Spoilage Hazard}",
            options: [
              "Damp stored grain promotes fungal mould growth (producing toxic aflatoxins), heating, and rapid spoilage",
              "Dry grain absorbs extra atmospheric nitrogen to increase kernel weight during storage",
              "Moisture causes dry maize seeds to dissolve back into liquid starch",
              "Airtight silos require wet grain to generate oxygen inside the drum"
            ],
            correctAnswer: "Damp stored grain promotes fungal mould growth (producing toxic aflatoxins), heating, and rapid spoilage",
            explanation: "Respiration of damp grain plus fungal spores generates heat and moisture inside sealed containers, causing rot and dangerous aflatoxin contamination.",
            hintLadder: [
              "Think what grows rapidly on damp bread or wet seeds in warm closed containers.",
              "Fungi/moulds thrive on moisture and produce dangerous aflatoxins.",
              "Drying removes water needed by spoilage microbes and insect larvae."
            ],
            misconceptionAlerts: [
              { trigger: "Airtight silos require wet grain to generate oxygen inside the drum", note: "Hermetic storage actually works by starving pests of oxygen, and requires dry grain first." }
            ],
            skillId: "skill-pri-crop-cycles-soil-care",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 5. jss_215_integrated_science_scientific_method
  // =========================================================================
  {
    id: "unit-p3-jss-scientific-method-lab",
    subjectId: "jss_215_integrated_science_scientific_method",
    level: "junior_secondary",
    title: "Scientific Method, Controlled Variables, SI Parallax & Lab Safety",
    code: "JSS-SCI-215",
    description:
      "Master testable hypotheses, independent/dependent/controlled variables, control groups, meniscus/parallax precision, SI conversions, and hazard symbols.",
    order: 2,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS1-SCI-MET-01",
      "BECE:SCI-LAB-215",
      "CAMBRIDGE_LOWER:SCI-ENQ-LAB"
    ],
    skills: [
      {
        id: "skill-jss-scientific-method-lab",
        unitId: "unit-p3-jss-scientific-method-lab",
        title: "Experimental Design, Variable Control & Precision Measurement",
        code: "SKL-JSS-SCI-215",
        summary:
          "Design fair experiments changing strictly one independent variable, prevent zero/parallax errors, and interpret Bunsen flame and GHS safety rules.",
        objectives: [
          "Distinguish Independent (changed by researcher), Dependent (measured outcome), and Controlled (kept constant) variables",
          "Read bottom of concave liquid meniscus at eye level to eliminate parallax error and subtract zero offsets",
          "Convert SI units cleanly (mm ↔ m, g ↔ kg, cm³ ↔ L) and follow lab acid/Bunsen safety rules"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-science-living", "skill-pri-estimation-rounding"],
        lesson: {
          id: "les-jss-scientific-method-lab",
          title: "Scientific Method & Laboratory Inquiry Skills",
          hookAndIntuition:
            "Changing fertilizer brand AND watering schedule at the same time ruins an experiment because you can never tell which change helped—fair tests isolate ONE variable at a time.",
          conceptualExplanation:
            "Scientific inquiry progresses systematically: Observation → Testable Hypothesis → Fair Controlled Experiment → Data Analysis → Conclusion (or revision). In any fair test: the INDEPENDENT variable (IV) is the single factor deliberately varied (plotted on the x-axis); the DEPENDENT variable (DV) is the outcome measured in response (y-axis); and CONTROLLED variables are all other factors held identical alongside an un-treated Control Group.\n\nReliable laboratory measurement avoids SYSTEMATIC errors (consistent bias like an unzeroed balance showing +0.4 g empty, corrected by subtracting +0.4 g) and RANDOM scatter (reduced by repeating trials and averaging). Always read graduated cylinders at exact EYE LEVEL at the bottom of the curved concave water meniscus to prevent PARALLAX error. Lab safety mandates diluting concentrated acid INTO water ('Do As You Oughta, Add Acid to Water'), closing the Bunsen air-hole for a yellow safety flame when lit, and opening it for a hot roaring blue heating flame.",
          conceptualModel:
            "Fair Test = 1 IV Changed + All Else Controlled | Read Eye-Level Bottom Meniscus | Systematic Zero Offset Subtracted | Add Acid → Water.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "IV (Input, x-axis) vs DV (Measured, y-axis)",
              definition: "Independent = I change it; Dependent = Depends on IV (measured outcome); Controlled = Kept constant.",
              practicalExample: "Testing enzyme speed across temperatures: IV = Temperature, DV = Reaction rate, Controlled = pH & concentration."
            },
            {
              termOrSymbol: "Zero Error Correction: True = Reading − Zero Offset",
              definition: "If a ruler starts at 0.3 cm or scale reads +0.2 g empty, subtract that constant offset from every reading.",
              practicalExample: "Balance reads +0.5 g empty, then 42.3 g with rock ⇒ True mass = 42.3 − 0.5 = 41.8 g."
            },
            {
              termOrSymbol: "Parallax & Meniscus Rule",
              definition: "Reading a scale from above or below bends line-of-sight; align eyes flat with the bottom of water's curved meniscus.",
              practicalExample: "Looking DOWN from above makes water appear lower against the back scale than true volume."
            }
          ],
          workedExamples: [
            {
              title: "Auditing a Flawed Plant Growth Experiment",
              problemStatement: "A student tests whether Brand X fertilizer grows taller maize: Pot 1 gets Brand X + 200 mL water/day in full sun; Pot 2 gets no fertilizer + 50 mL water/day in shade. Identify two flaws and fix the design.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Identify the intended Independent and Dependent variables.",
                  reasoning: "Intended IV = Fertilizer presence (Brand X vs none); DV = Maize stem height after 21 days."
                },
                {
                  stepNumber: 2,
                  instruction: "Spot confounding variables left uncontrolled.",
                  reasoning: "Water volume (200 mL vs 50 mL) and sunlight (sun vs shade) both changed simultaneously alongside fertilizer."
                },
                {
                  stepNumber: 3,
                  instruction: "Fix controlled variables across both groups.",
                  reasoning: "Give BOTH pots identical soil mass, seed variety, 200 mL daily water, and identical full sunlight."
                },
                {
                  stepNumber: 4,
                  instruction: "Add replication to curb random plant variation.",
                  reasoning: "Plant 5 seedlings per group instead of 1 and compare mean heights."
                }
              ],
              takeawayRule: "If two input factors differ between test and control pots, the experiment cannot prove which factor caused the outcome."
            },
            {
              title: "Correcting Zero Error & Converting SI Volume to Density",
              problemStatement: "An empty weighing boat rests on an uncalibrated balance reading +0.6 g (actually empty balance before boat already reads +0.4 g zero error). Actually: Balance empty = +0.4 g; Boat = 12.6 g; Boat + Metal = 67.0 g. Cylinder water rises from 20.0 cm³ to 26.8 cm³. Find true density in kg/m³.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Find raw metal mass by difference (zero error +0.4 g cancels on differences!).",
                  reasoning: "Mass_metal = (67.0 − 0.4) − (12.6 − 0.4) = 66.6 − 12.2 = 54.4 g."
                },
                {
                  stepNumber: 2,
                  instruction: "Find displaced metal volume in cm³.",
                  reasoning: "V = 26.8 − 20.0 = 6.8 cm³."
                },
                {
                  stepNumber: 3,
                  instruction: "Compute density in g/cm³.",
                  reasoning: "ρ = 54.4 / 6.8 = 8.0 g/cm³."
                },
                {
                  stepNumber: 4,
                  instruction: "Convert g/cm³ to SI kg/m³ by multiplying by 1,000.",
                  reasoning: "ρ = 8.0 × 1,000 = 8,000 kg/m³."
                }
              ],
              takeawayRule: "1 g/cm³ = 1,000 kg/m³, and weighing by difference automatically cancels constant zero offset."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Pouring water into concentrated sulfuric acid (H₂SO₄) to dilute it.",
              whyItIsWrong: "Exothermic dilution boils the lighter water layer violently on top, splashing hot acid out of the flask.",
              correctCorrection: "Slowly add concentrated ACID into a larger volume of cold WATER while stirring."
            },
            {
              misconception: "Saying a hypothesis is 'proven 100% forever' after one small classroom test.",
              whyItIsWrong: "Science supports or falsifies hypotheses with evidence; future tests under wider conditions may refine them.",
              correctCorrection: "State whether experimental results 'support' or 'refute' the hypothesis."
            }
          ],
          guidedPracticePrompt: "A researcher tests how salt concentration (0%, 2%, 5%) affects boiling time of 250 mL water. Identify IV, DV, and 3 controlled variables.",
          independentPracticePrompt: "Explain the safety purpose of keeping a Bunsen burner's air-hole closed when first lighting it.",
          extensionActivity: "Measure 5 identical paperclips together on a scale and divide by 5—explain why this lowers percentage uncertainty vs weighing 1.",
          diagnosticSelfCheck: "Why must a graduated cylinder sit flat on a level bench rather than tilted in your hand when reading the meniscus?",
          transferApplication: "Calibrate a bathroom scale reading −1.2 kg when empty before tracking fitness progress.",
          masteryAssessment: "A stone of true mass 135 g raises cylinder water from 30.0 mL to 80.0 mL. Find density in kg/m³.",
          summaryRecap: "Vary only 1 IV while locking controls, read bottom of meniscus at eye level, subtract zero offsets, convert g/cm³ × 1000 = kg/m³, and add acid to water.",
          estimatedMinutes: 90
        },
        questions: [
          {
            id: "q-jss-lab-1",
            type: "multiple_choice",
            questionText: "In an experiment investigating how water temperature affects the rate at which a sugar cube dissolves (measured in seconds until clear), what is the DEPENDENT variable?",
            mathExpression: "\\text{Temperature } (\\text{changed}) \\longrightarrow \\text{Dissolving Time } (\\text{measured})",
            options: [
              "Time taken for the sugar cube to dissolve completely",
              "Temperature of the water bath",
              "Volume of water poured into each beaker",
              "Mass of each identical sugar cube"
            ],
            correctAnswer: "Time taken for the sugar cube to dissolve completely",
            explanation: "The researcher chooses Temperature (Independent variable), keeps volume and cube mass constant (Controlled), and measures Dissolving Time (Dependent variable).",
            hintLadder: [
              "Ask which quantity is measured as the outcome rather than set beforehand.",
              "Temperature is varied deliberately (Independent).",
              "Dissolving time depends on temperature."
            ],
            misconceptionAlerts: [
              { trigger: "Temperature of the water bath", note: "Water temperature is the Independent variable set by the experimenter." }
            ],
            skillId: "skill-jss-scientific-method-lab",
            difficulty: "easy"
          },
          {
            id: "q-jss-lab-2",
            type: "multiple_choice",
            questionText: "When measuring 35.0 cm³ of water in a glass measuring cylinder, how should you position your eye to avoid parallax error?",
            mathExpression: "\\text{Eye-Level Alignment}",
            options: [
              "Horizontally level with the bottom of the curved concave meniscus",
              "Looking sharply downward from above the top rim",
              "Looking upward from below the base while tilting the cylinder",
              "At the highest edge where water clings up the glass wall"
            ],
            correctAnswer: "Horizontally level with the bottom of the curved concave meniscus",
            explanation: "Water clings up glass walls via adhesion, creating a U-shaped meniscus whose lowest flat center sits at true volume when viewed straight at eye level.",
            hintLadder: [
              "Water curves downward in the middle (concave meniscus) in glass.",
              "Viewing from above or below introduces parallax angle error.",
              "Align eyes horizontally with the bottom curve of the meniscus."
            ],
            misconceptionAlerts: [
              { trigger: "At the highest edge where water clings up the glass wall", note: "Reading the climbing rim overestimates true liquid volume." }
            ],
            skillId: "skill-jss-scientific-method-lab",
            difficulty: "easy"
          },
          {
            id: "q-jss-lab-3",
            type: "multiple_choice",
            questionText: "Why does laboratory safety strictly require pouring concentrated acid slowly INTO cold water rather than pouring water into concentrated acid?",
            mathExpression: "\\text{Acid} \\xrightarrow{\\text{slowly}} \\text{Water}",
            options: [
              "Dilution releases intense heat; adding acid slowly lets the large water volume absorb heat safely without boiling acid splashes",
              "Pouring water into acid turns the mixture into flammable hydrogen gas instantly",
              "Acid floats on top of water so water sinks cleanly underneath",
              "Concentrated acid freezes solid whenever cold water touches it first"
            ],
            correctAnswer: "Dilution releases intense heat; adding acid slowly lets the large water volume absorb heat safely without boiling acid splashes",
            explanation: "Exothermic heat into a small drop of water poured atop dense acid boils the water instantaneously, spraying corrosive acid droplets.",
            hintLadder: [
              "Mixing concentrated sulfuric acid and water releases a huge amount of heat.",
              "Which liquid has a large mass ready to soak up heat safely if it sits in the beaker first?",
              "Water in the beaker acts as a large thermal sink when acid is added slowly."
            ],
            misconceptionAlerts: [
              { trigger: "Acid floats on top of water so water sinks cleanly underneath", note: "Sulfuric acid is denser (~1.84 g/cm³) than water, which is why water floats and boils on top if poured onto acid!" }
            ],
            skillId: "skill-jss-scientific-method-lab",
            difficulty: "medium"
          },
          {
            id: "q-jss-lab-4",
            type: "multiple_choice",
            questionText: "An electronic balance displays +0.8 g when its pan is completely empty (zero error). When a quartz crystal is placed on the pan, it displays 46.2 g. What is the true mass of the crystal?",
            mathExpression: "\\text{True Mass} = \\text{Reading} - \\text{Zero Offset}",
            options: ["45.4 g", "47.0 g", "46.2 g", "37.0 g"],
            correctAnswer: "45.4 g",
            explanation: "Because the scale starts 0.8 g too high at empty, subtract +0.8 g: True mass = 46.2 − 0.8 = 45.4 g.",
            hintLadder: [
              "The scale already reads +0.8 g before any crystal touches it.",
              "Should you add or subtract a positive +0.8 g zero error?",
              "46.2 − 0.8 = 45.4 g."
            ],
            misconceptionAlerts: [
              { trigger: "47.0 g", note: "Adding +0.8 g doubles the positive zero bias instead of removing it." }
            ],
            skillId: "skill-jss-scientific-method-lab",
            difficulty: "medium"
          },
          {
            id: "q-jss-lab-5",
            type: "multiple_choice",
            questionText: "A copper alloy cube of true mass 216 g raises the water level in a measuring cylinder from 40.0 cm³ to 64.0 cm³. Calculate its density in SI units (kg/m³).",
            mathExpression: "\\rho = \\frac{m}{V}\\times 1,000\\;\\text{kg/m}^3",
            options: ["9,000 kg/m³", "9 kg/m³", "5,400 kg/m³", "8,640 kg/m³"],
            correctAnswer: "9,000 kg/m³",
            explanation: "Displaced volume = 64.0 − 40.0 = 24.0 cm³. Density = 216 g / 24.0 cm³ = 9.0 g/cm³. Converting to SI: 9.0 × 1,000 = 9,000 kg/m³.",
            hintLadder: [
              "Subtract water levels to get cube volume: 64.0 − 40.0 = 24.0 cm³.",
              "Divide 216 g by 24.0 cm³ = 9.0 g/cm³.",
              "Remember 1 g/cm³ = 1,000 kg/m³."
            ],
            misconceptionAlerts: [
              { trigger: "9 kg/m³", note: "9 is in g/cm³; converting to kg/m³ multiplies by 1,000 (not 1)." }
            ],
            skillId: "skill-jss-scientific-method-lab",
            difficulty: "hard"
          }
        ]
      }
    ]
  }
];
