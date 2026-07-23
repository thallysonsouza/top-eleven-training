import calculateAverage from "../util/average";
import { getKeySkills } from "./getKeySkills";

export default function createWhiteOverall(player){

    const keySkills = getKeySkills(
        player.position1,
        player.position2,
        player.position3
    );

    const values = Object.entries(player.skills)
        .filter(([skill]) => keySkills[skill])
        .map(([, value]) => Number(value) || 0);

    if(values.length === 0){
        return 0;
    }

    return Math.round(
        calculateAverage(values)
    );

}