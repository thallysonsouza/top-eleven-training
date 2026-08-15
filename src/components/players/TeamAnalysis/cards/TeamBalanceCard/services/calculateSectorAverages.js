function average(players) {
  if (players.length === 0) {
    return 0;
  }

  const sum = players.reduce((total, player) => total + player.overall, 0);

  return sum / players.length;
}

export default function calculateSectorAverages(sectors) {
  return {
    defense: average(sectors.defense),

    midfield: average(sectors.midfield),

    attack: average(sectors.attack),

    overall: average(sectors.all),
  };
}
