import "./TeamLineup.css";

import { useParams } from "react-router-dom";

import TeamLineupHeader from "./TeamLineupHeader";
import TeamLineupContent from "./TeamLineupContent";
import TeamLineupManager from "./TeamLineupManager";

function TeamLineup() {
  const { teamId } = useParams();

  return (
    <main className="team-lineup">
      <TeamLineupHeader />

      <TeamLineupContent>
        <TeamLineupManager teamId={teamId} />
      </TeamLineupContent>
    </main>
  );
}

export default TeamLineup;
