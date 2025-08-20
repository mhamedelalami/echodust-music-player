import React from "react";

const AlbumTrackList = ({ tracks, currentTrack, onTrackClick }) => {
  return (
    <div className="flex flex-col space-y-1">
      {tracks.map((track, index) => (
        <div
          key={track.id}
          className={`flex justify-between items-center p-2 rounded cursor-pointer transition-colors ${
            currentTrack?.id === track.id
              ? "bg-pink-600 text-white"
              : "hover:bg-gray-700 text-gray-200"
          }`}
          onClick={() => onTrackClick(track)}
        >
          {/* Track number and info */}
          <div className="flex flex-col">
            <span className="font-medium truncate">
              {index + 1}. {track.title}
            </span>
            <span className="text-sm text-gray-400 truncate">{track.artist.name}</span>
          </div>

          {/* Play button */}
          <button
            className="bg-pink-500 px-3 py-1 rounded-full text-white font-bold hover:bg-pink-700"
            onClick={(e) => {
              e.stopPropagation();
              onTrackClick(track);
            }}
          >
            ▶
          </button>
        </div>
      ))}
    </div>
  );
};

export default AlbumTrackList;

