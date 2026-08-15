import "./FormField.css";

function FormField({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  min,
  max,
  step,
}) {
  return (
    <div className="form-field">
      <label>{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
}

export default FormField;
