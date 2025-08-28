import React, { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import TrackCard from "../components/TrackCard";
import BackHomeButton from "../components/BackHomeButton";
import { searchTracks, getTracksByMood, getTracksByGenre } from "../services/deezerApi";

const SearchResultsPage = () => {
  const { query } = useParams();
  const { setCurrentTrack, setAlbumTracks, currentTrack, isPlaying, togglePlay } = useOutletContext();
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (!query) return;

      setIsLoading(true);
      let results = [];
      try {
        if (["Happy", "Chill", "Romantic", "Energetic"].includes(query.toLowerCase())) {
          results = await getTracksByMood(query.toLowerCase());
        } else if (["pop", "rock", "jazz", "electronic"].includes(query.toLowerCase())) {
          results = await getTracksByGenre(query.toLowerCase());
        } else {
          results = await searchTracks(query);
        }
        console.log("SearchResultsPage: Fetched tracks", results.length);
        setTracks(results);
      } catch (error) {
        console.error("SearchResultsPage: Search failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [query]);

  useEffect(() => {
    console.log("SearchResultsPage: Window width", window.innerWidth);
  }, []);

  const handleTrackCardClick = (track) => {
    console.log("SearchResultsPage: Track card clicked", track?.title);
    setCurrentTrack(track);
    setAlbumTracks(tracks);
  };

  const handlePlayButtonClick = (track) => {
    console.log("SearchResultsPage: Play button clicked", track?.title);
    if (currentTrack?.id === track?.id && togglePlay) {
      console.log("SearchResultsPage: Calling togglePlay for current track");
      togglePlay();
    } else {
      console.log("SearchResultsPage: Setting new track");
      setCurrentTrack(track);
      setAlbumTracks(tracks);
    }
  };

  return (
    <>
      <style>
        {`
          .search-results-grid {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 1.5rem;
            max-width: 1536px;
            margin: 0 auto;
            padding: 0 1rem;
          }
          @media (min-width: 640px) {
            .search-results-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
          @media (min-width: 1024px) {
            .search-results-grid {
              grid-template-columns: repeat(4, minmax(0, 1fr));
            }
          }
          @media (min-width: 1280px) {
            .search-results-grid {
              grid-template-columns: repeat(5, minmax(0, 1fr));
            }
          }
          .no-results {
            grid-column: 1 / -1;
            text-align: center;
            color: #9CA3AF;
            font-size: 1.125rem;
          }
          .search-results-container {
            min-height: 100vh;
            background-color: #111827;
            color: #ffffff;
            padding: 1rem;
          }
          @media (min-width: 640px) {
            .search-results-container {
              padding: 1.5rem;
            }
          }
          .search-heading {
            font-size: 1.5rem;
            font-weight: 700;
            margin-top: 1rem;
            margin-bottom: 1.5rem;
            text-align: center;
          }
          @media (min-width: 640px) {
            .search-heading {
              font-size: 1.875rem;
            }
          }
          .search-query {
            color: #D0BCFF;
          }
          .loading {
            text-align: center;
            font-size: 1.125rem;
          }
        `}
      </style>
      <div className="search-results-container">
        <BackHomeButton />
        <h2 className="search-heading">
          Results for: <span className="search-query">"{query}"</span>
        </h2>
        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="search-results-grid">
            {tracks.length > 0 ? (
              tracks.map((track) => (
                <TrackCard
                  key={track?.id || Math.random()}
                  track={track}
                  albumTracks={tracks}
                  variant="grid"
                  size="large"
                  showPlayButton={true}
                  onClick={() => handleTrackCardClick(track)}
                  onPlayClick={() => handlePlayButtonClick(track)}
                  isPlaying={currentTrack?.id === track?.id && isPlaying}
                  currentTrack={currentTrack}
                  togglePlay={togglePlay}
                />
              ))
            ) : (
              <p className="no-results">No results found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResultsPage;
