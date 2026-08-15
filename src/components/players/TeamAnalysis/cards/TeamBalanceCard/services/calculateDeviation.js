function standardDeviation(values) {
  if (values.length === 0) {
    return 0;
  }

  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;

  const variance =
    values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;

  return Math.sqrt(variance);
}

function getOveralls(players) {
  return players.map((player) => player.overall);
}

export default function calculateDeviation(sectors, averages) {
  return {
    attack: standardDeviation([
      ...getOveralls(sectors.attack),
      averages.attack,
      averages.overall,
    ]),

    midfield: standardDeviation([
      ...getOveralls(sectors.midfield),
      averages.midfield,
      averages.overall,
    ]),

    defense: standardDeviation([
      ...getOveralls(sectors.defense),
      averages.defense,
      averages.overall,
    ]),

    structure: standardDeviation([
      averages.attack,
      averages.midfield,
      averages.defense,
      averages.overall,
    ]),
  };
}
