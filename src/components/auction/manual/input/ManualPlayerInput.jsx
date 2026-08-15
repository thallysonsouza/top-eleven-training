import "./ManualPlayerInput.css";

import { UserRound } from "lucide-react";

import FormField from "../../../ui/FormField/FormField";

function ManualPlayerInput({
  accountLevel,
  age,
  overall,
  marketValue,
  onAccountLevelChange,
  onAgeChange,
  onOverallChange,
  onMarketValueChange,
}) {
  return (
    <section className="manual-player-input">
      <div className="manual-player-input-header">
        <div className="manual-player-input-icon">
          <UserRound size={20} />
        </div>

        <div>
          <h2>Player Input</h2>

          <p>Enter the player's auction information.</p>
        </div>
      </div>

      <div className="manual-player-input-fields">
        <FormField
          label="Account Level"
          type="number"
          placeholder="Enter account level"
          value={accountLevel}
          onChange={onAccountLevelChange}
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
          placeholder="Enter player OVR"
          value={overall}
          onChange={onOverallChange}
        />

        <FormField
          label="Market Value (M$)"
          type="number"
          min="0"
          step="0.01"
          placeholder="Enter market value"
          value={marketValue}
          onChange={onMarketValueChange}
        />
      </div>
    </section>
  );
}

export default ManualPlayerInput;
