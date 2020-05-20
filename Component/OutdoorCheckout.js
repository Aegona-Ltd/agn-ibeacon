import React from "react";
import CheckoutItem from "../Component/CheckoutItem";
import { StyleSheet, Alert } from "react-native";
import { ListItem, Card, Button } from "react-native-elements";
import axios from "axios";
import moment from "moment";

export default function OutdoorCheckout(props) {
  const [disable, setDisable] = React.useState(false);
  async function onPublicCheckout() {
    try {
      let response = await axios({
        method: "PUT",
        url:
          "https://5ec4a69b628c160016e71280.mockapi.io/list/" + props.item.id,
        data: {
          checkout: moment().format("YYYY-MM-DD HH:mm:ss"),
          indicate: false,
        },
      });

      if (response.data != []) {
        setDisable(true);
        Alert.alert("Checkout Success!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Card>
      <ListItem
        title={"Location: " + props.item.uuid}
        subtitle={<CheckoutItem item={props.item} />}
      />

      <Button
        disabled={disable}
        onPress={onPublicCheckout}
        buttonStyle={styles.btnOut}
        title="Check Out"
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  btnOut: {
    backgroundColor: "#cc1010",
  },
});
