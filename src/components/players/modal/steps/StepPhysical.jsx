import ModalSkillGroup from "../components/ModalSkillGroup/ModalSkillGroup";

import GroupSkill from "../../../../engine/groupSkill";
import GroupGoalkeeperSkill from "../../../../engine/groupGoalkeeperSkill";

function StepPhysical({
  position1,

  position2Value,

  position3Value,

  skills,

  handleSkillChange,
}) {
  const groupSkill = position1 === "GK" ? GroupGoalkeeperSkill : GroupSkill;

  return (
    <ModalSkillGroup
      title="Physical"
      position1={position1}
      position2={position2Value}
      position3={position3Value}
      attributes={groupSkill.Physical}
      skills={skills}
      handleSkillChange={handleSkillChange}
    />
  );
}

export default StepPhysical;
