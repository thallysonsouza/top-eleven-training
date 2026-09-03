import "./TrainingTable.css";
import "./Table2Debug.css";

import { Dumbbell, Shield, Swords, CircleDot } from "lucide-react";

/* =========================================================
   CATEGORY CONFIGURATION
========================================================= */

const CATEGORY_CONFIG = {
  attack: {
    label: "ATTACK",
    className: "attack",
    icon: Swords,
  },

  defense: {
    label: "DEFENSE",
    className: "defense",
    icon: Shield,
  },

  possession: {
    label: "POSSESSION",
    className: "possession",
    icon: CircleDot,
  },

  fitness: {
    label: "PHYSICAL",
    className: "fitness",
    icon: Dumbbell,
  },
};

/* =========================================================
   COMPONENT
========================================================= */

function Table2Debug({ allExercises = [], playerType }) {
  const playerTypeLabel =
    playerType === "goalkeeper" ? "GOALKEEPER" : "OUTFIELD";

  /* =======================================================
     EXERCISE GROUPS
  ======================================================= */

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
          <small>TABLE 2</small>

          <h2>Exercise Skills</h2>

          <p>Identifies the skills trained by each exercise.</p>
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
              {exerciseGroup.map((exercise, index) => {
                const globalIndex = groupIndex * 10 + index;

                const category =
                  CATEGORY_CONFIG[exercise.category] || CATEGORY_CONFIG.defense;

                const CategoryIcon = category.icon;

                return (
                  <div
                    className="training-engine-exercise-column-row"
                    key={exercise.exerciseId}
                  >
                    {/* =========================
                            EXERCISE
                        ========================= */}

                    <div
                      className={`training-engine-exercise-column-name ${category.className}`}
                    >
                      <span className="training-engine-exercise-column-number">
                        {String(globalIndex + 1).padStart(2, "0")}
                      </span>

                      <span className="training-engine-exercise-column-icon">
                        <CategoryIcon size={12} />
                      </span>

                      <span
                        title={`${category.label} — ${exercise.exerciseName}`}
                      >
                        {exercise.exerciseName}
                      </span>
                    </div>

                    {/* =========================
                            BINARY
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

export default Table2Debug;
