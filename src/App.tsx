import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import LyricsContextProvider from "./contexts/LyricsContext";

export default function App() {
  return (
    <LyricsContextProvider>
      <AppNavigator />
    </LyricsContextProvider>
  );
}
