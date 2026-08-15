import { useRef } from "react";

function ModalSkillRow({ label, value, isKey, onChange }) {
  const inputRef = useRef(null);

  function handleChange(event) {
    let value = event.target.value;

    if (value === "") {
      onChange("");
      return;
    }

    value = Number(value);

    if (Number.isNaN(value)) {
      return;
    }

    value = Math.max(1, Math.min(340, value));

    onChange(value);
  }

  return (
    <div className="modal-skill-row">
      <div className="modal-skill-label">
        {isKey && <span className="modal-skill-star">★</span>}

        <span>{label}</span>
      </div>

      <input
        ref={inputRef}
        className="modal-skill-input"
        type="number"
        min={1}
        max={340}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default ModalSkillRow;
