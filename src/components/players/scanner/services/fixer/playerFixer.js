export function fixPlayer(player) {
  if (!player) {
    return {};
  }

  // Nome
  if (typeof player.name === "string") {
    player.name = player.name.trim();
  }

  // Idade
  if (player.age != null) {
    player.age = Number(player.age);
  }

  // Overall
  if (player.overall != null) {
    player.overall = Number(player.overall);
  }

  // Attributes
  ["defense", "attack", "physical"].forEach((key) => {
    if (player[key] != null) {
      player[key] = Number(player[key]);
    }
  });

  // Positions
  ["position1", "position2", "position3"].forEach((key) => {
    if (!player[key]) {
      player[key] = "---";
    }
  });

  // Skills
  if (player.skills) {
    Object.keys(player.skills).forEach((key) => {
      player.skills[key] = Number(player.skills[key]);
    });
  }

  return player;
}
