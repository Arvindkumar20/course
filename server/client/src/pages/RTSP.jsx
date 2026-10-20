// import { useEffect, useRef, useState } from "react";
// import Hls from "hls.js";
// import {
//   Activity,
//   Camera,
//   CirclePlus,
//   Grid2X2,
//   LayoutGrid,
//   LoaderCircle,
//   Play,
//   Radio,
//   RefreshCw,
//   ShieldCheck,
//   Trash2,
//   Video,
//   Wifi,
//   X,
// } from "lucide-react";

// const API = import.meta.env.VITE_API_BASE_URL || "";
// const SERVER_HOST = import.meta.env.VITE_MEDIAMTX_HOST || "127.0.0.1";

// async function apiRequest(path, options = {}) {
//   const response = await fetch(`${API}${path}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...(options.headers || {}),
//     },
//   });

//   if (!response.ok) {
//     const data = await response.json().catch(() => ({}));
//     throw new Error(data.error || `Request failed (${response.status})`);
//   }

//   if (response.status === 204) return null;
//   return response.json();
// }

// function CameraPlayer({ camera, onRemove }) {
//   const videoRef = useRef(null);
//   const hlsRef = useRef(null);
//   const [playing, setPlaying] = useState(false);
//   const [status, setStatus] = useState("Waiting for playback");
//   const [error, setError] = useState("");

//   const hlsUrl =
//     camera.hlsUrl ||
//     `http://${SERVER_HOST || "127.0.0.1"}:8888/${camera.id}/index.m3u8`;
// console.log(hlsUrl)
//   function stopPlayback() {
//     if (hlsRef.current) {
//       hlsRef.current.destroy();
//       hlsRef.current = null;
//     }

//     const video = videoRef.current;
//     if (video) {
//       video.pause();
//       video.removeAttribute("src");
//       video.load();
//     }

//     setPlaying(false);
//     setStatus("Stopped");
//   }

//   function startPlayback() {
//     const video = videoRef.current;
//     if (!video) return;

//     setError("");
//     setStatus("Connecting to stream…");

//     if (hlsRef.current) {
//       hlsRef.current.destroy();
//       hlsRef.current = null;
//     }

//     // Safari can play HLS natively.
//     if (video.canPlayType("application/vnd.apple.mpegurl")) {
//       video.src = hlsUrl;
//       video
//         .play()
//         .then(() => {
//           setPlaying(true);
//           setStatus("Live");
//         })
//         .catch(() => setStatus("Click play to start"));
//       return;
//     }

//     if (!Hls.isSupported()) {
//       setError("This browser does not support HLS playback.");
//       setStatus("Playback unavailable");
//       return;
//     }

//     const hls = new Hls({
//       enableWorker: true,
//       lowLatencyMode: true,
//       maxBufferLength: 10,
//     });

//     hlsRef.current = hls;

//     hls.on(Hls.Events.MEDIA_ATTACHED, () => {
//       hls.loadSource(hlsUrl);
//     });

//     hls.on(Hls.Events.MANIFEST_PARSED, () => {
//       video
//         .play()
//         .then(() => {
//           setPlaying(true);
//           setStatus("Live");
//         })
//         .catch(() => setStatus("Click play to start"));
//     });

//     hls.on(Hls.Events.ERROR, (_event, data) => {
//       if (!data.fatal) return;

//       setPlaying(false);
//       setStatus("Stream unavailable");
//       setError(
//         data.type === Hls.ErrorTypes.NETWORK_ERROR
//           ? "Cannot load the stream. Check the camera source and MediaMTX HLS port."
//           : "The stream failed. Check the camera codec and server logs.",
//       );

//       hls.destroy();
//       hlsRef.current = null;
//     });

//     hls.loadSource(hlsUrl);
//     hls.attachMedia(video);
//   }

//   useEffect(() => {
//     return () => {
//       hlsRef.current?.destroy();
//     };
//   }, []);
//   return (
//     <article className="camera-card">
//       <div className="camera-video">
//         <video
//           // src={camera.webrtcUrl}
//           controls
//           autoPlay
//           ref={videoRef}
//           // src={camera.webrtcUrl}
//           // controls
//           muted
//           playsInline
//           preload="none"
//           onPlaying={() => {
//             setPlaying(true);
//             setStatus("Live");
//           }}
//           onWaiting={() => setStatus("Buffering…")}
//           onPause={() => {
//             if (playing) setStatus("Paused");
//           }}
//           onError={(err) => {
//             console.log(err)
//             if (!hlsRef.current) {
//               setError("Unable to play this stream.");
//             }
//           }}
//         />
//         {/* <iframe
//           src={`${camera.webrtcUrl}/?controls=true&muted=true&autoplay=true&playsinline=true`}
//           title="Live Camera"
//           allow="autoplay; fullscreen; picture-in-picture"
//           style={{
//             width: "100%",
//             aspectRatio: "16 / 9",
//             border: "none",
//             borderRadius: "8px",
//           }}
//         /> */}
//         {!playing && (
//           <div className="video-overlay">
//             <div className="camera-icon">
//               <Video size={26} />
//             </div>
//             <span>{error || status}</span>
//             <button
//               className="play-button"
//               onClick={startPlayback}
//               title="Start camera"
//             >
//               <Play size={17} fill="currentColor" />
//               Play stream
//             </button>
//           </div>
//         )}

//         <span className={`live-badge ${playing ? "is-live" : ""}`}>
//           <span className="live-dot" />
//           {playing ? "LIVE" : "OFFLINE"}
//         </span>

//         <button
//           className="remove-button"
//           title="Remove camera"
//           onClick={() => onRemove(camera)}
//         >
//           <Trash2 size={17} />
//         </button>
//       </div>

//       <div className="camera-details">
//         <div className="camera-title">
//           <div className="camera-small-icon">
//             <Camera size={18} />
//           </div>
//           <div className="camera-name">
//             <strong>{camera.name}</strong>
//             <span>/{camera.id}</span>
//           </div>
//         </div>

//         <div className="camera-actions">
//           <span className="camera-status">
//             <Activity size={14} />
//             {status}
//           </span>

//           {playing ? (
//             <button
//               className="icon-button"
//               onClick={stopPlayback}
//               title="Stop playback"
//             >
//               <X size={17} />
//             </button>
//           ) : (
//             <button
//               className="icon-button"
//               onClick={startPlayback}
//               title="Play camera"
//             >
//               <Play size={16} />
//             </button>
//           )}
//         </div>
//       </div>
//     </article>
//   );
// }

// export default function RTSP() {
//   const [cameras, setCameras] = useState([]);
//   const [name, setName] = useState("");
//   const [sourceUrl, setSourceUrl] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [notice, setNotice] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [filter, setFilter] = useState("all");

//   async function loadCameras() {
//     setError("");
//     try {
//       const data = await apiRequest("/rtsp");
//       console.log(data);
//       setCameras(data);
//     } catch (err) {
//       setError(err.message || "Unable to load cameras.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     loadCameras();
//   }, []);

//   async function addCamera(event) {
//     event.preventDefault();
//     setSubmitting(true);
//     setError("");
//     setNotice("");

//     try {
//       const camera = await apiRequest("/rtsp", {
//         method: "POST",
//         body: JSON.stringify({
//           name: name.trim(),
//           sourceUrl: sourceUrl.trim(),
//         }),
//       });

//       setCameras((current) => [camera, ...current]);
//       setName("");
//       setSourceUrl("");
//       setShowForm(false);
//       setNotice("Camera added. Select Play to start its stream.");
//     } catch (err) {
//       setError(err.message || "Could not add camera.");
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   async function removeCamera(camera) {
//     if (!window.confirm(`Remove "${camera.name}" from your dashboard?`)) {
//       return;
//     }

//     setError("");
//     try {
//       await apiRequest(`/rtsp/${camera.id}`, {
//         method: "DELETE",
//       });

//       setCameras((current) => current.filter((item) => item.id !== camera.id));
//       setNotice(`${camera.name} removed.`);
//     } catch (err) {
//       setError(err.message || "Could not remove camera.");
//     }
//   }

//   const filteredCameras = cameras.filter((camera) => {
//     if (filter === "enabled") return camera.enabled;
//     if (filter === "disabled") return !camera.enabled;
//     return true;
//   });

//   return (
//     <main className="dashboard">
//       <header className="topbar">
//         <a className="brand" href="/" aria-label="StreamGuard home">
//           <div className="brand-mark">
//             <ShieldCheck size={23} />
//           </div>
//           <div>
//             <strong>StreamGuard</strong>
//             <span>VIDEO MANAGEMENT</span>
//           </div>
//         </a>

//         <div className="server-indicator">
//           <span className="server-dot" />
//           <span>STREAM DASHBOARD</span>
//         </div>

//         <button className="refresh-button" onClick={loadCameras}>
//           <RefreshCw size={16} />
//           Refresh
//         </button>
//       </header>

//       <section className="welcome">
//         <div>
//           <div className="eyebrow">
//             <Radio size={15} />
//             REAL-TIME MONITORING
//           </div>
//           <h1>Your camera wall.</h1>
//           <p>
//             Connect RTSP cameras and monitor multiple live streams from one
//             dashboard.
//           </p>
//         </div>

//         <button
//           className="primary-button"
//           onClick={() => {
//             setShowForm((value) => !value);
//             setError("");
//           }}
//         >
//           {showForm ? <X size={18} /> : <CirclePlus size={19} />}
//           {showForm ? "Cancel" : "Add camera"}
//         </button>
//       </section>

//       {showForm && (
//         <section className="add-panel">
//           <div className="form-heading">
//             <div className="form-icon">
//               <Camera size={22} />
//             </div>
//             <div>
//               <h2>Connect a camera</h2>
//               <p>Enter your camera's RTSP stream address.</p>
//             </div>
//           </div>

//           <form onSubmit={addCamera}>
//             <label htmlFor="camera-name">Camera name</label>
//             <input
//               id="camera-name"
//               placeholder="e.g. Main Gate"
//               value={name}
//               onChange={(event) => setName(event.target.value)}
//               maxLength={100}
//               required
//             />

//             <label htmlFor="camera-url">RTSP source URL</label>
//             <input
//               id="camera-url"
//               type="password"
//               autoComplete="off"
//               placeholder="rtsp://192.168.1.50:554/stream1"
//               value={sourceUrl}
//               onChange={(event) => setSourceUrl(event.target.value)}
//               required
//             />
//             <p className="form-hint">
//               Your source URL is sent to the backend and should never be
//               displayed publicly.
//             </p>

//             <button
//               className="primary-button submit-button"
//               type="submit"
//               disabled={submitting}
//             >
//               {submitting ? (
//                 <LoaderCircle className="spin" size={18} />
//               ) : (
//                 <Wifi size={18} />
//               )}
//               {submitting ? "Connecting…" : "Save camera"}
//             </button>
//           </form>
//         </section>
//       )}

//       {error && (
//         <div className="alert error-alert">
//           <span>{error}</span>
//           <button onClick={() => setError("")}>
//             <X size={17} />
//           </button>
//         </div>
//       )}

//       {notice && (
//         <div className="alert success-alert">
//           <span>{notice}</span>
//           <button onClick={() => setNotice("")}>
//             <X size={17} />
//           </button>
//         </div>
//       )}

//       <section className="stats-grid">
//         <div className="stat-card">
//           <div className="stat-icon purple">
//             <Camera size={19} />
//           </div>
//           <span>Total cameras</span>
//           <strong>{cameras.length}</strong>
//           <small>Registered sources</small>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon green">
//             <Activity size={19} />
//           </div>
//           <span>Enabled cameras</span>
//           <strong>{cameras.filter((camera) => camera.enabled).length}</strong>
//           <small>Available to stream</small>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon blue">
//             <Grid2X2 size={19} />
//           </div>
//           <span>Visible cameras</span>
//           <strong>{filteredCameras.length}</strong>
//           <small>In current view</small>
//         </div>
//       </section>

//       <section className="camera-section">
//         <div className="section-heading">
//           <div>
//             <h2>
//               <LayoutGrid size={20} />
//               Camera wall
//             </h2>
//             <p>Select a camera to start its on-demand stream.</p>
//           </div>

//           <select
//             value={filter}
//             onChange={(event) => setFilter(event.target.value)}
//             aria-label="Filter cameras"
//           >
//             <option value="all">All cameras</option>
//             <option value="enabled">Enabled</option>
//             <option value="disabled">Disabled</option>
//           </select>
//         </div>

//         {loading ? (
//           <div className="empty-state">
//             <LoaderCircle className="spin" size={30} />
//             <p>Loading camera list…</p>
//           </div>
//         ) : filteredCameras.length === 0 ? (
//           <div className="empty-state">
//             <div className="empty-icon">
//               <Video size={30} />
//             </div>
//             <h3>No cameras to display</h3>
//             <p>Add an RTSP camera to start building your camera wall.</p>
//             <button
//               className="primary-button"
//               onClick={() => setShowForm(true)}
//             >
//               <CirclePlus size={18} />
//               Add your first camera
//             </button>
//           </div>
//         ) : (
//           <div className="camera-grid">
//             {filteredCameras.map((camera) => (
//               <CameraPlayer
//                 key={camera.id}
//                 camera={camera}
//                 onRemove={removeCamera}
//               />
//             ))}
//           </div>
//         )}
//       </section>

//       <footer className="footer">
//         <span>StreamGuard · RTSP monitoring</span>
//         <span>
//           <span className="server-dot" /> MediaMTX playback
//         </span>
//       </footer>
//     </main>
//   );
// }





import { useEffect, useMemo, useRef, useState } from "react";
import Hls from "hls.js";
import {
  Activity, Camera, CirclePlus, Grid2X2, LayoutGrid, LoaderCircle,
  Play, Radio, RefreshCw, Search, ShieldCheck, Trash2, Video, Wifi, X,
} from "lucide-react";

const API = import.meta.env.VITE_API_BASE_URL || "";
const SERVER_HOST = import.meta.env.VITE_MEDIAMTX_HOST || "127.0.0.1";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
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
  const [status, setStatus] = useState("Ready to connect");
  const [error, setError] = useState("");

  const hlsUrl = camera.hlsUrl || `http://${SERVER_HOST}:8888/${camera.id}/index.m3u8`;

  function stopPlayback() {
    hlsRef.current?.destroy();
    hlsRef.current = null;
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
    setPlaying(false);
    setError("");
    setStatus("Stopped");
  }

  function startPlayback() {
    const video = videoRef.current;
    if (!video) return;
    setError("");
    setStatus("Connecting…");
    hlsRef.current?.destroy();
    hlsRef.current = null;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsUrl;
      video.play().catch(() => setStatus("Press play in the video controls"));
      return;
    }
    if (!Hls.isSupported()) {
      setStatus("Playback unavailable");
      setError("This browser does not support HLS playback.");
      return;
    }

    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true,
      maxBufferLength: 10,
      backBufferLength: 30,
    });
    hlsRef.current = hls;
    hls.on(Hls.Events.MEDIA_ATTACHED, () => hls.loadSource(hlsUrl));
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play().catch(() => setStatus("Press play in the video controls"));
    });
    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (!data.fatal) return;
      setPlaying(false);
      setStatus("Stream unavailable");
      setError(data.type === Hls.ErrorTypes.NETWORK_ERROR
        ? "Cannot load stream. Check the camera source and MediaMTX HLS port."
        : "Playback failed. Check stream codec and MediaMTX logs.");
      hls.destroy();
      hlsRef.current = null;
    });
    hls.attachMedia(video);
  }

  useEffect(() => () => hlsRef.current?.destroy(), []);

  return (
    <article className="sg-camera-card">
      <div className="sg-video-frame">
        <video
          ref={videoRef}
          controls
          playsInline
          preload="none"
          // muted
          disablePictureInPicture={false}
          onPlaying={() => { setPlaying(true); setError(""); setStatus("Live"); }}
          onWaiting={() => setStatus("Buffering…")}
          onPause={() => { setPlaying(false); setStatus("Paused"); }}
          onEnded={() => { setPlaying(false); setStatus("Ended"); }}
          onError={() => {
            if (!hlsRef.current && videoRef.current?.currentSrc) {
              setError("Unable to play this stream.");
              setStatus("Playback error");
            }
          }}
        />
        {!playing && (
          <div className="sg-video-placeholder">
            <div className="sg-placeholder-icon"><Video size={27} /></div>
            <strong>{error ? "Stream unavailable" : status}</strong>
            {error && <p>{error}</p>}
            <button className="sg-start-button" onClick={startPlayback}>
              <Play size={16} fill="currentColor" /> {error ? "Retry stream" : "Connect stream"}
            </button>
          </div>
        )}
        <span className={`sg-live-pill ${playing ? "is-live" : ""}`}>
          <span /> {playing ? "LIVE" : "NOT PLAYING"}
        </span>
      </div>

      <div className="sg-camera-info">
        <div className="sg-camera-heading">
          <div className="sg-camera-icon"><Camera size={18} /></div>
          <div className="sg-camera-name">
            <strong title={camera.name}>{camera.name}</strong>
            <span title={camera.id}>ID: {camera.id}</span>
          </div>
          <button className="sg-remove-button" title={`Remove ${camera.name}`} aria-label={`Remove ${camera.name}`} onClick={() => onRemove(camera)}>
            <Trash2 size={16} />
          </button>
        </div>
        <div className="sg-camera-footer">
          <span className={`sg-status ${playing ? "online" : ""}`}><Activity size={14} />{status}</span>
          <button className="sg-text-button" onClick={playing ? stopPlayback : startPlayback}>
            {playing ? <><X size={15} /> Stop</> : <><Play size={15} /> Start</>}
          </button>
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
  const [refreshing, setRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [columns, setColumns] = useState("3");

  async function loadCameras() {
    setError("");
    setRefreshing(true);
    try {
      const data = await apiRequest("/rtsp");
      setCameras(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Unable to load cameras.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => { loadCameras(); }, []);

  async function addCamera(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setNotice("");
    try {
      const camera = await apiRequest("/rtsp", {
        method: "POST",
        body: JSON.stringify({ name: name.trim(), sourceUrl: sourceUrl.trim() }),
      });
      setCameras(current => [camera, ...current]);
      setName("");
      setSourceUrl("");
      setShowForm(false);
      setNotice("Camera added. Connect its stream when you're ready.");
    } catch (err) {
      setError(err.message || "Could not add camera.");
    } finally {
      setSubmitting(false);
    }
  }

  async function removeCamera(camera) {
    if (!window.confirm(`Remove "${camera.name}" from your dashboard?`)) return;
    setError("");
    try {
      await apiRequest(`/rtsp/${camera.id}`, { method: "DELETE" });
      setCameras(current => current.filter(item => item.id !== camera.id));
      setNotice(`${camera.name} removed.`);
    } catch (err) {
      setError(err.message || "Could not remove camera.");
    }
  }

  const filteredCameras = useMemo(() => cameras.filter(camera => {
    const matchesFilter = filter === "all" ||
      (filter === "enabled" ? Boolean(camera.enabled) : !camera.enabled);
    const term = search.trim().toLowerCase();
    const matchesSearch = !term || `${camera.name || ""} ${camera.id || ""}`.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  }), [cameras, filter, search]);

  const enabledCount = cameras.filter(camera => camera.enabled).length;

  return (
    <main className="sg-dashboard">
      <header className="sg-topbar">
        <a className="sg-brand" href="/" aria-label="StreamGuard home">
          <span className="sg-brand-mark"><ShieldCheck size={22} /></span>
          <span><strong>StreamGuard</strong><small>VIDEO MANAGEMENT</small></span>
        </a>
        <div className="sg-server-label"><span className="sg-server-dot" /> MEDIA SERVER DASHBOARD</div>
        <button className="sg-secondary-button" onClick={loadCameras} disabled={refreshing}>
          <RefreshCw size={16} className={refreshing ? "sg-spin" : ""} /> Refresh
        </button>
      </header>

      <section className="sg-hero">
        <div>
          <div className="sg-eyebrow"><Radio size={15} /> REAL-TIME MONITORING</div>
          <h1>Camera monitoring<span>.</span></h1>
          <p>Manage your RTSP sources and monitor live feeds from one workspace.</p>
        </div>
        <button className="sg-primary-button" onClick={() => { setShowForm(v => !v); setError(""); }}>
          {showForm ? <X size={18} /> : <CirclePlus size={18} />} {showForm ? "Cancel" : "Add camera"}
        </button>
      </section>

      {showForm && <section className="sg-add-panel">
        <div className="sg-form-title"><span className="sg-form-icon"><Camera size={21} /></span><div><h2>Connect a camera</h2><p>Add the camera name and its RTSP source URL.</p></div></div>
        <form className="sg-camera-form" onSubmit={addCamera}>
          <div className="sg-field"><label htmlFor="sg-camera-name">Camera name</label><input id="sg-camera-name" placeholder="e.g. Main Gate" value={name} onChange={e => setName(e.target.value)} maxLength={100} required /></div>
          <div className="sg-field"><label htmlFor="sg-camera-url">RTSP source URL</label><input id="sg-camera-url" type="password" autoComplete="off" placeholder="rtsp://192.168.1.50:554/stream1" value={sourceUrl} onChange={e => setSourceUrl(e.target.value)} required /><small>Credentials are submitted to your backend; avoid exposing source URLs in the UI.</small></div>
          <button className="sg-primary-button sg-submit-button" type="submit" disabled={submitting}>{submitting ? <LoaderCircle size={17} className="sg-spin" /> : <Wifi size={17} />}{submitting ? "Saving…" : "Save camera"}</button>
        </form>
      </section>}

      {error && <div className="sg-alert is-error"><span>{error}</span><button onClick={() => setError("")} aria-label="Dismiss error"><X size={16} /></button></div>}
      {notice && <div className="sg-alert is-success"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss message"><X size={16} /></button></div>}

      <section className="sg-stats">
        <div className="sg-stat-card"><span className="sg-stat-icon purple"><Camera size={18} /></span><div><small>Total cameras</small><strong>{cameras.length}</strong><p>Registered sources</p></div></div>
        <div className="sg-stat-card"><span className="sg-stat-icon green"><Activity size={18} /></span><div><small>Enabled cameras</small><strong>{enabledCount}</strong><p>Allowed to stream</p></div></div>
        <div className="sg-stat-card"><span className="sg-stat-icon blue"><Grid2X2 size={18} /></span><div><small>Visible cameras</small><strong>{filteredCameras.length}</strong><p>Current selection</p></div></div>
      </section>

      <section className="sg-camera-section">
        <div className="sg-section-heading">
          <div><h2><LayoutGrid size={20} /> Camera wall</h2><p>Use the native video controls for volume, seeking, and fullscreen where supported.</p></div>
          <span className="sg-feed-count">{filteredCameras.length} FEED{filteredCameras.length === 1 ? "" : "S"}</span>
        </div>

        <div className="sg-toolbar">
          <label className="sg-search"><Search size={17} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search camera name or ID…" aria-label="Search cameras" /></label>
          <div className="sg-toolbar-right">
            <select value={filter} onChange={e => setFilter(e.target.value)} aria-label="Filter cameras"><option value="all">All cameras</option><option value="enabled">Enabled</option><option value="disabled">Disabled</option></select>
            <div className="sg-layout-switch" aria-label="Camera grid columns">
              {[{ value: "1", label: "1 column" }, { value: "2", label: "2 columns" }, { value: "3", label: "3 columns" }, { value: "4", label: "4 columns" }].map(item =>
                <button key={item.value} className={columns === item.value ? "active" : ""} onClick={() => setColumns(item.value)} aria-label={item.label} title={item.label}>{item.value}</button>
              )}
            </div>
          </div>
        </div>

        {loading ? <div className="sg-empty-state"><LoaderCircle size={28} className="sg-spin" /><p>Loading camera list…</p></div>
          : filteredCameras.length === 0 ? <div className="sg-empty-state"><span className="sg-empty-icon"><Video size={28} /></span><h3>{cameras.length ? "No matching cameras" : "No cameras yet"}</h3><p>{cameras.length ? "Try another search or filter." : "Add an RTSP source to start building your camera wall."}</p>{!cameras.length && <button className="sg-primary-button" onClick={() => setShowForm(true)}><CirclePlus size={17} /> Add your first camera</button>}</div>
          : <div className="sg-camera-grid" style={{ "--sg-columns": columns }}>{filteredCameras.map(camera => <CameraPlayer key={camera.id} camera={camera} onRemove={removeCamera} />)}</div>}
      </section>

      <footer className="sg-footer"><span>StreamGuard <i>·</i> RTSP monitoring</span><span><span className="sg-server-dot" /> MediaMTX playback</span></footer>
    </main>
  );
}
