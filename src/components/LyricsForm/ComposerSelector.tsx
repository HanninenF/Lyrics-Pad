import { View, Text, StyleSheet } from "react-native";
import Dropdown from "../ui/Dropdown";
import AppPressable from "../ui/AppPressable";
import useLyricsContext from "../../hooks/useLyricsContext";
import { MusicianType } from "../../types/types";
import useLyricsForm from "../../hooks/useLyricsForm";
import { colors } from "../../styles/globalStyles";

type Props = {
  role: "music" | "lyrics";
  selectedComposer: MusicianType | null;
  setSelectedComposer: React.Dispatch<
    React.SetStateAction<MusicianType | null>
  >;
};

export default function ComposerSelector({
  role,
  setSelectedComposer,
  selectedComposer,
}: Props) {
  const { musicians, setLyrics, setMusicians } = useLyricsContext();
  const { formValues, dispatch } = useLyricsForm({ setLyrics, setMusicians });

  const handleAddComposer = () => {
    if (selectedComposer) {
      dispatch({
        type: "ADD_COMPOSER",
        role,
        payload: selectedComposer,
      });
      setSelectedComposer(null); // Töm dropdown
    }
  };

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
      <Dropdown
        items={musicians}
        placeholder={`Select ${role} composer`}
        onSelect={setSelectedComposer}
        value={selectedComposer}
      />
      <AppPressable onPress={handleAddComposer}>
        <Text>Add</Text>
      </AppPressable>
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
  selectComposerCon: {
    marginBottom: 20,
  },
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
