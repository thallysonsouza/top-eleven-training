import { useEffect, useRef, useState } from "react";
import { MonitorUp, Unplug } from "lucide-react";

import "./GameCapture.css";

function GameCapture() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");

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

      setStream(newStream);
      setConnected(true);

      const videoTrack = newStream.getVideoTracks()[0];

      videoTrack.addEventListener("ended", handleDisconnect);
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

  function handleDisconnect() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
    }

    streamRef.current = null;

    setStream(null);
    setConnected(false);
  }

  useEffect(() => {
    if (!stream || !videoRef.current) {
      return;
    }

    const video = videoRef.current;

    video.srcObject = stream;

    video.play().catch((error) => {
      console.error("Video playback error:", error);
    });

    return () => {
      video.srcObject = null;
    };
  }, [stream]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <section className="game-capture">
      <div className="game-capture-header">
        <div>
          <small>SMART AUCTION ANALYZER</small>

          <h2>Game Connection</h2>
        </div>

        <div
          className={
            connected ? "game-capture-status connected" : "game-capture-status"
          }
        >
          <span />

          {connected ? "Connected" : "Not Connected"}
        </div>
      </div>

      <div className="game-capture-content">
        {!connected ? (
          <div className="game-capture-empty">
            <div className="game-capture-icon">
              <MonitorUp size={32} />
            </div>

            <h3>Connect Google Play Games</h3>

            <p>Connect the game window to start the Smart Auction Analyzer.</p>

            <button className="game-capture-connect" onClick={handleConnect}>
              <MonitorUp size={18} />
              Connect Game
            </button>

            {error && <span className="game-capture-error">{error}</span>}
          </div>
        ) : (
          <div className="game-capture-live">
            <div className="game-capture-video-wrapper">
              <video ref={videoRef} autoPlay playsInline muted />
            </div>

            <div className="game-capture-live-bar">
              <div className="game-capture-live-status">
                <span />
                Game Connected
              </div>

              <button
                className="game-capture-disconnect"
                onClick={handleDisconnect}
              >
                <Unplug size={16} />
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default GameCapture;
