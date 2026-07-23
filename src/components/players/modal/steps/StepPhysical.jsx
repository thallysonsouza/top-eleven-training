import SkillGroup from "../../../ui/forms/SkillGroup";

import GroupSkill from "../../../../engine/groupSkill";

function StepPhysical({

    skills,

    handleSkillChange

}){

    return(

        <>

            <span className="player-step-title">

                Physical Attributes

            </span>

            <SkillGroup

                title="Physical"

                attributes={GroupSkill.Physical}

                skills={skills}

                handleSkillChange={handleSkillChange}

            />

        </>

    );

}

export default StepPhysical;