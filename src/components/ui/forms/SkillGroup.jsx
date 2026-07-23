import "./SkillGroup.css";
import SkillField from "./SkillField";

function SkillGroup({

    title,

    attributes,

    skills,

    handleSkillChange

}){

    const colorClass={

        Defense:"skill-group-defense",

        Attack:"skill-group-attack",

        Physical:"skill-group-physical"

    };

    return(

        <div className="skill-group">

            <h3

                className={`skill-group-title ${colorClass[title]}`}

            >

                {title}

            </h3>

            <div className="skill-group-list">

                {

                    attributes.map(attribute=>(

                        <SkillField

                            key={attribute}

                            attribute={attribute}

                            value={skills[attribute]}

                            onChange={(e)=>

                                handleSkillChange(

                                    attribute,

                                    e.target.value

                                )

                            }

                        />

                    ))

                }

            </div>

        </div>

    );

}

export default SkillGroup;