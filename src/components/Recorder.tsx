import React from "react";

import { TRecorderProps } from "../types";

const Recorder: React.FC<TRecorderProps> = ({ recorderState, handlers }) => {
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;

  return (
    <div className="border m-5 p-5">
      <div>
        {initRecording && <span>🔴</span>}
        <span>{recordingMinutes}</span>:<span>{recordingSeconds}</span>
      </div>
      {initRecording && (
        <button onClick={cancelRecording} title="Cancel recording">
          ❌
        </button>
      )}

      {initRecording ? (
        <button
          disabled={recordingSeconds === 0}
          title="Save recording"
          onClick={saveRecording}
        >
          💾
        </button>
      ) : (
        <button onClick={startRecording} title="Start recording">
          🎙
        </button>
      )}
    </div>
  );
};

export default Recorder;
