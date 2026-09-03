import recognizeAuctionRegion from "./recognizeAuctionRegion";
import cropAuctionRegion from "./cropAuctionRegion";
import { AUCTION_SCANNER_REGIONS } from "./auctionScannerRegions";
import normalizePosition from "./normalizePosition";

export default async function readAuctionRegion(
  image,
  regionName,
  configuredRegions = null,
) {
  if (!image) {
    throw new Error("Auction image is required.");
  }

  /*
   * =========================
   * REGION SOURCE
   * =========================
   */

  const regionMap = configuredRegions || AUCTION_SCANNER_REGIONS;

  const region = regionMap[regionName];

  if (!region) {
    throw new Error(`Unknown auction region: ${regionName}`);
  }

  /*
   * =========================
   * CROP
   * =========================
   */

  const croppedRegion = cropAuctionRegion(image, region);

  /*
   * =========================
   * OCR
   * =========================
   */

  const result = await recognizeAuctionRegion(croppedRegion, regionName);

  /*
   * =========================
   * POSITION VALIDATION
   * =========================
   *
   * O Tesseract pode retornar:
   *
   * STAML
   * STAMC
   * DLDC
   * DCDMC
   *
   * mesmo que a confidence seja baixa.
   *
   * A validação usa as regras oficiais
   * de position / position2 / position3.
   */

  let positionData = null;

  if (regionName === "POSITION") {
    positionData = normalizePosition(result.text, result.confidence);
  }

  /*
   * =========================
   * RESULT
   * =========================
   */

  return {
    region: regionName,

    text: result.text,

    /*
     * Confidence original do Tesseract.
     *
     * NÃO substituímos essa informação.
     */

    confidence: result.confidence,

    /*
     * =========================
     * POSITION VALIDATION
     * =========================
     */

    positions: positionData?.positions || [],

    positionValid: positionData?.valid || false,

    positionConfidence: positionData?.confidence || 0,

    positionNormalizedText: positionData?.normalizedText || "",

    /*
     * =========================
     * CROP
     * =========================
     */

    crop: croppedRegion.toDataURL("image/png"),

    /*
     * =========================
     * COORDINATES
     * =========================
     */

    coordinates: {
      x: region.x,
      y: region.y,
      width: region.width,
      height: region.height,
    },
  };
}
