import { LyricType, MusicianType } from "../../types/types";
import { StyleSheet, Text } from "react-native";

type Props = {
  users: MusicianType[];
  style?: object;
  separator: string;
};

export default function RenderNamesWithSeparator({
  users,
  style,
  separator,
}: Props) {
  return users.map((l, index, arr) => (
    <Text key={l.id} style={style}>
      {l.userName}
      {index < arr.length - 1 ? separator : ""}
    </Text>
  ));
}
