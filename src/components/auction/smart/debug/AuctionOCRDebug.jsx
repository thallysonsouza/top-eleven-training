import { useEffect, useRef, useState } from "react";

import { ImageOff } from "lucide-react";

import { useSmartAuction } from "../../../../context/SmartAuctionContext";

import { AUCTION_SCANNER_REGIONS } from "../../../../engine/auction/ocr/auctionScannerRegions";

import "./AuctionOCRDebug.css";

function AuctionScannerDebug({ onRegionsChange }) {
  const imageRef = useRef(null);

  const { croppedFrame } = useSmartAuction();

  const [imageSize, setImageSize] = useState({
    width: 1,
    height: 1,
  });

  /*
   * =========================
   * FIXED REGIONS
   * =========================
   *
   * As regiões do OCR agora são
   * completamente fixas.
   *
   * Não existe mais:
   *
   * - drag
   * - resize
   * - seleção
   * - interação manual
   *
   * Isso garante que o OCR sempre
   * utilize exatamente as mesmas
   * áreas.
   */

  const regions = AUCTION_SCANNER_REGIONS;

  /*
   * =========================
   * REGION CHANGE
   * =========================
   *
   * Mantemos a comunicação com o
   * AuctionScannerDebugManager.
   *
   * Porém, agora sempre enviamos
   * as regiões fixas.
   */

  useEffect(() => {
    if (onRegionsChange) {
      onRegionsChange(regions);
    }
  }, [onRegionsChange, regions]);

  /*
   * =========================
   * IMAGE LOAD
   * =========================
   */

  function handleImageLoad(event) {
    const image = event.currentTarget;

    setImageSize({
      width: image.naturalWidth,
      height: image.naturalHeight,
    });
  }

  /*
   * =========================
   * NO CROPPED FRAME
   * =========================
   */

  if (!croppedFrame) {
    return (
      <section className="auction-scanner-debug">
        <div className="auction-scanner-debug-empty">
          <div className="auction-scanner-debug-empty-icon">
            <ImageOff size={32} />
          </div>

          <h2>No Auction Image</h2>

          <p>
            Complete Game Connection, Scanner Configuration and Scanner Region
            first.
          </p>
        </div>
      </section>
    );
  }

  /*
   * =========================
   * RENDER
   * =========================
   */

  return (
    <section className="auction-scanner-debug">
      {/* =========================
          IMAGE
      ========================= */}

      <div className="auction-scanner-debug-stage">
        <div className="auction-scanner-debug-image-wrapper">
          <img
            ref={imageRef}
            src={croppedFrame}
            alt="Cropped auction area"
            onLoad={handleImageLoad}
            draggable={false}
          />

          {/* =========================
              FIXED OCR REGIONS
          ========================= */}

          {Object.entries(regions).map(([regionName, region]) => {
            return (
              <div
                key={regionName}
                className="auction-scanner-debug-region"
                style={{
                  left: `${region.x * 100}%`,
                  top: `${region.y * 100}%`,
                  width: `${region.width * 100}%`,
                  height: `${region.height * 100}%`,
                }}
              >
                <span>{regionName}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================
          REGION INFORMATION
      ========================= */}

      <div className="auction-scanner-debug-information">
        {Object.entries(regions).map(([regionName, region]) => {
          return (
            <div key={regionName} className="auction-scanner-debug-region-card">
              <div className="auction-scanner-debug-region-title">
                <strong>{regionName}</strong>
              </div>

              <div className="auction-scanner-debug-region-values">
                <span>X: {region.x.toFixed(3)}</span>

                <span>Y: {region.y.toFixed(3)}</span>

                <span>W: {region.width.toFixed(3)}</span>

                <span>H: {region.height.toFixed(3)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================
          IMAGE INFORMATION
      ========================= */}

      <div className="auction-scanner-debug-footer">
        <span>
          Image: {imageSize.width} × {imageSize.height}
        </span>

        <span>OCR regions fixed</span>
      </div>
    </section>
  );
}

export default AuctionScannerDebug;
