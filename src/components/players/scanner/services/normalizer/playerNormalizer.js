import { normalizeName } from "./normalizeName";

import { normalizePositions } from "./normalizePositions";

import { normalizeSkills } from "./normalizeSkills";

export function normalizePlayer(player) {
  player.name = normalizeName(player.name);

  normalizePositions(player);

  normalizeSkills(player.skills);

  return player;
}
