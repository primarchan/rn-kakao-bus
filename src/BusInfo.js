import { View, Text } from "react-native";

import { COLOR } from "./color";
import AlarmButton from "./AlarmButton";
import BookMarkButton from "./BookMarkButton";
import NextBusInfo from "./NextBusInfo";

export default ({
  isBookMarked,
  onPressBookMark,
  num,
  directionDescription,
  numColor,
  processedNextBusInfos,
}) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {/* 북마크 */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <BookMarkButton
          isBookMarked={isBookMarked}
          onPress={onPressBookMark}
          style={{ paddingHorizontal: 10 }}
        />
        {/* 버스번호, 방향 */}
        <View style={{ flex: 1 }}>
          <Text style={{ color: numColor, fontSize: 20 }}>{num}</Text>
          <Text style={{ color: COLOR.GRAY_3, fontSize: 13 }}>
            {directionDescription} 방향
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          {/* M분 S초 / N번째 전 / 여유 */}
          {processedNextBusInfos.map((info) => (
            <NextBusInfo
              hasInfo={info.hasInfo}
              remainedTimeText={info.remainedTimeText}
              numOfRemainedStops={info.numOfRemainedStops}
              seatStatusText={info.seatStatusText}
            />
          ))}
        </View>
        {/* 알람 아이콘 */}
        <AlarmButton onPress={() => {}} style={{ paddingHorizontal: 15 }} />
      </View>
    </View>
  );
};
