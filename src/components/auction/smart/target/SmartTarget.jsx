import { useState } from "react";

import { Target, Check, RotateCcw, ChevronDown } from "lucide-react";

import { position } from "../../../../constants/position";

import { useSmartAuction } from "../../../../context/SmartAuctionContext";

import "./SmartTarget.css";

const CLASSIFICATIONS = [
  "FENÔMENO",
  "EXCELENTE",
  "ÓTIMO",
  "BOM",
  "NORMAL",
  "RUIM",
];

function SmartTarget() {
  const {
    targetRequirements,
    updateTargetRequirements,
    resetTargetRequirements,
  } = useSmartAuction();

  /* =========================
     LOCAL EDITING STATE
  ========================= */

  const [accountLevel, setAccountLevel] = useState(
    targetRequirements.accountLevel,
  );

  const [maxAge, setMaxAge] = useState(targetRequirements.maxAge);

  const [selectedPositions, setSelectedPositions] = useState(
    targetRequirements.positions,
  );

  const [allowMixedPositions, setAllowMixedPositions] = useState(
    targetRequirements.allowMixedPositions,
  );

  const [minimumClassification, setMinimumClassification] = useState(
    targetRequirements.minimumClassification,
  );

  const [minimumOverall, setMinimumOverall] = useState(
    targetRequirements.minimumOverall,
  );

  const [toast, setToast] = useState(null);

  /* =========================
     TOAST
  ========================= */

  function showToast(message) {
    setToast(message);

    setTimeout(() => {
      setToast(null);
    }, 2500);
  }

  /* =========================
     POSITION
  ========================= */

  function handlePositionToggle(selectedPosition) {
    setSelectedPositions((currentPositions) => {
      if (currentPositions.includes(selectedPosition)) {
        return currentPositions.filter((item) => item !== selectedPosition);
      }

      return [...currentPositions, selectedPosition];
    });
  }

  /* =========================
     SAVE
  ========================= */

  function handleSave() {
    const requirements = {
      accountLevel: Number(accountLevel),

      maxAge: Number(maxAge),

      positions: selectedPositions,

      allowMixedPositions,

      minimumClassification,

      minimumOverall: Number(minimumOverall),
    };

    updateTargetRequirements(requirements);

    showToast("Target saved successfully");

    console.log("Smart Target saved:", requirements);
  }

  /* =========================
     RESET
  ========================= */

  function handleReset() {
    resetTargetRequirements();

    setAccountLevel("");

    setMaxAge(20);

    setSelectedPositions([]);

    setAllowMixedPositions(true);

    setMinimumClassification("ÓTIMO");

    setMinimumOverall(60);

    showToast("Target reset");
  }

  /* =========================
     VALIDATION
  ========================= */

  const isConfigured =
    Number(accountLevel) >= 1 &&
    selectedPositions.length > 0 &&
    Number(maxAge) >= 18 &&
    Number(maxAge) <= 21 &&
    Number(minimumOverall) >= 0;

  return (
    <section className="smart-target">
      {/* =========================
          HEADER
      ========================= */}

      <div className="smart-target-header">
        <div className="smart-target-title">
          <div className="smart-target-icon">
            <Target size={20} />
          </div>

          <div>
            <small>SMART TARGET</small>

            <h2>Player Requirements</h2>

            <p>Configure the player profile you want the scanner to find.</p>
          </div>
        </div>

        {/* ACTIONS */}

        <div className="smart-target-header-actions">
          <button
            type="button"
            className="smart-target-reset"
            onClick={handleReset}
          >
            <RotateCcw size={16} />
            Reset
          </button>

          <button
            type="button"
            className="smart-target-save"
            disabled={!isConfigured}
            onClick={handleSave}
          >
            <Check size={16} />
            Save Target
          </button>
        </div>
      </div>

      {/* =========================
          REQUIREMENTS
      ========================= */}

      <div className="smart-target-card">
        {/* ACCOUNT LEVEL */}

        <div className="smart-target-field">
          <label htmlFor="smart-target-account-level">Account Level</label>

          <div className="smart-target-input-wrapper">
            <input
              id="smart-target-account-level"
              type="number"
              min="1"
              step="1"
              placeholder="Account level"
              value={accountLevel}
              onChange={(event) => setAccountLevel(event.target.value)}
            />

            <span>LEVEL</span>
          </div>

          <small>Enter the level of your Top Eleven account.</small>
        </div>

        {/* AGE */}

        <div className="smart-target-field">
          <label htmlFor="smart-target-age">Maximum Age</label>

          <div className="smart-target-input-wrapper">
            <input
              id="smart-target-age"
              type="number"
              min="18"
              max="21"
              step="1"
              value={maxAge}
              onChange={(event) => setMaxAge(event.target.value)}
            />

            <span>years</span>
          </div>

          <small>Players aged 18 to {maxAge || "—"} will be accepted.</small>
        </div>

        {/* OVERALL */}

        <div className="smart-target-field">
          <label htmlFor="smart-target-overall">Maximum OVR</label>

          <div className="smart-target-input-wrapper">
            <input
              id="smart-target-overall"
              type="number"
              min="0"
              max="250"
              step="1"
              value={minimumOverall}
              onChange={(event) => setMinimumOverall(event.target.value)}
            />

            <span>OVR</span>
          </div>

          <small>The player must have this OVR or lower.</small>
        </div>

        {/* CLASSIFICATION */}

        <div className="smart-target-field">
          <label htmlFor="smart-target-classification">
            Minimum Classification
          </label>

          <div className="smart-target-select-wrapper">
            <select
              id="smart-target-classification"
              value={minimumClassification}
              onChange={(event) => setMinimumClassification(event.target.value)}
            >
              {CLASSIFICATIONS.map((classification) => (
                <option key={classification} value={classification}>
                  {classification}
                </option>
              ))}
            </select>

            <ChevronDown size={16} />
          </div>

          <small>
            Classifications at or above the selected level will be accepted.
          </small>
        </div>
      </div>

      {/* =========================
          POSITIONS
      ========================= */}

      <div className="smart-target-section">
        <div className="smart-target-section-header">
          <div>
            <h3>Positions</h3>

            <p>Select one or more positions the player must have.</p>
          </div>

          <span>{selectedPositions.length} selected</span>
        </div>

        <div className="smart-target-positions">
          {position
            .filter((item) => item !== "---")
            .map((item) => {
              const selected = selectedPositions.includes(item);

              return (
                <button
                  key={item}
                  type="button"
                  className={`smart-target-position ${
                    selected ? "selected" : ""
                  }`}
                  onClick={() => handlePositionToggle(item)}
                >
                  {selected && <Check size={14} />}

                  <span>{item}</span>
                </button>
              );
            })}
        </div>

        {/* MIXED POSITIONS */}

        <label className="smart-target-mixed">
          <input
            type="checkbox"
            checked={allowMixedPositions}
            onChange={(event) => setAllowMixedPositions(event.target.checked)}
          />

          <span className="smart-target-checkbox">
            {allowMixedPositions && <Check size={13} />}
          </span>

          <span className="smart-target-mixed-text">
            <strong>Allow mixed positions</strong>

            <small>
              Accept players who have the selected position together with other
              positions.
            </small>
          </span>
        </label>
      </div>

      {/* =========================
          SUMMARY
      ========================= */}

      <div className="smart-target-summary">
        <div className="smart-target-summary-header">
          <div>
            <small>TARGET PROFILE</small>

            <h3>Search Requirements</h3>
          </div>

          <div
            className={`smart-target-status ${
              isConfigured ? "configured" : ""
            }`}
          >
            <span />

            {isConfigured ? "Ready" : "Incomplete"}
          </div>
        </div>

        <div className="smart-target-summary-grid">
          <div>
            <span>Account Level</span>

            <strong>{accountLevel || "—"}</strong>
          </div>

          <div>
            <span>Age</span>

            <strong>≤ {maxAge || "—"}</strong>
          </div>

          <div>
            <span>Positions</span>

            <strong>
              {selectedPositions.length > 0
                ? selectedPositions.join(" / ")
                : "—"}
            </strong>
          </div>

          <div>
            <span>Mixed</span>

            <strong>{allowMixedPositions ? "Allowed" : "Pure only"}</strong>
          </div>

          <div>
            <span>Classification</span>

            <strong>{minimumClassification}</strong>
          </div>

          <div>
            <span>Maximum OVR</span>

            <strong>≤ {minimumOverall || "—"}</strong>
          </div>
        </div>
      </div>

      {/* =========================
          TOAST
      ========================= */}

      {toast && (
        <div className="smart-target-toast">
          <Check size={16} />

          <span>{toast}</span>
        </div>
      )}
    </section>
  );
}

export default SmartTarget;
