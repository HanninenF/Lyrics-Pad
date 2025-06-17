import {
  TextInput,
  StyleSheet,
  View,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import {
  colors,
  fontSize,
  height,
  spacing,
  width,
} from "../../styles/globalStyles";
import AppText from "../ui/AppText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ComposerListItem from "./ComposerListItem";
import ComposerDisplay from "./ComposerDisplay";
import RenderNamesWithSeparator from "../LyricsList/RenderNamesWithSeparator";
import AppInput from "../ui/AppInput";
import { useLyricsForm } from "../../hooks/useLyricsForm";

type Props = {
  placeHolder?: string;
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  setShowMetadata:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
};

export default function LyricsInput({
  placeHolder,
  label,
  value,
  onChangeText,
  setShowMetadata,
}: Props) {
  const { handleSetTitle } = useLyricsForm();
  return (
    <View style={styles.container}>
      <AppInput
        style={styles.label}
        value={label}
        onChangeText={handleSetTitle}
      />

      <ComposerDisplay roles={["music", "lyrics"]} />
      <TextInput
        multiline={true}
        placeholder={placeHolder}
        placeholderTextColor={colors.placeHolderTextColor}
        style={styles.textArea}
        value={value}
        onChangeText={onChangeText}
        textAlignVertical="top"
        onFocus={setShowMetadata}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.highlight,
    zIndex: 2,
    marginVertical: spacing.small,
    alignItems: "flex-start",
  },
  label: {
    marginLeft: spacing.small,
    textAlign: "left",
    borderWidth: 0,
    borderColor: "inherit",
    width: width * 0.97,
    color: colors.text,
    fontSize: fontSize.Xxl,
    fontFamily: "stigmaPoster",
    letterSpacing: 1.5,
  },
  textArea: {
    marginTop: spacing.small,
    width: width * 1,
    height: height * 0.7,
    backgroundColor: colors.highlight,
    color: colors.text,
    padding: spacing.medium,
    fontSize: fontSize.large,
    borderRadius: 6,
  },
});
