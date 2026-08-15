import "./AuctionAnalyzerGrid.css";

import AuctionAnalyzerCard from "../cards/AuctionAnalyzerCard";

function AuctionAnalyzerGrid({ onManual, onSmart }) {
  return (
    <section className="auction-analyzer-grid">
      <AuctionAnalyzerCard
        type="manual"
        title="Manual Auction Analyzer"
        description="Analyze auction players manually and evaluate their purchase potential."
        onClick={onManual}
      />

      <AuctionAnalyzerCard
        type="smart"
        title="Smart Auction Analyzer"
        description="Monitor auction opportunities and let the intelligent analyzer identify promising players."
        onClick={onSmart}
      />
    </section>
  );
}

export default AuctionAnalyzerGrid;
