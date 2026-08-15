import ModalSkillGroup from "../components/ModalSkillGroup/ModalSkillGroup";

import GroupSkill from "../../../../engine/groupSkill";
import GroupGoalkeeperSkill from "../../../../engine/groupGoalkeeperSkill";

function StepAttack({
  position1,

  position2Value,

  position3Value,

  skills,

  handleSkillChange,
}) {
  const groupSkill = position1 === "GK" ? GroupGoalkeeperSkill : GroupSkill;

  return (
    <ModalSkillGroup
      title="Attack"
      position1={position1}
      position2={position2Value}
      position3={position3Value}
      attributes={groupSkill.Attack}
      skills={skills}
      handleSkillChange={handleSkillChange}
    />
  );
}

export default StepAttack;
