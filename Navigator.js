import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screen/LoginScreen";
import Attendance from "./Screen/Attendance";
import LoadingScreen from "./Screen/LoadingScreen";
import CalendarScreen from "./Screen/CalendarScreen";
import CheckoutScreen from "./Screen/CheckoutScreen"
import CheckScreen from "./Screen/CheckScreen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="CheckScreen" component={CheckScreen} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
