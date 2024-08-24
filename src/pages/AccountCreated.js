import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import rightIcon from "../assets/right.png";
import nextIcon from "../assets/next.png";

const AccountCreated = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={rightIcon} style={styles.icon} />
      <Text style={styles.text}>Congratulations!</Text>
      <Text style={styles.paragraph}>
        Your account has been created successfully.
      </Text>
      <TouchableOpacity
        style={styles.bottomIconContainer}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Icon name="arrow-forward" size={36} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default AccountCreated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 80,
    height: 100,
    resizeMode: "contain",
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#000",
  },
  paragraph: {
    fontSize: 16,
  },
  bottomIconContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  bottomIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});