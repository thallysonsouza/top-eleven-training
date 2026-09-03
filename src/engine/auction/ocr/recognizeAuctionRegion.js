import { createWorker } from "tesseract.js";

import { AUCTION_OCR_CONFIG } from "./auctionOCRConfig";

import preprocessAuctionRegion from "./preprocessAuctionRegion";

function isValidNumericResult(text, regionType) {
  const value = Number(String(text || "").replace(/\D/g, ""));

  if (!Number.isFinite(value)) {
    return false;
  }

  if (regionType === "AGE") {
    return value >= 18 && value <= 33;
  }

  if (regionType === "OVERALL") {
    return value >= 40 && value <= 99;
  }

  return true;
}

async function runOCR(image, config) {
  const worker = await createWorker("eng");

  try {
    await worker.setParameters({
      tessedit_pageseg_mode: config.psm,

      tessedit_char_whitelist: config.whitelist,
    });

    const result = await worker.recognize(image);

    return {
      text: result.data.text,
      confidence: result.data.confidence,
    };
  } finally {
    await worker.terminate();
  }
}

export default async function recognizeAuctionRegion(imageSource, regionType) {
  if (!imageSource) {
    throw new Error("Auction OCR image is required.");
  }

  const config = AUCTION_OCR_CONFIG[regionType];

  if (!config) {
    throw new Error(`Unknown auction OCR region: ${regionType}`);
  }

  /*
   * ============================================================
   * PRIMARY OCR
   * ============================================================
   */

  const primaryImage = preprocessAuctionRegion(
    imageSource,
    regionType,
    "primary",
  );

  const primaryResult = await runOCR(primaryImage, config);

  /*
   * ============================================================
   * VALIDATE PRIMARY RESULT
   * ============================================================
   */

  const needsRetry =
    regionType === "AGE" || regionType === "OVERALL"
      ? !isValidNumericResult(primaryResult.text, regionType)
      : false;

  /*
   * ============================================================
   * SECONDARY OCR
   * ============================================================
   */

  if (needsRetry) {
    const secondaryImage = preprocessAuctionRegion(
      imageSource,
      regionType,
      "secondary",
    );

    const secondaryResult = await runOCR(secondaryImage, config);

    /*
     * Se a segunda leitura for válida,
     * usamos ela.
     */

    if (isValidNumericResult(secondaryResult.text, regionType)) {
      return {
        text: secondaryResult.text,

        confidence: secondaryResult.confidence,

        ocrAttempt: "secondary",
      };
    }
  }

  /*
   * ============================================================
   * PRIMARY RESULT
   * ============================================================
   */

  return {
    text: primaryResult.text,

    confidence: primaryResult.confidence,

    ocrAttempt: "primary",
  };
}
