import goalkeeperSkill from "./goalkeeperSkill";

const keyGoalkeeperSkillData = {
  "---": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

  GK: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
};

const KeyGoalkeeperSkill = {};

Object.entries(keyGoalkeeperSkillData).forEach(([pos, values]) => {
  KeyGoalkeeperSkill[pos] = {};

  goalkeeperSkill.forEach((attribute, index) => {
    KeyGoalkeeperSkill[pos][attribute] = Boolean(values[index]);
  });
});

export default KeyGoalkeeperSkill;
