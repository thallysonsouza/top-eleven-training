import "./SkillColumn.css";

function SkillColumn({ title, color, average, children }){
    return(
        <div className="skill-column">
            <div
                className={`skill-column-header ${color}`}
            >
                <span>{title}</span>
                <strong>
                    {average}
                </strong>
            </div>
            <div className="skill-column-body">
                {children}
            </div>
        </div>
    );
}
export default SkillColumn;