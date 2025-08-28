import React from "react";

const AlbumTrackList = ({ tracks, currentTrack, onTrackClick, isPlaying }) => {
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayButtonClick = (e, track) => {
    e.stopPropagation(); // Prevent row click from triggering
    console.log("AlbumTrackList: Play button clicked for:", track.title);
    onTrackClick(track); // This will handle both track selection and play/pause
  };

  const handleRowClick = (track) => {
    console.log("AlbumTrackList: Row clicked for:", track.title);
    onTrackClick(track);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {tracks.map((track, index) => (
        <div
          key={track.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 12px",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            backgroundColor: currentTrack?.id === track.id ? "#5B21B6" : "transparent",
            color: currentTrack?.id === track.id ? "#ffffff" : "#D0BCFF",
          }}
          onClick={() => handleRowClick(track)}
          onMouseEnter={(e) => {
            if (currentTrack?.id !== track.id) {
              e.currentTarget.style.backgroundColor = "#374151";
            }
          }}
          onMouseLeave={(e) => {
            if (currentTrack?.id !== track.id) {
              e.currentTarget.style.backgroundColor = "transparent";
            }
          }}
        >
          {/* Track number and info */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: "500", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {index + 1}. {track.title}
            </span>
            <span style={{ fontSize: "12px", color: "#A1A1AA" }}>{track.artist.name}</span>
          </div>
          
          {/* Duration and Play button */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: "#A1A1AA" }}>{formatDuration(track.duration)}</span>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "2px solid #D0BCFF",
                backgroundColor: currentTrack?.id === track.id && isPlaying ? "#D0BCFF" : "transparent",
                color: currentTrack?.id === track.id && isPlaying ? "#5B21B6" : "#D0BCFF",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontSize: "12px",
                fontWeight: "bold",
              }}
              onClick={(e) => handlePlayButtonClick(e, track)}
              onMouseEnter={(e) => {
                if (currentTrack?.id !== track.id || !isPlaying) {
                  e.target.style.backgroundColor = "#F3E8FF";
                  e.target.style.color = "#5B21B6";
                }
              }}
              onMouseLeave={(e) => {
                if (currentTrack?.id !== track.id || !isPlaying) {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#D0BCFF";
                }
              }}
            >
              {currentTrack?.id === track.id && isPlaying ? "⏸" : "▶"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbumTrackList;
