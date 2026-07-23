import calculateAverage from "../util/average";
import createWhiteOverall from "./createWhiteOverall";

export default function createTeamWhiteOverall(team){

    if(!team.players.length){
        return 0;
    }

    return Math.round(

        calculateAverage(

            team.players.map(player =>
                createWhiteOverall(player)
            )

        )

    );

}