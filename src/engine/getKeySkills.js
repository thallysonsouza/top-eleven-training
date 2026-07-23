import KeySkill from "../constants/keySkill";
import { allGroupSkill } from "./groupSkill";

export function getKeySkills(position1, position2, position3) {

    const p1 = KeySkill[position1] || KeySkill["---"];

    const p2 = KeySkill[position2] || KeySkill["---"];

    const p3 = KeySkill[position3] || KeySkill["---"];

    const result = {};

    allGroupSkill.forEach(skill => {

        result[skill] =

            p1[skill] ||

            p2[skill] ||

            p3[skill];

    });

    return result;

}