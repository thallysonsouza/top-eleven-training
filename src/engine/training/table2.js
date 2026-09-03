import trainingExercises from "../../constants/trainingExercises";

import skill from "../../constants/skill";
import goalkeeperSkill from "../../constants/goalkeeperSkill";

import { getTrainingExerciseSkills } from "../../constants/trainingExerciseSkills";

/* =========================================================
   TABLE 2
========================================================= */

/**
 * Table 2
 *
 * Identifies which skills are trained by
 * the selected exercise.
 *
 * playerType:
 *
 *   "outfield"
 *   "goalkeeper"
 */
export function calculateTable2(exerciseId, playerType = "outfield") {
  /* =======================================================
     FIND EXERCISE
  ======================================================= */

  const exerciseIndex = trainingExercises.findIndex(
    (exercise) => exercise.id === exerciseId,
  );

  if (exerciseIndex === -1) {
    throw new Error(`Exercise "${exerciseId}" not found.`);
  }

  /* =======================================================
     PLAYER SKILLS
  ======================================================= */

  const isGoalkeeper = playerType === "goalkeeper";

  const skills = isGoalkeeper ? goalkeeperSkill : skill;

  /* =======================================================
     EXERCISE SKILLS
  ======================================================= */

  const exerciseSkills = getTrainingExerciseSkills(exerciseIndex, playerType);

  /* =======================================================
     NORMALIZED RESULT
  ======================================================= */

  const result = {};

  skills.forEach((attribute) => {
    result[attribute] = Boolean(exerciseSkills[attribute]);
  });

  /* =======================================================
     BINARY RESULT
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
    exerciseId,

    exercise: trainingExercises[exerciseIndex],

    playerType,

    result,

    binary,

    sum,
  };
}

export default calculateTable2;
