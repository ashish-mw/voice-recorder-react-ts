import { useEffect, useState } from "react";
import useRecorder from "./hooks/useRecorder";
import { TUseRecorder, TAudio } from "./types";

import { db } from "./db";

// components
import AudioListing from "./components/AudioListing";
import Recorder from "./components/Recorder";

function makeId() {
  return `audio__${new Date().getTime().toString()}`;
}

function App() {
  const { recorderState, ...handlers }: TUseRecorder = useRecorder();
  const [recordings, setRecordings] = useState<TAudio[]>([]);

  // check if we have stuff in db and then get it
  useEffect(() => {
    async function loadSavedRecordings() {
      const audios = await db.audios.toArray();
      const _recordings = audios.map((a) => {
        return {
          key: a.key,
          audio: window.URL.createObjectURL(a.audio as Blob),
        };
      });
      setRecordings(_recordings);
    }

    loadSavedRecordings();
  }, []);

  useEffect(() => {
    async function addAudioToDB(audio: TAudio) {
      // saving just blobs to indexed db
      const _audio = {
        key: audio.key,
        audio: await fetch(audio.audio).then((r) => r.blob()),
      };
      const id = await db.audios.add(_audio);
      console.log("Added audio ", id);
    }

    if (recorderState.audio) {
      const audio = { key: makeId(), audio: recorderState.audio as string };
      setRecordings((prevState: TAudio[]) => {
        return [...prevState, audio];
      });
      addAudioToDB(audio);
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
