import FormField from "../../../ui/FormField/FormField";

function StepRequired({
  name,
  setName,

  age,
  setAge,

  marketValue,
  setMarketValue,

  MAX_NAME_LENGTH,
}) {
  return (
    <>
      <span className="player-step-title">Player Information</span>

      <FormField
        label={`Player Name (${name.length}/${MAX_NAME_LENGTH})`}
        placeholder="Enter player name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={MAX_NAME_LENGTH}
      />

      <div className="player-modal-row">
        <FormField
          label="Age"
          type="number"
          placeholder="18"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <FormField
          label="Market Value"
          placeholder="$0"
          value={marketValue}
          onChange={(e) => setMarketValue(e.target.value)}
        />
      </div>
    </>
  );
}

export default StepRequired;
