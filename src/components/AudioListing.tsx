import React from "react";

import { TAudio } from "../types";

interface AudioListingProps {
  recordings: TAudio[];
}

const AudioListing: React.FC<AudioListingProps> = ({ recordings }) => {
  return (
    <div>
      <h2>Audio listing</h2>
      {recordings.length === 0 && <div>No recordings yet!</div>}
      {recordings.map((r) => (
        <div key={r.key}>
          <audio controls src={r.audio} />
        </div>
      ))}
    </div>
  );
};

export default AudioListing;
