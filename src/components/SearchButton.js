import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SearchButton() {
  return (
    <View style={styles.container}testID="button-container">
      <Text style={styles.text}testID="button-text">Search</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    marginTop: 80,
    paddingVertical: 10,
    paddingHorizontal: 70,
    backgroundColor: "#cd3f3e",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
});