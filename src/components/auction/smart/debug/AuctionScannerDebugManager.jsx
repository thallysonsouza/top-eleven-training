import { useEffect, useRef, useState } from "react";

import { RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

import { useLocation } from "react-router-dom";

import { useSmartAuction } from "../../../../context/SmartAuctionContext";

import { AUCTION_SCANNER_REGIONS } from "../../../../engine/auction/ocr/auctionScannerRegions";

import readImage from "../../../../engine/auction/ocr/readImage";
import detectAuctionRows from "../../../../engine/auction/ocr/detectAuctionRows";
import cropAuctionRow from "../../../../engine/auction/ocr/cropAuctionRow";
import readAuctionRegion from "../../../../engine/auction/ocr/readAuctionRegion";

import normalizeOverall from "../../../../engine/auction/ocr/normalizeOverall";

import "./AuctionScannerDebugManager.css";

const REGION_NAMES = ["POSITION", "AGE", "OVERALL", "MARKET_VALUE"];

const ROWS_TO_TEST = 6;

/* =========================
   VALIDATION RULES
========================= */

const MIN_PLAYER_AGE = 18;

const MAX_PLAYER_AGE = 21;

/* =========================
   NORMALIZE AGE
========================= */

function normalizeAge(value) {
  if (value === null || value === undefined) {
    return null;
  }

  const text = String(value).trim().replace(",", ".");

  if (!text) {
    return null;
  }

  const match = text.match(/\d{1,2}/);

  if (!match) {
    return null;
  }

  const age = Number(match[0]);

  if (!Number.isInteger(age)) {
    return null;
  }

  return age;
}

/* =========================
   VALIDATE AGE
========================= */

function validateAge(value) {
  const normalizedAge = normalizeAge(value);

  if (normalizedAge === null) {
    return {
      normalizedAge: null,
      valid: false,
    };
  }

  const valid =
    normalizedAge >= MIN_PLAYER_AGE && normalizedAge <= MAX_PLAYER_AGE;

  return {
    normalizedAge,
    valid,
  };
}

/* =========================
   NORMALIZE MARKET VALUE
========================= */

/*
 * Converte o valor retornado pelo OCR
 * para um número em milhões.
 *
 * Exemplos:
 *
 * 660K  -> 0.66
 * 720K  -> 0.72
 * 1.02M -> 1.02
 * 1.86M -> 1.86
 */

function normalizeMarketValue(value) {
  if (value === null || value === undefined) {
    return null;
  }

  let text = String(value)
    .trim()
    .toUpperCase()
    .replace(",", ".")
    .replace(/\s+/g, "");

  if (!text) {
    return null;
  }

  /*
   * Remove caracteres que não
   * fazem parte do número ou unidade.
   */

  const match = text.match(/(\d+(?:\.\d+)?)([KM])?/);

  if (!match) {
    return null;
  }

  const number = Number(match[1]);

  if (!Number.isFinite(number)) {
    return null;
  }

  const unit = match[2] || "M";

  if (unit === "K") {
    return number / 1000;
  }

  return number;
}

/* =========================
   NORMALIZE POSITION
========================= */

function normalizePosition(positionResult) {
  if (!positionResult) {
    return "";
  }

  /*
   * Preferimos as posições já
   * reconhecidas pelo mecanismo OCR.
   */

  if (
    Array.isArray(positionResult.positions) &&
    positionResult.positions.length > 0
  ) {
    return positionResult.positions.join(" ");
  }

  /*
   * Fallback para o texto normalizado.
   */

  if (positionResult.positionNormalizedText) {
    return positionResult.positionNormalizedText.trim();
  }

  /*
   * Último fallback:
   * texto bruto do OCR.
   */

  return String(positionResult.text || "").trim();
}

/* =========================
   CONVERT OCR ROW TO PLAYER
========================= */

/*
 * Transforma o resultado interno
 * do OCR em um objeto de jogador
 * que será utilizado pela Tela 4.
 */

function convertRowToPlayer(row) {
  const position = row.position;

  const age = row.age;

  const overall = row.overall;

  const marketValue = row.marketValue;

  return {
    id: `ocr-row-${row.row}`,

    row: row.row,

    position: normalizePosition(position),

    age: age?.normalizedAge ?? null,

    overall: overall?.normalizedValue ?? null,

    marketValue: normalizeMarketValue(marketValue?.text),

    source: "auction-ocr",

    captureRow: row.row,

    valid: row.playerValid,

    invalidReason: row.invalidReason || "",
  };
}

function AuctionScannerDebugManager() {
  const location = useLocation();

  const currentPath = location.pathname.split("/").pop();

  const isOCRDebugPage = currentPath === "ocr-debug";

  const {
    croppedFrame,
    captureVersion,
    setDetectedPlayers,
    startScannerFailureAlert,
    stopScannerFailureAlert,
  } = useSmartAuction();

  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState([]);

  const [error, setError] = useState("");

  /*
   * =========================
   * ANALYSIS VERSION
   * =========================
   */

  const analysisVersionRef = useRef(0);

  /*
   * =========================
   * LAST CAPTURE ANALYZED
   * =========================
   */

  const lastAnalyzedCaptureRef = useRef(0);

  /*
   * =========================
   * OCR REGIONS
   * =========================
   */

  const regions = AUCTION_SCANNER_REGIONS;

  /*
   * =========================
   * AUTOMATIC OCR
   * =========================
   */

  useEffect(() => {
    console.log("==========================================");

    console.log("AUCTION OCR CAPTURE VERSION CHANGED");

    console.log("Capture version:", captureVersion);

    console.log("Cropped frame available:", Boolean(croppedFrame));

    console.log("Current page:", currentPath);

    console.log("==========================================");

    /*
     * Ainda não existe captura.
     */

    if (captureVersion === 0) {
      return;
    }

    /*
     * Esta captura já foi analisada.
     */

    if (lastAnalyzedCaptureRef.current >= captureVersion) {
      console.log("Capture already analyzed:", captureVersion);

      return;
    }

    /*
     * Aguarda o novo crop.
     */

    if (!croppedFrame) {
      console.log("Waiting for new cropped frame for capture:", captureVersion);

      return;
    }

    /*
     * =========================
     * NOVA CAPTURA PRONTA
     * =========================
     */

    lastAnalyzedCaptureRef.current = captureVersion;

    const analysisVersion = ++analysisVersionRef.current;

    console.log("==========================================");

    console.log("STARTING NEW AUCTION OCR");

    console.log("Capture version:", captureVersion);

    console.log("Analysis version:", analysisVersion);

    console.log("==========================================");

    /*
     * Apaga imediatamente os resultados
     * da captura anterior.
     */

    setResults([]);

    /*
     * IMPORTANTE:
     *
     * Também removemos os jogadores
     * antigos da Tela 4.
     *
     * A nova captura ainda será processada.
     */

    setDetectedPlayers([]);

    setError("");

    setLoading(true);

    runAutomaticOCR(croppedFrame, analysisVersion, captureVersion);
  }, [captureVersion, croppedFrame, currentPath, setDetectedPlayers]);

  /*
   * =========================
   * CHECK CURRENT ANALYSIS
   * =========================
   */

  function isCurrentAnalysis(version) {
    return analysisVersionRef.current === version;
  }

  /*
   * =========================
   * OCR PROCESS
   * =========================
   */

  async function runAutomaticOCR(
    imageSource,
    analysisVersion,
    currentCaptureVersion,
  ) {
    try {
      console.log("");

      console.log("==========================================");

      console.log("       AUCTION ROWS 1-6 OCR");

      console.log("==========================================");

      console.log("Capture version:", currentCaptureVersion);

      console.log("Analysis version:", analysisVersion);

      console.log("==========================================");

      /*
       * =========================
       * LOAD IMAGE
       * =========================
       */

      const image = await readImage(imageSource);

      if (!isCurrentAnalysis(analysisVersion)) {
        console.log("Ignoring old OCR analysis:", analysisVersion);

        return;
      }

      console.log("");

      console.log("IMAGE");

      console.log(`${image.width} × ${image.height}px`);

      /*
       * =========================
       * DETECT ROWS
       * =========================
       */

      const rows = detectAuctionRows(image);

      if (!isCurrentAnalysis(analysisVersion)) {
        console.log("Ignoring old row detection:", analysisVersion);

        return;
      }

      console.log("");

      console.log("ROWS DETECTED:", rows.length);

      /*
       * ==================================================
       * SCANNER HEALTH CHECK
       * ==================================================
       *
       * O leilão normal precisa apresentar
       * as 6 linhas esperadas.
       *
       * Se forem encontradas menos de 6,
       * consideramos que o scanner não está
       * conseguindo enxergar corretamente
       * o leilão.
       *
       * Isso pode acontecer, por exemplo,
       * se:
       *
       * - o jogo fechou;
       * - o jogo travou;
       * - a janela mudou;
       * - o leilão não está visível;
       * - a captura está apontando para
       *   uma tela diferente.
       *
       * O Context então inicia o alerta
       * sonoro contínuo de 30 em 30 segundos.
       */

      if (rows.length < ROWS_TO_TEST) {
        console.warn("==========================================");

        console.warn("SCANNER HEALTH CHECK FAILED");

        console.warn(`Only ${rows.length} auction rows were detected.`);

        console.warn(`At least ${ROWS_TO_TEST} rows are required.`);

        console.warn("Starting scanner failure alert.");

        console.warn("==========================================");

        /*
         * Ativa o alerta sonoro imediatamente.
         */

        startScannerFailureAlert();

        /*
         * Mantemos exatamente o comportamento
         * original do OCR:
         *
         * menos de 6 linhas = erro da análise.
         */

        throw new Error(
          `Only ${rows.length} auction rows were detected. At least ${ROWS_TO_TEST} are required.`,
        );
      }

      /*
       * ==================================================
       * SCANNER HEALTH RESTORED
       * ==================================================
       *
       * Chegamos aqui somente quando
       * as 6 linhas foram detectadas.
       *
       * Portanto, o scanner voltou a
       * funcionar corretamente.
       */

      console.log("==========================================");

      console.log("SCANNER HEALTH CHECK PASSED");

      console.log(`Detected ${rows.length} auction rows.`);

      console.log("Stopping scanner failure alert.");

      console.log("==========================================");

      stopScannerFailureAlert();

      /*
       * =========================
       * TEST ROWS
       * =========================
       */

      const testedRows = [];

      for (let rowIndex = 0; rowIndex < ROWS_TO_TEST; rowIndex++) {
        if (!isCurrentAnalysis(analysisVersion)) {
          console.log(
            "Stopping old OCR analysis because a new image arrived:",
            analysisVersion,
          );

          return;
        }

        const rowNumber = rowIndex + 1;

        const row = rows[rowIndex];

        console.log("");

        console.log("==========================================");

        console.log(`ROW ${rowNumber}`);

        console.log("==========================================");

        const rowCrop = cropAuctionRow(image, row);

        const regionResults = {};

        /*
         * =========================
         * OCR EACH REGION
         * =========================
         */

        for (const regionName of REGION_NAMES) {
          if (!isCurrentAnalysis(analysisVersion)) {
            console.log("Stopping old OCR region analysis:", analysisVersion);

            return;
          }

          try {
            const result = await readAuctionRegion(
              rowCrop,
              regionName,
              regions,
            );

            if (!isCurrentAnalysis(analysisVersion)) {
              console.log("Ignoring old OCR region result:", analysisVersion);

              return;
            }

            /*
             * =========================
             * OVERALL VALIDATION
             * =========================
             */

            let normalizedOverall = null;

            let overallValid = undefined;

            if (regionName === "OVERALL") {
              normalizedOverall = normalizeOverall(result.text);

              overallValid = normalizedOverall !== null;
            }

            /*
             * =========================
             * AGE VALIDATION
             * =========================
             */

            let normalizedAge = null;

            let ageValid = undefined;

            if (regionName === "AGE") {
              const ageValidation = validateAge(result.text);

              normalizedAge = ageValidation.normalizedAge;

              ageValid = ageValidation.valid;
            }

            /*
             * =========================
             * REGION RESULT
             * =========================
             */

            regionResults[regionName] = {
              success: true,

              text: result.text,

              confidence: Number(result.confidence) || 0,

              normalizedValue: normalizedOverall,

              overallValid,

              normalizedAge,

              ageValid,

              positions: result.positions || [],

              positionValid: Boolean(result.positionValid),

              positionConfidence: Number(result.positionConfidence) || 0,

              positionNormalizedText: result.positionNormalizedText || "",
            };

            /*
             * =========================
             * CONSOLE DEBUG
             * =========================
             */

            console.log("");

            console.log(regionName);

            console.log("RAW OCR:", JSON.stringify(result.text));

            console.log(
              "TESSERACT:",
              `${Number(result.confidence || 0).toFixed(1)}%`,
            );

            /*
             * POSITION
             */

            if (regionName === "POSITION") {
              console.log("NORMALIZED:", result.positionNormalizedText || "");

              console.log("POSITIONS:", result.positions?.join(" ") || "NONE");

              console.log(
                "VALIDATION:",
                result.positionValid ? "VALID" : "INVALID",
              );

              console.log(
                "VALIDATION CONFIDENCE:",
                `${Number(result.positionConfidence || 0).toFixed(1)}%`,
              );
            }

            /*
             * AGE
             */

            if (regionName === "AGE") {
              console.log("NORMALIZED:", normalizedAge ?? "INVALID");

              console.log("VALIDATION:", ageValid ? "VALID" : "INVALID");

              console.log(
                "VALID RANGE:",
                `${MIN_PLAYER_AGE} - ${MAX_PLAYER_AGE}`,
              );
            }

            /*
             * OVERALL
             */

            if (regionName === "OVERALL") {
              console.log("NORMALIZED:", normalizedOverall ?? "INVALID");

              console.log("VALIDATION:", overallValid ? "VALID" : "INVALID");

              console.log("VALID RANGE:", "40 - 99");
            }
          } catch (regionError) {
            if (!isCurrentAnalysis(analysisVersion)) {
              console.log("Ignoring old OCR error:", analysisVersion);

              return;
            }

            console.error(`${regionName} OCR ERROR:`, regionError);

            regionResults[regionName] = {
              success: false,

              text: "",

              confidence: 0,

              normalizedValue: null,

              overallValid: regionName === "OVERALL" ? false : undefined,

              normalizedAge: null,

              ageValid: regionName === "AGE" ? false : undefined,

              positions: [],

              positionValid: false,

              positionConfidence: 0,

              positionNormalizedText: "",

              error: regionError.message,
            };
          }
        }

        /*
         * =========================
         * ROW SUMMARY
         * =========================
         */

        const position = regionResults.POSITION;

        const age = regionResults.AGE;

        const overall = regionResults.OVERALL;

        const marketValue = regionResults.MARKET_VALUE;

        /*
         * =========================
         * PLAYER VALIDATION
         * =========================
         */

        const playerValid = Boolean(
          position?.positionValid && age?.ageValid && overall?.overallValid,
        );

        /*
         * =========================
         * INVALID REASON
         * =========================
         */

        const invalidReasons = [];

        if (!position?.positionValid) {
          invalidReasons.push("INVALID POSITION");
        }

        if (!age?.ageValid) {
          invalidReasons.push("INVALID AGE");
        }

        if (!overall?.overallValid) {
          invalidReasons.push("INVALID OVERALL");
        }

        const playerInvalidReason =
          invalidReasons.length > 0 ? invalidReasons.join(", ") : "";

        /*
         * =========================
         * CONSOLE RESULT
         * =========================
         */

        console.log("");

        console.log("------------------------------------------");

        console.log(`ROW ${rowNumber} RESULT`);

        console.log("------------------------------------------");

        console.log(
          "POSITION:",
          position?.positions?.join(" ") || position?.text || "NONE",
        );

        console.log("POSITION VALID:", position?.positionValid ? "YES" : "NO");

        console.log("AGE:", JSON.stringify(age?.text || ""));

        console.log("AGE NORMALIZED:", age?.normalizedAge ?? "INVALID");

        console.log("AGE VALID:", age?.ageValid ? "YES" : "NO");

        console.log("OVERALL OCR:", JSON.stringify(overall?.text || ""));

        console.log(
          "OVERALL NORMALIZED:",
          overall?.normalizedValue ?? "INVALID",
        );

        console.log("OVERALL VALID:", overall?.overallValid ? "YES" : "NO");

        console.log("MARKET VALUE:", JSON.stringify(marketValue?.text || ""));

        console.log("PLAYER VALID:", playerValid ? "YES" : "NO");

        if (!playerValid) {
          console.log("INVALID REASON:", playerInvalidReason);
        }

        /*
         * =========================
         * STORE PLAYER
         * =========================
         */

        testedRows.push({
          row: rowNumber,

          position,

          age,

          overall,

          marketValue,

          playerValid,

          invalidReason: playerInvalidReason,
        });
      }

      /*
       * =========================
       * FINAL VERSION CHECK
       * =========================
       */

      if (!isCurrentAnalysis(analysisVersion)) {
        console.log("Ignoring completed old OCR analysis:", analysisVersion);

        return;
      }

      /*
       * =========================
       * FINAL TABLE
       * =========================
       */

      console.log("");

      console.log("==========================================");

      console.log("          OCR COMPARISON TABLE");

      console.log("==========================================");

      console.table(
        testedRows.map((item) => ({
          ROW: item.row,

          PLAYER_VALID: item.playerValid ? "YES" : "NO",

          INVALID_REASON: item.invalidReason,

          POSITION:
            item.position?.positions?.join(" ") || item.position?.text || "",

          POSITION_TESSERACT: `${Number(item.position?.confidence || 0).toFixed(
            1,
          )}%`,

          POSITION_VALID: item.position?.positionValid ? "YES" : "NO",

          POSITION_VALIDATION: `${Number(
            item.position?.positionConfidence || 0,
          ).toFixed(1)}%`,

          AGE: item.age?.normalizedAge ?? "",

          AGE_RAW: item.age?.text?.trim() || "",

          AGE_VALID: item.age?.ageValid ? "YES" : "NO",

          AGE_CONFIDENCE: `${Number(item.age?.confidence || 0).toFixed(1)}%`,

          OVERALL_OCR: item.overall?.text?.trim() || "",

          OVERALL_NORMALIZED: item.overall?.normalizedValue ?? "",

          OVERALL_VALID: item.overall?.overallValid ? "YES" : "NO",

          OVERALL_CONFIDENCE: `${Number(item.overall?.confidence || 0).toFixed(
            1,
          )}%`,

          MARKET_VALUE: item.marketValue?.text?.trim() || "",

          MARKET_VALUE_CONFIDENCE: `${Number(
            item.marketValue?.confidence || 0,
          ).toFixed(1)}%`,
        })),
      );

      /*
       * =========================
       * CONVERT VALID PLAYERS
       * =========================
       */

      const validPlayers = testedRows
        .filter((row) => row.playerValid)
        .map(convertRowToPlayer);

      /*
       * =========================
       * PUBLISH PLAYERS
       * =========================
       *
       * Somente jogadores válidos
       * são enviados para o Context.
       */

      setDetectedPlayers(validPlayers);

      console.log("");

      console.log("==========================================");

      console.log("      VALID PLAYERS PUBLISHED");

      console.log("==========================================");

      console.log("Capture version:", currentCaptureVersion);

      console.log("Valid players:", validPlayers.length);

      console.table(validPlayers);

      /*
       * =========================
       * FINISHED
       * =========================
       */

      console.log("");

      console.log("==========================================");

      console.log("        AUCTION OCR TEST FINISHED");

      console.log("==========================================");

      console.log("OCR analysis completed successfully:", analysisVersion);

      console.log("Capture version analyzed:", currentCaptureVersion);

      /*
       * =========================
       * VALIDATION SUMMARY
       * =========================
       */

      const validPlayersCount = testedRows.filter(
        (player) => player.playerValid,
      ).length;

      const invalidPlayersCount = testedRows.length - validPlayersCount;

      console.log("");

      console.log("VALID PLAYERS:", validPlayersCount);

      console.log("INVALID PLAYERS:", invalidPlayersCount);

      /*
       * =========================
       * SHOW RESULTS
       * =========================
       */

      setResults(testedRows);
    } catch (error) {
      if (!isCurrentAnalysis(analysisVersion)) {
        console.log(
          "Ignoring old OCR error after image update:",
          analysisVersion,
        );

        return;
      }

      console.error("Auction OCR test error:", error);

      setError(error.message || "Unable to process the auction OCR test.");

      setResults([]);

      /*
       * Se o OCR falhar completamente,
       * não deixamos jogadores antigos
       * na Tela 4.
       */

      setDetectedPlayers([]);

      /*
       * IMPORTANTE:
       *
       * O alerta sonoro NÃO é desligado aqui.
       *
       * Se o erro aconteceu porque
       * foram detectadas menos de 6 linhas,
       * o alerta deve continuar tocando
       * até que uma nova captura encontre
       * novamente as 6 linhas.
       */
    } finally {
      if (isCurrentAnalysis(analysisVersion)) {
        setLoading(false);
      }
    }
  }

  /*
   * ==================================================
   * IMPORTANT
   * ==================================================
   *
   * O componente continua montado em todas as telas,
   * mas sua interface só aparece na Tela 6.
   */

  if (!isOCRDebugPage) {
    return null;
  }

  /*
   * =========================
   * RENDER
   * =========================
   */

  return (
    <section className="auction-scanner-debug-manager">
      {/* =========================
          HEADER
      ========================= */}

      <div className="auction-scanner-debug-manager-header">
        <div className="auction-scanner-debug-manager-title">
          <small>AUCTION OCR DEVELOPMENT</small>

          <h2>Auction OCR Test</h2>

          <p>Test the OCR extraction of the first six auction rows.</p>
        </div>

        {/* =========================
            STATUS
        ========================= */}

        <div className="auction-scanner-debug-manager-status">
          {loading ? (
            <>
              <RefreshCw
                size={15}
                className="auction-scanner-debug-manager-spinner"
              />

              <span>Reading rows 1-6...</span>
            </>
          ) : results.length > 0 ? (
            <>
              <CheckCircle2 size={15} />

              <span>Rows 1-6 analyzed</span>
            </>
          ) : (
            <span>Waiting for auction image...</span>
          )}
        </div>
      </div>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="auction-scanner-debug-manager-error">
          <AlertCircle size={16} />

          <span>{error}</span>
        </div>
      )}

      {/* =========================
          OCR RESULTS
      ========================= */}

      {results.length > 0 && (
        <div className="auction-scanner-debug-manager-results">
          {results.map((row) => {
            const position = row.position;

            const age = row.age;

            const overall = row.overall;

            const marketValue = row.marketValue;

            return (
              <article
                key={row.row}
                className={`auction-scanner-debug-manager-result ${
                  row.playerValid ? "player-valid" : "player-invalid"
                }`}
              >
                <div className="auction-scanner-debug-manager-result-header">
                  <div>
                    <small>AUCTION ROW</small>

                    <h3>Player {row.row}</h3>
                  </div>

                  {row.playerValid ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                </div>

                {/* =========================
                    PLAYER STATUS
                ========================= */}

                <div className="auction-scanner-debug-manager-player-status">
                  <span className={row.playerValid ? "valid" : "invalid"}>
                    {row.playerValid ? "PLAYER VALID" : "PLAYER INVALID"}
                  </span>

                  {!row.playerValid && row.invalidReason && (
                    <small>{row.invalidReason}</small>
                  )}
                </div>

                {/* =========================
                    POSITION
                ========================= */}

                <div className="auction-scanner-debug-manager-field">
                  <div className="auction-scanner-debug-manager-field-header">
                    <span>POSITION</span>

                    <strong>
                      {position?.positions?.join(" ") ||
                        position?.text?.trim() ||
                        "—"}
                    </strong>
                  </div>

                  <div className="auction-scanner-debug-manager-field-info">
                    <span>
                      Tesseract: {Number(position?.confidence || 0).toFixed(1)}%
                    </span>

                    <span
                      className={position?.positionValid ? "valid" : "invalid"}
                    >
                      Validation:{" "}
                      {position?.positionValid ? "VALID" : "INVALID"}
                    </span>

                    <span>
                      {Number(position?.positionConfidence || 0).toFixed(1)}%
                    </span>
                  </div>

                  <div className="auction-scanner-debug-manager-raw">
                    RAW: {JSON.stringify(position?.text || "")}
                  </div>
                </div>

                {/* =========================
                    AGE
                ========================= */}

                <div className="auction-scanner-debug-manager-field">
                  <div className="auction-scanner-debug-manager-field-header">
                    <span>AGE</span>

                    <strong>{age?.normalizedAge ?? "—"}</strong>
                  </div>

                  <div className="auction-scanner-debug-manager-field-info">
                    <span>
                      Tesseract: {Number(age?.confidence || 0).toFixed(1)}%
                    </span>

                    <span className={age?.ageValid ? "valid" : "invalid"}>
                      Validation: {age?.ageValid ? "VALID" : "INVALID"}
                    </span>

                    <span>
                      Valid range: {MIN_PLAYER_AGE}-{MAX_PLAYER_AGE}
                    </span>
                  </div>

                  <div className="auction-scanner-debug-manager-raw">
                    RAW: {JSON.stringify(age?.text || "")}
                  </div>
                </div>

                {/* =========================
                    OVERALL
                ========================= */}

                <div className="auction-scanner-debug-manager-field">
                  <div className="auction-scanner-debug-manager-field-header">
                    <span>OVERALL</span>

                    <strong>{overall?.normalizedValue ?? "—"}</strong>
                  </div>

                  <div className="auction-scanner-debug-manager-field-info">
                    <span>
                      Tesseract: {Number(overall?.confidence || 0).toFixed(1)}%
                    </span>

                    <span
                      className={overall?.overallValid ? "valid" : "invalid"}
                    >
                      Validation: {overall?.overallValid ? "VALID" : "INVALID"}
                    </span>
                  </div>

                  <div className="auction-scanner-debug-manager-raw">
                    OCR: {JSON.stringify(overall?.text || "")}
                  </div>
                </div>

                {/* =========================
                    MARKET VALUE
                ========================= */}

                <div className="auction-scanner-debug-manager-field">
                  <div className="auction-scanner-debug-manager-field-header">
                    <span>MARKET VALUE</span>

                    <strong>{marketValue?.text?.trim() || "—"}</strong>
                  </div>

                  <div className="auction-scanner-debug-manager-field-info">
                    <span>
                      Tesseract:{" "}
                      {Number(marketValue?.confidence || 0).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default AuctionScannerDebugManager;
