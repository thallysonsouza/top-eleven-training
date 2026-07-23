import { useState, useEffect } from "react";
import "./TeamModal.css";
import { ShieldPlus, X } from "lucide-react";
import FormField from "../../ui/FormField/FormField";

function TeamModal({ team, onClose, onSave }){
    const [name, setName] = useState("");
    const [level, setLevel] = useState("");
    useEffect(()=>{
        if(team){
            setName(team.name);
            setLevel(team.level);
        }else{
            setName("");
            setLevel("");
        }
    },[team]);
    function handleSave(){
        if(!name.trim()) return;
        onSave({
            ...team,
            name,
            level:Number(level) || 1,
            players:team?.players || [],
            formation:team?.formation || "",
            createdAt:team?.createdAt || new Date(),
            updatedAt:new Date()
        });
    }
    return(
        <div className="team-modal-overlay">
            <div className="team-modal">
                <div className="team-modal-header">
                    <div className="team-modal-title">
                        <ShieldPlus size={24}/>
                        <h2>
                            {
                                team
                                ? "Edit Team"
                                : "Create Team"
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
                <div className="team-modal-body">
                    <FormField
                        label="Team Name"
                        placeholder="Enter your team name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                    <FormField
                        label="Account Level"
                        type="number"
                        placeholder="Level"
                        value={level}
                        onChange={(e)=>setLevel(e.target.value)}
                    />
                </div>
                <div className="team-modal-footer">
                    <button
                        className="cancel-button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="create-button"
                        onClick={handleSave}
                    >
                        {
                            team
                            ? "Save Changes"
                            : "Create Team"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}
export default TeamModal;