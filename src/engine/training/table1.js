import KeySkill from "../../constants/keySkill";
import KeyGoalkeeperSkill from "../../constants/keyGoalkeeperSkill";

import skill from "../../constants/skill";
import goalkeeperSkill from "../../constants/goalkeeperSkill";

/* =========================================================
   TABLE 1 — GENERAL POSITION
========================================================= */

/**
 * Combines the three player positions using OR logic.
 *
 * OUTFIELD:
 *   position1 OR position2 OR position3
 *
 * GOALKEEPER:
 *   GK only
 */
export function calculateTable1(
  position1,
  position2 = "---",
  position3 = "---",
) {
  const isGoalkeeper = position1 === "GK";

  const skills = isGoalkeeper ? goalkeeperSkill : skill;

  /* =======================================================
     KEY SKILLS BY POSITION
  ======================================================= */

  const p1 = isGoalkeeper
    ? KeyGoalkeeperSkill.GK
    : KeySkill[position1] || KeySkill["---"];

  const p2 = isGoalkeeper ? {} : KeySkill[position2] || KeySkill["---"];

  const p3 = isGoalkeeper ? {} : KeySkill[position3] || KeySkill["---"];

  /* =======================================================
     OR LOGIC
  ======================================================= */

  const result = {};

  skills.forEach((attribute) => {
    result[attribute] = Boolean(
      p1[attribute] || p2[attribute] || p3[attribute],
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

  /* =======================================================
     RETURN
  ======================================================= */

  return {
    position1,

    position2: isGoalkeeper ? "---" : position2,

    position3: isGoalkeeper ? "---" : position3,

    playerType: isGoalkeeper ? "goalkeeper" : "outfield",

    result,

    binary,

    sum,
  };
}

export default calculateTable1;
