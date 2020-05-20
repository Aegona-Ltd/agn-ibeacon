import React from "react";
import { Appbar } from "react-native-paper";

export default function UserToolbar(props) {
  // async function onCalendar() {
  //   let obj = {
  //     user: props.user,
  //     jwt: props.jwt,
  //   };
  //   props.navigation.navigate("CalendarScreen", obj);
  // }

  async function onPublicCalendar() {
    props.navigation.navigate("CalendarScreen", props.name);
  }

  return (
    <Appbar.Header style={{ backgroundColor: "#cc1010" }}>
      <Appbar.Content title="User Checklist" />
      <Appbar.Action
        icon="account-search"
        // onPress={() => props.navigation.navigate("Attendance", props.jwt)}
        onPress={() => props.navigation.navigate("Attendance")}
      />
      <Appbar.Action icon="calendar-month" 
      // onPress={onCalendar} 
      onPress={onPublicCalendar}

      />
    </Appbar.Header>
  );
}
