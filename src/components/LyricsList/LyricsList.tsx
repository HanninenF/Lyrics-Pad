//Bygg vy med FlatList + komponent för lyric-kort + navigering till redigeringsvy vid tryck.

import { useState } from "react";
import useLyricsContext from "../../hooks/useLyricsContext";
import LyricsCard from "./LyricsCard";
import AppPressable from "../ui/AppPressable";
import AppText from "../ui/AppText";
import { FlatList } from "react-native-gesture-handler";

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
        <AppText>{!showLyricsCards ? "Show" : "Hide"}</AppText>
      </AppPressable>

      {showLyricsCards && (
        <FlatList
          data={lyrics}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <LyricsCard song={item} />}
        />
      )}
    </>
  );
}
