export default function searchBestOverall({
  start,
  end,
  step,
  direction,
  simulate,
}) {
  let bestOverall = start;

  let bestBalance = -Infinity;

  let previousBalance = -Infinity;

  let drops = 0;

  for (
    let overall = start;
    direction > 0 ? overall <= end : overall >= end;
    overall += step * direction
  ) {
    const result = simulate(overall);

    const currentBalance = result.overall;

    if (currentBalance > bestBalance) {
      bestBalance = currentBalance;

      bestOverall = overall;
    }

    if (currentBalance < previousBalance) {
      drops++;

      if (drops >= 2) {
        break;
      }
    } else {
      drops = 0;
    }

    previousBalance = currentBalance;
  }

  return {
    overall: bestOverall,

    balance: bestBalance,
  };
}
