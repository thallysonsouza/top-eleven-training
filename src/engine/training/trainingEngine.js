import calculateTable1 from "./table1";
import calculateTable2 from "./table2";
import calculateTable3 from "./table3";
import calculateTable4 from "./table4";

import calculateTable8 from "./table8";
import calculateTable9 from "./table9";
import calculateTable10 from "./table10";
import calculateTable11 from "./table11";
import calculateTable12 from "./table12";
import calculateTable13 from "./table13";
import calculateTable14 from "./table14";
import calculateTable15 from "./table15";
import calculateTable16 from "./table16";
import calculateTable17 from "./table17";

import calculateProportionalEngine from "./proportionalEngine";

import rankExercises from "./rankExercises";

import skill from "../../constants/skill";
import goalkeeperSkill from "../../constants/goalkeeperSkill";

import trainingExercises from "../../constants/trainingExercises";

/* =========================================================
   DEFAULT VALUES
========================================================= */

const DEFAULT_INITIAL_SKILL_VALUE = 40;

const DEFAULT_TRAINING_AVERAGE = 140;

const DEFAULT_DESIRED_OVERALL = 100;

const DEFAULT_R_B = 2;

const DEFAULT_R_C = 1;

/* =========================================================
   CREATE DEFAULT SKILLS
========================================================= */

export function createDefaultSkills(playerType) {
  const attributes = playerType === "goalkeeper" ? goalkeeperSkill : skill;

  return Object.fromEntries(
    attributes.map((attribute) => [attribute, DEFAULT_INITIAL_SKILL_VALUE]),
  );
}

/* =========================================================
   NORMALIZE INITIAL SKILLS
========================================================= */

function normalizeInitialSkills(initialSkills, playerType) {
  const attributes = playerType === "goalkeeper" ? goalkeeperSkill : skill;

  const defaults = createDefaultSkills(playerType);

  return Object.fromEntries(
    attributes.map((attribute) => {
      const value = initialSkills?.[attribute];

      const numericValue = Number(value);

      return [
        attribute,

        Number.isFinite(numericValue) ? numericValue : defaults[attribute],
      ];
    }),
  );
}

/* =========================================================
   NORMALIZE TRAINING PARAMETERS
========================================================= */

function normalizeTrainingParameters({
  trainingAverage,
  desiredOverall,
  rB,
  rC,
}) {
  const normalizedTrainingAverage = Number.isFinite(Number(trainingAverage))
    ? Number(trainingAverage)
    : DEFAULT_TRAINING_AVERAGE;

  const normalizedDesiredOverall = Number.isFinite(Number(desiredOverall))
    ? Number(desiredOverall)
    : DEFAULT_DESIRED_OVERALL;

  const normalizedRB = Number.isFinite(Number(rB)) ? Number(rB) : DEFAULT_R_B;

  const normalizedRC = Number.isFinite(Number(rC)) ? Number(rC) : DEFAULT_R_C;

  return {
    trainingAverage: normalizedTrainingAverage,

    desiredOverall: normalizedDesiredOverall,

    rB: normalizedRB,

    rC: normalizedRC,
  };
}

/* =========================================================
   ANALYZE BASE EXERCISES

   TABELAS 2, 3 E 4
========================================================= */

export function analyzeAllExercises({ table1, playerType }) {
  return trainingExercises.map((exercise) => {
    /* ===================================================
         TABLE 2
      =================================================== */

    const table2 = calculateTable2(exercise.id, playerType);

    /* ===================================================
         TABLE 3
      =================================================== */

    const table3 = calculateTable3(table1.result, table2.result, playerType);

    /* ===================================================
         TABLE 4
      =================================================== */

    const table4 = calculateTable4(table1.result, table2.result, playerType);

    /* ===================================================
         RETURN
      =================================================== */

    return {
      exerciseId: exercise.id,

      exerciseName: exercise.name,

      category: exercise.category,

      table2,

      table3,

      table4,

      exerciseSkills: table2.sum,

      keySkills: table3.sum,

      nonKeySkills: table4.sum,

      nonKeyClass:
        table4.sum === 0
          ? "0"
          : table4.sum === 1
            ? "1"
            : table4.sum === 2
              ? "2"
              : "3+",
    };
  });
}

/* =========================================================
   TRAINING ENGINE
========================================================= */

export function calculateTrainingEngine({
  position1,

  position2 = "---",

  position3 = "---",

  initialSkills = {},

  trainingAverage = DEFAULT_TRAINING_AVERAGE,

  desiredOverall = DEFAULT_DESIRED_OVERALL,

  rB = DEFAULT_R_B,

  rC = DEFAULT_R_C,
}) {
  /* =======================================================
     PLAYER TYPE
  ======================================================= */

  const playerType = position1 === "GK" ? "goalkeeper" : "outfield";

  /* =======================================================
     INITIAL SKILLS
  ======================================================= */

  const normalizedInitialSkills = normalizeInitialSkills(
    initialSkills,
    playerType,
  );

  /* =======================================================
     PARAMETERS
  ======================================================= */

  const normalizedParameters = normalizeTrainingParameters({
    trainingAverage,

    desiredOverall,

    rB,

    rC,
  });

  /* =======================================================
     TABLE 1
  ======================================================= */

  const table1 = calculateTable1(position1, position2, position3);

  /* =======================================================
     TABLES 2, 3 AND 4
  ======================================================= */

  const allExercises = analyzeAllExercises({
    table1,

    playerType,
  });

  /* =======================================================
     TABLE 5
     RANKING
  ======================================================= */

  const exerciseRanking = rankExercises(allExercises);

  const rankedExercises = exerciseRanking.rankedExercises;

  /* =======================================================
     ATTRIBUTES
  ======================================================= */

  const attributes = playerType === "goalkeeper" ? goalkeeperSkill : skill;

  /* =======================================================
     BASE DATA FOR TABLES 5, 6 AND 7
  ======================================================= */

  const rankedExercisesBase = rankedExercises.map((exercise) => ({
    ...exercise,

    /* =================================================
           TABLE 5
        ================================================= */

    table5: {
      sum: exercise.exerciseSkills ?? 0,

      values: exercise.table2?.result || {},
    },

    /* =================================================
           TABLE 6
        ================================================= */

    table6: {
      sum: exercise.keySkills ?? 0,

      values: exercise.table3?.result || {},
    },

    /* =================================================
           TABLE 7
        ================================================= */

    table7: {
      sum: exercise.nonKeySkills ?? 0,

      values: exercise.table4?.result || {},
    },

    table14: null,
  }));

  /* =======================================================
     SEQUENTIAL TABLES

     Tabela 14 depende da anterior.
  ======================================================= */

  const table8 = [];

  const table9 = [];

  const table10 = [];

  const table11 = [];

  const table12 = [];

  const table13 = [];

  const table14 = [];

  /* =======================================================
     CURRENT TABLE 14 STATE
  ======================================================= */

  let previousTable14Values = normalizedInitialSkills;

  /* =======================================================
     PROCESS EXERCISES IN TABLE 5 ORDER
  ======================================================= */

  rankedExercisesBase.forEach((exercise) => {
    /* ===================================================
         TABLE 8
      =================================================== */

    const table8Result = calculateTable8(
      [exercise],

      previousTable14Values,

      attributes,
    )[0];

    table8.push(table8Result);

    /* ===================================================
         TABLE 9
      =================================================== */

    const table9Result = calculateTable9(
      table8Result.values,

      exercise.table3?.result || {},

      attributes,
    );

    const currentTable9 = {
      exerciseId: exercise.exerciseId,

      exerciseName: exercise.exerciseName,

      category: exercise.category,

      rank: exercise.rank,

      values: table9Result.values,

      sum: table9Result.sum,

      count: table9Result.count,

      media: table9Result.media,
    };

    table9.push(currentTable9);

    /* ===================================================
         TABLE 10
      =================================================== */

    const table10Result = calculateTable10(
      table8Result.values,

      exercise.table3?.result || {},

      attributes,
    );

    const currentTable10 = {
      exerciseId: exercise.exerciseId,

      exerciseName: exercise.exerciseName,

      category: exercise.category,

      rank: exercise.rank,

      values: table10Result.values,

      sum: table10Result.sum,

      count: table10Result.count,

      media: table10Result.media,
    };

    table10.push(currentTable10);

    /* ===================================================
         PREPARE EXERCISE DATA
      =================================================== */

    const exerciseWithValues = {
      ...exercise,

      table8: table8Result,

      table9: currentTable9,

      table10: currentTable10,
    };

    /* ===================================================
         TABLE 13
      =================================================== */

    const table13Result = calculateTable13({
      rankedExercises: [exerciseWithValues],

      trainingAverage: normalizedParameters.trainingAverage,

      rB: normalizedParameters.rB,
    })[0];

    table13.push(table13Result);

    /* ===================================================
         TABLE 12
      =================================================== */

    const exerciseWithTable13 = {
      ...exerciseWithValues,

      table13: table13Result,
    };

    const table12Result = calculateTable12({
      rankedExercises: [exerciseWithTable13],

      trainingAverage: normalizedParameters.trainingAverage,
    })[0];

    table12.push(table12Result);

    /* ===================================================
         TABLE 11
      =================================================== */

    const table11Result = calculateTable11({
      table12: [table12Result],

      table13: [table13Result],

      attributes,
    })[0];

    table11.push(table11Result);

    /* ===================================================
         TABLE 14
      =================================================== */

    const table14Result = calculateTable14({
      previousValues: previousTable14Values,

      initialSkills: normalizedInitialSkills,

      table11Values: table11Result.values,

      attributes,
    });

    const currentTable14 = {
      exerciseId: exercise.exerciseId,

      exerciseName: exercise.exerciseName,

      category: exercise.category,

      rank: exercise.rank,

      values: table14Result.values,

      sum: table14Result.sum,

      count: table14Result.count,

      media: table14Result.media,
    };

    table14.push(currentTable14);

    /* ===================================================
         PREPARE NEXT EXERCISE
      =================================================== */

    previousTable14Values = currentTable14.values;
  });

  /* =======================================================
     TABLE 16

     Remove da Tabela 12 os exercícios
     cuja MEDIA seja igual a zero.

     Depois cria um novo ranking.
  ======================================================= */

  const table16 = calculateTable16(table12, table14);

  /* =======================================================
     PROPORTIONAL ENGINE

     Agora a referência é a Tabela 16.

     Passamos também as habilidades iniciais
     da Aba 0.
  ======================================================= */

  const proportionalEngine = calculateProportionalEngine({
    table16,

    rankedExercises: rankedExercisesBase,

    desiredOverall: normalizedParameters.desiredOverall,

    attributes,

    initialSkills: normalizedInitialSkills,
  });

  /* =======================================================
     TABLE 15

     Usa a sequência estabelecida pela Tabela 16.
  ======================================================= */

  const table15 = calculateTable15({
    table16,

    desiredOverall: normalizedParameters.desiredOverall,

    proportionalFinalSkills: proportionalEngine.finalSkills,
  });

  /* =======================================================
     TABLE 17

     Tabela 1 = POSIÇÃO GERAL

     Tabela 15 = HABILIDADES DE CADA EXERCÍCIO

     Fórmula:

        T17 = T1 × T15

     Depois calcula a média somente
     dos valores diferentes de zero.

     Essa média representa o
     OVR WHITE.
  ======================================================= */

  const table17 = calculateTable17({
    table1,

    table15,

    attributes,
  });

  /* =======================================================
     ATTACH TABLES TO RANKED EXERCISES
  ======================================================= */

  const rankedExercisesFinal = rankedExercisesBase.map((exercise) => {
    const exerciseTable8 = table8.find(
      (item) => item.exerciseId === exercise.exerciseId,
    );

    const exerciseTable9 = table9.find(
      (item) => item.exerciseId === exercise.exerciseId,
    );

    const exerciseTable10 = table10.find(
      (item) => item.exerciseId === exercise.exerciseId,
    );

    const exerciseTable11 = table11.find(
      (item) => item.exerciseId === exercise.exerciseId,
    );

    const exerciseTable12 = table12.find(
      (item) => item.exerciseId === exercise.exerciseId,
    );

    const exerciseTable13 = table13.find(
      (item) => item.exerciseId === exercise.exerciseId,
    );

    const exerciseTable14 = table14.find(
      (item) => item.exerciseId === exercise.exerciseId,
    );

    const exerciseTable15 = table15.find(
      (item) => item.exerciseId === exercise.exerciseId,
    );

    const exerciseTable16 = table16.find(
      (item) => item.exerciseId === exercise.exerciseId,
    );

    const exerciseTable17 = table17.find(
      (item) => item.exerciseId === exercise.exerciseId,
    );

    return {
      ...exercise,

      table8: exerciseTable8,

      table9: exerciseTable9,

      table10: exerciseTable10,

      table11: exerciseTable11,

      table12: exerciseTable12,

      table13: exerciseTable13,

      table14: exerciseTable14,

      table15: exerciseTable15,

      table16: exerciseTable16,

      table17: exerciseTable17,
    };
  });

  /* =======================================================
     NON-KEY GROUPS
  ======================================================= */

  const nonKeyGroups = {
    zero: [],

    one: [],

    two: [],

    threeOrMore: [],
  };

  allExercises.forEach((exercise) => {
    if (exercise.nonKeySkills === 0) {
      nonKeyGroups.zero.push(exercise);

      return;
    }

    if (exercise.nonKeySkills === 1) {
      nonKeyGroups.one.push(exercise);

      return;
    }

    if (exercise.nonKeySkills === 2) {
      nonKeyGroups.two.push(exercise);

      return;
    }

    nonKeyGroups.threeOrMore.push(exercise);
  });

  /* =======================================================
     RETURN
  ======================================================= */

  return {
    /* =====================================================
       INPUT
    ===================================================== */

    input: {
      position1,

      position2,

      position3,

      initialSkills: normalizedInitialSkills,

      trainingAverage: normalizedParameters.trainingAverage,

      desiredOverall: normalizedParameters.desiredOverall,

      rB: normalizedParameters.rB,

      rC: normalizedParameters.rC,
    },

    /* =====================================================
       PLAYER TYPE
    ===================================================== */

    playerType,

    /* =====================================================
       INITIAL SKILLS
    ===================================================== */

    initialSkills: normalizedInitialSkills,

    /* =====================================================
       PARAMETERS
    ===================================================== */

    trainingAverage: normalizedParameters.trainingAverage,

    desiredOverall: normalizedParameters.desiredOverall,

    rB: normalizedParameters.rB,

    rC: normalizedParameters.rC,

    /* =====================================================
       TABLE 1
    ===================================================== */

    table1,

    /* =====================================================
       ORIGINAL EXERCISES
    ===================================================== */

    allExercises,

    /* =====================================================
       RANKING
    ===================================================== */

    exerciseRanking: {
      ...exerciseRanking,

      rankedExercises: rankedExercisesFinal,
    },

    /* =====================================================
       TABLES
    ===================================================== */

    table8,

    table9,

    table10,

    table11,

    table12,

    table13,

    table14,

    table15,

    table16,

    table17,

    /* =====================================================
       PROPORTIONAL ENGINE
    ===================================================== */

    proportionalEngine,

    /* =====================================================
       GROUPS
    ===================================================== */

    nonKeyGroups,

    /* =====================================================
       FUTURE
    ===================================================== */

    table17Result: table17,
  };
}

export default calculateTrainingEngine;
