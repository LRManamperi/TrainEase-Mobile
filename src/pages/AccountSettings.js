import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { BASE_URL } from "@env";
import CustomInput from "../components/CustomInput"; 
import { useTheme } from "../ThemeContext/ThemeProvider";

const AccountSettings = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    // Fetch the existing user profile data
    async function fetchProfile() {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/getProfile`);
        const { username, email, phone } = response.data;
        setUsername(username);
        setEmail(email);
        setPhoneNumber(phone);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    }
    fetchProfile();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/editProfile`, {
        username,
        email,
        phoneNumber,
        oldPassword,
        newPassword,
      });
      Alert.alert(
        "Success",
        "Account Details changed successfully!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Home"),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };
  

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          placeholder="Old Password"
          value={oldPassword}
          onChangeText={setOldPassword}
          secureTextEntry
        />
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#fff',
  },
  
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputDark: {
    color: '#fff',
    borderColor: '#333',
    backgroundColor: '#333',
  },
  saveButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountSettings;
