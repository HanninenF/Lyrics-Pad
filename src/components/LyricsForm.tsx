import { useState } from "react";
import LyricsInput from "./ui/LyricsInput";
import AppInput from "./ui/AppInput";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import AppPressable from "./ui/AppPressable";
import useLyricsContext from "../hooks/useLyricsContext";
import { LyricType, MusicianType } from "../types/types";
import Dropdown from "./ui/Dropdown";
import { colors } from "../styles/globalStyles";

type FormValues = Omit<LyricType, "id" | "createdAt">;

export default function LyricsForm() {
  const { lyrics, setLyrics, musicians, setMusicians } = useLyricsContext();
  const [selectedMusicComposer, setSelectedMusicComposer] =
    useState<MusicianType | null>(null);
  const [selectedLyricist, setSelectedLyricist] = useState<MusicianType | null>(
    null
  );

  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    composers: { music: [], lyrics: [] },
    content: "",
  });

  const handleAddMusicComposer = () => {
    if (!selectedMusicComposer) return;

    setFormValues((prev) => {
      const alreadyAdded = prev.composers.music.some(
        (m) => m.id === selectedMusicComposer.id
      );
      if (alreadyAdded) return prev;

      return {
        ...prev,
        composers: {
          ...prev.composers,
          music: [...prev.composers.music, selectedMusicComposer],
        },
      };
    });

    setSelectedMusicComposer(null); // återställ dropdown
  };

  const handleAddLyricComposer = () => {
    if (!selectedLyricist) return;

    setFormValues((prev) => {
      const alreadyAdded = prev.composers.lyrics.some(
        (m) => m.id === selectedLyricist.id
      );
      if (alreadyAdded) return prev;

      return {
        ...prev,
        composers: {
          ...prev.composers,
          lyrics: [...prev.composers.lyrics, selectedLyricist],
        },
      };
    });

    setSelectedLyricist(null); // återställ dropdown
  };

  const handleRemoveMusicComposer = (id: string) => {
    setFormValues((prev) => ({
      ...prev,
      composers: {
        ...prev.composers,
        music: prev.composers.music.filter((m) => m.id !== id),
      },
    }));
  };

  const handleRemoveLyricComposer = (id: string) => {
    setFormValues((prev) => ({
      ...prev,
      composers: {
        ...prev.composers,
        lyrics: prev.composers.lyrics.filter((m) => m.id !== id),
      },
    }));
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
          onChangeText={(text) =>
            setFormValues((prev) => ({ ...prev, title: text }))
          }
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
          <AppPressable onPress={handleAddMusicComposer}>
            <Text>add</Text>
          </AppPressable>
          {formValues.composers.music.length > 0 && (
            <View style={styles.addedList}>
              <Text style={styles.addedText}>Added music composers:</Text>
              {formValues.composers.music.map((m) => (
                <View key={m.id} style={styles.addedItem}>
                  <Text style={styles.addedText}>{m.userName}</Text>
                  <AppPressable onPress={() => handleRemoveMusicComposer(m.id)}>
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
          <AppPressable onPress={handleAddLyricComposer}>
            <Text>add</Text>
          </AppPressable>
          {formValues.composers.lyrics.length > 0 && (
            <View style={styles.addedList}>
              <Text style={styles.addedText}>Added lyricists:</Text>
              {formValues.composers.lyrics.map((m) => (
                <View key={m.id} style={styles.addedItem}>
                  <Text style={styles.addedText}>{m.userName}</Text>
                  <AppPressable onPress={() => handleRemoveLyricComposer(m.id)}>
                    <Text style={styles.removeText}>Remove</Text>
                  </AppPressable>
                </View>
              ))}
            </View>
          )}
        </View>
        <LyricsInput
          onChangeText={(text) =>
            setFormValues((prev) => ({ ...prev, content: text }))
          }
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
