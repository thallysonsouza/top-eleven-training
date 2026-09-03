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

import TrainingEngineDebug from "./pages/TrainingEngineDebug";

import TeamLineup from "./components/players/TeamLineup/TeamLineup";

import TeamAnalysisManager from "./components/players/TeamAnalysis/TeamAnalysisManager";

import { TrainingSimulatorProvider } from "./context/TrainingSimulatorContext";

function App() {
  return (
    <Routes>
      {/* =========================
          LOGIN
      ========================= */}

      <Route path="/login" element={<Login />} />

      {/* =========================
          ROOT
      ========================= */}

      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* =========================
          APP
          
          O TrainingSimulatorProvider
          agora envolve TODAS as páginas
          dentro do Dashboard.

          Dessa forma:
          
          /app/training
          /app/training/debug
          
          compartilham exatamente o mesmo
          TrainingSimulatorContext.
      ========================= */}

      <Route
        path="/app"
        element={
          <TrainingSimulatorProvider>
            <Dashboard />
          </TrainingSimulatorProvider>
        }
      >
        {/* =========================
            HOME
        ========================= */}

        <Route index element={<Home />} />

        {/* =========================
            MAIN PAGES
        ========================= */}

        <Route path="teams" element={<Teams />} />

        <Route path="auction" element={<AuctionSimulator />} />

        <Route path="auction/manual" element={<ManualAuctionAnalyzer />} />

        {/* =========================
            SMART AUCTION
        ========================= */}

        <Route path="auction/smart/*" element={<SmartAuctionAnalyzer />} />

        {/* =========================
            TRAINING
        ========================= */}

        <Route path="training" element={<TrainingSimulator />} />

        {/* =========================
            TRAINING ENGINE DEBUG
        ========================= */}

        <Route path="training/debug" element={<TrainingEngineDebug />} />

        {/* =========================
            TEAM
        ========================= */}

        <Route path="players/:teamId" element={<Players />} />

        <Route path="lineup/:teamId" element={<TeamLineup />} />

        <Route path="analysis/:teamId" element={<TeamAnalysisManager />} />
      </Route>

      {/* =========================
          INVALID ROUTE
      ========================= */}

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
