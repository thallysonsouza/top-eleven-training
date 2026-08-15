import "./PositionSlot.css";

import { Plus } from "lucide-react";

import PlayerSlotCard from "../PlayerSlotCard/PlayerSlotCard";

function PositionSlot({
    position,
    player,
    onAdd,
    onOpenDetails,
    onRemove,
    onIncrease,
    onDecrease
}) {

    if(!player){

        return(

            <button
                className="position-slot"
                onClick={onAdd}
            >

                <Plus

                    size={24}

                    className="position-slot-plus"

                />

                <small>
                    {position.replace(/[0-9]/g,"")}
                </small>

            </button>

        );

    }

    return(

        <div className="position-slot">

            <PlayerSlotCard
                player={player}
                onOpenDetails={onOpenDetails}
                onRemove={onRemove}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
            />

        </div>

    );

}

export default PositionSlot;