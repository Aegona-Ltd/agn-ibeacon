import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import axios from "axios";
import _ from "lodash";
import { Overlay } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ActivityIndicator } from "react-native-paper";
import { SearchBar } from "react-native-elements";
import EmployeeItem from "../Component/EmployeeItem";

export default function Attendance({ route }) {
  // const jwt = route.params;
  const [search, setSearch] = React.useState({
    searchFilter: "",
    data: [],
  });

  const [fullData, setData] = React.useState({
    fullData: [],
  });

  const [visible, setVisible] = React.useState(true);

  // async function getData() {
  //   try {
  //     setTimeout(() => {
  //       setVisible(false);
  //     }, 3000);
  //     const response = await axios({
  //       method: "GET",
  //       url: "http://192.168.1.6:1337/lists",
  //       headers: { Authorization: `Bearer ${jwt}` },
  //     });

  //     if (response.data != []) {
  //       setSearch({
  //         data: response.data,
  //       });

  //       setData({
  //         fullData: response.data,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function getPublicData() {
    try {
      setTimeout(() => {
        setVisible(false);
      }, 3000);
      const response = await axios({
        method: "GET",
        url: "https://5ec4a69b628c160016e71280.mockapi.io/list",
      });

      if (response.data != []) {
        setSearch({
          data: response.data,
        });

        setData({
          fullData: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onSearch(text) {
    const formatQuery = text.toLowerCase();
    const data = _.filter(fullData.fullData, (data) => {
      if (data.name.toLowerCase().includes(formatQuery)) {
        return true;
      } else false;
    });
    setSearch({
      searchFilter: text,
      data: data,
    });

    if (text == "") {
      setSearch({
        data: fullData.fullData,
      });
    }
  }

  React.useEffect(() => {
    //getData();
    getPublicData();
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Type Employee name..."
        lightTheme
        round
        showCancel
        onChangeText={(text) => onSearch(text)}
        value={search.searchFilter}
      />

      <FlatList
        data={search.data}
        removeClippedSubviews={true}
        renderItem={({ item }) => <EmployeeItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />

      <Overlay isVisible={visible}>
        <View>
          <ActivityIndicator animating={true} size="large" />
          <Text style={styles.txt}>Loading...</Text>
        </View>
      </Overlay>
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
