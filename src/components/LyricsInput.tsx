import { TextInput, StyleSheet, View } from "react-native";
import { colors, fontSize, spacing } from "../styles/globalStyles";
import AppText from "./ui/AppText";

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
    marginVertical: spacing.small,
  },
  label: {
    color: colors.text,
    fontSize: fontSize.medium,
    marginBottom: spacing.xs,
  },
  textArea: {
    height: 150, // Du kan justera höjden
    borderWidth: 1,
    borderColor: colors.buttonDark,
    backgroundColor: colors.highlight,
    color: colors.text,
    padding: spacing.small,
    fontSize: fontSize.medium,
    borderRadius: 6, // Rundade hörn för en mjukare känsla
  },
});
