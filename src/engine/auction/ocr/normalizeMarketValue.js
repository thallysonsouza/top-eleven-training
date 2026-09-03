const MIN_MARKET_VALUE = 0;

function normalizeNumber(text) {
  return String(text)
    .replace(",", ".")
    .replace(/[^0-9.]/g, "");
}

export default function normalizeMarketValue(text) {
  if (!text) {
    return null;
  }

  let normalizedText = String(text).toUpperCase().trim();

  /*
   * =========================
   * OCR CORRECTIONS
   * =========================
   *
   * Alguns erros comuns:
   *
   * 2.14M → 2.14M
   * 2,14M → 2.14M
   * 2.14N → 2.14M
   * 0.86K → 0.86K
   */

  normalizedText = normalizedText.replace(/,/g, ".").replace(/N$/g, "M");

  /*
   * =========================
   * UNIT
   * =========================
   */

  const unitMatch = normalizedText.match(/([MK])\s*$/);

  const unit = unitMatch ? unitMatch[1] : null;

  /*
   * Retira a unidade.
   *
   * Importante:
   *
   * 2.14M → 2.14
   * 0.86K → 0.86
   *
   * A engine trabalha em M$.
   */

  const numberText = normalizedText.replace(/[MK]\s*$/, "").trim();

  const cleanedNumber = normalizeNumber(numberText);

  if (!cleanedNumber) {
    return null;
  }

  const value = Number(cleanedNumber);

  if (!Number.isFinite(value)) {
    return null;
  }

  if (value < MIN_MARKET_VALUE) {
    return null;
  }

  /*
   * =========================
   * KILO
   * =========================
   *
   * Se o jogo/OCR fornecer K,
   * convertemos para M$.
   *
   * 860K = 0.86M$
   */

  if (unit === "K") {
    return value / 1000;
  }

  /*
   * =========================
   * MEGA
   * =========================
   *
   * 2.14M → 2.14 M$
   */

  return value;
}
