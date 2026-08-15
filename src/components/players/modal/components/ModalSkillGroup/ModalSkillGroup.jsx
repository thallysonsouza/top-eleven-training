import "./ModalSkillGroup.css";

import createGroupAverage from "../../../../../engine/createGroupAverage";
import createGroupGoalkeeperAverage from "../../../../../engine/createGroupGoalkeeperAverage";
import { getKeySkills } from "../../../../../engine/getKeySkills";

import ModalSkillRow from "./ModalSkillRow";

function ModalSkillGroup({
  title,

  position1,
  position2,
  position3,

  attributes,

  skills,

  handleSkillChange,
}) {
  const averages =
    position1 === "GK"
      ? createGroupGoalkeeperAverage(skills)
      : createGroupAverage(skills);

  const keySkills = getKeySkills(position1, position2, position3);

  const average = averages[title] ?? averages[title.toLowerCase()] ?? 0;

  return (
    <div className="modal-skill-group">
      <div className="modal-skill-group-header">
        <h3 className="modal-skill-group-title">{title}</h3>

        <div className="modal-skill-group-average">{average.toFixed(1)}</div>
      </div>

      <div className="modal-skill-group-list">
        {attributes.map((attribute) => (
          <ModalSkillRow
            key={attribute}
            attribute={attribute}
            label={attribute
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (letter) => letter.toUpperCase())}
            value={skills[attribute]}
            isKey={!!keySkills[attribute]}
            onChange={(value) => handleSkillChange(attribute, value)}
          />
        ))}
      </div>
    </div>
  );
}

export default ModalSkillGroup;
