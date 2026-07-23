const STORAGE_KEY = "te-tools.teams";

export function loadTeams(){

    try{

        const data = localStorage.getItem(STORAGE_KEY);

        return data ? JSON.parse(data) : [];

    }

    catch{

        return [];

    }

}

export function saveTeams(teams){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(teams)

    );

}

export function clearTeams(){

    localStorage.removeItem(STORAGE_KEY);

}

export function getTeamById(id){

    const teams = loadTeams();

    return teams.find(team=>String(team.id)===String(id));

}

export function updateTeam(updatedTeam){

    const teams = loadTeams();

    const newTeams = teams.map(team=>

        team.id===updatedTeam.id

            ? updatedTeam

            : team

    );

    saveTeams(newTeams);

}

export function deleteTeam(id){

    const teams = loadTeams();

    saveTeams(

        teams.filter(team=>team.id!==id)

    );

}

export function addPlayerToTeam(teamId, player){

    const teams = loadTeams();

    const updatedTeams = teams.map(team=>{

        if(String(team.id)!==String(teamId)){

            return team;

        }

        return{

            ...team,

            players:[

                ...team.players,

                {

                    ...player,

                    id:Date.now()

                }

            ],

            updatedAt:new Date()

        };

    });

    saveTeams(updatedTeams);

}

export function updatePlayers(teamId, players){

    const teams = loadTeams();

    const updatedTeams = teams.map(team=>{

        if(String(team.id)!==String(teamId)){

            return team;

        }

        return{

            ...team,

            players,

            updatedAt:new Date()

        };

    });

    saveTeams(updatedTeams);

}

export function getLineup(teamId){

    const team = getTeamById(teamId);

    return team?.lineup ?? null;

}

export function updateLineup(teamId, lineup){

    const teams = loadTeams();

    const updatedTeams = teams.map(team=>{

        if(String(team.id)!==String(teamId)){

            return team;

        }

        return{

            ...team,

            lineup,

            updatedAt:new Date()

        };

    });

    saveTeams(updatedTeams);

}