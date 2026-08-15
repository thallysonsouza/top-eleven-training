export const OCR_CONFIG = {
  NAME: {
    psm: 7,

    whitelist:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäçèéêëìíîïñòóôõöùúûüý '-",
  },

  INFO: {
    psm: 6,

    whitelist:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789: ",
  },

  ROLES: {
    psm: 11,

    whitelist: "ACDGKLMRST ",
  },

  ATTRIBUTES: {
    psm: 6,

    whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ",
  },

  SKILLS: {
    psm: 11,

    whitelist:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ",
  },
};
