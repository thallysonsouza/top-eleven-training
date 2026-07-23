import { Shield } from "lucide-react";

import "./SidebarLogo.css";

function SidebarLogo({open,setOpen}){

    return(

        <button

            className="sidebar-logo"

            onClick={()=>setOpen(!open)}

        >

            <div className="logo-icon">

                <Shield size={24}/>

            </div>

            {

                open &&

                <div className="logo-text">

                    <h2>

                        Top Eleven Tools

                    </h2>

                    <span>

                        Professional Platform

                    </span>

                </div>

            }

        </button>

    );

}

export default SidebarLogo;