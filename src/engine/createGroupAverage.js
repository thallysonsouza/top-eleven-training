import { GroupSkill, allGroupSkill } from "./groupSkill";
import calculateAverage from "../util/average";

export default function createGroupAverage(skills){

    const result = {};

    Object.entries(GroupSkill).forEach(([groupName, groupSkills])=>{

        result[groupName] = Number(

            calculateAverage(

                groupSkills.map(

                    skill => Number(skills?.[skill]) || 0

                )

            ).toFixed(1)

        );

    });

    result.overall = Number(

        calculateAverage(

            allGroupSkill.map(

                skill => Number(skills?.[skill]) || 0

            )

        ).toFixed(1)

    );

    return result;

}