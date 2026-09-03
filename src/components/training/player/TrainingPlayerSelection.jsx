import { useEffect, useState } from "react";

import {
  UserRound,
  ChevronDown,
  UsersRound,
  ArrowLeft,
  Eye,
} from "lucide-react";

import { useTrainingSimulator } from "../../../context/TrainingSimulatorContext";

import { loadTeams } from "../../../services/teamStorage";

import getPlayerDisplayedOverall from "../../../engine/getPlayerDisplayedOverall";

import PlayerDetailsModal from "../../players/details/PlayerDetailsModal";

import "./TrainingPlayerSelection.css";

/* ==================================================
   PLAYER POSITIONS
================================================== */

function getPlayerPositions(player) {
  return [player.position1, player.position2, player.position3].filter(
    (position) => position && position !== "---",
  );
}

/* ==================================================
   COMPONENT
================================================== */

function TrainingPlayerSelection() {
  const { selectedPlayer, selectPlayer } = useTrainingSimulator();

  /* ==================================================
     TEAMS
  ================================================== */

  const [teams, setTeams] = useState([]);

  const [selectedTeam, setSelectedTeam] = useState(null);

  /* ==================================================
     MENU STATE
  ================================================== */

  const [selectorOpen, setSelectorOpen] = useState(false);

  const [teamSelectionOpen, setTeamSelectionOpen] = useState(false);

  const [playerSelectionOpen, setPlayerSelectionOpen] = useState(false);

  /* ==================================================
     PLAYER DETAILS MODAL
  ================================================== */

  const [playerDetailsOpen, setPlayerDetailsOpen] = useState(false);

  /* ==================================================
     LOAD TEAMS
  ================================================== */

  useEffect(() => {
    refreshTeams();
  }, []);

  /* ==================================================
     REFRESH TEAMS
  ================================================== */

  function refreshTeams() {
    const storedTeams = loadTeams();

    const availableTeams = Array.isArray(storedTeams) ? storedTeams : [];

    setTeams(availableTeams);

    return availableTeams;
  }

  /* ==================================================
     MAIN SELECTOR
  ================================================== */

  function handlePlayerSelectorClick() {
    /*
     * Fecha os menus internos.
     */

    setTeamSelectionOpen(false);

    setPlayerSelectionOpen(false);

    /*
     * Alterna o menu principal.
     */

    setSelectorOpen((current) => !current);
  }

  /* ==================================================
     SELECT EXISTING PLAYER
  ================================================== */

  function handleSelectExistingPlayer() {
    const availableTeams = refreshTeams();

    setSelectorOpen(false);

    setPlayerSelectionOpen(false);

    setSelectedTeam(null);

    setTeamSelectionOpen(true);

    /*
     * Se não existirem times,
     * o próprio menu exibirá
     * a mensagem correspondente.
     */

    if (availableTeams.length === 0) {
      return;
    }
  }

  /* ==================================================
     SELECT TEAM
  ================================================== */

  function handleSelectTeam(team) {
    setSelectedTeam(team);

    setTeamSelectionOpen(false);

    setPlayerSelectionOpen(true);
  }

  /* ==================================================
     BACK TO TEAMS
  ================================================== */

  function handleBackToTeams() {
    setPlayerSelectionOpen(false);

    setSelectedTeam(null);

    const availableTeams = refreshTeams();

    if (availableTeams.length > 0) {
      setTeamSelectionOpen(true);
    } else {
      setSelectorOpen(true);
    }
  }

  /* ==================================================
     SELECT PLAYER
  ================================================== */

  function handleSelectPlayer(player) {
    if (!selectedTeam) {
      return;
    }

    const playerWithTeam = {
      ...player,

      teamId: selectedTeam.id,

      teamName: selectedTeam.name || "Unnamed Team",
    };

    selectPlayer(playerWithTeam);

    console.log(
      "[SIMULATOR] selectedPlayer enviado ao Context:",
      playerWithTeam,
    );
    /*
     * Mantemos o objeto completo
     * do time para o PlayerDetailsModal.
     */

    setSelectedTeam(selectedTeam);

    setPlayerSelectionOpen(false);

    setTeamSelectionOpen(false);

    setSelectorOpen(false);

    /*
     * Garante que um modal antigo
     * nunca permaneça aberto.
     */

    setPlayerDetailsOpen(false);
  }

  /* ==================================================
     TEAM PLAYER COUNT
  ================================================== */

  function getTeamPlayerCount(team) {
    return Array.isArray(team.players) ? team.players.length : 0;
  }

  /* ==================================================
     DISPLAY OVR
  ================================================== */

  function getDisplayedOverall(player) {
    const overall = getPlayerDisplayedOverall(player);

    return Number.isFinite(overall) ? overall.toFixed(1) : "—";
  }

  /* ==================================================
     OPEN PLAYER DETAILS
  ================================================== */

  function handleOpenPlayerDetails() {
    if (!selectedPlayer) {
      return;
    }

    /*
     * Sempre procuramos o time real
     * pelo teamId do jogador.
     *
     * Isso evita depender somente do
     * estado selectedTeam.
     */

    const availableTeams = loadTeams();

    const team = availableTeams.find(
      (item) => String(item.id) === String(selectedPlayer.teamId),
    );

    if (!team) {
      console.warn("Unable to find the team for the selected player.");

      return;
    }

    /*
     * Atualizamos o time atual
     * para garantir que o modal
     * receba o objeto completo.
     */

    setSelectedTeam(team);

    setPlayerDetailsOpen(true);
  }

  /* ==================================================
     CLOSE PLAYER DETAILS
  ================================================== */

  function handleClosePlayerDetails() {
    setPlayerDetailsOpen(false);
  }

  /* ==================================================
     RENDER
  ================================================== */

  return (
    <>
      <section className="training-player-selection">
        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="training-player-selection-header">
          <div className="training-player-selection-title">
            <div className="training-player-selection-icon">
              <UserRound size={18} />
            </div>

            <div>
              <small>PLAYER</small>

              <h2>Select Player</h2>
            </div>
          </div>

          {/* ==================================================
              HEADER ACTIONS
          ================================================== */}

          <div className="training-player-selection-header-actions">
            {selectedPlayer && (
              <button
                type="button"
                className="training-player-selection-view"
                onClick={handleOpenPlayerDetails}
                title="View Player"
              >
                <Eye size={14} />
              </button>
            )}

            <span className="training-player-selection-status">
              {selectedPlayer ? "Selected" : "Not selected"}
            </span>
          </div>
        </div>

        {/* ==================================================
            PLAYER ROW
        ================================================== */}

        <div className="training-player-selection-main">
          {/* ==================================================
              PLAYER SELECTOR
          ================================================== */}

          <div className="training-player-selection-selector">
            <button
              type="button"
              className={`training-player-selection-button ${
                selectorOpen || teamSelectionOpen || playerSelectionOpen
                  ? "open"
                  : ""
              }`}
              onClick={handlePlayerSelectorClick}
            >
              <div className="training-player-selection-button-content">
                <strong>
                  {selectedPlayer ? selectedPlayer.name : "Select a player"}
                </strong>

                <span>
                  {selectedPlayer
                    ? "Click to change player"
                    : "Select an existing player"}
                </span>
              </div>

              <ChevronDown size={17} />
            </button>

            {/* ==================================================
                PLAYER SOURCE
            ================================================== */}

            {selectorOpen && (
              <div className="training-player-selection-mode-menu">
                <div className="training-player-selection-dropdown-title">
                  PLAYER
                </div>

                <button
                  type="button"
                  className="training-player-selection-mode-option"
                  onClick={handleSelectExistingPlayer}
                >
                  <div className="training-player-selection-mode-icon">
                    <UsersRound size={16} />
                  </div>

                  <div>
                    <strong>Select Existing Player</strong>

                    <span>Choose a player from one of your teams.</span>
                  </div>
                </button>
              </div>
            )}

            {/* ==================================================
                TEAM SELECTION
            ================================================== */}

            {teamSelectionOpen && (
              <div className="training-player-selection-dropdown">
                <div className="training-player-selection-dropdown-title">
                  SELECT TEAM
                </div>

                {teams.length === 0 ? (
                  <div className="training-player-selection-empty">
                    <UsersRound size={18} />

                    <strong>No teams found</strong>

                    <span>
                      Create a team and add players before using the Training
                      Simulator.
                    </span>
                  </div>
                ) : (
                  teams.map((team) => (
                    <button
                      type="button"
                      key={team.id}
                      className={`training-player-selection-team-option ${
                        selectedTeam?.id === team.id ? "selected" : ""
                      }`}
                      onClick={() => handleSelectTeam(team)}
                    >
                      <div className="training-player-selection-team-info">
                        <strong>{team.name || "Unnamed Team"}</strong>

                        <span>
                          {getTeamPlayerCount(team)}{" "}
                          {getTeamPlayerCount(team) === 1
                            ? "player"
                            : "players"}
                        </span>
                      </div>

                      <ChevronDown size={16} />
                    </button>
                  ))
                )}
              </div>
            )}

            {/* ==================================================
                PLAYER SELECTION
            ================================================== */}

            {playerSelectionOpen && selectedTeam && (
              <div className="training-player-selection-dropdown">
                <div className="training-player-selection-dropdown-header">
                  <button
                    type="button"
                    onClick={handleBackToTeams}
                    title="Back to teams"
                  >
                    <ArrowLeft size={14} />
                  </button>

                  <div>
                    <span>SELECT PLAYER</span>

                    <strong>{selectedTeam.name || "Unnamed Team"}</strong>
                  </div>
                </div>

                {Array.isArray(selectedTeam.players) &&
                selectedTeam.players.length > 0 ? (
                  selectedTeam.players.map((player) => {
                    const positions = getPlayerPositions(player);

                    return (
                      <button
                        type="button"
                        key={player.id}
                        className={`training-player-selection-option ${
                          selectedPlayer?.id === player.id &&
                          selectedPlayer?.teamId === selectedTeam.id
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => handleSelectPlayer(player)}
                      >
                        <div>
                          <strong>{player.name || "Unnamed Player"}</strong>

                          <span>
                            {positions.length > 0
                              ? positions.join(" / ")
                              : "No position"}{" "}
                            · Age {player.age ?? "—"}
                          </span>
                        </div>

                        <strong>{getDisplayedOverall(player)}</strong>
                      </button>
                    );
                  })
                ) : (
                  <div className="training-player-selection-empty">
                    <UsersRound size={18} />

                    <strong>No players found</strong>

                    <span>This team does not have any players yet.</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ==================================================
              OVR
          ================================================== */}

          {selectedPlayer && (
            <div className="training-player-selection-ovr">
              <span>OVR</span>

              <strong>{getDisplayedOverall(selectedPlayer)}</strong>
            </div>
          )}
        </div>
      </section>

      {/* ==================================================
          PLAYER DETAILS MODAL
      ================================================== */}

      {playerDetailsOpen && selectedPlayer && selectedTeam && (
        <PlayerDetailsModal
          team={selectedTeam}
          player={selectedPlayer}
          onClose={handleClosePlayerDetails}
        />
      )}
    </>
  );
}

export default TrainingPlayerSelection;
