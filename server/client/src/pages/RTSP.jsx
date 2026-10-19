import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import {
  Activity,
  Camera,
  CirclePlus,
  Grid2X2,
  LayoutGrid,
  LoaderCircle,
  Play,
  Radio,
  RefreshCw,
  ShieldCheck,
  Trash2,
  Video,
  Wifi,
  X,
} from "lucide-react";

const API = import.meta.env.VITE_API_BASE_URL || "";
const SERVER_HOST = import.meta.env.VITE_MEDIAMTX_HOST || "127.0.0.1";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${response.status})`);
  }

  if (response.status === 204) return null;
  return response.json();
}

function CameraPlayer({ camera, onRemove }) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [status, setStatus] = useState("Waiting for playback");
  const [error, setError] = useState("");

  const hlsUrl =
    camera.hlsUrl ||
    `http://${SERVER_HOST || "127.0.0.1"}:8888/${camera.id}/index.m3u8`;

  function stopPlayback() {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const video = videoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }

    setPlaying(false);
    setStatus("Stopped");
  }

  function startPlayback() {
    const video = videoRef.current;
    if (!video) return;

    setError("");
    setStatus("Connecting to stream…");

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // Safari can play HLS natively.
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsUrl;
      video
        .play()
        .then(() => {
          setPlaying(true);
          setStatus("Live");
        })
        .catch(() => setStatus("Click play to start"));
      return;
    }

    if (!Hls.isSupported()) {
      setError("This browser does not support HLS playback.");
      setStatus("Playback unavailable");
      return;
    }

    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true,
      maxBufferLength: 10,
    });

    hlsRef.current = hls;

    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      hls.loadSource(hlsUrl);
    });

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video
        .play()
        .then(() => {
          setPlaying(true);
          setStatus("Live");
        })
        .catch(() => setStatus("Click play to start"));
    });

    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (!data.fatal) return;

      setPlaying(false);
      setStatus("Stream unavailable");
      setError(
        data.type === Hls.ErrorTypes.NETWORK_ERROR
          ? "Cannot load the stream. Check the camera source and MediaMTX HLS port."
          : "The stream failed. Check the camera codec and server logs.",
      );

      hls.destroy();
      hlsRef.current = null;
    });

    hls.loadSource(hlsUrl);
    hls.attachMedia(video);
  }

  useEffect(() => {
    return () => {
      hlsRef.current?.destroy();
    };
  }, []);
  console.log(camera.webrtcUrl);
  return (
    <article className="camera-card">
      <div className="camera-video">
        {/* <video
          src={camera.webrtcUrl}
          controls
          autoPlay
          // ref={videoRef}
          // src={camera.webrtcUrl}
          // controls
          // muted
          // playsInline
          // preload="none"
          // onPlaying={() => {
          //   setPlaying(true);
          //   setStatus("Live");
          // }}
          // onWaiting={() => setStatus("Buffering…")}
          // onPause={() => {
          //   if (playing) setStatus("Paused");
          // }}
          // onError={(err) => {
          //   console.log(err)
          //   if (!hlsRef.current) {
          //     setError("Unable to play this stream.");
          //   }
          // }}
        /> */}
        <iframe
          src={`${camera.webrtcUrl}/?controls=true&muted=true&autoplay=true&playsinline=true`}
          title="Live Camera"
          allow="autoplay; fullscreen; picture-in-picture"
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            border: "none",
            borderRadius: "8px",
          }}
        />
        {!playing && (
          <div className="video-overlay">
            <div className="camera-icon">
              <Video size={26} />
            </div>
            <span>{error || status}</span>
            <button
              className="play-button"
              onClick={startPlayback}
              title="Start camera"
            >
              <Play size={17} fill="currentColor" />
              Play stream
            </button>
          </div>
        )}

        <span className={`live-badge ${playing ? "is-live" : ""}`}>
          <span className="live-dot" />
          {playing ? "LIVE" : "OFFLINE"}
        </span>

        <button
          className="remove-button"
          title="Remove camera"
          onClick={() => onRemove(camera)}
        >
          <Trash2 size={17} />
        </button>
      </div>

      <div className="camera-details">
        <div className="camera-title">
          <div className="camera-small-icon">
            <Camera size={18} />
          </div>
          <div className="camera-name">
            <strong>{camera.name}</strong>
            <span>/{camera.id}</span>
          </div>
        </div>

        <div className="camera-actions">
          <span className="camera-status">
            <Activity size={14} />
            {status}
          </span>

          {playing ? (
            <button
              className="icon-button"
              onClick={stopPlayback}
              title="Stop playback"
            >
              <X size={17} />
            </button>
          ) : (
            <button
              className="icon-button"
              onClick={startPlayback}
              title="Play camera"
            >
              <Play size={16} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function RTSP() {
  const [cameras, setCameras] = useState([]);
  const [name, setName] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");

  async function loadCameras() {
    setError("");
    try {
      const data = await apiRequest("/rtsp");
      console.log(data);
      setCameras(data);
    } catch (err) {
      setError(err.message || "Unable to load cameras.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCameras();
  }, []);

  async function addCamera(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setNotice("");

    try {
      const camera = await apiRequest("/rtsp", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          sourceUrl: sourceUrl.trim(),
        }),
      });

      setCameras((current) => [camera, ...current]);
      setName("");
      setSourceUrl("");
      setShowForm(false);
      setNotice("Camera added. Select Play to start its stream.");
    } catch (err) {
      setError(err.message || "Could not add camera.");
    } finally {
      setSubmitting(false);
    }
  }

  async function removeCamera(camera) {
    if (!window.confirm(`Remove "${camera.name}" from your dashboard?`)) {
      return;
    }

    setError("");
    try {
      await apiRequest(`/rtsp/${camera.id}`, {
        method: "DELETE",
      });

      setCameras((current) => current.filter((item) => item.id !== camera.id));
      setNotice(`${camera.name} removed.`);
    } catch (err) {
      setError(err.message || "Could not remove camera.");
    }
  }

  const filteredCameras = cameras.filter((camera) => {
    if (filter === "enabled") return camera.enabled;
    if (filter === "disabled") return !camera.enabled;
    return true;
  });

  return (
    <main className="dashboard">
      <header className="topbar">
        <a className="brand" href="/" aria-label="StreamGuard home">
          <div className="brand-mark">
            <ShieldCheck size={23} />
          </div>
          <div>
            <strong>StreamGuard</strong>
            <span>VIDEO MANAGEMENT</span>
          </div>
        </a>

        <div className="server-indicator">
          <span className="server-dot" />
          <span>STREAM DASHBOARD</span>
        </div>

        <button className="refresh-button" onClick={loadCameras}>
          <RefreshCw size={16} />
          Refresh
        </button>
      </header>

      <section className="welcome">
        <div>
          <div className="eyebrow">
            <Radio size={15} />
            REAL-TIME MONITORING
          </div>
          <h1>Your camera wall.</h1>
          <p>
            Connect RTSP cameras and monitor multiple live streams from one
            dashboard.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setShowForm((value) => !value);
            setError("");
          }}
        >
          {showForm ? <X size={18} /> : <CirclePlus size={19} />}
          {showForm ? "Cancel" : "Add camera"}
        </button>
      </section>

      {showForm && (
        <section className="add-panel">
          <div className="form-heading">
            <div className="form-icon">
              <Camera size={22} />
            </div>
            <div>
              <h2>Connect a camera</h2>
              <p>Enter your camera's RTSP stream address.</p>
            </div>
          </div>

          <form onSubmit={addCamera}>
            <label htmlFor="camera-name">Camera name</label>
            <input
              id="camera-name"
              placeholder="e.g. Main Gate"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={100}
              required
            />

            <label htmlFor="camera-url">RTSP source URL</label>
            <input
              id="camera-url"
              type="password"
              autoComplete="off"
              placeholder="rtsp://192.168.1.50:554/stream1"
              value={sourceUrl}
              onChange={(event) => setSourceUrl(event.target.value)}
              required
            />
            <p className="form-hint">
              Your source URL is sent to the backend and should never be
              displayed publicly.
            </p>

            <button
              className="primary-button submit-button"
              type="submit"
              disabled={submitting}
            >
              {submitting ? (
                <LoaderCircle className="spin" size={18} />
              ) : (
                <Wifi size={18} />
              )}
              {submitting ? "Connecting…" : "Save camera"}
            </button>
          </form>
        </section>
      )}

      {error && (
        <div className="alert error-alert">
          <span>{error}</span>
          <button onClick={() => setError("")}>
            <X size={17} />
          </button>
        </div>
      )}

      {notice && (
        <div className="alert success-alert">
          <span>{notice}</span>
          <button onClick={() => setNotice("")}>
            <X size={17} />
          </button>
        </div>
      )}

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">
            <Camera size={19} />
          </div>
          <span>Total cameras</span>
          <strong>{cameras.length}</strong>
          <small>Registered sources</small>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <Activity size={19} />
          </div>
          <span>Enabled cameras</span>
          <strong>{cameras.filter((camera) => camera.enabled).length}</strong>
          <small>Available to stream</small>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <Grid2X2 size={19} />
          </div>
          <span>Visible cameras</span>
          <strong>{filteredCameras.length}</strong>
          <small>In current view</small>
        </div>
      </section>

      <section className="camera-section">
        <div className="section-heading">
          <div>
            <h2>
              <LayoutGrid size={20} />
              Camera wall
            </h2>
            <p>Select a camera to start its on-demand stream.</p>
          </div>

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            aria-label="Filter cameras"
          >
            <option value="all">All cameras</option>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        {loading ? (
          <div className="empty-state">
            <LoaderCircle className="spin" size={30} />
            <p>Loading camera list…</p>
          </div>
        ) : filteredCameras.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Video size={30} />
            </div>
            <h3>No cameras to display</h3>
            <p>Add an RTSP camera to start building your camera wall.</p>
            <button
              className="primary-button"
              onClick={() => setShowForm(true)}
            >
              <CirclePlus size={18} />
              Add your first camera
            </button>
          </div>
        ) : (
          <div className="camera-grid">
            {filteredCameras.map((camera) => (
              <CameraPlayer
                key={camera.id}
                camera={camera}
                onRemove={removeCamera}
              />
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <span>StreamGuard · RTSP monitoring</span>
        <span>
          <span className="server-dot" /> MediaMTX playback
        </span>
      </footer>
    </main>
  );
}
