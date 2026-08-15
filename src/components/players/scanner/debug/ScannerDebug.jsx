import { useState } from "react";

import "./ScannerDebug.css";

import ScannerOverlay from "./ScannerOverlay";

import RegionEditor from "./RegionEditor";

import RegionPreview from "./RegionPreview";

import { SCANNER_REGIONS } from "../services/image/scannerRegions";

function ScannerDebug() {
  const [image, setImage] = useState(null);

  const [regions, setRegions] = useState(structuredClone(SCANNER_REGIONS));

  const [selectedRegion, setSelectedRegion] = useState("NAME");

  function handleImage(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="scanner-debug">
      <input type="file" accept="image/*" onChange={handleImage} />

      <div className="scanner-debug-body">
        <div className="scanner-preview">
          {image && (
            <ScannerOverlay
              image={image}
              regions={regions}
              setRegions={setRegions}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
            />
          )}
        </div>

        <div className="scanner-controls">
          <div className="scanner-grid">
            {Object.keys(regions).map((region) => (
              <RegionEditor
                key={region}
                regionName={region}
                regions={regions}
                setRegions={setRegions}
              />
            ))}
          </div>
        </div>

        <div className="scanner-right">
          <RegionPreview
            image={image}
            regionName={selectedRegion}
            region={regions[selectedRegion]}
          />
        </div>
      </div>
    </div>
  );
}

export default ScannerDebug;
