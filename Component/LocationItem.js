import React from "react";
import { StyleSheet, Alert, Text } from "react-native";
import { Card, Button } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import moment from "moment";
import axios from "axios";
import firebase from "react-native-firebase";

export default function LocationItem(props) {
  const [checkin, setCheckin] = React.useState({
    isCheckin: true,
    id: null,
  });

  const [token, setToken] = React.useState("");

  React.useEffect(() => {
    // getData();
    //getBeaconData();
    checkPermission();
    getPublicData();
    createNotificationListeners();
  }, []);

  async function checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      const fcmToken = await firebase.messaging().getToken();
      setToken(fcmToken);
    } else {
      try {
        await firebase.messaging().requestPermission();
      } catch (error) {}
    }
  }

  async function sendNotification() {
    await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "key=AAAA5aEUtmU:APA91bHHzOIIgfS1cI7m7oPphXdQuWDA6T-H12hcCIGGhWm7e-XIw8LpABfSXn3ZuRsUhrtEROlbHjgd-a-L2i2bYnqNexPHNc5AKeVwil2siJ134-klFxH6wZkHwfFh7S40q74YsAMW",
      },
      body: JSON.stringify({
        to: token,
        notification: {
          android_channel_id: "test-channel",
          title: "Checkin/out success",
        },

        data: {
          channelId: "test-channel",
        },
      }),
    });
  }

  async function createNotificationListeners() {
    const channel = new firebase.notifications.Android.Channel(
      "test-channel",
      "Test Channel",
      firebase.notifications.Android.Importance.Max
    ).setDescription("My apps test channel");
    firebase.notifications().android.createChannel(channel);
    firebase.notifications().onNotification((notifications) => {
      firebase.notifications().displayNotification(notifications);
    });
  }

  // async function getBeaconData() {
  //   try {
  //     let response = await axios({
  //       method: "GET",
  //       url: "http://192.168.1.6:1337/beacons",
  //       headers: { Authorization: `Bearer ${props.jwt}` },
  //     });

  //     if (response.data != []) {
  //       for (let i = 0; i < response.data.length; i++) {
  //         if (response.data[i].uuid == props.item.uuid) {
  //           setUuid({
  //             id: response.data[i].name,
  //           });
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async function getData() {
  //   try {
  //     let response = await axios({
  //       method: "GET",
  //       url: "http://192.168.1.6:1337/lists",
  //       headers: { Authorization: `Bearer ${props.jwt}` },
  //     });

  //     if (response.data != []) {
  //       for (let i = 0; i < response.data.length; i++) {
  //         if (
  //           response.data[i].name == props.user.name &&
  //           response.data[i].uuid == props.item.uuid &&
  //           response.data[i].checkout == null
  //         ) {
  //           setCheckin({
  //             isCheckin: false,
  //             id: response.data[i].id,
  //           });
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function getPublicData() {
    try {
      let response = await axios({
        method: "GET",
        url: "https://5ec4a69b628c160016e71280.mockapi.io/list",
      });

      if (response.data != []) {
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].name == props.name &&
            response.data[i].uuid == props.item.uuid &&
            response.data[i].checkout == null
          ) {
            setCheckin({
              isCheckin: false,
              id: response.data[i].id,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // async function onCheckin() {
  //   try {
  //     let response = await axios({
  //       method: "POST",
  //       url: "http://192.168.1.6:1337/lists",
  //       headers: { Authorization: `Bearer ${props.jwt}` },
  //       data: {
  //         uuid: props.item.uuid,
  //         name: props.user.name,
  //         avatar: props.user.avatar,
  //         checkin: moment().format("YYYY-MM-DD HH:mm:ss"),
  //         checkout: null,
  //       },
  //     });

  //     if (response.data != []) {
  //       setCheckin({
  //         isCheckin: false,
  //         id: response.data.id,
  //       });
  //       Alert.alert("Checkin Success!");
  //       sendNotification();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function onPublicCheckin() {
    try {
      let response = await axios({
        method: "POST",
        url: "https://5ec4a69b628c160016e71280.mockapi.io/list",
        data: {
          uuid: props.item.uuid,
          name: props.name,
          avatar: props.avatar,
          checkin: moment().format("YYYY-MM-DD HH:mm:ss"),
          checkout: null,
        },
      });

      if (response.data != []) {
        setCheckin({
          isCheckin: false,
          id: response.data.id,
        });
        Alert.alert("Checkin Success!");
        sendNotification();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // async function onCheckout() {
  //   try {
  //     let response = await axios({
  //       method: "PUT",
  //       url: "http://192.168.1.6:1337/lists/" + checkin.id,
  //       headers: { Authorization: `Bearer ${props.jwt}` },
  //       data: {
  //         checkout: moment().format("YYYY-MM-DD HH:mm:ss"),
  //       },
  //     });

  //     if (response.data != []) {
  //       setCheckin({
  //         isCheckin: true,
  //       });
  //       Alert.alert("Checkout Success!");
  //       sendNotification();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function onPublicCheckout() {
    try {
      let response = await axios({
        method: "PUT",
        url: "https://5ec4a69b628c160016e71280.mockapi.io/list/" + checkin.id,
        data: {
          checkout: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
      });

      if (response.data != []) {
        setCheckin({
          isCheckin: true,
        });
        Alert.alert("Checkout Success!");
        sendNotification();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card>
      <Text style={styles.txt}>
        {/* Location: {uuid.id != "" ? uuid.id : props.item.uuid} */}
        Location: {props.item.uuid}
      </Text>
      <Text style={styles.txt}>
        Distance: {props.item.accuracy.toFixed(2)} meter
      </Text>
      <Button
        // onPress={checkin.isCheckin ? onCheckin : onCheckout}
        onPress={checkin.isCheckin ? onPublicCheckin : onPublicCheckout}
        buttonStyle={checkin.isCheckin ? styles.btnIn : styles.btnOut}
        title={checkin.isCheckin ? "Check In" : "Check Out"}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  txt: {
    marginVertical: hp("1%"),
  },
  btnIn: {
    backgroundColor: "#58e246",
  },
  btnOut: {
    backgroundColor: "#cc1010",
  },
});
