import { useState } from "react";

import "./SidebarContent.css";

import SidebarLogo from "./SidebarLogo";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";

function SidebarContent(){

    const [open,setOpen]=useState(false);

    return(

        <div className={open ? "sidebar-content open" : "sidebar-content"}>

            <div>

                <SidebarLogo

                    open={open}
                    setOpen={setOpen}

                />

                <SidebarMenu

                    open={open}

                />

            </div>

            <SidebarFooter

                open={open}

            />

        </div>

    );

}

export default SidebarContent;