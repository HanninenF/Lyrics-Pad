export type LyricType = {
  id: string;
  title: string;
  composers: {
    music: Musician;
    lyrics: Musician;
  };
  content: string;
  createdAt: number;
  tags: string[];
};

export type Musician = {
  id: string;
  useName: string;
  songs: LyricType[];
};
