import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import AppText from "../ui/AppText";
import { colors, fontSize, spacing } from "../../styles/globalStyles";
import { useFonts } from "expo-font";
import AppPressable from "../ui/AppPressable";
import useLyricsContext from "../../hooks/useLyricsContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MusicianType, RootStackParamList } from "../../types/types";
import RenderNamesWithSeparator from "./RenderNamesWithSeparator";

type Props = {
  lyricsId: string;
};

export default function LyricsCard({ lyricsId }: Props) {
  const { lyrics } = useLyricsContext();
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Editor">;
  const navigation = useNavigation<NavigationProp>();

  const lyric = lyrics.find((l) => lyricsId === l.id);
  if (!lyric) throw new Error("no lyric was found");

  return (
    <AppPressable
      key={lyric.id}
      style={styles.container}
      onPress={() => navigation.navigate("Editor", { lyricsId })}
    >
      <AppText style={styles.header}>{lyric.title}</AppText>
      <AppText style={styles.roles}>
        {"Music: "}
        <RenderNamesWithSeparator
          user={lyric.composers.music}
          separator="/"
          style={styles.name}
        />
      </AppText>
      <AppText style={styles.roles}>
        {"Lyrics: "}
        <RenderNamesWithSeparator
          user={lyric.composers.lyrics}
          separator="/"
          style={styles.name}
        />
      </AppText>
    </AppPressable>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 0,
    alignItems: "flex-start",
    width: 300,
    backgroundColor: colors.highlight,
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
  roles: {
    paddingLeft: spacing.large,
  },
  name: {
    fontStyle: "italic",
    fontFamily: "civitype",
    letterSpacing: 2,
    fontSize: 25,
  },
});
