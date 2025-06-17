import { createContext, ReactNode, useReducer } from "react";
import formReducer, { initialState } from "../reducers/lyricsFormReducer";
import { LyricType, FormAction } from "../types/types";
import useLyricsContext from "../hooks/useLyricsContext";
import uuid from "react-native-uuid";
import { saveLyrics } from "./saveLyrics";

type LyricsFormContextType = {
  formValues: LyricType;
  dispatch: React.Dispatch<FormAction>;
  handleSetTitle: (text: string) => void;
  handleSetContent: (text: string) => void;
  handleSave: () => void;
};

export const LyricsFormContext = createContext<LyricsFormContextType | null>(
  null
);

type LyricsFormProviderProps = {
  children: ReactNode;
  initialSong?: LyricType;
};

export const LyricsFormProvider = ({
  children,
  initialSong,
}: LyricsFormProviderProps) => {
  const initialFormState: LyricType = initialSong
    ? { ...initialSong }
    : {
        id: uuid.v4(),
        title: "",
        content: "",
        composers: { music: [], lyrics: [] },
        createdAt: Date.now(),
      };

  const [formValues, dispatch] = useReducer(formReducer, initialFormState);
  const { lyrics, setLyrics, setMusicians } = useLyricsContext();

  const handleSetTitle = (text: string) => {
    dispatch({ type: "SET_TITLE", payload: text });
  };

  const handleSetContent = (text: string) => {
    dispatch({ type: "SET_CONTENT", payload: text });
  };

  const handleSave = () => {
    const { title, content, composers } = formValues;

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

    const isEditing = lyrics.some((lyric) => lyric?.id === formValues.id);

    const newLyric: LyricType = {
      ...formValues,
    };

    const updatedLyrics = (() => {
      if (!formValues.id) return lyrics;

      if (isEditing) {
        return lyrics.map((lyric) =>
          lyric?.id === formValues.id ? newLyric : lyric
        );
      } else {
        return [newLyric, ...lyrics];
      }
    })();
    setLyrics(updatedLyrics);

    // 🔐 Spara till AsyncStorage
    saveLyrics(updatedLyrics);

    setMusicians((prev) =>
      prev.map((musician) => {
        const isInMusic = composers.music.some((m) => m.id === musician.id);
        const isInLyrics = composers.lyrics.some((l) => l.id === musician.id);
        const isAlreadyIn = musician.songs.some((s) => s.id === newLyric.id);

        if (isInMusic || isInLyrics) {
          return {
            ...musician,
            songs: isAlreadyIn
              ? musician.songs.map((s) => (s.id === newLyric.id ? newLyric : s))
              : [...musician.songs, newLyric],
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
