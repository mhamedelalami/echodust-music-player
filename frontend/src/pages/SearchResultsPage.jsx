import React, { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import TrackCard from "../components/TrackCard";
import BackHomeButton from "../components/BackHomeButton";
import { searchTracks, getTracksByMood, getTracksByGenre } from "../services/deezerApi";

const SearchResultsPage = () => {
  const { query } = useParams();
  const { setCurrentTrack, setAlbumTracks } = useOutletContext(); // to update NowPlayingBar
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (!query) return;

      setIsLoading(true);
      // Decide if it's mood, genre, or generic search
      let results = [];
      if (["happy","chill","romantic","energetic"].includes(query)) {
        results = await getTracksByMood(query);
      } else if (["pop","rock","jazz","electronic"].includes(query)) {
        results = await getTracksByGenre(query);
      } else {
        results = await searchTracks(query);
      }
      setTracks(results);
      setIsLoading(false);
    };

    performSearch();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
      {/* Back button */}
      <BackHomeButton />

      <h2 className="text-2xl sm:text-3xl font-bold mt-4 mb-6">
        Results for: <span className="text-pink-500">"{query}"</span>
      </h2>

      {isLoading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tracks.length > 0 ? (
            tracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                onClick={() => {
                  setCurrentTrack(track);
                  setAlbumTracks(tracks);
                }}
              />
            ))
          ) : (
            <p className="text-center text-gray-400">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;

