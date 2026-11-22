/**
 * MOOS TECHY ACADEMY — FINANCIAL LITERACY FLAGSHIP CURRICULUM UNITS
 * 
 * Substantive learner pathways covering:
 * - Budgeting, Cash Flow & Needs vs. Wants (50/30/20 Rule)
 * - Compound Interest, Borrowing Costs & Debt Awareness
 * - Emergency Funds, Risk Management & Insurance
 * - Digital Financial Safety, Fraud Prevention & Entrepreneurship
 */

import { Unit } from "../types/curriculum";

export const FINANCIAL_LITERACY_CURRICULUM_UNITS: Unit[] = [
  {
    id: "unit-fin-budgeting-cashflow",
    subjectId: "comm_financial_lit",
    level: "senior_secondary",
    title: "Personal Budgeting, Cash Flow & The 50/30/20 Rule",
    code: "FIN-UNIT-02",
    description: "Income versus expenses, tracking discretionary cash flows, distinguishing essential needs from discretionary wants, and automated savings systems.",
    order: 2,
    category: "core",
    skills: [
      {
        id: "skill-fin-50-30-20-budgeting",
        unitId: "unit-fin-budgeting-cashflow",
        title: "Cash Flow Allocation & The 50/30/20 Budgeting Rule",
        code: "SKL-FIN-202",
        summary: "Applying the 50/30/20 framework to allocate net take-home income between Needs, Wants, and Savings.",
        objectives: [
          "Distinguish inelastic essential needs (housing, food, healthcare) from discretionary wants (entertainment, luxury upgrades)",
          "Construct a monthly balanced cash flow statement showing income, expenses, and net surplus/deficit",
          "Apply the 50/30/20 budgeting rule (50% Needs, 30% Wants, 20% Savings/Debt Payoff) to real-world scenarios"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-fin-50-30-20",
          title: "Personal Cash Flow & 50/30/20 Budget Allocation",
          hookAndIntuition: "If a young graduate earns ₦250,000 net monthly, but spends ₦100,000 on dining out and designer clothes while having zero savings for emergencies, a single unexpected medical bill can push them into predatory debt. A budget gives money direction before the month begins.",
          conceptualExplanation: "Budgeting is the proactive allocation of expected income across life necessities, personal aspirations, and future security. The 50/30/20 rule divides net take-home pay: up to 50% for absolute Needs (rent, basic groceries, transport, utilities), up to 30% for Wants (leisure, hobbies, lifestyle), and at least 20% for Savings, Emergency Reserves, and Debt Elimination.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "50/30/20 Allocation",
              definition: "\\text{Needs} \\le 0.50 \\times \\text{Net Income}, \\quad \\text{Wants} \\le 0.30 \\times \\text{Net Income}, \\quad \\text{Savings} \\ge 0.20 \\times \\text{Net Income}",
              practicalExample: "On ₦200,000 net pay: ₦100,000 for Needs, ₦60,000 for Wants, ₦40,000 for Savings."
            },
            {
              termOrSymbol: "Emergency Fund",
              definition: "A dedicated liquid savings buffer covering 3 to 6 months of basic living expenses, held in a safe, accessible account.",
              practicalExample: "If monthly essential needs are ₦80,000, the target emergency fund is between ₦240,000 and ₦480,000."
            }
          ],
          workedExamples: [
            {
              title: "Balancing a Budget with Deficit Remediation",
              problemStatement: "A professional earns ₦300,000 net monthly. Current expenditures: Rent & Utilities: ₦110,000; Basic Groceries: ₦45,000; Transport: ₦25,000; Dining & Socializing: ₦80,000; Subscriptions & Gadgets: ₦25,000; Savings: ₦15,000. Analyze whether this adheres to the 50/30/20 rule, and recommend exact adjustments to achieve the 20% savings target.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Categorize expenses into Needs, Wants, and Savings",
                  reasoning: "Needs = 110,000 + 45,000 + 25,000 = ₦180,000 (60% of income). Wants = 80,000 + 25,000 = ₦105,000 (35% of income). Savings = ₦15,000 (5% of income)."
                },
                {
                  stepNumber: 2,
                  instruction: "Evaluate benchmark targets under 50/30/20",
                  reasoning: "Target Needs (50%) = ₦150,000. Target Wants (30%) = ₦90,000. Target Savings (20%) = ₦60,000."
                },
                {
                  stepNumber: 3,
                  instruction: "Formulate corrective reallocations",
                  reasoning: "Needs are currently at 60% (₦180,000) and Wants are at 35% (₦105,000). By trimming dining and subscriptions from ₦105,000 down to ₦60,000 (a reduction of ₦45,000), the savings allocation increases from ₦15,000 to ₦60,000, fulfilling the 20% savings mandate."
                }
              ],
              takeawayRule: "When fixed essential Needs consume more than 50%, discretionary Wants must be trimmed immediately to protect the minimum 20% wealth-building buffer."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Viewing savings as whatever cash happens to be left at the end of the month",
              whyItIsWrong: "Unbudgeted surplus almost always gets absorbed by lifestyle creep. Saving must be treated as a non-negotiable expense ('Pay Yourself First').",
              correctCorrection: "Automate transfers of your 20% savings target on the exact day income is received."
            }
          ],
          guidedPracticePrompt: "Calculate the exact minimum emergency fund for a household with monthly essential needs of ₦140,000.",
          diagnosticSelfCheck: "Which expense is a Need: basic prepaid electricity token or an upgraded 4K streaming package?",
          summaryRecap: "Budgeting empowers financial independence. The 50/30/20 guideline disciplines cash flow, protects liquidity, and builds durable wealth."
        },
        questions: [
          {
            id: "q-fin-bg-1",
            type: "multiple_choice",
            questionText: "Under the standard 50/30/20 budgeting rule, what is the recommended minimum monthly allocation toward savings, emergency reserves, and accelerated debt payoff for an individual with ₦400,000 net income?",
            options: ["₦80,000 (20%)", "₦120,000 (30%)", "₦200,000 (50%)", "₦40,000 (10%)"],
            correctAnswer: "₦80,000 (20%)",
            explanation: "20% of ₦400,000 = 0.20 × 400,000 = ₦80,000.",
            hintLadder: [
              "Recall the percentages: 50% Needs, 30% Wants, 20% Savings.",
              "Multiply net income by 0.20.",
              "400,000 × 0.20 = 80,000."
            ],
            misconceptionAlerts: [
              { trigger: "₦120,000 (30%)", note: "30% is the maximum recommended cap for discretionary Wants, not the minimum for Savings." }
            ],
            skillId: "skill-fin-50-30-20-budgeting",
            difficulty: "easy"
          },
          {
            id: "q-fin-bg-2",
            type: "multiple_choice",
            questionText: "Why is an Emergency Fund of 3 to 6 months of essential living expenses critical before undertaking high-risk investment ventures?",
            options: [
              "It prevents the forced liquidation of long-term investments or recourse to high-interest debt during sudden income shocks or medical emergencies",
              "It automatically guarantees a 25% annual return regardless of inflation",
              "It eliminates the need to pay federal or state income taxes",
              "It replaces the need for any health or property insurance coverage"
            ],
            correctAnswer: "It prevents the forced liquidation of long-term investments or recourse to high-interest debt during sudden income shocks or medical emergencies",
            explanation: "Emergency funds provide liquid insurance against unexpected life shocks, preventing individuals from taking on toxic high-interest short-term debt.",
            hintLadder: [
              "Consider what happens if someone loses a job or faces hospital bills.",
              "Without cash reserves, one must borrow or sell assets at a loss.",
              "Liquid reserves preserve long-term financial stability."
            ],
            misconceptionAlerts: [
              { trigger: "It replaces the need for any health or property insurance coverage", note: "Emergency funds cover short-term expenses; catastrophic risks (fires, major surgery) require formal insurance." }
            ],
            skillId: "skill-fin-50-30-20-budgeting",
            difficulty: "medium"
          }
        ]
      }
    ]
  },
  {
    id: "unit-fin-digital-fraud-safety",
    subjectId: "comm_financial_lit",
    level: "senior_secondary",
    title: "Digital Financial Security, Cyber Fraud & Fraud Protection",
    code: "FIN-UNIT-03",
    description: "Protection against phishing, social engineering, SIM-swap attacks, Bank Verification Number (BVN) scams, multi-factor authentication (MFA), and safe digital banking.",
    order: 3,
    category: "core",
    skills: [
      {
        id: "skill-fin-fraud-prevention",
        unitId: "unit-fin-digital-fraud-safety",
        title: "Digital Banking Safety & Financial Fraud Countermeasures",
        code: "SKL-FIN-203",
        summary: "Identifying financial scam vectors (phishing, smishing, Ponzi schemes) and implementing robust multi-factor defense.",
        objectives: [
          "Recognize social engineering tactics designed to extract Bank Verification Numbers (BVN), PINs, and One-Time Passwords (OTPs)",
          "Identify the mathematical impossibility of Ponzi/pyramid schemes offering guaranteed unrealistic returns",
          "Apply security protocols: Multi-Factor Authentication (MFA), biometric locks, and official bank grievance mechanisms"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-fin-fraud-prevention",
          title: "Digital Financial Security & Scam Defense",
          hookAndIntuition: "You receive an urgent SMS: 'Your bank account has been blocked due to BVN discrepancy. Call 080-XXXX immediately or click this link to update your debit card PIN.' This is the classic social engineering vector: creating artificial panic to steal credentials.",
          conceptualExplanation: "As digital banking and mobile payments (USSD, fintech apps, internet banking) expand, financial fraud has shifted from physical theft to digital social engineering. Financial institutions NEVER request customer PINs, CVVs, or OTPs. Furthermore, fraudulent investment schemes (Ponzi schemes) promise guaranteed high returns funded solely by new investor capital, mathematically collapsing when recruitment slows.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "One-Time Password (OTP)",
              definition: "A dynamic secondary authorization token. Sharing an OTP gives an attacker complete control over a transaction.",
              practicalExample: "Banks explicitly state: 'Do not disclose this code to anyone, including bank staff.'"
            },
            {
              termOrSymbol: "Ponzi Scheme Characteristics",
              definition: "Guaranteed high returns with 'zero risk', lack of verifiable underlying business operations, pressure to recruit others.",
              practicalExample: "Schemes promising '30% guaranteed monthly return'—financially impossible over any sustained horizon."
            }
          ],
          workedExamples: [
            {
              title: "Evaluating an Investment Opportunity for Ponzi Risk",
              problemStatement: "An online platform invites users to deposit ₦100,000 with a promise of 'guaranteed 40% monthly returns' with zero risk, plus a 10% bonus for every friend recruited. Contrast this with the prevailing Central Bank risk-free treasury bill rate of 15% per annum, and analyze the mathematical sustainability.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Calculate the compounded annual rate implied by 40% monthly",
                  reasoning: "At 40% per month, (1 + 0.40)^12 = 1.40^12 ≈ 56.69. This implies a 5,569% annual return, whereas legitimate national economic output grows at 2% to 7% annually."
                },
                {
                  stepNumber: 2,
                  instruction: "Examine the underlying economic asset",
                  reasoning: "No productive commercial enterprise yields a risk-free 5,500% annual return. Payouts to existing members can only come from new investors' deposits."
                },
                {
                  stepNumber: 3,
                  instruction: "Conclude risk diagnosis",
                  reasoning: "The platform displays all hallmarks of a classic Ponzi scheme. Once recruitment stalls, the operators flee and late depositors suffer complete capital loss."
                }
              ],
              takeawayRule: "Unusually high 'guaranteed' returns coupled with recruitment incentives invariably signal an unsustainable pyramid structure."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Assuming a scam message is legitimate because the sender calls you by your real name",
              whyItIsWrong: "Data breaches and public social media profiles often allow fraudsters to correlate phone numbers with names to build false credibility.",
              correctCorrection: "Never trust unsolicited callers. Always hang up and contact your bank through its official verified helpline."
            }
          ],
          guidedPracticePrompt: "List 3 rules you would establish to protect an elderly relative from phone-based bank scams.",
          diagnosticSelfCheck: "Should you ever share an SMS OTP with a bank customer service representative?",
          summaryRecap: "Your PIN, CVV, and OTP are the keys to your financial vault. Never disclose them to anyone, verify all requests independently, and reject get-rich-quick schemes."
        },
        questions: [
          {
            id: "q-fin-fr-1",
            type: "multiple_choice",
            questionText: "Under what circumstance is it legitimate for a commercial bank staff member or customer care agent to ask you for your transaction PIN or SMS OTP?",
            options: [
              "Never under any circumstance; bank staff never require your confidential PIN or OTP to resolve account issues",
              "Only when verifying identity during an emergency weekend phone call",
              "When you are requesting an increase in your daily ATM withdrawal limit",
              "When an account has been temporarily flagged for an audit update"
            ],
            correctAnswer: "Never under any circumstance; bank staff never require your confidential PIN or OTP to resolve account issues",
            explanation: "Financial institutions design their core banking systems so that staff never see or need customer PINs or OTPs. Any person asking for your PIN or OTP is attempting fraud.",
            hintLadder: [
              "Banks have administrative access and do not need your private password.",
              "An OTP authorizes a debit or account transfer.",
              "Sharing it immediately compromises your funds."
            ],
            misconceptionAlerts: [
              { trigger: "Only when verifying identity during an emergency weekend phone call", note: "Emergency claims are the most common social engineering tactic to induce panic." }
            ],
            skillId: "skill-fin-fraud-prevention",
            difficulty: "easy"
          },
          {
            id: "q-fin-fr-2",
            type: "multiple_choice",
            questionText: "Which combination of characteristics is the definitive indicator of an unsustainable Ponzi investment scheme?",
            options: [
              "Guaranteed exceptionally high returns with zero stated risk, opaque business operations, and heavy financial incentives for recruiting new depositors",
              "Volatile returns linked to audited equity stock performance",
              "Low fixed interest rates backed by Federal Government Treasury Bills",
              "Investment portfolios diversified across agriculture, real estate, and government bonds"
            ],
            correctAnswer: "Guaranteed exceptionally high returns with zero stated risk, opaque business operations, and heavy financial incentives for recruiting new depositors",
            explanation: "Higher expected returns always carry higher risk. When an operator promises guaranteed high returns with zero risk and pays out returns using new deposits, it is mathematically a Ponzi scheme.",
            hintLadder: [
              "The foundational law of finance is the risk-return trade-off.",
              "No legitimate investment can eliminate all risk while guaranteeing high yields.",
              "Reliance on new members to pay old members defines a pyramid scheme."
            ],
            misconceptionAlerts: [
              { trigger: "Volatile returns linked to audited equity stock performance", note: "Volatile returns linked to audited stocks describe legitimate equity investing, not fraud." }
            ],
            skillId: "skill-fin-fraud-prevention",
            difficulty: "medium"
          }
        ]
      }
    ]
  }
];
