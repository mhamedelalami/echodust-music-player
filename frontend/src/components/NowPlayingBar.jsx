import { useEffect, useRef, useState, useCallback } from "react";

export default function NowPlayingBar({ currentTrack, albumTracks }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [trackIndex, setTrackIndex] = useState(
    albumTracks.findIndex((t) => t.id === currentTrack.id) || 0
  );

  // Play/pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update track when currentTrack or trackIndex changes
  useEffect(() => {
    if (!albumTracks.length) return;
    const track = albumTracks[trackIndex];
    if (!track) return;

    audioRef.current.src = track.preview;
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, [trackIndex, albumTracks]);

  // Update progress bar
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleNextTrack);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleNextTrack);
    };
  }, [trackIndex, albumTracks, handleNextTrack]);

  const handleNextTrack = useCallback(() => {
  setTrackIndex((prev) => (prev + 1) % albumTracks.length);
}, [albumTracks.length]); // <-- dependency array added


  const handlePrevTrack = () => {
    setTrackIndex((prev) => (prev - 1 + albumTracks.length) % albumTracks.length);
  };

  if (!currentTrack) return null;

  const track = albumTracks[trackIndex] || currentTrack;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex flex-col md:flex-row items-center justify-between p-4 shadow-lg z-50">
      {/* Track info */}
      <div className="flex items-center space-x-3 mb-2 md:mb-0">
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

      {/* Controls */}
      <div className="flex items-center space-x-4">
        <button onClick={handlePrevTrack} className="text-pink-500 font-bold">⏮</button>
        <button onClick={togglePlay} className="bg-pink-500 px-3 py-1 rounded font-bold">
          {isPlaying ? "❚❚" : "▶"}
        </button>
        <button onClick={handleNextTrack} className="text-pink-500 font-bold">⏭</button>
      </div>

      {/* Progress bar */}
      <div className="w-full md:w-1/3 h-1 bg-gray-600 rounded mt-2 md:mt-0 relative">
        <div
          className="h-1 bg-pink-500 rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <audio ref={audioRef} />
    </div>
  );
}
