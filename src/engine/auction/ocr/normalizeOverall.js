const MIN_OVERALL = 40;
const MAX_OVERALL = 99;

/*
 * Correções simples para erros comuns
 * do OCR ao reconhecer números.
 *
 * Exemplos:
 *
 * "S0" → 50
 * "B0" → 80
 * "l0" → 10
 *
 * Essas correções só serão aceitas
 * se o resultado final estiver dentro
 * do intervalo válido de OVR.
 */

const OCR_DIGIT_CORRECTIONS = {
  O: "0",
  Q: "0",
  D: "0",

  I: "1",
  L: "1",

  Z: "2",

  S: "5",

  G: "6",

  T: "7",

  B: "8",

  g: "9",
};

function correctOCRNumber(text) {
  return String(text)
    .toUpperCase()
    .split("")
    .map((character) => {
      return OCR_DIGIT_CORRECTIONS[character] ?? character;
    })
    .join("");
}

export default function normalizeOverall(text) {
  if (!text) {
    return null;
  }

  const normalizedText = String(text).toUpperCase().trim();

  /*
   * =========================
   * DIRECT NUMBER
   * =========================
   */

  const directMatch = normalizedText.match(/\b\d{2,3}\b/);

  if (directMatch) {
    const overall = Number(directMatch[0]);

    if (
      Number.isInteger(overall) &&
      overall >= MIN_OVERALL &&
      overall <= MAX_OVERALL
    ) {
      return overall;
    }
  }

  /*
   * =========================
   * OCR CORRECTION
   * =========================
   */

  const possibleTokens = normalizedText
    .split(/\s+/)
    .map((token) => token.replace(/[^A-Z0-9]/g, ""))
    .filter(Boolean);

  for (const token of possibleTokens) {
    if (!/[A-Z]/.test(token)) {
      continue;
    }

    const corrected = correctOCRNumber(token);

    if (!/^\d{2,3}$/.test(corrected)) {
      continue;
    }

    const overall = Number(corrected);

    if (
      Number.isInteger(overall) &&
      overall >= MIN_OVERALL &&
      overall <= MAX_OVERALL
    ) {
      return overall;
    }
  }

  /*
   * =========================
   * NO VALID OVR
   * =========================
   */

  return null;
}
