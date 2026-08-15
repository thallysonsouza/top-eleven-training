const PREPROCESS_CONFIG = {
  NAME: {
    scale: 5,
    grayscale: true,
    contrast: 1.45,
    brightness: 1.08,
    threshold: null,
  },

  INFO: {
    scale: 6,
    grayscale: true,
    contrast: 1.6,
    brightness: 1.05,
    threshold: 170,
  },

  ROLES: {
    scale: 10,
    grayscale: true,
    contrast: 1.8,
    brightness: 1.05,
    threshold: null,
  },

  ATTRIBUTES: {
    scale: 6,
    grayscale: true,
    contrast: 1.9,
    brightness: 1.02,
    threshold: 175,
  },

  SKILLS: {
    scale: 5,
    grayscale: true,
    contrast: 2.0,
    brightness: 1.0,
    threshold: 165,
  },
};

export function preprocessRegion(canvas, regionType) {
  const config = PREPROCESS_CONFIG[regionType];

  if (!config) {
    return canvas;
  }

  const scaledCanvas = document.createElement("canvas");

  scaledCanvas.width = canvas.width * config.scale;

  scaledCanvas.height = canvas.height * config.scale;

  const ctx = scaledCanvas.getContext("2d");

  ctx.imageSmoothingEnabled = false;

  ctx.drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height);

  const image = ctx.getImageData(0, 0, scaledCanvas.width, scaledCanvas.height);

  const data = image.data;

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];

    let g = data[i + 1];

    let b = data[i + 2];

    if (config.grayscale) {
      let gray;

      if (regionType === "ROLES") {
        gray = Math.max(r, g, b);
      } else {
        gray = r * 0.299 + g * 0.587 + b * 0.114;
      }

      gray *= config.brightness;

      gray = (gray - 128) * config.contrast + 128;

      gray = Math.max(0, Math.min(255, gray));

      if (config.threshold !== null) {
        gray = gray > config.threshold ? 255 : 0;
      }

      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }
  }

  ctx.putImageData(image, 0, 0);

  if (regionType === "ROLES") {
    document.body.appendChild(scaledCanvas);
    scaledCanvas.style.border = "2px solid red";
    scaledCanvas.style.margin = "10px";
  }

  return scaledCanvas;
}
