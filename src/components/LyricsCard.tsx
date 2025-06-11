import { View, StyleSheet, Text } from "react-native";
import AppText from "./ui/AppText";
import { fontSize, spacing } from "../styles/globalStyles";

export default function LyricsCard() {
  return (
    <View style={styles.container}>
      <AppText style={styles.header}>songName</AppText>
      <AppText style={styles.roles}>
        Music: <Text style={{ fontStyle: "italic" }}>hårdkodat</Text>
      </AppText>
      <AppText style={styles.roles}>
        Lyrics: <Text style={{ fontStyle: "italic" }}>hårdkodat</Text>
      </AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 300,
    backgroundColor: "blue",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: spacing.xs,
    padding: spacing.medium,
  },
  header: {
    fontFamily: "Futura",
    fontSize: fontSize.Xxl,
    fontWeight: "bold",
  },
  roles: { paddingLeft: spacing.medium },
});
