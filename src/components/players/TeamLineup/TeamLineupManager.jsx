import "./TeamLineupManager.css";

import { useState, useEffect } from "react";

import FootballField from "../TeamLineup/FootballField/FootballField";
import {
  loadTeams,
  getLineup,
  updateLineup,
} from "../../../services/teamStorage";

import defaultLineup from "./services/defaultLineup";

function TeamLineupManager({ teamId }) {
  const teams = loadTeams();

  const team = teams.find((item) => item.id === Number(teamId));

  const [lineup, setLineup] = useState(() =>
    team
      ? (getLineup(team.id) ?? structuredClone(defaultLineup))
      : structuredClone(defaultLineup),
  );

  useEffect(() => {
    if (team) {
      updateLineup(team.id, lineup);
    }
  }, [lineup, team]);

  if (!team) {
    return <div className="team-lineup-message">Team not found.</div>;
  }

  return (
    <div className="team-lineup-manager">
      <FootballField team={team} lineup={lineup} setLineup={setLineup} />
    </div>
  );
}

export default TeamLineupManager;
