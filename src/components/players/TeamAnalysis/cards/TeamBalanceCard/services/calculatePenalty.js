function clamp(value) {
  return Math.max(0, Math.min(10, value));
}

export default function calculatePenalty(deviation) {
  const attack =
    10 - (0.0086 * deviation.attack ** 2 - 0.167 * deviation.attack + 9.9926);

  const midfield =
    10 -
    (0.0086 * deviation.midfield ** 2 - 0.167 * deviation.midfield + 9.9926);

  const defense =
    10 - (0.0086 * deviation.defense ** 2 - 0.167 * deviation.defense + 9.9926);

  const structure =
    10 -
    (-0.0092 * deviation.structure ** 2 +
      0.0344 * deviation.structure +
      10.012);

  const sector = Math.sqrt((attack ** 2 + midfield ** 2 + defense ** 2) / 3);

  return {
    attack: clamp(attack),

    midfield: clamp(midfield),

    defense: clamp(defense),

    structure: clamp(structure),

    sector: clamp(sector),
  };
}
