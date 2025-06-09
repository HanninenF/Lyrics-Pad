import { useReducer } from "react";
import formReducer from "../reducers/lyricsFormReducer";
import { LyricType, MusicianType } from "../types/types";
import useLyricsContext from "./useLyricsContext";

type Props = {
  setLyrics: React.Dispatch<React.SetStateAction<LyricType[]>>;
  setMusicians: React.Dispatch<React.SetStateAction<MusicianType[]>>;
};

export default function useLyricsForm({ setLyrics, setMusicians }: Props) {
  const [formValues, dispatch] = useReducer(formReducer, {
    title: "",
    composers: { music: [], lyrics: [] },
    content: "",
  });

  const handleSetTitle = (text: string) => {
    dispatch({ type: "SET_TITLE", payload: text });
  };

  const handleSetContent = (text: string) => {
    dispatch({ type: "SET_CONTENT", payload: text });
  };

  const handleSave = () => {
    const { title, content, composers } = formValues;

    // Validera att minst en musiker valts i varje fält
    if (
      !title ||
      !content ||
      composers.music.length === 0 ||
      composers.lyrics.length === 0
    ) {
      alert(
        "Please fill in all fields and select at least one composer for music and lyrics."
      );
      return;
    }

    const newLyric: LyricType = {
      ...formValues,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };

    // Lägg till låten i lyrics
    setLyrics((prev) => [...prev, newLyric]);

    // Lägg till låten till alla valda musiker
    setMusicians((prev) =>
      prev.map((musician) => {
        const isInMusic = composers.music.some((m) => m.id === musician.id);
        const isInLyrics = composers.lyrics.some((l) => l.id === musician.id);

        if (isInMusic || isInLyrics) {
          return {
            ...musician,
            songs: [...musician.songs, newLyric],
          };
        }

        return musician;
      })
    );
  };

  return {
    formValues,
    dispatch,
    handleSetTitle,
    handleSetContent,
    handleSave,
  };
}
