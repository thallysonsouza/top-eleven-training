import "./TeamLineupCard.css";
import { Goal } from "lucide-react";

function TeamLineupCard({ onOpen }) {

    return (

        <button
            className="team-lineup-card"
            onClick={onOpen}
        >

            <Goal
                size={52}
                strokeWidth={1.6}
            />

            <h3>

                Team Lineup

            </h3>

            <span>

                Build your starting eleven

            </span>

        </button>

    );

}

export default TeamLineupCard;