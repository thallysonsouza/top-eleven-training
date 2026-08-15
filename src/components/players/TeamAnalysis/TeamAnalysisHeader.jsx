import "./TeamAnalysisHeader.css";

import { useNavigate, useParams } from "react-router-dom";

import { ChevronLeft, ChevronRight } from "lucide-react";

import IconButton from "../../ui/Button/IconButton";

function TeamAnalysisHeader() {
  const navigate = useNavigate();

  const { teamId } = useParams();

  return (
    <section className="team-analysis-header">
      <h1>Team Analysis</h1>

      <div className="team-analysis-header-actions">
        <IconButton
          variant="secondary"
          title="Back to Lineup"
          onClick={() => navigate(`/app/lineup/${teamId}`)}
        >
          <ChevronLeft size={18} />
        </IconButton>

        <IconButton variant="secondary" title="Next Page" disabled>
          <ChevronRight size={18} />
        </IconButton>
      </div>
    </section>
  );
}

export default TeamAnalysisHeader;
