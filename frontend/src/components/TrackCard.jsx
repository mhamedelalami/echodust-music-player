import React from 'react';
import { useNavigate } from 'react-router-dom';

const TrackCard = ({ track }) => {
  const navigate = useNavigate();
  const { title, artist, album } = track;

  // Handle click to go to NowPlayingPage
  const handleClick = () => {
    navigate('/now-playing', { state: { track } });
  };

  return (
    <div
      className="bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer relative"
      onClick={handleClick}
    >
      {/* Album art */}
      <img
        src={album.cover_medium}
        alt={`Album art for ${title} by ${artist.name}`}
        className="w-full h-48 md:h-56 rounded-md mb-4 object-cover"
      />

      {/* Optional play icon overlay */}
      <div className="absolute top-2 right-2 bg-pink-500 p-1 rounded-full text-white font-bold">
        ▶
      </div>

      {/* Track info */}
      <div className="text-white">
        <h3 className="font-bold text-lg truncate">{title}</h3>
        <p className="text-sm text-gray-400">{artist.name}</p>
      </div>
    </div>
  );
};

export default TrackCard;
