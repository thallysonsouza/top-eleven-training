import "./TeamAnalysis.css";

import {

    Swords,
    Orbit,
    Shield,
    Scale,
    Star

} from "lucide-react";

import AnalysisStat from "./AnalysisStat/AnalysisStat";
import AnalysisSummary from "./AnalysisSummary/AnalysisSummary";
import Requirements from "./Requirements/Requirements";

import createTeamAnalysis from "../../../../../engine/createTeamAnalysis";

function TeamAnalysis({

    lineup,

    formation="---"

}){

    const analysis = createTeamAnalysis(lineup);

    return(

        <aside className="team-analysis">

            <h2>

                TEAM ANALYSIS

            </h2>

            <div className="team-analysis-section">

                <AnalysisStat

                    icon={Swords}

                    label="Attack"

                    value={analysis.attack}

                />

                <AnalysisStat

                    icon={Orbit}

                    label="Midfield"

                    value={analysis.midfield}

                />

                <AnalysisStat

                    icon={Shield}

                    label="Defense"

                    value={analysis.defense}

                />

                <AnalysisStat

                    icon={Scale}

                    label="Balance"

                    value={analysis.balance}

                />

                <AnalysisStat

                    icon={Star}

                    label="Overall"

                    value={analysis.overall}

                />

            </div>

            <div className="team-analysis-divider"></div>

            <div className="team-analysis-section">

                <AnalysisSummary

                    formation={formation}

                    players={`${analysis.selectedPlayers} / 11`}

                />

            </div>

            <div className="team-analysis-divider"></div>

            <div className="team-analysis-section">

                <Requirements/>

            </div>

        </aside>

    );

}

export default TeamAnalysis;