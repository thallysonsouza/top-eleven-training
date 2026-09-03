const MARKET_VALUE_UNITS = {
  K: 0.001,
  M: 1,
};

export default function normalizeMarketValue(value) {
  if (value === null || value === undefined) {
    return 0;
  }

  const text = String(value)
    .trim()
    .replace(",", ".")
    .replace(/\s+/g, "")
    .toUpperCase();

  if (!text) {
    return 0;
  }

  const match = text.match(/^(\d+(?:\.\d+)?)(K|M)?$/);

  if (!match) {
    return 0;
  }

  const number = Number(match[1]);
  const unit = match[2] || "M";

  if (!Number.isFinite(number)) {
    return 0;
  }

  const multiplier = MARKET_VALUE_UNITS[unit];

  if (multiplier === undefined) {
    return 0;
  }

  return number * multiplier;
}
