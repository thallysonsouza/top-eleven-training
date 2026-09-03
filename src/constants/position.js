export const position = [
  "---",
  "GK",
  "DL",
  "DC",
  "DR",
  "DMC",
  "ML",
  "MC",
  "MR",
  "AML",
  "AMC",
  "AMR",
  "ST",
];

export const position2 = {
  ["---"]: ["---"],
  GK: ["---"],
  DL: ["---", "DC", "ML"],
  DC: ["---", "DL", "DR", "DMC"],
  DR: ["---", "DC", "MR"],
  DMC: ["---", "DC", "MC"],
  ML: ["---", "DL", "MC", "AML"],
  MC: ["---", "DMC", "ML", "MR", "AMC"],
  MR: ["---", "DR", "MC", "AMR"],
  AML: ["---", "ML", "AMC", "ST"],
  AMC: ["---", "MC", "AML", "AMR", "ST"],
  AMR: ["---", "MR", "AMC", "ST"],
  ST: ["---", "AML", "AMC", "AMR"],
};

export const position3 = {
  "---": { "---": ["---"] },
  GK: { "---": ["---"] },
  DL: {
    "---": ["---"],
    DC: ["---", "DR", "DMC", "ML"],
    ML: ["---", "DC", "MC", "AML"],
  },
  DC: {
    "---": ["---"],
    DL: ["---", "DR", "DMC", "ML"],
    DR: ["---", "DL", "DMC", "MR"],
    DMC: ["---", "DL", "DR", "MC"],
  },
  DR: {
    "---": ["---"],
    DC: ["---", "DL", "DMC", "MR"],
    MR: ["---", "DC", "MC", "AMR"],
  },
  DMC: {
    "---": ["---"],
    DC: ["---", "DL", "DR", "MC"],
    MC: ["---", "DC", "ML", "MR", "AMC"],
  },
  ML: {
    "---": ["---"],
    DL: ["---", "DC", "MC", "AML"],
    MC: ["---", "DL", "DMC", "MR", "AMC", "AML"],
    AML: ["---", "DL", "MC", "ST", "AMC"],
  },
  MC: {
    "---": ["---"],
    DMC: ["---", "DC", "ML", "MR", "AMC"],
    ML: ["---", "DL", "DMC", "MR", "AMC", "AML"],
    MR: ["---", "DR", "DMC", "ML", "AMC", "AMR"],
    AMC: ["---", "DMC", "ML", "MR", "AML", "AMR", "ST"],
  },
  MR: {
    "---": ["---"],
    DR: ["---", "DC", "MC", "AMR"],
    MC: ["---", "DR", "DMC", "ML", "AMC", "AMR"],
    AMR: ["---", "DR", "MC", "ST", "AMC"],
  },
  AML: {
    "---": ["---"],
    ML: ["---", "DL", "MC", "AMC", "ST"],
    AMC: ["---", "MC", "ML", "AMR", "ST"],
    ST: ["---", "ML", "AMR", "AMC"],
  },
  AMR: {
    "---": ["---"],
    MR: ["---", "DR", "MC", "AMC", "ST"],
    AMC: ["---", "MC", "AML", "MR", "ST"],
    ST: ["---", "MR", "AML", "AMC"],
  },
  AMC: {
    "---": ["---"],
    MC: ["---", "DMC", "ML", "MR", "AML", "AMR", "ST"],
    AML: ["---", "MC", "ML", "AMR", "ST"],
    AMR: ["---", "MC", "MR", "AML", "ST"],
    ST: ["---", "MC", "AML", "AMR", "ST"],
  },
  ST: {
    "---": ["---"],
    AML: ["---", "ML", "AMC", "AMR"],
    AMR: ["---", "MR", "AMC"],
    AMC: ["---", "MC", "AML", "AMR"],
  },
};
export default position3;
