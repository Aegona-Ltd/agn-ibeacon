import React from "react";
import { Appbar } from "react-native-paper";

export default function UserToolbar(props) {
  async function onCalendar() {
    let obj = {
      user: props.user,
      jwt: props.jwt,
    };
    props.navigation.navigate("CalendarScreen", obj);
  }

  return (
    <Appbar.Header style={{ backgroundColor: "#cc1010" }}>
      <Appbar.Content title="User Checklist" />
      <Appbar.Action
        icon="account-search"
        onPress={() => props.navigation.navigate("Attendance", props.jwt)}
      />
      <Appbar.Action icon="calendar-month" onPress={onCalendar} />
    </Appbar.Header>
  );
}
