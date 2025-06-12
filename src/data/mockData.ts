import { LyricType, MusicianType } from "../types/types";

export const musiciansData: MusicianType[] = [
  {
    id: "1",
    userName: "Throllv",
    songs: [],
  },
  {
    id: "2",
    userName: "Hravn",
    songs: [],
  },
  {
    id: "3",
    userName: "Diabolös",
    songs: [],
  },
  {
    id: "4",
    userName: "Janne",
    songs: [],
  },
  {
    id: "5",
    userName: "Faredo",
    songs: [],
  },
  {
    id: "6",
    userName: "Jenny",
    songs: [],
  },
  {
    id: "7",
    userName: "Sara",
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
