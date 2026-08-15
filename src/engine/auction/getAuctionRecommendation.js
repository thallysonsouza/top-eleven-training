export default function getAuctionRecommendation(classification) {
  if (classification === "FENÔMENO" || classification === "EXCELENTE") {
    return "GASTE AGORA!!";
  }

  if (classification === "ÓTIMO") {
    return "BOA!!";
  }

  return "TESTE OUTRO JOGADOR";
}
