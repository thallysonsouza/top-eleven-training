export default function calculateAuctionScore(marketValue, fairPrice) {
  const market = Number(marketValue);
  const fair = Number(fairPrice);

  if (!Number.isFinite(market) || !Number.isFinite(fair)) {
    return 0;
  }

  if (fair <= 0) {
    return 0;
  }

  return market / fair;
}
