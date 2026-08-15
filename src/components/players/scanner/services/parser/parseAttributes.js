import { INVALID_VALUE } from "../validator/validatorUtils";

const ATTRIBUTE_KEYS = {
  DEFENSE: "defense",
  ATTACK: "attack",
  PHYSICAL: "physical",
};

function tokenize(text) {
  return text
    .toUpperCase()
    .replace(/:/g, " ")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");
}

export function parseAttributes(text) {
  const result = {
    defense: INVALID_VALUE,
    attack: INVALID_VALUE,
    physical: INVALID_VALUE,
  };

  const tokens = tokenize(text);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (!(token in ATTRIBUTE_KEYS)) {
      continue;
    }

    for (let j = i + 1; j < Math.min(i + 4, tokens.length); j++) {
      const value = Number(tokens[j]);

      if (!Number.isNaN(value)) {
        result[ATTRIBUTE_KEYS[token]] = value;
        break;
      }
    }
  }

  return result;
}
