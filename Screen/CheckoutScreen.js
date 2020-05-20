import React from "react";
import { StyleSheet, Alert, Text, View, FlatList } from "react-native";
import axios from "axios";
import OutdoorCheckout from "../Component/OutdoorCheckout";

export default function CheckoutScreen({ route }) {
  const  name  = route.params;
  const [data, setData] = React.useState({
    data: [],
  });

  const [fullData, setFulldata] = React.useState({
    fullData: [],
  });

  React.useEffect(() => {
    getPublicData();
  }, []);

  async function getPublicData() {
    try {
      let response = await axios({
        method: "GET",
        url: "https://5ec4a69b628c160016e71280.mockapi.io/list",
      });

      for (let i = 0; i < response.data.length; i++) {
        if (
          response.data[i].name == name &&
          response.data[i].checkout == null
        ) {
          data.data.push(response.data[i]);
        }
      }

      setFulldata({
        fullData: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>OUTDOOR CHECKOUT</Text>

      <FlatList
        data={fullData.fullData}
        removeClippedSubviews={true}
        renderItem={({ item }) => <OutdoorCheckout item={item} />}
        keyExtractor={(item) => item.uuid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  txt: {
    fontSize: 20,
    alignSelf: "center",
    color: "#F00",
  },
});
