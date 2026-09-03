/* =========================================================
   TABLE 16

   1. Usa a Tabela 12 para descobrir quais exercícios
      permanecem (MEDIA > 0).

   2. Usa a Tabela 14 para buscar os VALUES e a MEDIA
      correspondentes a cada exercício.

   3. Cria um novo RANK para os exercícios restantes.

   IMPORTANTE:

   A Tabela 16 NÃO recalcula MEDIA.

   VALUES = Tabela 14, arredondados para inteiros
   MEDIA  = Tabela 14
========================================================= */

/* =========================================================
   FORMAT VALUES AS INTEGER
========================================================= */

function formatValuesAsInteger(values = {}) {
  return Object.fromEntries(
    Object.entries(values).map(([attribute, value]) => {
      const numericValue = Number(value);

      return [
        attribute,
        Number.isFinite(numericValue) ? Math.round(numericValue) : 0,
      ];
    }),
  );
}

/* =========================================================
   CALCULATE TABLE 16
========================================================= */

export default function calculateTable16(table12 = [], table14 = []) {
  /* =======================================================
     VALIDATION
  ======================================================= */

  if (!Array.isArray(table12) || !Array.isArray(table14)) {
    return [];
  }

  /* =======================================================
     MAP TABLE 14 BY EXERCISE ID

     Facilita encontrar rapidamente os
     VALUES e MEDIA do exercício.
  ======================================================= */

  const table14Map = new Map(
    table14.map((exercise) => [exercise.exerciseId, exercise]),
  );

  /* =======================================================
     FILTER TABLE 12

     Mantém somente exercícios cuja
     MEDIA seja maior que zero.

     A ordem original da Tabela 12
     é preservada.
  ======================================================= */

  const validExercises = table12.filter((exercise) => {
    const media = Number(exercise?.media);

    return Number.isFinite(media) && media > 0;
  });

  /* =======================================================
     BUILD TABLE 16

     Para cada exercício:

     - mantém os dados de identificação;
     - busca VALUES na Tabela 14;
     - transforma VALUES em inteiros;
     - mantém MEDIA exatamente da Tabela 14;
     - cria novo RANK.
  ======================================================= */

  return validExercises.map((exercise, index) => {
    const table14Exercise = table14Map.get(exercise.exerciseId);

    /* ===============================================
         Caso o exercício exista na T14
      =============================================== */

    if (table14Exercise) {
      return {
        ...exercise,

        rank: index + 1,

        values: formatValuesAsInteger(table14Exercise.values),

        media: table14Exercise.media,
      };
    }

    /* ===============================================
         Fallback

         Em caso de inconsistência de dados,
         mantém o exercício original da T12.

         Se houver VALUES, também os
         normaliza para inteiros.
      =============================================== */

    return {
      ...exercise,

      rank: index + 1,

      values: formatValuesAsInteger(exercise.values),
    };
  });
}
