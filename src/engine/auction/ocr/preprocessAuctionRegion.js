const PREPROCESS_CONFIG = {
  POSITION: {
    scale: 10,
    grayscale: true,
    contrast: 1.8,
    brightness: 1.05,
    threshold: null,
  },

  AGE: {
    scale: 8,
    contrast: 2.0,
    brightness: 1.0,
    threshold: 170,
  },

  OVERALL: {
    scale: 15,
    contrast: 1.8,
    brightness: 1.0,
    threshold: 200,
  },

  MARKET_VALUE: {
    scale: 7,
    contrast: 1.8,
    brightness: 1.0,
    threshold: 165,
  },
};

export default function preprocessAuctionRegion(canvas, regionType) {
  if (!canvas) {
    throw new Error("Auction OCR canvas is required.");
  }

  const config = PREPROCESS_CONFIG[regionType];

  if (!config) {
    throw new Error(`Unknown auction OCR region: ${regionType}`);
  }

  const output = document.createElement("canvas");

  output.width = Math.max(1, Math.round(canvas.width * config.scale));

  output.height = Math.max(1, Math.round(canvas.height * config.scale));

  const context = output.getContext("2d");

  if (!context) {
    throw new Error("Unable to create OCR preprocessing context.");
  }

  context.imageSmoothingEnabled = false;

  context.drawImage(
    canvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    output.width,
    output.height,
  );

  const imageData = context.getImageData(0, 0, output.width, output.height);

  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    let gray;

    /*
     * POSITION
     *
     * Botões coloridos.
     * Preservamos a intensidade da cor.
     */
    if (regionType === "POSITION") {
      gray = Math.max(r, g, b);
    } else if (
      /*
       * NUMEROS
       *
       * Fundo branco.
       * Informação preta/cinza.
       *
       * Usamos o menor canal para
       * favorecer os pixels escuros.
       */
      regionType === "OVERALL" ||
      regionType === "AGE" ||
      regionType === "MARKET_VALUE"
    ) {
      gray = Math.min(r, g, b);
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

  context.putImageData(imageData, 0, 0);

  return output;
}
