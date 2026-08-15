import "./PlayersHeader.css";

import { useNavigate, useParams } from "react-router-dom";

import { ChevronLeft, ChevronRight } from "lucide-react";

import IconButton from "../../ui/Button/IconButton";

function PlayersHeader() {
  const navigate = useNavigate();

  const { teamId } = useParams();

  return (
    <section className="players-header">
      <h1>Players</h1>

      <div className="players-header-actions">
        <IconButton
          variant="secondary"
          title="Back to Teams"
          onClick={() => navigate("/app/teams")}
        >
          <ChevronLeft size={18} />
        </IconButton>

        <IconButton
          variant="secondary"
          title="Go to Lineup"
          onClick={() => navigate(`/app/lineup/${teamId}`)}
        >
          <ChevronRight size={18} />
        </IconButton>
      </div>
    </section>
  );
}

export default PlayersHeader;
