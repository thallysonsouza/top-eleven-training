import "./AnalysisSummary.css";

function AnalysisSummary({

    formation,
    players

}){

    return(

        <div className="analysis-summary">

            <div className="analysis-summary-row">

                <span>

                    Formation

                </span>

                <strong>

                    {formation}

                </strong>

            </div>

            <div className="analysis-summary-row">

                <span>

                    Players

                </span>

                <strong>

                    {players}

                </strong>

            </div>

        </div>

    );

}

export default AnalysisSummary;