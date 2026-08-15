import { GroupSkill, allGroupSkill } from "./groupSkill";
import calculateAverage from "../util/average";

const SKILLS_PER_OVERALL = 15;

export default function createGroupAverage(skills) {
  const result = {};

  Object.entries(GroupSkill).forEach(([groupName, groupSkills]) => {
    result[groupName] = Number(
      calculateAverage(
        groupSkills.map((skill) => Number(skills?.[skill]) || 0),
      ).toFixed(1),
    );
  });

  const values = allGroupSkill.map((skill) => Number(skills?.[skill]) || 0);

  const sum = values.reduce((total, value) => total + value, 0);

  // Média (apenas para referência)
  result.overall = Number((sum / values.length).toFixed(1));

  // Regra do Top Eleven
  result.overallInteger = Math.floor(sum / SKILLS_PER_OVERALL);

  result.overallRemainder = sum % SKILLS_PER_OVERALL;

  return result;
}
