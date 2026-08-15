import { useEffect, useState } from "react";

import skill from "../../../../constants/skill";
import { position2, position3 } from "../../../../constants/position";

function usePlayerForm(player, initialData) {
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");

  const [age, setAge] = useState("");

  const [marketValue, setMarketValue] = useState("");

  const [position1, setPosition1] = useState("---");

  const [position2Value, setPosition2] = useState("---");

  const [position3Value, setPosition3] = useState("---");

  const [skills, setSkills] = useState({});

  useEffect(() => {
    const initialSkills = {};

    skill.forEach((attribute) => {
      initialSkills[attribute] = "";
    });

    const source = player || initialData;

    if (source) {
      setName(source.name || "");

      setAge(source.age || "");

      setMarketValue(source.marketValue || "");

      setPosition1(source.position1 || "---");

      setPosition2(source.position2 || "---");

      setPosition3(source.position3 || "---");

      setSkills({
        ...initialSkills,
        ...(source.skills || {}),
      });
    } else {
      setName("");

      setAge("");

      setMarketValue("");

      setPosition1("---");

      setPosition2("---");

      setPosition3("---");

      setSkills(initialSkills);
    }

    setStep(1);
  }, [player, initialData]);

  useEffect(() => {
    if (!position2[position1]?.includes(position2Value)) {
      setPosition2("---");
    }
  }, [position1, position2Value]);

  useEffect(() => {
    if (!position3[position1]?.[position2Value]?.includes(position3Value)) {
      setPosition3("---");
    }
  }, [position1, position2Value, position3Value]);

  return {
    step,
    setStep,

    name,
    setName,

    age,
    setAge,

    position1,
    setPosition1,

    marketValue,
    setMarketValue,

    position2Value,
    setPosition2,

    position3Value,
    setPosition3,

    skills,
    setSkills,
  };
}

export default usePlayerForm;
