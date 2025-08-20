import React from "react";
import TrackCard from "./TrackCard";

const TrackList = ({ tracks, showAlbumArt = true }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {tracks.map((track) => (
        <TrackCard
          key={track.id}
          track={track}
          albumTracks={tracks}
          showAlbumArt={showAlbumArt}
        />
      ))}
    </div>
  );
};
export default TrackList;
