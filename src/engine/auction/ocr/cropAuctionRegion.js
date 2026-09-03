export default function cropAuctionRegion(image, region) {
  if (!image) {
    throw new Error("Auction image is required.");
  }

  if (!region) {
    throw new Error("Auction region is required.");
  }

  const canvas = document.createElement("canvas");

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Unable to create canvas context.");
  }

  const x = Math.round(image.width * region.x);
  const y = Math.round(image.height * region.y);

  const width = Math.round(image.width * region.width);
  const height = Math.round(image.height * region.height);

  if (width <= 0 || height <= 0) {
    throw new Error("Invalid auction region dimensions.");
  }

  canvas.width = width;
  canvas.height = height;

  context.drawImage(image, x, y, width, height, 0, 0, width, height);

  return canvas;
}
