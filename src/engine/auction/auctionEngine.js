import calculateBaseOverall from "./calculateBaseOverall";
import calculateFairPrice from "./calculateFairPrice";
import calculateAuctionScore from "./calculateAuctionScore";
import getAuctionClassification from "./getAuctionClassification";
import getAuctionRecommendation from "./getAuctionRecommendation";
import normalizeMarketValue from "./normalizeMarketValue";

const BASE_ACCOUNT_LEVEL = 5;

export default function auctionEngine({
  accountLevel,
  playerOverall,
  marketValue,
  playerAge,
}) {
  const normalizedMarketValue = normalizeMarketValue(marketValue);

  const baseOverall = calculateBaseOverall(playerOverall, accountLevel);

  const fairPrice = calculateFairPrice(playerAge, baseOverall);

  const score = calculateAuctionScore(normalizedMarketValue, fairPrice);

  const classification = getAuctionClassification(score);

  const recommendation = getAuctionRecommendation(classification);

  return {
    accountLevel: Number(accountLevel),
    playerOverall: Number(playerOverall),
    marketValue: normalizedMarketValue,
    playerAge: Number(playerAge),

    baseAccountLevel: BASE_ACCOUNT_LEVEL,
    baseOverall,

    fairPrice,

    score,

    classification,

    recommendation,
  };
}
