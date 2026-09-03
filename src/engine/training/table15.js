/* =========================================================
   TABLE 15

   A Tabela 16 define a sequência completa dos exercícios.

   A Tabela 15 mostra somente a sequência necessária
   para chegar ao DESIRED OVERALL.

   Exemplo:

      T16:
      40 → 45 → 51 → 58 → 66 → 75 → 86 → 98 → 112 → ...

      DESIRED OVERALL = 100

      T15:
      40 → 45 → 51 → 58 → 66 → 75 → 86 → 98 → 100

   O último exercício da sequência é o exercício seguinte
   ao último OVR abaixo do desejado e pode receber os
   valores proporcionais calculados pelo proportional engine.
========================================================= */

/* =========================================================
   CALCULATE OVERALL
========================================================= */

export function calculateOverall(values) {
  if (!values) {
    return 0;
  }

  const valuesArray = Object.values(values);

  if (valuesArray.length === 0) {
    return 0;
  }

  const sum = valuesArray.reduce(
    (total, value) => total + Number(value || 0),
    0,
  );

  return sum / valuesArray.length;
}

/* =========================================================
   FIND LAST EXERCISE

   Procura na Tabela 16 o primeiro exercício
   cujo OVR seja >= DESIRED OVERALL.

   A Tabela 16 já está na ordem correta.
========================================================= */

function findLastExerciseIndex({ table16, desiredOverall }) {
  if (!Array.isArray(table16) || table16.length === 0) {
    return -1;
  }

  const desired = Number(desiredOverall);

  const index = table16.findIndex((exercise) => {
    const overall = calculateOverall(exercise.values);

    return overall >= desired;
  });

  /* =======================================================
     Se nenhum exercício atingir o desejado,
     usamos o último exercício disponível.
  ======================================================= */

  if (index === -1) {
    return table16.length - 1;
  }

  return index;
}

/* =========================================================
   CALCULATE TABLE 15
========================================================= */

export default function calculateTable15({
  table16 = [],
  desiredOverall = 100,
  proportionalFinalSkills = null,
}) {
  /* =======================================================
     VALIDATION
  ======================================================= */

  if (!Array.isArray(table16) || table16.length === 0) {
    return [];
  }

  /* =======================================================
     FIND LAST EXERCISE

     A referência agora é a TABELA 16.
  ======================================================= */

  const lastIndex = findLastExerciseIndex({
    table16,

    desiredOverall,
  });

  if (lastIndex < 0) {
    return [];
  }

  /* =======================================================
     CREATE TABLE 15
  ======================================================= */

  return table16.slice(0, lastIndex + 1).map((exercise, index) => {
    const isLast = index === lastIndex;

    let values = exercise.values;

    /* ================================================
           ÚLTIMO EXERCÍCIO

           Quando o proportional engine fornecer
           as habilidades finais, substituímos somente
           os VALUES do último exercício.

           O exercício continua sendo o da Tabela 16.
        ================================================= */

    if (isLast && proportionalFinalSkills) {
      values = proportionalFinalSkills;
    }

    /* ================================================
           MEDIA / OVR

           Média das 15 habilidades.
        ================================================= */

    const media = calculateOverall(values);

    return {
      ...exercise,

      /* Novo rank da T15 */

      rank: index + 1,

      /* Valores */

      values,

      /* Média */

      media,
    };
  });
}
