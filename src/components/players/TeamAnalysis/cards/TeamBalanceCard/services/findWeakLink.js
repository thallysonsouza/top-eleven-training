export default function findWeakLink(sectors, averages, weakSector) {
  const players = sectors[weakSector.toLowerCase()];

  if (!players.length) {
    return null;
  }

  const sectorAverage = averages[weakSector.toLowerCase()];

  let weakPlayer = null;

  let lowestDifference = Infinity;

  players.forEach((item) => {
    const difference = item.overall - sectorAverage;

    if (difference < lowestDifference) {
      lowestDifference = difference;

      weakPlayer = {
        ...item,

        difference,
      };
    }
  });

  return weakPlayer;
}
