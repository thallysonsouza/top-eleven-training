import "./AuctionAnalyzerCard.css";

import { ClipboardList, Sparkles, ChevronRight } from "lucide-react";

function AuctionAnalyzerCard({ type, title, description, onClick }) {
  const isManual = type === "manual";

  const Icon = isManual ? ClipboardList : Sparkles;

  return (
    <button
      className={`auction-analyzer-card ${
        isManual
          ? "auction-analyzer-card-manual"
          : "auction-analyzer-card-smart"
      }`}
      onClick={onClick}
    >
      <div className="auction-analyzer-card-icon">
        <Icon size={28} />
      </div>

      <div className="auction-analyzer-card-content">
        <h2>{title}</h2>

        <p>{description}</p>
      </div>

      <div className="auction-analyzer-card-arrow">
        <ChevronRight size={20} />
      </div>
    </button>
  );
}

export default AuctionAnalyzerCard;
