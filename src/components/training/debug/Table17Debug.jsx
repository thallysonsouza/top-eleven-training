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
    .map((value) => Number(value).toFixed(2))
    .join(" ");
}

/* =========================================================
   FORMAT MEDIA
========================================================= */

function formatMedia(media) {
  const numericMedia = Number(media);

  if (!Number.isFinite(numericMedia)) {
    return "0.00";
  }

  return numericMedia.toFixed(2);
}

/* =========================================================
   COMPONENT
========================================================= */

function Table17Debug({ table17 = [], playerType }) {
  const playerTypeLabel =
    playerType === "goalkeeper" ? "GOALKEEPER" : "OUTFIELD";

  /* =======================================================
     EXERCISE GROUPS

     Mesmo padrão das demais tabelas:
       10 / 10 / 9
  ======================================================= */

  const exerciseGroups = [
    table17.slice(0, 10),
    table17.slice(10, 20),
    table17.slice(20, 29),
  ];

  return (
    <section className="training-engine-table">
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="training-engine-table-header">
        <div>
          <small>TABLE 17</small>

          <h2>White Overall</h2>
        </div>
      </div>

      {/* ==================================================
          PLAYER TYPE
      ================================================== */}

      <div className="training-engine-table-type">
        <span>PLAYER TYPE</span>

        <strong>{playerTypeLabel}</strong>
      </div>

      {/* ==================================================
          EXERCISE TABLE
      ================================================== */}

      <div className="training-engine-exercise-table">
        {exerciseGroups.map((group, groupIndex) => (
          <div className="training-engine-exercise-column" key={groupIndex}>
            {/* ==========================================
                  COLUMN HEADER
              ========================================== */}

            <div className="training-engine-exercise-column-header">
              <span>EXERCISE</span>

              <span>VALUES</span>

              <span>OVR WHITE</span>
            </div>

            {/* ==========================================
                  COLUMN LIST
              ========================================== */}

            <div className="training-engine-exercise-column-list">
              {group.map((exercise) => {
                const categoryClass =
                  CATEGORY_CONFIG[exercise.category]?.className || "";

                return (
                  <div
                    className="training-engine-exercise-column-row"
                    key={exercise.exerciseId}
                  >
                    {/* =================================
                            EXERCISE NAME
                        ================================= */}

                    <div
                      className={`training-engine-exercise-column-name ${categoryClass}`}
                    >
                      <span>{exercise.exerciseName}</span>
                    </div>

                    {/* =================================
                            VALUES
                        ================================= */}

                    <div className="training-engine-exercise-column-binary">
                      {formatValues(exercise.values)}
                    </div>

                    {/* =================================
                            OVR WHITE
                        ================================= */}

                    <div className="training-engine-exercise-column-sum">
                      {formatMedia(exercise.media)}
                    </div>
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

export default Table17Debug;
