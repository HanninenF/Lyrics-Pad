import { createContext, useState } from "react";
import { LyricType, MusicianType } from "../types/types";
import { musiciansData, SongsData } from "../data/mockData";

type LyricsContextType = {
  lyrics: LyricType[];
  setLyrics: React.Dispatch<React.SetStateAction<LyricType[]>>;
  musicians: MusicianType[];
  setMusicians: React.Dispatch<React.SetStateAction<MusicianType[]>>;
};

export const LyricsContext = createContext<LyricsContextType | null>(null);

const LyricsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [lyrics, setLyrics] = useState<LyricType[]>(SongsData);
  const [musicians, setMusicians] = useState<MusicianType[]>(musiciansData);

  const contextValue = { lyrics, setLyrics, musicians, setMusicians };

  return (
    <LyricsContext.Provider value={contextValue}>
      {children}
    </LyricsContext.Provider>
  );
};
export default LyricsContextProvider;
