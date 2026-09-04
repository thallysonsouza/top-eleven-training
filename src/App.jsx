import { Routes, Route, Navigate, useLocation } from "react-router-dom";

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

import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";

import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import DataDeletion from "./pages/DataDeletion";

import TeamLineup from "./components/players/TeamLineup/TeamLineup";
import TeamAnalysisManager from "./components/players/TeamAnalysis/TeamAnalysisManager";

import { TrainingSimulatorProvider } from "./context/TrainingSimulatorContext";
import { useAuth } from "./context/AuthContext";

/* =========================================================
   PROTECTED ROUTE
========================================================= */

function ProtectedRoute({ children }) {
  const { logged, loading } = useAuth();

  const location = useLocation();

  /* =====================================================
     WAIT FOR AUTH
  ===================================================== */

  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#080808",
          color: "#ffe66d",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.16em",
        }}
      >
        LOADING...
      </div>
    );
  }

  /* =====================================================
     NOT AUTHENTICATED
  ===================================================== */

  if (!logged) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  /* =====================================================
     AUTHENTICATED OR GUEST
  ===================================================== */

  return children;
}

/* =========================================================
   APP
========================================================= */

function App() {
  return (
    <Routes>
      {/* =================================================
          LOGIN
      ================================================= */}

      <Route path="/login" element={<Login />} />

      {/* =================================================
          ROOT
      ================================================= */}

      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* =================================================
          PASSWORD RECOVERY
      ================================================= */}

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/update-password" element={<UpdatePassword />} />

      {/* =================================================
          LEGAL / PUBLIC PAGES
      ================================================= */}

      <Route path="/privacy" element={<Privacy />} />

      <Route path="/terms" element={<Terms />} />

      <Route path="/data-deletion" element={<DataDeletion />} />

      {/* =================================================
          PROTECTED APP
      ================================================= */}

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <TrainingSimulatorProvider>
              <Dashboard />
            </TrainingSimulatorProvider>
          </ProtectedRoute>
        }
      >
        {/* =================================================
            HOME
        ================================================= */}

        <Route index element={<Home />} />

        {/* =================================================
            TEAMS
        ================================================= */}

        <Route path="teams" element={<Teams />} />

        {/* =================================================
            AUCTION
        ================================================= */}

        <Route path="auction" element={<AuctionSimulator />} />

        <Route path="auction/manual" element={<ManualAuctionAnalyzer />} />

        {/* =================================================
            SMART AUCTION
        ================================================= */}

        <Route path="auction/smart/*" element={<SmartAuctionAnalyzer />} />

        {/* =================================================
            TRAINING
        ================================================= */}

        <Route path="training" element={<TrainingSimulator />} />

        {/* =================================================
            TRAINING ENGINE DEBUG
        ================================================= */}

        <Route path="training/debug" element={<TrainingEngineDebug />} />

        {/* =================================================
            TEAM
        ================================================= */}

        <Route path="players/:teamId" element={<Players />} />

        <Route path="lineup/:teamId" element={<TeamLineup />} />

        <Route path="analysis/:teamId" element={<TeamAnalysisManager />} />
      </Route>

      {/* =================================================
          INVALID ROUTE
      ================================================= */}

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
