import "./PlayerScanner.css";

import { useState } from "react";
import { Upload, X, Search } from "lucide-react";

import IconButton from "../../ui/Button/IconButton";

function PlayerScanner({ onClose, onAnalyze }) {
  const [image, setImage] = useState(null);

  function handleSelect(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImage({
      file,

      preview: URL.createObjectURL(file),
    });
  }

  function handleAnalyze() {
    if (!image) {
      return;
    }

    onAnalyze(image.file);
  }

  return (
    <div className="player-scanner-overlay" onClick={onClose}>
      <div
        className="player-scanner"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="player-scanner-header">
          <h2>Scan Top Eleven Player</h2>

          <IconButton variant="secondary" title="Close" onClick={onClose}>
            <X size={18} />
          </IconButton>
        </div>

        <div className="player-scanner-body">
          {image ? (
            <img
              src={image.preview}
              alt="Preview"
              className="player-scanner-preview"
            />
          ) : (
            <label className="player-scanner-upload">
              <Upload size={42} />

              <span>Select Screenshot</span>

              <input
                type="file"
                accept="image/*"
                onChange={handleSelect}
                hidden
              />
            </label>
          )}
        </div>

        <div className="player-scanner-footer">
          <button
            className="scanner-analyze"
            disabled={!image}
            onClick={handleAnalyze}
          >
            <Search size={18} />
            Analyze
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerScanner;
