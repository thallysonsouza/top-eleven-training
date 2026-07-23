import {

    Bell,

    Moon,

    Settings

} from "lucide-react";

import "./HeaderActions.css";

function HeaderActions(){

    return(

        <div className="header-actions">

            <button>

                <Bell size={18}/>

            </button>

            <button>

                <Moon size={18}/>

            </button>

            <button>

                <Settings size={18}/>

            </button>

        </div>

    );

}

export default HeaderActions;