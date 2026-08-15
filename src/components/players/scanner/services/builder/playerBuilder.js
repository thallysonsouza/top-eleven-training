import { parsePlayer } from "../parser/parserEngine";
import { fixPlayer } from "../fixer/playerFixer";
import { normalizePlayer } from "../normalizer/playerNormalizer";
import { validatePlayer } from "../validator/playerValidator";

export function buildPlayer(ocrResult) {
  console.log("BUILDER - parse");

  let player = parsePlayer(ocrResult);

  console.log(player);

  console.log("BUILDER - fix");

  player = fixPlayer(player);

  console.log(player);

  console.log("BUILDER - normalize");

  player = normalizePlayer(player);

  console.log(player);

  console.log("BUILDER - validate");

  player = validatePlayer(player);

  console.log(player);

  return player;
}
