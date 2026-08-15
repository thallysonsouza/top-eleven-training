import { distribute, isInvalidSkill } from "./validatorUtils";
import { SKILL_GROUPS } from "./skillGroups";

/**
 * Reconstrói todas as skills inválidas
 * de um grupo.
 */
function resolveGroup(skills, attributeValue, skillNames) {
  const resolved = {
    ...skills,
  };

  const invalidSkills = [];
  let validSum = 0;

  for (const skill of skillNames) {
    const value = resolved[skill];

    if (isInvalidSkill(value)) {
      invalidSkills.push(skill);
    } else {
      validSum += value;
    }
  }

  // Nada para reconstruir
  if (invalidSkills.length === 0) {
    return resolved;
  }

  // Se o atributo também estiver inválido,
  // não há como reconstruir o grupo.
  if (attributeValue == null || attributeValue <= 0) {
    return resolved;
  }

  // Total esperado do grupo
  const total = attributeValue * skillNames.length;

  // Quanto falta para completar o total
  const missing = total - validSum;

  // Caso os valores válidos já ultrapassem
  // o total esperado, não reconstruímos.
  if (missing < 0) {
    return resolved;
  }

  // Distribui igualmente entre as skills inválidas
  const values = distribute(missing, invalidSkills.length);

  invalidSkills.forEach((skill, index) => {
    resolved[skill] = values[index];
  });

  return resolved;
}

/**
 * Resolve todas as skills do jogador.
 */
export function resolveSkills(player) {
  let skills = {
    ...player.skills,
  };

  for (const group of SKILL_GROUPS) {
    skills = resolveGroup(skills, player[group.attribute], group.skills);
  }

  return skills;
}
