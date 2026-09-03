/* =========================================================
   TABLE 12
========================================================= */

/*
 * TABLE 12
 *
 * First calculates the MEDIA of each ranked exercise.
 *
 * Then:
 *
 *   TABLE 6 (Key Skills mask)
 *              ×
 *        TABLE 12 MEDIA
 *              ↓
 *      TABLE 12 VALUES
 *
 * ---------------------------------------------------------
 *
 * Excel formula translated to JavaScript:
 *
 * IF(
 *   Table8.media > trainingAverage,
 *   0,
 *   IF(
 *     Table6.sum === 0,
 *     0,
 *     IF(
 *       Table7.sum === 0,
 *       trainingAverage - Table9.media,
 *       ABS(
 *         INT(
 *           (
 *             1 /
 *             (Table5.sum - Table7.sum)
 *           )
 *           *
 *           (
 *             Table5.sum * trainingAverage
 *             -
 *             Table7.sum *
 *             (
 *               Table13.media +
 *               Table10.media
 *             )
 *           )
 *           -
 *           Table9.media
 *         )
 *       )
 *     )
 *   )
 * )
 */

/* =========================================================
   NORMALIZE NUMBER
========================================================= */

function toNumber(value) {
  const numericValue = Number(value);

  return Number.isFinite(numericValue) ? numericValue : 0;
}

/* =========================================================
   CALCULATE TABLE 12 MEDIA
========================================================= */

export function calculateTable12Media({
  table5Sum,
  table6Sum,
  table7Sum,
  table8Media,
  table9Media,
  table10Media,
  table13Media,
  trainingAverage,
}) {
  const exerciseSum = toNumber(table5Sum);

  const keySum = toNumber(table6Sum);

  const nonKeySum = toNumber(table7Sum);

  const valuesMedia = toNumber(table8Media);

  const keyMedia = toNumber(table9Media);

  const nonKeyMedia = toNumber(table10Media);

  const table13Value = toNumber(table13Media);

  const average = toNumber(trainingAverage);

  /* =======================================================
     CONDITION 1
  ======================================================= */

  if (valuesMedia > average) {
    return 0;
  }

  /* =======================================================
     CONDITION 2
  ======================================================= */

  if (keySum === 0) {
    return 0;
  }

  /* =======================================================
     CONDITION 3
  ======================================================= */

  if (nonKeySum === 0) {
    return average - keyMedia;
  }

  /* =======================================================
     DENOMINATOR
  ======================================================= */

  const denominator = exerciseSum - nonKeySum;

  /*
   * Table 5 SUM - Table 7 SUM
   * corresponds to the Key Skills SUM.
   */

  if (denominator === 0) {
    return 0;
  }

  /* =======================================================
     FIRST PART
  ======================================================= */

  const firstFactor = 1 / denominator;

  /* =======================================================
     SECOND PART
  ======================================================= */

  const secondFactor =
    exerciseSum * average - nonKeySum * (table13Value + nonKeyMedia);

  /* =======================================================
     RAW RESULT
  ======================================================= */

  const rawValue = firstFactor * secondFactor - keyMedia;

  /* =======================================================
     ABS(INT())
  ======================================================= */

  return Math.abs(Math.trunc(rawValue));
}

/* =========================================================
   CALCULATE ONE TABLE 12 RESULT
========================================================= */

export function calculateTable12ForExercise({
  table5Sum,
  table6Sum,
  table7Sum,
  table8Media,
  table9Media,
  table10Media,
  table13Media,
  table6Values,
  trainingAverage,
}) {
  /* =======================================================
     MEDIA
  ======================================================= */

  const media = calculateTable12Media({
    table5Sum,
    table6Sum,
    table7Sum,
    table8Media,
    table9Media,
    table10Media,
    table13Media,
    trainingAverage,
  });

  /* =======================================================
     VALUES
  ======================================================= */

  const values = {};

  let sum = 0;

  let count = 0;

  Object.entries(table6Values || {}).forEach(([attribute, flag]) => {
    const isKey = flag === true || Number(flag) === 1;

    const value = isKey ? media : 0;

    values[attribute] = value;

    if (value !== 0) {
      sum += value;
      count += 1;
    }
  });

  /* =======================================================
     RETURN
  ======================================================= */

  return {
    values,

    media,

    sum,

    count,
  };
}

/* =========================================================
   CALCULATE FULL TABLE 12
========================================================= */

export function calculateTable12({ rankedExercises = [], trainingAverage }) {
  return rankedExercises.map((exercise) => {
    /* ===================================================
         TABLE REFERENCES
      =================================================== */

    const table5 = exercise.table5 || {
      sum: exercise.exerciseSkills ?? 0,
    };

    const table6 = exercise.table6 || {
      sum: exercise.keySkills ?? 0,

      values: exercise.table3?.result || {},
    };

    const table7 = exercise.table7 || {
      sum: exercise.nonKeySkills ?? 0,
    };

    const table8 = exercise.table8 || {};

    const table9 = exercise.table9 || {};

    const table10 = exercise.table10 || {};

    const table13 = exercise.table13 || {};

    /* ===================================================
         CALCULATE
      =================================================== */

    const result = calculateTable12ForExercise({
      table5Sum: table5.sum,

      table6Sum: table6.sum,

      table7Sum: table7.sum,

      table8Media: table8.media,

      table9Media: table9.media,

      table10Media: table10.media,

      table13Media: table13.media,

      table6Values: table6.values,

      trainingAverage,
    });

    /* ===================================================
         RETURN
      =================================================== */

    return {
      exerciseId: exercise.exerciseId,

      exerciseName: exercise.exerciseName,

      category: exercise.category,

      rank: exercise.rank,

      values: result.values,

      media: result.media,

      sum: result.sum,

      count: result.count,
    };
  });
}

export default calculateTable12;
