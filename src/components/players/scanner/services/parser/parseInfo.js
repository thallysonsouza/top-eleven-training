import { INVALID_VALUE } from "../validator/validatorUtils";

export function parseInfo(text) {
  let overall = INVALID_VALUE;
  let age = INVALID_VALUE;

  const ageMatch = text.match(/Age\s*:?\s*(\d+)/i);

  if (ageMatch) {
    const value = Number(ageMatch[1]);

    if (value >= 18 && value <= 33) {
      age = value;
    }
  }

  const numbers = (text.match(/\d+/g) || []).map(Number);

  for (const value of numbers) {
    if (value === age) {
      continue;
    }

    overall = value;
    break;
  }

  return {
    overall,
    age,
  };
}
