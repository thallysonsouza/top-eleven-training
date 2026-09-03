const MAX_POSITIONS = 3;

export default function createAuctionPlayer({
  positions = [],
  age,
  overall,
  marketValue,
}) {
  const normalizedPositions = Array.isArray(positions)
    ? positions
        .map((position) => String(position).trim().toUpperCase())
        .filter((position) => position && position !== "---")
        .slice(0, MAX_POSITIONS)
    : [];

  const normalizedAge = Number(age);

  const normalizedOverall = Number(overall);

  const normalizedMarketValue = Number(marketValue);

  return {
    positions: normalizedPositions,

    age: Number.isFinite(normalizedAge) ? normalizedAge : 0,

    overall: Number.isFinite(normalizedOverall) ? normalizedOverall : 0,

    marketValue: Number.isFinite(normalizedMarketValue)
      ? normalizedMarketValue
      : 0,
  };
}
