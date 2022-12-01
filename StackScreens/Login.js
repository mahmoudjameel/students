import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { firebase } from "../config";
import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BackHandler } from "react-native";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [show, setshow] = useState(false);
  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  useEffect(() => {
    navigation.addListener("focus", () => {
      const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    });
  }, [navigation]);
  function register() {
    navigation.navigate("Register");
  }
  function forgotPassword() {
    navigation.navigate("ForgotPassword");
  }

  const onLoginPress = () => {
    setshow(true);
    setTimeout(() => {
      setshow(false);
    }, 4000);
    var emailValid = false;
    if (email.length == 0) {
      setEmailError("Email is required");
      setshow(false);
    } else if (email.length < 6) {
      setEmailError("Email should be minimum 6 characters");
    } else if (email.indexOf(" ") >= 0) {
      setEmailError("Email cannot contain spaces");
    } else if (!emailPattern.test(email) && email.length > 0) {
      setEmailError("Enter a valid email!");
    } else {
      setEmailError("");
      emailValid = true;
    }

    var passwordValid = false;
    if (password.length == 0) {
      setPasswordError("Password is Required!");
      setshow(false);
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          const uid = response.user.uid;
          const usersRef = firebase.firestore().collection("users");
          usersRef
            .doc(uid)
            .get()
            .then((firestoreDocument) => {
              if (!firestoreDocument.exists) {
                setPasswordError("User does not exist anymore");
                return;
              } else {
                //Split UserView
                const userrole = firestoreDocument.data()?.role;
                if (userrole == "Admin") {
                  navigation.navigate("AdminHome");
                } else navigation.navigate("Home");
              }
            });
        })
        .catch((error) => {
          console.log(error);
          setPasswordError("Email or Password is wrong!Try Again...");
          setshow(false);
        });

      setPasswordError("");
      passwordValid = true;
    }
  };

  return (
    <View style={styles.container}>
        <SafeAreaView style={{ flex: 1, padding: 5, marginTop: -2 }}>
          <Animatable.View animation="fadeInUp" duration={2000}>
            <KeyboardAwareScrollView>
              <View style={{ flex: 1, marginLeft: 200 }}>
              
                <Image
                  style={{
                    height: 140,
                    width: 120,
                    marginLeft: 0,
                    marginTop: 25,
                  }}
                  source={require("../assets/teachers.png")}
                />
              </View>

              <View style={styles.con}>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    color: "#1e90ff",
                    marginBottom: 40,
                    marginLeft: 10,
                  }}
                >
                  LOG IN
                </Text>

                <TextInput
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholder="Email Address"
                  style={styles.textBoxes}
                  keyboardType={"email-address"}
                  placeholderTextColor="#c4c4c2"
                />
                {emailError.length > 0 && (
                  <Text style={{ color: "red" }}>{emailError}</Text>
                )}
                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholder="Password"
                  style={styles.textBoxes}
                  secureTextEntry
                  placeholderTextColor="#c4c4c2"
                />

                {passwordError.length > 0 && (
                  <Text style={{ color: "red" }}>{passwordError}</Text>
                )}

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => onLoginPress()}
                >
                  <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ marginTop: 30, marginLeft: 10 }}
                  onPress={forgotPassword}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "black" }}
                  >
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
                <View style={{ flex: 1, marginTop: 20, marginLeft: 10 }}>
                  <Text style={{ fontSize: 18, color: "black" }}>
                    Don't have an account?{" "}
                    <Text
                      style={{
                        color: "#1e90ff",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                      onPress={register}
                    >
                      Sign up
                    </Text>
                  </Text>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </Animatable.View>
        </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  con: {
    flex: 1.5,
    margin: 10,
    marginTop: -40,
  },
  textBoxes: {
    width: "65%",
    fontSize: 18,
    padding: 10,
    borderColor: "black",
    borderBottomWidth: 2,
    color: "blackd",
    borderRadius: 10,
    paddingTop: 30,
    marginBottom: 10,
  },
  acc: {
    width: "100%",
    height: 200,
    height: 80,
    width: 80,
    alignSelf: "center",
    borderRadius: 50,
  },
  button: {
    backgroundColor: "#1e90ff",
    width: 100,
    marginLeft: 10,
    marginTop: 30,
    borderRadius: 5,
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },
  buttonTitle: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  activityIndicator: {
    paddingTop: "95%",
    paddingLeft: "65%",
    position: "absolute",
  },
});
