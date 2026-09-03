const VALID_AGES = [18, 19, 20, 21];

/*
 * Correções comuns que o OCR pode fazer
 * ao reconhecer números.
 *
 * Exemplos:
 *
 * "l8"  → 18
 * "I8"  → 18
 * "l9"  → 19
 * "I9"  → 19
 */

const OCR_AGE_CORRECTIONS = {
  L8: 18,
  I8: 18,
  L9: 19,
  I9: 19,
  L0: 20,
  I0: 20,
  L1: 21,
  I1: 21,
};

export default function normalizeAge(text) {
  if (!text) {
    return null;
  }

  const normalizedText = String(text).toUpperCase().trim();

  /*
   * Primeiro tenta encontrar diretamente
   * uma das idades válidas.
   */

  for (const age of VALID_AGES) {
    const pattern = new RegExp(`\\b${age}\\b`);

    if (pattern.test(normalizedText)) {
      return age;
    }
  }

  /*
   * Depois tenta corrigir possíveis
   * erros comuns do OCR.
   */

  const tokens = normalizedText.split(/\s+/);

  for (const token of tokens) {
    const cleanedToken = token.replace(/[^A-Z0-9]/g, "");

    const correctedAge = OCR_AGE_CORRECTIONS[cleanedToken];

    if (correctedAge !== undefined) {
      return correctedAge;
    }
  }

  /*
   * Última tentativa:
   *
   * Procura dois caracteres que possam
   * representar uma idade válida.
   */

  const possibleNumber = normalizedText.match(/[0-9LI]{2}/);

  if (possibleNumber) {
    const corrected = OCR_AGE_CORRECTIONS[possibleNumber[0]];

    if (corrected !== undefined) {
      return corrected;
    }

    const numericAge = Number(possibleNumber[0]);

    if (VALID_AGES.includes(numericAge)) {
      return numericAge;
    }
  }

  return null;
}
