import getPlayerOverall from "../../../../../../engine/getPlayerOverall";

function getOverall(player) {
  return getPlayerOverall(player);
}

export default function getSectorPlayers(lineup) {
  const defense = [];

  const midfield = [];

  const attack = [];

  const all = [];

  function add(position, sectorList) {
    const player = lineup[position];

    if (!player) {
      return;
    }

    const overall = getOverall(player);

    const item = {
      player,

      overall,

      position,
    };

    sectorList.push(item);

    all.push(item);
  }

  // DEFENSE

  add("GK", defense);

  add("DL", defense);

  add("DC1", defense);
  add("DC2", defense);
  add("DC3", defense);

  add("DR", defense);

  add("DMC1", defense);
  add("DMC2", defense);
  add("DMC3", defense);

  // MIDFIELD

  add("DMC1", midfield);
  add("DMC2", midfield);
  add("DMC3", midfield);

  add("ML", midfield);

  add("MC1", midfield);
  add("MC2", midfield);
  add("MC3", midfield);

  add("MR", midfield);

  add("AML", midfield);

  add("AMC1", midfield);
  add("AMC2", midfield);
  add("AMC3", midfield);

  add("AMR", midfield);

  // ATTACK

  add("AML", attack);

  add("AMC1", attack);
  add("AMC2", attack);
  add("AMC3", attack);

  add("AMR", attack);

  add("ST1", attack);
  add("ST2", attack);
  add("ST3", attack);

  return {
    defense,
    midfield,
    attack,
    all,
  };
}
