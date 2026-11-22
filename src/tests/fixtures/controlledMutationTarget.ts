/**
 * MOOS TECHY ACADEMY — CONTROLLED DISPOSABLE MUTATION FIXTURE
 * 
 * Used exclusively for controlled autonomous mutation, self-correction,
 * and rollback verification in isolated development testing.
 */

export function computePhysicsKineticEnergy(mass: number, velocity: number): number {
  if (mass < 0) {
    throw new Error("Mass cannot be negative");
  }
  // Formula: KE = 0.5 * m * v^2
  return 0.5 * mass * velocity * velocity;
}

export function sanitizeConcordSyntaxText(rawText: string): string {
  // Strips mathematical and polynomial artifacts from grammar text
  return rawText.replace(/\$[^\$]+\$/g, "").trim();
}
