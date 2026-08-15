import "./TeamLineupHeader.css";

import { useNavigate, useParams } from "react-router-dom";

import { ChevronLeft, ChevronRight } from "lucide-react";

import IconButton from "../../ui/Button/IconButton";

import { getLineup } from "../../../services/teamStorage";
import { useToast } from "../../../context/ToastContext";

function TeamLineupHeader() {
  const navigate = useNavigate();

  const { teamId } = useParams();

  const { showToast } = useToast();

  function handleOpenAnalysis() {
    const lineup = getLineup(Number(teamId)) ?? {};

    const lineupCount = Object.values(lineup).filter(Boolean).length;

    if (lineupCount !== 11) {
      showToast(
        "You must complete the lineup before opening Team Analysis.",
        "warning",
      );

      return;
    }

    navigate(`/app/analysis/${teamId}`);
  }

  return (
    <section className="team-lineup-header">
      <h1>Lineup</h1>

      <div className="team-lineup-header-actions">
        <IconButton
          variant="secondary"
          title="Back to Players"
          onClick={() => navigate(`/app/players/${teamId}`)}
        >
          <ChevronLeft size={18} />
        </IconButton>

        <IconButton
          variant="secondary"
          title="Go to Analysis"
          onClick={handleOpenAnalysis}
        >
          <ChevronRight size={18} />
        </IconButton>
      </div>
    </section>
  );
}

export default TeamLineupHeader;
