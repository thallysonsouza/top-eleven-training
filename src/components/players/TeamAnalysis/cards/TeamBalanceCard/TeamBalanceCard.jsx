import "./TeamBalanceCard.css";

function TeamBalanceCard({ analysis }) {
  const { balance, averages } = analysis;

  return (
    <div className="team-balance-card">
      <h2>Team Balance</h2>

      <div className="team-balance-score">
        <span className="team-balance-value">{balance.overall.toFixed(1)}</span>

        <span className="team-balance-max">/10</span>
      </div>

      <div className="team-balance-divider"></div>

      <div className="team-balance-stats">
        <div className="team-balance-row">
          <span>Overall</span>

          <span>{averages.overall.toFixed(1)}</span>
        </div>

        <div className="team-balance-row">
          <span>Attack</span>

          <span>{averages.attack.toFixed(1)}</span>
        </div>

        <div className="team-balance-row">
          <span>Midfield</span>

          <span>{averages.midfield.toFixed(1)}</span>
        </div>

        <div className="team-balance-row">
          <span>Defense</span>

          <span>{averages.defense.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}

export default TeamBalanceCard;
