import "./PlayerGrid.css";
import { UserPlus } from "lucide-react";

import CreateCard from "../../ui/CreateCard/CreateCard";
import PlayerCard from "../cards/PlayerCard";
import TeamLineupCard from "../cards/TeamLineupCard";

function PlayerGrid({

    players,

    onCreate,

    onOpen,

    onLineup,

    onEdit,

    onNewSeason,

    onUndoSeason,

    onDelete,

    onToggleCheck

}){

    return(

        <section className="player-grid">

            <TeamLineupCard
                onOpen={onLineup}
            />

            <CreateCard
                title={
                    players.length >= 11
                        ? "Maximum Players"
                        : "Create Player"
                }
                description={
                    players.length >= 11
                        ? "11 / 11 Players"
                        : `${players.length} / 11 Players`
                }
                icon={UserPlus}
                onClick={onCreate}
            />

            {

                players.map(player=>(

                    <PlayerCard

                        key={player.id}

                        player={player}

                        onOpen={onOpen}

                        onEdit={onEdit}

                        onNewSeason={onNewSeason}

                        onUndoSeason={onUndoSeason}

                        onDelete={onDelete}

                        onToggleCheck={onToggleCheck}

                    />

                ))

            }

        </section>

    );

}

export default PlayerGrid;