import "./AnalysisStat.css";

function AnalysisStat({

    icon: Icon,
    label,
    value

}){

    return(

        <div className="analysis-stat">

            <div className="analysis-stat-left">

                <Icon size={18}/>

                <span>

                    {label}

                </span>

            </div>

            <strong>

                {value}

            </strong>

        </div>

    );

}

export default AnalysisStat;