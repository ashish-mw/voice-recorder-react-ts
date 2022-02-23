import { useState, useEffect } from "react";

import {
  TRecorder,
  TSetRecorder,
  TInterval,
  TAudioTrack,
  TMediaRecorderEvent,
} from "../types";

const initialState: TRecorder = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
};

async function startRecording(setRecorderState: TSetRecorder) {
  try {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    setRecorderState((prevState) => {
      return {
        ...prevState,
        initRecording: true,
        mediaStream: stream,
      };
    });
  } catch (err) {
    console.log(err);
  }
}

function saveRecording(recorder: any) {
  if (recorder.state !== "inactive") recorder.stop();
}

export default function useRecorder() {
  const [recorderState, setRecorderState] = useState<TRecorder>(initialState);

  useEffect(() => {
    const MAX_DURATION_MINS = 5;
    let recordingInterval: TInterval = null;

    if (recorderState.initRecording) {
      // run every second
      recordingInterval = setInterval(() => {
        setRecorderState((prevState: TRecorder) => {
          // if 5 mins of recording time has reached
          if (
            prevState.recordingMinutes === MAX_DURATION_MINS &&
            prevState.recordingSeconds === 0
          ) {
            typeof recordingInterval === "number" &&
              clearInterval(recordingInterval);
            return prevState;
          }

          // timing mm:ss update
          if (
            prevState.recordingSeconds >= 0 &&
            prevState.recordingSeconds < 59
          )
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1,
            };
          else if (prevState.recordingSeconds === 59)
            return {
              ...prevState,
              recordingMinutes: prevState.recordingMinutes + 1,
              recordingSeconds: 0,
            };
          else return prevState;
        });
      }, 1000);
      // ----------
    } else {
      if (typeof recordingInterval === "number") {
        clearInterval(recordingInterval);
      }
    }

    return () => {
      if (typeof recordingInterval === "number") {
        clearInterval(recordingInterval);
      }
    };
  }, [recorderState.initRecording]);

  // to start recording
  useEffect(() => {
    setRecorderState((prevState: TRecorder) => {
      if (prevState.mediaStream) {
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream),
        };
      } else {
        return prevState;
      }
    });
  }, [recorderState.mediaStream]);

  // to save recording
  useEffect(() => {
    const recorder = recorderState.mediaRecorder;
    let chunks: Blob[] = [];

    if (recorder && recorder.state === "inactive") {
      recorder.start();

      recorder.ondataavailable = (e: TMediaRecorderEvent) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        chunks = [];

        setRecorderState((prevState: TRecorder) => {
          if (prevState.mediaRecorder) {
            return {
              ...initialState,
              audio: window.URL.createObjectURL(blob),
            };
          } else {
            return initialState;
          }
        });
      };
    }

    return () => {
      if (recorder) {
        recorder.stream
          .getAudioTracks()
          .forEach((track: TAudioTrack) => track.stop());
      }
    };
  }, [recorderState.mediaRecorder]);

  return {
    recorderState,
    startRecording: () => startRecording(setRecorderState),
    cancelRecording: () => setRecorderState(initialState),
    saveRecording: () => saveRecording(recorderState.mediaRecorder),
  };
}
