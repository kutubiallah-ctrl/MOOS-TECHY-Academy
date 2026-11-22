/**
 * MOOS TECHY ACADEMY — CLUBS & CO-CURRICULAR SERVICE
 * 
 * Implements the 9-stage active co-curricular lifecycle:
 * JOIN -> LEARN -> PRACTISE -> BUILD -> PARTICIPATE -> SHARE -> COMPETE -> REFLECT -> ADVANCE
 */

import {
  ClubDefinition,
  ClubId,
  ClubCycleStage,
  CLUB_CYCLE_STAGES,
  LearnerClubProgress,
  ClubProjectSubmission
} from "../types/clubs";
import { auditService } from "./auditService";

const STORAGE_KEY = "moos_clubs_learner_progress_v1";

export class ClubsService {
  private static instance: ClubsService;
  private clubs: Map<ClubId, ClubDefinition> = new Map();
  private learnerProgress: Map<string, LearnerClubProgress> = new Map();

  private constructor() {
    this.seedClubs();
    this.loadPersistedProgress();
  }

  public static getInstance(): ClubsService {
    if (!ClubsService.instance) {
      ClubsService.instance = new ClubsService();
    }
    return ClubsService.instance;
  }

  private seedClubs(): void {
    const defaultClubs: ClubDefinition[] = [
      {
        id: "club_jet",
        name: "JET Club (Junior Engineers, Technicians & Scientists)",
        motto: "Innovate Locally, Impact Globally",
        category: "STEM",
        patronTeacherName: "Engr. Kenneth Obi & Dr. Adebayo Ogunlesi",
        curriculumDomains: ["sci_physics", "sci_chemistry", "math_geometry"],
        description:
          "Applied engineering, mechanics, clean solar circuits, water purification prototypes, and National STEM Olympiads.",
        stageGuidance: {
          JOIN: {
            title: "Join & Pledge",
            prompt: "Commit to scientific integrity, laboratory safety, and peer teamwork.",
            actionLabel: "Take JET Pledge"
          },
          LEARN: {
            title: "Investigate Physical Principles",
            prompt: "Study Ohm's Law, energy transformations, and structural mechanics.",
            actionLabel: "Complete Mechanics Unit"
          },
          PRACTISE: {
            title: "Hands-on Bench Testing",
            prompt: "Measure voltage drops across breadboard resistors and calculate resistance tolerances.",
            actionLabel: "Verify Test Data"
          },
          BUILD: {
            title: "Fabricate a Working Prototype",
            prompt: "Design and assemble an off-grid solar LED lantern using recycled casing.",
            actionLabel: "Submit Solar Lantern Schematics"
          },
          PARTICIPATE: {
            title: "Weekly Lab Demonstration",
            prompt: "Demonstrate your prototype circuit to fellow club members during Wednesday lab hour.",
            actionLabel: "Log Lab Demonstration"
          },
          SHARE: {
            title: "Publish Peer Guide",
            prompt: "Write a 1-page illustrated guide explaining your circuit schematics for junior members.",
            actionLabel: "Publish Schematics Guide"
          },
          COMPETE: {
            title: "National Science & JET Exhibition",
            prompt: "Enter your solar prototype into the National Inter-School Innovation Challenge.",
            actionLabel: "Enter JET Challenge"
          },
          REFLECT: {
            title: "Engineering Debrief",
            prompt: "What unexpected voltage losses occurred? How will version 2 improve efficiency?",
            actionLabel: "Record Engineering Reflection"
          },
          ADVANCE: {
            title: "Award Fellow Pin & Level Up",
            prompt: "Promoted to Senior JET Lead Engineer with privilege to mentor Junior Secondary teams.",
            actionLabel: "Receive JET Fellow Honors"
          }
        },
        activeProjects: [
          {
            id: "proj_jet_solar_lantern",
            clubId: "club_jet",
            title: "Off-Grid Solar Emergency Lantern",
            description: "Assemble a 5V solar panel with rechargeable 18650 cell and brightness potentiometer.",
            deliverableType: "prototype",
            difficulty: "intermediate",
            milestones: ["Circuit schematic review", "Soldering & bench test", "Lumen measurement report"]
          }
        ],
        activeCompetitions: [
          {
            id: "comp_jet_olympiad_2026",
            clubId: "club_jet",
            title: "All-Nigeria Inter-Secondary JET Innovation Cup",
            description: "Regional STEM competition focused on renewable energy solutions for rural schools.",
            scheduledDate: "2026-05-20",
            status: "active",
            awardTier: "National Gold Trophy & University STEM Scholarship"
          }
        ],
        membersCount: 412
      },
      {
        id: "club_press_literary",
        name: "Press & Literary Club",
        motto: "The Pen Illuminates Truth",
        category: "Literacy & Humanities",
        patronTeacherName: "Mrs. Folashade Adeleke",
        curriculumDomains: ["eng_grammar", "eng_writing", "eng_literature"],
        description:
          "Investigative journalism, school gazette publication, debate tournaments, creative poetry, and civic storytelling.",
        stageGuidance: {
          JOIN: {
            title: "Enlist as Junior Reporter",
            prompt: "Sign the Journalist Code of Ethics: objectivity, verifiable facts, and fair quotation.",
            actionLabel: "Sign Press Charter"
          },
          LEARN: {
            title: "Master Journalistic Inverted Pyramid",
            prompt: "Study who, what, when, where, why, and how leads in investigative reporting.",
            actionLabel: "Read Editorial Guidelines"
          },
          PRACTISE: {
            title: "Conduct an Audio Interview",
            prompt: "Interview the senior science prefect about laboratory resources and take structured notes.",
            actionLabel: "Draft Interview Transcript"
          },
          BUILD: {
            title: "Draft Front-Page Feature Article",
            prompt: "Write a 600-word investigative report on library digital access and community reading hours.",
            actionLabel: "Submit Gazette Article"
          },
          PARTICIPATE: {
            title: "Editorial Board Review",
            prompt: "Review peer submissions in the weekly Friday editorial pitch meeting.",
            actionLabel: "Attend Pitch Meeting"
          },
          SHARE: {
            title: "Publish in the Academy Gazette",
            prompt: "Print and digitally broadcast the monthly MOOS ACADEMY student gazette issue.",
            actionLabel: "Release Monthly Gazette"
          },
          COMPETE: {
            title: "National Schools Debate Championship",
            prompt: "Represent the Academy in the Inter-State Parliamentary Debate on Artificial Intelligence in Education.",
            actionLabel: "Register for Debate"
          },
          REFLECT: {
            title: "Editorial Retrospective",
            prompt: "Analyze reader feedback and identify ethical nuances in student reporting.",
            actionLabel: "Submit Editorial Critique"
          },
          ADVANCE: {
            title: "Senior Editor Promotion",
            prompt: "Attain Editor-in-Chief status with editorial veto and mentor assignments.",
            actionLabel: "Assume Senior Editor Role"
          }
        },
        activeProjects: [
          {
            id: "proj_gazette_issue_4",
            clubId: "club_press_literary",
            title: "Term 2 Academy Gazette Feature",
            description: "Investigate and write an in-depth article on young inventors in Nigerian public schools.",
            deliverableType: "article",
            difficulty: "intermediate",
            milestones: ["Topic proposal", "3 eyewitness interviews", "Editor copyedit"]
          }
        ],
        activeCompetitions: [
          {
            id: "comp_state_debate_2026",
            clubId: "club_press_literary",
            title: "Inter-Collegiate Oxford-Style Debate Championship",
            description: "Championship topic: 'Resolved: Traditional Print Textbooks Must Transition to Digital Interactive Learning'",
            scheduledDate: "2026-06-12",
            status: "active",
            awardTier: "State Champion Gavel & Literary Fellowship"
          }
        ],
        membersCount: 284
      },
      {
        id: "club_young_farmers",
        name: "Young Farmers Club",
        motto: "Nourishing the Soil, Empowering the Nation",
        category: "Agriculture & Bio-economy",
        patronTeacherName: "Mr. Babatunde Alabi (M.Sc. Agronomy)",
        curriculumDomains: ["sci_biology", "econ_agriculture", "tech_automation"],
        description:
          "Agritech, hydroponics, soil microbiology, organic pest deterrence, school farm cultivation, and food security enterprise.",
        stageGuidance: {
          JOIN: {
            title: "Young Agronomist Induction",
            prompt: "Adopt a school farm parcel and pledge sustainable soil guardianship.",
            actionLabel: "Adopt Farm Bed"
          },
          LEARN: {
            title: "Study Soil pH & Nitrogen Fixation",
            prompt: "Learn how leguminous cover crops naturally restore soil nutrients without synthetic chemicals.",
            actionLabel: "Complete Soil Science Module"
          },
          PRACTISE: {
            title: "Compost Temperature & Moisture Log",
            prompt: "Maintain daily moisture and core temperature logs for the school organic compost pile.",
            actionLabel: "Log 7-Day Soil Data"
          },
          BUILD: {
            title: "Construct Gravity-Fed Drip Irrigation",
            prompt: "Build an automated drip irrigation rig using calibrated micro-tubing and recycled containers.",
            actionLabel: "Install Irrigation Rig"
          },
          PARTICIPATE: {
            title: "Saturday Harvest & Market Prep",
            prompt: "Weigh, grade, and package organic fluted pumpkin (Ugwu) and tomatoes for campus sales.",
            actionLabel: "Log Harvest Weight"
          },
          SHARE: {
            title: "Community Agritech Workshop",
            prompt: "Host a 30-minute demonstration on making organic bio-fertilizer for local smallholders.",
            actionLabel: "Deliver Workshop Session"
          },
          COMPETE: {
            title: "National Young Farmers Agri-Innovator Award",
            prompt: "Submit farm yield data and economic return calculations to the National Agritech Council.",
            actionLabel: "Submit Farm Ledger"
          },
          REFLECT: {
            title: "Crop Cycle Audit",
            prompt: "Compare initial seed germination rates to harvest yield and calculate net profit margin.",
            actionLabel: "Calculate Economic Margin"
          },
          ADVANCE: {
            title: "Master Agronomist Certification",
            prompt: "Awarded Lead Farm Manager distinction with school enterprise profit-sharing.",
            actionLabel: "Receive Agronomist Certificate"
          }
        },
        activeProjects: [
          {
            id: "proj_hydroponic_ugwu",
            clubId: "club_young_farmers",
            title: "Vertical Hydroponic Leafy Greens Rig",
            description: "Construct a 4-tier vertical PVC hydroponics rig for year-round urban vegetable cultivation.",
            deliverableType: "harvest_log",
            difficulty: "advanced",
            milestones: ["Nutrient solution titration", "Seedling transplanting", "Bi-weekly biomass harvest"]
          }
        ],
        activeCompetitions: [
          {
            id: "comp_national_agri_2026",
            clubId: "club_young_farmers",
            title: "Federal Ministry of Agriculture Green Schools Challenge",
            description: "Competition rewarding high-yield sustainable vegetable production on school grounds.",
            scheduledDate: "2026-07-04",
            status: "active",
            awardTier: "Green Ribbon Innovation Grant & Commercial Seed Stock"
          }
        ],
        membersCount: 319
      },
      {
        id: "club_coding_robotics",
        name: "Coding & Robotics Club",
        motto: "Building Tomorrow's Autonomous Systems",
        category: "Computing & Robotics",
        patronTeacherName: "Engr. Nnamdi Azikiwe Jr. & Lead Mentor Moos",
        curriculumDomains: ["comp_algorithms", "comp_hardware", "tech_compsci"],
        description:
          "Algorithmic problem solving, Python programming, microcontroller robotics, sensor integration, and hackathons.",
        stageGuidance: {
          JOIN: {
            title: "Terminal Access & Club Oath",
            prompt: "Initialize your student developer environment and commit to open-source sharing and ethical coding.",
            actionLabel: "Initialize Git Repository"
          },
          LEARN: {
            title: "Algorithmic Logic & Microcontrollers",
            prompt: "Study pulse-width modulation (PWM), ultrasonic sensor echo timing, and state machines.",
            actionLabel: "Complete Python/Robotics Unit"
          },
          PRACTISE: {
            title: "Autonomous Obstacle Avoidance Simulation",
            prompt: "Write a control loop that stops motor drive when an obstacle is within 15 cm.",
            actionLabel: "Test Obstacle Algorithm"
          },
          BUILD: {
            title: "Assemble 2-Wheel Autonomous Robot Car",
            prompt: "Flash your compiled C++/MicroPython firmware onto an ESP32 chassis with dual H-bridge motor driver.",
            actionLabel: "Flash Firmware to Robot"
          },
          PARTICIPATE: {
            title: "Robo-Maze Navigation Sprint",
            prompt: "Run your robot through the 10-meter obstacle course during Thursday robotics meet.",
            actionLabel: "Log Track Time"
          },
          SHARE: {
            title: "Open Source Code Repository",
            prompt: "Publish your motor PID tuning codebase with clear README documentation and wiring schematics.",
            actionLabel: "Publish GitHub Repo"
          },
          COMPETE: {
            title: "FIRST Global & African Robotics Cup",
            prompt: "Compete against secondary school teams in the autonomous delivery rover challenge.",
            actionLabel: "Register Robot for Arena"
          },
          REFLECT: {
            title: "Telemetry & Sensor Latency Analysis",
            prompt: "Analyze sensor jitter and motor drift data recorded during competitive trial runs.",
            actionLabel: "Submit Telemetry Review"
          },
          ADVANCE: {
            title: "Principal Robotics Fellow",
            prompt: "Awarded Chief Systems Architect status with authorization to mentor new lab cohorts.",
            actionLabel: "Accept Architect Distinction"
          }
        },
        activeProjects: [
          {
            id: "proj_esp32_rover",
            clubId: "club_coding_robotics",
            title: "Autonomous Warehouse Rover",
            description: "Build an ESP32 robot equipped with line tracking and ultrasonic safety emergency braking.",
            deliverableType: "code_repository",
            difficulty: "advanced",
            milestones: ["Schematic validation", "Firmware implementation", "Time-trial maze navigation"]
          }
        ],
        activeCompetitions: [
          {
            id: "comp_african_robotics_2026",
            clubId: "club_coding_robotics",
            title: "Pan-African High School Robotics Olympiad",
            description: "Annual competitive robotics championship gathering youth engineering teams from 18 nations.",
            scheduledDate: "2026-08-15",
            status: "active",
            awardTier: "Continental Robotics Trophy & Maker Lab Hardware Grant"
          }
        ],
        membersCount: 520
      }
    ];

    for (const c of defaultClubs) {
      this.clubs.set(c.id, c);
    }
  }

  private loadPersistedProgress(): void {
    if (typeof window === "undefined" || !window.localStorage) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        Object.entries(parsed).forEach(([key, val]) => {
          this.learnerProgress.set(key, val as LearnerClubProgress);
        });
      }
    } catch {
      // Fallback
    }
  }

  private persistProgress(): void {
    if (typeof window === "undefined" || !window.localStorage) return;
    try {
      const obj: Record<string, LearnerClubProgress> = {};
      this.learnerProgress.forEach((val, key) => {
        obj[key] = val;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    } catch {
      // Graceful
    }
  }

  public getAllClubs(): ClubDefinition[] {
    return Array.from(this.clubs.values());
  }

  public getClub(id: ClubId): ClubDefinition | undefined {
    return this.clubs.get(id);
  }

  private getProgressKey(learnerId: string, clubId: ClubId): string {
    return `${learnerId}__${clubId}`;
  }

  public getLearnerProgress(learnerId: string, clubId: ClubId): LearnerClubProgress | null {
    return this.learnerProgress.get(this.getProgressKey(learnerId, clubId)) || null;
  }

  public joinClub(learnerId: string, clubId: ClubId): LearnerClubProgress {
    const key = this.getProgressKey(learnerId, clubId);
    let progress = this.learnerProgress.get(key);

    if (!progress) {
      progress = {
        clubId,
        learnerId,
        currentStage: "JOIN",
        joinedAt: new Date().toISOString(),
        completedStages: ["JOIN"],
        projectsSubmitted: [],
        competitionsEntered: [],
        reflectionNotes: [
          {
            stage: "JOIN",
            note: "Enrolled in club, pledged compliance with safety & peer collaboration guidelines.",
            timestamp: new Date().toISOString()
          }
        ],
        badgesEarned: [`badge_${clubId}_member`],
        lastActiveDate: new Date().toISOString()
      };
      this.learnerProgress.set(key, progress);
      this.persistProgress();

      auditService.recordEvent({
        eventType: "CLUB_JOINED",
        actorId: learnerId,
        actorRole: "LEARNER",
        resourceType: "club",
        resourceId: clubId,
        metadata: { clubId, details: `Learner joined ${clubId}` }
      });
    }

    return progress;
  }

  /**
   * Advances a learner through the 9-stage active co-curricular cycle.
   */
  public advanceStage(
    learnerId: string,
    clubId: ClubId,
    targetStage?: ClubCycleStage,
    reflectionNote?: string
  ): LearnerClubProgress {
    const key = this.getProgressKey(learnerId, clubId);
    let progress = this.learnerProgress.get(key);

    if (!progress) {
      progress = this.joinClub(learnerId, clubId);
    }

    const currentIndex = CLUB_CYCLE_STAGES.indexOf(progress.currentStage);
    let nextStage: ClubCycleStage;

    if (targetStage) {
      nextStage = targetStage;
    } else {
      nextStage =
        currentIndex < CLUB_CYCLE_STAGES.length - 1
          ? CLUB_CYCLE_STAGES[currentIndex + 1]
          : CLUB_CYCLE_STAGES[currentIndex];
    }

    const completedStages = Array.from(new Set([...progress.completedStages, progress.currentStage, nextStage]));

    const reflections = [...progress.reflectionNotes];
    if (reflectionNote) {
      reflections.push({
        stage: nextStage,
        note: reflectionNote,
        timestamp: new Date().toISOString()
      });
    }

    const badges = [...progress.badgesEarned];
    if (nextStage === "ADVANCE" && !badges.includes(`badge_${clubId}_master`)) {
      badges.push(`badge_${clubId}_master`);
    }

    const updated: LearnerClubProgress = {
      ...progress,
      currentStage: nextStage,
      completedStages,
      reflectionNotes: reflections,
      badgesEarned: badges,
      lastActiveDate: new Date().toISOString()
    };

    this.learnerProgress.set(key, updated);
    this.persistProgress();

    auditService.recordEvent({
      eventType: "CLUB_STAGE_ADVANCED",
      actorId: learnerId,
      actorRole: "LEARNER",
      resourceType: "club_stage",
      resourceId: clubId,
      metadata: { stage: nextStage, details: `Advanced to stage ${nextStage}` }
    });

    return updated;
  }

  public submitProject(
    learnerId: string,
    clubId: ClubId,
    submission: {
      projectId: string;
      submissionTitle: string;
      submissionContent: string;
    }
  ): LearnerClubProgress {
    const key = this.getProgressKey(learnerId, clubId);
    let progress = this.learnerProgress.get(key);
    if (!progress) {
      progress = this.joinClub(learnerId, clubId);
    }

    const newSub: ClubProjectSubmission = {
      projectId: submission.projectId,
      learnerId,
      submissionTitle: submission.submissionTitle,
      submissionContent: submission.submissionContent,
      submittedAt: new Date().toISOString(),
      reviewStatus: "patron_approved",
      patronFeedback: "Project demonstrates sound technical craftsmanship and adheres to safety protocol."
    };

    const updated: LearnerClubProgress = {
      ...progress,
      projectsSubmitted: [...progress.projectsSubmitted, newSub],
      lastActiveDate: new Date().toISOString()
    };

    // If currently at BUILD or PRACTISE stage, automatically qualify for BUILD advancement
    if (progress.currentStage === "PRACTISE" || progress.currentStage === "BUILD") {
      updated.completedStages = Array.from(new Set([...updated.completedStages, "BUILD", "PARTICIPATE"]));
      updated.currentStage = "PARTICIPATE";
    }

    this.learnerProgress.set(key, updated);
    this.persistProgress();

    auditService.recordEvent({
      eventType: "CLUB_PROJECT_SUBMITTED",
      actorId: learnerId,
      actorRole: "LEARNER",
      resourceType: "club_project",
      resourceId: submission.projectId,
      metadata: { clubId, projectTitle: submission.submissionTitle }
    });

    return updated;
  }

  public enterCompetition(
    learnerId: string,
    clubId: ClubId,
    competitionId: string
  ): LearnerClubProgress {
    const key = this.getProgressKey(learnerId, clubId);
    let progress = this.learnerProgress.get(key);
    if (!progress) {
      progress = this.joinClub(learnerId, clubId);
    }

    const updated: LearnerClubProgress = {
      ...progress,
      competitionsEntered: Array.from(new Set([...progress.competitionsEntered, competitionId])),
      lastActiveDate: new Date().toISOString()
    };

    // Advance to COMPETE stage
    if (CLUB_CYCLE_STAGES.indexOf(progress.currentStage) < CLUB_CYCLE_STAGES.indexOf("COMPETE")) {
      updated.currentStage = "COMPETE";
      updated.completedStages = Array.from(new Set([...updated.completedStages, "COMPETE"]));
    }

    this.learnerProgress.set(key, updated);
    this.persistProgress();

    auditService.recordEvent({
      eventType: "CLUB_COMPETITION_ENTERED",
      actorId: learnerId,
      actorRole: "LEARNER",
      resourceType: "club_competition",
      resourceId: competitionId,
      metadata: { clubId, competitionId }
    });

    return updated;
  }
}

export const clubsService = ClubsService.getInstance();
