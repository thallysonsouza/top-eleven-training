import { parseName } from "./parseName";

import { parseInfo } from "./parseInfo";

import { parseRoles } from "./parseRoles";

import { parseAttributes } from "./parseAttributes";

import { parseSkills } from "./parseSkills";
import { resolvePositions } from "./positionResolver";

export function parsePlayer(ocr) {
  console.log("========== OCR RESULT ==========");

  console.log(ocr);

  console.log("===============================");

  const name = parseName(ocr.NAME.text);

  console.log("NAME");

  console.log(name);

  const info = parseInfo(ocr.INFO.text);

  console.log("INFO");

  console.log(info);

  const parsedRoles = parseRoles(ocr.ROLES.text);

  console.log("ROLES (PARSED)");

  console.log(parsedRoles);

  const roles = resolvePositions(parsedRoles);

  console.log("ROLES (RESOLVED)");

  console.log(roles);

  const attributes = parseAttributes(ocr.ATTRIBUTES.text);

  console.log("ATTRIBUTES");

  console.log(attributes);

  const skills = parseSkills(ocr.SKILLS.text);

  console.log("SKILLS");

  console.log(skills);

  const player = {
    ...name,

    ...info,

    ...roles,

    ...attributes,

    skills,
  };

  console.log("========== PLAYER ==========");

  console.log(player);

  console.log("============================");

  return player;
}
