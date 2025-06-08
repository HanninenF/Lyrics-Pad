import { useContext } from "react";
import { LyricsContext } from "../contexts/LyricsContext";

export default function useLyricsContext() {
  const context = useContext(LyricsContext);

  if (!context) {
    throw new Error(
      "useLyricsContext must be used within a LyricsContextProvider"
    );
  }
  return context;
}
