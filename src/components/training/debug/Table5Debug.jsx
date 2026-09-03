import "./TrainingTable.css";
import "./Table2Debug.css";

/* =========================================================
   COMPONENT
========================================================= */

function Table5Debug({ rankedExercises = [], playerType }) {
  const playerTypeLabel =
    playerType === "goalkeeper" ? "GOALKEEPER" : "OUTFIELD";

  /* =======================================================
     GROUPS
  ======================================================= */

  const exerciseGroups = [
    rankedExercises.slice(0, 10),
    rankedExercises.slice(10, 20),
    rankedExercises.slice(20, 29),
  ];

  return (
    <section className="training-engine-table">
      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="training-engine-table-header">
        <div>
          <small>TABLE 5</small>

          <h2>Exercise Ranking</h2>

          <p>Exercises ordered according to the training priority.</p>
        </div>

        <div className="training-engine-table-type">
          <span>PLAYER TYPE</span>

          <strong>{playerTypeLabel}</strong>
        </div>
      </header>

      {/* ==================================================
          EXERCISE GRID
      ================================================== */}

      <div className="training-engine-exercise-table">
        {exerciseGroups.map((exerciseGroup, groupIndex) => (
          <div className="training-engine-exercise-column" key={groupIndex}>
            {/* =========================
                  COLUMN HEADER
              ========================= */}

            <div className="training-engine-exercise-column-header">
              <span>EXERCISE</span>

              <span>EXERCISE SKILLS</span>

              <span>SUM</span>
            </div>

            {/* =========================
                  EXERCISES
              ========================= */}

            <div className="training-engine-exercise-column-list">
              {exerciseGroup.map((exercise) => {
                const categoryClass = exercise.category || "defense";

                return (
                  <div
                    className="training-engine-exercise-column-row"
                    key={exercise.exerciseId}
                  >
                    {/* =========================
                            NAME
                        ========================= */}

                    <div
                      className={`training-engine-exercise-column-name ${categoryClass}`}
                    >
                      <span className="training-engine-exercise-column-number">
                        {String(exercise.rank).padStart(2, "0")}
                      </span>

                      <span title={exercise.exerciseName}>
                        {exercise.exerciseName}
                      </span>
                    </div>

                    {/* =========================
                            EXERCISE SKILLS
                        ========================= */}

                    <strong className="training-engine-exercise-column-binary">
                      {exercise.table2?.binary || "---------------"}
                    </strong>

                    {/* =========================
                            SUM
                        ========================= */}

                    <strong className="training-engine-exercise-column-sum">
                      {exercise.table2?.sum ?? 0}
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

export default Table5Debug;
