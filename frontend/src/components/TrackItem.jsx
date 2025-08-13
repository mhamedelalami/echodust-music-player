export default function TrackItem({ track, onClick }) {
  return (
    <div
      className="flex items-center justify-between p-2 hover:bg-gray-800 rounded cursor-pointer"
      onClick={() => onClick(track)}
    >
      <div className="flex items-center space-x-3">
        <img
          src={track.album.cover_small}
          alt={track.title}
          className="w-12 h-12 rounded object-cover"
        />
        <div>
          <p className="text-white font-medium">{track.title}</p>
          <p className="text-gray-400 text-sm">{track.artist.name}</p>
        </div>
      </div>
      {/* Optional play button */}
      <button className="text-pink-500 font-bold">▶</button>
    </div>
  );
}
