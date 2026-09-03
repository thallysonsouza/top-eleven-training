import createAuctionPlayer from "./createAuctionPlayer";
import normalizeMarketValue from "./normalizeMarketValue";

export default function parseAuctionPlayer({
  positions = [],
  age,
  overall,
  marketValue,
}) {
  const normalizedMarketValue = normalizeMarketValue(marketValue);

  return createAuctionPlayer({
    positions,
    age,
    overall,
    marketValue: normalizedMarketValue,
  });
}
