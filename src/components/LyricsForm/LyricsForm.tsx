import { useState } from "react";
import LyricsInput from "./LyricsInput";
import AppInput from "../ui/AppInput";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
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
      {" "}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // justera efter headerhöjd om du har
      >
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
        </KeyboardAwareScrollView>
        <View>
          <AppPressable
            onPress={() => {
              handleSave();
              Keyboard.dismiss();
            }}
          >
            <AppText>Save</AppText>
          </AppPressable>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  scrollView: {
    alignItems: "center",
  },
});
