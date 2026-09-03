export default function detectAuctionRows(image) {
  if (!image) {
    throw new Error("Auction image is required.");
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", {
    willReadFrequently: true,
  });

  if (!context) {
    throw new Error("Unable to create canvas context.");
  }

  canvas.width = image.width;
  canvas.height = image.height;

  context.drawImage(image, 0, 0);

  const { width, height } = image;

  const imageData = context.getImageData(0, 0, width, height);

  const pixels = imageData.data;

  /*
   * =====================================================
   * HORIZONTAL DARK-PIXEL PROJECTION
   * =====================================================
   *
   * As linhas que separam os jogadores são muito mais
   * extensas horizontalmente do que qualquer texto.
   *
   * Portanto:
   *
   * texto  → poucos pixels escuros
   * linha  → muitos pixels escuros consecutivos
   *
   * Usamos essa diferença para encontrar os separadores.
   */

  const darkPixelThreshold = 100;

  const darkPixelRatio = new Array(height).fill(0);

  for (let y = 0; y < height; y += 1) {
    let darkPixels = 0;

    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;

      const red = pixels[index];
      const green = pixels[index + 1];
      const blue = pixels[index + 2];

      const luminance = 0.299 * red + 0.587 * green + 0.114 * blue;

      if (luminance < darkPixelThreshold) {
        darkPixels += 1;
      }
    }

    darkPixelRatio[y] = darkPixels / width;
  }

  /*
   * =====================================================
   * FIND HORIZONTAL SEPARATORS
   * =====================================================
   */

  const separatorThreshold = 0.35;

  const separatorRows = [];

  for (let y = 0; y < height; y += 1) {
    if (darkPixelRatio[y] >= separatorThreshold) {
      separatorRows.push(y);
    }
  }

  /*
   * =====================================================
   * GROUP CONSECUTIVE DARK ROWS
   * =====================================================
   *
   * Uma linha divisória normalmente possui mais de
   * um pixel de altura.
   *
   * Transformamos:
   *
   * [45,46]
   *
   * em:
   *
   * { start: 45, end: 46 }
   */

  const separatorGroups = [];

  for (const y of separatorRows) {
    const lastGroup = separatorGroups[separatorGroups.length - 1];

    if (!lastGroup || y > lastGroup.end + 1) {
      separatorGroups.push({
        start: y,
        end: y,
      });
    } else {
      lastGroup.end = y;
    }
  }

  /*
   * =====================================================
   * CONVERT SEPARATORS TO PLAYER ROWS
   * =====================================================
   */

  const separators = separatorGroups.map((group) => ({
    y: Math.round((group.start + group.end) / 2),
    start: group.start,
    end: group.end,
  }));

  /*
   * A primeira linha começa depois da primeira divisória
   * encontrada.
   *
   * A última termina antes da última divisória.
   */

  const rows = [];

  let previousEnd = 0;

  for (const separator of separators) {
    if (separator.y - previousEnd >= 15) {
      rows.push({
        y: previousEnd,
        height: separator.y - previousEnd,
      });
    }

    previousEnd = separator.end + 1;
  }

  /*
   * Última linha.
   */

  if (height - previousEnd >= 15) {
    rows.push({
      y: previousEnd,
      height: height - previousEnd,
    });
  }

  /*
   * =====================================================
   * DEBUG
   * =====================================================
   */

  console.log("==========================================");
  console.log("       AUCTION ROW DETECTION");
  console.log("==========================================");

  console.log("IMAGE:");
  console.log(`${width} × ${height}`);

  console.log("");

  console.log("SEPARATORS:");
  console.table(separators);

  console.log("");

  console.log("ROWS:");
  console.table(rows);

  console.log("");

  console.log(`ROWS DETECTED: ${rows.length}`);

  console.log("==========================================");

  return rows;
}
