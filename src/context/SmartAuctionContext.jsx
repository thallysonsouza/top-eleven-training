import { createContext, useContext, useEffect, useRef, useState } from "react";

const SmartAuctionContext = createContext(null);

/* =========================
   DEFAULT SCANNER AREA
========================= */

export const DEFAULT_SCANNER_AREA = {
  x: 110,
  y: 318,
  width: 1515,
  height: 731,
};

/* =========================
   AUTOMATIC CAPTURE
========================= */

/*
 * O jogo atualiza aproximadamente
 * a cada 4 minutos.
 *
 * IMPORTANTE:
 *
 * O ciclo NÃO começa automaticamente
 * ao conectar o jogo.
 *
 * Ele começa somente quando o usuário
 * clicar em START.
 */

const AUTOMATIC_CAPTURE_INTERVAL = 4 * 60 * 1000;

/* =========================
   SCANNER FAILURE ALERT
========================= */

/*
 * Se o scanner não conseguir detectar
 * as 6 linhas esperadas do leilão,
 * o sistema considera que o scanner
 * pode estar trabalhando sobre uma
 * tela incorreta / jogo fechado / jogo
 * travado.
 *
 * O alerta sonoro será repetido
 * a cada 30 segundos enquanto
 * o problema continuar.
 */

const SCANNER_FAILURE_ALERT_INTERVAL = 30 * 1000;

/* =========================
   SMART TARGET
========================= */

const DEFAULT_TARGET_REQUIREMENTS = {
  /*
   * Account Level informado
   * pelo usuário na Tela 5.
   */

  accountLevel: "",

  maxAge: 20,

  positions: [],

  allowMixedPositions: true,

  minimumClassification: "ÓTIMO",

  maximumOverall: 60,
};

export function SmartAuctionProvider({ children }) {
  /* =========================
     GAME CONNECTION
  ========================= */

  const [stream, setStream] = useState(null);

  /* =========================
     CAPTURE
  ========================= */

  const [capturedFrame, setCapturedFrame] = useState(null);

  const [captureVersion, setCaptureVersion] = useState(0);

  const captureVersionRef = useRef(0);

  const captureIntervalRef = useRef(null);

  /*
   * Indica se o monitoramento automático
   * foi iniciado pelo usuário.
   */

  const [automaticCaptureActive, setAutomaticCaptureActive] = useState(false);

  /*
   * Momento da próxima captura automática.
   */

  const [nextCaptureAt, setNextCaptureAt] = useState(null);

  /* =========================
     SCANNER FAILURE ALERT
  ========================= */

  /*
   * Indica que o scanner detectou
   * um problema na leitura do leilão.
   */

  const [scannerFailureAlertActive, setScannerFailureAlertActive] =
    useState(false);

  /*
   * Timer responsável pelos avisos
   * sonoros de 30 em 30 segundos.
   */

  const scannerFailureAlertIntervalRef = useRef(null);

  /*
   * AudioContext utilizado para
   * produzir o alerta sonoro.
   */

  const audioContextRef = useRef(null);

  /*
   * Mantém o estado do alerta
   * acessível dentro das funções
   * sem depender de closures antigas.
   */

  const scannerFailureAlertActiveRef = useRef(false);

  /* =========================
     SCANNER
  ========================= */

  const [scannerArea, setScannerArea] = useState(DEFAULT_SCANNER_AREA);

  const [croppedFrame, setCroppedFrame] = useState(null);

  /* =========================
     DETECTED PLAYERS
  ========================= */

  /*
   * Jogadores reais encontrados
   * pelo OCR da Tela 6.
   */

  const [detectedPlayers, setDetectedPlayers] = useState([]);

  /* =========================
     SMART TARGET
  ========================= */

  const [targetRequirements, setTargetRequirements] = useState(
    DEFAULT_TARGET_REQUIREMENTS,
  );

  /* =========================
     PREPARE AUDIO
  ========================= */

  function prepareScannerAlertAudio() {
    /*
     * Alguns navegadores bloqueiam
     * áudio iniciado automaticamente.
     *
     * Como START é clicado pelo usuário,
     * aproveitamos esse momento para
     * preparar o AudioContext.
     */

    try {
      if (!("AudioContext" in window || "webkitAudioContext" in window)) {
        console.warn("Web Audio API is not available.");

        return;
      }

      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }

      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume().catch((error) => {
          console.warn("Unable to resume scanner alert audio:", error);
        });
      }
    } catch (error) {
      console.warn("Unable to prepare scanner alert audio:", error);
    }
  }

  /* =========================
     PLAY SCANNER ALERT SOUND
  ========================= */

  function playScannerFailureAlert() {
    try {
      const audioContext = audioContextRef.current;

      if (!audioContext) {
        console.warn("Scanner alert audio is not initialized.");

        return;
      }

      if (audioContext.state === "suspended") {
        audioContext.resume().catch((error) => {
          console.warn("Unable to resume scanner alert audio:", error);
        });

        return;
      }

      /*
       * Criamos um pequeno alerta
       * de dois tons.
       */

      const now = audioContext.currentTime;

      const oscillator = audioContext.createOscillator();

      const gain = audioContext.createGain();

      oscillator.type = "sine";

      oscillator.frequency.setValueAtTime(880, now);

      oscillator.frequency.setValueAtTime(660, now + 0.18);

      gain.gain.setValueAtTime(0.0001, now);

      gain.gain.exponentialRampToValueAtTime(0.22, now + 0.02);

      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

      oscillator.connect(gain);

      gain.connect(audioContext.destination);

      oscillator.start(now);

      oscillator.stop(now + 0.45);
    } catch (error) {
      console.warn("Unable to play scanner failure alert:", error);
    }
  }

  /* =========================
     START SCANNER FAILURE ALERT
  ========================= */

  function startScannerFailureAlert() {
    /*
     * Se já estiver ativo,
     * não cria outro intervalo.
     */

    if (scannerFailureAlertActiveRef.current) {
      return;
    }

    console.warn("==========================================");
    console.warn("SCANNER FAILURE ALERT ACTIVATED");
    console.warn("Auction rows could not be detected.");
    console.warn("==========================================");

    scannerFailureAlertActiveRef.current = true;

    setScannerFailureAlertActive(true);

    /*
     * Primeiro alerta imediatamente.
     */

    playScannerFailureAlert();

    /*
     * Depois repete a cada 30 segundos.
     */

    scannerFailureAlertIntervalRef.current = setInterval(() => {
      if (!scannerFailureAlertActiveRef.current) {
        return;
      }

      console.warn("SCANNER FAILURE ALERT: repeating warning.");

      playScannerFailureAlert();
    }, SCANNER_FAILURE_ALERT_INTERVAL);
  }

  /* =========================
     STOP SCANNER FAILURE ALERT
  ========================= */

  function stopScannerFailureAlert() {
    if (scannerFailureAlertIntervalRef.current !== null) {
      clearInterval(scannerFailureAlertIntervalRef.current);

      scannerFailureAlertIntervalRef.current = null;
    }

    if (scannerFailureAlertActiveRef.current) {
      console.log("Scanner failure alert stopped.");
    }

    scannerFailureAlertActiveRef.current = false;

    setScannerFailureAlertActive(false);
  }

  /* =========================
     CAPTURE FRAME FROM STREAM
  ========================= */

  async function captureFrameFromStream(currentStream) {
    if (!currentStream) {
      return false;
    }

    const videoTrack = currentStream.getVideoTracks()[0];

    if (!videoTrack) {
      console.warn("No video track available for capture.");

      return false;
    }

    if (videoTrack.readyState !== "live") {
      console.warn("Video track is not live.");

      return false;
    }

    try {
      if ("ImageCapture" in window) {
        const imageCapture = new ImageCapture(videoTrack);

        const bitmap = await imageCapture.grabFrame();

        const canvas = document.createElement("canvas");

        canvas.width = bitmap.width;

        canvas.height = bitmap.height;

        const context = canvas.getContext("2d");

        if (!context) {
          console.error("Unable to create canvas context.");

          return false;
        }

        context.drawImage(bitmap, 0, 0);

        const image = canvas.toDataURL("image/png");

        /* =========================
           NEW CAPTURE VERSION
        ========================= */

        captureVersionRef.current += 1;

        const newCaptureVersion = captureVersionRef.current;

        console.log("==========================================");

        console.log("NEW AUTOMATIC FRAME CAPTURED");

        console.log("Resolution:", bitmap.width, "x", bitmap.height);

        console.log("Capture version:", newCaptureVersion);

        console.log("==========================================");

        /*
         * Publica a nova versão.
         */

        setCaptureVersion(newCaptureVersion);

        /*
         * Publica a nova imagem.
         */

        setCapturedFrame(image);

        /*
         * O crop anterior pertence
         * à captura anterior.
         */

        setCroppedFrame(null);

        /*
         * Os jogadores anteriores pertencem
         * à captura anterior.
         *
         * A Tela 4 deve limpar imediatamente
         * os jogadores antigos.
         */

        setDetectedPlayers([]);

        return true;
      }

      console.warn("ImageCapture API is not available in this browser.");

      return false;
    } catch (error) {
      console.error("Automatic frame capture error:", error);

      return false;
    }
  }

  /* =========================
     START AUTOMATIC CAPTURE
  ========================= */

  async function startAutomaticCapture(currentStream = stream) {
    /*
     * Não inicia sem um stream.
     */

    if (!currentStream) {
      console.warn("Cannot start automatic capture: game is not connected.");

      return false;
    }

    /*
     * Se já estiver ativo, não cria
     * outro intervalo.
     */

    if (captureIntervalRef.current) {
      console.warn("Automatic capture is already active.");

      return false;
    }

    console.log("==========================================");

    console.log("SMART AUCTION MONITORING STARTED");

    console.log("==========================================");

    /*
     * Prepara o áudio enquanto ainda
     * estamos dentro da ação iniciada
     * pelo usuário.
     */

    prepareScannerAlertAudio();

    /*
     * Garante que qualquer alerta
     * antigo esteja desligado.
     */

    stopScannerFailureAlert();

    /*
     * =========================
     * FIRST CAPTURE
     * =========================
     *
     * A primeira captura acontece
     * imediatamente quando o usuário
     * clica em START.
     */

    const captured = await captureFrameFromStream(currentStream);

    if (!captured) {
      console.warn(
        "Initial capture failed. Automatic capture was not started.",
      );

      return false;
    }

    /*
     * =========================
     * NEXT CAPTURE
     * =========================
     *
     * O contador começa depois
     * da primeira captura.
     */

    const firstNextCaptureAt = Date.now() + AUTOMATIC_CAPTURE_INTERVAL;

    setNextCaptureAt(firstNextCaptureAt);

    /*
     * =========================
     * 4 MINUTE CYCLE
     * =========================
     */

    captureIntervalRef.current = setInterval(() => {
      console.log("==========================================");

      console.log("4-MINUTE CAPTURE INTERVAL REACHED");

      console.log("==========================================");

      /*
       * Já informa a próxima captura
       * para a interface antes de iniciar
       * o processamento da captura atual.
       */

      setNextCaptureAt(Date.now() + AUTOMATIC_CAPTURE_INTERVAL);

      captureFrameFromStream(currentStream);
    }, AUTOMATIC_CAPTURE_INTERVAL);

    setAutomaticCaptureActive(true);

    console.log(
      "Automatic capture started. Interval:",
      AUTOMATIC_CAPTURE_INTERVAL / 1000,
      "seconds",
    );

    return true;
  }

  /* =========================
     STOP AUTOMATIC CAPTURE
  ========================= */

  function stopAutomaticCapture() {
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);

      captureIntervalRef.current = null;
    }

    setAutomaticCaptureActive(false);

    /*
     * Remove o horário da próxima captura.
     */

    setNextCaptureAt(null);

    /*
     * Também encerra qualquer alerta
     * de scanner.
     */

    stopScannerFailureAlert();

    console.log("Automatic capture stopped.");
  }

  /* =========================
     STREAM MONITOR
  ========================= */

  /*
   * Não iniciamos mais o timer
   * automaticamente quando stream muda.
   *
   * O usuário precisa clicar START.
   */

  useEffect(() => {
    if (!stream) {
      stopAutomaticCapture();
    }
  }, [stream]);

  /* =========================
     CLEANUP
  ========================= */

  useEffect(() => {
    return () => {
      if (captureIntervalRef.current) {
        clearInterval(captureIntervalRef.current);

        captureIntervalRef.current = null;
      }

      if (scannerFailureAlertIntervalRef.current) {
        clearInterval(scannerFailureAlertIntervalRef.current);

        scannerFailureAlertIntervalRef.current = null;
      }

      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  /* =========================
     CLEAR SMART AUCTION
  ========================= */

  function clearSmartAuction() {
    /*
     * Para o monitoramento.
     */

    stopAutomaticCapture();

    /*
     * Encerra o stream.
     */

    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    setStream(null);

    /*
     * Limpa captura.
     */

    setCapturedFrame(null);

    /*
     * Reinicia versão.
     */

    captureVersionRef.current = 0;

    setCaptureVersion(0);

    /*
     * Scanner.
     */

    setScannerArea(DEFAULT_SCANNER_AREA);

    setCroppedFrame(null);

    /*
     * Jogadores detectados.
     */

    setDetectedPlayers([]);

    /*
     * Smart Target.
     */

    setTargetRequirements({
      ...DEFAULT_TARGET_REQUIREMENTS,
    });

    /*
     * Alerta.
     */

    stopScannerFailureAlert();
  }

  /* =========================
     UPDATE TARGET
  ========================= */

  function updateTargetRequirements(updates) {
    setTargetRequirements((currentRequirements) => ({
      ...currentRequirements,
      ...updates,
    }));
  }

  /* =========================
     RESET TARGET
  ========================= */

  function resetTargetRequirements() {
    setTargetRequirements({
      ...DEFAULT_TARGET_REQUIREMENTS,
    });
  }

  /* =========================
     CONTEXT VALUE
  ========================= */

  const value = {
    /* =========================
       GAME
    ========================= */

    stream,
    setStream,

    /* =========================
       CAPTURE
    ========================= */

    capturedFrame,
    setCapturedFrame,

    captureVersion,
    setCaptureVersion,

    automaticCaptureActive,

    startAutomaticCapture,
    stopAutomaticCapture,

    /*
     * Horário da próxima captura.
     */

    nextCaptureAt,

    /* =========================
       SCANNER FAILURE ALERT
    ========================= */

    scannerFailureAlertActive,

    startScannerFailureAlert,
    stopScannerFailureAlert,

    /* =========================
       SCANNER
    ========================= */

    scannerArea,
    setScannerArea,

    croppedFrame,
    setCroppedFrame,

    /* =========================
       DETECTED PLAYERS
    ========================= */

    detectedPlayers,
    setDetectedPlayers,

    /* =========================
       SMART TARGET
    ========================= */

    targetRequirements,
    setTargetRequirements,

    updateTargetRequirements,
    resetTargetRequirements,

    /* =========================
       GLOBAL
    ========================= */

    clearSmartAuction,
  };

  return (
    <SmartAuctionContext.Provider value={value}>
      {children}
    </SmartAuctionContext.Provider>
  );
}

export function useSmartAuction() {
  const context = useContext(SmartAuctionContext);

  if (!context) {
    throw new Error(
      "useSmartAuction must be used inside SmartAuctionProvider.",
    );
  }

  return context;
}
