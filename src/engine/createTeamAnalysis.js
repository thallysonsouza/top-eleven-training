import createGroupAverage from "./createGroupAverage";

const ATTACK_ROWS = [
    "ST",
    "AML",
    "AMC",
    "AMR"
];

const MIDFIELD_ROWS = [
    "AML",
    "AMC",
    "AMR",
    "ML",
    "MC",
    "MR",
    "DMC"
];

const DEFENSE_ROWS = [
    "DMC",
    "DL",
    "DC",
    "DR",
    "GK"
];

function getOverall(player){

    if(!player){

        return null;

    }

    return createGroupAverage(

        player.skills

    ).overall;

}

function calculateAverage(players){

    const values = players

        .map(getOverall)

        .filter(value => value !== null);

    if(values.length === 0){

        return 0;

    }

    const total = values.reduce(

        (sum, value) => sum + value,

        0

    );

    return Number(

        (total / values.length).toFixed(1)

    );

}

function getPlayers(lineup, positions){

    return Object.entries(lineup)

        .filter(([position])=>

            positions.includes(

                position.replace(/[0-9]/g,"")

            )

        )

        .map(([,player])=>player)

        .filter(Boolean);

}

export default function createTeamAnalysis(lineup){

    const attackPlayers = getPlayers(

        lineup,

        ATTACK_ROWS

    );

    const midfieldPlayers = getPlayers(

        lineup,

        MIDFIELD_ROWS

    );

    const defensePlayers = getPlayers(

        lineup,

        DEFENSE_ROWS

    );

    const allPlayers = Object.values(lineup)

        .filter(Boolean);

    const attack = calculateAverage(

        attackPlayers

    );

    const midfield = calculateAverage(

        midfieldPlayers

    );

    const defense = calculateAverage(

        defensePlayers

    );

    const overall = calculateAverage(

        allPlayers

    );

    const balance =

        Math.max(

            attack,

            midfield,

            defense

        )

        -

        Math.min(

            attack,

            midfield,

            defense

        );

    return{

        attack,

        midfield,

        defense,

        balance,

        overall,

        selectedPlayers:allPlayers.length

    };

}