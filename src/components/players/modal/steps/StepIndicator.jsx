import "./StepIndicator.css";

import { User, MapPinned, Shield, Swords, Dumbbell, Check } from "lucide-react";

const steps = [
  {
    label: "Info",
    icon: User,
  },
  {
    label: "Position",
    icon: MapPinned,
  },
  {
    label: "Defense",
    icon: Shield,
  },
  {
    label: "Attack",
    icon: Swords,
  },
  {
    label: "Physical",
    icon: Dumbbell,
  },
];

function StepIndicator({ step }) {
  return (
    <div className="step-indicator">
      {steps.map((item, index) => {
        const current = index + 1;

        const completed = current < step;

        const active = current === step;

        const Icon = item.icon;

        return (
          <div key={current} className="step-item">
            <div
              className={`step-circle
                ${completed ? "completed" : ""}
                ${active ? "active" : ""}`}
            >
              {completed ? <Check size={18} /> : <Icon size={18} />}
            </div>

            <small className="step-label">{item.label}</small>

            {current < steps.length && (
              <div className={`step-line ${completed ? "active" : ""}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StepIndicator;
