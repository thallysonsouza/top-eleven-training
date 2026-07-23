import SkillGroup from "../../../ui/forms/SkillGroup";

import GroupSkill from "../../../../engine/groupSkill";

function StepDefense({

    skills,

    handleSkillChange

}){

    return(

        <>


            <SkillGroup

                title="Defense"

                attributes={GroupSkill.Defense}

                skills={skills}

                handleSkillChange={handleSkillChange}

            />

        </>

    );

}

export default StepDefense;