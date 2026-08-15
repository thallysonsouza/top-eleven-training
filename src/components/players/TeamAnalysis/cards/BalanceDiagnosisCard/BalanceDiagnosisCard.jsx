import "./BalanceDiagnosisCard.css";

function BalanceDiagnosisCard({ analysis }) {
  const { recommendation } = analysis;

  console.log(recommendation);

  const { weakSector, weakPlayer, suggestedOverall } = recommendation;

  return (
    <div className="balance-diagnosis-card">
      <h2>Balance Diagnosis</h2>

      <div className="balance-diagnosis-score">
        <span className="balance-diagnosis-current">
          {suggestedOverall.currentBalance.toFixed(1)}
        </span>

        <span className="balance-diagnosis-arrow">→</span>

        <span className="balance-diagnosis-next">
          {suggestedOverall.expectedBalance.toFixed(1)}
        </span>
      </div>

      <div className="balance-diagnosis-divider"></div>

      <div className="balance-diagnosis-stats">
        <div className="balance-diagnosis-row">
          <span>Weak Sector</span>

          <span>{weakSector}</span>
        </div>

        <div className="balance-diagnosis-row">
          <span>Weak Link</span>

          <span>
            {weakPlayer ? weakPlayer.position.replace(/[0-9]/g, "") : "---"}
          </span>
        </div>

        <div className="balance-diagnosis-row">
          <span>Suggested OVR</span>

          <span>
            {suggestedOverall.current.toFixed(1)}
            {" → "}
            {suggestedOverall.target.toFixed(1)}
          </span>
        </div>

        <div className="balance-diagnosis-row">
          <span>Expected Balance</span>

          <span>+{suggestedOverall.gain.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}

export default BalanceDiagnosisCard;
