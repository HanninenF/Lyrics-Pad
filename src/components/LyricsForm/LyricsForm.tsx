import { useRef, useState } from "react";
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
  PanResponder,
  Pressable,
} from "react-native";
import AppPressable from "../ui/AppPressable";
import { useLyricsForm } from "../../hooks/useLyricsForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SongMetaData from "./SongMetaData";
import AppText from "../ui/AppText";
import { height } from "../../styles/globalStyles";

export default function LyricsForm() {
  const { formValues, handleSetContent, handleSave } = useLyricsForm();
  const [showMetadata, setShowMetadata] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 30; // endast om man sveper lite längre
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          setShowMetadata(true);
        }
      },
    })
  ).current;

  const handleOutsidePress = () => {
    setShowMetadata(false);
    Keyboard.dismiss();
  };

  return (
    <>
      {" "}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <Pressable
          onPress={() => setShowMetadata(true)}
          style={styles.swipeZone}
          {...panResponder.panHandlers}
        >
          <Text>Swipe down here to show metadata</Text>
        </Pressable>

        {showMetadata && (
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={handleOutsidePress}
          />
        )}

        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          {showMetadata && (
            <View style={styles.metadata}>
              <SongMetaData />
            </View>
          )}

          <LyricsInput
            onChangeText={(text) => handleSetContent(text)}
            value={formValues.content}
            placeHolder="write here"
            label={formValues.title}
            setShowMetadata={() => setShowMetadata(false)}
          />
        </KeyboardAwareScrollView>

        <View>
          <AppPressable
            onPress={() => {
              handleOutsidePress();
              Keyboard.dismiss();
              handleSave();
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
  swipeZone: {
    height: height * 0.05,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    alignItems: "center",
  },
  metadata: {
    position: "absolute",
    top: 0,
    left: 20,
    right: 20,
    padding: 20,
    backgroundColor: "#add8e6",
    borderRadius: 10,
    zIndex: 10,
  },
});
