import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import LyricsContextProvider from "./contexts/LyricsContext";
import FontsLoader from "./components/ui/FontsLoader";

export default function App() {
  return (
    <FontsLoader>
      <LyricsContextProvider>
        <AppNavigator />
      </LyricsContextProvider>
    </FontsLoader>
  );
}
