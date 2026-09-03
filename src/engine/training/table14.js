/* =========================================================
   TABLE 14
========================================================= */

/*
 * TABLE 14 calculates the accumulated skill values
 * after each ranked training exercise.
 *
 * RULE:
 *
 * First exercise:
 *
 *   Initial Skills + Table 11 Exercise 1
 *
 * Following exercises:
 *
 *   Previous Table 14 + Current Table 11
 *
 * Every skill is limited to a maximum of 340.
 *
 * Excel equivalent:
 *
 *   =SE(Initial+Table11<340;(Initial+Table11);340)
 *
 * or
 *
 *   =MIN(340;Initial+Table11)
 */

/* =========================================================
   MAXIMUM VALUE
========================================================= */

const MAX_SKILL_VALUE = 340;

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

export function calculateTable14ForExercise({
  previousValues,
  initialSkills,
  table11Values,
  attributes,
}) {
  const values = {};

  let sum = 0;

  let count = 0;

  /* =======================================================
     EACH SKILL
  ======================================================= */

  attributes.forEach((attribute) => {
    /* ===================================================
         BASE VALUE
      =================================================== */

    const baseValue =
      previousValues?.[attribute] ?? initialSkills?.[attribute] ?? 0;

    /* ===================================================
         TABLE 11 VALUE
      =================================================== */

    const table11Value = table11Values?.[attribute] ?? 0;

    /* ===================================================
         SUM
      =================================================== */

    const rawValue = toNumber(baseValue) + toNumber(table11Value);

    /* ===================================================
         CAP AT 340
      =================================================== */

    const value = Math.min(MAX_SKILL_VALUE, rawValue);

    values[attribute] = value;

    /* ===================================================
         SUMMARY
      =================================================== */

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
   DEFAULT EXPORT
========================================================= */

export default calculateTable14ForExercise;
