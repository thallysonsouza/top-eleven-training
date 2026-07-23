import { position } from "./position";
import skill from "./skill";

const keySkillData = {
    "---":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    "GK":[1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],

    "DL":[1,1,1,0,1,0,0,1,0,0,1,0,1,1,0],

    "DC":[1,1,1,1,1,0,0,0,0,0,1,1,1,0,0],

    "DR":[1,1,1,0,1,0,0,1,0,0,1,0,1,1,0],

    "DMC":[1,1,1,1,1,1,0,0,0,0,1,1,1,0,1],

    "ML":[0,0,1,0,0,1,1,1,0,0,1,0,0,1,1],

    "MC":[1,1,1,0,1,1,1,0,1,0,1,0,0,1,1],

    "MR":[0,0,1,0,0,1,1,1,0,0,1,0,0,1,1],

    "AML":[0,0,0,0,0,1,1,1,1,1,1,0,0,1,1],

    "AMC":[0,0,0,1,0,1,1,0,1,1,1,0,0,1,1],

    "AMR":[0,0,0,0,0,1,1,1,1,1,1,0,0,1,1],

    "ST":[0,0,1,1,0,1,1,0,1,1,0,1,0,1,1]
};

const KeySkill = {};

Object.entries(keySkillData).forEach(([pos, values]) => {

    KeySkill[pos] = {};

    skill.forEach((attribute, index) => {

        KeySkill[pos][attribute] = Boolean(values[index]);

    });

});

export default KeySkill;