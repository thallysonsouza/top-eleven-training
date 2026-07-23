import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components/layout/Dashboard";

import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Home from "./pages/Home";
import Simulator from "./pages/Simulator";
import Players from "./pages/Players";
import Exercises from "./pages/Exercises";
import Tournament from "./pages/Tournament";
import Statistics from "./pages/Statistics";
import Guides from "./pages/Guides";
import Downloads from "./pages/Downloads";
import Premium from "./pages/Premium";
import Teams from "./pages/Teams";
import TeamDetails from "./pages/teams/ClubDashboard";
import PlayerDetails from "./components/players/details/PlayerDetails";
import TeamLineup from "./components/players/TeamLineup/TeamLineup";

function App() {

    return (

        <Routes>

            {/* Login */}

            <Route
                path="/login"
                element={<Login />}
            />

            {/* Dashboard */}

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="/app"
                element={<Dashboard />}
            >

                <Route
                    index
                    element={<Home />}
                />

                <Route
                    path="simulator"
                    element={<Simulator />}
                />

                <Route
                    path="exercises"
                    element={<Exercises />}
                />

                <Route
                    path="tournament"
                    element={<Tournament />}
                />

                <Route
                    path="statistics"
                    element={<Statistics />}
                />

                <Route
                    path="guides"
                    element={<Guides />}
                />

                <Route
                    path="downloads"
                    element={<Downloads />}
                />

                <Route
                    path="premium"
                    element={<Premium />}
                />
                <Route

                    path="teams"

                    element={<Teams/>}

                />

                <Route

                    path="players/:teamId"

                    element={<Players />}

                />

                <Route
                    path="player/:teamId/:playerId"
                    element={<PlayerDetails />}
                />

                <Route
                    path="lineup/:teamId"
                    element={<TeamLineup />}
                />

            </Route>

            {/* Redireciona qualquer rota inexistente */}

            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />

        </Routes>

    );

}

export default App;