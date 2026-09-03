import "./SmartPlayerInput.css";

import { UserRound } from "lucide-react";

import FormField from "../../../ui/FormField/FormField";

function SmartPlayerInput({
  position,
  age,
  overall,
  marketValue,
  onPositionChange,
  onAgeChange,
  onOverallChange,
  onMarketValueChange,
}) {
  return (
    <section className="smart-player-input">
      <div className="smart-player-input-header">
        <div className="smart-player-input-icon">
          <UserRound size={20} />
        </div>

        <div>
          <h2>Player Data</h2>

          <p>Player information detected from the auction.</p>
        </div>
      </div>

      <div className="smart-player-input-fields">
        <FormField
          label="Position"
          type="text"
          placeholder="ML, MC, ST..."
          value={position}
          onChange={onPositionChange}
        />

        <FormField
          label="Age"
          type="number"
          min="18"
          max="21"
          step="1"
          placeholder="18 - 21"
          value={age}
          onChange={onAgeChange}
        />

        <FormField
          label="Overall"
          type="number"
          min="1"
          step="1"
          placeholder="Player OVR"
          value={overall}
          onChange={onOverallChange}
        />

        <FormField
          label="Market Value (M$)"
          type="number"
          min="0"
          step="0.01"
          placeholder="e.g. 2.14"
          value={marketValue}
          onChange={onMarketValueChange}
        />
      </div>
    </section>
  );
}

export default SmartPlayerInput;
