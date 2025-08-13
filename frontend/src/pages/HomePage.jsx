import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import TrackCard from "../components/TrackCard";
import { getPopularTracks } from "../services/deezerApi";

const HomePage = () => {
  const navigate = useNavigate();
  const [popularTracks, setPopularTracks] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      const tracks = await getPopularTracks();
      setPopularTracks(tracks);
    };
    fetchPopular();
  }, []);

  const handleSearch = (query) => {
    if (!query) return;
    navigate(`/search/${query}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-5xl font-bold text-white mb-2">
        🎧 <span className="text-pink-500">Echo</span>Dust
      </h1>
      <p className="text-gray-400 mb-8">Unlock the soundtrack of your soul.</p>

      {/* Search */}
      <div className="w-full max-w-lg mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Popular Tracks */}
      <h2 className="text-xl font-bold text-white mb-4">Popular Right Now</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-6xl">
        {popularTracks.length > 0 ? (
          popularTracks.map((track) => <TrackCard key={track.id} track={track} />)
        ) : (
          <p className="text-white">Loading popular tracks...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
