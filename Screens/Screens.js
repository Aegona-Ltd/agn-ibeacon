import React from "react";
import { StyleSheet, View } from "react-native";
import List from "../Components/List";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Screens() {
  return (
    <View style={styles.container}>
      <List />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp("2%"),
    flex: 1,
    backgroundColor: "#fff",
  },
});
