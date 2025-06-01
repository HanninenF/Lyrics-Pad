export type LyricType = {
  id: string;
  title: string;
  composers: {
    music: string;
    lyrics: string;
  };
  content: string;
  createdAt: number;
};
