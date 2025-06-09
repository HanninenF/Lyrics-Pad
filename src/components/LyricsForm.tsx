import { useReducer, useState } from "react";
import LyricsInput from "./ui/LyricsInput";
import AppInput from "./ui/AppInput";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import AppPressable from "./ui/AppPressable";
import useLyricsContext from "../hooks/useLyricsContext";
import { FormValues, LyricType, MusicianType } from "../types/types";
import Dropdown from "./ui/Dropdown";
import { colors } from "../styles/globalStyles";
import formReducer from "../reducers/lyricsFormReducer";

export default function LyricsForm() {
  const { lyrics, setLyrics, musicians, setMusicians } = useLyricsContext();
  const [selectedMusicComposer, setSelectedMusicComposer] =
    useState<MusicianType | null>(null);
  const [selectedLyricist, setSelectedLyricist] = useState<MusicianType | null>(
    null
  );

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

  const handleAddComposer = (
    role: "music" | "lyrics",
    selected: MusicianType | null,
    clear: () => void
  ) => {
    if (selected) {
      dispatch({
        type: "ADD_COMPOSER",
        role,
        payload: selected,
      });
      clear(); // Töm vald dropdown
    }
  };

  const handleRemoveComposer = (role: "music" | "lyrics", id: string) => {
    dispatch({
      type: "REMOVE_COMPOSER",
      role,
      id,
    });
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

  return (
    <ScrollView>
      <View>
        <AppInput
          onChangeText={(text) => handleSetTitle(text)}
          placeHolder="Enter title"
          label="Enter title"
          value={formValues.title}
        />
        <View style={styles.selectMusicComposerCon}>
          <Dropdown
            items={musicians}
            placeholder="Select music composer"
            onSelect={setSelectedMusicComposer}
            value={selectedMusicComposer}
          />
          <AppPressable
            onPress={() =>
              handleAddComposer("music", selectedMusicComposer, () =>
                setSelectedMusicComposer(null)
              )
            }
          >
            <Text>Add</Text>
          </AppPressable>
          {formValues.composers.music.length > 0 && (
            <View style={styles.addedList}>
              <Text style={styles.addedText}>Added music composers:</Text>
              {formValues.composers.music.map((m) => (
                <View key={m.id} style={styles.addedItem}>
                  <Text style={styles.addedText}>{m.userName}</Text>
                  <AppPressable
                    onPress={() => handleRemoveComposer("music", m.id)}
                  >
                    <Text style={styles.removeText}>Remove</Text>
                  </AppPressable>
                </View>
              ))}
            </View>
          )}
        </View>
        <View style={styles.selectLyricsComposerCon}>
          <Dropdown
            items={musicians}
            placeholder="Select lyricist"
            onSelect={setSelectedLyricist}
            value={selectedLyricist}
          />
          <AppPressable
            onPress={() =>
              handleAddComposer("lyrics", selectedLyricist, () =>
                setSelectedLyricist(null)
              )
            }
          >
            <Text>Add</Text>
          </AppPressable>
          {formValues.composers.lyrics.length > 0 && (
            <View style={styles.addedList}>
              <Text style={styles.addedText}>Added lyricists:</Text>
              {formValues.composers.lyrics.map((m) => (
                <View key={m.id} style={styles.addedItem}>
                  <Text style={styles.addedText}>{m.userName}</Text>
                  <AppPressable
                    onPress={() => handleRemoveComposer("lyrics", m.id)}
                  >
                    <Text style={styles.removeText}>Remove</Text>
                  </AppPressable>
                </View>
              ))}
            </View>
          )}
        </View>
        <LyricsInput
          onChangeText={(text) => handleSetContent(text)}
          value={formValues.content}
          placeHolder="write here"
          label="jojo"
        />
        <AppPressable onPress={handleSave}>
          <Text>Save</Text>
        </AppPressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  selectMusicComposerCon: {
    zIndex: 1000,
    marginBottom: 20,
  },
  selectLyricsComposerCon: {
    zIndex: 900,
    marginBottom: 20,
  },
  addedList: {
    marginTop: 10,
    paddingLeft: 10,
  },
  addedItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  addedText: { color: colors.text },
  removeText: {
    color: "red",
  },
});
