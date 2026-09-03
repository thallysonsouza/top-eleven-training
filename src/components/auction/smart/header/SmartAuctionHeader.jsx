import "./SmartAuctionHeader.css";

import { ChevronLeft, ChevronRight } from "lucide-react";

import IconButton from "../../../ui/Button/IconButton";

function SmartAuctionHeader({
  onPrevious,
  onNext,
  previousDisabled = false,
  nextDisabled = false,
}) {
  return (
    <section className="smart-auction-header">
      <h1>Smart Auction Analyzer</h1>

      <div className="smart-auction-header-navigation">
        <IconButton
          variant="secondary"
          title="Previous"
          onClick={onPrevious}
          disabled={previousDisabled}
        >
          <ChevronLeft size={18} />
        </IconButton>

        <IconButton
          variant="secondary"
          title="Next"
          onClick={onNext}
          disabled={nextDisabled}
        >
          <ChevronRight size={18} />
        </IconButton>
      </div>
    </section>
  );
}

export default SmartAuctionHeader;
