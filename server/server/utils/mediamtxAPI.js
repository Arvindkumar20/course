const MEDIAMTX_API = "http://127.0.0.1:9997";

async function mediaMtxRequest(path, options = {}) {
  const response = await fetch(`${MEDIAMTX_API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`MediaMTX API error ${response.status}: ${text}`);
  }

  return text ? JSON.parse(text) : null;
}

// Existing active streams ki list
export async function getMediaMtxPaths() {
  return mediaMtxRequest("/v3/paths/list");
}

// RTSP camera ko MediaMTX path se connect karo
export async function addCameraToMediaMtx({ cameraId, rtspUrl }) {
  if (!/^[a-zA-Z0-9_-]+$/.test(cameraId)) {
    throw new Error("Invalid camera ID");
  }

  if (!/^rtsps?:\/\//i.test(rtspUrl)) {
    throw new Error("A valid RTSP URL is required");
  }

  return mediaMtxRequest(
    `/v3/config/paths/add/${encodeURIComponent(cameraId)}`,
    {
      method: "POST",
      body: JSON.stringify({
        source: rtspUrl,
      }),
    },
  );
}

export async function addDynamicCamera(camDetails) {
  // console.log(cameraId);
  const { cameraId, rtspUrl } = camDetails;
  // Camera path ko safe rakho
  if (!/^[a-z0-9]+$/.test(cameraId)) {
    throw new Error("Invalid camera ID");
  }

  // Different domains aur IP addresses allow hain
  let parsedUrl;

  try {
    parsedUrl = new URL(rtspUrl);
  } catch {
    throw new Error("Invalid RTSP URL");
  }

  if (!["rtsp:", "rtsps:"].includes(parsedUrl.protocol)) {
    throw new Error("Only RTSP/RTSPS URLs are allowed");
  }

  const response = await fetch(
    `${MEDIAMTX_API}/v3/config/paths/add/${encodeURIComponent(cameraId)}`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: rtspUrl,
      }),
    },
  );

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`MediaMTX error ${response.status}: ${responseText}`);
  }

  return {
    cameraId,
    configured: true,
  };
}
