import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FiPlay } from "react-icons/fi";

const TrackCard = ({ 
  track, 
  albumTracks, 
  showAlbumArt = true, 
  onClick,
  variant = "grid", // "grid" or "horizontal"
  size = "medium", // "small", "medium", "large"
  showPlayButton = true,
  onPlayClick,
  style = {} // Allow external styling
}) => {
  const navigate = useNavigate();
  const { setCurrentTrack, setAlbumTracks } = useOutletContext();
  const [isHovered, setIsHovered] = useState(false);

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
    
    // ALWAYS navigate - this was the key in your working version
    navigate("/now-playing", { state: { track, albumTracks } });
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    console.log("=== TRACKCARD PLAY CLICK ===");
    console.log("Play button clicked for:", track.title);
    console.log("albumTracks prop:", albumTracks?.length || "undefined");

    // Use onPlayClick prop if provided, otherwise use onClick prop
    if (onPlayClick) {
      console.log("Using onPlayClick prop from parent");
      onPlayClick();
    } else if (onClick) {
      console.log("Using onClick prop from parent for play button");
      onClick();
    } else {
      // Fallback to default behavior
      console.log("Using default TrackCard play behavior");
      setCurrentTrack(track);
      setAlbumTracks(albumTracks || [track]);
    }
  };

  // Size configurations
  const sizeConfig = {
    small: {
      width: "140px",
      imageHeight: "140px",
      titleSize: "12px",
      artistSize: "10px",
      padding: "8px",
      playButtonSize: 16,
      playButtonPadding: "8px"
    },
    medium: {
      width: "180px",
      imageHeight: "180px",
      titleSize: "14px",
      artistSize: "12px",
      padding: "12px 8px",
      playButtonSize: 20,
      playButtonPadding: "12px"
    },
    large: {
      width: "220px",
      imageHeight: "220px",
      titleSize: "16px",
      artistSize: "14px",
      padding: "16px 12px",
      playButtonSize: 24,
      playButtonPadding: "14px"
    }
  };

  const config = sizeConfig[size];

  // Base card styles
  const getCardStyle = () => ({
    position: "relative",
    minWidth: variant === "horizontal" ? config.width : "auto",
    maxWidth: variant === "horizontal" ? config.width : "100%",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    flexShrink: variant === "horizontal" ? 0 : 1,
    transition: "all 0.3s ease",
    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
    boxShadow: isHovered 
      ? "0 8px 25px rgba(0,0,0,0.15)" 
      : "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#ffffff",
    ...style
  });

  // Album art container styles
  const getAlbumArtStyle = () => ({
    position: "relative",
    width: "100%",
    height: variant === "grid" ? "auto" : config.imageHeight,
    paddingTop: variant === "grid" ? "100%" : "0",
    backgroundColor: "#E5E7EB",
    backgroundImage: `url(${track.album?.cover_medium || track.album?.cover})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: variant === "horizontal" ? "8px" : "0",
    overflow: "hidden",
  });

  // Play button styles
  const getPlayButtonStyle = () => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#ffffff",
    backgroundColor: "rgba(208, 188, 255, 0.9)",
    borderRadius: "50%",
    padding: config.playButtonPadding,
    transition: "all 0.3s ease",
    opacity: isHovered ? 1 : 0.7,
    transform: isHovered 
      ? "translate(-50%, -50%) scale(1.1)" 
      : "translate(-50%, -50%) scale(1)",
    backdropFilter: "blur(10px)",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2
  });

  // Track info styles
  const getTrackInfoStyle = () => ({
    padding: config.padding
  });

  const getTitleStyle = () => ({
    fontWeight: "600",
    fontSize: config.titleSize,
    color: "#213547",
    margin: "0 0 4px 0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  });

  const getArtistStyle = () => ({
    fontSize: config.artistSize,
    color: "#6B7280",
    margin: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  });

  // For grid variant without custom play button (fallback to old style)
  if (variant === "grid" && !showPlayButton) {
    return (
      <div
        style={getCardStyle()}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {showAlbumArt && (
          <div style={getAlbumArtStyle()} />
        )}
        <div style={getTrackInfoStyle()}>
          <h3 style={getTitleStyle()}>{track.title}</h3>
          <p style={getArtistStyle()}>{track.artist.name}</p>
        </div>
        <button
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            backgroundColor: "#D0BCFF",
            padding: "4px 8px",
            borderRadius: "50%",
            color: "#ffffff",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer"
          }}
          onClick={handlePlayClick}
        >
          ▶
        </button>
      </div>
    );
  }

  return (
    <div
      style={getCardStyle()}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showAlbumArt && (
        <div style={getAlbumArtStyle()}>
          {showPlayButton && (
            <button
              style={getPlayButtonStyle()}
              className="play-button"
              onClick={handlePlayClick}
            >
              <FiPlay size={config.playButtonSize} />
            </button>
          )}
        </div>
      )}
      
      <div style={getTrackInfoStyle()}>
        <h3 style={getTitleStyle()}>{track.title}</h3>
        <p style={getArtistStyle()}>{track.artist.name}</p>
      </div>
    </div>
  );
};

export default TrackCard;