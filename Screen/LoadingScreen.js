import React from "react";
import { StyleSheet, View, AsyncStorage, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default function LoadingScreen({ navigation }) {
  React.useEffect(() => {
    checkInternet();
  }, []);

  async function loadData() {
    let data = await AsyncStorage.getItem("data");
    let parseData = JSON.parse(data);
    if (data == null) {
      navigation.replace("LoginScreen");
    } else {
      navigation.replace("CheckScreen", parseData);
    }
  }

  async function checkInternet() {
    NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        loadData();
      } else {
        Alert.alert("Please Check Your Internet");
      }
    });
  }

  return <View styles={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
