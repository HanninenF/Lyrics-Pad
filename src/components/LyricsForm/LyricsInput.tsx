import { TextInput, StyleSheet, View } from "react-native";
import { colors, fontSize, spacing } from "../../styles/globalStyles";
import AppText from "../ui/AppText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ComposerListItem from "./ComposerListItem";
import ComposerDisplay from "./ComposerDisplay";

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
        textAlignVertical="top" // Viktigt för Android så texten börjar uppe i hörnet
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
    width: 600,
    height: 280, // Du kan justera höjden
    backgroundColor: colors.highlight,
    color: colors.text,
    padding: spacing.medium,
    fontSize: fontSize.large,
    borderRadius: 6, // Rundade hörn för en mjukare känsla
  },
});
