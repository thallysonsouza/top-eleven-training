import "./PlayerCard.css";

import {
    Pencil,
    Trash2,
    CalendarSync,
    RotateCcw,
    Check
} from "lucide-react";

import IconButton from "../../ui/Button/IconButton";

import createGroupAverage from "../../../engine/createGroupAverage";
import { getStarsText } from "../../../util/playerStars";

function PlayerCard({

    player,

    onOpen,

    onEdit,

    onNewSeason,

    onUndoSeason,

    onDelete,

    onToggleCheck

}){

    const averages = createGroupAverage(player.skills);

    const stars = getStarsText(averages.overall);

    const positions = [
        player.position1,
        player.position2,
        player.position3
    ].filter(position => position && position !== "---");

    return(

        <div
            className={`player-card ${player.checked ? "checked" : ""}`}
        >

            <button
                className="player-card-main"
                onClick={()=>onOpen(player)}
            >

                <h3 title={player.name}>
                    {player.name}
                </h3>

                <div className="player-overall">

                    <span className="player-stars">
                        {stars}
                    </span>

                    <strong>
                        {Math.round(averages.overall)}
                    </strong>

                </div>

                <div className="player-positions">

                    {positions.join(" • ")}

                </div>

            </button>

            <div className="player-card-actions">

                <IconButton
                    variant={player.checked ? "primary" : "secondary"}
                    title="Mark Player"
                    onClick={(e)=>{
                        e.stopPropagation();
                        onToggleCheck(player);
                    }}
                >
                    <Check size={18}/>
                </IconButton>

                <IconButton
                    variant="secondary"
                    title="Edit Player"
                    onClick={(e)=>{
                        e.stopPropagation();
                        onEdit(player);
                    }}
                >
                    <Pencil size={18}/>
                </IconButton>

                <IconButton
                    variant="secondary"
                    title="New Season"
                    onClick={(e)=>{
                        e.stopPropagation();
                        onNewSeason(player);
                    }}
                >
                    <CalendarSync size={18}/>
                </IconButton>

                <IconButton
                    variant="secondary"
                    title="Undo Season"
                    onClick={(e)=>{
                        e.stopPropagation();
                        onUndoSeason(player);
                    }}
                >
                    <RotateCcw size={18}/>
                </IconButton>

                <IconButton
                    variant="danger"
                    title="Delete Player"
                    onClick={(e)=>{
                        e.stopPropagation();
                        onDelete(player);
                    }}
                >
                    <Trash2 size={18}/>
                </IconButton>

            </div>

        </div>

    );

}

export default PlayerCard;