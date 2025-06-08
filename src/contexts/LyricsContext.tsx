import { createContext, useState } from "react";
import { LyricType } from "../types/types";

type LyricsContextType = {
  lyrics: LyricType[];
  setLyrics: React.Dispatch<React.SetStateAction<LyricType[]>>;
};

export const LyricsContext = createContext<LyricsContextType | null>(null);

const LyricsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [lyrics, setLyrics] = useState<LyricType[]>([]);

  const contextValue = { lyrics, setLyrics };

  return (
    <LyricsContext.Provider value={contextValue}>
      {children}
    </LyricsContext.Provider>
  );
};
export default LyricsContextProvider;
