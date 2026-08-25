/**
 * MOOS TECHY ACADEMY — REPOSITORY CONTAINER & FACTORY
 * 
 * Central registry supplying repository instances across the application.
 * Switches between local development implementations and future cloud (Firebase / Cloud SQL)
 * implementations without modifying consumer components.
 */

import {
  ILearnerRepository,
  ICurriculumRepository,
  IQRResourceRepository,
  IPlayActivityRepository,
  ITutorSessionRepository,
  ITextbookStudioRepository,
  IBookpreneurRepository,
  ITeacherStudioRepository,
  IAgentOrchestratorRepository,
  IRepositoryContainer
} from "./types";
import {
  LocalLearnerRepository,
  LocalCurriculumRepository,
  LocalQRResourceRepository,
  LocalPlayActivityRepository,
  LocalTutorSessionRepository,
  LocalTextbookStudioRepository,
  LocalBookpreneurRepository,
  LocalTeacherStudioRepository,
  LocalAgentOrchestratorRepository
} from "./localRepositories";

class RepositoryRegistry implements IRepositoryContainer {
  public learner: ILearnerRepository;
  public curriculum: ICurriculumRepository;
  public qrResource: IQRResourceRepository;
  public playActivity: IPlayActivityRepository;
  public tutorSession: ITutorSessionRepository;
  public textbookStudio: ITextbookStudioRepository;
  public bookpreneur: IBookpreneurRepository;
  public teacherStudio: ITeacherStudioRepository;
  public agentOrchestrator: IAgentOrchestratorRepository;

  constructor() {
    // Default to robust Local implementations
    this.learner = new LocalLearnerRepository();
    this.curriculum = new LocalCurriculumRepository();
    this.qrResource = new LocalQRResourceRepository();
    this.playActivity = new LocalPlayActivityRepository();
    this.tutorSession = new LocalTutorSessionRepository();
    this.textbookStudio = new LocalTextbookStudioRepository();
    this.bookpreneur = new LocalBookpreneurRepository();
    this.teacherStudio = new LocalTeacherStudioRepository();
    this.agentOrchestrator = new LocalAgentOrchestratorRepository();
  }

  /**
   * Allows injecting alternative repository implementations (e.g. Firebase Firestore / Cloud SQL)
   */
  public configureRepositories(custom: Partial<IRepositoryContainer>) {
    if (custom.learner) this.learner = custom.learner;
    if (custom.curriculum) this.curriculum = custom.curriculum;
    if (custom.qrResource) this.qrResource = custom.qrResource;
    if (custom.playActivity) this.playActivity = custom.playActivity;
    if (custom.tutorSession) this.tutorSession = custom.tutorSession;
    if (custom.textbookStudio) this.textbookStudio = custom.textbookStudio;
    if (custom.bookpreneur) this.bookpreneur = custom.bookpreneur;
    if (custom.teacherStudio) this.teacherStudio = custom.teacherStudio;
    if (custom.agentOrchestrator) this.agentOrchestrator = custom.agentOrchestrator;
  }
}

export const repositories = new RepositoryRegistry();
export * from "./types";
export * from "./localRepositories";

