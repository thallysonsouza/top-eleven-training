import "./PlayerSkills.css";

import SkillGroup from "../../../components/SkillGroup";

import { getKeySkills } from "../../../../../../engine/getKeySkills";

function PlayerSkills({

    player,
    averages

}){

    const keySkills = getKeySkills(

        player.position1,
        player.position2,
        player.position3

    );

    return(

        <div className="player-skills">

            <SkillGroup
                title="Defense"
                color="green"
                average={averages.Defense}
                attributes={[
                    "tackling",
                    "marking",
                    "positioning",
                    "heading",
                    "bravery"
                ]}
                player={player}
                keySkills={keySkills}
            />

            <SkillGroup
                title="Attack"
                color="red"
                average={averages.Attack}
                attributes={[
                    "passing",
                    "dribbling",
                    "crossing",
                    "shooting",
                    "finishing"
                ]}
                player={player}
                keySkills={keySkills}
            />

            <SkillGroup
                title="Physical"
                color="blue"
                average={averages.Physical}
                attributes={[
                    "conditioning",
                    "strength",
                    "aggression",
                    "speed",
                    "creativity"
                ]}
                player={player}
                keySkills={keySkills}
            />

        </div>

    );

}

export default PlayerSkills;