/* =========================================================
   TABLE 8 — VALUES
========================================================= */

/*
 * Table 8 uses the ranked order from Table 5.
 *
 * Rank 1:
 *   Initial Skills × Exercise Skills
 *
 * Rank 2:
 *   Table 14 from Rank 1 × Exercise Skills
 *
 * Rank 3:
 *   Table 14 from Rank 2 × Exercise Skills
 *
 * ...
 *
 * Rank 29:
 *   Table 14 from Rank 28 × Exercise Skills
 */

/* =========================================================
   NORMALIZE VALUE
========================================================= */

function normalizeValue(value) {
  const numericValue = Number(value);

  return Number.isFinite(numericValue) ? numericValue : 0;
}

/* =========================================================
   CALCULATE ONE EXERCISE
========================================================= */

export function calculateTable8ForExercise(
  referenceValues,
  exerciseSkills,
  attributes,
) {
  const values = {};

  let sum = 0;

  let count = 0;

  /* =======================================================
     MULTIPLICATION
  ======================================================= */

  attributes.forEach((attribute) => {
    const referenceValue = normalizeValue(referenceValues?.[attribute]);

    const exerciseValue = exerciseSkills?.[attribute] ? 1 : 0;

    const value = referenceValue * exerciseValue;

    values[attribute] = value;

    /* =================================================
         MEDIA ONLY USES NON-ZERO VALUES
      ================================================= */

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
   CALCULATE TABLE 8
========================================================= */

export function calculateTable8(rankedExercises, initialSkills, attributes) {
  return rankedExercises.map((exercise, index) => {
    /* ===================================================
         FIRST EXERCISE
      =================================================== */

    let referenceValues = initialSkills;

    let referenceType = "initialSkills";

    let referenceExerciseId = null;

    /* ===================================================
         FOLLOWING EXERCISES
      =================================================== */

    if (index > 0) {
      const previousExercise = rankedExercises[index - 1];

      /*
       * Uses Table 14 from the
       * previous ranked exercise.
       */

      referenceValues = previousExercise?.table14?.values || initialSkills;

      referenceType = "table14";

      referenceExerciseId = previousExercise?.exerciseId || null;
    }

    /* ===================================================
         CALCULATE
      =================================================== */

    const result = calculateTable8ForExercise(
      referenceValues,

      exercise.table2?.result,

      attributes,
    );

    /* ===================================================
         RETURN
      =================================================== */

    return {
      exerciseId: exercise.exerciseId,

      exerciseName: exercise.exerciseName,

      category: exercise.category,

      rank: exercise.rank ?? index + 1,

      referenceType,

      referenceExerciseId,

      values: result.values,

      sum: result.sum,

      count: result.count,

      media: result.media,
    };
  });
}

export default calculateTable8;
