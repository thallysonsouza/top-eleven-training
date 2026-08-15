import "./ManualAuctionContent.css";

import AuctionHeader from "../header/AuctionHeader";
import ManualAuctionManager from "./manager/ManualAuctionManager";

function ManualAuctionContent() {
  return (
    <main className="manual-auction-content">
      <AuctionHeader />

      <ManualAuctionManager />
    </main>
  );
}

export default ManualAuctionContent;
