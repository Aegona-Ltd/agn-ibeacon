import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
} from "react-native";
import LocationItem from "../Component/LocationItem";


export default function LocationList(props) {

  return (
    <View>
      <FlatList
        data={props.data}
        removeClippedSubviews={true}
        renderItem={({ item }) => (
          <LocationItem item={item} user={props.user} jwt={props.jwt} />
        )}
        keyExtractor={(item) => item.uuid}
      />
    </View>
  );
}
