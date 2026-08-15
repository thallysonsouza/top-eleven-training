import simulateBalance from "./simulateBalance";
import searchBestOverall from "./searchBestOverall";

export default function findSuggestedOverall({
  sectors,

  weakPlayer,

  weakSector,

  teamOverall,

  balance,
}) {
  if (!weakPlayer) {
    return null;
  }

  const current = weakPlayer.overall;

  const direction = current < teamOverall ? 1 : -1;

  // ==========================================
  // 1ª ETAPA
  // Busca grosseira (passo 10)
  // ==========================================

  const coarse = searchBestOverall({
    start: current,

    end: current + direction * 100,

    step: 10,

    direction,

    simulate: (overall) =>
      simulateBalance({
        sectors,

        weakPlayer,

        weakSector,

        overall,
      }),
  });

  // ==========================================
  // 2ª ETAPA
  // Refinamento inteiro (passo 1)
  // ==========================================

  const refined = searchBestOverall({
    start: coarse.overall - 10,

    end: coarse.overall + 10,

    step: 1,

    direction: 1,

    simulate: (overall) =>
      simulateBalance({
        sectors,

        weakPlayer,

        weakSector,

        overall,
      }),
  });

  // ==========================================
  // 3ª ETAPA
  // Refinamento decimal (passo 0.1)
  // ==========================================

  const decimal = searchBestOverall({
    start: refined.overall,

    end: refined.overall + 0.9,

    step: 0.1,

    direction: 1,

    simulate: (overall) =>
      simulateBalance({
        sectors,

        weakPlayer,

        weakSector,

        overall,
      }),
  });

  return {
    current,

    target: decimal.overall,

    currentBalance: balance.overall,

    expectedBalance: decimal.balance,

    gain: decimal.balance - balance.overall,

    direction: direction > 0 ? "UP" : "DOWN",
  };
}
