import TrackItem from "./TrackItem";

export default function TrackList({ tracks, onTrackClick }) {
  return (
    <div className="space-y-2">
      {tracks.map((track) => (
        <TrackItem
          key={track.id}
          track={track}
          onClick={onTrackClick} // call parent callback
        />
      ))}
    </div>
  );
}
