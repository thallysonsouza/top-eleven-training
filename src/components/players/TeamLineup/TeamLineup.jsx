import "./TeamLineup.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import FootballField from "./components/FootballField/FootballField";
import TeamAnalysis from "./components/TeamAnalysis/TeamAnalysis";

import {

    loadTeams,
    getLineup,
    updateLineup

} from "../../../services/teamStorage";

import defaultLineup from "./services/defaultLineup";

function TeamLineup(){

    const { teamId } = useParams();

    const teams = loadTeams();

    const team = teams.find(

        item => item.id === Number(teamId)

    );

    const [lineup, setLineup] = useState(

        () =>

            team

                ? getLineup(team.id) ?? structuredClone(defaultLineup)

                : structuredClone(defaultLineup)

    );

    useEffect(()=>{

        if(team){

            updateLineup(team.id, lineup);

        }

    },[lineup, team]);

    if(!team){

        return(

            <div className="team-lineup-message">

                Team not found.

            </div>

        );

    }

    return(

        <main className="team-lineup">

            <FootballField

                team={team}

                lineup={lineup}

                setLineup={setLineup}

            />

            <TeamAnalysis

                team={team}

                lineup={lineup}

            />

        </main>

    );

}

export default TeamLineup;