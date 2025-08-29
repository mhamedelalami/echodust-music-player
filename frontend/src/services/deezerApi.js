const BASE_URL = "https://api.deezer.com";

// Helper function to fetch data via JSONP
const fetchJSONP = (url) =>
  new Promise((resolve, reject) => {
    const callbackName = `jsonp_callback_${Math.round(100000 * Math.random())}`;
    window[callbackName] = (data) => {
      delete window[callbackName];
      document.body.removeChild(script);
      resolve(data);
    };
    const script = document.createElement("script");
    script.src = `${url}&output=jsonp&callback=${callbackName}`;
    script.onerror = reject;
    document.body.appendChild(script);
  });

export const getPopularTracks = async () => {
  // Example: Top chart tracks
  const url = `${BASE_URL}/chart/0/tracks?limit=20`;
  const data = await fetchJSONP(url);
  return data.data || [];
};

export const searchTracks = async (query) => {
  const url = `${BASE_URL}/search?q=${encodeURIComponent(query)}&limit=20`;
  const data = await fetchJSONP(url);
  return data.data || [];
};

export const getTracksByAlbum = async (albumId) => {
  const url = `${BASE_URL}/album/${albumId}/tracks?limit=20`;
  const data = await fetchJSONP(url);
  return data.data || [];
};


// Mood and genre mapping
const MOOD_GENRE_MAP = {
  happy: "pop",
  chill: "chillout",
  romantic: "romantic",
  energetic: "dance",
  pop: "pop",
  rock: "rock",
  jazz: "jazz",
  electronic: "electronic"
};

export const getTracksByMood = async (mood) => {
  const genre = MOOD_GENRE_MAP[mood] || "pop";
  const url = `${BASE_URL}/search?q=genre:"${genre}"&limit=20`;
  const data = await fetchJSONP(url);
  return data.data || [];
};

export const getTracksByGenre = async (genre) => {
  const url = `${BASE_URL}/search?q=genre:"${genre}"&limit=20`;
  const data = await fetchJSONP(url);
  return data.data || [];
};












