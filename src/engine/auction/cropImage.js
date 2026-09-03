export default function cropImage(imageSource, cropArea) {
  return new Promise((resolve, reject) => {
    if (!imageSource) {
      reject(new Error("Image source is required."));
      return;
    }

    if (!cropArea) {
      reject(new Error("Crop area is required."));
      return;
    }

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");

      const x = Math.max(0, Math.round(cropArea.x));

      const y = Math.max(0, Math.round(cropArea.y));

      const width = Math.min(
        Math.round(cropArea.width),
        image.naturalWidth - x,
      );

      const height = Math.min(
        Math.round(cropArea.height),
        image.naturalHeight - y,
      );

      if (width <= 0 || height <= 0) {
        reject(new Error("Invalid crop dimensions."));

        return;
      }

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");

      if (!context) {
        reject(new Error("Unable to create canvas context."));

        return;
      }

      context.drawImage(image, x, y, width, height, 0, 0, width, height);

      const croppedImage = canvas.toDataURL("image/png");

      resolve(croppedImage);
    };

    image.onerror = () => {
      reject(new Error("Unable to load image."));
    };

    image.src = imageSource;
  });
}
