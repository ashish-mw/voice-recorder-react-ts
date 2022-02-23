// db.js
import Dexie, { Table } from "dexie";

export interface Audio {
  id?: number;
  key: string;
  audio: Blob | null;
}

export class AudioDexie extends Dexie {
  audios!: Table<Audio>;
  constructor() {
    super("voice_recorder_db");
    this.version(1).stores({
      audios: "++id, key, audio", // Primary key and indexed props
    });
  }
}

export const db = new AudioDexie();
