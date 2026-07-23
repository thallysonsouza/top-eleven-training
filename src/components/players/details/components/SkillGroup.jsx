import SkillColumn from "./SkillColumn";
import SkillRow from "./SkillRow";

function SkillGroup({ title, color, average, attributes, player, keySkills }){
    return(
        <SkillColumn
            average={average}
            title={title}
            color={color}
        >
            {
                attributes.map(attribute=>(
                    <SkillRow
                        key={attribute}
                        label={
                            attribute.charAt(0).toUpperCase()
                            +
                            attribute.slice(1)
                        }
                        value={player.skills?.[attribute]}
                        isKey={keySkills[attribute]}
                        color={color}
                    />
                ))
            }
        </SkillColumn>
    );
}
export default SkillGroup;