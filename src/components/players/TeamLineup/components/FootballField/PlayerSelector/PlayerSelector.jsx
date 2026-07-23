import "./PlayerSelector.css";

import { X } from "lucide-react";
import createGroupAverage from "../../../../../../engine/createGroupAverage";

function PlayerSelector({

    open,

    position,

    players,

    onClose,

    onSelect

}){

    if(!open){

        return null;

    }

    return(

        <div className="player-selector-overlay">

            <div className="player-selector">

                <div className="player-selector-header">

                    <div>

                        <small>

                            SELECT PLAYER

                        </small>

                        <h2>

                            {position}

                        </h2>

                    </div>

                    <button

                        className="player-selector-close"

                        onClick={onClose}

                    >

                        <X size={22}/>

                    </button>

                </div>

                <div className="player-selector-search">

                    <input

                        type="text"

                        placeholder="Search player..."

                    />

                </div>

                <div className="player-selector-list">

                    {

                        players.length===0

                        ?

                        <div className="player-selector-empty">

                            No players available.

                        </div>

                        :

                        players.map(player=>{

                            const averages = createGroupAverage(

                                player.skills

                            );

                            return(

                                <button

                                    key={player.id}

                                    className="playerr-card"

                                    onClick={()=>

                                        onSelect(player)

                                    }

                                >

                                    <div className="playerr-card-left">

                                        <strong>

                                            {player.name}

                                        </strong>

                                        <small>

                                            {

                                                [

                                                    player.position1,

                                                    player.position2,

                                                    player.position3

                                                ]

                                                .filter(

                                                    p=>p!=="---"

                                                )

                                                .join(" • ")

                                            }

                                        </small>

                                    </div>

                                    <div className="playerr-card-right">

                                        <span className="player-overall-label">

                                            OVR

                                        </span>

                                        <strong>

                                            {averages.overall}

                                        </strong>

                                    </div>

                                </button>

                            );

                        })

                    }

                </div>

            </div>

        </div>

    );

}

export default PlayerSelector;