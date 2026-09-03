/* =========================================================
   TABLE 11
========================================================= */

/*
 * TABLE 11
 *
 * Adds the values from Table 12 and Table 13
 * skill by skill.
 *
 * Then calculates the MEDIA using only values
 * different from zero.
 */

/* =========================================================
   NORMALIZE NUMBER
========================================================= */

function toNumber(value) {
  const numericValue = Number(value);

  return Number.isFinite(numericValue) ? numericValue : 0;
}

/* =========================================================
   CALCULATE ONE EXERCISE
========================================================= */

export function calculateTable11ForExercise({
  table12Values,
  table13Values,
  attributes,
}) {
  const values = {};

  let sum = 0;

  let count = 0;

  /* =======================================================
     SUM TABLE 12 + TABLE 13
  ======================================================= */

  attributes.forEach((attribute) => {
    const table12Value = toNumber(table12Values?.[attribute]);

    const table13Value = toNumber(table13Values?.[attribute]);

    const value = table12Value + table13Value;

    values[attribute] = value;

    /* ==============================================
         MEDIA ONLY USES NON-ZERO VALUES
      ============================================== */

    if (value !== 0) {
      sum += value;

      count += 1;
    }
  });

  /* =======================================================
     MEDIA
  ======================================================= */

  const media = count > 0 ? sum / count : 0;

  /* =======================================================
     RETURN
  ======================================================= */

  return {
    values,

    sum,

    count,

    media,
  };
}

/* =========================================================
   CALCULATE FULL TABLE 11
========================================================= */

export function calculateTable11({
  table12 = [],
  table13 = [],
  attributes = [],
}) {
  return table12.map((table12Exercise) => {
    const table13Exercise = table13.find(
      (exercise) => exercise.exerciseId === table12Exercise.exerciseId,
    );

    const result = calculateTable11ForExercise({
      table12Values: table12Exercise.values,

      table13Values: table13Exercise?.values,

      attributes,
    });

    return {
      exerciseId: table12Exercise.exerciseId,

      exerciseName: table12Exercise.exerciseName,

      category: table12Exercise.category,

      rank: table12Exercise.rank,

      values: result.values,

      sum: result.sum,

      count: result.count,

      media: result.media,
    };
  });
}

export default calculateTable11;
