import React from "react";
import {
  StyleSheet,
  View,
  DeviceEventEmitter,
  NativeEventEmitter,
  Platform,
  Alert,
} from "react-native";
import UserInfo from "../Component/UserInfo";
import UserToolbar from "../Component/UserToolbar";
import LocationList from "../Component/LocationList";
import { FAB } from "react-native-paper";
import {
  BluetoothStatus,
  useBluetoothStatus,
} from "react-native-bluetooth-status";
import * as Permissions from "expo-permissions";
import _ from "lodash";
import Kontakt, { KontaktModule } from "react-native-kontaktio";
import NetInfo from "@react-native-community/netinfo";

export default function CheckScreen({ route, navigation }) {
  // const { jwt } = route.params;
  // const { user } = route.params;

  const { name } = route.params;
  const { avatar } = route.params;

  const { connect, init, startDiscovery, startScanning } = Kontakt;
  const kontaktEmitter = new NativeEventEmitter(KontaktModule);
  const isAndroid = Platform.OS === "android";
  const [btStatus, isPending, setBluetooth] = useBluetoothStatus();

  const [newDateData, setData] = React.useState({
    dateData: [],
  });

  const [loading, setLoading] = React.useState(false);
  const [internet, setInternet] = React.useState(true);

  React.useEffect(() => {
    checkInternet();
    beaconSetup();
  }, []);

  async function checkInternet() {
    NetInfo.addEventListener((state) => {
      setInternet(state.isConnected);
    });
  }

  async function refreshScan() {
    setLoading(!loading);
    if (!loading) {
      setData({
        dateData: [],
      });
      await setBluetooth(true);
      await beaconSetup();
    }
  }

  async function requestLocationPermission() {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      const isEnabled = await BluetoothStatus.state();
      if (!isEnabled) {
        Alert.alert(
          "Bluethooth",
          "Bluetooth is turn off. Please turn on this",
          [{ text: "OK", onPress: refreshScan }],
          { cancelable: false }
        );
      }

      if (status == "granted" && isEnabled) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  async function onCheckoutScreen() {
    navigation.navigate("CheckoutScreen", name);
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
          [{ text: "OK", onPress: requestLocationPermission }],
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
        }
      );
    } else {
      //iOS
      kontaktEmitter.addListener("didDiscoverDevices", ({ beacons }) => {});
    }
  }

  return (
    <View style={styles.container}>
      <UserToolbar
        navigation={navigation}
        // jwt={jwt}
        // user={user}
        name={name}
      />
      <View style={styles.container}>
        <UserInfo
          // name={user.name}
          // email={user.email}
          // avatar={user.avatar}
          internet={internet}
          name={name}
          avatar={avatar}
          navigation={navigation}
        />
        <LocationList
          data={newDateData.dateData}
          // user={user}
          // jwt={jwt}
          name={name}
          avatar={avatar}
          navigation={navigation}
        />
      </View>
      <FAB
        loading={loading}
        style={styles.fab}
        color="#000"
        icon="database-search"
        onPress={refreshScan}
      />

      <FAB
        style={styles.fabCheckout}
        color="#FFF"
        icon="account-check-outline"
        onPress={onCheckoutScreen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  fab: {
    position: "absolute",
    margin: 16,
    backgroundColor: "#FF9",
    right: 0,
    bottom: 0,
  },

  fabCheckout: {
    position: "absolute",
    margin: 16,
    backgroundColor: "#F00",
    left: 0,
    bottom: 0,
  },
});
