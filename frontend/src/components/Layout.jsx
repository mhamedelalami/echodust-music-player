import React, { useState, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NowPlayingBar from "./NowPlayingBar";
import Header from "./Header";
import ErrorBoundary from "./ErrorBoundary.jsx";

const Layout = ({ currentTrack, albumTracks, setCurrentTrack, setAlbumTracks }) => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [togglePlayRef, setTogglePlayRef] = useState(() => () => {});

  const handleSearch = (query) => {
    if (!query) return;
    navigate(`/search/${query}`);
  };

  const setTogglePlay = useCallback((togglePlayFn) => {
    console.log("Layout: Setting togglePlayRef");
    setTogglePlayRef(() => togglePlayFn || (() => {}));
  }, []);

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen w-full">
        <Header onSearch={handleSearch} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1 0 auto",
            overflow: "auto",
          }}
        >
          <main className="flex-1 w-full px-4 sm:px-8 mb-80" style={{ marginBottom: "80px" }}>
            <Outlet
              context={{
                setCurrentTrack,
                setAlbumTracks,
                currentTrack,
                albumTracks,
                isPlaying,
                setIsPlaying,
                togglePlay: togglePlayRef,
                autoPlay: false,
              }}
            />
          </main>
        </div>
        {currentTrack && (
          <NowPlayingBar
            currentTrack={currentTrack}
            albumTracks={albumTracks}
            setCurrentTrack={setCurrentTrack}
            setAlbumTracks={setAlbumTracks}
            setIsPlayingParent={setIsPlaying}
            setTogglePlay={setTogglePlay}
            onInfoClick={() => {
              console.log("Layout: Navigating to now-playing with track", currentTrack?.title);
              navigate("/now-playing", { state: { track: currentTrack, albumTracks } });
            }}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Layout;



