import "./TeamGrid.css";
import { ShieldPlus } from "lucide-react";
import CreateCard from "../../ui/CreateCard/CreateCard";
import TeamCard from "../cards/TeamCard";

function TeamGrid({

    teams,

    onCreate,

    onSelect,

    onEdit,

    onNewSeason,

    onUndoSeason,

    onDelete

}){
    return(
        <section className="team-grid">
            <CreateCard
                title={
                    teams.length >= 12
                        ? "Maximum Teams"
                        : "Create Team"
                }
                description={
                    teams.length >= 12
                        ? "12 / 12 Teams"
                        : `${teams.length} / 12 Teams`
                }
                icon={ShieldPlus}
                onClick={onCreate}
            />
            {
                teams.map(team=>(
                <TeamCard

                    key={team.id}

                    team={team}

                    onSelect={onSelect}

                    onEdit={onEdit}

                    onNewSeason={onNewSeason}

                    onUndoSeason={onUndoSeason}

                    onDelete={onDelete}

                />
                ))
            }
        </section>
    );
}
export default TeamGrid;