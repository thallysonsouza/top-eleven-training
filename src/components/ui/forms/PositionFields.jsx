import SelectField from "../SelectField/SelectField";

function PositionField({ label, value, options, onChange }){
    return(
        <SelectField
            label={label}
            value={value}
            options={options}
            onChange={onChange}
        />
    );
}
export default PositionField;