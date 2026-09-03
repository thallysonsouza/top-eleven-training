import skill from "../../constants/skill";
import goalkeeperSkill from "../../constants/goalkeeperSkill";

/* =========================================================
   TABLE 4 — NON-KEY SKILLS
========================================================= */

/**
 * Table 4:
 *
 * Identifies the non-key skills trained by
 * the selected exercise.
 *
 * Logic:
 *
 *     NOT(TABLE 1) AND TABLE 2
 *
 * Table 1 = General Position
 * Table 2 = Exercise Skills
 */
export function calculateTable4(
  table1Result,
  table2Result,
  playerType = "outfield",
) {
  const skills = playerType === "goalkeeper" ? goalkeeperSkill : skill;

  const notTable1 = {};

  const result = {};

  /* =======================================================
     NOT TABLE 1
  ======================================================= */

  skills.forEach((attribute) => {
    notTable1[attribute] = !Boolean(table1Result?.[attribute]);
  });

  /* =======================================================
     AND WITH TABLE 2
  ======================================================= */

  skills.forEach((attribute) => {
    result[attribute] = Boolean(
      notTable1[attribute] && table2Result?.[attribute],
    );
  });

  /* =======================================================
     BINARY
  ======================================================= */

  const binary = skills
    .map((attribute) => (result[attribute] ? "1" : "0"))
    .join("");

  /* =======================================================
     SUM
  ======================================================= */

  const sum = skills.reduce(
    (total, attribute) => total + (result[attribute] ? 1 : 0),
    0,
  );

  return {
    playerType,

    notTable1,

    result,

    binary,

    sum,
  };
}

export default calculateTable4;
