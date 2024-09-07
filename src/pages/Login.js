import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput, Button } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import ElevatedButton from "../components/ElevatedButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { BASE_URL } from "@env"; 
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure, clearError } from "../redux/userSlice";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error, loading, currentUser } = useSelector((state) => state.user);

  // Clear error message when component is mounted
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleValidation = () => {
    if (username.trim() === "" || password.trim() === "") {
      Alert.alert("Validation Error", "Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const loginUser = () => {
    if (!handleValidation()) return;

    const body = { username, password };

    // Dispatch loginStart to set loading state
    dispatch(loginStart());

    axios
      .post(`${BASE_URL}/api/user/login`, body, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        // Dispatch loginSuccess and update the state with user data
        dispatch(loginSuccess(response.data));
        console.log("Login Successful");
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        // Dispatch loginFailure and handle the error state
        dispatch(loginFailure(error.response?.data?.message || "Login failed"));
        Alert.alert("Login Failed", "Please check your credentials and try again.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <CustomInput
        placeholder="Username"
        value={username}
        onChange={setUsername}
        isRequired={true}
        label="Username"
      />
      <CustomInput
        label="Password"
        value={password}
        onChange={setPassword}
        isRequired={true}
        secureTextEntry={true}
      />
      <ElevatedButton text="Login" handlerFunc={loginUser} loading={loading} />
      <View style={styles.footer}>
        <Text style={styles.text}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Register here</Text>
        </TouchableOpacity>
      </View>
      {/* Ensure error message is inside a Text component */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "black",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  text: {
    color: "grey",
  },
  link: {
    color: "black",
    marginLeft: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
