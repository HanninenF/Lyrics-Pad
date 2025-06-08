import { StyleSheet, SafeAreaView, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { colors } from "../styles/globalStyles";
import LyricsForm from "../components/LyricsForm";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "NewLyric">;

export default function NewLyricScreen() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <SafeAreaView style={styles.container}>
      <LyricsForm />
      <Button
        title="edit ny text"
        onPress={() => navigation.navigate("Editor")}
      />
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
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
