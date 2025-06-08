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

export type RootStackParamList = {
  Home: undefined;
  NewLyric: undefined;
  Editor: undefined;
};
