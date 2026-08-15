import "./ManualAnalysisResult.css";

import { Gauge, Award, ThumbsUp, Coins } from "lucide-react";

function ManualAnalysisResult({
  score = 0,
  classification = "—",
  recommendation = "—",
  fairPrice = "—",
}) {
  const formattedScore =
    typeof score === "number" ? `${(score * 100).toFixed(1)}%` : "—";

  const formattedFairPrice =
    typeof fairPrice === "number" ? `${fairPrice.toFixed(2)} M$` : "—";

  return (
    <section className="manual-analysis-result">
      <div className="manual-analysis-result-header">
        <div className="manual-analysis-result-icon">
          <Gauge size={20} />
        </div>

        <div>
          <h2>Analysis Result</h2>

          <p>Evaluation based on the player's auction data.</p>
        </div>
      </div>

      <div className="manual-analysis-result-grid">
        <div className="analysis-result-item">
          <div className="analysis-result-label">
            <Gauge size={16} />

            <span>Score</span>
          </div>

          <strong className="analysis-result-score">{formattedScore}</strong>
        </div>

        <div className="analysis-result-item">
          <div className="analysis-result-label">
            <Award size={16} />

            <span>Classification</span>
          </div>

          <strong>{classification}</strong>
        </div>

        <div className="analysis-result-item">
          <div className="analysis-result-label">
            <ThumbsUp size={16} />

            <span>Recommendation</span>
          </div>

          <strong>{recommendation}</strong>
        </div>

        <div className="analysis-result-item">
          <div className="analysis-result-label">
            <Coins size={16} />

            <span>Fair Price</span>
          </div>

          <strong>{formattedFairPrice}</strong>
        </div>
      </div>
    </section>
  );
}

export default ManualAnalysisResult;
