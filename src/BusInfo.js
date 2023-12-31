import { View, Text } from "react-native";

import { COLOR } from "./color";
import AlarmButton from "./AlarmButton";
import BookmarkButton from "./BookmarkButton";
import NextBusInfo from "./NextBusInfo";

export default ({
  isBookmarked,
  onPressBookmark,
  num,
  directionDescription,
  numColor,
  processedNextBusInfos,
  NEWCOLOR,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 75,
        backgroundColor: NEWCOLOR.WHITE_BLACK,
      }}
    >
      {/* 북마크 */}
      <View
        style={{
          flex: 0.85,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <BookmarkButton
          isBookmarked={isBookmarked}
          onPress={onPressBookmark}
          style={{ paddingHorizontal: 10 }}
          size={20}
          NEWCOLOR={NEWCOLOR}
        />

        {/* 버스번호, 방향 */}
        <View style={{ flex: 1 }}>
          <Text style={{ color: numColor, fontSize: 20 }}>{num}</Text>
          <Text style={{ color: COLOR.GRAY_3, fontSize: 13, marginRight: 3 }}>
            {directionDescription} 방향
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          {/* M분 S초 / N번째 전 / 여유 */}
          {processedNextBusInfos.map((info, index) => (
            <NextBusInfo
              key={`next-bus-info-${index}`}
              hasInfo={info.hasInfo}
              remainedTimeText={info.remainedTimeText}
              numOfRemainedStops={info.numOfRemainedStops}
              seatStatusText={info.seatStatusText}
              NEWCOLOR={NEWCOLOR}
            />
          ))}
        </View>

        {/* 알람 아이콘 */}
        <AlarmButton
          onPress={() => {}}
          style={{ paddingHorizontal: 15 }}
          NEWCOLOR={NEWCOLOR}
        />
      </View>
    </View>
  );
};
