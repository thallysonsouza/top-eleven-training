export function cleanOCRText(text) {
  return text

    .replace(/\r/g, "")

    .replace(/\t/g, " ")

    .replace(/[ ]+/g, " ")

    .replace(/\n{2,}/g, "\n")

    .trim();
}
