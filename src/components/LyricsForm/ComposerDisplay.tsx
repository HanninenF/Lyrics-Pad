import { View, StyleSheet } from "react-native";
import { useLyricsForm } from "../../hooks/useLyricsForm";
import AppText from "../ui/AppText";
import { colors } from "../../styles/globalStyles";

type Props = {
  roles: ("lyrics" | "music")[];
};

export default function ComposerDisplay({ roles }: Props) {
  const { formValues } = useLyricsForm();

  return roles.map((r) =>
    formValues.composers[r]?.map((m) => (
      <View key={`${r}-${m.id}`} style={styles.addedItem}>
        <AppText style={styles.addedText}>
          {r.charAt(0).toUpperCase() + r.slice(1)}: {m.userName}
        </AppText>
      </View>
    ))
  );
}
const styles = StyleSheet.create({
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
