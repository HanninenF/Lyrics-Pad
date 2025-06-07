import { TextProps, Text, StyleSheet } from "react-native";
import { colors, spacing } from "../../styles/globalStyles";

export default function AppText(props: TextProps) {
  return <Text {...props} style={[styles.text, props.style]} />;
}
const styles = StyleSheet.create({
  text: {
    color: colors.text,
    fontSize: spacing.large,
    marginBottom: spacing.small,
  },
});
