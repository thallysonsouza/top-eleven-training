import recognizeAuctionText from "./recognizeAuctionText";
import normalizeAuctionText from "./normalizeAuctionText";
import parseAuctionPlayer from "./parseAuctionPlayer";

export default async function readAuctionPlayer(imageSource) {
  if (!imageSource) {
    throw new Error("Auction image is required.");
  }

  /*
   * =========================
   * OCR
   * =========================
   */

  const rawText = await recognizeAuctionText(imageSource);

  console.log("========== OCR RAW TEXT ==========");
  console.log(rawText);

  /*
   * =========================
   * NORMALIZE TEXT
   * =========================
   */

  const normalizedText = normalizeAuctionText(rawText);

  console.log("====== OCR NORMALIZED TEXT ======");
  console.log(normalizedText);

  /*
   * =========================
   * PARSE PLAYER
   * =========================
   */

  const player = parseAuctionPlayer(normalizedText);

  console.log("========== OCR PLAYER ==========");
  console.log(player);

  return {
    rawText,

    normalizedText,

    player,
  };
}
