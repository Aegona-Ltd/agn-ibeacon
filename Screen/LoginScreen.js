import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  AsyncStorage,
  Alert,
} from "react-native";
import axios from "axios";
import { Input, Button, Icon, Text } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = React.useState({
    show: false,
  });

  const [username, setUsername] = React.useState({
    username: "",
  });

  const [password, setPassword] = React.useState({
    password: "",
  });

  async function toggleShowPassword() {
    setShowPassword({
      show: !showPassword.show,
    });
  }

  async function login() {
    if (username.username != "" && password.password != "") {
      await axios
        .post("http://192.168.1.6:1337/auth/local", {
          identifier: username.username,
          password: password.password,
        })
        .then((response) => {
          AsyncStorage.setItem("data", JSON.stringify(response.data));
          navigation.replace("CheckScreen", response.data);
        })
        .catch((error) => {
          console.log("An error occurred:", error);
        });
    } else {
      Alert.alert("Please type username and password");
    }
  }

  return (
    <ImageBackground
      source={{
        uri:
          "https://i.pinimg.com/originals/f4/05/4c/f4054c454c1d3dfb32a56a37bf16c4ca.jpg",
      }}
      style={styles.imgbackground}
    >
      <Text style={styles.txtTitle}>LOGIN PAGE</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Username or email"
          placeholderTextColor="#FFF"
          inputStyle={{ fontSize: 15 }}
          onChangeText={(value) =>
            setUsername({
              username: value,
            })
          }
          value={username.username}
        />
        <Input
          placeholder="Password"
          rightIcon={
            <Icon
              name="eyeo"
              type="antdesign"
              color="#FFF"
              onPress={toggleShowPassword}
            />
          }
          value={password.password}
          placeholderTextColor="#FFF"
          inputStyle={{ fontSize: 15 }}
          secureTextEntry={!showPassword.show}
          onChangeText={(value) =>
            setPassword({
              password: value,
            })
          }
        />
      </View>

      <Button
        buttonStyle={{ marginHorizontal: wp("5%") }}
        title="LOG IN"
        onPress={login}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imgbackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  txtForgot: {
    color: "#FFF",
    fontSize: 16,
    marginTop: hp("2%"),
    alignSelf: "center",
  },

  inputContainer: {
    marginTop: hp("5%"),
  },

  txtTitle: {
    fontSize: 35,
    color: "#FFF",
    fontWeight: "bold",
    marginTop: hp("15%"),
    alignSelf: "center",
  },
});
