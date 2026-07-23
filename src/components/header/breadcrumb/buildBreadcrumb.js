import { loadTeams } from "../../../services/teamStorage";

function addTeamBreadcrumb(items, team){

    items.push({

        label:"Teams",

        path:"/app/teams"

    });

    if(team){

        items.push({

            label:team.name,

            path:`/app/players/${team.id}`

        });

    }

}

export default function buildBreadcrumb(pathname){

    const pathnames = pathname
        .split("/")
        .filter(Boolean)
        .filter(path => path !== "app");

    const items = [

        {

            label:"Dashboard",

            path:"/app"

        }

    ];

    if(pathnames.length===0){

        return items;

    }

    const teams = loadTeams();

    switch(pathnames[0]){

        case "teams":{

            items.push({

                label:"Teams",

                path:"/app/teams"

            });

            break;

        }

        case "players":{

            const teamId = Number(pathnames[1]);

            const team = teams.find(

                item => item.id === teamId

            );

            addTeamBreadcrumb(items, team);

            items.push({

                label:"Players"

            });

            break;

        }

        case "player":{

            const teamId = Number(pathnames[1]);

            const playerId = Number(pathnames[2]);

            const team = teams.find(

                item => item.id === teamId

            );

            const player = team?.players?.find(

                item => item.id === playerId

            );

            addTeamBreadcrumb(items, team);

            items.push({

                label:"Players",

                path:`/app/players/${teamId}`

            });

            if(player){

                items.push({

                    label:player.name

                });

            }

            break;

        }

        case "lineup":{

            const teamId = Number(pathnames[1]);

            const team = teams.find(

                item => item.id === teamId

            );

            addTeamBreadcrumb(items, team);

            items.push({

                label:"Players",

                path:`/app/players/${teamId}`

            });

            items.push({

                label:"Lineup"

            });

            break;

        }

        default:{

            items.push({

                label:
                    pathnames[0]
                        .charAt(0)
                        .toUpperCase()
                        +
                    pathnames[0].slice(1)

            });

        }

    }

    return items;

}