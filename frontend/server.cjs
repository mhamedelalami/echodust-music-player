const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// node-fetch v3 is ESM-only; load it dynamically from CJS:
let _fetch;
async function fetchUrl(...args) {
  if (!_fetch) {
    _fetch = (await import("node-fetch")).default;
  }
  return _fetch(...args);
}

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
app.use(cors({ origin: true })); // allow all origins, or restrict in production
app.use(express.json());         // parse JSON bodies
app.use(morgan("dev"));          // log requests (good for debugging)

// --- Healthcheck route ---
app.get("/health", (_req, res) => res.json({ ok: true, uptime: process.uptime() }));

// --- Proxy handler ---
async function proxyAlbum(req, res) {
  const albumId = req.params.id;
  if (!albumId) {
    return res.status(400).json({ error: "Missing album id" });
  }

  try {
    const response = await fetchUrl(`https://api.deezer.com/album/${albumId}`, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Deezer error:", response.status, text);
      return res
        .status(response.status)
        .json({ error: "Deezer responded with an error", status: response.status });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error("Album fetch failed:", err);
    return res.status(500).json({ error: "Failed to fetch album" });
  }
}

// --- Routes ---
app.get("/api/album/:id", proxyAlbum);

// (Legacy alias, in case your frontend still calls /album/:id)
app.get("/album/:id", proxyAlbum);

// --- Start server ---
app.listen(PORT, () => {
  console.log(`CORS proxy running on http://localhost:${PORT}`);
});
