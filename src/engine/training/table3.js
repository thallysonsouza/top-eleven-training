import skill from "../../constants/skill";
import goalkeeperSkill from "../../constants/goalkeeperSkill";

/* =========================================================
   TABLE 3 — KEY SKILLS
========================================================= */

/**
 * Table 3:
 *
 * Identifies the key skills trained by the
 * selected exercise.
 *
 * Logic:
 *
 *     TABLE 1 AND TABLE 2
 *
 * Table 1 = General Position
 * Table 2 = Exercise Skills
 */
export function calculateTable3(
  table1Result,
  table2Result,
  playerType = "outfield",
) {
  const skills = playerType === "goalkeeper" ? goalkeeperSkill : skill;

  const result = {};

  skills.forEach((attribute) => {
    result[attribute] = Boolean(
      table1Result?.[attribute] && table2Result?.[attribute],
    );
  });

  const binary = skills
    .map((attribute) => (result[attribute] ? "1" : "0"))
    .join("");

  const sum = skills.reduce(
    (total, attribute) => total + (result[attribute] ? 1 : 0),
    0,
  );

  return {
    playerType,

    result,

    binary,

    sum,
  };
}

export default calculateTable3;
