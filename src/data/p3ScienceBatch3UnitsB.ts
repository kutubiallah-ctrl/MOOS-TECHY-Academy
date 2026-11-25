import { Unit } from "../types/curriculum";

export const P3_SCIENCE_BATCH3_UNITS_B: Unit[] = [
  // =========================================================================
  // 1. jss_216_human_biology_nutrition_disease_prev
  // =========================================================================
  {
    id: "unit-p3-jss-human-bio-nutrition",
    subjectId: "jss_216_human_biology_nutrition_disease_prev",
    level: "junior_secondary",
    title: "Human Biology: Enzymes, Biochemical Food Tests & Disease Immunity",
    code: "JSS-BIO-216",
    description:
      "Master digestive enzymes (amylase, protease, lipase), classic biochemical tests (Benedict's, Biuret, Iodine, Ethanol emulsion), vector/waterborne transmission, and vaccine active immunity.",
    order: 3,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS2-SCI-BIO-02",
      "BECE:SCI-NUT-216",
      "CAMBRIDGE_LOWER:BIO-NUT-DIS"
    ],
    skills: [
      {
        id: "skill-jss-human-bio-nutrition",
        unitId: "unit-p3-jss-human-bio-nutrition",
        title: "Enzyme Specificity, Biochemical Food Tests & Immunity",
        code: "SKL-JSS-BIO-216",
        summary:
          "Match digestive enzymes to substrates and optimal pH, execute Benedict/Biuret/Iodine tests accurately, and distinguish active vaccination from passive antibodies.",
        objectives: [
          "Match amylase (starch→maltose), protease/pepsin (protein→amino acids), and lipase (lipids→fatty acids+glycerol)",
          "Interpret color changes in Iodine (blue-black), Benedict's heated (brick-red), Biuret (purple), and Emulsion (cloudy white)",
          "Break infectious transmission chains (vector control, ORT cholera dehydration, vaccination memory cells)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-pri-human-body-systems", "skill-jss-cell-organization"],
        lesson: {
          id: "les-jss-human-bio-nutrition",
          title: "Human Biology, Food Biochemistry & Disease Prevention",
          hookAndIntuition:
            "Every mouthful of bread starts turning sweet on your tongue within 30 seconds because salivary amylase snips giant insoluble starch chains into soluble maltose sugars.",
          conceptualExplanation:
            "Chemical digestion uses biological protein catalysts called ENZYMES obeying the lock-and-key model: (1) Amylase (mouth pH ~7 and small intestine) breaks starch → maltose; (2) Pepsin/Protease (stomach acidic pH ~2, small intestine alkaline pH ~8) breaks proteins → peptides/amino acids; (3) Lipase (small intestine, aided by liver-made bile emulsifying fat droplets) breaks lipids → fatty acids + glycerol. Extreme heat or wrong pH DENATURES the active site permanently.\n\nBiochemists test food samples via four standard indicators: Iodine turns orange-brown → blue-black for STARCH; Benedict's solution heated in a water bath turns blue → green/orange/brick-red for REDUCING SUGARS (glucose); Biuret reagent (CuSO₄ + NaOH) turns blue → lilac/purple for PROTEIN; Ethanol + water emulsion turns cloudy white for FATS. Disease prevention targets the pathogen (bacteria, virus, fungus, malaria Plasmodium protozoan) or its vector (Anopheles mosquito), while vaccines trigger memory lymphocytes for rapid ACTIVE immunity.",
          conceptualModel:
            "Starch→[Amylase]→Sugar | Protein→[Protease]→Amino Acids | Fat→[Bile+Lipase]→Fatty Acids | Tests: Iodine=Black, Benedict+Heat=Brick-Red, Biuret=Purple.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Four Classic Food Tests",
              definition: "Iodine→Blue-Black (Starch); Benedict+Heat→Brick-Red (Reducing Sugar); Biuret→Purple (Protein); Ethanol→Cloudy (Lipid).",
              practicalExample: "Note: Benedict's fails to turn brick-red in the cold—it REQUIRES heating (~80°C water bath)."
            },
            {
              termOrSymbol: "Role of Bile (Emulsification, Not Enzyme)",
              definition: "Produced by the liver and stored in the gallbladder to break large fat globules into tiny droplets and neutralize stomach acid.",
              practicalExample: "Bile increases fat surface area dramatically so pancreatic lipase digests lipids far faster."
            },
            {
              termOrSymbol: "Active Vaccination Immunity",
              definition: "Harmless weakened/dead pathogen antigen trains B-lymphocytes to build long-lived memory cells without causing illness.",
              practicalExample: "On real infection later, memory cells flood blood with specific antibodies before symptoms erupt."
            }
          ],
          workedExamples: [
            {
              title: "Diagnosing Unknown Food Solution X From Four Lab Tests",
              problemStatement: "A pale liquid extract X yields: Iodine stays yellow-brown; Biuret turns deep violet-purple; cold Benedict's stays blue, and heated Benedict's turns brick-red. Identify the nutrients present and absent in X.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Read the Iodine result (yellow-brown, no blue-black).",
                  reasoning: "Starch is ABSENT."
                },
                {
                  stepNumber: 2,
                  instruction: "Read the Biuret result (blue → violet-purple).",
                  reasoning: "Protein is PRESENT."
                },
                {
                  stepNumber: 3,
                  instruction: "Read the heated Benedict's result (brick-red precipitate).",
                  reasoning: "Reducing sugar (e.g., glucose or maltose) is PRESENT (cold blue was simply unheated)."
                },
                {
                  stepNumber: 4,
                  instruction: "Summarize nutritional profile.",
                  reasoning: "Solution X contains both protein and reducing sugar (like sweet milk or soy-glucose drink) and zero starch."
                }
              ],
              takeawayRule: "Always heat Benedict's reagent in a hot water bath before declaring reducing sugar absent; Biuret and Iodine run at room temperature."
            },
            {
              title: "Matching Antibiotics vs Antimalarials vs Vaccines",
              problemStatement: "Explain why penicillin treats bacterial pneumonia effectively, fails against influenza viruses, and why malaria prevention targets both mosquitoes and Plasmodium.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Match antibiotics specifically to bacterial cell walls/machinery.",
                  reasoning: "Penicillin disrupts bacterial cell walls and metabolism; viruses lack cell walls and hide inside human host cells."
                },
                {
                  stepNumber: 2,
                  instruction: "Identify the actual malaria pathogen vs vector.",
                  reasoning: "Malaria is caused by single-celled protozoan Plasmodium transmitted by female Anopheles mosquito bites (the vector)."
                },
                {
                  stepNumber: 3,
                  instruction: "Apply multi-barrier vector + pathogen prevention.",
                  reasoning: "Sleeping under insecticide-treated nets and draining stagnant puddles blocks the mosquito vector; targeted antimalarials clear blood parasites."
                },
                {
                  stepNumber: 4,
                  instruction: "Contrast curative drug vs preventative vaccination.",
                  reasoning: "Vaccines prepare memory immune cells BEFORE exposure, cutting community spread (herd immunity)."
                }
              ],
              takeawayRule: "Antibiotics kill bacteria ONLY—never viruses or malaria protozoa."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Describing bile as a digestive enzyme that chemically breaks fats into fatty acids.",
              whyItIsWrong: "Bile contains bile salts (not enzymes); it physically emulsifies large fat blobs into smaller droplets without breaking covalent ester bonds.",
              correctCorrection: "Bile emulsifies physically; LIPASE chemically digests fats into fatty acids + glycerol."
            },
            {
              misconception: "Taking antibiotics to cure viral colds, flu, or measles.",
              whyItIsWrong: "Viruses have no bacterial cell wall or 70S ribosomes for antibiotics to attack, and misuse breeds antibiotic-resistant superbugs.",
              correctCorrection: "Reserve antibiotics strictly for diagnosed bacterial infections and always finish the prescribed course."
            }
          ],
          guidedPracticePrompt: "Predict what happens to salivary amylase activity once swallowed food mixes with pH 1.5 hydrochloric acid in the stomach.",
          independentPracticePrompt: "Explain how Oral Rehydration Therapy (clean water + measured salt + glucose) saves lives during cholera diarrhea.",
          extensionActivity: "Compare why boiling drinking water kills waterborne bacteria whereas filtration alone removes silt particles.",
          diagnosticSelfCheck: "What exact color change proves protein is present in Biuret reagent?",
          transferApplication: "Analyze why draining open stagnant water drums cuts malaria incidence faster than clearing tall dry grass alone.",
          masteryAssessment: "A food sample turns Iodine blue-black and stays blue in heated Benedict's and Biuret. Name its nutrient.",
          summaryRecap: "Match amylase/protease/lipase to exact substrates & pH, remember bile emulsifies while lipase digests, distinguish the 4 food tests, and pair vectors/vaccines/antibiotics accurately.",
          estimatedMinutes: 90
        },
        questions: [
          {
            id: "q-jss-nut-1",
            type: "multiple_choice",
            questionText: "Which reagent turns from blue to lilac-purple at room temperature when added to a liquid rich in dissolved egg-white protein?",
            mathExpression: "\\text{Protein Test} \\longrightarrow \\text{Purple}",
            options: ["Biuret reagent", "Iodine solution", "Unheated Benedict's solution", "Clear ethanol only"],
            correctAnswer: "Biuret reagent",
            explanation: "Biuret reagent (alkaline copper(II) sulfate) forms a violet/purple complex with peptide bonds in proteins.",
            hintLadder: [
              "Iodine tests for starch (blue-black); Benedict's tests for reducing sugars (brick-red when heated).",
              "Peptide bonds in proteins react with alkaline copper(II) ions.",
              "That test is the Biuret test."
            ],
            misconceptionAlerts: [
              { trigger: "Iodine solution", note: "Iodine detects starch by turning blue-black, not protein." }
            ],
            skillId: "skill-jss-human-bio-nutrition",
            difficulty: "easy"
          },
          {
            id: "q-jss-nut-2",
            type: "multiple_choice",
            questionText: "What are the final small, absorbable end-products produced when protease enzymes finish digesting dietary proteins?",
            mathExpression: "\\text{Protein} \\xrightarrow{\\text{Protease}} ?",
            options: ["Amino acids", "Simple sugars (glucose)", "Fatty acids and glycerol", "Mineral nitrates"],
            correctAnswer: "Amino acids",
            explanation: "Proteases hydrolyze peptide chains down into soluble amino acids that cross small-intestine villi into blood.",
            hintLadder: [
              "Starch breaks into sugars; fats break into fatty acids + glycerol.",
              "What single building-block monomers link together to form protein chains?",
              "Amino acids!"
            ],
            misconceptionAlerts: [
              { trigger: "Fatty acids and glycerol", note: "Fatty acids + glycerol come from lipid digestion by lipase." }
            ],
            skillId: "skill-jss-human-bio-nutrition",
            difficulty: "easy"
          },
          {
            id: "q-jss-nut-3",
            type: "multiple_choice",
            questionText: "How does liver-produced BILE speed up fat digestion inside the small intestine?",
            mathExpression: "\\text{Large Fat Globules} \\xrightarrow{\\text{Bile}} \\text{Tiny Emulsion Droplets}",
            options: [
              "It physically emulsifies large fat globules into tiny droplets, multiplying surface area for lipase enzymes",
              "It chemically splits fat molecules into glucose and glycogen directly",
              "It lowers small-intestine pH to pH 1.5 so pepsin can digest fat",
              "It dissolves starch grains inside mouth saliva"
            ],
            correctAnswer: "It physically emulsifies large fat globules into tiny droplets, multiplying surface area for lipase enzymes",
            explanation: "Bile salts emulsify large lipid drops into tiny droplets (huge surface-area-to-volume ratio) and neutralize acidic chyme so pancreatic lipase works optimally.",
            hintLadder: [
              "Notice bile is NOT an enzyme—it does not split covalent fat bonds itself.",
              "Breaking big drops into tiny droplets increases surface area.",
              "Lipase then digests the exposed surfaces far faster."
            ],
            misconceptionAlerts: [
              { trigger: "It chemically splits fat molecules into glucose and glycogen directly", note: "Bile only breaks fat droplets physically; lipase digests fats into fatty acids and glycerol." }
            ],
            skillId: "skill-jss-human-bio-nutrition",
            difficulty: "medium"
          },
          {
            id: "q-jss-nut-4",
            type: "multiple_choice",
            questionText: "Why do physicians refuse to prescribe antibiotics such as amoxicillin to treat a viral common cold or influenza?",
            mathExpression: "\\text{Antibiotic Target: Bacterial Cell Walls}",
            options: [
              "Antibiotics target bacterial cell walls and metabolism, which viruses lack—and unnecessary use drives resistant superbugs",
              "Antibiotics instantly convert mild cold viruses into deadly malaria parasites",
              "Human white blood cells destroy antibiotics before they leave the stomach",
              "Antibiotics work only on skin rashes, never lung infections"
            ],
            correctAnswer: "Antibiotics target bacterial cell walls and metabolism, which viruses lack—and unnecessary use drives resistant superbugs",
            explanation: "Viruses replicate inside host cells without peptidoglycan cell walls or bacterial ribosomes; antibiotics kill only bacteria.",
            hintLadder: [
              "Compare bacterial structure against viral structure.",
              "Penicillin bursts bacterial cell walls, which viruses do not possess.",
              "Overusing antibiotics selects drug-resistant bacteria."
            ],
            misconceptionAlerts: [
              { trigger: "Human white blood cells destroy antibiotics before they leave the stomach", note: "Oral antibiotics absorb readily into blood to treat bacterial chest/throat infections." }
            ],
            skillId: "skill-jss-human-bio-nutrition",
            difficulty: "medium"
          },
          {
            id: "q-jss-nut-5",
            type: "multiple_choice",
            questionText: "A researcher boils salivary amylase at 95°C for 5 minutes, cools it back to 37°C, and mixes it with starch. After 15 minutes, Iodine still turns deep blue-black. Why?",
            mathExpression: "95^{\\circ}\\text{C Heat} \\implies \\text{Permanent Loss of Enzyme Shape}",
            options: [
              "95°C permanently denatured the enzyme's 3D active site, so it could no longer bind starch even after cooling",
              "Iodine reacts with boiled water to turn black even without starch",
              "Cooling to 37°C froze the amylase molecules completely solid",
              "Amylase requires pH 1.5 boiling acid to turn starch into protein"
            ],
            correctAnswer: "95°C permanently denatured the enzyme's 3D active site, so it could no longer bind starch even after cooling",
            explanation: "High heat breaks hydrogen/weak bonds maintaining the enzyme's folded active-site shape (irreversible denaturation), so starch remains undigested and turns Iodine blue-black.",
            hintLadder: [
              "Remember enzymes are folded 3D proteins obeying lock-and-key fit.",
              "Boiling destroys that 3D shape permanently (just like cooking egg white).",
              "Because starch stays unbroken, Iodine turns blue-black."
            ],
            misconceptionAlerts: [
              { trigger: "Cooling to 37°C froze the amylase molecules completely solid", note: "37°C is normal human body temperature—amylase's optimum temperature!" }
            ],
            skillId: "skill-jss-human-bio-nutrition",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. jss_218_matter_mixtures_separation_chemical_
  // =========================================================================
  {
    id: "unit-p3-jss-mixtures-chemical-change",
    subjectId: "jss_218_matter_mixtures_separation_chemical_",
    level: "junior_secondary",
    title: "Matter, Separation Techniques, Elements/Compounds & Chemical vs Physical Change",
    code: "JSS-MAT-218",
    description:
      "Master elements/compounds/mixtures, filtration, evaporation/crystallization, simple/fractional distillation, chromatography Rf values, and chemical vs physical change criteria.",
    order: 4,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "NERDC_NIGERIAN:JSS2-SCI-CHM-01",
      "BECE:SCI-SEP-218",
      "CAMBRIDGE_LOWER:CHM-MIX-CHG"
    ],
    skills: [
      {
        id: "skill-jss-mixtures-chemical-change",
        unitId: "unit-p3-jss-mixtures-chemical-change",
        title: "Mixture Separation, Chromatography Rf & Chemical Reactions",
        code: "SKL-JSS-MAT-218",
        summary:
          "Select optimal separation apparatus by physical properties, calculate paper chromatography Rf = d_dye / d_solvent, and distinguish new-substance chemical changes.",
        objectives: [
          "Separate heterogeneous and homogeneous mixtures using magnetism, filtration, separating funnel, crystallization, and fractional distillation",
          "Compute paper chromatography retention factor Rf = (dye distance) / (solvent front distance) cleanly in [0, 1]",
          "Contrast reversible physical changes against chemical reactions (new substance, color/gas/precipitate, mass conservation)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-jss-matter-separation-density", "skill-jss-scientific-method-lab"],
        lesson: {
          id: "les-jss-mixtures-chemical-change",
          title: "Mixtures, Separation Methods & Chemical Change",
          hookAndIntuition:
            "Refineries split crude oil into petrol, kerosene, and diesel using boiling points alone, while forensic chemists separate ink pigments on filter paper using exact Rf ratios.",
          conceptualExplanation:
            "An ELEMENT contains one type of atom (Fe, O₂); a COMPOUND bonds different elements chemically in fixed ratios with totally new properties (H₂O, NaCl); a MIXTURE blends substances physically without chemical bonding so components retain their properties and separate by physical differences.\n\nChoose separation tools by physical property: MAGNET (magnetic Fe vs non-magnetic S); FILTRATION (insoluble solid vs liquid); SEPARATING FUNNEL (immiscible liquids of different density, e.g., kerosene + water); CRYSTALLIZATION (dissolved heat-sensitive salt from water); SIMPLE DISTILLATION (recovering pure liquid solvent from dissolved solid); FRACTIONAL DISTILLATION (miscible liquids with close boiling points, e.g., ethanol 78°C + water 100°C); PAPER CHROMATOGRAPHY (separating soluble dyes by mobility, Rf = distance moved by spot / distance moved by solvent front ≤ 1). Physical changes (melting, dissolving) form no new chemical substance; chemical changes (rusting, combustion, baking) create new bonds while conserving total mass in closed vessels.",
          conceptualModel:
            "Insoluble+Liq→Filter | Immiscible Liqs→Separating Funnel | Miscible Liqs→Fractional Distil | Dyes→Chromatography (Rf ≤ 1).",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Chromatography Rf = Distance of Spot / Distance of Solvent Front",
              definition: "Always measured from the PENCIL baseline (never ink!) and strictly ≤ 1.0.",
              practicalExample: "If solvent rises 10.0 cm above baseline and blue dye rises 6.5 cm, Rf = 6.5 / 10.0 = 0.65."
            },
            {
              termOrSymbol: "Simple vs Fractional Distillation",
              definition: "Simple recovers pure solvent from salt/sugar water; Fractional uses a fractionating column to separate close-boiling miscible liquids.",
              practicalExample: "Ethanol (b.p. 78°C) distills first out of fermented water (b.p. 100°C) in a fractionating column."
            },
            {
              termOrSymbol: "Compound vs Mixture Criteria",
              definition: "Compound has fixed composition, energy change on formation, and new properties; Mixture varies continuously and separates physically.",
              practicalExample: "Iron filings + Sulfur powder separate with a magnet (mixture); heated FeS black solid ignores a magnet (compound)."
            }
          ],
          workedExamples: [
            {
              title: "Multi-Stage Separation of Sand, Common Salt & Iron Filings",
              problemStatement: "Design the exact 3-step sequence to recover pure dry sand, pure dry table salt, and pure iron filings from a single mixed beaker.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Pass a wrapped bar magnet over the dry mixture first.",
                  reasoning: "Iron filings cling to the magnet cleanly, leaving only Sand + Salt."
                },
                {
                  stepNumber: 2,
                  instruction: "Add warm distilled water, stir to dissolve salt, and pour through filter paper.",
                  reasoning: "Insoluble Sand stays on filter paper as RESIDUE (wash & dry); dissolved salt passes through as clear salty FILTRATE."
                },
                {
                  stepNumber: 3,
                  instruction: "Gently evaporate the saltwater filtrate (or crystallize) until dry crystals form.",
                  reasoning: "Water vapor escapes, leaving pure white NaCl salt crystals."
                },
                {
                  stepNumber: 4,
                  instruction: "Verify why water was added AFTER magnetism (not before).",
                  reasoning: "Wet slurry traps iron filings inside wet sand, making magnetic extraction messy and incomplete."
                }
              ],
              takeawayRule: "Sequence separation steps cleanly by exploiting unique properties first (magnetism while dry → dissolve & filter → evaporate)."
            },
            {
              title: "Calculating Rf Values & Drawing a Pencil Baseline",
              problemStatement: "On a chromatogram, solvent moves 8.0 cm above the pencil start line. Spot A sits 2.4 cm above baseline, and Spot B sits 6.0 cm above baseline. Why use pencil, and what are Rf(A) and Rf(B)?",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Explain pencil vs pen baseline.",
                  reasoning: "Graphite pencil is insoluble in chromatography solvents, whereas pen ink dissolves and smears up the paper."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute Rf(A) = spot distance / solvent front distance.",
                  reasoning: "Rf(A) = 2.4 / 8.0 = 0.30 (more attracted to stationary paper)."
                },
                {
                  stepNumber: 3,
                  instruction: "Compute Rf(B).",
                  reasoning: "Rf(B) = 6.0 / 8.0 = 0.75 (more soluble in moving solvent)."
                },
                {
                  stepNumber: 4,
                  instruction: "Check Spot purity.",
                  reasoning: "A sample splitting into 2 distinct Rf spots proves the original ink was a MIXTURE of at least two pigments."
                }
              ],
              takeawayRule: "Rf values are dimensionless ratios strictly between 0 and 1 measured from the pencil origin line."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Saying burning wood or candle wax 'destroys mass' because the solid log shrinks to light ash.",
              whyItIsWrong: "Mass only escaped into the room as invisible CO₂ gas and water vapor; in a sealed flask total mass before = total mass after.",
              correctCorrection: "Law of Conservation of Mass holds strictly in every chemical reaction once all gases are weighed."
            },
            {
              misconception: "Using evaporation to recover pure DRINKING water from seawater.",
              whyItIsWrong: "Open evaporation boils pure water away into the room and leaves salt behind!",
              correctCorrection: "Use SIMPLE DISTILLATION with a Liebig condenser to trap and liquefy the pure water vapor."
            }
          ],
          guidedPracticePrompt: "Which apparatus separates vegetable cooking oil floating atop water cleanly into two beakers?",
          independentPracticePrompt: "Classify each as Physical or Chemical change: (a) Ice melting, (b) Iron rusting, (c) Sugar dissolving, (d) Milk souring.",
          extensionActivity: "Explain why heating blue hydrated CuSO₄·5H₂O crystals turns them white (dehydration) and adding a drop of water reverses it.",
          diagnosticSelfCheck: "What boiling-point difference lets fractional distillation separate ethanol (78°C) from water (100°C)?",
          transferApplication: "Explain how emergency seawater desalination stills generate pure drinking water on ships.",
          masteryAssessment: "A green food dye rises 4.5 cm while water solvent rises 7.5 cm above the baseline. Calculate Rf.",
          summaryRecap: "Exploit magnetism, solubility, density (separating funnel), boiling points (distillation), and paper mobility (Rf ≤ 1) to separate mixtures without forming new compounds.",
          estimatedMinutes: 90
        },
        questions: [
          {
            id: "q-jss-mix-1",
            type: "multiple_choice",
            questionText: "Which piece of laboratory apparatus is best suited to separate a mixture of two immiscible liquids of different densities, such as kerosene and water?",
            mathExpression: "\\text{Immiscible Layers } (\\rho_{\\text{oil}} < \\rho_{\\text{water}})",
            options: [
              "Separating funnel",
              "Filter funnel with filter paper",
              "Chromatography strip",
              "Evaporating basin"
            ],
            correctAnswer: "Separating funnel",
            explanation: "A separating funnel lets immiscible layers settle by density so the denser lower water layer can be drained cleanly through the stopcock tap.",
            hintLadder: [
              "Both kerosene and water are liquids, so both pass right through filter paper!",
              "They do not mix (immiscible) and form two clear layers.",
              "A stopcock tap at the bottom drains the lower denser layer cleanly."
            ],
            misconceptionAlerts: [
              { trigger: "Filter funnel with filter paper", note: "Filter paper separates an insoluble SOLID from a liquid, whereas two liquids both soak through." }
            ],
            skillId: "skill-jss-mixtures-chemical-change",
            difficulty: "easy"
          },
          {
            id: "q-jss-mix-2",
            type: "multiple_choice",
            questionText: "Which of the following processes is a CHEMICAL change rather than a physical change?",
            mathExpression: "\\text{New Chemical Substance Formed}",
            options: [
              "An iron gate rusting in damp air to form flaky brown iron(III) oxide",
              "Solid candle wax melting into liquid inside a dish",
              "Table salt dissolving completely into warm water",
              "Liquid water boiling into steam at 100°C"
            ],
            correctAnswer: "An iron gate rusting in damp air to form flaky brown iron(III) oxide",
            explanation: "Rusting combines iron, oxygen, and water chemically into a brand-new compound (hydrated Fe₂O₃) with completely different properties.",
            hintLadder: [
              "Melting, dissolving, and boiling are reversible state/mixing changes keeping identical molecules.",
              "Look for a permanent chemical reaction producing a brand-new compound.",
              "Rust (iron oxide) is a chemically distinct substance from metallic iron."
            ],
            misconceptionAlerts: [
              { trigger: "Table salt dissolving completely into warm water", note: "Dissolving is physical because evaporating the water recovers the original NaCl unchanged." }
            ],
            skillId: "skill-jss-mixtures-chemical-change",
            difficulty: "easy"
          },
          {
            id: "q-jss-mix-3",
            type: "multiple_choice",
            questionText: "In paper chromatography, the water solvent front travels 12.0 cm above the pencil baseline, while an orange dye spot travels 7.8 cm. Calculate the retention factor Rf.",
            mathExpression: "R_f = \\frac{\\text{Distance of Dye}}{\\text{Distance of Solvent Front}}",
            options: ["0.65", "1.54", "0.78", "0.42"],
            correctAnswer: "0.65",
            explanation: "Rf = 7.8 / 12.0 = 0.65 (always ≤ 1.0 since a dissolved spot cannot travel ahead of its carrying solvent).",
            hintLadder: [
              "Divide spot distance by solvent front distance (never reverse).",
              "7.8 ÷ 12.0 = 0.65.",
              "Check that Rf lies between 0 and 1."
            ],
            misconceptionAlerts: [
              { trigger: "1.54", note: "1.54 = 12.0 / 7.8 puts solvent distance on top; valid Rf values can never exceed 1.0." }
            ],
            skillId: "skill-jss-mixtures-chemical-change",
            difficulty: "medium"
          },
          {
            id: "q-jss-mix-4",
            type: "multiple_choice",
            questionText: "Why does pure distillation (not evaporation) work to obtain pure drinking water from salty seawater, and why is FRACTIONAL distillation needed for ethanol + water?",
            mathExpression: "\\text{Salt+Water } (\\Delta T_{\\text{bp}} \\text{ huge}) \\text{ vs Ethanol+Water } (78^{\\circ}\\text{C vs } 100^{\\circ}\\text{C})",
            options: [
              "Simple distillation condenses pure steam back to liquid water; fractional distillation uses a column to separate two volatile liquids with close boiling points",
              "Evaporation cannot boil water above 50°C, whereas fractional distillation freezes the salt solid",
              "Simple distillation traps salt inside the condenser tube while fractional distillation burns ethanol away",
              "Both processes rely on density layers settling inside a separating funnel"
            ],
            correctAnswer: "Simple distillation condenses pure steam back to liquid water; fractional distillation uses a column to separate two volatile liquids with close boiling points",
            explanation: "Simple distillation uses a condenser to capture pure solvent vapor from non-volatile salt; miscible volatile liquids (78°C ethanol + 100°C water) need repeated vaporization-condensation cycles inside a fractionating column.",
            hintLadder: [
              "Salt does not vaporize at 100°C, so simple boiling + condensing recovers pure water.",
              "Both ethanol (78°C) and water (100°C) are volatile liquids that mix completely.",
              "A fractionating column cools and returns higher-boiling water while passing pure ethanol vapor."
            ],
            misconceptionAlerts: [
              { trigger: "Both processes rely on density layers settling inside a separating funnel", note: "Ethanol and water are miscible (dissolve into one layer), so a separating funnel cannot split them." }
            ],
            skillId: "skill-jss-mixtures-chemical-change",
            difficulty: "medium"
          },
          {
            id: "q-jss-mix-5",
            type: "multiple_choice",
            questionText: "A piece of shiny magnesium ribbon of mass 2.40 g is burned completely inside a tightly sealed glass flask containing oxygen gas, forming white magnesium oxide powder. What happens to the total mass of the sealed flask?",
            mathExpression: "2\\text{Mg(s)} + \\text{O}_2\\text{(g)} \\longrightarrow 2\\text{MgO(s)}",
            options: [
              "The total mass of the sealed flask remains completely unchanged (conservation of mass), while the solid powder itself weighs > 2.40 g",
              "The total mass of the sealed flask decreases because oxygen is consumed",
              "The total mass of the sealed flask increases above initial flask mass because heat adds weight",
              "The solid powder weighs exactly 2.40 g and oxygen gas gains mass"
            ],
            correctAnswer: "The total mass of the sealed flask remains completely unchanged (conservation of mass), while the solid powder itself weighs > 2.40 g",
            explanation: "Inside a sealed system, no atoms enter or leave, so total mass (flask + Mg + O₂ = flask + MgO + leftover gas) stays identical; however, the solid product gains 1.60 g from bonded oxygen to weigh 4.00 g.",
            hintLadder: [
              "Distinguish TOTAL mass of the sealed flask from the mass of the SOLID magnesium ribbon alone.",
              "Atoms only rearrange inside a closed container, so total system mass stays constant.",
              "Solid MgO includes bonded oxygen atoms, making the white ash heavier than 2.40 g Mg."
            ],
            misconceptionAlerts: [
              { trigger: "The total mass of the sealed flask decreases because oxygen is consumed", note: "Oxygen atoms are still inside the sealed flask—now chemically bonded inside solid MgO." }
            ],
            skillId: "skill-jss-mixtures-chemical-change",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. sss_256_physics_fields_electromagnetic_induc
  // =========================================================================
  {
    id: "unit-p3-sss-em-induction-ac",
    subjectId: "sss_256_physics_fields_electromagnetic_induc",
    level: "senior_secondary",
    title: "Gravitational/Electric Fields, Faraday-Lenz Induction, Transformers & AC Impedance",
    code: "SSS-PHY-256",
    description:
      "Master inverse-square fields (F ∝ 1/r²), magnetic Lorentz force F = Bqv sin θ, Faraday/Lenz flux induction ε = −N dΦ/dt, transformer turns/losses, and RLC AC impedance.",
    order: 3,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:PHY-IND-256",
      "JAMB_UTME:PHY-FLD-AC",
      "CAMBRIDGE_ALEVEL:PHY-EM-IND"
    ],
    skills: [
      {
        id: "skill-sss-em-induction-ac",
        unitId: "unit-p3-sss-em-induction-ac",
        title: "Fields, Faraday-Lenz Induction, Transformers & AC Impedance",
        code: "SKL-SSS-PHY-256",
        summary:
          "Apply inverse-square Coulomb/Newton laws, Lorentz force and circular cyclotron radii, Faraday/Lenz induced EMF, step-up/down transformers, and RLC phasor impedance.",
        objectives: [
          "Solve Coulomb electrostatic and gravitational inverse-square scaling and field strength ratios",
          "Compute induced EMF ε = N ΔΦ/Δt = B L v and enforce Lenz's conservation opposition",
          "Evaluate transformer ratios V_p/V_s = N_p/N_s, power-grid I²R loss reduction, and RLC impedance Z = √(R² + (X_L − X_C)²)"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-sss-optics-circuits-induction", "skill-phy-induction-atomic-physics"],
        lesson: {
          id: "les-sss-em-induction-ac",
          title: "Fields, Electromagnetic Induction & AC Circuits",
          hookAndIntuition:
            "Every national power grid steps voltage UP to 330,000 V before cross-country cables because carrying high voltage at tiny current slashes resistive I²R heat waste by over 99%.",
          conceptualExplanation:
            "Gravitational (F = GMm/r²) and Coulomb electric (F = kq₁q₂/r²) fields share exact inverse-square geometry: doubling separation r reduces force to 1/4. A charge q moving at speed v across magnetic field B experiences perpendicular Lorentz force F = Bqv sin θ, curving it into circular radius r = mv/(Bq) with work done = 0.\n\nBy FARADAY'S LAW, changing magnetic flux Φ = BA cos θ through N turns induces EMF ε = −N(ΔΦ/Δt) (or ε = BLv for a moving rod). LENZ'S LAW (the minus sign) states induced current always creates a magnetic field OPPOSING the flux change causing it—conserving energy! Ideal transformers obey V_s / V_p = N_s / N_p = I_p / I_s (V_p I_p = V_s I_s). In AC circuits with sinusoidal V_rms = V₀/√2, inductor reactance X_L = 2πfL (+90° lead) and capacitor reactance X_C = 1/(2πfC) (−90° lag) combine via phasor Pythagoras: Z = √(R² + (X_L − X_C)²), reaching RESONANCE at X_L = X_C (f₀ = 1/(2π√(LC))) where current maximizes.",
          conceptualModel:
            "Lorentz: F = Bqv sin θ | Faraday-Lenz: ε = −N ΔΦ/Δt | Transformer: V_s/V_p = N_s/N_p = I_p/I_s | AC Impedance: Z = √(R² + (X_L − X_C)²).",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Faraday & Motional EMF: ε = −N ΔΦ/Δt = B L v",
              definition: "EMF depends strictly on the RATE OF CHANGE of magnetic flux linkage (zero for steady constant flux!).",
              practicalExample: "Moving a 0.5 m copper wingtip at 40 m/s perpendicular to B = 0.2 T induces ε = 0.2(0.5)(40) = 4.0 V."
            },
            {
              termOrSymbol: "Grid Transmission Power Loss: P_loss = I² R = (P / V)² R",
              definition: "Stepping transmission voltage up 10× drops current 10× and slashes cable I²R heat loss by 100×!",
              practicalExample: "Doubling transmission voltage from 11 kV to 22 kV cuts line heat loss to 1/4."
            },
            {
              termOrSymbol: "Series RLC Impedance & Resonance",
              definition: "Z = √(R² + (X_L − X_C)²); phase angle cos φ = R/Z; resonance occurs when X_L = X_C giving Z_min = R.",
              practicalExample: "If R = 6 Ω, X_L = 14 Ω, X_C = 6 Ω ⇒ Z = √(6² + 8²) = 10 Ω."
            }
          ],
          workedExamples: [
            {
              title: "Step-Up Transformer & Power Grid I²R Loss Calculation",
              problemStatement: "A power plant delivers 240 kW through cables of total resistance R = 5 Ω. Compare line heat loss if transmitted at (a) 1,200 V vs (b) stepped up 10× to 12,000 V.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Compute transmission current I = P / V at 1,200 V.",
                  reasoning: "I₁ = 240,000 W / 1,200 V = 200 A."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute resistive line heat loss P_loss = I² R at 1,200 V.",
                  reasoning: "P_loss1 = (200)² × 5 = 40,000 × 5 = 200,000 W = 200 kW (83% wasted!)."
                },
                {
                  stepNumber: 3,
                  instruction: "Recompute current I₂ at 12,000 V (10× higher voltage).",
                  reasoning: "I₂ = 240,000 W / 12,000 V = 20 A (10× smaller current)."
                },
                {
                  stepNumber: 4,
                  instruction: "Compute P_loss2 = I₂² R.",
                  reasoning: "P_loss2 = (20)² × 5 = 400 × 5 = 2,000 W = 2 kW (a 100× reduction in cable loss!)."
                }
              ],
              takeawayRule: "Never evaluate grid cable loss with V²/R using transmission voltage—use I²R where I = P_delivered / V_line."
            },
            {
              title: "Series RLC AC Impedance, Peak-to-RMS Current & Power Factor",
              problemStatement: "A 12 Ω resistor, an inductor with X_L = 24 Ω, and a capacitor with X_C = 15 Ω connect in series to an AC supply of peak voltage V₀ = 150√2 V. Find impedance Z, RMS current, and true average power.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Convert peak supply voltage V₀ to RMS voltage V_rms = V₀ / √2.",
                  reasoning: "V_rms = (150√2) / √2 = 150 V."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute net reactance |X_L − X_C| and impedance Z = √(R² + (X_L − X_C)²).",
                  reasoning: "X_L − X_C = 24 − 15 = 9 Ω. Z = √(12² + 9²) = √(144 + 81) = √225 = 15 Ω."
                },
                {
                  stepNumber: 3,
                  instruction: "Find RMS circuit current I_rms = V_rms / Z.",
                  reasoning: "I_rms = 150 / 15 = 10 A."
                },
                {
                  stepNumber: 4,
                  instruction: "Compute true real power dissipated only in the resistor (P = I_rms² R).",
                  reasoning: "P = 10² × 12 = 1,200 W (ideal L and C absorb zero net average power over a full cycle)."
                }
              ],
              takeawayRule: "In AC circuits, reactances subtract vertically before Pythagorean combination with R, and ONLY resistance R consumes real Watts."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Claiming a transformer still steps DC battery voltage up from 12 V to 120 V.",
              whyItIsWrong: "Steady DC makes constant magnetic flux (ΔΦ/Δt = 0), so Faraday induction produces 0 V on the secondary coil (and can burn out the primary!).",
              correctCorrection: "Transformers operate strictly on changing AC current (or pulsed switching), never steady DC."
            },
            {
              misconception: "Using cable-to-ground transmission voltage V_line directly in V²/R to find line heating loss.",
              whyItIsWrong: "V_line sits across the distant city load + cables, NOT across the cable resistance alone; use ΔV_cable = I·R.",
              correctCorrection: "Compute line current I = P / V first, then evaluate P_loss = I² R_cable."
            }
          ],
          guidedPracticePrompt: "If a 90%-efficient transformer steps 240 V down to 24 V delivering 5 A to a load, calculate primary input current I_p.",
          independentPracticePrompt: "A 200-turn coil of area 0.04 m² sits perpendicular to a 0.5 T field that collapses uniformly to 0 T in 0.02 s. Find magnitude of induced EMF.",
          extensionActivity: "Check why laminated soft-iron transformer cores cut eddy-current heat losses without blocking magnetic flux.",
          diagnosticSelfCheck: "At AC resonance (X_L = X_C), what does total circuit impedance Z equal?",
          transferApplication: "Design an LC radio tuning circuit resonating at f₀ = 1 MHz given L = 25 μH.",
          masteryAssessment: "Two point charges exert force F at separation d. Find new force when one charge triples and separation triples.",
          summaryRecap: "Apply inverse-square field scaling, ε = −N dΦ/dt opposing flux change, transformers requiring AC to slash I²R grid waste, and phasor Z = √(R² + (X_L − X_C)²).",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-sss-em-1",
            type: "multiple_choice",
            questionText: "Two point charges +q₁ and +q₂ repel with electrostatic force F = 36 N at separation d. If q₁ is doubled and the separation distance is tripled (3d), what is the new repulsive force?",
            mathExpression: "F = \\frac{k q_1 q_2}{r^2}",
            options: ["8 N", "24 N", "12 N", "4 N"],
            correctAnswer: "8 N",
            explanation: "Doubling q₁ multiplies force by 2; tripling distance divides force by 3² = 9. New force = 36 × (2 / 9) = 8 N.",
            hintLadder: [
              "Apply Coulomb scaling: F ∝ q₁ / r².",
              "Doubling q₁ gives factor ×2; tripling r gives factor ÷3² = ÷9.",
              "Multiply 36 × (2/9)."
            ],
            misconceptionAlerts: [
              { trigger: "24 N", note: "24 N divides by 3 instead of 3² = 9." }
            ],
            skillId: "skill-sss-em-induction-ac",
            difficulty: "easy"
          },
          {
            id: "q-sss-em-2",
            type: "multiple_choice",
            questionText: "An ideal step-down transformer has 1,200 primary turns and 150 secondary turns. When connected to a 240 V AC mains supply delivering 4.0 A to a secondary heater, what is the primary current I_p?",
            mathExpression: "\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}",
            options: ["0.5 A", "32.0 A", "2.0 A", "1.0 A"],
            correctAnswer: "0.5 A",
            explanation: "Turns ratio N_s / N_p = 150 / 1,200 = 1/8, so V_s = 240 / 8 = 30 V. By ideal power balance 240 × I_p = 30 × 4.0 = 120 W ⇒ I_p = 120 / 240 = 0.5 A.",
            hintLadder: [
              "Step-down voltage ratio = 150 / 1,200 = 1/8, so secondary voltage = 30 V.",
              "Ideal transformer conserves power: V_p I_p = V_s I_s.",
              "240 · I_p = 30 × 4.0."
            ],
            misconceptionAlerts: [
              { trigger: "32.0 A", note: "Voltage steps down 8×, so primary current is 8× SMALLER than secondary current, not larger." }
            ],
            skillId: "skill-sss-em-induction-ac",
            difficulty: "easy"
          },
          {
            id: "q-sss-em-3",
            type: "multiple_choice",
            questionText: "A square coil of 250 turns and cross-sectional area 0.02 m² sits perpendicular to a 0.80 T magnetic field. The field is dropped uniformly to zero in 0.05 s. Calculate the magnitude of induced EMF.",
            mathExpression: "|\\varepsilon| = N\\left|\\frac{\\Delta (BA)}{\\Delta t}\\right|",
            options: ["80 V", "40 V", "160 V", "20 V"],
            correctAnswer: "80 V",
            explanation: "Initial flux Φ = BA = 0.80 × 0.02 = 0.016 Wb. |ε| = 250 × (0.016 / 0.05) = 250 × 0.32 = 80 V.",
            hintLadder: [
              "Compute initial flux through 1 loop: Φ = B × A = 0.80 × 0.02 = 0.016 Wb.",
              "Divide flux change ΔΦ = 0.016 by Δt = 0.05 s to get 0.32 V per turn.",
              "Multiply by N = 250 turns."
            ],
            misconceptionAlerts: [
              { trigger: "40 V", note: "Check division: 0.016 / 0.05 = 1.6 / 5 = 0.32, and 250 × 0.32 = 80." }
            ],
            skillId: "skill-sss-em-induction-ac",
            difficulty: "medium"
          },
          {
            id: "q-sss-em-4",
            type: "multiple_choice",
            questionText: "When the North pole of a bar magnet is pushed rapidly downward toward a closed copper ring lying flat on a table, how does the induced current inside the ring respond according to Lenz's Law?",
            mathExpression: "\\varepsilon = -N\\frac{d\\Phi}{dt}",
            options: [
              "It creates an upward-facing North pole on top of the ring to oppose the approaching magnet",
              "It creates a South pole on top of the ring to pull the magnet faster downward",
              "No current flows until the magnet stops moving completely",
              "It induces direct current strictly proportional to the stationary magnetic field strength"
            ],
            correctAnswer: "It creates an upward-facing North pole on top of the ring to oppose the approaching magnet",
            explanation: "Lenz's Law enforces energy conservation: induced current must oppose the motion causing the flux increase—making the top face a repelling North pole (counter-clockwise current viewed from above).",
            hintLadder: [
              "If the ring pulled the magnet faster instead, kinetic energy + electric heat would appear from nothing!",
              "Therefore the ring must REPEL the incoming North pole.",
              "Like poles repel, so the top face becomes a North pole."
            ],
            misconceptionAlerts: [
              { trigger: "It creates a South pole on top of the ring to pull the magnet faster downward", note: "Attracting the falling magnet would create runaway free energy, violating Lenz's Law." }
            ],
            skillId: "skill-sss-em-induction-ac",
            difficulty: "medium"
          },
          {
            id: "q-sss-em-5",
            type: "multiple_choice",
            questionText: "A series RLC circuit contains R = 8 Ω, inductive reactance X_L = 22 Ω, and capacitive reactance X_C = 16 Ω across a 120 V_rms AC supply. Find total impedance Z and true average power dissipated in the circuit.",
            mathExpression: "Z = \\sqrt{R^2 + (X_L - X_C)^2},\\quad P = I_{\\text{rms}}^2 R",
            options: [
              "Z = 10 Ω, P = 1,152 W",
              "Z = 10 Ω, P = 1,440 W",
              "Z = 46 Ω, P = 313 W",
              "Z = 14 Ω, P = 735 W"
            ],
            correctAnswer: "Z = 10 Ω, P = 1,152 W",
            explanation: "Net reactance = 22 − 16 = 6 Ω. Z = √(8² + 6²) = √(64 + 36) = 10 Ω. I_rms = 120 / 10 = 12 A. Real power is dissipated only in resistor R: P = I_rms² R = 12² × 8 = 144 × 8 = 1,152 W.",
            hintLadder: [
              "Subtract X_L − X_C = 22 − 16 = 6 Ω, then compute Z = √(8² + 6²) = 10 Ω.",
              "Find I_rms = 120 V / 10 Ω = 12 A.",
              "Real power uses ONLY R (not Z): P = 12² × 8."
            ],
            misconceptionAlerts: [
              { trigger: "Z = 10 Ω, P = 1,440 W", note: "1,440 VA (V_rms × I_rms) is Apparent Power, whereas pure reactive components consume zero average Watts." }
            ],
            skillId: "skill-sss-em-induction-ac",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 4. sss_259_chemistry_equilibrium_acids_bases_io
  // =========================================================================
  {
    id: "unit-p3-sss-acids-bases-ionic-eq",
    subjectId: "sss_259_chemistry_equilibrium_acids_bases_io",
    level: "senior_secondary",
    title: "Chemical Equilibrium (Kc/Kp), Brønsted-Lowry Acids/Bases, pH, Buffers & Ksp",
    code: "SSS-CHM-259",
    description:
      "Master equilibrium constants Kc and Le Chatelier shifts, Kw = 10⁻¹⁴ pH/pOH arithmetic, weak-acid Ka approximation, Henderson-Hasselbalch buffers, and Ksp precipitation.",
    order: 4,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:CHM-EQB-259",
      "JAMB_UTME:CHM-ACD-ION",
      "CAMBRIDGE_ALEVEL:CHM-EQ-ACID"
    ],
    skills: [
      {
        id: "skill-sss-acids-bases-ionic-eq",
        unitId: "unit-p3-sss-acids-bases-ionic-eq",
        title: "Equilibrium Kc, pH/pKa Calculations, Buffers & Solubility Ksp",
        code: "SKL-SSS-CHM-259",
        summary:
          "Evaluate reaction quotients Q vs Kc, calculate strong/weak acid pH and conjugate buffer pH, and predict ionic precipitation when Qsp > Ksp.",
        objectives: [
          "Construct homogeneous/heterogeneous Kc expressions omitting pure solids/liquids and predict Q vs Kc shifts",
          "Compute pH = −log₁₀[H⁺] for strong/weak acids (H⁺ ≈ √(Ka·C)) and conjugate buffers (pH = pKa + log([A⁻]/[HA]))",
          "Determine salt molar solubility s from Ksp and test common-ion precipitation"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-sss-kinetics-equilibrium-ph", "skill-chm-ph-titrations"],
        lesson: {
          id: "les-sss-acids-bases-ionic-eq",
          title: "Chemical Equilibrium, Ionic Equilibria & Buffers",
          hookAndIntuition:
            "Human blood stays locked within pH 7.35–7.45 despite lactic acid surges during sprints because carbonic acid/bicarbonate buffers neutralize H⁺ and OH⁻ automatically.",
          conceptualExplanation:
            "At dynamic equilibrium, forward and reverse rates match so concentrations stabilize with equilibrium constant Kc = [Products]^p / [Reactants]^r (pure solids (s) and pure liquids (l) have constant activity = 1 and NEVER appear in Kc!). Only TEMPERATURE changes the numerical value of Kc; pressure, concentration, or catalysts never alter Kc (though concentrations shift via Le Chatelier).\n\nIn water at 25°C, auto-ionization obeys Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ (so pH + pOH = 14). By Brønsted-Lowry theory, an acid donates H⁺ and a base accepts H⁺. Strong acids (HCl, HNO₃) ionize 100%; weak acids (HA ⇌ H⁺ + A⁻) obey [H⁺] ≈ √(Ka·C). Pairing weak acid HA with its conjugate salt A⁻ forms a BUFFER resisting pH swings via pH = pKa + log₁₀([A⁻]/[HA]) (at 1:1 ratio, pH = pKa). Sparingly soluble salts obey solubility product Ksp (e.g., AgCl → s², PbCl₂ → 4s³); mixing ions precipitates solid whenever ionic product Qsp > Ksp.",
          conceptualModel:
            "Omit (s)/(l) in Kc | Only T alters Kc | pH + pOH = 14 | Weak Acid [H⁺]=√(KaC) | Buffer: pH = pKa + log([A⁻]/[HA]) | Qsp > Ksp ⇒ Precipitate.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Equilibrium Law (Omit Solids/Liquids): Kc = [C]^c / [A]^a",
              definition: "Concentration terms raise to stoichiometric exponents; pure (s) and (l) are excluded.",
              practicalExample: "For CaCO₃(s) ⇌ CaO(s) + CO₂(g), Kc = [CO₂] and Kp = P(CO₂) only!"
            },
            {
              termOrSymbol: "pH, Weak Acid Ka & Buffer Henderson-Hasselbalch",
              definition: "pH = −log[H⁺]; weak [H⁺] ≈ √(KaC); buffer pH = pKa + log([Base]/[Acid]).",
              practicalExample: "If pKa = 4.76 and [CH₃COO⁻] = [CH₃COOH], log(1) = 0 so buffer pH = 4.76."
            },
            {
              termOrSymbol: "Solubility Product Ksp (AB vs AB₂)",
              definition: "For AB(s) ⇌ A⁺ + B⁻, Ksp = s². For AB₂(s) ⇌ A²⁺ + 2B⁻, Ksp = s(2s)² = 4s³.",
              practicalExample: "If Ksp(BaSO₄) = 1.0 × 10⁻¹⁰, molar solubility s = √(10⁻¹⁰) = 1.0 × 10⁻⁵ M."
            }
          ],
          workedExamples: [
            {
              title: "Calculating pH of a Weak Acid & Its Equimolar Buffer",
              problemStatement: "Acetic acid (CH₃COOH) has Ka = 1.8 × 10⁻⁵ (pKa = 4.74). Find (a) pH of 0.20 M CH₃COOH (given √(3.6×10⁻⁶) ≈ 1.9×10⁻³, log 1.9 ≈ 0.28), and (b) pH after adding sodium acetate to make [CH₃COO⁻] = 0.20 M.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Apply weak-acid formula [H⁺] ≈ √(Ka · C) for pure 0.20 M acetic acid.",
                  reasoning: "[H⁺] = √(1.8 × 10⁻⁵ × 0.20) = √(3.6 × 10⁻⁶) = 1.9 × 10⁻³ M."
                },
                {
                  stepNumber: 2,
                  instruction: "Take −log₁₀[H⁺] to find pure weak-acid pH.",
                  reasoning: "pH = 3 − log(1.9) = 3 − 0.28 = 2.72."
                },
                {
                  stepNumber: 3,
                  instruction: "Apply Henderson-Hasselbalch after conjugate acetate reaches 0.20 M.",
                  reasoning: "pH = pKa + log₁₀([A⁻]/[HA]) = 4.74 + log₁₀(0.20 / 0.20)."
                },
                {
                  stepNumber: 4,
                  instruction: "Evaluate log₁₀(1) = 0.",
                  reasoning: "Buffer pH = 4.74 + 0 = 4.74 (common-ion acetate pushed equilibrium left, raising pH from 2.72 to 4.74)."
                }
              ],
              takeawayRule: "Whenever [Conjugate Base] = [Weak Acid], the buffer pH equals pKa identically."
            },
            {
              title: "Predicting Precipitation via Ionic Product Qsp vs Ksp",
              problemStatement: "Equal 100 mL volumes of 2.0 × 10⁻⁴ M AgNO₃ and 2.0 × 10⁻⁴ M NaCl are mixed (total 200 mL). Does AgCl precipitate if Ksp(AgCl) = 1.8 × 10⁻¹⁰?",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Halve BOTH concentrations to account for 1:1 volume dilution (100 mL → 200 mL).",
                  reasoning: "[Ag⁺] = 1.0 × 10⁻⁴ M; [Cl⁻] = 1.0 × 10⁻⁴ M."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute reaction ionic product Qsp = [Ag⁺][Cl⁻].",
                  reasoning: "Qsp = (1.0 × 10⁻⁴)(1.0 × 10⁻⁴) = 1.0 × 10⁻⁸."
                },
                {
                  stepNumber: 3,
                  instruction: "Compare Qsp against Ksp = 1.8 × 10⁻¹⁰.",
                  reasoning: "1.0 × 10⁻⁸ > 1.8 × 10⁻¹⁰ (over 55× larger than Ksp!)."
                },
                {
                  stepNumber: 4,
                  instruction: "Conclude precipitation direction.",
                  reasoning: "Since Qsp > Ksp, solution is supersaturated and white AgCl(s) precipitates immediately."
                }
              ],
              takeawayRule: "Always recalculate diluted concentrations after mixing two aqueous solutions BEFORE computing Qsp."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Including solid reactant [CaCO₃(s)] in the denominator of Kc for CaCO₃(s) ⇌ CaO(s) + CO₂(g).",
              whyItIsWrong: "A pure solid's density (mol/L) is constant regardless of sample mass, so it folds into Kc and never appears.",
              correctCorrection: "Include ONLY aqueous (aq) and gaseous (g) species inside Kc."
            },
            {
              misconception: "Saying adding extra reactant shifts equilibrium right AND increases the numerical value of Kc.",
              whyItIsWrong: "Changing concentrations shifts Q temporarily, so equilibrium adjusts until products/reactants return to the SAME Kc.",
              correctCorrection: "ONLY temperature changes Kc (or Kp, Ka, Kw, Ksp)."
            }
          ],
          guidedPracticePrompt: "Write the equilibrium expression Kp for 2SO₂(g) + O₂(g) ⇌ 2SO₃(g) and predict the shift when total pressure increases.",
          independentPracticePrompt: "Calculate the pH of a 0.005 M aqueous Ba(OH)₂ strong base solution at 25°C (fully dissociated into 2 OH⁻!).",
          extensionActivity: "Check why Ksp of PbCl₂ equals 4s³ rather than s² (stoichiometric 2 inside (2s)²).",
          diagnosticSelfCheck: "In the conjugate pair NH₄⁺ / NH₃, which species is the Brønsted-Lowry acid?",
          transferApplication: "Explain how industrial Haber ammonia synthesis balances exothermic cooling vs catalyst activation kinetics at 450°C.",
          masteryAssessment: "Compute molar solubility s of Mg(OH)₂ if Ksp = 4.0 × 10⁻¹².",
          summaryRecap: "Omit solids/liquids from Kc, only temperature alters K, apply pH + pOH = 14 and Henderson-Hasselbalch buffers, and dilute before checking Qsp > Ksp.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-sss-chm-1",
            type: "multiple_choice",
            questionText: "What is the pH of a 0.005 M aqueous solution of Ba(OH)₂ (a strong dibasic base that ionizes 100%: Ba(OH)₂ → Ba²⁺ + 2OH⁻) at 25°C?",
            mathExpression: "[\\text{OH}^-] = 2 \\times 0.005,\\quad \\text{pH} = 14 - \\text{pOH}",
            options: ["12.0", "11.7", "2.0", "12.3"],
            correctAnswer: "12.0",
            explanation: "Each mole of Ba(OH)₂ releases 2 moles of OH⁻, so [OH⁻] = 2 × 0.005 = 0.010 M = 10⁻² M. pOH = −log(10⁻²) = 2.0, giving pH = 14 − 2.0 = 12.0.",
            hintLadder: [
              "Notice Ba(OH)₂ produces TWO hydroxide ions per formula unit: [OH⁻] = 2 × 0.005 = 0.01 M.",
              "Compute pOH = −log₁₀(10⁻²) = 2.0.",
              "Subtract from 14: pH = 14 − 2 = 12.0."
            ],
            misconceptionAlerts: [
              { trigger: "2.0", note: "2.0 is pOH (not pH); basic solutions have pH > 7." }
            ],
            skillId: "skill-sss-acids-bases-ionic-eq",
            difficulty: "easy"
          },
          {
            id: "q-sss-chm-2",
            type: "multiple_choice",
            questionText: "Write the correct equilibrium constant expression Kc for the heterogeneous decomposition: CaCO₃(s) ⇌ CaO(s) + CO₂(g).",
            mathExpression: "\\text{CaCO}_3\\text{(s)} \\rightleftharpoons \\text{CaO(s)} + \\text{CO}_2\\text{(g)}",
            options: [
              "Kc = [CO₂]",
              "Kc = [CaO][CO₂] / [CaCO₃]",
              "Kc = [CO₂] / [CaCO₃]",
              "Kc = 1 / [CO₂]"
            ],
            correctAnswer: "Kc = [CO₂]",
            explanation: "Pure solids CaCO₃(s) and CaO(s) have constant unit activity and are omitted from Kc, leaving only gaseous CO₂.",
            hintLadder: [
              "Pure solids (s) and pure liquids (l) never appear inside Kc expressions.",
              "Identify the only gaseous or aqueous species in the equation.",
              "CO₂(g) is on the product side, so Kc = [CO₂]."
            ],
            misconceptionAlerts: [
              { trigger: "Kc = [CaO][CO₂] / [CaCO₃]", note: "That mistakenly includes pure solids CaO(s) and CaCO₃(s)." }
            ],
            skillId: "skill-sss-acids-bases-ionic-eq",
            difficulty: "easy"
          },
          {
            id: "q-sss-chm-3",
            type: "multiple_choice",
            questionText: "In the exothermic equilibrium 2SO₂(g) + O₂(g) ⇌ 2SO₃(g) (ΔH = −198 kJ/mol), what single change BOTH shifts equilibrium right toward SO₃ AND increases the numerical value of Kc?",
            mathExpression: "2\\text{SO}_2 + \\text{O}_2 \\rightleftharpoons 2\\text{SO}_3 \\quad (\\Delta H < 0)",
            options: [
              "Decreasing the reaction temperature",
              "Increasing total gas pressure by shrinking container volume",
              "Injecting extra O₂ gas at constant temperature",
              "Adding a vanadium(V) oxide (V₂O₅) catalyst"
            ],
            correctAnswer: "Decreasing the reaction temperature",
            explanation: "All four options except catalyst shift equilibrium right, yet ONLY changing temperature alters the equilibrium constant Kc itself (cooling favors the exothermic forward reaction and raises Kc).",
            hintLadder: [
              "Recall which single thermodynamic variable can change the numerical value of Kc.",
              "Pressure, concentration, and catalysts shift rates/Q while leaving Kc fixed.",
              "Since forward is exothermic (ΔH < 0), cooling raises Kc."
            ],
            misconceptionAlerts: [
              { trigger: "Increasing total gas pressure by shrinking container volume", note: "Higher pressure shifts equilibrium right (3 mol gas → 2 mol gas) but leaves Kc numerically unchanged!" }
            ],
            skillId: "skill-sss-acids-bases-ionic-eq",
            difficulty: "medium"
          },
          {
            id: "q-sss-chm-4",
            type: "multiple_choice",
            questionText: "A buffer solution is prepared by mixing 0.40 M methanoic acid (HCOOH, pKa = 3.75) with 0.40 M sodium methanoate (HCOONa). What is the resulting buffer pH?",
            mathExpression: "\\text{pH} = \\text{p}K_a + \\log_{10}\\left(\\frac{[\\text{A}^-]}{[\\text{HA}]}\\right)",
            options: ["3.75", "4.75", "2.75", "7.00"],
            correctAnswer: "3.75",
            explanation: "Because [A⁻] = [HA] = 0.40 M, the ratio is 1 and log₁₀(1) = 0, so pH = pKa + 0 = 3.75.",
            hintLadder: [
              "Apply Henderson-Hasselbalch: pH = pKa + log₁₀([HCOO⁻] / [HCOOH]).",
              "Evaluate ratio 0.40 / 0.40 = 1.",
              "log₁₀(1) = 0."
            ],
            misconceptionAlerts: [
              { trigger: "7.00", note: "A weak acid + conjugate base buffer locks pH near its pKa (3.75), not neutral 7.00." }
            ],
            skillId: "skill-sss-acids-bases-ionic-eq",
            difficulty: "medium"
          },
          {
            id: "q-sss-chm-5",
            type: "multiple_choice",
            questionText: "Magnesium hydroxide, Mg(OH)₂(s) ⇌ Mg²⁺(aq) + 2OH⁻(aq), has solubility product Ksp = 3.2 × 10⁻¹¹ at 25°C. Calculate its pure-water molar solubility s (in mol/L).",
            mathExpression: "K_{sp} = [\\text{Mg}^{2+}][\\text{OH}^-]^2 = s(2s)^2 = 4s^3",
            options: ["2.0 × 10⁻⁴ M", "5.66 × 10⁻⁶ M", "4.0 × 10⁻⁴ M", "3.2 × 10⁻⁴ M"],
            correctAnswer: "2.0 × 10⁻⁴ M",
            explanation: "Setting [Mg²⁺] = s and [OH⁻] = 2s: Ksp = s(2s)² = 4s³ = 3.2 × 10⁻¹¹ = 32 × 10⁻¹² ⇒ s³ = 8 × 10⁻¹² ⇒ s = 2.0 × 10⁻⁴ M.",
            hintLadder: [
              "Write [OH⁻] = 2s because each Mg(OH)₂ releases 2 hydroxide ions.",
              "Square 2s cleanly: Ksp = s(2s)² = 4s³.",
              "Divide 32 × 10⁻¹² by 4 to get s³ = 8 × 10⁻¹² and take cube root."
            ],
            misconceptionAlerts: [
              { trigger: "5.66 × 10⁻⁶ M", note: "Taking √Ksp assumes 1:1 stoichiometry (s²) instead of 1:2 stoichiometry (4s³)." }
            ],
            skillId: "skill-sss-acids-bases-ionic-eq",
            difficulty: "hard"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 5. sss_262_biology_reproduction_development_rep
  // =========================================================================
  {
    id: "unit-p3-sss-biology-reproduction",
    subjectId: "sss_262_biology_reproduction_development_rep",
    level: "senior_secondary",
    title: "Biology: Mitosis vs Meiosis, Plant Double Fertilization, Gametes & Reproductive Health",
    code: "SSS-BIO-262",
    description:
      "Master mitosis vs meiosis (2n → n), angiosperm double fertilization (zygote + 3n endosperm), human menstrual hormonal feedback (FSH/LH/estrogen/progesterone), placental exchange, and STI/reproductive health.",
    order: 4,
    category: "core",
    estimatedHours: 4.0,
    isDeepSaturated: true,
    provenanceVersion: "2.0.0",
    curriculumStandardMappings: [
      "WAEC_WASSCE:BIO-REP-262",
      "JAMB_UTME:BIO-DEV-262",
      "CAMBRIDGE_ALEVEL:BIO-REP-HOR"
    ],
    skills: [
      {
        id: "skill-sss-biology-reproduction",
        unitId: "unit-p3-sss-biology-reproduction",
        title: "Meiosis, Plant & Human Reproduction, Hormones & Placenta",
        code: "SKL-SSS-BIO-262",
        summary:
          "Contrast somatic mitosis vs gamete meiosis, trace double fertilization in flowering plants, and model menstrual cycle endocrine feedback and placental gas/waste transfer.",
        objectives: [
          "Compare Mitosis (2n → two identical 2n cells) against Meiosis (2n → four varied haploid n gametes via crossing over)",
          "Trace angiosperm pollination, pollen tube growth, and double fertilization (2n embryo + 3n endosperm)",
          "Sequence FSH, Estrogen, LH surge (ovulation Day 14), and Progesterone (corpus luteum lining maintenance)"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-bio-cell-structure", "skill-sss-mendelian-dna-ecosystems"],
        lesson: {
          id: "les-sss-biology-reproduction",
          title: "Reproduction, Development & Reproductive Health",
          hookAndIntuition:
            "Without meiosis halving chromosomes from 46 to 23 inside sperm and eggs, human chromosome count would double every generation—and without hormonal feedback loops, pregnancy could never sustain a growing embryo.",
          conceptualExplanation:
            "Asexual MITOSIS produces two genetically identical diploid (2n) daughter cells for growth and tissue repair. Sexual MEIOSIS halves chromosome count across two divisions (2n → four genetically unique haploid n gametes) via crossing over (Prophase I) and independent assortment—restoring 2n cleanly when sperm fertilizes egg into a zygote.\n\nIn flowering plants (angiosperms), pollen lands on the stigma, grows a pollen tube down the style to the ovule micropyle, and performs DOUBLE FERTILIZATION: one sperm nucleus fuses with the egg (→ 2n zygote/embryo), while the second fuses with two polar nuclei (→ 3n endosperm food store); the ovary wall swells into the fruit. In human reproduction, the 28-day menstrual cycle runs on pituitary-ovarian feedback: pituitary FSH matures a follicle which secretes ESTROGEN to rebuild the uterine lining; peaking estrogen triggers an LH SURGE causing ovulation (~Day 14); the remaining corpus luteum secretes PROGESTERONE to thicken and maintain the endometrium. During pregnancy, the PLACENTA mediates nutrient/O₂/urea diffusion across thin membranes WITHOUT mixing maternal and fetal blood directly. Responsible reproductive health prevents STIs (HIV, syphilis, chlamydia) via barrier protection, screening, and prompt clinical care.",
          conceptualModel:
            "Mitosis: 2n→2×2n | Meiosis: 2n→4×n (varied) | Plant Double Fert: Egg(n)+Sperm(n)=2n Zygote, 2 Polar+Sperm=3n Endosperm | Hormones: FSH→Estrogen→LH Surge (Ovulation)→Progesterone.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Mitosis vs Meiosis Contrast",
              definition: "Mitosis = 1 division, 2 identical 2n cells; Meiosis = 2 divisions, 4 unique haploid (n) gametes with crossing over.",
              practicalExample: "Human skin cells (2n = 46) divide by mitosis; testis/ovary gametes carry n = 23 chromosomes."
            },
            {
              termOrSymbol: "Menstrual Hormone Cascade (Day 1 → Day 28)",
              definition: "FSH grows follicle → Estrogen repairs lining & triggers LH → LH triggers ovulation (Day 14) → Progesterone sustains lining.",
              practicalExample: "If no fertilization occurs, corpus luteum breaks down, progesterone drops, and menstruation sheds the lining."
            },
            {
              termOrSymbol: "Placental Selective Exchange (No Blood Mixing)",
              definition: "O₂, glucose, amino acids, and maternal antibodies diffuse into fetal villi; fetal CO₂ and urea diffuse back into maternal blood.",
              practicalExample: "Separate capillaries prevent fetal blood pressure or incompatible ABO blood groups from colliding."
            }
          ],
          workedExamples: [
            {
              title: "Tracing Angiosperm Double Fertilization & Post-Fertilization Fate",
              problemStatement: "A maize flower has diploid somatic count 2n = 20. Determine the chromosome counts inside its (a) pollen grain generative nucleus, (b) fertilized zygote, and (c) starchy endosperm, and state what the ovary and ovule become.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Halve diploid 2n = 20 via meiosis for pollen and egg nuclei.",
                  reasoning: "Haploid gamete count n = 20 / 2 = 10 chromosomes inside each sperm nucleus and egg."
                },
                {
                  stepNumber: 2,
                  instruction: "Compute zygote chromosome count from Egg (n) + Sperm 1 (n).",
                  reasoning: "2n zygote = 10 + 10 = 20 chromosomes."
                },
                {
                  stepNumber: 3,
                  instruction: "Compute triploid endosperm from two polar nuclei (n + n) + Sperm 2 (n).",
                  reasoning: "3n endosperm = 10 + 10 + 10 = 30 chromosomes."
                },
                {
                  stepNumber: 4,
                  instruction: "Match flower structures to post-fertilization organs.",
                  reasoning: "Ovule develops into the seed (housing embryo + endosperm); swollen Ovary becomes the fruit/grain wall."
                }
              ],
              takeawayRule: "In angiosperms: Ovule → Seed, Ovary → Fruit, Egg+Sperm → 2n Embryo, and Polar+Sperm → 3n Endosperm."
            },
            {
              title: "Explaining Progesterone Drop & Hormonal Contraception Logic",
              problemStatement: "How does a combined estrogen-progesterone pill prevent ovulation, and why do progesterone levels stay high throughout pregnancy?",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Identify negative feedback from high estrogen/progesterone onto the pituitary gland.",
                  reasoning: "Elevated circulating estrogen/progesterone suppresses pituitary secretion of FSH and prevents the mid-cycle LH surge."
                },
                {
                  stepNumber: 2,
                  instruction: "Connect missing FSH and LH surge to follicle arrest.",
                  reasoning: "Without FSH and the Day-14 LH spike, no egg matures or ruptures from the ovary."
                },
                {
                  stepNumber: 3,
                  instruction: "Explain early pregnancy corpus luteum maintenance.",
                  reasoning: "An implanted embryo secretes hCG to keep the corpus luteum releasing progesterone until the placenta takes over."
                },
                {
                  stepNumber: 4,
                  instruction: "Explain what happens if progesterone crashes.",
                  reasoning: "Sustained progesterone keeps the vascular endometrium thick and prevents premature uterine contractions."
                }
              ],
              takeawayRule: "Surge LH triggers ovulation; sustained Progesterone inhibits FSH/LH while locking the uterine lining in place."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Saying maternal and fetal blood flow directly into one shared bloodstream inside the placenta.",
              whyItIsWrong: "Mother and fetus can have incompatible blood types (e.g., Type O mother, Type A fetus) and different blood pressures.",
              correctCorrection: "Maternal and fetal vessels stay strictly separated by thin placental villus membranes across which molecules diffuse."
            },
            {
              misconception: "Mixing up which flower organ turns into the fruit vs the seed.",
              whyItIsWrong: "An apple/mango can contain dozens of seeds inside one fruit.",
              correctCorrection: "Each fertilized OVULE becomes a seed; the surrounding OVARY becomes the fruit."
            }
          ],
          guidedPracticePrompt: "Explain two biological mechanisms by which meiosis generates genetic variation in offspring.",
          independentPracticePrompt: "Contrast wind-pollinated grass flowers vs insect-pollinated hibiscus flowers across petal color, anther position, and pollen texture.",
          extensionActivity: "Sketch hormone curves (FSH, LH, Estrogen, Progesterone) across Days 1–28 marking menstruation (1–5) and ovulation (14).",
          diagnosticSelfCheck: "Where in the female reproductive tract does normal human fertilization take place?",
          transferApplication: "Explain why pregnant mothers avoid tobacco smoke, alcohol, and unprescribed drugs (small toxins cross the placental barrier).",
          masteryAssessment: "A plant species has 2n = 14. Find chromosome counts of its leaf cell, egg cell, and triploid endosperm.",
          summaryRecap: "Meiosis produces varied n gametes, plant double fertilization builds 2n zygote + 3n endosperm, LH triggers ovulation, progesterone guards the lining, and the placenta exchanges without mixing blood.",
          estimatedMinutes: 95
        },
        questions: [
          {
            id: "q-sss-rep-1",
            type: "multiple_choice",
            questionText: "Which comparison accurately contrasts somatic MITOSIS against gamete-producing MEIOSIS in a diploid organism (2n = 46)?",
            mathExpression: "\\text{Mitosis vs Meiosis}",
            options: [
              "Mitosis yields 2 genetically identical 46-chromosome cells; meiosis yields 4 genetically varied 23-chromosome gametes",
              "Mitosis halves chromosomes to 23; meiosis doubles chromosomes to 92",
              "Both mitosis and meiosis produce 4 identical diploid daughter cells",
              "Crossing over occurs exclusively during mitosis in skin cells"
            ],
            correctAnswer: "Mitosis yields 2 genetically identical 46-chromosome cells; meiosis yields 4 genetically varied 23-chromosome gametes",
            explanation: "Mitosis maintains diploid chromosome count (46 → 46) across 1 division for growth/repair; meiosis executes 2 divisions with crossing over to halve count (46 → 23) for sexual reproduction.",
            hintLadder: [
              "Think what your skin needs when healing a cut (identical 46-chromosome clones).",
              "Sperm and egg need HALF (23) so fertilization restores 23 + 23 = 46.",
              "Meiosis runs two divisions to produce 4 haploid cells."
            ],
            misconceptionAlerts: [
              { trigger: "Mitosis halves chromosomes to 23; meiosis doubles chromosomes to 92", note: "Meiosis (reduction division) is what halves 2n → n." }
            ],
            skillId: "skill-sss-biology-reproduction",
            difficulty: "easy"
          },
          {
            id: "q-sss-rep-2",
            type: "multiple_choice",
            questionText: "After successful pollination and fertilization inside a flowering plant (angiosperm), what do the OVULE and the OVARY respectively develop into?",
            mathExpression: "\\text{Ovule} \\to ?,\\quad \\text{Ovary} \\to ?",
            options: [
              "Ovule → Seed; Ovary → Fruit",
              "Ovule → Fruit; Ovary → Seed",
              "Ovule → Petal; Ovary → Pollen grain",
              "Ovule → Stigma; Ovary → Root radicle"
            ],
            correctAnswer: "Ovule → Seed; Ovary → Fruit",
            explanation: "Each fertilized ovule matures into a seed containing the embryo and food reserve, while the enclosing ovary wall swells into the protective fruit.",
            hintLadder: [
              "Inside a pawpaw or orange fruit sit multiple seeds.",
              "Many small structures sit inside one outer casing.",
              "Ovules (inside) → seeds; Ovary (outer wall) → fruit."
            ],
            misconceptionAlerts: [
              { trigger: "Ovule → Fruit; Ovary → Seed", note: "Remember seeds lie inside the fruit just as ovules sit inside the ovary." }
            ],
            skillId: "skill-sss-biology-reproduction",
            difficulty: "easy"
          },
          {
            id: "q-sss-rep-3",
            type: "multiple_choice",
            questionText: "In the human 28-day menstrual cycle, a sharp mid-cycle surge of which pituitary hormone directly triggers OVULATION (release of the mature egg around Day 14)?",
            mathExpression: "\\text{Day 14 Pituitary Spike} \\longrightarrow \\text{Ovulation}",
            options: [
              "Luteinizing Hormone (LH)",
              "Progesterone",
              "Thyroxine",
              "Insulin"
            ],
            correctAnswer: "Luteinizing Hormone (LH)",
            explanation: "Rising estrogen from the mature follicle triggers a sharp pituitary surge of LH around Day 14, bursting the follicle to release the egg.",
            hintLadder: [
              "Progesterone rises AFTER ovulation (Days 15–28) to keep the uterus lining ready.",
              "Rising estrogen triggers a rapid spike of a pituitary gonadotropin.",
              "The mid-cycle LH surge causes follicle rupture (ovulation)."
            ],
            misconceptionAlerts: [
              { trigger: "Progesterone", note: "Progesterone suppresses LH and maintains the uterine lining after ovulation." }
            ],
            skillId: "skill-sss-biology-reproduction",
            difficulty: "medium"
          },
          {
            id: "q-sss-rep-4",
            type: "multiple_choice",
            questionText: "During human pregnancy, how are maternal and fetal bloodstreams arranged inside the placenta?",
            mathExpression: "\\text{Placental Barrier: Selective Diffusion}",
            options: [
              "They stay strictly separate across thin capillary membranes so O₂, nutrients, and wastes diffuse without blood cells mixing",
              "Maternal arteries connect directly into fetal veins so identical blood circulates through both hearts",
              "Only oxygen enters the fetus, while fetal urea stays stored inside the umbilical cord until birth",
              "Maternal red blood cells swim across the umbilical cord to carry fetal carbon dioxide back"
            ],
            correctAnswer: "They stay strictly separate across thin capillary membranes so O₂, nutrients, and wastes diffuse without blood cells mixing",
            explanation: "Separated capillary beds prevent fatal blood-group agglutination and high-pressure maternal rupture while allowing rapid diffusion of O₂, glucose, amino acids, antibodies, CO₂, and urea.",
            hintLadder: [
              "Consider why a Type O mother can safely carry a Type B fetus.",
              "Direct blood mixing would cause immune clumping!",
              "Thin villus walls allow selective molecular diffusion while keeping blood cells separated."
            ],
            misconceptionAlerts: [
              { trigger: "Maternal arteries connect directly into fetal veins so identical blood circulates through both hearts", note: "Direct vessel connection would expose fragile fetal vessels to adult arterial blood pressure and ABO agglutination." }
            ],
            skillId: "skill-sss-biology-reproduction",
            difficulty: "medium"
          },
          {
            id: "q-sss-rep-5",
            type: "multiple_choice",
            questionText: "A tomato plant has diploid chromosome number 2n = 24. During angiosperm double fertilization, what are the exact chromosome counts in (1) the embryo zygote cell and (2) a triploid endosperm food-storage cell?",
            mathExpression: "\\text{Zygote } (n+n),\\quad \\text{Endosperm } (n+n+n)",
            options: [
              "Zygote = 24 chromosomes; Endosperm = 36 chromosomes",
              "Zygote = 12 chromosomes; Endosperm = 24 chromosomes",
              "Zygote = 24 chromosomes; Endosperm = 24 chromosomes",
              "Zygote = 48 chromosomes; Endosperm = 36 chromosomes"
            ],
            correctAnswer: "Zygote = 24 chromosomes; Endosperm = 36 chromosomes",
            explanation: "Haploid gamete n = 24/2 = 12. First sperm (12) + Egg (12) → 2n zygote = 24. Second sperm (12) + two polar nuclei (12 + 12) → 3n endosperm = 36.",
            hintLadder: [
              "Find haploid n = 24 ÷ 2 = 12 chromosomes.",
              "Zygote fuses 1 sperm + 1 egg (2n = 2 × 12 = 24).",
              "Endosperm fuses 1 sperm + 2 polar nuclei (3n = 3 × 12 = 36)."
            ],
            misconceptionAlerts: [
              { trigger: "Zygote = 24 chromosomes; Endosperm = 24 chromosomes", note: "Double fertilization merges the second sperm with TWO polar nuclei, producing triploid 3n = 36." }
            ],
            skillId: "skill-sss-biology-reproduction",
            difficulty: "hard"
          }
        ]
      }
    ]
  }
];
