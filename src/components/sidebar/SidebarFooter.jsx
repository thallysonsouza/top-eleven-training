import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import { LogOut } from "lucide-react";

import "./SidebarFooter.css";

function SidebarFooter({open}){

    const navigate=useNavigate();

    const {logout}=useAuth();

    function handleLogout(){

        logout();

        navigate("/login");

    }

    return(

        <div className="sidebar-bottom">

            <button

                onClick={handleLogout}

            >

                <LogOut size={22}/>

                {open && <span>Logout</span>}

            </button>

        </div>

    );

}

export default SidebarFooter;