/**
 * MOOS TECHY ACADEMY — ECONOMICS FLAGSHIP CURRICULUM UNITS
 * 
 * Comprehensive secondary and tertiary introductory economics covering:
 * - Scarcity, Choice & Opportunity Cost
 * - Demand, Supply & Market Equilibrium
 * - Price Elasticity of Demand & Supply
 * - Market Structures (Perfect Competition, Monopoly, Oligopoly)
 * - Macroeconomic Indicators: GDP, Inflation & Unemployment
 * - Fiscal & Monetary Policy in the Nigerian Economic Context
 */

import { Unit } from "../types/curriculum";

export const ECONOMICS_CURRICULUM_UNITS: Unit[] = [
  {
    id: "unit-econ-scarcity-choice",
    subjectId: "comm_financial_lit",
    level: "senior_secondary",
    title: "Foundations of Economics: Scarcity, Choice & Opportunity Cost",
    code: "ECN-UNIT-01",
    description: "The fundamental economic problem of unlimited human wants versus finite resources, production possibility curves, and rational decision-making.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-econ-scarcity-ppc",
        unitId: "unit-econ-scarcity-choice",
        title: "Scarcity & Production Possibility Frontiers (PPF)",
        code: "SKL-ECN-101",
        summary: "Analyzing opportunity cost graphically using the Production Possibility Frontier (PPF).",
        objectives: [
          "Define scarcity, choice, and opportunity cost in personal, enterprise, and governmental decision-making",
          "Construct and interpret a concave Production Possibility Frontier (PPF)",
          "Distinguish points inside the PPF (inefficiency), on the PPF (productive efficiency), and outside the PPF (scarcity)"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-econ-scarcity-ppc",
          title: "Scarcity & Production Possibility Frontiers",
          hookAndIntuition: "Imagine Nigeria's national budget: spending ₦2 Trillion on national highway infrastructure means that same ₦2 Trillion cannot simultaneously be used to build 1,000 community healthcare clinics. That forgone alternative is the opportunity cost.",
          conceptualExplanation: "The fundamental economic problem arises because resources (land, labor, capital, enterprise) are scarce while human wants are virtually limitless. Economics is the study of how societies allocate scarce resources. The Production Possibility Frontier (PPF) graphically demonstrates the maximum combination of two goods an economy can produce when all resources are fully and efficiently employed.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Opportunity Cost",
              definition: "The next best alternative forgone when a choice is made.",
              practicalExample: "A student choosing to study for 2 hours gives up 2 hours of leisure or paid part-time work."
            },
            {
              termOrSymbol: "Law of Increasing Opportunity Cost",
              definition: "As production of one good increases, the opportunity cost of producing additional units rises because resources are not perfectly adaptable to alternative uses.",
              practicalExample: "Why the PPF curve is bowed outward (concave to the origin)."
            }
          ],
          workedExamples: [
            {
              title: "Calculating Marginal Opportunity Cost from a PPF Schedule",
              problemStatement: "An agrarian state produces Cocoa (metric tons) and Rice (metric tons). Point A: (0 Cocoa, 500 Rice); Point B: (100 Cocoa, 450 Rice); Point C: (200 Cocoa, 350 Rice). What is the opportunity cost of producing the first 100 metric tons of Cocoa, and what is the marginal cost for the next 100 metric tons?",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Calculate change from Point A to Point B",
                  reasoning: "Moving from 0 to 100 Cocoa causes Rice production to fall from 500 to 450. Opportunity cost = 500 - 450 = 50 metric tons of Rice."
                },
                {
                  stepNumber: 2,
                  instruction: "Calculate change from Point B to Point C",
                  reasoning: "Moving from 100 to 200 Cocoa causes Rice production to drop from 450 to 350. Opportunity cost = 450 - 350 = 100 metric tons of Rice."
                },
                {
                  stepNumber: 3,
                  instruction: "Analyze the trend in marginal opportunity cost",
                  reasoning: "As Cocoa production expands by equal increments of 100, the sacrificed Rice rises from 50 to 100. This confirms the Law of Increasing Opportunity Cost."
                }
              ],
              takeawayRule: "Marginal Opportunity Cost = |Δ Sacrificed Good| / Δ Gained Good. An increasing ratio generates a concave PPF curve."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Confusing monetary expense with economic opportunity cost",
              whyItIsWrong: "Opportunity cost includes the real value of forgone alternatives (such as forgone time, wages, or secondary utility), not merely financial cash outflows.",
              correctCorrection: "Always evaluate what alternative value was sacrificed to take the selected action."
            }
          ],
          guidedPracticePrompt: "If an economy experiences technological improvement that only increases Rice harvesting efficiency without affecting Cocoa, how does the PPF curve pivot?",
          diagnosticSelfCheck: "Can you identify which point represents high unemployment or underutilized capital on a PPF diagram?",
          summaryRecap: "Scarcity necessitates choice, every choice entails an opportunity cost, and the PPF graphically proves trade-offs and productive efficiency."
        },
        questions: [
          {
            id: "q-econ-sc-1",
            type: "multiple_choice",
            questionText: "Which economic condition is illustrated by a point lying strictly INSIDE a nation's Production Possibility Frontier (PPF)?",
            options: [
              "Productive efficiency with zero waste",
              "Underemployment of labor or underutilized productive capital",
              "Unattainable production with current technology",
              "Hyper-specialization in international trade"
            ],
            correctAnswer: "Underemployment of labor or underutilized productive capital",
            explanation: "Points on the boundary represent productive efficiency. Points inside the curve indicate inefficient resource allocation or idle productive capacity (unemployment).",
            hintLadder: [
              "Consider what happens when factories operate below full capacity or workers are unemployed.",
              "Points on the curve mean all resources are fully utilized.",
              "Points inside mean the economy could produce more of both goods without extra resources."
            ],
            misconceptionAlerts: [
              { trigger: "Unattainable production with current technology", note: "Points OUTSIDE the PPF are unattainable with current resources. Points INSIDE are attainable but inefficient." }
            ],
            skillId: "skill-econ-scarcity-ppc",
            difficulty: "easy"
          },
          {
            id: "q-econ-sc-2",
            type: "multiple_choice",
            questionText: "A baker produces meat pies and sausage rolls. In moving production from 50 to 70 meat pies, production of sausage rolls drops from 120 to 90. What is the opportunity cost per additional meat pie produced?",
            mathExpression: "\\text{Marginal Opportunity Cost} = \\frac{\\Delta \\text{Sausage Rolls}}{\\Delta \\text{Meat Pies}} = \\frac{30}{20}",
            options: ["1.5 sausage rolls", "0.67 sausage rolls", "30 sausage rolls", "20 meat pies"],
            correctAnswer: "1.5 sausage rolls",
            explanation: "Opportunity cost = (120 - 90) / (70 - 50) = 30 sausage rolls / 20 meat pies = 1.5 sausage rolls sacrificed per additional meat pie.",
            hintLadder: [
              "Find the total number of sausage rolls sacrificed: 120 - 90 = 30.",
              "Find the total number of meat pies gained: 70 - 50 = 20.",
              "Divide sacrificed quantity by gained quantity: 30 / 20 = 1.5."
            ],
            misconceptionAlerts: [
              { trigger: "30 sausage rolls", note: "30 is the TOTAL opportunity cost for all 20 pies, but the question asks for the cost PER ADDITIONAL meat pie (30/20 = 1.5)." }
            ],
            skillId: "skill-econ-scarcity-ppc",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-econ-demand-supply",
    subjectId: "comm_financial_lit",
    level: "senior_secondary",
    title: "Market Mechanics: Demand, Supply & Price Equilibrium",
    code: "ECN-UNIT-02",
    description: "The law of demand, law of supply, market equilibrium price determination, shifts versus movements along curves, and price controls.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-econ-equilibrium-shifts",
        unitId: "unit-econ-demand-supply",
        title: "Market Equilibrium & Curve Shift Dynamics",
        code: "SKL-ECN-102",
        summary: "Solving for market clearing equilibrium price and quantity algebraically and analyzing shift drivers.",
        objectives: [
          "State and apply the Law of Demand and the Law of Supply",
          "Distinguish a change in quantity demanded (movement along curve) from a change in demand (shift of curve)",
          "Solve for equilibrium price (Pe) and equilibrium quantity (Qe) using simultaneous demand and supply equations"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-econ-equilibrium",
          title: "Market Equilibrium & Curve Shifts",
          hookAndIntuition: "Why does the price of fresh tomatoes in Lagos skyrocket during rainy season transport disruptions? Because transport bottlenecks reduce supply (shifting the curve leftward), creating a shortage at the old price and forcing market clearing price upward.",
          conceptualExplanation: "Market equilibrium occurs at the intersection of demand and supply where Quantity Demanded (Qd) equals Quantity Supplied (Qs). At this price, the market clears with neither surplus nor shortage. A price set above equilibrium creates excess supply (surplus), while a price set below equilibrium causes excess demand (shortage).",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Equilibrium Condition",
              definition: "Qd(P) = Qs(P)",
              practicalExample: "Equating Qd = 100 - 2P and Qs = 20 + 3P to solve for equilibrium price P*."
            },
            {
              termOrSymbol: "Non-Price Determinants of Demand",
              definition: "Income, consumer preferences, prices of related goods (substitutes & complements), population, and expectations.",
              practicalExample: "An increase in consumer income shifts the demand curve for normal goods to the right."
            }
          ],
          workedExamples: [
            {
              title: "Calculating Market Clearing Equilibrium Price and Quantity",
              problemStatement: "In a local market, demand is given by Qd = 180 - 4P and supply is given by Qs = 30 + 6P, where P is in Naira (₦) and Q is in kilograms. Find equilibrium price P* and equilibrium quantity Q*.",
              mathExpression: "Q_d = 180 - 4P, \\quad Q_s = 30 + 6P",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Set Qd equal to Qs to establish equilibrium condition",
                  reasoning: "180 - 4P = 30 + 6P"
                },
                {
                  stepNumber: 2,
                  instruction: "Group like terms to solve for price P",
                  reasoning: "180 - 30 = 6P + 4P => 150 = 10P => P = ₦15."
                },
                {
                  stepNumber: 3,
                  instruction: "Substitute P = 15 into either demand or supply function to solve for Q",
                  reasoning: "Qd = 180 - 4(15) = 180 - 60 = 120 kg. Check in Qs: 30 + 6(15) = 30 + 90 = 120 kg. Both match."
                }
              ],
              takeawayRule: "At equilibrium, Qd = Qs. Solving gives the unique market clearing price P* and volume Q*."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Saying 'demand increased' when only price changed",
              whyItIsWrong: "A change in the good's own price causes a MOVEMENT ALONG the demand curve (change in quantity demanded). Only non-price factors cause a SHIFT of the entire curve.",
              correctCorrection: "Use 'change in quantity demanded' for price movements, and 'shift in demand' for external factors."
            }
          ],
          guidedPracticePrompt: "If the government imposes an effective maximum price (price ceiling) below ₦15, what will happen in this market?",
          diagnosticSelfCheck: "Can you predict the effect of a simultaneous increase in demand and decrease in supply on equilibrium price?",
          summaryRecap: "Equilibrium balances buyers and sellers. Non-price shifters shift entire curves, whereas price adjustments clear shortages or surpluses."
        },
        questions: [
          {
            id: "q-econ-eq-1",
            type: "multiple_choice",
            questionText: "The market demand for grain is Qd = 240 - 5P and supply is Qs = 40 + 5P. What is the equilibrium price?",
            mathExpression: "240 - 5P = 40 + 5P \\implies 10P = 200 \\implies P = 20",
            options: ["₦20", "₦15", "₦25", "₦24"],
            correctAnswer: "₦20",
            explanation: "Set Qd = Qs: 240 - 5P = 40 + 5P -> 10P = 200 -> P = ₦20. (Q* = 240 - 5(20) = 140 units).",
            hintLadder: [
              "Equate the two functions: 240 - 5P = 40 + 5P.",
              "Collect P terms on one side: 240 - 40 = 5P + 5P.",
              "200 = 10P, so P = 20."
            ],
            misconceptionAlerts: [
              { trigger: "₦24", note: "Did you divide 240 by 10 without subtracting the supply intercept 40?" }
            ],
            skillId: "skill-econ-equilibrium-shifts",
            difficulty: "medium"
          },
          {
            id: "q-econ-eq-2",
            type: "multiple_choice",
            questionText: "If the price of tea rises substantially, what is the expected market response in the market for coffee (a close substitute)?",
            options: [
              "The demand curve for coffee shifts to the right, increasing both its equilibrium price and quantity",
              "The supply curve of coffee shifts to the right",
              "The demand curve for coffee shifts to the left",
              "There is a movement downward along the coffee demand curve"
            ],
            correctAnswer: "The demand curve for coffee shifts to the right, increasing both its equilibrium price and quantity",
            explanation: "Substitutes have positive cross-price elasticity. As tea becomes more expensive, consumers switch to coffee, shifting coffee demand rightward.",
            hintLadder: [
              "Identify the relationship: tea and coffee are substitute goods.",
              "When one substitute becomes expensive, demand for the alternative rises.",
              "A rightward shift in demand drives equilibrium price and quantity up."
            ],
            misconceptionAlerts: [
              { trigger: "The demand curve for coffee shifts to the left", note: "Substitutes move in the same direction: higher tea price causes higher coffee demand." }
            ],
            skillId: "skill-econ-equilibrium-shifts",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-econ-macro-policy",
    subjectId: "comm_financial_lit",
    level: "senior_secondary",
    title: "Macroeconomics: GDP, Inflation & Monetary Policy",
    code: "ECN-UNIT-03",
    description: "National income accounting, Gross Domestic Product (GDP), inflation types and indices, unemployment, and Central Bank monetary policy instruments.",
    order: 3,
    category: "core",
    skills: [
      {
        id: "skill-econ-gdp-inflation-cbn",
        unitId: "unit-econ-macro-policy",
        title: "National Income, Inflation & Monetary Policy",
        code: "SKL-ECN-103",
        summary: "Measuring GDP, calculating inflation indices, and evaluating Central Bank monetary tightening.",
        objectives: [
          "Calculate GDP using the expenditure approach: Y = C + I + G + (X - M)",
          "Distinguish Nominal GDP from Real GDP using the GDP deflator or Consumer Price Index (CPI)",
          "Explain how the Central Bank of Nigeria (CBN) uses the Monetary Policy Rate (MPR) and Cash Reserve Ratio (CRR) to combat inflation"
        ],
        difficulty: "advanced",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-econ-macro-policy",
          title: "GDP, Inflation & Monetary Policy Instruments",
          hookAndIntuition: "If everyone in an economy had their salary doubled overnight, would the country be twice as wealthy? No, because if the total output of actual goods and services has not increased, prices simply double. This is why economists measure Real GDP rather than Nominal GDP.",
          conceptualExplanation: "Gross Domestic Product (GDP) is the total monetary value of all final goods and services produced within a country in a given period. Real GDP adjusts for inflation to measure actual physical output growth. When excessive aggregate demand or supply shocks drive rapid inflation, the central bank implements contractionary monetary policy (raising interest rates and reserve requirements) to stabilize prices.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "Expenditure Approach to GDP",
              definition: "Y = C + I + G + (X - M)",
              practicalExample: "Consumption + Investment + Government Expenditure + Net Exports."
            },
            {
              termOrSymbol: "Real GDP Formula",
              definition: "\\text{Real GDP} = \\frac{\\text{Nominal GDP}}{\\text{Price Index}} \\times 100",
              practicalExample: "Deflating nominal figures to a constant base year."
            },
            {
              termOrSymbol: "Monetary Policy Rate (MPR)",
              definition: "The benchmark interest rate set by the Central Bank of Nigeria (CBN) Monetary Policy Committee (MPC).",
              practicalExample: "Raising MPR increases commercial borrowing costs, cooling consumer spending and credit expansion."
            }
          ],
          workedExamples: [
            {
              title: "Calculating Real GDP and Output Growth Rate",
              problemStatement: "In Year 1 (Base Year), Nominal GDP is ₦80 Trillion and Price Index is 100. In Year 2, Nominal GDP rises to ₦99 Trillion while the Price Index rises to 110. Calculate Real GDP for Year 2 and determine the genuine rate of physical output growth.",
              mathExpression: "\\text{Real GDP}_2 = \\frac{99}{110} \\times 100 = 90 \\text{ Trillion}",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Calculate Real GDP for Year 2",
                  reasoning: "Real GDP_2 = (Nominal GDP / CPI) × 100 = (₦99 Trillion / 110) × 100 = ₦90 Trillion."
                },
                {
                  stepNumber: 2,
                  instruction: "Compare Year 2 Real GDP to Year 1 Real GDP",
                  reasoning: "Year 1 Real GDP = ₦80 Trillion. Real growth = (90 - 80) / 80 = 10 / 80 = 12.5%."
                },
                {
                  stepNumber: 3,
                  instruction: "Contrast with Nominal Growth",
                  reasoning: "Nominal growth appeared to be (99 - 80) / 80 = 23.75%, but 11.25% of that was pure price inflation, leaving real economic growth at 12.5%."
                }
              ],
              takeawayRule: "Real GDP strips away the illusion of price inflation to reveal genuine changes in physical productive capacity."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Believing that rising Nominal GDP automatically means citizens have more goods and services",
              whyItIsWrong: "If price levels rise faster than output, Real GDP per capita can actually decline even while Nominal GDP increases.",
              correctCorrection: "Always evaluate Real GDP per capita to assess true standard of living changes."
            }
          ],
          guidedPracticePrompt: "When the CBN raises the Cash Reserve Ratio (CRR) from 32.5% to 45%, what direct effect does this have on commercial banks' lending ability?",
          diagnosticSelfCheck: "Can you list the 4 components of aggregate expenditure and identify whether imports add or subtract from national income?",
          summaryRecap: "Macroeconomics monitors national prosperity through GDP, CPI, and unemployment, employing monetary and fiscal levers to balance growth with price stability."
        },
        questions: [
          {
            id: "q-econ-mac-1",
            type: "multiple_choice",
            questionText: "An economy reports: Consumer Spending (C) = ₦50T, Investment (I) = ₦15T, Government Spending (G) = ₦20T, Exports (X) = ₦12T, and Imports (M) = ₦14T. What is the Gross Domestic Product (GDP)?",
            mathExpression: "Y = C + I + G + (X - M) = 50 + 15 + 20 + (12 - 14)",
            options: ["₦83 Trillion", "₦87 Trillion", "₦85 Trillion", "₦97 Trillion"],
            correctAnswer: "₦83 Trillion",
            explanation: "Y = 50 + 15 + 20 + (12 - 14) = 85 + (-2) = ₦83 Trillion.",
            hintLadder: [
              "Use GDP formula Y = C + I + G + (X - M).",
              "Compute net exports: X - M = 12 - 14 = -2 (trade deficit).",
              "Sum C + I + G + Net Exports: 50 + 15 + 20 - 2 = 83 Trillion."
            ],
            misconceptionAlerts: [
              { trigger: "₦87 Trillion", note: "Did you add imports instead of subtracting them? Imports must be subtracted because they represent spending on foreign output." }
            ],
            skillId: "skill-econ-gdp-inflation-cbn",
            difficulty: "medium"
          },
          {
            id: "q-econ-mac-2",
            type: "multiple_choice",
            questionText: "When the Central Bank of Nigeria (CBN) raises the benchmark Monetary Policy Rate (MPR) to curb surging inflation, what is the direct transmission mechanism?",
            options: [
              "Commercial bank lending interest rates rise, borrowing becomes more expensive, and consumer/investment credit spending contracts",
              "Government tax revenue automatically increases across all commercial sectors",
              "The national currency supply doubles immediately in circulation",
              "Commercial banks are mandated to lower interest rates on all consumer mortgages"
            ],
            correctAnswer: "Commercial bank lending interest rates rise, borrowing becomes more expensive, and consumer/investment credit spending contracts",
            explanation: "A higher MPR raises the cost of funds for commercial banks, leading to higher loan interest rates. This dampens aggregate borrowing and spending, curbing demand-pull inflationary pressure.",
            hintLadder: [
              "MPR is the rate at which the central bank lends to commercial banks.",
              "When banks pay higher rates, they pass that cost to retail borrowers.",
              "Higher borrowing costs reduce aggregate spending."
            ],
            misconceptionAlerts: [
              { trigger: "Government tax revenue automatically increases across all commercial sectors", note: "Taxes are fiscal policy managed by the Ministry of Finance, not monetary policy by the Central Bank." }
            ],
            skillId: "skill-econ-gdp-inflation-cbn",
            difficulty: "medium"
          }
        ]
      }
    ]
  }
];
