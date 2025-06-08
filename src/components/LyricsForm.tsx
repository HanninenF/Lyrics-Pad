import { useState } from "react";
import LyricsInput from "./ui/LyricsInput";
import AppInput from "./ui/AppInput";
import { View, Text } from "react-native";
import AppPressable from "./ui/AppPressable";
import useLyricsContext from "../hooks/useLyricsContext";
import { LyricType, MusicianType } from "../types/types";
import Dropdown from "./ui/Dropdown";

type FormValues = Omit<LyricType, "id" | "createdAt">;

export default function LyricsForm() {
  const [inputValue, setInputValue] = useState("");
  const { lyrics, setLyrics, musicians } = useLyricsContext();
  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    composers: { music: [], lyrics: [] },
    content: "",
  });

  /*     const handleSave=()=>{

//tilldela id title

    setLyrics((prev)=>[...prev, {title:}])
  }  */

  return (
    <View>
      <AppInput
        value={formValues.title}
        placeHolder="Enter title"
        label="Enter title"
      />
      <Dropdown
        items={musicians}
        placeholder="Select music composer"
        onSelect={(selectedMusician) => {
          setFormValues((prev) => ({
            ...prev,
            composers: {
              ...prev.composers,
              music: [selectedMusician], // eller lägg till fler om du vill tillåta flera
            },
          }));
        }}
      />

      {/* <Dropdown
        items={musicians}
        placeholder="Select lyricist"
        onSelect={(selectedMusician) => {
          setFormValues((prev) => ({
            ...prev,
            composers: {
              ...prev.composers,
              lyrics: [selectedMusician],
            },
          }));
        }}
      /> */}
      <LyricsInput
        onChangeText={setInputValue}
        value={inputValue}
        placeHolder="write here"
        label="jojo"
      />
      {/*   <AppPressable onPress={handleSave}>
        <Text>Save</Text>
      </AppPressable> */}
    </View>
  );
}
