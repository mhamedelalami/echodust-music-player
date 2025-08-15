const express = require("express");
const cors = require("cors");

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/album/:id", async (req, res) => {
  const albumId = req.params.id;
  try {
    const response = await fetch(`https://api.deezer.com/album/${albumId}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch album" });
  }
});

app.listen(PORT, () => {
  console.log(`CORS proxy running on http://localhost:${PORT}`);
});
