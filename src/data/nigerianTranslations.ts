/**
 * MOOS TECHY ACADEMY — MULTI-LANGUAGE VERNACULAR INTUITION
 * 
 * Provides localized conceptual intuition in Nigerian languages:
 * - Yoruba
 * - Igbo
 * - Hausa
 * - Nigerian Pidgin English
 * 
 * Bridges abstract STEM/commercial principles with intuitive cultural and everyday life metaphors.
 */

import { NigerianLanguageLocalization } from "../types/contentSaturation";

export const NIGERIAN_LOCALIZATIONS: Record<string, NigerianLanguageLocalization> = {
  "skill-quad-factoring": {
    skillId: "skill-quad-factoring",
    pidgin: {
      intuitionHook: "Make you imagine say you throw football go up into the sky. The ball go fly go up, reach the highest point wey e fit reach, then e go come down fall for ground. That curve wey the ball take fly, na parabola! The quadratic equation dey help us calculate exactly where the ball go touch ground.",
      commonPitfallSummary: "No just forget the minus sign o! If you square negative number like (-3)², the answer na +9, no be -9. Shine your eye well well when you dey use the formula."
    },
    yoruba: {
      intuitionHook: "Bí o bá ju bọ́ọ̀lù sókè, yóò gòkè dé ibi tó ga jùlọ kí ó tó padà wálẹ̀ sí ilẹ̀. Àwòrán tí bọ́ọ̀lù náà yà yìí ni a ń pè ní 'parabola'. 'Quadratic equation' ń ran wá lọ́wọ́ láti mọ àkókò àti ibi tí bọ́ọ̀lù náà yóò balẹ̀ sí.",
      commonPitfallSummary: "Ṣọ́ra gidigidi fún àwọn àmì odi (-). Nígbà tí o bá sọ nọ́ḿbà odi di onígun mẹ́rin, àbájáde rẹ̀ gbọ́dọ̀ jẹ́ rere (+)."
    },
    igbo: {
      intuitionHook: "Tụba bọọlụ elu, ọ ga-ebili ruo n'ebe kachasị elu tupu ọ daa n'ala. Ụzọ ahụ bọọlụ ahụ si fee na-akpọ 'parabola'. 'Quadratic equation' na-enyere anyị aka ịmata ebe kpọmkwem bọọlụ ahụ ga-adakwasị n'ala.",
      commonPitfallSummary: "Kpachara anya maka akara mwepu (-). Ọ bụrụ na i mụbaa nọmba mwepu n'onwe ya, azịza ya na-abụ nke mgbakwunye (+)."
    },
    hausa: {
      intuitionHook: "Idan ka jefa kwallo sama, zai hau har zuwa matsayi mafi girma sannan ya dawo kasa. Hanyar da kwallon ta bi ana kiranta 'parabola'. Wannan lissafin 'quadratic' yana taimaka mana mu san ainihin lokacin da kwallon zai taba kasa.",
      commonPitfallSummary: "Ka kula sosai da alamar diba (-). Idan ka ninka lamba mara kyau sau biyu, amsar tana zama mai kyau (+)."
    }
  },
  "skill-econ-equilibrium-shifts": {
    skillId: "skill-econ-equilibrium-shifts",
    pidgin: {
      intuitionHook: "Think about Mile 12 market for Lagos. When tomato plenty for market, market women go lower price so say customer go buy am before e spoil. But when tomato scarce, price go jump go up. The exact price wey both buyer and seller agree on without fight, na him be Market Equilibrium.",
      commonPitfallSummary: "If na only price change, customer go just buy more or less (movement along curve). But if road bad so tomato no fit enter town at all, the whole supply curve don shift left!"
    },
    yoruba: {
      intuitionHook: "Ní ọjà ńlá, nígbà tí tòmáàtì bá pọ̀ lórí àtẹ, àwọn oníṣòwò yóò dín owó rẹ̀ kù kí ó lè tà kíákíá. Ṣùgbọ́n tí tòmáàtì bá wọ́n, owó rẹ̀ yóò wọ́n sókè. Owó tí olùrà àti olùtajà fohùnṣọ̀kan lórí rẹ̀ ni a ń pè ní 'Market Equilibrium'.",
      commonPitfallSummary: "Má ṣe da ìyípadà nínú iye tí wọ́n ń béèrè pọ̀ mọ́ ìyípadà nínú gbogbo ìbéèrè lápapọ̀."
    },
    igbo: {
      intuitionHook: "Chee echiche banyere ahịa mgbe tomato juru ebe niile. Ndị na-ere ahịa na-ebelata ọnụahịa ka ndị mmadụ wee zụta ya ngwa ngwa. Mana mgbe tomato dị ụkọ, ọnụahịa na-arị elu. Ọnụahịa ahụ onye na-ere na onye na-azụ kwenyere na ya bụ 'Market Equilibrium'.",
      commonPitfallSummary: "Kpachara anya ka ị ghara ịgbagwoju mgbanwe ọnụahịa na mgbanwe na ọchịchọ n'ozuzu ya."
    },
    hausa: {
      intuitionHook: "A cikin kasuwa, lokacin da tumatir yake da yawa, farashi yana sauka domin kowa ya saya kafin ya lalace. Amma idan tumatir ya yi karanci, farashi yana tashi. Farashin da mai siyarwa da mai siye suka yarda da shi ba tare da gardama ba shine 'Market Equilibrium'.",
      commonPitfallSummary: "Kada ka rikita sauyin farashi da sauyin bukata gaba daya."
    }
  },
  "skill-fin-50-30-20-budgeting": {
    skillId: "skill-fin-50-30-20-budgeting",
    pidgin: {
      intuitionHook: "Salary just land, and within one week, money don disappear finish! Why? Because person no plan am. With the 50/30/20 rule: half of your money (50%) na for chop, house rent, and transport (Needs). 30% na for small enjoyment (Wants). Then that 20% na your future armor—put am inside savings before you even touch anything!",
      commonPitfallSummary: "No dey wait till month end before you save wetin remain o! Wetin remain dey always be zero. Comot the 20% first thing on pay day."
    },
    yoruba: {
      intuitionHook: "Bí owó oṣù bá wọlé, láàárín ọ̀sẹ̀ kan ó lè tán pátápátá bí ènìyàn kò bá ṣètò. Pẹ̀lú ètò 50/30/20: ìdajì owó rẹ (50%) wà fún oúnjẹ, ilé àti ọkọ̀. 30% wà fún ìgbádùn díẹ̀. 20% sì gbọ́dọ̀ wà fún ìpamọ́ ọjọ́ ọ̀la rẹ.",
      commonPitfallSummary: "Má ṣe dúró di òpin oṣù kí o tó fi owó pamọ́; yọ ìpín 20% rẹ lẹ́sẹ̀kẹsẹ̀ tí owó bá ti dé."
    },
    igbo: {
      intuitionHook: "Mgbe ụgwọ ọnwa batara, ọ nwere ike ịgwụ n'ime otu izu ma ọ bụrụ na e nweghị atụmatụ. N'usoro 50/30/20: ọkara (50%) bụ maka nri, ụlọ na njem. 30% bụ maka ntụrụndụ. 20% bụ maka ego nchekwa nke ọdịnihu gị.",
      commonPitfallSummary: "Echela ruo na ngwụcha ọnwa tupu ị chekwaa ego; wepụta 20% gị ozugbo ego batara."
    },
    hausa: {
      intuitionHook: "Lokacin da albashi ya shigo, yana iya karewa cikin mako guda idan babu tsari. A tsarin 50/30/20: rabi (50%) na abinci, haya da sufuri ne. 30% na jin dadi ne. Sannan 20% na ajiya ne domin gaba.",
      commonPitfallSummary: "Kada ka jira karshen wata kafin ka yi ajiya; cire kashi 20% dinka da zarar kudi sun shigo."
    }
  },
  "skill-eng-concord": {
    skillId: "skill-eng-concord",
    pidgin: {
      intuitionHook: "For English grammar, subject and verb must agree like two dance partners wey dey do legwork together. If the subject na one person (singular), the verb must carry 's' for present tense ('He runs'). If they plenty (plural), the verb no go carry 's' ('They run'). If them join people with 'as well as', na only the first oga you go look!",
      commonPitfallSummary: "No let long long words fool you! If you see 'The driver, together with all his passengers, was injured', na singular 'was' you go use because na 'the driver' be the real master."
    },
    yoruba: {
      intuitionHook: "Ní èdè Gẹ̀ẹ́sì, olú-ọ̀rọ̀ àti ọ̀rọ̀-ìṣe gbọ́dọ̀ dọ́gba bí àwọn olùjó méjì tí ń jó ní ìbámu. Bí olú-ọ̀rọ̀ bá jẹ́ ẹyọ kan, ọ̀rọ̀-ìṣe náà gbọ́dọ̀ tẹ̀lé ìlànà ẹyọ náà.",
      commonPitfallSummary: "Má ṣe jẹ́ kí àwọn gbólóhùn àbọ̀ tí ó wà láàárín àwọn àmì kọma ṣì ọ́ lọ́nà; olú-ọ̀rọ̀ àkọ́kọ́ ni ó ń darí ọ̀rọ̀-ìṣe."
    },
    igbo: {
      intuitionHook: "Na ụtọasụsụ Bekee, isi okwu na ngwaa ga-adịrịrị n'otu. Ọ bụrụ na isi okwu bụ otu onye, ngwaa ahụ ga-eso usoro otu onye ahụ.",
      commonPitfallSummary: "Ekwekwala ka ahịrịokwu ndị ọzọ dị n'etiti ghọgbuo gị; leba anya n'isi okwu mbụ."
    },
    hausa: {
      intuitionHook: "A cikin nahawun Turanci, suna da aiki dole ne su tafi tare cikin jituwa. Idan abin da ake magana a kansa guda daya ne, aikin ma dole ne ya bi tsarin guda daya.",
      commonPitfallSummary: "Kada ka bari dogayen kalmomi su rikita ka; babban mai yin aiki na farko shine mai mahimmanci."
    }
  },
  "skill-phy-circuits": {
    skillId: "skill-phy-circuits",
    pidgin: {
      intuitionHook: "Think about water pipe wey dey pump water enter house. The battery na the water pump (Voltage), the water wey dey flow na the Current, and small gravel wey dey block the pipe na Resistance. If you open wide pipe (low resistance), plenty water go rush pass! Na so Ohm's Law (V = IR) take simple.",
      commonPitfallSummary: "Light bulb no dey 'chop' or swallow current finish. Wetin enter must come out! Wetin bulb take na the electrical power make e turn to light and heat."
    },
    yoruba: {
      intuitionHook: "Ronú nípa ẹ̀rọ tí ń fa omi sínú páìpù. Bátìrì jẹ́ bí ẹ̀rọ náà (Voltage), omi tí ń sàn ni Iná (Current), àwọn òkúta tí ń dènà omi sì ni Ìdènà (Resistance). Bí ìdènà bá dínkù, iná púpọ̀ yóò sàn kọjá.",
      commonPitfallSummary: "Iná mànàmáná kì í tán sí inú gílóbù; agbára iná náà ni a ń yí padà sí ìmọ́lẹ̀ àti ooru."
    },
    igbo: {
      intuitionHook: "Chee echiche banyere paịpụ mmiri. Batrị na-arụ ọrụ dị ka pọmpụ (Voltage), mmiri na-asọ bụ ọkụ eletrik (Current), ihe na-egbochi mmiri bụ Nguzogide (Resistance).",
      commonPitfallSummary: "Bọlbụ anaghị eri ọkụ mebie ya; ọ na-agbanwe ume eletrik ka ọ bụrụ ọkụ na okpomọkụ."
    },
    hausa: {
      intuitionHook: "Yi tunanin bututun ruwa. Batir kamar famfo yake (Voltage), ruwan da ke gudu shine Wutar lantarki (Current), abubuwan da ke tare ruwan kuma sune Juriyarsa (Resistance).",
      commonPitfallSummary: "Kwan lantarki ba ya shanye wuta gaba daya; yana canza karfin wutar ne zuwa haske da dumi."
    }
  },
  "skill-frac-operations": {
    skillId: "skill-frac-operations",
    pidgin: {
      intuitionHook: "Make you imagine say your mama buy one big round bread (Agege bread). She slice am into 4 equal pieces. If you chop 1 slice, you don chop 1 out of 4 (1/4). That number for under (4) na the family size; the one for up (1) na wetin dey your plate!",
      commonPitfallSummary: "Never never add the numbers wey dey under! If you join 1/2 bread and 1/3 bread, no talk say na 2/5 bread. You must cut both of them into 6 equal parts first (3/6 + 2/6 = 5/6)."
    },
    yoruba: {
      intuitionHook: "Bí wọ́n bá gé búrẹ́dì sí apá mẹ́rin dọ́gba, tí o sì jẹ ẹyọ kan, o ti jẹ ìpín kan nínú mẹ́rin (1/4). Nọ́ḿbà ìsàlẹ̀ ń sọ iye tí a pín gbogbo rẹ̀ sí, ti òkè sì ń sọ iye tí o mú.",
      commonPitfallSummary: "Má ṣe ro àwọn nọ́ḿbà ìsàlẹ̀ pọ̀ rárá nígbà tí o bá ń ṣe àròpọ̀ àwọn ìpín tí kò dọ́gba."
    },
    igbo: {
      intuitionHook: "Ọ bụrụ na e kee achịcha ụzọ anọ hà nhata ma ị rie otu, i riela otu n'ime anọ (1/4). Nọmba ala na-egosi ngụkọta nke e kere ya, nke elu na-egosi nke gị nwere.",
      commonPitfallSummary: "Ejikọtala nọmba ndị dị n'ala mgbe ị na-atụkọta nkeji dị iche iche."
    },
    hausa: {
      intuitionHook: "Idan aka yanka biredi gida hudu daidai kuma ka ci daya, ka ci daya cikin hudu (1/4). Lambar kasa tana nuna adadin da aka raba shi, ta sama kuma tana nuna abin da ka dauka.",
      commonPitfallSummary: "Kada ka taba hada lambobin kasa waje guda lokacin da kake tara rabe-raben da ba su daidaita ba."
    }
  }
};
