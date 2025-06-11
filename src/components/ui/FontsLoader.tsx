import React from "react";
import { ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";

export default function FontsLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fontsLoaded] = useFonts({
    stigmaPoster: require("../../assets/fonts/stigma_poster/StigmaPoster.ttf"),
    brunson: require("../../assets/fonts/brunson/Brunson.ttf"),
    civitype: require("../../assets/fonts/civitype_fg/civitype.ttf"),
    polaroid: require("../../assets/fonts/polaroid_script/Polaroid.otf"),
    swomun: require("../../assets/fonts/swomun_serif/Swomun.otf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return <>{children}</>;
}
