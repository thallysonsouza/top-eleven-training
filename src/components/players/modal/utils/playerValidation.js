export function validateStepOne({ name, showToast }) {
  if (!name.trim()) {
    showToast("Player name is required.", "warning");

    return false;
  }

  return true;
}
export function validatePlayer({ name, maxNameLength, showToast }) {
  if (name.length > maxNameLength) {
    showToast(
      `Player name must contain at most ${maxNameLength} characters.`,
      "warning",
    );
    return false;
  }
  return true;
}
