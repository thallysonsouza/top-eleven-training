/* =========================================================
   TABLE 9 — KEY VALUES
========================================================= */

/*
 * Table 9 receives the values calculated by Table 8
 * and keeps only the values whose corresponding skill
 * is a KEY skill in Table 3.
 */

/* =========================================================
   CALCULATE
========================================================= */

export function calculateTable9(table8Values, table3Result, attributes) {
  const values = {};

  let sum = 0;
  let count = 0;

  attributes.forEach((attribute) => {
    const value = Number(table8Values?.[attribute]) || 0;

    const keyFlag = table3Result?.[attribute];

    /*
     * Accepts both boolean and numeric
     * representations of 1.
     */

    const isKey = keyFlag === true || Number(keyFlag) === 1;

    const result = isKey ? value : 0;

    values[attribute] = result;

    if (result !== 0) {
      sum += result;
      count += 1;
    }
  });

  const media = count > 0 ? sum / count : 0;

  return {
    values,
    sum,
    count,
    media,
  };
}

export default calculateTable9;
