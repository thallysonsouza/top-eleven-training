import "./FormField.css";

function FormField({

    label,

    type = "text",

    placeholder = "",

    value,

    onChange

}){

    return(

        <div className="form-field">

            <label>

                {label}

            </label>

            <input

                type={type}

                placeholder={placeholder}

                value={value}

                onChange={onChange}

            />

        </div>

    );

}

export default FormField;