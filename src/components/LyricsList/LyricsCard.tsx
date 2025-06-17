import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import AppText from "../ui/AppText";
import { colors, fontSize, spacing, width } from "../../styles/globalStyles";
import { useFonts } from "expo-font";
import AppPressable from "../ui/AppPressable";
import useLyricsContext from "../../hooks/useLyricsContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LyricType, MusicianType, RootStackParamList } from "../../types/types";
import RenderNamesWithSeparator from "./RenderNamesWithSeparator";

type Props = {
  song: LyricType;
};

export default function LyricsCard({ song }: Props) {
  type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "LyricsFormScreen"
  >;
  const navigation = useNavigation<NavigationProp>();

  return (
    <AppPressable
      key={song.id}
      style={[styles.container, styles.cardEdge]}
      onPress={() => navigation.navigate("LyricsFormScreen", { song })}
    >
      <AppText style={styles.header}>{song.title}</AppText>
      <AppText style={styles.roles}>
        {"Music: "}
        <RenderNamesWithSeparator
          users={song.composers.music}
          separator="/"
          style={styles.name}
        />
      </AppText>
      <AppText style={styles.roles}>
        {"Lyrics: "}
        <RenderNamesWithSeparator
          users={song.composers.lyrics}
          separator="/"
          style={styles.name}
        />
      </AppText>
    </AppPressable>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: spacing.xs,
    alignItems: "flex-start",
    width: width * 0.77,
    backgroundColor: colors.highlight,
    borderWidth: 2,
    borderColor: colors.placeHolderTextColor,
    borderRadius: 0,
    borderTopRightRadius: spacing.xs,

    borderBottomRightRadius: spacing.xs,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
  },
  cardEdge: {
    borderLeftWidth: 12,
    borderTopLeftRadius: spacing.xs,
    borderBottomLeftRadius: spacing.xs,
    borderLeftColor: "#353636",
  },
  header: {
    fontFamily: "swomun",
    fontSize: fontSize.large,
    letterSpacing: 1.1,
    marginBottom: 10,
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
