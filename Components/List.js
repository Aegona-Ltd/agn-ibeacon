import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  FlatList,
  DeviceEventEmitter,
  NativeEventEmitter,
  Platform,
} from "react-native";
import * as Permissions from "expo-permissions";
import Kontakt, { KontaktModule } from "react-native-kontaktio";
import CheckItem from "./CheckItem";
import { Button } from "react-native-elements";
import { BluetoothStatus } from "react-native-bluetooth-status";

export default function CustomCalendar() {
  const { connect, init, startDiscovery, startScanning } = Kontakt;
  const kontaktEmitter = new NativeEventEmitter(KontaktModule);
  const isAndroid = Platform.OS === "android";
  const [newDateData, setData] = useState({
    dateData: [],
  });

  const [loading, setLoading] = useState({
    isLoading: false,
  });

  async function toggleLoading() {
    setLoading({
      isLoading: !loading.isLoading,
    });

    if (!loading.isLoading) {
      newDateData.dateData.pop();
      beaconSetup();
    }
  }

  useEffect(() => {
    beaconSetup();
  }, []);

  async function requestLocationPermission() {
    try {
      const {status} = await Permissions.askAsync(Permissions.LOCATION);
      const isEnabled = await BluetoothStatus.state();
      if (!isEnabled) {
        Alert.alert("Bluethooth", "Bluetooth is turn off. Please turn on this");
      }
      console.log(isEnabled)
      if (status == "granted" && isEnabled) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  async function beaconSetup() {
    if (isAndroid) {
      const granted = await requestLocationPermission();
      if (granted) {
        await connect();
        await startScanning();
      } else {
        Alert.alert(
          "Permission error",
          "Location permission & Bluetooth permission not granted. Cannot scan for beacons",
          [{ text: "OK", onPress: () => requestLocationPermission }],
          { cancelable: false }
        );
      }
    } else {
      //iOS
      await init();
      await startDiscovery();
    }
    if (isAndroid) {
      DeviceEventEmitter.addListener(
        "beaconsDidUpdate",
        ({ beacons, region }) => {
          setData({
            dateData: beacons,
          });

          console.log(beacons);
        }
      );
    } else {
      //iOS
      kontaktEmitter.addListener("didDiscoverDevices", ({ beacons }) => {});
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={newDateData.dateData}
        renderItem={({ item }) => <CheckItem listItem={item} />}
        keyExtractor={(item) => item.uuid}
      />
      <Button
        buttonStyle={
          !loading.isLoading ? styles.btnContainer : styles.btnLoadingContainer
        }
        title="Scan"
        loading={loading.isLoading}
        onPress={toggleLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  btnContainer: {
    margin: 10,
    width: 75,
    alignSelf: "center",
    height: 75,
    borderRadius: 65,
  },

  btnLoadingContainer: {
    margin: 10,
    width: 75,
    backgroundColor: "#F00",
    alignSelf: "center",
    height: 75,
    borderRadius: 65,
  },
});
