import { createContext, useContext, useState } from "react";

import skill from "../constants/skill";
import goalkeeperSkill from "../constants/goalkeeperSkill";

import calculateTrainingEngine from "../engine/training/trainingEngine";

const TrainingSimulatorContext = createContext(null);

/* ==================================================
   DEFAULT PLAYER
================================================== */

const DEFAULT_PLAYER = null;

/* ==================================================
   DEFAULT INITIAL SKILLS
================================================== */

const DEFAULT_INITIAL_SKILLS = {
  tackling: 35,
  marking: 36,
  positioning: 135,
  heading: 39,
  bravery: 37,

  passing: 134,
  dribbling: 55,
  crossing: 143,
  shooting: 40,
  finishing: 48,

  fitness: 67,
  strength: 25,
  aggression: 35,
  speed: 131,
  creativity: 113,
};

/* ==================================================
   DEFAULT FINAL SKILLS
================================================== */

const DEFAULT_FINAL_SKILLS = {
  tackling: 35,
  marking: 36,
  positioning: 144,
  heading: 39,
  bravery: 37,

  passing: 143,
  dribbling: 55,
  crossing: 152,
  shooting: 40,
  finishing: 48,

  fitness: 67,
  strength: 25,
  aggression: 35,
  speed: 140,
  creativity: 120,
};

/* ==================================================
   DEFAULT CONFIGURATION
================================================== */

const DEFAULT_TRAINING_CONFIGURATION = {
  selectedExercise: null,

  trainingAverage: 140,

  desiredOverall: 100,
};

/* ==================================================
   GET PLAYER INITIAL SKILLS
================================================== */

function getPlayerInitialSkills(
  player,
  previousSkills = DEFAULT_INITIAL_SKILLS,
) {
  if (!player) {
    return {
      ...previousSkills,
    };
  }

  const playerType = player.position1 === "GK" ? "goalkeeper" : "outfield";

  const attributes = playerType === "goalkeeper" ? goalkeeperSkill : skill;

  return Object.fromEntries(
    attributes.map((attribute) => {
      const playerValue = Number(player?.skills?.[attribute]);

      const previousValue = Number(previousSkills?.[attribute]);

      let value;

      if (Number.isFinite(playerValue)) {
        value = playerValue;
      } else if (Number.isFinite(previousValue)) {
        value = previousValue;
      } else {
        value = 40;
      }

      return [attribute, value];
    }),
  );
}

/* ==================================================
   CALCULATE ENGINE
================================================== */

function calculateEngineForPlayer({
  player,
  initialSkills,
  trainingAverage,
  desiredOverall,
}) {
  if (!player) {
    return null;
  }

  return calculateTrainingEngine({
    position1: player.position1 || "---",

    position2: player.position2 || "---",

    position3: player.position3 || "---",

    initialSkills,

    trainingAverage,

    desiredOverall,

    rB: 2,

    rC: 1,
  });
}

/* ==================================================
   CALCULATE OVERALL
================================================== */

function calculateOverall(values, attributes) {
  if (!values || !Array.isArray(attributes) || attributes.length === 0) {
    return 0;
  }

  const sum = attributes.reduce((total, attribute) => {
    const value = Number(values?.[attribute]);

    return total + (Number.isFinite(value) ? value : 0);
  }, 0);

  return sum / attributes.length;
}

/* ==================================================
   CALCULATE WHITE OVERALL

   Tabela 17:

      T1 × habilidades

   Média somente dos valores
   diferentes de zero.
================================================== */

function calculateWhiteOverall({ initialSkills, table1, attributes }) {
  if (
    !initialSkills ||
    !table1 ||
    !Array.isArray(attributes) ||
    attributes.length === 0
  ) {
    return 0;
  }

  const positionValues = table1?.result || table1?.values || {};

  const whiteValues = attributes.map((attribute) => {
    const positionValue = Number(positionValues?.[attribute]);

    const skillValue = Number(initialSkills?.[attribute]);

    if (!Number.isFinite(positionValue) || !Number.isFinite(skillValue)) {
      return 0;
    }

    return positionValue * skillValue;
  });

  const nonZeroValues = whiteValues.filter((value) => value !== 0);

  if (nonZeroValues.length === 0) {
    return 0;
  }

  return (
    nonZeroValues.reduce((sum, value) => sum + value, 0) / nonZeroValues.length
  );
}

/* ==================================================
   MERGE SKILLS

   Um valor igual a zero na Tabela 15
   significa que aquela habilidade não
   foi alterada nesse exercício.

   Portanto:

      valor > 0
         → usa o novo valor

      valor = 0
         → mantém o valor anterior

   Isso permite reconstruir sempre um
   estado completo das 15 habilidades.
================================================== */

function mergeSkills(previousSkills, exerciseValues, attributes) {
  return Object.fromEntries(
    attributes.map((attribute) => {
      const previousValue = Number(previousSkills?.[attribute]);

      const exerciseValue = Number(exerciseValues?.[attribute]);

      if (Number.isFinite(exerciseValue) && exerciseValue > 0) {
        return [attribute, exerciseValue];
      }

      if (Number.isFinite(previousValue)) {
        return [attribute, previousValue];
      }

      return [attribute, 0];
    }),
  );
}

/* ==================================================
   BUILD TABLE 15 STATES

   Constrói o estado completo do jogador
   para cada posição da Tabela 15.

   Exemplo:

   Inicial
   40 40 40 40 40

   T15 #1
   40 68 40 40 40

   Estado #1
   40 68 40 40 40

   T15 #2
   0 70 0 80 0

   Estado #2
   40 70 40 80 40
================================================== */

function buildTable15States({ table15, initialSkills, attributes }) {
  if (
    !Array.isArray(table15) ||
    !Array.isArray(attributes) ||
    attributes.length === 0
  ) {
    return [];
  }

  let previousSkills = {
    ...initialSkills,
  };

  return table15.map((exercise) => {
    const currentSkills = mergeSkills(
      previousSkills,
      exercise?.values || {},
      attributes,
    );

    previousSkills = {
      ...currentSkills,
    };

    return {
      ...exercise,

      values: {
        ...currentSkills,
      },

      media: calculateOverall(currentSkills, attributes),
    };
  });
}

/* ==================================================
   BUILD TRAINING RESULT

   Rank 1:

      Aba 0
        ↓
      Tabela 15 / Rank 1

   Rank 2+:

      Tabela 15 / Rank anterior
        ↓
      Tabela 15 / Rank atual
================================================== */

function buildTrainingResult({
  table15,
  table17,
  selectedExercise,
  initialSkills,
  engine,
  attributes,
}) {
  if (!Array.isArray(table15) || table15.length === 0) {
    return null;
  }

  /* ==================================================
     REBUILD COMPLETE TABLE 15 STATES
  ================================================== */

  const table15States = buildTable15States({
    table15,

    initialSkills,

    attributes,
  });

  /* ==================================================
     FIND SELECTED EXERCISE
  ================================================== */

  let selectedIndex = table15States.findIndex(
    (exercise) => exercise.exerciseId === selectedExercise,
  );

  if (selectedIndex === -1) {
    selectedIndex = 0;
  }

  const selectedTable15 = table15States[selectedIndex];

  if (!selectedTable15) {
    return null;
  }

  /* ==================================================
     PREVIOUS STATE
  ================================================== */

  const previousSkills =
    selectedIndex === 0
      ? {
          ...initialSkills,
        }
      : {
          ...(table15States[selectedIndex - 1]?.values || initialSkills),
        };

  /* ==================================================
     CURRENT STATE

     Agora sempre será o estado completo
     reconstruído.
  ================================================== */

  const currentSkills = {
    ...(selectedTable15.values || previousSkills),
  };

  /* ==================================================
     OVERALL
  ================================================== */

  const previousOverall = calculateOverall(previousSkills, attributes);

  const currentOverall = calculateOverall(currentSkills, attributes);

  /* ==================================================
     TABLE 17

     O White OVR continua vindo da
     Tabela 17.
  ================================================== */

  const currentTable17 = Array.isArray(table17)
    ? table17.find(
        (exercise) => exercise.exerciseId === selectedTable15?.exerciseId,
      ) || null
    : null;

  /* ==================================================
     WHITE OVERALL
  ================================================== */

  let previousWhiteOverall = 0;

  if (selectedIndex === 0) {
    previousWhiteOverall = calculateWhiteOverall({
      initialSkills,

      table1: engine?.table1,

      attributes,
    });
  } else {
    const previousTable15 = table15States[selectedIndex - 1];

    const previousTable17 = Array.isArray(table17)
      ? table17.find(
          (exercise) => exercise.exerciseId === previousTable15?.exerciseId,
        ) || null
      : null;

    previousWhiteOverall = Number(previousTable17?.media || 0);
  }

  const currentWhiteOverall = Number(currentTable17?.media || 0);

  /* ==================================================
     KEY SKILLS

     Mantemos preparada a estrutura para
     receber posteriormente a máscara de
     habilidades-chave da engine.
  ================================================== */

  const keySkills = engine?.table1?.result || engine?.table1?.values || {};

  /* ==================================================
     RETURN
  ================================================== */

  return {
    exerciseId: selectedTable15?.exerciseId || null,

    exerciseName: selectedTable15?.exerciseName || "",

    rank: selectedTable15?.rank || selectedIndex + 1,

    previousSkills,

    currentSkills,

    previousOverall,

    currentOverall,

    previousWhiteOverall,

    currentWhiteOverall,

    keySkills,
  };
}

/* ==================================================
   PROVIDER
================================================== */

export function TrainingSimulatorProvider({ children }) {
  /* ==================================================
     PLAYER
  ================================================== */

  const [selectedPlayer, setSelectedPlayer] = useState(DEFAULT_PLAYER);

  /* ==================================================
     TRAINING CONFIGURATION
  ================================================== */

  const [selectedExercise, setSelectedExerciseState] = useState(
    DEFAULT_TRAINING_CONFIGURATION.selectedExercise,
  );

  const [trainingAverage, setTrainingAverage] = useState(
    DEFAULT_TRAINING_CONFIGURATION.trainingAverage,
  );

  const [desiredOverall, setDesiredOverall] = useState(
    DEFAULT_TRAINING_CONFIGURATION.desiredOverall,
  );

  /* ==================================================
     TABLE 15
  ================================================== */

  const [trainingTable15, setTrainingTable15] = useState([]);

  /* ==================================================
     TRAINING RESULT
  ================================================== */

  const [initialSkills, setInitialSkills] = useState({
    ...DEFAULT_INITIAL_SKILLS,
  });

  const [finalSkills, setFinalSkills] = useState({
    ...DEFAULT_FINAL_SKILLS,
  });

  const [trainingResult, setTrainingResult] = useState(null);

  /* ==================================================
     SELECT EXERCISE
  ================================================== */

  function selectExercise(exerciseId) {
    setSelectedExerciseState(exerciseId);

    if (!selectedPlayer) {
      setTrainingResult(null);

      setFinalSkills({
        ...initialSkills,
      });

      return;
    }

    /* ================================================
       RECALCULATE ENGINE
    ================================================ */

    const engine = calculateEngineForPlayer({
      player: selectedPlayer,

      initialSkills,

      trainingAverage,

      desiredOverall,
    });

    const table15 = Array.isArray(engine?.table15) ? engine.table15 : [];

    const table17 = Array.isArray(engine?.table17) ? engine.table17 : [];

    /* ================================================
       REBUILD TABLE 15 STATES
    ================================================ */

    const playerType =
      selectedPlayer.position1 === "GK" ? "goalkeeper" : "outfield";

    const attributes = playerType === "goalkeeper" ? goalkeeperSkill : skill;

    const table15States = buildTable15States({
      table15,

      initialSkills,

      attributes,
    });

    setTrainingTable15(table15);

    /* ================================================
       VALIDATE EXERCISE
    ================================================ */

    const exerciseExists = table15States.some(
      (exercise) => exercise.exerciseId === exerciseId,
    );

    const effectiveExerciseId = exerciseExists
      ? exerciseId
      : table15States[0]?.exerciseId || null;

    if (effectiveExerciseId !== exerciseId) {
      setSelectedExerciseState(effectiveExerciseId);
    }

    /* ================================================
       BUILD RESULT
    ================================================ */

    const result = buildTrainingResult({
      table15,

      table17,

      selectedExercise: effectiveExerciseId,

      initialSkills,

      engine,

      attributes,
    });

    setTrainingResult(result);

    setFinalSkills(result?.currentSkills || initialSkills);
  }

  /* ==================================================
     SELECT PLAYER
  ================================================== */

  function selectPlayer(player) {
    console.log("[CONTEXT] selectPlayer recebeu:", player);

    setSelectedPlayer(player);

    /* ================================================
       PLAYER SKILLS
    ================================================ */

    const playerSkills = getPlayerInitialSkills(player, DEFAULT_INITIAL_SKILLS);

    setInitialSkills(playerSkills);

    /* ================================================
       CALCULATE ENGINE
    ================================================ */

    const engine = calculateEngineForPlayer({
      player,

      initialSkills: playerSkills,

      trainingAverage,

      desiredOverall,
    });

    const table15 = Array.isArray(engine?.table15) ? engine.table15 : [];

    const table17 = Array.isArray(engine?.table17) ? engine.table17 : [];

    /* ================================================
       ATTRIBUTES
    ================================================ */

    const playerType = player.position1 === "GK" ? "goalkeeper" : "outfield";

    const attributes = playerType === "goalkeeper" ? goalkeeperSkill : skill;

    /* ================================================
       REBUILD TABLE 15 STATES
    ================================================ */

    const table15States = buildTable15States({
      table15,

      initialSkills: playerSkills,

      attributes,
    });

    setTrainingTable15(table15);

    /* ================================================
       FIRST EXERCISE
    ================================================ */

    const firstExercise = table15States[0] || null;

    const firstExerciseId = firstExercise?.exerciseId || null;

    setSelectedExerciseState(firstExerciseId);

    /* ================================================
       BUILD FIRST RESULT
    ================================================ */

    const result = buildTrainingResult({
      table15,

      table17,

      selectedExercise: firstExerciseId,

      initialSkills: playerSkills,

      engine,

      attributes,
    });

    setTrainingResult(result);

    setFinalSkills(result?.currentSkills || playerSkills);
  }

  /* ==================================================
     UPDATE CONFIGURATION
  ================================================== */

  function updateTrainingConfiguration(updates) {
    const nextTrainingAverage = Object.prototype.hasOwnProperty.call(
      updates,
      "trainingAverage",
    )
      ? updates.trainingAverage
      : trainingAverage;

    const nextDesiredOverall = Object.prototype.hasOwnProperty.call(
      updates,
      "desiredOverall",
    )
      ? updates.desiredOverall
      : desiredOverall;

    const requestedExercise = Object.prototype.hasOwnProperty.call(
      updates,
      "selectedExercise",
    )
      ? updates.selectedExercise
      : selectedExercise;

    /* ================================================
       UPDATE CONFIGURATION
    ================================================ */

    setTrainingAverage(nextTrainingAverage);

    setDesiredOverall(nextDesiredOverall);

    if (!selectedPlayer) {
      setSelectedExerciseState(requestedExercise);

      setTrainingResult(null);

      setFinalSkills({
        ...initialSkills,
      });

      return;
    }

    /* ================================================
       RECALCULATE ENGINE
    ================================================ */

    const engine = calculateEngineForPlayer({
      player: selectedPlayer,

      initialSkills,

      trainingAverage: nextTrainingAverage,

      desiredOverall: nextDesiredOverall,
    });

    const table15 = Array.isArray(engine?.table15) ? engine.table15 : [];

    const table17 = Array.isArray(engine?.table17) ? engine.table17 : [];

    setTrainingTable15(table15);

    /* ================================================
       ATTRIBUTES
    ================================================ */

    const playerType =
      selectedPlayer.position1 === "GK" ? "goalkeeper" : "outfield";

    const attributes = playerType === "goalkeeper" ? goalkeeperSkill : skill;

    /* ================================================
       REBUILD TABLE 15 STATES
    ================================================ */

    const table15States = buildTable15States({
      table15,

      initialSkills,

      attributes,
    });

    /* ================================================
       KEEP SELECTED EXERCISE
       WHEN POSSIBLE
    ================================================ */

    const exerciseStillExists = table15States.some(
      (exercise) => exercise.exerciseId === requestedExercise,
    );

    const nextSelectedExercise = exerciseStillExists
      ? requestedExercise
      : table15States[0]?.exerciseId || null;

    setSelectedExerciseState(nextSelectedExercise);

    /* ================================================
       BUILD RESULT
    ================================================ */

    const result = buildTrainingResult({
      table15,

      table17,

      selectedExercise: nextSelectedExercise,

      initialSkills,

      engine,

      attributes,
    });

    setTrainingResult(result);

    setFinalSkills(result?.currentSkills || initialSkills);
  }

  /* ==================================================
     RESET
  ================================================== */

  function resetTrainingSimulator() {
    setSelectedPlayer(DEFAULT_PLAYER);

    setSelectedExerciseState(DEFAULT_TRAINING_CONFIGURATION.selectedExercise);

    setTrainingAverage(DEFAULT_TRAINING_CONFIGURATION.trainingAverage);

    setDesiredOverall(DEFAULT_TRAINING_CONFIGURATION.desiredOverall);

    setTrainingTable15([]);

    setInitialSkills({
      ...DEFAULT_INITIAL_SKILLS,
    });

    setFinalSkills({
      ...DEFAULT_FINAL_SKILLS,
    });

    setTrainingResult(null);
  }

  /* ==================================================
     CONTEXT VALUE
  ================================================== */

  const value = {
    /* PLAYER */

    selectedPlayer,

    setSelectedPlayer,

    selectPlayer,

    /* CONFIGURATION */

    selectedExercise,

    setSelectedExercise: selectExercise,

    selectExercise,

    trainingAverage,

    setTrainingAverage,

    desiredOverall,

    setDesiredOverall,

    updateTrainingConfiguration,

    /* TABLE 15 */

    trainingTable15,

    /* RESULT */

    initialSkills,

    setInitialSkills,

    finalSkills,

    setFinalSkills,

    trainingResult,

    setTrainingResult,

    /* ACTIONS */

    resetTrainingSimulator,
  };

  return (
    <TrainingSimulatorContext.Provider value={value}>
      {children}
    </TrainingSimulatorContext.Provider>
  );
}

/* ==================================================
   HOOK
================================================== */

export function useTrainingSimulator() {
  const context = useContext(TrainingSimulatorContext);

  if (!context) {
    throw new Error(
      "useTrainingSimulator must be used inside TrainingSimulatorProvider.",
    );
  }

  return context;
}
