import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import ElevatedButton from "../components/ElevatedButton";
import axios from "axios";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleValidation = () => {
    if (username.trim() === "" || password.trim() === "") {
      Alert.alert("Validation Error", "Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const loginUser = () => {
    if (!handleValidation()) return;
    const body = {
      username,
      password,
    };
    console.log(body);
    axios
      .post("http://192.168.8.101:3000/api/login", body, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include this to ensure cookies are sent and received
      })
      .then((response) => {
        console.log("Login Successful");
        navigation.navigate("Home"); // Navigates to the Home screen upon successful login
      })
      .catch((error) => {
        console.log("Login failed:", error.message);
        if (error.response) {
          console.log("Error Response Data:", error.response.data);
          console.log("Error Response Status:", error.response.status);
        } else if (error.request) {
          console.log("Error Request:", error.request);
        } else {
          console.log("Error Message:", error.message);
        }
        Alert.alert(
          "Login Failed",
          "Please check your credentials and try again."
        );
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.LoginText}>Login</Text>
      <CustomInput
        placeholder="Username *"
        value={username}
        onChange={setUsername}
        isRequired={true}
        label="Username *"
      />
      <CustomInput
        label="Password *"
        value={password}
        onChange={setPassword} // Ensure this updates the password state
        isRequired={true}
        secureTextEntry={true}
      />
      <ElevatedButton text="Login" handlerFunc={loginUser} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 7,
          gap: 3,
        }}
      >
        <Text style={styles.text}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text>Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 80,
  },
  LoginText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 28,
  },
  text: {
    color: "grey",
    textAlign: "center",
  },
});
