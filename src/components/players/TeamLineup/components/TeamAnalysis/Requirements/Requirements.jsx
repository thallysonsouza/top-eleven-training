import "./Requirements.css";
import {
    CircleCheckBig,
    CircleX
} from "lucide-react";

function RequirementItem({ ok, label }) {
    return (
        <div className="requirement-item">
            {
                ok
                    ? <CircleCheckBig size={16} className="ok"/>
                    : <CircleX size={16} className="fail"/>
            }

            <span>{label}</span>
        </div>
    );
}

function Requirements({

    hasGoalkeeper,
    hasThreeDefenders,
    hasLeftSide,
    hasRightSide,
    hasMidfielder,
    hasAttacker

}) {

    return (

        <div className="requirements">

            <div className="requirements-title">

                REQUIREMENTS

            </div>

            <div className="requirements-grid">

                <RequirementItem
                    ok={hasGoalkeeper}
                    label="Goalkeeper"
                />

                <RequirementItem
                    ok={hasThreeDefenders}
                    label="3 Defenders"
                />

                <RequirementItem
                    ok={hasLeftSide}
                    label="Left Side"
                />

                <RequirementItem
                    ok={hasRightSide}
                    label="Right Side"
                />

                <RequirementItem
                    ok={hasMidfielder}
                    label="Midfielder"
                />

                <RequirementItem
                    ok={hasAttacker}
                    label="Attacker"
                />

            </div>

        </div>

    );

}

export default Requirements;