import { createWorker } from "tesseract.js";

export default async function recognizeAuctionText(imageSource) {
  if (!imageSource) {
    throw new Error("Image source is required.");
  }

  const worker = await createWorker("eng");

  try {
    const result = await worker.recognize(imageSource);

    return result.data.text;
  } finally {
    await worker.terminate();
  }
}
