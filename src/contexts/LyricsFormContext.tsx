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

type LyricsFormProviderProps = {
  children: ReactNode;
  initialSong?: LyricType;
};

export const LyricsFormProvider = ({
  children,
  initialSong,
}: LyricsFormProviderProps) => {
  const initialFormState = initialSong
    ? {
        ...initialState,
        ...initialSong,
        // eventuellt mappa om fälten om de skiljer sig i struktur
      }
    : initialState;
  const [formValues, dispatch] = useReducer(formReducer, initialFormState);
  const { setLyrics, setMusicians } = useLyricsContext();

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

    const isEditing = !!initialSong;

    const newLyric: LyricType = {
      ...formValues,
      id: isEditing ? initialSong!.id : Date.now().toString(),
      createdAt: isEditing ? initialSong!.createdAt : Date.now(),
    };

    setLyrics((prev) => {
      if (isEditing) {
        return prev.map((lyric) =>
          lyric.id === initialSong!.id ? newLyric : lyric
        );
      } else {
        return [...prev, newLyric];
      }
    });

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
