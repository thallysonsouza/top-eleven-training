import "./PlayerModal.css";
import StepIndicator from "./steps/StepIndicator";
import StepRequired from "./steps/StepRequired";
import StepOptional from "./steps/StepOptional";
import StepDefense from "./steps/StepDefense";
import StepAttack from "./steps/StepAttack";
import StepPhysical from "./steps/StepPhysical";
import PlayerModalHeader from "./components/PlayerModalHeader";
import PlayerModalFooter from "./components/PlayerModalFooter";
import usePlayerForm from "./hooks/usePlayerForm";
import { validateStepOne } from "./utils/playerValidation";
import { useToast } from "../../../context/ToastContext";
import { position, position2, position3 } from "../../../constants/position";

function PlayerModal({
  player,

  initialData,

  onClose,

  onSave,
}) {
  const { showToast } = useToast();

  const MAX_NAME_LENGTH = 30;

  const {
    step,
    setStep,

    name,
    setName,

    age,
    setAge,

    marketValue,
    setMarketValue,

    position1,
    setPosition1,

    position2Value,
    setPosition2,

    position3Value,
    setPosition3,

    skills,
    setSkills,
  } = usePlayerForm(player, initialData);

  function nextStep() {
    if (
      step === 1 &&
      !validateStepOne({
        name,
        showToast,
      })
    ) {
      return;
    }

    if (step === 2 && position1 === "---") {
      showToast("Select the primary position.", "warning");

      return;
    }

    setStep((previous) => Math.min(previous + 1, 5));
  }

  function previousStep() {
    setStep((previous) => Math.max(previous - 1, 1));
  }

  function handleSkillChange(attribute, value) {
    setSkills((previous) => ({
      ...previous,

      [attribute]: value,
    }));
  }

  function handleSave() {
    if (name.length > MAX_NAME_LENGTH) {
      showToast(
        `Player name must contain at most ${MAX_NAME_LENGTH} characters.`,
        "warning",
      );

      return;
    }

    onSave({
      ...player,

      name: name.trim(),

      age: Number(age) || 18,

      marketValue,

      position1,

      position2: position2Value,

      position3: position3Value,

      skills,

      ...(player && {
        overallProgress: player.overallProgress,
      }),
    });
  }

  return (
    <div className="player-modal-overlay">
      <div className="player-modal">
        <PlayerModalHeader player={player} onClose={onClose} />

        <StepIndicator step={step} totalSteps={5} />

        <div className="player-modal-body">
          {step === 1 && (
            <StepRequired
              name={name}
              setName={setName}
              age={age}
              setAge={setAge}
              marketValue={marketValue}
              setMarketValue={setMarketValue}
              MAX_NAME_LENGTH={MAX_NAME_LENGTH}
            />
          )}

          {step === 2 && (
            <StepOptional
              position1={position1}
              setPosition1={setPosition1}
              position2Value={position2Value}
              setPosition2={setPosition2}
              position3Value={position3Value}
              setPosition3={setPosition3}
              position={position}
              position2={position2}
              position3={position3}
            />
          )}
          {step === 3 && (
            <StepDefense
              position1={position1}
              position2Value={position2Value}
              position3Value={position3Value}
              skills={skills}
              handleSkillChange={handleSkillChange}
            />
          )}

          {step === 4 && (
            <StepAttack
              position1={position1}
              position2Value={position2Value}
              position3Value={position3Value}
              skills={skills}
              handleSkillChange={handleSkillChange}
            />
          )}

          {step === 5 && (
            <StepPhysical
              position1={position1}
              position2Value={position2Value}
              position3Value={position3Value}
              skills={skills}
              handleSkillChange={handleSkillChange}
            />
          )}
        </div>

        <PlayerModalFooter
          step={step}
          totalSteps={5}
          player={player}
          onBack={previousStep}
          onNext={nextStep}
          onClose={onClose}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}

export default PlayerModal;
