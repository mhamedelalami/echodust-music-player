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
  const [volume, setVolume] = useState(1);

  // Update trackIndex when currentTrack changes
  useEffect(() => {
    if (!albumTracks || !currentTrack) return;
    const index = albumTracks.findIndex((t) => t.id === currentTrack.id);
    setTrackIndex(index >= 0 ? index : 0);
    setIsPlaying(true); // auto play when track changes
  }, [currentTrack, albumTracks]);

  // Load current track and play if needed
  useEffect(() => {
    const track = albumTracks && albumTracks[trackIndex];
    if (!track || !audioRef.current) return;

    // Only update src if it changed
    if (audioRef.current.src !== track.preview) {
      audioRef.current.src = track.preview;
      audioRef.current.volume = volume;
      if (isPlaying) audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [trackIndex, albumTracks, isPlaying, volume]);

  // Play/pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  // Next/Prev track handlers (update currentTrack too)
  const handleNextTrack = useCallback(() => {
    if (!albumTracks || albumTracks.length === 0) return;

    const nextIndex = (trackIndex + 1) % albumTracks.length;
    const nextTrack = albumTracks[nextIndex];

    setTrackIndex(nextIndex);
    if (setCurrentTrack) setCurrentTrack(nextTrack); // ✅ update currentTrack
    setIsPlaying(true);
  }, [albumTracks, trackIndex, setCurrentTrack]);

  const handlePrevTrack = useCallback(() => {
    if (!albumTracks || albumTracks.length === 0) return;

    const prevIndex = (trackIndex - 1 + albumTracks.length) % albumTracks.length;
    const prevTrack = albumTracks[prevIndex];

    setTrackIndex(prevIndex);
    if (setCurrentTrack) setCurrentTrack(prevTrack); // ✅ update currentTrack
    setIsPlaying(true);
  }, [albumTracks, trackIndex, setCurrentTrack]);

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

  const handleInfoClick = () => {
    if (setCurrentTrack) setCurrentTrack(track);
    if (setAlbumTracks) setAlbumTracks(albumTracks);
    navigate("/now-playing", { state: { track, albumTracks } });
    setIsPlaying(true);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = (val / 100) * audioRef.current.duration;
      setProgress(val);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex flex-col md:flex-row items-center justify-between p-4 shadow-lg z-50">
      {track ? (
        <>
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

          <div className="flex items-center space-x-2 w-full md:w-1/3">
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-600 rounded accent-pink-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <span>🔊</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-gray-600 rounded accent-pink-500 cursor-pointer"
            />
          </div>
        </>
      ) : (
        <p className="text-gray-400">Select a track to start playing</p>
      )}
      <audio ref={audioRef} />
    </div>
  );
}
