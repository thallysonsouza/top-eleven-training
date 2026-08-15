import "./AnalysisCard.css";

function AnalysisCard({ title, children }) {
  return (
    <section className="analysis-card">
      <h2>{title}</h2>

      <div className="analysis-card-body">{children}</div>
    </section>
  );
}

export default AnalysisCard;
