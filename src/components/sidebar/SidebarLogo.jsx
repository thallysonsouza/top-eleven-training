import { Shield } from "lucide-react";

import "./SidebarLogo.css";

function SidebarLogo({ open, setOpen }) {
  return (
    <button
      className={`sidebar-logo ${open ? "open" : ""}`}
      onClick={() => setOpen(!open)}
    >
      <div className="logo-icon">
        <Shield size={26} />
      </div>

      {open && (
        <div className="logo-text">
          <h2>
            <span>LionTactic</span>
          </h2>

          <small>Professional Platform</small>
        </div>
      )}
    </button>
  );
}

export default SidebarLogo;
