import {

    CodeXml

} from "lucide-react";

import "./VersionInfo.css";

function VersionInfo(){

    return(

        <div className="version-info">

            <CodeXml size={18}/>

            <div>

                <strong>

                    v1.0.0

                </strong>

                <span>

                    Updated Jul 2026

                </span>

            </div>

        </div>

    );

}

export default VersionInfo;