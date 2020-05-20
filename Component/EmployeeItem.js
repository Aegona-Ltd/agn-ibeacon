import React from "react";
import CheckItem from "../Component/CheckItem";
import { ListItem, Card } from "react-native-elements";

export default function EmployeeItem(props) {
  return (
    <Card>
      <ListItem
        title={props.item.name}
        subtitle={<CheckItem item={props.item} />}
        leftAvatar={{
          rounded: true,
          source: { uri: props.item.avatar },
          size: "medium",
        }}
      />
    </Card>
  );
}
