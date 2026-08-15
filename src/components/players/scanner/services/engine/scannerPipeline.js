import { readImage } from "../image/imageReader";

import { cropRegion } from "../image/imageCropper";

import { preprocessRegion } from "../image/imagePreprocessor";

import { recognizeRegion } from "../ocr/ocrService";

import { SCANNER_REGIONS } from "../image/scannerRegions";

import { createOCRResult } from "../ocr/ocrResult";

export async function executePipeline(imageSource) {
  console.log("========== SCANNER V2 ==========");

  const image = await readImage(imageSource);

  const result = createOCRResult();

  for (const [regionName, region] of Object.entries(SCANNER_REGIONS)) {
    const crop = cropRegion(image, region);

    const processed = preprocessRegion(crop, regionName);

    const ocr = await recognizeRegion(processed, regionName);

    result[regionName] = ocr;
  }

  console.log(result);

  console.log("===============================");

  return result;
}
