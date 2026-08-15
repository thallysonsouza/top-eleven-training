const BASE_ACCOUNT_LEVEL = 5;
const OVR_DIFFERENCE_PER_LEVEL = 20;

export default function calculateBaseOverall(playerOverall, accountLevel) {
  const overall = Number(playerOverall);
  const level = Number(accountLevel);

  if (!Number.isFinite(overall) || !Number.isFinite(level)) {
    return 0;
  }

  return overall - (BASE_ACCOUNT_LEVEL - level) * OVR_DIFFERENCE_PER_LEVEL;
}
