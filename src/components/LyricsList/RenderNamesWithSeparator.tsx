import { LyricType, MusicianType } from "../../types/types";
import { StyleSheet, Text } from "react-native";

type Props = {
  user: MusicianType[];
  style?: object;
  separator: string;
};

export default function RenderNamesWithSeparator({
  user,
  style,
  separator,
}: Props) {
  return user.map((l, index, arr) => (
    <Text key={l.id} style={style}>
      {l.userName}
      {index < arr.length - 1 ? separator : ""}
    </Text>
  ));
}
