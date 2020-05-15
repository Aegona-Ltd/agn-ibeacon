import React from "react";
import { StyleSheet, View, Text} from "react-native";
import { Button, Card } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function CheckItem(props) {
  const [check, setCheck] = React.useState({
    checkin: true,
  });

  async function setCheckin() {
    setCheck({
      checkin: false,
    });
  }

  async function setCheckout() {
    setCheck({
      checkin: true,
    });
  }
  return (
    <Card>
      <View>
          <Text style={styles.txt}>UUID: {props.listItem.uuid}</Text>
          <Text style={styles.txt}>DISTANCE: {props.listItem.accuracy} meter</Text>
          <Text style={styles.txt}>ADDRESS: {props.listItem.address}</Text>
          <Text style={styles.txt}>BATTERY POWER: {props.listItem.batteryPower}</Text>
          <Text style={styles.txt}>PROXIMITY: {props.listItem.proximity}</Text>
          <Text style={styles.txt}>FIRMWARE VERSION: {props.listItem.firmwareVersion}</Text>
          <Text style={styles.txt}>RSSI: {props.listItem.rssi}</Text>
          <Text style={styles.txt}>TX POWER: {props.listItem.txPower}</Text>
          <Text style={styles.txt}>MAJOR: {props.listItem.major}</Text>
          <Text style={styles.txt}>MINOR: {props.listItem.minor}</Text>
          <Button
          title={check.checkin ? "CHECK IN" : "CHECK OUT"}
          buttonStyle={check.checkin ? styles.btnInStyles : styles.btnOutStyles}
          onPress={check.checkin ? setCheckin : setCheckout}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  btnInStyles: {
    backgroundColor: "#7ED957",
    marginVertical: hp("1%"),
    marginHorizontal: wp("5%"),
  },

  btnOutStyles: {
    backgroundColor: "#F00",
    marginVertical: hp("1%"),
    marginHorizontal: wp("5%"),
  },

  txt: {
    marginVertical: hp("1%"),
    fontSize: 13,
    color: "#000",
  },
});
