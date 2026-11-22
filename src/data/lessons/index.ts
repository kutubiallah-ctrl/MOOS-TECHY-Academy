import { SkillLesson } from "../../types/curriculum";
import { SCIENCE_LESSONS } from "./scienceLessons";
import { COMPUTING_LESSONS } from "./computingLessons";
import { ENGLISH_LESSONS } from "./englishLessons";
import { MATH_LESSONS } from "./mathLessons";
import { FOUNDATIONS_TERTIARY_LESSONS } from "./foundationsAndTertiaryLessons";

export {
  SCIENCE_LESSONS,
  COMPUTING_LESSONS,
  ENGLISH_LESSONS,
  MATH_LESSONS,
  FOUNDATIONS_TERTIARY_LESSONS
};

export const ALL_CURRICULUM_LESSONS: Record<string, SkillLesson> = {
  ...SCIENCE_LESSONS,
  ...COMPUTING_LESSONS,
  ...ENGLISH_LESSONS,
  ...MATH_LESSONS,
  ...FOUNDATIONS_TERTIARY_LESSONS
};

/**
 * Helper to retrieve a lesson by skill ID with fallbacks
 */
export function getLessonBySkillId(skillId: string): SkillLesson | undefined {
  return ALL_CURRICULUM_LESSONS[skillId];
}
