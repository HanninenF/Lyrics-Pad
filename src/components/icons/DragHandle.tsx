import Svg, { Path } from "react-native-svg";

type Props = {
  fill?: string;
  height?: number;
  width?: number;
};

export default function DragHandleIcon({ fill, height, width }: Props) {
  return (
    <Svg
      height={height ? height : 24}
      width={width ? width : 24}
      viewBox="0 -960 960 960"
      fill={fill ? fill : "green"}
    >
      <Path d="M160-360v-80h640v80H160Zm0-160v-80h640v80H160Z" />
    </Svg>
  );
}
