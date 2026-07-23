import { useEffect, useState } from "react";

import TeamGrid from "../grid/TeamGrid";
import TeamModal from "../modal/TeamModal";

import ConfirmDialog from "../../ui/ConfirmDialog/ConfirmDialog";

import { useNavigate } from "react-router-dom";

import {
    loadTeams,
    saveTeams
} from "../../../services/teamStorage";

import { useToast } from "../../../context/ToastContext";

function TeamsManager() {

    const [teamUndoSeason, setTeamUndoSeason] = useState(null);

    const MAX_TEAMS = 12;

    const { showToast } = useToast();

    const [teams, setTeams] = useState(loadTeams);

    const [openModal, setOpenModal] = useState(false);

    const [selectedTeam, setSelectedTeam] = useState(null);

    const [teamToDelete, setTeamToDelete] = useState(null);

    const [teamNewSeason, setTeamNewSeason] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        saveTeams(teams);

    }, [teams]);

    function handleCreate() {

        if (teams.length >= MAX_TEAMS) {

            showToast(
                `Maximum of ${MAX_TEAMS} teams reached.`,
                "warning"
            );

            return;

        }

        setSelectedTeam(null);

        setOpenModal(true);

    }

    function handleEdit(team) {

        setSelectedTeam(team);

        setOpenModal(true);

    }

    function handleOpen(team) {

        navigate(`/app/players/${team.id}`);

    }

    function handleNewSeason(team){

        setTeamNewSeason(team);

    }

    function handleUndoSeason(team){

        setTeamUndoSeason(team);

    }

    function handleSave(team) {

        if (team.id) {

            setTeams(previous =>

                previous.map(item =>

                    item.id === team.id

                        ? {
                            ...team,
                            updatedAt: new Date()
                        }

                        : item

                )

            );

            showToast(
                "Team updated successfully.",
                "success"
            );

        }

        else {

            setTeams(previous => [

                ...previous,

                {
                    ...team,
                    id: Date.now(),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }

            ]);

            showToast(
                "Team created successfully.",
                "success"
            );

        }

        setOpenModal(false);

        setSelectedTeam(null);

    }

    function handleDelete(team) {

        setTeamToDelete(team);

    }

    function confirmDelete() {

        setTeams(previous =>

            previous.filter(team =>

                team.id !== teamToDelete.id

            )

        );

        showToast(
            "Team deleted successfully.",
            "success"
        );

        setTeamToDelete(null);

    }

    function confirmNewSeason(){

        setTeams(previous =>

            previous.map(team =>{

                if(team.id !== teamNewSeason.id){

                    return team;

                }

                return{

                    ...team,

                    level: team.level + 1,

                    updatedAt:new Date(),

                    players:team.players.map(player=>({

                        ...player,

                        age:player.age + 1,

                        skills:Object.fromEntries(

                            Object.entries(player.skills).map(

                                ([key,value])=>[

                                    key,

                                    value - 20

                                ]

                            )

                        )

                    }))

                };

            })

        );

        showToast(

            "New Season completed successfully.",

            "success"

        );

        setTeamNewSeason(null);

    }

    function confirmUndoSeason(){

        setTeams(previous =>

            previous.map(team=>{

                if(team.id !== teamUndoSeason.id){

                    return team;

                }

                return{

                    ...team,

                    level: Math.max(1, team.level - 1),

                    updatedAt:new Date(),

                    players:team.players.map(player=>({

                        ...player,

                        age: Math.max(18, player.age - 1),

                        skills:Object.fromEntries(

                            Object.entries(player.skills).map(

                                ([key,value])=>[

                                    key,

                                    value + 20

                                ]

                            )

                        )

                    }))

                };

            })

        );

        showToast(

            "Season reverted successfully.",

            "success"

        );

        setTeamUndoSeason(null);

    }

    return (

        <>

            <TeamGrid

                teams={teams}

                onCreate={handleCreate}

                onEdit={handleEdit}

                onNewSeason={handleNewSeason}

                onUndoSeason={handleUndoSeason}

                onDelete={handleDelete}

                onSelect={handleOpen}

            />

            {

                openModal &&

                <TeamModal

                    team={selectedTeam}

                    onClose={() => {

                        setOpenModal(false);

                        setSelectedTeam(null);

                    }}

                    onSave={handleSave}

                />

            }

            {

                teamToDelete &&

                <ConfirmDialog

                    title="Delete Team"

                    message={`Are you sure you want to delete "${teamToDelete.name}"?`}

                    confirmText="Delete Team"

                    onCancel={() => setTeamToDelete(null)}

                    onConfirm={confirmDelete}

                />

            }

            {
                teamNewSeason &&

                <ConfirmDialog

                    title="Start New Season"

                    message={`Start a new season for "${teamNewSeason.name}"?

            • All players will become 1 year older.
            • All 15 skills will decrease by 20.
            • Team level will increase by 1.`}

                    confirmText="Start Season"

                    onCancel={() => setTeamNewSeason(null)}

                    onConfirm={confirmNewSeason}

                />

            }

            {
                teamUndoSeason &&

                <ConfirmDialog

                    title="Undo Season"

                    message={`Undo the last season for "${teamUndoSeason.name}"?

            • All players will become 1 year younger.
            • All 15 skills will increase by 20.
            • Team level will decrease by 1.`}

                    confirmText="Undo Season"

                    onCancel={() => setTeamUndoSeason(null)}

                    onConfirm={confirmUndoSeason}

                />

            }

        </>

    );

}

export default TeamsManager;