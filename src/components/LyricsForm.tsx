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
import useLyricsForm from "../hooks/useLyricsForm";
import { LyricsContext } from "../contexts/LyricsContext";

export default function LyricsForm() {
  const { setLyrics, setMusicians, musicians } = useLyricsContext();
  const {
    formValues,
    handleSetTitle,
    handleSetContent,
    handleAddComposer,
    handleRemoveComposer,
    handleSave,
  } = useLyricsForm({ setLyrics, setMusicians });
  const [selectedMusicComposer, setSelectedMusicComposer] =
    useState<MusicianType | null>(null);
  const [selectedLyricist, setSelectedLyricist] = useState<MusicianType | null>(
    null
  );

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
