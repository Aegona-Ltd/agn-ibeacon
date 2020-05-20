import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { Overlay } from "react-native-elements";
import { StyleSheet, View, AsyncStorage, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function LoadingScreen({ navigation }) {
  React.useEffect(() => {
    loadData();
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
  return (
    <View styles={styles.container}>
      <Overlay isVisible={true}>
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
