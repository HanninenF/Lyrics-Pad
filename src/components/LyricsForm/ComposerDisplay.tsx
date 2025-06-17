import { View, StyleSheet } from "react-native";
import { useLyricsForm } from "../../hooks/useLyricsForm";
import AppText from "../ui/AppText";
import { colors, spacing } from "../../styles/globalStyles";
import RenderNamesWithSeparator from "../LyricsList/RenderNamesWithSeparator";

type Props = {
  roles: ("lyrics" | "music")[];
};

export default function ComposerDisplay({ roles }: Props) {
  const { formValues } = useLyricsForm();

  return (
    <>
      {roles.map((r) => {
        const users = formValues.composers[r];
        if (!users || users.length === 0) return null;

        return (
          <View key={r} style={styles.addedItem}>
            <AppText style={styles.addedText}>
              {r.charAt(0).toUpperCase() + r.slice(1)}:{" "}
              <RenderNamesWithSeparator users={users} separator=" / " />
            </AppText>
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  addedItem: {
    marginLeft: spacing.small,
    padding: spacing.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  addedText: { color: colors.text, fontStyle: "italic" },
});
