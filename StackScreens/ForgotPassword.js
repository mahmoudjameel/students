import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { firebase } from "../config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import { BackHandler } from "react-native";
export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");

  function onResetPasswordPress() {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(
        () => {
          Alert.alert("Password reset email has been sent.");
        },
        (error) => {
          Alert.alert(error.message);
        }
      );
  }

  function onBackToLoginPress() {
    navigation.goBack();
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      function handleBackButtonClick() {
        navigation.navigate("Login");
        return true;
      }

      BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener(
          "hardwareBackPress",
          handleBackButtonClick
        );
      };
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
   
        <SafeAreaView style={{ flex: 1, padding: 5 }}>
          <KeyboardAwareScrollView>
            <View style={{ flex: 1, marginLeft: 200 }}>
              <Image
                style={{
                  height: 140,
                  width: 120,
                  marginLeft: 0,
                  marginTop: 15,
                }}
                source={require("../assets/loog.png")}
              />
            </View>

            <Animatable.View animation="fadeInUp" duration={1000}>
              <View style={{ flex: 1, padding: 20, marginTop: 100 }}>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "black" }}
                >
                  Forgot Password?
                </Text>

                <TextInput
                  style={styles.textBoxes}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholderTextColor="black"
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={onResetPasswordPress}
                  >
                    <Text style={styles.buttonTitle}>Reset Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={onBackToLoginPress}
                  >
                    <Text style={styles.buttonTitle}>Back</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animatable.View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'white'
  },
  textBoxes: {
    width: "70%",
    fontSize: 18,
    padding: 12,
    borderColor: "grey",
    borderBottomWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    color: "black",
  },
  button: {
    backgroundColor: "#1e90ff",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  acc: {
    height: 80,
    width: 80,
    alignSelf: "center",
    margin: 30,
    borderRadius: 20,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
});
