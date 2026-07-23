import SkillGroup from "../../../ui/forms/SkillGroup";

import GroupSkill from "../../../../engine/groupSkill";

function StepAttack({

    skills,

    handleSkillChange

}){

    return(

        <>

            <span className="player-step-title">

                Attack Attributes

            </span>

            <SkillGroup

                title="Attack"

                attributes={GroupSkill.Attack}

                skills={skills}

                handleSkillChange={handleSkillChange}

            />

        </>

    );

}

export default StepAttack;