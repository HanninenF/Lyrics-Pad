import { useState } from "react";
import LyricsInput from "./ui/LyricsInput";
import AppInput from "./ui/AppInput";

export default function LyricsForm() {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <AppInput placeHolder="write here" label="write lyrics" />
      <AppInput placeHolder="write here" label="crite composer" />
      <LyricsInput
        onChangeText={setInputValue}
        value={inputValue}
        placeHolder="write here"
        label="jojo"
      />
    </>
  );
}
