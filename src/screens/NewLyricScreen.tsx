import { StyleSheet, SafeAreaView, Button } from "react-native";
import AppInput from "../components/ui/AppInput";
import LyricsInput from "../components/LyricsInput";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { colors } from "../styles/globalStyles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "NewLyric">;

export default function NewLyricScreen() {
  const [inputValue, setInputValue] = useState("");
  const navigation = useNavigation<NavigationProp>();
  return (
    <SafeAreaView style={styles.container}>
      <AppInput placeHolder="write here" label="write lyrics" />
      <AppInput placeHolder="write here" label="crite composer" />
      <LyricsInput
        onChangeText={setInputValue}
        value={inputValue}
        placeHolder="write here"
        label="jojo"
      />
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
