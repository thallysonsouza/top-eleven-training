import "./SelectField.css";

function SelectField({

    label,

    value,

    options,

    onChange

}){

    return(

        <div className="select-field">

            <label>

                {label}

            </label>

            <select

                value={value}

                onChange={onChange}

            >

                {

                    options.map(option=>(

                        <option

                            key={option}

                            value={option}

                        >

                            {option}

                        </option>

                    ))

                }

            </select>

        </div>

    );

}

export default SelectField;