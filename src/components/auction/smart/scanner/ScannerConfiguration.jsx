import { ImageOff } from "lucide-react";

import { useSmartAuction } from "../../../../context/SmartAuctionContext";

import "./ScannerConfiguration.css";

function ScannerConfiguration() {
  const { capturedFrame, scannerArea } = useSmartAuction();

  /*
   * =========================
   * NO FRAME
   * =========================
   */

  if (!capturedFrame) {
    return (
      <section className="scanner-configuration">
        <div className="scanner-configuration-empty">
          <div className="scanner-configuration-empty-icon">
            <ImageOff size={32} />
          </div>

          <h2>No Frame Available</h2>

          <p>
            Capture a game frame in Game Connection before viewing the scanner
            configuration.
          </p>
        </div>
      </section>
    );
  }

  /*
   * =========================
   * SCANNER AREA
   * =========================
   */

  const area = scannerArea;

  /*
   * =========================
   * IMAGE DIMENSIONS
   * =========================
   */

  const image = new Image();

  image.src = capturedFrame;

  const naturalWidth = image.naturalWidth || 1920;
  const naturalHeight = image.naturalHeight || 1080;

  /*
   * =========================
   * RENDER
   * =========================
   */

  return (
    <section className="scanner-configuration">
      {/* =========================
          HEADER
      ========================= */}

      <div className="scanner-configuration-header">
        <small>SCANNER CONFIGURATION</small>

        <div className="scanner-configuration-resolution">
          {naturalWidth}
          {" × "}
          {naturalHeight}
        </div>
      </div>

      {/* =========================
          FRAME
      ========================= */}

      <div className="scanner-configuration-stage">
        <div className="scanner-configuration-image-wrapper">
          <img
            src={capturedFrame}
            alt="Captured Top Eleven frame"
            draggable={false}
          />

          {/* =========================
              AUTOMATIC SCANNER AREA
          ========================= */}

          {area && (
            <div
              className="scanner-configuration-selection"
              style={{
                left: `${(area.x / naturalWidth) * 100}%`,
                top: `${(area.y / naturalHeight) * 100}%`,
                width: `${(area.width / naturalWidth) * 100}%`,
                height: `${(area.height / naturalHeight) * 100}%`,
              }}
            >
              <div className="scanner-configuration-selection-info">
                {Math.round(area.width)}
                {" × "}
                {Math.round(area.height)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================
          AUTOMATIC COORDINATES
      ========================= */}

      <div className="scanner-configuration-footer">
        <div className="scanner-configuration-coordinates">
          {area ? (
            <>
              <span>X: {Math.round(area.x)}</span>

              <span>Y: {Math.round(area.y)}</span>

              <span>W: {Math.round(area.width)}</span>

              <span>H: {Math.round(area.height)}</span>
            </>
          ) : (
            <span>Scanner area not configured</span>
          )}
        </div>
      </div>
    </section>
  );
}

export default ScannerConfiguration;
