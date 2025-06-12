import { View, StyleSheet } from "react-native";
import AppInput from "../ui/AppInput";
import ComposerSelector from "./ComposerSelector";
import ComposerListItem from "./ComposerListItem";
import { useState } from "react";
import { MusicianType } from "../../types/types";
import { useLyricsForm } from "../../hooks/useLyricsForm";

export default function SongMetaData() {
  const { formValues, handleSetTitle } = useLyricsForm();
  const [selectedMusicComposer, setSelectedMusicComposer] =
    useState<MusicianType | null>(null);
  const [selectedLyricist, setSelectedLyricist] = useState<MusicianType | null>(
    null
  );
  return (
    <View style={styles.container}>
      {/* skriv i titel */}
      <AppInput
        onChangeText={(text) => handleSetTitle(text)}
        placeHolder="Enter title"
        label="Enter title"
        value={formValues.title}
      />
      {/* välj musikkompositör */}

      <ComposerSelector
        role="music"
        setSelectedComposer={setSelectedMusicComposer}
        selectedComposer={selectedMusicComposer}
      />
      <ComposerListItem role="music" />
      {/* välj textförfattare */}

      <ComposerSelector
        role="lyrics"
        setSelectedComposer={setSelectedLyricist}
        selectedComposer={selectedLyricist}
      />
      <ComposerListItem role="lyrics" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    alignItems: "center",
    padding: 16,
  },
});
