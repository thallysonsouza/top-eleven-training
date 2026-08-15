import { findPossiblePositions } from "./positionMatcher";

const VALID_POSITIONS = [
  "GK",

  "DL",
  "DC",
  "DR",

  "DMC",

  "ML",
  "MC",
  "MR",

  "AML",
  "AMC",
  "AMR",

  "ST",
];

export function parseRoles(text) {
  const tokens = text

    .toUpperCase()

    .replace(/[^A-Z ]/g, " ")

    .split(/\s+/)

    .filter(Boolean);

  // OCR frequentemente lê um "R" isolado antes da posição.
  // Ex.: "R MC", "R ML", "R ST".
  // Quando o primeiro token é apenas "R" e há outro token depois,
  // ele é considerado ruído e removido.
  if (tokens.length >= 2 && tokens[0] === "R") {
    tokens.shift();
  }

  const exact = [];

  const hints = [];

  tokens.forEach((token) => {
    if (VALID_POSITIONS.includes(token)) {
      if (!exact.includes(token)) {
        exact.push(token);
      }

      return;
    }

    const possiblePositions = findPossiblePositions(token);

    if (possiblePositions.length > 0 && !hints.includes(token)) {
      hints.push(token);
    }
  });

  return {
    exact,

    hints,
  };
}
