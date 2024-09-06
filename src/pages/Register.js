import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import ElevatedButton from "../components/ElevatedButton";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { BASE_URL } from "@env";  

export default function RegisterScreen({ navigation }) {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

  const handleValidation = () => {
    if (!username || !email || !phone || !password) {
      Alert.alert("Validation Error", "Please fill in all required fields.");
      return false;
    }
    return true;
  };
  const registerUser = () => {
    if (!handleValidation()) return;
    const body = {
      username,
      email,
      phone,
      password,
    };
    // console.log(body);

    axios
      .post(`${BASE_URL}/api/user/register`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Registration Successful");
        navigation.navigate("AccountCreated");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Registration Failed", "Please try again.");
      });
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.LoginText}>Register</Text>
      <CustomInput
        value={username}
        onChange={setUserName}
        label="Username"
        isRequired={true}
      />
      <CustomInput
        value={email}
        onChange={setEmail}
        label="Email Address"
        isRequired={true}
      />
      <CustomInput
        value={phone}
        onChange={setPhone}
        label="Phone Number"
        isRequired={true}
      />
      <CustomInput
        value={password}
        onChange={setPassword}
        secureTextEntry={true}
        label="Password"
        isRequired={true}
      />

      <ElevatedButton text="Register" handlerFunc={registerUser} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 15,
          gap: 3,
        }}
      >
        <Text style={styles.text}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>Login here</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 0,
  },
  scrollContainer: {
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 30,
    flexGrow: 0.5,
  },
  LoginText: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 28,
  },
  text: {
    color: "grey",
    textAlign: "center",
  },
});
