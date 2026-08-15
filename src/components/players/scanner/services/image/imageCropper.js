export function cropRegion(image, region) {
  const canvas = document.createElement("canvas");

  const ctx = canvas.getContext("2d");

  const sx = image.width * region.x;

  const sy = image.height * region.y;

  const sw = image.width * region.width;

  const sh = image.height * region.height;

  canvas.width = sw;

  canvas.height = sh;

  ctx.drawImage(
    image,

    sx,
    sy,
    sw,
    sh,

    0,
    0,
    sw,
    sh,
  );

  return canvas;
}
