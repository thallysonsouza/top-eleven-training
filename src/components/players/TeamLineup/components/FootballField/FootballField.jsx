import "./FootballField.css";
import { useState } from "react";

import PositionSlot from "./PositionSlot/PositionSlot";
import PlayerSelector from "../FootballField/PlayerSelector/PlayerSelector";

import { removePlayer } from "../../services/lineupService";
import { useNavigate } from "react-router-dom";

import {
    increasePlayer,
    decreasePlayer
} from "../../services/playerService";
import fieldLayout from "../../services/fieldLayout";

function FootballField({

    team,

    lineup,

    setLineup

}){

    const navigate = useNavigate();

    const [selectedPosition, setSelectedPosition] = useState(null);

    const [openSelector, setOpenSelector] = useState(false);

    function handleOpenSelector(position){

        setSelectedPosition(position);

        setOpenSelector(true);

    }

    function handleSelectPlayer(player){

        setLineup(previous=>({

            ...previous,

            [selectedPosition]:player

        }));

        setOpenSelector(false);

    }

    function getBasePosition(position){

        return position.replace(/[0-9]/g,"");

    }

    function handleRemovePlayer(position){

        setLineup(previous=>

            removePlayer(previous, position)

        );

    }

    function handleOpenPlayer(player){

        navigate(

            `/app/player/${team.id}/${player.id}`

        );

    }

    function handleIncreasePlayer(player){

        increasePlayer(team.id, player.id);

        const updatedPlayer={

            ...player,

            skills:Object.fromEntries(

                Object.entries(player.skills).map(

                    ([key,value])=>[key,value+1]

                )

            )

        };

        setLineup(previous=>{

            const updated={...previous};

            Object.keys(updated).forEach(position=>{

                if(updated[position]?.id===player.id){

                    updated[position]=updatedPlayer;

                }

            });

            return updated;

        });

    }

    function handleDecreasePlayer(player){

        decreasePlayer(team.id, player.id);

        const updatedPlayer={

            ...player,

            skills:Object.fromEntries(

                Object.entries(player.skills).map(

                    ([key,value])=>[key,value-1]

                )

            )

        };

        setLineup(previous=>{

            const updated={...previous};

            Object.keys(updated).forEach(position=>{

                if(updated[position]?.id===player.id){

                    updated[position]=updatedPlayer;

                }

            });

            return updated;

        });

    }

    const selectedPlayers=Object.values(lineup)

        .filter(Boolean)

        .map(player=>player.id);

    const lineupCount=selectedPlayers.length;

    const availablePlayers=selectedPosition

        ?

        team.players.filter(player=>{

            const playerPositions=[

                player.position1,

                player.position2,

                player.position3

            ];

            return(

                playerPositions.includes(

                    getBasePosition(selectedPosition)

                )

                &&

                !selectedPlayers.includes(player.id)

            );

        })

        :

        [];

    return(

        <>

            <section className="football-field">

                <div className="field-markings">

                    <div className="center-line"></div>

                    <div className="center-circle"></div>

                    <div className="penalty-area-top"></div>

                    <div className="goal-area-top"></div>

                    <div className="penalty-area-bottom"></div>

                    <div className="goal-area-bottom"></div>

                </div>

                {

                    fieldLayout.flatMap(row=>row.positions).map((position,index)=>{

                        if(!position){

                            return(

                                <div

                                    key={index}

                                    className="football-empty"

                                />

                            );

                        }

                        const player=lineup[position];

                        const hideSlot=

                            lineupCount===11 && player===null;

                        if(hideSlot){

                            return(

                                <div

                                    key={position}

                                    className="football-empty"

                                />

                            );

                        }

                        return(

                            <PositionSlot

                                key={position}

                                position={position}

                                player={player}

                                onAdd={()=>handleOpenSelector(position)}

                                onOpenDetails={()=>

                                    handleOpenPlayer(player)

                                }

                                onRemove={()=>

                                    handleRemovePlayer(position)

                                }

                                onIncrease={()=>

                                    handleIncreasePlayer(player)

                                }

                                onDecrease={()=>

                                    handleDecreasePlayer(player)

                                }

                            />

                        );

                    })

                }

            </section>

            <PlayerSelector

                open={openSelector}

                position={selectedPosition}

                players={availablePlayers}

                onClose={()=>

                    setOpenSelector(false)

                }

                onSelect={handleSelectPlayer}

            />

        </>

    );

}

export default FootballField;