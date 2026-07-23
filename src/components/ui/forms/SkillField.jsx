import "./SkillField.css";

function SkillField({

    attribute,

    value,

    onChange

}){

    return(

        <div className="skill-field">

            <label>

                {

                    attribute.charAt(0).toUpperCase()

                    +

                    attribute.slice(1)

                }

            </label>

            <input

                type="number"

                placeholder="0"

                value={value}

                onChange={onChange}

            />

        </div>

    );

}

export default SkillField;