import {
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  StyleProp,
  TextStyle,
} from "react-native";
import { colors, fontSize, spacing, width } from "../../styles/globalStyles";
import AppText from "./AppText";

type Props = {
  onChangeText: (text: string) => void;
  placeHolder?: string;
  label?: string;
  value: string | undefined;
  style?: StyleProp<TextStyle>;
};

export default function AppInput({
  onChangeText,
  placeHolder,
  label,
  value,
  style,
}: Props) {
  return (
    <KeyboardAvoidingView>
      <View style={inputStyles.container}>
        {label && <AppText style={inputStyles.label}>{label}</AppText>}
        <TextInput
          value={value}
          placeholderTextColor={colors.placeHolderTextColor}
          placeholder={placeHolder}
          style={[inputStyles.input, style]}
          onChangeText={onChangeText}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const inputStyles = StyleSheet.create({
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
    textAlign: "center",
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.buttonDark,
    paddingLeft: spacing.small,
    paddingTop: spacing.small,
    paddingBottom: spacing.xs / 3,
    marginBottom: spacing.small,
    backgroundColor: colors.highlight,
    borderRadius: 5,
    width: width * 0.85,
  },
});
