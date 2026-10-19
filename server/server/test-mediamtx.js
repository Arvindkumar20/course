
const API = "http://127.0.0.1:9997";

async function testMediaMTX() {
  try {
    const response = await fetch(`${API}/v3/paths/list`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    console.log("✅ MediaMTX connected!");
    console.log("Total paths:", data.itemCount);

    for (const camera of data.items) {
      console.log({
        cameraId: camera.name,
        ready: camera.ready,
        online: camera.online,
        tracks: camera.tracks,
        inboundBytes: camera.inboundBytes,
      });
    }
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
  }
}

testMediaMTX();
