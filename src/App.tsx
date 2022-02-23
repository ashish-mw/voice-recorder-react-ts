import useRecorder from "./hooks/useRecorder";
import { TUseRecorder } from "./types";

// components
import AudioListing from "./components/AudioListing";
import Recorder from "./components/Recorder";

function App() {
  const { recorderState, ...handlers }: TUseRecorder = useRecorder();
  const { audio } = recorderState;

  return (
    <div className="container">
      <h1>Voice recorder</h1>
      <Recorder recorderState={recorderState} handlers={handlers} />
      <AudioListing />
    </div>
  );
}

export default App;
