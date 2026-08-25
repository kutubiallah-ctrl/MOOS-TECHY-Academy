import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Lock,
  ChevronRight,
  Layers,
  Sparkles,
  Trophy,
  Filter,
  Search,
  Binary,
  Atom,
  Cpu,
  TrendingUp,
  GraduationCap,
  Calculator,
  Compass,
  Variable,
  Activity,
  Globe,
  CheckCheck,
  Info,
  ShieldCheck
} from "lucide-react";
import { LEARNING_DOMAINS, MATHEMATICS_UNITS, SUBJECTS } from "../data/curriculumData";
import {
  EducationalLevel,
  CurriculumStandard,
  Skill,
  Unit,
  MasteryRecord,
  CurriculumStandardMapping
} from "../types/curriculum";
import { curriculumService } from "../services/curriculumService";

interface CurriculumNavigatorProps {
  onSelectSkill: (skill: Skill, unit: Unit) => void;
  masteryRecords: Record<string, MasteryRecord>;
  currentLevel: EducationalLevel;
  onLevelChange: (level: EducationalLevel) => void;
}

export const CurriculumNavigator: React.FC<CurriculumNavigatorProps> = ({
  onSelectSkill,
  masteryRecords,
  currentLevel,
  onLevelChange
}) => {
  const [selectedDomainId, setSelectedDomainId] = useState<string>("mathematics");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStandard, setSelectedStandard] = useState<string>("ALL");
  const [inspectedMapping, setInspectedMapping] = useState<CurriculumStandardMapping | null>(null);

  const levelOptions: { id: EducationalLevel; label: string }[] = [
    { id: "primary_foundations", label: "Foundations Primary" },
    { id: "upper_primary", label: "Upper Primary (Pri 4-6)" },
    { id: "junior_secondary", label: "Junior Secondary (JSS 1-3)" },
    { id: "senior_secondary", label: "Senior Secondary (SSS 1-3)" },
    { id: "university_prep", label: "University & Advanced Prep" }
  ];

  const supportedSystems = curriculumService.getSupportedEducationSystems();
  const standards = [
    { id: "ALL", label: "All Curricula", icon: "🌍" },
    ...supportedSystems.map((s) => ({
      id: s.code,
      label: s.shortLabel,
      icon: s.defaultFlagEmoji
    }))
  ];

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case "Binary": return <Binary className="h-4 w-4" />;
      case "Atom": return <Atom className="h-4 w-4" />;
      case "Cpu": return <Cpu className="h-4 w-4" />;
      case "TrendingUp": return <TrendingUp className="h-4 w-4" />;
      case "BookOpen": return <BookOpen className="h-4 w-4" />;
      case "GraduationCap": return <GraduationCap className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const filteredUnits = MATHEMATICS_UNITS.filter((unit) => {
    const matchesLevel = unit.level === currentLevel || currentLevel === "senior_secondary" || unit.level === "senior_secondary";
    const matchesSearch =
      unit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.skills.some((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by standard if selected
    if (selectedStandard !== "ALL") {
      const unitHasMappedSkill = unit.skills.some((s) => {
        const mappings = curriculumService.getCompetencyMappings(s.id);
        return mappings.some((m) => m.curriculumSystem === selectedStandard);
      });
      if (!unitHasMappedSkill) return false;
    }

    return matchesSearch;
  });

  return (
    <div id="curriculum-navigator-view" className="space-y-6 max-w-6xl mx-auto">
      {/* Domain Switcher Ribbon (Extensible Multidisciplinary Architecture) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Multidisciplinary Learning Domains
            </span>
          </div>
          <span className="text-xs text-slate-400">Extensible Global Taxonomy</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {LEARNING_DOMAINS.map((domain) => {
            const isSelected = selectedDomainId === domain.id;
            return (
              <button
                key={domain.id}
                id={`domain-tab-${domain.id}`}
                type="button"
                onClick={() => setSelectedDomainId(domain.id)}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/70 shadow-xs ring-1 ring-indigo-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className={`p-1.5 rounded-lg ${
                      isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {getDomainIcon(domain.iconName)}
                  </div>
                  {domain.isFlagship && (
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">
                      Flagship
                    </span>
                  )}
                  {!domain.isFlagship && domain.status === "expanding" && (
                    <span className="text-[10px] font-medium bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded-full">
                      Expanding
                    </span>
                  )}
                </div>
                <div className="font-bold text-xs text-slate-900 line-clamp-1">{domain.name}</div>
                <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{domain.subjectsCount} Subjects</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Level & Standard Filter Bar */}
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Level Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {levelOptions.map((lvl) => (
              <button
                key={lvl.id}
                id={`level-filter-${lvl.id}`}
                type="button"
                onClick={() => onLevelChange(lvl.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                  currentLevel === lvl.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px] flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, quadratics, calculus..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-3.5 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* International Curriculum Pathway Tabs */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium shrink-0 pr-1">
            <Globe className="h-3.5 w-3.5 text-indigo-600" />
            <span>Curriculum:</span>
          </div>
          {standards.map((std) => {
            const isSelected = selectedStandard === std.id;
            return (
              <button
                key={std.id}
                type="button"
                onClick={() => setSelectedStandard(std.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition border ${
                  isSelected
                    ? "bg-indigo-50 border-indigo-300 text-indigo-900 font-semibold shadow-xs"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <span>{std.icon}</span>
                <span>{std.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Non-Flagship Domain Notice */}
      {selectedDomainId !== "mathematics" && (
        <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-6 text-center space-y-2">
          <Sparkles className="h-6 w-6 text-teal-600 mx-auto" />
          <h3 className="text-sm font-bold text-teal-950">
            {LEARNING_DOMAINS.find((d) => d.id === selectedDomainId)?.name} Architecture Active
          </h3>
          <p className="text-xs text-teal-800 max-w-xl mx-auto leading-relaxed">
            The underlying taxonomy, diagnostic engine, mastery records, and Socratic AI tutor natively support this domain. Mathematics is currently the primary live production roll-out.
          </p>
          <button
            type="button"
            onClick={() => setSelectedDomainId("mathematics")}
            className="mt-2 text-xs font-semibold text-teal-700 underline hover:text-teal-900"
          >
            Switch to Flagship Mathematics Rollout
          </button>
        </div>
      )}

      {/* Units & Skills Grid (Flagship Math) */}
      <div className="space-y-6">
        {filteredUnits.map((unit) => (
          <div
            key={unit.id}
            id={`unit-card-${unit.id}`}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-slate-300"
          >
            {/* Unit Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 font-bold font-mono text-xs border border-indigo-100">
                  {unit.code.replace("UNIT-", "U")}
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{unit.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{unit.description}</p>
                </div>
              </div>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 uppercase">
                {unit.category.replace("_", " ")}
              </span>
            </div>

            {/* Skills in this Unit */}
            <div className="mt-4 grid md:grid-cols-2 gap-3.5">
              {unit.skills.map((skill) => {
                const record = (masteryRecords || {})[skill.id];
                const points = record?.points || 0;
                const status = record?.status || "unstarted";

                let statusBadge = (
                  <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
                    Unstarted
                  </span>
                );

                if (status === "mastered") {
                  statusBadge = (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      <span>Mastered (100 pts)</span>
                    </span>
                  );
                } else if (status === "proficient") {
                  statusBadge = (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                      <Trophy className="h-3 w-3 text-indigo-600" />
                      <span>Proficient ({points} pts)</span>
                    </span>
                  );
                } else if (status === "familiar") {
                  statusBadge = (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                      <span>Familiar ({points} pts)</span>
                    </span>
                  );
                }

                return (
                  <div
                    key={skill.id}
                    id={`skill-card-${skill.id}`}
                    className="flex flex-col justify-between rounded-xl border border-slate-100 bg-slate-50/40 p-4 transition hover:border-indigo-300 hover:bg-indigo-50/20"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono text-slate-400 font-semibold">
                          {skill.code}
                        </span>
                        {statusBadge}
                      </div>

                      <h4 className="text-sm font-bold text-slate-900">{skill.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {skill.summary}
                      </p>

                      {/* Learning objectives preview */}
                      <div className="mt-3 space-y-1">
                        {skill.objectives.slice(0, 2).map((obj, oIdx) => (
                          <div key={oIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                            <span className="h-1 w-1 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                            <span className="line-clamp-1">{obj}</span>
                          </div>
                        ))}
                      </div>

                      {/* Standard Mappings (Universal Curriculum Layer) */}
                      {(() => {
                        const mappings = curriculumService.getCompetencyMappings(skill.id);
                        if (mappings.length === 0) return null;
                        return (
                          <div className="mt-3 pt-2.5 border-t border-slate-200/50">
                            <div className="flex items-center gap-1 mb-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                              <ShieldCheck className="h-3 w-3 text-indigo-500" />
                              <span>Verified Curriculum Standards</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {mappings.map((m) => {
                                const flag =
                                  m.country === "NG" ? "🇳🇬" :
                                  m.country === "UK" || m.country === "GB" ? "🇬🇧" :
                                  m.country === "US" ? "🇺🇸" :
                                  m.country === "INTL" ? "🌍" : "🌐";
                                return (
                                  <button
                                    key={m.id}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setInspectedMapping(m);
                                    }}
                                    title={`Click to view verified syllabus details for ${m.curriculumSystem} (${m.standardIdentifier})`}
                                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-[10px] font-medium text-slate-700 hover:text-indigo-900 transition shadow-2xs"
                                  >
                                    <span>{flag}</span>
                                    <span className="font-semibold text-slate-800">{m.curriculumSystem.replace("_", " ")}:</span>
                                    <span className="font-mono text-slate-500 text-[9px]">{m.standardIdentifier}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Launch Practice Button */}
                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        {skill.questions.length} Core Questions
                      </span>
                      <button
                        type="button"
                        onClick={() => onSelectSkill(skill, unit)}
                        className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition py-1 px-2.5 rounded-lg hover:bg-indigo-50"
                      >
                        <span>Enter Practice</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Inspected Mapping Modal (Non-breaking Verified Syllabus Citations) */}
      {inspectedMapping && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4"
          onClick={() => setInspectedMapping(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-base">
                  {inspectedMapping.country === "NG" ? "🇳🇬" :
                   inspectedMapping.country === "UK" || inspectedMapping.country === "GB" ? "🇬🇧" :
                   inspectedMapping.country === "US" ? "🇺🇸" : "🌍"}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {inspectedMapping.curriculumSystem.replace("_", " ")} Standard Mapping
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Official Code: {inspectedMapping.standardIdentifier}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                {inspectedMapping.verificationStatus.replace("_", " ")}
              </span>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl text-xs text-slate-700 border border-slate-100">
              <div>
                <span className="font-semibold text-slate-900 block mb-0.5">Official Standard Title / Objective:</span>
                <p className="italic text-slate-800">"{inspectedMapping.standardTitle}"</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Grade / Target Level</span>
                  <span className="font-medium text-slate-800">{inspectedMapping.gradeOrYear}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Alignment Confidence</span>
                  <span className="font-medium text-indigo-700">{Math.round(inspectedMapping.verificationMetadata.confidence * 100)}% Exact Match</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Official Source & Citation</span>
                <span className="font-medium text-slate-800">{inspectedMapping.verificationMetadata.sourceTitle} ({inspectedMapping.verificationMetadata.sourceDate || "2024"})</span>
              </div>

              {inspectedMapping.verificationMetadata.notes && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Curriculum Notes</span>
                  <p className="text-slate-600 text-[11px] mt-0.5">{inspectedMapping.verificationMetadata.notes}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setInspectedMapping(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
