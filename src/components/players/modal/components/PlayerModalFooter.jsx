import { ArrowLeft, ArrowRight } from "lucide-react";

function PlayerModalFooter({ step, totalSteps, player, onBack, onNext, onClose, onSave}){
    return(
        <div className="player-modal-footer">
            <div className="footer-left">
                {
                    step > 1 &&
                    <button
                        className="cancel-button"
                        onClick={onBack}
                    >
                        <ArrowLeft size={18}/>
                        Back
                    </button>
                }
            </div>
            <div className="footer-right">
                <button
                    className="cancel-button"
                    onClick={onClose}
                >
                    Cancel
                </button>
                {
                    step < totalSteps
                    ?
                    <button
                        className="create-button"
                        onClick={onNext}
                    >
                        Next
                        <ArrowRight size={18}/>
                    </button>
                    :
                    <button
                        className="create-button"
                        onClick={onSave}
                    >
                        {
                            player
                            ?
                            "Save Changes"
                            :
                            "Create Player"
                        }
                    </button>
                }
            </div>
        </div>
    );
}
export default PlayerModalFooter;