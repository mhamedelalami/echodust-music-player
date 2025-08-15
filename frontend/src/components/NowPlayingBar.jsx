import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function NowPlayingBar({
  currentTrack,
  albumTracks,
  setCurrentTrack,
  setAlbumTracks
}) {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);

  // Update trackIndex when currentTrack changes
  useEffect(() => {
    if (!albumTracks || albumTracks.length === 0 || !currentTrack) return;
    const index = albumTracks.findIndex((t) => t.id === currentTrack.id);
    setTrackIndex(index >= 0 ? index : 0);
  }, [currentTrack, albumTracks]);

  // Play/pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
    setIsPlaying(!isPlaying);
  };

  // Next/Prev track handlers
  const handleNextTrack = useCallback(() => {
    if (!albumTracks || albumTracks.length === 0) return;
    setTrackIndex((prev) => (prev + 1) % albumTracks.length);
  }, [albumTracks]);

  const handlePrevTrack = useCallback(() => {
    if (!albumTracks || albumTracks.length === 0) return;
    setTrackIndex((prev) => (prev - 1 + albumTracks.length) % albumTracks.length);
  }, [albumTracks]);

  // Load current track
  useEffect(() => {
    if (!albumTracks || albumTracks.length === 0) return;
    const track = albumTracks[trackIndex];
    if (!track || !audioRef.current) return;

    audioRef.current.src = track.preview;
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, [trackIndex, albumTracks]);

  // Update progress
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

  // Navigate to NowPlayingPage when clicking info
  const handleInfoClick = () => {
    if (setCurrentTrack) setCurrentTrack(track);
    if (setAlbumTracks) setAlbumTracks(albumTracks);
    navigate("/now-playing", { state: { track, albumTracks } });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex flex-col md:flex-row items-center justify-between p-4 shadow-lg z-50">
      {track ? (
        <>
          {/* Clickable album art and info */}
          <div
            className="flex items-center space-x-3 mb-2 md:mb-0 cursor-pointer"
            onClick={handleInfoClick}
          >
            <img
              src={track.album.cover_small}
              alt={track.title}
              className="w-12 h-12 rounded object-cover"
            />
            <div>
              <p className="font-medium">{track.title}</p>
              <p className="text-gray-400 text-sm">{track.artist.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={handlePrevTrack} className="text-pink-500 font-bold">⏮</button>
            <button onClick={togglePlay} className="bg-pink-500 px-3 py-1 rounded font-bold">
              {isPlaying ? "❚❚" : "▶"}
            </button>
            <button onClick={handleNextTrack} className="text-pink-500 font-bold">⏭</button>
          </div>

          <div className="w-full md:w-1/3 h-1 bg-gray-600 rounded mt-2 md:mt-0 relative">
            <div className="h-1 bg-pink-500 rounded" style={{ width: `${progress}%` }}></div>
          </div>
        </>
      ) : (
        <p className="text-gray-400">Select a track to start playing</p>
      )}
      <audio ref={audioRef} />
    </div>
  );
}
