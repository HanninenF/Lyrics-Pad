import { useContext } from "react";
import { LyricsFormContext } from "../contexts/LyricsFormContext";

export const useLyricsForm = () => {
  const context = useContext(LyricsFormContext);
  if (!context)
    throw new Error("useLyricsForm must be used within LyricsFormProvider");
  return context;
};
