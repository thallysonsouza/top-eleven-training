import "./SkillField.css";

function SkillField({
  attribute,

  value,

  isKey,

  onChange,
}) {
  const label = attribute.charAt(0).toUpperCase() + attribute.slice(1);

  return (
    <div className="skill-field">
      <label className={isKey ? "key-skill" : ""}>{label}</label>

      <input
        type="number"
        placeholder="0"
        value={value}
        onChange={onChange}
        className={isKey ? "key-input" : ""}
      />
    </div>
  );
}

export default SkillField;
