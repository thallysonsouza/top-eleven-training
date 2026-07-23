import "./Input.css";

function Input({

    label,

    value,

    onChange,

    placeholder = "",

    type = "text",

    disabled = false,

    fullWidth = true

}) {

    return (

        <div className={`input-group ${fullWidth ? "full-width" : ""}`}>

            {label && (

                <label className="input-label">

                    {label}

                </label>

            )}

            <input

                className="input"

                type={type}

                value={value}

                placeholder={placeholder}

                disabled={disabled}

                onChange={onChange}

            />

        </div>

    );

}

export default Input;