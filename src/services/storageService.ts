import { ExtendedLearnerProfile, LearnerActivity, QuestionAttempt, ExamSubmissionRecord } from "../types/learner";
import { DiagnosticResult } from "../types/curriculum";
import { repositories } from "./repositories";
import { firebaseSyncService } from "./firebaseSyncService";

export interface ILearnerStorageService {
  getProfile(): Promise<ExtendedLearnerProfile>;
  saveProfile(profile: ExtendedLearnerProfile): Promise<ExtendedLearnerProfile>;
  recordActivity(activity: Omit<LearnerActivity, "id" | "timestamp">): Promise<ExtendedLearnerProfile>;
  recordQuestionAttempt(attempt: Omit<QuestionAttempt, "id" | "timestamp">): Promise<ExtendedLearnerProfile>;
  recordDiagnostic(result: DiagnosticResult): Promise<ExtendedLearnerProfile>;
  recordExamSubmission(submission: Omit<ExamSubmissionRecord, "id" | "submittedAt">): Promise<ExtendedLearnerProfile>;
  recordPlayCompletion(activityTitle: string, skillId: string, score: number, maxScore: number, pointsDelta: number, xpDelta: number, timeSpentSeconds: number): Promise<ExtendedLearnerProfile>;
  updateMastery(skillId: string, deltaPoints: number, isCorrect: boolean): Promise<ExtendedLearnerProfile>;
  resetToInitial(): Promise<ExtendedLearnerProfile>;
}

class DelegatingLearnerStorageService implements ILearnerStorageService {
  public async getProfile(): Promise<ExtendedLearnerProfile> {
    return repositories.learner.getProfile();
  }

  public async saveProfile(profile: ExtendedLearnerProfile): Promise<ExtendedLearnerProfile> {
    const saved = await repositories.learner.saveProfile(profile);
    // Background fire-and-forget sync to Firestore if user is authenticated
    firebaseSyncService.syncLearnerProfileToCloud(saved).catch((e) => {
      console.warn("Background Firestore sync skipped/failed:", e);
    });
    return saved;
  }

  public async recordActivity(activityData: Omit<LearnerActivity, "id" | "timestamp">): Promise<ExtendedLearnerProfile> {
    const profile = await this.getProfile();
    return repositories.learner.recordActivity(profile.id, activityData);
  }

  public async recordQuestionAttempt(attemptData: Omit<QuestionAttempt, "id" | "timestamp">): Promise<ExtendedLearnerProfile> {
    const profile = await this.getProfile();
    return repositories.learner.recordQuestionAttempt(profile.id, attemptData);
  }

  public async recordDiagnostic(result: DiagnosticResult): Promise<ExtendedLearnerProfile> {
    const profile = await this.getProfile();
    return repositories.learner.recordDiagnostic(profile.id, result);
  }

  public async recordExamSubmission(submissionData: Omit<ExamSubmissionRecord, "id" | "submittedAt">): Promise<ExtendedLearnerProfile> {
    const profile = await this.getProfile();
    return repositories.learner.recordExamSubmission(profile.id, submissionData);
  }

  public async recordPlayCompletion(
    activityTitle: string,
    skillId: string,
    score: number,
    maxScore: number,
    pointsDelta: number,
    xpDelta: number,
    timeSpentSeconds: number
  ): Promise<ExtendedLearnerProfile> {
    const profile = await this.getProfile();
    return repositories.learner.recordPlayCompletion(
      profile.id,
      activityTitle,
      skillId,
      score,
      maxScore,
      pointsDelta,
      xpDelta,
      timeSpentSeconds
    );
  }

  public async updateMastery(skillId: string, pointsGained: number, isCorrect: boolean): Promise<ExtendedLearnerProfile> {
    const profile = await this.getProfile();
    return repositories.learner.updateMastery(profile.id, skillId, pointsGained, isCorrect);
  }

  public async resetToInitial(): Promise<ExtendedLearnerProfile> {
    return repositories.learner.resetProfile();
  }
}

export const storageService: ILearnerStorageService = new DelegatingLearnerStorageService();
