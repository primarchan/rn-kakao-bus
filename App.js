import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { SafeAreaView, SectionList, StyleSheet, Text } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

import BusInfo from "./src/BusInfo";
import {
  busStop,
  getBusNumColorByType,
  getRemainedTimeText,
  getSeatStatusText,
  getSections,
} from "./src/data";
import { COLOR } from "./src/color";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import Margin from "./src/Margin";
import BookMarkButton from "./src/BookMarkButton";

const busStopBookmarkSize = 20;
const busStopBookmarkPadding = 6;

export default function App() {
  const sections = getSections(busStop.buses);

  const [now, setNow] = useState(dayjs());

  const onPressBusStopBookmark = () => {};

  const ListHeaderComponent = () => {
    <SafeAreaView style={{ backgroundColor: COLOR.GRAY_1 }}>
      {/* 뒤로가기, 홈 아이콘 */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity style={{ padding: 10 }}>
          <SimpleLineIcons name="arrow-left" size={20} color={COLOR.WHITE} />
        </TouchableOpacity>
        <TouchableOpacity>
          <SimpleLineIcons name="home" size={20} color={COLOR.WHITE} />
        </TouchableOpacity>
      </View>

      {/* 정류소 번호, 이름, 방향 */}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Margin height={10} />

        <Text style={{ color: COLOR.WHITE, fontSize: 13 }}>{busStop.id}</Text>
        <Margin height={4} />

        <Text style={{ color: COLOR.WHITE, fontSize: 20 }}>{busStop.name}</Text>
        <Margin height={4} />

        <Text style={{ color: COLOR.GRAY_1, fontSize: 14 }}>
          {busStop.directionDescription}
        </Text>
        <Margin height={20} />
      </View>

      {/* 북마크 */}
      <BookMarkButton
        size={busStopBookmarkSize}
        isBookMarked={busStop.isBookmarked}
        onPress={onPressBusStopBookmark}
        style={{
          borderWidth: 0.3,
          borderColor: COLOR.GRAY_1,
          borderRadius: (busStopBookmarkSize + busStopBookmarkPadding * 2) / 2,
          padding: busStopBookmarkPadding,
        }}
      />
      <Margin height={25} />
    </SafeAreaView>;
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <View
      style={{
        paddingLeft: 13,
        paddingVertical: 3,
        backgroundColor: COLOR.GRAY_1,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopColor: COLOR.GRAY_2,
        borderBottomColor: COLOR.GRAY_2,
      }}
    >
      <Text style={{ fontSize: 12, color: COLOR.GRAY_4 }}>{title}</Text>
    </View>
  );

  const renderItem = ({ item: bus }) => {
    const numColor = getBusNumColorByType(bus.type);

    /**
     * Start
     */
    // undefined ?? null -> null
    // { ... } ?? null -> { ... }
    const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null;
    const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
    const newNextBusInfos =
      !firstNextBusInfo && !secondNextBusInfo
        ? [null]
        : [firstNextBusInfo, secondNextBusInfo];

    // if (bus.num === 2000) {
    //   console.log(bus.num, 'newNextBusInfos', newNextBusInfos); // TODO: 확인
    // }

    const processedNextBusInfos = newNextBusInfos.map((info) => {
      if (!info)
        return {
          hasInfo: false,
          remainedTimeText: "도착 정보 없음",
        };

      const { arrivalTime, numOfRemainedStops, numOfPassengers } = info;
      const remainedTimeText = getRemainedTimeText(now, arrivalTime);
      const seatStatusText = getSeatStatusText(bus.type, numOfPassengers);
      return {
        hasInfo: true,
        remainedTimeText,
        numOfRemainedStops,
        seatStatusText,
      };
    });
    /**
     * End
     */

    return (
      <BusInfo
        isBookMarked={bus.isBookMarked}
        onPressBookMark={() => {}} // TODO
        num={bus.num}
        directionDescription={bus.directionDescription}
        numColor={numColor}
        processedNextBusInfos={processedNextBusInfos}
      />
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newNow = dayjs();
      setNow(newNow);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <SectionList
        style={{ flex: 1, width: "100%" }}
        sections={sections}
        ListHeaderComponent={ListHeaderComponent}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
