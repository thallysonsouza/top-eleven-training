import {

    Circle

} from "lucide-react";

import "./SystemStatus.css";

function SystemStatus(){

    return(

        <div className="system-status">

            <Circle

                size={10}

                fill="#00E676"

                strokeWidth={0}

            />

            <div>

                <strong>

                    Ready

                </strong>

                <span>

                    All systems operational

                </span>

            </div>

        </div>

    );

}

export default SystemStatus;