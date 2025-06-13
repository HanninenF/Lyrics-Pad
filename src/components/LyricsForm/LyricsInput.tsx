import { TextInput, StyleSheet, View } from "react-native";
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

type Props = {
  placeHolder?: string;
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
};

export default function LyricsInput({
  placeHolder,
  label,
  value,
  onChangeText,
}: Props) {
  return (
    <View style={styles.container}>
      <AppText style={styles.label}>{label}</AppText>

      <ComposerDisplay roles={["music", "lyrics"]} />
      <TextInput
        multiline={true}
        placeholder={placeHolder}
        placeholderTextColor={colors.placeHolderTextColor}
        style={styles.textArea}
        value={value}
        onChangeText={onChangeText}
        textAlignVertical="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    marginVertical: spacing.small,
    alignItems: "flex-start",
  },
  label: {
    color: colors.text,
    fontSize: fontSize.medium,
    marginBottom: spacing.xs,
  },
  textArea: {
    width: width * 0.8,
    height: height * 0.7,
    backgroundColor: colors.highlight,
    color: colors.text,
    padding: spacing.medium,
    fontSize: fontSize.large,
    borderRadius: 6,
  },
});
