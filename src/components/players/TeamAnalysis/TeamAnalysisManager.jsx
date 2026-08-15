import { useMemo } from "react";

import { useParams } from "react-router-dom";

import TeamAnalysis from "./TeamAnalysis";

import { loadTeams, getLineup } from "../../../services/teamStorage";

import analyzeTeam from "../TeamAnalysis/cards/TeamBalanceCard/services/analyzeTeam";

function TeamAnalysisManager() {
  const { teamId } = useParams();

  const teams = loadTeams();

  const team = teams.find((item) => item.id === Number(teamId));

  if (!team) {
    return <div className="team-lineup-message">Team not found.</div>;
  }

  const lineup = getLineup(team.id) ?? {};

  const analysis = useMemo(() => analyzeTeam(lineup), [lineup]);

  return <TeamAnalysis team={team} lineup={lineup} analysis={analysis} />;
}

export default TeamAnalysisManager;
