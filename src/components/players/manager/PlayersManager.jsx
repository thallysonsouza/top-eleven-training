import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PlayerGrid from "../grid/PlayerGrid";
import PlayerModal from "../modal/PlayerModal";
import PlayerScanner from "../scanner/PlayerScanner";
import PlayerDetailsModal from "../details/PlayerDetailsModal";

import ConfirmDialog from "../../ui/ConfirmDialog/ConfirmDialog";

import { useToast } from "../../../context/ToastContext";

import { updatePlayers } from "../../../services/teamStorage";

import {
  createPlayer,
  editPlayer,
  deletePlayer,
  newSeason,
  undoSeason,
  toggleReviewed,
} from "../services/playerService";

import { scanPlayer } from "../scanner/services/scanner";

function PlayersManager({ team }) {
  const MAX_PLAYERS = 11;

  const { showToast } = useToast();

  const navigate = useNavigate();

  const [players, setPlayers] = useState(team.players || []);

  const [openModal, setOpenModal] = useState(false);

  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const [scannedPlayer, setScannedPlayer] = useState(null);

  const [playerToDelete, setPlayerToDelete] = useState(null);

  const [playerNewSeason, setPlayerNewSeason] = useState(null);

  const [playerUndoSeason, setPlayerUndoSeason] = useState(null);

  const [selectedDetailsPlayer, setSelectedDetailsPlayer] = useState(null);
  const [openScanner, setOpenScanner] = useState(false);

  useEffect(() => {
    setPlayers(team.players || []);
  }, [team]);

  useEffect(() => {
    updatePlayers(team.id, players);
  }, [players, team.id]);

  function handleCreate() {
    if (players.length >= MAX_PLAYERS) {
      showToast(`Maximum of ${MAX_PLAYERS} players reached.`, "warning");

      return;
    }

    setSelectedPlayer(null);

    setScannedPlayer(null);

    setOpenModal(true);
  }

  function handleOpenScanner() {
    setOpenScanner(true);
  }

  async function handleAnalyze(file) {
    try {
      console.log("1 - Analyze clicado");

      const playerData = await scanPlayer(file);

      console.log(playerData);

      setOpenScanner(false);
      setScannedPlayer(playerData);
      setSelectedPlayer(null);
      setOpenModal(true);
    } catch (error) {
      console.error("ERRO DO SCANNER:", error);
    }
  }

  function handleEdit(player) {
    setScannedPlayer(null);

    setSelectedPlayer(player);

    setOpenModal(true);
  }

  function handleSave(player) {
    if (player.id) {
      setPlayers((previous) => editPlayer(previous, player));

      showToast("Player updated successfully.", "success");
    } else {
      setPlayers((previous) => createPlayer(previous, player));

      showToast("Player created successfully.", "success");
    }

    setOpenModal(false);

    setSelectedPlayer(null);
  }

  function handleDelete(player) {
    setPlayerToDelete(player);
  }

  function handleNewSeason(player) {
    setPlayerNewSeason(player);
  }

  function handleUndoSeason(player) {
    setPlayerUndoSeason(player);
  }

  function handleToggleCheck(player) {
    setPlayers((previous) => toggleReviewed(previous, player.id));
  }

  function confirmDelete() {
    setPlayers((previous) => deletePlayer(previous, playerToDelete.id));

    showToast("Player deleted successfully.", "success");

    setPlayerToDelete(null);
  }

  function confirmNewSeason() {
    setPlayers((previous) => editPlayer(previous, newSeason(playerNewSeason)));

    showToast("New Season completed successfully.", "success");

    setPlayerNewSeason(null);
  }

  function confirmUndoSeason() {
    setPlayers((previous) =>
      editPlayer(previous, undoSeason(playerUndoSeason)),
    );

    showToast("Previous season restored successfully.", "success");

    setPlayerUndoSeason(null);
  }

  function handleOpen(player) {
    setSelectedDetailsPlayer(player);
  }

  function handleLineup() {
    navigate(`/app/lineup/${team.id}`);
  }

  return (
    <>
      <PlayerGrid
        players={players}
        onCreate={handleCreate}
        onOpen={handleOpen}
        onLineup={handleLineup}
        onEdit={handleEdit}
        onNewSeason={handleNewSeason}
        onUndoSeason={handleUndoSeason}
        onDelete={handleDelete}
        onToggleCheck={handleToggleCheck}
        onScan={handleOpenScanner}
      />

      {openModal && (
        <PlayerModal
          player={selectedPlayer}
          initialData={scannedPlayer}
          onClose={() => {
            setOpenModal(false);

            setSelectedPlayer(null);

            setScannedPlayer(null);
          }}
          onSave={handleSave}
        />
      )}

      {playerToDelete && (
        <ConfirmDialog
          title="Delete Player"
          message={`Are you sure you want to delete "${playerToDelete.name}"?`}
          confirmText="Delete Player"
          onCancel={() => setPlayerToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}

      {playerNewSeason && (
        <ConfirmDialog
          title="Start New Season"
          message={
            `Start a new season for "${playerNewSeason.name}"?\n\n` +
            `• Player age will increase by 1 year\n` +
            `• All 15 skills will decrease by 20`
          }
          confirmText="Start Season"
          onCancel={() => setPlayerNewSeason(null)}
          onConfirm={confirmNewSeason}
        />
      )}

      {playerUndoSeason && (
        <ConfirmDialog
          title="Undo Season"
          message={
            `Restore the previous season for "${playerUndoSeason.name}"?\n\n` +
            `• Player age will decrease by 1 year\n` +
            `• All 15 skills will increase by 20`
          }
          confirmText="Undo Season"
          onCancel={() => setPlayerUndoSeason(null)}
          onConfirm={confirmUndoSeason}
        />
      )}
      {selectedDetailsPlayer && (
        <PlayerDetailsModal
          team={team}
          player={selectedDetailsPlayer}
          onClose={() => setSelectedDetailsPlayer(null)}
        />
      )}

      {openScanner && (
        <PlayerScanner
          onClose={() => setOpenScanner(false)}
          onAnalyze={handleAnalyze}
        />
      )}
    </>
  );
}

export default PlayersManager;
