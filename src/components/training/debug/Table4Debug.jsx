import "./TrainingTable.css";
import "./Table2Debug.css";

const CATEGORY_CONFIG = {
  attack: {
    className: "attack",
  },

  defense: {
    className: "defense",
  },

  possession: {
    className: "possession",
  },

  fitness: {
    className: "fitness",
  },
};

function Table4Debug({ allExercises = [], playerType }) {
  const playerTypeLabel =
    playerType === "goalkeeper" ? "GOALKEEPER" : "OUTFIELD";

  const exerciseGroups = [
    allExercises.slice(0, 10),
    allExercises.slice(10, 20),
    allExercises.slice(20, 29),
  ];

  return (
    <section className="training-engine-table">
      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="training-engine-table-header">
        <div>
          <small>TABLE 4</small>

          <h2>Non-Key Skills</h2>

          <p>
            NOT Table 1 AND Table 2 — non-key skills trained by each exercise.
          </p>
        </div>

        <div className="training-engine-table-type">
          <span>PLAYER TYPE</span>

          <strong>{playerTypeLabel}</strong>
        </div>
      </header>

      {/* ==================================================
          EXERCISES
      ================================================== */}

      <div className="training-engine-exercise-table">
        {exerciseGroups.map((exerciseGroup, groupIndex) => (
          <div className="training-engine-exercise-column" key={groupIndex}>
            {/* =========================
                  COLUMN HEADER
              ========================= */}

            <div className="training-engine-exercise-column-header">
              <span>EXERCISE</span>

              <span>NON-KEY SKILLS</span>

              <span>SUM</span>
            </div>

            {/* =========================
                  EXERCISES
              ========================= */}

            <div className="training-engine-exercise-column-list">
              {exerciseGroup.map((exercise, index) => {
                const globalIndex = groupIndex * 10 + index;

                const category =
                  CATEGORY_CONFIG[exercise.category] || CATEGORY_CONFIG.defense;

                return (
                  <div
                    className="training-engine-exercise-column-row"
                    key={exercise.exerciseId}
                  >
                    {/* =========================
                            EXERCISE NAME
                        ========================= */}

                    <div
                      className={`training-engine-exercise-column-name ${category.className}`}
                    >
                      <span className="training-engine-exercise-column-number">
                        {String(globalIndex + 1).padStart(2, "0")}
                      </span>

                      <span title={exercise.exerciseName}>
                        {exercise.exerciseName}
                      </span>
                    </div>

                    {/* =========================
                            NON-KEY SKILLS
                        ========================= */}

                    <strong className="training-engine-exercise-column-binary">
                      {exercise.table4?.binary || "---------------"}
                    </strong>

                    {/* =========================
                            SUM
                        ========================= */}

                    <strong className="training-engine-exercise-column-sum">
                      {exercise.table4?.sum ?? 0}
                    </strong>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Table4Debug;
