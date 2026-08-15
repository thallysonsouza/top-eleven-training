export function readImage(imageSource) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);

    image.onerror = () => {
      reject(new Error("Failed to load image."));
    };

    if (imageSource instanceof File || imageSource instanceof Blob) {
      const reader = new FileReader();

      reader.onload = (event) => {
        image.src = event.target.result;
      };

      reader.onerror = () => {
        reject(new Error("Failed to read image file."));
      };

      reader.readAsDataURL(imageSource);
    } else {
      image.src = imageSource;
    }
  });
}
