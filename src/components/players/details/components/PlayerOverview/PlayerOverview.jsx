import "./PlayerOverview.css";

import PlayerAvatar from "../PlayerOverview/PlayerAvatar/PlayerAvatar";
import PlayerTeamInfo from "../PlayerOverview/PlayerTeamInfo/PlayerTeamInfo";
import PlayerInfo from "../PlayerOverview/PlayerInfo/PlayerInfo";
import PlayerSkills from "../PlayerOverview/PlayerSkills/PlayerSkills";

import {
    Pencil,
    Trash2,
    CalendarSync,
    RotateCcw
} from "lucide-react";

import IconButton from "../../../../ui/Button/IconButton";

function PlayerOverview({

    team,
    player,

    teamOverall,
    teamWhiteOverall,

    playerOverall,
    playerWhiteOverall,

    averages,

    onEdit,
    onNewSeason,
    onUndoSeason,
    onDelete

}){

    return(

        <div className="player-overview">

            <div className="player-overview-top">

                <PlayerAvatar player={player} />

                <PlayerTeamInfo
                    team={team}
                    teamOverall={teamOverall}
                    teamWhiteOverall={teamWhiteOverall}
                />

                <PlayerInfo
                    player={player}
                    playerOverall={playerOverall}
                    playerWhiteOverall={playerWhiteOverall}
                />

            </div>

            <div className="player-overview-divider"></div>

            <div className="player-overview-title">

                PLAYER SKILLS

            </div>

            <PlayerSkills
                player={player}
                averages={averages}
            />

            <div className="player-overview-actions">

            <IconButton
                variant="secondary"
                title="Edit Player"
                onClick={() => onEdit(player)}
            >
                <Pencil size={18}/>
            </IconButton>

            <IconButton
                variant="secondary"
                title="New Season"
                onClick={() => onNewSeason(player)}
            >
                <CalendarSync size={18}/>
            </IconButton>

            <IconButton
                variant="secondary"
                title="Undo Season"
                onClick={() => onUndoSeason(player)}
            >
                <RotateCcw size={18}/>
            </IconButton>

            <IconButton
                variant="danger"
                title="Delete Player"
                onClick={() => onDelete(player)}
            >
                <Trash2 size={18}/>
            </IconButton>

        </div>

        </div>

    );

}

export default PlayerOverview;