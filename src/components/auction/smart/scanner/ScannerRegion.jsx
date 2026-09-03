import { useEffect, useState } from "react";

import { ScanSearch, RefreshCw, ImageOff } from "lucide-react";

import { useSmartAuction } from "../../../../context/SmartAuctionContext";

import cropImage from "../../../../engine/auction/cropImage";

import "./ScannerRegion.css";

function ScannerRegion({ renderInterface = true }) {
  const {
    capturedFrame,
    captureVersion,
    scannerArea,
    croppedFrame,
    setCroppedFrame,
  } = useSmartAuction();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  /*
   * =========================
   * DEBUG STATE
   * =========================
   */

  console.log("SCANNER REGION STATE:", {
    captureVersion,
    capturedFrame: Boolean(capturedFrame),
    scannerArea,
    croppedFrame: Boolean(croppedFrame),
    renderInterface,
  });

  /*
   * =========================
   * AUTOMATIC CROP
   * =========================
   *
   * Este efeito fica ativo mesmo
   * quando a Tela 3 não está sendo
   * exibida.
   *
   * Portanto:
   *
   * captura nova
   *      ↓
   * capturedFrame muda
   *      ↓
   * crop anterior é apagado
   *      ↓
   * novo crop é gerado
   *      ↓
   * croppedFrame atualizado
   */

  useEffect(() => {
    let cancelled = false;

    async function generateAutomaticCrop() {
      /*
       * =========================
       * VALIDATION
       * =========================
       */

      if (!capturedFrame) {
        setCroppedFrame(null);

        return;
      }

      if (!scannerArea) {
        setCroppedFrame(null);

        return;
      }

      /*
       * =========================
       * START NEW CROP
       * =========================
       */

      try {
        setLoading(true);

        setError("");

        /*
         * A captura mudou.
         *
         * Portanto, o crop anterior
         * não pode mais ser utilizado.
         */

        setCroppedFrame(null);

        console.log("==========================================");
        console.log("GENERATING NEW SCANNER CROP");
        console.log("Capture version:", captureVersion);
        console.log("Scanner area:", scannerArea);
        console.log("==========================================");

        /*
         * =========================
         * GENERATE CROP
         * =========================
         */

        const croppedImage = await cropImage(capturedFrame, scannerArea);

        /*
         * =========================
         * CANCELLED CHECK
         * =========================
         *
         * Se uma captura mais nova
         * chegou enquanto o crop estava
         * sendo processado, ignoramos
         * este resultado.
         */

        if (cancelled) {
          console.log(
            "Scanner crop cancelled for capture version:",
            captureVersion,
          );

          return;
        }

        /*
         * =========================
         * PUBLISH NEW CROP
         * =========================
         */

        setCroppedFrame(croppedImage);

        console.log("==========================================");
        console.log("NEW SCANNER CROP GENERATED SUCCESSFULLY");
        console.log("Capture version:", captureVersion);
        console.log("==========================================");
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error("Scanner crop error:", error);

        setCroppedFrame(null);

        setError("Unable to generate the scanner region.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    generateAutomaticCrop();

    /*
     * =========================
     * CLEANUP
     * =========================
     */

    return () => {
      cancelled = true;
    };
  }, [capturedFrame, captureVersion, scannerArea, setCroppedFrame]);

  /*
   * =========================
   * BACKGROUND ENGINE
   * =========================
   *
   * Se não estivermos na Tela 3,
   * não renderizamos absolutamente
   * nada na interface.
   *
   * Porém o useEffect acima continua
   * funcionando normalmente.
   */

  if (!renderInterface) {
    return null;
  }

  /*
   * =========================
   * NO FRAME
   * =========================
   */

  if (!capturedFrame) {
    return (
      <section className="scanner-region">
        <div className="scanner-region-empty">
          <div className="scanner-region-empty-icon">
            <ImageOff size={32} />
          </div>

          <h2>No Frame Available</h2>

          <p>Capture a game frame in Game Connection first.</p>
        </div>
      </section>
    );
  }

  /*
   * =========================
   * NO SCANNER AREA
   * =========================
   */

  if (!scannerArea) {
    return (
      <section className="scanner-region">
        <div className="scanner-region-empty">
          <div className="scanner-region-empty-icon">
            <ScanSearch size={32} />
          </div>

          <h2>Scanner Area Not Configured</h2>

          <p>Scanner area is not configured.</p>
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
    <section className="scanner-region">
      {/* =========================
          HEADER
      ========================= */}

      <div className="scanner-region-header">
        <small>SCANNER REGION</small>

        <div className="scanner-region-dimensions">
          {Math.round(scannerArea.width)}

          {" × "}

          {Math.round(scannerArea.height)}
        </div>
      </div>

      {/* =========================
          CROPPED IMAGE
      ========================= */}

      <div className="scanner-region-preview">
        {loading ? (
          <div className="scanner-region-loading">
            <RefreshCw size={24} className="scanner-region-spinner" />

            <span>Generating scanner region...</span>
          </div>
        ) : croppedFrame ? (
          <img src={croppedFrame} alt="Cropped auction region" />
        ) : (
          <div className="scanner-region-loading">
            <ScanSearch size={24} />

            <span>Scanner region not generated.</span>
          </div>
        )}
      </div>

      {/* =========================
          ERROR
      ========================= */}

      {error && <div className="scanner-region-error">{error}</div>}

      {/* =========================
          INFORMATION
      ========================= */}

      {scannerArea && (
        <div className="scanner-region-coordinates">
          <span>X: {Math.round(scannerArea.x)}</span>

          <span>Y: {Math.round(scannerArea.y)}</span>

          <span>W: {Math.round(scannerArea.width)}</span>

          <span>H: {Math.round(scannerArea.height)}</span>
        </div>
      )}
    </section>
  );
}

export default ScannerRegion;
