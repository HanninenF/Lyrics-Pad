import React from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  Platform,
  StatusBar,
} from "react-native";
import { colors, fontSize } from "../styles/globalStyles";
import AppText from "../components/ui/AppText";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { useNavigation } from "@react-navigation/native";
import AppPressable from "../components/ui/AppPressable";
import LyricsCard from "../components/LyricsList/LyricsCard";
import LyricsList from "../components/LyricsList/LyricsList";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <SafeAreaView style={styles.safeArea}>
      <AppText
        style={{
          fontSize: fontSize.Xxl,
          color: colors.text,
        }}
      >
        Welcome to the Home Screen
      </AppText>

      <AppPressable onPress={() => navigation.navigate("NewLyric")}>
        <AppText>+</AppText>
      </AppPressable>
      <LyricsList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    backgroundColor: colors.background,
  },
});
