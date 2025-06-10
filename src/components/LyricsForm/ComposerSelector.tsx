import { View, Text, StyleSheet } from "react-native";
import Dropdown from "../ui/Dropdown";
import AppPressable from "../ui/AppPressable";
import useLyricsContext from "../../hooks/useLyricsContext";
import { MusicianType } from "../../types/types";
import { colors } from "../../styles/globalStyles";
import { useLyricsForm } from "../../hooks/useLyricsForm";

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
  const { musicians } = useLyricsContext();
  const { formValues, dispatch } = useLyricsForm();

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

  return (
    <View style={styles.selectComposerCon}>
      <Dropdown
        items={musicians}
        placeholder={`Select ${role} composer`}
        onSelect={setSelectedComposer}
        value={selectedComposer}
      />
      <AppPressable onPress={handleAddComposer}>
        <Text>Add</Text>
      </AppPressable>
    </View>
  );
}
const styles = StyleSheet.create({
  selectComposerCon: {
    marginBottom: 20,
    flexDirection: "row",
  },
});
