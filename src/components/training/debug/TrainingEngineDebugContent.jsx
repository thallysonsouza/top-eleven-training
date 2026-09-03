import { useMemo, useState } from "react";

import { useTrainingSimulator } from "../../../context/TrainingSimulatorContext";

import EngineInputsDebug from "./EngineInputsDebug";

import Table1Debug from "./Table1Debug";
import Table2Debug from "./Table2Debug";
import Table3Debug from "./Table3Debug";
import Table4Debug from "./Table4Debug";
import Table5Debug from "./Table5Debug";
import Table6Debug from "./Table6Debug";
import Table7Debug from "./Table7Debug";
import Table8Debug from "./Table8Debug";
import Table9Debug from "./Table9Debug";
import Table10Debug from "./Table10Debug";
import Table11Debug from "./Table11Debug";
import Table12Debug from "./Table12Debug";
import Table13Debug from "./Table13Debug";
import Table14Debug from "./Table14Debug";
import Table15Debug from "./Table15Debug";
import Table16Debug from "./Table16Debug";
import Table17Debug from "./Table17Debug";

import skill from "../../../constants/skill";
import goalkeeperSkill from "../../../constants/goalkeeperSkill";

import calculateTrainingEngine from "../../../engine/training/trainingEngine";

import "./TrainingEngineDebugContent.css";

/* =========================================================
   DEFAULT VALUES
========================================================= */

const DEFAULT_TRAINING_AVERAGE = 140;

const DEFAULT_DESIRED_OVERALL = 100;

const DEFAULT_R_B = 2;

const DEFAULT_R_C = 1;

/* =========================================================
   GET PLAYER TYPE
========================================================= */

function getPlayerType(position1) {
  return position1 === "GK" ? "goalkeeper" : "outfield";
}

/* =========================================================
   GET PLAYER ATTRIBUTES
========================================================= */

function getAttributes(playerType) {
  return playerType === "goalkeeper" ? goalkeeperSkill : skill;
}

/* =========================================================
   GET PLAYER SKILLS
========================================================= */

function getPlayerSkills(player) {
  const playerType = getPlayerType(player?.position1);

  const attributes = getAttributes(playerType);

  return Object.fromEntries(
    attributes.map((attribute) => {
      const value = Number(player?.skills?.[attribute]);

      return [attribute, Number.isFinite(value) ? value : 40];
    }),
  );
}

/* =========================================================
   COMPONENT
========================================================= */

function TrainingEngineDebugContent() {
  /* =======================================================
     SHARED CONTEXT

     O mesmo Provider está acima
     de Simulator e Debug.
  ======================================================= */

  const {
    selectedPlayer,

    initialSkills,

    trainingAverage,

    desiredOverall,
  } = useTrainingSimulator();

  console.log("[DEBUG] selectedPlayer recebido do Context:", selectedPlayer);

  /* =======================================================
     ACTIVE TABLE
  ======================================================= */

  const [activeTable, setActiveTable] = useState(0);

  /* =======================================================
     NO PLAYER
  ======================================================= */

  const hasPlayer = Boolean(selectedPlayer);

  /* =======================================================
     PLAYER DATA
  ======================================================= */

  const position1 = selectedPlayer?.position1 || "---";

  const position2 = selectedPlayer?.position2 || "---";

  const position3 = selectedPlayer?.position3 || "---";

  const playerType = getPlayerType(position1);

  const attributes = getAttributes(playerType);

  /* =======================================================
     INITIAL SKILLS

     Prioridade:

     1. selectedPlayer
     2. initialSkills do Context
  ======================================================= */

  const currentInitialSkills = useMemo(() => {
    if (selectedPlayer) {
      return getPlayerSkills(selectedPlayer);
    }

    return initialSkills || {};
  }, [selectedPlayer, initialSkills]);

  /* =======================================================
     TRAINING ENGINE

     A engine é recalculada automaticamente
     sempre que o jogador ou os parâmetros
     forem alterados.
  ======================================================= */

  const engine = useMemo(() => {
    if (!selectedPlayer) {
      return null;
    }

    return calculateTrainingEngine({
      position1,

      position2,

      position3,

      initialSkills: currentInitialSkills,

      trainingAverage: trainingAverage ?? DEFAULT_TRAINING_AVERAGE,

      desiredOverall: desiredOverall ?? DEFAULT_DESIRED_OVERALL,

      rB: DEFAULT_R_B,

      rC: DEFAULT_R_C,
    });
  }, [
    selectedPlayer,

    position1,
    position2,
    position3,

    currentInitialSkills,

    trainingAverage,
    desiredOverall,
  ]);

  /* =======================================================
     EMPTY STATE
  ======================================================= */

  if (!hasPlayer) {
    return (
      <main className="training-engine-debug">
        <header className="training-engine-debug-header">
          <div>
            <small>TRAINING ENGINE</small>

            <h1>Engine Debug</h1>

            <p>
              Select a player in the Training Simulator to populate the engine.
            </p>
          </div>
        </header>

        <section className="training-engine-debug-content">
          <div className="training-engine-debug-placeholder">
            <span>TABLE 0</span>

            <h2>No Player Selected</h2>

            <p>
              Select a player in the Training Simulator. The player's positions
              and initial skills will automatically appear here.
            </p>
          </div>
        </section>
      </main>
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="training-engine-debug">
      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="training-engine-debug-header">
        <div>
          <small>TRAINING ENGINE</small>

          <h1>Engine Debug</h1>

          <p>Development environment for validating the training engine.</p>
        </div>

        {/* ================================================
            SELECTED PLAYER
        ================================================ */}

        <div className="training-engine-debug-player">
          <span>SELECTED PLAYER</span>

          <strong>{selectedPlayer.name}</strong>
        </div>
      </header>

      {/* ==================================================
          TABLE NAVIGATION
      ================================================== */}

      <nav className="training-engine-debug-navigation">
        {Array.from({ length: 18 }, (_, index) => (
          <button
            key={index}
            type="button"
            className={activeTable === index ? "active" : ""}
            onClick={() => setActiveTable(index)}
          >
            {index}
          </button>
        ))}
      </nav>

      {/* ==================================================
          TABLE CONTENT
      ================================================== */}

      <section className="training-engine-debug-content">
        {/* =================================================
            TABLE 0
        ================================================= */}

        {activeTable === 0 && (
          <EngineInputsDebug
            position1={position1}
            position2Value={position2}
            position3Value={position3}
            initialSkills={currentInitialSkills}
            trainingAverage={trainingAverage}
            desiredOverall={desiredOverall}
            rB={DEFAULT_R_B}
            rC={DEFAULT_R_C}
            onPosition1Change={() => {}}
            onPosition2Change={() => {}}
            onPosition3Change={() => {}}
            onInitialSkillChange={() => {}}
            onTrainingAverageChange={() => {}}
            onDesiredOverallChange={() => {}}
            onReset={() => {
              setActiveTable(0);
            }}
          />
        )}

        {/* =================================================
            TABLE 1
        ================================================= */}

        {activeTable === 1 && (
          <Table1Debug
            position1={position1}
            position2={position2}
            position3={position3}
          />
        )}

        {/* =================================================
            TABLE 2
        ================================================= */}

        {activeTable === 2 && (
          <Table2Debug
            playerType={engine?.playerType || playerType}
            allExercises={engine?.allExercises || []}
          />
        )}

        {/* =================================================
            TABLE 3
        ================================================= */}

        {activeTable === 3 && (
          <Table3Debug
            allExercises={engine?.allExercises || []}
            playerType={engine?.playerType || playerType}
          />
        )}

        {/* =================================================
            TABLE 4
        ================================================= */}

        {activeTable === 4 && (
          <Table4Debug
            allExercises={engine?.allExercises || []}
            playerType={engine?.playerType || playerType}
          />
        )}

        {/* =================================================
            TABLE 5
        ================================================= */}

        {activeTable === 5 && (
          <Table5Debug
            rankedExercises={engine?.exerciseRanking?.rankedExercises || []}
            playerType={engine?.playerType || playerType}
          />
        )}

        {/* =================================================
            TABLE 6
        ================================================= */}

        {activeTable === 6 && (
          <Table6Debug
            rankedExercises={engine?.exerciseRanking?.rankedExercises || []}
            playerType={engine?.playerType || playerType}
          />
        )}

        {/* =================================================
            TABLE 7
        ================================================= */}

        {activeTable === 7 && (
          <Table7Debug
            rankedExercises={engine?.exerciseRanking?.rankedExercises || []}
            playerType={engine?.playerType || playerType}
          />
        )}

        {/* =================================================
            TABLE 8
        ================================================= */}

        {activeTable === 8 && (
          <Table8Debug
            table8={engine?.table8 || []}
            playerType={engine?.playerType || playerType}
          />
        )}

        {/* =================================================
            TABLE 9
        ================================================= */}

        {activeTable === 9 && (
          <Table9Debug
            table9={engine?.table9 || []}
            playerType={engine?.playerType || playerType}
          />
        )}

        {/* =================================================
            TABLE 10
        ================================================= */}

        {activeTable === 10 && (
          <Table10Debug
            table10={engine?.table10 || []}
            playerType={engine?.playerType || playerType}
          />
        )}

        {/* =================================================
            TABLE 11
        ================================================= */}

        {activeTable === 11 && (
          <Table11Debug
            table11={engine?.table11 || []}
            playerType={engine?.playerType || playerType}
          />
        )}

        {/* =================================================
            TABLE 12
        ================================================= */}

        {activeTable === 12 && (
          <Table12Debug
            table12={engine?.table12 || []}
            playerType={engine?.playerType || playerType}
          />
        )}

        {/* =================================================
            TABLE 13
        ================================================= */}

        {activeTable === 13 && (
          <Table13Debug
            table13={engine?.table13 || []}
            playerType={engine?.playerType || playerType}
          />
        )}

        {/* =================================================
            TABLE 14
        ================================================= */}

        {activeTable === 14 && (
          <Table14Debug
            table14={engine?.table14 || []}
            playerType={engine?.playerType || playerType}
          />
        )}

        {/* =================================================
            TABLE 15
        ================================================= */}

        {activeTable === 15 && (
          <Table15Debug
            table15={engine?.table15 || []}
            playerType={engine?.playerType || playerType}
          />
        )}

        {/* =================================================
            TABLE 16
        ================================================= */}

        {activeTable === 16 && (
          <Table16Debug
            table16={engine?.table16 || []}
            playerType={engine?.playerType || playerType}
          />
        )}

        {/* =================================================
            TABLE 17
        ================================================= */}

        {activeTable === 17 && (
          <Table17Debug
            table17={engine?.table17 || []}
            playerType={engine?.playerType || playerType}
          />
        )}
      </section>
    </main>
  );
}

export default TrainingEngineDebugContent;
