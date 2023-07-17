import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "./color";

export default ({ onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Ionicons name="alarm-outline" size={24} color={COLOR.GRAY_3} />
    </TouchableOpacity>
  );
};
