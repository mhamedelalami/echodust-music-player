import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const TrackCard = ({ track, albumTracks }) => {
  const navigate = useNavigate();
  const { setCurrentTrack, setAlbumTracks } = useOutletContext(); // get setters from Layout

  // Handle click to update NowPlayingBar
  const handleClick = () => {
    setCurrentTrack(track);
    setAlbumTracks(albumTracks || [track]); // fallback if no albumTracks provided
    navigate("/now-playing", { state: { track, albumTracks } }); // optional: navigate to NowPlayingPage
  };

  return (
    <div
      className="bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer relative"
      onClick={handleClick}
    >
      <img
        src={track.album.cover_medium}
        alt={`Album art for ${track.title} by ${track.artist.name}`}
        className="w-full h-48 md:h-56 rounded-md mb-4 object-cover"
      />

      <div className="absolute top-2 right-2 bg-pink-500 p-1 rounded-full text-white font-bold">
        ▶
      </div>

      <div className="text-white">
        <h3 className="font-bold text-lg truncate">{track.title}</h3>
        <p className="text-sm text-gray-400">{track.artist.name}</p>
      </div>
    </div>
  );
};

export default TrackCard;

