import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  StatusBar,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { colors } from "../styles/globalStyles";
import LyricsForm from "../components/LyricsForm/LyricsForm";
import AppPressable from "../components/ui/AppPressable";
import { LyricsFormProvider } from "../contexts/LyricsFormContext";
import useLyricsContext from "../hooks/useLyricsContext";

type LyricsFormScreenRouteProp = RouteProp<
  RootStackParamList,
  "LyricsFormScreen"
>;

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "LyricsFormScreen"
>;

export default function LyricsFormScreen() {
  const route = useRoute<LyricsFormScreenRouteProp>();
  const song = route.params?.song;
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <LyricsFormProvider initialSong={song}>
        <LyricsForm />
      </LyricsFormProvider>

      <View style={styles.navButtonWrapper}>
        {/*  <AppPressable onPress={() => navigation.navigate("Editor")}>
          <Text>Edit</Text>
        </AppPressable> */}
        <AppPressable onPress={() => navigation.navigate("Home")}>
          <Text>Home</Text>
        </AppPressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    backgroundColor: colors.background,
  },
  navButtonWrapper: {
    flexDirection: "row",
  },
});
