import { StyleSheet, SafeAreaView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { colors } from "../styles/globalStyles";
import LyricsForm from "../components/LyricsForm/LyricsForm";
import AppPressable from "../components/ui/AppPressable";
import { LyricsFormProvider } from "../contexts/LyricsFormContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "NewLyric">;

export default function NewLyricScreen() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <SafeAreaView style={styles.container}>
      <LyricsFormProvider>
        <LyricsForm />
      </LyricsFormProvider>

      <AppPressable onPress={() => navigation.navigate("Editor")}>
        <Text>Edit</Text>
      </AppPressable>
      <AppPressable onPress={() => navigation.navigate("Home")}>
        <Text>Home</Text>
      </AppPressable>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
  },
});
