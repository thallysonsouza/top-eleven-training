import "./PlayerSkills.css";

import SkillGroup from "../../../components/SkillGroup";

import { getKeySkills } from "../../../../../../engine/getKeySkills";

import getPlayerSkillGroups from "../../../services/getPlayerSkillGroups";

function PlayerSkills({ player, averages }) {
  const keySkills = getKeySkills(
    player.position1,
    player.position2,
    player.position3,
  );

  const groups = getPlayerSkillGroups(player);

  return (
    <div className="player-skills">
      {groups.map((group) => (
        <SkillGroup
          key={group.title}
          title={group.title}
          color={group.color}
          average={averages[group.average]}
          attributes={Object.values(group.skills)}
          player={player}
          keySkills={keySkills}
        />
      ))}
    </div>
  );
}

export default PlayerSkills;
