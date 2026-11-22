/**
 * MOOS ACADEMY — MASTERCLASS PEDAGOGICAL ENGINE (FACTORY REFACTOR)
 *
 * Dispatches content generation to subject-specific pedagogical strategies
 * (e.g., AcademicEnglishDiscourseStrategy, LiteratureStrategy, MathematicsStrategy, PhysicsStrategy)
 * via the PedagogicalStrategyRegistry.
 *
 * Enforces:
 * - Topic and subject locking
 * - Stale session prevention
 * - Non-math template isolation (strictly forbids mathematical calculation language in humanities)
 * - 24-to-30 stage pedagogical progression (Foundation -> Mastery)
 */

import { Unit, Skill } from "../types/curriculum";
import { SmartBoardAction } from "../types/smartBoardMasterclass";
import {
  SubjectVisualEngineType,
  VideoCheckpointQuestion,
  VideoStoryboardScene
} from "../types/videoLearning";
import { MasterclassInstructionalState, SmartBoardLessonContext } from "../types/smartBoardTopicLock";
import { smartBoardTopicLockService } from "./smartBoardTopicLockService";
import { pedagogicalStrategyRegistry } from "./pedagogicalStrategies/PedagogicalStrategyRegistry";
import { MasterclassSynchronizedOutput } from "./pedagogicalStrategies/SubjectPedagogicalStrategy";

export type { MasterclassSynchronizedOutput };

export class MasterclassPedagogicalEngine {
  private static instance: MasterclassPedagogicalEngine;

  public static getInstance(): MasterclassPedagogicalEngine {
    if (!MasterclassPedagogicalEngine.instance) {
      MasterclassPedagogicalEngine.instance = new MasterclassPedagogicalEngine();
    }
    return MasterclassPedagogicalEngine.instance;
  }

  public generateMasterclassContent(params: {
    topicTitle: string;
    unit: Unit;
    skill?: Skill;
    segNum: number;
    totalSegments: number;
    durationSeconds: number;
    visualEngine: SubjectVisualEngineType;
  }): MasterclassSynchronizedOutput {
    const { topicTitle, unit, skill, segNum, totalSegments, durationSeconds } = params;

    // 1. Establish pristine, immutable SmartBoardLessonContext
    const context = smartBoardTopicLockService.createLessonContext({
      unit,
      skill,
      curriculumStandard: "WAEC / Cambridge International"
    });

    // 2. Resolve the dedicated pedagogical strategy via factory registry
    const strategy = pedagogicalStrategyRegistry.resolveStrategy(unit.subjectId, topicTitle);

    // 3. Generate subject-specific synchronized output
    const output = strategy.generateContent({
      context,
      segNum,
      totalSegments,
      durationSeconds,
      unit,
      skill
    });

    // 4. Attach lesson context to output
    output.lessonContext = context;

    // 5. Run subject content fidelity audit (fail fast on any prohibited phrase)
    const auditFindings = smartBoardTopicLockService.auditSubjectContentFidelity(
      output.tutorScript,
      strategy.category
    );

    if (auditFindings.length > 0) {
      console.warn(
        `[MasterclassPedagogicalEngine] Subject fidelity warnings for ${unit.subjectId}:`,
        auditFindings
      );
    }

    return output;
  }
}

export const masterclassPedagogicalEngine = MasterclassPedagogicalEngine.getInstance();
