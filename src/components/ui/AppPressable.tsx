import {
  Pressable,
  PressableProps,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import React, { ReactNode } from "react";
import { colors, spacing } from "../../styles/globalStyles";

type Props = PressableProps & {
  children: ReactNode;
};

export default function AppPressable({ children, style, ...rest }: Props) {
  const combinedStyle = (state: { pressed: boolean }): StyleProp<ViewStyle> => {
    const baseStyle = styles.pressable;
    const pressedStyle = state.pressed ? styles.pressed : null;

    if (typeof style === "function") {
      const dynamicStyle = style(state);
      return [baseStyle, pressedStyle, dynamicStyle];
    }

    return [baseStyle, pressedStyle, style];
  };

  return (
    <Pressable {...rest} style={combinedStyle}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    maxWidth: 100,
    marginTop: spacing.large,
    margin: spacing.small,
    backgroundColor: colors.button,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.Xl,
    borderRadius: spacing.small,
    alignItems: "center",
  },
  pressed: {
    backgroundColor: colors.buttonDark, // Lägg till den i din färgfil
    transform: [{ scale: 0.97 }],
  },
});
