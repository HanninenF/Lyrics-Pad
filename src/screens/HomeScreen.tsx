import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { colors, fontSize } from "../styles/globalStyles";
import AppInput from "../components/ui/AppInput";
import LyricsInput from "../components/LyricsInput";
import AppText from "../components/ui/AppText";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AppText
        style={{
          fontSize: fontSize.Xxl,
          color: colors.text,
        }}
      >
        Welcome to the Home Screen
      </AppText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
  },
});
