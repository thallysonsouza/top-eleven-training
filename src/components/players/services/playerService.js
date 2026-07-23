export function createPlayer(players, player){

    return [

        ...players,

        {

            ...player,

            id: Date.now()

        }

    ];

}

export function editPlayer(players, updatedPlayer){

    return players.map(player=>

        player.id===updatedPlayer.id

            ? updatedPlayer

            : player

    );

}

export function deletePlayer(players, playerId){

    return players.filter(player=>

        player.id!==playerId

    );

}

export function newSeason(player){

    const updatedSkills={};

    Object.entries(player.skills).forEach(

        ([attribute,value])=>{

            updatedSkills[attribute]=Number(value)-20;

        }

    );

    return{

        ...player,

        age:Number(player.age)+1,

        skills:updatedSkills

    };

}

export function undoSeason(player){

    const updatedSkills = {};

    Object.entries(player.skills).forEach(

        ([attribute, value]) => {

            updatedSkills[attribute] = Number(value) + 20;

        }

    );

    return {

        ...player,

        age: Number(player.age) - 1,

        skills: updatedSkills

    };

}

export function toggleReviewed(players, playerId){

    return players.map(player=>{

        if(player.id !== playerId){

            return player;

        }

        return{

            ...player,

            reviewed: !player.reviewed

        };

    });

}