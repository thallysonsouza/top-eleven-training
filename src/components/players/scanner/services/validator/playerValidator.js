import { resolveOverall } from "./overallResolver";
import { resolveAttributes } from "./attributeResolver";
import { resolveSkills } from "./skillResolver";

/**
 * Reconstrói todas as informações do jogador.
 *
 * Pipeline:
 *
 * OCR
 *   ↓
 * Resolve Overall (1ª tentativa)
 *   ↓
 * Resolve Attributes
 *   ↓
 * Resolve Skills
 *   ↓
 * Resolve Overall (valor final)
 */
export function validatePlayer(player) {
  // ==========================
  // 1. Resolve Overall
  // ==========================

  const overall = resolveOverall(player);

  // ==========================
  // 2. Resolve Attributes
  // ==========================

  const attributes = resolveAttributes({
    ...player,
    overall,
  });

  // ==========================
  // 3. Resolve Skills
  // ==========================

  const skills = resolveSkills({
    ...player,
    overall,
    attributes,
  });

  // ==========================
  // 4. Recalcula o Overall
  // ==========================

  const finalOverall = resolveOverall({
    ...player,
    overall,
    attributes,
    skills,
  });

  // ==========================
  // Resultado Final
  // ==========================

  return {
    ...player,
    overall: finalOverall,
    attributes,
    skills,
  };
}
