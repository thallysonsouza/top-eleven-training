import "./RegionEditor.css";

function RegionEditor({
  regionName,

  regions,

  setRegions,
}) {
  const region = regions[regionName];

  function update(key, value) {
    setRegions((prev) => ({
      ...prev,

      [regionName]: {
        ...prev[regionName],

        [key]: Number(value),
      },
    }));
  }

  return (
    <div className="region-card">
      <h3>{regionName}</h3>

      {["x", "y", "width", "height"].map((key) => (
        <label key={key} className="slider-row">
          <span>{key.toUpperCase()}</span>

          <input
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={region[key]}
            onChange={(e) => update(key, e.target.value)}
          />

          <strong>{region[key].toFixed(3)}</strong>
        </label>
      ))}
    </div>
  );
}

export default RegionEditor;
