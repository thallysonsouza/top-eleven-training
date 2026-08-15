import "./SelectField.css";

import { ChevronDown } from "lucide-react";

function SelectField({
  label,

  options,

  ...props
}) {
  return (
    <div className="select-field">
      <label>{label}</label>

      <div className="select-wrapper">
        <select {...props}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown size={18} className="select-arrow" />
      </div>
    </div>
  );
}

export default SelectField;
