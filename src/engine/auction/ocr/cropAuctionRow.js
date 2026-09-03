export default function cropAuctionRow(image, row) {
  if (!image) {
    throw new Error("Auction image is required.");
  }

  if (!row) {
    throw new Error("Auction row is required.");
  }

  const canvas = document.createElement("canvas");

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Unable to create canvas context.");
  }

  /*
   * Pequena margem vertical para remover
   * possíveis linhas divisórias.
   */
  const padding = 2;

  const x = 0;

  const y = Math.max(0, Math.round(row.y + padding));

  const width = image.width;

  const height = Math.max(
    1,
    Math.min(image.height - y, Math.round(row.height - padding * 2)),
  );

  canvas.width = width;
  canvas.height = height;

  context.drawImage(image, x, y, width, height, 0, 0, width, height);

  return canvas;
}
