import group from "../constants/group";
import skill from "../constants/skill";

export const GroupSkill = {
    [group[0]]: skill.slice(0,5),
    [group[1]]: skill.slice(5,10),
    [group[2]]: skill.slice(10,15)
};
export default GroupSkill;
export const allGroupSkill = skill;