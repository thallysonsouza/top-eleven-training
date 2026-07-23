import "./PlayerAvatar.css";
import { CircleUserRound } from "lucide-react";

function PlayerAvatar({ player }) {

    const positions = [

        player.position1,
        player.position2,
        player.position3

    ].filter(position => position !== "---");

    return (

        <div className="player-avatar">

            <div className="player-avatar-circle">

                <CircleUserRound
                    size={95}
                    strokeWidth={1.5}
                />

            </div>

            <div className="player-avatar-position">

                {positions.join(" • ")}

            </div>

        </div>

    );

}

export default PlayerAvatar;