import FIELD_PLAYER_SKILLS from "../../skills/fieldPlayerSkills";
import GOALKEEPER_SKILLS from "../../skills/goalkeeperSkills";
import OCR_FIXES from "./ocrFixes";

const ALL_SKILLS = [
  ...Object.values(FIELD_PLAYER_SKILLS),
  ...Object.values(GOALKEEPER_SKILLS),
];

/**
 * Remove caracteres que normalmente confundem o OCR.
 */
/**
 * Normaliza um texto extraído pelo OCR.
 *
 * Remove:
 * - acentos
 * - espaços
 * - caracteres especiais
 *
 * Também corrige algumas trocas comuns do OCR.
 */
function normalize(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/0/g, "o")
    .replace(/5/g, "s")
    .replace(/8/g, "b")
    .replace(/[^a-z]/g, "");
}

/**
 * Calcula a distância de Levenshtein.
 */
function levenshtein(a, b) {
  const rows = a.length + 1;
  const cols = b.length + 1;

  const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j < cols; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[rows - 1][cols - 1];
}

export function findClosestSkill(label) {
  const normalized = normalize(label);

  // ==========================
  // 0. Correções conhecidas do OCR
  // ==========================

  if (OCR_FIXES[normalized]) {
    return {
      skill: OCR_FIXES[normalized],
      method: "dictionary",
      confidence: 1,
      distance: 0,
    };
  }

  // ==========================
  // 1. Correspondência exata
  // ==========================

  for (const skill of ALL_SKILLS) {
    if (normalize(skill) === normalized) {
      return {
        skill,
        method: "exact",
        confidence: 1,
        distance: 0,
      };
    }
  }

  // ==========================
  // 2. OCR cortou o final
  // Ex.: Spee -> Speed
  // ==========================

  for (const skill of ALL_SKILLS) {
    if (normalize(skill).startsWith(normalized)) {
      return {
        skill,
        method: "prefix",
        confidence: 0.98,
        distance: 1,
      };
    }
  }

  // ==========================
  // 3. OCR adicionou caracteres
  // ==========================

  for (const skill of ALL_SKILLS) {
    if (normalized.startsWith(normalize(skill))) {
      return {
        skill,
        method: "extended",
        confidence: 0.97,
        distance: 1,
      };
    }
  }

  // ==========================
  // 4. Levenshtein
  // ==========================

  let bestSkill = null;
  let bestDistance = Infinity;

  for (const skill of ALL_SKILLS) {
    const distance = levenshtein(normalized, normalize(skill));

    if (distance < bestDistance) {
      bestDistance = distance;
      bestSkill = skill;
    }
  }

  // Limite máximo aceitável
  if (bestDistance <= 2) {
    return {
      skill: bestSkill,
      method: "levenshtein",
      confidence: Number((1 - bestDistance / 10).toFixed(2)),
      distance: bestDistance,
    };
  }

  return null;
}
