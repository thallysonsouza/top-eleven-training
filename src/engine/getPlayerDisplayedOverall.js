import createGroupAverage from "./createGroupAverage";
import createGroupGoalkeeperAverage from "./createGroupGoalkeeperAverage";

export default function getPlayerDisplayedOverall(player) {
  const averages =
    player.position1 === "GK"
      ? createGroupGoalkeeperAverage(player.skills)
      : createGroupAverage(player.skills);

  return averages.overall;
}
