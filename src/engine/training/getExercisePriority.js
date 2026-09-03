/* =========================================================
   EXERCISE PRIORITY
========================================================= */

/*
 * Priority is based on the exact hierarchy
 * defined for the training simulator.
 *
 * Lower number = higher priority.
 *
 * Example:
 *
 *   5 key / 0 non-key → priority 1
 *   4 key / 0 non-key → priority 2
 *   3 key / 0 non-key → priority 3
 *
 * ...
 *
 *   1 key / 4 non-key → priority 15
 *   0 key / 5 non-key → priority 16
 *   ...
 *   0 key / 1 non-key → priority 20
 */

const PRIORITY_ORDER = [
  { key: 5, nonKey: 0 },
  { key: 4, nonKey: 0 },
  { key: 3, nonKey: 0 },
  { key: 2, nonKey: 0 },
  { key: 1, nonKey: 0 },

  { key: 4, nonKey: 1 },
  { key: 3, nonKey: 1 },
  { key: 2, nonKey: 1 },
  { key: 1, nonKey: 1 },

  { key: 3, nonKey: 2 },
  { key: 2, nonKey: 2 },
  { key: 1, nonKey: 2 },

  { key: 2, nonKey: 3 },
  { key: 1, nonKey: 3 },

  { key: 1, nonKey: 4 },

  { key: 0, nonKey: 5 },
  { key: 0, nonKey: 4 },
  { key: 0, nonKey: 3 },
  { key: 0, nonKey: 2 },
  { key: 0, nonKey: 1 },
];

/* =========================================================
   GET PRIORITY
========================================================= */

export function getExercisePriority(keySkills, nonKeySkills) {
  const key = Number(keySkills);
  const nonKey = Number(nonKeySkills);

  const priorityIndex = PRIORITY_ORDER.findIndex(
    (item) => item.key === key && item.nonKey === nonKey,
  );

  /*
   * The defined hierarchy intentionally
   * does not contain every mathematically
   * possible combination.
   *
   * Example:
   *
   *   5 key / 1 non-key
   *
   * If a combination is not explicitly
   * defined, it receives no priority.
   */

  if (priorityIndex === -1) {
    return {
      priority: null,
      keySkills: key,
      nonKeySkills: nonKey,
      group: `${key}-${nonKey}`,
      ranked: false,
    };
  }

  return {
    priority: priorityIndex + 1,

    keySkills: key,

    nonKeySkills: nonKey,

    group: `${key}-${nonKey}`,

    ranked: true,
  };
}

export default getExercisePriority;
