import "./TeamsContent.css";
import TeamsHeader from "../header/TeamsHeader";
import TeamsManager from "./TeamManager";

function TeamsContent(){
    return(
        <main className="teams-content">
            <TeamsHeader/>
            <TeamsManager/>
        </main>
    );
}
export default TeamsContent;