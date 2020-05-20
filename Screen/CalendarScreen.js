import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { Overlay } from "react-native-elements";
import { ActivityIndicator } from "react-native-paper";
import EmployeeItem from "../Component/EmployeeItem";
import moment from "moment";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import _ from "lodash";

export default function CalendarScreen({ route }) {
  // const { jwt } = route.params;
  // const { user } = route.params;
  const name = route.params;
  const [day, setDay] = React.useState({
    selected: moment().format("YYYY-MM-DD"),
  });

  const [visible, setVisible] = React.useState(true);
  const [data, setData] = React.useState({
    data: [],
  });

  const [fullData, setFullData] = React.useState({
    fullData: [],
  });

  React.useEffect(() => {
   // getData(day.selected);
   getPublicData(day.selected);
  }, []);

  // async function getData(date) {
  //   try {
  //     await data.data.pop();
  //     await fullData.fullData.pop();
  //     setTimeout(() => {
  //       setVisible(false);
  //     }, 3000);
  //     let response = await axios({
  //       method: "GET",
  //       url: "http://192.168.1.6:1337/lists",
  //       headers: { Authorization: `Bearer ${jwt}` },
  //     });

  //     if (response.data != []) {
  //       setDay({
  //         selected: date,
  //       });
  //       for (let i = 0; i < response.data.length; i++) {
  //         if (response.data[i].name == user.name) {
  //           if (
  //             moment(response.data[i].checkin).format("YYYY-MM-DD") == date ||
  //             moment(response.data[i].checkout).format("YYYY-MM-DD") == date
  //           ) {
  //             data.data.push(response.data[i]);
  //           }
  //         }
  //       }

  //       setFullData({
  //         fullData: data.data,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function getPublicData(date) {
    try {
      await data.data.pop();
      await fullData.fullData.pop();
      setTimeout(() => {
        setVisible(false);
      }, 3000);
      let response = await axios({
        method: "GET",
        url: "https://5ec4a69b628c160016e71280.mockapi.io/list",
      });

      if (response.data != []) {
        setDay({
          selected: date,
        });
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].name == name) {
            if (
              moment(response.data[i].checkin).format("YYYY-MM-DD") == date ||
              moment(response.data[i].checkout).format("YYYY-MM-DD") == date
            ) {
              data.data.push(response.data[i]);
            }
          }
        }

        setFullData({
          fullData: data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Calendar
        theme={{
          selectedDayBackgroundColor: "#F00",
          selectedDayTextColor: "#FFF",
        }}
        markedDates={{
          [day.selected]: { selected: true },
        }}
        onDayPress={(day) => getData(day.dateString)}
      />

      <Overlay isVisible={visible}>
        <View>
          <ActivityIndicator animating={true} size="large" />
          <Text style={styles.txt}>Loading...</Text>
        </View>
      </Overlay>

      <FlatList
        data={data.data}
        removeClippedSubviews={true}
        renderItem={({ item }) => <EmployeeItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  txt: {
    fontSize: 18,
    marginVertical: hp("1%"),
  },
});
