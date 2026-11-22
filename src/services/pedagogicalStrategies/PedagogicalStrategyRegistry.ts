/**
 * MOOS ACADEMY — PEDAGOGICAL STRATEGY REGISTRY & FACTORY
 *
 * Implements the Strategy / Factory Pattern to dynamically dispatch to the exact
 * subject-specific pedagogical generator, eliminating monolithic if/else cascades.
 */

import { SubjectPedagogicalStrategy } from "./SubjectPedagogicalStrategy";
import { academicEnglishDiscourseStrategy } from "./AcademicEnglishDiscourseStrategy";
import { literatureStrategy } from "./LiteratureStrategy";
import { englishLanguageStrategy } from "./EnglishLanguageStrategy";
import { mathematicsStrategy } from "./MathematicsStrategy";
import {
  PhysicsStrategy,
  ChemistryStrategy,
  BiologyStrategy,
  ComputerScienceStrategy,
  EngineeringStrategy,
  EconomicsStrategy,
  FinancialLiteracyStrategy
} from "./ScienceAndEngineeringStrategies";

export class PedagogicalStrategyRegistry {
  private static instance: PedagogicalStrategyRegistry;
  private strategies: SubjectPedagogicalStrategy[] = [];

  private constructor() {
    // Register specialized strategies in priority order
    // Note: AcademicEnglishDiscourseStrategy comes before generic English
    this.strategies = [
      academicEnglishDiscourseStrategy,
      literatureStrategy,
      englishLanguageStrategy,
      mathematicsStrategy,
      new PhysicsStrategy(),
      new ChemistryStrategy(),
      new BiologyStrategy(),
      new ComputerScienceStrategy(),
      new EngineeringStrategy(),
      new EconomicsStrategy(),
      new FinancialLiteracyStrategy()
    ];
  }

  public static getInstance(): PedagogicalStrategyRegistry {
    if (!PedagogicalStrategyRegistry.instance) {
      PedagogicalStrategyRegistry.instance = new PedagogicalStrategyRegistry();
    }
    return PedagogicalStrategyRegistry.instance;
  }

  /**
   * Resolves the exact subject-specific pedagogical strategy
   */
  public resolveStrategy(subjectId: string, topicTitle: string): SubjectPedagogicalStrategy {
    for (const strategy of this.strategies) {
      if (strategy.canHandle(subjectId, topicTitle)) {
        return strategy;
      }
    }

    // Default fallback is academicEnglishDiscourseStrategy for humanities, or mathematics for quantitative
    const s = (subjectId || "").toLowerCase();
    if (s.includes("math") || s.includes("calc") || s.includes("algebra")) {
      return mathematicsStrategy;
    }
    return academicEnglishDiscourseStrategy;
  }
}

export const pedagogicalStrategyRegistry = PedagogicalStrategyRegistry.getInstance();
