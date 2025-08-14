// // Mock Deezer API for development

// export const getPopularTracks = async () => {
//   return [
//     {
//       id: 1,
//       title: "Track One",
//       artist: { name: "Artist One" },
//       album: { cover_medium: "https://via.placeholder.com/150" },
//       preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
//     },
//     {
//       id: 2,
//       title: "Track Two",
//       artist: { name: "Artist Two" },
//       album: { cover_medium: "https://via.placeholder.com/150" },
//       preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
//     },
//     {
//       id: 3,
//       title: "Track Three",
//       artist: { name: "Artist Three" },
//       album: { cover_medium: "https://via.placeholder.com/150" },
//       preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
//     }
//   ];
// };

// export const searchTracks = async (query) => {
//   return [
//     {
//       id: 101,
//       title: `Search Result 1 for "${query}"`,
//       artist: { name: "Artist A" },
//       album: { cover_medium: "https://via.placeholder.com/150" },
//       preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
//     },
//     {
//       id: 102,
//       title: `Search Result 2 for "${query}"`,
//       artist: { name: "Artist B" },
//       album: { cover_medium: "https://via.placeholder.com/150" },
//       preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
//     }
//   ];
// };

// export const getTracksByMood = async (mood) => {
//   return [
//     {
//       id: 201,
//       title: `${mood} Track 1`,
//       artist: { name: "Mood Artist 1" },
//       album: { cover_medium: "https://via.placeholder.com/150" },
//       preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
//     },
//     {
//       id: 202,
//       title: `${mood} Track 2`,
//       artist: { name: "Mood Artist 2" },
//       album: { cover_medium: "https://via.placeholder.com/150" },
//       preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
//     }
//   ];
// };

// export const getTracksByGenre = async (genre) => {
//   return [
//     {
//       id: 301,
//       title: `${genre} Track 1`,
//       artist: { name: "Genre Artist 1" },
//       album: { cover_medium: "https://via.placeholder.com/150" },
//       preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
//     },
//     {
//       id: 302,
//       title: `${genre} Track 2`,
//       artist: { name: "Genre Artist 2" },
//       album: { cover_medium: "https://via.placeholder.com/150" },
//       preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
//     }
//   ];
// };


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
  return [
    { id: 1, title: "Album Track 1", artist: { name: "Artist X" }, album: { cover_medium: "https://via.placeholder.com/150" }, preview: "..." },
    { id: 2, title: "Album Track 2", artist: { name: "Artist X" }, album: { cover_medium: "https://via.placeholder.com/150" }, preview: "..." },
  ];
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
