export type LyricType = {
  id: string;
  title: string;
  composers: {
    music: MusicianType[];
    lyrics: MusicianType[];
  };
  content: string;
  createdAt: number;
  tags?: string[];
};

export type MusicianType = {
  id: string;
  userName: string;
  songs: LyricType[];
};

export type FormValues = Omit<LyricType, "id" | "createdAt">;

export type RootStackParamList = {
  Home: undefined;
  LyricForm: undefined;
  Editor: { lyricsId: string };
};

export type FormAction =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_CONTENT"; payload: string }
  | { type: "ADD_COMPOSER"; role: "music" | "lyrics"; payload: MusicianType }
  | { type: "REMOVE_COMPOSER"; role: "music" | "lyrics"; id: string };

export type Role = "music" | "lyrics";
