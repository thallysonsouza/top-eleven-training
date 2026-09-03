import { ChevronDown, RotateCcw, Target } from "lucide-react";

import { useTrainingSimulator } from "../../../context/TrainingSimulatorContext";

import "./TrainingConfiguration.css";

/* ==================================================
   COMPONENT
================================================== */

function TrainingConfiguration() {
  const {
    selectedExercise,

    selectExercise,

    trainingTable15,

    trainingAverage,
    desiredOverall,

    updateTrainingConfiguration,

    resetTrainingSimulator,
  } = useTrainingSimulator();

  /* ==================================================
     CURRENT EXERCISE
  ================================================== */

  const currentExercise =
    trainingTable15.find(
      (exercise) => exercise.exerciseId === selectedExercise,
    ) || null;

  /* ==================================================
     SELECT EXERCISE
  ================================================== */

  function handleExerciseChange(event) {
    const exerciseId = event.target.value;

    selectExercise(exerciseId);
  }

  /* ==================================================
     TRAINING AVERAGE
  ================================================== */

  function handleTrainingAverageChange(event) {
    updateTrainingConfiguration({
      trainingAverage: event.target.value,
    });
  }

  /* ==================================================
     DESIRED OVR
  ================================================== */

  function handleDesiredOverallChange(event) {
    updateTrainingConfiguration({
      desiredOverall: event.target.value,
    });
  }

  /* ==================================================
     RESET
  ================================================== */

  function handleReset() {
    resetTrainingSimulator();
  }

  return (
    <section className="training-configuration">
      {/* =========================
          HEADER
      ========================= */}

      <div className="training-configuration-header">
        <div className="training-configuration-title">
          <div className="training-configuration-icon">
            <Target size={18} />
          </div>

          <div>
            <small>TRAINING CONFIGURATION</small>

            <h2>Exercise Settings</h2>
          </div>
        </div>

        <button
          type="button"
          className="training-configuration-reset"
          onClick={handleReset}
          title="Reset configuration"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* =========================
          CONFIGURATION ROW
      ========================= */}

      <div className="training-configuration-row">
        {/* EXERCISE */}

        <div className="training-configuration-field exercise">
          <label htmlFor="training-exercise">Exercise</label>

          <div className="training-configuration-select">
            <select
              id="training-exercise"
              value={selectedExercise || ""}
              onChange={handleExerciseChange}
              disabled={trainingTable15.length === 0}
            >
              {trainingTable15.length === 0 ? (
                <option value="">No exercises available</option>
              ) : (
                trainingTable15.map((exercise) => (
                  <option key={exercise.exerciseId} value={exercise.exerciseId}>
                    {String(exercise.rank).padStart(2, "0")} —{" "}
                    {exercise.exerciseName}
                  </option>
                ))
              )}
            </select>

            <ChevronDown size={15} />
          </div>
        </div>

        {/* TRAINING AVERAGE */}

        <div className="training-configuration-field average">
          <label htmlFor="training-average">Training Average</label>

          <div className="training-configuration-input">
            <input
              id="training-average"
              type="number"
              min="1"
              max="999"
              step="1"
              value={trainingAverage}
              onChange={handleTrainingAverageChange}
            />

            <span>AVG</span>
          </div>
        </div>

        {/* DESIRED OVR */}

        <div className="training-configuration-field overall">
          <label htmlFor="training-overall">Desired OVR</label>

          <div className="training-configuration-input">
            <input
              id="training-overall"
              type="number"
              min="1"
              max="250"
              step="1"
              value={desiredOverall}
              onChange={handleDesiredOverallChange}
            />

            <span>OVR</span>
          </div>
        </div>
      </div>

      {/* =========================
          SELECTED EXERCISE INFO
      ========================= */}

      <div className="training-configuration-info">
        <span>SELECTED EXERCISE</span>

        <strong>
          {currentExercise
            ? `${String(currentExercise.rank).padStart(2, "0")} — ${
                currentExercise.exerciseName
              }`
            : "—"}
        </strong>
      </div>
    </section>
  );
}

export default TrainingConfiguration;
