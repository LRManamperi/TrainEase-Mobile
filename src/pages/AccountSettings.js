import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import ElevatedButton from "../components/ElevatedButton";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Alert } from "react-native";

const AccountSettings = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSaveChanges = () => {
    // to handle save changes logic here
    console.log({
      username,
      email,
      phoneNumber,
      oldPassword,
      newPassword,
    });
    Alert.alert(
      "Success",
      "Account Details changed Successfully!",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"), // Navigate to Home
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
      </View>
      <View>
        <Text style={styles.LoginText}>Account Details</Text>
        <CustomInput
          label="Username *"
          onChange={setUsername}
          isRequired={true}
        />
        <CustomInput
          label="Email Address *"
          onChange={setEmail}
          isRequired={true}
        />
        <CustomInput
          label="Phone Number *"
          onChange={setPhoneNumber}
          isRequired={true}
        />
        <CustomInput
          label="Old Password *"
          onChange={setOldPassword}
          isRequired={true}
          secureTextEntry={true}
        />
        <CustomInput
          label="New Password *"
          onChange={setNewPassword}
          isRequired={true}
          secureTextEntry={true}
        />
        <ElevatedButton text="Save Changes" handlerFunc={handleSaveChanges} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C2938", // Dark background color
    paddingTop: 45,
    paddingBottom: 17,
    paddingLeft: 15,
  },
  backButton: {
    marginRight: 10,
  },
  backImage: {
    width: 50, // Width of the image
    height: 50, // Height of the image
    //resizeMode: "contain", // Ensures the image scales properly
  },
  headerTitle: {
    fontSize: 28,
    color: "white", // White text color
  },
  LoginText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 28,
    paddingLeft: 25,
  },
});

export default AccountSettings;
