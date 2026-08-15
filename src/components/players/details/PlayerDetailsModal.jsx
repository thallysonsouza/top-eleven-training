import "./PlayerDetailsModal.css";

import { X } from "lucide-react";

import IconButton from "../../ui/Button/IconButton";
import PlayerDetails from "./PlayerDetails";

function PlayerDetailsModal({
  team,

  player,

  onClose,
}) {
  return (
    <div className="player-details-overlay" onClick={onClose}>
      <div
        className="player-details-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <IconButton
          className="player-details-close"
          variant="secondary"
          title="Close"
          onClick={onClose}
        >
          <X size={18} />
        </IconButton>

        <PlayerDetails team={team} player={player} onClose={onClose} />
      </div>
    </div>
  );
}

export default PlayerDetailsModal;
