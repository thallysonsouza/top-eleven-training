import createGroupAverage from "./createGroupAverage";
import createGroupGoalkeeperAverage from "./createGroupGoalkeeperAverage";

const MAX_PROGRESS = 10;

export default function getPlayerOverall(player) {
  const averages =
    player.position1 === "GK"
      ? createGroupGoalkeeperAverage(player.skills)
      : createGroupAverage(player.skills);

  let progress = player.overallProgress;

  if (progress === undefined) {
    progress = Math.floor((averages.overallRemainder / 15) * MAX_PROGRESS);
  }

  console.log({
    overall: averages.overall,
    integer: averages.overallInteger,
    remainder: averages.overallRemainder,
    progress: player.overallProgress,
  });

  return averages.overallInteger + progress / 10;
}
