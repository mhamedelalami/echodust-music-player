import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NowPlayingBar from "./NowPlayingBar";
import Header from "./Header";

const Layout = ({ currentTrack, albumTracks, setCurrentTrack, setAlbumTracks }) => {
  const navigate = useNavigate();

  // Global search handler for header
  const handleSearch = (query) => {
    if (!query) return;
    navigate(`/search/${query}`);
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header */}
      <Header onSearch={handleSearch} />

      {/* Pages */}
      <main className="flex-1 w-full px-4 sm:px-8">
        <Outlet
          context={{
            setCurrentTrack,
            setAlbumTracks,
            currentTrack,
            albumTracks,
          }}
        />
      </main>

      {/* Persistent NowPlayingBar */}
      {currentTrack && (
        <NowPlayingBar
          currentTrack={currentTrack}
          albumTracks={albumTracks}
          setCurrentTrack={setCurrentTrack}
          setAlbumTracks={setAlbumTracks}
        onInfoClick={(track, albumTracks) => {
          navigate("/now-playing", { state: { track, albumTracks } });
        }}
      />
    )}

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-sm py-4 text-center border-t border-gray-700 flex-shrink-0">
        &copy; 2025 Mhamed El Alami. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;




