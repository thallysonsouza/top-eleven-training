import "./PlayerDetails.css";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PlayerOverview from "./components/PlayerOverview/PlayerOverview";
import PlayerModal from "../modal/PlayerModal";
import ConfirmDialog from "../../ui/ConfirmDialog/ConfirmDialog";

import { loadTeams, updatePlayers } from "../../../services/teamStorage";

import createGroupAverage from "../../../engine/createGroupAverage";
import createTeamOverall from "../../../engine/createTeamOverall";
import createWhiteOverall from "../../../engine/createWhiteOverall";
import createTeamWhiteOverall from "../../../engine/createTeamWhiteOverall";

import {
    editPlayer,
    deletePlayer,
    newSeason,
    undoSeason
} from "../services/playerService";

import { useToast } from "../../../context/ToastContext";

function PlayerDetails() {

    const { teamId, playerId } = useParams();

    const navigate = useNavigate();

    const { showToast } = useToast();

    const [openModal, setOpenModal] = useState(false);

    const [confirmDelete, setConfirmDelete] = useState(false);

    const [confirmSeason, setConfirmSeason] = useState(false);

    const [confirmUndoSeason, setConfirmUndoSeason] = useState(false);

    const teams = loadTeams();

    const team = teams.find(
        item => item.id === Number(teamId)
    );

    if (!team) {

        return (
            <div className="player-details-message">
                Team not found.
            </div>
        );

    }

    const originalPlayer = team.players.find(
        item => item.id === Number(playerId)
    );

    const [player, setPlayer] = useState(originalPlayer);

    if (!player) {

        return (
            <div className="player-details-message">
                Player not found.
            </div>
        );

    }

    const averages = createGroupAverage(player.skills);

    const teamOverall = createTeamOverall(team);

    const teamWhiteOverall = createTeamWhiteOverall(team);

    const playerWhiteOverall = createWhiteOverall(player);

    function handleEdit() {

        setOpenModal(true);

    }

    function handleSave(updatedPlayer) {

        const updatedPlayers = editPlayer(
            team.players,
            updatedPlayer
        );

        updatePlayers(
            team.id,
            updatedPlayers
        );

        setPlayer(updatedPlayer);

        showToast(
            "Player updated successfully.",
            "success"
        );

        setOpenModal(false);

    }

    function handleDelete() {

        setConfirmDelete(true);

    }

    function handleNewSeason() {

        setConfirmSeason(true);

    }

    function handleUndoSeason() {

        setConfirmUndoSeason(true);

    }

    function confirmPlayerDelete() {

        const updatedPlayers = deletePlayer(
            team.players,
            player.id
        );

        updatePlayers(
            team.id,
            updatedPlayers
        );

        showToast(
            "Player deleted successfully.",
            "success"
        );

        navigate(`/app/players/${team.id}`);

    }

    function confirmNewSeason() {

        const updatedPlayer = newSeason(player);

        const updatedPlayers = editPlayer(
            team.players,
            updatedPlayer
        );

        updatePlayers(
            team.id,
            updatedPlayers
        );

        setPlayer(updatedPlayer);

        showToast(
            "New season started successfully.",
            "success"
        );

        setConfirmSeason(false);

    }

    function confirmUndoPlayerSeason() {

        const updatedPlayer = undoSeason(player);

        const updatedPlayers = editPlayer(
            team.players,
            updatedPlayer
        );

        updatePlayers(
            team.id,
            updatedPlayers
        );

        setPlayer(updatedPlayer);

        showToast(
            "Previous season restored successfully.",
            "success"
        );

        setConfirmUndoSeason(false);

    }

    return (

        <>

            <div className="player-details">

                <PlayerOverview
                    team={team}
                    player={player}
                    teamOverall={teamOverall}
                    teamWhiteOverall={teamWhiteOverall}
                    playerOverall={averages.overall}
                    playerWhiteOverall={playerWhiteOverall}
                    averages={averages}
                    onEdit={handleEdit}
                    onNewSeason={handleNewSeason}
                    onUndoSeason={handleUndoSeason}
                    onDelete={handleDelete}
                />

            </div>

            {openModal && (

                <PlayerModal
                    player={player}
                    onClose={() => setOpenModal(false)}
                    onSave={handleSave}
                />

            )}

            {confirmDelete && (

                <ConfirmDialog
                    title="Delete Player"
                    message={`Are you sure you want to delete "${player.name}"?`}
                    confirmText="Delete Player"
                    onCancel={() => setConfirmDelete(false)}
                    onConfirm={confirmPlayerDelete}
                />

            )}

            {confirmSeason && (

                <ConfirmDialog
                    title="Start New Season"
                    message={
                        `This will:\n\n` +
                        `• Increase player age by 1 year\n` +
                        `• Reduce all 15 attributes by 20 points\n\n` +
                        `This action cannot be undone.`
                    }
                    confirmText="Start Season"
                    onCancel={() => setConfirmSeason(false)}
                    onConfirm={confirmNewSeason}
                />

            )}

            {confirmUndoSeason && (

                <ConfirmDialog
                    title="Undo Season"
                    message={
                        `This will:\n\n` +
                        `• Decrease player age by 1 year\n` +
                        `• Increase all 15 attributes by 20 points`
                    }
                    confirmText="Undo Season"
                    onCancel={() => setConfirmUndoSeason(false)}
                    onConfirm={confirmUndoPlayerSeason}
                />

            )}

        </>

    );

}

export default PlayerDetails;