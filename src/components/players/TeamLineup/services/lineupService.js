export function removePlayer(lineup, position) {
  return {
    ...lineup,

    [position]: null,
  };
}
