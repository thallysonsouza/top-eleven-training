import auctionMarketValues from "./auctionMarketValues";

const MIN_AGE = 18;
const MAX_AGE = 21;

const MIN_OVERALL = 40;
const MAX_OVERALL = 250;

export default function calculateFairPrice(playerAge, baseOverall) {
  const age = Number(playerAge);
  const overall = Number(baseOverall);

  if (!Number.isInteger(age) || age < MIN_AGE || age > MAX_AGE) {
    return 0;
  }

  if (
    !Number.isInteger(overall) ||
    overall < MIN_OVERALL ||
    overall > MAX_OVERALL
  ) {
    return 0;
  }

  const fairPrice = auctionMarketValues[age]?.[overall];

  if (fairPrice === undefined) {
    return 0;
  }

  return fairPrice;
}
