import "./PlayersContent.css";
import PlayersHeader from "../header/PlayersHeader";
import PlayersManager from "./PlayersManager";

function PlayersContent({ team }){
    return(
        <main className="players-content">
            <PlayersHeader/>
            <PlayersManager
                team={team}
            />
        </main>
    );
}
export default PlayersContent;