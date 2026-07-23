import "./HeaderContent.css";

import Breadcrumb from "./Breadcrumb";
import HeaderActions from "./HeaderActions";

function HeaderContent() {

    return (

        <div className="header-content">

            <div className="header-left">

                <Breadcrumb />

            </div>

            <div className="header-right">

                <HeaderActions />

            </div>

        </div>

    );

}

export default HeaderContent;