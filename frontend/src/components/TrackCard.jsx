// import React, { useState } from "react";
// import { useNavigate, useOutletContext } from "react-router-dom";
// import { FiPlay, FiPause } from "react-icons/fi";

// const TrackCard = ({
//   track,
//   albumTracks,
//   showAlbumArt = true,
//   onClick,
//   variant = "grid",
//   size = "medium",
//   showPlayButton = true,
//   onPlayClick,
//   isPlaying = false,
//   currentTrack,
//   togglePlay,
//   style = {},
// }) => {
//   const navigate = useNavigate();
//   const { setCurrentTrack, setAlbumTracks } = useOutletContext();
//   const [isHovered, setIsHovered] = useState(false);

//   const handleCardClick = () => {
//     console.log("TrackCard: Clicked", track?.title);
//     console.log("TrackCard: albumTracks length", albumTracks?.length || "undefined");
//     // Navigate to now-playing without updating playback state or calling onClick
//     navigate("/now-playing", { state: { track, albumTracks } });
//   };

//   const handlePlayClick = (e) => {
//     e.stopPropagation();
//     console.log("TrackCard: Play button clicked", track?.title);
//     console.log("TrackCard: Current track ID", currentTrack?.id, "Clicked track ID", track?.id);
//     console.log("TrackCard: isPlaying", isPlaying, "togglePlay exists", !!togglePlay);

//     if (onPlayClick) {
//       console.log("TrackCard: Using onPlayClick prop");
//       onPlayClick();
//     } else if (currentTrack?.id === track?.id && togglePlay) {
//       console.log("TrackCard: Toggling play/pause");
//       togglePlay();
//     } else {
//       console.log("TrackCard: Setting new track");
//       setCurrentTrack(track);
//       setAlbumTracks(albumTracks || [track]);
//     }
//   };

//   const sizeConfig = {
//     small: {
//       width: "140px",
//       imageHeight: "140px",
//       titleSize: "12px",
//       artistSize: "10px",
//       padding: "8px",
//       playButtonSize: 16,
//       playButtonPadding: "8px",
//     },
//     medium: {
//       width: "180px",
//       imageHeight: "180px",
//       titleSize: "14px",
//       artistSize: "12px",
//       padding: "12px 8px",
//       playButtonSize: 20,
//       playButtonPadding: "12px",
//     },
//     large: {
//       width: "220px",
//       imageHeight: "220px",
//       titleSize: "16px",
//       artistSize: "14px",
//       padding: "16px 12px",
//       playButtonSize: 24,
//       playButtonPadding: "14px",
//     },
//   };

//   const config = sizeConfig[size];

//   const getCardStyle = () => ({
//     position: "relative",
//     minWidth: variant === "horizontal" ? config.width : "auto",
//     maxWidth: variant === "horizontal" ? config.width : "100%",
//     borderRadius: "12px",
//     overflow: "hidden",
//     cursor: "pointer",
//     flexShrink: variant === "horizontal" ? 0 : 1,
//     transition: "all 0.3s ease",
//     transform: isHovered ? "translateY(-4px)" : "translateY(0)",
//     boxShadow: isHovered ? "0 8px 25px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.1)",
//     backgroundColor: "#ffffff",
//     ...style,
//   });

//   const getAlbumArtStyle = () => ({
//     position: "relative",
//     width: "100%",
//     height: variant === "grid" ? "auto" : config.imageHeight,
//     paddingTop: variant === "grid" ? "100%" : "0",
//     backgroundColor: "#E5E7EB",
//     backgroundImage: `url(${track?.album?.cover_medium || track?.album?.cover || ""})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     borderRadius: variant === "horizontal" ? "8px" : "0",
//     overflow: "hidden",
//   });

//   const getPlayButtonStyle = () => ({
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     color: "#ffffff",
//     backgroundColor: "rgba(208, 188, 255, 0.9)",
//     borderRadius: "50%",
//     padding: config.playButtonPadding,
//     transition: "all 0.3s ease",
//     opacity: isHovered ? 1 : 0.7,
//     transform: isHovered ? "translate(-50%, -50%) scale(1.1)" : "translate(-50%, -50%) scale(1)",
//     backdropFilter: "blur(10px)",
//     border: "none",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 2,
//   });

//   const getTrackInfoStyle = () => ({
//     padding: config.padding,
//   });

//   const getTitleStyle = () => ({
//     fontWeight: "600",
//     fontSize: config.titleSize,
//     color: "#213547",
//     margin: "0 0 4px 0",
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//     whiteSpace: "nowrap",
//   });

//   const getArtistStyle = () => ({
//     fontSize: config.artistSize,
//     color: "#6B7280",
//     margin: 0,
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//     whiteSpace: "nowrap",
//   });

//   if (!track) {
//     console.log("TrackCard: Skipping render - no track");
//     return null;
//   }

//   if (variant === "grid" && !showPlayButton) {
//     return (
//       <div
//         style={getCardStyle()}
//         onClick={handleCardClick}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {showAlbumArt && <div style={getAlbumArtStyle()} />}
//         <div style={getTrackInfoStyle()}>
//           <h3 style={getTitleStyle()}>{track.title || "Unknown Title"}</h3>
//           <p style={getArtistStyle()}>{track.artist?.name || "Unknown Artist"}</p>
//         </div>
//         <button
//           style={{
//             position: "absolute",
//             top: "8px",
//             right: "8px",
//             backgroundColor: "#D0BCFF",
//             padding: "4px 8px",
//             borderRadius: "50%",
//             color: "#ffffff",
//             fontWeight: "bold",
//             border: "none",
//             cursor: "pointer",
//           }}
//           onClick={handlePlayClick}
//         >
//           {isPlaying ? "⏸" : "▶"}
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={getCardStyle()}
//       onClick={handleCardClick}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {showAlbumArt && (
//         <div style={getAlbumArtStyle()}>
//           {showPlayButton && (
//             <button
//               style={getPlayButtonStyle()}
//               className="play-button"
//               onClick={handlePlayClick}
//             >
//               {isPlaying ? (
//                 <FiPause size={config.playButtonSize} />
//               ) : (
//                 <FiPlay size={config.playButtonSize} />
//               )}
//             </button>
//           )}
//         </div>
//       )}
//       <div style={getTrackInfoStyle()}>
//         <h3 style={getTitleStyle()}>{track.title || "Unknown Title"}</h3>
//         <p style={getArtistStyle()}>{track.artist?.name || "Unknown Artist"}</p>
//       </div>
//     </div>
//   );
// };

// export default TrackCard;












import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FiPlay, FiPause } from "react-icons/fi";

const TrackCard = ({
  track,
  albumTracks,
  showAlbumArt = true,
  variant = "grid",
  size = "medium",
  showPlayButton = true,
  isPlaying = false,
  currentTrack,
  togglePlay,
  style = {},
}) => {
  const navigate = useNavigate();
  const { setCurrentTrack, setAlbumTracks } = useOutletContext();
  const [isHovered, setIsHovered] = useState(false);

  // ✅ Card click only navigates, does NOT start track
  const handleCardClick = (e) => {
    // If the click was inside the play button, skip navigation
    if (e.target.closest(".play-button")) return;
    console.log("TrackCard: Navigating to album", track?.album?.title);
    navigate("/now-playing", { state: { track, albumTracks } });
  };

  // ✅ Play button only handles playback
  const handlePlayClick = (e) => {
    e.stopPropagation();
    console.log("TrackCard: Play clicked", track?.title);

    if (currentTrack?.id === track?.id && togglePlay) {
      console.log("TrackCard: Toggling play/pause");
      togglePlay();
    } else {
      console.log("TrackCard: Setting new track");
      setCurrentTrack(track);
      setAlbumTracks(albumTracks || [track]);
    }
  };

  const sizeConfig = {
    small: {
      width: "140px",
      imageHeight: "140px",
      titleSize: "12px",
      artistSize: "10px",
      padding: "8px",
      playButtonSize: 16,
      playButtonPadding: "8px",
    },
    medium: {
      width: "180px",
      imageHeight: "180px",
      titleSize: "14px",
      artistSize: "12px",
      padding: "12px 8px",
      playButtonSize: 20,
      playButtonPadding: "12px",
    },
    large: {
      width: "220px",
      imageHeight: "220px",
      titleSize: "16px",
      artistSize: "14px",
      padding: "16px 12px",
      playButtonSize: 24,
      playButtonPadding: "14px",
    },
  };

  const config = sizeConfig[size];

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
    boxShadow: isHovered ? "0 8px 25px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#ffffff",
    ...style,
  });

  const getAlbumArtStyle = () => ({
    position: "relative",
    width: "100%",
    height: variant === "grid" ? "auto" : config.imageHeight,
    paddingTop: variant === "grid" ? "100%" : "0",
    backgroundColor: "#E5E7EB",
    backgroundImage: `url(${track?.album?.cover_medium || track?.album?.cover || ""})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: variant === "horizontal" ? "8px" : "0",
    overflow: "hidden",
  });

  const getPlayButtonStyle = () => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    color: "#ffffff",
    backgroundColor: "rgba(208, 188, 255, 0.9)",
    borderRadius: "50%",
    padding: config.playButtonPadding,
    transition: "all 0.3s ease",
    opacity: isHovered ? 1 : 0.7,
    transform: isHovered ? "translate(-50%, -50%) scale(1.1)" : "translate(-50%, -50%) scale(1)",
    backdropFilter: "blur(10px)",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  });

  const getTrackInfoStyle = () => ({
    padding: config.padding,
  });

  const getTitleStyle = () => ({
    fontWeight: "600",
    fontSize: config.titleSize,
    color: "#213547",
    margin: "0 0 4px 0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  });

  const getArtistStyle = () => ({
    fontSize: config.artistSize,
    color: "#6B7280",
    margin: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  });

  if (!track) return null;

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
              {isPlaying && currentTrack?.id === track.id ? (
                <FiPause size={config.playButtonSize} />
              ) : (
                <FiPlay size={config.playButtonSize} />
              )}
            </button>
          )}
        </div>
      )}
      <div style={getTrackInfoStyle()}>
        <h3 style={getTitleStyle()}>{track.title || "Unknown Title"}</h3>
        <p style={getArtistStyle()}>{track.artist?.name || "Unknown Artist"}</p>
      </div>
    </div>
  );
};

export default TrackCard;
