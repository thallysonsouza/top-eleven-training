import { isInvalid, hasInvalidValues } from "./validatorUtils";

import {
  calculateOverallFromAttributes,
  calculateOverallFromSkills,
} from "./calculateOverall";

/**
 * Resolve o Overall do jogador.
 *
 * Prioridade:
 *
 * 1 - OCR
 * 2 - Skills
 * 3 - Attributes
 * 4 - Valor original
 */
export function resolveOverall(player) {
  // ============================
  // 1. OCR
  // ============================

  if (!isInvalid(player.overall)) {
    return player.overall;
  }

  // ============================
  // 2. Skills
  // ============================

  if (!hasInvalidValues(player.skills)) {
    return calculateOverallFromSkills(player.skills);
  }

  // ============================
  // 3. Attributes
  // ============================

  const attributes = {
    attack: player.attack,
    defense: player.defense,
    physical: player.physical,
  };

  if (!hasInvalidValues(attributes)) {
    return calculateOverallFromAttributes(attributes);
  }

  // ============================
  // 4. Não foi possível resolver
  // ============================

  return player.overall;
}
