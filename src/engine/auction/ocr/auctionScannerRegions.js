/*
 * =========================
 * AUCTION SCANNER REGIONS
 * =========================
 *
 * Regiões fixas utilizadas
 * pelo Smart Auction OCR.
 *
 * As coordenadas são normalizadas
 * em relação ao croppedFrame:
 *
 * 0 → 1
 *
 * Essas regiões foram definidas
 * durante a calibração do scanner.
 */

export const AUCTION_SCANNER_REGIONS = {
  POSITION: {
    x: 0.447,
    y: 0.0,
    width: 0.131,
    height: 1.0,
  },

  AGE: {
    x: 0.585,
    y: 0.0,
    width: 0.045,
    height: 1.0,
  },

  OVERALL: {
    x: 0.723,
    y: 0.0,
    width: 0.04,
    height: 1.0,
  },

  MARKET_VALUE: {
    x: 0.879,
    y: 0.002,
    width: 0.1,
    height: 0.994,
  },
};
