import "./SmartAnalysisResult.css";

import { Gauge, Award, ThumbsUp, Coins, MapPin } from "lucide-react";

function SmartAnalysisResult({
  position = "",
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
    <section className="smart-analysis-result">
      <div className="smart-analysis-result-header">
        <div className="smart-analysis-result-icon">
          <Gauge size={20} />
        </div>

        <div>
          <h2>Analysis Result</h2>

          <p>Evaluation based on the player's auction data.</p>
        </div>
      </div>

      <div className="smart-analysis-result-grid">
        {/* POSITION */}

        <div className="smart-analysis-result-item">
          <div className="smart-analysis-result-label">
            <MapPin size={16} />

            <span>Position</span>
          </div>

          <strong>{position || "—"}</strong>
        </div>

        {/* SCORE */}

        <div className="smart-analysis-result-item">
          <div className="smart-analysis-result-label">
            <Gauge size={16} />

            <span>Score</span>
          </div>

          <strong className="smart-analysis-result-score">
            {formattedScore}
          </strong>
        </div>

        {/* CLASSIFICATION */}

        <div className="smart-analysis-result-item">
          <div className="smart-analysis-result-label">
            <Award size={16} />

            <span>Classification</span>
          </div>

          <strong>{classification}</strong>
        </div>

        {/* RECOMMENDATION */}

        <div className="smart-analysis-result-item">
          <div className="smart-analysis-result-label">
            <ThumbsUp size={16} />

            <span>Recommendation</span>
          </div>

          <strong>{recommendation}</strong>
        </div>

        {/* FAIR PRICE */}

        <div className="smart-analysis-result-item">
          <div className="smart-analysis-result-label">
            <Coins size={16} />

            <span>Fair Price</span>
          </div>

          <strong>{formattedFairPrice}</strong>
        </div>
      </div>
    </section>
  );
}

export default SmartAnalysisResult;
