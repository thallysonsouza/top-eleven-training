import { useNavigate } from "react-router-dom";

import { useTrainingSimulator } from "../../../context/TrainingSimulatorContext";

import TrainingPlayerSelection from "../player/TrainingPlayerSelection";

import TrainingConfiguration from "../configuration/TrainingConfiguration";

import TrainingFinalSkills from "../result/TrainingFinalSkills";

import "./TrainingSimulatorContent.css";

/* =========================================================
   COMPONENT
========================================================= */

function TrainingSimulatorContent() {
  const navigate = useNavigate();

  const { selectedPlayer } = useTrainingSimulator();

  /* ========================================================
     OPEN ENGINE DEBUG
  ======================================================== */

  function openEngineDebug() {
    if (!selectedPlayer) {
      return;
    }

    navigate("/app/training/debug");
  }

  return (
    <main className="training-simulator-content">
      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="training-simulator-content-header">
        <div>
          <small>TRAINING SIMULATOR</small>

          <h1>Player Training Analysis</h1>

          <p>
            Configure a training session and simulate your player's development.
          </p>
        </div>
      </header>

      {/* ==================================================
          ENGINE DEBUG ACCESS
      ================================================== */}

      <div className="training-engine-debug-area">
        <button
          type="button"
          onClick={openEngineDebug}
          disabled={!selectedPlayer}
          className="training-engine-debug-button"
        >
          🔧 ABRIR DEBUG DO ENGINE
        </button>
      </div>

      {/* ==================================================
          PLAYER + CONFIGURATION
      ================================================== */}

      <section className="training-simulator-content-top">
        <TrainingPlayerSelection />

        <TrainingConfiguration />
      </section>

      {/* ==================================================
          FINAL SKILLS
      ================================================== */}

      <TrainingFinalSkills />
    </main>
  );
}

export default TrainingSimulatorContent;
