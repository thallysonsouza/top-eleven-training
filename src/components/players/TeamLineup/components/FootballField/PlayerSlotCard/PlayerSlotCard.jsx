import "./PlayerSlotCard.css";

import {
    Trash2,
    CircleUserRound,
    TrendingUp,
    TrendingDown
} from "lucide-react";

import IconButton from "../../../../../ui/Button/IconButton";
import createGroupAverage from "../../../../../../engine/createGroupAverage";
import { getStarsArray } from "../../../../../../util/playerStars";

function PlayerSlotCard({
    player,
    onOpenDetails,
    onRemove,
    onIncrease,
    onDecrease
}) {

    const overall = createGroupAverage(player.skills).overall;

    const overallDisplay = Number(overall).toFixed(1);

    const stars = getStarsArray(overall);

    return (

        <div className="player-slot-card">

            <button
                className="player-slot-main"
                onClick={onOpenDetails}
            >

                <div className="player-slot-name">
                    {player.name}
                </div>

                <div className="player-slot-footer">

                    <div className="player-slot-stars">
                        {
                            stars.map((filled, index) => (
                                <span
                                    key={index}
                                    className={filled ? "star filled" : "star"}
                                >
                                    ★
                                </span>
                            ))
                        }
                    </div>

                    <strong className="player-slot-overall">
                        {overallDisplay}
                    </strong>

                </div>

            </button>

            <div className="player-slot-actions">

                <IconButton
                    variant="secondary"
                    title="Open details"
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetails();
                    }}
                >
                    <CircleUserRound size={16}/>
                </IconButton>

                <IconButton
                    variant="secondary"
                    title="Increase all skills"
                    onClick={(e) => {
                        e.stopPropagation();
                        onIncrease();
                    }}
                >
                    <TrendingUp size={16}/>
                </IconButton>

                <IconButton
                    variant="secondary"
                    title="Decrease all skills"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDecrease();
                    }}
                >
                    <TrendingDown size={16}/>
                </IconButton>

                <IconButton
                    variant="danger"
                    title="Remove from lineup"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                >
                    <Trash2 size={16}/>
                </IconButton>

            </div>

        </div>

    );

}

export default PlayerSlotCard;