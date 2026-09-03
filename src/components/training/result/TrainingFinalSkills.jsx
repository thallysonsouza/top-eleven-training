import { useState } from "react";

import { TrendingUp, Shield, Swords, Brain, Save } from "lucide-react";

import { useTrainingSimulator } from "../../../context/TrainingSimulatorContext";

import { getTeamById, updatePlayers } from "../../../services/teamStorage";

import "./TrainingFinalSkills.css";

/* ==================================================
   OUTFIELD SKILL GROUPS
================================================== */

const OUTFIELD_SKILL_GROUPS = [
  {
    id: "defensive",

    title: "DEFENSIVE SKILLS",

    icon: Shield,

    skills: [
      {
        key: "tackling",
        label: "Tackling",
      },

      {
        key: "marking",
        label: "Marking",
      },

      {
        key: "positioning",
        label: "Positioning",
      },

      {
        key: "heading",
        label: "Heading",
      },

      {
        key: "bravery",
        label: "Bravery",
      },
    ],
  },

  {
    id: "attacking",

    title: "ATTACKING SKILLS",

    icon: Swords,

    skills: [
      {
        key: "passing",
        label: "Passing",
      },

      {
        key: "dribbling",
        label: "Dribbling",
      },

      {
        key: "crossing",
        label: "Crossing",
      },

      {
        key: "shooting",
        label: "Shooting",
      },

      {
        key: "finishing",
        label: "Finishing",
      },
    ],
  },

  {
    id: "physical",

    title: "PHYSICAL & MENTAL",

    icon: Brain,

    skills: [
      {
        key: "fitness",
        label: "Fitness",
      },

      {
        key: "strength",
        label: "Strength",
      },

      {
        key: "aggression",
        label: "Aggression",
      },

      {
        key: "speed",
        label: "Speed",
      },

      {
        key: "creativity",
        label: "Creativity",
      },
    ],
  },
];

/* ==================================================
   GOALKEEPER SKILL GROUPS
================================================== */

const GOALKEEPER_SKILL_GROUPS = [
  {
    id: "goalkeeping",

    title: "GOALKEEPING SKILLS",

    icon: Shield,

    skills: [
      {
        key: "reflexes",
        label: "Reflexes",
      },

      {
        key: "agility",
        label: "Agility",
      },

      {
        key: "anticipation",
        label: "Anticipation",
      },

      {
        key: "rushingOut",
        label: "Rushing Out",
      },

      {
        key: "communication",
        label: "Communication",
      },
    ],
  },

  {
    id: "goalkeeper-technique",

    title: "GOALKEEPER TECHNIQUE",

    icon: Swords,

    skills: [
      {
        key: "throwing",
        label: "Throwing",
      },

      {
        key: "kicking",
        label: "Kicking",
      },

      {
        key: "punching",
        label: "Punching",
      },

      {
        key: "aerialReach",
        label: "Aerial Reach",
      },

      {
        key: "concentration",
        label: "Concentration",
      },
    ],
  },

  {
    id: "physical",

    title: "PHYSICAL & MENTAL",

    icon: Brain,

    skills: [
      {
        key: "fitness",
        label: "Fitness",
      },

      {
        key: "strength",
        label: "Strength",
      },

      {
        key: "aggression",
        label: "Aggression",
      },

      {
        key: "speed",
        label: "Speed",
      },

      {
        key: "creativity",
        label: "Creativity",
      },
    ],
  },
];

/* ==================================================
   FORMAT SKILL VALUE
================================================== */

function formatSkillValue(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return 0;
  }

  return Math.round(numericValue);
}

/* ==================================================
   FORMAT OVERALL
================================================== */

function formatOverall(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "0.0";
  }

  return numericValue.toFixed(1);
}

/* ==================================================
   SKILL VALUE
================================================== */

function SkillValue({ previousValue, currentValue }) {
  const formattedPrevious = formatSkillValue(previousValue);

  const formattedCurrent = formatSkillValue(currentValue);

  const changed = formattedPrevious !== formattedCurrent;

  /* ==================================================
     WITHOUT CHANGE
  ================================================== */

  if (!changed) {
    return (
      <span className="training-final-skills-value">
        <strong className="training-final-skills-value-static">
          {formattedPrevious}
        </strong>
      </span>
    );
  }

  /* ==================================================
     WITH CHANGE
  ================================================== */

  return (
    <span className="training-final-skills-value changed">
      <span className="training-final-skills-value-old">
        {formattedPrevious}
      </span>

      <span className="training-final-skills-arrow">→</span>

      <strong className="training-final-skills-value-new">
        {formattedCurrent}
      </strong>
    </span>
  );
}

/* ==================================================
   OVERALL CARD
================================================== */

function OverallCard({ label, previousValue, currentValue }) {
  const previous = formatOverall(previousValue);

  const current = formatOverall(currentValue);

  const changed = previous !== current;

  return (
    <div
      className={`training-final-skills-overall-card ${
        changed ? "changed" : ""
      }`}
    >
      <span className="training-final-skills-overall-label">{label}</span>

      <div className="training-final-skills-overall-value">
        {changed ? (
          <>
            <span className="training-final-skills-overall-old">
              {previous}
            </span>

            <span className="training-final-skills-overall-arrow">→</span>

            <strong className="training-final-skills-overall-new">
              {current}
            </strong>
          </>
        ) : (
          <strong className="training-final-skills-overall-new">
            {current}
          </strong>
        )}
      </div>
    </div>
  );
}

/* ==================================================
   COMPONENT
================================================== */

function TrainingFinalSkills() {
  const {
    selectedPlayer,

    initialSkills,

    trainingResult,

    setSelectedPlayer,

    setInitialSkills,
  } = useTrainingSimulator();

  /* ==================================================
     UPDATE STATE
  ================================================== */

  const [updatingPlayer, setUpdatingPlayer] = useState(false);

  const [playerUpdated, setPlayerUpdated] = useState(false);

  /* ==================================================
     PLAYER TYPE
  ================================================== */

  const playerType =
    selectedPlayer?.position1 === "GK" ? "goalkeeper" : "outfield";

  /* ==================================================
     SKILL GROUPS
  ================================================== */

  const skillGroups =
    playerType === "goalkeeper"
      ? GOALKEEPER_SKILL_GROUPS
      : OUTFIELD_SKILL_GROUPS;

  /* ==================================================
     UPDATE PLAYER
  ================================================== */

  function handleUpdatePlayer() {
    if (!selectedPlayer || !trainingResult || updatingPlayer) {
      return;
    }

    const teamId = selectedPlayer.teamId;

    const playerId = selectedPlayer.id;

    if (
      teamId === undefined ||
      teamId === null ||
      playerId === undefined ||
      playerId === null
    ) {
      console.error(
        "[TRAINING RESULT] Dados insuficientes para atualizar o jogador.",
        {
          teamId,
          playerId,
          selectedPlayer,
        },
      );

      return;
    }

    setUpdatingPlayer(true);

    try {
      /* ================================================
         FIND TEAM
      ================================================ */

      const team = getTeamById(teamId);

      if (!team) {
        console.error("[TRAINING RESULT] Time não encontrado.", {
          teamId,
        });

        return;
      }

      /* ================================================
         CURRENT TRAINING SKILLS
      ================================================ */

      const updatedSkills = {
        ...trainingResult.currentSkills,
      };

      /* ================================================
         FIND PLAYER
      ================================================ */

      const playerExists =
        Array.isArray(team.players) &&
        team.players.some((player) => String(player.id) === String(playerId));

      if (!playerExists) {
        console.error("[TRAINING RESULT] Jogador não encontrado no time.", {
          playerId,
          teamId,
        });

        return;
      }

      /* ================================================
         UPDATE PLAYER
      ================================================ */

      const updatedPlayers = team.players.map((player) => {
        if (String(player.id) !== String(playerId)) {
          return player;
        }

        return {
          ...player,

          skills: {
            ...player.skills,

            ...updatedSkills,
          },
        };
      });

      /* ================================================
         SAVE PLAYERS
      ================================================ */

      updatePlayers(teamId, updatedPlayers);

      /* ================================================
         FIND UPDATED PLAYER
      ================================================ */

      const updatedPlayer = updatedPlayers.find(
        (player) => String(player.id) === String(playerId),
      );

      /* ================================================
         UPDATE CONTEXT
      ================================================ */

      if (updatedPlayer) {
        setSelectedPlayer({
          ...updatedPlayer,

          teamId: team.id,

          teamName:
            updatedPlayer.teamName ||
            selectedPlayer.teamName ||
            team.name ||
            "Unnamed Team",
        });
      }

      /* ================================================
         NEW BASELINE

         O próximo treinamento desse jogador
         parte das novas habilidades.
      ================================================ */

      setInitialSkills({
        ...updatedSkills,
      });

      setPlayerUpdated(true);

      console.log(
        "[TRAINING RESULT] Jogador atualizado com sucesso:",
        updatedPlayer,
      );
    } catch (error) {
      console.error("[TRAINING RESULT] Erro ao atualizar jogador:", error);
    } finally {
      setUpdatingPlayer(false);
    }
  }

  /* ==================================================
     RESULT DATA
  ================================================== */

  const previousSkills = trainingResult?.previousSkills || initialSkills;

  const currentSkills = trainingResult?.currentSkills || initialSkills;

  const previousOverall = trainingResult?.previousOverall ?? 0;

  const currentOverall = trainingResult?.currentOverall ?? 0;

  const previousWhiteOverall = trainingResult?.previousWhiteOverall ?? 0;

  const currentWhiteOverall = trainingResult?.currentWhiteOverall ?? 0;

  /* ==================================================
     KEY SKILLS
  ================================================== */

  const keySkills = trainingResult?.keySkills || {};

  /* ==================================================
     RENDER
  ================================================== */

  return (
    <section className="training-final-skills">
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="training-final-skills-header">
        <div className="training-final-skills-title">
          <div className="training-final-skills-icon">
            <TrendingUp size={19} />
          </div>

          <div>
            <small>TRAINING RESULT</small>

            <h2>Skills After Training</h2>

            <p>
              Compare the player's skills before and after the selected
              training.
            </p>
          </div>
        </div>

        {selectedPlayer && (
          <div className="training-final-skills-player-actions">
            {/* ==========================================
                OVR
            ========================================== */}

            <OverallCard
              label="OVR"
              previousValue={previousOverall}
              currentValue={currentOverall}
            />

            {/* ==========================================
                WHITE OVR
            ========================================== */}

            <OverallCard
              label="WHITE OVR"
              previousValue={previousWhiteOverall}
              currentValue={currentWhiteOverall}
            />

            {/* ==========================================
                UPDATE PLAYER
            ========================================== */}

            <button
              type="button"
              className="training-final-skills-update"
              onClick={handleUpdatePlayer}
              disabled={!trainingResult || updatingPlayer}
            >
              <Save size={16} />

              {updatingPlayer
                ? "Updating..."
                : playerUpdated
                  ? "Player Updated"
                  : "Update Player"}
            </button>
          </div>
        )}
      </div>

      {/* ==================================================
          RESULT
      ================================================== */}

      {trainingResult ? (
        <div className="training-final-skills-groups">
          {skillGroups.map((group) => {
            const GroupIcon = group.icon;

            return (
              <article className="training-final-skills-group" key={group.id}>
                {/* =======================================
                      GROUP HEADER
                  ======================================= */}

                <div className="training-final-skills-group-header">
                  <GroupIcon size={16} />

                  <h3>{group.title}</h3>
                </div>

                {/* =======================================
                      SKILLS
                  ======================================= */}

                <div className="training-final-skills-list">
                  {group.skills.map((currentSkill) => {
                    const previousValue = previousSkills?.[currentSkill.key];

                    const currentValue = currentSkills?.[currentSkill.key];

                    const changed =
                      formatSkillValue(previousValue) !==
                      formatSkillValue(currentValue);

                    const isKeySkill =
                      Number(keySkills?.[currentSkill.key]) === 1;

                    return (
                      <div
                        className={`training-final-skill-row ${
                          changed ? "changed" : ""
                        }`}
                        key={currentSkill.key}
                      >
                        <span
                          className={`training-final-skill-name ${
                            isKeySkill ? "key" : ""
                          }`}
                        >
                          {currentSkill.label}
                        </span>

                        <SkillValue
                          previousValue={previousValue}
                          currentValue={currentValue}
                        />
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="training-final-skills-empty">
          <TrendingUp size={22} />

          <strong>Training result ready</strong>

          <span>Select a ranked exercise to see the result.</span>
        </div>
      )}
    </section>
  );
}

export default TrainingFinalSkills;
