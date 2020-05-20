import React from "react";
import { ListItem, Card, Button, Icon } from "react-native-elements";
import { AsyncStorage } from "react-native";
import moment from "moment";

export default function UserInfo(props) {
  async function logOut() {
    await AsyncStorage.clear();
    props.navigation.replace("LoginScreen");
  }

  return (
    <Card title={"Today, " + moment().format("DD-MM-YYYY")}>
      <ListItem
        title={props.name}
        // subtitle={props.email}
        subtitle={props.internet ? "You are Online" : "You are Offine"}
        leftAvatar={{
          rounded: true,
          source: { uri: props.avatar },
          size: "medium",
        }}
      />
      <Button
        onPress={logOut}
        icon={<Icon name="log-out" type="entypo" color="white" />}
        title="Log out"
      />
    </Card>
  );
}
