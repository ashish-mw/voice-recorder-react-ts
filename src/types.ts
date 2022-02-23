import { Dispatch, SetStateAction } from "react";

export type TRecorder = {
  recordingMinutes: number;
  recordingSeconds: number;
  initRecording: boolean;
  mediaStream: MediaStream | null;
  // mediaRecorder: MediaRecorder | null;
  mediaRecorder: any;
  audio: string | null;
};

export type TUseRecorder = {
  recorderState: TRecorder;
  startRecording: () => void;
  cancelRecording: () => void;
  saveRecording: () => void;
};

export type TRecorderProps = {
  recorderState: TRecorder;
  handlers: {
    startRecording: () => void;
    cancelRecording: () => void;
    saveRecording: () => void;
  };
};

export type TRecordingsListProps = {
  audio: string | null;
};

export type TAudio = {
  key: string;
  audio: string;
};

export type TInterval = null | number | ReturnType<typeof setInterval>;
export type TSetRecorder = Dispatch<SetStateAction<TRecorder>>;
export type TSetRecordings = Dispatch<SetStateAction<TAudio[]>>;
export type TAudioTrack = MediaStreamTrack;
export type TMediaRecorderEvent = {
  data: Blob;
};
