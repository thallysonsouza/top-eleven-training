import skill from "./skill";
import goalkeeperSkill from "./goalkeeperSkill";

/* =========================================================
   EXERCISES
========================================================= */

const EXERCISE_COUNT = 29;

/* =========================================================
   OUTFIELD MATRIX
========================================================= */

const OUTFIELD_ROWS = {
  tackling: [
    0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
    0, 0, 0, 0,
  ],

  marking: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
    0, 0, 0, 0,
  ],

  positioning: [
    1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0,
    0, 0, 0, 0,
  ],

  heading: [
    0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],

  bravery: [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1,
    1, 0, 0, 0,
  ],

  passing: [
    0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 0, 0,
  ],

  dribbling: [
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 1,
  ],

  crossing: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 1, 0, 0,
  ],

  shooting: [
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],

  finishing: [
    0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0,
    0, 1, 0, 0,
  ],

  fitness: [
    0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 1, 1,
  ],

  strength: [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 1, 0,
  ],

  aggression: [
    0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
    1, 0, 0, 0,
  ],

  speed: [
    0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1,
    1, 0, 0, 1,
  ],

  creativity: [
    1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0,
  ],
};

/* =========================================================
   GOALKEEPER MATRIX
========================================================= */

const GOALKEEPER_ROWS = {
  reflexes: [
    0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 0,
  ],

  agility: [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    0, 0, 0, 0,
  ],

  anticipation: [
    0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 0, 0, 0,
  ],

  rushingOut: [
    0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1,
  ],

  communication: [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0,
  ],

  throwing: [
    0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 1, 0,
  ],

  kicking: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    1, 0, 1, 0,
  ],

  punching: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],

  aerialReach: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 0,
  ],

  concentration: [
    0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],

  fitness: [
    0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 1, 1,
  ],

  strength: [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 1, 0,
  ],

  aggression: [
    0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
    1, 0, 0, 0,
  ],

  speed: [
    0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1,
    1, 0, 0, 1,
  ],

  creativity: [
    1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0,
  ],
};

/* =========================================================
   VALIDATION
========================================================= */

function validateRows(rows, skills) {
  skills.forEach((skillName) => {
    if (!Array.isArray(rows[skillName])) {
      throw new Error(`Missing Table 2 data for skill: ${skillName}`);
    }

    if (rows[skillName].length !== EXERCISE_COUNT) {
      throw new Error(
        `Invalid Table 2 data length for skill "${skillName}". Expected ${EXERCISE_COUNT}, received ${rows[skillName].length}.`,
      );
    }
  });
}

validateRows(OUTFIELD_ROWS, skill);
validateRows(GOALKEEPER_ROWS, goalkeeperSkill);

/* =========================================================
   BUILD MATRICES
========================================================= */

function buildExerciseMatrix(rows, skills) {
  const matrix = {};

  for (
    let exerciseIndex = 0;
    exerciseIndex < EXERCISE_COUNT;
    exerciseIndex += 1
  ) {
    const result = {};

    skills.forEach((skillName) => {
      result[skillName] = Boolean(rows[skillName][exerciseIndex]);
    });

    matrix[exerciseIndex] = result;
  }

  return matrix;
}

export const outfieldExerciseSkills = buildExerciseMatrix(OUTFIELD_ROWS, skill);

export const goalkeeperExerciseSkills = buildExerciseMatrix(
  GOALKEEPER_ROWS,
  goalkeeperSkill,
);

/* =========================================================
   GET EXERCISE SKILLS
========================================================= */

export function getTrainingExerciseSkills(exerciseIndex, playerType) {
  const matrix =
    playerType === "goalkeeper"
      ? goalkeeperExerciseSkills
      : outfieldExerciseSkills;

  return matrix[exerciseIndex] || {};
}

export { OUTFIELD_ROWS, GOALKEEPER_ROWS };

export default {
  outfield: outfieldExerciseSkills,
  goalkeeper: goalkeeperExerciseSkills,
};
