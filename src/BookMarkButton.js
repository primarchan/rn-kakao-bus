import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "./color";

export default ({ isBookMarked, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Ionicons
        name="star"
        size={24}
        color={isBookMarked ? COLOR.YELLOW : COLOR.GRAY_1}
      />
    </TouchableOpacity>
  );
};
