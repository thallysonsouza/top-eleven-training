import { position } from "../../../constants/position";

import { isValidAuctionPositionCombination } from "./positionCombinations";

/*
 * ============================================================
 * VALID POSITIONS
 * ============================================================
 */

const VALID_POSITIONS = position.filter((item) => item !== "---");

/*
 * ============================================================
 * OCR CORRECTIONS
 * ============================================================
 *
 * Correções simples para erros conhecidos do OCR.
 */

const OCR_POSITION_CORRECTIONS = {
  GK: "GK",

  DL: "DL",
  DC: "DC",
  DR: "DR",

  DMC: "DMC",

  ML: "ML",
  MC: "MC",
  MR: "MR",

  AML: "AML",
  AMC: "AMC",
  AMR: "AMR",

  ST: "ST",

  /*
   * OCR corrections
   */

  CK: "GK",

  DCL: "DC",
  DCR: "DC",

  OMC: "DMC",

  M1: "ML",
  M0: "MC",

  AM1: "AML",
  AM0: "AMC",
};

/*
 * ============================================================
 * CLEAN TEXT
 * ============================================================
 */

function cleanPositionText(text) {
  if (!text) {
    return "";
  }

  return String(text)
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
}

/*
 * ============================================================
 * FIND POSITION COMBINATION
 * ============================================================
 *
 * O OCR pode retornar:
 *
 * STAML
 * ST AMC
 * ST  AMC
 * DCDL
 * DMC MC
 *
 * Portanto primeiro removemos os espaços.
 *
 * Depois verificamos se a combinação completa
 * existe na base oficial.
 */

function findValidCombination(text) {
  const cleanedText = cleanPositionText(text);

  if (!cleanedText) {
    return null;
  }

  /*
   * Combinação completa encontrada.
   */

  if (isValidAuctionPositionCombination(cleanedText)) {
    return cleanedText;
  }

  /*
   * Caso o OCR tenha colocado espaços entre
   * as posições, o texto já foi normalizado acima.
   */

  return null;
}

/*
 * ============================================================
 * SPLIT POSITION COMBINATION
 * ============================================================
 *
 * Exemplo:
 *
 * STAML
 *
 * vira:
 *
 * ["ST", "AML"]
 *
 * DCDMC
 *
 * vira:
 *
 * ["DC", "DMC"]
 *
 * Como as posições têm tamanhos diferentes,
 * testamos as maiores primeiro.
 */

function splitPositionCombination(combination) {
  if (!combination) {
    return [];
  }

  const sortedPositions = [...VALID_POSITIONS].sort(
    (a, b) => b.length - a.length,
  );

  function solve(remaining, result) {
    if (!remaining) {
      return result;
    }

    for (const positionName of sortedPositions) {
      if (remaining.startsWith(positionName)) {
        const nextRemaining = remaining.slice(positionName.length);

        const nextResult = solve(nextRemaining, [...result, positionName]);

        if (nextResult) {
          return nextResult;
        }
      }
    }

    return null;
  }

  return solve(combination, []) || [];
}

/*
 * ============================================================
 * OCR CORRECTION
 * ============================================================
 */

function correctSinglePosition(token) {
  if (!token) {
    return "";
  }

  const cleanedToken = String(token)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");

  return OCR_POSITION_CORRECTIONS[cleanedToken] || "";
}

/*
 * ============================================================
 * NORMALIZE POSITION
 * ============================================================
 */

export default function normalizePosition(text, ocrConfidence = 0) {
  if (!text) {
    return {
      positions: [],
      valid: false,
      confidence: 0,
      rawText: "",
      normalizedText: "",
    };
  }

  const rawText = String(text);

  const normalizedText = cleanPositionText(rawText);

  /*
   * ==========================================================
   * DATABASE VALIDATION
   * ==========================================================
   *
   * Primeiro tentamos validar a resposta inteira.
   */

  const validCombination = findValidCombination(normalizedText);

  if (validCombination) {
    const positions = splitPositionCombination(validCombination);

    if (positions.length > 0) {
      return {
        positions,

        valid: true,

        /*
         * A confiança agora vem da validação da
         * combinação oficial.
         *
         * O Tesseract pode ter retornado 0%.
         * Se a combinação existe na base,
         * sabemos que ela é estruturalmente válida.
         */

        confidence: 100,

        rawText,

        normalizedText: validCombination,

        ocrConfidence: Number(ocrConfidence) || 0,
      };
    }
  }

  /*
   * ==========================================================
   * SINGLE POSITION CORRECTION
   * ==========================================================
   *
   * Caso a combinação completa não seja encontrada,
   * tentamos tratar como uma única posição.
   */

  const correctedPosition = correctSinglePosition(rawText);

  if (correctedPosition) {
    return {
      positions: [correctedPosition],

      valid: true,

      confidence: 100,

      rawText,

      normalizedText: correctedPosition,

      ocrConfidence: Number(ocrConfidence) || 0,
    };
  }

  /*
   * ==========================================================
   * FALLBACK
   * ==========================================================
   *
   * Mantemos uma tentativa de encontrar posições
   * individuais no texto para não perder completamente
   * a informação quando o OCR estiver ruim.
   */

  const positions = [];

  const sortedPositions = [...VALID_POSITIONS].sort(
    (a, b) => b.length - a.length,
  );

  let remaining = normalizedText;

  while (remaining.length > 0) {
    let found = false;

    for (const positionName of sortedPositions) {
      if (remaining.startsWith(positionName)) {
        positions.push(positionName);

        remaining = remaining.slice(positionName.length);

        found = true;

        break;
      }
    }

    if (!found) {
      remaining = remaining.slice(1);
    }
  }

  /*
   * ==========================================================
   * INVALID
   * ==========================================================
   */

  return {
    positions: [...new Set(positions)],

    valid: false,

    /*
     * Aqui não podemos afirmar 100%.
     * Usamos a confiança original do OCR.
     */

    confidence: Number(ocrConfidence) || 0,

    rawText,

    normalizedText,

    ocrConfidence: Number(ocrConfidence) || 0,
  };
}
