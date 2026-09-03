import { useMemo, useState } from "react";

import {
  Beaker,
  CheckCircle2,
  RefreshCw,
  RotateCcw,
  XCircle,
} from "lucide-react";

import { useSmartAuction } from "../../../../context/SmartAuctionContext";

import readImage from "../../../../engine/auction/ocr/readImage";

import detectAuctionRows from "../../../../engine/auction/ocr/detectAuctionRows";

import cropAuctionRow from "../../../../engine/auction/ocr/cropAuctionRow";

import cropAuctionRegion from "../../../../engine/auction/ocr/cropAuctionRegion";

import recognizeAuctionRegion from "../../../../engine/auction/ocr/recognizeAuctionRegion";

import normalizeOverall from "../../../../engine/auction/ocr/normalizeOverall";

import { AUCTION_SCANNER_REGIONS } from "../../../../engine/auction/ocr/auctionScannerRegions";

import "./OverallOCRLab.css";

const DEFAULT_CONFIG = {
  scale: 8,
  contrast: 2.0,
  brightness: 1.0,
  threshold: 170,
  useThreshold: true,
  imageSmoothing: false,
};

const MIN_OVERALL = 40;
const MAX_OVERALL = 99;

function OverallOCRLab() {
  const { croppedFrame } = useSmartAuction();

  const [loading, setLoading] = useState(false);

  const [rows, setRows] = useState([]);

  const [config, setConfig] = useState(DEFAULT_CONFIG);

  const [error, setError] = useState("");

  const [tested, setTested] = useState(false);

  /*
   * ============================================================
   * CONFIGURATION
   * ============================================================
   */

  function updateConfig(name, value) {
    setConfig((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetConfig() {
    setConfig(DEFAULT_CONFIG);
  }

  /*
   * ============================================================
   * PREPROCESS
   * ============================================================
   */

  function preprocessForLab(canvas) {
    if (!canvas) {
      throw new Error("Overall canvas is required.");
    }

    const output = document.createElement("canvas");

    output.width = Math.max(1, Math.round(canvas.width * config.scale));

    output.height = Math.max(1, Math.round(canvas.height * config.scale));

    const context = output.getContext("2d");

    if (!context) {
      throw new Error("Unable to create Overall OCR lab context.");
    }

    context.imageSmoothingEnabled = config.imageSmoothing;

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

      let gray = r * 0.299 + g * 0.587 + b * 0.114;

      gray *= config.brightness;

      gray = (gray - 128) * config.contrast + 128;

      gray = Math.max(0, Math.min(255, gray));

      if (config.useThreshold) {
        gray = gray > config.threshold ? 255 : 0;
      }

      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }

    context.putImageData(imageData, 0, 0);

    return output;
  }

  /*
   * ============================================================
   * OCR WITH LAB PREPROCESSING
   * ============================================================
   */

  async function recognizeOverallLab(canvas) {
    const processedImage = preprocessForLab(canvas);

    const result = await recognizeAuctionRegion(processedImage, "OVERALL");

    const normalized = normalizeOverall(result.text);

    return {
      rawText: result.text,

      confidence: Number(result.confidence) || 0,

      normalized,

      valid:
        normalized !== null &&
        normalized >= MIN_OVERALL &&
        normalized <= MAX_OVERALL,
    };
  }

  /*
   * ============================================================
   * TEST
   * ============================================================
   */

  async function handleTest() {
    if (!croppedFrame) {
      setError("No auction image is available.");

      return;
    }

    try {
      setLoading(true);

      setError("");

      setRows([]);

      setTested(false);

      console.clear();

      console.log("==========================================");

      console.log("          OVERALL OCR LAB");

      console.log("==========================================");

      console.log("");

      console.log("PREPROCESS CONFIG:", config);

      const image = await readImage(croppedFrame);

      const detectedRows = detectAuctionRows(image);

      const rowsToTest = detectedRows.slice(0, 6);

      const results = [];

      for (let index = 0; index < rowsToTest.length; index++) {
        const row = rowsToTest[index];

        const rowCrop = cropAuctionRow(image, row);

        const overallRegion = cropAuctionRegion(
          rowCrop,
          AUCTION_SCANNER_REGIONS.OVERALL,
        );

        /*
         * =========================
         * ORIGINAL OCR
         * =========================
         */

        const originalResult = await recognizeAuctionRegion(
          overallRegion,
          "OVERALL",
        );

        /*
         * =========================
         * LAB OCR
         * =========================
         */

        const labResult = await recognizeOverallLab(overallRegion);

        /*
         * =========================
         * CONSOLE
         * =========================
         */

        console.log("");

        console.log("------------------------------------------");

        console.log(`ROW ${index + 1}`);

        console.log("------------------------------------------");

        console.log("ORIGINAL OCR:", JSON.stringify(originalResult.text));

        console.log(
          "ORIGINAL CONFIDENCE:",
          `${Number(originalResult.confidence).toFixed(1)}%`,
        );

        console.log("LAB OCR:", JSON.stringify(labResult.rawText));

        console.log("LAB CONFIDENCE:", `${labResult.confidence.toFixed(1)}%`);

        console.log("LAB NORMALIZED:", labResult.normalized ?? "INVALID");

        console.log("LAB VALID:", labResult.valid ? "YES" : "NO");

        results.push({
          row: index + 1,

          originalText: originalResult.text,

          originalConfidence: Number(originalResult.confidence) || 0,

          labText: labResult.rawText,

          labConfidence: labResult.confidence,

          normalized: labResult.normalized,

          valid: labResult.valid,
        });
      }

      /*
       * =========================
       * FINISHED
       * =========================
       */

      console.log("");

      console.log("==========================================");

      console.log("          OVERALL OCR LAB FINISHED");

      console.log("==========================================");

      setRows(results);

      setTested(true);
    } catch (error) {
      console.error("Overall OCR Lab error:", error);

      setError("Unable to process the Overall OCR test.");
    } finally {
      setLoading(false);
    }
  }

  /*
   * ============================================================
   * STATISTICS
   * ============================================================
   */

  const statistics = useMemo(() => {
    if (!rows.length) {
      return {
        valid: 0,
        invalid: 0,
        total: 0,
      };
    }

    const valid = rows.filter((item) => item.valid).length;

    return {
      valid,

      invalid: rows.length - valid,

      total: rows.length,
    };
  }, [rows]);

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <section className="overall-ocr-lab">
      {/* =========================
          HEADER
      ========================= */}

      <header className="overall-ocr-lab-header">
        <div>
          <small>AUCTION OCR DEVELOPMENT</small>

          <h2>Overall OCR Lab</h2>

          <p>Test preprocessing and compare OCR results from Rows 1–6.</p>
        </div>

        <button
          type="button"
          className="overall-ocr-lab-test"
          onClick={handleTest}
          disabled={!croppedFrame || loading}
        >
          {loading ? (
            <>
              <RefreshCw size={16} className="overall-ocr-lab-spinner" />
              Testing...
            </>
          ) : (
            <>
              <Beaker size={16} />
              Test Rows 1–6
            </>
          )}
        </button>
      </header>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="overall-ocr-lab-error">
          <XCircle size={16} />

          <span>{error}</span>
        </div>
      )}

      {/* =========================
          PREPROCESSING
      ========================= */}

      <section className="overall-ocr-lab-panel">
        <div className="overall-ocr-lab-panel-header">
          <div>
            <small>PREPROCESSING</small>

            <h3>Image Processing</h3>
          </div>

          <button
            type="button"
            className="overall-ocr-lab-reset"
            onClick={resetConfig}
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>

        <div className="overall-ocr-lab-controls">
          <label>
            <div>
              <span>Scale</span>

              <strong>{config.scale.toFixed(1)}</strong>
            </div>

            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              value={config.scale}
              onChange={(event) =>
                updateConfig("scale", Number(event.target.value))
              }
            />
          </label>

          <label>
            <div>
              <span>Contrast</span>

              <strong>{config.contrast.toFixed(2)}</strong>
            </div>

            <input
              type="range"
              min="0.5"
              max="4"
              step="0.05"
              value={config.contrast}
              onChange={(event) =>
                updateConfig("contrast", Number(event.target.value))
              }
            />
          </label>

          <label>
            <div>
              <span>Brightness</span>

              <strong>{config.brightness.toFixed(2)}</strong>
            </div>

            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.01"
              value={config.brightness}
              onChange={(event) =>
                updateConfig("brightness", Number(event.target.value))
              }
            />
          </label>

          <label>
            <div>
              <span>Threshold</span>

              <strong>{config.threshold}</strong>
            </div>

            <input
              type="range"
              min="50"
              max="240"
              step="1"
              value={config.threshold}
              disabled={!config.useThreshold}
              onChange={(event) =>
                updateConfig("threshold", Number(event.target.value))
              }
            />
          </label>
        </div>

        <div className="overall-ocr-lab-options">
          <label>
            <input
              type="checkbox"
              checked={config.useThreshold}
              onChange={(event) =>
                updateConfig("useThreshold", event.target.checked)
              }
            />

            <span>Threshold</span>
          </label>

          <label>
            <input
              type="checkbox"
              checked={config.imageSmoothing}
              onChange={(event) =>
                updateConfig("imageSmoothing", event.target.checked)
              }
            />

            <span>Image smoothing</span>
          </label>
        </div>
      </section>

      {/* =========================
          SUMMARY
      ========================= */}

      {tested && (
        <section className="overall-ocr-lab-summary">
          <div>
            <span>TESTED</span>

            <strong>{statistics.total}</strong>
          </div>

          <div>
            <span>VALID</span>

            <strong>{statistics.valid}</strong>
          </div>

          <div>
            <span>INVALID</span>

            <strong>{statistics.invalid}</strong>
          </div>
        </section>
      )}

      {/* =========================
          OCR RESULTS
      ========================= */}

      {rows.length > 0 && (
        <section className="overall-ocr-lab-panel">
          <div className="overall-ocr-lab-panel-header">
            <div>
              <small>OCR RESULTS</small>

              <h3>Rows 1–6</h3>
            </div>
          </div>

          <div className="overall-ocr-lab-results-list">
            {rows.map((item) => (
              <article
                key={item.row}
                className={item.valid ? "valid" : "invalid"}
              >
                <div className="overall-ocr-lab-row-title">
                  <strong>ROW {item.row}</strong>

                  {item.valid ? (
                    <CheckCircle2 size={17} />
                  ) : (
                    <XCircle size={17} />
                  )}
                </div>

                <div className="overall-ocr-lab-row-values">
                  <div>
                    <small>ORIGINAL OCR</small>

                    <strong>{JSON.stringify(item.originalText)}</strong>

                    <span>
                      Confidence: {item.originalConfidence.toFixed(1)}%
                    </span>
                  </div>

                  <div>
                    <small>LAB OCR</small>

                    <strong>{JSON.stringify(item.labText)}</strong>

                    <span>Confidence: {item.labConfidence.toFixed(1)}%</span>
                  </div>

                  <div>
                    <small>NORMALIZED</small>

                    <strong>{item.normalized ?? "INVALID"}</strong>

                    <span>
                      {item.valid ? "VALID · 40–99" : "INVALID · outside 40–99"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* =========================
          EMPTY STATE
      ========================= */}

      {!rows.length && !loading && (
        <section className="overall-ocr-lab-empty">
          <Beaker size={22} />

          <span>Run a test to see what the OCR is extracting.</span>
        </section>
      )}
    </section>
  );
}

export default OverallOCRLab;
