import normalizePosition from "./normalizePosition";
import normalizeAge from "./normalizeAge";
import normalizeOverall from "./normalizeOverall";
import normalizeMarketValue from "./normalizeMarketValue";

export default function parseAuctionPlayer(text) {
  if (!text) {
    return null;
  }

  const normalizedText = String(text)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  /*
   * =========================
   * POSITION
   * =========================
   */

  const positions = normalizePosition(normalizedText.join(" "));

  /*
   * =========================
   * AGE
   * =========================
   */

  const age = normalizeAge(normalizedText.join(" "));

  /*
   * =========================
   * OVERALL
   * =========================
   */

  const overall = normalizeOverall(normalizedText.join(" "));

  /*
   * =========================
   * MARKET VALUE
   * =========================
   */

  const marketValue = normalizeMarketValue(normalizedText.join(" "));

  /*
   * =========================
   * RESULT
   * =========================
   */

  return {
    positions,
    age,
    overall,
    marketValue,
  };
}
