export function normalizeName(name) {
  if (!name) return "";

  return name

    .replace(/\s+/g, " ")

    .trim();
}
