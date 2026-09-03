/* =========================================================
   TABLE 17

   Tabela 17 utiliza:

      Tabela 1 = POSIÇÃO GERAL
      Tabela 15 = HABILIDADES DO EXERCÍCIO

   Fórmula:

      T17 = T1 × T15

   Depois:

      MEDIA =
        SOMA DOS VALORES DIFERENTES DE 0
        /
        QUANTIDADE DE VALORES DIFERENTES DE 0

   A média da Tabela 17 representa o
   OVR WHITE do exercício.
========================================================= */

/* =========================================================
   READ VALUE
========================================================= */

function readValue(values, attribute) {
  const value = Number(values?.[attribute]);

  return Number.isFinite(value) ? value : 0;
}

/* =========================================================
   CALCULATE WHITE VALUES
========================================================= */

export function calculateWhiteValues({
  generalPositionValues,
  exerciseValues,
  attributes,
}) {
  if (
    !generalPositionValues ||
    !exerciseValues ||
    !Array.isArray(attributes) ||
    attributes.length === 0
  ) {
    return {};
  }

  return Object.fromEntries(
    attributes.map((attribute) => {
      const positionValue = readValue(generalPositionValues, attribute);

      const exerciseValue = readValue(exerciseValues, attribute);

      return [attribute, positionValue * exerciseValue];
    }),
  );
}

/* =========================================================
   CALCULATE WHITE OVERALL
========================================================= */

export function calculateWhiteOverall({ values, attributes }) {
  if (!values || !Array.isArray(attributes) || attributes.length === 0) {
    return 0;
  }

  const nonZeroValues = attributes
    .map((attribute) => readValue(values, attribute))
    .filter((value) => value !== 0);

  if (nonZeroValues.length === 0) {
    return 0;
  }

  const sum = nonZeroValues.reduce((total, value) => total + value, 0);

  return sum / nonZeroValues.length;
}

/* =========================================================
   MAIN TABLE 17
========================================================= */

export default function calculateTable17({
  table1 = null,
  table15 = [],
  attributes = [],
}) {
  if (
    !table1 ||
    !Array.isArray(table15) ||
    !Array.isArray(attributes) ||
    attributes.length === 0
  ) {
    return [];
  }

  /* =======================================================
     TABLE 1 — GENERAL POSITION

     Dependendo da estrutura da Tabela 1,
     o resultado pode estar diretamente em:

        table1.result

     ou em um objeto com values.
  ======================================================= */

  const generalPositionValues = table1?.result || table1?.values || {};

  /* =======================================================
     CALCULATE EACH EXERCISE
  ======================================================= */

  return table15.map((exercise, index) => {
    /* =====================================================
       EXERCISE VALUES

       Tabela 15 é a referência.
    ===================================================== */

    const exerciseValues = exercise?.values || {};

    /* =====================================================
       T17 VALUES

       T1 × T15
    ===================================================== */

    const values = calculateWhiteValues({
      generalPositionValues,

      exerciseValues,

      attributes,
    });

    /* =====================================================
       WHITE OVERALL

       Média somente dos valores diferentes de zero.
    ===================================================== */

    const media = calculateWhiteOverall({
      values,

      attributes,
    });

    /* =====================================================
       RETURN
    ===================================================== */

    return {
      exerciseId: exercise.exerciseId,

      exerciseName: exercise.exerciseName,

      category: exercise.category,

      rank: exercise.rank ?? index + 1,

      values,

      media,
    };
  });
}
