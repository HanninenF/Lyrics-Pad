import { View, StyleSheet, Text } from "react-native";
import { useLyricsForm } from "../../hooks/useLyricsForm";
import AppPressable from "../ui/AppPressable";
import { colors } from "../../styles/globalStyles";

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
            <View key={m.id} style={styles.addedItem}>
              <Text style={styles.addedText}>{m.userName}</Text>
              <AppPressable onPress={() => handleRemoveComposer(m.id)}>
                <Text style={styles.removeText}>Remove</Text>
              </AppPressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  selectComposerCon: {},
  z1000: { zIndex: 1000 },
  z900: { zIndex: 900 },
  addedList: {
    marginTop: 10,
    paddingLeft: 10,
  },
  addedItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  addedText: { color: colors.text },
  removeText: {
    color: "red",
  },
});
