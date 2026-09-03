export default function normalizeAuctionText(text) {
  if (!text) {
    return "";
  }

  return String(text)
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}
