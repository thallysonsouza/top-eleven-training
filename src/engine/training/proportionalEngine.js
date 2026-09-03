/* =========================================================
   PROPORTIONAL ENGINE

   FLUXO CORRETO

   1. Tabela 16:
      encontrar o exercício com a maior MEDIA
      abaixo do DESIRED OVERALL.

      REGRA ESPECIAL:

      Se o DESIRED OVERALL for menor que a
      média do PRIMEIRO exercício da Tabela 16,
      a referência passa a ser as HABILIDADES
      INICIAIS do jogador da ABA 0.

      Nesse caso:

         referência = habilidades iniciais
         rank       = 0
         próximo    = primeiro exercício da Tabela 16

   2. Tabela 16:
      pegar o exercício seguinte da sequência.

      Esse é o exercício atual que queremos
      calcular proporcionalmente.

   3. Referência:
      pegar os VALUES do exercício de referência.

      CASO NORMAL:
         valores da Tabela 16 / Tabela 14

      CASO ESPECIAL:
         habilidades iniciais da Aba 0

   4. Tabela 5:
      pegar os dados das 15 habilidades do
      exercício atual (X + 1).

   5. Calcular:

      DEMAIS HABILIDADES =
        NOT(T5) × referência

      a_1 =
        T5 × referência

   6. Calcular n:

      =INT(
        (
          (($P$3*15-I17)-K17)
          /
          (2*F17+1*G17)
        )
      )

      P3 = DESIRED OVERALL
      I17 = soma DEMAIS HABILIDADES
      K17 = soma a_1
      F17 = soma TABELA 6
      G17 = soma TABELA 7

   7. Tabelas 6 e 7:
      extrair os 15 valores do exercício X + 1.

   8. KEY:

      KEY = TABELA 6 × 2n

   9. NON KEY:

      NON KEY = TABELA 7 × n

   10. FINAL:

      FINAL =
        KEY
        + NON KEY
        + DEMAIS HABILIDADES
        + a_1
========================================================= */

/* =========================================================
   OVR
========================================================= */

export function calculateOverall(values, attributes) {
  if (!values || !Array.isArray(attributes) || attributes.length === 0) {
    return 0;
  }

  const sum = attributes.reduce((total, attribute) => {
    const value = Number(values?.[attribute]);

    return total + (Number.isFinite(value) ? value : 0);
  }, 0);

  return sum / attributes.length;
}

/* =========================================================
   FIND LOWER REFERENCE IN TABLE 16

   Procura o exercício com a maior MEDIA
   abaixo do DESIRED OVERALL.

   REGRA ESPECIAL:

   Se o DESIRED OVERALL for menor que a
   média do PRIMEIRO exercício da Tabela 16,
   a referência é o próprio jogador antes
   de realizar qualquer exercício.

   Nesse caso retornamos um objeto especial:

      isInitialReference = true
      rank = 0
      exerciseId = null
      exerciseName = "Habilidades iniciais"
      values = initialSkills
========================================================= */

export function findLowerReference({
  table16,
  desiredOverall,
  initialSkills,
  attributes,
}) {
  if (!Array.isArray(table16) || table16.length === 0) {
    return null;
  }

  const desired = Number(desiredOverall);

  /* =======================================================
     PRIMEIRO EXERCÍCIO DA TABELA 16
  ======================================================= */

  const firstExercise = table16[0];

  const firstOverall = Number(firstExercise?.media);

  /* =======================================================
     CASO ESPECIAL

     Desired OVR abaixo da média do primeiro
     exercício da Tabela 16.

     Então a referência é a própria Aba 0.
  ======================================================= */

  if (
    Number.isFinite(desired) &&
    Number.isFinite(firstOverall) &&
    desired < firstOverall &&
    initialSkills &&
    Array.isArray(attributes) &&
    attributes.length > 0
  ) {
    const initialOverall = calculateOverall(initialSkills, attributes);

    return {
      rank: 0,

      exerciseId: null,

      exerciseName: "Habilidades iniciais",

      media: initialOverall,

      values: {
        ...initialSkills,
      },

      isInitialReference: true,
    };
  }

  /* =======================================================
     CASO NORMAL

     Procura o exercício com a maior MEDIA
     abaixo do DESIRED OVERALL.
  ======================================================= */

  let bestExercise = null;

  let bestOverall = -Infinity;

  table16.forEach((exercise) => {
    const overall = Number(exercise?.media);

    if (
      Number.isFinite(overall) &&
      overall < desired &&
      overall > bestOverall
    ) {
      bestExercise = exercise;

      bestOverall = overall;
    }
  });

  return bestExercise;
}

/* =========================================================
   FIND NEXT EXERCISE IN TABLE 16

   CASO NORMAL:

      referência = T16[X]
      atual      = T16[X + 1]

   CASO ESPECIAL:

      referência = habilidades iniciais
      atual      = T16[1]

   Como a referência inicial representa o
   "rank 0", o primeiro exercício da Tabela 16
   é automaticamente o exercício atual.
========================================================= */

export function findNextExercise({ table16, referenceExercise }) {
  if (!Array.isArray(table16) || table16.length === 0 || !referenceExercise) {
    return null;
  }

  /* =======================================================
     REFERÊNCIA = HABILIDADES INICIAIS
  ======================================================= */

  if (referenceExercise.isInitialReference) {
    return table16[0] || null;
  }

  /* =======================================================
     REFERÊNCIA NORMAL = EXERCÍCIO DA TABELA 16
  ======================================================= */

  const referenceIndex = table16.findIndex(
    (exercise) => exercise.exerciseId === referenceExercise.exerciseId,
  );

  if (referenceIndex === -1) {
    return null;
  }

  return table16[referenceIndex + 1] || null;
}

/* =========================================================
   GET TABLE 5 VALUES
========================================================= */

function getTable5Values(exercise) {
  return exercise?.table5?.values || exercise?.table2?.result || {};
}

/* =========================================================
   GET TABLE 6 VALUES
========================================================= */

function getTable6Values(exercise) {
  return exercise?.table6?.values || exercise?.table3?.result || {};
}

/* =========================================================
   GET TABLE 7 VALUES
========================================================= */

function getTable7Values(exercise) {
  return exercise?.table7?.values || exercise?.table4?.result || {};
}

/* =========================================================
   READ VALUE
========================================================= */

function readValue(values, attribute) {
  const value = Number(values?.[attribute]);

  return Number.isFinite(value) ? value : 0;
}

/* =========================================================
   SUM VALUES
========================================================= */

function sumValues(values, attributes) {
  return attributes.reduce((sum, attribute) => {
    return sum + readValue(values, attribute);
  }, 0);
}

/* =========================================================
   FORMAT DEBUG VALUES
========================================================= */

function formatDebugValues(values, attributes) {
  if (!values || !Array.isArray(attributes)) {
    return [];
  }

  return attributes.map((attribute) => ({
    skill: attribute,

    value: readValue(values, attribute),
  }));
}

/* =========================================================
   PRINT DEBUG VALUES
========================================================= */

function printDebugValues(label, values, attributes) {
  console.log(`\n${label}`);

  console.table(formatDebugValues(values, attributes));
}

/* =========================================================
   DEMAIS HABILIDADES

   NOT(T5) × referência

   T5 = 1
      → 0

   T5 = 0
      → valor da referência
========================================================= */

export function calculateOtherSkills({
  table14Values,
  table5Values,
  attributes,
}) {
  return Object.fromEntries(
    attributes.map((attribute) => {
      const referenceValue = readValue(table14Values, attribute);

      const table5Value = readValue(table5Values, attribute);

      return [attribute, table5Value === 0 ? referenceValue : 0];
    }),
  );
}

/* =========================================================
   a_1

   T5 × referência

   T5 = 1
      → valor da referência

   T5 = 0
      → 0
========================================================= */

export function calculateA1({ table14Values, table5Values, attributes }) {
  return Object.fromEntries(
    attributes.map((attribute) => {
      const referenceValue = readValue(table14Values, attribute);

      const table5Value = readValue(table5Values, attribute);

      return [attribute, table5Value === 1 ? referenceValue : 0];
    }),
  );
}

/* =========================================================
   KEY

   KEY = TABELA 6 × 2n
========================================================= */

export function calculateKey({ table6Values, n, attributes }) {
  return Object.fromEntries(
    attributes.map((attribute) => [
      attribute,

      readValue(table6Values, attribute) * (2 * n),
    ]),
  );
}

/* =========================================================
   NON KEY

   NON KEY = TABELA 7 × n
========================================================= */

export function calculateNonKey({ table7Values, n, attributes }) {
  return Object.fromEntries(
    attributes.map((attribute) => [
      attribute,

      readValue(table7Values, attribute) * n,
    ]),
  );
}

/* =========================================================
   FINAL

   FINAL =
      KEY
      + NON KEY
      + DEMAIS HABILIDADES
      + a_1
========================================================= */

export function calculateFinalSkills({
  key,
  nonKey,
  otherSkills,
  a1,
  attributes,
}) {
  return Object.fromEntries(
    attributes.map((attribute) => [
      attribute,

      readValue(key, attribute) +
        readValue(nonKey, attribute) +
        readValue(otherSkills, attribute) +
        readValue(a1, attribute),
    ]),
  );
}

/* =========================================================
   CALCULATE n

   =INT(
      (
        (($P$3*15-I17)-K17)
        /
        (2*F17+1*G17)
      )
   )
========================================================= */

export function calculateN({
  desiredOverall,
  otherSkills,
  a1,
  table6Sum,
  table7Sum,
  attributes,
}) {
  /* =======================================================
     I17
  ======================================================= */

  const otherSkillsSum = sumValues(otherSkills, attributes);

  /* =======================================================
     K17
  ======================================================= */

  const a1Sum = sumValues(a1, attributes);

  /* =======================================================
     NUMERATOR
  ======================================================= */

  const numerator = Number(desiredOverall) * 15 - otherSkillsSum - a1Sum;

  /* =======================================================
     DENOMINATOR
  ======================================================= */

  const denominator = 2 * Number(table6Sum) + Number(table7Sum);

  if (
    !Number.isFinite(numerator) ||
    !Number.isFinite(denominator) ||
    denominator === 0
  ) {
    return 0;
  }

  /* =======================================================
     INT
  ======================================================= */

  return Math.trunc(numerator / denominator);
}

/* =========================================================
   MAIN PROPORTIONAL ENGINE
========================================================= */

export default function calculateProportionalEngine({
  table16 = [],
  rankedExercises = [],
  desiredOverall = 100,
  attributes = [],
  initialSkills = {},
}) {
  /* =======================================================
     CLEAR CONSOLE
  ======================================================= */

  console.clear();

  console.log("============================================================");

  console.log(" PROPORTIONAL ENGINE");

  console.log("============================================================");

  /* =======================================================
     VALIDATION
  ======================================================= */

  if (
    !Array.isArray(table16) ||
    table16.length === 0 ||
    !Array.isArray(rankedExercises) ||
    !Array.isArray(attributes) ||
    attributes.length === 0
  ) {
    console.warn("[PROPORTIONAL] Dados insuficientes.");

    return {
      desiredOverall: Number(desiredOverall),

      lowerReference: null,

      proportionalExercise: null,

      table14Values: {},

      table5Values: {},

      table6Values: {},

      table7Values: {},

      otherSkills: {},

      a1: {},

      otherSkillsSum: 0,

      a1Sum: 0,

      table6Sum: 0,

      table7Sum: 0,

      n: 0,

      key: {},

      nonKey: {},

      finalSkills: null,

      finalOverall: 0,
    };
  }

  /* =======================================================
     STEP 1

     TABELA 16
     maior média abaixo do DESIRED OVR.

     CASO ESPECIAL:

     se Desired < primeiro exercício,
     referência = habilidades iniciais.
  ======================================================= */

  const lowerReference = findLowerReference({
    table16,

    desiredOverall,

    initialSkills,

    attributes,
  });

  console.group("[1] TABELA 16 — EXERCÍCIO DE REFERÊNCIA");

  console.log("DESIRED OVERALL:", Number(desiredOverall));

  if (lowerReference) {
    console.log("Rank T16:", lowerReference.rank);

    console.log("Exercise:", lowerReference.exerciseName);

    console.log("Exercise ID:", lowerReference.exerciseId);

    console.log("OVR:", Number(lowerReference.media));

    console.log(
      "Referência inicial:",
      lowerReference.isInitialReference ? "SIM" : "NÃO",
    );

    printDebugValues(
      lowerReference.isInitialReference
        ? "15 HABILIDADES INICIAIS — ABA 0"
        : "15 HABILIDADES DA TABELA 14 — REFERÊNCIA",
      lowerReference.values,
      attributes,
    );
  } else {
    console.warn("Nenhum exercício encontrado abaixo do DESIRED OVERALL.");
  }

  console.groupEnd();

  /* =======================================================
     NO REFERENCE

     Só acontece quando não conseguimos usar
     nem exercício inferior nem referência inicial.
  ======================================================= */

  if (!lowerReference) {
    console.log("============================================================");

    return {
      desiredOverall: Number(desiredOverall),

      lowerReference: null,

      proportionalExercise: null,

      table14Values: {},

      table5Values: {},

      table6Values: {},

      table7Values: {},

      otherSkills: {},

      a1: {},

      otherSkillsSum: 0,

      a1Sum: 0,

      table6Sum: 0,

      table7Sum: 0,

      n: 0,

      key: {},

      nonKey: {},

      finalSkills: null,

      finalOverall: 0,
    };
  }

  /* =======================================================
     STEP 2

     O exercício atual é o PRÓXIMO exercício
     da sequência da Tabela 16.

     CASO NORMAL:

       T16[X]
          ↓
       T16[X + 1]

     CASO ESPECIAL:

       Habilidades iniciais
          ↓
       T16[1]
  ======================================================= */

  const nextTable16Exercise = findNextExercise({
    table16,

    referenceExercise: lowerReference,
  });

  /* =======================================================
     NO NEXT EXERCISE
  ======================================================= */

  if (!nextTable16Exercise) {
    console.warn(
      `[PROPORTIONAL] O exercício seguinte à referência não existe na Tabela 16.`,
    );

    return {
      desiredOverall: Number(desiredOverall),

      lowerReference,

      proportionalExercise: null,

      table14Values: lowerReference.values || {},

      table5Values: {},

      table6Values: {},

      table7Values: {},

      otherSkills: {},

      a1: {},

      otherSkillsSum: 0,

      a1Sum: 0,

      table6Sum: 0,

      table7Sum: 0,

      n: 0,

      key: {},

      nonKey: {},

      finalSkills: lowerReference.values || {},

      finalOverall: calculateOverall(lowerReference.values, attributes),
    };
  }

  console.group("[2] PRÓXIMO EXERCÍCIO — TABELA 16");

  console.log("Rank T16 de referência:", lowerReference.rank);

  console.log(
    "Referência inicial:",
    lowerReference.isInitialReference ? "SIM" : "NÃO",
  );

  console.log("Rank T16 atual:", nextTable16Exercise.rank);

  console.log("Exercise:", nextTable16Exercise.exerciseName);

  console.log("Exercise ID:", nextTable16Exercise.exerciseId);

  console.log("OVR normal:", Number(nextTable16Exercise.media));

  console.groupEnd();

  /* =======================================================
     STEP 3

     REFERÊNCIA

     CASO NORMAL:
        valores da referência da Tabela 16,
        que correspondem aos valores da Tabela 14.

     CASO ESPECIAL:
        habilidades iniciais da Aba 0.
  ======================================================= */

  const table14Values = lowerReference.values || {};

  /* =======================================================
     FIND SAME EXERCISE IN RANKED DATA

     T5/T6/T7 continuam armazenados em
     rankedExercises.

     O exercício correto é encontrado
     pelo exerciseId do próximo item da T16.
  ======================================================= */

  const proportionalExercise =
    rankedExercises.find(
      (exercise) => exercise.exerciseId === nextTable16Exercise.exerciseId,
    ) || null;

  /* =======================================================
     NEXT EXERCISE NOT FOUND IN RANKED DATA
  ======================================================= */

  if (!proportionalExercise) {
    console.warn(
      "[PROPORTIONAL] Não foi possível encontrar o exercício atual nas Tabelas 5, 6 e 7.",
    );

    return {
      desiredOverall: Number(desiredOverall),

      lowerReference,

      proportionalExercise: null,

      table14Values,

      table5Values: {},

      table6Values: {},

      table7Values: {},

      otherSkills: {},

      a1: {},

      otherSkillsSum: 0,

      a1Sum: 0,

      table6Sum: 0,

      table7Sum: 0,

      n: 0,

      key: {},

      nonKey: {},

      finalSkills: table14Values,

      finalOverall: calculateOverall(table14Values, attributes),
    };
  }

  /* =======================================================
     STEP 4

     TABELA 5

     Usa o exercício atual.
  ======================================================= */

  const table5Values = getTable5Values(proportionalExercise);

  console.group("[4] TABELA 5 — EXERCÍCIO ATUAL");

  console.log("Rank T16 de referência:", lowerReference.rank);

  console.log("Rank T16 usado:", nextTable16Exercise.rank);

  console.log("Exercise:", proportionalExercise.exerciseName);

  console.log("Exercise ID:", proportionalExercise.exerciseId);

  printDebugValues("15 HABILIDADES DA TABELA 5", table5Values, attributes);

  console.groupEnd();

  /* =======================================================
     STEP 5

     DEMAIS HABILIDADES
     e
     a_1
  ======================================================= */

  const otherSkills = calculateOtherSkills({
    table14Values,

    table5Values,

    attributes,
  });

  const a1 = calculateA1({
    table14Values,

    table5Values,

    attributes,
  });

  console.group("[5] DEMAIS HABILIDADES E a_1");

  printDebugValues(
    "DEMAIS HABILIDADES = NOT(T5) × REFERÊNCIA",
    otherSkills,
    attributes,
  );

  printDebugValues("a_1 = T5 × REFERÊNCIA", a1, attributes);

  console.groupEnd();

  /* =======================================================
     STEP 6

     SOMAS
  ======================================================= */

  const otherSkillsSum = sumValues(otherSkills, attributes);

  const a1Sum = sumValues(a1, attributes);

  console.group("[6] SOMAS");

  console.log("I17 — Soma Demais habilidades:", otherSkillsSum);

  console.log("K17 — Soma a_1:", a1Sum);

  console.groupEnd();

  /* =======================================================
     STEP 7

     SOMAS DAS TABELAS 6 E 7

     Aqui pegamos o exercício atual
     e extraímos os valores.
  ======================================================= */

  const table6Values = getTable6Values(proportionalExercise);

  const table7Values = getTable7Values(proportionalExercise);

  const table6Sum = sumValues(table6Values, attributes);

  const table7Sum = sumValues(table7Values, attributes);

  console.group("[7] SOMA DAS TABELAS 6 E 7 — EXERCÍCIO ATUAL");

  console.log("F17 — Soma Tabela 6:", table6Sum);

  console.log("G17 — Soma Tabela 7:", table7Sum);

  console.groupEnd();

  /* =======================================================
     STEP 8

     CALCULAR n

     =INT(
       (
         (($P$3*15-I17)-K17)
         /
         (2*F17+1*G17)
         )
       )
  ======================================================= */

  const n = calculateN({
    desiredOverall,

    otherSkills,

    a1,

    table6Sum,

    table7Sum,

    attributes,
  });

  const numerator = Number(desiredOverall) * 15 - otherSkillsSum - a1Sum;

  const denominator = 2 * table6Sum + table7Sum;

  console.group("[8] CÁLCULO DE n");

  console.log("DESIRED OVERALL:", Number(desiredOverall));

  console.log("I17 — Demais habilidades:", otherSkillsSum);

  console.log("K17 — a_1:", a1Sum);

  console.log("F17 — Soma Tabela 6:", table6Sum);

  console.log("G17 — Soma Tabela 7:", table7Sum);

  console.log("Numerador:", numerator);

  console.log("Denominador:", denominator);

  console.log("n:", n);

  console.groupEnd();

  /* =======================================================
     STEP 9

     15 VALORES INDIVIDUAIS DE T6 E T7

     Sempre do exercício atual.
  ======================================================= */

  console.group("[9] TABELAS 6 E 7 — 15 HABILIDADES — EXERCÍCIO ATUAL");

  console.log("Rank T16 usado:", nextTable16Exercise.rank);

  printDebugValues("TABELA 6", table6Values, attributes);

  printDebugValues("TABELA 7", table7Values, attributes);

  console.groupEnd();

  /* =======================================================
     STEP 10

     KEY = T6 × 2n
  ======================================================= */

  const key = calculateKey({
    table6Values,

    n,

    attributes,
  });

  console.group("[10] KEY = TABELA 6 × 2n");

  console.log("n:", n);

  console.log("2n:", 2 * n);

  printDebugValues("KEY", key, attributes);

  console.groupEnd();

  /* =======================================================
     STEP 11

     NON KEY = T7 × n
  ======================================================= */

  const nonKey = calculateNonKey({
    table7Values,

    n,

    attributes,
  });

  console.group("[11] NON KEY = TABELA 7 × n");

  console.log("n:", n);

  printDebugValues("NON KEY", nonKey, attributes);

  console.groupEnd();

  /* =======================================================
     STEP 12

     FINAL =
       KEY
       + NON KEY
       + DEMAIS HABILIDADES
       + a_1
  ======================================================= */

  const finalSkills = calculateFinalSkills({
    key,

    nonKey,

    otherSkills,

    a1,

    attributes,
  });

  const finalOverall = calculateOverall(finalSkills, attributes);

  console.group("[12] FINAL = KEY + NON KEY + DEMAIS HABILIDADES + a_1");

  printDebugValues("KEY", key, attributes);

  printDebugValues("NON KEY", nonKey, attributes);

  printDebugValues("DEMAIS HABILIDADES", otherSkills, attributes);

  printDebugValues("a_1", a1, attributes);

  printDebugValues("HABILIDADES FINAIS", finalSkills, attributes);

  console.log("FINAL OVR:", finalOverall);

  console.groupEnd();

  /* =======================================================
     FINAL SUMMARY
  ======================================================= */

  console.log("============================================================");

  console.log(" RESUMO");

  console.log("============================================================");

  console.table({
    "Desired OVR": Number(desiredOverall),

    "Reference T16 Rank": lowerReference.rank,

    "Reference Exercise": lowerReference.exerciseName,

    "Reference Exercise ID": lowerReference.exerciseId,

    "Initial Reference": lowerReference.isInitialReference ? "YES" : "NO",

    "Reference OVR": Number(lowerReference.media),

    "Training T16 Rank": nextTable16Exercise.rank,

    "Training Exercise": nextTable16Exercise.exerciseName,

    "Training Exercise ID": nextTable16Exercise.exerciseId,

    "Demais Skills": otherSkillsSum,

    a_1: a1Sum,

    "Table 6": table6Sum,

    "Table 7": table7Sum,

    n,

    "Final OVR": finalOverall,
  });

  console.log("============================================================");

  /* =======================================================
     RETURN
  ======================================================= */

  return {
    desiredOverall: Number(desiredOverall),

    /* =====================================================
       REFERENCE
    ===================================================== */

    lowerReference,

    /* =====================================================
       CURRENT EXERCISE
    ===================================================== */

    proportionalExercise,

    /* =====================================================
       REFERENCE VALUES
    ===================================================== */

    table14Values,

    /* =====================================================
       TABLE 5
    ===================================================== */

    table5Values,

    /* =====================================================
       TABLE 6
    ===================================================== */

    table6Values,

    /* =====================================================
       TABLE 7
    ===================================================== */

    table7Values,

    /* =====================================================
       DEMAIS
    ===================================================== */

    otherSkills,

    /* =====================================================
       a_1
    ===================================================== */

    a1,

    /* =====================================================
       SUMS
    ===================================================== */

    otherSkillsSum,

    a1Sum,

    table6Sum,

    table7Sum,

    /* =====================================================
       n
    ===================================================== */

    n,

    /* =====================================================
       KEY
    ===================================================== */

    key,

    /* =====================================================
       NON KEY
    ===================================================== */

    nonKey,

    /* =====================================================
       FINAL
    ===================================================== */

    finalSkills,

    finalOverall,
  };
}
