import { useEffect, useRef, useState } from "react";

import { MonitorUp, Unplug, Play, Square, Clock3 } from "lucide-react";

import { useSmartAuction } from "../../../../context/SmartAuctionContext";

import "./GameConnection.css";

function GameConnection() {
  const videoRef = useRef(null);

  const streamRef = useRef(null);

  const {
    stream,
    setStream,
    automaticCaptureActive,
    startAutomaticCapture,
    stopAutomaticCapture,
    nextCaptureAt,
  } = useSmartAuction();

  const [connected, setConnected] = useState(Boolean(stream));

  const [error, setError] = useState("");

  const [toast, setToast] = useState(null);

  /*
   * Tempo restante exibido na interface.
   *
   * Esse estado NÃO controla o scanner.
   *
   * Ele apenas atualiza visualmente
   * a contagem regressiva.
   */

  const [remainingTime, setRemainingTime] = useState(null);

  /* =========================
     CONNECT GAME
  ========================= */

  async function handleConnect() {
    try {
      setError("");

      const newStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          frameRate: 30,
        },

        audio: false,
      });

      streamRef.current = newStream;

      /*
       * Apenas conecta o jogo.
       *
       * IMPORTANTE:
       *
       * Não iniciamos a captura aqui.
       *
       * O usuário precisa clicar
       * em START.
       */

      setStream(newStream);

      setConnected(true);

      const videoTrack = newStream.getVideoTracks()[0];

      if (videoTrack) {
        videoTrack.addEventListener("ended", handleDisconnect);
      }
    } catch (error) {
      console.error("Game capture error:", error);

      if (error.name === "NotAllowedError") {
        setError("Game capture was cancelled.");
      } else {
        setError("Unable to connect to the game.");
      }

      setConnected(false);
    }
  }

  /* =========================
     START MONITORING
  ========================= */

  async function handleStart() {
    if (!streamRef.current && !stream) {
      setError("Connect the game before starting.");

      return;
    }

    setError("");

    const currentStream = streamRef.current || stream;

    const started = await startAutomaticCapture(currentStream);

    if (!started) {
      setError("Unable to start Smart Auction monitoring.");

      return;
    }

    setToast({
      type: "success",
      message: "Smart Auction monitoring started",
    });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  }

  /* =========================
     STOP MONITORING
  ========================= */

  function handleStop() {
    stopAutomaticCapture();

    setRemainingTime(null);

    setToast({
      type: "success",
      message: "Smart Auction monitoring stopped",
    });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  }

  /* =========================
     DISCONNECT GAME
  ========================= */

  function handleDisconnect() {
    /*
     * Primeiro para o monitoramento.
     */

    stopAutomaticCapture();

    const currentStream = streamRef.current || stream;

    if (currentStream) {
      currentStream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    streamRef.current = null;

    setStream(null);

    setConnected(false);

    setRemainingTime(null);
  }

  /* =========================
     RESTORE STREAM
  ========================= */

  useEffect(() => {
    if (!stream || !videoRef.current) {
      return;
    }

    const video = videoRef.current;

    streamRef.current = stream;

    video.srcObject = stream;

    video.play().catch((error) => {
      console.error("Video playback error:", error);
    });

    setConnected(true);

    return () => {
      /*
       * NÃO encerramos o stream aqui.
       *
       * O stream pertence ao Context
       * e continua funcionando durante
       * a navegação entre as telas.
       */

      video.srcObject = null;
    };
  }, [stream]);

  /* =========================
     COUNTDOWN
  ========================= */

  useEffect(() => {
    /*
     * Se não existe próxima captura,
     * não existe contador.
     */

    if (!automaticCaptureActive || !nextCaptureAt) {
      setRemainingTime(null);

      return undefined;
    }

    function updateCountdown() {
      const difference = Math.max(0, nextCaptureAt - Date.now());

      setRemainingTime(difference);

      /*
       * O Context é responsável por
       * realizar a captura real.
       *
       * Aqui apenas atualizamos
       * a informação visual.
       */
    }

    updateCountdown();

    const countdownInterval = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [automaticCaptureActive, nextCaptureAt]);

  /* =========================
     FORMAT COUNTDOWN
  ========================= */

  function formatCountdown(milliseconds) {
    if (milliseconds === null || milliseconds === undefined) {
      return "--:--";
    }

    const totalSeconds = Math.ceil(milliseconds / 1000);

    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
  }

  /* =========================
     RENDER
  ========================= */

  return (
    <section className="game-connection">
      {/* =========================
          HEADER
      ========================= */}

      {!connected && (
        <div className="game-connection-title">
          <div>
            <small>GAME CONNECTION</small>

            <h2>Connect Google Play Games</h2>

            <p>Connect the game window to start the Smart Auction Analyzer.</p>
          </div>

          <div className="game-connection-status">
            <span />
            Not Connected
          </div>
        </div>
      )}

      {connected && (
        <div className="game-connection-connected-header">
          <div className="game-connection-connected-label">
            <span />
            Game Connected
          </div>

          <div
            className={`game-connection-status ${
              automaticCaptureActive ? "connected" : ""
            }`}
          >
            <span />

            {automaticCaptureActive ? "Monitoring" : "Ready"}
          </div>
        </div>
      )}

      {/* =========================
          GAME AREA
      ========================= */}

      <div className="game-connection-content">
        {!connected ? (
          <div className="game-connection-empty">
            <div className="game-connection-icon">
              <MonitorUp size={32} />
            </div>

            <h3>Connect Google Play Games</h3>

            <p>
              Select the Google Play Games window when prompted by the browser.
            </p>

            <button className="game-connection-connect" onClick={handleConnect}>
              <MonitorUp size={18} />
              Connect Game
            </button>

            {error && <span className="game-connection-error">{error}</span>}
          </div>
        ) : (
          <div className="game-connection-live">
            {/* =========================
                GAME VIDEO
            ========================= */}

            <div className="game-connection-video-wrapper">
              <video ref={videoRef} autoPlay playsInline muted />
            </div>

            {/* =========================
                LIVE BAR
            ========================= */}

            <div className="game-connection-live-bar">
              <div className="game-connection-monitor-info">
                <div className="game-connection-live-status">
                  <span />

                  {automaticCaptureActive
                    ? "Smart Auction Monitoring"
                    : "Game Connected"}
                </div>

                {automaticCaptureActive && (
                  <div className="game-connection-countdown">
                    <Clock3 size={14} />

                    <span>Next scan in:</span>

                    <strong>{formatCountdown(remainingTime)}</strong>
                  </div>
                )}
              </div>

              <div className="game-connection-actions">
                {!automaticCaptureActive ? (
                  <button
                    className="game-connection-start"
                    onClick={handleStart}
                  >
                    <Play size={16} />
                    START
                  </button>
                ) : (
                  <button className="game-connection-stop" onClick={handleStop}>
                    <Square size={15} />
                    STOP
                  </button>
                )}

                <button
                  className="game-connection-disconnect"
                  onClick={handleDisconnect}
                >
                  <Unplug size={16} />
                  Disconnect
                </button>
              </div>
            </div>

            {/* =========================
                ERROR
            ========================= */}

            {error && <div className="game-connection-live-error">{error}</div>}
          </div>
        )}
      </div>

      {/* =========================
          TOAST
      ========================= */}

      {toast && (
        <div className={`game-connection-toast ${toast.type}`}>
          <span className="game-connection-toast-icon">✓</span>

          <span>{toast.message}</span>
        </div>
      )}
    </section>
  );
}

export default GameConnection;
