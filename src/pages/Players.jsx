import { useParams } from "react-router-dom";

import PlayersContent from "../components/players/manager/PlayersContent";

import { getTeamById } from "../services/teamStorage";

function Players(){

    const { teamId } = useParams();

    const team = getTeamById(teamId);

    if(!team){

        return(

            <h2>

                Team not found.

            </h2>

        );

    }

    return(

        <PlayersContent

            team={team}

        />

    );

}

export default Players;