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
    "ST"
];

export const position2 = {
    ["---"]: ["---"],
    "GK": ["---"],
    "DL": ["---","DC","ML"],
    "DC": ["---","DL","DR","DMC"],
    "DR": ["---","DC","MR"],
    "DMC": ["---","DC","MC"],
    "ML": ["---","DL","MC","AML"],
    "MC": ["---","DMC","ML","MR","AMC"],
    "MR": ["---","DR","MC","AMR"],
    "AML": ["---","ML","AMC","ST"],
    "AMC": ["---","MC","AML","AMR","ST"],
    "AMR": ["---","MR","AMC","ST"],
    "ST": ["---","AML","AMC","AMR"]
};

export const position3 = {

    "---": {"---": ["---"]},
    "GK": {"---": ["---"]},
    "DL": {
        "---": ["---"],
        "DC": ["---","DR","DMC"],
        "ML": ["---","MC","AML"]},
    "DC": {
        "---": ["---"],
        "DL": ["---","ML"],
        "DR": ["---","MR"],
        "DMC": ["---","MC"]},
    "DR": {
        "---": ["---"],
        "DC": ["---","DL","DMC"],
        "MR": ["---","MC","AMR"]},
    "DMC": {
        "---": ["---"],
        "DC": ["---","DL","DR"],
        "MC": ["---","ML","MR","AMC"]},
    "ML": {
        "---": ["---"],
        "DL": ["---","DC"],
        "MC": ["---","DMC","MR","AMC"],
        "AML": ["---","ST","AMC"]},
    "MC": {
        "---": ["---"],
        "DMC": ["---","DC"],
        "ML": ["---","DL","AML"],
        "MR": ["---","DR","AMR"],
        "AMC": ["---","AML","AMR","ST"]},
    "MR": {
        "---": ["---"],
        "DR": ["---","DC"],
        "MC": ["---","DMC","ML","AMC"],
        "AMR": ["---","ST","AMC"]},
    "AML": {
        "---": ["---"],
        "ML": ["---","DL","MC"],
        "AMC": ["---","MC","AMR","ST"],
        "ST": ["---","AMR","AMC"]},
    "AMR": {
        "---": ["---"],
        "MR": ["---","DR","MC"],
        "AMC": ["---","MC","AML","ST"],
        "ST": ["---","AML","AMC"]},
    "AMC": {
        "---": ["---"],
        "MC": ["---","DMC","ML","MR"],
        "AML": ["---","ML","ST"],
        "AMR": ["---","MR","ST"],
        "ST": ["---","AML","AMR"]},
    "ST": {
        "---": ["---"],
        "AML": ["---","ML","AMC"],
        "AMR": ["---","MR","AMC"],
        "AMC": ["---","MC","AML","AMR"]}
};
export default position3;