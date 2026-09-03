import { position, position2, position3 } from "../../../constants/position";

/*
 * ============================================================
 * AUCTION POSITION COMBINATIONS
 * ============================================================
 *
 * Gera automaticamente todas as combinações de posições
 * permitidas pelo sistema oficial de posições do jogo.
 *
 * A estrutura utilizada é:
 *
 * position  -> primeira posição
 * position2 -> segunda posição
 * position3 -> terceira posição
 *
 * Exemplos:
 *
 * ST
 * STAML
 * STAMC
 * STAMR
 *
 * DCDL
 * DCDR
 * DCDMC
 *
 * DLDCDMC
 * ...
 *
 * Não cadastramos manualmente as combinações.
 * Elas são derivadas das regras existentes.
 */

/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

function isValidPosition(value) {
  return value && value !== "---" && position.includes(value);
}

/*
 * ============================================================
 * GENERATE COMBINATIONS
 * ============================================================
 */

const combinations = new Set();

/*
 * =========================
 * SINGLE POSITION
 * =========================
 */

for (const firstPosition of position) {
  if (!isValidPosition(firstPosition)) {
    continue;
  }

  combinations.add(firstPosition);
}

/*
 * =========================
 * TWO POSITIONS
 * =========================
 */

for (const [firstPosition, secondPositions] of Object.entries(position2)) {
  if (!isValidPosition(firstPosition)) {
    continue;
  }

  for (const secondPosition of secondPositions) {
    if (!isValidPosition(secondPosition)) {
      continue;
    }

    combinations.add(`${firstPosition}${secondPosition}`);
  }
}

/*
 * =========================
 * THREE POSITIONS
 * =========================
 */

for (const [firstPosition, secondMap] of Object.entries(position3)) {
  if (!isValidPosition(firstPosition)) {
    continue;
  }

  for (const [secondPosition, thirdPositions] of Object.entries(secondMap)) {
    if (!isValidPosition(secondPosition)) {
      continue;
    }

    for (const thirdPosition of thirdPositions) {
      if (!isValidPosition(thirdPosition)) {
        continue;
      }

      combinations.add(`${firstPosition}${secondPosition}${thirdPosition}`);
    }
  }
}

/*
 * ============================================================
 * SORT
 * ============================================================
 *
 * Primeiro as combinações maiores.
 *
 * Isso é importante porque:
 *
 * DMC
 * DC
 *
 * não devem ser analisados simplesmente da esquerda
 * para a direita sem considerar o tamanho das posições.
 */

const AUCTION_POSITION_COMBINATIONS = [...combinations].sort((a, b) => {
  if (b.length !== a.length) {
    return b.length - a.length;
  }

  return a.localeCompare(b);
});

/*
 * ============================================================
 * SET
 * ============================================================
 *
 * Usado para validações rápidas.
 */

export const AUCTION_POSITION_COMBINATION_SET = new Set(
  AUCTION_POSITION_COMBINATIONS,
);

/*
 * ============================================================
 * VALIDATE COMBINATION
 * ============================================================
 */

export function isValidAuctionPositionCombination(text) {
  if (!text) {
    return false;
  }

  const normalizedText = String(text)
    .toUpperCase()
    .replace(/[^A-Z]/g, "");

  return AUCTION_POSITION_COMBINATION_SET.has(normalizedText);
}

/*
 * ============================================================
 * EXPORT
 * ============================================================
 */

export default AUCTION_POSITION_COMBINATIONS;
