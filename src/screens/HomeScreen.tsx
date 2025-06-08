import React from "react";
import { StyleSheet, SafeAreaView, Button } from "react-native";
import { colors, fontSize } from "../styles/globalStyles";
import AppText from "../components/ui/AppText";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { useNavigation } from "@react-navigation/native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "NewLyric">;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
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
      <Button
        title="Skapa ny text"
        onPress={() => navigation.navigate("NewLyric")}
      />
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
