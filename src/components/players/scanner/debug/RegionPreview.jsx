import { useEffect, useState } from "react";

import "./RegionPreview.css";

import { readImage } from "../services/image/imageReader";
import { cropRegion } from "../services/image/imageCropper";
import { preprocessRegion } from "../services/image/imagePreprocessor";

function RegionPreview({ image, region, regionName }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    async function generatePreview() {
      if (!image || !region) {
        setPreview(null);
        return;
      }

      try {
        const loadedImage = await readImage(image);

        const cropped = cropRegion(loadedImage, region);

        const processed = preprocessRegion(cropped, regionName);

        setPreview(processed.toDataURL());
      } catch (error) {
        console.error(error);
        setPreview(null);
      }
    }

    generatePreview();
  }, [image, region, regionName]);

  return (
    <div className="region-preview">
      <h2>{regionName}</h2>

      <div className="preview-image">
        {preview ? <img src={preview} alt="Preview" /> : "No preview"}
      </div>

      <div className="preview-result">
        <h3>OCR</h3>

        <p>Waiting...</p>
      </div>

      <div className="preview-confidence">
        <h3>Confidence</h3>

        <strong>--</strong>
      </div>
    </div>
  );
}

export default RegionPreview;
