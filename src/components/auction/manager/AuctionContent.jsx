import "./AuctionContent.css";

import AuctionHeader from "../header/AuctionHeader";
import AuctionManager from "./AuctionManager";

function AuctionContent() {
  return (
    <main className="auction-content">
      <AuctionHeader />

      <AuctionManager />
    </main>
  );
}

export default AuctionContent;
