import { useReducer, useState } from "react";
import LyricsInput from "./LyricsInput";
import AppInput from "../ui/AppInput";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import AppPressable from "../ui/AppPressable";
import useLyricsContext from "../../hooks/useLyricsContext";
import { FormValues, LyricType, MusicianType } from "../../types/types";
import Dropdown from "../ui/Dropdown";
import { colors } from "../../styles/globalStyles";
import formReducer from "../../reducers/lyricsFormReducer";
import useLyricsForm from "../../hooks/useLyricsForm";
import { LyricsContext } from "../../contexts/LyricsContext";
import ComposerSelector from "./ComposerSelector";
import ComposerListItem from "./ComposerListItem";

export default function LyricsForm() {
  const { setLyrics, setMusicians, musicians } = useLyricsContext();
  const { formValues, handleSetTitle, handleSetContent, handleSave } =
    useLyricsForm({ setLyrics, setMusicians });
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
        <ComposerSelector
          role="music"
          setSelectedComposer={setSelectedMusicComposer}
          selectedComposer={selectedMusicComposer}
        />
        <ComposerListItem />
        <ComposerSelector
          role="lyrics"
          setSelectedComposer={setSelectedLyricist}
          selectedComposer={selectedLyricist}
        />
        <ComposerListItem />

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
