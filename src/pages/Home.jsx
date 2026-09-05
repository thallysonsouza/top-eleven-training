import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  BarChart3,
  Gavel,
  Shield,
  Trophy,
  Zap,
} from "lucide-react";

import "./Home.css";

/* =========================================================
   PLAYERS
========================================================= */

const TEAM_A = [
  { id: "a1", number: 1, position: "GK", x: 50, y: 89 },
  { id: "a2", number: 2, position: "DC", x: 34, y: 73 },
  { id: "a3", number: 3, position: "DC", x: 50, y: 77 },
  { id: "a4", number: 4, position: "DC", x: 66, y: 73 },
  { id: "a5", number: 5, position: "DMC", x: 39, y: 57 },
  { id: "a6", number: 6, position: "MC", x: 61, y: 57 },
  { id: "a7", number: 7, position: "AML", x: 26, y: 39 },
  { id: "a8", number: 8, position: "AMC", x: 50, y: 43 },
  { id: "a9", number: 9, position: "AMR", x: 74, y: 39 },
  { id: "a10", number: 10, position: "ST", x: 42, y: 22 },
  { id: "a11", number: 11, position: "ST", x: 58, y: 22 },
];

const TEAM_B = [
  { id: "b1", number: 1, position: "GK", x: 50, y: 11 },
  { id: "b2", number: 2, position: "DC", x: 34, y: 27 },
  { id: "b3", number: 3, position: "DC", x: 50, y: 23 },
  { id: "b4", number: 4, position: "DC", x: 66, y: 27 },
  { id: "b5", number: 5, position: "DMC", x: 39, y: 43 },
  { id: "b6", number: 6, position: "MC", x: 61, y: 43 },
  { id: "b7", number: 7, position: "AML", x: 26, y: 61 },
  { id: "b8", number: 8, position: "AMC", x: 50, y: 57 },
  { id: "b9", number: 9, position: "AMR", x: 74, y: 61 },
  { id: "b10", number: 10, position: "ST", x: 42, y: 78 },
  { id: "b11", number: 11, position: "ST", x: 58, y: 78 },
];

/* =========================================================
   TOOL CARDS
========================================================= */

const TOOLS = [
  {
    id: "teams",
    title: "TEAMS",
    subtitle: "Manage",
    description: "Squads, players and lineups.",
    icon: Shield,
    path: "/app/teams",
  },
  {
    id: "auction",
    title: "AUCTION",
    subtitle: "Analyze",
    description: "Find the right players.",
    icon: Gavel,
    path: "/app/auction",
  },
  {
    id: "training",
    title: "TRAINING",
    subtitle: "Improve",
    description: "Plan player development.",
    icon: Zap,
    path: "/app/training",
  },
];

/* =========================================================
   FIELD
========================================================= */

function FootballField() {
  return (
    <div className="home-field-stage">
      <div className="home-field-glow" />

      <div className="home-field-tilt">
        <div className="home-field">
          {/* FIELD MARKINGS */}
          <div className="field-half-line" />
          <div className="field-center-circle" />
          <div className="field-center-dot" />

          <div className="field-box field-box-top">
            <div className="field-small-box field-small-box-top" />
          </div>

          <div className="field-box field-box-bottom">
            <div className="field-small-box field-small-box-bottom" />
          </div>

          <div className="field-penalty-dot field-penalty-dot-top" />
          <div className="field-penalty-dot field-penalty-dot-bottom" />

          {/* BALL */}
          <div className="field-ball">
            <span />
          </div>

          {/* TEAM A */}
          <div className="field-team field-team-a">
            {TEAM_A.map((player, index) => (
              <div
                key={player.id}
                className="field-player field-player-a"
                style={{
                  left: `${player.x}%`,
                  top: `${player.y}%`,
                  "--player-delay": `${index * 0.11}s`,
                }}
              >
                <div className="field-player-piece">
                  <span>{player.number}</span>
                </div>
              </div>
            ))}
          </div>

          {/* TEAM B */}
          <div className="field-team field-team-b">
            {TEAM_B.map((player, index) => (
              <div
                key={player.id}
                className="field-player field-player-b"
                style={{
                  left: `${player.x}%`,
                  top: `${player.y}%`,
                  "--player-delay": `${index * 0.09}s`,
                }}
              >
                <div className="field-player-piece">
                  <span>{player.number}</span>
                </div>
              </div>
            ))}
          </div>

          {/* DECORATIVE TACTICAL LINES */}
          <div className="field-tactical-line field-tactical-line-1" />
          <div className="field-tactical-line field-tactical-line-2" />
          <div className="field-tactical-line field-tactical-line-3" />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ANALYTICS VISUAL
========================================================= */

function AnalyticsVisual() {
  return (
    <div className="home-analytics-visual">
      <div className="analytics-label">
        <span>PLAYER DEVELOPMENT</span>
        <strong>+8.7</strong>
      </div>

      <div className="analytics-chart">
        <div className="analytics-grid-line line-1" />
        <div className="analytics-grid-line line-2" />
        <div className="analytics-grid-line line-3" />

        <svg
          viewBox="0 0 320 100"
          preserveAspectRatio="none"
          className="analytics-svg"
        >
          <defs>
            <linearGradient id="homeChartGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="#ffe66d" />
            </linearGradient>
          </defs>

          <polyline
            points="
              0,83
              45,74
              88,78
              132,57
              175,62
              216,39
              259,30
              320,12
            "
            fill="none"
            stroke="url(#homeChartGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="analytics-point point-1" />
        <div className="analytics-point point-2" />
        <div className="analytics-point point-3" />
        <div className="analytics-point point-4" />
      </div>

      <div className="analytics-footer">
        <span>87.4</span>
        <span>91.2</span>
        <span>96.1</span>
      </div>
    </div>
  );
}

/* =========================================================
   HOME
========================================================= */

function Home() {
  const navigate = useNavigate();

  function openTool(path) {
    navigate(path);
  }

  return (
    <main className="home-page">
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div className="home-background-grid" />
      <div className="home-background-noise" />
      <div className="home-background-glow home-background-glow-left" />
      <div className="home-background-glow home-background-glow-right" />

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="home-header">
        <button
          type="button"
          className="home-brand"
          onClick={() => navigate("/app")}
        >
          <div className="home-brand-mark">
            <Trophy size={16} strokeWidth={2.2} />
          </div>

          <div>
            <span className="home-brand-name">LIONTACTIC</span>
            <span className="home-brand-subtitle"></span>
          </div>
        </button>

        <nav className="home-navigation">
          <button type="button" onClick={() => navigate("/app/teams")}>
            TEAMS
          </button>

          <button type="button" onClick={() => navigate("/app/auction")}>
            AUCTION
          </button>

          <button type="button" onClick={() => navigate("/app/training")}>
            TRAINING
          </button>
        </nav>
      </header>

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="home-hero">
        <div className="home-hero-copy">
          <div className="home-eyebrow">
            <span className="home-eyebrow-line" />
            FOOTBALL MANAGEMENT TOOLS
          </div>

          <h1>
            TAKE CONTROL
            <br />
            <span>OF YOUR TEAM</span>
          </h1>

          <p>Manage. Analyze. Train.</p>

          <button
            type="button"
            className="home-primary-button"
            onClick={() => navigate("/app/teams")}
          >
            <span>EXPLORE TOOLS</span>
            <ArrowUpRight size={17} strokeWidth={2.2} />
          </button>
        </div>

        {/* =================================================
            FIELD
        ================================================= */}

        <FootballField />

        {/* =================================================
            ANALYTICS DECORATION
        ================================================= */}

        <div className="home-hero-analytics">
          <AnalyticsVisual />
        </div>

        <div className="home-hero-status">
          <span className="status-dot" />
          SYSTEM ONLINE
        </div>
      </section>

      {/* ===================================================
          TOOLS
      =================================================== */}

      <section className="home-tools">
        <div className="home-tools-heading">
          <span>THREE CORE TOOLS</span>
          <div className="home-tools-heading-line" />
        </div>

        <div className="home-tools-grid">
          {TOOLS.map((tool, index) => {
            const Icon = tool.icon;

            return (
              <button
                key={tool.id}
                type="button"
                className="home-tool-card"
                onClick={() => openTool(tool.path)}
                style={{
                  "--tool-delay": `${index * 90}ms`,
                }}
              >
                <div className="home-tool-card-top">
                  <span>0{index + 1}</span>
                  <Icon size={19} strokeWidth={1.7} />
                </div>

                <div className="home-tool-card-main">
                  <span className="home-tool-subtitle">{tool.subtitle}</span>

                  <strong>{tool.title}</strong>

                  <span className="home-tool-description">
                    {tool.description}
                  </span>
                </div>

                <div className="home-tool-card-arrow">
                  <ArrowUpRight size={17} strokeWidth={1.8} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ===================================================
          FOOTER
      =================================================== */}

      <footer className="home-footer">
        <span>ROYAL LION</span>
        <span>BUILD. ANALYZE. IMPROVE.</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}

export default Home;
