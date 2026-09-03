import { getExercisePriority } from "./getExercisePriority";

/* =========================================================
   SHUFFLE
========================================================= */

/**
 * Fisher-Yates shuffle.
 *
 * Used only for exercises that have
 * exactly the same priority.
 */
function shuffle(array) {
  const result = [...array];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
}

/* =========================================================
   RANK EXERCISES
========================================================= */

export function rankExercises(exercises) {
  /* =======================================================
     ADD PRIORITY
  ======================================================= */

  const analyzed = exercises.map((exercise) => {
    const priority = getExercisePriority(
      exercise.keySkills,
      exercise.nonKeySkills,
    );

    return {
      ...exercise,

      priority: priority.priority,

      priorityGroup: priority.group,

      ranked: priority.ranked,
    };
  });

  /* =======================================================
     GROUP BY PRIORITY
  ======================================================= */

  const groups = new Map();

  analyzed.forEach((exercise) => {
    if (exercise.priority === null) {
      return;
    }

    if (!groups.has(exercise.priority)) {
      groups.set(exercise.priority, []);
    }

    groups.get(exercise.priority).push(exercise);
  });

  /* =======================================================
     SORT PRIORITY GROUPS
  ======================================================= */

  const sortedPriorities = [...groups.keys()].sort((a, b) => a - b);

  /* =======================================================
     CREATE RANKING
  ======================================================= */

  const rankedExercises = [];

  let rank = 1;

  sortedPriorities.forEach((priority) => {
    const priorityGroup = groups.get(priority);

    /*
     * Exercises with the same
     * priority are intentionally
     * shuffled.
     */

    const shuffled = shuffle(priorityGroup);

    shuffled.forEach((exercise) => {
      rankedExercises.push({
        ...exercise,

        rank,

        tie: priorityGroup.length > 1,
      });

      rank += 1;
    });
  });

  /* =======================================================
     UNRANKED EXERCISES
  ======================================================= */

  const unrankedExercises = analyzed.filter(
    (exercise) => exercise.priority === null,
  );

  return {
    rankedExercises,

    unrankedExercises,
  };
}

export default rankExercises;
