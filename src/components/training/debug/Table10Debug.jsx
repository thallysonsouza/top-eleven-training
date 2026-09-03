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

function Table10Debug({ table10 = [], playerType }) {
  const playerTypeLabel =
    playerType === "goalkeeper" ? "GOALKEEPER" : "OUTFIELD";

  const exerciseGroups = [
    table10.slice(0, 10),
    table10.slice(10, 20),
    table10.slice(20, 29),
  ];

  return (
    <section className="training-engine-table">
      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="training-engine-table-header">
        <div>
          <small>TABLE 10</small>

          <h2>Non-Key Values</h2>

          <p>Extracts the non-key skill values from Table 8.</p>
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
            <div className="training-engine-exercise-column-header">
              <span>EXERCISE</span>

              <span>NON-KEY VALUES</span>

              <span>MEDIA</span>
            </div>

            <div className="training-engine-exercise-column-list">
              {exerciseGroup.map((exercise) => {
                const categoryClass =
                  CATEGORY_CONFIG[exercise.category]?.className || "defense";

                return (
                  <div
                    className="training-engine-exercise-column-row"
                    key={exercise.exerciseId}
                  >
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

                    <strong
                      className="training-engine-exercise-column-binary"
                      title={formatValues(exercise.values)}
                    >
                      {formatValues(exercise.values)}
                    </strong>

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

export default Table10Debug;
