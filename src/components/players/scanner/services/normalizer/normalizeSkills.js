export function normalizeSkills(skills) {
  Object.keys(skills).forEach((key) => {
    if (skills[key] === "") {
      return;
    }

    skills[key] = Number(skills[key]);
  });
}
