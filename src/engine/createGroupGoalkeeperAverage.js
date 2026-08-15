import {
  groupGoalkeeperSkill,
  allGroupgoalkeeperSkill,
} from "./groupGoalkeeperSkill";

import calculateAverage from "../util/average";

export default function createGroupGoalkeeperAverage(skills) {
  const result = {};

  Object.entries(groupGoalkeeperSkill).forEach(([groupName, groupSkills]) => {
    result[groupName] = Number(
      calculateAverage(
        groupSkills.map((skill) => Number(skills?.[skill]) || 0),
      ).toFixed(1),
    );
  });

  const values = allGroupgoalkeeperSkill.map(
    (skill) => Number(skills?.[skill]) || 0,
  );

  const sum = values.reduce((total, value) => total + value, 0);

  result.overall = Number((sum / values.length).toFixed(1));

  result.overallInteger = Math.floor(sum / values.length);

  result.overallRemainder = sum % values.length;

  return result;
}
