import FIELD_PLAYER_SKILL_GROUPS from "../skills/fieldPlayerSkillGroups";
import GOALKEEPER_SKILL_GROUPS from "../skills/goalkeeperSkillGroups";

export default function getPlayerSkillGroups(player) {
  return player.position1 === "GK"
    ? GOALKEEPER_SKILL_GROUPS
    : FIELD_PLAYER_SKILL_GROUPS;
}
