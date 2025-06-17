import AsyncStorage from "@react-native-async-storage/async-storage";
import { LyricType } from "../types/types";
import sanitizeSongForStorage from "../utils/sanitizeSongForStorage";

export async function saveLyrics(songs: LyricType[]) {
  const cleanedSongs = songs.map(sanitizeSongForStorage);
  console.log("💾 Försöker spara lyrics:", cleanedSongs);

  try {
    await AsyncStorage.setItem("savedLyrics", JSON.stringify(cleanedSongs));
    console.log("✅ Lyrics sparades i AsyncStorage!");

    // Läs tillbaka direkt för verifiering
    const saved = await AsyncStorage.getItem("savedLyrics");
    console.log("🔍 Lyrics i AsyncStorage:", saved ? JSON.parse(saved) : null);
  } catch (error) {
    console.error("❌ Kunde inte spara lyrics:", error);
  }
}
