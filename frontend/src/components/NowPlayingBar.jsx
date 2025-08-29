import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function NowPlayingBar({
  currentTrack,
  albumTracks = [],
  setCurrentTrack,
  setAlbumTracks,
  setIsPlayingParent,
  setTogglePlay,
  onInfoClick,
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
  

  const togglePlay = useCallback(() => {
    if (!audioRef.current) {
      console.log("NowPlayingBar: togglePlay - No audioRef");
      return;
    }
    console.log("NowPlayingBar: togglePlay called, isPlaying:", isPlaying);
    if (isPlaying) {
      console.log("NowPlayingBar: Pausing audio");
      audioRef.current.pause();
      setIsPlaying(false);
      if (setIsPlayingParent) setIsPlayingParent(false);
    } else {
      console.log("NowPlayingBar: Playing audio");
      audioRef.current
        .play()
        .then(() => {
          console.log("NowPlayingBar: Playback started successfully");
          setIsPlaying(true);
          if (setIsPlayingParent) setIsPlayingParent(true);
        })
        .catch((error) => {
          console.error("NowPlayingBar: Playback failed:", error);
          setIsPlaying(false);
          if (setIsPlayingParent) setIsPlayingParent(false);
        });
    }
  }, [isPlaying, setIsPlayingParent]);

  useEffect(() => {
    console.log("NowPlayingBar: Setting up togglePlay reference");
    if (setTogglePlay && typeof togglePlay === "function") {
      setTogglePlay(togglePlay);
    }
  }, [setTogglePlay, togglePlay]);

  useEffect(() => {
    if (!albumTracks || albumTracks.length === 0 || !currentTrack || !audioRef.current) {
      console.log("NowPlayingBar: Missing required data or audioRef");
      setIsPlaying(false);
      if (setIsPlayingParent) setIsPlayingParent(false);
      return;
    }

    const index = albumTracks.findIndex((t) => t?.id === currentTrack?.id);
    if (index >= 0) {
      console.log("NowPlayingBar: Setting trackIndex to", index, "for track", currentTrack?.title);
      setTrackIndex(index);

      if (audioRef.current.src !== currentTrack.preview) {
        console.log("NowPlayingBar: Loading new track", currentTrack?.title);
        audioRef.current.src = currentTrack.preview;
        audioRef.current.volume = volume;
        audioRef.current.load();

        console.log("NowPlayingBar: Attempting to auto-play new track");
        audioRef.current
          .play()
          .then(() => {
            console.log("NowPlayingBar: Auto-play succeeded");
            setIsPlaying(true);
            if (setIsPlayingParent) setIsPlayingParent(true);
          })
          .catch((error) => {
            console.error("NowPlayingBar: Auto-play failed:", error);
            setIsPlaying(false);
            if (setIsPlayingParent) setIsPlayingParent(false);
          });
      } else {
        console.log("NowPlayingBar: Track unchanged, maintaining playback state");
      }
    } else {
      console.log("NowPlayingBar: Current track not found in albumTracks");
      setIsPlaying(false);
      if (setIsPlayingParent) setIsPlayingParent(false);
    }
  }, [currentTrack, albumTracks, setIsPlayingParent, volume]);

  const handleNextTrack = useCallback(() => {
    if (!albumTracks || albumTracks.length === 0) {
      console.log("NowPlayingBar: No tracks for next");
      return;
    }

    const nextIndex = (trackIndex + 1) % albumTracks.length;
    const nextTrack = albumTracks[nextIndex];

    console.log("NowPlayingBar: Moving to next track", nextTrack?.title, "index", nextIndex);
    setTrackIndex(nextIndex);
    if (setCurrentTrack) {
      setCurrentTrack(nextTrack);
      if (!isPlaying) {
        console.log("NowPlayingBar: Auto-playing next track");
        setIsPlaying(true);
        if (setIsPlayingParent) setIsPlayingParent(true);
      }
    }
  }, [albumTracks, setCurrentTrack, trackIndex, isPlaying, setIsPlayingParent]);

  const handlePrevTrack = useCallback(() => {
    if (!albumTracks || albumTracks.length === 0) {
      console.log("NowPlayingBar: No tracks for previous");
      return;
    }

    const prevIndex = (trackIndex - 1 + albumTracks.length) % albumTracks.length;
    const prevTrack = albumTracks[prevIndex];

    console.log("NowPlayingBar: Moving to previous track", prevTrack?.title, "index", prevIndex);
    setTrackIndex(prevIndex);
    if (setCurrentTrack) {
      setCurrentTrack(prevTrack);
      if (!isPlaying) {
        console.log("NowPlayingBar: Auto-playing previous track");
        setIsPlaying(true);
        if (setIsPlayingParent) setIsPlayingParent(true);
      }
    }
  }, [albumTracks, setCurrentTrack, trackIndex, isPlaying, setIsPlayingParent]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () =>
      setProgress((audio.currentTime / audio.duration) * 100 || 0);

    const handleEnded = () => {
      console.log("NowPlayingBar: Track ended", currentTrack?.title);
      if (albumTracks.length > 1) {
        console.log("NowPlayingBar: Multiple tracks, moving to next");
        handleNextTrack();
      } else {
        console.log("NowPlayingBar: Single track, stopping playback");
        setIsPlaying(false);
        if (setIsPlayingParent) setIsPlayingParent(false);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [handleNextTrack, albumTracks, currentTrack, setIsPlayingParent]);

  const track = albumTracks && albumTracks[trackIndex] ? albumTracks[trackIndex] : null;

  const handleInfoClick = () => {
    if (!track) {
      console.log("NowPlayingBar: No track for info click");
      return;
    }
    console.log("NowPlayingBar: Info clicked for track", track.title);
    navigate("/now-playing", { state: { track, albumTracks, autoPlay: true } });
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    console.log("NowPlayingBar: Volume changed to", val);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      console.log("NowPlayingBar: Seeking to", val);
      audioRef.current.currentTime = (val / 100) * audioRef.current.duration;
      setProgress(val);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentTime = audioRef.current ? audioRef.current.currentTime : 0;
  const duration = audioRef.current ? audioRef.current.duration : 0;

  const playerBarStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70px",
    background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderTop: "1px solid rgba(208, 188, 255, 0.3)",
    boxShadow: "0 -4px 12px rgba(91, 33, 182, 0.05)",
    zIndex: 1000,
    overflow: "hidden",
  };

  const topProgressStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "2px",
    background: "rgba(229, 231, 235, 0.6)",
    cursor: "pointer",
  };

  const topProgressFillStyle = {
    height: "100%",
    background: "linear-gradient(90deg, #D0BCFF 0%, #5B21B6 100%)",
    width: `${progress}%`,
    transition: "width 0.1s ease",
  };

  const mainContentStyle = {
    display: "flex",
    alignItems: "center",
    height: "100%",
    padding: "8px 16px",
    justifyContent: "space-between",
  };

  const trackInfoStyle = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    minWidth: "160px",
    flex: "0 0 auto",
    marginRight: "auto",
  };

  const albumArtStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "6px",
    objectFit: "cover",
    marginRight: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    transition: "all 0.2s ease",
    animation: isPlaying ? "spin 8s linear infinite" : "none",
  };

  const trackTextStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "120px",
  };

  const controlsContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginLeft: "20px",
  };

  const getControlButtonStyle = (buttonType, isActive = false) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: buttonType === "play" ? "36px" : "32px",
    height: buttonType === "play" ? "36px" : "32px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    fontSize: buttonType === "play" ? "14px" : "12px",
    background: buttonType === "play" ? (hoveredButton === buttonType ? "#5B21B6" : "#D0BCFF") : "transparent",
    color: buttonType === "play" ? "#ffffff" : (hoveredButton === buttonType ? "#5B21B6" : "#6B7280"),
    boxShadow: buttonType === "play" ? (hoveredButton === buttonType ? "0 4px 12px rgba(91, 33, 182, 0.3)" : "0 2px 6px rgba(208, 188, 255, 0.4)") : "none",
    transform: hoveredButton === buttonType ? "scale(1.05)" : "scale(1)",
    animation: isPlaying && buttonType === "play" ? "pulse 2s infinite" : "none",
  });

  const progressContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    width: "800px",
    maxWidth: "800px",
  };

  const progressBarStyle = {
    flex: 1,
    height: "4px",
    background: "#E5E7EB",
    borderRadius: "2px",
    position: "relative",
    cursor: "pointer",
    transition: "all 0.1s ease",
    transform: progressHover ? "scaleY(1.1)" : "scaleY(1)",
  };

  const progressFillStyle = {
    height: "100%",
    background: "linear-gradient(90deg, #D0BCFF 0%, #5B21B6 100%)",
    borderRadius: "2px",
    width: `${progress}%`,
    transition: "width 0.1s ease",
    boxShadow: progressHover ? "0 0 4px rgba(208, 188, 255, 0.4)" : "none",
  };

  const timeStyle = {
    fontSize: "10px",
    color: "#6B7280",
    fontWeight: "500",
    minWidth: "30px",
    textAlign: "center",
  };

  const volumeContainerStyle = {
    display: "flex",
    alignItems: "center",
    minWidth: "80px",
    flex: "0 0 auto",
    marginLeft: "auto",
  };

  const volumeButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "14px",
    color: isVolumeHovered ? "#5B21B6" : "#6B7280",
    transition: "all 0.2s ease",
    transform: isVolumeHovered ? "scale(1.1)" : "scale(1)",
  };

  const volumeSliderStyle = {
    width: showVolumeSlider || isVolumeHovered ? "60px" : "0px",
    height: "3px",
    background: "#E5E7EB",
    borderRadius: "2px",
    outline: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginLeft: "6px",
    opacity: showVolumeSlider || isVolumeHovered ? 1 : 0,
    overflow: "hidden",
  };

  if (!track) {
    console.log("NowPlayingBar: Rendering placeholder - no valid track");
    return (
      <div style={{ ...playerBarStyle, height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#6B7280", fontSize: "12px", fontWeight: "500" }}>
          Select a track to start your musical journey
        </div>
        <audio ref={audioRef} />
      </div>
    );
  }

  return (
    <div style={playerBarStyle}>
      <div
        style={topProgressStyle}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const percent = ((e.clientX - rect.left) / rect.width) * 100;
          if (audioRef.current) {
            console.log("NowPlayingBar: Seeking to", percent);
            audioRef.current.currentTime = (percent / 100) * audioRef.current.duration;
            setProgress(percent);
          }
        }}
      >
        <div style={topProgressFillStyle} />
      </div>

      <div style={mainContentStyle}>
        <div
          style={trackInfoStyle}
          onClick={handleInfoClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(208, 188, 255, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <img src={track.album?.cover_small || ""} alt={track.title || "Unknown Title"} style={albumArtStyle} />
          <div style={trackTextStyle}>
            <p style={{ fontWeight: "600", color: "#213547", margin: 0, fontSize: "12px", lineHeight: "1.2" }}>
              {track.title || "Unknown Title"}
            </p>
            <p style={{ color: "#6B7280", fontSize: "10px", margin: 0, lineHeight: "1.2" }}>
              {track.artist?.name || "Unknown Artist"}
            </p>
          </div>
        </div>

        <div style={controlsContainerStyle}>
          <button
            onClick={handlePrevTrack}
            style={getControlButtonStyle("prev")}
            onMouseEnter={() => setHoveredButton("prev")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            ⏮
          </button>
          <button
            onClick={togglePlay}
            style={getControlButtonStyle("play", isPlaying)}
            onMouseEnter={() => setHoveredButton("play")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            onClick={handleNextTrack}
            style={getControlButtonStyle("next")}
            onMouseEnter={() => setHoveredButton("next")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            ⏭
          </button>

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
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
              />
            </div>
            <span style={timeStyle}>{formatTime(duration)}</span>
          </div>
        </div>

        <div
          style={volumeContainerStyle}
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

      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
}