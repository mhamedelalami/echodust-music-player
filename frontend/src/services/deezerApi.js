// const BASE_URL = '/api';

// /**
//  * Searches for tracks on Deezer.
//  * @param {string} query
//  * @returns {Promise<Array>} -
//  */
// export const searchTracks = async (query) => {
//   try {
//     const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);

//     if (!response.ok) {
//       throw new Error(`Network response was not ok: ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data.data || [];
//   } catch (error) {
//     console.error("Failed to fetch tracks:", error);
//     return [];
//   }
// };

// Deezer API helper functions

// Search tracks by query
export const searchTracks = async (query) => {
  try {
    const res = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${query}`
    );
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};

// Get popular tracks
export const getPopularTracks = async () => {
  try {
    const res = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/tracks`
    );
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching popular tracks:", error);
    return [];
  }
};
