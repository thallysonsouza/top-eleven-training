import "./TeamCard.css";

import {
    Star,
    Pencil,
    Trash2,
    CalendarSync,
    RotateCcw
} from "lucide-react";

import IconButton from "../../ui/Button/IconButton";
import createTeamOverall from "../../../engine/createTeamOverall";
import { getStarsText } from "../../../util/playerStars";

function TeamCard({

    team,

    onSelect,

    onEdit,

    onNewSeason,

    onUndoSeason,

    onDelete

}){

    const overall = createTeamOverall(team);

    const stars = getStarsText(overall);

    return(

        <div className="team-card">

            <button
                className="team-card-main"
                onClick={()=>onSelect(team)}
            >

                <h3>{team.name}</h3>

                <div className="team-overall">

                    <span className="team-stars">
                        {stars}
                    </span>

                    <strong>
                        {overall}
                    </strong>

                </div>

                <div className="team-players-count">

                    👥 {team.players.length} / 11 Players

                </div>

            </button>

            <div className="team-card-actions">

                <IconButton
                    variant="secondary"
                    title="Edit Team"
                    onClick={(e)=>{
                        e.stopPropagation();
                        onEdit(team);
                    }}
                >
                    <Pencil size={18}/>
                </IconButton>

                <IconButton
                    variant="secondary"
                    title="New Season"
                    onClick={(e)=>{
                        e.stopPropagation();
                        onNewSeason(team);
                    }}
                >
                    <CalendarSync size={18}/>
                </IconButton>

                <IconButton
                    variant="secondary"
                    title="Undo Season"
                    onClick={(e)=>{
                        e.stopPropagation();
                        onUndoSeason(team);
                    }}
                >
                    <RotateCcw size={18}/>
                </IconButton>

                <IconButton
                    variant="danger"
                    title="Delete Team"
                    onClick={(e)=>{
                        e.stopPropagation();
                        onDelete(team);
                    }}
                >
                    <Trash2 size={18}/>
                </IconButton>

            </div>

        </div>

    );

}

export default TeamCard;