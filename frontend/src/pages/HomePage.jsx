import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import TrackCard from "../components/TrackCard";
import { getPopularTracks } from "../services/deezerApi";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const HomePage = () => {
  const navigate = useNavigate();
  const { setCurrentTrack, setAlbumTracks, currentTrack, isPlaying, togglePlay } = useOutletContext();
  const [popularTracks, setPopularTracks] = useState([]);
  const [hoveredArrow, setHoveredArrow] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const popular = await getPopularTracks();
        setPopularTracks(popular);
        if (popular.length > 0 && !currentTrack) {
          console.log("HomePage: Setting initial track", popular[0]?.title);
          setCurrentTrack(popular[0]);
          setAlbumTracks(popular);
        }
      } catch (error) {
        console.error("HomePage: Failed to fetch popular tracks:", error);
      }
    };
    fetchPopular();
  }, [setCurrentTrack, setAlbumTracks, currentTrack]);

  const [moodOpen, setMoodOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);
  const moods = ["Happy", "Chill", "Romantic", "Energetic"];
  const genres = ["Pop", "Rock", "Jazz", "Electronic"];

  const handleMoodSelect = (mood) => {
    setMoodOpen(false);
    navigate(`/search/${mood.toLowerCase()}`);
  };

  const handleGenreSelect = (genre) => {
    setGenreOpen(false);
    navigate(`/search/${genre.toLowerCase()}`);
  };

  const moodRef = useRef();
  const genreRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moodRef.current && !moodRef.current.contains(e.target)) setMoodOpen(false);
      if (genreRef.current && !genreRef.current.contains(e.target)) setGenreOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleTrackCardClick = (track) => {
    console.log("HomePage: Track card clicked", track?.title);
    setCurrentTrack(track);
    setAlbumTracks(popularTracks);
  };

  const handlePlayButtonClick = (track) => {
    console.log("HomePage: Play button clicked", track?.title);
    if (currentTrack?.id === track?.id && togglePlay) {
      console.log("HomePage: Calling togglePlay for current track");
      togglePlay();
    } else {
      console.log("HomePage: Setting new track");
      setCurrentTrack(track);
      setAlbumTracks(popularTracks);
    }
  };

  const buttonStyle = {
    padding: "10px 16px",
    borderRadius: "9999px",
    border: "2px solid #D0BCFF",
    backgroundColor: "#ffffff",
    color: "#6B7280",
    cursor: "pointer",
    fontWeight: "500",
    minWidth: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "all 0.2s ease-in-out",
  };

  const listStyle = {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    width: "100%",
    backgroundColor: "#ffffff",
    border: "1px solid #D0BCFF",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    zIndex: 10,
    padding: "4px 0",
  };

  const listItemStyle = {
    padding: "8px 12px",
    cursor: "pointer",
    transition: "all 0.15s",
  };

  const getArrowButtonStyle = (direction) => ({
    position: "absolute",
    top: "50%",
    [direction]: "-20px",
    transform: "translateY(-50%)",
    borderRadius: "50%",
    backgroundColor: hoveredArrow === direction ? "rgba(91, 33, 182, 0.9)" : "rgba(255, 255, 255, 0.95)",
    border: "2px solid #D0BCFF",
    padding: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    zIndex: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        padding: "1rem",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "2.5rem",
          padding: "0 1rem",
        }}
      >
        <h1
          style={{
            fontSize: "4.5rem",
            fontWeight: "bold",
            color: "#213547",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          Unlock the <span style={{ color: "#D0BCFF" }}>soundtrack</span> of your soul
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "5rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span style={{ fontWeight: "500", color: "#D0BCFF" }}>BY</span>
        <div ref={moodRef} style={{ position: "relative" }}>
          <button
            onClick={() => setMoodOpen(!moodOpen)}
            style={{
              ...buttonStyle,
              color: moodOpen ? "#5B21B6" : "#6B7280",
              borderColor: moodOpen ? "#5B21B6" : "#D0BCFF",
            }}
          >
            Mood
            <FiChevronDown
              style={{
                marginLeft: "8px",
                transition: "transform 0.2s",
                transform: moodOpen ? "rotate(180deg)" : "rotate(0deg)",
                color: "#D0BCFF",
              }}
            />
          </button>
          {moodOpen && (
            <div style={listStyle}>
              {moods.map((mood) => (
                <div
                  key={mood}
                  onClick={() => handleMoodSelect(mood)}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#F3E8FF")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#ffffff")}
                  style={listItemStyle}
                >
                  {mood}
                </div>
              ))}
            </div>
          )}
        </div>
        <span style={{ fontWeight: "500", color: "#D0BCFF" }}>OR</span>
        <div ref={genreRef} style={{ position: "relative" }}>
          <button
            onClick={() => setGenreOpen(!genreOpen)}
            style={{
              ...buttonStyle,
              color: genreOpen ? "#5B21B6" : "#6B7280",
              borderColor: genreOpen ? "#5B21B6" : "#D0BCFF",
            }}
          >
            Genre
            <FiChevronDown
              style={{
                marginLeft: "8px",
                transition: "transform 0.2s",
                transform: genreOpen ? "rotate(180deg)" : "rotate(0deg)",
                color: "#D0BCFF",
              }}
            />
          </button>
          {genreOpen && (
            <div style={listStyle}>
              {genres.map((genre) => (
                <div
                  key={genre}
                  onClick={() => handleGenreSelect(genre)}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#F3E8FF")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#ffffff")}
                  style={listItemStyle}
                >
                  {genre}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#111827",
            padding: "1rem 1.5rem",
            borderRadius: "12px",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "1.5rem",
              textAlign: "left",
              margin: "0 0 1.5rem 0",
            }}
          >
            Popular Right Now
          </h2>
          <div
            style={{
              position: "relative",
            }}
          >
            <div
              ref={scrollRef}
              style={{
                display: "flex",
                overflowX: "auto",
                gap: "1.5rem",
                paddingBottom: "1rem",
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitScrollbar: { display: "none" },
              }}
            >
              {popularTracks.length > 0 ? (
                popularTracks.map((track) => (
                  <TrackCard
                    key={track?.id || Math.random()}
                    track={track}
                    albumTracks={popularTracks}
                    variant="horizontal"
                    size="medium"
                    showPlayButton={true}
                    onClick={() => handleTrackCardClick(track)}
                    onPlayClick={() => handlePlayButtonClick(track)}
                    isPlaying={currentTrack?.id === track?.id && isPlaying}
                    currentTrack={currentTrack}
                    togglePlay={togglePlay}
                  />
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "200px",
                    width: "100%",
                    color: "#6B7280",
                    fontSize: "16px",
                  }}
                >
                  Loading popular tracks...
                </div>
              )}
            </div>
            {popularTracks.length > 0 && (
              <>
                <button
                  onClick={scrollLeft}
                  onMouseEnter={() => setHoveredArrow("left")}
                  onMouseLeave={() => setHoveredArrow(null)}
                  style={getArrowButtonStyle("left")}
                >
                  <FiChevronLeft
                    size={20}
                    color={hoveredArrow === "left" ? "#ffffff" : "#5B21B6"}
                  />
                </button>
                <button
                  onClick={scrollRight}
                  onMouseEnter={() => setHoveredArrow("right")}
                  onMouseLeave={() => setHoveredArrow(null)}
                  style={getArrowButtonStyle("right")}
                >
                  <FiChevronRight
                    size={20}
                    color={hoveredArrow === "right" ? "#ffffff" : "#5B21B6"}
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


