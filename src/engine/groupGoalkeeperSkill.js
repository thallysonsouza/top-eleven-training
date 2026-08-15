import group from "../constants/group";
import goalkeeperSkill from "../constants/goalkeeperSkill";

export const groupGoalkeeperSkill = {
  [group[0]]: goalkeeperSkill.slice(0, 5),
  [group[1]]: goalkeeperSkill.slice(5, 10),
  [group[2]]: goalkeeperSkill.slice(10, 15),
};
export default groupGoalkeeperSkill;
export const allGroupgoalkeeperSkill = goalkeeperSkill;
