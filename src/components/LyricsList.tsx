//Bygg vy med FlatList + komponent för lyric-kort + navigering till redigeringsvy vid tryck.

import useLyricsContext from "../hooks/useLyricsContext";

/*
🧱 Feature 4: Lista alla texter
🧠 Nu kan du visualisera innehållet i HomeScreen.

4.1 Skapa vy som visar sparade texter i en FlatList
4.2 Skapa komponent LyricCard för varje item i listan
4.3 Navigera till EditorScreen när användaren trycker på ett kort*/

export default function LyricsList() {
  const { lyrics, setLyrics } = useLyricsContext();

  return <></>;
}
