import "./SmartAuctionContent.css";

import SmartAuctionHeader from "./header/SmartAuctionHeader";

function SmartAuctionContent({
  children,
  onPrevious,
  onNext,
  previousDisabled = false,
  nextDisabled = false,
}) {
  return (
    <main className="smart-auction-content">
      <SmartAuctionHeader
        onPrevious={onPrevious}
        onNext={onNext}
        previousDisabled={previousDisabled}
        nextDisabled={nextDisabled}
      />

      <section className="smart-auction-content-body">{children}</section>
    </main>
  );
}

export default SmartAuctionContent;
