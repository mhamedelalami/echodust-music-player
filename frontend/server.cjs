// frontend/api/album/[id].js
export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Missing album id" });
  }

  try {
    // node-fetch is already included in Vercel Node runtime
    const response = await fetch(`https://api.deezer.com/album/${id}`, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
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
    return res.status(200).json(data);
  } catch (err) {
    console.error("Album fetch failed:", err);
    return res.status(500).json({ error: "Failed to fetch album" });
  }
}
