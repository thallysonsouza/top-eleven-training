export function validateStepOne({ name, position1, showToast }){
    if(!name.trim()){
        showToast(
            "Player name is required.",
            "warning"
        );
        return false;
    }
    if(position1==="---"){
        showToast(
            "Select the primary position.",
            "warning"
        );
        return false;
    }
    return true;
}
export function validatePlayer({
    name,
    maxNameLength,
    showToast
}){
    if(name.length>maxNameLength){
        showToast(
            `Player name must contain at most ${maxNameLength} characters.`,
            "warning"
        );
        return false;
    }
    return true;
}