import { LyricType, SanitizedLyricType } from "../types/types";

export default function sanitizeSongForStorage(
  song: LyricType
): SanitizedLyricType {
  return {
    id: song.id,
    title: song.title,
    content: song.content,
    createdAt: song.createdAt,
    tags: song.tags,

    composers: {
      music: song.composers.music?.map((composer) => ({
        id: composer.id,
        userName: composer.userName,
        // tar INTE med composer.songs för att undvika cirkulär struktur
      })),
      lyrics: song.composers.lyrics?.map((composer) => ({
        id: composer.id,
        userName: composer.userName,
      })),
    },
  };
}
