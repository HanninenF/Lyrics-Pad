//Bygg vy med FlatList + komponent för lyric-kort + navigering till redigeringsvy vid tryck.

import { useState } from "react";
import useLyricsContext from "../hooks/useLyricsContext";
import LyricsCard from "./LyricsCard";
import AppPressable from "./ui/AppPressable";
import AppText from "./ui/AppText";

/*
🧱 Feature 4: Lista alla texter
🧠 Nu kan du visualisera innehållet i HomeScreen.

4.1 Skapa vy som visar sparade texter i en FlatList
4.2 Skapa komponent LyricCard för varje item i listan
4.3 Navigera till EditorScreen när användaren trycker på ett kort*/

export default function LyricsList() {
  const { lyrics } = useLyricsContext();
  const [showLyricsCards, setShowLyricsCards] = useState(false);

  return (
    <>
      <AppPressable onPress={() => setShowLyricsCards(!showLyricsCards)}>
        <AppText>show</AppText>
      </AppPressable>

      {showLyricsCards &&
        lyrics.map((l) => <LyricsCard key={l.id} lyricsId={l.id} />)}
    </>
  );
}
