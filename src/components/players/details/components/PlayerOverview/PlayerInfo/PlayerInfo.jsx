import "./PlayerInfo.css";
import {

    User,
    CalendarDays,
    TrendingUp,
    Star

} from "lucide-react";

function PlayerInfo({

    player,
    playerOverall,
    playerWhiteOverall

}){

    return(

        <div className="player-info-panel">

            <div className="player-info-title">

                <User size={16}/>

                <span>PLAYER</span>

            </div>

            <h2>

                {player.name}

            </h2>

            <div className="player-info-row">

                <span>

                    <CalendarDays size={15}/>

                    Age

                </span>

                <strong>

                    {player.age}

                </strong>

            </div>

            <div className="player-info-row">

                <span>

                    <TrendingUp size={15}/>

                    OVR

                </span>

                <strong>

                    {playerOverall}

                </strong>

            </div>

            <div className="player-info-row">

                <span>

                    <Star size={15}/>

                    White OVR

                </span>

                <strong>

                    {playerWhiteOverall}

                </strong>

            </div>

        </div>

    );

}

export default PlayerInfo;