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

function formatValues(values) {
  if (!values) {
    return "---------------";
  }

  return Object.values(values)
    .map((value) => Number(value).toFixed(0))
    .join(" ");
}

function Table8Debug({ table8 = [], playerType }) {
  const playerTypeLabel =
    playerType === "goalkeeper" ? "GOALKEEPER" : "OUTFIELD";

  const exerciseGroups = [
    table8.slice(0, 10),

    table8.slice(10, 20),

    table8.slice(20, 29),
  ];

  return (
    <section className="training-engine-table">
      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="training-engine-table-header">
        <div>
          <small>TABLE 8</small>

          <h2>Values</h2>

          <p>
            Applies the ranked Exercise Skills to the reference values from
            Initial Skills and Table 14.
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

              <span>VALUES</span>

              <span>MEDIA</span>
            </div>

            {/* =========================
                  EXERCISES
              ========================= */}

            <div className="training-engine-exercise-column-list">
              {exerciseGroup.map((exercise) => {
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
                        {String(exercise.rank).padStart(2, "0")}
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
                      {Number(exercise.media ?? 0).toFixed(1)}
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

export default Table8Debug;
