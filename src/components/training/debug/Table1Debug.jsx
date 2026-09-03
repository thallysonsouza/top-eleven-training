import "./TrainingTable.css";

import { useMemo } from "react";

import { calculateTable1 } from "../../../engine/training/table1";

import skill from "../../../constants/skill";
import goalkeeperSkill from "../../../constants/goalkeeperSkill";

function formatSkillName(attribute) {
  return attribute
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function Table1Debug({ position1, position2, position3 }) {
  const table = useMemo(
    () => calculateTable1(position1, position2, position3),
    [position1, position2, position3],
  );

  const isGoalkeeper = position1 === "GK";

  const skills = isGoalkeeper ? goalkeeperSkill : skill;

  return (
    <section className="training-engine-table">
      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="training-engine-table-header">
        <div>
          <small>TABLE 1</small>

          <h2>General Position</h2>

          <p>Combines the selected player positions using OR logic.</p>
        </div>

        <div className="training-engine-table-type">
          <span>PLAYER TYPE</span>

          <strong>{isGoalkeeper ? "GOALKEEPER" : "OUTFIELD"}</strong>
        </div>
      </header>

      {/* ==================================================
          RESULT
      ================================================== */}

      <div className="training-engine-table-final-result">
        <div>
          <span>GENERAL POSITION</span>

          <strong>{table.binary}</strong>
        </div>

        <div>
          <span>SUM</span>

          <strong>{table.sum}</strong>
        </div>
      </div>

      {/* ==================================================
          SKILLS
      ================================================== */}

      <div className="training-engine-skills-panel">
        <div className="training-engine-skills-header">
          <span>SKILL</span>
          <span>RESULT</span>

          <span>SKILL</span>
          <span>RESULT</span>

          <span>SKILL</span>
          <span>RESULT</span>
        </div>

        <div className="training-engine-skills-grid">
          {skills.map((attribute) => (
            <div className="training-engine-skill-item" key={attribute}>
              <span>{formatSkillName(attribute)}</span>

              <strong className={table.result[attribute] ? "active" : ""}>
                {table.result[attribute] ? "1" : "0"}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Table1Debug;
