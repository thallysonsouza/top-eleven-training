import { nameConfig } from "./configs/nameConfig";

import { infoConfig } from "./configs/infoConfig";

import { rolesConfig } from "./configs/rolesConfig";

import { attributesConfig } from "./configs/attributesConfig";

import { skillsConfig } from "./configs/skillsConfig";

export function getOCRConfig(region) {
  switch (region) {
    case "NAME":
      return nameConfig;

    case "INFO":
      return infoConfig;

    case "ROLES":
      return rolesConfig;

    case "ATTRIBUTES":
      return attributesConfig;

    case "SKILLS":
      return skillsConfig;

    default:
      return {};
  }
}
