/* =========================================================
   TABLE 13
========================================================= */

/*
 * TABLE 13
 *
 * First calculates the MEDIA for each ranked exercise.
 *
 * Then:
 *
 *   NON-KEY VALUES =
 *     MEDIA × TABLE 7
 *
 * Since Table 7 is binary:
 *
 *   75 × 0 = 0
 *   75 × 1 = 75
 */

/* =========================================================
   NORMALIZE NUMBER
========================================================= */

function toNumber(value) {
  const numericValue = Number(value);

  return Number.isFinite(numericValue) ? numericValue : 0;
}

/* =========================================================
   CALCULATE MEDIA
========================================================= */

export function calculateTable13ForExercise({
  table5Sum,
  table6Sum,
  table7Sum,
  table8Media,
  table9Media,
  table10Media,
  trainingAverage,
  rB,
}) {
  const exerciseSum = toNumber(table5Sum);

  const keySum = toNumber(table6Sum);

  const nonKeySum = toNumber(table7Sum);

  const valuesMedia = toNumber(table8Media);

  const keyMedia = toNumber(table9Media);

  const nonKeyMedia = toNumber(table10Media);

  const average = toNumber(trainingAverage);

  const rb = toNumber(rB);

  /* =======================================================
     CONDITION 1
  ======================================================= */

  if (valuesMedia > average) {
    return 0;
  }

  /* =======================================================
     CONDITION 2
  ======================================================= */

  if (nonKeySum === 0) {
    return 0;
  }

  /* =======================================================
     CONDITION 3
  ======================================================= */

  if (keySum === 0) {
    return 0;
  }

  /* =======================================================
     DENOMINATOR
  ======================================================= */

  const denominator = exerciseSum - nonKeySum;

  if (denominator === 0) {
    return 0;
  }

  /* =======================================================
     RATIOS
  ======================================================= */

  const keyRatio = exerciseSum / denominator;

  const nonKeyRatio = nonKeySum / denominator;

  /* =======================================================
     NUMERATOR
  ======================================================= */

  const numerator = keyRatio * average + rb * nonKeyMedia - keyMedia;

  /* =======================================================
     FORMULA DENOMINATOR
  ======================================================= */

  const formulaDenominator = rb + nonKeyRatio;

  if (formulaDenominator === 0) {
    return 0;
  }

  /* =======================================================
     RAW RESULT
  ======================================================= */

  const rawValue = numerator / formulaDenominator - nonKeyMedia;

  /* =======================================================
     ABS(INT())
  ======================================================= */

  return Math.abs(Math.trunc(rawValue));
}

/* =========================================================
   CALCULATE FULL TABLE 13
========================================================= */

export function calculateTable13({
  rankedExercises = [],
  trainingAverage,
  rB,
}) {
  return rankedExercises.map((exercise) => {
    const table5 = exercise.table5 || {};

    const table6 = exercise.table6 || {};

    const table7 = exercise.table7 || {};

    const table8 = exercise.table8 || {};

    const table9 = exercise.table9 || {};

    const table10 = exercise.table10 || {};

    /* ===================================================
         MEDIA
      =================================================== */

    const media = calculateTable13ForExercise({
      table5Sum: table5.sum ?? exercise.exerciseSkills ?? 0,

      table6Sum: table6.sum ?? exercise.keySkills ?? 0,

      table7Sum: table7.sum ?? exercise.nonKeySkills ?? 0,

      table8Media: table8.media ?? 0,

      table9Media: table9.media ?? 0,

      table10Media: table10.media ?? 0,

      trainingAverage,

      rB,
    });

    /* ===================================================
         TABLE 7 MASK
      =================================================== */

    const table7Values =
      table7.values || table7.result || exercise.table4?.result || {};

    /* ===================================================
         NON-KEY VALUES
      =================================================== */

    const nonKeyValues = {};

    Object.keys(table7Values).forEach((attribute) => {
      const isNonKey =
        table7Values[attribute] === true ||
        Number(table7Values[attribute]) === 1;

      nonKeyValues[attribute] = isNonKey ? media : 0;
    });

    /* ===================================================
         RETURN
      =================================================== */

    return {
      exerciseId: exercise.exerciseId,

      exerciseName: exercise.exerciseName,

      category: exercise.category,

      rank: exercise.rank,

      values: nonKeyValues,

      media,
    };
  });
}

export default calculateTable13;
