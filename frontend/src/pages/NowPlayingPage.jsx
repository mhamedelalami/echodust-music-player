import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import BackHomeButton from "../components/BackHomeButton";
import AlbumTrackList from "../components/AlbumTrackList";

export default function NowPlayingPage() {
  const location = useLocation();
  const { track } = location.state || {};
  const { setCurrentTrack, setAlbumTracks, togglePlay, isPlaying, setIsPlaying } = useOutletContext();
  const [albumTracks, setLocalAlbumTracks] = useState([]);
  const [currentTrack, setLocalCurrentTrack] = useState(track || null);

  // Determine API base URL: Vercel serverless or local dev
  const getApiBase = () => {
    if (import.meta.env.DEV) {
      // Local dev with Express
      return "http://localhost:3001/api";
    } else {
      // Production (Vercel)
      return "/api";
    }
  };

  // Fetch album tracks when track changes
  useEffect(() => {
    if (track?.album?.id) {
      const fetchAlbumTracks = async () => {
        try {
          const res = await fetch(`/api/album/${track.album.id}`);
          const data = await res.json();
          const tracks = data.tracks?.data || [];
          setLocalAlbumTracks(tracks);
          setAlbumTracks(tracks); // Update parent state
        } catch (error) {
          console.error("Error fetching album tracks:", error);
        }
      };
      fetchAlbumTracks();
    }
  }, [track, setAlbumTracks]);

  // Sync local currentTrack with parent
  useEffect(() => {
    if (currentTrack) {
      setCurrentTrack(currentTrack); // Update parent state
    }
    setIsPlaying(false); // Prevent auto-play
  }, [currentTrack, setCurrentTrack, setIsPlaying]);

  if (!track) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111827",
          color: "#ffffff",
        }}
      >
        <p style={{ color: "#A1A1AA" }}>No track selected.</p>
        <BackHomeButton />
      </div>
    );
  }

  const handleTrackClick = (selectedTrack) => {
    if (!selectedTrack) return;
    if (currentTrack?.id === selectedTrack.id) {
      togglePlay();
      setIsPlaying(!isPlaying);
    } else {
      setLocalCurrentTrack(selectedTrack);
      setCurrentTrack(selectedTrack);
      setIsPlaying(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#111827",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <BackHomeButton />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "16px",
          gap: "24px",
          background: "linear-gradient(to bottom, #1e293b, #111827)",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          margin: "16px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={currentTrack?.album?.cover_big}
            alt={currentTrack?.album?.title || "Album art"}
            style={{
              width: "256px",
              height: "256px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              objectFit: "cover",
              transition: "all 0.2s ease",
            }}
          />
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#ffffff",
              marginTop: "12px",
            }}
          >
            {currentTrack?.album?.title ?? "Album"}
          </h2>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            maxHeight: "calc(100vh - 200px)",
          }}
        >
          {albumTracks.length > 0 ? (
            <AlbumTrackList
              tracks={albumTracks}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onTrackClick={handleTrackClick}
            />
          ) : (
            <p style={{ color: "#A1A1AA", textAlign: "center" }}>
              Loading album tracks...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
