import {
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  View,
} from "react-native";
import { colors, fontSize, spacing } from "../../styles/globalStyles";
import AppText from "./AppText";

type Props = {
  onChangeText: (text: string) => void;
  placeHolder?: string;
  label?: string;
  value: string | undefined;
};

export default function AppInput({
  onChangeText,
  placeHolder,
  label,
  value,
}: Props) {
  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <AppText style={styles.label}>{label}</AppText>
        <TextInput
          value={value}
          placeholderTextColor={colors.placeHolderTextColor}
          placeholder={placeHolder}
          style={styles.input}
          onChangeText={onChangeText}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
  },
  label: {
    color: colors.text,
    fontSize: fontSize.medium,
    alignContent: "flex-end",
    paddingLeft: spacing.small,
    marginTop: spacing.small,
  },
  input: {
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.buttonDark,
    paddingLeft: spacing.small,
    paddingTop: spacing.small,
    paddingBottom: spacing.xs / 3,
    marginBottom: spacing.small,
    backgroundColor: colors.highlight,
    borderRadius: 5,
    minWidth: 10,
    maxWidth: 100,
  },
});
