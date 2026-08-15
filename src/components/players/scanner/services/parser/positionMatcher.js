import { POSITION_PARTIALS } from "./positionInference";

function normalize(text) {
  return text.toUpperCase().replace(/[^A-Z]/g, "");
}

export function findPossiblePositions(label) {
  const normalized = normalize(label);

  if (!normalized) {
    return [];
  }

  // Correspondência exata ou parcial cadastrada
  if (POSITION_PARTIALS[normalized]) {
    return POSITION_PARTIALS[normalized];
  }

  // Prefixo (caso apareçam novas combinações)
  for (const key of Object.keys(POSITION_PARTIALS)) {
    if (key.startsWith(normalized) || normalized.startsWith(key)) {
      return POSITION_PARTIALS[key];
    }
  }

  return [];
}
