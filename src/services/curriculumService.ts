import {
  LearningDomain,
  Subject,
  Unit,
  Skill,
  EducationalLevel,
  CurriculumStandard,
  PracticeQuestion,
  CurriculumStandardMapping,
  CanonicalCompetency,
  CountryCode,
  EducationSystemCode
} from "../types/curriculum";
import {
  LEARNING_DOMAINS,
  SUBJECTS
} from "../data/curriculumData";
import {
  ALL_CURRICULUM_UNITS
} from "../data/extendedCurriculumUnits";
import {
  CANONICAL_COMPETENCIES,
  CURRICULUM_STANDARD_MAPPINGS,
  SUPPORTED_EDUCATION_SYSTEMS
} from "../data/curriculumMappingsData";

export interface ICurriculumService {
  getDomains(): LearningDomain[];
  getDomainById(domainId: string): LearningDomain | undefined;
  getSubjects(domainId?: string): Subject[];
  getSubjectById(subjectId: string): Subject | undefined;
  getAllUnits(): Unit[];
  getUnits(subjectId?: string, level?: EducationalLevel): Unit[];
  getUnitById(unitId: string): Unit | undefined;
  getSkillById(skillId: string): Skill | undefined;
  getUnitBySkillId(skillId: string): Unit | undefined;
  getPrerequisitesForSkill(skillId: string): Skill[];
  getPrerequisiteChain(skillId: string): Skill[];
  searchCurriculum(query: string): Array<{ unit: Unit; skill: Skill }>;
  getCompetencyMappings(skillId: string): CurriculumStandardMapping[];
  getMappingsForSystem(system: EducationSystemCode | string): CurriculumStandardMapping[];
  getCanonicalCompetencies(): CanonicalCompetency[];
  getSupportedEducationSystems(): typeof SUPPORTED_EDUCATION_SYSTEMS;
}

class CurriculumService implements ICurriculumService {
  public getDomains(): LearningDomain[] {
    return LEARNING_DOMAINS;
  }

  public getDomainById(domainId: string): LearningDomain | undefined {
    return LEARNING_DOMAINS.find((d) => d.id === domainId);
  }

  public getSubjects(domainId?: string): Subject[] {
    if (domainId) {
      return SUBJECTS.filter((s) => s.domainId === domainId);
    }
    return SUBJECTS;
  }

  public getSubjectById(subjectId: string): Subject | undefined {
    return SUBJECTS.find((s) => s.id === subjectId);
  }

  public getAllUnits(): Unit[] {
    return ALL_CURRICULUM_UNITS;
  }

  public getUnits(subjectId?: string, level?: EducationalLevel): Unit[] {
    return ALL_CURRICULUM_UNITS.filter((u) => {
      const matchSubject = !subjectId || subjectId === "all" || u.subjectId === subjectId;
      const matchLevel = !level || u.level === level;
      return matchSubject && matchLevel;
    });
  }

  public getUnitById(unitId: string): Unit | undefined {
    return ALL_CURRICULUM_UNITS.find((u) => u.id === unitId);
  }

  public getSkillById(skillId: string): Skill | undefined {
    for (const unit of ALL_CURRICULUM_UNITS) {
      const skill = unit.skills.find((s) => s.id === skillId);
      if (skill) return skill;
    }

    // Canonical skill alias mapping for historical and cross-syllabus identifiers
    const CANONICAL_SKILL_ALIASES: Record<string, string> = {
      "skill-quad-02": "skill-quad-factoring",
      "skill-lin-01": "skill-linear-equations",
      "skill-geom-01": "skill-circle-theorems",
      "skill-geom-02": "skill-circle-theorems"
    };

    const targetAliasId = CANONICAL_SKILL_ALIASES[skillId];
    if (targetAliasId) {
      for (const unit of ALL_CURRICULUM_UNITS) {
        const skill = unit.skills.find((s) => s.id === targetAliasId);
        if (skill) return skill;
      }
    }

    return undefined;
  }

  public getUnitBySkillId(skillId: string): Unit | undefined {
    for (const unit of ALL_CURRICULUM_UNITS) {
      const skill = unit.skills.find((s) => s.id === skillId);
      if (skill) return unit;
    }
    return undefined;
  }

  public getPrerequisitesForSkill(skillId: string): Skill[] {
    const targetSkill = this.getSkillById(skillId);
    if (!targetSkill || !targetSkill.prerequisiteSkillIds) return [];

    const prereqs: Skill[] = [];
    for (const prereqId of targetSkill.prerequisiteSkillIds) {
      const found = this.getSkillById(prereqId);
      if (found) prereqs.push(found);
    }
    return prereqs;
  }

  public getPrerequisiteChain(skillId: string): Skill[] {
    const visited = new Set<string>();
    const chain: Skill[] = [];

    const traverse = (currentId: string) => {
      if (visited.has(currentId)) return;
      visited.add(currentId);

      const skill = this.getSkillById(currentId);
      if (!skill || !skill.prerequisiteSkillIds) return;

      for (const pId of skill.prerequisiteSkillIds) {
        if (!visited.has(pId)) {
          const prereqSkill = this.getSkillById(pId);
          if (prereqSkill) {
            traverse(pId);
            if (!chain.some((s) => s.id === prereqSkill.id)) {
              chain.push(prereqSkill);
            }
          }
        }
      }
    };

    traverse(skillId);
    return chain;
  }

  public searchCurriculum(query: string): Array<{ unit: Unit; skill: Skill }> {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const results: Array<{ unit: Unit; skill: Skill }> = [];

    for (const unit of ALL_CURRICULUM_UNITS) {
      for (const skill of unit.skills) {
        if (
          skill.title.toLowerCase().includes(q) ||
          skill.summary.toLowerCase().includes(q) ||
          skill.code.toLowerCase().includes(q) ||
          unit.title.toLowerCase().includes(q)
        ) {
          results.push({ unit, skill });
        }
      }
    }

    return results;
  }

  public getCompetencyMappings(skillId: string): CurriculumStandardMapping[] {
    return CURRICULUM_STANDARD_MAPPINGS.filter((m) => m.canonicalSkillId === skillId);
  }

  public getMappingsForSystem(system: EducationSystemCode | string): CurriculumStandardMapping[] {
    return CURRICULUM_STANDARD_MAPPINGS.filter(
      (m) => m.curriculumSystem.toLowerCase() === system.toLowerCase() ||
             m.country.toLowerCase() === system.toLowerCase()
    );
  }

  public getCanonicalCompetencies(): CanonicalCompetency[] {
    return CANONICAL_COMPETENCIES;
  }

  public getSupportedEducationSystems(): typeof SUPPORTED_EDUCATION_SYSTEMS {
    return SUPPORTED_EDUCATION_SYSTEMS;
  }
}

export const curriculumService: ICurriculumService = new CurriculumService();
