import "./BottomPanelContent.css";

import SystemStatus from "./SystemStatus";
import BrandInfo from "./BrandInfo";
import VersionInfo from "./VersionInfo";

function BottomPanelContent(){

    return(

        <div className="bottom-content">

            <SystemStatus/>

            <BrandInfo/>

            <VersionInfo/>

        </div>

    );

}

export default BottomPanelContent;