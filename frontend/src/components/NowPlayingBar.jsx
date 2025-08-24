import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function NowPlayingBar({
  currentTrack,
  albumTracks,
  setCurrentTrack,
  setAlbumTracks,
  onInfoClick
}) {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isVolumeHovered, setIsVolumeHovered] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [progressHover, setProgressHover] = useState(false);

  // Keep trackIndex in sync with currentTrack
  useEffect(() => {
    if (!albumTracks || !currentTrack) return;
    const index = albumTracks.findIndex((t) => t.id === currentTrack.id);
    setTrackIndex(index >= 0 ? index : 0);
    setIsPlaying(true);
  }, [currentTrack, albumTracks]);

  // Load and play when trackIndex changes
  useEffect(() => {
    if (!albumTracks || albumTracks.length === 0) return;
    const track = albumTracks[trackIndex];
    if (!track || !audioRef.current) return;

    if (audioRef.current.src !== track.preview) {
      audioRef.current.src = track.preview;
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [trackIndex, albumTracks, volume, isPlaying]);

  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  // Next track
  const handleNextTrack = useCallback(() => {
    if (!albumTracks || albumTracks.length === 0) return;

    setTrackIndex((prev) => {
      const nextIndex = (prev + 1) % albumTracks.length;
      const nextTrack = albumTracks[nextIndex];
      setCurrentTrack?.(nextTrack);
      setIsPlaying(true);
      return nextIndex;
    });
  }, [albumTracks, setCurrentTrack]);

  // Prev track
  const handlePrevTrack = useCallback(() => {
    if (!albumTracks || albumTracks.length === 0) return;

    setTrackIndex((prev) => {
      const prevIndex = (prev - 1 + albumTracks.length) % albumTracks.length;
      const prevTrack = albumTracks[prevIndex];
      setCurrentTrack?.(prevTrack);
      setIsPlaying(true);
      return prevIndex;
    });
  }, [albumTracks, setCurrentTrack]);

  // Progress bar update + auto-next
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress((audio.currentTime / audio.duration) * 100 || 0);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleNextTrack);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleNextTrack);
    };
  }, [handleNextTrack]);

  const track = albumTracks && albumTracks[trackIndex] ? albumTracks[trackIndex] : null;

  // Navigate to NowPlayingPage
  const handleInfoClick = () => {
    setCurrentTrack?.(track);
    setAlbumTracks?.(albumTracks);
    navigate("/now-playing", { state: { track, albumTracks } });
    setIsPlaying(true);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = (val / 100) * audioRef.current.duration;
      setProgress(val);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTime = audioRef.current ? audioRef.current.currentTime : 0;
  const duration = audioRef.current ? audioRef.current.duration : 0;

  // Base styles
  const playerBarStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderTop: "1px solid rgba(208, 188, 255, 0.3)",
    boxShadow: "0 -8px 32px rgba(91, 33, 182, 0.1), 0 -2px 8px rgba(0,0,0,0.05)",
    zIndex: 1000,
    padding: "16px 20px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
  };

  const trackInfoStyle = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    minWidth: "240px",
    flex: "0 0 auto"
  };

  const albumArtStyle = {
    width: "56px",
    height: "56px",
    borderRadius: "12px",
    objectFit: "cover",
    marginRight: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease",
    animation: isPlaying ? "spin 8s linear infinite" : "none"
  };

  const controlsContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    maxWidth: "600px",
    margin: "0 20px"
  };

  const controlsStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "12px"
  };

  const getControlButtonStyle = (buttonType, isActive = false) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: buttonType === 'play' ? "48px" : "40px",
    height: buttonType === 'play' ? "48px" : "40px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    fontSize: buttonType === 'play' ? "16px" : "14px",
    background: buttonType === 'play' 
      ? (hoveredButton === buttonType ? "#5B21B6" : "#D0BCFF")
      : "transparent",
    color: buttonType === 'play' 
      ? "#ffffff" 
      : (hoveredButton === buttonType ? "#5B21B6" : "#6B7280"),
    boxShadow: buttonType === 'play' 
      ? (hoveredButton === buttonType ? "0 8px 20px rgba(91, 33, 182, 0.3)" : "0 4px 12px rgba(208, 188, 255, 0.4)")
      : (hoveredButton === buttonType ? "0 4px 12px rgba(91, 33, 182, 0.2)" : "none"),
    transform: hoveredButton === buttonType 
      ? (buttonType === 'play' ? "scale(1.05)" : "scale(1.1)") 
      : "scale(1)",
    animation: isPlaying && buttonType === 'play' ? "pulse 2s infinite" : "none"
  });

  const progressContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    maxWidth: "500px"
  };

  const progressBarStyle = {
    flex: 1,
    height: "6px",
    background: "linear-gradient(to right, #E5E7EB 0%, #E5E7EB 100%)",
    borderRadius: "3px",
    position: "relative",
    cursor: "pointer",
    transition: "all 0.2s ease",
    transform: progressHover ? "scaleY(1.2)" : "scaleY(1)"
  };

  const progressFillStyle = {
    height: "100%",
    background: "linear-gradient(90deg, #D0BCFF 0%, #5B21B6 100%)",
    borderRadius: "3px",
    width: `${progress}%`,
    transition: "width 0.1s ease",
    boxShadow: progressHover ? "0 0 8px rgba(208, 188, 255, 0.6)" : "none"
  };

  const timeStyle = {
    fontSize: "12px",
    color: "#6B7280",
    fontWeight: "500",
    minWidth: "35px",
    textAlign: "center"
  };

  const volumeContainerStyle = {
    display: "flex",
    alignItems: "center",
    position: "relative",
    minWidth: "120px",
    flex: "0 0 auto"
  };

  const volumeButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "18px",
    color: isVolumeHovered ? "#5B21B6" : "#6B7280",
    transition: "all 0.3s ease",
    transform: isVolumeHovered ? "scale(1.1)" : "scale(1)"
  };

  const volumeSliderStyle = {
    width: showVolumeSlider || isVolumeHovered ? "80px" : "0px",
    height: "4px",
    background: "#E5E7EB",
    borderRadius: "2px",
    outline: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginLeft: "8px",
    opacity: showVolumeSlider || isVolumeHovered ? 1 : 0,
    overflow: "hidden"
  };

  const responsiveStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px"
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { box-shadow: 0 4px 12px rgba(208, 188, 255, 0.4); }
            50% { box-shadow: 0 8px 20px rgba(91, 33, 182, 0.6); }
          }

          input[type="range"] {
            -webkit-appearance: none;
            appearance: none;
            background: transparent;
          }

          input[type="range"]::-webkit-slider-track {
            background: #E5E7EB;
            height: 4px;
            border-radius: 2px;
          }

          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #5B21B6;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            transition: all 0.2s ease;
          }

          input[type="range"]::-webkit-slider-thumb:hover {
            background: #4C1D95;
            transform: scale(1.2);
            box-shadow: 0 4px 8px rgba(91, 33, 182, 0.4);
          }

          input[type="range"]::-moz-range-track {
            background: #E5E7EB;
            height: 4px;
            border-radius: 2px;
            border: none;
          }

          input[type="range"]::-moz-range-thumb {
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #5B21B6;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }

          @media (max-width: 768px) {
            .player-bar-mobile {
              flex-direction: column;
              padding: 12px 16px;
              gap: 12px;
            }
            
            .controls-mobile {
              order: 1;
            }
            
            .track-info-mobile {
              order: 2;
              justify-content: center;
            }
            
            .volume-mobile {
              order: 3;
              justify-content: center;
            }
          }
        `}
      </style>
      
      <div style={playerBarStyle}>
        {track ? (
          <div style={responsiveStyle} className="player-bar-mobile">
            {/* Track Info */}
            <div 
              style={trackInfoStyle} 
              className="track-info-mobile"
              onClick={handleInfoClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(208, 188, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateY(0px)";
              }}
            >
              <img 
                src={track.album.cover_small} 
                alt={track.title} 
                style={albumArtStyle}
              />
              <div style={{ flex: 1 }}>
                <p style={{ 
                  fontWeight: "600", 
                  color: "#213547", 
                  margin: "0 0 4px 0",
                  fontSize: "14px",
                  lineHeight: "1.2"
                }}>
                  {track.title}
                </p>
                <p style={{ 
                  color: "#6B7280", 
                  fontSize: "12px", 
                  margin: 0,
                  lineHeight: "1.2"
                }}>
                  {track.artist.name}
                </p>
                <p style={{ 
                  color: "#D0BCFF", 
                  fontSize: "10px", 
                  margin: "2px 0 0 0",
                  fontWeight: "500",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  PLAYING FROM POPULAR
                </p>
              </div>
            </div>

            {/* Controls & Progress */}
            <div style={controlsContainerStyle} className="controls-mobile">
              <div style={controlsStyle}>
                <button
                  onClick={handlePrevTrack}
                  style={getControlButtonStyle('prev')}
                  onMouseEnter={() => setHoveredButton('prev')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  ⏮
                </button>
                
                <button
                  onClick={togglePlay}
                  style={getControlButtonStyle('play', isPlaying)}
                  onMouseEnter={() => setHoveredButton('play')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>
                
                <button
                  onClick={handleNextTrack}
                  style={getControlButtonStyle('next')}
                  onMouseEnter={() => setHoveredButton('next')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  ⏭
                </button>
              </div>

              {/* Progress Bar */}
              <div style={progressContainerStyle}>
                <span style={timeStyle}>{formatTime(currentTime)}</span>
                <div 
                  style={progressBarStyle}
                  onMouseEnter={() => setProgressHover(true)}
                  onMouseLeave={() => setProgressHover(false)}
                >
                  <div style={progressFillStyle} />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={progress}
                    onChange={handleSeek}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      cursor: "pointer"
                    }}
                  />
                </div>
                <span style={timeStyle}>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Volume Control */}
            <div 
              style={volumeContainerStyle} 
              className="volume-mobile"
              onMouseEnter={() => {
                setShowVolumeSlider(true);
                setIsVolumeHovered(true);
              }}
              onMouseLeave={() => {
                setShowVolumeSlider(false);
                setIsVolumeHovered(false);
              }}
            >
              <button style={volumeButtonStyle}>
                {volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                style={volumeSliderStyle}
              />
            </div>
          </div>
        ) : (
          <div style={{
            textAlign: "center",
            color: "#6B7280",
            fontSize: "14px",
            fontWeight: "500"
          }}>
            Select a track to start your musical journey
          </div>
        )}
        <audio ref={audioRef} />
      </div>
    </>
  );
}