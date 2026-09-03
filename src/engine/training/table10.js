/* =========================================================
   TABLE 10 — NON-KEY VALUES
========================================================= */

/*
 * Table 10 receives the values calculated by Table 8
 * and keeps only the values whose corresponding skill
 * is NOT a KEY skill in Table 3.
 */

/* =========================================================
   CALCULATE
========================================================= */

export function calculateTable10(table8Values, table3Result, attributes) {
  const values = {};

  let sum = 0;
  let count = 0;

  attributes.forEach((attribute) => {
    const value = Number(table8Values?.[attribute]) || 0;

    const keyFlag = table3Result?.[attribute];

    const isKey = keyFlag === true || Number(keyFlag) === 1;

    const result = isKey ? 0 : value;

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

export default calculateTable10;
