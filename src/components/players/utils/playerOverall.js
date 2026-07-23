import createGroupAverage from "../../../engine/createGroupAverage";
export default function getPlayerOverall(player){

    return createGroupAverage(

        player.skills

    ).overall;

}