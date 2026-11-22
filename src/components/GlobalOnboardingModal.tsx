import React, { useState } from "react";
import {
  Globe,
  MapPin,
  CheckCircle2,
  BookOpen,
  Award,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Languages,
  X
} from "lucide-react";
import { CountryCode, EducationSystemCode, EducationalLevel } from "../types/curriculum";
import { ExtendedLearnerProfile } from "../types/learner";
import { SUPPORTED_EDUCATION_SYSTEMS } from "../data/curriculumMappingsData";

interface GlobalOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ExtendedLearnerProfile;
  onSaveProfile: (updated: ExtendedLearnerProfile) => void;
}

interface CountryOption {
  code: CountryCode;
  name: string;
  flag: string;
  defaultEducationSystem: EducationSystemCode;
  defaultExamPathway: string;
  defaultInterfaceLang: string;
  defaultLearningLang: string;
  localLanguages: string[];
}

const COUNTRIES: CountryOption[] = [
  {
    code: "NG",
    name: "Nigeria",
    flag: "🇳🇬",
    defaultEducationSystem: "WAEC",
    defaultExamPathway: "WAEC WASSCE & JAMB UTME",
    defaultInterfaceLang: "English",
    defaultLearningLang: "English",
    localLanguages: ["Yoruba", "Igbo", "Hausa", "Nigerian Pidgin", "None / English Only"]
  },
  {
    code: "UK",
    name: "United Kingdom",
    flag: "🇬🇧",
    defaultEducationSystem: "GCSE",
    defaultExamPathway: "GCSE & A-Level",
    defaultInterfaceLang: "English (UK)",
    defaultLearningLang: "English",
    localLanguages: ["Welsh", "Scottish Gaelic", "None"]
  },
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    defaultEducationSystem: "US_CCSS",
    defaultExamPathway: "SAT / ACT & AP Standards",
    defaultInterfaceLang: "English (US)",
    defaultLearningLang: "English",
    localLanguages: ["Spanish (Español)", "None"]
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    defaultEducationSystem: "CANADA_PROVINCIAL",
    defaultExamPathway: "OSSLT / Diploma Exams",
    defaultInterfaceLang: "English (Canada)",
    defaultLearningLang: "English",
    localLanguages: ["French (Français)", "None"]
  },
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    defaultEducationSystem: "JAPAN_MEXT",
    defaultExamPathway: "Daigaku Nyūgaku Kyōtsū Test",
    defaultInterfaceLang: "Japanese (日本語)",
    defaultLearningLang: "Japanese / English Bilingual",
    localLanguages: ["Japanese (日本語)", "None"]
  },
  {
    code: "CN",
    name: "China",
    flag: "🇨🇳",
    defaultEducationSystem: "CHINA_NATIONAL",
    defaultExamPathway: "National College Entrance Exam (Gaokao)",
    defaultInterfaceLang: "Simplified Chinese (简体中文)",
    defaultLearningLang: "Mandarin Chinese",
    localLanguages: ["Mandarin", "Cantonese", "None"]
  },
  {
    code: "KR",
    name: "South Korea",
    flag: "🇰🇷",
    defaultEducationSystem: "KOREA_CSAT",
    defaultExamPathway: "CSAT / Suneung College Exam",
    defaultInterfaceLang: "Korean (한국어)",
    defaultLearningLang: "Korean / English Bilingual",
    localLanguages: ["Korean (한국어)", "None"]
  },
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    defaultEducationSystem: "INDIA_CBSE",
    defaultExamPathway: "CBSE Board & JEE / NEET",
    defaultInterfaceLang: "English (India)",
    defaultLearningLang: "English",
    localLanguages: ["Hindi", "Tamil", "Telugu", "Bengali", "None"]
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    defaultEducationSystem: "AUSTRALIA_ACARA",
    defaultExamPathway: "ATAR (HSC / VCE / QCE)",
    defaultInterfaceLang: "English (Australia)",
    defaultLearningLang: "English",
    localLanguages: ["None"]
  },
  {
    code: "ZA",
    name: "South Africa",
    flag: "🇿🇦",
    defaultEducationSystem: "SOUTH_AFRICA_CAPS",
    defaultExamPathway: "National Senior Certificate (Matric)",
    defaultInterfaceLang: "English",
    defaultLearningLang: "English",
    localLanguages: ["isiZulu", "isiXhosa", "Afrikaans", "None"]
  },
  {
    code: "INTL",
    name: "Other / International",
    flag: "🌍",
    defaultEducationSystem: "CAMBRIDGE_IGCSE",
    defaultExamPathway: "Cambridge IGCSE & International Baccalaureate",
    defaultInterfaceLang: "English (International)",
    defaultLearningLang: "English",
    localLanguages: ["French", "Arabic", "Portuguese", "None"]
  }
];

export const GlobalOnboardingModal: React.FC<GlobalOnboardingModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile
}) => {
  const currentCountry = profile.academicContext?.country || "NG";
  const matchedCountry = COUNTRIES.find((c) => c.code === currentCountry) || COUNTRIES[0];

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(matchedCountry);

  // Separated dimensional settings as mandated by Phase 11
  const [interfaceLanguage, setInterfaceLanguage] = useState(
    profile.academicContext?.interfaceLanguage || matchedCountry.defaultInterfaceLang
  );
  const [learningLanguage, setLearningLanguage] = useState(
    profile.academicContext?.learningLanguage || matchedCountry.defaultLearningLang
  );
  const [localHeritageLanguage, setLocalHeritageLanguage] = useState(
    profile.academicContext?.localHeritageLanguage || matchedCountry.localLanguages[0]
  );
  const [curriculumSystem, setCurriculumSystem] = useState<EducationSystemCode>(
    profile.academicContext?.educationSystem || matchedCountry.defaultEducationSystem
  );
  const [targetExamPathway, setTargetExamPathway] = useState(
    profile.academicContext?.targetExamPathway || matchedCountry.defaultExamPathway
  );
  const [targetLevel, setTargetLevel] = useState<EducationalLevel>(
    profile.targetLevel || "senior_secondary"
  );

  if (!isOpen) return null;

  const handleSelectCountry = (country: CountryOption) => {
    setSelectedCountry(country);
    setInterfaceLanguage(country.defaultInterfaceLang);
    setLearningLanguage(country.defaultLearningLang);
    setLocalHeritageLanguage(country.localLanguages[0]);
    setCurriculumSystem(country.defaultEducationSystem);
    setTargetExamPathway(country.defaultExamPathway);
    setStep(2);
  };

  const handleComplete = () => {
    const updated: ExtendedLearnerProfile = {
      ...profile,
      targetLevel,
      academicContext: {
        country: selectedCountry.code,
        educationSystem: curriculumSystem,
        gradeOrYear: targetLevel.replace("_", " ").toUpperCase(),
        targetExamPathway,
        jurisdiction: selectedCountry.name,
        interfaceLanguage,
        learningLanguage,
        localHeritageLanguage,
        onboardingCompleted: true
      },
      updatedAt: new Date().toISOString()
    };

    onSaveProfile(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 block">
                MOOS Academy • Global Localization
              </span>
              <h2 className="text-lg font-bold text-white">
                {step === 1 ? "Where are you learning from?" : "Confirm Your Academic & Language Framework"}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {step === 1 ? (
            <div className="space-y-4">
              <p className="text-sm text-slate-400 leading-relaxed">
                Select your primary country or region below. We do not force device location permission;
                you have full control to adapt your curriculum standards and local language support at any time.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {COUNTRIES.map((c) => {
                  const isSelected = selectedCountry.code === c.code;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => handleSelectCountry(c)}
                      className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-800/40"
                      }`}
                    >
                      <span className="text-2xl">{c.flag}</span>
                      <div className="overflow-hidden">
                        <span className="text-sm font-bold block text-white truncate">{c.name}</span>
                        <span className="text-[11px] text-slate-400 block truncate">
                          {c.defaultEducationSystem}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-800/50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{selectedCountry.flag}</span>
                  <div>
                    <span className="text-xs text-indigo-300 font-bold block">Selected Region:</span>
                    <span className="text-sm font-bold text-white">{selectedCountry.name}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 px-3 py-1 rounded-xl bg-indigo-900/50 border border-indigo-700/50 cursor-pointer"
                >
                  Change Country
                </button>
              </div>

              {/* Dimensional Separation Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Interface Language */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-sky-400" />
                    <span>Interface Language:</span>
                  </label>
                  <input
                    type="text"
                    value={interfaceLanguage}
                    onChange={(e) => setInterfaceLanguage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-[10px] text-slate-500">Language for buttons, navigation and menus.</span>
                </div>

                {/* 2. Learning Language */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Instruction / Learning Language:</span>
                  </label>
                  <input
                    type="text"
                    value={learningLanguage}
                    onChange={(e) => setLearningLanguage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-[10px] text-slate-500">Primary language of pedagogical notes and lessons.</span>
                </div>

                {/* 3. Local / Heritage Language Support */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Local / Heritage Language Scaffolding:</span>
                  </label>
                  <select
                    value={localHeritageLanguage}
                    onChange={(e) => setLocalHeritageLanguage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    {selectedCountry.localLanguages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-slate-500">Cultural analogies, vernacular intuition and everyday idioms.</span>
                </div>

                {/* 4. Curriculum System */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Curriculum Standard:</span>
                  </label>
                  <select
                    value={curriculumSystem}
                    onChange={(e) => setCurriculumSystem(e.target.value as EducationSystemCode)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    {SUPPORTED_EDUCATION_SYSTEMS.map((sys) => (
                      <option key={sys.code} value={sys.code}>
                        {sys.countryName}: {sys.shortLabel}
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-slate-500">Official syllabus framework governing competencies.</span>
                </div>

                {/* 5. Examination Pathway */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-purple-400" />
                    <span>Examination Pathway:</span>
                  </label>
                  <input
                    type="text"
                    value={targetExamPathway}
                    onChange={(e) => setTargetExamPathway(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-[10px] text-slate-500">e.g. WAEC WASSCE, JAMB UTME, GCSE, A-Level, SAT.</span>
                </div>

                {/* 6. Target Educational Level */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>Target Educational Level:</span>
                  </label>
                  <select
                    value={targetLevel}
                    onChange={(e) => setTargetLevel(e.target.value as EducationalLevel)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="primary_foundations">Primary Foundations (Grades 1-3)</option>
                    <option value="upper_primary">Upper Primary (Grades 4-6)</option>
                    <option value="junior_secondary">Junior Secondary (JSS1-3 / Key Stage 3)</option>
                    <option value="senior_secondary">Senior Secondary (SS1-3 / Key Stage 4 / High School)</option>
                    <option value="university_prep">University Prep / Advanced (A-Levels / AP)</option>
                    <option value="exam_prep">Standardized Exam Intensive Prep</option>
                  </select>
                  <span className="text-[10px] text-slate-500">Adapts Socratic hints, diagnostic readiness & syllabus filters.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          {step === 2 ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer"
            >
              Back to Countries
            </button>
          ) : (
            <div />
          )}

          {step === 2 && (
            <button
              type="button"
              onClick={handleComplete}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Apply Learning Framework</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
