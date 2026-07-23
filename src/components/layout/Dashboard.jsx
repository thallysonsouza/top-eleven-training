import "./Dashboard.css";

import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomPanel from "./BottomPanel";

import Background from "../background/Background";

function Dashboard() {

    return (

        <div className="dashboard">

            <Background/>

            <div className="header-area">

                <Header/>

            </div>

            <div className="sidebar-area">

                <Sidebar/>

            </div>

            <div className="main-area">

                <Outlet/>

            </div>

            <div className="bottom-area">

                <BottomPanel/>

            </div>

        </div>

    );

}

export default Dashboard;