import { getTeamById, updatePlayers } from "../../../../services/teamStorage";

export function increasePlayer(teamId, playerId){

    const team = getTeamById(teamId);

    if(!team) return;

    const players = team.players.map(player=>{

        if(player.id !== playerId){

            return player;

        }

        const newSkills = {};

        Object.entries(player.skills).forEach(([key,value])=>{

            newSkills[key] = Number(value) + 1;

        });

        return{

            ...player,

            skills:newSkills

        };

    });

    updatePlayers(teamId, players);

}

export function decreasePlayer(teamId, playerId){

    const team = getTeamById(teamId);

    if(!team) return;

    const players = team.players.map(player=>{

        if(player.id !== playerId){

            return player;

        }

        const newSkills = {};

        Object.entries(player.skills).forEach(([key,value])=>{

            newSkills[key] = Number(value) - 1;

        });

        return{

            ...player,

            skills:newSkills

        };

    });

    updatePlayers(teamId, players);

}