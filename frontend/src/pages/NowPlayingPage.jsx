import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BackHomeButton from "../components/BackHomeButton";
import SearchBar from "../components/SearchBar";
import AlbumTrackList from "../components/AlbumTrackList"; // new component

export default function NowPlayingPage() {
  const location = useLocation();
  const { track } = location.state || {}; // track passed from previous page

  const [albumTracks, setAlbumTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(track);

  // Fetch album tracks when page loads or track changes
  useEffect(() => {
    if (track?.album?.id) {
      const fetchAlbumTracks = async () => {
        try {
          const res = await fetch(`http://localhost:3001/api/album/${track.album.id}`);
          const data = await res.json();
          setAlbumTracks(data.tracks.data || []);
        } catch (error) {
          console.error("Error fetching album tracks:", error);
        }
      };
      fetchAlbumTracks();
    }
  }, [track]);

  if (!track) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <p className="text-gray-400">No track selected.</p>
        <BackHomeButton />
      </div>
    );
  }

  const handleTrackClick = (selectedTrack) => {
    setCurrentTrack(selectedTrack);
  };

  <AlbumTrackList
  tracks={albumTracks}
  currentTrack={currentTrack}
  onTrackClick={handleTrackClick}
/>

  return (
  <div className="min-h-screen flex flex-col bg-gray-900 text-white">
    {/* Top bar */}
    <div className="flex justify-between items-center p-4">
      <BackHomeButton />
      <div className="w-1/2">
        <SearchBar onSearch={(query) => console.log("Search:", query)} />
      </div>
    </div>

    {/* Album art */}
    <div className="flex justify-center mt-4 cursor-pointer" onClick={() => setCurrentTrack(track)}>
      <img
        src={currentTrack.album.cover_big}
        alt={currentTrack.album.title}
        className="w-64 h-64 md:w-96 md:h-96 rounded-xl shadow-lg object-cover"
      />
    </div>

    {/* Track list */}
    <div className="flex-1 p-4 overflow-y-auto">
      {albumTracks.length > 0 ? (
        <AlbumTrackList tracks={albumTracks} currentTrack={currentTrack} onTrackClick={setCurrentTrack} />
      ) : (
        <p className="text-gray-400 text-center">Loading album tracks...</p>
      )}
    </div>
  </div>
);}


