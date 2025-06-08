import { LyricType, MusicianType } from "../types/types";

export const musiciansData: MusicianType[] = [
  {
    id: "1",
    userName: "Throllv",
    songs: [],
  },
];

export const SongsData: LyricType[] = [
  {
    id: "2",
    title: "At the Mighty Halls They'll Walk",
    composers: {
      music: [musiciansData[0]],
      lyrics: [musiciansData[0]],
    },
    content: "here i stand again...",
    createdAt: Date.now(),
  },
];

musiciansData[0].songs[0] = SongsData[0];
