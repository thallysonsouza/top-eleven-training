import calculateAverage from "../util/average";
import getPlayerDisplayedOverall from "./getPlayerDisplayedOverall";

export default function createTeamOverall(team) {
  if (!team.players.length) {
    return 0;
  }

  return Number(
    calculateAverage(
      team.players.map((player) => getPlayerDisplayedOverall(player)),
    ).toFixed(1),
  );
}
