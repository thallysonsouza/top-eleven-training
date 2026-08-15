import "./TeamsHeader.css";

import { useNavigate } from "react-router-dom";

import { ChevronLeft, ChevronRight } from "lucide-react";

import IconButton from "../../ui/Button/IconButton";

function TeamsHeader() {
  const navigate = useNavigate();

  return (
    <section className="teams-header">
      <h1>Teams</h1>

      <div className="teams-header-navigation">
        <IconButton variant="secondary" title="Previous" disabled>
          <ChevronLeft size={18} />
        </IconButton>

        <IconButton
          variant="secondary"
          title="Next"
          onClick={() => navigate("/app/players")}
          disabled
        >
          <ChevronRight size={18} />
        </IconButton>
      </div>
    </section>
  );
}

export default TeamsHeader;
