import React from "react";
import { Outlet } from "react-router-dom";
import NowPlayingBar from "./NowPlayingBar";

const Layout = ({ currentTrack, albumTracks, setCurrentTrack, setAlbumTracks }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Pages */}
      <Outlet
        context={{
          setCurrentTrack,
          setAlbumTracks,
          currentTrack,
          albumTracks
        }}
      />

      {/* Persistent NowPlayingBar with direct props */}
      {currentTrack && (
        <NowPlayingBar
          currentTrack={currentTrack}
          albumTracks={albumTracks}
          setCurrentTrack={setCurrentTrack}
          setAlbumTracks={setAlbumTracks}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-sm py-4 text-center border-t border-gray-700 flex-shrink-0 mt-8">
        &copy; 2025 Mhamed El Alami. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;

