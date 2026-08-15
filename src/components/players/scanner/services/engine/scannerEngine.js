import { executePipeline } from "./scannerPipeline";
import { buildPlayer } from "../builder/playerBuilder";

export async function scanPlayer(image) {
  console.log("ENGINE - iniciou");

  const ocrResult = await executePipeline(image);

  console.log("ENGINE - OCR");

  console.log(ocrResult);

  const player = buildPlayer(ocrResult);

  console.log("ENGINE - PLAYER");

  console.log(player);

  return player;
}
