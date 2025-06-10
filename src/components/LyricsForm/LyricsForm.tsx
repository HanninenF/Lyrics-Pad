import { useState } from "react";
import LyricsInput from "./LyricsInput";
import AppInput from "../ui/AppInput";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import AppPressable from "../ui/AppPressable";
import { MusicianType } from "../../types/types";
import ComposerSelector from "./ComposerSelector";
import ComposerListItem from "./ComposerListItem";
import { useLyricsForm } from "../../hooks/useLyricsForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function LyricsForm() {
  const { formValues, handleSetTitle, handleSetContent, handleSave } =
    useLyricsForm();
  const [selectedMusicComposer, setSelectedMusicComposer] =
    useState<MusicianType | null>(null);
  const [selectedLyricist, setSelectedLyricist] = useState<MusicianType | null>(
    null
  );

  return (
    <>
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
      {/* skriv i låtens text */}

      <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
        <LyricsInput
          onChangeText={(text) => handleSetContent(text)}
          value={formValues.content}
          placeHolder="write here"
          label="jojo"
        />
        <AppPressable onPress={handleSave}>
          <Text>Save</Text>
        </AppPressable>
      </KeyboardAwareScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
  },
  scrollView: {
    alignItems: "center",
  },
});
