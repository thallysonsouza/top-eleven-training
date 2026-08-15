import { useMemo, useState } from "react";

import "./ManualAuctionManager.css";

import ManualPlayerInput from "../input/ManualPlayerInput";
import ManualAnalysisResult from "../result/ManualAnalysisResult";

import auctionEngine from "../../../../engine/auction/auctionEngine";

function ManualAuctionManager() {
  const [accountLevel, setAccountLevel] = useState("");
  const [age, setAge] = useState("");
  const [overall, setOverall] = useState("");
  const [marketValue, setMarketValue] = useState("");

  const analysis = useMemo(() => {
    if (!accountLevel || !age || !overall || !marketValue) {
      return {
        score: 0,
        classification: "—",
        recommendation: "—",
        fairPrice: "—",
      };
    }

    const result = auctionEngine({
      accountLevel,
      playerOverall: overall,
      marketValue,
      playerAge: age,
    });

    return {
      score: result.score,
      classification: result.classification,
      recommendation: result.recommendation,
      fairPrice: result.fairPrice,
    };
  }, [accountLevel, age, overall, marketValue]);

  return (
    <section className="manual-auction-manager">
      <div className="manual-auction-grid">
        <ManualPlayerInput
          accountLevel={accountLevel}
          age={age}
          overall={overall}
          marketValue={marketValue}
          onAccountLevelChange={(e) => setAccountLevel(e.target.value)}
          onAgeChange={(e) => setAge(e.target.value)}
          onOverallChange={(e) => setOverall(e.target.value)}
          onMarketValueChange={(e) => setMarketValue(e.target.value)}
        />

        <ManualAnalysisResult
          score={analysis.score}
          classification={analysis.classification}
          recommendation={analysis.recommendation}
          fairPrice={analysis.fairPrice}
        />
      </div>
    </section>
  );
}

export default ManualAuctionManager;
