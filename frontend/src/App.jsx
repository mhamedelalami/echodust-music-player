import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import NowPlayingPage from "./pages/NowPlayingPage";

function App() {
  // Global state for NowPlayingBar
  const [currentTrack, setCurrentTrack] = useState(null);
  const [albumTracks, setAlbumTracks] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              currentTrack={currentTrack}
              albumTracks={albumTracks}
              setCurrentTrack={setCurrentTrack}
              setAlbumTracks={setAlbumTracks}
            />
          }
        >
          <Route index element={<HomePage />} />
          <Route path="search/:query" element={<SearchResultsPage />} />
           <Route path="now-playing" element={<NowPlayingPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
