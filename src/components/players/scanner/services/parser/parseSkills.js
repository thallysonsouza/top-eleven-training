import FIELD_PLAYER_SKILLS from "../../skills/fieldPlayerSkills";
import GOALKEEPER_SKILLS from "../../skills/goalkeeperSkills";
import { INVALID_VALUE } from "../validator/validatorUtils";
import { findClosestSkill } from "./skillMatcher";

function createEmptySkills(skillMap) {
  const skills = {};

  Object.values(skillMap).forEach((skill) => {
    skills[skill] = INVALID_VALUE;
  });

  return skills;
}

function extractSkillPairs(text) {
  const regex = /([A-Za-z]+)[^0-9]{0,4}(\d{1,3})/g;

  const pairs = [];

  let match;

  while ((match = regex.exec(text)) !== null) {
    pairs.push({
      label: match[1],
      value: Number(match[2]),
    });
  }

  return pairs;
}

function parseSkillMap(text, skillMap) {
  const skills = createEmptySkills(skillMap);

  const pairs = extractSkillPairs(text);

  for (const pair of pairs) {
    const match = findClosestSkill(pair.label);

    if (!match) {
      continue;
    }

    if (Object.values(skillMap).includes(match.skill)) {
      skills[match.skill] = pair.value;

      console.log(
        `[SkillMatcher] ${pair.label} → ${match.skill} | ${match.method} | ${(match.confidence * 100).toFixed(0)}%`,
      );
    }
  }

  return skills;
}

function countSkills(skills) {
  return Object.values(skills).filter((value) => value !== INVALID_VALUE)
    .length;
}

export function parseSkills(text) {
  const fieldSkills = parseSkillMap(text, FIELD_PLAYER_SKILLS);

  const goalkeeperSkills = parseSkillMap(text, GOALKEEPER_SKILLS);

  return countSkills(fieldSkills) >= countSkills(goalkeeperSkills)
    ? fieldSkills
    : goalkeeperSkills;
}
