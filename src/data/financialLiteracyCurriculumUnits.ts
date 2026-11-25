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
    estimatedHours: 3.5,
    estimationMethod: "Social-engineering threat triage, Ponzi compounding math proof, 2 worked examples, and 5 tiered cyber-finance questions",
    provenanceVersion: "2.0.0",
    isDeepSaturated: true,
    curriculumStandardMappings: ["NERDC_NIGERIAN", "WAEC_WASSCE"],
    skills: [
      {
        id: "skill-fin-fraud-prevention",
        unitId: "unit-fin-digital-fraud-safety",
        title: "Digital Banking Safety & Financial Fraud Countermeasures",
        code: "SKL-FIN-203",
        summary: "Identifying financial scam vectors (phishing, smishing, SIM-swap, Ponzi schemes) and implementing robust multi-factor defense.",
        objectives: [
          "Recognize social engineering tactics designed to extract Bank Verification Numbers (BVN), PINs, CVVs, and One-Time Passwords (OTPs)",
          "Prove mathematically why Ponzi/pyramid schemes offering guaranteed extreme monthly yields must collapse",
          "Apply security protocols: Multi-Factor Authentication (MFA), SIM PINs, USSD quick-freeze codes, and official bank dispute channels"
        ],
        difficulty: "intermediate",
        masteryPointsRequired: 100,
        prerequisiteSkillIds: ["skill-fin-compound-interest"],
        lesson: {
          id: "les-fin-fraud-prevention",
          title: "Digital Financial Security, Cyber Defense & Ponzi Math Analysis",
          hookAndIntuition: "You receive an urgent SMS: 'Your bank account has been blocked due to BVN discrepancy. Call 080-XXXX immediately or click this link to update your debit card PIN.' That manufactured urgency is the core weapon of social engineering: bypassing critical thinking to steal your credentials.",
          conceptualExplanation: "CORE SYLLABUS (NERDC Financial Literacy): Modern fintech and USSD banking rely on multi-layered defense: Something You Know (PIN/password), Something You Have (hardware token/registered SIM), and Something You Are (biometrics). Attackers bypass encryption by targeting human psychology through Phishing (fake emails/websites), Smishing (fake SMS alerts), Vishing (impersonation phone calls), and SIM-Swap hijacking. Legitimate bank staff NEVER request your PIN, 3-digit card CVV, or SMS OTP. Meanwhile, Ponzi schemes violate basic compounding arithmetic: paying out extreme 'guaranteed' returns exclusively from incoming deposits creates exponential liabilities that inevitably collapse when recruitment stalls.",
          conceptualModel: "Three-Factor Trust Boundary: Never expose Secret Knowledge (PIN/CVV) or Dynamic Possession Tokens (OTP) outside official verified bank channels.",
          keyTermsAndFormulas: [
            {
              termOrSymbol: "One-Time Password (OTP) & CVV",
              definition: "Dynamic single-use transaction token (OTP) and 3-digit card verification code (CVV); disclosing either hands over spending authority.",
              practicalExample: "Banks state explicitly: 'Never disclose this OTP to anyone, including bank staff.'"
            },
            {
              termOrSymbol: "Exponential Ponzi Growth: A = P(1 + r)^t",
              definition: "Shows how seemingly small monthly promises explode beyond real GDP growth within 12 months.",
              practicalExample: "40% monthly compounded for 12 months = (1.40)¹² = 56.69× initial capital (5,569% APY)."
            },
            {
              termOrSymbol: "SIM-Swap Containment",
              definition: "Reassigning a victim's phone number to a fraudster's SIM to intercept SMS OTPs; mitigated by SIM lock PINs and authenticator apps.",
              practicalExample: "Sudden 'No Service' signal loss requires calling your bank immediately to freeze transfers."
            }
          ],
          workedExamples: [
            {
              title: "Worked Analysis 1: Evaluating an Investment Opportunity for Ponzi Risk",
              problemStatement: "An online platform invites users to deposit ₦100,000 with a promise of 'guaranteed 40% monthly returns' with zero risk, plus a 10% bonus for every friend recruited. Contrast this with the prevailing Central Bank risk-free treasury bill rate of 15% per annum.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Calculate the compounded annual multiple implied by 40% monthly",
                  reasoning: "At 40% per month, (1 + 0.40)¹² = 1.40¹² ≈ 56.69, implying a 5,569% annual return!"
                },
                {
                  stepNumber: 2,
                  instruction: "Compare against the risk-free benchmark and real economy",
                  reasoning: "Legitimate businesses earn 5%–25% annually with real risk; Federal Treasury Bills yield ~15% per annum."
                },
                {
                  stepNumber: 3,
                  instruction: "Inspect cash-flow source and recruitment incentives",
                  reasoning: "Offering 10% bonuses solely for recruiting depositors proves payouts come from new member capital rather than productive output."
                },
                {
                  stepNumber: 4,
                  instruction: "Conclude risk diagnosis",
                  reasoning: "The structure is mathematically unsustainable; once exponential recruitment saturates, late depositors lose 100% of principal."
                }
              ],
              takeawayRule: "Unusually high 'guaranteed' returns coupled with recruitment incentives invariably signal an unsustainable pyramid structure."
            },
            {
              title: "Worked Response 2: Phishing URL Inspection & Immediate SIM-Swap Containment",
              problemStatement: "Suppose your phone suddenly loses mobile network ('No Service' in a strong signal zone) right after receiving an email from 'security@firstbank-verify-ng.xyz' asking for your PIN and OTP. Execute the safe 4-step response.",
              steps: [
                {
                  stepNumber: 1,
                  instruction: "Audit the sender domain carefully",
                  reasoning: "Legitimate banks use their exact official domain (not '.xyz' lookalikes with extra hyphens such as 'firstbank-verify-ng.xyz')."
                },
                {
                  stepNumber: 2,
                  instruction: "Withhold all credentials and avoid links",
                  reasoning: "Do not enter PIN, BVN, CVV, or OTP on the linked page."
                },
                {
                  stepNumber: 3,
                  instruction: "Recognize potential SIM-swap hijacking",
                  reasoning: "Sudden signal loss means an attacker may have ported your number to steal SMS OTPs."
                },
                {
                  stepNumber: 4,
                  instruction: "Freeze accounts via verified channels",
                  reasoning: "Call your bank's official back-of-card helpline or visit a branch immediately to lock transfers and contact your telecom provider."
                }
              ],
              takeawayRule: "Always inspect the root domain, refuse credential links, and treat sudden unexpected 'No Service' status as a high-priority security alert."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Assuming a message is legitimate because the caller knows your full name and bank branch",
              whyItIsWrong: "Data leaks allow fraudsters to obtain names and phone numbers beforehand to fake authority.",
              correctCorrection: "Hang up and initiate verification yourself via your bank's official verified helpline."
            },
            {
              misconception: "Thinking SMS OTP alone protects an account even if SIM-swapping occurs",
              whyItIsWrong: "If an attacker hijacks your mobile SIM number, all SMS OTPs route straight to their phone.",
              correctCorrection: "Set a telecom SIM PIN, disable USSD transfer if unused, and enable hardware/app MFA."
            }
          ],
          guidedPracticePrompt: "List 3 rules you would establish to protect a family member from phone-based bank scams.",
          independentPracticePrompt: "Calculate what ₦50,000 would have to grow to in 12 months if a fraudulent scheme promises '25% every month' ((1.25)¹² ≈ 14.55×), and explain why it must fail.",
          diagnosticSelfCheck: "Should you ever disclose an SMS OTP or 3-digit card CVV to someone claiming to reverse an erroneous debit?",
          transferApplication: "Safeguarding personal savings accounts, fintech wallets, and business merchant terminals against cyber theft.",
          masteryAssessment: "Identify phishing/smishing/SIM-swap traps, analyze Ponzi math, and choose safe incident responses across 5 questions.",
          extensionActivity: "Audit a sample phishing email to highlight 4 red flags: urgent threat, spoofed domain, generic greeting, and credential harvest link.",
          summaryRecap: "Never share PINs, CVVs, or OTPs; treat 'guaranteed extreme returns' as Ponzi red flags; freeze accounts immediately if unexpected SIM loss occurs.",
          estimatedMinutes: 50
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
              "An OTP authorizes a debit or account transfer."
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
              "Reliance on new members to pay old members defines a pyramid scheme."
            ],
            misconceptionAlerts: [
              { trigger: "Volatile returns linked to audited equity stock performance", note: "Volatile returns linked to audited stocks describe legitimate equity investing, not fraud." }
            ],
            skillId: "skill-fin-fraud-prevention",
            difficulty: "medium"
          },
          {
            id: "q-fin-fr-3",
            type: "multiple_choice",
            questionText: "You receive an SMS containing a web link to 'http://bank-bvn-update-ng.top/login' warning that your account will be closed in 15 minutes unless you enter your debit card number and CVV. What attack vector is this?",
            options: [
              "Smishing (SMS phishing) social engineering",
              "Routine Central Bank biometric upgrade",
              "Encrypted hardware key rotation",
              "Standard ATM cash dispensation"
            ],
            correctAnswer: "Smishing (SMS phishing) social engineering",
            explanation: "Fraudulent SMS messages impersonating trusted institutions with fake lookalike domains and urgent threats to steal credentials are called Smishing.",
            hintLadder: [
              "Check the fake '.top' domain and artificial 15-minute panic deadline.",
              "SMS-based credential theft combines SMS + phishing = Smishing."
            ],
            misconceptionAlerts: [
              { trigger: "Routine Central Bank biometric upgrade", note: "Banks never upgrade BVN records through unverified SMS links asking for card CVV codes." }
            ],
            skillId: "skill-fin-fraud-prevention",
            difficulty: "easy"
          },
          {
            id: "q-fin-fr-4",
            type: "multiple_choice",
            questionText: "If your mobile phone suddenly loses cellular service ('No Service') in a strong coverage area shortly after an unknown login alert on your email, what high-risk threat should you suspect and do first?",
            options: [
              "A SIM-swap attack; immediately use another phone to call your bank's official line to freeze transfers and contact your telecom provider",
              "Nothing is wrong; wait 3 days for the signal tower to reboot automatically",
              "Post your BVN publicly on social media to ask friends for help",
              "Reply to the email with your transaction PIN to prove your identity"
            ],
            correctAnswer: "A SIM-swap attack; immediately use another phone to call your bank's official line to freeze transfers and contact your telecom provider",
            explanation: "Sudden loss of signal indicates criminals may have transferred your mobile number to their own SIM to intercept SMS OTPs; freezing bank transfers immediately limits losses.",
            hintLadder: [
              "SMS OTPs route to whichever SIM holds your phone number.",
              "Loss of signal + login alert signals SIM hijacking."
            ],
            misconceptionAlerts: [
              { trigger: "Nothing is wrong; wait 3 days for the signal tower to reboot automatically", note: "Delaying allows attackers to intercept OTP codes and drain linked bank accounts." }
            ],
            skillId: "skill-fin-fraud-prevention",
            difficulty: "medium"
          },
          {
            id: "q-fin-fr-5",
            type: "multiple_choice",
            questionText: "Suppose an illegal scheme promises 50% return every month compounded monthly ((1.50)^12 ≈ 129.75). Approximately how much money would a single ₦100,000 deposit legally require the scheme to pay out after just 12 months?",
            mathExpression: "A = 100,000 \\times (1.50)^{12}",
            options: [
              "Nearly ₦12,975,000 (an impossible ~130× multiplication in one year)",
              "₦150,000 total after 12 months",
              "₦700,000 total after 12 months",
              "₦1,200,000 total after 12 months"
            ],
            correctAnswer: "Nearly ₦12,975,000 (an impossible ~130× multiplication in one year)",
            explanation: "Compound growth at 50% monthly yields 100,000 × 1.50¹² ≈ ₦12,974,634 in 12 months—proving mathematically that extreme monthly yield promises cannot be sustained by real economic activity.",
            hintLadder: [
              "Multiply the principal ₦100,000 by the 12-month compounding factor ≈ 129.75.",
              "100,000 × 129.75 = ₦12,975,000."
            ],
            misconceptionAlerts: [
              { trigger: "₦700,000 total after 12 months", note: "12 × 50% simple interest is 600% (₦700,000 total), whereas monthly compounding multiplies by (1.5)¹² ≈ 129.75×." }
            ],
            skillId: "skill-fin-fraud-prevention",
            difficulty: "hard"
          }
        ]
      }
    ]
  }
];
