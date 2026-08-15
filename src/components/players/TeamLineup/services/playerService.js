import { getTeamById, updatePlayers } from "../../../../services/teamStorage";

const MAX_PROGRESS = 10;

function increaseSkills(skills) {
  const updated = {};

  Object.entries(skills).forEach(([key, value]) => {
    updated[key] = Number(value) + 1;
  });

  return updated;
}

function decreaseSkills(skills) {
  const updated = {};

  Object.entries(skills).forEach(([key, value]) => {
    updated[key] = Number(value) - 1;
  });

  return updated;
}

export function increasePlayer(teamId, playerId) {
  const team = getTeamById(teamId);

  if (!team) return;

  const players = team.players.map((player) => {
    if (player.id !== playerId) {
      return player;
    }

    let progress = (player.overallProgress ?? 0) + 1;

    let skills = player.skills;

    if (progress >= MAX_PROGRESS) {
      progress = 0;

      skills = increaseSkills(skills);
    }

    return {
      ...player,

      overallProgress: progress,

      skills,
    };
  });

  updatePlayers(teamId, players);
}

export function decreasePlayer(teamId, playerId) {
  const team = getTeamById(teamId);

  if (!team) return;

  const players = team.players.map((player) => {
    if (player.id !== playerId) {
      return player;
    }

    let progress = (player.overallProgress ?? 0) - 1;

    let skills = player.skills;

    if (progress < 0) {
      progress = MAX_PROGRESS - 1;

      skills = decreaseSkills(skills);
    }

    return {
      ...player,

      overallProgress: progress,

      skills,
    };
  });

  updatePlayers(teamId, players);
}
