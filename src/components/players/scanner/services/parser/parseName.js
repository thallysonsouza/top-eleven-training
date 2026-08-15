export function parseName(text) {
  return {
    name: text

      .replace(/\n/g, " ")

      .replace(/\s+/g, " ")

      .trim(),
  };
}
