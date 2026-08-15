import SelectField from "../../../ui/SelectField/SelectField";

function StepOptional({
  position1,
  setPosition1,

  position2Value,
  setPosition2,

  position3Value,
  setPosition3,

  position,
  position2,
  position3,
}) {
  return (
    <>
      <span className="player-step-title">Player Positions</span>

      <SelectField
        label="Primary Position"
        value={position1}
        options={position}
        onChange={(e) => setPosition1(e.target.value)}
      />

      <div className="player-modal-row">
        <SelectField
          label="Secondary Position"
          value={position2Value}
          options={position2[position1]}
          onChange={(e) => setPosition2(e.target.value)}
        />

        <SelectField
          label="Third Position"
          value={position3Value}
          options={position3[position1]?.[position2Value] ?? ["---"]}
          onChange={(e) => setPosition3(e.target.value)}
        />
      </div>
    </>
  );
}

export default StepOptional;
