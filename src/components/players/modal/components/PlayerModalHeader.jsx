import { UserPlus, X } from "lucide-react";

function PlayerModalHeader({ player, onClose }){
    return(
        <div className="player-modal-header">
            <div className="player-modal-title">
                <UserPlus size={24}/>
                <h2>
                    {
                        player
                        ?
                        "Edit Player"
                        :
                        "Create Player"
                    }
                </h2>
            </div>
            <button
                className="close-button"
                onClick={onClose}
            >
                <X size={20}/>
            </button>
        </div>
    );
}
export default PlayerModalHeader;