import { NavLink } from "react-router-dom";

import {

    Menu,

    LayoutDashboard,

    Target,

    Users,

    Dumbbell,

    BarChart3,

    BookOpen,

    Download,

    Crown

} from "lucide-react";

import "./SidebarMenu.css";

function SidebarMenu({ open, setOpen }) {

    return (

        <div className="sidebar-top">

            <button
                className="menu-button"
                onClick={() => setOpen(!open)}
            >

                <Menu size={24} />

            </button>

            <nav>

                <NavLink to="/app" end>

                    <LayoutDashboard size={22} />
                    {open && <span>Dashboard</span>}

                </NavLink>

                <NavLink to="/app/simulator">

                    <Target size={22} />
                    {open && <span>Simulator</span>}

                </NavLink>

                <NavLink to="/app/teams">

                    <Users size={22} />
                    {open && <span>teams</span>}

                </NavLink>

                <NavLink to="/app/exercises">

                    <Dumbbell size={22} />
                    {open && <span>Exercises</span>}

                </NavLink>

                <NavLink to="/app/statistics">

                    <BarChart3 size={22} />
                    {open && <span>Statistics</span>}

                </NavLink>

                <NavLink to="/app/guides">

                    <BookOpen size={22} />
                    {open && <span>Guides</span>}

                </NavLink>

                <NavLink to="/app/downloads">

                    <Download size={22} />
                    {open && <span>Downloads</span>}

                </NavLink>

                <NavLink to="/app/premium">

                    <Crown size={22} />
                    {open && <span>Premium</span>}

                </NavLink>

            </nav>

        </div>

    );

}

export default SidebarMenu;