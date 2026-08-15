import "./TeamAnalysis.css";

import TeamAnalysisHeader from "./TeamAnalysisHeader";

import TeamBalanceCard from "./cards/TeamBalanceCard/TeamBalanceCard";
import BalanceDiagnosisCard from "./cards/BalanceDiagnosisCard/BalanceDiagnosisCard";

function TeamAnalysis({ analysis }) {
  return (
    <section className="team-analysis">
      <TeamAnalysisHeader />

      <div className="team-analysis-grid">
        <TeamBalanceCard analysis={analysis} />

        <BalanceDiagnosisCard analysis={analysis} />
      </div>
    </section>
  );
}

export default TeamAnalysis;
