import { createWorker } from "tesseract.js";

import { OCR_CONFIG } from "./ocrConfig";

import { cleanOCRText } from "./textCleaner";

let worker = null;

async function getWorker() {
  if (worker) {
    return worker;
  }

  worker = await createWorker("eng");

  return worker;
}

export async function recognizeRegion(canvas, regionType) {
  const config = OCR_CONFIG[regionType];

  const worker = await getWorker();

  await worker.setParameters({
    tessedit_pageseg_mode: config.psm,

    tessedit_char_whitelist: config.whitelist,
  });

  const { data } = await worker.recognize(canvas);

  console.dir(data, { depth: null });

  console.log(`========== OCR ${regionType} ==========`);

  console.log("Texto bruto:", JSON.stringify(data.text));

  console.log("Confidence:", data.confidence);

  console.log("==============================");

  return {
    text: cleanOCRText(data.text),

    confidence: data.confidence,
  };
}
