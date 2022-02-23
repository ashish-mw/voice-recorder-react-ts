import { useEffect, useState } from "react";
import useRecorder from "./hooks/useRecorder";
import { TUseRecorder, TAudio } from "./types";

// components
import AudioListing from "./components/AudioListing";
import Recorder from "./components/Recorder";

function makeId() {
  return new Date().getTime().toString();
}

function App() {
  const { recorderState, ...handlers }: TUseRecorder = useRecorder();
  const [recordings, setRecordings] = useState<TAudio[]>([]);

  useEffect(() => {
    if (recorderState.audio) {
      setRecordings((prevState: TAudio[]) => {
        return [
          ...prevState,
          { key: makeId(), audio: recorderState.audio as string },
        ];
      });
    }
  }, [recorderState.audio]);

  return (
    <div className="container">
      <h1>Voice recorder</h1>
      <Recorder recorderState={recorderState} handlers={handlers} />
      <AudioListing recordings={recordings} />
    </div>
  );
}

export default App;
