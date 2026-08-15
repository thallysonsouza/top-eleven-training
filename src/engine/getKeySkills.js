import KeySkill from "../constants/keySkill";
import KeyGoalkeeperSkill from "../constants/keyGoalkeeperSkill";

import skill from "../constants/skill";
import goalkeeperSkill from "../constants/goalkeeperSkill";

export function getKeySkills(position1, position2, position3) {
  if (position1 === "GK") {
    const result = {};

    const keySkills = KeyGoalkeeperSkill.GK;

    goalkeeperSkill.forEach((attribute) => {
      result[attribute] = keySkills[attribute];
    });

    return result;
  }

  const p1 = KeySkill[position1] || KeySkill["---"];

  const p2 = KeySkill[position2] || KeySkill["---"];

  const p3 = KeySkill[position3] || KeySkill["---"];

  const result = {};

  skill.forEach((attribute) => {
    result[attribute] = p1[attribute] || p2[attribute] || p3[attribute];
  });

  return result;
}
