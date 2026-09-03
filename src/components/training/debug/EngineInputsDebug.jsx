import { RotateCcw } from "lucide-react";

import { position, position2, position3 } from "../../../constants/position";

import skill from "../../../constants/skill";
import goalkeeperSkill from "../../../constants/goalkeeperSkill";

import "./EngineInputsDebug.css";

/* =========================================================
   COMPONENT
========================================================= */

function EngineInputsDebug({
  position1,
  position2Value,
  position3Value,

  initialSkills,

  trainingAverage,
  desiredOverall,
  rB,
  rC,

  onPosition1Change,
  onPosition2Change,
  onPosition3Change,

  onInitialSkillChange,

  onTrainingAverageChange,
  onDesiredOverallChange,

  onReset,
}) {
  /* =======================================================
     POSITION 2 OPTIONS
  ======================================================= */

  const position2Options = position2[position1] || ["---"];

  /* =======================================================
     POSITION 3 OPTIONS
  ======================================================= */

  const position3Options = position3[position1]?.[position2Value] || ["---"];

  /* =======================================================
     PLAYER TYPE
  ======================================================= */

  const playerType = position1 === "GK" ? "GOALKEEPER" : "OUTFIELD";

  /* =======================================================
     CURRENT SKILLS
  ======================================================= */

  const currentSkills = position1 === "GK" ? goalkeeperSkill : skill;

  /* =======================================================
     SKILL GROUPS
  ======================================================= */

  const skillGroups = [
    currentSkills.slice(0, 5),
    currentSkills.slice(5, 10),
    currentSkills.slice(10, 15),
  ];

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="training-engine-inputs">
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="training-engine-inputs-header">
        <div>
          <small>TABLE 0</small>

          <h2>Engine Inputs</h2>

          <p>
            Configure the player, initial skills and training parameters used
            throughout the engine.
          </p>
        </div>

        <button
          type="button"
          className="training-engine-inputs-reset"
          onClick={onReset}
          title="Reset inputs"
        >
          <RotateCcw size={14} />

          <span>Reset</span>
        </button>
      </div>

      {/* ==================================================
          POSITIONS
      ================================================== */}

      <div className="training-engine-inputs-position-section">
        <div className="training-engine-inputs-section-title">
          <span>POSITIONS</span>
        </div>

        <div className="training-engine-inputs-grid positions">
          {/* POSITION 1 */}

          <div className="training-engine-input-field">
            <label htmlFor="engine-position-1">POSITION 1</label>

            <select
              id="engine-position-1"
              value={position1}
              onChange={onPosition1Change}
            >
              {position.map((currentPosition) => (
                <option key={currentPosition} value={currentPosition}>
                  {currentPosition}
                </option>
              ))}
            </select>
          </div>

          {/* POSITION 2 */}

          <div
            className={`training-engine-input-field ${
              position2Options.length <= 1 ? "disabled" : ""
            }`}
          >
            <label htmlFor="engine-position-2">POSITION 2</label>

            <select
              id="engine-position-2"
              value={position2Value}
              onChange={onPosition2Change}
              disabled={position2Options.length <= 1}
            >
              {position2Options.map((currentPosition) => (
                <option key={currentPosition} value={currentPosition}>
                  {currentPosition}
                </option>
              ))}
            </select>
          </div>

          {/* POSITION 3 */}

          <div
            className={`training-engine-input-field ${
              position3Options.length <= 1 ? "disabled" : ""
            }`}
          >
            <label htmlFor="engine-position-3">POSITION 3</label>

            <select
              id="engine-position-3"
              value={position3Value}
              onChange={onPosition3Change}
              disabled={position3Options.length <= 1}
            >
              {position3Options.map((currentPosition) => (
                <option key={currentPosition} value={currentPosition}>
                  {currentPosition}
                </option>
              ))}
            </select>
          </div>

          {/* PLAYER TYPE */}

          <div className="training-engine-input-type">
            <span>PLAYER TYPE</span>

            <strong>{playerType}</strong>
          </div>
        </div>
      </div>

      {/* ==================================================
          INITIAL SKILLS
      ================================================== */}

      <div className="training-engine-inputs-skills-section">
        <div className="training-engine-inputs-section-title">
          <span>INITIAL SKILLS</span>

          <small>{currentSkills.length} ATTRIBUTES</small>
        </div>

        <div className="training-engine-inputs-skills-grid">
          {skillGroups.map((skillGroup, groupIndex) => (
            <div
              className="training-engine-inputs-skill-group"
              key={groupIndex}
            >
              {skillGroup.map((attribute) => (
                <div
                  className="training-engine-input-skill-field"
                  key={attribute}
                >
                  <label htmlFor={`initial-skill-${attribute}`}>
                    {attribute}
                  </label>

                  <input
                    id={`initial-skill-${attribute}`}
                    type="number"
                    min="1"
                    max="250"
                    step="1"
                    value={initialSkills?.[attribute] ?? 40}
                    onChange={(event) =>
                      onInitialSkillChange(attribute, event.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ==================================================
          TRAINING PARAMETERS
      ================================================== */}

      <div className="training-engine-inputs-parameters-section">
        <div className="training-engine-inputs-section-title">
          <span>TRAINING PARAMETERS</span>
        </div>

        <div className="training-engine-inputs-parameters-grid">
          {/* TRAINING AVERAGE */}

          <div className="training-engine-input-parameter-field">
            <label htmlFor="engine-training-average">TRAINING AVERAGE</label>

            <input
              id="engine-training-average"
              type="number"
              min="1"
              max="250"
              step="1"
              value={trainingAverage}
              onChange={(event) => onTrainingAverageChange(event.target.value)}
            />
          </div>

          {/* DESIRED OVERALL */}

          <div className="training-engine-input-parameter-field">
            <label htmlFor="engine-desired-overall">DESIRED OVR</label>

            <input
              id="engine-desired-overall"
              type="number"
              min="1"
              max="250"
              step="1"
              value={desiredOverall}
              onChange={(event) => onDesiredOverallChange(event.target.value)}
            />
          </div>

          {/* r_b */}

          <div className="training-engine-input-parameter-field fixed">
            <label>r_b</label>

            <strong>{rB}</strong>
          </div>

          {/* r_c */}

          <div className="training-engine-input-parameter-field fixed">
            <label>r_c</label>

            <strong>{rC}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EngineInputsDebug;
