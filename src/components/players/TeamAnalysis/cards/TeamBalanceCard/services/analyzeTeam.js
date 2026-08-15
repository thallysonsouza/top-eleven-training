import getSectorPlayers from "./getSectorPlayers";

import calculateSectorAverages from "./calculateSectorAverages";

import calculateDeviation from "./calculateDeviation";

import calculatePenalty from "./calculatePenalty";

import calculateBalance from "./calculateBalance";

import analyzeRecommendation from "./analyzeRecommendation";

export default function analyzeTeam(lineup) {
  const sectors = getSectorPlayers(lineup);

  const averages = calculateSectorAverages(sectors);

  const deviation = calculateDeviation(sectors, averages);

  const penalty = calculatePenalty(deviation);

  const balance = calculateBalance(penalty);

  const recommendation = analyzeRecommendation({
    lineup,

    sectors,

    averages,

    deviation,

    penalty,

    balance,
  });

  return {
    sectors,

    averages,

    deviation,

    penalty,

    balance,

    recommendation,
  };
}
