import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import TrackCard from "../components/TrackCard";
import { getPopularTracks } from "../services/deezerApi";

const HomePage = () => {
  const navigate = useNavigate();
  const { setCurrentTrack, setAlbumTracks } = useOutletContext(); // setters from Layout
  const [popularTracks, setPopularTracks] = useState([]);

  // Removed misplaced JSX fragment and paragraph

  // Load popular tracks
  useEffect(() => {
    const fetchPopular = async () => {
      const popular = await getPopularTracks();
      setPopularTracks(popular);
      if (popular.length > 0) {
        setCurrentTrack(popular[0]);
        setAlbumTracks(popular);
      }
    };
    fetchPopular();
  }, [setCurrentTrack, setAlbumTracks]);

  // Handlers for mood & genre filtering
  const handleMoodChange = (e) => {
    const mood = e.target.value;
    if (!mood) return;
    navigate(`/search/${mood}`);
  };

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    if (!genre) return;
    navigate(`/search/${genre}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      {/* Mood & Genre */}
      <div className="flex gap-4 mb-8">
        <select onChange={handleMoodChange} className="p-2 rounded bg-gray-200 text-gray-900">
          <option value="">Select Mood</option>
          <option value="happy">Happy</option>
          <option value="chill">Chill</option>
          <option value="romantic">Romantic</option>
          <option value="energetic">Energetic</option>
        </select>

        <select onChange={handleGenreChange} className="p-2 rounded bg-gray-200 text-gray-900">
          <option value="">Select Genre</option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="jazz">Jazz</option>
          <option value="electronic">Electronic</option>
        </select>
      </div>

      {/* Popular Right Now */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Right Now</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-6xl mb-8">
        {popularTracks.length > 0 ? (
          popularTracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              onClick={() => {
                setCurrentTrack(track);
                setAlbumTracks(popularTracks);
              }}
            />
          ))
        ) : (
          <p className="text-gray-600 col-span-full text-center">Loading popular tracks...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
