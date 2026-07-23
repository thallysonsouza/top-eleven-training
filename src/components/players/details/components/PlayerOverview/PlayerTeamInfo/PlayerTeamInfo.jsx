import "./PlayerTeamInfo.css";
import {
    Shield,
    BarChart3,
    TrendingUp,
    Star
} from "lucide-react";

function PlayerTeamInfo({

    team,
    teamOverall,
    teamWhiteOverall

}){

    return(

        <div className="player-info-panel">

            <div className="player-info-title">

                <Shield size={16}/>

                <span>TEAM</span>

            </div>

            <h2>

                {team.name}

            </h2>

            <div className="player-info-row">

                <span>

                    <BarChart3 size={15}/>

                    Level

                </span>

                <strong>

                    {team.level}

                </strong>

            </div>

            <div className="player-info-row">

                <span>

                    <TrendingUp size={15}/>

                    Team OVR

                </span>

                <strong>

                    {teamOverall}

                </strong>

            </div>

            <div className="player-info-row">

                <span>

                    <Star size={15}/>

                    White OVR

                </span>

                <strong>

                    {teamWhiteOverall}

                </strong>

            </div>

        </div>

    );

}

export default PlayerTeamInfo;