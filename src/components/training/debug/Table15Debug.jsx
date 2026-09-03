import "./TrainingTable.css";
import "./Table2Debug.css";

/* =========================================================
   CATEGORY CONFIG
========================================================= */

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

/* =========================================================
   FORMAT VALUES
========================================================= */

function formatValues(values) {
  if (!values) {
    return "---------------";
  }

  return Object.values(values)
    .map((value) => Number(value).toFixed(0))
    .join(" ");
}

/* =========================================================
   COMPONENT
========================================================= */

function Table15Debug({ table15 = [], playerType }) {
  const playerTypeLabel =
    playerType === "goalkeeper" ? "GOALKEEPER" : "OUTFIELD";

  /* =======================================================
     TABLE 15 IS ALREADY IN TABLE 5 ORDER

     The table contains only the exercises necessary
     to reach the desired OVR.
  ======================================================= */

  const exerciseGroups = [
    table15.slice(0, 10),

    table15.slice(10, 20),

    table15.slice(20, 29),
  ];

  return (
    <section className="training-engine-table">
      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="training-engine-table-header">
        <div>
          <small>TABLE 15</small>

          <h2>Values</h2>

          <p>Training sequence up to the desired overall value.</p>
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

              <span>VALUES</span>

              <span>MEDIA</span>
            </div>

            {/* =========================
                    EXERCISES
                ========================= */}

            <div className="training-engine-exercise-column-list">
              {exerciseGroup.map((exercise, index) => {
                const categoryClass =
                  CATEGORY_CONFIG[exercise.category]?.className || "defense";

                const displayRank =
                  exercise.rank ?? groupIndex * 10 + index + 1;

                return (
                  <div
                    className="training-engine-exercise-column-row"
                    key={exercise.exerciseId}
                  >
                    {/* =========================
                                EXERCISE
                            ========================= */}

                    <div
                      className={`training-engine-exercise-column-name ${categoryClass}`}
                    >
                      <span className="training-engine-exercise-column-number">
                        {String(displayRank).padStart(2, "0")}
                      </span>

                      <span title={exercise.exerciseName}>
                        {exercise.exerciseName}
                      </span>
                    </div>

                    {/* =========================
                                VALUES
                            ========================= */}

                    <strong
                      className="training-engine-exercise-column-binary"
                      title={formatValues(exercise.values)}
                    >
                      {formatValues(exercise.values)}
                    </strong>

                    {/* =========================
                                MEDIA
                            ========================= */}

                    <strong className="training-engine-exercise-column-sum">
                      {(
                        Object.values(exercise.values || {}).reduce(
                          (sum, value) => sum + Number(value || 0),
                          0,
                        ) / 15
                      ).toFixed(1)}
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

export default Table15Debug;
