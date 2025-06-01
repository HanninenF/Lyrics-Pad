import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { colors } from "./styles/globalStyles";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
