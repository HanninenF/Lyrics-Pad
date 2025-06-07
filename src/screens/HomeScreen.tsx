import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fontSize, spacing } from "../styles/globalStyles";
import AppInput from "../components/ui/AppInput";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          marginTop: spacing.great,
          fontSize: fontSize.Xxl,
          color: colors.text,
        }}
      >
        Welcome to the Home Screen
      </Text>
      <AppInput placeHolder="write here" label="write lyrics" />
      <AppInput placeHolder="write here" label="crite composer" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
