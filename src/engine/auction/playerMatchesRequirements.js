const CLASSIFICATION_RANK = {
  RUIM: 0,
  NORMAL: 1,
  BOM: 2,
  ÓTIMO: 3,
  EXCELENTE: 4,
  FENÔMENO: 5,
};

/**
 * Verifica se um jogador atende aos requisitos
 * definidos pelo usuário no Smart Target.
 *
 * Requisitos:
 * - idade máxima
 * - posições
 * - posição pura ou mista
 * - classificação mínima
 * - OVR máximo
 */
export default function playerMatchesRequirements({ player, requirements }) {
  if (!player || !requirements) {
    return {
      matches: false,
      age: false,
      position: false,
      classification: false,
      overall: false,
    };
  }

  /* =========================
     PLAYER DATA
  ========================= */

  const age = Number(player.age);

  const overall = Number(player.overall);

  const classification = String(player.classification || "").toUpperCase();

  let playerPositions = player.positions || [];

  /*
   * Permite:
   *
   * ["DL", "DC", "DR"]
   *
   * ou:
   *
   * "DL / DC / DR"
   */

  if (typeof playerPositions === "string") {
    playerPositions = playerPositions
      .split("/")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (!Array.isArray(playerPositions)) {
    playerPositions = [];
  }

  /* =========================
     REQUIREMENTS
  ========================= */

  const maxAge = Number(requirements.maxAge);

  /*
   * Atualmente o nome interno continua
   * sendo minimumOverall para manter
   * compatibilidade com o contexto.
   *
   * Porém, semanticamente ele representa
   * o OVR MÁXIMO aceito.
   */

  const maximumOverall = Number(requirements.minimumOverall);

  const minimumClassification = String(
    requirements.minimumClassification || "RUIM",
  ).toUpperCase();

  const selectedPositions = Array.isArray(requirements.positions)
    ? requirements.positions
    : [];

  const allowMixedPositions = requirements.allowMixedPositions !== false;

  /* =========================
     AGE
  ========================= */

  const ageMatches =
    Number.isFinite(age) && Number.isFinite(maxAge) && age <= maxAge;

  /* =========================
     OVERALL
  ========================= */

  /*
   * IMPORTANTE:
   *
   * O usuário define o OVR MÁXIMO.
   *
   * Exemplo:
   *
   * máximo = 60
   *
   * 40 → MATCH
   * 50 → MATCH
   * 60 → MATCH
   * 61 → NÃO
   */

  const overallMatches =
    Number.isFinite(overall) &&
    Number.isFinite(maximumOverall) &&
    overall <= maximumOverall;

  /* =========================
     CLASSIFICATION
  ========================= */

  const playerClassificationRank = CLASSIFICATION_RANK[classification];

  const minimumClassificationRank = CLASSIFICATION_RANK[minimumClassification];

  const classificationMatches =
    playerClassificationRank !== undefined &&
    minimumClassificationRank !== undefined &&
    playerClassificationRank >= minimumClassificationRank;

  /* =========================
     POSITION
  ========================= */

  let positionMatches = false;

  if (selectedPositions.length > 0) {
    /*
     * POSIÇÃO PURA
     */

    if (!allowMixedPositions) {
      positionMatches =
        playerPositions.length === 1 &&
        selectedPositions.includes(playerPositions[0]);
    } else {
      /*
       * POSIÇÃO MISTA
       *
       * Basta uma das posições
       * do jogador estar entre as
       * posições procuradas.
       */

      positionMatches = playerPositions.some((playerPosition) =>
        selectedPositions.includes(playerPosition),
      );
    }
  }

  /* =========================
     FINAL RESULT
  ========================= */

  const matches =
    ageMatches && positionMatches && classificationMatches && overallMatches;

  return {
    matches,

    age: ageMatches,

    position: positionMatches,

    classification: classificationMatches,

    overall: overallMatches,
  };
}
