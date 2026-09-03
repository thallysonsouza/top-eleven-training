import { useEffect, useMemo, useRef } from "react";

import "./SmartAuctionAnalysisManager.css";

import analyzeAuctionPlayer from "../../../../engine/auction/analyzeAuctionPlayer";

import playerMatchesRequirements from "../../../../engine/auction/playerMatchesRequirements";

import { useSmartAuction } from "../../../../context/SmartAuctionContext";

/* =========================
   SOUND ALERT
========================= */

const TARGET_ALERT_INTERVAL = 10 * 1000;

/*
 * Toca o alerta sonoro.
 *
 * Essa função cria somente o som de
 * UMA ocorrência do alerta.
 *
 * O intervalo de 10 segundos é controlado
 * separadamente pelo useEffect abaixo.
 */

function playTargetAlert() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return;
  }

  const audioContext = new AudioContextClass();

  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }

  const now = audioContext.currentTime;

  function playTone(startTime, frequency, duration, volume = 0.12) {
    const oscillator = audioContext.createOscillator();

    const gainNode = audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(frequency, startTime);

    gainNode.gain.setValueAtTime(0.0001, startTime);

    gainNode.gain.exponentialRampToValueAtTime(volume, startTime + 0.04);

    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillator.connect(gainNode);

    gainNode.connect(audioContext.destination);

    oscillator.start(startTime);

    oscillator.stop(startTime + duration);
  }

  /*
   * Primeiro grupo
   */

  playTone(now, 520, 0.3, 0.11);

  playTone(now + 0.42, 660, 0.3, 0.13);

  playTone(now + 0.84, 880, 0.8, 0.16);

  /*
   * Segundo grupo
   */

  playTone(now + 1.85, 660, 0.3, 0.12);

  playTone(now + 2.27, 880, 0.3, 0.14);

  playTone(now + 2.69, 1046, 1.1, 0.18);

  /*
   * Fecha o AudioContext depois
   * que o alerta terminar.
   */

  setTimeout(() => {
    audioContext.close().catch(() => {});
  }, 4200);
}

/* =========================
   POSITION NORMALIZATION
========================= */

function normalizePlayerPositions(player) {
  /*
   * O OCR atualmente publica:
   *
   * position: "AML"
   *
   * ou:
   *
   * position: "AMR MR"
   *
   * A engine/Tela 4 trabalha
   * com:
   *
   * positions: ["AMR", "MR"]
   */

  if (Array.isArray(player.positions)) {
    return player.positions;
  }

  if (typeof player.position === "string") {
    return player.position.trim().split(/\s+/).filter(Boolean);
  }

  return [];
}

/* =========================
   SMART AUCTION ANALYSIS
========================= */

function SmartAuctionAnalysisManager() {
  const { targetRequirements, detectedPlayers } = useSmartAuction();

  /* =========================
     ACCOUNT LEVEL
  ========================= */

  const accountLevel = Number(targetRequirements.accountLevel);

  /*
   * Controla o intervalo do alerta
   * de Smart Target.
   *
   * IMPORTANTE:
   *
   * Existe somente UM intervalo.
   */

  const targetAlertIntervalRef = useRef(null);

  /*
   * Guarda se existe atualmente
   * algum jogador compatível.
   *
   * Usamos ref para evitar closures
   * antigas dentro do setInterval.
   */

  const targetMatchActiveRef = useRef(false);

  /* =========================
     ANALYZE REAL OCR PLAYERS
  ========================= */

  const players = useMemo(() => {
    /*
     * Account Level ainda não
     * configurado.
     */

    if (!Number.isFinite(accountLevel) || accountLevel <= 0) {
      return [];
    }

    /*
     * Nenhum jogador real
     * disponível ainda.
     */

    if (!Array.isArray(detectedPlayers) || detectedPlayers.length === 0) {
      return [];
    }

    /*
     * IMPORTANTE:
     *
     * Aqui não existe mais
     * TEST_PLAYERS.
     *
     * Os dados vêm diretamente
     * do OCR da Tela 6.
     */

    return detectedPlayers
      .map((player) => {
        /*
         * =========================
         * NORMALIZE POSITIONS
         * =========================
         */

        const positions = normalizePlayerPositions(player);

        /*
         * =========================
         * BASIC VALIDATION
         * =========================
         *
         * A Tela 6 já filtra
         * jogadores inválidos.
         *
         * Mantemos uma segunda
         * proteção aqui.
         */

        if (
          !Number.isFinite(Number(player.age)) ||
          !Number.isFinite(Number(player.overall)) ||
          positions.length === 0
        ) {
          return null;
        }

        /*
         * =========================
         * PREPARE PLAYER
         * =========================
         */

        const normalizedPlayer = {
          ...player,

          positions,

          age: Number(player.age),

          overall: Number(player.overall),

          marketValue: Number(player.marketValue),
        };

        /*
         * =========================
         * AUCTION ENGINE
         * =========================
         */

        const analyzedPlayer = analyzeAuctionPlayer(
          normalizedPlayer,
          accountLevel,
        );

        /*
         * Segurança.
         */

        if (!analyzedPlayer) {
          return null;
        }

        /*
         * =========================
         * PLAYER FOR TARGET
         * =========================
         */

        const playerForTarget = {
          ...analyzedPlayer,

          age: normalizedPlayer.age,

          overall: normalizedPlayer.overall,

          positions,

          classification: analyzedPlayer.analysis.classification,
        };

        /*
         * =========================
         * SMART TARGET MATCH
         * =========================
         */

        const targetMatch = playerMatchesRequirements({
          player: playerForTarget,

          requirements: targetRequirements,
        });

        /*
         * =========================
         * FINAL PLAYER
         * =========================
         */

        return {
          ...analyzedPlayer,

          id: player.id,

          row: player.row,

          positions,

          age: normalizedPlayer.age,

          overall: normalizedPlayer.overall,

          marketValue: normalizedPlayer.marketValue,

          source: player.source || "auction-ocr",

          targetMatch,
        };
      })
      .filter(Boolean);
  }, [detectedPlayers, targetRequirements, accountLevel]);

  /* =========================
     DEBUG
  ========================= */

  useEffect(() => {
    console.log("==========================================");

    console.log("SMART AUCTION REAL PLAYERS");

    console.log("Account Level:", accountLevel);

    console.log("Detected OCR players:", detectedPlayers.length);

    console.log("Analyzed players:", players.length);

    console.log("==========================================");

    console.table(
      players.map((player) => ({
        id: player.id,

        row: player.row,

        positions: player.positions.join(" / "),

        age: player.age,

        overall: player.overall,

        marketValue: player.marketValue,

        classification: player.analysis.classification,

        ageMatch: player.targetMatch.age,

        positionMatch: player.targetMatch.position,

        classificationMatch: player.targetMatch.classification,

        overallMatch: player.targetMatch.overall,

        finalMatch: player.targetMatch.matches,
      })),
    );
  }, [players, detectedPlayers, accountLevel]);

  /* =========================
     TARGET ALERT
  ========================= */

  useEffect(() => {
    /*
     * Verifica se existe PELO MENOS
     * um jogador compatível na análise
     * atual.
     */

    const hasTargetMatch = players.some((player) => player.targetMatch.matches);

    /*
     * Atualiza a referência imediatamente.
     */

    targetMatchActiveRef.current = hasTargetMatch;

    /*
     * =========================
     * NO MATCH
     * =========================
     *
     * Se nenhum jogador atende
     * ao alvo, o alerta deve parar.
     */

    if (!hasTargetMatch) {
      if (targetAlertIntervalRef.current !== null) {
        clearInterval(targetAlertIntervalRef.current);

        targetAlertIntervalRef.current = null;

        console.log("🎯 Smart Target alert stopped: no matching players.");
      }

      return;
    }

    /*
     * =========================
     * MATCH FOUND
     * =========================
     */

    /*
     * Se o intervalo já existe,
     * não criamos outro.
     */

    if (targetAlertIntervalRef.current !== null) {
      return;
    }

    console.log("🎯 SMART TARGET MATCH FOUND - starting alert.");

    /*
     * Primeiro alerta imediatamente.
     */

    playTargetAlert();

    /*
     * Depois repete a cada 10 segundos
     * enquanto existir pelo menos um MATCH.
     */

    targetAlertIntervalRef.current = setInterval(() => {
      /*
       * Proteção adicional.
       *
       * Se o MATCH deixou de existir
       * antes da próxima análise,
       * o alerta é encerrado.
       */

      if (!targetMatchActiveRef.current) {
        if (targetAlertIntervalRef.current !== null) {
          clearInterval(targetAlertIntervalRef.current);

          targetAlertIntervalRef.current = null;
        }

        return;
      }

      console.log("🎯 SMART TARGET ALERT - repeating.");

      playTargetAlert();
    }, TARGET_ALERT_INTERVAL);

    /*
     * =========================
     * CLEANUP
     * =========================
     */

    return () => {
      /*
       * NÃO limpamos o intervalo
       * simplesmente porque o effect
       * foi executado novamente.
       *
       * O controle real acontece
       * através de hasTargetMatch.
       */
    };
  }, [players]);

  /*
   * =========================
   * GLOBAL CLEANUP
   * =========================
   *
   * Garante que o intervalo nunca
   * continue existindo depois que
   * a Tela 4 for desmontada.
   */

  useEffect(() => {
    return () => {
      if (targetAlertIntervalRef.current !== null) {
        clearInterval(targetAlertIntervalRef.current);

        targetAlertIntervalRef.current = null;
      }

      targetMatchActiveRef.current = false;
    };
  }, []);

  /*
   * =========================
   * ACCOUNT LEVEL NOT CONFIGURED
   * =========================
   */

  if (!Number.isFinite(accountLevel) || accountLevel <= 0) {
    return (
      <section className="smart-auction-analysis-manager">
        <div className="smart-auction-analysis-header">
          <div>
            <small>AUCTION ANALYZER</small>

            <h2>Detected Players</h2>

            <p>
              Configure the Account Level in Smart Target to start the auction
              analysis.
            </p>
          </div>

          <div className="smart-auction-analysis-account">
            <span>ACCOUNT LEVEL</span>

            <strong>—</strong>
          </div>
        </div>
      </section>
    );
  }

  /*
   * =========================
   * WAITING FOR OCR
   * =========================
   */

  if (detectedPlayers.length === 0) {
    return (
      <section className="smart-auction-analysis-manager">
        <div className="smart-auction-analysis-header">
          <div>
            <small>AUCTION ANALYZER</small>

            <h2>Detected Players</h2>

            <p>Waiting for the next valid auction players detected by OCR.</p>
          </div>

          <div className="smart-auction-analysis-account">
            <span>ACCOUNT LEVEL</span>

            <strong>{accountLevel}</strong>
          </div>
        </div>

        <div className="smart-auction-players">
          <div className="smart-auction-player">
            <div
              className="smart-auction-player-data"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                minHeight: "70px",
              }}
            >
              <span>Waiting for valid auction players...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /*
   * =========================
   * RENDER
   * =========================
   */

  return (
    <section className="smart-auction-analysis-manager">
      {/* =========================
          HEADER
      ========================= */}

      <div className="smart-auction-analysis-header">
        <div>
          <small>AUCTION ANALYZER</small>

          <h2>Detected Players</h2>

          <p>
            Real auction players detected by OCR and analyzed using the auction
            engine.
          </p>
        </div>

        <div className="smart-auction-analysis-account">
          <span>ACCOUNT LEVEL</span>

          <strong>{accountLevel}</strong>
        </div>
      </div>

      {/* =========================
          TARGET STATUS
      ========================= */}

      <div className="smart-auction-target-status">
        <div>
          <span>SMART TARGET</span>

          <strong>
            {targetRequirements.positions.length > 0
              ? targetRequirements.positions.join(" / ")
              : "No position selected"}
          </strong>
        </div>

        <div>
          <span>ACCOUNT LEVEL</span>

          <strong>{accountLevel}</strong>
        </div>

        <div>
          <span>AGE</span>

          <strong>≤ {targetRequirements.maxAge}</strong>
        </div>

        <div>
          <span>CLASSIFICATION</span>

          <strong>≥ {targetRequirements.minimumClassification}</strong>
        </div>

        <div>
          <span>OVR</span>

          <strong>≤ {targetRequirements.maximumOverall}</strong>
        </div>
      </div>

      {/* =========================
          PLAYERS
      ========================= */}

      <div className="smart-auction-players">
        {players.map((player) => (
          <article
            className={`smart-auction-player ${
              player.targetMatch.matches ? "target-match" : ""
            }`}
            key={player.id}
          >
            {/* PLAYER DATA */}

            <div className="smart-auction-player-data">
              <div className="smart-auction-player-number">
                #{player.row ?? player.id}
              </div>

              <div className="smart-auction-player-position">
                {player.positions.length > 0
                  ? player.positions.join(" / ")
                  : "---"}
              </div>

              <div className="smart-auction-player-stat">
                <span>AGE</span>

                <strong>{player.age}</strong>
              </div>

              <div className="smart-auction-player-stat">
                <span>OVR</span>

                <strong>{player.overall}</strong>
              </div>

              <div className="smart-auction-player-stat">
                <span>VALUE</span>

                <strong>
                  {Number.isFinite(player.marketValue)
                    ? `${player.marketValue.toFixed(2)} M$`
                    : "—"}
                </strong>
              </div>
            </div>

            {/* ANALYSIS */}

            <div className="smart-auction-player-analysis">
              <div>
                <span>FAIR PRICE</span>

                <strong>
                  {Number.isFinite(player.analysis.fairPrice) &&
                  player.analysis.fairPrice > 0
                    ? `${player.analysis.fairPrice.toFixed(2)} M$`
                    : "—"}
                </strong>
              </div>

              <div>
                <span>SCORE</span>

                <strong>
                  {typeof player.analysis.score === "number"
                    ? `${(player.analysis.score * 100).toFixed(1)}%`
                    : "—"}
                </strong>
              </div>

              <div>
                <span>RESULT</span>

                <strong>{player.analysis.classification}</strong>
              </div>

              <div>
                <span>TARGET</span>

                <strong
                  className={
                    player.targetMatch.matches
                      ? "target-approved"
                      : "target-rejected"
                  }
                >
                  {player.targetMatch.matches ? "MATCH" : "—"}
                </strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SmartAuctionAnalysisManager;
