/**
 * MOOS ACADEMY — SUBJECT PEDAGOGICAL STRATEGY CONTRACT
 */

import { Unit, Skill } from "../../types/curriculum";
import { SmartBoardLessonContext, SubjectCategory, MasterclassInstructionalState } from "../../types/smartBoardTopicLock";
import { SmartBoardAction } from "../../types/smartBoardMasterclass";
import { VideoCheckpointQuestion, VideoStoryboardScene, SubjectVisualEngineType } from "../../types/videoLearning";

export interface MasterclassSynchronizedOutput {
  tutorScript: string;
  smartBoardActions: SmartBoardAction[];
  storyboard: VideoStoryboardScene[];
  checkpoints: VideoCheckpointQuestion[];
  instructionalStates?: MasterclassInstructionalState[];
  visualEngine: SubjectVisualEngineType;
  lessonContext?: SmartBoardLessonContext;
}

export interface SubjectPedagogicalStrategy {
  category: SubjectCategory;
  canHandle(subjectId: string, topicTitle: string): boolean;
  generateContent(params: {
    context: SmartBoardLessonContext;
    segNum: number;
    totalSegments: number;
    durationSeconds: number;
    unit: Unit;
    skill?: Skill;
  }): MasterclassSynchronizedOutput;
}
