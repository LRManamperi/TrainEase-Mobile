import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ElevatedButton from "../components/ElevatedButton";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { BASE_URL } from "@env";  
import { useDispatch, useSelector } from "react-redux";
import { registerStart, registerSuccess, registerFailure, clearError } from "../redux/userSlice";

export default function RegisterScreen({ navigation }) {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const { error, loading, currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

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

    dispatch(registerStart());
    
    axios
      .post(`${BASE_URL}/api/user/register`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch(registerSuccess(response.data));
        console.log("Registration Successful");
        navigation.navigate("AccountCreated");
      })
      .catch((err) => {
        console.error("Registration Error:", err); // Log the entire error for debugging
        const errorMessage = err.response?.data?.message || "Register failed"; // Safely access error message
        dispatch(registerFailure(errorMessage));
        Alert.alert("Registration Failed", errorMessage);
      });
  };
  

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.LoginText}>Welcome!</Text>
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
