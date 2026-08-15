import { useState } from "react";

import "./ScannerOverlay.css";

function ScannerOverlay({ image, regions, setRegions, setSelectedRegion }) {
  const [dragging, setDragging] = useState(null);

  const [resizing, setResizing] = useState(null);

  function handleMouseDown(name) {
    setDragging(name);
  }

  function handleResizeDown(event, name) {
    event.stopPropagation();

    setResizing(name);
  }

  function handleMouseUp() {
    setDragging(null);

    setResizing(null);
  }

  function handleMouseMove(event) {
    const container = event.currentTarget;

    const rect = container.getBoundingClientRect();

    const mouseX = (event.clientX - rect.left) / rect.width;

    const mouseY = (event.clientY - rect.top) / rect.height;

    if (dragging) {
      setRegions((prev) => ({
        ...prev,

        [dragging]: {
          ...prev[dragging],

          x: Math.max(
            0,
            Math.min(
              mouseX - prev[dragging].width / 2,
              1 - prev[dragging].width,
            ),
          ),

          y: Math.max(
            0,
            Math.min(
              mouseY - prev[dragging].height / 2,
              1 - prev[dragging].height,
            ),
          ),
        },
      }));

      return;
    }

    if (resizing) {
      setRegions((prev) => {
        const region = prev[resizing];

        return {
          ...prev,

          [resizing]: {
            ...region,

            width: Math.max(0.02, Math.min(mouseX - region.x, 1 - region.x)),

            height: Math.max(0.02, Math.min(mouseY - region.y, 1 - region.y)),
          },
        };
      });
    }
  }

  return (
    <div
      className="overlay-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <img src={image} alt="scanner" />

      {Object.entries(regions).map(([name, region]) => (
        <div
          key={name}
          className={`scanner-region ${name.toLowerCase()}`}
          onClick={() => setSelectedRegion(name)}
          style={{
            left: `${region.x * 100}%`,
            top: `${region.y * 100}%`,
            width: `${region.width * 100}%`,
            height: `${region.height * 100}%`,
          }}
          onMouseDown={() => handleMouseDown(name)}
        >
          {name}

          <div
            className="resize-handle"
            onMouseDown={(e) => handleResizeDown(e, name)}
          />
        </div>
      ))}
    </div>
  );
}

export default ScannerOverlay;
