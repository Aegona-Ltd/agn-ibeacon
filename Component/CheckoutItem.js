import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function CheckoutItem(props) {
  return (
    <View>
      <View style={styles.inContainer}>
        <Icon name="checkcircle" type="antdesign" color="#58e246" size={15} />
        <Text style={styles.txtCheckIn}>In: {props.item.checkin}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inContainer: {
    marginVertical: hp("1%"),
    flexDirection: "row",
    alignItems: "center",
    flexWrap:'wrap',
    backgroundColor: "#D6F3E7",
    padding: 2,
  },

  txtCheckIn: {
    color: "#58e246",
    marginLeft: wp("1%"),
  },
});
