import ModalSkillGroup from "../components/ModalSkillGroup/ModalSkillGroup";

import GroupSkill from "../../../../engine/groupSkill";
import GroupGoalkeeperSkill from "../../../../engine/groupGoalkeeperSkill";

function StepDefense({
  position1,

  position2Value,

  position3Value,

  skills,

  handleSkillChange,
}) {
  const groupSkill = position1 === "GK" ? GroupGoalkeeperSkill : GroupSkill;

  return (
    <ModalSkillGroup
      title="Defense"
      position1={position1}
      position2={position2Value}
      position3={position3Value}
      attributes={groupSkill.Defense}
      skills={skills}
      handleSkillChange={handleSkillChange}
    />
  );
}

export default StepDefense;
