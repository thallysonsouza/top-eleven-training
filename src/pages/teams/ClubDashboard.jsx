import "./ClubDashboard.css";

import { useState } from "react";
import { useParams } from "react-router-dom";

import {

    Users,
    Plus,
    Shield,
    Star,
    Target

} from "lucide-react";

import { getTeamById } from "../../services/teamStorage";

function TeamDetails() {

    const { id } = useParams();

    const [team] = useState(() => getTeamById(id));

    if (!team) {

        return (

            <main className="team-details">

                <div className="team-not-found">

                    <h2>Team not found</h2>

                    <p>

                        The selected team no longer exists.

                    </p>

                </div>

            </main>

        );

    }

    return (

        <main className="team-details">

            <section className="team-header">

                <div className="team-info">

                    <div className="team-logo">

                        <Shield size={42} />

                    </div>

                    <div>

                        <h1>{team.name}</h1>

                        <p>

                            Level {team.level}

                        </p>

                    </div>

                </div>

            </section>

            <section className="team-summary">

                <div className="summary-card">

                    <Users size={24} />

                    <span className="summary-value">

                        {team.players.length}

                    </span>

                    <span className="summary-label">

                        Players

                    </span>

                </div>

                <div className="summary-card">

                    <Star size={24} />

                    <span className="summary-value">

                        --

                    </span>

                    <span className="summary-label">

                        Team OVR

                    </span>

                </div>

                <div className="summary-card">

                    <Target size={24} />

                    <span className="summary-value">

                        --

                    </span>

                    <span className="summary-label">

                        Balance

                    </span>

                </div>

            </section>

            <section className="team-players">

                <div className="players-header">

                    <h2>

                        Players

                    </h2>

                    <button>

                        <Plus size={18} />

                        Add Player

                    </button>

                </div>

                {

                    team.players.length === 0 &&

                    <div className="empty-team">

                        <Users size={60} />

                        <h3>

                            No players registered

                        </h3>

                        <p>

                            Click "Add Player" to start building your squad.

                        </p>

                    </div>

                }

            </section>

        </main>

    );

}

export default TeamDetails;