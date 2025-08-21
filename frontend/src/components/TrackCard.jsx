import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const TrackCard = ({ track, albumTracks, showAlbumArt = true, onClick }) => {
  const navigate = useNavigate();
  const { setCurrentTrack, setAlbumTracks } = useOutletContext();

  const handleCardClick = () => {
    console.log("=== TRACKCARD CLICK ===");
    console.log("Track clicked:", track.title);
    console.log("albumTracks prop:", albumTracks?.length || "undefined");
    console.log("onClick prop:", typeof onClick);

    // Use the onClick prop if provided (from HomePage)
    if (onClick) {
      console.log("Using onClick prop from parent");
      onClick();
    } else {
      // Fallback to default behavior
      console.log("Using default TrackCard behavior");
      setCurrentTrack(track);
      setAlbumTracks(albumTracks || [track]);
    }
    
    navigate("/now-playing", { state: { track, albumTracks } });
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    console.log("=== TRACKCARD PLAY CLICK ===");
    console.log("Play button clicked for:", track.title);
    console.log("albumTracks prop:", albumTracks?.length || "undefined");

    // Use the onClick prop if provided (from HomePage)
    if (onClick) {
      console.log("Using onClick prop from parent for play button");
      onClick();
    } else {
      // Fallback to default behavior
      console.log("Using default TrackCard play behavior");
      setCurrentTrack(track);
      setAlbumTracks(albumTracks || [track]);
    }
  };

  return (
    <div
      className="bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer relative"
      onClick={handleCardClick}
    >
      {showAlbumArt && (
        <img
          src={track.album.cover_medium}
          alt={`Album art for ${track.title}`}
          className="w-full h-48 md:h-56 rounded-md mb-4 object-cover"
        />
      )}
      <div className="text-white">
        <h3 className="font-bold text-lg truncate">{track.title}</h3>
        <p className="text-sm text-gray-400">{track.artist.name}</p>
      </div>
      <button
        className="absolute top-2 right-2 bg-pink-500 p-1 rounded-full text-white font-bold"
        onClick={handlePlayClick}
      >
        ▶
      </button>
    </div>
  );
};

export default TrackCard;