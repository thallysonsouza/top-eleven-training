export default function readImage(imageSource) {
  return new Promise((resolve, reject) => {
    if (!imageSource) {
      reject(new Error("Auction image source is required."));
      return;
    }

    const image = new Image();

    image.onload = () => {
      resolve(image);
    };

    image.onerror = () => {
      reject(new Error("Unable to load auction image."));
    };

    image.src = imageSource;
  });
}
