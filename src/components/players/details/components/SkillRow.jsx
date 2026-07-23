import "./SkillRow.css";

function SkillRow({ label, value, isKey, color }){
    return(
        <div className="skill-row">
            <span
                className={
                    isKey
                        ? `skill-name key-skill ${color}`
                        : "skill-name"
                }
            >
                {label}
            </span>
            <span
                className={
                    isKey
                        ? `skill-value key-value ${color}`
                        : "skill-value"
                }
            >
                {value || "--"}
            </span>
        </div>
    );
}
export default SkillRow;