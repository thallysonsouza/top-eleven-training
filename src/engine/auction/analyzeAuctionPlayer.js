import auctionEngine from "./auctionEngine";

export default function analyzeAuctionPlayer(player, accountLevel) {
  if (!player) {
    return null;
  }

  const numericAccountLevel = Number(accountLevel);

  /*
   * O Account Level agora vem
   * diretamente do Smart Target.
   *
   * Não existe mais um nível
   * fixo dentro desta função.
   */

  if (!Number.isFinite(numericAccountLevel) || numericAccountLevel <= 0) {
    return null;
  }

  const result = auctionEngine({
    accountLevel: numericAccountLevel,

    playerOverall: player.overall,

    marketValue: player.marketValue,

    playerAge: player.age,
  });

  return {
    ...player,

    analysis: {
      accountLevel: result.accountLevel,

      baseAccountLevel: result.baseAccountLevel,

      baseOverall: result.baseOverall,

      fairPrice: result.fairPrice,

      score: result.score,

      classification: result.classification,

      recommendation: result.recommendation,
    },
  };
}
