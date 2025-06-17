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
import Modal from "react-native-modal";
import DragHandleIcon from "../icons/DragHandle";

export default function LyricsForm() {
  const { formValues, handleSetContent, handleSave } = useLyricsForm();
  const [showMetadata, setShowMetadata] = useState(false);
  const [modalReady, setModalReady] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 30;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          setShowMetadata(true);
        }
      },
    })
  ).current;

  const handleOpenModal = () => {
    setShowMetadata(true);
  };
  const handleCloseModal = () => {
    setShowMetadata(false);
    setModalReady(false);
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
        <View {...panResponder.panHandlers} style={styles.swipeZone}>
          <DragHandleIcon fill="white" height={48} width={48} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          {/* Modal som kommer från toppen */}
          <Modal
            isVisible={showMetadata}
            onModalShow={() => setModalReady(true)}
            onModalHide={() => setModalReady(false)}
            onBackdropPress={handleCloseModal}
            onSwipeComplete={handleCloseModal}
            swipeDirection="up"
            animationIn={"slideInDown"}
            animationOut={"slideOutUp"}
            propagateSwipe
            style={{ justifyContent: "flex-start", marginTop: height * 0.15 }}
            swipeThreshold={200}
          >
            {modalReady && (
              <View>
                <ScrollView
                  contentContainerStyle={{ paddingBottom: 100 }}
                  keyboardShouldPersistTaps="handled"
                >
                  <SongMetaData />
                </ScrollView>
              </View>
            )}
          </Modal>

          <LyricsInput
            onChangeText={(text) => handleSetContent(text)}
            value={formValues.content}
            placeHolder="write here"
            label={formValues.title}
            setShowMetadata={() => setShowMetadata(false)}
          />
        </ScrollView>

        <View>
          <AppPressable
            onPress={() => {
              handleCloseModal();
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
    backgroundColor: "transparent",
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
