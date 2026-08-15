import findWeakLink from "./findWeakLink";

import findSuggestedOverall from "./findSuggestedOverall";

export default function analyzeRecommendation({
  lineup,

  sectors,

  averages,

  deviation,

  penalty,

  balance,
}) {
  const structuralProblem = penalty.structure >= penalty.sector;

  let weakSector = "";

  if (structuralProblem) {
    const values = [
      { sector: "Attack", value: deviation.attack },

      { sector: "Midfield", value: deviation.midfield },

      { sector: "Defense", value: deviation.defense },
    ];

    weakSector = values.reduce((max, current) =>
      current.value > max.value ? current : max,
    ).sector;
  } else {
    const values = [
      { sector: "Attack", value: Math.abs(penalty.attack) },

      { sector: "Midfield", value: Math.abs(penalty.midfield) },

      { sector: "Defense", value: Math.abs(penalty.defense) },
    ];

    weakSector = values.reduce((max, current) =>
      current.value > max.value ? current : max,
    ).sector;
  }

  const weakPlayer = findWeakLink(sectors, averages, weakSector);

  const suggestedOverall = findSuggestedOverall({
    sectors,

    weakPlayer,

    weakSector,

    teamOverall: averages.overall,

    balance,
  });

  return {
    type: structuralProblem ? "STRUCTURAL" : "SECTORIAL",

    weakSector,

    weakLink: weakPlayer
      ? `${weakPlayer.player.name} (${weakPlayer.position.replace(/[0-9]/g, "")})`
      : "---",

    weakPlayer,

    suggestedOverall,

    expectedBalance: suggestedOverall?.expectedBalance ?? balance.overall,
  };
}
