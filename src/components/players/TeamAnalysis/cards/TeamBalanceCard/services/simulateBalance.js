import calculateSectorAverages from "./calculateSectorAverages";
import calculateDeviation from "./calculateDeviation";
import calculatePenalty from "./calculatePenalty";
import calculateBalance from "./calculateBalance";

export default function simulateBalance({
  sectors,
  weakPlayer,
  weakSector,
  overall,
}) {
  const simulated = {
    defense: sectors.defense.map((player) => ({ ...player })),
    midfield: sectors.midfield.map((player) => ({ ...player })),
    attack: sectors.attack.map((player) => ({ ...player })),
    all: sectors.all.map((player) => ({ ...player })),
  };

  const sector = simulated[weakSector.toLowerCase()];

  sector.forEach((player) => {
    if (
      player.player.id === weakPlayer.player.id &&
      player.position === weakPlayer.position
    ) {
      player.overall = overall;
    }
  });

  simulated.all.forEach((player) => {
    if (
      player.player.id === weakPlayer.player.id &&
      player.position === weakPlayer.position
    ) {
      player.overall = overall;
    }
  });

  const averages = calculateSectorAverages(simulated);

  const deviation = calculateDeviation(simulated, averages);

  const penalty = calculatePenalty(deviation);

  const balance = calculateBalance(penalty);

  return balance;
}
