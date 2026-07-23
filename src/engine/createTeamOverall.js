import createGroupAverage from "./createGroupAverage";
import calculateAverage from "../util/average";

export default function createTeamOverall(team){

    if(!team.players.length){

        return 0;

    }

    const overalls = team.players.map(player=>{

        const averages = createGroupAverage(player.skills);

        return averages.overall;

    });

    return Math.round(

        calculateAverage(overalls)

    );

}