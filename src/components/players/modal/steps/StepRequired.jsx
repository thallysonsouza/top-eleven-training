import FormField from "../../../ui/FormField/FormField";
import SelectField from "../../../ui/SelectField/SelectField";

function StepRequired({
    name,
    setName,
    position1,
    setPosition1,
    position,
    MAX_NAME_LENGTH
}){
    return(

                        <>
                            <span className="player-step-title">
                                Required Information
                            </span>
                            <FormField
                                label={`Player Name (${name.length}/${MAX_NAME_LENGTH})`}
                                placeholder="Enter player name"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                maxLength={MAX_NAME_LENGTH}
                            />
                            <SelectField
                                label="Primary Position"
                                value={position1}
                                options={position}
                                onChange={(e)=>setPosition1(e.target.value)}
                            />
                        </>

    );
}
export default StepRequired;