import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "./color";
import { useState } from "react";

const useBookmark = (initialIsBookmarked) => {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const toggleIsBookmarked = () => setIsBookmarked(!isBookmarked);

  return { isBookmarked, toggleIsBookmarked };
};

export default ({ isBookmarked: isBookmarkedProp, onPress, style, size }) => {
  const { isBookmarked, toggleIsBookmarked } = useBookmark(isBookmarkedProp);
  return (
    <TouchableOpacity
      onPress={() => {
        toggleIsBookmarked();
        onPress();
      }}
      style={style}
    >
      <Ionicons
        name="star"
        size={size}
        color={isBookmarked ? COLOR.YELLOW : COLOR.GRAY_1}
      />
    </TouchableOpacity>
  );
};
