import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import LyricsContextProvider from "./contexts/LyricsContext";
import FontsLoader from "./components/ui/FontsLoader";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FontsLoader>
        <LyricsContextProvider>
          <AppNavigator />
        </LyricsContextProvider>
      </FontsLoader>
    </GestureHandlerRootView>
  );
}
