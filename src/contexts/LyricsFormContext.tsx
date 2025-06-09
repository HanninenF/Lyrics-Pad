import { createContext, ReactNode, useReducer } from "react";
import formReducer, { initialState } from "../reducers/lyricsFormReducer";
import { LyricType, FormAction, FormValues } from "../types/types";
import useLyricsContext from "../hooks/useLyricsContext";

type LyricsFormContextType = {
  formValues: FormValues;
  dispatch: React.Dispatch<FormAction>;
  handleSetTitle: (text: string) => void;
  handleSetContent: (text: string) => void;
  handleSave: () => void;
};

export const LyricsFormContext = createContext<LyricsFormContextType | null>(
  null
);

export const LyricsFormProvider = ({ children }: { children: ReactNode }) => {
  const [formValues, dispatch] = useReducer(formReducer, initialState);
  const { setLyrics, setMusicians } = useLyricsContext();

  const handleSetTitle = (text: string) => {
    dispatch({ type: "SET_TITLE", payload: text });
  };

  const handleSetContent = (text: string) => {
    dispatch({ type: "SET_CONTENT", payload: text });
  };

  const handleSave = () => {
    const { title, content, composers } = formValues;

    console.log("title", title);
    console.log("content", content);
    console.log("music composers length", composers.music.length);
    console.log("lyrics composers length", composers.lyrics.length);

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

    setLyrics((prev) => [...prev, newLyric]);

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

  return (
    <LyricsFormContext.Provider
      value={{
        formValues,
        dispatch,
        handleSetTitle,
        handleSetContent,
        handleSave,
      }}
    >
      {children}
    </LyricsFormContext.Provider>
  );
};
