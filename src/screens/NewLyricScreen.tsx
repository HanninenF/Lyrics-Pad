import { SafeAreaView } from "react-native-safe-area-context";
import AppInput from "../components/ui/AppInput";
import LyricsInput from "../components/LyricsInput";
import { useState } from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function NewLyricScreen() {
  const [inputValue, setInputValue] = useState("");
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <AppInput placeHolder="write here" label="write lyrics" />
      <AppInput placeHolder="write here" label="crite composer" />
      <LyricsInput
        onChangeText={setInputValue}
        value={inputValue}
        placeHolder="write here"
        label="jojo"
      />
      <Button
        title="Skapa ny text"
        onPress={() => navigation.navigate("NewLyric")}
      />
    </SafeAreaView>
  );
}
