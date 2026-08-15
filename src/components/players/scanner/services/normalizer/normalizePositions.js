export function normalizePositions(player) {
  const positions = [player.position1, player.position2, player.position3]

    .filter((position) => position !== "---")

    .filter(Boolean);

  const unique = [...new Set(positions)];

  player.position1 = unique[0] || "---";

  player.position2 = unique[1] || "---";

  player.position3 = unique[2] || "---";
}
