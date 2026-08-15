import { average, isInvalid } from "./validatorUtils";
import { SKILL_GROUPS } from "./skillGroups";

/**
 * Calcula a média das skills de um atributo.
 *
 * Se alguma skill for inválida,
 * retorna null.
 */
function getGroupAverage(player, attribute) {
  const group = SKILL_GROUPS.find((group) => group.attribute === attribute);

  if (!group) {
    return null;
  }

  const values = group.skills.map((skill) => player.skills[skill]);

  if (values.some(isInvalid)) {
    return null;
  }

  return average(values);
}

/**
 * Reconstrói um atributo usando
 * Overall e os outros dois atributos.
 */
function reconstructAttribute(overall, attr1, attr2) {
  if (isInvalid(overall) || isInvalid(attr1) || isInvalid(attr2)) {
    return null;
  }

  return overall * 3 - attr1 - attr2;
}

/**
 * Resolve os atributos do jogador.
 */
export function resolveAttributes(player) {
  const resolved = {
    attack: player.attack,
    defense: player.defense,
    physical: player.physical,
  };

  // ==========================================
  // 1 - Corrigir usando as skills
  // ==========================================

  const attackAverage = getGroupAverage(player, "attack");

  if (attackAverage !== null) {
    resolved.attack = attackAverage;
  }

  const defenseAverage = getGroupAverage(player, "defense");

  if (defenseAverage !== null) {
    resolved.defense = defenseAverage;
  }

  const physicalAverage = getGroupAverage(player, "physical");

  if (physicalAverage !== null) {
    resolved.physical = physicalAverage;
  }

  // ==========================================
  // 2 - Reconstruir atributos inválidos
  // ==========================================

  if (isInvalid(resolved.attack)) {
    const value = reconstructAttribute(
      player.overall,
      resolved.defense,
      resolved.physical,
    );

    if (value !== null) {
      resolved.attack = value;
    }
  }

  if (isInvalid(resolved.defense)) {
    const value = reconstructAttribute(
      player.overall,
      resolved.attack,
      resolved.physical,
    );

    if (value !== null) {
      resolved.defense = value;
    }
  }

  if (isInvalid(resolved.physical)) {
    const value = reconstructAttribute(
      player.overall,
      resolved.attack,
      resolved.defense,
    );

    if (value !== null) {
      resolved.physical = value;
    }
  }

  return resolved;
}
