import { useNavigate } from "react-router-dom";

import AuctionAnalyzerGrid from "../grid/AuctionAnalyzerGrid";

function AuctionManager() {
  const navigate = useNavigate();

  function handleManual() {
    navigate("/app/auction/manual");
  }

  function handleSmart() {
    navigate("/app/auction/smart");
  }

  return <AuctionAnalyzerGrid onManual={handleManual} onSmart={handleSmart} />;
}

export default AuctionManager;
