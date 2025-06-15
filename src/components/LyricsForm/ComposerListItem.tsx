import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useLyricsForm } from "../../hooks/useLyricsForm";
import AppPressable from "../ui/AppPressable";
import { colors, spacing, width } from "../../styles/globalStyles";
import AppText from "../ui/AppText";
import { Role } from "../../types/types";

type Props = {
  role: "music" | "lyrics";
};

export default function ComposerListItem({ role }: Props) {
  const { formValues, dispatch } = useLyricsForm();
  const handleRemoveComposer = (id: string) => {
    dispatch({
      type: "REMOVE_COMPOSER",
      role,
      id,
    });
  };

  const roles: (keyof typeof formValues.composers)[] = ["music", "lyrics"];
  return (
    <View
      style={[
        styles.selectComposerCon,
        role === "music" ? styles.z1000 : styles.z900,
      ]}
    >
      {formValues.composers[role].length > 0 && (
        <View style={styles.addedList}>
          <Text style={styles.addedText}>Added {role} composers:</Text>
          {formValues.composers[role].map((m) => (
            <AppPressable
              style={styles.removeButton}
              onPress={() => handleRemoveComposer(m.id)}
              key={m.id}
            >
              <Text style={styles.addedText}>{m.userName}</Text>

              <Text style={styles.removeText}>X</Text>
            </AppPressable>
          ))}
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  selectComposerCon: {},
  z1000: { zIndex: 900 },
  z900: { zIndex: 800 },
  addedList: {
    marginTop: 10,
    paddingLeft: 10,
  },

  addedText: { color: colors.text, paddingHorizontal: spacing.xs },
  removeButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingVertical: 5,
    paddingHorizontal: 0,
    backgroundColor: "transparent",
  },
  removeText: {
    backgroundColor: colors.primary,
    borderRadius: spacing.xs,
    alignItems: "flex-start",
    paddingHorizontal: spacing.xs,
    fontSize: spacing.large,
    fontWeight: "bold",
    color: "red",
  },
});
