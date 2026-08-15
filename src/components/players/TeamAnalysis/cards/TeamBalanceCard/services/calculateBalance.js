function clamp(value) {
  return Math.min(10, value);
}

export default function calculateBalance(penalty) {
  const structure = 10 - penalty.structure;

  const sector = 10 - penalty.sector;

  const overall = (structure * sector) / 10;

  return {
    structure: clamp(structure),

    sector: clamp(sector),

    overall: clamp(overall),
  };
}
