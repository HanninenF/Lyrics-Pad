import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import AppText from "./ui/AppText";
import { fontSize, spacing } from "../styles/globalStyles";
import { useFonts } from "expo-font";
import AppPressable from "./ui/AppPressable";

type Props = {
  lyricsId: string;
};

export default function LyricsCard({ lyricsId: id }: Props) {
  const [fontsLoaded] = useFonts({
    stigmaPoster: require("../assets/fonts/stigma_poster/StigmaPoster.ttf"),
    brunson: require("../assets/fonts/brunson/Brunson.ttf"),
    civitype: require("../assets/fonts/civitype_fg/civitype.ttf"),
    polaroid: require("../assets/fonts/polaroid_script/Polaroid.otf"),
    swomun: require("../assets/fonts/swomun_serif/Swomun.otf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <AppPressable key={id} style={styles.container}>
      <AppText style={styles.header}>At the Mighty Halls They'll Walk</AppText>
      <AppText style={styles.roles}>
        Music: <Text style={{ fontStyle: "italic" }}>hårdkodat</Text>
      </AppText>
      <AppText style={styles.roles}>
        Lyrics: <Text style={{ fontStyle: "italic" }}>hårdkodat</Text>
      </AppText>
    </AppPressable>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 0,
    alignItems: "flex-start",
    width: 300,
    backgroundColor: "blue",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: spacing.xs,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
  },
  header: {
    fontFamily: "swomun",
    fontSize: fontSize.large,
    letterSpacing: 1.1,
  },
  roles: { paddingLeft: spacing.large },
});
