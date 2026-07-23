import "./InputField.css";

function InputField({

    label,

    icon: Icon,

    helperText,

    error,

    required = false,

    type = "text",

    placeholder = "",

    value,

    onChange,

    maxLength,

    disabled = false

}){

    return(

        <div className="input-field">

            {
                label &&

                <label className="input-label">

                    {label}

                    {

                        required &&

                        <span>*</span>

                    }

                </label>
            }

            <div className={`input-container ${error ? "error" : ""}`}>

                {

                    Icon &&

                    <Icon

                        size={18}

                        className="input-icon"

                    />

                }

                <input

                    type={type}

                    placeholder={placeholder}

                    value={value}

                    onChange={onChange}

                    maxLength={maxLength}

                    disabled={disabled}

                />

            </div>

            <div className="input-footer">

                {

                    error ?

                    <span className="input-error">

                        {error}

                    </span>

                    :

                    helperText ?

                    <span className="input-helper">

                        {helperText}

                    </span>

                    :

                    <span></span>

                }

                {

                    maxLength &&

                    <span className="input-counter">

                        {(value?.length || 0)}/{maxLength}

                    </span>

                }

            </div>

        </div>

    );

}

export default InputField;