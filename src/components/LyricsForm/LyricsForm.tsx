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
import { useLyricsForm } from "../../hooks/useLyricsForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SongMetaData from "./SongMetaData";
import AppText from "../ui/AppText";

export default function LyricsForm() {
  const { formValues, handleSetContent, handleSave } = useLyricsForm();
  const [showMetadata, setShowMetadata] = useState(false);

  return (
    <>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
        {showMetadata && <SongMetaData />}
        <AppPressable onPress={() => setShowMetadata(!showMetadata)}>
          <AppText>
            {!showMetadata ? "Show song info" : "Hide song info"}
          </AppText>
        </AppPressable>

        {/* skriv i låtens text */}
        <LyricsInput
          onChangeText={(text) => handleSetContent(text)}
          value={formValues.content}
          placeHolder="write here"
          label={formValues.title}
        />
        <AppPressable onPress={handleSave}>
          <Text>Save</Text>
        </AppPressable>
      </KeyboardAwareScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    alignItems: "center",
  },
});
