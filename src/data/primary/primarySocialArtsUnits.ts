/**
 * MOOS TECHY ACADEMY — PRIMARY SOCIAL STUDIES, HUMANITIES & CREATIVE ARTS REPOSITORY
 * 
 * TASK ID: MOOS-CURRICULUM-003 (Batch 1: Primary Foundations)
 * Coverage: 9 Primary Humanities, Social & Creative Arts Subjects:
 * - pri_social_studies (Social Studies & Family Living)
 * - pri_nigerian_history (National & African History)
 * - pri_geography_maps (Geography, Maps & World Continents)
 * - pri_christian_religious_studies (Christian Religious Studies - CRS)
 * - pri_islamic_religious_studies (Islamic Religious Studies - IRS)
 * - pri_cultural_creative_arts (Cultural & Creative Arts - CCA)
 * - pri_music_rhythm (Music, Songs & African Rhythms)
 * - pri_drama_theatre (Drama, Storytelling & Roleplay)
 * - pri_financial_literacy (Financial Literacy, Savings & Coin Math)
 * 
 * Standards: NERDC Social Studies, History, CRS, IRS, CCA, CBN Financial Literacy Curriculum.
 */

import { Unit } from "../../types/curriculum";

export const PRIMARY_SOCIAL_ARTS_UNITS: Unit[] = [
  // 1. pri_social_studies
  {
    id: "unit-pri-social-studies-01",
    subjectId: "pri_social_studies",
    level: "primary_foundations",
    title: "Family Structures, Culture and Community Living",
    code: "SOC-FAM-01",
    description: "Nuclear vs extended families, cultural heritage and festivals, roles in the home, and living harmoniously in diverse communities.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-soc-family-types",
        unitId: "unit-pri-social-studies-01",
        title: "Nuclear and Extended Families and Community Cooperation",
        code: "SKL-PRI-SOC-01",
        summary: "Differentiate nuclear family units from extended kinship networks and identify mutual obligations.",
        objectives: [
          "Define nuclear family (father, mother, children) and extended family (grandparents, uncles, aunts, cousins)",
          "Describe reciprocal roles and duties of parents and children in the home",
          "Identify cultural practices that unite multi-ethnic neighborhoods"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-soc-families",
          title: "Our Roots, Our People: The Warmth of Family and Community",
          hookAndIntuition: "Think of a tree: the trunk and immediate branches are like your father, mother, brothers, and sisters living in your house. But the deep, wide roots spreading beneath the soil connect you to grandparents, cousins, aunties, and uncles! That whole mighty tree is your family!",
          conceptualExplanation: "Social Studies examines how human beings live together in society. 1) Nuclear Family: Consists of parents and their biological or adopted children living together. 2) Extended Family: Includes grandparents, aunts, uncles, cousins, and in-laws. In African tradition, the extended family provides a community safety net where elders share wisdom, aunts and uncles support education, and cousins grow up as close companions.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Nuclear Family", definition: "A family group consisting of father, mother, and their children.", practicalExample: "Mr. and Mrs. Okon and their two sons." },
            { termOrSymbol: "Extended Family", definition: "A kinship group that extends beyond the nuclear family to include grandparents, aunts, uncles, and cousins.", practicalExample: "Gathering at grandma's village home for festive holidays." },
            { termOrSymbol: "Culture", definition: "The total way of life of a group of people, including language, food, dress, music, and beliefs.", practicalExample: "Traditional greeting customs and attire." }
          ],
          workedExamples: [
            {
              title: "Identifying Kinship Relationships",
              problemStatement: "What is the correct family term for your mother's sister?",
              steps: [
                { stepNumber: 1, instruction: "Trace the generation", reasoning: "She is in the same generation as your parents." },
                { stepNumber: 2, instruction: "Determine gender and kinship", reasoning: "A sister of one's father or mother is an aunt." },
                { stepNumber: 3, instruction: "State relationship", reasoning: "She is your Maternal Aunt." }
              ],
              takeawayRule: "A father's or mother's sister is your aunt; a father's or mother's brother is your uncle."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking cousins are part of the nuclear family.",
              whyItIsWrong: "Cousins belong to the extended family because they are the children of your aunts or uncles.",
              correctCorrection: "Only parents and direct siblings constitute the nuclear family."
            }
          ],
          guidedPracticePrompt: "What do we call the father of your mother or father?",
          summaryRecap: "Families come in nuclear and extended forms. Caring for elders and cooperating at home builds strong communities."
        },
        questions: [
          {
            id: "q-pri-soc-01",
            type: "multiple_choice",
            questionText: "Which relatives make up a standard 'NUCLEAR FAMILY'?",
            options: [
              "Father, mother, and their children",
              "Grandparents, uncles, aunts, and cousins",
              "A teacher, principal, and school pupils",
              "Shopkeepers and market traders"
            ],
            correctAnswer: "Father, mother, and their children",
            explanation: "The nuclear family consists strictly of the parents (father and mother) and their children living in the household.",
            hintLadder: [
              "It is the core immediate family unit.",
              "Just parents and children.",
              "Father, mother, and children."
            ],
            misconceptionAlerts: [
              { trigger: "Grandparents, uncles, aunts, and cousins", note: "Grandparents, uncles, and aunts belong to the EXTENDED family." }
            ],
            skillId: "skill-pri-soc-family-types",
            difficulty: "easy"
          },
          {
            id: "q-pri-soc-02",
            type: "multiple_choice",
            questionText: "What do we call the total way of life of a people, including their food, dress, language, and customs?",
            options: ["Culture", "Climate", "Weather", "Computer"],
            correctAnswer: "Culture",
            explanation: "Culture encompasses the shared beliefs, art, customs, food, language, and social behaviors of a human community.",
            hintLadder: [
              "It is passed down from ancestors to children.",
              "It includes our traditional attire, dances, and proverbs.",
              "Culture."
            ],
            misconceptionAlerts: [
              { trigger: "Climate", note: "Climate is the atmospheric weather pattern of a region, not human social traditions." }
            ],
            skillId: "skill-pri-soc-family-types",
            difficulty: "easy"
          },
          {
            id: "q-pri-soc-03",
            type: "multiple_choice",
            questionText: "What is your father's brother called in kinship terms?",
            options: ["Uncle", "Cousin", "Nephew", "Grandfather"],
            correctAnswer: "Uncle",
            explanation: "The brother of either your mother or your father is your uncle.",
            hintLadder: [
              "Think about what you call your father's brother.",
              "He is one generation older than you.",
              "Your uncle."
            ],
            misconceptionAlerts: [
              { trigger: "Cousin", note: "Your uncle's children are your cousins; your father's brother himself is your uncle." }
            ],
            skillId: "skill-pri-soc-family-types",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 2. pri_nigerian_history
  {
    id: "unit-pri-history-01",
    subjectId: "pri_nigerian_history",
    level: "primary_foundations",
    title: "Ancient Kingdoms, Independence and National Heroes",
    code: "HIS-NIG-01",
    description: "Historic kingdoms (Benin, Nok, Kanem-Borno, Oyo), October 1 1960 Independence, and founding nationalist heroes (Azikiwe, Awolowo, Bello, Macaulay).",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-his-independence-heroes",
        unitId: "unit-pri-history-01",
        title: "Nigeria's Independence Journey and Founding Leaders",
        code: "SKL-PRI-HIS-01",
        summary: "Identify the date of Nigeria's independence (October 1, 1960) and recognize the contributions of key nationalist founding figures.",
        objectives: [
          "State October 1, 1960 as the historic day Nigeria gained independence from British colonial rule",
          "Recognize Dr. Nnamdi Azikiwe, Chief Obafemi Awolowo, and Sir Ahmadu Bello",
          "Explain the significance of Queen Amina of Zaria and ancient Nok terracotta arts"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-his-heroes",
          title: "Giants of the Past: How Nigeria Became a Free Nation",
          hookAndIntuition: "Imagine living in your own home, but strangers from across the ocean tell you what language to speak, collect your farm crops, and make all the laws! That was colonial rule. But brave Nigerian men and women stood up, united their voices, and won freedom for our nation!",
          conceptualExplanation: "Before colonial times, magnificent civilizations thrived in Nigeria: the ancient Nok culture famous for terracotta sculptures, the Great Benin Kingdom known for bronze casting, the Kanem-Borno Empire, and the Oyo Empire. In 1914, Lord Lugard amalgamated the Northern and Southern protectorates. Through the tireless efforts of founding nationalists like Dr. Nnamdi Azikiwe, Sir Ahmadu Bello, Chief Obafemi Awolowo, and Herbert Macaulay, Nigeria achieved independence on October 1, 1960.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Independence Day", definition: "October 1, 1960, when Nigeria officially ended British colonial rule to become a sovereign nation.", practicalExample: "Celebrated nationwide every year on October 1st." },
            { termOrSymbol: "Nationalist", definition: "A leader who advocates for the freedom, self-governance, and unity of their country.", practicalExample: "Herbert Macaulay, Azikiwe, Awolowo, Bello." },
            { termOrSymbol: "Terracotta", definition: "Baked brownish-red clay used by the ancient Nok civilization to create Africa's oldest sculptures.", practicalExample: "Nok heads dated to 500 BC." }
          ],
          workedExamples: [
            {
              title: "Identifying National Founding Fathers",
              problemStatement: "Who was Nigeria's first indigenous Governor-General and first President?",
              steps: [
                { stepNumber: 1, instruction: "Recall post-independence leaders", reasoning: "At independence in 1960, Nigeria transitioned governance to indigenous statesmen." },
                { stepNumber: 2, instruction: "Identify the first President", reasoning: "Dr. Nnamdi Azikiwe ('Zik of Africa') served as Governor-General in 1960 and became President in 1963." },
                { stepNumber: 3, instruction: "Confirm regional role", reasoning: "Sir Abubakar Tafawa Balewa served as Prime Minister." }
              ],
              takeawayRule: "Dr. Nnamdi Azikiwe was Nigeria's first President; Sir Abubakar Tafawa Balewa was the first Prime Minister."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking Nigeria had no history before the British arrived.",
              whyItIsWrong: "Nigeria had advanced metallurgical, artistic, and administrative civilizations (Nok, Benin, Ife, Borno) dating back thousands of years.",
              correctCorrection: "Nigeria's indigenous kingdoms possessed rich democratic councils, trade routes, and world-renowned artistic traditions."
            }
          ],
          guidedPracticePrompt: "On what exact date and year did Nigeria celebrate its Independence Day?",
          summaryRecap: "From ancient Nok and Benin to modern heroes like Azikiwe, Awolowo, and Bello, Nigeria's rich history culminates in Independence on October 1, 1960."
        },
        questions: [
          {
            id: "q-pri-his-01",
            type: "multiple_choice",
            questionText: "On what historic date did Nigeria gain full independence from British colonial rule?",
            options: ["October 1, 1960", "May 29, 1999", "January 1, 1914", "December 25, 1960"],
            correctAnswer: "October 1, 1960",
            explanation: "Nigeria officially lowered the British Union Jack and raised the Green-White-Green flag on October 1, 1960.",
            hintLadder: [
              "We celebrate Independence Day on October 1st every year.",
              "The year was in the 1960s.",
              "October 1, 1960."
            ],
            misconceptionAlerts: [
              { trigger: "January 1, 1914", note: "1914 was the Amalgamation of Northern and Southern Nigeria, not Independence." }
            ],
            skillId: "skill-pri-his-independence-heroes",
            difficulty: "easy"
          },
          {
            id: "q-pri-his-02",
            type: "multiple_choice",
            questionText: "Which ancient Nigerian civilization is famous for creating Africa's oldest baked-clay terracotta sculptures dating back over 2,000 years?",
            options: ["Nok civilization", "Roman civilization", "Viking civilization", "Aztec civilization"],
            correctAnswer: "Nok civilization",
            explanation: "The Nok culture of central Nigeria produced remarkable terracotta sculptures and engaged in early iron smelting as early as 500 BC.",
            hintLadder: [
              "Located in present-day Kaduna / Plateau / central Nigeria.",
              "Famous for expressive terracotta clay heads.",
              "The Nok culture."
            ],
            misconceptionAlerts: [
              { trigger: "Roman civilization", note: "Rome is in Europe; Nok is the indigenous Nigerian civilization." }
            ],
            skillId: "skill-pri-his-independence-heroes",
            difficulty: "easy"
          },
          {
            id: "q-pri-his-03",
            type: "multiple_choice",
            questionText: "Who was the renowned warrior queen of ancient Zazzau (Zaria) celebrated for her leadership, military tactics, and building defensive city walls?",
            options: ["Queen Amina", "Queen Victoria", "Queen Moremi", "Queen Idia"],
            correctAnswer: "Queen Amina",
            explanation: "Queen Amina of Zaria was a famous 16th-century Hausa warrior queen who expanded territory and built defensive earthen walls ('Ganuwar Amina').",
            hintLadder: [
              "She ruled in Zazzau (modern Zaria in northern Nigeria).",
              "Her name starts with 'Am...'",
              "Queen Amina."
            ],
            misconceptionAlerts: [
              { trigger: "Queen Victoria", note: "Queen Victoria was a British monarch, not the warrior queen of Zazzau." }
            ],
            skillId: "skill-pri-his-independence-heroes",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 3. pri_geography_maps
  {
    id: "unit-pri-geography-01",
    subjectId: "pri_geography_maps",
    level: "primary_foundations",
    title: "Compass Directions, Map Symbols, Continents and Oceans",
    code: "GEO-MAP-01",
    description: "The 4 cardinal points (North, South, East, West), reading map legends/keys, the 7 continents, and the 5 major oceans.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-geo-cardinal-continents",
        unitId: "unit-pri-geography-01",
        title: "Cardinal Points and the Seven Continents",
        code: "SKL-PRI-GEO-01",
        summary: "Orient directions using a compass rose (N, S, E, W) and identify world continents on a globe.",
        objectives: [
          "Recite the 4 cardinal directions using mnemonic 'Never Eat Soggy Waffles' (North, East, South, West)",
          "Interpret common map symbols on a map legend",
          "Identify Africa as our home continent and name the remaining continents"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-geo-planet-maps",
          title: "Charting the Globe: Compass Roses, Landmasses, and Deep Blue Seas",
          hookAndIntuition: "If a pirate gave you a treasure map, how would you know where to dig? At the top corner is a little star with four points pointing North, South, East, and West! Maps are drawings of places seen from high up in an airplane, guiding travelers everywhere!",
          conceptualExplanation: "A map is a flat representation of the Earth or part of it. A compass rose shows the 4 cardinal directions: North (top), South (bottom), East (right, where the sun rises), and West (left, where the sun sets). Our Earth is divided into 7 massive landmasses called continents: Africa, Asia, Europe, North America, South America, Australia/Oceania, and Antarctica, surrounded by five great oceans.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Cardinal Points", definition: "The four primary navigational directions: North, South, East, and West.", practicalExample: "The sun rises in the East and sets in the West." },
            { termOrSymbol: "Continent", definition: "One of the seven immense continuous expanses of land on Earth.", practicalExample: "Nigeria is a nation located on the continent of Africa." },
            { termOrSymbol: "Map Key (Legend)", definition: "An explanatory box on a map that shows what each symbol, color, or line means.", practicalExample: "A blue line represents a river." }
          ],
          workedExamples: [
            {
              title: "Finding Direction Using Sunrise",
              problemStatement: "You stand facing the morning sunrise with your arms stretched out to the sides. Which directions are you facing, and which way does your left hand point?",
              steps: [
                { stepNumber: 1, instruction: "Determine forward direction", reasoning: "The sun rises in the East; facing the sunrise means you face East." },
                { stepNumber: 2, instruction: "Determine left arm direction", reasoning: "When facing East, North is to your left side." },
                { stepNumber: 3, instruction: "Determine right arm and back", reasoning: "Your right arm points South, and your back faces West." }
              ],
              takeawayRule: "Face the rising sun: you face East, your back is West, your left points North, and your right points South."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking Africa is a single country.",
              whyItIsWrong: "Africa is the world's second-largest continent, comprising 54 distinct independent nations including Nigeria, Ghana, Kenya, and Egypt.",
              correctCorrection: "Africa is a continent containing many countries."
            }
          ],
          guidedPracticePrompt: "Name the continent located at the Earth's extreme South Pole that is covered in thick sheets of ice.",
          summaryRecap: "Navigate using the 4 cardinal points (N, S, E, W), read map keys, and remember that our nation Nigeria is in Africa."
        },
        questions: [
          {
            id: "q-pri-geo-01",
            type: "multiple_choice",
            questionText: "In which direction does the Sun rise every morning?",
            options: ["East", "West", "North", "South"],
            correctAnswer: "East",
            explanation: "Due to the Earth's eastward rotation, the Sun appears to rise in the East and set in the West.",
            hintLadder: [
              "Think about where the morning light first appears.",
              "Rises in the ___, sets in the West.",
              "East."
            ],
            misconceptionAlerts: [
              { trigger: "West", note: "The sun sets in the West in the evening; it rises in the East." }
            ],
            skillId: "skill-pri-geo-cardinal-continents",
            difficulty: "easy"
          },
          {
            id: "q-pri-geo-02",
            type: "multiple_choice",
            questionText: "On which continent is the country of Nigeria located?",
            options: ["Africa", "Asia", "Europe", "South America"],
            correctAnswer: "Africa",
            explanation: "Nigeria is situated in West Africa on the continent of Africa.",
            hintLadder: [
              "It is our home continent.",
              "The second-largest continent on Earth.",
              "Africa."
            ],
            misconceptionAlerts: [
              { trigger: "Asia", note: "Asia is the largest continent (home to China and India), but Nigeria is located in Africa." }
            ],
            skillId: "skill-pri-geo-cardinal-continents",
            difficulty: "easy"
          },
          {
            id: "q-pri-geo-03",
            type: "multiple_choice",
            questionText: "What feature on a map explains what various symbols, icons, and colors represent?",
            options: ["Map Key (Legend)", "Compass needle", "Paper border", "Map title"],
            correctAnswer: "Map Key (Legend)",
            explanation: "The Map Key or Legend defines all symbols (e.g. blue lines for rivers, airplane for airport) used in the map.",
            hintLadder: [
              "It is the 'key' that unlocks what drawings mean.",
              "Often found in a small corner box.",
              "Map Key (Legend)."
            ],
            misconceptionAlerts: [
              { trigger: "Compass needle", note: "The compass shows directions (N, S, E, W), while the legend explains symbols." }
            ],
            skillId: "skill-pri-geo-cardinal-continents",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 4. pri_christian_religious_studies
  {
    id: "unit-pri-crs-01",
    subjectId: "pri_christian_religious_studies",
    level: "primary_foundations",
    title: "God the Creator, Bible Stories and Christian Moral Living",
    code: "CRS-BIB-01",
    description: "The Genesis Creation story, Noah's ark, Abraham's obedience, the early life of Jesus, and the Golden Rule of love and kindness.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-crs-creation-obedience",
        unitId: "unit-pri-crs-01",
        title: "God's Creation and the Golden Rule of Love",
        code: "SKL-PRI-CRS-01",
        summary: "Identify the six days of divine creation and apply Jesus's teaching on loving one's neighbor.",
        objectives: [
          "Recount the Genesis Creation sequence (light, skies, plants, celestial bodies, animals, humans)",
          "Explain the Golden Rule: 'Do unto others as you would have them do unto you'",
          "Describe how kindness, honesty, and forgiveness reflect Christian character"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-crs-creation",
          title: "The Wonder of Creation: Loving God and Caring for Others",
          hookAndIntuition: "Look around at the twinkling stars, the green forests, colorful birds, and gentle rivers. Who painted all these masterpieces? The Bible teaches that God created our beautiful universe with love and crowned humans to be caring caretakers of the earth!",
          conceptualExplanation: "In Christian Religious Studies, we learn about God's power and character. In Genesis, God brought light, ordered the seas and lands, filled the earth with living plants and animals, and created humankind in His own image. Jesus Christ taught that the greatest commandments are to love God with all our heart and love our neighbors as ourselves (The Golden Rule). Living a Christian life means practicing honesty, humility, peace, and forgiveness.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Creation", definition: "The act of God bringing the universe and all living things into existence.", practicalExample: "Genesis 1: 'In the beginning God created the heavens and the earth.'" },
            { termOrSymbol: "The Golden Rule", definition: "Treat others the way you want them to treat you.", practicalExample: "Showing kindness and sharing toys with classmates." },
            { termOrSymbol: "Forgiveness", definition: "Letting go of anger and pardoning someone who has wronged you.", practicalExample: "Making peace after an argument." }
          ],
          workedExamples: [
            {
              title: "Practicing the Golden Rule on the Playground",
              problemStatement: "A classmate drops his books and other pupils laugh. What should a child following the Golden Rule do?",
              steps: [
                { stepNumber: 1, instruction: "Reflect on feelings", reasoning: "How would I feel if I dropped my books and people laughed? I would feel embarrassed and hurt." },
                { stepNumber: 2, instruction: "Apply Christ's teaching", reasoning: "I would want someone to step forward and help me pick them up." },
                { stepNumber: 3, instruction: "Take action", reasoning: "Kneel down, help gather the books, and offer a comforting smile." }
              ],
              takeawayRule: "Always act toward others with the exact kindness and respect you hope to receive."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking loving your neighbor only applies to people who attend your same church.",
              whyItIsWrong: "In the Parable of the Good Samaritan, Jesus showed that anyone in need is our neighbor, regardless of tribe or background.",
              correctCorrection: "Christian love extends to every human being in need."
            }
          ],
          guidedPracticePrompt: "What did God create on the first day according to the Book of Genesis?",
          summaryRecap: "God created the world and all living things. We honor God by obeying His commands and loving our neighbors through daily kindness."
        },
        questions: [
          {
            id: "q-pri-crs-01",
            type: "multiple_choice",
            questionText: "According to the Book of Genesis, what did God create on the very first day?",
            options: ["Light ('Let there be light')", "Fish and birds", "Sun and moon", "Wild animals"],
            correctAnswer: "Light ('Let there be light')",
            explanation: "On Day 1, God said 'Let there be light' and divided the light from the darkness (Genesis 1:3-5).",
            hintLadder: [
              "God said: 'Let there be...'",
              "It was needed to dispel total darkness.",
              "Light."
            ],
            misconceptionAlerts: [
              { trigger: "Sun and moon", note: "The sun, moon, and stars were created on the fourth day to govern day and night." }
            ],
            skillId: "skill-pri-crs-creation-obedience",
            difficulty: "easy"
          },
          {
            id: "q-pri-crs-02",
            type: "multiple_choice",
            questionText: "What is the Christian moral principle known as the 'Golden Rule'?",
            options: [
              "Do unto others as you would have them do unto you",
              "Keep all your toys to yourself",
              "Never speak to anyone you do not know",
              "Only be kind to people who give you money"
            ],
            correctAnswer: "Do unto others as you would have them do unto you",
            explanation: "The Golden Rule (Matthew 7:12) commands treating others with the same respect and benevolence you desire for yourself.",
            hintLadder: [
              "Treat others the way you want to be treated.",
              "A universal rule of kindness.",
              "Do unto others as you would have them do unto you."
            ],
            misconceptionAlerts: [
              { trigger: "Keep all your toys to yourself", note: "Christianity teaches generosity and sharing, not hoarding." }
            ],
            skillId: "skill-pri-crs-creation-obedience",
            difficulty: "easy"
          },
          {
            id: "q-pri-crs-03",
            type: "multiple_choice",
            questionText: "In which town was Jesus Christ born according to the New Testament gospels?",
            options: ["Bethlehem", "Jerusalem", "Nazareth", "Rome"],
            correctAnswer: "Bethlehem",
            explanation: "Jesus was born in a manger in Bethlehem of Judea during the reign of Caesar Augustus (Luke 2:4-7).",
            hintLadder: [
              "Think of Christmas carols like 'O Little Town of...'",
              "It is in Judea.",
              "Bethlehem."
            ],
            misconceptionAlerts: [
              { trigger: "Nazareth", note: "Nazareth is where Jesus grew up as a boy, but he was born in Bethlehem." }
            ],
            skillId: "skill-pri-crs-creation-obedience",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 5. pri_islamic_religious_studies
  {
    id: "unit-pri-irs-01",
    subjectId: "pri_islamic_religious_studies",
    level: "primary_foundations",
    title: "Five Pillars of Islam, Surah Al-Fatihah and Moral Manners",
    code: "IRS-PIL-01",
    description: "The Five Pillars (Shahadah, Salah, Zakat, Sawm, Hajj), ablution (Wudu), reciting Surah Al-Fatihah, and Prophet Muhammad's (SAW) noble character (Akhlaq).",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-irs-five-pillars",
        unitId: "unit-pri-irs-01",
        title: "The Five Pillars of Islam and Wudu Ablution",
        code: "SKL-PRI-IRS-01",
        summary: "Identify the five foundational pillars of Islam and perform ritual ablution (Wudu) before prayer.",
        objectives: [
          "List the Five Pillars of Islam in order: Shahadah, Salah, Zakat, Sawm, Hajj",
          "Recite the opening chapter of the Holy Qur'an: Surah Al-Fatihah",
          "Demonstrate the essential steps of Wudu (washing hands, mouth, nose, face, arms, head, feet)"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-irs-pillars",
          title: "The Pillars of Faith: Prayer, Purity, and Noble Character",
          hookAndIntuition: "Imagine building a majestic house. To keep the roof strong and safe, you need five sturdy pillars holding it up! In Islam, the entire beautiful religion rests upon five pillars that draw us close to Allah and make us kind, pure, and generous human beings!",
          conceptualExplanation: "The Five Pillars of Islam are: 1) Shahadah: Declaration of faith that there is no deity worthy of worship except Allah, and Muhammad (SAW) is His Messenger. 2) Salah: Five daily prayers (Fajr, Dhuhr, Asr, Maghrib, Isha). 3) Zakat: Giving charity to the poor and needy. 4) Sawm: Fasting during the holy month of Ramadan. 5) Hajj: Pilgrimage to Makkah once in a lifetime for those who are able. Before prayer, a Muslim purifies their body through Wudu.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Shahadah", definition: "The declaration of faith in the oneness of Allah and the prophethood of Muhammad (SAW).", practicalExample: "The first and most foundational pillar." },
            { termOrSymbol: "Salah", definition: "The five daily obligatory ritual prayers facing the Qiblah.", practicalExample: "Fajr, Dhuhr, Asr, Maghrib, Isha." },
            { termOrSymbol: "Wudu", definition: "The ritual washing of specific body parts with clean water before prayer.", practicalExample: "Washing hands, face, arms to elbows, wiping head, washing feet." }
          ],
          workedExamples: [
            {
              title: "Reciting Surah Al-Fatihah",
              problemStatement: "What is the first verse of Surah Al-Fatihah recited at the start of every prayer unit (Rak'ah)?",
              steps: [
                { stepNumber: 1, instruction: "Begin with the Basmalah", reasoning: "'Bismillahir-Rahmanir-Rahim' (In the name of Allah, the Most Gracious, the Most Merciful)." },
                { stepNumber: 2, instruction: "First verse of praise", reasoning: "'Alhamdu lillahi Rabbil-'alamin' (All praise belongs to Allah, Lord of all the worlds)." },
                { stepNumber: 3, instruction: "Recognize significance", reasoning: "Surah Al-Fatihah is the Mother of the Book (Umm al-Kitab) and must be recited in every prayer." }
              ],
              takeawayRule: "Surah Al-Fatihah opens the Qur'an and is the essential prayer of praise and guidance recited in every prayer."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking prayer can be performed without clean water ablution when water is available.",
              whyItIsWrong: "Purity (Taharah) is a prerequisite for prayer; Wudu must be performed with clean water.",
              correctCorrection: "Always perform Wudu with clean water before offering Salah."
            }
          ],
          guidedPracticePrompt: "Name the five daily prayers in their chronological order starting from dawn.",
          summaryRecap: "Islam rests upon 5 pillars: Shahadah, Salah, Zakat, Sawm, and Hajj. Practice cleanliness through Wudu and embody noble character (Akhlaq)."
        },
        questions: [
          {
            id: "q-pri-irs-01",
            type: "multiple_choice",
            questionText: "How many obligatory daily prayers (Salah) are observed by Muslims every day?",
            options: ["5 prayers", "3 prayers", "7 prayers", "1 prayer"],
            correctAnswer: "5 prayers",
            explanation: "Muslims perform 5 daily obligatory prayers: Fajr (dawn), Dhuhr (noon), Asr (afternoon), Maghrib (sunset), and Isha (night).",
            hintLadder: [
              "Count on one hand.",
              "Fajr, Dhuhr, Asr, Maghrib, Isha.",
              "5 prayers."
            ],
            misconceptionAlerts: [
              { trigger: "3 prayers", note: "There are 5 daily obligatory prayers in Islamic practice." }
            ],
            skillId: "skill-pri-irs-five-pillars",
            difficulty: "easy"
          },
          {
            id: "q-pri-irs-02",
            type: "multiple_choice",
            questionText: "What is the ritual purification with clean water performed before offering prayer called?",
            options: ["Wudu (Ablution)", "Zakat", "Sawm", "Hajj"],
            correctAnswer: "Wudu (Ablution)",
            explanation: "Wudu is the Islamic ritual washing of the hands, mouth, nostrils, face, arms, head, and feet before prayer.",
            hintLadder: [
              "It involves washing hands, face, and feet with clean water.",
              "It starts with 'W'.",
              "Wudu."
            ],
            misconceptionAlerts: [
              { trigger: "Zakat", note: "Zakat is charitable giving to the poor, not water ablution." }
            ],
            skillId: "skill-pri-irs-five-pillars",
            difficulty: "easy"
          },
          {
            id: "q-pri-irs-03",
            type: "multiple_choice",
            questionText: "During which holy Islamic month do Muslims observe fasting (Sawm) from dawn until sunset?",
            options: ["Ramadan", "Muharram", "Shawwal", "Safar"],
            correctAnswer: "Ramadan",
            explanation: "Fasting during the holy month of Ramadan is the fourth pillar of Islam.",
            hintLadder: [
              "It is the month the Holy Qur'an began to be revealed.",
              "Families break their fast at sunset with dates and water.",
              "Ramadan."
            ],
            misconceptionAlerts: [
              { trigger: "Muharram", note: "Muharram is the first month of the Islamic calendar, but the month of obligatory fasting is Ramadan." }
            ],
            skillId: "skill-pri-irs-five-pillars",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 6. pri_cultural_creative_arts
  {
    id: "unit-pri-cca-01",
    subjectId: "pri_cultural_creative_arts",
    level: "primary_foundations",
    title: "Primary Colors, Color Mixing, Clay Modeling and Collage",
    code: "CCA-ART-01",
    description: "The 3 primary colors (Red, Yellow, Blue), mixing secondary colors (Orange, Green, Purple), pinch-pot clay modeling, and paper collage craft.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-cca-primary-secondary-colors",
        unitId: "unit-pri-cca-01",
        title: "Primary Colors and Secondary Color Mixing",
        code: "SKL-PRI-CCA-01",
        summary: "Identify red, yellow, and blue as primary colors and predict the secondary colors produced by mixing them.",
        objectives: [
          "Identify the three primary colors (Red, Yellow, Blue) that cannot be created by mixing other colors",
          "Mix Red + Yellow to produce Orange",
          "Mix Yellow + Blue to produce Green, and Blue + Red to produce Purple (Violet)"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-cca-colors",
          title: "The Artist's Palette: The Magic of Color Mixing",
          hookAndIntuition: "What if you only had three paint jars—Red, Yellow, and Blue—but you wanted to paint a lush green forest, an orange sunset, and a purple royal crown? Do you need to buy new paints? No! You can mix them right on your palette like a wizard!",
          conceptualExplanation: "In visual art, colors are organized systematically. 1) Primary Colors: Red, Yellow, and Blue are pure root colors; no colors can be mixed together to make them. 2) Secondary Colors: Made by mixing equal parts of two primary colors: Red + Yellow = Orange. Yellow + Blue = Green. Blue + Red = Purple (Violet). Together they form the color wheel.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Primary Colors", definition: "Red, Yellow, and Blue—the three pure foundational pigments that cannot be mixed from others.", practicalExample: "The primary base of all painter palettes." },
            { termOrSymbol: "Secondary Colors", definition: "Colors created by mixing two primary colors together (Orange, Green, Purple).", practicalExample: "Yellow + Blue = Green." },
            { termOrSymbol: "Collage", definition: "An artwork created by pasting different textured materials (paper, fabric, beads) onto a flat surface.", practicalExample: "Torn colored paper landscape." }
          ],
          workedExamples: [
            {
              title: "Mixing Green for Tree Leaves",
              problemStatement: "An art pupil needs green paint to color mango leaves. Which two primary colors should she blend together?",
              steps: [
                { stepNumber: 1, instruction: "Identify target secondary color", reasoning: "Green is a secondary color." },
                { stepNumber: 2, instruction: "Select primary color pair", reasoning: "Yellow is bright and warm; Blue is cool." },
                { stepNumber: 3, instruction: "Mix on palette", reasoning: "Blending Yellow paint and Blue paint creates Green." }
              ],
              takeawayRule: "Yellow + Blue = Green. Red + Yellow = Orange. Blue + Red = Purple."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking green is a primary color.",
              whyItIsWrong: "Green can be easily mixed from yellow and blue pigments, so it is a secondary color.",
              correctCorrection: "The only three primary pigment colors are Red, Yellow, and Blue."
            }
          ],
          guidedPracticePrompt: "What color do you get if you mix Red paint with Yellow paint?",
          summaryRecap: "Red, Yellow, and Blue are the 3 primary colors. Mix them in pairs to create Orange, Green, and Purple."
        },
        questions: [
          {
            id: "q-pri-cca-01",
            type: "multiple_choice",
            questionText: "Which group consists of the three PRIMARY colors?",
            options: [
              "Red, Yellow, and Blue",
              "Green, Orange, and Purple",
              "Black, White, and Grey",
              "Pink, Brown, and Silver"
            ],
            correctAnswer: "Red, Yellow, and Blue",
            explanation: "Red, Yellow, and Blue are the three primary colors from which all secondary colors are mixed.",
            hintLadder: [
              "These three colors cannot be created by mixing other paints.",
              "Think of a traffic light without green: red and yellow, plus deep blue.",
              "Red, Yellow, Blue."
            ],
            misconceptionAlerts: [
              { trigger: "Green, Orange, and Purple", note: "These are SECONDARY colors created by mixing primary colors." }
            ],
            skillId: "skill-pri-cca-primary-secondary-colors",
            difficulty: "easy"
          },
          {
            id: "q-pri-cca-02",
            type: "multiple_choice",
            questionText: "What secondary color is produced when you mix YELLOW paint and BLUE paint?",
            options: ["Green", "Orange", "Purple", "Pink"],
            correctAnswer: "Green",
            explanation: "Yellow combined with Blue yields the secondary color Green.",
            hintLadder: [
              "Think of the color of grass and tree leaves.",
              "Yellow (sun) + Blue (sky) = nature's leaf color.",
              "Green."
            ],
            misconceptionAlerts: [
              { trigger: "Orange", note: "Orange is made by mixing Red and Yellow." }
            ],
            skillId: "skill-pri-cca-primary-secondary-colors",
            difficulty: "easy"
          },
          {
            id: "q-pri-cca-03",
            type: "multiple_choice",
            questionText: "What art technique involves cutting and pasting torn papers, cloth, or beads onto cardboard to create a picture?",
            options: ["Collage", "Sculpture", "Calligraphy", "Wood carving"],
            correctAnswer: "Collage",
            explanation: "Collage comes from the French word 'coller' (to glue) and involves assembling diverse materials onto a backing surface.",
            hintLadder: [
              "It uses scissors, glue, and colorful paper scraps.",
              "Pastes pieces together.",
              "Collage."
            ],
            misconceptionAlerts: [
              { trigger: "Wood carving", note: "Wood carving subtracts wood using chisels; collage pastes pieces onto a flat backing." }
            ],
            skillId: "skill-pri-cca-primary-secondary-colors",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 7. pri_music_rhythm
  {
    id: "unit-pri-music-01",
    subjectId: "pri_music_rhythm",
    level: "primary_foundations",
    title: "Musical Beats, Solfa Notation and Traditional African Instruments",
    code: "MUS-RHY-01",
    description: "Rhythm and steady pulse, Solfa scale (Do-Re-Mi-Fa-So-La-Ti-Do), pitch (high/low), and indigenous percussion instruments (talking drum, shekere, flute).",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-mus-solfa-percussion",
        unitId: "unit-pri-music-01",
        title: "Tonic Solfa and Traditional African Percussion",
        code: "SKL-PRI-MUS-01",
        summary: "Sing the 8 tonic solfa pitches and identify traditional Nigerian musical instruments.",
        objectives: [
          "Sing the tonic solfa scale (Do, Re, Mi, Fa, So, La, Ti, Do) with ascending pitch",
          "Distinguish steady musical pulse (beat) from syncopated rhythm",
          "Identify traditional instruments: Talking Drum (Gangan), Shekere (beaded gourd), and Oja flute"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-mus-beats",
          title: "The Pulse of Africa: Drums, Songs, and the Solfa Ladder",
          hookAndIntuition: "Place your hand over your chest. Thump-thump, thump-thump! Your heart beats with a steady, regular pulse! Music has that exact same heartbeat. When you clap your hands in time or play a talking drum that mimics the tonal inflection of human speech, you are speaking music!",
          conceptualExplanation: "Music consists of sound organized over time. 1) Beat: The steady continuous pulse of the music. 2) Pitch: How high or low a musical note sounds. We sing pitches using the Tonic Solfa ladder: Do (lowest), Re, Mi, Fa, So, La, Ti, Do' (highest). 3) Traditional African Instruments include the Talking Drum (an hourglass drum squeezed under the arm to vary pitch), the Shekere (a dried gourd covered with netted cowrie shells/beads), and wooden xylophones (Marimba).",
          keyTermsAndFormulas: [
            { termOrSymbol: "Tonic Solfa", definition: "A system of naming pitch notes using syllables: Do, Re, Mi, Fa, So, La, Ti, Do.", practicalExample: "Singing 'Do-Re-Mi' scales in choir." },
            { termOrSymbol: "Beat", definition: "The steady underlying rhythmic pulse that you tap your feet to in music.", practicalExample: "A ticking clock or marching drum." },
            { termOrSymbol: "Talking Drum (Gangan / Iya Ilu)", definition: "An hourglass-shaped percussion drum whose tension strings are squeezed to mimic human voice tones.", practicalExample: "Played at cultural celebrations to praise guests." }
          ],
          workedExamples: [
            {
              title: "Climbing the Solfa Staircase",
              problemStatement: "In the musical scale, which note comes immediately after 'Mi' when singing upwards from 'Do'?",
              steps: [
                { stepNumber: 1, instruction: "Recite the scale ascending", reasoning: "Do, Re, Mi..." },
                { stepNumber: 2, instruction: "Identify the 4th note", reasoning: "The note after Mi is Fa." },
                { stepNumber: 3, instruction: "Confirm full sequence", reasoning: "Do, Re, Mi, Fa, So, La, Ti, Do." }
              ],
              takeawayRule: "The eight solfa degrees ascend: Do - Re - Mi - Fa - So - La - Ti - Do."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking high pitch means singing louder.",
              whyItIsWrong: "Pitch is frequency (how high like a squeaking bird or low like a roaring lion); volume is loudness (whisper vs shout).",
              correctCorrection: "You can sing a high pitch very softly and a low pitch very loudly."
            }
          ],
          guidedPracticePrompt: "What Nigerian instrument is made from a dried gourd covered in a net of beads that rattles when shaken?",
          summaryRecap: "Feel the steady beat, sing the 8 Solfa pitches (Do to Do'), and celebrate our rich musical heritage of drums and percussion."
        },
        questions: [
          {
            id: "q-pri-mus-01",
            type: "multiple_choice",
            questionText: "What is the third note in the ascending Tonic Solfa musical scale: Do, Re, _____?",
            options: ["Mi", "Fa", "So", "Ti"],
            correctAnswer: "Mi",
            explanation: "The tonic solfa scale in ascending pitch order begins: Do (1), Re (2), Mi (3), Fa (4).",
            hintLadder: [
              "Sing: Do, Re, ___.",
              "It rhymes with 'bee' or 'see'.",
              "Mi."
            ],
            misconceptionAlerts: [
              { trigger: "Fa", note: "Fa is the fourth degree of the scale; Mi is the third." }
            ],
            skillId: "skill-pri-mus-solfa-percussion",
            difficulty: "easy"
          },
          {
            id: "q-pri-mus-02",
            type: "multiple_choice",
            questionText: "Which traditional West African instrument is made from an hourglass-shaped wooden drum with leather cords squeezed under the arm to imitate the tones of human speech?",
            options: ["Talking Drum (Gangan)", "Piano keyboard", "Electric guitar", "Violin"],
            correctAnswer: "Talking Drum (Gangan)",
            explanation: "The Talking drum's leather tension cords change pitch when squeezed against the player's ribs, imitating linguistic tonal inflections.",
            hintLadder: [
              "It 'talks' by imitating vocal pitch.",
              "Played with a curved wooden stick under the arm.",
              "The Talking Drum."
            ],
            misconceptionAlerts: [
              { trigger: "Piano keyboard", note: "The piano is a Western keyboard instrument, not an hourglass African pressure drum." }
            ],
            skillId: "skill-pri-mus-solfa-percussion",
            difficulty: "easy"
          },
          {
            id: "q-pri-mus-03",
            type: "multiple_choice",
            questionText: "Which percussion instrument is made of a dried calabash gourd wrapped in a woven net of rattling beads or cowrie shells?",
            options: ["Shekere", "Flute (Oja)", "Trumpet", "Clarinet"],
            correctAnswer: "Shekere",
            explanation: "The Shekere is a hollow dried gourd shaker enclosed in a beaded net shaken or slapped to keep rhythmic tempo.",
            hintLadder: [
              "It is shaken and tossed to create a crisp rattling sound.",
              "Starts with 'Sh...'",
              "Shekere."
            ],
            misconceptionAlerts: [
              { trigger: "Flute (Oja)", note: "The Oja is a wind whistle instrument blown with the mouth, not a beaded gourd shaker." }
            ],
            skillId: "skill-pri-mus-solfa-percussion",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 8. pri_drama_theatre
  {
    id: "unit-pri-drama-01",
    subjectId: "pri_drama_theatre",
    level: "primary_foundations",
    title: "Roleplay, Character Mimicry, Facial Expressions and Stagecraft",
    code: "DRA-THE-01",
    description: "Improvisational acting, vocal projection, body language expressions (joy, sorrow, surprise), staging, and telling folklore tales.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-dra-roleplay-mime",
        unitId: "unit-pri-drama-01",
        title: "Character Roleplay and Expressive Body Language",
        code: "SKL-PRI-DRA-01",
        summary: "Portray dramatic characters using exaggerated body posture, clear voice projection, and non-verbal pantomime.",
        objectives: [
          "Use facial expressions and body posture to portray emotions without speaking (mime)",
          "Practice vocal projection so actors are heard clearly from the back of the auditorium",
          "Identify stage areas: Stage Left, Stage Right, Center Stage"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-dra-acting",
          title: "Stepping onto the Stage: Acting, Voices, and Make-Believe",
          hookAndIntuition: "When you put on an old hat and walk with a slow hunch, pretending to be an 80-year-old grandfather telling village tales by firelight, you are acting! In drama, you can transform into a brave lion, a clever tortoise, or a king with just your voice and body!",
          conceptualExplanation: "Drama is a performing art where stories are brought to life by actors before an audience. Key elements: 1) Characterization: Changing your voice, posture, and walk to become another person or animal. 2) Pantomime (Mime): Acting out actions silently using only body language and facial cues (e.g. pretending to push against a heavy wind). 3) Projection: Speaking loudly and clearly from the diaphragm without shouting.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Roleplay", definition: "Assuming the character, attitudes, and actions of another person or fictional figure in an act.", practicalExample: "Playing the doctor in a school health skit." },
            { termOrSymbol: "Mime (Pantomime)", definition: "The art of acting and telling stories through silent physical movements and facial expressions alone.", practicalExample: "Pretending to climb an invisible ladder." },
            { termOrSymbol: "Voice Projection", definition: "Speaking clearly and with sufficient acoustic volume to be easily heard throughout a theatre.", practicalExample: "Projecting speech from the belly so all parents hear your lines." }
          ],
          workedExamples: [
            {
              title: "Portraying the Clever Tortoise (Ijapa / Mbe)",
              problemStatement: "How can a primary school actor show that their character is the sneaky, clever Tortoise in an African folk play?",
              steps: [
                { stepNumber: 1, instruction: "Adjust body posture", reasoning: "Bend knees, stoop shoulders forward, and walk with deliberate, creeping steps." },
                { stepNumber: 2, instruction: "Adjust facial expressions", reasoning: "Squint eyes thoughtfully and smile mischievously while tapping a finger on the chin." },
                { stepNumber: 3, instruction: "Vary voice pitch", reasoning: "Speak in a calm, cunning, deliberate whisper that commands attention." }
              ],
              takeawayRule: "Combine physical movement, facial expression, and tone of voice to create believable dramatic characters."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking acting on stage requires shouting at the top of your lungs.",
              whyItIsWrong: "Shouting strains vocal cords and sounds harsh; projection uses deep breathing and crisp articulation.",
              correctCorrection: "Breathe from the diaphragm and pronounce consonant sounds crisply to project cleanly."
            }
          ],
          guidedPracticePrompt: "Show a silent facial expression of sudden amazement and surprise without making any sound.",
          summaryRecap: "Drama brings stories alive: use mime, change your voice, project clearly, and inhabit your character with imagination."
        },
        questions: [
          {
            id: "q-pri-dra-01",
            type: "multiple_choice",
            questionText: "What do we call acting out a scene or story using ONLY body movements and facial expressions without speaking any words?",
            options: ["Mime (Pantomime)", "Singing an opera", "Reading aloud", "Radio broadcast"],
            correctAnswer: "Mime (Pantomime)",
            explanation: "Mime is the theatrical technique of silent dramatization using physical gesture and bodily expression.",
            hintLadder: [
              "It is completely silent acting.",
              "Think of someone trapped in an invisible box.",
              "Mime (Pantomime)."
            ],
            misconceptionAlerts: [
              { trigger: "Radio broadcast", note: "Radio uses voice with zero visual movement; mime is purely visual with zero sound." }
            ],
            skillId: "skill-pri-dra-roleplay-mime",
            difficulty: "easy"
          },
          {
            id: "q-pri-dra-02",
            type: "multiple_choice",
            questionText: "What is 'voice projection' in theatrical drama?",
            options: [
              "Speaking clearly and loudly from the diaphragm so everyone in the audience can hear",
              "Whispering so nobody understands your lines",
              "Playing recorded music from a radio",
              "Turning your back and speaking into the wall"
            ],
            correctAnswer: "Speaking clearly and loudly from the diaphragm so everyone in the audience can hear",
            explanation: "Voice projection directs sound power outward through diaphragmatic support and clear articulation so words carry across a hall.",
            hintLadder: [
              "Actors must be heard by the audience sitting in the last row.",
              "It requires good breathing and clear speech.",
              "Speaking clearly and loudly from the diaphragm."
            ],
            misconceptionAlerts: [
              { trigger: "Whispering so nobody understands your lines", note: "Whispering without projection makes you inaudible to spectators." }
            ],
            skillId: "skill-pri-dra-roleplay-mime",
            difficulty: "easy"
          },
          {
            id: "q-pri-dra-03",
            type: "multiple_choice",
            questionText: "What are the clothes and outfits worn by actors on stage to represent their characters called?",
            options: ["Costumes", "Uniforms", "Pajamas", "Bandages"],
            correctAnswer: "Costumes",
            explanation: "Costumes are the specific garments, masks, and accessories designed for theatrical performers to portray characters.",
            hintLadder: [
              "An actor playing a king wears a royal robe and crown.",
              "These theatrical outfits are called...",
              "Costumes."
            ],
            misconceptionAlerts: [
              { trigger: "Uniforms", note: "Uniforms identify school or work organizations, while costumes represent theatrical roles." }
            ],
            skillId: "skill-pri-dra-roleplay-mime",
            difficulty: "easy"
          }
        ]
      }
    ]
  },

  // 9. pri_financial_literacy
  {
    id: "unit-pri-financial-lit-01",
    subjectId: "pri_financial_literacy",
    level: "primary_foundations",
    title: "Needs vs Wants, Saving Money and Nigerian Currency",
    code: "FIN-LIT-01",
    description: "Distinguishing essential needs from discretionary wants, using piggy banks/savings accounts, understanding Naira and Kobo notes, and simple budgeting.",
    order: 1,
    category: "core",
    skills: [
      {
        id: "skill-pri-fin-needs-wants-saving",
        unitId: "unit-pri-financial-lit-01",
        title: "Needs vs Wants and the Power of Saving",
        code: "SKL-PRI-FIN-01",
        summary: "Classify family expenses into essential survival needs vs optional wants, and practice delayed gratification through saving.",
        objectives: [
          "Differentiate essential needs (food, water, shelter, medicine) from wants (toys, video games, candy)",
          "Identify Nigerian currency denominations (₦100, ₦200, ₦500, ₦1000 notes)",
          "Explain why saving money in a piggy bank or bank account provides emergency security"
        ],
        difficulty: "foundational",
        masteryPointsRequired: 100,
        lesson: {
          id: "les-pri-fin-saving",
          title: "Smart Money Kids: Needs, Wants, and the Piggy Bank Habit",
          hookAndIntuition: "If someone hands you ₦1,000 as a birthday gift, what should you do? Rush to buy sweets and plastic toys that break in ten minutes? Or tuck ₦500 into your piggy bank and buy a useful school notebook? Smart money habits start today!",
          conceptualExplanation: "Money is a medium of exchange earned through work and trade. 1) Needs: Things humans must have to survive and stay healthy (clean water, healthy food, shelter, clothes, medicine, school fees). 2) Wants: Things that are nice to have for fun but not essential for survival (designer sneakers, video games, ice cream). 3) Saving: Keeping a portion of your money unspent so it can grow and protect you in times of need or buy major future goals.",
          keyTermsAndFormulas: [
            { termOrSymbol: "Need", definition: "Something essential for human survival, health, and basic well-being.", practicalExample: "Nutritious food, clean drinking water, warm shelter." },
            { termOrSymbol: "Want", definition: "Something desired for comfort, entertainment, or luxury that is not required for survival.", practicalExample: "A new video game or extra lollipop." },
            { termOrSymbol: "Savings", definition: "Money set aside over time instead of spent immediately.", practicalExample: "Putting ₦100 into a piggy bank every week." }
          ],
          workedExamples: [
            {
              title: "Sorting a Shopping Basket: Needs vs Wants",
              problemStatement: "A mother and child go to the market with a tight budget. They list: Rice, Bottled Water, A Plastic Toy Robot, Malaria Medication, and Chocolate Candy. Which are NEEDS?",
              steps: [
                { stepNumber: 1, instruction: "Evaluate Rice and Water", reasoning: "Essential for nourishment and hydration -> NEED." },
                { stepNumber: 2, instruction: "Evaluate Medication", reasoning: "Essential for health and curing sickness -> NEED." },
                { stepNumber: 3, instruction: "Evaluate Toy and Candy", reasoning: "Fun, but one can survive without them -> WANT." }
              ],
              takeawayRule: "Always satisfy essential survival Needs first before spending any remaining funds on Wants."
            }
          ],
          commonMisconceptionsAndTraps: [
            {
              misconception: "Thinking saving money is only for rich adults.",
              whyItIsWrong: "Saving is a discipline: even saving ₦20 from pocket money builds the life habit of financial security.",
              correctCorrection: "Anyone can save regardless of age or income level."
            }
          ],
          guidedPracticePrompt: "Is a smartphone with video games a Need or a Want for an 8-year-old child? Explain why.",
          summaryRecap: "Prioritize Needs over Wants, recognize Nigerian currency notes, and save money consistently to build a bright future."
        },
        questions: [
          {
            id: "q-pri-fin-01",
            type: "multiple_choice",
            questionText: "Which of the following is an ESSENTIAL NEED for human health and survival?",
            options: [
              "Clean drinking water and nutritious food",
              "A toy sports car",
              "A box of bubblegum",
              "A video game console"
            ],
            correctAnswer: "Clean drinking water and nutritious food",
            explanation: "Water and food are vital physiological needs required to sustain human biological life.",
            hintLadder: [
              "Which of these can you literally not survive without?",
              "Your body will perish without it.",
              "Clean drinking water and nutritious food."
            ],
            misconceptionAlerts: [
              { trigger: "A video game console", note: "Video games are fun entertainment (wants), not biological survival needs." }
            ],
            skillId: "skill-pri-fin-needs-wants-saving",
            difficulty: "easy"
          },
          {
            id: "q-pri-fin-02",
            type: "multiple_choice",
            questionText: "What is the official currency of the Federal Republic of Nigeria?",
            options: [
              "Naira (₦) and Kobo",
              "US Dollars ($)",
              "British Pounds (£)",
              "Euros (€)"
            ],
            correctAnswer: "Naira (₦) and Kobo",
            explanation: "The official legal tender currency issued by the Central Bank of Nigeria is the Naira (divided into 100 Kobo).",
            hintLadder: [
              "The symbol has a capital N with two horizontal crossbars: ₦.",
              "100 kobo equals one...",
              "Naira (₦) and Kobo."
            ],
            misconceptionAlerts: [
              { trigger: "US Dollars ($)", note: "The US Dollar is the currency of the United States; Nigeria's official legal tender is the Naira." }
            ],
            skillId: "skill-pri-fin-needs-wants-saving",
            difficulty: "easy"
          },
          {
            id: "q-pri-fin-03",
            type: "multiple_choice",
            questionText: "Why is saving a portion of your money in a savings box or bank account a wise habit?",
            options: [
              "It builds a financial cushion for emergencies and future goals",
              "It ensures your money disappears forever",
              "It prevents you from ever eating dinner",
              "It makes money dirty"
            ],
            correctAnswer: "It builds a financial cushion for emergencies and future goals",
            explanation: "Saving ensures money is available for unexpected emergencies, educational investments, and major future aspirations.",
            hintLadder: [
              "Saving stores value for the future.",
              "It protects you when unexpected problems arise.",
              "It builds a financial cushion for emergencies."
            ],
            misconceptionAlerts: [
              { trigger: "It ensures your money disappears forever", note: "Saving protects and preserves your money; spending it carelessly makes it disappear." }
            ],
            skillId: "skill-pri-fin-needs-wants-saving",
            difficulty: "easy"
          }
        ]
      }
    ]
  }
];
