import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components/layout/Dashboard";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Players from "./pages/Players";

import AuctionSimulator from "./pages/AuctionSimulator";
import ManualAuctionAnalyzer from "./pages/ManualAuctionAnalyzer";
import SmartAuctionAnalyzer from "./pages/SmartAuctionAnalyzer";

import TrainingSimulator from "./pages/TrainingSimulator";

import TeamLineup from "./components/players/TeamLineup/TeamLineup";
import TeamAnalysisManager from "./components/players/TeamAnalysis/TeamAnalysisManager";

function App() {
  return (
    <Routes>
      {/* Login */}

      <Route path="/login" element={<Login />} />

      {/* Dashboard */}

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/app" element={<Dashboard />}>
        {/* Home */}

        <Route index element={<Home />} />

        {/* Main Pages */}

        <Route path="teams" element={<Teams />} />

        <Route path="auction" element={<AuctionSimulator />} />

        <Route path="auction/manual" element={<ManualAuctionAnalyzer />} />

        <Route path="auction/smart" element={<SmartAuctionAnalyzer />} />

        <Route path="training" element={<TrainingSimulator />} />

        {/* Team */}

        <Route path="players/:teamId" element={<Players />} />

        <Route path="lineup/:teamId" element={<TeamLineup />} />

        <Route path="analysis/:teamId" element={<TeamAnalysisManager />} />
      </Route>

      {/* Invalid Route */}

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
