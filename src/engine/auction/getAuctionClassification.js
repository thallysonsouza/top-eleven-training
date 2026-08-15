export default function getAuctionClassification(score) {
  const value = Number(score);

  if (!Number.isFinite(value)) {
    return "RUIM";
  }

  if (value >= 0.98) {
    return "FENÔMENO";
  }

  if (value >= 0.95) {
    return "EXCELENTE";
  }

  if (value >= 0.9) {
    return "ÓTIMO";
  }

  if (value >= 0.8) {
    return "BOM";
  }

  if (value >= 0.6) {
    return "NORMAL";
  }

  return "RUIM";
}
