export function calculateOverallFromAttributes(attributes) {
  const { attack, defense, physical } = attributes;

  return Math.round((attack + defense + physical) / 3);
}

export function calculateOverallFromSkills(skills) {
  const values = Object.values(skills);

  const total = values.reduce((sum, value) => sum + value, 0);

  return Math.round(total / values.length);
}
