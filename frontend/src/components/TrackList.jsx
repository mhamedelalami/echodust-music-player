import React from "react";
import TrackCard from "./TrackCard";

const TrackList = ({ tracks, onTrackClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {tracks.map((track) => (
        <TrackCard
          key={track.id}
          track={track}
          albumTracks={tracks} // pass the whole album for the TrackCard
          onTrackClick={onTrackClick} // optional if you want list clicks handled
        />
      ))}
    </div>
  );
};

export default TrackList;


