import FormField from "../../../ui/FormField/FormField";
import SelectField from "../../../ui/SelectField/SelectField";

function StepOptional({ 
    age,
    setAge,
    position1,
    position2Value,
    setPosition2,
    position3Value,
    setPosition3,
    position2,
    position3
}){
    return(
        <>
            <span className="player-step-title">
                Optional Information
            </span>
            <FormField
                label="Age"
                type="number"
                placeholder="18"
                value={age}
                onChange={(e)=>setAge(e.target.value)}
            />
            <SelectField
                label="Secondary Position"
                value={position2Value}
                options={position2[position1]}
                onChange={(e)=>setPosition2(e.target.value)}
            />
            <SelectField
                label="Third Position"
                value={position3Value}
                options={
                    position3[position1]?.[position2Value] ||
                    ["---"]
                }
                onChange={(e)=>setPosition3(e.target.value)}
            />
        </>
    );
}
export default StepOptional;